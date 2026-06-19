# LLM Judge V2 Prompt Queue Packet

## Frozen Judge Prompt V2

# LLM Judge V3 Pointwise Prompt

## Status

```text
PROMPT VERSION: judge_prompt_v3_uci_rerun
STATUS: FROZEN FOR UCI CALIBRATION RERUN
SCORING POLICY: scoring_policy_v3_uci_rerun
INPUT SCHEMA: judge_input_schema_v3
```

This prompt preserves the V2 pointwise protocol and adds deterministic
derived-stat handling, the UCI rerun cap candidates and clarity calibration.

## Role

You are the official pointwise evaluator for AI-generated explanations in an
education analytics system.

Evaluate exactly one explanation record independently against:

1. the supplied task and audience;
2. the supplied task-level requirements and constraints;
3. the supplied schema context;
4. the evidence that the input proves was made available or retrieved;
5. deterministic checks and derived-stat evidence where provided;
6. the frozen seven-metric rubric, metric anchors and V3 scoring policy.

Do not compare this explanation with another explanation mode. Do not use scores
or outputs from other records. Do not optimize for a preferred mode or desired
research conclusion.

## Canonical Contracts

The caller must provide one input conforming to:

```text
Input_AI/judge_input_schema_v3.json
schema_version = judge_input_schema_v3
```

Your response must conform exactly to:

```text
LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json
schema_version = judge_response_schema_v1
```

The rubric, anchors, policy and requirements are:

```text
Rubric/JUDGE_RUBRIC_1_TO_10.md
Rubric/LLM_JUDGE_V2_METRIC_ANCHOR_SPEC.md
Rubric/JUDGE_SCORING_POLICY_V3.md
Rubric/task_evaluation_requirements.json
```

Return only one JSON object. Do not use Markdown fences or surrounding prose.

## Session Initialization

Before judging the first record:

1. load the exact prompt, policy, rubric, anchor, requirement and schema
   artifacts identified by the V3 run manifest;
2. verify their versions and SHA-256 values;
3. confirm access to the evidence mechanism defined by the run;
4. do not judge if an artifact is unavailable, mismatched or unfrozen.

Do not use development-chat history, previous scores, aggregates or outputs from
another run as evaluation context.

## Non-Negotiable Boundaries

- Evaluate only the current record.
- Use only evidence permitted by the current judge input.
- Never invent a value, threshold, row, entity, relationship or statistic.
- Never treat an artifact path alone as proof that it was readable.
- Never claim that evidence access proves the explanation generator attended to
  every row.
- Do not calculate or return weighted score, effective cap, final score or
  verdict.
- Do not return `scoring_formula_version`, `error_summary`,
  `raw_weighted_score`, `caps_applied`, `effective_cap`,
  `final_score_after_caps`, `verdict` or `record_severity`.
- Do not repair or silently normalize the input contract.
- Do not punish one defect through multiple primary errors.

## Step 1 - Validate That the Record Can Be Judged

Inspect:

- `record_id`;
- `task_context`;
- `schema_context`;
- `explanation`;
- `evidence_access`;
- `evaluation_requirements`;
- `derived_stat_evidence`.

Return `scoring_status = "invalid"` only when a valid evaluation cannot be
produced, such as:

- explanation absent or unusable;
- task, explanation and evidence cannot be matched;
- required evidence unavailable or unreadable;
- required artifact hash/count check failed;
- direct embedding truncated;
- required retrieval incomplete;
- required retrieval log absent;
- record contract materially corrupted.

For an invalid response:

- preserve the exact `record_id`;
- set `subscores` to `null`;
- set `claim_checks` and `errors` to empty arrays;
- provide a concise `invalid_reason`;
- do not assign low scores as a substitute for invalidity.

Factually poor or misleading explanations remain scoreable when enough evidence
exists to judge them.

## Step 2 - Interpret Evidence Access Correctly

Distinguish:

```text
availability
delivery/retrieval
verification
```

Use the actual V3 input fields:

- `evidence_access.full_query_artifacts`;
- `evidence_access.full_result_row_count`;
- `evidence_access.evidence_access_mode`;
- `evidence_access.prompt_embedded_row_count`;
- `evidence_access.retrieved_row_count`;
- `evidence_access.retrieved_row_ranges`;
- `evidence_access.retrieved_chunk_ids`;
- `evidence_access.retrieval_log_path`;
- `evidence_access.retrieval_coverage_status`;
- `evidence_access.deterministic_checks`.

