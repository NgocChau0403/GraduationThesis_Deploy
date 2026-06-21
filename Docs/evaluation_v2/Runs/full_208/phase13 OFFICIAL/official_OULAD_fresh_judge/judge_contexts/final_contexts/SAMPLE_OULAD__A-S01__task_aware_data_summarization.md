# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-S01__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-S01",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Student full profile snapshot",
 "scope": "1 student",
 "actionable_question": "Who is this student and what is their current overall situation?",
 "target_audience": "instructor, academic_advisor",
 "ai_summary_type": "metric_snapshot",
 "ai_prompt_hint": "Summarise who this student is and where they stand across all dimensions (score, engagement, risk) in plain language.",
 "query_labels": [
 "student_profile"
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
 "student_id",
 "gender",
 "age_group",
 "avg_score [FE cross]",
 "engagement_score [FE cross]",
 "at_risk_label [FE cross]",
 "at_risk_score [FE cross]",
 "study_effort_level [FE cross]",
 "final_outcome",
 "previous_attempt_count"
 ],
 "output_schema": {},
 "query_labels": [
 "student_profile"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-S01-CORE-01",
 "description": "Summarise who this student is and where they stand across all dimensions (score, engagement, risk) in plain language."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-S01-CONSTRAINT-01",
 "description": "Do not extrapolate beyond returned score, engagement, and risk dimensions."
 },
 {
 "constraint_id": "A-S01-CONSTRAINT-02",
 "description": "Avoid holistic judgements about the student when supporting data is absent."
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
 "dataset_label": "student_profile",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-S01.json",
 "artifact_sha256": "571fbfd5a5f4b6aadbd2ae06eb63417d65d32d6ecc3ca2592d316fa372796d12",
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
 "evidence_artifact_file_sha256": "571fbfd5a5f4b6aadbd2ae06eb63417d65d32d6ecc3ca2592d316fa372796d12",
 "evidence_rows_sha256": "e09adf2281d52aea6e70987c40166e5b769dd26389368609bf2e012d25764562",
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
 "embedded_datasets_sha256": "e09adf2281d52aea6e70987c40166e5b769dd26389368609bf2e012d25764562",
 "datasets": {
 "student_profile": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "gender": "M",
 "age_group": "0-35",
 "region": "Scotland",
 "previous_attempt_count": 1,
 "final_outcome": "Distinction",
 "avg_score": 91.2,
 "at_risk_score": 3,
 "at_risk_label": "high",
 "engagement_score": 0.2024,
 "study_effort_level": "medium"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-S01__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "f58d69634107d0b2027589b90103de4d984e70af04ac6a7c490b1d4789fa6da3",
 "generator_input_sha256": "480add8829854a85e2005c92eebc0f2b4e1abac46582b91bdb325bea993d7aa1",
 "generator_input_compact": {
 "task_id": "A-S01",
 "execution_id": "exec_1781847821333_85e5e848",
 "task_name": "Student full profile snapshot",
 "analysis_type": "aggregation",
 "explanation_strategy": "distribution",
 "actionable_question": "Who is this student and what is their current overall situation?",
 "target_audience": [
 "instructor",
 "academic_advisor"
 ],
 "query_labels": [
 "student_profile"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "student_profile"
 ],
 "dataset_row_counts": {
 "student_profile": 1
 },
 "ai_summary_config_summary": {
 "summary_type": "metric_snapshot",
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
 "raw_text": "Summary: Student SAMPLE_OULAD_STU_100788: avg_score=91.2, final_outcome=Distinction, at_risk_score=3, at_risk_label=high, engagement_score=0.2024, study_effort_level=medium, previous_attempt_count=1.\n\nInsights: High Academic Performance: The student has an average score of 91.2, which is significantly above the passing threshold, indicating strong academic performance. | High Risk Status: Despite the high average score, the student has an at-risk score of 3, categorized as 'high', suggesting potential issues that may need addressing.\n\nEducational implications: This profile is descriptive across returned score, engagement, and risk dimensions; it does not identify a cause of the risk label.",
 "structured_payload": {
 "task_id": "A-S01",
 "execution_id": "exec_1781847821333_85e5e848",
 "explanation": {
 "summary": "Student SAMPLE_OULAD_STU_100788: avg_score=91.2, final_outcome=Distinction, at_risk_score=3, at_risk_label=high, engagement_score=0.2024, study_effort_level=medium, previous_attempt_count=1.",
 "insights": [
 {
 "title": "High Academic Performance",
 "description": "The student has an average score of 91.2, which is significantly above the passing threshold, indicating strong academic performance.",
 "severity": "low",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 91.2,
 "comparison": "baseline",
 "delta": null,
 "context": "This score reflects the student's overall academic achievement."
 }
 ]
 },
 {
 "title": "High Risk Status",
 "description": "Despite the high average score, the student has an at-risk score of 3, categorized as 'high', suggesting potential issues that may need addressing.",
 "severity": "high",
 "evidence": [
 {
 "metric": "at_risk_score",
 "value": 3,
 "comparison": "baseline",
 "delta": null,
 "context": "This score indicates a significant risk level that could impact future performance."
 }
 ]
 }
 ],
 "educational_implications": [
 "This profile is descriptive across returned score, engagement, and risk dimensions; it does not identify a cause of the risk label."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is complete and accurately reflects the student's profile.",
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
 "dataset_name": "student_profile",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 93,
 "task_aware_prompt_tokens": 882,
 "token_ratio": 9.4839,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "State exact score, outcome, risk score and label, engagement score, effort level, and previous attempts.",
 "Treat background attributes as descriptive only and do not invent a check-in or infer a cause."
 ],
 "must_keep_keys": [
 "metric_snapshot",
 "profile_contract_evidence",
 "status_evidence"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (9.4839 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "metric_snapshot",
 "task_id": "A-S01",
 "task_output_contract": [
 "State exact score, outcome, risk score and label, engagement score, effort level, and previous attempts.",
 "Treat background attributes as descriptive only and do not invent a check-in or infer a cause."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "student_profile",
 "row_count": 1,
 "entity": "SAMPLE_OULAD_STU_100788",
 "evidence_status": "sufficient"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "metric_snapshot": {
 "avg_score": {
 "value": 91.2,
 "unit": "score_0_100",
 "available": true
 },
 "at_risk_score": {
 "value": 3,
 "unit": "triggered_flag_count_0_5",
 "available": true
 },
 "engagement_score": {
 "value": 0.2024,
 "unit": "ratio_0_1",
 "available": true
 },
 "previous_attempt_count": {
 "value": 1,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "final_outcome": "Distinction",
 "at_risk_label": "high",
 "study_effort_level": "medium"
 },
 "label_evidence": {},
 "profile_contract_evidence": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "gender": "M",
 "age_group": "0-35",
 "region": "Scotland",
 "previous_attempt_count": 1,
 "final_outcome": "Distinction",
 "avg_score": 91.2,
 "at_risk_score": 3,
 "at_risk_label": "high",
 "engagement_score": 0.2024,
 "study_effort_level": "medium"
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "threshold_evidence": {},
 "benchmark_evidence": {}
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flag_evidence": {},
 "sensitive_context_present": true,
 "sensitive_context": {
 "gender": "M",
 "age_group": "0-35",
 "region": "Scotland"
 }
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "action_evidence": {}
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_evidence": [],
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "avg_score",
 "at_risk_score",
 "engagement_score",
 "previous_attempt_count"
 ],
 "configured_status_columns": [
 "final_outcome",
 "at_risk_label",
 "study_effort_level"
 ],
 "configured_threshold_columns": [],
 "configured_benchmark_columns": [],
 "configured_sensitive_columns": [
 "gender",
 "age_group",
 "region"
 ],
 "metric_availability_columns": {},
 "metric_units": {
 "avg_score": "score_0_100",
 "at_risk_score": "triggered_flag_count_0_5",
 "engagement_score": "ratio_0_1",
 "previous_attempt_count": "count"
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
 "dataset_name": "student_profile",
 "row_count": 1,
 "entity": "SAMPLE_OULAD_STU_100788",
 "metric_snapshot": {
 "avg_score": {
 "value": 91.2,
 "unit": "score_0_100",
 "available": true
 },
 "at_risk_score": {
 "value": 3,
 "unit": "triggered_flag_count_0_5",
 "available": true
 },
 "engagement_score": {
 "value": 0.2024,
 "unit": "ratio_0_1",
 "available": true
 },
 "previous_attempt_count": {
 "value": 1,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "final_outcome": "Distinction",
 "at_risk_label": "high",
 "study_effort_level": "medium"
 },
 "threshold_evidence": {},
 "benchmark_evidence": {},
 "label_evidence": {},
 "flag_evidence": {},
 "action_evidence": {},
 "missing_evidence": [],
 "sensitive_context_present": true,
 "sensitive_context": {
 "gender": "M",
 "age_group": "0-35",
 "region": "Scotland"
 },
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "avg_score",
 "at_risk_score",
 "engagement_score",
 "previous_attempt_count"
 ],
 "configured_status_columns": [
 "final_outcome",
 "at_risk_label",
 "study_effort_level"
 ],
 "configured_threshold_columns": [],
 "configured_benchmark_columns": [],
 "configured_sensitive_columns": [
 "gender",
 "age_group",
 "region"
 ],
 "metric_availability_columns": {},
 "metric_units": {
 "avg_score": "score_0_100",
 "at_risk_score": "triggered_flag_count_0_5",
 "engagement_score": "ratio_0_1",
 "previous_attempt_count": "count"
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
 ],
 "profile_contract_evidence": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "gender": "M",
 "age_group": "0-35",
 "region": "Scotland",
 "previous_attempt_count": 1,
 "final_outcome": "Distinction",
 "avg_score": 91.2,
 "at_risk_score": 3,
 "at_risk_label": "high",
 "engagement_score": 0.2024,
 "study_effort_level": "medium"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 6731,
 "token_usage": {
 "prompt_tokens": 1399,
 "completion_tokens": 437,
 "total_tokens": 1836
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000472
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-S01__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "f58d69634107d0b2027589b90103de4d984e70af04ac6a7c490b1d4789fa6da3",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1399,
 "completion_tokens": 437,
 "total_tokens": 1836
 },
 "latency_ms": 6737,
 "attempts_used": 3
 },
 "source_response_body": {
 "task_id": "A-S01",
 "execution_id": "exec_1781847821333_85e5e848",
 "explanation": {
 "summary": "Student SAMPLE_OULAD_STU_100788: avg_score=91.2, final_outcome=Distinction, at_risk_score=3, at_risk_label=high, engagement_score=0.2024, study_effort_level=medium, previous_attempt_count=1.",
 "insights": [
 {
 "title": "High Academic Performance",
 "description": "The student has an average score of 91.2, which is significantly above the passing threshold, indicating strong academic performance.",
 "severity": "low",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 91.2,
 "comparison": "baseline",
 "delta": null,
 "context": "This score reflects the student's overall academic achievement."
 }
 ]
 },
 {
 "title": "High Risk Status",
 "description": "Despite the high average score, the student has an at-risk score of 3, categorized as 'high', suggesting potential issues that may need addressing.",
 "severity": "high",
 "evidence": [
 {
 "metric": "at_risk_score",
 "value": 3,
 "comparison": "baseline",
 "delta": null,
 "context": "This score indicates a significant risk level that could impact future performance."
 }
 ]
 }
 ],
 "educational_implications": [
 "This profile is descriptive across returned score, engagement, and risk dimensions; it does not identify a cause of the risk label."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is complete and accurately reflects the student's profile.",
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
 "dataset_name": "student_profile",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 93,
 "task_aware_prompt_tokens": 882,
 "token_ratio": 9.4839,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "State exact score, outcome, risk score and label, engagement score, effort level, and previous attempts.",
 "Treat background attributes as descriptive only and do not invent a check-in or infer a cause."
 ],
 "must_keep_keys": [
 "metric_snapshot",
 "profile_contract_evidence",
 "status_evidence"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (9.4839 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "metric_snapshot",
 "task_id": "A-S01",
 "task_output_contract": [
 "State exact score, outcome, risk score and label, engagement score, effort level, and previous attempts.",
 "Treat background attributes as descriptive only and do not invent a check-in or infer a cause."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "student_profile",
 "row_count": 1,
 "entity": "SAMPLE_OULAD_STU_100788",
 "evidence_status": "sufficient"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "metric_snapshot": {
 "avg_score": {
 "value": 91.2,
 "unit": "score_0_100",
 "available": true
 },
 "at_risk_score": {
 "value": 3,
 "unit": "triggered_flag_count_0_5",
 "available": true
 },
 "engagement_score": {
 "value": 0.2024,
 "unit": "ratio_0_1",
 "available": true
 },
 "previous_attempt_count": {
 "value": 1,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "final_outcome": "Distinction",
 "at_risk_label": "high",
 "study_effort_level": "medium"
 },
 "label_evidence": {},
 "profile_contract_evidence": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "gender": "M",
 "age_group": "0-35",
 "region": "Scotland",
 "previous_attempt_count": 1,
 "final_outcome": "Distinction",
 "avg_score": 91.2,
 "at_risk_score": 3,
 "at_risk_label": "high",
 "engagement_score": 0.2024,
 "study_effort_level": "medium"
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "threshold_evidence": {},
 "benchmark_evidence": {}
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flag_evidence": {},
 "sensitive_context_present": true,
 "sensitive_context": {
 "gender": "M",
 "age_group": "0-35",
 "region": "Scotland"
 }
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "action_evidence": {}
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_evidence": [],
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "avg_score",
 "at_risk_score",
 "engagement_score",
 "previous_attempt_count"
 ],
 "configured_status_columns": [
 "final_outcome",
 "at_risk_label",
 "study_effort_level"
 ],
 "configured_threshold_columns": [],
 "configured_benchmark_columns": [],
 "configured_sensitive_columns": [
 "gender",
 "age_group",
 "region"
 ],
 "metric_availability_columns": {},
 "metric_units": {
 "avg_score": "score_0_100",
 "at_risk_score": "triggered_flag_count_0_5",
 "engagement_score": "ratio_0_1",
 "previous_attempt_count": "count"
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
 "dataset_name": "student_profile",
 "row_count": 1,
 "entity": "SAMPLE_OULAD_STU_100788",
 "metric_snapshot": {
 "avg_score": {
 "value": 91.2,
 "unit": "score_0_100",
 "available": true
 },
 "at_risk_score": {
 "value": 3,
 "unit": "triggered_flag_count_0_5",
 "available": true
 },
 "engagement_score": {
 "value": 0.2024,
 "unit": "ratio_0_1",
 "available": true
 },
 "previous_attempt_count": {
 "value": 1,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "final_outcome": "Distinction",
 "at_risk_label": "high",
 "study_effort_level": "medium"
 },
 "threshold_evidence": {},
 "benchmark_evidence": {},
 "label_evidence": {},
 "flag_evidence": {},
 "action_evidence": {},
 "missing_evidence": [],
 "sensitive_context_present": true,
 "sensitive_context": {
 "gender": "M",
 "age_group": "0-35",
 "region": "Scotland"
 },
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "avg_score",
 "at_risk_score",
 "engagement_score",
 "previous_attempt_count"
 ],
 "configured_status_columns": [
 "final_outcome",
 "at_risk_label",
 "study_effort_level"
 ],
 "configured_threshold_columns": [],
 "configured_benchmark_columns": [],
 "configured_sensitive_columns": [
 "gender",
 "age_group",
 "region"
 ],
 "metric_availability_columns": {},
 "metric_units": {
 "avg_score": "score_0_100",
 "at_risk_score": "triggered_flag_count_0_5",
 "engagement_score": "ratio_0_1",
 "previous_attempt_count": "count"
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
 ],
 "profile_contract_evidence": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "gender": "M",
 "age_group": "0-35",
 "region": "Scotland",
 "previous_attempt_count": 1,
 "final_outcome": "Distinction",
 "avg_score": 91.2,
 "at_risk_score": 3,
 "at_risk_label": "high",
 "engagement_score": 0.2024,
 "study_effort_level": "medium"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 6731,
 "token_usage": {
 "prompt_tokens": 1399,
 "completion_tokens": 437,
 "total_tokens": 1836
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000472
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
 "observed": "571fbfd5a5f4b6aadbd2ae06eb63417d65d32d6ecc3ca2592d316fa372796d12",
 "expected_values": [
 "571fbfd5a5f4b6aadbd2ae06eb63417d65d32d6ecc3ca2592d316fa372796d12"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "e09adf2281d52aea6e70987c40166e5b769dd26389368609bf2e012d25764562",
 "expected": "e09adf2281d52aea6e70987c40166e5b769dd26389368609bf2e012d25764562"
 },
 {
 "check_id": "numeric_fields_student_profile",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "student_profile",
 "numeric_columns": [
 "at_risk_score",
 "avg_score",
 "engagement_score",
 "previous_attempt_count"
 ],
 "numeric_summaries": {
 "at_risk_score": {
 "count": 1,
 "min": 3,
 "max": 3
 },
 "avg_score": {
 "count": 1,
 "min": 91.2,
 "max": 91.2
 },
 "engagement_score": {
 "count": 1,
 "min": 0.2024,
 "max": 0.2024
 },
 "previous_attempt_count": {
 "count": 1,
 "min": 1,
 "max": 1
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_student_profile",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "student_profile",
 "flag_columns": [
 "at_risk_score",
 "at_risk_label"
 ],
 "triggered_like_counts": {
 "at_risk_score": 0,
 "at_risk_label": 0
 }
 }
]
```
