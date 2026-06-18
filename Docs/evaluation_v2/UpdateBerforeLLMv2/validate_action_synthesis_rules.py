from __future__ import annotations

import argparse
import copy
import json
import re
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent
DEFAULT_CATALOG = ROOT / "action_synthesis_rules.v1.json"
DEFAULT_FIXTURES = ROOT / "action_synthesis_rule_validation_fixtures.json"
DEFAULT_OUTPUT = ROOT / "action_synthesis_rule_validation.json"

SEMVER_RE = re.compile(r"^\d+\.\d+\.\d+$")
ALLOWED_OPERATORS = {
    "eq",
    "neq",
    "gt",
    "gte",
    "lt",
    "lte",
    "is_present",
    "is_true",
}
ALLOWED_PRIORITIES = {"critical", "high", "medium", "low"}
REQUIRED_PROVENANCE = {
    "dataset_label",
    "dataset_role",
    "row_index",
    "column",
    "raw_value",
    "parsed_value",
    "unit",
    "rule_id",
    "rule_version",
}


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def apply_mutation(document: Any, mutation: dict[str, Any]) -> None:
    parts = mutation["path"].split(".")
    target = document
    for part in parts[:-1]:
        target = target[int(part)] if isinstance(target, list) else target[part]
    final = parts[-1]
    operation = mutation["operation"]
    if operation == "set":
        if isinstance(target, list):
            target[int(final)] = mutation["value"]
        else:
            target[final] = mutation["value"]
    elif operation == "delete":
        if isinstance(target, list):
            del target[int(final)]
        else:
            target.pop(final, None)
    else:
        raise ValueError(f"unsupported fixture mutation operation: {operation}")


def validate_condition(
    condition: dict[str, Any],
    evidence_by_id: dict[str, dict[str, Any]],
    derived_ids: set[str],
    errors: list[str],
    context: str,
) -> None:
    evidence_id = condition.get("evidence_id")
    if not evidence_id:
        errors.append(f"{context}: missing evidence_id")
        return
    if evidence_id not in evidence_by_id and evidence_id not in derived_ids:
        errors.append(f"{context}: unknown evidence {evidence_id}")

    operator = condition.get("operator")
    if operator not in ALLOWED_OPERATORS:
        errors.append(f"{context}: unsupported operator {operator}")

    has_value = "value" in condition
    has_comparison = "compare_to_evidence_id" in condition
    if operator not in {"is_present", "is_true"} and has_value == has_comparison:
        errors.append(
            f"{context}: condition must provide exactly one of value or "
            "compare_to_evidence_id"
        )
    if operator in {"is_present", "is_true"} and (has_value or has_comparison):
        errors.append(f"{context}: {operator} must not have comparison operand")

    compare_to = condition.get("compare_to_evidence_id")
    if compare_to and compare_to not in evidence_by_id and compare_to not in derived_ids:
        errors.append(f"{context}: unknown evidence {compare_to}")


def validate_trigger(
    trigger: dict[str, Any],
    evidence_by_id: dict[str, dict[str, Any]],
    derived_ids: set[str],
    errors: list[str],
    context: str,
) -> list[dict[str, Any]]:
    if not isinstance(trigger, dict):
        errors.append(f"{context}: trigger must be an object")
        return []
    if "all" not in trigger or "any" not in trigger:
        errors.append(f"{context}: trigger must contain all and any")
        return []
    all_conditions = trigger.get("all")
    any_conditions = trigger.get("any")
    if not isinstance(all_conditions, list) or not isinstance(any_conditions, list):
        errors.append(f"{context}: all and any must be arrays")
        return []
    if not all_conditions and not any_conditions:
        errors.append(f"{context}: trigger must contain at least one condition")
    conditions = all_conditions + any_conditions
    for index, condition in enumerate(conditions):
        if not isinstance(condition, dict):
            errors.append(f"{context}.condition[{index}]: must be an object")
            continue
        validate_condition(
            condition,
            evidence_by_id,
            derived_ids,
            errors,
            f"{context}.condition[{index}]",
        )
    return conditions


