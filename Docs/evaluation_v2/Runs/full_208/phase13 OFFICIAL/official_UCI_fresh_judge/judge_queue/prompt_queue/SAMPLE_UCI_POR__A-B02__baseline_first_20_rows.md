# LLM Judge V2 Prompt Queue Packet

## Session-Static Judge Contract Reference

The Judge Prompt is intentionally not embedded in this record packet. The session must load and verify it once, then combine it with this record-specific context.

```json
{
 "static_prompt_path": "Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md",
 "static_prompt_sha256": "e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517"
}
```

## Full Final Judge Context

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-B02__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__A-B02__baseline_first_20_rows",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "A-B02",
 "explanation_mode": "baseline_first_20_rows",
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
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-B02.json",
 "artifact_sha256": "5923dd0df5a7aea2d0616762d54d5f5d6dca4afb887f23993711e741c24d2331",
 "row_count": 2,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 2,
 "prompt_embedded_row_count": 2,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "5923dd0df5a7aea2d0616762d54d5f5d6dca4afb887f23993711e741c24d2331",
 "evidence_rows_sha256": "ee852cb8526f5551d764808249be38ee34bac4314e5b2316cfd1b269de1233c7",
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
 "full_result_row_count": 2,
 "embedded_datasets_sha256": "ee852cb8526f5551d764808249be38ee34bac4314e5b2316cfd1b269de1233c7",
 "datasets": {
 "outcome_counts": [
 {
 "final_outcome": "Pass",
 "student_count": 549,
 "pct_of_class": "84.6"
 },
 {
 "final_outcome": "Fail",
 "student_count": 100,
 "pct_of_class": "15.4"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-B02__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "2d46eba349f64a4821e910b9696758878b8f67b7dc558667e992cc8e7f20328d",
 "generator_input_sha256": "521c38dae396b6043a0b0a7ecf6f53d41f19a12a1c3b7dff00a8453daf4a4391",
 "generator_input_compact": {
 "task_id": "A-B02",
 "execution_id": "exec_1781847231749_26fbcb91",
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
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "outcome_counts"
 ],
 "dataset_row_counts": {
 "outcome_counts": 2
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
 "raw_text": "Summary: The distribution of final outcomes reveals that a significant majority of students passed, while a smaller proportion failed. This indicates a generally positive performance, but the presence of failures suggests areas for potential improvement.\n\nInsights: High Pass Rate: A total of 549 students passed, representing 84.6% of the class, indicating a strong overall performance. | Notable Failures: With 100 students failing, accounting for 15.4% of the class, this group represents a significant area of concern that warrants attention.\n\nEducational implications: The failure rate indicates that a portion of the cohort may require additional support or intervention.\n\nRecommendations: high - Implement targeted support programs for students at risk of failing. - Addressing the needs of the 100 students who failed can help improve overall outcomes and reduce the failure rate.",
 "structured_payload": {
 "task_id": "A-B02",
 "execution_id": "exec_1781847231749_26fbcb91",
 "explanation": {
 "summary": "The distribution of final outcomes reveals that a significant majority of students passed, while a smaller proportion failed. This indicates a generally positive performance, but the presence of failures suggests areas for potential improvement.",
 "insights": [
 {
 "title": "High Pass Rate",
 "description": "A total of 549 students passed, representing 84.6% of the class, indicating a strong overall performance.",
 "severity": "low",
 "evidence": [
 {
 "metric": "student_count",
 "value": 549,
 "comparison": "baseline",
 "delta": null,
 "context": "Total number of students who passed"
 }
 ]
 },
 {
 "title": "Notable Failures",
 "description": "With 100 students failing, accounting for 15.4% of the class, this group represents a significant area of concern that warrants attention.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "student_count",
 "value": 100,
 "comparison": "baseline",
 "delta": null,
 "context": "Total number of students who failed"
 }
 ]
 }
 ],
 "educational_implications": [
 "The failure rate indicates that a portion of the cohort may require additional support or intervention."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted support programs for students at risk of failing.",
 "rationale": "Addressing the needs of the 100 students who failed can help improve overall outcomes and reduce the failure rate."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The dataset is complete and provides clear counts of student outcomes.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
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
 "latency_ms": 8096,
 "token_usage": {
 "prompt_tokens": 561,
 "completion_tokens": 397,
 "total_tokens": 958
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000322
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-B02__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "2d46eba349f64a4821e910b9696758878b8f67b7dc558667e992cc8e7f20328d",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "baseline_first_20_rows",
 "observed_ai_summary_method": "baseline_first_20_rows",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 561,
 "completion_tokens": 397,
 "total_tokens": 958
 },
 "latency_ms": 8102,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-B02",
 "execution_id": "exec_1781847231749_26fbcb91",
 "explanation": {
 "summary": "The distribution of final outcomes reveals that a significant majority of students passed, while a smaller proportion failed. This indicates a generally positive performance, but the presence of failures suggests areas for potential improvement.",
 "insights": [
 {
 "title": "High Pass Rate",
 "description": "A total of 549 students passed, representing 84.6% of the class, indicating a strong overall performance.",
 "severity": "low",
 "evidence": [
 {
 "metric": "student_count",
 "value": 549,
 "comparison": "baseline",
 "delta": null,
 "context": "Total number of students who passed"
 }
 ]
 },
 {
 "title": "Notable Failures",
 "description": "With 100 students failing, accounting for 15.4% of the class, this group represents a significant area of concern that warrants attention.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "student_count",
 "value": 100,
 "comparison": "baseline",
 "delta": null,
 "context": "Total number of students who failed"
 }
 ]
 }
 ],
 "educational_implications": [
 "The failure rate indicates that a portion of the cohort may require additional support or intervention."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted support programs for students at risk of failing.",
 "rationale": "Addressing the needs of the 100 students who failed can help improve overall outcomes and reduce the failure rate."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The dataset is complete and provides clear counts of student outcomes.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
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
 "latency_ms": 8096,
 "token_usage": {
 "prompt_tokens": 561,
 "completion_tokens": 397,
 "total_tokens": 958
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000322
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
 "expected": 2,
 "observed": 2
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "5923dd0df5a7aea2d0616762d54d5f5d6dca4afb887f23993711e741c24d2331",
 "expected_values": [
 "5923dd0df5a7aea2d0616762d54d5f5d6dca4afb887f23993711e741c24d2331"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "ee852cb8526f5551d764808249be38ee34bac4314e5b2316cfd1b269de1233c7",
 "expected": "ee852cb8526f5551d764808249be38ee34bac4314e5b2316cfd1b269de1233c7"
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
 "count": 2,
 "min": 100,
 "max": 549
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

