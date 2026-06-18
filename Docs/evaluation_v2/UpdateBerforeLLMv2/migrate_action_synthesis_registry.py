from __future__ import annotations

import argparse
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
REGISTRY_PATH = ROOT / "Backend" / "src" / "config" / "taskRegistry.json"
RULES_PATH = (
    ROOT
    / "Docs"
    / "evaluation_v2"
    / "ai_explanation_judge_v2"
    / "action_synthesis_rules.v1.json"
)
TASK_IDS = ("A-G16", "A-S08", "S-T13")
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


def registry_config(rule_set: dict) -> dict:
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
        "aiSummaryType": "action_synthesis",
        "aiEvidenceColumns": evidence_columns,
        "aiEvidenceDatasetRoles": rule_set["source_dataset_roles"],
        "aiActionSource": "versioned_registry_rules",
        "aiActionRuleSetId": rule_set["rule_set_id"],
        "aiActionRuleVersion": rule_set["rule_version"],
        "aiActionEvidenceContract": rule_set["evidence_contract"],
        "aiActionDerivedEvidence": rule_set["derived_evidence"],
        "aiActionConflictRules": rule_set["conflict_rules"],
        "aiActionRules": rule_set["rules"],
        "aiTriggerColumns": trigger_columns,
        "aiMaxActions": rule_set["max_actions"],
        "aiProvenanceRequiredFields": PROVENANCE_FIELDS,
        "aiRequireCompleteActionProvenance": True,
        "aiUnsupportedActionBehavior": rule_set[
            "unsupported_action_behavior"
        ],
        "aiSensitiveActionPolicy": "exclude_sensitive_triggers",
        "aiRequireSensitiveActionPolicy": any(
            item["sensitive"] for item in rule_set["evidence_contract"]
        ),
    }


def render_config_properties(config: dict, newline: str) -> str:
    rendered = json.dumps(config, indent=2, ensure_ascii=False)
    lines = rendered.splitlines()[1:-1]
    shifted = ["  " + line for line in lines]
    shifted[-1] += ","
    return newline.join(shifted) + newline


def migrate(raw: str, catalog: dict) -> tuple[str, list[dict]]:
    newline = "\r\n" if "\r\n" in raw else "\n"
    rule_sets = {item["task_id"]: item for item in catalog["rule_sets"]}
    changes = []
    updated = raw

    for task_id in TASK_IDS:
        marker = (
            f'  {{{newline}'
            f'    "taskId": "{task_id}",{newline}'
        )
        count = updated.count(marker)
        if count != 1:
            raise RuntimeError(
                f"{task_id}: expected one task object marker, found {count}"
            )

        marker_index = updated.index(marker)
        next_task_index = updated.find(f'{newline}  {{', marker_index + len(marker))
        object_slice = updated[
            marker_index:
            next_task_index if next_task_index >= 0 else len(updated)
        ]
        if '"aiSummaryType"' in object_slice:
            raise RuntimeError(
                f"{task_id}: aiSummaryType already exists; refusing overwrite"
            )

        config = registry_config(rule_sets[task_id])
        insertion = marker + render_config_properties(config, newline)
        updated = updated.replace(marker, insertion, 1)
        changes.append({
            "task_id": task_id,
            "rule_set_id": config["aiActionRuleSetId"],
            "rule_version": config["aiActionRuleVersion"],
            "rule_count": len(config["aiActionRules"]),
            "evidence_count": len(config["aiEvidenceColumns"]),
            "ai_prompt_hint_changed": False,
        })

    return updated, changes


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()

    with REGISTRY_PATH.open("r", encoding="utf-8", newline="") as handle:
        raw = handle.read()
    catalog = json.loads(RULES_PATH.read_text(encoding="utf-8"))
    updated, changes = migrate(raw, catalog)

    json.loads(updated)
    result = {
        "registry_path": str(REGISTRY_PATH),
        "mode": "apply" if args.apply else "check",
        "changed": updated != raw,
        "changes": changes,
    }
    if args.apply:
        with REGISTRY_PATH.open("w", encoding="utf-8", newline="") as handle:
            handle.write(updated)
        result["written"] = True
    else:
        result["written"] = False
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
