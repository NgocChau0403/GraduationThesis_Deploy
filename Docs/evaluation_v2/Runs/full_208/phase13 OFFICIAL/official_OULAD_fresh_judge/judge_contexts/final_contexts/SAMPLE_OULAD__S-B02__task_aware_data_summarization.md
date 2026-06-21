# LLM Judge Final Judge Context - SAMPLE_OULAD__S-B02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__S-B02__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "S-B02",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Risk status card",
 "scope": "1 student",
 "actionable_question": "Am I at risk of failing?",
 "target_audience": "student",
 "ai_summary_type": "metric_snapshot",
 "ai_prompt_hint": "State the risk badge (low/medium/high) and at_risk_score out of 5. Use avg_score, pass_threshold, engagement_score, and punctuality_rate when available. If risk is high, name the top 2 likely triggered factors from returned metrics only.",
 "query_labels": [
 "risk_summary"
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
 "at_risk_score [FE]",
 "at_risk_label [FE]; punctuality_rate [FE cross] (OULAD: submission_day/due_day; UCI: 1−absences_rate)"
 ],
 "output_schema": {
 "required_columns": [
 "avg_score",
 "at_risk_score",
 "at_risk_label"
 ],
 "optional_columns": [
 "engagement_score",
 "engagement_score_available",
 "punctuality_rate",
 "previous_attempt_count",
 "score_strategy",
 "score_scale",
 "pass_threshold",
 "target_threshold"
 ]
 },
 "query_labels": [
 "risk_summary"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "S-B02-CORE-01",
 "description": "State the risk badge (low/medium/high) and at_risk_score out of 5."
 }
 ],
 "required_supporting_outputs": [
 {
 "requirement_id": "S-B02-SUPPORT-01",
 "description": "Use avg_score, pass_threshold, engagement_score, and punctuality_rate when available."
 },
 {
 "requirement_id": "S-B02-SUPPORT-02",
 "description": "If risk is high, name the top 2 likely triggered factors from returned metrics only."
 }
 ],
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
 "dataset_label": "risk_summary",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-B02.json",
 "artifact_sha256": "c23bd0d1b26a55e95142a9decd7fe4d429263519bdb5fb7ff689e284a0912f4f",
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
 "evidence_artifact_file_sha256": "c23bd0d1b26a55e95142a9decd7fe4d429263519bdb5fb7ff689e284a0912f4f",
 "evidence_rows_sha256": "67376816be15879f37814086f5600cb56dd41f7a30168794cf7f64308e09fb5d",
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
 "embedded_datasets_sha256": "67376816be15879f37814086f5600cb56dd41f7a30168794cf7f64308e09fb5d",
 "datasets": {
 "risk_summary": [
 {
 "avg_score": 94.34,
 "engagement_score": 0.20237855036820618,
 "engagement_score_available": true,
 "punctuality_rate": 0,
 "previous_attempt_count": 1,
 "score_strategy": "weighted_by_assessment_weight",
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "at_risk_score": 3,
 "at_risk_label": "high"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-B02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "571f8722ab258c42e9e608036984926286eb5672baef0a1e38470e95240b982d",
 "generator_input_sha256": "0ba5edceb145743582a1807bdcc4d87cc10678350e3f6405bbac6dbb9fa178f7",
 "generator_input_compact": {
 "task_id": "S-B02",
 "execution_id": "exec_1781847857491_7eb409b0",
 "task_name": "Risk status card",
 "analysis_type": "aggregation",
 "explanation_strategy": "risk",
 "actionable_question": "Am I at risk of failing?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "risk_summary"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "risk_summary"
 ],
 "dataset_row_counts": {
 "risk_summary": 1
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
 "require_sensitive_context_policy": false,
 "require_complete_action_provenance": true
 }
 }
}
```

## AI Explanation To Judge

```json
{
 "raw_text": "Summary: You are currently identified as being at high risk of failing, with an at-risk score of 3 out of 5. This is primarily due to low engagement and punctuality issues.\n\nInsights: Low Engagement Score: Your engagement score is quite low at 0.20, which indicates that you may not be participating fully in your learning activities. This can significantly impact your understanding and performance. | Punctuality Concerns: Your punctuality rate is at 0, meaning you may not be submitting assignments or attending classes on time. This can lead to missed opportunities for learning and support.\n\nEducational implications: Improving engagement and punctuality can lead to better academic outcomes.\n\nRecommendations: high - Increase participation in class and complete assignments on time. - Active engagement and timely submissions are key to improving your understanding and performance. | medium - Seek help from teachers or peers if you're struggling. - Getting support can help you overcome challenges and improve your engagement.",
 "structured_payload": {
 "task_id": "S-B02",
 "execution_id": "exec_1781847857491_7eb409b0",
 "explanation": {
 "summary": "You are currently identified as being at high risk of failing, with an at-risk score of 3 out of 5. This is primarily due to low engagement and punctuality issues.",
 "insights": [
 {
 "title": "Low Engagement Score",
 "description": "Your engagement score is quite low at 0.20, which indicates that you may not be participating fully in your learning activities. This can significantly impact your understanding and performance.",
 "severity": "high",
 "evidence": [
 {
 "metric": "engagement_score",
 "value": 0.20237855036820618,
 "comparison": "down_from_previous",
 "delta": null,
 "context": "Engagement is crucial for success."
 }
 ]
 },
 {
 "title": "Punctuality Concerns",
 "description": "Your punctuality rate is at 0, meaning you may not be submitting assignments or attending classes on time. This can lead to missed opportunities for learning and support.",
 "severity": "high",
 "evidence": [
 {
 "metric": "punctuality_rate",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "Timeliness is important for academic success."
 }
 ]
 }
 ],
 "educational_implications": [
 "Improving engagement and punctuality can lead to better academic outcomes."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Increase participation in class and complete assignments on time.",
 "rationale": "Active engagement and timely submissions are key to improving your understanding and performance."
 },
 {
 "priority": "medium",
 "action": "Seek help from teachers or peers if you're struggling.",
 "rationale": "Getting support can help you overcome challenges and improve your engagement."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is sufficient and indicates clear risk factors.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "risk",
 "explanation_type": "risk",
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
 "dataset_name": "risk_summary",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 99,
 "task_aware_prompt_tokens": 806,
 "token_ratio": 8.1414,
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
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (8.1414 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "metric_snapshot",
 "task_id": "S-B02",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "risk_summary",
 "row_count": 1,
 "entity": null,
 "evidence_status": "sufficient"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "metric_snapshot": {
 "avg_score": {
 "value": 94.34,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "engagement_score": {
 "value": 0.20237855036820618,
 "unit": "ratio_0_1",
 "available": true,
 "availability_column": "engagement_score_available",
 "availability_value": true
 },
 "punctuality_rate": {
 "value": 0,
 "unit": "ratio_0_1",
 "available": true
 },
 "previous_attempt_count": {
 "value": 1,
 "unit": "count",
 "available": true
 },
 "at_risk_score": {
 "value": 3,
 "unit": "triggered_flag_count_0_5",
 "available": true
 }
 },
 "status_evidence": {
 "engagement_score_available": true,
 "score_strategy": "weighted_by_assessment_weight",
 "at_risk_label": "high"
 },
 "label_evidence": {
 "score_scale": 100
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "threshold_evidence": {
 "pass_threshold": {
 "value": 40,
 "unit": "score_on_runtime_scale",
 "source": "runtime_score_context"
 },
 "target_threshold": {
 "value": 70,
 "unit": "score_on_runtime_scale",
 "source": "runtime_score_context"
 }
 },
 "benchmark_evidence": {}
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flag_evidence": {},
 "sensitive_context_present": false,
 "sensitive_context": {}
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
 "engagement_score",
 "punctuality_rate",
 "previous_attempt_count",
 "at_risk_score"
 ],
 "configured_status_columns": [
 "engagement_score_available",
 "score_strategy",
 "at_risk_label"
 ],
 "configured_threshold_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "configured_benchmark_columns": [],
 "configured_sensitive_columns": [],
 "metric_availability_columns": {
 "engagement_score": "engagement_score_available"
 },
 "metric_units": {
 "avg_score": "score_on_runtime_scale",
 "engagement_score": "ratio_0_1",
 "punctuality_rate": "ratio_0_1",
 "previous_attempt_count": "count",
 "at_risk_score": "triggered_flag_count_0_5",
 "pass_threshold": "score_on_runtime_scale",
 "target_threshold": "score_on_runtime_scale"
 },
 "threshold_sources": {
 "pass_threshold": "runtime_score_context",
 "target_threshold": "runtime_score_context"
 },
 "benchmark_sources": {},
 "sensitive_context_policy": null,
 "missing_required_columns": [],
 "missing_unit_metadata": [],
 "missing_threshold_sources": [],
 "missing_benchmark_sources": [],
 "errors": []
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "metric_snapshot",
 "dataset_name": "risk_summary",
 "row_count": 1,
 "entity": null,
 "metric_snapshot": {
 "avg_score": {
 "value": 94.34,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "engagement_score": {
 "value": 0.20237855036820618,
 "unit": "ratio_0_1",
 "available": true,
 "availability_column": "engagement_score_available",
 "availability_value": true
 },
 "punctuality_rate": {
 "value": 0,
 "unit": "ratio_0_1",
 "available": true
 },
 "previous_attempt_count": {
 "value": 1,
 "unit": "count",
 "available": true
 },
 "at_risk_score": {
 "value": 3,
 "unit": "triggered_flag_count_0_5",
 "available": true
 }
 },
 "status_evidence": {
 "engagement_score_available": true,
 "score_strategy": "weighted_by_assessment_weight",
 "at_risk_label": "high"
 },
 "threshold_evidence": {
 "pass_threshold": {
 "value": 40,
 "unit": "score_on_runtime_scale",
 "source": "runtime_score_context"
 },
 "target_threshold": {
 "value": 70,
 "unit": "score_on_runtime_scale",
 "source": "runtime_score_context"
 }
 },
 "benchmark_evidence": {},
 "label_evidence": {
 "score_scale": 100
 },
 "flag_evidence": {},
 "action_evidence": {},
 "missing_evidence": [],
 "sensitive_context_present": false,
 "sensitive_context": {},
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "avg_score",
 "engagement_score",
 "punctuality_rate",
 "previous_attempt_count",
 "at_risk_score"
 ],
 "configured_status_columns": [
 "engagement_score_available",
 "score_strategy",
 "at_risk_label"
 ],
 "configured_threshold_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "configured_benchmark_columns": [],
 "configured_sensitive_columns": [],
 "metric_availability_columns": {
 "engagement_score": "engagement_score_available"
 },
 "metric_units": {
 "avg_score": "score_on_runtime_scale",
 "engagement_score": "ratio_0_1",
 "punctuality_rate": "ratio_0_1",
 "previous_attempt_count": "count",
 "at_risk_score": "triggered_flag_count_0_5",
 "pass_threshold": "score_on_runtime_scale",
 "target_threshold": "score_on_runtime_scale"
 },
 "threshold_sources": {
 "pass_threshold": "runtime_score_context",
 "target_threshold": "runtime_score_context"
 },
 "benchmark_sources": {},
 "sensitive_context_policy": null,
 "missing_required_columns": [],
 "missing_unit_metadata": [],
 "missing_threshold_sources": [],
 "missing_benchmark_sources": [],
 "errors": []
 },
 "evidence_status": "sufficient",
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 6915,
 "token_usage": {
 "prompt_tokens": 1310,
 "completion_tokens": 453,
 "total_tokens": 1763
 },
 "strategy": "risk",
 "granularity": "semester",
 "cost_usd": 0.000468
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-B02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "571f8722ab258c42e9e608036984926286eb5672baef0a1e38470e95240b982d",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1310,
 "completion_tokens": 453,
 "total_tokens": 1763
 },
 "latency_ms": 6920,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-B02",
 "execution_id": "exec_1781847857491_7eb409b0",
 "explanation": {
 "summary": "You are currently identified as being at high risk of failing, with an at-risk score of 3 out of 5. This is primarily due to low engagement and punctuality issues.",
 "insights": [
 {
 "title": "Low Engagement Score",
 "description": "Your engagement score is quite low at 0.20, which indicates that you may not be participating fully in your learning activities. This can significantly impact your understanding and performance.",
 "severity": "high",
 "evidence": [
 {
 "metric": "engagement_score",
 "value": 0.20237855036820618,
 "comparison": "down_from_previous",
 "delta": null,
 "context": "Engagement is crucial for success."
 }
 ]
 },
 {
 "title": "Punctuality Concerns",
 "description": "Your punctuality rate is at 0, meaning you may not be submitting assignments or attending classes on time. This can lead to missed opportunities for learning and support.",
 "severity": "high",
 "evidence": [
 {
 "metric": "punctuality_rate",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "Timeliness is important for academic success."
 }
 ]
 }
 ],
 "educational_implications": [
 "Improving engagement and punctuality can lead to better academic outcomes."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Increase participation in class and complete assignments on time.",
 "rationale": "Active engagement and timely submissions are key to improving your understanding and performance."
 },
 {
 "priority": "medium",
 "action": "Seek help from teachers or peers if you're struggling.",
 "rationale": "Getting support can help you overcome challenges and improve your engagement."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is sufficient and indicates clear risk factors.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "risk",
 "explanation_type": "risk",
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
 "dataset_name": "risk_summary",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 99,
 "task_aware_prompt_tokens": 806,
 "token_ratio": 8.1414,
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
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (8.1414 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "metric_snapshot",
 "task_id": "S-B02",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "risk_summary",
 "row_count": 1,
 "entity": null,
 "evidence_status": "sufficient"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "metric_snapshot": {
 "avg_score": {
 "value": 94.34,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "engagement_score": {
 "value": 0.20237855036820618,
 "unit": "ratio_0_1",
 "available": true,
 "availability_column": "engagement_score_available",
 "availability_value": true
 },
 "punctuality_rate": {
 "value": 0,
 "unit": "ratio_0_1",
 "available": true
 },
 "previous_attempt_count": {
 "value": 1,
 "unit": "count",
 "available": true
 },
 "at_risk_score": {
 "value": 3,
 "unit": "triggered_flag_count_0_5",
 "available": true
 }
 },
 "status_evidence": {
 "engagement_score_available": true,
 "score_strategy": "weighted_by_assessment_weight",
 "at_risk_label": "high"
 },
 "label_evidence": {
 "score_scale": 100
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "threshold_evidence": {
 "pass_threshold": {
 "value": 40,
 "unit": "score_on_runtime_scale",
 "source": "runtime_score_context"
 },
 "target_threshold": {
 "value": 70,
 "unit": "score_on_runtime_scale",
 "source": "runtime_score_context"
 }
 },
 "benchmark_evidence": {}
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flag_evidence": {},
 "sensitive_context_present": false,
 "sensitive_context": {}
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
 "engagement_score",
 "punctuality_rate",
 "previous_attempt_count",
 "at_risk_score"
 ],
 "configured_status_columns": [
 "engagement_score_available",
 "score_strategy",
 "at_risk_label"
 ],
 "configured_threshold_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "configured_benchmark_columns": [],
 "configured_sensitive_columns": [],
 "metric_availability_columns": {
 "engagement_score": "engagement_score_available"
 },
 "metric_units": {
 "avg_score": "score_on_runtime_scale",
 "engagement_score": "ratio_0_1",
 "punctuality_rate": "ratio_0_1",
 "previous_attempt_count": "count",
 "at_risk_score": "triggered_flag_count_0_5",
 "pass_threshold": "score_on_runtime_scale",
 "target_threshold": "score_on_runtime_scale"
 },
 "threshold_sources": {
 "pass_threshold": "runtime_score_context",
 "target_threshold": "runtime_score_context"
 },
 "benchmark_sources": {},
 "sensitive_context_policy": null,
 "missing_required_columns": [],
 "missing_unit_metadata": [],
 "missing_threshold_sources": [],
 "missing_benchmark_sources": [],
 "errors": []
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "metric_snapshot",
 "dataset_name": "risk_summary",
 "row_count": 1,
 "entity": null,
 "metric_snapshot": {
 "avg_score": {
 "value": 94.34,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "engagement_score": {
 "value": 0.20237855036820618,
 "unit": "ratio_0_1",
 "available": true,
 "availability_column": "engagement_score_available",
 "availability_value": true
 },
 "punctuality_rate": {
 "value": 0,
 "unit": "ratio_0_1",
 "available": true
 },
 "previous_attempt_count": {
 "value": 1,
 "unit": "count",
 "available": true
 },
 "at_risk_score": {
 "value": 3,
 "unit": "triggered_flag_count_0_5",
 "available": true
 }
 },
 "status_evidence": {
 "engagement_score_available": true,
 "score_strategy": "weighted_by_assessment_weight",
 "at_risk_label": "high"
 },
 "threshold_evidence": {
 "pass_threshold": {
 "value": 40,
 "unit": "score_on_runtime_scale",
 "source": "runtime_score_context"
 },
 "target_threshold": {
 "value": 70,
 "unit": "score_on_runtime_scale",
 "source": "runtime_score_context"
 }
 },
 "benchmark_evidence": {},
 "label_evidence": {
 "score_scale": 100
 },
 "flag_evidence": {},
 "action_evidence": {},
 "missing_evidence": [],
 "sensitive_context_present": false,
 "sensitive_context": {},
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "avg_score",
 "engagement_score",
 "punctuality_rate",
 "previous_attempt_count",
 "at_risk_score"
 ],
 "configured_status_columns": [
 "engagement_score_available",
 "score_strategy",
 "at_risk_label"
 ],
 "configured_threshold_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "configured_benchmark_columns": [],
 "configured_sensitive_columns": [],
 "metric_availability_columns": {
 "engagement_score": "engagement_score_available"
 },
 "metric_units": {
 "avg_score": "score_on_runtime_scale",
 "engagement_score": "ratio_0_1",
 "punctuality_rate": "ratio_0_1",
 "previous_attempt_count": "count",
 "at_risk_score": "triggered_flag_count_0_5",
 "pass_threshold": "score_on_runtime_scale",
 "target_threshold": "score_on_runtime_scale"
 },
 "threshold_sources": {
 "pass_threshold": "runtime_score_context",
 "target_threshold": "runtime_score_context"
 },
 "benchmark_sources": {},
 "sensitive_context_policy": null,
 "missing_required_columns": [],
 "missing_unit_metadata": [],
 "missing_threshold_sources": [],
 "missing_benchmark_sources": [],
 "errors": []
 },
 "evidence_status": "sufficient",
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 6915,
 "token_usage": {
 "prompt_tokens": 1310,
 "completion_tokens": 453,
 "total_tokens": 1763
 },
 "strategy": "risk",
 "granularity": "semester",
 "cost_usd": 0.000468
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
 "observed": "c23bd0d1b26a55e95142a9decd7fe4d429263519bdb5fb7ff689e284a0912f4f",
 "expected_values": [
 "c23bd0d1b26a55e95142a9decd7fe4d429263519bdb5fb7ff689e284a0912f4f"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "67376816be15879f37814086f5600cb56dd41f7a30168794cf7f64308e09fb5d",
 "expected": "67376816be15879f37814086f5600cb56dd41f7a30168794cf7f64308e09fb5d"
 },
 {
 "check_id": "numeric_fields_risk_summary",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "risk_summary",
 "numeric_columns": [
 "at_risk_score",
 "avg_score",
 "engagement_score",
 "pass_threshold",
 "previous_attempt_count",
 "punctuality_rate",
 "score_scale",
 "target_threshold"
 ],
 "numeric_summaries": {
 "at_risk_score": {
 "count": 1,
 "min": 3,
 "max": 3
 },
 "avg_score": {
 "count": 1,
 "min": 94.34,
 "max": 94.34
 },
 "engagement_score": {
 "count": 1,
 "min": 0.20237855036820618,
 "max": 0.20237855036820618
 },
 "pass_threshold": {
 "count": 1,
 "min": 40,
 "max": 40
 },
 "previous_attempt_count": {
 "count": 1,
 "min": 1,
 "max": 1
 },
 "punctuality_rate": {
 "count": 1,
 "min": 0,
 "max": 0
 },
 "score_scale": {
 "count": 1,
 "min": 100,
 "max": 100
 },
 "target_threshold": {
 "count": 1,
 "min": 70,
 "max": 70
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_risk_summary",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "risk_summary",
 "flag_columns": [
 "pass_threshold",
 "target_threshold",
 "at_risk_score",
 "at_risk_label"
 ],
 "triggered_like_counts": {
 "pass_threshold": 0,
 "target_threshold": 0,
 "at_risk_score": 0,
 "at_risk_label": 0
 }
 }
]
```
