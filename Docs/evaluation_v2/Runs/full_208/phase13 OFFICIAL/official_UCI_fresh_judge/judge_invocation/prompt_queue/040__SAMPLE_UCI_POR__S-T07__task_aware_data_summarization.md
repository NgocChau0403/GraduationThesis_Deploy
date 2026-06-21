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

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T07__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__S-T07__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "S-T07",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Absence / inactivity impact",
 "scope": "1 student",
 "actionable_question": "How much are my absences hurting my grades?",
 "target_audience": "student",
 "ai_summary_type": "trend_series",
 "ai_prompt_hint": "Use absence_rate [FE] to show proportion of missed sessions. Correlate with avg_score [FE].",
 "query_labels": [
 "absence_data",
 "score_series"
 ],
 "explanation_strategy": "correlation"
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
 "absences [enrollment",
 "UCI only]; score_normalized",
 "pass_flag [assessment_result]"
 ],
 "output_schema": {
 "required_columns": [
 "assessment_order",
 "score_normalized"
 ],
 "optional_columns": [
 "week_of_class",
 "pass_flag",
 "absences",
 "absence_rate"
 ]
 },
 "query_labels": [
 "absence_data",
 "score_series"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "S-T07-CORE-01",
 "description": "State the proportion of missed sessions."
 },
 {
 "requirement_id": "S-T07-CORE-02",
 "description": "Describe the observed association between absence rate and average score."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "S-T07-CONSTRAINT-01",
 "description": "Use absence_rate as the primary absence metric."
 },
 {
 "constraint_id": "S-T07-CONSTRAINT-02",
 "description": "Frame the absence-score relationship as correlational, not causal."
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
 "dataset_label": "absence_data",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T07.json",
 "artifact_sha256": "b65c8e0cc5e17ffc245ee241aadadd191d62ce0e4088f4a501856b9f527298ac",
 "row_count": 1,
 "readable": true
 },
 {
 "dataset_label": "score_series",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T07.json",
 "artifact_sha256": "b65c8e0cc5e17ffc245ee241aadadd191d62ce0e4088f4a501856b9f527298ac",
 "row_count": 3,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 4,
 "prompt_embedded_row_count": 4,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "b65c8e0cc5e17ffc245ee241aadadd191d62ce0e4088f4a501856b9f527298ac",
 "evidence_rows_sha256": "8c019c1f11810141fa63188bbe86b1eb24ba42b4e0e8d64b7abcede3fd38ce55",
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
 "full_result_row_count": 4,
 "embedded_datasets_sha256": "8c019c1f11810141fa63188bbe86b1eb24ba42b4e0e8d64b7abcede3fd38ce55",
 "datasets": {
 "absence_data": [
 {
 "absences": 4,
 "absence_rate": "0.125"
 }
 ],
 "score_series": [
 {
 "assessment_order": 1,
 "week_of_class": 3,
 "score_normalized": 0,
 "pass_flag": false
 },
 {
 "assessment_order": 2,
 "week_of_class": 8,
 "score_normalized": 55,
 "pass_flag": true
 },
 {
 "assessment_order": 3,
 "week_of_class": 14,
 "score_normalized": 55,
 "pass_flag": true
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__S-T07__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "cff89cbd3a6d42993b80891bd1cb50f1591ea13d043f101f4b530592b3d916c3",
 "generator_input_sha256": "e7c73a343e12f6aaa22eb6fe24979a378a40a92f7b1b2dd53c4c4a366f69242b",
 "generator_input_compact": {
 "task_id": "S-T07",
 "execution_id": "exec_1781847244182_1060d784",
 "task_name": "Absence / inactivity impact",
 "analysis_type": "correlation",
 "explanation_strategy": "correlation",
 "actionable_question": "How much are my absences hurting my grades?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "absence_data",
 "score_series"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "absence_data",
 "score_series"
 ],
 "dataset_row_counts": {
 "absence_data": 1,
 "score_series": 3
 },
 "ai_summary_config_summary": {
 "summary_type": "trend_series",
 "metric_column": "score_normalized",
 "entity_column": null,
 "group_column": null,
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
 "raw_text": "Summary: absence_rate=0.125 (12.5%); association_status=not_estimable; with one absence snapshot, the evidence cannot quantify how much absences are hurting grades. The score history shows an increase from a normalized score of 0 at assessment order 1 to 55 at assessment orders 2 and 3, indicating improvement over time.\n\nInsights: Score Improvement Over Assessments: The normalized score increased from 0 to 55 between assessment orders 1 and 3, showing a positive trend in performance as assessments progressed.\n\nEducational implications: Do not attribute the score change to absences from this evidence alone; treat the score series as score history and the absence row as a separate context snapshot.\n\nRecommendations: medium - Track additional absence snapshots alongside future assessment scores before estimating absence impact. - The current evidence has one absence snapshot and three score points, so it cannot quantify how much absences are hurting grades.",
 "structured_payload": {
 "task_id": "S-T07",
 "execution_id": "exec_1781847244182_1060d784",
 "explanation": {
 "summary": "absence_rate=0.125 (12.5%); association_status=not_estimable; with one absence snapshot, the evidence cannot quantify how much absences are hurting grades. The score history shows an increase from a normalized score of 0 at assessment order 1 to 55 at assessment orders 2 and 3, indicating improvement over time.",
 "insights": [
 {
 "title": "Score Improvement Over Assessments",
 "description": "The normalized score increased from 0 to 55 between assessment orders 1 and 3, showing a positive trend in performance as assessments progressed.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "up_from_previous",
 "delta": 55,
 "context": "from assessment order 1 to 3"
 }
 ]
 }
 ],
 "educational_implications": [
 "Do not attribute the score change to absences from this evidence alone; treat the score series as score history and the absence row as a separate context snapshot."
 ],
 "recommendations": [
 {
 "priority": "medium",
 "action": "Track additional absence snapshots alongside future assessment scores before estimating absence impact.",
 "rationale": "The current evidence has one absence snapshot and three score points, so it cannot quantify how much absences are hurting grades."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "LOW",
 "reason": "Only 3 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable.",
 "based_on": [
 "sparse_data",
 "single_student"
 ]
 },
 "explanation_strategy": "correlation",
 "explanation_type": "correlation",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "trend_series",
 "ai_summary_method_warning": null,
 "full_result_row_count": 4,
 "included_row_count": 4,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "absence_data",
 "row_count": 1,
 "included_row_count": 1
 },
 {
 "dataset_name": "score_series",
 "row_count": 3,
 "included_row_count": 3
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 4,
 "baseline_reference_tokens": 114,
 "task_aware_prompt_tokens": 1390,
 "token_ratio": 12.193,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "trend_relationship",
 "exceptions",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.trough",
 "exceptions.peak",
 "trend_relationship.largest_adjacent_rise",
 "comparison.secondary_metric_evidence",
 "primary_finding.association_evidence"
 ],
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "Start the summary with this exact evidence statement: absence_rate=0.125 (12.5%); association_status=not_estimable; with one absence snapshot, the evidence cannot quantify how much absences are hurting grades.",
 "State the exact absence_rate and the exact association_status=not_estimable for the absence-score relationship.",
 "Answer the student question directly: from one absence snapshot, the evidence cannot quantify how much absences are hurting grades.",
 "A single absence snapshot paired with a score series cannot estimate an absence-score correlation; describe the assessment-order score trend separately and do not call it a correlation or use it as evidence of absence impact.",
 "Do not make an attendance recommendation or claim that attendance would improve scores unless supplied action_evidence explicitly supports it."
 ],
 "must_keep_keys": [
 "action_evidence",
 "dataset_name",
 "first_point",
 "flagged_points",
 "largest_adjacent_drop",
 "last_point",
 "metric_column",
 "multi_dataset_evidence",
 "overall_change",
 "point_count",
 "row_count",
 "secondary_metric_associations",
 "small_sample_caveats",
 "summarization_warnings",
 "time_column"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (12.193 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "S-T07",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "Start the summary with this exact evidence statement: absence_rate=0.125 (12.5%); association_status=not_estimable; with one absence snapshot, the evidence cannot quantify how much absences are hurting grades.",
 "State the exact absence_rate and the exact association_status=not_estimable for the absence-score relationship.",
 "Answer the student question directly: from one absence snapshot, the evidence cannot quantify how much absences are hurting grades.",
 "A single absence snapshot paired with a score series cannot estimate an absence-score correlation; describe the assessment-order score trend separately and do not call it a correlation or use it as evidence of absence impact.",
 "Do not make an attendance recommendation or claim that attendance would improve scores unless supplied action_evidence explicitly supports it."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "score_series",
 "row_count": 3,
 "point_count": 3,
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "dataset_roles": {
 "absence_data": "context_snapshot",
 "score_series": "primary_series"
 },
 "metric_units": {
 "score_normalized": "score_on_runtime_scale",
 "week_of_class": "course_week"
 },
 "metric_directions": {
 "score_normalized": "higher_is_better",
 "week_of_class": "time_index"
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "first_point": {
 "assessment_order": 1,
 "score_normalized": 0,
 "secondary_metrics": {
 "week_of_class": 3
 }
 },
 "last_point": {
 "assessment_order": 3,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 14
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 0,
 "secondary_metrics": {
 "week_of_class": 3
 }
 },
 "to": {
 "assessment_order": 3,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 14
 }
 },
 "delta": 55,
 "percent_change": null
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "secondary_metric_associations": {
 "week_of_class": {
 "paired_point_count": 3,
 "method": "pearson_on_aligned_points",
 "correlation": 0.8386,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 }
 },
 "multi_dataset_evidence": [
 {
 "dataset_name": "absence_data",
 "role": "context_snapshot",
 "row_count": 1,
 "columns": [
 "absences",
 "absence_rate"
 ],
 "first_row": {
 "absences": 4,
 "absence_rate": "0.125"
 },
 "numeric_stats": {
 "absences": {
 "count": 1,
 "min": 4,
 "max": 4,
 "avg": 4
 },
 "absence_rate": {
 "count": 1,
 "min": 0.125,
 "max": 0.125,
 "avg": 0.125
 }
 }
 }
 ]
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
 "assessment_order": 2,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 8
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 3,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 14
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 }
 ]
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "action_evidence": []
 }
 },
 {
 "name": "limitations",
 "facts": {
 "small_sample_caveats": [
 {
 "point_count": 3,
 "minimum_sample_size": 6,
 "warning": "Only 3 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 }
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Only 3 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_series",
 "dataset_name": "score_series",
 "row_count": 3,
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "metric_units": {
 "score_normalized": "score_on_runtime_scale",
 "week_of_class": "course_week"
 },
 "metric_directions": {
 "score_normalized": "higher_is_better",
 "week_of_class": "time_index"
 },
 "dataset_roles": {
 "absence_data": "context_snapshot",
 "score_series": "primary_series"
 },
 "point_count": 3,
 "first_point": {
 "assessment_order": 1,
 "score_normalized": 0,
 "secondary_metrics": {
 "week_of_class": 3
 }
 },
 "last_point": {
 "assessment_order": 3,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 14
 }
 },
 "peak": {
 "assessment_order": 2,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 8
 }
 },
 "trough": {
 "assessment_order": 1,
 "score_normalized": 0,
 "secondary_metrics": {
 "week_of_class": 3
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 0,
 "secondary_metrics": {
 "week_of_class": 3
 }
 },
 "to": {
 "assessment_order": 3,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 14
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
 "secondary_metrics": {
 "week_of_class": 3
 }
 },
 "to": {
 "assessment_order": 2,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 8
 }
 },
 "delta": 55
 },
 "flagged_points": [
 {
 "assessment_order": 2,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 8
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 3,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 14
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 }
 ],
 "secondary_metric_evidence": {
 "week_of_class": {
 "count": 3,
 "min": 3,
 "max": 14,
 "first": 3,
 "last": 14
 }
 },
 "secondary_metric_associations": {
 "week_of_class": {
 "paired_point_count": 3,
 "method": "pearson_on_aligned_points",
 "correlation": 0.8386,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 }
 },
 "multi_dataset_evidence": [
 {
 "dataset_name": "absence_data",
 "role": "context_snapshot",
 "row_count": 1,
 "columns": [
 "absences",
 "absence_rate"
 ],
 "first_row": {
 "absences": 4,
 "absence_rate": "0.125"
 },
 "numeric_stats": {
 "absences": {
 "count": 1,
 "min": 4,
 "max": 4,
 "avg": 4
 },
 "absence_rate": {
 "count": 1,
 "min": 0.125,
 "max": 0.125,
 "avg": 0.125
 }
 }
 }
 ],
 "small_sample_caveats": [
 {
 "point_count": 3,
 "minimum_sample_size": 6,
 "warning": "Only 3 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 }
 ],
 "causal_claim_allowed": false,
 "action_evidence": [],
 "summarization_warnings": [
 "Only 3 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 ],
 "association_evidence": {
 "absence_rate": "0.125",
 "absence_observation_count": 1,
 "score_observation_count": 3,
 "association_status": "not_estimable",
 "reason": "Only one student-level absence snapshot is supplied; assessment-order score variation cannot estimate absence-score association."
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4103,
 "token_usage": {
 "prompt_tokens": 1966,
 "completion_tokens": 283,
 "total_tokens": 2249
 },
 "strategy": "correlation",
 "granularity": "per_assessment",
 "cost_usd": 0.000465
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__S-T07__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "cff89cbd3a6d42993b80891bd1cb50f1591ea13d043f101f4b530592b3d916c3",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1966,
 "completion_tokens": 283,
 "total_tokens": 2249
 },
 "latency_ms": 4211,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-T07",
 "execution_id": "exec_1781847244182_1060d784",
 "explanation": {
 "summary": "absence_rate=0.125 (12.5%); association_status=not_estimable; with one absence snapshot, the evidence cannot quantify how much absences are hurting grades. The score history shows an increase from a normalized score of 0 at assessment order 1 to 55 at assessment orders 2 and 3, indicating improvement over time.",
 "insights": [
 {
 "title": "Score Improvement Over Assessments",
 "description": "The normalized score increased from 0 to 55 between assessment orders 1 and 3, showing a positive trend in performance as assessments progressed.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "score_normalized",
 "value": 55,
 "comparison": "up_from_previous",
 "delta": 55,
 "context": "from assessment order 1 to 3"
 }
 ]
 }
 ],
 "educational_implications": [
 "Do not attribute the score change to absences from this evidence alone; treat the score series as score history and the absence row as a separate context snapshot."
 ],
 "recommendations": [
 {
 "priority": "medium",
 "action": "Track additional absence snapshots alongside future assessment scores before estimating absence impact.",
 "rationale": "The current evidence has one absence snapshot and three score points, so it cannot quantify how much absences are hurting grades."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "LOW",
 "reason": "Only 3 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable.",
 "based_on": [
 "sparse_data",
 "single_student"
 ]
 },
 "explanation_strategy": "correlation",
 "explanation_type": "correlation",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "trend_series",
 "ai_summary_method_warning": null,
 "full_result_row_count": 4,
 "included_row_count": 4,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "absence_data",
 "row_count": 1,
 "included_row_count": 1
 },
 {
 "dataset_name": "score_series",
 "row_count": 3,
 "included_row_count": 3
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 4,
 "baseline_reference_tokens": 114,
 "task_aware_prompt_tokens": 1390,
 "token_ratio": 12.193,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "trend_relationship",
 "exceptions",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.trough",
 "exceptions.peak",
 "trend_relationship.largest_adjacent_rise",
 "comparison.secondary_metric_evidence",
 "primary_finding.association_evidence"
 ],
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "Start the summary with this exact evidence statement: absence_rate=0.125 (12.5%); association_status=not_estimable; with one absence snapshot, the evidence cannot quantify how much absences are hurting grades.",
 "State the exact absence_rate and the exact association_status=not_estimable for the absence-score relationship.",
 "Answer the student question directly: from one absence snapshot, the evidence cannot quantify how much absences are hurting grades.",
 "A single absence snapshot paired with a score series cannot estimate an absence-score correlation; describe the assessment-order score trend separately and do not call it a correlation or use it as evidence of absence impact.",
 "Do not make an attendance recommendation or claim that attendance would improve scores unless supplied action_evidence explicitly supports it."
 ],
 "must_keep_keys": [
 "action_evidence",
 "dataset_name",
 "first_point",
 "flagged_points",
 "largest_adjacent_drop",
 "last_point",
 "metric_column",
 "multi_dataset_evidence",
 "overall_change",
 "point_count",
 "row_count",
 "secondary_metric_associations",
 "small_sample_caveats",
 "summarization_warnings",
 "time_column"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (12.193 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "S-T07",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "Start the summary with this exact evidence statement: absence_rate=0.125 (12.5%); association_status=not_estimable; with one absence snapshot, the evidence cannot quantify how much absences are hurting grades.",
 "State the exact absence_rate and the exact association_status=not_estimable for the absence-score relationship.",
 "Answer the student question directly: from one absence snapshot, the evidence cannot quantify how much absences are hurting grades.",
 "A single absence snapshot paired with a score series cannot estimate an absence-score correlation; describe the assessment-order score trend separately and do not call it a correlation or use it as evidence of absence impact.",
 "Do not make an attendance recommendation or claim that attendance would improve scores unless supplied action_evidence explicitly supports it."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "score_series",
 "row_count": 3,
 "point_count": 3,
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "dataset_roles": {
 "absence_data": "context_snapshot",
 "score_series": "primary_series"
 },
 "metric_units": {
 "score_normalized": "score_on_runtime_scale",
 "week_of_class": "course_week"
 },
 "metric_directions": {
 "score_normalized": "higher_is_better",
 "week_of_class": "time_index"
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "first_point": {
 "assessment_order": 1,
 "score_normalized": 0,
 "secondary_metrics": {
 "week_of_class": 3
 }
 },
 "last_point": {
 "assessment_order": 3,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 14
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 0,
 "secondary_metrics": {
 "week_of_class": 3
 }
 },
 "to": {
 "assessment_order": 3,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 14
 }
 },
 "delta": 55,
 "percent_change": null
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "secondary_metric_associations": {
 "week_of_class": {
 "paired_point_count": 3,
 "method": "pearson_on_aligned_points",
 "correlation": 0.8386,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 }
 },
 "multi_dataset_evidence": [
 {
 "dataset_name": "absence_data",
 "role": "context_snapshot",
 "row_count": 1,
 "columns": [
 "absences",
 "absence_rate"
 ],
 "first_row": {
 "absences": 4,
 "absence_rate": "0.125"
 },
 "numeric_stats": {
 "absences": {
 "count": 1,
 "min": 4,
 "max": 4,
 "avg": 4
 },
 "absence_rate": {
 "count": 1,
 "min": 0.125,
 "max": 0.125,
 "avg": 0.125
 }
 }
 }
 ]
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
 "assessment_order": 2,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 8
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 3,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 14
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 }
 ]
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "action_evidence": []
 }
 },
 {
 "name": "limitations",
 "facts": {
 "small_sample_caveats": [
 {
 "point_count": 3,
 "minimum_sample_size": 6,
 "warning": "Only 3 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 }
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Only 3 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_series",
 "dataset_name": "score_series",
 "row_count": 3,
 "time_column": "assessment_order",
 "metric_column": "score_normalized",
 "metric_units": {
 "score_normalized": "score_on_runtime_scale",
 "week_of_class": "course_week"
 },
 "metric_directions": {
 "score_normalized": "higher_is_better",
 "week_of_class": "time_index"
 },
 "dataset_roles": {
 "absence_data": "context_snapshot",
 "score_series": "primary_series"
 },
 "point_count": 3,
 "first_point": {
 "assessment_order": 1,
 "score_normalized": 0,
 "secondary_metrics": {
 "week_of_class": 3
 }
 },
 "last_point": {
 "assessment_order": 3,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 14
 }
 },
 "peak": {
 "assessment_order": 2,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 8
 }
 },
 "trough": {
 "assessment_order": 1,
 "score_normalized": 0,
 "secondary_metrics": {
 "week_of_class": 3
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "score_normalized": 0,
 "secondary_metrics": {
 "week_of_class": 3
 }
 },
 "to": {
 "assessment_order": 3,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 14
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
 "secondary_metrics": {
 "week_of_class": 3
 }
 },
 "to": {
 "assessment_order": 2,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 8
 }
 },
 "delta": 55
 },
 "flagged_points": [
 {
 "assessment_order": 2,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 8
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 3,
 "score_normalized": 55,
 "secondary_metrics": {
 "week_of_class": 14
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 }
 ],
 "secondary_metric_evidence": {
 "week_of_class": {
 "count": 3,
 "min": 3,
 "max": 14,
 "first": 3,
 "last": 14
 }
 },
 "secondary_metric_associations": {
 "week_of_class": {
 "paired_point_count": 3,
 "method": "pearson_on_aligned_points",
 "correlation": 0.8386,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 }
 },
 "multi_dataset_evidence": [
 {
 "dataset_name": "absence_data",
 "role": "context_snapshot",
 "row_count": 1,
 "columns": [
 "absences",
 "absence_rate"
 ],
 "first_row": {
 "absences": 4,
 "absence_rate": "0.125"
 },
 "numeric_stats": {
 "absences": {
 "count": 1,
 "min": 4,
 "max": 4,
 "avg": 4
 },
 "absence_rate": {
 "count": 1,
 "min": 0.125,
 "max": 0.125,
 "avg": 0.125
 }
 }
 }
 ],
 "small_sample_caveats": [
 {
 "point_count": 3,
 "minimum_sample_size": 6,
 "warning": "Only 3 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 }
 ],
 "causal_claim_allowed": false,
 "action_evidence": [],
 "summarization_warnings": [
 "Only 3 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 ],
 "association_evidence": {
 "absence_rate": "0.125",
 "absence_observation_count": 1,
 "score_observation_count": 3,
 "association_status": "not_estimable",
 "reason": "Only one student-level absence snapshot is supplied; assessment-order score variation cannot estimate absence-score association."
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4103,
 "token_usage": {
 "prompt_tokens": 1966,
 "completion_tokens": 283,
 "total_tokens": 2249
 },
 "strategy": "correlation",
 "granularity": "per_assessment",
 "cost_usd": 0.000465
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
 "expected": 4,
 "observed": 4
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "b65c8e0cc5e17ffc245ee241aadadd191d62ce0e4088f4a501856b9f527298ac",
 "expected_values": [
 "b65c8e0cc5e17ffc245ee241aadadd191d62ce0e4088f4a501856b9f527298ac",
 "b65c8e0cc5e17ffc245ee241aadadd191d62ce0e4088f4a501856b9f527298ac"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "8c019c1f11810141fa63188bbe86b1eb24ba42b4e0e8d64b7abcede3fd38ce55",
 "expected": "8c019c1f11810141fa63188bbe86b1eb24ba42b4e0e8d64b7abcede3fd38ce55"
 },
 {
 "check_id": "numeric_fields_absence_data",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "absence_data",
 "numeric_columns": [
 "absences"
 ],
 "numeric_summaries": {
 "absences": {
 "count": 1,
 "min": 4,
 "max": 4
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_absence_data",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "absence_data",
 "flag_columns": [],
 "triggered_like_counts": {}
 },
 {
 "check_id": "numeric_fields_score_series",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "score_series",
 "numeric_columns": [
 "assessment_order",
 "score_normalized",
 "week_of_class"
 ],
 "numeric_summaries": {
 "assessment_order": {
 "count": 3,
 "min": 1,
 "max": 3
 },
 "score_normalized": {
 "count": 3,
 "min": 0,
 "max": 55
 },
 "week_of_class": {
 "count": 3,
 "min": 3,
 "max": 14
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_score_series",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "score_series",
 "flag_columns": [
 "pass_flag"
 ],
 "triggered_like_counts": {
 "pass_flag": 2
 }
 }
]
```

