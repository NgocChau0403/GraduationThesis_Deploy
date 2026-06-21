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

# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__S-T03__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "S-T03",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Peer comparison",
 "scope": "1 student",
 "actionable_question": "Where do I stand compared to my class?",
 "target_audience": "student",
 "ai_summary_type": "multi_metric_comparison",
 "ai_prompt_hint": "Show student's standing (top X%). Explain which metrics are above/below average.",
 "query_labels": [
 "peer_comparison"
 ],
 "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
 "source_tables": [
 "enrollment",
 "assessment_result",
 "assessment",
 "engagement"
 ],
 "key_db_fields": [
 "avg_score [FE cross]",
 "engagement_score [FE cross]",
 "pass_rate [FE cross]",
 "performance_trend [FE cross]"
 ],
 "output_schema": {},
 "query_labels": [
 "peer_comparison"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "S-T03-CORE-01",
 "description": "Show student's standing (top X%)."
 },
 {
 "requirement_id": "S-T03-CORE-02",
 "description": "Explain which metrics are above/below average."
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
 "dataset_label": "peer_comparison",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T03.json",
 "artifact_sha256": "fe610876e89ca66eba912e2edc06e235347cbdec54f8c8c0f344e278d45741b0",
 "row_count": 6,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 6,
 "prompt_embedded_row_count": 6,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "fe610876e89ca66eba912e2edc06e235347cbdec54f8c8c0f344e278d45741b0",
 "evidence_rows_sha256": "258ba6c73463a11719ee33bb99ee61829cd66432c386f97717cdff3b64fa6b62",
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
 "full_result_row_count": 6,
 "embedded_datasets_sha256": "258ba6c73463a11719ee33bb99ee61829cd66432c386f97717cdff3b64fa6b62",
 "datasets": {
 "peer_comparison": [
 {
 "metric_name": "Average score",
 "comparison_group": "You",
 "metric_value": 94.34,
 "sort_order": 1
 },
 {
 "metric_name": "Average score",
 "comparison_group": "Cohort benchmark",
 "metric_value": 66.68,
 "sort_order": 1
 },
 {
 "metric_name": "Score percentile",
 "comparison_group": "You",
 "metric_value": 89.8,
 "sort_order": 2
 },
 {
 "metric_name": "Score percentile",
 "comparison_group": "Cohort benchmark",
 "metric_value": 50,
 "sort_order": 2
 },
 {
 "metric_name": "Engagement percentile",
 "comparison_group": "You",
 "metric_value": 75,
 "sort_order": 3
 },
 {
 "metric_name": "Engagement percentile",
 "comparison_group": "Cohort benchmark",
 "metric_value": 50,
 "sort_order": 3
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T03__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "9e5b358510a04cda204ff245061b74e797b4d4a7d858ef641c2aa0f3ce779260",
 "generator_input_sha256": "63419465a57f79283ceb775514e65535ed0b43fc16e0911fa5bb52df2872e224",
 "generator_input_compact": {
 "task_id": "S-T03",
 "execution_id": "exec_1781847881232_997b11bc",
 "task_name": "Peer comparison",
 "analysis_type": "comparison",
 "explanation_strategy": "comparison",
 "actionable_question": "Where do I stand compared to my class?",
 "target_audience": [
 "student"
 ],
 "query_labels": [
 "peer_comparison"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "peer_comparison"
 ],
 "dataset_row_counts": {
 "peer_comparison": 6
 },
 "ai_summary_config_summary": {
 "summary_type": "multi_metric_comparison",
 "metric_column": null,
 "entity_column": null,
 "group_column": "comparison_group",
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
 "raw_text": "Summary: Exact peer-comparison evidence: Average score [You]=exact metric_value=94.34; Average score [Cohort benchmark]=exact metric_value=66.68; Score percentile [You]=exact metric_value=89.8; Score percentile [Cohort benchmark]=exact metric_value=50; Engagement percentile [You]=exact metric_value=75; Engagement percentile [Cohort benchmark]=exact metric_value=50. Deterministic standing: score_percentile=89.8, equivalent to top 10.2%. Engagement standing: engagement_percentile=75, higher than about 75% of peers, equivalent to top 25%.\n\nEducational implications: Percentile direction is deterministic: percentile P means higher than about P% of peers and top (100-P)%.",
 "structured_payload": {
 "task_id": "S-T03",
 "execution_id": "exec_1781847881232_997b11bc",
 "explanation": {
 "summary": "Exact peer-comparison evidence: Average score [You]=exact metric_value=94.34; Average score [Cohort benchmark]=exact metric_value=66.68; Score percentile [You]=exact metric_value=89.8; Score percentile [Cohort benchmark]=exact metric_value=50; Engagement percentile [You]=exact metric_value=75; Engagement percentile [Cohort benchmark]=exact metric_value=50. Deterministic standing: score_percentile=89.8, equivalent to top 10.2%. Engagement standing: engagement_percentile=75, higher than about 75% of peers, equivalent to top 25%.",
 "insights": [],
 "educational_implications": [
 "Percentile direction is deterministic: percentile P means higher than about P% of peers and top (100-P)%."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is complete and provides a clear comparison between your performance and the cohort benchmark.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "multi_metric_comparison",
 "ai_summary_method_warning": null,
 "full_result_row_count": 6,
 "included_row_count": 6,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "peer_comparison",
 "row_count": 6,
 "included_row_count": 6
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 6,
 "baseline_reference_tokens": 207,
 "task_aware_prompt_tokens": 1467,
 "token_ratio": 7.087,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "State the exact student and cohort values for every returned metric, including score percentile and engagement percentile.",
 "Translate the returned score percentile into an explicit standing without hiding the numeric percentile."
 ],
 "must_keep_keys": [
 "comparison_matrix",
 "dataset_name",
 "entities",
 "entity_column",
 "metric_extrema",
 "metrics",
 "missing_entity_evidence",
 "missing_expected_entities",
 "missing_metric_evidence",
 "pairwise_direction_evidence",
 "pairwise_gaps",
 "row_count",
 "selected_entity_evidence",
 "standing_evidence",
 "summarization_warnings",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (7.087 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "S-T03",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "State the exact student and cohort values for every returned metric, including score percentile and engagement percentile.",
 "Translate the returned score percentile into an explicit standing without hiding the numeric percentile."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "peer_comparison",
 "row_count": 6,
 "entities": [
 "You",
 "Cohort benchmark"
 ],
 "entity_column": "comparison_group",
 "metrics": [
 {
 "metric": "Average score",
 "unit": "score_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Score percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Engagement percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 }
 ],
 "metric_keys": [
 "Average score",
 "Score percentile",
 "Engagement percentile"
 ],
 "metric_key_column": "metric_name",
 "metric_value_column": "metric_value",
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [
 "You",
 "Cohort benchmark"
 ],
 "observed_entity_count": 2,
 "missing_expected_entities": []
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "comparison_matrix": [
 {
 "comparison_group": "You",
 "metrics": {
 "Average score": 94.34,
 "Score percentile": 89.8,
 "Engagement percentile": 75
 },
 "labels": {
 "sort_order": 3
 }
 },
 {
 "comparison_group": "Cohort benchmark",
 "metrics": {
 "Average score": 66.68,
 "Score percentile": 50,
 "Engagement percentile": 50
 },
 "labels": {
 "sort_order": 3
 }
 }
 ],
 "selected_entity_evidence": [],
 "standing_evidence": {
 "score_percentile": 89.8,
 "percent_at_or_below": 89.8,
 "percent_above": 10.2,
 "engagement_percentile": 75,
 "engagement_percent_above": 25,
 "wording_guard": "Preserve the percentile and avoid reversing rank direction."
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": -27.66,
 "absolute_gap": 27.66
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": -39.8,
 "absolute_gap": 39.8
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": -25,
 "absolute_gap": 25
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "You",
 "lower_entity": "Cohort benchmark",
 "difference": 27.66,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "You",
 "lower_entity": "Cohort benchmark",
 "difference": 39.8,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "You",
 "lower_entity": "Cohort benchmark",
 "difference": 25,
 "direction_note": "left_entity is higher"
 }
 ],
 "metric_extrema": {
 "Average score": {
 "min": {
 "comparison_group": "Cohort benchmark",
 "value": 66.68
 },
 "max": {
 "comparison_group": "You",
 "value": 94.34
 }
 },
 "Score percentile": {
 "min": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 },
 "max": {
 "comparison_group": "You",
 "value": 89.8
 }
 },
 "Engagement percentile": {
 "min": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 },
 "max": {
 "comparison_group": "You",
 "value": 75
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_metric_evidence": [],
 "missing_entity_evidence": [],
 "missing_expected_entities": [],
 "validation_metadata": {
 "status": "passed",
 "required": {
 "metric_units": true,
 "metric_directions": true,
 "metric_thresholds": false,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "Average score": "score_0_100",
 "Score percentile": "percent_0_100",
 "Engagement percentile": "percent_0_100"
 },
 "metric_directions": {
 "Average score": "higher_is_better",
 "Score percentile": "higher_is_better",
 "Engagement percentile": "higher_is_better"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "multi_metric_comparison",
 "dataset_name": "peer_comparison",
 "row_count": 6,
 "entity_column": "comparison_group",
 "metric_key_column": "metric_name",
 "metric_value_column": "metric_value",
 "entities": [
 "You",
 "Cohort benchmark"
 ],
 "metrics": [
 {
 "metric": "Average score",
 "unit": "score_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Score percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Engagement percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 }
 ],
 "metric_keys": [
 "Average score",
 "Score percentile",
 "Engagement percentile"
 ],
 "comparison_matrix": [
 {
 "comparison_group": "You",
 "metrics": {
 "Average score": 94.34,
 "Score percentile": 89.8,
 "Engagement percentile": 75
 },
 "labels": {
 "sort_order": 3
 }
 },
 {
 "comparison_group": "Cohort benchmark",
 "metrics": {
 "Average score": 66.68,
 "Score percentile": 50,
 "Engagement percentile": 50
 },
 "labels": {
 "sort_order": 3
 }
 }
 ],
 "metric_extrema": {
 "Average score": {
 "min": {
 "comparison_group": "Cohort benchmark",
 "value": 66.68
 },
 "max": {
 "comparison_group": "You",
 "value": 94.34
 }
 },
 "Score percentile": {
 "min": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 },
 "max": {
 "comparison_group": "You",
 "value": 89.8
 }
 },
 "Engagement percentile": {
 "min": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 },
 "max": {
 "comparison_group": "You",
 "value": 75
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": -27.66,
 "absolute_gap": 27.66
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": -39.8,
 "absolute_gap": 39.8
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": -25,
 "absolute_gap": 25
 }
 ],
 "missing_metric_evidence": [],
 "missing_entity_evidence": [],
 "missing_expected_entities": [],
 "selected_entity_evidence": [],
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [
 "You",
 "Cohort benchmark"
 ],
 "observed_entity_count": 2,
 "missing_expected_entities": []
 },
 "validation_metadata": {
 "status": "passed",
 "required": {
 "metric_units": true,
 "metric_directions": true,
 "metric_thresholds": false,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "Average score": "score_0_100",
 "Score percentile": "percent_0_100",
 "Engagement percentile": "percent_0_100"
 },
 "metric_directions": {
 "Average score": "higher_is_better",
 "Score percentile": "higher_is_better",
 "Engagement percentile": "higher_is_better"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [],
 "pairwise_direction_evidence": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "You",
 "lower_entity": "Cohort benchmark",
 "difference": 27.66,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "You",
 "lower_entity": "Cohort benchmark",
 "difference": 39.8,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "You",
 "lower_entity": "Cohort benchmark",
 "difference": 25,
 "direction_note": "left_entity is higher"
 }
 ],
 "standing_evidence": {
 "score_percentile": 89.8,
 "percent_at_or_below": 89.8,
 "percent_above": 10.2,
 "engagement_percentile": 75,
 "engagement_percent_above": 25,
 "wording_guard": "Preserve the percentile and avoid reversing rank direction."
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 7478,
 "token_usage": {
 "prompt_tokens": 1886,
 "completion_tokens": 535,
 "total_tokens": 2421
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000604
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__S-T03__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "9e5b358510a04cda204ff245061b74e797b4d4a7d858ef641c2aa0f3ce779260",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 1886,
 "completion_tokens": 535,
 "total_tokens": 2421
 },
 "latency_ms": 7512,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "S-T03",
 "execution_id": "exec_1781847881232_997b11bc",
 "explanation": {
 "summary": "Exact peer-comparison evidence: Average score [You]=exact metric_value=94.34; Average score [Cohort benchmark]=exact metric_value=66.68; Score percentile [You]=exact metric_value=89.8; Score percentile [Cohort benchmark]=exact metric_value=50; Engagement percentile [You]=exact metric_value=75; Engagement percentile [Cohort benchmark]=exact metric_value=50. Deterministic standing: score_percentile=89.8, equivalent to top 10.2%. Engagement standing: engagement_percentile=75, higher than about 75% of peers, equivalent to top 25%.",
 "insights": [],
 "educational_implications": [
 "Percentile direction is deterministic: percentile P means higher than about P% of peers and top (100-P)%."
 ],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data is complete and provides a clear comparison between your performance and the cohort benchmark.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "comparison",
 "explanation_type": "comparison",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "multi_metric_comparison",
 "ai_summary_method_warning": null,
 "full_result_row_count": 6,
 "included_row_count": 6,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "peer_comparison",
 "row_count": 6,
 "included_row_count": 6
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 6,
 "baseline_reference_tokens": 207,
 "task_aware_prompt_tokens": 1467,
 "token_ratio": 7.087,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "comparison",
 "limitations"
 ],
 "evidence_sections_omitted": [],
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "State the exact student and cohort values for every returned metric, including score percentile and engagement percentile.",
 "Translate the returned score percentile into an explicit standing without hiding the numeric percentile."
 ],
 "must_keep_keys": [
 "comparison_matrix",
 "dataset_name",
 "entities",
 "entity_column",
 "metric_extrema",
 "metrics",
 "missing_entity_evidence",
 "missing_expected_entities",
 "missing_metric_evidence",
 "pairwise_direction_evidence",
 "pairwise_gaps",
 "row_count",
 "selected_entity_evidence",
 "standing_evidence",
 "summarization_warnings",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (7.087 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "S-T03",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing.",
 "State the exact student and cohort values for every returned metric, including score percentile and engagement percentile.",
 "Translate the returned score percentile into an explicit standing without hiding the numeric percentile."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "peer_comparison",
 "row_count": 6,
 "entities": [
 "You",
 "Cohort benchmark"
 ],
 "entity_column": "comparison_group",
 "metrics": [
 {
 "metric": "Average score",
 "unit": "score_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Score percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Engagement percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 }
 ],
 "metric_keys": [
 "Average score",
 "Score percentile",
 "Engagement percentile"
 ],
 "metric_key_column": "metric_name",
 "metric_value_column": "metric_value",
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [
 "You",
 "Cohort benchmark"
 ],
 "observed_entity_count": 2,
 "missing_expected_entities": []
 }
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "comparison_matrix": [
 {
 "comparison_group": "You",
 "metrics": {
 "Average score": 94.34,
 "Score percentile": 89.8,
 "Engagement percentile": 75
 },
 "labels": {
 "sort_order": 3
 }
 },
 {
 "comparison_group": "Cohort benchmark",
 "metrics": {
 "Average score": 66.68,
 "Score percentile": 50,
 "Engagement percentile": 50
 },
 "labels": {
 "sort_order": 3
 }
 }
 ],
 "selected_entity_evidence": [],
 "standing_evidence": {
 "score_percentile": 89.8,
 "percent_at_or_below": 89.8,
 "percent_above": 10.2,
 "engagement_percentile": 75,
 "engagement_percent_above": 25,
 "wording_guard": "Preserve the percentile and avoid reversing rank direction."
 }
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": -27.66,
 "absolute_gap": 27.66
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": -39.8,
 "absolute_gap": 39.8
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": -25,
 "absolute_gap": 25
 }
 ],
 "pairwise_direction_evidence": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "You",
 "lower_entity": "Cohort benchmark",
 "difference": 27.66,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "You",
 "lower_entity": "Cohort benchmark",
 "difference": 39.8,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "You",
 "lower_entity": "Cohort benchmark",
 "difference": 25,
 "direction_note": "left_entity is higher"
 }
 ],
 "metric_extrema": {
 "Average score": {
 "min": {
 "comparison_group": "Cohort benchmark",
 "value": 66.68
 },
 "max": {
 "comparison_group": "You",
 "value": 94.34
 }
 },
 "Score percentile": {
 "min": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 },
 "max": {
 "comparison_group": "You",
 "value": 89.8
 }
 },
 "Engagement percentile": {
 "min": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 },
 "max": {
 "comparison_group": "You",
 "value": 75
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_metric_evidence": [],
 "missing_entity_evidence": [],
 "missing_expected_entities": [],
 "validation_metadata": {
 "status": "passed",
 "required": {
 "metric_units": true,
 "metric_directions": true,
 "metric_thresholds": false,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "Average score": "score_0_100",
 "Score percentile": "percent_0_100",
 "Engagement percentile": "percent_0_100"
 },
 "metric_directions": {
 "Average score": "higher_is_better",
 "Score percentile": "higher_is_better",
 "Engagement percentile": "higher_is_better"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "multi_metric_comparison",
 "dataset_name": "peer_comparison",
 "row_count": 6,
 "entity_column": "comparison_group",
 "metric_key_column": "metric_name",
 "metric_value_column": "metric_value",
 "entities": [
 "You",
 "Cohort benchmark"
 ],
 "metrics": [
 {
 "metric": "Average score",
 "unit": "score_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Score percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 },
 {
 "metric": "Engagement percentile",
 "unit": "percent_0_100",
 "direction": "higher_is_better",
 "threshold": null
 }
 ],
 "metric_keys": [
 "Average score",
 "Score percentile",
 "Engagement percentile"
 ],
 "comparison_matrix": [
 {
 "comparison_group": "You",
 "metrics": {
 "Average score": 94.34,
 "Score percentile": 89.8,
 "Engagement percentile": 75
 },
 "labels": {
 "sort_order": 3
 }
 },
 {
 "comparison_group": "Cohort benchmark",
 "metrics": {
 "Average score": 66.68,
 "Score percentile": 50,
 "Engagement percentile": 50
 },
 "labels": {
 "sort_order": 3
 }
 }
 ],
 "metric_extrema": {
 "Average score": {
 "min": {
 "comparison_group": "Cohort benchmark",
 "value": 66.68
 },
 "max": {
 "comparison_group": "You",
 "value": 94.34
 }
 },
 "Score percentile": {
 "min": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 },
 "max": {
 "comparison_group": "You",
 "value": 89.8
 }
 },
 "Engagement percentile": {
 "min": {
 "comparison_group": "Cohort benchmark",
 "value": 50
 },
 "max": {
 "comparison_group": "You",
 "value": 75
 }
 }
 },
 "pairwise_gaps": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": -27.66,
 "absolute_gap": 27.66
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": -39.8,
 "absolute_gap": 39.8
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "gap_right_minus_left": -25,
 "absolute_gap": 25
 }
 ],
 "missing_metric_evidence": [],
 "missing_entity_evidence": [],
 "missing_expected_entities": [],
 "selected_entity_evidence": [],
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [
 "You",
 "Cohort benchmark"
 ],
 "observed_entity_count": 2,
 "missing_expected_entities": []
 },
 "validation_metadata": {
 "status": "passed",
 "required": {
 "metric_units": true,
 "metric_directions": true,
 "metric_thresholds": false,
 "sensitive_context_policy": false
 },
 "metric_units": {
 "Average score": "score_0_100",
 "Score percentile": "percent_0_100",
 "Engagement percentile": "percent_0_100"
 },
 "metric_directions": {
 "Average score": "higher_is_better",
 "Score percentile": "higher_is_better",
 "Engagement percentile": "higher_is_better"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": [],
 "pairwise_direction_evidence": [
 {
 "metric": "Average score",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "You",
 "lower_entity": "Cohort benchmark",
 "difference": 27.66,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "Score percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "You",
 "lower_entity": "Cohort benchmark",
 "difference": 39.8,
 "direction_note": "left_entity is higher"
 },
 {
 "metric": "Engagement percentile",
 "left_entity": "You",
 "right_entity": "Cohort benchmark",
 "higher_entity": "You",
 "lower_entity": "Cohort benchmark",
 "difference": 25,
 "direction_note": "left_entity is higher"
 }
 ],
 "standing_evidence": {
 "score_percentile": 89.8,
 "percent_at_or_below": 89.8,
 "percent_above": 10.2,
 "engagement_percentile": 75,
 "engagement_percent_above": 25,
 "wording_guard": "Preserve the percentile and avoid reversing rank direction."
 }
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 7478,
 "token_usage": {
 "prompt_tokens": 1886,
 "completion_tokens": 535,
 "total_tokens": 2421
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000604
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
 "expected": 6,
 "observed": 6
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "fe610876e89ca66eba912e2edc06e235347cbdec54f8c8c0f344e278d45741b0",
 "expected_values": [
 "fe610876e89ca66eba912e2edc06e235347cbdec54f8c8c0f344e278d45741b0"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "258ba6c73463a11719ee33bb99ee61829cd66432c386f97717cdff3b64fa6b62",
 "expected": "258ba6c73463a11719ee33bb99ee61829cd66432c386f97717cdff3b64fa6b62"
 },
 {
 "check_id": "numeric_fields_peer_comparison",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "peer_comparison",
 "numeric_columns": [
 "metric_value",
 "sort_order"
 ],
 "numeric_summaries": {
 "metric_value": {
 "count": 6,
 "min": 50,
 "max": 94.34
 },
 "sort_order": {
 "count": 6,
 "min": 1,
 "max": 3
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_peer_comparison",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "peer_comparison",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```

