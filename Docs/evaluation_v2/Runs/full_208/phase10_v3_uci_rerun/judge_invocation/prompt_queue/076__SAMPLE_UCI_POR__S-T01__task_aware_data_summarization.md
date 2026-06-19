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

# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T01__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T01",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
}
```

## Task Context

```json
{
  "task_name": "Score trend analysis",
  "scope": "1 student",
  "actionable_question": "Am I getting better or worse over time?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Identify trend direction, assessments below pass/target thresholds, and the concrete recommended_action for the weakest recent assessment.",
  "query_labels": [
    "score_trend"
  ],
  "explanation_strategy": "trend"
}
```

## Schema Context

```json
{
  "source_tables": [
    "assessment_result",
    "assessment"
  ],
  "key_db_fields": [
    "score_normalized",
    "assessment_order",
    "week_of_class",
    "assessment_type; performance_trend [FE cross]"
  ],
  "output_schema": {
    "required_columns": [
      "assessment_order",
      "score_normalized",
      "pass_flag"
    ],
    "optional_columns": [
      "week_of_class",
      "assessment_type",
      "assessment_name",
      "class_avg_score",
      "score_vs_class_avg",
      "score_scale",
      "pass_threshold",
      "target_threshold",
      "below_pass_threshold",
      "below_target_threshold",
      "performance_trend",
      "support_level",
      "recommended_action"
    ]
  },
  "query_labels": [
    "score_trend"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T01-CORE-01",
      "description": "Identify the observed score trend direction."
    },
    {
      "requirement_id": "S-T01-CORE-02",
      "description": "Identify assessments below returned pass or target thresholds."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "S-T01-SUPPORT-01",
      "description": "Provide recommended_action for the weakest recent assessment only when that field is present."
    }
  ],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T01-CONSTRAINT-01",
      "description": "If fewer than 3 assessment data points are available, state that evidence is insufficient for a reliable trend rather than asserting a stable direction."
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
      "dataset_label": "score_trend",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T01.json",
      "artifact_sha256": "b37c65f01545c86add435353b640b163231a341b9bfdaba9715d46d90567cebb",
      "row_count": 3,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 3,
  "prompt_embedded_row_count": 3,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "b37c65f01545c86add435353b640b163231a341b9bfdaba9715d46d90567cebb",
  "evidence_rows_sha256": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9",
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
  "full_result_row_count": 3,
  "embedded_datasets_sha256": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9",
  "datasets": {
    "score_trend": [
      {
        "assessment_order": 1,
        "week_of_class": 3,
        "assessment_type": "quiz",
        "assessment_name": "G1",
        "score_normalized": 0,
        "pass_flag": false,
        "class_avg_score": 57,
        "score_vs_class_avg": -57,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": true,
        "below_target_threshold": true,
        "performance_trend": 27.5,
        "support_level": "urgent_support",
        "recommended_action": "Review this assessment with tutor support; focus on missed core concepts before the next assessment."
      },
      {
        "assessment_order": 2,
        "week_of_class": 8,
        "assessment_type": "quiz",
        "assessment_name": "G2",
        "score_normalized": 55,
        "pass_flag": true,
        "class_avg_score": 57.85,
        "score_vs_class_avg": -2.85,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": false,
        "below_target_threshold": true,
        "performance_trend": 27.5,
        "support_level": "targeted_practice",
        "recommended_action": "Practice similar questions and review feedback to move from pass-level to target-level performance."
      },
      {
        "assessment_order": 3,
        "week_of_class": 14,
        "assessment_type": "exam",
        "assessment_name": "G3",
        "score_normalized": 55,
        "pass_flag": true,
        "class_avg_score": 59.53,
        "score_vs_class_avg": -4.53,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": false,
        "below_target_threshold": true,
        "performance_trend": 27.5,
        "support_level": "targeted_practice",
        "recommended_action": "Practice similar questions and review feedback to move from pass-level to target-level performance."
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T01__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "96e7c6ce4f89c9630b84d5c01e80a311b02c6f9d05c05275140b909ac7dfdcba",
  "generator_input_sha256": "efd31a65b8635e4b75980598056337f73eb5a260788a5de87ef496f68560f030",
  "generator_input_compact": {
    "task_id": "S-T01",
    "execution_id": "exec_1781847241776_40422500",
    "task_name": "Score trend analysis",
    "analysis_type": "trend",
    "explanation_strategy": "trend",
    "actionable_question": "Am I getting better or worse over time?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "score_trend"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "score_trend"
    ],
    "dataset_row_counts": {
      "score_trend": 3
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "score_normalized",
      "entity_column": null,
      "group_column": null,
      "time_column": "assessment_order",
      "sort_by": null,
      "sort_direction": "asc",
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
  "raw_text": "Summary: Your performance shows an overall improvement from Assessment 1 to Assessment 2, but it has plateaued in Assessment 3. While you passed the last two assessments, your scores remain below the target threshold, indicating room for growth.\n\nInsights: Initial Struggles and Improvement: In Assessment 1, you scored 0, which is significantly below the pass threshold. By Assessment 2, your score improved to 55, marking a positive change of +55 points. | Plateau in Performance: Your score remained at 55 in Assessment 3, indicating no further improvement despite passing. This suggests a need for targeted practice to reach the target threshold of 70. | Consistent Below Target Performance: Across all assessments, your scores have been below the target threshold of 70, highlighting a consistent area for improvement.\n\nEducational implications: You have shown the ability to improve, but consistent practice and review are necessary to reach your target performance level.\n\nRecommendations: high - Review this assessment with tutor support; focus on missed core concepts before the next assessment. - This action will help you address foundational gaps and improve your understanding, which is crucial for achieving higher scores.",
  "structured_payload": {
    "task_id": "S-T01",
    "execution_id": "exec_1781847241776_40422500",
    "explanation": {
      "summary": "Your performance shows an overall improvement from Assessment 1 to Assessment 2, but it has plateaued in Assessment 3. While you passed the last two assessments, your scores remain below the target threshold, indicating room for growth.",
      "insights": [
        {
          "title": "Initial Struggles and Improvement",
          "description": "In Assessment 1, you scored 0, which is significantly below the pass threshold. By Assessment 2, your score improved to 55, marking a positive change of +55 points.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "up_from_previous",
              "delta": 55,
              "context": "Improvement from Assessment 1 to Assessment 2"
            }
          ]
        },
        {
          "title": "Plateau in Performance",
          "description": "Your score remained at 55 in Assessment 3, indicating no further improvement despite passing. This suggests a need for targeted practice to reach the target threshold of 70.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "stable",
              "delta": 0,
              "context": "No change from Assessment 2 to Assessment 3"
            }
          ]
        },
        {
          "title": "Consistent Below Target Performance",
          "description": "Across all assessments, your scores have been below the target threshold of 70, highlighting a consistent area for improvement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "below_target_threshold",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "All assessments below target threshold"
            }
          ]
        }
      ],
      "educational_implications": [
        "You have shown the ability to improve, but consistent practice and review are necessary to reach your target performance level."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Review this assessment with tutor support; focus on missed core concepts before the next assessment.",
          "rationale": "This action will help you address foundational gaps and improve your understanding, which is crucial for achieving higher scores."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is strong with a large sample size and no reliability warnings.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 3,
    "included_row_count": 3,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "score_trend",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7011,
      "token_usage": {
        "prompt_tokens": 1476,
        "completion_tokens": 556,
        "total_tokens": 2032
      },
      "strategy": "trend",
      "granularity": "per_assessment",
      "cost_usd": 0.000555
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T01__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "96e7c6ce4f89c9630b84d5c01e80a311b02c6f9d05c05275140b909ac7dfdcba",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1476,
      "completion_tokens": 556,
      "total_tokens": 2032
    },
    "latency_ms": 7023,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T01",
    "execution_id": "exec_1781847241776_40422500",
    "explanation": {
      "summary": "Your performance shows an overall improvement from Assessment 1 to Assessment 2, but it has plateaued in Assessment 3. While you passed the last two assessments, your scores remain below the target threshold, indicating room for growth.",
      "insights": [
        {
          "title": "Initial Struggles and Improvement",
          "description": "In Assessment 1, you scored 0, which is significantly below the pass threshold. By Assessment 2, your score improved to 55, marking a positive change of +55 points.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "up_from_previous",
              "delta": 55,
              "context": "Improvement from Assessment 1 to Assessment 2"
            }
          ]
        },
        {
          "title": "Plateau in Performance",
          "description": "Your score remained at 55 in Assessment 3, indicating no further improvement despite passing. This suggests a need for targeted practice to reach the target threshold of 70.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "stable",
              "delta": 0,
              "context": "No change from Assessment 2 to Assessment 3"
            }
          ]
        },
        {
          "title": "Consistent Below Target Performance",
          "description": "Across all assessments, your scores have been below the target threshold of 70, highlighting a consistent area for improvement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "below_target_threshold",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "All assessments below target threshold"
            }
          ]
        }
      ],
      "educational_implications": [
        "You have shown the ability to improve, but consistent practice and review are necessary to reach your target performance level."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Review this assessment with tutor support; focus on missed core concepts before the next assessment.",
          "rationale": "This action will help you address foundational gaps and improve your understanding, which is crucial for achieving higher scores."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is strong with a large sample size and no reliability warnings.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 3,
    "included_row_count": 3,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "score_trend",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7011,
      "token_usage": {
        "prompt_tokens": 1476,
        "completion_tokens": 556,
        "total_tokens": 2032
      },
      "strategy": "trend",
      "granularity": "per_assessment",
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
    "expected": 3,
    "observed": 3
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "b37c65f01545c86add435353b640b163231a341b9bfdaba9715d46d90567cebb",
    "expected_values": [
      "b37c65f01545c86add435353b640b163231a341b9bfdaba9715d46d90567cebb"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9",
    "expected": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9"
  },
  {
    "check_id": "numeric_fields_score_trend",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "score_trend",
    "numeric_columns": [
      "assessment_order",
      "class_avg_score",
      "pass_threshold",
      "performance_trend",
      "score_normalized",
      "score_scale",
      "score_vs_class_avg",
      "target_threshold",
      "week_of_class"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 3,
        "min": 1,
        "max": 3
      },
      "class_avg_score": {
        "count": 3,
        "min": 57,
        "max": 59.53
      },
      "pass_threshold": {
        "count": 3,
        "min": 40,
        "max": 40
      },
      "performance_trend": {
        "count": 3,
        "min": 27.5,
        "max": 27.5
      },
      "score_normalized": {
        "count": 3,
        "min": 0,
        "max": 55
      },
      "score_scale": {
        "count": 3,
        "min": 100,
        "max": 100
      },
      "score_vs_class_avg": {
        "count": 3,
        "min": -57,
        "max": -2.85
      },
      "target_threshold": {
        "count": 3,
        "min": 70,
        "max": 70
      },
      "week_of_class": {
        "count": 3,
        "min": 3,
        "max": 14
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_score_trend",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "score_trend",
    "flag_columns": [
      "pass_flag",
      "pass_threshold",
      "target_threshold",
      "below_pass_threshold",
      "below_target_threshold"
    ],
    "triggered_like_counts": {
      "pass_flag": 2,
      "pass_threshold": 0,
      "target_threshold": 0,
      "below_pass_threshold": 1,
      "below_target_threshold": 3
    }
  }
]
```

