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

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-B02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__A-B02__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "A-B02",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Completion / outcome summary",
 "scope": "Cohort",
 "actionable_question": "How many students passed, failed, or withdrew?",
 "target_audience": "instructor, admin",
 "ai_summary_type": "categorical_distribution",
 "ai_prompt_hint": "State pass/fail/withdrawal counts. Highlight proportion at-risk.",
 "query_labels": [
 "outcome_counts"
 ],
 "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
 "source_tables": [
 "enrollment"
 ],
 "key_db_fields": [
 "final_outcome",
 "class_id"
 ],
 "output_schema": {},
 "query_labels": [
 "outcome_counts"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-B02-CORE-01",
 "description": "State pass/fail/withdrawal counts."
 },
 {
 "requirement_id": "A-B02-CORE-02",
 "description": "Highlight proportion at-risk."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [],
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
 "dataset_label": "outcome_counts",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-B02.json",
 "artifact_sha256": "5923dd0df5a7aea2d0616762d54d5f5d6dca4afb887f23993711e741c24d2331",
 "row_count": 2,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 2,
 "prompt_embedded_row_count": 2,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "5923dd0df5a7aea2d0616762d54d5f5d6dca4afb887f23993711e741c24d2331",
 "evidence_rows_sha256": "ee852cb8526f5551d764808249be38ee34bac4314e5b2316cfd1b269de1233c7",
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
 "full_result_row_count": 2,
 "embedded_datasets_sha256": "ee852cb8526f5551d764808249be38ee34bac4314e5b2316cfd1b269de1233c7",
 "datasets": {
 "outcome_counts": [
 {
 "final_outcome": "Pass",
 "student_count": 549,
 "pct_of_class": "84.6"
 },
 {
 "final_outcome": "Fail",
 "student_count": 100,
 "pct_of_class": "15.4"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-B02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "d2149a2b7d03fffeeb0a04eb76c0e3ea46deb5517267dde94671b16342d30200",
 "generator_input_sha256": "521c38dae396b6043a0b0a7ecf6f53d41f19a12a1c3b7dff00a8453daf4a4391",
 "generator_input_compact": {
 "task_id": "A-B02",
 "execution_id": "exec_1781847231749_26fbcb91",
 "task_name": "Completion / outcome summary",
 "analysis_type": "aggregation",
 "explanation_strategy": "distribution",
 "actionable_question": "How many students passed, failed, or withdrew?",
 "target_audience": [
 "instructor",
 "admin"
 ],
 "query_labels": [
 "outcome_counts"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "outcome_counts"
 ],
 "dataset_row_counts": {
 "outcome_counts": 2
 },
 "ai_summary_config_summary": {
 "summary_type": "categorical_distribution",
 "metric_column": null,
 "entity_column": null,
 "group_column": null,
 "time_column": null,
 "sort_by": "student_count",
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
 "raw_text": "Summary: Exact returned outcome counts: pass_count=549 (84.6%); fail_count=100 (15.4%); withdrawn_count=0 (0%). The fail share is the returned at-risk outcome proportion.\n\nInsights: High Pass Rate: A substantial 84.6% of students successfully passed the course, indicating effective teaching strategies for the majority. | Notable Fail Rate: 15.4% of students failed, which may indicate areas needing targeted intervention to support at-risk students.\n\nEducational implications: Use the returned fail share as the at-risk outcome proportion; zero withdrawn rows means withdrawn_count=0 for this result, not a data-collection conclusion.\n\nRecommendations: high - Implement targeted support programs for students at risk of failing. - Addressing the 15.4% failure rate can improve overall student outcomes and retention.",
 "structured_payload": {
 "task_id": "A-B02",
 "execution_id": "exec_1781847231749_26fbcb91",
 "explanation": {
 "summary": "Exact returned outcome counts: pass_count=549 (84.6%); fail_count=100 (15.4%); withdrawn_count=0 (0%). The fail share is the returned at-risk outcome proportion.",
 "insights": [
 {
 "title": "High Pass Rate",
 "description": "A substantial 84.6% of students successfully passed the course, indicating effective teaching strategies for the majority.",
 "severity": "low",
 "evidence": [
 {
 "metric": "pct_of_class",
 "value": "84.6",
 "comparison": "baseline",
 "delta": null,
 "context": "Majority of students passed"
 }
 ]
 },
 {
 "title": "Notable Fail Rate",
 "description": "15.4% of students failed, which may indicate areas needing targeted intervention to support at-risk students.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "pct_of_class",
 "value": "15.4",
 "comparison": "baseline",
 "delta": null,
 "context": "Proportion of students who failed"
 }
 ]
 }
 ],
 "educational_implications": [
 "Use the returned fail share as the at-risk outcome proportion; zero withdrawn rows means withdrawn_count=0 for this result, not a data-collection conclusion."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted support programs for students at risk of failing.",
 "rationale": "Addressing the 15.4% failure rate can improve overall student outcomes and retention."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "Data is derived from a complete dataset of final outcomes with clear categorizations.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "categorical_distribution",
 "ai_summary_method_warning": null,
 "full_result_row_count": 2,
 "included_row_count": 2,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "outcome_counts",
 "row_count": 2,
 "included_row_count": 2
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 2,
 "baseline_reference_tokens": 55,
 "task_aware_prompt_tokens": 423,
 "token_ratio": 7.6909,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (7.6909 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "categorical_distribution",
 "task_id": "A-B02",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "outcome_counts",
 "row_count": 2,
 "category_column": "final_outcome",
 "count_column": "student_count",
 "percent_column": "pct_of_class",
 "metric_columns": [],
 "total_count": 649,
 "percent_total": 100,
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ]
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "category_distribution": [
 {
 "category": "Pass",
 "count": 549,
 "percent": 84.6
 },
 {
 "category": "Fail",
 "count": 100,
 "percent": 15.4
 }
 ],
 "focus_total": {
 "categories": [
 "Fail",
 "Withdrawn"
 ],
 "present_categories": [
 "Fail"
 ],
 "missing_categories": [
 "Withdrawn"
 ],
 "count": 100,
 "percent": 15.4
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_evidence_by_category": {}
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "largest_category": {
 "category": "Pass",
 "count": 549,
 "percent": 84.6
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_expected_categories": [
 "Distinction",
 "Withdrawn"
 ],
 "missing_focus_categories": [
 "Withdrawn"
 ],
 "summarization_warnings": [
 "Expected categories missing from dataset: Distinction, Withdrawn",
 "Focus categories missing from dataset: Withdrawn"
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "categorical_distribution",
 "dataset_name": "outcome_counts",
 "row_count": 2,
 "category_column": "final_outcome",
 "count_column": "student_count",
 "percent_column": "pct_of_class",
 "total_count": 649,
 "category_distribution": [
 {
 "category": "Pass",
 "count": 549,
 "percent": 84.6
 },
 {
 "category": "Fail",
 "count": 100,
 "percent": 15.4
 }
 ],
 "largest_category": {
 "category": "Pass",
 "count": 549,
 "percent": 84.6
 },
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_total": {
 "categories": [
 "Fail",
 "Withdrawn"
 ],
 "present_categories": [
 "Fail"
 ],
 "missing_categories": [
 "Withdrawn"
 ],
 "count": 100,
 "percent": 15.4
 },
 "missing_expected_categories": [
 "Distinction",
 "Withdrawn"
 ],
 "missing_focus_categories": [
 "Withdrawn"
 ],
 "metric_columns": [],
 "metric_evidence_by_category": {},
 "summarization_warnings": [
 "Expected categories missing from dataset: Distinction, Withdrawn",
 "Focus categories missing from dataset: Withdrawn"
 ],
 "percent_total": 100
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 7736,
 "token_usage": {
 "prompt_tokens": 902,
 "completion_tokens": 395,
 "total_tokens": 1297
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000372
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-B02__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "d2149a2b7d03fffeeb0a04eb76c0e3ea46deb5517267dde94671b16342d30200",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 902,
 "completion_tokens": 395,
 "total_tokens": 1297
 },
 "latency_ms": 7754,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-B02",
 "execution_id": "exec_1781847231749_26fbcb91",
 "explanation": {
 "summary": "Exact returned outcome counts: pass_count=549 (84.6%); fail_count=100 (15.4%); withdrawn_count=0 (0%). The fail share is the returned at-risk outcome proportion.",
 "insights": [
 {
 "title": "High Pass Rate",
 "description": "A substantial 84.6% of students successfully passed the course, indicating effective teaching strategies for the majority.",
 "severity": "low",
 "evidence": [
 {
 "metric": "pct_of_class",
 "value": "84.6",
 "comparison": "baseline",
 "delta": null,
 "context": "Majority of students passed"
 }
 ]
 },
 {
 "title": "Notable Fail Rate",
 "description": "15.4% of students failed, which may indicate areas needing targeted intervention to support at-risk students.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "pct_of_class",
 "value": "15.4",
 "comparison": "baseline",
 "delta": null,
 "context": "Proportion of students who failed"
 }
 ]
 }
 ],
 "educational_implications": [
 "Use the returned fail share as the at-risk outcome proportion; zero withdrawn rows means withdrawn_count=0 for this result, not a data-collection conclusion."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted support programs for students at risk of failing.",
 "rationale": "Addressing the 15.4% failure rate can improve overall student outcomes and retention."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "Data is derived from a complete dataset of final outcomes with clear categorizations.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "categorical_distribution",
 "ai_summary_method_warning": null,
 "full_result_row_count": 2,
 "included_row_count": 2,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "outcome_counts",
 "row_count": 2,
 "included_row_count": 2
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 2,
 "baseline_reference_tokens": 55,
 "task_aware_prompt_tokens": 423,
 "token_ratio": 7.6909,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "exceptions",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [],
 "must_keep_keys": [],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (7.6909 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "categorical_distribution",
 "task_id": "A-B02",
 "task_output_contract": [],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "outcome_counts",
 "row_count": 2,
 "category_column": "final_outcome",
 "count_column": "student_count",
 "percent_column": "pct_of_class",
 "metric_columns": [],
 "total_count": 649,
 "percent_total": 100,
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ]
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "category_distribution": [
 {
 "category": "Pass",
 "count": 549,
 "percent": 84.6
 },
 {
 "category": "Fail",
 "count": 100,
 "percent": 15.4
 }
 ],
 "focus_total": {
 "categories": [
 "Fail",
 "Withdrawn"
 ],
 "present_categories": [
 "Fail"
 ],
 "missing_categories": [
 "Withdrawn"
 ],
 "count": 100,
 "percent": 15.4
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_evidence_by_category": {}
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "largest_category": {
 "category": "Pass",
 "count": 549,
 "percent": 84.6
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_expected_categories": [
 "Distinction",
 "Withdrawn"
 ],
 "missing_focus_categories": [
 "Withdrawn"
 ],
 "summarization_warnings": [
 "Expected categories missing from dataset: Distinction, Withdrawn",
 "Focus categories missing from dataset: Withdrawn"
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "categorical_distribution",
 "dataset_name": "outcome_counts",
 "row_count": 2,
 "category_column": "final_outcome",
 "count_column": "student_count",
 "percent_column": "pct_of_class",
 "total_count": 649,
 "category_distribution": [
 {
 "category": "Pass",
 "count": 549,
 "percent": 84.6
 },
 {
 "category": "Fail",
 "count": 100,
 "percent": 15.4
 }
 ],
 "largest_category": {
 "category": "Pass",
 "count": 549,
 "percent": 84.6
 },
 "focus_categories": [
 "Fail",
 "Withdrawn"
 ],
 "focus_total": {
 "categories": [
 "Fail",
 "Withdrawn"
 ],
 "present_categories": [
 "Fail"
 ],
 "missing_categories": [
 "Withdrawn"
 ],
 "count": 100,
 "percent": 15.4
 },
 "missing_expected_categories": [
 "Distinction",
 "Withdrawn"
 ],
 "missing_focus_categories": [
 "Withdrawn"
 ],
 "metric_columns": [],
 "metric_evidence_by_category": {},
 "summarization_warnings": [
 "Expected categories missing from dataset: Distinction, Withdrawn",
 "Focus categories missing from dataset: Withdrawn"
 ],
 "percent_total": 100
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 7736,
 "token_usage": {
 "prompt_tokens": 902,
 "completion_tokens": 395,
 "total_tokens": 1297
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000372
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
 "expected": 2,
 "observed": 2
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "5923dd0df5a7aea2d0616762d54d5f5d6dca4afb887f23993711e741c24d2331",
 "expected_values": [
 "5923dd0df5a7aea2d0616762d54d5f5d6dca4afb887f23993711e741c24d2331"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "ee852cb8526f5551d764808249be38ee34bac4314e5b2316cfd1b269de1233c7",
 "expected": "ee852cb8526f5551d764808249be38ee34bac4314e5b2316cfd1b269de1233c7"
 },
 {
 "check_id": "numeric_fields_outcome_counts",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "outcome_counts",
 "numeric_columns": [
 "student_count"
 ],
 "numeric_summaries": {
 "student_count": {
 "count": 2,
 "min": 100,
 "max": 549
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_outcome_counts",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "outcome_counts",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```