def validate_catalog(catalog: dict[str, Any]) -> list[str]:
    errors: list[str] = []

    if catalog.get("summary_type") != "action_synthesis":
        errors.append("summary_type must be action_synthesis")
    if catalog.get("action_source") != "versioned_registry_rules":
        errors.append("action_source must be versioned_registry_rules")
    if not SEMVER_RE.match(str(catalog.get("catalog_version", ""))):
        errors.append("catalog_version must be semantic version")

    rule_sets = catalog.get("rule_sets")
    if not isinstance(rule_sets, list) or not rule_sets:
        errors.append("rule_sets must be a non-empty array")
        return errors

    task_ids: set[str] = set()
    rule_set_ids: set[str] = set()
    global_rule_ids: set[str] = set()

    for set_index, rule_set in enumerate(rule_sets):
        context = f"rule_sets[{set_index}]"
        if not isinstance(rule_set, dict):
            errors.append(f"{context}: must be an object")
            continue

        task_id = rule_set.get("task_id")
        if not task_id:
            errors.append(f"{context}: missing task_id")
        elif task_id in task_ids:
            errors.append(f"{context}: duplicate task_id {task_id}")
        else:
            task_ids.add(task_id)

        rule_set_id = rule_set.get("rule_set_id")
        if not rule_set_id:
            errors.append(f"{context}: missing rule_set_id")
        elif rule_set_id in rule_set_ids:
            errors.append(f"{context}: duplicate rule_set_id {rule_set_id}")
        else:
            rule_set_ids.add(rule_set_id)

        rule_version = rule_set.get("rule_version")
        if not rule_version:
            errors.append(f"{context}: missing rule_version")
        elif not SEMVER_RE.match(str(rule_version)):
            errors.append(f"{context}: rule_version must be semantic version")

        if rule_set.get("unsupported_action_behavior") != "emit_unsupported_actions":
            errors.append(
                f"{context}: unsupported_action_behavior must be "
                "emit_unsupported_actions"
            )

        max_actions = rule_set.get("max_actions")
        if not isinstance(max_actions, int) or max_actions < 1:
            errors.append(f"{context}: max_actions must be a positive integer")

        evidence_contract = rule_set.get("evidence_contract")
        if not isinstance(evidence_contract, list) or not evidence_contract:
            errors.append(f"{context}: evidence_contract must be non-empty")
            continue

        evidence_by_id: dict[str, dict[str, Any]] = {}
        availability_targets: dict[str, str] = {}
        for evidence_index, evidence in enumerate(evidence_contract):
            evidence_context = f"{context}.evidence_contract[{evidence_index}]"
            if not isinstance(evidence, dict):
                errors.append(f"{evidence_context}: must be an object")
                continue
            column = evidence.get("column")
            if not column:
                errors.append(f"{evidence_context}: missing column")
                continue
            if column in evidence_by_id:
                errors.append(f"{evidence_context}: duplicate column {column}")
            evidence_by_id[column] = evidence
            if evidence.get("sensitive") and evidence.get("allowed_as_trigger"):
                errors.append(
                    f"{context}: sensitive evidence {column} cannot be allowed as trigger"
                )
            availability_column = evidence.get("availability_column")
            if availability_column:
                availability_targets[column] = availability_column

        for column, availability_column in availability_targets.items():
            if availability_column not in evidence_by_id:
                errors.append(
                    f"{context}: availability column {availability_column} for "
                    f"{column} is not declared"
                )

        derived = rule_set.get("derived_evidence", [])
        if not isinstance(derived, list):
            errors.append(f"{context}: derived_evidence must be an array")
            derived = []
        derived_ids: set[str] = set()
        for derived_index, item in enumerate(derived):
            derived_context = f"{context}.derived_evidence[{derived_index}]"
            if not isinstance(item, dict):
                errors.append(f"{derived_context}: must be an object")
                continue
            evidence_id = item.get("evidence_id")
            if not evidence_id:
                errors.append(f"{derived_context}: missing evidence_id")
                continue
            if evidence_id in derived_ids or evidence_id in evidence_by_id:
                errors.append(f"{derived_context}: duplicate evidence_id {evidence_id}")
            derived_ids.add(evidence_id)
            if item.get("operation") != "safe_divide":
                errors.append(f"{derived_context}: only safe_divide is supported")
            for operand in ("numerator_column", "denominator_column"):
                column = item.get(operand)
                if column not in evidence_by_id:
                    errors.append(
                        f"{derived_context}: unknown {operand} {column}"
                    )
            if item.get("zero_denominator_behavior") != "missing":
                errors.append(
                    f"{derived_context}: zero_denominator_behavior must be missing"
                )

        conflict_rules = rule_set.get("conflict_rules", [])
        if not isinstance(conflict_rules, list):
            errors.append(f"{context}: conflict_rules must be an array")
            conflict_rules = []
        for conflict_index, conflict in enumerate(conflict_rules):
            conflict_context = f"{context}.conflict_rules[{conflict_index}]"
            if not isinstance(conflict, dict):
                errors.append(f"{conflict_context}: must be an object")
                continue
            validate_trigger(
                conflict.get("when"),
                evidence_by_id,
                derived_ids,
                errors,
                f"{conflict_context}.when",
            )
            if conflict.get("behavior") != "preserve_and_warn":
                errors.append(
                    f"{conflict_context}: behavior must be preserve_and_warn"
                )

        rules = rule_set.get("rules")
        if not isinstance(rules, list) or not rules:
            errors.append(f"{context}: rules must be a non-empty array")
            continue

        action_ids: set[str] = set()
        for rule_index, rule in enumerate(rules):
            rule_context = f"{context}.rules[{rule_index}]"
            if not isinstance(rule, dict):
                errors.append(f"{rule_context}: must be an object")
                continue
            rule_id = rule.get("rule_id")
            if not rule_id:
                errors.append(f"{rule_context}: missing rule_id")
            elif rule_id in global_rule_ids:
                errors.append(f"{rule_context}: duplicate rule_id {rule_id}")
            else:
                global_rule_ids.add(rule_id)

            conditions = validate_trigger(
                rule.get("trigger"),
                evidence_by_id,
                derived_ids,
                errors,
                f"{rule_context}.trigger",
            )

            all_conditions = (
                rule.get("trigger", {}).get("all", [])
                if isinstance(rule.get("trigger"), dict)
                else []
            )
            all_evidence_ids = {
                condition.get("evidence_id")
                for condition in all_conditions
                if isinstance(condition, dict)
            }
            for condition in conditions:
                evidence_id = condition.get("evidence_id")
                evidence = evidence_by_id.get(evidence_id)
                if evidence and not evidence.get("allowed_as_trigger"):
                    if evidence_id not in availability_targets.values():
                        errors.append(
                            f"{rule_context}: evidence {evidence_id} is not allowed "
                            "as trigger"
                        )
                availability_column = availability_targets.get(evidence_id)
                if availability_column and availability_column not in all_evidence_ids:
                    errors.append(
                        f"{rule_context}: evidence {evidence_id} requires "
                        f"availability guard {availability_column}"
                    )

            action = rule.get("action")
            if not isinstance(action, dict):
                errors.append(f"{rule_context}: action must be an object")
                continue
            action_id = action.get("action_id")
            if not action_id:
                errors.append(f"{rule_context}: missing action_id")
            else:
                action_ids.add(action_id)
            if action.get("priority") not in ALLOWED_PRIORITIES:
                errors.append(f"{rule_context}: invalid priority")
            if not action.get("owner"):
                errors.append(f"{rule_context}: missing owner")
            time_horizon = action.get("time_horizon_days")
            if not isinstance(time_horizon, int) or time_horizon < 0:
                errors.append(
                    f"{rule_context}: time_horizon_days must be a non-negative integer"
                )
            claim_limits = action.get("claim_limits")
            if not isinstance(claim_limits, list) or not claim_limits:
                errors.append(f"{rule_context}: claim_limits must be non-empty")

            if rule_id == "A-G16-R04":
                action_text = str(action.get("action_text", "")).lower()
                banned_effectiveness_claims = (
                    "best-performing",
                    "improves learning",
                    "most effective",
                )
                if any(claim in action_text for claim in banned_effectiveness_claims):
                    errors.append(
                        f"{rule_context}: best_resource_type action makes an "
                        "effectiveness claim"
                    )

            provenance = rule.get("provenance_requirements")
            if not isinstance(provenance, list):
                errors.append(
                    f"{rule_context}: provenance_requirements must be an array"
                )
            else:
                missing_provenance = sorted(REQUIRED_PROVENANCE - set(provenance))
                if missing_provenance:
                    errors.append(
                        f"{rule_context}: missing required provenance fields "
                        + ", ".join(missing_provenance)
                    )
                uses_availability = any(
                    condition.get("evidence_id") in availability_targets
                    for condition in conditions
                    if isinstance(condition, dict)
                )
                if uses_availability and "availability_state" not in provenance:
                    errors.append(
                        f"{rule_context}: availability-aware rule must require "
                        "availability_state provenance"
                    )

        if len(action_ids) > max_actions and not rules:
            errors.append(f"{context}: invalid action capacity")

    expected_tasks = {"A-G16", "A-S08", "S-T13"}
    missing_tasks = sorted(expected_tasks - task_ids)
    if missing_tasks:
        errors.append("catalog missing task rule sets: " + ", ".join(missing_tasks))

    return errors


