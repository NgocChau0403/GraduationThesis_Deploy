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
 "dataset_label": "submission_behaviour",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G05.json",
 "artifact_sha256": "0b9ba8429b564f1c03c6a06d95144cb27e022db9b390353358d6703f83abda19",
 "row_count": 11,
 "readable": true
 }
 ],
 "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_contexts/final_contexts/SAMPLE_OULAD__A-G05__task_aware_data_summarization.md",
 "final_context_sha256": "14aa0064938ee6ff77943c0eefef185e502dc01d4ba894ebc9bea4ed9367aa8d",
 "judge_input_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/judge_inputs/SAMPLE_OULAD__A-G05__task_aware_data_summarization.json",
 "judge_input_sha256": "ec16426a1ec2d8c61b0f81dc6f69865fd04d0672336324385eb62e0a9ac848f3"
 },
 "record_identity": {
 "record_id": "SAMPLE_OULAD__A-G05__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G05",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
 },
 "task_context": {
 "task_name": "Submission behaviour analysis",
 "scope": "Many students",
 "actionable_question": "Are late submissions a systemic problem in this class?",
 "target_audience": "instructor",
 "ai_summary_type": "group_comparison",
 "ai_prompt_hint": "Use final_outcome, assessment_type, submission_delay_avg, late_submission_rate, and punctuality_rate to decide whether late submission is systemic. Prioritize groups with high late_submission_rate and high student_count. Do not discuss individual students.",
 "query_labels": [
 "submission_behaviour"
 ],
 "explanation_strategy": "behavioral"
 },
 "schema_context": {
 "source_tables": [
 "assessment_result",
 "assessment",
 "enrollment [OULAD only]"
 ],
 "key_db_fields": [
 "final_outcome [FE cross]",
 "assessment_type [FE cross]",
 "submission_delay_avg [FE cross]",
 "late_submission_rate [FE cross]",
 "punctuality_rate [FE cross]",
 "student_count",
 "submission_count",
 "avg_score",
 "submission_risk_level"
 ],
 "output_schema": {
 "required_columns": [
 "final_outcome",
 "assessment_type",
 "submission_delay_avg",
 "late_submission_rate"
 ],
 "optional_columns": [
 "submission_count",
 "student_count",
 "net_submission_delay_avg",
 "punctuality_rate",
 "avg_score",
 "submission_risk_level"
 ]
 },
 "query_labels": [
 "submission_behaviour"
 ]
 },
 "evaluation_requirements": {
 "required_core_outputs": [
 {
 "requirement_id": "A-G05-CORE-01",
 "description": "Use final_outcome, assessment_type, submission_delay_avg, late_submission_rate, and punctuality_rate to decide whether late submission is systemic."
 },
 {
 "requirement_id": "A-G05-CORE-02",
 "description": "Prioritize groups with high late_submission_rate and high student_count."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-G05-CONSTRAINT-01",
 "description": "Do not discuss individual students."
 }
 ],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
 },
 "derived_stat_evidence": [],
 "deterministic_checks": [
 {
 "check_type": "task_aware_shared_evidence_contract",
 "case_id": "SAMPLE_OULAD__A-G05",
 "task_id": "A-G05",
 "sidecar_sha256": "07412c312e6d7d6bc0506a6899f93d326be8030a75f862bba5c8a5d6389d789b",
 "evidence": {
 "schema_version": "task_aware_shared_evidence_v1",
 "case_id": "SAMPLE_OULAD__A-G05",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G05",
 "source_explanation_record_id": "SAMPLE_OULAD__A-G05__task_aware_data_summarization",
 "source_explanation_artifact_sha256": "eeb67e695561a1dca3b18645f450673f01bb26b3e9d6be3008b0e2732a464974",
 "deterministic_summary": {
 "summary_type": "group_comparison",
 "dataset_name": "submission_behaviour",
 "row_count": 11,
 "group_column": "final_outcome",
 "group_key_columns": [
 "final_outcome",
 "assessment_type"
 ],
 "series_column": "assessment_type",
 "composite_group_keys": true,
 "metric_column": "late_submission_rate",
 "count_column": "student_count",
 "gap_column": null,
 "group_metrics": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 }
 ],
 "group_series": [
 {
 "group": "Pass",
 "series_count": 3,
 "total_count": 2023,
 "weighted_average_metric": 0.4032,
 "series": [
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 }
 ]
 },
 {
 "group": "Withdrawn",
 "series_count": 2,
 "total_count": 960,
 "weighted_average_metric": 0.7212,
 "series": [
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 }
 ]
 },
 {
 "group": "Distinction",
 "series_count": 3,
 "total_count": 863,
 "weighted_average_metric": 0.3716,
 "series": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 }
 ]
 },
 {
 "group": "Fail",
 "series_count": 3,
 "total_count": 806,
 "weighted_average_metric": 0.5461,
 "series": [
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 }
 ]
 }
 ],
 "focus_summary": [],
 "gaps": [
 {
 "group": "Distinction",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9951,
 "student_count": 306
 },
 {
 "group": "Pass",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9899,
 "student_count": 708
 },
 {
 "group": "Fail",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9807,
 "student_count": 359
 },
 {
 "group": "Withdrawn",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9719,
 "student_count": 595
 },
 {
 "group": "Withdrawn",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.3124,
 "student_count": 365
 },
 {
 "group": "Fail",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.3017,
 "student_count": 292
 },
 {
 "group": "Pass",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.189,
 "student_count": 608
 },
 {
 "group": "Distinction",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.0644,
 "student_count": 251
 },
 {
 "group": "Pass",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0,
 "student_count": 707
 },
 {
 "group": "Fail",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0,
 "student_count": 155
 },
 {
 "group": "Distinction",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0,
 "student_count": 306
 }
 ],
 "dominant_group": {
 "group": "Pass",
 "student_count": 708,
 "basis": "largest_count"
 },
 "weakest_group": {
 "group": "Distinction",
 "late_submission_rate": 0,
 "basis": "most_negative_gap",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 "missing_groups": [],
 "low_count_warnings": [],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from late_submission_rate relative to weighted cohort mean.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "systemic_lateness_evidence": {
 "all_groups": [
 {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "CMA",
 "student_count": 359,
 "submission_delay_avg": 3.05,
 "late_submission_rate": 0.9807,
 "punctuality_rate": 0.0193
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA",
 "student_count": 595,
 "submission_delay_avg": 2.77,
 "late_submission_rate": 0.9719,
 "punctuality_rate": 0.0281
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA",
 "student_count": 365,
 "submission_delay_avg": 9.91,
 "late_submission_rate": 0.3124,
 "punctuality_rate": 0.6876
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "TMA",
 "student_count": 292,
 "submission_delay_avg": 7.66,
 "late_submission_rate": 0.3017,
 "punctuality_rate": 0.6983
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "TMA",
 "student_count": 608,
 "submission_delay_avg": 7.79,
 "late_submission_rate": 0.189,
 "punctuality_rate": 0.811
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "TMA",
 "student_count": 251,
 "submission_delay_avg": 6.02,
 "late_submission_rate": 0.0644,
 "punctuality_rate": 0.9356
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "Exam",
 "student_count": 707,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "Exam",
 "student_count": 306,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "Exam",
 "student_count": 155,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 }
 ],
 "highest_rate_group": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "submission_count": 1217,
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_risk_level": "high_lateness"
 },
 "largest_count_among_positive_late_rate": {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "submission_count": 2684,
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_risk_level": "high_lateness"
 }
 }
 },
 "prompt_evidence_payload": {
 "summary_type": "group_comparison",
 "task_id": "A-G05",
 "task_output_contract": [
 "Preserve every returned final_outcome and assessment_type combination with student_count, submission_delay_avg, late_submission_rate, and punctuality_rate.",
 "Prioritize the highest-rate and largest-count groups without inventing causes, motivation, or outcome effects."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "submission_behaviour",
 "row_count": 11,
 "group_column": "final_outcome",
 "group_key_columns": [
 "final_outcome",
 "assessment_type"
 ],
 "series_column": "assessment_type",
 "metric_column": "late_submission_rate",
 "count_column": "student_count",
 "gap_column": null,
 "composite_group_keys": true
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "focus_summary": [],
 "group_metrics": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 }
 ],
 "group_series": [
 {
 "group": "Pass",
 "series_count": 3,
 "total_count": 2023,
 "weighted_average_metric": 0.4032,
 "series": [
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 }
 ]
 },
 {
 "group": "Withdrawn",
 "series_count": 2,
 "total_count": 960,
 "weighted_average_metric": 0.7212,
 "series": [
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 }
 ]
 },
 {
 "group": "Distinction",
 "series_count": 3,
 "total_count": 863,
 "weighted_average_metric": 0.3716,
 "series": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 }
 ]
 },
 {
 "group": "Fail",
 "series_count": 3,
 "total_count": 806,
 "weighted_average_metric": 0.5461,
 "series": [
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 }
 ]
 }
 ],
 "systemic_lateness_evidence": {
 "all_groups": [
 {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "CMA",
 "student_count": 359,
 "submission_delay_avg": 3.05,
 "late_submission_rate": 0.9807,
 "punctuality_rate": 0.0193
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA",
 "student_count": 595,
 "submission_delay_avg": 2.77,
 "late_submission_rate": 0.9719,
 "punctuality_rate": 0.0281
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA",
 "student_count": 365,
 "submission_delay_avg": 9.91,
 "late_submission_rate": 0.3124,
 "punctuality_rate": 0.6876
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "TMA",
 "student_count": 292,
 "submission_delay_avg": 7.66,
 "late_submission_rate": 0.3017,
 "punctuality_rate": 0.6983
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "TMA",
 "student_count": 608,
 "submission_delay_avg": 7.79,
 "late_submission_rate": 0.189,
 "punctuality_rate": 0.811
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "TMA",
 "student_count": 251,
 "submission_delay_avg": 6.02,
 "late_submission_rate": 0.0644,
 "punctuality_rate": 0.9356
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "Exam",
 "student_count": 707,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "Exam",
 "student_count": 306,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "Exam",
 "student_count": 155,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 }
 ],
 "highest_rate_group": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "submission_count": 1217,
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_risk_level": "high_lateness"
 },
 "largest_count_among_positive_late_rate": {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "submission_count": 2684,
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_risk_level": "high_lateness"
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_groups": [],
 "low_count_warnings": [],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from late_submission_rate relative to weighted cohort mean.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ]
 }
 }
 ]
 }
 }
 }
 ],
 "evidence_access_summary": {
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 11,
 "prompt_embedded_row_count": 0,
 "retrieved_row_count": 0,
 "retrieved_row_count_by_dataset": {},
 "retrieval_log_path": null,
 "retrieval_coverage_status": "not_applicable",
 "full_access_available": true,
 "deterministic_scan_scope": "full_query_artifact_all_rows",
 "deterministic_scan_row_count_by_dataset": {
 "submission_behaviour": 11
 },
 "full_result_sent_to_llm": false,
 "evidence_summary": {
 "row_count_phase3": 11,
 "row_count_observed": 11,
 "row_count_bucket_phase3": "<=20",
 "row_count_bucket_observed": "<=20",
 "dataset_breakdown": [
 {
 "label": "submission_behaviour",
 "row_count": 11,
 "sample_fields": [
 "final_outcome",
 "assessment_type",
 "submission_count",
 "student_count",
 "submission_delay_avg",
 "net_submission_delay_avg",
 "late_submission_rate",
 "punctuality_rate",
 "avg_score",
 "submission_risk_level"
 ]
 }
 ],
 "full_query_datasets_sha256": "ca9b618abc86018d9f65f2bc87e4e9170e577022c2ad8a24ccbfeea104682c22"
 },
 "retrieval_log_summary": null,
 "context_manifest_validation": {
 "direct_embedding_validation": {
 "embedded_rows_present": true,
 "embedded_row_count": 11,
 "embedded_row_count_matches_artifact": true,
 "artifact_file_sha256_matches": true,
 "embedded_rows_sha256": "ca9b618abc86018d9f65f2bc87e4e9170e577022c2ad8a24ccbfeea104682c22",
 "source_rows_sha256": "ca9b618abc86018d9f65f2bc87e4e9170e577022c2ad8a24ccbfeea104682c22",
 "embedded_rows_sha256_matches_source": true
 },
 "retrieval_validation": {
 "status": "not_applicable",
 "retrieved_row_count": 0,
 "chunk_count": 0,
 "chunk_ids": [],
 "row_ranges": [],
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
 "raw_text": "Summary: Exact outcome-assessment lateness evidence: final_outcome=Distinction, assessment_type=CMA, student_count=306, submission_delay_avg=3.25, late_submission_rate=0.9951, punctuality_rate=0.0049 | final_outcome=Pass, assessment_type=CMA, student_count=708, submission_delay_avg=3.27, late_submission_rate=0.9899, punctuality_rate=0.0101 | final_outcome=Fail, assessment_type=CMA, student_count=359, submission_delay_avg=3.05, late_submission_rate=0.9807, punctuality_rate=0.0193 | final_outcome=Withdrawn, assessment_type=CMA, student_count=595, submission_delay_avg=2.77, late_submission_rate=0.9719, punctuality_rate=0.0281 | final_outcome=Withdrawn, assessment_type=TMA, student_count=365, submission_delay_avg=9.91, late_submission_rate=0.3124, punctuality_rate=0.6876 | final_outcome=Fail, assessment_type=TMA, student_count=292, submission_delay_avg=7.66, late_submission_rate=0.3017, punctuality_rate=0.6983 | final_outcome=Pass, assessment_type=TMA, student_count=608, submission_delay_avg=7.79, late_submission_rate=0.189, punctuality_rate=0.811 | final_outcome=Distinction, assessment_type=TMA, student_count=251, submission_delay_avg=6.02, late_submission_rate=0.0644, punctuality_rate=0.9356 | final_outcome=Pass, assessment_type=Exam, student_count=707, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0 | final_outcome=Distinction, assessment_type=Exam, student_count=306, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0 | final_outcome=Fail, assessment_type=Exam, student_count=155, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0. Highest returned late rate: Distinction|CMA rate=0.9951, count=306. Largest-count group with positive late rate: Pass|CMA rate=0.9899, count=708.\n\nInsights: High Late Submission Rates in CMA Assessments: Both the 'Distinction' and 'Pass' outcomes in CMA assessments exhibit extremely high late submission rates of 99.51% and 98.99%, respectively, with significant student counts of 306 and 708. This suggests a widespread issue with punctuality in submissions. | Consistent High Late Submission Rates Across Outcomes: The late submission rates for 'Fail' and 'Withdrawn' outcomes in CMA assessments are also notably high at 98.07% and 97.19%, respectively, indicating that the issue is not limited to high-performing students but affects a broad range of outcomes.\n\nEducational implications: CMA lateness is widespread across returned outcome groups; this is descriptive submission evidence and does not establish motivation, engagement, or score effects.",
 "structured_payload": {
 "task_id": "A-G05",
 "execution_id": "exec_1781847724644_4d32e8e3",
 "explanation": {
 "summary": "Exact outcome-assessment lateness evidence: final_outcome=Distinction, assessment_type=CMA, student_count=306, submission_delay_avg=3.25, late_submission_rate=0.9951, punctuality_rate=0.0049 | final_outcome=Pass, assessment_type=CMA, student_count=708, submission_delay_avg=3.27, late_submission_rate=0.9899, punctuality_rate=0.0101 | final_outcome=Fail, assessment_type=CMA, student_count=359, submission_delay_avg=3.05, late_submission_rate=0.9807, punctuality_rate=0.0193 | final_outcome=Withdrawn, assessment_type=CMA, student_count=595, submission_delay_avg=2.77, late_submission_rate=0.9719, punctuality_rate=0.0281 | final_outcome=Withdrawn, assessment_type=TMA, student_count=365, submission_delay_avg=9.91, late_submission_rate=0.3124, punctuality_rate=0.6876 | final_outcome=Fail, assessment_type=TMA, student_count=292, submission_delay_avg=7.66, late_submission_rate=0.3017, punctuality_rate=0.6983 | final_outcome=Pass, assessment_type=TMA, student_count=608, submission_delay_avg=7.79, late_submission_rate=0.189, punctuality_rate=0.811 | final_outcome=Distinction, assessment_type=TMA, student_count=251, submission_delay_avg=6.02, late_submission_rate=0.0644, punctuality_rate=0.9356 | final_outcome=Pass, assessment_type=Exam, student_count=707, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0 | final_outcome=Distinction, assessment_type=Exam, student_count=306, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0 | final_outcome=Fail, assessment_type=Exam, student_count=155, submission_delay_avg=0, late_submission_rate=0, punctuality_rate=0. Highest returned late rate: Distinction|CMA rate=0.9951, count=306. Largest-count group with positive late rate: Pass|CMA rate=0.9899, count=708.",
 "insights": [
 {
 "title": "High Late Submission Rates in CMA Assessments",
 "description": "Both the 'Distinction' and 'Pass' outcomes in CMA assessments exhibit extremely high late submission rates of 99.51% and 98.99%, respectively, with significant student counts of 306 and 708. This suggests a widespread issue with punctuality in submissions.",
 "severity": "high",
 "evidence": [
 {
 "metric": "late_submission_rate",
 "value": 0.9951,
 "comparison": "baseline",
 "delta": null,
 "context": "Distinction in CMA"
 },
 {
 "metric": "late_submission_rate",
 "value": 0.9899,
 "comparison": "baseline",
 "delta": null,
 "context": "Pass in CMA"
 }
 ]
 },
 {
 "title": "Consistent High Late Submission Rates Across Outcomes",
 "description": "The late submission rates for 'Fail' and 'Withdrawn' outcomes in CMA assessments are also notably high at 98.07% and 97.19%, respectively, indicating that the issue is not limited to high-performing students but affects a broad range of outcomes.",
 "severity": "high",
 "evidence": [
 {
 "metric": "late_submission_rate",
 "value": 0.9807,
 "comparison": "baseline",
 "delta": null,
 "context": "Fail in CMA"
 },
 {
 "metric": "late_submission_rate",
 "value": 0.9719,
 "comparison": "baseline",
 "delta": null,
 "context": "Withdrawn in CMA"
 }
 ]
 }
 ],
 "educational_implications": [
 "CMA lateness is widespread across returned outcome groups; this is descriptive submission evidence and does not establish motivation, engagement, or score effects."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is comprehensive and reflects consistent patterns across multiple assessment types and outcomes.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "behavioral",
 "explanation_type": "behavioral",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "group_comparison",
 "ai_summary_method_warning": null,
 "full_result_row_count": 11,
 "included_row_count": 11,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "submission_behaviour",
 "row_count": 11,
 "included_row_count": 11
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 11,
 "baseline_reference_tokens": 922,
 "task_aware_prompt_tokens": 4518,
 "token_ratio": 4.9002,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "exceptions.weakest_group",
 "exceptions.dominant_group",
 "comparison.gaps"
 ],
 "task_output_contract": [
 "Preserve every returned final_outcome and assessment_type combination with student_count, submission_delay_avg, late_submission_rate, and punctuality_rate.",
 "Prioritize the highest-rate and largest-count groups without inventing causes, motivation, or outcome effects."
 ],
 "must_keep_keys": [
 "group_metrics",
 "group_series",
 "systemic_lateness_evidence"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (4.9002 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "group_comparison",
 "task_id": "A-G05",
 "task_output_contract": [
 "Preserve every returned final_outcome and assessment_type combination with student_count, submission_delay_avg, late_submission_rate, and punctuality_rate.",
 "Prioritize the highest-rate and largest-count groups without inventing causes, motivation, or outcome effects."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "submission_behaviour",
 "row_count": 11,
 "group_column": "final_outcome",
 "group_key_columns": [
 "final_outcome",
 "assessment_type"
 ],
 "series_column": "assessment_type",
 "metric_column": "late_submission_rate",
 "count_column": "student_count",
 "gap_column": null,
 "composite_group_keys": true
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "focus_summary": [],
 "group_metrics": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 }
 ],
 "group_series": [
 {
 "group": "Pass",
 "series_count": 3,
 "total_count": 2023,
 "weighted_average_metric": 0.4032,
 "series": [
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 }
 ]
 },
 {
 "group": "Withdrawn",
 "series_count": 2,
 "total_count": 960,
 "weighted_average_metric": 0.7212,
 "series": [
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 }
 ]
 },
 {
 "group": "Distinction",
 "series_count": 3,
 "total_count": 863,
 "weighted_average_metric": 0.3716,
 "series": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 }
 ]
 },
 {
 "group": "Fail",
 "series_count": 3,
 "total_count": 806,
 "weighted_average_metric": 0.5461,
 "series": [
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 }
 ]
 }
 ],
 "systemic_lateness_evidence": {
 "all_groups": [
 {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "CMA",
 "student_count": 359,
 "submission_delay_avg": 3.05,
 "late_submission_rate": 0.9807,
 "punctuality_rate": 0.0193
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA",
 "student_count": 595,
 "submission_delay_avg": 2.77,
 "late_submission_rate": 0.9719,
 "punctuality_rate": 0.0281
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA",
 "student_count": 365,
 "submission_delay_avg": 9.91,
 "late_submission_rate": 0.3124,
 "punctuality_rate": 0.6876
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "TMA",
 "student_count": 292,
 "submission_delay_avg": 7.66,
 "late_submission_rate": 0.3017,
 "punctuality_rate": 0.6983
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "TMA",
 "student_count": 608,
 "submission_delay_avg": 7.79,
 "late_submission_rate": 0.189,
 "punctuality_rate": 0.811
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "TMA",
 "student_count": 251,
 "submission_delay_avg": 6.02,
 "late_submission_rate": 0.0644,
 "punctuality_rate": 0.9356
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "Exam",
 "student_count": 707,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "Exam",
 "student_count": 306,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "Exam",
 "student_count": 155,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 }
 ],
 "highest_rate_group": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "submission_count": 1217,
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_risk_level": "high_lateness"
 },
 "largest_count_among_positive_late_rate": {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "submission_count": 2684,
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_risk_level": "high_lateness"
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_groups": [],
 "low_count_warnings": [],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from late_submission_rate relative to weighted cohort mean.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "group_comparison",
 "dataset_name": "submission_behaviour",
 "row_count": 11,
 "group_column": "final_outcome",
 "group_key_columns": [
 "final_outcome",
 "assessment_type"
 ],
 "series_column": "assessment_type",
 "composite_group_keys": true,
 "metric_column": "late_submission_rate",
 "count_column": "student_count",
 "gap_column": null,
 "group_metrics": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 }
 ],
 "group_series": [
 {
 "group": "Pass",
 "series_count": 3,
 "total_count": 2023,
 "weighted_average_metric": 0.4032,
 "series": [
 {
 "group": "Pass",
 "student_count": 708,
 "late_submission_rate": 0.9899,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_count": 2684
 }
 },
 {
 "group": "Pass",
 "student_count": 707,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 64.86,
 "submission_count": 707
 }
 },
 {
 "group": "Pass",
 "student_count": 608,
 "late_submission_rate": 0.189,
 "group_key_values": {
 "final_outcome": "Pass",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Pass | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.79,
 "net_submission_delay_avg": -0.67,
 "punctuality_rate": 0.811,
 "avg_score": 76.44,
 "submission_count": 2206
 }
 }
 ]
 },
 {
 "group": "Withdrawn",
 "series_count": 2,
 "total_count": 960,
 "weighted_average_metric": 0.7212,
 "series": [
 {
 "group": "Withdrawn",
 "student_count": 595,
 "late_submission_rate": 0.9719,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 2.77,
 "net_submission_delay_avg": 1.51,
 "punctuality_rate": 0.0281,
 "avg_score": 62.46,
 "submission_count": 960
 }
 },
 {
 "group": "Withdrawn",
 "student_count": 365,
 "late_submission_rate": 0.3124,
 "group_key_values": {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Withdrawn | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 9.91,
 "net_submission_delay_avg": 1.3,
 "punctuality_rate": 0.6876,
 "avg_score": 63.74,
 "submission_count": 525
 }
 }
 ]
 },
 {
 "group": "Distinction",
 "series_count": 3,
 "total_count": 863,
 "weighted_average_metric": 0.3716,
 "series": [
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0.9951,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_count": 1217
 }
 },
 {
 "group": "Distinction",
 "student_count": 306,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 94.75,
 "submission_count": 306
 }
 },
 {
 "group": "Distinction",
 "student_count": 251,
 "late_submission_rate": 0.0644,
 "group_key_values": {
 "final_outcome": "Distinction",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Distinction | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 6.02,
 "net_submission_delay_avg": -4.74,
 "punctuality_rate": 0.9356,
 "avg_score": 93.72,
 "submission_count": 947
 }
 }
 ]
 },
 {
 "group": "Fail",
 "series_count": 3,
 "total_count": 806,
 "weighted_average_metric": 0.5461,
 "series": [
 {
 "group": "Fail",
 "student_count": 359,
 "late_submission_rate": 0.9807,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "CMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=CMA",
 "series_value": "CMA",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 3.05,
 "net_submission_delay_avg": 1.55,
 "punctuality_rate": 0.0193,
 "avg_score": 60.86,
 "submission_count": 985
 }
 },
 {
 "group": "Fail",
 "student_count": 155,
 "late_submission_rate": 0,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "Exam"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=Exam",
 "series_value": "Exam",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 0,
 "net_submission_delay_avg": 0,
 "punctuality_rate": 0,
 "avg_score": 31.29,
 "submission_count": 155
 }
 },
 {
 "group": "Fail",
 "student_count": 292,
 "late_submission_rate": 0.3017,
 "group_key_values": {
 "final_outcome": "Fail",
 "assessment_type": "TMA"
 },
 "composite_group_label": "final_outcome=Fail | assessment_type=TMA",
 "series_value": "TMA",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "secondary_metrics": {
 "submission_delay_avg": 7.66,
 "net_submission_delay_avg": 0.02,
 "punctuality_rate": 0.6983,
 "avg_score": 57.67,
 "submission_count": 759
 }
 }
 ]
 }
 ],
 "focus_summary": [],
 "gaps": [
 {
 "group": "Distinction",
 "gap": 0.5074,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9951,
 "student_count": 306
 },
 {
 "group": "Pass",
 "gap": 0.5022,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9899,
 "student_count": 708
 },
 {
 "group": "Fail",
 "gap": 0.493,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9807,
 "student_count": 359
 },
 {
 "group": "Withdrawn",
 "gap": 0.4842,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.9719,
 "student_count": 595
 },
 {
 "group": "Withdrawn",
 "gap": -0.1753,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.3124,
 "student_count": 365
 },
 {
 "group": "Fail",
 "gap": -0.186,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.3017,
 "student_count": 292
 },
 {
 "group": "Pass",
 "gap": -0.2987,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.189,
 "student_count": 608
 },
 {
 "group": "Distinction",
 "gap": -0.4233,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0.0644,
 "student_count": 251
 },
 {
 "group": "Pass",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0,
 "student_count": 707
 },
 {
 "group": "Fail",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0,
 "student_count": 155
 },
 {
 "group": "Distinction",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean",
 "late_submission_rate": 0,
 "student_count": 306
 }
 ],
 "dominant_group": {
 "group": "Pass",
 "student_count": 708,
 "basis": "largest_count"
 },
 "weakest_group": {
 "group": "Distinction",
 "late_submission_rate": 0,
 "basis": "most_negative_gap",
 "gap": -0.4877,
 "gap_basis": "derived_from_weighted_cohort_mean"
 },
 "missing_groups": [],
 "low_count_warnings": [],
 "fairness_warnings": [
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "causal_claim_allowed": false,
 "summarization_warnings": [
 "No explicit gap column configured; gaps derived from late_submission_rate relative to weighted cohort mean.",
 "Group comparison is descriptive only; do not infer that group membership causes performance differences."
 ],
 "systemic_lateness_evidence": {
 "all_groups": [
 {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "CMA",
 "student_count": 359,
 "submission_delay_avg": 3.05,
 "late_submission_rate": 0.9807,
 "punctuality_rate": 0.0193
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "CMA",
 "student_count": 595,
 "submission_delay_avg": 2.77,
 "late_submission_rate": 0.9719,
 "punctuality_rate": 0.0281
 },
 {
 "final_outcome": "Withdrawn",
 "assessment_type": "TMA",
 "student_count": 365,
 "submission_delay_avg": 9.91,
 "late_submission_rate": 0.3124,
 "punctuality_rate": 0.6876
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "TMA",
 "student_count": 292,
 "submission_delay_avg": 7.66,
 "late_submission_rate": 0.3017,
 "punctuality_rate": 0.6983
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "TMA",
 "student_count": 608,
 "submission_delay_avg": 7.79,
 "late_submission_rate": 0.189,
 "punctuality_rate": 0.811
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "TMA",
 "student_count": 251,
 "submission_delay_avg": 6.02,
 "late_submission_rate": 0.0644,
 "punctuality_rate": 0.9356
 },
 {
 "final_outcome": "Pass",
 "assessment_type": "Exam",
 "student_count": 707,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Distinction",
 "assessment_type": "Exam",
 "student_count": 306,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 },
 {
 "final_outcome": "Fail",
 "assessment_type": "Exam",
 "student_count": 155,
 "submission_delay_avg": 0,
 "late_submission_rate": 0,
 "punctuality_rate": 0
 }
 ],
 "highest_rate_group": {
 "final_outcome": "Distinction",
 "assessment_type": "CMA",
 "submission_count": 1217,
 "student_count": 306,
 "submission_delay_avg": 3.25,
 "net_submission_delay_avg": 2.85,
 "late_submission_rate": 0.9951,
 "punctuality_rate": 0.0049,
 "avg_score": 93.85,
 "submission_risk_level": "high_lateness"
 },
 "largest_count_among_positive_late_rate": {
 "final_outcome": "Pass",
 "assessment_type": "CMA",
 "submission_count": 2684,
 "student_count": 708,
 "submission_delay_avg": 3.27,
 "net_submission_delay_avg": 2.57,
 "late_submission_rate": 0.9899,
 "punctuality_rate": 0.0101,
 "avg_score": 77.49,
 "submission_risk_level": "high_lateness"
 }
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 12489,
 "token_usage": {
 "prompt_tokens": 5572,
 "completion_tokens": 634,
 "total_tokens": 6206
 },
 "strategy": "behavioral",
 "granularity": "per_assessment",
 "cost_usd": 0.001216
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G05__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "eeb67e695561a1dca3b18645f450673f01bb26b3e9d6be3008b0e2732a464974",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 5572,
 "completion_tokens": 634,
 "total_tokens": 6206
 },
 "latency_ms": 12497,
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