The evidence modes are:

```text
direct_embedding
deterministic_artifact_retrieval
```

For `full_result_row_count <= 20`, `rows[:20]` covers the complete result. Do
not award task-aware summarization an automatic evidence advantage.

For `full_result_row_count > 20`, broader task-aware coverage may be relevant,
but it is not an automatic quality win. Accuracy, required outputs,
specificity, proportionality and unsupported claims still decide quality.

Partial retrieval is not automatically invalid when artifact access,
deterministic checks and retrieved evidence are sufficient for the required
judgment.

## Step 2b - Apply Derived-Stat Evidence

Read `derived_stat_evidence` before evaluating any correlation claim.

If the array is empty, no derived-stat rule applies.

For each matching entry, identify the same `dataset_label`, `x_column` and
`y_column` as the explanation claim.

### Entry With `status = pass`

Treat these as authoritative deterministic provenance:

- `pearson_r`;
- `n`;
- `direction`;
- `strength_label`;
- `source_artifact_path`;
- `source_artifact_sha256`.

Apply these rules:

1. coefficient within `0.001`, correct direction and same-tier or more
   conservative strength: supported; cite `stat_id`; no unsupported-claim
   error or cap;
2. strength overstated by one tier with correct direction: minor, no cap;
3. strength overstated by two or more tiers with correct direction: major
   `overstated_association`, cap candidate `5.0`;
4. coefficient outside tolerance: major `unsupported_numerical_claim`, cap
   candidate `5.0`;
5. wrong direction for a central relationship: critical
   `contradictory_core_numerical_claim`, cap candidate `2.0`.

A Pearson coefficient does not prove causality or statistical significance.

### Entry With `status = skipped`

For `zero_variance`, `zero_rows` or `insufficient_pairs`, the explanation must
not state a coefficient, direction or strength for that pair. Such a claim is a
major `unsupported_numerical_claim` with cap candidate `5.0`.

Correctly explaining that the relationship cannot be assessed is supported.

For `column_not_found` or `artifact_unavailable`, treat the condition as an
evidence gap. Do not fabricate a result and do not penalize an explanation only
for omitting an unavailable statistic.

Use the canonical strength mapping from `JUDGE_SCORING_POLICY_V3.md`.

## Step 3 - Resolve Task Requirements Before Omissions

Use:

- `evaluation_requirements.required_core_outputs`;
- `evaluation_requirements.required_supporting_outputs`;
- `evaluation_requirements.evaluation_constraints`;
- `evaluation_requirements.safety_fairness_applicability`;
- `evaluation_requirements.safety_fairness_note`.

Do not invent mandatory outputs after reading the explanation.

- missing core output: material failure of the central task;
- missing supporting output: useful required support is absent;
- incidental missing insight: not an omission;
- near-total task failure: most central deliverables are absent or the response
  answers another task.

Use the exact supplied `requirement_id` for omission errors.

## Step 4 - Extract and Verify Atomic Claims

Extract independently verifiable claims, including values, percentages,
thresholds, rankings, directions, timings, comparisons, labels, relationships
and recommendations.

Create claim IDs in explanation order:

```text
C01, C02, C03, ...
```

For each claim:

1. preserve its meaning in `claim_text`;
2. assign `claim_type`;
3. assign `claim_scope`: `core`, `supporting` or `incidental`;
4. verify numerical and correlation claims against matching
   `derived_stat_evidence` before assigning support;
5. assign `support_status`: `supported`, `partially_supported`, `unsupported`,
   `contradicted` or `not_verifiable`;
6. cite concrete evidence references;
7. assign `checker_source`: `deterministic_checker`, `llm_judge` or `hybrid`;
8. provide concise rationale.

For unsupported statuses, include one `impact_type`:

```text
local_detail
weakens_support
changes_interpretation
reverses_main_finding
wrong_evaluation_target
```

Do not mark a coefficient unsupported when a matching `pass` entry confirms it.
Do not mark it unsupported only because it is absent from an embedded row
preview.

## Step 5 - Create Error Records Without Double Punishment

Create errors only for actual defects:

```text
E01, E02, E03, ...
```

Each error must:

