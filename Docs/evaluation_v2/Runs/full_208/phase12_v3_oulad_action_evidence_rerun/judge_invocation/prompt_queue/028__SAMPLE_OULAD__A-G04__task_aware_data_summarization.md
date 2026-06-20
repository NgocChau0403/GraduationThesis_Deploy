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

# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G04__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G04__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G04",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Assessment difficulty analysis",
  "scope": "Many students",
  "actionable_question": "Which assessment is causing the most students to fail?",
  "target_audience": "instructor",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Flag assessments with pass_flag=False rate above threshold. Suggest curriculum review.",
  "query_labels": [
    "assessment_difficulty"
  ],
  "explanation_strategy": "distribution"
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
    "assessment_name",
    "assessment_type",
    "week_of_class",
    "competency_tag",
    "score_normalized",
    "pass_flag"
  ],
  "output_schema": {
    "required_columns": [
      "assessment_name",
      "fail_rate_pct"
    ],
    "optional_columns": [
      "assessment_id",
      "assessment_order",
      "assessment_type",
      "week_of_class",
      "competency_tag",
      "competency_source",
      "total_submissions",
      "fail_count",
      "avg_score"
    ]
  },
  "query_labels": [
    "assessment_difficulty"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G04-CORE-01",
      "description": "Flag assessments with pass_flag=False rate above threshold."
    },
    {
      "requirement_id": "A-G04-CORE-02",
      "description": "Suggest curriculum review."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G04-CONSTRAINT-01",
      "description": "Frame a high fail rate as a signal for assessment or curriculum review, not as evidence of student deficiency."
    },
    {
      "constraint_id": "A-G04-CONSTRAINT-02",
      "description": "Avoid causal claims about student quality."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Retained as applicable because curriculum recommendations can affect learners; candidate for human review rather than automatic exclusion."
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

## Deterministic Retrieval Evidence

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "assessment_difficulty",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G04.json",
      "artifact_sha256": "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae",
      "row_count": 112,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 112,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 112,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G04__task_aware_data_summarization.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae",
  "evidence_rows_sha256": "efaaa326237f67aa56d5231bbd426e5831437f739fc7c8852c6e86fc6e2e1717",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 112,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__A-G04__task_aware_data_summarization__assessment_difficulty__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "assessment_difficulty",
        "row_start_inclusive": 0,
        "row_end_inclusive": 111,
        "row_count": 112
      }
    ],
    "issues": []
  }
}
```

```json
{
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "retrieval_log": {
    "artifact_type": "llm_judge_v2_phase6_4_deterministic_retrieval_log",
    "generated_at": "2026-06-19T07:41:45.464Z",
    "record_id": "SAMPLE_OULAD__A-G04__task_aware_data_summarization",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__A-G04__task_aware_data_summarization__assessment_difficulty__chunk_1",
        "dataset_label": "assessment_difficulty",
        "row_start_inclusive": 0,
        "row_end_inclusive": 111,
        "row_count": 112,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G04.json",
        "source_artifact_sha256": "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae"
      }
    ]
  },
  "retrieved_datasets_sha256": "efaaa326237f67aa56d5231bbd426e5831437f739fc7c8852c6e86fc6e2e1717",
  "retrieved_datasets": {
    "assessment_difficulty": [
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24288",
        "assessment_name": "24288",
        "assessment_type": "CMA",
        "assessment_order": 5,
        "week_of_class": 20,
        "competency_tag": "24288",
        "competency_source": "proxy",
        "total_submissions": 26,
        "fail_count": 13,
        "fail_rate_pct": 50,
        "avg_score": 45.04
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24283",
        "assessment_name": "24283",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 15,
        "competency_tag": "24283",
        "competency_source": "proxy",
        "total_submissions": 24,
        "fail_count": 7,
        "fail_rate_pct": 29.2,
        "avg_score": 56.63
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24289",
        "assessment_name": "24289",
        "assessment_type": "CMA",
        "assessment_order": 8,
        "week_of_class": 30,
        "competency_tag": "24289",
        "competency_source": "proxy",
        "total_submissions": 7,
        "fail_count": 2,
        "fail_rate_pct": 28.6,
        "avg_score": 45
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24286",
        "assessment_name": "24286",
        "assessment_type": "CMA",
        "assessment_order": 1,
        "week_of_class": 3,
        "competency_tag": "24286",
        "competency_source": "proxy",
        "total_submissions": 105,
        "fail_count": 29,
        "fail_rate_pct": 27.6,
        "avg_score": 49.33
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24284",
        "assessment_name": "24284",
        "assessment_type": "TMA",
        "assessment_order": 6,
        "week_of_class": 22,
        "competency_tag": "24284",
        "competency_source": "proxy",
        "total_submissions": 12,
        "fail_count": 3,
        "fail_rate_pct": 25,
        "avg_score": 51.75
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24287",
        "assessment_name": "24287",
        "assessment_type": "CMA",
        "assessment_order": 3,
        "week_of_class": 10,
        "competency_tag": "24287",
        "competency_source": "proxy",
        "total_submissions": 63,
        "fail_count": 15,
        "fail_rate_pct": 23.8,
        "avg_score": 63.25
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25360",
        "assessment_name": "25360",
        "assessment_type": "TMA",
        "assessment_order": 6,
        "week_of_class": 29,
        "competency_tag": "25360",
        "competency_source": "proxy",
        "total_submissions": 83,
        "fail_count": 16,
        "fail_rate_pct": 19.3,
        "avg_score": 64.36
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25339",
        "assessment_name": "25339",
        "assessment_type": "TMA",
        "assessment_order": 12,
        "week_of_class": 29,
        "competency_tag": "25339",
        "competency_source": "proxy",
        "total_submissions": 23,
        "fail_count": 4,
        "fail_rate_pct": 17.4,
        "avg_score": 57.52
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25366",
        "assessment_name": "25366",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 21,
        "competency_tag": "25366",
        "competency_source": "proxy",
        "total_submissions": 70,
        "fail_count": 11,
        "fail_rate_pct": 15.7,
        "avg_score": 68.13
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25352",
        "assessment_name": "25352",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 24,
        "competency_tag": "25352",
        "competency_source": "proxy",
        "total_submissions": 157,
        "fail_count": 24,
        "fail_rate_pct": 15.3,
        "avg_score": 66.87
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25367",
        "assessment_name": "25367",
        "assessment_type": "TMA",
        "assessment_order": 6,
        "week_of_class": 28,
        "competency_tag": "25367",
        "competency_source": "proxy",
        "total_submissions": 63,
        "fail_count": 9,
        "fail_rate_pct": 14.3,
        "avg_score": 64.71
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24285",
        "assessment_name": "24285",
        "assessment_type": "TMA",
        "assessment_order": 7,
        "week_of_class": 29,
        "competency_tag": "24285",
        "competency_source": "proxy",
        "total_submissions": 7,
        "fail_count": 1,
        "fail_rate_pct": 14.3,
        "avg_score": 53.43
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24299",
        "assessment_name": "24299",
        "assessment_type": "Exam",
        "assessment_order": 9,
        "week_of_class": null,
        "competency_tag": "24299",
        "competency_source": "proxy",
        "total_submissions": 1168,
        "fail_count": 149,
        "fail_rate_pct": 12.8,
        "avg_score": 68.23
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25338",
        "assessment_name": "25338",
        "assessment_type": "TMA",
        "assessment_order": 10,
        "week_of_class": 22,
        "competency_tag": "25338",
        "competency_source": "proxy",
        "total_submissions": 24,
        "fail_count": 3,
        "fail_rate_pct": 12.5,
        "avg_score": 65.08
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25353",
        "assessment_name": "25353",
        "assessment_type": "TMA",
        "assessment_order": 6,
        "week_of_class": 30,
        "competency_tag": "25353",
        "competency_source": "proxy",
        "total_submissions": 140,
        "fail_count": 17,
        "fail_rate_pct": 12.1,
        "avg_score": 65.97
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25345",
        "assessment_name": "25345",
        "assessment_type": "CMA",
        "assessment_order": 9,
        "week_of_class": 22,
        "competency_tag": "25345",
        "competency_source": "proxy",
        "total_submissions": 26,
        "fail_count": 3,
        "fail_rate_pct": 11.5,
        "avg_score": 72.31
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25359",
        "assessment_name": "25359",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 23,
        "competency_tag": "25359",
        "competency_source": "proxy",
        "total_submissions": 87,
        "fail_count": 10,
        "fail_rate_pct": 11.5,
        "avg_score": 65.78
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25358",
        "assessment_name": "25358",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 17,
        "competency_tag": "25358",
        "competency_source": "proxy",
        "total_submissions": 99,
        "fail_count": 11,
        "fail_rate_pct": 11.1,
        "avg_score": 69.52
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24292",
        "assessment_name": "24292",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 16,
        "competency_tag": "24292",
        "competency_source": "proxy",
        "total_submissions": 1128,
        "fail_count": 118,
        "fail_rate_pct": 10.5,
        "avg_score": 73.76
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24298",
        "assessment_name": "24298",
        "assessment_type": "CMA",
        "assessment_order": 8,
        "week_of_class": 31,
        "competency_tag": "24298",
        "competency_source": "proxy",
        "total_submissions": 1094,
        "fail_count": 110,
        "fail_rate_pct": 10.1,
        "avg_score": 73.09
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24293",
        "assessment_name": "24293",
        "assessment_type": "TMA",
        "assessment_order": 6,
        "week_of_class": 23,
        "competency_tag": "24293",
        "competency_source": "proxy",
        "total_submissions": 965,
        "fail_count": 89,
        "fail_rate_pct": 9.2,
        "avg_score": 72.93
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24295",
        "assessment_name": "24295",
        "assessment_type": "CMA",
        "assessment_order": 1,
        "week_of_class": 3,
        "competency_tag": "24295",
        "competency_source": "proxy",
        "total_submissions": 1917,
        "fail_count": 164,
        "fail_rate_pct": 8.6,
        "avg_score": 74.75
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25337",
        "assessment_name": "25337",
        "assessment_type": "TMA",
        "assessment_order": 8,
        "week_of_class": 17,
        "competency_tag": "25337",
        "competency_source": "proxy",
        "total_submissions": 25,
        "fail_count": 2,
        "fail_rate_pct": 8,
        "avg_score": 67.52
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25344",
        "assessment_name": "25344",
        "assessment_type": "CMA",
        "assessment_order": 7,
        "week_of_class": 17,
        "competency_tag": "25344",
        "competency_source": "proxy",
        "total_submissions": 25,
        "fail_count": 2,
        "fail_rate_pct": 8,
        "avg_score": 72.4
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25365",
        "assessment_name": "25365",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 16,
        "competency_tag": "25365",
        "competency_source": "proxy",
        "total_submissions": 76,
        "fail_count": 6,
        "fail_rate_pct": 7.9,
        "avg_score": 77.25
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24294",
        "assessment_name": "24294",
        "assessment_type": "TMA",
        "assessment_order": 7,
        "week_of_class": 30,
        "competency_tag": "24294",
        "competency_source": "proxy",
        "total_submissions": 916,
        "fail_count": 72,
        "fail_rate_pct": 7.9,
        "avg_score": 74.88
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25340",
        "assessment_name": "25340",
        "assessment_type": "Exam",
        "assessment_order": 14,
        "week_of_class": 35,
        "competency_tag": "25340",
        "competency_source": "proxy",
        "total_submissions": 26,
        "fail_count": 2,
        "fail_rate_pct": 7.7,
        "avg_score": 55.08
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25335",
        "assessment_name": "25335",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 8,
        "competency_tag": "25335",
        "competency_source": "proxy",
        "total_submissions": 26,
        "fail_count": 2,
        "fail_rate_pct": 7.7,
        "avg_score": 71.54
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24282",
        "assessment_name": "24282",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 5,
        "competency_tag": "24282",
        "competency_source": "proxy",
        "total_submissions": 70,
        "fail_count": 5,
        "fail_rate_pct": 7.1,
        "avg_score": 67.74
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25334",
        "assessment_name": "25334",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 4,
        "competency_tag": "25334",
        "competency_source": "proxy",
        "total_submissions": 29,
        "fail_count": 2,
        "fail_rate_pct": 6.9,
        "avg_score": 71.62
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25364",
        "assessment_name": "25364",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 9,
        "competency_tag": "25364",
        "competency_source": "proxy",
        "total_submissions": 89,
        "fail_count": 6,
        "fail_rate_pct": 6.7,
        "avg_score": 71.99
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24297",
        "assessment_name": "24297",
        "assessment_type": "CMA",
        "assessment_order": 5,
        "week_of_class": 21,
        "competency_tag": "24297",
        "competency_source": "proxy",
        "total_submissions": 1301,
        "fail_count": 83,
        "fail_rate_pct": 6.4,
        "avg_score": 75.15
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25351",
        "assessment_name": "25351",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 18,
        "competency_tag": "25351",
        "competency_source": "proxy",
        "total_submissions": 164,
        "fail_count": 10,
        "fail_rate_pct": 6.1,
        "avg_score": 74.44
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30721",
        "assessment_name": "30721",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 19,
        "competency_tag": "30721",
        "competency_source": "proxy",
        "total_submissions": 164,
        "fail_count": 10,
        "fail_rate_pct": 6.1,
        "avg_score": 74.21
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34903",
        "assessment_name": "34903",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 29,
        "competency_tag": "34903",
        "competency_source": "proxy",
        "total_submissions": 51,
        "fail_count": 3,
        "fail_rate_pct": 5.9,
        "avg_score": 74.69
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24296",
        "assessment_name": "24296",
        "assessment_type": "CMA",
        "assessment_order": 3,
        "week_of_class": 10,
        "competency_tag": "24296",
        "competency_source": "proxy",
        "total_submissions": 1534,
        "fail_count": 91,
        "fail_rate_pct": 5.9,
        "avg_score": 78.94
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34890",
        "assessment_name": "34890",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 25,
        "competency_tag": "34890",
        "competency_source": "proxy",
        "total_submissions": 87,
        "fail_count": 5,
        "fail_rate_pct": 5.7,
        "avg_score": 81.03
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34889",
        "assessment_name": "34889",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 19,
        "competency_tag": "34889",
        "competency_source": "proxy",
        "total_submissions": 93,
        "fail_count": 5,
        "fail_rate_pct": 5.4,
        "avg_score": 76.59
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34888",
        "assessment_name": "34888",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 13,
        "competency_tag": "34888",
        "competency_source": "proxy",
        "total_submissions": 94,
        "fail_count": 5,
        "fail_rate_pct": 5.3,
        "avg_score": 76.66
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25361",
        "assessment_name": "25361",
        "assessment_type": "Exam",
        "assessment_order": 7,
        "week_of_class": 35,
        "competency_tag": "25361",
        "competency_source": "proxy",
        "total_submissions": 98,
        "fail_count": 5,
        "fail_rate_pct": 5.1,
        "avg_score": 73.62
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24291",
        "assessment_name": "24291",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 5,
        "competency_tag": "24291",
        "competency_source": "proxy",
        "total_submissions": 1428,
        "fail_count": 73,
        "fail_rate_pct": 5.1,
        "avg_score": 78.79
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34901",
        "assessment_name": "34901",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 14,
        "competency_tag": "34901",
        "competency_source": "proxy",
        "total_submissions": 66,
        "fail_count": 3,
        "fail_rate_pct": 4.5,
        "avg_score": 73.94
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25362",
        "assessment_name": "25362",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 3,
        "competency_tag": "25362",
        "competency_source": "proxy",
        "total_submissions": 111,
        "fail_count": 5,
        "fail_rate_pct": 4.5,
        "avg_score": 73.31
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25368",
        "assessment_name": "25368",
        "assessment_type": "Exam",
        "assessment_order": 7,
        "week_of_class": null,
        "competency_tag": "25368",
        "competency_source": "proxy",
        "total_submissions": 68,
        "fail_count": 3,
        "fail_rate_pct": 4.4,
        "avg_score": 69.32
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25346",
        "assessment_name": "25346",
        "assessment_type": "CMA",
        "assessment_order": 11,
        "week_of_class": 25,
        "competency_tag": "25346",
        "competency_source": "proxy",
        "total_submissions": 23,
        "fail_count": 1,
        "fail_rate_pct": 4.3,
        "avg_score": 68.78
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25347",
        "assessment_name": "25347",
        "assessment_type": "CMA",
        "assessment_order": 13,
        "week_of_class": 30,
        "competency_tag": "25347",
        "competency_source": "proxy",
        "total_submissions": 24,
        "fail_count": 1,
        "fail_rate_pct": 4.2,
        "avg_score": 63.13
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34900",
        "assessment_name": "34900",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 8,
        "competency_tag": "34900",
        "competency_source": "proxy",
        "total_submissions": 75,
        "fail_count": 3,
        "fail_rate_pct": 4,
        "avg_score": 77.52
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25356",
        "assessment_name": "25356",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 8,
        "competency_tag": "25356",
        "competency_source": "proxy",
        "total_submissions": 108,
        "fail_count": 4,
        "fail_rate_pct": 3.7,
        "avg_score": 77.71
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25336",
        "assessment_name": "25336",
        "assessment_type": "TMA",
        "assessment_order": 6,
        "week_of_class": 12,
        "competency_tag": "25336",
        "competency_source": "proxy",
        "total_submissions": 27,
        "fail_count": 1,
        "fail_rate_pct": 3.7,
        "avg_score": 79.7
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30716",
        "assessment_name": "30716",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 17,
        "competency_tag": "30716",
        "competency_source": "proxy",
        "total_submissions": 111,
        "fail_count": 4,
        "fail_rate_pct": 3.6,
        "avg_score": 79.49
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34902",
        "assessment_name": "34902",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 20,
        "competency_tag": "34902",
        "competency_source": "proxy",
        "total_submissions": 58,
        "fail_count": 2,
        "fail_rate_pct": 3.4,
        "avg_score": 74.67
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25342",
        "assessment_name": "25342",
        "assessment_type": "CMA",
        "assessment_order": 3,
        "week_of_class": 8,
        "competency_tag": "25342",
        "competency_source": "proxy",
        "total_submissions": 30,
        "fail_count": 1,
        "fail_rate_pct": 3.3,
        "avg_score": 85.1
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25363",
        "assessment_name": "25363",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 6,
        "competency_tag": "25363",
        "competency_source": "proxy",
        "total_submissions": 99,
        "fail_count": 3,
        "fail_rate_pct": 3,
        "avg_score": 79.06
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34876",
        "assessment_name": "34876",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 19,
        "competency_tag": "34876",
        "competency_source": "proxy",
        "total_submissions": 104,
        "fail_count": 3,
        "fail_rate_pct": 2.9,
        "avg_score": 76.06
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25349",
        "assessment_name": "25349",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 8,
        "competency_tag": "25349",
        "competency_source": "proxy",
        "total_submissions": 172,
        "fail_count": 5,
        "fail_rate_pct": 2.9,
        "avg_score": 79.52
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30717",
        "assessment_name": "30717",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 22,
        "competency_tag": "30717",
        "competency_source": "proxy",
        "total_submissions": 108,
        "fail_count": 3,
        "fail_rate_pct": 2.8,
        "avg_score": 76.83
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30722",
        "assessment_name": "30722",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 24,
        "competency_tag": "30722",
        "competency_source": "proxy",
        "total_submissions": 143,
        "fail_count": 4,
        "fail_rate_pct": 2.8,
        "avg_score": 78.24
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25350",
        "assessment_name": "25350",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 13,
        "competency_tag": "25350",
        "competency_source": "proxy",
        "total_submissions": 170,
        "fail_count": 4,
        "fail_rate_pct": 2.4,
        "avg_score": 85.36
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30712",
        "assessment_name": "30712",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 23,
        "competency_tag": "30712",
        "competency_source": "proxy",
        "total_submissions": 136,
        "fail_count": 3,
        "fail_rate_pct": 2.2,
        "avg_score": 78.26
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34887",
        "assessment_name": "34887",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 8,
        "competency_tag": "34887",
        "competency_source": "proxy",
        "total_submissions": 97,
        "fail_count": 2,
        "fail_rate_pct": 2.1,
        "avg_score": 79.53
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34877",
        "assessment_name": "34877",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 25,
        "competency_tag": "34877",
        "competency_source": "proxy",
        "total_submissions": 98,
        "fail_count": 2,
        "fail_rate_pct": 2,
        "avg_score": 79.2
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30719",
        "assessment_name": "30719",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 5,
        "competency_tag": "30719",
        "competency_source": "proxy",
        "total_submissions": 209,
        "fail_count": 4,
        "fail_rate_pct": 1.9,
        "avg_score": 83.95
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34875",
        "assessment_name": "34875",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 14,
        "competency_tag": "34875",
        "competency_source": "proxy",
        "total_submissions": 106,
        "fail_count": 2,
        "fail_rate_pct": 1.9,
        "avg_score": 76.11
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25354",
        "assessment_name": "25354",
        "assessment_type": "Exam",
        "assessment_order": 7,
        "week_of_class": 38,
        "competency_tag": "25354",
        "competency_source": "proxy",
        "total_submissions": 169,
        "fail_count": 3,
        "fail_rate_pct": 1.8,
        "avg_score": 70
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30711",
        "assessment_name": "30711",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 18,
        "competency_tag": "30711",
        "competency_source": "proxy",
        "total_submissions": 140,
        "fail_count": 2,
        "fail_rate_pct": 1.4,
        "avg_score": 77.34
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34899",
        "assessment_name": "34899",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 4,
        "competency_tag": "34899",
        "competency_source": "proxy",
        "total_submissions": 87,
        "fail_count": 1,
        "fail_rate_pct": 1.1,
        "avg_score": 79
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34874",
        "assessment_name": "34874",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 7,
        "competency_tag": "34874",
        "competency_source": "proxy",
        "total_submissions": 110,
        "fail_count": 1,
        "fail_rate_pct": 0.9,
        "avg_score": 77.31
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25355",
        "assessment_name": "25355",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 4,
        "competency_tag": "25355",
        "competency_source": "proxy",
        "total_submissions": 111,
        "fail_count": 1,
        "fail_rate_pct": 0.9,
        "avg_score": 77.77
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25357",
        "assessment_name": "25357",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 11,
        "competency_tag": "25357",
        "competency_source": "proxy",
        "total_submissions": 106,
        "fail_count": 1,
        "fail_rate_pct": 0.9,
        "avg_score": 83.3
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30715",
        "assessment_name": "30715",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 10,
        "competency_tag": "30715",
        "competency_source": "proxy",
        "total_submissions": 114,
        "fail_count": 1,
        "fail_rate_pct": 0.9,
        "avg_score": 82.34
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25348",
        "assessment_name": "25348",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 4,
        "competency_tag": "25348",
        "competency_source": "proxy",
        "total_submissions": 176,
        "fail_count": 1,
        "fail_rate_pct": 0.6,
        "avg_score": 79.55
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30720",
        "assessment_name": "30720",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 10,
        "competency_tag": "30720",
        "competency_source": "proxy",
        "total_submissions": 176,
        "fail_count": 1,
        "fail_rate_pct": 0.6,
        "avg_score": 85.77
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34910",
        "assessment_name": "34910",
        "assessment_type": "CMA",
        "assessment_order": 12,
        "week_of_class": 35,
        "competency_tag": "34910",
        "competency_source": "proxy",
        "total_submissions": 53,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 79.38
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25341",
        "assessment_name": "25341",
        "assessment_type": "CMA",
        "assessment_order": 1,
        "week_of_class": 4,
        "competency_tag": "25341",
        "competency_source": "proxy",
        "total_submissions": 29,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 73.62
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25343",
        "assessment_name": "25343",
        "assessment_type": "CMA",
        "assessment_order": 5,
        "week_of_class": 12,
        "competency_tag": "25343",
        "competency_source": "proxy",
        "total_submissions": 29,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 72.79
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30709",
        "assessment_name": "30709",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 5,
        "competency_tag": "30709",
        "competency_source": "proxy",
        "total_submissions": 148,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 85.42
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30710",
        "assessment_name": "30710",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 10,
        "competency_tag": "30710",
        "competency_source": "proxy",
        "total_submissions": 147,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.51
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30714",
        "assessment_name": "30714",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 5,
        "competency_tag": "30714",
        "competency_source": "proxy",
        "total_submissions": 115,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 89.89
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34860",
        "assessment_name": "34860",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 3,
        "competency_tag": "34860",
        "competency_source": "proxy",
        "total_submissions": 15,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 84.53
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34861",
        "assessment_name": "34861",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 7,
        "competency_tag": "34861",
        "competency_source": "proxy",
        "total_submissions": 16,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 79
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34862",
        "assessment_name": "34862",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 13,
        "competency_tag": "34862",
        "competency_source": "proxy",
        "total_submissions": 15,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 76.27
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34863",
        "assessment_name": "34863",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 19,
        "competency_tag": "34863",
        "competency_source": "proxy",
        "total_submissions": 13,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 74.77
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34864",
        "assessment_name": "34864",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 24,
        "competency_tag": "34864",
        "competency_source": "proxy",
        "total_submissions": 12,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 77.17
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34865",
        "assessment_name": "34865",
        "assessment_type": "CMA",
        "assessment_order": 6,
        "week_of_class": 32,
        "competency_tag": "34865",
        "competency_source": "proxy",
        "total_submissions": 15,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 84.47
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34866",
        "assessment_name": "34866",
        "assessment_type": "CMA",
        "assessment_order": 7,
        "week_of_class": 32,
        "competency_tag": "34866",
        "competency_source": "proxy",
        "total_submissions": 14,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 89.14
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34867",
        "assessment_name": "34867",
        "assessment_type": "CMA",
        "assessment_order": 8,
        "week_of_class": 32,
        "competency_tag": "34867",
        "competency_source": "proxy",
        "total_submissions": 12,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.5
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34868",
        "assessment_name": "34868",
        "assessment_type": "CMA",
        "assessment_order": 9,
        "week_of_class": 32,
        "competency_tag": "34868",
        "competency_source": "proxy",
        "total_submissions": 12,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 80.17
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34869",
        "assessment_name": "34869",
        "assessment_type": "CMA",
        "assessment_order": 10,
        "week_of_class": 32,
        "competency_tag": "34869",
        "competency_source": "proxy",
        "total_submissions": 11,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 81.09
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34870",
        "assessment_name": "34870",
        "assessment_type": "CMA",
        "assessment_order": 11,
        "week_of_class": 32,
        "competency_tag": "34870",
        "competency_source": "proxy",
        "total_submissions": 12,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 79.17
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34871",
        "assessment_name": "34871",
        "assessment_type": "CMA",
        "assessment_order": 12,
        "week_of_class": 32,
        "competency_tag": "34871",
        "competency_source": "proxy",
        "total_submissions": 11,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 77.09
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34873",
        "assessment_name": "34873",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 3,
        "competency_tag": "34873",
        "competency_source": "proxy",
        "total_submissions": 110,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.95
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34878",
        "assessment_name": "34878",
        "assessment_type": "CMA",
        "assessment_order": 6,
        "week_of_class": 34,
        "competency_tag": "34878",
        "competency_source": "proxy",
        "total_submissions": 106,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 87.06
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34879",
        "assessment_name": "34879",
        "assessment_type": "CMA",
        "assessment_order": 7,
        "week_of_class": 34,
        "competency_tag": "34879",
        "competency_source": "proxy",
        "total_submissions": 104,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 92.63
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34880",
        "assessment_name": "34880",
        "assessment_type": "CMA",
        "assessment_order": 8,
        "week_of_class": 34,
        "competency_tag": "34880",
        "competency_source": "proxy",
        "total_submissions": 103,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.15
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34881",
        "assessment_name": "34881",
        "assessment_type": "CMA",
        "assessment_order": 9,
        "week_of_class": 34,
        "competency_tag": "34881",
        "competency_source": "proxy",
        "total_submissions": 101,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.84
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34882",
        "assessment_name": "34882",
        "assessment_type": "CMA",
        "assessment_order": 10,
        "week_of_class": 34,
        "competency_tag": "34882",
        "competency_source": "proxy",
        "total_submissions": 99,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.83
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34883",
        "assessment_name": "34883",
        "assessment_type": "CMA",
        "assessment_order": 11,
        "week_of_class": 34,
        "competency_tag": "34883",
        "competency_source": "proxy",
        "total_submissions": 101,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 81.37
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34884",
        "assessment_name": "34884",
        "assessment_type": "CMA",
        "assessment_order": 12,
        "week_of_class": 34,
        "competency_tag": "34884",
        "competency_source": "proxy",
        "total_submissions": 97,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 79.93
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34886",
        "assessment_name": "34886",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 4,
        "competency_tag": "34886",
        "competency_source": "proxy",
        "total_submissions": 97,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 83.69
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34891",
        "assessment_name": "34891",
        "assessment_type": "CMA",
        "assessment_order": 6,
        "week_of_class": 33,
        "competency_tag": "34891",
        "competency_source": "proxy",
        "total_submissions": 95,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 86.43
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34892",
        "assessment_name": "34892",
        "assessment_type": "CMA",
        "assessment_order": 7,
        "week_of_class": 33,
        "competency_tag": "34892",
        "competency_source": "proxy",
        "total_submissions": 93,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 90.26
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34893",
        "assessment_name": "34893",
        "assessment_type": "CMA",
        "assessment_order": 8,
        "week_of_class": 33,
        "competency_tag": "34893",
        "competency_source": "proxy",
        "total_submissions": 91,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 80.2
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34894",
        "assessment_name": "34894",
        "assessment_type": "CMA",
        "assessment_order": 9,
        "week_of_class": 33,
        "competency_tag": "34894",
        "competency_source": "proxy",
        "total_submissions": 88,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 81.77
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34895",
        "assessment_name": "34895",
        "assessment_type": "CMA",
        "assessment_order": 10,
        "week_of_class": 33,
        "competency_tag": "34895",
        "competency_source": "proxy",
        "total_submissions": 88,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 81.91
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34896",
        "assessment_name": "34896",
        "assessment_type": "CMA",
        "assessment_order": 11,
        "week_of_class": 33,
        "competency_tag": "34896",
        "competency_source": "proxy",
        "total_submissions": 88,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 81.01
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34897",
        "assessment_name": "34897",
        "assessment_type": "CMA",
        "assessment_order": 12,
        "week_of_class": 33,
        "competency_tag": "34897",
        "competency_source": "proxy",
        "total_submissions": 87,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 79.25
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34904",
        "assessment_name": "34904",
        "assessment_type": "CMA",
        "assessment_order": 6,
        "week_of_class": 35,
        "competency_tag": "34904",
        "competency_source": "proxy",
        "total_submissions": 63,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 89.29
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34905",
        "assessment_name": "34905",
        "assessment_type": "CMA",
        "assessment_order": 7,
        "week_of_class": 35,
        "competency_tag": "34905",
        "competency_source": "proxy",
        "total_submissions": 60,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 92.42
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34906",
        "assessment_name": "34906",
        "assessment_type": "CMA",
        "assessment_order": 8,
        "week_of_class": 35,
        "competency_tag": "34906",
        "competency_source": "proxy",
        "total_submissions": 55,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.38
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34907",
        "assessment_name": "34907",
        "assessment_type": "CMA",
        "assessment_order": 9,
        "week_of_class": 35,
        "competency_tag": "34907",
        "competency_source": "proxy",
        "total_submissions": 56,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 79.43
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34908",
        "assessment_name": "34908",
        "assessment_type": "CMA",
        "assessment_order": 10,
        "week_of_class": 35,
        "competency_tag": "34908",
        "competency_source": "proxy",
        "total_submissions": 56,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 80.82
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34909",
        "assessment_name": "34909",
        "assessment_type": "CMA",
        "assessment_order": 11,
        "week_of_class": 35,
        "competency_tag": "34909",
        "competency_source": "proxy",
        "total_submissions": 55,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 81.87
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G04__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "98d89d9704a18da693168b50d7bd422b891e129a5dd36677eede4bf9822f948b",
  "generator_input_sha256": "c02af980739f4a2053397c471b5914a1bdf8a2832a97e4e4c277cf722ec46221",
  "generator_input_compact": {
    "task_id": "A-G04",
    "execution_id": "exec_1781847724478_910d0c3f",
    "task_name": "Assessment difficulty analysis",
    "analysis_type": "distribution",
    "explanation_strategy": "distribution",
    "actionable_question": "Which assessment is causing the most students to fail?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "assessment_difficulty"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "assessment_difficulty"
    ],
    "dataset_row_counts": {
      "assessment_difficulty": 112
    },
    "ai_summary_config_summary": {
      "summary_type": "ranking",
      "metric_column": "fail_rate_pct",
      "entity_column": "assessment_name",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": "desc",
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
  "raw_text": "Summary: The analysis of assessment difficulty reveals a significant concentration of students struggling with specific assessments, particularly those with high fail rates. The assessment '24288' stands out as the most challenging, with a fail rate of 50.0%, indicating a critical area for intervention.\n\nInsights: High Fail Rate Assessment: The assessment '24288' has the highest fail rate at 50.0%, with 13 out of 26 submissions resulting in failure. This indicates a substantial challenge for students and suggests a need for targeted support. | Notable Outliers: Several assessments, including '34905' to '34909', exhibit a fail rate of 0.0%, indicating that these assessments are either too easy or not effectively challenging students. This could suggest a lack of engagement or relevance.\n\nEducational implications: The high fail rate of '24288' suggests that instructional strategies may need to be adjusted to better support student understanding and engagement.\n\nRecommendations: high - Conduct a curriculum review for assessment '24288'. - Given its high fail rate, a review could identify gaps in instructional support and content delivery, leading to improved student outcomes.",
  "structured_payload": {
    "task_id": "A-G04",
    "execution_id": "exec_1781847724478_910d0c3f",
    "explanation": {
      "summary": "The analysis of assessment difficulty reveals a significant concentration of students struggling with specific assessments, particularly those with high fail rates. The assessment '24288' stands out as the most challenging, with a fail rate of 50.0%, indicating a critical area for intervention.",
      "insights": [
        {
          "title": "High Fail Rate Assessment",
          "description": "The assessment '24288' has the highest fail rate at 50.0%, with 13 out of 26 submissions resulting in failure. This indicates a substantial challenge for students and suggests a need for targeted support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "fail_rate_pct",
              "value": 50,
              "comparison": "baseline",
              "delta": null,
              "context": "Assessment '24288' has the highest fail rate among all assessments."
            }
          ]
        },
        {
          "title": "Notable Outliers",
          "description": "Several assessments, including '34905' to '34909', exhibit a fail rate of 0.0%, indicating that these assessments are either too easy or not effectively challenging students. This could suggest a lack of engagement or relevance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "fail_rate_pct",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Assessments '34905' to '34909' show no failures, indicating potential issues with assessment difficulty."
            }
          ]
        }
      ],
      "educational_implications": [
        "The high fail rate of '24288' suggests that instructional strategies may need to be adjusted to better support student understanding and engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Conduct a curriculum review for assessment '24288'.",
          "rationale": "Given its high fail rate, a review could identify gaps in instructional support and content delivery, leading to improved student outcomes."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear overview of assessment performance across the cohort.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "ranking",
    "ai_summary_method_warning": null,
    "full_result_row_count": 112,
    "included_row_count": null,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": false,
    "dataset_row_breakdown": [
      {
        "dataset_name": "assessment_difficulty",
        "row_count": 112,
        "included_row_count": 112
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7886,
      "token_usage": {
        "prompt_tokens": 2808,
        "completion_tokens": 494,
        "total_tokens": 3302
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000718
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G04__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "98d89d9704a18da693168b50d7bd422b891e129a5dd36677eede4bf9822f948b",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2808,
      "completion_tokens": 494,
      "total_tokens": 3302
    },
    "latency_ms": 7893,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G04",
    "execution_id": "exec_1781847724478_910d0c3f",
    "explanation": {
      "summary": "The analysis of assessment difficulty reveals a significant concentration of students struggling with specific assessments, particularly those with high fail rates. The assessment '24288' stands out as the most challenging, with a fail rate of 50.0%, indicating a critical area for intervention.",
      "insights": [
        {
          "title": "High Fail Rate Assessment",
          "description": "The assessment '24288' has the highest fail rate at 50.0%, with 13 out of 26 submissions resulting in failure. This indicates a substantial challenge for students and suggests a need for targeted support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "fail_rate_pct",
              "value": 50,
              "comparison": "baseline",
              "delta": null,
              "context": "Assessment '24288' has the highest fail rate among all assessments."
            }
          ]
        },
        {
          "title": "Notable Outliers",
          "description": "Several assessments, including '34905' to '34909', exhibit a fail rate of 0.0%, indicating that these assessments are either too easy or not effectively challenging students. This could suggest a lack of engagement or relevance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "fail_rate_pct",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Assessments '34905' to '34909' show no failures, indicating potential issues with assessment difficulty."
            }
          ]
        }
      ],
      "educational_implications": [
        "The high fail rate of '24288' suggests that instructional strategies may need to be adjusted to better support student understanding and engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Conduct a curriculum review for assessment '24288'.",
          "rationale": "Given its high fail rate, a review could identify gaps in instructional support and content delivery, leading to improved student outcomes."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear overview of assessment performance across the cohort.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "ranking",
    "ai_summary_method_warning": null,
    "full_result_row_count": 112,
    "included_row_count": null,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": false,
    "dataset_row_breakdown": [
      {
        "dataset_name": "assessment_difficulty",
        "row_count": 112,
        "included_row_count": 112
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7886,
      "token_usage": {
        "prompt_tokens": 2808,
        "completion_tokens": 494,
        "total_tokens": 3302
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000718
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
    "expected": 112,
    "observed": 112
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae",
    "expected_values": [
      "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "efaaa326237f67aa56d5231bbd426e5831437f739fc7c8852c6e86fc6e2e1717",
    "expected": "efaaa326237f67aa56d5231bbd426e5831437f739fc7c8852c6e86fc6e2e1717"
  },
  {
    "check_id": "numeric_fields_assessment_difficulty",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "assessment_difficulty",
    "numeric_columns": [
      "assessment_order",
      "avg_score",
      "fail_count",
      "fail_rate_pct",
      "total_submissions",
      "week_of_class"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 112,
        "min": 1,
        "max": 14
      },
      "avg_score": {
        "count": 112,
        "min": 45,
        "max": 92.63
      },
      "fail_count": {
        "count": 112,
        "min": 0,
        "max": 164
      },
      "fail_rate_pct": {
        "count": 112,
        "min": 0,
        "max": 50
      },
      "total_submissions": {
        "count": 112,
        "min": 7,
        "max": 1917
      },
      "week_of_class": {
        "count": 110,
        "min": 3,
        "max": 38
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_assessment_difficulty",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "assessment_difficulty",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```

