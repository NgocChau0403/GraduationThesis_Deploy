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
    / "correlation_evidence_selected_entity_validation.json"
)
BACKEND_URL = "http://localhost:4000"

sys.path.insert(0, str(AI_SERVICE))

from schemas import AISummaryConfig, ConfidenceInput, ExplainRequest  # noqa: E402
from strategies.base import BaseExplanationStrategy  # noqa: E402


UCI_PARAMS = {
    "batch_id": "SAMPLE_UCI_POR",
    "class_id": "SAMPLE_UCI_POR_CLASS",
    "student_id": "SAMPLE_UCI_POR_STU_000001",
}
OULAD_PARAMS = {
    "batch_id": "SAMPLE_OULAD",
    "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
    "student_id": "SAMPLE_OULAD_STU_100788",
}


CASES = [
    {
        "case_id": "S-T09_SAMPLE_UCI_POR",
        "task_id": "S-T09",
        "params": UCI_PARAMS,
        "expected_dataset": "lifestyle_risk_scatter",
        "x_column": "lifestyle_risk_score",
        "selected_column": "is_current_student",
        "expected_entity": "SAMPLE_UCI_POR_STU_000001",
        "expected_row_count": 649,
        "sensitive_required": True,
    },
    {
        "case_id": "S-T11_SAMPLE_OULAD_CCC_2014J",
        "task_id": "S-T11",
        "params": OULAD_PARAMS,
        "expected_dataset": "registration_data",
        "x_column": "registration_lead_time",
        "selected_column": "is_selected_student",
        "expected_entity": "SAMPLE_OULAD_STU_100788",
        "expected_row_count": 1988,
        "percentile_required": True,
    },
    {
        "case_id": "S-T14_SAMPLE_UCI_POR",
        "task_id": "S-T14",
        "params": UCI_PARAMS,
        "expected_dataset": "social_balance_scatter",
        "x_column": "social_balance_score",
        "selected_column": "is_current_student",
        "expected_entity": "SAMPLE_UCI_POR_STU_000001",
        "expected_row_count": 649,
        "sensitive_required": True,
    },
    {
        "case_id": "S-T15_SAMPLE_UCI_POR",
        "task_id": "S-T15",
        "params": UCI_PARAMS,
        "expected_dataset": "family_context_scatter",
        "x_column": "family_stability_score",
        "selected_column": "is_current_student",
        "expected_entity": "SAMPLE_UCI_POR_STU_000001",
        "expected_row_count": 649,
        "sensitive_required": True,
        "sensitive_policy_required": True,
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
    common = {
        "summary_type": "correlation_evidence",
        "y_column": "avg_score",
        "entity_column": "student_id",
        "coefficient_method": "pearson",
        "minimum_sample_size": 30,
        "top_k": 10,
    }
    if task_id == "S-T09":
        return AISummaryConfig(
            **common,
            x_column="lifestyle_risk_score",
            color_column="point_role",
            selected_entity_column="is_current_student",
            label_columns=["point_role"],
            sensitive_columns=[
                "alcohol_weekday",
                "alcohol_weekend",
                "go_out_freq",
                "health_status",
                "family_relation",
                "free_time",
            ],
            sensitive_context_policy="descriptive_only",
        )
    if task_id == "S-T11":
        return AISummaryConfig(
            **common,
            x_column="registration_lead_time",
            color_column="student_marker",
            selected_entity_column="is_selected_student",
            label_columns=[
                "student_marker",
                "cohort_avg_registration_lead_time",
                "cohort_avg_score",
                "registration_timing_percentile",
                "score_percentile",
            ],
        )
    if task_id == "S-T14":
        return AISummaryConfig(
            **common,
            x_column="social_balance_score",
            color_column="point_role",
            selected_entity_column="is_current_student",
            label_columns=["point_role"],
            sensitive_columns=[
                "free_time",
                "go_out_freq",
                "alcohol_weekday",
                "alcohol_weekend",
            ],
            sensitive_context_policy="descriptive_only",
        )
    if task_id == "S-T15":
        return AISummaryConfig(
            **common,
            x_column="family_stability_score",
            color_column="point_role",
            selected_entity_column="is_current_student",
            label_columns=["point_role"],
            sensitive_columns=[
                "family_relation",
                "parent_cohabitation_status",
                "mother_education_level",
                "father_education_level",
            ],
            sensitive_context_policy="descriptive_only",
            require_sensitive_context_policy=True,
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
        explanation_strategy="correlation",
        target_audience=["student"],
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
    for task_id in ("S-T09", "S-T11", "S-T14", "S-T15"):
        try:
            config_for(task_id)
        except Exception as exc:  # pragma: no cover - reported in artifact
            errors.append(f"valid {task_id} config rejected: {exc}")

    negative_cases = [
        {
            "name": "missing_x_column",
            "payload": {
                "summary_type": "correlation_evidence",
                "y_column": "avg_score",
            },
        },
        {
            "name": "missing_y_column",
            "payload": {
                "summary_type": "correlation_evidence",
                "x_column": "risk_score",
            },
        },
        {
            "name": "sensitive_policy_required",
            "payload": {
                "summary_type": "correlation_evidence",
                "x_column": "family_stability_score",
                "y_column": "avg_score",
                "sensitive_columns": ["family_relation"],
                "require_sensitive_context_policy": True,
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
    if first.get("summary_type") != "correlation_evidence":
        errors.append(f"summary_type is {first.get('summary_type')}")
    if first.get("dataset_name") != case["expected_dataset"]:
        errors.append(
            f"dataset_name expected {case['expected_dataset']}, "
            f"got {first.get('dataset_name')}"
        )
    if first.get("row_count") != case["expected_row_count"]:
        errors.append(
            f"row_count expected {case['expected_row_count']}, "
            f"got {first.get('row_count')}"
        )
    if first.get("selected_entity_column") != case["selected_column"]:
        errors.append(
            f"selected_entity_column expected {case['selected_column']}, "
            f"got {first.get('selected_entity_column')}"
        )
    if first.get("selected_entity_count") != 1:
        errors.append(
            f"selected_entity_count expected 1, got {first.get('selected_entity_count')}"
        )

    selected = first.get("selected_entity_evidence") or []
    if len(selected) != 1:
        errors.append(f"selected_entity_evidence expected 1, got {len(selected)}")
    else:
        item = selected[0]
        if item.get("student_id") != case["expected_entity"]:
            errors.append(
                f"selected entity expected {case['expected_entity']}, "
                f"got {item.get('student_id')}"
            )
        if item.get(case["x_column"]) is None:
            errors.append(f"selected x value {case['x_column']} missing")
        if item.get("avg_score") is None:
            errors.append("selected y value avg_score missing")
        if item.get("cohort_context", {}).get("sample_size", 0) < 30:
            errors.append("cohort context sample size missing or too small")
        if item.get("cohort_context", {}).get("causal_claim_allowed") is not False:
            errors.append("selected cohort context causal_claim_allowed is not false")
        if case.get("percentile_required") and not item.get("percentile_context"):
            errors.append("selected percentile_context missing")
        if case.get("sensitive_required") and not item.get("sensitive_context"):
            errors.append("selected sensitive_context missing")
        if (
            case.get("sensitive_policy_required")
            and item.get("sensitive_context_policy") != "descriptive_only"
        ):
            errors.append("selected sensitive_context_policy missing")

    if first.get("missing_selected_entity_evidence"):
        errors.append("missing_selected_entity_evidence should be empty")
    if first.get("causal_claim_allowed") is not False:
        errors.append("causal_claim_allowed is not false")
    if first.get("coefficient_source") != "derived_from_pairs":
        errors.append(f"coefficient_source is {first.get('coefficient_source')}")

    compact = BaseExplanationStrategy._dump_summary(first, char_limit=900)
    for required in (
        '"selected_entity_column"',
        '"selected_entity_evidence"',
        '"coefficient"',
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
        "validator": "validate_correlation_evidence_selected_entity.py",
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
                "selected_entity_count": case.get("summary", {}).get("selected_entity_count"),
                "errors": case["errors"],
            }
            for case in cases
        ],
    }, indent=2, ensure_ascii=False))
    return 0 if result["overall_pass"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
