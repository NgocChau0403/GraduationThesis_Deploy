from __future__ import annotations

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
AI_SERVICE = ROOT / "AIService"
REGISTRY_PATH = ROOT / "Backend" / "src" / "config" / "taskRegistry.json"
RUNS_ROOT = ROOT / "Docs" / "evaluation_v1" / "ai_explanation_full_matrix" / "runs"
OUTPUT_PATH = (
    ROOT
    / "Docs"
    / "evaluation_v2"
    / "ai_explanation_judge_v2"
    / "metric_snapshot_actual_data_validation.json"
)

sys.path.insert(0, str(AI_SERVICE))

from schemas import AISummaryConfig, ExplainRequest  # noqa: E402
from debug_ai_summary import build_ai_summary_config  # noqa: E402
from strategies.base import BaseExplanationStrategy  # noqa: E402


TASK_IDS = ["A-S01", "A-S07", "S-B01", "S-B02", "S-B03"]
DATASET_IDS = ["SAMPLE_UCI_POR", "SAMPLE_OULAD"]
SENSITIVE_POLICY = "descriptive_context_only_no_causal_or_prescriptive_inference"


def config_for(task_id: str) -> AISummaryConfig:
    configs = {
        "A-S01": {
            "summary_type": "metric_snapshot",
            "entity_column": "student_id",
            "metric_columns": [
                "avg_score",
                "at_risk_score",
                "engagement_score",
                "previous_attempt_count",
            ],
            "status_columns": [
                "final_outcome",
                "at_risk_label",
                "study_effort_level",
            ],
            "sensitive_columns": ["gender", "age_group", "region"],
            "metric_units": {
                "avg_score": "score_0_100",
                "at_risk_score": "triggered_flag_count_0_5",
                "engagement_score": "ratio_0_1",
                "previous_attempt_count": "count",
            },
            "require_metric_units": True,
            "sensitive_context_policy": SENSITIVE_POLICY,
            "require_sensitive_context_policy": True,
        },
        "A-S07": {
            "summary_type": "metric_snapshot",
            "metric_columns": [
                "support_score",
                "lifestyle_risk_score",
                "social_balance_score",
                "family_stability_score",
                "previous_attempt_count",
                "studytime",
                "absences",
            ],
            "status_columns": [
                "school_support_flag",
                "family_support_flag",
                "has_paid_class",
                "internet_access_flag",
            ],
            "sensitive_columns": [
                "highest_education",
                "school",
                "family_size",
                "gender",
                "age_years",
                "age_group",
                "school_support_flag",
                "family_support_flag",
                "has_paid_class",
                "internet_access_flag",
                "support_score",
                "lifestyle_risk_score",
                "social_balance_score",
                "family_stability_score",
                "studytime",
                "absences",
            ],
            "metric_units": {
                "support_score": "ratio_0_1",
                "lifestyle_risk_score": "score_0_1",
                "social_balance_score": "signed_score",
                "family_stability_score": "score_0_1",
                "previous_attempt_count": "count",
                "studytime": "ordinal_scale_raw",
                "absences": "count",
            },
            "require_metric_units": True,
            "sensitive_context_policy": SENSITIVE_POLICY,
            "require_sensitive_context_policy": True,
        },
        "S-B01": {
            "summary_type": "metric_snapshot",
            "metric_columns": [
                "avg_score",
                "pass_rate",
                "performance_trend",
                "score_vs_class_avg",
                "score_percentile",
                "unweighted_avg_score",
                "weighted_avg_score",
                "assessment_count",
                "cohort_size",
            ],
            "status_columns": [
                "final_outcome",
                "score_strategy",
                "performance_band",
            ],
            "threshold_columns": ["pass_threshold", "target_threshold"],
            "benchmark_columns": ["class_avg_score", "class_median_score"],
            "label_columns": ["score_scale"],
            "metric_units": {
                "avg_score": "score_on_runtime_scale",
                "pass_rate": "ratio_0_1",
                "performance_trend": "score_change_per_assessment_order",
                "score_vs_class_avg": "score_point_difference",
                "score_percentile": "percentile_0_100",
                "unweighted_avg_score": "score_on_runtime_scale",
                "weighted_avg_score": "score_on_runtime_scale",
                "assessment_count": "count",
                "cohort_size": "count",
                "pass_threshold": "score_on_runtime_scale",
                "target_threshold": "score_on_runtime_scale",
                "class_avg_score": "score_on_runtime_scale",
                "class_median_score": "score_on_runtime_scale",
            },
            "threshold_sources": {
                "pass_threshold": "runtime_score_context",
                "target_threshold": "runtime_score_context",
            },
            "benchmark_sources": {
                "class_avg_score": "class_cohort",
                "class_median_score": "class_cohort",
            },
            "require_metric_units": True,
        },
        "S-B02": {
            "summary_type": "metric_snapshot",
            "metric_columns": [
                "avg_score",
                "engagement_score",
                "punctuality_rate",
                "previous_attempt_count",
                "at_risk_score",
            ],
            "status_columns": [
                "engagement_score_available",
                "score_strategy",
                "at_risk_label",
            ],
            "metric_availability_columns": {
                "engagement_score": "engagement_score_available",
            },
            "threshold_columns": ["pass_threshold", "target_threshold"],
            "label_columns": ["score_scale"],
            "metric_units": {
                "avg_score": "score_on_runtime_scale",
                "engagement_score": "ratio_0_1",
                "punctuality_rate": "ratio_0_1",
                "previous_attempt_count": "count",
                "at_risk_score": "triggered_flag_count_0_5",
                "pass_threshold": "score_on_runtime_scale",
                "target_threshold": "score_on_runtime_scale",
            },
            "threshold_sources": {
                "pass_threshold": "runtime_score_context",
                "target_threshold": "runtime_score_context",
            },
            "require_metric_units": True,
        },
        "S-B03": {
            "summary_type": "metric_snapshot",
            "metric_columns": [
                "total_engagement_count",
                "active_days",
                "engagement_score",
            ],
            "status_columns": ["study_effort_level"],
            "benchmark_columns": [
                "class_avg_total_engagement_count",
                "class_avg_active_days",
                "class_avg_engagement_score",
            ],
            "metric_units": {
                "total_engagement_count": "count",
                "active_days": "day_count",
                "engagement_score": "ratio_0_1",
                "class_avg_total_engagement_count": "count",
                "class_avg_active_days": "day_count",
                "class_avg_engagement_score": "ratio_0_1",
            },
            "benchmark_sources": {
                "class_avg_total_engagement_count": "class_cohort",
                "class_avg_active_days": "class_cohort",
                "class_avg_engagement_score": "class_cohort",
            },
            "require_metric_units": True,
        },
    }
    return AISummaryConfig(**configs[task_id])


