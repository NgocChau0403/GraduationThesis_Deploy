# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G12__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-G12__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
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

## Deterministic Retrieval Evidence

```json
{
 "full_query_artifacts": [
 {
 "dataset_label": "outcome_by_group",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G12.json",
 "artifact_sha256": "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e",
 "row_count": 53,
 "readable": true
 }
 ],
 "evidence_access_mode": "deterministic_artifact_retrieval",
 "full_result_row_count": 53,
 "prompt_embedded_row_count": 0,
 "retrieved_row_count": 53,
 "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G12__task_aware_data_summarization.json",
 "full_access_available": true,
 "full_result_sent_to_llm": false,
 "evidence_artifact_file_sha256": "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e",
 "evidence_rows_sha256": "a5465584ca6ef16751adfb3b01e110713b6d40278cc8ff3ef83d87c1644e19f2",
 "retrieval_validation": {
 "status": "pass",
 "retrieved_row_count": 53,
 "chunk_count": 1,
 "chunk_ids": [
 "SAMPLE_OULAD__A-G12__task_aware_data_summarization__outcome_by_group__chunk_1"
 ],
 "row_ranges": [
 {
 "dataset_label": "outcome_by_group",
 "row_start_inclusive": 0,
 "row_end_inclusive": 52,
 "row_count": 53
 }
 ],
 "issues": []
 }
}
```

