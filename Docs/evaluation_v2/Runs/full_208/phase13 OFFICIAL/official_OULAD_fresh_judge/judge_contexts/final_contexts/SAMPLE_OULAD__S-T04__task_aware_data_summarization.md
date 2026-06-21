# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T04__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__S-T04__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "S-T04",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "At-risk self-check",
 "scope": "1 student",
 "actionable_question": "What specific risk signals are active for me right now?",
 "target_audience": "student",
 "ai_summary_type": "risk_flags",
 "ai_prompt_hint": "Treat this as a checklist: list triggered flags first, then explain each using flag_value vs threshold, severity, flag_description, and recommended_action. Keep non-triggered flags brief.",
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
 "requirement_id": "S-T04-CORE-01",
 "description": "List triggered risk flags first."
 },
 {
 "requirement_id": "S-T04-CORE-02",
 "description": "Explain each triggered flag using its value, threshold, severity, description, and recommended action when available."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "S-T04-CONSTRAINT-01",
 "description": "If no flags are triggered, state that explicitly."
 },
 {
 "constraint_id": "S-T04-CONSTRAINT-02",
 "description": "Keep non-triggered flags brief."
 },
 {
 "constraint_id": "S-T04-CONSTRAINT-03",
 "description": "Do not invent risk signals that are not present in returned flags."
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
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T04.json",
 "artifact_sha256": "fd8f57c1ad223cc2413c58e4b91e84bb6fad3af901618a79dd826a24a9186638",
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
 "evidence_artifact_file_sha256": "fd8f57c1ad223cc2413c58e4b91e84bb6fad3af901618a79dd826a24a9186638",
 "evidence_rows_sha256": "e8eae8e2117c0681ac85697e517661990051974148de614ec7c5df111f926bfa",
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
 "embedded_datasets_sha256": "e8eae8e2117c0681ac85697e517661990051974148de614ec7c5df111f926bfa",
 "datasets": {
 "risk_flags": [
 {
 "flag_name": "flag_low_score",
 "flag_value": 94.34,
 "threshold": 40,
 "triggered": false,
 "severity": "info",
 "flag_description": "Average score is below the pass threshold for this dataset scale.",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment.",
 "support_category": "academic_performance"
 },
 {
 "flag_name": "flag_repeated",
 "flag_value": 1,
 "threshold": 0,
 "triggered": true,
 "severity": "medium",
 "flag_description": "This student has previous attempts, which can indicate accumulated difficulty or re-enrolment risk.",
 "recommended_action": "Check prior attempt context and confirm whether the student needs a catch-up plan.",
 "support_category": "academic_history"
 },
 {
 "flag_name": "flag_low_engagement",
 "flag_value": 0.20237855036820618,
 "threshold": 0.15,
 "triggered": false,
 "severity": "info",
 "flag_description": "Engagement score is above the safety threshold.",
 "recommended_action": "Maintain a consistent weekly study routine and keep using course resources.",
 "support_category": "engagement"
 },
 {
 "flag_name": "flag_low_punctuality",
 "flag_value": 0,
 "threshold": 0.7,
 "triggered": true,
 "severity": "medium",
 "flag_description": "Submission punctuality is below the expected threshold.",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "support_category": "time_management"
 },
 {
 "flag_name": "flag_neg_trend",
 "flag_value": -0.7187500000000001,
 "threshold": 0,
 "triggered": true,
 "severity": "medium",
 "flag_description": "Scores are trending downward across assessments.",
 "recommended_action": "Compare recent feedback with earlier stronger work and intervene before the next assessment.",
 "support_category": "trend_monitoring"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T04__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "dc03769e04f6376ab20d93f237d19d40711bd4f6c4793826767991247cfbb2f0",
 "generator_input_sha256": "c7658bc020fb67122a18ce60cd065b10d2d1c27e72321016d49f3bb2e0ff62a1",
 "generator_input_compact": {
 "task_id": "S-T04",
 "execution_id": "exec_1781847888794_d10c4374",
 "task_name": "At-risk self-check",
 "analysis_type": "ranking",
 "explanation_strategy": "risk",
 "actionable_question": "What specific risk signals are active for me right now?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "risk_flags"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "risk_flags"
 ],
 "dataset_row_counts": {
 "risk_flags": 5
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
 "raw_text": "Summary: You have a few important risk signals that indicate areas where you can improve. These include repeated attempts, low punctuality, and a negative trend in your scores. Addressing these can help you get back on track.\n\nInsights: Repeated Attempts: You have 1 previous attempt, which suggests you may be facing some challenges. This can indicate accumulated difficulty or a risk of re-enrollment. | Low Punctuality: Your submission punctuality is currently at 0, which is below the expected threshold of 0.7. This can lead to late submissions and affect your overall performance. | Negative Trend in Scores: Your scores are trending downward with a value of -0.7188, which is concerning. This suggests that you may need to reassess your study strategies.\n\nEducational implications: It's important to address these areas to improve your academic performance and overall engagement.\n\nRecommendations: high - Check prior attempt context and confirm whether you need a catch-up plan. - Understanding your previous attempts can help identify specific areas where you may need additional support. | high - Use deadline reminders and submit drafts earlier to reduce late-submission risk. - Improving your punctuality can help you manage your workload better and avoid penalties. | high - Compare recent feedback with earlier stronger work and intervene before the next assessment. - This can help you identify what has changed and how to improve your scores moving forward.",
 "structured_payload": {
 "task_id": "S-T04",
 "execution_id": "exec_1781847888794_d10c4374",
 "explanation": {
 "summary": "You have a few important risk signals that indicate areas where you can improve. These include repeated attempts, low punctuality, and a negative trend in your scores. Addressing these can help you get back on track.",
 "insights": [
 {
 "title": "Repeated Attempts",
 "description": "You have 1 previous attempt, which suggests you may be facing some challenges. This can indicate accumulated difficulty or a risk of re-enrollment.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "flag_repeated",
 "value": 1,
 "comparison": "baseline",
 "delta": null,
 "context": "This indicates previous attempts."
 }
 ]
 },
 {
 "title": "Low Punctuality",
 "description": "Your submission punctuality is currently at 0, which is below the expected threshold of 0.7. This can lead to late submissions and affect your overall performance.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "flag_low_punctuality",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "This indicates a need for better time management."
 }
 ]
 },
 {
 "title": "Negative Trend in Scores",
 "description": "Your scores are trending downward with a value of -0.7188, which is concerning. This suggests that you may need to reassess your study strategies.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "flag_neg_trend",
 "value": -0.7188,
 "comparison": "baseline",
 "delta": null,
 "context": "This indicates a decline in performance."
 }
 ]
 }
 ],
 "educational_implications": [
 "It's important to address these areas to improve your academic performance and overall engagement."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Check prior attempt context and confirm whether you need a catch-up plan.",
 "rationale": "Understanding your previous attempts can help identify specific areas where you may need additional support."
 },
 {
 "priority": "high",
 "action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "rationale": "Improving your punctuality can help you manage your workload better and avoid penalties."
 },
 {
 "priority": "high",
 "action": "Compare recent feedback with earlier stronger work and intervene before the next assessment.",
 "rationale": "This can help you identify what has changed and how to improve your scores moving forward."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is clear and indicates specific areas of concern.",
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
 "full_result_row_count": 5,
 "included_row_count": 5,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "risk_flags",
 "row_count": 5,
 "included_row_count": 5
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 5,
 "baseline_reference_tokens": 498,
 "task_aware_prompt_tokens": 1568,
 "token_ratio": 3.1486,
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
 "Do not invent new risk flags or new recommendations outside returned flag evidence."
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.1486 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "risk_flags",
 "task_id": "S-T04",
 "task_output_contract": [
 "Use checklist style: triggered flags first, then non-triggered flags briefly.",
 "For triggered flags, state flag_value versus threshold plus severity, description, support category, and existing recommended_action when supplied.",
 "Do not invent new risk flags or new recommendations outside returned flag evidence."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "risk_flags",
 "row_count": 5,
 "total_flags": 5,
 "triggered_count": 3,
 "non_triggered_count": 2,
 "unknown_triggered_count": 0,
 "severity_available": true
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "highest_severity_triggered": "medium",
 "triggered_flags": [
 {
 "flag_name": "flag_repeated",
 "triggered": true,
 "severity": "medium",
 "flag_description": "This student has previous attempts, which can indicate accumulated difficulty or re-enrolment risk.",
 "recommended_action": "Check prior attempt context and confirm whether the student needs a catch-up plan.",
 "support_category": "academic_history"
 },
 {
 "flag_name": "flag_low_punctuality",
 "triggered": true,
 "severity": "medium",
 "flag_description": "Submission punctuality is below the expected threshold.",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "support_category": "time_management"
 },
 {
 "flag_name": "flag_neg_trend",
 "triggered": true,
 "severity": "medium",
 "flag_description": "Scores are trending downward across assessments.",
 "recommended_action": "Compare recent feedback with earlier stronger work and intervene before the next assessment.",
 "support_category": "trend_monitoring"
 }
 ],
 "non_triggered_flags": [
 {
 "flag_name": "flag_low_score",
 "triggered": false,
 "severity": "info",
 "flag_description": "Average score is below the pass threshold for this dataset scale.",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment.",
 "support_category": "academic_performance"
 },
 {
 "flag_name": "flag_low_engagement",
 "triggered": false,
 "severity": "info",
 "flag_description": "Engagement score is above the safety threshold.",
 "recommended_action": "Maintain a consistent weekly study routine and keep using course resources.",
 "support_category": "engagement"
 }
 ]
 }
 },
 {
 "name": "comparison",
 "facts": {
 "threshold_evidence": [
 {
 "flag_name": "flag_repeated",
 "flag_value": 1,
 "flag_value_raw": 1,
 "threshold": 0,
 "threshold_raw": 0,
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_low_punctuality",
 "flag_value": 0,
 "flag_value_raw": 0,
 "threshold": 0.7,
 "threshold_raw": 0.7,
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_neg_trend",
 "flag_value": -0.7188,
 "flag_value_raw": -0.7187500000000001,
 "threshold": 0,
 "threshold_raw": 0,
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_low_score",
 "flag_value": 94.34,
 "flag_value_raw": 94.34,
 "threshold": 40,
 "threshold_raw": 40,
 "triggered": false,
 "triggered_raw": false
 },
 {
 "flag_name": "flag_low_engagement",
 "flag_value": 0.2024,
 "flag_value_raw": 0.20237855036820618,
 "threshold": 0.15,
 "threshold_raw": 0.15,
 "triggered": false,
 "triggered_raw": false
 }
 ],
 "severity_counts": {
 "info": 2,
 "medium": 3
 }
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "recommended_actions": [
 {
 "flag_name": "flag_repeated",
 "recommended_action": "Check prior attempt context and confirm whether the student needs a catch-up plan."
 },
 {
 "flag_name": "flag_low_punctuality",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk."
 },
 {
 "flag_name": "flag_neg_trend",
 "recommended_action": "Compare recent feedback with earlier stronger work and intervene before the next assessment."
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
 "row_count": 5,
 "total_flags": 5,
 "triggered_count": 3,
 "non_triggered_count": 2,
 "unknown_triggered_count": 0,
 "severity_available": true,
 "severity_counts": {
 "info": 2,
 "medium": 3
 },
 "triggered_flags": [
 {
 "flag_name": "flag_repeated",
 "triggered": true,
 "severity": "medium",
 "flag_description": "This student has previous attempts, which can indicate accumulated difficulty or re-enrolment risk.",
 "recommended_action": "Check prior attempt context and confirm whether the student needs a catch-up plan.",
 "support_category": "academic_history"
 },
 {
 "flag_name": "flag_low_punctuality",
 "triggered": true,
 "severity": "medium",
 "flag_description": "Submission punctuality is below the expected threshold.",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "support_category": "time_management"
 },
 {
 "flag_name": "flag_neg_trend",
 "triggered": true,
 "severity": "medium",
 "flag_description": "Scores are trending downward across assessments.",
 "recommended_action": "Compare recent feedback with earlier stronger work and intervene before the next assessment.",
 "support_category": "trend_monitoring"
 }
 ],
 "non_triggered_flags": [
 {
 "flag_name": "flag_low_score",
 "triggered": false,
 "severity": "info",
 "flag_description": "Average score is below the pass threshold for this dataset scale.",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment.",
 "support_category": "academic_performance"
 },
 {
 "flag_name": "flag_low_engagement",
 "triggered": false,
 "severity": "info",
 "flag_description": "Engagement score is above the safety threshold.",
 "recommended_action": "Maintain a consistent weekly study routine and keep using course resources.",
 "support_category": "engagement"
 }
 ],
 "highest_severity_triggered": "medium",
 "threshold_evidence": [
 {
 "flag_name": "flag_repeated",
 "flag_value": 1,
 "flag_value_raw": 1,
 "threshold": 0,
 "threshold_raw": 0,
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_low_punctuality",
 "flag_value": 0,
 "flag_value_raw": 0,
 "threshold": 0.7,
 "threshold_raw": 0.7,
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_neg_trend",
 "flag_value": -0.7188,
 "flag_value_raw": -0.7187500000000001,
 "threshold": 0,
 "threshold_raw": 0,
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_low_score",
 "flag_value": 94.34,
 "flag_value_raw": 94.34,
 "threshold": 40,
 "threshold_raw": 40,
 "triggered": false,
 "triggered_raw": false
 },
 {
 "flag_name": "flag_low_engagement",
 "flag_value": 0.2024,
 "flag_value_raw": 0.20237855036820618,
 "threshold": 0.15,
 "threshold_raw": 0.15,
 "triggered": false,
 "triggered_raw": false
 }
 ],
 "recommended_actions": [
 {
 "flag_name": "flag_repeated",
 "recommended_action": "Check prior attempt context and confirm whether the student needs a catch-up plan."
 },
 {
 "flag_name": "flag_low_punctuality",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk."
 },
 {
 "flag_name": "flag_neg_trend",
 "recommended_action": "Compare recent feedback with earlier stronger work and intervene before the next assessment."
 }
 ],
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 10137,
 "token_usage": {
 "prompt_tokens": 1940,
 "completion_tokens": 631,
 "total_tokens": 2571
 },
 "strategy": "risk",
 "granularity": "semester",
 "cost_usd": 0.00067
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T04__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "dc03769e04f6376ab20d93f237d19d40711bd4f6c4793826767991247cfbb2f0",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1940,
 "completion_tokens": 631,
 "total_tokens": 2571
 },
 "latency_ms": 10162,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-T04",
 "execution_id": "exec_1781847888794_d10c4374",
 "explanation": {
 "summary": "You have a few important risk signals that indicate areas where you can improve. These include repeated attempts, low punctuality, and a negative trend in your scores. Addressing these can help you get back on track.",
 "insights": [
 {
 "title": "Repeated Attempts",
 "description": "You have 1 previous attempt, which suggests you may be facing some challenges. This can indicate accumulated difficulty or a risk of re-enrollment.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "flag_repeated",
 "value": 1,
 "comparison": "baseline",
 "delta": null,
 "context": "This indicates previous attempts."
 }
 ]
 },
 {
 "title": "Low Punctuality",
 "description": "Your submission punctuality is currently at 0, which is below the expected threshold of 0.7. This can lead to late submissions and affect your overall performance.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "flag_low_punctuality",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "This indicates a need for better time management."
 }
 ]
 },
 {
 "title": "Negative Trend in Scores",
 "description": "Your scores are trending downward with a value of -0.7188, which is concerning. This suggests that you may need to reassess your study strategies.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "flag_neg_trend",
 "value": -0.7188,
 "comparison": "baseline",
 "delta": null,
 "context": "This indicates a decline in performance."
 }
 ]
 }
 ],
 "educational_implications": [
 "It's important to address these areas to improve your academic performance and overall engagement."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Check prior attempt context and confirm whether you need a catch-up plan.",
 "rationale": "Understanding your previous attempts can help identify specific areas where you may need additional support."
 },
 {
 "priority": "high",
 "action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "rationale": "Improving your punctuality can help you manage your workload better and avoid penalties."
 },
 {
 "priority": "high",
 "action": "Compare recent feedback with earlier stronger work and intervene before the next assessment.",
 "rationale": "This can help you identify what has changed and how to improve your scores moving forward."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is clear and indicates specific areas of concern.",
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
 "full_result_row_count": 5,
 "included_row_count": 5,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "risk_flags",
 "row_count": 5,
 "included_row_count": 5
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 5,
 "baseline_reference_tokens": 498,
 "task_aware_prompt_tokens": 1568,
 "token_ratio": 3.1486,
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
 "Do not invent new risk flags or new recommendations outside returned flag evidence."
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.1486 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "risk_flags",
 "task_id": "S-T04",
 "task_output_contract": [
 "Use checklist style: triggered flags first, then non-triggered flags briefly.",
 "For triggered flags, state flag_value versus threshold plus severity, description, support category, and existing recommended_action when supplied.",
 "Do not invent new risk flags or new recommendations outside returned flag evidence."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "risk_flags",
 "row_count": 5,
 "total_flags": 5,
 "triggered_count": 3,
 "non_triggered_count": 2,
 "unknown_triggered_count": 0,
 "severity_available": true
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "highest_severity_triggered": "medium",
 "triggered_flags": [
 {
 "flag_name": "flag_repeated",
 "triggered": true,
 "severity": "medium",
 "flag_description": "This student has previous attempts, which can indicate accumulated difficulty or re-enrolment risk.",
 "recommended_action": "Check prior attempt context and confirm whether the student needs a catch-up plan.",
 "support_category": "academic_history"
 },
 {
 "flag_name": "flag_low_punctuality",
 "triggered": true,
 "severity": "medium",
 "flag_description": "Submission punctuality is below the expected threshold.",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "support_category": "time_management"
 },
 {
 "flag_name": "flag_neg_trend",
 "triggered": true,
 "severity": "medium",
 "flag_description": "Scores are trending downward across assessments.",
 "recommended_action": "Compare recent feedback with earlier stronger work and intervene before the next assessment.",
 "support_category": "trend_monitoring"
 }
 ],
 "non_triggered_flags": [
 {
 "flag_name": "flag_low_score",
 "triggered": false,
 "severity": "info",
 "flag_description": "Average score is below the pass threshold for this dataset scale.",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment.",
 "support_category": "academic_performance"
 },
 {
 "flag_name": "flag_low_engagement",
 "triggered": false,
 "severity": "info",
 "flag_description": "Engagement score is above the safety threshold.",
 "recommended_action": "Maintain a consistent weekly study routine and keep using course resources.",
 "support_category": "engagement"
 }
 ]
 }
 },
 {
 "name": "comparison",
 "facts": {
 "threshold_evidence": [
 {
 "flag_name": "flag_repeated",
 "flag_value": 1,
 "flag_value_raw": 1,
 "threshold": 0,
 "threshold_raw": 0,
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_low_punctuality",
 "flag_value": 0,
 "flag_value_raw": 0,
 "threshold": 0.7,
 "threshold_raw": 0.7,
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_neg_trend",
 "flag_value": -0.7188,
 "flag_value_raw": -0.7187500000000001,
 "threshold": 0,
 "threshold_raw": 0,
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_low_score",
 "flag_value": 94.34,
 "flag_value_raw": 94.34,
 "threshold": 40,
 "threshold_raw": 40,
 "triggered": false,
 "triggered_raw": false
 },
 {
 "flag_name": "flag_low_engagement",
 "flag_value": 0.2024,
 "flag_value_raw": 0.20237855036820618,
 "threshold": 0.15,
 "threshold_raw": 0.15,
 "triggered": false,
 "triggered_raw": false
 }
 ],
 "severity_counts": {
 "info": 2,
 "medium": 3
 }
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "recommended_actions": [
 {
 "flag_name": "flag_repeated",
 "recommended_action": "Check prior attempt context and confirm whether the student needs a catch-up plan."
 },
 {
 "flag_name": "flag_low_punctuality",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk."
 },
 {
 "flag_name": "flag_neg_trend",
 "recommended_action": "Compare recent feedback with earlier stronger work and intervene before the next assessment."
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
 "row_count": 5,
 "total_flags": 5,
 "triggered_count": 3,
 "non_triggered_count": 2,
 "unknown_triggered_count": 0,
 "severity_available": true,
 "severity_counts": {
 "info": 2,
 "medium": 3
 },
 "triggered_flags": [
 {
 "flag_name": "flag_repeated",
 "triggered": true,
 "severity": "medium",
 "flag_description": "This student has previous attempts, which can indicate accumulated difficulty or re-enrolment risk.",
 "recommended_action": "Check prior attempt context and confirm whether the student needs a catch-up plan.",
 "support_category": "academic_history"
 },
 {
 "flag_name": "flag_low_punctuality",
 "triggered": true,
 "severity": "medium",
 "flag_description": "Submission punctuality is below the expected threshold.",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
 "support_category": "time_management"
 },
 {
 "flag_name": "flag_neg_trend",
 "triggered": true,
 "severity": "medium",
 "flag_description": "Scores are trending downward across assessments.",
 "recommended_action": "Compare recent feedback with earlier stronger work and intervene before the next assessment.",
 "support_category": "trend_monitoring"
 }
 ],
 "non_triggered_flags": [
 {
 "flag_name": "flag_low_score",
 "triggered": false,
 "severity": "info",
 "flag_description": "Average score is below the pass threshold for this dataset scale.",
 "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment.",
 "support_category": "academic_performance"
 },
 {
 "flag_name": "flag_low_engagement",
 "triggered": false,
 "severity": "info",
 "flag_description": "Engagement score is above the safety threshold.",
 "recommended_action": "Maintain a consistent weekly study routine and keep using course resources.",
 "support_category": "engagement"
 }
 ],
 "highest_severity_triggered": "medium",
 "threshold_evidence": [
 {
 "flag_name": "flag_repeated",
 "flag_value": 1,
 "flag_value_raw": 1,
 "threshold": 0,
 "threshold_raw": 0,
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_low_punctuality",
 "flag_value": 0,
 "flag_value_raw": 0,
 "threshold": 0.7,
 "threshold_raw": 0.7,
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_neg_trend",
 "flag_value": -0.7188,
 "flag_value_raw": -0.7187500000000001,
 "threshold": 0,
 "threshold_raw": 0,
 "triggered": true,
 "triggered_raw": true
 },
 {
 "flag_name": "flag_low_score",
 "flag_value": 94.34,
 "flag_value_raw": 94.34,
 "threshold": 40,
 "threshold_raw": 40,
 "triggered": false,
 "triggered_raw": false
 },
 {
 "flag_name": "flag_low_engagement",
 "flag_value": 0.2024,
 "flag_value_raw": 0.20237855036820618,
 "threshold": 0.15,
 "threshold_raw": 0.15,
 "triggered": false,
 "triggered_raw": false
 }
 ],
 "recommended_actions": [
 {
 "flag_name": "flag_repeated",
 "recommended_action": "Check prior attempt context and confirm whether the student needs a catch-up plan."
 },
 {
 "flag_name": "flag_low_punctuality",
 "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk."
 },
 {
 "flag_name": "flag_neg_trend",
 "recommended_action": "Compare recent feedback with earlier stronger work and intervene before the next assessment."
 }
 ],
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 10137,
 "token_usage": {
 "prompt_tokens": 1940,
 "completion_tokens": 631,
 "total_tokens": 2571
 },
 "strategy": "risk",
 "granularity": "semester",
 "cost_usd": 0.00067
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
 "observed": "fd8f57c1ad223cc2413c58e4b91e84bb6fad3af901618a79dd826a24a9186638",
 "expected_values": [
 "fd8f57c1ad223cc2413c58e4b91e84bb6fad3af901618a79dd826a24a9186638"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "e8eae8e2117c0681ac85697e517661990051974148de614ec7c5df111f926bfa",
 "expected": "e8eae8e2117c0681ac85697e517661990051974148de614ec7c5df111f926bfa"
 },
 {
 "check_id": "numeric_fields_risk_flags",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "risk_flags",
 "numeric_columns": [
 "flag_value",
 "threshold"
 ],
 "numeric_summaries": {
 "flag_value": {
 "count": 5,
 "min": -0.7187500000000001,
 "max": 94.34
 },
 "threshold": {
 "count": 5,
 "min": 0,
 "max": 40
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
 "triggered": 3,
 "severity": 0,
 "flag_description": 0
 }
 }
]
```