def load_registry() -> dict[str, dict]:
    tasks = json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))
    return {task["taskId"]: task for task in tasks}


def artifact_path(dataset_id: str, task_id: str) -> Path:
    return (
        RUNS_ROOT
        / dataset_id
        / "task_aware_data_summarization"
        / "tasks"
        / f"{task_id}.json"
    )


def load_case(dataset_id: str, task_id: str) -> tuple[Path, dict, dict]:
    path = artifact_path(dataset_id, task_id)
    artifact = json.loads(path.read_text(encoding="utf-8"))
    analytics = artifact.get("analytics_request_response_if_called") or {}
    response = analytics.get("response") or {}
    return path, artifact, response.get("datasets") or {}


def values_equal(left, right) -> bool:
    return left == right and type(left) is type(right)


def validate_raw_values(summary: dict, row: dict, cfg: AISummaryConfig) -> list[str]:
    errors = []
    if cfg.entity_column and not values_equal(summary.get("entity"), row.get(cfg.entity_column)):
        errors.append(f"entity mismatch for {cfg.entity_column}")

    for column in cfg.metric_columns:
        emitted = (summary.get("metric_snapshot") or {}).get(column, {})
        if not values_equal(emitted.get("value"), row.get(column)):
            errors.append(f"metric raw value mismatch: {column}")
        if emitted.get("unit") != cfg.metric_units.get(column):
            errors.append(f"metric unit mismatch: {column}")

    for column in cfg.status_columns:
        emitted = (summary.get("status_evidence") or {}).get(column)
        if not values_equal(emitted, row.get(column)):
            errors.append(f"status raw value mismatch: {column}")

    for column in cfg.threshold_columns:
        emitted = (summary.get("threshold_evidence") or {}).get(column, {})
        if not values_equal(emitted.get("value"), row.get(column)):
            errors.append(f"threshold raw value mismatch: {column}")
        if emitted.get("unit") != cfg.metric_units.get(column):
            errors.append(f"threshold unit mismatch: {column}")
        if emitted.get("source") != cfg.threshold_sources.get(column):
            errors.append(f"threshold source mismatch: {column}")

    for column in cfg.benchmark_columns:
        emitted = (summary.get("benchmark_evidence") or {}).get(column, {})
        if not values_equal(emitted.get("value"), row.get(column)):
            errors.append(f"benchmark raw value mismatch: {column}")
        if emitted.get("unit") != cfg.metric_units.get(column):
            errors.append(f"benchmark unit mismatch: {column}")
        if emitted.get("source") != cfg.benchmark_sources.get(column):
            errors.append(f"benchmark source mismatch: {column}")

    for column in cfg.sensitive_columns:
        emitted = (summary.get("sensitive_context") or {}).get(column)
        if not values_equal(emitted, row.get(column)):
            errors.append(f"sensitive raw value mismatch: {column}")

    for metric, availability_column in cfg.metric_availability_columns.items():
        emitted = (summary.get("metric_snapshot") or {}).get(metric, {})
        expected_available = row.get(availability_column)
        if emitted.get("available") is not expected_available:
            errors.append(f"availability mismatch: {metric}")
        if expected_available is False and not any(
            item.get("column") == metric
            and "unavailable" in item.get("reason", "")
            for item in summary.get("missing_evidence") or []
        ):
            errors.append(f"missing unavailable evidence: {metric}")

    for column in [
        *cfg.metric_columns,
        *cfg.status_columns,
        *cfg.threshold_columns,
        *cfg.benchmark_columns,
        *cfg.sensitive_columns,
    ]:
        if row.get(column) is None and not any(
            item.get("column") == column
            for item in summary.get("missing_evidence") or []
        ):
            errors.append(f"missing null evidence: {column}")

    return errors


