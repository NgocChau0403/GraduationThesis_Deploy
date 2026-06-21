# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__A-C01__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
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
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-C01__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "60c5ed4481a2bf58e3631d65ad807c59043c7d698ac242d61841b875708cb116",
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
 "raw_text": "Summary: Exact trajectory evidence: SAMPLE_UCI_POR_STU_000001 [assessment_order=1:score_normalized=0, assessment_order=2:score_normalized=55, assessment_order=3:score_normalized=55]; SAMPLE_UCI_POR_STU_000002 [assessment_order=1:score_normalized=45, assessment_order=2:score_normalized=55, assessment_order=3:score_normalized=55]. The students differ at assessment 1 and converge at assessments 2 and 3.\n\nInsights: Initial Performance Gap: At the first assessment, Student 1 scored significantly lower than Student 2, indicating a substantial initial performance gap. | Improvement Trajectory: Student 1 showed a significant improvement from the first to the second assessment, increasing their score by 55 points, while Student 2 improved by only 10 points during the same period.\n\nEducational implications: Interpret only the observed divergence at assessment 1 and convergence from assessment 2 onward.",
 "structured_payload": {
 "task_id": "A-C01",
 "execution_id": "exec_1781847231947_8d61eafc",
 "explanation": {
 "summary": "Exact trajectory evidence: SAMPLE_UCI_POR_STU_000001 [assessment_order=1:score_normalized=0, assessment_order=2:score_normalized=55, assessment_order=3:score_normalized=55]; SAMPLE_UCI_POR_STU_000002 [assessment_order=1:score_normalized=45, assessment_order=2:score_normalized=55, assessment_order=3:score_normalized=55]. The students differ at assessment 1 and converge at assessments 2 and 3.",
 "insights": [
 {
 "title": "Initial Performance Gap",
 "description": "At the first assessment, Student 1 scored significantly lower than Student 2, indicating a substantial initial performance gap.",
 "severity": "high",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "Student 1's score at assessment order 1"
 },
 {
 "metric": "score_normalized",
 "value": 45,
 "comparison": "baseline",
 "delta": null,
 "context": "Student 2's score at assessment order 1"
 }
 ]
 },
 {
 "title": "Improvement Trajectory",
 "description": "Student 1 showed a significant improvement from the first to the second assessment, increasing their score by 55 points, while Student 2 improved by only 10 points during the same period.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "up_from_previous",
 "delta": 55,
 "context": "Student 1's score increase from assessment order 1 to 2"
 },
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "up_from_previous",
 "delta": 10,
 "context": "Student 2's score increase from assessment order 1 to 2"
 }
 ]
 }
 ],
 "educational_implications": [
 "Interpret only the observed divergence at assessment 1 and convergence from assessment 2 onward."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data provides clear performance metrics for both students across multiple assessments.",
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
 "full_result_row_count": 6,
 "included_row_count": 6,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "trajectory_comparison",
 "row_count": 6,
 "included_row_count": 6
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 6,
 "baseline_reference_tokens": 259,
 "task_aware_prompt_tokens": 1049,
 "token_ratio": 4.0502,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "trend_relationship.divergence_threshold",
 "comparison.pairwise_comparison"
 ],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (4.0502 > 1.2).",
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
 "row_count": 6,
 "group_column": "student_id",
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "available_groups": [
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
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
 "SAMPLE_UCI_POR_STU_000001": {
 "group": "SAMPLE_UCI_POR_STU_000001",
 "point_count": 3,
 "series_points": [
 {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 1
 },
 {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 2
 }
 ],
 "first_point": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 "last_point": {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 2
 },
 "net_change": 55,
 "peak": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 1
 },
 "trough": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 "largest_adjacent_drop": null,
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 "to": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 1
 },
 "delta": 55
 }
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "group": "SAMPLE_UCI_POR_STU_000002",
 "point_count": 3,
 "series_points": [
 {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 4
 },
 {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 5
 }
 ],
 "first_point": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 "last_point": {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 5
 },
 "net_change": 10,
 "peak": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 4
 },
 "trough": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 "largest_adjacent_drop": null,
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 "to": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 4
 },
 "delta": 10
 }
 }
 },
 "evidence_status": "sufficient_evidence"
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_group_evidence": [],
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_comparison",
 "dataset_name": "trajectory_comparison",
 "row_count": 6,
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
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
 ],
 "evidence_status": "sufficient_evidence",
 "group_trends": {
 "SAMPLE_UCI_POR_STU_000001": {
 "group": "SAMPLE_UCI_POR_STU_000001",
 "point_count": 3,
 "series_points": [
 {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 1
 },
 {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 2
 }
 ],
 "first_point": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 "last_point": {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 2
 },
 "net_change": 55,
 "peak": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 1
 },
 "trough": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 "largest_adjacent_drop": null,
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 "to": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 1
 },
 "delta": 55
 }
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "group": "SAMPLE_UCI_POR_STU_000002",
 "point_count": 3,
 "series_points": [
 {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 4
 },
 {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 5
 }
 ],
 "first_point": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 "last_point": {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 5
 },
 "net_change": 10,
 "peak": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 4
 },
 "trough": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 "largest_adjacent_drop": null,
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 "to": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 4
 },
 "delta": 10
 }
 }
 },
 "pairwise_comparison": {
 "groups": [
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
 ],
 "shared_point_count": 3,
 "unmatched_point_count_by_group": {
 "SAMPLE_UCI_POR_STU_000001": 0,
 "SAMPLE_UCI_POR_STU_000002": 0
 },
 "gap_series": [
 {
 "alignment": {
 "assessment_order": 1,
 "assessment_type": "quiz"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 0,
 "source_values": [
 0
 ],
 "source_row_indexes": [
 0
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 45,
 "source_values": [
 45
 ],
 "source_row_indexes": [
 3
 ],
 "duplicate_count": 1
 }
 },
 "gap": -45,
 "absolute_gap": 45
 },
 {
 "alignment": {
 "assessment_order": 2,
 "assessment_type": "quiz"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 55,
 "source_values": [
 55
 ],
 "source_row_indexes": [
 1
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 55,
 "source_values": [
 55
 ],
 "source_row_indexes": [
 4
 ],
 "duplicate_count": 1
 }
 },
 "gap": 0,
 "absolute_gap": 0
 },
 {
 "alignment": {
 "assessment_order": 3,
 "assessment_type": "exam"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 55,
 "source_values": [
 55
 ],
 "source_row_indexes": [
 2
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 55,
 "source_values": [
 55
 ],
 "source_row_indexes": [
 5
 ],
 "duplicate_count": 1
 }
 },
 "gap": 0,
 "absolute_gap": 0
 }
 ],
 "first_shared_point": {
 "alignment": {
 "assessment_order": 1,
 "assessment_type": "quiz"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 0,
 "source_values": [
 0
 ],
 "source_row_indexes": [
 0
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 45,
 "source_values": [
 45
 ],
 "source_row_indexes": [
 3
 ],
 "duplicate_count": 1
 }
 },
 "gap": -45,
 "absolute_gap": 45
 },
 "last_shared_point": {
 "alignment": {
 "assessment_order": 3,
 "assessment_type": "exam"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 55,
 "source_values": [
 55
 ],
 "source_row_indexes": [
 2
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 55,
 "source_values": [
 55
 ],
 "source_row_indexes": [
 5
 ],
 "duplicate_count": 1
 }
 },
 "gap": 0,
 "absolute_gap": 0
 },
 "first_divergence": {
 "alignment": {
 "assessment_order": 1,
 "assessment_type": "quiz"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 0,
 "source_values": [
 0
 ],
 "source_row_indexes": [
 0
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 45,
 "source_values": [
 45
 ],
 "source_row_indexes": [
 3
 ],
 "duplicate_count": 1
 }
 },
 "gap": -45,
 "absolute_gap": 45
 },
 "largest_absolute_gap": {
 "alignment": {
 "assessment_order": 1,
 "assessment_type": "quiz"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 0,
 "source_values": [
 0
 ],
 "source_row_indexes": [
 0
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 45,
 "source_values": [
 45
 ],
 "source_row_indexes": [
 3
 ],
 "duplicate_count": 1
 }
 },
 "gap": -45,
 "absolute_gap": 45
 },
 "net_change_by_group": {
 "SAMPLE_UCI_POR_STU_000001": 55,
 "SAMPLE_UCI_POR_STU_000002": 10
 },
 "faster_improving_group": "SAMPLE_UCI_POR_STU_000001",
 "comparison_warnings": []
 },
 "missing_group_evidence": [],
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5972,
 "token_usage": {
 "prompt_tokens": 1703,
 "completion_tokens": 527,
 "total_tokens": 2230
 },
 "strategy": "comparison",
 "granularity": "per_assessment",
 "cost_usd": 0.000572
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-C01__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "60c5ed4481a2bf58e3631d65ad807c59043c7d698ac242d61841b875708cb116",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1703,
 "completion_tokens": 527,
 "total_tokens": 2230
 },
 "latency_ms": 6024,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-C01",
 "execution_id": "exec_1781847231947_8d61eafc",
 "explanation": {
 "summary": "Exact trajectory evidence: SAMPLE_UCI_POR_STU_000001 [assessment_order=1:score_normalized=0, assessment_order=2:score_normalized=55, assessment_order=3:score_normalized=55]; SAMPLE_UCI_POR_STU_000002 [assessment_order=1:score_normalized=45, assessment_order=2:score_normalized=55, assessment_order=3:score_normalized=55]. The students differ at assessment 1 and converge at assessments 2 and 3.",
 "insights": [
 {
 "title": "Initial Performance Gap",
 "description": "At the first assessment, Student 1 scored significantly lower than Student 2, indicating a substantial initial performance gap.",
 "severity": "high",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "Student 1's score at assessment order 1"
 },
 {
 "metric": "score_normalized",
 "value": 45,
 "comparison": "baseline",
 "delta": null,
 "context": "Student 2's score at assessment order 1"
 }
 ]
 },
 {
 "title": "Improvement Trajectory",
 "description": "Student 1 showed a significant improvement from the first to the second assessment, increasing their score by 55 points, while Student 2 improved by only 10 points during the same period.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "up_from_previous",
 "delta": 55,
 "context": "Student 1's score increase from assessment order 1 to 2"
 },
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "up_from_previous",
 "delta": 10,
 "context": "Student 2's score increase from assessment order 1 to 2"
 }
 ]
 }
 ],
 "educational_implications": [
 "Interpret only the observed divergence at assessment 1 and convergence from assessment 2 onward."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data provides clear performance metrics for both students across multiple assessments.",
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
 "full_result_row_count": 6,
 "included_row_count": 6,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "trajectory_comparison",
 "row_count": 6,
 "included_row_count": 6
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 6,
 "baseline_reference_tokens": 259,
 "task_aware_prompt_tokens": 1049,
 "token_ratio": 4.0502,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "trend_relationship.divergence_threshold",
 "comparison.pairwise_comparison"
 ],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (4.0502 > 1.2).",
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
 "row_count": 6,
 "group_column": "student_id",
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "available_groups": [
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
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
 "SAMPLE_UCI_POR_STU_000001": {
 "group": "SAMPLE_UCI_POR_STU_000001",
 "point_count": 3,
 "series_points": [
 {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 1
 },
 {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 2
 }
 ],
 "first_point": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 "last_point": {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 2
 },
 "net_change": 55,
 "peak": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 1
 },
 "trough": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 "largest_adjacent_drop": null,
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 "to": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 1
 },
 "delta": 55
 }
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "group": "SAMPLE_UCI_POR_STU_000002",
 "point_count": 3,
 "series_points": [
 {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 4
 },
 {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 5
 }
 ],
 "first_point": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 "last_point": {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 5
 },
 "net_change": 10,
 "peak": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 4
 },
 "trough": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 "largest_adjacent_drop": null,
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 "to": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 4
 },
 "delta": 10
 }
 }
 },
 "evidence_status": "sufficient_evidence"
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_group_evidence": [],
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_comparison",
 "dataset_name": "trajectory_comparison",
 "row_count": 6,
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
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
 ],
 "evidence_status": "sufficient_evidence",
 "group_trends": {
 "SAMPLE_UCI_POR_STU_000001": {
 "group": "SAMPLE_UCI_POR_STU_000001",
 "point_count": 3,
 "series_points": [
 {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 1
 },
 {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 2
 }
 ],
 "first_point": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 "last_point": {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 2
 },
 "net_change": 55,
 "peak": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 1
 },
 "trough": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 "largest_adjacent_drop": null,
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 0,
 "source_row_index": 0
 },
 "to": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 1
 },
 "delta": 55
 }
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "group": "SAMPLE_UCI_POR_STU_000002",
 "point_count": 3,
 "series_points": [
 {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 4
 },
 {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 5
 }
 ],
 "first_point": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 "last_point": {
 "assessment_order": 3,
 "assessment_type": "exam",
 "score_normalized": 55,
 "source_row_index": 5
 },
 "net_change": 10,
 "peak": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 4
 },
 "trough": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 "largest_adjacent_drop": null,
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 1,
 "assessment_type": "quiz",
 "score_normalized": 45,
 "source_row_index": 3
 },
 "to": {
 "assessment_order": 2,
 "assessment_type": "quiz",
 "score_normalized": 55,
 "source_row_index": 4
 },
 "delta": 10
 }
 }
 },
 "pairwise_comparison": {
 "groups": [
 "SAMPLE_UCI_POR_STU_000001",
 "SAMPLE_UCI_POR_STU_000002"
 ],
 "shared_point_count": 3,
 "unmatched_point_count_by_group": {
 "SAMPLE_UCI_POR_STU_000001": 0,
 "SAMPLE_UCI_POR_STU_000002": 0
 },
 "gap_series": [
 {
 "alignment": {
 "assessment_order": 1,
 "assessment_type": "quiz"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 0,
 "source_values": [
 0
 ],
 "source_row_indexes": [
 0
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 45,
 "source_values": [
 45
 ],
 "source_row_indexes": [
 3
 ],
 "duplicate_count": 1
 }
 },
 "gap": -45,
 "absolute_gap": 45
 },
 {
 "alignment": {
 "assessment_order": 2,
 "assessment_type": "quiz"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 55,
 "source_values": [
 55
 ],
 "source_row_indexes": [
 1
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 55,
 "source_values": [
 55
 ],
 "source_row_indexes": [
 4
 ],
 "duplicate_count": 1
 }
 },
 "gap": 0,
 "absolute_gap": 0
 },
 {
 "alignment": {
 "assessment_order": 3,
 "assessment_type": "exam"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 55,
 "source_values": [
 55
 ],
 "source_row_indexes": [
 2
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 55,
 "source_values": [
 55
 ],
 "source_row_indexes": [
 5
 ],
 "duplicate_count": 1
 }
 },
 "gap": 0,
 "absolute_gap": 0
 }
 ],
 "first_shared_point": {
 "alignment": {
 "assessment_order": 1,
 "assessment_type": "quiz"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 0,
 "source_values": [
 0
 ],
 "source_row_indexes": [
 0
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 45,
 "source_values": [
 45
 ],
 "source_row_indexes": [
 3
 ],
 "duplicate_count": 1
 }
 },
 "gap": -45,
 "absolute_gap": 45
 },
 "last_shared_point": {
 "alignment": {
 "assessment_order": 3,
 "assessment_type": "exam"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 55,
 "source_values": [
 55
 ],
 "source_row_indexes": [
 2
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 55,
 "source_values": [
 55
 ],
 "source_row_indexes": [
 5
 ],
 "duplicate_count": 1
 }
 },
 "gap": 0,
 "absolute_gap": 0
 },
 "first_divergence": {
 "alignment": {
 "assessment_order": 1,
 "assessment_type": "quiz"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 0,
 "source_values": [
 0
 ],
 "source_row_indexes": [
 0
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 45,
 "source_values": [
 45
 ],
 "source_row_indexes": [
 3
 ],
 "duplicate_count": 1
 }
 },
 "gap": -45,
 "absolute_gap": 45
 },
 "largest_absolute_gap": {
 "alignment": {
 "assessment_order": 1,
 "assessment_type": "quiz"
 },
 "group_values": {
 "SAMPLE_UCI_POR_STU_000001": {
 "value": 0,
 "source_values": [
 0
 ],
 "source_row_indexes": [
 0
 ],
 "duplicate_count": 1
 },
 "SAMPLE_UCI_POR_STU_000002": {
 "value": 45,
 "source_values": [
 45
 ],
 "source_row_indexes": [
 3
 ],
 "duplicate_count": 1
 }
 },
 "gap": -45,
 "absolute_gap": 45
 },
 "net_change_by_group": {
 "SAMPLE_UCI_POR_STU_000001": 55,
 "SAMPLE_UCI_POR_STU_000002": 10
 },
 "faster_improving_group": "SAMPLE_UCI_POR_STU_000001",
 "comparison_warnings": []
 },
 "missing_group_evidence": [],
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5972,
 "token_usage": {
 "prompt_tokens": 1703,
 "completion_tokens": 527,
 "total_tokens": 2230
 },
 "strategy": "comparison",
 "granularity": "per_assessment",
 "cost_usd": 0.000572
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
