from __future__ import annotations

import copy
import json
import sys
from pathlib import Path
from typing import Any

from pydantic import ValidationError


ROOT = Path(__file__).resolve().parent
REPO_ROOT = ROOT.parents[2]
AI_SERVICE = REPO_ROOT / "AIService"
CATALOG_PATH = ROOT / "action_synthesis_rules.v1.json"
CONTROLLER_PATH = REPO_ROOT / "Backend" / "src" / "controllers" / "ai.controller.js"
OUTPUT_PATH = ROOT / "action_synthesis_request_schema_validation.json"

sys.path.insert(0, str(AI_SERVICE))
from schemas import AISummaryConfig  # noqa: E402


GLOBAL_PROVENANCE = [
    "dataset_label",
    "dataset_role",
    "row_index",
    "column",
    "raw_value",
    "parsed_value",
    "unit",
    "rule_id",
    "rule_version",
]


def load_catalog() -> dict[str, Any]:
    return json.loads(CATALOG_PATH.read_text(encoding="utf-8"))


def config_from_rule_set(rule_set: dict[str, Any]) -> dict[str, Any]:
    evidence_columns = [
        item["column"] for item in rule_set["evidence_contract"]
    ]
    trigger_columns = sorted(
        {
            condition["evidence_id"]
            for rule in rule_set["rules"]
            for condition in [
                *rule["trigger"]["all"],
                *rule["trigger"]["any"],
            ]
            if condition["evidence_id"] in evidence_columns
        }
    )
    return {
        "summary_type": "action_synthesis",
        "evidence_columns": evidence_columns,
        "evidence_dataset_roles": rule_set["source_dataset_roles"],
        "action_source": "versioned_registry_rules",
        "action_rule_set_id": rule_set["rule_set_id"],
        "action_rule_version": rule_set["rule_version"],
        "action_evidence_contract": rule_set["evidence_contract"],
        "action_derived_evidence": rule_set["derived_evidence"],
        "action_conflict_rules": rule_set["conflict_rules"],
        "action_rules": rule_set["rules"],
        "trigger_columns": trigger_columns,
        "max_actions": rule_set["max_actions"],
        "provenance_required_fields": GLOBAL_PROVENANCE,
        "require_complete_action_provenance": True,
        "unsupported_action_behavior": rule_set[
            "unsupported_action_behavior"
        ],
        "sensitive_action_policy": "exclude_sensitive_triggers",
        "require_sensitive_action_policy": any(
            item["sensitive"] for item in rule_set["evidence_contract"]
        ),
    }


def validate_valid_cases(catalog: dict[str, Any]) -> list[dict[str, Any]]:
    results = []
    for rule_set in catalog["rule_sets"]:
        config = AISummaryConfig.model_validate(config_from_rule_set(rule_set))
        dumped = config.model_dump(mode="json")
        results.append(
            {
                "case_id": f"{rule_set['task_id']}_canonical_contract",
                "passed": True,
                "rule_count": len(config.action_rules),
                "evidence_count": len(config.evidence_columns),
                "round_trip_rule_version": dumped["action_rule_version"],
            }
        )
    return results


def expect_invalid(
    case_id: str,
    payload: dict[str, Any],
    expected_error: str,
) -> dict[str, Any]:
    try:
        AISummaryConfig.model_validate(payload)
    except ValidationError as exc:
        message = str(exc)
        return {
            "case_id": case_id,
            "passed": expected_error in message,
            "expected_error": expected_error,
            "actual_error": message,
        }
    return {
        "case_id": case_id,
        "passed": False,
        "expected_error": expected_error,
        "actual_error": None,
    }


