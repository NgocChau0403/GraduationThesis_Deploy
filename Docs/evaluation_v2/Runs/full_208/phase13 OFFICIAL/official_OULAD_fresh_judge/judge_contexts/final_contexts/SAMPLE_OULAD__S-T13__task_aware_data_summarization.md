# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T13__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__S-T13__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "S-T13",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Action plan generation",
 "scope": "1 student",
 "actionable_question": "What should I do differently starting next week?",
 "target_audience": "student",
 "ai_summary_type": "action_synthesis",
 "ai_prompt_hint": "Synthesise all [FE] risk signals into 3–5 prioritised actions. Reference which FE feature triggered each item.",
 "query_labels": [
 "synthesis_data"
 ],
 "explanation_strategy": "risk"
}
```

## Schema Context

```json
{
 "source_tables": [
 "enrollment",
 "student"
 ],
 "key_db_fields": [
 "[AI_SYNTHESIS] avg_score [FE cross]",
 "at_risk_score [FE cross]",
 "engagement_score [FE cross]",
 "absence_rate [FE single]",
 "performance_trend [FE cross]",
 "lifestyle_risk_score [FE single]"
 ],
 "output_schema": {},
 "query_labels": [
 "synthesis_data"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "S-T13-CORE-01",
 "description": "Explain the supported actions already generated or exposed by the action_synthesis rule contract; do not require the explanation model to invent actions outside the returned or triggered action set."
 },
 {
 "requirement_id": "S-T13-CORE-02",
 "description": "For each supported action that is present, explain the triggering FE feature, threshold or rule evidence when available."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "S-T13-CONSTRAINT-01",
 "description": "Do not include or endorse actions that reference signals not present in returned data or the supplied action-rule contract."
 },
 {
 "constraint_id": "S-T13-CONSTRAINT-02",
 "description": "Do not invent risk context, urgency, priority, or additional actions unsupported by returned feature-engineered signals or supported action evidence."
 },
 {
 "constraint_id": "S-T13-CONSTRAINT-03",
 "description": "If no supported action is returned or triggered, saying no supported action is available is acceptable; penalize that only when deterministic action evidence shows at least one supported action exists."
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
 "dataset_label": "synthesis_data",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T13.json",
 "artifact_sha256": "b1772902aa8b199ec2800c8504de0f6f1c5ba1cdf36dc8e61c650b6c7eb8a145",
 "row_count": 1,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 1,
 "prompt_embedded_row_count": 1,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "b1772902aa8b199ec2800c8504de0f6f1c5ba1cdf36dc8e61c650b6c7eb8a145",
 "evidence_rows_sha256": "089e746712e922619a14c0564458269d0f52a662ccec3a3dccae5b393362cfac",
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
 "full_result_row_count": 1,
 "embedded_datasets_sha256": "089e746712e922619a14c0564458269d0f52a662ccec3a3dccae5b393362cfac",
 "datasets": {
 "synthesis_data": [
 {
 "avg_score": 94.34,
 "performance_trend": -0.7187500000000001,
 "engagement_score": 0.20237855036820618,
 "engagement_score_available": true,
 "absence_rate": null,
 "lifestyle_risk_score": null,
 "score_strategy": "weighted_by_assessment_weight",
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "at_risk_score": 3,
 "at_risk_label": "high"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T13__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "23e232485e0663cca719c21c437c820526fc524f87358601e8d119b41b5f8073",
 "generator_input_sha256": "4203d4b8cef9caa40c271d7da6dadfb84df9577a9b3834c6985a62b5fcf0b57e",
 "generator_input_compact": {
 "task_id": "S-T13",
 "execution_id": "exec_1781847915613_675e4a46",
 "task_name": "Action plan generation",
 "analysis_type": "synthesis",
 "explanation_strategy": "risk",
 "actionable_question": "What should I do differently starting next week?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "synthesis_data"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "synthesis_data"
 ],
 "dataset_row_counts": {
 "synthesis_data": 1
 },
 "ai_summary_config_summary": {
 "summary_type": "action_synthesis",
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
 "raw_text": "Summary: You have two prioritized actions to help you improve your academic performance. These actions are based on your current situation and the feedback you've received. Triggered supported action provenance: rule_id=S-T13-R06; action_id=student_request_advisor_check_in; owner=student; priority=high; time_horizon_days=3; evidence_item_ids=['ev-synthesis_data-0-at_risk_score', 'ev-synthesis_data-0-at_risk_label']; action=Request a short advisor check-in to review the combined signals and choose the first support step. | rule_id=S-T13-R03; action_id=student_review_recent_assessment_feedback; owner=student; priority=medium; time_horizon_days=7; evidence_item_ids=['ev-synthesis_data-0-performance_trend']; action=Review feedback from your most recent assessments and write down one change to apply next week..\n\nInsights: Advisor Check-In Needed: Requesting a short advisor check-in is crucial as your at-risk score is high, indicating a need for support. This action is prioritized as high and should be completed within 3 days. | Reflect on Assessment Feedback: Reviewing feedback from your recent assessments is important for your growth. This action is medium priority and should be done within 7 days.\n\nWarnings: Conflicting evidence was detected and must remain visible in the generated explanation.",
 "structured_payload": {
 "task_id": "S-T13",
 "execution_id": "exec_1781847915613_675e4a46",
 "explanation": {
 "summary": "You have two prioritized actions to help you improve your academic performance. These actions are based on your current situation and the feedback you've received. Triggered supported action provenance: rule_id=S-T13-R06; action_id=student_request_advisor_check_in; owner=student; priority=high; time_horizon_days=3; evidence_item_ids=['ev-synthesis_data-0-at_risk_score', 'ev-synthesis_data-0-at_risk_label']; action=Request a short advisor check-in to review the combined signals and choose the first support step. | rule_id=S-T13-R03; action_id=student_review_recent_assessment_feedback; owner=student; priority=medium; time_horizon_days=7; evidence_item_ids=['ev-synthesis_data-0-performance_trend']; action=Review feedback from your most recent assessments and write down one change to apply next week..",
 "insights": [
 {
 "title": "Advisor Check-In Needed",
 "description": "Requesting a short advisor check-in is crucial as your at-risk score is high, indicating a need for support. This action is prioritized as high and should be completed within 3 days.",
 "severity": "high",
 "evidence": [
 {
 "metric": "at_risk_score",
 "value": 3,
 "comparison": "baseline",
 "delta": null,
 "context": "High at-risk label indicates significant concern."
 }
 ]
 },
 {
 "title": "Reflect on Assessment Feedback",
 "description": "Reviewing feedback from your recent assessments is important for your growth. This action is medium priority and should be done within 7 days.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "performance_trend",
 "value": -0.71875,
 "comparison": "down_from_previous",
 "delta": null,
 "context": "Negative performance trend suggests a need for change."
 }
 ]
 }
 ],
 "educational_implications": [],
 "recommendations": [],
 "warnings": [
 "Conflicting evidence was detected and must remain visible in the generated explanation."
 ]
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data used to generate these actions is complete and reliable.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "risk",
 "explanation_type": "risk",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "action_synthesis",
 "ai_summary_method_warning": null,
 "full_result_row_count": 1,
 "included_row_count": 1,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "synthesis_data",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 111,
 "task_aware_prompt_tokens": 2789,
 "token_ratio": 25.1261,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "comparison.conflicting_evidence"
 ],
 "task_output_contract": [
 "Explain only actions already present in prioritized_actions or supported action-rule evidence.",
 "Do not create duplicate recommendations; explanation.recommendations may be empty by design.",
 "For every explained action, connect it to rule_evaluations, action_evidence_links, evidence_items, owner, priority, and time horizon when supplied.",
 "If no supported action exists, say that only when missing_evidence/unsupported_actions/rule output supports it.",
 "Explain only prioritized_actions whose rule_evaluation is triggered, preserving action and rule provenance.",
 "If prioritized_actions is empty, explicitly state that no supported action was triggered."
 ],
 "must_keep_keys": [
 "action_evidence_links",
 "action_rule_set_id",
 "action_rule_version",
 "evidence_items",
 "missing_evidence",
 "prioritized_actions",
 "rule_evaluations",
 "source_datasets",
 "summarization_warnings",
 "unsupported_actions"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (25.1261 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "action_synthesis",
 "task_id": "S-T13",
 "task_output_contract": [
 "Explain only actions already present in prioritized_actions or supported action-rule evidence.",
 "Do not create duplicate recommendations; explanation.recommendations may be empty by design.",
 "For every explained action, connect it to rule_evaluations, action_evidence_links, evidence_items, owner, priority, and time horizon when supplied.",
 "If no supported action exists, say that only when missing_evidence/unsupported_actions/rule output supports it.",
 "Explain only prioritized_actions whose rule_evaluation is triggered, preserving action and rule provenance.",
 "If prioritized_actions is empty, explicitly state that no supported action was triggered."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "source_datasets": [
 {
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_count": 1,
 "available": true
 }
 ],
 "action_rule_set_id": "S-T13.action_synthesis",
 "action_rule_version": "1.0.0"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "evidence_items": [
 {
 "evidence_item_id": "ev-synthesis_data-0-avg_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "avg_score",
 "raw_value": 94.34,
 "parsed_value": 94.34,
 "unit": "score_runtime_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-performance_trend",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "performance_trend",
 "raw_value": -0.7187500000000001,
 "parsed_value": -0.71875,
 "unit": "score_change_per_assessment_order",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-engagement_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "engagement_score",
 "raw_value": 0.20237855036820618,
 "parsed_value": 0.2023785504,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "availability_column": "engagement_score_available",
 "availability_raw_value": true
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-engagement_score_available",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "engagement_score_available",
 "raw_value": true,
 "parsed_value": true,
 "unit": "boolean",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-absence_rate",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "absence_rate",
 "raw_value": null,
 "parsed_value": null,
 "unit": "ratio_0_1",
 "available": false,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-lifestyle_risk_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "lifestyle_risk_score",
 "raw_value": null,
 "parsed_value": null,
 "unit": "ratio_0_1",
 "available": false,
 "sensitive": true
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-score_strategy",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "score_strategy",
 "raw_value": "weighted_by_assessment_weight",
 "parsed_value": "weighted_by_assessment_weight",
 "unit": "strategy_identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-score_scale",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "score_scale",
 "raw_value": 100,
 "parsed_value": 100,
 "unit": "score_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-pass_threshold",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "pass_threshold",
 "raw_value": 40,
 "parsed_value": 40,
 "unit": "score_runtime_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-target_threshold",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "target_threshold",
 "raw_value": 70,
 "parsed_value": 70,
 "unit": "score_runtime_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-at_risk_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "at_risk_score",
 "raw_value": 3,
 "parsed_value": 3,
 "unit": "flag_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-at_risk_label",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "at_risk_label",
 "raw_value": "high",
 "parsed_value": "high",
 "unit": "risk_band",
 "available": true,
 "sensitive": false
 }
 ],
 "rule_evaluations": [
 {
 "rule_id": "S-T13-R01",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "avg_score",
 "operator": "lt",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": false,
 "compare_to_evidence_id": "pass_threshold"
 }
 ],
 "any": []
 },
 "evidence_item_ids": [],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R02",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "avg_score",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-avg_score",
 "ev-synthesis_data-0-pass_threshold"
 ],
 "blocked_by_unavailable_evidence": false,
 "compare_to_evidence_id": "pass_threshold"
 },
 {
 "evidence_id": "avg_score",
 "operator": "lt",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": false,
 "compare_to_evidence_id": "target_threshold"
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-avg_score",
 "ev-synthesis_data-0-pass_threshold"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R03",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "performance_trend",
 "operator": "lt",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R04",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "engagement_score_available",
 "operator": "is_true",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-engagement_score_available"
 ],
 "blocked_by_unavailable_evidence": false
 },
 {
 "evidence_id": "engagement_score",
 "operator": "lt",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-engagement_score_available"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R05",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "absence_rate",
 "operator": "gte",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": true,
 "missing_evidence": [
 "absence_rate"
 ]
 }
 ],
 "any": []
 },
 "evidence_item_ids": [],
 "missing_evidence": [
 "absence_rate"
 ],
 "blocked_by_unavailable_evidence": true
 },
 {
 "rule_id": "S-T13-R06",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "at_risk_score",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score"
 ],
 "blocked_by_unavailable_evidence": false
 },
 {
 "evidence_id": "at_risk_label",
 "operator": "eq",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_label"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 }
 ]
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "prioritized_actions": [
 {
 "action_id": "student_request_advisor_check_in",
 "action_text": "Request a short advisor check-in to review the combined signals and choose the first support step.",
 "priority": "high",
 "owner": "student",
 "time_horizon_days": 3,
 "support_category": "support_coordination",
 "claim_limits": [
 "Treat the composite score as a screening signal, not a diagnosis.",
 "Do not use lifestyle_risk_score as action evidence."
 ],
 "rule_id": "S-T13-R06",
 "rule_ids": [
 "S-T13-R06"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "student_review_recent_assessment_feedback",
 "action_text": "Review feedback from your most recent assessments and write down one change to apply next week.",
 "priority": "medium",
 "owner": "student",
 "time_horizon_days": 7,
 "support_category": "reflection",
 "claim_limits": [
 "Do not claim the slope proves future decline.",
 "Do not infer a cause for the trend."
 ],
 "rule_id": "S-T13-R03",
 "rule_ids": [
 "S-T13-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "provenance_status": "complete"
 }
 ],
 "action_evidence_links": [
 {
 "action_id": "student_request_advisor_check_in",
 "rule_id": "S-T13-R06",
 "rule_ids": [
 "S-T13-R06"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "student_review_recent_assessment_feedback",
 "rule_id": "S-T13-R03",
 "rule_ids": [
 "S-T13-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "provenance_status": "complete"
 }
 ]
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_evidence": [
 {
 "evidence_id": "absence_rate",
 "reason": "evidence value is null",
 "dataset_label": "synthesis_data",
 "row_index": 0
 },
 {
 "evidence_id": "lifestyle_risk_score",
 "reason": "evidence value is null",
 "dataset_label": "synthesis_data",
 "row_index": 0
 }
 ],
 "unsupported_actions": [],
 "summarization_warnings": [
 "Conflicting evidence was detected and must remain visible in the generated explanation.",
 "The LLM may paraphrase prioritized_actions but must not invent new actions or rules."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "action_synthesis",
 "action_rule_set_id": "S-T13.action_synthesis",
 "action_rule_version": "1.0.0",
 "source_datasets": [
 {
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_count": 1,
 "available": true
 }
 ],
 "evidence_items": [
 {
 "evidence_item_id": "ev-synthesis_data-0-avg_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "avg_score",
 "raw_value": 94.34,
 "parsed_value": 94.34,
 "unit": "score_runtime_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-performance_trend",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "performance_trend",
 "raw_value": -0.7187500000000001,
 "parsed_value": -0.71875,
 "unit": "score_change_per_assessment_order",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-engagement_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "engagement_score",
 "raw_value": 0.20237855036820618,
 "parsed_value": 0.2023785504,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "availability_column": "engagement_score_available",
 "availability_raw_value": true
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-engagement_score_available",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "engagement_score_available",
 "raw_value": true,
 "parsed_value": true,
 "unit": "boolean",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-absence_rate",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "absence_rate",
 "raw_value": null,
 "parsed_value": null,
 "unit": "ratio_0_1",
 "available": false,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-lifestyle_risk_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "lifestyle_risk_score",
 "raw_value": null,
 "parsed_value": null,
 "unit": "ratio_0_1",
 "available": false,
 "sensitive": true
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-score_strategy",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "score_strategy",
 "raw_value": "weighted_by_assessment_weight",
 "parsed_value": "weighted_by_assessment_weight",
 "unit": "strategy_identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-score_scale",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "score_scale",
 "raw_value": 100,
 "parsed_value": 100,
 "unit": "score_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-pass_threshold",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "pass_threshold",
 "raw_value": 40,
 "parsed_value": 40,
 "unit": "score_runtime_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-target_threshold",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "target_threshold",
 "raw_value": 70,
 "parsed_value": 70,
 "unit": "score_runtime_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-at_risk_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "at_risk_score",
 "raw_value": 3,
 "parsed_value": 3,
 "unit": "flag_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-at_risk_label",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "at_risk_label",
 "raw_value": "high",
 "parsed_value": "high",
 "unit": "risk_band",
 "available": true,
 "sensitive": false
 }
 ],
 "prioritized_actions": [
 {
 "action_id": "student_request_advisor_check_in",
 "action_text": "Request a short advisor check-in to review the combined signals and choose the first support step.",
 "priority": "high",
 "owner": "student",
 "time_horizon_days": 3,
 "support_category": "support_coordination",
 "claim_limits": [
 "Treat the composite score as a screening signal, not a diagnosis.",
 "Do not use lifestyle_risk_score as action evidence."
 ],
 "rule_id": "S-T13-R06",
 "rule_ids": [
 "S-T13-R06"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "student_review_recent_assessment_feedback",
 "action_text": "Review feedback from your most recent assessments and write down one change to apply next week.",
 "priority": "medium",
 "owner": "student",
 "time_horizon_days": 7,
 "support_category": "reflection",
 "claim_limits": [
 "Do not claim the slope proves future decline.",
 "Do not infer a cause for the trend."
 ],
 "rule_id": "S-T13-R03",
 "rule_ids": [
 "S-T13-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "provenance_status": "complete"
 }
 ],
 "action_evidence_links": [
 {
 "action_id": "student_request_advisor_check_in",
 "rule_id": "S-T13-R06",
 "rule_ids": [
 "S-T13-R06"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "student_review_recent_assessment_feedback",
 "rule_id": "S-T13-R03",
 "rule_ids": [
 "S-T13-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "provenance_status": "complete"
 }
 ],
 "unsupported_actions": [],
 "conflicting_evidence": [
 {
 "conflict_id": "S-T13-C01",
 "behavior": "preserve_and_warn",
 "evidence_item_ids": [
 "ev-synthesis_data-0-avg_score",
 "ev-synthesis_data-0-target_threshold",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "warning": "Conflicting evidence is preserved; actions must be phrased with uncertainty and must not hide this conflict."
 }
 ],
 "missing_evidence": [
 {
 "evidence_id": "absence_rate",
 "reason": "evidence value is null",
 "dataset_label": "synthesis_data",
 "row_index": 0
 },
 {
 "evidence_id": "lifestyle_risk_score",
 "reason": "evidence value is null",
 "dataset_label": "synthesis_data",
 "row_index": 0
 }
 ],
 "rule_evaluations": [
 {
 "rule_id": "S-T13-R01",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "avg_score",
 "operator": "lt",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": false,
 "compare_to_evidence_id": "pass_threshold"
 }
 ],
 "any": []
 },
 "evidence_item_ids": [],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R02",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "avg_score",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-avg_score",
 "ev-synthesis_data-0-pass_threshold"
 ],
 "blocked_by_unavailable_evidence": false,
 "compare_to_evidence_id": "pass_threshold"
 },
 {
 "evidence_id": "avg_score",
 "operator": "lt",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": false,
 "compare_to_evidence_id": "target_threshold"
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-avg_score",
 "ev-synthesis_data-0-pass_threshold"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R03",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "performance_trend",
 "operator": "lt",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R04",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "engagement_score_available",
 "operator": "is_true",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-engagement_score_available"
 ],
 "blocked_by_unavailable_evidence": false
 },
 {
 "evidence_id": "engagement_score",
 "operator": "lt",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-engagement_score_available"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R05",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "absence_rate",
 "operator": "gte",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": true,
 "missing_evidence": [
 "absence_rate"
 ]
 }
 ],
 "any": []
 },
 "evidence_item_ids": [],
 "missing_evidence": [
 "absence_rate"
 ],
 "blocked_by_unavailable_evidence": true
 },
 {
 "rule_id": "S-T13-R06",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "at_risk_score",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score"
 ],
 "blocked_by_unavailable_evidence": false
 },
 {
 "evidence_id": "at_risk_label",
 "operator": "eq",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_label"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "summarization_warnings": [
 "Conflicting evidence was detected and must remain visible in the generated explanation.",
 "The LLM may paraphrase prioritized_actions but must not invent new actions or rules."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5276,
 "token_usage": {
 "prompt_tokens": 4089,
 "completion_tokens": 350,
 "total_tokens": 4439
 },
 "strategy": "risk",
 "granularity": "semester",
 "cost_usd": 0.000823
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T13__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "23e232485e0663cca719c21c437c820526fc524f87358601e8d119b41b5f8073",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 4089,
 "completion_tokens": 350,
 "total_tokens": 4439
 },
 "latency_ms": 5282,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-T13",
 "execution_id": "exec_1781847915613_675e4a46",
 "explanation": {
 "summary": "You have two prioritized actions to help you improve your academic performance. These actions are based on your current situation and the feedback you've received. Triggered supported action provenance: rule_id=S-T13-R06; action_id=student_request_advisor_check_in; owner=student; priority=high; time_horizon_days=3; evidence_item_ids=['ev-synthesis_data-0-at_risk_score', 'ev-synthesis_data-0-at_risk_label']; action=Request a short advisor check-in to review the combined signals and choose the first support step. | rule_id=S-T13-R03; action_id=student_review_recent_assessment_feedback; owner=student; priority=medium; time_horizon_days=7; evidence_item_ids=['ev-synthesis_data-0-performance_trend']; action=Review feedback from your most recent assessments and write down one change to apply next week..",
 "insights": [
 {
 "title": "Advisor Check-In Needed",
 "description": "Requesting a short advisor check-in is crucial as your at-risk score is high, indicating a need for support. This action is prioritized as high and should be completed within 3 days.",
 "severity": "high",
 "evidence": [
 {
 "metric": "at_risk_score",
 "value": 3,
 "comparison": "baseline",
 "delta": null,
 "context": "High at-risk label indicates significant concern."
 }
 ]
 },
 {
 "title": "Reflect on Assessment Feedback",
 "description": "Reviewing feedback from your recent assessments is important for your growth. This action is medium priority and should be done within 7 days.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "performance_trend",
 "value": -0.71875,
 "comparison": "down_from_previous",
 "delta": null,
 "context": "Negative performance trend suggests a need for change."
 }
 ]
 }
 ],
 "educational_implications": [],
 "recommendations": [],
 "warnings": [
 "Conflicting evidence was detected and must remain visible in the generated explanation."
 ]
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data used to generate these actions is complete and reliable.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "risk",
 "explanation_type": "risk",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "action_synthesis",
 "ai_summary_method_warning": null,
 "full_result_row_count": 1,
 "included_row_count": 1,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "synthesis_data",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 111,
 "task_aware_prompt_tokens": 2789,
 "token_ratio": 25.1261,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "comparison.conflicting_evidence"
 ],
 "task_output_contract": [
 "Explain only actions already present in prioritized_actions or supported action-rule evidence.",
 "Do not create duplicate recommendations; explanation.recommendations may be empty by design.",
 "For every explained action, connect it to rule_evaluations, action_evidence_links, evidence_items, owner, priority, and time horizon when supplied.",
 "If no supported action exists, say that only when missing_evidence/unsupported_actions/rule output supports it.",
 "Explain only prioritized_actions whose rule_evaluation is triggered, preserving action and rule provenance.",
 "If prioritized_actions is empty, explicitly state that no supported action was triggered."
 ],
 "must_keep_keys": [
 "action_evidence_links",
 "action_rule_set_id",
 "action_rule_version",
 "evidence_items",
 "missing_evidence",
 "prioritized_actions",
 "rule_evaluations",
 "source_datasets",
 "summarization_warnings",
 "unsupported_actions"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (25.1261 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "action_synthesis",
 "task_id": "S-T13",
 "task_output_contract": [
 "Explain only actions already present in prioritized_actions or supported action-rule evidence.",
 "Do not create duplicate recommendations; explanation.recommendations may be empty by design.",
 "For every explained action, connect it to rule_evaluations, action_evidence_links, evidence_items, owner, priority, and time horizon when supplied.",
 "If no supported action exists, say that only when missing_evidence/unsupported_actions/rule output supports it.",
 "Explain only prioritized_actions whose rule_evaluation is triggered, preserving action and rule provenance.",
 "If prioritized_actions is empty, explicitly state that no supported action was triggered."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "source_datasets": [
 {
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_count": 1,
 "available": true
 }
 ],
 "action_rule_set_id": "S-T13.action_synthesis",
 "action_rule_version": "1.0.0"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "evidence_items": [
 {
 "evidence_item_id": "ev-synthesis_data-0-avg_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "avg_score",
 "raw_value": 94.34,
 "parsed_value": 94.34,
 "unit": "score_runtime_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-performance_trend",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "performance_trend",
 "raw_value": -0.7187500000000001,
 "parsed_value": -0.71875,
 "unit": "score_change_per_assessment_order",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-engagement_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "engagement_score",
 "raw_value": 0.20237855036820618,
 "parsed_value": 0.2023785504,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "availability_column": "engagement_score_available",
 "availability_raw_value": true
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-engagement_score_available",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "engagement_score_available",
 "raw_value": true,
 "parsed_value": true,
 "unit": "boolean",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-absence_rate",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "absence_rate",
 "raw_value": null,
 "parsed_value": null,
 "unit": "ratio_0_1",
 "available": false,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-lifestyle_risk_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "lifestyle_risk_score",
 "raw_value": null,
 "parsed_value": null,
 "unit": "ratio_0_1",
 "available": false,
 "sensitive": true
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-score_strategy",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "score_strategy",
 "raw_value": "weighted_by_assessment_weight",
 "parsed_value": "weighted_by_assessment_weight",
 "unit": "strategy_identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-score_scale",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "score_scale",
 "raw_value": 100,
 "parsed_value": 100,
 "unit": "score_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-pass_threshold",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "pass_threshold",
 "raw_value": 40,
 "parsed_value": 40,
 "unit": "score_runtime_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-target_threshold",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "target_threshold",
 "raw_value": 70,
 "parsed_value": 70,
 "unit": "score_runtime_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-at_risk_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "at_risk_score",
 "raw_value": 3,
 "parsed_value": 3,
 "unit": "flag_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-at_risk_label",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "at_risk_label",
 "raw_value": "high",
 "parsed_value": "high",
 "unit": "risk_band",
 "available": true,
 "sensitive": false
 }
 ],
 "rule_evaluations": [
 {
 "rule_id": "S-T13-R01",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "avg_score",
 "operator": "lt",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": false,
 "compare_to_evidence_id": "pass_threshold"
 }
 ],
 "any": []
 },
 "evidence_item_ids": [],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R02",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "avg_score",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-avg_score",
 "ev-synthesis_data-0-pass_threshold"
 ],
 "blocked_by_unavailable_evidence": false,
 "compare_to_evidence_id": "pass_threshold"
 },
 {
 "evidence_id": "avg_score",
 "operator": "lt",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": false,
 "compare_to_evidence_id": "target_threshold"
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-avg_score",
 "ev-synthesis_data-0-pass_threshold"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R03",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "performance_trend",
 "operator": "lt",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R04",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "engagement_score_available",
 "operator": "is_true",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-engagement_score_available"
 ],
 "blocked_by_unavailable_evidence": false
 },
 {
 "evidence_id": "engagement_score",
 "operator": "lt",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-engagement_score_available"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R05",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "absence_rate",
 "operator": "gte",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": true,
 "missing_evidence": [
 "absence_rate"
 ]
 }
 ],
 "any": []
 },
 "evidence_item_ids": [],
 "missing_evidence": [
 "absence_rate"
 ],
 "blocked_by_unavailable_evidence": true
 },
 {
 "rule_id": "S-T13-R06",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "at_risk_score",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score"
 ],
 "blocked_by_unavailable_evidence": false
 },
 {
 "evidence_id": "at_risk_label",
 "operator": "eq",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_label"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 }
 ]
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "prioritized_actions": [
 {
 "action_id": "student_request_advisor_check_in",
 "action_text": "Request a short advisor check-in to review the combined signals and choose the first support step.",
 "priority": "high",
 "owner": "student",
 "time_horizon_days": 3,
 "support_category": "support_coordination",
 "claim_limits": [
 "Treat the composite score as a screening signal, not a diagnosis.",
 "Do not use lifestyle_risk_score as action evidence."
 ],
 "rule_id": "S-T13-R06",
 "rule_ids": [
 "S-T13-R06"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "student_review_recent_assessment_feedback",
 "action_text": "Review feedback from your most recent assessments and write down one change to apply next week.",
 "priority": "medium",
 "owner": "student",
 "time_horizon_days": 7,
 "support_category": "reflection",
 "claim_limits": [
 "Do not claim the slope proves future decline.",
 "Do not infer a cause for the trend."
 ],
 "rule_id": "S-T13-R03",
 "rule_ids": [
 "S-T13-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "provenance_status": "complete"
 }
 ],
 "action_evidence_links": [
 {
 "action_id": "student_request_advisor_check_in",
 "rule_id": "S-T13-R06",
 "rule_ids": [
 "S-T13-R06"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "student_review_recent_assessment_feedback",
 "rule_id": "S-T13-R03",
 "rule_ids": [
 "S-T13-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "provenance_status": "complete"
 }
 ]
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_evidence": [
 {
 "evidence_id": "absence_rate",
 "reason": "evidence value is null",
 "dataset_label": "synthesis_data",
 "row_index": 0
 },
 {
 "evidence_id": "lifestyle_risk_score",
 "reason": "evidence value is null",
 "dataset_label": "synthesis_data",
 "row_index": 0
 }
 ],
 "unsupported_actions": [],
 "summarization_warnings": [
 "Conflicting evidence was detected and must remain visible in the generated explanation.",
 "The LLM may paraphrase prioritized_actions but must not invent new actions or rules."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "action_synthesis",
 "action_rule_set_id": "S-T13.action_synthesis",
 "action_rule_version": "1.0.0",
 "source_datasets": [
 {
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_count": 1,
 "available": true
 }
 ],
 "evidence_items": [
 {
 "evidence_item_id": "ev-synthesis_data-0-avg_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "avg_score",
 "raw_value": 94.34,
 "parsed_value": 94.34,
 "unit": "score_runtime_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-performance_trend",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "performance_trend",
 "raw_value": -0.7187500000000001,
 "parsed_value": -0.71875,
 "unit": "score_change_per_assessment_order",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-engagement_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "engagement_score",
 "raw_value": 0.20237855036820618,
 "parsed_value": 0.2023785504,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "availability_column": "engagement_score_available",
 "availability_raw_value": true
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-engagement_score_available",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "engagement_score_available",
 "raw_value": true,
 "parsed_value": true,
 "unit": "boolean",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-absence_rate",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "absence_rate",
 "raw_value": null,
 "parsed_value": null,
 "unit": "ratio_0_1",
 "available": false,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-lifestyle_risk_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "lifestyle_risk_score",
 "raw_value": null,
 "parsed_value": null,
 "unit": "ratio_0_1",
 "available": false,
 "sensitive": true
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-score_strategy",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "score_strategy",
 "raw_value": "weighted_by_assessment_weight",
 "parsed_value": "weighted_by_assessment_weight",
 "unit": "strategy_identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-score_scale",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "score_scale",
 "raw_value": 100,
 "parsed_value": 100,
 "unit": "score_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-pass_threshold",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "pass_threshold",
 "raw_value": 40,
 "parsed_value": 40,
 "unit": "score_runtime_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-target_threshold",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "target_threshold",
 "raw_value": 70,
 "parsed_value": 70,
 "unit": "score_runtime_scale",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-at_risk_score",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "at_risk_score",
 "raw_value": 3,
 "parsed_value": 3,
 "unit": "flag_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-at_risk_label",
 "task_id": "S-T13",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "at_risk_label",
 "raw_value": "high",
 "parsed_value": "high",
 "unit": "risk_band",
 "available": true,
 "sensitive": false
 }
 ],
 "prioritized_actions": [
 {
 "action_id": "student_request_advisor_check_in",
 "action_text": "Request a short advisor check-in to review the combined signals and choose the first support step.",
 "priority": "high",
 "owner": "student",
 "time_horizon_days": 3,
 "support_category": "support_coordination",
 "claim_limits": [
 "Treat the composite score as a screening signal, not a diagnosis.",
 "Do not use lifestyle_risk_score as action evidence."
 ],
 "rule_id": "S-T13-R06",
 "rule_ids": [
 "S-T13-R06"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "student_review_recent_assessment_feedback",
 "action_text": "Review feedback from your most recent assessments and write down one change to apply next week.",
 "priority": "medium",
 "owner": "student",
 "time_horizon_days": 7,
 "support_category": "reflection",
 "claim_limits": [
 "Do not claim the slope proves future decline.",
 "Do not infer a cause for the trend."
 ],
 "rule_id": "S-T13-R03",
 "rule_ids": [
 "S-T13-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "provenance_status": "complete"
 }
 ],
 "action_evidence_links": [
 {
 "action_id": "student_request_advisor_check_in",
 "rule_id": "S-T13-R06",
 "rule_ids": [
 "S-T13-R06"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "student_review_recent_assessment_feedback",
 "rule_id": "S-T13-R03",
 "rule_ids": [
 "S-T13-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "provenance_status": "complete"
 }
 ],
 "unsupported_actions": [],
 "conflicting_evidence": [
 {
 "conflict_id": "S-T13-C01",
 "behavior": "preserve_and_warn",
 "evidence_item_ids": [
 "ev-synthesis_data-0-avg_score",
 "ev-synthesis_data-0-target_threshold",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "warning": "Conflicting evidence is preserved; actions must be phrased with uncertainty and must not hide this conflict."
 }
 ],
 "missing_evidence": [
 {
 "evidence_id": "absence_rate",
 "reason": "evidence value is null",
 "dataset_label": "synthesis_data",
 "row_index": 0
 },
 {
 "evidence_id": "lifestyle_risk_score",
 "reason": "evidence value is null",
 "dataset_label": "synthesis_data",
 "row_index": 0
 }
 ],
 "rule_evaluations": [
 {
 "rule_id": "S-T13-R01",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "avg_score",
 "operator": "lt",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": false,
 "compare_to_evidence_id": "pass_threshold"
 }
 ],
 "any": []
 },
 "evidence_item_ids": [],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R02",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "avg_score",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-avg_score",
 "ev-synthesis_data-0-pass_threshold"
 ],
 "blocked_by_unavailable_evidence": false,
 "compare_to_evidence_id": "pass_threshold"
 },
 {
 "evidence_id": "avg_score",
 "operator": "lt",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": false,
 "compare_to_evidence_id": "target_threshold"
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-avg_score",
 "ev-synthesis_data-0-pass_threshold"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R03",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "performance_trend",
 "operator": "lt",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-performance_trend"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R04",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "engagement_score_available",
 "operator": "is_true",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-engagement_score_available"
 ],
 "blocked_by_unavailable_evidence": false
 },
 {
 "evidence_id": "engagement_score",
 "operator": "lt",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-engagement_score_available"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "S-T13-R05",
 "rule_version": "1.0.0",
 "matched": false,
 "condition_results": {
 "all": [
 {
 "evidence_id": "absence_rate",
 "operator": "gte",
 "matched": false,
 "evidence_item_ids": [],
 "blocked_by_unavailable_evidence": true,
 "missing_evidence": [
 "absence_rate"
 ]
 }
 ],
 "any": []
 },
 "evidence_item_ids": [],
 "missing_evidence": [
 "absence_rate"
 ],
 "blocked_by_unavailable_evidence": true
 },
 {
 "rule_id": "S-T13-R06",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "at_risk_score",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score"
 ],
 "blocked_by_unavailable_evidence": false
 },
 {
 "evidence_id": "at_risk_label",
 "operator": "eq",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_label"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-at_risk_score",
 "ev-synthesis_data-0-at_risk_label"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "summarization_warnings": [
 "Conflicting evidence was detected and must remain visible in the generated explanation.",
 "The LLM may paraphrase prioritized_actions but must not invent new actions or rules."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5276,
 "token_usage": {
 "prompt_tokens": 4089,
 "completion_tokens": 350,
 "total_tokens": 4439
 },
 "strategy": "risk",
 "granularity": "semester",
 "cost_usd": 0.000823
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
 "expected": 1,
 "observed": 1
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "b1772902aa8b199ec2800c8504de0f6f1c5ba1cdf36dc8e61c650b6c7eb8a145",
 "expected_values": [
 "b1772902aa8b199ec2800c8504de0f6f1c5ba1cdf36dc8e61c650b6c7eb8a145"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "089e746712e922619a14c0564458269d0f52a662ccec3a3dccae5b393362cfac",
 "expected": "089e746712e922619a14c0564458269d0f52a662ccec3a3dccae5b393362cfac"
 },
 {
 "check_id": "numeric_fields_synthesis_data",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "synthesis_data",
 "numeric_columns": [
 "at_risk_score",
 "avg_score",
 "engagement_score",
 "pass_threshold",
 "performance_trend",
 "score_scale",
 "target_threshold"
 ],
 "numeric_summaries": {
 "at_risk_score": {
 "count": 1,
 "min": 3,
 "max": 3
 },
 "avg_score": {
 "count": 1,
 "min": 94.34,
 "max": 94.34
 },
 "engagement_score": {
 "count": 1,
 "min": 0.20237855036820618,
 "max": 0.20237855036820618
 },
 "pass_threshold": {
 "count": 1,
 "min": 40,
 "max": 40
 },
 "performance_trend": {
 "count": 1,
 "min": -0.7187500000000001,
 "max": -0.7187500000000001
 },
 "score_scale": {
 "count": 1,
 "min": 100,
 "max": 100
 },
 "target_threshold": {
 "count": 1,
 "min": 70,
 "max": 70
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_synthesis_data",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "synthesis_data",
 "flag_columns": [
 "lifestyle_risk_score",
 "pass_threshold",
 "target_threshold",
 "at_risk_score",
 "at_risk_label"
 ],
 "triggered_like_counts": {
 "lifestyle_risk_score": 0,
 "pass_threshold": 0,
 "target_threshold": 0,
 "at_risk_score": 0,
 "at_risk_label": 0
 }
 }
]
```
