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

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C05__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__A-C05__baseline_first_20_rows",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "A-C05",
 "explanation_mode": "baseline_first_20_rows",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Compare academic background",
 "scope": "2 students",
 "actionable_question": "Does one student face more structural disadvantage than the other?",
 "target_audience": "academic_advisor",
 "ai_summary_type": "multi_metric_comparison",
 "ai_prompt_hint": "Identify background-driven performance differences. Avoid causal claims.",
 "query_labels": [
 "background_comparison"
 ],
 "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
 "source_tables": [
 "student",
 "enrollment"
 ],
 "key_db_fields": [
 "highest_education",
 "previous_attempt_count",
 "imd_score_numeric",
 "socioeconomic_band",
 "disability_flag",
 "disadvantage_score [FE single]",
 "support_score [FE single]",
 "family_stability_score [FE single]"
 ],
 "output_schema": {},
 "query_labels": [
 "background_comparison"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-C05-CORE-01",
 "description": "Identify background-driven performance differences."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-C05-CONSTRAINT-01",
 "description": "Avoid causal claims."
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
 "dataset_label": "background_comparison",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-C05.json",
 "artifact_sha256": "255d44b8db1c6f7c9f3050f88ca33b6dbf8e435493d83a871ffaf61513400e7c",
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
 "evidence_artifact_file_sha256": "255d44b8db1c6f7c9f3050f88ca33b6dbf8e435493d83a871ffaf61513400e7c",
 "evidence_rows_sha256": "ea264e7bf6e16912946cd57c73676e94fe583b4905823c82b6d6e8c24ead5d6f",
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
 "embedded_datasets_sha256": "ea264e7bf6e16912946cd57c73676e94fe583b4905823c82b6d6e8c24ead5d6f",
 "datasets": {
 "background_comparison": [
 {
 "student_id": "SAMPLE_UCI_POR_STU_000001",
 "highest_education": "Parent education 4/4",
 "previous_attempt_count": 0,
 "imd_score_numeric": null,
 "socioeconomic_band": null,
 "disability_flag": null,
 "disadvantage_score": 0.2,
 "support_score": 0.25,
 "family_stability_score": 0.575,
 "mother_education_level": "4",
 "father_education_level": "4"
 },
 {
 "student_id": "SAMPLE_UCI_POR_STU_000002",
 "highest_education": "Parent education 1/4",
 "previous_attempt_count": 0,
 "imd_score_numeric": null,
 "socioeconomic_band": null,
 "disability_flag": null,
 "disadvantage_score": 0.4,
 "support_score": 0.5,
 "family_stability_score": 0.8500000000000001,
 "mother_education_level": "1",
 "father_education_level": "1"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C05__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "3a54241aa0c47fe93d7e5b808f72a8290880cd07a811ead3acb73418dd769ccb",
 "generator_input_sha256": "b7295f00f33cc80a8848b0b9f88109e7d915c4ac9b0500f8a4ef44b2a91628a6",
 "generator_input_compact": {
 "task_id": "A-C05",
 "execution_id": "exec_1781847232057_25cc847c",
 "task_name": "Compare academic background",
 "analysis_type": "comparison",
 "explanation_strategy": "comparison",
 "actionable_question": "Does one student face more structural disadvantage than the other?",
 "target_audience": [
 "academic_advisor"
 ],
 "query_labels": [
 "background_comparison"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "background_comparison"
 ],
 "dataset_row_counts": {
 "background_comparison": 2
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
 "require_sensitive_context_policy": true,
 "require_complete_action_provenance": true
 }
 }
}
```

## AI Explanation To Judge

```json
{
 "raw_text": "Summary: The comparison of the two students reveals significant differences in their educational backgrounds, particularly in parental education levels and associated disadvantage scores. Student 1 has a higher parental education level and lower disadvantage score compared to Student 2.\n\nInsights: Parental Education Level: Student 1 has a higher parental education level compared to Student 2, which may indicate a more supportive academic environment. | Disadvantage Score: Student 1 has a lower disadvantage score than Student 2, suggesting that Student 1 faces fewer structural disadvantages.\n\nEducational implications: Students with higher parental education levels may have better access to resources and support, impacting their academic performance.\n\nRecommendations: high - Provide additional support to Student 2 - Given the higher disadvantage score, Student 2 may benefit from targeted academic support to mitigate structural disadvantages.",
 "structured_payload": {
 "task_id": "A-C05",
 "execution_id": "exec_1781847232057_25cc847c",
 "explanation": {
 "summary": "The comparison of the two students reveals significant differences in their educational backgrounds, particularly in parental education levels and associated disadvantage scores. Student 1 has a higher parental education level and lower disadvantage score compared to Student 2.",
 "insights": [
 {
 "title": "Parental Education Level",
 "description": "Student 1 has a higher parental education level compared to Student 2, which may indicate a more supportive academic environment.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "mother_education_level",
 "value": "4",
 "comparison": "baseline",
 "delta": 3,
 "context": "Student 1's mother has a higher education level than Student 2's mother."
 },
 {
 "metric": "father_education_level",
 "value": "4",
 "comparison": "baseline",
 "delta": 3,
 "context": "Student 1's father has a higher education level than Student 2's father."
 }
 ]
 },
 {
 "title": "Disadvantage Score",
 "description": "Student 1 has a lower disadvantage score than Student 2, suggesting that Student 1 faces fewer structural disadvantages.",
 "severity": "high",
 "evidence": [
 {
 "metric": "disadvantage_score",
 "value": 0.2,
 "comparison": "baseline",
 "delta": -0.2,
 "context": "Student 1's disadvantage score is significantly lower than Student 2's."
 }
 ]
 }
 ],
 "educational_implications": [
 "Students with higher parental education levels may have better access to resources and support, impacting their academic performance."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Provide additional support to Student 2",
 "rationale": "Given the higher disadvantage score, Student 2 may benefit from targeted academic support to mitigate structural disadvantages."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is complete and directly comparable between the two students.",
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
 "latency_ms": 7814,
 "token_usage": {
 "prompt_tokens": 762,
 "completion_tokens": 480,
 "total_tokens": 1242
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000402
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C05__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "3a54241aa0c47fe93d7e5b808f72a8290880cd07a811ead3acb73418dd769ccb",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "baseline_first_20_rows",
 "observed_ai_summary_method": "baseline_first_20_rows",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 762,
 "completion_tokens": 480,
 "total_tokens": 1242
 },
 "latency_ms": 7822,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-C05",
 "execution_id": "exec_1781847232057_25cc847c",
 "explanation": {
 "summary": "The comparison of the two students reveals significant differences in their educational backgrounds, particularly in parental education levels and associated disadvantage scores. Student 1 has a higher parental education level and lower disadvantage score compared to Student 2.",
 "insights": [
 {
 "title": "Parental Education Level",
 "description": "Student 1 has a higher parental education level compared to Student 2, which may indicate a more supportive academic environment.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "mother_education_level",
 "value": "4",
 "comparison": "baseline",
 "delta": 3,
 "context": "Student 1's mother has a higher education level than Student 2's mother."
 },
 {
 "metric": "father_education_level",
 "value": "4",
 "comparison": "baseline",
 "delta": 3,
 "context": "Student 1's father has a higher education level than Student 2's father."
 }
 ]
 },
 {
 "title": "Disadvantage Score",
 "description": "Student 1 has a lower disadvantage score than Student 2, suggesting that Student 1 faces fewer structural disadvantages.",
 "severity": "high",
 "evidence": [
 {
 "metric": "disadvantage_score",
 "value": 0.2,
 "comparison": "baseline",
 "delta": -0.2,
 "context": "Student 1's disadvantage score is significantly lower than Student 2's."
 }
 ]
 }
 ],
 "educational_implications": [
 "Students with higher parental education levels may have better access to resources and support, impacting their academic performance."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Provide additional support to Student 2",
 "rationale": "Given the higher disadvantage score, Student 2 may benefit from targeted academic support to mitigate structural disadvantages."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is complete and directly comparable between the two students.",
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
 "latency_ms": 7814,
 "token_usage": {
 "prompt_tokens": 762,
 "completion_tokens": 480,
 "total_tokens": 1242
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000402
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
 "observed": "255d44b8db1c6f7c9f3050f88ca33b6dbf8e435493d83a871ffaf61513400e7c",
 "expected_values": [
 "255d44b8db1c6f7c9f3050f88ca33b6dbf8e435493d83a871ffaf61513400e7c"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "ea264e7bf6e16912946cd57c73676e94fe583b4905823c82b6d6e8c24ead5d6f",
 "expected": "ea264e7bf6e16912946cd57c73676e94fe583b4905823c82b6d6e8c24ead5d6f"
 },
 {
 "check_id": "numeric_fields_background_comparison",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "background_comparison",
 "numeric_columns": [
 "disadvantage_score",
 "family_stability_score",
 "previous_attempt_count",
 "support_score"
 ],
 "numeric_summaries": {
 "disadvantage_score": {
 "count": 2,
 "min": 0.2,
 "max": 0.4
 },
 "family_stability_score": {
 "count": 2,
 "min": 0.575,
 "max": 0.8500000000000001
 },
 "previous_attempt_count": {
 "count": 2,
 "min": 0,
 "max": 0
 },
 "support_score": {
 "count": 2,
 "min": 0.25,
 "max": 0.5
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_background_comparison",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "background_comparison",
 "flag_columns": [
 "disability_flag"
 ],
 "triggered_like_counts": {
 "disability_flag": 0
 }
 }
]
```

