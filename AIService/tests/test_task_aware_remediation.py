import os
import sys
import unittest
from pathlib import Path


AI_ROOT = Path(__file__).resolve().parents[1]
PROJECT_ROOT = AI_ROOT.parent
sys.path.insert(0, str(AI_ROOT))

os.environ["AI_SUMMARY_METHOD"] = "task_aware_data_summarization"
os.environ["AI_TASK_AWARE_VERSION"] = "v3"

from schemas import ExplainRequest  # noqa: E402
from strategies.base import BaseExplanationStrategy  # noqa: E402


ARTIFACT_DIR = (
    PROJECT_ROOT
    / "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary"
    / "explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts"
)
OULAD_ARTIFACT_DIR = (
    PROJECT_ROOT
    / "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware"
    / "oulad_available_official_r1/explanations/explanation_artifacts"
)


def build(task_id: str):
    import json

    artifact_path = ARTIFACT_DIR / f"SAMPLE_UCI_POR__{task_id}__task_aware_data_summarization.json"
    artifact = json.loads(artifact_path.read_text(encoding="utf-8"))
    request = ExplainRequest(**artifact["request_payload"])
    return BaseExplanationStrategy.build_summary_result(
        request,
        method_override="task_aware_data_summarization",
        include_debug_payload=True,
    )


