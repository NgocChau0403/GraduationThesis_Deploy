# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T08__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__S-T08__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "S-T08",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Assessment lateness impact",
 "scope": "1 student",
 "actionable_question": "Does submitting late actually lower my score?",
 "target_audience": "student",
 "ai_summary_type": "trend_series",
 "ai_prompt_hint": "Use submission_delay_avg [FE] and punctuality_rate [FE]. Explain how delay magnitude correlates with score drop.",
 "query_labels": [
 "submission_lateness"
 ],
 "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
 "source_tables": [
 "assessment_result",
 "assessment [OULAD only]"
 ],
 "key_db_fields": [
 "submission_delay_days",
 "score_normalized",
 "assessment_type; submission_delay_avg [FE cross]",
 "punctuality_rate [FE cross]"
 ],
 "output_schema": {},
 "query_labels": [
 "submission_lateness"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "S-T08-CORE-01",
 "description": "State average submission delay and punctuality rate."
 },
 {
 "requirement_id": "S-T08-CORE-02",
 "description": "Describe the observed relationship between delay magnitude and score."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "S-T08-CONSTRAINT-01",
 "description": "Use submission_delay_avg and punctuality_rate when returned."
 },
 {
 "constraint_id": "S-T08-CONSTRAINT-02",
 "description": "Frame the delay-score relationship as correlational, not causal."
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
 "dataset_label": "submission_lateness",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T08.json",
 "artifact_sha256": "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018",
 "row_count": 5,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 5,
 "prompt_embedded_row_count": 5,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018",
 "evidence_rows_sha256": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac",
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
 "full_result_row_count": 5,
 "embedded_datasets_sha256": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac",
 "datasets": {
 "submission_lateness": [
 {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "assessment_name": "24295",
 "submission_delay_days": 3,
 "score_normalized": 100,
 "pass_flag": true,
 "submission_day": 21,
 "due_day": 18,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 {
 "assessment_order": 3,
 "assessment_type": "CMA",
 "assessment_name": "24296",
 "submission_delay_days": 2,
 "score_normalized": 87,
 "pass_flag": true,
 "submission_day": 69,
 "due_day": 67,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 {
 "assessment_order": 5,
 "assessment_type": "CMA",
 "assessment_name": "24297",
 "submission_delay_days": 3,
 "score_normalized": 90,
 "pass_flag": true,
 "submission_day": 147,
 "due_day": 144,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 {
 "assessment_order": 8,
 "assessment_type": "CMA",
 "assessment_name": "24298",
 "submission_delay_days": 5,
 "score_normalized": 83,
 "pass_flag": true,
 "submission_day": 219,
 "due_day": 214,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 {
 "assessment_order": 9,
 "assessment_type": "Exam",
 "assessment_name": "24299",
 "submission_delay_days": null,
 "score_normalized": 96,
 "pass_flag": true,
 "submission_day": 244,
 "due_day": null,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T08__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "529144afa6988188649edce602299d572add630eb26dfc8a186274adbabf1c49",
 "generator_input_sha256": "889ab5c65f5896e61729a6a2fc62e664f7f94a25517565faf216b740681d4e9a",
 "generator_input_compact": {
 "task_id": "S-T08",
 "execution_id": "exec_1781847912365_48ce21c2",
 "task_name": "Assessment lateness impact",
 "analysis_type": "correlation",
 "explanation_strategy": "behavioral",
 "actionable_question": "Does submitting late actually lower my score?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "submission_lateness"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "submission_lateness"
 ],
 "dataset_row_counts": {
 "submission_lateness": 5
 },
 "ai_summary_config_summary": {
 "summary_type": "trend_series",
 "metric_column": "submission_delay_days",
 "entity_column": null,
 "group_column": null,
 "time_column": "assessment_order",
 "sort_by": null,
 "sort_direction": null,
 "top_k": null,
 "bottom_k": null,
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
 "raw_text": "Summary: submission_delay_avg=3.25; punctuality_rate=0; valid_pair_count=4; null_delay_count=1; exact delay-score pairs: assessment_order=1, delay_days=3, score=100 | assessment_order=3, delay_days=2, score=87 | assessment_order=5, delay_days=3, score=90 | assessment_order=8, delay_days=5, score=83; pearson_correlation=-0.4015; association_status=descriptive_only_not_statistically_reliable. Observed delay-score relationship: non_monotonic; delay_days=2 has score=87, delay_days=3 has scores=100 and 90, and the longest delay_days=5 has score=83; the descriptive correlation is -0.4015, but n=4 is not statistically reliable. Delay sequence is non_monotonic (3,2,3,5), and the Exam has null delay.\n\nEducational implications: Four paired observations can describe the returned association but cannot establish causality, procrastination, learning harm, or a reliable score effect.\n\nRecommendations: medium - Use deadline reminders or submission planning based on punctuality_rate=0. - This action is grounded in systematic lateness only; it does not claim that punctuality will improve scores.",
 "structured_payload": {
 "task_id": "S-T08",
 "execution_id": "exec_1781847912365_48ce21c2",
 "explanation": {
 "summary": "submission_delay_avg=3.25; punctuality_rate=0; valid_pair_count=4; null_delay_count=1; exact delay-score pairs: assessment_order=1, delay_days=3, score=100 | assessment_order=3, delay_days=2, score=87 | assessment_order=5, delay_days=3, score=90 | assessment_order=8, delay_days=5, score=83; pearson_correlation=-0.4015; association_status=descriptive_only_not_statistically_reliable. Observed delay-score relationship: non_monotonic; delay_days=2 has score=87, delay_days=3 has scores=100 and 90, and the longest delay_days=5 has score=83; the descriptive correlation is -0.4015, but n=4 is not statistically reliable. Delay sequence is non_monotonic (3,2,3,5), and the Exam has null delay.",
 "insights": [],
 "educational_implications": [
 "Four paired observations can describe the returned association but cannot establish causality, procrastination, learning harm, or a reliable score effect."
 ],
 "recommendations": [
 {
 "priority": "medium",
 "action": "Use deadline reminders or submission planning based on punctuality_rate=0.",
 "rationale": "This action is grounded in systematic lateness only; it does not claim that punctuality will improve scores."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data shows clear trends in submission delays and corresponding scores.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "behavioral",
 "explanation_type": "behavioral",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "trend_series",
 "ai_summary_method_warning": null,
 "full_result_row_count": 5,
 "included_row_count": 5,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "submission_lateness",
 "row_count": 5,
 "included_row_count": 5
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 5,
 "baseline_reference_tokens": 376,
 "task_aware_prompt_tokens": 1900,
 "token_ratio": 5.0532,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "trend_relationship",
 "exceptions",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.trough",
 "exceptions.peak",
 "trend_relationship.largest_adjacent_rise",
 "comparison.multi_dataset_evidence",
 "comparison.secondary_metric_associations"
 ],
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State submission_delay_avg, punctuality_rate, all valid delay-score pairs, the null Exam delay, and the deterministic descriptive correlation.",
 "With four valid pairs, label the relationship descriptive_only_not_statistically_reliable; do not claim monotonic delay growth, causality, or score benefit from punctuality."
 ],
 "must_keep_keys": [
 "action_evidence",
 "dataset_name",
 "delay_score_evidence",
 "first_point",
 "flagged_points",
 "largest_adjacent_drop",
 "last_point",
 "metric_column",
 "overall_change",
 "point_count",
 "row_count",
 "secondary_metric_evidence",
 "small_sample_caveats",
 "summarization_warnings",
 "time_column"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (5.0532 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "S-T08",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State submission_delay_avg, punctuality_rate, all valid delay-score pairs, the null Exam delay, and the deterministic descriptive correlation.",
 "With four valid pairs, label the relationship descriptive_only_not_statistically_reliable; do not claim monotonic delay growth, causality, or score benefit from punctuality."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "submission_lateness",
 "row_count": 5,
 "point_count": 4,
 "time_column": "assessment_order",
 "metric_column": "submission_delay_days",
 "dataset_roles": {},
 "metric_units": {
 "submission_delay_days": "days_relative_to_due_date",
 "submission_delay_avg": "days_late_average_positive_only",
 "punctuality_rate": "ratio_0_1",
 "score_normalized": "score_on_runtime_scale"
 },
 "metric_directions": {
 "submission_delay_days": "higher_is_worse",
 "submission_delay_avg": "higher_is_worse",
 "punctuality_rate": "higher_is_better",
 "score_normalized": "higher_is_better"
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "first_point": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "last_point": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": 2,
 "percent_change": 66.6667
 },
 "delay_score_evidence": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0",
 "valid_pair_count": 4,
 "null_delay_count": 1,
 "pairs": [
 {
 "assessment_order": 1,
 "delay": 3,
 "score": 100
 },
 {
 "assessment_order": 3,
 "delay": 2,
 "score": 87
 },
 {
 "assessment_order": 5,
 "delay": 3,
 "score": 90
 },
 {
 "assessment_order": 8,
 "delay": 5,
 "score": 83
 }
 ],
 "pearson_correlation": -0.4015,
 "association_status": "descriptive_only_not_statistically_reliable"
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "secondary_metric_evidence": {
 "score_normalized": {
 "count": 4,
 "min": 83,
 "max": 100,
 "first": 100,
 "last": 83
 },
 "submission_delay_avg": {
 "count": 4,
 "min": 3.25,
 "max": 3.25,
 "first": 3.25,
 "last": 3.25
 },
 "punctuality_rate": {
 "count": 4,
 "min": 0,
 "max": 0,
 "first": 0,
 "last": 0
 }
 }
 }
 },
 {
 "name": "trend_relationship",
 "facts": {
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": -1
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flagged_points": [
 {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 5,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24297"
 },
 "secondary_metrics": {
 "score_normalized": 90,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 }
 ]
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "action_evidence": []
 }
 },
 {
 "name": "limitations",
 "facts": {
 "small_sample_caveats": [
 {
 "point_count": 4,
 "minimum_sample_size": 6,
 "warning": "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 }
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Skipped 1 rows with invalid submission_delay_days.",
 "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_series",
 "dataset_name": "submission_lateness",
 "row_count": 5,
 "time_column": "assessment_order",
 "metric_column": "submission_delay_days",
 "metric_units": {
 "submission_delay_days": "days_relative_to_due_date",
 "submission_delay_avg": "days_late_average_positive_only",
 "punctuality_rate": "ratio_0_1",
 "score_normalized": "score_on_runtime_scale"
 },
 "metric_directions": {
 "submission_delay_days": "higher_is_worse",
 "submission_delay_avg": "higher_is_worse",
 "punctuality_rate": "higher_is_better",
 "score_normalized": "higher_is_better"
 },
 "dataset_roles": {},
 "point_count": 4,
 "first_point": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "last_point": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "peak": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "trough": {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": 2,
 "percent_change": 66.6667
 },
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": -1
 },
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 5,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24297"
 },
 "secondary_metrics": {
 "score_normalized": 90,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": 2
 },
 "flagged_points": [
 {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 5,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24297"
 },
 "secondary_metrics": {
 "score_normalized": 90,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 }
 ],
 "secondary_metric_evidence": {
 "score_normalized": {
 "count": 4,
 "min": 83,
 "max": 100,
 "first": 100,
 "last": 83
 },
 "submission_delay_avg": {
 "count": 4,
 "min": 3.25,
 "max": 3.25,
 "first": 3.25,
 "last": 3.25
 },
 "punctuality_rate": {
 "count": 4,
 "min": 0,
 "max": 0,
 "first": 0,
 "last": 0
 }
 },
 "secondary_metric_associations": {
 "score_normalized": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": -0.4015,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 },
 "submission_delay_avg": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 },
 "punctuality_rate": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 }
 },
 "multi_dataset_evidence": [],
 "small_sample_caveats": [
 {
 "point_count": 4,
 "minimum_sample_size": 6,
 "warning": "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 }
 ],
 "causal_claim_allowed": false,
 "action_evidence": [],
 "summarization_warnings": [
 "Skipped 1 rows with invalid submission_delay_days.",
 "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 ],
 "delay_score_evidence": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0",
 "valid_pair_count": 4,
 "null_delay_count": 1,
 "pairs": [
 {
 "assessment_order": 1,
 "delay": 3,
 "score": 100
 },
 {
 "assessment_order": 3,
 "delay": 2,
 "score": 87
 },
 {
 "assessment_order": 5,
 "delay": 3,
 "score": 90
 },
 {
 "assessment_order": 8,
 "delay": 5,
 "score": 83
 }
 ],
 "pearson_correlation": -0.4015,
 "association_status": "descriptive_only_not_statistically_reliable"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4889,
 "token_usage": {
 "prompt_tokens": 2495,
 "completion_tokens": 423,
 "total_tokens": 2918
 },
 "strategy": "behavioral",
 "granularity": "per_assessment",
 "cost_usd": 0.000628
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T08__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "529144afa6988188649edce602299d572add630eb26dfc8a186274adbabf1c49",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2495,
 "completion_tokens": 423,
 "total_tokens": 2918
 },
 "latency_ms": 4894,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-T08",
 "execution_id": "exec_1781847912365_48ce21c2",
 "explanation": {
 "summary": "submission_delay_avg=3.25; punctuality_rate=0; valid_pair_count=4; null_delay_count=1; exact delay-score pairs: assessment_order=1, delay_days=3, score=100 | assessment_order=3, delay_days=2, score=87 | assessment_order=5, delay_days=3, score=90 | assessment_order=8, delay_days=5, score=83; pearson_correlation=-0.4015; association_status=descriptive_only_not_statistically_reliable. Observed delay-score relationship: non_monotonic; delay_days=2 has score=87, delay_days=3 has scores=100 and 90, and the longest delay_days=5 has score=83; the descriptive correlation is -0.4015, but n=4 is not statistically reliable. Delay sequence is non_monotonic (3,2,3,5), and the Exam has null delay.",
 "insights": [],
 "educational_implications": [
 "Four paired observations can describe the returned association but cannot establish causality, procrastination, learning harm, or a reliable score effect."
 ],
 "recommendations": [
 {
 "priority": "medium",
 "action": "Use deadline reminders or submission planning based on punctuality_rate=0.",
 "rationale": "This action is grounded in systematic lateness only; it does not claim that punctuality will improve scores."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data shows clear trends in submission delays and corresponding scores.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "behavioral",
 "explanation_type": "behavioral",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "trend_series",
 "ai_summary_method_warning": null,
 "full_result_row_count": 5,
 "included_row_count": 5,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "submission_lateness",
 "row_count": 5,
 "included_row_count": 5
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 5,
 "baseline_reference_tokens": 376,
 "task_aware_prompt_tokens": 1900,
 "token_ratio": 5.0532,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "trend_relationship",
 "exceptions",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.trough",
 "exceptions.peak",
 "trend_relationship.largest_adjacent_rise",
 "comparison.multi_dataset_evidence",
 "comparison.secondary_metric_associations"
 ],
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State submission_delay_avg, punctuality_rate, all valid delay-score pairs, the null Exam delay, and the deterministic descriptive correlation.",
 "With four valid pairs, label the relationship descriptive_only_not_statistically_reliable; do not claim monotonic delay growth, causality, or score benefit from punctuality."
 ],
 "must_keep_keys": [
 "action_evidence",
 "dataset_name",
 "delay_score_evidence",
 "first_point",
 "flagged_points",
 "largest_adjacent_drop",
 "last_point",
 "metric_column",
 "overall_change",
 "point_count",
 "row_count",
 "secondary_metric_evidence",
 "small_sample_caveats",
 "summarization_warnings",
 "time_column"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (5.0532 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "S-T08",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State submission_delay_avg, punctuality_rate, all valid delay-score pairs, the null Exam delay, and the deterministic descriptive correlation.",
 "With four valid pairs, label the relationship descriptive_only_not_statistically_reliable; do not claim monotonic delay growth, causality, or score benefit from punctuality."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "submission_lateness",
 "row_count": 5,
 "point_count": 4,
 "time_column": "assessment_order",
 "metric_column": "submission_delay_days",
 "dataset_roles": {},
 "metric_units": {
 "submission_delay_days": "days_relative_to_due_date",
 "submission_delay_avg": "days_late_average_positive_only",
 "punctuality_rate": "ratio_0_1",
 "score_normalized": "score_on_runtime_scale"
 },
 "metric_directions": {
 "submission_delay_days": "higher_is_worse",
 "submission_delay_avg": "higher_is_worse",
 "punctuality_rate": "higher_is_better",
 "score_normalized": "higher_is_better"
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "first_point": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "last_point": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": 2,
 "percent_change": 66.6667
 },
 "delay_score_evidence": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0",
 "valid_pair_count": 4,
 "null_delay_count": 1,
 "pairs": [
 {
 "assessment_order": 1,
 "delay": 3,
 "score": 100
 },
 {
 "assessment_order": 3,
 "delay": 2,
 "score": 87
 },
 {
 "assessment_order": 5,
 "delay": 3,
 "score": 90
 },
 {
 "assessment_order": 8,
 "delay": 5,
 "score": 83
 }
 ],
 "pearson_correlation": -0.4015,
 "association_status": "descriptive_only_not_statistically_reliable"
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "secondary_metric_evidence": {
 "score_normalized": {
 "count": 4,
 "min": 83,
 "max": 100,
 "first": 100,
 "last": 83
 },
 "submission_delay_avg": {
 "count": 4,
 "min": 3.25,
 "max": 3.25,
 "first": 3.25,
 "last": 3.25
 },
 "punctuality_rate": {
 "count": 4,
 "min": 0,
 "max": 0,
 "first": 0,
 "last": 0
 }
 }
 }
 },
 {
 "name": "trend_relationship",
 "facts": {
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": -1
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flagged_points": [
 {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 5,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24297"
 },
 "secondary_metrics": {
 "score_normalized": 90,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 }
 ]
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "action_evidence": []
 }
 },
 {
 "name": "limitations",
 "facts": {
 "small_sample_caveats": [
 {
 "point_count": 4,
 "minimum_sample_size": 6,
 "warning": "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 }
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Skipped 1 rows with invalid submission_delay_days.",
 "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_series",
 "dataset_name": "submission_lateness",
 "row_count": 5,
 "time_column": "assessment_order",
 "metric_column": "submission_delay_days",
 "metric_units": {
 "submission_delay_days": "days_relative_to_due_date",
 "submission_delay_avg": "days_late_average_positive_only",
 "punctuality_rate": "ratio_0_1",
 "score_normalized": "score_on_runtime_scale"
 },
 "metric_directions": {
 "submission_delay_days": "higher_is_worse",
 "submission_delay_avg": "higher_is_worse",
 "punctuality_rate": "higher_is_better",
 "score_normalized": "higher_is_better"
 },
 "dataset_roles": {},
 "point_count": 4,
 "first_point": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "last_point": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "peak": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "trough": {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": 2,
 "percent_change": 66.6667
 },
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": -1
 },
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 5,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24297"
 },
 "secondary_metrics": {
 "score_normalized": 90,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": 2
 },
 "flagged_points": [
 {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 5,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24297"
 },
 "secondary_metrics": {
 "score_normalized": 90,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 }
 ],
 "secondary_metric_evidence": {
 "score_normalized": {
 "count": 4,
 "min": 83,
 "max": 100,
 "first": 100,
 "last": 83
 },
 "submission_delay_avg": {
 "count": 4,
 "min": 3.25,
 "max": 3.25,
 "first": 3.25,
 "last": 3.25
 },
 "punctuality_rate": {
 "count": 4,
 "min": 0,
 "max": 0,
 "first": 0,
 "last": 0
 }
 },
 "secondary_metric_associations": {
 "score_normalized": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": -0.4015,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 },
 "submission_delay_avg": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 },
 "punctuality_rate": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 }
 },
 "multi_dataset_evidence": [],
 "small_sample_caveats": [
 {
 "point_count": 4,
 "minimum_sample_size": 6,
 "warning": "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 }
 ],
 "causal_claim_allowed": false,
 "action_evidence": [],
 "summarization_warnings": [
 "Skipped 1 rows with invalid submission_delay_days.",
 "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 ],
 "delay_score_evidence": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0",
 "valid_pair_count": 4,
 "null_delay_count": 1,
 "pairs": [
 {
 "assessment_order": 1,
 "delay": 3,
 "score": 100
 },
 {
 "assessment_order": 3,
 "delay": 2,
 "score": 87
 },
 {
 "assessment_order": 5,
 "delay": 3,
 "score": 90
 },
 {
 "assessment_order": 8,
 "delay": 5,
 "score": 83
 }
 ],
 "pearson_correlation": -0.4015,
 "association_status": "descriptive_only_not_statistically_reliable"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4889,
 "token_usage": {
 "prompt_tokens": 2495,
 "completion_tokens": 423,
 "total_tokens": 2918
 },
 "strategy": "behavioral",
 "granularity": "per_assessment",
 "cost_usd": 0.000628
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
 "expected": 5,
 "observed": 5
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018",
 "expected_values": [
 "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac",
 "expected": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac"
 },
 {
 "check_id": "numeric_fields_submission_lateness",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "submission_lateness",
 "numeric_columns": [
 "assessment_order",
 "score_normalized",
 "submission_day",
 "due_day",
 "submission_delay_days"
 ],
 "numeric_summaries": {
 "assessment_order": {
 "count": 5,
 "min": 1,
 "max": 9
 },
 "score_normalized": {
 "count": 5,
 "min": 83,
 "max": 100
 },
 "submission_day": {
 "count": 5,
 "min": 21,
 "max": 244
 },
 "due_day": {
 "count": 4,
 "min": 18,
 "max": 214
 },
 "submission_delay_days": {
 "count": 4,
 "min": 2,
 "max": 5
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_submission_lateness",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "submission_lateness",
 "flag_columns": [
 "pass_flag"
 ],
 "triggered_like_counts": {
 "pass_flag": 5
 }
 }
]
```
