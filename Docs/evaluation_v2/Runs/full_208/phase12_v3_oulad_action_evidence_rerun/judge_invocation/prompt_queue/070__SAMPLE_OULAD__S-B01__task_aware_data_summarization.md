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
not award task-aware summarization an automatic evidence advantage. Also do not
award baseline an automatic simplicity or terseness advantage. In this bucket,
large score differences must be justified by concrete quality defects such as
wrong values, contradicted claims, omitted required outputs, unsafe framing or
materially poorer clarity. If both modes make the same supported claims from the
same complete evidence, they should receive similar scores.

For `full_result_row_count > 20`, broader task-aware coverage may be relevant,
but it is not an automatic quality win. Accuracy, required outputs,
specificity, proportionality and unsupported claims still decide quality.
However, baseline-first-20 does not receive full-result coverage credit for
large-result tasks unless its claims are explicitly limited to the visible rows
or independently supported by deterministic checks. Penalize baseline when it
makes cohort-wide, ranking, distribution, trend or relationship claims from a
truncated first-20 preview without sufficient evidence. Credit task-aware
summarization when it correctly uses broader task-relevant evidence, preserves
required rows/statistics, or avoids misleading first-20 overgeneralization.

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

## Step 2c - Apply Deterministic Action Evidence

Read `action_evidence` before evaluating action, recommendation or risk-flag
explanations.

When `action_evidence.applicable = true`:

- treat `supported_actions` as the authoritative action set for this record;
- use `rule_evaluations` to distinguish `triggered`, `not_triggered` and
  `unknown` rules;
- use each action's `trigger_evidence`, priority, owner, time horizon,
  support category and claim limits when checking explanation accuracy;
- do not require an action from a `not_triggered` or `unknown` rule;
- do not credit an invented action that is absent from `supported_actions`;
- do not penalize the explanation for failing to invent additional actions;
- if `supported_action_count = 0`, accept a supported statement that no
  action was triggered;
- if `supported_action_count > 0`, treat a statement that no action exists as
  a contradiction of deterministic action evidence.

For `source_type = returned_recommended_action_fields`, the returned flag rows
and their existing `recommended_action` values are the evaluation target. The
explanation may prioritize or explain those actions, but it is not required to
create new recommendations.

When `action_evidence.applicable = false`, do not infer an action requirement
from this section.

## Step 3 - Resolve Task Requirements Before Omissions

Use:

- `evaluation_requirements.required_core_outputs`;
- `evaluation_requirements.required_supporting_outputs`;
- `evaluation_requirements.evaluation_constraints`;
- `evaluation_requirements.safety_fairness_applicability`;
- `evaluation_requirements.safety_fairness_note`.

Do not invent mandatory outputs after reading the explanation.

For `ai_summary_type = "action_synthesis"` tasks, interpret action requirements
as explanation of the action-rule contract output, not unconstrained invention
by the explanation model. The judge should evaluate whether the explanation:

- accurately explains supported/generated actions when those actions or
  triggered rules are present in the judge input;
- references the triggering feature-engineered evidence, thresholds, rule IDs,
  priority, owner and time horizon when available;
- avoids proposing unsupported actions outside the supplied rule/action
  contract;
- correctly states that no supported action is available only when rule
  evidence confirms that no action was triggered or returned.

Do not penalize an explanation merely because it does not invent 3-5 new actions
when the backend/rule layer did not return supported actions. Conversely, if the
input contains triggered/supported actions and the explanation says no action is
available, treat that as an action-evidence contradiction rather than as a
generic "missing generated action plan" defect.

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

