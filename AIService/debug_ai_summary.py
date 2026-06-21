"""
Debug AI prompt summaries without calling the LLM.

Usage:
  python debug_ai_summary.py --task A-G14
  python debug_ai_summary.py --task A-G14 --method baseline_first_20_rows
  python debug_ai_summary.py --task A-G14 --method task_aware_data_summarization
  python debug_ai_summary.py --task A-G14 --compare-methods --write-log
  python debug_ai_summary.py --self-test
  python debug_ai_summary.py --self-test-categorical
  python debug_ai_summary.py --self-test-risk-flags
  python debug_ai_summary.py --self-test-trend-series
  python debug_ai_summary.py --self-test-ranking
  python debug_ai_summary.py --self-test-numeric-distribution
  python debug_ai_summary.py --self-test-group-comparison
  python debug_ai_summary.py --self-test-correlation-evidence
  python debug_ai_summary.py --self-test-multi-metric-comparison
  python debug_ai_summary.py --self-test-metric-snapshot
  python debug_ai_summary.py --self-test-action-synthesis
  python debug_ai_summary.py --self-test-v3
  python debug_ai_summary.py --task A-G14 --input-json path/to/datasets.json

The optional input JSON can be either:
  { "withdrawal_signal_trend": [ ... rows ... ] }
or:
  { "datasets": { "withdrawal_signal_trend": [ ... rows ... ] } }
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

os.environ.setdefault("OPENAI_API_KEY", "debug-no-llm-call")

from schemas import (
    AISummaryConfig,
    ConfidenceInput,
    ExplainRequest,
    ExplanationBody,
    Insight,
)
from strategies.base import BaseExplanationStrategy


ROOT = Path(__file__).resolve().parents[1]
TASK_REGISTRY = ROOT / "Backend" / "src" / "config" / "taskRegistry.json"
EVALUATION_ROOT = ROOT / "Docs" / "evaluation" / "ai_explanation"
SUMMARY_METHODS = ("task_aware_data_summarization", "baseline_first_20_rows")


def load_task(task_id: str) -> dict:
    tasks = json.loads(TASK_REGISTRY.read_text(encoding="utf-8"))
    for task in tasks:
        if task.get("taskId") == task_id:
            return task
    raise SystemExit(f"Task not found: {task_id}")


def build_ai_summary_config(task: dict) -> AISummaryConfig | None:
    if not task.get("aiSummaryType"):
        return None
    return AISummaryConfig(
        summary_type=task.get("aiSummaryType"),
        target_group=task.get("aiTargetGroup"),
        comparison_groups=task.get("aiComparisonGroups") or [],
        dynamic_comparison_groups=task.get("aiDynamicComparisonGroups") is True,
        comparison_alignment_columns=(
            task.get("aiComparisonAlignmentColumns") or []
        ),
        divergence_threshold=task.get("aiDivergenceThreshold"),
        time_column=task.get("aiTimeColumn"),
        x_column=task.get("aiXColumn"),
        y_column=task.get("aiYColumn"),
        metric_column=task.get("aiMetricColumn"),
        entity_column=task.get("aiEntityColumn"),
        color_column=task.get("aiColorColumn"),
        coefficient_column=task.get("aiCoefficientColumn"),
        coefficient_method=task.get("aiCoefficientMethod"),
        sample_size_column=task.get("aiSampleSizeColumn"),
        p_value_column=task.get("aiPValueColumn"),
        outlier_policy=task.get("aiOutlierPolicy"),
        group_column=task.get("aiGroupColumn"),
        group_key_columns=task.get("aiGroupKeyColumns") or [],
        series_column=task.get("aiSeriesColumn"),
        gap_column=task.get("aiGapColumn"),
        reliability_column=task.get("aiReliabilityColumn"),
        minimum_reliable_count=task.get("aiMinimumReliableCount"),
        minimum_sample_size=task.get("aiMinimumSampleSize"),
        category_column=task.get("aiCategoryColumn"),
        bin_column=task.get("aiBinColumn"),
        count_column=task.get("aiCountColumn"),
        percent_column=task.get("aiPercentColumn"),
        metric_columns=task.get("aiMetricColumns") or [],
        status_columns=task.get("aiStatusColumns") or [],
        threshold_columns=task.get("aiThresholdColumns") or [],
        benchmark_columns=task.get("aiBenchmarkColumns") or [],
        sensitive_columns=task.get("aiSensitiveColumns") or [],
        metric_availability_columns=task.get("aiMetricAvailabilityColumns") or {},
        threshold_sources=task.get("aiThresholdSources") or {},
        benchmark_sources=task.get("aiBenchmarkSources") or {},
        metric_key_column=task.get("aiMetricKeyColumn"),
        metric_value_column=task.get("aiMetricValueColumn"),
        entity_order=task.get("aiEntityOrder") or [],
        metric_directions=task.get("aiMetricDirections") or {},
        metric_units=task.get("aiMetricUnits") or {},
        metric_thresholds=task.get("aiMetricThresholds") or {},
        minimum_entity_count=task.get("aiMinimumEntityCount") or 2,
        require_metric_directions=task.get("aiRequireMetricDirections") is True,
        require_metric_units=task.get("aiRequireMetricUnits") is True,
        require_metric_thresholds=task.get("aiRequireMetricThresholds") is True,
        selected_entity_column=task.get("aiSelectedEntityColumn"),
        entity_evidence_available_column=task.get("aiEntityEvidenceAvailableColumn"),
        sensitive_context_policy=task.get("aiSensitiveContextPolicy"),
        require_sensitive_context_policy=task.get("aiRequireSensitiveContextPolicy") is True,
        focus_categories=task.get("aiFocusCategories") or [],
        focus_bins=task.get("aiFocusBins") or [],
        category_order=task.get("aiCategoryOrder") or [],
        expected_categories=task.get("aiExpectedCategories") or [],
        expected_groups=task.get("aiExpectedGroups") or [],
        bin_order=task.get("aiBinOrder") or [],
        expected_bins=task.get("aiExpectedBins") or [],
        numeric_threshold=task.get("aiNumericThreshold"),
        threshold_direction=task.get("aiThresholdDirection"),
        sort_by=task.get("aiSortBy"),
        sort_direction=task.get("aiSortDirection"),
        flag_name_column=task.get("aiFlagNameColumn"),
        flag_value_column=task.get("aiFlagValueColumn"),
        threshold_column=task.get("aiThresholdColumn"),
        triggered_column=task.get("aiTriggeredColumn"),
        severity_column=task.get("aiSeverityColumn"),
        description_column=task.get("aiDescriptionColumn"),
        recommended_action_column=task.get("aiRecommendedActionColumn"),
        support_category_column=task.get("aiSupportCategoryColumn"),
        severity_order=task.get("aiSeverityOrder") or [],
        flag_order=task.get("aiFlagOrder") or [],
        max_flags=task.get("aiMaxFlags"),
        secondary_metric_columns=task.get("aiSecondaryMetricColumns") or [],
        flag_columns=task.get("aiFlagColumns") or [],
        action_columns=task.get("aiActionColumns") or [],
        label_columns=task.get("aiLabelColumns") or [],
        evidence_columns=task.get("aiEvidenceColumns") or [],
        evidence_dataset_roles=task.get("aiEvidenceDatasetRoles") or {},
        action_source=task.get("aiActionSource"),
        action_rule_set_id=task.get("aiActionRuleSetId"),
        action_rule_version=task.get("aiActionRuleVersion"),
        action_evidence_contract=task.get("aiActionEvidenceContract") or [],
        action_derived_evidence=task.get("aiActionDerivedEvidence") or [],
        action_conflict_rules=task.get("aiActionConflictRules") or [],
        action_rules=task.get("aiActionRules") or [],
        priority_column=task.get("aiPriorityColumn"),
        owner_column=task.get("aiOwnerColumn"),
        time_horizon_column=task.get("aiTimeHorizonColumn"),
        trigger_columns=task.get("aiTriggerColumns") or [],
        max_actions=task.get("aiMaxActions"),
        provenance_required_fields=task.get("aiProvenanceRequiredFields") or [],
        require_complete_action_provenance=(
            task.get("aiRequireCompleteActionProvenance") is not False
        ),
        unsupported_action_behavior=(
            task.get("aiUnsupportedActionBehavior")
            or "emit_unsupported_actions"
        ),
        sensitive_action_policy=task.get("aiSensitiveActionPolicy"),
        require_sensitive_action_policy=(
            task.get("aiRequireSensitiveActionPolicy") is True
        ),
        max_points=task.get("aiMaxPoints"),
        top_k=task.get("aiTopK"),
        bottom_k=task.get("aiBottomK"),
    )


def sample_a_g14_rows() -> list[dict]:
    return [
        {"week_number": 1, "final_outcome": "Distinction", "avg_clicks": "197.44", "student_count": 18},
        {"week_number": 2, "final_outcome": "Distinction", "avg_clicks": "134.42", "student_count": 19},
        {"week_number": 3, "final_outcome": "Distinction", "avg_clicks": "157.00", "student_count": 20},
        {"week_number": 12, "final_outcome": "Distinction", "avg_clicks": "61.06", "student_count": 16},
        {"week_number": 16, "final_outcome": "Distinction", "avg_clicks": "100.61", "student_count": 18},
        {"week_number": 1, "final_outcome": "Fail", "avg_clicks": "90.00", "student_count": 22},
        {"week_number": 2, "final_outcome": "Fail", "avg_clicks": "88.00", "student_count": 24},
        {"week_number": 1, "final_outcome": "Pass", "avg_clicks": "120.00", "student_count": 120},
        {"week_number": 2, "final_outcome": "Pass", "avg_clicks": "115.00", "student_count": 121},
        {"week_number": 3, "final_outcome": "Pass", "avg_clicks": "116.00", "student_count": 119},
        {"week_number": 1, "final_outcome": "Withdrawn", "avg_clicks": "76.91", "student_count": 46},
        {"week_number": 2, "final_outcome": "Withdrawn", "avg_clicks": "106.34", "student_count": 44},
        {"week_number": 3, "final_outcome": "Withdrawn", "avg_clicks": "127.82", "student_count": 45},
        {"week_number": 4, "final_outcome": "Withdrawn", "avg_clicks": "73.54", "student_count": 41},
        {"week_number": 13, "final_outcome": "Withdrawn", "avg_clicks": "17.18", "student_count": 22},
        {"week_number": 29, "final_outcome": "Withdrawn", "avg_clicks": "6.33", "student_count": 3},
    ]


def sample_task_datasets(task_id: str) -> dict[str, list[dict]]:
    if task_id == "A-G02":
        return {
            "engagement_performance_scatter": [
                {"student_id": "S001", "engagement_score": "0.10", "avg_score": "40", "final_outcome": "Fail"},
                {"student_id": "S002", "engagement_score": "0.20", "avg_score": "45", "final_outcome": "Fail"},
                {"student_id": "S003", "engagement_score": "0.30", "avg_score": "50", "final_outcome": "Pass"},
                {"student_id": "S004", "engagement_score": "0.40", "avg_score": "55", "final_outcome": "Pass"},
                {"student_id": "S005", "engagement_score": "0.50", "avg_score": "60", "final_outcome": "Pass"},
                {"student_id": "S006", "engagement_score": "0.60", "avg_score": "65", "final_outcome": "Distinction"},
                {"student_id": "S007", "engagement_score": "0.90", "avg_score": "42", "final_outcome": "Fail"},
                {"student_id": "S008", "engagement_score": "bad", "avg_score": "70", "final_outcome": "Pass"},
                {"student_id": "S009", "engagement_score": "0.80", "avg_score": "bad", "final_outcome": "Fail"},
            ]
        }
    if task_id == "A-B02":
        return {
            "outcome_counts": [
                {"final_outcome": "Pass", "student_count": "260", "pct_of_class": "65.0"},
                {"final_outcome": "Fail", "student_count": "60", "pct_of_class": "15.0"},
                {"final_outcome": "Withdrawn", "student_count": "40", "pct_of_class": "10.0"},
                {"final_outcome": "Distinction", "student_count": "40", "pct_of_class": "10.0"},
            ]
        }
    if task_id == "A-B01":
        return {
            "score_distribution": [
                {"score_bucket": "40-50", "student_count": "12", "pct_of_class": "12.0", "avg_score_in_bucket": "45.5"},
                {"score_bucket": "0-10", "student_count": "3", "pct_of_class": "3.0", "avg_score_in_bucket": "7.0"},
                {"score_bucket": "No score", "student_count": "1", "pct_of_class": "1.0", "avg_score_in_bucket": None},
                {"score_bucket": "30-40", "student_count": "10", "pct_of_class": "10.0", "avg_score_in_bucket": "35.0"},
                {"score_bucket": "10-20", "student_count": "5", "pct_of_class": "5.0", "avg_score_in_bucket": "15.0"},
                {"score_bucket": "80-90", "student_count": "30", "pct_of_class": "30.0", "avg_score_in_bucket": "84.0"},
                {"score_bucket": "20-30", "student_count": "9", "pct_of_class": "9.0", "avg_score_in_bucket": "25.0"},
                {"score_bucket": "60-70", "student_count": "20", "pct_of_class": "20.0", "avg_score_in_bucket": "64.0"},
                {"score_bucket": "90-100", "student_count": "10", "pct_of_class": "10.0", "avg_score_in_bucket": "93.0"},
            ]
        }
    if task_id == "A-B03":
        return {
            "engagement_distribution": [
                {"study_effort_level": "very_low", "student_count": "80", "pct_of_class": "20.0", "avg_engagement_score": "0.0500"},
                {"study_effort_level": "low", "student_count": "100", "pct_of_class": "25.0", "avg_engagement_score": "0.1800"},
                {"study_effort_level": "medium", "student_count": "120", "pct_of_class": "30.0", "avg_engagement_score": "0.4200"},
                {"study_effort_level": "high", "student_count": "100", "pct_of_class": "25.0", "avg_engagement_score": "0.7500"},
            ]
        }
    if task_id == "A-G10":
        return {
            "consistency_distribution": [
                {"consistency_level": "high", "student_count": "90", "pct_students": "25.0", "avg_weekly_stddev": "4.2", "avg_weekly_clicks": "88.5", "avg_active_weeks": "20.0"},
                {"consistency_level": "medium", "student_count": "180", "pct_students": "50.0", "avg_weekly_stddev": "12.7", "avg_weekly_clicks": "71.3", "avg_active_weeks": "17.5"},
                {"consistency_level": "low", "student_count": "90", "pct_students": "25.0", "avg_weekly_stddev": "31.4", "avg_weekly_clicks": "55.2", "avg_active_weeks": "9.0"},
            ]
        }
    if task_id == "S-T04":
        return {
            "risk_flags": [
                {
                    "flag_name": "flag_low_score",
                    "flag_value": "38.5",
                    "threshold": "40",
                    "triggered": "true",
                    "severity": "high",
                    "flag_description": "Average score is below the pass threshold for this dataset scale.",
                    "recommended_action": "Review weakest assessment topics before the next assessment.",
                    "support_category": "academic_performance",
                },
                {
                    "flag_name": "flag_repeated",
                    "flag_value": "1",
                    "threshold": "0",
                    "triggered": 1,
                    "severity": "medium",
                    "flag_description": "This student has previous attempts.",
                    "recommended_action": "Check prior attempt context and create a catch-up plan.",
                    "support_category": "academic_history",
                },
                {
                    "flag_name": "flag_low_engagement",
                    "flag_value": "0.09",
                    "threshold": "0.15",
                    "triggered": True,
                    "severity": "medium",
                    "flag_description": "Engagement score is below the low-engagement threshold.",
                    "recommended_action": "Set a weekly study routine.",
                    "support_category": "engagement",
                },
                {
                    "flag_name": "flag_low_punctuality",
                    "flag_value": "0.92",
                    "threshold": "0.7",
                    "triggered": "false",
                    "severity": "info",
                    "flag_description": "Submission punctuality is above the threshold.",
                    "recommended_action": "Maintain submission planning.",
                    "support_category": "time_management",
                },
                {
                    "flag_name": "flag_neg_trend",
                    "flag_value": "0.2",
                    "threshold": "0",
                    "triggered": 0,
                    "severity": "info",
                    "flag_description": "Scores are not trending downward.",
                    "recommended_action": "Continue monitoring.",
                    "support_category": "trend_monitoring",
                },
            ]
        }
    if task_id == "A-S04":
        return {
            "risk_flags": [
                {"flag_name": "flag_low_score", "flag_value": "42.0", "threshold": "40", "triggered": "false"},
                {"flag_name": "flag_high_absence", "flag_value": "14", "threshold": "10", "triggered": "true"},
                {"flag_name": "flag_low_punctuality", "flag_value": "0.55", "threshold": "0.7", "triggered": True},
                {"flag_name": "flag_neg_trend", "flag_value": "-1.2", "threshold": "0", "triggered": 1},
            ]
        }
    if task_id == "S-T01":
        return {
            "score_trend": [
                {
                    "assessment_order": "3",
                    "week_of_class": 8,
                    "assessment_type": "TMA",
                    "assessment_name": "TMA03",
                    "score_normalized": "72",
                    "pass_flag": True,
                    "class_avg_score": "68",
                    "score_vs_class_avg": "4",
                    "performance_trend": "-3.5",
                    "below_pass_threshold": False,
                    "below_target_threshold": False,
                    "support_level": "maintain",
                    "recommended_action": "Keep the current preparation pattern.",
                },
                {
                    "assessment_order": "1",
                    "week_of_class": 2,
                    "assessment_type": "TMA",
                    "assessment_name": "TMA01",
                    "score_normalized": "55",
                    "pass_flag": True,
                    "class_avg_score": "60",
                    "score_vs_class_avg": "-5",
                    "performance_trend": "-3.5",
                    "below_pass_threshold": False,
                    "below_target_threshold": True,
                    "support_level": "targeted_practice",
                    "recommended_action": "Practice similar questions and review feedback.",
                },
                {
                    "assessment_order": "2",
                    "week_of_class": 5,
                    "assessment_type": "TMA",
                    "assessment_name": "TMA02",
                    "score_normalized": "78",
                    "pass_flag": True,
                    "class_avg_score": "64",
                    "score_vs_class_avg": "14",
                    "performance_trend": "-3.5",
                    "below_pass_threshold": False,
                    "below_target_threshold": False,
                    "support_level": "maintain",
                    "recommended_action": "Keep the current preparation pattern.",
                },
                {
                    "assessment_order": "4",
                    "week_of_class": 11,
                    "assessment_type": "TMA",
                    "assessment_name": "TMA04",
                    "score_normalized": "35",
                    "pass_flag": False,
                    "class_avg_score": "62",
                    "score_vs_class_avg": "-27",
                    "performance_trend": "-3.5",
                    "below_pass_threshold": True,
                    "below_target_threshold": True,
                    "support_level": "urgent_support",
                    "recommended_action": "Review this assessment with tutor support.",
                },
            ]
        }
    if task_id == "A-G18":
        return {
            "class_performance_trend": [
                {"assessment_order": "1", "assessment_name": "TMA01", "assessment_type": "TMA", "week_of_class": 2, "class_avg_score": "62", "pass_rate": "0.82", "completion_rate": "0.96", "submissions_count": "240"},
                {"assessment_order": "2", "assessment_name": "TMA02", "assessment_type": "TMA", "week_of_class": 5, "class_avg_score": "66", "pass_rate": "0.85", "completion_rate": "0.94", "submissions_count": "235"},
                {"assessment_order": "3", "assessment_name": "TMA03", "assessment_type": "TMA", "week_of_class": 8, "class_avg_score": "58", "pass_rate": "0.71", "completion_rate": "0.88", "submissions_count": "220"},
            ]
        }
    if task_id == "A-G11":
        return {
            "weekly_drop_detection": [
                {"week_number": "1", "week_total_clicks": "900", "cohort_avg_clicks": "760", "rolling_3wk_avg": None, "is_drop_week": False, "drop_pct": None},
                {"week_number": "2", "week_total_clicks": "850", "cohort_avg_clicks": "760", "rolling_3wk_avg": "900", "is_drop_week": False, "drop_pct": "-0.0556"},
                {"week_number": "3", "week_total_clicks": "820", "cohort_avg_clicks": "760", "rolling_3wk_avg": "875", "is_drop_week": False, "drop_pct": "-0.0629"},
                {"week_number": "4", "week_total_clicks": "300", "cohort_avg_clicks": "760", "rolling_3wk_avg": "856.67", "is_drop_week": True, "drop_pct": "-0.6498"},
                {"week_number": "5", "week_total_clicks": "780", "cohort_avg_clicks": "760", "rolling_3wk_avg": "656.67", "is_drop_week": False, "drop_pct": "0.1878"},
            ]
        }
    if task_id == "A-G15":
        return {
            "intervention_priority_list": [
                {"student_id": "S004", "gender": "F", "age_group": "25-34", "region": "North", "avg_score": "67.0", "at_risk_score": "1", "at_risk_label": "low", "flag_low_score": 0, "flag_repeated": 0, "flag_low_engagement": 1, "flag_low_punctuality": 0, "flag_neg_trend": 0, "final_outcome": "Pass"},
                {"student_id": "S001", "gender": "M", "age_group": "18-24", "region": "South", "avg_score": "38.5", "at_risk_score": "5", "at_risk_label": "high", "flag_low_score": 1, "flag_repeated": 1, "flag_low_engagement": 1, "flag_low_punctuality": 1, "flag_neg_trend": 1, "final_outcome": "Fail"},
                {"student_id": "S006", "gender": "F", "age_group": "35-44", "region": "West", "avg_score": "70.0", "at_risk_score": "0.5", "at_risk_label": "low", "flag_low_score": 0, "flag_repeated": 0, "flag_low_engagement": 0, "flag_low_punctuality": 0, "flag_neg_trend": 1, "final_outcome": "Pass"},
                {"student_id": "S003", "gender": "M", "age_group": "25-34", "region": "East", "avg_score": "41.0", "at_risk_score": 4, "at_risk_label": "high", "flag_low_score": 0, "flag_repeated": 1, "flag_low_engagement": 1, "flag_low_punctuality": 1, "flag_neg_trend": 1, "final_outcome": "Withdrawn"},
                {"student_id": "S002", "gender": "F", "age_group": "18-24", "region": "North", "avg_score": "39.0", "at_risk_score": "5", "at_risk_label": "high", "flag_low_score": 1, "flag_repeated": 0, "flag_low_engagement": 1, "flag_low_punctuality": 1, "flag_neg_trend": 1, "final_outcome": "Fail"},
                {"student_id": "S005", "gender": "M", "age_group": "45-54", "region": "South", "avg_score": "61.5", "at_risk_score": "2", "at_risk_label": "medium", "flag_low_score": 0, "flag_repeated": 1, "flag_low_engagement": 0, "flag_low_punctuality": 0, "flag_neg_trend": 1, "final_outcome": "Pass"},
            ]
        }
    if task_id == "A-G08":
        return {
            "background_group_profile": [
                {"group_value": "high_band", "student_count": "80", "avg_score": "72.0", "avg_engagement_score": "0.72", "score_vs_cohort": "6.5"},
                {"group_value": "low_band", "student_count": "20", "avg_score": "55.0", "avg_engagement_score": "0.21", "score_vs_cohort": "-10.5"},
                {"group_value": "medium_band", "student_count": "120", "avg_score": "64.0", "avg_engagement_score": "0.45", "score_vs_cohort": "-1.5"},
                {"group_value": "tiny_band", "student_count": "5", "avg_score": "70.0", "avg_engagement_score": "0.40", "score_vs_cohort": "4.0"},
            ]
        }
    return {"withdrawal_signal_trend": sample_a_g14_rows()}


def load_datasets(input_json: str | None, task_id: str = "A-G14") -> dict[str, list[dict]]:
    if not input_json:
        return sample_task_datasets(task_id)

    if input_json == "-":
        payload = json.loads(sys.stdin.read())
    else:
        payload = json.loads(Path(input_json).read_text(encoding="utf-8"))
    if isinstance(payload, dict) and isinstance(payload.get("datasets"), dict):
        return payload["datasets"]
    if isinstance(payload, dict):
        return payload
    raise SystemExit("Input JSON must be a datasets object or an object with a datasets key.")


def build_request(task_id: str, datasets: dict[str, list[dict]]) -> ExplainRequest:
    task = load_task(task_id)
    return ExplainRequest(
        task_id=task_id,
        execution_id="debug_summary",
        task_name=task.get("taskName"),
        actionable_question=task.get("actionableQuestion"),
        ai_prompt_hint=task.get("aiPromptHint"),
        explanation_strategy=task.get("explanation_strategy") or "trend",
        target_audience=task.get("target_audience") or [],
        visualization_config=task.get("visualization_config"),
        analysis_context=task.get("analysis_context"),
        datasets=datasets,
        confidence=ConfidenceInput(level="HIGH", reason="debug summary generation"),
        query_labels=task.get("query_labels") or [],
        ai_summary_config=build_ai_summary_config(task),
    )


def run_self_test() -> None:
    os.environ["AI_SUMMARY_METHOD"] = "task_aware_data_summarization"
    generic_req = build_request("A-G14", {"empty": []})
    generic_req.ai_summary_config = None
    generic_summary = json.loads(BaseExplanationStrategy.summarize_datasets(generic_req))
    assert generic_summary["summary_type"] == "full_rows_due_to_small_result"
    assert generic_summary["datasets"][0]["row_count"] == 0

    rows = [{"idx": i, "score": str(i), "group": "A" if i % 2 else "B"} for i in range(25)]
    fallback_req = build_request("A-G14", {"generic": rows})
    fallback_req.ai_summary_config = None
    fallback_summary = json.loads(BaseExplanationStrategy.summarize_datasets(fallback_req))
    first_rows = fallback_summary["datasets"][0]["first_rows"]
    last_rows = fallback_summary["datasets"][0]["last_rows"]
    assert [row["idx"] for row in first_rows] == [0, 1, 2, 3, 4]
    assert [row["idx"] for row in last_rows] == [20, 21, 22, 23, 24]
    assert fallback_summary["datasets"][0]["numeric_stats"]["score"]["max"] == 24

    trend_req = build_request("A-G14", {"withdrawal_signal_trend": sample_a_g14_rows()})
    trend_summary = BaseExplanationStrategy._build_task_aware_summary(trend_req)
    assert trend_summary["target_group"] == "Withdrawn"
    assert trend_summary["target_trend"]["group"] == "Withdrawn"
    reliable_drop = trend_summary["target_trend"]["largest_reliable_adjacent_drop"]
    assert reliable_drop["from"]["week_number"] < reliable_drop["to"]["week_number"]
    assert reliable_drop["from"]["week_number"] == 4
    assert reliable_drop["to"]["week_number"] == 13
    assert trend_summary["reliability_warnings"]

    missing_req = build_request(
        "A-G14",
        {"withdrawal_signal_trend": [row for row in sample_a_g14_rows() if row["final_outcome"] != "Withdrawn"]},
    )
    missing_summary = BaseExplanationStrategy._build_task_aware_summary(missing_req)
    assert missing_summary["target_group_missing"] is True
    assert "Withdrawn" in missing_summary["summarization_warnings"][0]

    dynamic_rows = [
        {
            "student_id": "S001",
            "assessment_order": 1,
            "assessment_type": "quiz",
            "score_normalized": 40,
        },
        {
            "student_id": "S001",
            "assessment_order": 2,
            "assessment_type": "quiz",
            "score_normalized": 55,
        },
        {
            "student_id": "S001",
            "assessment_order": 2,
            "assessment_type": "quiz",
            "score_normalized": 57,
        },
        {
            "student_id": "S001",
            "assessment_order": 3,
            "assessment_type": "exam",
            "score_normalized": 70,
        },
        {
            "student_id": "S002",
            "assessment_order": 1,
            "assessment_type": "quiz",
            "score_normalized": 50,
        },
        {
            "student_id": "S002",
            "assessment_order": 2,
            "assessment_type": "quiz",
            "score_normalized": 55,
        },
        {
            "student_id": "S002",
            "assessment_order": 3,
            "assessment_type": "exam",
            "score_normalized": 60,
        },
    ]
    dynamic_req = build_request(
        "A-C01",
        {"trajectory_comparison": dynamic_rows},
    )
    dynamic_req.ai_summary_config = AISummaryConfig(
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
    dynamic_summary = BaseExplanationStrategy._build_task_aware_summary(dynamic_req)
    assert dynamic_summary["available_groups"] == ["S001", "S002"]
    pairwise = dynamic_summary["pairwise_comparison"]
    assert pairwise["shared_point_count"] == 3
    assert pairwise["gap_series"][1]["group_values"]["S001"]["value"] == 56
    assert pairwise["gap_series"][1]["group_values"]["S001"]["duplicate_count"] == 2
    assert pairwise["first_divergence"]["alignment"]["assessment_order"] == 1
    assert pairwise["largest_absolute_gap"]["absolute_gap"] == 10
    assert pairwise["net_change_by_group"] == {"S001": 30, "S002": 10}
    assert pairwise["faster_improving_group"] == "S001"

    one_group_req = build_request(
        "A-C01",
        {
            "trajectory_comparison": [
                row for row in dynamic_rows if row["student_id"] == "S001"
            ]
        },
    )
    one_group_req.ai_summary_config = dynamic_req.ai_summary_config
    one_group_summary = BaseExplanationStrategy._build_task_aware_summary(one_group_req)
    assert one_group_summary["evidence_status"] == "insufficient_evidence"
    assert one_group_summary["pairwise_comparison"] is None
    assert one_group_summary["missing_group_evidence"]

    baseline_req = build_request("A-G14", {"generic": rows})
    baseline_result = BaseExplanationStrategy.build_summary_result(
        baseline_req,
        method_override="baseline_first_20_rows",
        include_debug_payload=True,
    )
    baseline_payload = baseline_result["metadata"]["summary_debug_payload"]
    baseline_dataset = baseline_payload["datasets"][0]
    assert baseline_result["metadata"]["input_summary_type"] == "raw_first_20_rows"
    assert baseline_dataset["included_row_count"] == 20
    assert baseline_dataset["truncated_row_count"] == 5
    assert baseline_dataset["rows"][-1]["idx"] == 19
    assert "Dataset: generic (25 rows)" in baseline_result["summary_text"]
    assert "[... 5 more rows truncated]" in baseline_result["summary_text"]

    print("debug_ai_summary self-test passed")


def summarize_for_method(req: ExplainRequest, method: str) -> dict:
    start = time.perf_counter()
    result = BaseExplanationStrategy.build_summary_result(
        req,
        method_override=method,
        include_debug_payload=True,
    )
    latency_ms = round((time.perf_counter() - start) * 1000, 3)
    return {
        "taskId": req.task_id,
        "datasetId": next(iter(req.datasets.keys()), None),
        "method": result["metadata"]["ai_summary_method"],
        "input_summary_type": result["metadata"]["input_summary_type"],
        "input_data_summary": result["summary_text"],
        "summary_debug_payload": result["metadata"].get("summary_debug_payload"),
        "ai_response": None,
        "latency": latency_ms,
        "rubric_score": None,
        "notes": "Input summary comparison only; no model call was made.",
    }


def log_dir_for_method(method: str) -> Path:
    if method == "baseline_first_20_rows":
        return EVALUATION_ROOT / "baseline_first_20"
    return EVALUATION_ROOT / "task_aware_summary"


def write_summary_log(record: dict) -> Path:
    output_dir = log_dir_for_method(record["method"])
    output_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    path = output_dir / f"{record['taskId']}_{record['method']}_{timestamp}.json"
    path.write_text(json.dumps(record, indent=2, ensure_ascii=False, default=str), encoding="utf-8")
    return path


def run_self_test_categorical() -> None:
    os.environ["AI_SUMMARY_METHOD"] = "task_aware_data_summarization"
    a_b02_req = build_request("A-B02", sample_task_datasets("A-B02"))
    a_b02_summary = json.loads(BaseExplanationStrategy.summarize_datasets(a_b02_req))
    assert a_b02_summary["summary_type"] == "categorical_distribution"
    assert a_b02_summary["category_column"] == "final_outcome"
    assert a_b02_summary["total_count"] == 400
    assert a_b02_summary["focus_total"]["count"] == 100
    assert a_b02_summary["focus_total"]["percent"] == 25
    assert [item["category"] for item in a_b02_summary["category_distribution"]] == [
        "Pass",
        "Fail",
        "Withdrawn",
        "Distinction",
    ]

    a_b03_req = build_request("A-B03", sample_task_datasets("A-B03"))
    a_b03_summary = json.loads(BaseExplanationStrategy.summarize_datasets(a_b03_req))
    assert [item["category"] for item in a_b03_summary["category_distribution"]] == [
        "very_low",
        "low",
        "medium",
        "high",
    ]
    assert a_b03_summary["focus_total"]["count"] == 180
    assert a_b03_summary["focus_total"]["percent"] == 45
    assert a_b03_summary["metric_evidence_by_category"]["very_low"]["avg_engagement_score"] == 0.05

    a_g10_req = build_request("A-G10", sample_task_datasets("A-G10"))
    a_g10_summary = json.loads(BaseExplanationStrategy.summarize_datasets(a_g10_req))
    assert [item["category"] for item in a_g10_summary["category_distribution"]] == [
        "high",
        "medium",
        "low",
    ]
    assert a_g10_summary["focus_total"]["categories"] == ["low"]
    assert a_g10_summary["metric_evidence_by_category"]["low"]["avg_active_weeks"] == 9

    missing_expected_req = build_request("A-B03", {
        "engagement_distribution": [
            {"study_effort_level": "very_low", "student_count": 1, "pct_of_class": 50, "avg_engagement_score": 0.1},
            {"study_effort_level": "low", "student_count": 1, "pct_of_class": 50, "avg_engagement_score": 0.2},
        ]
    })
    missing_expected_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_expected_req))
    assert "medium" in missing_expected_summary["missing_expected_categories"]
    assert "high" in missing_expected_summary["missing_expected_categories"]

    missing_focus_req = build_request("A-B03", {
        "engagement_distribution": [
            {"study_effort_level": "very_low", "student_count": 2, "pct_of_class": 100, "avg_engagement_score": 0.1},
        ]
    })
    missing_focus_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_focus_req))
    assert "low" in missing_focus_summary["missing_focus_categories"]
    assert missing_focus_summary["focus_total"]["count"] == 2

    missing_required_req = build_request("A-B02", {
        "outcome_counts": [
            {"wrong_column": "Pass", "student_count": 2, "pct_of_class": 100},
        ]
    })
    missing_required_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_required_req))
    assert "generic_diagnostic_sample" in missing_required_summary
    assert missing_required_summary["summarization_warnings"]

    empty_req = build_request("A-B02", {"outcome_counts": []})
    empty_summary = json.loads(BaseExplanationStrategy.summarize_datasets(empty_req))
    assert "Primary dataset is empty." in empty_summary["summarization_warnings"]

    rounded_req = build_request("A-B02", {
        "outcome_counts": [
            {"final_outcome": "Pass", "student_count": 1, "pct_of_class": 33.3},
            {"final_outcome": "Fail", "student_count": 1, "pct_of_class": 33.3},
            {"final_outcome": "Withdrawn", "student_count": 1, "pct_of_class": 33.3},
        ]
    })
    rounded_summary = json.loads(BaseExplanationStrategy.summarize_datasets(rounded_req))
    assert not any("Percent total" in warning for warning in rounded_summary["summarization_warnings"])

    bad_percent_req = build_request("A-B02", {
        "outcome_counts": [
            {"final_outcome": "Pass", "student_count": 1, "pct_of_class": 50},
            {"final_outcome": "Fail", "student_count": 1, "pct_of_class": 10},
        ]
    })
    bad_percent_summary = json.loads(BaseExplanationStrategy.summarize_datasets(bad_percent_req))
    assert any("Percent total" in warning for warning in bad_percent_summary["summarization_warnings"])

    print("debug_ai_summary categorical self-test passed")


def run_self_test_risk_flags() -> None:
    os.environ["AI_SUMMARY_METHOD"] = "task_aware_data_summarization"
    s_t04_req = build_request("S-T04", sample_task_datasets("S-T04"))
    s_t04_summary = json.loads(BaseExplanationStrategy.summarize_datasets(s_t04_req))
    assert s_t04_summary["summary_type"] == "risk_flags"
    assert s_t04_summary["triggered_count"] == 3
    assert s_t04_summary["non_triggered_count"] == 2
    assert s_t04_summary["unknown_triggered_count"] == 0
    assert s_t04_summary["severity_available"] is True
    assert s_t04_summary["severity_counts"]["high"] == 1
    assert [item["flag_name"] for item in s_t04_summary["triggered_flags"]] == [
        "flag_low_score",
        "flag_repeated",
        "flag_low_engagement",
    ]
    assert s_t04_summary["highest_severity_triggered"] == "high"
    assert s_t04_summary["recommended_actions"][0]["flag_name"] == "flag_low_score"

    a_s04_req = build_request("A-S04", sample_task_datasets("A-S04"))
    a_s04_summary = json.loads(BaseExplanationStrategy.summarize_datasets(a_s04_req))
    assert a_s04_summary["summary_type"] == "risk_flags"
    assert a_s04_summary["severity_available"] is False
    assert a_s04_summary["severity_counts"] == {}
    assert not any("severity" in item for item in a_s04_summary["triggered_flags"])
    assert a_s04_summary["recommended_actions"] == []
    assert a_s04_summary["summarization_warnings"] == [
        "Configured optional column 'flag_description' is missing from dataset.",
        "Configured optional column 'recommended_action' is missing from dataset.",
        "Configured optional column 'support_category' is missing from dataset.",
    ]
    assert [item["flag_name"] for item in a_s04_summary["triggered_flags"]] == [
        "flag_high_absence",
        "flag_low_punctuality",
        "flag_neg_trend",
    ]

    missing_required_req = build_request("S-T04", {
        "risk_flags": [
            {"wrong": "flag_low_score", "flag_value": 30, "threshold": 40, "triggered": True},
        ]
    })
    missing_required_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_required_req))
    assert "generic_diagnostic_sample" in missing_required_summary
    assert missing_required_summary["summarization_warnings"]

    missing_optional_req = build_request("S-T04", {
        "risk_flags": [
            {"flag_name": "flag_low_score", "flag_value": 30, "threshold": 40, "triggered": True},
        ]
    })
    missing_optional_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_optional_req))
    assert any("severity" in warning for warning in missing_optional_summary["summarization_warnings"])
    assert missing_optional_summary["triggered_count"] == 1

    large_rows = [
        {
            "flag_name": f"flag_{idx:02d}",
            "flag_value": idx,
            "threshold": 5,
            "triggered": idx % 2 == 0,
            "severity": "medium",
        }
        for idx in range(14)
    ]
    large_req = build_request("S-T04", {"risk_flags": large_rows})
    large_summary = json.loads(BaseExplanationStrategy.summarize_datasets(large_req))
    assert len(large_summary["triggered_flags"]) + len(large_summary["non_triggered_flags"]) == 10
    assert any("capped" in warning for warning in large_summary["summarization_warnings"])

    unknown_req = build_request("A-S04", {
        "risk_flags": [
            {"flag_name": "flag_low_score", "flag_value": 30, "threshold": 40, "triggered": "maybe"},
        ]
    })
    unknown_summary = json.loads(BaseExplanationStrategy.summarize_datasets(unknown_req))
    assert unknown_summary["unknown_triggered_count"] == 1
    assert unknown_summary["triggered_count"] == 0
    assert any("Unrecognized triggered value" in warning for warning in unknown_summary["summarization_warnings"])

    empty_req = build_request("S-T04", {"risk_flags": []})
    empty_summary = json.loads(BaseExplanationStrategy.summarize_datasets(empty_req))
    assert "Primary dataset is empty." in empty_summary["summarization_warnings"]

    print("debug_ai_summary risk_flags self-test passed")


def run_self_test_trend_series() -> None:
    os.environ["AI_SUMMARY_METHOD"] = "task_aware_data_summarization"
    s_t01_req = build_request("S-T01", sample_task_datasets("S-T01"))
    s_t01_summary = json.loads(BaseExplanationStrategy.summarize_datasets(s_t01_req))
    assert s_t01_summary["summary_type"] == "trend_series"
    assert s_t01_summary["point_count"] == 4
    assert s_t01_summary["first_point"]["assessment_order"] == 1.0
    assert s_t01_summary["last_point"]["assessment_order"] == 4.0
    assert s_t01_summary["peak"]["score_normalized"] == 78.0
    assert s_t01_summary["trough"]["score_normalized"] == 35.0
    assert s_t01_summary["overall_change"]["delta"] == -20.0
    assert s_t01_summary["largest_adjacent_rise"]["delta"] == 23.0
    assert s_t01_summary["largest_adjacent_drop"]["delta"] == -37.0
    assert {point["assessment_order"] for point in s_t01_summary["flagged_points"]} == {1.0, 4.0}
    assert all("pass_flag" not in point.get("flags", {}) for point in s_t01_summary["flagged_points"])
    assert s_t01_summary["action_evidence"]

    a_g18_req = build_request("A-G18", sample_task_datasets("A-G18"))
    a_g18_summary = json.loads(BaseExplanationStrategy.summarize_datasets(a_g18_req))
    assert a_g18_summary["summary_type"] == "trend_series"
    assert a_g18_summary["first_point"]["assessment_order"] == 1.0
    assert a_g18_summary["secondary_metric_evidence"]["pass_rate"]["min"] == 0.71
    assert a_g18_summary["secondary_metric_evidence"]["completion_rate"]["last"] == 0.88
    assert a_g18_summary["flagged_points"] == []

    a_g11_req = build_request("A-G11", sample_task_datasets("A-G11"))
    a_g11_summary = json.loads(BaseExplanationStrategy.summarize_datasets(a_g11_req))
    assert a_g11_summary["summary_type"] == "trend_series"
    assert a_g11_summary["flagged_points"][0]["week_number"] == 4.0
    assert list(a_g11_summary["flagged_points"][0]["flags"].keys()) == ["is_drop_week"]
    assert a_g11_summary["largest_adjacent_drop"]["delta"] == -520.0

    unknown_flag_req = build_request("A-G11", {
        "weekly_drop_detection": [
            {"week_number": 1, "week_total_clicks": 100, "is_drop_week": "maybe"},
        ]
    })
    unknown_flag_summary = json.loads(BaseExplanationStrategy.summarize_datasets(unknown_flag_req))
    assert unknown_flag_summary["flagged_points"] == []
    assert any("Unrecognized flag value" in warning for warning in unknown_flag_summary["summarization_warnings"])

    missing_required_req = build_request("S-T01", {
        "score_trend": [
            {"assessment_order": 1, "wrong_metric": 70},
        ]
    })
    missing_required_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_required_req))
    assert "generic_diagnostic_sample" in missing_required_summary
    assert missing_required_summary["summarization_warnings"]

    invalid_rows_req = build_request("S-T01", {
        "score_trend": [
            {"assessment_order": "bad", "score_normalized": 70},
            {"assessment_order": 1, "score_normalized": "bad"},
            {"assessment_order": 2, "score_normalized": 80},
        ]
    })
    invalid_rows_summary = json.loads(BaseExplanationStrategy.summarize_datasets(invalid_rows_req))
    assert invalid_rows_summary["point_count"] == 1
    assert any("invalid assessment_order" in warning for warning in invalid_rows_summary["summarization_warnings"])
    assert any("invalid score_normalized" in warning for warning in invalid_rows_summary["summarization_warnings"])

    capped_rows = [
        {"assessment_order": idx, "score_normalized": idx}
        for idx in range(35)
    ]
    capped_req = build_request("S-T01", {"score_trend": capped_rows})
    capped_summary = json.loads(BaseExplanationStrategy.summarize_datasets(capped_req))
    assert capped_summary["point_count"] == 35
    assert any("capped" in warning for warning in capped_summary["summarization_warnings"])

    multi_dataset_req = build_request(
        "S-T12",
        {
            "punctuality_summary": [
                {"submission_delay_avg": "3.25", "punctuality_rate": "0"},
            ],
            "submission_series": [
                {
                    "assessment_order": 1,
                    "submission_delay_days": 3,
                    "score_normalized": 100,
                    "pass_flag": True,
                },
                {
                    "assessment_order": 2,
                    "submission_delay_days": 2,
                    "score_normalized": 87,
                    "pass_flag": True,
                },
                {
                    "assessment_order": 3,
                    "submission_delay_days": 6,
                    "score_normalized": 70,
                    "pass_flag": True,
                },
            ],
        },
    )
    multi_dataset_req.ai_summary_config = AISummaryConfig(
        summary_type="trend_series",
        time_column="assessment_order",
        metric_column="submission_delay_days",
        secondary_metric_columns=["score_normalized"],
        flag_columns=["pass_flag"],
        evidence_dataset_roles={
            "submission_series": "primary_series",
            "punctuality_summary": "context_summary",
        },
        metric_units={
            "submission_delay_days": "days_relative_to_due_date",
            "score_normalized": "score_on_runtime_scale",
        },
        metric_directions={
            "submission_delay_days": "higher_is_worse",
            "score_normalized": "higher_is_better",
        },
        minimum_sample_size=6,
    )
    multi_dataset_summary = json.loads(
        BaseExplanationStrategy.summarize_datasets(multi_dataset_req)
    )
    assert multi_dataset_summary["dataset_name"] == "submission_series"
    assert multi_dataset_summary["point_count"] == 3
    assert multi_dataset_summary["multi_dataset_evidence"][0]["dataset_name"] == "punctuality_summary"
    assert multi_dataset_summary["small_sample_caveats"]
    assert multi_dataset_summary["causal_claim_allowed"] is False
    score_assoc = multi_dataset_summary["secondary_metric_associations"]["score_normalized"]
    assert score_assoc["paired_point_count"] == 3
    assert score_assoc["claim_limit"].startswith("descriptive_association_only")
    assert multi_dataset_summary["metric_units"]["submission_delay_days"] == "days_relative_to_due_date"

    empty_req = build_request("S-T01", {"score_trend": []})
    empty_summary = json.loads(BaseExplanationStrategy.summarize_datasets(empty_req))
    assert "Primary dataset is empty." in empty_summary["summarization_warnings"]

    print("debug_ai_summary trend_series self-test passed")


def ranking_config(top_k: int = 2, bottom_k: int = 2) -> AISummaryConfig:
    return AISummaryConfig(
        summary_type="ranking",
        entity_column="student_id",
        metric_column="at_risk_score",
        sort_direction="desc",
        secondary_metric_columns=["avg_score"],
        label_columns=["at_risk_label", "final_outcome"],
        flag_columns=[
            "flag_low_score",
            "flag_repeated",
            "flag_low_engagement",
            "flag_low_punctuality",
            "flag_neg_trend",
        ],
        top_k=top_k,
        bottom_k=bottom_k,
    )


def numeric_distribution_config(
    *,
    bin_order: list[str] | None = None,
    focus_bins: list[str] | None = None,
    threshold: int | float = 40,
) -> AISummaryConfig:
    default_order = [
        "0-10",
        "10-20",
        "20-30",
        "30-40",
        "40-50",
        "50-60",
        "60-70",
        "70-80",
        "80-90",
        "90-100",
        "No score",
    ]
    return AISummaryConfig(
        summary_type="numeric_distribution",
        bin_column="score_bucket",
        count_column="student_count",
        percent_column="pct_of_class",
        metric_columns=["avg_score_in_bucket"],
        bin_order=default_order if bin_order is None else bin_order,
        expected_bins=default_order,
        focus_bins=focus_bins if focus_bins is not None else ["0-10", "10-20", "20-30", "30-40"],
        numeric_threshold=threshold,
        threshold_direction="below",
    )


def group_comparison_config(
    *,
    gap_column: str | None = "score_vs_cohort",
    expected_groups: list[str] | None = None,
    top_k: int = 2,
    bottom_k: int = 1,
    group_key_columns: list[str] | None = None,
    series_column: str | None = None,
    focus_categories: list[str] | None = None,
    metric_column: str = "avg_score",
    metric_columns: list[str] | None = None,
) -> AISummaryConfig:
    return AISummaryConfig(
        summary_type="group_comparison",
        group_column="group_value",
        group_key_columns=group_key_columns or [],
        series_column=series_column,
        metric_column=metric_column,
        count_column="student_count",
        metric_columns=metric_columns if metric_columns is not None else ["avg_engagement_score"],
        gap_column=gap_column,
        expected_groups=expected_groups if expected_groups is not None else ["high_band", "low_band", "medium_band", "missing_expected"],
        focus_categories=focus_categories or [],
        target_group="low_band",
        comparison_groups=["high_band", "missing_comparison"],
        sort_by=gap_column or "gap",
        sort_direction="asc",
        minimum_reliable_count=10,
        top_k=top_k,
        bottom_k=bottom_k,
    )


def multi_metric_comparison_config(**overrides) -> AISummaryConfig:
    values = {
        "summary_type": "multi_metric_comparison",
        "entity_column": "student_id",
        "metric_columns": ["avg_score", "engagement_score", "active_days"],
        "entity_order": ["S001", "S002"],
        "metric_units": {
            "avg_score": "score_0_100",
            "engagement_score": "ratio_0_1",
            "active_days": "days",
        },
        "metric_directions": {
            "avg_score": "higher_is_better",
            "engagement_score": "higher_is_better",
            "active_days": "higher_is_better",
        },
        "minimum_entity_count": 2,
        "require_metric_units": True,
        "require_metric_directions": True,
        "label_columns": ["risk_label"],
        "flag_columns": ["flag_low_score"],
        "selected_entity_column": "is_selected",
    }
    values.update(overrides)
    return AISummaryConfig(**values)


def action_synthesis_config(task_id: str, **overrides) -> AISummaryConfig:
    catalog_path = (
        ROOT
        / "Docs"
        / "evaluation_v2"
        / "ai_explanation_judge_v2"
        / "action_synthesis_rules.v1.json"
    )
    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    rule_set = next(
        item for item in catalog["rule_sets"] if item["task_id"] == task_id
    )
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
    values = {
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
        "provenance_required_fields": [
            "dataset_label",
            "dataset_role",
            "row_index",
            "column",
            "raw_value",
            "parsed_value",
            "unit",
            "rule_id",
            "rule_version",
        ],
        "require_complete_action_provenance": True,
        "unsupported_action_behavior": rule_set[
            "unsupported_action_behavior"
        ],
        "sensitive_action_policy": "exclude_sensitive_triggers",
        "require_sensitive_action_policy": any(
            item["sensitive"] for item in rule_set["evidence_contract"]
        ),
    }
    values.update(overrides)
    return AISummaryConfig(**values)


def correlation_evidence_config(
    *,
    coefficient_column: str | None = None,
    sample_size_column: str | None = None,
    p_value_column: str | None = None,
    outlier_policy: str | None = "high_x_low_y",
    minimum_sample_size: int = 6,
    top_k: int = 1,
    selected_entity_column: str | None = None,
    label_columns: list[str] | None = None,
    sensitive_columns: list[str] | None = None,
    sensitive_context_policy: str | None = None,
) -> AISummaryConfig:
    return AISummaryConfig(
        summary_type="correlation_evidence",
        x_column="engagement_score",
        y_column="avg_score",
        entity_column="student_id",
        color_column="final_outcome",
        coefficient_column=coefficient_column,
        coefficient_method="pearson",
        sample_size_column=sample_size_column,
        p_value_column=p_value_column,
        outlier_policy=outlier_policy,
        minimum_sample_size=minimum_sample_size,
        top_k=top_k,
        selected_entity_column=selected_entity_column,
        label_columns=label_columns or [],
        sensitive_columns=sensitive_columns or [],
        sensitive_context_policy=sensitive_context_policy,
    )


def run_self_test_ranking() -> None:
    os.environ["AI_SUMMARY_METHOD"] = "task_aware_data_summarization"
    rows = sample_task_datasets("A-G15")["intervention_priority_list"]

    generic_req = build_request("A-G15", {"intervention_priority_list": rows})
    generic_req.ai_summary_config = None
    generic_summary = json.loads(BaseExplanationStrategy.summarize_datasets(generic_req))
    assert generic_summary["summary_type"] == "generic_fallback"

    ranking_req = build_request("A-G15", {"intervention_priority_list": rows})
    ranking_req.ai_summary_config = ranking_config()
    ranking_summary = json.loads(BaseExplanationStrategy.summarize_datasets(ranking_req))
    assert ranking_summary["summary_type"] == "ranking"
    assert ranking_summary["dataset_name"] == "intervention_priority_list"
    assert ranking_summary["entity_column"] == "student_id"
    assert ranking_summary["metric_column"] == "at_risk_score"
    assert ranking_summary["sort_direction"] == "desc"
    assert len(ranking_summary["top_items"]) == 2
    assert len(ranking_summary["bottom_items"]) == 2
    assert [item["student_id"] for item in ranking_summary["top_items"]] == ["S001", "S002"]
    assert [item["student_id"] for item in ranking_summary["bottom_items"]] == ["S004", "S006"]
    assert ranking_summary["top_items"][0]["at_risk_score"] == 5.0
    assert ranking_summary["bottom_items"][-1]["at_risk_score"] == 0.5
    assert ranking_summary["median_item"]["student_id"] == "S005"
    assert ranking_summary["metric_stats"]["count"] == 6
    assert ranking_summary["metric_stats"]["max"] == 5.0
    assert ranking_summary["metric_stats"]["min"] == 0.5
    assert ranking_summary["metric_stats"]["median"] == 3.0
    assert ranking_summary["top_items"][0]["labels"] == {
        "at_risk_label": "high",
        "final_outcome": "Fail",
    }
    assert ranking_summary["top_items"][0]["secondary_metrics"]["avg_score"] == 38.5
    assert "flag_low_score" in ranking_summary["top_items"][0]["flags"]
    assert any(item["student_id"] == "S001" for item in ranking_summary["flag_evidence"])

    forbidden = {"gender", "age_group", "region"}
    for item in ranking_summary["top_items"] + ranking_summary["bottom_items"]:
        assert forbidden.isdisjoint(item.keys())
        assert forbidden.isdisjoint(item.get("labels", {}).keys())
        assert forbidden.isdisjoint(item.get("secondary_metrics", {}).keys())

    tie_req = build_request("A-G15", {"intervention_priority_list": rows})
    tie_req.ai_summary_config = ranking_config(top_k=1, bottom_k=1)
    tie_summary = json.loads(BaseExplanationStrategy.summarize_datasets(tie_req))
    assert any("top_items boundary" in warning for warning in tie_summary["tie_warnings"])

    missing_entity_req = build_request("A-G15", {"intervention_priority_list": rows})
    missing_entity_req.ai_summary_config = ranking_config()
    missing_entity_req.ai_summary_config.entity_column = "missing_student_id"
    missing_entity_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_entity_req))
    assert any("missing_student_id" in warning for warning in missing_entity_summary["summarization_warnings"])

    missing_metric_req = build_request("A-G15", {"intervention_priority_list": rows})
    missing_metric_req.ai_summary_config = ranking_config()
    missing_metric_req.ai_summary_config.metric_column = "missing_at_risk_score"
    missing_metric_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_metric_req))
    assert any("missing_at_risk_score" in warning for warning in missing_metric_summary["summarization_warnings"])

    invalid_metric_req = build_request("A-G15", {
        "intervention_priority_list": [
            {"student_id": "S001", "at_risk_score": "bad"},
            {"student_id": "S002", "at_risk_score": "3"},
        ]
    })
    invalid_metric_req.ai_summary_config = ranking_config()
    invalid_metric_summary = json.loads(BaseExplanationStrategy.summarize_datasets(invalid_metric_req))
    assert invalid_metric_summary["metric_stats"]["count"] == 1
    assert any("invalid at_risk_score" in warning for warning in invalid_metric_summary["summarization_warnings"])

    assert set(SUMMARY_METHODS) == {"task_aware_data_summarization", "baseline_first_20_rows"}

    print("debug_ai_summary ranking self-test passed")


def run_self_test_numeric_distribution() -> None:
    os.environ["AI_SUMMARY_METHOD"] = "task_aware_data_summarization"
    rows = sample_task_datasets("A-B01")["score_distribution"]

    generic_req = build_request("A-B01", {"score_distribution": rows})
    generic_req.ai_summary_config = None
    generic_summary = json.loads(BaseExplanationStrategy.summarize_datasets(generic_req))
    assert generic_summary["summary_type"] == "generic_fallback"

    numeric_req = build_request("A-B01", {"score_distribution": rows})
    numeric_req.ai_summary_config = numeric_distribution_config()
    numeric_summary = json.loads(BaseExplanationStrategy.summarize_datasets(numeric_req))
    assert numeric_summary["summary_type"] == "numeric_distribution"
    assert numeric_summary["dataset_name"] == "score_distribution"
    assert numeric_summary["bin_column"] == "score_bucket"
    assert [item["bin"] for item in numeric_summary["bin_distribution"]] == [
        "0-10",
        "10-20",
        "20-30",
        "30-40",
        "40-50",
        "60-70",
        "80-90",
        "90-100",
        "No score",
    ]
    assert numeric_summary["bin_distribution"][0]["count"] == 3.0
    assert numeric_summary["bin_distribution"][0]["metrics"]["avg_score_in_bucket"] == 7.0
    assert numeric_summary["bin_distribution"][-1]["bin"] == "No score"
    assert numeric_summary["total_count"] == 100.0
    assert numeric_summary["dominant_bin"]["bin"] == "80-90"
    assert numeric_summary["focus_total"]["present_bins"] == ["0-10", "10-20", "20-30", "30-40"]
    assert numeric_summary["focus_total"]["count"] == 27.0
    assert numeric_summary["focus_total"]["percent"] == 27.0
    assert numeric_summary["threshold_summary"]["bins"] == ["0-10", "10-20", "20-30", "30-40"]
    assert numeric_summary["threshold_summary"]["count"] == 27.0
    assert numeric_summary["missing_expected_bins"] == ["50-60", "70-80"]
    assert not any("Percent total" in warning for warning in numeric_summary["summarization_warnings"])

    fallback_order_req = build_request("A-B01", {"score_distribution": rows})
    fallback_order_req.ai_summary_config = numeric_distribution_config(bin_order=[])
    fallback_order_summary = json.loads(BaseExplanationStrategy.summarize_datasets(fallback_order_req))
    assert [item["bin"] for item in fallback_order_summary["bin_distribution"]][-1] == "No score"
    assert [item["bin"] for item in fallback_order_summary["bin_distribution"]][:4] == [
        "0-10",
        "10-20",
        "20-30",
        "30-40",
    ]

    explicit_no_score_req = build_request("A-B01", {"score_distribution": rows})
    explicit_no_score_req.ai_summary_config = numeric_distribution_config(
        bin_order=["No score", "0-10", "10-20", "20-30", "30-40", "40-50", "60-70", "80-90", "90-100"]
    )
    explicit_no_score_summary = json.loads(BaseExplanationStrategy.summarize_datasets(explicit_no_score_req))
    assert explicit_no_score_summary["bin_distribution"][0]["bin"] == "No score"

    mismatch_req = build_request("A-B01", {"score_distribution": rows})
    mismatch_req.ai_summary_config = numeric_distribution_config(focus_bins=["0-10"])
    mismatch_summary = json.loads(BaseExplanationStrategy.summarize_datasets(mismatch_req))
    assert any("disagree" in warning for warning in mismatch_summary["summarization_warnings"])

    bad_percent_req = build_request("A-B01", {
        "score_distribution": [
            {"score_bucket": "0-10", "student_count": "1", "pct_of_class": "20"},
            {"score_bucket": "10-20", "student_count": "1", "pct_of_class": "20"},
        ]
    })
    bad_percent_req.ai_summary_config = numeric_distribution_config(
        bin_order=["0-10", "10-20"],
        focus_bins=["0-10", "10-20"],
        threshold=20,
    )
    bad_percent_summary = json.loads(BaseExplanationStrategy.summarize_datasets(bad_percent_req))
    assert any("Percent total" in warning for warning in bad_percent_summary["summarization_warnings"])

    missing_bin_req = build_request("A-B01", {"score_distribution": rows})
    missing_bin_req.ai_summary_config = numeric_distribution_config()
    missing_bin_req.ai_summary_config.bin_column = "missing_score_bucket"
    missing_bin_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_bin_req))
    assert any("missing_score_bucket" in warning for warning in missing_bin_summary["summarization_warnings"])

    missing_count_req = build_request("A-B01", {"score_distribution": rows})
    missing_count_req.ai_summary_config = numeric_distribution_config()
    missing_count_req.ai_summary_config.count_column = "missing_student_count"
    missing_count_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_count_req))
    assert any("missing_student_count" in warning for warning in missing_count_summary["summarization_warnings"])

    assert set(SUMMARY_METHODS) == {"task_aware_data_summarization", "baseline_first_20_rows"}

    print("debug_ai_summary numeric_distribution self-test passed")


def run_self_test_group_comparison() -> None:
    os.environ["AI_SUMMARY_METHOD"] = "task_aware_data_summarization"
    rows = sample_task_datasets("A-G08")["background_group_profile"]

    generic_req = build_request("A-G08", {"background_group_profile": rows})
    generic_req.ai_summary_config = None
    generic_summary = json.loads(BaseExplanationStrategy.summarize_datasets(generic_req))
    assert generic_summary["summary_type"] == "generic_fallback"

    group_req = build_request("A-G08", {"background_group_profile": rows})
    group_req.ai_summary_config = group_comparison_config()
    group_summary = json.loads(BaseExplanationStrategy.summarize_datasets(group_req))
    assert group_summary["summary_type"] == "group_comparison"
    assert group_summary["dataset_name"] == "background_group_profile"
    assert group_summary["group_column"] == "group_value"
    assert group_summary["metric_column"] == "avg_score"
    assert group_summary["count_column"] == "student_count"
    assert group_summary["gap_column"] == "score_vs_cohort"
    assert group_summary["causal_claim_allowed"] is False
    assert group_summary["fairness_warnings"]
    assert any("descriptive only" in warning for warning in group_summary["fairness_warnings"])
    assert any("descriptive only" in warning for warning in group_summary["summarization_warnings"])

    by_group = {item["group"]: item for item in group_summary["group_metrics"]}
    assert by_group["medium_band"]["student_count"] == 120.0
    assert by_group["low_band"]["avg_score"] == 55.0
    assert by_group["low_band"]["score_vs_cohort"] == -10.5
    assert by_group["high_band"]["secondary_metrics"]["avg_engagement_score"] == 0.72

    assert group_summary["dominant_group"] == {
        "group": "medium_band",
        "student_count": 120.0,
        "basis": "largest_count",
    }
    assert group_summary["weakest_group"]["group"] == "low_band"
    assert group_summary["weakest_group"]["basis"] == "most_negative_gap"
    assert group_summary["weakest_group"]["gap"] == -10.5
    assert any(item["group"] == "tiny_band" for item in group_summary["low_count_warnings"])
    assert any(item["group"] == "missing_expected" and item["kind"] == "expected_group" for item in group_summary["missing_groups"])
    assert any(item["group"] == "missing_comparison" and item["kind"] == "comparison_group" for item in group_summary["missing_groups"])
    assert len(group_summary["gaps"]) == 3
    assert [item["group"] for item in group_summary["gaps"][:2]] == ["low_band", "medium_band"]

    derived_rows = [
        {"group_value": "group_a", "student_count": "10", "avg_score": "50"},
        {"group_value": "group_b", "student_count": "30", "avg_score": "70"},
    ]
    derived_req = build_request("A-G08", {"background_group_profile": derived_rows})
    derived_req.ai_summary_config = group_comparison_config(gap_column=None, expected_groups=["group_a", "group_b"])
    derived_summary = json.loads(BaseExplanationStrategy.summarize_datasets(derived_req))
    assert derived_summary["summary_type"] == "group_comparison"
    derived_by_group = {item["group"]: item for item in derived_summary["group_metrics"]}
    assert derived_by_group["group_a"]["gap"] == -15.0
    assert derived_by_group["group_a"]["gap_basis"] == "derived_from_weighted_cohort_mean"
    assert derived_summary["weakest_group"]["basis"] == "most_negative_gap"
    assert any("derived" in warning for warning in derived_summary["summarization_warnings"])

    composite_rows = [
        {
            "group_value": "GP",
            "final_outcome": "Fail",
            "student_count": "32",
            "pct_within_group": "7.6",
        },
        {
            "group_value": "GP",
            "final_outcome": "Pass",
            "student_count": "391",
            "pct_within_group": "92.4",
        },
        {
            "group_value": "MS",
            "final_outcome": "Fail",
            "student_count": "68",
            "pct_within_group": "30.1",
        },
        {
            "group_value": "MS",
            "final_outcome": "Pass",
            "student_count": "158",
            "pct_within_group": "69.9",
        },
    ]
    composite_req = build_request("A-G12", {"outcome_by_group": composite_rows})
    composite_req.ai_summary_config = group_comparison_config(
        gap_column=None,
        group_key_columns=["group_value", "final_outcome"],
        series_column="final_outcome",
        focus_categories=["Fail", "Withdrawn"],
        metric_column="pct_within_group",
        metric_columns=[],
    )
    composite_summary = json.loads(
        BaseExplanationStrategy.summarize_datasets(composite_req)
    )
    assert composite_summary["composite_group_keys"] is True
    assert composite_summary["group_key_columns"] == ["group_value", "final_outcome"]
    assert composite_summary["series_column"] == "final_outcome"
    assert composite_summary["group_metrics"][0]["group_key_values"] == {
        "group_value": "GP",
        "final_outcome": "Fail",
    }
    assert composite_summary["group_series"][0]["group"] == "GP"
    focus_by_group = {
        item["group"]: item for item in composite_summary["focus_summary"]
    }
    assert focus_by_group["MS"]["focus_metric_total"] == 30.1
    assert focus_by_group["MS"]["focus_count_total"] == 68.0

    missing_group_req = build_request("A-G08", {"background_group_profile": rows})
    missing_group_req.ai_summary_config = group_comparison_config()
    missing_group_req.ai_summary_config.group_column = "missing_group_value"
    missing_group_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_group_req))
    assert any("missing_group_value" in warning for warning in missing_group_summary["summarization_warnings"])

    missing_metric_req = build_request("A-G08", {"background_group_profile": rows})
    missing_metric_req.ai_summary_config = group_comparison_config()
    missing_metric_req.ai_summary_config.metric_column = "missing_avg_score"
    missing_metric_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_metric_req))
    assert any("missing_avg_score" in warning for warning in missing_metric_summary["summarization_warnings"])

    missing_count_req = build_request("A-G08", {"background_group_profile": rows})
    missing_count_req.ai_summary_config = group_comparison_config()
    missing_count_req.ai_summary_config.count_column = "missing_student_count"
    missing_count_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_count_req))
    assert any("missing_student_count" in warning for warning in missing_count_summary["summarization_warnings"])

    assert set(SUMMARY_METHODS) == {"task_aware_data_summarization", "baseline_first_20_rows"}

    print("debug_ai_summary group_comparison self-test passed")


def run_self_test_correlation_evidence() -> None:
    os.environ["AI_SUMMARY_METHOD"] = "task_aware_data_summarization"
    rows = sample_task_datasets("A-G02")["engagement_performance_scatter"]

    generic_req = build_request("A-G02", {"engagement_performance_scatter": rows})
    generic_req.ai_summary_config = None
    generic_summary = json.loads(BaseExplanationStrategy.summarize_datasets(generic_req))
    assert generic_summary["summary_type"] == "generic_fallback"

    correlation_req = build_request("A-G02", {"engagement_performance_scatter": rows})
    correlation_req.ai_summary_config = correlation_evidence_config()
    correlation_summary = json.loads(BaseExplanationStrategy.summarize_datasets(correlation_req))
    assert correlation_summary["summary_type"] == "correlation_evidence"
    assert correlation_summary["dataset_name"] == "engagement_performance_scatter"
    assert correlation_summary["x_column"] == "engagement_score"
    assert correlation_summary["y_column"] == "avg_score"
    assert correlation_summary["entity_column"] == "student_id"
    assert correlation_summary["coefficient_method"] == "pearson"
    assert correlation_summary["coefficient_source"] == "derived_from_pairs"
    assert correlation_summary["sample_size"] == 7
    assert correlation_summary["coefficient"] is not None
    assert correlation_summary["direction"] == "positive"
    assert correlation_summary["strength_claim_allowed"] is True
    assert correlation_summary["significance_claim_allowed"] is False
    assert correlation_summary["causal_claim_allowed"] is False
    assert correlation_summary["p_value"] is None
    assert any("invalid engagement_score" in warning for warning in correlation_summary["parse_warnings"])
    assert any("invalid avg_score" in warning for warning in correlation_summary["parse_warnings"])
    assert any("No p-value evidence" in warning for warning in correlation_summary["statistical_warnings"])
    assert len(correlation_summary["outliers"]) == 1
    assert correlation_summary["outliers"][0]["student_id"] == "S007"
    assert correlation_summary["outliers"][0]["final_outcome"] == "Fail"

    explicit_rows = [
        {
            **row,
            "correlation": "0.88",
            "sample_size": "100",
            "p_value": "0.012",
        }
        for row in rows
    ]
    explicit_req = build_request("A-G02", {"engagement_performance_scatter": explicit_rows})
    explicit_req.ai_summary_config = correlation_evidence_config(
        coefficient_column="correlation",
        sample_size_column="sample_size",
        p_value_column="p_value",
    )
    explicit_summary = json.loads(BaseExplanationStrategy.summarize_datasets(explicit_req))
    assert explicit_summary["coefficient"] == 0.88
    assert explicit_summary["coefficient_source"] == "explicit_column"
    assert explicit_summary["sample_size"] == 100.0
    assert explicit_summary["p_value"] == 0.012
    assert explicit_summary["strength"] == "strong"
    assert explicit_summary["strength_claim_allowed"] is True
    assert explicit_summary["significance_claim_allowed"] is True
    assert explicit_summary["causal_claim_allowed"] is False

    no_p_value_req = build_request("A-G02", {"engagement_performance_scatter": explicit_rows})
    no_p_value_req.ai_summary_config = correlation_evidence_config(coefficient_column="correlation")
    no_p_value_summary = json.loads(BaseExplanationStrategy.summarize_datasets(no_p_value_req))
    assert no_p_value_summary["p_value"] is None
    assert no_p_value_summary["significance_claim_allowed"] is False

    small_req = build_request("A-G02", {"engagement_performance_scatter": rows[:5]})
    small_req.ai_summary_config = correlation_evidence_config(minimum_sample_size=10, top_k=2)
    small_summary = json.loads(BaseExplanationStrategy.summarize_datasets(small_req))
    assert small_summary["coefficient"] is None
    assert small_summary["coefficient_source"] == "unavailable"
    assert small_summary["strength_claim_allowed"] is False
    assert any("below minimum_sample_size" in warning for warning in small_summary["statistical_warnings"])

    descriptive_outlier_rows = [
        {"student_id": "S101", "engagement_score": "0.1", "avg_score": "30", "final_outcome": "Fail"},
        {"student_id": "S102", "engagement_score": "0.2", "avg_score": "40", "final_outcome": "Fail"},
        {"student_id": "S103", "engagement_score": "0.9", "avg_score": "20", "final_outcome": "Fail"},
    ]
    descriptive_req = build_request("A-G02", {"engagement_performance_scatter": descriptive_outlier_rows})
    descriptive_req.ai_summary_config = correlation_evidence_config(minimum_sample_size=10)
    descriptive_summary = json.loads(BaseExplanationStrategy.summarize_datasets(descriptive_req))
    assert descriptive_summary["coefficient"] is None
    assert descriptive_summary["outliers"]
    assert any("below minimum_sample_size" in warning for warning in descriptive_summary["statistical_warnings"])

    zero_variance_req = build_request("A-G02", {
        "engagement_performance_scatter": [
            {"student_id": "S001", "engagement_score": "1", "avg_score": "40"},
            {"student_id": "S002", "engagement_score": "1", "avg_score": "50"},
            {"student_id": "S003", "engagement_score": "1", "avg_score": "60"},
            {"student_id": "S004", "engagement_score": "1", "avg_score": "70"},
            {"student_id": "S005", "engagement_score": "1", "avg_score": "80"},
            {"student_id": "S006", "engagement_score": "1", "avg_score": "90"},
        ]
    })
    zero_variance_req.ai_summary_config = correlation_evidence_config()
    zero_variance_summary = json.loads(BaseExplanationStrategy.summarize_datasets(zero_variance_req))
    assert zero_variance_summary["coefficient"] is None
    assert any("zero variance" in warning for warning in zero_variance_summary["statistical_warnings"])

    missing_x_req = build_request("A-G02", {"engagement_performance_scatter": rows})
    missing_x_req.ai_summary_config = correlation_evidence_config()
    missing_x_req.ai_summary_config.x_column = "missing_engagement_score"
    missing_x_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_x_req))
    assert any("missing_engagement_score" in warning for warning in missing_x_summary["summarization_warnings"])
    assert "generic_diagnostic_sample" in missing_x_summary

    unknown_policy_req = build_request("A-G02", {"engagement_performance_scatter": rows})
    unknown_policy_req.ai_summary_config = correlation_evidence_config(outlier_policy="unknown_policy")
    unknown_policy_summary = json.loads(BaseExplanationStrategy.summarize_datasets(unknown_policy_req))
    assert unknown_policy_summary["outliers"] == []
    assert any("Unknown outlier policy" in warning for warning in unknown_policy_summary["statistical_warnings"])

    selected_rows = [
        {
            "student_id": "S001",
            "lifestyle_risk_score": "0.8",
            "avg_score": "40",
            "is_current_student": True,
            "point_role": "Selected student",
            "score_percentile": "12.5",
            "family_relation": "4",
        },
        {
            "student_id": "S002",
            "lifestyle_risk_score": "0.2",
            "avg_score": "70",
            "is_current_student": False,
            "point_role": "Classmate",
            "score_percentile": "80",
            "family_relation": "5",
        },
        {
            "student_id": "S003",
            "lifestyle_risk_score": "0.5",
            "avg_score": "55",
            "is_current_student": False,
            "point_role": "Classmate",
            "score_percentile": "50",
            "family_relation": "3",
        },
        {
            "student_id": "S004",
            "lifestyle_risk_score": "0.7",
            "avg_score": "45",
            "is_current_student": False,
            "point_role": "Classmate",
            "score_percentile": "20",
            "family_relation": "2",
        },
        {
            "student_id": "S005",
            "lifestyle_risk_score": "0.1",
            "avg_score": "85",
            "is_current_student": False,
            "point_role": "Classmate",
            "score_percentile": "95",
            "family_relation": "5",
        },
        {
            "student_id": "S006",
            "lifestyle_risk_score": "0.9",
            "avg_score": "35",
            "is_current_student": False,
            "point_role": "Classmate",
            "score_percentile": "5",
            "family_relation": "1",
        },
    ]
    selected_req = build_request("S-T09", {"lifestyle_risk_scatter": selected_rows})
    selected_req.ai_summary_config = correlation_evidence_config(
        selected_entity_column="is_current_student",
        label_columns=["point_role"],
        sensitive_columns=["family_relation"],
        sensitive_context_policy="descriptive_only",
    )
    selected_req.ai_summary_config.x_column = "lifestyle_risk_score"
    selected_summary = json.loads(
        BaseExplanationStrategy.summarize_datasets(selected_req)
    )
    assert selected_summary["selected_entity_column"] == "is_current_student"
    assert selected_summary["selected_entity_count"] == 1
    selected_item = selected_summary["selected_entity_evidence"][0]
    assert selected_item["student_id"] == "S001"
    assert selected_item["lifestyle_risk_score"] == 0.8
    assert selected_item["avg_score"] == 40.0
    assert selected_item["label_context"]["point_role"] == "Selected student"
    assert selected_item["percentile_context"]["score_percentile"] == "12.5"
    assert selected_item["sensitive_context"]["family_relation"] == "4"
    assert selected_item["cohort_context"]["coefficient_source"] == "derived_from_pairs"

    assert set(SUMMARY_METHODS) == {"task_aware_data_summarization", "baseline_first_20_rows"}

    print("debug_ai_summary correlation_evidence self-test passed")


def run_self_test_multi_metric_comparison() -> None:
    os.environ["AI_SUMMARY_METHOD"] = "task_aware_data_summarization"

    wide_rows = [
        {
            "student_id": "S002",
            "avg_score": "72",
            "engagement_score": "0.65",
            "active_days": "18",
            "risk_label": "low",
            "flag_low_score": 0,
            "is_selected": False,
        },
        {
            "student_id": "S001",
            "avg_score": "58",
            "engagement_score": "0.40",
            "active_days": None,
            "risk_label": "medium",
            "flag_low_score": 1,
            "is_selected": True,
        },
    ]
    wide_req = build_request("A-C03", {"risk_comparison": wide_rows})
    wide_req.ai_summary_config = multi_metric_comparison_config()
    wide_summary = json.loads(BaseExplanationStrategy.summarize_datasets(wide_req))
    assert wide_summary["summary_type"] == "multi_metric_comparison"
    assert wide_summary["validation_metadata"]["status"] == "passed"
    assert wide_summary["entities"] == ["S001", "S002"]
    assert wide_summary["comparison_matrix"][0]["metrics"]["avg_score"] == 58.0
    assert wide_summary["comparison_matrix"][0]["metrics"]["active_days"] is None
    assert wide_summary["comparison_matrix"][0]["flags"]["flag_low_score"] is True
    assert wide_summary["selected_entity_evidence"][0]["student_id"] == "S001"
    assert wide_summary["metric_extrema"]["avg_score"]["max"]["student_id"] == "S002"
    assert any(
        item["metric"] == "avg_score" and item["gap_right_minus_left"] == 14.0
        for item in wide_summary["pairwise_gaps"]
    )
    assert any(
        item["entity"] == "S001" and item["metric"] == "active_days"
        for item in wide_summary["missing_metric_evidence"]
    )

    long_rows = [
        {"comparison_group": "You", "metric_name": "Average score", "metric_value": "62"},
        {"comparison_group": "Cohort", "metric_name": "Average score", "metric_value": "68"},
        {"comparison_group": "You", "metric_name": "Score percentile", "metric_value": "45"},
        {"comparison_group": "Cohort", "metric_name": "Score percentile", "metric_value": "50"},
    ]
    long_req = build_request("S-T03", {"peer_comparison": long_rows})
    long_req.ai_summary_config = multi_metric_comparison_config(
        entity_column=None,
        group_column="comparison_group",
        metric_columns=[],
        metric_key_column="metric_name",
        metric_value_column="metric_value",
        entity_order=["You", "Cohort"],
        metric_units={
            "Average score": "score_0_100",
            "Score percentile": "percent_0_100",
        },
        metric_directions={
            "Average score": "higher_is_better",
            "Score percentile": "higher_is_better",
        },
        label_columns=[],
        flag_columns=[],
        selected_entity_column=None,
    )
    long_summary = json.loads(BaseExplanationStrategy.summarize_datasets(long_req))
    assert long_summary["validation_metadata"]["status"] == "passed"
    assert long_summary["metric_keys"] == ["Average score", "Score percentile"]
    assert long_summary["comparison_matrix"][0]["metrics"]["Average score"] == 62.0
    assert long_summary["pairwise_gaps"][0]["gap_right_minus_left"] == 6.0

    hybrid_rows = [
        {"student_id": "S001", "resource_type": "forum", "clicks": "10", "ratio": "0.2"},
        {"student_id": "S002", "resource_type": "forum", "clicks": "5", "ratio": "0.1"},
        {"student_id": "S001", "resource_type": "quiz", "clicks": "20", "ratio": "0.4"},
        {"student_id": "S002", "resource_type": "quiz", "clicks": "30", "ratio": "0.6"},
    ]
    hybrid_req = build_request("A-C06", {"resource_comparison": hybrid_rows})
    hybrid_req.ai_summary_config = multi_metric_comparison_config(
        metric_key_column="resource_type",
        metric_columns=["clicks", "ratio"],
        metric_units={"clicks": "count", "ratio": "ratio_0_1"},
        metric_directions={"clicks": "context_only", "ratio": "context_only"},
        label_columns=[],
        flag_columns=[],
        selected_entity_column=None,
    )
    hybrid_summary = json.loads(BaseExplanationStrategy.summarize_datasets(hybrid_req))
    assert hybrid_summary["validation_metadata"]["status"] == "passed"
    assert hybrid_summary["evidence_status"] == "sufficient"
    assert hybrid_summary["comparison_matrix"][0]["metrics"]["forum"]["clicks"] == 10.0
    assert hybrid_summary["metric_extrema"]["quiz.clicks"]["max"]["student_id"] == "S002"

    one_entity_req = build_request(
        "A-C06",
        {"resource_comparison": [hybrid_rows[0], hybrid_rows[2]]},
    )
    one_entity_req.ai_summary_config = hybrid_req.ai_summary_config
    one_entity_summary = json.loads(
        BaseExplanationStrategy.summarize_datasets(one_entity_req)
    )
    assert one_entity_summary["validation_metadata"]["status"] == "passed"
    assert one_entity_summary["evidence_status"] == "insufficient_evidence"
    assert one_entity_summary["evidence_requirements"] == {
        "minimum_entity_count": 2,
        "expected_entities": ["S001", "S002"],
        "observed_entity_count": 1,
        "missing_expected_entities": ["S002"],
    }
    assert one_entity_summary["missing_expected_entities"] == ["S002"]
    assert any(
        "Configured expected entities/groups are missing from dataset: S002"
        in warning
        for warning in one_entity_summary["summarization_warnings"]
    )
    assert "generic_diagnostic_sample" not in one_entity_summary

    zero_activity_rows = [
        *hybrid_rows[:2],
        {
            "student_id": "S003",
            "resource_type": None,
            "clicks": 0,
            "ratio": None,
            "has_engagement_data": False,
            "total_clicks": 0,
            "used_resource_types": 0,
            "evidence_row_type": "no_recorded_resource_usage",
        },
    ]
    zero_activity_req = build_request(
        "A-C06",
        {"resource_comparison": zero_activity_rows},
    )
    zero_activity_req.ai_summary_config = multi_metric_comparison_config(
        metric_key_column="resource_type",
        metric_columns=["clicks", "ratio"],
        metric_units={"clicks": "count", "ratio": "ratio_0_1"},
        metric_directions={"clicks": "context_only", "ratio": "context_only"},
        label_columns=[
            "has_engagement_data",
            "total_clicks",
            "used_resource_types",
            "evidence_row_type",
        ],
        flag_columns=[],
        selected_entity_column=None,
        entity_evidence_available_column="has_engagement_data",
    )
    zero_activity_summary = json.loads(
        BaseExplanationStrategy.summarize_datasets(zero_activity_req)
    )
    assert zero_activity_summary["evidence_status"] == "sufficient"
    zero_entity = next(
        item
        for item in zero_activity_summary["comparison_matrix"]
        if item["student_id"] == "S003"
    )
    assert zero_entity["metrics"] == {}
    assert zero_entity["labels"]["has_engagement_data"] is False
    assert zero_entity["labels"]["evidence_row_type"] == "no_recorded_resource_usage"
    assert zero_activity_summary["missing_entity_evidence"] == [
        {
            "entity": "S003",
            "reason": "entity has no recorded source evidence for metric comparison",
            "evidence_column": "has_engagement_data",
            "evidence_value": False,
            "labels": {
                "has_engagement_data": False,
                "total_clicks": 0,
                "used_resource_types": 0,
                "evidence_row_type": "no_recorded_resource_usage",
            },
        }
    ]
    assert not any(
        item["entity"] == "S003"
        for item in zero_activity_summary["missing_metric_evidence"]
    )

    missing_metadata_req = build_request("A-C03", {"risk_comparison": wide_rows})
    missing_metadata_req.ai_summary_config = multi_metric_comparison_config(
        metric_units={"avg_score": "score_0_100"}
    )
    missing_metadata_summary = json.loads(
        BaseExplanationStrategy.summarize_datasets(missing_metadata_req)
    )
    assert missing_metadata_summary["validation_metadata"]["status"] == "failed"
    assert "generic_diagnostic_sample" in missing_metadata_summary
    assert any(
        "metric_units missing" in warning
        for warning in missing_metadata_summary["summarization_warnings"]
    )

    sensitive_req = build_request("A-C05", {"background_comparison": wide_rows})
    sensitive_req.ai_summary_config = multi_metric_comparison_config(
        require_sensitive_context_policy=True,
        sensitive_context_policy=None,
    )
    sensitive_summary = json.loads(BaseExplanationStrategy.summarize_datasets(sensitive_req))
    assert sensitive_summary["validation_metadata"]["status"] == "failed"
    assert any(
        "sensitive_context_policy missing" in warning
        for warning in sensitive_summary["summarization_warnings"]
    )

    assert set(SUMMARY_METHODS) == {
        "task_aware_data_summarization",
        "baseline_first_20_rows",
    }
    print("debug_ai_summary multi_metric_comparison self-test passed")


def run_self_test_metric_snapshot() -> None:
    os.environ["AI_SUMMARY_METHOD"] = "task_aware_data_summarization"

    performance_req = build_request(
        "S-B01",
        {
            "performance_summary": [{
                "avg_score": 41.25,
                "pass_rate": 0.6667,
                "performance_band": "passing_but_below_target",
                "pass_threshold": 40,
                "target_threshold": 70,
                "class_avg_score": 58.31,
                "score_scale": 100,
            }]
        },
    )
    performance_req.ai_summary_config = AISummaryConfig(
        summary_type="metric_snapshot",
        metric_columns=["avg_score", "pass_rate"],
        status_columns=["performance_band"],
        threshold_columns=["pass_threshold", "target_threshold"],
        benchmark_columns=["class_avg_score"],
        label_columns=["score_scale"],
        metric_units={
            "avg_score": "score_on_runtime_scale",
            "pass_rate": "ratio_0_1",
            "pass_threshold": "score_on_runtime_scale",
            "target_threshold": "score_on_runtime_scale",
            "class_avg_score": "score_on_runtime_scale",
        },
        threshold_sources={
            "pass_threshold": "runtime_score_context",
            "target_threshold": "runtime_score_context",
        },
        benchmark_sources={"class_avg_score": "class_cohort"},
        require_metric_units=True,
    )
    performance_summary = json.loads(
        BaseExplanationStrategy.summarize_datasets(performance_req)
    )
    assert performance_summary["summary_type"] == "metric_snapshot"
    assert performance_summary["validation_metadata"]["status"] == "passed"
    assert performance_summary["evidence_status"] == "sufficient"
    assert performance_summary["metric_snapshot"]["avg_score"]["value"] == 41.25
    assert performance_summary["status_evidence"]["performance_band"] == (
        "passing_but_below_target"
    )
    assert performance_summary["threshold_evidence"]["pass_threshold"] == {
        "value": 40,
        "unit": "score_on_runtime_scale",
        "source": "runtime_score_context",
    }
    assert performance_summary["benchmark_evidence"]["class_avg_score"] == {
        "value": 58.31,
        "unit": "score_on_runtime_scale",
        "source": "class_cohort",
    }

    unavailable_req = build_request(
        "S-B02",
        {
            "risk_summary": [{
                "avg_score": 41.25,
                "engagement_score": 0,
                "engagement_score_available": False,
                "at_risk_label": "low",
            }]
        },
    )
    unavailable_req.ai_summary_config = AISummaryConfig(
        summary_type="metric_snapshot",
        metric_columns=["avg_score", "engagement_score"],
        status_columns=["engagement_score_available", "at_risk_label"],
        metric_availability_columns={
            "engagement_score": "engagement_score_available"
        },
        metric_units={
            "avg_score": "score_on_runtime_scale",
            "engagement_score": "ratio_0_1",
        },
        require_metric_units=True,
    )
    unavailable_summary = json.loads(
        BaseExplanationStrategy.summarize_datasets(unavailable_req)
    )
    engagement = unavailable_summary["metric_snapshot"]["engagement_score"]
    assert engagement["value"] == 0
    assert engagement["available"] is False
    assert any(
        item["column"] == "engagement_score"
        and "unavailable" in item["reason"]
        for item in unavailable_summary["missing_evidence"]
    )
    assert unavailable_summary["evidence_status"] == "sufficient"

    sensitive_req = build_request(
        "A-S07",
        {
            "background_context": [{
                "support_score": 0.25,
                "highest_education": None,
                "gender": "F",
            }]
        },
    )
    sensitive_req.ai_summary_config = AISummaryConfig(
        summary_type="metric_snapshot",
        metric_columns=["support_score"],
        sensitive_columns=["highest_education", "gender", "support_score"],
        metric_units={"support_score": "ratio_0_1"},
        require_metric_units=True,
        sensitive_context_policy=(
            "descriptive_context_only_no_causal_or_prescriptive_inference"
        ),
        require_sensitive_context_policy=True,
    )
    sensitive_summary = json.loads(
        BaseExplanationStrategy.summarize_datasets(sensitive_req)
    )
    assert sensitive_summary["sensitive_context_present"] is True
    assert sensitive_summary["sensitive_context"]["highest_education"] is None
    assert any(
        item["column"] == "highest_education"
        for item in sensitive_summary["missing_evidence"]
    )

    invalid_req = build_request(
        "S-B01",
        {"performance_summary": [{"avg_score": 50}, {"avg_score": 60}]},
    )
    invalid_req.ai_summary_config = AISummaryConfig(
        summary_type="metric_snapshot",
        metric_columns=["avg_score"],
    )
    invalid_summary = json.loads(
        BaseExplanationStrategy.summarize_datasets(invalid_req)
    )
    assert invalid_summary["summary_type"] == "metric_snapshot"
    assert invalid_summary["validation_metadata"]["status"] == "failed"
    assert invalid_summary["evidence_status"] == "not_evaluated"
    assert "generic_diagnostic_sample" not in invalid_summary

    missing_config_req = build_request(
        "S-B01",
        {"performance_summary": [{"avg_score": 50}]},
    )
    missing_config_req.ai_summary_config = AISummaryConfig(
        summary_type="metric_snapshot",
        metric_columns=[],
    )
    missing_config_summary = json.loads(
        BaseExplanationStrategy.summarize_datasets(missing_config_req)
    )
    assert missing_config_summary["summary_type"] == "metric_snapshot"
    assert missing_config_summary["validation_metadata"]["status"] == "failed"
    assert "generic_diagnostic_sample" not in missing_config_summary

    print("debug_ai_summary metric_snapshot self-test passed")


def run_self_test_action_synthesis() -> None:
    os.environ["AI_SUMMARY_METHOD"] = "task_aware_data_summarization"

    admin_req = build_request(
        "A-G16",
        {
            "synthesis_data": [{
                "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
                "low_engagement_count": 1240,
                "high_risk_count": 906,
                "hardest_assessment": "24299",
                "best_resource_type": "quiz",
                "total_students": 1998,
            }]
        },
    )
    admin_req.ai_summary_config = action_synthesis_config("A-G16")
    admin_summary = BaseExplanationStrategy._build_task_aware_summary(admin_req)
    assert admin_summary["summary_type"] == "action_synthesis"
    assert [item["action_id"] for item in admin_summary["prioritized_actions"]] == [
        "admin_launch_engagement_outreach",
        "admin_review_high_risk_caseload",
        "admin_review_assessment_support",
        "admin_review_most_used_resource_format",
    ]
    assert all(
        item["provenance_status"] == "complete"
        for item in admin_summary["prioritized_actions"]
    )
    assert len(admin_summary["action_evidence_links"]) == 4
    derived = next(
        item for item in admin_summary["evidence_items"]
        if item["column"] == "high_risk_rate"
    )
    assert derived["parsed_value"] == round(906 / 1998, 10)
    assert len(derived["source_evidence_item_ids"]) == 2

    staff_req = build_request(
        "A-S08",
        {
            "synthesis_data": [{
                "avg_score": 91.2,
                "performance_trend": -0.7187500000000001,
                "engagement_score": 0.20237855036820618,
                "punctuality_rate": "0",
                "early_warning_week": 0,
                "support_score": 0,
                "at_risk_score": 3,
                "at_risk_label": "high",
                "final_outcome": "Distinction",
            }]
        },
    )
    staff_req.ai_summary_config = action_synthesis_config("A-S08")
    staff_summary = BaseExplanationStrategy._build_task_aware_summary(staff_req)
    assert [item["action_id"] for item in staff_summary["prioritized_actions"]] == [
        "staff_review_student_risk_profile",
        "staff_create_submission_support_plan",
        "staff_review_recent_assessment_pattern",
    ]
    punctuality = next(
        item for item in staff_summary["evidence_items"]
        if item["column"] == "punctuality_rate"
    )
    assert punctuality["raw_value"] == "0"
    assert punctuality["parsed_value"] == 0.0
    assert staff_summary["conflicting_evidence"][0]["conflict_id"] == "A-S08-C01"
    assert not any(
        "support_score" in evidence_id
        for item in staff_summary["prioritized_actions"]
        for evidence_id in item["evidence_item_ids"]
    )

    unavailable_req = build_request(
        "S-T13",
        {
            "synthesis_data": [{
                "avg_score": 41.25,
                "performance_trend": 27.5,
                "engagement_score": 0,
                "engagement_score_available": False,
                "absence_rate": 1,
                "lifestyle_risk_score": 0.375,
                "score_strategy": "weighted_by_assessment_weight",
                "score_scale": 100,
                "pass_threshold": 40,
                "target_threshold": 70,
                "at_risk_score": 0,
                "at_risk_label": "low",
            }]
        },
    )
    unavailable_req.ai_summary_config = action_synthesis_config("S-T13")
    unavailable_summary = BaseExplanationStrategy._build_task_aware_summary(
        unavailable_req
    )
    assert [item["action_id"] for item in unavailable_summary["prioritized_actions"]] == [
        "student_create_attendance_routine",
        "student_set_next_score_target",
    ]
    assert "student_rebuild_engagement_routine" not in {
        item["action_id"] for item in unavailable_summary["prioritized_actions"]
    }
    engagement = next(
        item for item in unavailable_summary["evidence_items"]
        if item["column"] == "engagement_score"
    )
    assert engagement["raw_value"] == 0
    assert engagement["available"] is False
    engagement_rule = next(
        item for item in unavailable_summary["rule_evaluations"]
        if item["rule_id"] == "S-T13-R04"
    )
    assert engagement_rule["matched"] is False
    assert engagement_rule["blocked_by_unavailable_evidence"] is True

    conflict_req = build_request(
        "S-T13",
        {
            "synthesis_data": [{
                "avg_score": 94.34,
                "performance_trend": -0.7187500000000001,
                "engagement_score": 0.20237855036820618,
                "engagement_score_available": True,
                "absence_rate": None,
                "lifestyle_risk_score": None,
                "score_strategy": "weighted_by_assessment_weight",
                "score_scale": 100,
                "pass_threshold": 40,
                "target_threshold": 70,
                "at_risk_score": 3,
                "at_risk_label": "high",
            }]
        },
    )
    conflict_req.ai_summary_config = action_synthesis_config("S-T13")
    conflict_summary = BaseExplanationStrategy._build_task_aware_summary(
        conflict_req
    )
    assert [item["action_id"] for item in conflict_summary["prioritized_actions"]] == [
        "student_request_advisor_check_in",
        "student_review_recent_assessment_feedback",
    ]
    assert conflict_summary["conflicting_evidence"][0]["conflict_id"] == "S-T13-C01"
    assert any(
        item["evidence_id"] == "absence_rate"
        and item["reason"] == "evidence value is null"
        for item in conflict_summary["missing_evidence"]
    )

    unsupported_req = build_request(
        "S-T13",
        {"synthesis_data": [{"avg_score": 50}]},
    )
    unsupported_req.ai_summary_config = AISummaryConfig(
        summary_type="action_synthesis",
        unsupported_action_behavior="emit_unsupported_actions",
    )
    unsupported_summary = BaseExplanationStrategy._build_task_aware_summary(
        unsupported_req
    )
    assert unsupported_summary["prioritized_actions"] == []
    assert unsupported_summary["unsupported_actions"][0]["reason"] == (
        "missing_action_source"
    )
    assert "generic_diagnostic_sample" not in unsupported_summary

    capped_req = build_request("A-G16", admin_req.datasets)
    capped_req.ai_summary_config = action_synthesis_config("A-G16", max_actions=2)
    capped_summary = BaseExplanationStrategy._build_task_aware_summary(capped_req)
    assert len(capped_summary["prioritized_actions"]) == 2
    assert any(
        "capped at 2" in warning
        for warning in capped_summary["summarization_warnings"]
    )

    duplicate_rules = [
        rule.model_dump(mode="json")
        for rule in admin_req.ai_summary_config.action_rules
    ]
    duplicate_rule = dict(duplicate_rules[0])
    duplicate_rule["rule_id"] = "A-G16-R01-DUPLICATE-ACTION"
    duplicate_rules.append(duplicate_rule)
    dedupe_req = build_request("A-G16", admin_req.datasets)
    dedupe_req.ai_summary_config = action_synthesis_config(
        "A-G16",
        action_rules=duplicate_rules,
    )
    dedupe_summary = BaseExplanationStrategy._build_task_aware_summary(dedupe_req)
    deduped_action = next(
        item for item in dedupe_summary["prioritized_actions"]
        if item["action_id"] == "admin_review_high_risk_caseload"
    )
    assert deduped_action["rule_ids"] == [
        "A-G16-R01",
        "A-G16-R01-DUPLICATE-ACTION",
    ]
    assert len([
        item for item in dedupe_summary["prioritized_actions"]
        if item["action_id"] == "admin_review_high_risk_caseload"
    ]) == 1

    candidate_req = build_request(
        "A-G16",
        {
            "candidate_actions": [{
                "recommended_action": "Review the next deadline.",
                "trigger_signal": "late_submission",
            }]
        },
    )
    candidate_req.ai_summary_config = AISummaryConfig(
        summary_type="action_synthesis",
        evidence_columns=["trigger_signal"],
        evidence_dataset_roles={"candidate_actions": "primary_evidence"},
        action_source="candidate_action_columns",
        action_columns=["recommended_action"],
        trigger_columns=["trigger_signal"],
        max_actions=2,
        require_complete_action_provenance=False,
        unsupported_action_behavior="emit_unsupported_actions",
    )
    candidate_summary = BaseExplanationStrategy._build_task_aware_summary(
        candidate_req
    )
    assert candidate_summary["prioritized_actions"][0]["priority"] is None
    assert candidate_summary["prioritized_actions"][0]["owner"] == "unspecified"

    compact_text = BaseExplanationStrategy._dump_summary(admin_summary, char_limit=700)
    compact = json.loads(compact_text)
    for key in (
        "source_datasets",
        "evidence_items",
        "prioritized_actions",
        "action_evidence_links",
        "unsupported_actions",
        "conflicting_evidence",
        "missing_evidence",
    ):
        assert key in compact
    linked_ids = {
        evidence_id
        for link in compact["action_evidence_links"]
        for evidence_id in link["evidence_item_ids"]
    }
    compact_evidence_ids = {
        item["evidence_item_id"] for item in compact["evidence_items"]
    }
    assert linked_ids.issubset(compact_evidence_ids)

    system_prompt, user_prompt = (
        BaseExplanationStrategy._build_action_synthesis_llm_prompts(admin_req)
    )
    assert "prioritized_actions" in user_prompt
    assert "action_evidence_links" in user_prompt
    assert "claim_limits" in user_prompt
    assert "recommendations MUST be []" in system_prompt
    if admin_req.ai_prompt_hint:
        assert admin_req.ai_prompt_hint not in system_prompt
        assert admin_req.ai_prompt_hint not in user_prompt

    legacy_explanation = ExplanationBody(
        summary="Existing rule-generated rationale.",
        insights=[
            Insight(
                title="Rule-generated action",
                description="Only the supplied action is explained.",
                severity="medium",
            )
        ],
    )
    before_normalization = legacy_explanation.model_dump()
    BaseExplanationStrategy._normalize_task_aware_action_rationale(
        admin_req,
        legacy_explanation,
    )
    assert legacy_explanation.model_dump() == before_normalization

    assert set(SUMMARY_METHODS) == {
        "task_aware_data_summarization",
        "baseline_first_20_rows",
    }
    print("debug_ai_summary action_synthesis self-test passed")


def run_self_test_v3() -> None:
    previous = {
        key: os.environ.get(key)
        for key in (
            "AI_TASK_AWARE_VERSION",
            "AI_TASK_AWARE_TOP_K",
            "AI_TASK_AWARE_SOFT_TOKEN_RATIO",
            "AI_TASK_AWARE_MAX_TOKEN_RATIO",
            "AI_TASK_AWARE_MAX_EXTRA_TOKENS",
        )
    }
    try:
        os.environ["AI_TASK_AWARE_VERSION"] = "v3"
        os.environ["AI_TASK_AWARE_TOP_K"] = "15"
        os.environ["AI_TASK_AWARE_SOFT_TOKEN_RATIO"] = "1.2"
        os.environ["AI_TASK_AWARE_MAX_TOKEN_RATIO"] = "5.0"
        os.environ["AI_TASK_AWARE_MAX_EXTRA_TOKENS"] = "800"

        rows = [
            {"idx": index, "score": str(index), "group": "A" if index % 2 else "B"}
            for index in range(25)
        ]
        req = build_request("A-G14", {"generic": rows})
        req.ai_summary_config = None
        result = BaseExplanationStrategy.build_summary_result(
            req,
            method_override="task_aware_data_summarization",
            include_debug_payload=True,
        )
        repeated = BaseExplanationStrategy.build_summary_result(
            req,
            method_override="task_aware_data_summarization",
            include_debug_payload=True,
        )
        text = result["summary_text"]
        metadata = result["metadata"]
        debug = metadata["summary_debug_payload"]

        assert text == repeated["summary_text"]
        assert metadata["ai_summary_version"] == "v3-experimental"
        assert metadata["raw_row_limit"] == 15
        assert metadata["included_raw_row_count"] == 15
        assert metadata["full_result_row_count"] == 25
        assert text.index("RAW ROWS") < text.index("TASK-AWARE EVIDENCE")
        assert text.index("TASK-AWARE EVIDENCE") < text.index("LIMITATIONS")
        assert json.dumps(
            rows[:15], indent=2, ensure_ascii=False, default=str
        ) in text
        assert rows[15]["idx"] == 15 and '"idx": 15' not in text.split(
            "TASK-AWARE EVIDENCE", 1
        )[0]

        evidence_text = text.split(
            "TASK-AWARE EVIDENCE (derived from the full result; ordered by meaning):\n",
            1,
        )[1].split("\n\nLIMITATIONS:", 1)[0]
        evidence = json.loads(evidence_text)
        names = [section["name"] for section in evidence["sections"]]
        canonical = [
            "scope", "primary_finding", "comparison", "trend_relationship",
            "exceptions", "action_evidence", "limitations",
        ]
        assert names == sorted(names, key=canonical.index)

        multi_req = build_request(
            "A-G14",
            {
                "first": [{"idx": "first"}],
                "second": [{"idx": "second"}],
            },
        )
        multi_req.ai_summary_config = None
        multi_req.query_labels = ["second", "first"]
        multi_text = BaseExplanationStrategy.build_summary_result(
            multi_req,
            method_override="task_aware_data_summarization",
        )["summary_text"]
        assert multi_text.index("Dataset: second") < multi_text.index("Dataset: first")

        os.environ["AI_TASK_AWARE_TOP_K"] = "20"
        os.environ["AI_TASK_AWARE_MAX_TOKEN_RATIO"] = "1.01"
        os.environ["AI_TASK_AWARE_MAX_EXTRA_TOKENS"] = "0"
        guard_rows = sample_a_g14_rows() * 3
        guard_req = build_request(
            "A-G14",
            {"withdrawal_signal_trend": guard_rows},
        )
        guarded = BaseExplanationStrategy.build_summary_result(
            guard_req,
            method_override="task_aware_data_summarization",
            include_debug_payload=True,
        )
        guarded_debug = guarded["metadata"]["summary_debug_payload"]
        assert json.dumps(
            guard_rows[:20], indent=2, ensure_ascii=False, default=str
        ) in guarded["summary_text"]
        assert guarded_debug["evidence_sections_omitted"]

        action_req = build_request(
            "A-G16",
            {
                "synthesis_data": [{
                    "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
                    "low_engagement_count": 1240,
                    "high_risk_count": 906,
                    "total_students": 1998,
                    "hardest_assessment": "24299",
                    "best_resource_type": "quiz",
                }]
            },
        )
        _system_prompt, action_prompt = (
            BaseExplanationStrategy._build_action_synthesis_llm_prompts(action_req)
        )
        assert "admin_review_high_risk_caseload" in action_prompt
        assert '"prioritized_actions": []' not in action_prompt

        assert debug["token_count_method"]
        print("debug_ai_summary V3 self-test passed")
    finally:
        for key, value in previous.items():
            if value is None:
                os.environ.pop(key, None)
            else:
                os.environ[key] = value


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--task", default="A-G14")
    parser.add_argument("--input-json")
    parser.add_argument("--method", choices=SUMMARY_METHODS)
    parser.add_argument("--compare-methods", action="store_true")
    parser.add_argument("--write-log", action="store_true")
    parser.add_argument("--self-test", action="store_true")
    parser.add_argument("--self-test-categorical", action="store_true")
    parser.add_argument("--self-test-risk-flags", action="store_true")
    parser.add_argument("--self-test-trend-series", action="store_true")
    parser.add_argument("--self-test-ranking", action="store_true")
    parser.add_argument("--self-test-numeric-distribution", action="store_true")
    parser.add_argument("--self-test-group-comparison", action="store_true")
    parser.add_argument("--self-test-correlation-evidence", action="store_true")
    parser.add_argument("--self-test-multi-metric-comparison", action="store_true")
    parser.add_argument("--self-test-metric-snapshot", action="store_true")
    parser.add_argument("--self-test-action-synthesis", action="store_true")
    parser.add_argument("--self-test-v3", action="store_true")
    args = parser.parse_args()

    legacy_self_test = any((
        args.self_test,
        args.self_test_categorical,
        args.self_test_risk_flags,
        args.self_test_trend_series,
        args.self_test_ranking,
        args.self_test_numeric_distribution,
        args.self_test_group_comparison,
        args.self_test_correlation_evidence,
        args.self_test_multi_metric_comparison,
        args.self_test_metric_snapshot,
        args.self_test_action_synthesis,
    ))
    if legacy_self_test:
        os.environ["AI_TASK_AWARE_VERSION"] = "v1"

    if args.self_test:
        run_self_test()
        return
    if args.self_test_categorical:
        run_self_test_categorical()
        return
    if args.self_test_risk_flags:
        run_self_test_risk_flags()
        return
    if args.self_test_trend_series:
        run_self_test_trend_series()
        return
    if args.self_test_ranking:
        run_self_test_ranking()
        return
    if args.self_test_numeric_distribution:
        run_self_test_numeric_distribution()
        return
    if args.self_test_group_comparison:
        run_self_test_group_comparison()
        return
    if args.self_test_correlation_evidence:
        run_self_test_correlation_evidence()
        return
    if args.self_test_multi_metric_comparison:
        run_self_test_multi_metric_comparison()
        return
    if args.self_test_metric_snapshot:
        run_self_test_metric_snapshot()
        return
    if args.self_test_action_synthesis:
        run_self_test_action_synthesis()
        return
    if args.self_test_v3:
        run_self_test_v3()
        return

    req = build_request(args.task, load_datasets(args.input_json, args.task))
    methods = list(SUMMARY_METHODS) if args.compare_methods else [args.method or os.environ.get("AI_SUMMARY_METHOD") or "task_aware_data_summarization"]

    records = []
    for method in methods:
        record = summarize_for_method(req, method)
        records.append(record)
        if args.write_log:
            path = write_summary_log(record)
            print(f"Wrote {path}")

    if args.compare_methods:
        print(json.dumps(records, indent=2, ensure_ascii=False, default=str))
    else:
        print(records[0]["input_data_summary"])


if __name__ == "__main__":
    main()
