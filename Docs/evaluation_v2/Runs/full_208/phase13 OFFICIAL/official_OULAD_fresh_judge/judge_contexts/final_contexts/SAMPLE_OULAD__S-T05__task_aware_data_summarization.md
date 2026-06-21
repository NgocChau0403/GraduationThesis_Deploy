# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T05__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__S-T05__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "S-T05",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Weekly engagement trend",
 "scope": "1 student",
 "actionable_question": "Which weeks did I disengage and why might that be?",
 "target_audience": "student",
 "ai_summary_type": "trend_series",
 "ai_prompt_hint": "Describe engagement pattern. Flag weeks with sharp drops. Note if drop precedes assessment.",
 "query_labels": [
 "weekly_engagement"
 ],
 "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
 "source_tables": [
 "engagement [OULAD only]"
 ],
 "key_db_fields": [
 "week_number",
 "engagement_count; early_warning_week [FE cross]",
 "weekly_engagement_drop [FE cross]"
 ],
 "output_schema": {},
 "query_labels": [
 "weekly_engagement"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "S-T05-CORE-01",
 "description": "Describe engagement pattern."
 },
 {
 "requirement_id": "S-T05-CORE-02",
 "description": "Flag weeks with sharp drops."
 },
 {
 "requirement_id": "S-T05-CORE-03",
 "description": "Note if drop precedes assessment."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "S-T05-CONSTRAINT-01",
 "description": "Treat temporal proximity between engagement drops and assessments as an association, not proof that the assessment caused the drop."
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

## Deterministic Retrieval Evidence

```json
{
 "full_query_artifacts": [
 {
 "dataset_label": "weekly_engagement",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T05.json",
 "artifact_sha256": "2e8eea276cfc460db42374b76912079690f44924314782df5b07b25be39f76ee",
 "row_count": 32,
 "readable": true
 }
 ],
 "evidence_access_mode": "deterministic_artifact_retrieval",
 "full_result_row_count": 32,
 "prompt_embedded_row_count": 0,
 "retrieved_row_count": 32,
 "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/retrieval_logs/SAMPLE_OULAD__S-T05__task_aware_data_summarization.json",
 "full_access_available": true,
 "full_result_sent_to_llm": false,
 "evidence_artifact_file_sha256": "2e8eea276cfc460db42374b76912079690f44924314782df5b07b25be39f76ee",
 "evidence_rows_sha256": "66971a60c1a5faacfcf711c53301837cdb6f40c85bd9e6bd3f8e189e2c058a80",
 "retrieval_validation": {
 "status": "pass",
 "retrieved_row_count": 32,
 "chunk_count": 1,
 "chunk_ids": [
 "SAMPLE_OULAD__S-T05__task_aware_data_summarization__weekly_engagement__chunk_1"
 ],
 "row_ranges": [
 {
 "dataset_label": "weekly_engagement",
 "row_start_inclusive": 0,
 "row_end_inclusive": 31,
 "row_count": 32
 }
 ],
 "issues": []
 }
}
```

```json
{
 "evidence_access_mode": "deterministic_artifact_retrieval",
 "retrieval_log": {
 "artifact_type": "llm_judge_v2_phase6_4_deterministic_retrieval_log",
 "generated_at": "2026-06-21T20:50:29.374Z",
 "record_id": "SAMPLE_OULAD__S-T05__task_aware_data_summarization",
 "retrieval_request_complete": true,
 "retrieval_coverage_status": "full",
 "chunks": [
 {
 "chunk_id": "SAMPLE_OULAD__S-T05__task_aware_data_summarization__weekly_engagement__chunk_1",
 "dataset_label": "weekly_engagement",
 "row_start_inclusive": 0,
 "row_end_inclusive": 31,
 "row_count": 32,
 "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T05.json",
 "source_artifact_sha256": "2e8eea276cfc460db42374b76912079690f44924314782df5b07b25be39f76ee"
 }
 ]
 },
 "retrieved_datasets_sha256": "66971a60c1a5faacfcf711c53301837cdb6f40c85bd9e6bd3f8e189e2c058a80",
 "retrieved_datasets": {
 "weekly_engagement": [
 {
 "week_number": -2,
 "weekly_clicks": 86,
 "rolling_3wk_avg": null,
 "weekly_engagement_drop": null,
 "early_warning_week": 0
 },
 {
 "week_number": -1,
 "weekly_clicks": 94,
 "rolling_3wk_avg": "86",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 0,
 "weekly_clicks": 27,
 "rolling_3wk_avg": "90",
 "weekly_engagement_drop": true,
 "early_warning_week": 0
 },
 {
 "week_number": 1,
 "weekly_clicks": 98,
 "rolling_3wk_avg": "69",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 2,
 "weekly_clicks": 4,
 "rolling_3wk_avg": "73",
 "weekly_engagement_drop": true,
 "early_warning_week": 0
 },
 {
 "week_number": 3,
 "weekly_clicks": 28,
 "rolling_3wk_avg": "43",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 4,
 "weekly_clicks": 7,
 "rolling_3wk_avg": "43.3333333333333333",
 "weekly_engagement_drop": true,
 "early_warning_week": 0
 },
 {
 "week_number": 5,
 "weekly_clicks": 16,
 "rolling_3wk_avg": "13",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 6,
 "weekly_clicks": 80,
 "rolling_3wk_avg": "17",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 8,
 "weekly_clicks": 2,
 "rolling_3wk_avg": "34.3333333333333333",
 "weekly_engagement_drop": true,
 "early_warning_week": 0
 },
 {
 "week_number": 9,
 "weekly_clicks": 48,
 "rolling_3wk_avg": "32.6666666666666667",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 10,
 "weekly_clicks": 3,
 "rolling_3wk_avg": "43.3333333333333333",
 "weekly_engagement_drop": true,
 "early_warning_week": 0
 },
 {
 "week_number": 11,
 "weekly_clicks": 3,
 "rolling_3wk_avg": "17.6666666666666667",
 "weekly_engagement_drop": true,
 "early_warning_week": 0
 },
 {
 "week_number": 12,
 "weekly_clicks": 56,
 "rolling_3wk_avg": "18",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 13,
 "weekly_clicks": 53,
 "rolling_3wk_avg": "20.6666666666666667",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 14,
 "weekly_clicks": 71,
 "rolling_3wk_avg": "37.3333333333333333",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 15,
 "weekly_clicks": 29,
 "rolling_3wk_avg": "60",
 "weekly_engagement_drop": true,
 "early_warning_week": 0
 },
 {
 "week_number": 16,
 "weekly_clicks": 24,
 "rolling_3wk_avg": "51",
 "weekly_engagement_drop": true,
 "early_warning_week": 0
 },
 {
 "week_number": 17,
 "weekly_clicks": 24,
 "rolling_3wk_avg": "41.3333333333333333",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 18,
 "weekly_clicks": 1,
 "rolling_3wk_avg": "25.6666666666666667",
 "weekly_engagement_drop": true,
 "early_warning_week": 0
 },
 {
 "week_number": 19,
 "weekly_clicks": 45,
 "rolling_3wk_avg": "16.3333333333333333",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 20,
 "weekly_clicks": 101,
 "rolling_3wk_avg": "23.3333333333333333",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 21,
 "weekly_clicks": 106,
 "rolling_3wk_avg": "49",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 22,
 "weekly_clicks": 78,
 "rolling_3wk_avg": "84",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 24,
 "weekly_clicks": 10,
 "rolling_3wk_avg": "95",
 "weekly_engagement_drop": true,
 "early_warning_week": 0
 },
 {
 "week_number": 25,
 "weekly_clicks": 1,
 "rolling_3wk_avg": "64.6666666666666667",
 "weekly_engagement_drop": true,
 "early_warning_week": 0
 },
 {
 "week_number": 27,
 "weekly_clicks": 15,
 "rolling_3wk_avg": "29.6666666666666667",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 28,
 "weekly_clicks": 8,
 "rolling_3wk_avg": "8.6666666666666667",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 29,
 "weekly_clicks": 41,
 "rolling_3wk_avg": "8",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 30,
 "weekly_clicks": 43,
 "rolling_3wk_avg": "21.3333333333333333",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 31,
 "weekly_clicks": 54,
 "rolling_3wk_avg": "30.6666666666666667",
 "weekly_engagement_drop": false,
 "early_warning_week": 0
 },
 {
 "week_number": 35,
 "weekly_clicks": 5,
 "rolling_3wk_avg": "46",
 "weekly_engagement_drop": true,
 "early_warning_week": 0
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T05__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "49086cb4c47f25910d979febde01ea861e6ded017ef8480c2d5394146b547006",
 "generator_input_sha256": "858d28d6a42ce47820222a58611e503d4f671f48f666cab70bd943754883a0db",
 "generator_input_compact": {
 "task_id": "S-T05",
 "execution_id": "exec_1781847902976_7737b45f",
 "task_name": "Weekly engagement trend",
 "analysis_type": "trend",
 "explanation_strategy": "behavioral",
 "actionable_question": "Which weeks did I disengage and why might that be?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "weekly_engagement"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "weekly_engagement"
 ],
 "dataset_row_counts": {
 "weekly_engagement": 32
 },
 "ai_summary_config_summary": {
 "summary_type": "trend_series",
 "metric_column": "weekly_clicks",
 "entity_column": null,
 "group_column": null,
 "time_column": "week_number",
 "sort_by": null,
 "sort_direction": "asc",
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
 "raw_text": "Summary: All returned sharp-drop weeks: week=0, weekly_clicks=27, previous_returned_week=-1, previous_returned_week_clicks=94, delta=-67.0; week=2, weekly_clicks=4, previous_returned_week=1, previous_returned_week_clicks=98, delta=-94.0; week=4, weekly_clicks=7, previous_returned_week=3, previous_returned_week_clicks=28, delta=-21.0; week=8, weekly_clicks=2, previous_returned_week=6, previous_returned_week_clicks=80, delta=-78.0; week=10, weekly_clicks=3, previous_returned_week=9, previous_returned_week_clicks=48, delta=-45.0; week=11, weekly_clicks=3, previous_returned_week=10, previous_returned_week_clicks=3, delta=0.0; week=15, weekly_clicks=29, previous_returned_week=14, previous_returned_week_clicks=71, delta=-42.0; week=16, weekly_clicks=24, previous_returned_week=15, previous_returned_week_clicks=29, delta=-5.0; week=18, weekly_clicks=1, previous_returned_week=17, previous_returned_week_clicks=24, delta=-23.0; week=24, weekly_clicks=10, previous_returned_week=22, previous_returned_week_clicks=78, delta=-68.0; week=25, weekly_clicks=1, previous_returned_week=24, previous_returned_week_clicks=10, delta=-9.0; week=35, weekly_clicks=5, previous_returned_week=31, previous_returned_week_clicks=54, delta=-49.0. assessment_schedule_present=false; assessment_proximity_status=not_estimable, so the evidence cannot say whether a flagged drop precedes an assessment. Click changes are descriptive and do not establish motivation, challenge, learning effects, or causes.\n\nEducational implications: Use the complete flagged-week list for descriptive monitoring; assessment timing requires a separate assessment schedule.",
 "structured_payload": {
 "task_id": "S-T05",
 "execution_id": "exec_1781847902976_7737b45f",
 "explanation": {
 "summary": "All returned sharp-drop weeks: week=0, weekly_clicks=27, previous_returned_week=-1, previous_returned_week_clicks=94, delta=-67.0; week=2, weekly_clicks=4, previous_returned_week=1, previous_returned_week_clicks=98, delta=-94.0; week=4, weekly_clicks=7, previous_returned_week=3, previous_returned_week_clicks=28, delta=-21.0; week=8, weekly_clicks=2, previous_returned_week=6, previous_returned_week_clicks=80, delta=-78.0; week=10, weekly_clicks=3, previous_returned_week=9, previous_returned_week_clicks=48, delta=-45.0; week=11, weekly_clicks=3, previous_returned_week=10, previous_returned_week_clicks=3, delta=0.0; week=15, weekly_clicks=29, previous_returned_week=14, previous_returned_week_clicks=71, delta=-42.0; week=16, weekly_clicks=24, previous_returned_week=15, previous_returned_week_clicks=29, delta=-5.0; week=18, weekly_clicks=1, previous_returned_week=17, previous_returned_week_clicks=24, delta=-23.0; week=24, weekly_clicks=10, previous_returned_week=22, previous_returned_week_clicks=78, delta=-68.0; week=25, weekly_clicks=1, previous_returned_week=24, previous_returned_week_clicks=10, delta=-9.0; week=35, weekly_clicks=5, previous_returned_week=31, previous_returned_week_clicks=54, delta=-49.0. assessment_schedule_present=false; assessment_proximity_status=not_estimable, so the evidence cannot say whether a flagged drop precedes an assessment. Click changes are descriptive and do not establish motivation, challenge, learning effects, or causes.",
 "insights": [],
 "educational_implications": [
 "Use the complete flagged-week list for descriptive monitoring; assessment timing requires a separate assessment schedule."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data provided is consistent and shows clear engagement patterns over the weeks.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "behavioral",
 "explanation_type": "behavioral",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "trend_series",
 "ai_summary_method_warning": null,
 "full_result_row_count": 32,
 "included_row_count": 15,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "weekly_engagement",
 "row_count": 32,
 "included_row_count": 15
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 15,
 "baseline_reference_tokens": 805,
 "task_aware_prompt_tokens": 2426,
 "token_ratio": 3.0137,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "trend_relationship",
 "exceptions",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.trough",
 "exceptions.peak",
 "trend_relationship.largest_adjacent_rise",
 "comparison.multi_dataset_evidence",
 "comparison.secondary_metric_associations",
 "comparison.secondary_metric_evidence"
 ],
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "List every returned weekly_engagement_drop=true week with its exact clicks and delta from the immediately preceding returned week.",
 "State explicitly whether assessment-proximity evidence is supplied. If no assessment schedule is present, mark proximity as not estimable rather than guessing.",
 "Do not infer motivation, challenge, learning effects, or causes from click changes."
 ],
 "must_keep_keys": [
 "action_evidence",
 "dataset_name",
 "first_point",
 "flagged_points",
 "largest_adjacent_drop",
 "last_point",
 "metric_column",
 "overall_change",
 "point_count",
 "row_count",
 "small_sample_caveats",
 "summarization_warnings",
 "time_column",
 "weekly_drop_evidence"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.0137 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "S-T05",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "List every returned weekly_engagement_drop=true week with its exact clicks and delta from the immediately preceding returned week.",
 "State explicitly whether assessment-proximity evidence is supplied. If no assessment schedule is present, mark proximity as not estimable rather than guessing.",
 "Do not infer motivation, challenge, learning effects, or causes from click changes."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "weekly_engagement",
 "row_count": 32,
 "point_count": 32,
 "time_column": "week_number",
 "metric_column": "weekly_clicks",
 "dataset_roles": {},
 "metric_units": {},
 "metric_directions": {}
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "first_point": {
 "week_number": -2,
 "weekly_clicks": 86,
 "secondary_metrics": {
 "early_warning_week": 0
 }
 },
 "last_point": {
 "week_number": 35,
 "weekly_clicks": 5,
 "secondary_metrics": {
 "rolling_3wk_avg": 46,
 "early_warning_week": 0
 }
 },
 "overall_change": {
 "from": {
 "week_number": -2,
 "weekly_clicks": 86,
 "secondary_metrics": {
 "early_warning_week": 0
 }
 },
 "to": {
 "week_number": 35,
 "weekly_clicks": 5,
 "secondary_metrics": {
 "rolling_3wk_avg": 46,
 "early_warning_week": 0
 }
 },
 "delta": -81,
 "percent_change": -94.186
 },
 "weekly_drop_evidence": {
 "flagged_weeks": [
 {
 "week_number": 0,
 "weekly_clicks": 27,
 "previous_returned_week": -1,
 "previous_returned_week_clicks": 94,
 "adjacent_returned_delta": -67
 },
 {
 "week_number": 2,
 "weekly_clicks": 4,
 "previous_returned_week": 1,
 "previous_returned_week_clicks": 98,
 "adjacent_returned_delta": -94
 },
 {
 "week_number": 4,
 "weekly_clicks": 7,
 "previous_returned_week": 3,
 "previous_returned_week_clicks": 28,
 "adjacent_returned_delta": -21
 },
 {
 "week_number": 8,
 "weekly_clicks": 2,
 "previous_returned_week": 6,
 "previous_returned_week_clicks": 80,
 "adjacent_returned_delta": -78
 },
 {
 "week_number": 10,
 "weekly_clicks": 3,
 "previous_returned_week": 9,
 "previous_returned_week_clicks": 48,
 "adjacent_returned_delta": -45
 },
 {
 "week_number": 11,
 "weekly_clicks": 3,
 "previous_returned_week": 10,
 "previous_returned_week_clicks": 3,
 "adjacent_returned_delta": 0
 },
 {
 "week_number": 15,
 "weekly_clicks": 29,
 "previous_returned_week": 14,
 "previous_returned_week_clicks": 71,
 "adjacent_returned_delta": -42
 },
 {
 "week_number": 16,
 "weekly_clicks": 24,
 "previous_returned_week": 15,
 "previous_returned_week_clicks": 29,
 "adjacent_returned_delta": -5
 },
 {
 "week_number": 18,
 "weekly_clicks": 1,
 "previous_returned_week": 17,
 "previous_returned_week_clicks": 24,
 "adjacent_returned_delta": -23
 },
 {
 "week_number": 24,
 "weekly_clicks": 10,
 "previous_returned_week": 22,
 "previous_returned_week_clicks": 78,
 "adjacent_returned_delta": -68
 },
 {
 "week_number": 25,
 "weekly_clicks": 1,
 "previous_returned_week": 24,
 "previous_returned_week_clicks": 10,
 "adjacent_returned_delta": -9
 },
 {
 "week_number": 35,
 "weekly_clicks": 5,
 "previous_returned_week": 31,
 "previous_returned_week_clicks": 54,
 "adjacent_returned_delta": -49
 }
 ],
 "assessment_schedule_present": false,
 "assessment_proximity_status": "not_estimable",
 "policy": "click changes are descriptive and do not establish cause or learning impact"
 }
 }
 },
 {
 "name": "trend_relationship",
 "facts": {
 "largest_adjacent_drop": {
 "from": {
 "week_number": 1,
 "weekly_clicks": 98,
 "secondary_metrics": {
 "rolling_3wk_avg": 69,
 "early_warning_week": 0
 }
 },
 "to": {
 "week_number": 2,
 "weekly_clicks": 4,
 "secondary_metrics": {
 "rolling_3wk_avg": 73,
 "early_warning_week": 0
 }
 },
 "delta": -94
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flagged_points": [
 {
 "week_number": 0,
 "weekly_clicks": 27,
 "secondary_metrics": {
 "rolling_3wk_avg": 90,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 2,
 "weekly_clicks": 4,
 "secondary_metrics": {
 "rolling_3wk_avg": 73,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 4,
 "weekly_clicks": 7,
 "secondary_metrics": {
 "rolling_3wk_avg": 43.3333,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 8,
 "weekly_clicks": 2,
 "secondary_metrics": {
 "rolling_3wk_avg": 34.3333,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 10,
 "weekly_clicks": 3,
 "secondary_metrics": {
 "rolling_3wk_avg": 43.3333,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 11,
 "weekly_clicks": 3,
 "secondary_metrics": {
 "rolling_3wk_avg": 17.6667,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 15,
 "weekly_clicks": 29,
 "secondary_metrics": {
 "rolling_3wk_avg": 60,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 16,
 "weekly_clicks": 24,
 "secondary_metrics": {
 "rolling_3wk_avg": 51,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 18,
 "weekly_clicks": 1,
 "secondary_metrics": {
 "rolling_3wk_avg": 25.6667,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 24,
 "weekly_clicks": 10,
 "secondary_metrics": {
 "rolling_3wk_avg": 95,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 25,
 "weekly_clicks": 1,
 "secondary_metrics": {
 "rolling_3wk_avg": 64.6667,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 35,
 "weekly_clicks": 5,
 "secondary_metrics": {
 "rolling_3wk_avg": 46,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 }
 ]
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "action_evidence": []
 }
 },
 {
 "name": "limitations",
 "facts": {
 "small_sample_caveats": [],
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_series",
 "dataset_name": "weekly_engagement",
 "row_count": 32,
 "time_column": "week_number",
 "metric_column": "weekly_clicks",
 "metric_units": {},
 "metric_directions": {},
 "dataset_roles": {},
 "point_count": 32,
 "first_point": {
 "week_number": -2,
 "weekly_clicks": 86,
 "secondary_metrics": {
 "early_warning_week": 0
 }
 },
 "last_point": {
 "week_number": 35,
 "weekly_clicks": 5,
 "secondary_metrics": {
 "rolling_3wk_avg": 46,
 "early_warning_week": 0
 }
 },
 "peak": {
 "week_number": 21,
 "weekly_clicks": 106,
 "secondary_metrics": {
 "rolling_3wk_avg": 49,
 "early_warning_week": 0
 }
 },
 "trough": {
 "week_number": 18,
 "weekly_clicks": 1,
 "secondary_metrics": {
 "rolling_3wk_avg": 25.6667,
 "early_warning_week": 0
 }
 },
 "overall_change": {
 "from": {
 "week_number": -2,
 "weekly_clicks": 86,
 "secondary_metrics": {
 "early_warning_week": 0
 }
 },
 "to": {
 "week_number": 35,
 "weekly_clicks": 5,
 "secondary_metrics": {
 "rolling_3wk_avg": 46,
 "early_warning_week": 0
 }
 },
 "delta": -81,
 "percent_change": -94.186
 },
 "largest_adjacent_drop": {
 "from": {
 "week_number": 1,
 "weekly_clicks": 98,
 "secondary_metrics": {
 "rolling_3wk_avg": 69,
 "early_warning_week": 0
 }
 },
 "to": {
 "week_number": 2,
 "weekly_clicks": 4,
 "secondary_metrics": {
 "rolling_3wk_avg": 73,
 "early_warning_week": 0
 }
 },
 "delta": -94
 },
 "largest_adjacent_rise": {
 "from": {
 "week_number": 0,
 "weekly_clicks": 27,
 "secondary_metrics": {
 "rolling_3wk_avg": 90,
 "early_warning_week": 0
 }
 },
 "to": {
 "week_number": 1,
 "weekly_clicks": 98,
 "secondary_metrics": {
 "rolling_3wk_avg": 69,
 "early_warning_week": 0
 }
 },
 "delta": 71
 },
 "flagged_points": [
 {
 "week_number": 0,
 "weekly_clicks": 27,
 "secondary_metrics": {
 "rolling_3wk_avg": 90,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 2,
 "weekly_clicks": 4,
 "secondary_metrics": {
 "rolling_3wk_avg": 73,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 4,
 "weekly_clicks": 7,
 "secondary_metrics": {
 "rolling_3wk_avg": 43.3333,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 8,
 "weekly_clicks": 2,
 "secondary_metrics": {
 "rolling_3wk_avg": 34.3333,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 10,
 "weekly_clicks": 3,
 "secondary_metrics": {
 "rolling_3wk_avg": 43.3333,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 11,
 "weekly_clicks": 3,
 "secondary_metrics": {
 "rolling_3wk_avg": 17.6667,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 15,
 "weekly_clicks": 29,
 "secondary_metrics": {
 "rolling_3wk_avg": 60,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 16,
 "weekly_clicks": 24,
 "secondary_metrics": {
 "rolling_3wk_avg": 51,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 18,
 "weekly_clicks": 1,
 "secondary_metrics": {
 "rolling_3wk_avg": 25.6667,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 24,
 "weekly_clicks": 10,
 "secondary_metrics": {
 "rolling_3wk_avg": 95,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 25,
 "weekly_clicks": 1,
 "secondary_metrics": {
 "rolling_3wk_avg": 64.6667,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 35,
 "weekly_clicks": 5,
 "secondary_metrics": {
 "rolling_3wk_avg": 46,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 }
 ],
 "secondary_metric_evidence": {
 "rolling_3wk_avg": {
 "count": 31,
 "min": 8,
 "max": 95,
 "first": null,
 "last": 46
 },
 "early_warning_week": {
 "count": 32,
 "min": 0,
 "max": 0,
 "first": 0,
 "last": 0
 }
 },
 "secondary_metric_associations": {
 "rolling_3wk_avg": {
 "paired_point_count": 31,
 "method": "pearson_on_aligned_points",
 "correlation": 0.0666,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "early_warning_week": {
 "paired_point_count": 32,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 }
 },
 "multi_dataset_evidence": [],
 "small_sample_caveats": [],
 "causal_claim_allowed": false,
 "action_evidence": [],
 "summarization_warnings": [],
 "weekly_drop_evidence": {
 "flagged_weeks": [
 {
 "week_number": 0,
 "weekly_clicks": 27,
 "previous_returned_week": -1,
 "previous_returned_week_clicks": 94,
 "adjacent_returned_delta": -67
 },
 {
 "week_number": 2,
 "weekly_clicks": 4,
 "previous_returned_week": 1,
 "previous_returned_week_clicks": 98,
 "adjacent_returned_delta": -94
 },
 {
 "week_number": 4,
 "weekly_clicks": 7,
 "previous_returned_week": 3,
 "previous_returned_week_clicks": 28,
 "adjacent_returned_delta": -21
 },
 {
 "week_number": 8,
 "weekly_clicks": 2,
 "previous_returned_week": 6,
 "previous_returned_week_clicks": 80,
 "adjacent_returned_delta": -78
 },
 {
 "week_number": 10,
 "weekly_clicks": 3,
 "previous_returned_week": 9,
 "previous_returned_week_clicks": 48,
 "adjacent_returned_delta": -45
 },
 {
 "week_number": 11,
 "weekly_clicks": 3,
 "previous_returned_week": 10,
 "previous_returned_week_clicks": 3,
 "adjacent_returned_delta": 0
 },
 {
 "week_number": 15,
 "weekly_clicks": 29,
 "previous_returned_week": 14,
 "previous_returned_week_clicks": 71,
 "adjacent_returned_delta": -42
 },
 {
 "week_number": 16,
 "weekly_clicks": 24,
 "previous_returned_week": 15,
 "previous_returned_week_clicks": 29,
 "adjacent_returned_delta": -5
 },
 {
 "week_number": 18,
 "weekly_clicks": 1,
 "previous_returned_week": 17,
 "previous_returned_week_clicks": 24,
 "adjacent_returned_delta": -23
 },
 {
 "week_number": 24,
 "weekly_clicks": 10,
 "previous_returned_week": 22,
 "previous_returned_week_clicks": 78,
 "adjacent_returned_delta": -68
 },
 {
 "week_number": 25,
 "weekly_clicks": 1,
 "previous_returned_week": 24,
 "previous_returned_week_clicks": 10,
 "adjacent_returned_delta": -9
 },
 {
 "week_number": 35,
 "weekly_clicks": 5,
 "previous_returned_week": 31,
 "previous_returned_week_clicks": 54,
 "adjacent_returned_delta": -49
 }
 ],
 "assessment_schedule_present": false,
 "assessment_proximity_status": "not_estimable",
 "policy": "click changes are descriptive and do not establish cause or learning impact"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 7764,
 "token_usage": {
 "prompt_tokens": 3211,
 "completion_tokens": 603,
 "total_tokens": 3814
 },
 "strategy": "behavioral",
 "granularity": "weekly",
 "cost_usd": 0.000843
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T05__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "49086cb4c47f25910d979febde01ea861e6ded017ef8480c2d5394146b547006",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 3211,
 "completion_tokens": 603,
 "total_tokens": 3814
 },
 "latency_ms": 7774,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-T05",
 "execution_id": "exec_1781847902976_7737b45f",
 "explanation": {
 "summary": "All returned sharp-drop weeks: week=0, weekly_clicks=27, previous_returned_week=-1, previous_returned_week_clicks=94, delta=-67.0; week=2, weekly_clicks=4, previous_returned_week=1, previous_returned_week_clicks=98, delta=-94.0; week=4, weekly_clicks=7, previous_returned_week=3, previous_returned_week_clicks=28, delta=-21.0; week=8, weekly_clicks=2, previous_returned_week=6, previous_returned_week_clicks=80, delta=-78.0; week=10, weekly_clicks=3, previous_returned_week=9, previous_returned_week_clicks=48, delta=-45.0; week=11, weekly_clicks=3, previous_returned_week=10, previous_returned_week_clicks=3, delta=0.0; week=15, weekly_clicks=29, previous_returned_week=14, previous_returned_week_clicks=71, delta=-42.0; week=16, weekly_clicks=24, previous_returned_week=15, previous_returned_week_clicks=29, delta=-5.0; week=18, weekly_clicks=1, previous_returned_week=17, previous_returned_week_clicks=24, delta=-23.0; week=24, weekly_clicks=10, previous_returned_week=22, previous_returned_week_clicks=78, delta=-68.0; week=25, weekly_clicks=1, previous_returned_week=24, previous_returned_week_clicks=10, delta=-9.0; week=35, weekly_clicks=5, previous_returned_week=31, previous_returned_week_clicks=54, delta=-49.0. assessment_schedule_present=false; assessment_proximity_status=not_estimable, so the evidence cannot say whether a flagged drop precedes an assessment. Click changes are descriptive and do not establish motivation, challenge, learning effects, or causes.",
 "insights": [],
 "educational_implications": [
 "Use the complete flagged-week list for descriptive monitoring; assessment timing requires a separate assessment schedule."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data provided is consistent and shows clear engagement patterns over the weeks.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "behavioral",
 "explanation_type": "behavioral",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "trend_series",
 "ai_summary_method_warning": null,
 "full_result_row_count": 32,
 "included_row_count": 15,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "weekly_engagement",
 "row_count": 32,
 "included_row_count": 15
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 15,
 "baseline_reference_tokens": 805,
 "task_aware_prompt_tokens": 2426,
 "token_ratio": 3.0137,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "trend_relationship",
 "exceptions",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.trough",
 "exceptions.peak",
 "trend_relationship.largest_adjacent_rise",
 "comparison.multi_dataset_evidence",
 "comparison.secondary_metric_associations",
 "comparison.secondary_metric_evidence"
 ],
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "List every returned weekly_engagement_drop=true week with its exact clicks and delta from the immediately preceding returned week.",
 "State explicitly whether assessment-proximity evidence is supplied. If no assessment schedule is present, mark proximity as not estimable rather than guessing.",
 "Do not infer motivation, challenge, learning effects, or causes from click changes."
 ],
 "must_keep_keys": [
 "action_evidence",
 "dataset_name",
 "first_point",
 "flagged_points",
 "largest_adjacent_drop",
 "last_point",
 "metric_column",
 "overall_change",
 "point_count",
 "row_count",
 "small_sample_caveats",
 "summarization_warnings",
 "time_column",
 "weekly_drop_evidence"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.0137 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "S-T05",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "List every returned weekly_engagement_drop=true week with its exact clicks and delta from the immediately preceding returned week.",
 "State explicitly whether assessment-proximity evidence is supplied. If no assessment schedule is present, mark proximity as not estimable rather than guessing.",
 "Do not infer motivation, challenge, learning effects, or causes from click changes."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "weekly_engagement",
 "row_count": 32,
 "point_count": 32,
 "time_column": "week_number",
 "metric_column": "weekly_clicks",
 "dataset_roles": {},
 "metric_units": {},
 "metric_directions": {}
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "first_point": {
 "week_number": -2,
 "weekly_clicks": 86,
 "secondary_metrics": {
 "early_warning_week": 0
 }
 },
 "last_point": {
 "week_number": 35,
 "weekly_clicks": 5,
 "secondary_metrics": {
 "rolling_3wk_avg": 46,
 "early_warning_week": 0
 }
 },
 "overall_change": {
 "from": {
 "week_number": -2,
 "weekly_clicks": 86,
 "secondary_metrics": {
 "early_warning_week": 0
 }
 },
 "to": {
 "week_number": 35,
 "weekly_clicks": 5,
 "secondary_metrics": {
 "rolling_3wk_avg": 46,
 "early_warning_week": 0
 }
 },
 "delta": -81,
 "percent_change": -94.186
 },
 "weekly_drop_evidence": {
 "flagged_weeks": [
 {
 "week_number": 0,
 "weekly_clicks": 27,
 "previous_returned_week": -1,
 "previous_returned_week_clicks": 94,
 "adjacent_returned_delta": -67
 },
 {
 "week_number": 2,
 "weekly_clicks": 4,
 "previous_returned_week": 1,
 "previous_returned_week_clicks": 98,
 "adjacent_returned_delta": -94
 },
 {
 "week_number": 4,
 "weekly_clicks": 7,
 "previous_returned_week": 3,
 "previous_returned_week_clicks": 28,
 "adjacent_returned_delta": -21
 },
 {
 "week_number": 8,
 "weekly_clicks": 2,
 "previous_returned_week": 6,
 "previous_returned_week_clicks": 80,
 "adjacent_returned_delta": -78
 },
 {
 "week_number": 10,
 "weekly_clicks": 3,
 "previous_returned_week": 9,
 "previous_returned_week_clicks": 48,
 "adjacent_returned_delta": -45
 },
 {
 "week_number": 11,
 "weekly_clicks": 3,
 "previous_returned_week": 10,
 "previous_returned_week_clicks": 3,
 "adjacent_returned_delta": 0
 },
 {
 "week_number": 15,
 "weekly_clicks": 29,
 "previous_returned_week": 14,
 "previous_returned_week_clicks": 71,
 "adjacent_returned_delta": -42
 },
 {
 "week_number": 16,
 "weekly_clicks": 24,
 "previous_returned_week": 15,
 "previous_returned_week_clicks": 29,
 "adjacent_returned_delta": -5
 },
 {
 "week_number": 18,
 "weekly_clicks": 1,
 "previous_returned_week": 17,
 "previous_returned_week_clicks": 24,
 "adjacent_returned_delta": -23
 },
 {
 "week_number": 24,
 "weekly_clicks": 10,
 "previous_returned_week": 22,
 "previous_returned_week_clicks": 78,
 "adjacent_returned_delta": -68
 },
 {
 "week_number": 25,
 "weekly_clicks": 1,
 "previous_returned_week": 24,
 "previous_returned_week_clicks": 10,
 "adjacent_returned_delta": -9
 },
 {
 "week_number": 35,
 "weekly_clicks": 5,
 "previous_returned_week": 31,
 "previous_returned_week_clicks": 54,
 "adjacent_returned_delta": -49
 }
 ],
 "assessment_schedule_present": false,
 "assessment_proximity_status": "not_estimable",
 "policy": "click changes are descriptive and do not establish cause or learning impact"
 }
 }
 },
 {
 "name": "trend_relationship",
 "facts": {
 "largest_adjacent_drop": {
 "from": {
 "week_number": 1,
 "weekly_clicks": 98,
 "secondary_metrics": {
 "rolling_3wk_avg": 69,
 "early_warning_week": 0
 }
 },
 "to": {
 "week_number": 2,
 "weekly_clicks": 4,
 "secondary_metrics": {
 "rolling_3wk_avg": 73,
 "early_warning_week": 0
 }
 },
 "delta": -94
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flagged_points": [
 {
 "week_number": 0,
 "weekly_clicks": 27,
 "secondary_metrics": {
 "rolling_3wk_avg": 90,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 2,
 "weekly_clicks": 4,
 "secondary_metrics": {
 "rolling_3wk_avg": 73,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 4,
 "weekly_clicks": 7,
 "secondary_metrics": {
 "rolling_3wk_avg": 43.3333,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 8,
 "weekly_clicks": 2,
 "secondary_metrics": {
 "rolling_3wk_avg": 34.3333,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 10,
 "weekly_clicks": 3,
 "secondary_metrics": {
 "rolling_3wk_avg": 43.3333,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 11,
 "weekly_clicks": 3,
 "secondary_metrics": {
 "rolling_3wk_avg": 17.6667,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 15,
 "weekly_clicks": 29,
 "secondary_metrics": {
 "rolling_3wk_avg": 60,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 16,
 "weekly_clicks": 24,
 "secondary_metrics": {
 "rolling_3wk_avg": 51,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 18,
 "weekly_clicks": 1,
 "secondary_metrics": {
 "rolling_3wk_avg": 25.6667,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 24,
 "weekly_clicks": 10,
 "secondary_metrics": {
 "rolling_3wk_avg": 95,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 25,
 "weekly_clicks": 1,
 "secondary_metrics": {
 "rolling_3wk_avg": 64.6667,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 35,
 "weekly_clicks": 5,
 "secondary_metrics": {
 "rolling_3wk_avg": 46,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 }
 ]
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "action_evidence": []
 }
 },
 {
 "name": "limitations",
 "facts": {
 "small_sample_caveats": [],
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_series",
 "dataset_name": "weekly_engagement",
 "row_count": 32,
 "time_column": "week_number",
 "metric_column": "weekly_clicks",
 "metric_units": {},
 "metric_directions": {},
 "dataset_roles": {},
 "point_count": 32,
 "first_point": {
 "week_number": -2,
 "weekly_clicks": 86,
 "secondary_metrics": {
 "early_warning_week": 0
 }
 },
 "last_point": {
 "week_number": 35,
 "weekly_clicks": 5,
 "secondary_metrics": {
 "rolling_3wk_avg": 46,
 "early_warning_week": 0
 }
 },
 "peak": {
 "week_number": 21,
 "weekly_clicks": 106,
 "secondary_metrics": {
 "rolling_3wk_avg": 49,
 "early_warning_week": 0
 }
 },
 "trough": {
 "week_number": 18,
 "weekly_clicks": 1,
 "secondary_metrics": {
 "rolling_3wk_avg": 25.6667,
 "early_warning_week": 0
 }
 },
 "overall_change": {
 "from": {
 "week_number": -2,
 "weekly_clicks": 86,
 "secondary_metrics": {
 "early_warning_week": 0
 }
 },
 "to": {
 "week_number": 35,
 "weekly_clicks": 5,
 "secondary_metrics": {
 "rolling_3wk_avg": 46,
 "early_warning_week": 0
 }
 },
 "delta": -81,
 "percent_change": -94.186
 },
 "largest_adjacent_drop": {
 "from": {
 "week_number": 1,
 "weekly_clicks": 98,
 "secondary_metrics": {
 "rolling_3wk_avg": 69,
 "early_warning_week": 0
 }
 },
 "to": {
 "week_number": 2,
 "weekly_clicks": 4,
 "secondary_metrics": {
 "rolling_3wk_avg": 73,
 "early_warning_week": 0
 }
 },
 "delta": -94
 },
 "largest_adjacent_rise": {
 "from": {
 "week_number": 0,
 "weekly_clicks": 27,
 "secondary_metrics": {
 "rolling_3wk_avg": 90,
 "early_warning_week": 0
 }
 },
 "to": {
 "week_number": 1,
 "weekly_clicks": 98,
 "secondary_metrics": {
 "rolling_3wk_avg": 69,
 "early_warning_week": 0
 }
 },
 "delta": 71
 },
 "flagged_points": [
 {
 "week_number": 0,
 "weekly_clicks": 27,
 "secondary_metrics": {
 "rolling_3wk_avg": 90,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 2,
 "weekly_clicks": 4,
 "secondary_metrics": {
 "rolling_3wk_avg": 73,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 4,
 "weekly_clicks": 7,
 "secondary_metrics": {
 "rolling_3wk_avg": 43.3333,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 8,
 "weekly_clicks": 2,
 "secondary_metrics": {
 "rolling_3wk_avg": 34.3333,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 10,
 "weekly_clicks": 3,
 "secondary_metrics": {
 "rolling_3wk_avg": 43.3333,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 11,
 "weekly_clicks": 3,
 "secondary_metrics": {
 "rolling_3wk_avg": 17.6667,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 15,
 "weekly_clicks": 29,
 "secondary_metrics": {
 "rolling_3wk_avg": 60,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 16,
 "weekly_clicks": 24,
 "secondary_metrics": {
 "rolling_3wk_avg": 51,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 18,
 "weekly_clicks": 1,
 "secondary_metrics": {
 "rolling_3wk_avg": 25.6667,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 24,
 "weekly_clicks": 10,
 "secondary_metrics": {
 "rolling_3wk_avg": 95,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 25,
 "weekly_clicks": 1,
 "secondary_metrics": {
 "rolling_3wk_avg": 64.6667,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 },
 {
 "week_number": 35,
 "weekly_clicks": 5,
 "secondary_metrics": {
 "rolling_3wk_avg": 46,
 "early_warning_week": 0
 },
 "flags": {
 "weekly_engagement_drop": true
 },
 "flag_raw_values": {
 "weekly_engagement_drop": true
 }
 }
 ],
 "secondary_metric_evidence": {
 "rolling_3wk_avg": {
 "count": 31,
 "min": 8,
 "max": 95,
 "first": null,
 "last": 46
 },
 "early_warning_week": {
 "count": 32,
 "min": 0,
 "max": 0,
 "first": 0,
 "last": 0
 }
 },
 "secondary_metric_associations": {
 "rolling_3wk_avg": {
 "paired_point_count": 31,
 "method": "pearson_on_aligned_points",
 "correlation": 0.0666,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 },
 "early_warning_week": {
 "paired_point_count": 32,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": false
 }
 },
 "multi_dataset_evidence": [],
 "small_sample_caveats": [],
 "causal_claim_allowed": false,
 "action_evidence": [],
 "summarization_warnings": [],
 "weekly_drop_evidence": {
 "flagged_weeks": [
 {
 "week_number": 0,
 "weekly_clicks": 27,
 "previous_returned_week": -1,
 "previous_returned_week_clicks": 94,
 "adjacent_returned_delta": -67
 },
 {
 "week_number": 2,
 "weekly_clicks": 4,
 "previous_returned_week": 1,
 "previous_returned_week_clicks": 98,
 "adjacent_returned_delta": -94
 },
 {
 "week_number": 4,
 "weekly_clicks": 7,
 "previous_returned_week": 3,
 "previous_returned_week_clicks": 28,
 "adjacent_returned_delta": -21
 },
 {
 "week_number": 8,
 "weekly_clicks": 2,
 "previous_returned_week": 6,
 "previous_returned_week_clicks": 80,
 "adjacent_returned_delta": -78
 },
 {
 "week_number": 10,
 "weekly_clicks": 3,
 "previous_returned_week": 9,
 "previous_returned_week_clicks": 48,
 "adjacent_returned_delta": -45
 },
 {
 "week_number": 11,
 "weekly_clicks": 3,
 "previous_returned_week": 10,
 "previous_returned_week_clicks": 3,
 "adjacent_returned_delta": 0
 },
 {
 "week_number": 15,
 "weekly_clicks": 29,
 "previous_returned_week": 14,
 "previous_returned_week_clicks": 71,
 "adjacent_returned_delta": -42
 },
 {
 "week_number": 16,
 "weekly_clicks": 24,
 "previous_returned_week": 15,
 "previous_returned_week_clicks": 29,
 "adjacent_returned_delta": -5
 },
 {
 "week_number": 18,
 "weekly_clicks": 1,
 "previous_returned_week": 17,
 "previous_returned_week_clicks": 24,
 "adjacent_returned_delta": -23
 },
 {
 "week_number": 24,
 "weekly_clicks": 10,
 "previous_returned_week": 22,
 "previous_returned_week_clicks": 78,
 "adjacent_returned_delta": -68
 },
 {
 "week_number": 25,
 "weekly_clicks": 1,
 "previous_returned_week": 24,
 "previous_returned_week_clicks": 10,
 "adjacent_returned_delta": -9
 },
 {
 "week_number": 35,
 "weekly_clicks": 5,
 "previous_returned_week": 31,
 "previous_returned_week_clicks": 54,
 "adjacent_returned_delta": -49
 }
 ],
 "assessment_schedule_present": false,
 "assessment_proximity_status": "not_estimable",
 "policy": "click changes are descriptive and do not establish cause or learning impact"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 7764,
 "token_usage": {
 "prompt_tokens": 3211,
 "completion_tokens": 603,
 "total_tokens": 3814
 },
 "strategy": "behavioral",
 "granularity": "weekly",
 "cost_usd": 0.000843
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
 "expected": 32,
 "observed": 32
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "2e8eea276cfc460db42374b76912079690f44924314782df5b07b25be39f76ee",
 "expected_values": [
 "2e8eea276cfc460db42374b76912079690f44924314782df5b07b25be39f76ee"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "66971a60c1a5faacfcf711c53301837cdb6f40c85bd9e6bd3f8e189e2c058a80",
 "expected": "66971a60c1a5faacfcf711c53301837cdb6f40c85bd9e6bd3f8e189e2c058a80"
 },
 {
 "check_id": "numeric_fields_weekly_engagement",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "weekly_engagement",
 "numeric_columns": [
 "early_warning_week",
 "week_number",
 "weekly_clicks"
 ],
 "numeric_summaries": {
 "early_warning_week": {
 "count": 32,
 "min": 0,
 "max": 0
 },
 "week_number": {
 "count": 32,
 "min": -2,
 "max": 35
 },
 "weekly_clicks": {
 "count": 32,
 "min": 1,
 "max": 106
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_weekly_engagement",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "weekly_engagement",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```
