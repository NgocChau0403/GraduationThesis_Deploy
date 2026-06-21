# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T12__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__S-T12__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "S-T12",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Procrastination analysis",
 "scope": "1 student",
 "actionable_question": "Am I a procrastinator and is it costing me marks?",
 "target_audience": "student",
 "ai_summary_type": "trend_series",
 "ai_prompt_hint": "Use submission_delay_avg [FE]. Identify if late submission is systematic. Link to score.",
 "query_labels": [
 "submission_series",
 "punctuality_summary"
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
 "pass_flag; submission_delay_avg [FE cross]",
 "punctuality_rate [FE cross]"
 ],
 "output_schema": {},
 "query_labels": [
 "submission_series",
 "punctuality_summary"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "S-T12-CORE-01",
 "description": "Identify whether late submission is systematic."
 },
 {
 "requirement_id": "S-T12-CORE-02",
 "description": "Describe the observed relationship between submission delay and score."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "S-T12-CONSTRAINT-01",
 "description": "Use submission_delay_avg as the primary delay metric; do not infer procrastination from score alone."
 },
 {
 "constraint_id": "S-T12-CONSTRAINT-02",
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
 "dataset_label": "submission_series",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T12.json",
 "artifact_sha256": "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
 "row_count": 5,
 "readable": true
 },
 {
 "dataset_label": "punctuality_summary",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T12.json",
 "artifact_sha256": "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
 "row_count": 1,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 6,
 "prompt_embedded_row_count": 6,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
 "evidence_rows_sha256": "2fbb4764f0f67c70091c032fff1ee6bb068b44c276b0fc288fa6fc5fddd3d3a5",
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
 "full_result_row_count": 6,
 "embedded_datasets_sha256": "2fbb4764f0f67c70091c032fff1ee6bb068b44c276b0fc288fa6fc5fddd3d3a5",
 "datasets": {
 "submission_series": [
 {
 "assessment_order": 1,
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "due_day": 18,
 "submission_day": 21,
 "submission_delay_days": 3,
 "score_normalized": 100,
 "pass_flag": true
 },
 {
 "assessment_order": 3,
 "assessment_name": "24296",
 "assessment_type": "CMA",
 "due_day": 67,
 "submission_day": 69,
 "submission_delay_days": 2,
 "score_normalized": 87,
 "pass_flag": true
 },
 {
 "assessment_order": 5,
 "assessment_name": "24297",
 "assessment_type": "CMA",
 "due_day": 144,
 "submission_day": 147,
 "submission_delay_days": 3,
 "score_normalized": 90,
 "pass_flag": true
 },
 {
 "assessment_order": 8,
 "assessment_name": "24298",
 "assessment_type": "CMA",
 "due_day": 214,
 "submission_day": 219,
 "submission_delay_days": 5,
 "score_normalized": 83,
 "pass_flag": true
 },
 {
 "assessment_order": 9,
 "assessment_name": "24299",
 "assessment_type": "Exam",
 "due_day": null,
 "submission_day": 244,
 "submission_delay_days": null,
 "score_normalized": 96,
 "pass_flag": true
 }
 ],
 "punctuality_summary": [
 {
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
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T12__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "840baa179ba887f095d9fdb513cc75be64bdaf1434d70806dfebe2dd21cd12a2",
 "generator_input_sha256": "05b8e1083278dd82c7508314f851e341be99b90587c7a073698bca7111eb1934",
 "generator_input_compact": {
 "task_id": "S-T12",
 "execution_id": "exec_1781847915522_4f14f1c0",
 "task_name": "Procrastination analysis",
 "analysis_type": "distribution",
 "explanation_strategy": "behavioral",
 "actionable_question": "Am I a procrastinator and is it costing me marks?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "submission_series",
 "punctuality_summary"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "submission_series",
 "punctuality_summary"
 ],
 "dataset_row_counts": {
 "submission_series": 5,
 "punctuality_summary": 1
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
 "task_id": "S-T12",
 "execution_id": "exec_1781847915522_4f14f1c0",
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
 "reason": "The data provided is sufficient to identify trends in submission behavior.",
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
 "full_result_row_count": 6,
 "included_row_count": 6,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "submission_series",
 "row_count": 5,
 "included_row_count": 5
 },
 {
 "dataset_name": "punctuality_summary",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 6,
 "baseline_reference_tokens": 323,
 "task_aware_prompt_tokens": 1730,
 "token_ratio": 5.356,
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
 "comparison.secondary_metric_associations",
 "comparison.secondary_metric_evidence"
 ],
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State systematic lateness from submission_delay_avg and punctuality_rate, all valid delay-score pairs, the null Exam delay, and the deterministic descriptive correlation.",
 "With four valid pairs, label the relationship descriptive_only_not_statistically_reliable; do not infer procrastination, learning harm, or causal score effects."
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
 "multi_dataset_evidence",
 "overall_change",
 "point_count",
 "row_count",
 "small_sample_caveats",
 "summarization_warnings",
 "time_column"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (5.356 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "S-T12",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State systematic lateness from submission_delay_avg and punctuality_rate, all valid delay-score pairs, the null Exam delay, and the deterministic descriptive correlation.",
 "With four valid pairs, label the relationship descriptive_only_not_statistically_reliable; do not infer procrastination, learning harm, or causal score effects."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "submission_series",
 "row_count": 5,
 "point_count": 4,
 "time_column": "assessment_order",
 "metric_column": "submission_delay_days",
 "dataset_roles": {
 "submission_series": "primary_series",
 "punctuality_summary": "context_summary"
 },
 "metric_units": {
 "submission_delay_days": "days_relative_to_due_date",
 "score_normalized": "score_on_runtime_scale"
 },
 "metric_directions": {
 "submission_delay_days": "higher_is_worse",
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
 "score_normalized": 100
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
 "score_normalized": 83
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
 "score_normalized": 100
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
 "score_normalized": 83
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
 "multi_dataset_evidence": [
 {
 "dataset_name": "punctuality_summary",
 "role": "context_summary",
 "row_count": 1,
 "columns": [
 "submission_delay_avg",
 "punctuality_rate"
 ],
 "first_row": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 "numeric_stats": {
 "submission_delay_avg": {
 "count": 1,
 "min": 3.25,
 "max": 3.25,
 "avg": 3.25
 },
 "punctuality_rate": {
 "count": 1,
 "min": 0,
 "max": 0,
 "avg": 0
 }
 }
 }
 ]
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
 "score_normalized": 100
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
 "score_normalized": 87
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
 "score_normalized": 100
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
 "score_normalized": 87
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
 "score_normalized": 90
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
 "score_normalized": 83
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
 "dataset_name": "submission_series",
 "row_count": 5,
 "time_column": "assessment_order",
 "metric_column": "submission_delay_days",
 "metric_units": {
 "submission_delay_days": "days_relative_to_due_date",
 "score_normalized": "score_on_runtime_scale"
 },
 "metric_directions": {
 "submission_delay_days": "higher_is_worse",
 "score_normalized": "higher_is_better"
 },
 "dataset_roles": {
 "submission_series": "primary_series",
 "punctuality_summary": "context_summary"
 },
 "point_count": 4,
 "first_point": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100
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
 "score_normalized": 83
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
 "score_normalized": 83
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
 "score_normalized": 87
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
 "score_normalized": 100
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
 "score_normalized": 83
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
 "score_normalized": 100
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
 "score_normalized": 87
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
 "score_normalized": 90
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
 "score_normalized": 83
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
 "score_normalized": 100
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
 "score_normalized": 87
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
 "score_normalized": 90
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
 "score_normalized": 83
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
 }
 },
 "secondary_metric_associations": {
 "score_normalized": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": -0.4015,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 }
 },
 "multi_dataset_evidence": [
 {
 "dataset_name": "punctuality_summary",
 "role": "context_summary",
 "row_count": 1,
 "columns": [
 "submission_delay_avg",
 "punctuality_rate"
 ],
 "first_row": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 "numeric_stats": {
 "submission_delay_avg": {
 "count": 1,
 "min": 3.25,
 "max": 3.25,
 "avg": 3.25
 },
 "punctuality_rate": {
 "count": 1,
 "min": 0,
 "max": 0,
 "avg": 0
 }
 }
 }
 ],
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
 "latency_ms": 6441,
 "token_usage": {
 "prompt_tokens": 2222,
 "completion_tokens": 458,
 "total_tokens": 2680
 },
 "strategy": "behavioral",
 "granularity": "per_assessment",
 "cost_usd": 0.000608
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T12__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "840baa179ba887f095d9fdb513cc75be64bdaf1434d70806dfebe2dd21cd12a2",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2222,
 "completion_tokens": 458,
 "total_tokens": 2680
 },
 "latency_ms": 6446,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-T12",
 "execution_id": "exec_1781847915522_4f14f1c0",
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
 "reason": "The data provided is sufficient to identify trends in submission behavior.",
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
 "full_result_row_count": 6,
 "included_row_count": 6,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "submission_series",
 "row_count": 5,
 "included_row_count": 5
 },
 {
 "dataset_name": "punctuality_summary",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 6,
 "baseline_reference_tokens": 323,
 "task_aware_prompt_tokens": 1730,
 "token_ratio": 5.356,
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
 "comparison.secondary_metric_associations",
 "comparison.secondary_metric_evidence"
 ],
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State systematic lateness from submission_delay_avg and punctuality_rate, all valid delay-score pairs, the null Exam delay, and the deterministic descriptive correlation.",
 "With four valid pairs, label the relationship descriptive_only_not_statistically_reliable; do not infer procrastination, learning harm, or causal score effects."
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
 "multi_dataset_evidence",
 "overall_change",
 "point_count",
 "row_count",
 "small_sample_caveats",
 "summarization_warnings",
 "time_column"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (5.356 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "S-T12",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State systematic lateness from submission_delay_avg and punctuality_rate, all valid delay-score pairs, the null Exam delay, and the deterministic descriptive correlation.",
 "With four valid pairs, label the relationship descriptive_only_not_statistically_reliable; do not infer procrastination, learning harm, or causal score effects."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "submission_series",
 "row_count": 5,
 "point_count": 4,
 "time_column": "assessment_order",
 "metric_column": "submission_delay_days",
 "dataset_roles": {
 "submission_series": "primary_series",
 "punctuality_summary": "context_summary"
 },
 "metric_units": {
 "submission_delay_days": "days_relative_to_due_date",
 "score_normalized": "score_on_runtime_scale"
 },
 "metric_directions": {
 "submission_delay_days": "higher_is_worse",
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
 "score_normalized": 100
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
 "score_normalized": 83
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
 "score_normalized": 100
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
 "score_normalized": 83
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
 "multi_dataset_evidence": [
 {
 "dataset_name": "punctuality_summary",
 "role": "context_summary",
 "row_count": 1,
 "columns": [
 "submission_delay_avg",
 "punctuality_rate"
 ],
 "first_row": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 "numeric_stats": {
 "submission_delay_avg": {
 "count": 1,
 "min": 3.25,
 "max": 3.25,
 "avg": 3.25
 },
 "punctuality_rate": {
 "count": 1,
 "min": 0,
 "max": 0,
 "avg": 0
 }
 }
 }
 ]
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
 "score_normalized": 100
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
 "score_normalized": 87
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
 "score_normalized": 100
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
 "score_normalized": 87
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
 "score_normalized": 90
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
 "score_normalized": 83
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
 "dataset_name": "submission_series",
 "row_count": 5,
 "time_column": "assessment_order",
 "metric_column": "submission_delay_days",
 "metric_units": {
 "submission_delay_days": "days_relative_to_due_date",
 "score_normalized": "score_on_runtime_scale"
 },
 "metric_directions": {
 "submission_delay_days": "higher_is_worse",
 "score_normalized": "higher_is_better"
 },
 "dataset_roles": {
 "submission_series": "primary_series",
 "punctuality_summary": "context_summary"
 },
 "point_count": 4,
 "first_point": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100
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
 "score_normalized": 83
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
 "score_normalized": 83
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
 "score_normalized": 87
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
 "score_normalized": 100
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
 "score_normalized": 83
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
 "score_normalized": 100
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
 "score_normalized": 87
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
 "score_normalized": 90
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
 "score_normalized": 83
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
 "score_normalized": 100
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
 "score_normalized": 87
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
 "score_normalized": 90
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
 "score_normalized": 83
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
 }
 },
 "secondary_metric_associations": {
 "score_normalized": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": -0.4015,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 }
 },
 "multi_dataset_evidence": [
 {
 "dataset_name": "punctuality_summary",
 "role": "context_summary",
 "row_count": 1,
 "columns": [
 "submission_delay_avg",
 "punctuality_rate"
 ],
 "first_row": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 "numeric_stats": {
 "submission_delay_avg": {
 "count": 1,
 "min": 3.25,
 "max": 3.25,
 "avg": 3.25
 },
 "punctuality_rate": {
 "count": 1,
 "min": 0,
 "max": 0,
 "avg": 0
 }
 }
 }
 ],
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
 "latency_ms": 6441,
 "token_usage": {
 "prompt_tokens": 2222,
 "completion_tokens": 458,
 "total_tokens": 2680
 },
 "strategy": "behavioral",
 "granularity": "per_assessment",
 "cost_usd": 0.000608
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
 "expected": 6,
 "observed": 6
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
 "expected_values": [
 "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
 "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "2fbb4764f0f67c70091c032fff1ee6bb068b44c276b0fc288fa6fc5fddd3d3a5",
 "expected": "2fbb4764f0f67c70091c032fff1ee6bb068b44c276b0fc288fa6fc5fddd3d3a5"
 },
 {
 "check_id": "numeric_fields_submission_series",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "submission_series",
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
 "check_id": "threshold_flag_fields_submission_series",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "submission_series",
 "flag_columns": [
 "pass_flag"
 ],
 "triggered_like_counts": {
 "pass_flag": 5
 }
 },
 {
 "check_id": "numeric_fields_punctuality_summary",
 "check_type": "numeric_field_extraction",
 "status": "not_applicable",
 "dataset_label": "punctuality_summary",
 "numeric_columns": [],
 "numeric_summaries": {}
 },
 {
 "check_id": "threshold_flag_fields_punctuality_summary",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "punctuality_summary",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```
