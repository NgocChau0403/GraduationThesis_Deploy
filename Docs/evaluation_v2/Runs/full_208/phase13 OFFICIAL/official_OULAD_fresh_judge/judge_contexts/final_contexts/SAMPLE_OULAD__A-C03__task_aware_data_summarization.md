# LLM Judge Final Judge Context - SAMPLE_OULAD__A-C03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-C03__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-C03",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Compare risk profile",
 "scope": "2 students",
 "actionable_question": "Who is at higher risk and what are the key differences?",
 "target_audience": "instructor, academic_advisor",
 "ai_summary_type": "multi_metric_comparison",
 "ai_prompt_hint": "Compare the two returned student rows. Use at_risk_score, at_risk_label, and explicit flag_* columns to explain who needs more urgent intervention. If avg_score is null, state that score evidence is missing rather than guessing.",
 "query_labels": [
 "risk_comparison"
 ],
 "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
 "source_tables": [
 "enrollment",
 "assessment_result",
 "assessment",
 "engagement"
 ],
 "key_db_fields": [
 "student_id [FE cross]",
 "at_risk_score [FE cross]",
 "at_risk_label [FE cross]",
 "avg_score [FE cross]",
 "engagement_score [FE cross]",
 "punctuality_rate [FE cross]",
 "performance_trend [FE cross]",
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend",
 "previous_attempt_count",
 "final_outcome"
 ],
 "output_schema": {
 "required_columns": [
 "student_id",
 "at_risk_score",
 "at_risk_label"
 ],
 "optional_columns": [
 "avg_score",
 "performance_trend",
 "punctuality_rate",
 "engagement_score",
 "previous_attempt_count",
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend",
 "final_outcome"
 ]
 },
 "query_labels": [
 "risk_comparison"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-C03-CORE-01",
 "description": "Compare the two returned student rows."
 },
 {
 "requirement_id": "A-C03-CORE-02",
 "description": "Use at_risk_score, at_risk_label, and explicit flag_* columns to explain who needs more urgent intervention."
 }
 ],
 "required_supporting_outputs": [
 {
 "requirement_id": "A-C03-SUPPORT-01",
 "description": "If avg_score is null, state that score evidence is missing rather than guessing."
 }
 ],
 "evaluation_constraints": [],
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
 "dataset_label": "risk_comparison",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C03.json",
 "artifact_sha256": "2886031e4c40c8c932fa9581baab3d88ed9987ec9c8c020a8012156ac728c097",
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
 "evidence_artifact_file_sha256": "2886031e4c40c8c932fa9581baab3d88ed9987ec9c8c020a8012156ac728c097",
 "evidence_rows_sha256": "ecd7a189ead0466145858cd6ea1340facb7bd13e36eb9ac70955f280c0dd89fd",
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
 "embedded_datasets_sha256": "ecd7a189ead0466145858cd6ea1340facb7bd13e36eb9ac70955f280c0dd89fd",
 "datasets": {
 "risk_comparison": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "avg_score": 91.2,
 "performance_trend": -0.7187500000000001,
 "punctuality_rate": 0,
 "engagement_score": 0.20237855036820618,
 "previous_attempt_count": 1,
 "flag_low_score": 0,
 "flag_repeated": 1,
 "flag_low_engagement": 0,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1,
 "at_risk_score": 3,
 "at_risk_label": "high",
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "avg_score": null,
 "performance_trend": null,
 "punctuality_rate": 1,
 "engagement_score": 0,
 "previous_attempt_count": 0,
 "flag_low_score": 0,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 0,
 "flag_neg_trend": 0,
 "at_risk_score": 1,
 "at_risk_label": "low",
 "final_outcome": "Withdrawn"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-C03__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "3ed4a173209aadfa3c9b9faa2525d0cb2621bed2f9afb2a5472faf54c1cb0382",
 "generator_input_sha256": "46bb929e4b1647d00ece6c895a7942e2063a3e3c6feae4adcea4d7f08c5088f9",
 "generator_input_compact": {
 "task_id": "A-C03",
 "execution_id": "exec_1781847654667_8969677c",
 "task_name": "Compare risk profile",
 "analysis_type": "comparison",
 "explanation_strategy": "comparison",
 "actionable_question": "Who is at higher risk and what are the key differences?",
 "target_audience": [
 "instructor",
 "academic_advisor"
 ],
 "query_labels": [
 "risk_comparison"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "risk_comparison"
 ],
 "dataset_row_counts": {
 "risk_comparison": 2
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
 "raw_text": "Summary: Exact risk profiles: student_id=SAMPLE_OULAD_STU_100788, avg_score=91.2, performance_trend=-0.7187500000000001, punctuality_rate=0, engagement_score=0.20237855036820618, previous_attempt_count=1, flag_low_score=0, flag_repeated=1, flag_low_engagement=0, flag_low_punctuality=1, flag_neg_trend=1, at_risk_score=3, at_risk_label=high, final_outcome=Distinction; student_id=SAMPLE_OULAD_STU_101700, avg_score=null, performance_trend=null, punctuality_rate=1, engagement_score=0, previous_attempt_count=0, flag_low_score=0, flag_repeated=0, flag_low_engagement=1, flag_low_punctuality=0, flag_neg_trend=0, at_risk_score=1, at_risk_label=low, final_outcome=Withdrawn. avg_score=null means score evidence is missing for that student. Risk explanations use only flags equal to 1; a flag equal to 0 is not a risk driver.\n\nEducational implications: Compare the explicit risk scores and triggered flags without inferring causes from untriggered engagement evidence.",
 "structured_payload": {
 "task_id": "A-C03",
 "execution_id": "exec_1781847654667_8969677c",
 "explanation": {
 "summary": "Exact risk profiles: student_id=SAMPLE_OULAD_STU_100788, avg_score=91.2, performance_trend=-0.7187500000000001, punctuality_rate=0, engagement_score=0.20237855036820618, previous_attempt_count=1, flag_low_score=0, flag_repeated=1, flag_low_engagement=0, flag_low_punctuality=1, flag_neg_trend=1, at_risk_score=3, at_risk_label=high, final_outcome=Distinction; student_id=SAMPLE_OULAD_STU_101700, avg_score=null, performance_trend=null, punctuality_rate=1, engagement_score=0, previous_attempt_count=0, flag_low_score=0, flag_repeated=0, flag_low_engagement=1, flag_low_punctuality=0, flag_neg_trend=0, at_risk_score=1, at_risk_label=low, final_outcome=Withdrawn. avg_score=null means score evidence is missing for that student. Risk explanations use only flags equal to 1; a flag equal to 0 is not a risk driver.",
 "insights": [],
 "educational_implications": [
 "Compare the explicit risk scores and triggered flags without inferring causes from untriggered engagement evidence."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is sufficient, with clear metrics and flags available for analysis.",
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
 "dataset_name": "risk_comparison",
 "row_count": 2,
 "included_row_count": 2
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 2,
 "baseline_reference_tokens": 226,
 "task_aware_prompt_tokens": 2444,
 "token_ratio": 10.8142,
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
 "For both students, preserve avg_score including null, at_risk_score, at_risk_label, final_outcome, and every explicit flag_* value.",
 "Explain risk only from triggered flags. Do not call engagement a driver when flag_low_engagement=0 and do not invent missing score evidence."
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
 "risk_profile_evidence",
 "row_count",
 "selected_entity_evidence",
 "summarization_warnings",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (10.8142 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C03",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "For both students, preserve avg_score including null, at_risk_score, at_risk_label, final_outcome, and every explicit flag_* value.",
 "Explain risk only from triggered flags. Do not call engagement a driver when flag_low_engagement=0 and do not invent missing score evidence."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "risk_comparison",
 "row_count": 2,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "entity_column": "student_id",
 "metrics": [
 {
 "metric": "avg_score",
 "unit": "score_0_100",
 "direction": "higher_is_better",
 "threshold": {
 "low_score_below": 40
 }
 },
 {
 "metric": "performance_trend",
 "unit": "score_change_per_assessment",
 "direction": "higher_is_better",
 "threshold": {
 "negative_trend_below": 0
 }
 },
 {
 "metric": "punctuality_rate",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "low_punctuality_below": 0.7
 }
 },
 {
 "metric": "engagement_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "low_engagement_below": 0.15
 }
 },
 {
 "metric": "previous_attempt_count",
 "unit": "count",
 "direction": "higher_is_risk",
 "threshold": {
 "repeated_attempt_above": 0
 }
 },
 {
 "metric": "at_risk_score",
 "unit": "flag_count_0_5",
 "direction": "higher_is_risk",
 "threshold": {
 "medium_at": 2,
 "high_at_or_above": 3
 }
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
 "avg_score": 91.2,
 "performance_trend": -0.7188,
 "punctuality_rate": 0,
 "engagement_score": 0.2024,
 "previous_attempt_count": 1,
 "at_risk_score": 3
 },
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Distinction"
 },
 "flags": {
 "flag_low_score": false,
 "flag_repeated": true,
 "flag_low_engagement": false,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 0,
 "flag_repeated": 1,
 "flag_low_engagement": 0,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {
 "avg_score": null,
 "performance_trend": null,
 "punctuality_rate": 1,
 "engagement_score": 0,
 "previous_attempt_count": 0,
 "at_risk_score": 1
 },
 "labels": {
 "at_risk_label": "low",
 "final_outcome": "Withdrawn"
 },
 "flags": {
 "flag_low_score": false,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": false,
 "flag_neg_trend": false
 },
 "flag_raw_values": {
 "flag_low_score": 0,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 0,
 "flag_neg_trend": 0
 }
 }
 ],
 "selected_entity_evidence": [],
 "risk_profile_evidence": {
 "students": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "avg_score": 91.2,
 "performance_trend": -0.7187500000000001,
 "punctuality_rate": 0,
 "engagement_score": 0.20237855036820618,
 "previous_attempt_count": 1,
 "flag_low_score": 0,
 "flag_repeated": 1,
 "flag_low_engagement": 0,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1,
 "at_risk_score": 3,
 "at_risk_label": "high",
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "avg_score": null,
 "performance_trend": null,
 "punctuality_rate": 1,
 "engagement_score": 0,
 "previous_attempt_count": 0,
 "flag_low_score": 0,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 0,
 "flag_neg_trend": 0,
 "at_risk_score": 1,
 "at_risk_label": "low",
 "final_outcome": "Withdrawn"
 }
 ],
 "required_flag_fields": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "policy": "explain risk only from explicit triggered flags; preserve null score evidence"
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [
 {
 "metric": "punctuality_rate",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": 1,
 "absolute_gap": 1
 },
 {
 "metric": "engagement_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.2024,
 "absolute_gap": 0.2024
 },
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -1,
 "absolute_gap": 1
 },
 {
 "metric": "at_risk_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -2,
 "absolute_gap": 2
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "punctuality_rate",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_101700",
 "lower_entity": "SAMPLE_OULAD_STU_100788",
 "difference": 1,
 "direction_note": "right_entity is higher"
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
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 1,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "at_risk_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 2,
 "direction_note": "left_entity is higher"
 }
 ],
 "metric_extrema": {
 "avg_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 91.2
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 91.2
 }
 },
 "performance_trend": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": -0.7188
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": -0.7188
 }
 },
 "punctuality_rate": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 1
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
 "at_risk_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 3
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
 "entity": "SAMPLE_OULAD_STU_101700",
 "metric": "avg_score",
 "reason": "avg_score is missing or non-numeric"
 },
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "metric": "performance_trend",
 "reason": "performance_trend is missing or non-numeric"
 }
 ],
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
 "avg_score": "score_0_100",
 "performance_trend": "score_change_per_assessment",
 "punctuality_rate": "ratio_0_1",
 "engagement_score": "ratio_0_1",
 "previous_attempt_count": "count",
 "at_risk_score": "flag_count_0_5"
 },
 "metric_directions": {
 "avg_score": "higher_is_better",
 "performance_trend": "higher_is_better",
 "punctuality_rate": "higher_is_better",
 "engagement_score": "higher_is_better",
 "previous_attempt_count": "higher_is_risk",
 "at_risk_score": "higher_is_risk"
 },
 "metric_thresholds": {
 "avg_score": {
 "low_score_below": 40
 },
 "performance_trend": {
 "negative_trend_below": 0
 },
 "punctuality_rate": {
 "low_punctuality_below": 0.7
 },
 "engagement_score": {
 "low_engagement_below": 0.15
 },
 "previous_attempt_count": {
 "repeated_attempt_above": 0
 },
 "at_risk_score": {
 "medium_at": 2,
 "high_at_or_above": 3
 }
 },
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Found 2 missing or non-numeric metric values; they remain explicit missing evidence and were not replaced with zero."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "multi_metric_comparison",
 "dataset_name": "risk_comparison",
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
 "metric": "avg_score",
 "unit": "score_0_100",
 "direction": "higher_is_better",
 "threshold": {
 "low_score_below": 40
 }
 },
 {
 "metric": "performance_trend",
 "unit": "score_change_per_assessment",
 "direction": "higher_is_better",
 "threshold": {
 "negative_trend_below": 0
 }
 },
 {
 "metric": "punctuality_rate",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "low_punctuality_below": 0.7
 }
 },
 {
 "metric": "engagement_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "low_engagement_below": 0.15
 }
 },
 {
 "metric": "previous_attempt_count",
 "unit": "count",
 "direction": "higher_is_risk",
 "threshold": {
 "repeated_attempt_above": 0
 }
 },
 {
 "metric": "at_risk_score",
 "unit": "flag_count_0_5",
 "direction": "higher_is_risk",
 "threshold": {
 "medium_at": 2,
 "high_at_or_above": 3
 }
 }
 ],
 "metric_keys": [],
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "avg_score": 91.2,
 "performance_trend": -0.7188,
 "punctuality_rate": 0,
 "engagement_score": 0.2024,
 "previous_attempt_count": 1,
 "at_risk_score": 3
 },
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Distinction"
 },
 "flags": {
 "flag_low_score": false,
 "flag_repeated": true,
 "flag_low_engagement": false,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 0,
 "flag_repeated": 1,
 "flag_low_engagement": 0,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {
 "avg_score": null,
 "performance_trend": null,
 "punctuality_rate": 1,
 "engagement_score": 0,
 "previous_attempt_count": 0,
 "at_risk_score": 1
 },
 "labels": {
 "at_risk_label": "low",
 "final_outcome": "Withdrawn"
 },
 "flags": {
 "flag_low_score": false,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": false,
 "flag_neg_trend": false
 },
 "flag_raw_values": {
 "flag_low_score": 0,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 0,
 "flag_neg_trend": 0
 }
 }
 ],
 "metric_extrema": {
 "avg_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 91.2
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 91.2
 }
 },
 "performance_trend": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": -0.7188
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": -0.7188
 }
 },
 "punctuality_rate": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 1
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
 "at_risk_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 3
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "punctuality_rate",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": 1,
 "absolute_gap": 1
 },
 {
 "metric": "engagement_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.2024,
 "absolute_gap": 0.2024
 },
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -1,
 "absolute_gap": 1
 },
 {
 "metric": "at_risk_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -2,
 "absolute_gap": 2
 }
 ],
 "missing_metric_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "metric": "avg_score",
 "reason": "avg_score is missing or non-numeric"
 },
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "metric": "performance_trend",
 "reason": "performance_trend is missing or non-numeric"
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
 "metric_thresholds": true,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "avg_score": "score_0_100",
 "performance_trend": "score_change_per_assessment",
 "punctuality_rate": "ratio_0_1",
 "engagement_score": "ratio_0_1",
 "previous_attempt_count": "count",
 "at_risk_score": "flag_count_0_5"
 },
 "metric_directions": {
 "avg_score": "higher_is_better",
 "performance_trend": "higher_is_better",
 "punctuality_rate": "higher_is_better",
 "engagement_score": "higher_is_better",
 "previous_attempt_count": "higher_is_risk",
 "at_risk_score": "higher_is_risk"
 },
 "metric_thresholds": {
 "avg_score": {
 "low_score_below": 40
 },
 "performance_trend": {
 "negative_trend_below": 0
 },
 "punctuality_rate": {
 "low_punctuality_below": 0.7
 },
 "engagement_score": {
 "low_engagement_below": 0.15
 },
 "previous_attempt_count": {
 "repeated_attempt_above": 0
 },
 "at_risk_score": {
 "medium_at": 2,
 "high_at_or_above": 3
 }
 },
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Found 2 missing or non-numeric metric values; they remain explicit missing evidence and were not replaced with zero."
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "punctuality_rate",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_101700",
 "lower_entity": "SAMPLE_OULAD_STU_100788",
 "difference": 1,
 "direction_note": "right_entity is higher"
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
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 1,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "at_risk_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 2,
 "direction_note": "left_entity is higher"
 }
 ],
 "risk_profile_evidence": {
 "students": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "avg_score": 91.2,
 "performance_trend": -0.7187500000000001,
 "punctuality_rate": 0,
 "engagement_score": 0.20237855036820618,
 "previous_attempt_count": 1,
 "flag_low_score": 0,
 "flag_repeated": 1,
 "flag_low_engagement": 0,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1,
 "at_risk_score": 3,
 "at_risk_label": "high",
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "avg_score": null,
 "performance_trend": null,
 "punctuality_rate": 1,
 "engagement_score": 0,
 "previous_attempt_count": 0,
 "flag_low_score": 0,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 0,
 "flag_neg_trend": 0,
 "at_risk_score": 1,
 "at_risk_label": "low",
 "final_outcome": "Withdrawn"
 }
 ],
 "required_flag_fields": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "policy": "explain risk only from explicit triggered flags; preserve null score evidence"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8187,
 "token_usage": {
 "prompt_tokens": 3318,
 "completion_tokens": 562,
 "total_tokens": 3880
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000835
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-C03__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "3ed4a173209aadfa3c9b9faa2525d0cb2621bed2f9afb2a5472faf54c1cb0382",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 3318,
 "completion_tokens": 562,
 "total_tokens": 3880
 },
 "latency_ms": 8195,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-C03",
 "execution_id": "exec_1781847654667_8969677c",
 "explanation": {
 "summary": "Exact risk profiles: student_id=SAMPLE_OULAD_STU_100788, avg_score=91.2, performance_trend=-0.7187500000000001, punctuality_rate=0, engagement_score=0.20237855036820618, previous_attempt_count=1, flag_low_score=0, flag_repeated=1, flag_low_engagement=0, flag_low_punctuality=1, flag_neg_trend=1, at_risk_score=3, at_risk_label=high, final_outcome=Distinction; student_id=SAMPLE_OULAD_STU_101700, avg_score=null, performance_trend=null, punctuality_rate=1, engagement_score=0, previous_attempt_count=0, flag_low_score=0, flag_repeated=0, flag_low_engagement=1, flag_low_punctuality=0, flag_neg_trend=0, at_risk_score=1, at_risk_label=low, final_outcome=Withdrawn. avg_score=null means score evidence is missing for that student. Risk explanations use only flags equal to 1; a flag equal to 0 is not a risk driver.",
 "insights": [],
 "educational_implications": [
 "Compare the explicit risk scores and triggered flags without inferring causes from untriggered engagement evidence."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is sufficient, with clear metrics and flags available for analysis.",
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
 "dataset_name": "risk_comparison",
 "row_count": 2,
 "included_row_count": 2
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 2,
 "baseline_reference_tokens": 226,
 "task_aware_prompt_tokens": 2444,
 "token_ratio": 10.8142,
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
 "For both students, preserve avg_score including null, at_risk_score, at_risk_label, final_outcome, and every explicit flag_* value.",
 "Explain risk only from triggered flags. Do not call engagement a driver when flag_low_engagement=0 and do not invent missing score evidence."
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
 "risk_profile_evidence",
 "row_count",
 "selected_entity_evidence",
 "summarization_warnings",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (10.8142 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C03",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "For both students, preserve avg_score including null, at_risk_score, at_risk_label, final_outcome, and every explicit flag_* value.",
 "Explain risk only from triggered flags. Do not call engagement a driver when flag_low_engagement=0 and do not invent missing score evidence."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "risk_comparison",
 "row_count": 2,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "entity_column": "student_id",
 "metrics": [
 {
 "metric": "avg_score",
 "unit": "score_0_100",
 "direction": "higher_is_better",
 "threshold": {
 "low_score_below": 40
 }
 },
 {
 "metric": "performance_trend",
 "unit": "score_change_per_assessment",
 "direction": "higher_is_better",
 "threshold": {
 "negative_trend_below": 0
 }
 },
 {
 "metric": "punctuality_rate",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "low_punctuality_below": 0.7
 }
 },
 {
 "metric": "engagement_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "low_engagement_below": 0.15
 }
 },
 {
 "metric": "previous_attempt_count",
 "unit": "count",
 "direction": "higher_is_risk",
 "threshold": {
 "repeated_attempt_above": 0
 }
 },
 {
 "metric": "at_risk_score",
 "unit": "flag_count_0_5",
 "direction": "higher_is_risk",
 "threshold": {
 "medium_at": 2,
 "high_at_or_above": 3
 }
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
 "avg_score": 91.2,
 "performance_trend": -0.7188,
 "punctuality_rate": 0,
 "engagement_score": 0.2024,
 "previous_attempt_count": 1,
 "at_risk_score": 3
 },
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Distinction"
 },
 "flags": {
 "flag_low_score": false,
 "flag_repeated": true,
 "flag_low_engagement": false,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 0,
 "flag_repeated": 1,
 "flag_low_engagement": 0,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {
 "avg_score": null,
 "performance_trend": null,
 "punctuality_rate": 1,
 "engagement_score": 0,
 "previous_attempt_count": 0,
 "at_risk_score": 1
 },
 "labels": {
 "at_risk_label": "low",
 "final_outcome": "Withdrawn"
 },
 "flags": {
 "flag_low_score": false,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": false,
 "flag_neg_trend": false
 },
 "flag_raw_values": {
 "flag_low_score": 0,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 0,
 "flag_neg_trend": 0
 }
 }
 ],
 "selected_entity_evidence": [],
 "risk_profile_evidence": {
 "students": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "avg_score": 91.2,
 "performance_trend": -0.7187500000000001,
 "punctuality_rate": 0,
 "engagement_score": 0.20237855036820618,
 "previous_attempt_count": 1,
 "flag_low_score": 0,
 "flag_repeated": 1,
 "flag_low_engagement": 0,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1,
 "at_risk_score": 3,
 "at_risk_label": "high",
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "avg_score": null,
 "performance_trend": null,
 "punctuality_rate": 1,
 "engagement_score": 0,
 "previous_attempt_count": 0,
 "flag_low_score": 0,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 0,
 "flag_neg_trend": 0,
 "at_risk_score": 1,
 "at_risk_label": "low",
 "final_outcome": "Withdrawn"
 }
 ],
 "required_flag_fields": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "policy": "explain risk only from explicit triggered flags; preserve null score evidence"
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [
 {
 "metric": "punctuality_rate",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": 1,
 "absolute_gap": 1
 },
 {
 "metric": "engagement_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.2024,
 "absolute_gap": 0.2024
 },
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -1,
 "absolute_gap": 1
 },
 {
 "metric": "at_risk_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -2,
 "absolute_gap": 2
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "punctuality_rate",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_101700",
 "lower_entity": "SAMPLE_OULAD_STU_100788",
 "difference": 1,
 "direction_note": "right_entity is higher"
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
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 1,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "at_risk_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 2,
 "direction_note": "left_entity is higher"
 }
 ],
 "metric_extrema": {
 "avg_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 91.2
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 91.2
 }
 },
 "performance_trend": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": -0.7188
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": -0.7188
 }
 },
 "punctuality_rate": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 1
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
 "at_risk_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 3
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
 "entity": "SAMPLE_OULAD_STU_101700",
 "metric": "avg_score",
 "reason": "avg_score is missing or non-numeric"
 },
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "metric": "performance_trend",
 "reason": "performance_trend is missing or non-numeric"
 }
 ],
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
 "avg_score": "score_0_100",
 "performance_trend": "score_change_per_assessment",
 "punctuality_rate": "ratio_0_1",
 "engagement_score": "ratio_0_1",
 "previous_attempt_count": "count",
 "at_risk_score": "flag_count_0_5"
 },
 "metric_directions": {
 "avg_score": "higher_is_better",
 "performance_trend": "higher_is_better",
 "punctuality_rate": "higher_is_better",
 "engagement_score": "higher_is_better",
 "previous_attempt_count": "higher_is_risk",
 "at_risk_score": "higher_is_risk"
 },
 "metric_thresholds": {
 "avg_score": {
 "low_score_below": 40
 },
 "performance_trend": {
 "negative_trend_below": 0
 },
 "punctuality_rate": {
 "low_punctuality_below": 0.7
 },
 "engagement_score": {
 "low_engagement_below": 0.15
 },
 "previous_attempt_count": {
 "repeated_attempt_above": 0
 },
 "at_risk_score": {
 "medium_at": 2,
 "high_at_or_above": 3
 }
 },
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Found 2 missing or non-numeric metric values; they remain explicit missing evidence and were not replaced with zero."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "multi_metric_comparison",
 "dataset_name": "risk_comparison",
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
 "metric": "avg_score",
 "unit": "score_0_100",
 "direction": "higher_is_better",
 "threshold": {
 "low_score_below": 40
 }
 },
 {
 "metric": "performance_trend",
 "unit": "score_change_per_assessment",
 "direction": "higher_is_better",
 "threshold": {
 "negative_trend_below": 0
 }
 },
 {
 "metric": "punctuality_rate",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "low_punctuality_below": 0.7
 }
 },
 {
 "metric": "engagement_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_better",
 "threshold": {
 "low_engagement_below": 0.15
 }
 },
 {
 "metric": "previous_attempt_count",
 "unit": "count",
 "direction": "higher_is_risk",
 "threshold": {
 "repeated_attempt_above": 0
 }
 },
 {
 "metric": "at_risk_score",
 "unit": "flag_count_0_5",
 "direction": "higher_is_risk",
 "threshold": {
 "medium_at": 2,
 "high_at_or_above": 3
 }
 }
 ],
 "metric_keys": [],
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "avg_score": 91.2,
 "performance_trend": -0.7188,
 "punctuality_rate": 0,
 "engagement_score": 0.2024,
 "previous_attempt_count": 1,
 "at_risk_score": 3
 },
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Distinction"
 },
 "flags": {
 "flag_low_score": false,
 "flag_repeated": true,
 "flag_low_engagement": false,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 0,
 "flag_repeated": 1,
 "flag_low_engagement": 0,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {
 "avg_score": null,
 "performance_trend": null,
 "punctuality_rate": 1,
 "engagement_score": 0,
 "previous_attempt_count": 0,
 "at_risk_score": 1
 },
 "labels": {
 "at_risk_label": "low",
 "final_outcome": "Withdrawn"
 },
 "flags": {
 "flag_low_score": false,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": false,
 "flag_neg_trend": false
 },
 "flag_raw_values": {
 "flag_low_score": 0,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 0,
 "flag_neg_trend": 0
 }
 }
 ],
 "metric_extrema": {
 "avg_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 91.2
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 91.2
 }
 },
 "performance_trend": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": -0.7188
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": -0.7188
 }
 },
 "punctuality_rate": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 1
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
 "at_risk_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 3
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "punctuality_rate",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": 1,
 "absolute_gap": 1
 },
 {
 "metric": "engagement_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -0.2024,
 "absolute_gap": 0.2024
 },
 {
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -1,
 "absolute_gap": 1
 },
 {
 "metric": "at_risk_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "gap_right_minus_left": -2,
 "absolute_gap": 2
 }
 ],
 "missing_metric_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "metric": "avg_score",
 "reason": "avg_score is missing or non-numeric"
 },
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "metric": "performance_trend",
 "reason": "performance_trend is missing or non-numeric"
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
 "metric_thresholds": true,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "avg_score": "score_0_100",
 "performance_trend": "score_change_per_assessment",
 "punctuality_rate": "ratio_0_1",
 "engagement_score": "ratio_0_1",
 "previous_attempt_count": "count",
 "at_risk_score": "flag_count_0_5"
 },
 "metric_directions": {
 "avg_score": "higher_is_better",
 "performance_trend": "higher_is_better",
 "punctuality_rate": "higher_is_better",
 "engagement_score": "higher_is_better",
 "previous_attempt_count": "higher_is_risk",
 "at_risk_score": "higher_is_risk"
 },
 "metric_thresholds": {
 "avg_score": {
 "low_score_below": 40
 },
 "performance_trend": {
 "negative_trend_below": 0
 },
 "punctuality_rate": {
 "low_punctuality_below": 0.7
 },
 "engagement_score": {
 "low_engagement_below": 0.15
 },
 "previous_attempt_count": {
 "repeated_attempt_above": 0
 },
 "at_risk_score": {
 "medium_at": 2,
 "high_at_or_above": 3
 }
 },
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Found 2 missing or non-numeric metric values; they remain explicit missing evidence and were not replaced with zero."
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "punctuality_rate",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_101700",
 "lower_entity": "SAMPLE_OULAD_STU_100788",
 "difference": 1,
 "direction_note": "right_entity is higher"
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
 "metric": "previous_attempt_count",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 1,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "at_risk_score",
 "left_entity": "SAMPLE_OULAD_STU_100788",
 "right_entity": "SAMPLE_OULAD_STU_101700",
 "higher_entity": "SAMPLE_OULAD_STU_100788",
 "lower_entity": "SAMPLE_OULAD_STU_101700",
 "difference": 2,
 "direction_note": "left_entity is higher"
 }
 ],
 "risk_profile_evidence": {
 "students": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "avg_score": 91.2,
 "performance_trend": -0.7187500000000001,
 "punctuality_rate": 0,
 "engagement_score": 0.20237855036820618,
 "previous_attempt_count": 1,
 "flag_low_score": 0,
 "flag_repeated": 1,
 "flag_low_engagement": 0,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1,
 "at_risk_score": 3,
 "at_risk_label": "high",
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "avg_score": null,
 "performance_trend": null,
 "punctuality_rate": 1,
 "engagement_score": 0,
 "previous_attempt_count": 0,
 "flag_low_score": 0,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 0,
 "flag_neg_trend": 0,
 "at_risk_score": 1,
 "at_risk_label": "low",
 "final_outcome": "Withdrawn"
 }
 ],
 "required_flag_fields": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "policy": "explain risk only from explicit triggered flags; preserve null score evidence"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8187,
 "token_usage": {
 "prompt_tokens": 3318,
 "completion_tokens": 562,
 "total_tokens": 3880
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000835
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
 "observed": "2886031e4c40c8c932fa9581baab3d88ed9987ec9c8c020a8012156ac728c097",
 "expected_values": [
 "2886031e4c40c8c932fa9581baab3d88ed9987ec9c8c020a8012156ac728c097"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "ecd7a189ead0466145858cd6ea1340facb7bd13e36eb9ac70955f280c0dd89fd",
 "expected": "ecd7a189ead0466145858cd6ea1340facb7bd13e36eb9ac70955f280c0dd89fd"
 },
 {
 "check_id": "numeric_fields_risk_comparison",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "risk_comparison",
 "numeric_columns": [
 "at_risk_score",
 "engagement_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_low_score",
 "flag_neg_trend",
 "flag_repeated",
 "previous_attempt_count",
 "punctuality_rate",
 "avg_score",
 "performance_trend"
 ],
 "numeric_summaries": {
 "at_risk_score": {
 "count": 2,
 "min": 1,
 "max": 3
 },
 "engagement_score": {
 "count": 2,
 "min": 0,
 "max": 0.20237855036820618
 },
 "flag_low_engagement": {
 "count": 2,
 "min": 0,
 "max": 1
 },
 "flag_low_punctuality": {
 "count": 2,
 "min": 0,
 "max": 1
 },
 "flag_low_score": {
 "count": 2,
 "min": 0,
 "max": 0
 },
 "flag_neg_trend": {
 "count": 2,
 "min": 0,
 "max": 1
 },
 "flag_repeated": {
 "count": 2,
 "min": 0,
 "max": 1
 },
 "previous_attempt_count": {
 "count": 2,
 "min": 0,
 "max": 1
 },
 "punctuality_rate": {
 "count": 2,
 "min": 0,
 "max": 1
 },
 "avg_score": {
 "count": 1,
 "min": 91.2,
 "max": 91.2
 },
 "performance_trend": {
 "count": 1,
 "min": -0.7187500000000001,
 "max": -0.7187500000000001
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_risk_comparison",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "risk_comparison",
 "flag_columns": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend",
 "at_risk_score",
 "at_risk_label"
 ],
 "triggered_like_counts": {
 "flag_low_score": 0,
 "flag_repeated": 0,
 "flag_low_engagement": 0,
 "flag_low_punctuality": 0,
 "flag_neg_trend": 0,
 "at_risk_score": 0,
 "at_risk_label": 0
 }
 }
]
```