# LLM Judge Final Judge Context - SAMPLE_OULAD__S-B01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-B01__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-B01",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Performance overview",
  "scope": "1 student",
  "actionable_question": "How am I performing overall?",
  "target_audience": "student",
  "ai_summary_type": "metric_snapshot",
  "ai_prompt_hint": "Summarise overall score, pass/fail status, class benchmark, percentile, and the most useful next action based only on returned fields.",
  "query_labels": [
    "performance_summary"
  ],
  "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "assessment_result",
    "assessment"
  ],
  "key_db_fields": [
    "avg_score [FE]",
    "pass_rate [FE]",
    "performance_trend [FE]",
    "final_outcome"
  ],
  "output_schema": {
    "required_columns": [
      "avg_score",
      "pass_rate",
      "performance_trend",
      "final_outcome"
    ],
    "optional_columns": [
      "class_avg_score",
      "class_median_score",
      "score_percentile",
      "unweighted_avg_score",
      "weighted_avg_score",
      "score_strategy",
      "assessment_count",
      "score_vs_class_avg",
      "cohort_size",
      "score_scale",
      "pass_threshold",
      "target_threshold",
      "performance_band"
    ]
  },
  "query_labels": [
    "performance_summary"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-B01-CORE-01",
      "description": "State the overall score and pass/fail status."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "S-B01-SUPPORT-01",
      "description": "Compare against the class benchmark when class benchmark fields are present."
    },
    {
      "requirement_id": "S-B01-SUPPORT-02",
      "description": "Report percentile standing when score_percentile is present."
    },
    {
      "requirement_id": "S-B01-SUPPORT-03",
      "description": "Suggest the most useful next action supported by returned fields."
    }
  ],
  "evaluation_constraints": [
    {
      "constraint_id": "S-B01-CONSTRAINT-01",
      "description": "Use only returned fields; do not fill missing benchmark or percentile values with invented estimates."
    },
    {
      "constraint_id": "S-B01-CONSTRAINT-02",
      "description": "If percentile data is absent, omit percentile comparison and state that it is unavailable when relevant."
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
  "source_type": "not_applicable",
  "rule_set_id": null,
  "rule_version": null,
  "evaluation_status": "not_applicable",
  "supported_action_count": 0,
  "supported_actions": [],
  "rule_evaluations": [],
  "conflict_evaluations": []
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "performance_summary",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-B01.json",
      "artifact_sha256": "0874cd8ae96d22ade2eaf25455434307b744aeb490d27c7ba35ae21e9dcb363c",
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
  "evidence_artifact_file_sha256": "0874cd8ae96d22ade2eaf25455434307b744aeb490d27c7ba35ae21e9dcb363c",
  "evidence_rows_sha256": "2402bef4145f0a2480bf0c905e1e174744cf198d3c1a8f3d890a68b79ce811b1",
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
  "embedded_datasets_sha256": "2402bef4145f0a2480bf0c905e1e174744cf198d3c1a8f3d890a68b79ce811b1",
  "datasets": {
    "performance_summary": [
      {
        "avg_score": 94.34,
        "pass_rate": 1,
        "performance_trend": -0.7187500000000001,
        "final_outcome": "Distinction",
        "class_avg_score": 66.68,
        "class_median_score": 68.59,
        "score_vs_class_avg": 27.66,
        "score_percentile": 89.8,
        "cohort_size": 1998,
        "unweighted_avg_score": 91.2,
        "weighted_avg_score": 94.34,
        "score_strategy": "weighted_by_assessment_weight",
        "assessment_count": 5,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "performance_band": "strong_relative_performance"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-B01__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "4aebae0406fba41b9c42849ec2db41a59a6dbcdbff9520daead0a605dd20c486",
  "generator_input_sha256": "ef6d44e440a513899297c8f338baab8cdb936591f10eaad6f85c340e2c484b92",
  "generator_input_compact": {
    "task_id": "S-B01",
    "execution_id": "exec_1781847848460_b5d1cbb0",
    "task_name": "Performance overview",
    "analysis_type": "aggregation",
    "explanation_strategy": "distribution",
    "actionable_question": "How am I performing overall?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "performance_summary"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "performance_summary"
    ],
    "dataset_row_counts": {
      "performance_summary": 1
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
      "require_sensitive_context_policy": false,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: You are performing exceptionally well with an average score of 94.34, which places you in the distinction category. Your pass rate is 100%, indicating that you have successfully met the required standards.\n\nInsights: Strong Performance Compared to Class: Your average score is significantly higher than the class average of 66.68, showing that you are among the top performers in your cohort. | High Percentile Ranking: With a score percentile of 89.8, you are performing better than nearly 90% of your peers, which is a fantastic achievement.\n\nEducational implications: Continue to build on your strengths to maintain this high level of performance.\n\nRecommendations: medium - Review areas of assessment where you can further enhance your skills. - Even strong performers can benefit from identifying specific areas for improvement to ensure continued success.",
  "structured_payload": {
    "task_id": "S-B01",
    "execution_id": "exec_1781847848460_b5d1cbb0",
    "explanation": {
      "summary": "You are performing exceptionally well with an average score of 94.34, which places you in the distinction category. Your pass rate is 100%, indicating that you have successfully met the required standards.",
      "insights": [
        {
          "title": "Strong Performance Compared to Class",
          "description": "Your average score is significantly higher than the class average of 66.68, showing that you are among the top performers in your cohort.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_vs_class_avg",
              "value": 27.66,
              "comparison": "baseline",
              "delta": null,
              "context": "Your score exceeds the class average by this amount."
            }
          ]
        },
        {
          "title": "High Percentile Ranking",
          "description": "With a score percentile of 89.8, you are performing better than nearly 90% of your peers, which is a fantastic achievement.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_percentile",
              "value": 89.8,
              "comparison": "baseline",
              "delta": null,
              "context": "This percentile indicates your relative performance."
            }
          ]
        }
      ],
      "educational_implications": [
        "Continue to build on your strengths to maintain this high level of performance."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Review areas of assessment where you can further enhance your skills.",
          "rationale": "Even strong performers can benefit from identifying specific areas for improvement to ensure continued success."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is clear and indicates strong performance metrics.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "performance_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6758,
      "token_usage": {
        "prompt_tokens": 844,
        "completion_tokens": 403,
        "total_tokens": 1247
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000368
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-B01__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "4aebae0406fba41b9c42849ec2db41a59a6dbcdbff9520daead0a605dd20c486",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 844,
      "completion_tokens": 403,
      "total_tokens": 1247
    },
    "latency_ms": 6778,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-B01",
    "execution_id": "exec_1781847848460_b5d1cbb0",
    "explanation": {
      "summary": "You are performing exceptionally well with an average score of 94.34, which places you in the distinction category. Your pass rate is 100%, indicating that you have successfully met the required standards.",
      "insights": [
        {
          "title": "Strong Performance Compared to Class",
          "description": "Your average score is significantly higher than the class average of 66.68, showing that you are among the top performers in your cohort.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_vs_class_avg",
              "value": 27.66,
              "comparison": "baseline",
              "delta": null,
              "context": "Your score exceeds the class average by this amount."
            }
          ]
        },
        {
          "title": "High Percentile Ranking",
          "description": "With a score percentile of 89.8, you are performing better than nearly 90% of your peers, which is a fantastic achievement.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_percentile",
              "value": 89.8,
              "comparison": "baseline",
              "delta": null,
              "context": "This percentile indicates your relative performance."
            }
          ]
        }
      ],
      "educational_implications": [
        "Continue to build on your strengths to maintain this high level of performance."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Review areas of assessment where you can further enhance your skills.",
          "rationale": "Even strong performers can benefit from identifying specific areas for improvement to ensure continued success."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is clear and indicates strong performance metrics.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "performance_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6758,
      "token_usage": {
        "prompt_tokens": 844,
        "completion_tokens": 403,
        "total_tokens": 1247
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000368
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
    "observed": "0874cd8ae96d22ade2eaf25455434307b744aeb490d27c7ba35ae21e9dcb363c",
    "expected_values": [
      "0874cd8ae96d22ade2eaf25455434307b744aeb490d27c7ba35ae21e9dcb363c"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "2402bef4145f0a2480bf0c905e1e174744cf198d3c1a8f3d890a68b79ce811b1",
    "expected": "2402bef4145f0a2480bf0c905e1e174744cf198d3c1a8f3d890a68b79ce811b1"
  },
  {
    "check_id": "numeric_fields_performance_summary",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "performance_summary",
    "numeric_columns": [
      "assessment_count",
      "avg_score",
      "class_avg_score",
      "class_median_score",
      "cohort_size",
      "pass_rate",
      "pass_threshold",
      "performance_trend",
      "score_percentile",
      "score_scale",
      "score_vs_class_avg",
      "target_threshold",
      "unweighted_avg_score",
      "weighted_avg_score"
    ],
    "numeric_summaries": {
      "assessment_count": {
        "count": 1,
        "min": 5,
        "max": 5
      },
      "avg_score": {
        "count": 1,
        "min": 94.34,
        "max": 94.34
      },
      "class_avg_score": {
        "count": 1,
        "min": 66.68,
        "max": 66.68
      },
      "class_median_score": {
        "count": 1,
        "min": 68.59,
        "max": 68.59
      },
      "cohort_size": {
        "count": 1,
        "min": 1998,
        "max": 1998
      },
      "pass_rate": {
        "count": 1,
        "min": 1,
        "max": 1
      },
      "pass_threshold": {
        "count": 1,
        "min": 40,
        "max": 40
      },
      "performance_trend": {
        "count": 1,
        "min": -0.7187500000000001,
        "max": -0.7187500000000001
      },
      "score_percentile": {
        "count": 1,
        "min": 89.8,
        "max": 89.8
      },
      "score_scale": {
        "count": 1,
        "min": 100,
        "max": 100
      },
      "score_vs_class_avg": {
        "count": 1,
        "min": 27.66,
        "max": 27.66
      },
      "target_threshold": {
        "count": 1,
        "min": 70,
        "max": 70
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_performance_summary",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "performance_summary",
    "flag_columns": [
      "pass_threshold",
      "target_threshold"
    ],
    "triggered_like_counts": {
      "pass_threshold": 0,
      "target_threshold": 0
    }
  }
]
```

