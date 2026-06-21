# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__S-T01__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "S-T01",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Score trend analysis",
 "scope": "1 student",
 "actionable_question": "Am I getting better or worse over time?",
 "target_audience": "student",
 "ai_summary_type": "trend_series",
 "ai_prompt_hint": "Identify trend direction, assessments below pass/target thresholds, and the concrete recommended_action for the weakest recent assessment.",
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
 "output_schema": {
 "required_columns": [
 "assessment_order",
 "score_normalized",
 "pass_flag"
 ],
 "optional_columns": [
 "week_of_class",
 "assessment_type",
 "assessment_name",
 "class_avg_score",
 "score_vs_class_avg",
 "score_scale",
 "pass_threshold",
 "target_threshold",
 "below_pass_threshold",
 "below_target_threshold",
 "performance_trend",
 "support_level",
 "recommended_action"
 ]
 },
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
 "requirement_id": "S-T01-CORE-01",
 "description": "Identify the observed score trend direction."
 },
 {
 "requirement_id": "S-T01-CORE-02",
 "description": "Identify assessments below returned pass or target thresholds."
 }
 ],
 "required_supporting_outputs": [
 {
 "requirement_id": "S-T01-SUPPORT-01",
 "description": "Provide recommended_action for the weakest recent assessment only when that field is present."
 }
 ],
 "evaluation_constraints": [
 {
 "constraint_id": "S-T01-CONSTRAINT-01",
 "description": "If fewer than 3 assessment data points are available, state that evidence is insufficient for a reliable trend rather than asserting a stable direction."
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
 "dataset_label": "score_trend",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T01.json",
 "artifact_sha256": "2b9890971f14879405dd2a9f346df29e6bca6e4545211d9344f756fd2d4450cc",
 "row_count": 5,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 5,
 "prompt_embedded_row_count": 5,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "2b9890971f14879405dd2a9f346df29e6bca6e4545211d9344f756fd2d4450cc",
 "evidence_rows_sha256": "d6f9c06ecea6f9dd21f6455dbb809b647dbebe91fb05405f9684ab0eb66c7420",
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
 "full_result_row_count": 5,
 "embedded_datasets_sha256": "d6f9c06ecea6f9dd21f6455dbb809b647dbebe91fb05405f9684ab0eb66c7420",
 "datasets": {
 "score_trend": [
 {
 "assessment_order": 1,
 "week_of_class": 3,
 "assessment_type": "CMA",
 "assessment_name": "24295",
 "score_normalized": 100,
 "pass_flag": true,
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "below_pass_threshold": false,
 "below_target_threshold": false,
 "performance_trend": -0.7187500000000001,
 "support_level": "maintain",
 "recommended_action": "Keep the current preparation pattern and use feedback to protect this level."
 },
 {
 "assessment_order": 3,
 "week_of_class": 10,
 "assessment_type": "CMA",
 "assessment_name": "24296",
 "score_normalized": 87,
 "pass_flag": true,
 "class_avg_score": 78.94,
 "score_vs_class_avg": 8.06,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "below_pass_threshold": false,
 "below_target_threshold": false,
 "performance_trend": -0.7187500000000001,
 "support_level": "maintain",
 "recommended_action": "Keep the current preparation pattern and use feedback to protect this level."
 },
 {
 "assessment_order": 5,
 "week_of_class": 21,
 "assessment_type": "CMA",
 "assessment_name": "24297",
 "score_normalized": 90,
 "pass_flag": true,
 "class_avg_score": 75.15,
 "score_vs_class_avg": 14.85,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "below_pass_threshold": false,
 "below_target_threshold": false,
 "performance_trend": -0.7187500000000001,
 "support_level": "maintain",
 "recommended_action": "Keep the current preparation pattern and use feedback to protect this level."
 },
 {
 "assessment_order": 8,
 "week_of_class": 31,
 "assessment_type": "CMA",
 "assessment_name": "24298",
 "score_normalized": 83,
 "pass_flag": true,
 "class_avg_score": 73.09,
 "score_vs_class_avg": 9.91,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "below_pass_threshold": false,
 "below_target_threshold": false,
 "performance_trend": -0.7187500000000001,
 "support_level": "maintain",
 "recommended_action": "Keep the current preparation pattern and use feedback to protect this level."
 },
 {
 "assessment_order": 9,
 "week_of_class": null,
 "assessment_type": "Exam",
 "assessment_name": "24299",
 "score_normalized": 96,
 "pass_flag": true,
 "class_avg_score": 68.23,
 "score_vs_class_avg": 27.77,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "below_pass_threshold": false,
 "below_target_threshold": false,
 "performance_trend": -0.7187500000000001,
 "support_level": "maintain",
 "recommended_action": "Keep the current preparation pattern and use feedback to protect this level."
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T01__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "84f1d70af5ef37499f4921a56fce9e9c6424cb3378e7baa25c2dd383c83caf5e",
 "generator_input_sha256": "adfc68b3543fa71f27aaa94eb1d23dd105176683735855a308fe9d1aa6a2dde9",
 "generator_input_compact": {
 "task_id": "S-T01",
 "execution_id": "exec_1781847881037_601caebc",
 "task_name": "Score trend analysis",
 "analysis_type": "trend",
 "explanation_strategy": "trend",
 "actionable_question": "Am I getting better or worse over time?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "score_trend"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "score_trend"
 ],
 "dataset_row_counts": {
 "score_trend": 5
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
 "raw_text": "Summary: Your performance has shown a slight decline over time, with your normalized score decreasing from 100 in Assessment 1 to 96 in Assessment 9. While you are still performing well above the passing threshold, it's important to maintain your preparation strategies to protect your current level.\n\nInsights: Overall Performance Decline: Your normalized score decreased from 100 in Assessment 1 to 96 in Assessment 9, indicating a decline of 4 points. | Significant Drop in Assessment 3: There was a notable drop of 13 points from Assessment 1 (100) to Assessment 3 (87), which may indicate a need for adjustment in your study approach. | Consistent Above-Passing Performance: Despite the decline, all your scores remain well above the passing threshold of 40, showing that you are consistently performing well.\n\nEducational implications: The decline in scores suggests that while you are performing well, there may be areas where you can improve your study habits or understanding of the material.\n\nRecommendations: high - Review feedback from previous assessments and adjust your study strategies accordingly. - This will help you address any weaknesses and maintain your performance level.",
 "structured_payload": {
 "task_id": "S-T01",
 "execution_id": "exec_1781847881037_601caebc",
 "explanation": {
 "summary": "Your performance has shown a slight decline over time, with your normalized score decreasing from 100 in Assessment 1 to 96 in Assessment 9. While you are still performing well above the passing threshold, it's important to maintain your preparation strategies to protect your current level.",
 "insights": [
 {
 "title": "Overall Performance Decline",
 "description": "Your normalized score decreased from 100 in Assessment 1 to 96 in Assessment 9, indicating a decline of 4 points.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 96,
 "comparison": "down_from_previous",
 "delta": -4,
 "context": "from Assessment 1 to Assessment 9"
 }
 ]
 },
 {
 "title": "Significant Drop in Assessment 3",
 "description": "There was a notable drop of 13 points from Assessment 1 (100) to Assessment 3 (87), which may indicate a need for adjustment in your study approach.",
 "severity": "high",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 87,
 "comparison": "down_from_previous",
 "delta": -13,
 "context": "from Assessment 1 to Assessment 3"
 }
 ]
 },
 {
 "title": "Consistent Above-Passing Performance",
 "description": "Despite the decline, all your scores remain well above the passing threshold of 40, showing that you are consistently performing well.",
 "severity": "low",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 96,
 "comparison": "baseline",
 "delta": null,
 "context": "Assessment 9 score"
 }
 ]
 }
 ],
 "educational_implications": [
 "The decline in scores suggests that while you are performing well, there may be areas where you can improve your study habits or understanding of the material."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Review feedback from previous assessments and adjust your study strategies accordingly.",
 "rationale": "This will help you address any weaknesses and maintain your performance level."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is strong with a large sample size and consistent assessment metrics.",
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
 "full_result_row_count": 5,
 "included_row_count": 5,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "score_trend",
 "row_count": 5,
 "included_row_count": 5
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 5,
 "baseline_reference_tokens": 722,
 "task_aware_prompt_tokens": 1560,
 "token_ratio": 2.1607,
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (2.1607 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "S-T01",
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
 "row_count": 5,
 "point_count": 5,
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
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "last_point": {
 "assessment_order": 9,
 "score_normalized": 96,
 "labels": {
 "assessment_name": "24299",
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "class_avg_score": 68.23,
 "score_vs_class_avg": 27.77,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "to": {
 "assessment_order": 9,
 "score_normalized": 96,
 "labels": {
 "assessment_name": "24299",
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "class_avg_score": 68.23,
 "score_vs_class_avg": 27.77,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "delta": -4,
 "percent_change": -4
 }
 }
 },
 {
 "name": "trend_relationship",
 "facts": {
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "to": {
 "assessment_order": 3,
 "score_normalized": 87,
 "labels": {
 "assessment_name": "24296",
 "assessment_type": "CMA",
 "week_of_class": 10
 },
 "secondary_metrics": {
 "class_avg_score": 78.94,
 "score_vs_class_avg": 8.06,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "delta": -13
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flagged_points": []
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "action_evidence": [
 {
 "assessment_order": 9,
 "action_column": "support_level",
 "action": "maintain"
 },
 {
 "assessment_order": 9,
 "action_column": "recommended_action",
 "action": "Keep the current preparation pattern and use feedback to protect this level."
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
 "row_count": 5,
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "metric_units": {},
 "metric_directions": {},
 "dataset_roles": {},
 "point_count": 5,
 "first_point": {
 "assessment_order": 1,
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "last_point": {
 "assessment_order": 9,
 "score_normalized": 96,
 "labels": {
 "assessment_name": "24299",
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "class_avg_score": 68.23,
 "score_vs_class_avg": 27.77,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "peak": {
 "assessment_order": 1,
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "trough": {
 "assessment_order": 8,
 "score_normalized": 83,
 "labels": {
 "assessment_name": "24298",
 "assessment_type": "CMA",
 "week_of_class": 31
 },
 "secondary_metrics": {
 "class_avg_score": 73.09,
 "score_vs_class_avg": 9.91,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "to": {
 "assessment_order": 9,
 "score_normalized": 96,
 "labels": {
 "assessment_name": "24299",
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "class_avg_score": 68.23,
 "score_vs_class_avg": 27.77,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "delta": -4,
 "percent_change": -4
 },
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "to": {
 "assessment_order": 3,
 "score_normalized": 87,
 "labels": {
 "assessment_name": "24296",
 "assessment_type": "CMA",
 "week_of_class": 10
 },
 "secondary_metrics": {
 "class_avg_score": 78.94,
 "score_vs_class_avg": 8.06,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "delta": -13
 },
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 8,
 "score_normalized": 83,
 "labels": {
 "assessment_name": "24298",
 "assessment_type": "CMA",
 "week_of_class": 31
 },
 "secondary_metrics": {
 "class_avg_score": 73.09,
 "score_vs_class_avg": 9.91,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "to": {
 "assessment_order": 9,
 "score_normalized": 96,
 "labels": {
 "assessment_name": "24299",
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "class_avg_score": 68.23,
 "score_vs_class_avg": 27.77,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "delta": 13
 },
 "flagged_points": [],
 "secondary_metric_evidence": {
 "class_avg_score": {
 "count": 5,
 "min": 68.23,
 "max": 78.94,
 "first": 74.75,
 "last": 68.23
 },
 "score_vs_class_avg": {
 "count": 5,
 "min": 8.06,
 "max": 27.77,
 "first": 25.25,
 "last": 27.77
 },
 "performance_trend": {
 "count": 5,
 "min": -0.7188,
 "max": -0.7188,
 "first": -0.7188,
 "last": -0.7188
 },
 "pass_flag": {
 "first": true,
 "last": true,
 "distinct_values": [
 "True"
 ]
 }
 },
 "secondary_metric_associations": {
 "class_avg_score": {
 "paired_point_count": 5,
 "method": "pearson_on_aligned_points",
 "correlation": -0.3367,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "score_vs_class_avg": {
 "paired_point_count": 5,
 "method": "pearson_on_aligned_points",
 "correlation": 0.9121,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "performance_trend": {
 "paired_point_count": 5,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "pass_flag": {
 "paired_point_count": 5,
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
 "assessment_order": 9,
 "action_column": "support_level",
 "action": "maintain"
 },
 {
 "assessment_order": 9,
 "action_column": "recommended_action",
 "action": "Keep the current preparation pattern and use feedback to protect this level."
 }
 ],
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5804,
 "token_usage": {
 "prompt_tokens": 2489,
 "completion_tokens": 549,
 "total_tokens": 3038
 },
 "strategy": "trend",
 "granularity": "per_assessment",
 "cost_usd": 0.000703
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T01__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "84f1d70af5ef37499f4921a56fce9e9c6424cb3378e7baa25c2dd383c83caf5e",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2489,
 "completion_tokens": 549,
 "total_tokens": 3038
 },
 "latency_ms": 5813,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-T01",
 "execution_id": "exec_1781847881037_601caebc",
 "explanation": {
 "summary": "Your performance has shown a slight decline over time, with your normalized score decreasing from 100 in Assessment 1 to 96 in Assessment 9. While you are still performing well above the passing threshold, it's important to maintain your preparation strategies to protect your current level.",
 "insights": [
 {
 "title": "Overall Performance Decline",
 "description": "Your normalized score decreased from 100 in Assessment 1 to 96 in Assessment 9, indicating a decline of 4 points.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 96,
 "comparison": "down_from_previous",
 "delta": -4,
 "context": "from Assessment 1 to Assessment 9"
 }
 ]
 },
 {
 "title": "Significant Drop in Assessment 3",
 "description": "There was a notable drop of 13 points from Assessment 1 (100) to Assessment 3 (87), which may indicate a need for adjustment in your study approach.",
 "severity": "high",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 87,
 "comparison": "down_from_previous",
 "delta": -13,
 "context": "from Assessment 1 to Assessment 3"
 }
 ]
 },
 {
 "title": "Consistent Above-Passing Performance",
 "description": "Despite the decline, all your scores remain well above the passing threshold of 40, showing that you are consistently performing well.",
 "severity": "low",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 96,
 "comparison": "baseline",
 "delta": null,
 "context": "Assessment 9 score"
 }
 ]
 }
 ],
 "educational_implications": [
 "The decline in scores suggests that while you are performing well, there may be areas where you can improve your study habits or understanding of the material."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Review feedback from previous assessments and adjust your study strategies accordingly.",
 "rationale": "This will help you address any weaknesses and maintain your performance level."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is strong with a large sample size and consistent assessment metrics.",
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
 "full_result_row_count": 5,
 "included_row_count": 5,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "score_trend",
 "row_count": 5,
 "included_row_count": 5
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 5,
 "baseline_reference_tokens": 722,
 "task_aware_prompt_tokens": 1560,
 "token_ratio": 2.1607,
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (2.1607 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "S-T01",
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
 "row_count": 5,
 "point_count": 5,
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
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "last_point": {
 "assessment_order": 9,
 "score_normalized": 96,
 "labels": {
 "assessment_name": "24299",
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "class_avg_score": 68.23,
 "score_vs_class_avg": 27.77,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "to": {
 "assessment_order": 9,
 "score_normalized": 96,
 "labels": {
 "assessment_name": "24299",
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "class_avg_score": 68.23,
 "score_vs_class_avg": 27.77,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "delta": -4,
 "percent_change": -4
 }
 }
 },
 {
 "name": "trend_relationship",
 "facts": {
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "to": {
 "assessment_order": 3,
 "score_normalized": 87,
 "labels": {
 "assessment_name": "24296",
 "assessment_type": "CMA",
 "week_of_class": 10
 },
 "secondary_metrics": {
 "class_avg_score": 78.94,
 "score_vs_class_avg": 8.06,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "delta": -13
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flagged_points": []
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "action_evidence": [
 {
 "assessment_order": 9,
 "action_column": "support_level",
 "action": "maintain"
 },
 {
 "assessment_order": 9,
 "action_column": "recommended_action",
 "action": "Keep the current preparation pattern and use feedback to protect this level."
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
 "row_count": 5,
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "metric_units": {},
 "metric_directions": {},
 "dataset_roles": {},
 "point_count": 5,
 "first_point": {
 "assessment_order": 1,
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "last_point": {
 "assessment_order": 9,
 "score_normalized": 96,
 "labels": {
 "assessment_name": "24299",
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "class_avg_score": 68.23,
 "score_vs_class_avg": 27.77,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "peak": {
 "assessment_order": 1,
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "trough": {
 "assessment_order": 8,
 "score_normalized": 83,
 "labels": {
 "assessment_name": "24298",
 "assessment_type": "CMA",
 "week_of_class": 31
 },
 "secondary_metrics": {
 "class_avg_score": 73.09,
 "score_vs_class_avg": 9.91,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "to": {
 "assessment_order": 9,
 "score_normalized": 96,
 "labels": {
 "assessment_name": "24299",
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "class_avg_score": 68.23,
 "score_vs_class_avg": 27.77,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "delta": -4,
 "percent_change": -4
 },
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 100,
 "labels": {
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "week_of_class": 3
 },
 "secondary_metrics": {
 "class_avg_score": 74.75,
 "score_vs_class_avg": 25.25,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "to": {
 "assessment_order": 3,
 "score_normalized": 87,
 "labels": {
 "assessment_name": "24296",
 "assessment_type": "CMA",
 "week_of_class": 10
 },
 "secondary_metrics": {
 "class_avg_score": 78.94,
 "score_vs_class_avg": 8.06,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "delta": -13
 },
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 8,
 "score_normalized": 83,
 "labels": {
 "assessment_name": "24298",
 "assessment_type": "CMA",
 "week_of_class": 31
 },
 "secondary_metrics": {
 "class_avg_score": 73.09,
 "score_vs_class_avg": 9.91,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "to": {
 "assessment_order": 9,
 "score_normalized": 96,
 "labels": {
 "assessment_name": "24299",
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "class_avg_score": 68.23,
 "score_vs_class_avg": 27.77,
 "performance_trend": -0.7188,
 "pass_flag": true
 }
 },
 "delta": 13
 },
 "flagged_points": [],
 "secondary_metric_evidence": {
 "class_avg_score": {
 "count": 5,
 "min": 68.23,
 "max": 78.94,
 "first": 74.75,
 "last": 68.23
 },
 "score_vs_class_avg": {
 "count": 5,
 "min": 8.06,
 "max": 27.77,
 "first": 25.25,
 "last": 27.77
 },
 "performance_trend": {
 "count": 5,
 "min": -0.7188,
 "max": -0.7188,
 "first": -0.7188,
 "last": -0.7188
 },
 "pass_flag": {
 "first": true,
 "last": true,
 "distinct_values": [
 "True"
 ]
 }
 },
 "secondary_metric_associations": {
 "class_avg_score": {
 "paired_point_count": 5,
 "method": "pearson_on_aligned_points",
 "correlation": -0.3367,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "score_vs_class_avg": {
 "paired_point_count": 5,
 "method": "pearson_on_aligned_points",
 "correlation": 0.9121,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "performance_trend": {
 "paired_point_count": 5,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "pass_flag": {
 "paired_point_count": 5,
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
 "assessment_order": 9,
 "action_column": "support_level",
 "action": "maintain"
 },
 {
 "assessment_order": 9,
 "action_column": "recommended_action",
 "action": "Keep the current preparation pattern and use feedback to protect this level."
 }
 ],
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5804,
 "token_usage": {
 "prompt_tokens": 2489,
 "completion_tokens": 549,
 "total_tokens": 3038
 },
 "strategy": "trend",
 "granularity": "per_assessment",
 "cost_usd": 0.000703
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
 "expected": 5,
 "observed": 5
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "2b9890971f14879405dd2a9f346df29e6bca6e4545211d9344f756fd2d4450cc",
 "expected_values": [
 "2b9890971f14879405dd2a9f346df29e6bca6e4545211d9344f756fd2d4450cc"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "d6f9c06ecea6f9dd21f6455dbb809b647dbebe91fb05405f9684ab0eb66c7420",
 "expected": "d6f9c06ecea6f9dd21f6455dbb809b647dbebe91fb05405f9684ab0eb66c7420"
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
 "count": 5,
 "min": 1,
 "max": 9
 },
 "class_avg_score": {
 "count": 5,
 "min": 68.23,
 "max": 78.94
 },
 "pass_threshold": {
 "count": 5,
 "min": 40,
 "max": 40
 },
 "performance_trend": {
 "count": 5,
 "min": -0.7187500000000001,
 "max": -0.7187500000000001
 },
 "score_normalized": {
 "count": 5,
 "min": 83,
 "max": 100
 },
 "score_scale": {
 "count": 5,
 "min": 100,
 "max": 100
 },
 "score_vs_class_avg": {
 "count": 5,
 "min": 8.06,
 "max": 27.77
 },
 "target_threshold": {
 "count": 5,
 "min": 70,
 "max": 70
 },
 "week_of_class": {
 "count": 4,
 "min": 3,
 "max": 31
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
 "pass_flag": 5,
 "pass_threshold": 0,
 "target_threshold": 0,
 "below_pass_threshold": 0,
 "below_target_threshold": 0
 }
 }
]
```
