from __future__ import annotations

import json
import sys
from pathlib import Path


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
    / "action_synthesis_registry_validation.json"
)
TASK_IDS = ("A-G16", "A-S08", "S-T13")

sys.path.insert(0, str(AI_SERVICE))
from debug_ai_summary import build_ai_summary_config  # noqa: E402
from schemas import AISummaryConfig  # noqa: E402


PROVENANCE_FIELDS = [
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


def canonical_expected(rule_set: dict) -> dict:
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
        "provenance_required_fields": PROVENANCE_FIELDS,
        "require_complete_action_provenance": True,
        "unsupported_action_behavior": rule_set[
            "unsupported_action_behavior"
        ],
        "sensitive_action_policy": "exclude_sensitive_triggers",
        "require_sensitive_action_policy": any(
            item["sensitive"] for item in rule_set["evidence_contract"]
        ),
    }


def main() -> int:
    tasks = json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))
    catalog = json.loads(RULES_PATH.read_text(encoding="utf-8"))
    by_id = {task["taskId"]: task for task in tasks}
    rule_sets = {item["task_id"]: item for item in catalog["rule_sets"]}
    errors = []
    configured_results = []

    task_ids = [task.get("taskId") for task in tasks]
    duplicate_ids = sorted({
        task_id for task_id in task_ids if task_ids.count(task_id) > 1
    })
    if duplicate_ids:
        errors.append("duplicate task IDs: " + ", ".join(duplicate_ids))

    configured = [task for task in tasks if task.get("aiSummaryType")]
    for task in configured:
        try:
            config = build_ai_summary_config(task)
            configured_results.append({
                "task_id": task["taskId"],
                "summary_type": config.summary_type if config else None,
                "passed": config is not None,
            })
        except Exception as exc:
            errors.append(
                f"{task.get('taskId')}: {type(exc).__name__}: {exc}"
            )

    target_results = []
    compare_fields = (
        "summary_type",
        "evidence_columns",
        "evidence_dataset_roles",
        "action_source",
        "action_rule_set_id",
        "action_rule_version",
        "action_evidence_contract",
        "action_derived_evidence",
        "action_conflict_rules",
        "action_rules",
        "trigger_columns",
        "max_actions",
        "provenance_required_fields",
        "require_complete_action_provenance",
        "unsupported_action_behavior",
        "sensitive_action_policy",
        "require_sensitive_action_policy",
    )
    for task_id in TASK_IDS:
        task = by_id.get(task_id)
        task_errors = []
        if task is None:
            task_errors.append("task missing")
        else:
            try:
                config = build_ai_summary_config(task)
                observed = config.model_dump(mode="json")
                expected = AISummaryConfig.model_validate(
                    canonical_expected(rule_sets[task_id])
                ).model_dump(mode="json")
                for field in compare_fields:
                    if observed.get(field) != expected.get(field):
                        task_errors.append(f"{field} differs from canonical")
                if task.get("aiSummaryType") != "action_synthesis":
                    task_errors.append("aiSummaryType is not action_synthesis")
                if not task.get("aiPromptHint"):
                    task_errors.append("aiPromptHint was removed")
            except Exception as exc:
                task_errors.append(f"{type(exc).__name__}: {exc}")
        target_results.append({
            "task_id": task_id,
            "passed": not task_errors,
            "errors": task_errors,
        })
        errors.extend(f"{task_id}: {error}" for error in task_errors)

    report = {
        "validator": "validate_action_synthesis_registry.py",
        "registry_task_count": len(tasks),
        "configured_task_count": len(configured),
        "configured_task_parse_passed": sum(
            item["passed"] for item in configured_results
        ),
        "configured_task_parse_failed": sum(
            not item["passed"] for item in configured_results
        ),
        "target_task_count": len(TASK_IDS),
        "target_passed": sum(item["passed"] for item in target_results),
        "target_failed": sum(not item["passed"] for item in target_results),
        "npm_registry_validator_status": (
            "unavailable_missing_Backend_scripts_validateRegistry_js"
        ),
        "target_results": target_results,
        "errors": errors,
        "overall_pass": not errors,
    }
    OUTPUT_PATH.write_text(
        json.dumps(report, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0 if report["overall_pass"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
