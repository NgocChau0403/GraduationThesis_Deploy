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

# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G12__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G12__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G12",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Background group pass/fail/withdrawal rate",
  "scope": "Many students",
  "actionable_question": "Which demographic groups have the highest failure or dropout rate?",
  "target_audience": "academic_advisor, admin",
  "ai_summary_type": "group_comparison",
  "ai_prompt_hint": "For each demographic group, state fail rate and withdrawal rate as percentages. Flag groups where fail+withdrawn > cohort threshold. Note: output is categorical final_outcome — distinct from A-G08 which uses continuous avg_score.",
  "query_labels": [
    "outcome_by_group"
  ],
  "explanation_strategy": "comparison"
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
    "socioeconomic_band / gender / age_group / highest_education; final_outcome"
  ],
  "output_schema": {
    "required_columns": [
      "group_value",
      "final_outcome",
      "pct_within_group"
    ],
    "optional_columns": [
      "student_count"
    ]
  },
  "query_labels": [
    "outcome_by_group"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G12-CORE-01",
      "description": "For each demographic group, state fail rate and withdrawal rate as percentages."
    },
    {
      "requirement_id": "A-G12-CORE-02",
      "description": "Flag groups where fail+withdrawn > cohort threshold."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G12-CONSTRAINT-01",
      "description": "Do not conflate categorical pass, fail, or withdrawal outcomes with continuous score metrics when interpreting group results."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Applicable because the task compares failure and withdrawal rates across demographic groups."
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
      "dataset_label": "outcome_by_group",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G12.json",
      "artifact_sha256": "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e",
      "row_count": 53,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 53,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 53,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G12__baseline_first_20_rows.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e",
  "evidence_rows_sha256": "a5465584ca6ef16751adfb3b01e110713b6d40278cc8ff3ef83d87c1644e19f2",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 53,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__A-G12__baseline_first_20_rows__outcome_by_group__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "outcome_by_group",
        "row_start_inclusive": 0,
        "row_end_inclusive": 52,
        "row_count": 53
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
    "generated_at": "2026-06-19T07:41:45.532Z",
    "record_id": "SAMPLE_OULAD__A-G12__baseline_first_20_rows",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__A-G12__baseline_first_20_rows__outcome_by_group__chunk_1",
        "dataset_label": "outcome_by_group",
        "row_start_inclusive": 0,
        "row_end_inclusive": 52,
        "row_count": 53,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G12.json",
        "source_artifact_sha256": "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e"
      }
    ]
  },
  "retrieved_datasets_sha256": "a5465584ca6ef16751adfb3b01e110713b6d40278cc8ff3ef83d87c1644e19f2",
  "retrieved_datasets": {
    "outcome_by_group": [
      {
        "group_value": "0-10%",
        "final_outcome": "Distinction",
        "student_count": 16,
        "pct_within_group": "7.6"
      },
      {
        "group_value": "0-10%",
        "final_outcome": "Fail",
        "student_count": 29,
        "pct_within_group": "13.8"
      },
      {
        "group_value": "0-10%",
        "final_outcome": "Pass",
        "student_count": 52,
        "pct_within_group": "24.8"
      },
      {
        "group_value": "0-10%",
        "final_outcome": "Withdrawn",
        "student_count": 113,
        "pct_within_group": "53.8"
      },
      {
        "group_value": "10-20",
        "final_outcome": "Distinction",
        "student_count": 18,
        "pct_within_group": "8.1"
      },
      {
        "group_value": "10-20",
        "final_outcome": "Fail",
        "student_count": 44,
        "pct_within_group": "19.9"
      },
      {
        "group_value": "10-20",
        "final_outcome": "Pass",
        "student_count": 51,
        "pct_within_group": "23.1"
      },
      {
        "group_value": "10-20",
        "final_outcome": "Withdrawn",
        "student_count": 108,
        "pct_within_group": "48.9"
      },
      {
        "group_value": "20-30%",
        "final_outcome": "Distinction",
        "student_count": 26,
        "pct_within_group": "10"
      },
      {
        "group_value": "20-30%",
        "final_outcome": "Fail",
        "student_count": 43,
        "pct_within_group": "16.5"
      },
      {
        "group_value": "20-30%",
        "final_outcome": "Pass",
        "student_count": 53,
        "pct_within_group": "20.4"
      },
      {
        "group_value": "20-30%",
        "final_outcome": "Withdrawn",
        "student_count": 138,
        "pct_within_group": "53.1"
      },
      {
        "group_value": "30-40%",
        "final_outcome": "Distinction",
        "student_count": 23,
        "pct_within_group": "8.8"
      },
      {
        "group_value": "30-40%",
        "final_outcome": "Fail",
        "student_count": 45,
        "pct_within_group": "17.3"
      },
      {
        "group_value": "30-40%",
        "final_outcome": "Pass",
        "student_count": 78,
        "pct_within_group": "30"
      },
      {
        "group_value": "30-40%",
        "final_outcome": "Withdrawn",
        "student_count": 114,
        "pct_within_group": "43.8"
      },
      {
        "group_value": "40-50%",
        "final_outcome": "Distinction",
        "student_count": 23,
        "pct_within_group": "9.5"
      },
      {
        "group_value": "40-50%",
        "final_outcome": "Fail",
        "student_count": 34,
        "pct_within_group": "14.1"
      },
      {
        "group_value": "40-50%",
        "final_outcome": "Pass",
        "student_count": 70,
        "pct_within_group": "29"
      },
      {
        "group_value": "40-50%",
        "final_outcome": "Withdrawn",
        "student_count": 114,
        "pct_within_group": "47.3"
      },
      {
        "group_value": "50-60%",
        "final_outcome": "Distinction",
        "student_count": 26,
        "pct_within_group": "10.8"
      },
      {
        "group_value": "50-60%",
        "final_outcome": "Fail",
        "student_count": 38,
        "pct_within_group": "15.8"
      },
      {
        "group_value": "50-60%",
        "final_outcome": "Pass",
        "student_count": 76,
        "pct_within_group": "31.5"
      },
      {
        "group_value": "50-60%",
        "final_outcome": "Withdrawn",
        "student_count": 101,
        "pct_within_group": "41.9"
      },
      {
        "group_value": "60-70%",
        "final_outcome": "Distinction",
        "student_count": 29,
        "pct_within_group": "12.6"
      },
      {
        "group_value": "60-70%",
        "final_outcome": "Fail",
        "student_count": 37,
        "pct_within_group": "16.1"
      },
      {
        "group_value": "60-70%",
        "final_outcome": "Pass",
        "student_count": 71,
        "pct_within_group": "30.9"
      },
      {
        "group_value": "60-70%",
        "final_outcome": "Withdrawn",
        "student_count": 93,
        "pct_within_group": "40.4"
      },
      {
        "group_value": "70-80%",
        "final_outcome": "Distinction",
        "student_count": 34,
        "pct_within_group": "14.7"
      },
      {
        "group_value": "70-80%",
        "final_outcome": "Fail",
        "student_count": 43,
        "pct_within_group": "18.6"
      },
      {
        "group_value": "70-80%",
        "final_outcome": "Pass",
        "student_count": 62,
        "pct_within_group": "26.8"
      },
      {
        "group_value": "70-80%",
        "final_outcome": "Withdrawn",
        "student_count": 92,
        "pct_within_group": "39.8"
      },
      {
        "group_value": "80-90%",
        "final_outcome": "Distinction",
        "student_count": 37,
        "pct_within_group": "15"
      },
      {
        "group_value": "80-90%",
        "final_outcome": "Fail",
        "student_count": 41,
        "pct_within_group": "16.7"
      },
      {
        "group_value": "80-90%",
        "final_outcome": "Pass",
        "student_count": 80,
        "pct_within_group": "32.5"
      },
      {
        "group_value": "80-90%",
        "final_outcome": "Withdrawn",
        "student_count": 88,
        "pct_within_group": "35.8"
      },
      {
        "group_value": "90-100%",
        "final_outcome": "Distinction",
        "student_count": 36,
        "pct_within_group": "17"
      },
      {
        "group_value": "90-100%",
        "final_outcome": "Fail",
        "student_count": 36,
        "pct_within_group": "17"
      },
      {
        "group_value": "90-100%",
        "final_outcome": "Pass",
        "student_count": 65,
        "pct_within_group": "30.7"
      },
      {
        "group_value": "90-100%",
        "final_outcome": "Withdrawn",
        "student_count": 75,
        "pct_within_group": "35.4"
      },
      {
        "group_value": "Ireland",
        "final_outcome": "Distinction",
        "student_count": 9,
        "pct_within_group": "21.4"
      },
      {
        "group_value": "Ireland",
        "final_outcome": "Fail",
        "student_count": 2,
        "pct_within_group": "4.8"
      },
      {
        "group_value": "Ireland",
        "final_outcome": "Pass",
        "student_count": 22,
        "pct_within_group": "52.4"
      },
      {
        "group_value": "Ireland",
        "final_outcome": "Withdrawn",
        "student_count": 9,
        "pct_within_group": "21.4"
      },
      {
        "group_value": "North Region",
        "final_outcome": "Distinction",
        "student_count": 28,
        "pct_within_group": "28.6"
      },
      {
        "group_value": "North Region",
        "final_outcome": "Fail",
        "student_count": 13,
        "pct_within_group": "13.3"
      },
      {
        "group_value": "North Region",
        "final_outcome": "Pass",
        "student_count": 27,
        "pct_within_group": "27.6"
      },
      {
        "group_value": "North Region",
        "final_outcome": "Withdrawn",
        "student_count": 30,
        "pct_within_group": "30.6"
      },
      {
        "group_value": "Scotland",
        "final_outcome": "Fail",
        "student_count": 1,
        "pct_within_group": "100"
      },
      {
        "group_value": "South Region",
        "final_outcome": "Distinction",
        "student_count": 1,
        "pct_within_group": "25"
      },
      {
        "group_value": "South Region",
        "final_outcome": "Pass",
        "student_count": 1,
        "pct_within_group": "25"
      },
      {
        "group_value": "South Region",
        "final_outcome": "Withdrawn",
        "student_count": 2,
        "pct_within_group": "50"
      },
      {
        "group_value": "West Midlands Region",
        "final_outcome": "Pass",
        "student_count": 1,
        "pct_within_group": "100"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G12__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "1df872861d42f3dfd4cb710a033999db62dc9bee6f2b54a8ce5ea3c5275996c4",
  "generator_input_sha256": "831ce9348b711c4a78cf6315d6c1ccf7d4e7da7ec123fe660c1d6d245658932e",
  "generator_input_compact": {
    "task_id": "A-G12",
    "execution_id": "exec_1781847774827_593443bc",
    "task_name": "Background group pass/fail/withdrawal rate",
    "analysis_type": "segmentation",
    "explanation_strategy": "comparison",
    "actionable_question": "Which demographic groups have the highest failure or dropout rate?",
    "target_audience": [
      "academic_advisor",
      "admin"
    ],
    "query_labels": [
      "outcome_by_group"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "outcome_by_group"
    ],
    "dataset_row_counts": {
      "outcome_by_group": 53
    },
    "ai_summary_config_summary": {
      "summary_type": "group_comparison",
      "metric_column": "pct_within_group",
      "entity_column": null,
      "group_column": "group_value",
      "time_column": null,
      "sort_by": "pct_within_group",
      "sort_direction": "desc",
      "top_k": 12,
      "bottom_k": 4,
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
  "raw_text": "Summary: The analysis of the pass, fail, and withdrawal rates across different demographic groups reveals significant disparities, particularly in the 0-10% and 10-20% groups, where the combined fail and withdrawal rates exceed the cohort threshold. The 0-10% group exhibits the highest withdrawal rate, indicating a critical area for intervention.\n\nInsights: High Withdrawal Rate in 0-10% Group: The 0-10% group has a withdrawal rate of 53.8%, which is the highest among all groups analyzed, indicating a significant challenge in student retention. | Combined Fail and Withdrawal Rates Exceeding Threshold: In the 0-10% group, the combined fail (13.8%) and withdrawal (53.8%) rates total 67.6%, significantly exceeding the cohort threshold, indicating a critical need for targeted support. | Consistent Withdrawal Rates Across Groups: The withdrawal rates across the 10-20% and 20-30% groups are also notably high at 48.9% and 53.1%, respectively, suggesting a trend of increasing dropout rates as the demographic group percentage increases.\n\nEducational implications: The high withdrawal rates indicate a need for enhanced support systems for students in lower demographic groups to improve retention.\n\nRecommendations: high - Implement targeted retention programs for the 0-10% and 10-20% groups. - To address the high withdrawal and failure rates, focused interventions can help improve student engagement and success.",
  "structured_payload": {
    "task_id": "A-G12",
    "execution_id": "exec_1781847774827_593443bc",
    "explanation": {
      "summary": "The analysis of the pass, fail, and withdrawal rates across different demographic groups reveals significant disparities, particularly in the 0-10% and 10-20% groups, where the combined fail and withdrawal rates exceed the cohort threshold. The 0-10% group exhibits the highest withdrawal rate, indicating a critical area for intervention.",
      "insights": [
        {
          "title": "High Withdrawal Rate in 0-10% Group",
          "description": "The 0-10% group has a withdrawal rate of 53.8%, which is the highest among all groups analyzed, indicating a significant challenge in student retention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "53.8",
              "comparison": "baseline",
              "delta": null,
              "context": "0-10% group withdrawal rate"
            }
          ]
        },
        {
          "title": "Combined Fail and Withdrawal Rates Exceeding Threshold",
          "description": "In the 0-10% group, the combined fail (13.8%) and withdrawal (53.8%) rates total 67.6%, significantly exceeding the cohort threshold, indicating a critical need for targeted support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "combined_fail_withdrawn_rate",
              "value": 67.6,
              "comparison": "baseline",
              "delta": null,
              "context": "0-10% group combined fail and withdrawal rate"
            }
          ]
        },
        {
          "title": "Consistent Withdrawal Rates Across Groups",
          "description": "The withdrawal rates across the 10-20% and 20-30% groups are also notably high at 48.9% and 53.1%, respectively, suggesting a trend of increasing dropout rates as the demographic group percentage increases.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "48.9",
              "comparison": "up_from_previous",
              "delta": 0.2,
              "context": "10-20% group withdrawal rate"
            },
            {
              "metric": "pct_within_group",
              "value": "53.1",
              "comparison": "up_from_previous",
              "delta": 0.2,
              "context": "20-30% group withdrawal rate"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high withdrawal rates indicate a need for enhanced support systems for students in lower demographic groups to improve retention."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted retention programs for the 0-10% and 10-20% groups.",
          "rationale": "To address the high withdrawal and failure rates, focused interventions can help improve student engagement and success."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is comprehensive and covers a significant number of students across various demographic groups.",
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
      "latency_ms": 13951,
      "token_usage": {
        "prompt_tokens": 1424,
        "completion_tokens": 685,
        "total_tokens": 2109
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000625
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G12__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "1df872861d42f3dfd4cb710a033999db62dc9bee6f2b54a8ce5ea3c5275996c4",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1424,
      "completion_tokens": 685,
      "total_tokens": 2109
    },
    "latency_ms": 13955,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G12",
    "execution_id": "exec_1781847774827_593443bc",
    "explanation": {
      "summary": "The analysis of the pass, fail, and withdrawal rates across different demographic groups reveals significant disparities, particularly in the 0-10% and 10-20% groups, where the combined fail and withdrawal rates exceed the cohort threshold. The 0-10% group exhibits the highest withdrawal rate, indicating a critical area for intervention.",
      "insights": [
        {
          "title": "High Withdrawal Rate in 0-10% Group",
          "description": "The 0-10% group has a withdrawal rate of 53.8%, which is the highest among all groups analyzed, indicating a significant challenge in student retention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "53.8",
              "comparison": "baseline",
              "delta": null,
              "context": "0-10% group withdrawal rate"
            }
          ]
        },
        {
          "title": "Combined Fail and Withdrawal Rates Exceeding Threshold",
          "description": "In the 0-10% group, the combined fail (13.8%) and withdrawal (53.8%) rates total 67.6%, significantly exceeding the cohort threshold, indicating a critical need for targeted support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "combined_fail_withdrawn_rate",
              "value": 67.6,
              "comparison": "baseline",
              "delta": null,
              "context": "0-10% group combined fail and withdrawal rate"
            }
          ]
        },
        {
          "title": "Consistent Withdrawal Rates Across Groups",
          "description": "The withdrawal rates across the 10-20% and 20-30% groups are also notably high at 48.9% and 53.1%, respectively, suggesting a trend of increasing dropout rates as the demographic group percentage increases.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "48.9",
              "comparison": "up_from_previous",
              "delta": 0.2,
              "context": "10-20% group withdrawal rate"
            },
            {
              "metric": "pct_within_group",
              "value": "53.1",
              "comparison": "up_from_previous",
              "delta": 0.2,
              "context": "20-30% group withdrawal rate"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high withdrawal rates indicate a need for enhanced support systems for students in lower demographic groups to improve retention."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted retention programs for the 0-10% and 10-20% groups.",
          "rationale": "To address the high withdrawal and failure rates, focused interventions can help improve student engagement and success."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is comprehensive and covers a significant number of students across various demographic groups.",
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
      "latency_ms": 13951,
      "token_usage": {
        "prompt_tokens": 1424,
        "completion_tokens": 685,
        "total_tokens": 2109
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000625
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
    "expected": 53,
    "observed": 53
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e",
    "expected_values": [
      "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "a5465584ca6ef16751adfb3b01e110713b6d40278cc8ff3ef83d87c1644e19f2",
    "expected": "a5465584ca6ef16751adfb3b01e110713b6d40278cc8ff3ef83d87c1644e19f2"
  },
  {
    "check_id": "numeric_fields_outcome_by_group",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "outcome_by_group",
    "numeric_columns": [
      "student_count"
    ],
    "numeric_summaries": {
      "student_count": {
        "count": 53,
        "min": 1,
        "max": 138
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_outcome_by_group",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "outcome_by_group",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```

