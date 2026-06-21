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
 "dataset_label": "family_context_scatter",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T15.json",
 "artifact_sha256": "9a45d1b72a483a01ab7c106e9b4421e7c4343e3515027c15b9328219dcd52fc0",
 "row_count": 649,
 "readable": true
 }
 ],
 "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_contexts/final_contexts/SAMPLE_UCI_POR__S-T15__baseline_first_20_rows.md",
 "final_context_sha256": "7b930dcf21e8bad0dc9713366471f075eb1391fcb78d7ead6456b86b469076cf",
 "judge_input_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_inputs/judge_inputs/SAMPLE_UCI_POR__S-T15__baseline_first_20_rows.json",
 "judge_input_sha256": "c6ded30062fd7709ca0618cd4471bee0fa1415b6578ffcbec1cad1d85d6c3521"
 },
 "record_identity": {
 "record_id": "SAMPLE_UCI_POR__S-T15__baseline_first_20_rows",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "S-T15",
 "explanation_mode": "baseline_first_20_rows",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
 },
 "task_context": {
 "task_name": "Family context vs performance",
 "scope": "1 student + cohort context",
 "actionable_question": "How might my family background be reflected in my academic patterns?",
 "target_audience": "student",
 "ai_summary_type": "correlation_evidence",
 "ai_prompt_hint": "Compare the selected student against the class family-context scatter. Highlight the student's position and any cohort-level association between family_stability_score and avg_score. Frame findings as associative, not causal, and avoid prescriptive suggestions.",
 "query_labels": [
 "family_context_scatter"
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
 "family_stability_score [FE single]",
 "avg_score [FE cross]",
 "family_relation",
 "parent_cohabitation_status",
 "mother/father_education_level"
 ],
 "output_schema": {
 "required_columns": [
 "student_id",
 "point_role",
 "family_stability_score",
 "avg_score"
 ],
 "optional_columns": [
 "is_current_student",
 "family_relation",
 "parent_cohabitation_status",
 "mother_education_level",
 "father_education_level"
 ]
 },
 "query_labels": [
 "family_context_scatter"
 ]
 },
 "evaluation_requirements": {
 "required_core_outputs": [
 {
 "requirement_id": "S-T15-CORE-01",
 "description": "Compare the selected student against the class family-context scatter."
 },
 {
 "requirement_id": "S-T15-CORE-02",
 "description": "Highlight the student's position and any cohort-level association between family_stability_score and avg_score."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "S-T15-CONSTRAINT-01",
 "description": "Frame findings as associative, not causal, and avoid prescriptive suggestions."
 }
 ],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
 },
 "derived_stat_evidence": [],
 "deterministic_checks": [
 {
 "check_type": "task_aware_shared_evidence_contract",
 "case_id": "SAMPLE_UCI_POR__S-T15",
 "task_id": "S-T15",
 "sidecar_sha256": "e7e76325e1c914f011e0df87188dc4fd9175016d11b5a0cfac502e71303d4f29",
 "evidence": {
 "schema_version": "task_aware_shared_evidence_v1",
 "case_id": "SAMPLE_UCI_POR__S-T15",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "S-T15",
 "source_explanation_record_id": "SAMPLE_UCI_POR__S-T15__task_aware_data_summarization",
 "source_explanation_artifact_sha256": "fc54e755bfa2c94bec69f543ab194441a5e0d2805fa924cfc65680a9a6567a27",
 "deterministic_summary": {
 "summary_type": "correlation_evidence",
 "dataset_name": "family_context_scatter",
 "row_count": 649,
 "x_column": "family_stability_score",
 "y_column": "avg_score",
 "entity_column": "student_id",
 "selected_entity_column": "is_current_student",
 "metric_units": {
 "family_stability_score": "index_0_1",
 "avg_score": "score_on_runtime_scale"
 },
 "metric_directions": {
 "family_stability_score": "context_metric",
 "avg_score": "higher_is_better"
 },
 "coefficient": 0.1442,
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
 "family_stability_score": 0.575,
 "avg_score": 36.67
 },
 "family_stability_score": 0.575,
 "avg_score": 36.67,
 "cohort_context": {
 "coefficient": 0.1442,
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
 "family_relation": 4,
 "parent_cohabitation_status": "A",
 "mother_education_level": "4",
 "father_education_level": "4"
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
 "task_id": "S-T15",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "family_context_scatter",
 "row_count": 649,
 "x_column": "family_stability_score",
 "y_column": "avg_score",
 "entity_column": "student_id",
 "sample_size": 649,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "selected_entity_column": "is_current_student",
 "selected_entity_count": 1,
 "metric_units": {
 "family_stability_score": "index_0_1",
 "avg_score": "score_on_runtime_scale"
 },
 "metric_directions": {
 "family_stability_score": "context_metric",
 "avg_score": "higher_is_better"
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "coefficient": 0.1442,
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
 "family_stability_score": 0.575,
 "avg_score": 36.67
 },
 "family_stability_score": 0.575,
 "avg_score": 36.67,
 "cohort_context": {
 "coefficient": 0.1442,
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
 "family_relation": 4,
 "parent_cohabitation_status": "A",
 "mother_education_level": "4",
 "father_education_level": "4"
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
 "family_context_scatter": 649
 },
 "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_inputs/retrieval_logs/SAMPLE_UCI_POR__S-T15__baseline_first_20_rows.json",
 "retrieval_coverage_status": "full",
 "full_access_available": true,
 "deterministic_scan_scope": "full_query_artifact_all_rows",
 "deterministic_scan_row_count_by_dataset": {
 "family_context_scatter": 649
 },
 "full_result_sent_to_llm": false,
 "evidence_summary": {
 "row_count_phase3": 649,
 "row_count_observed": 649,
 "row_count_bucket_phase3": ">20",
 "row_count_bucket_observed": ">20",
 "dataset_breakdown": [
 {
 "label": "family_context_scatter",
 "row_count": 649,
 "sample_fields": [
 "student_id",
 "point_role",
 "is_current_student",
 "family_relation",
 "parent_cohabitation_status",
 "mother_education_level",
 "father_education_level",
 "family_stability_score",
 "avg_score"
 ]
 }
 ],
 "full_query_datasets_sha256": "99e4dae3b30686e0e3a61c1dbb3bac038e2a25c1477640d389992478830186eb"
 },
 "retrieval_log_summary": {
 "retrieval_request_complete": true,
 "retrieval_coverage_status": "full",
 "chunk_count": 1,
 "chunks": [
 {
 "chunk_id": "SAMPLE_UCI_POR__S-T15__baseline_first_20_rows__family_context_scatter__chunk_1",
 "dataset_label": "family_context_scatter",
 "row_start_inclusive": 0,
 "row_end_inclusive": 648,
 "row_count": 649,
 "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T15.json",
 "source_artifact_sha256": "9a45d1b72a483a01ab7c106e9b4421e7c4343e3515027c15b9328219dcd52fc0"
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
 "SAMPLE_UCI_POR__S-T15__baseline_first_20_rows__family_context_scatter__chunk_1"
 ],
 "row_ranges": [
 {
 "dataset_label": "family_context_scatter",
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
 "raw_text": "Summary: The analysis shows a negative correlation between Family Stability Score and Average Score, indicating that as the Family Stability Score decreases, the Average Score tends to increase. This suggests that students with lower family stability may be performing better academically, which is an interesting pattern to consider.\n\nInsights: Negative Correlation Observed: There is a noticeable trend where students with a Family Stability Score of 1 tend to have varying Average Scores, with some achieving higher scores despite the low stability. This indicates a weak negative correlation.\n\nEducational implications: Understanding the dynamics of family stability can help educators support students in diverse situations.\n\nRecommendations: high - Explore individual student circumstances - By understanding each student's background, educators can tailor support to enhance academic performance.",
 "structured_payload": {
 "task_id": "S-T15",
 "execution_id": "exec_1781847244502_94744bd5",
 "explanation": {
 "summary": "The analysis shows a negative correlation between Family Stability Score and Average Score, indicating that as the Family Stability Score decreases, the Average Score tends to increase. This suggests that students with lower family stability may be performing better academically, which is an interesting pattern to consider.",
 "insights": [
 {
 "title": "Negative Correlation Observed",
 "description": "There is a noticeable trend where students with a Family Stability Score of 1 tend to have varying Average Scores, with some achieving higher scores despite the low stability. This indicates a weak negative correlation.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "family_stability_score",
 "value": 1,
 "comparison": "baseline",
 "delta": null,
 "context": "Students with a Family Stability Score of 1 show a range of Average Scores from 23.33 to 86.67."
 }
 ]
 }
 ],
 "educational_implications": [
 "Understanding the dynamics of family stability can help educators support students in diverse situations."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Explore individual student circumstances",
 "rationale": "By understanding each student's background, educators can tailor support to enhance academic performance."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The dataset is comprehensive with 649 rows, providing a solid basis for correlation analysis.",
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
 "latency_ms": 8562,
 "token_usage": {
 "prompt_tokens": 2516,
 "completion_tokens": 332,
 "total_tokens": 2848
 },
 "strategy": "correlation",
 "granularity": "semester",
 "cost_usd": 0.000577
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T15__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "8d5168c0046b8959c00b67e337e0b0f0f3f66b7faf412200602e15bd50ae7d9d",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "baseline_first_20_rows",
 "observed_ai_summary_method": "baseline_first_20_rows",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2516,
 "completion_tokens": 332,
 "total_tokens": 2848
 },
 "latency_ms": 8569,
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
