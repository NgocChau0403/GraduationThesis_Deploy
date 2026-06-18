from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[3]
AI_SERVICE = ROOT / "AIService"
OUTPUT_PATH = (
    ROOT
    / "Docs"
    / "evaluation_v2"
    / "ai_explanation_judge_v2"
    / "trend_comparison_dynamic_groups_validation.json"
)
BACKEND_URL = "http://localhost:4000"

sys.path.insert(0, str(AI_SERVICE))

from schemas import AISummaryConfig, ConfidenceInput, ExplainRequest  # noqa: E402
from strategies.base import BaseExplanationStrategy  # noqa: E402


CASES = [
    {
        "case_id": "A-C01_SAMPLE_UCI_POR",
        "dataset_id": "SAMPLE_UCI_POR",
        "params": {
            "batch_id": "SAMPLE_UCI_POR",
            "class_id": "SAMPLE_UCI_POR_CLASS",
            "s1": "SAMPLE_UCI_POR_STU_000001",
            "s2": "SAMPLE_UCI_POR_STU_000002",
        },
        "expected_groups": [
            "SAMPLE_UCI_POR_STU_000001",
            "SAMPLE_UCI_POR_STU_000002",
        ],
        "expected_row_count": 6,
        "expected_shared_points": 3,
        "expected_unmatched": {
            "SAMPLE_UCI_POR_STU_000001": 0,
            "SAMPLE_UCI_POR_STU_000002": 0,
        },
        "expected_first_divergence_order": 1,
        "expected_largest_gap": 45,
        "expected_net_change": {
            "SAMPLE_UCI_POR_STU_000001": 55,
            "SAMPLE_UCI_POR_STU_000002": 10,
        },
        "expected_faster_group": "SAMPLE_UCI_POR_STU_000001",
    },
    {
        "case_id": "A-C01_SAMPLE_OULAD",
        "dataset_id": "SAMPLE_OULAD",
        "params": {
            "batch_id": "SAMPLE_OULAD",
            "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
            "s1": "SAMPLE_OULAD_STU_100788",
            "s2": "SAMPLE_OULAD_STU_102209",
        },
        "expected_groups": [
            "SAMPLE_OULAD_STU_100788",
            "SAMPLE_OULAD_STU_102209",
        ],
        "expected_row_count": 20,
        "expected_shared_points": 3,
        "expected_unmatched": {
            "SAMPLE_OULAD_STU_100788": 14,
            "SAMPLE_OULAD_STU_102209": 0,
        },
        "expected_first_divergence_order": 1,
        "expected_largest_gap": 44,
        "expected_net_change": {
            "SAMPLE_OULAD_STU_100788": -13,
            "SAMPLE_OULAD_STU_102209": -5,
        },
        "expected_faster_group": "SAMPLE_OULAD_STU_102209",
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


def dynamic_config() -> AISummaryConfig:
    return AISummaryConfig(
        summary_type="trend_comparison",
        dynamic_comparison_groups=True,
        comparison_alignment_columns=[
            "assessment_order",
            "assessment_type",
        ],
        divergence_threshold=5,
        group_column="student_id",
        time_column="assessment_order",
        metric_column="score_normalized",
        minimum_entity_count=2,
        max_points=50,
    )


def build_request(analytics: dict[str, Any]) -> ExplainRequest:
    return ExplainRequest(
        task_id="A-C01",
        execution_id=analytics.get("executionId", "validation"),
        task_name="Compare performance trajectories",
        actionable_question=(
            "Which student is improving faster and when did their paths diverge?"
        ),
        ai_prompt_hint=(
            "Explain divergence points. Identify when one student fell behind "
            "relative to the other."
        ),
        explanation_strategy="comparison",
        target_audience=["instructor"],
        datasets=analytics.get("datasets") or {},
        confidence=ConfidenceInput(
            level=analytics.get("meta", {})
            .get("dataQuality", {})
            .get("confidence", "LOW"),
            reason=analytics.get("meta", {})
            .get("dataQuality", {})
            .get("confidence_reason", "Unknown"),
        ),
        query_labels=["trajectory_comparison"],
        ai_summary_config=dynamic_config(),
    )


def validate_parse_contract() -> dict[str, Any]:
    errors = []
    try:
        dynamic_config()
    except Exception as exc:  # pragma: no cover - reported in artifact
        errors.append(f"valid dynamic config rejected: {exc}")

    negative_cases = [
        {
            "name": "missing_alignment_columns",
            "payload": {
                "summary_type": "trend_comparison",
                "dynamic_comparison_groups": True,
                "divergence_threshold": 5,
                "group_column": "student_id",
                "time_column": "assessment_order",
                "metric_column": "score_normalized",
            },
        },
        {
            "name": "missing_divergence_threshold",
            "payload": {
                "summary_type": "trend_comparison",
                "dynamic_comparison_groups": True,
                "comparison_alignment_columns": ["assessment_order"],
                "group_column": "student_id",
                "time_column": "assessment_order",
                "metric_column": "score_normalized",
            },
        },
        {
            "name": "mixed_static_and_dynamic_groups",
            "payload": {
                "summary_type": "trend_comparison",
                "dynamic_comparison_groups": True,
                "comparison_alignment_columns": ["assessment_order"],
                "divergence_threshold": 5,
                "target_group": "S001",
                "group_column": "student_id",
                "time_column": "assessment_order",
                "metric_column": "score_normalized",
            },
        },
    ]
    results = []
    for case in negative_cases:
        rejected = False
        detail = None
        try:
            AISummaryConfig(**case["payload"])
        except Exception as exc:
            rejected = True
            detail = str(exc)
        if not rejected:
            errors.append(f"{case['name']} was not rejected")
        results.append({
            "case": case["name"],
            "rejected": rejected,
            "detail": detail,
        })

    return {
        "positive_config_passed": not any(
            item.startswith("valid dynamic") for item in errors
        ),
        "negative_case_count": len(results),
        "negative_cases_passed": sum(
            1 for item in results if item["rejected"]
        ),
        "negative_results": results,
        "errors": errors,
        "passed": not errors,
    }


def validate_case(case: dict[str, Any]) -> dict[str, Any]:
    status, analytics = request_json(
        f"{BACKEND_URL}/api/analytics/run",
        method="POST",
        body={"taskId": "A-C01", "params": case["params"]},
    )
    errors = []
    if status != 200 or not analytics.get("success"):
        errors.append(f"analytics failed with status {status}")
        return {
            "case_id": case["case_id"],
            "analytics_status": status,
            "analytics_response": analytics,
            "passed": False,
            "errors": errors,
        }

    request = build_request(analytics)
    first = BaseExplanationStrategy._build_task_aware_summary(request)
    second = BaseExplanationStrategy._build_task_aware_summary(request)
    pairwise = first.get("pairwise_comparison") or {}

    if first.get("row_count") != case["expected_row_count"]:
        errors.append(
            f"row_count expected {case['expected_row_count']}, "
            f"got {first.get('row_count')}"
        )
    if first.get("available_groups") != case["expected_groups"]:
        errors.append(
            f"groups expected {case['expected_groups']}, "
            f"got {first.get('available_groups')}"
        )
    if first.get("evidence_status") != "sufficient_evidence":
        errors.append(
            f"evidence_status is {first.get('evidence_status')}"
        )
    if pairwise.get("shared_point_count") != case["expected_shared_points"]:
        errors.append(
            f"shared points expected {case['expected_shared_points']}, "
            f"got {pairwise.get('shared_point_count')}"
        )
    if pairwise.get("unmatched_point_count_by_group") != case["expected_unmatched"]:
        errors.append(
            "unmatched point counts mismatch: "
            f"{pairwise.get('unmatched_point_count_by_group')}"
        )

    first_divergence = pairwise.get("first_divergence") or {}
    observed_order = (
        first_divergence.get("alignment", {}).get("assessment_order")
    )
    if observed_order != case["expected_first_divergence_order"]:
        errors.append(
            f"first divergence order expected "
            f"{case['expected_first_divergence_order']}, got {observed_order}"
        )

    largest_gap = pairwise.get("largest_absolute_gap") or {}
    if largest_gap.get("absolute_gap") != case["expected_largest_gap"]:
        errors.append(
            f"largest gap expected {case['expected_largest_gap']}, "
            f"got {largest_gap.get('absolute_gap')}"
        )
    if pairwise.get("net_change_by_group") != case["expected_net_change"]:
        errors.append(
            "net change mismatch: "
            f"{pairwise.get('net_change_by_group')}"
        )
    if pairwise.get("faster_improving_group") != case["expected_faster_group"]:
        errors.append(
            f"faster group expected {case['expected_faster_group']}, "
            f"got {pairwise.get('faster_improving_group')}"
        )
    if first != second:
        errors.append("summary is not deterministic")

    compact = json.loads(
        BaseExplanationStrategy._dump_summary(first, char_limit=1500)
    )
    for key in ("group_trends", "pairwise_comparison", "available_groups"):
        if key not in compact:
            errors.append(f"compact output lost {key}")

    return {
        "case_id": case["case_id"],
        "dataset_id": case["dataset_id"],
        "params": case["params"],
        "analytics_status": status,
        "analytics_execution_id": analytics.get("executionId"),
        "analytics_meta": analytics.get("meta"),
        "analytics_datasets": analytics.get("datasets"),
        "summary": first,
        "deterministic_rerun": first == second,
        "compact_output": compact,
        "passed": not errors,
        "errors": errors,
    }


def main() -> int:
    parse_contract = validate_parse_contract()
    cases = [validate_case(case) for case in CASES]
    report = {
        "validator": "validate_trend_comparison_dynamic_groups.py",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "backend_url": BACKEND_URL,
        "task_id": "A-C01",
        "config_source": "canonical_pre_migration",
        "parse_contract": parse_contract,
        "case_count": len(cases),
        "passed": sum(1 for case in cases if case["passed"]),
        "failed": sum(1 for case in cases if not case["passed"]),
        "overall_pass": (
            parse_contract["passed"]
            and all(case["passed"] for case in cases)
        ),
        "cases": cases,
    }
    OUTPUT_PATH.write_text(
        json.dumps(report, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(json.dumps({
        "parse_contract_pass": parse_contract["passed"],
        "case_count": report["case_count"],
        "passed": report["passed"],
        "failed": report["failed"],
        "overall_pass": report["overall_pass"],
        "cases": [
            {
                "case_id": case["case_id"],
                "passed": case["passed"],
                "groups": case.get("summary", {}).get("available_groups"),
                "shared_points": (
                    case.get("summary", {})
                    .get("pairwise_comparison", {})
                    .get("shared_point_count")
                ),
                "faster_group": (
                    case.get("summary", {})
                    .get("pairwise_comparison", {})
                    .get("faster_improving_group")
                ),
                "errors": case["errors"],
            }
            for case in cases
        ],
    }, indent=2, ensure_ascii=False))
    return 0 if report["overall_pass"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