def run_fixture_cases(
    canonical_catalog: dict[str, Any],
    fixtures: dict[str, Any],
) -> list[dict[str, Any]]:
    results: list[dict[str, Any]] = []
    for fixture in fixtures.get("cases", []):
        case_id = fixture["case_id"]
        case_catalog = copy.deepcopy(canonical_catalog)
        for mutation in fixture.get("mutations", []):
            apply_mutation(case_catalog, mutation)
        errors = validate_catalog(case_catalog)
        actual_valid = not errors
        expected_valid = fixture["expected_valid"]
        expected_error = fixture.get("expected_error_contains")
        expectation_met = actual_valid == expected_valid
        if expected_error:
            expectation_met = expectation_met and any(
                expected_error in error for error in errors
            )
        results.append(
            {
                "case_id": case_id,
                "expected_valid": expected_valid,
                "actual_valid": actual_valid,
                "expectation_met": expectation_met,
                "expected_error_contains": expected_error,
                "errors": errors,
            }
        )
    return results


def parse_runtime_value(value: Any) -> Any:
    if isinstance(value, str):
        stripped = value.strip()
        try:
            return float(stripped)
        except ValueError:
            return value
    return value


def build_runtime_evidence(
    rule_set: dict[str, Any],
    row: dict[str, Any],
) -> tuple[dict[str, Any], set[str]]:
    evidence: dict[str, Any] = {}
    unavailable: set[str] = set()
    for item in rule_set["evidence_contract"]:
        column = item["column"]
        raw_value = row.get(column)
        evidence[column] = parse_runtime_value(raw_value)
        availability_column = item.get("availability_column")
        if availability_column and row.get(availability_column) is not True:
            unavailable.add(column)

    for item in rule_set.get("derived_evidence", []):
        numerator = evidence.get(item["numerator_column"])
        denominator = evidence.get(item["denominator_column"])
        evidence_id = item["evidence_id"]
        if (
            numerator is None
            or denominator is None
            or not isinstance(numerator, (int, float))
            or not isinstance(denominator, (int, float))
            or denominator == 0
        ):
            evidence[evidence_id] = None
        else:
            evidence[evidence_id] = numerator / denominator
    return evidence, unavailable


