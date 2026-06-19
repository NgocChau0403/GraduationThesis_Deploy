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

# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-G08__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G08__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G08",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Background group performance & engagement profile",
  "scope": "Many students",
  "actionable_question": "Which demographic groups are scoring or engaging below the class average?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "group_comparison",
  "ai_prompt_hint": "For each demographic group, compare mean avg_score [FE] and engagement_score [FE] to cohort average. Use colour intensity to show deviation. Avoid causal claims. Note: output is continuous score — distinct from A-G12 which uses categorical final_outcome.",
  "query_labels": [
    "demographic_performance"
  ],
  "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "enrollment",
    "assessment_result",
    "assessment",
    "engagement"
  ],
  "key_db_fields": [
    "socioeconomic_band / gender / age_group / highest_education; avg_score [FE cross]",
    "engagement_score [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "demographic_performance"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G08-CORE-01",
      "description": "For each demographic group, compare mean average score and engagement score with the cohort average."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G08-CONSTRAINT-01",
      "description": "Quantify the magnitude of group deviation rather than relying on visual colour encoding alone."
    },
    {
      "constraint_id": "A-G08-CONSTRAINT-02",
      "description": "Avoid causal claims."
    },
    {
      "constraint_id": "A-G08-CONSTRAINT-03",
      "description": "Treat this as an equity-sensitive demographic group analysis."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Applicable because the task compares demographic groups and requires equity framing."
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "demographic_performance",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G08.json",
      "artifact_sha256": "8f4e41747ea3f615d793457834081d21309a8a5f5847129b33cf83033b87ad18",
      "row_count": 11,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 11,
  "prompt_embedded_row_count": 11,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "8f4e41747ea3f615d793457834081d21309a8a5f5847129b33cf83033b87ad18",
  "evidence_rows_sha256": "5f0d9bfd03e96ed997d71cc6bb04e9fda69ba2a7710330604934b332f31cd243",
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
  "full_result_row_count": 11,
  "embedded_datasets_sha256": "5f0d9bfd03e96ed997d71cc6bb04e9fda69ba2a7710330604934b332f31cd243",
  "datasets": {
    "demographic_performance": [
      {
        "group_value": "Unknown",
        "student_count": 131,
        "avg_score": 81.21,
        "avg_engagement_score": 0.1903,
        "score_vs_cohort": 10.77
      },
      {
        "group_value": "90-100%",
        "student_count": 181,
        "avg_score": 74.53,
        "avg_engagement_score": 0.1457,
        "score_vs_cohort": 4.09
      },
      {
        "group_value": "80-90%",
        "student_count": 201,
        "avg_score": 72.35,
        "avg_engagement_score": 0.1668,
        "score_vs_cohort": 1.92
      },
      {
        "group_value": "60-70%",
        "student_count": 193,
        "avg_score": 71.85,
        "avg_engagement_score": 0.1414,
        "score_vs_cohort": 1.42
      },
      {
        "group_value": "70-80%",
        "student_count": 194,
        "avg_score": 71.33,
        "avg_engagement_score": 0.138,
        "score_vs_cohort": 0.89
      },
      {
        "group_value": "50-60%",
        "student_count": 191,
        "avg_score": 70.27,
        "avg_engagement_score": 0.1484,
        "score_vs_cohort": -0.17
      },
      {
        "group_value": "30-40%",
        "student_count": 206,
        "avg_score": 68.5,
        "avg_engagement_score": 0.1392,
        "score_vs_cohort": -1.94
      },
      {
        "group_value": "0-10%",
        "student_count": 152,
        "avg_score": 68.05,
        "avg_engagement_score": 0.1463,
        "score_vs_cohort": -2.39
      },
      {
        "group_value": "40-50%",
        "student_count": 185,
        "avg_score": 67.76,
        "avg_engagement_score": 0.1312,
        "score_vs_cohort": -2.67
      },
      {
        "group_value": "20-30%",
        "student_count": 196,
        "avg_score": 65.99,
        "avg_engagement_score": 0.1318,
        "score_vs_cohort": -4.45
      },
      {
        "group_value": "10-20",
        "student_count": 168,
        "avg_score": 62.96,
        "avg_engagement_score": 0.1312,
        "score_vs_cohort": -7.48
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G08__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "e1d748a4ddbb660e0efa55dc0ae4c3f68e44991ef6235c739aa15dde221ab058",
  "generator_input_sha256": "4c010fabc8b8fc973ee3cb1fe68a9003b638aa96a45213d598ebb6fa4b33b060",
  "generator_input_compact": {
    "task_id": "A-G08",
    "execution_id": "exec_1781847735724_ef073aa0",
    "task_name": "Background group performance & engagement profile",
    "analysis_type": "segmentation",
    "explanation_strategy": "comparison",
    "actionable_question": "Which demographic groups are scoring or engaging below the class average?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "demographic_performance"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "demographic_performance"
    ],
    "dataset_row_counts": {
      "demographic_performance": 11
    },
    "ai_summary_config_summary": {
      "summary_type": "group_comparison",
      "metric_column": "avg_score",
      "entity_column": null,
      "group_column": "group_value",
      "time_column": null,
      "sort_by": "score_vs_cohort",
      "sort_direction": "asc",
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
  "raw_text": "Summary: The analysis of demographic performance reveals significant disparities in average scores and engagement levels across different student groups. Notably, groups scoring below the cohort average exhibit lower engagement scores, indicating a potential area for targeted intervention.\n\nInsights: High-Performing Group: Unknown: The 'Unknown' group demonstrates the highest average score of 81.21, significantly above the cohort average, indicating strong performance relative to peers. | Lowest Performing Group: 10-20%: The '10-20%' group has the lowest average score of 62.96, which is 7.48 points below the cohort average, highlighting a critical need for support. | Engagement Disparity Across Groups: Engagement scores are notably lower in groups with lower average scores, particularly in the '10-20%' group with an engagement score of 0.1312, indicating a correlation between engagement and performance.\n\nEducational implications: Targeted interventions are necessary for lower-performing groups to enhance both scores and engagement.\n\nRecommendations: high - Implement targeted support programs for the '10-20%' group. - This group is significantly underperforming and may benefit from additional resources and engagement strategies. | medium - Increase engagement activities for all groups, particularly those with lower scores. - Enhancing engagement may lead to improved academic performance across the board.",
  "structured_payload": {
    "task_id": "A-G08",
    "execution_id": "exec_1781847735724_ef073aa0",
    "explanation": {
      "summary": "The analysis of demographic performance reveals significant disparities in average scores and engagement levels across different student groups. Notably, groups scoring below the cohort average exhibit lower engagement scores, indicating a potential area for targeted intervention.",
      "insights": [
        {
          "title": "High-Performing Group: Unknown",
          "description": "The 'Unknown' group demonstrates the highest average score of 81.21, significantly above the cohort average, indicating strong performance relative to peers.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 81.21,
              "comparison": "baseline",
              "delta": 10.77,
              "context": "Cohort average is lower than this group's score."
            }
          ]
        },
        {
          "title": "Lowest Performing Group: 10-20%",
          "description": "The '10-20%' group has the lowest average score of 62.96, which is 7.48 points below the cohort average, highlighting a critical need for support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 62.96,
              "comparison": "down_from_previous",
              "delta": -7.48,
              "context": "This group's score is significantly lower than the cohort average."
            }
          ]
        },
        {
          "title": "Engagement Disparity Across Groups",
          "description": "Engagement scores are notably lower in groups with lower average scores, particularly in the '10-20%' group with an engagement score of 0.1312, indicating a correlation between engagement and performance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_engagement_score",
              "value": 0.1312,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "This group's engagement score is among the lowest."
            }
          ]
        }
      ],
      "educational_implications": [
        "Targeted interventions are necessary for lower-performing groups to enhance both scores and engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for the '10-20%' group.",
          "rationale": "This group is significantly underperforming and may benefit from additional resources and engagement strategies."
        },
        {
          "priority": "medium",
          "action": "Increase engagement activities for all groups, particularly those with lower scores.",
          "rationale": "Enhancing engagement may lead to improved academic performance across the board."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear view of performance metrics across demographic groups.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 11,
    "included_row_count": 11,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "demographic_performance",
        "row_count": 11,
        "included_row_count": 11
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 9692,
      "token_usage": {
        "prompt_tokens": 1337,
        "completion_tokens": 620,
        "total_tokens": 1957
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000573
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G08__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "e1d748a4ddbb660e0efa55dc0ae4c3f68e44991ef6235c739aa15dde221ab058",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1337,
      "completion_tokens": 620,
      "total_tokens": 1957
    },
    "latency_ms": 9695,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G08",
    "execution_id": "exec_1781847735724_ef073aa0",
    "explanation": {
      "summary": "The analysis of demographic performance reveals significant disparities in average scores and engagement levels across different student groups. Notably, groups scoring below the cohort average exhibit lower engagement scores, indicating a potential area for targeted intervention.",
      "insights": [
        {
          "title": "High-Performing Group: Unknown",
          "description": "The 'Unknown' group demonstrates the highest average score of 81.21, significantly above the cohort average, indicating strong performance relative to peers.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 81.21,
              "comparison": "baseline",
              "delta": 10.77,
              "context": "Cohort average is lower than this group's score."
            }
          ]
        },
        {
          "title": "Lowest Performing Group: 10-20%",
          "description": "The '10-20%' group has the lowest average score of 62.96, which is 7.48 points below the cohort average, highlighting a critical need for support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 62.96,
              "comparison": "down_from_previous",
              "delta": -7.48,
              "context": "This group's score is significantly lower than the cohort average."
            }
          ]
        },
        {
          "title": "Engagement Disparity Across Groups",
          "description": "Engagement scores are notably lower in groups with lower average scores, particularly in the '10-20%' group with an engagement score of 0.1312, indicating a correlation between engagement and performance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_engagement_score",
              "value": 0.1312,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "This group's engagement score is among the lowest."
            }
          ]
        }
      ],
      "educational_implications": [
        "Targeted interventions are necessary for lower-performing groups to enhance both scores and engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for the '10-20%' group.",
          "rationale": "This group is significantly underperforming and may benefit from additional resources and engagement strategies."
        },
        {
          "priority": "medium",
          "action": "Increase engagement activities for all groups, particularly those with lower scores.",
          "rationale": "Enhancing engagement may lead to improved academic performance across the board."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear view of performance metrics across demographic groups.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 11,
    "included_row_count": 11,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "demographic_performance",
        "row_count": 11,
        "included_row_count": 11
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 9692,
      "token_usage": {
        "prompt_tokens": 1337,
        "completion_tokens": 620,
        "total_tokens": 1957
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000573
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
    "expected": 11,
    "observed": 11
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "8f4e41747ea3f615d793457834081d21309a8a5f5847129b33cf83033b87ad18",
    "expected_values": [
      "8f4e41747ea3f615d793457834081d21309a8a5f5847129b33cf83033b87ad18"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "5f0d9bfd03e96ed997d71cc6bb04e9fda69ba2a7710330604934b332f31cd243",
    "expected": "5f0d9bfd03e96ed997d71cc6bb04e9fda69ba2a7710330604934b332f31cd243"
  },
  {
    "check_id": "numeric_fields_demographic_performance",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "demographic_performance",
    "numeric_columns": [
      "avg_engagement_score",
      "avg_score",
      "score_vs_cohort",
      "student_count"
    ],
    "numeric_summaries": {
      "avg_engagement_score": {
        "count": 11,
        "min": 0.1312,
        "max": 0.1903
      },
      "avg_score": {
        "count": 11,
        "min": 62.96,
        "max": 81.21
      },
      "score_vs_cohort": {
        "count": 11,
        "min": -7.48,
        "max": 10.77
      },
      "student_count": {
        "count": 11,
        "min": 131,
        "max": 206
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_demographic_performance",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "demographic_performance",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```

