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

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S07__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-S07__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-S07",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Student background context",
  "scope": "1 student",
  "actionable_question": "What background factors should admin consider when deciding how to support this student?",
  "target_audience": "academic_advisor, admin",
  "ai_summary_type": "metric_snapshot",
  "ai_prompt_hint": "Frame background factors as context, not judgement. Note which disadvantage dimensions are present and what support is already in place.",
  "query_labels": [
    "background_context"
  ],
  "explanation_strategy": "distribution"
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
    "socioeconomic_band",
    "disadvantage_score [FE single]",
    "support_score [FE single]",
    "family_stability_score [FE single]",
    "disability_flag",
    "internet_access_flag",
    "previous_attempt_count"
  ],
  "output_schema": {
    "required_columns": [
      "school",
      "family_size",
      "gender",
      "age_years",
      "school_support_flag",
      "family_support_flag",
      "has_paid_class",
      "internet_access_flag",
      "support_score",
      "lifestyle_risk_score",
      "social_balance_score",
      "family_stability_score"
    ],
    "optional_columns": [
      "highest_education",
      "mother_education_level",
      "father_education_level",
      "age_group",
      "previous_attempt_count",
      "studytime",
      "absences"
    ]
  },
  "query_labels": [
    "background_context"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-S07-CORE-01",
      "description": "Note which disadvantage dimensions are present and what support is already in place."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-S07-CONSTRAINT-01",
      "description": "Frame background factors as context, not judgement."
    },
    {
      "constraint_id": "A-S07-CONSTRAINT-02",
      "description": "Treat the output as professional advisor/admin context; do not expose raw disadvantage scores in student-facing wording."
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
      "dataset_label": "background_context",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S07.json",
      "artifact_sha256": "29f492d729f419d9bedc40a295a26cbcdc2437f460b158fda3570fa7c3b00211",
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
  "evidence_artifact_file_sha256": "29f492d729f419d9bedc40a295a26cbcdc2437f460b158fda3570fa7c3b00211",
  "evidence_rows_sha256": "cc044cb0aa663e6b21ead2bdc781df79bb9525d82e0ccfbe7b2795b382051a7c",
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
  "embedded_datasets_sha256": "cc044cb0aa663e6b21ead2bdc781df79bb9525d82e0ccfbe7b2795b382051a7c",
  "datasets": {
    "background_context": [
      {
        "highest_education": null,
        "mother_education_level": "4",
        "father_education_level": "4",
        "school": "GP",
        "family_size": "GT3",
        "gender": "F",
        "age_years": 18,
        "age_group": "18-20",
        "school_support_flag": true,
        "family_support_flag": false,
        "has_paid_class": false,
        "internet_access_flag": false,
        "support_score": 0.25,
        "lifestyle_risk_score": 0.47,
        "social_balance_score": 0.03,
        "family_stability_score": 0.58,
        "previous_attempt_count": 0,
        "studytime": 2,
        "absences": 4
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S07__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "d8a1a0d3274b399f9b7455cc87efaa96afe5bd192e9b91f8e6b94b71b993e552",
  "generator_input_sha256": "6fd155a80f4682a7bffb4611d0d310e6dda637c2a076591b3707a9e0188ec3dd",
  "generator_input_compact": {
    "task_id": "A-S07",
    "execution_id": "exec_1781847238136_ee2bf06a",
    "task_name": "Student background context",
    "analysis_type": "aggregation",
    "explanation_strategy": "distribution",
    "actionable_question": "What background factors should admin consider when deciding how to support this student?",
    "target_audience": [
      "academic_advisor",
      "admin"
    ],
    "query_labels": [
      "background_context"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "background_context"
    ],
    "dataset_row_counts": {
      "background_context": 1
    },
    "ai_summary_config_summary": {
      "summary_type": "metric_snapshot",
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
      "require_sensitive_context_policy": true,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: The dataset presents a single student's background context, highlighting various educational and social factors. The student exhibits a low support score and limited family support, indicating potential areas for administrative intervention.\n\nInsights: Low Support Score: The student's support score is 0.25, indicating a low level of support which may hinder academic performance. This score is significantly below the average threshold for effective support. | Family Support Absence: The absence of family support (family_support_flag: false) may contribute to the student's challenges, particularly in balancing study and personal life.\n\nEducational implications: The student may require additional institutional support to compensate for low family support and support score.\n\nRecommendations: high - Implement targeted support programs for students with low support scores. - To enhance academic performance and well-being for students lacking family support.",
  "structured_payload": {
    "task_id": "A-S07",
    "execution_id": "exec_1781847238136_ee2bf06a",
    "explanation": {
      "summary": "The dataset presents a single student's background context, highlighting various educational and social factors. The student exhibits a low support score and limited family support, indicating potential areas for administrative intervention.",
      "insights": [
        {
          "title": "Low Support Score",
          "description": "The student's support score is 0.25, indicating a low level of support which may hinder academic performance. This score is significantly below the average threshold for effective support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "support_score",
              "value": 0.25,
              "comparison": "baseline",
              "delta": null,
              "context": "Indicates low support for academic success."
            }
          ]
        },
        {
          "title": "Family Support Absence",
          "description": "The absence of family support (family_support_flag: false) may contribute to the student's challenges, particularly in balancing study and personal life.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "family_support_flag",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Lack of family support can impact student well-being."
            }
          ]
        }
      ],
      "educational_implications": [
        "The student may require additional institutional support to compensate for low family support and support score."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students with low support scores.",
          "rationale": "To enhance academic performance and well-being for students lacking family support."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a sufficient sample size for the metrics analyzed, although it is based on a single student.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "metric_snapshot",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "background_context",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 149,
    "task_aware_prompt_tokens": 882,
    "token_ratio": 5.9195,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "action_evidence.action_evidence",
      "exceptions.sensitive_context"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (5.9195 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5867,
      "token_usage": {
        "prompt_tokens": 1345,
        "completion_tokens": 411,
        "total_tokens": 1756
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000448
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S07__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "d8a1a0d3274b399f9b7455cc87efaa96afe5bd192e9b91f8e6b94b71b993e552",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1345,
      "completion_tokens": 411,
      "total_tokens": 1756
    },
    "latency_ms": 5877,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S07",
    "execution_id": "exec_1781847238136_ee2bf06a",
    "explanation": {
      "summary": "The dataset presents a single student's background context, highlighting various educational and social factors. The student exhibits a low support score and limited family support, indicating potential areas for administrative intervention.",
      "insights": [
        {
          "title": "Low Support Score",
          "description": "The student's support score is 0.25, indicating a low level of support which may hinder academic performance. This score is significantly below the average threshold for effective support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "support_score",
              "value": 0.25,
              "comparison": "baseline",
              "delta": null,
              "context": "Indicates low support for academic success."
            }
          ]
        },
        {
          "title": "Family Support Absence",
          "description": "The absence of family support (family_support_flag: false) may contribute to the student's challenges, particularly in balancing study and personal life.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "family_support_flag",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Lack of family support can impact student well-being."
            }
          ]
        }
      ],
      "educational_implications": [
        "The student may require additional institutional support to compensate for low family support and support score."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students with low support scores.",
          "rationale": "To enhance academic performance and well-being for students lacking family support."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a sufficient sample size for the metrics analyzed, although it is based on a single student.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "metric_snapshot",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "background_context",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 149,
    "task_aware_prompt_tokens": 882,
    "token_ratio": 5.9195,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "action_evidence.action_evidence",
      "exceptions.sensitive_context"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (5.9195 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5867,
      "token_usage": {
        "prompt_tokens": 1345,
        "completion_tokens": 411,
        "total_tokens": 1756
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000448
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
    "observed": "29f492d729f419d9bedc40a295a26cbcdc2437f460b158fda3570fa7c3b00211",
    "expected_values": [
      "29f492d729f419d9bedc40a295a26cbcdc2437f460b158fda3570fa7c3b00211"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "cc044cb0aa663e6b21ead2bdc781df79bb9525d82e0ccfbe7b2795b382051a7c",
    "expected": "cc044cb0aa663e6b21ead2bdc781df79bb9525d82e0ccfbe7b2795b382051a7c"
  },
  {
    "check_id": "numeric_fields_background_context",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "background_context",
    "numeric_columns": [
      "absences",
      "age_years",
      "family_stability_score",
      "lifestyle_risk_score",
      "previous_attempt_count",
      "social_balance_score",
      "studytime",
      "support_score"
    ],
    "numeric_summaries": {
      "absences": {
        "count": 1,
        "min": 4,
        "max": 4
      },
      "age_years": {
        "count": 1,
        "min": 18,
        "max": 18
      },
      "family_stability_score": {
        "count": 1,
        "min": 0.58,
        "max": 0.58
      },
      "lifestyle_risk_score": {
        "count": 1,
        "min": 0.47,
        "max": 0.47
      },
      "previous_attempt_count": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "social_balance_score": {
        "count": 1,
        "min": 0.03,
        "max": 0.03
      },
      "studytime": {
        "count": 1,
        "min": 2,
        "max": 2
      },
      "support_score": {
        "count": 1,
        "min": 0.25,
        "max": 0.25
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_background_context",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "background_context",
    "flag_columns": [
      "school_support_flag",
      "family_support_flag",
      "internet_access_flag",
      "lifestyle_risk_score"
    ],
    "triggered_like_counts": {
      "school_support_flag": 1,
      "family_support_flag": 0,
      "internet_access_flag": 0,
      "lifestyle_risk_score": 0
    }
  }
]
```