def evaluate_condition(
    condition: dict[str, Any],
    evidence: dict[str, Any],
    unavailable: set[str],
) -> bool:
    evidence_id = condition["evidence_id"]
    if evidence_id in unavailable:
        return False
    left = evidence.get(evidence_id)
    operator = condition["operator"]
    if operator == "is_present":
        return left is not None and left != ""
    if operator == "is_true":
        return left is True
    if left is None:
        return False

    if "compare_to_evidence_id" in condition:
        compare_id = condition["compare_to_evidence_id"]
        if compare_id in unavailable:
            return False
        right = evidence.get(compare_id)
    else:
        right = condition.get("value")
    if right is None:
        return False

    try:
        if operator == "eq":
            return left == right
        if operator == "neq":
            return left != right
        if operator == "gt":
            return left > right
        if operator == "gte":
            return left >= right
        if operator == "lt":
            return left < right
        if operator == "lte":
            return left <= right
    except TypeError:
        return False
    return False


def evaluate_trigger(
    trigger: dict[str, Any],
    evidence: dict[str, Any],
    unavailable: set[str],
) -> bool:
    all_conditions = trigger.get("all", [])
    any_conditions = trigger.get("any", [])
    all_match = all(
        evaluate_condition(condition, evidence, unavailable)
        for condition in all_conditions
    )
    any_match = (
        True
        if not any_conditions
        else any(
            evaluate_condition(condition, evidence, unavailable)
            for condition in any_conditions
        )
    )
    return all_match and any_match


