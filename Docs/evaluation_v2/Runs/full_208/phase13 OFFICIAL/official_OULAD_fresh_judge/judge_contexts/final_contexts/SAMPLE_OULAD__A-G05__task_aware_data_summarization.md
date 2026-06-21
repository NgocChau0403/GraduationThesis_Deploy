# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G05__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-G05__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G05",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Submission behaviour analysis",
 "scope": "Many students",
 "actionable_question": "Are late submissions a systemic problem in this class?",
 "target_audience": "instructor",
 "ai_summary_type": "group_comparison",
 "ai_prompt_hint": "Use final_outcome, assessment_type, submission_delay_avg, late_submission_rate, and punctuality_rate to decide whether late submission is systemic. Prioritize groups with high late_submission_rate and high student_count. Do not discuss individual students.",
 "query_labels": [
 "submission_behaviour"
 ],
 "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
 "source_tables": [
 "assessment_result",
 "assessment",
 "enrollment [OULAD only]"
 ],
 "key_db_fields": [
 "final_outcome [FE cross]",
 "assessment_type [FE cross]",
 "submission_delay_avg [FE cross]",
 "late_submission_rate [FE cross]",
 "punctuality_rate [FE cross]",
 "student_count",
 "submission_count",
 "avg_score",
 "submission_risk_level"
 ],
 "output_schema": {
 "required_columns": [
 "final_outcome",
 "assessment_type",
 "submission_delay_avg",
 "late_submission_rate"
 ],
 "optional_columns": [
 "submission_count",
 "student_count",
 "net_submission_delay_avg",
 "punctuality_rate",
 "avg_score",
 "submission_risk_level"
 ]
 },
 "query_labels": [
 "submission_behaviour"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-G05-CORE-01",
 "description": "Use final_outcome, assessment_type, submission_delay_avg, late_submission_rate, and punctuality_rate to decide whether late submission is systemic."
 },
 {
 "requirement_id": "A-G05-CORE-02",
 "description": "Prioritize groups with high late_submission_rate and high student_count."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-G05-CONSTRAINT-01",
 "description": "Do not discuss individual students."
 }
 ],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
}
```

## Deterministic Derived-Stat Evidence

```json
[]
```

## Deterministic Action Evidence

```json
{
 "applicable": false,
 "evaluation_status": "not_available",
 "supported_action_count": 0,
 "supported_actions": []
}
```

## Direct-Embedded Full Query Result

```json
{
 "full_query_artifacts": [
 {
 "dataset_label": "submission_behaviour",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G05.json",
 "artifact_sha256": "0b9ba8429b564f1c03c6a06d95144cb27e022db9b390353358d6703f83abda19",
 "row_count": 11,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 11,
 "prompt_embedded_row_count": 11,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "0b9ba8429b564f1c03c6a06d95144cb27e022db9b390353358d6703f83abda19",
 "evidence_rows_sha256": "ca9b618abc86018d9f65f2bc87e4e9170e577022c2ad8a24ccbfeea104682c22",
 "retrieval_validation": {
 "status": "not_applicable",
 "retrieved_row_count": 0,
 "chunk_count": 0,
 "chunk_ids": [],
 "row_ranges": [],
 "issues": []
 }
}
```

```json
{
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 11,
 "embedded_datasets_sha256": "ca9b618abc86018d9f65f2bc87e4e9170e577022c2ad8a24ccbfeea104682c22",
 "datasets": {
 "submission_behaviour": [
 {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "submission_count": 1217,
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_risk_level": "high_lateness"
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "submission_count": 2684,
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_risk_level": "high_lateness"
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "CMA",
 "submission_count": 985,
 "student_count": 359,
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "late_submission_rate": 0.9807,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_risk_level": "high_lateness"
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA",
 "submission_count": 960,
 "student_count": 595,
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "late_submission_rate": 0.9719,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_risk_level": "high_lateness"
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA",
 "submission_count": 525,
 "student_count": 365,
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "late_submission_rate": 0.3124,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_risk_level": "moderate_lateness"
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "TMA",
 "submission_count": 759,
 "student_count": 292,
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "late_submission_rate": 0.3017,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_risk_level": "moderate_lateness"
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "TMA",
 "submission_count": 2206,
 "student_count": 608,
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "late_submission_rate": 0.189,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_risk_level": "low_lateness"
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "TMA",
 "submission_count": 947,
 "student_count": 251,
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "late_submission_rate": 0.0644,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_risk_level": "low_lateness"
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "Exam",
 "submission_count": 306,
 "student_count": 306,
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_risk_level": "low_lateness"
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "Exam",
 "submission_count": 155,
 "student_count": 155,
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_risk_level": "low_lateness"
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "Exam",
 "submission_count": 707,
 "student_count": 707,
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_risk_level": "low_lateness"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G05__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "eeb67e695561a1dca3b18645f450673f01bb26b3e9d6be3008b0e2732a464974",
 "generator_input_sha256": "4bb51bb5d3888304c157aeaef5166e68cd9dd47e9395ca67478b650111d69360",
 "generator_input_compact": {
 "task_id": "A-G05",
 "execution_id": "exec_1781847724644_4d32e8e3",
 "task_name": "Submission behaviour analysis",
 "analysis_type": "comparison",
 "explanation_strategy": "behavioral",
 "actionable_question": "Are late submissions a systemic problem in this class?",
 "target_audience": [
 "instructor"
 ],
 "query_labels": [
 "submission_behaviour"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "submission_behaviour"
 ],
 "dataset_row_counts": {
 "submission_behaviour": 11
 },
 "ai_summary_config_summary": {
 "summary_type": "group_comparison",
 "metric_column": "late_submission_rate",
 "entity_column": null,
 "group_column": "final_outcome",
 "time_column": null,
 "sort_by": "late_submission_rate",
 "sort_direction": "desc",
 "top_k": 8,
 "bottom_k": 3,
 "threshold_direction": null,
 "numeric_threshold": null,
 "require_sensitive_context_policy": false,
 "require_complete_action_provenance": true
 }
 }
}
```

## AI Explanation To Judge

```json
{
 "raw_text": "Summary: Exact outcome-assessment lateness evidence: final_outcome=Distinction, assessment_type=CMA, student_count=306, submission_delay_avg=3.25, late_submission_rate=0.9951, punctuality_rate=0.0049 | final_outcome=Pass, assessment_type=CMA, student_count=708, submission_delay_avg=3.27, late_submission_rate=0.9899, punctuality_rate=0.0101 | final_outcome=Fail, assessment_type=CMA, student_count=359, submission_delay_avg=3.05, late_submission_rate=0.9807, punctuality_rate=0.0193 | final_outcome=Withdrawn, assessment_type=CMA, student_count=595, submission_delay_avg=2.77, late_submission_rate=0.9719, punctuality_rate=0.0281 | final_outcome=Withdrawn, assessment_type=TMA, student_count=365, submission_delay_avg=9.91, late_submission_rate=0.3124, punctuality_rate=0.6876 | final_outcome=Fail, assessment_type=TMA, student_count=292, submission_delay_avg=7.66, late_submission_rate=0.3017, punctuality_rate=0.6983 | final_outcome=Pass, assessment_type=TMA, student_count=608, submission_delay_avg=7.79, late_submission_rate=0.189, punctuality_rate=0.811 | final_outcome=Distinction, assessment_type=TMA, student_count=251, submission_delay_avg=6.02, late_submission_rate=0.0644, punctuality_rate=0.9356 | final_outcome=Pass, assessment_type=Exam, student_count=707, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0 | final_outcome=Distinction, assessment_type=Exam, student_count=306, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0 | final_outcome=Fail, assessment_type=Exam, student_count=155, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0. Highest returned late rate: Distinction|CMA rate=0.9951, count=306. Largest-count group with positive late rate: Pass|CMA rate=0.9899, count=708.\n\nInsights: High Late Submission Rates in CMA Assessments: Both the 'Distinction' and 'Pass' outcomes in CMA assessments exhibit extremely high late submission rates of 99.51% and 98.99%, respectively, with significant student counts of 306 and 708. This suggests a widespread issue with punctuality in submissions. | Consistent High Late Submission Rates Across Outcomes: The late submission rates for 'Fail' and 'Withdrawn' outcomes in CMA assessments are also notably high at 98.07% and 97.19%, respectively, indicating that the issue is not limited to high-performing students but affects a broad range of outcomes.\n\nEducational implications: CMA lateness is widespread across returned outcome groups; this is descriptive submission evidence and does not establish motivation, engagement, or score effects.",
 "structured_payload": {
 "task_id": "A-G05",
 "execution_id": "exec_1781847724644_4d32e8e3",
 "explanation": {
 "summary": "Exact outcome-assessment lateness evidence: final_outcome=Distinction, assessment_type=CMA, student_count=306, submission_delay_avg=3.25, late_submission_rate=0.9951, punctuality_rate=0.0049 | final_outcome=Pass, assessment_type=CMA, student_count=708, submission_delay_avg=3.27, late_submission_rate=0.9899, punctuality_rate=0.0101 | final_outcome=Fail, assessment_type=CMA, student_count=359, submission_delay_avg=3.05, late_submission_rate=0.9807, punctuality_rate=0.0193 | final_outcome=Withdrawn, assessment_type=CMA, student_count=595, submission_delay_avg=2.77, late_submission_rate=0.9719, punctuality_rate=0.0281 | final_outcome=Withdrawn, assessment_type=TMA, student_count=365, submission_delay_avg=9.91, late_submission_rate=0.3124, punctuality_rate=0.6876 | final_outcome=Fail, assessment_type=TMA, student_count=292, submission_delay_avg=7.66, late_submission_rate=0.3017, punctuality_rate=0.6983 | final_outcome=Pass, assessment_type=TMA, student_count=608, submission_delay_avg=7.79, late_submission_rate=0.189, punctuality_rate=0.811 | final_outcome=Distinction, assessment_type=TMA, student_count=251, submission_delay_avg=6.02, late_submission_rate=0.0644, punctuality_rate=0.9356 | final_outcome=Pass, assessment_type=Exam, student_count=707, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0 | final_outcome=Distinction, assessment_type=Exam, student_count=306, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0 | final_outcome=Fail, assessment_type=Exam, student_count=155, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0. Highest returned late rate: Distinction|CMA rate=0.9951, count=306. Largest-count group with positive late rate: Pass|CMA rate=0.9899, count=708.",
 "insights": [
 {
 "title": "High Late Submission Rates in CMA Assessments",
 "description": "Both the 'Distinction' and 'Pass' outcomes in CMA assessments exhibit extremely high late submission rates of 99.51% and 98.99%, respectively, with significant student counts of 306 and 708. This suggests a widespread issue with punctuality in submissions.",
 "severity": "high",
 "evidence": [
 {
 "metric": "late_submission_rate",
 "value": 0.9951,
 "comparison": "baseline",
 "delta": null,
 "context": "Distinction in CMA"
 },
 {
 "metric": "late_submission_rate",
 "value": 0.9899,
 "comparison": "baseline",
 "delta": null,
 "context": "Pass in CMA"
 }
 ]
 },
 {
 "title": "Consistent High Late Submission Rates Across Outcomes",
 "description": "The late submission rates for 'Fail' and 'Withdrawn' outcomes in CMA assessments are also notably high at 98.07% and 97.19%, respectively, indicating that the issue is not limited to high-performing students but affects a broad range of outcomes.",
 "severity": "high",
 "evidence": [
 {
 "metric": "late_submission_rate",
 "value": 0.9807,
 "comparison": "baseline",
 "delta": null,
 "context": "Fail in CMA"
 },
 {
 "metric": "late_submission_rate",
 "value": 0.9719,
 "comparison": "baseline",
 "delta": null,
 "context": "Withdrawn in CMA"
 }
 ]
 }
 ],
 "educational_implications": [
 "CMA lateness is widespread across returned outcome groups; this is descriptive submission evidence and does not establish motivation, engagement, or score effects."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is comprehensive and reflects consistent patterns across multiple assessment types and outcomes.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "behavioral",
 "explanation_type": "behavioral",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "group_comparison",
 "ai_summary_method_warning": null,
 "full_result_row_count": 11,
 "included_row_count": 11,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "submission_behaviour",
 "row_count": 11,
 "included_row_count": 11
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 11,
 "baseline_reference_tokens": 922,
 "task_aware_prompt_tokens": 4518,
 "token_ratio": 4.9002,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.weakest_group",
 "exceptions.dominant_group",
 "comparison.gaps"
 ],
 "task_output_contract": [
 "Preserve every returned final_outcome and assessment_type combination with student_count, submission_delay_avg, late_submission_rate, and punctuality_rate.",
 "Prioritize the highest-rate and largest-count groups without inventing causes, motivation, or outcome effects."
 ],
 "must_keep_keys": [
 "group_metrics",
 "group_series",
 "systemic_lateness_evidence"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (4.9002 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "group_comparison",
 "task_id": "A-G05",
 "task_output_contract": [
 "Preserve every returned final_outcome and assessment_type combination with student_count, submission_delay_avg, late_submission_rate, and punctuality_rate.",
 "Prioritize the highest-rate and largest-count groups without inventing causes, motivation, or outcome effects."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "submission_behaviour",
 "row_count": 11,
 "group_column": "final_outcome",
 "group_key_columns": [
 "final_outcome",
 "assessment_type"
 ],
 "series_column": "assessment_type",
 "metric_column": "late_submission_rate",
 "count_column": "student_count",
 "gap_column": null,
 "composite_group_keys": true
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "focus_summary": [],
 "group_metrics": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 }
 ],
 "group_series": [
 {
 "group": "Pass",
 "series_count": 3,
 "total_count": 2023,
 "weighted_average_metric": 0.4032,
 "series": [
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 }
 ]
 },
 {
 "group": "Withdrawn",
 "series_count": 2,
 "total_count": 960,
 "weighted_average_metric": 0.7212,
 "series": [
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 }
 ]
 },
 {
 "group": "Distinction",
 "series_count": 3,
 "total_count": 863,
 "weighted_average_metric": 0.3716,
 "series": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 }
 ]
 },
 {
 "group": "Fail",
 "series_count": 3,
 "total_count": 806,
 "weighted_average_metric": 0.5461,
 "series": [
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 }
 ]
 }
 ],
 "systemic_lateness_evidence": {
 "all_groups": [
 {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "CMA",
 "student_count": 359,
 "submission_delay_avg": 3.05,
 "late_submission_rate": 0.9807,
 "punctuality_rate": 0.0193
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA",
 "student_count": 595,
 "submission_delay_avg": 2.77,
 "late_submission_rate": 0.9719,
 "punctuality_rate": 0.0281
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA",
 "student_count": 365,
 "submission_delay_avg": 9.91,
 "late_submission_rate": 0.3124,
 "punctuality_rate": 0.6876
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "TMA",
 "student_count": 292,
 "submission_delay_avg": 7.66,
 "late_submission_rate": 0.3017,
 "punctuality_rate": 0.6983
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "TMA",
 "student_count": 608,
 "submission_delay_avg": 7.79,
 "late_submission_rate": 0.189,
 "punctuality_rate": 0.811
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "TMA",
 "student_count": 251,
 "submission_delay_avg": 6.02,
 "late_submission_rate": 0.0644,
 "punctuality_rate": 0.9356
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "Exam",
 "student_count": 707,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "Exam",
 "student_count": 306,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "Exam",
 "student_count": 155,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 }
 ],
 "highest_rate_group": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "submission_count": 1217,
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_risk_level": "high_lateness"
 },
 "largest_count_among_positive_late_rate": {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "submission_count": 2684,
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_risk_level": "high_lateness"
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_groups": [],
 "low_count_warnings": [],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from late_submission_rate relative to weighted cohort mean.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "group_comparison",
 "dataset_name": "submission_behaviour",
 "row_count": 11,
 "group_column": "final_outcome",
 "group_key_columns": [
 "final_outcome",
 "assessment_type"
 ],
 "series_column": "assessment_type",
 "composite_group_keys": true,
 "metric_column": "late_submission_rate",
 "count_column": "student_count",
 "gap_column": null,
 "group_metrics": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 }
 ],
 "group_series": [
 {
 "group": "Pass",
 "series_count": 3,
 "total_count": 2023,
 "weighted_average_metric": 0.4032,
 "series": [
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 }
 ]
 },
 {
 "group": "Withdrawn",
 "series_count": 2,
 "total_count": 960,
 "weighted_average_metric": 0.7212,
 "series": [
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 }
 ]
 },
 {
 "group": "Distinction",
 "series_count": 3,
 "total_count": 863,
 "weighted_average_metric": 0.3716,
 "series": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 }
 ]
 },
 {
 "group": "Fail",
 "series_count": 3,
 "total_count": 806,
 "weighted_average_metric": 0.5461,
 "series": [
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 }
 ]
 }
 ],
 "focus_summary": [],
 "gaps": [
 {
 "group": "Distinction",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9951,
 "student_count": 306
 },
 {
 "group": "Pass",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9899,
 "student_count": 708
 },
 {
 "group": "Fail",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9807,
 "student_count": 359
 },
 {
 "group": "Withdrawn",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9719,
 "student_count": 595
 },
 {
 "group": "Withdrawn",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.3124,
 "student_count": 365
 },
 {
 "group": "Fail",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.3017,
 "student_count": 292
 },
 {
 "group": "Pass",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.189,
 "student_count": 608
 },
 {
 "group": "Distinction",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.0644,
 "student_count": 251
 },
 {
 "group": "Pass",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0,
 "student_count": 707
 },
 {
 "group": "Fail",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0,
 "student_count": 155
 },
 {
 "group": "Distinction",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0,
 "student_count": 306
 }
 ],
 "dominant_group": {
 "group": "Pass",
 "student_count": 708,
 "basis": "largest_count"
 },
 "weakest_group": {
 "group": "Distinction",
 "late_submission_rate": 0,
 "basis": "most_negative_gap",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 "missing_groups": [],
 "low_count_warnings": [],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from late_submission_rate relative to weighted cohort mean.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "systemic_lateness_evidence": {
 "all_groups": [
 {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "CMA",
 "student_count": 359,
 "submission_delay_avg": 3.05,
 "late_submission_rate": 0.9807,
 "punctuality_rate": 0.0193
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA",
 "student_count": 595,
 "submission_delay_avg": 2.77,
 "late_submission_rate": 0.9719,
 "punctuality_rate": 0.0281
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA",
 "student_count": 365,
 "submission_delay_avg": 9.91,
 "late_submission_rate": 0.3124,
 "punctuality_rate": 0.6876
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "TMA",
 "student_count": 292,
 "submission_delay_avg": 7.66,
 "late_submission_rate": 0.3017,
 "punctuality_rate": 0.6983
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "TMA",
 "student_count": 608,
 "submission_delay_avg": 7.79,
 "late_submission_rate": 0.189,
 "punctuality_rate": 0.811
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "TMA",
 "student_count": 251,
 "submission_delay_avg": 6.02,
 "late_submission_rate": 0.0644,
 "punctuality_rate": 0.9356
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "Exam",
 "student_count": 707,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "Exam",
 "student_count": 306,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "Exam",
 "student_count": 155,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 }
 ],
 "highest_rate_group": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "submission_count": 1217,
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_risk_level": "high_lateness"
 },
 "largest_count_among_positive_late_rate": {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "submission_count": 2684,
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_risk_level": "high_lateness"
 }
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 12489,
 "token_usage": {
 "prompt_tokens": 5572,
 "completion_tokens": 634,
 "total_tokens": 6206
 },
 "strategy": "behavioral",
 "granularity": "per_assessment",
 "cost_usd": 0.001216
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G05__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "eeb67e695561a1dca3b18645f450673f01bb26b3e9d6be3008b0e2732a464974",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 5572,
 "completion_tokens": 634,
 "total_tokens": 6206
 },
 "latency_ms": 12497,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-G05",
 "execution_id": "exec_1781847724644_4d32e8e3",
 "explanation": {
 "summary": "Exact outcome-assessment lateness evidence: final_outcome=Distinction, assessment_type=CMA, student_count=306, submission_delay_avg=3.25, late_submission_rate=0.9951, punctuality_rate=0.0049 | final_outcome=Pass, assessment_type=CMA, student_count=708, submission_delay_avg=3.27, late_submission_rate=0.9899, punctuality_rate=0.0101 | final_outcome=Fail, assessment_type=CMA, student_count=359, submission_delay_avg=3.05, late_submission_rate=0.9807, punctuality_rate=0.0193 | final_outcome=Withdrawn, assessment_type=CMA, student_count=595, submission_delay_avg=2.77, late_submission_rate=0.9719, punctuality_rate=0.0281 | final_outcome=Withdrawn, assessment_type=TMA, student_count=365, submission_delay_avg=9.91, late_submission_rate=0.3124, punctuality_rate=0.6876 | final_outcome=Fail, assessment_type=TMA, student_count=292, submission_delay_avg=7.66, late_submission_rate=0.3017, punctuality_rate=0.6983 | final_outcome=Pass, assessment_type=TMA, student_count=608, submission_delay_avg=7.79, late_submission_rate=0.189, punctuality_rate=0.811 | final_outcome=Distinction, assessment_type=TMA, student_count=251, submission_delay_avg=6.02, late_submission_rate=0.0644, punctuality_rate=0.9356 | final_outcome=Pass, assessment_type=Exam, student_count=707, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0 | final_outcome=Distinction, assessment_type=Exam, student_count=306, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0 | final_outcome=Fail, assessment_type=Exam, student_count=155, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0. Highest returned late rate: Distinction|CMA rate=0.9951, count=306. Largest-count group with positive late rate: Pass|CMA rate=0.9899, count=708.",
 "insights": [
 {
 "title": "High Late Submission Rates in CMA Assessments",
 "description": "Both the 'Distinction' and 'Pass' outcomes in CMA assessments exhibit extremely high late submission rates of 99.51% and 98.99%, respectively, with significant student counts of 306 and 708. This suggests a widespread issue with punctuality in submissions.",
 "severity": "high",
 "evidence": [
 {
 "metric": "late_submission_rate",
 "value": 0.9951,
 "comparison": "baseline",
 "delta": null,
 "context": "Distinction in CMA"
 },
 {
 "metric": "late_submission_rate",
 "value": 0.9899,
 "comparison": "baseline",
 "delta": null,
 "context": "Pass in CMA"
 }
 ]
 },
 {
 "title": "Consistent High Late Submission Rates Across Outcomes",
 "description": "The late submission rates for 'Fail' and 'Withdrawn' outcomes in CMA assessments are also notably high at 98.07% and 97.19%, respectively, indicating that the issue is not limited to high-performing students but affects a broad range of outcomes.",
 "severity": "high",
 "evidence": [
 {
 "metric": "late_submission_rate",
 "value": 0.9807,
 "comparison": "baseline",
 "delta": null,
 "context": "Fail in CMA"
 },
 {
 "metric": "late_submission_rate",
 "value": 0.9719,
 "comparison": "baseline",
 "delta": null,
 "context": "Withdrawn in CMA"
 }
 ]
 }
 ],
 "educational_implications": [
 "CMA lateness is widespread across returned outcome groups; this is descriptive submission evidence and does not establish motivation, engagement, or score effects."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is comprehensive and reflects consistent patterns across multiple assessment types and outcomes.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "behavioral",
 "explanation_type": "behavioral",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "group_comparison",
 "ai_summary_method_warning": null,
 "full_result_row_count": 11,
 "included_row_count": 11,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "submission_behaviour",
 "row_count": 11,
 "included_row_count": 11
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 11,
 "baseline_reference_tokens": 922,
 "task_aware_prompt_tokens": 4518,
 "token_ratio": 4.9002,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.weakest_group",
 "exceptions.dominant_group",
 "comparison.gaps"
 ],
 "task_output_contract": [
 "Preserve every returned final_outcome and assessment_type combination with student_count, submission_delay_avg, late_submission_rate, and punctuality_rate.",
 "Prioritize the highest-rate and largest-count groups without inventing causes, motivation, or outcome effects."
 ],
 "must_keep_keys": [
 "group_metrics",
 "group_series",
 "systemic_lateness_evidence"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (4.9002 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "group_comparison",
 "task_id": "A-G05",
 "task_output_contract": [
 "Preserve every returned final_outcome and assessment_type combination with student_count, submission_delay_avg, late_submission_rate, and punctuality_rate.",
 "Prioritize the highest-rate and largest-count groups without inventing causes, motivation, or outcome effects."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "submission_behaviour",
 "row_count": 11,
 "group_column": "final_outcome",
 "group_key_columns": [
 "final_outcome",
 "assessment_type"
 ],
 "series_column": "assessment_type",
 "metric_column": "late_submission_rate",
 "count_column": "student_count",
 "gap_column": null,
 "composite_group_keys": true
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "focus_summary": [],
 "group_metrics": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 }
 ],
 "group_series": [
 {
 "group": "Pass",
 "series_count": 3,
 "total_count": 2023,
 "weighted_average_metric": 0.4032,
 "series": [
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 }
 ]
 },
 {
 "group": "Withdrawn",
 "series_count": 2,
 "total_count": 960,
 "weighted_average_metric": 0.7212,
 "series": [
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 }
 ]
 },
 {
 "group": "Distinction",
 "series_count": 3,
 "total_count": 863,
 "weighted_average_metric": 0.3716,
 "series": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 }
 ]
 },
 {
 "group": "Fail",
 "series_count": 3,
 "total_count": 806,
 "weighted_average_metric": 0.5461,
 "series": [
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 }
 ]
 }
 ],
 "systemic_lateness_evidence": {
 "all_groups": [
 {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "CMA",
 "student_count": 359,
 "submission_delay_avg": 3.05,
 "late_submission_rate": 0.9807,
 "punctuality_rate": 0.0193
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA",
 "student_count": 595,
 "submission_delay_avg": 2.77,
 "late_submission_rate": 0.9719,
 "punctuality_rate": 0.0281
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA",
 "student_count": 365,
 "submission_delay_avg": 9.91,
 "late_submission_rate": 0.3124,
 "punctuality_rate": 0.6876
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "TMA",
 "student_count": 292,
 "submission_delay_avg": 7.66,
 "late_submission_rate": 0.3017,
 "punctuality_rate": 0.6983
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "TMA",
 "student_count": 608,
 "submission_delay_avg": 7.79,
 "late_submission_rate": 0.189,
 "punctuality_rate": 0.811
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "TMA",
 "student_count": 251,
 "submission_delay_avg": 6.02,
 "late_submission_rate": 0.0644,
 "punctuality_rate": 0.9356
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "Exam",
 "student_count": 707,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "Exam",
 "student_count": 306,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "Exam",
 "student_count": 155,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 }
 ],
 "highest_rate_group": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "submission_count": 1217,
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_risk_level": "high_lateness"
 },
 "largest_count_among_positive_late_rate": {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "submission_count": 2684,
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_risk_level": "high_lateness"
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_groups": [],
 "low_count_warnings": [],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from late_submission_rate relative to weighted cohort mean.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "group_comparison",
 "dataset_name": "submission_behaviour",
 "row_count": 11,
 "group_column": "final_outcome",
 "group_key_columns": [
 "final_outcome",
 "assessment_type"
 ],
 "series_column": "assessment_type",
 "composite_group_keys": true,
 "metric_column": "late_submission_rate",
 "count_column": "student_count",
 "gap_column": null,
 "group_metrics": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 }
 ],
 "group_series": [
 {
 "group": "Pass",
 "series_count": 3,
 "total_count": 2023,
 "weighted_average_metric": 0.4032,
 "series": [
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 }
 ]
 },
 {
 "group": "Withdrawn",
 "series_count": 2,
 "total_count": 960,
 "weighted_average_metric": 0.7212,
 "series": [
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 }
 ]
 },
 {
 "group": "Distinction",
 "series_count": 3,
 "total_count": 863,
 "weighted_average_metric": 0.3716,
 "series": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 }
 ]
 },
 {
 "group": "Fail",
 "series_count": 3,
 "total_count": 806,
 "weighted_average_metric": 0.5461,
 "series": [
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 }
 ]
 }
 ],
 "focus_summary": [],
 "gaps": [
 {
 "group": "Distinction",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9951,
 "student_count": 306
 },
 {
 "group": "Pass",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9899,
 "student_count": 708
 },
 {
 "group": "Fail",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9807,
 "student_count": 359
 },
 {
 "group": "Withdrawn",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9719,
 "student_count": 595
 },
 {
 "group": "Withdrawn",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.3124,
 "student_count": 365
 },
 {
 "group": "Fail",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.3017,
 "student_count": 292
 },
 {
 "group": "Pass",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.189,
 "student_count": 608
 },
 {
 "group": "Distinction",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.0644,
 "student_count": 251
 },
 {
 "group": "Pass",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0,
 "student_count": 707
 },
 {
 "group": "Fail",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0,
 "student_count": 155
 },
 {
 "group": "Distinction",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0,
 "student_count": 306
 }
 ],
 "dominant_group": {
 "group": "Pass",
 "student_count": 708,
 "basis": "largest_count"
 },
 "weakest_group": {
 "group": "Distinction",
 "late_submission_rate": 0,
 "basis": "most_negative_gap",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 "missing_groups": [],
 "low_count_warnings": [],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from late_submission_rate relative to weighted cohort mean.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "systemic_lateness_evidence": {
 "all_groups": [
 {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "CMA",
 "student_count": 359,
 "submission_delay_avg": 3.05,
 "late_submission_rate": 0.9807,
 "punctuality_rate": 0.0193
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA",
 "student_count": 595,
 "submission_delay_avg": 2.77,
 "late_submission_rate": 0.9719,
 "punctuality_rate": 0.0281
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA",
 "student_count": 365,
 "submission_delay_avg": 9.91,
 "late_submission_rate": 0.3124,
 "punctuality_rate": 0.6876
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "TMA",
 "student_count": 292,
 "submission_delay_avg": 7.66,
 "late_submission_rate": 0.3017,
 "punctuality_rate": 0.6983
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "TMA",
 "student_count": 608,
 "submission_delay_avg": 7.79,
 "late_submission_rate": 0.189,
 "punctuality_rate": 0.811
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "TMA",
 "student_count": 251,
 "submission_delay_avg": 6.02,
 "late_submission_rate": 0.0644,
 "punctuality_rate": 0.9356
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "Exam",
 "student_count": 707,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "Exam",
 "student_count": 306,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "Exam",
 "student_count": 155,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 }
 ],
 "highest_rate_group": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "submission_count": 1217,
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_risk_level": "high_lateness"
 },
 "largest_count_among_positive_late_rate": {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "submission_count": 2684,
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_risk_level": "high_lateness"
 }
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 12489,
 "token_usage": {
 "prompt_tokens": 5572,
 "completion_tokens": 634,
 "total_tokens": 6206
 },
 "strategy": "behavioral",
 "granularity": "per_assessment",
 "cost_usd": 0.001216
 }
 }
}
```

## Full-run Deterministic Checks

```json
[
 {
 "check_id": "row_count_total",
 "check_type": "row_count",
 "status": "pass",
 "expected": 11,
 "observed": 11
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "0b9ba8429b564f1c03c6a06d95144cb27e022db9b390353358d6703f83abda19",
 "expected_values": [
 "0b9ba8429b564f1c03c6a06d95144cb27e022db9b390353358d6703f83abda19"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "ca9b618abc86018d9f65f2bc87e4e9170e577022c2ad8a24ccbfeea104682c22",
 "expected": "ca9b618abc86018d9f65f2bc87e4e9170e577022c2ad8a24ccbfeea104682c22"
 },
 {
 "check_id": "numeric_fields_submission_behaviour",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "submission_behaviour",
 "numeric_columns": [
 "avg_score",
 "late_submission_rate",
 "net_submission_delay_avg",
 "punctuality_rate",
 "student_count",
 "submission_count",
 "submission_delay_avg"
 ],
 "numeric_summaries": {
 "avg_score": {
 "count": 11,
 "min": 31.29,
 "max": 94.75
 },
 "late_submission_rate": {
 "count": 11,
 "min": 0,
 "max": 0.9951
 },
 "net_submission_delay_avg": {
 "count": 11,
 "min": -4.74,
 "max": 2.85
 },
 "punctuality_rate": {
 "count": 11,
 "min": 0,
 "max": 0.9356
 },
 "student_count": {
 "count": 11,
 "min": 155,
 "max": 708
 },
 "submission_count": {
 "count": 11,
 "min": 155,
 "max": 2684
 },
 "submission_delay_avg": {
 "count": 11,
 "min": 0,
 "max": 9.91
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_submission_behaviour",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "submission_behaviour",
 "flag_columns": [
 "submission_risk_level"
 ],
 "triggered_like_counts": {
 "submission_risk_level": 0
 }
 }
]
```