class TaskAwareNoLossContractTests(unittest.TestCase):
    def assert_full_rows(self, result):
        debug = result["metadata"]["summary_debug_payload"]
        self.assertEqual(debug["full_result_row_count"], debug["included_row_count"])
        return debug

    def test_a_s04_keeps_existing_actions(self):
        debug = self.assert_full_rows(build("A-S04"))
        self.assertIn("recommended_actions", debug["must_keep_keys"])
        self.assertTrue(any("explain the existing recommended_action" in item.lower() for item in debug["task_output_contract"]))

    def test_a_s05_locks_single_student_scope(self):
        debug = self.assert_full_rows(build("A-S05"))
        summary = debug["source_evidence_summary"]
        self.assertEqual(summary["scope_evidence"]["scope"], "one selected student")
        self.assertTrue(any("one selected student" in item.lower() for item in debug["task_output_contract"]))

    def test_a_s07_keeps_support_status_without_benchmark_invention(self):
        debug = self.assert_full_rows(build("A-S07"))
        self.assertIn("status_evidence", debug["must_keep_keys"])
        self.assertTrue(any("without inventing thresholds" in item.lower() for item in debug["task_output_contract"]))

    def test_s_t03_adds_deterministic_standing(self):
        debug = self.assert_full_rows(build("S-T03"))
        standing = debug["source_evidence_summary"]["standing_evidence"]
        self.assertEqual(standing["score_percentile"], 8.8)
        self.assertEqual(standing["percent_above"], 91.2)

    def test_s_t07_marks_association_not_estimable(self):
        debug = self.assert_full_rows(build("S-T07"))
        association = debug["source_evidence_summary"]["association_evidence"]
        self.assertEqual(association["absence_rate"], "0.125")
        self.assertEqual(association["association_status"], "not_estimable")

    def test_s_t13_preserves_triggered_action_provenance(self):
        result = build("S-T13")
        debug = self.assert_full_rows(result)
        summary = debug["source_evidence_summary"]
        self.assertGreaterEqual(len(summary["prioritized_actions"]), 1)
        self.assertGreaterEqual(len(summary["rule_evaluations"]), 1)
        self.assertIn("task_aware_evidence_payload", result["metadata"])

    def repair_payload(self, task_id: str, payload=None):
        import json

        artifact_path = ARTIFACT_DIR / f"SAMPLE_UCI_POR__{task_id}__task_aware_data_summarization.json"
        artifact = json.loads(artifact_path.read_text(encoding="utf-8"))
        request = ExplainRequest(**artifact["request_payload"])
        repaired = payload or {"summary": "Generated summary.", "educational_implications": [], "recommendations": []}
        BaseExplanationStrategy._apply_task_specific_contract_repairs(request, repaired)
        return repaired

    def repair_oulad_payload(self, task_id: str, payload=None):
        import json

        artifact_path = OULAD_ARTIFACT_DIR / f"SAMPLE_OULAD__{task_id}__task_aware_data_summarization.json"
        artifact = json.loads(artifact_path.read_text(encoding="utf-8"))
        request = ExplainRequest(**artifact["request_payload"])
        result = BaseExplanationStrategy.build_summary_result(
            request,
            method_override="task_aware_data_summarization",
            include_debug_payload=True,
        )
        BaseExplanationStrategy._attach_summary_metadata(request, result["metadata"])
        repaired = payload or {"summary": "Generated summary.", "educational_implications": [], "recommendations": []}
        BaseExplanationStrategy._apply_task_specific_contract_repairs(request, repaired)
        return repaired, result

    def test_a_b02_repairs_exact_outcome_counts(self):
        repaired = self.repair_payload("A-B02")
        self.assertIn("pass_count=549", repaired["summary"])
        self.assertIn("fail_count=100", repaired["summary"])
        self.assertIn("withdrawn_count=0", repaired["summary"])

    def test_a_c01_repairs_exact_divergence_and_convergence(self):
        repaired = self.repair_payload("A-C01")
        self.assertIn("assessment_order=1:score_normalized=0", repaired["summary"])
        self.assertIn("assessment_order=1:score_normalized=45", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])

    def test_a_g03_repairs_top_ranked_numeric_evidence(self):
        repaired = self.repair_payload("A-G03")
        self.assertIn("SAMPLE_UCI_POR_STU_000568", repaired["summary"])
        self.assertIn("avg_score=5", repaired["summary"])
        self.assertIn("recommended_admin_action=", repaired["summary"])

    def test_s_t02_repairs_single_student_scope_and_values(self):
        repaired = self.repair_payload("S-T02")
        self.assertIn("one selected student's assessment evidence", repaired["summary"])
        self.assertIn("G1: avg_score=0", repaired["summary"])
        self.assertIn("G2: avg_score=55", repaired["summary"])

    def test_oulad_a_c02_preserves_all_dimensions_and_largest_gap(self):
        repaired, result = self.repair_oulad_payload("A-C02")
        self.assertIn("active_days_norm=0.35251798561151076", repaired["summary"])
        self.assertIn("Largest absolute engagement-dimension gap: active_days_norm=0.3525", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertIn("largest_gap_evidence", result["metadata"]["summary_debug_payload"]["source_evidence_summary"])

    def test_oulad_a_g05_preserves_all_outcome_assessment_groups(self):
        repaired, result = self.repair_oulad_payload("A-G05")
        self.assertEqual(repaired["summary"].count("final_outcome="), 11)
        self.assertIn("submission_delay_avg=3.25", repaired["summary"])
        self.assertIn("late_submission_rate=0.9951", repaired["summary"])
        self.assertIn("Largest-count group with positive late rate", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertEqual(len(result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["systemic_lateness_evidence"]["all_groups"]), 11)

    def test_oulad_a_g08_preserves_weighted_equity_comparisons(self):
        repaired, result = self.repair_oulad_payload("A-G08")
        self.assertIn("weighted cohort engagement mean=", repaired["summary"])
        self.assertEqual(repaired["summary"].count("group="), 11)
        self.assertIn("score_vs_cohort=", repaired["summary"])
        self.assertIn("engagement_vs_cohort=", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertIn("weighted_cohort_engagement_mean", result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["engagement_cohort_comparison"])

    def test_oulad_a_g11_preserves_largest_drop_and_all_flagged_weeks(self):
        repaired, result = self.repair_oulad_payload("A-G11")
        self.assertIn("week 3 to week 4", repaired["summary"])
        self.assertIn("delta=-137576", repaired["summary"])
        for week in (6, 11, 12, 13, 24, 36, 37, 38, 39):
            self.assertIn(f"week={week},", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertIn("largest_adjacent_drop", result["metadata"]["summary_debug_payload"]["source_evidence_summary"])

    def test_oulad_a_g15_preserves_top_ten_and_versioned_review_mapping(self):
        repaired, result = self.repair_oulad_payload("A-G15")
        for rank in range(1, 11):
            self.assertIn(f"rank={rank},", repaired["summary"])
        self.assertIn("priority_group_action_mapping_version=oulad_admin_review_v1", repaired["summary"])
        self.assertIn("score=5 action=", repaired["summary"])
        self.assertIn("score=4 action=", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertEqual(result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["priority_group_actions"]["mapping_version"], "oulad_admin_review_v1")

    def test_oulad_a_g16_preserves_all_triggered_action_provenance(self):
        repaired, result = self.repair_oulad_payload("A-G16")
        evidence = result["metadata"]["summary_debug_payload"]["source_evidence_summary"]
        self.assertEqual(len(evidence["prioritized_actions"]), 4)
        for action in evidence["prioritized_actions"]:
            for value in (action["action_id"], action["rule_id"], action["owner"], action["priority"], action["time_horizon_days"]):
                self.assertIn(str(value), repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])

    def test_oulad_a_s01_preserves_complete_profile_without_new_action(self):
        repaired, result = self.repair_oulad_payload("A-S01")
        for value in ("avg_score=91.2", "final_outcome=Distinction", "at_risk_score=3", "at_risk_label=high", "engagement_score=0.2024", "study_effort_level=medium", "previous_attempt_count=1"):
            self.assertIn(value, repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertIn("profile_contract_evidence", result["metadata"]["summary_debug_payload"]["source_evidence_summary"])

    def test_oulad_a_s03_uses_week_zero_as_primary_timing(self):
        repaired, result = self.repair_oulad_payload("A-S03")
        for value in ("early_warning_week=0", "previous_week_clicks=94", "warning_week_clicks=27", "pre_warning_average=90", "post_warning_average=36.0333"):
            self.assertIn(value, repaired["summary"])
        self.assertIn("Secondary largest later adjacent drop", repaired["summary"])
        self.assertEqual(len(repaired["recommendations"]), 1)
        self.assertIn("outreach before or at early_warning_week=0", repaired["recommendations"][0]["action"])
        self.assertEqual(result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["early_warning_evidence"]["early_warning_week"], 0)

    def test_oulad_a_s06_preserves_lateness_and_small_sample_boundary(self):
        repaired, result = self.repair_oulad_payload("A-S06")
        for value in ("submission_delay_avg=3.25", "punctuality_rate=0", "valid_delay_count=4", "null_delay_count=1", "association_status=descriptive_only_not_statistically_reliable"):
            self.assertIn(value, repaired["summary"])
        self.assertEqual(len(repaired["recommendations"]), 1)
        self.assertIn("no score-effect claim", repaired["recommendations"][0]["rationale"].lower())
        self.assertEqual(result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["lateness_evidence"]["valid_delay_count"], 4)

    def test_oulad_a_c05_keeps_background_descriptive(self):
        repaired, result = self.repair_oulad_payload("A-C05")
        self.assertIn("background_driven_performance_difference=not_estimable", repaired["summary"])
        self.assertIn("disadvantage_score=0.725", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertEqual(result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["background_scope_evidence"]["performance_difference_status"], "not_estimable")

    def test_oulad_a_g01_lists_full_threshold_group(self):
        repaired, result = self.repair_oulad_payload("A-G01")
        evidence = result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["low_engagement_contract_evidence"]
        self.assertEqual(evidence["student_count"], 1544)
        self.assertIn("engagement_score<0.15", repaired["summary"])
        self.assertEqual(repaired["summary"].count("SAMPLE_OULAD_STU_"), 1544)
        self.assertEqual(len(repaired["recommendations"]), 1)

    def test_oulad_a_g04_uses_highest_assessment_without_invented_mean(self):
        repaired, result = self.repair_oulad_payload("A-G04")
        self.assertIn("explicit_fail_rate_threshold=not_supplied", repaired["summary"])
        self.assertIn("assessment_name=24288", repaired["summary"])
        self.assertIn("fail_rate_pct=50", repaired["summary"])
        self.assertNotIn("mean fail rate", repaired["summary"].lower())
        self.assertEqual(result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["assessment_review_evidence"]["threshold_status"], "not_supplied")

    def test_oulad_a_g07_ranks_all_returned_features(self):
        repaired, result = self.repair_oulad_payload("A-G07")
        self.assertIn("returned_feature_count=4", repaired["summary"])
        self.assertIn("fifth_feature_status=unavailable", repaired["summary"])
        for rank in range(1, 5):
            self.assertIn(f"rank={rank},", repaired["summary"])
        self.assertIn("correlation=0.4181, strength=moderate", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])

    def test_oulad_a_g12_preserves_every_group_outcome_rate(self):
        repaired, result = self.repair_oulad_payload("A-G12")
        evidence = result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["outcome_rate_evidence"]
        self.assertEqual(repaired["summary"].count("group="), len(evidence["groups"]))
        self.assertIn("fail_rate_pct=13.8", repaired["summary"])
        self.assertIn("withdrawal_rate_pct=53.8", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])

    def test_oulad_s_t03_preserves_engagement_percentile_direction(self):
        repaired, result = self.repair_oulad_payload("S-T03")
        self.assertIn("engagement_percentile=75", repaired["summary"])
        self.assertIn("higher than about 75% of peers", repaired["summary"])
        self.assertIn("top 25%", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertEqual(result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["standing_evidence"]["engagement_percent_above"], 25)

    def test_oulad_s_t08_uses_small_sample_delay_score_boundary(self):
        repaired, result = self.repair_oulad_payload("S-T08")
        for value in ("submission_delay_avg=3.25", "punctuality_rate=0", "valid_pair_count=4", "null_delay_count=1", "pearson_correlation=-0.4015", "association_status=descriptive_only_not_statistically_reliable", "non_monotonic"):
            self.assertIn(value, repaired["summary"])
        self.assertIn("Observed delay-score relationship", repaired["summary"])
        self.assertIn("longest delay_days=5 has score=83", repaired["summary"])
        self.assertEqual(result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["delay_score_evidence"]["valid_pair_count"], 4)

    def test_oulad_s_t12_uses_systematic_lateness_without_causality(self):
        repaired, result = self.repair_oulad_payload("S-T12")
        for value in ("submission_delay_avg=3.25", "punctuality_rate=0", "pearson_correlation=-0.4015", "association_status=descriptive_only_not_statistically_reliable", "non_monotonic"):
            self.assertIn(value, repaired["summary"])
        self.assertNotIn("procrastination", repaired["summary"].lower())
        self.assertEqual(result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["delay_score_evidence"]["null_delay_count"], 1)

    def test_oulad_a_b02_preserves_withdrawn_and_avoids_false_majority(self):
        repaired, result = self.repair_oulad_payload("A-B02")
        self.assertIn("withdrawn_count=1077", repaired["summary"])
        self.assertIn("pass_count=709", repaired["summary"])
        self.assertIn("no returned category exceeds 50%", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertEqual(result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["outcome_distribution_evidence"]["majority_status"], "no_category_exceeds_50_percent")

    def test_oulad_a_b03_preserves_all_engagement_groups_without_improvement_claim(self):
        repaired, result = self.repair_oulad_payload("A-B03")
        self.assertEqual(repaired["summary"].count("study_effort_level="), 4)
        self.assertIn("study_effort_level=very_low, student_count=1740", repaired["summary"])
        self.assertIn("does not establish causes or likely improvement", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertEqual(result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["engagement_distribution_evidence"]["group_count"], 4)

    def test_oulad_a_c03_preserves_exact_risk_fields_and_null_score(self):
        repaired, result = self.repair_oulad_payload("A-C03")
        for value in ("avg_score=null", "at_risk_score=3", "at_risk_label=high", "flag_low_engagement=0", "flag_low_punctuality=1", "flag_neg_trend=1"):
            self.assertIn(value, repaired["summary"])
        self.assertIn("a flag equal to 0 is not a risk driver", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertEqual(len(result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["risk_profile_evidence"]["students"]), 2)

    def test_oulad_s_b01_preserves_percentile_and_avoids_understanding_claim(self):
        repaired, result = self.repair_oulad_payload("S-B01")
        for value in ("weighted_avg_score=94.34", "score_percentile=89.8", "cohort_size=1998", "performance_trend=-0.7187500000000001"):
            self.assertIn(value, repaired["summary"])
        self.assertIn("do not directly measure understanding", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertIn("performance_overview_evidence", result["metadata"]["summary_debug_payload"]["source_evidence_summary"])

    def test_oulad_s_b03_preserves_effort_level_without_outcome_inference(self):
        repaired, result = self.repair_oulad_payload("S-B03")
        for value in ("total_clicks=1261", "active_days=98", "engagement_score=0.2024", "study_effort_level=medium"):
            self.assertIn(value, repaired["summary"])
        self.assertIn("do not establish interaction quality", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertIn("engagement_overview_evidence", result["metadata"]["summary_debug_payload"]["source_evidence_summary"])

    def test_oulad_s_t05_lists_all_drops_and_marks_assessment_proximity_unknown(self):
        repaired, result = self.repair_oulad_payload("S-T05")
        evidence = result["metadata"]["summary_debug_payload"]["source_evidence_summary"]["weekly_drop_evidence"]
        for item in evidence["flagged_weeks"]:
            self.assertIn(f"week={item['week_number']}, weekly_clicks={item['weekly_clicks']}", repaired["summary"])
        self.assertIn("week=0, weekly_clicks=27", repaired["summary"])
        self.assertIn("assessment_proximity_status=not_estimable", repaired["summary"])
        self.assertEqual(repaired["recommendations"], [])
        self.assertFalse(evidence["assessment_schedule_present"])


if __name__ == "__main__":
    unittest.main()
