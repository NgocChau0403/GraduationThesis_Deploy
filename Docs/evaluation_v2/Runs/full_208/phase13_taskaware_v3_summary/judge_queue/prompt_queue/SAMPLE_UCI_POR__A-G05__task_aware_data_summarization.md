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

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G05__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G05__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G05",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Submission behaviour analysis",
  "scope": "Many students",
  "actionable_question": "Are late submissions a systemic problem in this class?",
  "target_audience": "instructor",
  "ai_summary_type": "group_comparison",
  "ai_prompt_hint": "Use final_outcome, assessment_type, submission_delay_avg, late_submission_rate, and punctuality_rate to decide whether late submission is systemic. Prioritize groups with high late_submission_rate and high student_count. Do not discuss individual students.",
  "query_labels": [
    "submission_behaviour"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
    "assessment_result",
    "assessment",
    "enrollment [OULAD only]"
  ],
  "key_db_fields": [
    "final_outcome [FE cross]",
    "assessment_type [FE cross]",
    "submission_delay_avg [FE cross]",
    "late_submission_rate [FE cross]",
    "punctuality_rate [FE cross]",
    "student_count",
    "submission_count",
    "avg_score",
    "submission_risk_level"
  ],
  "output_schema": {
    "required_columns": [
      "final_outcome",
      "assessment_type",
      "submission_delay_avg",
      "late_submission_rate"
    ],
    "optional_columns": [
      "submission_count",
      "student_count",
      "net_submission_delay_avg",
      "punctuality_rate",
      "avg_score",
      "submission_risk_level"
    ]
  },
  "query_labels": [
    "submission_behaviour"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G05-CORE-01",
      "description": "Use final_outcome, assessment_type, submission_delay_avg, late_submission_rate, and punctuality_rate to decide whether late submission is systemic."
    },
    {
      "requirement_id": "A-G05-CORE-02",
      "description": "Prioritize groups with high late_submission_rate and high student_count."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G05-CONSTRAINT-01",
      "description": "Do not discuss individual students."
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
      "dataset_label": "submission_behaviour",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G05.json",
      "artifact_sha256": "f3d0c30306a5895a2f9161612693fc4bc0d68f85a22919ba2895d161f217c1ab",
      "row_count": 4,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 4,
  "prompt_embedded_row_count": 4,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "f3d0c30306a5895a2f9161612693fc4bc0d68f85a22919ba2895d161f217c1ab",
  "evidence_rows_sha256": "7bc0a85ec862c0630f50f2382b4c8ea92773d81a035f2c6dbaab8a1c8d6eed2d",
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
  "full_result_row_count": 4,
  "embedded_datasets_sha256": "7bc0a85ec862c0630f50f2382b4c8ea92773d81a035f2c6dbaab8a1c8d6eed2d",
  "datasets": {
    "submission_behaviour": [
      {
        "final_outcome": "Fail",
        "assessment_type": "exam",
        "submission_count": 100,
        "student_count": 100,
        "submission_delay_avg": 0,
        "net_submission_delay_avg": 0,
        "late_submission_rate": 0,
        "punctuality_rate": 0,
        "avg_score": 34.45,
        "submission_risk_level": "low_lateness"
      },
      {
        "final_outcome": "Fail",
        "assessment_type": "quiz",
        "submission_count": 200,
        "student_count": 100,
        "submission_delay_avg": 0,
        "net_submission_delay_avg": 0,
        "late_submission_rate": 0,
        "punctuality_rate": 0,
        "avg_score": 38.28,
        "submission_risk_level": "low_lateness"
      },
      {
        "final_outcome": "Pass",
        "assessment_type": "exam",
        "submission_count": 549,
        "student_count": 549,
        "submission_delay_avg": 0,
        "net_submission_delay_avg": 0,
        "late_submission_rate": 0,
        "punctuality_rate": 0,
        "avg_score": 64.1,
        "submission_risk_level": "low_lateness"
      },
      {
        "final_outcome": "Pass",
        "assessment_type": "quiz",
        "submission_count": 1098,
        "student_count": 549,
        "submission_delay_avg": 0,
        "net_submission_delay_avg": 0,
        "late_submission_rate": 0,
        "punctuality_rate": 0,
        "avg_score": 60.91,
        "submission_risk_level": "low_lateness"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G05__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "c6dedf579661baf545a5c8b38ad94cf8ecbdbaaca46c0bc917d8b84b8cb1fef0",
  "generator_input_sha256": "95c33166c2fed61d61f49aba2c97fff7960e56037a003b6f5a25a10066dddfc4",
  "generator_input_compact": {
    "task_id": "A-G05",
    "execution_id": "exec_1781847232447_366211a6",
    "task_name": "Submission behaviour analysis",
    "analysis_type": "comparison",
    "explanation_strategy": "behavioral",
    "actionable_question": "Are late submissions a systemic problem in this class?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "submission_behaviour"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "submission_behaviour"
    ],
    "dataset_row_counts": {
      "submission_behaviour": 4
    },
    "ai_summary_config_summary": {
      "summary_type": "group_comparison",
      "metric_column": "late_submission_rate",
      "entity_column": null,
      "group_column": "final_outcome",
      "time_column": null,
      "sort_by": "late_submission_rate",
      "sort_direction": "desc",
      "top_k": 8,
      "bottom_k": 3,
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
  "raw_text": "Summary: The analysis reveals that late submissions are not a systemic problem in this class, as all groups exhibit a late submission rate of 0%. However, the average scores for failing students indicate a need for intervention. The engagement patterns suggest that while punctuality is maintained, the overall performance is lacking.\n\nInsights: Consistent Punctuality Across Assessments: All assessment types, both for passing and failing students, show a late submission rate of 0%, indicating that students are submitting their work on time. | Low Average Scores for Failing Students: Students who failed the assessments have significantly lower average scores (34.45 for exams and 38.28 for quizzes), suggesting a lack of understanding or engagement with the material.\n\nEducational implications: While students are punctual, the low average scores indicate a need for enhanced instructional support and engagement strategies.\n\nRecommendations: high - Implement targeted interventions for students with low average scores. - To improve understanding and performance, it is crucial to address the academic challenges faced by students who are failing.",
  "structured_payload": {
    "task_id": "A-G05",
    "execution_id": "exec_1781847232447_366211a6",
    "explanation": {
      "summary": "The analysis reveals that late submissions are not a systemic problem in this class, as all groups exhibit a late submission rate of 0%. However, the average scores for failing students indicate a need for intervention. The engagement patterns suggest that while punctuality is maintained, the overall performance is lacking.",
      "insights": [
        {
          "title": "Consistent Punctuality Across Assessments",
          "description": "All assessment types, both for passing and failing students, show a late submission rate of 0%, indicating that students are submitting their work on time.",
          "severity": "low",
          "evidence": [
            {
              "metric": "late_submission_rate",
              "value": 0,
              "comparison": "stable",
              "delta": null,
              "context": "All groups maintain a late submission rate of 0%."
            }
          ]
        },
        {
          "title": "Low Average Scores for Failing Students",
          "description": "Students who failed the assessments have significantly lower average scores (34.45 for exams and 38.28 for quizzes), suggesting a lack of understanding or engagement with the material.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 34.45,
              "comparison": "down_from_previous",
              "delta": -29.65,
              "context": "Average score for failing students in exams."
            },
            {
              "metric": "avg_score",
              "value": 38.28,
              "comparison": "down_from_previous",
              "delta": -21.73,
              "context": "Average score for failing students in quizzes."
            }
          ]
        }
      ],
      "educational_implications": [
        "While students are punctual, the low average scores indicate a need for enhanced instructional support and engagement strategies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions for students with low average scores.",
          "rationale": "To improve understanding and performance, it is crucial to address the academic challenges faced by students who are failing."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows consistent patterns with no late submissions, and the average scores provide a clear indication of student performance.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "group_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_behaviour",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 4,
    "baseline_reference_tokens": 327,
    "task_aware_prompt_tokens": 1005,
    "token_ratio": 3.0734,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.fairness_warnings",
      "limitations.low_count_warnings",
      "limitations.missing_groups",
      "exceptions.weakest_group",
      "exceptions.dominant_group",
      "comparison.gaps",
      "primary_finding.group_series"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.0734 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6151,
      "token_usage": {
        "prompt_tokens": 1601,
        "completion_tokens": 515,
        "total_tokens": 2116
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000549
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G05__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "c6dedf579661baf545a5c8b38ad94cf8ecbdbaaca46c0bc917d8b84b8cb1fef0",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1601,
      "completion_tokens": 515,
      "total_tokens": 2116
    },
    "latency_ms": 6170,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G05",
    "execution_id": "exec_1781847232447_366211a6",
    "explanation": {
      "summary": "The analysis reveals that late submissions are not a systemic problem in this class, as all groups exhibit a late submission rate of 0%. However, the average scores for failing students indicate a need for intervention. The engagement patterns suggest that while punctuality is maintained, the overall performance is lacking.",
      "insights": [
        {
          "title": "Consistent Punctuality Across Assessments",
          "description": "All assessment types, both for passing and failing students, show a late submission rate of 0%, indicating that students are submitting their work on time.",
          "severity": "low",
          "evidence": [
            {
              "metric": "late_submission_rate",
              "value": 0,
              "comparison": "stable",
              "delta": null,
              "context": "All groups maintain a late submission rate of 0%."
            }
          ]
        },
        {
          "title": "Low Average Scores for Failing Students",
          "description": "Students who failed the assessments have significantly lower average scores (34.45 for exams and 38.28 for quizzes), suggesting a lack of understanding or engagement with the material.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 34.45,
              "comparison": "down_from_previous",
              "delta": -29.65,
              "context": "Average score for failing students in exams."
            },
            {
              "metric": "avg_score",
              "value": 38.28,
              "comparison": "down_from_previous",
              "delta": -21.73,
              "context": "Average score for failing students in quizzes."
            }
          ]
        }
      ],
      "educational_implications": [
        "While students are punctual, the low average scores indicate a need for enhanced instructional support and engagement strategies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions for students with low average scores.",
          "rationale": "To improve understanding and performance, it is crucial to address the academic challenges faced by students who are failing."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows consistent patterns with no late submissions, and the average scores provide a clear indication of student performance.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "group_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_behaviour",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 4,
    "baseline_reference_tokens": 327,
    "task_aware_prompt_tokens": 1005,
    "token_ratio": 3.0734,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.fairness_warnings",
      "limitations.low_count_warnings",
      "limitations.missing_groups",
      "exceptions.weakest_group",
      "exceptions.dominant_group",
      "comparison.gaps",
      "primary_finding.group_series"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.0734 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6151,
      "token_usage": {
        "prompt_tokens": 1601,
        "completion_tokens": 515,
        "total_tokens": 2116
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000549
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
    "expected": 4,
    "observed": 4
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "f3d0c30306a5895a2f9161612693fc4bc0d68f85a22919ba2895d161f217c1ab",
    "expected_values": [
      "f3d0c30306a5895a2f9161612693fc4bc0d68f85a22919ba2895d161f217c1ab"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "7bc0a85ec862c0630f50f2382b4c8ea92773d81a035f2c6dbaab8a1c8d6eed2d",
    "expected": "7bc0a85ec862c0630f50f2382b4c8ea92773d81a035f2c6dbaab8a1c8d6eed2d"
  },
  {
    "check_id": "numeric_fields_submission_behaviour",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "submission_behaviour",
    "numeric_columns": [
      "avg_score",
      "late_submission_rate",
      "net_submission_delay_avg",
      "punctuality_rate",
      "student_count",
      "submission_count",
      "submission_delay_avg"
    ],
    "numeric_summaries": {
      "avg_score": {
        "count": 4,
        "min": 34.45,
        "max": 64.1
      },
      "late_submission_rate": {
        "count": 4,
        "min": 0,
        "max": 0
      },
      "net_submission_delay_avg": {
        "count": 4,
        "min": 0,
        "max": 0
      },
      "punctuality_rate": {
        "count": 4,
        "min": 0,
        "max": 0
      },
      "student_count": {
        "count": 4,
        "min": 100,
        "max": 549
      },
      "submission_count": {
        "count": 4,
        "min": 100,
        "max": 1098
      },
      "submission_delay_avg": {
        "count": 4,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_submission_behaviour",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "submission_behaviour",
    "flag_columns": [
      "submission_risk_level"
    ],
    "triggered_like_counts": {
      "submission_risk_level": 0
    }
  }
]
```

