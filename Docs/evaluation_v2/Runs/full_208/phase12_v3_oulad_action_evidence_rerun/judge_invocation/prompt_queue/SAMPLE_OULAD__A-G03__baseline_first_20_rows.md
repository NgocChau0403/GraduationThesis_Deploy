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

# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G03__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G03__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G03",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Identify at-risk cohort",
  "scope": "Many students",
  "actionable_question": "Who should the admin contact first this week?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Rank at-risk students by at_risk_score. For each high-risk student, explain triggered_flags_summary and recommend the recommended_admin_action. Do not invent reasons outside triggered_flags.",
  "query_labels": [
    "at_risk_cohort"
  ],
  "explanation_strategy": "risk"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "assessment_result",
    "assessment",
    "engagement"
  ],
  "key_db_fields": [
    "at_risk_score [FE cross]",
    "at_risk_label [FE cross]",
    "avg_score [FE cross]",
    "final_outcome"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "avg_score",
      "at_risk_score",
      "at_risk_label",
      "triggered_flags"
    ],
    "optional_columns": [
      "enrollment_id",
      "score_strategy",
      "score_scale",
      "pass_threshold",
      "target_threshold",
      "engagement_score",
      "engagement_score_available",
      "punctuality_rate",
      "previous_attempt_count",
      "triggered_flags_summary",
      "primary_support_category",
      "recommended_admin_action",
      "flag_low_score",
      "flag_repeated",
      "flag_low_engagement",
      "flag_low_punctuality",
      "flag_neg_trend",
      "final_outcome"
    ]
  },
  "query_labels": [
    "at_risk_cohort"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G03-CORE-01",
      "description": "Rank at-risk students by at_risk_score."
    },
    {
      "requirement_id": "A-G03-CORE-02",
      "description": "For each high-risk student, explain triggered_flags_summary and recommend the recommended_admin_action."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G03-CONSTRAINT-01",
      "description": "Do not invent reasons outside triggered_flags."
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

## Deterministic Retrieval Evidence

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "at_risk_cohort",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G03.json",
      "artifact_sha256": "bf3c4b346f04ad4be918669370ed792533f943aa3a643588deba688cb7f693f2",
      "row_count": 50,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 50,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 50,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G03__baseline_first_20_rows.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "bf3c4b346f04ad4be918669370ed792533f943aa3a643588deba688cb7f693f2",
  "evidence_rows_sha256": "f824f080be8aefa1e2faaa0ee1c0ca95154fbb90e6670dcb57bd143b526051f8",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 50,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__A-G03__baseline_first_20_rows__at_risk_cohort__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "at_risk_cohort",
        "row_start_inclusive": 0,
        "row_end_inclusive": 49,
        "row_count": 50
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
    "generated_at": "2026-06-19T07:41:45.431Z",
    "record_id": "SAMPLE_OULAD__A-G03__baseline_first_20_rows",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__A-G03__baseline_first_20_rows__at_risk_cohort__chunk_1",
        "dataset_label": "at_risk_cohort",
        "row_start_inclusive": 0,
        "row_end_inclusive": 49,
        "row_count": 50,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G03.json",
        "source_artifact_sha256": "bf3c4b346f04ad4be918669370ed792533f943aa3a643588deba688cb7f693f2"
      }
    ]
  },
  "retrieved_datasets_sha256": "f824f080be8aefa1e2faaa0ee1c0ca95154fbb90e6670dcb57bd143b526051f8",
  "retrieved_datasets": {
    "at_risk_cohort": [
      {
        "student_id": "SAMPLE_OULAD_STU_624354",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_624354",
        "avg_score": 21.81,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.046714457424490825,
        "engagement_score_available": true,
        "punctuality_rate": 0.16666666666666666,
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 21.81 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.047 < 0.15",
          "low_punctuality: punctuality_rate 0.167 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 21.81 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.047 < 0.15; low_punctuality: punctuality_rate 0.167 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_548926",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_548926",
        "avg_score": 26.53,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.01790976183798808,
        "engagement_score_available": true,
        "punctuality_rate": 0.5,
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 26.53 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.018 < 0.15",
          "low_punctuality: punctuality_rate 0.500 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 26.53 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.018 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_532565",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_532565",
        "avg_score": 30.73,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.09839982523281676,
        "engagement_score_available": true,
        "punctuality_rate": 0.3333333333333333,
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 30.73 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.098 < 0.15",
          "low_punctuality: punctuality_rate 0.333 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 30.73 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.098 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_586526",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_586526",
        "avg_score": 31,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.06530425851952765,
        "engagement_score_available": true,
        "punctuality_rate": 0.3333333333333333,
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 31 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.065 < 0.15",
          "low_punctuality: punctuality_rate 0.333 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 31 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.065 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_165733",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_165733",
        "avg_score": 32.67,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.07306476787168799,
        "engagement_score_available": true,
        "punctuality_rate": 0.25,
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 32.67 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.073 < 0.15",
          "low_punctuality: punctuality_rate 0.250 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 32.67 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.073 < 0.15; low_punctuality: punctuality_rate 0.250 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_630200",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_630200",
        "avg_score": 33.35,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.033872467045626936,
        "engagement_score_available": true,
        "punctuality_rate": 0.5714285714285714,
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 33.35 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.034 < 0.15",
          "low_punctuality: punctuality_rate 0.571 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 33.35 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.034 < 0.15; low_punctuality: punctuality_rate 0.571 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_171896",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_171896",
        "avg_score": 33.67,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.08589304868297251,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 33.67 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.086 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 33.67 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.086 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_515734",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_515734",
        "avg_score": 34.6,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.13760263176012072,
        "engagement_score_available": true,
        "punctuality_rate": 0.5,
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 34.6 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.138 < 0.15",
          "low_punctuality: punctuality_rate 0.500 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 34.6 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.138 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_465619",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_465619",
        "avg_score": 35.27,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.03955463575616163,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 35.27 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.040 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 35.27 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.040 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_416860",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_416860",
        "avg_score": 35.9,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.13750927258524595,
        "engagement_score_available": true,
        "punctuality_rate": 0.2,
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 35.9 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.138 < 0.15",
          "low_punctuality: punctuality_rate 0.200 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 35.9 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.138 < 0.15; low_punctuality: punctuality_rate 0.200 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_616439",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_616439",
        "avg_score": 37.28,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.08588284101580743,
        "engagement_score_available": true,
        "punctuality_rate": 0.5,
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 37.28 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.086 < 0.15",
          "low_punctuality: punctuality_rate 0.500 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 37.28 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.086 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_1561750",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_1561750",
        "avg_score": 37.62,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.12213004359344456,
        "engagement_score_available": true,
        "punctuality_rate": 0.25,
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 37.62 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.122 < 0.15",
          "low_punctuality: punctuality_rate 0.250 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 37.62 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.122 < 0.15; low_punctuality: punctuality_rate 0.250 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_632637",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_632637",
        "avg_score": 39.29,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.07791840184590387,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 39.29 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.078 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 39.29 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.078 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_465764",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_465764",
        "avg_score": 0,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.013256257747023312,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 0 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.013 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7"
        ],
        "triggered_flags_summary": "low_score: avg_score 0 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.013 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": null,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_469614",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_469614",
        "avg_score": 0,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.022639115601756136,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 0 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.023 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7"
        ],
        "triggered_flags_summary": "low_score: avg_score 0 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.023 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": null,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_566664",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_566664",
        "avg_score": 0,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.017599061311868523,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 0 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.018 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7"
        ],
        "triggered_flags_summary": "low_score: avg_score 0 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.018 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": null,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_522004",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_522004",
        "avg_score": 4,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.02727891012514153,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 4 < pass_threshold 40",
          "low_engagement: engagement_score 0.027 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 4 < pass_threshold 40; low_engagement: engagement_score 0.027 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_2470326",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_2470326",
        "avg_score": 7.29,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.093180354428086,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 7.29 < pass_threshold 40",
          "low_engagement: engagement_score 0.093 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 7.29 < pass_threshold 40; low_engagement: engagement_score 0.093 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_625928",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_625928",
        "avg_score": 7.89,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.04017953870881505,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 7.89 < pass_threshold 40",
          "low_engagement: engagement_score 0.040 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 7.89 < pass_threshold 40; low_engagement: engagement_score 0.040 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_624730",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_624730",
        "avg_score": 8,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.017164080575301142,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 8 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.017 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7"
        ],
        "triggered_flags_summary": "low_score: avg_score 8 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.017 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": null,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_1744800",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_1744800",
        "avg_score": 11,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.05076027003079586,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 11 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.051 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7"
        ],
        "triggered_flags_summary": "low_score: avg_score 11 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.051 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": null,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_556476",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_556476",
        "avg_score": 12.78,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.12364211948722642,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 12.78 < pass_threshold 40",
          "low_engagement: engagement_score 0.124 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 12.78 < pass_threshold 40; low_engagement: engagement_score 0.124 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_647735",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_647735",
        "avg_score": 15,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.021589737613778234,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 15 < pass_threshold 40",
          "low_engagement: engagement_score 0.022 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 15 < pass_threshold 40; low_engagement: engagement_score 0.022 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_502004",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_502004",
        "avg_score": 17.09,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.052955887082040735,
        "engagement_score_available": true,
        "punctuality_rate": 0.5,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 17.09 < pass_threshold 40",
          "low_engagement: engagement_score 0.053 < 0.15",
          "low_punctuality: punctuality_rate 0.500 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 17.09 < pass_threshold 40; low_engagement: engagement_score 0.053 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_338731",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_338731",
        "avg_score": 18.6,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.3351325402249144,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 18.6 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 18.6 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": false,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_649607",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_649607",
        "avg_score": 20.2,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.028621777171245314,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 20.2 < pass_threshold 40",
          "low_engagement: engagement_score 0.029 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 20.2 < pass_threshold 40; low_engagement: engagement_score 0.029 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_508295",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_508295",
        "avg_score": 20.36,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.04453955374165393,
        "engagement_score_available": true,
        "punctuality_rate": 0.5,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 20.36 < pass_threshold 40",
          "low_engagement: engagement_score 0.045 < 0.15",
          "low_punctuality: punctuality_rate 0.500 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 20.36 < pass_threshold 40; low_engagement: engagement_score 0.045 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_559518",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_559518",
        "avg_score": 21.17,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.043338178373991634,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 21.17 < pass_threshold 40",
          "low_engagement: engagement_score 0.043 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 21.17 < pass_threshold 40; low_engagement: engagement_score 0.043 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_682259",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_682259",
        "avg_score": 21.28,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.06796927924332724,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 21.28 < pass_threshold 40",
          "low_engagement: engagement_score 0.068 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 21.28 < pass_threshold 40; low_engagement: engagement_score 0.068 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_617327",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_617327",
        "avg_score": 21.35,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.0138948702672561,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 21.35 < pass_threshold 40",
          "low_engagement: engagement_score 0.014 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 21.35 < pass_threshold 40; low_engagement: engagement_score 0.014 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_69494",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_69494",
        "avg_score": 21.46,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.17028072723891394,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 21.46 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 21.46 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": false,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_574523",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_574523",
        "avg_score": 22,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.005109198195940121,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 22 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.005 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7"
        ],
        "triggered_flags_summary": "low_score: avg_score 22 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.005 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": null,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_2202076",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_2202076",
        "avg_score": 22,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.026578157499684826,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 22 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.027 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7"
        ],
        "triggered_flags_summary": "low_score: avg_score 22 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.027 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": null,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_1439723",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_1439723",
        "avg_score": 22.06,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.12342798200231811,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 22.06 < pass_threshold 40",
          "low_engagement: engagement_score 0.123 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 22.06 < pass_threshold 40; low_engagement: engagement_score 0.123 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_264845",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_264845",
        "avg_score": 22.51,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.1265107719946914,
        "engagement_score_available": true,
        "punctuality_rate": 0.5,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 22.51 < pass_threshold 40",
          "low_engagement: engagement_score 0.127 < 0.15",
          "low_punctuality: punctuality_rate 0.500 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 22.51 < pass_threshold 40; low_engagement: engagement_score 0.127 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_592372",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_592372",
        "avg_score": 22.64,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.12657991590074394,
        "engagement_score_available": true,
        "punctuality_rate": 0.3333333333333333,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 22.64 < pass_threshold 40",
          "low_engagement: engagement_score 0.127 < 0.15",
          "low_punctuality: punctuality_rate 0.333 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 22.64 < pass_threshold 40; low_engagement: engagement_score 0.127 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_568307",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_568307",
        "avg_score": 23,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.03118673295341936,
        "engagement_score_available": true,
        "punctuality_rate": 0.3333333333333333,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 23 < pass_threshold 40",
          "low_engagement: engagement_score 0.031 < 0.15",
          "low_punctuality: punctuality_rate 0.333 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 23 < pass_threshold 40; low_engagement: engagement_score 0.031 < 0.15; low_punctuality: punctuality_rate 0.333 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_527958",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_527958",
        "avg_score": 23.88,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.06693361082292872,
        "engagement_score_available": true,
        "punctuality_rate": 0.2,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 23.88 < pass_threshold 40",
          "low_engagement: engagement_score 0.067 < 0.15",
          "low_punctuality: punctuality_rate 0.200 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 23.88 < pass_threshold 40; low_engagement: engagement_score 0.067 < 0.15; low_punctuality: punctuality_rate 0.200 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_1864086",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_1864086",
        "avg_score": 24,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.019231915515683894,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 24 < pass_threshold 40",
          "low_engagement: engagement_score 0.019 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 24 < pass_threshold 40; low_engagement: engagement_score 0.019 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_624957",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_624957",
        "avg_score": 24.83,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.05792009169912506,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 24.83 < pass_threshold 40",
          "low_engagement: engagement_score 0.058 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 24.83 < pass_threshold 40; low_engagement: engagement_score 0.058 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_2421961",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_2421961",
        "avg_score": 24.85,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.021192681713612497,
        "engagement_score_available": true,
        "punctuality_rate": 0.25,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 24.85 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.021 < 0.15",
          "low_punctuality: punctuality_rate 0.250 < 0.7"
        ],
        "triggered_flags_summary": "low_score: avg_score 24.85 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.021 < 0.15; low_punctuality: punctuality_rate 0.250 < 0.7",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_690589",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_690589",
        "avg_score": 25.7,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.12685589545679832,
        "engagement_score_available": true,
        "punctuality_rate": 0.25,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 25.7 < pass_threshold 40",
          "low_engagement: engagement_score 0.127 < 0.15",
          "low_punctuality: punctuality_rate 0.250 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 25.7 < pass_threshold 40; low_engagement: engagement_score 0.127 < 0.15; low_punctuality: punctuality_rate 0.250 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_613122",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_613122",
        "avg_score": 26.03,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.13049153866351387,
        "engagement_score_available": true,
        "punctuality_rate": 0.2857142857142857,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 26.03 < pass_threshold 40",
          "low_engagement: engagement_score 0.130 < 0.15",
          "low_punctuality: punctuality_rate 0.286 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 26.03 < pass_threshold 40; low_engagement: engagement_score 0.130 < 0.15; low_punctuality: punctuality_rate 0.286 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_577458",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_577458",
        "avg_score": 26.87,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.11890926382304405,
        "engagement_score_available": true,
        "punctuality_rate": 0.25,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 26.87 < pass_threshold 40",
          "low_engagement: engagement_score 0.119 < 0.15",
          "low_punctuality: punctuality_rate 0.250 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 26.87 < pass_threshold 40; low_engagement: engagement_score 0.119 < 0.15; low_punctuality: punctuality_rate 0.250 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_675915",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_675915",
        "avg_score": 27.24,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.1469373571112868,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 27.24 < pass_threshold 40",
          "low_engagement: engagement_score 0.147 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 27.24 < pass_threshold 40; low_engagement: engagement_score 0.147 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_546139",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_546139",
        "avg_score": 27.5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.04608955447183742,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 27.5 < pass_threshold 40",
          "low_engagement: engagement_score 0.046 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 27.5 < pass_threshold 40; low_engagement: engagement_score 0.046 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_634721",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_634721",
        "avg_score": 27.82,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.122523597593196,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 27.82 < pass_threshold 40",
          "low_engagement: engagement_score 0.123 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 27.82 < pass_threshold 40; low_engagement: engagement_score 0.123 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_145490",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_145490",
        "avg_score": 27.87,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.129334793899004,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 27.87 < pass_threshold 40",
          "low_engagement: engagement_score 0.129 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 27.87 < pass_threshold 40; low_engagement: engagement_score 0.129 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_145114",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_145114",
        "avg_score": 28.18,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.0940366063336414,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 28.18 < pass_threshold 40",
          "low_engagement: engagement_score 0.094 < 0.15",
          "low_punctuality: punctuality_rate 0.000 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 28.18 < pass_threshold 40; low_engagement: engagement_score 0.094 < 0.15; low_punctuality: punctuality_rate 0.000 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_633334",
        "enrollment_id": "SAMPLE_OULAD_ENR_SAMPLE_OULAD_CLASS_CCC_2014J_SAMPLE_OULAD_STU_633334",
        "avg_score": 28.58,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0.03200826388890959,
        "engagement_score_available": true,
        "punctuality_rate": 0.5,
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 28.58 < pass_threshold 40",
          "low_engagement: engagement_score 0.032 < 0.15",
          "low_punctuality: punctuality_rate 0.500 < 0.7",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 28.58 < pass_threshold 40; low_engagement: engagement_score 0.032 < 0.15; low_punctuality: punctuality_rate 0.500 < 0.7; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": true,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G03__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "e5f9c6f283773053b41ab01b5d9868144d1a2ad865c9c7982963d616d7b3349c",
  "generator_input_sha256": "ad92a31ed7312ee68f7e940bc8d59359edaf85c4e3443c353fdb7a71faa8d3db",
  "generator_input_compact": {
    "task_id": "A-G03",
    "execution_id": "exec_1781847699944_3839ef19",
    "task_name": "Identify at-risk cohort",
    "analysis_type": "ranking",
    "explanation_strategy": "risk",
    "actionable_question": "Who should the admin contact first this week?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "at_risk_cohort"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "at_risk_cohort"
    ],
    "dataset_row_counts": {
      "at_risk_cohort": 50
    },
    "ai_summary_config_summary": {
      "summary_type": "ranking",
      "metric_column": "at_risk_score",
      "entity_column": "student_id",
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
  "raw_text": "Summary: A cohort of students has been identified as high-risk due to multiple simultaneous risk signals, including low average scores, low engagement, and low punctuality. These indicators suggest a need for immediate academic support to improve their performance and engagement levels.\n\nInsights: High-Risk Students with Multiple Flags: Students such as SAMPLE_OULAD_STU_624354, SAMPLE_OULAD_STU_548926, and SAMPLE_OULAD_STU_532565 exhibit multiple risk flags including low average scores below the pass threshold, low engagement scores, and low punctuality rates. These patterns indicate a significant risk of failing or withdrawing from the course.\n\nEducational implications: Students with low scores and engagement may require tailored academic support to address their specific learning needs.\n\nRecommendations: high - Prioritise academic support for low average score. - This action addresses the immediate academic needs of students who are struggling, as indicated by their low average scores and engagement levels.",
  "structured_payload": {
    "task_id": "A-G03",
    "execution_id": "exec_1781847699944_3839ef19",
    "explanation": {
      "summary": "A cohort of students has been identified as high-risk due to multiple simultaneous risk signals, including low average scores, low engagement, and low punctuality. These indicators suggest a need for immediate academic support to improve their performance and engagement levels.",
      "insights": [
        {
          "title": "High-Risk Students with Multiple Flags",
          "description": "Students such as SAMPLE_OULAD_STU_624354, SAMPLE_OULAD_STU_548926, and SAMPLE_OULAD_STU_532565 exhibit multiple risk flags including low average scores below the pass threshold, low engagement scores, and low punctuality rates. These patterns indicate a significant risk of failing or withdrawing from the course.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 21.81,
              "comparison": "down_from_previous",
              "delta": -18.19,
              "context": "SAMPLE_OULAD_STU_624354"
            },
            {
              "metric": "engagement_score",
              "value": 0.0467,
              "comparison": "down_from_previous",
              "delta": -0.1033,
              "context": "SAMPLE_OULAD_STU_624354"
            },
            {
              "metric": "punctuality_rate",
              "value": 0.1667,
              "comparison": "down_from_previous",
              "delta": -0.5333,
              "context": "SAMPLE_OULAD_STU_624354"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students with low scores and engagement may require tailored academic support to address their specific learning needs."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Prioritise academic support for low average score.",
          "rationale": "This action addresses the immediate academic needs of students who are struggling, as indicated by their low average scores and engagement levels."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is comprehensive and reflects consistent patterns across multiple students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
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
      "latency_ms": 7371,
      "token_usage": {
        "prompt_tokens": 8680,
        "completion_tokens": 480,
        "total_tokens": 9160
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.00159
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G03__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "e5f9c6f283773053b41ab01b5d9868144d1a2ad865c9c7982963d616d7b3349c",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 8680,
      "completion_tokens": 480,
      "total_tokens": 9160
    },
    "latency_ms": 7379,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G03",
    "execution_id": "exec_1781847699944_3839ef19",
    "explanation": {
      "summary": "A cohort of students has been identified as high-risk due to multiple simultaneous risk signals, including low average scores, low engagement, and low punctuality. These indicators suggest a need for immediate academic support to improve their performance and engagement levels.",
      "insights": [
        {
          "title": "High-Risk Students with Multiple Flags",
          "description": "Students such as SAMPLE_OULAD_STU_624354, SAMPLE_OULAD_STU_548926, and SAMPLE_OULAD_STU_532565 exhibit multiple risk flags including low average scores below the pass threshold, low engagement scores, and low punctuality rates. These patterns indicate a significant risk of failing or withdrawing from the course.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 21.81,
              "comparison": "down_from_previous",
              "delta": -18.19,
              "context": "SAMPLE_OULAD_STU_624354"
            },
            {
              "metric": "engagement_score",
              "value": 0.0467,
              "comparison": "down_from_previous",
              "delta": -0.1033,
              "context": "SAMPLE_OULAD_STU_624354"
            },
            {
              "metric": "punctuality_rate",
              "value": 0.1667,
              "comparison": "down_from_previous",
              "delta": -0.5333,
              "context": "SAMPLE_OULAD_STU_624354"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students with low scores and engagement may require tailored academic support to address their specific learning needs."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Prioritise academic support for low average score.",
          "rationale": "This action addresses the immediate academic needs of students who are struggling, as indicated by their low average scores and engagement levels."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is comprehensive and reflects consistent patterns across multiple students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
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
      "latency_ms": 7371,
      "token_usage": {
        "prompt_tokens": 8680,
        "completion_tokens": 480,
        "total_tokens": 9160
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.00159
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
    "expected": 50,
    "observed": 50
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "bf3c4b346f04ad4be918669370ed792533f943aa3a643588deba688cb7f693f2",
    "expected_values": [
      "bf3c4b346f04ad4be918669370ed792533f943aa3a643588deba688cb7f693f2"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "f824f080be8aefa1e2faaa0ee1c0ca95154fbb90e6670dcb57bd143b526051f8",
    "expected": "f824f080be8aefa1e2faaa0ee1c0ca95154fbb90e6670dcb57bd143b526051f8"
  },
  {
    "check_id": "numeric_fields_at_risk_cohort",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "at_risk_cohort",
    "numeric_columns": [
      "at_risk_score",
      "avg_score",
      "engagement_score",
      "pass_threshold",
      "previous_attempt_count",
      "punctuality_rate",
      "score_scale",
      "target_threshold"
    ],
    "numeric_summaries": {
      "at_risk_score": {
        "count": 50,
        "min": 4,
        "max": 5
      },
      "avg_score": {
        "count": 50,
        "min": 0,
        "max": 39.29
      },
      "engagement_score": {
        "count": 50,
        "min": 0.005109198195940121,
        "max": 0.3351325402249144
      },
      "pass_threshold": {
        "count": 50,
        "min": 40,
        "max": 40
      },
      "previous_attempt_count": {
        "count": 50,
        "min": 0,
        "max": 1
      },
      "punctuality_rate": {
        "count": 50,
        "min": 0,
        "max": 0.5714285714285714
      },
      "score_scale": {
        "count": 50,
        "min": 100,
        "max": 100
      },
      "target_threshold": {
        "count": 50,
        "min": 70,
        "max": 70
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_at_risk_cohort",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "at_risk_cohort",
    "flag_columns": [
      "pass_threshold",
      "target_threshold",
      "at_risk_score",
      "at_risk_label",
      "triggered_flags",
      "triggered_flags_summary",
      "flag_low_score",
      "flag_repeated",
      "flag_low_engagement",
      "flag_low_punctuality",
      "flag_neg_trend"
    ],
    "triggered_like_counts": {
      "pass_threshold": 0,
      "target_threshold": 0,
      "at_risk_score": 0,
      "at_risk_label": 0,
      "triggered_flags": 0,
      "triggered_flags_summary": 0,
      "flag_low_score": 50,
      "flag_repeated": 23,
      "flag_low_engagement": 48,
      "flag_low_punctuality": 50,
      "flag_neg_trend": 42
    }
  }
]
```

