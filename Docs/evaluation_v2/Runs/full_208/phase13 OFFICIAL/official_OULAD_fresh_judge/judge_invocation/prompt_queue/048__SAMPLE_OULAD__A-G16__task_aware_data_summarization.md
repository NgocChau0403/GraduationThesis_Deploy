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

# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G16__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-G16__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G16",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Admin action recommendation",
 "scope": "Many students",
 "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
 "target_audience": "admin",
 "ai_summary_type": "action_synthesis",
 "ai_prompt_hint": "Synthesise all cohort [FE] signals into 3–5 admin actions. This is the most critical AI synthesis task for admin role.",
 "query_labels": [
 "synthesis_data"
 ],
 "explanation_strategy": "risk"
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
 "[AI_SYNTHESIS] low_engagement_count",
 "high_risk_count",
 "hardest_assessment",
 "best_resource_type",
 "total_students"
 ],
 "output_schema": {},
 "query_labels": [
 "synthesis_data"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-G16-CORE-01",
 "description": "Explain the supported cohort-level admin actions already generated or exposed by the action_synthesis rule contract; do not require invented actions outside the returned or triggered action set."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-G16-CONSTRAINT-01",
 "description": "Every explained or recommended action must be grounded in returned cohort feature-engineered signals or the supplied action-rule contract."
 },
 {
 "constraint_id": "A-G16-CONSTRAINT-02",
 "description": "Do not invent urgency, priority, or additional actions without supporting returned data or supported action evidence."
 },
 {
 "constraint_id": "A-G16-CONSTRAINT-03",
 "description": "If no supported cohort-level action is returned or triggered, saying no supported action is available is acceptable; penalize that only when deterministic action evidence shows at least one supported action exists."
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
 "dataset_label": "synthesis_data",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G16.json",
 "artifact_sha256": "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224",
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
 "evidence_artifact_file_sha256": "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224",
 "evidence_rows_sha256": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
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
 "embedded_datasets_sha256": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
 "datasets": {
 "synthesis_data": [
 {
 "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "low_engagement_count": 1240,
 "high_risk_count": 906,
 "hardest_assessment": "24299",
 "best_resource_type": "quiz",
 "total_students": 1998
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G16__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "92ee895be7633c9055eee5409f82d7fdcd4ca7ed0d662d5bd45ce9897bcecec1",
 "generator_input_sha256": "3ebc1dd17a178f829f5bf5e74250a920ee55d97b5cbcf78343227aa12be4154f",
 "generator_input_compact": {
 "task_id": "A-G16",
 "execution_id": "exec_1781847803029_391203b0",
 "task_name": "Admin action recommendation",
 "analysis_type": "synthesis",
 "explanation_strategy": "risk",
 "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
 "target_audience": [
 "admin"
 ],
 "query_labels": [
 "synthesis_data"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "synthesis_data"
 ],
 "dataset_row_counts": {
 "synthesis_data": 1
 },
 "ai_summary_config_summary": {
 "summary_type": "action_synthesis",
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
 "raw_text": "Summary: The prioritized actions focus on addressing low engagement and high-risk student populations through targeted outreach and support reviews. These actions are grounded in evidence indicating significant rates of low engagement and high-risk students. Triggered supported action provenance: rule_id=A-G16-R02; action_id=admin_launch_engagement_outreach; owner=student_support_team; priority=high; time_horizon_days=7; evidence_item_ids=['ev-derived-low_engagement_rate']; action=Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up. | rule_id=A-G16-R01; action_id=admin_review_high_risk_caseload; owner=academic_admin; priority=high; time_horizon_days=7; evidence_item_ids=['ev-derived-high_risk_rate']; action=Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support. | rule_id=A-G16-R03; action_id=admin_review_assessment_support; owner=module_lead; priority=medium; time_horizon_days=14; evidence_item_ids=['ev-synthesis_data-0-hardest_assessment']; action=Ask the module team to review learner support and preparation materials for the identified assessment. | rule_id=A-G16-R04; action_id=admin_review_most_used_resource_format; owner=learning_design_team; priority=low; time_horizon_days=14; evidence_item_ids=['ev-synthesis_data-0-best_resource_type']; action=Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability..\n\nInsights: Low Engagement Rate: The low engagement rate is calculated at approximately 62.06%, indicating a substantial portion of students may not be actively participating in their courses. | High-Risk Student Rate: The high-risk student rate stands at about 45.35%, suggesting a significant number of students may require additional support to succeed.",
 "structured_payload": {
 "task_id": "A-G16",
 "execution_id": "exec_1781847803029_391203b0",
 "explanation": {
 "summary": "The prioritized actions focus on addressing low engagement and high-risk student populations through targeted outreach and support reviews. These actions are grounded in evidence indicating significant rates of low engagement and high-risk students. Triggered supported action provenance: rule_id=A-G16-R02; action_id=admin_launch_engagement_outreach; owner=student_support_team; priority=high; time_horizon_days=7; evidence_item_ids=['ev-derived-low_engagement_rate']; action=Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up. | rule_id=A-G16-R01; action_id=admin_review_high_risk_caseload; owner=academic_admin; priority=high; time_horizon_days=7; evidence_item_ids=['ev-derived-high_risk_rate']; action=Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support. | rule_id=A-G16-R03; action_id=admin_review_assessment_support; owner=module_lead; priority=medium; time_horizon_days=14; evidence_item_ids=['ev-synthesis_data-0-hardest_assessment']; action=Ask the module team to review learner support and preparation materials for the identified assessment. | rule_id=A-G16-R04; action_id=admin_review_most_used_resource_format; owner=learning_design_team; priority=low; time_horizon_days=14; evidence_item_ids=['ev-synthesis_data-0-best_resource_type']; action=Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability..",
 "insights": [
 {
 "title": "Low Engagement Rate",
 "description": "The low engagement rate is calculated at approximately 62.06%, indicating a substantial portion of students may not be actively participating in their courses.",
 "severity": "high",
 "evidence": [
 {
 "metric": "low_engagement_rate",
 "value": 0.6206206206,
 "comparison": "baseline",
 "delta": null,
 "context": "Derived from low engagement count and total students."
 }
 ]
 },
 {
 "title": "High-Risk Student Rate",
 "description": "The high-risk student rate stands at about 45.35%, suggesting a significant number of students may require additional support to succeed.",
 "severity": "high",
 "evidence": [
 {
 "metric": "high_risk_rate",
 "value": 0.4534534535,
 "comparison": "baseline",
 "delta": null,
 "context": "Derived from high risk count and total students."
 }
 ]
 }
 ],
 "educational_implications": [],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The evidence used to support the actions is complete and directly linked to the identified issues.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "risk",
 "explanation_type": "risk",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "action_synthesis",
 "ai_summary_method_warning": null,
 "full_result_row_count": 1,
 "included_row_count": 1,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "synthesis_data",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 63,
 "task_aware_prompt_tokens": 2505,
 "token_ratio": 39.7619,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "comparison.conflicting_evidence"
 ],
 "task_output_contract": [
 "Explain only actions already present in prioritized_actions or supported action-rule evidence.",
 "Do not create duplicate recommendations; explanation.recommendations may be empty by design.",
 "For every explained action, connect it to rule_evaluations, action_evidence_links, evidence_items, owner, priority, and time horizon when supplied.",
 "If no supported action exists, say that only when missing_evidence/unsupported_actions/rule output supports it.",
 "Explain every triggered prioritized action with rule ID, action ID, owner, priority, time horizon, and linked evidence; recommendations must remain empty."
 ],
 "must_keep_keys": [
 "action_evidence_links",
 "action_rule_set_id",
 "action_rule_version",
 "evidence_items",
 "missing_evidence",
 "prioritized_actions",
 "rule_evaluations",
 "source_datasets",
 "summarization_warnings",
 "unsupported_actions"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (39.7619 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "action_synthesis",
 "task_id": "A-G16",
 "task_output_contract": [
 "Explain only actions already present in prioritized_actions or supported action-rule evidence.",
 "Do not create duplicate recommendations; explanation.recommendations may be empty by design.",
 "For every explained action, connect it to rule_evaluations, action_evidence_links, evidence_items, owner, priority, and time horizon when supplied.",
 "If no supported action exists, say that only when missing_evidence/unsupported_actions/rule output supports it.",
 "Explain every triggered prioritized action with rule ID, action ID, owner, priority, time horizon, and linked evidence; recommendations must remain empty."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "source_datasets": [
 {
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_count": 1,
 "available": true
 }
 ],
 "action_rule_set_id": "A-G16.action_synthesis",
 "action_rule_version": "1.0.0"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "evidence_items": [
 {
 "evidence_item_id": "ev-synthesis_data-0-class_id",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "class_id",
 "raw_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "parsed_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "unit": "identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-low_engagement_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "low_engagement_count",
 "raw_value": 1240,
 "parsed_value": 1240,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-high_risk_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "high_risk_count",
 "raw_value": 906,
 "parsed_value": 906,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-hardest_assessment",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "hardest_assessment",
 "raw_value": "24299",
 "parsed_value": 24299,
 "unit": "assessment_identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-best_resource_type",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "best_resource_type",
 "raw_value": "quiz",
 "parsed_value": "quiz",
 "unit": "resource_type",
 "available": true,
 "sensitive": false,
 "semantic_alias": "most_used_resource_type"
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-total_students",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "total_students",
 "raw_value": 1998,
 "parsed_value": 1998,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-derived-low_engagement_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "low_engagement_rate",
 "raw_value": null,
 "parsed_value": 0.6206206206,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "low_engagement_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-low_engagement_count",
 "ev-synthesis_data-0-total_students"
 ]
 },
 {
 "evidence_item_id": "ev-derived-high_risk_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "high_risk_rate",
 "raw_value": null,
 "parsed_value": 0.4534534535,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "high_risk_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-high_risk_count",
 "ev-synthesis_data-0-total_students"
 ]
 }
 ],
 "rule_evaluations": [
 {
 "rule_id": "A-G16-R01",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "high_risk_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R02",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "low_engagement_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R03",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "hardest_assessment",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R04",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "best_resource_type",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 }
 ]
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "prioritized_actions": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "action_text": "Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up.",
 "priority": "high",
 "owner": "student_support_team",
 "time_horizon_days": 7,
 "support_category": "engagement_support",
 "claim_limits": [
 "Do not claim low engagement caused low performance.",
 "Do not infer a specific barrier from the aggregate signal."
 ],
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "action_text": "Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support.",
 "priority": "high",
 "owner": "academic_admin",
 "time_horizon_days": 7,
 "support_category": "risk_coordination",
 "claim_limits": [
 "Do not infer causes from the aggregate count.",
 "Do not identify individual students unless a separate student-level evidence source is available."
 ],
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "action_text": "Ask the module team to review learner support and preparation materials for the identified assessment.",
 "priority": "medium",
 "owner": "module_lead",
 "time_horizon_days": 14,
 "support_category": "assessment_support",
 "claim_limits": [
 "Do not state a fail-rate value because the runtime row does not expose it.",
 "Do not claim the assessment itself caused failure."
 ],
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "action_text": "Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability.",
 "priority": "low",
 "owner": "learning_design_team",
 "time_horizon_days": 14,
 "support_category": "resource_planning",
 "claim_limits": [
 "Refer to this field as most-used, not best-performing.",
 "Do not claim engagement clicks demonstrate learning effectiveness."
 ],
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ],
 "action_evidence_links": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ]
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_evidence": [],
 "unsupported_actions": [],
 "summarization_warnings": [
 "The LLM may paraphrase prioritized_actions but must not invent new actions or rules."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "action_synthesis",
 "action_rule_set_id": "A-G16.action_synthesis",
 "action_rule_version": "1.0.0",
 "source_datasets": [
 {
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_count": 1,
 "available": true
 }
 ],
 "evidence_items": [
 {
 "evidence_item_id": "ev-synthesis_data-0-class_id",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "class_id",
 "raw_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "parsed_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "unit": "identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-low_engagement_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "low_engagement_count",
 "raw_value": 1240,
 "parsed_value": 1240,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-high_risk_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "high_risk_count",
 "raw_value": 906,
 "parsed_value": 906,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-hardest_assessment",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "hardest_assessment",
 "raw_value": "24299",
 "parsed_value": 24299,
 "unit": "assessment_identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-best_resource_type",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "best_resource_type",
 "raw_value": "quiz",
 "parsed_value": "quiz",
 "unit": "resource_type",
 "available": true,
 "sensitive": false,
 "semantic_alias": "most_used_resource_type"
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-total_students",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "total_students",
 "raw_value": 1998,
 "parsed_value": 1998,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-derived-low_engagement_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "low_engagement_rate",
 "raw_value": null,
 "parsed_value": 0.6206206206,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "low_engagement_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-low_engagement_count",
 "ev-synthesis_data-0-total_students"
 ]
 },
 {
 "evidence_item_id": "ev-derived-high_risk_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "high_risk_rate",
 "raw_value": null,
 "parsed_value": 0.4534534535,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "high_risk_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-high_risk_count",
 "ev-synthesis_data-0-total_students"
 ]
 }
 ],
 "prioritized_actions": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "action_text": "Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up.",
 "priority": "high",
 "owner": "student_support_team",
 "time_horizon_days": 7,
 "support_category": "engagement_support",
 "claim_limits": [
 "Do not claim low engagement caused low performance.",
 "Do not infer a specific barrier from the aggregate signal."
 ],
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "action_text": "Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support.",
 "priority": "high",
 "owner": "academic_admin",
 "time_horizon_days": 7,
 "support_category": "risk_coordination",
 "claim_limits": [
 "Do not infer causes from the aggregate count.",
 "Do not identify individual students unless a separate student-level evidence source is available."
 ],
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "action_text": "Ask the module team to review learner support and preparation materials for the identified assessment.",
 "priority": "medium",
 "owner": "module_lead",
 "time_horizon_days": 14,
 "support_category": "assessment_support",
 "claim_limits": [
 "Do not state a fail-rate value because the runtime row does not expose it.",
 "Do not claim the assessment itself caused failure."
 ],
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "action_text": "Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability.",
 "priority": "low",
 "owner": "learning_design_team",
 "time_horizon_days": 14,
 "support_category": "resource_planning",
 "claim_limits": [
 "Refer to this field as most-used, not best-performing.",
 "Do not claim engagement clicks demonstrate learning effectiveness."
 ],
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ],
 "action_evidence_links": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ],
 "unsupported_actions": [],
 "conflicting_evidence": [],
 "missing_evidence": [],
 "rule_evaluations": [
 {
 "rule_id": "A-G16-R01",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "high_risk_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R02",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "low_engagement_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R03",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "hardest_assessment",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R04",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "best_resource_type",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "summarization_warnings": [
 "The LLM may paraphrase prioritized_actions but must not invent new actions or rules."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5325,
 "token_usage": {
 "prompt_tokens": 3569,
 "completion_tokens": 343,
 "total_tokens": 3912
 },
 "strategy": "risk",
 "granularity": "cohort_aggregate",
 "cost_usd": 0.000741
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-G16__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "92ee895be7633c9055eee5409f82d7fdcd4ca7ed0d662d5bd45ce9897bcecec1",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 3569,
 "completion_tokens": 343,
 "total_tokens": 3912
 },
 "latency_ms": 5337,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-G16",
 "execution_id": "exec_1781847803029_391203b0",
 "explanation": {
 "summary": "The prioritized actions focus on addressing low engagement and high-risk student populations through targeted outreach and support reviews. These actions are grounded in evidence indicating significant rates of low engagement and high-risk students. Triggered supported action provenance: rule_id=A-G16-R02; action_id=admin_launch_engagement_outreach; owner=student_support_team; priority=high; time_horizon_days=7; evidence_item_ids=['ev-derived-low_engagement_rate']; action=Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up. | rule_id=A-G16-R01; action_id=admin_review_high_risk_caseload; owner=academic_admin; priority=high; time_horizon_days=7; evidence_item_ids=['ev-derived-high_risk_rate']; action=Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support. | rule_id=A-G16-R03; action_id=admin_review_assessment_support; owner=module_lead; priority=medium; time_horizon_days=14; evidence_item_ids=['ev-synthesis_data-0-hardest_assessment']; action=Ask the module team to review learner support and preparation materials for the identified assessment. | rule_id=A-G16-R04; action_id=admin_review_most_used_resource_format; owner=learning_design_team; priority=low; time_horizon_days=14; evidence_item_ids=['ev-synthesis_data-0-best_resource_type']; action=Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability..",
 "insights": [
 {
 "title": "Low Engagement Rate",
 "description": "The low engagement rate is calculated at approximately 62.06%, indicating a substantial portion of students may not be actively participating in their courses.",
 "severity": "high",
 "evidence": [
 {
 "metric": "low_engagement_rate",
 "value": 0.6206206206,
 "comparison": "baseline",
 "delta": null,
 "context": "Derived from low engagement count and total students."
 }
 ]
 },
 {
 "title": "High-Risk Student Rate",
 "description": "The high-risk student rate stands at about 45.35%, suggesting a significant number of students may require additional support to succeed.",
 "severity": "high",
 "evidence": [
 {
 "metric": "high_risk_rate",
 "value": 0.4534534535,
 "comparison": "baseline",
 "delta": null,
 "context": "Derived from high risk count and total students."
 }
 ]
 }
 ],
 "educational_implications": [],
 "recommendations": [],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The evidence used to support the actions is complete and directly linked to the identified issues.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "risk",
 "explanation_type": "risk",
 "ai_summary_method": "task_aware_data_summarization",
 "ai_summary_version": "v3.1-experimental",
 "baseline_available": true,
 "input_summary_type": "action_synthesis",
 "ai_summary_method_warning": null,
 "full_result_row_count": 1,
 "included_row_count": 1,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "synthesis_data",
 "row_count": 1,
 "included_row_count": 1
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 1,
 "baseline_reference_tokens": 63,
 "task_aware_prompt_tokens": 2505,
 "token_ratio": 39.7619,
 "token_count_method": "utf8_bytes_div_4",
 "evidence_sections_included": [
 "scope",
 "primary_finding",
 "action_evidence",
 "limitations"
 ],
 "evidence_sections_omitted": [
 "comparison.conflicting_evidence"
 ],
 "task_output_contract": [
 "Explain only actions already present in prioritized_actions or supported action-rule evidence.",
 "Do not create duplicate recommendations; explanation.recommendations may be empty by design.",
 "For every explained action, connect it to rule_evaluations, action_evidence_links, evidence_items, owner, priority, and time horizon when supplied.",
 "If no supported action exists, say that only when missing_evidence/unsupported_actions/rule output supports it.",
 "Explain every triggered prioritized action with rule ID, action ID, owner, priority, time horizon, and linked evidence; recommendations must remain empty."
 ],
 "must_keep_keys": [
 "action_evidence_links",
 "action_rule_set_id",
 "action_rule_version",
 "evidence_items",
 "missing_evidence",
 "prioritized_actions",
 "rule_evaluations",
 "source_datasets",
 "summarization_warnings",
 "unsupported_actions"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (39.7619 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "action_synthesis",
 "task_id": "A-G16",
 "task_output_contract": [
 "Explain only actions already present in prioritized_actions or supported action-rule evidence.",
 "Do not create duplicate recommendations; explanation.recommendations may be empty by design.",
 "For every explained action, connect it to rule_evaluations, action_evidence_links, evidence_items, owner, priority, and time horizon when supplied.",
 "If no supported action exists, say that only when missing_evidence/unsupported_actions/rule output supports it.",
 "Explain every triggered prioritized action with rule ID, action ID, owner, priority, time horizon, and linked evidence; recommendations must remain empty."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "source_datasets": [
 {
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_count": 1,
 "available": true
 }
 ],
 "action_rule_set_id": "A-G16.action_synthesis",
 "action_rule_version": "1.0.0"
 }
 },
 {
 "name": "primary_finding",
 "facts": {
 "evidence_items": [
 {
 "evidence_item_id": "ev-synthesis_data-0-class_id",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "class_id",
 "raw_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "parsed_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "unit": "identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-low_engagement_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "low_engagement_count",
 "raw_value": 1240,
 "parsed_value": 1240,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-high_risk_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "high_risk_count",
 "raw_value": 906,
 "parsed_value": 906,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-hardest_assessment",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "hardest_assessment",
 "raw_value": "24299",
 "parsed_value": 24299,
 "unit": "assessment_identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-best_resource_type",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "best_resource_type",
 "raw_value": "quiz",
 "parsed_value": "quiz",
 "unit": "resource_type",
 "available": true,
 "sensitive": false,
 "semantic_alias": "most_used_resource_type"
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-total_students",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "total_students",
 "raw_value": 1998,
 "parsed_value": 1998,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-derived-low_engagement_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "low_engagement_rate",
 "raw_value": null,
 "parsed_value": 0.6206206206,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "low_engagement_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-low_engagement_count",
 "ev-synthesis_data-0-total_students"
 ]
 },
 {
 "evidence_item_id": "ev-derived-high_risk_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "high_risk_rate",
 "raw_value": null,
 "parsed_value": 0.4534534535,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "high_risk_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-high_risk_count",
 "ev-synthesis_data-0-total_students"
 ]
 }
 ],
 "rule_evaluations": [
 {
 "rule_id": "A-G16-R01",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "high_risk_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R02",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "low_engagement_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R03",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "hardest_assessment",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R04",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "best_resource_type",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 }
 ]
 }
 },
 {
 "name": "action_evidence",
 "facts": {
 "prioritized_actions": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "action_text": "Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up.",
 "priority": "high",
 "owner": "student_support_team",
 "time_horizon_days": 7,
 "support_category": "engagement_support",
 "claim_limits": [
 "Do not claim low engagement caused low performance.",
 "Do not infer a specific barrier from the aggregate signal."
 ],
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "action_text": "Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support.",
 "priority": "high",
 "owner": "academic_admin",
 "time_horizon_days": 7,
 "support_category": "risk_coordination",
 "claim_limits": [
 "Do not infer causes from the aggregate count.",
 "Do not identify individual students unless a separate student-level evidence source is available."
 ],
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "action_text": "Ask the module team to review learner support and preparation materials for the identified assessment.",
 "priority": "medium",
 "owner": "module_lead",
 "time_horizon_days": 14,
 "support_category": "assessment_support",
 "claim_limits": [
 "Do not state a fail-rate value because the runtime row does not expose it.",
 "Do not claim the assessment itself caused failure."
 ],
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "action_text": "Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability.",
 "priority": "low",
 "owner": "learning_design_team",
 "time_horizon_days": 14,
 "support_category": "resource_planning",
 "claim_limits": [
 "Refer to this field as most-used, not best-performing.",
 "Do not claim engagement clicks demonstrate learning effectiveness."
 ],
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ],
 "action_evidence_links": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ]
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_evidence": [],
 "unsupported_actions": [],
 "summarization_warnings": [
 "The LLM may paraphrase prioritized_actions but must not invent new actions or rules."
 ]
 }
 }
 ]
 },
 "source_evidence_summary": {
 "summary_type": "action_synthesis",
 "action_rule_set_id": "A-G16.action_synthesis",
 "action_rule_version": "1.0.0",
 "source_datasets": [
 {
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_count": 1,
 "available": true
 }
 ],
 "evidence_items": [
 {
 "evidence_item_id": "ev-synthesis_data-0-class_id",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "class_id",
 "raw_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "parsed_value": "SAMPLE_OULAD_CLASS_CCC_2014J",
 "unit": "identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-low_engagement_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "low_engagement_count",
 "raw_value": 1240,
 "parsed_value": 1240,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-high_risk_count",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "high_risk_count",
 "raw_value": 906,
 "parsed_value": 906,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-hardest_assessment",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "hardest_assessment",
 "raw_value": "24299",
 "parsed_value": 24299,
 "unit": "assessment_identifier",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-best_resource_type",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "best_resource_type",
 "raw_value": "quiz",
 "parsed_value": "quiz",
 "unit": "resource_type",
 "available": true,
 "sensitive": false,
 "semantic_alias": "most_used_resource_type"
 },
 {
 "evidence_item_id": "ev-synthesis_data-0-total_students",
 "task_id": "A-G16",
 "dataset_label": "synthesis_data",
 "dataset_role": "primary_evidence",
 "row_index": 0,
 "column": "total_students",
 "raw_value": 1998,
 "parsed_value": 1998,
 "unit": "student_count",
 "available": true,
 "sensitive": false
 },
 {
 "evidence_item_id": "ev-derived-low_engagement_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "low_engagement_rate",
 "raw_value": null,
 "parsed_value": 0.6206206206,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "low_engagement_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-low_engagement_count",
 "ev-synthesis_data-0-total_students"
 ]
 },
 {
 "evidence_item_id": "ev-derived-high_risk_rate",
 "task_id": "A-G16",
 "dataset_label": "derived",
 "dataset_role": "derived_evidence",
 "row_index": null,
 "column": "high_risk_rate",
 "raw_value": null,
 "parsed_value": 0.4534534535,
 "unit": "ratio_0_1",
 "available": true,
 "sensitive": false,
 "operation": "safe_divide",
 "source_columns": [
 "high_risk_count",
 "total_students"
 ],
 "source_evidence_item_ids": [
 "ev-synthesis_data-0-high_risk_count",
 "ev-synthesis_data-0-total_students"
 ]
 }
 ],
 "prioritized_actions": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "action_text": "Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up.",
 "priority": "high",
 "owner": "student_support_team",
 "time_horizon_days": 7,
 "support_category": "engagement_support",
 "claim_limits": [
 "Do not claim low engagement caused low performance.",
 "Do not infer a specific barrier from the aggregate signal."
 ],
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "action_text": "Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support.",
 "priority": "high",
 "owner": "academic_admin",
 "time_horizon_days": 7,
 "support_category": "risk_coordination",
 "claim_limits": [
 "Do not infer causes from the aggregate count.",
 "Do not identify individual students unless a separate student-level evidence source is available."
 ],
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "action_text": "Ask the module team to review learner support and preparation materials for the identified assessment.",
 "priority": "medium",
 "owner": "module_lead",
 "time_horizon_days": 14,
 "support_category": "assessment_support",
 "claim_limits": [
 "Do not state a fail-rate value because the runtime row does not expose it.",
 "Do not claim the assessment itself caused failure."
 ],
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "action_text": "Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability.",
 "priority": "low",
 "owner": "learning_design_team",
 "time_horizon_days": 14,
 "support_category": "resource_planning",
 "claim_limits": [
 "Refer to this field as most-used, not best-performing.",
 "Do not claim engagement clicks demonstrate learning effectiveness."
 ],
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ],
 "action_evidence_links": [
 {
 "action_id": "admin_launch_engagement_outreach",
 "rule_id": "A-G16-R02",
 "rule_ids": [
 "A-G16-R02"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_high_risk_caseload",
 "rule_id": "A-G16-R01",
 "rule_ids": [
 "A-G16-R01"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_assessment_support",
 "rule_id": "A-G16-R03",
 "rule_ids": [
 "A-G16-R03"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "provenance_status": "complete"
 },
 {
 "action_id": "admin_review_most_used_resource_format",
 "rule_id": "A-G16-R04",
 "rule_ids": [
 "A-G16-R04"
 ],
 "rule_version": "1.0.0",
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "provenance_status": "complete"
 }
 ],
 "unsupported_actions": [],
 "conflicting_evidence": [],
 "missing_evidence": [],
 "rule_evaluations": [
 {
 "rule_id": "A-G16-R01",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "high_risk_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-high_risk_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R02",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "low_engagement_rate",
 "operator": "gte",
 "matched": true,
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-derived-low_engagement_rate"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R03",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "hardest_assessment",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-hardest_assessment"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 },
 {
 "rule_id": "A-G16-R04",
 "rule_version": "1.0.0",
 "matched": true,
 "condition_results": {
 "all": [
 {
 "evidence_id": "best_resource_type",
 "operator": "is_present",
 "matched": true,
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "any": []
 },
 "evidence_item_ids": [
 "ev-synthesis_data-0-best_resource_type"
 ],
 "missing_evidence": [],
 "blocked_by_unavailable_evidence": false
 }
 ],
 "summarization_warnings": [
 "The LLM may paraphrase prioritized_actions but must not invent new actions or rules."
 ]
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 5325,
 "token_usage": {
 "prompt_tokens": 3569,
 "completion_tokens": 343,
 "total_tokens": 3912
 },
 "strategy": "risk",
 "granularity": "cohort_aggregate",
 "cost_usd": 0.000741
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
 "observed": "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224",
 "expected_values": [
 "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
 "expected": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013"
 },
 {
 "check_id": "numeric_fields_synthesis_data",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "synthesis_data",
 "numeric_columns": [
 "high_risk_count",
 "low_engagement_count",
 "total_students"
 ],
 "numeric_summaries": {
 "high_risk_count": {
 "count": 1,
 "min": 906,
 "max": 906
 },
 "low_engagement_count": {
 "count": 1,
 "min": 1240,
 "max": 1240
 },
 "total_students": {
 "count": 1,
 "min": 1998,
 "max": 1998
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_synthesis_data",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "synthesis_data",
 "flag_columns": [
 "high_risk_count"
 ],
 "triggered_like_counts": {
 "high_risk_count": 0
 }
 }
]
```

