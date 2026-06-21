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

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T03__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T03.json",
      "artifact_sha256": "7d1e97dd81c83d3348bd288ec9989dde355d96c7b2271bfc1daa35b454a76fe1",
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
  "evidence_artifact_file_sha256": "7d1e97dd81c83d3348bd288ec9989dde355d96c7b2271bfc1daa35b454a76fe1",
  "evidence_rows_sha256": "d83549c8ba7dec7dcddade118ebe67097062e29bb8f2cf92fc642086de6a3831",
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
  "embedded_datasets_sha256": "d83549c8ba7dec7dcddade118ebe67097062e29bb8f2cf92fc642086de6a3831",
  "datasets": {
    "peer_comparison": [
      {
        "metric_name": "Average score",
        "comparison_group": "You",
        "metric_value": 41.25,
        "sort_order": 1
      },
      {
        "metric_name": "Average score",
        "comparison_group": "Cohort benchmark",
        "metric_value": 58.31,
        "sort_order": 1
      },
      {
        "metric_name": "Score percentile",
        "comparison_group": "You",
        "metric_value": 8.8,
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
        "metric_value": 0,
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T03__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "946f3c4fefcbc356f851d6657b07a306239647e9fd4c496866c034daec315c47",
  "generator_input_sha256": "b401fd855c5da63df1a56d99ed109a02e04c2a64738ef8510630141a8ef146af",
  "generator_input_compact": {
    "task_id": "S-T03",
    "execution_id": "exec_1781847241833_47e30f50",
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
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
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
  "raw_text": "Summary: You are currently performing below the cohort benchmark in several key areas. Your average score, score percentile, and engagement percentile are significantly lower than those of your peers, indicating areas for improvement.\n\nInsights: Average Score Comparison: Your average score of 41.25 is notably lower than the cohort benchmark of 58.31, suggesting a need for enhanced study strategies or support. | Score Percentile Gap: You are in the 8.8th percentile for scores, while the cohort benchmark is at the 50th percentile. This indicates that your performance is significantly below average compared to your peers. | Engagement Percentile Deficit: Your engagement percentile is at 0, while the cohort benchmark is at 50. This suggests a lack of participation or interaction that could be impacting your learning outcomes.\n\nEducational implications: Improving your scores and engagement can lead to better learning outcomes and a more fulfilling educational experience.\n\nRecommendations: high - Seek additional academic support or tutoring. - This can help you improve your understanding of the material and boost your scores. | high - Increase your engagement in class activities and discussions. - Active participation can enhance your learning and help you connect with the material better.",
  "structured_payload": {
    "task_id": "S-T03",
    "execution_id": "exec_1781847241833_47e30f50",
    "explanation": {
      "summary": "You are currently performing below the cohort benchmark in several key areas. Your average score, score percentile, and engagement percentile are significantly lower than those of your peers, indicating areas for improvement.",
      "insights": [
        {
          "title": "Average Score Comparison",
          "description": "Your average score of 41.25 is notably lower than the cohort benchmark of 58.31, suggesting a need for enhanced study strategies or support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Average score",
              "value": 41.25,
              "comparison": "down_from_previous",
              "delta": -17.06,
              "context": "Cohort benchmark average score is 58.31"
            }
          ]
        },
        {
          "title": "Score Percentile Gap",
          "description": "You are in the 8.8th percentile for scores, while the cohort benchmark is at the 50th percentile. This indicates that your performance is significantly below average compared to your peers.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Score percentile",
              "value": 8.8,
              "comparison": "down_from_previous",
              "delta": -41.2,
              "context": "Cohort benchmark score percentile is 50"
            }
          ]
        },
        {
          "title": "Engagement Percentile Deficit",
          "description": "Your engagement percentile is at 0, while the cohort benchmark is at 50. This suggests a lack of participation or interaction that could be impacting your learning outcomes.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Engagement percentile",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": -50,
              "context": "Cohort benchmark engagement percentile is 50"
            }
          ]
        }
      ],
      "educational_implications": [
        "Improving your scores and engagement can lead to better learning outcomes and a more fulfilling educational experience."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Seek additional academic support or tutoring.",
          "rationale": "This can help you improve your understanding of the material and boost your scores."
        },
        {
          "priority": "high",
          "action": "Increase your engagement in class activities and discussions.",
          "rationale": "Active participation can enhance your learning and help you connect with the material better."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is sufficient and clearly indicates performance gaps.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
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
    "baseline_reference_tokens": 206,
    "task_aware_prompt_tokens": 959,
    "token_ratio": 4.6553,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (4.6553 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6189,
      "token_usage": {
        "prompt_tokens": 1478,
        "completion_tokens": 590,
        "total_tokens": 2068
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000576
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T03__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "946f3c4fefcbc356f851d6657b07a306239647e9fd4c496866c034daec315c47",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1478,
      "completion_tokens": 590,
      "total_tokens": 2068
    },
    "latency_ms": 6222,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T03",
    "execution_id": "exec_1781847241833_47e30f50",
    "explanation": {
      "summary": "You are currently performing below the cohort benchmark in several key areas. Your average score, score percentile, and engagement percentile are significantly lower than those of your peers, indicating areas for improvement.",
      "insights": [
        {
          "title": "Average Score Comparison",
          "description": "Your average score of 41.25 is notably lower than the cohort benchmark of 58.31, suggesting a need for enhanced study strategies or support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Average score",
              "value": 41.25,
              "comparison": "down_from_previous",
              "delta": -17.06,
              "context": "Cohort benchmark average score is 58.31"
            }
          ]
        },
        {
          "title": "Score Percentile Gap",
          "description": "You are in the 8.8th percentile for scores, while the cohort benchmark is at the 50th percentile. This indicates that your performance is significantly below average compared to your peers.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Score percentile",
              "value": 8.8,
              "comparison": "down_from_previous",
              "delta": -41.2,
              "context": "Cohort benchmark score percentile is 50"
            }
          ]
        },
        {
          "title": "Engagement Percentile Deficit",
          "description": "Your engagement percentile is at 0, while the cohort benchmark is at 50. This suggests a lack of participation or interaction that could be impacting your learning outcomes.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Engagement percentile",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": -50,
              "context": "Cohort benchmark engagement percentile is 50"
            }
          ]
        }
      ],
      "educational_implications": [
        "Improving your scores and engagement can lead to better learning outcomes and a more fulfilling educational experience."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Seek additional academic support or tutoring.",
          "rationale": "This can help you improve your understanding of the material and boost your scores."
        },
        {
          "priority": "high",
          "action": "Increase your engagement in class activities and discussions.",
          "rationale": "Active participation can enhance your learning and help you connect with the material better."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is sufficient and clearly indicates performance gaps.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
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
    "baseline_reference_tokens": 206,
    "task_aware_prompt_tokens": 959,
    "token_ratio": 4.6553,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (4.6553 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6189,
      "token_usage": {
        "prompt_tokens": 1478,
        "completion_tokens": 590,
        "total_tokens": 2068
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000576
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
    "observed": "7d1e97dd81c83d3348bd288ec9989dde355d96c7b2271bfc1daa35b454a76fe1",
    "expected_values": [
      "7d1e97dd81c83d3348bd288ec9989dde355d96c7b2271bfc1daa35b454a76fe1"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "d83549c8ba7dec7dcddade118ebe67097062e29bb8f2cf92fc642086de6a3831",
    "expected": "d83549c8ba7dec7dcddade118ebe67097062e29bb8f2cf92fc642086de6a3831"
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
        "min": 0,
        "max": 58.31
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

