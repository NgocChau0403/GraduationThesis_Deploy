from __future__ import annotations

import json
import sys
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
AI_SERVICE = ROOT / "AIService"
RUNS_ROOT = ROOT / "Docs" / "evaluation_v1" / "ai_explanation_full_matrix" / "runs"

sys.path.insert(0, str(AI_SERVICE))

from schemas import AISummaryConfig, ExplainRequest  # noqa: E402
from strategies.base import BaseExplanationStrategy  # noqa: E402


TASK_IDS = ["A-C02", "A-C03", "A-C04", "A-C05", "A-C06", "S-T03"]
DATASET_IDS = ["SAMPLE_UCI_POR", "SAMPLE_OULAD"]
BACKEND_URL = "http://localhost:4000"


def config_for(task_id: str) -> AISummaryConfig:
    common = {
        "summary_type": "multi_metric_comparison",
        "minimum_entity_count": 2,
        "require_metric_units": True,
        "require_metric_directions": True,
    }
    configs = {
        "A-C02": {
            **common,
            "entity_column": "student_id",
            "metric_key_column": "metric",
            "metric_value_column": "engagement_score",
            "metric_units": {
                "total_clicks_norm": "ratio_0_1",
                "active_days_norm": "ratio_0_1",
                "engagement_score": "ratio_0_1",
            },
            "metric_directions": {
                "total_clicks_norm": "higher_is_better",
                "active_days_norm": "higher_is_better",
                "engagement_score": "higher_is_better",
            },
            "metric_thresholds": {
                "total_clicks_norm": {
                    "status": "not_applicable",
                    "reason": "descriptive component metric",
                },
                "active_days_norm": {
                    "status": "not_applicable",
                    "reason": "descriptive component metric",
                },
                "engagement_score": {
                    "very_low_below": 0.25,
                    "low_below": 0.50,
                    "medium_below": 0.75,
                    "high_at_or_above": 0.75,
                },
            },
            "require_metric_thresholds": True,
            "label_columns": ["study_effort_level", "total_clicks", "active_days"],
        },
        "A-C03": {
            **common,
            "entity_column": "student_id",
            "metric_columns": [
                "avg_score",
                "performance_trend",
                "punctuality_rate",
                "engagement_score",
                "previous_attempt_count",
                "at_risk_score",
            ],
            "metric_units": {
                "avg_score": "score_0_100",
                "performance_trend": "score_change_per_assessment",
                "punctuality_rate": "ratio_0_1",
                "engagement_score": "ratio_0_1",
                "previous_attempt_count": "count",
                "at_risk_score": "flag_count_0_5",
            },
            "metric_directions": {
                "avg_score": "higher_is_better",
                "performance_trend": "higher_is_better",
                "punctuality_rate": "higher_is_better",
                "engagement_score": "higher_is_better",
                "previous_attempt_count": "higher_is_risk",
                "at_risk_score": "higher_is_risk",
            },
            "metric_thresholds": {
                "avg_score": {"low_score_below": 40},
                "performance_trend": {"negative_trend_below": 0},
                "punctuality_rate": {"low_punctuality_below": 0.7},
                "engagement_score": {"low_engagement_below": 0.15},
                "previous_attempt_count": {"repeated_attempt_above": 0},
                "at_risk_score": {"medium_at": 2, "high_at_or_above": 3},
            },
            "require_metric_thresholds": True,
            "label_columns": ["at_risk_label", "final_outcome"],
            "flag_columns": [
                "flag_low_score",
                "flag_repeated",
                "flag_low_engagement",
                "flag_low_punctuality",
                "flag_neg_trend",
            ],
        },
        "A-C04": {
            **common,
            "entity_column": "student_id",
            "metric_key_column": "lifestyle_dimension",
            "metric_value_column": "lifestyle_risk_score",
            "metric_units": {
                "weekday_alcohol": "ordinal_1_5",
                "weekend_alcohol": "ordinal_1_5",
                "go_out_frequency": "ordinal_1_5",
                "health_status": "ordinal_1_5",
                "free_time": "ordinal_1_5",
            },
            "metric_directions": {
                "weekday_alcohol": "context_only",
                "weekend_alcohol": "context_only",
                "go_out_frequency": "context_only",
                "health_status": "context_only",
                "free_time": "context_only",
            },
            "label_columns": [
                "composite_lifestyle_risk_score",
                "social_balance_score",
            ],
            "sensitive_context_policy": "descriptive_non_causal",
            "require_sensitive_context_policy": True,
        },
        "A-C05": {
            **common,
            "entity_column": "student_id",
            "metric_columns": [
                "previous_attempt_count",
                "imd_score_numeric",
                "disadvantage_score",
                "support_score",
                "family_stability_score",
            ],
            "metric_units": {
                "previous_attempt_count": "count",
                "imd_score_numeric": "dataset_index",
                "disadvantage_score": "ratio_or_dataset_score",
                "support_score": "ratio_or_dataset_score",
                "family_stability_score": "ratio_or_dataset_score",
            },
            "metric_directions": {
                "previous_attempt_count": "context_only",
                "imd_score_numeric": "context_only",
                "disadvantage_score": "higher_is_disadvantage",
                "support_score": "higher_is_support",
                "family_stability_score": "context_only",
            },
            "label_columns": [
                "highest_education",
                "socioeconomic_band",
                "disability_flag",
            ],
            "sensitive_context_policy": "descriptive_non_causal_no_action",
            "require_sensitive_context_policy": True,
        },
        "A-C06": {
            **common,
            "entity_column": "student_id",
            "metric_key_column": "resource_type",
            "metric_columns": ["clicks", "pct_of_total", "vle_diversity_score"],
            "metric_units": {
                "clicks": "count",
                "pct_of_total": "ratio_0_1",
                "vle_diversity_score": "ratio_0_1",
            },
            "metric_directions": {
                "clicks": "context_only",
                "pct_of_total": "context_only",
                "vle_diversity_score": "higher_is_more_diverse",
            },
            "label_columns": [
                "has_engagement_data",
                "total_clicks",
                "used_resource_types",
                "evidence_row_type",
            ],
            "entity_evidence_available_column": "has_engagement_data",
        },
        "S-T03": {
            **common,
            "group_column": "comparison_group",
            "metric_key_column": "metric_name",
            "metric_value_column": "metric_value",
            "entity_order": ["You", "Cohort benchmark"],
            "metric_units": {
                "Average score": "score_0_100",
                "Score percentile": "percent_0_100",
                "Engagement percentile": "percent_0_100",
            },
            "metric_directions": {
                "Average score": "higher_is_better",
                "Score percentile": "higher_is_better",
                "Engagement percentile": "higher_is_better",
            },
            "label_columns": ["sort_order"],
        },
    }
    return AISummaryConfig(**configs[task_id])


