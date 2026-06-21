# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G16__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-G16__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G16",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Admin action recommendation",
 "scope": "Many students",
 "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
 "target_audience": "admin",
 "ai_summary_type": "action_synthesis",
 "ai_prompt_hint": "Synthesise all cohort [FE] signals into 3–5 admin actions. This is the most critical AI synthesis task for admin role.",
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
 "assessment_result",
 "assessment",
 "engagement"
 ],
 "key_db_fields": [
 "[AI_SYNTHESIS] low_engagement_count",
 "high_risk_count",
 "hardest_assessment",
 "best_resource_type",
 "total_students"
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
 "requirement_id": "A-G16-CORE-01",
 "description": "Explain the supported cohort-level admin actions already generated or exposed by the action_synthesis rule contract; do not require invented actions outside the returned or triggered action set."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-G16-CONSTRAINT-01",
 "description": "Every explained or recommended action must be grounded in returned cohort feature-engineered signals or the supplied action-rule contract."
 },
 {
 "constraint_id": "A-G16-CONSTRAINT-02",
 "description": "Do not invent urgency, priority, or additional actions without supporting returned data or supported action evidence."
 },
 {
 "constraint_id": "A-G16-CONSTRAINT-03",
 "description": "If no supported cohort-level action is returned or triggered, saying no supported action is available is acceptable; penalize that only when deterministic action evidence shows at least one supported action exists."
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
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G16.json",
 "artifact_sha256": "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224",
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
 "evidence_artifact_file_sha256": "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224",
 "evidence_rows_sha256": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
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
 "embedded_datasets_sha256": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
 "datasets": {
 "synthesis_data": [
 {
 "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "low_engagement_count": 1240,
 "high_risk_count": 906,
 "hardest_assessment": "24299",
 "best_resource_type": "quiz",
 "total_students": 1998
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G16__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "92ee895be7633c9055eee5409f82d7fdcd4ca7ed0d662d5bd45ce9897bcecec1",
 "generator_input_sha256": "3ebc1dd17a178f829f5bf5e74250a920ee55d97b5cbcf78343227aa12be4154f",
 "generator_input_compact": {
 "task_id": "A-G16",
 "execution_id": "exec_1781847803029_391203b0",
 "task_name": "Admin action recommendation",
 "analysis_type": "synthesis",
 "explanation_strategy": "risk",
 "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
 "target_audience": [
 "admin"
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
 "raw_text": "Summary: The prioritized actions focus on addressing low engagement and high-risk student populations through targeted outreach and support reviews. These actions are grounded in evidence indicating significant rates of low engagement and high-risk students. Triggered supported action provenance: rule_id=A-G16-R02; action_id=admin_launch_engagement_outreach; owner=student_support_team; priority=high; time_horizon_days=7; evidence_item_ids=['ev-derived-low_engagement_rate']; action=Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up. | rule_id=A-G16-R01; action_id=admin_review_high_risk_caseload; owner=academic_admin; priority=high; time_horizon_days=7; evidence_item_ids=['ev-derived-high_risk_rate']; action=Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support. | rule_id=A-G16-R03; action_id=admin_review_assessment_support; owner=module_lead; priority=medium; time_horizon_days=14; evidence_item_ids=['ev-synthesis_data-0-hardest_assessment']; action=Ask the module team to review learner support and preparation materials for the identified assessment. | rule_id=A-G16-R04; action_id=admin_review_most_used_resource_format; owner=learning_design_team; priority=low; time_horizon_days=14; evidence_item_ids=['ev-synthesis_data-0-best_resource_type']; action=Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability..\n\nInsights: Low Engagement Rate: The low engagement rate is calculated at approximately 62.06%, indicating a substantial portion of students may not be actively participating in their courses. | High-Risk Student Rate: The high-risk student rate stands at about 45.35%, suggesting a significant number of students may require additional support to succeed.",
 "structured_payload": {
 "task_id": "A-G16",
 "execution_id": "exec_1781847803029_391203b0",
 "explanation": {
 "summary": "The prioritized actions focus on addressing low engagement and high-risk student populations through targeted outreach and support reviews. These actions are grounded in evidence indicating significant rates of low engagement and high-risk students. Triggered supported action provenance: rule_id=A-G16-R02; action_id=admin_launch_engagement_outreach; owner=student_support_team; priority=high; time_horizon_days=7; evidence_item_ids=['ev-derived-low_engagement_rate']; action=Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up. | rule_id=A-G16-R01; action_id=admin_review_high_risk_caseload; owner=academic_admin; priority=high; time_horizon_days=7; evidence_item_ids=['ev-derived-high_risk_rate']; action=Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support. | rule_id=A-G16-R03; action_id=admin_review_assessment_support; owner=module_lead; priority=medium; time_horizon_days=14; evidence_item_ids=['ev-synthesis_data-0-hardest_assessment']; action=Ask the module team to review learner support and preparation materials for the identified assessment. | rule_id=A-G16-R04; action_id=admin_review_most_used_resource_format; owner=learning_design_team; priority=low; time_horizon_days=14; evidence_item_ids=['ev-synthesis_data-0-best_resource_type']; action=Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability..",
 "insights": [
 {
 "title": "Low Engagement Rate",
 "description": "The low engagement rate is calculated at approximately 62.06%, indicating a substantial portion of students may not be actively participating in their courses.",
 "severity": "high",
 "evidence": [
 {
 "metric": "low_engagement_rate",
 "value": 0.6206206206,
 "comparison": "baseline",
 "delta": null,
 "context": "Derived from low engagement count and total students."
 }
 ]
 },
 {
 "title": "High-Risk Student Rate",
 "description": "The high-risk student rate stands at about 45.35%, suggesting a significant number of students may require additional support to succeed.",
 "severity": "high",
 "evidence": [
 {
 "metric": "high_risk_rate",
 "value": 0.4534534535,
 "comparison": "baseline",
 "delta": null,
 "context": "Derived from high risk count and total students."
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
 "reason": "The evidence used to support the actions is complete and directly linked to the identified issues.",
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
 "baseline_reference_tokens": 63,
 "task_aware_prompt_tokens": 2505,
 "token_ratio": 39.7619,
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
 "Explain every triggered prioritized action with rule ID, action ID, owner, priority, time horizon, and linked evidence; recommendations must remain empty."
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (39.7619 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "action_synthesis",
 "task_id": "A-G16",
 "task_output_contract": [
 "Explain only actions already present in prioritized_actions or supported action-rule evidence.",
 "Do not create duplicate recommendations; explanation.recommendations may be empty by design.",
 "For every explained action, connect it to rule_evaluations, action_evidence_links, evidence_items, owner, priority, and time horizon when supplied.",
 "If no supported action exists, say that only when missing_evidence/unsupported_actions/rule output supports it.",
 "Explain every triggered prioritized action with rule ID, action ID, owner, priority, time horizon, and linked evidence; recommendations must remain empty."
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
 "action_rule_set_id": "A-G16.action_synthesis",
 "action_rule_version": "1.0.0"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "evidence_items": [
 {
 "evidence_item_id": "ev-synthesis_data-0-class_id",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "class_id",
 "raw_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "parsed_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "unit": "identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-low_engagement_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "low_engagement_count",
 "raw_value": 1240,
 "parsed_value": 1240,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-high_risk_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "high_risk_count",
 "raw_value": 906,
 "parsed_value": 906,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-hardest_assessment",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "hardest_assessment",
 "raw_value": "24299",
 "parsed_value": 24299,
 "unit": "assessment_identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-best_resource_type",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "best_resource_type",
 "raw_value": "quiz",
 "parsed_value": "quiz",
 "unit": "resource_type",
 "available": true,
 "sensitive": false,
 "semantic_alias": "most_used_resource_type"
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-total_students",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "total_students",
 "raw_value": 1998,
 "parsed_value": 1998,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-derived-low_engagement_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "low_engagement_rate",
 "raw_value": null,
 "parsed_value": 0.6206206206,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "low_engagement_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-low_engagement_count",
 "ev-synthesis_data-0-total_students"
 ]
 },
 {
 "evidence_item_id": "ev-derived-high_risk_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "high_risk_rate",
 "raw_value": null,
 "parsed_value": 0.4534534535,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "high_risk_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-high_risk_count",
 "ev-synthesis_data-0-total_students"
 ]
 }
 ],
 "rule_evaluations": [
 {
 "rule_id": "A-G16-R01",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "high_risk_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R02",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "low_engagement_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R03",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "hardest_assessment",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R04",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "best_resource_type",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
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
 "action_id": "admin_launch_engagement_outreach",
 "action_text": "Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up.",
 "priority": "high",
 "owner": "student_support_team",
 "time_horizon_days": 7,
 "support_category": "engagement_support",
 "claim_limits": [
 "Do not claim low engagement caused low performance.",
 "Do not infer a specific barrier from the aggregate signal."
 ],
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "action_text": "Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support.",
 "priority": "high",
 "owner": "academic_admin",
 "time_horizon_days": 7,
 "support_category": "risk_coordination",
 "claim_limits": [
 "Do not infer causes from the aggregate count.",
 "Do not identify individual students unless a separate student-level evidence source is available."
 ],
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "action_text": "Ask the module team to review learner support and preparation materials for the identified assessment.",
 "priority": "medium",
 "owner": "module_lead",
 "time_horizon_days": 14,
 "support_category": "assessment_support",
 "claim_limits": [
 "Do not state a fail-rate value because the runtime row does not expose it.",
 "Do not claim the assessment itself caused failure."
 ],
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "action_text": "Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability.",
 "priority": "low",
 "owner": "learning_design_team",
 "time_horizon_days": 14,
 "support_category": "resource_planning",
 "claim_limits": [
 "Refer to this field as most-used, not best-performing.",
 "Do not claim engagement clicks demonstrate learning effectiveness."
 ],
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ],
 "action_evidence_links": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ]
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_evidence": [],
 "unsupported_actions": [],
 "summarization_warnings": [
 "The LLM may paraphrase prioritized_actions but must not invent new actions or rules."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "action_synthesis",
 "action_rule_set_id": "A-G16.action_synthesis",
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
 "evidence_item_id": "ev-synthesis_data-0-class_id",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "class_id",
 "raw_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "parsed_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "unit": "identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-low_engagement_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "low_engagement_count",
 "raw_value": 1240,
 "parsed_value": 1240,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-high_risk_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "high_risk_count",
 "raw_value": 906,
 "parsed_value": 906,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-hardest_assessment",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "hardest_assessment",
 "raw_value": "24299",
 "parsed_value": 24299,
 "unit": "assessment_identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-best_resource_type",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "best_resource_type",
 "raw_value": "quiz",
 "parsed_value": "quiz",
 "unit": "resource_type",
 "available": true,
 "sensitive": false,
 "semantic_alias": "most_used_resource_type"
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-total_students",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "total_students",
 "raw_value": 1998,
 "parsed_value": 1998,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-derived-low_engagement_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "low_engagement_rate",
 "raw_value": null,
 "parsed_value": 0.6206206206,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "low_engagement_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-low_engagement_count",
 "ev-synthesis_data-0-total_students"
 ]
 },
 {
 "evidence_item_id": "ev-derived-high_risk_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "high_risk_rate",
 "raw_value": null,
 "parsed_value": 0.4534534535,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "high_risk_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-high_risk_count",
 "ev-synthesis_data-0-total_students"
 ]
 }
 ],
 "prioritized_actions": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "action_text": "Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up.",
 "priority": "high",
 "owner": "student_support_team",
 "time_horizon_days": 7,
 "support_category": "engagement_support",
 "claim_limits": [
 "Do not claim low engagement caused low performance.",
 "Do not infer a specific barrier from the aggregate signal."
 ],
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "action_text": "Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support.",
 "priority": "high",
 "owner": "academic_admin",
 "time_horizon_days": 7,
 "support_category": "risk_coordination",
 "claim_limits": [
 "Do not infer causes from the aggregate count.",
 "Do not identify individual students unless a separate student-level evidence source is available."
 ],
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "action_text": "Ask the module team to review learner support and preparation materials for the identified assessment.",
 "priority": "medium",
 "owner": "module_lead",
 "time_horizon_days": 14,
 "support_category": "assessment_support",
 "claim_limits": [
 "Do not state a fail-rate value because the runtime row does not expose it.",
 "Do not claim the assessment itself caused failure."
 ],
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "action_text": "Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability.",
 "priority": "low",
 "owner": "learning_design_team",
 "time_horizon_days": 14,
 "support_category": "resource_planning",
 "claim_limits": [
 "Refer to this field as most-used, not best-performing.",
 "Do not claim engagement clicks demonstrate learning effectiveness."
 ],
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ],
 "action_evidence_links": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ],
 "unsupported_actions": [],
 "conflicting_evidence": [],
 "missing_evidence": [],
 "rule_evaluations": [
 {
 "rule_id": "A-G16-R01",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "high_risk_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R02",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "low_engagement_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R03",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "hardest_assessment",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R04",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "best_resource_type",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "summarization_warnings": [
 "The LLM may paraphrase prioritized_actions but must not invent new actions or rules."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5325,
 "token_usage": {
 "prompt_tokens": 3569,
 "completion_tokens": 343,
 "total_tokens": 3912
 },
 "strategy": "risk",
 "granularity": "cohort_aggregate",
 "cost_usd": 0.000741
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G16__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "92ee895be7633c9055eee5409f82d7fdcd4ca7ed0d662d5bd45ce9897bcecec1",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 3569,
 "completion_tokens": 343,
 "total_tokens": 3912
 },
 "latency_ms": 5337,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-G16",
 "execution_id": "exec_1781847803029_391203b0",
 "explanation": {
 "summary": "The prioritized actions focus on addressing low engagement and high-risk student populations through targeted outreach and support reviews. These actions are grounded in evidence indicating significant rates of low engagement and high-risk students. Triggered supported action provenance: rule_id=A-G16-R02; action_id=admin_launch_engagement_outreach; owner=student_support_team; priority=high; time_horizon_days=7; evidence_item_ids=['ev-derived-low_engagement_rate']; action=Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up. | rule_id=A-G16-R01; action_id=admin_review_high_risk_caseload; owner=academic_admin; priority=high; time_horizon_days=7; evidence_item_ids=['ev-derived-high_risk_rate']; action=Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support. | rule_id=A-G16-R03; action_id=admin_review_assessment_support; owner=module_lead; priority=medium; time_horizon_days=14; evidence_item_ids=['ev-synthesis_data-0-hardest_assessment']; action=Ask the module team to review learner support and preparation materials for the identified assessment. | rule_id=A-G16-R04; action_id=admin_review_most_used_resource_format; owner=learning_design_team; priority=low; time_horizon_days=14; evidence_item_ids=['ev-synthesis_data-0-best_resource_type']; action=Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability..",
 "insights": [
 {
 "title": "Low Engagement Rate",
 "description": "The low engagement rate is calculated at approximately 62.06%, indicating a substantial portion of students may not be actively participating in their courses.",
 "severity": "high",
 "evidence": [
 {
 "metric": "low_engagement_rate",
 "value": 0.6206206206,
 "comparison": "baseline",
 "delta": null,
 "context": "Derived from low engagement count and total students."
 }
 ]
 },
 {
 "title": "High-Risk Student Rate",
 "description": "The high-risk student rate stands at about 45.35%, suggesting a significant number of students may require additional support to succeed.",
 "severity": "high",
 "evidence": [
 {
 "metric": "high_risk_rate",
 "value": 0.4534534535,
 "comparison": "baseline",
 "delta": null,
 "context": "Derived from high risk count and total students."
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
 "reason": "The evidence used to support the actions is complete and directly linked to the identified issues.",
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
 "baseline_reference_tokens": 63,
 "task_aware_prompt_tokens": 2505,
 "token_ratio": 39.7619,
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
 "Explain every triggered prioritized action with rule ID, action ID, owner, priority, time horizon, and linked evidence; recommendations must remain empty."
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (39.7619 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "action_synthesis",
 "task_id": "A-G16",
 "task_output_contract": [
 "Explain only actions already present in prioritized_actions or supported action-rule evidence.",
 "Do not create duplicate recommendations; explanation.recommendations may be empty by design.",
 "For every explained action, connect it to rule_evaluations, action_evidence_links, evidence_items, owner, priority, and time horizon when supplied.",
 "If no supported action exists, say that only when missing_evidence/unsupported_actions/rule output supports it.",
 "Explain every triggered prioritized action with rule ID, action ID, owner, priority, time horizon, and linked evidence; recommendations must remain empty."
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
 "action_rule_set_id": "A-G16.action_synthesis",
 "action_rule_version": "1.0.0"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "evidence_items": [
 {
 "evidence_item_id": "ev-synthesis_data-0-class_id",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "class_id",
 "raw_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "parsed_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "unit": "identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-low_engagement_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "low_engagement_count",
 "raw_value": 1240,
 "parsed_value": 1240,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-high_risk_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "high_risk_count",
 "raw_value": 906,
 "parsed_value": 906,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-hardest_assessment",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "hardest_assessment",
 "raw_value": "24299",
 "parsed_value": 24299,
 "unit": "assessment_identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-best_resource_type",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "best_resource_type",
 "raw_value": "quiz",
 "parsed_value": "quiz",
 "unit": "resource_type",
 "available": true,
 "sensitive": false,
 "semantic_alias": "most_used_resource_type"
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-total_students",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "total_students",
 "raw_value": 1998,
 "parsed_value": 1998,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-derived-low_engagement_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "low_engagement_rate",
 "raw_value": null,
 "parsed_value": 0.6206206206,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "low_engagement_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-low_engagement_count",
 "ev-synthesis_data-0-total_students"
 ]
 },
 {
 "evidence_item_id": "ev-derived-high_risk_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "high_risk_rate",
 "raw_value": null,
 "parsed_value": 0.4534534535,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "high_risk_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-high_risk_count",
 "ev-synthesis_data-0-total_students"
 ]
 }
 ],
 "rule_evaluations": [
 {
 "rule_id": "A-G16-R01",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "high_risk_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R02",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "low_engagement_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R03",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "hardest_assessment",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R04",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "best_resource_type",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
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
 "action_id": "admin_launch_engagement_outreach",
 "action_text": "Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up.",
 "priority": "high",
 "owner": "student_support_team",
 "time_horizon_days": 7,
 "support_category": "engagement_support",
 "claim_limits": [
 "Do not claim low engagement caused low performance.",
 "Do not infer a specific barrier from the aggregate signal."
 ],
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "action_text": "Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support.",
 "priority": "high",
 "owner": "academic_admin",
 "time_horizon_days": 7,
 "support_category": "risk_coordination",
 "claim_limits": [
 "Do not infer causes from the aggregate count.",
 "Do not identify individual students unless a separate student-level evidence source is available."
 ],
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "action_text": "Ask the module team to review learner support and preparation materials for the identified assessment.",
 "priority": "medium",
 "owner": "module_lead",
 "time_horizon_days": 14,
 "support_category": "assessment_support",
 "claim_limits": [
 "Do not state a fail-rate value because the runtime row does not expose it.",
 "Do not claim the assessment itself caused failure."
 ],
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "action_text": "Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability.",
 "priority": "low",
 "owner": "learning_design_team",
 "time_horizon_days": 14,
 "support_category": "resource_planning",
 "claim_limits": [
 "Refer to this field as most-used, not best-performing.",
 "Do not claim engagement clicks demonstrate learning effectiveness."
 ],
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ],
 "action_evidence_links": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ]
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_evidence": [],
 "unsupported_actions": [],
 "summarization_warnings": [
 "The LLM may paraphrase prioritized_actions but must not invent new actions or rules."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "action_synthesis",
 "action_rule_set_id": "A-G16.action_synthesis",
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
 "evidence_item_id": "ev-synthesis_data-0-class_id",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "class_id",
 "raw_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "parsed_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "unit": "identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-low_engagement_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "low_engagement_count",
 "raw_value": 1240,
 "parsed_value": 1240,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-high_risk_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "high_risk_count",
 "raw_value": 906,
 "parsed_value": 906,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-hardest_assessment",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "hardest_assessment",
 "raw_value": "24299",
 "parsed_value": 24299,
 "unit": "assessment_identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-best_resource_type",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "best_resource_type",
 "raw_value": "quiz",
 "parsed_value": "quiz",
 "unit": "resource_type",
 "available": true,
 "sensitive": false,
 "semantic_alias": "most_used_resource_type"
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-total_students",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "total_students",
 "raw_value": 1998,
 "parsed_value": 1998,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-derived-low_engagement_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "low_engagement_rate",
 "raw_value": null,
 "parsed_value": 0.6206206206,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "low_engagement_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-low_engagement_count",
 "ev-synthesis_data-0-total_students"
 ]
 },
 {
 "evidence_item_id": "ev-derived-high_risk_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "high_risk_rate",
 "raw_value": null,
 "parsed_value": 0.4534534535,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "high_risk_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-high_risk_count",
 "ev-synthesis_data-0-total_students"
 ]
 }
 ],
 "prioritized_actions": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "action_text": "Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up.",
 "priority": "high",
 "owner": "student_support_team",
 "time_horizon_days": 7,
 "support_category": "engagement_support",
 "claim_limits": [
 "Do not claim low engagement caused low performance.",
 "Do not infer a specific barrier from the aggregate signal."
 ],
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "action_text": "Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support.",
 "priority": "high",
 "owner": "academic_admin",
 "time_horizon_days": 7,
 "support_category": "risk_coordination",
 "claim_limits": [
 "Do not infer causes from the aggregate count.",
 "Do not identify individual students unless a separate student-level evidence source is available."
 ],
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "action_text": "Ask the module team to review learner support and preparation materials for the identified assessment.",
 "priority": "medium",
 "owner": "module_lead",
 "time_horizon_days": 14,
 "support_category": "assessment_support",
 "claim_limits": [
 "Do not state a fail-rate value because the runtime row does not expose it.",
 "Do not claim the assessment itself caused failure."
 ],
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "action_text": "Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability.",
 "priority": "low",
 "owner": "learning_design_team",
 "time_horizon_days": 14,
 "support_category": "resource_planning",
 "claim_limits": [
 "Refer to this field as most-used, not best-performing.",
 "Do not claim engagement clicks demonstrate learning effectiveness."
 ],
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ],
 "action_evidence_links": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ],
 "unsupported_actions": [],
 "conflicting_evidence": [],
 "missing_evidence": [],
 "rule_evaluations": [
 {
 "rule_id": "A-G16-R01",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "high_risk_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R02",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "low_engagement_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R03",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "hardest_assessment",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R04",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "best_resource_type",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "summarization_warnings": [
 "The LLM may paraphrase prioritized_actions but must not invent new actions or rules."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5325,
 "token_usage": {
 "prompt_tokens": 3569,
 "completion_tokens": 343,
 "total_tokens": 3912
 },
 "strategy": "risk",
 "granularity": "cohort_aggregate",
 "cost_usd": 0.000741
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
 "observed": "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224",
 "expected_values": [
 "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
 "expected": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013"
 },
 {
 "check_id": "numeric_fields_synthesis_data",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "synthesis_data",
 "numeric_columns": [
 "high_risk_count",
 "low_engagement_count",
 "total_students"
 ],
 "numeric_summaries": {
 "high_risk_count": {
 "count": 1,
 "min": 906,
 "max": 906
 },
 "low_engagement_count": {
 "count": 1,
 "min": 1240,
 "max": 1240
 },
 "total_students": {
 "count": 1,
 "min": 1998,
 "max": 1998
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_synthesis_data",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "synthesis_data",
 "flag_columns": [
 "high_risk_count"
 ],
 "triggered_like_counts": {
 "high_risk_count": 0
 }
 }
]
```
