# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S06__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-S06__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-S06",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Student submission & punctuality",
 "scope": "1 student",
 "actionable_question": "Is this student consistently submitting late and does it affect their score?",
 "target_audience": "instructor",
 "ai_summary_type": "trend_series",
 "ai_prompt_hint": "State average delay and punctuality rate. Identify if late submission is systematic. Suggest deadline reminder or check-in.",
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
 "requirement_id": "A-S06-CORE-01",
 "description": "State average delay and punctuality rate."
 },
 {
 "requirement_id": "A-S06-CORE-02",
 "description": "Identify if late submission is systematic."
 },
 {
 "requirement_id": "A-S06-CORE-03",
 "description": "Suggest deadline reminder or check-in."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-S06-CONSTRAINT-01",
 "description": "Do not characterise late submission as low motivation or a personal failing."
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
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-S06.json",
 "artifact_sha256": "aef5d644155efdeec9f02e9414f63b1a5ab22ca599acc2e4ced933ec0c05c649",
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
 "evidence_artifact_file_sha256": "aef5d644155efdeec9f02e9414f63b1a5ab22ca599acc2e4ced933ec0c05c649",
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
 "due_day": 18,
 "submission_day": 21,
 "submission_delay_days": 3,
 "score_normalized": 100,
 "pass_flag": true,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 {
 "assessment_order": 3,
 "assessment_type": "CMA",
 "assessment_name": "24296",
 "due_day": 67,
 "submission_day": 69,
 "submission_delay_days": 2,
 "score_normalized": 87,
 "pass_flag": true,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 {
 "assessment_order": 5,
 "assessment_type": "CMA",
 "assessment_name": "24297",
 "due_day": 144,
 "submission_day": 147,
 "submission_delay_days": 3,
 "score_normalized": 90,
 "pass_flag": true,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 {
 "assessment_order": 8,
 "assessment_type": "CMA",
 "assessment_name": "24298",
 "due_day": 214,
 "submission_day": 219,
 "submission_delay_days": 5,
 "score_normalized": 83,
 "pass_flag": true,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 {
 "assessment_order": 9,
 "assessment_type": "Exam",
 "assessment_name": "24299",
 "due_day": null,
 "submission_day": 244,
 "submission_delay_days": null,
 "score_normalized": 96,
 "pass_flag": true,
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
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-S06__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "cdb03a618ca56e9b4b71dca4bb1397ec2354ad794555b770f9dce26d3fbe360b",
 "generator_input_sha256": "cb2dd58edf358fa0f59a350863630c3a86cc3b12d22295c705d63f7e79f831e8",
 "generator_input_compact": {
 "task_id": "A-S06",
 "execution_id": "exec_1781847835631_7a5d6a8f",
 "task_name": "Student submission & punctuality",
 "analysis_type": "distribution",
 "explanation_strategy": "behavioral",
 "actionable_question": "Is this student consistently submitting late and does it affect their score?",
 "target_audience": [
 "instructor"
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
 "raw_text": "Summary: submission_delay_avg=3.25; punctuality_rate=0; valid_delay_count=4; null_delay_count=1; all_valid_submissions_late=True; association_status=descriptive_only_not_statistically_reliable because paired_point_count=4 is below minimum 6.\n\nInsights: Consistent Late Submissions: The student has submitted all assessments late, with delays ranging from 2 to 5 days. This pattern suggests a lack of adherence to deadlines, which may impact future engagement and performance.\n\nEducational implications: The returned lateness pattern supports deadline reminders or a check-in, but it does not establish effects on scores, motivation, or engagement.\n\nRecommendations: medium - Send a deadline reminder or conduct a check-in about the returned late-submission pattern. - All four valid delay observations are late and punctuality_rate=0; no score-effect claim is made.",
 "structured_payload": {
 "task_id": "A-S06",
 "execution_id": "exec_1781847835631_7a5d6a8f",
 "explanation": {
 "summary": "submission_delay_avg=3.25; punctuality_rate=0; valid_delay_count=4; null_delay_count=1; all_valid_submissions_late=True; association_status=descriptive_only_not_statistically_reliable because paired_point_count=4 is below minimum 6.",
 "insights": [
 {
 "title": "Consistent Late Submissions",
 "description": "The student has submitted all assessments late, with delays ranging from 2 to 5 days. This pattern suggests a lack of adherence to deadlines, which may impact future engagement and performance.",
 "severity": "high",
 "evidence": [
 {
 "metric": "submission_delay_avg",
 "value": 3.25,
 "comparison": "stable",
 "delta": null,
 "context": "Average delay across assessments"
 },
 {
 "metric": "punctuality_rate",
 "value": "0",
 "comparison": "stable",
 "delta": null,
 "context": "Indicates no timely submissions"
 }
 ]
 }
 ],
 "educational_implications": [
 "The returned lateness pattern supports deadline reminders or a check-in, but it does not establish effects on scores, motivation, or engagement."
 ],
 "recommendations": [
 {
 "priority": "medium",
 "action": "Send a deadline reminder or conduct a check-in about the returned late-submission pattern.",
 "rationale": "All four valid delay observations are late and punctuality_rate=0; no score-effect claim is made."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is consistent and sufficient for analysis, with clear patterns observed in submission behavior.",
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
 "task_aware_prompt_tokens": 1834,
 "token_ratio": 4.8777,
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
 "State exact average delay, punctuality rate, valid late-submission count, and null-delay count.",
 "With fewer than six paired points, do not claim delay affects scores, motivation, or engagement; ground reminders/check-ins only in punctuality evidence."
 ],
 "must_keep_keys": [
 "action_evidence",
 "dataset_name",
 "first_point",
 "flagged_points",
 "largest_adjacent_drop",
 "last_point",
 "lateness_evidence",
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (4.8777 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "A-S06",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State exact average delay, punctuality rate, valid late-submission count, and null-delay count.",
 "With fewer than six paired points, do not claim delay affects scores, motivation, or engagement; ground reminders/check-ins only in punctuality evidence."
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
 "lateness_evidence": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0",
 "valid_delay_count": 4,
 "null_delay_count": 1,
 "all_valid_submissions_late": true,
 "association_status": "descriptive_only_not_statistically_reliable",
 "paired_point_count": 4,
 "minimum_reliable_point_count": 6
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
 "lateness_evidence": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0",
 "valid_delay_count": 4,
 "null_delay_count": 1,
 "all_valid_submissions_late": true,
 "association_status": "descriptive_only_not_statistically_reliable",
 "paired_point_count": 4,
 "minimum_reliable_point_count": 6
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5236,
 "token_usage": {
 "prompt_tokens": 2427,
 "completion_tokens": 363,
 "total_tokens": 2790
 },
 "strategy": "behavioral",
 "granularity": "per_assessment",
 "cost_usd": 0.000582
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-S06__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "cdb03a618ca56e9b4b71dca4bb1397ec2354ad794555b770f9dce26d3fbe360b",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2427,
 "completion_tokens": 363,
 "total_tokens": 2790
 },
 "latency_ms": 5242,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-S06",
 "execution_id": "exec_1781847835631_7a5d6a8f",
 "explanation": {
 "summary": "submission_delay_avg=3.25; punctuality_rate=0; valid_delay_count=4; null_delay_count=1; all_valid_submissions_late=True; association_status=descriptive_only_not_statistically_reliable because paired_point_count=4 is below minimum 6.",
 "insights": [
 {
 "title": "Consistent Late Submissions",
 "description": "The student has submitted all assessments late, with delays ranging from 2 to 5 days. This pattern suggests a lack of adherence to deadlines, which may impact future engagement and performance.",
 "severity": "high",
 "evidence": [
 {
 "metric": "submission_delay_avg",
 "value": 3.25,
 "comparison": "stable",
 "delta": null,
 "context": "Average delay across assessments"
 },
 {
 "metric": "punctuality_rate",
 "value": "0",
 "comparison": "stable",
 "delta": null,
 "context": "Indicates no timely submissions"
 }
 ]
 }
 ],
 "educational_implications": [
 "The returned lateness pattern supports deadline reminders or a check-in, but it does not establish effects on scores, motivation, or engagement."
 ],
 "recommendations": [
 {
 "priority": "medium",
 "action": "Send a deadline reminder or conduct a check-in about the returned late-submission pattern.",
 "rationale": "All four valid delay observations are late and punctuality_rate=0; no score-effect claim is made."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is consistent and sufficient for analysis, with clear patterns observed in submission behavior.",
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
 "task_aware_prompt_tokens": 1834,
 "token_ratio": 4.8777,
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
 "State exact average delay, punctuality rate, valid late-submission count, and null-delay count.",
 "With fewer than six paired points, do not claim delay affects scores, motivation, or engagement; ground reminders/check-ins only in punctuality evidence."
 ],
 "must_keep_keys": [
 "action_evidence",
 "dataset_name",
 "first_point",
 "flagged_points",
 "largest_adjacent_drop",
 "last_point",
 "lateness_evidence",
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (4.8777 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "A-S06",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State exact average delay, punctuality rate, valid late-submission count, and null-delay count.",
 "With fewer than six paired points, do not claim delay affects scores, motivation, or engagement; ground reminders/check-ins only in punctuality evidence."
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
 "lateness_evidence": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0",
 "valid_delay_count": 4,
 "null_delay_count": 1,
 "all_valid_submissions_late": true,
 "association_status": "descriptive_only_not_statistically_reliable",
 "paired_point_count": 4,
 "minimum_reliable_point_count": 6
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
 "lateness_evidence": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0",
 "valid_delay_count": 4,
 "null_delay_count": 1,
 "all_valid_submissions_late": true,
 "association_status": "descriptive_only_not_statistically_reliable",
 "paired_point_count": 4,
 "minimum_reliable_point_count": 6
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5236,
 "token_usage": {
 "prompt_tokens": 2427,
 "completion_tokens": 363,
 "total_tokens": 2790
 },
 "strategy": "behavioral",
 "granularity": "per_assessment",
 "cost_usd": 0.000582
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
 "observed": "aef5d644155efdeec9f02e9414f63b1a5ab22ca599acc2e4ced933ec0c05c649",
 "expected_values": [
 "aef5d644155efdeec9f02e9414f63b1a5ab22ca599acc2e4ced933ec0c05c649"
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
