# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S05__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-S05__baseline_first_20_rows",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-S05",
 "explanation_mode": "baseline_first_20_rows",
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
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-S05.json",
 "artifact_sha256": "98820d7baef1572816957689e8c1bf58e4d4e393b81b76bbe91ab7ca0268d708",
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
 "evidence_artifact_file_sha256": "98820d7baef1572816957689e8c1bf58e4d4e393b81b76bbe91ab7ca0268d708",
 "evidence_rows_sha256": "8b79aab1afacb37f018185f2928c64710e6078b06766c18c1af856ae2e860933",
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
 "embedded_datasets_sha256": "8b79aab1afacb37f018185f2928c64710e6078b06766c18c1af856ae2e860933",
 "datasets": {
 "competency_scores": [
 {
 "competency_tag": "CMA 8",
 "competency_source": "proxy",
 "assessment_type": "CMA",
 "assessment_order": 8,
 "avg_score": 83,
 "pass_rate": 1,
 "assessment_count": 1
 },
 {
 "competency_tag": "CMA 3",
 "competency_source": "proxy",
 "assessment_type": "CMA",
 "assessment_order": 3,
 "avg_score": 87,
 "pass_rate": 1,
 "assessment_count": 1
 },
 {
 "competency_tag": "CMA 5",
 "competency_source": "proxy",
 "assessment_type": "CMA",
 "assessment_order": 5,
 "avg_score": 90,
 "pass_rate": 1,
 "assessment_count": 1
 },
 {
 "competency_tag": "Exam 9",
 "competency_source": "proxy",
 "assessment_type": "Exam",
 "assessment_order": 9,
 "avg_score": 96,
 "pass_rate": 1,
 "assessment_count": 1
 },
 {
 "competency_tag": "CMA 1",
 "competency_source": "proxy",
 "assessment_type": "CMA",
 "assessment_order": 1,
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
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S05__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "d1ac3f13e3973263e7f7d35500e2f369c285cab652725a8012a4db7b7805b8e8",
 "generator_input_sha256": "9e2d3db36b0f1f3316a74c1583e971ad86cb094ef385cd5a36a1cb1a5a9d5d1c",
 "generator_input_compact": {
 "task_id": "A-S05",
 "execution_id": "exec_1781847835574_682b0027",
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
 "raw_text": "Summary: The distribution of average scores across the competency tags indicates a strong overall performance, with most students achieving scores above 80. However, there are notable gaps in the lower scoring areas, particularly in CMA 3 and CMA 8, which may require targeted academic support.\n\nInsights: Lower Average Scores in CMA 3 and CMA 8: CMA 3 and CMA 8 have the lowest average scores of 87 and 83, respectively, indicating these areas may need additional focus for student improvement.\n\nEducational implications: Students may benefit from additional support in CMA 3 and CMA 8 to enhance their understanding and performance.\n\nRecommendations: high - Implement knowledge recall strategies such as flashcards for CMA 3 and CMA 8. - Flashcards can help reinforce key concepts and improve retention, addressing the identified gaps in these competency areas.",
 "structured_payload": {
 "task_id": "A-S05",
 "execution_id": "exec_1781847835574_682b0027",
 "explanation": {
 "summary": "The distribution of average scores across the competency tags indicates a strong overall performance, with most students achieving scores above 80. However, there are notable gaps in the lower scoring areas, particularly in CMA 3 and CMA 8, which may require targeted academic support.",
 "insights": [
 {
 "title": "Lower Average Scores in CMA 3 and CMA 8",
 "description": "CMA 3 and CMA 8 have the lowest average scores of 87 and 83, respectively, indicating these areas may need additional focus for student improvement.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 87,
 "comparison": "down_from_previous",
 "delta": -3,
 "context": "CMA 3 compared to CMA 5"
 },
 {
 "metric": "avg_score",
 "value": 83,
 "comparison": "down_from_previous",
 "delta": -4,
 "context": "CMA 8 compared to CMA 5"
 }
 ]
 }
 ],
 "educational_implications": [
 "Students may benefit from additional support in CMA 3 and CMA 8 to enhance their understanding and performance."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement knowledge recall strategies such as flashcards for CMA 3 and CMA 8.",
 "rationale": "Flashcards can help reinforce key concepts and improve retention, addressing the identified gaps in these competency areas."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The dataset is complete and provides clear average scores for each competency area.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
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
 "latency_ms": 6525,
 "token_usage": {
 "prompt_tokens": 895,
 "completion_tokens": 388,
 "total_tokens": 1283
 },
 "strategy": "distribution",
 "granularity": "per_assessment",
 "cost_usd": 0.000367
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S05__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "d1ac3f13e3973263e7f7d35500e2f369c285cab652725a8012a4db7b7805b8e8",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "baseline_first_20_rows",
 "observed_ai_summary_method": "baseline_first_20_rows",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 895,
 "completion_tokens": 388,
 "total_tokens": 1283
 },
 "latency_ms": 6539,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-S05",
 "execution_id": "exec_1781847835574_682b0027",
 "explanation": {
 "summary": "The distribution of average scores across the competency tags indicates a strong overall performance, with most students achieving scores above 80. However, there are notable gaps in the lower scoring areas, particularly in CMA 3 and CMA 8, which may require targeted academic support.",
 "insights": [
 {
 "title": "Lower Average Scores in CMA 3 and CMA 8",
 "description": "CMA 3 and CMA 8 have the lowest average scores of 87 and 83, respectively, indicating these areas may need additional focus for student improvement.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 87,
 "comparison": "down_from_previous",
 "delta": -3,
 "context": "CMA 3 compared to CMA 5"
 },
 {
 "metric": "avg_score",
 "value": 83,
 "comparison": "down_from_previous",
 "delta": -4,
 "context": "CMA 8 compared to CMA 5"
 }
 ]
 }
 ],
 "educational_implications": [
 "Students may benefit from additional support in CMA 3 and CMA 8 to enhance their understanding and performance."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement knowledge recall strategies such as flashcards for CMA 3 and CMA 8.",
 "rationale": "Flashcards can help reinforce key concepts and improve retention, addressing the identified gaps in these competency areas."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The dataset is complete and provides clear average scores for each competency area.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
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
 "latency_ms": 6525,
 "token_usage": {
 "prompt_tokens": 895,
 "completion_tokens": 388,
 "total_tokens": 1283
 },
 "strategy": "distribution",
 "granularity": "per_assessment",
 "cost_usd": 0.000367
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
 "observed": "98820d7baef1572816957689e8c1bf58e4d4e393b81b76bbe91ab7ca0268d708",
 "expected_values": [
 "98820d7baef1572816957689e8c1bf58e4d4e393b81b76bbe91ab7ca0268d708"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "8b79aab1afacb37f018185f2928c64710e6078b06766c18c1af856ae2e860933",
 "expected": "8b79aab1afacb37f018185f2928c64710e6078b06766c18c1af856ae2e860933"
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
 "count": 5,
 "min": 1,
 "max": 1
 },
 "assessment_order": {
 "count": 5,
 "min": 1,
 "max": 9
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