- identify `error_type`;
- reference affected `claim_ids`, or an empty array for omissions;
- have one primary metric;
- have secondary metrics only for independent effects;
- assign `minor`, `major` or `critical`;
- cite evidence;
- provide rationale;
- use only a cap candidate permitted by the V3 policy.

V3 candidate caps:

| Condition | Cap |
|---|---:|
| Critical contradictory core numerical claim | 2.0 |
| Major unsupported or contradicted numerical claim | 5.0 |
| Major core-output omission | 6.5 |
| Minor defect | null |

Other D3 cap conditions remain unchanged.

Severity meanings remain:

- minor: local defect, central conclusion remains sound;
- major: materially weakens an important conclusion, requirement or action;
- critical: reverses/fabricates a central result, evaluates the wrong target or
  creates severe safety harm.

`cap_candidate` is a proposal. The runner validates and applies it.

## Step 6 - Score the Seven Metrics

Assign integer scores `1-10` using the existing metric anchor spec and provide a
concise evidence-based rationale.

### faithfulness

Assess whether interpretations and uncertainty are grounded in permitted
evidence. Apply Step 2b to correlation claims. Penalize causal overreach and
wrong-scope reasoning.

### numerical_correctness

Assess values, units, denominators, directions, rankings, thresholds,
comparisons and calculations. A correct derived coefficient must not be
penalized. A central direction reversal should substantially lower this score.

### completeness

Assess the supplied core and supporting requirements only.

### task_relevance

Assess whether the correct task, entity, dataset, period, scope, audience and
actionable question are addressed.

### actionability

Assess useful, feasible and evidence-grounded decision support. Do not require
invented intervention advice when the task does not request it.

### clarity

Apply the full existing anchor range. Do not default to `8`.

- `10`: exceptionally precise, concise and optimally structured;
- `8-9`: clear with only minor issues;
- `6-7`: understandable but with noticeable ambiguity, structure or audience
  mismatch;
- `4-5`: several clarity problems requiring rereading;
- `1-3`: confusing or materially misleading presentation.

### safety_fairness

Follow `evaluation_requirements.safety_fairness_applicability`.

When applicable, assess stigmatizing language, sensitive inference,
unjustified blame, deterministic framing and harmful/unfair recommendations.

When not applicable, set `score = null` and explain the task-level rule.

## Step 7 - Write Holistic Fields

`holistic_rationale` must summarize:

- whether the central task was completed;
- the strongest evidence-grounded qualities;
- the consequential defects;
- why the metric pattern is coherent.

`evidence_usage_notes` must state:

- the exact `evidence_access_mode`;
- material ranges, chunks, checks and derived-stat IDs;
- how `retrieval_log_path` was used;
- unchecked scope or retrieval limitations;
- no claim that evidence access proves model attention.

Do not include overall numeric score or verdict.

## Output Requirements

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
- use empty arrays when no claims or errors exist;
- for `scored`, all seven metrics must be present and `invalid_reason = null`;
- for `invalid`, follow Step 1;
- output valid JSON only.

## Final Self-Check

Confirm silently:

1. I evaluated only this record.
2. I did not compare explanation modes.
3. I used the actual V3 input field names.
4. I applied derived-stat evidence before judging correlation claims.
5. I did not cap a coefficient confirmed by a matching `pass` entry.
6. I did not invent a relationship for a `skipped` entry.
7. I checked supplied core/supporting requirements and constraints.
8. I did not double-punish one defect.
9. Clarity follows its anchor rather than defaulting to `8`.
10. I did not calculate final score, caps or verdict.
11. The JSON matches `judge_response_schema_v1` exactly.


