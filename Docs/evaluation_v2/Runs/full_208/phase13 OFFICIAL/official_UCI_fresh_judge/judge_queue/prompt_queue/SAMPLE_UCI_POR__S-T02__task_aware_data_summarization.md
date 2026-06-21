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

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__S-T02__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "S-T02",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Competency gap analysis",
 "scope": "1 student",
 "actionable_question": "Which skill area should I prioritise for improvement?",
 "target_audience": "student",
 "ai_summary_type": "ranking",
 "ai_prompt_hint": "Highlight which competency tags have lowest avg scores. Suggest focus areas.",
 "query_labels": [
 "competency_scores"
 ],
 "explanation_strategy": "distribution"
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
 "competency_tag",
 "score_normalized",
 "pass_flag",
 "assessment_type"
 ],
 "output_schema": {
 "required_columns": [
 "competency_tag",
 "avg_score"
 ],
 "optional_columns": [
 "competency_source",
 "assessment_type",
 "pass_rate",
 "assessment_count"
 ]
 },
 "query_labels": [
 "competency_scores"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "S-T02-CORE-01",
 "description": "Identify the competency tags with the lowest average scores."
 }
 ],
 "required_supporting_outputs": [
 {
 "requirement_id": "S-T02-SUPPORT-01",
 "description": "Suggest focus areas grounded in the identified competency gaps."
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
 "dataset_label": "competency_scores",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T02.json",
 "artifact_sha256": "34ab141b25ca16b9dd8c3f52e25e38008147db8849cc648c9c63f78473a18ff9",
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
 "evidence_artifact_file_sha256": "34ab141b25ca16b9dd8c3f52e25e38008147db8849cc648c9c63f78473a18ff9",
 "evidence_rows_sha256": "016f1ef73ee0b3892d1908447134b38adc14c61f3c8514df1cb77ab5b91eb41f",
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
 "embedded_datasets_sha256": "016f1ef73ee0b3892d1908447134b38adc14c61f3c8514df1cb77ab5b91eb41f",
 "datasets": {
 "competency_scores": [
 {
 "competency_tag": "G1",
 "competency_source": "proxy",
 "assessment_type": "quiz",
 "avg_score": 0,
 "pass_rate": 0,
 "assessment_count": 1
 },
 {
 "competency_tag": "G2",
 "competency_source": "proxy",
 "assessment_type": "quiz",
 "avg_score": 55,
 "pass_rate": 1,
 "assessment_count": 1
 },
 {
 "competency_tag": "G3",
 "competency_source": "proxy",
 "assessment_type": "exam",
 "avg_score": 55,
 "pass_rate": 1,
 "assessment_count": 1
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__S-T02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "d559b498d23f5fc96018460a9a7b32a76025dc78fd40a28d3ab4d90f9c80c4d7",
 "generator_input_sha256": "d5b682b90be2ea27b01f94a6ed45951c1e37544a03eb8c70feaa046297c99118",
 "generator_input_compact": {
 "task_id": "S-T02",
 "execution_id": "exec_1781847241808_0a627cbd",
 "task_name": "Competency gap analysis",
 "analysis_type": "distribution",
 "explanation_strategy": "distribution",
 "actionable_question": "Which skill area should I prioritise for improvement?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "competency_scores"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "competency_scores"
 ],
 "dataset_row_counts": {
 "competency_scores": 3
 },
 "ai_summary_config_summary": {
 "summary_type": "ranking",
 "metric_column": "avg_score",
 "entity_column": "competency_tag",
 "group_column": null,
 "time_column": null,
 "sort_by": null,
 "sort_direction": "asc",
 "top_k": 5,
 "bottom_k": 3,
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
 "raw_text": "Summary: This is one selected student's assessment evidence. Exact competency rows: G1: avg_score=0, pass_rate=0, assessment_count=1; G2: avg_score=55, pass_rate=1, assessment_count=1; G3: avg_score=55, pass_rate=1, assessment_count=1.\n\nInsights: Lowest Performing Area: G1 has the lowest average score of 0, indicating a complete lack of understanding or mastery in this area. This is a critical gap that should be addressed first.\n\nEducational implications: For this selected student, G1 is the lowest returned assessment proxy; do not generalize beyond this selected-student scope.\n\nRecommendations: high - Engage in targeted practice or tutoring for G1. - Improving in G1 will provide you with the necessary skills to succeed in more advanced topics.",
 "structured_payload": {
 "task_id": "S-T02",
 "execution_id": "exec_1781847241808_0a627cbd",
 "explanation": {
 "summary": "This is one selected student's assessment evidence. Exact competency rows: G1: avg_score=0, pass_rate=0, assessment_count=1; G2: avg_score=55, pass_rate=1, assessment_count=1; G3: avg_score=55, pass_rate=1, assessment_count=1.",
 "insights": [
 {
 "title": "Lowest Performing Area",
 "description": "G1 has the lowest average score of 0, indicating a complete lack of understanding or mastery in this area. This is a critical gap that should be addressed first.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "G1 is the only area with a score of 0."
 }
 ]
 }
 ],
 "educational_implications": [
 "For this selected student, G1 is the lowest returned assessment proxy; do not generalize beyond this selected-student scope."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Engage in targeted practice or tutoring for G1.",
 "rationale": "Improving in G1 will provide you with the necessary skills to succeed in more advanced topics."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data clearly shows a stark contrast in performance across the competency areas.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "ranking",
 "ai_summary_method_warning": null,
 "full_result_row_count": 3,
 "included_row_count": 3,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "competency_scores",
 "row_count": 3,
 "included_row_count": 3
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 3,
 "baseline_reference_tokens": 111,
 "task_aware_prompt_tokens": 742,
 "token_ratio": 6.6847,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples."
 ],
 "must_keep_keys": [
 "dataset_name",
 "entity_column",
 "flag_evidence",
 "metric_column",
 "metric_stats",
 "row_count",
 "sort_direction",
 "summarization_warnings",
 "top_items"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.6847 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "ranking",
 "task_id": "S-T02",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "competency_scores",
 "row_count": 3,
 "entity_column": "competency_tag",
 "metric_column": "avg_score",
 "sort_direction": "asc"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "top_items": [
 {
 "competency_tag": "G1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G2",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G3",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "median_item": {
 "competency_tag": "G2",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 "bottom_items": [
 {
 "competency_tag": "G1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G2",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G3",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ]
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_stats": {
 "count": 3,
 "min": 0,
 "max": 55,
 "mean": 36.6667,
 "median": 55
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flag_evidence": [],
 "tie_warnings": []
 }
 },
 {
 "name": "limitations",
 "facts": {
 "summarization_warnings": [
 "Configured optional column 'competency_source' is missing from dataset."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "ranking",
 "dataset_name": "competency_scores",
 "row_count": 3,
 "entity_column": "competency_tag",
 "metric_column": "avg_score",
 "sort_direction": "asc",
 "top_items": [
 {
 "competency_tag": "G1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G2",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G3",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "bottom_items": [
 {
 "competency_tag": "G1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G2",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G3",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "median_item": {
 "competency_tag": "G2",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 "metric_stats": {
 "count": 3,
 "min": 0,
 "max": 55,
 "mean": 36.6667,
 "median": 55
 },
 "tie_warnings": [],
 "flag_evidence": [],
 "summarization_warnings": [
 "Configured optional column 'competency_source' is missing from dataset."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4321,
 "token_usage": {
 "prompt_tokens": 1385,
 "completion_tokens": 316,
 "total_tokens": 1701
 },
 "strategy": "distribution",
 "granularity": "per_assessment",
 "cost_usd": 0.000397
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__S-T02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "d559b498d23f5fc96018460a9a7b32a76025dc78fd40a28d3ab4d90f9c80c4d7",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1385,
 "completion_tokens": 316,
 "total_tokens": 1701
 },
 "latency_ms": 4551,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-T02",
 "execution_id": "exec_1781847241808_0a627cbd",
 "explanation": {
 "summary": "This is one selected student's assessment evidence. Exact competency rows: G1: avg_score=0, pass_rate=0, assessment_count=1; G2: avg_score=55, pass_rate=1, assessment_count=1; G3: avg_score=55, pass_rate=1, assessment_count=1.",
 "insights": [
 {
 "title": "Lowest Performing Area",
 "description": "G1 has the lowest average score of 0, indicating a complete lack of understanding or mastery in this area. This is a critical gap that should be addressed first.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "G1 is the only area with a score of 0."
 }
 ]
 }
 ],
 "educational_implications": [
 "For this selected student, G1 is the lowest returned assessment proxy; do not generalize beyond this selected-student scope."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Engage in targeted practice or tutoring for G1.",
 "rationale": "Improving in G1 will provide you with the necessary skills to succeed in more advanced topics."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data clearly shows a stark contrast in performance across the competency areas.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "ranking",
 "ai_summary_method_warning": null,
 "full_result_row_count": 3,
 "included_row_count": 3,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "competency_scores",
 "row_count": 3,
 "included_row_count": 3
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 3,
 "baseline_reference_tokens": 111,
 "task_aware_prompt_tokens": 742,
 "token_ratio": 6.6847,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples."
 ],
 "must_keep_keys": [
 "dataset_name",
 "entity_column",
 "flag_evidence",
 "metric_column",
 "metric_stats",
 "row_count",
 "sort_direction",
 "summarization_warnings",
 "top_items"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.6847 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "ranking",
 "task_id": "S-T02",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "competency_scores",
 "row_count": 3,
 "entity_column": "competency_tag",
 "metric_column": "avg_score",
 "sort_direction": "asc"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "top_items": [
 {
 "competency_tag": "G1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G2",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G3",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "median_item": {
 "competency_tag": "G2",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 "bottom_items": [
 {
 "competency_tag": "G1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G2",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G3",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ]
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_stats": {
 "count": 3,
 "min": 0,
 "max": 55,
 "mean": 36.6667,
 "median": 55
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flag_evidence": [],
 "tie_warnings": []
 }
 },
 {
 "name": "limitations",
 "facts": {
 "summarization_warnings": [
 "Configured optional column 'competency_source' is missing from dataset."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "ranking",
 "dataset_name": "competency_scores",
 "row_count": 3,
 "entity_column": "competency_tag",
 "metric_column": "avg_score",
 "sort_direction": "asc",
 "top_items": [
 {
 "competency_tag": "G1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G2",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G3",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "bottom_items": [
 {
 "competency_tag": "G1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G2",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "G3",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "median_item": {
 "competency_tag": "G2",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "quiz"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 "metric_stats": {
 "count": 3,
 "min": 0,
 "max": 55,
 "mean": 36.6667,
 "median": 55
 },
 "tie_warnings": [],
 "flag_evidence": [],
 "summarization_warnings": [
 "Configured optional column 'competency_source' is missing from dataset."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4321,
 "token_usage": {
 "prompt_tokens": 1385,
 "completion_tokens": 316,
 "total_tokens": 1701
 },
 "strategy": "distribution",
 "granularity": "per_assessment",
 "cost_usd": 0.000397
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
 "observed": "34ab141b25ca16b9dd8c3f52e25e38008147db8849cc648c9c63f78473a18ff9",
 "expected_values": [
 "34ab141b25ca16b9dd8c3f52e25e38008147db8849cc648c9c63f78473a18ff9"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "016f1ef73ee0b3892d1908447134b38adc14c61f3c8514df1cb77ab5b91eb41f",
 "expected": "016f1ef73ee0b3892d1908447134b38adc14c61f3c8514df1cb77ab5b91eb41f"
 },
 {
 "check_id": "numeric_fields_competency_scores",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "competency_scores",
 "numeric_columns": [
 "assessment_count",
 "avg_score",
 "pass_rate"
 ],
 "numeric_summaries": {
 "assessment_count": {
 "count": 3,
 "min": 1,
 "max": 1
 },
 "avg_score": {
 "count": 3,
 "min": 0,
 "max": 55
 },
 "pass_rate": {
 "count": 3,
 "min": 0,
 "max": 1
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_competency_scores",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "competency_scores",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```

