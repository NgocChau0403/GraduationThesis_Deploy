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

# LLM Judge Final Judge Context - SAMPLE_OULAD__A-C06__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-C06__task_aware_data_summarization",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-C06",
 "explanation_mode": "task_aware_data_summarization",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Compare resource usage",
 "scope": "2 students",
 "actionable_question": "Is one student using resources more strategically than the other?",
 "target_audience": "instructor",
 "ai_summary_type": "multi_metric_comparison",
 "ai_prompt_hint": "Highlight who is more diversified in resource use. Note if one avoids forums/quizzes.",
 "query_labels": [
 "resource_comparison"
 ],
 "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
 "source_tables": [
 "enrollment",
 "engagement",
 "event [OULAD only]"
 ],
 "key_db_fields": [
 "resource_type",
 "engagement_count; vle_diversity_score [FE cross]",
 "forum_engagement_rate [FE cross]",
 "quiz_engagement_rate [FE cross]"
 ],
 "output_schema": {},
 "query_labels": [
 "resource_comparison"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-C06-CORE-01",
 "description": "Highlight who is more diversified in resource use."
 },
 {
 "requirement_id": "A-C06-CORE-02",
 "description": "Note if one avoids forums/quizzes."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Retained as applicable because it compares two identifiable students; risk is lower than lifestyle/background tasks but not absent."
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
 "dataset_label": "resource_comparison",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C06.json",
 "artifact_sha256": "4e437a4bf0a93b5080d2cf66ff3b46aa17062f7dbcfe5ea43f8c67fcee3d6a6c",
 "row_count": 10,
 "readable": true
 }
 ],
 "evidence_access_mode": "direct_embedding",
 "full_result_row_count": 10,
 "prompt_embedded_row_count": 10,
 "retrieved_row_count": 0,
 "retrieval_log_path": null,
 "full_access_available": true,
 "full_result_sent_to_llm": true,
 "evidence_artifact_file_sha256": "4e437a4bf0a93b5080d2cf66ff3b46aa17062f7dbcfe5ea43f8c67fcee3d6a6c",
 "evidence_rows_sha256": "2cc1c9fd65637a8e736332409cfa269b820c3194d7ff4ddfa154e0a04babae61",
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
 "full_result_row_count": 10,
 "embedded_datasets_sha256": "2cc1c9fd65637a8e736332409cfa269b820c3194d7ff4ddfa154e0a04babae61",
 "datasets": {
 "resource_comparison": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "quiz",
 "clicks": 623,
 "pct_of_total": 0.4940523394131642,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "homepage",
 "clicks": 264,
 "pct_of_total": 0.20935765265662173,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "forumng",
 "clicks": 140,
 "pct_of_total": 0.11102299762093576,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "subpage",
 "clicks": 94,
 "pct_of_total": 0.07454401268834258,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "resource",
 "clicks": 71,
 "pct_of_total": 0.056304520222045996,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "oucontent",
 "clicks": 40,
 "pct_of_total": 0.0317208564631245,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "url",
 "clicks": 27,
 "pct_of_total": 0.02141157811260904,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "oucollaborate",
 "clicks": 1,
 "pct_of_total": 0.0007930214115781126,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "resource_type": "page",
 "clicks": 1,
 "pct_of_total": 0.0007930214115781126,
 "vle_diversity_score": 1,
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "resource_type": null,
 "clicks": 0,
 "pct_of_total": null,
 "vle_diversity_score": 0,
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-C06__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "54e2a613cbd9986f8ac69f3a9e67744dc3d2cd4db4de132b06a86fc857a8ca26",
 "generator_input_sha256": "e413db92aef3d5bdc115bc7d53565406258ce8a6c651f2ee7c205ad5e908d3d6",
 "generator_input_compact": {
 "task_id": "A-C06",
 "execution_id": "exec_1781847669794_e794bcab",
 "task_name": "Compare resource usage",
 "analysis_type": "comparison",
 "explanation_strategy": "comparison",
 "actionable_question": "Is one student using resources more strategically than the other?",
 "target_audience": [
 "instructor"
 ],
 "query_labels": [
 "resource_comparison"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "resource_comparison"
 ],
 "dataset_row_counts": {
 "resource_comparison": 10
 },
 "ai_summary_config_summary": {
 "summary_type": "multi_metric_comparison",
 "metric_column": null,
 "entity_column": "student_id",
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
 "raw_text": "Summary: The analysis reveals a significant disparity in resource usage between the two students, with SAMPLE_OULAD_STU_100788 demonstrating a higher engagement across various resource types compared to SAMPLE_OULAD_STU_101700, who has no recorded resource usage. This indicates a lack of strategic resource utilization by the latter.\n\nInsights: High Engagement in Resource Usage: SAMPLE_OULAD_STU_100788 has recorded a total of 1261 clicks across multiple resource types, indicating a high level of engagement. In contrast, SAMPLE_OULAD_STU_101700 has zero clicks, reflecting no engagement with available resources. | Diversity in Resource Types Used: SAMPLE_OULAD_STU_100788 utilized 9 different resource types, showcasing a diverse approach to resource engagement. In contrast, SAMPLE_OULAD_STU_101700 has no recorded resource types used, indicating a lack of diversity in engagement.\n\nEducational implications: The lack of engagement from SAMPLE_OULAD_STU_101700 suggests a need for targeted interventions to encourage resource utilization.\n\nRecommendations: high - Implement engagement strategies for SAMPLE_OULAD_STU_101700, such as personalized communication or resource usage workshops. - To enhance resource engagement and improve academic performance.",
 "structured_payload": {
 "task_id": "A-C06",
 "execution_id": "exec_1781847669794_e794bcab",
 "explanation": {
 "summary": "The analysis reveals a significant disparity in resource usage between the two students, with SAMPLE_OULAD_STU_100788 demonstrating a higher engagement across various resource types compared to SAMPLE_OULAD_STU_101700, who has no recorded resource usage. This indicates a lack of strategic resource utilization by the latter.",
 "insights": [
 {
 "title": "High Engagement in Resource Usage",
 "description": "SAMPLE_OULAD_STU_100788 has recorded a total of 1261 clicks across multiple resource types, indicating a high level of engagement. In contrast, SAMPLE_OULAD_STU_101700 has zero clicks, reflecting no engagement with available resources.",
 "severity": "high",
 "evidence": [
 {
 "metric": "total_clicks",
 "value": 1261,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_100788"
 },
 {
 "metric": "total_clicks",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_101700"
 }
 ]
 },
 {
 "title": "Diversity in Resource Types Used",
 "description": "SAMPLE_OULAD_STU_100788 utilized 9 different resource types, showcasing a diverse approach to resource engagement. In contrast, SAMPLE_OULAD_STU_101700 has no recorded resource types used, indicating a lack of diversity in engagement.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "used_resource_types",
 "value": 9,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_100788"
 },
 {
 "metric": "used_resource_types",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_101700"
 }
 ]
 }
 ],
 "educational_implications": [
 "The lack of engagement from SAMPLE_OULAD_STU_101700 suggests a need for targeted interventions to encourage resource utilization."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement engagement strategies for SAMPLE_OULAD_STU_101700, such as personalized communication or resource usage workshops.",
 "rationale": "To enhance resource engagement and improve academic performance."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is sufficient, with clear metrics available for comparison.",
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
 "full_result_row_count": 10,
 "included_row_count": 10,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "resource_comparison",
 "row_count": 10,
 "included_row_count": 10
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 10,
 "baseline_reference_tokens": 774,
 "task_aware_prompt_tokens": 2737,
 "token_ratio": 3.5362,
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
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
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
 "summarization_warnings",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.5362 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C06",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "resource_comparison",
 "row_count": 10,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "entity_column": "student_id",
 "metrics": [
 {
 "metric": "clicks",
 "unit": "count",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "pct_of_total",
 "unit": "ratio_0_1",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "vle_diversity_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_more_diverse",
 "threshold": null
 }
 ],
 "metric_keys": [
 "quiz",
 "homepage",
 "forumng",
 "subpage",
 "resource",
 "oucontent",
 "url",
 "oucollaborate",
 "page"
 ],
 "metric_key_column": "resource_type",
 "metric_value_column": null,
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [],
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
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "quiz": {
 "clicks": 623,
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1
 },
 "homepage": {
 "clicks": 264,
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1
 },
 "forumng": {
 "clicks": 140,
 "pct_of_total": 0.111,
 "vle_diversity_score": 1
 },
 "subpage": {
 "clicks": 94,
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1
 },
 "resource": {
 "clicks": 71,
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1
 },
 "oucontent": {
 "clicks": 40,
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1
 },
 "url": {
 "clicks": 27,
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1
 },
 "oucollaborate": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 },
 "page": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 }
 },
 "labels": {
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {},
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
 "selected_entity_evidence": []
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [],
 "metric_extrema": {
 "quiz.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 }
 },
 "quiz.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 }
 },
 "quiz.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "homepage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 }
 },
 "homepage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 }
 },
 "homepage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "forumng.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 }
 },
 "forumng.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 }
 },
 "forumng.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "subpage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 }
 },
 "subpage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 }
 },
 "subpage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "resource.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 }
 },
 "resource.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 }
 },
 "resource.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucontent.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 }
 },
 "oucontent.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 }
 },
 "oucontent.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "url.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 }
 },
 "url.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 }
 },
 "url.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "oucollaborate.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "page.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_metric_evidence": [],
 "missing_entity_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "reason": "entity has no recorded source evidence for metric comparison",
 "evidence_column": "has_engagement_data",
 "evidence_value": false,
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
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
 "clicks": "count",
 "pct_of_total": "ratio_0_1",
 "vle_diversity_score": "ratio_0_1"
 },
 "metric_directions": {
 "clicks": "context_only",
 "pct_of_total": "context_only",
 "vle_diversity_score": "higher_is_more_diverse"
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
 "dataset_name": "resource_comparison",
 "row_count": 10,
 "entity_column": "student_id",
 "metric_key_column": "resource_type",
 "metric_value_column": null,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "metrics": [
 {
 "metric": "clicks",
 "unit": "count",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "pct_of_total",
 "unit": "ratio_0_1",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "vle_diversity_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_more_diverse",
 "threshold": null
 }
 ],
 "metric_keys": [
 "quiz",
 "homepage",
 "forumng",
 "subpage",
 "resource",
 "oucontent",
 "url",
 "oucollaborate",
 "page"
 ],
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "quiz": {
 "clicks": 623,
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1
 },
 "homepage": {
 "clicks": 264,
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1
 },
 "forumng": {
 "clicks": 140,
 "pct_of_total": 0.111,
 "vle_diversity_score": 1
 },
 "subpage": {
 "clicks": 94,
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1
 },
 "resource": {
 "clicks": 71,
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1
 },
 "oucontent": {
 "clicks": 40,
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1
 },
 "url": {
 "clicks": 27,
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1
 },
 "oucollaborate": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 },
 "page": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 }
 },
 "labels": {
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {},
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
 "metric_extrema": {
 "quiz.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 }
 },
 "quiz.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 }
 },
 "quiz.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "homepage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 }
 },
 "homepage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 }
 },
 "homepage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "forumng.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 }
 },
 "forumng.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 }
 },
 "forumng.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "subpage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 }
 },
 "subpage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 }
 },
 "subpage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "resource.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 }
 },
 "resource.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 }
 },
 "resource.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucontent.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 }
 },
 "oucontent.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 }
 },
 "oucontent.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "url.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 }
 },
 "url.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 }
 },
 "url.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "oucollaborate.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "page.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 }
 },
 "pairwise_gaps": [],
 "missing_metric_evidence": [],
 "missing_entity_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "reason": "entity has no recorded source evidence for metric comparison",
 "evidence_column": "has_engagement_data",
 "evidence_value": false,
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
 "missing_expected_entities": [],
 "selected_entity_evidence": [],
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [],
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
 "clicks": "count",
 "pct_of_total": "ratio_0_1",
 "vle_diversity_score": "ratio_0_1"
 },
 "metric_directions": {
 "clicks": "context_only",
 "pct_of_total": "context_only",
 "vle_diversity_score": "higher_is_more_diverse"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8917,
 "token_usage": {
 "prompt_tokens": 3996,
 "completion_tokens": 596,
 "total_tokens": 4592
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000957
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts/SAMPLE_OULAD__A-C06__task_aware_data_summarization.json",
 "explanation_artifact_sha256": "54e2a613cbd9986f8ac69f3a9e67744dc3d2cd4db4de132b06a86fc857a8ca26",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "task_aware_data_summarization",
 "observed_ai_summary_method": "task_aware_data_summarization",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 3996,
 "completion_tokens": 596,
 "total_tokens": 4592
 },
 "latency_ms": 8924,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-C06",
 "execution_id": "exec_1781847669794_e794bcab",
 "explanation": {
 "summary": "The analysis reveals a significant disparity in resource usage between the two students, with SAMPLE_OULAD_STU_100788 demonstrating a higher engagement across various resource types compared to SAMPLE_OULAD_STU_101700, who has no recorded resource usage. This indicates a lack of strategic resource utilization by the latter.",
 "insights": [
 {
 "title": "High Engagement in Resource Usage",
 "description": "SAMPLE_OULAD_STU_100788 has recorded a total of 1261 clicks across multiple resource types, indicating a high level of engagement. In contrast, SAMPLE_OULAD_STU_101700 has zero clicks, reflecting no engagement with available resources.",
 "severity": "high",
 "evidence": [
 {
 "metric": "total_clicks",
 "value": 1261,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_100788"
 },
 {
 "metric": "total_clicks",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_101700"
 }
 ]
 },
 {
 "title": "Diversity in Resource Types Used",
 "description": "SAMPLE_OULAD_STU_100788 utilized 9 different resource types, showcasing a diverse approach to resource engagement. In contrast, SAMPLE_OULAD_STU_101700 has no recorded resource types used, indicating a lack of diversity in engagement.",
 "severity": "medium",
 "evidence": [
 {
 "metric": "used_resource_types",
 "value": 9,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_100788"
 },
 {
 "metric": "used_resource_types",
 "value": 0,
 "comparison": "baseline",
 "delta": null,
 "context": "SAMPLE_OULAD_STU_101700"
 }
 ]
 }
 ],
 "educational_implications": [
 "The lack of engagement from SAMPLE_OULAD_STU_101700 suggests a need for targeted interventions to encourage resource utilization."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement engagement strategies for SAMPLE_OULAD_STU_101700, such as personalized communication or resource usage workshops.",
 "rationale": "To enhance resource engagement and improve academic performance."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The data quality is sufficient, with clear metrics available for comparison.",
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
 "full_result_row_count": 10,
 "included_row_count": 10,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [
 {
 "dataset_name": "resource_comparison",
 "row_count": 10,
 "included_row_count": 10
 }
 ],
 "raw_row_limit": 15,
 "included_raw_row_count": 10,
 "baseline_reference_tokens": 774,
 "task_aware_prompt_tokens": 2737,
 "token_ratio": 3.5362,
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
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
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
 "summarization_warnings",
 "validation_metadata"
 ],
 "v3_warnings": [
 "Task-aware V3 prompt exceeded the configured soft token ratio (3.5362 > 1.2).",
 "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
 ],
 "task_aware_evidence_payload": {
 "evidence_payload": {
 "summary_type": "multi_metric_comparison",
 "task_id": "A-C06",
 "task_output_contract": [
 "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
 "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
 "If expected metric/entity evidence is missing, state the limitation rather than guessing."
 ],
 "sections": [
 {
 "name": "scope",
 "facts": {
 "dataset_name": "resource_comparison",
 "row_count": 10,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "entity_column": "student_id",
 "metrics": [
 {
 "metric": "clicks",
 "unit": "count",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "pct_of_total",
 "unit": "ratio_0_1",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "vle_diversity_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_more_diverse",
 "threshold": null
 }
 ],
 "metric_keys": [
 "quiz",
 "homepage",
 "forumng",
 "subpage",
 "resource",
 "oucontent",
 "url",
 "oucollaborate",
 "page"
 ],
 "metric_key_column": "resource_type",
 "metric_value_column": null,
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [],
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
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "quiz": {
 "clicks": 623,
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1
 },
 "homepage": {
 "clicks": 264,
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1
 },
 "forumng": {
 "clicks": 140,
 "pct_of_total": 0.111,
 "vle_diversity_score": 1
 },
 "subpage": {
 "clicks": 94,
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1
 },
 "resource": {
 "clicks": 71,
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1
 },
 "oucontent": {
 "clicks": 40,
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1
 },
 "url": {
 "clicks": 27,
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1
 },
 "oucollaborate": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 },
 "page": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 }
 },
 "labels": {
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {},
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
 "selected_entity_evidence": []
 }
 },
 {
 "name": "comparison",
 "facts": {
 "pairwise_gaps": [],
 "metric_extrema": {
 "quiz.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 }
 },
 "quiz.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 }
 },
 "quiz.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "homepage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 }
 },
 "homepage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 }
 },
 "homepage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "forumng.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 }
 },
 "forumng.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 }
 },
 "forumng.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "subpage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 }
 },
 "subpage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 }
 },
 "subpage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "resource.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 }
 },
 "resource.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 }
 },
 "resource.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucontent.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 }
 },
 "oucontent.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 }
 },
 "oucontent.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "url.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 }
 },
 "url.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 }
 },
 "url.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "oucollaborate.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "page.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 }
 }
 }
 },
 {
 "name": "limitations",
 "facts": {
 "missing_metric_evidence": [],
 "missing_entity_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "reason": "entity has no recorded source evidence for metric comparison",
 "evidence_column": "has_engagement_data",
 "evidence_value": false,
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
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
 "clicks": "count",
 "pct_of_total": "ratio_0_1",
 "vle_diversity_score": "ratio_0_1"
 },
 "metric_directions": {
 "clicks": "context_only",
 "pct_of_total": "context_only",
 "vle_diversity_score": "higher_is_more_diverse"
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
 "dataset_name": "resource_comparison",
 "row_count": 10,
 "entity_column": "student_id",
 "metric_key_column": "resource_type",
 "metric_value_column": null,
 "entities": [
 "SAMPLE_OULAD_STU_100788",
 "SAMPLE_OULAD_STU_101700"
 ],
 "metrics": [
 {
 "metric": "clicks",
 "unit": "count",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "pct_of_total",
 "unit": "ratio_0_1",
 "direction": "context_only",
 "threshold": null
 },
 {
 "metric": "vle_diversity_score",
 "unit": "ratio_0_1",
 "direction": "higher_is_more_diverse",
 "threshold": null
 }
 ],
 "metric_keys": [
 "quiz",
 "homepage",
 "forumng",
 "subpage",
 "resource",
 "oucontent",
 "url",
 "oucollaborate",
 "page"
 ],
 "comparison_matrix": [
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "metrics": {
 "quiz": {
 "clicks": 623,
 "pct_of_total": 0.4941,
 "vle_diversity_score": 1
 },
 "homepage": {
 "clicks": 264,
 "pct_of_total": 0.2094,
 "vle_diversity_score": 1
 },
 "forumng": {
 "clicks": 140,
 "pct_of_total": 0.111,
 "vle_diversity_score": 1
 },
 "subpage": {
 "clicks": 94,
 "pct_of_total": 0.0745,
 "vle_diversity_score": 1
 },
 "resource": {
 "clicks": 71,
 "pct_of_total": 0.0563,
 "vle_diversity_score": 1
 },
 "oucontent": {
 "clicks": 40,
 "pct_of_total": 0.0317,
 "vle_diversity_score": 1
 },
 "url": {
 "clicks": 27,
 "pct_of_total": 0.0214,
 "vle_diversity_score": 1
 },
 "oucollaborate": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 },
 "page": {
 "clicks": 1,
 "pct_of_total": 0.0008,
 "vle_diversity_score": 1
 }
 },
 "labels": {
 "has_engagement_data": true,
 "total_clicks": 1261,
 "used_resource_types": 9,
 "evidence_row_type": "resource_usage"
 }
 },
 {
 "student_id": "SAMPLE_OULAD_STU_101700",
 "metrics": {},
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
 "metric_extrema": {
 "quiz.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 623
 }
 },
 "quiz.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.4941
 }
 },
 "quiz.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "homepage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 264
 }
 },
 "homepage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.2094
 }
 },
 "homepage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "forumng.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 140
 }
 },
 "forumng.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.111
 }
 },
 "forumng.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "subpage.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 94
 }
 },
 "subpage.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0745
 }
 },
 "subpage.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "resource.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 71
 }
 },
 "resource.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0563
 }
 },
 "resource.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucontent.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 40
 }
 },
 "oucontent.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0317
 }
 },
 "oucontent.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "url.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 27
 }
 },
 "url.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0214
 }
 },
 "url.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "oucollaborate.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "oucollaborate.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.clicks": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 },
 "page.pct_of_total": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 0.0008
 }
 },
 "page.vle_diversity_score": {
 "min": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 },
 "max": {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "value": 1
 }
 }
 },
 "pairwise_gaps": [],
 "missing_metric_evidence": [],
 "missing_entity_evidence": [
 {
 "entity": "SAMPLE_OULAD_STU_101700",
 "reason": "entity has no recorded source evidence for metric comparison",
 "evidence_column": "has_engagement_data",
 "evidence_value": false,
 "labels": {
 "has_engagement_data": false,
 "total_clicks": 0,
 "used_resource_types": 0,
 "evidence_row_type": "no_recorded_resource_usage"
 }
 }
 ],
 "missing_expected_entities": [],
 "selected_entity_evidence": [],
 "evidence_status": "sufficient",
 "evidence_requirements": {
 "minimum_entity_count": 2,
 "expected_entities": [],
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
 "clicks": "count",
 "pct_of_total": "ratio_0_1",
 "vle_diversity_score": "ratio_0_1"
 },
 "metric_directions": {
 "clicks": "context_only",
 "pct_of_total": "context_only",
 "vle_diversity_score": "higher_is_more_diverse"
 },
 "metric_thresholds": {},
 "sensitive_context_policy": null
 },
 "causal_claim_allowed": false,
 "summarization_warnings": []
 }
 },
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 8917,
 "token_usage": {
 "prompt_tokens": 3996,
 "completion_tokens": 596,
 "total_tokens": 4592
 },
 "strategy": "comparison",
 "granularity": "semester",
 "cost_usd": 0.000957
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
 "expected": 10,
 "observed": 10
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "4e437a4bf0a93b5080d2cf66ff3b46aa17062f7dbcfe5ea43f8c67fcee3d6a6c",
 "expected_values": [
 "4e437a4bf0a93b5080d2cf66ff3b46aa17062f7dbcfe5ea43f8c67fcee3d6a6c"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "2cc1c9fd65637a8e736332409cfa269b820c3194d7ff4ddfa154e0a04babae61",
 "expected": "2cc1c9fd65637a8e736332409cfa269b820c3194d7ff4ddfa154e0a04babae61"
 },
 {
 "check_id": "numeric_fields_resource_comparison",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "resource_comparison",
 "numeric_columns": [
 "clicks",
 "total_clicks",
 "used_resource_types",
 "vle_diversity_score",
 "pct_of_total"
 ],
 "numeric_summaries": {
 "clicks": {
 "count": 10,
 "min": 0,
 "max": 623
 },
 "total_clicks": {
 "count": 10,
 "min": 0,
 "max": 1261
 },
 "used_resource_types": {
 "count": 10,
 "min": 0,
 "max": 9
 },
 "vle_diversity_score": {
 "count": 10,
 "min": 0,
 "max": 1
 },
 "pct_of_total": {
 "count": 9,
 "min": 0.0007930214115781126,
 "max": 0.4940523394131642
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_resource_comparison",
 "check_type": "threshold_flag_detection",
 "status": "not_applicable",
 "dataset_label": "resource_comparison",
 "flag_columns": [],
 "triggered_like_counts": {}
 }
]
```

