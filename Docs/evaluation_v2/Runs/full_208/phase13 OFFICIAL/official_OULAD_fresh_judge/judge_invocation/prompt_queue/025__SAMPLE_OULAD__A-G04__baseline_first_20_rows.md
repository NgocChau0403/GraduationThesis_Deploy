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

# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G04__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-G04__baseline_first_20_rows",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G04",
 "explanation_mode": "baseline_first_20_rows",
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

## Deterministic Retrieval Evidence

```json
{
 "full_query_artifacts": [
 {
 "dataset_label": "assessment_difficulty",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G04.json",
 "artifact_sha256": "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae",
 "row_count": 112,
 "readable": true
 }
 ],
 "evidence_access_mode": "deterministic_artifact_retrieval",
 "full_result_row_count": 112,
 "prompt_embedded_row_count": 0,
 "retrieved_row_count": 112,
 "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G04__baseline_first_20_rows.json",
 "full_access_available": true,
 "full_result_sent_to_llm": false,
 "evidence_artifact_file_sha256": "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae",
 "evidence_rows_sha256": "efaaa326237f67aa56d5231bbd426e5831437f739fc7c8852c6e86fc6e2e1717",
 "retrieval_validation": {
 "status": "pass",
 "retrieved_row_count": 112,
 "chunk_count": 1,
 "chunk_ids": [
 "SAMPLE_OULAD__A-G04__baseline_first_20_rows__assessment_difficulty__chunk_1"
 ],
 "row_ranges": [
 {
 "dataset_label": "assessment_difficulty",
 "row_start_inclusive": 0,
 "row_end_inclusive": 111,
 "row_count": 112
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
 "generated_at": "2026-06-21T20:50:27.644Z",
 "record_id": "SAMPLE_OULAD__A-G04__baseline_first_20_rows",
 "retrieval_request_complete": true,
 "retrieval_coverage_status": "full",
 "chunks": [
 {
 "chunk_id": "SAMPLE_OULAD__A-G04__baseline_first_20_rows__assessment_difficulty__chunk_1",
 "dataset_label": "assessment_difficulty",
 "row_start_inclusive": 0,
 "row_end_inclusive": 111,
 "row_count": 112,
 "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G04.json",
 "source_artifact_sha256": "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae"
 }
 ]
 },
 "retrieved_datasets_sha256": "efaaa326237f67aa56d5231bbd426e5831437f739fc7c8852c6e86fc6e2e1717",
 "retrieved_datasets": {
 "assessment_difficulty": [
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24288",
 "assessment_name": "24288",
 "assessment_type": "CMA",
 "assessment_order": 5,
 "week_of_class": 20,
 "competency_tag": "24288",
 "competency_source": "proxy",
 "total_submissions": 26,
 "fail_count": 13,
 "fail_rate_pct": 50,
 "avg_score": 45.04
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24283",
 "assessment_name": "24283",
 "assessment_type": "TMA",
 "assessment_order": 4,
 "week_of_class": 15,
 "competency_tag": "24283",
 "competency_source": "proxy",
 "total_submissions": 24,
 "fail_count": 7,
 "fail_rate_pct": 29.2,
 "avg_score": 56.63
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24289",
 "assessment_name": "24289",
 "assessment_type": "CMA",
 "assessment_order": 8,
 "week_of_class": 30,
 "competency_tag": "24289",
 "competency_source": "proxy",
 "total_submissions": 7,
 "fail_count": 2,
 "fail_rate_pct": 28.6,
 "avg_score": 45
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24286",
 "assessment_name": "24286",
 "assessment_type": "CMA",
 "assessment_order": 1,
 "week_of_class": 3,
 "competency_tag": "24286",
 "competency_source": "proxy",
 "total_submissions": 105,
 "fail_count": 29,
 "fail_rate_pct": 27.6,
 "avg_score": 49.33
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24284",
 "assessment_name": "24284",
 "assessment_type": "TMA",
 "assessment_order": 6,
 "week_of_class": 22,
 "competency_tag": "24284",
 "competency_source": "proxy",
 "total_submissions": 12,
 "fail_count": 3,
 "fail_rate_pct": 25,
 "avg_score": 51.75
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24287",
 "assessment_name": "24287",
 "assessment_type": "CMA",
 "assessment_order": 3,
 "week_of_class": 10,
 "competency_tag": "24287",
 "competency_source": "proxy",
 "total_submissions": 63,
 "fail_count": 15,
 "fail_rate_pct": 23.8,
 "avg_score": 63.25
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25360",
 "assessment_name": "25360",
 "assessment_type": "TMA",
 "assessment_order": 6,
 "week_of_class": 29,
 "competency_tag": "25360",
 "competency_source": "proxy",
 "total_submissions": 83,
 "fail_count": 16,
 "fail_rate_pct": 19.3,
 "avg_score": 64.36
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25339",
 "assessment_name": "25339",
 "assessment_type": "TMA",
 "assessment_order": 12,
 "week_of_class": 29,
 "competency_tag": "25339",
 "competency_source": "proxy",
 "total_submissions": 23,
 "fail_count": 4,
 "fail_rate_pct": 17.4,
 "avg_score": 57.52
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25366",
 "assessment_name": "25366",
 "assessment_type": "TMA",
 "assessment_order": 5,
 "week_of_class": 21,
 "competency_tag": "25366",
 "competency_source": "proxy",
 "total_submissions": 70,
 "fail_count": 11,
 "fail_rate_pct": 15.7,
 "avg_score": 68.13
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25352",
 "assessment_name": "25352",
 "assessment_type": "TMA",
 "assessment_order": 5,
 "week_of_class": 24,
 "competency_tag": "25352",
 "competency_source": "proxy",
 "total_submissions": 157,
 "fail_count": 24,
 "fail_rate_pct": 15.3,
 "avg_score": 66.87
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25367",
 "assessment_name": "25367",
 "assessment_type": "TMA",
 "assessment_order": 6,
 "week_of_class": 28,
 "competency_tag": "25367",
 "competency_source": "proxy",
 "total_submissions": 63,
 "fail_count": 9,
 "fail_rate_pct": 14.3,
 "avg_score": 64.71
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24285",
 "assessment_name": "24285",
 "assessment_type": "TMA",
 "assessment_order": 7,
 "week_of_class": 29,
 "competency_tag": "24285",
 "competency_source": "proxy",
 "total_submissions": 7,
 "fail_count": 1,
 "fail_rate_pct": 14.3,
 "avg_score": 53.43
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24299",
 "assessment_name": "24299",
 "assessment_type": "Exam",
 "assessment_order": 9,
 "week_of_class": null,
 "competency_tag": "24299",
 "competency_source": "proxy",
 "total_submissions": 1168,
 "fail_count": 149,
 "fail_rate_pct": 12.8,
 "avg_score": 68.23
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25338",
 "assessment_name": "25338",
 "assessment_type": "TMA",
 "assessment_order": 10,
 "week_of_class": 22,
 "competency_tag": "25338",
 "competency_source": "proxy",
 "total_submissions": 24,
 "fail_count": 3,
 "fail_rate_pct": 12.5,
 "avg_score": 65.08
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25353",
 "assessment_name": "25353",
 "assessment_type": "TMA",
 "assessment_order": 6,
 "week_of_class": 30,
 "competency_tag": "25353",
 "competency_source": "proxy",
 "total_submissions": 140,
 "fail_count": 17,
 "fail_rate_pct": 12.1,
 "avg_score": 65.97
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25345",
 "assessment_name": "25345",
 "assessment_type": "CMA",
 "assessment_order": 9,
 "week_of_class": 22,
 "competency_tag": "25345",
 "competency_source": "proxy",
 "total_submissions": 26,
 "fail_count": 3,
 "fail_rate_pct": 11.5,
 "avg_score": 72.31
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25359",
 "assessment_name": "25359",
 "assessment_type": "TMA",
 "assessment_order": 5,
 "week_of_class": 23,
 "competency_tag": "25359",
 "competency_source": "proxy",
 "total_submissions": 87,
 "fail_count": 10,
 "fail_rate_pct": 11.5,
 "avg_score": 65.78
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25358",
 "assessment_name": "25358",
 "assessment_type": "TMA",
 "assessment_order": 4,
 "week_of_class": 17,
 "competency_tag": "25358",
 "competency_source": "proxy",
 "total_submissions": 99,
 "fail_count": 11,
 "fail_rate_pct": 11.1,
 "avg_score": 69.52
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24292",
 "assessment_name": "24292",
 "assessment_type": "TMA",
 "assessment_order": 4,
 "week_of_class": 16,
 "competency_tag": "24292",
 "competency_source": "proxy",
 "total_submissions": 1128,
 "fail_count": 118,
 "fail_rate_pct": 10.5,
 "avg_score": 73.76
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24298",
 "assessment_name": "24298",
 "assessment_type": "CMA",
 "assessment_order": 8,
 "week_of_class": 31,
 "competency_tag": "24298",
 "competency_source": "proxy",
 "total_submissions": 1094,
 "fail_count": 110,
 "fail_rate_pct": 10.1,
 "avg_score": 73.09
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24293",
 "assessment_name": "24293",
 "assessment_type": "TMA",
 "assessment_order": 6,
 "week_of_class": 23,
 "competency_tag": "24293",
 "competency_source": "proxy",
 "total_submissions": 965,
 "fail_count": 89,
 "fail_rate_pct": 9.2,
 "avg_score": 72.93
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24295",
 "assessment_name": "24295",
 "assessment_type": "CMA",
 "assessment_order": 1,
 "week_of_class": 3,
 "competency_tag": "24295",
 "competency_source": "proxy",
 "total_submissions": 1917,
 "fail_count": 164,
 "fail_rate_pct": 8.6,
 "avg_score": 74.75
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25337",
 "assessment_name": "25337",
 "assessment_type": "TMA",
 "assessment_order": 8,
 "week_of_class": 17,
 "competency_tag": "25337",
 "competency_source": "proxy",
 "total_submissions": 25,
 "fail_count": 2,
 "fail_rate_pct": 8,
 "avg_score": 67.52
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25344",
 "assessment_name": "25344",
 "assessment_type": "CMA",
 "assessment_order": 7,
 "week_of_class": 17,
 "competency_tag": "25344",
 "competency_source": "proxy",
 "total_submissions": 25,
 "fail_count": 2,
 "fail_rate_pct": 8,
 "avg_score": 72.4
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25365",
 "assessment_name": "25365",
 "assessment_type": "TMA",
 "assessment_order": 4,
 "week_of_class": 16,
 "competency_tag": "25365",
 "competency_source": "proxy",
 "total_submissions": 76,
 "fail_count": 6,
 "fail_rate_pct": 7.9,
 "avg_score": 77.25
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24294",
 "assessment_name": "24294",
 "assessment_type": "TMA",
 "assessment_order": 7,
 "week_of_class": 30,
 "competency_tag": "24294",
 "competency_source": "proxy",
 "total_submissions": 916,
 "fail_count": 72,
 "fail_rate_pct": 7.9,
 "avg_score": 74.88
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25340",
 "assessment_name": "25340",
 "assessment_type": "Exam",
 "assessment_order": 14,
 "week_of_class": 35,
 "competency_tag": "25340",
 "competency_source": "proxy",
 "total_submissions": 26,
 "fail_count": 2,
 "fail_rate_pct": 7.7,
 "avg_score": 55.08
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25335",
 "assessment_name": "25335",
 "assessment_type": "TMA",
 "assessment_order": 4,
 "week_of_class": 8,
 "competency_tag": "25335",
 "competency_source": "proxy",
 "total_submissions": 26,
 "fail_count": 2,
 "fail_rate_pct": 7.7,
 "avg_score": 71.54
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24282",
 "assessment_name": "24282",
 "assessment_type": "TMA",
 "assessment_order": 2,
 "week_of_class": 5,
 "competency_tag": "24282",
 "competency_source": "proxy",
 "total_submissions": 70,
 "fail_count": 5,
 "fail_rate_pct": 7.1,
 "avg_score": 67.74
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25334",
 "assessment_name": "25334",
 "assessment_type": "TMA",
 "assessment_order": 2,
 "week_of_class": 4,
 "competency_tag": "25334",
 "competency_source": "proxy",
 "total_submissions": 29,
 "fail_count": 2,
 "fail_rate_pct": 6.9,
 "avg_score": 71.62
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25364",
 "assessment_name": "25364",
 "assessment_type": "TMA",
 "assessment_order": 3,
 "week_of_class": 9,
 "competency_tag": "25364",
 "competency_source": "proxy",
 "total_submissions": 89,
 "fail_count": 6,
 "fail_rate_pct": 6.7,
 "avg_score": 71.99
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24297",
 "assessment_name": "24297",
 "assessment_type": "CMA",
 "assessment_order": 5,
 "week_of_class": 21,
 "competency_tag": "24297",
 "competency_source": "proxy",
 "total_submissions": 1301,
 "fail_count": 83,
 "fail_rate_pct": 6.4,
 "avg_score": 75.15
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25351",
 "assessment_name": "25351",
 "assessment_type": "TMA",
 "assessment_order": 4,
 "week_of_class": 18,
 "competency_tag": "25351",
 "competency_source": "proxy",
 "total_submissions": 164,
 "fail_count": 10,
 "fail_rate_pct": 6.1,
 "avg_score": 74.44
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_30721",
 "assessment_name": "30721",
 "assessment_type": "TMA",
 "assessment_order": 3,
 "week_of_class": 19,
 "competency_tag": "30721",
 "competency_source": "proxy",
 "total_submissions": 164,
 "fail_count": 10,
 "fail_rate_pct": 6.1,
 "avg_score": 74.21
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34903",
 "assessment_name": "34903",
 "assessment_type": "TMA",
 "assessment_order": 5,
 "week_of_class": 29,
 "competency_tag": "34903",
 "competency_source": "proxy",
 "total_submissions": 51,
 "fail_count": 3,
 "fail_rate_pct": 5.9,
 "avg_score": 74.69
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24296",
 "assessment_name": "24296",
 "assessment_type": "CMA",
 "assessment_order": 3,
 "week_of_class": 10,
 "competency_tag": "24296",
 "competency_source": "proxy",
 "total_submissions": 1534,
 "fail_count": 91,
 "fail_rate_pct": 5.9,
 "avg_score": 78.94
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34890",
 "assessment_name": "34890",
 "assessment_type": "TMA",
 "assessment_order": 5,
 "week_of_class": 25,
 "competency_tag": "34890",
 "competency_source": "proxy",
 "total_submissions": 87,
 "fail_count": 5,
 "fail_rate_pct": 5.7,
 "avg_score": 81.03
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34889",
 "assessment_name": "34889",
 "assessment_type": "TMA",
 "assessment_order": 4,
 "week_of_class": 19,
 "competency_tag": "34889",
 "competency_source": "proxy",
 "total_submissions": 93,
 "fail_count": 5,
 "fail_rate_pct": 5.4,
 "avg_score": 76.59
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34888",
 "assessment_name": "34888",
 "assessment_type": "TMA",
 "assessment_order": 3,
 "week_of_class": 13,
 "competency_tag": "34888",
 "competency_source": "proxy",
 "total_submissions": 94,
 "fail_count": 5,
 "fail_rate_pct": 5.3,
 "avg_score": 76.66
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25361",
 "assessment_name": "25361",
 "assessment_type": "Exam",
 "assessment_order": 7,
 "week_of_class": 35,
 "competency_tag": "25361",
 "competency_source": "proxy",
 "total_submissions": 98,
 "fail_count": 5,
 "fail_rate_pct": 5.1,
 "avg_score": 73.62
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_24291",
 "assessment_name": "24291",
 "assessment_type": "TMA",
 "assessment_order": 2,
 "week_of_class": 5,
 "competency_tag": "24291",
 "competency_source": "proxy",
 "total_submissions": 1428,
 "fail_count": 73,
 "fail_rate_pct": 5.1,
 "avg_score": 78.79
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34901",
 "assessment_name": "34901",
 "assessment_type": "TMA",
 "assessment_order": 3,
 "week_of_class": 14,
 "competency_tag": "34901",
 "competency_source": "proxy",
 "total_submissions": 66,
 "fail_count": 3,
 "fail_rate_pct": 4.5,
 "avg_score": 73.94
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25362",
 "assessment_name": "25362",
 "assessment_type": "TMA",
 "assessment_order": 1,
 "week_of_class": 3,
 "competency_tag": "25362",
 "competency_source": "proxy",
 "total_submissions": 111,
 "fail_count": 5,
 "fail_rate_pct": 4.5,
 "avg_score": 73.31
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25368",
 "assessment_name": "25368",
 "assessment_type": "Exam",
 "assessment_order": 7,
 "week_of_class": null,
 "competency_tag": "25368",
 "competency_source": "proxy",
 "total_submissions": 68,
 "fail_count": 3,
 "fail_rate_pct": 4.4,
 "avg_score": 69.32
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25346",
 "assessment_name": "25346",
 "assessment_type": "CMA",
 "assessment_order": 11,
 "week_of_class": 25,
 "competency_tag": "25346",
 "competency_source": "proxy",
 "total_submissions": 23,
 "fail_count": 1,
 "fail_rate_pct": 4.3,
 "avg_score": 68.78
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25347",
 "assessment_name": "25347",
 "assessment_type": "CMA",
 "assessment_order": 13,
 "week_of_class": 30,
 "competency_tag": "25347",
 "competency_source": "proxy",
 "total_submissions": 24,
 "fail_count": 1,
 "fail_rate_pct": 4.2,
 "avg_score": 63.13
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34900",
 "assessment_name": "34900",
 "assessment_type": "TMA",
 "assessment_order": 2,
 "week_of_class": 8,
 "competency_tag": "34900",
 "competency_source": "proxy",
 "total_submissions": 75,
 "fail_count": 3,
 "fail_rate_pct": 4,
 "avg_score": 77.52
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25356",
 "assessment_name": "25356",
 "assessment_type": "TMA",
 "assessment_order": 2,
 "week_of_class": 8,
 "competency_tag": "25356",
 "competency_source": "proxy",
 "total_submissions": 108,
 "fail_count": 4,
 "fail_rate_pct": 3.7,
 "avg_score": 77.71
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25336",
 "assessment_name": "25336",
 "assessment_type": "TMA",
 "assessment_order": 6,
 "week_of_class": 12,
 "competency_tag": "25336",
 "competency_source": "proxy",
 "total_submissions": 27,
 "fail_count": 1,
 "fail_rate_pct": 3.7,
 "avg_score": 79.7
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_30716",
 "assessment_name": "30716",
 "assessment_type": "TMA",
 "assessment_order": 3,
 "week_of_class": 17,
 "competency_tag": "30716",
 "competency_source": "proxy",
 "total_submissions": 111,
 "fail_count": 4,
 "fail_rate_pct": 3.6,
 "avg_score": 79.49
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34902",
 "assessment_name": "34902",
 "assessment_type": "TMA",
 "assessment_order": 4,
 "week_of_class": 20,
 "competency_tag": "34902",
 "competency_source": "proxy",
 "total_submissions": 58,
 "fail_count": 2,
 "fail_rate_pct": 3.4,
 "avg_score": 74.67
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25342",
 "assessment_name": "25342",
 "assessment_type": "CMA",
 "assessment_order": 3,
 "week_of_class": 8,
 "competency_tag": "25342",
 "competency_source": "proxy",
 "total_submissions": 30,
 "fail_count": 1,
 "fail_rate_pct": 3.3,
 "avg_score": 85.1
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25363",
 "assessment_name": "25363",
 "assessment_type": "TMA",
 "assessment_order": 2,
 "week_of_class": 6,
 "competency_tag": "25363",
 "competency_source": "proxy",
 "total_submissions": 99,
 "fail_count": 3,
 "fail_rate_pct": 3,
 "avg_score": 79.06
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34876",
 "assessment_name": "34876",
 "assessment_type": "TMA",
 "assessment_order": 4,
 "week_of_class": 19,
 "competency_tag": "34876",
 "competency_source": "proxy",
 "total_submissions": 104,
 "fail_count": 3,
 "fail_rate_pct": 2.9,
 "avg_score": 76.06
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25349",
 "assessment_name": "25349",
 "assessment_type": "TMA",
 "assessment_order": 2,
 "week_of_class": 8,
 "competency_tag": "25349",
 "competency_source": "proxy",
 "total_submissions": 172,
 "fail_count": 5,
 "fail_rate_pct": 2.9,
 "avg_score": 79.52
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_30717",
 "assessment_name": "30717",
 "assessment_type": "TMA",
 "assessment_order": 4,
 "week_of_class": 22,
 "competency_tag": "30717",
 "competency_source": "proxy",
 "total_submissions": 108,
 "fail_count": 3,
 "fail_rate_pct": 2.8,
 "avg_score": 76.83
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_30722",
 "assessment_name": "30722",
 "assessment_type": "TMA",
 "assessment_order": 4,
 "week_of_class": 24,
 "competency_tag": "30722",
 "competency_source": "proxy",
 "total_submissions": 143,
 "fail_count": 4,
 "fail_rate_pct": 2.8,
 "avg_score": 78.24
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25350",
 "assessment_name": "25350",
 "assessment_type": "TMA",
 "assessment_order": 3,
 "week_of_class": 13,
 "competency_tag": "25350",
 "competency_source": "proxy",
 "total_submissions": 170,
 "fail_count": 4,
 "fail_rate_pct": 2.4,
 "avg_score": 85.36
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_30712",
 "assessment_name": "30712",
 "assessment_type": "TMA",
 "assessment_order": 4,
 "week_of_class": 23,
 "competency_tag": "30712",
 "competency_source": "proxy",
 "total_submissions": 136,
 "fail_count": 3,
 "fail_rate_pct": 2.2,
 "avg_score": 78.26
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34887",
 "assessment_name": "34887",
 "assessment_type": "TMA",
 "assessment_order": 2,
 "week_of_class": 8,
 "competency_tag": "34887",
 "competency_source": "proxy",
 "total_submissions": 97,
 "fail_count": 2,
 "fail_rate_pct": 2.1,
 "avg_score": 79.53
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34877",
 "assessment_name": "34877",
 "assessment_type": "TMA",
 "assessment_order": 5,
 "week_of_class": 25,
 "competency_tag": "34877",
 "competency_source": "proxy",
 "total_submissions": 98,
 "fail_count": 2,
 "fail_rate_pct": 2,
 "avg_score": 79.2
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_30719",
 "assessment_name": "30719",
 "assessment_type": "TMA",
 "assessment_order": 1,
 "week_of_class": 5,
 "competency_tag": "30719",
 "competency_source": "proxy",
 "total_submissions": 209,
 "fail_count": 4,
 "fail_rate_pct": 1.9,
 "avg_score": 83.95
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34875",
 "assessment_name": "34875",
 "assessment_type": "TMA",
 "assessment_order": 3,
 "week_of_class": 14,
 "competency_tag": "34875",
 "competency_source": "proxy",
 "total_submissions": 106,
 "fail_count": 2,
 "fail_rate_pct": 1.9,
 "avg_score": 76.11
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25354",
 "assessment_name": "25354",
 "assessment_type": "Exam",
 "assessment_order": 7,
 "week_of_class": 38,
 "competency_tag": "25354",
 "competency_source": "proxy",
 "total_submissions": 169,
 "fail_count": 3,
 "fail_rate_pct": 1.8,
 "avg_score": 70
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_30711",
 "assessment_name": "30711",
 "assessment_type": "TMA",
 "assessment_order": 3,
 "week_of_class": 18,
 "competency_tag": "30711",
 "competency_source": "proxy",
 "total_submissions": 140,
 "fail_count": 2,
 "fail_rate_pct": 1.4,
 "avg_score": 77.34
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34899",
 "assessment_name": "34899",
 "assessment_type": "TMA",
 "assessment_order": 1,
 "week_of_class": 4,
 "competency_tag": "34899",
 "competency_source": "proxy",
 "total_submissions": 87,
 "fail_count": 1,
 "fail_rate_pct": 1.1,
 "avg_score": 79
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34874",
 "assessment_name": "34874",
 "assessment_type": "TMA",
 "assessment_order": 2,
 "week_of_class": 7,
 "competency_tag": "34874",
 "competency_source": "proxy",
 "total_submissions": 110,
 "fail_count": 1,
 "fail_rate_pct": 0.9,
 "avg_score": 77.31
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25355",
 "assessment_name": "25355",
 "assessment_type": "TMA",
 "assessment_order": 1,
 "week_of_class": 4,
 "competency_tag": "25355",
 "competency_source": "proxy",
 "total_submissions": 111,
 "fail_count": 1,
 "fail_rate_pct": 0.9,
 "avg_score": 77.77
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25357",
 "assessment_name": "25357",
 "assessment_type": "TMA",
 "assessment_order": 3,
 "week_of_class": 11,
 "competency_tag": "25357",
 "competency_source": "proxy",
 "total_submissions": 106,
 "fail_count": 1,
 "fail_rate_pct": 0.9,
 "avg_score": 83.3
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_30715",
 "assessment_name": "30715",
 "assessment_type": "TMA",
 "assessment_order": 2,
 "week_of_class": 10,
 "competency_tag": "30715",
 "competency_source": "proxy",
 "total_submissions": 114,
 "fail_count": 1,
 "fail_rate_pct": 0.9,
 "avg_score": 82.34
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25348",
 "assessment_name": "25348",
 "assessment_type": "TMA",
 "assessment_order": 1,
 "week_of_class": 4,
 "competency_tag": "25348",
 "competency_source": "proxy",
 "total_submissions": 176,
 "fail_count": 1,
 "fail_rate_pct": 0.6,
 "avg_score": 79.55
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_30720",
 "assessment_name": "30720",
 "assessment_type": "TMA",
 "assessment_order": 2,
 "week_of_class": 10,
 "competency_tag": "30720",
 "competency_source": "proxy",
 "total_submissions": 176,
 "fail_count": 1,
 "fail_rate_pct": 0.6,
 "avg_score": 85.77
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34910",
 "assessment_name": "34910",
 "assessment_type": "CMA",
 "assessment_order": 12,
 "week_of_class": 35,
 "competency_tag": "34910",
 "competency_source": "proxy",
 "total_submissions": 53,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 79.38
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25341",
 "assessment_name": "25341",
 "assessment_type": "CMA",
 "assessment_order": 1,
 "week_of_class": 4,
 "competency_tag": "25341",
 "competency_source": "proxy",
 "total_submissions": 29,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 73.62
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_25343",
 "assessment_name": "25343",
 "assessment_type": "CMA",
 "assessment_order": 5,
 "week_of_class": 12,
 "competency_tag": "25343",
 "competency_source": "proxy",
 "total_submissions": 29,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 72.79
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_30709",
 "assessment_name": "30709",
 "assessment_type": "TMA",
 "assessment_order": 1,
 "week_of_class": 5,
 "competency_tag": "30709",
 "competency_source": "proxy",
 "total_submissions": 148,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 85.42
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_30710",
 "assessment_name": "30710",
 "assessment_type": "TMA",
 "assessment_order": 2,
 "week_of_class": 10,
 "competency_tag": "30710",
 "competency_source": "proxy",
 "total_submissions": 147,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 82.51
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_30714",
 "assessment_name": "30714",
 "assessment_type": "TMA",
 "assessment_order": 1,
 "week_of_class": 5,
 "competency_tag": "30714",
 "competency_source": "proxy",
 "total_submissions": 115,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 89.89
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34860",
 "assessment_name": "34860",
 "assessment_type": "TMA",
 "assessment_order": 1,
 "week_of_class": 3,
 "competency_tag": "34860",
 "competency_source": "proxy",
 "total_submissions": 15,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 84.53
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34861",
 "assessment_name": "34861",
 "assessment_type": "TMA",
 "assessment_order": 2,
 "week_of_class": 7,
 "competency_tag": "34861",
 "competency_source": "proxy",
 "total_submissions": 16,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 79
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34862",
 "assessment_name": "34862",
 "assessment_type": "TMA",
 "assessment_order": 3,
 "week_of_class": 13,
 "competency_tag": "34862",
 "competency_source": "proxy",
 "total_submissions": 15,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 76.27
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34863",
 "assessment_name": "34863",
 "assessment_type": "TMA",
 "assessment_order": 4,
 "week_of_class": 19,
 "competency_tag": "34863",
 "competency_source": "proxy",
 "total_submissions": 13,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 74.77
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34864",
 "assessment_name": "34864",
 "assessment_type": "TMA",
 "assessment_order": 5,
 "week_of_class": 24,
 "competency_tag": "34864",
 "competency_source": "proxy",
 "total_submissions": 12,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 77.17
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34865",
 "assessment_name": "34865",
 "assessment_type": "CMA",
 "assessment_order": 6,
 "week_of_class": 32,
 "competency_tag": "34865",
 "competency_source": "proxy",
 "total_submissions": 15,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 84.47
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34866",
 "assessment_name": "34866",
 "assessment_type": "CMA",
 "assessment_order": 7,
 "week_of_class": 32,
 "competency_tag": "34866",
 "competency_source": "proxy",
 "total_submissions": 14,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 89.14
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34867",
 "assessment_name": "34867",
 "assessment_type": "CMA",
 "assessment_order": 8,
 "week_of_class": 32,
 "competency_tag": "34867",
 "competency_source": "proxy",
 "total_submissions": 12,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 82.5
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34868",
 "assessment_name": "34868",
 "assessment_type": "CMA",
 "assessment_order": 9,
 "week_of_class": 32,
 "competency_tag": "34868",
 "competency_source": "proxy",
 "total_submissions": 12,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 80.17
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34869",
 "assessment_name": "34869",
 "assessment_type": "CMA",
 "assessment_order": 10,
 "week_of_class": 32,
 "competency_tag": "34869",
 "competency_source": "proxy",
 "total_submissions": 11,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 81.09
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34870",
 "assessment_name": "34870",
 "assessment_type": "CMA",
 "assessment_order": 11,
 "week_of_class": 32,
 "competency_tag": "34870",
 "competency_source": "proxy",
 "total_submissions": 12,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 79.17
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34871",
 "assessment_name": "34871",
 "assessment_type": "CMA",
 "assessment_order": 12,
 "week_of_class": 32,
 "competency_tag": "34871",
 "competency_source": "proxy",
 "total_submissions": 11,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 77.09
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34873",
 "assessment_name": "34873",
 "assessment_type": "TMA",
 "assessment_order": 1,
 "week_of_class": 3,
 "competency_tag": "34873",
 "competency_source": "proxy",
 "total_submissions": 110,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 82.95
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34878",
 "assessment_name": "34878",
 "assessment_type": "CMA",
 "assessment_order": 6,
 "week_of_class": 34,
 "competency_tag": "34878",
 "competency_source": "proxy",
 "total_submissions": 106,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 87.06
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34879",
 "assessment_name": "34879",
 "assessment_type": "CMA",
 "assessment_order": 7,
 "week_of_class": 34,
 "competency_tag": "34879",
 "competency_source": "proxy",
 "total_submissions": 104,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 92.63
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34880",
 "assessment_name": "34880",
 "assessment_type": "CMA",
 "assessment_order": 8,
 "week_of_class": 34,
 "competency_tag": "34880",
 "competency_source": "proxy",
 "total_submissions": 103,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 82.15
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34881",
 "assessment_name": "34881",
 "assessment_type": "CMA",
 "assessment_order": 9,
 "week_of_class": 34,
 "competency_tag": "34881",
 "competency_source": "proxy",
 "total_submissions": 101,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 82.84
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34882",
 "assessment_name": "34882",
 "assessment_type": "CMA",
 "assessment_order": 10,
 "week_of_class": 34,
 "competency_tag": "34882",
 "competency_source": "proxy",
 "total_submissions": 99,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 82.83
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34883",
 "assessment_name": "34883",
 "assessment_type": "CMA",
 "assessment_order": 11,
 "week_of_class": 34,
 "competency_tag": "34883",
 "competency_source": "proxy",
 "total_submissions": 101,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 81.37
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34884",
 "assessment_name": "34884",
 "assessment_type": "CMA",
 "assessment_order": 12,
 "week_of_class": 34,
 "competency_tag": "34884",
 "competency_source": "proxy",
 "total_submissions": 97,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 79.93
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34886",
 "assessment_name": "34886",
 "assessment_type": "TMA",
 "assessment_order": 1,
 "week_of_class": 4,
 "competency_tag": "34886",
 "competency_source": "proxy",
 "total_submissions": 97,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 83.69
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34891",
 "assessment_name": "34891",
 "assessment_type": "CMA",
 "assessment_order": 6,
 "week_of_class": 33,
 "competency_tag": "34891",
 "competency_source": "proxy",
 "total_submissions": 95,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 86.43
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34892",
 "assessment_name": "34892",
 "assessment_type": "CMA",
 "assessment_order": 7,
 "week_of_class": 33,
 "competency_tag": "34892",
 "competency_source": "proxy",
 "total_submissions": 93,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 90.26
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34893",
 "assessment_name": "34893",
 "assessment_type": "CMA",
 "assessment_order": 8,
 "week_of_class": 33,
 "competency_tag": "34893",
 "competency_source": "proxy",
 "total_submissions": 91,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 80.2
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34894",
 "assessment_name": "34894",
 "assessment_type": "CMA",
 "assessment_order": 9,
 "week_of_class": 33,
 "competency_tag": "34894",
 "competency_source": "proxy",
 "total_submissions": 88,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 81.77
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34895",
 "assessment_name": "34895",
 "assessment_type": "CMA",
 "assessment_order": 10,
 "week_of_class": 33,
 "competency_tag": "34895",
 "competency_source": "proxy",
 "total_submissions": 88,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 81.91
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34896",
 "assessment_name": "34896",
 "assessment_type": "CMA",
 "assessment_order": 11,
 "week_of_class": 33,
 "competency_tag": "34896",
 "competency_source": "proxy",
 "total_submissions": 88,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 81.01
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34897",
 "assessment_name": "34897",
 "assessment_type": "CMA",
 "assessment_order": 12,
 "week_of_class": 33,
 "competency_tag": "34897",
 "competency_source": "proxy",
 "total_submissions": 87,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 79.25
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34904",
 "assessment_name": "34904",
 "assessment_type": "CMA",
 "assessment_order": 6,
 "week_of_class": 35,
 "competency_tag": "34904",
 "competency_source": "proxy",
 "total_submissions": 63,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 89.29
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34905",
 "assessment_name": "34905",
 "assessment_type": "CMA",
 "assessment_order": 7,
 "week_of_class": 35,
 "competency_tag": "34905",
 "competency_source": "proxy",
 "total_submissions": 60,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 92.42
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34906",
 "assessment_name": "34906",
 "assessment_type": "CMA",
 "assessment_order": 8,
 "week_of_class": 35,
 "competency_tag": "34906",
 "competency_source": "proxy",
 "total_submissions": 55,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 82.38
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34907",
 "assessment_name": "34907",
 "assessment_type": "CMA",
 "assessment_order": 9,
 "week_of_class": 35,
 "competency_tag": "34907",
 "competency_source": "proxy",
 "total_submissions": 56,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 79.43
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34908",
 "assessment_name": "34908",
 "assessment_type": "CMA",
 "assessment_order": 10,
 "week_of_class": 35,
 "competency_tag": "34908",
 "competency_source": "proxy",
 "total_submissions": 56,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 80.82
 },
 {
 "assessment_id": "SAMPLE_OULAD_ASM_34909",
 "assessment_name": "34909",
 "assessment_type": "CMA",
 "assessment_order": 11,
 "week_of_class": 35,
 "competency_tag": "34909",
 "competency_source": "proxy",
 "total_submissions": 55,
 "fail_count": 0,
 "fail_rate_pct": 0,
 "avg_score": 81.87
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G04__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "b80d98dc0c49a020c23179aecc7ec7bf67a6b4f420ff0b27a6dc25b03a4c84d6",
 "generator_input_sha256": "c02af980739f4a2053397c471b5914a1bdf8a2832a97e4e4c277cf722ec46221",
 "generator_input_compact": {
 "task_id": "A-G04",
 "execution_id": "exec_1781847724478_910d0c3f",
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
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "assessment_difficulty"
 ],
 "dataset_row_counts": {
 "assessment_difficulty": 112
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
 "raw_text": "Summary: The analysis of assessment difficulty reveals that the assessment '24288' has the highest fail rate at 50%, indicating significant challenges for students. In contrast, assessments such as '25345' and '25359' show much lower fail rates, suggesting a disparity in difficulty across assessments.\n\nInsights: High Fail Rate in Assessment 24288: The assessment '24288' has a fail rate of 50%, which is the highest among the cohort, indicating that half of the students are struggling significantly with this assessment. | Comparative Success in Other Assessments: Assessments such as '25345' and '25359' have fail rates of 11.5% and 12.1% respectively, indicating that these assessments are significantly easier for students compared to '24288'.\n\nEducational implications: The high fail rate in assessment '24288' suggests a need for targeted interventions to support students in this area.\n\nRecommendations: high - Conduct a curriculum review for assessment '24288'. - Given the high fail rate, it is essential to identify potential gaps in instruction or assessment design that may be contributing to student difficulties.",
 "structured_payload": {
 "task_id": "A-G04",
 "execution_id": "exec_1781847724478_910d0c3f",
 "explanation": {
 "summary": "The analysis of assessment difficulty reveals that the assessment '24288' has the highest fail rate at 50%, indicating significant challenges for students. In contrast, assessments such as '25345' and '25359' show much lower fail rates, suggesting a disparity in difficulty across assessments.",
 "insights": [
 {
 "title": "High Fail Rate in Assessment 24288",
 "description": "The assessment '24288' has a fail rate of 50%, which is the highest among the cohort, indicating that half of the students are struggling significantly with this assessment.",
 "severity": "high",
 "evidence": [
 {
 "metric": "fail_rate_pct",
 "value": 50,
 "comparison": "baseline",
 "delta": null,
 "context": "Highest fail rate in the dataset"
 }
 ]
 },
 {
 "title": "Comparative Success in Other Assessments",
 "description": "Assessments such as '25345' and '25359' have fail rates of 11.5% and 12.1% respectively, indicating that these assessments are significantly easier for students compared to '24288'.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "fail_rate_pct",
 "value": 11.5,
 "comparison": "down_from_previous",
 "delta": -38.5,
 "context": "Much lower fail rate compared to '24288'"
 },
 {
 "metric": "fail_rate_pct",
 "value": 12.1,
 "comparison": "down_from_previous",
 "delta": -37.9,
 "context": "Much lower fail rate compared to '24288'"
 }
 ]
 }
 ],
 "educational_implications": [
 "The high fail rate in assessment '24288' suggests a need for targeted interventions to support students in this area."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Conduct a curriculum review for assessment '24288'.",
 "rationale": "Given the high fail rate, it is essential to identify potential gaps in instruction or assessment design that may be contributing to student difficulties."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The dataset provides a comprehensive view of assessment performance with clear metrics on fail rates and average scores.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
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
 "latency_ms": 10334,
 "token_usage": {
 "prompt_tokens": 2685,
 "completion_tokens": 536,
 "total_tokens": 3221
 },
 "strategy": "distribution",
 "granularity": "per_assessment",
 "cost_usd": 0.000724
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G04__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "b80d98dc0c49a020c23179aecc7ec7bf67a6b4f420ff0b27a6dc25b03a4c84d6",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "baseline_first_20_rows",
 "observed_ai_summary_method": "baseline_first_20_rows",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2685,
 "completion_tokens": 536,
 "total_tokens": 3221
 },
 "latency_ms": 10339,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-G04",
 "execution_id": "exec_1781847724478_910d0c3f",
 "explanation": {
 "summary": "The analysis of assessment difficulty reveals that the assessment '24288' has the highest fail rate at 50%, indicating significant challenges for students. In contrast, assessments such as '25345' and '25359' show much lower fail rates, suggesting a disparity in difficulty across assessments.",
 "insights": [
 {
 "title": "High Fail Rate in Assessment 24288",
 "description": "The assessment '24288' has a fail rate of 50%, which is the highest among the cohort, indicating that half of the students are struggling significantly with this assessment.",
 "severity": "high",
 "evidence": [
 {
 "metric": "fail_rate_pct",
 "value": 50,
 "comparison": "baseline",
 "delta": null,
 "context": "Highest fail rate in the dataset"
 }
 ]
 },
 {
 "title": "Comparative Success in Other Assessments",
 "description": "Assessments such as '25345' and '25359' have fail rates of 11.5% and 12.1% respectively, indicating that these assessments are significantly easier for students compared to '24288'.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "fail_rate_pct",
 "value": 11.5,
 "comparison": "down_from_previous",
 "delta": -38.5,
 "context": "Much lower fail rate compared to '24288'"
 },
 {
 "metric": "fail_rate_pct",
 "value": 12.1,
 "comparison": "down_from_previous",
 "delta": -37.9,
 "context": "Much lower fail rate compared to '24288'"
 }
 ]
 }
 ],
 "educational_implications": [
 "The high fail rate in assessment '24288' suggests a need for targeted interventions to support students in this area."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Conduct a curriculum review for assessment '24288'.",
 "rationale": "Given the high fail rate, it is essential to identify potential gaps in instruction or assessment design that may be contributing to student difficulties."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The dataset provides a comprehensive view of assessment performance with clear metrics on fail rates and average scores.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "distribution",
 "explanation_type": "distribution",
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
 "latency_ms": 10334,
 "token_usage": {
 "prompt_tokens": 2685,
 "completion_tokens": 536,
 "total_tokens": 3221
 },
 "strategy": "distribution",
 "granularity": "per_assessment",
 "cost_usd": 0.000724
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
 "expected": 112,
 "observed": 112
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae",
 "expected_values": [
 "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "efaaa326237f67aa56d5231bbd426e5831437f739fc7c8852c6e86fc6e2e1717",
 "expected": "efaaa326237f67aa56d5231bbd426e5831437f739fc7c8852c6e86fc6e2e1717"
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
 "count": 112,
 "min": 1,
 "max": 14
 },
 "avg_score": {
 "count": 112,
 "min": 45,
 "max": 92.63
 },
 "fail_count": {
 "count": 112,
 "min": 0,
 "max": 164
 },
 "fail_rate_pct": {
 "count": 112,
 "min": 0,
 "max": 50
 },
 "total_submissions": {
 "count": 112,
 "min": 7,
 "max": 1917
 },
 "week_of_class": {
 "count": 110,
 "min": 3,
 "max": 38
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

