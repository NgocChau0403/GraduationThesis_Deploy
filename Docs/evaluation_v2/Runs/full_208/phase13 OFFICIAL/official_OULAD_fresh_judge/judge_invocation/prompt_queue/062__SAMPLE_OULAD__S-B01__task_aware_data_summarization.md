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

# LLM Judge Final Judge Context - SAMPLE_OULAD__S-B01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__S-B01__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "S-B01",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Performance overview",
 "scope": "1 student",
 "actionable_question": "How am I performing overall?",
 "target_audience": "student",
 "ai_summary_type": "metric_snapshot",
 "ai_prompt_hint": "Summarise overall score, pass/fail status, class benchmark, percentile, and the most useful next action based only on returned fields.",
 "query_labels": [
 "performance_summary"
 ],
 "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
 "source_tables": [
 "enrollment",
 "assessment_result",
 "assessment"
 ],
 "key_db_fields": [
 "avg_score [FE]",
 "pass_rate [FE]",
 "performance_trend [FE]",
 "final_outcome"
 ],
 "output_schema": {
 "required_columns": [
 "avg_score",
 "pass_rate",
 "performance_trend",
 "final_outcome"
 ],
 "optional_columns": [
 "class_avg_score",
 "class_median_score",
 "score_percentile",
 "unweighted_avg_score",
 "weighted_avg_score",
 "score_strategy",
 "assessment_count",
 "score_vs_class_avg",
 "cohort_size",
 "score_scale",
 "pass_threshold",
 "target_threshold",
 "performance_band"
 ]
 },
 "query_labels": [
 "performance_summary"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "S-B01-CORE-01",
 "description": "State the overall score and pass/fail status."
 }
 ],
 "required_supporting_outputs": [
 {
 "requirement_id": "S-B01-SUPPORT-01",
 "description": "Compare against the class benchmark when class benchmark fields are present."
 },
 {
 "requirement_id": "S-B01-SUPPORT-02",
 "description": "Report percentile standing when score_percentile is present."
 },
 {
 "requirement_id": "S-B01-SUPPORT-03",
 "description": "Suggest the most useful next action supported by returned fields."
 }
 ],
 "evaluation_constraints": [
 {
 "constraint_id": "S-B01-CONSTRAINT-01",
 "description": "Use only returned fields; do not fill missing benchmark or percentile values with invented estimates."
 },
 {
 "constraint_id": "S-B01-CONSTRAINT-02",
 "description": "If percentile data is absent, omit percentile comparison and state that it is unavailable when relevant."
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
 "dataset_label": "performance_summary",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-B01.json",
 "artifact_sha256": "0874cd8ae96d22ade2eaf25455434307b744aeb490d27c7ba35ae21e9dcb363c",
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
 "evidence_artifact_file_sha256": "0874cd8ae96d22ade2eaf25455434307b744aeb490d27c7ba35ae21e9dcb363c",
 "evidence_rows_sha256": "2402bef4145f0a2480bf0c905e1e174744cf198d3c1a8f3d890a68b79ce811b1",
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
 "embedded_datasets_sha256": "2402bef4145f0a2480bf0c905e1e174744cf198d3c1a8f3d890a68b79ce811b1",
 "datasets": {
 "performance_summary": [
 {
 "avg_score": 94.34,
 "pass_rate": 1,
 "performance_trend": -0.7187500000000001,
 "final_outcome": "Distinction",
 "class_avg_score": 66.68,
 "class_median_score": 68.59,
 "score_vs_class_avg": 27.66,
 "score_percentile": 89.8,
 "cohort_size": 1998,
 "unweighted_avg_score": 91.2,
 "weighted_avg_score": 94.34,
 "score_strategy": "weighted_by_assessment_weight",
 "assessment_count": 5,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "performance_band": "strong_relative_performance"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-B01__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "1a47d1c84ee9e988e0bc7b5b54bb5a4b983f504334fdcc302f3621ba5b0d95ad",
 "generator_input_sha256": "ef6d44e440a513899297c8f338baab8cdb936591f10eaad6f85c340e2c484b92",
 "generator_input_compact": {
 "task_id": "S-B01",
 "execution_id": "exec_1781847848460_b5d1cbb0",
 "task_name": "Performance overview",
 "analysis_type": "aggregation",
 "explanation_strategy": "distribution",
 "actionable_question": "How am I performing overall?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "performance_summary"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "performance_summary"
 ],
 "dataset_row_counts": {
 "performance_summary": 1
 },
 "ai_summary_config_summary": {
 "summary_type": "metric_snapshot",
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
 "raw_text": "Summary: Exact performance overview: weighted_avg_score=94.34; unweighted_avg_score=91.2; class_avg_score=66.68; class_median_score=68.59; score_vs_class_avg=27.66; score_percentile=89.8; cohort_size=1998; performance_trend=-0.7187500000000001; pass_rate=1; final_outcome=Distinction; assessment_count=5; performance_band=strong_relative_performance; score_strategy=weighted_by_assessment_weight; score_scale=100; pass_threshold=40; target_threshold=70. These fields describe measured performance and do not directly measure understanding or guarantee future results.\n\nEducational implications: Use the negative performance_trend as a monitoring signal while preserving the strong relative score evidence; no cause is established.",
 "structured_payload": {
 "task_id": "S-B01",
 "execution_id": "exec_1781847848460_b5d1cbb0",
 "explanation": {
 "summary": "Exact performance overview: weighted_avg_score=94.34; unweighted_avg_score=91.2; class_avg_score=66.68; class_median_score=68.59; score_vs_class_avg=27.66; score_percentile=89.8; cohort_size=1998; performance_trend=-0.7187500000000001; pass_rate=1; final_outcome=Distinction; assessment_count=5; performance_band=strong_relative_performance; score_strategy=weighted_by_assessment_weight; score_scale=100; pass_threshold=40; target_threshold=70. These fields describe measured performance and do not directly measure understanding or guarantee future results.",
 "insights": [],
 "educational_implications": [
 "Use the negative performance_trend as a monitoring signal while preserving the strong relative score evidence; no cause is established."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is complete and accurately reflects your performance metrics.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "metric_snapshot",
 "ai_summary_method_warning": null,
 "full_result_row_count": 1,
 "included_row_count": 1,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "performance_summary",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 152,
 "task_aware_prompt_tokens": 1163,
 "token_ratio": 7.6513,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "action_evidence.action_evidence",
 "exceptions.sensitive_context",
 "exceptions.sensitive_context_present",
 "exceptions.flag_evidence",
 "comparison.benchmark_evidence",
 "comparison.threshold_evidence",
 "primary_finding.label_evidence",
 "primary_finding.status_evidence"
 ],
 "task_output_contract": [
 "State exact weighted score, unweighted score, class average, class median, score difference, score percentile, cohort size, trend, pass rate, outcome, assessment count, and performance band.",
 "Describe measured performance only; do not infer understanding, causes, or guaranteed future outcomes."
 ],
 "must_keep_keys": [
 "metric_snapshot",
 "performance_overview_evidence"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (7.6513 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "metric_snapshot",
 "task_id": "S-B01",
 "task_output_contract": [
 "State exact weighted score, unweighted score, class average, class median, score difference, score percentile, cohort size, trend, pass rate, outcome, assessment count, and performance band.",
 "Describe measured performance only; do not infer understanding, causes, or guaranteed future outcomes."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "performance_summary",
 "row_count": 1,
 "entity": null,
 "evidence_status": "sufficient"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "metric_snapshot": {
 "avg_score": {
 "value": 94.34,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "pass_rate": {
 "value": 1,
 "unit": "ratio_0_1",
 "available": true
 },
 "performance_trend": {
 "value": -0.7187500000000001,
 "unit": "score_change_per_assessment_order",
 "available": true
 },
 "score_vs_class_avg": {
 "value": 27.66,
 "unit": "score_point_difference",
 "available": true
 },
 "score_percentile": {
 "value": 89.8,
 "unit": "percentile_0_100",
 "available": true
 },
 "unweighted_avg_score": {
 "value": 91.2,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "weighted_avg_score": {
 "value": 94.34,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "assessment_count": {
 "value": 5,
 "unit": "count",
 "available": true
 },
 "cohort_size": {
 "value": 1998,
 "unit": "count",
 "available": true
 }
 },
 "performance_overview_evidence": {
 "snapshot": {
 "avg_score": 94.34,
 "pass_rate": 1,
 "performance_trend": -0.7187500000000001,
 "final_outcome": "Distinction",
 "class_avg_score": 66.68,
 "class_median_score": 68.59,
 "score_vs_class_avg": 27.66,
 "score_percentile": 89.8,
 "cohort_size": 1998,
 "unweighted_avg_score": 91.2,
 "weighted_avg_score": 94.34,
 "score_strategy": "weighted_by_assessment_weight",
 "assessment_count": 5,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "performance_band": "strong_relative_performance"
 },
 "policy": "measured_performance_only_no_understanding_or_future_outcome_inference"
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_evidence": [],
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "avg_score",
 "pass_rate",
 "performance_trend",
 "score_vs_class_avg",
 "score_percentile",
 "unweighted_avg_score",
 "weighted_avg_score",
 "assessment_count",
 "cohort_size"
 ],
 "configured_status_columns": [
 "final_outcome",
 "score_strategy",
 "performance_band"
 ],
 "configured_threshold_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "configured_benchmark_columns": [
 "class_avg_score",
 "class_median_score"
 ],
 "configured_sensitive_columns": [],
 "metric_availability_columns": {},
 "metric_units": {
 "avg_score": "score_on_runtime_scale",
 "pass_rate": "ratio_0_1",
 "performance_trend": "score_change_per_assessment_order",
 "score_vs_class_avg": "score_point_difference",
 "score_percentile": "percentile_0_100",
 "unweighted_avg_score": "score_on_runtime_scale",
 "weighted_avg_score": "score_on_runtime_scale",
 "assessment_count": "count",
 "cohort_size": "count",
 "pass_threshold": "score_on_runtime_scale",
 "target_threshold": "score_on_runtime_scale",
 "class_avg_score": "score_on_runtime_scale",
 "class_median_score": "score_on_runtime_scale"
 },
 "threshold_sources": {
 "pass_threshold": "runtime_score_context",
 "target_threshold": "runtime_score_context"
 },
 "benchmark_sources": {
 "class_avg_score": "class_cohort",
 "class_median_score": "class_cohort"
 },
 "sensitive_context_policy": null,
 "missing_required_columns": [],
 "missing_unit_metadata": [],
 "missing_threshold_sources": [],
 "missing_benchmark_sources": [],
 "errors": []
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "metric_snapshot",
 "dataset_name": "performance_summary",
 "row_count": 1,
 "entity": null,
 "metric_snapshot": {
 "avg_score": {
 "value": 94.34,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "pass_rate": {
 "value": 1,
 "unit": "ratio_0_1",
 "available": true
 },
 "performance_trend": {
 "value": -0.7187500000000001,
 "unit": "score_change_per_assessment_order",
 "available": true
 },
 "score_vs_class_avg": {
 "value": 27.66,
 "unit": "score_point_difference",
 "available": true
 },
 "score_percentile": {
 "value": 89.8,
 "unit": "percentile_0_100",
 "available": true
 },
 "unweighted_avg_score": {
 "value": 91.2,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "weighted_avg_score": {
 "value": 94.34,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "assessment_count": {
 "value": 5,
 "unit": "count",
 "available": true
 },
 "cohort_size": {
 "value": 1998,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "final_outcome": "Distinction",
 "score_strategy": "weighted_by_assessment_weight",
 "performance_band": "strong_relative_performance"
 },
 "threshold_evidence": {
 "pass_threshold": {
 "value": 40,
 "unit": "score_on_runtime_scale",
 "source": "runtime_score_context"
 },
 "target_threshold": {
 "value": 70,
 "unit": "score_on_runtime_scale",
 "source": "runtime_score_context"
 }
 },
 "benchmark_evidence": {
 "class_avg_score": {
 "value": 66.68,
 "unit": "score_on_runtime_scale",
 "source": "class_cohort"
 },
 "class_median_score": {
 "value": 68.59,
 "unit": "score_on_runtime_scale",
 "source": "class_cohort"
 }
 },
 "label_evidence": {
 "score_scale": 100
 },
 "flag_evidence": {},
 "action_evidence": {},
 "missing_evidence": [],
 "sensitive_context_present": false,
 "sensitive_context": {},
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "avg_score",
 "pass_rate",
 "performance_trend",
 "score_vs_class_avg",
 "score_percentile",
 "unweighted_avg_score",
 "weighted_avg_score",
 "assessment_count",
 "cohort_size"
 ],
 "configured_status_columns": [
 "final_outcome",
 "score_strategy",
 "performance_band"
 ],
 "configured_threshold_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "configured_benchmark_columns": [
 "class_avg_score",
 "class_median_score"
 ],
 "configured_sensitive_columns": [],
 "metric_availability_columns": {},
 "metric_units": {
 "avg_score": "score_on_runtime_scale",
 "pass_rate": "ratio_0_1",
 "performance_trend": "score_change_per_assessment_order",
 "score_vs_class_avg": "score_point_difference",
 "score_percentile": "percentile_0_100",
 "unweighted_avg_score": "score_on_runtime_scale",
 "weighted_avg_score": "score_on_runtime_scale",
 "assessment_count": "count",
 "cohort_size": "count",
 "pass_threshold": "score_on_runtime_scale",
 "target_threshold": "score_on_runtime_scale",
 "class_avg_score": "score_on_runtime_scale",
 "class_median_score": "score_on_runtime_scale"
 },
 "threshold_sources": {
 "pass_threshold": "runtime_score_context",
 "target_threshold": "runtime_score_context"
 },
 "benchmark_sources": {
 "class_avg_score": "class_cohort",
 "class_median_score": "class_cohort"
 },
 "sensitive_context_policy": null,
 "missing_required_columns": [],
 "missing_unit_metadata": [],
 "missing_threshold_sources": [],
 "missing_benchmark_sources": [],
 "errors": []
 },
 "evidence_status": "sufficient",
 "causal_claim_allowed": false,
 "summarization_warnings": [],
 "performance_overview_evidence": {
 "snapshot": {
 "avg_score": 94.34,
 "pass_rate": 1,
 "performance_trend": -0.7187500000000001,
 "final_outcome": "Distinction",
 "class_avg_score": 66.68,
 "class_median_score": 68.59,
 "score_vs_class_avg": 27.66,
 "score_percentile": 89.8,
 "cohort_size": 1998,
 "unweighted_avg_score": 91.2,
 "weighted_avg_score": 94.34,
 "score_strategy": "weighted_by_assessment_weight",
 "assessment_count": 5,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "performance_band": "strong_relative_performance"
 },
 "policy": "measured_performance_only_no_understanding_or_future_outcome_inference"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5455,
 "token_usage": {
 "prompt_tokens": 1599,
 "completion_tokens": 403,
 "total_tokens": 2002
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000482
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-B01__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "1a47d1c84ee9e988e0bc7b5b54bb5a4b983f504334fdcc302f3621ba5b0d95ad",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1599,
 "completion_tokens": 403,
 "total_tokens": 2002
 },
 "latency_ms": 5464,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-B01",
 "execution_id": "exec_1781847848460_b5d1cbb0",
 "explanation": {
 "summary": "Exact performance overview: weighted_avg_score=94.34; unweighted_avg_score=91.2; class_avg_score=66.68; class_median_score=68.59; score_vs_class_avg=27.66; score_percentile=89.8; cohort_size=1998; performance_trend=-0.7187500000000001; pass_rate=1; final_outcome=Distinction; assessment_count=5; performance_band=strong_relative_performance; score_strategy=weighted_by_assessment_weight; score_scale=100; pass_threshold=40; target_threshold=70. These fields describe measured performance and do not directly measure understanding or guarantee future results.",
 "insights": [],
 "educational_implications": [
 "Use the negative performance_trend as a monitoring signal while preserving the strong relative score evidence; no cause is established."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is complete and accurately reflects your performance metrics.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "metric_snapshot",
 "ai_summary_method_warning": null,
 "full_result_row_count": 1,
 "included_row_count": 1,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "performance_summary",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 152,
 "task_aware_prompt_tokens": 1163,
 "token_ratio": 7.6513,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "action_evidence.action_evidence",
 "exceptions.sensitive_context",
 "exceptions.sensitive_context_present",
 "exceptions.flag_evidence",
 "comparison.benchmark_evidence",
 "comparison.threshold_evidence",
 "primary_finding.label_evidence",
 "primary_finding.status_evidence"
 ],
 "task_output_contract": [
 "State exact weighted score, unweighted score, class average, class median, score difference, score percentile, cohort size, trend, pass rate, outcome, assessment count, and performance band.",
 "Describe measured performance only; do not infer understanding, causes, or guaranteed future outcomes."
 ],
 "must_keep_keys": [
 "metric_snapshot",
 "performance_overview_evidence"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (7.6513 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "metric_snapshot",
 "task_id": "S-B01",
 "task_output_contract": [
 "State exact weighted score, unweighted score, class average, class median, score difference, score percentile, cohort size, trend, pass rate, outcome, assessment count, and performance band.",
 "Describe measured performance only; do not infer understanding, causes, or guaranteed future outcomes."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "performance_summary",
 "row_count": 1,
 "entity": null,
 "evidence_status": "sufficient"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "metric_snapshot": {
 "avg_score": {
 "value": 94.34,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "pass_rate": {
 "value": 1,
 "unit": "ratio_0_1",
 "available": true
 },
 "performance_trend": {
 "value": -0.7187500000000001,
 "unit": "score_change_per_assessment_order",
 "available": true
 },
 "score_vs_class_avg": {
 "value": 27.66,
 "unit": "score_point_difference",
 "available": true
 },
 "score_percentile": {
 "value": 89.8,
 "unit": "percentile_0_100",
 "available": true
 },
 "unweighted_avg_score": {
 "value": 91.2,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "weighted_avg_score": {
 "value": 94.34,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "assessment_count": {
 "value": 5,
 "unit": "count",
 "available": true
 },
 "cohort_size": {
 "value": 1998,
 "unit": "count",
 "available": true
 }
 },
 "performance_overview_evidence": {
 "snapshot": {
 "avg_score": 94.34,
 "pass_rate": 1,
 "performance_trend": -0.7187500000000001,
 "final_outcome": "Distinction",
 "class_avg_score": 66.68,
 "class_median_score": 68.59,
 "score_vs_class_avg": 27.66,
 "score_percentile": 89.8,
 "cohort_size": 1998,
 "unweighted_avg_score": 91.2,
 "weighted_avg_score": 94.34,
 "score_strategy": "weighted_by_assessment_weight",
 "assessment_count": 5,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "performance_band": "strong_relative_performance"
 },
 "policy": "measured_performance_only_no_understanding_or_future_outcome_inference"
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_evidence": [],
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "avg_score",
 "pass_rate",
 "performance_trend",
 "score_vs_class_avg",
 "score_percentile",
 "unweighted_avg_score",
 "weighted_avg_score",
 "assessment_count",
 "cohort_size"
 ],
 "configured_status_columns": [
 "final_outcome",
 "score_strategy",
 "performance_band"
 ],
 "configured_threshold_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "configured_benchmark_columns": [
 "class_avg_score",
 "class_median_score"
 ],
 "configured_sensitive_columns": [],
 "metric_availability_columns": {},
 "metric_units": {
 "avg_score": "score_on_runtime_scale",
 "pass_rate": "ratio_0_1",
 "performance_trend": "score_change_per_assessment_order",
 "score_vs_class_avg": "score_point_difference",
 "score_percentile": "percentile_0_100",
 "unweighted_avg_score": "score_on_runtime_scale",
 "weighted_avg_score": "score_on_runtime_scale",
 "assessment_count": "count",
 "cohort_size": "count",
 "pass_threshold": "score_on_runtime_scale",
 "target_threshold": "score_on_runtime_scale",
 "class_avg_score": "score_on_runtime_scale",
 "class_median_score": "score_on_runtime_scale"
 },
 "threshold_sources": {
 "pass_threshold": "runtime_score_context",
 "target_threshold": "runtime_score_context"
 },
 "benchmark_sources": {
 "class_avg_score": "class_cohort",
 "class_median_score": "class_cohort"
 },
 "sensitive_context_policy": null,
 "missing_required_columns": [],
 "missing_unit_metadata": [],
 "missing_threshold_sources": [],
 "missing_benchmark_sources": [],
 "errors": []
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "metric_snapshot",
 "dataset_name": "performance_summary",
 "row_count": 1,
 "entity": null,
 "metric_snapshot": {
 "avg_score": {
 "value": 94.34,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "pass_rate": {
 "value": 1,
 "unit": "ratio_0_1",
 "available": true
 },
 "performance_trend": {
 "value": -0.7187500000000001,
 "unit": "score_change_per_assessment_order",
 "available": true
 },
 "score_vs_class_avg": {
 "value": 27.66,
 "unit": "score_point_difference",
 "available": true
 },
 "score_percentile": {
 "value": 89.8,
 "unit": "percentile_0_100",
 "available": true
 },
 "unweighted_avg_score": {
 "value": 91.2,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "weighted_avg_score": {
 "value": 94.34,
 "unit": "score_on_runtime_scale",
 "available": true
 },
 "assessment_count": {
 "value": 5,
 "unit": "count",
 "available": true
 },
 "cohort_size": {
 "value": 1998,
 "unit": "count",
 "available": true
 }
 },
 "status_evidence": {
 "final_outcome": "Distinction",
 "score_strategy": "weighted_by_assessment_weight",
 "performance_band": "strong_relative_performance"
 },
 "threshold_evidence": {
 "pass_threshold": {
 "value": 40,
 "unit": "score_on_runtime_scale",
 "source": "runtime_score_context"
 },
 "target_threshold": {
 "value": 70,
 "unit": "score_on_runtime_scale",
 "source": "runtime_score_context"
 }
 },
 "benchmark_evidence": {
 "class_avg_score": {
 "value": 66.68,
 "unit": "score_on_runtime_scale",
 "source": "class_cohort"
 },
 "class_median_score": {
 "value": 68.59,
 "unit": "score_on_runtime_scale",
 "source": "class_cohort"
 }
 },
 "label_evidence": {
 "score_scale": 100
 },
 "flag_evidence": {},
 "action_evidence": {},
 "missing_evidence": [],
 "sensitive_context_present": false,
 "sensitive_context": {},
 "validation_metadata": {
 "status": "passed",
 "configured_metric_columns": [
 "avg_score",
 "pass_rate",
 "performance_trend",
 "score_vs_class_avg",
 "score_percentile",
 "unweighted_avg_score",
 "weighted_avg_score",
 "assessment_count",
 "cohort_size"
 ],
 "configured_status_columns": [
 "final_outcome",
 "score_strategy",
 "performance_band"
 ],
 "configured_threshold_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "configured_benchmark_columns": [
 "class_avg_score",
 "class_median_score"
 ],
 "configured_sensitive_columns": [],
 "metric_availability_columns": {},
 "metric_units": {
 "avg_score": "score_on_runtime_scale",
 "pass_rate": "ratio_0_1",
 "performance_trend": "score_change_per_assessment_order",
 "score_vs_class_avg": "score_point_difference",
 "score_percentile": "percentile_0_100",
 "unweighted_avg_score": "score_on_runtime_scale",
 "weighted_avg_score": "score_on_runtime_scale",
 "assessment_count": "count",
 "cohort_size": "count",
 "pass_threshold": "score_on_runtime_scale",
 "target_threshold": "score_on_runtime_scale",
 "class_avg_score": "score_on_runtime_scale",
 "class_median_score": "score_on_runtime_scale"
 },
 "threshold_sources": {
 "pass_threshold": "runtime_score_context",
 "target_threshold": "runtime_score_context"
 },
 "benchmark_sources": {
 "class_avg_score": "class_cohort",
 "class_median_score": "class_cohort"
 },
 "sensitive_context_policy": null,
 "missing_required_columns": [],
 "missing_unit_metadata": [],
 "missing_threshold_sources": [],
 "missing_benchmark_sources": [],
 "errors": []
 },
 "evidence_status": "sufficient",
 "causal_claim_allowed": false,
 "summarization_warnings": [],
 "performance_overview_evidence": {
 "snapshot": {
 "avg_score": 94.34,
 "pass_rate": 1,
 "performance_trend": -0.7187500000000001,
 "final_outcome": "Distinction",
 "class_avg_score": 66.68,
 "class_median_score": 68.59,
 "score_vs_class_avg": 27.66,
 "score_percentile": 89.8,
 "cohort_size": 1998,
 "unweighted_avg_score": 91.2,
 "weighted_avg_score": 94.34,
 "score_strategy": "weighted_by_assessment_weight",
 "assessment_count": 5,
 "score_scale": 100,
 "pass_threshold": 40,
 "target_threshold": 70,
 "performance_band": "strong_relative_performance"
 },
 "policy": "measured_performance_only_no_understanding_or_future_outcome_inference"
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5455,
 "token_usage": {
 "prompt_tokens": 1599,
 "completion_tokens": 403,
 "total_tokens": 2002
 },
 "strategy": "distribution",
 "granularity": "semester",
 "cost_usd": 0.000482
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
 "observed": "0874cd8ae96d22ade2eaf25455434307b744aeb490d27c7ba35ae21e9dcb363c",
 "expected_values": [
 "0874cd8ae96d22ade2eaf25455434307b744aeb490d27c7ba35ae21e9dcb363c"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "2402bef4145f0a2480bf0c905e1e174744cf198d3c1a8f3d890a68b79ce811b1",
 "expected": "2402bef4145f0a2480bf0c905e1e174744cf198d3c1a8f3d890a68b79ce811b1"
 },
 {
 "check_id": "numeric_fields_performance_summary",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "performance_summary",
 "numeric_columns": [
 "assessment_count",
 "avg_score",
 "class_avg_score",
 "class_median_score",
 "cohort_size",
 "pass_rate",
 "pass_threshold",
 "performance_trend",
 "score_percentile",
 "score_scale",
 "score_vs_class_avg",
 "target_threshold",
 "unweighted_avg_score",
 "weighted_avg_score"
 ],
 "numeric_summaries": {
 "assessment_count": {
 "count": 1,
 "min": 5,
 "max": 5
 },
 "avg_score": {
 "count": 1,
 "min": 94.34,
 "max": 94.34
 },
 "class_avg_score": {
 "count": 1,
 "min": 66.68,
 "max": 66.68
 },
 "class_median_score": {
 "count": 1,
 "min": 68.59,
 "max": 68.59
 },
 "cohort_size": {
 "count": 1,
 "min": 1998,
 "max": 1998
 },
 "pass_rate": {
 "count": 1,
 "min": 1,
 "max": 1
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
 "score_percentile": {
 "count": 1,
 "min": 89.8,
 "max": 89.8
 },
 "score_scale": {
 "count": 1,
 "min": 100,
 "max": 100
 },
 "score_vs_class_avg": {
 "count": 1,
 "min": 27.66,
 "max": 27.66
 },
 "target_threshold": {
 "count": 1,
 "min": 70,
 "max": 70
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_performance_summary",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "performance_summary",
 "flag_columns": [
 "pass_threshold",
 "target_threshold"
 ],
 "triggered_like_counts": {
 "pass_threshold": 0,
 "target_threshold": 0
 }
 }
]
```

