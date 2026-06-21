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


## Queue Strategy

This packet uses `compact_retrieval_context`. It intentionally does not embed all full-query rows because the Phase F6 final context exceeds the configured prompt token cap.

## Compact Judge Context

```json
{
 "queue_strategy": "compact_retrieval_context",
 "strategy_reason": "Full final context exceeds the configured token cap; full rows are not embedded in this prompt packet.",
 "audit_guarantee": {
 "full_artifacts_remain_on_disk": true,
 "full_artifact_references": [
 {
 "dataset_label": "intervention_priority_list",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G15.json",
 "artifact_sha256": "fd0892367ab4f4b3965fbfa243b4a856ae8901a1f8f7c8ff616484765adb837b",
 "row_count": 50,
 "readable": true
 }
 ],
 "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_contexts/final_contexts/SAMPLE_OULAD__A-G15__task_aware_data_summarization.md",
 "final_context_sha256": "38359ba63301445668a1fe1a9768a22345f936bf6f34680072d27c095ca70bae",
 "judge_input_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/judge_inputs/SAMPLE_OULAD__A-G15__task_aware_data_summarization.json",
 "judge_input_sha256": "b4e954c878c37a64c5030aa5481a1e00670840092f1c441cc8876ecea8840d70"
 },
 "record_identity": {
 "record_id": "SAMPLE_OULAD__A-G15__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G15",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
 },
 "task_context": {
 "task_name": "Intervention priority ranking",
 "scope": "Many students",
 "actionable_question": "Who are the top 10 students most in need of intervention right now?",
 "target_audience": "instructor, admin",
 "ai_summary_type": "ranking",
 "ai_prompt_hint": "Rank by at_risk_score [FE] descending. List triggered flags per student. Provide action per priority group.",
 "query_labels": [
 "intervention_priority_list"
 ],
 "explanation_strategy": "ranking"
 },
 "schema_context": {
 "source_tables": [
 "enrollment",
 "assessment_result",
 "assessment",
 "engagement",
 "student"
 ],
 "key_db_fields": [
 "student_id",
 "gender",
 "age_group",
 "region; at_risk_score [FE cross]",
 "at_risk_label [FE cross]",
 "avg_score [FE cross]",
 "all 5 flags",
 "final_outcome"
 ],
 "output_schema": {},
 "query_labels": [
 "intervention_priority_list"
 ]
 },
 "evaluation_requirements": {
 "required_core_outputs": [
 {
 "requirement_id": "A-G15-CORE-01",
 "description": "Rank by at_risk_score [FE] descending."
 },
 {
 "requirement_id": "A-G15-CORE-02",
 "description": "List triggered flags per student."
 },
 {
 "requirement_id": "A-G15-CORE-03",
 "description": "Provide action per priority group."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-G15-CONSTRAINT-01",
 "description": "Treat the output as internal admin use only."
 },
 {
 "constraint_id": "A-G15-CONSTRAINT-02",
 "description": "Do not include personally identifying information beyond identifiers already present in returned data."
 }
 ],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
 },
 "derived_stat_evidence": [],
 "deterministic_checks": [
 {
 "check_type": "task_aware_shared_evidence_contract",
 "case_id": "SAMPLE_OULAD__A-G15",
 "task_id": "A-G15",
 "sidecar_sha256": "58f8801232d72bdde5e2e328d796ff4587ac67ce8b5ee888dcbea9ae57ab978c",
 "evidence": {
 "schema_version": "task_aware_shared_evidence_v1",
 "case_id": "SAMPLE_OULAD__A-G15",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G15",
 "source_explanation_record_id": "SAMPLE_OULAD__A-G15__task_aware_data_summarization",
 "source_explanation_artifact_sha256": "bdd820b796c24e02947aa0a1482e96d2ceb0334e5126a0bfeb0eb6115886e1c3",
 "deterministic_summary": {
 "summary_type": "ranking",
 "dataset_name": "intervention_priority_list",
 "row_count": 50,
 "entity_column": "student_id",
 "metric_column": "at_risk_score",
 "sort_direction": "desc",
 "top_items": [
 {
 "student_id": "SAMPLE_OULAD_STU_69494",
 "at_risk_score": 5,
 "rank": 1,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 15.5
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_338731",
 "at_risk_score": 5,
 "rank": 2,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 19.25
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624354",
 "at_risk_score": 5,
 "rank": 3,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 23.1429
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629056",
 "at_risk_score": 5,
 "rank": 4,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_171896",
 "at_risk_score": 5,
 "rank": 5,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35.3333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548926",
 "at_risk_score": 5,
 "rank": 6,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 37.3333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616439",
 "at_risk_score": 5,
 "rank": 7,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 37.375
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465619",
 "at_risk_score": 5,
 "rank": 8,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 37.6667
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532565",
 "at_risk_score": 5,
 "rank": 9,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 37.8333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586526",
 "at_risk_score": 5,
 "rank": 10,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 39.6667
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 }
 ],
 "bottom_items": [
 {
 "student_id": "SAMPLE_OULAD_STU_362548",
 "at_risk_score": 4,
 "rank": 46,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 33.8
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592372",
 "at_risk_score": 4,
 "rank": 47,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 34.1667
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2595204",
 "at_risk_score": 4,
 "rank": 48,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 34.4286
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2405934",
 "at_risk_score": 4,
 "rank": 49,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 34.5556
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": false
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 0
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_505700",
 "at_risk_score": 4,
 "rank": 50,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 34.6667
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 }
 ],
 "median_item": {
 "student_id": "SAMPLE_OULAD_STU_568307",
 "at_risk_score": 4,
 "rank": 26,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 24.3333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 "metric_stats": {
 "count": 50,
 "min": 4,
 "max": 5,
 "mean": 4.2,
 "median": 4
 },
 "tie_warnings": [
 "bottom_items boundary has 40 tied items at at_risk_score=4.0; only 5 are included."
 ],
 "flag_evidence": [
 {
 "student_id": "SAMPLE_OULAD_STU_69494",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_338731",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624354",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629056",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_171896",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548926",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616439",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465619",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532565",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586526",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_362548",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592372",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2595204",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2405934",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": false
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 0
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_505700",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 }
 ],
 "summarization_warnings": [],
 "priority_group_actions": {
 "mapping_version": "oulad_admin_review_v1",
 "actions": [
 {
 "at_risk_score": 5,
 "action": "Review this highest-score group first and assign a follow-up owner based on the returned flags.",
 "claim_limit": "review workflow only; do not promise outcomes"
 },
 {
 "at_risk_score": 4,
 "action": "Review this next-score group after score-5 cases and confirm which returned flags require follow-up.",
 "claim_limit": "review workflow only; do not promise outcomes"
 }
 ]
 }
 },
 "prompt_evidence_payload": {
 "summary_type": "ranking",
 "task_id": "A-G15",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples.",
 "List the top ten identifiers in rank order with at_risk_score, exact triggered flags, and final outcome.",
 "Use only the versioned internal admin-review mapping for score priority groups; do not use demographic attributes or promise outcomes."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "intervention_priority_list",
 "row_count": 50,
 "entity_column": "student_id",
 "metric_column": "at_risk_score",
 "sort_direction": "desc"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "top_items": [
 {
 "student_id": "SAMPLE_OULAD_STU_69494",
 "at_risk_score": 5,
 "rank": 1,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 15.5
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_338731",
 "at_risk_score": 5,
 "rank": 2,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 19.25
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624354",
 "at_risk_score": 5,
 "rank": 3,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 23.1429
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629056",
 "at_risk_score": 5,
 "rank": 4,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_171896",
 "at_risk_score": 5,
 "rank": 5,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35.3333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548926",
 "at_risk_score": 5,
 "rank": 6,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 37.3333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616439",
 "at_risk_score": 5,
 "rank": 7,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 37.375
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465619",
 "at_risk_score": 5,
 "rank": 8,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 37.6667
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532565",
 "at_risk_score": 5,
 "rank": 9,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 37.8333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586526",
 "at_risk_score": 5,
 "rank": 10,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 39.6667
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 }
 ],
 "priority_group_actions": {
 "mapping_version": "oulad_admin_review_v1",
 "actions": [
 {
 "at_risk_score": 5,
 "action": "Review this highest-score group first and assign a follow-up owner based on the returned flags.",
 "claim_limit": "review workflow only; do not promise outcomes"
 },
 {
 "at_risk_score": 4,
 "action": "Review this next-score group after score-5 cases and confirm which returned flags require follow-up.",
 "claim_limit": "review workflow only; do not promise outcomes"
 }
 ]
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_stats": {
 "count": 50,
 "min": 4,
 "max": 5,
 "mean": 4.2,
 "median": 4
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flag_evidence": [
 {
 "student_id": "SAMPLE_OULAD_STU_69494",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_338731",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624354",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629056",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_171896",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548926",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616439",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465619",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532565",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586526",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_362548",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592372",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2595204",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2405934",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": false
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 0
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_505700",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 }
 ]
 }
 },
 {
 "name": "limitations",
 "facts": {
 "summarization_warnings": []
 }
 }
 ]
 }
 }
 }
 ],
 "evidence_access_summary": {
 "evidence_access_mode": "deterministic_artifact_retrieval",
 "full_result_row_count": 50,
 "prompt_embedded_row_count": 0,
 "retrieved_row_count": 50,
 "retrieved_row_count_by_dataset": {
 "intervention_priority_list": 50
 },
 "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G15__task_aware_data_summarization.json",
 "retrieval_coverage_status": "full",
 "full_access_available": true,
 "deterministic_scan_scope": "full_query_artifact_all_rows",
 "deterministic_scan_row_count_by_dataset": {
 "intervention_priority_list": 50
 },
 "full_result_sent_to_llm": false,
 "evidence_summary": {
 "row_count_phase3": 50,
 "row_count_observed": 50,
 "row_count_bucket_phase3": ">20",
 "row_count_bucket_observed": ">20",
 "dataset_breakdown": [
 {
 "label": "intervention_priority_list",
 "row_count": 50,
 "sample_fields": [
 "student_id",
 "gender",
 "age_group",
 "region",
 "avg_score",
 "engagement_score",
 "engagement_score_available",
 "punctuality_rate",
 "previous_attempt_count",
 "at_risk_score",
 "at_risk_label",
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend",
 "final_outcome"
 ]
 }
 ],
 "full_query_datasets_sha256": "403173580ceb7c41580c37174b23ef26439b857da0806999b3f1d8518766665d"
 },
 "retrieval_log_summary": {
 "retrieval_request_complete": true,
 "retrieval_coverage_status": "full",
 "chunk_count": 1,
 "chunks": [
 {
 "chunk_id": "SAMPLE_OULAD__A-G15__task_aware_data_summarization__intervention_priority_list__chunk_1",
 "dataset_label": "intervention_priority_list",
 "row_start_inclusive": 0,
 "row_end_inclusive": 49,
 "row_count": 50,
 "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G15.json",
 "source_artifact_sha256": "fd0892367ab4f4b3965fbfa243b4a856ae8901a1f8f7c8ff616484765adb837b"
 }
 ]
 },
 "context_manifest_validation": {
 "direct_embedding_validation": null,
 "retrieval_validation": {
 "status": "pass",
 "retrieved_row_count": 50,
 "chunk_count": 1,
 "chunk_ids": [
 "SAMPLE_OULAD__A-G15__task_aware_data_summarization__intervention_priority_list__chunk_1"
 ],
 "row_ranges": [
 {
 "dataset_label": "intervention_priority_list",
 "row_start_inclusive": 0,
 "row_end_inclusive": 49,
 "row_count": 50
 }
 ],
 "issues": []
 },
 "deterministic_check_count": 5,
 "deterministic_check_failures": 0,
 "deterministic_check_types": [
 "row_count",
 "artifact_hash",
 "embedded_rows_hash",
 "numeric_field_extraction",
 "threshold_flag_detection"
 ]
 }
 },
 "explanation_to_judge": {
 "raw_text": "Summary: Top ten internal admin ranking: rank=1, student_id=SAMPLE_OULAD_STU_69494, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Withdrawn | rank=2, student_id=SAMPLE_OULAD_STU_338731, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Fail | rank=3, student_id=SAMPLE_OULAD_STU_624354, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Fail | rank=4, student_id=SAMPLE_OULAD_STU_629056, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Withdrawn | rank=5, student_id=SAMPLE_OULAD_STU_171896, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Withdrawn | rank=6, student_id=SAMPLE_OULAD_STU_548926, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Fail | rank=7, student_id=SAMPLE_OULAD_STU_616439, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Fail | rank=8, student_id=SAMPLE_OULAD_STU_465619, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Withdrawn | rank=9, student_id=SAMPLE_OULAD_STU_532565, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Fail | rank=10, student_id=SAMPLE_OULAD_STU_586526, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Withdrawn. priority_group_action_mapping_version=oulad_admin_review_v1. score=5 action=review this highest-score group first and assign a follow-up owner based on returned flags; score=4 action=review this next-score group after score-5 cases and confirm which returned flags require follow-up.\n\nInsights: High Risk with Multiple Flags: The top three students, all with an at-risk score of 5, display critical flags such as low scores, low engagement, and negative trends, indicating urgent need for intervention. | Consistent Low Performance: Students ranked 1 to 10 consistently show low average scores, with the highest being 39.67, suggesting a systemic issue in engagement and understanding of course material.\n\nEducational implications: Use identifiers, risk score, and returned flags only; do not use demographic attributes or promise that review will improve outcomes.",
 "structured_payload": {
 "task_id": "A-G15",
 "execution_id": "exec_1781847783925_1391f9af",
 "explanation": {
 "summary": "Top ten internal admin ranking: rank=1, student_id=SAMPLE_OULAD_STU_69494, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Withdrawn | rank=2, student_id=SAMPLE_OULAD_STU_338731, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Fail | rank=3, student_id=SAMPLE_OULAD_STU_624354, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Fail | rank=4, student_id=SAMPLE_OULAD_STU_629056, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Withdrawn | rank=5, student_id=SAMPLE_OULAD_STU_171896, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Withdrawn | rank=6, student_id=SAMPLE_OULAD_STU_548926, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Fail | rank=7, student_id=SAMPLE_OULAD_STU_616439, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Fail | rank=8, student_id=SAMPLE_OULAD_STU_465619, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Withdrawn | rank=9, student_id=SAMPLE_OULAD_STU_532565, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Fail | rank=10, student_id=SAMPLE_OULAD_STU_586526, at_risk_score=5, triggered_flags=flag_low_score,flag_repeated,flag_low_engagement,flag_low_punctuality,flag_neg_trend, final_outcome=Withdrawn. priority_group_action_mapping_version=oulad_admin_review_v1. score=5 action=review this highest-score group first and assign a follow-up owner based on returned flags; score=4 action=review this next-score group after score-5 cases and confirm which returned flags require follow-up.",
 "insights": [
 {
 "title": "High Risk with Multiple Flags",
 "description": "The top three students, all with an at-risk score of 5, display critical flags such as low scores, low engagement, and negative trends, indicating urgent need for intervention.",
 "severity": "high",
 "evidence": [
 {
 "metric": "at_risk_score",
 "value": 5,
 "comparison": "baseline",
 "delta": null,
 "context": "Top-ranked students"
 }
 ]
 },
 {
 "title": "Consistent Low Performance",
 "description": "Students ranked 1 to 10 consistently show low average scores, with the highest being 39.67, suggesting a systemic issue in engagement and understanding of course material.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 39.67,
 "comparison": "baseline",
 "delta": null,
 "context": "Top average score among at-risk students"
 }
 ]
 }
 ],
 "educational_implications": [
 "Use identifiers, risk score, and returned flags only; do not use demographic attributes or promise that review will improve outcomes."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is derived from a comprehensive ranking based on at-risk scores and associated flags.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "ranking",
 "explanation_type": "ranking",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "ranking",
 "ai_summary_method_warning": null,
 "full_result_row_count": 50,
 "included_row_count": 15,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "intervention_priority_list",
 "row_count": 50,
 "included_row_count": 15
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 15,
 "baseline_reference_tokens": 2567,
 "task_aware_prompt_tokens": 5095,
 "token_ratio": 1.9848,
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
 "List the top ten identifiers in rank order with at_risk_score, exact triggered flags, and final outcome.",
 "Use only the versioned internal admin-review mapping for score priority groups; do not use demographic attributes or promise outcomes."
 ],
 "must_keep_keys": [
 "dataset_name",
 "entity_column",
 "flag_evidence",
 "metric_column",
 "metric_stats",
 "priority_group_actions",
 "row_count",
 "sort_direction",
 "summarization_warnings",
 "top_items"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (1.9848 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "ranking",
 "task_id": "A-G15",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples.",
 "List the top ten identifiers in rank order with at_risk_score, exact triggered flags, and final outcome.",
 "Use only the versioned internal admin-review mapping for score priority groups; do not use demographic attributes or promise outcomes."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "intervention_priority_list",
 "row_count": 50,
 "entity_column": "student_id",
 "metric_column": "at_risk_score",
 "sort_direction": "desc"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "top_items": [
 {
 "student_id": "SAMPLE_OULAD_STU_69494",
 "at_risk_score": 5,
 "rank": 1,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 15.5
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_338731",
 "at_risk_score": 5,
 "rank": 2,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 19.25
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624354",
 "at_risk_score": 5,
 "rank": 3,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 23.1429
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629056",
 "at_risk_score": 5,
 "rank": 4,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_171896",
 "at_risk_score": 5,
 "rank": 5,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35.3333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548926",
 "at_risk_score": 5,
 "rank": 6,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 37.3333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616439",
 "at_risk_score": 5,
 "rank": 7,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 37.375
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465619",
 "at_risk_score": 5,
 "rank": 8,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 37.6667
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532565",
 "at_risk_score": 5,
 "rank": 9,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 37.8333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586526",
 "at_risk_score": 5,
 "rank": 10,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 39.6667
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 }
 ],
 "priority_group_actions": {
 "mapping_version": "oulad_admin_review_v1",
 "actions": [
 {
 "at_risk_score": 5,
 "action": "Review this highest-score group first and assign a follow-up owner based on the returned flags.",
 "claim_limit": "review workflow only; do not promise outcomes"
 },
 {
 "at_risk_score": 4,
 "action": "Review this next-score group after score-5 cases and confirm which returned flags require follow-up.",
 "claim_limit": "review workflow only; do not promise outcomes"
 }
 ]
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_stats": {
 "count": 50,
 "min": 4,
 "max": 5,
 "mean": 4.2,
 "median": 4
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flag_evidence": [
 {
 "student_id": "SAMPLE_OULAD_STU_69494",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_338731",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624354",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629056",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_171896",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548926",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616439",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465619",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532565",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586526",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_362548",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592372",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2595204",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2405934",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": false
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 0
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_505700",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 }
 ]
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
 "dataset_name": "intervention_priority_list",
 "row_count": 50,
 "entity_column": "student_id",
 "metric_column": "at_risk_score",
 "sort_direction": "desc",
 "top_items": [
 {
 "student_id": "SAMPLE_OULAD_STU_69494",
 "at_risk_score": 5,
 "rank": 1,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 15.5
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_338731",
 "at_risk_score": 5,
 "rank": 2,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 19.25
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624354",
 "at_risk_score": 5,
 "rank": 3,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 23.1429
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629056",
 "at_risk_score": 5,
 "rank": 4,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_171896",
 "at_risk_score": 5,
 "rank": 5,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35.3333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548926",
 "at_risk_score": 5,
 "rank": 6,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 37.3333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616439",
 "at_risk_score": 5,
 "rank": 7,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 37.375
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465619",
 "at_risk_score": 5,
 "rank": 8,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 37.6667
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532565",
 "at_risk_score": 5,
 "rank": 9,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 37.8333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586526",
 "at_risk_score": 5,
 "rank": 10,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 39.6667
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 }
 ],
 "bottom_items": [
 {
 "student_id": "SAMPLE_OULAD_STU_362548",
 "at_risk_score": 4,
 "rank": 46,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 33.8
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592372",
 "at_risk_score": 4,
 "rank": 47,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 34.1667
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2595204",
 "at_risk_score": 4,
 "rank": 48,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 34.4286
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2405934",
 "at_risk_score": 4,
 "rank": 49,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 34.5556
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": false
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 0
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_505700",
 "at_risk_score": 4,
 "rank": 50,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 34.6667
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 }
 ],
 "median_item": {
 "student_id": "SAMPLE_OULAD_STU_568307",
 "at_risk_score": 4,
 "rank": 26,
 "labels": {
 "at_risk_label": "high",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 24.3333
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 "metric_stats": {
 "count": 50,
 "min": 4,
 "max": 5,
 "mean": 4.2,
 "median": 4
 },
 "tie_warnings": [
 "bottom_items boundary has 40 tied items at at_risk_score=4.0; only 5 are included."
 ],
 "flag_evidence": [
 {
 "student_id": "SAMPLE_OULAD_STU_69494",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_338731",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624354",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629056",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_171896",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548926",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616439",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465619",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532565",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586526",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_362548",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592372",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2595204",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2405934",
 "true_flags": [
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": false
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 1,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 0
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_505700",
 "true_flags": [
 "flag_low_score",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend"
 ],
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": 1,
 "flag_repeated": 0,
 "flag_low_engagement": 1,
 "flag_low_punctuality": 1,
 "flag_neg_trend": 1
 }
 }
 ],
 "summarization_warnings": [],
 "priority_group_actions": {
 "mapping_version": "oulad_admin_review_v1",
 "actions": [
 {
 "at_risk_score": 5,
 "action": "Review this highest-score group first and assign a follow-up owner based on the returned flags.",
 "claim_limit": "review workflow only; do not promise outcomes"
 },
 {
 "at_risk_score": 4,
 "action": "Review this next-score group after score-5 cases and confirm which returned flags require follow-up.",
 "claim_limit": "review workflow only; do not promise outcomes"
 }
 ]
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 6441,
 "token_usage": {
 "prompt_tokens": 6770,
 "completion_tokens": 434,
 "total_tokens": 7204
 },
 "strategy": "ranking",
 "granularity": "semester",
 "cost_usd": 0.001276
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G15__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "bdd820b796c24e02947aa0a1482e96d2ceb0334e5126a0bfeb0eb6115886e1c3",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 6770,
 "completion_tokens": 434,
 "total_tokens": 7204
 },
 "latency_ms": 6463,
 "attempts_used": 1
 }
 },
 "judge_instruction_boundary": {
 "do_not_assume_missing_rows_are_absent": true,
 "use_full_artifact_references_for_audit": true,
 "evaluate_claims_against_the_compact_evidence_and_recorded_artifact_provenance": true,
 "if_full_row_inspection_is_required_mark_the_record_for_manual_or_secondary_retrieval_review": true
 }
}
```