def validate_invalid_cases(catalog: dict[str, Any]) -> list[dict[str, Any]]:
    base = config_from_rule_set(catalog["rule_sets"][2])
    results = []

    missing_version = copy.deepcopy(base)
    missing_version["action_rule_version"] = None
    results.append(
        expect_invalid(
            "versioned_rules_missing_version",
            missing_version,
            "versioned_registry_rules requires action_rule_version",
        )
    )

    unavailable_without_guard = copy.deepcopy(base)
    unavailable_without_guard["action_rules"][3]["trigger"]["all"] = [
        {
            "evidence_id": "engagement_score",
            "operator": "lt",
            "value": 0.15,
        }
    ]
    results.append(
        expect_invalid(
            "availability_evidence_without_guard",
            unavailable_without_guard,
            "requires availability guard engagement_score_available",
        )
    )

    sensitive_trigger = copy.deepcopy(base)
    sensitive_trigger["action_evidence_contract"][5][
        "allowed_as_trigger"
    ] = True
    results.append(
        expect_invalid(
            "sensitive_evidence_allowed_as_trigger",
            sensitive_trigger,
            "sensitive evidence lifestyle_risk_score cannot be allowed as trigger",
        )
    )

    unknown_evidence = copy.deepcopy(base)
    unknown_evidence["action_rules"][0]["trigger"]["all"][0][
        "evidence_id"
    ] = "unknown_backend_signal"
    results.append(
        expect_invalid(
            "unknown_rule_evidence",
            unknown_evidence,
            "references unknown evidence unknown_backend_signal",
        )
    )

    candidate_without_columns = {
        "summary_type": "action_synthesis",
        "action_source": "candidate_action_columns",
    }
    results.append(
        expect_invalid(
            "candidate_source_without_action_columns",
            candidate_without_columns,
            "candidate_action_columns source requires action_columns",
        )
    )

    missing_provenance = copy.deepcopy(base)
    missing_provenance["provenance_required_fields"] = [
        "dataset_label",
        "column",
        "raw_value",
    ]
    results.append(
        expect_invalid(
            "missing_mandatory_global_provenance",
            missing_provenance,
            "provenance_required_fields is missing mandatory fields",
        )
    )

    malformed_trigger = copy.deepcopy(base)
    malformed_trigger["action_rules"][0]["trigger"]["all"][0][
        "value"
    ] = 40
    results.append(
        expect_invalid(
            "condition_with_two_operands",
            malformed_trigger,
            "condition must define exactly one of value or compare_to_evidence_id",
        )
    )

    return results


def validate_unsupported_contract_is_parseable() -> dict[str, Any]:
    config = AISummaryConfig.model_validate(
        {
            "summary_type": "action_synthesis",
            "unsupported_action_behavior": "emit_unsupported_actions",
        }
    )
    return {
        "case_id": "missing_action_source_deferred_to_summarizer",
        "passed": (
            config.action_source is None
            and not config.action_rules
            and config.unsupported_action_behavior == "emit_unsupported_actions"
        ),
    }


def validate_controller_transport() -> dict[str, Any]:
    source = CONTROLLER_PATH.read_text(encoding="utf-8")
    expected_mappings = {
        "evidence_columns": "task.aiEvidenceColumns",
        "evidence_dataset_roles": "task.aiEvidenceDatasetRoles",
        "action_rules": "task.aiActionRules",
        "action_rule_version": "task.aiActionRuleVersion",
        "priority_column": "task.aiPriorityColumn",
        "owner_column": "task.aiOwnerColumn",
        "time_horizon_column": "task.aiTimeHorizonColumn",
        "trigger_columns": "task.aiTriggerColumns",
        "max_actions": "task.aiMaxActions",
        "provenance_required_fields": "task.aiProvenanceRequiredFields",
        "sensitive_action_policy": "task.aiSensitiveActionPolicy",
    }
    missing = [
        f"{field} <- {registry_field}"
        for field, registry_field in expected_mappings.items()
        if field not in source or registry_field not in source
    ]
    return {
        "case_id": "node_transport_mapping",
        "passed": not missing,
        "missing_mappings": missing,
    }


def main() -> int:
    catalog = load_catalog()
    valid_results = validate_valid_cases(catalog)
    invalid_results = validate_invalid_cases(catalog)
    boundary_result = validate_unsupported_contract_is_parseable()
    transport_result = validate_controller_transport()
    all_results = [
        *valid_results,
        *invalid_results,
        boundary_result,
        transport_result,
    ]
    report = {
        "validator": "validate_action_synthesis_request_schema.py",
        "valid_contract_cases": len(valid_results),
        "invalid_contract_cases": len(invalid_results),
        "passed": sum(1 for result in all_results if result["passed"]),
        "failed": sum(1 for result in all_results if not result["passed"]),
        "overall_pass": all(result["passed"] for result in all_results),
        "validation_boundary": {
            "parse_time": [
                "Pydantic field types, enums and semantic-version format",
                "non-empty and well-formed trigger expressions",
                "unique evidence, rule and conflict identifiers",
                "rule references to declared raw or derived evidence",
                "availability guards for availability-aware evidence",
                "sensitive evidence exclusion from triggers",
                "action-source structural requirements",
                "global provenance declaration coverage",
            ],
            "summarizer_time": [
                "runtime dataset labels, rows and columns exist",
                "raw values can be parsed without replacing missing with zero",
                "availability state permits evidence evaluation",
                "derived evidence can be computed",
                "rules and conflicts match actual evidence",
                "prioritized actions have complete evidence links",
                "unsupported_actions, missing_evidence and warnings are emitted",
            ],
        },
        "results": all_results,
    }
    OUTPUT_PATH.write_text(
        json.dumps(report, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0 if report["overall_pass"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
