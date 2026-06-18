from __future__ import annotations

import argparse
import json
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[3]
AI_SERVICE = ROOT / "AIService"
REGISTRY_PATH = ROOT / "Backend" / "src" / "config" / "taskRegistry.json"
RULES_PATH = (
    ROOT
    / "Docs"
    / "evaluation_v2"
    / "ai_explanation_judge_v2"
    / "action_synthesis_rules.v1.json"
)
OUTPUT_PATH = (
    ROOT
    / "Docs"
    / "evaluation_v2"
    / "ai_explanation_judge_v2"
    / "action_synthesis_actual_data_validation.json"
)

BACKEND_URL = "http://localhost:4000"
AI_SERVICE_URL = "http://localhost:8000"

sys.path.insert(0, str(AI_SERVICE))

from schemas import AISummaryConfig, ConfidenceInput, ExplainRequest  # noqa: E402
from debug_ai_summary import build_ai_summary_config  # noqa: E402
from strategies.base import BaseExplanationStrategy  # noqa: E402


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
OUTPUT_KEYS = {
    "source_datasets",
    "evidence_items",
    "prioritized_actions",
    "action_evidence_links",
    "unsupported_actions",
    "conflicting_evidence",
    "missing_evidence",
    "summarization_warnings",
}
SENSITIVE_COLUMNS = {"support_score", "lifestyle_risk_score"}


CASES = [
    {
        "case_id": "A-G16_SAMPLE_OULAD",
        "dataset_id": "SAMPLE_OULAD",
        "task_id": "A-G16",
        "params": {
            "batch_id": "SAMPLE_OULAD",
            "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
        },
        "expected_matched_rules": [
            "A-G16-R01",
            "A-G16-R02",
            "A-G16-R03",
            "A-G16-R04",
        ],
        "expected_actions": [
            "admin_launch_engagement_outreach",
            "admin_review_high_risk_caseload",
            "admin_review_assessment_support",
            "admin_review_most_used_resource_format",
        ],
        "expected_conflicts": [],
    },
    {
        "case_id": "A-S08_SAMPLE_OULAD",
        "dataset_id": "SAMPLE_OULAD",
        "task_id": "A-S08",
        "params": {
            "batch_id": "SAMPLE_OULAD",
            "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
            "student_id": "SAMPLE_OULAD_STU_100788",
            "enrollment_id": (
                "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_"
                "SAMPLE_OULAD_STU_100788"
            ),
        },
        "expected_matched_rules": [
            "A-S08-R01",
            "A-S08-R02",
            "A-S08-R03",
        ],
        "expected_actions": [
            "staff_review_student_risk_profile",
            "staff_create_submission_support_plan",
            "staff_review_recent_assessment_pattern",
        ],
        "expected_conflicts": ["A-S08-C01"],
    },
    {
        "case_id": "S-T13_SAMPLE_UCI_POR",
        "dataset_id": "SAMPLE_UCI_POR",
        "task_id": "S-T13",
        "params": {
            "batch_id": "SAMPLE_UCI_POR",
            "class_id": "SAMPLE_UCI_POR_CLASS",
            "student_id": "SAMPLE_UCI_POR_STU_000001",
            "enrollment_id": "SAMPLE_UCI_POR_ENR_000001",
        },
        "expected_matched_rules": ["S-T13-R02", "S-T13-R05"],
        "expected_unmatched_rules": ["S-T13-R04"],
        "expected_actions": [
            "student_create_attendance_routine",
            "student_set_next_score_target",
        ],
        "expected_conflicts": [],
    },
    {
        "case_id": "S-T13_SAMPLE_OULAD",
        "dataset_id": "SAMPLE_OULAD",
        "task_id": "S-T13",
        "params": {
            "batch_id": "SAMPLE_OULAD",
            "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
            "student_id": "SAMPLE_OULAD_STU_100788",
            "enrollment_id": (
                "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_"
                "SAMPLE_OULAD_STU_100788"
            ),
        },
        "expected_matched_rules": ["S-T13-R03", "S-T13-R06"],
        "expected_actions": [
            "student_request_advisor_check_in",
            "student_review_recent_assessment_feedback",
        ],
        "expected_conflicts": ["S-T13-C01"],
    },
]


