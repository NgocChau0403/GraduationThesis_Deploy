# LLM Judge V2 Pilot Invocation Packet

You are processing exactly one pilot record. Use the frozen judge prompt below and the final judge context below.

Return only one JSON object conforming to `LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json`.

Do not return Markdown fences, commentary, aggregate scores, final score, verdict, or runner-derived fields.

## Invocation Metadata

```json
{
  "evaluation_run_id": "llm_judge_v2_pilot_phase6_5",
  "session_segment_id": "pilot_phase6_5_segment_001",
  "session_sequence_number": 9,
  "record_id": "SAMPLE_UCI_POR__A-G02__baseline_first_20_rows",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G02",
  "explanation_mode": "baseline_first_20_rows",
  "final_context_sha256": "1a37f7ad7e64f3631bb81bf271b87130a4dff376878a94d5c45d57ad666d79da",
  "judge_input_sha256": "3b33b6d8df3cb62fd41733d991ab47a152adcce7584ced2260f383b26a7c8593"
}
```

## Frozen Judge Prompt V2

# LLM Judge V2 Prompt

## Status

```text
PILOT PROMPT CANDIDATE - REVIEWED, NOT YET HASH-FROZEN
```

Prompt version candidate:

```text
judge_prompt_v2_pilot_v1
```

This prompt is for calibration-pilot use only. It is not approved for the
official full evaluation until its exact bytes, SHA-256, rubric version and
pilot manifest are frozen.

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


## Final Judge Context For This Record

# LLM Judge V2 Final Judge Context - SAMPLE_UCI_POR__A-G02__baseline_first_20_rows

