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
 "dataset_label": "social_balance_scatter",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T14.json",
 "artifact_sha256": "a8efc8a5a1bdaaba7b3e423a3a55186922980fc83b1f32258aef8c20d65aef28",
 "row_count": 649,
 "readable": true
 }
 ],
 "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_contexts/final_contexts/SAMPLE_UCI_POR__S-T14__baseline_first_20_rows.md",
 "final_context_sha256": "f0c096c53b305f024fb8e69ce5488598dca58c3b2a075d05b5e5299604cb2689",
 "judge_input_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_inputs/judge_inputs/SAMPLE_UCI_POR__S-T14__baseline_first_20_rows.json",
 "judge_input_sha256": "d7a3f955b18c09eb97dea8ff6c556f28cd596aeec4084e2dc98cf2c4dc93cc25"
 },
 "record_identity": {
 "record_id": "SAMPLE_UCI_POR__S-T14__baseline_first_20_rows",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "S-T14",
 "explanation_mode": "baseline_first_20_rows",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
 },
 "task_context": {
 "task_name": "Social balance vs performance",
 "scope": "1 student + cohort context",
 "actionable_question": "Is my social life balanced with my academic commitments?",
 "target_audience": "student",
 "ai_summary_type": "correlation_evidence",
 "ai_prompt_hint": "Compare the selected student against the class social-balance scatter. Highlight the student's position and any cohort-level association between social_balance_score and avg_score. Frame as correlation, not causation.",
 "query_labels": [
 "social_balance_scatter"
 ],
 "explanation_strategy": "correlation"
 },
 "schema_context": {
 "source_tables": [
 "student",
 "assessment_result",
 "assessment [UCI only]"
 ],
 "key_db_fields": [
 "social_balance_score [FE single]",
 "avg_score [FE cross]",
 "free_time",
 "go_out_freq",
 "alcohol_weekday"
 ],
 "output_schema": {
 "required_columns": [
 "student_id",
 "point_role",
 "social_balance_score",
 "avg_score"
 ],
 "optional_columns": [
 "is_current_student",
 "free_time",
 "go_out_freq",
 "alcohol_weekday",
 "alcohol_weekend"
 ]
 },
 "query_labels": [
 "social_balance_scatter"
 ]
 },
 "evaluation_requirements": {
 "required_core_outputs": [
 {
 "requirement_id": "S-T14-CORE-01",
 "description": "Compare the selected student against the class social-balance scatter."
 },
 {
 "requirement_id": "S-T14-CORE-02",
 "description": "Highlight the student's position and any cohort-level association between social_balance_score and avg_score."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "S-T14-CONSTRAINT-01",
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
 "case_id": "SAMPLE_UCI_POR__S-T14",
 "task_id": "S-T14",
 "sidecar_sha256": "f95e2a34ed28a3b76a13324283fab157eca14345b09e312c10e2ff2542ef0926",
 "evidence": {
 "schema_version": "task_aware_shared_evidence_v1",
 "case_id": "SAMPLE_UCI_POR__S-T14",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "S-T14",
 "source_explanation_record_id": "SAMPLE_UCI_POR__S-T14__task_aware_data_summarization",
 "source_explanation_artifact_sha256": "542cb4e13dde53d4756107083a3aed0793f0989ab7da1afb58fd4cd65222abc5",
 "deterministic_summary": {
 "summary_type": "correlation_evidence",
 "dataset_name": "social_balance_scatter",
 "row_count": 649,
 "x_column": "social_balance_score",
 "y_column": "avg_score",
 "entity_column": "student_id",
 "selected_entity_column": "is_current_student",
 "metric_units": {
 "social_balance_score": "index_0_1",
 "avg_score": "score_on_runtime_scale"
 },
 "metric_directions": {
 "social_balance_score": "context_metric",
 "avg_score": "higher_is_better"
 },
 "coefficient": 0.0144,
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
 "social_balance_score": 0.025,
 "avg_score": 36.67
 },
 "social_balance_score": 0.025,
 "avg_score": 36.67,
 "cohort_context": {
 "coefficient": 0.0144,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "sample_size": 649,
 "direction": "positive",
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
 "free_time": 3,
 "go_out_freq": 4,
 "alcohol_weekday": 1,
 "alcohol_weekend": 1
 },
 "sensitive_context_policy": "descriptive_only",
 "claim_limit": "Sensitive/background context is descriptive only; do not infer causality or prescribe actions from it."
 }
 ],
 "missing_selected_entity_evidence": [],
 "selected_entity_count": 1,
 "sensitive_context_policy": "descriptive_only",
 "direction": "positive",
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
 "task_id": "S-T14",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "social_balance_scatter",
 "row_count": 649,
 "x_column": "social_balance_score",
 "y_column": "avg_score",
 "entity_column": "student_id",
 "sample_size": 649,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "selected_entity_column": "is_current_student",
 "selected_entity_count": 1,
 "metric_units": {
 "social_balance_score": "index_0_1",
 "avg_score": "score_on_runtime_scale"
 },
 "metric_directions": {
 "social_balance_score": "context_metric",
 "avg_score": "higher_is_better"
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "coefficient": 0.0144,
 "direction": "positive",
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
 "social_balance_score": 0.025,
 "avg_score": 36.67
 },
 "social_balance_score": 0.025,
 "avg_score": 36.67,
 "cohort_context": {
 "coefficient": 0.0144,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "sample_size": 649,
 "direction": "positive",
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
 "free_time": 3,
 "go_out_freq": 4,
 "alcohol_weekday": 1,
 "alcohol_weekend": 1
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
 "social_balance_scatter": 649
 },
 "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_inputs/retrieval_logs/SAMPLE_UCI_POR__S-T14__baseline_first_20_rows.json",
 "retrieval_coverage_status": "full",
 "full_access_available": true,
 "deterministic_scan_scope": "full_query_artifact_all_rows",
 "deterministic_scan_row_count_by_dataset": {
 "social_balance_scatter": 649
 },
 "full_result_sent_to_llm": false,
 "evidence_summary": {
 "row_count_phase3": 649,
 "row_count_observed": 649,
 "row_count_bucket_phase3": ">20",
 "row_count_bucket_observed": ">20",
 "dataset_breakdown": [
 {
 "label": "social_balance_scatter",
 "row_count": 649,
 "sample_fields": [
 "student_id",
 "point_role",
 "is_current_student",
 "free_time",
 "go_out_freq",
 "alcohol_weekday",
 "alcohol_weekend",
 "social_balance_score",
 "avg_score"
 ]
 }
 ],
 "full_query_datasets_sha256": "73a9b71005a4c900d8f448dbd363e738cc480183ef3584e7d662bdf6ac7d772e"
 },
 "retrieval_log_summary": {
 "retrieval_request_complete": true,
 "retrieval_coverage_status": "full",
 "chunk_count": 1,
 "chunks": [
 {
 "chunk_id": "SAMPLE_UCI_POR__S-T14__baseline_first_20_rows__social_balance_scatter__chunk_1",
 "dataset_label": "social_balance_scatter",
 "row_start_inclusive": 0,
 "row_end_inclusive": 648,
 "row_count": 649,
 "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T14.json",
 "source_artifact_sha256": "a8efc8a5a1bdaaba7b3e423a3a55186922980fc83b1f32258aef8c20d65aef28"
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
 "SAMPLE_UCI_POR__S-T14__baseline_first_20_rows__social_balance_scatter__chunk_1"
 ],
 "row_ranges": [
 {
 "dataset_label": "social_balance_scatter",
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
 "raw_text": "Summary: There appears to be a positive correlation between Social Balance Score and Average Score, suggesting that students with a more balanced social life tend to perform better academically. This relationship indicates that maintaining a healthy social life may support your academic success.\n\nInsights: Positive Correlation Observed: As the Social Balance Score increases, the Average Score also tends to increase, indicating a positive relationship. This suggests that students who manage their social activities well may achieve higher academic performance.\n\nEducational implications: Balancing social activities with academic responsibilities may enhance overall performance.\n\nRecommendations: high - Engage in social activities that promote collaboration and study groups. - Participating in social activities can help you build relationships that support your learning and academic success.",
 "structured_payload": {
 "task_id": "S-T14",
 "execution_id": "exec_1781847244450_82431706",
 "explanation": {
 "summary": "There appears to be a positive correlation between Social Balance Score and Average Score, suggesting that students with a more balanced social life tend to perform better academically. This relationship indicates that maintaining a healthy social life may support your academic success.",
 "insights": [
 {
 "title": "Positive Correlation Observed",
 "description": "As the Social Balance Score increases, the Average Score also tends to increase, indicating a positive relationship. This suggests that students who manage their social activities well may achieve higher academic performance.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "social_balance_score",
 "value": 0.5,
 "comparison": "baseline",
 "delta": null,
 "context": "Average scores vary significantly among students with this score."
 }
 ]
 }
 ],
 "educational_implications": [
 "Balancing social activities with academic responsibilities may enhance overall performance."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Engage in social activities that promote collaboration and study groups.",
 "rationale": "Participating in social activities can help you build relationships that support your learning and academic success."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The dataset is robust with 649 rows, providing a strong basis for correlation analysis.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "correlation",
 "explanation_type": "correlation",
 "ai_summary_method": "baseline_first_20_rows",
 "ai_summary_version": "baseline",
 "baseline_available": true,
 "input_summary_type": "raw_first_20_rows",
 "ai_summary_method_warning": null,
 "full_result_row_count": null,
 "included_row_count": null,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [],
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 6317,
 "token_usage": {
 "prompt_tokens": 2476,
 "completion_tokens": 314,
 "total_tokens": 2790
 },
 "strategy": "correlation",
 "granularity": "semester",
 "cost_usd": 0.00056
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T14__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "b4519f59ea216eb1dcea9e2954e98b220de7044018d10a0d74c7d1c0aee6d253",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "baseline_first_20_rows",
 "observed_ai_summary_method": "baseline_first_20_rows",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2476,
 "completion_tokens": 314,
 "total_tokens": 2790
 },
 "latency_ms": 6326,
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
