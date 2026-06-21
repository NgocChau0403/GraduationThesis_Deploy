# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T10__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__S-T10__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "S-T10",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Resource engagement breakdown",
 "scope": "1 student",
 "actionable_question": "Am I using the full range of learning resources available?",
 "target_audience": "student",
 "ai_summary_type": "categorical_distribution",
 "ai_prompt_hint": "Use vle_diversity_score [FE] to show breadth. Highlight under-used types (e.g. forum rarely used).",
 "query_labels": [
 "resource_usage"
 ],
 "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
 "source_tables": [
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
 "resource_usage"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "S-T10-CORE-01",
 "description": "State the student's resource usage breadth across available VLE types."
 },
 {
 "requirement_id": "S-T10-CORE-02",
 "description": "Identify under-used resource types when a comparison baseline is available."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "S-T10-CONSTRAINT-01",
 "description": "Use vle_diversity_score as the primary resource-breadth metric when returned."
 },
 {
 "constraint_id": "S-T10-CONSTRAINT-02",
 "description": "Do not label low usage of a resource type as disengagement when no comparison baseline is provided."
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
 "dataset_label": "resource_usage",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T10.json",
 "artifact_sha256": "d104cedb86d92fea4d41cb5fde5c359875144a7bb6d35e70d303cd08cd0a444c",
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
 "evidence_artifact_file_sha256": "d104cedb86d92fea4d41cb5fde5c359875144a7bb6d35e70d303cd08cd0a444c",
 "evidence_rows_sha256": "9ed8f0948e3c8a3e7f9310b189cd3996b477d344c961fdf90d5a115d1926a7ee",
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
 "embedded_datasets_sha256": "9ed8f0948e3c8a3e7f9310b189cd3996b477d344c961fdf90d5a115d1926a7ee",
 "datasets": {
 "resource_usage": [
 {
 "resource_type": "quiz",
 "clicks": 623,
 "pct_of_total": "0.49405233941316415543",
 "vle_diversity_score": "1",
 "forum_engagement_rate": "0.11102299762093576527"
 },
 {
 "resource_type": "homepage",
 "clicks": 264,
 "pct_of_total": "0.20935765265662172879",
 "vle_diversity_score": "1",
 "forum_engagement_rate": "0.11102299762093576527"
 },
 {
 "resource_type": "forumng",
 "clicks": 140,
 "pct_of_total": "0.11102299762093576527",
 "vle_diversity_score": "1",
 "forum_engagement_rate": "0.11102299762093576527"
 },
 {
 "resource_type": "subpage",
 "clicks": 94,
 "pct_of_total": "0.07454401268834258525",
 "vle_diversity_score": "1",
 "forum_engagement_rate": "0.11102299762093576527"
 },
 {
 "resource_type": "resource",
 "clicks": 71,
 "pct_of_total": "0.05630452022204599524",
 "vle_diversity_score": "1",
 "forum_engagement_rate": "0.11102299762093576527"
 },
 {
 "resource_type": "oucontent",
 "clicks": 40,
 "pct_of_total": "0.03172085646312450436",
 "vle_diversity_score": "1",
 "forum_engagement_rate": "0.11102299762093576527"
 },
 {
 "resource_type": "url",
 "clicks": 27,
 "pct_of_total": "0.02141157811260904044",
 "vle_diversity_score": "1",
 "forum_engagement_rate": "0.11102299762093576527"
 },
 {
 "resource_type": "page",
 "clicks": 1,
 "pct_of_total": "0.00079302141157811261",
 "vle_diversity_score": "1",
 "forum_engagement_rate": "0.11102299762093576527"
 },
 {
 "resource_type": "oucollaborate",
 "clicks": 1,
 "pct_of_total": "0.00079302141157811261",
 "vle_diversity_score": "1",
 "forum_engagement_rate": "0.11102299762093576527"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T10__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "42d7aa60ab70771860685ec7a93cea4fe92de8bccdaa59413e2905723c551d78",
 "generator_input_sha256": "210157deeecc4c94705cffe334b730a9c9f268d1c1a73009921d7e8e540921f2",
 "generator_input_compact": {
 "task_id": "S-T10",
 "execution_id": "exec_1781847912597_3167c4a7",
 "task_name": "Resource engagement breakdown",
 "analysis_type": "distribution",
 "explanation_strategy": "behavioral",
 "actionable_question": "Am I using the full range of learning resources available?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "resource_usage"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "resource_usage"
 ],
 "dataset_row_counts": {
 "resource_usage": 9
 },
 "ai_summary_config_summary": {
 "summary_type": "categorical_distribution",
 "metric_column": null,
 "entity_column": null,
 "group_column": null,
 "time_column": null,
 "sort_by": "clicks",
 "sort_direction": "desc",
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
 "raw_text": "Summary: Your engagement with various learning resources shows a strong preference for quizzes and the homepage, while other resources like forums and collaborative tools are underutilized. This pattern suggests that you might be missing out on valuable interactions that could enhance your learning experience.\n\nInsights: High Engagement with Quizzes: You have clicked on quizzes significantly more than other resources, accounting for nearly 49% of your total clicks. This indicates a strong preference for this type of resource. | Low Forum Engagement: Your engagement with forums is relatively low, with only 140 clicks, which is about 11% of your total activity. This suggests that you may not be taking full advantage of collaborative discussions that could enrich your understanding. | Underutilization of Other Resources: Resources like 'oucontent', 'url', and 'oucollaborate' have very few clicks, indicating that you might not be exploring all available materials that could support your learning.\n\nEducational implications: Engaging with a wider variety of resources can enhance your learning experience and understanding of the material.\n\nRecommendations: high - Increase your participation in forums and collaborative tools. - This will help you connect with peers and gain different perspectives on the course material. | medium - Explore underused resources like 'oucontent' and 'url'. - These resources may offer valuable information and support that can complement your learning.",
 "structured_payload": {
 "task_id": "S-T10",
 "execution_id": "exec_1781847912597_3167c4a7",
 "explanation": {
 "summary": "Your engagement with various learning resources shows a strong preference for quizzes and the homepage, while other resources like forums and collaborative tools are underutilized. This pattern suggests that you might be missing out on valuable interactions that could enhance your learning experience.",
 "insights": [
 {
 "title": "High Engagement with Quizzes",
 "description": "You have clicked on quizzes significantly more than other resources, accounting for nearly 49% of your total clicks. This indicates a strong preference for this type of resource.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "clicks",
 "value": 623,
 "comparison": "baseline",
 "delta": null,
 "context": "Quizzes are your most engaged resource."
 }
 ]
 },
 {
 "title": "Low Forum Engagement",
 "description": "Your engagement with forums is relatively low, with only 140 clicks, which is about 11% of your total activity. This suggests that you may not be taking full advantage of collaborative discussions that could enrich your understanding.",
 "severity": "high",
 "evidence": [
 {
 "metric": "clicks",
 "value": 140,
 "comparison": "baseline",
 "delta": null,
 "context": "Forums are a key resource for peer interaction."
 }
 ]
 },
 {
 "title": "Underutilization of Other Resources",
 "description": "Resources like 'oucontent', 'url', and 'oucollaborate' have very few clicks, indicating that you might not be exploring all available materials that could support your learning.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "clicks",
 "value": 40,
 "comparison": "baseline",
 "delta": null,
 "context": "These resources could provide additional insights."
 }
 ]
 }
 ],
 "educational_implications": [
 "Engaging with a wider variety of resources can enhance your learning experience and understanding of the material."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Increase your participation in forums and collaborative tools.",
 "rationale": "This will help you connect with peers and gain different perspectives on the course material."
 },
 {
 "priority": "medium",
 "action": "Explore underused resources like 'oucontent' and 'url'.",
 "rationale": "These resources may offer valuable information and support that can complement your learning."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data provides a clear picture of your resource engagement patterns.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "behavioral",
 "explanation_type": "behavioral",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "categorical_distribution",
 "ai_summary_method_warning": null,
 "full_result_row_count": 9,
 "included_row_count": 9,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "resource_usage",
 "row_count": 9,
 "included_row_count": 9
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 9,
 "baseline_reference_tokens": 439,
 "task_aware_prompt_tokens": 1238,
 "token_ratio": 2.82,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.largest_category"
 ],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (2.82 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "categorical_distribution",
 "task_id": "S-T10",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "resource_usage",
 "row_count": 9,
 "category_column": "resource_type",
 "count_column": "clicks",
 "percent_column": null,
 "metric_columns": [
 "pct_of_total",
 "vle_diversity_score",
 "forum_engagement_rate"
 ],
 "total_count": 1261,
 "focus_categories": [
 "forumng"
 ]
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "category_distribution": [
 {
 "category": "quiz",
 "count": 623,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "homepage",
 "count": 264,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "forumng",
 "count": 140,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.111,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "subpage",
 "count": 94,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "resource",
 "count": 71,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "oucontent",
 "count": 40,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "url",
 "count": 27,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "page",
 "count": 1,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "oucollaborate",
 "count": 1,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 }
 ],
 "focus_total": {
 "categories": [
 "forumng"
 ],
 "present_categories": [
 "forumng"
 ],
 "missing_categories": [],
 "count": 140,
 "percent": null
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_evidence_by_category": {
 "quiz": {
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "homepage": {
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "forumng": {
 "pct_of_total": 0.111,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "subpage": {
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "resource": {
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "oucontent": {
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "url": {
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "page": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "oucollaborate": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_expected_categories": [],
 "missing_focus_categories": [],
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "categorical_distribution",
 "dataset_name": "resource_usage",
 "row_count": 9,
 "category_column": "resource_type",
 "count_column": "clicks",
 "percent_column": null,
 "total_count": 1261,
 "category_distribution": [
 {
 "category": "quiz",
 "count": 623,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "homepage",
 "count": 264,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "forumng",
 "count": 140,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.111,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "subpage",
 "count": 94,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "resource",
 "count": 71,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "oucontent",
 "count": 40,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "url",
 "count": 27,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "page",
 "count": 1,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "oucollaborate",
 "count": 1,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 }
 ],
 "largest_category": {
 "category": "quiz",
 "count": 623,
 "percent": null
 },
 "focus_categories": [
 "forumng"
 ],
 "focus_total": {
 "categories": [
 "forumng"
 ],
 "present_categories": [
 "forumng"
 ],
 "missing_categories": [],
 "count": 140,
 "percent": null
 },
 "missing_expected_categories": [],
 "missing_focus_categories": [],
 "metric_columns": [
 "pct_of_total",
 "vle_diversity_score",
 "forum_engagement_rate"
 ],
 "metric_evidence_by_category": {
 "quiz": {
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "homepage": {
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "forumng": {
 "pct_of_total": 0.111,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "subpage": {
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "resource": {
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "oucontent": {
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "url": {
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "page": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "oucollaborate": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8439,
 "token_usage": {
 "prompt_tokens": 2069,
 "completion_tokens": 596,
 "total_tokens": 2665
 },
 "strategy": "behavioral",
 "granularity": "semester",
 "cost_usd": 0.000668
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T10__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "42d7aa60ab70771860685ec7a93cea4fe92de8bccdaa59413e2905723c551d78",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2069,
 "completion_tokens": 596,
 "total_tokens": 2665
 },
 "latency_ms": 8442,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-T10",
 "execution_id": "exec_1781847912597_3167c4a7",
 "explanation": {
 "summary": "Your engagement with various learning resources shows a strong preference for quizzes and the homepage, while other resources like forums and collaborative tools are underutilized. This pattern suggests that you might be missing out on valuable interactions that could enhance your learning experience.",
 "insights": [
 {
 "title": "High Engagement with Quizzes",
 "description": "You have clicked on quizzes significantly more than other resources, accounting for nearly 49% of your total clicks. This indicates a strong preference for this type of resource.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "clicks",
 "value": 623,
 "comparison": "baseline",
 "delta": null,
 "context": "Quizzes are your most engaged resource."
 }
 ]
 },
 {
 "title": "Low Forum Engagement",
 "description": "Your engagement with forums is relatively low, with only 140 clicks, which is about 11% of your total activity. This suggests that you may not be taking full advantage of collaborative discussions that could enrich your understanding.",
 "severity": "high",
 "evidence": [
 {
 "metric": "clicks",
 "value": 140,
 "comparison": "baseline",
 "delta": null,
 "context": "Forums are a key resource for peer interaction."
 }
 ]
 },
 {
 "title": "Underutilization of Other Resources",
 "description": "Resources like 'oucontent', 'url', and 'oucollaborate' have very few clicks, indicating that you might not be exploring all available materials that could support your learning.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "clicks",
 "value": 40,
 "comparison": "baseline",
 "delta": null,
 "context": "These resources could provide additional insights."
 }
 ]
 }
 ],
 "educational_implications": [
 "Engaging with a wider variety of resources can enhance your learning experience and understanding of the material."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Increase your participation in forums and collaborative tools.",
 "rationale": "This will help you connect with peers and gain different perspectives on the course material."
 },
 {
 "priority": "medium",
 "action": "Explore underused resources like 'oucontent' and 'url'.",
 "rationale": "These resources may offer valuable information and support that can complement your learning."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data provides a clear picture of your resource engagement patterns.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "behavioral",
 "explanation_type": "behavioral",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "categorical_distribution",
 "ai_summary_method_warning": null,
 "full_result_row_count": 9,
 "included_row_count": 9,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "resource_usage",
 "row_count": 9,
 "included_row_count": 9
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 9,
 "baseline_reference_tokens": 439,
 "task_aware_prompt_tokens": 1238,
 "token_ratio": 2.82,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.largest_category"
 ],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (2.82 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "categorical_distribution",
 "task_id": "S-T10",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "resource_usage",
 "row_count": 9,
 "category_column": "resource_type",
 "count_column": "clicks",
 "percent_column": null,
 "metric_columns": [
 "pct_of_total",
 "vle_diversity_score",
 "forum_engagement_rate"
 ],
 "total_count": 1261,
 "focus_categories": [
 "forumng"
 ]
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "category_distribution": [
 {
 "category": "quiz",
 "count": 623,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "homepage",
 "count": 264,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "forumng",
 "count": 140,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.111,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "subpage",
 "count": 94,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "resource",
 "count": 71,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "oucontent",
 "count": 40,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "url",
 "count": 27,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "page",
 "count": 1,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "oucollaborate",
 "count": 1,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 }
 ],
 "focus_total": {
 "categories": [
 "forumng"
 ],
 "present_categories": [
 "forumng"
 ],
 "missing_categories": [],
 "count": 140,
 "percent": null
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_evidence_by_category": {
 "quiz": {
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "homepage": {
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "forumng": {
 "pct_of_total": 0.111,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "subpage": {
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "resource": {
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "oucontent": {
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "url": {
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "page": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "oucollaborate": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_expected_categories": [],
 "missing_focus_categories": [],
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "categorical_distribution",
 "dataset_name": "resource_usage",
 "row_count": 9,
 "category_column": "resource_type",
 "count_column": "clicks",
 "percent_column": null,
 "total_count": 1261,
 "category_distribution": [
 {
 "category": "quiz",
 "count": 623,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "homepage",
 "count": 264,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "forumng",
 "count": 140,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.111,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "subpage",
 "count": 94,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "resource",
 "count": 71,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "oucontent",
 "count": 40,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "url",
 "count": 27,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "page",
 "count": 1,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 {
 "category": "oucollaborate",
 "count": 1,
 "percent": null,
 "metrics": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 }
 ],
 "largest_category": {
 "category": "quiz",
 "count": 623,
 "percent": null
 },
 "focus_categories": [
 "forumng"
 ],
 "focus_total": {
 "categories": [
 "forumng"
 ],
 "present_categories": [
 "forumng"
 ],
 "missing_categories": [],
 "count": 140,
 "percent": null
 },
 "missing_expected_categories": [],
 "missing_focus_categories": [],
 "metric_columns": [
 "pct_of_total",
 "vle_diversity_score",
 "forum_engagement_rate"
 ],
 "metric_evidence_by_category": {
 "quiz": {
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "homepage": {
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "forumng": {
 "pct_of_total": 0.111,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "subpage": {
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "resource": {
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "oucontent": {
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "url": {
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "page": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 },
 "oucollaborate": {
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1,
 "forum_engagement_rate": 0.111
 }
 },
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8439,
 "token_usage": {
 "prompt_tokens": 2069,
 "completion_tokens": 596,
 "total_tokens": 2665
 },
 "strategy": "behavioral",
 "granularity": "semester",
 "cost_usd": 0.000668
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
 "observed": "d104cedb86d92fea4d41cb5fde5c359875144a7bb6d35e70d303cd08cd0a444c",
 "expected_values": [
 "d104cedb86d92fea4d41cb5fde5c359875144a7bb6d35e70d303cd08cd0a444c"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "9ed8f0948e3c8a3e7f9310b189cd3996b477d344c961fdf90d5a115d1926a7ee",
 "expected": "9ed8f0948e3c8a3e7f9310b189cd3996b477d344c961fdf90d5a115d1926a7ee"
 },
 {
 "check_id": "numeric_fields_resource_usage",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "resource_usage",
 "numeric_columns": [
 "clicks"
 ],
 "numeric_summaries": {
 "clicks": {
 "count": 9,
 "min": 1,
 "max": 623
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_resource_usage",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "resource_usage",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```
