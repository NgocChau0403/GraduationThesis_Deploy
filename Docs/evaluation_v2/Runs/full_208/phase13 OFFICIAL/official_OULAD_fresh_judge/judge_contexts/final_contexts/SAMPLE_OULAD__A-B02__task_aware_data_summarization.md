# LLM Judge Final Judge Context - SAMPLE_OULAD__A-B02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-B02__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-B02",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Completion / outcome summary",
 "scope": "Cohort",
 "actionable_question": "How many students passed, failed, or withdrew?",
 "target_audience": "instructor, admin",
 "ai_summary_type": "categorical_distribution",
 "ai_prompt_hint": "State pass/fail/withdrawal counts. Highlight proportion at-risk.",
 "query_labels": [
 "outcome_counts"
 ],
 "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
 "source_tables": [
 "enrollment"
 ],
 "key_db_fields": [
 "final_outcome",
 "class_id"
 ],
 "output_schema": {},
 "query_labels": [
 "outcome_counts"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-B02-CORE-01",
 "description": "State pass/fail/withdrawal counts."
 },
 {
 "requirement_id": "A-B02-CORE-02",
 "description": "Highlight proportion at-risk."
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
 "dataset_label": "outcome_counts",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-B02.json",
 "artifact_sha256": "16185befb0c971718a221fc280a3c728b331cee25aae70ba22548114a9f4a3e2",
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
 "evidence_artifact_file_sha256": "16185befb0c971718a221fc280a3c728b331cee25aae70ba22548114a9f4a3e2",
 "evidence_rows_sha256": "92a29598b51baea9d9132baa0c8ead82b2edfb7b55733e1a6c4bdfb3224435f7",
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
 "embedded_datasets_sha256": "92a29598b51baea9d9132baa0c8ead82b2edfb7b55733e1a6c4bdfb3224435f7",
 "datasets": {
 "outcome_counts": [
 {
 "final_outcome": "Withdrawn",
 "student_count": 1077,
 "pct_of_class": "43.1"
 },
 {
 "final_outcome": "Pass",
 "student_count": 709,
 "pct_of_class": "28.4"
 },
 {
 "final_outcome": "Fail",
 "student_count": 406,
 "pct_of_class": "16.3"
 },
 {
 "final_outcome": "Distinction",
 "student_count": 306,
 "pct_of_class": "12.2"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-B02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "f68a4bed6b4287243d186edfc49159f9d8e4cd93054a209e88dff5c84bda6ad1",
 "generator_input_sha256": "66dc6a1aa8a41ac9084a3f5bfbbe8dc4e6038c0d20296883d0501d16fa823c19",
 "generator_input_compact": {
 "task_id": "A-B02",
 "execution_id": "exec_1781847624955_4df8c593",
 "task_name": "Completion / outcome summary",
 "analysis_type": "aggregation",
 "explanation_strategy": "distribution",
 "actionable_question": "How many students passed, failed, or withdrew?",
 "target_audience": [
 "instructor",
 "admin"
 ],
 "query_labels": [
 "outcome_counts"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "outcome_counts"
 ],
 "dataset_row_counts": {
 "outcome_counts": 4
 },
 "ai_summary_config_summary": {
 "summary_type": "categorical_distribution",
 "metric_column": null,
 "entity_column": null,
 "group_column": null,
 "time_column": null,
 "sort_by": "student_count",
 "sort_direction": "desc",
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
 "raw_text": "Summary: Exact returned outcome counts: pass_count=709 (28.4%); fail_count=406 (16.3%); withdrawn_count=1077 (43.1%); distinction_count=306 (12.2%). Largest returned category=Withdrawn; no returned category exceeds 50%, so the largest category is not a majority. These are descriptive outcomes; the result does not establish causes.\n\nEducational implications: Use each returned outcome count and share exactly as supplied; do not infer disengagement, competency, or intervention effects.",
 "structured_payload": {
 "task_id": "A-B02",
 "execution_id": "exec_1781847624955_4df8c593",
 "explanation": {
 "summary": "Exact returned outcome counts: pass_count=709 (28.4%); fail_count=406 (16.3%); withdrawn_count=1077 (43.1%); distinction_count=306 (12.2%). Largest returned category=Withdrawn; no returned category exceeds 50%, so the largest category is not a majority. These are descriptive outcomes; the result does not establish causes.",
 "insights": [],
 "educational_implications": [
 "Use each returned outcome count and share exactly as supplied; do not infer disengagement, competency, or intervention effects."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is derived from a complete dataset of final outcomes, ensuring reliability in the analysis.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "categorical_distribution",
 "ai_summary_method_warning": null,
 "full_result_row_count": 4,
 "included_row_count": 4,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "outcome_counts",
 "row_count": 4,
 "included_row_count": 4
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 4,
 "baseline_reference_tokens": 103,
 "task_aware_prompt_tokens": 716,
 "token_ratio": 6.9515,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "Preserve every returned outcome category with exact student_count and pct_of_class; never replace a present category with zero.",
 "Use 'largest category' rather than 'majority' unless its returned percentage exceeds 50%. Do not infer causes of outcomes."
 ],
 "must_keep_keys": [
 "category_distribution",
 "outcome_distribution_evidence"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.9515 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "categorical_distribution",
 "task_id": "A-B02",
 "task_output_contract": [
 "Preserve every returned outcome category with exact student_count and pct_of_class; never replace a present category with zero.",
 "Use 'largest category' rather than 'majority' unless its returned percentage exceeds 50%. Do not infer causes of outcomes."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "outcome_counts",
 "row_count": 4,
 "category_column": "final_outcome",
 "count_column": "student_count",
 "percent_column": "pct_of_class",
 "metric_columns": [],
 "total_count": 2498,
 "percent_total": 100,
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ]
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "category_distribution": [
 {
 "category": "Withdrawn",
 "count": 1077,
 "percent": 43.1
 },
 {
 "category": "Pass",
 "count": 709,
 "percent": 28.4
 },
 {
 "category": "Fail",
 "count": 406,
 "percent": 16.3
 },
 {
 "category": "Distinction",
 "count": 306,
 "percent": 12.2
 }
 ],
 "focus_total": {
 "categories": [
 "Fail",
 "Withdrawn"
 ],
 "present_categories": [
 "Withdrawn",
 "Fail"
 ],
 "missing_categories": [],
 "count": 1483,
 "percent": 59.4
 },
 "outcome_distribution_evidence": {
 "categories": [
 {
 "final_outcome": "Withdrawn",
 "student_count": 1077,
 "pct_of_class": "43.1"
 },
 {
 "final_outcome": "Pass",
 "student_count": 709,
 "pct_of_class": "28.4"
 },
 {
 "final_outcome": "Fail",
 "student_count": 406,
 "pct_of_class": "16.3"
 },
 {
 "final_outcome": "Distinction",
 "student_count": 306,
 "pct_of_class": "12.2"
 }
 ],
 "largest_category": {
 "final_outcome": "Withdrawn",
 "student_count": 1077,
 "pct_of_class": "43.1"
 },
 "majority_status": "no_category_exceeds_50_percent",
 "causal_claim_allowed": false
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
 "category": "Withdrawn",
 "count": 1077,
 "percent": 43.1
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
 "dataset_name": "outcome_counts",
 "row_count": 4,
 "category_column": "final_outcome",
 "count_column": "student_count",
 "percent_column": "pct_of_class",
 "total_count": 2498,
 "category_distribution": [
 {
 "category": "Withdrawn",
 "count": 1077,
 "percent": 43.1
 },
 {
 "category": "Pass",
 "count": 709,
 "percent": 28.4
 },
 {
 "category": "Fail",
 "count": 406,
 "percent": 16.3
 },
 {
 "category": "Distinction",
 "count": 306,
 "percent": 12.2
 }
 ],
 "largest_category": {
 "category": "Withdrawn",
 "count": 1077,
 "percent": 43.1
 },
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_total": {
 "categories": [
 "Fail",
 "Withdrawn"
 ],
 "present_categories": [
 "Withdrawn",
 "Fail"
 ],
 "missing_categories": [],
 "count": 1483,
 "percent": 59.4
 },
 "missing_expected_categories": [],
 "missing_focus_categories": [],
 "metric_columns": [],
 "metric_evidence_by_category": {},
 "summarization_warnings": [],
 "percent_total": 100,
 "outcome_distribution_evidence": {
 "categories": [
 {
 "final_outcome": "Withdrawn",
 "student_count": 1077,
 "pct_of_class": "43.1"
 },
 {
 "final_outcome": "Pass",
 "student_count": 709,
 "pct_of_class": "28.4"
 },
 {
 "final_outcome": "Fail",
 "student_count": 406,
 "pct_of_class": "16.3"
 },
 {
 "final_outcome": "Distinction",
 "student_count": 306,
 "pct_of_class": "12.2"
 }
 ],
 "largest_category": {
 "final_outcome": "Withdrawn",
 "student_count": 1077,
 "pct_of_class": "43.1"
 },
 "majority_status": "no_category_exceeds_50_percent",
 "causal_claim_allowed": false
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 7491,
 "token_usage": {
 "prompt_tokens": 1211,
 "completion_tokens": 432,
 "total_tokens": 1643
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000441
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-B02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "f68a4bed6b4287243d186edfc49159f9d8e4cd93054a209e88dff5c84bda6ad1",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1211,
 "completion_tokens": 432,
 "total_tokens": 1643
 },
 "latency_ms": 7502,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-B02",
 "execution_id": "exec_1781847624955_4df8c593",
 "explanation": {
 "summary": "Exact returned outcome counts: pass_count=709 (28.4%); fail_count=406 (16.3%); withdrawn_count=1077 (43.1%); distinction_count=306 (12.2%). Largest returned category=Withdrawn; no returned category exceeds 50%, so the largest category is not a majority. These are descriptive outcomes; the result does not establish causes.",
 "insights": [],
 "educational_implications": [
 "Use each returned outcome count and share exactly as supplied; do not infer disengagement, competency, or intervention effects."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is derived from a complete dataset of final outcomes, ensuring reliability in the analysis.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "categorical_distribution",
 "ai_summary_method_warning": null,
 "full_result_row_count": 4,
 "included_row_count": 4,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "outcome_counts",
 "row_count": 4,
 "included_row_count": 4
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 4,
 "baseline_reference_tokens": 103,
 "task_aware_prompt_tokens": 716,
 "token_ratio": 6.9515,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "Preserve every returned outcome category with exact student_count and pct_of_class; never replace a present category with zero.",
 "Use 'largest category' rather than 'majority' unless its returned percentage exceeds 50%. Do not infer causes of outcomes."
 ],
 "must_keep_keys": [
 "category_distribution",
 "outcome_distribution_evidence"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.9515 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "categorical_distribution",
 "task_id": "A-B02",
 "task_output_contract": [
 "Preserve every returned outcome category with exact student_count and pct_of_class; never replace a present category with zero.",
 "Use 'largest category' rather than 'majority' unless its returned percentage exceeds 50%. Do not infer causes of outcomes."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "outcome_counts",
 "row_count": 4,
 "category_column": "final_outcome",
 "count_column": "student_count",
 "percent_column": "pct_of_class",
 "metric_columns": [],
 "total_count": 2498,
 "percent_total": 100,
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ]
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "category_distribution": [
 {
 "category": "Withdrawn",
 "count": 1077,
 "percent": 43.1
 },
 {
 "category": "Pass",
 "count": 709,
 "percent": 28.4
 },
 {
 "category": "Fail",
 "count": 406,
 "percent": 16.3
 },
 {
 "category": "Distinction",
 "count": 306,
 "percent": 12.2
 }
 ],
 "focus_total": {
 "categories": [
 "Fail",
 "Withdrawn"
 ],
 "present_categories": [
 "Withdrawn",
 "Fail"
 ],
 "missing_categories": [],
 "count": 1483,
 "percent": 59.4
 },
 "outcome_distribution_evidence": {
 "categories": [
 {
 "final_outcome": "Withdrawn",
 "student_count": 1077,
 "pct_of_class": "43.1"
 },
 {
 "final_outcome": "Pass",
 "student_count": 709,
 "pct_of_class": "28.4"
 },
 {
 "final_outcome": "Fail",
 "student_count": 406,
 "pct_of_class": "16.3"
 },
 {
 "final_outcome": "Distinction",
 "student_count": 306,
 "pct_of_class": "12.2"
 }
 ],
 "largest_category": {
 "final_outcome": "Withdrawn",
 "student_count": 1077,
 "pct_of_class": "43.1"
 },
 "majority_status": "no_category_exceeds_50_percent",
 "causal_claim_allowed": false
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
 "category": "Withdrawn",
 "count": 1077,
 "percent": 43.1
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
 "dataset_name": "outcome_counts",
 "row_count": 4,
 "category_column": "final_outcome",
 "count_column": "student_count",
 "percent_column": "pct_of_class",
 "total_count": 2498,
 "category_distribution": [
 {
 "category": "Withdrawn",
 "count": 1077,
 "percent": 43.1
 },
 {
 "category": "Pass",
 "count": 709,
 "percent": 28.4
 },
 {
 "category": "Fail",
 "count": 406,
 "percent": 16.3
 },
 {
 "category": "Distinction",
 "count": 306,
 "percent": 12.2
 }
 ],
 "largest_category": {
 "category": "Withdrawn",
 "count": 1077,
 "percent": 43.1
 },
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_total": {
 "categories": [
 "Fail",
 "Withdrawn"
 ],
 "present_categories": [
 "Withdrawn",
 "Fail"
 ],
 "missing_categories": [],
 "count": 1483,
 "percent": 59.4
 },
 "missing_expected_categories": [],
 "missing_focus_categories": [],
 "metric_columns": [],
 "metric_evidence_by_category": {},
 "summarization_warnings": [],
 "percent_total": 100,
 "outcome_distribution_evidence": {
 "categories": [
 {
 "final_outcome": "Withdrawn",
 "student_count": 1077,
 "pct_of_class": "43.1"
 },
 {
 "final_outcome": "Pass",
 "student_count": 709,
 "pct_of_class": "28.4"
 },
 {
 "final_outcome": "Fail",
 "student_count": 406,
 "pct_of_class": "16.3"
 },
 {
 "final_outcome": "Distinction",
 "student_count": 306,
 "pct_of_class": "12.2"
 }
 ],
 "largest_category": {
 "final_outcome": "Withdrawn",
 "student_count": 1077,
 "pct_of_class": "43.1"
 },
 "majority_status": "no_category_exceeds_50_percent",
 "causal_claim_allowed": false
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 7491,
 "token_usage": {
 "prompt_tokens": 1211,
 "completion_tokens": 432,
 "total_tokens": 1643
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000441
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
 "observed": "16185befb0c971718a221fc280a3c728b331cee25aae70ba22548114a9f4a3e2",
 "expected_values": [
 "16185befb0c971718a221fc280a3c728b331cee25aae70ba22548114a9f4a3e2"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "92a29598b51baea9d9132baa0c8ead82b2edfb7b55733e1a6c4bdfb3224435f7",
 "expected": "92a29598b51baea9d9132baa0c8ead82b2edfb7b55733e1a6c4bdfb3224435f7"
 },
 {
 "check_id": "numeric_fields_outcome_counts",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "outcome_counts",
 "numeric_columns": [
 "student_count"
 ],
 "numeric_summaries": {
 "student_count": {
 "count": 4,
 "min": 306,
 "max": 1077
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_outcome_counts",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "outcome_counts",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```