This Phase 6.4b context is the record-level evidence package to supply with the frozen Judge Prompt V2 during pilot judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G02__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_pilot_phase6_4",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G02",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Engagement–performance relationship",
  "scope": "Many students",
  "actionable_question": "Does engaging more in this class actually lead to better grades?",
  "target_audience": "instructor",
  "ai_summary_type": "correlation_evidence",
  "ai_prompt_hint": "Describe correlation direction and strength. Flag outliers (high engagement, low score) as a special case.",
  "query_labels": [
    "engagement_performance_scatter"
  ],
  "explanation_strategy": "correlation"
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
    "engagement_score [FE cross]",
    "avg_score [FE cross]",
    "final_outcome"
  ],
  "output_schema": {},
  "query_labels": [
    "engagement_performance_scatter"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G02-CORE-01",
      "description": "Describe correlation direction and strength."
    },
    {
      "requirement_id": "A-G02-CORE-02",
      "description": "Flag outliers (high engagement, low score) as a special case."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G02-CONSTRAINT-01",
      "description": "Describe the engagement-score relationship as correlational; do not infer that engagement causes score outcomes."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
}
```

## Deterministic Retrieval Evidence

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "engagement_performance_scatter",
      "artifact_path": "Docs/evaluation_v2/Runs/phase6_evidence/full_query_artifacts/SAMPLE_UCI_POR__A-G02__baseline_first_20_rows.json",
      "artifact_sha256": "c56c9950be116cd68f425d792bb360093e963486248a61e62ce7f87171686e2f",
      "row_count": 649,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 649,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 649,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/phase6_judge_inputs/retrieval_logs/SAMPLE_UCI_POR__A-G02__baseline_first_20_rows.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "c56c9950be116cd68f425d792bb360093e963486248a61e62ce7f87171686e2f",
  "evidence_rows_sha256": "8e063cea0577e6cef735683d26fbb6a3fa7beb23d83610c7718fc22fd8c7971a",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 649,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_UCI_POR__A-G02__baseline_first_20_rows__engagement_performance_scatter__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "engagement_performance_scatter",
        "row_start_inclusive": 0,
        "row_end_inclusive": 648,
        "row_count": 649
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
    "generated_at": "2026-06-18T22:36:57.981Z",
    "record_id": "SAMPLE_UCI_POR__A-G02__baseline_first_20_rows",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_UCI_POR__A-G02__baseline_first_20_rows__engagement_performance_scatter__chunk_1",
        "dataset_label": "engagement_performance_scatter",
        "row_start_inclusive": 0,
        "row_end_inclusive": 648,
        "row_count": 649,
        "source_artifact_path": "Docs/evaluation_v2/Runs/phase6_evidence/full_query_artifacts/SAMPLE_UCI_POR__A-G02__baseline_first_20_rows.json",
        "source_artifact_sha256": "c56c9950be116cd68f425d792bb360093e963486248a61e62ce7f87171686e2f"
      }
    ]
  },
  "retrieved_datasets_sha256": "8e063cea0577e6cef735683d26fbb6a3fa7beb23d83610c7718fc22fd8c7971a",
  "retrieved_datasets": {
    "engagement_performance_scatter": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000003",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000004",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000005",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000006",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000007",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000008",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000009",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000010",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000011",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000012",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000013",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000014",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000015",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000016",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000017",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000018",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000019",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000020",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000021",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000022",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000023",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000024",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000025",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000026",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000027",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000028",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000029",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000030",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000031",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000032",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000033",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000034",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000035",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000036",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000037",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000038",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000039",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000040",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000041",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000042",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000043",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000044",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000045",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000046",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000047",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000048",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000049",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000050",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000051",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000052",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000053",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000054",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000055",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000056",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000057",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000058",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000059",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000060",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000061",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000062",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000063",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000064",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000065",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000066",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000067",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000068",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000069",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000070",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000071",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000072",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000073",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000074",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000075",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000076",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000077",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000078",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000079",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000080",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000081",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000082",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000083",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000084",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000085",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000086",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000087",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000088",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000089",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000090",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000091",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000092",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000093",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000094",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000095",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000096",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000097",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000098",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000099",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000100",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000101",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000102",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000103",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000104",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000105",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000106",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000107",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000108",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000109",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000110",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000111",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000112",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000113",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000114",
        "engagement_score": 0,
        "avg_score": 88.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000115",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000116",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000117",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000118",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000119",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000120",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000121",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000122",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000123",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000124",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000125",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000126",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000127",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000128",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000129",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000130",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000131",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000132",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000133",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000134",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000135",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000136",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000137",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000138",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000139",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000140",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000141",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000142",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000143",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000144",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000145",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000146",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000147",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000148",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000149",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000150",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000151",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000152",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000153",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000154",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000155",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000156",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000157",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000158",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000159",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000160",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000161",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000162",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000163",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000164",
        "engagement_score": 0,
        "avg_score": 33.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000165",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000166",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000167",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000168",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000169",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000170",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000171",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000172",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000173",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000174",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000175",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000176",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000177",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000178",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000179",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000180",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000181",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000182",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000183",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000184",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000185",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000186",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000187",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000188",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000189",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000190",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000191",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000192",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000193",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000194",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000195",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000196",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000197",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000198",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000199",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000200",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000201",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000202",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000203",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000204",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000205",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000206",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000207",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000208",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000209",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000210",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000211",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000212",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000213",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000214",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000215",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000216",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000217",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000218",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000219",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000220",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000221",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000222",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000223",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000224",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000225",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000226",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000227",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000228",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000229",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000230",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000231",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000232",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000233",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000234",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000235",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000236",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000237",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000238",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000239",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000240",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000241",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000242",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000243",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000244",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000245",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000246",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000247",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000248",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000249",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000250",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000251",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000252",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000253",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000254",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000255",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000256",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000257",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000258",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000259",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000260",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000261",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000262",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000263",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000264",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000265",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000266",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000267",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000268",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000269",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000270",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000271",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000272",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000273",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000274",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000275",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000276",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000277",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000278",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000279",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000280",
        "engagement_score": 0,
        "avg_score": 33.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000281",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000282",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000283",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000284",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000285",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000286",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000287",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000288",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000289",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000290",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000291",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000292",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000293",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000294",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000295",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000296",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000297",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000298",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000299",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000300",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000301",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000302",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000303",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000304",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000305",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000306",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000307",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000308",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000309",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000310",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000311",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000312",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000313",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000314",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000315",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000316",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000317",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000318",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000319",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000320",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000321",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000322",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000323",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000324",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000325",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000326",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000327",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000328",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000329",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000330",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000331",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000332",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000333",
        "engagement_score": 0,
        "avg_score": 90,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000334",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000335",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000336",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000337",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000338",
        "engagement_score": 0,
        "avg_score": 88.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000339",
        "engagement_score": 0,
        "avg_score": 93.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000340",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000341",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000342",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000343",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000344",
        "engagement_score": 0,
        "avg_score": 83.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000345",
        "engagement_score": 0,
        "avg_score": 88.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000346",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000347",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000348",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000349",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000350",
        "engagement_score": 0,
        "avg_score": 90,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000351",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000352",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000353",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000354",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000355",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000356",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000357",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000358",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000359",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000360",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000361",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000362",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000363",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000364",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000365",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000366",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000367",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000368",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000369",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000370",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000371",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000372",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000373",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000374",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000375",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000376",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000377",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000378",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000379",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000380",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000381",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000382",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000383",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000384",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000385",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000386",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000387",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000388",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000389",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000390",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000391",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000392",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000393",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000394",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000395",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000396",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000397",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000398",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000399",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000400",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000401",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000402",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000403",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000404",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000405",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000406",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000407",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000408",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000409",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000410",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000411",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000412",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000413",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000414",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000415",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000416",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000417",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000418",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000419",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000420",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000421",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000422",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000423",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000424",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000425",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000426",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000427",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000428",
        "engagement_score": 0,
        "avg_score": 83.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000429",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000430",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000431",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000432",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000433",
        "engagement_score": 0,
        "avg_score": 31.666666666666668,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000434",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000435",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000436",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000437",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000438",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000439",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000440",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000441",
        "engagement_score": 0,
        "avg_score": 11.666666666666666,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000442",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000443",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000444",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000445",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000446",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000447",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000448",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000449",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000450",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000451",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000452",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000453",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000454",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000455",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000456",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000457",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000458",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000459",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000460",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000461",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000462",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000463",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000464",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000465",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000466",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000467",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000468",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000469",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000470",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000471",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000472",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000473",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000474",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000475",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000476",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000477",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000478",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000479",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000480",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000481",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000482",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000483",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000484",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000485",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000486",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000487",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000488",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000489",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000490",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000491",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000492",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000493",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000494",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000495",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000496",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000497",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000498",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000499",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000500",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000501",
        "engagement_score": 0,
        "avg_score": 33.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000502",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000503",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000504",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000505",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000506",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000507",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000508",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000509",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000510",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000511",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000512",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000513",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000514",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000515",
        "engagement_score": 0,
        "avg_score": 33.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000516",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000517",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000518",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000519",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000520",
        "engagement_score": 0,
        "avg_score": 25,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000521",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000522",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000523",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000524",
        "engagement_score": 0,
        "avg_score": 28.333333333333332,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000525",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000526",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000527",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000528",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000529",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000530",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000531",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000532",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000533",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000534",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000535",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000536",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000537",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000538",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000539",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000540",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000541",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000542",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000543",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000544",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000545",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000546",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000547",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000548",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000549",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000550",
        "engagement_score": 0,
        "avg_score": 88.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000551",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000552",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000553",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000554",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000555",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000556",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000557",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000558",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000559",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000560",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000561",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000562",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000563",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000564",
        "engagement_score": 0,
        "avg_score": 11.666666666666666,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000565",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000566",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000567",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000568",
        "engagement_score": 0,
        "avg_score": 6.666666666666667,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000569",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000570",
        "engagement_score": 0,
        "avg_score": 33.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000571",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000572",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000573",
        "engagement_score": 0,
        "avg_score": 28.333333333333332,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000574",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000575",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000576",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000577",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000578",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000579",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000580",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000581",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000582",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000583",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000584",
        "engagement_score": 0,
        "avg_score": 23.333333333333332,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000585",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000586",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000587",
        "engagement_score": 0,
        "avg_score": 26.666666666666668,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000588",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000589",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000590",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000591",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000592",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000593",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000594",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000595",
        "engagement_score": 0,
        "avg_score": 90,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000596",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000597",
        "engagement_score": 0,
        "avg_score": 88.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000598",
        "engagement_score": 0,
        "avg_score": 15,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000599",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000600",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000601",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000602",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000603",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000604",
        "engagement_score": 0,
        "avg_score": 8.333333333333334,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000605",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000606",
        "engagement_score": 0,
        "avg_score": 8.333333333333334,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000607",
        "engagement_score": 0,
        "avg_score": 90,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000608",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000609",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000610",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000611",
        "engagement_score": 0,
        "avg_score": 13.333333333333334,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000612",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000613",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000614",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000615",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000616",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000617",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000618",
        "engagement_score": 0,
        "avg_score": 90,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000619",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000620",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000621",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000622",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000623",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000624",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000625",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000626",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000627",
        "engagement_score": 0,
        "avg_score": 20,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000628",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000629",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000630",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000631",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000632",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000633",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000634",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000635",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000636",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000637",
        "engagement_score": 0,
        "avg_score": 90,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000638",
        "engagement_score": 0,
        "avg_score": 23.333333333333332,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000639",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000640",
        "engagement_score": 0,
        "avg_score": 21.666666666666668,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000641",
        "engagement_score": 0,
        "avg_score": 23.333333333333332,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000642",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000643",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000644",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000645",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000646",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000647",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000648",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000649",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_baseline/explanation_artifacts/SAMPLE_UCI_POR__A-G02__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "bf08d4f05854b976ee36de3138b2f8652544ccde35fbf6ed91e09c92b8fd828d",
  "generator_input_sha256": "2d8784458aa636b72e1ec6ec57a613384f5ec595d320a984b10876386d02c8b1",
  "generator_input_compact": {
    "task_id": "A-G02",
    "execution_id": "exec_1781820408712_8800c609",
    "task_name": "Engagement–performance relationship",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "Does engaging more in this class actually lead to better grades?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "engagement_performance_scatter"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "engagement_performance_scatter"
    ],
    "dataset_row_counts": {
      "engagement_performance_scatter": 649
    },
    "ai_summary_config_summary": {
      "summary_type": "correlation_evidence",
      "metric_column": null,
      "entity_column": "student_id",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": null,
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
  "raw_text": "Summary: The analysis reveals a weak negative correlation between Engagement Score and Average Score, indicating that higher engagement does not necessarily lead to better academic performance in this dataset. This suggests that other factors may be influencing student outcomes.\n\nInsights: Weak Negative Correlation: The correlation between engagement_score and avg_score is weakly negative, suggesting that as engagement increases, average scores do not show a corresponding increase. This may indicate that students with higher engagement are not necessarily achieving higher academic performance. | Outlier Identification: Several students exhibit high average scores despite having an engagement score of 0, indicating potential outliers. For instance, one student achieved an average score of 85 with no recorded engagement, highlighting a disconnect between engagement and performance.\n\nEducational implications: The weak correlation suggests that increasing student engagement alone may not be sufficient to improve academic performance, indicating the need for a multifaceted approach to enhance learning outcomes.\n\nRecommendations: high - Investigate additional factors influencing student performance. - Understanding the reasons behind the weak correlation can help educators tailor interventions that address both engagement and academic success. | medium - Implement targeted support for students identified as outliers. - Providing additional resources or support to students who perform well despite low engagement may help uncover effective strategies that can be shared with others.",
  "structured_payload": {
    "task_id": "A-G02",
    "execution_id": "exec_1781820408712_8800c609",
    "explanation": {
      "summary": "The analysis reveals a weak negative correlation between Engagement Score and Average Score, indicating that higher engagement does not necessarily lead to better academic performance in this dataset. This suggests that other factors may be influencing student outcomes.",
      "insights": [
        {
          "title": "Weak Negative Correlation",
          "description": "The correlation between engagement_score and avg_score is weakly negative, suggesting that as engagement increases, average scores do not show a corresponding increase. This may indicate that students with higher engagement are not necessarily achieving higher academic performance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "The majority of students have an engagement score of 0, yet their average scores vary significantly."
            }
          ]
        },
        {
          "title": "Outlier Identification",
          "description": "Several students exhibit high average scores despite having an engagement score of 0, indicating potential outliers. For instance, one student achieved an average score of 85 with no recorded engagement, highlighting a disconnect between engagement and performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 85,
              "comparison": "peak",
              "delta": null,
              "context": "This score is significantly higher than the average scores of other students with similar engagement levels."
            }
          ]
        }
      ],
      "educational_implications": [
        "The weak correlation suggests that increasing student engagement alone may not be sufficient to improve academic performance, indicating the need for a multifaceted approach to enhance learning outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Investigate additional factors influencing student performance.",
          "rationale": "Understanding the reasons behind the weak correlation can help educators tailor interventions that address both engagement and academic success."
        },
        {
          "priority": "medium",
          "action": "Implement targeted support for students identified as outliers.",
          "rationale": "Providing additional resources or support to students who perform well despite low engagement may help uncover effective strategies that can be shared with others."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is sufficiently large and diverse, providing a reliable basis for correlation analysis.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
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
      "latency_ms": 6549,
      "token_usage": {
        "prompt_tokens": 1575,
        "completion_tokens": 529,
        "total_tokens": 2104
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000554
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_baseline/explanation_artifacts/SAMPLE_UCI_POR__A-G02__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "bf08d4f05854b976ee36de3138b2f8652544ccde35fbf6ed91e09c92b8fd828d",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1575,
      "completion_tokens": 529,
      "total_tokens": 2104
    },
    "latency_ms": 6580,
    "attempts_used": null
  },
  "source_response_body": {
    "task_id": "A-G02",
    "execution_id": "exec_1781820408712_8800c609",
    "explanation": {
      "summary": "The analysis reveals a weak negative correlation between Engagement Score and Average Score, indicating that higher engagement does not necessarily lead to better academic performance in this dataset. This suggests that other factors may be influencing student outcomes.",
      "insights": [
        {
          "title": "Weak Negative Correlation",
          "description": "The correlation between engagement_score and avg_score is weakly negative, suggesting that as engagement increases, average scores do not show a corresponding increase. This may indicate that students with higher engagement are not necessarily achieving higher academic performance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "The majority of students have an engagement score of 0, yet their average scores vary significantly."
            }
          ]
        },
        {
          "title": "Outlier Identification",
          "description": "Several students exhibit high average scores despite having an engagement score of 0, indicating potential outliers. For instance, one student achieved an average score of 85 with no recorded engagement, highlighting a disconnect between engagement and performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 85,
              "comparison": "peak",
              "delta": null,
              "context": "This score is significantly higher than the average scores of other students with similar engagement levels."
            }
          ]
        }
      ],
      "educational_implications": [
        "The weak correlation suggests that increasing student engagement alone may not be sufficient to improve academic performance, indicating the need for a multifaceted approach to enhance learning outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Investigate additional factors influencing student performance.",
          "rationale": "Understanding the reasons behind the weak correlation can help educators tailor interventions that address both engagement and academic success."
        },
        {
          "priority": "medium",
          "action": "Implement targeted support for students identified as outliers.",
          "rationale": "Providing additional resources or support to students who perform well despite low engagement may help uncover effective strategies that can be shared with others."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is sufficiently large and diverse, providing a reliable basis for correlation analysis.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
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
      "latency_ms": 6549,
      "token_usage": {
        "prompt_tokens": 1575,
        "completion_tokens": 529,
        "total_tokens": 2104
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000554
    }
  }
}
```

## Pilot-Minimal Deterministic Checks

```json
[
  {
    "check_id": "row_count_total",
    "check_type": "row_count",
    "status": "pass",
    "expected": 649,
    "observed": 649
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "c56c9950be116cd68f425d792bb360093e963486248a61e62ce7f87171686e2f",
    "expected_values": [
      "c56c9950be116cd68f425d792bb360093e963486248a61e62ce7f87171686e2f"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "8e063cea0577e6cef735683d26fbb6a3fa7beb23d83610c7718fc22fd8c7971a",
    "expected": "8e063cea0577e6cef735683d26fbb6a3fa7beb23d83610c7718fc22fd8c7971a"
  },
  {
    "check_id": "numeric_fields_engagement_performance_scatter",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "engagement_performance_scatter",
    "numeric_columns": [
      "avg_score",
      "engagement_score"
    ],
    "numeric_summaries": {
      "avg_score": {
        "count": 649,
        "min": 6.666666666666667,
        "max": 93.33333333333333
      },
      "engagement_score": {
        "count": 649,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_engagement_performance_scatter",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "engagement_performance_scatter",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```


## Required Output

Return the direct judge response JSON object now.
