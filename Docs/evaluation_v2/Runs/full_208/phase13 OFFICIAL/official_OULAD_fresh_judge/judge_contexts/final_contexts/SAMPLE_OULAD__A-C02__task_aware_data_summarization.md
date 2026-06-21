# LLM Judge Final Judge Context - SAMPLE_OULAD__A-C02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-C02__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-C02",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Compare engagement patterns",
 "scope": "2 students",
 "actionable_question": "Which student is more engaged across total clicks, active days, and combined engagement score?",
 "target_audience": "instructor",
 "ai_summary_type": "multi_metric_comparison",
 "ai_prompt_hint": "Compare the two students using metric, engagement_score, total_clicks, and active_days. Explain which engagement dimension creates the largest gap. Do not infer academic risk unless risk fields are present.",
 "query_labels": [
 "engagement_comparison"
 ],
 "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
 "source_tables": [
 "enrollment",
 "engagement"
 ],
 "key_db_fields": [
 "metric [FE cross]",
 "engagement_score [FE cross]",
 "study_effort_level [FE cross]",
 "total_clicks",
 "active_days"
 ],
 "output_schema": {
 "required_columns": [
 "student_id",
 "metric",
 "engagement_score"
 ],
 "optional_columns": [
 "total_clicks",
 "active_days",
 "study_effort_level"
 ]
 },
 "query_labels": [
 "engagement_comparison"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-C02-CORE-01",
 "description": "Compare the two students using metric, engagement_score, total_clicks, and active_days."
 },
 {
 "requirement_id": "A-C02-CORE-02",
 "description": "Explain which engagement dimension creates the largest gap."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-C02-CONSTRAINT-01",
 "description": "Do not infer academic risk unless risk fields are present."
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
 "dataset_label": "engagement_comparison",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C02.json",
 "artifact_sha256": "68726384d9ea133f2ddbb3ffd580c7ee18a8ad91280d9c40d955fc6222ed5857",
 "row_count": 6,
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
 "evidence_artifact_file_sha256": "68726384d9ea133f2ddbb3ffd580c7ee18a8ad91280d9c40d955fc6222ed5857",
 "evidence_rows_sha256": "5ca289b6f3abfb1befd40ca0093124bfb749c65f378bea63c13d53c15f317582",
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
 "embedded_datasets_sha256": "5ca289b6f3abfb1befd40ca0093124bfb749c65f378bea63c13d53c15f317582",
 "datasets": {
 "engagement_comparison": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metric": "active_days_norm",
 "engagement_score": 0.35251798561151076,
 "total_clicks": 1261,
 "active_days": 98,
 "study_effort_level": "very_low"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metric": "engagement_score",
 "engagement_score": 0.20237855036820618,
 "total_clicks": 1261,
 "active_days": 98,
 "study_effort_level": "very_low"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metric": "total_clicks_norm",
 "engagement_score": 0.05223911512490161,
 "total_clicks": 1261,
 "active_days": 98,
 "study_effort_level": "very_low"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metric": "active_days_norm",
 "engagement_score": 0,
 "total_clicks": 0,
 "active_days": 0,
 "study_effort_level": "very_low"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metric": "engagement_score",
 "engagement_score": 0,
 "total_clicks": 0,
 "active_days": 0,
 "study_effort_level": "very_low"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metric": "total_clicks_norm",
 "engagement_score": 0,
 "total_clicks": 0,
 "active_days": 0,
 "study_effort_level": "very_low"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-C02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "25e810fd0a0eb6995961a87b15dcc87e4974561d50f2622d9865aeb543dc352d",
 "generator_input_sha256": "519a3d53f7171b34ef94728ec449cc02059f440425f5b034853786951558711e",
 "generator_input_compact": {
 "task_id": "A-C02",
 "execution_id": "exec_1781847642419_5be485d9",
 "task_name": "Compare engagement patterns",
 "analysis_type": "comparison",
 "explanation_strategy": "comparison",
 "actionable_question": "Which student is more engaged across total clicks, active days, and combined engagement score?",
 "target_audience": [
 "instructor"
 ],
 "query_labels": [
 "engagement_comparison"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "engagement_comparison"
 ],
 "dataset_row_counts": {
 "engagement_comparison": 6
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
 "require_sensitive_context_policy": false,
 "require_complete_action_provenance": true
 }
 }
}
```

## AI Explanation To Judge

```json
{
 "raw_text": "Summary: Exact engagement comparison: SAMPLE_OULAD_STU_100788 active_days_norm=0.35251798561151076 (total_clicks=1261, active_days=98); SAMPLE_OULAD_STU_100788 engagement_score=0.20237855036820618 (total_clicks=1261, active_days=98); SAMPLE_OULAD_STU_100788 total_clicks_norm=0.05223911512490161 (total_clicks=1261, active_days=98); SAMPLE_OULAD_STU_101700 active_days_norm=0 (total_clicks=0, active_days=0); SAMPLE_OULAD_STU_101700 engagement_score=0 (total_clicks=0, active_days=0); SAMPLE_OULAD_STU_101700 total_clicks_norm=0 (total_clicks=0, active_days=0). Largest absolute engagement-dimension gap: active_days_norm=0.3525.\n\nInsights: Active Days Engagement: SAMPLE_OULAD_STU_100788 has a notably higher active_days_norm compared to SAMPLE_OULAD_STU_101700, indicating a greater frequency of engagement with the course materials. | Engagement Score Comparison: The engagement_score for SAMPLE_OULAD_STU_100788 is significantly higher than that of SAMPLE_OULAD_STU_101700, reflecting a more engaged interaction with the course content. | Total Clicks Engagement: SAMPLE_OULAD_STU_100788 also shows a higher total_clicks_norm compared to SAMPLE_OULAD_STU_101700, indicating more interactions with the course materials.\n\nEducational implications: This is an engagement-only comparison; it does not establish academic risk or a cause of the observed gap.",
 "structured_payload": {
 "task_id": "A-C02",
 "execution_id": "exec_1781847642419_5be485d9",
 "explanation": {
 "summary": "Exact engagement comparison: SAMPLE_OULAD_STU_100788 active_days_norm=0.35251798561151076 (total_clicks=1261, active_days=98); SAMPLE_OULAD_STU_100788 engagement_score=0.20237855036820618 (total_clicks=1261, active_days=98); SAMPLE_OULAD_STU_100788 total_clicks_norm=0.05223911512490161 (total_clicks=1261, active_days=98); SAMPLE_OULAD_STU_101700 active_days_norm=0 (total_clicks=0, active_days=0); SAMPLE_OULAD_STU_101700 engagement_score=0 (total_clicks=0, active_days=0); SAMPLE_OULAD_STU_101700 total_clicks_norm=0 (total_clicks=0, active_days=0). Largest absolute engagement-dimension gap: active_days_norm=0.3525.",
 "insights": [
 {
 "title": "Active Days Engagement",
 "description": "SAMPLE_OULAD_STU_100788 has a notably higher active_days_norm compared to SAMPLE_OULAD_STU_101700, indicating a greater frequency of engagement with the course materials.",
 "severity": "high",
 "evidence": [
 {
 "metric": "active_days_norm",
 "value": 0.3525,
 "comparison": "baseline",
 "delta": -0.3525,
 "context": "SAMPLE_OULAD_STU_101700 has an active_days_norm of 0"
 }
 ]
 },
 {
 "title": "Engagement Score Comparison",
 "description": "The engagement_score for SAMPLE_OULAD_STU_100788 is significantly higher than that of SAMPLE_OULAD_STU_101700, reflecting a more engaged interaction with the course content.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "engagement_score",
 "value": 0.2024,
 "comparison": "baseline",
 "delta": -0.2024,
 "context": "SAMPLE_OULAD_STU_101700 has an engagement_score of 0"
 }
 ]
 },
 {
 "title": "Total Clicks Engagement",
 "description": "SAMPLE_OULAD_STU_100788 also shows a higher total_clicks_norm compared to SAMPLE_OULAD_STU_101700, indicating more interactions with the course materials.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "total_clicks_norm",
 "value": 0.0522,
 "comparison": "baseline",
 "delta": -0.0522,
 "context": "SAMPLE_OULAD_STU_101700 has a total_clicks_norm of 0"
 }
 ]
 }
 ],
 "educational_implications": [
 "This is an engagement-only comparison; it does not establish academic risk or a cause of the observed gap."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is sufficient for making comparative claims based on the provided metrics.",
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
 "full_result_row_count": 6,
 "included_row_count": 6,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "engagement_comparison",
 "row_count": 6,
 "included_row_count": 6
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 6,
 "baseline_reference_tokens": 323,
 "task_aware_prompt_tokens": 1801,
 "token_ratio": 5.5759,
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
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "State the exact values for active_days_norm, engagement_score, and total_clicks_norm for both returned students, and identify the largest absolute gap.",
 "Do not infer academic performance or prescribe an intervention from engagement-only evidence."
 ],
 "must_keep_keys": [
 "comparison_matrix",
 "dataset_name",
 "entities",
 "entity_column",
 "largest_gap_evidence",
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (5.5759 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C02",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "State the exact values for active_days_norm, engagement_score, and total_clicks_norm for both returned students, and identify the largest absolute gap.",
 "Do not infer academic performance or prescribe an intervention from engagement-only evidence."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "engagement_comparison",
 "row_count": 6,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "entity_column": "student_id",
 "metrics": [
 {
 "metric": "active_days_norm",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 }
 },
 {
 "metric": "engagement_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "very_low_below": 0.25,
 "low_below": 0.5,
 "medium_below": 0.75,
 "high_at_or_above": 0.75
 }
 },
 {
 "metric": "total_clicks_norm",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 }
 }
 ],
 "metric_keys": [
 "active_days_norm",
 "engagement_score",
 "total_clicks_norm"
 ],
 "metric_key_column": "metric",
 "metric_value_column": "engagement_score",
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
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "active_days_norm": 0.3525,
 "engagement_score": 0.2024,
 "total_clicks_norm": 0.0522
 },
 "labels": {
 "study_effort_level": "very_low",
 "total_clicks": 1261,
 "active_days": 98
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {
 "active_days_norm": 0,
 "engagement_score": 0,
 "total_clicks_norm": 0
 },
 "labels": {
 "study_effort_level": "very_low",
 "total_clicks": 0,
 "active_days": 0
 }
 }
 ],
 "selected_entity_evidence": [],
 "largest_gap_evidence": {
 "metric": "active_days_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.3525,
 "absolute_gap": 0.3525
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [
 {
 "metric": "active_days_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.3525,
 "absolute_gap": 0.3525
 },
 {
 "metric": "engagement_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.2024,
 "absolute_gap": 0.2024
 },
 {
 "metric": "total_clicks_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.0522,
 "absolute_gap": 0.0522
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "active_days_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 0.3525,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "engagement_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 0.2024,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "total_clicks_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 0.0522,
 "direction_note": "left_entity is higher"
 }
 ],
 "metric_extrema": {
 "active_days_norm": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.3525
 }
 },
 "engagement_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2024
 }
 },
 "total_clicks_norm": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0522
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
 "metric_thresholds": true,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "total_clicks_norm": "ratio_0_1",
 "active_days_norm": "ratio_0_1",
 "engagement_score": "ratio_0_1"
 },
 "metric_directions": {
 "total_clicks_norm": "higher_is_better",
 "active_days_norm": "higher_is_better",
 "engagement_score": "higher_is_better"
 },
 "metric_thresholds": {
 "total_clicks_norm": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 },
 "active_days_norm": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 },
 "engagement_score": {
 "very_low_below": 0.25,
 "low_below": 0.5,
 "medium_below": 0.75,
 "high_at_or_above": 0.75
 }
 },
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "multi_metric_comparison",
 "dataset_name": "engagement_comparison",
 "row_count": 6,
 "entity_column": "student_id",
 "metric_key_column": "metric",
 "metric_value_column": "engagement_score",
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "metrics": [
 {
 "metric": "active_days_norm",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 }
 },
 {
 "metric": "engagement_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "very_low_below": 0.25,
 "low_below": 0.5,
 "medium_below": 0.75,
 "high_at_or_above": 0.75
 }
 },
 {
 "metric": "total_clicks_norm",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 }
 }
 ],
 "metric_keys": [
 "active_days_norm",
 "engagement_score",
 "total_clicks_norm"
 ],
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "active_days_norm": 0.3525,
 "engagement_score": 0.2024,
 "total_clicks_norm": 0.0522
 },
 "labels": {
 "study_effort_level": "very_low",
 "total_clicks": 1261,
 "active_days": 98
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {
 "active_days_norm": 0,
 "engagement_score": 0,
 "total_clicks_norm": 0
 },
 "labels": {
 "study_effort_level": "very_low",
 "total_clicks": 0,
 "active_days": 0
 }
 }
 ],
 "metric_extrema": {
 "active_days_norm": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.3525
 }
 },
 "engagement_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2024
 }
 },
 "total_clicks_norm": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0522
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "active_days_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.3525,
 "absolute_gap": 0.3525
 },
 {
 "metric": "engagement_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.2024,
 "absolute_gap": 0.2024
 },
 {
 "metric": "total_clicks_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.0522,
 "absolute_gap": 0.0522
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
 "metric_thresholds": true,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "total_clicks_norm": "ratio_0_1",
 "active_days_norm": "ratio_0_1",
 "engagement_score": "ratio_0_1"
 },
 "metric_directions": {
 "total_clicks_norm": "higher_is_better",
 "active_days_norm": "higher_is_better",
 "engagement_score": "higher_is_better"
 },
 "metric_thresholds": {
 "total_clicks_norm": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 },
 "active_days_norm": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 },
 "engagement_score": {
 "very_low_below": 0.25,
 "low_below": 0.5,
 "medium_below": 0.75,
 "high_at_or_above": 0.75
 }
 },
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [],
 "pairwise_direction_evidence": [
 {
 "metric": "active_days_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 0.3525,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "engagement_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 0.2024,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "total_clicks_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 0.0522,
 "direction_note": "left_entity is higher"
 }
 ],
 "largest_gap_evidence": {
 "metric": "active_days_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.3525,
 "absolute_gap": 0.3525
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 6878,
 "token_usage": {
 "prompt_tokens": 2523,
 "completion_tokens": 626,
 "total_tokens": 3149
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000754
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-C02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "25e810fd0a0eb6995961a87b15dcc87e4974561d50f2622d9865aeb543dc352d",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2523,
 "completion_tokens": 626,
 "total_tokens": 3149
 },
 "latency_ms": 6887,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-C02",
 "execution_id": "exec_1781847642419_5be485d9",
 "explanation": {
 "summary": "Exact engagement comparison: SAMPLE_OULAD_STU_100788 active_days_norm=0.35251798561151076 (total_clicks=1261, active_days=98); SAMPLE_OULAD_STU_100788 engagement_score=0.20237855036820618 (total_clicks=1261, active_days=98); SAMPLE_OULAD_STU_100788 total_clicks_norm=0.05223911512490161 (total_clicks=1261, active_days=98); SAMPLE_OULAD_STU_101700 active_days_norm=0 (total_clicks=0, active_days=0); SAMPLE_OULAD_STU_101700 engagement_score=0 (total_clicks=0, active_days=0); SAMPLE_OULAD_STU_101700 total_clicks_norm=0 (total_clicks=0, active_days=0). Largest absolute engagement-dimension gap: active_days_norm=0.3525.",
 "insights": [
 {
 "title": "Active Days Engagement",
 "description": "SAMPLE_OULAD_STU_100788 has a notably higher active_days_norm compared to SAMPLE_OULAD_STU_101700, indicating a greater frequency of engagement with the course materials.",
 "severity": "high",
 "evidence": [
 {
 "metric": "active_days_norm",
 "value": 0.3525,
 "comparison": "baseline",
 "delta": -0.3525,
 "context": "SAMPLE_OULAD_STU_101700 has an active_days_norm of 0"
 }
 ]
 },
 {
 "title": "Engagement Score Comparison",
 "description": "The engagement_score for SAMPLE_OULAD_STU_100788 is significantly higher than that of SAMPLE_OULAD_STU_101700, reflecting a more engaged interaction with the course content.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "engagement_score",
 "value": 0.2024,
 "comparison": "baseline",
 "delta": -0.2024,
 "context": "SAMPLE_OULAD_STU_101700 has an engagement_score of 0"
 }
 ]
 },
 {
 "title": "Total Clicks Engagement",
 "description": "SAMPLE_OULAD_STU_100788 also shows a higher total_clicks_norm compared to SAMPLE_OULAD_STU_101700, indicating more interactions with the course materials.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "total_clicks_norm",
 "value": 0.0522,
 "comparison": "baseline",
 "delta": -0.0522,
 "context": "SAMPLE_OULAD_STU_101700 has a total_clicks_norm of 0"
 }
 ]
 }
 ],
 "educational_implications": [
 "This is an engagement-only comparison; it does not establish academic risk or a cause of the observed gap."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is sufficient for making comparative claims based on the provided metrics.",
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
 "full_result_row_count": 6,
 "included_row_count": 6,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "engagement_comparison",
 "row_count": 6,
 "included_row_count": 6
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 6,
 "baseline_reference_tokens": 323,
 "task_aware_prompt_tokens": 1801,
 "token_ratio": 5.5759,
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
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "State the exact values for active_days_norm, engagement_score, and total_clicks_norm for both returned students, and identify the largest absolute gap.",
 "Do not infer academic performance or prescribe an intervention from engagement-only evidence."
 ],
 "must_keep_keys": [
 "comparison_matrix",
 "dataset_name",
 "entities",
 "entity_column",
 "largest_gap_evidence",
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (5.5759 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C02",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "State the exact values for active_days_norm, engagement_score, and total_clicks_norm for both returned students, and identify the largest absolute gap.",
 "Do not infer academic performance or prescribe an intervention from engagement-only evidence."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "engagement_comparison",
 "row_count": 6,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "entity_column": "student_id",
 "metrics": [
 {
 "metric": "active_days_norm",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 }
 },
 {
 "metric": "engagement_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "very_low_below": 0.25,
 "low_below": 0.5,
 "medium_below": 0.75,
 "high_at_or_above": 0.75
 }
 },
 {
 "metric": "total_clicks_norm",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 }
 }
 ],
 "metric_keys": [
 "active_days_norm",
 "engagement_score",
 "total_clicks_norm"
 ],
 "metric_key_column": "metric",
 "metric_value_column": "engagement_score",
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
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "active_days_norm": 0.3525,
 "engagement_score": 0.2024,
 "total_clicks_norm": 0.0522
 },
 "labels": {
 "study_effort_level": "very_low",
 "total_clicks": 1261,
 "active_days": 98
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {
 "active_days_norm": 0,
 "engagement_score": 0,
 "total_clicks_norm": 0
 },
 "labels": {
 "study_effort_level": "very_low",
 "total_clicks": 0,
 "active_days": 0
 }
 }
 ],
 "selected_entity_evidence": [],
 "largest_gap_evidence": {
 "metric": "active_days_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.3525,
 "absolute_gap": 0.3525
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [
 {
 "metric": "active_days_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.3525,
 "absolute_gap": 0.3525
 },
 {
 "metric": "engagement_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.2024,
 "absolute_gap": 0.2024
 },
 {
 "metric": "total_clicks_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.0522,
 "absolute_gap": 0.0522
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "active_days_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 0.3525,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "engagement_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 0.2024,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "total_clicks_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 0.0522,
 "direction_note": "left_entity is higher"
 }
 ],
 "metric_extrema": {
 "active_days_norm": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.3525
 }
 },
 "engagement_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2024
 }
 },
 "total_clicks_norm": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0522
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
 "metric_thresholds": true,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "total_clicks_norm": "ratio_0_1",
 "active_days_norm": "ratio_0_1",
 "engagement_score": "ratio_0_1"
 },
 "metric_directions": {
 "total_clicks_norm": "higher_is_better",
 "active_days_norm": "higher_is_better",
 "engagement_score": "higher_is_better"
 },
 "metric_thresholds": {
 "total_clicks_norm": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 },
 "active_days_norm": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 },
 "engagement_score": {
 "very_low_below": 0.25,
 "low_below": 0.5,
 "medium_below": 0.75,
 "high_at_or_above": 0.75
 }
 },
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "multi_metric_comparison",
 "dataset_name": "engagement_comparison",
 "row_count": 6,
 "entity_column": "student_id",
 "metric_key_column": "metric",
 "metric_value_column": "engagement_score",
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "metrics": [
 {
 "metric": "active_days_norm",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 }
 },
 {
 "metric": "engagement_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "very_low_below": 0.25,
 "low_below": 0.5,
 "medium_below": 0.75,
 "high_at_or_above": 0.75
 }
 },
 {
 "metric": "total_clicks_norm",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 }
 }
 ],
 "metric_keys": [
 "active_days_norm",
 "engagement_score",
 "total_clicks_norm"
 ],
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "active_days_norm": 0.3525,
 "engagement_score": 0.2024,
 "total_clicks_norm": 0.0522
 },
 "labels": {
 "study_effort_level": "very_low",
 "total_clicks": 1261,
 "active_days": 98
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {
 "active_days_norm": 0,
 "engagement_score": 0,
 "total_clicks_norm": 0
 },
 "labels": {
 "study_effort_level": "very_low",
 "total_clicks": 0,
 "active_days": 0
 }
 }
 ],
 "metric_extrema": {
 "active_days_norm": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.3525
 }
 },
 "engagement_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2024
 }
 },
 "total_clicks_norm": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0522
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "active_days_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.3525,
 "absolute_gap": 0.3525
 },
 {
 "metric": "engagement_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.2024,
 "absolute_gap": 0.2024
 },
 {
 "metric": "total_clicks_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.0522,
 "absolute_gap": 0.0522
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
 "metric_thresholds": true,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "total_clicks_norm": "ratio_0_1",
 "active_days_norm": "ratio_0_1",
 "engagement_score": "ratio_0_1"
 },
 "metric_directions": {
 "total_clicks_norm": "higher_is_better",
 "active_days_norm": "higher_is_better",
 "engagement_score": "higher_is_better"
 },
 "metric_thresholds": {
 "total_clicks_norm": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 },
 "active_days_norm": {
 "status": "not_applicable",
 "reason": "descriptive component metric"
 },
 "engagement_score": {
 "very_low_below": 0.25,
 "low_below": 0.5,
 "medium_below": 0.75,
 "high_at_or_above": 0.75
 }
 },
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [],
 "pairwise_direction_evidence": [
 {
 "metric": "active_days_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 0.3525,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "engagement_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 0.2024,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "total_clicks_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 0.0522,
 "direction_note": "left_entity is higher"
 }
 ],
 "largest_gap_evidence": {
 "metric": "active_days_norm",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.3525,
 "absolute_gap": 0.3525
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 6878,
 "token_usage": {
 "prompt_tokens": 2523,
 "completion_tokens": 626,
 "total_tokens": 3149
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000754
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
 "observed": "68726384d9ea133f2ddbb3ffd580c7ee18a8ad91280d9c40d955fc6222ed5857",
 "expected_values": [
 "68726384d9ea133f2ddbb3ffd580c7ee18a8ad91280d9c40d955fc6222ed5857"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "5ca289b6f3abfb1befd40ca0093124bfb749c65f378bea63c13d53c15f317582",
 "expected": "5ca289b6f3abfb1befd40ca0093124bfb749c65f378bea63c13d53c15f317582"
 },
 {
 "check_id": "numeric_fields_engagement_comparison",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "engagement_comparison",
 "numeric_columns": [
 "active_days",
 "engagement_score",
 "total_clicks"
 ],
 "numeric_summaries": {
 "active_days": {
 "count": 6,
 "min": 0,
 "max": 98
 },
 "engagement_score": {
 "count": 6,
 "min": 0,
 "max": 0.35251798561151076
 },
 "total_clicks": {
 "count": 6,
 "min": 0,
 "max": 1261
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_engagement_comparison",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "engagement_comparison",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```
