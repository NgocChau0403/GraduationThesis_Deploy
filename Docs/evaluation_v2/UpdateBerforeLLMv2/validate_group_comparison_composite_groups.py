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
    / "group_comparison_composite_groups_validation.json"
)
BACKEND_URL = "http://localhost:4000"

sys.path.insert(0, str(AI_SERVICE))

from schemas import AISummaryConfig, ConfidenceInput, ExplainRequest  # noqa: E402
from strategies.base import BaseExplanationStrategy  # noqa: E402


CASES = [
    {
        "case_id": "A-G05_SAMPLE_OULAD_CCC_2014J",
        "task_id": "A-G05",
        "params": {
            "batch_id": "SAMPLE_OULAD",
            "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
        },
        "expected_row_count": 11,
        "expected_group_key_columns": ["final_outcome", "assessment_type"],
        "expected_series_column": "assessment_type",
        "expected_group_series_min": 4,
        "expected_first_metric_keys": {
            "final_outcome": "Distinction",
            "assessment_type": "CMA",
        },
    },
    {
        "case_id": "A-G05_SAMPLE_UCI_POR",
        "task_id": "A-G05",
        "params": {
            "batch_id": "SAMPLE_UCI_POR",
            "class_id": "SAMPLE_UCI_POR_CLASS",
        },
        "expected_row_count": 4,
        "expected_group_key_columns": ["final_outcome", "assessment_type"],
        "expected_series_column": "assessment_type",
        "expected_group_series_min": 2,
        "expected_first_metric_keys": {
            "final_outcome": "Fail",
            "assessment_type": "exam",
        },
    },
    {
        "case_id": "A-G12_SAMPLE_OULAD_CCC_2014J",
        "task_id": "A-G12",
        "params": {
            "batch_id": "SAMPLE_OULAD",
            "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
        },
        "expected_row_count": 53,
        "expected_group_key_columns": ["group_value", "final_outcome"],
        "expected_series_column": "final_outcome",
        "expected_group_series_min": 10,
        "expected_focus_top_group": "Scotland",
        "expected_focus_top_metric": 100.0,
    },
    {
        "case_id": "A-G12_SAMPLE_UCI_POR",
        "task_id": "A-G12",
        "params": {
            "batch_id": "SAMPLE_UCI_POR",
            "class_id": "SAMPLE_UCI_POR_CLASS",
        },
        "expected_row_count": 4,
        "expected_group_key_columns": ["group_value", "final_outcome"],
        "expected_series_column": "final_outcome",
        "expected_group_series_min": 2,
        "expected_focus_top_group": "MS",
        "expected_focus_top_metric": 30.1,
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
    if task_id == "A-G05":
        return AISummaryConfig(
            summary_type="group_comparison",
            group_column="final_outcome",
            group_key_columns=["final_outcome", "assessment_type"],
            series_column="assessment_type",
            metric_column="late_submission_rate",
            count_column="student_count",
            metric_columns=[
                "submission_delay_avg",
                "net_submission_delay_avg",
                "punctuality_rate",
                "avg_score",
                "submission_count",
            ],
            minimum_reliable_count=10,
            sort_by="late_submission_rate",
            sort_direction="desc",
            top_k=8,
            bottom_k=3,
        )
    if task_id == "A-G12":
        return AISummaryConfig(
            summary_type="group_comparison",
            group_column="group_value",
            group_key_columns=["group_value", "final_outcome"],
            series_column="final_outcome",
            metric_column="pct_within_group",
            count_column="student_count",
            focus_categories=["Fail", "Withdrawn"],
            minimum_reliable_count=10,
            sort_by="pct_within_group",
            sort_direction="desc",
            top_k=12,
            bottom_k=4,
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
        explanation_strategy="comparison",
        target_audience=["instructor", "admin"],
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
    for task_id in ("A-G05", "A-G12"):
        try:
            config_for(task_id)
        except Exception as exc:  # pragma: no cover - reported in artifact
            errors.append(f"valid {task_id} config rejected: {exc}")

    negative_cases = [
        {
            "name": "missing_metric_column",
            "payload": {
                "summary_type": "group_comparison",
                "group_column": "group_value",
                "group_key_columns": ["group_value", "final_outcome"],
                "series_column": "final_outcome",
                "count_column": "student_count",
            },
        },
        {
            "name": "single_group_key_column",
            "payload": {
                "summary_type": "group_comparison",
                "group_column": "group_value",
                "group_key_columns": ["group_value"],
                "metric_column": "pct_within_group",
                "count_column": "student_count",
            },
        },
        {
            "name": "series_column_not_in_group_key_columns",
            "payload": {
                "summary_type": "group_comparison",
                "group_column": "group_value",
                "group_key_columns": ["group_value", "final_outcome"],
                "series_column": "assessment_type",
                "metric_column": "pct_within_group",
                "count_column": "student_count",
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
    if first.get("row_count") != case["expected_row_count"]:
        errors.append(
            f"row_count expected {case['expected_row_count']}, "
            f"got {first.get('row_count')}"
        )
    if first.get("summary_type") != "group_comparison":
        errors.append(f"summary_type is {first.get('summary_type')}")
    if first.get("composite_group_keys") is not True:
        errors.append("composite_group_keys is not true")
    if first.get("group_key_columns") != case["expected_group_key_columns"]:
        errors.append(
            f"group_key_columns expected {case['expected_group_key_columns']}, "
            f"got {first.get('group_key_columns')}"
        )
    if first.get("series_column") != case["expected_series_column"]:
        errors.append(
            f"series_column expected {case['expected_series_column']}, "
            f"got {first.get('series_column')}"
        )
    if len(first.get("group_series") or []) < case["expected_group_series_min"]:
        errors.append(
            f"group_series expected at least {case['expected_group_series_min']}, "
            f"got {len(first.get('group_series') or [])}"
        )

    first_metric = (first.get("group_metrics") or [{}])[0]
    if "expected_first_metric_keys" in case:
        if first_metric.get("group_key_values") != case["expected_first_metric_keys"]:
            errors.append(
                f"first metric group_key_values expected "
                f"{case['expected_first_metric_keys']}, "
                f"got {first_metric.get('group_key_values')}"
            )
    if "expected_focus_top_group" in case:
        focus_top = (first.get("focus_summary") or [{}])[0]
        if focus_top.get("group") != case["expected_focus_top_group"]:
            errors.append(
                f"focus top group expected {case['expected_focus_top_group']}, "
                f"got {focus_top.get('group')}"
            )
        if focus_top.get("focus_metric_total") != case["expected_focus_top_metric"]:
            errors.append(
                f"focus top metric expected {case['expected_focus_top_metric']}, "
                f"got {focus_top.get('focus_metric_total')}"
            )

    compact = BaseExplanationStrategy._dump_summary(first, char_limit=900)
    if '"group_series"' not in compact:
        errors.append("compact summary omitted group_series")
    if '"group_key_columns"' not in compact:
        errors.append("compact summary omitted group_key_columns")

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
        "validator": "validate_group_comparison_composite_groups.py",
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
                "row_count": case.get("summary", {}).get("row_count"),
                "group_series_count": len(
                    case.get("summary", {}).get("group_series") or []
                ),
                "errors": case["errors"],
            }
            for case in cases
        ],
    }, indent=2, ensure_ascii=False))
    return 0 if result["overall_pass"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
