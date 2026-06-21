# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S07__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__A-S07__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "A-S07",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Student background context",
 "scope": "1 student",
 "actionable_question": "What background factors should admin consider when deciding how to support this student?",
 "target_audience": "academic_advisor, admin",
 "ai_summary_type": "metric_snapshot",
 "ai_prompt_hint": "Frame background factors as context, not judgement. Note which disadvantage dimensions are present and what support is already in place.",
 "query_labels": [
 "background_context"
 ],
 "explanation_strategy": "distribution"
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
 "socioeconomic_band",
 "disadvantage_score [FE single]",
 "support_score [FE single]",
 "family_stability_score [FE single]",
 "disability_flag",
 "internet_access_flag",
 "previous_attempt_count"
 ],
 "output_schema": {
 "required_columns": [
 "school",
 "family_size",
 "gender",
 "age_years",
 "school_support_flag",
 "family_support_flag",
 "has_paid_class",
 "internet_access_flag",
 "support_score",
 "lifestyle_risk_score",
 "social_balance_score",
 "family_stability_score"
 ],
 "optional_columns": [
 "highest_education",
 "mother_education_level",
 "father_education_level",
 "age_group",
 "previous_attempt_count",
 "studytime",
 "absences"
 ]
 },
 "query_labels": [
 "background_context"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-S07-CORE-01",
 "description": "Note which disadvantage dimensions are present and what support is already in place."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-S07-CONSTRAINT-01",
 "description": "Frame background factors as context, not judgement."
 },
 {
 "constraint_id": "A-S07-CONSTRAINT-02",
 "description": "Treat the output as professional advisor/admin context; do not expose raw disadvantage scores in student-facing wording."
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
 "dataset_label": "background_context",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S07.json",
 "artifact_sha256": "29f492d729f419d9bedc40a295a26cbcdc2437f460b158fda3570fa7c3b00211",
 "row_count": 1,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 1,
 "prompt_embedded_row_count": 1,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "29f492d729f419d9bedc40a295a26cbcdc2437f460b158fda3570fa7c3b00211",
 "evidence_rows_sha256": "cc044cb0aa663e6b21ead2bdc781df79bb9525d82e0ccfbe7b2795b382051a7c",
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
 "full_result_row_count": 1,
 "embedded_datasets_sha256": "cc044cb0aa663e6b21ead2bdc781df79bb9525d82e0ccfbe7b2795b382051a7c",
 "datasets": {
 "background_context": [
 {
 "highest_education": null,
 "mother_education_level": "4",
 "father_education_level": "4",
 "school": "GP",
 "family_size": "GT3",
 "gender": "F",
 "age_years": 18,
 "age_group": "18-20",
 "school_support_flag": true,
 "family_support_flag": false,
 "has_paid_class": false,
 "internet_access_flag": false,
 "support_score": 0.25,
 "lifestyle_risk_score": 0.47,
 "social_balance_score": 0.03,
 "family_stability_score": 0.58,
 "previous_attempt_count": 0,
 "studytime": 2,
 "absences": 4
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-S07__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "ad3bc64c975543b822f165064a4226f4b043381dec1b0683a35265a82f1ffca2",
 "generator_input_sha256": "d69cfa69a75baa9a93138b25bccb4ed90ba42542262fb5865067c78b6b15f007",
 "generator_input_compact": {
 "task_id": "A-S07",
 "execution_id": "exec_1781847238136_ee2bf06a",
 "task_name": "Student background context",
 "analysis_type": "aggregation",
 "explanation_strategy": "distribution",
 "actionable_question": "What background factors should admin consider when deciding how to support this student?",
 "target_audience": [
 "academic_advisor",
 "admin"
 ],
 "query_labels": [
 "background_context"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "background_context"
 ],
 "dataset_row_counts": {
 "background_context": 1
 },
 "ai_summary_config_summary": {
 "summary_type": "metric_snapshot",
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
 "require_sensitive_context_policy": true,
 "require_complete_action_provenance": true
 }
 }
}
```

## AI Explanation To Judge

```json
{
 "raw_text": "Summary: The student has access to school support but lacks family support, paid classes, and internet access. The support score is relatively low at 0.25, indicating potential areas for improvement in support mechanisms.\n\nInsights: Support Flags Overview: The student benefits from school support (true) but does not have family support (false), paid classes (false), or internet access (false). This combination may limit the student's overall support system.\n\nEducational implications: The absence of family support and internet access may hinder the student's academic performance and engagement.\n\nRecommendations: high - Review the student's support flags and context values to identify specific needs. - Understanding the lack of family support and other resources can help tailor interventions to improve the student's educational experience.",
 "structured_payload": {
 "task_id": "A-S07",
 "execution_id": "exec_1781847238136_ee2bf06a",
 "explanation": {
 "summary": "The student has access to school support but lacks family support, paid classes, and internet access. The support score is relatively low at 0.25, indicating potential areas for improvement in support mechanisms.",
 "insights": [
 {
 "title": "Support Flags Overview",
 "description": "The student benefits from school support (true) but does not have family support (false), paid classes (false), or internet access (false). This combination may limit the student's overall support system.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "school_support_flag",
 "value": 1,
 "comparison": "baseline",
 "delta": null,
 "context": "Student has school support."
 },
 {
 "metric": "family_support_flag",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "Student lacks family support."
 },
 {
 "metric": "has_paid_class",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "Student does not have paid classes."
 },
 {
 "metric": "internet_access_flag",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "Student lacks internet access."
 }
 ]
 }
 ],
 "educational_implications": [
 "The absence of family support and internet access may hinder the student's academic performance and engagement."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Review the student's support flags and context values to identify specific needs.",
 "rationale": "Understanding the lack of family support and other resources can help tailor interventions to improve the student's educational experience."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is complete for the available metrics and support flags.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "metric_snapshot",
 "ai_summary_method_warning": null,
 "full_result_row_count": 1,
 "included_row_count": 1,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "background_context",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 149,
 "task_aware_prompt_tokens": 1206,
 "token_ratio": 8.094,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "action_evidence.action_evidence",
 "exceptions.sensitive_context_present",
 "exceptions.flag_evidence",
 "comparison.benchmark_evidence",
 "comparison.threshold_evidence",
 "primary_finding.label_evidence"
 ],
 "task_output_contract": [
 "Describe which support flags are present and absent, including existing school support, without inventing thresholds or causes.",
 "Treat background metrics as descriptive context only; do not infer that a value is below average unless a benchmark is supplied.",
 "Do not invent a new intervention such as enhancing support services; if you include an action, frame it as a specific evidence-grounded review/check of the returned support flags and raw context values."
 ],
 "must_keep_keys": [
 "metric_snapshot",
 "sensitive_context",
 "status_evidence",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (8.094 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "metric_snapshot",
 "task_id": "A-S07",
 "task_output_contract": [
 "Describe which support flags are present and absent, including existing school support, without inventing thresholds or causes.",
 "Treat background metrics as descriptive context only; do not infer that a value is below average unless a benchmark is supplied.",
 "Do not invent a new intervention such as enhancing support services; if you include an action, frame it as a specific evidence-grounded review/check of the returned support flags and raw context values."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "background_context",
 "row_count": 1,
 "entity": null,
 "evidence_status": "sufficient"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "metric_snapshot": {
 "support_score": {
 "value": 0.25,
 "unit": "ratio_0_1",
 "available": true
 },
 "lifestyle_risk_score": {
 "value": 0.47,
 "unit": "score_0_1",
 "available": true
 },
 "social_balance_score": {
 "value": 0.03,
 "unit": "signed_score",
 "available": true
 },
 "family_stability_score": {
 "value": 0.58,
 "unit": "score_0_1",
 "available": true
 },
 "previous_attempt_count": {
 "value": 0,
 "unit": "count",
 "available": true
 },
 "studytime": {
 "value": 2,
 "unit": "ordinal_scale_raw",
 "available": true
 },
 "absences": {
 "value": 4,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "school_support_flag": true,
 "family_support_flag": false,
 "has_paid_class": false,
 "internet_access_flag": false
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "sensitive_context": {
 "highest_education": null,
 "school": "GP",
 "family_size": "GT3",
 "gender": "F",
 "age_years": 18,
 "age_group": "18-20",
 "school_support_flag": true,
 "family_support_flag": false,
 "has_paid_class": false,
 "internet_access_flag": false,
 "support_score": 0.25,
 "lifestyle_risk_score": 0.47,
 "social_balance_score": 0.03,
 "family_stability_score": 0.58,
 "studytime": 2,
 "absences": 4
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_evidence": [
 {
 "role": "sensitive_context",
 "column": "highest_education",
 "reason": "configured sensitive context value is null",
 "value": null
 }
 ],
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "support_score",
 "lifestyle_risk_score",
 "social_balance_score",
 "family_stability_score",
 "previous_attempt_count",
 "studytime",
 "absences"
 ],
 "configured_status_columns": [
 "school_support_flag",
 "family_support_flag",
 "has_paid_class",
 "internet_access_flag"
 ],
 "configured_threshold_columns": [],
 "configured_benchmark_columns": [],
 "configured_sensitive_columns": [
 "highest_education",
 "school",
 "family_size",
 "gender",
 "age_years",
 "age_group",
 "school_support_flag",
 "family_support_flag",
 "has_paid_class",
 "internet_access_flag",
 "support_score",
 "lifestyle_risk_score",
 "social_balance_score",
 "family_stability_score",
 "studytime",
 "absences"
 ],
 "metric_availability_columns": {},
 "metric_units": {
 "support_score": "ratio_0_1",
 "lifestyle_risk_score": "score_0_1",
 "social_balance_score": "signed_score",
 "family_stability_score": "score_0_1",
 "previous_attempt_count": "count",
 "studytime": "ordinal_scale_raw",
 "absences": "count"
 },
 "threshold_sources": {},
 "benchmark_sources": {},
 "sensitive_context_policy": "descriptive_context_only_no_causal_or_prescriptive_inference",
 "missing_required_columns": [],
 "missing_unit_metadata": [],
 "missing_threshold_sources": [],
 "missing_benchmark_sources": [],
 "errors": []
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Sensitive/background context is descriptive only under policy 'descriptive_context_only_no_causal_or_prescriptive_inference'; do not infer causality, risk cause, or recommendations from it."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "metric_snapshot",
 "dataset_name": "background_context",
 "row_count": 1,
 "entity": null,
 "metric_snapshot": {
 "support_score": {
 "value": 0.25,
 "unit": "ratio_0_1",
 "available": true
 },
 "lifestyle_risk_score": {
 "value": 0.47,
 "unit": "score_0_1",
 "available": true
 },
 "social_balance_score": {
 "value": 0.03,
 "unit": "signed_score",
 "available": true
 },
 "family_stability_score": {
 "value": 0.58,
 "unit": "score_0_1",
 "available": true
 },
 "previous_attempt_count": {
 "value": 0,
 "unit": "count",
 "available": true
 },
 "studytime": {
 "value": 2,
 "unit": "ordinal_scale_raw",
 "available": true
 },
 "absences": {
 "value": 4,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "school_support_flag": true,
 "family_support_flag": false,
 "has_paid_class": false,
 "internet_access_flag": false
 },
 "threshold_evidence": {},
 "benchmark_evidence": {},
 "label_evidence": {},
 "flag_evidence": {},
 "action_evidence": {},
 "missing_evidence": [
 {
 "role": "sensitive_context",
 "column": "highest_education",
 "reason": "configured sensitive context value is null",
 "value": null
 }
 ],
 "sensitive_context_present": true,
 "sensitive_context": {
 "highest_education": null,
 "school": "GP",
 "family_size": "GT3",
 "gender": "F",
 "age_years": 18,
 "age_group": "18-20",
 "school_support_flag": true,
 "family_support_flag": false,
 "has_paid_class": false,
 "internet_access_flag": false,
 "support_score": 0.25,
 "lifestyle_risk_score": 0.47,
 "social_balance_score": 0.03,
 "family_stability_score": 0.58,
 "studytime": 2,
 "absences": 4
 },
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "support_score",
 "lifestyle_risk_score",
 "social_balance_score",
 "family_stability_score",
 "previous_attempt_count",
 "studytime",
 "absences"
 ],
 "configured_status_columns": [
 "school_support_flag",
 "family_support_flag",
 "has_paid_class",
 "internet_access_flag"
 ],
 "configured_threshold_columns": [],
 "configured_benchmark_columns": [],
 "configured_sensitive_columns": [
 "highest_education",
 "school",
 "family_size",
 "gender",
 "age_years",
 "age_group",
 "school_support_flag",
 "family_support_flag",
 "has_paid_class",
 "internet_access_flag",
 "support_score",
 "lifestyle_risk_score",
 "social_balance_score",
 "family_stability_score",
 "studytime",
 "absences"
 ],
 "metric_availability_columns": {},
 "metric_units": {
 "support_score": "ratio_0_1",
 "lifestyle_risk_score": "score_0_1",
 "social_balance_score": "signed_score",
 "family_stability_score": "score_0_1",
 "previous_attempt_count": "count",
 "studytime": "ordinal_scale_raw",
 "absences": "count"
 },
 "threshold_sources": {},
 "benchmark_sources": {},
 "sensitive_context_policy": "descriptive_context_only_no_causal_or_prescriptive_inference",
 "missing_required_columns": [],
 "missing_unit_metadata": [],
 "missing_threshold_sources": [],
 "missing_benchmark_sources": [],
 "errors": []
 },
 "evidence_status": "sufficient",
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Sensitive/background context is descriptive only under policy 'descriptive_context_only_no_causal_or_prescriptive_inference'; do not infer causality, risk cause, or recommendations from it."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5480,
 "token_usage": {
 "prompt_tokens": 1707,
 "completion_tokens": 433,
 "total_tokens": 2140
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000516
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-S07__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "ad3bc64c975543b822f165064a4226f4b043381dec1b0683a35265a82f1ffca2",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1707,
 "completion_tokens": 433,
 "total_tokens": 2140
 },
 "latency_ms": 5571,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-S07",
 "execution_id": "exec_1781847238136_ee2bf06a",
 "explanation": {
 "summary": "The student has access to school support but lacks family support, paid classes, and internet access. The support score is relatively low at 0.25, indicating potential areas for improvement in support mechanisms.",
 "insights": [
 {
 "title": "Support Flags Overview",
 "description": "The student benefits from school support (true) but does not have family support (false), paid classes (false), or internet access (false). This combination may limit the student's overall support system.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "school_support_flag",
 "value": 1,
 "comparison": "baseline",
 "delta": null,
 "context": "Student has school support."
 },
 {
 "metric": "family_support_flag",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "Student lacks family support."
 },
 {
 "metric": "has_paid_class",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "Student does not have paid classes."
 },
 {
 "metric": "internet_access_flag",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "Student lacks internet access."
 }
 ]
 }
 ],
 "educational_implications": [
 "The absence of family support and internet access may hinder the student's academic performance and engagement."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Review the student's support flags and context values to identify specific needs.",
 "rationale": "Understanding the lack of family support and other resources can help tailor interventions to improve the student's educational experience."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is complete for the available metrics and support flags.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "metric_snapshot",
 "ai_summary_method_warning": null,
 "full_result_row_count": 1,
 "included_row_count": 1,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "background_context",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 149,
 "task_aware_prompt_tokens": 1206,
 "token_ratio": 8.094,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "action_evidence.action_evidence",
 "exceptions.sensitive_context_present",
 "exceptions.flag_evidence",
 "comparison.benchmark_evidence",
 "comparison.threshold_evidence",
 "primary_finding.label_evidence"
 ],
 "task_output_contract": [
 "Describe which support flags are present and absent, including existing school support, without inventing thresholds or causes.",
 "Treat background metrics as descriptive context only; do not infer that a value is below average unless a benchmark is supplied.",
 "Do not invent a new intervention such as enhancing support services; if you include an action, frame it as a specific evidence-grounded review/check of the returned support flags and raw context values."
 ],
 "must_keep_keys": [
 "metric_snapshot",
 "sensitive_context",
 "status_evidence",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (8.094 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "metric_snapshot",
 "task_id": "A-S07",
 "task_output_contract": [
 "Describe which support flags are present and absent, including existing school support, without inventing thresholds or causes.",
 "Treat background metrics as descriptive context only; do not infer that a value is below average unless a benchmark is supplied.",
 "Do not invent a new intervention such as enhancing support services; if you include an action, frame it as a specific evidence-grounded review/check of the returned support flags and raw context values."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "background_context",
 "row_count": 1,
 "entity": null,
 "evidence_status": "sufficient"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "metric_snapshot": {
 "support_score": {
 "value": 0.25,
 "unit": "ratio_0_1",
 "available": true
 },
 "lifestyle_risk_score": {
 "value": 0.47,
 "unit": "score_0_1",
 "available": true
 },
 "social_balance_score": {
 "value": 0.03,
 "unit": "signed_score",
 "available": true
 },
 "family_stability_score": {
 "value": 0.58,
 "unit": "score_0_1",
 "available": true
 },
 "previous_attempt_count": {
 "value": 0,
 "unit": "count",
 "available": true
 },
 "studytime": {
 "value": 2,
 "unit": "ordinal_scale_raw",
 "available": true
 },
 "absences": {
 "value": 4,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "school_support_flag": true,
 "family_support_flag": false,
 "has_paid_class": false,
 "internet_access_flag": false
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "sensitive_context": {
 "highest_education": null,
 "school": "GP",
 "family_size": "GT3",
 "gender": "F",
 "age_years": 18,
 "age_group": "18-20",
 "school_support_flag": true,
 "family_support_flag": false,
 "has_paid_class": false,
 "internet_access_flag": false,
 "support_score": 0.25,
 "lifestyle_risk_score": 0.47,
 "social_balance_score": 0.03,
 "family_stability_score": 0.58,
 "studytime": 2,
 "absences": 4
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_evidence": [
 {
 "role": "sensitive_context",
 "column": "highest_education",
 "reason": "configured sensitive context value is null",
 "value": null
 }
 ],
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "support_score",
 "lifestyle_risk_score",
 "social_balance_score",
 "family_stability_score",
 "previous_attempt_count",
 "studytime",
 "absences"
 ],
 "configured_status_columns": [
 "school_support_flag",
 "family_support_flag",
 "has_paid_class",
 "internet_access_flag"
 ],
 "configured_threshold_columns": [],
 "configured_benchmark_columns": [],
 "configured_sensitive_columns": [
 "highest_education",
 "school",
 "family_size",
 "gender",
 "age_years",
 "age_group",
 "school_support_flag",
 "family_support_flag",
 "has_paid_class",
 "internet_access_flag",
 "support_score",
 "lifestyle_risk_score",
 "social_balance_score",
 "family_stability_score",
 "studytime",
 "absences"
 ],
 "metric_availability_columns": {},
 "metric_units": {
 "support_score": "ratio_0_1",
 "lifestyle_risk_score": "score_0_1",
 "social_balance_score": "signed_score",
 "family_stability_score": "score_0_1",
 "previous_attempt_count": "count",
 "studytime": "ordinal_scale_raw",
 "absences": "count"
 },
 "threshold_sources": {},
 "benchmark_sources": {},
 "sensitive_context_policy": "descriptive_context_only_no_causal_or_prescriptive_inference",
 "missing_required_columns": [],
 "missing_unit_metadata": [],
 "missing_threshold_sources": [],
 "missing_benchmark_sources": [],
 "errors": []
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Sensitive/background context is descriptive only under policy 'descriptive_context_only_no_causal_or_prescriptive_inference'; do not infer causality, risk cause, or recommendations from it."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "metric_snapshot",
 "dataset_name": "background_context",
 "row_count": 1,
 "entity": null,
 "metric_snapshot": {
 "support_score": {
 "value": 0.25,
 "unit": "ratio_0_1",
 "available": true
 },
 "lifestyle_risk_score": {
 "value": 0.47,
 "unit": "score_0_1",
 "available": true
 },
 "social_balance_score": {
 "value": 0.03,
 "unit": "signed_score",
 "available": true
 },
 "family_stability_score": {
 "value": 0.58,
 "unit": "score_0_1",
 "available": true
 },
 "previous_attempt_count": {
 "value": 0,
 "unit": "count",
 "available": true
 },
 "studytime": {
 "value": 2,
 "unit": "ordinal_scale_raw",
 "available": true
 },
 "absences": {
 "value": 4,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "school_support_flag": true,
 "family_support_flag": false,
 "has_paid_class": false,
 "internet_access_flag": false
 },
 "threshold_evidence": {},
 "benchmark_evidence": {},
 "label_evidence": {},
 "flag_evidence": {},
 "action_evidence": {},
 "missing_evidence": [
 {
 "role": "sensitive_context",
 "column": "highest_education",
 "reason": "configured sensitive context value is null",
 "value": null
 }
 ],
 "sensitive_context_present": true,
 "sensitive_context": {
 "highest_education": null,
 "school": "GP",
 "family_size": "GT3",
 "gender": "F",
 "age_years": 18,
 "age_group": "18-20",
 "school_support_flag": true,
 "family_support_flag": false,
 "has_paid_class": false,
 "internet_access_flag": false,
 "support_score": 0.25,
 "lifestyle_risk_score": 0.47,
 "social_balance_score": 0.03,
 "family_stability_score": 0.58,
 "studytime": 2,
 "absences": 4
 },
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "support_score",
 "lifestyle_risk_score",
 "social_balance_score",
 "family_stability_score",
 "previous_attempt_count",
 "studytime",
 "absences"
 ],
 "configured_status_columns": [
 "school_support_flag",
 "family_support_flag",
 "has_paid_class",
 "internet_access_flag"
 ],
 "configured_threshold_columns": [],
 "configured_benchmark_columns": [],
 "configured_sensitive_columns": [
 "highest_education",
 "school",
 "family_size",
 "gender",
 "age_years",
 "age_group",
 "school_support_flag",
 "family_support_flag",
 "has_paid_class",
 "internet_access_flag",
 "support_score",
 "lifestyle_risk_score",
 "social_balance_score",
 "family_stability_score",
 "studytime",
 "absences"
 ],
 "metric_availability_columns": {},
 "metric_units": {
 "support_score": "ratio_0_1",
 "lifestyle_risk_score": "score_0_1",
 "social_balance_score": "signed_score",
 "family_stability_score": "score_0_1",
 "previous_attempt_count": "count",
 "studytime": "ordinal_scale_raw",
 "absences": "count"
 },
 "threshold_sources": {},
 "benchmark_sources": {},
 "sensitive_context_policy": "descriptive_context_only_no_causal_or_prescriptive_inference",
 "missing_required_columns": [],
 "missing_unit_metadata": [],
 "missing_threshold_sources": [],
 "missing_benchmark_sources": [],
 "errors": []
 },
 "evidence_status": "sufficient",
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Sensitive/background context is descriptive only under policy 'descriptive_context_only_no_causal_or_prescriptive_inference'; do not infer causality, risk cause, or recommendations from it."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5480,
 "token_usage": {
 "prompt_tokens": 1707,
 "completion_tokens": 433,
 "total_tokens": 2140
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000516
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
 "expected": 1,
 "observed": 1
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "29f492d729f419d9bedc40a295a26cbcdc2437f460b158fda3570fa7c3b00211",
 "expected_values": [
 "29f492d729f419d9bedc40a295a26cbcdc2437f460b158fda3570fa7c3b00211"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "cc044cb0aa663e6b21ead2bdc781df79bb9525d82e0ccfbe7b2795b382051a7c",
 "expected": "cc044cb0aa663e6b21ead2bdc781df79bb9525d82e0ccfbe7b2795b382051a7c"
 },
 {
 "check_id": "numeric_fields_background_context",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "background_context",
 "numeric_columns": [
 "absences",
 "age_years",
 "family_stability_score",
 "lifestyle_risk_score",
 "previous_attempt_count",
 "social_balance_score",
 "studytime",
 "support_score"
 ],
 "numeric_summaries": {
 "absences": {
 "count": 1,
 "min": 4,
 "max": 4
 },
 "age_years": {
 "count": 1,
 "min": 18,
 "max": 18
 },
 "family_stability_score": {
 "count": 1,
 "min": 0.58,
 "max": 0.58
 },
 "lifestyle_risk_score": {
 "count": 1,
 "min": 0.47,
 "max": 0.47
 },
 "previous_attempt_count": {
 "count": 1,
 "min": 0,
 "max": 0
 },
 "social_balance_score": {
 "count": 1,
 "min": 0.03,
 "max": 0.03
 },
 "studytime": {
 "count": 1,
 "min": 2,
 "max": 2
 },
 "support_score": {
 "count": 1,
 "min": 0.25,
 "max": 0.25
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_background_context",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "background_context",
 "flag_columns": [
 "school_support_flag",
 "family_support_flag",
 "internet_access_flag",
 "lifestyle_risk_score"
 ],
 "triggered_like_counts": {
 "school_support_flag": 1,
 "family_support_flag": 0,
 "internet_access_flag": 0,
 "lifestyle_risk_score": 0
 }
 }
]
```
