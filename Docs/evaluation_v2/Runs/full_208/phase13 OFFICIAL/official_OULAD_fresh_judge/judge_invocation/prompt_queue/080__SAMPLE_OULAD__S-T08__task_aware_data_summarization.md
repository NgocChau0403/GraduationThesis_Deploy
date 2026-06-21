# LLM Judge V2 Prompt Queue Packet

## Frozen Judge Prompt V2

# LLM Judge V2 Prompt

## Status

```text
OFFICIAL FULL_208 PROMPT - FROZEN FOR JUDGE INVOCATION
```

Prompt version:

```text
judge_prompt_v2_full_208_v1
```

This prompt is the single frozen prompt artifact for the `full_208` LLM Judge V2
run. Its exact bytes, SHA-256, rubric version, schema versions and execution
manifest must be recorded before any official Codex judge invocation starts.
If this file changes after the freeze, a new prompt version and manifest must be
created before judging continues.

## Role

You are the official pointwise evaluator for AI-generated explanations in an
education analytics system.

Evaluate exactly one explanation record independently. Judge the explanation
against:

1. the supplied task and audience;
2. the supplied task-level requirements and constraints;
3. the supplied schema context;
4. the evidence that the input proves was made available or retrieved;
5. deterministic check results where provided;
6. the frozen seven-metric rubric and metric anchors.

Do not compare this explanation with another explanation mode. Do not use scores
or outputs from other records. Do not optimize for a preferred mode or desired
research conclusion.

## Canonical contracts

The caller must provide one input conforming to:

```text
Input_AI/judge_input_schema.json
```

Your response must conform exactly to:

```text
LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json
schema_version = judge_response_schema_v1
```

The rubric and task requirements are:

```text
Rubric/JUDGE_RUBRIC_1_TO_10.md
Rubric/LLM_JUDGE_V2_METRIC_ANCHOR_SPEC.md
Rubric/task_evaluation_requirements.json
```

Return only one JSON object. Do not use Markdown fences or surrounding prose.

## Session initialization

Before judging the first record in a session:

1. load the exact prompt, rubric, metric-anchor, task-requirement and schema
 artifacts identified by the frozen run manifest;
2. verify their versions and SHA-256 values against the manifest;
3. confirm that the current session has access to the evidence mechanism defined
 by the run;
4. do not judge any record if a required artifact is unavailable, mismatched or
 replaced by an unfrozen version.

Do not use development-chat history, prior scores, aggregates or outputs from a
different run as evaluation context.

## Non-negotiable boundaries

- Evaluate only the current record.
- Use only evidence permitted by the current judge input.
- Never invent a missing value, benchmark, threshold, row, entity or
 relationship.
- Never treat an artifact path as proof that the artifact was readable or
 delivered.
- Never claim that evidence availability proves that the model attended to
 every row.
- Do not calculate or return an overall weighted score, effective cap, final
 score or verdict.
- Do not return `error_summary`, `raw_weighted_score`, `caps_applied`,
 `effective_cap`, `final_score_after_caps`, `verdict` or `record_severity`.
- Do not return `not_scored`. A pre-excluded record must not be sent to you.
- Do not repair, reinterpret or silently normalize the input contract.

## Step 1 — Validate that the record can be judged

Before evaluating quality, inspect:

- `record_id`;
- task identity, scope and target audience;
- explanation text/payload;
- evidence access metadata;
- task requirements;
- schema context.

Return `scoring_status = "invalid"` only when a valid evaluation cannot be
produced, for example:

- the explanation is absent or unusable;
- the task, explanation and evidence cannot be matched;
- required evidence is unavailable or unreadable;
- a required artifact hash/count check failed;
- direct embedding is truncated;
- required retrieval did not complete;
- required retrieval logs are absent;
- retrieved semantic evidence is insufficient for the judgment;
- the record contract is materially corrupted.

For an invalid response:

- copy the exact `record_id`;
- set `subscores` to `null`;
- set `claim_checks` and `errors` to empty arrays;
- provide a concise non-empty `invalid_reason`;
- explain the failure briefly in `holistic_rationale` and
 `evidence_usage_notes`;
- do not assign low scores as a substitute for invalidity.

An explanation that is factually poor, misleading or nearly useless is still
`scored` when sufficient evidence exists to evaluate it.

## Step 2 — Interpret evidence access correctly

Distinguish three layers:

```text
availability
delivery/retrieval
verification
```

### Availability

Use `full_query_artifacts`, hashes, counts and `full_access_available` to
understand what complete evidence exists and whether the evaluation environment
could access it.

