# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__S-T02__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
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
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T02.json",
 "artifact_sha256": "a1848a3f995f7d5beb2bcfa2fc5eeeb8458cd9832da3ae69a4cc584d044ae3e8",
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
 "evidence_artifact_file_sha256": "a1848a3f995f7d5beb2bcfa2fc5eeeb8458cd9832da3ae69a4cc584d044ae3e8",
 "evidence_rows_sha256": "896873377e2a48764edb518b58c424263fbc7e6f84e09ab69dc3cb9dbd670166",
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
 "embedded_datasets_sha256": "896873377e2a48764edb518b58c424263fbc7e6f84e09ab69dc3cb9dbd670166",
 "datasets": {
 "competency_scores": [
 {
 "competency_tag": "CMA 8",
 "competency_source": "proxy",
 "assessment_type": "CMA",
 "avg_score": 83,
 "pass_rate": 1,
 "assessment_count": 1
 },
 {
 "competency_tag": "CMA 3",
 "competency_source": "proxy",
 "assessment_type": "CMA",
 "avg_score": 87,
 "pass_rate": 1,
 "assessment_count": 1
 },
 {
 "competency_tag": "CMA 5",
 "competency_source": "proxy",
 "assessment_type": "CMA",
 "avg_score": 90,
 "pass_rate": 1,
 "assessment_count": 1
 },
 {
 "competency_tag": "Exam 9",
 "competency_source": "proxy",
 "assessment_type": "Exam",
 "avg_score": 96,
 "pass_rate": 1,
 "assessment_count": 1
 },
 {
 "competency_tag": "CMA 1",
 "competency_source": "proxy",
 "assessment_type": "CMA",
 "avg_score": 100,
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
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "8c7d18f83ab0de0cfc9a18ceca88d4bedb474e9ad6f32b9e99872f358fa0b24c",
 "generator_input_sha256": "8d5c4870bc1315f6fab33e7702d676297e98b55b555e90862a9d18493dfb2b06",
 "generator_input_compact": {
 "task_id": "S-T02",
 "execution_id": "exec_1781847881158_4c69c270",
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
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "competency_scores"
 ],
 "dataset_row_counts": {
 "competency_scores": 5
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
 "raw_text": "Summary: This is one selected student's assessment evidence. Exact competency rows: CMA 8: avg_score=83, pass_rate=1, assessment_count=1; CMA 3: avg_score=87, pass_rate=1, assessment_count=1; CMA 5: avg_score=90, pass_rate=1, assessment_count=1; Exam 9: avg_score=96, pass_rate=1, assessment_count=1; CMA 1: avg_score=100, pass_rate=1, assessment_count=1.\n\nInsights: Lowest Average Score: CMA 8 has the lowest average score of 83, which is significantly below the median score of 90. This suggests that there may be challenges in this area that need to be addressed.\n\nEducational implications: For this selected student, CMA 8 is the lowest returned assessment proxy; do not generalize beyond this selected-student scope.\n\nRecommendations: high - Review the content and practice materials for CMA 8. - Improving understanding and skills in this area can lead to better performance and higher scores.",
 "structured_payload": {
 "task_id": "S-T02",
 "execution_id": "exec_1781847881158_4c69c270",
 "explanation": {
 "summary": "This is one selected student's assessment evidence. Exact competency rows: CMA 8: avg_score=83, pass_rate=1, assessment_count=1; CMA 3: avg_score=87, pass_rate=1, assessment_count=1; CMA 5: avg_score=90, pass_rate=1, assessment_count=1; Exam 9: avg_score=96, pass_rate=1, assessment_count=1; CMA 1: avg_score=100, pass_rate=1, assessment_count=1.",
 "insights": [
 {
 "title": "Lowest Average Score",
 "description": "CMA 8 has the lowest average score of 83, which is significantly below the median score of 90. This suggests that there may be challenges in this area that need to be addressed.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 83,
 "comparison": "down_from_previous",
 "delta": -7,
 "context": "Lowest score among the assessments"
 }
 ]
 }
 ],
 "educational_implications": [
 "For this selected student, CMA 8 is the lowest returned assessment proxy; do not generalize beyond this selected-student scope."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Review the content and practice materials for CMA 8.",
 "rationale": "Improving understanding and skills in this area can lead to better performance and higher scores."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is clear and shows distinct performance levels across assessments.",
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
 "full_result_row_count": 5,
 "included_row_count": 5,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "competency_scores",
 "row_count": 5,
 "included_row_count": 5
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 5,
 "baseline_reference_tokens": 182,
 "task_aware_prompt_tokens": 893,
 "token_ratio": 4.9066,
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (4.9066 > 1.2).",
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
 "row_count": 5,
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
 "competency_tag": "CMA 8",
 "avg_score": 83,
 "rank": 1,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 3",
 "avg_score": 87,
 "rank": 2,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 5",
 "avg_score": 90,
 "rank": 3,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "Exam 9",
 "avg_score": 96,
 "rank": 4,
 "labels": {
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 1",
 "avg_score": 100,
 "rank": 5,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "median_item": {
 "competency_tag": "CMA 5",
 "avg_score": 90,
 "rank": 3,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 "bottom_items": [
 {
 "competency_tag": "CMA 5",
 "avg_score": 90,
 "rank": 3,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "Exam 9",
 "avg_score": 96,
 "rank": 4,
 "labels": {
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 1",
 "avg_score": 100,
 "rank": 5,
 "labels": {
 "assessment_type": "CMA"
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
 "count": 5,
 "min": 83,
 "max": 100,
 "mean": 91.2,
 "median": 90
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
 "row_count": 5,
 "entity_column": "competency_tag",
 "metric_column": "avg_score",
 "sort_direction": "asc",
 "top_items": [
 {
 "competency_tag": "CMA 8",
 "avg_score": 83,
 "rank": 1,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 3",
 "avg_score": 87,
 "rank": 2,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 5",
 "avg_score": 90,
 "rank": 3,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "Exam 9",
 "avg_score": 96,
 "rank": 4,
 "labels": {
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 1",
 "avg_score": 100,
 "rank": 5,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "bottom_items": [
 {
 "competency_tag": "CMA 5",
 "avg_score": 90,
 "rank": 3,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "Exam 9",
 "avg_score": 96,
 "rank": 4,
 "labels": {
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 1",
 "avg_score": 100,
 "rank": 5,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "median_item": {
 "competency_tag": "CMA 5",
 "avg_score": 90,
 "rank": 3,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 "metric_stats": {
 "count": 5,
 "min": 83,
 "max": 100,
 "mean": 91.2,
 "median": 90
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
 "latency_ms": 7560,
 "token_usage": {
 "prompt_tokens": 1634,
 "completion_tokens": 305,
 "total_tokens": 1939
 },
 "strategy": "distribution",
 "granularity": "per_assessment",
 "cost_usd": 0.000428
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "8c7d18f83ab0de0cfc9a18ceca88d4bedb474e9ad6f32b9e99872f358fa0b24c",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1634,
 "completion_tokens": 305,
 "total_tokens": 1939
 },
 "latency_ms": 7571,
 "attempts_used": 2
 },
 "source_response_body": {
 "task_id": "S-T02",
 "execution_id": "exec_1781847881158_4c69c270",
 "explanation": {
 "summary": "This is one selected student's assessment evidence. Exact competency rows: CMA 8: avg_score=83, pass_rate=1, assessment_count=1; CMA 3: avg_score=87, pass_rate=1, assessment_count=1; CMA 5: avg_score=90, pass_rate=1, assessment_count=1; Exam 9: avg_score=96, pass_rate=1, assessment_count=1; CMA 1: avg_score=100, pass_rate=1, assessment_count=1.",
 "insights": [
 {
 "title": "Lowest Average Score",
 "description": "CMA 8 has the lowest average score of 83, which is significantly below the median score of 90. This suggests that there may be challenges in this area that need to be addressed.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 83,
 "comparison": "down_from_previous",
 "delta": -7,
 "context": "Lowest score among the assessments"
 }
 ]
 }
 ],
 "educational_implications": [
 "For this selected student, CMA 8 is the lowest returned assessment proxy; do not generalize beyond this selected-student scope."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Review the content and practice materials for CMA 8.",
 "rationale": "Improving understanding and skills in this area can lead to better performance and higher scores."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is clear and shows distinct performance levels across assessments.",
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
 "full_result_row_count": 5,
 "included_row_count": 5,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "competency_scores",
 "row_count": 5,
 "included_row_count": 5
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 5,
 "baseline_reference_tokens": 182,
 "task_aware_prompt_tokens": 893,
 "token_ratio": 4.9066,
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (4.9066 > 1.2).",
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
 "row_count": 5,
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
 "competency_tag": "CMA 8",
 "avg_score": 83,
 "rank": 1,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 3",
 "avg_score": 87,
 "rank": 2,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 5",
 "avg_score": 90,
 "rank": 3,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "Exam 9",
 "avg_score": 96,
 "rank": 4,
 "labels": {
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 1",
 "avg_score": 100,
 "rank": 5,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "median_item": {
 "competency_tag": "CMA 5",
 "avg_score": 90,
 "rank": 3,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 "bottom_items": [
 {
 "competency_tag": "CMA 5",
 "avg_score": 90,
 "rank": 3,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "Exam 9",
 "avg_score": 96,
 "rank": 4,
 "labels": {
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 1",
 "avg_score": 100,
 "rank": 5,
 "labels": {
 "assessment_type": "CMA"
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
 "count": 5,
 "min": 83,
 "max": 100,
 "mean": 91.2,
 "median": 90
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
 "row_count": 5,
 "entity_column": "competency_tag",
 "metric_column": "avg_score",
 "sort_direction": "asc",
 "top_items": [
 {
 "competency_tag": "CMA 8",
 "avg_score": 83,
 "rank": 1,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 3",
 "avg_score": 87,
 "rank": 2,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 5",
 "avg_score": 90,
 "rank": 3,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "Exam 9",
 "avg_score": 96,
 "rank": 4,
 "labels": {
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 1",
 "avg_score": 100,
 "rank": 5,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "bottom_items": [
 {
 "competency_tag": "CMA 5",
 "avg_score": 90,
 "rank": 3,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "Exam 9",
 "avg_score": 96,
 "rank": 4,
 "labels": {
 "assessment_type": "Exam"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "CMA 1",
 "avg_score": 100,
 "rank": 5,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "median_item": {
 "competency_tag": "CMA 5",
 "avg_score": 90,
 "rank": 3,
 "labels": {
 "assessment_type": "CMA"
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 "metric_stats": {
 "count": 5,
 "min": 83,
 "max": 100,
 "mean": 91.2,
 "median": 90
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
 "latency_ms": 7560,
 "token_usage": {
 "prompt_tokens": 1634,
 "completion_tokens": 305,
 "total_tokens": 1939
 },
 "strategy": "distribution",
 "granularity": "per_assessment",
 "cost_usd": 0.000428
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
 "observed": "a1848a3f995f7d5beb2bcfa2fc5eeeb8458cd9832da3ae69a4cc584d044ae3e8",
 "expected_values": [
 "a1848a3f995f7d5beb2bcfa2fc5eeeb8458cd9832da3ae69a4cc584d044ae3e8"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "896873377e2a48764edb518b58c424263fbc7e6f84e09ab69dc3cb9dbd670166",
 "expected": "896873377e2a48764edb518b58c424263fbc7e6f84e09ab69dc3cb9dbd670166"
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
 "count": 5,
 "min": 1,
 "max": 1
 },
 "avg_score": {
 "count": 5,
 "min": 83,
 "max": 100
 },
 "pass_rate": {
 "count": 5,
 "min": 1,
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
