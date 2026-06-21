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
 "dataset_label": "at_risk_cohort",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G03.json",
 "artifact_sha256": "bf3c4b346f04ad4be918669370ed792533f943aa3a643588deba688cb7f693f2",
 "row_count": 50,
 "readable": true
 }
 ],
 "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_contexts/final_contexts/SAMPLE_OULAD__A-G03__task_aware_data_summarization.md",
 "final_context_sha256": "0a5959cf6fbbb16db9ab6fdf02a9840ab2cb5670d3a39b1593e3839d0c8fc23a",
 "judge_input_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/judge_inputs/SAMPLE_OULAD__A-G03__task_aware_data_summarization.json",
 "judge_input_sha256": "03ca6160301db47057a88f376ddfb24521c78c7abf491bdbfcb96bff8795692b"
 },
 "record_identity": {
 "record_id": "SAMPLE_OULAD__A-G03__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G03",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
 },
 "task_context": {
 "task_name": "Identify at-risk cohort",
 "scope": "Many students",
 "actionable_question": "Who should the admin contact first this week?",
 "target_audience": "instructor, admin",
 "ai_summary_type": "ranking",
 "ai_prompt_hint": "Rank at-risk students by at_risk_score. For each high-risk student, explain triggered_flags_summary and recommend the recommended_admin_action. Do not invent reasons outside triggered_flags.",
 "query_labels": [
 "at_risk_cohort"
 ],
 "explanation_strategy": "risk"
 },
 "schema_context": {
 "source_tables": [
 "enrollment",
 "assessment_result",
 "assessment",
 "engagement"
 ],
 "key_db_fields": [
 "at_risk_score [FE cross]",
 "at_risk_label [FE cross]",
 "avg_score [FE cross]",
 "final_outcome"
 ],
 "output_schema": {
 "required_columns": [
 "student_id",
 "avg_score",
 "at_risk_score",
 "at_risk_label",
 "triggered_flags"
 ],
 "optional_columns": [
 "enrollment_id",
 "score_strategy",
 "score_scale",
 "pass_threshold",
 "target_threshold",
 "engagement_score",
 "engagement_score_available",
 "punctuality_rate",
 "previous_attempt_count",
 "triggered_flags_summary",
 "primary_support_category",
 "recommended_admin_action",
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend",
 "final_outcome"
 ]
 },
 "query_labels": [
 "at_risk_cohort"
 ]
 },
 "evaluation_requirements": {
 "required_core_outputs": [
 {
 "requirement_id": "A-G03-CORE-01",
 "description": "Rank at-risk students by at_risk_score."
 },
 {
 "requirement_id": "A-G03-CORE-02",
 "description": "For each high-risk student, explain triggered_flags_summary and recommend the recommended_admin_action."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-G03-CONSTRAINT-01",
 "description": "Do not invent reasons outside triggered_flags."
 }
 ],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
 },
 "derived_stat_evidence": [],
 "deterministic_checks": [
 {
 "check_type": "task_aware_shared_evidence_contract",
 "case_id": "SAMPLE_OULAD__A-G03",
 "task_id": "A-G03",
 "sidecar_sha256": "f85710d2f9820edecd243300f9c8316cad64386e21f0491bac9a492d1fc2379c",
 "evidence": {
 "schema_version": "task_aware_shared_evidence_v1",
 "case_id": "SAMPLE_OULAD__A-G03",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G03",
 "source_explanation_record_id": "SAMPLE_OULAD__A-G03__task_aware_data_summarization",
 "source_explanation_artifact_sha256": "4bd06103e15de9996b377b45fdf9ae585fd101d9c4afa7a01cb14834da2998d8",
 "deterministic_summary": {
 "summary_type": "ranking",
 "dataset_name": "at_risk_cohort",
 "row_count": 50,
 "entity_column": "student_id",
 "metric_column": "at_risk_score",
 "sort_direction": "desc",
 "top_items": [
 {
 "student_id": "SAMPLE_OULAD_STU_624354",
 "at_risk_score": 5,
 "rank": 1,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 21.81 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.047 < 0.15",
 "low_punctuality: punctuality_rate 0.167 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 21.81 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.047 < 0.15; low_punctuality: punctuality_rate 0.167 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 21.81,
 "engagement_score": 0.0467,
 "punctuality_rate": 0.1667,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548926",
 "at_risk_score": 5,
 "rank": 2,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 26.53 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.018 < 0.15",
 "low_punctuality: punctuality_rate 0.500 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 26.53 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.018 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 26.53,
 "engagement_score": 0.0179,
 "punctuality_rate": 0.5,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532565",
 "at_risk_score": 5,
 "rank": 3,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 30.73 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.098 < 0.15",
 "low_punctuality: punctuality_rate 0.333 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 30.73 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.098 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 30.73,
 "engagement_score": 0.0984,
 "punctuality_rate": 0.3333,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586526",
 "at_risk_score": 5,
 "rank": 4,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 31 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.065 < 0.15",
 "low_punctuality: punctuality_rate 0.333 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 31 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.065 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 31,
 "engagement_score": 0.0653,
 "punctuality_rate": 0.3333,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_165733",
 "at_risk_score": 5,
 "rank": 5,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 32.67 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.073 < 0.15",
 "low_punctuality: punctuality_rate 0.250 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 32.67 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.073 < 0.15; low_punctuality: punctuality_rate 0.250 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 32.67,
 "engagement_score": 0.0731,
 "punctuality_rate": 0.25,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630200",
 "at_risk_score": 5,
 "rank": 6,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 33.35 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.034 < 0.15",
 "low_punctuality: punctuality_rate 0.571 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 33.35 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.034 < 0.15; low_punctuality: punctuality_rate 0.571 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 33.35,
 "engagement_score": 0.0339,
 "punctuality_rate": 0.5714,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_171896",
 "at_risk_score": 5,
 "rank": 7,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 33.67 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.086 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 33.67 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.086 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 33.67,
 "engagement_score": 0.0859,
 "punctuality_rate": 0,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_515734",
 "at_risk_score": 5,
 "rank": 8,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 34.6 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.138 < 0.15",
 "low_punctuality: punctuality_rate 0.500 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 34.6 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.138 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 34.6,
 "engagement_score": 0.1376,
 "punctuality_rate": 0.5,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465619",
 "at_risk_score": 5,
 "rank": 9,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 35.27 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.040 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 35.27 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.040 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35.27,
 "engagement_score": 0.0396,
 "punctuality_rate": 0,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_416860",
 "at_risk_score": 5,
 "rank": 10,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 35.9 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.138 < 0.15",
 "low_punctuality: punctuality_rate 0.200 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 35.9 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.138 < 0.15; low_punctuality: punctuality_rate 0.200 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35.9,
 "engagement_score": 0.1375,
 "punctuality_rate": 0.2,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 }
 ],
 "bottom_items": [
 {
 "student_id": "SAMPLE_OULAD_STU_546139",
 "at_risk_score": 4,
 "rank": 46,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 27.5 < pass_threshold 40",
 "low_engagement: engagement_score 0.046 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 27.5 < pass_threshold 40; low_engagement: engagement_score 0.046 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 27.5,
 "engagement_score": 0.0461,
 "punctuality_rate": 0,
 "previous_attempt_count": 0
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634721",
 "at_risk_score": 4,
 "rank": 47,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 27.82 < pass_threshold 40",
 "low_engagement: engagement_score 0.123 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 27.82 < pass_threshold 40; low_engagement: engagement_score 0.123 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 27.82,
 "engagement_score": 0.1225,
 "punctuality_rate": 0,
 "previous_attempt_count": 0
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145490",
 "at_risk_score": 4,
 "rank": 48,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 27.87 < pass_threshold 40",
 "low_engagement: engagement_score 0.129 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 27.87 < pass_threshold 40; low_engagement: engagement_score 0.129 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 27.87,
 "engagement_score": 0.1293,
 "punctuality_rate": 0,
 "previous_attempt_count": 0
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145114",
 "at_risk_score": 4,
 "rank": 49,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 28.18 < pass_threshold 40",
 "low_engagement: engagement_score 0.094 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 28.18 < pass_threshold 40; low_engagement: engagement_score 0.094 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 28.18,
 "engagement_score": 0.094,
 "punctuality_rate": 0,
 "previous_attempt_count": 0
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633334",
 "at_risk_score": 4,
 "rank": 50,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 28.58 < pass_threshold 40",
 "low_engagement: engagement_score 0.032 < 0.15",
 "low_punctuality: punctuality_rate 0.500 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 28.58 < pass_threshold 40; low_engagement: engagement_score 0.032 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 28.58,
 "engagement_score": 0.032,
 "punctuality_rate": 0.5,
 "previous_attempt_count": 0
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 }
 ],
 "median_item": {
 "student_id": "SAMPLE_OULAD_STU_649607",
 "at_risk_score": 4,
 "rank": 26,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 20.2 < pass_threshold 40",
 "low_engagement: engagement_score 0.029 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 20.2 < pass_threshold 40; low_engagement: engagement_score 0.029 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 20.2,
 "engagement_score": 0.0286,
 "punctuality_rate": 0,
 "previous_attempt_count": 0
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 "metric_stats": {
 "count": 50,
 "min": 4,
 "max": 5,
 "mean": 4.26,
 "median": 4
 },
 "tie_warnings": [
 "top_items boundary has 13 tied items at at_risk_score=5.0; only 10 are included.",
 "bottom_items boundary has 37 tied items at at_risk_score=4.0; only 5 are included."
 ],
 "flag_evidence": [
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_165733",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630200",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_515734",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_416860",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_546139",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634721",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145490",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145114",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633334",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 }
 ],
 "summarization_warnings": []
 },
 "prompt_evidence_payload": {
 "summary_type": "ranking",
 "task_id": "A-G03",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "at_risk_cohort",
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
 "student_id": "SAMPLE_OULAD_STU_624354",
 "at_risk_score": 5,
 "rank": 1,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 21.81 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.047 < 0.15",
 "low_punctuality: punctuality_rate 0.167 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 21.81 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.047 < 0.15; low_punctuality: punctuality_rate 0.167 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 21.81,
 "engagement_score": 0.0467,
 "punctuality_rate": 0.1667,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548926",
 "at_risk_score": 5,
 "rank": 2,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 26.53 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.018 < 0.15",
 "low_punctuality: punctuality_rate 0.500 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 26.53 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.018 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 26.53,
 "engagement_score": 0.0179,
 "punctuality_rate": 0.5,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532565",
 "at_risk_score": 5,
 "rank": 3,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 30.73 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.098 < 0.15",
 "low_punctuality: punctuality_rate 0.333 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 30.73 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.098 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 30.73,
 "engagement_score": 0.0984,
 "punctuality_rate": 0.3333,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586526",
 "at_risk_score": 5,
 "rank": 4,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 31 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.065 < 0.15",
 "low_punctuality: punctuality_rate 0.333 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 31 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.065 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 31,
 "engagement_score": 0.0653,
 "punctuality_rate": 0.3333,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_165733",
 "at_risk_score": 5,
 "rank": 5,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 32.67 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.073 < 0.15",
 "low_punctuality: punctuality_rate 0.250 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 32.67 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.073 < 0.15; low_punctuality: punctuality_rate 0.250 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 32.67,
 "engagement_score": 0.0731,
 "punctuality_rate": 0.25,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630200",
 "at_risk_score": 5,
 "rank": 6,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 33.35 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.034 < 0.15",
 "low_punctuality: punctuality_rate 0.571 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 33.35 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.034 < 0.15; low_punctuality: punctuality_rate 0.571 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 33.35,
 "engagement_score": 0.0339,
 "punctuality_rate": 0.5714,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_171896",
 "at_risk_score": 5,
 "rank": 7,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 33.67 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.086 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 33.67 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.086 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 33.67,
 "engagement_score": 0.0859,
 "punctuality_rate": 0,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_515734",
 "at_risk_score": 5,
 "rank": 8,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 34.6 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.138 < 0.15",
 "low_punctuality: punctuality_rate 0.500 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 34.6 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.138 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 34.6,
 "engagement_score": 0.1376,
 "punctuality_rate": 0.5,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465619",
 "at_risk_score": 5,
 "rank": 9,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 35.27 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.040 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 35.27 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.040 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35.27,
 "engagement_score": 0.0396,
 "punctuality_rate": 0,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_416860",
 "at_risk_score": 5,
 "rank": 10,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 35.9 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.138 < 0.15",
 "low_punctuality: punctuality_rate 0.200 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 35.9 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.138 < 0.15; low_punctuality: punctuality_rate 0.200 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35.9,
 "engagement_score": 0.1375,
 "punctuality_rate": 0.2,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 }
 ]
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_stats": {
 "count": 50,
 "min": 4,
 "max": 5,
 "mean": 4.26,
 "median": 4
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flag_evidence": [
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_165733",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630200",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_515734",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_416860",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_546139",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634721",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145490",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145114",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633334",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "at_risk_cohort": 50
 },
 "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G03__task_aware_data_summarization.json",
 "retrieval_coverage_status": "full",
 "full_access_available": true,
 "deterministic_scan_scope": "full_query_artifact_all_rows",
 "deterministic_scan_row_count_by_dataset": {
 "at_risk_cohort": 50
 },
 "full_result_sent_to_llm": false,
 "evidence_summary": {
 "row_count_phase3": 50,
 "row_count_observed": 50,
 "row_count_bucket_phase3": ">20",
 "row_count_bucket_observed": ">20",
 "dataset_breakdown": [
 {
 "label": "at_risk_cohort",
 "row_count": 50,
 "sample_fields": [
 "student_id",
 "enrollment_id",
 "avg_score",
 "score_strategy",
 "score_scale",
 "pass_threshold",
 "target_threshold",
 "engagement_score",
 "engagement_score_available",
 "punctuality_rate",
 "previous_attempt_count",
 "at_risk_score",
 "at_risk_label",
 "triggered_flags",
 "triggered_flags_summary",
 "primary_support_category",
 "recommended_admin_action",
 "flag_low_score",
 "flag_repeated",
 "flag_low_engagement",
 "flag_low_punctuality",
 "flag_neg_trend",
 "final_outcome"
 ]
 }
 ],
 "full_query_datasets_sha256": "f824f080be8aefa1e2faaa0ee1c0ca95154fbb90e6670dcb57bd143b526051f8"
 },
 "retrieval_log_summary": {
 "retrieval_request_complete": true,
 "retrieval_coverage_status": "full",
 "chunk_count": 1,
 "chunks": [
 {
 "chunk_id": "SAMPLE_OULAD__A-G03__task_aware_data_summarization__at_risk_cohort__chunk_1",
 "dataset_label": "at_risk_cohort",
 "row_start_inclusive": 0,
 "row_end_inclusive": 49,
 "row_count": 50,
 "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G03.json",
 "source_artifact_sha256": "bf3c4b346f04ad4be918669370ed792533f943aa3a643588deba688cb7f693f2"
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
 "SAMPLE_OULAD__A-G03__task_aware_data_summarization__at_risk_cohort__chunk_1"
 ],
 "row_ranges": [
 {
 "dataset_label": "at_risk_cohort",
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
 "raw_text": "Summary: The analysis identifies a cohort of students exhibiting multiple risk indicators, primarily characterized by low average scores, low engagement, and poor punctuality. These students are at high risk of failing or withdrawing from the course, necessitating immediate academic support interventions. Top-ranked exact risk evidence: SAMPLE_OULAD_STU_624354: at_risk_score=5, avg_score=21.81, triggered_flags_summary=low_score: avg_score 21.81 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.047 < 0.15; low_punctuality: punctuality_rate 0.167 < 0.7; negative_trend: performance trend is declining, recommended_admin_action=Prioritise academic support for low average score. | SAMPLE_OULAD_STU_548926: at_risk_score=5, avg_score=26.53, triggered_flags_summary=low_score: avg_score 26.53 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.018 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining, recommended_admin_action=Prioritise academic support for low average score. | SAMPLE_OULAD_STU_532565: at_risk_score=5, avg_score=30.73, triggered_flags_summary=low_score: avg_score 30.73 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.098 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining, recommended_admin_action=Prioritise academic support for low average score. | SAMPLE_OULAD_STU_586526: at_risk_score=5, avg_score=31, triggered_flags_summary=low_score: avg_score 31 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.065 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining, recommended_admin_action=Prioritise academic support for low average score. | SAMPLE_OULAD_STU_165733: at_risk_score=5, avg_score=32.67, triggered_flags_summary=low_score: avg_score 32.67 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.073 < 0.15; low_punctuality: punctuality_rate 0.250 < 0.7; negative_trend: performance trend is declining, recommended_admin_action=Prioritise academic support for low average score..\n\nInsights: Student with the Lowest Average Score: SAMPLE_OULAD_STU_624354 has the lowest average score of 21.81, alongside low engagement (0.0467) and punctuality (0.1667). This student has triggered multiple flags indicating significant risk. | Consistent Low Performance: SAMPLE_OULAD_STU_548926, with an average score of 26.53, also shows low engagement (0.0179) and punctuality (0.5). This student has similar risk flags as the top-ranked student, indicating a pattern of low performance.\n\nEducational implications: Use the returned rank, triggered_flags_summary, and recommended_admin_action to prioritize review; do not infer causes from these flags.\n\nRecommendations: high - Prioritise academic support for low average score. - This action addresses the immediate needs of students who are struggling academically and may prevent further decline.",
 "structured_payload": {
 "task_id": "A-G03",
 "execution_id": "exec_1781847699944_3839ef19",
 "explanation": {
 "summary": "The analysis identifies a cohort of students exhibiting multiple risk indicators, primarily characterized by low average scores, low engagement, and poor punctuality. These students are at high risk of failing or withdrawing from the course, necessitating immediate academic support interventions. Top-ranked exact risk evidence: SAMPLE_OULAD_STU_624354: at_risk_score=5, avg_score=21.81, triggered_flags_summary=low_score: avg_score 21.81 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.047 < 0.15; low_punctuality: punctuality_rate 0.167 < 0.7; negative_trend: performance trend is declining, recommended_admin_action=Prioritise academic support for low average score. | SAMPLE_OULAD_STU_548926: at_risk_score=5, avg_score=26.53, triggered_flags_summary=low_score: avg_score 26.53 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.018 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining, recommended_admin_action=Prioritise academic support for low average score. | SAMPLE_OULAD_STU_532565: at_risk_score=5, avg_score=30.73, triggered_flags_summary=low_score: avg_score 30.73 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.098 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining, recommended_admin_action=Prioritise academic support for low average score. | SAMPLE_OULAD_STU_586526: at_risk_score=5, avg_score=31, triggered_flags_summary=low_score: avg_score 31 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.065 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining, recommended_admin_action=Prioritise academic support for low average score. | SAMPLE_OULAD_STU_165733: at_risk_score=5, avg_score=32.67, triggered_flags_summary=low_score: avg_score 32.67 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.073 < 0.15; low_punctuality: punctuality_rate 0.250 < 0.7; negative_trend: performance trend is declining, recommended_admin_action=Prioritise academic support for low average score..",
 "insights": [
 {
 "title": "Student with the Lowest Average Score",
 "description": "SAMPLE_OULAD_STU_624354 has the lowest average score of 21.81, alongside low engagement (0.0467) and punctuality (0.1667). This student has triggered multiple flags indicating significant risk.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 21.81,
 "comparison": "baseline",
 "delta": null,
 "context": "Below pass threshold of 40"
 },
 {
 "metric": "engagement_score",
 "value": 0.0467,
 "comparison": "baseline",
 "delta": null,
 "context": "Below engagement threshold of 0.15"
 },
 {
 "metric": "punctuality_rate",
 "value": 0.1667,
 "comparison": "baseline",
 "delta": null,
 "context": "Below punctuality threshold of 0.7"
 }
 ]
 },
 {
 "title": "Consistent Low Performance",
 "description": "SAMPLE_OULAD_STU_548926, with an average score of 26.53, also shows low engagement (0.0179) and punctuality (0.5). This student has similar risk flags as the top-ranked student, indicating a pattern of low performance.",
 "severity": "high",
 "evidence": [
 {
 "metric": "avg_score",
 "value": 26.53,
 "comparison": "baseline",
 "delta": null,
 "context": "Below pass threshold of 40"
 },
 {
 "metric": "engagement_score",
 "value": 0.0179,
 "comparison": "baseline",
 "delta": null,
 "context": "Below engagement threshold of 0.15"
 },
 {
 "metric": "punctuality_rate",
 "value": 0.5,
 "comparison": "baseline",
 "delta": null,
 "context": "Below punctuality threshold of 0.7"
 }
 ]
 }
 ],
 "educational_implications": [
 "Use the returned rank, triggered_flags_summary, and recommended_admin_action to prioritize review; do not infer causes from these flags."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Prioritise academic support for low average score.",
 "rationale": "This action addresses the immediate needs of students who are struggling academically and may prevent further decline."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is consistent and shows clear patterns of risk indicators across multiple students.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "risk",
 "explanation_type": "risk",
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
 "dataset_name": "at_risk_cohort",
 "row_count": 50,
 "included_row_count": 15
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 15,
 "baseline_reference_tokens": 6833,
 "task_aware_prompt_tokens": 10040,
 "token_ratio": 1.4693,
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
 "Task-aware V3 prompt exceeded the configured soft token ratio (1.4693 > 1.2)."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "ranking",
 "task_id": "A-G03",
 "task_output_contract": [
 "State the ranking/top entities, rank metric value, and why they are prioritized.",
 "For risk/admin ranking rows, include returned flags or recommended action fields when present.",
 "Do not generalize beyond returned rows or omit the top ranked examples."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "at_risk_cohort",
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
 "student_id": "SAMPLE_OULAD_STU_624354",
 "at_risk_score": 5,
 "rank": 1,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 21.81 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.047 < 0.15",
 "low_punctuality: punctuality_rate 0.167 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 21.81 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.047 < 0.15; low_punctuality: punctuality_rate 0.167 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 21.81,
 "engagement_score": 0.0467,
 "punctuality_rate": 0.1667,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548926",
 "at_risk_score": 5,
 "rank": 2,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 26.53 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.018 < 0.15",
 "low_punctuality: punctuality_rate 0.500 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 26.53 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.018 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 26.53,
 "engagement_score": 0.0179,
 "punctuality_rate": 0.5,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532565",
 "at_risk_score": 5,
 "rank": 3,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 30.73 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.098 < 0.15",
 "low_punctuality: punctuality_rate 0.333 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 30.73 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.098 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 30.73,
 "engagement_score": 0.0984,
 "punctuality_rate": 0.3333,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586526",
 "at_risk_score": 5,
 "rank": 4,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 31 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.065 < 0.15",
 "low_punctuality: punctuality_rate 0.333 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 31 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.065 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 31,
 "engagement_score": 0.0653,
 "punctuality_rate": 0.3333,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_165733",
 "at_risk_score": 5,
 "rank": 5,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 32.67 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.073 < 0.15",
 "low_punctuality: punctuality_rate 0.250 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 32.67 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.073 < 0.15; low_punctuality: punctuality_rate 0.250 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 32.67,
 "engagement_score": 0.0731,
 "punctuality_rate": 0.25,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630200",
 "at_risk_score": 5,
 "rank": 6,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 33.35 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.034 < 0.15",
 "low_punctuality: punctuality_rate 0.571 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 33.35 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.034 < 0.15; low_punctuality: punctuality_rate 0.571 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 33.35,
 "engagement_score": 0.0339,
 "punctuality_rate": 0.5714,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_171896",
 "at_risk_score": 5,
 "rank": 7,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 33.67 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.086 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 33.67 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.086 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 33.67,
 "engagement_score": 0.0859,
 "punctuality_rate": 0,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_515734",
 "at_risk_score": 5,
 "rank": 8,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 34.6 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.138 < 0.15",
 "low_punctuality: punctuality_rate 0.500 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 34.6 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.138 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 34.6,
 "engagement_score": 0.1376,
 "punctuality_rate": 0.5,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465619",
 "at_risk_score": 5,
 "rank": 9,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 35.27 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.040 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 35.27 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.040 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35.27,
 "engagement_score": 0.0396,
 "punctuality_rate": 0,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_416860",
 "at_risk_score": 5,
 "rank": 10,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 35.9 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.138 < 0.15",
 "low_punctuality: punctuality_rate 0.200 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 35.9 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.138 < 0.15; low_punctuality: punctuality_rate 0.200 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35.9,
 "engagement_score": 0.1375,
 "punctuality_rate": 0.2,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 }
 ]
 }
 },
 {
 "name": "comparison",
 "facts": {
 "metric_stats": {
 "count": 50,
 "min": 4,
 "max": 5,
 "mean": 4.26,
 "median": 4
 }
 }
 },
 {
 "name": "exceptions",
 "facts": {
 "flag_evidence": [
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_165733",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630200",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_515734",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_416860",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_546139",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634721",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145490",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145114",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633334",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "dataset_name": "at_risk_cohort",
 "row_count": 50,
 "entity_column": "student_id",
 "metric_column": "at_risk_score",
 "sort_direction": "desc",
 "top_items": [
 {
 "student_id": "SAMPLE_OULAD_STU_624354",
 "at_risk_score": 5,
 "rank": 1,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 21.81 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.047 < 0.15",
 "low_punctuality: punctuality_rate 0.167 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 21.81 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.047 < 0.15; low_punctuality: punctuality_rate 0.167 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 21.81,
 "engagement_score": 0.0467,
 "punctuality_rate": 0.1667,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548926",
 "at_risk_score": 5,
 "rank": 2,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 26.53 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.018 < 0.15",
 "low_punctuality: punctuality_rate 0.500 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 26.53 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.018 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 26.53,
 "engagement_score": 0.0179,
 "punctuality_rate": 0.5,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532565",
 "at_risk_score": 5,
 "rank": 3,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 30.73 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.098 < 0.15",
 "low_punctuality: punctuality_rate 0.333 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 30.73 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.098 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 30.73,
 "engagement_score": 0.0984,
 "punctuality_rate": 0.3333,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586526",
 "at_risk_score": 5,
 "rank": 4,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 31 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.065 < 0.15",
 "low_punctuality: punctuality_rate 0.333 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 31 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.065 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 31,
 "engagement_score": 0.0653,
 "punctuality_rate": 0.3333,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_165733",
 "at_risk_score": 5,
 "rank": 5,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 32.67 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.073 < 0.15",
 "low_punctuality: punctuality_rate 0.250 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 32.67 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.073 < 0.15; low_punctuality: punctuality_rate 0.250 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 32.67,
 "engagement_score": 0.0731,
 "punctuality_rate": 0.25,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630200",
 "at_risk_score": 5,
 "rank": 6,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 33.35 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.034 < 0.15",
 "low_punctuality: punctuality_rate 0.571 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 33.35 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.034 < 0.15; low_punctuality: punctuality_rate 0.571 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 33.35,
 "engagement_score": 0.0339,
 "punctuality_rate": 0.5714,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_171896",
 "at_risk_score": 5,
 "rank": 7,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 33.67 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.086 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 33.67 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.086 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 33.67,
 "engagement_score": 0.0859,
 "punctuality_rate": 0,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_515734",
 "at_risk_score": 5,
 "rank": 8,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 34.6 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.138 < 0.15",
 "low_punctuality: punctuality_rate 0.500 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 34.6 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.138 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 34.6,
 "engagement_score": 0.1376,
 "punctuality_rate": 0.5,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465619",
 "at_risk_score": 5,
 "rank": 9,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 35.27 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.040 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 35.27 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.040 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35.27,
 "engagement_score": 0.0396,
 "punctuality_rate": 0,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_416860",
 "at_risk_score": 5,
 "rank": 10,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 35.9 < pass_threshold 40",
 "repeated_attempt: previous_attempt_count 1",
 "low_engagement: engagement_score 0.138 < 0.15",
 "low_punctuality: punctuality_rate 0.200 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 35.9 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.138 < 0.15; low_punctuality: punctuality_rate 0.200 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 35.9,
 "engagement_score": 0.1375,
 "punctuality_rate": 0.2,
 "previous_attempt_count": 1
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 }
 ],
 "bottom_items": [
 {
 "student_id": "SAMPLE_OULAD_STU_546139",
 "at_risk_score": 4,
 "rank": 46,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 27.5 < pass_threshold 40",
 "low_engagement: engagement_score 0.046 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 27.5 < pass_threshold 40; low_engagement: engagement_score 0.046 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 27.5,
 "engagement_score": 0.0461,
 "punctuality_rate": 0,
 "previous_attempt_count": 0
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634721",
 "at_risk_score": 4,
 "rank": 47,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 27.82 < pass_threshold 40",
 "low_engagement: engagement_score 0.123 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 27.82 < pass_threshold 40; low_engagement: engagement_score 0.123 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 27.82,
 "engagement_score": 0.1225,
 "punctuality_rate": 0,
 "previous_attempt_count": 0
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145490",
 "at_risk_score": 4,
 "rank": 48,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 27.87 < pass_threshold 40",
 "low_engagement: engagement_score 0.129 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 27.87 < pass_threshold 40; low_engagement: engagement_score 0.129 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 27.87,
 "engagement_score": 0.1293,
 "punctuality_rate": 0,
 "previous_attempt_count": 0
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145114",
 "at_risk_score": 4,
 "rank": 49,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 28.18 < pass_threshold 40",
 "low_engagement: engagement_score 0.094 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 28.18 < pass_threshold 40; low_engagement: engagement_score 0.094 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 28.18,
 "engagement_score": 0.094,
 "punctuality_rate": 0,
 "previous_attempt_count": 0
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633334",
 "at_risk_score": 4,
 "rank": 50,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 28.58 < pass_threshold 40",
 "low_engagement: engagement_score 0.032 < 0.15",
 "low_punctuality: punctuality_rate 0.500 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 28.58 < pass_threshold 40; low_engagement: engagement_score 0.032 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Fail"
 },
 "secondary_metrics": {
 "avg_score": 28.58,
 "engagement_score": 0.032,
 "punctuality_rate": 0.5,
 "previous_attempt_count": 0
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 }
 ],
 "median_item": {
 "student_id": "SAMPLE_OULAD_STU_649607",
 "at_risk_score": 4,
 "rank": 26,
 "labels": {
 "at_risk_label": "high",
 "triggered_flags": [
 "low_score: avg_score 20.2 < pass_threshold 40",
 "low_engagement: engagement_score 0.029 < 0.15",
 "low_punctuality: punctuality_rate 0.000 < 0.7",
 "negative_trend: performance trend is declining"
 ],
 "triggered_flags_summary": "low_score: avg_score 20.2 < pass_threshold 40; low_engagement: engagement_score 0.029 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
 "primary_support_category": "academic_performance",
 "recommended_admin_action": "Prioritise academic support for low average score.",
 "final_outcome": "Withdrawn"
 },
 "secondary_metrics": {
 "avg_score": 20.2,
 "engagement_score": 0.0286,
 "punctuality_rate": 0,
 "previous_attempt_count": 0
 },
 "flags": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 },
 "flag_raw_values": {
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 "metric_stats": {
 "count": 50,
 "min": 4,
 "max": 5,
 "mean": 4.26,
 "median": 4
 },
 "tie_warnings": [
 "top_items boundary has 13 tied items at at_risk_score=5.0; only 10 are included.",
 "bottom_items boundary has 37 tied items at at_risk_score=4.0; only 5 are included."
 ],
 "flag_evidence": [
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_165733",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630200",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_515734",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_416860",
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
 "flag_low_score": true,
 "flag_repeated": true,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_546139",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634721",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145490",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145114",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633334",
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
 "flag_low_score": true,
 "flag_repeated": false,
 "flag_low_engagement": true,
 "flag_low_punctuality": true,
 "flag_neg_trend": true
 }
 }
 ],
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 9365,
 "token_usage": {
 "prompt_tokens": 12085,
 "completion_tokens": 687,
 "total_tokens": 12772
 },
 "strategy": "risk",
 "granularity": "semester",
 "cost_usd": 0.002225
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G03__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "4bd06103e15de9996b377b45fdf9ae585fd101d9c4afa7a01cb14834da2998d8",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 12085,
 "completion_tokens": 687,
 "total_tokens": 12772
 },
 "latency_ms": 9374,
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
