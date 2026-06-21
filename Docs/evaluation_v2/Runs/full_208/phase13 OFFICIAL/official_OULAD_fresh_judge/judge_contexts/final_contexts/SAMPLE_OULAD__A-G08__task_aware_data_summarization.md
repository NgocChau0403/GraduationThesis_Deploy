# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G08__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-G08__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G08",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Background group performance & engagement profile",
 "scope": "Many students",
 "actionable_question": "Which demographic groups are scoring or engaging below the class average?",
 "target_audience": "instructor, academic_advisor",
 "ai_summary_type": "group_comparison",
 "ai_prompt_hint": "For each demographic group, compare mean avg_score [FE] and engagement_score [FE] to cohort average. Use colour intensity to show deviation. Avoid causal claims. Note: output is continuous score — distinct from A-G12 which uses categorical final_outcome.",
 "query_labels": [
 "demographic_performance"
 ],
 "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
 "source_tables": [
 "student",
 "enrollment",
 "assessment_result",
 "assessment",
 "engagement"
 ],
 "key_db_fields": [
 "socioeconomic_band / gender / age_group / highest_education; avg_score [FE cross]",
 "engagement_score [FE cross]"
 ],
 "output_schema": {},
 "query_labels": [
 "demographic_performance"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-G08-CORE-01",
 "description": "For each demographic group, compare mean average score and engagement score with the cohort average."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-G08-CONSTRAINT-01",
 "description": "Quantify the magnitude of group deviation rather than relying on visual colour encoding alone."
 },
 {
 "constraint_id": "A-G08-CONSTRAINT-02",
 "description": "Avoid causal claims."
 },
 {
 "constraint_id": "A-G08-CONSTRAINT-03",
 "description": "Treat this as an equity-sensitive demographic group analysis."
 }
 ],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Applicable because the task compares demographic groups and requires equity framing."
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
 "dataset_label": "demographic_performance",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G08.json",
 "artifact_sha256": "8f4e41747ea3f615d793457834081d21309a8a5f5847129b33cf83033b87ad18",
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
 "evidence_artifact_file_sha256": "8f4e41747ea3f615d793457834081d21309a8a5f5847129b33cf83033b87ad18",
 "evidence_rows_sha256": "5f0d9bfd03e96ed997d71cc6bb04e9fda69ba2a7710330604934b332f31cd243",
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
 "embedded_datasets_sha256": "5f0d9bfd03e96ed997d71cc6bb04e9fda69ba2a7710330604934b332f31cd243",
 "datasets": {
 "demographic_performance": [
 {
 "group_value": "Unknown",
 "student_count": 131,
 "avg_score": 81.21,
 "avg_engagement_score": 0.1903,
 "score_vs_cohort": 10.77
 },
 {
 "group_value": "90-100%",
 "student_count": 181,
 "avg_score": 74.53,
 "avg_engagement_score": 0.1457,
 "score_vs_cohort": 4.09
 },
 {
 "group_value": "80-90%",
 "student_count": 201,
 "avg_score": 72.35,
 "avg_engagement_score": 0.1668,
 "score_vs_cohort": 1.92
 },
 {
 "group_value": "60-70%",
 "student_count": 193,
 "avg_score": 71.85,
 "avg_engagement_score": 0.1414,
 "score_vs_cohort": 1.42
 },
 {
 "group_value": "70-80%",
 "student_count": 194,
 "avg_score": 71.33,
 "avg_engagement_score": 0.138,
 "score_vs_cohort": 0.89
 },
 {
 "group_value": "50-60%",
 "student_count": 191,
 "avg_score": 70.27,
 "avg_engagement_score": 0.1484,
 "score_vs_cohort": -0.17
 },
 {
 "group_value": "30-40%",
 "student_count": 206,
 "avg_score": 68.5,
 "avg_engagement_score": 0.1392,
 "score_vs_cohort": -1.94
 },
 {
 "group_value": "0-10%",
 "student_count": 152,
 "avg_score": 68.05,
 "avg_engagement_score": 0.1463,
 "score_vs_cohort": -2.39
 },
 {
 "group_value": "40-50%",
 "student_count": 185,
 "avg_score": 67.76,
 "avg_engagement_score": 0.1312,
 "score_vs_cohort": -2.67
 },
 {
 "group_value": "20-30%",
 "student_count": 196,
 "avg_score": 65.99,
 "avg_engagement_score": 0.1318,
 "score_vs_cohort": -4.45
 },
 {
 "group_value": "10-20",
 "student_count": 168,
 "avg_score": 62.96,
 "avg_engagement_score": 0.1312,
 "score_vs_cohort": -7.48
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G08__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "1cc7204e7c06cf9a34103f277fac52bc2f072714bac0d4d039baaccf6f5614a8",
 "generator_input_sha256": "2ec9498365c729679b9b7bc8f36307109b196847438e88bcb72819111a583b5f",
 "generator_input_compact": {
 "task_id": "A-G08",
 "execution_id": "exec_1781847735724_ef073aa0",
 "task_name": "Background group performance & engagement profile",
 "analysis_type": "segmentation",
 "explanation_strategy": "comparison",
 "actionable_question": "Which demographic groups are scoring or engaging below the class average?",
 "target_audience": [
 "instructor",
 "academic_advisor"
 ],
 "query_labels": [
 "demographic_performance"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "demographic_performance"
 ],
 "dataset_row_counts": {
 "demographic_performance": 11
 },
 "ai_summary_config_summary": {
 "summary_type": "group_comparison",
 "metric_column": "avg_score",
 "entity_column": null,
 "group_column": "group_value",
 "time_column": null,
 "sort_by": "score_vs_cohort",
 "sort_direction": "asc",
 "top_k": 10,
 "bottom_k": 5,
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
 "raw_text": "Summary: Descriptive equity comparison; weighted cohort engagement mean=0.1453. group=Unknown, student_count=131, avg_score=81.21, score_vs_cohort=10.77, avg_engagement_score=0.1903, engagement_vs_cohort=0.045 | group=90-100%, student_count=181, avg_score=74.53, score_vs_cohort=4.09, avg_engagement_score=0.1457, engagement_vs_cohort=0.0004 | group=80-90%, student_count=201, avg_score=72.35, score_vs_cohort=1.92, avg_engagement_score=0.1668, engagement_vs_cohort=0.0215 | group=60-70%, student_count=193, avg_score=71.85, score_vs_cohort=1.42, avg_engagement_score=0.1414, engagement_vs_cohort=-0.0039 | group=70-80%, student_count=194, avg_score=71.33, score_vs_cohort=0.89, avg_engagement_score=0.138, engagement_vs_cohort=-0.0073 | group=50-60%, student_count=191, avg_score=70.27, score_vs_cohort=-0.17, avg_engagement_score=0.1484, engagement_vs_cohort=0.0031 | group=30-40%, student_count=206, avg_score=68.5, score_vs_cohort=-1.94, avg_engagement_score=0.1392, engagement_vs_cohort=-0.0061 | group=0-10%, student_count=152, avg_score=68.05, score_vs_cohort=-2.39, avg_engagement_score=0.1463, engagement_vs_cohort=0.001 | group=40-50%, student_count=185, avg_score=67.76, score_vs_cohort=-2.67, avg_engagement_score=0.1312, engagement_vs_cohort=-0.0141 | group=20-30%, student_count=196, avg_score=65.99, score_vs_cohort=-4.45, avg_engagement_score=0.1318, engagement_vs_cohort=-0.0135 | group=10-20, student_count=168, avg_score=62.96, score_vs_cohort=-7.48, avg_engagement_score=0.1312, engagement_vs_cohort=-0.0141.\n\nInsights: Top Performing Group: The 'Unknown' group has the highest average score and engagement score, indicating a strong performance relative to the cohort. | Lowest Performing Group: The '10-20' group has the lowest average score and engagement score, indicating a significant gap compared to the cohort average.\n\nEducational implications: These are descriptive group deviations only; group membership does not establish a cause of score or engagement differences.",
 "structured_payload": {
 "task_id": "A-G08",
 "execution_id": "exec_1781847735724_ef073aa0",
 "explanation": {
 "summary": "Descriptive equity comparison; weighted cohort engagement mean=0.1453. group=Unknown, student_count=131, avg_score=81.21, score_vs_cohort=10.77, avg_engagement_score=0.1903, engagement_vs_cohort=0.045 | group=90-100%, student_count=181, avg_score=74.53, score_vs_cohort=4.09, avg_engagement_score=0.1457, engagement_vs_cohort=0.0004 | group=80-90%, student_count=201, avg_score=72.35, score_vs_cohort=1.92, avg_engagement_score=0.1668, engagement_vs_cohort=0.0215 | group=60-70%, student_count=193, avg_score=71.85, score_vs_cohort=1.42, avg_engagement_score=0.1414, engagement_vs_cohort=-0.0039 | group=70-80%, student_count=194, avg_score=71.33, score_vs_cohort=0.89, avg_engagement_score=0.138, engagement_vs_cohort=-0.0073 | group=50-60%, student_count=191, avg_score=70.27, score_vs_cohort=-0.17, avg_engagement_score=0.1484, engagement_vs_cohort=0.0031 | group=30-40%, student_count=206, avg_score=68.5, score_vs_cohort=-1.94, avg_engagement_score=0.1392, engagement_vs_cohort=-0.0061 | group=0-10%, student_count=152, avg_score=68.05, score_vs_cohort=-2.39, avg_engagement_score=0.1463, engagement_vs_cohort=0.001 | group=40-50%, student_count=185, avg_score=67.76, score_vs_cohort=-2.67, avg_engagement_score=0.1312, engagement_vs_cohort=-0.0141 | group=20-30%, student_count=196, avg_score=65.99, score_vs_cohort=-4.45, avg_engagement_score=0.1318, engagement_vs_cohort=-0.0135 | group=10-20, student_count=168, avg_score=62.96, score_vs_cohort=-7.48, avg_engagement_score=0.1312, engagement_vs_cohort=-0.0141.",
 "insights": [
 {
 "title": "Top Performing Group",
 "description": "The 'Unknown' group has the highest average score and engagement score, indicating a strong performance relative to the cohort.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 81.21,
 "comparison": "baseline",
 "delta": 10.77,
 "context": "Highest average score among all groups"
 },
 {
 "metric": "avg_engagement_score",
 "value": 0.1903,
 "comparison": "baseline",
 "delta": 0.045,
 "context": "Highest engagement score among all groups"
 }
 ]
 },
 {
 "title": "Lowest Performing Group",
 "description": "The '10-20' group has the lowest average score and engagement score, indicating a significant gap compared to the cohort average.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 62.96,
 "comparison": "baseline",
 "delta": -7.48,
 "context": "Lowest average score among all groups"
 },
 {
 "metric": "avg_engagement_score",
 "value": 0.1312,
 "comparison": "baseline",
 "delta": -0.0141,
 "context": "Lowest engagement score among all groups"
 }
 ]
 }
 ],
 "educational_implications": [
 "These are descriptive group deviations only; group membership does not establish a cause of score or engagement differences."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "Data quality is robust with a comprehensive dataset for analysis.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
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
 "dataset_name": "demographic_performance",
 "row_count": 11,
 "included_row_count": 11
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 11,
 "baseline_reference_tokens": 431,
 "task_aware_prompt_tokens": 2090,
 "token_ratio": 4.8492,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.weakest_group",
 "exceptions.dominant_group",
 "primary_finding.group_series"
 ],
 "task_output_contract": [
 "For every returned demographic group, state avg_score, score_vs_cohort, avg_engagement_score, and engagement deviation from the weighted cohort mean.",
 "This is descriptive equity evidence only; do not prescribe interventions by demographic group or infer causality."
 ],
 "must_keep_keys": [
 "engagement_cohort_comparison",
 "fairness_warnings",
 "gaps",
 "group_metrics"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (4.8492 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "group_comparison",
 "task_id": "A-G08",
 "task_output_contract": [
 "For every returned demographic group, state avg_score, score_vs_cohort, avg_engagement_score, and engagement deviation from the weighted cohort mean.",
 "This is descriptive equity evidence only; do not prescribe interventions by demographic group or infer causality."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "demographic_performance",
 "row_count": 11,
 "group_column": "group_value",
 "group_key_columns": [],
 "series_column": null,
 "metric_column": "avg_score",
 "count_column": "student_count",
 "gap_column": "score_vs_cohort",
 "composite_group_keys": false
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "focus_summary": [],
 "group_metrics": [
 {
 "group": "Unknown",
 "student_count": 131,
 "avg_score": 81.21,
 "gap": 10.77,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 10.77,
 "secondary_metrics": {
 "avg_engagement_score": 0.1903
 }
 },
 {
 "group": "90-100%",
 "student_count": 181,
 "avg_score": 74.53,
 "gap": 4.09,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 4.09,
 "secondary_metrics": {
 "avg_engagement_score": 0.1457
 }
 },
 {
 "group": "80-90%",
 "student_count": 201,
 "avg_score": 72.35,
 "gap": 1.92,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 1.92,
 "secondary_metrics": {
 "avg_engagement_score": 0.1668
 }
 },
 {
 "group": "60-70%",
 "student_count": 193,
 "avg_score": 71.85,
 "gap": 1.42,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 1.42,
 "secondary_metrics": {
 "avg_engagement_score": 0.1414
 }
 },
 {
 "group": "70-80%",
 "student_count": 194,
 "avg_score": 71.33,
 "gap": 0.89,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 0.89,
 "secondary_metrics": {
 "avg_engagement_score": 0.138
 }
 },
 {
 "group": "50-60%",
 "student_count": 191,
 "avg_score": 70.27,
 "gap": -0.17,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -0.17,
 "secondary_metrics": {
 "avg_engagement_score": 0.1484
 }
 },
 {
 "group": "30-40%",
 "student_count": 206,
 "avg_score": 68.5,
 "gap": -1.94,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -1.94,
 "secondary_metrics": {
 "avg_engagement_score": 0.1392
 }
 },
 {
 "group": "0-10%",
 "student_count": 152,
 "avg_score": 68.05,
 "gap": -2.39,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -2.39,
 "secondary_metrics": {
 "avg_engagement_score": 0.1463
 }
 },
 {
 "group": "40-50%",
 "student_count": 185,
 "avg_score": 67.76,
 "gap": -2.67,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -2.67,
 "secondary_metrics": {
 "avg_engagement_score": 0.1312
 }
 },
 {
 "group": "20-30%",
 "student_count": 196,
 "avg_score": 65.99,
 "gap": -4.45,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -4.45,
 "secondary_metrics": {
 "avg_engagement_score": 0.1318
 }
 },
 {
 "group": "10-20",
 "student_count": 168,
 "avg_score": 62.96,
 "gap": -7.48,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -7.48,
 "secondary_metrics": {
 "avg_engagement_score": 0.1312
 }
 }
 ],
 "engagement_cohort_comparison": {
 "weighted_cohort_engagement_mean": 0.1453,
 "groups": [
 {
 "group_value": "Unknown",
 "student_count": 131,
 "avg_score": 81.21,
 "score_vs_cohort": 10.77,
 "avg_engagement_score": 0.1903,
 "engagement_vs_cohort": 0.045
 },
 {
 "group_value": "90-100%",
 "student_count": 181,
 "avg_score": 74.53,
 "score_vs_cohort": 4.09,
 "avg_engagement_score": 0.1457,
 "engagement_vs_cohort": 0.0004
 },
 {
 "group_value": "80-90%",
 "student_count": 201,
 "avg_score": 72.35,
 "score_vs_cohort": 1.92,
 "avg_engagement_score": 0.1668,
 "engagement_vs_cohort": 0.0215
 },
 {
 "group_value": "60-70%",
 "student_count": 193,
 "avg_score": 71.85,
 "score_vs_cohort": 1.42,
 "avg_engagement_score": 0.1414,
 "engagement_vs_cohort": -0.0039
 },
 {
 "group_value": "70-80%",
 "student_count": 194,
 "avg_score": 71.33,
 "score_vs_cohort": 0.89,
 "avg_engagement_score": 0.138,
 "engagement_vs_cohort": -0.0073
 },
 {
 "group_value": "50-60%",
 "student_count": 191,
 "avg_score": 70.27,
 "score_vs_cohort": -0.17,
 "avg_engagement_score": 0.1484,
 "engagement_vs_cohort": 0.0031
 },
 {
 "group_value": "30-40%",
 "student_count": 206,
 "avg_score": 68.5,
 "score_vs_cohort": -1.94,
 "avg_engagement_score": 0.1392,
 "engagement_vs_cohort": -0.0061
 },
 {
 "group_value": "0-10%",
 "student_count": 152,
 "avg_score": 68.05,
 "score_vs_cohort": -2.39,
 "avg_engagement_score": 0.1463,
 "engagement_vs_cohort": 0.001
 },
 {
 "group_value": "40-50%",
 "student_count": 185,
 "avg_score": 67.76,
 "score_vs_cohort": -2.67,
 "avg_engagement_score": 0.1312,
 "engagement_vs_cohort": -0.0141
 },
 {
 "group_value": "20-30%",
 "student_count": 196,
 "avg_score": 65.99,
 "score_vs_cohort": -4.45,
 "avg_engagement_score": 0.1318,
 "engagement_vs_cohort": -0.0135
 },
 {
 "group_value": "10-20",
 "student_count": 168,
 "avg_score": 62.96,
 "score_vs_cohort": -7.48,
 "avg_engagement_score": 0.1312,
 "engagement_vs_cohort": -0.0141
 }
 ],
 "policy": "descriptive_equity_comparison_only_no_group_prescription"
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "gaps": [
 {
 "group": "10-20",
 "gap": -7.48,
 "gap_basis": "explicit_gap_column",
 "avg_score": 62.96,
 "student_count": 168
 },
 {
 "group": "20-30%",
 "gap": -4.45,
 "gap_basis": "explicit_gap_column",
 "avg_score": 65.99,
 "student_count": 196
 },
 {
 "group": "40-50%",
 "gap": -2.67,
 "gap_basis": "explicit_gap_column",
 "avg_score": 67.76,
 "student_count": 185
 },
 {
 "group": "0-10%",
 "gap": -2.39,
 "gap_basis": "explicit_gap_column",
 "avg_score": 68.05,
 "student_count": 152
 },
 {
 "group": "30-40%",
 "gap": -1.94,
 "gap_basis": "explicit_gap_column",
 "avg_score": 68.5,
 "student_count": 206
 },
 {
 "group": "50-60%",
 "gap": -0.17,
 "gap_basis": "explicit_gap_column",
 "avg_score": 70.27,
 "student_count": 191
 },
 {
 "group": "70-80%",
 "gap": 0.89,
 "gap_basis": "explicit_gap_column",
 "avg_score": 71.33,
 "student_count": 194
 },
 {
 "group": "60-70%",
 "gap": 1.42,
 "gap_basis": "explicit_gap_column",
 "avg_score": 71.85,
 "student_count": 193
 },
 {
 "group": "80-90%",
 "gap": 1.92,
 "gap_basis": "explicit_gap_column",
 "avg_score": 72.35,
 "student_count": 201
 },
 {
 "group": "90-100%",
 "gap": 4.09,
 "gap_basis": "explicit_gap_column",
 "avg_score": 74.53,
 "student_count": 181
 },
 {
 "group": "Unknown",
 "gap": 10.77,
 "gap_basis": "explicit_gap_column",
 "avg_score": 81.21,
 "student_count": 131
 }
 ]
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
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "group_comparison",
 "dataset_name": "demographic_performance",
 "row_count": 11,
 "group_column": "group_value",
 "group_key_columns": [],
 "series_column": null,
 "composite_group_keys": false,
 "metric_column": "avg_score",
 "count_column": "student_count",
 "gap_column": "score_vs_cohort",
 "group_metrics": [
 {
 "group": "Unknown",
 "student_count": 131,
 "avg_score": 81.21,
 "gap": 10.77,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 10.77,
 "secondary_metrics": {
 "avg_engagement_score": 0.1903
 }
 },
 {
 "group": "90-100%",
 "student_count": 181,
 "avg_score": 74.53,
 "gap": 4.09,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 4.09,
 "secondary_metrics": {
 "avg_engagement_score": 0.1457
 }
 },
 {
 "group": "80-90%",
 "student_count": 201,
 "avg_score": 72.35,
 "gap": 1.92,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 1.92,
 "secondary_metrics": {
 "avg_engagement_score": 0.1668
 }
 },
 {
 "group": "60-70%",
 "student_count": 193,
 "avg_score": 71.85,
 "gap": 1.42,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 1.42,
 "secondary_metrics": {
 "avg_engagement_score": 0.1414
 }
 },
 {
 "group": "70-80%",
 "student_count": 194,
 "avg_score": 71.33,
 "gap": 0.89,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 0.89,
 "secondary_metrics": {
 "avg_engagement_score": 0.138
 }
 },
 {
 "group": "50-60%",
 "student_count": 191,
 "avg_score": 70.27,
 "gap": -0.17,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -0.17,
 "secondary_metrics": {
 "avg_engagement_score": 0.1484
 }
 },
 {
 "group": "30-40%",
 "student_count": 206,
 "avg_score": 68.5,
 "gap": -1.94,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -1.94,
 "secondary_metrics": {
 "avg_engagement_score": 0.1392
 }
 },
 {
 "group": "0-10%",
 "student_count": 152,
 "avg_score": 68.05,
 "gap": -2.39,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -2.39,
 "secondary_metrics": {
 "avg_engagement_score": 0.1463
 }
 },
 {
 "group": "40-50%",
 "student_count": 185,
 "avg_score": 67.76,
 "gap": -2.67,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -2.67,
 "secondary_metrics": {
 "avg_engagement_score": 0.1312
 }
 },
 {
 "group": "20-30%",
 "student_count": 196,
 "avg_score": 65.99,
 "gap": -4.45,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -4.45,
 "secondary_metrics": {
 "avg_engagement_score": 0.1318
 }
 },
 {
 "group": "10-20",
 "student_count": 168,
 "avg_score": 62.96,
 "gap": -7.48,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -7.48,
 "secondary_metrics": {
 "avg_engagement_score": 0.1312
 }
 }
 ],
 "group_series": [],
 "focus_summary": [],
 "gaps": [
 {
 "group": "10-20",
 "gap": -7.48,
 "gap_basis": "explicit_gap_column",
 "avg_score": 62.96,
 "student_count": 168
 },
 {
 "group": "20-30%",
 "gap": -4.45,
 "gap_basis": "explicit_gap_column",
 "avg_score": 65.99,
 "student_count": 196
 },
 {
 "group": "40-50%",
 "gap": -2.67,
 "gap_basis": "explicit_gap_column",
 "avg_score": 67.76,
 "student_count": 185
 },
 {
 "group": "0-10%",
 "gap": -2.39,
 "gap_basis": "explicit_gap_column",
 "avg_score": 68.05,
 "student_count": 152
 },
 {
 "group": "30-40%",
 "gap": -1.94,
 "gap_basis": "explicit_gap_column",
 "avg_score": 68.5,
 "student_count": 206
 },
 {
 "group": "50-60%",
 "gap": -0.17,
 "gap_basis": "explicit_gap_column",
 "avg_score": 70.27,
 "student_count": 191
 },
 {
 "group": "70-80%",
 "gap": 0.89,
 "gap_basis": "explicit_gap_column",
 "avg_score": 71.33,
 "student_count": 194
 },
 {
 "group": "60-70%",
 "gap": 1.42,
 "gap_basis": "explicit_gap_column",
 "avg_score": 71.85,
 "student_count": 193
 },
 {
 "group": "80-90%",
 "gap": 1.92,
 "gap_basis": "explicit_gap_column",
 "avg_score": 72.35,
 "student_count": 201
 },
 {
 "group": "90-100%",
 "gap": 4.09,
 "gap_basis": "explicit_gap_column",
 "avg_score": 74.53,
 "student_count": 181
 },
 {
 "group": "Unknown",
 "gap": 10.77,
 "gap_basis": "explicit_gap_column",
 "avg_score": 81.21,
 "student_count": 131
 }
 ],
 "dominant_group": {
 "group": "30-40%",
 "student_count": 206,
 "basis": "largest_count"
 },
 "weakest_group": {
 "group": "10-20",
 "avg_score": 62.96,
 "basis": "most_negative_gap",
 "gap": -7.48,
 "gap_basis": "explicit_gap_column"
 },
 "missing_groups": [],
 "low_count_warnings": [],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "engagement_cohort_comparison": {
 "weighted_cohort_engagement_mean": 0.1453,
 "groups": [
 {
 "group_value": "Unknown",
 "student_count": 131,
 "avg_score": 81.21,
 "score_vs_cohort": 10.77,
 "avg_engagement_score": 0.1903,
 "engagement_vs_cohort": 0.045
 },
 {
 "group_value": "90-100%",
 "student_count": 181,
 "avg_score": 74.53,
 "score_vs_cohort": 4.09,
 "avg_engagement_score": 0.1457,
 "engagement_vs_cohort": 0.0004
 },
 {
 "group_value": "80-90%",
 "student_count": 201,
 "avg_score": 72.35,
 "score_vs_cohort": 1.92,
 "avg_engagement_score": 0.1668,
 "engagement_vs_cohort": 0.0215
 },
 {
 "group_value": "60-70%",
 "student_count": 193,
 "avg_score": 71.85,
 "score_vs_cohort": 1.42,
 "avg_engagement_score": 0.1414,
 "engagement_vs_cohort": -0.0039
 },
 {
 "group_value": "70-80%",
 "student_count": 194,
 "avg_score": 71.33,
 "score_vs_cohort": 0.89,
 "avg_engagement_score": 0.138,
 "engagement_vs_cohort": -0.0073
 },
 {
 "group_value": "50-60%",
 "student_count": 191,
 "avg_score": 70.27,
 "score_vs_cohort": -0.17,
 "avg_engagement_score": 0.1484,
 "engagement_vs_cohort": 0.0031
 },
 {
 "group_value": "30-40%",
 "student_count": 206,
 "avg_score": 68.5,
 "score_vs_cohort": -1.94,
 "avg_engagement_score": 0.1392,
 "engagement_vs_cohort": -0.0061
 },
 {
 "group_value": "0-10%",
 "student_count": 152,
 "avg_score": 68.05,
 "score_vs_cohort": -2.39,
 "avg_engagement_score": 0.1463,
 "engagement_vs_cohort": 0.001
 },
 {
 "group_value": "40-50%",
 "student_count": 185,
 "avg_score": 67.76,
 "score_vs_cohort": -2.67,
 "avg_engagement_score": 0.1312,
 "engagement_vs_cohort": -0.0141
 },
 {
 "group_value": "20-30%",
 "student_count": 196,
 "avg_score": 65.99,
 "score_vs_cohort": -4.45,
 "avg_engagement_score": 0.1318,
 "engagement_vs_cohort": -0.0135
 },
 {
 "group_value": "10-20",
 "student_count": 168,
 "avg_score": 62.96,
 "score_vs_cohort": -7.48,
 "avg_engagement_score": 0.1312,
 "engagement_vs_cohort": -0.0141
 }
 ],
 "policy": "descriptive_equity_comparison_only_no_group_prescription"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8755,
 "token_usage": {
 "prompt_tokens": 3171,
 "completion_tokens": 504,
 "total_tokens": 3675
 },
 "strategy": "comparison",
 "granularity": "cohort_aggregate",
 "cost_usd": 0.000778
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G08__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "1cc7204e7c06cf9a34103f277fac52bc2f072714bac0d4d039baaccf6f5614a8",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 3171,
 "completion_tokens": 504,
 "total_tokens": 3675
 },
 "latency_ms": 8770,
 "attempts_used": 3
 },
 "source_response_body": {
 "task_id": "A-G08",
 "execution_id": "exec_1781847735724_ef073aa0",
 "explanation": {
 "summary": "Descriptive equity comparison; weighted cohort engagement mean=0.1453. group=Unknown, student_count=131, avg_score=81.21, score_vs_cohort=10.77, avg_engagement_score=0.1903, engagement_vs_cohort=0.045 | group=90-100%, student_count=181, avg_score=74.53, score_vs_cohort=4.09, avg_engagement_score=0.1457, engagement_vs_cohort=0.0004 | group=80-90%, student_count=201, avg_score=72.35, score_vs_cohort=1.92, avg_engagement_score=0.1668, engagement_vs_cohort=0.0215 | group=60-70%, student_count=193, avg_score=71.85, score_vs_cohort=1.42, avg_engagement_score=0.1414, engagement_vs_cohort=-0.0039 | group=70-80%, student_count=194, avg_score=71.33, score_vs_cohort=0.89, avg_engagement_score=0.138, engagement_vs_cohort=-0.0073 | group=50-60%, student_count=191, avg_score=70.27, score_vs_cohort=-0.17, avg_engagement_score=0.1484, engagement_vs_cohort=0.0031 | group=30-40%, student_count=206, avg_score=68.5, score_vs_cohort=-1.94, avg_engagement_score=0.1392, engagement_vs_cohort=-0.0061 | group=0-10%, student_count=152, avg_score=68.05, score_vs_cohort=-2.39, avg_engagement_score=0.1463, engagement_vs_cohort=0.001 | group=40-50%, student_count=185, avg_score=67.76, score_vs_cohort=-2.67, avg_engagement_score=0.1312, engagement_vs_cohort=-0.0141 | group=20-30%, student_count=196, avg_score=65.99, score_vs_cohort=-4.45, avg_engagement_score=0.1318, engagement_vs_cohort=-0.0135 | group=10-20, student_count=168, avg_score=62.96, score_vs_cohort=-7.48, avg_engagement_score=0.1312, engagement_vs_cohort=-0.0141.",
 "insights": [
 {
 "title": "Top Performing Group",
 "description": "The 'Unknown' group has the highest average score and engagement score, indicating a strong performance relative to the cohort.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 81.21,
 "comparison": "baseline",
 "delta": 10.77,
 "context": "Highest average score among all groups"
 },
 {
 "metric": "avg_engagement_score",
 "value": 0.1903,
 "comparison": "baseline",
 "delta": 0.045,
 "context": "Highest engagement score among all groups"
 }
 ]
 },
 {
 "title": "Lowest Performing Group",
 "description": "The '10-20' group has the lowest average score and engagement score, indicating a significant gap compared to the cohort average.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 62.96,
 "comparison": "baseline",
 "delta": -7.48,
 "context": "Lowest average score among all groups"
 },
 {
 "metric": "avg_engagement_score",
 "value": 0.1312,
 "comparison": "baseline",
 "delta": -0.0141,
 "context": "Lowest engagement score among all groups"
 }
 ]
 }
 ],
 "educational_implications": [
 "These are descriptive group deviations only; group membership does not establish a cause of score or engagement differences."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "Data quality is robust with a comprehensive dataset for analysis.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
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
 "dataset_name": "demographic_performance",
 "row_count": 11,
 "included_row_count": 11
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 11,
 "baseline_reference_tokens": 431,
 "task_aware_prompt_tokens": 2090,
 "token_ratio": 4.8492,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.weakest_group",
 "exceptions.dominant_group",
 "primary_finding.group_series"
 ],
 "task_output_contract": [
 "For every returned demographic group, state avg_score, score_vs_cohort, avg_engagement_score, and engagement deviation from the weighted cohort mean.",
 "This is descriptive equity evidence only; do not prescribe interventions by demographic group or infer causality."
 ],
 "must_keep_keys": [
 "engagement_cohort_comparison",
 "fairness_warnings",
 "gaps",
 "group_metrics"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (4.8492 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "group_comparison",
 "task_id": "A-G08",
 "task_output_contract": [
 "For every returned demographic group, state avg_score, score_vs_cohort, avg_engagement_score, and engagement deviation from the weighted cohort mean.",
 "This is descriptive equity evidence only; do not prescribe interventions by demographic group or infer causality."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "demographic_performance",
 "row_count": 11,
 "group_column": "group_value",
 "group_key_columns": [],
 "series_column": null,
 "metric_column": "avg_score",
 "count_column": "student_count",
 "gap_column": "score_vs_cohort",
 "composite_group_keys": false
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "focus_summary": [],
 "group_metrics": [
 {
 "group": "Unknown",
 "student_count": 131,
 "avg_score": 81.21,
 "gap": 10.77,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 10.77,
 "secondary_metrics": {
 "avg_engagement_score": 0.1903
 }
 },
 {
 "group": "90-100%",
 "student_count": 181,
 "avg_score": 74.53,
 "gap": 4.09,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 4.09,
 "secondary_metrics": {
 "avg_engagement_score": 0.1457
 }
 },
 {
 "group": "80-90%",
 "student_count": 201,
 "avg_score": 72.35,
 "gap": 1.92,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 1.92,
 "secondary_metrics": {
 "avg_engagement_score": 0.1668
 }
 },
 {
 "group": "60-70%",
 "student_count": 193,
 "avg_score": 71.85,
 "gap": 1.42,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 1.42,
 "secondary_metrics": {
 "avg_engagement_score": 0.1414
 }
 },
 {
 "group": "70-80%",
 "student_count": 194,
 "avg_score": 71.33,
 "gap": 0.89,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 0.89,
 "secondary_metrics": {
 "avg_engagement_score": 0.138
 }
 },
 {
 "group": "50-60%",
 "student_count": 191,
 "avg_score": 70.27,
 "gap": -0.17,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -0.17,
 "secondary_metrics": {
 "avg_engagement_score": 0.1484
 }
 },
 {
 "group": "30-40%",
 "student_count": 206,
 "avg_score": 68.5,
 "gap": -1.94,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -1.94,
 "secondary_metrics": {
 "avg_engagement_score": 0.1392
 }
 },
 {
 "group": "0-10%",
 "student_count": 152,
 "avg_score": 68.05,
 "gap": -2.39,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -2.39,
 "secondary_metrics": {
 "avg_engagement_score": 0.1463
 }
 },
 {
 "group": "40-50%",
 "student_count": 185,
 "avg_score": 67.76,
 "gap": -2.67,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -2.67,
 "secondary_metrics": {
 "avg_engagement_score": 0.1312
 }
 },
 {
 "group": "20-30%",
 "student_count": 196,
 "avg_score": 65.99,
 "gap": -4.45,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -4.45,
 "secondary_metrics": {
 "avg_engagement_score": 0.1318
 }
 },
 {
 "group": "10-20",
 "student_count": 168,
 "avg_score": 62.96,
 "gap": -7.48,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -7.48,
 "secondary_metrics": {
 "avg_engagement_score": 0.1312
 }
 }
 ],
 "engagement_cohort_comparison": {
 "weighted_cohort_engagement_mean": 0.1453,
 "groups": [
 {
 "group_value": "Unknown",
 "student_count": 131,
 "avg_score": 81.21,
 "score_vs_cohort": 10.77,
 "avg_engagement_score": 0.1903,
 "engagement_vs_cohort": 0.045
 },
 {
 "group_value": "90-100%",
 "student_count": 181,
 "avg_score": 74.53,
 "score_vs_cohort": 4.09,
 "avg_engagement_score": 0.1457,
 "engagement_vs_cohort": 0.0004
 },
 {
 "group_value": "80-90%",
 "student_count": 201,
 "avg_score": 72.35,
 "score_vs_cohort": 1.92,
 "avg_engagement_score": 0.1668,
 "engagement_vs_cohort": 0.0215
 },
 {
 "group_value": "60-70%",
 "student_count": 193,
 "avg_score": 71.85,
 "score_vs_cohort": 1.42,
 "avg_engagement_score": 0.1414,
 "engagement_vs_cohort": -0.0039
 },
 {
 "group_value": "70-80%",
 "student_count": 194,
 "avg_score": 71.33,
 "score_vs_cohort": 0.89,
 "avg_engagement_score": 0.138,
 "engagement_vs_cohort": -0.0073
 },
 {
 "group_value": "50-60%",
 "student_count": 191,
 "avg_score": 70.27,
 "score_vs_cohort": -0.17,
 "avg_engagement_score": 0.1484,
 "engagement_vs_cohort": 0.0031
 },
 {
 "group_value": "30-40%",
 "student_count": 206,
 "avg_score": 68.5,
 "score_vs_cohort": -1.94,
 "avg_engagement_score": 0.1392,
 "engagement_vs_cohort": -0.0061
 },
 {
 "group_value": "0-10%",
 "student_count": 152,
 "avg_score": 68.05,
 "score_vs_cohort": -2.39,
 "avg_engagement_score": 0.1463,
 "engagement_vs_cohort": 0.001
 },
 {
 "group_value": "40-50%",
 "student_count": 185,
 "avg_score": 67.76,
 "score_vs_cohort": -2.67,
 "avg_engagement_score": 0.1312,
 "engagement_vs_cohort": -0.0141
 },
 {
 "group_value": "20-30%",
 "student_count": 196,
 "avg_score": 65.99,
 "score_vs_cohort": -4.45,
 "avg_engagement_score": 0.1318,
 "engagement_vs_cohort": -0.0135
 },
 {
 "group_value": "10-20",
 "student_count": 168,
 "avg_score": 62.96,
 "score_vs_cohort": -7.48,
 "avg_engagement_score": 0.1312,
 "engagement_vs_cohort": -0.0141
 }
 ],
 "policy": "descriptive_equity_comparison_only_no_group_prescription"
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "gaps": [
 {
 "group": "10-20",
 "gap": -7.48,
 "gap_basis": "explicit_gap_column",
 "avg_score": 62.96,
 "student_count": 168
 },
 {
 "group": "20-30%",
 "gap": -4.45,
 "gap_basis": "explicit_gap_column",
 "avg_score": 65.99,
 "student_count": 196
 },
 {
 "group": "40-50%",
 "gap": -2.67,
 "gap_basis": "explicit_gap_column",
 "avg_score": 67.76,
 "student_count": 185
 },
 {
 "group": "0-10%",
 "gap": -2.39,
 "gap_basis": "explicit_gap_column",
 "avg_score": 68.05,
 "student_count": 152
 },
 {
 "group": "30-40%",
 "gap": -1.94,
 "gap_basis": "explicit_gap_column",
 "avg_score": 68.5,
 "student_count": 206
 },
 {
 "group": "50-60%",
 "gap": -0.17,
 "gap_basis": "explicit_gap_column",
 "avg_score": 70.27,
 "student_count": 191
 },
 {
 "group": "70-80%",
 "gap": 0.89,
 "gap_basis": "explicit_gap_column",
 "avg_score": 71.33,
 "student_count": 194
 },
 {
 "group": "60-70%",
 "gap": 1.42,
 "gap_basis": "explicit_gap_column",
 "avg_score": 71.85,
 "student_count": 193
 },
 {
 "group": "80-90%",
 "gap": 1.92,
 "gap_basis": "explicit_gap_column",
 "avg_score": 72.35,
 "student_count": 201
 },
 {
 "group": "90-100%",
 "gap": 4.09,
 "gap_basis": "explicit_gap_column",
 "avg_score": 74.53,
 "student_count": 181
 },
 {
 "group": "Unknown",
 "gap": 10.77,
 "gap_basis": "explicit_gap_column",
 "avg_score": 81.21,
 "student_count": 131
 }
 ]
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
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "group_comparison",
 "dataset_name": "demographic_performance",
 "row_count": 11,
 "group_column": "group_value",
 "group_key_columns": [],
 "series_column": null,
 "composite_group_keys": false,
 "metric_column": "avg_score",
 "count_column": "student_count",
 "gap_column": "score_vs_cohort",
 "group_metrics": [
 {
 "group": "Unknown",
 "student_count": 131,
 "avg_score": 81.21,
 "gap": 10.77,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 10.77,
 "secondary_metrics": {
 "avg_engagement_score": 0.1903
 }
 },
 {
 "group": "90-100%",
 "student_count": 181,
 "avg_score": 74.53,
 "gap": 4.09,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 4.09,
 "secondary_metrics": {
 "avg_engagement_score": 0.1457
 }
 },
 {
 "group": "80-90%",
 "student_count": 201,
 "avg_score": 72.35,
 "gap": 1.92,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 1.92,
 "secondary_metrics": {
 "avg_engagement_score": 0.1668
 }
 },
 {
 "group": "60-70%",
 "student_count": 193,
 "avg_score": 71.85,
 "gap": 1.42,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 1.42,
 "secondary_metrics": {
 "avg_engagement_score": 0.1414
 }
 },
 {
 "group": "70-80%",
 "student_count": 194,
 "avg_score": 71.33,
 "gap": 0.89,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": 0.89,
 "secondary_metrics": {
 "avg_engagement_score": 0.138
 }
 },
 {
 "group": "50-60%",
 "student_count": 191,
 "avg_score": 70.27,
 "gap": -0.17,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -0.17,
 "secondary_metrics": {
 "avg_engagement_score": 0.1484
 }
 },
 {
 "group": "30-40%",
 "student_count": 206,
 "avg_score": 68.5,
 "gap": -1.94,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -1.94,
 "secondary_metrics": {
 "avg_engagement_score": 0.1392
 }
 },
 {
 "group": "0-10%",
 "student_count": 152,
 "avg_score": 68.05,
 "gap": -2.39,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -2.39,
 "secondary_metrics": {
 "avg_engagement_score": 0.1463
 }
 },
 {
 "group": "40-50%",
 "student_count": 185,
 "avg_score": 67.76,
 "gap": -2.67,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -2.67,
 "secondary_metrics": {
 "avg_engagement_score": 0.1312
 }
 },
 {
 "group": "20-30%",
 "student_count": 196,
 "avg_score": 65.99,
 "gap": -4.45,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -4.45,
 "secondary_metrics": {
 "avg_engagement_score": 0.1318
 }
 },
 {
 "group": "10-20",
 "student_count": 168,
 "avg_score": 62.96,
 "gap": -7.48,
 "gap_basis": "explicit_gap_column",
 "score_vs_cohort": -7.48,
 "secondary_metrics": {
 "avg_engagement_score": 0.1312
 }
 }
 ],
 "group_series": [],
 "focus_summary": [],
 "gaps": [
 {
 "group": "10-20",
 "gap": -7.48,
 "gap_basis": "explicit_gap_column",
 "avg_score": 62.96,
 "student_count": 168
 },
 {
 "group": "20-30%",
 "gap": -4.45,
 "gap_basis": "explicit_gap_column",
 "avg_score": 65.99,
 "student_count": 196
 },
 {
 "group": "40-50%",
 "gap": -2.67,
 "gap_basis": "explicit_gap_column",
 "avg_score": 67.76,
 "student_count": 185
 },
 {
 "group": "0-10%",
 "gap": -2.39,
 "gap_basis": "explicit_gap_column",
 "avg_score": 68.05,
 "student_count": 152
 },
 {
 "group": "30-40%",
 "gap": -1.94,
 "gap_basis": "explicit_gap_column",
 "avg_score": 68.5,
 "student_count": 206
 },
 {
 "group": "50-60%",
 "gap": -0.17,
 "gap_basis": "explicit_gap_column",
 "avg_score": 70.27,
 "student_count": 191
 },
 {
 "group": "70-80%",
 "gap": 0.89,
 "gap_basis": "explicit_gap_column",
 "avg_score": 71.33,
 "student_count": 194
 },
 {
 "group": "60-70%",
 "gap": 1.42,
 "gap_basis": "explicit_gap_column",
 "avg_score": 71.85,
 "student_count": 193
 },
 {
 "group": "80-90%",
 "gap": 1.92,
 "gap_basis": "explicit_gap_column",
 "avg_score": 72.35,
 "student_count": 201
 },
 {
 "group": "90-100%",
 "gap": 4.09,
 "gap_basis": "explicit_gap_column",
 "avg_score": 74.53,
 "student_count": 181
 },
 {
 "group": "Unknown",
 "gap": 10.77,
 "gap_basis": "explicit_gap_column",
 "avg_score": 81.21,
 "student_count": 131
 }
 ],
 "dominant_group": {
 "group": "30-40%",
 "student_count": 206,
 "basis": "largest_count"
 },
 "weakest_group": {
 "group": "10-20",
 "avg_score": 62.96,
 "basis": "most_negative_gap",
 "gap": -7.48,
 "gap_basis": "explicit_gap_column"
 },
 "missing_groups": [],
 "low_count_warnings": [],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "engagement_cohort_comparison": {
 "weighted_cohort_engagement_mean": 0.1453,
 "groups": [
 {
 "group_value": "Unknown",
 "student_count": 131,
 "avg_score": 81.21,
 "score_vs_cohort": 10.77,
 "avg_engagement_score": 0.1903,
 "engagement_vs_cohort": 0.045
 },
 {
 "group_value": "90-100%",
 "student_count": 181,
 "avg_score": 74.53,
 "score_vs_cohort": 4.09,
 "avg_engagement_score": 0.1457,
 "engagement_vs_cohort": 0.0004
 },
 {
 "group_value": "80-90%",
 "student_count": 201,
 "avg_score": 72.35,
 "score_vs_cohort": 1.92,
 "avg_engagement_score": 0.1668,
 "engagement_vs_cohort": 0.0215
 },
 {
 "group_value": "60-70%",
 "student_count": 193,
 "avg_score": 71.85,
 "score_vs_cohort": 1.42,
 "avg_engagement_score": 0.1414,
 "engagement_vs_cohort": -0.0039
 },
 {
 "group_value": "70-80%",
 "student_count": 194,
 "avg_score": 71.33,
 "score_vs_cohort": 0.89,
 "avg_engagement_score": 0.138,
 "engagement_vs_cohort": -0.0073
 },
 {
 "group_value": "50-60%",
 "student_count": 191,
 "avg_score": 70.27,
 "score_vs_cohort": -0.17,
 "avg_engagement_score": 0.1484,
 "engagement_vs_cohort": 0.0031
 },
 {
 "group_value": "30-40%",
 "student_count": 206,
 "avg_score": 68.5,
 "score_vs_cohort": -1.94,
 "avg_engagement_score": 0.1392,
 "engagement_vs_cohort": -0.0061
 },
 {
 "group_value": "0-10%",
 "student_count": 152,
 "avg_score": 68.05,
 "score_vs_cohort": -2.39,
 "avg_engagement_score": 0.1463,
 "engagement_vs_cohort": 0.001
 },
 {
 "group_value": "40-50%",
 "student_count": 185,
 "avg_score": 67.76,
 "score_vs_cohort": -2.67,
 "avg_engagement_score": 0.1312,
 "engagement_vs_cohort": -0.0141
 },
 {
 "group_value": "20-30%",
 "student_count": 196,
 "avg_score": 65.99,
 "score_vs_cohort": -4.45,
 "avg_engagement_score": 0.1318,
 "engagement_vs_cohort": -0.0135
 },
 {
 "group_value": "10-20",
 "student_count": 168,
 "avg_score": 62.96,
 "score_vs_cohort": -7.48,
 "avg_engagement_score": 0.1312,
 "engagement_vs_cohort": -0.0141
 }
 ],
 "policy": "descriptive_equity_comparison_only_no_group_prescription"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8755,
 "token_usage": {
 "prompt_tokens": 3171,
 "completion_tokens": 504,
 "total_tokens": 3675
 },
 "strategy": "comparison",
 "granularity": "cohort_aggregate",
 "cost_usd": 0.000778
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
 "observed": "8f4e41747ea3f615d793457834081d21309a8a5f5847129b33cf83033b87ad18",
 "expected_values": [
 "8f4e41747ea3f615d793457834081d21309a8a5f5847129b33cf83033b87ad18"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "5f0d9bfd03e96ed997d71cc6bb04e9fda69ba2a7710330604934b332f31cd243",
 "expected": "5f0d9bfd03e96ed997d71cc6bb04e9fda69ba2a7710330604934b332f31cd243"
 },
 {
 "check_id": "numeric_fields_demographic_performance",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "demographic_performance",
 "numeric_columns": [
 "avg_engagement_score",
 "avg_score",
 "score_vs_cohort",
 "student_count"
 ],
 "numeric_summaries": {
 "avg_engagement_score": {
 "count": 11,
 "min": 0.1312,
 "max": 0.1903
 },
 "avg_score": {
 "count": 11,
 "min": 62.96,
 "max": 81.21
 },
 "score_vs_cohort": {
 "count": 11,
 "min": -7.48,
 "max": 10.77
 },
 "student_count": {
 "count": 11,
 "min": 131,
 "max": 206
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_demographic_performance",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "demographic_performance",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```
