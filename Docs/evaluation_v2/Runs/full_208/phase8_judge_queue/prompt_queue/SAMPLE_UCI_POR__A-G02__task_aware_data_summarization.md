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
        "dataset_label": "engagement_performance_scatter",
        "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G02.json",
        "artifact_sha256": "ec1f523b113edf667ebc50cd23a781f0582552aee4eb0ead13dd52d986b33157",
        "row_count": 649,
        "readable": true
      }
    ],
    "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_contexts/final_contexts/SAMPLE_UCI_POR__A-G02__task_aware_data_summarization.md",
    "final_context_sha256": "06ddb003fcdcf4f6947228be64cc422c5e5cf8c2eaea6b54496c4eaa139456ec",
    "judge_input_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/judge_inputs/SAMPLE_UCI_POR__A-G02__task_aware_data_summarization.json",
    "judge_input_sha256": "4fa035c75dbf8a472374e814f16823c66e60586103b0032bb37862d6dd5939f3"
  },
  "record_identity": {
    "record_id": "SAMPLE_UCI_POR__A-G02__task_aware_data_summarization",
    "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
    "dataset_id": "SAMPLE_UCI_POR",
    "task_id": "A-G02",
    "explanation_mode": "task_aware_data_summarization",
    "prompt_version": "judge_prompt_v2_full_208_v1",
    "rubric_version": "judge_rubric_1_to_10_full_208_v1"
  },
  "task_context": {
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
  },
  "schema_context": {
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
  },
  "evaluation_requirements": {
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
  },
  "evidence_access_summary": {
    "evidence_access_mode": "deterministic_artifact_retrieval",
    "full_result_row_count": 649,
    "prompt_embedded_row_count": 0,
    "retrieved_row_count": 649,
    "retrieved_row_count_by_dataset": {
      "engagement_performance_scatter": 649
    },
    "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_UCI_POR__A-G02__task_aware_data_summarization.json",
    "retrieval_coverage_status": "full",
    "full_access_available": true,
    "deterministic_scan_scope": "full_query_artifact_all_rows",
    "deterministic_scan_row_count_by_dataset": {
      "engagement_performance_scatter": 649
    },
    "full_result_sent_to_llm": false,
    "evidence_summary": {
      "row_count_phase3": 649,
      "row_count_observed": 649,
      "row_count_bucket_phase3": ">20",
      "row_count_bucket_observed": ">20",
      "dataset_breakdown": [
        {
          "label": "engagement_performance_scatter",
          "row_count": 649,
          "sample_fields": [
            "student_id",
            "engagement_score",
            "avg_score",
            "final_outcome"
          ]
        }
      ],
      "full_query_datasets_sha256": "8e063cea0577e6cef735683d26fbb6a3fa7beb23d83610c7718fc22fd8c7971a"
    },
    "retrieval_log_summary": {
      "retrieval_request_complete": true,
      "retrieval_coverage_status": "full",
      "chunk_count": 1,
      "chunks": [
        {
          "chunk_id": "SAMPLE_UCI_POR__A-G02__task_aware_data_summarization__engagement_performance_scatter__chunk_1",
          "dataset_label": "engagement_performance_scatter",
          "row_start_inclusive": 0,
          "row_end_inclusive": 648,
          "row_count": 649,
          "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G02.json",
          "source_artifact_sha256": "ec1f523b113edf667ebc50cd23a781f0582552aee4eb0ead13dd52d986b33157"
        }
      ]
    },
    "context_manifest_validation": {
      "direct_embedding_validation": null,
      "retrieval_validation": {
        "status": "pass",
        "retrieved_row_count": 649,
        "chunk_count": 1,
        "chunk_ids": [
          "SAMPLE_UCI_POR__A-G02__task_aware_data_summarization__engagement_performance_scatter__chunk_1"
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
    "raw_text": "Summary: The analysis of the relationship between Engagement Score and Average Score reveals a concerning pattern where several students exhibit high engagement but low average scores. This suggests that while engagement may be present, it does not necessarily translate into improved academic performance for all students.\n\nInsights: Outliers with High Engagement and Low Scores: A notable number of students (e.g., those with engagement scores of 0.0) have average scores ranging from 6.6667 to 23.3333, indicating a significant disconnect between engagement and performance. This pattern highlights potential issues in the effectiveness of engagement strategies for these students.\n\nEducational implications: The presence of students who are engaged yet underperforming suggests that engagement alone is insufficient for academic success. It may indicate a need for targeted support or intervention strategies.\n\nRecommendations: high - Implement targeted support for students with high engagement but low performance. - Providing additional resources or personalized assistance may help bridge the gap between engagement and academic achievement.",
    "structured_payload": {
      "task_id": "A-G02",
      "execution_id": "exec_1781847232116_05e73795",
      "explanation": {
        "summary": "The analysis of the relationship between Engagement Score and Average Score reveals a concerning pattern where several students exhibit high engagement but low average scores. This suggests that while engagement may be present, it does not necessarily translate into improved academic performance for all students.",
        "insights": [
          {
            "title": "Outliers with High Engagement and Low Scores",
            "description": "A notable number of students (e.g., those with engagement scores of 0.0) have average scores ranging from 6.6667 to 23.3333, indicating a significant disconnect between engagement and performance. This pattern highlights potential issues in the effectiveness of engagement strategies for these students.",
            "severity": "high",
            "evidence": [
              {
                "metric": "engagement_score",
                "value": 0,
                "comparison": "baseline",
                "delta": null,
                "context": "Students with high engagement but low average scores"
              },
              {
                "metric": "avg_score",
                "value": 15,
                "comparison": "baseline",
                "delta": null,
                "context": "Average score of outlier students"
              }
            ]
          }
        ],
        "educational_implications": [
          "The presence of students who are engaged yet underperforming suggests that engagement alone is insufficient for academic success. It may indicate a need for targeted support or intervention strategies."
        ],
        "recommendations": [
          {
            "priority": "high",
            "action": "Implement targeted support for students with high engagement but low performance.",
            "rationale": "Providing additional resources or personalized assistance may help bridge the gap between engagement and academic achievement."
          }
        ],
        "warnings": []
      },
      "confidence": {
        "level": "LOW",
        "reason": "The inability to derive a Pearson coefficient and the presence of outliers limit the reliability of the correlation analysis.",
        "based_on": [
          "sparse_data"
        ]
      },
      "explanation_strategy": "correlation",
      "explanation_type": "correlation",
      "ai_summary_method": "task_aware_data_summarization",
      "ai_summary_version": "v1",
      "baseline_available": true,
      "input_summary_type": "correlation_evidence",
      "ai_summary_method_warning": null,
      "full_result_row_count": 649,
      "included_row_count": null,
      "small_result_threshold": 20,
      "small_result_full_rows_applied": false,
      "dataset_row_breakdown": [
        {
          "dataset_name": "engagement_performance_scatter",
          "row_count": 649,
          "included_row_count": 649
        }
      ],
      "safety_flags": [],
      "degraded": false,
      "meta": {
        "model": "gpt-4o-mini-2024-07-18",
        "latency_ms": 6551,
        "token_usage": {
          "prompt_tokens": 1537,
          "completion_tokens": 413,
          "total_tokens": 1950
        },
        "strategy": "correlation",
        "granularity": "semester",
        "cost_usd": 0.000478
      }
    },
    "generation_metadata": {
      "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G02__task_aware_data_summarization.json",
      "explanation_artifact_sha256": "9b6b32bf97a66aa02b84ea121ffd951de0bcd080ca791093df7182a9e83ed994",
      "ai_service_url": "http://localhost:8000",
      "expected_ai_summary_method": "task_aware_data_summarization",
      "observed_ai_summary_method": "task_aware_data_summarization",
      "degraded": false,
      "model": "gpt-4o-mini-2024-07-18",
      "token_usage": {
        "prompt_tokens": 1537,
        "completion_tokens": 413,
        "total_tokens": 1950
      },
      "latency_ms": 6562,
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
