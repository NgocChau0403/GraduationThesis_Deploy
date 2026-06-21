# LLM Judge V2 Prompt Queue Packet

## Session-Static Judge Contract Reference

The Judge Prompt is intentionally not embedded in this record packet. The session must load and verify it once, then combine it with this record-specific context.

```json
{
 "static_prompt_path": "Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md",
 "static_prompt_sha256": "e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517"
}
```

## Full Final Judge Context

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C04__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__A-C04__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "A-C04",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Compare lifestyle context",
 "scope": "2 students",
 "actionable_question": "Which lifestyle context dimensions differ most between these two students?",
 "target_audience": "instructor, academic_advisor",
 "ai_summary_type": "multi_metric_comparison",
 "ai_prompt_hint": "Compare lifestyle_dimension rows for the two students. Highlight the largest dimension gaps. Use composite_lifestyle_risk_score and social_balance_score only as supporting context. Frame lifestyle differences as context only, not causal judgement.",
 "query_labels": [
 "lifestyle_comparison"
 ],
 "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
 "source_tables": [
 "student",
 "enrollment [UCI only]"
 ],
 "key_db_fields": [
 "student_id [FE cross]",
 "lifestyle_dimension [FE cross]",
 "lifestyle_risk_score [FE cross]",
 "alcohol_weekday",
 "alcohol_weekend",
 "go_out_freq",
 "health_status",
 "free_time",
 "composite_lifestyle_risk_score",
 "social_balance_score"
 ],
 "output_schema": {
 "required_columns": [
 "student_id",
 "lifestyle_dimension",
 "lifestyle_risk_score"
 ],
 "optional_columns": [
 "alcohol_weekday",
 "alcohol_weekend",
 "go_out_freq",
 "health_status",
 "free_time",
 "composite_lifestyle_risk_score",
 "social_balance_score"
 ]
 },
 "query_labels": [
 "lifestyle_comparison"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-C04-CORE-01",
 "description": "Compare lifestyle_dimension rows for the two students."
 },
 {
 "requirement_id": "A-C04-CORE-02",
 "description": "Highlight the largest dimension gaps."
 }
 ],
 "required_supporting_outputs": [
 {
 "requirement_id": "A-C04-SUPPORT-01",
 "description": "Use composite_lifestyle_risk_score and social_balance_score only as supporting context."
 }
 ],
 "evaluation_constraints": [
 {
 "constraint_id": "A-C04-CONSTRAINT-01",
 "description": "Frame lifestyle differences as context only, not causal judgement."
 }
 ],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Applicable because this is an individual-level comparison involving lifestyle context."
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
 "dataset_label": "lifestyle_comparison",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-C04.json",
 "artifact_sha256": "36bf7dacdf6a84e23733c451474124f442bb062556d02787902e76ebc49a2bc2",
 "row_count": 10,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 10,
 "prompt_embedded_row_count": 10,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "36bf7dacdf6a84e23733c451474124f442bb062556d02787902e76ebc49a2bc2",
 "evidence_rows_sha256": "f6bdc74e071f83e533b355dd0e6d16bda43bcf1d3738f7abc46b320ca9d721ca",
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
 "full_result_row_count": 10,
 "embedded_datasets_sha256": "f6bdc74e071f83e533b355dd0e6d16bda43bcf1d3738f7abc46b320ca9d721ca",
 "datasets": {
 "lifestyle_comparison": [
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "lifestyle_dimension": "weekday_alcohol",
 "lifestyle_risk_score": 1,
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 4,
 "health_status": 3,
 "free_time": 3,
 "composite_lifestyle_risk_score": 0.375,
 "social_balance_score": 0.025000000000000022
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "lifestyle_dimension": "weekend_alcohol",
 "lifestyle_risk_score": 1,
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 4,
 "health_status": 3,
 "free_time": 3,
 "composite_lifestyle_risk_score": 0.375,
 "social_balance_score": 0.025000000000000022
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "lifestyle_dimension": "go_out_frequency",
 "lifestyle_risk_score": 4,
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 4,
 "health_status": 3,
 "free_time": 3,
 "composite_lifestyle_risk_score": 0.375,
 "social_balance_score": 0.025000000000000022
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "lifestyle_dimension": "health_status",
 "lifestyle_risk_score": 3,
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 4,
 "health_status": 3,
 "free_time": 3,
 "composite_lifestyle_risk_score": 0.375,
 "social_balance_score": 0.025000000000000022
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "lifestyle_dimension": "free_time",
 "lifestyle_risk_score": 3,
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 4,
 "health_status": 3,
 "free_time": 3,
 "composite_lifestyle_risk_score": 0.375,
 "social_balance_score": 0.025000000000000022
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "lifestyle_dimension": "weekday_alcohol",
 "lifestyle_risk_score": 1,
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 3,
 "health_status": 3,
 "free_time": 3,
 "composite_lifestyle_risk_score": 0.3,
 "social_balance_score": 0.1
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "lifestyle_dimension": "weekend_alcohol",
 "lifestyle_risk_score": 1,
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 3,
 "health_status": 3,
 "free_time": 3,
 "composite_lifestyle_risk_score": 0.3,
 "social_balance_score": 0.1
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "lifestyle_dimension": "go_out_frequency",
 "lifestyle_risk_score": 3,
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 3,
 "health_status": 3,
 "free_time": 3,
 "composite_lifestyle_risk_score": 0.3,
 "social_balance_score": 0.1
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "lifestyle_dimension": "health_status",
 "lifestyle_risk_score": 3,
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 3,
 "health_status": 3,
 "free_time": 3,
 "composite_lifestyle_risk_score": 0.3,
 "social_balance_score": 0.1
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "lifestyle_dimension": "free_time",
 "lifestyle_risk_score": 3,
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 3,
 "health_status": 3,
 "free_time": 3,
 "composite_lifestyle_risk_score": 0.3,
 "social_balance_score": 0.1
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-C04__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "eaf812a2a66ed9a6e584245205f28cb24bbd40841399c01c710908bf9cb25f94",
 "generator_input_sha256": "0639b312d3b71989f6ac9ad76e51c64f0f15a27b0792bdd101b5851435e09fe5",
 "generator_input_compact": {
 "task_id": "A-C04",
 "execution_id": "exec_1781847232040_9237c26d",
 "task_name": "Compare lifestyle context",
 "analysis_type": "comparison",
 "explanation_strategy": "comparison",
 "actionable_question": "Which lifestyle context dimensions differ most between these two students?",
 "target_audience": [
 "instructor",
 "academic_advisor"
 ],
 "query_labels": [
 "lifestyle_comparison"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "lifestyle_comparison"
 ],
 "dataset_row_counts": {
 "lifestyle_comparison": 10
 },
 "ai_summary_config_summary": {
 "summary_type": "multi_metric_comparison",
 "metric_column": null,
 "entity_column": "student_id",
 "group_column": null,
 "time_column": null,
 "sort_by": null,
 "sort_direction": null,
 "top_k": null,
 "bottom_k": null,
 "threshold_direction": null,
 "numeric_threshold": null,
 "require_sensitive_context_policy": true,
 "require_complete_action_provenance": true
 }
 }
}
```

## AI Explanation To Judge

```json
{
 "raw_text": "Summary: The comparison of lifestyle dimensions between two students reveals notable differences in their go-out frequency, while other dimensions remain consistent. The first student exhibits a higher go-out frequency, which may indicate a more active social lifestyle.\n\nInsights: Go-Out Frequency Difference: Student SAMPLE_UCI_POR_STU_000001 has a higher go-out frequency compared to SAMPLE_UCI_POR_STU_000002, suggesting a more active social engagement.\n\nEducational implications: Understanding lifestyle differences can help tailor interventions to support students' social and health-related needs.\n\nRecommendations: medium - Encourage social activities for students with lower go-out frequency. - Increasing social engagement may enhance overall well-being and academic performance.",
 "structured_payload": {
 "task_id": "A-C04",
 "execution_id": "exec_1781847232040_9237c26d",
 "explanation": {
 "summary": "The comparison of lifestyle dimensions between two students reveals notable differences in their go-out frequency, while other dimensions remain consistent. The first student exhibits a higher go-out frequency, which may indicate a more active social lifestyle.",
 "insights": [
 {
 "title": "Go-Out Frequency Difference",
 "description": "Student SAMPLE_UCI_POR_STU_000001 has a higher go-out frequency compared to SAMPLE_UCI_POR_STU_000002, suggesting a more active social engagement.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "go_out_freq",
 "value": 4,
 "comparison": "baseline",
 "delta": 1,
 "context": "SAMPLE_UCI_POR_STU_000001 has a go-out frequency of 4, while SAMPLE_UCI_POR_STU_000002 has a frequency of 3."
 }
 ]
 }
 ],
 "educational_implications": [
 "Understanding lifestyle differences can help tailor interventions to support students' social and health-related needs."
 ],
 "recommendations": [
 {
 "priority": "medium",
 "action": "Encourage social activities for students with lower go-out frequency.",
 "rationale": "Increasing social engagement may enhance overall well-being and academic performance."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "Data quality is sufficient with clear metrics for comparison.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "multi_metric_comparison",
 "ai_summary_method_warning": null,
 "full_result_row_count": 10,
 "included_row_count": 10,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "lifestyle_comparison",
 "row_count": 10,
 "included_row_count": 10
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 10,
 "baseline_reference_tokens": 846,
 "task_aware_prompt_tokens": 2395,
 "token_ratio": 2.831,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
 ],
 "must_keep_keys": [
 "comparison_matrix",
 "dataset_name",
 "entities",
 "entity_column",
 "metric_extrema",
 "metrics",
 "missing_entity_evidence",
 "missing_expected_entities",
 "missing_metric_evidence",
 "pairwise_direction_evidence",
 "pairwise_gaps",
 "row_count",
 "selected_entity_evidence",
 "summarization_warnings",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (2.831 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C04",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "lifestyle_comparison",
 "row_count": 10,
 "entities": [
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
 ],
 "entity_column": "student_id",
 "metrics": [
 {
 "metric": "weekday_alcohol",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "weekend_alcohol",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "go_out_frequency",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "health_status",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "free_time",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 }
 ],
 "metric_keys": [
 "weekday_alcohol",
 "weekend_alcohol",
 "go_out_frequency",
 "health_status",
 "free_time"
 ],
 "metric_key_column": "lifestyle_dimension",
 "metric_value_column": "lifestyle_risk_score",
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [],
 "observed_entity_count": 2,
 "missing_expected_entities": []
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "metrics": {
 "weekday_alcohol": 1,
 "weekend_alcohol": 1,
 "go_out_frequency": 4,
 "health_status": 3,
 "free_time": 3
 },
 "labels": {
 "composite_lifestyle_risk_score": 0.375,
 "social_balance_score": 0.025000000000000022
 }
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "metrics": {
 "weekday_alcohol": 1,
 "weekend_alcohol": 1,
 "go_out_frequency": 3,
 "health_status": 3,
 "free_time": 3
 },
 "labels": {
 "composite_lifestyle_risk_score": 0.3,
 "social_balance_score": 0.1
 }
 }
 ],
 "selected_entity_evidence": []
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [
 {
 "metric": "weekday_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "weekend_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "go_out_frequency",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": -1,
 "absolute_gap": 1
 },
 {
 "metric": "health_status",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "free_time",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "weekday_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "weekend_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "go_out_frequency",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000001",
 "lower_entity": "SAMPLE_UCI_POR_STU_000002",
 "difference": 1,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "health_status",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "free_time",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 }
 ],
 "metric_extrema": {
 "weekday_alcohol": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 }
 },
 "weekend_alcohol": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 }
 },
 "go_out_frequency": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 3
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 4
 }
 },
 "health_status": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 }
 },
 "free_time": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_metric_evidence": [],
 "missing_entity_evidence": [],
 "missing_expected_entities": [],
 "validation_metadata": {
 "status": "passed",
 "required": {
 "metric_units": true,
 "metric_directions": true,
 "metric_thresholds": false,
 "sensitive_context_policy": true
 },
 "metric_units": {
 "weekday_alcohol": "ordinal_1_5",
 "weekend_alcohol": "ordinal_1_5",
 "go_out_frequency": "ordinal_1_5",
 "health_status": "ordinal_1_5",
 "free_time": "ordinal_1_5"
 },
 "metric_directions": {
 "weekday_alcohol": "context_only",
 "weekend_alcohol": "context_only",
 "go_out_frequency": "context_only",
 "health_status": "context_only",
 "free_time": "context_only"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": "descriptive_non_causal"
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Sensitive/background context is descriptive only under policy 'descriptive_non_causal'; do not infer causality or prescribe action from it."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "multi_metric_comparison",
 "dataset_name": "lifestyle_comparison",
 "row_count": 10,
 "entity_column": "student_id",
 "metric_key_column": "lifestyle_dimension",
 "metric_value_column": "lifestyle_risk_score",
 "entities": [
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
 ],
 "metrics": [
 {
 "metric": "weekday_alcohol",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "weekend_alcohol",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "go_out_frequency",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "health_status",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "free_time",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 }
 ],
 "metric_keys": [
 "weekday_alcohol",
 "weekend_alcohol",
 "go_out_frequency",
 "health_status",
 "free_time"
 ],
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "metrics": {
 "weekday_alcohol": 1,
 "weekend_alcohol": 1,
 "go_out_frequency": 4,
 "health_status": 3,
 "free_time": 3
 },
 "labels": {
 "composite_lifestyle_risk_score": 0.375,
 "social_balance_score": 0.025000000000000022
 }
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "metrics": {
 "weekday_alcohol": 1,
 "weekend_alcohol": 1,
 "go_out_frequency": 3,
 "health_status": 3,
 "free_time": 3
 },
 "labels": {
 "composite_lifestyle_risk_score": 0.3,
 "social_balance_score": 0.1
 }
 }
 ],
 "metric_extrema": {
 "weekday_alcohol": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 }
 },
 "weekend_alcohol": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 }
 },
 "go_out_frequency": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 3
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 4
 }
 },
 "health_status": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 }
 },
 "free_time": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "weekday_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "weekend_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "go_out_frequency",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": -1,
 "absolute_gap": 1
 },
 {
 "metric": "health_status",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "free_time",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 }
 ],
 "missing_metric_evidence": [],
 "missing_entity_evidence": [],
 "missing_expected_entities": [],
 "selected_entity_evidence": [],
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [],
 "observed_entity_count": 2,
 "missing_expected_entities": []
 },
 "validation_metadata": {
 "status": "passed",
 "required": {
 "metric_units": true,
 "metric_directions": true,
 "metric_thresholds": false,
 "sensitive_context_policy": true
 },
 "metric_units": {
 "weekday_alcohol": "ordinal_1_5",
 "weekend_alcohol": "ordinal_1_5",
 "go_out_frequency": "ordinal_1_5",
 "health_status": "ordinal_1_5",
 "free_time": "ordinal_1_5"
 },
 "metric_directions": {
 "weekday_alcohol": "context_only",
 "weekend_alcohol": "context_only",
 "go_out_frequency": "context_only",
 "health_status": "context_only",
 "free_time": "context_only"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": "descriptive_non_causal"
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Sensitive/background context is descriptive only under policy 'descriptive_non_causal'; do not infer causality or prescribe action from it."
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "weekday_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "weekend_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "go_out_frequency",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000001",
 "lower_entity": "SAMPLE_UCI_POR_STU_000002",
 "difference": 1,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "health_status",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "free_time",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 }
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4303,
 "token_usage": {
 "prompt_tokens": 3413,
 "completion_tokens": 330,
 "total_tokens": 3743
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.00071
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-C04__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "eaf812a2a66ed9a6e584245205f28cb24bbd40841399c01c710908bf9cb25f94",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 3413,
 "completion_tokens": 330,
 "total_tokens": 3743
 },
 "latency_ms": 4337,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-C04",
 "execution_id": "exec_1781847232040_9237c26d",
 "explanation": {
 "summary": "The comparison of lifestyle dimensions between two students reveals notable differences in their go-out frequency, while other dimensions remain consistent. The first student exhibits a higher go-out frequency, which may indicate a more active social lifestyle.",
 "insights": [
 {
 "title": "Go-Out Frequency Difference",
 "description": "Student SAMPLE_UCI_POR_STU_000001 has a higher go-out frequency compared to SAMPLE_UCI_POR_STU_000002, suggesting a more active social engagement.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "go_out_freq",
 "value": 4,
 "comparison": "baseline",
 "delta": 1,
 "context": "SAMPLE_UCI_POR_STU_000001 has a go-out frequency of 4, while SAMPLE_UCI_POR_STU_000002 has a frequency of 3."
 }
 ]
 }
 ],
 "educational_implications": [
 "Understanding lifestyle differences can help tailor interventions to support students' social and health-related needs."
 ],
 "recommendations": [
 {
 "priority": "medium",
 "action": "Encourage social activities for students with lower go-out frequency.",
 "rationale": "Increasing social engagement may enhance overall well-being and academic performance."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "Data quality is sufficient with clear metrics for comparison.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "multi_metric_comparison",
 "ai_summary_method_warning": null,
 "full_result_row_count": 10,
 "included_row_count": 10,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "lifestyle_comparison",
 "row_count": 10,
 "included_row_count": 10
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 10,
 "baseline_reference_tokens": 846,
 "task_aware_prompt_tokens": 2395,
 "token_ratio": 2.831,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
 ],
 "must_keep_keys": [
 "comparison_matrix",
 "dataset_name",
 "entities",
 "entity_column",
 "metric_extrema",
 "metrics",
 "missing_entity_evidence",
 "missing_expected_entities",
 "missing_metric_evidence",
 "pairwise_direction_evidence",
 "pairwise_gaps",
 "row_count",
 "selected_entity_evidence",
 "summarization_warnings",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (2.831 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C04",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "lifestyle_comparison",
 "row_count": 10,
 "entities": [
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
 ],
 "entity_column": "student_id",
 "metrics": [
 {
 "metric": "weekday_alcohol",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "weekend_alcohol",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "go_out_frequency",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "health_status",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "free_time",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 }
 ],
 "metric_keys": [
 "weekday_alcohol",
 "weekend_alcohol",
 "go_out_frequency",
 "health_status",
 "free_time"
 ],
 "metric_key_column": "lifestyle_dimension",
 "metric_value_column": "lifestyle_risk_score",
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [],
 "observed_entity_count": 2,
 "missing_expected_entities": []
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "metrics": {
 "weekday_alcohol": 1,
 "weekend_alcohol": 1,
 "go_out_frequency": 4,
 "health_status": 3,
 "free_time": 3
 },
 "labels": {
 "composite_lifestyle_risk_score": 0.375,
 "social_balance_score": 0.025000000000000022
 }
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "metrics": {
 "weekday_alcohol": 1,
 "weekend_alcohol": 1,
 "go_out_frequency": 3,
 "health_status": 3,
 "free_time": 3
 },
 "labels": {
 "composite_lifestyle_risk_score": 0.3,
 "social_balance_score": 0.1
 }
 }
 ],
 "selected_entity_evidence": []
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [
 {
 "metric": "weekday_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "weekend_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "go_out_frequency",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": -1,
 "absolute_gap": 1
 },
 {
 "metric": "health_status",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "free_time",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "weekday_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "weekend_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "go_out_frequency",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000001",
 "lower_entity": "SAMPLE_UCI_POR_STU_000002",
 "difference": 1,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "health_status",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "free_time",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 }
 ],
 "metric_extrema": {
 "weekday_alcohol": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 }
 },
 "weekend_alcohol": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 }
 },
 "go_out_frequency": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 3
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 4
 }
 },
 "health_status": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 }
 },
 "free_time": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_metric_evidence": [],
 "missing_entity_evidence": [],
 "missing_expected_entities": [],
 "validation_metadata": {
 "status": "passed",
 "required": {
 "metric_units": true,
 "metric_directions": true,
 "metric_thresholds": false,
 "sensitive_context_policy": true
 },
 "metric_units": {
 "weekday_alcohol": "ordinal_1_5",
 "weekend_alcohol": "ordinal_1_5",
 "go_out_frequency": "ordinal_1_5",
 "health_status": "ordinal_1_5",
 "free_time": "ordinal_1_5"
 },
 "metric_directions": {
 "weekday_alcohol": "context_only",
 "weekend_alcohol": "context_only",
 "go_out_frequency": "context_only",
 "health_status": "context_only",
 "free_time": "context_only"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": "descriptive_non_causal"
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Sensitive/background context is descriptive only under policy 'descriptive_non_causal'; do not infer causality or prescribe action from it."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "multi_metric_comparison",
 "dataset_name": "lifestyle_comparison",
 "row_count": 10,
 "entity_column": "student_id",
 "metric_key_column": "lifestyle_dimension",
 "metric_value_column": "lifestyle_risk_score",
 "entities": [
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
 ],
 "metrics": [
 {
 "metric": "weekday_alcohol",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "weekend_alcohol",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "go_out_frequency",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "health_status",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "free_time",
 "unit": "ordinal_1_5",
 "direction": "context_only",
 "threshold": null
 }
 ],
 "metric_keys": [
 "weekday_alcohol",
 "weekend_alcohol",
 "go_out_frequency",
 "health_status",
 "free_time"
 ],
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "metrics": {
 "weekday_alcohol": 1,
 "weekend_alcohol": 1,
 "go_out_frequency": 4,
 "health_status": 3,
 "free_time": 3
 },
 "labels": {
 "composite_lifestyle_risk_score": 0.375,
 "social_balance_score": 0.025000000000000022
 }
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "metrics": {
 "weekday_alcohol": 1,
 "weekend_alcohol": 1,
 "go_out_frequency": 3,
 "health_status": 3,
 "free_time": 3
 },
 "labels": {
 "composite_lifestyle_risk_score": 0.3,
 "social_balance_score": 0.1
 }
 }
 ],
 "metric_extrema": {
 "weekday_alcohol": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 }
 },
 "weekend_alcohol": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 1
 }
 },
 "go_out_frequency": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 3
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 4
 }
 },
 "health_status": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 }
 },
 "free_time": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 3
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "weekday_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "weekend_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "go_out_frequency",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": -1,
 "absolute_gap": 1
 },
 {
 "metric": "health_status",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "free_time",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 }
 ],
 "missing_metric_evidence": [],
 "missing_entity_evidence": [],
 "missing_expected_entities": [],
 "selected_entity_evidence": [],
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [],
 "observed_entity_count": 2,
 "missing_expected_entities": []
 },
 "validation_metadata": {
 "status": "passed",
 "required": {
 "metric_units": true,
 "metric_directions": true,
 "metric_thresholds": false,
 "sensitive_context_policy": true
 },
 "metric_units": {
 "weekday_alcohol": "ordinal_1_5",
 "weekend_alcohol": "ordinal_1_5",
 "go_out_frequency": "ordinal_1_5",
 "health_status": "ordinal_1_5",
 "free_time": "ordinal_1_5"
 },
 "metric_directions": {
 "weekday_alcohol": "context_only",
 "weekend_alcohol": "context_only",
 "go_out_frequency": "context_only",
 "health_status": "context_only",
 "free_time": "context_only"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": "descriptive_non_causal"
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Sensitive/background context is descriptive only under policy 'descriptive_non_causal'; do not infer causality or prescribe action from it."
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "weekday_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "weekend_alcohol",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "go_out_frequency",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000001",
 "lower_entity": "SAMPLE_UCI_POR_STU_000002",
 "difference": 1,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "health_status",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "free_time",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 }
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4303,
 "token_usage": {
 "prompt_tokens": 3413,
 "completion_tokens": 330,
 "total_tokens": 3743
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.00071
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
 "expected": 10,
 "observed": 10
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "36bf7dacdf6a84e23733c451474124f442bb062556d02787902e76ebc49a2bc2",
 "expected_values": [
 "36bf7dacdf6a84e23733c451474124f442bb062556d02787902e76ebc49a2bc2"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "f6bdc74e071f83e533b355dd0e6d16bda43bcf1d3738f7abc46b320ca9d721ca",
 "expected": "f6bdc74e071f83e533b355dd0e6d16bda43bcf1d3738f7abc46b320ca9d721ca"
 },
 {
 "check_id": "numeric_fields_lifestyle_comparison",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "lifestyle_comparison",
 "numeric_columns": [
 "alcohol_weekday",
 "alcohol_weekend",
 "composite_lifestyle_risk_score",
 "free_time",
 "go_out_freq",
 "health_status",
 "lifestyle_risk_score",
 "social_balance_score"
 ],
 "numeric_summaries": {
 "alcohol_weekday": {
 "count": 10,
 "min": 1,
 "max": 1
 },
 "alcohol_weekend": {
 "count": 10,
 "min": 1,
 "max": 1
 },
 "composite_lifestyle_risk_score": {
 "count": 10,
 "min": 0.3,
 "max": 0.375
 },
 "free_time": {
 "count": 10,
 "min": 3,
 "max": 3
 },
 "go_out_freq": {
 "count": 10,
 "min": 3,
 "max": 4
 },
 "health_status": {
 "count": 10,
 "min": 3,
 "max": 3
 },
 "lifestyle_risk_score": {
 "count": 10,
 "min": 1,
 "max": 4
 },
 "social_balance_score": {
 "count": 10,
 "min": 0.025000000000000022,
 "max": 0.1
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_lifestyle_comparison",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "lifestyle_comparison",
 "flag_columns": [
 "lifestyle_risk_score",
 "health_status",
 "composite_lifestyle_risk_score"
 ],
 "triggered_like_counts": {
 "lifestyle_risk_score": 0,
 "health_status": 0,
 "composite_lifestyle_risk_score": 0
 }
 }
]
```

