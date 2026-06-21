# LLM Judge Final Judge Context - SAMPLE_OULAD__A-C05__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-C05__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-C05",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Compare academic background",
 "scope": "2 students",
 "actionable_question": "Does one student face more structural disadvantage than the other?",
 "target_audience": "academic_advisor",
 "ai_summary_type": "multi_metric_comparison",
 "ai_prompt_hint": "Identify background-driven performance differences. Avoid causal claims.",
 "query_labels": [
 "background_comparison"
 ],
 "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
 "source_tables": [
 "student",
 "enrollment"
 ],
 "key_db_fields": [
 "highest_education",
 "previous_attempt_count",
 "imd_score_numeric",
 "socioeconomic_band",
 "disability_flag",
 "disadvantage_score [FE single]",
 "support_score [FE single]",
 "family_stability_score [FE single]"
 ],
 "output_schema": {},
 "query_labels": [
 "background_comparison"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-C05-CORE-01",
 "description": "Identify background-driven performance differences."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-C05-CONSTRAINT-01",
 "description": "Avoid causal claims."
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
 "dataset_label": "background_comparison",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C05.json",
 "artifact_sha256": "16a72c8aeb422fd6828703a33c5b3188d70812acd57a7a65c57dfdebfb8743fb",
 "row_count": 2,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 2,
 "prompt_embedded_row_count": 2,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "16a72c8aeb422fd6828703a33c5b3188d70812acd57a7a65c57dfdebfb8743fb",
 "evidence_rows_sha256": "3f87de9f868d8be1efe30bc019d3f72eac94a14d4e620bf248f72b9ed7a58285",
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
 "full_result_row_count": 2,
 "embedded_datasets_sha256": "3f87de9f868d8be1efe30bc019d3f72eac94a14d4e620bf248f72b9ed7a58285",
 "datasets": {
 "background_comparison": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "highest_education": "HE Qualification",
 "previous_attempt_count": 1,
 "imd_score_numeric": 85,
 "socioeconomic_band": "80-90%",
 "disability_flag": false,
 "disadvantage_score": 0.075,
 "support_score": 0,
 "family_stability_score": null,
 "mother_education_level": null,
 "father_education_level": null
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "highest_education": "A Level or Equivalent",
 "previous_attempt_count": 0,
 "imd_score_numeric": 15,
 "socioeconomic_band": "10-20",
 "disability_flag": true,
 "disadvantage_score": 0.725,
 "support_score": 0,
 "family_stability_score": null,
 "mother_education_level": null,
 "father_education_level": null
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-C05__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "109e7e46e4c7c4b0b6d04a3b187884a17bb2160c8c01e994abcb2850f7efbdf7",
 "generator_input_sha256": "9daeff076e8a9f63e19b891f9d4489f861a60f0be52a315f6174fb94dcf6e75a",
 "generator_input_compact": {
 "task_id": "A-C05",
 "execution_id": "exec_1781847669642_4a78c740",
 "task_name": "Compare academic background",
 "analysis_type": "comparison",
 "explanation_strategy": "comparison",
 "actionable_question": "Does one student face more structural disadvantage than the other?",
 "target_audience": [
 "academic_advisor"
 ],
 "query_labels": [
 "background_comparison"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "background_comparison"
 ],
 "dataset_row_counts": {
 "background_comparison": 2
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
 "raw_text": "Summary: Exact descriptive background comparison: student_id=SAMPLE_OULAD_STU_100788, highest_education=HE Qualification, previous_attempt_count=1, imd_score_numeric=85, socioeconomic_band=80-90%, disability_flag=False, disadvantage_score=0.075, support_score=0, family_stability_score=None, mother_education_level=None, father_education_level=None | student_id=SAMPLE_OULAD_STU_101700, highest_education=A Level or Equivalent, previous_attempt_count=0, imd_score_numeric=15, socioeconomic_band=10-20, disability_flag=True, disadvantage_score=0.725, support_score=0, family_stability_score=None, mother_education_level=None, father_education_level=None. performance_metric_present=false; background_driven_performance_difference=not_estimable.\n\nEducational implications: Background fields are descriptive context only and do not establish experience, academic outcomes, causes, or support needs.",
 "structured_payload": {
 "task_id": "A-C05",
 "execution_id": "exec_1781847669642_4a78c740",
 "explanation": {
 "summary": "Exact descriptive background comparison: student_id=SAMPLE_OULAD_STU_100788, highest_education=HE Qualification, previous_attempt_count=1, imd_score_numeric=85, socioeconomic_band=80-90%, disability_flag=False, disadvantage_score=0.075, support_score=0, family_stability_score=None, mother_education_level=None, father_education_level=None | student_id=SAMPLE_OULAD_STU_101700, highest_education=A Level or Equivalent, previous_attempt_count=0, imd_score_numeric=15, socioeconomic_band=10-20, disability_flag=True, disadvantage_score=0.725, support_score=0, family_stability_score=None, mother_education_level=None, father_education_level=None. performance_metric_present=false; background_driven_performance_difference=not_estimable.",
 "insights": [],
 "educational_implications": [
 "Background fields are descriptive context only and do not establish experience, academic outcomes, causes, or support needs."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is sufficient with no missing expected entities and clear metrics for comparison.",
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
 "full_result_row_count": 2,
 "included_row_count": 2,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "background_comparison",
 "row_count": 2,
 "included_row_count": 2
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 2,
 "baseline_reference_tokens": 207,
 "task_aware_prompt_tokens": 2158,
 "token_ratio": 10.4251,
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
 "Preserve every returned background value for both students and state that no performance metric is supplied, so a background-driven performance difference is not estimable.",
 "Treat education, prior attempts, IMD, disability, and disadvantage as descriptive context only; do not infer experience, outcomes, causes, or support needs."
 ],
 "must_keep_keys": [
 "background_scope_evidence",
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (10.4251 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C05",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "Preserve every returned background value for both students and state that no performance metric is supplied, so a background-driven performance difference is not estimable.",
 "Treat education, prior attempts, IMD, disability, and disadvantage as descriptive context only; do not infer experience, outcomes, causes, or support needs."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "background_comparison",
 "row_count": 2,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "entity_column": "student_id",
 "metrics": [
 {
 "metric": "previous_attempt_count",
 "unit": "count",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "imd_score_numeric",
 "unit": "dataset_index",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "disadvantage_score",
 "unit": "ratio_or_dataset_score",
 "direction": "higher_is_disadvantage",
 "threshold": null
 },
 {
 "metric": "support_score",
 "unit": "ratio_or_dataset_score",
 "direction": "higher_is_support",
 "threshold": null
 },
 {
 "metric": "family_stability_score",
 "unit": "ratio_or_dataset_score",
 "direction": "context_only",
 "threshold": null
 }
 ],
 "metric_keys": [],
 "metric_key_column": null,
 "metric_value_column": null,
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
 "previous_attempt_count": 1,
 "imd_score_numeric": 85,
 "disadvantage_score": 0.075,
 "support_score": 0,
 "family_stability_score": null
 },
 "labels": {
 "highest_education": "HE Qualification",
 "socioeconomic_band": "80-90%",
 "disability_flag": false
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {
 "previous_attempt_count": 0,
 "imd_score_numeric": 15,
 "disadvantage_score": 0.725,
 "support_score": 0,
 "family_stability_score": null
 },
 "labels": {
 "highest_education": "A Level or Equivalent",
 "socioeconomic_band": "10-20",
 "disability_flag": true
 }
 }
 ],
 "selected_entity_evidence": [],
 "background_scope_evidence": {
 "students": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "highest_education": "HE Qualification",
 "previous_attempt_count": 1,
 "imd_score_numeric": 85,
 "socioeconomic_band": "80-90%",
 "disability_flag": false,
 "disadvantage_score": 0.075,
 "support_score": 0,
 "family_stability_score": null,
 "mother_education_level": null,
 "father_education_level": null
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "highest_education": "A Level or Equivalent",
 "previous_attempt_count": 0,
 "imd_score_numeric": 15,
 "socioeconomic_band": "10-20",
 "disability_flag": true,
 "disadvantage_score": 0.725,
 "support_score": 0,
 "family_stability_score": null,
 "mother_education_level": null,
 "father_education_level": null
 }
 ],
 "performance_metric_present": false,
 "performance_difference_status": "not_estimable",
 "policy": "background_context_descriptive_only"
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -1,
 "absolute_gap": 1
 },
 {
 "metric": "imd_score_numeric",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -70,
 "absolute_gap": 70
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": 0.65,
 "absolute_gap": 0.65
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 1,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "imd_score_numeric",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 70,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_101700",
 "lower_entity": "SAMPLE_OULAD_STU_100788",
 "difference": 0.65,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 }
 ],
 "metric_extrema": {
 "previous_attempt_count": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "imd_score_numeric": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 15
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 85
 }
 },
 "disadvantage_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.075
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0.725
 }
 },
 "support_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_metric_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_100788",
 "metric": "family_stability_score",
 "reason": "family_stability_score is missing or non-numeric"
 },
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "metric": "family_stability_score",
 "reason": "family_stability_score is missing or non-numeric"
 }
 ],
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
 "previous_attempt_count": "count",
 "imd_score_numeric": "dataset_index",
 "disadvantage_score": "ratio_or_dataset_score",
 "support_score": "ratio_or_dataset_score",
 "family_stability_score": "ratio_or_dataset_score"
 },
 "metric_directions": {
 "previous_attempt_count": "context_only",
 "imd_score_numeric": "context_only",
 "disadvantage_score": "higher_is_disadvantage",
 "support_score": "higher_is_support",
 "family_stability_score": "context_only"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": "descriptive_non_causal_no_action"
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Found 2 missing or non-numeric metric values; they remain explicit missing evidence and were not replaced with zero.",
 "Sensitive/background context is descriptive only under policy 'descriptive_non_causal_no_action'; do not infer causality or prescribe action from it."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "multi_metric_comparison",
 "dataset_name": "background_comparison",
 "row_count": 2,
 "entity_column": "student_id",
 "metric_key_column": null,
 "metric_value_column": null,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "metrics": [
 {
 "metric": "previous_attempt_count",
 "unit": "count",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "imd_score_numeric",
 "unit": "dataset_index",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "disadvantage_score",
 "unit": "ratio_or_dataset_score",
 "direction": "higher_is_disadvantage",
 "threshold": null
 },
 {
 "metric": "support_score",
 "unit": "ratio_or_dataset_score",
 "direction": "higher_is_support",
 "threshold": null
 },
 {
 "metric": "family_stability_score",
 "unit": "ratio_or_dataset_score",
 "direction": "context_only",
 "threshold": null
 }
 ],
 "metric_keys": [],
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "previous_attempt_count": 1,
 "imd_score_numeric": 85,
 "disadvantage_score": 0.075,
 "support_score": 0,
 "family_stability_score": null
 },
 "labels": {
 "highest_education": "HE Qualification",
 "socioeconomic_band": "80-90%",
 "disability_flag": false
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {
 "previous_attempt_count": 0,
 "imd_score_numeric": 15,
 "disadvantage_score": 0.725,
 "support_score": 0,
 "family_stability_score": null
 },
 "labels": {
 "highest_education": "A Level or Equivalent",
 "socioeconomic_band": "10-20",
 "disability_flag": true
 }
 }
 ],
 "metric_extrema": {
 "previous_attempt_count": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "imd_score_numeric": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 15
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 85
 }
 },
 "disadvantage_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.075
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0.725
 }
 },
 "support_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -1,
 "absolute_gap": 1
 },
 {
 "metric": "imd_score_numeric",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -70,
 "absolute_gap": 70
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": 0.65,
 "absolute_gap": 0.65
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 }
 ],
 "missing_metric_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_100788",
 "metric": "family_stability_score",
 "reason": "family_stability_score is missing or non-numeric"
 },
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "metric": "family_stability_score",
 "reason": "family_stability_score is missing or non-numeric"
 }
 ],
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
 "previous_attempt_count": "count",
 "imd_score_numeric": "dataset_index",
 "disadvantage_score": "ratio_or_dataset_score",
 "support_score": "ratio_or_dataset_score",
 "family_stability_score": "ratio_or_dataset_score"
 },
 "metric_directions": {
 "previous_attempt_count": "context_only",
 "imd_score_numeric": "context_only",
 "disadvantage_score": "higher_is_disadvantage",
 "support_score": "higher_is_support",
 "family_stability_score": "context_only"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": "descriptive_non_causal_no_action"
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Found 2 missing or non-numeric metric values; they remain explicit missing evidence and were not replaced with zero.",
 "Sensitive/background context is descriptive only under policy 'descriptive_non_causal_no_action'; do not infer causality or prescribe action from it."
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 1,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "imd_score_numeric",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 70,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_101700",
 "lower_entity": "SAMPLE_OULAD_STU_100788",
 "difference": 0.65,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 }
 ],
 "background_scope_evidence": {
 "students": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "highest_education": "HE Qualification",
 "previous_attempt_count": 1,
 "imd_score_numeric": 85,
 "socioeconomic_band": "80-90%",
 "disability_flag": false,
 "disadvantage_score": 0.075,
 "support_score": 0,
 "family_stability_score": null,
 "mother_education_level": null,
 "father_education_level": null
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "highest_education": "A Level or Equivalent",
 "previous_attempt_count": 0,
 "imd_score_numeric": 15,
 "socioeconomic_band": "10-20",
 "disability_flag": true,
 "disadvantage_score": 0.725,
 "support_score": 0,
 "family_stability_score": null,
 "mother_education_level": null,
 "father_education_level": null
 }
 ],
 "performance_metric_present": false,
 "performance_difference_status": "not_estimable",
 "policy": "background_context_descriptive_only"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 9292,
 "token_usage": {
 "prompt_tokens": 2676,
 "completion_tokens": 632,
 "total_tokens": 3308
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000781
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-C05__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "109e7e46e4c7c4b0b6d04a3b187884a17bb2160c8c01e994abcb2850f7efbdf7",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2676,
 "completion_tokens": 632,
 "total_tokens": 3308
 },
 "latency_ms": 9304,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-C05",
 "execution_id": "exec_1781847669642_4a78c740",
 "explanation": {
 "summary": "Exact descriptive background comparison: student_id=SAMPLE_OULAD_STU_100788, highest_education=HE Qualification, previous_attempt_count=1, imd_score_numeric=85, socioeconomic_band=80-90%, disability_flag=False, disadvantage_score=0.075, support_score=0, family_stability_score=None, mother_education_level=None, father_education_level=None | student_id=SAMPLE_OULAD_STU_101700, highest_education=A Level or Equivalent, previous_attempt_count=0, imd_score_numeric=15, socioeconomic_band=10-20, disability_flag=True, disadvantage_score=0.725, support_score=0, family_stability_score=None, mother_education_level=None, father_education_level=None. performance_metric_present=false; background_driven_performance_difference=not_estimable.",
 "insights": [],
 "educational_implications": [
 "Background fields are descriptive context only and do not establish experience, academic outcomes, causes, or support needs."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is sufficient with no missing expected entities and clear metrics for comparison.",
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
 "full_result_row_count": 2,
 "included_row_count": 2,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "background_comparison",
 "row_count": 2,
 "included_row_count": 2
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 2,
 "baseline_reference_tokens": 207,
 "task_aware_prompt_tokens": 2158,
 "token_ratio": 10.4251,
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
 "Preserve every returned background value for both students and state that no performance metric is supplied, so a background-driven performance difference is not estimable.",
 "Treat education, prior attempts, IMD, disability, and disadvantage as descriptive context only; do not infer experience, outcomes, causes, or support needs."
 ],
 "must_keep_keys": [
 "background_scope_evidence",
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (10.4251 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C05",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "Preserve every returned background value for both students and state that no performance metric is supplied, so a background-driven performance difference is not estimable.",
 "Treat education, prior attempts, IMD, disability, and disadvantage as descriptive context only; do not infer experience, outcomes, causes, or support needs."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "background_comparison",
 "row_count": 2,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "entity_column": "student_id",
 "metrics": [
 {
 "metric": "previous_attempt_count",
 "unit": "count",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "imd_score_numeric",
 "unit": "dataset_index",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "disadvantage_score",
 "unit": "ratio_or_dataset_score",
 "direction": "higher_is_disadvantage",
 "threshold": null
 },
 {
 "metric": "support_score",
 "unit": "ratio_or_dataset_score",
 "direction": "higher_is_support",
 "threshold": null
 },
 {
 "metric": "family_stability_score",
 "unit": "ratio_or_dataset_score",
 "direction": "context_only",
 "threshold": null
 }
 ],
 "metric_keys": [],
 "metric_key_column": null,
 "metric_value_column": null,
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
 "previous_attempt_count": 1,
 "imd_score_numeric": 85,
 "disadvantage_score": 0.075,
 "support_score": 0,
 "family_stability_score": null
 },
 "labels": {
 "highest_education": "HE Qualification",
 "socioeconomic_band": "80-90%",
 "disability_flag": false
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {
 "previous_attempt_count": 0,
 "imd_score_numeric": 15,
 "disadvantage_score": 0.725,
 "support_score": 0,
 "family_stability_score": null
 },
 "labels": {
 "highest_education": "A Level or Equivalent",
 "socioeconomic_band": "10-20",
 "disability_flag": true
 }
 }
 ],
 "selected_entity_evidence": [],
 "background_scope_evidence": {
 "students": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "highest_education": "HE Qualification",
 "previous_attempt_count": 1,
 "imd_score_numeric": 85,
 "socioeconomic_band": "80-90%",
 "disability_flag": false,
 "disadvantage_score": 0.075,
 "support_score": 0,
 "family_stability_score": null,
 "mother_education_level": null,
 "father_education_level": null
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "highest_education": "A Level or Equivalent",
 "previous_attempt_count": 0,
 "imd_score_numeric": 15,
 "socioeconomic_band": "10-20",
 "disability_flag": true,
 "disadvantage_score": 0.725,
 "support_score": 0,
 "family_stability_score": null,
 "mother_education_level": null,
 "father_education_level": null
 }
 ],
 "performance_metric_present": false,
 "performance_difference_status": "not_estimable",
 "policy": "background_context_descriptive_only"
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -1,
 "absolute_gap": 1
 },
 {
 "metric": "imd_score_numeric",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -70,
 "absolute_gap": 70
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": 0.65,
 "absolute_gap": 0.65
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 1,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "imd_score_numeric",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 70,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_101700",
 "lower_entity": "SAMPLE_OULAD_STU_100788",
 "difference": 0.65,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 }
 ],
 "metric_extrema": {
 "previous_attempt_count": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "imd_score_numeric": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 15
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 85
 }
 },
 "disadvantage_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.075
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0.725
 }
 },
 "support_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_metric_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_100788",
 "metric": "family_stability_score",
 "reason": "family_stability_score is missing or non-numeric"
 },
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "metric": "family_stability_score",
 "reason": "family_stability_score is missing or non-numeric"
 }
 ],
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
 "previous_attempt_count": "count",
 "imd_score_numeric": "dataset_index",
 "disadvantage_score": "ratio_or_dataset_score",
 "support_score": "ratio_or_dataset_score",
 "family_stability_score": "ratio_or_dataset_score"
 },
 "metric_directions": {
 "previous_attempt_count": "context_only",
 "imd_score_numeric": "context_only",
 "disadvantage_score": "higher_is_disadvantage",
 "support_score": "higher_is_support",
 "family_stability_score": "context_only"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": "descriptive_non_causal_no_action"
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Found 2 missing or non-numeric metric values; they remain explicit missing evidence and were not replaced with zero.",
 "Sensitive/background context is descriptive only under policy 'descriptive_non_causal_no_action'; do not infer causality or prescribe action from it."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "multi_metric_comparison",
 "dataset_name": "background_comparison",
 "row_count": 2,
 "entity_column": "student_id",
 "metric_key_column": null,
 "metric_value_column": null,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "metrics": [
 {
 "metric": "previous_attempt_count",
 "unit": "count",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "imd_score_numeric",
 "unit": "dataset_index",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "disadvantage_score",
 "unit": "ratio_or_dataset_score",
 "direction": "higher_is_disadvantage",
 "threshold": null
 },
 {
 "metric": "support_score",
 "unit": "ratio_or_dataset_score",
 "direction": "higher_is_support",
 "threshold": null
 },
 {
 "metric": "family_stability_score",
 "unit": "ratio_or_dataset_score",
 "direction": "context_only",
 "threshold": null
 }
 ],
 "metric_keys": [],
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "previous_attempt_count": 1,
 "imd_score_numeric": 85,
 "disadvantage_score": 0.075,
 "support_score": 0,
 "family_stability_score": null
 },
 "labels": {
 "highest_education": "HE Qualification",
 "socioeconomic_band": "80-90%",
 "disability_flag": false
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {
 "previous_attempt_count": 0,
 "imd_score_numeric": 15,
 "disadvantage_score": 0.725,
 "support_score": 0,
 "family_stability_score": null
 },
 "labels": {
 "highest_education": "A Level or Equivalent",
 "socioeconomic_band": "10-20",
 "disability_flag": true
 }
 }
 ],
 "metric_extrema": {
 "previous_attempt_count": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "imd_score_numeric": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 15
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 85
 }
 },
 "disadvantage_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.075
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 0.725
 }
 },
 "support_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -1,
 "absolute_gap": 1
 },
 {
 "metric": "imd_score_numeric",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -70,
 "absolute_gap": 70
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": 0.65,
 "absolute_gap": 0.65
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 }
 ],
 "missing_metric_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_100788",
 "metric": "family_stability_score",
 "reason": "family_stability_score is missing or non-numeric"
 },
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "metric": "family_stability_score",
 "reason": "family_stability_score is missing or non-numeric"
 }
 ],
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
 "previous_attempt_count": "count",
 "imd_score_numeric": "dataset_index",
 "disadvantage_score": "ratio_or_dataset_score",
 "support_score": "ratio_or_dataset_score",
 "family_stability_score": "ratio_or_dataset_score"
 },
 "metric_directions": {
 "previous_attempt_count": "context_only",
 "imd_score_numeric": "context_only",
 "disadvantage_score": "higher_is_disadvantage",
 "support_score": "higher_is_support",
 "family_stability_score": "context_only"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": "descriptive_non_causal_no_action"
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Found 2 missing or non-numeric metric values; they remain explicit missing evidence and were not replaced with zero.",
 "Sensitive/background context is descriptive only under policy 'descriptive_non_causal_no_action'; do not infer causality or prescribe action from it."
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 1,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "imd_score_numeric",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 70,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_101700",
 "lower_entity": "SAMPLE_OULAD_STU_100788",
 "difference": 0.65,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 }
 ],
 "background_scope_evidence": {
 "students": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "highest_education": "HE Qualification",
 "previous_attempt_count": 1,
 "imd_score_numeric": 85,
 "socioeconomic_band": "80-90%",
 "disability_flag": false,
 "disadvantage_score": 0.075,
 "support_score": 0,
 "family_stability_score": null,
 "mother_education_level": null,
 "father_education_level": null
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "highest_education": "A Level or Equivalent",
 "previous_attempt_count": 0,
 "imd_score_numeric": 15,
 "socioeconomic_band": "10-20",
 "disability_flag": true,
 "disadvantage_score": 0.725,
 "support_score": 0,
 "family_stability_score": null,
 "mother_education_level": null,
 "father_education_level": null
 }
 ],
 "performance_metric_present": false,
 "performance_difference_status": "not_estimable",
 "policy": "background_context_descriptive_only"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 9292,
 "token_usage": {
 "prompt_tokens": 2676,
 "completion_tokens": 632,
 "total_tokens": 3308
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000781
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
 "expected": 2,
 "observed": 2
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "16a72c8aeb422fd6828703a33c5b3188d70812acd57a7a65c57dfdebfb8743fb",
 "expected_values": [
 "16a72c8aeb422fd6828703a33c5b3188d70812acd57a7a65c57dfdebfb8743fb"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "3f87de9f868d8be1efe30bc019d3f72eac94a14d4e620bf248f72b9ed7a58285",
 "expected": "3f87de9f868d8be1efe30bc019d3f72eac94a14d4e620bf248f72b9ed7a58285"
 },
 {
 "check_id": "numeric_fields_background_comparison",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "background_comparison",
 "numeric_columns": [
 "disadvantage_score",
 "imd_score_numeric",
 "previous_attempt_count",
 "support_score"
 ],
 "numeric_summaries": {
 "disadvantage_score": {
 "count": 2,
 "min": 0.075,
 "max": 0.725
 },
 "imd_score_numeric": {
 "count": 2,
 "min": 15,
 "max": 85
 },
 "previous_attempt_count": {
 "count": 2,
 "min": 0,
 "max": 1
 },
 "support_score": {
 "count": 2,
 "min": 0,
 "max": 0
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_background_comparison",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "background_comparison",
 "flag_columns": [
 "disability_flag"
 ],
 "triggered_like_counts": {
 "disability_flag": 1
 }
 }
]
```
