# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G04__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_UCI_POR__A-G04__task_aware_data_summarization",
 "evaluation_run_id": "phase13_local_taskaware_official_r4_fresh_judge",
 "dataset_id": "SAMPLE_UCI_POR",
 "task_id": "A-G04",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Assessment difficulty analysis",
 "scope": "Many students",
 "actionable_question": "Which assessment is causing the most students to fail?",
 "target_audience": "instructor",
 "ai_summary_type": "ranking",
 "ai_prompt_hint": "Flag assessments with pass_flag=False rate above threshold. Suggest curriculum review.",
 "query_labels": [
 "assessment_difficulty"
 ],
 "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
 "source_tables": [
 "assessment_result",
 "assessment",
 "enrollment"
 ],
 "key_db_fields": [
 "assessment_name",
 "assessment_type",
 "week_of_class",
 "competency_tag",
 "score_normalized",
 "pass_flag"
 ],
 "output_schema": {
 "required_columns": [
 "assessment_name",
 "fail_rate_pct"
 ],
 "optional_columns": [
 "assessment_id",
 "assessment_order",
 "assessment_type",
 "week_of_class",
 "competency_tag",
 "competency_source",
 "total_submissions",
 "fail_count",
 "avg_score"
 ]
 },
 "query_labels": [
 "assessment_difficulty"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-G04-CORE-01",
 "description": "Flag assessments with pass_flag=False rate above threshold."
 },
 {
 "requirement_id": "A-G04-CORE-02",
 "description": "Suggest curriculum review."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-G04-CONSTRAINT-01",
 "description": "Frame a high fail rate as a signal for assessment or curriculum review, not as evidence of student deficiency."
 },
 {
 "constraint_id": "A-G04-CONSTRAINT-02",
 "description": "Avoid causal claims about student quality."
 }
 ],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Retained as applicable because curriculum recommendations can affect learners; candidate for human review rather than automatic exclusion."
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
 "dataset_label": "assessment_difficulty",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G04.json",
 "artifact_sha256": "31b78680122105a0667522bd84cdde13044290f025837c6e6dd6d8c4fea8da0f",
 "row_count": 3,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 3,
 "prompt_embedded_row_count": 3,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "31b78680122105a0667522bd84cdde13044290f025837c6e6dd6d8c4fea8da0f",
 "evidence_rows_sha256": "6e5eaf43883c0c84bb0b0b6e402b9402216dce6c94d4cd46221f0f53a303f3f3",
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
 "full_result_row_count": 3,
 "embedded_datasets_sha256": "6e5eaf43883c0c84bb0b0b6e402b9402216dce6c94d4cd46221f0f53a303f3f3",
 "datasets": {
 "assessment_difficulty": [
 {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G1",
 "assessment_name": "G1",
 "assessment_type": "quiz",
 "assessment_order": 1,
 "week_of_class": 3,
 "competency_tag": "G1",
 "competency_source": "proxy",
 "total_submissions": 649,
 "fail_count": 50,
 "fail_rate_pct": 7.7,
 "avg_score": 57
 },
 {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G2",
 "assessment_name": "G2",
 "assessment_type": "quiz",
 "assessment_order": 2,
 "week_of_class": 8,
 "competency_tag": "G2",
 "competency_source": "proxy",
 "total_submissions": 649,
 "fail_count": 33,
 "fail_rate_pct": 5.1,
 "avg_score": 57.85
 },
 {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G3",
 "assessment_name": "G3",
 "assessment_type": "exam",
 "assessment_order": 3,
 "week_of_class": 14,
 "competency_tag": "G3",
 "competency_source": "proxy",
 "total_submissions": 649,
 "fail_count": 30,
 "fail_rate_pct": 4.6,
 "avg_score": 59.53
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-G04__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "09af128dd1d2a14913b9f5ea269b57a413b6abe8a6c2cb10274ef1065ec93742",
 "generator_input_sha256": "6b6f3d79511d2ec8de8676d54a96b32a8edbba0ce3cfa64c4a5020ec7155d975",
 "generator_input_compact": {
 "task_id": "A-G04",
 "execution_id": "exec_1781847232418_20c741c0",
 "task_name": "Assessment difficulty analysis",
 "analysis_type": "distribution",
 "explanation_strategy": "distribution",
 "actionable_question": "Which assessment is causing the most students to fail?",
 "target_audience": [
 "instructor"
 ],
 "query_labels": [
 "assessment_difficulty"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "assessment_difficulty"
 ],
 "dataset_row_counts": {
 "assessment_difficulty": 3
 },
 "ai_summary_config_summary": {
 "summary_type": "ranking",
 "metric_column": "fail_rate_pct",
 "entity_column": "assessment_name",
 "group_column": null,
 "time_column": null,
 "sort_by": null,
 "sort_direction": "desc",
 "top_k": 10,
 "bottom_k": 5,
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
 "raw_text": "Summary: The analysis of assessment difficulty reveals that G1 has the highest fail rate at 7.7%, indicating it is the most challenging for students. In contrast, G3 shows the lowest fail rate at 4.6%, suggesting it is more manageable for the cohort.\n\nInsights: High Fail Rate in G1: G1 has the highest fail rate of 7.7%, which is significantly above the cohort average of 5.8%. This indicates that a considerable number of students are struggling with this assessment. | Improvement in G2 and G3: Both G2 and G3 show lower fail rates of 5.1% and 4.6%, respectively, indicating that students are performing better in these assessments compared to G1.\n\nEducational implications: The high fail rate in G1 suggests a need for targeted interventions to support students in this area.\n\nRecommendations: high - Review the curriculum and instructional strategies for G1. - Given the high fail rate, it is crucial to identify potential gaps in understanding and adjust teaching methods accordingly.",
 "structured_payload": {
 "task_id": "A-G04",
 "execution_id": "exec_1781847232418_20c741c0",
 "explanation": {
 "summary": "The analysis of assessment difficulty reveals that G1 has the highest fail rate at 7.7%, indicating it is the most challenging for students. In contrast, G3 shows the lowest fail rate at 4.6%, suggesting it is more manageable for the cohort.",
 "insights": [
 {
 "title": "High Fail Rate in G1",
 "description": "G1 has the highest fail rate of 7.7%, which is significantly above the cohort average of 5.8%. This indicates that a considerable number of students are struggling with this assessment.",
 "severity": "high",
 "evidence": [
 {
 "metric": "fail_rate_pct",
 "value": 7.7,
 "comparison": "baseline",
 "delta": null,
 "context": "G1 is the first assessment in the sequence."
 }
 ]
 },
 {
 "title": "Improvement in G2 and G3",
 "description": "Both G2 and G3 show lower fail rates of 5.1% and 4.6%, respectively, indicating that students are performing better in these assessments compared to G1.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "fail_rate_pct",
 "value": 5.1,
 "comparison": "down_from_previous",
 "delta": -2.6,
 "context": "G2 shows improvement from G1."
 },
 {
 "metric": "fail_rate_pct",
 "value": 4.6,
 "comparison": "down_from_previous",
 "delta": -0.5,
 "context": "G3 shows further improvement from G2."
 }
 ]
 }
 ],
 "educational_implications": [
 "The high fail rate in G1 suggests a need for targeted interventions to support students in this area."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Review the curriculum and instructional strategies for G1.",
 "rationale": "Given the high fail rate, it is crucial to identify potential gaps in understanding and adjust teaching methods accordingly."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is derived from a complete dataset of assessments with consistent metrics.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "ranking",
 "ai_summary_method_warning": null,
 "full_result_row_count": 3,
 "included_row_count": 3,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "assessment_difficulty",
 "row_count": 3,
 "included_row_count": 3
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 3,
 "baseline_reference_tokens": 232,
 "task_aware_prompt_tokens": 852,
 "token_ratio": 3.6724,
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
 "primary_finding.bottom_items"
 ],
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples."
 ],
 "must_keep_keys": [
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.6724 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "ranking",
 "task_id": "A-G04",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "assessment_difficulty",
 "row_count": 3,
 "entity_column": "assessment_name",
 "metric_column": "fail_rate_pct",
 "sort_direction": "desc"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "top_items": [
 {
 "assessment_name": "G1",
 "fail_rate_pct": 7.7,
 "rank": 1,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G1",
 "assessment_type": "quiz",
 "week_of_class": 3,
 "competency_tag": "G1"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 50,
 "avg_score": 57
 }
 },
 {
 "assessment_name": "G2",
 "fail_rate_pct": 5.1,
 "rank": 2,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G2",
 "assessment_type": "quiz",
 "week_of_class": 8,
 "competency_tag": "G2"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 33,
 "avg_score": 57.85
 }
 },
 {
 "assessment_name": "G3",
 "fail_rate_pct": 4.6,
 "rank": 3,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G3",
 "assessment_type": "exam",
 "week_of_class": 14,
 "competency_tag": "G3"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 30,
 "avg_score": 59.53
 }
 }
 ],
 "median_item": {
 "assessment_name": "G2",
 "fail_rate_pct": 5.1,
 "rank": 2,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G2",
 "assessment_type": "quiz",
 "week_of_class": 8,
 "competency_tag": "G2"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 33,
 "avg_score": 57.85
 }
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_stats": {
 "count": 3,
 "min": 4.6,
 "max": 7.7,
 "mean": 5.8,
 "median": 5.1
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
 "summarization_warnings": [
 "Configured optional column 'competency_source' is missing from dataset."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "ranking",
 "dataset_name": "assessment_difficulty",
 "row_count": 3,
 "entity_column": "assessment_name",
 "metric_column": "fail_rate_pct",
 "sort_direction": "desc",
 "top_items": [
 {
 "assessment_name": "G1",
 "fail_rate_pct": 7.7,
 "rank": 1,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G1",
 "assessment_type": "quiz",
 "week_of_class": 3,
 "competency_tag": "G1"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 50,
 "avg_score": 57
 }
 },
 {
 "assessment_name": "G2",
 "fail_rate_pct": 5.1,
 "rank": 2,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G2",
 "assessment_type": "quiz",
 "week_of_class": 8,
 "competency_tag": "G2"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 33,
 "avg_score": 57.85
 }
 },
 {
 "assessment_name": "G3",
 "fail_rate_pct": 4.6,
 "rank": 3,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G3",
 "assessment_type": "exam",
 "week_of_class": 14,
 "competency_tag": "G3"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 30,
 "avg_score": 59.53
 }
 }
 ],
 "bottom_items": [
 {
 "assessment_name": "G1",
 "fail_rate_pct": 7.7,
 "rank": 1,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G1",
 "assessment_type": "quiz",
 "week_of_class": 3,
 "competency_tag": "G1"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 50,
 "avg_score": 57
 }
 },
 {
 "assessment_name": "G2",
 "fail_rate_pct": 5.1,
 "rank": 2,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G2",
 "assessment_type": "quiz",
 "week_of_class": 8,
 "competency_tag": "G2"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 33,
 "avg_score": 57.85
 }
 },
 {
 "assessment_name": "G3",
 "fail_rate_pct": 4.6,
 "rank": 3,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G3",
 "assessment_type": "exam",
 "week_of_class": 14,
 "competency_tag": "G3"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 30,
 "avg_score": 59.53
 }
 }
 ],
 "median_item": {
 "assessment_name": "G2",
 "fail_rate_pct": 5.1,
 "rank": 2,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G2",
 "assessment_type": "quiz",
 "week_of_class": 8,
 "competency_tag": "G2"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 33,
 "avg_score": 57.85
 }
 },
 "metric_stats": {
 "count": 3,
 "min": 4.6,
 "max": 7.7,
 "mean": 5.8,
 "median": 5.1
 },
 "tie_warnings": [],
 "flag_evidence": [],
 "summarization_warnings": [
 "Configured optional column 'competency_source' is missing from dataset."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 11410,
 "token_usage": {
 "prompt_tokens": 1547,
 "completion_tokens": 517,
 "total_tokens": 2064
 },
 "strategy": "distribution",
 "granularity": "per_assessment",
 "cost_usd": 0.000542
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r3/explanations/explanation_artifacts/SAMPLE_UCI_POR__A-G04__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "09af128dd1d2a14913b9f5ea269b57a413b6abe8a6c2cb10274ef1065ec93742",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1547,
 "completion_tokens": 517,
 "total_tokens": 2064
 },
 "latency_ms": 11416,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-G04",
 "execution_id": "exec_1781847232418_20c741c0",
 "explanation": {
 "summary": "The analysis of assessment difficulty reveals that G1 has the highest fail rate at 7.7%, indicating it is the most challenging for students. In contrast, G3 shows the lowest fail rate at 4.6%, suggesting it is more manageable for the cohort.",
 "insights": [
 {
 "title": "High Fail Rate in G1",
 "description": "G1 has the highest fail rate of 7.7%, which is significantly above the cohort average of 5.8%. This indicates that a considerable number of students are struggling with this assessment.",
 "severity": "high",
 "evidence": [
 {
 "metric": "fail_rate_pct",
 "value": 7.7,
 "comparison": "baseline",
 "delta": null,
 "context": "G1 is the first assessment in the sequence."
 }
 ]
 },
 {
 "title": "Improvement in G2 and G3",
 "description": "Both G2 and G3 show lower fail rates of 5.1% and 4.6%, respectively, indicating that students are performing better in these assessments compared to G1.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "fail_rate_pct",
 "value": 5.1,
 "comparison": "down_from_previous",
 "delta": -2.6,
 "context": "G2 shows improvement from G1."
 },
 {
 "metric": "fail_rate_pct",
 "value": 4.6,
 "comparison": "down_from_previous",
 "delta": -0.5,
 "context": "G3 shows further improvement from G2."
 }
 ]
 }
 ],
 "educational_implications": [
 "The high fail rate in G1 suggests a need for targeted interventions to support students in this area."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Review the curriculum and instructional strategies for G1.",
 "rationale": "Given the high fail rate, it is crucial to identify potential gaps in understanding and adjust teaching methods accordingly."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is derived from a complete dataset of assessments with consistent metrics.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "ranking",
 "ai_summary_method_warning": null,
 "full_result_row_count": 3,
 "included_row_count": 3,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "assessment_difficulty",
 "row_count": 3,
 "included_row_count": 3
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 3,
 "baseline_reference_tokens": 232,
 "task_aware_prompt_tokens": 852,
 "token_ratio": 3.6724,
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
 "primary_finding.bottom_items"
 ],
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples."
 ],
 "must_keep_keys": [
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.6724 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "ranking",
 "task_id": "A-G04",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "assessment_difficulty",
 "row_count": 3,
 "entity_column": "assessment_name",
 "metric_column": "fail_rate_pct",
 "sort_direction": "desc"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "top_items": [
 {
 "assessment_name": "G1",
 "fail_rate_pct": 7.7,
 "rank": 1,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G1",
 "assessment_type": "quiz",
 "week_of_class": 3,
 "competency_tag": "G1"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 50,
 "avg_score": 57
 }
 },
 {
 "assessment_name": "G2",
 "fail_rate_pct": 5.1,
 "rank": 2,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G2",
 "assessment_type": "quiz",
 "week_of_class": 8,
 "competency_tag": "G2"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 33,
 "avg_score": 57.85
 }
 },
 {
 "assessment_name": "G3",
 "fail_rate_pct": 4.6,
 "rank": 3,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G3",
 "assessment_type": "exam",
 "week_of_class": 14,
 "competency_tag": "G3"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 30,
 "avg_score": 59.53
 }
 }
 ],
 "median_item": {
 "assessment_name": "G2",
 "fail_rate_pct": 5.1,
 "rank": 2,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G2",
 "assessment_type": "quiz",
 "week_of_class": 8,
 "competency_tag": "G2"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 33,
 "avg_score": 57.85
 }
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_stats": {
 "count": 3,
 "min": 4.6,
 "max": 7.7,
 "mean": 5.8,
 "median": 5.1
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
 "summarization_warnings": [
 "Configured optional column 'competency_source' is missing from dataset."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "ranking",
 "dataset_name": "assessment_difficulty",
 "row_count": 3,
 "entity_column": "assessment_name",
 "metric_column": "fail_rate_pct",
 "sort_direction": "desc",
 "top_items": [
 {
 "assessment_name": "G1",
 "fail_rate_pct": 7.7,
 "rank": 1,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G1",
 "assessment_type": "quiz",
 "week_of_class": 3,
 "competency_tag": "G1"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 50,
 "avg_score": 57
 }
 },
 {
 "assessment_name": "G2",
 "fail_rate_pct": 5.1,
 "rank": 2,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G2",
 "assessment_type": "quiz",
 "week_of_class": 8,
 "competency_tag": "G2"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 33,
 "avg_score": 57.85
 }
 },
 {
 "assessment_name": "G3",
 "fail_rate_pct": 4.6,
 "rank": 3,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G3",
 "assessment_type": "exam",
 "week_of_class": 14,
 "competency_tag": "G3"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 30,
 "avg_score": 59.53
 }
 }
 ],
 "bottom_items": [
 {
 "assessment_name": "G1",
 "fail_rate_pct": 7.7,
 "rank": 1,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G1",
 "assessment_type": "quiz",
 "week_of_class": 3,
 "competency_tag": "G1"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 50,
 "avg_score": 57
 }
 },
 {
 "assessment_name": "G2",
 "fail_rate_pct": 5.1,
 "rank": 2,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G2",
 "assessment_type": "quiz",
 "week_of_class": 8,
 "competency_tag": "G2"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 33,
 "avg_score": 57.85
 }
 },
 {
 "assessment_name": "G3",
 "fail_rate_pct": 4.6,
 "rank": 3,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G3",
 "assessment_type": "exam",
 "week_of_class": 14,
 "competency_tag": "G3"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 30,
 "avg_score": 59.53
 }
 }
 ],
 "median_item": {
 "assessment_name": "G2",
 "fail_rate_pct": 5.1,
 "rank": 2,
 "labels": {
 "assessment_id": "SAMPLE_UCI_POR_ASM_G2",
 "assessment_type": "quiz",
 "week_of_class": 8,
 "competency_tag": "G2"
 },
 "secondary_metrics": {
 "total_submissions": 649,
 "fail_count": 33,
 "avg_score": 57.85
 }
 },
 "metric_stats": {
 "count": 3,
 "min": 4.6,
 "max": 7.7,
 "mean": 5.8,
 "median": 5.1
 },
 "tie_warnings": [],
 "flag_evidence": [],
 "summarization_warnings": [
 "Configured optional column 'competency_source' is missing from dataset."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 11410,
 "token_usage": {
 "prompt_tokens": 1547,
 "completion_tokens": 517,
 "total_tokens": 2064
 },
 "strategy": "distribution",
 "granularity": "per_assessment",
 "cost_usd": 0.000542
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
 "expected": 3,
 "observed": 3
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "31b78680122105a0667522bd84cdde13044290f025837c6e6dd6d8c4fea8da0f",
 "expected_values": [
 "31b78680122105a0667522bd84cdde13044290f025837c6e6dd6d8c4fea8da0f"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "6e5eaf43883c0c84bb0b0b6e402b9402216dce6c94d4cd46221f0f53a303f3f3",
 "expected": "6e5eaf43883c0c84bb0b0b6e402b9402216dce6c94d4cd46221f0f53a303f3f3"
 },
 {
 "check_id": "numeric_fields_assessment_difficulty",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "assessment_difficulty",
 "numeric_columns": [
 "assessment_order",
 "avg_score",
 "fail_count",
 "fail_rate_pct",
 "total_submissions",
 "week_of_class"
 ],
 "numeric_summaries": {
 "assessment_order": {
 "count": 3,
 "min": 1,
 "max": 3
 },
 "avg_score": {
 "count": 3,
 "min": 57,
 "max": 59.53
 },
 "fail_count": {
 "count": 3,
 "min": 30,
 "max": 50
 },
 "fail_rate_pct": {
 "count": 3,
 "min": 4.6,
 "max": 7.7
 },
 "total_submissions": {
 "count": 3,
 "min": 649,
 "max": 649
 },
 "week_of_class": {
 "count": 3,
 "min": 3,
 "max": 14
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_assessment_difficulty",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "assessment_difficulty",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```
