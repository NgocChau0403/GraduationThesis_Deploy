# LLM Judge V2 Prompt Queue Packet

## Session-Static Judge Contract Reference

The Judge Prompt is intentionally not embedded in this record packet. The session must load and verify it once, then combine it with this record-specific context.

```json
{
 "static_prompt_path": "Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md",
 "static_prompt_sha256": "e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517"
}
```

## Queue Strategy

This packet uses `compact_retrieval_context`. It intentionally does not embed all full-query rows because the Phase F6 final context exceeds the configured prompt token cap.

## Compact Judge Context

```json
{
 "queue_strategy": "compact_retrieval_context",
 "strategy_reason": "Full final context exceeds the configured token cap; full rows are not embedded in this prompt packet.",
 "audit_guarantee": {
 "full_artifacts_remain_on_disk": true,
 "full_artifact_references": [
 {
 "dataset_label": "lifestyle_risk_scatter",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T09.json",
 "artifact_sha256": "ac1a70115e0a9941bcb6b44a7a70ee79c402ac36c1f083a8b20d42959fa648ca",
 "row_count": 649,
 "readable": true
 }
 ],
 "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_contexts/final_contexts/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.md",
 "final_context_sha256": "e79133fd63bf947ef8a479b8e9ff22046811b6ee71d95ac141afa86a998bd8ff",
 "judge_input_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_inputs/judge_inputs/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.json",
 "judge_input_sha256": "9b81601b25b2e94ceb66c72be89ebab4ad95781cd90f18dd73f4d7a57f0a75cf"
 },
 "record_identity": {
 "record_id": "SAMPLE_UCI_POR__S-T09__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "S-T09",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
 },
 "task_context": {
 "task_name": "Lifestyle risk vs performance",
 "scope": "1 student + cohort context",
 "actionable_question": "Could my lifestyle habits be affecting my academic results?",
 "target_audience": "student",
 "ai_summary_type": "correlation_evidence",
 "ai_prompt_hint": "Compare the selected student against the class lifestyle-risk scatter. Highlight the student's position and any cohort-level association between lifestyle_risk_score and avg_score. Frame as correlation, not causation.",
 "query_labels": [
 "lifestyle_risk_scatter"
 ],
 "explanation_strategy": "correlation"
 },
 "schema_context": {
 "source_tables": [
 "student",
 "enrollment",
 "assessment_result",
 "assessment [UCI only]"
 ],
 "key_db_fields": [
 "alcohol_weekday",
 "alcohol_weekend",
 "go_out_freq",
 "health_status",
 "family_relation",
 "free_time",
 "lifestyle_risk_score [FE single]"
 ],
 "output_schema": {
 "required_columns": [
 "student_id",
 "point_role",
 "lifestyle_risk_score",
 "avg_score"
 ],
 "optional_columns": [
 "is_current_student",
 "alcohol_weekday",
 "alcohol_weekend",
 "go_out_freq",
 "health_status",
 "family_relation",
 "free_time"
 ]
 },
 "query_labels": [
 "lifestyle_risk_scatter"
 ]
 },
 "evaluation_requirements": {
 "required_core_outputs": [
 {
 "requirement_id": "S-T09-CORE-01",
 "description": "Compare the selected student against the class lifestyle-risk scatter."
 },
 {
 "requirement_id": "S-T09-CORE-02",
 "description": "Highlight the student's position and any cohort-level association between lifestyle_risk_score and avg_score."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "S-T09-CONSTRAINT-01",
 "description": "Frame as correlation, not causation."
 }
 ],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
 },
 "derived_stat_evidence": [],
 "deterministic_checks": [
 {
 "check_type": "task_aware_shared_evidence_contract",
 "case_id": "SAMPLE_UCI_POR__S-T09",
 "task_id": "S-T09",
 "sidecar_sha256": "a21bf557daac81a4ac6a26d87e1b2cd22a7ae52cd00c71eaa2e69f4a6f0ac0d1",
 "evidence": {
 "schema_version": "task_aware_shared_evidence_v1",
 "case_id": "SAMPLE_UCI_POR__S-T09",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "S-T09",
 "source_explanation_record_id": "SAMPLE_UCI_POR__S-T09__task_aware_data_summarization",
 "source_explanation_artifact_sha256": "5a31e3c1d64b3c6f16f3d77dd6a0a2d94cec6dcfcc8307aedb1f68b9d5968ac5",
 "deterministic_summary": {
 "summary_type": "correlation_evidence",
 "dataset_name": "lifestyle_risk_scatter",
 "row_count": 649,
 "x_column": "lifestyle_risk_score",
 "y_column": "avg_score",
 "entity_column": "student_id",
 "selected_entity_column": "is_current_student",
 "metric_units": {
 "lifestyle_risk_score": "index_0_1",
 "avg_score": "score_on_runtime_scale"
 },
 "metric_directions": {
 "lifestyle_risk_score": "higher_is_more_risk",
 "avg_score": "higher_is_better"
 },
 "coefficient": -0.1041,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "sample_size": 649,
 "p_value": null,
 "outliers": [],
 "selected_entity_evidence": [
 {
 "row_index": 648,
 "selected_column": "is_current_student",
 "selected_value": true,
 "is_valid_pair": true,
 "raw_values": {
 "lifestyle_risk_score": 0.375,
 "avg_score": 36.67
 },
 "lifestyle_risk_score": 0.375,
 "avg_score": 36.67,
 "cohort_context": {
 "coefficient": -0.1041,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "sample_size": 649,
 "direction": "negative",
 "strength": "weak",
 "strength_claim_allowed": true,
 "significance_claim_allowed": false,
 "causal_claim_allowed": false
 },
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "point_role": "Selected student",
 "label_context": {
 "point_role": "Selected student"
 },
 "sensitive_context": {
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 4,
 "health_status": 3,
 "family_relation": 4,
 "free_time": 3
 },
 "sensitive_context_policy": "descriptive_only",
 "claim_limit": "Sensitive/background context is descriptive only; do not infer causality or prescribe actions from it."
 }
 ],
 "missing_selected_entity_evidence": [],
 "selected_entity_count": 1,
 "sensitive_context_policy": "descriptive_only",
 "direction": "negative",
 "strength": "weak",
 "strength_claim_allowed": true,
 "significance_claim_allowed": false,
 "causal_claim_allowed": false,
 "parse_warnings": [],
 "statistical_warnings": [
 "No p-value evidence is available; statistical significance claims are not allowed."
 ],
 "summarization_warnings": [
 "No p-value evidence is available; statistical significance claims are not allowed."
 ]
 },
 "prompt_evidence_payload": {
 "summary_type": "correlation_evidence",
 "task_id": "S-T09",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "lifestyle_risk_scatter",
 "row_count": 649,
 "x_column": "lifestyle_risk_score",
 "y_column": "avg_score",
 "entity_column": "student_id",
 "sample_size": 649,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "selected_entity_column": "is_current_student",
 "selected_entity_count": 1,
 "metric_units": {
 "lifestyle_risk_score": "index_0_1",
 "avg_score": "score_on_runtime_scale"
 },
 "metric_directions": {
 "lifestyle_risk_score": "higher_is_more_risk",
 "avg_score": "higher_is_better"
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "coefficient": -0.1041,
 "direction": "negative",
 "strength": "weak"
 }
 },
 {
 "name": "comparison",
 "facts": {
 "p_value": null,
 "selected_entity_evidence": [
 {
 "row_index": 648,
 "selected_column": "is_current_student",
 "selected_value": true,
 "is_valid_pair": true,
 "raw_values": {
 "lifestyle_risk_score": 0.375,
 "avg_score": 36.67
 },
 "lifestyle_risk_score": 0.375,
 "avg_score": 36.67,
 "cohort_context": {
 "coefficient": -0.1041,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "sample_size": 649,
 "direction": "negative",
 "strength": "weak",
 "strength_claim_allowed": true,
 "significance_claim_allowed": false,
 "causal_claim_allowed": false
 },
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "point_role": "Selected student",
 "label_context": {
 "point_role": "Selected student"
 },
 "sensitive_context": {
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 4,
 "health_status": 3,
 "family_relation": 4,
 "free_time": 3
 },
 "sensitive_context_policy": "descriptive_only",
 "claim_limit": "Sensitive/background context is descriptive only; do not infer causality or prescribe actions from it."
 }
 ]
 }
 },
 {
 "name": "trend_relationship",
 "facts": {
 "strength_claim_allowed": true,
 "significance_claim_allowed": false,
 "causal_claim_allowed": false
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "outliers": []
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_selected_entity_evidence": [],
 "parse_warnings": [],
 "statistical_warnings": [
 "No p-value evidence is available; statistical significance claims are not allowed."
 ],
 "sensitive_context_policy": "descriptive_only",
 "summarization_warnings": [
 "No p-value evidence is available; statistical significance claims are not allowed."
 ]
 }
 }
 ]
 }
 }
 }
 ],
 "evidence_access_summary": {
 "evidence_access_mode": "deterministic_artifact_retrieval",
 "full_result_row_count": 649,
 "prompt_embedded_row_count": 0,
 "retrieved_row_count": 649,
 "retrieved_row_count_by_dataset": {
 "lifestyle_risk_scatter": 649
 },
 "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_inputs/retrieval_logs/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.json",
 "retrieval_coverage_status": "full",
 "full_access_available": true,
 "deterministic_scan_scope": "full_query_artifact_all_rows",
 "deterministic_scan_row_count_by_dataset": {
 "lifestyle_risk_scatter": 649
 },
 "full_result_sent_to_llm": false,
 "evidence_summary": {
 "row_count_phase3": 649,
 "row_count_observed": 649,
 "row_count_bucket_phase3": ">20",
 "row_count_bucket_observed": ">20",
 "dataset_breakdown": [
 {
 "label": "lifestyle_risk_scatter",
 "row_count": 649,
 "sample_fields": [
 "student_id",
 "point_role",
 "is_current_student",
 "alcohol_weekday",
 "alcohol_weekend",
 "go_out_freq",
 "health_status",
 "family_relation",
 "free_time",
 "lifestyle_risk_score",
 "avg_score"
 ]
 }
 ],
 "full_query_datasets_sha256": "0828c79f895cd26cfcda8e968a2b61e35a4f596d329de2720365180442c8eba8"
 },
 "retrieval_log_summary": {
 "retrieval_request_complete": true,
 "retrieval_coverage_status": "full",
 "chunk_count": 1,
 "chunks": [
 {
 "chunk_id": "SAMPLE_UCI_POR__S-T09__task_aware_data_summarization__lifestyle_risk_scatter__chunk_1",
 "dataset_label": "lifestyle_risk_scatter",
 "row_start_inclusive": 0,
 "row_end_inclusive": 648,
 "row_count": 649,
 "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T09.json",
 "source_artifact_sha256": "ac1a70115e0a9941bcb6b44a7a70ee79c402ac36c1f083a8b20d42959fa648ca"
 }
 ]
 },
 "context_manifest_validation": {
 "direct_embedding_validation": null,
 "retrieval_validation": {
 "status": "pass",
 "retrieved_row_count": 649,
 "chunk_count": 1,
 "chunk_ids": [
 "SAMPLE_UCI_POR__S-T09__task_aware_data_summarization__lifestyle_risk_scatter__chunk_1"
 ],
 "row_ranges": [
 {
 "dataset_label": "lifestyle_risk_scatter",
 "row_start_inclusive": 0,
 "row_end_inclusive": 648,
 "row_count": 649
 }
 ],
 "issues": []
 },
 "deterministic_check_count": 5,
 "deterministic_check_failures": 0,
 "deterministic_check_types": [
 "row_count",
 "artifact_hash",
 "embedded_rows_hash",
 "numeric_field_extraction",
 "threshold_flag_detection"
 ]
 }
 },
 "explanation_to_judge": {
 "raw_text": "Summary: The analysis shows a weak negative correlation between Lifestyle Risk Score and Average Score. This suggests that as lifestyle risk increases, average scores tend to decrease slightly, indicating that healthier lifestyle choices may be linked to better academic performance.\n\nInsights: Weak Negative Correlation: The correlation coefficient of -0.1041 indicates a weak negative relationship between lifestyle risk and average scores. This means that higher lifestyle risk scores are generally associated with lower average scores, but the relationship is not strong.\n\nEducational implications: Students may benefit from reflecting on their lifestyle choices and how these could impact their academic performance.\n\nRecommendations: high - Encourage healthier lifestyle habits. - Promoting healthier habits could potentially improve academic performance, as indicated by the observed correlation.",
 "structured_payload": {
 "task_id": "S-T09",
 "execution_id": "exec_1781847244230_bdc094c9",
 "explanation": {
 "summary": "The analysis shows a weak negative correlation between Lifestyle Risk Score and Average Score. This suggests that as lifestyle risk increases, average scores tend to decrease slightly, indicating that healthier lifestyle choices may be linked to better academic performance.",
 "insights": [
 {
 "title": "Weak Negative Correlation",
 "description": "The correlation coefficient of -0.1041 indicates a weak negative relationship between lifestyle risk and average scores. This means that higher lifestyle risk scores are generally associated with lower average scores, but the relationship is not strong.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "lifestyle_risk_score",
 "value": "0.375",
 "comparison": "baseline",
 "delta": null,
 "context": "Selected student with a lifestyle risk score of 0.375 has an average score of 36.67."
 }
 ]
 }
 ],
 "educational_implications": [
 "Students may benefit from reflecting on their lifestyle choices and how these could impact their academic performance."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Encourage healthier lifestyle habits.",
 "rationale": "Promoting healthier habits could potentially improve academic performance, as indicated by the observed correlation."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is reliable, with a sufficient sample size for analysis.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "correlation",
 "explanation_type": "correlation",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "correlation_evidence",
 "ai_summary_method_warning": null,
 "full_result_row_count": 649,
 "included_row_count": 15,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "lifestyle_risk_scatter",
 "row_count": 649,
 "included_row_count": 15
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 15,
 "baseline_reference_tokens": 1620,
 "task_aware_prompt_tokens": 1863,
 "token_ratio": 1.15,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "trend_relationship",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "correlation_evidence",
 "task_id": "S-T09",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "lifestyle_risk_scatter",
 "row_count": 649,
 "x_column": "lifestyle_risk_score",
 "y_column": "avg_score",
 "entity_column": "student_id",
 "sample_size": 649,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "selected_entity_column": "is_current_student",
 "selected_entity_count": 1,
 "metric_units": {
 "lifestyle_risk_score": "index_0_1",
 "avg_score": "score_on_runtime_scale"
 },
 "metric_directions": {
 "lifestyle_risk_score": "higher_is_more_risk",
 "avg_score": "higher_is_better"
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "coefficient": -0.1041,
 "direction": "negative",
 "strength": "weak"
 }
 },
 {
 "name": "comparison",
 "facts": {
 "p_value": null,
 "selected_entity_evidence": [
 {
 "row_index": 648,
 "selected_column": "is_current_student",
 "selected_value": true,
 "is_valid_pair": true,
 "raw_values": {
 "lifestyle_risk_score": 0.375,
 "avg_score": 36.67
 },
 "lifestyle_risk_score": 0.375,
 "avg_score": 36.67,
 "cohort_context": {
 "coefficient": -0.1041,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "sample_size": 649,
 "direction": "negative",
 "strength": "weak",
 "strength_claim_allowed": true,
 "significance_claim_allowed": false,
 "causal_claim_allowed": false
 },
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "point_role": "Selected student",
 "label_context": {
 "point_role": "Selected student"
 },
 "sensitive_context": {
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 4,
 "health_status": 3,
 "family_relation": 4,
 "free_time": 3
 },
 "sensitive_context_policy": "descriptive_only",
 "claim_limit": "Sensitive/background context is descriptive only; do not infer causality or prescribe actions from it."
 }
 ]
 }
 },
 {
 "name": "trend_relationship",
 "facts": {
 "strength_claim_allowed": true,
 "significance_claim_allowed": false,
 "causal_claim_allowed": false
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "outliers": []
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_selected_entity_evidence": [],
 "parse_warnings": [],
 "statistical_warnings": [
 "No p-value evidence is available; statistical significance claims are not allowed."
 ],
 "sensitive_context_policy": "descriptive_only",
 "summarization_warnings": [
 "No p-value evidence is available; statistical significance claims are not allowed."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "correlation_evidence",
 "dataset_name": "lifestyle_risk_scatter",
 "row_count": 649,
 "x_column": "lifestyle_risk_score",
 "y_column": "avg_score",
 "entity_column": "student_id",
 "selected_entity_column": "is_current_student",
 "metric_units": {
 "lifestyle_risk_score": "index_0_1",
 "avg_score": "score_on_runtime_scale"
 },
 "metric_directions": {
 "lifestyle_risk_score": "higher_is_more_risk",
 "avg_score": "higher_is_better"
 },
 "coefficient": -0.1041,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "sample_size": 649,
 "p_value": null,
 "outliers": [],
 "selected_entity_evidence": [
 {
 "row_index": 648,
 "selected_column": "is_current_student",
 "selected_value": true,
 "is_valid_pair": true,
 "raw_values": {
 "lifestyle_risk_score": 0.375,
 "avg_score": 36.67
 },
 "lifestyle_risk_score": 0.375,
 "avg_score": 36.67,
 "cohort_context": {
 "coefficient": -0.1041,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "sample_size": 649,
 "direction": "negative",
 "strength": "weak",
 "strength_claim_allowed": true,
 "significance_claim_allowed": false,
 "causal_claim_allowed": false
 },
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "point_role": "Selected student",
 "label_context": {
 "point_role": "Selected student"
 },
 "sensitive_context": {
 "alcohol_weekday": 1,
 "alcohol_weekend": 1,
 "go_out_freq": 4,
 "health_status": 3,
 "family_relation": 4,
 "free_time": 3
 },
 "sensitive_context_policy": "descriptive_only",
 "claim_limit": "Sensitive/background context is descriptive only; do not infer causality or prescribe actions from it."
 }
 ],
 "missing_selected_entity_evidence": [],
 "selected_entity_count": 1,
 "sensitive_context_policy": "descriptive_only",
 "direction": "negative",
 "strength": "weak",
 "strength_claim_allowed": true,
 "significance_claim_allowed": false,
 "causal_claim_allowed": false,
 "parse_warnings": [],
 "statistical_warnings": [
 "No p-value evidence is available; statistical significance claims are not allowed."
 ],
 "summarization_warnings": [
 "No p-value evidence is available; statistical significance claims are not allowed."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5223,
 "token_usage": {
 "prompt_tokens": 2867,
 "completion_tokens": 328,
 "total_tokens": 3195
 },
 "strategy": "correlation",
 "granularity": "semester",
 "cost_usd": 0.000627
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "5a31e3c1d64b3c6f16f3d77dd6a0a2d94cec6dcfcc8307aedb1f68b9d5968ac5",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2867,
 "completion_tokens": 328,
 "total_tokens": 3195
 },
 "latency_ms": 5352,
 "attempts_used": 1
 }
 },
 "judge_instruction_boundary": {
 "do_not_assume_missing_rows_are_absent": true,
 "use_full_artifact_references_for_audit": true,
 "evaluate_claims_against_the_compact_evidence_and_recorded_artifact_provenance": true,
 "if_full_row_inspection_is_required_mark_the_record_for_manual_or_secondary_retrieval_review": true
 }
}
```