def request_json(
    url: str,
    *,
    method: str = "GET",
    body: dict[str, Any] | None = None,
    timeout: int = 180,
) -> tuple[int, Any]:
    data = None
    headers = {}
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        headers["Content-Type"] = "application/json"
    request = urllib.request.Request(
        url,
        data=data,
        headers=headers,
        method=method,
    )
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            raw = response.read().decode("utf-8")
            return response.status, json.loads(raw) if raw else None
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode("utf-8")
        try:
            payload = json.loads(raw) if raw else None
        except json.JSONDecodeError:
            payload = raw
        return exc.code, payload


def action_config(rule_set: dict[str, Any]) -> AISummaryConfig:
    evidence_columns = [
        item["column"] for item in rule_set["evidence_contract"]
    ]
    trigger_columns = sorted({
        condition["evidence_id"]
        for rule in rule_set["rules"]
        for condition in [
            *rule["trigger"]["all"],
            *rule["trigger"]["any"],
        ]
        if condition["evidence_id"] in evidence_columns
    })
    return AISummaryConfig(
        summary_type="action_synthesis",
        evidence_columns=evidence_columns,
        evidence_dataset_roles=rule_set["source_dataset_roles"],
        action_source="versioned_registry_rules",
        action_rule_set_id=rule_set["rule_set_id"],
        action_rule_version=rule_set["rule_version"],
        action_evidence_contract=rule_set["evidence_contract"],
        action_derived_evidence=rule_set["derived_evidence"],
        action_conflict_rules=rule_set["conflict_rules"],
        action_rules=rule_set["rules"],
        trigger_columns=trigger_columns,
        max_actions=rule_set["max_actions"],
        provenance_required_fields=GLOBAL_PROVENANCE,
        require_complete_action_provenance=True,
        unsupported_action_behavior=rule_set[
            "unsupported_action_behavior"
        ],
        sensitive_action_policy="exclude_sensitive_triggers",
        require_sensitive_action_policy=any(
            item["sensitive"] for item in rule_set["evidence_contract"]
        ),
    )


def validate_ai_service_contract() -> dict[str, Any]:
    health_status, health = request_json(f"{AI_SERVICE_URL}/health")
    openapi_status, openapi = request_json(f"{AI_SERVICE_URL}/openapi.json")
    openapi_text = json.dumps(openapi, ensure_ascii=False) if openapi else ""
    required_fields = [
        "evidence_columns",
        "evidence_dataset_roles",
        "action_rules",
        "action_rule_version",
        "priority_column",
        "owner_column",
        "time_horizon_column",
        "trigger_columns",
        "max_actions",
        "provenance_required_fields",
        "sensitive_action_policy",
    ]
    missing_fields = [
        field for field in required_fields if field not in openapi_text
    ]

    invalid_payload = {
        "task_id": "PHASE4-PARSE-TEST",
        "execution_id": "phase4-parse-test",
        "task_name": "Parse validation test",
        "explanation_strategy": "recommendation",
        "target_audience": ["admin"],
        "datasets": {"synthesis_data": [{"metric": 1}]},
        "query_labels": ["synthesis_data"],
        "ai_summary_config": {
            "summary_type": "action_synthesis",
            "action_source": "versioned_registry_rules",
            "action_rule_set_id": "invalid.missing.version",
            "action_rules": [],
        },
    }
    invalid_status, invalid_response = request_json(
        f"{AI_SERVICE_URL}/explain",
        method="POST",
        body=invalid_payload,
        timeout=30,
    )
    return {
        "health_status": health_status,
        "health": health,
        "openapi_status": openapi_status,
        "missing_action_schema_fields": missing_fields,
        "invalid_config_status": invalid_status,
        "invalid_config_rejected_before_llm": invalid_status == 422,
        "invalid_config_response": invalid_response,
        "passed": (
            health_status == 200
            and openapi_status == 200
            and not missing_fields
            and invalid_status == 422
        ),
    }


