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

# LLM Judge V2 Final Judge Context - SAMPLE_UCI_POR__S-T13__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T13__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T13",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Action plan generation",
  "scope": "1 student",
  "actionable_question": "What should I do differently starting next week?",
  "target_audience": "student",
  "ai_summary_type": "action_synthesis",
  "ai_prompt_hint": "Synthesise all [FE] risk signals into 3–5 prioritised actions. Reference which FE feature triggered each item.",
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
    "student"
  ],
  "key_db_fields": [
    "[AI_SYNTHESIS] avg_score [FE cross]",
    "at_risk_score [FE cross]",
    "engagement_score [FE cross]",
    "absence_rate [FE single]",
    "performance_trend [FE cross]",
    "lifestyle_risk_score [FE single]"
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
      "requirement_id": "S-T13-CORE-01",
      "description": "Synthesise all [FE] risk signals into 3–5 prioritised actions."
    },
    {
      "requirement_id": "S-T13-CORE-02",
      "description": "Reference which FE feature triggered each item."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T13-CONSTRAINT-01",
      "description": "Do not include actions that reference signals not present in returned data."
    },
    {
      "constraint_id": "S-T13-CONSTRAINT-02",
      "description": "Do not invent risk context, urgency, or priority unsupported by returned feature-engineered signals."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "synthesis_data",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T13.json",
      "artifact_sha256": "2a08d11768009472115b7a9a214f6b1876c84e1de53b92b868f70b36c8338d67",
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
  "evidence_artifact_file_sha256": "2a08d11768009472115b7a9a214f6b1876c84e1de53b92b868f70b36c8338d67",
  "evidence_rows_sha256": "ad9e8b1963af4ebb73dc148ff4c5e52096f5867a0c4401f2eceaed9accbf2463",
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
  "embedded_datasets_sha256": "ad9e8b1963af4ebb73dc148ff4c5e52096f5867a0c4401f2eceaed9accbf2463",
  "datasets": {
    "synthesis_data": [
      {
        "avg_score": 41.25,
        "performance_trend": 27.5,
        "engagement_score": 0,
        "engagement_score_available": false,
        "absence_rate": 1,
        "lifestyle_risk_score": 0.375,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "at_risk_score": 1,
        "at_risk_label": "low"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T13__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "bd03a1b6a2f666c91701c2c5d92f8eac8b3846651a9b49949a3f59f02db4a82c",
  "generator_input_sha256": "4b0c3ad28912d2a2e2de803c2ba9df356b332df027469fc263bf7beaf3692283",
  "generator_input_compact": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847244412_fccd48cb",
    "task_name": "Action plan generation",
    "analysis_type": "synthesis",
    "explanation_strategy": "risk",
    "actionable_question": "What should I do differently starting next week?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "synthesis_data"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
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
  "raw_text": "Summary: You are currently showing some signs that may indicate a need for additional support. Your average score is just above the passing threshold, and your engagement score is low, which suggests there are areas to focus on for improvement.\n\nInsights: Average Score Concern: Your average score is 41.25, which is only slightly above the passing threshold of 40. This indicates that you are close to falling below the passing mark, and it may be beneficial to focus on improving your understanding of the material. | Engagement Score: Your engagement score is currently at 0, which suggests that you may not be participating as much as you could be. Increasing your engagement in class activities could help boost your performance.",
  "structured_payload": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847244412_fccd48cb",
    "explanation": {
      "summary": "You are currently showing some signs that may indicate a need for additional support. Your average score is just above the passing threshold, and your engagement score is low, which suggests there are areas to focus on for improvement.",
      "insights": [
        {
          "title": "Average Score Concern",
          "description": "Your average score is 41.25, which is only slightly above the passing threshold of 40. This indicates that you are close to falling below the passing mark, and it may be beneficial to focus on improving your understanding of the material.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 41.25,
              "comparison": "baseline",
              "delta": null,
              "context": "Just above the passing threshold"
            }
          ]
        },
        {
          "title": "Engagement Score",
          "description": "Your engagement score is currently at 0, which suggests that you may not be participating as much as you could be. Increasing your engagement in class activities could help boost your performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Indicates low participation"
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
      "reason": "The data provided is clear and indicates specific areas for improvement.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
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
      "latency_ms": 10113,
      "token_usage": {
        "prompt_tokens": 650,
        "completion_tokens": 463,
        "total_tokens": 1113
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000375
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T13__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "bd03a1b6a2f666c91701c2c5d92f8eac8b3846651a9b49949a3f59f02db4a82c",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 650,
      "completion_tokens": 463,
      "total_tokens": 1113
    },
    "latency_ms": 10134,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847244412_fccd48cb",
    "explanation": {
      "summary": "You are currently showing some signs that may indicate a need for additional support. Your average score is just above the passing threshold, and your engagement score is low, which suggests there are areas to focus on for improvement.",
      "insights": [
        {
          "title": "Average Score Concern",
          "description": "Your average score is 41.25, which is only slightly above the passing threshold of 40. This indicates that you are close to falling below the passing mark, and it may be beneficial to focus on improving your understanding of the material.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 41.25,
              "comparison": "baseline",
              "delta": null,
              "context": "Just above the passing threshold"
            }
          ]
        },
        {
          "title": "Engagement Score",
          "description": "Your engagement score is currently at 0, which suggests that you may not be participating as much as you could be. Increasing your engagement in class activities could help boost your performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Indicates low participation"
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
      "reason": "The data provided is clear and indicates specific areas for improvement.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
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
      "latency_ms": 10113,
      "token_usage": {
        "prompt_tokens": 650,
        "completion_tokens": 463,
        "total_tokens": 1113
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000375
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
    "observed": "2a08d11768009472115b7a9a214f6b1876c84e1de53b92b868f70b36c8338d67",
    "expected_values": [
      "2a08d11768009472115b7a9a214f6b1876c84e1de53b92b868f70b36c8338d67"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "ad9e8b1963af4ebb73dc148ff4c5e52096f5867a0c4401f2eceaed9accbf2463",
    "expected": "ad9e8b1963af4ebb73dc148ff4c5e52096f5867a0c4401f2eceaed9accbf2463"
  },
  {
    "check_id": "numeric_fields_synthesis_data",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "numeric_columns": [
      "absence_rate",
      "at_risk_score",
      "avg_score",
      "engagement_score",
      "lifestyle_risk_score",
      "pass_threshold",
      "performance_trend",
      "score_scale",
      "target_threshold"
    ],
    "numeric_summaries": {
      "absence_rate": {
        "count": 1,
        "min": 1,
        "max": 1
      },
      "at_risk_score": {
        "count": 1,
        "min": 1,
        "max": 1
      },
      "avg_score": {
        "count": 1,
        "min": 41.25,
        "max": 41.25
      },
      "engagement_score": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "lifestyle_risk_score": {
        "count": 1,
        "min": 0.375,
        "max": 0.375
      },
      "pass_threshold": {
        "count": 1,
        "min": 40,
        "max": 40
      },
      "performance_trend": {
        "count": 1,
        "min": 27.5,
        "max": 27.5
      },
      "score_scale": {
        "count": 1,
        "min": 100,
        "max": 100
      },
      "target_threshold": {
        "count": 1,
        "min": 70,
        "max": 70
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_synthesis_data",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "flag_columns": [
      "lifestyle_risk_score",
      "pass_threshold",
      "target_threshold",
      "at_risk_score",
      "at_risk_label"
    ],
    "triggered_like_counts": {
      "lifestyle_risk_score": 0,
      "pass_threshold": 0,
      "target_threshold": 0,
      "at_risk_score": 0,
      "at_risk_label": 0
    }
  }
]
```

