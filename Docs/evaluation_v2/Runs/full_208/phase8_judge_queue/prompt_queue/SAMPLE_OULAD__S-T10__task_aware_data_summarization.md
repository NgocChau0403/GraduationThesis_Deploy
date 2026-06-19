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

# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__S-T10__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T10__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T10",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Resource engagement breakdown",
  "scope": "1 student",
  "actionable_question": "Am I using the full range of learning resources available?",
  "target_audience": "student",
  "ai_summary_type": "categorical_distribution",
  "ai_prompt_hint": "Use vle_diversity_score [FE] to show breadth. Highlight under-used types (e.g. forum rarely used).",
  "query_labels": [
    "resource_usage"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
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
    "resource_usage"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T10-CORE-01",
      "description": "State the student's resource usage breadth across available VLE types."
    },
    {
      "requirement_id": "S-T10-CORE-02",
      "description": "Identify under-used resource types when a comparison baseline is available."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T10-CONSTRAINT-01",
      "description": "Use vle_diversity_score as the primary resource-breadth metric when returned."
    },
    {
      "constraint_id": "S-T10-CONSTRAINT-02",
      "description": "Do not label low usage of a resource type as disengagement when no comparison baseline is provided."
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
      "dataset_label": "resource_usage",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T10.json",
      "artifact_sha256": "d104cedb86d92fea4d41cb5fde5c359875144a7bb6d35e70d303cd08cd0a444c",
      "row_count": 9,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 9,
  "prompt_embedded_row_count": 9,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "d104cedb86d92fea4d41cb5fde5c359875144a7bb6d35e70d303cd08cd0a444c",
  "evidence_rows_sha256": "9ed8f0948e3c8a3e7f9310b189cd3996b477d344c961fdf90d5a115d1926a7ee",
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
  "full_result_row_count": 9,
  "embedded_datasets_sha256": "9ed8f0948e3c8a3e7f9310b189cd3996b477d344c961fdf90d5a115d1926a7ee",
  "datasets": {
    "resource_usage": [
      {
        "resource_type": "quiz",
        "clicks": 623,
        "pct_of_total": "0.49405233941316415543",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "homepage",
        "clicks": 264,
        "pct_of_total": "0.20935765265662172879",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "forumng",
        "clicks": 140,
        "pct_of_total": "0.11102299762093576527",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "subpage",
        "clicks": 94,
        "pct_of_total": "0.07454401268834258525",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "resource",
        "clicks": 71,
        "pct_of_total": "0.05630452022204599524",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "oucontent",
        "clicks": 40,
        "pct_of_total": "0.03172085646312450436",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "url",
        "clicks": 27,
        "pct_of_total": "0.02141157811260904044",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "page",
        "clicks": 1,
        "pct_of_total": "0.00079302141157811261",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "oucollaborate",
        "clicks": 1,
        "pct_of_total": "0.00079302141157811261",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T10__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "62fad0204446e794d49d0a183d94d702ba9f9b38df5b99b7b467dcb948a0d008",
  "generator_input_sha256": "210157deeecc4c94705cffe334b730a9c9f268d1c1a73009921d7e8e540921f2",
  "generator_input_compact": {
    "task_id": "S-T10",
    "execution_id": "exec_1781847912597_3167c4a7",
    "task_name": "Resource engagement breakdown",
    "analysis_type": "distribution",
    "explanation_strategy": "behavioral",
    "actionable_question": "Am I using the full range of learning resources available?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "resource_usage"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "resource_usage"
    ],
    "dataset_row_counts": {
      "resource_usage": 9
    },
    "ai_summary_config_summary": {
      "summary_type": "categorical_distribution",
      "metric_column": null,
      "entity_column": null,
      "group_column": null,
      "time_column": null,
      "sort_by": "clicks",
      "sort_direction": "desc",
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
  "raw_text": "Summary: Your engagement with various learning resources shows a strong preference for quizzes, which is great! However, there are several resources that you could explore more to enhance your learning experience.\n\nInsights: High Quiz Engagement: You have clicked on quizzes 623 times, making up nearly 49% of your total resource usage. This indicates a strong engagement with this resource type. | Low Forum Engagement: Your engagement with forums is quite low, with only 140 clicks, which is about 11% of your total usage. This suggests you might be missing out on valuable discussions and peer interactions. | Underutilized Resources: Other resources like 'subpage' and 'resource' have very low engagement, with only 94 and 71 clicks respectively. Exploring these could provide additional insights and support.\n\nEducational implications: Engaging with a wider variety of resources can deepen your understanding and retention of course material.\n\nRecommendations: high - Increase your participation in forums. - This will help you connect with peers and gain different perspectives on the material. | medium - Explore underutilized resources like subpages and additional materials. - These resources may provide valuable information that complements your learning.",
  "structured_payload": {
    "task_id": "S-T10",
    "execution_id": "exec_1781847912597_3167c4a7",
    "explanation": {
      "summary": "Your engagement with various learning resources shows a strong preference for quizzes, which is great! However, there are several resources that you could explore more to enhance your learning experience.",
      "insights": [
        {
          "title": "High Quiz Engagement",
          "description": "You have clicked on quizzes 623 times, making up nearly 49% of your total resource usage. This indicates a strong engagement with this resource type.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "clicks",
              "value": 623,
              "comparison": "baseline",
              "delta": null,
              "context": "Quizzes are your most engaged resource."
            }
          ]
        },
        {
          "title": "Low Forum Engagement",
          "description": "Your engagement with forums is quite low, with only 140 clicks, which is about 11% of your total usage. This suggests you might be missing out on valuable discussions and peer interactions.",
          "severity": "high",
          "evidence": [
            {
              "metric": "clicks",
              "value": 140,
              "comparison": "baseline",
              "delta": null,
              "context": "Forums can enhance your understanding through peer discussions."
            }
          ]
        },
        {
          "title": "Underutilized Resources",
          "description": "Other resources like 'subpage' and 'resource' have very low engagement, with only 94 and 71 clicks respectively. Exploring these could provide additional insights and support.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "clicks",
              "value": 94,
              "comparison": "baseline",
              "delta": null,
              "context": "These resources may contain important supplementary materials."
            },
            {
              "metric": "clicks",
              "value": 71,
              "comparison": "baseline",
              "delta": null,
              "context": "Engaging with these could enhance your learning."
            }
          ]
        }
      ],
      "educational_implications": [
        "Engaging with a wider variety of resources can deepen your understanding and retention of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Increase your participation in forums.",
          "rationale": "This will help you connect with peers and gain different perspectives on the material."
        },
        {
          "priority": "medium",
          "action": "Explore underutilized resources like subpages and additional materials.",
          "rationale": "These resources may provide valuable information that complements your learning."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and provides a clear picture of your resource engagement.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 9,
    "included_row_count": 9,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "resource_usage",
        "row_count": 9,
        "included_row_count": 9
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 11538,
      "token_usage": {
        "prompt_tokens": 1268,
        "completion_tokens": 608,
        "total_tokens": 1876
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000555
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T10__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "62fad0204446e794d49d0a183d94d702ba9f9b38df5b99b7b467dcb948a0d008",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1268,
      "completion_tokens": 608,
      "total_tokens": 1876
    },
    "latency_ms": 11540,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T10",
    "execution_id": "exec_1781847912597_3167c4a7",
    "explanation": {
      "summary": "Your engagement with various learning resources shows a strong preference for quizzes, which is great! However, there are several resources that you could explore more to enhance your learning experience.",
      "insights": [
        {
          "title": "High Quiz Engagement",
          "description": "You have clicked on quizzes 623 times, making up nearly 49% of your total resource usage. This indicates a strong engagement with this resource type.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "clicks",
              "value": 623,
              "comparison": "baseline",
              "delta": null,
              "context": "Quizzes are your most engaged resource."
            }
          ]
        },
        {
          "title": "Low Forum Engagement",
          "description": "Your engagement with forums is quite low, with only 140 clicks, which is about 11% of your total usage. This suggests you might be missing out on valuable discussions and peer interactions.",
          "severity": "high",
          "evidence": [
            {
              "metric": "clicks",
              "value": 140,
              "comparison": "baseline",
              "delta": null,
              "context": "Forums can enhance your understanding through peer discussions."
            }
          ]
        },
        {
          "title": "Underutilized Resources",
          "description": "Other resources like 'subpage' and 'resource' have very low engagement, with only 94 and 71 clicks respectively. Exploring these could provide additional insights and support.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "clicks",
              "value": 94,
              "comparison": "baseline",
              "delta": null,
              "context": "These resources may contain important supplementary materials."
            },
            {
              "metric": "clicks",
              "value": 71,
              "comparison": "baseline",
              "delta": null,
              "context": "Engaging with these could enhance your learning."
            }
          ]
        }
      ],
      "educational_implications": [
        "Engaging with a wider variety of resources can deepen your understanding and retention of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Increase your participation in forums.",
          "rationale": "This will help you connect with peers and gain different perspectives on the material."
        },
        {
          "priority": "medium",
          "action": "Explore underutilized resources like subpages and additional materials.",
          "rationale": "These resources may provide valuable information that complements your learning."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and provides a clear picture of your resource engagement.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 9,
    "included_row_count": 9,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "resource_usage",
        "row_count": 9,
        "included_row_count": 9
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 11538,
      "token_usage": {
        "prompt_tokens": 1268,
        "completion_tokens": 608,
        "total_tokens": 1876
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000555
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
    "expected": 9,
    "observed": 9
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "d104cedb86d92fea4d41cb5fde5c359875144a7bb6d35e70d303cd08cd0a444c",
    "expected_values": [
      "d104cedb86d92fea4d41cb5fde5c359875144a7bb6d35e70d303cd08cd0a444c"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "9ed8f0948e3c8a3e7f9310b189cd3996b477d344c961fdf90d5a115d1926a7ee",
    "expected": "9ed8f0948e3c8a3e7f9310b189cd3996b477d344c961fdf90d5a115d1926a7ee"
  },
  {
    "check_id": "numeric_fields_resource_usage",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "resource_usage",
    "numeric_columns": [
      "clicks"
    ],
    "numeric_summaries": {
      "clicks": {
        "count": 9,
        "min": 1,
        "max": 623
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_resource_usage",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "resource_usage",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```

