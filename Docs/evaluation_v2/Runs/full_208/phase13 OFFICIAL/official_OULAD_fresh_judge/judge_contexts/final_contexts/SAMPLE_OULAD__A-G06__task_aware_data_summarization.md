# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G06__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-G06__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G06",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Activity type effectiveness",
 "scope": "Many students",
 "actionable_question": "Which learning activities should the admin encourage students to use more?",
 "target_audience": "instructor",
 "ai_summary_type": "ranking",
 "ai_prompt_hint": "Highlight which resource types are most associated with higher scores. Recommend admin to promote those.",
 "query_labels": [
 "activity_effectiveness"
 ],
 "explanation_strategy": "correlation"
}
```

## Schema Context

```json
{
 "source_tables": [
 "enrollment",
 "engagement",
 "event",
 "assessment_result",
 "assessment [OULAD only]"
 ],
 "key_db_fields": [
 "resource_type",
 "engagement_count; avg_score [FE cross] by resource_type"
 ],
 "output_schema": {},
 "query_labels": [
 "activity_effectiveness"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-G06-CORE-01",
 "description": "Highlight which resource types are most associated with higher scores."
 },
 {
 "requirement_id": "A-G06-CORE-02",
 "description": "Recommend admin to promote those."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-G06-CONSTRAINT-01",
 "description": "Frame resource-score relationships as correlational; do not claim that a resource type causes score improvement."
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
 "dataset_label": "activity_effectiveness",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G06.json",
 "artifact_sha256": "77b3d181b059748f1bb14da1c28ba0bcecdd4ca56c19c9a9a8ce9df4eb3c2d58",
 "row_count": 9,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 9,
 "prompt_embedded_row_count": 9,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "77b3d181b059748f1bb14da1c28ba0bcecdd4ca56c19c9a9a8ce9df4eb3c2d58",
 "evidence_rows_sha256": "821e4f01592c61ca544e348bc20a9fd0129587c3407399a8be1dd965cd600096",
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
 "full_result_row_count": 9,
 "embedded_datasets_sha256": "821e4f01592c61ca544e348bc20a9fd0129587c3407399a8be1dd965cd600096",
 "datasets": {
 "activity_effectiveness": [
 {
 "resource_type": "page",
 "avg_score_by_resource_type": "78.9",
 "student_count": 832
 },
 {
 "resource_type": "oucollaborate",
 "avg_score_by_resource_type": "74.67",
 "student_count": 733
 },
 {
 "resource_type": "oucontent",
 "avg_score_by_resource_type": "71.46",
 "student_count": 1778
 },
 {
 "resource_type": "url",
 "avg_score_by_resource_type": "71.04",
 "student_count": 1875
 },
 {
 "resource_type": "forumng",
 "avg_score_by_resource_type": "70.98",
 "student_count": 1791
 },
 {
 "resource_type": "resource",
 "avg_score_by_resource_type": "70.3",
 "student_count": 1983
 },
 {
 "resource_type": "quiz",
 "avg_score_by_resource_type": "70.28",
 "student_count": 1982
 },
 {
 "resource_type": "homepage",
 "avg_score_by_resource_type": "70.22",
 "student_count": 1995
 },
 {
 "resource_type": "subpage",
 "avg_score_by_resource_type": "70.22",
 "student_count": 1989
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G06__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "e7b468bebf4eaea2d02a8e29a877645c03371a2bd7a54a94d4be69a9fde9d4a0",
 "generator_input_sha256": "e6031647032b6b03d5f323dfbfae7a57d88305d883287fe4b1fc294c015cb770",
 "generator_input_compact": {
 "task_id": "A-G06",
 "execution_id": "exec_1781847724775_88de8ddc",
 "task_name": "Activity type effectiveness",
 "analysis_type": "correlation",
 "explanation_strategy": "correlation",
 "actionable_question": "Which learning activities should the admin encourage students to use more?",
 "target_audience": [
 "instructor"
 ],
 "query_labels": [
 "activity_effectiveness"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "activity_effectiveness"
 ],
 "dataset_row_counts": {
 "activity_effectiveness": 9
 },
 "ai_summary_config_summary": {
 "summary_type": "ranking",
 "metric_column": "avg_score_by_resource_type",
 "entity_column": "resource_type",
 "group_column": null,
 "time_column": null,
 "sort_by": null,
 "sort_direction": "desc",
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
 "raw_text": "Summary: The analysis reveals a moderate positive correlation between Resource Type and Avg Score of Users, indicating that certain resource types are associated with higher average scores. Specifically, the 'page' resource type stands out as the most effective, suggesting that its use should be encouraged among students.\n\nInsights: Top Resource Type Effectiveness: The 'page' resource type has the highest average score of 78.9, significantly outperforming other resource types. This suggests that students engage more effectively with content presented in this format. | Moderate Performance of Collaborative Tools: The 'oucollaborate' resource type, with an average score of 74.67, indicates that collaborative tools are also effective but not as much as pages. This suggests a potential area for further development and encouragement.\n\nEducational implications: Encouraging the use of resource types that yield higher average scores can enhance overall student performance.\n\nRecommendations: high - Promote the use of 'page' resource types in course materials. - Given its high average score, increasing the use of pages can lead to improved student engagement and performance. | medium - Encourage the integration of 'oucollaborate' resources in learning activities. - While effective, there is room for improvement in collaborative tools, which can foster better student interaction and learning outcomes.",
 "structured_payload": {
 "task_id": "A-G06",
 "execution_id": "exec_1781847724775_88de8ddc",
 "explanation": {
 "summary": "The analysis reveals a moderate positive correlation between Resource Type and Avg Score of Users, indicating that certain resource types are associated with higher average scores. Specifically, the 'page' resource type stands out as the most effective, suggesting that its use should be encouraged among students.",
 "insights": [
 {
 "title": "Top Resource Type Effectiveness",
 "description": "The 'page' resource type has the highest average score of 78.9, significantly outperforming other resource types. This suggests that students engage more effectively with content presented in this format.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score_by_resource_type",
 "value": 78.9,
 "comparison": "peak",
 "delta": null,
 "context": "Highest average score among resource types"
 }
 ]
 },
 {
 "title": "Moderate Performance of Collaborative Tools",
 "description": "The 'oucollaborate' resource type, with an average score of 74.67, indicates that collaborative tools are also effective but not as much as pages. This suggests a potential area for further development and encouragement.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "avg_score_by_resource_type",
 "value": 74.67,
 "comparison": "down_from_previous",
 "delta": -4.23,
 "context": "Second highest average score"
 }
 ]
 }
 ],
 "educational_implications": [
 "Encouraging the use of resource types that yield higher average scores can enhance overall student performance."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Promote the use of 'page' resource types in course materials.",
 "rationale": "Given its high average score, increasing the use of pages can lead to improved student engagement and performance."
 },
 {
 "priority": "medium",
 "action": "Encourage the integration of 'oucollaborate' resources in learning activities.",
 "rationale": "While effective, there is room for improvement in collaborative tools, which can foster better student interaction and learning outcomes."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is derived from a comprehensive dataset with clear metrics and consistent definitions.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "correlation",
 "explanation_type": "correlation",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "ranking",
 "ai_summary_method_warning": null,
 "full_result_row_count": 9,
 "included_row_count": 9,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "activity_effectiveness",
 "row_count": 9,
 "included_row_count": 9
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 9,
 "baseline_reference_tokens": 258,
 "task_aware_prompt_tokens": 882,
 "token_ratio": 3.4186,
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.4186 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "ranking",
 "task_id": "A-G06",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "activity_effectiveness",
 "row_count": 9,
 "entity_column": "resource_type",
 "metric_column": "avg_score_by_resource_type",
 "sort_direction": "desc"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "top_items": [
 {
 "resource_type": "page",
 "avg_score_by_resource_type": 78.9,
 "rank": 1,
 "secondary_metrics": {
 "student_count": 832
 }
 },
 {
 "resource_type": "oucollaborate",
 "avg_score_by_resource_type": 74.67,
 "rank": 2,
 "secondary_metrics": {
 "student_count": 733
 }
 },
 {
 "resource_type": "oucontent",
 "avg_score_by_resource_type": 71.46,
 "rank": 3,
 "secondary_metrics": {
 "student_count": 1778
 }
 },
 {
 "resource_type": "url",
 "avg_score_by_resource_type": 71.04,
 "rank": 4,
 "secondary_metrics": {
 "student_count": 1875
 }
 },
 {
 "resource_type": "forumng",
 "avg_score_by_resource_type": 70.98,
 "rank": 5,
 "secondary_metrics": {
 "student_count": 1791
 }
 }
 ],
 "median_item": {
 "resource_type": "forumng",
 "avg_score_by_resource_type": 70.98,
 "rank": 5,
 "secondary_metrics": {
 "student_count": 1791
 }
 },
 "bottom_items": [
 {
 "resource_type": "quiz",
 "avg_score_by_resource_type": 70.28,
 "rank": 7,
 "secondary_metrics": {
 "student_count": 1982
 }
 },
 {
 "resource_type": "homepage",
 "avg_score_by_resource_type": 70.22,
 "rank": 8,
 "secondary_metrics": {
 "student_count": 1995
 }
 },
 {
 "resource_type": "subpage",
 "avg_score_by_resource_type": 70.22,
 "rank": 9,
 "secondary_metrics": {
 "student_count": 1989
 }
 }
 ]
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_stats": {
 "count": 9,
 "min": 70.22,
 "max": 78.9,
 "mean": 72.0078,
 "median": 70.98
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
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "ranking",
 "dataset_name": "activity_effectiveness",
 "row_count": 9,
 "entity_column": "resource_type",
 "metric_column": "avg_score_by_resource_type",
 "sort_direction": "desc",
 "top_items": [
 {
 "resource_type": "page",
 "avg_score_by_resource_type": 78.9,
 "rank": 1,
 "secondary_metrics": {
 "student_count": 832
 }
 },
 {
 "resource_type": "oucollaborate",
 "avg_score_by_resource_type": 74.67,
 "rank": 2,
 "secondary_metrics": {
 "student_count": 733
 }
 },
 {
 "resource_type": "oucontent",
 "avg_score_by_resource_type": 71.46,
 "rank": 3,
 "secondary_metrics": {
 "student_count": 1778
 }
 },
 {
 "resource_type": "url",
 "avg_score_by_resource_type": 71.04,
 "rank": 4,
 "secondary_metrics": {
 "student_count": 1875
 }
 },
 {
 "resource_type": "forumng",
 "avg_score_by_resource_type": 70.98,
 "rank": 5,
 "secondary_metrics": {
 "student_count": 1791
 }
 }
 ],
 "bottom_items": [
 {
 "resource_type": "quiz",
 "avg_score_by_resource_type": 70.28,
 "rank": 7,
 "secondary_metrics": {
 "student_count": 1982
 }
 },
 {
 "resource_type": "homepage",
 "avg_score_by_resource_type": 70.22,
 "rank": 8,
 "secondary_metrics": {
 "student_count": 1995
 }
 },
 {
 "resource_type": "subpage",
 "avg_score_by_resource_type": 70.22,
 "rank": 9,
 "secondary_metrics": {
 "student_count": 1989
 }
 }
 ],
 "median_item": {
 "resource_type": "forumng",
 "avg_score_by_resource_type": 70.98,
 "rank": 5,
 "secondary_metrics": {
 "student_count": 1791
 }
 },
 "metric_stats": {
 "count": 9,
 "min": 70.22,
 "max": 78.9,
 "mean": 72.0078,
 "median": 70.98
 },
 "tie_warnings": [],
 "flag_evidence": [],
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 7644,
 "token_usage": {
 "prompt_tokens": 1434,
 "completion_tokens": 525,
 "total_tokens": 1959
 },
 "strategy": "correlation",
 "granularity": "semester",
 "cost_usd": 0.00053
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G06__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "e7b468bebf4eaea2d02a8e29a877645c03371a2bd7a54a94d4be69a9fde9d4a0",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1434,
 "completion_tokens": 525,
 "total_tokens": 1959
 },
 "latency_ms": 7649,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-G06",
 "execution_id": "exec_1781847724775_88de8ddc",
 "explanation": {
 "summary": "The analysis reveals a moderate positive correlation between Resource Type and Avg Score of Users, indicating that certain resource types are associated with higher average scores. Specifically, the 'page' resource type stands out as the most effective, suggesting that its use should be encouraged among students.",
 "insights": [
 {
 "title": "Top Resource Type Effectiveness",
 "description": "The 'page' resource type has the highest average score of 78.9, significantly outperforming other resource types. This suggests that students engage more effectively with content presented in this format.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score_by_resource_type",
 "value": 78.9,
 "comparison": "peak",
 "delta": null,
 "context": "Highest average score among resource types"
 }
 ]
 },
 {
 "title": "Moderate Performance of Collaborative Tools",
 "description": "The 'oucollaborate' resource type, with an average score of 74.67, indicates that collaborative tools are also effective but not as much as pages. This suggests a potential area for further development and encouragement.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "avg_score_by_resource_type",
 "value": 74.67,
 "comparison": "down_from_previous",
 "delta": -4.23,
 "context": "Second highest average score"
 }
 ]
 }
 ],
 "educational_implications": [
 "Encouraging the use of resource types that yield higher average scores can enhance overall student performance."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Promote the use of 'page' resource types in course materials.",
 "rationale": "Given its high average score, increasing the use of pages can lead to improved student engagement and performance."
 },
 {
 "priority": "medium",
 "action": "Encourage the integration of 'oucollaborate' resources in learning activities.",
 "rationale": "While effective, there is room for improvement in collaborative tools, which can foster better student interaction and learning outcomes."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is derived from a comprehensive dataset with clear metrics and consistent definitions.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "correlation",
 "explanation_type": "correlation",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "ranking",
 "ai_summary_method_warning": null,
 "full_result_row_count": 9,
 "included_row_count": 9,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "activity_effectiveness",
 "row_count": 9,
 "included_row_count": 9
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 9,
 "baseline_reference_tokens": 258,
 "task_aware_prompt_tokens": 882,
 "token_ratio": 3.4186,
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.4186 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "ranking",
 "task_id": "A-G06",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "activity_effectiveness",
 "row_count": 9,
 "entity_column": "resource_type",
 "metric_column": "avg_score_by_resource_type",
 "sort_direction": "desc"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "top_items": [
 {
 "resource_type": "page",
 "avg_score_by_resource_type": 78.9,
 "rank": 1,
 "secondary_metrics": {
 "student_count": 832
 }
 },
 {
 "resource_type": "oucollaborate",
 "avg_score_by_resource_type": 74.67,
 "rank": 2,
 "secondary_metrics": {
 "student_count": 733
 }
 },
 {
 "resource_type": "oucontent",
 "avg_score_by_resource_type": 71.46,
 "rank": 3,
 "secondary_metrics": {
 "student_count": 1778
 }
 },
 {
 "resource_type": "url",
 "avg_score_by_resource_type": 71.04,
 "rank": 4,
 "secondary_metrics": {
 "student_count": 1875
 }
 },
 {
 "resource_type": "forumng",
 "avg_score_by_resource_type": 70.98,
 "rank": 5,
 "secondary_metrics": {
 "student_count": 1791
 }
 }
 ],
 "median_item": {
 "resource_type": "forumng",
 "avg_score_by_resource_type": 70.98,
 "rank": 5,
 "secondary_metrics": {
 "student_count": 1791
 }
 },
 "bottom_items": [
 {
 "resource_type": "quiz",
 "avg_score_by_resource_type": 70.28,
 "rank": 7,
 "secondary_metrics": {
 "student_count": 1982
 }
 },
 {
 "resource_type": "homepage",
 "avg_score_by_resource_type": 70.22,
 "rank": 8,
 "secondary_metrics": {
 "student_count": 1995
 }
 },
 {
 "resource_type": "subpage",
 "avg_score_by_resource_type": 70.22,
 "rank": 9,
 "secondary_metrics": {
 "student_count": 1989
 }
 }
 ]
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_stats": {
 "count": 9,
 "min": 70.22,
 "max": 78.9,
 "mean": 72.0078,
 "median": 70.98
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
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "ranking",
 "dataset_name": "activity_effectiveness",
 "row_count": 9,
 "entity_column": "resource_type",
 "metric_column": "avg_score_by_resource_type",
 "sort_direction": "desc",
 "top_items": [
 {
 "resource_type": "page",
 "avg_score_by_resource_type": 78.9,
 "rank": 1,
 "secondary_metrics": {
 "student_count": 832
 }
 },
 {
 "resource_type": "oucollaborate",
 "avg_score_by_resource_type": 74.67,
 "rank": 2,
 "secondary_metrics": {
 "student_count": 733
 }
 },
 {
 "resource_type": "oucontent",
 "avg_score_by_resource_type": 71.46,
 "rank": 3,
 "secondary_metrics": {
 "student_count": 1778
 }
 },
 {
 "resource_type": "url",
 "avg_score_by_resource_type": 71.04,
 "rank": 4,
 "secondary_metrics": {
 "student_count": 1875
 }
 },
 {
 "resource_type": "forumng",
 "avg_score_by_resource_type": 70.98,
 "rank": 5,
 "secondary_metrics": {
 "student_count": 1791
 }
 }
 ],
 "bottom_items": [
 {
 "resource_type": "quiz",
 "avg_score_by_resource_type": 70.28,
 "rank": 7,
 "secondary_metrics": {
 "student_count": 1982
 }
 },
 {
 "resource_type": "homepage",
 "avg_score_by_resource_type": 70.22,
 "rank": 8,
 "secondary_metrics": {
 "student_count": 1995
 }
 },
 {
 "resource_type": "subpage",
 "avg_score_by_resource_type": 70.22,
 "rank": 9,
 "secondary_metrics": {
 "student_count": 1989
 }
 }
 ],
 "median_item": {
 "resource_type": "forumng",
 "avg_score_by_resource_type": 70.98,
 "rank": 5,
 "secondary_metrics": {
 "student_count": 1791
 }
 },
 "metric_stats": {
 "count": 9,
 "min": 70.22,
 "max": 78.9,
 "mean": 72.0078,
 "median": 70.98
 },
 "tie_warnings": [],
 "flag_evidence": [],
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 7644,
 "token_usage": {
 "prompt_tokens": 1434,
 "completion_tokens": 525,
 "total_tokens": 1959
 },
 "strategy": "correlation",
 "granularity": "semester",
 "cost_usd": 0.00053
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
 "expected": 9,
 "observed": 9
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "77b3d181b059748f1bb14da1c28ba0bcecdd4ca56c19c9a9a8ce9df4eb3c2d58",
 "expected_values": [
 "77b3d181b059748f1bb14da1c28ba0bcecdd4ca56c19c9a9a8ce9df4eb3c2d58"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "821e4f01592c61ca544e348bc20a9fd0129587c3407399a8be1dd965cd600096",
 "expected": "821e4f01592c61ca544e348bc20a9fd0129587c3407399a8be1dd965cd600096"
 },
 {
 "check_id": "numeric_fields_activity_effectiveness",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "activity_effectiveness",
 "numeric_columns": [
 "student_count"
 ],
 "numeric_summaries": {
 "student_count": {
 "count": 9,
 "min": 733,
 "max": 1995
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_activity_effectiveness",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "activity_effectiveness",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```
