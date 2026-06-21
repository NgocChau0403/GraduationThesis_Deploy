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

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C05__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__A-C05__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
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
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-C05.json",
 "artifact_sha256": "255d44b8db1c6f7c9f3050f88ca33b6dbf8e435493d83a871ffaf61513400e7c",
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
 "evidence_artifact_file_sha256": "255d44b8db1c6f7c9f3050f88ca33b6dbf8e435493d83a871ffaf61513400e7c",
 "evidence_rows_sha256": "ea264e7bf6e16912946cd57c73676e94fe583b4905823c82b6d6e8c24ead5d6f",
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
 "embedded_datasets_sha256": "ea264e7bf6e16912946cd57c73676e94fe583b4905823c82b6d6e8c24ead5d6f",
 "datasets": {
 "background_comparison": [
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "highest_education": "Parent education 4/4",
 "previous_attempt_count": 0,
 "imd_score_numeric": null,
 "socioeconomic_band": null,
 "disability_flag": null,
 "disadvantage_score": 0.2,
 "support_score": 0.25,
 "family_stability_score": 0.575,
 "mother_education_level": "4",
 "father_education_level": "4"
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "highest_education": "Parent education 1/4",
 "previous_attempt_count": 0,
 "imd_score_numeric": null,
 "socioeconomic_band": null,
 "disability_flag": null,
 "disadvantage_score": 0.4,
 "support_score": 0.5,
 "family_stability_score": 0.8500000000000001,
 "mother_education_level": "1",
 "father_education_level": "1"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-C05__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "7725baf627645f1706a6a0db7e7f8ee0d72d76377f2d6b2c72bc770b2e0e4d4d",
 "generator_input_sha256": "b7295f00f33cc80a8848b0b9f88109e7d915c4ac9b0500f8a4ef44b2a91628a6",
 "generator_input_compact": {
 "task_id": "A-C05",
 "execution_id": "exec_1781847232057_25cc847c",
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
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
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
 "raw_text": "Summary: The comparison of two students reveals significant differences in their structural disadvantages and support systems. Student SAMPLE_UCI_POR_STU_000002 exhibits higher disadvantage and support scores, indicating a more challenging background compared to SAMPLE_UCI_POR_STU_000001.\n\nInsights: Disadvantage Score Comparison: SAMPLE_UCI_POR_STU_000002 has a higher disadvantage score, indicating a greater structural disadvantage. | Support Score Comparison: SAMPLE_UCI_POR_STU_000002 also has a higher support score, which may indicate better access to resources despite the higher disadvantage. | Family Stability Score Comparison: SAMPLE_UCI_POR_STU_000002 has a higher family stability score, which may mitigate some of the disadvantages faced.\n\nEducational implications: Students with higher disadvantage scores may require additional support to succeed academically.\n\nRecommendations: high - Implement targeted support programs for students with high disadvantage scores. - To address the structural challenges faced by students like SAMPLE_UCI_POR_STU_000002.",
 "structured_payload": {
 "task_id": "A-C05",
 "execution_id": "exec_1781847232057_25cc847c",
 "explanation": {
 "summary": "The comparison of two students reveals significant differences in their structural disadvantages and support systems. Student SAMPLE_UCI_POR_STU_000002 exhibits higher disadvantage and support scores, indicating a more challenging background compared to SAMPLE_UCI_POR_STU_000001.",
 "insights": [
 {
 "title": "Disadvantage Score Comparison",
 "description": "SAMPLE_UCI_POR_STU_000002 has a higher disadvantage score, indicating a greater structural disadvantage.",
 "severity": "high",
 "evidence": [
 {
 "metric": "disadvantage_score",
 "value": 0.4,
 "comparison": "baseline",
 "delta": 0.2,
 "context": "SAMPLE_UCI_POR_STU_000002 has a disadvantage score of 0.4 compared to 0.2 for SAMPLE_UCI_POR_STU_000001."
 }
 ]
 },
 {
 "title": "Support Score Comparison",
 "description": "SAMPLE_UCI_POR_STU_000002 also has a higher support score, which may indicate better access to resources despite the higher disadvantage.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "support_score",
 "value": 0.5,
 "comparison": "baseline",
 "delta": 0.25,
 "context": "SAMPLE_UCI_POR_STU_000002's support score is 0.5, compared to 0.25 for SAMPLE_UCI_POR_STU_000001."
 }
 ]
 },
 {
 "title": "Family Stability Score Comparison",
 "description": "SAMPLE_UCI_POR_STU_000002 has a higher family stability score, which may mitigate some of the disadvantages faced.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "family_stability_score",
 "value": 0.85,
 "comparison": "baseline",
 "delta": 0.275,
 "context": "SAMPLE_UCI_POR_STU_000002's family stability score is 0.85, compared to 0.575 for SAMPLE_UCI_POR_STU_000001."
 }
 ]
 }
 ],
 "educational_implications": [
 "Students with higher disadvantage scores may require additional support to succeed academically."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted support programs for students with high disadvantage scores.",
 "rationale": "To address the structural challenges faced by students like SAMPLE_UCI_POR_STU_000002."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is sufficient for comparison, with clear metrics available for analysis.",
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
 "baseline_reference_tokens": 211,
 "task_aware_prompt_tokens": 1782,
 "token_ratio": 8.4455,
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (8.4455 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C05",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "background_comparison",
 "row_count": 2,
 "entities": [
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
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
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "metrics": {
 "previous_attempt_count": 0,
 "imd_score_numeric": null,
 "disadvantage_score": 0.2,
 "support_score": 0.25,
 "family_stability_score": 0.575
 },
 "labels": {
 "highest_education": "Parent education 4/4"
 }
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "metrics": {
 "previous_attempt_count": 0,
 "imd_score_numeric": null,
 "disadvantage_score": 0.4,
 "support_score": 0.5,
 "family_stability_score": 0.85
 },
 "labels": {
 "highest_education": "Parent education 1/4"
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
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0.2,
 "absolute_gap": 0.2
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0.25,
 "absolute_gap": 0.25
 },
 {
 "metric": "family_stability_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0.275,
 "absolute_gap": 0.275
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000002",
 "lower_entity": "SAMPLE_UCI_POR_STU_000001",
 "difference": 0.2,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000002",
 "lower_entity": "SAMPLE_UCI_POR_STU_000001",
 "difference": 0.25,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "family_stability_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000002",
 "lower_entity": "SAMPLE_UCI_POR_STU_000001",
 "difference": 0.275,
 "direction_note": "right_entity is higher"
 }
 ],
 "metric_extrema": {
 "previous_attempt_count": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0
 }
 },
 "disadvantage_score": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0.2
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 0.4
 }
 },
 "support_score": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0.25
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 0.5
 }
 },
 "family_stability_score": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0.575
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 0.85
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
 "entity": "SAMPLE_UCI_POR_STU_000001",
 "metric": "imd_score_numeric",
 "reason": "imd_score_numeric is missing or non-numeric"
 },
 {
 "entity": "SAMPLE_UCI_POR_STU_000002",
 "metric": "imd_score_numeric",
 "reason": "imd_score_numeric is missing or non-numeric"
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
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
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
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "metrics": {
 "previous_attempt_count": 0,
 "imd_score_numeric": null,
 "disadvantage_score": 0.2,
 "support_score": 0.25,
 "family_stability_score": 0.575
 },
 "labels": {
 "highest_education": "Parent education 4/4"
 }
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "metrics": {
 "previous_attempt_count": 0,
 "imd_score_numeric": null,
 "disadvantage_score": 0.4,
 "support_score": 0.5,
 "family_stability_score": 0.85
 },
 "labels": {
 "highest_education": "Parent education 1/4"
 }
 }
 ],
 "metric_extrema": {
 "previous_attempt_count": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0
 }
 },
 "disadvantage_score": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0.2
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 0.4
 }
 },
 "support_score": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0.25
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 0.5
 }
 },
 "family_stability_score": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0.575
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 0.85
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0.2,
 "absolute_gap": 0.2
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0.25,
 "absolute_gap": 0.25
 },
 {
 "metric": "family_stability_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0.275,
 "absolute_gap": 0.275
 }
 ],
 "missing_metric_evidence": [
 {
 "entity": "SAMPLE_UCI_POR_STU_000001",
 "metric": "imd_score_numeric",
 "reason": "imd_score_numeric is missing or non-numeric"
 },
 {
 "entity": "SAMPLE_UCI_POR_STU_000002",
 "metric": "imd_score_numeric",
 "reason": "imd_score_numeric is missing or non-numeric"
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
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000002",
 "lower_entity": "SAMPLE_UCI_POR_STU_000001",
 "difference": 0.2,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000002",
 "lower_entity": "SAMPLE_UCI_POR_STU_000001",
 "difference": 0.25,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "family_stability_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000002",
 "lower_entity": "SAMPLE_UCI_POR_STU_000001",
 "difference": 0.275,
 "direction_note": "right_entity is higher"
 }
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8646,
 "token_usage": {
 "prompt_tokens": 2381,
 "completion_tokens": 627,
 "total_tokens": 3008
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000733
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-C05__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "7725baf627645f1706a6a0db7e7f8ee0d72d76377f2d6b2c72bc770b2e0e4d4d",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2381,
 "completion_tokens": 627,
 "total_tokens": 3008
 },
 "latency_ms": 8660,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-C05",
 "execution_id": "exec_1781847232057_25cc847c",
 "explanation": {
 "summary": "The comparison of two students reveals significant differences in their structural disadvantages and support systems. Student SAMPLE_UCI_POR_STU_000002 exhibits higher disadvantage and support scores, indicating a more challenging background compared to SAMPLE_UCI_POR_STU_000001.",
 "insights": [
 {
 "title": "Disadvantage Score Comparison",
 "description": "SAMPLE_UCI_POR_STU_000002 has a higher disadvantage score, indicating a greater structural disadvantage.",
 "severity": "high",
 "evidence": [
 {
 "metric": "disadvantage_score",
 "value": 0.4,
 "comparison": "baseline",
 "delta": 0.2,
 "context": "SAMPLE_UCI_POR_STU_000002 has a disadvantage score of 0.4 compared to 0.2 for SAMPLE_UCI_POR_STU_000001."
 }
 ]
 },
 {
 "title": "Support Score Comparison",
 "description": "SAMPLE_UCI_POR_STU_000002 also has a higher support score, which may indicate better access to resources despite the higher disadvantage.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "support_score",
 "value": 0.5,
 "comparison": "baseline",
 "delta": 0.25,
 "context": "SAMPLE_UCI_POR_STU_000002's support score is 0.5, compared to 0.25 for SAMPLE_UCI_POR_STU_000001."
 }
 ]
 },
 {
 "title": "Family Stability Score Comparison",
 "description": "SAMPLE_UCI_POR_STU_000002 has a higher family stability score, which may mitigate some of the disadvantages faced.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "family_stability_score",
 "value": 0.85,
 "comparison": "baseline",
 "delta": 0.275,
 "context": "SAMPLE_UCI_POR_STU_000002's family stability score is 0.85, compared to 0.575 for SAMPLE_UCI_POR_STU_000001."
 }
 ]
 }
 ],
 "educational_implications": [
 "Students with higher disadvantage scores may require additional support to succeed academically."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted support programs for students with high disadvantage scores.",
 "rationale": "To address the structural challenges faced by students like SAMPLE_UCI_POR_STU_000002."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is sufficient for comparison, with clear metrics available for analysis.",
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
 "baseline_reference_tokens": 211,
 "task_aware_prompt_tokens": 1782,
 "token_ratio": 8.4455,
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (8.4455 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C05",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "background_comparison",
 "row_count": 2,
 "entities": [
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
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
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "metrics": {
 "previous_attempt_count": 0,
 "imd_score_numeric": null,
 "disadvantage_score": 0.2,
 "support_score": 0.25,
 "family_stability_score": 0.575
 },
 "labels": {
 "highest_education": "Parent education 4/4"
 }
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "metrics": {
 "previous_attempt_count": 0,
 "imd_score_numeric": null,
 "disadvantage_score": 0.4,
 "support_score": 0.5,
 "family_stability_score": 0.85
 },
 "labels": {
 "highest_education": "Parent education 1/4"
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
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0.2,
 "absolute_gap": 0.2
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0.25,
 "absolute_gap": 0.25
 },
 {
 "metric": "family_stability_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0.275,
 "absolute_gap": 0.275
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000002",
 "lower_entity": "SAMPLE_UCI_POR_STU_000001",
 "difference": 0.2,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000002",
 "lower_entity": "SAMPLE_UCI_POR_STU_000001",
 "difference": 0.25,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "family_stability_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000002",
 "lower_entity": "SAMPLE_UCI_POR_STU_000001",
 "difference": 0.275,
 "direction_note": "right_entity is higher"
 }
 ],
 "metric_extrema": {
 "previous_attempt_count": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0
 }
 },
 "disadvantage_score": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0.2
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 0.4
 }
 },
 "support_score": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0.25
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 0.5
 }
 },
 "family_stability_score": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0.575
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 0.85
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
 "entity": "SAMPLE_UCI_POR_STU_000001",
 "metric": "imd_score_numeric",
 "reason": "imd_score_numeric is missing or non-numeric"
 },
 {
 "entity": "SAMPLE_UCI_POR_STU_000002",
 "metric": "imd_score_numeric",
 "reason": "imd_score_numeric is missing or non-numeric"
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
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
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
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "metrics": {
 "previous_attempt_count": 0,
 "imd_score_numeric": null,
 "disadvantage_score": 0.2,
 "support_score": 0.25,
 "family_stability_score": 0.575
 },
 "labels": {
 "highest_education": "Parent education 4/4"
 }
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "metrics": {
 "previous_attempt_count": 0,
 "imd_score_numeric": null,
 "disadvantage_score": 0.4,
 "support_score": 0.5,
 "family_stability_score": 0.85
 },
 "labels": {
 "highest_education": "Parent education 1/4"
 }
 }
 ],
 "metric_extrema": {
 "previous_attempt_count": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0
 }
 },
 "disadvantage_score": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0.2
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 0.4
 }
 },
 "support_score": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0.25
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 0.5
 }
 },
 "family_stability_score": {
 "min": {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "value": 0.575
 },
 "max": {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "value": 0.85
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0,
 "absolute_gap": 0
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0.2,
 "absolute_gap": 0.2
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0.25,
 "absolute_gap": 0.25
 },
 {
 "metric": "family_stability_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "gap_right_minus_left": 0.275,
 "absolute_gap": 0.275
 }
 ],
 "missing_metric_evidence": [
 {
 "entity": "SAMPLE_UCI_POR_STU_000001",
 "metric": "imd_score_numeric",
 "reason": "imd_score_numeric is missing or non-numeric"
 },
 {
 "entity": "SAMPLE_UCI_POR_STU_000002",
 "metric": "imd_score_numeric",
 "reason": "imd_score_numeric is missing or non-numeric"
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
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": null,
 "lower_entity": null,
 "difference": 0,
 "direction_note": "entities are tied"
 },
 {
 "metric": "disadvantage_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000002",
 "lower_entity": "SAMPLE_UCI_POR_STU_000001",
 "difference": 0.2,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "support_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000002",
 "lower_entity": "SAMPLE_UCI_POR_STU_000001",
 "difference": 0.25,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "family_stability_score",
 "left_entity": "SAMPLE_UCI_POR_STU_000001",
 "right_entity": "SAMPLE_UCI_POR_STU_000002",
 "higher_entity": "SAMPLE_UCI_POR_STU_000002",
 "lower_entity": "SAMPLE_UCI_POR_STU_000001",
 "difference": 0.275,
 "direction_note": "right_entity is higher"
 }
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8646,
 "token_usage": {
 "prompt_tokens": 2381,
 "completion_tokens": 627,
 "total_tokens": 3008
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000733
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
 "observed": "255d44b8db1c6f7c9f3050f88ca33b6dbf8e435493d83a871ffaf61513400e7c",
 "expected_values": [
 "255d44b8db1c6f7c9f3050f88ca33b6dbf8e435493d83a871ffaf61513400e7c"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "ea264e7bf6e16912946cd57c73676e94fe583b4905823c82b6d6e8c24ead5d6f",
 "expected": "ea264e7bf6e16912946cd57c73676e94fe583b4905823c82b6d6e8c24ead5d6f"
 },
 {
 "check_id": "numeric_fields_background_comparison",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "background_comparison",
 "numeric_columns": [
 "disadvantage_score",
 "family_stability_score",
 "previous_attempt_count",
 "support_score"
 ],
 "numeric_summaries": {
 "disadvantage_score": {
 "count": 2,
 "min": 0.2,
 "max": 0.4
 },
 "family_stability_score": {
 "count": 2,
 "min": 0.575,
 "max": 0.8500000000000001
 },
 "previous_attempt_count": {
 "count": 2,
 "min": 0,
 "max": 0
 },
 "support_score": {
 "count": 2,
 "min": 0.25,
 "max": 0.5
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
 "disability_flag": 0
 }
 }
]
```

