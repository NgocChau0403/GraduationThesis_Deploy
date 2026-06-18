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
    / "trend_series_multi_evidence_validation.json"
)
BACKEND_URL = "http://localhost:4000"

sys.path.insert(0, str(AI_SERVICE))

from schemas import AISummaryConfig, ConfidenceInput, ExplainRequest  # noqa: E402
from strategies.base import BaseExplanationStrategy  # noqa: E402


OULAD_STUDENT = "SAMPLE_OULAD_STU_100788"
OULAD_CLASS = "SAMPLE_OULAD_CLASS_CCC_2014J"


CASES = [
    {
        "case_id": "A-S06_SAMPLE_OULAD_CCC_2014J",
        "task_id": "A-S06",
        "params": {
            "batch_id": "SAMPLE_OULAD",
            "class_id": OULAD_CLASS,
            "student_id": OULAD_STUDENT,
        },
        "expected_dataset": "submission_lateness",
        "expected_point_count": 4,
        "expected_multi_dataset_count": 0,
        "expected_association_columns": [
            "score_normalized",
            "submission_delay_avg",
            "punctuality_rate",
        ],
    },
    {
        "case_id": "S-T08_SAMPLE_OULAD_CCC_2014J",
        "task_id": "S-T08",
        "params": {
            "batch_id": "SAMPLE_OULAD",
            "class_id": OULAD_CLASS,
            "student_id": OULAD_STUDENT,
        },
        "expected_dataset": "submission_lateness",
        "expected_point_count": 4,
        "expected_multi_dataset_count": 0,
        "expected_association_columns": [
            "score_normalized",
            "submission_delay_avg",
            "punctuality_rate",
        ],
    },
    {
        "case_id": "S-T12_SAMPLE_OULAD_CCC_2014J",
        "task_id": "S-T12",
        "params": {
            "batch_id": "SAMPLE_OULAD",
            "class_id": OULAD_CLASS,
            "student_id": OULAD_STUDENT,
        },
        "expected_dataset": "submission_series",
        "expected_point_count": 4,
        "expected_multi_dataset_count": 1,
        "expected_context_dataset": "punctuality_summary",
        "expected_association_columns": ["score_normalized"],
    },
    {
        "case_id": "S-T07_SAMPLE_UCI_POR",
        "task_id": "S-T07",
        "params": {
            "batch_id": "SAMPLE_UCI_POR",
            "class_id": "SAMPLE_UCI_POR_CLASS",
            "student_id": "SAMPLE_UCI_POR_STU_000001",
        },
        "expected_dataset": "score_series",
        "expected_point_count": 3,
        "expected_multi_dataset_count": 1,
        "expected_context_dataset": "absence_data",
        "expected_association_columns": ["week_of_class"],
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


def config_for(task_id: str) -> AISummaryConfig:
    common_delay = {
        "summary_type": "trend_series",
        "time_column": "assessment_order",
        "metric_column": "submission_delay_days",
        "secondary_metric_columns": [
            "score_normalized",
            "submission_delay_avg",
            "punctuality_rate",
        ],
        "flag_columns": ["pass_flag"],
        "label_columns": ["assessment_type", "assessment_name"],
        "metric_units": {
            "submission_delay_days": "days_relative_to_due_date",
            "submission_delay_avg": "days_late_average_positive_only",
            "punctuality_rate": "ratio_0_1",
            "score_normalized": "score_on_runtime_scale",
        },
        "metric_directions": {
            "submission_delay_days": "higher_is_worse",
            "submission_delay_avg": "higher_is_worse",
            "punctuality_rate": "higher_is_better",
            "score_normalized": "higher_is_better",
        },
        "minimum_sample_size": 6,
        "max_points": 30,
    }
    if task_id in {"A-S06", "S-T08"}:
        return AISummaryConfig(**common_delay)
    if task_id == "S-T12":
        values = dict(common_delay)
        values["secondary_metric_columns"] = ["score_normalized"]
        values["evidence_dataset_roles"] = {
            "submission_series": "primary_series",
            "punctuality_summary": "context_summary",
        }
        return AISummaryConfig(**values)
    if task_id == "S-T07":
        return AISummaryConfig(
            summary_type="trend_series",
            time_column="assessment_order",
            metric_column="score_normalized",
            secondary_metric_columns=["week_of_class"],
            flag_columns=["pass_flag"],
            evidence_dataset_roles={
                "absence_data": "context_snapshot",
                "score_series": "primary_series",
            },
            metric_units={
                "score_normalized": "score_on_runtime_scale",
                "week_of_class": "course_week",
                "absences": "absence_count",
                "absence_rate": "ratio_0_1_relative_to_class_max",
            },
            metric_directions={
                "score_normalized": "higher_is_better",
                "week_of_class": "time_index",
                "absences": "higher_is_worse",
                "absence_rate": "higher_is_worse",
            },
            minimum_sample_size=6,
            max_points=30,
        )
    raise ValueError(f"Unsupported task_id {task_id}")


def build_request(
    task_id: str,
    analytics: dict[str, Any],
) -> ExplainRequest:
    return ExplainRequest(
        task_id=task_id,
        execution_id=analytics.get("executionId", "validation"),
        task_name=task_id,
        explanation_strategy="behavioral",
        target_audience=["student", "instructor"],
        datasets=analytics.get("datasets") or {},
        confidence=ConfidenceInput(
            level=analytics.get("meta", {})
            .get("dataQuality", {})
            .get("confidence", "LOW"),
            reason=analytics.get("meta", {})
            .get("dataQuality", {})
            .get("confidence_reason", "Unknown"),
        ),
        query_labels=analytics.get("meta", {}).get("query_labels", []),
        ai_summary_config=config_for(task_id),
    )


def validate_parse_contract() -> dict[str, Any]:
    errors = []
    for task_id in ("A-S06", "S-T07", "S-T08", "S-T12"):
        try:
            config_for(task_id)
        except Exception as exc:  # pragma: no cover - reported in artifact
            errors.append(f"valid {task_id} config rejected: {exc}")

    negative_cases = [
        {
            "name": "missing_time_column",
            "payload": {
                "summary_type": "trend_series",
                "metric_column": "score_normalized",
            },
        },
        {
            "name": "missing_metric_column",
            "payload": {
                "summary_type": "trend_series",
                "time_column": "assessment_order",
            },
        },
        {
            "name": "duplicate_secondary_metric_columns",
            "payload": {
                "summary_type": "trend_series",
                "time_column": "assessment_order",
                "metric_column": "score_normalized",
                "secondary_metric_columns": ["avg_score", "avg_score"],
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
            item.startswith("valid") for item in errors
        ),
        "negative_case_count": len(results),
        "negative_cases_passed": sum(1 for item in results if item["rejected"]),
        "negative_results": results,
        "errors": errors,
        "passed": not errors,
    }


def validate_case(case: dict[str, Any]) -> dict[str, Any]:
    status, analytics = request_json(
        f"{BACKEND_URL}/api/analytics/run",
        method="POST",
        body={"taskId": case["task_id"], "params": case["params"]},
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

    request = build_request(case["task_id"], analytics)
    first = BaseExplanationStrategy._build_task_aware_summary(request)
    second = BaseExplanationStrategy._build_task_aware_summary(request)

    if first != second:
        errors.append("summary is not deterministic across repeated runs")
    if first.get("summary_type") != "trend_series":
        errors.append(f"summary_type is {first.get('summary_type')}")
    if first.get("dataset_name") != case["expected_dataset"]:
        errors.append(
            f"dataset_name expected {case['expected_dataset']}, "
            f"got {first.get('dataset_name')}"
        )
    if first.get("point_count") != case["expected_point_count"]:
        errors.append(
            f"point_count expected {case['expected_point_count']}, "
            f"got {first.get('point_count')}"
        )
    if len(first.get("multi_dataset_evidence") or []) != case["expected_multi_dataset_count"]:
        errors.append(
            f"multi_dataset_evidence expected {case['expected_multi_dataset_count']}, "
            f"got {len(first.get('multi_dataset_evidence') or [])}"
        )
    if case.get("expected_context_dataset"):
        names = [
            item.get("dataset_name")
            for item in first.get("multi_dataset_evidence") or []
        ]
        if case["expected_context_dataset"] not in names:
            errors.append(
                f"context dataset {case['expected_context_dataset']} missing from {names}"
            )
    if not first.get("small_sample_caveats"):
        errors.append("small_sample_caveats missing")
    if first.get("causal_claim_allowed") is not False:
        errors.append("causal_claim_allowed is not false")
    associations = first.get("secondary_metric_associations") or {}
    for column in case["expected_association_columns"]:
        if column not in associations:
            errors.append(f"association for {column} missing")
        elif associations[column].get("paired_point_count", 0) < 2:
            errors.append(f"association for {column} has insufficient pairs")
    units = first.get("metric_units") or {}
    if first.get("metric_column") not in units:
        errors.append("primary metric unit missing")

    compact = BaseExplanationStrategy._dump_summary(first, char_limit=900)
    for required in (
        '"multi_dataset_evidence"',
        '"secondary_metric_associations"',
        '"small_sample_caveats"',
    ):
        if required not in compact:
            errors.append(f"compact summary omitted {required}")

    return {
        "case_id": case["case_id"],
        "task_id": case["task_id"],
        "analytics_status": status,
        "analytics_execution_id": analytics.get("executionId"),
        "analytics_meta": analytics.get("meta"),
        "summary": first,
        "passed": not errors,
        "errors": errors,
    }


def main() -> int:
    parse_contract = validate_parse_contract()
    cases = [validate_case(case) for case in CASES]
    result = {
        "validator": "validate_trend_series_multi_evidence.py",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "backend_url": BACKEND_URL,
        "config_source": "canonical_pre_migration",
        "parse_contract": parse_contract,
        "case_count": len(cases),
        "passed": sum(1 for case in cases if case["passed"]),
        "failed": sum(1 for case in cases if not case["passed"]),
        "overall_pass": parse_contract["passed"]
        and all(case["passed"] for case in cases),
        "cases": cases,
    }
    OUTPUT_PATH.write_text(
        json.dumps(result, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(json.dumps({
        "parse_contract_pass": parse_contract["passed"],
        "case_count": result["case_count"],
        "passed": result["passed"],
        "failed": result["failed"],
        "overall_pass": result["overall_pass"],
        "cases": [
            {
                "case_id": case["case_id"],
                "passed": case["passed"],
                "dataset_name": case.get("summary", {}).get("dataset_name"),
                "point_count": case.get("summary", {}).get("point_count"),
                "multi_dataset_count": len(
                    case.get("summary", {}).get("multi_dataset_evidence") or []
                ),
                "errors": case["errors"],
            }
            for case in cases
        ],
    }, indent=2, ensure_ascii=False))
    return 0 if result["overall_pass"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