def build_request(
    task: dict[str, Any],
    analytics: dict[str, Any],
    config: AISummaryConfig,
) -> ExplainRequest:
    data_quality = analytics.get("meta", {}).get("dataQuality", {})
    return ExplainRequest(
        task_id=task["taskId"],
        execution_id=analytics.get("executionId", "phase4"),
        task_name=task.get("taskName"),
        actionable_question=task.get("actionableQuestion"),
        ai_prompt_hint=task.get("aiPromptHint"),
        explanation_strategy=task.get("explanation_strategy", "recommendation"),
        target_audience=task.get("target_audience") or ["admin"],
        datasets=analytics.get("datasets") or {},
        confidence=ConfidenceInput(
            level=data_quality.get("confidence", "LOW"),
            reason=data_quality.get("confidence_reason", "Unknown"),
        ),
        query_labels=analytics.get("meta", {}).get("query_labels") or [],
        ai_summary_config=config,
    )


def validate_case(
    case: dict[str, Any],
    task: dict[str, Any],
    rule_set: dict[str, Any],
    *,
    config_source: str,
) -> dict[str, Any]:
    analytics_status, analytics = request_json(
        f"{BACKEND_URL}/api/analytics/run",
        method="POST",
        body={"taskId": case["task_id"], "params": case["params"]},
    )
    errors: list[str] = []
    if analytics_status != 200 or not analytics.get("success"):
        errors.append(f"analytics request failed with status {analytics_status}")
        return {
            **case,
            "analytics_status": analytics_status,
            "analytics_response": analytics,
            "passed": False,
            "errors": errors,
        }

    config = (
        build_ai_summary_config(task)
        if config_source == "registry"
        else action_config(rule_set)
    )
    if config is None:
        errors.append("AISummaryConfig could not be built")
        return {
            **case,
            "analytics_status": analytics_status,
            "analytics_response": analytics,
            "passed": False,
            "errors": errors,
        }
    req = build_request(task, analytics, config)
    summary_first = BaseExplanationStrategy._build_task_aware_summary(req)
    summary_second = BaseExplanationStrategy._build_task_aware_summary(req)

    missing_output_keys = sorted(OUTPUT_KEYS - set(summary_first))
    if missing_output_keys:
        errors.append("missing output keys: " + ", ".join(missing_output_keys))

    matched_rules = sorted(
        item["rule_id"]
        for item in summary_first["rule_evaluations"]
        if item["matched"]
    )
    expected_rules = sorted(case["expected_matched_rules"])
    if matched_rules != expected_rules:
        errors.append(
            f"matched rules mismatch: expected {expected_rules}, got {matched_rules}"
        )

    for rule_id in case.get("expected_unmatched_rules", []):
        evaluation = next(
            (
                item for item in summary_first["rule_evaluations"]
                if item["rule_id"] == rule_id
            ),
            None,
        )
        if not evaluation or evaluation["matched"]:
            errors.append(f"expected rule {rule_id} to remain unmatched")

    action_ids = [
        item["action_id"] for item in summary_first["prioritized_actions"]
    ]
    if action_ids != case["expected_actions"]:
        errors.append(
            f"action order mismatch: expected {case['expected_actions']}, "
            f"got {action_ids}"
        )

    conflict_ids = sorted(
        item["conflict_id"]
        for item in summary_first["conflicting_evidence"]
    )
    expected_conflicts = sorted(case["expected_conflicts"])
    if conflict_ids != expected_conflicts:
        errors.append(
            f"conflicts mismatch: expected {expected_conflicts}, got {conflict_ids}"
        )

    evidence_by_id = {
        item["evidence_item_id"]: item
        for item in summary_first["evidence_items"]
    }
    action_provenance = []
    for action in summary_first["prioritized_actions"]:
        linked_items = [
            evidence_by_id.get(evidence_id)
            for evidence_id in action["evidence_item_ids"]
        ]
        complete = (
            bool(action.get("rule_id"))
            and bool(action.get("rule_version"))
            and bool(action.get("evidence_item_ids"))
            and action.get("provenance_status") == "complete"
            and all(linked_items)
        )
        if not complete:
            errors.append(
                f"action {action['action_id']} has incomplete provenance"
            )
        sensitive_links = [
            item["column"]
            for item in linked_items
            if item and (
                item.get("sensitive")
                or item.get("column") in SENSITIVE_COLUMNS
            )
        ]
        if sensitive_links:
            errors.append(
                f"action {action['action_id']} links sensitive evidence "
                + ", ".join(sensitive_links)
            )
        action_provenance.append({
            "action_id": action["action_id"],
            "rule_id": action.get("rule_id"),
            "rule_version": action.get("rule_version"),
            "evidence_item_ids": action.get("evidence_item_ids"),
            "complete": complete,
            "sensitive_links": sensitive_links,
        })

    if summary_first != summary_second:
        errors.append("summarizer output is not deterministic on repeated run")

    if case["case_id"] == "A-S08_SAMPLE_OULAD":
        risk_action = next(
            item for item in summary_first["prioritized_actions"]
            if item["action_id"] == "staff_review_student_risk_profile"
        )
        if len(risk_action["evidence_item_ids"]) < 2:
            errors.append(
                "A-S08 risk-profile action must link multiple evidence items"
            )

    if case["case_id"] == "S-T13_SAMPLE_UCI_POR":
        engagement_item = next(
            (
                item for item in summary_first["evidence_items"]
                if item["column"] == "engagement_score"
            ),
            None,
        )
        if (
            not engagement_item
            or engagement_item["raw_value"] != 0
            or engagement_item["available"] is not False
        ):
            errors.append(
                "UCI engagement raw-zero/unavailable semantics were not preserved"
            )
        if "student_rebuild_engagement_routine" in action_ids:
            errors.append(
                "unavailable engagement evidence incorrectly generated an action"
            )

    return {
        "case_id": case["case_id"],
        "dataset_id": case["dataset_id"],
        "task_id": case["task_id"],
        "config_source": config_source,
        "params": case["params"],
        "analytics_status": analytics_status,
        "analytics_execution_id": analytics.get("executionId"),
        "analytics_meta": analytics.get("meta"),
        "analytics_datasets": analytics.get("datasets"),
        "matched_rule_ids": matched_rules,
        "unmatched_rule_ids": [
            item["rule_id"]
            for item in summary_first["rule_evaluations"]
            if not item["matched"]
        ],
        "prioritized_action_ids": action_ids,
        "conflict_ids": conflict_ids,
        "missing_evidence": summary_first["missing_evidence"],
        "unsupported_actions": summary_first["unsupported_actions"],
        "action_provenance": action_provenance,
        "deterministic_rerun": summary_first == summary_second,
        "summary": summary_first,
        "passed": not errors,
        "errors": errors,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--config-source",
        choices=("canonical", "registry"),
        default="canonical",
    )
    parser.add_argument("--output", type=Path, default=OUTPUT_PATH)
    args = parser.parse_args()

    registry = json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))
    tasks = {task["taskId"]: task for task in registry}
    catalog = json.loads(RULES_PATH.read_text(encoding="utf-8"))
    rule_sets = {
        item["task_id"]: item for item in catalog["rule_sets"]
    }

    ai_service_contract = validate_ai_service_contract()
    case_results = [
        validate_case(
            case,
            tasks[case["task_id"]],
            rule_sets[case["task_id"]],
            config_source=args.config_source,
        )
        for case in CASES
    ]
    report = {
        "validator": "validate_action_synthesis_actual_data.py",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "backend_url": BACKEND_URL,
        "ai_service_url": AI_SERVICE_URL,
        "config_source": args.config_source,
        "ai_service_contract": ai_service_contract,
        "case_count": len(case_results),
        "passed": sum(1 for item in case_results if item["passed"]),
        "failed": sum(1 for item in case_results if not item["passed"]),
        "overall_pass": (
            ai_service_contract["passed"]
            and all(item["passed"] for item in case_results)
        ),
        "cases": case_results,
    }
    args.output.write_text(
        json.dumps(report, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(json.dumps({
        "ai_service_contract_pass": ai_service_contract["passed"],
        "case_count": report["case_count"],
        "passed": report["passed"],
        "failed": report["failed"],
        "overall_pass": report["overall_pass"],
        "cases": [
            {
                "case_id": item["case_id"],
                "passed": item["passed"],
                "actions": item.get("prioritized_action_ids"),
                "matched_rules": item.get("matched_rule_ids"),
                "conflicts": item.get("conflict_ids"),
                "errors": item["errors"],
            }
            for item in case_results
        ],
    }, indent=2, ensure_ascii=False))
    return 0 if report["overall_pass"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
