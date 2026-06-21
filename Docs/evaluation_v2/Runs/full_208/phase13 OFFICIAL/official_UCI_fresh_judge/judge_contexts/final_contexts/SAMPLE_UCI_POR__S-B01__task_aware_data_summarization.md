# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-B01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__S-B01__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "S-B01",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Performance overview",
 "scope": "1 student",
 "actionable_question": "How am I performing overall?",
 "target_audience": "student",
 "ai_summary_type": "metric_snapshot",
 "ai_prompt_hint": "Summarise overall score, pass/fail status, class benchmark, percentile, and the most useful next action based only on returned fields.",
 "query_labels": [
 "performance_summary"
 ],
 "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
 "source_tables": [
 "enrollment",
 "assessment_result",
 "assessment"
 ],
 "key_db_fields": [
 "avg_score [FE]",
 "pass_rate [FE]",
 "performance_trend [FE]",
 "final_outcome"
 ],
 "output_schema": {
 "required_columns": [
 "avg_score",
 "pass_rate",
 "performance_trend",
 "final_outcome"
 ],
 "optional_columns": [
 "class_avg_score",
 "class_median_score",
 "score_percentile",
 "unweighted_avg_score",
 "weighted_avg_score",
 "score_strategy",
 "assessment_count",
 "score_vs_class_avg",
 "cohort_size",
 "score_scale",
 "pass_threshold",
 "target_threshold",
 "performance_band"
 ]
 },
 "query_labels": [
 "performance_summary"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "S-B01-CORE-01",
 "description": "State the overall score and pass/fail status."
 }
 ],
 "required_supporting_outputs": [
 {
 "requirement_id": "S-B01-SUPPORT-01",
 "description": "Compare against the class benchmark when class benchmark fields are present."
 },
 {
 "requirement_id": "S-B01-SUPPORT-02",
 "description": "Report percentile standing when score_percentile is present."
 },
 {
 "requirement_id": "S-B01-SUPPORT-03",
 "description": "Suggest the most useful next action supported by returned fields."
 }
 ],
 "evaluation_constraints": [
 {
 "constraint_id": "S-B01-CONSTRAINT-01",
 "description": "Use only returned fields; do not fill missing benchmark or percentile values with invented estimates."
 },
 {
 "constraint_id": "S-B01-CONSTRAINT-02",
 "description": "If percentile data is absent, omit percentile comparison and state that it is unavailable when relevant."
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
 "dataset_label": "performance_summary",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-B01.json",
 "artifact_sha256": "40030f7a95a933eeade0de28b1cce0845f09b1c4c1d936069e73e709031c2617",
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
 "evidence_artifact_file_sha256": "40030f7a95a933eeade0de28b1cce0845f09b1c4c1d936069e73e709031c2617",
 "evidence_rows_sha256": "f1e6086e595c3de3d57c990b8532eef5a8a3673e2f6e037354091db4553e099a",
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
 "embedded_datasets_sha256": "f1e6086e595c3de3d57c990b8532eef5a8a3673e2f6e037354091db4553e099a",
 "datasets": {
 "performance_summary": [
 {
 "avg_score": 41.25,
 "pass_rate": 0.6667,
 "performance_trend": 27.5,
 "final_outcome": "Pass",
 "class_avg_score": 58.31,
 "class_median_score": 58.25,
 "score_vs_class_avg": -17.06,
 "score_percentile": 8.8,
 "cohort_size": 649,
 "unweighted_avg_score": 36.67,
 "weighted_avg_score": 41.25,
 "score_strategy": "weighted_by_assessment_weight",
 "assessment_count": 3,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "performance_band": "passing_but_below_target"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__S-B01__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "b5295a84f939d13dabd654ea6e0fb5666f42a557859ab2ba4c26861041d05d0e",
 "generator_input_sha256": "c723c977694c1679596a5c57458ecbb9e8c321ed6eddea85368e5d3fd4d65ec7",
 "generator_input_compact": {
 "task_id": "S-B01",
 "execution_id": "exec_1781847241501_c0ea232d",
 "task_name": "Performance overview",
 "analysis_type": "aggregation",
 "explanation_strategy": "distribution",
 "actionable_question": "How am I performing overall?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "performance_summary"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "performance_summary"
 ],
 "dataset_row_counts": {
 "performance_summary": 1
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
 "raw_text": "Summary: You are currently passing with an average score of 41.25, which is below the class average of 58.31. While you have a pass rate of 66.67%, there is room for improvement to reach your target threshold of 70.\n\nInsights: Below Class Average: Your average score of 41.25 is significantly lower than the class average of 58.31, indicating that most students are performing better than you. This suggests a need to focus on improving your understanding of the material. | Low Percentile Rank: With a score percentile of 8.8, you are in the lower range compared to your peers. This indicates that many students are scoring higher, and it may be beneficial to identify specific areas where you can improve.\n\nEducational implications: Focusing on areas where you struggle can help raise your overall performance and confidence.\n\nRecommendations: high - Review and practice key concepts from your assessments. - Improving your understanding of the material will help you increase your average score and move closer to the target threshold.",
 "structured_payload": {
 "task_id": "S-B01",
 "execution_id": "exec_1781847241501_c0ea232d",
 "explanation": {
 "summary": "You are currently passing with an average score of 41.25, which is below the class average of 58.31. While you have a pass rate of 66.67%, there is room for improvement to reach your target threshold of 70.",
 "insights": [
 {
 "title": "Below Class Average",
 "description": "Your average score of 41.25 is significantly lower than the class average of 58.31, indicating that most students are performing better than you. This suggests a need to focus on improving your understanding of the material.",
 "severity": "high",
 "evidence": [
 {
 "metric": "score_vs_class_avg",
 "value": -17.06,
 "comparison": "down_from_previous",
 "delta": null,
 "context": "Class average is 58.31"
 }
 ]
 },
 {
 "title": "Low Percentile Rank",
 "description": "With a score percentile of 8.8, you are in the lower range compared to your peers. This indicates that many students are scoring higher, and it may be beneficial to identify specific areas where you can improve.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_percentile",
 "value": 8.8,
 "comparison": "baseline",
 "delta": null,
 "context": "Percentile rank among peers"
 }
 ]
 }
 ],
 "educational_implications": [
 "Focusing on areas where you struggle can help raise your overall performance and confidence."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Review and practice key concepts from your assessments.",
 "rationale": "Improving your understanding of the material will help you increase your average score and move closer to the target threshold."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data provided is sufficient and accurately reflects your performance metrics.",
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
 "dataset_name": "performance_summary",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 147,
 "task_aware_prompt_tokens": 904,
 "token_ratio": 6.1497,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "action_evidence.action_evidence",
 "exceptions.sensitive_context",
 "exceptions.sensitive_context_present",
 "exceptions.flag_evidence",
 "comparison.benchmark_evidence",
 "comparison.threshold_evidence"
 ],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.1497 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "metric_snapshot",
 "task_id": "S-B01",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "performance_summary",
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
 "value": 41.25,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "pass_rate": {
 "value": 0.6667,
 "unit": "ratio_0_1",
 "available": true
 },
 "performance_trend": {
 "value": 27.5,
 "unit": "score_change_per_assessment_order",
 "available": true
 },
 "score_vs_class_avg": {
 "value": -17.06,
 "unit": "score_point_difference",
 "available": true
 },
 "score_percentile": {
 "value": 8.8,
 "unit": "percentile_0_100",
 "available": true
 },
 "unweighted_avg_score": {
 "value": 36.67,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "weighted_avg_score": {
 "value": 41.25,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "assessment_count": {
 "value": 3,
 "unit": "count",
 "available": true
 },
 "cohort_size": {
 "value": 649,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "final_outcome": "Pass",
 "score_strategy": "weighted_by_assessment_weight",
 "performance_band": "passing_but_below_target"
 },
 "label_evidence": {
 "score_scale": 100
 }
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
 "pass_rate",
 "performance_trend",
 "score_vs_class_avg",
 "score_percentile",
 "unweighted_avg_score",
 "weighted_avg_score",
 "assessment_count",
 "cohort_size"
 ],
 "configured_status_columns": [
 "final_outcome",
 "score_strategy",
 "performance_band"
 ],
 "configured_threshold_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "configured_benchmark_columns": [
 "class_avg_score",
 "class_median_score"
 ],
 "configured_sensitive_columns": [],
 "metric_availability_columns": {},
 "metric_units": {
 "avg_score": "score_on_runtime_scale",
 "pass_rate": "ratio_0_1",
 "performance_trend": "score_change_per_assessment_order",
 "score_vs_class_avg": "score_point_difference",
 "score_percentile": "percentile_0_100",
 "unweighted_avg_score": "score_on_runtime_scale",
 "weighted_avg_score": "score_on_runtime_scale",
 "assessment_count": "count",
 "cohort_size": "count",
 "pass_threshold": "score_on_runtime_scale",
 "target_threshold": "score_on_runtime_scale",
 "class_avg_score": "score_on_runtime_scale",
 "class_median_score": "score_on_runtime_scale"
 },
 "threshold_sources": {
 "pass_threshold": "runtime_score_context",
 "target_threshold": "runtime_score_context"
 },
 "benchmark_sources": {
 "class_avg_score": "class_cohort",
 "class_median_score": "class_cohort"
 },
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
 "dataset_name": "performance_summary",
 "row_count": 1,
 "entity": null,
 "metric_snapshot": {
 "avg_score": {
 "value": 41.25,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "pass_rate": {
 "value": 0.6667,
 "unit": "ratio_0_1",
 "available": true
 },
 "performance_trend": {
 "value": 27.5,
 "unit": "score_change_per_assessment_order",
 "available": true
 },
 "score_vs_class_avg": {
 "value": -17.06,
 "unit": "score_point_difference",
 "available": true
 },
 "score_percentile": {
 "value": 8.8,
 "unit": "percentile_0_100",
 "available": true
 },
 "unweighted_avg_score": {
 "value": 36.67,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "weighted_avg_score": {
 "value": 41.25,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "assessment_count": {
 "value": 3,
 "unit": "count",
 "available": true
 },
 "cohort_size": {
 "value": 649,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "final_outcome": "Pass",
 "score_strategy": "weighted_by_assessment_weight",
 "performance_band": "passing_but_below_target"
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
 "benchmark_evidence": {
 "class_avg_score": {
 "value": 58.31,
 "unit": "score_on_runtime_scale",
 "source": "class_cohort"
 },
 "class_median_score": {
 "value": 58.25,
 "unit": "score_on_runtime_scale",
 "source": "class_cohort"
 }
 },
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
 "pass_rate",
 "performance_trend",
 "score_vs_class_avg",
 "score_percentile",
 "unweighted_avg_score",
 "weighted_avg_score",
 "assessment_count",
 "cohort_size"
 ],
 "configured_status_columns": [
 "final_outcome",
 "score_strategy",
 "performance_band"
 ],
 "configured_threshold_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "configured_benchmark_columns": [
 "class_avg_score",
 "class_median_score"
 ],
 "configured_sensitive_columns": [],
 "metric_availability_columns": {},
 "metric_units": {
 "avg_score": "score_on_runtime_scale",
 "pass_rate": "ratio_0_1",
 "performance_trend": "score_change_per_assessment_order",
 "score_vs_class_avg": "score_point_difference",
 "score_percentile": "percentile_0_100",
 "unweighted_avg_score": "score_on_runtime_scale",
 "weighted_avg_score": "score_on_runtime_scale",
 "assessment_count": "count",
 "cohort_size": "count",
 "pass_threshold": "score_on_runtime_scale",
 "target_threshold": "score_on_runtime_scale",
 "class_avg_score": "score_on_runtime_scale",
 "class_median_score": "score_on_runtime_scale"
 },
 "threshold_sources": {
 "pass_threshold": "runtime_score_context",
 "target_threshold": "runtime_score_context"
 },
 "benchmark_sources": {
 "class_avg_score": "class_cohort",
 "class_median_score": "class_cohort"
 },
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
 "latency_ms": 5484,
 "token_usage": {
 "prompt_tokens": 1367,
 "completion_tokens": 453,
 "total_tokens": 1820
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000477
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__S-B01__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "b5295a84f939d13dabd654ea6e0fb5666f42a557859ab2ba4c26861041d05d0e",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1367,
 "completion_tokens": 453,
 "total_tokens": 1820
 },
 "latency_ms": 5522,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-B01",
 "execution_id": "exec_1781847241501_c0ea232d",
 "explanation": {
 "summary": "You are currently passing with an average score of 41.25, which is below the class average of 58.31. While you have a pass rate of 66.67%, there is room for improvement to reach your target threshold of 70.",
 "insights": [
 {
 "title": "Below Class Average",
 "description": "Your average score of 41.25 is significantly lower than the class average of 58.31, indicating that most students are performing better than you. This suggests a need to focus on improving your understanding of the material.",
 "severity": "high",
 "evidence": [
 {
 "metric": "score_vs_class_avg",
 "value": -17.06,
 "comparison": "down_from_previous",
 "delta": null,
 "context": "Class average is 58.31"
 }
 ]
 },
 {
 "title": "Low Percentile Rank",
 "description": "With a score percentile of 8.8, you are in the lower range compared to your peers. This indicates that many students are scoring higher, and it may be beneficial to identify specific areas where you can improve.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_percentile",
 "value": 8.8,
 "comparison": "baseline",
 "delta": null,
 "context": "Percentile rank among peers"
 }
 ]
 }
 ],
 "educational_implications": [
 "Focusing on areas where you struggle can help raise your overall performance and confidence."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Review and practice key concepts from your assessments.",
 "rationale": "Improving your understanding of the material will help you increase your average score and move closer to the target threshold."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data provided is sufficient and accurately reflects your performance metrics.",
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
 "dataset_name": "performance_summary",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 147,
 "task_aware_prompt_tokens": 904,
 "token_ratio": 6.1497,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "action_evidence.action_evidence",
 "exceptions.sensitive_context",
 "exceptions.sensitive_context_present",
 "exceptions.flag_evidence",
 "comparison.benchmark_evidence",
 "comparison.threshold_evidence"
 ],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.1497 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "metric_snapshot",
 "task_id": "S-B01",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "performance_summary",
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
 "value": 41.25,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "pass_rate": {
 "value": 0.6667,
 "unit": "ratio_0_1",
 "available": true
 },
 "performance_trend": {
 "value": 27.5,
 "unit": "score_change_per_assessment_order",
 "available": true
 },
 "score_vs_class_avg": {
 "value": -17.06,
 "unit": "score_point_difference",
 "available": true
 },
 "score_percentile": {
 "value": 8.8,
 "unit": "percentile_0_100",
 "available": true
 },
 "unweighted_avg_score": {
 "value": 36.67,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "weighted_avg_score": {
 "value": 41.25,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "assessment_count": {
 "value": 3,
 "unit": "count",
 "available": true
 },
 "cohort_size": {
 "value": 649,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "final_outcome": "Pass",
 "score_strategy": "weighted_by_assessment_weight",
 "performance_band": "passing_but_below_target"
 },
 "label_evidence": {
 "score_scale": 100
 }
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
 "pass_rate",
 "performance_trend",
 "score_vs_class_avg",
 "score_percentile",
 "unweighted_avg_score",
 "weighted_avg_score",
 "assessment_count",
 "cohort_size"
 ],
 "configured_status_columns": [
 "final_outcome",
 "score_strategy",
 "performance_band"
 ],
 "configured_threshold_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "configured_benchmark_columns": [
 "class_avg_score",
 "class_median_score"
 ],
 "configured_sensitive_columns": [],
 "metric_availability_columns": {},
 "metric_units": {
 "avg_score": "score_on_runtime_scale",
 "pass_rate": "ratio_0_1",
 "performance_trend": "score_change_per_assessment_order",
 "score_vs_class_avg": "score_point_difference",
 "score_percentile": "percentile_0_100",
 "unweighted_avg_score": "score_on_runtime_scale",
 "weighted_avg_score": "score_on_runtime_scale",
 "assessment_count": "count",
 "cohort_size": "count",
 "pass_threshold": "score_on_runtime_scale",
 "target_threshold": "score_on_runtime_scale",
 "class_avg_score": "score_on_runtime_scale",
 "class_median_score": "score_on_runtime_scale"
 },
 "threshold_sources": {
 "pass_threshold": "runtime_score_context",
 "target_threshold": "runtime_score_context"
 },
 "benchmark_sources": {
 "class_avg_score": "class_cohort",
 "class_median_score": "class_cohort"
 },
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
 "dataset_name": "performance_summary",
 "row_count": 1,
 "entity": null,
 "metric_snapshot": {
 "avg_score": {
 "value": 41.25,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "pass_rate": {
 "value": 0.6667,
 "unit": "ratio_0_1",
 "available": true
 },
 "performance_trend": {
 "value": 27.5,
 "unit": "score_change_per_assessment_order",
 "available": true
 },
 "score_vs_class_avg": {
 "value": -17.06,
 "unit": "score_point_difference",
 "available": true
 },
 "score_percentile": {
 "value": 8.8,
 "unit": "percentile_0_100",
 "available": true
 },
 "unweighted_avg_score": {
 "value": 36.67,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "weighted_avg_score": {
 "value": 41.25,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "assessment_count": {
 "value": 3,
 "unit": "count",
 "available": true
 },
 "cohort_size": {
 "value": 649,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "final_outcome": "Pass",
 "score_strategy": "weighted_by_assessment_weight",
 "performance_band": "passing_but_below_target"
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
 "benchmark_evidence": {
 "class_avg_score": {
 "value": 58.31,
 "unit": "score_on_runtime_scale",
 "source": "class_cohort"
 },
 "class_median_score": {
 "value": 58.25,
 "unit": "score_on_runtime_scale",
 "source": "class_cohort"
 }
 },
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
 "pass_rate",
 "performance_trend",
 "score_vs_class_avg",
 "score_percentile",
 "unweighted_avg_score",
 "weighted_avg_score",
 "assessment_count",
 "cohort_size"
 ],
 "configured_status_columns": [
 "final_outcome",
 "score_strategy",
 "performance_band"
 ],
 "configured_threshold_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "configured_benchmark_columns": [
 "class_avg_score",
 "class_median_score"
 ],
 "configured_sensitive_columns": [],
 "metric_availability_columns": {},
 "metric_units": {
 "avg_score": "score_on_runtime_scale",
 "pass_rate": "ratio_0_1",
 "performance_trend": "score_change_per_assessment_order",
 "score_vs_class_avg": "score_point_difference",
 "score_percentile": "percentile_0_100",
 "unweighted_avg_score": "score_on_runtime_scale",
 "weighted_avg_score": "score_on_runtime_scale",
 "assessment_count": "count",
 "cohort_size": "count",
 "pass_threshold": "score_on_runtime_scale",
 "target_threshold": "score_on_runtime_scale",
 "class_avg_score": "score_on_runtime_scale",
 "class_median_score": "score_on_runtime_scale"
 },
 "threshold_sources": {
 "pass_threshold": "runtime_score_context",
 "target_threshold": "runtime_score_context"
 },
 "benchmark_sources": {
 "class_avg_score": "class_cohort",
 "class_median_score": "class_cohort"
 },
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
 "latency_ms": 5484,
 "token_usage": {
 "prompt_tokens": 1367,
 "completion_tokens": 453,
 "total_tokens": 1820
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000477
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
 "observed": "40030f7a95a933eeade0de28b1cce0845f09b1c4c1d936069e73e709031c2617",
 "expected_values": [
 "40030f7a95a933eeade0de28b1cce0845f09b1c4c1d936069e73e709031c2617"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "f1e6086e595c3de3d57c990b8532eef5a8a3673e2f6e037354091db4553e099a",
 "expected": "f1e6086e595c3de3d57c990b8532eef5a8a3673e2f6e037354091db4553e099a"
 },
 {
 "check_id": "numeric_fields_performance_summary",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "performance_summary",
 "numeric_columns": [
 "assessment_count",
 "avg_score",
 "class_avg_score",
 "class_median_score",
 "cohort_size",
 "pass_rate",
 "pass_threshold",
 "performance_trend",
 "score_percentile",
 "score_scale",
 "score_vs_class_avg",
 "target_threshold",
 "unweighted_avg_score",
 "weighted_avg_score"
 ],
 "numeric_summaries": {
 "assessment_count": {
 "count": 1,
 "min": 3,
 "max": 3
 },
 "avg_score": {
 "count": 1,
 "min": 41.25,
 "max": 41.25
 },
 "class_avg_score": {
 "count": 1,
 "min": 58.31,
 "max": 58.31
 },
 "class_median_score": {
 "count": 1,
 "min": 58.25,
 "max": 58.25
 },
 "cohort_size": {
 "count": 1,
 "min": 649,
 "max": 649
 },
 "pass_rate": {
 "count": 1,
 "min": 0.6667,
 "max": 0.6667
 },
 "pass_threshold": {
 "count": 1,
 "min": 40,
 "max": 40
 },
 "performance_trend": {
 "count": 1,
 "min": 27.5,
 "max": 27.5
 },
 "score_percentile": {
 "count": 1,
 "min": 8.8,
 "max": 8.8
 },
 "score_scale": {
 "count": 1,
 "min": 100,
 "max": 100
 },
 "score_vs_class_avg": {
 "count": 1,
 "min": -17.06,
 "max": -17.06
 },
 "target_threshold": {
 "count": 1,
 "min": 70,
 "max": 70
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_performance_summary",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "performance_summary",
 "flag_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "triggered_like_counts": {
 "pass_threshold": 0,
 "target_threshold": 0
 }
 }
]
```
