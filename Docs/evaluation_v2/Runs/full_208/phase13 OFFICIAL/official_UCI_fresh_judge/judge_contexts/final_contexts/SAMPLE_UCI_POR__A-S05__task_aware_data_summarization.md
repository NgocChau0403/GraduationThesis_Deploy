# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S05__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__A-S05__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "A-S05",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Student competency gap",
 "scope": "1 student",
 "actionable_question": "Where should we focus academic support for this student?",
 "target_audience": "instructor, academic_advisor",
 "ai_summary_type": "ranking",
 "ai_prompt_hint": "Highlight competency tags with lowest avg scores. Recommend specific support type (knowledge_recall → flashcards, applied → practice problems).",
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
 "assessment_order",
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
 "requirement_id": "A-S05-CORE-01",
 "description": "Highlight competency tags with lowest avg scores."
 },
 {
 "requirement_id": "A-S05-CORE-02",
 "description": "Recommend specific support type (knowledge_recall → flashcards, applied → practice problems)."
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
 "dataset_label": "competency_scores",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S05.json",
 "artifact_sha256": "f3b8cd55949300246cc6a7569e855c53e85ef1e24ea83aaee117d4efda1e410c",
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
 "evidence_artifact_file_sha256": "f3b8cd55949300246cc6a7569e855c53e85ef1e24ea83aaee117d4efda1e410c",
 "evidence_rows_sha256": "e88796ba4c40e4cf5adc854816ed25ecc8523aee6a1cf626f48f3545f2bb2ed3",
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
 "embedded_datasets_sha256": "e88796ba4c40e4cf5adc854816ed25ecc8523aee6a1cf626f48f3545f2bb2ed3",
 "datasets": {
 "competency_scores": [
 {
 "competency_tag": "quiz 1",
 "competency_source": "proxy",
 "assessment_type": "quiz",
 "assessment_order": 1,
 "avg_score": 0,
 "pass_rate": 0,
 "assessment_count": 1
 },
 {
 "competency_tag": "exam 3",
 "competency_source": "proxy",
 "assessment_type": "exam",
 "assessment_order": 3,
 "avg_score": 55,
 "pass_rate": 1,
 "assessment_count": 1
 },
 {
 "competency_tag": "quiz 2",
 "competency_source": "proxy",
 "assessment_type": "quiz",
 "assessment_order": 2,
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
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-S05__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "987783f923cd65a1547ba324cd077aa9a275aa0097ee2a99ec17f5606e3b9c57",
 "generator_input_sha256": "ebe3752702defb9068cbaa6c1ff010a6a1c29c383af7dd58c1f05bafae338e95",
 "generator_input_compact": {
 "task_id": "A-S05",
 "execution_id": "exec_1781847238100_985413fe",
 "task_name": "Student competency gap",
 "analysis_type": "distribution",
 "explanation_strategy": "distribution",
 "actionable_question": "Where should we focus academic support for this student?",
 "target_audience": [
 "instructor",
 "academic_advisor"
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
 "raw_text": "Summary: The analysis reveals a significant gap in competency for the assessment 'quiz 1', which has an average score of 0. In contrast, 'exam 3' and 'quiz 2' both show higher average scores of 55, indicating a need for targeted support in the area of 'quiz 1'. This is one selected student's assessment evidence; the lowest returned competency tag is quiz 1 with exact avg_score=0, and assessment_count=1 is one assessment row, not a student count.\n\nInsights: Lowest Competency Area: The competency area 'quiz 1' has the lowest average score of 0, indicating a critical gap in understanding or knowledge recall for this assessment.\n\nEducational implications: Focus support on quiz 1 first because it is the lowest returned assessment proxy for this selected student.\n\nRecommendations: high - Implement knowledge recall support using flashcards for 'quiz 1'. - Flashcards can help reinforce foundational concepts and improve retention for the material assessed in 'quiz 1'.",
 "structured_payload": {
 "task_id": "A-S05",
 "execution_id": "exec_1781847238100_985413fe",
 "explanation": {
 "summary": "The analysis reveals a significant gap in competency for the assessment 'quiz 1', which has an average score of 0. In contrast, 'exam 3' and 'quiz 2' both show higher average scores of 55, indicating a need for targeted support in the area of 'quiz 1'. This is one selected student's assessment evidence; the lowest returned competency tag is quiz 1 with exact avg_score=0, and assessment_count=1 is one assessment row, not a student count.",
 "insights": [
 {
 "title": "Lowest Competency Area",
 "description": "The competency area 'quiz 1' has the lowest average score of 0, indicating a critical gap in understanding or knowledge recall for this assessment.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "This score indicates a complete lack of performance in this area."
 }
 ]
 }
 ],
 "educational_implications": [
 "Focus support on quiz 1 first because it is the lowest returned assessment proxy for this selected student."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement knowledge recall support using flashcards for 'quiz 1'.",
 "rationale": "Flashcards can help reinforce foundational concepts and improve retention for the material assessed in 'quiz 1'."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is derived from a structured dataset with clear metrics, although it lacks a comprehensive competency ontology.",
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
 "baseline_reference_tokens": 134,
 "task_aware_prompt_tokens": 833,
 "token_ratio": 6.2164,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.tie_warnings",
 "primary_finding.bottom_items"
 ],
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples.",
 "This is one selected student's assessment evidence. Never convert assessment_count or pass_rate into a claim about multiple students or the cohort.",
 "Name the lowest competency tag, its exact avg_score, and the configured support type."
 ],
 "must_keep_keys": [
 "dataset_name",
 "entity_column",
 "flag_evidence",
 "metric_column",
 "metric_stats",
 "row_count",
 "scope_evidence",
 "sort_direction",
 "summarization_warnings",
 "top_items"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.2164 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "ranking",
 "task_id": "A-S05",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples.",
 "This is one selected student's assessment evidence. Never convert assessment_count or pass_rate into a claim about multiple students or the cohort.",
 "Name the lowest competency tag, its exact avg_score, and the configured support type."
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
 "competency_tag": "quiz 1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz",
 "assessment_order": 1
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "exam 3",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "exam",
 "assessment_order": 3
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "quiz 2",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "quiz",
 "assessment_order": 2
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "median_item": {
 "competency_tag": "exam 3",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "exam",
 "assessment_order": 3
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 "scope_evidence": {
 "scope": "one selected student",
 "student_id": null,
 "assessment_count_semantics": "count of assessment rows for the selected student, not student count"
 }
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
 "flag_evidence": []
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
 "competency_tag": "quiz 1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz",
 "assessment_order": 1
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "exam 3",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "exam",
 "assessment_order": 3
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "quiz 2",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "quiz",
 "assessment_order": 2
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "bottom_items": [
 {
 "competency_tag": "quiz 1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz",
 "assessment_order": 1
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "exam 3",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "exam",
 "assessment_order": 3
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "quiz 2",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "quiz",
 "assessment_order": 2
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "median_item": {
 "competency_tag": "exam 3",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "exam",
 "assessment_order": 3
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
 ],
 "scope_evidence": {
 "scope": "one selected student",
 "student_id": null,
 "assessment_count_semantics": "count of assessment rows for the selected student, not student count"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4960,
 "token_usage": {
 "prompt_tokens": 1453,
 "completion_tokens": 337,
 "total_tokens": 1790
 },
 "strategy": "distribution",
 "granularity": "per_assessment",
 "cost_usd": 0.00042
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-S05__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "987783f923cd65a1547ba324cd077aa9a275aa0097ee2a99ec17f5606e3b9c57",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1453,
 "completion_tokens": 337,
 "total_tokens": 1790
 },
 "latency_ms": 5088,
 "attempts_used": 2
 },
 "source_response_body": {
 "task_id": "A-S05",
 "execution_id": "exec_1781847238100_985413fe",
 "explanation": {
 "summary": "The analysis reveals a significant gap in competency for the assessment 'quiz 1', which has an average score of 0. In contrast, 'exam 3' and 'quiz 2' both show higher average scores of 55, indicating a need for targeted support in the area of 'quiz 1'. This is one selected student's assessment evidence; the lowest returned competency tag is quiz 1 with exact avg_score=0, and assessment_count=1 is one assessment row, not a student count.",
 "insights": [
 {
 "title": "Lowest Competency Area",
 "description": "The competency area 'quiz 1' has the lowest average score of 0, indicating a critical gap in understanding or knowledge recall for this assessment.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "This score indicates a complete lack of performance in this area."
 }
 ]
 }
 ],
 "educational_implications": [
 "Focus support on quiz 1 first because it is the lowest returned assessment proxy for this selected student."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement knowledge recall support using flashcards for 'quiz 1'.",
 "rationale": "Flashcards can help reinforce foundational concepts and improve retention for the material assessed in 'quiz 1'."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is derived from a structured dataset with clear metrics, although it lacks a comprehensive competency ontology.",
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
 "baseline_reference_tokens": 134,
 "task_aware_prompt_tokens": 833,
 "token_ratio": 6.2164,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.tie_warnings",
 "primary_finding.bottom_items"
 ],
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples.",
 "This is one selected student's assessment evidence. Never convert assessment_count or pass_rate into a claim about multiple students or the cohort.",
 "Name the lowest competency tag, its exact avg_score, and the configured support type."
 ],
 "must_keep_keys": [
 "dataset_name",
 "entity_column",
 "flag_evidence",
 "metric_column",
 "metric_stats",
 "row_count",
 "scope_evidence",
 "sort_direction",
 "summarization_warnings",
 "top_items"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.2164 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "ranking",
 "task_id": "A-S05",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples.",
 "This is one selected student's assessment evidence. Never convert assessment_count or pass_rate into a claim about multiple students or the cohort.",
 "Name the lowest competency tag, its exact avg_score, and the configured support type."
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
 "competency_tag": "quiz 1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz",
 "assessment_order": 1
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "exam 3",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "exam",
 "assessment_order": 3
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "quiz 2",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "quiz",
 "assessment_order": 2
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "median_item": {
 "competency_tag": "exam 3",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "exam",
 "assessment_order": 3
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 "scope_evidence": {
 "scope": "one selected student",
 "student_id": null,
 "assessment_count_semantics": "count of assessment rows for the selected student, not student count"
 }
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
 "flag_evidence": []
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
 "competency_tag": "quiz 1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz",
 "assessment_order": 1
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "exam 3",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "exam",
 "assessment_order": 3
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "quiz 2",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "quiz",
 "assessment_order": 2
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "bottom_items": [
 {
 "competency_tag": "quiz 1",
 "avg_score": 0,
 "rank": 1,
 "labels": {
 "assessment_type": "quiz",
 "assessment_order": 1
 },
 "secondary_metrics": {
 "pass_rate": 0,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "exam 3",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "exam",
 "assessment_order": 3
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 },
 {
 "competency_tag": "quiz 2",
 "avg_score": 55,
 "rank": 3,
 "labels": {
 "assessment_type": "quiz",
 "assessment_order": 2
 },
 "secondary_metrics": {
 "pass_rate": 1,
 "assessment_count": 1
 }
 }
 ],
 "median_item": {
 "competency_tag": "exam 3",
 "avg_score": 55,
 "rank": 2,
 "labels": {
 "assessment_type": "exam",
 "assessment_order": 3
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
 ],
 "scope_evidence": {
 "scope": "one selected student",
 "student_id": null,
 "assessment_count_semantics": "count of assessment rows for the selected student, not student count"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4960,
 "token_usage": {
 "prompt_tokens": 1453,
 "completion_tokens": 337,
 "total_tokens": 1790
 },
 "strategy": "distribution",
 "granularity": "per_assessment",
 "cost_usd": 0.00042
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
 "observed": "f3b8cd55949300246cc6a7569e855c53e85ef1e24ea83aaee117d4efda1e410c",
 "expected_values": [
 "f3b8cd55949300246cc6a7569e855c53e85ef1e24ea83aaee117d4efda1e410c"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "e88796ba4c40e4cf5adc854816ed25ecc8523aee6a1cf626f48f3545f2bb2ed3",
 "expected": "e88796ba4c40e4cf5adc854816ed25ecc8523aee6a1cf626f48f3545f2bb2ed3"
 },
 {
 "check_id": "numeric_fields_competency_scores",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "competency_scores",
 "numeric_columns": [
 "assessment_count",
 "assessment_order",
 "avg_score",
 "pass_rate"
 ],
 "numeric_summaries": {
 "assessment_count": {
 "count": 3,
 "min": 1,
 "max": 1
 },
 "assessment_order": {
 "count": 3,
 "min": 1,
 "max": 3
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
