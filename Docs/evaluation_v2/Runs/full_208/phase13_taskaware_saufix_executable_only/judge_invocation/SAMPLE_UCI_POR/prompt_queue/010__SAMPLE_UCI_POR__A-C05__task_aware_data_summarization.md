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

For `task_context.ai_summary_type = "action_synthesis"`, apply this narrow
Phase 13 correction:

- `explanation.recommendations=[]` must not by itself be treated as
  `missing_required_output` or reduce `actionability`;
- judge whether the explanation explains the existing supported actions and
  the returned evidence, feature or rule that triggered each action;
- do not require the explanation to create recommendations beyond actions
  already displayed by the chart or returned by the action-rule contract;
- a missing-output penalty is appropriate only when deterministic evidence
  contains a supported action that the explanation fails to explain; and
- penalize any invented action, priority, urgency, owner or risk context that
  is not supported by the returned evidence or action-rule contract.

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

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C05__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2_PHASE13_SAUFIX_EXECUTABLE_ONLY.md`
- Prompt SHA-256: `8ae00287d6a8e9c23c769c97b4d11aa90e05e9126f8cd3e71fcef74500d6f48f`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-C05__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_phase13_saufix_executable_only__SAMPLE_UCI_POR",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-C05",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_phase13_saufix_action_correction_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Compare academic background",
  "scope": "2 students",
  "actionable_question": "Does one student face more structural disadvantage than the other?",
  "target_audience": "academic_advisor",
  "ai_summary_type": "multi_metric_comparison",
  "ai_prompt_hint": "Identify background-driven performance differences. Avoid causal claims.",
  "query_labels": [
    "background_comparison"
  ],
  "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "enrollment"
  ],
  "key_db_fields": [
    "highest_education",
    "previous_attempt_count",
    "imd_score_numeric",
    "socioeconomic_band",
    "disability_flag",
    "disadvantage_score [FE single]",
    "support_score [FE single]",
    "family_stability_score [FE single]"
  ],
  "output_schema": {},
  "query_labels": [
    "background_comparison"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-C05-CORE-01",
      "description": "Identify background-driven performance differences."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-C05-CONSTRAINT-01",
      "description": "Avoid causal claims."
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
      "dataset_label": "background_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-C05.json",
      "artifact_sha256": "255d44b8db1c6f7c9f3050f88ca33b6dbf8e435493d83a871ffaf61513400e7c",
      "row_count": 2,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 2,
  "prompt_embedded_row_count": 2,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "255d44b8db1c6f7c9f3050f88ca33b6dbf8e435493d83a871ffaf61513400e7c",
  "evidence_rows_sha256": "ea264e7bf6e16912946cd57c73676e94fe583b4905823c82b6d6e8c24ead5d6f",
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
  "full_result_row_count": 2,
  "embedded_datasets_sha256": "ea264e7bf6e16912946cd57c73676e94fe583b4905823c82b6d6e8c24ead5d6f",
  "datasets": {
    "background_comparison": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "highest_education": "Parent education 4/4",
        "previous_attempt_count": 0,
        "imd_score_numeric": null,
        "socioeconomic_band": null,
        "disability_flag": null,
        "disadvantage_score": 0.2,
        "support_score": 0.25,
        "family_stability_score": 0.575,
        "mother_education_level": "4",
        "father_education_level": "4"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "highest_education": "Parent education 1/4",
        "previous_attempt_count": 0,
        "imd_score_numeric": null,
        "socioeconomic_band": null,
        "disability_flag": null,
        "disadvantage_score": 0.4,
        "support_score": 0.5,
        "family_stability_score": 0.8500000000000001,
        "mother_education_level": "1",
        "father_education_level": "1"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C05__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "8c6d5ed6b16257fe401397b34a4a56bd8439da7d4a7a5283ff052e80b024eceb",
  "generator_input_sha256": "b7295f00f33cc80a8848b0b9f88109e7d915c4ac9b0500f8a4ef44b2a91628a6",
  "generator_input_compact": {
    "task_id": "A-C05",
    "execution_id": "exec_1781847232057_25cc847c",
    "task_name": "Compare academic background",
    "analysis_type": "comparison",
    "explanation_strategy": "comparison",
    "actionable_question": "Does one student face more structural disadvantage than the other?",
    "target_audience": [
      "academic_advisor"
    ],
    "query_labels": [
      "background_comparison"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "background_comparison"
    ],
    "dataset_row_counts": {
      "background_comparison": 2
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
      "require_sensitive_context_policy": true,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: The comparison of two students reveals significant differences in their structural disadvantages and support systems. Student SAMPLE_UCI_POR_STU_000002 exhibits higher disadvantage and support scores, indicating a more challenging background compared to SAMPLE_UCI_POR_STU_000001.\n\nInsights: Disadvantage Score Comparison: SAMPLE_UCI_POR_STU_000002 has a higher disadvantage score than SAMPLE_UCI_POR_STU_000001, indicating a greater structural disadvantage. | Support Score Comparison: SAMPLE_UCI_POR_STU_000002 also has a higher support score, suggesting that despite facing more disadvantages, there may be more support available. | Family Stability Score Comparison: SAMPLE_UCI_POR_STU_000002 has a higher family stability score, which may contribute positively to their overall support despite the higher disadvantage score.\n\nEducational implications: Students with higher disadvantage scores may require additional resources and support to succeed academically.\n\nRecommendations: high - Implement targeted support programs for students with higher disadvantage scores. - To address the structural disadvantages faced by students like SAMPLE_UCI_POR_STU_000002.",
  "structured_payload": {
    "task_id": "A-C05",
    "execution_id": "exec_1781847232057_25cc847c",
    "explanation": {
      "summary": "The comparison of two students reveals significant differences in their structural disadvantages and support systems. Student SAMPLE_UCI_POR_STU_000002 exhibits higher disadvantage and support scores, indicating a more challenging background compared to SAMPLE_UCI_POR_STU_000001.",
      "insights": [
        {
          "title": "Disadvantage Score Comparison",
          "description": "SAMPLE_UCI_POR_STU_000002 has a higher disadvantage score than SAMPLE_UCI_POR_STU_000001, indicating a greater structural disadvantage.",
          "severity": "high",
          "evidence": [
            {
              "metric": "disadvantage_score",
              "value": 0.4,
              "comparison": "baseline",
              "delta": 0.2,
              "context": "SAMPLE_UCI_POR_STU_000002 is at a disadvantage compared to SAMPLE_UCI_POR_STU_000001"
            }
          ]
        },
        {
          "title": "Support Score Comparison",
          "description": "SAMPLE_UCI_POR_STU_000002 also has a higher support score, suggesting that despite facing more disadvantages, there may be more support available.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "support_score",
              "value": 0.5,
              "comparison": "baseline",
              "delta": 0.25,
              "context": "SAMPLE_UCI_POR_STU_000002 has more support compared to SAMPLE_UCI_POR_STU_000001"
            }
          ]
        },
        {
          "title": "Family Stability Score Comparison",
          "description": "SAMPLE_UCI_POR_STU_000002 has a higher family stability score, which may contribute positively to their overall support despite the higher disadvantage score.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "family_stability_score",
              "value": 0.85,
              "comparison": "baseline",
              "delta": 0.275,
              "context": "SAMPLE_UCI_POR_STU_000002 has better family stability compared to SAMPLE_UCI_POR_STU_000001"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students with higher disadvantage scores may require additional resources and support to succeed academically."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students with higher disadvantage scores.",
          "rationale": "To address the structural disadvantages faced by students like SAMPLE_UCI_POR_STU_000002."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is sufficient for comparison, with clear metrics available for analysis.",
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
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "background_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 2,
    "baseline_reference_tokens": 211,
    "task_aware_prompt_tokens": 1777,
    "token_ratio": 8.4218,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (8.4218 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8590,
      "token_usage": {
        "prompt_tokens": 2374,
        "completion_tokens": 615,
        "total_tokens": 2989
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000725
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C05__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "8c6d5ed6b16257fe401397b34a4a56bd8439da7d4a7a5283ff052e80b024eceb",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2374,
      "completion_tokens": 615,
      "total_tokens": 2989
    },
    "latency_ms": 8595,
    "attempts_used": 2
  },
  "source_response_body": {
    "task_id": "A-C05",
    "execution_id": "exec_1781847232057_25cc847c",
    "explanation": {
      "summary": "The comparison of two students reveals significant differences in their structural disadvantages and support systems. Student SAMPLE_UCI_POR_STU_000002 exhibits higher disadvantage and support scores, indicating a more challenging background compared to SAMPLE_UCI_POR_STU_000001.",
      "insights": [
        {
          "title": "Disadvantage Score Comparison",
          "description": "SAMPLE_UCI_POR_STU_000002 has a higher disadvantage score than SAMPLE_UCI_POR_STU_000001, indicating a greater structural disadvantage.",
          "severity": "high",
          "evidence": [
            {
              "metric": "disadvantage_score",
              "value": 0.4,
              "comparison": "baseline",
              "delta": 0.2,
              "context": "SAMPLE_UCI_POR_STU_000002 is at a disadvantage compared to SAMPLE_UCI_POR_STU_000001"
            }
          ]
        },
        {
          "title": "Support Score Comparison",
          "description": "SAMPLE_UCI_POR_STU_000002 also has a higher support score, suggesting that despite facing more disadvantages, there may be more support available.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "support_score",
              "value": 0.5,
              "comparison": "baseline",
              "delta": 0.25,
              "context": "SAMPLE_UCI_POR_STU_000002 has more support compared to SAMPLE_UCI_POR_STU_000001"
            }
          ]
        },
        {
          "title": "Family Stability Score Comparison",
          "description": "SAMPLE_UCI_POR_STU_000002 has a higher family stability score, which may contribute positively to their overall support despite the higher disadvantage score.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "family_stability_score",
              "value": 0.85,
              "comparison": "baseline",
              "delta": 0.275,
              "context": "SAMPLE_UCI_POR_STU_000002 has better family stability compared to SAMPLE_UCI_POR_STU_000001"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students with higher disadvantage scores may require additional resources and support to succeed academically."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students with higher disadvantage scores.",
          "rationale": "To address the structural disadvantages faced by students like SAMPLE_UCI_POR_STU_000002."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is sufficient for comparison, with clear metrics available for analysis.",
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
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "background_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 2,
    "baseline_reference_tokens": 211,
    "task_aware_prompt_tokens": 1777,
    "token_ratio": 8.4218,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (8.4218 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8590,
      "token_usage": {
        "prompt_tokens": 2374,
        "completion_tokens": 615,
        "total_tokens": 2989
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000725
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
    "expected": 2,
    "observed": 2
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "255d44b8db1c6f7c9f3050f88ca33b6dbf8e435493d83a871ffaf61513400e7c",
    "expected_values": [
      "255d44b8db1c6f7c9f3050f88ca33b6dbf8e435493d83a871ffaf61513400e7c"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "ea264e7bf6e16912946cd57c73676e94fe583b4905823c82b6d6e8c24ead5d6f",
    "expected": "ea264e7bf6e16912946cd57c73676e94fe583b4905823c82b6d6e8c24ead5d6f"
  },
  {
    "check_id": "numeric_fields_background_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "background_comparison",
    "numeric_columns": [
      "disadvantage_score",
      "family_stability_score",
      "previous_attempt_count",
      "support_score"
    ],
    "numeric_summaries": {
      "disadvantage_score": {
        "count": 2,
        "min": 0.2,
        "max": 0.4
      },
      "family_stability_score": {
        "count": 2,
        "min": 0.575,
        "max": 0.8500000000000001
      },
      "previous_attempt_count": {
        "count": 2,
        "min": 0,
        "max": 0
      },
      "support_score": {
        "count": 2,
        "min": 0.25,
        "max": 0.5
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_background_comparison",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "background_comparison",
    "flag_columns": [
      "disability_flag"
    ],
    "triggered_like_counts": {
      "disability_flag": 0
    }
  }
]
```