def artifact_path(dataset_id: str, task_id: str) -> Path:
    return (
        RUNS_ROOT
        / dataset_id
        / "task_aware_data_summarization"
        / "tasks"
        / f"{task_id}.json"
    )


def load_case_datasets(dataset_id: str, task_id: str) -> tuple[str, dict, str]:
    if dataset_id == "SAMPLE_OULAD" and task_id == "A-C06":
        payload = json.dumps({
            "taskId": "A-C06",
            "params": {
                "batch_id": "SAMPLE_OULAD",
                "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
                "s1": "SAMPLE_OULAD_STU_100788",
                "s2": "SAMPLE_OULAD_STU_101700",
            },
        }).encode("utf-8")
        request = urllib.request.Request(
            f"{BACKEND_URL}/api/analytics/run",
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(request, timeout=30) as response:
            body = json.loads(response.read().decode("utf-8"))
        return "evaluated", body.get("datasets") or {}, "current_backend_runtime"

    path = artifact_path(dataset_id, task_id)
    artifact = json.loads(path.read_text(encoding="utf-8"))
    analytics = artifact.get("analytics_request_response_if_called") or {}
    response = analytics.get("response") or {}
    datasets = response.get("datasets") or {}
    return artifact.get("status"), datasets, "saved_v1_artifact"


def validate_case(dataset_id: str, task_id: str) -> dict:
    path = artifact_path(dataset_id, task_id)
    status, datasets, source = load_case_datasets(dataset_id, task_id)
    result = {
        "dataset_id": dataset_id,
        "task_id": task_id,
        "artifact_status": status,
        "artifact_path": str(path.relative_to(ROOT)).replace("\\", "/"),
        "validation_data_source": source,
    }
    if status != "evaluated":
        result["validation_status"] = "not_applicable"
        return result

    request = ExplainRequest(
        task_id=task_id,
        execution_id=f"multi-metric-validation-{dataset_id}-{task_id}",
        explanation_strategy="comparison",
        target_audience=["instructor"],
        datasets=datasets,
        query_labels=list(datasets.keys()),
        ai_summary_config=config_for(task_id),
    )
    summary, _ = BaseExplanationStrategy.summarize_task_aware_data_summarization(request)
    warnings = list(summary.get("summarization_warnings") or [])
    failed = (
        summary.get("summary_type") != "multi_metric_comparison"
        or summary.get("validation_metadata", {}).get("status") != "passed"
        or summary.get("evidence_status") != "sufficient"
        or "generic_diagnostic_sample" in summary
        or not summary.get("comparison_matrix")
    )
    result.update(
        validation_status="failed" if failed else "passed",
        summary_type=summary.get("summary_type"),
        validation_metadata_status=summary.get("validation_metadata", {}).get("status"),
        evidence_status=summary.get("evidence_status"),
        dataset_name=summary.get("dataset_name"),
        row_count=summary.get("row_count"),
        entity_count=len(summary.get("entities") or []),
        metric_count=len(summary.get("metrics") or []),
        metric_key_count=len(summary.get("metric_keys") or []),
        pairwise_gap_count=len(summary.get("pairwise_gaps") or []),
        missing_metric_evidence_count=len(summary.get("missing_metric_evidence") or []),
        missing_entity_evidence_count=len(summary.get("missing_entity_evidence") or []),
        missing_expected_entities=list(summary.get("missing_expected_entities") or []),
        generic_diagnostic_fallback="generic_diagnostic_sample" in summary,
        warnings=warnings,
    )
    return result


def main() -> int:
    cases = [
        validate_case(dataset_id, task_id)
        for dataset_id in DATASET_IDS
        for task_id in TASK_IDS
    ]
    applicable = [case for case in cases if case["validation_status"] != "not_applicable"]
    failed = [case for case in applicable if case["validation_status"] == "failed"]
    output = {
        "scope": {
            "task_ids": TASK_IDS,
            "dataset_ids": DATASET_IDS,
            "registry_migrated": False,
            "source": (
                "Saved V1 analytics datasets, with A-C06/SAMPLE_OULAD refreshed "
                "from current backend runtime"
            ),
        },
        "summary": {
            "total_cases": len(cases),
            "applicable_cases": len(applicable),
            "passed_cases": len(applicable) - len(failed),
            "failed_cases": len(failed),
            "not_applicable_cases": len(cases) - len(applicable),
        },
        "cases": cases,
    }
    print(json.dumps(output, indent=2, ensure_ascii=False))
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