def run_runtime_cases(
    canonical_catalog: dict[str, Any],
    fixtures: dict[str, Any],
) -> list[dict[str, Any]]:
    rule_sets = {
        rule_set["task_id"]: rule_set
        for rule_set in canonical_catalog.get("rule_sets", [])
    }
    results: list[dict[str, Any]] = []
    for fixture in fixtures.get("runtime_cases", []):
        task_id = fixture["task_id"]
        rule_set = rule_sets.get(task_id)
        if rule_set is None:
            results.append(
                {
                    "case_id": fixture["case_id"],
                    "expectation_met": False,
                    "errors": [f"missing rule set for {task_id}"],
                }
            )
            continue

        evidence, unavailable = build_runtime_evidence(rule_set, fixture["row"])
        matched_rules = sorted(
            rule["rule_id"]
            for rule in rule_set["rules"]
            if evaluate_trigger(rule["trigger"], evidence, unavailable)
        )
        matched_conflicts = sorted(
            conflict["conflict_id"]
            for conflict in rule_set.get("conflict_rules", [])
            if evaluate_trigger(conflict["when"], evidence, unavailable)
        )
        expected_rules = sorted(fixture.get("expected_matched_rule_ids", []))
        expected_conflicts = sorted(fixture.get("expected_conflict_ids", []))
        expected_unmatched = set(fixture.get("expected_unmatched_rule_ids", []))
        expectation_met = (
            matched_rules == expected_rules
            and matched_conflicts == expected_conflicts
            and not expected_unmatched.intersection(matched_rules)
        )
        results.append(
            {
                "case_id": fixture["case_id"],
                "task_id": task_id,
                "expectation_met": expectation_met,
                "matched_rule_ids": matched_rules,
                "expected_matched_rule_ids": expected_rules,
                "matched_conflict_ids": matched_conflicts,
                "expected_conflict_ids": expected_conflicts,
                "unavailable_evidence": sorted(unavailable),
            }
        )
    return results


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--catalog", type=Path, default=DEFAULT_CATALOG)
    parser.add_argument("--fixtures", type=Path, default=DEFAULT_FIXTURES)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    catalog = load_json(args.catalog)
    fixtures = load_json(args.fixtures)
    catalog_errors = validate_catalog(catalog)
    fixture_results = run_fixture_cases(catalog, fixtures)
    runtime_results = run_runtime_cases(catalog, fixtures)

    report = {
        "validator": "validate_action_synthesis_rules.py",
        "catalog": str(args.catalog),
        "catalog_valid": not catalog_errors,
        "catalog_errors": catalog_errors,
        "fixture_count": len(fixture_results),
        "fixture_passed": sum(
            1 for result in fixture_results if result["expectation_met"]
        ),
        "fixture_failed": sum(
            1 for result in fixture_results if not result["expectation_met"]
        ),
        "fixture_results": fixture_results,
        "runtime_case_count": len(runtime_results),
        "runtime_case_passed": sum(
            1 for result in runtime_results if result["expectation_met"]
        ),
        "runtime_case_failed": sum(
            1 for result in runtime_results if not result["expectation_met"]
        ),
        "runtime_case_results": runtime_results,
        "overall_pass": (
            not catalog_errors
            and all(result["expectation_met"] for result in fixture_results)
            and all(result["expectation_met"] for result in runtime_results)
        ),
    }
    args.output.write_text(
        json.dumps(report, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0 if report["overall_pass"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
