# LLM Judge Final Judge Context - SAMPLE_OULAD__A-C01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-C01__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-C01",
 "explanation_mode": "task_aware_data_summarization",
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
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C01.json",
 "artifact_sha256": "692c12fd575f64312163abb3e9a2aa01f9aae8cdde11ff1c9576015aacb284fa",
 "row_count": 17,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 17,
 "prompt_embedded_row_count": 17,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "692c12fd575f64312163abb3e9a2aa01f9aae8cdde11ff1c9576015aacb284fa",
 "evidence_rows_sha256": "48785f01cc655aee0006da16c0f2fe2c34556221cdeadf57e740967a5256dcf2",
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
 "full_result_row_count": 17,
 "embedded_datasets_sha256": "48785f01cc655aee0006da16c0f2fe2c34556221cdeadf57e740967a5256dcf2",
 "datasets": {
 "trajectory_comparison": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 1,
 "week_of_class": 3,
 "assessment_type": "TMA",
 "score_normalized": 92
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 1,
 "week_of_class": 3,
 "assessment_type": "CMA",
 "score_normalized": 100
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 2,
 "week_of_class": 7,
 "assessment_type": "TMA",
 "score_normalized": 90
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 3,
 "week_of_class": 10,
 "assessment_type": "CMA",
 "score_normalized": 87
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 3,
 "week_of_class": 14,
 "assessment_type": "TMA",
 "score_normalized": 89
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 4,
 "week_of_class": 19,
 "assessment_type": "TMA",
 "score_normalized": 61
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 5,
 "week_of_class": 21,
 "assessment_type": "CMA",
 "score_normalized": 90
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 5,
 "week_of_class": 25,
 "assessment_type": "TMA",
 "score_normalized": 87
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 6,
 "week_of_class": 34,
 "assessment_type": "CMA",
 "score_normalized": 90
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 7,
 "week_of_class": 34,
 "assessment_type": "CMA",
 "score_normalized": 92
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 8,
 "week_of_class": 34,
 "assessment_type": "CMA",
 "score_normalized": 97
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 8,
 "week_of_class": 31,
 "assessment_type": "CMA",
 "score_normalized": 83
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 9,
 "week_of_class": null,
 "assessment_type": "Exam",
 "score_normalized": 96
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 9,
 "week_of_class": 34,
 "assessment_type": "CMA",
 "score_normalized": 85
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 10,
 "week_of_class": 34,
 "assessment_type": "CMA",
 "score_normalized": 88
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 11,
 "week_of_class": 34,
 "assessment_type": "CMA",
 "score_normalized": 93
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "assessment_order": 12,
 "week_of_class": 34,
 "assessment_type": "CMA",
 "score_normalized": 99
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-C01__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "9a722a33d01bb3d4a897407c56d4c045e785b4362e132e752f4af12f316ab517",
 "generator_input_sha256": "6b70cc360cc22e38888aa51d6636282e95f689c38dbed4296b20d68befa80b7b",
 "generator_input_compact": {
 "task_id": "A-C01",
 "execution_id": "exec_1781847642333_fd75515e",
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
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "trajectory_comparison"
 ],
 "dataset_row_counts": {
 "trajectory_comparison": 17
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
 "raw_text": "Summary: Only one returned student (SAMPLE_OULAD_STU_100788) is present, so between-student divergence is not estimable. At assessment_order=1, returned points are CMA score_normalized=100, TMA score_normalized=92. The observed trough is assessment_order=4 TMA score_normalized=61.\n\nInsights: Returned trajectory scope: The result contains one student only; describe within-student score changes without claiming a comparison between two students.\n\nEducational implications: Treat the returned rows as one student's observed assessment history only.",
 "structured_payload": {
 "task_id": "A-C01",
 "execution_id": "exec_1781847642333_fd75515e",
 "explanation": {
 "summary": "Only one returned student (SAMPLE_OULAD_STU_100788) is present, so between-student divergence is not estimable. At assessment_order=1, returned points are CMA score_normalized=100, TMA score_normalized=92. The observed trough is assessment_order=4 TMA score_normalized=61.",
 "insights": [
 {
 "title": "Returned trajectory scope",
 "description": "The result contains one student only; describe within-student score changes without claiming a comparison between two students.",
 "severity": "low",
 "evidence": []
 }
 ],
 "educational_implications": [
 "Treat the returned rows as one student's observed assessment history only."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is consistent and provides clear performance metrics across multiple assessments.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "trend_comparison",
 "ai_summary_method_warning": null,
 "full_result_row_count": 17,
 "included_row_count": 15,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "trajectory_comparison",
 "row_count": 17,
 "included_row_count": 15
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 15,
 "baseline_reference_tokens": 705,
 "task_aware_prompt_tokens": 1565,
 "token_ratio": 2.2199,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "trend_relationship.divergence_threshold",
 "comparison.pairwise_comparison",
 "primary_finding.evidence_status"
 ],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (2.2199 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_comparison",
 "task_id": "A-C01",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "trajectory_comparison",
 "row_count": 17,
 "group_column": "student_id",
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "available_groups": [
 "SAMPLE_OULAD_STU_100788"
 ],
 "dynamic_comparison_groups": true,
 "alignment_columns": [
 "assessment_order",
 "assessment_type"
 ]
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "group_trends": {
 "SAMPLE_OULAD_STU_100788": {
 "group": "SAMPLE_OULAD_STU_100788",
 "point_count": 17,
 "series_points": [
 {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "score_normalized": 100,
 "source_row_index": 1
 },
 {
 "assessment_order": 1,
 "assessment_type": "TMA",
 "score_normalized": 92,
 "source_row_index": 0
 },
 {
 "assessment_order": 2,
 "assessment_type": "TMA",
 "score_normalized": 90,
 "source_row_index": 2
 },
 {
 "assessment_order": 3,
 "assessment_type": "CMA",
 "score_normalized": 87,
 "source_row_index": 3
 },
 {
 "assessment_order": 3,
 "assessment_type": "TMA",
 "score_normalized": 89,
 "source_row_index": 4
 },
 {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 {
 "assessment_order": 5,
 "assessment_type": "CMA",
 "score_normalized": 90,
 "source_row_index": 6
 },
 {
 "assessment_order": 5,
 "assessment_type": "TMA",
 "score_normalized": 87,
 "source_row_index": 7
 },
 {
 "assessment_order": 6,
 "assessment_type": "CMA",
 "score_normalized": 90,
 "source_row_index": 8
 },
 {
 "assessment_order": 7,
 "assessment_type": "CMA",
 "score_normalized": 92,
 "source_row_index": 9
 },
 {
 "assessment_order": 8,
 "assessment_type": "CMA",
 "score_normalized": 97,
 "source_row_index": 10
 },
 {
 "assessment_order": 8,
 "assessment_type": "CMA",
 "score_normalized": 83,
 "source_row_index": 11
 },
 {
 "assessment_order": 9,
 "assessment_type": "CMA",
 "score_normalized": 85,
 "source_row_index": 13
 },
 {
 "assessment_order": 9,
 "assessment_type": "Exam",
 "score_normalized": 96,
 "source_row_index": 12
 },
 {
 "assessment_order": 10,
 "assessment_type": "CMA",
 "score_normalized": 88,
 "source_row_index": 14
 },
 {
 "assessment_order": 11,
 "assessment_type": "CMA",
 "score_normalized": 93,
 "source_row_index": 15
 },
 {
 "assessment_order": 12,
 "assessment_type": "CMA",
 "score_normalized": 99,
 "source_row_index": 16
 }
 ],
 "first_point": {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "score_normalized": 100,
 "source_row_index": 1
 },
 "last_point": {
 "assessment_order": 12,
 "assessment_type": "CMA",
 "score_normalized": 99,
 "source_row_index": 16
 },
 "net_change": -1,
 "peak": {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "score_normalized": 100,
 "source_row_index": 1
 },
 "trough": {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 3,
 "assessment_type": "TMA",
 "score_normalized": 89,
 "source_row_index": 4
 },
 "to": {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 "delta": -28
 },
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 "to": {
 "assessment_order": 5,
 "assessment_type": "CMA",
 "score_normalized": 90,
 "source_row_index": 6
 },
 "delta": 29
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_group_evidence": [
 {
 "required_group_count": 2,
 "observed_group_count": 1,
 "observed_groups": [
 "SAMPLE_OULAD_STU_100788"
 ]
 }
 ],
 "summarization_warnings": [
 "Dynamic trend comparison requires at least two observed groups; do not infer a pairwise trajectory difference."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_comparison",
 "dataset_name": "trajectory_comparison",
 "row_count": 17,
 "dynamic_comparison_groups": true,
 "group_column": "student_id",
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "alignment_columns": [
 "assessment_order",
 "assessment_type"
 ],
 "divergence_threshold": 5,
 "available_groups": [
 "SAMPLE_OULAD_STU_100788"
 ],
 "evidence_status": "insufficient_evidence",
 "group_trends": {
 "SAMPLE_OULAD_STU_100788": {
 "group": "SAMPLE_OULAD_STU_100788",
 "point_count": 17,
 "series_points": [
 {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "score_normalized": 100,
 "source_row_index": 1
 },
 {
 "assessment_order": 1,
 "assessment_type": "TMA",
 "score_normalized": 92,
 "source_row_index": 0
 },
 {
 "assessment_order": 2,
 "assessment_type": "TMA",
 "score_normalized": 90,
 "source_row_index": 2
 },
 {
 "assessment_order": 3,
 "assessment_type": "CMA",
 "score_normalized": 87,
 "source_row_index": 3
 },
 {
 "assessment_order": 3,
 "assessment_type": "TMA",
 "score_normalized": 89,
 "source_row_index": 4
 },
 {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 {
 "assessment_order": 5,
 "assessment_type": "CMA",
 "score_normalized": 90,
 "source_row_index": 6
 },
 {
 "assessment_order": 5,
 "assessment_type": "TMA",
 "score_normalized": 87,
 "source_row_index": 7
 },
 {
 "assessment_order": 6,
 "assessment_type": "CMA",
 "score_normalized": 90,
 "source_row_index": 8
 },
 {
 "assessment_order": 7,
 "assessment_type": "CMA",
 "score_normalized": 92,
 "source_row_index": 9
 },
 {
 "assessment_order": 8,
 "assessment_type": "CMA",
 "score_normalized": 97,
 "source_row_index": 10
 },
 {
 "assessment_order": 8,
 "assessment_type": "CMA",
 "score_normalized": 83,
 "source_row_index": 11
 },
 {
 "assessment_order": 9,
 "assessment_type": "CMA",
 "score_normalized": 85,
 "source_row_index": 13
 },
 {
 "assessment_order": 9,
 "assessment_type": "Exam",
 "score_normalized": 96,
 "source_row_index": 12
 },
 {
 "assessment_order": 10,
 "assessment_type": "CMA",
 "score_normalized": 88,
 "source_row_index": 14
 },
 {
 "assessment_order": 11,
 "assessment_type": "CMA",
 "score_normalized": 93,
 "source_row_index": 15
 },
 {
 "assessment_order": 12,
 "assessment_type": "CMA",
 "score_normalized": 99,
 "source_row_index": 16
 }
 ],
 "first_point": {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "score_normalized": 100,
 "source_row_index": 1
 },
 "last_point": {
 "assessment_order": 12,
 "assessment_type": "CMA",
 "score_normalized": 99,
 "source_row_index": 16
 },
 "net_change": -1,
 "peak": {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "score_normalized": 100,
 "source_row_index": 1
 },
 "trough": {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 3,
 "assessment_type": "TMA",
 "score_normalized": 89,
 "source_row_index": 4
 },
 "to": {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 "delta": -28
 },
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 "to": {
 "assessment_order": 5,
 "assessment_type": "CMA",
 "score_normalized": 90,
 "source_row_index": 6
 },
 "delta": 29
 }
 }
 },
 "pairwise_comparison": null,
 "missing_group_evidence": [
 {
 "required_group_count": 2,
 "observed_group_count": 1,
 "observed_groups": [
 "SAMPLE_OULAD_STU_100788"
 ]
 }
 ],
 "summarization_warnings": [
 "Dynamic trend comparison requires at least two observed groups; do not infer a pairwise trajectory difference."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8218,
 "token_usage": {
 "prompt_tokens": 2378,
 "completion_tokens": 555,
 "total_tokens": 2933
 },
 "strategy": "comparison",
 "granularity": "per_assessment",
 "cost_usd": 0.00069
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-C01__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "9a722a33d01bb3d4a897407c56d4c045e785b4362e132e752f4af12f316ab517",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2378,
 "completion_tokens": 555,
 "total_tokens": 2933
 },
 "latency_ms": 8234,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-C01",
 "execution_id": "exec_1781847642333_fd75515e",
 "explanation": {
 "summary": "Only one returned student (SAMPLE_OULAD_STU_100788) is present, so between-student divergence is not estimable. At assessment_order=1, returned points are CMA score_normalized=100, TMA score_normalized=92. The observed trough is assessment_order=4 TMA score_normalized=61.",
 "insights": [
 {
 "title": "Returned trajectory scope",
 "description": "The result contains one student only; describe within-student score changes without claiming a comparison between two students.",
 "severity": "low",
 "evidence": []
 }
 ],
 "educational_implications": [
 "Treat the returned rows as one student's observed assessment history only."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is consistent and provides clear performance metrics across multiple assessments.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "trend_comparison",
 "ai_summary_method_warning": null,
 "full_result_row_count": 17,
 "included_row_count": 15,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "trajectory_comparison",
 "row_count": 17,
 "included_row_count": 15
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 15,
 "baseline_reference_tokens": 705,
 "task_aware_prompt_tokens": 1565,
 "token_ratio": 2.2199,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "trend_relationship.divergence_threshold",
 "comparison.pairwise_comparison",
 "primary_finding.evidence_status"
 ],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (2.2199 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_comparison",
 "task_id": "A-C01",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "trajectory_comparison",
 "row_count": 17,
 "group_column": "student_id",
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "available_groups": [
 "SAMPLE_OULAD_STU_100788"
 ],
 "dynamic_comparison_groups": true,
 "alignment_columns": [
 "assessment_order",
 "assessment_type"
 ]
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "group_trends": {
 "SAMPLE_OULAD_STU_100788": {
 "group": "SAMPLE_OULAD_STU_100788",
 "point_count": 17,
 "series_points": [
 {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "score_normalized": 100,
 "source_row_index": 1
 },
 {
 "assessment_order": 1,
 "assessment_type": "TMA",
 "score_normalized": 92,
 "source_row_index": 0
 },
 {
 "assessment_order": 2,
 "assessment_type": "TMA",
 "score_normalized": 90,
 "source_row_index": 2
 },
 {
 "assessment_order": 3,
 "assessment_type": "CMA",
 "score_normalized": 87,
 "source_row_index": 3
 },
 {
 "assessment_order": 3,
 "assessment_type": "TMA",
 "score_normalized": 89,
 "source_row_index": 4
 },
 {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 {
 "assessment_order": 5,
 "assessment_type": "CMA",
 "score_normalized": 90,
 "source_row_index": 6
 },
 {
 "assessment_order": 5,
 "assessment_type": "TMA",
 "score_normalized": 87,
 "source_row_index": 7
 },
 {
 "assessment_order": 6,
 "assessment_type": "CMA",
 "score_normalized": 90,
 "source_row_index": 8
 },
 {
 "assessment_order": 7,
 "assessment_type": "CMA",
 "score_normalized": 92,
 "source_row_index": 9
 },
 {
 "assessment_order": 8,
 "assessment_type": "CMA",
 "score_normalized": 97,
 "source_row_index": 10
 },
 {
 "assessment_order": 8,
 "assessment_type": "CMA",
 "score_normalized": 83,
 "source_row_index": 11
 },
 {
 "assessment_order": 9,
 "assessment_type": "CMA",
 "score_normalized": 85,
 "source_row_index": 13
 },
 {
 "assessment_order": 9,
 "assessment_type": "Exam",
 "score_normalized": 96,
 "source_row_index": 12
 },
 {
 "assessment_order": 10,
 "assessment_type": "CMA",
 "score_normalized": 88,
 "source_row_index": 14
 },
 {
 "assessment_order": 11,
 "assessment_type": "CMA",
 "score_normalized": 93,
 "source_row_index": 15
 },
 {
 "assessment_order": 12,
 "assessment_type": "CMA",
 "score_normalized": 99,
 "source_row_index": 16
 }
 ],
 "first_point": {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "score_normalized": 100,
 "source_row_index": 1
 },
 "last_point": {
 "assessment_order": 12,
 "assessment_type": "CMA",
 "score_normalized": 99,
 "source_row_index": 16
 },
 "net_change": -1,
 "peak": {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "score_normalized": 100,
 "source_row_index": 1
 },
 "trough": {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 3,
 "assessment_type": "TMA",
 "score_normalized": 89,
 "source_row_index": 4
 },
 "to": {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 "delta": -28
 },
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 "to": {
 "assessment_order": 5,
 "assessment_type": "CMA",
 "score_normalized": 90,
 "source_row_index": 6
 },
 "delta": 29
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_group_evidence": [
 {
 "required_group_count": 2,
 "observed_group_count": 1,
 "observed_groups": [
 "SAMPLE_OULAD_STU_100788"
 ]
 }
 ],
 "summarization_warnings": [
 "Dynamic trend comparison requires at least two observed groups; do not infer a pairwise trajectory difference."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_comparison",
 "dataset_name": "trajectory_comparison",
 "row_count": 17,
 "dynamic_comparison_groups": true,
 "group_column": "student_id",
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "alignment_columns": [
 "assessment_order",
 "assessment_type"
 ],
 "divergence_threshold": 5,
 "available_groups": [
 "SAMPLE_OULAD_STU_100788"
 ],
 "evidence_status": "insufficient_evidence",
 "group_trends": {
 "SAMPLE_OULAD_STU_100788": {
 "group": "SAMPLE_OULAD_STU_100788",
 "point_count": 17,
 "series_points": [
 {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "score_normalized": 100,
 "source_row_index": 1
 },
 {
 "assessment_order": 1,
 "assessment_type": "TMA",
 "score_normalized": 92,
 "source_row_index": 0
 },
 {
 "assessment_order": 2,
 "assessment_type": "TMA",
 "score_normalized": 90,
 "source_row_index": 2
 },
 {
 "assessment_order": 3,
 "assessment_type": "CMA",
 "score_normalized": 87,
 "source_row_index": 3
 },
 {
 "assessment_order": 3,
 "assessment_type": "TMA",
 "score_normalized": 89,
 "source_row_index": 4
 },
 {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 {
 "assessment_order": 5,
 "assessment_type": "CMA",
 "score_normalized": 90,
 "source_row_index": 6
 },
 {
 "assessment_order": 5,
 "assessment_type": "TMA",
 "score_normalized": 87,
 "source_row_index": 7
 },
 {
 "assessment_order": 6,
 "assessment_type": "CMA",
 "score_normalized": 90,
 "source_row_index": 8
 },
 {
 "assessment_order": 7,
 "assessment_type": "CMA",
 "score_normalized": 92,
 "source_row_index": 9
 },
 {
 "assessment_order": 8,
 "assessment_type": "CMA",
 "score_normalized": 97,
 "source_row_index": 10
 },
 {
 "assessment_order": 8,
 "assessment_type": "CMA",
 "score_normalized": 83,
 "source_row_index": 11
 },
 {
 "assessment_order": 9,
 "assessment_type": "CMA",
 "score_normalized": 85,
 "source_row_index": 13
 },
 {
 "assessment_order": 9,
 "assessment_type": "Exam",
 "score_normalized": 96,
 "source_row_index": 12
 },
 {
 "assessment_order": 10,
 "assessment_type": "CMA",
 "score_normalized": 88,
 "source_row_index": 14
 },
 {
 "assessment_order": 11,
 "assessment_type": "CMA",
 "score_normalized": 93,
 "source_row_index": 15
 },
 {
 "assessment_order": 12,
 "assessment_type": "CMA",
 "score_normalized": 99,
 "source_row_index": 16
 }
 ],
 "first_point": {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "score_normalized": 100,
 "source_row_index": 1
 },
 "last_point": {
 "assessment_order": 12,
 "assessment_type": "CMA",
 "score_normalized": 99,
 "source_row_index": 16
 },
 "net_change": -1,
 "peak": {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "score_normalized": 100,
 "source_row_index": 1
 },
 "trough": {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 3,
 "assessment_type": "TMA",
 "score_normalized": 89,
 "source_row_index": 4
 },
 "to": {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 "delta": -28
 },
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 4,
 "assessment_type": "TMA",
 "score_normalized": 61,
 "source_row_index": 5
 },
 "to": {
 "assessment_order": 5,
 "assessment_type": "CMA",
 "score_normalized": 90,
 "source_row_index": 6
 },
 "delta": 29
 }
 }
 },
 "pairwise_comparison": null,
 "missing_group_evidence": [
 {
 "required_group_count": 2,
 "observed_group_count": 1,
 "observed_groups": [
 "SAMPLE_OULAD_STU_100788"
 ]
 }
 ],
 "summarization_warnings": [
 "Dynamic trend comparison requires at least two observed groups; do not infer a pairwise trajectory difference."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8218,
 "token_usage": {
 "prompt_tokens": 2378,
 "completion_tokens": 555,
 "total_tokens": 2933
 },
 "strategy": "comparison",
 "granularity": "per_assessment",
 "cost_usd": 0.00069
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
 "expected": 17,
 "observed": 17
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "692c12fd575f64312163abb3e9a2aa01f9aae8cdde11ff1c9576015aacb284fa",
 "expected_values": [
 "692c12fd575f64312163abb3e9a2aa01f9aae8cdde11ff1c9576015aacb284fa"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "48785f01cc655aee0006da16c0f2fe2c34556221cdeadf57e740967a5256dcf2",
 "expected": "48785f01cc655aee0006da16c0f2fe2c34556221cdeadf57e740967a5256dcf2"
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
 "count": 17,
 "min": 1,
 "max": 12
 },
 "score_normalized": {
 "count": 17,
 "min": 61,
 "max": 100
 },
 "week_of_class": {
 "count": 16,
 "min": 3,
 "max": 34
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
