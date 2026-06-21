# LLM Judge Final Judge Context - SAMPLE_OULAD__A-B04__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-B04__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-B04",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "At-risk overview",
 "scope": "Cohort",
 "actionable_question": "How many students need urgent intervention?",
 "target_audience": "instructor, admin",
 "ai_summary_type": "categorical_distribution",
 "ai_prompt_hint": "State number of high/medium/low risk students. Recommend immediate review of high group.",
 "query_labels": [
 "risk_overview"
 ],
 "explanation_strategy": "risk"
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
 "at_risk_label [FE]",
 "at_risk_score [FE]; enrollment_id and avg_score from enrollment + score_agg JOIN (not from risk_flags directly)"
 ],
 "output_schema": {},
 "query_labels": [
 "risk_overview"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-B04-CORE-01",
 "description": "State number of high/medium/low risk students."
 },
 {
 "requirement_id": "A-B04-CORE-02",
 "description": "Recommend immediate review of high group."
 }
 ],
 "required_supporting_outputs": [],
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
 "dataset_label": "risk_overview",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-B04.json",
 "artifact_sha256": "a3fcf2cc3bbb1ab6b63b48c93418cc4e12737bdcd2e1a60a02737a2a437aef77",
 "row_count": 3,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 3,
 "prompt_embedded_row_count": 3,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "a3fcf2cc3bbb1ab6b63b48c93418cc4e12737bdcd2e1a60a02737a2a437aef77",
 "evidence_rows_sha256": "eeda578432ddcc62a80582db0040639e86dc50b01e2877f02dbd670e35fec434",
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
 "full_result_row_count": 3,
 "embedded_datasets_sha256": "eeda578432ddcc62a80582db0040639e86dc50b01e2877f02dbd670e35fec434",
 "datasets": {
 "risk_overview": [
 {
 "at_risk_label": "high",
 "student_count": 915
 },
 {
 "at_risk_label": "medium",
 "student_count": 927
 },
 {
 "at_risk_label": "low",
 "student_count": 156
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-B04__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "7cf9f7657d7e735cffe09448bfb39e3f89a2c8b34acb3c5f876855bf2c12b40a",
 "generator_input_sha256": "cecda83bdae1cc7c9e95825c88698a9e9bcfda381b131c9cca5bf7ba2b057c6e",
 "generator_input_compact": {
 "task_id": "A-B04",
 "execution_id": "exec_1781847633767_8b68b090",
 "task_name": "At-risk overview",
 "analysis_type": "aggregation",
 "explanation_strategy": "risk",
 "actionable_question": "How many students need urgent intervention?",
 "target_audience": [
 "instructor",
 "admin"
 ],
 "query_labels": [
 "risk_overview"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "risk_overview"
 ],
 "dataset_row_counts": {
 "risk_overview": 3
 },
 "ai_summary_config_summary": {
 "summary_type": "categorical_distribution",
 "metric_column": null,
 "entity_column": null,
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
 "raw_text": "Summary: A significant number of students are identified as at risk, with 915 categorized as high risk and 927 as medium risk. This indicates a pressing need for targeted interventions, particularly for the high-risk group.\n\nInsights: High Risk Student Count: The high-risk category contains 915 students, representing a substantial portion of the overall student population. This group requires immediate attention to prevent further academic decline. | Medium Risk Student Count: With 927 students classified as medium risk, this group also warrants consideration for early interventions to mitigate potential escalation to high risk.\n\nEducational implications: The high number of at-risk students suggests systemic issues that may require curriculum adjustments or additional support resources.\n\nRecommendations: high - Conduct an immediate review of the high-risk group to identify specific needs and tailor interventions. - Addressing the needs of high-risk students promptly can help prevent further academic challenges and improve overall student outcomes.",
 "structured_payload": {
 "task_id": "A-B04",
 "execution_id": "exec_1781847633767_8b68b090",
 "explanation": {
 "summary": "A significant number of students are identified as at risk, with 915 categorized as high risk and 927 as medium risk. This indicates a pressing need for targeted interventions, particularly for the high-risk group.",
 "insights": [
 {
 "title": "High Risk Student Count",
 "description": "The high-risk category contains 915 students, representing a substantial portion of the overall student population. This group requires immediate attention to prevent further academic decline.",
 "severity": "high",
 "evidence": [
 {
 "metric": "student_count",
 "value": 915,
 "comparison": "baseline",
 "delta": null,
 "context": "High risk students identified in the dataset"
 }
 ]
 },
 {
 "title": "Medium Risk Student Count",
 "description": "With 927 students classified as medium risk, this group also warrants consideration for early interventions to mitigate potential escalation to high risk.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "student_count",
 "value": 927,
 "comparison": "baseline",
 "delta": null,
 "context": "Medium risk students identified in the dataset"
 }
 ]
 }
 ],
 "educational_implications": [
 "The high number of at-risk students suggests systemic issues that may require curriculum adjustments or additional support resources."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Conduct an immediate review of the high-risk group to identify specific needs and tailor interventions.",
 "rationale": "Addressing the needs of high-risk students promptly can help prevent further academic challenges and improve overall student outcomes."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is derived from a complete dataset with clear categorizations of student risk levels.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "risk",
 "explanation_type": "risk",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "categorical_distribution",
 "ai_summary_method_warning": null,
 "full_result_row_count": 3,
 "included_row_count": 3,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "risk_overview",
 "row_count": 3,
 "included_row_count": 3
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 3,
 "baseline_reference_tokens": 56,
 "task_aware_prompt_tokens": 389,
 "token_ratio": 6.9464,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.9464 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "categorical_distribution",
 "task_id": "A-B04",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "risk_overview",
 "row_count": 3,
 "category_column": "at_risk_label",
 "count_column": "student_count",
 "percent_column": null,
 "metric_columns": [],
 "total_count": 1998,
 "focus_categories": [
 "high",
 "medium"
 ]
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "category_distribution": [
 {
 "category": "high",
 "count": 915,
 "percent": null
 },
 {
 "category": "medium",
 "count": 927,
 "percent": null
 },
 {
 "category": "low",
 "count": 156,
 "percent": null
 }
 ],
 "focus_total": {
 "categories": [
 "high",
 "medium"
 ],
 "present_categories": [
 "high",
 "medium"
 ],
 "missing_categories": [],
 "count": 1842,
 "percent": null
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_evidence_by_category": {}
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "largest_category": {
 "category": "medium",
 "count": 927,
 "percent": null
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_expected_categories": [],
 "missing_focus_categories": [],
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "categorical_distribution",
 "dataset_name": "risk_overview",
 "row_count": 3,
 "category_column": "at_risk_label",
 "count_column": "student_count",
 "percent_column": null,
 "total_count": 1998,
 "category_distribution": [
 {
 "category": "high",
 "count": 915,
 "percent": null
 },
 {
 "category": "medium",
 "count": 927,
 "percent": null
 },
 {
 "category": "low",
 "count": 156,
 "percent": null
 }
 ],
 "largest_category": {
 "category": "medium",
 "count": 927,
 "percent": null
 },
 "focus_categories": [
 "high",
 "medium"
 ],
 "focus_total": {
 "categories": [
 "high",
 "medium"
 ],
 "present_categories": [
 "high",
 "medium"
 ],
 "missing_categories": [],
 "count": 1842,
 "percent": null
 },
 "missing_expected_categories": [],
 "missing_focus_categories": [],
 "metric_columns": [],
 "metric_evidence_by_category": {},
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5757,
 "token_usage": {
 "prompt_tokens": 889,
 "completion_tokens": 419,
 "total_tokens": 1308
 },
 "strategy": "risk",
 "granularity": "semester",
 "cost_usd": 0.000385
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-B04__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "7cf9f7657d7e735cffe09448bfb39e3f89a2c8b34acb3c5f876855bf2c12b40a",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 889,
 "completion_tokens": 419,
 "total_tokens": 1308
 },
 "latency_ms": 5763,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-B04",
 "execution_id": "exec_1781847633767_8b68b090",
 "explanation": {
 "summary": "A significant number of students are identified as at risk, with 915 categorized as high risk and 927 as medium risk. This indicates a pressing need for targeted interventions, particularly for the high-risk group.",
 "insights": [
 {
 "title": "High Risk Student Count",
 "description": "The high-risk category contains 915 students, representing a substantial portion of the overall student population. This group requires immediate attention to prevent further academic decline.",
 "severity": "high",
 "evidence": [
 {
 "metric": "student_count",
 "value": 915,
 "comparison": "baseline",
 "delta": null,
 "context": "High risk students identified in the dataset"
 }
 ]
 },
 {
 "title": "Medium Risk Student Count",
 "description": "With 927 students classified as medium risk, this group also warrants consideration for early interventions to mitigate potential escalation to high risk.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "student_count",
 "value": 927,
 "comparison": "baseline",
 "delta": null,
 "context": "Medium risk students identified in the dataset"
 }
 ]
 }
 ],
 "educational_implications": [
 "The high number of at-risk students suggests systemic issues that may require curriculum adjustments or additional support resources."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Conduct an immediate review of the high-risk group to identify specific needs and tailor interventions.",
 "rationale": "Addressing the needs of high-risk students promptly can help prevent further academic challenges and improve overall student outcomes."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is derived from a complete dataset with clear categorizations of student risk levels.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "risk",
 "explanation_type": "risk",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "categorical_distribution",
 "ai_summary_method_warning": null,
 "full_result_row_count": 3,
 "included_row_count": 3,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "risk_overview",
 "row_count": 3,
 "included_row_count": 3
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 3,
 "baseline_reference_tokens": 56,
 "task_aware_prompt_tokens": 389,
 "token_ratio": 6.9464,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.9464 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "categorical_distribution",
 "task_id": "A-B04",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "risk_overview",
 "row_count": 3,
 "category_column": "at_risk_label",
 "count_column": "student_count",
 "percent_column": null,
 "metric_columns": [],
 "total_count": 1998,
 "focus_categories": [
 "high",
 "medium"
 ]
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "category_distribution": [
 {
 "category": "high",
 "count": 915,
 "percent": null
 },
 {
 "category": "medium",
 "count": 927,
 "percent": null
 },
 {
 "category": "low",
 "count": 156,
 "percent": null
 }
 ],
 "focus_total": {
 "categories": [
 "high",
 "medium"
 ],
 "present_categories": [
 "high",
 "medium"
 ],
 "missing_categories": [],
 "count": 1842,
 "percent": null
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_evidence_by_category": {}
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "largest_category": {
 "category": "medium",
 "count": 927,
 "percent": null
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_expected_categories": [],
 "missing_focus_categories": [],
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "categorical_distribution",
 "dataset_name": "risk_overview",
 "row_count": 3,
 "category_column": "at_risk_label",
 "count_column": "student_count",
 "percent_column": null,
 "total_count": 1998,
 "category_distribution": [
 {
 "category": "high",
 "count": 915,
 "percent": null
 },
 {
 "category": "medium",
 "count": 927,
 "percent": null
 },
 {
 "category": "low",
 "count": 156,
 "percent": null
 }
 ],
 "largest_category": {
 "category": "medium",
 "count": 927,
 "percent": null
 },
 "focus_categories": [
 "high",
 "medium"
 ],
 "focus_total": {
 "categories": [
 "high",
 "medium"
 ],
 "present_categories": [
 "high",
 "medium"
 ],
 "missing_categories": [],
 "count": 1842,
 "percent": null
 },
 "missing_expected_categories": [],
 "missing_focus_categories": [],
 "metric_columns": [],
 "metric_evidence_by_category": {},
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5757,
 "token_usage": {
 "prompt_tokens": 889,
 "completion_tokens": 419,
 "total_tokens": 1308
 },
 "strategy": "risk",
 "granularity": "semester",
 "cost_usd": 0.000385
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
 "expected": 3,
 "observed": 3
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "a3fcf2cc3bbb1ab6b63b48c93418cc4e12737bdcd2e1a60a02737a2a437aef77",
 "expected_values": [
 "a3fcf2cc3bbb1ab6b63b48c93418cc4e12737bdcd2e1a60a02737a2a437aef77"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "eeda578432ddcc62a80582db0040639e86dc50b01e2877f02dbd670e35fec434",
 "expected": "eeda578432ddcc62a80582db0040639e86dc50b01e2877f02dbd670e35fec434"
 },
 {
 "check_id": "numeric_fields_risk_overview",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "risk_overview",
 "numeric_columns": [
 "student_count"
 ],
 "numeric_summaries": {
 "student_count": {
 "count": 3,
 "min": 156,
 "max": 927
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_risk_overview",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "risk_overview",
 "flag_columns": [
 "at_risk_label"
 ],
 "triggered_like_counts": {
 "at_risk_label": 0
 }
 }
]
```
