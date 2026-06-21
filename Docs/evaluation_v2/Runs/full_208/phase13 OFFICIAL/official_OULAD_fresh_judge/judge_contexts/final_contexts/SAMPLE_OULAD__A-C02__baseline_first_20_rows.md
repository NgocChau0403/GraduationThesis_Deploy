# LLM Judge Final Judge Context - SAMPLE_OULAD__A-C02__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-C02__baseline_first_20_rows",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-C02",
 "explanation_mode": "baseline_first_20_rows",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Compare engagement patterns",
 "scope": "2 students",
 "actionable_question": "Which student is more engaged across total clicks, active days, and combined engagement score?",
 "target_audience": "instructor",
 "ai_summary_type": "multi_metric_comparison",
 "ai_prompt_hint": "Compare the two students using metric, engagement_score, total_clicks, and active_days. Explain which engagement dimension creates the largest gap. Do not infer academic risk unless risk fields are present.",
 "query_labels": [
 "engagement_comparison"
 ],
 "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
 "source_tables": [
 "enrollment",
 "engagement"
 ],
 "key_db_fields": [
 "metric [FE cross]",
 "engagement_score [FE cross]",
 "study_effort_level [FE cross]",
 "total_clicks",
 "active_days"
 ],
 "output_schema": {
 "required_columns": [
 "student_id",
 "metric",
 "engagement_score"
 ],
 "optional_columns": [
 "total_clicks",
 "active_days",
 "study_effort_level"
 ]
 },
 "query_labels": [
 "engagement_comparison"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-C02-CORE-01",
 "description": "Compare the two students using metric, engagement_score, total_clicks, and active_days."
 },
 {
 "requirement_id": "A-C02-CORE-02",
 "description": "Explain which engagement dimension creates the largest gap."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-C02-CONSTRAINT-01",
 "description": "Do not infer academic risk unless risk fields are present."
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
 "dataset_label": "engagement_comparison",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C02.json",
 "artifact_sha256": "68726384d9ea133f2ddbb3ffd580c7ee18a8ad91280d9c40d955fc6222ed5857",
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
 "evidence_artifact_file_sha256": "68726384d9ea133f2ddbb3ffd580c7ee18a8ad91280d9c40d955fc6222ed5857",
 "evidence_rows_sha256": "5ca289b6f3abfb1befd40ca0093124bfb749c65f378bea63c13d53c15f317582",
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
 "embedded_datasets_sha256": "5ca289b6f3abfb1befd40ca0093124bfb749c65f378bea63c13d53c15f317582",
 "datasets": {
 "engagement_comparison": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metric": "active_days_norm",
 "engagement_score": 0.35251798561151076,
 "total_clicks": 1261,
 "active_days": 98,
 "study_effort_level": "very_low"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metric": "engagement_score",
 "engagement_score": 0.20237855036820618,
 "total_clicks": 1261,
 "active_days": 98,
 "study_effort_level": "very_low"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metric": "total_clicks_norm",
 "engagement_score": 0.05223911512490161,
 "total_clicks": 1261,
 "active_days": 98,
 "study_effort_level": "very_low"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metric": "active_days_norm",
 "engagement_score": 0,
 "total_clicks": 0,
 "active_days": 0,
 "study_effort_level": "very_low"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metric": "engagement_score",
 "engagement_score": 0,
 "total_clicks": 0,
 "active_days": 0,
 "study_effort_level": "very_low"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metric": "total_clicks_norm",
 "engagement_score": 0,
 "total_clicks": 0,
 "active_days": 0,
 "study_effort_level": "very_low"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C02__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "f609d68993320b62062110ecfefdd73a3f0affad5efce71fe5e88572e2134be6",
 "generator_input_sha256": "519a3d53f7171b34ef94728ec449cc02059f440425f5b034853786951558711e",
 "generator_input_compact": {
 "task_id": "A-C02",
 "execution_id": "exec_1781847642419_5be485d9",
 "task_name": "Compare engagement patterns",
 "analysis_type": "comparison",
 "explanation_strategy": "comparison",
 "actionable_question": "Which student is more engaged across total clicks, active days, and combined engagement score?",
 "target_audience": [
 "instructor"
 ],
 "query_labels": [
 "engagement_comparison"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "engagement_comparison"
 ],
 "dataset_row_counts": {
 "engagement_comparison": 6
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
 "raw_text": "Summary: The comparison between the two students reveals significant differences in engagement metrics, with one student demonstrating active participation while the other shows no engagement. This disparity highlights the need for targeted interventions to support the less engaged student.\n\nInsights: Engagement Score Disparity: Student SAMPLE_OULAD_STU_100788 has an engagement score of 0.202, while SAMPLE_OULAD_STU_101700 has an engagement score of 0. This indicates a complete lack of engagement for the latter. | Active Days Comparison: SAMPLE_OULAD_STU_100788 has 98 active days, while SAMPLE_OULAD_STU_101700 has 0 active days, indicating a significant engagement gap in terms of participation frequency. | Total Clicks Engagement: SAMPLE_OULAD_STU_100788 recorded 1261 total clicks, while SAMPLE_OULAD_STU_101700 recorded 0 clicks, further emphasizing the engagement gap.\n\nEducational implications: The stark contrast in engagement metrics suggests that targeted interventions are necessary for the less engaged student to foster participation and improve learning outcomes.\n\nRecommendations: high - Implement personalized outreach strategies for SAMPLE_OULAD_STU_101700 to encourage engagement. - Direct support may help to identify barriers to engagement and motivate the student to participate more actively.",
 "structured_payload": {
 "task_id": "A-C02",
 "execution_id": "exec_1781847642419_5be485d9",
 "explanation": {
 "summary": "The comparison between the two students reveals significant differences in engagement metrics, with one student demonstrating active participation while the other shows no engagement. This disparity highlights the need for targeted interventions to support the less engaged student.",
 "insights": [
 {
 "title": "Engagement Score Disparity",
 "description": "Student SAMPLE_OULAD_STU_100788 has an engagement score of 0.202, while SAMPLE_OULAD_STU_101700 has an engagement score of 0. This indicates a complete lack of engagement for the latter.",
 "severity": "high",
 "evidence": [
 {
 "metric": "engagement_score",
 "value": 0.20237855036820618,
 "comparison": "baseline",
 "delta": 0.20237855036820618,
 "context": "Comparison of engagement scores between the two students"
 }
 ]
 },
 {
 "title": "Active Days Comparison",
 "description": "SAMPLE_OULAD_STU_100788 has 98 active days, while SAMPLE_OULAD_STU_101700 has 0 active days, indicating a significant engagement gap in terms of participation frequency.",
 "severity": "high",
 "evidence": [
 {
 "metric": "active_days",
 "value": 98,
 "comparison": "baseline",
 "delta": 98,
 "context": "Active days comparison between the two students"
 }
 ]
 },
 {
 "title": "Total Clicks Engagement",
 "description": "SAMPLE_OULAD_STU_100788 recorded 1261 total clicks, while SAMPLE_OULAD_STU_101700 recorded 0 clicks, further emphasizing the engagement gap.",
 "severity": "high",
 "evidence": [
 {
 "metric": "total_clicks",
 "value": 1261,
 "comparison": "baseline",
 "delta": 1261,
 "context": "Total clicks comparison between the two students"
 }
 ]
 }
 ],
 "educational_implications": [
 "The stark contrast in engagement metrics suggests that targeted interventions are necessary for the less engaged student to foster participation and improve learning outcomes."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement personalized outreach strategies for SAMPLE_OULAD_STU_101700 to encourage engagement.",
 "rationale": "Direct support may help to identify barriers to engagement and motivate the student to participate more actively."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data provided is clear and directly comparable, allowing for confident conclusions about engagement levels.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
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
 "latency_ms": 8185,
 "token_usage": {
 "prompt_tokens": 973,
 "completion_tokens": 598,
 "total_tokens": 1571
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000505
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C02__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "f609d68993320b62062110ecfefdd73a3f0affad5efce71fe5e88572e2134be6",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "baseline_first_20_rows",
 "observed_ai_summary_method": "baseline_first_20_rows",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 973,
 "completion_tokens": 598,
 "total_tokens": 1571
 },
 "latency_ms": 8204,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-C02",
 "execution_id": "exec_1781847642419_5be485d9",
 "explanation": {
 "summary": "The comparison between the two students reveals significant differences in engagement metrics, with one student demonstrating active participation while the other shows no engagement. This disparity highlights the need for targeted interventions to support the less engaged student.",
 "insights": [
 {
 "title": "Engagement Score Disparity",
 "description": "Student SAMPLE_OULAD_STU_100788 has an engagement score of 0.202, while SAMPLE_OULAD_STU_101700 has an engagement score of 0. This indicates a complete lack of engagement for the latter.",
 "severity": "high",
 "evidence": [
 {
 "metric": "engagement_score",
 "value": 0.20237855036820618,
 "comparison": "baseline",
 "delta": 0.20237855036820618,
 "context": "Comparison of engagement scores between the two students"
 }
 ]
 },
 {
 "title": "Active Days Comparison",
 "description": "SAMPLE_OULAD_STU_100788 has 98 active days, while SAMPLE_OULAD_STU_101700 has 0 active days, indicating a significant engagement gap in terms of participation frequency.",
 "severity": "high",
 "evidence": [
 {
 "metric": "active_days",
 "value": 98,
 "comparison": "baseline",
 "delta": 98,
 "context": "Active days comparison between the two students"
 }
 ]
 },
 {
 "title": "Total Clicks Engagement",
 "description": "SAMPLE_OULAD_STU_100788 recorded 1261 total clicks, while SAMPLE_OULAD_STU_101700 recorded 0 clicks, further emphasizing the engagement gap.",
 "severity": "high",
 "evidence": [
 {
 "metric": "total_clicks",
 "value": 1261,
 "comparison": "baseline",
 "delta": 1261,
 "context": "Total clicks comparison between the two students"
 }
 ]
 }
 ],
 "educational_implications": [
 "The stark contrast in engagement metrics suggests that targeted interventions are necessary for the less engaged student to foster participation and improve learning outcomes."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement personalized outreach strategies for SAMPLE_OULAD_STU_101700 to encourage engagement.",
 "rationale": "Direct support may help to identify barriers to engagement and motivate the student to participate more actively."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data provided is clear and directly comparable, allowing for confident conclusions about engagement levels.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
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
 "latency_ms": 8185,
 "token_usage": {
 "prompt_tokens": 973,
 "completion_tokens": 598,
 "total_tokens": 1571
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000505
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
 "observed": "68726384d9ea133f2ddbb3ffd580c7ee18a8ad91280d9c40d955fc6222ed5857",
 "expected_values": [
 "68726384d9ea133f2ddbb3ffd580c7ee18a8ad91280d9c40d955fc6222ed5857"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "5ca289b6f3abfb1befd40ca0093124bfb749c65f378bea63c13d53c15f317582",
 "expected": "5ca289b6f3abfb1befd40ca0093124bfb749c65f378bea63c13d53c15f317582"
 },
 {
 "check_id": "numeric_fields_engagement_comparison",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "engagement_comparison",
 "numeric_columns": [
 "active_days",
 "engagement_score",
 "total_clicks"
 ],
 "numeric_summaries": {
 "active_days": {
 "count": 6,
 "min": 0,
 "max": 98
 },
 "engagement_score": {
 "count": 6,
 "min": 0,
 "max": 0.35251798561151076
 },
 "total_clicks": {
 "count": 6,
 "min": 0,
 "max": 1261
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_engagement_comparison",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "engagement_comparison",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```
