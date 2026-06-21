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

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S04__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__A-S04__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "A-S04",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Student risk flag breakdown",
 "scope": "1 student",
 "actionable_question": "Which specific risk factors should admin address for this student?",
 "target_audience": "instructor, academic_advisor",
 "ai_summary_type": "risk_flags",
 "ai_prompt_hint": "For each triggered flag, state the exact value and why it crosses the threshold. Prioritise the top 2 for immediate action.",
 "query_labels": [
 "risk_flags"
 ],
 "explanation_strategy": "risk"
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
 "at_risk_score [FE cross]",
 "at_risk_label [FE cross]",
 "avg_score [FE cross]",
 "engagement_score [FE cross]",
 "punctuality_rate [FE cross]",
 "performance_trend [FE cross]",
 "previous_attempt_count"
 ],
 "output_schema": {
 "required_columns": [
 "flag_name",
 "flag_value",
 "threshold",
 "triggered"
 ],
 "optional_columns": [
 "severity",
 "flag_description",
 "recommended_action",
 "support_category"
 ]
 },
 "query_labels": [
 "risk_flags"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-S04-CORE-01",
 "description": "Explain the returned student risk flags and identify which flags are triggered."
 },
 {
 "requirement_id": "A-S04-CORE-02",
 "description": "For each triggered flag, explain the exact value, threshold, severity, description, and existing recommended_action when those fields are returned."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-S04-CONSTRAINT-01",
 "description": "Do not require the explanation model to create new recommendations; this task already returns recommended_action fields for flags."
 },
 {
 "constraint_id": "A-S04-CONSTRAINT-02",
 "description": "If no flags are triggered, state that explicitly and keep non-triggered flags brief."
 },
 {
 "constraint_id": "A-S04-CONSTRAINT-03",
 "description": "Do not invent risk signals, priorities, or actions that are not present in returned flags."
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
 "dataset_label": "risk_flags",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S04.json",
 "artifact_sha256": "c06bd7d82ba2e9b844a13c63392929a9759f108eb64ee2d323f7be509a59ee53",
 "row_count": 4,
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
 "evidence_artifact_file_sha256": "c06bd7d82ba2e9b844a13c63392929a9759f108eb64ee2d323f7be509a59ee53",
 "evidence_rows_sha256": "58167f14f0b163ff69579615d9d4ff87f234fb4c9fe3ba78b8a10a89ce451323",
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
 "embedded_datasets_sha256": "58167f14f0b163ff69579615d9d4ff87f234fb4c9fe3ba78b8a10a89ce451323",
 "datasets": {
 "risk_flags": [
 {
 "flag_name": "flag_low_score",
 "flag_value": 36.666666666666664,
 "threshold": "40",
 "triggered": true,
 "severity": "high",
 "flag_description": "Average score is below the pass threshold for this dataset scale.",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment.",
 "support_category": "academic_performance"
 },
 {
 "flag_name": "flag_high_absence",
 "flag_value": 4,
 "threshold": "10",
 "triggered": false,
 "severity": "info",
 "flag_description": "Absences are within the high-absence risk limit.",
 "recommended_action": "Keep monitoring attendance and confirm there are no new absence spikes.",
 "support_category": "attendance"
 },
 {
 "flag_name": "flag_low_punctuality",
 "flag_value": 0,
 "threshold": "0.7",
 "triggered": true,
 "severity": "medium",
 "flag_description": "Submission punctuality is below the expected threshold.",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "support_category": "time_management"
 },
 {
 "flag_name": "flag_neg_trend",
 "flag_value": 27.5,
 "threshold": "0",
 "triggered": false,
 "severity": "info",
 "flag_description": "Scores are maintaining an upward or stable trend across assessments.",
 "recommended_action": "Continue monitoring assessment feedback over time.",
 "support_category": "trend_monitoring"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-S04__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "3eb4c01c7fc3f096bd9acb2682381e072412fbe23a2b98d5542a07effc1b8cf1",
 "generator_input_sha256": "8438c633d2e443e6aedf08935d4b1da3a95c717404fc57c4c68a8cb5a5b77ad3",
 "generator_input_compact": {
 "task_id": "A-S04",
 "execution_id": "exec_1781847238058_6684c265",
 "task_name": "Student risk flag breakdown",
 "analysis_type": "ranking",
 "explanation_strategy": "risk",
 "actionable_question": "Which specific risk factors should admin address for this student?",
 "target_audience": [
 "instructor",
 "academic_advisor"
 ],
 "query_labels": [
 "risk_flags"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "risk_flags"
 ],
 "dataset_row_counts": {
 "risk_flags": 4
 },
 "ai_summary_config_summary": {
 "summary_type": "risk_flags",
 "metric_column": null,
 "entity_column": null,
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
 "raw_text": "Summary: The checklist prioritizes Low Score and Low Punctuality because their current values cross the respective risk thresholds; highest severity is high for Low Score because the average score is significantly below the pass threshold. Triggered action rationale: Low Score is triggered with flag_value=36.666666666666664 versus threshold=40; Average score is below the pass threshold for this dataset scale. Existing recommended_action: Review the weakest assessment topics and schedule tutor support before the next assessment. Low Punctuality is triggered with flag_value=0 versus threshold=0.7; Submission punctuality is below the expected threshold. Existing recommended_action: Use deadline reminders and submit drafts earlier to reduce late-submission risk.\n\nInsights: Why Low Score is High: The average score is 36.67, which is below the pass threshold of 40. This triggered the flag_low_score, indicating a high severity level due to the substantial gap from the expected performance standard. This explains why that visible checklist flag is surfaced in the card. | Why Low Punctuality is Active: The submission punctuality is at 0, which is below the expected threshold of 0.7. This triggered the flag_low_punctuality, resulting in a medium severity level as it indicates a consistent issue with meeting deadlines. This explains why that visible checklist flag is surfaced in the card.",
 "structured_payload": {
 "task_id": "A-S04",
 "execution_id": "exec_1781847238058_6684c265",
 "explanation": {
 "summary": "The checklist prioritizes Low Score and Low Punctuality because their current values cross the respective risk thresholds; highest severity is high for Low Score because the average score is significantly below the pass threshold. Triggered action rationale: Low Score is triggered with flag_value=36.666666666666664 versus threshold=40; Average score is below the pass threshold for this dataset scale. Existing recommended_action: Review the weakest assessment topics and schedule tutor support before the next assessment. Low Punctuality is triggered with flag_value=0 versus threshold=0.7; Submission punctuality is below the expected threshold. Existing recommended_action: Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "insights": [
 {
 "title": "Why Low Score is High",
 "description": "The average score is 36.67, which is below the pass threshold of 40. This triggered the flag_low_score, indicating a high severity level due to the substantial gap from the expected performance standard. This explains why that visible checklist flag is surfaced in the card.",
 "severity": "high",
 "evidence": [
 {
 "metric": "flag_value",
 "value": 36.666666666666664,
 "comparison": "down_from_previous",
 "delta": null,
 "context": "Threshold is 40"
 }
 ]
 },
 {
 "title": "Why Low Punctuality is Active",
 "description": "The submission punctuality is at 0, which is below the expected threshold of 0.7. This triggered the flag_low_punctuality, resulting in a medium severity level as it indicates a consistent issue with meeting deadlines. This explains why that visible checklist flag is surfaced in the card.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "flag_value",
 "value": 0,
 "comparison": "down_from_previous",
 "delta": null,
 "context": "Threshold is 0.7"
 }
 ]
 }
 ],
 "educational_implications": [],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "Data quality is consistent and reliable based on the provided metrics.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "risk",
 "explanation_type": "risk",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "risk_flags",
 "ai_summary_method_warning": null,
 "full_result_row_count": 4,
 "included_row_count": 4,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "risk_flags",
 "row_count": 4,
 "included_row_count": 4
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 4,
 "baseline_reference_tokens": 384,
 "task_aware_prompt_tokens": 1318,
 "token_ratio": 3.4323,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "Use checklist style: triggered flags first, then non-triggered flags briefly.",
 "For triggered flags, state flag_value versus threshold plus severity, description, support category, and existing recommended_action when supplied.",
 "Do not invent new risk flags or new recommendations outside returned flag evidence.",
 "For every triggered flag, explain the existing recommended_action; do not create a replacement action."
 ],
 "must_keep_keys": [
 "dataset_name",
 "non_triggered_count",
 "non_triggered_flags",
 "recommended_actions",
 "row_count",
 "severity_counts",
 "summarization_warnings",
 "threshold_evidence",
 "total_flags",
 "triggered_count",
 "triggered_flags"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.4323 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "risk_flags",
 "task_id": "A-S04",
 "task_output_contract": [
 "Use checklist style: triggered flags first, then non-triggered flags briefly.",
 "For triggered flags, state flag_value versus threshold plus severity, description, support category, and existing recommended_action when supplied.",
 "Do not invent new risk flags or new recommendations outside returned flag evidence.",
 "For every triggered flag, explain the existing recommended_action; do not create a replacement action."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "risk_flags",
 "row_count": 4,
 "total_flags": 4,
 "triggered_count": 2,
 "non_triggered_count": 2,
 "unknown_triggered_count": 0,
 "severity_available": false
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "highest_severity_triggered": null,
 "triggered_flags": [
 {
 "flag_name": "flag_low_score",
 "triggered": true,
 "flag_description": "Average score is below the pass threshold for this dataset scale.",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment.",
 "support_category": "academic_performance"
 },
 {
 "flag_name": "flag_low_punctuality",
 "triggered": true,
 "flag_description": "Submission punctuality is below the expected threshold.",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "support_category": "time_management"
 }
 ],
 "non_triggered_flags": [
 {
 "flag_name": "flag_high_absence",
 "triggered": false,
 "flag_description": "Absences are within the high-absence risk limit.",
 "recommended_action": "Keep monitoring attendance and confirm there are no new absence spikes.",
 "support_category": "attendance"
 },
 {
 "flag_name": "flag_neg_trend",
 "triggered": false,
 "flag_description": "Scores are maintaining an upward or stable trend across assessments.",
 "recommended_action": "Continue monitoring assessment feedback over time.",
 "support_category": "trend_monitoring"
 }
 ]
 }
 },
 {
 "name": "comparison",
 "facts": {
 "threshold_evidence": [
 {
 "flag_name": "flag_low_score",
 "flag_value": 36.6667,
 "flag_value_raw": 36.666666666666664,
 "threshold": 40,
 "threshold_raw": "40",
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_low_punctuality",
 "flag_value": 0,
 "flag_value_raw": 0,
 "threshold": 0.7,
 "threshold_raw": "0.7",
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_high_absence",
 "flag_value": 4,
 "flag_value_raw": 4,
 "threshold": 10,
 "threshold_raw": "10",
 "triggered": false,
 "triggered_raw": false
 },
 {
 "flag_name": "flag_neg_trend",
 "flag_value": 27.5,
 "flag_value_raw": 27.5,
 "threshold": 0,
 "threshold_raw": "0",
 "triggered": false,
 "triggered_raw": false
 }
 ],
 "severity_counts": {}
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "recommended_actions": [
 {
 "flag_name": "flag_low_score",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment."
 },
 {
 "flag_name": "flag_low_punctuality",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk."
 }
 ]
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
 "summary_type": "risk_flags",
 "dataset_name": "risk_flags",
 "row_count": 4,
 "total_flags": 4,
 "triggered_count": 2,
 "non_triggered_count": 2,
 "unknown_triggered_count": 0,
 "severity_available": false,
 "severity_counts": {},
 "triggered_flags": [
 {
 "flag_name": "flag_low_score",
 "triggered": true,
 "flag_description": "Average score is below the pass threshold for this dataset scale.",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment.",
 "support_category": "academic_performance"
 },
 {
 "flag_name": "flag_low_punctuality",
 "triggered": true,
 "flag_description": "Submission punctuality is below the expected threshold.",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "support_category": "time_management"
 }
 ],
 "non_triggered_flags": [
 {
 "flag_name": "flag_high_absence",
 "triggered": false,
 "flag_description": "Absences are within the high-absence risk limit.",
 "recommended_action": "Keep monitoring attendance and confirm there are no new absence spikes.",
 "support_category": "attendance"
 },
 {
 "flag_name": "flag_neg_trend",
 "triggered": false,
 "flag_description": "Scores are maintaining an upward or stable trend across assessments.",
 "recommended_action": "Continue monitoring assessment feedback over time.",
 "support_category": "trend_monitoring"
 }
 ],
 "highest_severity_triggered": null,
 "threshold_evidence": [
 {
 "flag_name": "flag_low_score",
 "flag_value": 36.6667,
 "flag_value_raw": 36.666666666666664,
 "threshold": 40,
 "threshold_raw": "40",
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_low_punctuality",
 "flag_value": 0,
 "flag_value_raw": 0,
 "threshold": 0.7,
 "threshold_raw": "0.7",
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_high_absence",
 "flag_value": 4,
 "flag_value_raw": 4,
 "threshold": 10,
 "threshold_raw": "10",
 "triggered": false,
 "triggered_raw": false
 },
 {
 "flag_name": "flag_neg_trend",
 "flag_value": 27.5,
 "flag_value_raw": 27.5,
 "threshold": 0,
 "threshold_raw": "0",
 "triggered": false,
 "triggered_raw": false
 }
 ],
 "recommended_actions": [
 {
 "flag_name": "flag_low_score",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment."
 },
 {
 "flag_name": "flag_low_punctuality",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk."
 }
 ],
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4486,
 "token_usage": {
 "prompt_tokens": 2142,
 "completion_tokens": 374,
 "total_tokens": 2516
 },
 "strategy": "risk",
 "granularity": "semester",
 "cost_usd": 0.000546
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-S04__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "3eb4c01c7fc3f096bd9acb2682381e072412fbe23a2b98d5542a07effc1b8cf1",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2142,
 "completion_tokens": 374,
 "total_tokens": 2516
 },
 "latency_ms": 4602,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-S04",
 "execution_id": "exec_1781847238058_6684c265",
 "explanation": {
 "summary": "The checklist prioritizes Low Score and Low Punctuality because their current values cross the respective risk thresholds; highest severity is high for Low Score because the average score is significantly below the pass threshold. Triggered action rationale: Low Score is triggered with flag_value=36.666666666666664 versus threshold=40; Average score is below the pass threshold for this dataset scale. Existing recommended_action: Review the weakest assessment topics and schedule tutor support before the next assessment. Low Punctuality is triggered with flag_value=0 versus threshold=0.7; Submission punctuality is below the expected threshold. Existing recommended_action: Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "insights": [
 {
 "title": "Why Low Score is High",
 "description": "The average score is 36.67, which is below the pass threshold of 40. This triggered the flag_low_score, indicating a high severity level due to the substantial gap from the expected performance standard. This explains why that visible checklist flag is surfaced in the card.",
 "severity": "high",
 "evidence": [
 {
 "metric": "flag_value",
 "value": 36.666666666666664,
 "comparison": "down_from_previous",
 "delta": null,
 "context": "Threshold is 40"
 }
 ]
 },
 {
 "title": "Why Low Punctuality is Active",
 "description": "The submission punctuality is at 0, which is below the expected threshold of 0.7. This triggered the flag_low_punctuality, resulting in a medium severity level as it indicates a consistent issue with meeting deadlines. This explains why that visible checklist flag is surfaced in the card.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "flag_value",
 "value": 0,
 "comparison": "down_from_previous",
 "delta": null,
 "context": "Threshold is 0.7"
 }
 ]
 }
 ],
 "educational_implications": [],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "Data quality is consistent and reliable based on the provided metrics.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "risk",
 "explanation_type": "risk",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "risk_flags",
 "ai_summary_method_warning": null,
 "full_result_row_count": 4,
 "included_row_count": 4,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "risk_flags",
 "row_count": 4,
 "included_row_count": 4
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 4,
 "baseline_reference_tokens": 384,
 "task_aware_prompt_tokens": 1318,
 "token_ratio": 3.4323,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "Use checklist style: triggered flags first, then non-triggered flags briefly.",
 "For triggered flags, state flag_value versus threshold plus severity, description, support category, and existing recommended_action when supplied.",
 "Do not invent new risk flags or new recommendations outside returned flag evidence.",
 "For every triggered flag, explain the existing recommended_action; do not create a replacement action."
 ],
 "must_keep_keys": [
 "dataset_name",
 "non_triggered_count",
 "non_triggered_flags",
 "recommended_actions",
 "row_count",
 "severity_counts",
 "summarization_warnings",
 "threshold_evidence",
 "total_flags",
 "triggered_count",
 "triggered_flags"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.4323 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "risk_flags",
 "task_id": "A-S04",
 "task_output_contract": [
 "Use checklist style: triggered flags first, then non-triggered flags briefly.",
 "For triggered flags, state flag_value versus threshold plus severity, description, support category, and existing recommended_action when supplied.",
 "Do not invent new risk flags or new recommendations outside returned flag evidence.",
 "For every triggered flag, explain the existing recommended_action; do not create a replacement action."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "risk_flags",
 "row_count": 4,
 "total_flags": 4,
 "triggered_count": 2,
 "non_triggered_count": 2,
 "unknown_triggered_count": 0,
 "severity_available": false
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "highest_severity_triggered": null,
 "triggered_flags": [
 {
 "flag_name": "flag_low_score",
 "triggered": true,
 "flag_description": "Average score is below the pass threshold for this dataset scale.",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment.",
 "support_category": "academic_performance"
 },
 {
 "flag_name": "flag_low_punctuality",
 "triggered": true,
 "flag_description": "Submission punctuality is below the expected threshold.",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "support_category": "time_management"
 }
 ],
 "non_triggered_flags": [
 {
 "flag_name": "flag_high_absence",
 "triggered": false,
 "flag_description": "Absences are within the high-absence risk limit.",
 "recommended_action": "Keep monitoring attendance and confirm there are no new absence spikes.",
 "support_category": "attendance"
 },
 {
 "flag_name": "flag_neg_trend",
 "triggered": false,
 "flag_description": "Scores are maintaining an upward or stable trend across assessments.",
 "recommended_action": "Continue monitoring assessment feedback over time.",
 "support_category": "trend_monitoring"
 }
 ]
 }
 },
 {
 "name": "comparison",
 "facts": {
 "threshold_evidence": [
 {
 "flag_name": "flag_low_score",
 "flag_value": 36.6667,
 "flag_value_raw": 36.666666666666664,
 "threshold": 40,
 "threshold_raw": "40",
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_low_punctuality",
 "flag_value": 0,
 "flag_value_raw": 0,
 "threshold": 0.7,
 "threshold_raw": "0.7",
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_high_absence",
 "flag_value": 4,
 "flag_value_raw": 4,
 "threshold": 10,
 "threshold_raw": "10",
 "triggered": false,
 "triggered_raw": false
 },
 {
 "flag_name": "flag_neg_trend",
 "flag_value": 27.5,
 "flag_value_raw": 27.5,
 "threshold": 0,
 "threshold_raw": "0",
 "triggered": false,
 "triggered_raw": false
 }
 ],
 "severity_counts": {}
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "recommended_actions": [
 {
 "flag_name": "flag_low_score",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment."
 },
 {
 "flag_name": "flag_low_punctuality",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk."
 }
 ]
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
 "summary_type": "risk_flags",
 "dataset_name": "risk_flags",
 "row_count": 4,
 "total_flags": 4,
 "triggered_count": 2,
 "non_triggered_count": 2,
 "unknown_triggered_count": 0,
 "severity_available": false,
 "severity_counts": {},
 "triggered_flags": [
 {
 "flag_name": "flag_low_score",
 "triggered": true,
 "flag_description": "Average score is below the pass threshold for this dataset scale.",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment.",
 "support_category": "academic_performance"
 },
 {
 "flag_name": "flag_low_punctuality",
 "triggered": true,
 "flag_description": "Submission punctuality is below the expected threshold.",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "support_category": "time_management"
 }
 ],
 "non_triggered_flags": [
 {
 "flag_name": "flag_high_absence",
 "triggered": false,
 "flag_description": "Absences are within the high-absence risk limit.",
 "recommended_action": "Keep monitoring attendance and confirm there are no new absence spikes.",
 "support_category": "attendance"
 },
 {
 "flag_name": "flag_neg_trend",
 "triggered": false,
 "flag_description": "Scores are maintaining an upward or stable trend across assessments.",
 "recommended_action": "Continue monitoring assessment feedback over time.",
 "support_category": "trend_monitoring"
 }
 ],
 "highest_severity_triggered": null,
 "threshold_evidence": [
 {
 "flag_name": "flag_low_score",
 "flag_value": 36.6667,
 "flag_value_raw": 36.666666666666664,
 "threshold": 40,
 "threshold_raw": "40",
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_low_punctuality",
 "flag_value": 0,
 "flag_value_raw": 0,
 "threshold": 0.7,
 "threshold_raw": "0.7",
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_high_absence",
 "flag_value": 4,
 "flag_value_raw": 4,
 "threshold": 10,
 "threshold_raw": "10",
 "triggered": false,
 "triggered_raw": false
 },
 {
 "flag_name": "flag_neg_trend",
 "flag_value": 27.5,
 "flag_value_raw": 27.5,
 "threshold": 0,
 "threshold_raw": "0",
 "triggered": false,
 "triggered_raw": false
 }
 ],
 "recommended_actions": [
 {
 "flag_name": "flag_low_score",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment."
 },
 {
 "flag_name": "flag_low_punctuality",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk."
 }
 ],
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4486,
 "token_usage": {
 "prompt_tokens": 2142,
 "completion_tokens": 374,
 "total_tokens": 2516
 },
 "strategy": "risk",
 "granularity": "semester",
 "cost_usd": 0.000546
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
 "observed": "c06bd7d82ba2e9b844a13c63392929a9759f108eb64ee2d323f7be509a59ee53",
 "expected_values": [
 "c06bd7d82ba2e9b844a13c63392929a9759f108eb64ee2d323f7be509a59ee53"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "58167f14f0b163ff69579615d9d4ff87f234fb4c9fe3ba78b8a10a89ce451323",
 "expected": "58167f14f0b163ff69579615d9d4ff87f234fb4c9fe3ba78b8a10a89ce451323"
 },
 {
 "check_id": "numeric_fields_risk_flags",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "risk_flags",
 "numeric_columns": [
 "flag_value"
 ],
 "numeric_summaries": {
 "flag_value": {
 "count": 4,
 "min": 0,
 "max": 36.666666666666664
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_risk_flags",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "risk_flags",
 "flag_columns": [
 "flag_name",
 "flag_value",
 "threshold",
 "triggered",
 "severity",
 "flag_description"
 ],
 "triggered_like_counts": {
 "flag_name": 0,
 "flag_value": 0,
 "threshold": 0,
 "triggered": 2,
 "severity": 0,
 "flag_description": 0
 }
 }
]
```

