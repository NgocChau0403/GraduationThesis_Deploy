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

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C01__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__A-C01__baseline_first_20_rows",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "A-C01",
 "explanation_mode": "baseline_first_20_rows",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Compare performance trajectories",
 "scope": "2 students",
 "actionable_question": "Which student is improving faster and when did their paths diverge?",
 "target_audience": "instructor",
 "ai_summary_type": "trend_comparison",
 "ai_prompt_hint": "Explain divergence points. Identify when one student fell behind relative to the other.",
 "query_labels": [
 "trajectory_comparison"
 ],
 "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
 "source_tables": [
 "assessment_result",
 "assessment",
 "enrollment"
 ],
 "key_db_fields": [
 "score_normalized",
 "assessment_order",
 "week_of_class",
 "assessment_type"
 ],
 "output_schema": {},
 "query_labels": [
 "trajectory_comparison"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-C01-CORE-01",
 "description": "Explain divergence points."
 },
 {
 "requirement_id": "A-C01-CORE-02",
 "description": "Identify when one student fell behind relative to the other."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-C01-CONSTRAINT-01",
 "description": "If either student's data is absent or insufficient for trajectory comparison, state that explicitly rather than inferring from the other student's data."
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
 "dataset_label": "trajectory_comparison",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-C01.json",
 "artifact_sha256": "e4b071b75d83d7b7d78548f8105459f537483cb5175fb593e574ca8e92e3085f",
 "row_count": 6,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 6,
 "prompt_embedded_row_count": 6,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "e4b071b75d83d7b7d78548f8105459f537483cb5175fb593e574ca8e92e3085f",
 "evidence_rows_sha256": "b4dadf00d0fb4715630ba456ad834e054a676edf8c5f76a2d9f7c05077ec8b06",
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
 "full_result_row_count": 6,
 "embedded_datasets_sha256": "b4dadf00d0fb4715630ba456ad834e054a676edf8c5f76a2d9f7c05077ec8b06",
 "datasets": {
 "trajectory_comparison": [
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "assessment_order": 1,
 "week_of_class": 3,
 "assessment_type": "quiz",
 "score_normalized": 0
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "assessment_order": 2,
 "week_of_class": 8,
 "assessment_type": "quiz",
 "score_normalized": 55
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "assessment_order": 3,
 "week_of_class": 14,
 "assessment_type": "exam",
 "score_normalized": 55
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "assessment_order": 1,
 "week_of_class": 3,
 "assessment_type": "quiz",
 "score_normalized": 45
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "assessment_order": 2,
 "week_of_class": 8,
 "assessment_type": "quiz",
 "score_normalized": 55
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "assessment_order": 3,
 "week_of_class": 14,
 "assessment_type": "exam",
 "score_normalized": 55
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C01__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "53b4289fc8a84acf400989f0e1950b194b877674e81836c5b2954ddda0cc1c90",
 "generator_input_sha256": "a36d6e9a0664e0ce9c334f993a0656596ae8df114c77beafaa1f1d8c3b266968",
 "generator_input_compact": {
 "task_id": "A-C01",
 "execution_id": "exec_1781847231947_8d61eafc",
 "task_name": "Compare performance trajectories",
 "analysis_type": "trend",
 "explanation_strategy": "comparison",
 "actionable_question": "Which student is improving faster and when did their paths diverge?",
 "target_audience": [
 "instructor"
 ],
 "query_labels": [
 "trajectory_comparison"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "trajectory_comparison"
 ],
 "dataset_row_counts": {
 "trajectory_comparison": 6
 },
 "ai_summary_config_summary": {
 "summary_type": "trend_comparison",
 "metric_column": "score_normalized",
 "entity_column": null,
 "group_column": "student_id",
 "time_column": "assessment_order",
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
 "raw_text": "Summary: The performance trajectories of two students reveal distinct patterns of improvement over the course of the assessments. While both students achieved the same score on the final exam, their paths diverged significantly during the initial quiz assessment.\n\nInsights: Initial Performance Divergence: Student SAMPLE_UCI_POR_STU_000001 started with a score of 0 on the first quiz, while SAMPLE_UCI_POR_STU_000002 began with a score of 45. This initial gap indicates a significant difference in foundational knowledge. | Equal Performance in Later Assessments: By the second quiz and the final exam, both students scored 55, indicating that SAMPLE_UCI_POR_STU_000001 made significant progress, but the initial gap in performance may have impacted their confidence and learning trajectory.\n\nEducational implications: The initial performance gap may have long-term effects on student confidence and engagement.\n\nRecommendations: high - Implement targeted interventions for students with low initial scores. - Addressing foundational knowledge gaps early can help prevent long-term performance issues.",
 "structured_payload": {
 "task_id": "A-C01",
 "execution_id": "exec_1781847231947_8d61eafc",
 "explanation": {
 "summary": "The performance trajectories of two students reveal distinct patterns of improvement over the course of the assessments. While both students achieved the same score on the final exam, their paths diverged significantly during the initial quiz assessment.",
 "insights": [
 {
 "title": "Initial Performance Divergence",
 "description": "Student SAMPLE_UCI_POR_STU_000001 started with a score of 0 on the first quiz, while SAMPLE_UCI_POR_STU_000002 began with a score of 45. This initial gap indicates a significant difference in foundational knowledge.",
 "severity": "high",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_UCI_POR_STU_000001's first quiz score"
 },
 {
 "metric": "score_normalized",
 "value": 45,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_UCI_POR_STU_000002's first quiz score"
 }
 ]
 },
 {
 "title": "Equal Performance in Later Assessments",
 "description": "By the second quiz and the final exam, both students scored 55, indicating that SAMPLE_UCI_POR_STU_000001 made significant progress, but the initial gap in performance may have impacted their confidence and learning trajectory.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "up_from_previous",
 "delta": 55,
 "context": "SAMPLE_UCI_POR_STU_000001's second quiz score from 0"
 },
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "stable",
 "delta": 0,
 "context": "SAMPLE_UCI_POR_STU_000002's second quiz score"
 }
 ]
 }
 ],
 "educational_implications": [
 "The initial performance gap may have long-term effects on student confidence and engagement."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted interventions for students with low initial scores.",
 "rationale": "Addressing foundational knowledge gaps early can help prevent long-term performance issues."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is complete and directly compares the performance of the two students across multiple assessments.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
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
 "latency_ms": 7724,
 "token_usage": {
 "prompt_tokens": 856,
 "completion_tokens": 578,
 "total_tokens": 1434
 },
 "strategy": "comparison",
 "granularity": "per_assessment",
 "cost_usd": 0.000475
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C01__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "53b4289fc8a84acf400989f0e1950b194b877674e81836c5b2954ddda0cc1c90",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "baseline_first_20_rows",
 "observed_ai_summary_method": "baseline_first_20_rows",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 856,
 "completion_tokens": 578,
 "total_tokens": 1434
 },
 "latency_ms": 7729,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-C01",
 "execution_id": "exec_1781847231947_8d61eafc",
 "explanation": {
 "summary": "The performance trajectories of two students reveal distinct patterns of improvement over the course of the assessments. While both students achieved the same score on the final exam, their paths diverged significantly during the initial quiz assessment.",
 "insights": [
 {
 "title": "Initial Performance Divergence",
 "description": "Student SAMPLE_UCI_POR_STU_000001 started with a score of 0 on the first quiz, while SAMPLE_UCI_POR_STU_000002 began with a score of 45. This initial gap indicates a significant difference in foundational knowledge.",
 "severity": "high",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_UCI_POR_STU_000001's first quiz score"
 },
 {
 "metric": "score_normalized",
 "value": 45,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_UCI_POR_STU_000002's first quiz score"
 }
 ]
 },
 {
 "title": "Equal Performance in Later Assessments",
 "description": "By the second quiz and the final exam, both students scored 55, indicating that SAMPLE_UCI_POR_STU_000001 made significant progress, but the initial gap in performance may have impacted their confidence and learning trajectory.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "up_from_previous",
 "delta": 55,
 "context": "SAMPLE_UCI_POR_STU_000001's second quiz score from 0"
 },
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "stable",
 "delta": 0,
 "context": "SAMPLE_UCI_POR_STU_000002's second quiz score"
 }
 ]
 }
 ],
 "educational_implications": [
 "The initial performance gap may have long-term effects on student confidence and engagement."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted interventions for students with low initial scores.",
 "rationale": "Addressing foundational knowledge gaps early can help prevent long-term performance issues."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is complete and directly compares the performance of the two students across multiple assessments.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
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
 "latency_ms": 7724,
 "token_usage": {
 "prompt_tokens": 856,
 "completion_tokens": 578,
 "total_tokens": 1434
 },
 "strategy": "comparison",
 "granularity": "per_assessment",
 "cost_usd": 0.000475
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
 "expected": 6,
 "observed": 6
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "e4b071b75d83d7b7d78548f8105459f537483cb5175fb593e574ca8e92e3085f",
 "expected_values": [
 "e4b071b75d83d7b7d78548f8105459f537483cb5175fb593e574ca8e92e3085f"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "b4dadf00d0fb4715630ba456ad834e054a676edf8c5f76a2d9f7c05077ec8b06",
 "expected": "b4dadf00d0fb4715630ba456ad834e054a676edf8c5f76a2d9f7c05077ec8b06"
 },
 {
 "check_id": "numeric_fields_trajectory_comparison",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "trajectory_comparison",
 "numeric_columns": [
 "assessment_order",
 "score_normalized",
 "week_of_class"
 ],
 "numeric_summaries": {
 "assessment_order": {
 "count": 6,
 "min": 1,
 "max": 3
 },
 "score_normalized": {
 "count": 6,
 "min": 0,
 "max": 55
 },
 "week_of_class": {
 "count": 6,
 "min": 3,
 "max": 14
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_trajectory_comparison",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "trajectory_comparison",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```