def validate_case(dataset_id: str, task_id: str, task: dict) -> dict:
    path, artifact, datasets = load_case(dataset_id, task_id)
    artifact_status = artifact.get("status")
    result = {
        "dataset_id": dataset_id,
        "task_id": task_id,
        "artifact_path": str(path.relative_to(ROOT)).replace("\\", "/"),
        "artifact_status": artifact_status,
        "case_classification": artifact_status,
        "dataset_row_counts": {
            label: len(rows) if isinstance(rows, list) else None
            for label, rows in datasets.items()
        },
    }

    if artifact_status in {"insufficient_data", "blocked"}:
        result["validation_status"] = "not_applicable"
        return result
    if artifact_status != "evaluated":
        result.update(
            validation_status="failed",
            errors=[f"unexpected artifact status: {artifact_status!r}"],
        )
        return result
    if not datasets:
        result.update(
            validation_status="failed",
            errors=["evaluated artifact has no analytics datasets"],
        )
        return result

    cfg = build_ai_summary_config(task)
    canonical_cfg = config_for(task_id)
    if cfg is None:
        result.update(
            validation_status="failed",
            errors=["registry AISummaryConfig could not be built"],
        )
        return result
    request = ExplainRequest(
        task_id=task_id,
        execution_id=f"metric-snapshot-validation-{dataset_id}-{task_id}",
        explanation_strategy="descriptive",
        target_audience=["instructor"],
        datasets=datasets,
        query_labels=list(datasets.keys()),
        ai_summary_config=cfg,
    )
    summary, _ = BaseExplanationStrategy.summarize_task_aware_data_summarization(request)
    dataset_name = summary.get("dataset_name")
    rows = datasets.get(dataset_name) or []
    raw_row = rows[0] if len(rows) == 1 and isinstance(rows[0], dict) else {}

    errors = []
    if task.get("aiSummaryType") != "metric_snapshot":
        errors.append("registry aiSummaryType is not metric_snapshot")
    for field in (
        "entity_column",
        "metric_columns",
        "status_columns",
        "threshold_columns",
        "benchmark_columns",
        "sensitive_columns",
        "metric_availability_columns",
        "metric_units",
        "threshold_sources",
        "benchmark_sources",
        "label_columns",
        "require_metric_units",
        "sensitive_context_policy",
        "require_sensitive_context_policy",
    ):
        if getattr(cfg, field) != getattr(canonical_cfg, field):
            errors.append(f"registry config mismatch: {field}")
    if summary.get("summary_type") != "metric_snapshot":
        errors.append("summary_type is not metric_snapshot")
    if summary.get("validation_metadata", {}).get("status") != "passed":
        errors.append("validation_metadata.status is not passed")
    if summary.get("evidence_status") != "sufficient":
        errors.append("evidence_status is not sufficient")
    if summary.get("summary_type") == "generic_fallback":
        errors.append("generic_fallback observed")
    if "generic_diagnostic_sample" in summary:
        errors.append("generic diagnostic fallback observed")
    if len(rows) != 1:
        errors.append(f"primary dataset row count is {len(rows)}, expected 1")
    errors.extend(validate_raw_values(summary, raw_row, cfg))

    expected_sensitive = any(column in raw_row for column in cfg.sensitive_columns)
    if summary.get("sensitive_context_present") is not expected_sensitive:
        errors.append("sensitive_context_present mismatch")
    if cfg.sensitive_columns:
        if (
            summary.get("validation_metadata", {}).get("sensitive_context_policy")
            != cfg.sensitive_context_policy
        ):
            errors.append("sensitive context policy mismatch")

    result.update(
        validation_status="failed" if errors else "passed",
        summary_type=summary.get("summary_type"),
        validation_metadata_status=summary.get("validation_metadata", {}).get("status"),
        evidence_status=summary.get("evidence_status"),
        dataset_name=dataset_name,
        row_count=summary.get("row_count"),
        metric_count=len(summary.get("metric_snapshot") or {}),
        status_count=len(summary.get("status_evidence") or {}),
        threshold_count=len(summary.get("threshold_evidence") or {}),
        benchmark_count=len(summary.get("benchmark_evidence") or {}),
        missing_evidence_count=len(summary.get("missing_evidence") or []),
        sensitive_context_present=summary.get("sensitive_context_present"),
        generic_fallback=summary.get("summary_type") == "generic_fallback",
        generic_diagnostic_fallback="generic_diagnostic_sample" in summary,
        errors=errors,
        warnings=list(summary.get("summarization_warnings") or []),
    )
    return result


