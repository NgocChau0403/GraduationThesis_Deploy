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
        "dataset_label": "lifestyle_risk_scatter",
        "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T09.json",
        "artifact_sha256": "ac1a70115e0a9941bcb6b44a7a70ee79c402ac36c1f083a8b20d42959fa648ca",
        "row_count": 649,
        "readable": true
      }
    ],
    "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_contexts/final_contexts/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.md",
    "final_context_sha256": "f7b8d05a7aaba0863c051f58f4902102d124e86517b136dca9f0e95a18015ce3",
    "judge_input_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_inputs/judge_inputs/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.json",
    "judge_input_sha256": "5038f87ab35b7a44f10116faaae84d71b3090f228c385691ccd79c981a24924c"
  },
  "record_identity": {
    "record_id": "SAMPLE_UCI_POR__S-T09__task_aware_data_summarization",
    "evaluation_run_id": "llm_judge_v2_phase13_saufix_executable_only__SAMPLE_UCI_POR",
    "dataset_id": "SAMPLE_UCI_POR",
    "task_id": "S-T09",
    "explanation_mode": "task_aware_data_summarization",
    "prompt_version": "judge_prompt_v2_phase13_saufix_action_correction_v1",
    "rubric_version": "judge_rubric_1_to_10_pilot_v1"
  },
  "task_context": {
    "task_name": "Lifestyle risk vs performance",
    "scope": "1 student + cohort context",
    "actionable_question": "Could my lifestyle habits be affecting my academic results?",
    "target_audience": "student",
    "ai_summary_type": "correlation_evidence",
    "ai_prompt_hint": "Compare the selected student against the class lifestyle-risk scatter. Highlight the student's position and any cohort-level association between lifestyle_risk_score and avg_score. Frame as correlation, not causation.",
    "query_labels": [
      "lifestyle_risk_scatter"
    ],
    "explanation_strategy": "correlation"
  },
  "schema_context": {
    "source_tables": [
      "student",
      "enrollment",
      "assessment_result",
      "assessment [UCI only]"
    ],
    "key_db_fields": [
      "alcohol_weekday",
      "alcohol_weekend",
      "go_out_freq",
      "health_status",
      "family_relation",
      "free_time",
      "lifestyle_risk_score [FE single]"
    ],
    "output_schema": {
      "required_columns": [
        "student_id",
        "point_role",
        "lifestyle_risk_score",
        "avg_score"
      ],
      "optional_columns": [
        "is_current_student",
        "alcohol_weekday",
        "alcohol_weekend",
        "go_out_freq",
        "health_status",
        "family_relation",
        "free_time"
      ]
    },
    "query_labels": [
      "lifestyle_risk_scatter"
    ]
  },
  "evaluation_requirements": {
    "required_core_outputs": [
      {
        "requirement_id": "S-T09-CORE-01",
        "description": "Compare the selected student against the class lifestyle-risk scatter."
      },
      {
        "requirement_id": "S-T09-CORE-02",
        "description": "Highlight the student's position and any cohort-level association between lifestyle_risk_score and avg_score."
      }
    ],
    "required_supporting_outputs": [],
    "evaluation_constraints": [
      {
        "constraint_id": "S-T09-CONSTRAINT-01",
        "description": "Frame as correlation, not causation."
      }
    ],
    "safety_fairness_applicability": "applicable",
    "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
  },
  "derived_stat_evidence": [],
  "evidence_access_summary": {
    "evidence_access_mode": "deterministic_artifact_retrieval",
    "full_result_row_count": 649,
    "prompt_embedded_row_count": 0,
    "retrieved_row_count": 649,
    "retrieved_row_count_by_dataset": {
      "lifestyle_risk_scatter": 649
    },
    "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_inputs/retrieval_logs/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.json",
    "retrieval_coverage_status": "full",
    "full_access_available": true,
    "deterministic_scan_scope": "full_query_artifact_all_rows",
    "deterministic_scan_row_count_by_dataset": {
      "lifestyle_risk_scatter": 649
    },
    "full_result_sent_to_llm": false,
    "evidence_summary": {
      "row_count_phase3": 649,
      "row_count_observed": 649,
      "row_count_bucket_phase3": ">20",
      "row_count_bucket_observed": ">20",
      "dataset_breakdown": [
        {
          "label": "lifestyle_risk_scatter",
          "row_count": 649,
          "sample_fields": [
            "student_id",
            "point_role",
            "is_current_student",
            "alcohol_weekday",
            "alcohol_weekend",
            "go_out_freq",
            "health_status",
            "family_relation",
            "free_time",
            "lifestyle_risk_score",
            "avg_score"
          ]
        }
      ],
      "full_query_datasets_sha256": "0828c79f895cd26cfcda8e968a2b61e35a4f596d329de2720365180442c8eba8"
    },
    "retrieval_log_summary": {
      "retrieval_request_complete": true,
      "retrieval_coverage_status": "full",
      "chunk_count": 1,
      "chunks": [
        {
          "chunk_id": "SAMPLE_UCI_POR__S-T09__task_aware_data_summarization__lifestyle_risk_scatter__chunk_1",
          "dataset_label": "lifestyle_risk_scatter",
          "row_start_inclusive": 0,
          "row_end_inclusive": 648,
          "row_count": 649,
          "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T09.json",
          "source_artifact_sha256": "ac1a70115e0a9941bcb6b44a7a70ee79c402ac36c1f083a8b20d42959fa648ca"
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
          "SAMPLE_UCI_POR__S-T09__task_aware_data_summarization__lifestyle_risk_scatter__chunk_1"
        ],
        "row_ranges": [
          {
            "dataset_label": "lifestyle_risk_scatter",
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
    "raw_text": "Summary: The analysis shows a weak negative correlation between Lifestyle Risk Score and Average Score. This suggests that as lifestyle risk increases, average scores tend to decrease slightly, indicating that healthier lifestyle choices may be linked to better academic performance.\n\nInsights: Weak Negative Correlation: The correlation coefficient of -0.1041 indicates a weak negative relationship between lifestyle risk and average scores. This means that higher lifestyle risk scores are generally associated with lower average scores, but the relationship is not strong.\n\nEducational implications: Students may benefit from reflecting on their lifestyle choices and how these could impact their academic performance.\n\nRecommendations: high - Consider adopting healthier lifestyle habits. - Improving lifestyle choices may help enhance academic performance based on the observed correlation.",
    "structured_payload": {
      "task_id": "S-T09",
      "execution_id": "exec_1781847244230_bdc094c9",
      "explanation": {
        "summary": "The analysis shows a weak negative correlation between Lifestyle Risk Score and Average Score. This suggests that as lifestyle risk increases, average scores tend to decrease slightly, indicating that healthier lifestyle choices may be linked to better academic performance.",
        "insights": [
          {
            "title": "Weak Negative Correlation",
            "description": "The correlation coefficient of -0.1041 indicates a weak negative relationship between lifestyle risk and average scores. This means that higher lifestyle risk scores are generally associated with lower average scores, but the relationship is not strong.",
            "severity": "medium",
            "evidence": [
              {
                "metric": "lifestyle_risk_score",
                "value": "0.375",
                "comparison": "baseline",
                "delta": null,
                "context": "Selected student lifestyle risk score"
              },
              {
                "metric": "avg_score",
                "value": "36.67",
                "comparison": "baseline",
                "delta": null,
                "context": "Selected student average score"
              }
            ]
          }
        ],
        "educational_implications": [
          "Students may benefit from reflecting on their lifestyle choices and how these could impact their academic performance."
        ],
        "recommendations": [
          {
            "priority": "high",
            "action": "Consider adopting healthier lifestyle habits.",
            "rationale": "Improving lifestyle choices may help enhance academic performance based on the observed correlation."
          }
        ],
        "warnings": []
      },
      "confidence": {
        "level": "HIGH",
        "reason": "The data quality is reliable, with a sufficient sample size for analysis.",
        "based_on": [
          "sufficient_data"
        ]
      },
      "explanation_strategy": "correlation",
      "explanation_type": "correlation",
      "ai_summary_method": "task_aware_data_summarization",
      "ai_summary_version": "v3.1-experimental",
      "baseline_available": true,
      "input_summary_type": "correlation_evidence",
      "ai_summary_method_warning": null,
      "full_result_row_count": 649,
      "included_row_count": 15,
      "small_result_threshold": null,
      "small_result_full_rows_applied": null,
      "dataset_row_breakdown": [
        {
          "dataset_name": "lifestyle_risk_scatter",
          "row_count": 649,
          "included_row_count": 15
        }
      ],
      "raw_row_limit": 15,
      "included_raw_row_count": 15,
      "baseline_reference_tokens": 1620,
      "task_aware_prompt_tokens": 1859,
      "token_ratio": 1.1475,
      "token_count_method": "utf8_bytes_div_4",
      "evidence_sections_included": [
        "scope",
        "primary_finding",
        "comparison",
        "trend_relationship",
        "exceptions",
        "limitations"
      ],
      "evidence_sections_omitted": [],
      "task_output_contract": [],
      "must_keep_keys": [],
      "v3_warnings": [],
      "safety_flags": [],
      "degraded": false,
      "meta": {
        "model": "gpt-4o-mini-2024-07-18",
        "latency_ms": 6060,
        "token_usage": {
          "prompt_tokens": 2860,
          "completion_tokens": 354,
          "total_tokens": 3214
        },
        "strategy": "correlation",
        "granularity": "semester",
        "cost_usd": 0.000641
      }
    },
    "generation_metadata": {
      "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.json",
      "explanation_artifact_sha256": "2ddc365e3a231d1b428e6892e2c1801fc746b8c54cc99dbd585681967a70f2a1",
      "ai_service_url": "http://localhost:8000",
      "expected_ai_summary_method": "task_aware_data_summarization",
      "observed_ai_summary_method": "task_aware_data_summarization",
      "degraded": false,
      "model": "gpt-4o-mini-2024-07-18",
      "token_usage": {
        "prompt_tokens": 2860,
        "completion_tokens": 354,
        "total_tokens": 3214
      },
      "latency_ms": 6069,
      "attempts_used": 2
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
