# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G12__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__A-G12__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "A-G12",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Background group pass/fail/withdrawal rate",
 "scope": "Many students",
 "actionable_question": "Which demographic groups have the highest failure or dropout rate?",
 "target_audience": "academic_advisor, admin",
 "ai_summary_type": "group_comparison",
 "ai_prompt_hint": "For each demographic group, state fail rate and withdrawal rate as percentages. Flag groups where fail+withdrawn > cohort threshold. Note: output is categorical final_outcome — distinct from A-G08 which uses continuous avg_score.",
 "query_labels": [
 "outcome_by_group"
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
 "socioeconomic_band / gender / age_group / highest_education; final_outcome"
 ],
 "output_schema": {
 "required_columns": [
 "group_value",
 "final_outcome",
 "pct_within_group"
 ],
 "optional_columns": [
 "student_count"
 ]
 },
 "query_labels": [
 "outcome_by_group"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-G12-CORE-01",
 "description": "For each demographic group, state fail rate and withdrawal rate as percentages."
 },
 {
 "requirement_id": "A-G12-CORE-02",
 "description": "Flag groups where fail+withdrawn > cohort threshold."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-G12-CONSTRAINT-01",
 "description": "Do not conflate categorical pass, fail, or withdrawal outcomes with continuous score metrics when interpreting group results."
 }
 ],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Applicable because the task compares failure and withdrawal rates across demographic groups."
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
 "dataset_label": "outcome_by_group",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G12.json",
 "artifact_sha256": "e89d1a5fe07f67b8ce1c2004da0666644c2384146933a343edb249a7f1ca7f8c",
 "row_count": 4,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 4,
 "prompt_embedded_row_count": 4,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "e89d1a5fe07f67b8ce1c2004da0666644c2384146933a343edb249a7f1ca7f8c",
 "evidence_rows_sha256": "c220f643bbbb6cafb698bfdf87f07663c0e05004aaf255bc69f054f840ff760f",
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
 "full_result_row_count": 4,
 "embedded_datasets_sha256": "c220f643bbbb6cafb698bfdf87f07663c0e05004aaf255bc69f054f840ff760f",
 "datasets": {
 "outcome_by_group": [
 {
 "group_value": "GP",
 "final_outcome": "Fail",
 "student_count": 32,
 "pct_within_group": "7.6"
 },
 {
 "group_value": "GP",
 "final_outcome": "Pass",
 "student_count": 391,
 "pct_within_group": "92.4"
 },
 {
 "group_value": "MS",
 "final_outcome": "Fail",
 "student_count": 68,
 "pct_within_group": "30.1"
 },
 {
 "group_value": "MS",
 "final_outcome": "Pass",
 "student_count": 158,
 "pct_within_group": "69.9"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-G12__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "fdba5c8729f9b2cb5e4bfc164f4eede01987d874528da4236e72ca0fd6f3ad3c",
 "generator_input_sha256": "cbad0f7ba39159982aa89a9aa368a30a44d2ed59dc448ac2c90a310e0a797890",
 "generator_input_compact": {
 "task_id": "A-G12",
 "execution_id": "exec_1781847232738_44f516ee",
 "task_name": "Background group pass/fail/withdrawal rate",
 "analysis_type": "segmentation",
 "explanation_strategy": "comparison",
 "actionable_question": "Which demographic groups have the highest failure or dropout rate?",
 "target_audience": [
 "academic_advisor",
 "admin"
 ],
 "query_labels": [
 "outcome_by_group"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "outcome_by_group"
 ],
 "dataset_row_counts": {
 "outcome_by_group": 4
 },
 "ai_summary_config_summary": {
 "summary_type": "group_comparison",
 "metric_column": "pct_within_group",
 "entity_column": null,
 "group_column": "group_value",
 "time_column": null,
 "sort_by": "pct_within_group",
 "sort_direction": "desc",
 "top_k": 12,
 "bottom_k": 4,
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
 "raw_text": "Summary: The comparison of pass and fail rates between the GP and MS groups reveals significant disparities in performance. The MS group exhibits a notably higher failure rate compared to the GP group, indicating potential areas for intervention.\n\nInsights: Higher Failure Rate in MS Group: The MS group has a failure rate of 30.1%, which is significantly higher than the GP group's failure rate of 7.6%. This indicates that students in the MS group are struggling more than those in the GP group. | Pass Rate Discrepancy: The pass rate for the GP group is 92.4%, while the MS group has a pass rate of 69.9%. This further emphasizes the performance gap, with GP students achieving a higher success rate.\n\nEducational implications: The significant difference in failure rates suggests a need for targeted support and resources for the MS group to improve student outcomes.\n\nRecommendations: high - Implement targeted intervention programs for the MS group. - To address the high failure rate and improve overall student performance.",
 "structured_payload": {
 "task_id": "A-G12",
 "execution_id": "exec_1781847232738_44f516ee",
 "explanation": {
 "summary": "The comparison of pass and fail rates between the GP and MS groups reveals significant disparities in performance. The MS group exhibits a notably higher failure rate compared to the GP group, indicating potential areas for intervention.",
 "insights": [
 {
 "title": "Higher Failure Rate in MS Group",
 "description": "The MS group has a failure rate of 30.1%, which is significantly higher than the GP group's failure rate of 7.6%. This indicates that students in the MS group are struggling more than those in the GP group.",
 "severity": "high",
 "evidence": [
 {
 "metric": "pct_within_group",
 "value": "30.1",
 "comparison": "baseline",
 "delta": 22.5,
 "context": "Comparison of failure rates between MS and GP groups"
 }
 ]
 },
 {
 "title": "Pass Rate Discrepancy",
 "description": "The pass rate for the GP group is 92.4%, while the MS group has a pass rate of 69.9%. This further emphasizes the performance gap, with GP students achieving a higher success rate.",
 "severity": "high",
 "evidence": [
 {
 "metric": "pct_within_group",
 "value": "92.4",
 "comparison": "baseline",
 "delta": 22.5,
 "context": "Comparison of pass rates between GP and MS groups"
 }
 ]
 }
 ],
 "educational_implications": [
 "The significant difference in failure rates suggests a need for targeted support and resources for the MS group to improve student outcomes."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted intervention programs for the MS group.",
 "rationale": "To address the high failure rate and improve overall student performance."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "Data is derived from a complete dataset with clear metrics for comparison.",
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
 "full_result_row_count": 4,
 "included_row_count": 4,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "outcome_by_group",
 "row_count": 4,
 "included_row_count": 4
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 4,
 "baseline_reference_tokens": 129,
 "task_aware_prompt_tokens": 808,
 "token_ratio": 6.2636,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.weakest_group",
 "exceptions.dominant_group",
 "comparison.gaps",
 "primary_finding.group_series"
 ],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.2636 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "group_comparison",
 "task_id": "A-G12",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "outcome_by_group",
 "row_count": 4,
 "group_column": "group_value",
 "group_key_columns": [
 "group_value",
 "final_outcome"
 ],
 "series_column": "final_outcome",
 "metric_column": "pct_within_group",
 "count_column": "student_count",
 "gap_column": null,
 "composite_group_keys": true
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "focus_summary": [
 {
 "group": "MS",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 30.1,
 "focus_count_total": 68,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "GP",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 7.6,
 "focus_count_total": 32,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 }
 ],
 "group_metrics": [
 {
 "group": "GP",
 "student_count": 32,
 "pct_within_group": 7.6,
 "group_key_values": {
 "group_value": "GP",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=GP | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -68.6136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "GP",
 "student_count": 391,
 "pct_within_group": 92.4,
 "group_key_values": {
 "group_value": "GP",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=GP | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 16.1864,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "MS",
 "student_count": 68,
 "pct_within_group": 30.1,
 "group_key_values": {
 "group_value": "MS",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=MS | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -46.1136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "MS",
 "student_count": 158,
 "pct_within_group": 69.9,
 "group_key_values": {
 "group_value": "MS",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=MS | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -6.3136,
 "gap_basis": "derived_from_weighted_cohort_mean"
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
 "No explicit gap column configured; gaps derived from pct_within_group relative to weighted cohort mean.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "group_comparison",
 "dataset_name": "outcome_by_group",
 "row_count": 4,
 "group_column": "group_value",
 "group_key_columns": [
 "group_value",
 "final_outcome"
 ],
 "series_column": "final_outcome",
 "composite_group_keys": true,
 "metric_column": "pct_within_group",
 "count_column": "student_count",
 "gap_column": null,
 "group_metrics": [
 {
 "group": "GP",
 "student_count": 32,
 "pct_within_group": 7.6,
 "group_key_values": {
 "group_value": "GP",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=GP | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -68.6136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "GP",
 "student_count": 391,
 "pct_within_group": 92.4,
 "group_key_values": {
 "group_value": "GP",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=GP | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 16.1864,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "MS",
 "student_count": 68,
 "pct_within_group": 30.1,
 "group_key_values": {
 "group_value": "MS",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=MS | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -46.1136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "MS",
 "student_count": 158,
 "pct_within_group": 69.9,
 "group_key_values": {
 "group_value": "MS",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=MS | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -6.3136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ],
 "group_series": [
 {
 "group": "GP",
 "series_count": 2,
 "total_count": 423,
 "weighted_average_metric": 85.9849,
 "series": [
 {
 "group": "GP",
 "student_count": 32,
 "pct_within_group": 7.6,
 "group_key_values": {
 "group_value": "GP",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=GP | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -68.6136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "GP",
 "student_count": 391,
 "pct_within_group": 92.4,
 "group_key_values": {
 "group_value": "GP",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=GP | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 16.1864,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "MS",
 "series_count": 2,
 "total_count": 226,
 "weighted_average_metric": 57.9248,
 "series": [
 {
 "group": "MS",
 "student_count": 68,
 "pct_within_group": 30.1,
 "group_key_values": {
 "group_value": "MS",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=MS | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -46.1136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "MS",
 "student_count": 158,
 "pct_within_group": 69.9,
 "group_key_values": {
 "group_value": "MS",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=MS | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -6.3136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 }
 ],
 "focus_summary": [
 {
 "group": "MS",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 30.1,
 "focus_count_total": 68,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "GP",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 7.6,
 "focus_count_total": 32,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 }
 ],
 "gaps": [
 {
 "group": "GP",
 "gap": 16.1864,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 92.4,
 "student_count": 391
 },
 {
 "group": "MS",
 "gap": -6.3136,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 69.9,
 "student_count": 158
 },
 {
 "group": "MS",
 "gap": -46.1136,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 30.1,
 "student_count": 68
 },
 {
 "group": "GP",
 "gap": -68.6136,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 7.6,
 "student_count": 32
 }
 ],
 "dominant_group": {
 "group": "GP",
 "student_count": 391,
 "basis": "largest_count"
 },
 "weakest_group": {
 "group": "GP",
 "pct_within_group": 7.6,
 "basis": "most_negative_gap",
 "gap": -68.6136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 "missing_groups": [],
 "low_count_warnings": [],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from pct_within_group relative to weighted cohort mean.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 6703,
 "token_usage": {
 "prompt_tokens": 1382,
 "completion_tokens": 456,
 "total_tokens": 1838
 },
 "strategy": "comparison",
 "granularity": "cohort_aggregate",
 "cost_usd": 0.000481
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-G12__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "fdba5c8729f9b2cb5e4bfc164f4eede01987d874528da4236e72ca0fd6f3ad3c",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1382,
 "completion_tokens": 456,
 "total_tokens": 1838
 },
 "latency_ms": 6779,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-G12",
 "execution_id": "exec_1781847232738_44f516ee",
 "explanation": {
 "summary": "The comparison of pass and fail rates between the GP and MS groups reveals significant disparities in performance. The MS group exhibits a notably higher failure rate compared to the GP group, indicating potential areas for intervention.",
 "insights": [
 {
 "title": "Higher Failure Rate in MS Group",
 "description": "The MS group has a failure rate of 30.1%, which is significantly higher than the GP group's failure rate of 7.6%. This indicates that students in the MS group are struggling more than those in the GP group.",
 "severity": "high",
 "evidence": [
 {
 "metric": "pct_within_group",
 "value": "30.1",
 "comparison": "baseline",
 "delta": 22.5,
 "context": "Comparison of failure rates between MS and GP groups"
 }
 ]
 },
 {
 "title": "Pass Rate Discrepancy",
 "description": "The pass rate for the GP group is 92.4%, while the MS group has a pass rate of 69.9%. This further emphasizes the performance gap, with GP students achieving a higher success rate.",
 "severity": "high",
 "evidence": [
 {
 "metric": "pct_within_group",
 "value": "92.4",
 "comparison": "baseline",
 "delta": 22.5,
 "context": "Comparison of pass rates between GP and MS groups"
 }
 ]
 }
 ],
 "educational_implications": [
 "The significant difference in failure rates suggests a need for targeted support and resources for the MS group to improve student outcomes."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted intervention programs for the MS group.",
 "rationale": "To address the high failure rate and improve overall student performance."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "Data is derived from a complete dataset with clear metrics for comparison.",
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
 "full_result_row_count": 4,
 "included_row_count": 4,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "outcome_by_group",
 "row_count": 4,
 "included_row_count": 4
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 4,
 "baseline_reference_tokens": 129,
 "task_aware_prompt_tokens": 808,
 "token_ratio": 6.2636,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.weakest_group",
 "exceptions.dominant_group",
 "comparison.gaps",
 "primary_finding.group_series"
 ],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.2636 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "group_comparison",
 "task_id": "A-G12",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "outcome_by_group",
 "row_count": 4,
 "group_column": "group_value",
 "group_key_columns": [
 "group_value",
 "final_outcome"
 ],
 "series_column": "final_outcome",
 "metric_column": "pct_within_group",
 "count_column": "student_count",
 "gap_column": null,
 "composite_group_keys": true
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "focus_summary": [
 {
 "group": "MS",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 30.1,
 "focus_count_total": 68,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "GP",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 7.6,
 "focus_count_total": 32,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 }
 ],
 "group_metrics": [
 {
 "group": "GP",
 "student_count": 32,
 "pct_within_group": 7.6,
 "group_key_values": {
 "group_value": "GP",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=GP | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -68.6136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "GP",
 "student_count": 391,
 "pct_within_group": 92.4,
 "group_key_values": {
 "group_value": "GP",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=GP | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 16.1864,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "MS",
 "student_count": 68,
 "pct_within_group": 30.1,
 "group_key_values": {
 "group_value": "MS",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=MS | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -46.1136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "MS",
 "student_count": 158,
 "pct_within_group": 69.9,
 "group_key_values": {
 "group_value": "MS",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=MS | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -6.3136,
 "gap_basis": "derived_from_weighted_cohort_mean"
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
 "No explicit gap column configured; gaps derived from pct_within_group relative to weighted cohort mean.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "group_comparison",
 "dataset_name": "outcome_by_group",
 "row_count": 4,
 "group_column": "group_value",
 "group_key_columns": [
 "group_value",
 "final_outcome"
 ],
 "series_column": "final_outcome",
 "composite_group_keys": true,
 "metric_column": "pct_within_group",
 "count_column": "student_count",
 "gap_column": null,
 "group_metrics": [
 {
 "group": "GP",
 "student_count": 32,
 "pct_within_group": 7.6,
 "group_key_values": {
 "group_value": "GP",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=GP | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -68.6136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "GP",
 "student_count": 391,
 "pct_within_group": 92.4,
 "group_key_values": {
 "group_value": "GP",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=GP | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 16.1864,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "MS",
 "student_count": 68,
 "pct_within_group": 30.1,
 "group_key_values": {
 "group_value": "MS",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=MS | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -46.1136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "MS",
 "student_count": 158,
 "pct_within_group": 69.9,
 "group_key_values": {
 "group_value": "MS",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=MS | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -6.3136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ],
 "group_series": [
 {
 "group": "GP",
 "series_count": 2,
 "total_count": 423,
 "weighted_average_metric": 85.9849,
 "series": [
 {
 "group": "GP",
 "student_count": 32,
 "pct_within_group": 7.6,
 "group_key_values": {
 "group_value": "GP",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=GP | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -68.6136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "GP",
 "student_count": 391,
 "pct_within_group": 92.4,
 "group_key_values": {
 "group_value": "GP",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=GP | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 16.1864,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "MS",
 "series_count": 2,
 "total_count": 226,
 "weighted_average_metric": 57.9248,
 "series": [
 {
 "group": "MS",
 "student_count": 68,
 "pct_within_group": 30.1,
 "group_key_values": {
 "group_value": "MS",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=MS | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -46.1136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "MS",
 "student_count": 158,
 "pct_within_group": 69.9,
 "group_key_values": {
 "group_value": "MS",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=MS | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -6.3136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 }
 ],
 "focus_summary": [
 {
 "group": "MS",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 30.1,
 "focus_count_total": 68,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "GP",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 7.6,
 "focus_count_total": 32,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 }
 ],
 "gaps": [
 {
 "group": "GP",
 "gap": 16.1864,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 92.4,
 "student_count": 391
 },
 {
 "group": "MS",
 "gap": -6.3136,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 69.9,
 "student_count": 158
 },
 {
 "group": "MS",
 "gap": -46.1136,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 30.1,
 "student_count": 68
 },
 {
 "group": "GP",
 "gap": -68.6136,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 7.6,
 "student_count": 32
 }
 ],
 "dominant_group": {
 "group": "GP",
 "student_count": 391,
 "basis": "largest_count"
 },
 "weakest_group": {
 "group": "GP",
 "pct_within_group": 7.6,
 "basis": "most_negative_gap",
 "gap": -68.6136,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 "missing_groups": [],
 "low_count_warnings": [],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from pct_within_group relative to weighted cohort mean.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 6703,
 "token_usage": {
 "prompt_tokens": 1382,
 "completion_tokens": 456,
 "total_tokens": 1838
 },
 "strategy": "comparison",
 "granularity": "cohort_aggregate",
 "cost_usd": 0.000481
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
 "expected": 4,
 "observed": 4
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "e89d1a5fe07f67b8ce1c2004da0666644c2384146933a343edb249a7f1ca7f8c",
 "expected_values": [
 "e89d1a5fe07f67b8ce1c2004da0666644c2384146933a343edb249a7f1ca7f8c"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "c220f643bbbb6cafb698bfdf87f07663c0e05004aaf255bc69f054f840ff760f",
 "expected": "c220f643bbbb6cafb698bfdf87f07663c0e05004aaf255bc69f054f840ff760f"
 },
 {
 "check_id": "numeric_fields_outcome_by_group",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "outcome_by_group",
 "numeric_columns": [
 "student_count"
 ],
 "numeric_summaries": {
 "student_count": {
 "count": 4,
 "min": 32,
 "max": 391
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_outcome_by_group",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "outcome_by_group",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```
