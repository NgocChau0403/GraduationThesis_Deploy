"""
Debug AI prompt summaries without calling the LLM.

Usage:
  python debug_ai_summary.py --task A-G14
  python debug_ai_summary.py --self-test
  python debug_ai_summary.py --self-test-categorical
  python debug_ai_summary.py --self-test-risk-flags
  python debug_ai_summary.py --self-test-trend-series
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
from pathlib import Path

os.environ.setdefault("OPENAI_API_KEY", "debug-no-llm-call")

from schemas import AISummaryConfig, ConfidenceInput, ExplainRequest
from strategies.base import BaseExplanationStrategy


ROOT = Path(__file__).resolve().parents[1]
TASK_REGISTRY = ROOT / "Backend" / "src" / "config" / "taskRegistry.json"


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
        group_column=task.get("aiGroupColumn"),
        reliability_column=task.get("aiReliabilityColumn"),
        minimum_reliable_count=task.get("aiMinimumReliableCount"),
        category_column=task.get("aiCategoryColumn"),
        count_column=task.get("aiCountColumn"),
        percent_column=task.get("aiPercentColumn"),
        metric_columns=task.get("aiMetricColumns") or [],
        focus_categories=task.get("aiFocusCategories") or [],
        category_order=task.get("aiCategoryOrder") or [],
        expected_categories=task.get("aiExpectedCategories") or [],
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

    print("debug_ai_summary self-test passed")


def run_self_test_categorical() -> None:
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


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--task", default="A-G14")
    parser.add_argument("--input-json")
    parser.add_argument("--self-test", action="store_true")
    parser.add_argument("--self-test-categorical", action="store_true")
    parser.add_argument("--self-test-risk-flags", action="store_true")
    parser.add_argument("--self-test-trend-series", action="store_true")
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

    req = build_request(args.task, load_datasets(args.input_json, args.task))
    print(BaseExplanationStrategy.summarize_datasets(req))


if __name__ == "__main__":
    main()
