# LLM Judge Final Judge Context - SAMPLE_OULAD__A-C06__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-C06__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-C06",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Compare resource usage",
 "scope": "2 students",
 "actionable_question": "Is one student using resources more strategically than the other?",
 "target_audience": "instructor",
 "ai_summary_type": "multi_metric_comparison",
 "ai_prompt_hint": "Highlight who is more diversified in resource use. Note if one avoids forums/quizzes.",
 "query_labels": [
 "resource_comparison"
 ],
 "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
 "source_tables": [
 "enrollment",
 "engagement",
 "event [OULAD only]"
 ],
 "key_db_fields": [
 "resource_type",
 "engagement_count; vle_diversity_score [FE cross]",
 "forum_engagement_rate [FE cross]",
 "quiz_engagement_rate [FE cross]"
 ],
 "output_schema": {},
 "query_labels": [
 "resource_comparison"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-C06-CORE-01",
 "description": "Highlight who is more diversified in resource use."
 },
 {
 "requirement_id": "A-C06-CORE-02",
 "description": "Note if one avoids forums/quizzes."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Retained as applicable because it compares two identifiable students; risk is lower than lifestyle/background tasks but not absent."
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
 "dataset_label": "resource_comparison",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C06.json",
 "artifact_sha256": "4e437a4bf0a93b5080d2cf66ff3b46aa17062f7dbcfe5ea43f8c67fcee3d6a6c",
 "row_count": 10,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 10,
 "prompt_embedded_row_count": 10,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "4e437a4bf0a93b5080d2cf66ff3b46aa17062f7dbcfe5ea43f8c67fcee3d6a6c",
 "evidence_rows_sha256": "2cc1c9fd65637a8e736332409cfa269b820c3194d7ff4ddfa154e0a04babae61",
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
 "full_result_row_count": 10,
 "embedded_datasets_sha256": "2cc1c9fd65637a8e736332409cfa269b820c3194d7ff4ddfa154e0a04babae61",
 "datasets": {
 "resource_comparison": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "quiz",
 "clicks": 623,
 "pct_of_total": 0.4940523394131642,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "homepage",
 "clicks": 264,
 "pct_of_total": 0.20935765265662173,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "forumng",
 "clicks": 140,
 "pct_of_total": 0.11102299762093576,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "subpage",
 "clicks": 94,
 "pct_of_total": 0.07454401268834258,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "resource",
 "clicks": 71,
 "pct_of_total": 0.056304520222045996,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "oucontent",
 "clicks": 40,
 "pct_of_total": 0.0317208564631245,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "url",
 "clicks": 27,
 "pct_of_total": 0.02141157811260904,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "oucollaborate",
 "clicks": 1,
 "pct_of_total": 0.0007930214115781126,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "page",
 "clicks": 1,
 "pct_of_total": 0.0007930214115781126,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "resource_type": null,
 "clicks": 0,
 "pct_of_total": null,
 "vle_diversity_score": 0,
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-C06__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "54e2a613cbd9986f8ac69f3a9e67744dc3d2cd4db4de132b06a86fc857a8ca26",
 "generator_input_sha256": "e413db92aef3d5bdc115bc7d53565406258ce8a6c651f2ee7c205ad5e908d3d6",
 "generator_input_compact": {
 "task_id": "A-C06",
 "execution_id": "exec_1781847669794_e794bcab",
 "task_name": "Compare resource usage",
 "analysis_type": "comparison",
 "explanation_strategy": "comparison",
 "actionable_question": "Is one student using resources more strategically than the other?",
 "target_audience": [
 "instructor"
 ],
 "query_labels": [
 "resource_comparison"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "resource_comparison"
 ],
 "dataset_row_counts": {
 "resource_comparison": 10
 },
 "ai_summary_config_summary": {
 "summary_type": "multi_metric_comparison",
 "metric_column": null,
 "entity_column": "student_id",
 "group_column": null,
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
 "raw_text": "Summary: The analysis reveals a significant disparity in resource usage between the two students, with SAMPLE_OULAD_STU_100788 demonstrating a higher engagement across various resource types compared to SAMPLE_OULAD_STU_101700, who has no recorded resource usage. This indicates a lack of strategic resource utilization by the latter.\n\nInsights: High Engagement in Resource Usage: SAMPLE_OULAD_STU_100788 has recorded a total of 1261 clicks across multiple resource types, indicating a high level of engagement. In contrast, SAMPLE_OULAD_STU_101700 has zero clicks, reflecting no engagement with available resources. | Diversity in Resource Types Used: SAMPLE_OULAD_STU_100788 utilized 9 different resource types, showcasing a diverse approach to resource engagement. In contrast, SAMPLE_OULAD_STU_101700 has no recorded resource types used, indicating a lack of diversity in engagement.\n\nEducational implications: The lack of engagement from SAMPLE_OULAD_STU_101700 suggests a need for targeted interventions to encourage resource utilization.\n\nRecommendations: high - Implement engagement strategies for SAMPLE_OULAD_STU_101700, such as personalized communication or resource usage workshops. - To enhance resource engagement and improve academic performance.",
 "structured_payload": {
 "task_id": "A-C06",
 "execution_id": "exec_1781847669794_e794bcab",
 "explanation": {
 "summary": "The analysis reveals a significant disparity in resource usage between the two students, with SAMPLE_OULAD_STU_100788 demonstrating a higher engagement across various resource types compared to SAMPLE_OULAD_STU_101700, who has no recorded resource usage. This indicates a lack of strategic resource utilization by the latter.",
 "insights": [
 {
 "title": "High Engagement in Resource Usage",
 "description": "SAMPLE_OULAD_STU_100788 has recorded a total of 1261 clicks across multiple resource types, indicating a high level of engagement. In contrast, SAMPLE_OULAD_STU_101700 has zero clicks, reflecting no engagement with available resources.",
 "severity": "high",
 "evidence": [
 {
 "metric": "total_clicks",
 "value": 1261,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_100788"
 },
 {
 "metric": "total_clicks",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_101700"
 }
 ]
 },
 {
 "title": "Diversity in Resource Types Used",
 "description": "SAMPLE_OULAD_STU_100788 utilized 9 different resource types, showcasing a diverse approach to resource engagement. In contrast, SAMPLE_OULAD_STU_101700 has no recorded resource types used, indicating a lack of diversity in engagement.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "used_resource_types",
 "value": 9,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_100788"
 },
 {
 "metric": "used_resource_types",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_101700"
 }
 ]
 }
 ],
 "educational_implications": [
 "The lack of engagement from SAMPLE_OULAD_STU_101700 suggests a need for targeted interventions to encourage resource utilization."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement engagement strategies for SAMPLE_OULAD_STU_101700, such as personalized communication or resource usage workshops.",
 "rationale": "To enhance resource engagement and improve academic performance."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is sufficient, with clear metrics available for comparison.",
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
 "full_result_row_count": 10,
 "included_row_count": 10,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "resource_comparison",
 "row_count": 10,
 "included_row_count": 10
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 10,
 "baseline_reference_tokens": 774,
 "task_aware_prompt_tokens": 2737,
 "token_ratio": 3.5362,
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
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
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
 "summarization_warnings",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.5362 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C06",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "resource_comparison",
 "row_count": 10,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "entity_column": "student_id",
 "metrics": [
 {
 "metric": "clicks",
 "unit": "count",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "pct_of_total",
 "unit": "ratio_0_1",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "vle_diversity_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_more_diverse",
 "threshold": null
 }
 ],
 "metric_keys": [
 "quiz",
 "homepage",
 "forumng",
 "subpage",
 "resource",
 "oucontent",
 "url",
 "oucollaborate",
 "page"
 ],
 "metric_key_column": "resource_type",
 "metric_value_column": null,
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [],
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
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "quiz": {
 "clicks": 623,
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1
 },
 "homepage": {
 "clicks": 264,
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1
 },
 "forumng": {
 "clicks": 140,
 "pct_of_total": 0.111,
 "vle_diversity_score": 1
 },
 "subpage": {
 "clicks": 94,
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1
 },
 "resource": {
 "clicks": 71,
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1
 },
 "oucontent": {
 "clicks": 40,
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1
 },
 "url": {
 "clicks": 27,
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1
 },
 "oucollaborate": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 },
 "page": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 }
 },
 "labels": {
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {},
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
 "selected_entity_evidence": []
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [],
 "metric_extrema": {
 "quiz.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 }
 },
 "quiz.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 }
 },
 "quiz.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "homepage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 }
 },
 "homepage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 }
 },
 "homepage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "forumng.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 }
 },
 "forumng.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 }
 },
 "forumng.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "subpage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 }
 },
 "subpage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 }
 },
 "subpage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "resource.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 }
 },
 "resource.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 }
 },
 "resource.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucontent.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 }
 },
 "oucontent.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 }
 },
 "oucontent.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "url.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 }
 },
 "url.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 }
 },
 "url.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "oucollaborate.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "page.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_metric_evidence": [],
 "missing_entity_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "reason": "entity has no recorded source evidence for metric comparison",
 "evidence_column": "has_engagement_data",
 "evidence_value": false,
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
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
 "clicks": "count",
 "pct_of_total": "ratio_0_1",
 "vle_diversity_score": "ratio_0_1"
 },
 "metric_directions": {
 "clicks": "context_only",
 "pct_of_total": "context_only",
 "vle_diversity_score": "higher_is_more_diverse"
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
 "dataset_name": "resource_comparison",
 "row_count": 10,
 "entity_column": "student_id",
 "metric_key_column": "resource_type",
 "metric_value_column": null,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "metrics": [
 {
 "metric": "clicks",
 "unit": "count",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "pct_of_total",
 "unit": "ratio_0_1",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "vle_diversity_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_more_diverse",
 "threshold": null
 }
 ],
 "metric_keys": [
 "quiz",
 "homepage",
 "forumng",
 "subpage",
 "resource",
 "oucontent",
 "url",
 "oucollaborate",
 "page"
 ],
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "quiz": {
 "clicks": 623,
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1
 },
 "homepage": {
 "clicks": 264,
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1
 },
 "forumng": {
 "clicks": 140,
 "pct_of_total": 0.111,
 "vle_diversity_score": 1
 },
 "subpage": {
 "clicks": 94,
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1
 },
 "resource": {
 "clicks": 71,
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1
 },
 "oucontent": {
 "clicks": 40,
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1
 },
 "url": {
 "clicks": 27,
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1
 },
 "oucollaborate": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 },
 "page": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 }
 },
 "labels": {
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {},
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
 "metric_extrema": {
 "quiz.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 }
 },
 "quiz.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 }
 },
 "quiz.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "homepage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 }
 },
 "homepage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 }
 },
 "homepage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "forumng.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 }
 },
 "forumng.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 }
 },
 "forumng.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "subpage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 }
 },
 "subpage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 }
 },
 "subpage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "resource.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 }
 },
 "resource.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 }
 },
 "resource.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucontent.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 }
 },
 "oucontent.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 }
 },
 "oucontent.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "url.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 }
 },
 "url.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 }
 },
 "url.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "oucollaborate.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "page.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 }
 },
 "pairwise_gaps": [],
 "missing_metric_evidence": [],
 "missing_entity_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "reason": "entity has no recorded source evidence for metric comparison",
 "evidence_column": "has_engagement_data",
 "evidence_value": false,
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
 "missing_expected_entities": [],
 "selected_entity_evidence": [],
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [],
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
 "clicks": "count",
 "pct_of_total": "ratio_0_1",
 "vle_diversity_score": "ratio_0_1"
 },
 "metric_directions": {
 "clicks": "context_only",
 "pct_of_total": "context_only",
 "vle_diversity_score": "higher_is_more_diverse"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8917,
 "token_usage": {
 "prompt_tokens": 3996,
 "completion_tokens": 596,
 "total_tokens": 4592
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000957
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-C06__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "54e2a613cbd9986f8ac69f3a9e67744dc3d2cd4db4de132b06a86fc857a8ca26",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 3996,
 "completion_tokens": 596,
 "total_tokens": 4592
 },
 "latency_ms": 8924,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-C06",
 "execution_id": "exec_1781847669794_e794bcab",
 "explanation": {
 "summary": "The analysis reveals a significant disparity in resource usage between the two students, with SAMPLE_OULAD_STU_100788 demonstrating a higher engagement across various resource types compared to SAMPLE_OULAD_STU_101700, who has no recorded resource usage. This indicates a lack of strategic resource utilization by the latter.",
 "insights": [
 {
 "title": "High Engagement in Resource Usage",
 "description": "SAMPLE_OULAD_STU_100788 has recorded a total of 1261 clicks across multiple resource types, indicating a high level of engagement. In contrast, SAMPLE_OULAD_STU_101700 has zero clicks, reflecting no engagement with available resources.",
 "severity": "high",
 "evidence": [
 {
 "metric": "total_clicks",
 "value": 1261,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_100788"
 },
 {
 "metric": "total_clicks",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_101700"
 }
 ]
 },
 {
 "title": "Diversity in Resource Types Used",
 "description": "SAMPLE_OULAD_STU_100788 utilized 9 different resource types, showcasing a diverse approach to resource engagement. In contrast, SAMPLE_OULAD_STU_101700 has no recorded resource types used, indicating a lack of diversity in engagement.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "used_resource_types",
 "value": 9,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_100788"
 },
 {
 "metric": "used_resource_types",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_101700"
 }
 ]
 }
 ],
 "educational_implications": [
 "The lack of engagement from SAMPLE_OULAD_STU_101700 suggests a need for targeted interventions to encourage resource utilization."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement engagement strategies for SAMPLE_OULAD_STU_101700, such as personalized communication or resource usage workshops.",
 "rationale": "To enhance resource engagement and improve academic performance."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is sufficient, with clear metrics available for comparison.",
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
 "full_result_row_count": 10,
 "included_row_count": 10,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "resource_comparison",
 "row_count": 10,
 "included_row_count": 10
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 10,
 "baseline_reference_tokens": 774,
 "task_aware_prompt_tokens": 2737,
 "token_ratio": 3.5362,
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
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
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
 "summarization_warnings",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.5362 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C06",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "resource_comparison",
 "row_count": 10,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "entity_column": "student_id",
 "metrics": [
 {
 "metric": "clicks",
 "unit": "count",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "pct_of_total",
 "unit": "ratio_0_1",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "vle_diversity_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_more_diverse",
 "threshold": null
 }
 ],
 "metric_keys": [
 "quiz",
 "homepage",
 "forumng",
 "subpage",
 "resource",
 "oucontent",
 "url",
 "oucollaborate",
 "page"
 ],
 "metric_key_column": "resource_type",
 "metric_value_column": null,
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [],
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
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "quiz": {
 "clicks": 623,
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1
 },
 "homepage": {
 "clicks": 264,
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1
 },
 "forumng": {
 "clicks": 140,
 "pct_of_total": 0.111,
 "vle_diversity_score": 1
 },
 "subpage": {
 "clicks": 94,
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1
 },
 "resource": {
 "clicks": 71,
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1
 },
 "oucontent": {
 "clicks": 40,
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1
 },
 "url": {
 "clicks": 27,
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1
 },
 "oucollaborate": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 },
 "page": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 }
 },
 "labels": {
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {},
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
 "selected_entity_evidence": []
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [],
 "metric_extrema": {
 "quiz.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 }
 },
 "quiz.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 }
 },
 "quiz.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "homepage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 }
 },
 "homepage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 }
 },
 "homepage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "forumng.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 }
 },
 "forumng.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 }
 },
 "forumng.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "subpage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 }
 },
 "subpage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 }
 },
 "subpage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "resource.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 }
 },
 "resource.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 }
 },
 "resource.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucontent.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 }
 },
 "oucontent.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 }
 },
 "oucontent.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "url.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 }
 },
 "url.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 }
 },
 "url.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "oucollaborate.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "page.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_metric_evidence": [],
 "missing_entity_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "reason": "entity has no recorded source evidence for metric comparison",
 "evidence_column": "has_engagement_data",
 "evidence_value": false,
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
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
 "clicks": "count",
 "pct_of_total": "ratio_0_1",
 "vle_diversity_score": "ratio_0_1"
 },
 "metric_directions": {
 "clicks": "context_only",
 "pct_of_total": "context_only",
 "vle_diversity_score": "higher_is_more_diverse"
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
 "dataset_name": "resource_comparison",
 "row_count": 10,
 "entity_column": "student_id",
 "metric_key_column": "resource_type",
 "metric_value_column": null,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "metrics": [
 {
 "metric": "clicks",
 "unit": "count",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "pct_of_total",
 "unit": "ratio_0_1",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "vle_diversity_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_more_diverse",
 "threshold": null
 }
 ],
 "metric_keys": [
 "quiz",
 "homepage",
 "forumng",
 "subpage",
 "resource",
 "oucontent",
 "url",
 "oucollaborate",
 "page"
 ],
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "quiz": {
 "clicks": 623,
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1
 },
 "homepage": {
 "clicks": 264,
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1
 },
 "forumng": {
 "clicks": 140,
 "pct_of_total": 0.111,
 "vle_diversity_score": 1
 },
 "subpage": {
 "clicks": 94,
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1
 },
 "resource": {
 "clicks": 71,
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1
 },
 "oucontent": {
 "clicks": 40,
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1
 },
 "url": {
 "clicks": 27,
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1
 },
 "oucollaborate": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 },
 "page": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 }
 },
 "labels": {
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {},
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
 "metric_extrema": {
 "quiz.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 }
 },
 "quiz.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 }
 },
 "quiz.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "homepage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 }
 },
 "homepage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 }
 },
 "homepage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "forumng.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 }
 },
 "forumng.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 }
 },
 "forumng.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "subpage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 }
 },
 "subpage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 }
 },
 "subpage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "resource.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 }
 },
 "resource.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 }
 },
 "resource.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucontent.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 }
 },
 "oucontent.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 }
 },
 "oucontent.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "url.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 }
 },
 "url.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 }
 },
 "url.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "oucollaborate.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "page.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 }
 },
 "pairwise_gaps": [],
 "missing_metric_evidence": [],
 "missing_entity_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "reason": "entity has no recorded source evidence for metric comparison",
 "evidence_column": "has_engagement_data",
 "evidence_value": false,
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
 "missing_expected_entities": [],
 "selected_entity_evidence": [],
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [],
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
 "clicks": "count",
 "pct_of_total": "ratio_0_1",
 "vle_diversity_score": "ratio_0_1"
 },
 "metric_directions": {
 "clicks": "context_only",
 "pct_of_total": "context_only",
 "vle_diversity_score": "higher_is_more_diverse"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8917,
 "token_usage": {
 "prompt_tokens": 3996,
 "completion_tokens": 596,
 "total_tokens": 4592
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000957
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
 "expected": 10,
 "observed": 10
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "4e437a4bf0a93b5080d2cf66ff3b46aa17062f7dbcfe5ea43f8c67fcee3d6a6c",
 "expected_values": [
 "4e437a4bf0a93b5080d2cf66ff3b46aa17062f7dbcfe5ea43f8c67fcee3d6a6c"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "2cc1c9fd65637a8e736332409cfa269b820c3194d7ff4ddfa154e0a04babae61",
 "expected": "2cc1c9fd65637a8e736332409cfa269b820c3194d7ff4ddfa154e0a04babae61"
 },
 {
 "check_id": "numeric_fields_resource_comparison",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "resource_comparison",
 "numeric_columns": [
 "clicks",
 "total_clicks",
 "used_resource_types",
 "vle_diversity_score",
 "pct_of_total"
 ],
 "numeric_summaries": {
 "clicks": {
 "count": 10,
 "min": 0,
 "max": 623
 },
 "total_clicks": {
 "count": 10,
 "min": 0,
 "max": 1261
 },
 "used_resource_types": {
 "count": 10,
 "min": 0,
 "max": 9
 },
 "vle_diversity_score": {
 "count": 10,
 "min": 0,
 "max": 1
 },
 "pct_of_total": {
 "count": 9,
 "min": 0.0007930214115781126,
 "max": 0.4940523394131642
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_resource_comparison",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "resource_comparison",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```
