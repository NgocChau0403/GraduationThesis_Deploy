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

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__S-T03__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "S-T03",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Peer comparison",
 "scope": "1 student",
 "actionable_question": "Where do I stand compared to my class?",
 "target_audience": "student",
 "ai_summary_type": "multi_metric_comparison",
 "ai_prompt_hint": "Show student's standing (top X%). Explain which metrics are above/below average.",
 "query_labels": [
 "peer_comparison"
 ],
 "explanation_strategy": "comparison"
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
 "avg_score [FE cross]",
 "engagement_score [FE cross]",
 "pass_rate [FE cross]",
 "performance_trend [FE cross]"
 ],
 "output_schema": {},
 "query_labels": [
 "peer_comparison"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "S-T03-CORE-01",
 "description": "Show student's standing (top X%)."
 },
 {
 "requirement_id": "S-T03-CORE-02",
 "description": "Explain which metrics are above/below average."
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
 "dataset_label": "peer_comparison",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T03.json",
 "artifact_sha256": "7d1e97dd81c83d3348bd288ec9989dde355d96c7b2271bfc1daa35b454a76fe1",
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
 "evidence_artifact_file_sha256": "7d1e97dd81c83d3348bd288ec9989dde355d96c7b2271bfc1daa35b454a76fe1",
 "evidence_rows_sha256": "d83549c8ba7dec7dcddade118ebe67097062e29bb8f2cf92fc642086de6a3831",
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
 "embedded_datasets_sha256": "d83549c8ba7dec7dcddade118ebe67097062e29bb8f2cf92fc642086de6a3831",
 "datasets": {
 "peer_comparison": [
 {
 "metric_name": "Average score",
 "comparison_group": "You",
 "metric_value": 41.25,
 "sort_order": 1
 },
 {
 "metric_name": "Average score",
 "comparison_group": "Cohort benchmark",
 "metric_value": 58.31,
 "sort_order": 1
 },
 {
 "metric_name": "Score percentile",
 "comparison_group": "You",
 "metric_value": 8.8,
 "sort_order": 2
 },
 {
 "metric_name": "Score percentile",
 "comparison_group": "Cohort benchmark",
 "metric_value": 50,
 "sort_order": 2
 },
 {
 "metric_name": "Engagement percentile",
 "comparison_group": "You",
 "metric_value": 0,
 "sort_order": 3
 },
 {
 "metric_name": "Engagement percentile",
 "comparison_group": "Cohort benchmark",
 "metric_value": 50,
 "sort_order": 3
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__S-T03__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "216984c8945a6fc3607113c3f7fc50fa20996a62f98b772279e88f0490eacb2b",
 "generator_input_sha256": "b401fd855c5da63df1a56d99ed109a02e04c2a64738ef8510630141a8ef146af",
 "generator_input_compact": {
 "task_id": "S-T03",
 "execution_id": "exec_1781847241833_47e30f50",
 "task_name": "Peer comparison",
 "analysis_type": "comparison",
 "explanation_strategy": "comparison",
 "actionable_question": "Where do I stand compared to my class?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "peer_comparison"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "peer_comparison"
 ],
 "dataset_row_counts": {
 "peer_comparison": 6
 },
 "ai_summary_config_summary": {
 "summary_type": "multi_metric_comparison",
 "metric_column": null,
 "entity_column": null,
 "group_column": "comparison_group",
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
 "raw_text": "Summary: You are currently performing below the cohort benchmark in all key metrics. Your average score, score percentile, and engagement percentile are significantly lower than those of your peers, indicating areas for improvement.\n\nInsights: Average Score Comparison: Your average score is 41.25, which is 17.06 points lower than the cohort benchmark of 58.31. This indicates that there is a substantial gap in performance that you can work on. | Score Percentile Standing: You are in the 8.8th percentile for scores, meaning you are performing better than only 8.8% of your peers. The cohort benchmark is at the 50th percentile, showing a significant opportunity for improvement. | Engagement Percentile Gap: Your engagement percentile is at 0, while the cohort benchmark is at 50. This indicates that you are not engaging with the material as much as your peers, which could be impacting your performance.\n\nEducational implications: Improving your average score and engagement can lead to better overall performance and a higher standing among your peers.\n\nRecommendations: high - Seek additional help or tutoring in subjects where you are struggling. - This can help you improve your understanding and boost your average score. | high - Increase your engagement with course materials and participate more in class. - Higher engagement can lead to better retention of information and improved performance.",
 "structured_payload": {
 "task_id": "S-T03",
 "execution_id": "exec_1781847241833_47e30f50",
 "explanation": {
 "summary": "You are currently performing below the cohort benchmark in all key metrics. Your average score, score percentile, and engagement percentile are significantly lower than those of your peers, indicating areas for improvement.",
 "insights": [
 {
 "title": "Average Score Comparison",
 "description": "Your average score is 41.25, which is 17.06 points lower than the cohort benchmark of 58.31. This indicates that there is a substantial gap in performance that you can work on.",
 "severity": "high",
 "evidence": [
 {
 "metric": "Average score",
 "value": 41.25,
 "comparison": "down_from_previous",
 "delta": -17.06,
 "context": "Cohort benchmark average score is 58.31"
 }
 ]
 },
 {
 "title": "Score Percentile Standing",
 "description": "You are in the 8.8th percentile for scores, meaning you are performing better than only 8.8% of your peers. The cohort benchmark is at the 50th percentile, showing a significant opportunity for improvement.",
 "severity": "high",
 "evidence": [
 {
 "metric": "Score percentile",
 "value": 8.8,
 "comparison": "down_from_previous",
 "delta": -41.2,
 "context": "Cohort benchmark score percentile is 50"
 }
 ]
 },
 {
 "title": "Engagement Percentile Gap",
 "description": "Your engagement percentile is at 0, while the cohort benchmark is at 50. This indicates that you are not engaging with the material as much as your peers, which could be impacting your performance.",
 "severity": "high",
 "evidence": [
 {
 "metric": "Engagement percentile",
 "value": 0,
 "comparison": "down_from_previous",
 "delta": -50,
 "context": "Cohort benchmark engagement percentile is 50"
 }
 ]
 }
 ],
 "educational_implications": [
 "Improving your average score and engagement can lead to better overall performance and a higher standing among your peers."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Seek additional help or tutoring in subjects where you are struggling.",
 "rationale": "This can help you improve your understanding and boost your average score."
 },
 {
 "priority": "high",
 "action": "Increase your engagement with course materials and participate more in class.",
 "rationale": "Higher engagement can lead to better retention of information and improved performance."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data provided is sufficient and clearly indicates the performance gaps.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "multi_metric_comparison",
 "ai_summary_method_warning": null,
 "full_result_row_count": 6,
 "included_row_count": 6,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "peer_comparison",
 "row_count": 6,
 "included_row_count": 6
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 6,
 "baseline_reference_tokens": 206,
 "task_aware_prompt_tokens": 1450,
 "token_ratio": 7.0388,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "State the exact student and cohort values for every returned metric, including score percentile and engagement percentile.",
 "Translate the returned score percentile into an explicit standing without hiding the numeric percentile."
 ],
 "must_keep_keys": [
 "comparison_matrix",
 "dataset_name",
 "entities",
 "entity_column",
 "metric_extrema",
 "metrics",
 "missing_entity_evidence",
 "missing_expected_entities",
 "missing_metric_evidence",
 "pairwise_direction_evidence",
 "pairwise_gaps",
 "row_count",
 "selected_entity_evidence",
 "standing_evidence",
 "summarization_warnings",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (7.0388 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "S-T03",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "State the exact student and cohort values for every returned metric, including score percentile and engagement percentile.",
 "Translate the returned score percentile into an explicit standing without hiding the numeric percentile."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "peer_comparison",
 "row_count": 6,
 "entities": [
 "You",
 "Cohort benchmark"
 ],
 "entity_column": "comparison_group",
 "metrics": [
 {
 "metric": "Average score",
 "unit": "score_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Score percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Engagement percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 }
 ],
 "metric_keys": [
 "Average score",
 "Score percentile",
 "Engagement percentile"
 ],
 "metric_key_column": "metric_name",
 "metric_value_column": "metric_value",
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [
 "You",
 "Cohort benchmark"
 ],
 "observed_entity_count": 2,
 "missing_expected_entities": []
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "comparison_matrix": [
 {
 "comparison_group": "You",
 "metrics": {
 "Average score": 41.25,
 "Score percentile": 8.8,
 "Engagement percentile": 0
 },
 "labels": {
 "sort_order": 3
 }
 },
 {
 "comparison_group": "Cohort benchmark",
 "metrics": {
 "Average score": 58.31,
 "Score percentile": 50,
 "Engagement percentile": 50
 },
 "labels": {
 "sort_order": 3
 }
 }
 ],
 "selected_entity_evidence": [],
 "standing_evidence": {
 "score_percentile": 8.8,
 "percent_at_or_below": 8.8,
 "percent_above": 91.2,
 "wording_guard": "Preserve the percentile and avoid reversing rank direction."
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": 17.06,
 "absolute_gap": 17.06
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": 41.2,
 "absolute_gap": 41.2
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": 50,
 "absolute_gap": 50
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "Cohort benchmark",
 "lower_entity": "You",
 "difference": 17.06,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "Cohort benchmark",
 "lower_entity": "You",
 "difference": 41.2,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "Cohort benchmark",
 "lower_entity": "You",
 "difference": 50,
 "direction_note": "right_entity is higher"
 }
 ],
 "metric_extrema": {
 "Average score": {
 "min": {
 "comparison_group": "You",
 "value": 41.25
 },
 "max": {
 "comparison_group": "Cohort benchmark",
 "value": 58.31
 }
 },
 "Score percentile": {
 "min": {
 "comparison_group": "You",
 "value": 8.8
 },
 "max": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 }
 },
 "Engagement percentile": {
 "min": {
 "comparison_group": "You",
 "value": 0
 },
 "max": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_metric_evidence": [],
 "missing_entity_evidence": [],
 "missing_expected_entities": [],
 "validation_metadata": {
 "status": "passed",
 "required": {
 "metric_units": true,
 "metric_directions": true,
 "metric_thresholds": false,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "Average score": "score_0_100",
 "Score percentile": "percent_0_100",
 "Engagement percentile": "percent_0_100"
 },
 "metric_directions": {
 "Average score": "higher_is_better",
 "Score percentile": "higher_is_better",
 "Engagement percentile": "higher_is_better"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "multi_metric_comparison",
 "dataset_name": "peer_comparison",
 "row_count": 6,
 "entity_column": "comparison_group",
 "metric_key_column": "metric_name",
 "metric_value_column": "metric_value",
 "entities": [
 "You",
 "Cohort benchmark"
 ],
 "metrics": [
 {
 "metric": "Average score",
 "unit": "score_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Score percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Engagement percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 }
 ],
 "metric_keys": [
 "Average score",
 "Score percentile",
 "Engagement percentile"
 ],
 "comparison_matrix": [
 {
 "comparison_group": "You",
 "metrics": {
 "Average score": 41.25,
 "Score percentile": 8.8,
 "Engagement percentile": 0
 },
 "labels": {
 "sort_order": 3
 }
 },
 {
 "comparison_group": "Cohort benchmark",
 "metrics": {
 "Average score": 58.31,
 "Score percentile": 50,
 "Engagement percentile": 50
 },
 "labels": {
 "sort_order": 3
 }
 }
 ],
 "metric_extrema": {
 "Average score": {
 "min": {
 "comparison_group": "You",
 "value": 41.25
 },
 "max": {
 "comparison_group": "Cohort benchmark",
 "value": 58.31
 }
 },
 "Score percentile": {
 "min": {
 "comparison_group": "You",
 "value": 8.8
 },
 "max": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 }
 },
 "Engagement percentile": {
 "min": {
 "comparison_group": "You",
 "value": 0
 },
 "max": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": 17.06,
 "absolute_gap": 17.06
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": 41.2,
 "absolute_gap": 41.2
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": 50,
 "absolute_gap": 50
 }
 ],
 "missing_metric_evidence": [],
 "missing_entity_evidence": [],
 "missing_expected_entities": [],
 "selected_entity_evidence": [],
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [
 "You",
 "Cohort benchmark"
 ],
 "observed_entity_count": 2,
 "missing_expected_entities": []
 },
 "validation_metadata": {
 "status": "passed",
 "required": {
 "metric_units": true,
 "metric_directions": true,
 "metric_thresholds": false,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "Average score": "score_0_100",
 "Score percentile": "percent_0_100",
 "Engagement percentile": "percent_0_100"
 },
 "metric_directions": {
 "Average score": "higher_is_better",
 "Score percentile": "higher_is_better",
 "Engagement percentile": "higher_is_better"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [],
 "pairwise_direction_evidence": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "Cohort benchmark",
 "lower_entity": "You",
 "difference": 17.06,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "Cohort benchmark",
 "lower_entity": "You",
 "difference": 41.2,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "Cohort benchmark",
 "lower_entity": "You",
 "difference": 50,
 "direction_note": "right_entity is higher"
 }
 ],
 "standing_evidence": {
 "score_percentile": 8.8,
 "percent_at_or_below": 8.8,
 "percent_above": 91.2,
 "wording_guard": "Preserve the percentile and avoid reversing rank direction."
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 6461,
 "token_usage": {
 "prompt_tokens": 1868,
 "completion_tokens": 624,
 "total_tokens": 2492
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000655
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__S-T03__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "216984c8945a6fc3607113c3f7fc50fa20996a62f98b772279e88f0490eacb2b",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1868,
 "completion_tokens": 624,
 "total_tokens": 2492
 },
 "latency_ms": 6680,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-T03",
 "execution_id": "exec_1781847241833_47e30f50",
 "explanation": {
 "summary": "You are currently performing below the cohort benchmark in all key metrics. Your average score, score percentile, and engagement percentile are significantly lower than those of your peers, indicating areas for improvement.",
 "insights": [
 {
 "title": "Average Score Comparison",
 "description": "Your average score is 41.25, which is 17.06 points lower than the cohort benchmark of 58.31. This indicates that there is a substantial gap in performance that you can work on.",
 "severity": "high",
 "evidence": [
 {
 "metric": "Average score",
 "value": 41.25,
 "comparison": "down_from_previous",
 "delta": -17.06,
 "context": "Cohort benchmark average score is 58.31"
 }
 ]
 },
 {
 "title": "Score Percentile Standing",
 "description": "You are in the 8.8th percentile for scores, meaning you are performing better than only 8.8% of your peers. The cohort benchmark is at the 50th percentile, showing a significant opportunity for improvement.",
 "severity": "high",
 "evidence": [
 {
 "metric": "Score percentile",
 "value": 8.8,
 "comparison": "down_from_previous",
 "delta": -41.2,
 "context": "Cohort benchmark score percentile is 50"
 }
 ]
 },
 {
 "title": "Engagement Percentile Gap",
 "description": "Your engagement percentile is at 0, while the cohort benchmark is at 50. This indicates that you are not engaging with the material as much as your peers, which could be impacting your performance.",
 "severity": "high",
 "evidence": [
 {
 "metric": "Engagement percentile",
 "value": 0,
 "comparison": "down_from_previous",
 "delta": -50,
 "context": "Cohort benchmark engagement percentile is 50"
 }
 ]
 }
 ],
 "educational_implications": [
 "Improving your average score and engagement can lead to better overall performance and a higher standing among your peers."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Seek additional help or tutoring in subjects where you are struggling.",
 "rationale": "This can help you improve your understanding and boost your average score."
 },
 {
 "priority": "high",
 "action": "Increase your engagement with course materials and participate more in class.",
 "rationale": "Higher engagement can lead to better retention of information and improved performance."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data provided is sufficient and clearly indicates the performance gaps.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "multi_metric_comparison",
 "ai_summary_method_warning": null,
 "full_result_row_count": 6,
 "included_row_count": 6,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "peer_comparison",
 "row_count": 6,
 "included_row_count": 6
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 6,
 "baseline_reference_tokens": 206,
 "task_aware_prompt_tokens": 1450,
 "token_ratio": 7.0388,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "State the exact student and cohort values for every returned metric, including score percentile and engagement percentile.",
 "Translate the returned score percentile into an explicit standing without hiding the numeric percentile."
 ],
 "must_keep_keys": [
 "comparison_matrix",
 "dataset_name",
 "entities",
 "entity_column",
 "metric_extrema",
 "metrics",
 "missing_entity_evidence",
 "missing_expected_entities",
 "missing_metric_evidence",
 "pairwise_direction_evidence",
 "pairwise_gaps",
 "row_count",
 "selected_entity_evidence",
 "standing_evidence",
 "summarization_warnings",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (7.0388 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "S-T03",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "State the exact student and cohort values for every returned metric, including score percentile and engagement percentile.",
 "Translate the returned score percentile into an explicit standing without hiding the numeric percentile."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "peer_comparison",
 "row_count": 6,
 "entities": [
 "You",
 "Cohort benchmark"
 ],
 "entity_column": "comparison_group",
 "metrics": [
 {
 "metric": "Average score",
 "unit": "score_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Score percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Engagement percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 }
 ],
 "metric_keys": [
 "Average score",
 "Score percentile",
 "Engagement percentile"
 ],
 "metric_key_column": "metric_name",
 "metric_value_column": "metric_value",
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [
 "You",
 "Cohort benchmark"
 ],
 "observed_entity_count": 2,
 "missing_expected_entities": []
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "comparison_matrix": [
 {
 "comparison_group": "You",
 "metrics": {
 "Average score": 41.25,
 "Score percentile": 8.8,
 "Engagement percentile": 0
 },
 "labels": {
 "sort_order": 3
 }
 },
 {
 "comparison_group": "Cohort benchmark",
 "metrics": {
 "Average score": 58.31,
 "Score percentile": 50,
 "Engagement percentile": 50
 },
 "labels": {
 "sort_order": 3
 }
 }
 ],
 "selected_entity_evidence": [],
 "standing_evidence": {
 "score_percentile": 8.8,
 "percent_at_or_below": 8.8,
 "percent_above": 91.2,
 "wording_guard": "Preserve the percentile and avoid reversing rank direction."
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": 17.06,
 "absolute_gap": 17.06
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": 41.2,
 "absolute_gap": 41.2
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": 50,
 "absolute_gap": 50
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "Cohort benchmark",
 "lower_entity": "You",
 "difference": 17.06,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "Cohort benchmark",
 "lower_entity": "You",
 "difference": 41.2,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "Cohort benchmark",
 "lower_entity": "You",
 "difference": 50,
 "direction_note": "right_entity is higher"
 }
 ],
 "metric_extrema": {
 "Average score": {
 "min": {
 "comparison_group": "You",
 "value": 41.25
 },
 "max": {
 "comparison_group": "Cohort benchmark",
 "value": 58.31
 }
 },
 "Score percentile": {
 "min": {
 "comparison_group": "You",
 "value": 8.8
 },
 "max": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 }
 },
 "Engagement percentile": {
 "min": {
 "comparison_group": "You",
 "value": 0
 },
 "max": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_metric_evidence": [],
 "missing_entity_evidence": [],
 "missing_expected_entities": [],
 "validation_metadata": {
 "status": "passed",
 "required": {
 "metric_units": true,
 "metric_directions": true,
 "metric_thresholds": false,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "Average score": "score_0_100",
 "Score percentile": "percent_0_100",
 "Engagement percentile": "percent_0_100"
 },
 "metric_directions": {
 "Average score": "higher_is_better",
 "Score percentile": "higher_is_better",
 "Engagement percentile": "higher_is_better"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "multi_metric_comparison",
 "dataset_name": "peer_comparison",
 "row_count": 6,
 "entity_column": "comparison_group",
 "metric_key_column": "metric_name",
 "metric_value_column": "metric_value",
 "entities": [
 "You",
 "Cohort benchmark"
 ],
 "metrics": [
 {
 "metric": "Average score",
 "unit": "score_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Score percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Engagement percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 }
 ],
 "metric_keys": [
 "Average score",
 "Score percentile",
 "Engagement percentile"
 ],
 "comparison_matrix": [
 {
 "comparison_group": "You",
 "metrics": {
 "Average score": 41.25,
 "Score percentile": 8.8,
 "Engagement percentile": 0
 },
 "labels": {
 "sort_order": 3
 }
 },
 {
 "comparison_group": "Cohort benchmark",
 "metrics": {
 "Average score": 58.31,
 "Score percentile": 50,
 "Engagement percentile": 50
 },
 "labels": {
 "sort_order": 3
 }
 }
 ],
 "metric_extrema": {
 "Average score": {
 "min": {
 "comparison_group": "You",
 "value": 41.25
 },
 "max": {
 "comparison_group": "Cohort benchmark",
 "value": 58.31
 }
 },
 "Score percentile": {
 "min": {
 "comparison_group": "You",
 "value": 8.8
 },
 "max": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 }
 },
 "Engagement percentile": {
 "min": {
 "comparison_group": "You",
 "value": 0
 },
 "max": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": 17.06,
 "absolute_gap": 17.06
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": 41.2,
 "absolute_gap": 41.2
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": 50,
 "absolute_gap": 50
 }
 ],
 "missing_metric_evidence": [],
 "missing_entity_evidence": [],
 "missing_expected_entities": [],
 "selected_entity_evidence": [],
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [
 "You",
 "Cohort benchmark"
 ],
 "observed_entity_count": 2,
 "missing_expected_entities": []
 },
 "validation_metadata": {
 "status": "passed",
 "required": {
 "metric_units": true,
 "metric_directions": true,
 "metric_thresholds": false,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "Average score": "score_0_100",
 "Score percentile": "percent_0_100",
 "Engagement percentile": "percent_0_100"
 },
 "metric_directions": {
 "Average score": "higher_is_better",
 "Score percentile": "higher_is_better",
 "Engagement percentile": "higher_is_better"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [],
 "pairwise_direction_evidence": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "Cohort benchmark",
 "lower_entity": "You",
 "difference": 17.06,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "Cohort benchmark",
 "lower_entity": "You",
 "difference": 41.2,
 "direction_note": "right_entity is higher"
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "Cohort benchmark",
 "lower_entity": "You",
 "difference": 50,
 "direction_note": "right_entity is higher"
 }
 ],
 "standing_evidence": {
 "score_percentile": 8.8,
 "percent_at_or_below": 8.8,
 "percent_above": 91.2,
 "wording_guard": "Preserve the percentile and avoid reversing rank direction."
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 6461,
 "token_usage": {
 "prompt_tokens": 1868,
 "completion_tokens": 624,
 "total_tokens": 2492
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000655
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
 "observed": "7d1e97dd81c83d3348bd288ec9989dde355d96c7b2271bfc1daa35b454a76fe1",
 "expected_values": [
 "7d1e97dd81c83d3348bd288ec9989dde355d96c7b2271bfc1daa35b454a76fe1"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "d83549c8ba7dec7dcddade118ebe67097062e29bb8f2cf92fc642086de6a3831",
 "expected": "d83549c8ba7dec7dcddade118ebe67097062e29bb8f2cf92fc642086de6a3831"
 },
 {
 "check_id": "numeric_fields_peer_comparison",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "peer_comparison",
 "numeric_columns": [
 "metric_value",
 "sort_order"
 ],
 "numeric_summaries": {
 "metric_value": {
 "count": 6,
 "min": 0,
 "max": 58.31
 },
 "sort_order": {
 "count": 6,
 "min": 1,
 "max": 3
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_peer_comparison",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "peer_comparison",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```