```json
{
 "evidence_access_mode": "deterministic_artifact_retrieval",
 "retrieval_log": {
 "artifact_type": "llm_judge_v2_phase6_4_deterministic_retrieval_log",
 "generated_at": "2026-06-21T20:50:28.148Z",
 "record_id": "SAMPLE_OULAD__A-G12__task_aware_data_summarization",
 "retrieval_request_complete": true,
 "retrieval_coverage_status": "full",
 "chunks": [
 {
 "chunk_id": "SAMPLE_OULAD__A-G12__task_aware_data_summarization__outcome_by_group__chunk_1",
 "dataset_label": "outcome_by_group",
 "row_start_inclusive": 0,
 "row_end_inclusive": 52,
 "row_count": 53,
 "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G12.json",
 "source_artifact_sha256": "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e"
 }
 ]
 },
 "retrieved_datasets_sha256": "a5465584ca6ef16751adfb3b01e110713b6d40278cc8ff3ef83d87c1644e19f2",
 "retrieved_datasets": {
 "outcome_by_group": [
 {
 "group_value": "0-10%",
 "final_outcome": "Distinction",
 "student_count": 16,
 "pct_within_group": "7.6"
 },
 {
 "group_value": "0-10%",
 "final_outcome": "Fail",
 "student_count": 29,
 "pct_within_group": "13.8"
 },
 {
 "group_value": "0-10%",
 "final_outcome": "Pass",
 "student_count": 52,
 "pct_within_group": "24.8"
 },
 {
 "group_value": "0-10%",
 "final_outcome": "Withdrawn",
 "student_count": 113,
 "pct_within_group": "53.8"
 },
 {
 "group_value": "10-20",
 "final_outcome": "Distinction",
 "student_count": 18,
 "pct_within_group": "8.1"
 },
 {
 "group_value": "10-20",
 "final_outcome": "Fail",
 "student_count": 44,
 "pct_within_group": "19.9"
 },
 {
 "group_value": "10-20",
 "final_outcome": "Pass",
 "student_count": 51,
 "pct_within_group": "23.1"
 },
 {
 "group_value": "10-20",
 "final_outcome": "Withdrawn",
 "student_count": 108,
 "pct_within_group": "48.9"
 },
 {
 "group_value": "20-30%",
 "final_outcome": "Distinction",
 "student_count": 26,
 "pct_within_group": "10"
 },
 {
 "group_value": "20-30%",
 "final_outcome": "Fail",
 "student_count": 43,
 "pct_within_group": "16.5"
 },
 {
 "group_value": "20-30%",
 "final_outcome": "Pass",
 "student_count": 53,
 "pct_within_group": "20.4"
 },
 {
 "group_value": "20-30%",
 "final_outcome": "Withdrawn",
 "student_count": 138,
 "pct_within_group": "53.1"
 },
 {
 "group_value": "30-40%",
 "final_outcome": "Distinction",
 "student_count": 23,
 "pct_within_group": "8.8"
 },
 {
 "group_value": "30-40%",
 "final_outcome": "Fail",
 "student_count": 45,
 "pct_within_group": "17.3"
 },
 {
 "group_value": "30-40%",
 "final_outcome": "Pass",
 "student_count": 78,
 "pct_within_group": "30"
 },
 {
 "group_value": "30-40%",
 "final_outcome": "Withdrawn",
 "student_count": 114,
 "pct_within_group": "43.8"
 },
 {
 "group_value": "40-50%",
 "final_outcome": "Distinction",
 "student_count": 23,
 "pct_within_group": "9.5"
 },
 {
 "group_value": "40-50%",
 "final_outcome": "Fail",
 "student_count": 34,
 "pct_within_group": "14.1"
 },
 {
 "group_value": "40-50%",
 "final_outcome": "Pass",
 "student_count": 70,
 "pct_within_group": "29"
 },
 {
 "group_value": "40-50%",
 "final_outcome": "Withdrawn",
 "student_count": 114,
 "pct_within_group": "47.3"
 },
 {
 "group_value": "50-60%",
 "final_outcome": "Distinction",
 "student_count": 26,
 "pct_within_group": "10.8"
 },
 {
 "group_value": "50-60%",
 "final_outcome": "Fail",
 "student_count": 38,
 "pct_within_group": "15.8"
 },
 {
 "group_value": "50-60%",
 "final_outcome": "Pass",
 "student_count": 76,
 "pct_within_group": "31.5"
 },
 {
 "group_value": "50-60%",
 "final_outcome": "Withdrawn",
 "student_count": 101,
 "pct_within_group": "41.9"
 },
 {
 "group_value": "60-70%",
 "final_outcome": "Distinction",
 "student_count": 29,
 "pct_within_group": "12.6"
 },
 {
 "group_value": "60-70%",
 "final_outcome": "Fail",
 "student_count": 37,
 "pct_within_group": "16.1"
 },
 {
 "group_value": "60-70%",
 "final_outcome": "Pass",
 "student_count": 71,
 "pct_within_group": "30.9"
 },
 {
 "group_value": "60-70%",
 "final_outcome": "Withdrawn",
 "student_count": 93,
 "pct_within_group": "40.4"
 },
 {
 "group_value": "70-80%",
 "final_outcome": "Distinction",
 "student_count": 34,
 "pct_within_group": "14.7"
 },
 {
 "group_value": "70-80%",
 "final_outcome": "Fail",
 "student_count": 43,
 "pct_within_group": "18.6"
 },
 {
 "group_value": "70-80%",
 "final_outcome": "Pass",
 "student_count": 62,
 "pct_within_group": "26.8"
 },
 {
 "group_value": "70-80%",
 "final_outcome": "Withdrawn",
 "student_count": 92,
 "pct_within_group": "39.8"
 },
 {
 "group_value": "80-90%",
 "final_outcome": "Distinction",
 "student_count": 37,
 "pct_within_group": "15"
 },
 {
 "group_value": "80-90%",
 "final_outcome": "Fail",
 "student_count": 41,
 "pct_within_group": "16.7"
 },
 {
 "group_value": "80-90%",
 "final_outcome": "Pass",
 "student_count": 80,
 "pct_within_group": "32.5"
 },
 {
 "group_value": "80-90%",
 "final_outcome": "Withdrawn",
 "student_count": 88,
 "pct_within_group": "35.8"
 },
 {
 "group_value": "90-100%",
 "final_outcome": "Distinction",
 "student_count": 36,
 "pct_within_group": "17"
 },
 {
 "group_value": "90-100%",
 "final_outcome": "Fail",
 "student_count": 36,
 "pct_within_group": "17"
 },
 {
 "group_value": "90-100%",
 "final_outcome": "Pass",
 "student_count": 65,
 "pct_within_group": "30.7"
 },
 {
 "group_value": "90-100%",
 "final_outcome": "Withdrawn",
 "student_count": 75,
 "pct_within_group": "35.4"
 },
 {
 "group_value": "Ireland",
 "final_outcome": "Distinction",
 "student_count": 9,
 "pct_within_group": "21.4"
 },
 {
 "group_value": "Ireland",
 "final_outcome": "Fail",
 "student_count": 2,
 "pct_within_group": "4.8"
 },
 {
 "group_value": "Ireland",
 "final_outcome": "Pass",
 "student_count": 22,
 "pct_within_group": "52.4"
 },
 {
 "group_value": "Ireland",
 "final_outcome": "Withdrawn",
 "student_count": 9,
 "pct_within_group": "21.4"
 },
 {
 "group_value": "North Region",
 "final_outcome": "Distinction",
 "student_count": 28,
 "pct_within_group": "28.6"
 },
 {
 "group_value": "North Region",
 "final_outcome": "Fail",
 "student_count": 13,
 "pct_within_group": "13.3"
 },
 {
 "group_value": "North Region",
 "final_outcome": "Pass",
 "student_count": 27,
 "pct_within_group": "27.6"
 },
 {
 "group_value": "North Region",
 "final_outcome": "Withdrawn",
 "student_count": 30,
 "pct_within_group": "30.6"
 },
 {
 "group_value": "Scotland",
 "final_outcome": "Fail",
 "student_count": 1,
 "pct_within_group": "100"
 },
 {
 "group_value": "South Region",
 "final_outcome": "Distinction",
 "student_count": 1,
 "pct_within_group": "25"
 },
 {
 "group_value": "South Region",
 "final_outcome": "Pass",
 "student_count": 1,
 "pct_within_group": "25"
 },
 {
 "group_value": "South Region",
 "final_outcome": "Withdrawn",
 "student_count": 2,
 "pct_within_group": "50"
 },
 {
 "group_value": "West Midlands Region",
 "final_outcome": "Pass",
 "student_count": 1,
 "pct_within_group": "100"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G12__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "296a79bb655dcd4b50bcbd209171cf2918aa6aaf8bc838a2b3ceab1c99d57e39",
 "generator_input_sha256": "831ce9348b711c4a78cf6315d6c1ccf7d4e7da7ec123fe660c1d6d245658932e",
 "generator_input_compact": {
 "task_id": "A-G12",
 "execution_id": "exec_1781847774827_593443bc",
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
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "outcome_by_group"
 ],
 "dataset_row_counts": {
 "outcome_by_group": 53
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
 "raw_text": "Summary: cohort_fail_withdrawal_threshold_pct=59.3675; group=0-10%, fail_rate_pct=13.8, withdrawal_rate_pct=53.8, combined_rate_pct=67.6, above_cohort_threshold=True | group=10-20, fail_rate_pct=19.9, withdrawal_rate_pct=48.9, combined_rate_pct=68.8, above_cohort_threshold=True | group=20-30%, fail_rate_pct=16.5, withdrawal_rate_pct=53.1, combined_rate_pct=69.6, above_cohort_threshold=True | group=30-40%, fail_rate_pct=17.3, withdrawal_rate_pct=43.8, combined_rate_pct=61.1, above_cohort_threshold=True | group=40-50%, fail_rate_pct=14.1, withdrawal_rate_pct=47.3, combined_rate_pct=61.4, above_cohort_threshold=True | group=50-60%, fail_rate_pct=15.8, withdrawal_rate_pct=41.9, combined_rate_pct=57.7, above_cohort_threshold=False | group=60-70%, fail_rate_pct=16.1, withdrawal_rate_pct=40.4, combined_rate_pct=56.5, above_cohort_threshold=False | group=70-80%, fail_rate_pct=18.6, withdrawal_rate_pct=39.8, combined_rate_pct=58.4, above_cohort_threshold=False | group=80-90%, fail_rate_pct=16.7, withdrawal_rate_pct=35.8, combined_rate_pct=52.5, above_cohort_threshold=False | group=90-100%, fail_rate_pct=17.0, withdrawal_rate_pct=35.4, combined_rate_pct=52.4, above_cohort_threshold=False | group=Ireland, fail_rate_pct=4.8, withdrawal_rate_pct=21.4, combined_rate_pct=26.2, above_cohort_threshold=False | group=North Region, fail_rate_pct=13.3, withdrawal_rate_pct=30.6, combined_rate_pct=43.9, above_cohort_threshold=False | group=Scotland, fail_rate_pct=100.0, withdrawal_rate_pct=0, combined_rate_pct=100.0, above_cohort_threshold=True | group=South Region, fail_rate_pct=0, withdrawal_rate_pct=50.0, combined_rate_pct=50.0, above_cohort_threshold=False | group=West Midlands Region, fail_rate_pct=0, withdrawal_rate_pct=0, combined_rate_pct=0, above_cohort_threshold=False.\n\nEducational implications: Categorical outcome rates are descriptive; group membership does not establish causes or justify demographic targeting.",
 "structured_payload": {
 "task_id": "A-G12",
 "execution_id": "exec_1781847774827_593443bc",
 "explanation": {
 "summary": "cohort_fail_withdrawal_threshold_pct=59.3675; group=0-10%, fail_rate_pct=13.8, withdrawal_rate_pct=53.8, combined_rate_pct=67.6, above_cohort_threshold=True | group=10-20, fail_rate_pct=19.9, withdrawal_rate_pct=48.9, combined_rate_pct=68.8, above_cohort_threshold=True | group=20-30%, fail_rate_pct=16.5, withdrawal_rate_pct=53.1, combined_rate_pct=69.6, above_cohort_threshold=True | group=30-40%, fail_rate_pct=17.3, withdrawal_rate_pct=43.8, combined_rate_pct=61.1, above_cohort_threshold=True | group=40-50%, fail_rate_pct=14.1, withdrawal_rate_pct=47.3, combined_rate_pct=61.4, above_cohort_threshold=True | group=50-60%, fail_rate_pct=15.8, withdrawal_rate_pct=41.9, combined_rate_pct=57.7, above_cohort_threshold=False | group=60-70%, fail_rate_pct=16.1, withdrawal_rate_pct=40.4, combined_rate_pct=56.5, above_cohort_threshold=False | group=70-80%, fail_rate_pct=18.6, withdrawal_rate_pct=39.8, combined_rate_pct=58.4, above_cohort_threshold=False | group=80-90%, fail_rate_pct=16.7, withdrawal_rate_pct=35.8, combined_rate_pct=52.5, above_cohort_threshold=False | group=90-100%, fail_rate_pct=17.0, withdrawal_rate_pct=35.4, combined_rate_pct=52.4, above_cohort_threshold=False | group=Ireland, fail_rate_pct=4.8, withdrawal_rate_pct=21.4, combined_rate_pct=26.2, above_cohort_threshold=False | group=North Region, fail_rate_pct=13.3, withdrawal_rate_pct=30.6, combined_rate_pct=43.9, above_cohort_threshold=False | group=Scotland, fail_rate_pct=100.0, withdrawal_rate_pct=0, combined_rate_pct=100.0, above_cohort_threshold=True | group=South Region, fail_rate_pct=0, withdrawal_rate_pct=50.0, combined_rate_pct=50.0, above_cohort_threshold=False | group=West Midlands Region, fail_rate_pct=0, withdrawal_rate_pct=0, combined_rate_pct=0, above_cohort_threshold=False.",
 "insights": [],
 "educational_implications": [
 "Categorical outcome rates are descriptive; group membership does not establish causes or justify demographic targeting."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "Data quality is robust with sufficient sample sizes for the analyzed groups.",
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
 "full_result_row_count": 53,
 "included_row_count": 15,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "outcome_by_group",
 "row_count": 53,
 "included_row_count": 15
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 15,
 "baseline_reference_tokens": 644,
 "task_aware_prompt_tokens": 5359,
 "token_ratio": 8.3214,
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
 "task_output_contract": [
 "For every returned demographic group, state exact fail, withdrawal, and combined percentages and compare combined rate with the deterministic cohort fail+withdrawal threshold.",
 "Keep this categorical and descriptive; do not target interventions by demographic group or reverse group rankings."
 ],
 "must_keep_keys": [
 "group_metrics",
 "outcome_rate_evidence"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (8.3214 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "group_comparison",
 "task_id": "A-G12",
 "task_output_contract": [
 "For every returned demographic group, state exact fail, withdrawal, and combined percentages and compare combined rate with the deterministic cohort fail+withdrawal threshold.",
 "Keep this categorical and descriptive; do not target interventions by demographic group or reverse group rankings."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "outcome_by_group",
 "row_count": 53,
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
 "group": "Scotland",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 100,
 "focus_count_total": 1,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "20-30%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 69.6,
 "focus_count_total": 181,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "10-20",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 68.8,
 "focus_count_total": 152,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "0-10%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 67.6,
 "focus_count_total": 142,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "40-50%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 61.4,
 "focus_count_total": 148,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "30-40%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 61.1,
 "focus_count_total": 159,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "70-80%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 58.4,
 "focus_count_total": 135,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "50-60%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 57.7,
 "focus_count_total": 139,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "60-70%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 56.5,
 "focus_count_total": 130,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "80-90%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 52.5,
 "focus_count_total": 129,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "90-100%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 52.4,
 "focus_count_total": 111,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "South Region",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 50,
 "focus_count_total": 2,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "North Region",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 43.9,
 "focus_count_total": 43,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "Ireland",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 26.2,
 "focus_count_total": 11,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "West Midlands Region",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 0,
 "focus_count_total": 0,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 }
 ],
 "group_metrics": [
 {
 "group": "0-10%",
 "student_count": 16,
 "pct_within_group": 7.6,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -24.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 29,
 "pct_within_group": 13.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -18.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 52,
 "pct_within_group": 24.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -7.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 113,
 "pct_within_group": 53.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 21.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 18,
 "pct_within_group": 8.1,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -23.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 44,
 "pct_within_group": 19.9,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -11.9757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 51,
 "pct_within_group": 23.1,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -8.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 108,
 "pct_within_group": 48.9,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 17.0243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 26,
 "pct_within_group": 10,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -21.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 43,
 "pct_within_group": 16.5,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 53,
 "pct_within_group": 20.4,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -11.4757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 138,
 "pct_within_group": 53.1,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 21.2243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 23,
 "pct_within_group": 8.8,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -23.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 45,
 "pct_within_group": 17.3,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -14.5757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 78,
 "pct_within_group": 30,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -1.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 114,
 "pct_within_group": 43.8,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 11.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 23,
 "pct_within_group": 9.5,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -22.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 34,
 "pct_within_group": 14.1,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -17.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 70,
 "pct_within_group": 29,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -2.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 114,
 "pct_within_group": 47.3,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 15.4243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 26,
 "pct_within_group": 10.8,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -21.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 38,
 "pct_within_group": 15.8,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -16.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 76,
 "pct_within_group": 31.5,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -0.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 101,
 "pct_within_group": 41.9,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 10.0243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 29,
 "pct_within_group": 12.6,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -19.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 37,
 "pct_within_group": 16.1,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 71,
 "pct_within_group": 30.9,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -0.9757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 93,
 "pct_within_group": 40.4,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 8.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 34,
 "pct_within_group": 14.7,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -17.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 43,
 "pct_within_group": 18.6,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -13.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 62,
 "pct_within_group": 26.8,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -5.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 92,
 "pct_within_group": 39.8,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 7.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 37,
 "pct_within_group": 15,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -16.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 41,
 "pct_within_group": 16.7,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 80,
 "pct_within_group": 32.5,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 0.6243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 88,
 "pct_within_group": 35.8,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 3.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 36,
 "pct_within_group": 17,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -14.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 36,
 "pct_within_group": 17,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -14.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 65,
 "pct_within_group": 30.7,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -1.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 75,
 "pct_within_group": 35.4,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 3.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ],
 "outcome_rate_evidence": {
 "cohort_fail_withdrawal_threshold_pct": 59.3675,
 "groups": [
 {
 "group_value": "0-10%",
 "fail_rate_pct": "13.8",
 "withdrawal_rate_pct": "53.8",
 "combined_rate_pct": 67.6
 },
 {
 "group_value": "10-20",
 "fail_rate_pct": "19.9",
 "withdrawal_rate_pct": "48.9",
 "combined_rate_pct": 68.8
 },
 {
 "group_value": "20-30%",
 "fail_rate_pct": "16.5",
 "withdrawal_rate_pct": "53.1",
 "combined_rate_pct": 69.6
 },
 {
 "group_value": "30-40%",
 "fail_rate_pct": "17.3",
 "withdrawal_rate_pct": "43.8",
 "combined_rate_pct": 61.1
 },
 {
 "group_value": "40-50%",
 "fail_rate_pct": "14.1",
 "withdrawal_rate_pct": "47.3",
 "combined_rate_pct": 61.4
 },
 {
 "group_value": "50-60%",
 "fail_rate_pct": "15.8",
 "withdrawal_rate_pct": "41.9",
 "combined_rate_pct": 57.7
 },
 {
 "group_value": "60-70%",
 "fail_rate_pct": "16.1",
 "withdrawal_rate_pct": "40.4",
 "combined_rate_pct": 56.5
 },
 {
 "group_value": "70-80%",
 "fail_rate_pct": "18.6",
 "withdrawal_rate_pct": "39.8",
 "combined_rate_pct": 58.4
 },
 {
 "group_value": "80-90%",
 "fail_rate_pct": "16.7",
 "withdrawal_rate_pct": "35.8",
 "combined_rate_pct": 52.5
 },
 {
 "group_value": "90-100%",
 "fail_rate_pct": "17",
 "withdrawal_rate_pct": "35.4",
 "combined_rate_pct": 52.4
 },
 {
 "group_value": "Ireland",
 "fail_rate_pct": "4.8",
 "withdrawal_rate_pct": "21.4",
 "combined_rate_pct": 26.2
 },
 {
 "group_value": "North Region",
 "fail_rate_pct": "13.3",
 "withdrawal_rate_pct": "30.6",
 "combined_rate_pct": 43.9
 },
 {
 "group_value": "Scotland",
 "fail_rate_pct": "100",
 "withdrawal_rate_pct": 0,
 "combined_rate_pct": 100
 },
 {
 "group_value": "South Region",
 "fail_rate_pct": 0,
 "withdrawal_rate_pct": "50",
 "combined_rate_pct": 50
 },
 {
 "group_value": "West Midlands Region",
 "fail_rate_pct": 0,
 "withdrawal_rate_pct": 0,
 "combined_rate_pct": 0
 }
 ],
 "policy": "categorical_descriptive_only_no_group_prescription"
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_groups": [],
 "low_count_warnings": [
 {
 "group": "Ireland",
 "count": 9,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Ireland | final_outcome=Distinction' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "Ireland",
 "count": 2,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Ireland | final_outcome=Fail' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "Ireland",
 "count": 9,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Ireland | final_outcome=Withdrawn' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "Scotland",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Scotland | final_outcome=Fail' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "South Region",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=South Region | final_outcome=Distinction' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "South Region",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=South Region | final_outcome=Pass' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "South Region",
 "count": 2,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=South Region | final_outcome=Withdrawn' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "West Midlands Region",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=West Midlands Region | final_outcome=Pass' has student_count below 10.0; avoid over-weighting this comparison."
 }
 ],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from pct_within_group relative to weighted cohort mean.",
 "Group metrics capped at 40 of 53 groups.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "group_comparison",
 "dataset_name": "outcome_by_group",
 "row_count": 53,
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
 "group": "0-10%",
 "student_count": 16,
 "pct_within_group": 7.6,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -24.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 29,
 "pct_within_group": 13.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -18.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 52,
 "pct_within_group": 24.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -7.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 113,
 "pct_within_group": 53.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 21.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 18,
 "pct_within_group": 8.1,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -23.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 44,
 "pct_within_group": 19.9,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -11.9757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 51,
 "pct_within_group": 23.1,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -8.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 108,
 "pct_within_group": 48.9,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 17.0243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 26,
 "pct_within_group": 10,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -21.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 43,
 "pct_within_group": 16.5,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 53,
 "pct_within_group": 20.4,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -11.4757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 138,
 "pct_within_group": 53.1,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 21.2243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 23,
 "pct_within_group": 8.8,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -23.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 45,
 "pct_within_group": 17.3,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -14.5757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 78,
 "pct_within_group": 30,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -1.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 114,
 "pct_within_group": 43.8,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 11.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 23,
 "pct_within_group": 9.5,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -22.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 34,
 "pct_within_group": 14.1,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -17.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 70,
 "pct_within_group": 29,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -2.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 114,
 "pct_within_group": 47.3,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 15.4243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 26,
 "pct_within_group": 10.8,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -21.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 38,
 "pct_within_group": 15.8,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -16.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 76,
 "pct_within_group": 31.5,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -0.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 101,
 "pct_within_group": 41.9,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 10.0243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 29,
 "pct_within_group": 12.6,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -19.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 37,
 "pct_within_group": 16.1,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 71,
 "pct_within_group": 30.9,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -0.9757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 93,
 "pct_within_group": 40.4,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 8.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 34,
 "pct_within_group": 14.7,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -17.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 43,
 "pct_within_group": 18.6,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -13.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 62,
 "pct_within_group": 26.8,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -5.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 92,
 "pct_within_group": 39.8,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 7.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 37,
 "pct_within_group": 15,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -16.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 41,
 "pct_within_group": 16.7,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 80,
 "pct_within_group": 32.5,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 0.6243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 88,
 "pct_within_group": 35.8,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 3.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 36,
 "pct_within_group": 17,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -14.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 36,
 "pct_within_group": 17,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -14.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 65,
 "pct_within_group": 30.7,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -1.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 75,
 "pct_within_group": 35.4,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 3.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ],
 "group_series": [
 {
 "group": "20-30%",
 "series_count": 4,
 "total_count": 260,
 "weighted_average_metric": 36.0712,
 "series": [
 {
 "group": "20-30%",
 "student_count": 26,
 "pct_within_group": 10,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -21.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 43,
 "pct_within_group": 16.5,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 53,
 "pct_within_group": 20.4,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -11.4757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 138,
 "pct_within_group": 53.1,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 21.2243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "30-40%",
 "series_count": 4,
 "total_count": 260,
 "weighted_average_metric": 31.9773,
 "series": [
 {
 "group": "30-40%",
 "student_count": 23,
 "pct_within_group": 8.8,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -23.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 45,
 "pct_within_group": 17.3,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -14.5757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 78,
 "pct_within_group": 30,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -1.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 114,
 "pct_within_group": 43.8,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 11.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "80-90%",
 "series_count": 4,
 "total_count": 246,
 "weighted_average_metric": 28.415,
 "series": [
 {
 "group": "80-90%",
 "student_count": 37,
 "pct_within_group": 15,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -16.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 41,
 "pct_within_group": 16.7,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 80,
 "pct_within_group": 32.5,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 0.6243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 88,
 "pct_within_group": 35.8,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 3.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "40-50%",
 "series_count": 4,
 "total_count": 241,
 "weighted_average_metric": 33.6934,
 "series": [
 {
 "group": "40-50%",
 "student_count": 23,
 "pct_within_group": 9.5,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -22.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 34,
 "pct_within_group": 14.1,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -17.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 70,
 "pct_within_group": 29,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -2.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 114,
 "pct_within_group": 47.3,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 15.4243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "50-60%",
 "series_count": 4,
 "total_count": 241,
 "weighted_average_metric": 31.1498,
 "series": [
 {
 "group": "50-60%",
 "student_count": 26,
 "pct_within_group": 10.8,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -21.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 38,
 "pct_within_group": 15.8,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -16.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 76,
 "pct_within_group": 31.5,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -0.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 101,
 "pct_within_group": 41.9,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 10.0243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "70-80%",
 "series_count": 4,
 "total_count": 231,
 "weighted_average_metric": 28.6701,
 "series": [
 {
 "group": "70-80%",
 "student_count": 34,
 "pct_within_group": 14.7,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -17.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 43,
 "pct_within_group": 18.6,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -13.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 62,
 "pct_within_group": 26.8,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -5.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 92,
 "pct_within_group": 39.8,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 7.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "60-70%",
 "series_count": 4,
 "total_count": 230,
 "weighted_average_metric": 30.053,
 "series": [
 {
 "group": "60-70%",
 "student_count": 29,
 "pct_within_group": 12.6,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -19.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 37,
 "pct_within_group": 16.1,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 71,
 "pct_within_group": 30.9,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -0.9757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 93,
 "pct_within_group": 40.4,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 8.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "10-20",
 "series_count": 4,
 "total_count": 221,
 "weighted_average_metric": 33.8493,
 "series": [
 {
 "group": "10-20",
 "student_count": 18,
 "pct_within_group": 8.1,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -23.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 44,
 "pct_within_group": 19.9,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -11.9757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 51,
 "pct_within_group": 23.1,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -8.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 108,
 "pct_within_group": 48.9,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 17.0243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "90-100%",
 "series_count": 4,
 "total_count": 212,
 "weighted_average_metric": 27.7099,
 "series": [
 {
 "group": "90-100%",
 "student_count": 36,
 "pct_within_group": 17,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -14.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 36,
 "pct_within_group": 17,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -14.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 65,
 "pct_within_group": 30.7,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -1.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 75,
 "pct_within_group": 35.4,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 3.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "0-10%",
 "series_count": 4,
 "total_count": 210,
 "weighted_average_metric": 37.5752,
 "series": [
 {
 "group": "0-10%",
 "student_count": 16,
 "pct_within_group": 7.6,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -24.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 29,
 "pct_within_group": 13.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -18.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 52,
 "pct_within_group": 24.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -7.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 113,
 "pct_within_group": 53.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 21.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "North Region",
 "series_count": 4,
 "total_count": 98,
 "weighted_average_metric": 26.9071,
 "series": [
 {
 "group": "North Region",
 "student_count": 28,
 "pct_within_group": 28.6,
 "group_key_values": {
 "group_value": "North Region",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=North Region | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -3.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "North Region",
 "student_count": 13,
 "pct_within_group": 13.3,
 "group_key_values": {
 "group_value": "North Region",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=North Region | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -18.5757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "North Region",
 "student_count": 27,
 "pct_within_group": 27.6,
 "group_key_values": {
 "group_value": "North Region",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=North Region | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -4.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "North Region",
 "student_count": 30,
 "pct_within_group": 30.6,
 "group_key_values": {
 "group_value": "North Region",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=North Region | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": -1.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "Ireland",
 "series_count": 4,
 "total_count": 42,
 "weighted_average_metric": 36.8476,
 "series": [
 {
 "group": "Ireland",
 "student_count": 9,
 "pct_within_group": 21.4,
 "group_key_values": {
 "group_value": "Ireland",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=Ireland | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -10.4757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "Ireland",
 "student_count": 2,
 "pct_within_group": 4.8,
 "group_key_values": {
 "group_value": "Ireland",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=Ireland | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -27.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "Ireland",
 "student_count": 22,
 "pct_within_group": 52.4,
 "group_key_values": {
 "group_value": "Ireland",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=Ireland | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 20.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "Ireland",
 "student_count": 9,
 "pct_within_group": 21.4,
 "group_key_values": {
 "group_value": "Ireland",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=Ireland | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": -10.4757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "South Region",
 "series_count": 3,
 "total_count": 4,
 "weighted_average_metric": 37.5,
 "series": [
 {
 "group": "South Region",
 "student_count": 1,
 "pct_within_group": 25,
 "group_key_values": {
 "group_value": "South Region",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=South Region | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -6.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "South Region",
 "student_count": 1,
 "pct_within_group": 25,
 "group_key_values": {
 "group_value": "South Region",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=South Region | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -6.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "South Region",
 "student_count": 2,
 "pct_within_group": 50,
 "group_key_values": {
 "group_value": "South Region",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=South Region | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 18.1243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "Scotland",
 "series_count": 1,
 "total_count": 1,
 "weighted_average_metric": 100,
 "series": [
 {
 "group": "Scotland",
 "student_count": 1,
 "pct_within_group": 100,
 "group_key_values": {
 "group_value": "Scotland",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=Scotland | final_outcome=Fail",
 "series_value": "Fail",
 "gap": 68.1243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "West Midlands Region",
 "series_count": 1,
 "total_count": 1,
 "weighted_average_metric": 100,
 "series": [
 {
 "group": "West Midlands Region",
 "student_count": 1,
 "pct_within_group": 100,
 "group_key_values": {
 "group_value": "West Midlands Region",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=West Midlands Region | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 68.1243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 }
 ],
 "focus_summary": [
 {
 "group": "Scotland",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 100,
 "focus_count_total": 1,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "20-30%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 69.6,
 "focus_count_total": 181,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "10-20",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 68.8,
 "focus_count_total": 152,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "0-10%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 67.6,
 "focus_count_total": 142,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "40-50%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 61.4,
 "focus_count_total": 148,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "30-40%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 61.1,
 "focus_count_total": 159,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "70-80%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 58.4,
 "focus_count_total": 135,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "50-60%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 57.7,
 "focus_count_total": 139,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "60-70%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 56.5,
 "focus_count_total": 130,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "80-90%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 52.5,
 "focus_count_total": 129,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "90-100%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 52.4,
 "focus_count_total": 111,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "South Region",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 50,
 "focus_count_total": 2,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "North Region",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 43.9,
 "focus_count_total": 43,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "Ireland",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 26.2,
 "focus_count_total": 11,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "West Midlands Region",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 0,
 "focus_count_total": 0,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 }
 ],
 "gaps": [
 {
 "group": "West Midlands Region",
 "gap": 68.1243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 100,
 "student_count": 1
 },
 {
 "group": "Scotland",
 "gap": 68.1243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 100,
 "student_count": 1
 },
 {
 "group": "0-10%",
 "gap": 21.9243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 53.8,
 "student_count": 113
 },
 {
 "group": "20-30%",
 "gap": 21.2243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 53.1,
 "student_count": 138
 },
 {
 "group": "Ireland",
 "gap": 20.5243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 52.4,
 "student_count": 22
 },
 {
 "group": "South Region",
 "gap": 18.1243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 50,
 "student_count": 2
 },
 {
 "group": "10-20",
 "gap": 17.0243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 48.9,
 "student_count": 108
 },
 {
 "group": "40-50%",
 "gap": 15.4243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 47.3,
 "student_count": 114
 },
 {
 "group": "30-40%",
 "gap": 11.9243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 43.8,
 "student_count": 114
 },
 {
 "group": "50-60%",
 "gap": 10.0243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 41.9,
 "student_count": 101
 },
 {
 "group": "60-70%",
 "gap": 8.5243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 40.4,
 "student_count": 93
 },
 {
 "group": "70-80%",
 "gap": 7.9243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 39.8,
 "student_count": 92
 },
 {
 "group": "30-40%",
 "gap": -23.0757,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 8.8,
 "student_count": 23
 },
 {
 "group": "10-20",
 "gap": -23.7757,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 8.1,
 "student_count": 18
 },
 {
 "group": "0-10%",
 "gap": -24.2757,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 7.6,
 "student_count": 16
 },
 {
 "group": "Ireland",
 "gap": -27.0757,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 4.8,
 "student_count": 2
 }
 ],
 "dominant_group": {
 "group": "20-30%",
 "student_count": 138,
 "basis": "largest_count"
 },
 "weakest_group": {
 "group": "Ireland",
 "pct_within_group": 4.8,
 "basis": "most_negative_gap",
 "gap": -27.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 "missing_groups": [],
 "low_count_warnings": [
 {
 "group": "Ireland",
 "count": 9,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Ireland | final_outcome=Distinction' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "Ireland",
 "count": 2,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Ireland | final_outcome=Fail' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "Ireland",
 "count": 9,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Ireland | final_outcome=Withdrawn' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "Scotland",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Scotland | final_outcome=Fail' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "South Region",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=South Region | final_outcome=Distinction' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "South Region",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=South Region | final_outcome=Pass' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "South Region",
 "count": 2,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=South Region | final_outcome=Withdrawn' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "West Midlands Region",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=West Midlands Region | final_outcome=Pass' has student_count below 10.0; avoid over-weighting this comparison."
 }
 ],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from pct_within_group relative to weighted cohort mean.",
 "Group metrics capped at 40 of 53 groups.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "outcome_rate_evidence": {
 "cohort_fail_withdrawal_threshold_pct": 59.3675,
 "groups": [
 {
 "group_value": "0-10%",
 "fail_rate_pct": "13.8",
 "withdrawal_rate_pct": "53.8",
 "combined_rate_pct": 67.6
 },
 {
 "group_value": "10-20",
 "fail_rate_pct": "19.9",
 "withdrawal_rate_pct": "48.9",
 "combined_rate_pct": 68.8
 },
 {
 "group_value": "20-30%",
 "fail_rate_pct": "16.5",
 "withdrawal_rate_pct": "53.1",
 "combined_rate_pct": 69.6
 },
 {
 "group_value": "30-40%",
 "fail_rate_pct": "17.3",
 "withdrawal_rate_pct": "43.8",
 "combined_rate_pct": 61.1
 },
 {
 "group_value": "40-50%",
 "fail_rate_pct": "14.1",
 "withdrawal_rate_pct": "47.3",
 "combined_rate_pct": 61.4
 },
 {
 "group_value": "50-60%",
 "fail_rate_pct": "15.8",
 "withdrawal_rate_pct": "41.9",
 "combined_rate_pct": 57.7
 },
 {
 "group_value": "60-70%",
 "fail_rate_pct": "16.1",
 "withdrawal_rate_pct": "40.4",
 "combined_rate_pct": 56.5
 },
 {
 "group_value": "70-80%",
 "fail_rate_pct": "18.6",
 "withdrawal_rate_pct": "39.8",
 "combined_rate_pct": 58.4
 },
 {
 "group_value": "80-90%",
 "fail_rate_pct": "16.7",
 "withdrawal_rate_pct": "35.8",
 "combined_rate_pct": 52.5
 },
 {
 "group_value": "90-100%",
 "fail_rate_pct": "17",
 "withdrawal_rate_pct": "35.4",
 "combined_rate_pct": 52.4
 },
 {
 "group_value": "Ireland",
 "fail_rate_pct": "4.8",
 "withdrawal_rate_pct": "21.4",
 "combined_rate_pct": 26.2
 },
 {
 "group_value": "North Region",
 "fail_rate_pct": "13.3",
 "withdrawal_rate_pct": "30.6",
 "combined_rate_pct": 43.9
 },
 {
 "group_value": "Scotland",
 "fail_rate_pct": "100",
 "withdrawal_rate_pct": 0,
 "combined_rate_pct": 100
 },
 {
 "group_value": "South Region",
 "fail_rate_pct": 0,
 "withdrawal_rate_pct": "50",
 "combined_rate_pct": 50
 },
 {
 "group_value": "West Midlands Region",
 "fail_rate_pct": 0,
 "withdrawal_rate_pct": 0,
 "combined_rate_pct": 0
 }
 ],
 "policy": "categorical_descriptive_only_no_group_prescription"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 13316,
 "token_usage": {
 "prompt_tokens": 6638,
 "completion_tokens": 613,
 "total_tokens": 7251
 },
 "strategy": "comparison",
 "granularity": "cohort_aggregate",
 "cost_usd": 0.001363
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G12__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "296a79bb655dcd4b50bcbd209171cf2918aa6aaf8bc838a2b3ceab1c99d57e39",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 6638,
 "completion_tokens": 613,
 "total_tokens": 7251
 },
 "latency_ms": 13321,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-G12",
 "execution_id": "exec_1781847774827_593443bc",
 "explanation": {
 "summary": "cohort_fail_withdrawal_threshold_pct=59.3675; group=0-10%, fail_rate_pct=13.8, withdrawal_rate_pct=53.8, combined_rate_pct=67.6, above_cohort_threshold=True | group=10-20, fail_rate_pct=19.9, withdrawal_rate_pct=48.9, combined_rate_pct=68.8, above_cohort_threshold=True | group=20-30%, fail_rate_pct=16.5, withdrawal_rate_pct=53.1, combined_rate_pct=69.6, above_cohort_threshold=True | group=30-40%, fail_rate_pct=17.3, withdrawal_rate_pct=43.8, combined_rate_pct=61.1, above_cohort_threshold=True | group=40-50%, fail_rate_pct=14.1, withdrawal_rate_pct=47.3, combined_rate_pct=61.4, above_cohort_threshold=True | group=50-60%, fail_rate_pct=15.8, withdrawal_rate_pct=41.9, combined_rate_pct=57.7, above_cohort_threshold=False | group=60-70%, fail_rate_pct=16.1, withdrawal_rate_pct=40.4, combined_rate_pct=56.5, above_cohort_threshold=False | group=70-80%, fail_rate_pct=18.6, withdrawal_rate_pct=39.8, combined_rate_pct=58.4, above_cohort_threshold=False | group=80-90%, fail_rate_pct=16.7, withdrawal_rate_pct=35.8, combined_rate_pct=52.5, above_cohort_threshold=False | group=90-100%, fail_rate_pct=17.0, withdrawal_rate_pct=35.4, combined_rate_pct=52.4, above_cohort_threshold=False | group=Ireland, fail_rate_pct=4.8, withdrawal_rate_pct=21.4, combined_rate_pct=26.2, above_cohort_threshold=False | group=North Region, fail_rate_pct=13.3, withdrawal_rate_pct=30.6, combined_rate_pct=43.9, above_cohort_threshold=False | group=Scotland, fail_rate_pct=100.0, withdrawal_rate_pct=0, combined_rate_pct=100.0, above_cohort_threshold=True | group=South Region, fail_rate_pct=0, withdrawal_rate_pct=50.0, combined_rate_pct=50.0, above_cohort_threshold=False | group=West Midlands Region, fail_rate_pct=0, withdrawal_rate_pct=0, combined_rate_pct=0, above_cohort_threshold=False.",
 "insights": [],
 "educational_implications": [
 "Categorical outcome rates are descriptive; group membership does not establish causes or justify demographic targeting."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "Data quality is robust with sufficient sample sizes for the analyzed groups.",
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
 "full_result_row_count": 53,
 "included_row_count": 15,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "outcome_by_group",
 "row_count": 53,
 "included_row_count": 15
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 15,
 "baseline_reference_tokens": 644,
 "task_aware_prompt_tokens": 5359,
 "token_ratio": 8.3214,
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
 "task_output_contract": [
 "For every returned demographic group, state exact fail, withdrawal, and combined percentages and compare combined rate with the deterministic cohort fail+withdrawal threshold.",
 "Keep this categorical and descriptive; do not target interventions by demographic group or reverse group rankings."
 ],
 "must_keep_keys": [
 "group_metrics",
 "outcome_rate_evidence"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (8.3214 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "group_comparison",
 "task_id": "A-G12",
 "task_output_contract": [
 "For every returned demographic group, state exact fail, withdrawal, and combined percentages and compare combined rate with the deterministic cohort fail+withdrawal threshold.",
 "Keep this categorical and descriptive; do not target interventions by demographic group or reverse group rankings."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "outcome_by_group",
 "row_count": 53,
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
 "group": "Scotland",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 100,
 "focus_count_total": 1,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "20-30%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 69.6,
 "focus_count_total": 181,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "10-20",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 68.8,
 "focus_count_total": 152,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "0-10%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 67.6,
 "focus_count_total": 142,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "40-50%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 61.4,
 "focus_count_total": 148,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "30-40%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 61.1,
 "focus_count_total": 159,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "70-80%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 58.4,
 "focus_count_total": 135,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "50-60%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 57.7,
 "focus_count_total": 139,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "60-70%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 56.5,
 "focus_count_total": 130,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "80-90%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 52.5,
 "focus_count_total": 129,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "90-100%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 52.4,
 "focus_count_total": 111,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "South Region",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 50,
 "focus_count_total": 2,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "North Region",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 43.9,
 "focus_count_total": 43,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "Ireland",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 26.2,
 "focus_count_total": 11,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "West Midlands Region",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 0,
 "focus_count_total": 0,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 }
 ],
 "group_metrics": [
 {
 "group": "0-10%",
 "student_count": 16,
 "pct_within_group": 7.6,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -24.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 29,
 "pct_within_group": 13.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -18.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 52,
 "pct_within_group": 24.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -7.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 113,
 "pct_within_group": 53.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 21.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 18,
 "pct_within_group": 8.1,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -23.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 44,
 "pct_within_group": 19.9,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -11.9757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 51,
 "pct_within_group": 23.1,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -8.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 108,
 "pct_within_group": 48.9,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 17.0243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 26,
 "pct_within_group": 10,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -21.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 43,
 "pct_within_group": 16.5,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 53,
 "pct_within_group": 20.4,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -11.4757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 138,
 "pct_within_group": 53.1,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 21.2243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 23,
 "pct_within_group": 8.8,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -23.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 45,
 "pct_within_group": 17.3,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -14.5757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 78,
 "pct_within_group": 30,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -1.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 114,
 "pct_within_group": 43.8,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 11.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 23,
 "pct_within_group": 9.5,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -22.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 34,
 "pct_within_group": 14.1,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -17.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 70,
 "pct_within_group": 29,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -2.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 114,
 "pct_within_group": 47.3,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 15.4243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 26,
 "pct_within_group": 10.8,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -21.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 38,
 "pct_within_group": 15.8,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -16.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 76,
 "pct_within_group": 31.5,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -0.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 101,
 "pct_within_group": 41.9,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 10.0243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 29,
 "pct_within_group": 12.6,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -19.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 37,
 "pct_within_group": 16.1,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 71,
 "pct_within_group": 30.9,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -0.9757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 93,
 "pct_within_group": 40.4,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 8.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 34,
 "pct_within_group": 14.7,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -17.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 43,
 "pct_within_group": 18.6,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -13.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 62,
 "pct_within_group": 26.8,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -5.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 92,
 "pct_within_group": 39.8,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 7.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 37,
 "pct_within_group": 15,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -16.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 41,
 "pct_within_group": 16.7,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 80,
 "pct_within_group": 32.5,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 0.6243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 88,
 "pct_within_group": 35.8,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 3.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 36,
 "pct_within_group": 17,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -14.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 36,
 "pct_within_group": 17,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -14.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 65,
 "pct_within_group": 30.7,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -1.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 75,
 "pct_within_group": 35.4,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 3.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ],
 "outcome_rate_evidence": {
 "cohort_fail_withdrawal_threshold_pct": 59.3675,
 "groups": [
 {
 "group_value": "0-10%",
 "fail_rate_pct": "13.8",
 "withdrawal_rate_pct": "53.8",
 "combined_rate_pct": 67.6
 },
 {
 "group_value": "10-20",
 "fail_rate_pct": "19.9",
 "withdrawal_rate_pct": "48.9",
 "combined_rate_pct": 68.8
 },
 {
 "group_value": "20-30%",
 "fail_rate_pct": "16.5",
 "withdrawal_rate_pct": "53.1",
 "combined_rate_pct": 69.6
 },
 {
 "group_value": "30-40%",
 "fail_rate_pct": "17.3",
 "withdrawal_rate_pct": "43.8",
 "combined_rate_pct": 61.1
 },
 {
 "group_value": "40-50%",
 "fail_rate_pct": "14.1",
 "withdrawal_rate_pct": "47.3",
 "combined_rate_pct": 61.4
 },
 {
 "group_value": "50-60%",
 "fail_rate_pct": "15.8",
 "withdrawal_rate_pct": "41.9",
 "combined_rate_pct": 57.7
 },
 {
 "group_value": "60-70%",
 "fail_rate_pct": "16.1",
 "withdrawal_rate_pct": "40.4",
 "combined_rate_pct": 56.5
 },
 {
 "group_value": "70-80%",
 "fail_rate_pct": "18.6",
 "withdrawal_rate_pct": "39.8",
 "combined_rate_pct": 58.4
 },
 {
 "group_value": "80-90%",
 "fail_rate_pct": "16.7",
 "withdrawal_rate_pct": "35.8",
 "combined_rate_pct": 52.5
 },
 {
 "group_value": "90-100%",
 "fail_rate_pct": "17",
 "withdrawal_rate_pct": "35.4",
 "combined_rate_pct": 52.4
 },
 {
 "group_value": "Ireland",
 "fail_rate_pct": "4.8",
 "withdrawal_rate_pct": "21.4",
 "combined_rate_pct": 26.2
 },
 {
 "group_value": "North Region",
 "fail_rate_pct": "13.3",
 "withdrawal_rate_pct": "30.6",
 "combined_rate_pct": 43.9
 },
 {
 "group_value": "Scotland",
 "fail_rate_pct": "100",
 "withdrawal_rate_pct": 0,
 "combined_rate_pct": 100
 },
 {
 "group_value": "South Region",
 "fail_rate_pct": 0,
 "withdrawal_rate_pct": "50",
 "combined_rate_pct": 50
 },
 {
 "group_value": "West Midlands Region",
 "fail_rate_pct": 0,
 "withdrawal_rate_pct": 0,
 "combined_rate_pct": 0
 }
 ],
 "policy": "categorical_descriptive_only_no_group_prescription"
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_groups": [],
 "low_count_warnings": [
 {
 "group": "Ireland",
 "count": 9,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Ireland | final_outcome=Distinction' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "Ireland",
 "count": 2,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Ireland | final_outcome=Fail' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "Ireland",
 "count": 9,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Ireland | final_outcome=Withdrawn' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "Scotland",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Scotland | final_outcome=Fail' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "South Region",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=South Region | final_outcome=Distinction' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "South Region",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=South Region | final_outcome=Pass' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "South Region",
 "count": 2,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=South Region | final_outcome=Withdrawn' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "West Midlands Region",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=West Midlands Region | final_outcome=Pass' has student_count below 10.0; avoid over-weighting this comparison."
 }
 ],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from pct_within_group relative to weighted cohort mean.",
 "Group metrics capped at 40 of 53 groups.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "group_comparison",
 "dataset_name": "outcome_by_group",
 "row_count": 53,
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
 "group": "0-10%",
 "student_count": 16,
 "pct_within_group": 7.6,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -24.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 29,
 "pct_within_group": 13.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -18.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 52,
 "pct_within_group": 24.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -7.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 113,
 "pct_within_group": 53.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 21.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 18,
 "pct_within_group": 8.1,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -23.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 44,
 "pct_within_group": 19.9,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -11.9757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 51,
 "pct_within_group": 23.1,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -8.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 108,
 "pct_within_group": 48.9,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 17.0243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 26,
 "pct_within_group": 10,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -21.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 43,
 "pct_within_group": 16.5,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 53,
 "pct_within_group": 20.4,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -11.4757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 138,
 "pct_within_group": 53.1,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 21.2243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 23,
 "pct_within_group": 8.8,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -23.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 45,
 "pct_within_group": 17.3,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -14.5757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 78,
 "pct_within_group": 30,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -1.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 114,
 "pct_within_group": 43.8,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 11.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 23,
 "pct_within_group": 9.5,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -22.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 34,
 "pct_within_group": 14.1,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -17.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 70,
 "pct_within_group": 29,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -2.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 114,
 "pct_within_group": 47.3,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 15.4243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 26,
 "pct_within_group": 10.8,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -21.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 38,
 "pct_within_group": 15.8,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -16.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 76,
 "pct_within_group": 31.5,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -0.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 101,
 "pct_within_group": 41.9,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 10.0243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 29,
 "pct_within_group": 12.6,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -19.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 37,
 "pct_within_group": 16.1,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 71,
 "pct_within_group": 30.9,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -0.9757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 93,
 "pct_within_group": 40.4,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 8.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 34,
 "pct_within_group": 14.7,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -17.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 43,
 "pct_within_group": 18.6,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -13.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 62,
 "pct_within_group": 26.8,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -5.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 92,
 "pct_within_group": 39.8,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 7.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 37,
 "pct_within_group": 15,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -16.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 41,
 "pct_within_group": 16.7,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 80,
 "pct_within_group": 32.5,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 0.6243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 88,
 "pct_within_group": 35.8,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 3.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 36,
 "pct_within_group": 17,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -14.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 36,
 "pct_within_group": 17,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -14.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 65,
 "pct_within_group": 30.7,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -1.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 75,
 "pct_within_group": 35.4,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 3.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ],
 "group_series": [
 {
 "group": "20-30%",
 "series_count": 4,
 "total_count": 260,
 "weighted_average_metric": 36.0712,
 "series": [
 {
 "group": "20-30%",
 "student_count": 26,
 "pct_within_group": 10,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -21.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 43,
 "pct_within_group": 16.5,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 53,
 "pct_within_group": 20.4,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -11.4757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "20-30%",
 "student_count": 138,
 "pct_within_group": 53.1,
 "group_key_values": {
 "group_value": "20-30%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=20-30% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 21.2243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "30-40%",
 "series_count": 4,
 "total_count": 260,
 "weighted_average_metric": 31.9773,
 "series": [
 {
 "group": "30-40%",
 "student_count": 23,
 "pct_within_group": 8.8,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -23.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 45,
 "pct_within_group": 17.3,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -14.5757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 78,
 "pct_within_group": 30,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -1.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "30-40%",
 "student_count": 114,
 "pct_within_group": 43.8,
 "group_key_values": {
 "group_value": "30-40%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=30-40% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 11.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "80-90%",
 "series_count": 4,
 "total_count": 246,
 "weighted_average_metric": 28.415,
 "series": [
 {
 "group": "80-90%",
 "student_count": 37,
 "pct_within_group": 15,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -16.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 41,
 "pct_within_group": 16.7,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 80,
 "pct_within_group": 32.5,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 0.6243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "80-90%",
 "student_count": 88,
 "pct_within_group": 35.8,
 "group_key_values": {
 "group_value": "80-90%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=80-90% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 3.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "40-50%",
 "series_count": 4,
 "total_count": 241,
 "weighted_average_metric": 33.6934,
 "series": [
 {
 "group": "40-50%",
 "student_count": 23,
 "pct_within_group": 9.5,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -22.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 34,
 "pct_within_group": 14.1,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -17.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 70,
 "pct_within_group": 29,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -2.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "40-50%",
 "student_count": 114,
 "pct_within_group": 47.3,
 "group_key_values": {
 "group_value": "40-50%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=40-50% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 15.4243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "50-60%",
 "series_count": 4,
 "total_count": 241,
 "weighted_average_metric": 31.1498,
 "series": [
 {
 "group": "50-60%",
 "student_count": 26,
 "pct_within_group": 10.8,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -21.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 38,
 "pct_within_group": 15.8,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -16.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 76,
 "pct_within_group": 31.5,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -0.3757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "50-60%",
 "student_count": 101,
 "pct_within_group": 41.9,
 "group_key_values": {
 "group_value": "50-60%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=50-60% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 10.0243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "70-80%",
 "series_count": 4,
 "total_count": 231,
 "weighted_average_metric": 28.6701,
 "series": [
 {
 "group": "70-80%",
 "student_count": 34,
 "pct_within_group": 14.7,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -17.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 43,
 "pct_within_group": 18.6,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -13.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 62,
 "pct_within_group": 26.8,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -5.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "70-80%",
 "student_count": 92,
 "pct_within_group": 39.8,
 "group_key_values": {
 "group_value": "70-80%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=70-80% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 7.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "60-70%",
 "series_count": 4,
 "total_count": 230,
 "weighted_average_metric": 30.053,
 "series": [
 {
 "group": "60-70%",
 "student_count": 29,
 "pct_within_group": 12.6,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -19.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 37,
 "pct_within_group": 16.1,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -15.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 71,
 "pct_within_group": 30.9,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -0.9757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "60-70%",
 "student_count": 93,
 "pct_within_group": 40.4,
 "group_key_values": {
 "group_value": "60-70%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=60-70% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 8.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "10-20",
 "series_count": 4,
 "total_count": 221,
 "weighted_average_metric": 33.8493,
 "series": [
 {
 "group": "10-20",
 "student_count": 18,
 "pct_within_group": 8.1,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -23.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 44,
 "pct_within_group": 19.9,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -11.9757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 51,
 "pct_within_group": 23.1,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -8.7757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "10-20",
 "student_count": 108,
 "pct_within_group": 48.9,
 "group_key_values": {
 "group_value": "10-20",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=10-20 | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 17.0243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "90-100%",
 "series_count": 4,
 "total_count": 212,
 "weighted_average_metric": 27.7099,
 "series": [
 {
 "group": "90-100%",
 "student_count": 36,
 "pct_within_group": 17,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -14.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 36,
 "pct_within_group": 17,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -14.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 65,
 "pct_within_group": 30.7,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -1.1757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "90-100%",
 "student_count": 75,
 "pct_within_group": 35.4,
 "group_key_values": {
 "group_value": "90-100%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=90-100% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 3.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "0-10%",
 "series_count": 4,
 "total_count": 210,
 "weighted_average_metric": 37.5752,
 "series": [
 {
 "group": "0-10%",
 "student_count": 16,
 "pct_within_group": 7.6,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -24.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 29,
 "pct_within_group": 13.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -18.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 52,
 "pct_within_group": 24.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -7.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "0-10%",
 "student_count": 113,
 "pct_within_group": 53.8,
 "group_key_values": {
 "group_value": "0-10%",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=0-10% | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 21.9243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "North Region",
 "series_count": 4,
 "total_count": 98,
 "weighted_average_metric": 26.9071,
 "series": [
 {
 "group": "North Region",
 "student_count": 28,
 "pct_within_group": 28.6,
 "group_key_values": {
 "group_value": "North Region",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=North Region | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -3.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "North Region",
 "student_count": 13,
 "pct_within_group": 13.3,
 "group_key_values": {
 "group_value": "North Region",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=North Region | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -18.5757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "North Region",
 "student_count": 27,
 "pct_within_group": 27.6,
 "group_key_values": {
 "group_value": "North Region",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=North Region | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -4.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "North Region",
 "student_count": 30,
 "pct_within_group": 30.6,
 "group_key_values": {
 "group_value": "North Region",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=North Region | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": -1.2757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "Ireland",
 "series_count": 4,
 "total_count": 42,
 "weighted_average_metric": 36.8476,
 "series": [
 {
 "group": "Ireland",
 "student_count": 9,
 "pct_within_group": 21.4,
 "group_key_values": {
 "group_value": "Ireland",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=Ireland | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -10.4757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "Ireland",
 "student_count": 2,
 "pct_within_group": 4.8,
 "group_key_values": {
 "group_value": "Ireland",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=Ireland | final_outcome=Fail",
 "series_value": "Fail",
 "gap": -27.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "Ireland",
 "student_count": 22,
 "pct_within_group": 52.4,
 "group_key_values": {
 "group_value": "Ireland",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=Ireland | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 20.5243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "Ireland",
 "student_count": 9,
 "pct_within_group": 21.4,
 "group_key_values": {
 "group_value": "Ireland",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=Ireland | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": -10.4757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "South Region",
 "series_count": 3,
 "total_count": 4,
 "weighted_average_metric": 37.5,
 "series": [
 {
 "group": "South Region",
 "student_count": 1,
 "pct_within_group": 25,
 "group_key_values": {
 "group_value": "South Region",
 "final_outcome": "Distinction"
 },
 "composite_group_label": "group_value=South Region | final_outcome=Distinction",
 "series_value": "Distinction",
 "gap": -6.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "South Region",
 "student_count": 1,
 "pct_within_group": 25,
 "group_key_values": {
 "group_value": "South Region",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=South Region | final_outcome=Pass",
 "series_value": "Pass",
 "gap": -6.8757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 {
 "group": "South Region",
 "student_count": 2,
 "pct_within_group": 50,
 "group_key_values": {
 "group_value": "South Region",
 "final_outcome": "Withdrawn"
 },
 "composite_group_label": "group_value=South Region | final_outcome=Withdrawn",
 "series_value": "Withdrawn",
 "gap": 18.1243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "Scotland",
 "series_count": 1,
 "total_count": 1,
 "weighted_average_metric": 100,
 "series": [
 {
 "group": "Scotland",
 "student_count": 1,
 "pct_within_group": 100,
 "group_key_values": {
 "group_value": "Scotland",
 "final_outcome": "Fail"
 },
 "composite_group_label": "group_value=Scotland | final_outcome=Fail",
 "series_value": "Fail",
 "gap": 68.1243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 },
 {
 "group": "West Midlands Region",
 "series_count": 1,
 "total_count": 1,
 "weighted_average_metric": 100,
 "series": [
 {
 "group": "West Midlands Region",
 "student_count": 1,
 "pct_within_group": 100,
 "group_key_values": {
 "group_value": "West Midlands Region",
 "final_outcome": "Pass"
 },
 "composite_group_label": "group_value=West Midlands Region | final_outcome=Pass",
 "series_value": "Pass",
 "gap": 68.1243,
 "gap_basis": "derived_from_weighted_cohort_mean"
 }
 ]
 }
 ],
 "focus_summary": [
 {
 "group": "Scotland",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 100,
 "focus_count_total": 1,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "20-30%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 69.6,
 "focus_count_total": 181,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "10-20",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 68.8,
 "focus_count_total": 152,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "0-10%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 67.6,
 "focus_count_total": 142,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "40-50%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 61.4,
 "focus_count_total": 148,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "30-40%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 61.1,
 "focus_count_total": 159,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "70-80%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 58.4,
 "focus_count_total": 135,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "50-60%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 57.7,
 "focus_count_total": 139,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "60-70%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 56.5,
 "focus_count_total": 130,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "80-90%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 52.5,
 "focus_count_total": 129,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "90-100%",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 52.4,
 "focus_count_total": 111,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "South Region",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 50,
 "focus_count_total": 2,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "North Region",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 43.9,
 "focus_count_total": 43,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "Ireland",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 26.2,
 "focus_count_total": 11,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 },
 {
 "group": "West Midlands Region",
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_metric_total": 0,
 "focus_count_total": 0,
 "metric_column": "pct_within_group",
 "count_column": "student_count"
 }
 ],
 "gaps": [
 {
 "group": "West Midlands Region",
 "gap": 68.1243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 100,
 "student_count": 1
 },
 {
 "group": "Scotland",
 "gap": 68.1243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 100,
 "student_count": 1
 },
 {
 "group": "0-10%",
 "gap": 21.9243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 53.8,
 "student_count": 113
 },
 {
 "group": "20-30%",
 "gap": 21.2243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 53.1,
 "student_count": 138
 },
 {
 "group": "Ireland",
 "gap": 20.5243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 52.4,
 "student_count": 22
 },
 {
 "group": "South Region",
 "gap": 18.1243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 50,
 "student_count": 2
 },
 {
 "group": "10-20",
 "gap": 17.0243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 48.9,
 "student_count": 108
 },
 {
 "group": "40-50%",
 "gap": 15.4243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 47.3,
 "student_count": 114
 },
 {
 "group": "30-40%",
 "gap": 11.9243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 43.8,
 "student_count": 114
 },
 {
 "group": "50-60%",
 "gap": 10.0243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 41.9,
 "student_count": 101
 },
 {
 "group": "60-70%",
 "gap": 8.5243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 40.4,
 "student_count": 93
 },
 {
 "group": "70-80%",
 "gap": 7.9243,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 39.8,
 "student_count": 92
 },
 {
 "group": "30-40%",
 "gap": -23.0757,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 8.8,
 "student_count": 23
 },
 {
 "group": "10-20",
 "gap": -23.7757,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 8.1,
 "student_count": 18
 },
 {
 "group": "0-10%",
 "gap": -24.2757,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 7.6,
 "student_count": 16
 },
 {
 "group": "Ireland",
 "gap": -27.0757,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "pct_within_group": 4.8,
 "student_count": 2
 }
 ],
 "dominant_group": {
 "group": "20-30%",
 "student_count": 138,
 "basis": "largest_count"
 },
 "weakest_group": {
 "group": "Ireland",
 "pct_within_group": 4.8,
 "basis": "most_negative_gap",
 "gap": -27.0757,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 "missing_groups": [],
 "low_count_warnings": [
 {
 "group": "Ireland",
 "count": 9,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Ireland | final_outcome=Distinction' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "Ireland",
 "count": 2,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Ireland | final_outcome=Fail' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "Ireland",
 "count": 9,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Ireland | final_outcome=Withdrawn' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "Scotland",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=Scotland | final_outcome=Fail' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "South Region",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=South Region | final_outcome=Distinction' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "South Region",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=South Region | final_outcome=Pass' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "South Region",
 "count": 2,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=South Region | final_outcome=Withdrawn' has student_count below 10.0; avoid over-weighting this comparison."
 },
 {
 "group": "West Midlands Region",
 "count": 1,
 "minimum_reliable_count": 10,
 "warning": "Group 'group_value=West Midlands Region | final_outcome=Pass' has student_count below 10.0; avoid over-weighting this comparison."
 }
 ],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from pct_within_group relative to weighted cohort mean.",
 "Group metrics capped at 40 of 53 groups.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "outcome_rate_evidence": {
 "cohort_fail_withdrawal_threshold_pct": 59.3675,
 "groups": [
 {
 "group_value": "0-10%",
 "fail_rate_pct": "13.8",
 "withdrawal_rate_pct": "53.8",
 "combined_rate_pct": 67.6
 },
 {
 "group_value": "10-20",
 "fail_rate_pct": "19.9",
 "withdrawal_rate_pct": "48.9",
 "combined_rate_pct": 68.8
 },
 {
 "group_value": "20-30%",
 "fail_rate_pct": "16.5",
 "withdrawal_rate_pct": "53.1",
 "combined_rate_pct": 69.6
 },
 {
 "group_value": "30-40%",
 "fail_rate_pct": "17.3",
 "withdrawal_rate_pct": "43.8",
 "combined_rate_pct": 61.1
 },
 {
 "group_value": "40-50%",
 "fail_rate_pct": "14.1",
 "withdrawal_rate_pct": "47.3",
 "combined_rate_pct": 61.4
 },
 {
 "group_value": "50-60%",
 "fail_rate_pct": "15.8",
 "withdrawal_rate_pct": "41.9",
 "combined_rate_pct": 57.7
 },
 {
 "group_value": "60-70%",
 "fail_rate_pct": "16.1",
 "withdrawal_rate_pct": "40.4",
 "combined_rate_pct": 56.5
 },
 {
 "group_value": "70-80%",
 "fail_rate_pct": "18.6",
 "withdrawal_rate_pct": "39.8",
 "combined_rate_pct": 58.4
 },
 {
 "group_value": "80-90%",
 "fail_rate_pct": "16.7",
 "withdrawal_rate_pct": "35.8",
 "combined_rate_pct": 52.5
 },
 {
 "group_value": "90-100%",
 "fail_rate_pct": "17",
 "withdrawal_rate_pct": "35.4",
 "combined_rate_pct": 52.4
 },
 {
 "group_value": "Ireland",
 "fail_rate_pct": "4.8",
 "withdrawal_rate_pct": "21.4",
 "combined_rate_pct": 26.2
 },
 {
 "group_value": "North Region",
 "fail_rate_pct": "13.3",
 "withdrawal_rate_pct": "30.6",
 "combined_rate_pct": 43.9
 },
 {
 "group_value": "Scotland",
 "fail_rate_pct": "100",
 "withdrawal_rate_pct": 0,
 "combined_rate_pct": 100
 },
 {
 "group_value": "South Region",
 "fail_rate_pct": 0,
 "withdrawal_rate_pct": "50",
 "combined_rate_pct": 50
 },
 {
 "group_value": "West Midlands Region",
 "fail_rate_pct": 0,
 "withdrawal_rate_pct": 0,
 "combined_rate_pct": 0
 }
 ],
 "policy": "categorical_descriptive_only_no_group_prescription"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 13316,
 "token_usage": {
 "prompt_tokens": 6638,
 "completion_tokens": 613,
 "total_tokens": 7251
 },
 "strategy": "comparison",
 "granularity": "cohort_aggregate",
 "cost_usd": 0.001363
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
 "expected": 53,
 "observed": 53
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e",
 "expected_values": [
 "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "a5465584ca6ef16751adfb3b01e110713b6d40278cc8ff3ef83d87c1644e19f2",
 "expected": "a5465584ca6ef16751adfb3b01e110713b6d40278cc8ff3ef83d87c1644e19f2"
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
 "count": 53,
 "min": 1,
 "max": 138
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