### Delivery/retrieval

Use:

- `evidence_access_mode`;
- `prompt_embedded_row_count`;
- `retrieved_row_count`;
- per-dataset row counts;
- retrieved row ranges and chunk IDs;
- retrieval coverage status;
- retrieval request completion;
- `retrieval_log_path`.

The exact `evidence_access_mode` enum values are:

```text
direct_embedding
deterministic_artifact_retrieval
```

Use these exact terms when identifying the evidence mode in
`evidence_usage_notes`.

`direct_embedding` may represent the full result.
`deterministic_artifact_retrieval` may deliver only relevant chunks while
retaining verifiable access to the full artifact.

Partial retrieval is not automatically invalid. It may be sufficient when:

- full artifact access is valid;
- deterministic scans cover supported claim types;
- retrieved evidence is adequate for semantic judgment;
- no required relationship is hidden by the selected chunks.

### Verification

Use deterministic checks for the claim types they actually cover. Do not extend
their conclusions to unchecked claim types. Respect `checked_claim_types`,
`unchecked_claim_types` and `deterministic_scan_scope`.

## Step 3 — Resolve task requirements before reading for omissions

Use the requirements materialized in the judge input:

- `required_core_outputs`;
- `required_supporting_outputs`;
- `evaluation_constraints`, when provided;
- `safety_fairness_applicability`;
- `safety_fairness_note`, when provided.

Do not invent additional mandatory outputs after seeing the explanation.

Interpret omissions as follows:

- missing core output: material failure to complete the central task;
- missing supporting output: useful required support is absent, but the central
 answer may remain present;
- incidental missing insight: do not treat it as a required omission;
- near-total task failure: most central deliverables are absent or the response
 answers a different task.

When creating an omission error, use the exact supplied `requirement_id`.

Evaluation constraints are rules to enforce, not text the explanation must
repeat verbatim.

## Step 4 — Extract and verify atomic claims

Identify independently verifiable claims in the explanation, including:

- numerical values and percentages;
- thresholds and threshold crossings;
- ranking or ordering;
- trend direction and timing;
- group or student comparisons;
- category/status labels;
- causal or associative interpretations;
- recommended actions and the evidence claimed to justify them.

Create stable claim IDs in explanation order:

```text
C01, C02, C03, ...
```

For each claim:

1. preserve the claim meaning in `claim_text`;
2. assign a concise `claim_type`;
3. assign `claim_scope` as `core`, `supporting` or `incidental`;
4. assign one `support_status`:
 `supported`, `partially_supported`, `unsupported`, `contradicted` or
 `not_verifiable`;
5. cite concrete evidence references;
6. set `checker_source` to `deterministic_checker`, `llm_judge` or `hybrid`;
7. explain the verification result briefly.

Anchor `claim_scope` to the supplied task requirements:

- assign `core` when the claim fulfils or directly expresses a
 `required_core_outputs` item;
- assign `supporting` when the claim fulfils or directly supports a
 `required_supporting_outputs` item;
- assign `incidental` when the claim goes beyond the supplied requirements and
 removing it would not prevent completion of the required task.

Do not assign `core` merely because a claim appears early or sounds important.
If a claim supports a core conclusion but does not itself fulfil a supplied core
requirement, use `supporting`.

For any claim not marked `supported`, include an `impact_type` from:

```text
local_detail
weakens_support
changes_interpretation
reverses_main_finding
wrong_evaluation_target
```

Use `not_verifiable` only when evidence access succeeded but the claim exceeds
what the permitted evidence can prove. Do not use many `not_verifiable` claims
to hide record-level evidence failure.

Evidence references must identify the relevant artifact, dataset label,
deterministic-check result, chunk, row range or structured evidence path. Do not
use vague references such as `"the data"` or `"the table"`.

## Step 5 — Create error records without double punishment

Create errors only for actual defects. Supported claims do not require errors.

Error IDs must follow:

```text
E01, E02, E03, ...
```

Each error must:

- identify a concise `error_type`;
- reference affected `claim_ids`, or use an empty array for omission/safety
 defects not tied to a stated claim;
- use one primary metric;
- use secondary metrics only when there is a separate, independently explained
 effect;
- assign `minor`, `major` or `critical`;
- provide evidence references;
- provide a concise rationale;
- provide a `cap_candidate` according to the frozen pre-pilot policy, or `null`
 when the error has no candidate cap.

One failed claim may belong to at most one primary error. Do not create several
errors that punish the same defect under different wording.

