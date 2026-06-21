# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__A-S02__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "A-S02",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Student score trend",
 "scope": "1 student",
 "actionable_question": "Is this student getting better or worse — and how fast?",
 "target_audience": "instructor, academic_advisor",
 "ai_summary_type": "trend_series",
 "ai_prompt_hint": "Identify whether student is improving or declining. Reference performance_trend [FE] slope direction and magnitude.",
 "query_labels": [
 "score_trend"
 ],
 "explanation_strategy": "trend"
}
```

## Schema Context

```json
{
 "source_tables": [
 "assessment_result",
 "assessment"
 ],
 "key_db_fields": [
 "score_normalized",
 "assessment_order",
 "week_of_class",
 "assessment_type; performance_trend [FE cross]"
 ],
 "output_schema": {},
 "query_labels": [
 "score_trend"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-S02-CORE-01",
 "description": "Identify whether student is improving or declining."
 },
 {
 "requirement_id": "A-S02-CORE-02",
 "description": "Reference performance_trend [FE] slope direction and magnitude."
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
 "dataset_label": "score_trend",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S02.json",
 "artifact_sha256": "72108ee605062713875e9b51c1edab9174e1c8cfa4274c8b299942490cfb73ba",
 "row_count": 3,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 3,
 "prompt_embedded_row_count": 3,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "72108ee605062713875e9b51c1edab9174e1c8cfa4274c8b299942490cfb73ba",
 "evidence_rows_sha256": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9",
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
 "full_result_row_count": 3,
 "embedded_datasets_sha256": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9",
 "datasets": {
 "score_trend": [
 {
 "assessment_order": 1,
 "week_of_class": 3,
 "assessment_type": "quiz",
 "assessment_name": "G1",
 "score_normalized": 0,
 "pass_flag": false,
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "below_pass_threshold": true,
 "below_target_threshold": true,
 "performance_trend": 27.5,
 "support_level": "urgent_support",
 "recommended_action": "Review this assessment with tutor support; focus on missed core concepts before the next assessment."
 },
 {
 "assessment_order": 2,
 "week_of_class": 8,
 "assessment_type": "quiz",
 "assessment_name": "G2",
 "score_normalized": 55,
 "pass_flag": true,
 "class_avg_score": 57.85,
 "score_vs_class_avg": -2.85,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "below_pass_threshold": false,
 "below_target_threshold": true,
 "performance_trend": 27.5,
 "support_level": "targeted_practice",
 "recommended_action": "Practice similar questions and review feedback to move from pass-level to target-level performance."
 },
 {
 "assessment_order": 3,
 "week_of_class": 14,
 "assessment_type": "exam",
 "assessment_name": "G3",
 "score_normalized": 55,
 "pass_flag": true,
 "class_avg_score": 59.53,
 "score_vs_class_avg": -4.53,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "below_pass_threshold": false,
 "below_target_threshold": true,
 "performance_trend": 27.5,
 "support_level": "targeted_practice",
 "recommended_action": "Practice similar questions and review feedback to move from pass-level to target-level performance."
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-S02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "0a71a45df0ce01c4c9c5266e65a5a2191e2a9727041e91be0882c933c9b8b314",
 "generator_input_sha256": "f4b4e29d0d2efa47d0e07ee34a5e9f350702595b6abf912c9646df170969040e",
 "generator_input_compact": {
 "task_id": "A-S02",
 "execution_id": "exec_1781847237997_d66cf4ec",
 "task_name": "Student score trend",
 "analysis_type": "trend",
 "explanation_strategy": "trend",
 "actionable_question": "Is this student getting better or worse — and how fast?",
 "target_audience": [
 "instructor",
 "academic_advisor"
 ],
 "query_labels": [
 "score_trend"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "score_trend"
 ],
 "dataset_row_counts": {
 "score_trend": 3
 },
 "ai_summary_config_summary": {
 "summary_type": "trend_series",
 "metric_column": "score_normalized",
 "entity_column": null,
 "group_column": null,
 "time_column": "assessment_order",
 "sort_by": null,
 "sort_direction": "asc",
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
 "raw_text": "Summary: The student demonstrated a significant improvement in performance from Assessment 1 to Assessment 3, with a normalized score increase of 55 points. Despite this improvement, the scores remain below the target threshold, indicating ongoing challenges.\n\nInsights: Initial Struggles: In Assessment 1, the student scored 0, which is significantly below the pass threshold of 40, indicating a critical need for support. | Improvement Noted: By Assessment 3, the student's score improved to 55, marking a substantial increase of 55 points from the initial assessment, although still below the target threshold of 70. | Consistent Performance Level: The scores in Assessments 2 and 3 remained stable at 55, indicating that while the student passed, there is a plateau in performance that needs addressing.\n\nEducational implications: The initial failure indicates a need for immediate intervention and support to address foundational knowledge gaps. | The plateau in performance suggests that while the student has made progress, further targeted practice is necessary to reach the target performance level.\n\nRecommendations: high - Implement targeted tutoring sessions focusing on core concepts that were missed in Assessment 1. - This will help the student build a stronger foundation and improve their understanding, which is crucial for future assessments. | medium - Encourage the student to engage in practice assessments that align with the target level to enhance their performance. - This will help bridge the gap between current performance and the target threshold.",
 "structured_payload": {
 "task_id": "A-S02",
 "execution_id": "exec_1781847237997_d66cf4ec",
 "explanation": {
 "summary": "The student demonstrated a significant improvement in performance from Assessment 1 to Assessment 3, with a normalized score increase of 55 points. Despite this improvement, the scores remain below the target threshold, indicating ongoing challenges.",
 "insights": [
 {
 "title": "Initial Struggles",
 "description": "In Assessment 1, the student scored 0, which is significantly below the pass threshold of 40, indicating a critical need for support.",
 "severity": "high",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "Assessment 1"
 }
 ]
 },
 {
 "title": "Improvement Noted",
 "description": "By Assessment 3, the student's score improved to 55, marking a substantial increase of 55 points from the initial assessment, although still below the target threshold of 70.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "up_from_previous",
 "delta": 55,
 "context": "Assessment 3 compared to Assessment 1"
 }
 ]
 },
 {
 "title": "Consistent Performance Level",
 "description": "The scores in Assessments 2 and 3 remained stable at 55, indicating that while the student passed, there is a plateau in performance that needs addressing.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "stable",
 "delta": 0,
 "context": "Assessment 2 and Assessment 3"
 }
 ]
 }
 ],
 "educational_implications": [
 "The initial failure indicates a need for immediate intervention and support to address foundational knowledge gaps.",
 "The plateau in performance suggests that while the student has made progress, further targeted practice is necessary to reach the target performance level."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted tutoring sessions focusing on core concepts that were missed in Assessment 1.",
 "rationale": "This will help the student build a stronger foundation and improve their understanding, which is crucial for future assessments."
 },
 {
 "priority": "medium",
 "action": "Encourage the student to engage in practice assessments that align with the target level to enhance their performance.",
 "rationale": "This will help bridge the gap between current performance and the target threshold."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is strong with a substantial sample size of 649 students across 3 assessments.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "trend",
 "explanation_type": "trend",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "trend_series",
 "ai_summary_method_warning": null,
 "full_result_row_count": 3,
 "included_row_count": 3,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "score_trend",
 "row_count": 3,
 "included_row_count": 3
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 3,
 "baseline_reference_tokens": 445,
 "task_aware_prompt_tokens": 1520,
 "token_ratio": 3.4157,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "trend_relationship",
 "exceptions",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.trough",
 "exceptions.peak",
 "trend_relationship.largest_adjacent_rise",
 "comparison.multi_dataset_evidence",
 "comparison.secondary_metric_associations",
 "comparison.secondary_metric_evidence"
 ],
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present."
 ],
 "must_keep_keys": [
 "action_evidence",
 "dataset_name",
 "first_point",
 "flagged_points",
 "largest_adjacent_drop",
 "last_point",
 "metric_column",
 "overall_change",
 "point_count",
 "row_count",
 "small_sample_caveats",
 "summarization_warnings",
 "time_column"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.4157 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "A-S02",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "score_trend",
 "row_count": 3,
 "point_count": 3,
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "dataset_roles": {},
 "metric_units": {},
 "metric_directions": {}
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "first_point": {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 }
 },
 "last_point": {
 "assessment_order": 3,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G3",
 "assessment_type": "exam",
 "week_of_class": 14
 },
 "secondary_metrics": {
 "class_avg_score": 59.53,
 "score_vs_class_avg": -4.53,
 "performance_trend": 27.5,
 "pass_flag": true
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 }
 },
 "to": {
 "assessment_order": 3,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G3",
 "assessment_type": "exam",
 "week_of_class": 14
 },
 "secondary_metrics": {
 "class_avg_score": 59.53,
 "score_vs_class_avg": -4.53,
 "performance_trend": 27.5,
 "pass_flag": true
 }
 },
 "delta": 55,
 "percent_change": null
 }
 }
 },
 {
 "name": "trend_relationship",
 "facts": {
 "largest_adjacent_drop": null
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flagged_points": [
 {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 },
 "flags": {
 "below_pass_threshold": true,
 "below_target_threshold": true
 },
 "flag_raw_values": {
 "below_pass_threshold": true,
 "below_target_threshold": true
 }
 },
 {
 "assessment_order": 2,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G2",
 "assessment_type": "quiz",
 "week_of_class": 8
 },
 "secondary_metrics": {
 "class_avg_score": 57.85,
 "score_vs_class_avg": -2.85,
 "performance_trend": 27.5,
 "pass_flag": true
 },
 "flags": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 },
 "flag_raw_values": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 }
 },
 {
 "assessment_order": 3,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G3",
 "assessment_type": "exam",
 "week_of_class": 14
 },
 "secondary_metrics": {
 "class_avg_score": 59.53,
 "score_vs_class_avg": -4.53,
 "performance_trend": 27.5,
 "pass_flag": true
 },
 "flags": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 },
 "flag_raw_values": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 }
 }
 ]
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "action_evidence": [
 {
 "assessment_order": 1,
 "action_column": "support_level",
 "action": "urgent_support"
 },
 {
 "assessment_order": 1,
 "action_column": "recommended_action",
 "action": "Review this assessment with tutor support; focus on missed core concepts before the next assessment."
 },
 {
 "assessment_order": 2,
 "action_column": "support_level",
 "action": "targeted_practice"
 },
 {
 "assessment_order": 2,
 "action_column": "recommended_action",
 "action": "Practice similar questions and review feedback to move from pass-level to target-level performance."
 }
 ]
 }
 },
 {
 "name": "limitations",
 "facts": {
 "small_sample_caveats": [],
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_series",
 "dataset_name": "score_trend",
 "row_count": 3,
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "metric_units": {},
 "metric_directions": {},
 "dataset_roles": {},
 "point_count": 3,
 "first_point": {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 }
 },
 "last_point": {
 "assessment_order": 3,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G3",
 "assessment_type": "exam",
 "week_of_class": 14
 },
 "secondary_metrics": {
 "class_avg_score": 59.53,
 "score_vs_class_avg": -4.53,
 "performance_trend": 27.5,
 "pass_flag": true
 }
 },
 "peak": {
 "assessment_order": 2,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G2",
 "assessment_type": "quiz",
 "week_of_class": 8
 },
 "secondary_metrics": {
 "class_avg_score": 57.85,
 "score_vs_class_avg": -2.85,
 "performance_trend": 27.5,
 "pass_flag": true
 }
 },
 "trough": {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 }
 },
 "to": {
 "assessment_order": 3,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G3",
 "assessment_type": "exam",
 "week_of_class": 14
 },
 "secondary_metrics": {
 "class_avg_score": 59.53,
 "score_vs_class_avg": -4.53,
 "performance_trend": 27.5,
 "pass_flag": true
 }
 },
 "delta": 55,
 "percent_change": null
 },
 "largest_adjacent_drop": null,
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 }
 },
 "to": {
 "assessment_order": 2,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G2",
 "assessment_type": "quiz",
 "week_of_class": 8
 },
 "secondary_metrics": {
 "class_avg_score": 57.85,
 "score_vs_class_avg": -2.85,
 "performance_trend": 27.5,
 "pass_flag": true
 }
 },
 "delta": 55
 },
 "flagged_points": [
 {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 },
 "flags": {
 "below_pass_threshold": true,
 "below_target_threshold": true
 },
 "flag_raw_values": {
 "below_pass_threshold": true,
 "below_target_threshold": true
 }
 },
 {
 "assessment_order": 2,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G2",
 "assessment_type": "quiz",
 "week_of_class": 8
 },
 "secondary_metrics": {
 "class_avg_score": 57.85,
 "score_vs_class_avg": -2.85,
 "performance_trend": 27.5,
 "pass_flag": true
 },
 "flags": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 },
 "flag_raw_values": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 }
 },
 {
 "assessment_order": 3,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G3",
 "assessment_type": "exam",
 "week_of_class": 14
 },
 "secondary_metrics": {
 "class_avg_score": 59.53,
 "score_vs_class_avg": -4.53,
 "performance_trend": 27.5,
 "pass_flag": true
 },
 "flags": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 },
 "flag_raw_values": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 }
 }
 ],
 "secondary_metric_evidence": {
 "class_avg_score": {
 "count": 3,
 "min": 57,
 "max": 59.53,
 "first": 57,
 "last": 59.53
 },
 "score_vs_class_avg": {
 "count": 3,
 "min": -57,
 "max": -2.85,
 "first": -57,
 "last": -4.53
 },
 "performance_trend": {
 "count": 3,
 "min": 27.5,
 "max": 27.5,
 "first": 27.5,
 "last": 27.5
 },
 "pass_flag": {
 "first": false,
 "last": true,
 "distinct_values": [
 "False",
 "True"
 ]
 }
 },
 "secondary_metric_associations": {
 "class_avg_score": {
 "paired_point_count": 3,
 "method": "pearson_on_aligned_points",
 "correlation": 0.7578,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "score_vs_class_avg": {
 "paired_point_count": 3,
 "method": "pearson_on_aligned_points",
 "correlation": 0.9996,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "performance_trend": {
 "paired_point_count": 3,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "pass_flag": {
 "paired_point_count": 3,
 "method": "non_numeric_values_preserved",
 "correlation": null,
 "claim_limit": "descriptive_context_only"
 }
 },
 "multi_dataset_evidence": [],
 "small_sample_caveats": [],
 "causal_claim_allowed": false,
 "action_evidence": [
 {
 "assessment_order": 1,
 "action_column": "support_level",
 "action": "urgent_support"
 },
 {
 "assessment_order": 1,
 "action_column": "recommended_action",
 "action": "Review this assessment with tutor support; focus on missed core concepts before the next assessment."
 },
 {
 "assessment_order": 2,
 "action_column": "support_level",
 "action": "targeted_practice"
 },
 {
 "assessment_order": 2,
 "action_column": "recommended_action",
 "action": "Practice similar questions and review feedback to move from pass-level to target-level performance."
 }
 ],
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 9281,
 "token_usage": {
 "prompt_tokens": 2355,
 "completion_tokens": 627,
 "total_tokens": 2982
 },
 "strategy": "trend",
 "granularity": "per_assessment",
 "cost_usd": 0.000729
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-S02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "0a71a45df0ce01c4c9c5266e65a5a2191e2a9727041e91be0882c933c9b8b314",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2355,
 "completion_tokens": 627,
 "total_tokens": 2982
 },
 "latency_ms": 9421,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-S02",
 "execution_id": "exec_1781847237997_d66cf4ec",
 "explanation": {
 "summary": "The student demonstrated a significant improvement in performance from Assessment 1 to Assessment 3, with a normalized score increase of 55 points. Despite this improvement, the scores remain below the target threshold, indicating ongoing challenges.",
 "insights": [
 {
 "title": "Initial Struggles",
 "description": "In Assessment 1, the student scored 0, which is significantly below the pass threshold of 40, indicating a critical need for support.",
 "severity": "high",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "Assessment 1"
 }
 ]
 },
 {
 "title": "Improvement Noted",
 "description": "By Assessment 3, the student's score improved to 55, marking a substantial increase of 55 points from the initial assessment, although still below the target threshold of 70.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "up_from_previous",
 "delta": 55,
 "context": "Assessment 3 compared to Assessment 1"
 }
 ]
 },
 {
 "title": "Consistent Performance Level",
 "description": "The scores in Assessments 2 and 3 remained stable at 55, indicating that while the student passed, there is a plateau in performance that needs addressing.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "stable",
 "delta": 0,
 "context": "Assessment 2 and Assessment 3"
 }
 ]
 }
 ],
 "educational_implications": [
 "The initial failure indicates a need for immediate intervention and support to address foundational knowledge gaps.",
 "The plateau in performance suggests that while the student has made progress, further targeted practice is necessary to reach the target performance level."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted tutoring sessions focusing on core concepts that were missed in Assessment 1.",
 "rationale": "This will help the student build a stronger foundation and improve their understanding, which is crucial for future assessments."
 },
 {
 "priority": "medium",
 "action": "Encourage the student to engage in practice assessments that align with the target level to enhance their performance.",
 "rationale": "This will help bridge the gap between current performance and the target threshold."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is strong with a substantial sample size of 649 students across 3 assessments.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "trend",
 "explanation_type": "trend",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "trend_series",
 "ai_summary_method_warning": null,
 "full_result_row_count": 3,
 "included_row_count": 3,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "score_trend",
 "row_count": 3,
 "included_row_count": 3
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 3,
 "baseline_reference_tokens": 445,
 "task_aware_prompt_tokens": 1520,
 "token_ratio": 3.4157,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "trend_relationship",
 "exceptions",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.trough",
 "exceptions.peak",
 "trend_relationship.largest_adjacent_rise",
 "comparison.multi_dataset_evidence",
 "comparison.secondary_metric_associations",
 "comparison.secondary_metric_evidence"
 ],
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present."
 ],
 "must_keep_keys": [
 "action_evidence",
 "dataset_name",
 "first_point",
 "flagged_points",
 "largest_adjacent_drop",
 "last_point",
 "metric_column",
 "overall_change",
 "point_count",
 "row_count",
 "small_sample_caveats",
 "summarization_warnings",
 "time_column"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.4157 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "A-S02",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "score_trend",
 "row_count": 3,
 "point_count": 3,
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "dataset_roles": {},
 "metric_units": {},
 "metric_directions": {}
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "first_point": {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 }
 },
 "last_point": {
 "assessment_order": 3,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G3",
 "assessment_type": "exam",
 "week_of_class": 14
 },
 "secondary_metrics": {
 "class_avg_score": 59.53,
 "score_vs_class_avg": -4.53,
 "performance_trend": 27.5,
 "pass_flag": true
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 }
 },
 "to": {
 "assessment_order": 3,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G3",
 "assessment_type": "exam",
 "week_of_class": 14
 },
 "secondary_metrics": {
 "class_avg_score": 59.53,
 "score_vs_class_avg": -4.53,
 "performance_trend": 27.5,
 "pass_flag": true
 }
 },
 "delta": 55,
 "percent_change": null
 }
 }
 },
 {
 "name": "trend_relationship",
 "facts": {
 "largest_adjacent_drop": null
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flagged_points": [
 {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 },
 "flags": {
 "below_pass_threshold": true,
 "below_target_threshold": true
 },
 "flag_raw_values": {
 "below_pass_threshold": true,
 "below_target_threshold": true
 }
 },
 {
 "assessment_order": 2,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G2",
 "assessment_type": "quiz",
 "week_of_class": 8
 },
 "secondary_metrics": {
 "class_avg_score": 57.85,
 "score_vs_class_avg": -2.85,
 "performance_trend": 27.5,
 "pass_flag": true
 },
 "flags": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 },
 "flag_raw_values": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 }
 },
 {
 "assessment_order": 3,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G3",
 "assessment_type": "exam",
 "week_of_class": 14
 },
 "secondary_metrics": {
 "class_avg_score": 59.53,
 "score_vs_class_avg": -4.53,
 "performance_trend": 27.5,
 "pass_flag": true
 },
 "flags": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 },
 "flag_raw_values": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 }
 }
 ]
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "action_evidence": [
 {
 "assessment_order": 1,
 "action_column": "support_level",
 "action": "urgent_support"
 },
 {
 "assessment_order": 1,
 "action_column": "recommended_action",
 "action": "Review this assessment with tutor support; focus on missed core concepts before the next assessment."
 },
 {
 "assessment_order": 2,
 "action_column": "support_level",
 "action": "targeted_practice"
 },
 {
 "assessment_order": 2,
 "action_column": "recommended_action",
 "action": "Practice similar questions and review feedback to move from pass-level to target-level performance."
 }
 ]
 }
 },
 {
 "name": "limitations",
 "facts": {
 "small_sample_caveats": [],
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_series",
 "dataset_name": "score_trend",
 "row_count": 3,
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "metric_units": {},
 "metric_directions": {},
 "dataset_roles": {},
 "point_count": 3,
 "first_point": {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 }
 },
 "last_point": {
 "assessment_order": 3,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G3",
 "assessment_type": "exam",
 "week_of_class": 14
 },
 "secondary_metrics": {
 "class_avg_score": 59.53,
 "score_vs_class_avg": -4.53,
 "performance_trend": 27.5,
 "pass_flag": true
 }
 },
 "peak": {
 "assessment_order": 2,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G2",
 "assessment_type": "quiz",
 "week_of_class": 8
 },
 "secondary_metrics": {
 "class_avg_score": 57.85,
 "score_vs_class_avg": -2.85,
 "performance_trend": 27.5,
 "pass_flag": true
 }
 },
 "trough": {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 }
 },
 "to": {
 "assessment_order": 3,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G3",
 "assessment_type": "exam",
 "week_of_class": 14
 },
 "secondary_metrics": {
 "class_avg_score": 59.53,
 "score_vs_class_avg": -4.53,
 "performance_trend": 27.5,
 "pass_flag": true
 }
 },
 "delta": 55,
 "percent_change": null
 },
 "largest_adjacent_drop": null,
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 }
 },
 "to": {
 "assessment_order": 2,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G2",
 "assessment_type": "quiz",
 "week_of_class": 8
 },
 "secondary_metrics": {
 "class_avg_score": 57.85,
 "score_vs_class_avg": -2.85,
 "performance_trend": 27.5,
 "pass_flag": true
 }
 },
 "delta": 55
 },
 "flagged_points": [
 {
 "assessment_order": 1,
 "score_normalized": 0,
 "labels": {
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 57,
 "score_vs_class_avg": -57,
 "performance_trend": 27.5,
 "pass_flag": false
 },
 "flags": {
 "below_pass_threshold": true,
 "below_target_threshold": true
 },
 "flag_raw_values": {
 "below_pass_threshold": true,
 "below_target_threshold": true
 }
 },
 {
 "assessment_order": 2,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G2",
 "assessment_type": "quiz",
 "week_of_class": 8
 },
 "secondary_metrics": {
 "class_avg_score": 57.85,
 "score_vs_class_avg": -2.85,
 "performance_trend": 27.5,
 "pass_flag": true
 },
 "flags": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 },
 "flag_raw_values": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 }
 },
 {
 "assessment_order": 3,
 "score_normalized": 55,
 "labels": {
 "assessment_name": "G3",
 "assessment_type": "exam",
 "week_of_class": 14
 },
 "secondary_metrics": {
 "class_avg_score": 59.53,
 "score_vs_class_avg": -4.53,
 "performance_trend": 27.5,
 "pass_flag": true
 },
 "flags": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 },
 "flag_raw_values": {
 "below_pass_threshold": false,
 "below_target_threshold": true
 }
 }
 ],
 "secondary_metric_evidence": {
 "class_avg_score": {
 "count": 3,
 "min": 57,
 "max": 59.53,
 "first": 57,
 "last": 59.53
 },
 "score_vs_class_avg": {
 "count": 3,
 "min": -57,
 "max": -2.85,
 "first": -57,
 "last": -4.53
 },
 "performance_trend": {
 "count": 3,
 "min": 27.5,
 "max": 27.5,
 "first": 27.5,
 "last": 27.5
 },
 "pass_flag": {
 "first": false,
 "last": true,
 "distinct_values": [
 "False",
 "True"
 ]
 }
 },
 "secondary_metric_associations": {
 "class_avg_score": {
 "paired_point_count": 3,
 "method": "pearson_on_aligned_points",
 "correlation": 0.7578,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "score_vs_class_avg": {
 "paired_point_count": 3,
 "method": "pearson_on_aligned_points",
 "correlation": 0.9996,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "performance_trend": {
 "paired_point_count": 3,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "pass_flag": {
 "paired_point_count": 3,
 "method": "non_numeric_values_preserved",
 "correlation": null,
 "claim_limit": "descriptive_context_only"
 }
 },
 "multi_dataset_evidence": [],
 "small_sample_caveats": [],
 "causal_claim_allowed": false,
 "action_evidence": [
 {
 "assessment_order": 1,
 "action_column": "support_level",
 "action": "urgent_support"
 },
 {
 "assessment_order": 1,
 "action_column": "recommended_action",
 "action": "Review this assessment with tutor support; focus on missed core concepts before the next assessment."
 },
 {
 "assessment_order": 2,
 "action_column": "support_level",
 "action": "targeted_practice"
 },
 {
 "assessment_order": 2,
 "action_column": "recommended_action",
 "action": "Practice similar questions and review feedback to move from pass-level to target-level performance."
 }
 ],
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 9281,
 "token_usage": {
 "prompt_tokens": 2355,
 "completion_tokens": 627,
 "total_tokens": 2982
 },
 "strategy": "trend",
 "granularity": "per_assessment",
 "cost_usd": 0.000729
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
 "expected": 3,
 "observed": 3
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "72108ee605062713875e9b51c1edab9174e1c8cfa4274c8b299942490cfb73ba",
 "expected_values": [
 "72108ee605062713875e9b51c1edab9174e1c8cfa4274c8b299942490cfb73ba"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9",
 "expected": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9"
 },
 {
 "check_id": "numeric_fields_score_trend",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "score_trend",
 "numeric_columns": [
 "assessment_order",
 "class_avg_score",
 "pass_threshold",
 "performance_trend",
 "score_normalized",
 "score_scale",
 "score_vs_class_avg",
 "target_threshold",
 "week_of_class"
 ],
 "numeric_summaries": {
 "assessment_order": {
 "count": 3,
 "min": 1,
 "max": 3
 },
 "class_avg_score": {
 "count": 3,
 "min": 57,
 "max": 59.53
 },
 "pass_threshold": {
 "count": 3,
 "min": 40,
 "max": 40
 },
 "performance_trend": {
 "count": 3,
 "min": 27.5,
 "max": 27.5
 },
 "score_normalized": {
 "count": 3,
 "min": 0,
 "max": 55
 },
 "score_scale": {
 "count": 3,
 "min": 100,
 "max": 100
 },
 "score_vs_class_avg": {
 "count": 3,
 "min": -57,
 "max": -2.85
 },
 "target_threshold": {
 "count": 3,
 "min": 70,
 "max": 70
 },
 "week_of_class": {
 "count": 3,
 "min": 3,
 "max": 14
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_score_trend",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "score_trend",
 "flag_columns": [
 "pass_flag",
 "pass_threshold",
 "target_threshold",
 "below_pass_threshold",
 "below_target_threshold"
 ],
 "triggered_like_counts": {
 "pass_flag": 2,
 "pass_threshold": 0,
 "target_threshold": 0,
 "below_pass_threshold": 1,
 "below_target_threshold": 3
 }
 }
]
```
