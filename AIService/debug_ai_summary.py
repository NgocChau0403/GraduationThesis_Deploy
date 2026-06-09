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

from schemas import AISummaryConfig, ConfidenceInput, ExplainRequest
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
        time_column=task.get("aiTimeColumn"),
        metric_column=task.get("aiMetricColumn"),
        entity_column=task.get("aiEntityColumn"),
        group_column=task.get("aiGroupColumn"),
        gap_column=task.get("aiGapColumn"),
        reliability_column=task.get("aiReliabilityColumn"),
        minimum_reliable_count=task.get("aiMinimumReliableCount"),
        category_column=task.get("aiCategoryColumn"),
        bin_column=task.get("aiBinColumn"),
        count_column=task.get("aiCountColumn"),
        percent_column=task.get("aiPercentColumn"),
        metric_columns=task.get("aiMetricColumns") or [],
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
    generic_summary = BaseExplanationStrategy.summarize_datasets(generic_req)
    assert "Dataset is empty" in generic_summary

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
    trend_summary = json.loads(BaseExplanationStrategy.summarize_datasets(trend_req))
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
    missing_summary = json.loads(BaseExplanationStrategy.summarize_datasets(missing_req))
    assert missing_summary["target_group_missing"] is True
    assert "Withdrawn" in missing_summary["summarization_warnings"][0]

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
    assert a_s04_summary["summarization_warnings"] == []
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
) -> AISummaryConfig:
    return AISummaryConfig(
        summary_type="group_comparison",
        group_column="group_value",
        metric_column="avg_score",
        count_column="student_count",
        metric_columns=["avg_engagement_score"],
        gap_column=gap_column,
        expected_groups=expected_groups if expected_groups is not None else ["high_band", "low_band", "medium_band", "missing_expected"],
        target_group="low_band",
        comparison_groups=["high_band", "missing_comparison"],
        sort_by=gap_column or "gap",
        sort_direction="asc",
        minimum_reliable_count=10,
        top_k=top_k,
        bottom_k=bottom_k,
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
    args = parser.parse_args()

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
