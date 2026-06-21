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
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G13.json",
 "artifact_sha256": "397dfe683a1408e0b120cba9a71cfce6162d98f0fa9fbfdf6779ba6d21741dc1",
 "row_count": 649,
 "readable": true
 }
 ],
 "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_contexts/final_contexts/SAMPLE_UCI_POR__A-G13__task_aware_data_summarization.md",
 "final_context_sha256": "52dffb11075af8e4eff0d0ddd81ef56de4837168528de5532fcf434c2cbaf7a4",
 "judge_input_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_inputs/judge_inputs/SAMPLE_UCI_POR__A-G13__task_aware_data_summarization.json",
 "judge_input_sha256": "8d8328aa13b441dc1387fb70fa989558a76874ca07f0be53d6c2b0be7879eeee"
 },
 "record_identity": {
 "record_id": "SAMPLE_UCI_POR__A-G13__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "A-G13",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
 },
 "task_context": {
 "task_name": "Lifestyle risk across cohort",
 "scope": "Many students",
 "actionable_question": "Which lifestyle patterns are most common among low-performing students?",
 "target_audience": "academic_advisor",
 "ai_summary_type": "correlation_evidence",
 "ai_prompt_hint": "Rank students by lifestyle_risk_score. Correlate with avg_score. Frame as correlational, not prescriptive.",
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
 "lifestyle_risk_score [FE single]; avg_score [FE cross]"
 ],
 "output_schema": {
 "required_columns": [
 "student_id",
 "lifestyle_risk_score",
 "avg_score"
 ],
 "optional_columns": [
 "alcohol_weekday",
 "alcohol_weekend",
 "go_out_freq",
 "health_status"
 ]
 },
 "query_labels": [
 "lifestyle_risk_scatter"
 ]
 },
 "evaluation_requirements": {
 "required_core_outputs": [
 {
 "requirement_id": "A-G13-CORE-01",
 "description": "Rank students by lifestyle_risk_score."
 },
 {
 "requirement_id": "A-G13-CORE-02",
 "description": "Correlate with avg_score."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-G13-CONSTRAINT-01",
 "description": "Frame lifestyle-risk ranking as descriptive and correlational, not causal or deterministic."
 },
 {
 "constraint_id": "A-G13-CONSTRAINT-02",
 "description": "When listing students by lifestyle-risk rank, avoid language that implies individual blame."
 }
 ],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Applicable because the task ranks identifiable students using lifestyle context."
 },
 "derived_stat_evidence": [],
 "deterministic_checks": [
 {
 "check_type": "task_aware_shared_evidence_contract",
 "case_id": "SAMPLE_UCI_POR__A-G13",
 "task_id": "A-G13",
 "sidecar_sha256": "edbaa8f19c83cc80a7ab1055e078601c3f086bfaaf735e67e7a084a4d8045c94",
 "evidence": {
 "schema_version": "task_aware_shared_evidence_v1",
 "case_id": "SAMPLE_UCI_POR__A-G13",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "A-G13",
 "source_explanation_record_id": "SAMPLE_UCI_POR__A-G13__task_aware_data_summarization",
 "source_explanation_artifact_sha256": "0eb0a44eda6775a15aadc78ad5036cafb0b5a22d2549f4df7d0f668519f9b855",
 "deterministic_summary": {
 "summary_type": "correlation_evidence",
 "dataset_name": "lifestyle_risk_scatter",
 "row_count": 649,
 "x_column": "lifestyle_risk_score",
 "y_column": "avg_score",
 "entity_column": "student_id",
 "selected_entity_column": null,
 "metric_units": {},
 "metric_directions": {},
 "coefficient": -0.1041,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "sample_size": 649,
 "p_value": null,
 "outliers": [
 {
 "lifestyle_risk_score": 1,
 "avg_score": 33.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000501"
 },
 {
 "lifestyle_risk_score": 1,
 "avg_score": 33.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000280"
 },
 {
 "lifestyle_risk_score": 0.85,
 "avg_score": 45,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000448"
 },
 {
 "lifestyle_risk_score": 0.8,
 "avg_score": 11.67,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000441"
 },
 {
 "lifestyle_risk_score": 0.8,
 "avg_score": 50,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000231"
 },
 {
 "lifestyle_risk_score": 0.775,
 "avg_score": 43.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000101"
 },
 {
 "lifestyle_risk_score": 0.775,
 "avg_score": 43.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000531"
 },
 {
 "lifestyle_risk_score": 0.775,
 "avg_score": 50,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000648"
 },
 {
 "lifestyle_risk_score": 0.75,
 "avg_score": 38.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000264"
 },
 {
 "lifestyle_risk_score": 0.75,
 "avg_score": 45,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000503"
 }
 ],
 "selected_entity_evidence": [],
 "missing_selected_entity_evidence": [],
 "selected_entity_count": 0,
 "sensitive_context_policy": null,
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
 "task_id": "A-G13",
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
 "selected_entity_column": null,
 "selected_entity_count": 0,
 "metric_units": {},
 "metric_directions": {}
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
 "selected_entity_evidence": []
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
 "outliers": [
 {
 "lifestyle_risk_score": 1,
 "avg_score": 33.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000501"
 },
 {
 "lifestyle_risk_score": 1,
 "avg_score": 33.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000280"
 },
 {
 "lifestyle_risk_score": 0.85,
 "avg_score": 45,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000448"
 },
 {
 "lifestyle_risk_score": 0.8,
 "avg_score": 11.67,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000441"
 },
 {
 "lifestyle_risk_score": 0.8,
 "avg_score": 50,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000231"
 },
 {
 "lifestyle_risk_score": 0.775,
 "avg_score": 43.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000101"
 },
 {
 "lifestyle_risk_score": 0.775,
 "avg_score": 43.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000531"
 },
 {
 "lifestyle_risk_score": 0.775,
 "avg_score": 50,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000648"
 },
 {
 "lifestyle_risk_score": 0.75,
 "avg_score": 38.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000264"
 },
 {
 "lifestyle_risk_score": 0.75,
 "avg_score": 45,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000503"
 }
 ]
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
 "sensitive_context_policy": null,
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
 "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_inputs/retrieval_logs/SAMPLE_UCI_POR__A-G13__task_aware_data_summarization.json",
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
 "alcohol_weekday",
 "alcohol_weekend",
 "go_out_freq",
 "health_status",
 "lifestyle_risk_score",
 "avg_score"
 ]
 }
 ],
 "full_query_datasets_sha256": "3c3f70751048a387d4ce08641a8fbebc6c645b9ae2606006e285da511dc3d0a0"
 },
 "retrieval_log_summary": {
 "retrieval_request_complete": true,
 "retrieval_coverage_status": "full",
 "chunk_count": 1,
 "chunks": [
 {
 "chunk_id": "SAMPLE_UCI_POR__A-G13__task_aware_data_summarization__lifestyle_risk_scatter__chunk_1",
 "dataset_label": "lifestyle_risk_scatter",
 "row_start_inclusive": 0,
 "row_end_inclusive": 648,
 "row_count": 649,
 "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G13.json",
 "source_artifact_sha256": "397dfe683a1408e0b120cba9a71cfce6162d98f0fa9fbfdf6779ba6d21741dc1"
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
 "SAMPLE_UCI_POR__A-G13__task_aware_data_summarization__lifestyle_risk_scatter__chunk_1"
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
 "raw_text": "Summary: The analysis reveals a weak negative correlation (coefficient = -0.1041) between Lifestyle Risk Score and Average Score, indicating that as the Lifestyle Risk Score increases, the Average Score tends to decrease slightly. This suggests that higher lifestyle risks may be associated with lower academic performance among students.\n\nInsights: Weak Negative Correlation: The correlation coefficient of -0.1041 indicates a weak negative relationship between Lifestyle Risk Score and Average Score, suggesting that students with higher lifestyle risk scores tend to have lower average scores.\n\nEducational implications: Students with higher lifestyle risks may require additional support to improve their academic performance.\n\nRecommendations: high - Implement targeted interventions for students with high lifestyle risk scores. - To address the potential impact of lifestyle risks on academic performance and support student success.",
 "structured_payload": {
 "task_id": "A-G13",
 "execution_id": "exec_1781847232759_b13bae36",
 "explanation": {
 "summary": "The analysis reveals a weak negative correlation (coefficient = -0.1041) between Lifestyle Risk Score and Average Score, indicating that as the Lifestyle Risk Score increases, the Average Score tends to decrease slightly. This suggests that higher lifestyle risks may be associated with lower academic performance among students.",
 "insights": [
 {
 "title": "Weak Negative Correlation",
 "description": "The correlation coefficient of -0.1041 indicates a weak negative relationship between Lifestyle Risk Score and Average Score, suggesting that students with higher lifestyle risk scores tend to have lower average scores.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "correlation_coefficient",
 "value": -0.1041,
 "comparison": "baseline",
 "delta": null,
 "context": "Weak negative correlation observed"
 }
 ]
 }
 ],
 "educational_implications": [
 "Students with higher lifestyle risks may require additional support to improve their academic performance."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted interventions for students with high lifestyle risk scores.",
 "rationale": "To address the potential impact of lifestyle risks on academic performance and support student success."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The dataset contains a sufficient number of rows (649) for reliable correlation analysis.",
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
 "baseline_reference_tokens": 1070,
 "task_aware_prompt_tokens": 1465,
 "token_ratio": 1.3692,
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
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (1.3692 > 1.2)."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "correlation_evidence",
 "task_id": "A-G13",
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
 "selected_entity_column": null,
 "selected_entity_count": 0,
 "metric_units": {},
 "metric_directions": {}
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
 "selected_entity_evidence": []
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
 "outliers": [
 {
 "lifestyle_risk_score": 1,
 "avg_score": 33.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000501"
 },
 {
 "lifestyle_risk_score": 1,
 "avg_score": 33.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000280"
 },
 {
 "lifestyle_risk_score": 0.85,
 "avg_score": 45,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000448"
 },
 {
 "lifestyle_risk_score": 0.8,
 "avg_score": 11.67,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000441"
 },
 {
 "lifestyle_risk_score": 0.8,
 "avg_score": 50,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000231"
 },
 {
 "lifestyle_risk_score": 0.775,
 "avg_score": 43.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000101"
 },
 {
 "lifestyle_risk_score": 0.775,
 "avg_score": 43.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000531"
 },
 {
 "lifestyle_risk_score": 0.775,
 "avg_score": 50,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000648"
 },
 {
 "lifestyle_risk_score": 0.75,
 "avg_score": 38.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000264"
 },
 {
 "lifestyle_risk_score": 0.75,
 "avg_score": 45,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000503"
 }
 ]
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
 "sensitive_context_policy": null,
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
 "selected_entity_column": null,
 "metric_units": {},
 "metric_directions": {},
 "coefficient": -0.1041,
 "coefficient_method": "pearson",
 "coefficient_source": "derived_from_pairs",
 "sample_size": 649,
 "p_value": null,
 "outliers": [
 {
 "lifestyle_risk_score": 1,
 "avg_score": 33.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000501"
 },
 {
 "lifestyle_risk_score": 1,
 "avg_score": 33.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000280"
 },
 {
 "lifestyle_risk_score": 0.85,
 "avg_score": 45,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000448"
 },
 {
 "lifestyle_risk_score": 0.8,
 "avg_score": 11.67,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000441"
 },
 {
 "lifestyle_risk_score": 0.8,
 "avg_score": 50,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000231"
 },
 {
 "lifestyle_risk_score": 0.775,
 "avg_score": 43.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000101"
 },
 {
 "lifestyle_risk_score": 0.775,
 "avg_score": 43.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000531"
 },
 {
 "lifestyle_risk_score": 0.775,
 "avg_score": 50,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000648"
 },
 {
 "lifestyle_risk_score": 0.75,
 "avg_score": 38.33,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000264"
 },
 {
 "lifestyle_risk_score": 0.75,
 "avg_score": 45,
 "policy": "high_x_low_y",
 "student_id": "SAMPLE_UCI_POR_STU_000503"
 }
 ],
 "selected_entity_evidence": [],
 "missing_selected_entity_evidence": [],
 "selected_entity_count": 0,
 "sensitive_context_policy": null,
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
 "latency_ms": 4455,
 "token_usage": {
 "prompt_tokens": 2479,
 "completion_tokens": 323,
 "total_tokens": 2802
 },
 "strategy": "correlation",
 "granularity": "semester",
 "cost_usd": 0.000566
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-G13__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "0eb0a44eda6775a15aadc78ad5036cafb0b5a22d2549f4df7d0f668519f9b855",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2479,
 "completion_tokens": 323,
 "total_tokens": 2802
 },
 "latency_ms": 4592,
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
