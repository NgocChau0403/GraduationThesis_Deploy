# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G07__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-G07__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G07",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Factor correlation analysis",
 "scope": "Many students",
 "actionable_question": "What are the strongest predictors of student success in this dataset?",
 "target_audience": "instructor, academic_advisor",
 "ai_summary_type": "ranking",
 "ai_prompt_hint": "Rank top 5 features by correlation with avg_score [FE]. Note dataset-specific features.",
 "query_labels": [
 "factor_correlation_matrix"
 ],
 "explanation_strategy": "correlation"
}
```

## Schema Context

```json
{
 "source_tables": [
 "enrollment",
 "assessment_result",
 "assessment",
 "engagement",
 "student"
 ],
 "key_db_fields": [
 "avg_score [FE cross]",
 "engagement_score [FE cross]",
 "previous_attempt_count",
 "absences",
 "studytime",
 "total_clicks",
 "active_days"
 ],
 "output_schema": {
 "required_columns": [
 "feature_name",
 "correlation_with_avg_score"
 ],
 "optional_columns": [
 "n_samples",
 "abs_correlation_rank"
 ]
 },
 "query_labels": [
 "factor_correlation_matrix"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-G07-CORE-01",
 "description": "Rank top 5 features by correlation with avg_score [FE]."
 },
 {
 "requirement_id": "A-G07-CORE-02",
 "description": "Note dataset-specific features."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-G07-CONSTRAINT-01",
 "description": "When ranked features include sensitive demographic, lifestyle, or socioeconomic attributes, identify their sensitivity and avoid framing correlation as prescriptive guidance."
 },
 {
 "constraint_id": "A-G07-CONSTRAINT-02",
 "description": "Do not interpret feature correlation as causal importance."
 }
 ],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Retained as applicable pending review because ranked factors may include sensitive attributes and may influence intervention policy."
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
 "dataset_label": "factor_correlation_matrix",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G07.json",
 "artifact_sha256": "0074d5e842d5ceb416ec450c5504ef543b2676813a8a94ea760fcab390bca75f",
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
 "evidence_artifact_file_sha256": "0074d5e842d5ceb416ec450c5504ef543b2676813a8a94ea760fcab390bca75f",
 "evidence_rows_sha256": "2d3a648518cb9b29e8d72c217afd44da96b100f0f5576ecd6f348a7c8419fe22",
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
 "embedded_datasets_sha256": "2d3a648518cb9b29e8d72c217afd44da96b100f0f5576ecd6f348a7c8419fe22",
 "datasets": {
 "factor_correlation_matrix": [
 {
 "feature_name": "active_days",
 "correlation_with_avg_score": 0.4181,
 "n_samples": 1998,
 "abs_correlation_rank": 1
 },
 {
 "feature_name": "total_clicks",
 "correlation_with_avg_score": 0.3237,
 "n_samples": 1998,
 "abs_correlation_rank": 2
 },
 {
 "feature_name": "disadvantage_score",
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875,
 "abs_correlation_rank": 3
 },
 {
 "feature_name": "registration_lead_time",
 "correlation_with_avg_score": 0.0017,
 "n_samples": 1988,
 "abs_correlation_rank": 4
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G07__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "6e0da22a4ef511f2736da1489267643ac01c2d91b1e66425424c507417850ce0",
 "generator_input_sha256": "185f44f8be46ccef7d645ccb3c50487c89dced45560b340d20850976cee7f754",
 "generator_input_compact": {
 "task_id": "A-G07",
 "execution_id": "exec_1781847728520_8c1dbd8b",
 "task_name": "Factor correlation analysis",
 "analysis_type": "correlation",
 "explanation_strategy": "correlation",
 "actionable_question": "What are the strongest predictors of student success in this dataset?",
 "target_audience": [
 "instructor",
 "academic_advisor"
 ],
 "query_labels": [
 "factor_correlation_matrix"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "factor_correlation_matrix"
 ],
 "dataset_row_counts": {
 "factor_correlation_matrix": 4
 },
 "ai_summary_config_summary": {
 "summary_type": "ranking",
 "metric_column": "abs_correlation_rank",
 "entity_column": "feature_name",
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
 "raw_text": "Summary: returned_feature_count=4; fifth_feature_status=unavailable; exact ranking: rank=1, feature=active_days, correlation=0.4181, strength=moderate, n_samples=1998 | rank=2, feature=total_clicks, correlation=0.3237, strength=moderate, n_samples=1998 | rank=3, feature=disadvantage_score, correlation=-0.1353, strength=weak, n_samples=1875 | rank=4, feature=registration_lead_time, correlation=0.0017, strength=negligible, n_samples=1988.\n\nEducational implications: Correlations are descriptive, not causal or prescriptive; disadvantage_score is sensitive socioeconomic context.",
 "structured_payload": {
 "task_id": "A-G07",
 "execution_id": "exec_1781847728520_8c1dbd8b",
 "explanation": {
 "summary": "returned_feature_count=4; fifth_feature_status=unavailable; exact ranking: rank=1, feature=active_days, correlation=0.4181, strength=moderate, n_samples=1998 | rank=2, feature=total_clicks, correlation=0.3237, strength=moderate, n_samples=1998 | rank=3, feature=disadvantage_score, correlation=-0.1353, strength=weak, n_samples=1875 | rank=4, feature=registration_lead_time, correlation=0.0017, strength=negligible, n_samples=1988.",
 "insights": [],
 "educational_implications": [
 "Correlations are descriptive, not causal or prescriptive; disadvantage_score is sensitive socioeconomic context."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The dataset is sufficiently large and the correlation coefficients are clearly defined.",
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
 "full_result_row_count": 4,
 "included_row_count": 4,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "factor_correlation_matrix",
 "row_count": 4,
 "included_row_count": 4
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 4,
 "baseline_reference_tokens": 156,
 "task_aware_prompt_tokens": 969,
 "token_ratio": 6.2115,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.tie_warnings",
 "primary_finding.bottom_items",
 "primary_finding.median_item"
 ],
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples.",
 "Rank every returned feature by abs_correlation_rank; if fewer than five are returned, state the exact count and that a fifth feature is unavailable.",
 "Use deterministic strength labels and treat disadvantage_score as sensitive descriptive context; correlation is not causal or prescriptive."
 ],
 "must_keep_keys": [
 "correlation_ranking_evidence",
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.2115 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "ranking",
 "task_id": "A-G07",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples.",
 "Rank every returned feature by abs_correlation_rank; if fewer than five are returned, state the exact count and that a fifth feature is unavailable.",
 "Use deterministic strength labels and treat disadvantage_score as sensitive descriptive context; correlation is not causal or prescriptive."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "factor_correlation_matrix",
 "row_count": 4,
 "entity_column": "feature_name",
 "metric_column": "abs_correlation_rank",
 "sort_direction": "asc"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "top_items": [
 {
 "feature_name": "active_days",
 "abs_correlation_rank": 1,
 "rank": 1,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.4181,
 "n_samples": 1998
 }
 },
 {
 "feature_name": "total_clicks",
 "abs_correlation_rank": 2,
 "rank": 2,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.3237,
 "n_samples": 1998
 }
 },
 {
 "feature_name": "disadvantage_score",
 "abs_correlation_rank": 3,
 "rank": 3,
 "secondary_metrics": {
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875
 }
 },
 {
 "feature_name": "registration_lead_time",
 "abs_correlation_rank": 4,
 "rank": 4,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.0017,
 "n_samples": 1988
 }
 }
 ],
 "correlation_ranking_evidence": {
 "returned_feature_count": 4,
 "fifth_feature_status": "unavailable",
 "features": [
 {
 "feature_name": "active_days",
 "correlation_with_avg_score": 0.4181,
 "n_samples": 1998,
 "abs_correlation_rank": 1
 },
 {
 "feature_name": "total_clicks",
 "correlation_with_avg_score": 0.3237,
 "n_samples": 1998,
 "abs_correlation_rank": 2
 },
 {
 "feature_name": "disadvantage_score",
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875,
 "abs_correlation_rank": 3
 },
 {
 "feature_name": "registration_lead_time",
 "correlation_with_avg_score": 0.0017,
 "n_samples": 1988,
 "abs_correlation_rank": 4
 }
 ],
 "strength_policy": "abs(r)<0.1 negligible; <0.3 weak; <0.5 moderate; otherwise strong",
 "causal_claim_allowed": false
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_stats": {
 "count": 4,
 "min": 1,
 "max": 4,
 "mean": 2.5,
 "median": 2.5
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flag_evidence": []
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
 "dataset_name": "factor_correlation_matrix",
 "row_count": 4,
 "entity_column": "feature_name",
 "metric_column": "abs_correlation_rank",
 "sort_direction": "asc",
 "top_items": [
 {
 "feature_name": "active_days",
 "abs_correlation_rank": 1,
 "rank": 1,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.4181,
 "n_samples": 1998
 }
 },
 {
 "feature_name": "total_clicks",
 "abs_correlation_rank": 2,
 "rank": 2,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.3237,
 "n_samples": 1998
 }
 },
 {
 "feature_name": "disadvantage_score",
 "abs_correlation_rank": 3,
 "rank": 3,
 "secondary_metrics": {
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875
 }
 },
 {
 "feature_name": "registration_lead_time",
 "abs_correlation_rank": 4,
 "rank": 4,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.0017,
 "n_samples": 1988
 }
 }
 ],
 "bottom_items": [
 {
 "feature_name": "total_clicks",
 "abs_correlation_rank": 2,
 "rank": 2,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.3237,
 "n_samples": 1998
 }
 },
 {
 "feature_name": "disadvantage_score",
 "abs_correlation_rank": 3,
 "rank": 3,
 "secondary_metrics": {
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875
 }
 },
 {
 "feature_name": "registration_lead_time",
 "abs_correlation_rank": 4,
 "rank": 4,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.0017,
 "n_samples": 1988
 }
 }
 ],
 "median_item": {
 "feature_name": "disadvantage_score",
 "abs_correlation_rank": 3,
 "rank": 3,
 "secondary_metrics": {
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875
 }
 },
 "metric_stats": {
 "count": 4,
 "min": 1,
 "max": 4,
 "mean": 2.5,
 "median": 2.5
 },
 "tie_warnings": [],
 "flag_evidence": [],
 "summarization_warnings": [],
 "correlation_ranking_evidence": {
 "returned_feature_count": 4,
 "fifth_feature_status": "unavailable",
 "features": [
 {
 "feature_name": "active_days",
 "correlation_with_avg_score": 0.4181,
 "n_samples": 1998,
 "abs_correlation_rank": 1
 },
 {
 "feature_name": "total_clicks",
 "correlation_with_avg_score": 0.3237,
 "n_samples": 1998,
 "abs_correlation_rank": 2
 },
 {
 "feature_name": "disadvantage_score",
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875,
 "abs_correlation_rank": 3
 },
 {
 "feature_name": "registration_lead_time",
 "correlation_with_avg_score": 0.0017,
 "n_samples": 1988,
 "abs_correlation_rank": 4
 }
 ],
 "strength_policy": "abs(r)<0.1 negligible; <0.3 weak; <0.5 moderate; otherwise strong",
 "causal_claim_allowed": false
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 10668,
 "token_usage": {
 "prompt_tokens": 1476,
 "completion_tokens": 623,
 "total_tokens": 2099
 },
 "strategy": "correlation",
 "granularity": "semester",
 "cost_usd": 0.000595
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G07__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "6e0da22a4ef511f2736da1489267643ac01c2d91b1e66425424c507417850ce0",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1476,
 "completion_tokens": 623,
 "total_tokens": 2099
 },
 "latency_ms": 10673,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-G07",
 "execution_id": "exec_1781847728520_8c1dbd8b",
 "explanation": {
 "summary": "returned_feature_count=4; fifth_feature_status=unavailable; exact ranking: rank=1, feature=active_days, correlation=0.4181, strength=moderate, n_samples=1998 | rank=2, feature=total_clicks, correlation=0.3237, strength=moderate, n_samples=1998 | rank=3, feature=disadvantage_score, correlation=-0.1353, strength=weak, n_samples=1875 | rank=4, feature=registration_lead_time, correlation=0.0017, strength=negligible, n_samples=1988.",
 "insights": [],
 "educational_implications": [
 "Correlations are descriptive, not causal or prescriptive; disadvantage_score is sensitive socioeconomic context."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The dataset is sufficiently large and the correlation coefficients are clearly defined.",
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
 "full_result_row_count": 4,
 "included_row_count": 4,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "factor_correlation_matrix",
 "row_count": 4,
 "included_row_count": 4
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 4,
 "baseline_reference_tokens": 156,
 "task_aware_prompt_tokens": 969,
 "token_ratio": 6.2115,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.tie_warnings",
 "primary_finding.bottom_items",
 "primary_finding.median_item"
 ],
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples.",
 "Rank every returned feature by abs_correlation_rank; if fewer than five are returned, state the exact count and that a fifth feature is unavailable.",
 "Use deterministic strength labels and treat disadvantage_score as sensitive descriptive context; correlation is not causal or prescriptive."
 ],
 "must_keep_keys": [
 "correlation_ranking_evidence",
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (6.2115 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "ranking",
 "task_id": "A-G07",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples.",
 "Rank every returned feature by abs_correlation_rank; if fewer than five are returned, state the exact count and that a fifth feature is unavailable.",
 "Use deterministic strength labels and treat disadvantage_score as sensitive descriptive context; correlation is not causal or prescriptive."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "factor_correlation_matrix",
 "row_count": 4,
 "entity_column": "feature_name",
 "metric_column": "abs_correlation_rank",
 "sort_direction": "asc"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "top_items": [
 {
 "feature_name": "active_days",
 "abs_correlation_rank": 1,
 "rank": 1,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.4181,
 "n_samples": 1998
 }
 },
 {
 "feature_name": "total_clicks",
 "abs_correlation_rank": 2,
 "rank": 2,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.3237,
 "n_samples": 1998
 }
 },
 {
 "feature_name": "disadvantage_score",
 "abs_correlation_rank": 3,
 "rank": 3,
 "secondary_metrics": {
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875
 }
 },
 {
 "feature_name": "registration_lead_time",
 "abs_correlation_rank": 4,
 "rank": 4,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.0017,
 "n_samples": 1988
 }
 }
 ],
 "correlation_ranking_evidence": {
 "returned_feature_count": 4,
 "fifth_feature_status": "unavailable",
 "features": [
 {
 "feature_name": "active_days",
 "correlation_with_avg_score": 0.4181,
 "n_samples": 1998,
 "abs_correlation_rank": 1
 },
 {
 "feature_name": "total_clicks",
 "correlation_with_avg_score": 0.3237,
 "n_samples": 1998,
 "abs_correlation_rank": 2
 },
 {
 "feature_name": "disadvantage_score",
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875,
 "abs_correlation_rank": 3
 },
 {
 "feature_name": "registration_lead_time",
 "correlation_with_avg_score": 0.0017,
 "n_samples": 1988,
 "abs_correlation_rank": 4
 }
 ],
 "strength_policy": "abs(r)<0.1 negligible; <0.3 weak; <0.5 moderate; otherwise strong",
 "causal_claim_allowed": false
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_stats": {
 "count": 4,
 "min": 1,
 "max": 4,
 "mean": 2.5,
 "median": 2.5
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flag_evidence": []
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
 "dataset_name": "factor_correlation_matrix",
 "row_count": 4,
 "entity_column": "feature_name",
 "metric_column": "abs_correlation_rank",
 "sort_direction": "asc",
 "top_items": [
 {
 "feature_name": "active_days",
 "abs_correlation_rank": 1,
 "rank": 1,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.4181,
 "n_samples": 1998
 }
 },
 {
 "feature_name": "total_clicks",
 "abs_correlation_rank": 2,
 "rank": 2,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.3237,
 "n_samples": 1998
 }
 },
 {
 "feature_name": "disadvantage_score",
 "abs_correlation_rank": 3,
 "rank": 3,
 "secondary_metrics": {
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875
 }
 },
 {
 "feature_name": "registration_lead_time",
 "abs_correlation_rank": 4,
 "rank": 4,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.0017,
 "n_samples": 1988
 }
 }
 ],
 "bottom_items": [
 {
 "feature_name": "total_clicks",
 "abs_correlation_rank": 2,
 "rank": 2,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.3237,
 "n_samples": 1998
 }
 },
 {
 "feature_name": "disadvantage_score",
 "abs_correlation_rank": 3,
 "rank": 3,
 "secondary_metrics": {
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875
 }
 },
 {
 "feature_name": "registration_lead_time",
 "abs_correlation_rank": 4,
 "rank": 4,
 "secondary_metrics": {
 "correlation_with_avg_score": 0.0017,
 "n_samples": 1988
 }
 }
 ],
 "median_item": {
 "feature_name": "disadvantage_score",
 "abs_correlation_rank": 3,
 "rank": 3,
 "secondary_metrics": {
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875
 }
 },
 "metric_stats": {
 "count": 4,
 "min": 1,
 "max": 4,
 "mean": 2.5,
 "median": 2.5
 },
 "tie_warnings": [],
 "flag_evidence": [],
 "summarization_warnings": [],
 "correlation_ranking_evidence": {
 "returned_feature_count": 4,
 "fifth_feature_status": "unavailable",
 "features": [
 {
 "feature_name": "active_days",
 "correlation_with_avg_score": 0.4181,
 "n_samples": 1998,
 "abs_correlation_rank": 1
 },
 {
 "feature_name": "total_clicks",
 "correlation_with_avg_score": 0.3237,
 "n_samples": 1998,
 "abs_correlation_rank": 2
 },
 {
 "feature_name": "disadvantage_score",
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875,
 "abs_correlation_rank": 3
 },
 {
 "feature_name": "registration_lead_time",
 "correlation_with_avg_score": 0.0017,
 "n_samples": 1988,
 "abs_correlation_rank": 4
 }
 ],
 "strength_policy": "abs(r)<0.1 negligible; <0.3 weak; <0.5 moderate; otherwise strong",
 "causal_claim_allowed": false
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 10668,
 "token_usage": {
 "prompt_tokens": 1476,
 "completion_tokens": 623,
 "total_tokens": 2099
 },
 "strategy": "correlation",
 "granularity": "semester",
 "cost_usd": 0.000595
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
 "observed": "0074d5e842d5ceb416ec450c5504ef543b2676813a8a94ea760fcab390bca75f",
 "expected_values": [
 "0074d5e842d5ceb416ec450c5504ef543b2676813a8a94ea760fcab390bca75f"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "2d3a648518cb9b29e8d72c217afd44da96b100f0f5576ecd6f348a7c8419fe22",
 "expected": "2d3a648518cb9b29e8d72c217afd44da96b100f0f5576ecd6f348a7c8419fe22"
 },
 {
 "check_id": "ranking_factor_correlation_matrix_abs_correlation_rank",
 "check_type": "ranking",
 "status": "pass",
 "dataset_label": "factor_correlation_matrix",
 "rank_column": "abs_correlation_rank",
 "ranked_row_count": 4,
 "duplicate_rank_count": 0,
 "top_rows": [
 {
 "feature_name": "active_days",
 "correlation_with_avg_score": 0.4181,
 "n_samples": 1998,
 "abs_correlation_rank": 1
 },
 {
 "feature_name": "total_clicks",
 "correlation_with_avg_score": 0.3237,
 "n_samples": 1998,
 "abs_correlation_rank": 2
 },
 {
 "feature_name": "disadvantage_score",
 "correlation_with_avg_score": -0.1353,
 "n_samples": 1875,
 "abs_correlation_rank": 3
 },
 {
 "feature_name": "registration_lead_time",
 "correlation_with_avg_score": 0.0017,
 "n_samples": 1988,
 "abs_correlation_rank": 4
 }
 ]
 },
 {
 "check_id": "numeric_fields_factor_correlation_matrix",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "factor_correlation_matrix",
 "numeric_columns": [
 "abs_correlation_rank",
 "correlation_with_avg_score",
 "n_samples"
 ],
 "numeric_summaries": {
 "abs_correlation_rank": {
 "count": 4,
 "min": 1,
 "max": 4
 },
 "correlation_with_avg_score": {
 "count": 4,
 "min": -0.1353,
 "max": 0.4181
 },
 "n_samples": {
 "count": 4,
 "min": 1875,
 "max": 1998
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_factor_correlation_matrix",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "factor_correlation_matrix",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```