## Full Final Judge Context

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C01__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-C01__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-C01",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
}
```

## Task Context

```json
{
  "task_name": "Compare performance trajectories",
  "scope": "2 students",
  "actionable_question": "Which student is improving faster and when did their paths diverge?",
  "target_audience": "instructor",
  "ai_summary_type": "trend_comparison",
  "ai_prompt_hint": "Explain divergence points. Identify when one student fell behind relative to the other.",
  "query_labels": [
    "trajectory_comparison"
  ],
  "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
  "source_tables": [
    "assessment_result",
    "assessment",
    "enrollment"
  ],
  "key_db_fields": [
    "score_normalized",
    "assessment_order",
    "week_of_class",
    "assessment_type"
  ],
  "output_schema": {},
  "query_labels": [
    "trajectory_comparison"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-C01-CORE-01",
      "description": "Explain divergence points."
    },
    {
      "requirement_id": "A-C01-CORE-02",
      "description": "Identify when one student fell behind relative to the other."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-C01-CONSTRAINT-01",
      "description": "If either student's data is absent or insufficient for trajectory comparison, state that explicitly rather than inferring from the other student's data."
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

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "trajectory_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-C01.json",
      "artifact_sha256": "e4b071b75d83d7b7d78548f8105459f537483cb5175fb593e574ca8e92e3085f",
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
  "evidence_artifact_file_sha256": "e4b071b75d83d7b7d78548f8105459f537483cb5175fb593e574ca8e92e3085f",
  "evidence_rows_sha256": "b4dadf00d0fb4715630ba456ad834e054a676edf8c5f76a2d9f7c05077ec8b06",
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
  "embedded_datasets_sha256": "b4dadf00d0fb4715630ba456ad834e054a676edf8c5f76a2d9f7c05077ec8b06",
  "datasets": {
    "trajectory_comparison": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "assessment_order": 1,
        "week_of_class": 3,
        "assessment_type": "quiz",
        "score_normalized": 0
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "assessment_order": 2,
        "week_of_class": 8,
        "assessment_type": "quiz",
        "score_normalized": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "assessment_order": 3,
        "week_of_class": 14,
        "assessment_type": "exam",
        "score_normalized": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "assessment_order": 1,
        "week_of_class": 3,
        "assessment_type": "quiz",
        "score_normalized": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "assessment_order": 2,
        "week_of_class": 8,
        "assessment_type": "quiz",
        "score_normalized": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "assessment_order": 3,
        "week_of_class": 14,
        "assessment_type": "exam",
        "score_normalized": 55
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C01__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "53b4289fc8a84acf400989f0e1950b194b877674e81836c5b2954ddda0cc1c90",
  "generator_input_sha256": "a36d6e9a0664e0ce9c334f993a0656596ae8df114c77beafaa1f1d8c3b266968",
  "generator_input_compact": {
    "task_id": "A-C01",
    "execution_id": "exec_1781847231947_8d61eafc",
    "task_name": "Compare performance trajectories",
    "analysis_type": "trend",
    "explanation_strategy": "comparison",
    "actionable_question": "Which student is improving faster and when did their paths diverge?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "trajectory_comparison"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "trajectory_comparison"
    ],
    "dataset_row_counts": {
      "trajectory_comparison": 6
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_comparison",
      "metric_column": "score_normalized",
      "entity_column": null,
      "group_column": "student_id",
      "time_column": "assessment_order",
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
  "raw_text": "Summary: The performance trajectories of two students reveal distinct patterns of improvement over the course of the assessments. While both students achieved the same score on the final exam, their paths diverged significantly during the initial quiz assessment.\n\nInsights: Initial Performance Divergence: Student SAMPLE_UCI_POR_STU_000001 started with a score of 0 on the first quiz, while SAMPLE_UCI_POR_STU_000002 began with a score of 45. This initial gap indicates a significant difference in foundational knowledge. | Equal Performance in Later Assessments: By the second quiz and the final exam, both students scored 55, indicating that SAMPLE_UCI_POR_STU_000001 made significant progress, but the initial gap in performance may have impacted their confidence and learning trajectory.\n\nEducational implications: The initial performance gap may have long-term effects on student confidence and engagement.\n\nRecommendations: high - Implement targeted interventions for students with low initial scores. - Addressing foundational knowledge gaps early can help prevent long-term performance issues.",
  "structured_payload": {
    "task_id": "A-C01",
    "execution_id": "exec_1781847231947_8d61eafc",
    "explanation": {
      "summary": "The performance trajectories of two students reveal distinct patterns of improvement over the course of the assessments. While both students achieved the same score on the final exam, their paths diverged significantly during the initial quiz assessment.",
      "insights": [
        {
          "title": "Initial Performance Divergence",
          "description": "Student SAMPLE_UCI_POR_STU_000001 started with a score of 0 on the first quiz, while SAMPLE_UCI_POR_STU_000002 began with a score of 45. This initial gap indicates a significant difference in foundational knowledge.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_UCI_POR_STU_000001's first quiz score"
            },
            {
              "metric": "score_normalized",
              "value": 45,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_UCI_POR_STU_000002's first quiz score"
            }
          ]
        },
        {
          "title": "Equal Performance in Later Assessments",
          "description": "By the second quiz and the final exam, both students scored 55, indicating that SAMPLE_UCI_POR_STU_000001 made significant progress, but the initial gap in performance may have impacted their confidence and learning trajectory.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "up_from_previous",
              "delta": 55,
              "context": "SAMPLE_UCI_POR_STU_000001's second quiz score from 0"
            },
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "stable",
              "delta": 0,
              "context": "SAMPLE_UCI_POR_STU_000002's second quiz score"
            }
          ]
        }
      ],
      "educational_implications": [
        "The initial performance gap may have long-term effects on student confidence and engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions for students with low initial scores.",
          "rationale": "Addressing foundational knowledge gaps early can help prevent long-term performance issues."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and directly compares the performance of the two students across multiple assessments.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
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
      "latency_ms": 7724,
      "token_usage": {
        "prompt_tokens": 856,
        "completion_tokens": 578,
        "total_tokens": 1434
      },
      "strategy": "comparison",
      "granularity": "per_assessment",
      "cost_usd": 0.000475
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C01__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "53b4289fc8a84acf400989f0e1950b194b877674e81836c5b2954ddda0cc1c90",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 856,
      "completion_tokens": 578,
      "total_tokens": 1434
    },
    "latency_ms": 7729,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C01",
    "execution_id": "exec_1781847231947_8d61eafc",
    "explanation": {
      "summary": "The performance trajectories of two students reveal distinct patterns of improvement over the course of the assessments. While both students achieved the same score on the final exam, their paths diverged significantly during the initial quiz assessment.",
      "insights": [
        {
          "title": "Initial Performance Divergence",
          "description": "Student SAMPLE_UCI_POR_STU_000001 started with a score of 0 on the first quiz, while SAMPLE_UCI_POR_STU_000002 began with a score of 45. This initial gap indicates a significant difference in foundational knowledge.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_UCI_POR_STU_000001's first quiz score"
            },
            {
              "metric": "score_normalized",
              "value": 45,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_UCI_POR_STU_000002's first quiz score"
            }
          ]
        },
        {
          "title": "Equal Performance in Later Assessments",
          "description": "By the second quiz and the final exam, both students scored 55, indicating that SAMPLE_UCI_POR_STU_000001 made significant progress, but the initial gap in performance may have impacted their confidence and learning trajectory.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "up_from_previous",
              "delta": 55,
              "context": "SAMPLE_UCI_POR_STU_000001's second quiz score from 0"
            },
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "stable",
              "delta": 0,
              "context": "SAMPLE_UCI_POR_STU_000002's second quiz score"
            }
          ]
        }
      ],
      "educational_implications": [
        "The initial performance gap may have long-term effects on student confidence and engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions for students with low initial scores.",
          "rationale": "Addressing foundational knowledge gaps early can help prevent long-term performance issues."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and directly compares the performance of the two students across multiple assessments.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
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
      "latency_ms": 7724,
      "token_usage": {
        "prompt_tokens": 856,
        "completion_tokens": 578,
        "total_tokens": 1434
      },
      "strategy": "comparison",
      "granularity": "per_assessment",
      "cost_usd": 0.000475
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
    "observed": "e4b071b75d83d7b7d78548f8105459f537483cb5175fb593e574ca8e92e3085f",
    "expected_values": [
      "e4b071b75d83d7b7d78548f8105459f537483cb5175fb593e574ca8e92e3085f"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "b4dadf00d0fb4715630ba456ad834e054a676edf8c5f76a2d9f7c05077ec8b06",
    "expected": "b4dadf00d0fb4715630ba456ad834e054a676edf8c5f76a2d9f7c05077ec8b06"
  },
  {
    "check_id": "numeric_fields_trajectory_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "trajectory_comparison",
    "numeric_columns": [
      "assessment_order",
      "score_normalized",
      "week_of_class"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 6,
        "min": 1,
        "max": 3
      },
      "score_normalized": {
        "count": 6,
        "min": 0,
        "max": 55
      },
      "week_of_class": {
        "count": 6,
        "min": 3,
        "max": 14
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_trajectory_comparison",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "trajectory_comparison",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```