Use these general severity meanings:

- `minor`: local defect; main conclusion remains sound and useful;
- `major`: materially weakens or changes an important conclusion, required
 output or recommendation;
- `critical`: fabricates/reverses a central result, evaluates the wrong
 task/entity/dataset, or creates a severe safety/fairness failure.

Severity is not determined by claim scope alone. Consider support status,
scope, impact and the task requirements together.

`cap_candidate` is only a proposal attached to an error. The runner validates
and applies caps. You do not calculate the effective cap.

## Step 6 — Score the seven metrics

Assign integer scores from 1 to 10 using the metric-specific anchor spec.
Provide a concise evidence-based rationale for every metric.

### `faithfulness`

Judge whether factual interpretations, relationships and uncertainty are
grounded in permitted evidence. Penalize unsupported causal claims,
misinterpretation and wrong-entity/wrong-scope reasoning here.

### `numerical_correctness`

Judge values, units, denominators, percentages, directions, rankings,
thresholds, comparisons and calculations. Do not duplicate the same defect
under faithfulness unless a separate semantic inference is also wrong.

### `completeness`

Judge coverage of the supplied core and supporting requirements. Do not require
incidental insights that were never specified.

### `task_relevance`

Judge whether the explanation answers the supplied actionable question for the
correct task, entity, dataset, period, scope and audience.

### `actionability`

Judge whether interpretation or advice is useful, feasible and grounded at the
requested decision level. If the task does not request an intervention, score
whether it supports appropriate understanding or decision-making; do not demand
invented advice.

### `clarity`

Judge precision, organization, concision and ambiguity for the target audience.
Clear writing cannot compensate for incorrect evidence.

### `safety_fairness`

Follow the pre-resolved applicability in the input.

If `applicable`:

- assign an integer score;
- enforce supplied safety/fairness notes and constraints;
- assess stigmatizing language, sensitive inference, unjustified individual
 blame, deterministic framing and harmful/unfair recommendations.

If `not_applicable`:

- set `score` to `null`;
- explain briefly why the task-level contract marks it not applicable;
- do not decide applicability based only on the wording of the explanation.

## Step 7 — Write the holistic fields

`holistic_rationale` must summarize:

- whether the central task was completed;
- the strongest evidence-grounded qualities;
- the most consequential defects;
- why the metric pattern is coherent.

Do not include an overall numeric score or verdict.

`evidence_usage_notes` must state:

- whether `evidence_access_mode` was `direct_embedding` or
 `deterministic_artifact_retrieval`;
- which evidence ranges/chunks/checks materially informed the judgment;
- how `retrieval_log_path` was used or why it was not applicable;
- any important unchecked scope or retrieval limitation;
- no claim that access proves model attention.

## Output requirements

Return exactly one JSON object with:

```text
schema_version
record_id
scoring_status
subscores
claim_checks
errors
holistic_rationale
evidence_usage_notes
invalid_reason
```

Rules:

- `schema_version` must be `judge_response_schema_v1`;
- `record_id` must exactly match the input;
- do not add fields;
- use empty arrays when there are no claim checks or errors;
- for `scored`, `subscores` must contain all seven metrics;
- for `scored`, `invalid_reason` must be `null`;
- for `invalid`, follow Step 1;
- preserve exact enum spelling;
- output valid JSON only.

## Final self-check before responding

Confirm silently:

1. I evaluated only this record.
2. I did not compare explanation modes.
3. I used only permitted evidence.
4. I distinguished access, retrieval and verification.
5. I checked all supplied core/supporting requirements and constraints.
6. Every failed claim has an auditable impact and evidence reference.
7. I did not double-punish one defect.
8. Every metric follows its anchor and applicability rule.
9. I did not calculate final score, caps or verdict.
10. The JSON matches `judge_response_schema_v1` exactly.


## Full Final Judge Context

# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T08__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__S-T08__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "S-T08",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Assessment lateness impact",
 "scope": "1 student",
 "actionable_question": "Does submitting late actually lower my score?",
 "target_audience": "student",
 "ai_summary_type": "trend_series",
 "ai_prompt_hint": "Use submission_delay_avg [FE] and punctuality_rate [FE]. Explain how delay magnitude correlates with score drop.",
 "query_labels": [
 "submission_lateness"
 ],
 "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
 "source_tables": [
 "assessment_result",
 "assessment [OULAD only]"
 ],
 "key_db_fields": [
 "submission_delay_days",
 "score_normalized",
 "assessment_type; submission_delay_avg [FE cross]",
 "punctuality_rate [FE cross]"
 ],
 "output_schema": {},
 "query_labels": [
 "submission_lateness"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "S-T08-CORE-01",
 "description": "State average submission delay and punctuality rate."
 },
 {
 "requirement_id": "S-T08-CORE-02",
 "description": "Describe the observed relationship between delay magnitude and score."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "S-T08-CONSTRAINT-01",
 "description": "Use submission_delay_avg and punctuality_rate when returned."
 },
 {
 "constraint_id": "S-T08-CONSTRAINT-02",
 "description": "Frame the delay-score relationship as correlational, not causal."
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
 "dataset_label": "submission_lateness",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T08.json",
 "artifact_sha256": "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018",
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
 "evidence_artifact_file_sha256": "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018",
 "evidence_rows_sha256": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac",
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
 "embedded_datasets_sha256": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac",
 "datasets": {
 "submission_lateness": [
 {
 "assessment_order": 1,
 "assessment_type": "CMA",
 "assessment_name": "24295",
 "submission_delay_days": 3,
 "score_normalized": 100,
 "pass_flag": true,
 "submission_day": 21,
 "due_day": 18,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 {
 "assessment_order": 3,
 "assessment_type": "CMA",
 "assessment_name": "24296",
 "submission_delay_days": 2,
 "score_normalized": 87,
 "pass_flag": true,
 "submission_day": 69,
 "due_day": 67,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 {
 "assessment_order": 5,
 "assessment_type": "CMA",
 "assessment_name": "24297",
 "submission_delay_days": 3,
 "score_normalized": 90,
 "pass_flag": true,
 "submission_day": 147,
 "due_day": 144,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 {
 "assessment_order": 8,
 "assessment_type": "CMA",
 "assessment_name": "24298",
 "submission_delay_days": 5,
 "score_normalized": 83,
 "pass_flag": true,
 "submission_day": 219,
 "due_day": 214,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 },
 {
 "assessment_order": 9,
 "assessment_type": "Exam",
 "assessment_name": "24299",
 "submission_delay_days": null,
 "score_normalized": 96,
 "pass_flag": true,
 "submission_day": 244,
 "due_day": null,
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T08__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "529144afa6988188649edce602299d572add630eb26dfc8a186274adbabf1c49",
 "generator_input_sha256": "889ab5c65f5896e61729a6a2fc62e664f7f94a25517565faf216b740681d4e9a",
 "generator_input_compact": {
 "task_id": "S-T08",
 "execution_id": "exec_1781847912365_48ce21c2",
 "task_name": "Assessment lateness impact",
 "analysis_type": "correlation",
 "explanation_strategy": "behavioral",
 "actionable_question": "Does submitting late actually lower my score?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "submission_lateness"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "submission_lateness"
 ],
 "dataset_row_counts": {
 "submission_lateness": 5
 },
 "ai_summary_config_summary": {
 "summary_type": "trend_series",
 "metric_column": "submission_delay_days",
 "entity_column": null,
 "group_column": null,
 "time_column": "assessment_order",
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
 "raw_text": "Summary: submission_delay_avg=3.25; punctuality_rate=0; valid_pair_count=4; null_delay_count=1; exact delay-score pairs: assessment_order=1, delay_days=3, score=100 | assessment_order=3, delay_days=2, score=87 | assessment_order=5, delay_days=3, score=90 | assessment_order=8, delay_days=5, score=83; pearson_correlation=-0.4015; association_status=descriptive_only_not_statistically_reliable. Observed delay-score relationship: non_monotonic; delay_days=2 has score=87, delay_days=3 has scores=100 and 90, and the longest delay_days=5 has score=83; the descriptive correlation is -0.4015, but n=4 is not statistically reliable. Delay sequence is non_monotonic (3,2,3,5), and the Exam has null delay.\n\nEducational implications: Four paired observations can describe the returned association but cannot establish causality, procrastination, learning harm, or a reliable score effect.\n\nRecommendations: medium - Use deadline reminders or submission planning based on punctuality_rate=0. - This action is grounded in systematic lateness only; it does not claim that punctuality will improve scores.",
 "structured_payload": {
 "task_id": "S-T08",
 "execution_id": "exec_1781847912365_48ce21c2",
 "explanation": {
 "summary": "submission_delay_avg=3.25; punctuality_rate=0; valid_pair_count=4; null_delay_count=1; exact delay-score pairs: assessment_order=1, delay_days=3, score=100 | assessment_order=3, delay_days=2, score=87 | assessment_order=5, delay_days=3, score=90 | assessment_order=8, delay_days=5, score=83; pearson_correlation=-0.4015; association_status=descriptive_only_not_statistically_reliable. Observed delay-score relationship: non_monotonic; delay_days=2 has score=87, delay_days=3 has scores=100 and 90, and the longest delay_days=5 has score=83; the descriptive correlation is -0.4015, but n=4 is not statistically reliable. Delay sequence is non_monotonic (3,2,3,5), and the Exam has null delay.",
 "insights": [],
 "educational_implications": [
 "Four paired observations can describe the returned association but cannot establish causality, procrastination, learning harm, or a reliable score effect."
 ],
 "recommendations": [
 {
 "priority": "medium",
 "action": "Use deadline reminders or submission planning based on punctuality_rate=0.",
 "rationale": "This action is grounded in systematic lateness only; it does not claim that punctuality will improve scores."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data shows clear trends in submission delays and corresponding scores.",
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
 "full_result_row_count": 5,
 "included_row_count": 5,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "submission_lateness",
 "row_count": 5,
 "included_row_count": 5
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 5,
 "baseline_reference_tokens": 376,
 "task_aware_prompt_tokens": 1900,
 "token_ratio": 5.0532,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
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
 "comparison.secondary_metric_associations"
 ],
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State submission_delay_avg, punctuality_rate, all valid delay-score pairs, the null Exam delay, and the deterministic descriptive correlation.",
 "With four valid pairs, label the relationship descriptive_only_not_statistically_reliable; do not claim monotonic delay growth, causality, or score benefit from punctuality."
 ],
 "must_keep_keys": [
 "action_evidence",
 "dataset_name",
 "delay_score_evidence",
 "first_point",
 "flagged_points",
 "largest_adjacent_drop",
 "last_point",
 "metric_column",
 "overall_change",
 "point_count",
 "row_count",
 "secondary_metric_evidence",
 "small_sample_caveats",
 "summarization_warnings",
 "time_column"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (5.0532 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "S-T08",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State submission_delay_avg, punctuality_rate, all valid delay-score pairs, the null Exam delay, and the deterministic descriptive correlation.",
 "With four valid pairs, label the relationship descriptive_only_not_statistically_reliable; do not claim monotonic delay growth, causality, or score benefit from punctuality."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "submission_lateness",
 "row_count": 5,
 "point_count": 4,
 "time_column": "assessment_order",
 "metric_column": "submission_delay_days",
 "dataset_roles": {},
 "metric_units": {
 "submission_delay_days": "days_relative_to_due_date",
 "submission_delay_avg": "days_late_average_positive_only",
 "punctuality_rate": "ratio_0_1",
 "score_normalized": "score_on_runtime_scale"
 },
 "metric_directions": {
 "submission_delay_days": "higher_is_worse",
 "submission_delay_avg": "higher_is_worse",
 "punctuality_rate": "higher_is_better",
 "score_normalized": "higher_is_better"
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "first_point": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "last_point": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": 2,
 "percent_change": 66.6667
 },
 "delay_score_evidence": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0",
 "valid_pair_count": 4,
 "null_delay_count": 1,
 "pairs": [
 {
 "assessment_order": 1,
 "delay": 3,
 "score": 100
 },
 {
 "assessment_order": 3,
 "delay": 2,
 "score": 87
 },
 {
 "assessment_order": 5,
 "delay": 3,
 "score": 90
 },
 {
 "assessment_order": 8,
 "delay": 5,
 "score": 83
 }
 ],
 "pearson_correlation": -0.4015,
 "association_status": "descriptive_only_not_statistically_reliable"
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "secondary_metric_evidence": {
 "score_normalized": {
 "count": 4,
 "min": 83,
 "max": 100,
 "first": 100,
 "last": 83
 },
 "submission_delay_avg": {
 "count": 4,
 "min": 3.25,
 "max": 3.25,
 "first": 3.25,
 "last": 3.25
 },
 "punctuality_rate": {
 "count": 4,
 "min": 0,
 "max": 0,
 "first": 0,
 "last": 0
 }
 }
 }
 },
 {
 "name": "trend_relationship",
 "facts": {
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": -1
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flagged_points": [
 {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 5,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24297"
 },
 "secondary_metrics": {
 "score_normalized": 90,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
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
 "small_sample_caveats": [
 {
 "point_count": 4,
 "minimum_sample_size": 6,
 "warning": "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 }
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Skipped 1 rows with invalid submission_delay_days.",
 "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_series",
 "dataset_name": "submission_lateness",
 "row_count": 5,
 "time_column": "assessment_order",
 "metric_column": "submission_delay_days",
 "metric_units": {
 "submission_delay_days": "days_relative_to_due_date",
 "submission_delay_avg": "days_late_average_positive_only",
 "punctuality_rate": "ratio_0_1",
 "score_normalized": "score_on_runtime_scale"
 },
 "metric_directions": {
 "submission_delay_days": "higher_is_worse",
 "submission_delay_avg": "higher_is_worse",
 "punctuality_rate": "higher_is_better",
 "score_normalized": "higher_is_better"
 },
 "dataset_roles": {},
 "point_count": 4,
 "first_point": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "last_point": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "peak": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "trough": {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": 2,
 "percent_change": 66.6667
 },
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": -1
 },
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 5,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24297"
 },
 "secondary_metrics": {
 "score_normalized": 90,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": 2
 },
 "flagged_points": [
 {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 5,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24297"
 },
 "secondary_metrics": {
 "score_normalized": 90,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 }
 ],
 "secondary_metric_evidence": {
 "score_normalized": {
 "count": 4,
 "min": 83,
 "max": 100,
 "first": 100,
 "last": 83
 },
 "submission_delay_avg": {
 "count": 4,
 "min": 3.25,
 "max": 3.25,
 "first": 3.25,
 "last": 3.25
 },
 "punctuality_rate": {
 "count": 4,
 "min": 0,
 "max": 0,
 "first": 0,
 "last": 0
 }
 },
 "secondary_metric_associations": {
 "score_normalized": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": -0.4015,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 },
 "submission_delay_avg": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 },
 "punctuality_rate": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 }
 },
 "multi_dataset_evidence": [],
 "small_sample_caveats": [
 {
 "point_count": 4,
 "minimum_sample_size": 6,
 "warning": "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 }
 ],
 "causal_claim_allowed": false,
 "action_evidence": [],
 "summarization_warnings": [
 "Skipped 1 rows with invalid submission_delay_days.",
 "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 ],
 "delay_score_evidence": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0",
 "valid_pair_count": 4,
 "null_delay_count": 1,
 "pairs": [
 {
 "assessment_order": 1,
 "delay": 3,
 "score": 100
 },
 {
 "assessment_order": 3,
 "delay": 2,
 "score": 87
 },
 {
 "assessment_order": 5,
 "delay": 3,
 "score": 90
 },
 {
 "assessment_order": 8,
 "delay": 5,
 "score": 83
 }
 ],
 "pearson_correlation": -0.4015,
 "association_status": "descriptive_only_not_statistically_reliable"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4889,
 "token_usage": {
 "prompt_tokens": 2495,
 "completion_tokens": 423,
 "total_tokens": 2918
 },
 "strategy": "behavioral",
 "granularity": "per_assessment",
 "cost_usd": 0.000628
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T08__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "529144afa6988188649edce602299d572add630eb26dfc8a186274adbabf1c49",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2495,
 "completion_tokens": 423,
 "total_tokens": 2918
 },
 "latency_ms": 4894,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-T08",
 "execution_id": "exec_1781847912365_48ce21c2",
 "explanation": {
 "summary": "submission_delay_avg=3.25; punctuality_rate=0; valid_pair_count=4; null_delay_count=1; exact delay-score pairs: assessment_order=1, delay_days=3, score=100 | assessment_order=3, delay_days=2, score=87 | assessment_order=5, delay_days=3, score=90 | assessment_order=8, delay_days=5, score=83; pearson_correlation=-0.4015; association_status=descriptive_only_not_statistically_reliable. Observed delay-score relationship: non_monotonic; delay_days=2 has score=87, delay_days=3 has scores=100 and 90, and the longest delay_days=5 has score=83; the descriptive correlation is -0.4015, but n=4 is not statistically reliable. Delay sequence is non_monotonic (3,2,3,5), and the Exam has null delay.",
 "insights": [],
 "educational_implications": [
 "Four paired observations can describe the returned association but cannot establish causality, procrastination, learning harm, or a reliable score effect."
 ],
 "recommendations": [
 {
 "priority": "medium",
 "action": "Use deadline reminders or submission planning based on punctuality_rate=0.",
 "rationale": "This action is grounded in systematic lateness only; it does not claim that punctuality will improve scores."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data shows clear trends in submission delays and corresponding scores.",
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
 "full_result_row_count": 5,
 "included_row_count": 5,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "submission_lateness",
 "row_count": 5,
 "included_row_count": 5
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 5,
 "baseline_reference_tokens": 376,
 "task_aware_prompt_tokens": 1900,
 "token_ratio": 5.0532,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
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
 "comparison.secondary_metric_associations"
 ],
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State submission_delay_avg, punctuality_rate, all valid delay-score pairs, the null Exam delay, and the deterministic descriptive correlation.",
 "With four valid pairs, label the relationship descriptive_only_not_statistically_reliable; do not claim monotonic delay growth, causality, or score benefit from punctuality."
 ],
 "must_keep_keys": [
 "action_evidence",
 "dataset_name",
 "delay_score_evidence",
 "first_point",
 "flagged_points",
 "largest_adjacent_drop",
 "last_point",
 "metric_column",
 "overall_change",
 "point_count",
 "row_count",
 "secondary_metric_evidence",
 "small_sample_caveats",
 "summarization_warnings",
 "time_column"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (5.0532 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "trend_series",
 "task_id": "S-T08",
 "task_output_contract": [
 "Identify timing, first/last points, overall change, and flagged points when supplied.",
 "For empty or insufficient data, state row count and missing capability/data-quality warnings instead of inferring a trend.",
 "Only recommend timing when critical weeks or action_evidence are present.",
 "State submission_delay_avg, punctuality_rate, all valid delay-score pairs, the null Exam delay, and the deterministic descriptive correlation.",
 "With four valid pairs, label the relationship descriptive_only_not_statistically_reliable; do not claim monotonic delay growth, causality, or score benefit from punctuality."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "submission_lateness",
 "row_count": 5,
 "point_count": 4,
 "time_column": "assessment_order",
 "metric_column": "submission_delay_days",
 "dataset_roles": {},
 "metric_units": {
 "submission_delay_days": "days_relative_to_due_date",
 "submission_delay_avg": "days_late_average_positive_only",
 "punctuality_rate": "ratio_0_1",
 "score_normalized": "score_on_runtime_scale"
 },
 "metric_directions": {
 "submission_delay_days": "higher_is_worse",
 "submission_delay_avg": "higher_is_worse",
 "punctuality_rate": "higher_is_better",
 "score_normalized": "higher_is_better"
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "first_point": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "last_point": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": 2,
 "percent_change": 66.6667
 },
 "delay_score_evidence": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0",
 "valid_pair_count": 4,
 "null_delay_count": 1,
 "pairs": [
 {
 "assessment_order": 1,
 "delay": 3,
 "score": 100
 },
 {
 "assessment_order": 3,
 "delay": 2,
 "score": 87
 },
 {
 "assessment_order": 5,
 "delay": 3,
 "score": 90
 },
 {
 "assessment_order": 8,
 "delay": 5,
 "score": 83
 }
 ],
 "pearson_correlation": -0.4015,
 "association_status": "descriptive_only_not_statistically_reliable"
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "secondary_metric_evidence": {
 "score_normalized": {
 "count": 4,
 "min": 83,
 "max": 100,
 "first": 100,
 "last": 83
 },
 "submission_delay_avg": {
 "count": 4,
 "min": 3.25,
 "max": 3.25,
 "first": 3.25,
 "last": 3.25
 },
 "punctuality_rate": {
 "count": 4,
 "min": 0,
 "max": 0,
 "first": 0,
 "last": 0
 }
 }
 }
 },
 {
 "name": "trend_relationship",
 "facts": {
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": -1
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flagged_points": [
 {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 5,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24297"
 },
 "secondary_metrics": {
 "score_normalized": 90,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
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
 "small_sample_caveats": [
 {
 "point_count": 4,
 "minimum_sample_size": 6,
 "warning": "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 }
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "Skipped 1 rows with invalid submission_delay_days.",
 "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "trend_series",
 "dataset_name": "submission_lateness",
 "row_count": 5,
 "time_column": "assessment_order",
 "metric_column": "submission_delay_days",
 "metric_units": {
 "submission_delay_days": "days_relative_to_due_date",
 "submission_delay_avg": "days_late_average_positive_only",
 "punctuality_rate": "ratio_0_1",
 "score_normalized": "score_on_runtime_scale"
 },
 "metric_directions": {
 "submission_delay_days": "higher_is_worse",
 "submission_delay_avg": "higher_is_worse",
 "punctuality_rate": "higher_is_better",
 "score_normalized": "higher_is_better"
 },
 "dataset_roles": {},
 "point_count": 4,
 "first_point": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "last_point": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "peak": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "trough": {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "overall_change": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": 2,
 "percent_change": 66.6667
 },
 "largest_adjacent_drop": {
 "from": {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": -1
 },
 "largest_adjacent_rise": {
 "from": {
 "assessment_order": 5,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24297"
 },
 "secondary_metrics": {
 "score_normalized": 90,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "to": {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 }
 },
 "delta": 2
 },
 "flagged_points": [
 {
 "assessment_order": 1,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24295"
 },
 "secondary_metrics": {
 "score_normalized": 100,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 3,
 "submission_delay_days": 2,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24296"
 },
 "secondary_metrics": {
 "score_normalized": 87,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 5,
 "submission_delay_days": 3,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24297"
 },
 "secondary_metrics": {
 "score_normalized": 90,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 },
 {
 "assessment_order": 8,
 "submission_delay_days": 5,
 "labels": {
 "assessment_type": "CMA",
 "assessment_name": "24298"
 },
 "secondary_metrics": {
 "score_normalized": 83,
 "submission_delay_avg": 3.25,
 "punctuality_rate": 0
 },
 "flags": {
 "pass_flag": true
 },
 "flag_raw_values": {
 "pass_flag": true
 }
 }
 ],
 "secondary_metric_evidence": {
 "score_normalized": {
 "count": 4,
 "min": 83,
 "max": 100,
 "first": 100,
 "last": 83
 },
 "submission_delay_avg": {
 "count": 4,
 "min": 3.25,
 "max": 3.25,
 "first": 3.25,
 "last": 3.25
 },
 "punctuality_rate": {
 "count": 4,
 "min": 0,
 "max": 0,
 "first": 0,
 "last": 0
 }
 },
 "secondary_metric_associations": {
 "score_normalized": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": -0.4015,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 },
 "submission_delay_avg": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 },
 "punctuality_rate": {
 "paired_point_count": 4,
 "method": "pearson_on_aligned_points",
 "correlation": null,
 "claim_limit": "descriptive_association_only; do not infer causality or statistical significance",
 "small_sample": true
 }
 },
 "multi_dataset_evidence": [],
 "small_sample_caveats": [
 {
 "point_count": 4,
 "minimum_sample_size": 6,
 "warning": "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 }
 ],
 "causal_claim_allowed": false,
 "action_evidence": [],
 "summarization_warnings": [
 "Skipped 1 rows with invalid submission_delay_days.",
 "Only 4 trend points are available; treat secondary associations as descriptive, not causal or statistically reliable."
 ],
 "delay_score_evidence": {
 "submission_delay_avg": "3.25",
 "punctuality_rate": "0",
 "valid_pair_count": 4,
 "null_delay_count": 1,
 "pairs": [
 {
 "assessment_order": 1,
 "delay": 3,
 "score": 100
 },
 {
 "assessment_order": 3,
 "delay": 2,
 "score": 87
 },
 {
 "assessment_order": 5,
 "delay": 3,
 "score": 90
 },
 {
 "assessment_order": 8,
 "delay": 5,
 "score": 83
 }
 ],
 "pearson_correlation": -0.4015,
 "association_status": "descriptive_only_not_statistically_reliable"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 4889,
 "token_usage": {
 "prompt_tokens": 2495,
 "completion_tokens": 423,
 "total_tokens": 2918
 },
 "strategy": "behavioral",
 "granularity": "per_assessment",
 "cost_usd": 0.000628
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
 "observed": "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018",
 "expected_values": [
 "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac",
 "expected": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac"
 },
 {
 "check_id": "numeric_fields_submission_lateness",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "submission_lateness",
 "numeric_columns": [
 "assessment_order",
 "score_normalized",
 "submission_day",
 "due_day",
 "submission_delay_days"
 ],
 "numeric_summaries": {
 "assessment_order": {
 "count": 5,
 "min": 1,
 "max": 9
 },
 "score_normalized": {
 "count": 5,
 "min": 83,
 "max": 100
 },
 "submission_day": {
 "count": 5,
 "min": 21,
 "max": 244
 },
 "due_day": {
 "count": 4,
 "min": 18,
 "max": 214
 },
 "submission_delay_days": {
 "count": 4,
 "min": 2,
 "max": 5
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_submission_lateness",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "submission_lateness",
 "flag_columns": [
 "pass_flag"
 ],
 "triggered_like_counts": {
 "pass_flag": 5
 }
 }
]
```

