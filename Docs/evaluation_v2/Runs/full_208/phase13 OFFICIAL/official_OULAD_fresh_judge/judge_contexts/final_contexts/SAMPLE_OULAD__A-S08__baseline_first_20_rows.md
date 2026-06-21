# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S08__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-S08__baseline_first_20_rows",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-S08",
 "explanation_mode": "baseline_first_20_rows",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Student intervention recommendation",
 "scope": "1 student",
 "actionable_question": "What should admin do for this student in the next 7 days?",
 "target_audience": "academic_advisor, admin",
 "ai_summary_type": "action_synthesis",
 "ai_prompt_hint": "Synthesise all [FE] signals into 3–5 admin actions ranked by urgency. Specify who should act (tutor / admin / counsellor) and by when.",
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
 "student",
 "assessment_result",
 "assessment",
 "engagement"
 ],
 "key_db_fields": [
 "[AI_SYNTHESIS] avg_score [FE cross]",
 "at_risk_score [FE cross]",
 "engagement_score [FE cross]",
 "punctuality_rate [FE cross]",
 "performance_trend [FE cross]",
 "early_warning_week [FE cross]",
 "support_score [FE single]"
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
 "requirement_id": "A-S08-CORE-01",
 "description": "Explain the supported admin actions already generated or exposed by the action_synthesis rule contract and rank/describe them by urgency when priority evidence is supplied."
 },
 {
 "requirement_id": "A-S08-CORE-02",
 "description": "For each supported admin action that is present, specify who should act and by when when owner/time-horizon evidence is supplied."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-S08-CONSTRAINT-01",
 "description": "Every explained or proposed action and urgency level must reference returned feature-engineered signals or the supplied action-rule contract."
 },
 {
 "constraint_id": "A-S08-CONSTRAINT-02",
 "description": "Do not invent urgency, owner, time horizon, or additional actions that are not supported by returned signals or supported action evidence."
 },
 {
 "constraint_id": "A-S08-CONSTRAINT-03",
 "description": "If no supported admin action is returned or triggered, saying no supported action is available is acceptable; penalize that only when deterministic action evidence shows at least one supported action exists."
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
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-S08.json",
 "artifact_sha256": "da7abbfd42c0ba32917b47065606de8a89e37c839454984b9beece5f80486d94",
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
 "evidence_artifact_file_sha256": "da7abbfd42c0ba32917b47065606de8a89e37c839454984b9beece5f80486d94",
 "evidence_rows_sha256": "459b368ca8b9b4b70ca088635eb5028dfcdfc702ea6d46aefb1ef3ac7e9ebf78",
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
 "embedded_datasets_sha256": "459b368ca8b9b4b70ca088635eb5028dfcdfc702ea6d46aefb1ef3ac7e9ebf78",
 "datasets": {
 "synthesis_data": [
 {
 "avg_score": 91.2,
 "performance_trend": -0.7187500000000001,
 "engagement_score": 0.20237855036820618,
 "punctuality_rate": "0",
 "early_warning_week": 0,
 "support_score": 0,
 "at_risk_score": 3,
 "at_risk_label": "high",
 "final_outcome": "Distinction"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S08__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "084869da162e420992b7c4fb385961dd1c97816052c77d87f7bbb653702b17f9",
 "generator_input_sha256": "9e64e3766ade560a61ec1eb5d509c684b5500606b13caeb0e4aa9329e38308fe",
 "generator_input_compact": {
 "task_id": "A-S08",
 "execution_id": "exec_1781847835786_81e0a67f",
 "task_name": "Student intervention recommendation",
 "analysis_type": "synthesis",
 "explanation_strategy": "risk",
 "actionable_question": "What should admin do for this student in the next 7 days?",
 "target_audience": [
 "academic_advisor",
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
 "raw_text": "Summary: The student exhibits a high at-risk score despite achieving a distinction, indicating potential underlying issues. Key risk indicators include a declining performance trend and low engagement score, suggesting a need for immediate support.\n\nInsights: Declining Performance Trend: The performance trend shows a significant decline of -0.71875, indicating that the student's academic performance is worsening over time. | Low Engagement Score: The engagement score of 0.2024 is notably low, suggesting that the student may not be actively participating in their learning environment.",
 "structured_payload": {
 "task_id": "A-S08",
 "execution_id": "exec_1781847835786_81e0a67f",
 "explanation": {
 "summary": "The student exhibits a high at-risk score despite achieving a distinction, indicating potential underlying issues. Key risk indicators include a declining performance trend and low engagement score, suggesting a need for immediate support.",
 "insights": [
 {
 "title": "Declining Performance Trend",
 "description": "The performance trend shows a significant decline of -0.71875, indicating that the student's academic performance is worsening over time.",
 "severity": "high",
 "evidence": [
 {
 "metric": "performance_trend",
 "value": -0.71875,
 "comparison": "down_from_previous",
 "delta": -0.71875,
 "context": "Indicates a concerning downward trajectory in performance."
 }
 ]
 },
 {
 "title": "Low Engagement Score",
 "description": "The engagement score of 0.2024 is notably low, suggesting that the student may not be actively participating in their learning environment.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "engagement_score",
 "value": 0.20237855036820618,
 "comparison": "baseline",
 "delta": null,
 "context": "Low engagement could correlate with academic decline."
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
 "reason": "Data is complete and reflects current performance metrics.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "risk",
 "explanation_type": "risk",
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
 "latency_ms": 7547,
 "token_usage": {
 "prompt_tokens": 641,
 "completion_tokens": 493,
 "total_tokens": 1134
 },
 "strategy": "risk",
 "granularity": "semester",
 "cost_usd": 0.000392
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S08__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "084869da162e420992b7c4fb385961dd1c97816052c77d87f7bbb653702b17f9",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "baseline_first_20_rows",
 "observed_ai_summary_method": "baseline_first_20_rows",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 641,
 "completion_tokens": 493,
 "total_tokens": 1134
 },
 "latency_ms": 7550,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-S08",
 "execution_id": "exec_1781847835786_81e0a67f",
 "explanation": {
 "summary": "The student exhibits a high at-risk score despite achieving a distinction, indicating potential underlying issues. Key risk indicators include a declining performance trend and low engagement score, suggesting a need for immediate support.",
 "insights": [
 {
 "title": "Declining Performance Trend",
 "description": "The performance trend shows a significant decline of -0.71875, indicating that the student's academic performance is worsening over time.",
 "severity": "high",
 "evidence": [
 {
 "metric": "performance_trend",
 "value": -0.71875,
 "comparison": "down_from_previous",
 "delta": -0.71875,
 "context": "Indicates a concerning downward trajectory in performance."
 }
 ]
 },
 {
 "title": "Low Engagement Score",
 "description": "The engagement score of 0.2024 is notably low, suggesting that the student may not be actively participating in their learning environment.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "engagement_score",
 "value": 0.20237855036820618,
 "comparison": "baseline",
 "delta": null,
 "context": "Low engagement could correlate with academic decline."
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
 "reason": "Data is complete and reflects current performance metrics.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "risk",
 "explanation_type": "risk",
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
 "latency_ms": 7547,
 "token_usage": {
 "prompt_tokens": 641,
 "completion_tokens": 493,
 "total_tokens": 1134
 },
 "strategy": "risk",
 "granularity": "semester",
 "cost_usd": 0.000392
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
 "observed": "da7abbfd42c0ba32917b47065606de8a89e37c839454984b9beece5f80486d94",
 "expected_values": [
 "da7abbfd42c0ba32917b47065606de8a89e37c839454984b9beece5f80486d94"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "459b368ca8b9b4b70ca088635eb5028dfcdfc702ea6d46aefb1ef3ac7e9ebf78",
 "expected": "459b368ca8b9b4b70ca088635eb5028dfcdfc702ea6d46aefb1ef3ac7e9ebf78"
 },
 {
 "check_id": "numeric_fields_synthesis_data",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "synthesis_data",
 "numeric_columns": [
 "at_risk_score",
 "avg_score",
 "early_warning_week",
 "engagement_score",
 "performance_trend",
 "support_score"
 ],
 "numeric_summaries": {
 "at_risk_score": {
 "count": 1,
 "min": 3,
 "max": 3
 },
 "avg_score": {
 "count": 1,
 "min": 91.2,
 "max": 91.2
 },
 "early_warning_week": {
 "count": 1,
 "min": 0,
 "max": 0
 },
 "engagement_score": {
 "count": 1,
 "min": 0.20237855036820618,
 "max": 0.20237855036820618
 },
 "performance_trend": {
 "count": 1,
 "min": -0.7187500000000001,
 "max": -0.7187500000000001
 },
 "support_score": {
 "count": 1,
 "min": 0,
 "max": 0
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_synthesis_data",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "synthesis_data",
 "flag_columns": [
 "at_risk_score",
 "at_risk_label"
 ],
 "triggered_like_counts": {
 "at_risk_score": 0,
 "at_risk_label": 0
 }
 }
]
```