def main() -> int:
    registry = load_registry()
    missing_tasks = [task_id for task_id in TASK_IDS if task_id not in registry]
    cases = [
        validate_case(dataset_id, task_id, registry[task_id])
        for dataset_id in DATASET_IDS
        for task_id in TASK_IDS
        if task_id in registry
    ]
    applicable = [case for case in cases if case["validation_status"] != "not_applicable"]
    passed = [case for case in applicable if case["validation_status"] == "passed"]
    failed = [case for case in applicable if case["validation_status"] == "failed"]
    classifications = {
        status: sum(case["case_classification"] == status for case in cases)
        for status in ("evaluated", "insufficient_data", "blocked")
    }
    output = {
        "scope": {
            "task_ids": TASK_IDS,
            "dataset_ids": DATASET_IDS,
            "registry_migrated": True,
            "source": (
                "Current registry config plus saved V1 full analytics "
                "response.datasets"
            ),
        },
        "registry_errors": [
            f"{task_id}: task missing from registry" for task_id in missing_tasks
        ],
        "summary": {
            "total_cases": len(cases),
            "applicable_cases": len(applicable),
            "passed_cases": len(passed),
            "failed_cases": len(failed),
            "not_applicable_cases": len(cases) - len(applicable),
            "classifications": classifications,
        },
        "cases": cases,
    }
    OUTPUT_PATH.write_text(
        json.dumps(output, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(output, indent=2, ensure_ascii=False))
    return 1 if failed or missing_tasks else 0


if __name__ == "__main__":
    raise SystemExit(main())
