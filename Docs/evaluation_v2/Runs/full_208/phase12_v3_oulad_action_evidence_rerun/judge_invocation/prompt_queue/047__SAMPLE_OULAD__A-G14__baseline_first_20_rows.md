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

# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G14__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G14__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G14",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Early withdrawal signal analysis",
  "scope": "Many students",
  "actionable_question": "How early can admin detect a student about to drop out?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "trend_comparison",
  "ai_prompt_hint": "Use early_warning_week [FE] to show when engagement collapsed for withdrawn students. Compare to passing students.",
  "query_labels": [
    "withdrawal_signal_trend"
  ],
  "explanation_strategy": "trend"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement [OULAD only]"
  ],
  "key_db_fields": [
    "week_number",
    "engagement_count; final_outcome",
    "avg_clicks by outcome group"
  ],
  "output_schema": {},
  "query_labels": [
    "withdrawal_signal_trend"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G14-CORE-01",
      "description": "Identify when engagement collapsed for withdrawn students."
    },
    {
      "requirement_id": "A-G14-CORE-02",
      "description": "Compare the timing or trajectory with passing students."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G14-CONSTRAINT-01",
      "description": "Use early_warning_week as the primary collapse-timing field when returned."
    },
    {
      "constraint_id": "A-G14-CONSTRAINT-02",
      "description": "Frame the comparison as an observed pattern, not proof of withdrawal causation."
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
      "dataset_label": "withdrawal_signal_trend",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G14.json",
      "artifact_sha256": "64c67afde434dcdc16e3b44225b1be83ff387bfc4ca03234bd334a5e7b8e5e9a",
      "row_count": 164,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 164,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 164,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G14__baseline_first_20_rows.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "64c67afde434dcdc16e3b44225b1be83ff387bfc4ca03234bd334a5e7b8e5e9a",
  "evidence_rows_sha256": "4364e835b8582e11d11d490373138a0b17d222dfbca1533b41a9bf39123cfd2c",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 164,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__A-G14__baseline_first_20_rows__withdrawal_signal_trend__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "withdrawal_signal_trend",
        "row_start_inclusive": 0,
        "row_end_inclusive": 163,
        "row_count": 164
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
    "generated_at": "2026-06-19T07:41:45.545Z",
    "record_id": "SAMPLE_OULAD__A-G14__baseline_first_20_rows",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__A-G14__baseline_first_20_rows__withdrawal_signal_trend__chunk_1",
        "dataset_label": "withdrawal_signal_trend",
        "row_start_inclusive": 0,
        "row_end_inclusive": 163,
        "row_count": 164,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G14.json",
        "source_artifact_sha256": "64c67afde434dcdc16e3b44225b1be83ff387bfc4ca03234bd334a5e7b8e5e9a"
      }
    ]
  },
  "retrieved_datasets_sha256": "4364e835b8582e11d11d490373138a0b17d222dfbca1533b41a9bf39123cfd2c",
  "retrieved_datasets": {
    "withdrawal_signal_trend": [
      {
        "week_number": -2,
        "final_outcome": "Distinction",
        "avg_clicks": "48.4",
        "student_count": 214
      },
      {
        "week_number": -1,
        "final_outcome": "Distinction",
        "avg_clicks": "51.02",
        "student_count": 227
      },
      {
        "week_number": 0,
        "final_outcome": "Distinction",
        "avg_clicks": "69.38",
        "student_count": 262
      },
      {
        "week_number": 1,
        "final_outcome": "Distinction",
        "avg_clicks": "138.61",
        "student_count": 282
      },
      {
        "week_number": 2,
        "final_outcome": "Distinction",
        "avg_clicks": "125.77",
        "student_count": 290
      },
      {
        "week_number": 3,
        "final_outcome": "Distinction",
        "avg_clicks": "120.21",
        "student_count": 290
      },
      {
        "week_number": 4,
        "final_outcome": "Distinction",
        "avg_clicks": "92.58",
        "student_count": 287
      },
      {
        "week_number": 5,
        "final_outcome": "Distinction",
        "avg_clicks": "86.04",
        "student_count": 298
      },
      {
        "week_number": 6,
        "final_outcome": "Distinction",
        "avg_clicks": "73.13",
        "student_count": 272
      },
      {
        "week_number": 7,
        "final_outcome": "Distinction",
        "avg_clicks": "78.52",
        "student_count": 260
      },
      {
        "week_number": 8,
        "final_outcome": "Distinction",
        "avg_clicks": "75.69",
        "student_count": 266
      },
      {
        "week_number": 9,
        "final_outcome": "Distinction",
        "avg_clicks": "81",
        "student_count": 274
      },
      {
        "week_number": 10,
        "final_outcome": "Distinction",
        "avg_clicks": "112.63",
        "student_count": 292
      },
      {
        "week_number": 11,
        "final_outcome": "Distinction",
        "avg_clicks": "41.17",
        "student_count": 239
      },
      {
        "week_number": 12,
        "final_outcome": "Distinction",
        "avg_clicks": "38.45",
        "student_count": 185
      },
      {
        "week_number": 13,
        "final_outcome": "Distinction",
        "avg_clicks": "40.36",
        "student_count": 219
      },
      {
        "week_number": 14,
        "final_outcome": "Distinction",
        "avg_clicks": "58.68",
        "student_count": 266
      },
      {
        "week_number": 15,
        "final_outcome": "Distinction",
        "avg_clicks": "57.35",
        "student_count": 266
      },
      {
        "week_number": 16,
        "final_outcome": "Distinction",
        "avg_clicks": "77.58",
        "student_count": 288
      },
      {
        "week_number": 17,
        "final_outcome": "Distinction",
        "avg_clicks": "70.65",
        "student_count": 264
      },
      {
        "week_number": 18,
        "final_outcome": "Distinction",
        "avg_clicks": "63.26",
        "student_count": 266
      },
      {
        "week_number": 19,
        "final_outcome": "Distinction",
        "avg_clicks": "50.31",
        "student_count": 250
      },
      {
        "week_number": 20,
        "final_outcome": "Distinction",
        "avg_clicks": "72.17",
        "student_count": 266
      },
      {
        "week_number": 21,
        "final_outcome": "Distinction",
        "avg_clicks": "124.55",
        "student_count": 292
      },
      {
        "week_number": 22,
        "final_outcome": "Distinction",
        "avg_clicks": "56.53",
        "student_count": 280
      },
      {
        "week_number": 23,
        "final_outcome": "Distinction",
        "avg_clicks": "51.33",
        "student_count": 284
      },
      {
        "week_number": 24,
        "final_outcome": "Distinction",
        "avg_clicks": "38.11",
        "student_count": 267
      },
      {
        "week_number": 25,
        "final_outcome": "Distinction",
        "avg_clicks": "38.96",
        "student_count": 253
      },
      {
        "week_number": 26,
        "final_outcome": "Distinction",
        "avg_clicks": "46.6",
        "student_count": 239
      },
      {
        "week_number": 27,
        "final_outcome": "Distinction",
        "avg_clicks": "44.2",
        "student_count": 220
      },
      {
        "week_number": 28,
        "final_outcome": "Distinction",
        "avg_clicks": "49.65",
        "student_count": 237
      },
      {
        "week_number": 29,
        "final_outcome": "Distinction",
        "avg_clicks": "58.83",
        "student_count": 267
      },
      {
        "week_number": 30,
        "final_outcome": "Distinction",
        "avg_clicks": "77.34",
        "student_count": 291
      },
      {
        "week_number": 31,
        "final_outcome": "Distinction",
        "avg_clicks": "113.04",
        "student_count": 286
      },
      {
        "week_number": 32,
        "final_outcome": "Distinction",
        "avg_clicks": "74.52",
        "student_count": 256
      },
      {
        "week_number": 33,
        "final_outcome": "Distinction",
        "avg_clicks": "100.8",
        "student_count": 245
      },
      {
        "week_number": 34,
        "final_outcome": "Distinction",
        "avg_clicks": "137.18",
        "student_count": 261
      },
      {
        "week_number": 35,
        "final_outcome": "Distinction",
        "avg_clicks": "142.03",
        "student_count": 292
      },
      {
        "week_number": 36,
        "final_outcome": "Distinction",
        "avg_clicks": "21.39",
        "student_count": 188
      },
      {
        "week_number": 37,
        "final_outcome": "Distinction",
        "avg_clicks": "11.59",
        "student_count": 162
      },
      {
        "week_number": 38,
        "final_outcome": "Distinction",
        "avg_clicks": "11.8",
        "student_count": 142
      },
      {
        "week_number": 39,
        "final_outcome": "Distinction",
        "avg_clicks": "7.12",
        "student_count": 104
      },
      {
        "week_number": -2,
        "final_outcome": "Fail",
        "avg_clicks": "26.65",
        "student_count": 180
      },
      {
        "week_number": -1,
        "final_outcome": "Fail",
        "avg_clicks": "23.17",
        "student_count": 198
      },
      {
        "week_number": 0,
        "final_outcome": "Fail",
        "avg_clicks": "27.08",
        "student_count": 226
      },
      {
        "week_number": 1,
        "final_outcome": "Fail",
        "avg_clicks": "46.53",
        "student_count": 298
      },
      {
        "week_number": 2,
        "final_outcome": "Fail",
        "avg_clicks": "70.59",
        "student_count": 298
      },
      {
        "week_number": 3,
        "final_outcome": "Fail",
        "avg_clicks": "112.02",
        "student_count": 356
      },
      {
        "week_number": 4,
        "final_outcome": "Fail",
        "avg_clicks": "36.97",
        "student_count": 279
      },
      {
        "week_number": 5,
        "final_outcome": "Fail",
        "avg_clicks": "43.74",
        "student_count": 350
      },
      {
        "week_number": 6,
        "final_outcome": "Fail",
        "avg_clicks": "29.64",
        "student_count": 253
      },
      {
        "week_number": 7,
        "final_outcome": "Fail",
        "avg_clicks": "33.23",
        "student_count": 215
      },
      {
        "week_number": 8,
        "final_outcome": "Fail",
        "avg_clicks": "28.09",
        "student_count": 197
      },
      {
        "week_number": 9,
        "final_outcome": "Fail",
        "avg_clicks": "48.45",
        "student_count": 216
      },
      {
        "week_number": 10,
        "final_outcome": "Fail",
        "avg_clicks": "96.89",
        "student_count": 292
      },
      {
        "week_number": 11,
        "final_outcome": "Fail",
        "avg_clicks": "17.89",
        "student_count": 141
      },
      {
        "week_number": 12,
        "final_outcome": "Fail",
        "avg_clicks": "15.2",
        "student_count": 84
      },
      {
        "week_number": 13,
        "final_outcome": "Fail",
        "avg_clicks": "21.18",
        "student_count": 131
      },
      {
        "week_number": 14,
        "final_outcome": "Fail",
        "avg_clicks": "19.28",
        "student_count": 207
      },
      {
        "week_number": 15,
        "final_outcome": "Fail",
        "avg_clicks": "29.04",
        "student_count": 206
      },
      {
        "week_number": 16,
        "final_outcome": "Fail",
        "avg_clicks": "42.5",
        "student_count": 248
      },
      {
        "week_number": 17,
        "final_outcome": "Fail",
        "avg_clicks": "30.92",
        "student_count": 185
      },
      {
        "week_number": 18,
        "final_outcome": "Fail",
        "avg_clicks": "34.29",
        "student_count": 161
      },
      {
        "week_number": 19,
        "final_outcome": "Fail",
        "avg_clicks": "31.57",
        "student_count": 157
      },
      {
        "week_number": 20,
        "final_outcome": "Fail",
        "avg_clicks": "55.36",
        "student_count": 169
      },
      {
        "week_number": 21,
        "final_outcome": "Fail",
        "avg_clicks": "123.24",
        "student_count": 233
      },
      {
        "week_number": 22,
        "final_outcome": "Fail",
        "avg_clicks": "33.99",
        "student_count": 181
      },
      {
        "week_number": 23,
        "final_outcome": "Fail",
        "avg_clicks": "42.89",
        "student_count": 196
      },
      {
        "week_number": 24,
        "final_outcome": "Fail",
        "avg_clicks": "26.42",
        "student_count": 159
      },
      {
        "week_number": 25,
        "final_outcome": "Fail",
        "avg_clicks": "23.74",
        "student_count": 130
      },
      {
        "week_number": 26,
        "final_outcome": "Fail",
        "avg_clicks": "25.93",
        "student_count": 114
      },
      {
        "week_number": 27,
        "final_outcome": "Fail",
        "avg_clicks": "27.41",
        "student_count": 104
      },
      {
        "week_number": 28,
        "final_outcome": "Fail",
        "avg_clicks": "25.06",
        "student_count": 110
      },
      {
        "week_number": 29,
        "final_outcome": "Fail",
        "avg_clicks": "29.76",
        "student_count": 140
      },
      {
        "week_number": 30,
        "final_outcome": "Fail",
        "avg_clicks": "49.22",
        "student_count": 169
      },
      {
        "week_number": 31,
        "final_outcome": "Fail",
        "avg_clicks": "123.24",
        "student_count": 169
      },
      {
        "week_number": 32,
        "final_outcome": "Fail",
        "avg_clicks": "20.74",
        "student_count": 114
      },
      {
        "week_number": 33,
        "final_outcome": "Fail",
        "avg_clicks": "24.1",
        "student_count": 89
      },
      {
        "week_number": 34,
        "final_outcome": "Fail",
        "avg_clicks": "46.08",
        "student_count": 96
      },
      {
        "week_number": 35,
        "final_outcome": "Fail",
        "avg_clicks": "61.47",
        "student_count": 154
      },
      {
        "week_number": 36,
        "final_outcome": "Fail",
        "avg_clicks": "11.93",
        "student_count": 59
      },
      {
        "week_number": 37,
        "final_outcome": "Fail",
        "avg_clicks": "5.56",
        "student_count": 54
      },
      {
        "week_number": 38,
        "final_outcome": "Fail",
        "avg_clicks": "9.24",
        "student_count": 51
      },
      {
        "week_number": 39,
        "final_outcome": "Fail",
        "avg_clicks": "5.21",
        "student_count": 34
      },
      {
        "week_number": -2,
        "final_outcome": "Pass",
        "avg_clicks": "32.05",
        "student_count": 413
      },
      {
        "week_number": -1,
        "final_outcome": "Pass",
        "avg_clicks": "32.84",
        "student_count": 446
      },
      {
        "week_number": 0,
        "final_outcome": "Pass",
        "avg_clicks": "37.5",
        "student_count": 512
      },
      {
        "week_number": 1,
        "final_outcome": "Pass",
        "avg_clicks": "85.19",
        "student_count": 607
      },
      {
        "week_number": 2,
        "final_outcome": "Pass",
        "avg_clicks": "96.91",
        "student_count": 615
      },
      {
        "week_number": 3,
        "final_outcome": "Pass",
        "avg_clicks": "122.59",
        "student_count": 681
      },
      {
        "week_number": 4,
        "final_outcome": "Pass",
        "avg_clicks": "59.03",
        "student_count": 616
      },
      {
        "week_number": 5,
        "final_outcome": "Pass",
        "avg_clicks": "58.93",
        "student_count": 672
      },
      {
        "week_number": 6,
        "final_outcome": "Pass",
        "avg_clicks": "44.7",
        "student_count": 582
      },
      {
        "week_number": 7,
        "final_outcome": "Pass",
        "avg_clicks": "48.96",
        "student_count": 556
      },
      {
        "week_number": 8,
        "final_outcome": "Pass",
        "avg_clicks": "50.9",
        "student_count": 539
      },
      {
        "week_number": 9,
        "final_outcome": "Pass",
        "avg_clicks": "61.35",
        "student_count": 592
      },
      {
        "week_number": 10,
        "final_outcome": "Pass",
        "avg_clicks": "107.33",
        "student_count": 679
      },
      {
        "week_number": 11,
        "final_outcome": "Pass",
        "avg_clicks": "27.85",
        "student_count": 433
      },
      {
        "week_number": 12,
        "final_outcome": "Pass",
        "avg_clicks": "24.53",
        "student_count": 285
      },
      {
        "week_number": 13,
        "final_outcome": "Pass",
        "avg_clicks": "28.93",
        "student_count": 384
      },
      {
        "week_number": 14,
        "final_outcome": "Pass",
        "avg_clicks": "35.32",
        "student_count": 547
      },
      {
        "week_number": 15,
        "final_outcome": "Pass",
        "avg_clicks": "43.56",
        "student_count": 577
      },
      {
        "week_number": 16,
        "final_outcome": "Pass",
        "avg_clicks": "59.72",
        "student_count": 658
      },
      {
        "week_number": 17,
        "final_outcome": "Pass",
        "avg_clicks": "48.89",
        "student_count": 550
      },
      {
        "week_number": 18,
        "final_outcome": "Pass",
        "avg_clicks": "45.63",
        "student_count": 527
      },
      {
        "week_number": 19,
        "final_outcome": "Pass",
        "avg_clicks": "47.98",
        "student_count": 520
      },
      {
        "week_number": 20,
        "final_outcome": "Pass",
        "avg_clicks": "67.31",
        "student_count": 572
      },
      {
        "week_number": 21,
        "final_outcome": "Pass",
        "avg_clicks": "127.97",
        "student_count": 676
      },
      {
        "week_number": 22,
        "final_outcome": "Pass",
        "avg_clicks": "38.66",
        "student_count": 603
      },
      {
        "week_number": 23,
        "final_outcome": "Pass",
        "avg_clicks": "48.41",
        "student_count": 645
      },
      {
        "week_number": 24,
        "final_outcome": "Pass",
        "avg_clicks": "33.22",
        "student_count": 561
      },
      {
        "week_number": 25,
        "final_outcome": "Pass",
        "avg_clicks": "30.42",
        "student_count": 516
      },
      {
        "week_number": 26,
        "final_outcome": "Pass",
        "avg_clicks": "30.82",
        "student_count": 479
      },
      {
        "week_number": 27,
        "final_outcome": "Pass",
        "avg_clicks": "42.66",
        "student_count": 437
      },
      {
        "week_number": 28,
        "final_outcome": "Pass",
        "avg_clicks": "46.78",
        "student_count": 469
      },
      {
        "week_number": 29,
        "final_outcome": "Pass",
        "avg_clicks": "44.88",
        "student_count": 566
      },
      {
        "week_number": 30,
        "final_outcome": "Pass",
        "avg_clicks": "69.17",
        "student_count": 643
      },
      {
        "week_number": 31,
        "final_outcome": "Pass",
        "avg_clicks": "127.69",
        "student_count": 645
      },
      {
        "week_number": 32,
        "final_outcome": "Pass",
        "avg_clicks": "61.25",
        "student_count": 528
      },
      {
        "week_number": 33,
        "final_outcome": "Pass",
        "avg_clicks": "91.51",
        "student_count": 474
      },
      {
        "week_number": 34,
        "final_outcome": "Pass",
        "avg_clicks": "117.82",
        "student_count": 497
      },
      {
        "week_number": 35,
        "final_outcome": "Pass",
        "avg_clicks": "114.58",
        "student_count": 647
      },
      {
        "week_number": 36,
        "final_outcome": "Pass",
        "avg_clicks": "19.87",
        "student_count": 327
      },
      {
        "week_number": 37,
        "final_outcome": "Pass",
        "avg_clicks": "8.67",
        "student_count": 300
      },
      {
        "week_number": 38,
        "final_outcome": "Pass",
        "avg_clicks": "9.94",
        "student_count": 254
      },
      {
        "week_number": 39,
        "final_outcome": "Pass",
        "avg_clicks": "6.9",
        "student_count": 174
      },
      {
        "week_number": -2,
        "final_outcome": "Withdrawn",
        "avg_clicks": "22.63",
        "student_count": 441
      },
      {
        "week_number": -1,
        "final_outcome": "Withdrawn",
        "avg_clicks": "24.84",
        "student_count": 467
      },
      {
        "week_number": 0,
        "final_outcome": "Withdrawn",
        "avg_clicks": "26.92",
        "student_count": 519
      },
      {
        "week_number": 1,
        "final_outcome": "Withdrawn",
        "avg_clicks": "53.08",
        "student_count": 614
      },
      {
        "week_number": 2,
        "final_outcome": "Withdrawn",
        "avg_clicks": "66.13",
        "student_count": 603
      },
      {
        "week_number": 3,
        "final_outcome": "Withdrawn",
        "avg_clicks": "106.91",
        "student_count": 656
      },
      {
        "week_number": 4,
        "final_outcome": "Withdrawn",
        "avg_clicks": "35.7",
        "student_count": 491
      },
      {
        "week_number": 5,
        "final_outcome": "Withdrawn",
        "avg_clicks": "41.37",
        "student_count": 509
      },
      {
        "week_number": 6,
        "final_outcome": "Withdrawn",
        "avg_clicks": "24.41",
        "student_count": 377
      },
      {
        "week_number": 7,
        "final_outcome": "Withdrawn",
        "avg_clicks": "22.29",
        "student_count": 261
      },
      {
        "week_number": 8,
        "final_outcome": "Withdrawn",
        "avg_clicks": "30.15",
        "student_count": 265
      },
      {
        "week_number": 9,
        "final_outcome": "Withdrawn",
        "avg_clicks": "35.42",
        "student_count": 250
      },
      {
        "week_number": 10,
        "final_outcome": "Withdrawn",
        "avg_clicks": "83.72",
        "student_count": 312
      },
      {
        "week_number": 11,
        "final_outcome": "Withdrawn",
        "avg_clicks": "15.38",
        "student_count": 152
      },
      {
        "week_number": 12,
        "final_outcome": "Withdrawn",
        "avg_clicks": "11.58",
        "student_count": 90
      },
      {
        "week_number": 13,
        "final_outcome": "Withdrawn",
        "avg_clicks": "14.52",
        "student_count": 114
      },
      {
        "week_number": 14,
        "final_outcome": "Withdrawn",
        "avg_clicks": "15.64",
        "student_count": 171
      },
      {
        "week_number": 15,
        "final_outcome": "Withdrawn",
        "avg_clicks": "21.14",
        "student_count": 177
      },
      {
        "week_number": 16,
        "final_outcome": "Withdrawn",
        "avg_clicks": "30.92",
        "student_count": 181
      },
      {
        "week_number": 17,
        "final_outcome": "Withdrawn",
        "avg_clicks": "27.64",
        "student_count": 117
      },
      {
        "week_number": 18,
        "final_outcome": "Withdrawn",
        "avg_clicks": "22.41",
        "student_count": 106
      },
      {
        "week_number": 19,
        "final_outcome": "Withdrawn",
        "avg_clicks": "34.12",
        "student_count": 84
      },
      {
        "week_number": 20,
        "final_outcome": "Withdrawn",
        "avg_clicks": "28.59",
        "student_count": 103
      },
      {
        "week_number": 21,
        "final_outcome": "Withdrawn",
        "avg_clicks": "100.69",
        "student_count": 130
      },
      {
        "week_number": 22,
        "final_outcome": "Withdrawn",
        "avg_clicks": "26.55",
        "student_count": 77
      },
      {
        "week_number": 23,
        "final_outcome": "Withdrawn",
        "avg_clicks": "33.71",
        "student_count": 83
      },
      {
        "week_number": 24,
        "final_outcome": "Withdrawn",
        "avg_clicks": "16.72",
        "student_count": 53
      },
      {
        "week_number": 25,
        "final_outcome": "Withdrawn",
        "avg_clicks": "10.92",
        "student_count": 38
      },
      {
        "week_number": 26,
        "final_outcome": "Withdrawn",
        "avg_clicks": "19.27",
        "student_count": 26
      },
      {
        "week_number": 27,
        "final_outcome": "Withdrawn",
        "avg_clicks": "33.38",
        "student_count": 16
      },
      {
        "week_number": 28,
        "final_outcome": "Withdrawn",
        "avg_clicks": "26.68",
        "student_count": 19
      },
      {
        "week_number": 29,
        "final_outcome": "Withdrawn",
        "avg_clicks": "24.17",
        "student_count": 18
      },
      {
        "week_number": 30,
        "final_outcome": "Withdrawn",
        "avg_clicks": "67.76",
        "student_count": 17
      },
      {
        "week_number": 31,
        "final_outcome": "Withdrawn",
        "avg_clicks": "116.63",
        "student_count": 16
      },
      {
        "week_number": 32,
        "final_outcome": "Withdrawn",
        "avg_clicks": "4.57",
        "student_count": 7
      },
      {
        "week_number": 33,
        "final_outcome": "Withdrawn",
        "avg_clicks": "17.2",
        "student_count": 5
      },
      {
        "week_number": 34,
        "final_outcome": "Withdrawn",
        "avg_clicks": "9.43",
        "student_count": 14
      },
      {
        "week_number": 35,
        "final_outcome": "Withdrawn",
        "avg_clicks": "323.75",
        "student_count": 4
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G14__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "6b47688be6593fb6c838f3fe48e0c0f7380cbd7cd95fb203d462b8ae7ac5e1fb",
  "generator_input_sha256": "1d73dc5f52d3d2e7ce9e220deefa693c03cec7ba7cb6bd36f9a782d063b475bc",
  "generator_input_compact": {
    "task_id": "A-G14",
    "execution_id": "exec_1781847775085_95441256",
    "task_name": "Early withdrawal signal analysis",
    "analysis_type": "trend",
    "explanation_strategy": "trend",
    "actionable_question": "How early can admin detect a student about to drop out?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "withdrawal_signal_trend"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "withdrawal_signal_trend"
    ],
    "dataset_row_counts": {
      "withdrawal_signal_trend": 164
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_comparison",
      "metric_column": "avg_clicks",
      "entity_column": null,
      "group_column": "final_outcome",
      "time_column": "week_number",
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
  "raw_text": "Summary: The analysis of the withdrawal signal trend indicates a declining engagement metric over time, particularly notable in the later weeks. A sharp drop in average clicks suggests a potential early warning for students at risk of withdrawal.\n\nInsights: Sharp Decline in Engagement: There is a significant drop in avg_clicks from week 10 to week 11, where avg_clicks fell from 112.63 to 41.17, indicating a potential early warning signal for student withdrawal. | Lowest Engagement Values: The lowest average clicks recorded was 38.45 in week 12, which may signify a critical point for students at risk of dropping out. | Overall Declining Trend: The overall trend shows a decline in engagement from a peak of 138.61 in week 1 to 75.69 in week 8, followed by a further drop to 41.17 in week 11, indicating a concerning pattern of disengagement.\n\nEducational implications: The significant drop in engagement metrics suggests that timely interventions are necessary to support students showing signs of disengagement.\n\nRecommendations: high - Implement early intervention strategies for students showing declining engagement, particularly after week 10. - This could help identify at-risk students and provide necessary support to prevent withdrawal.",
  "structured_payload": {
    "task_id": "A-G14",
    "execution_id": "exec_1781847775085_95441256",
    "explanation": {
      "summary": "The analysis of the withdrawal signal trend indicates a declining engagement metric over time, particularly notable in the later weeks. A sharp drop in average clicks suggests a potential early warning for students at risk of withdrawal.",
      "insights": [
        {
          "title": "Sharp Decline in Engagement",
          "description": "There is a significant drop in avg_clicks from week 10 to week 11, where avg_clicks fell from 112.63 to 41.17, indicating a potential early warning signal for student withdrawal.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_clicks",
              "value": 41.17,
              "comparison": "down_from_previous",
              "delta": -71.46,
              "context": "Drop from week 10 to week 11"
            }
          ]
        },
        {
          "title": "Lowest Engagement Values",
          "description": "The lowest average clicks recorded was 38.45 in week 12, which may signify a critical point for students at risk of dropping out.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_clicks",
              "value": 38.45,
              "comparison": "trough",
              "delta": null,
              "context": "Lowest value in the dataset"
            }
          ]
        },
        {
          "title": "Overall Declining Trend",
          "description": "The overall trend shows a decline in engagement from a peak of 138.61 in week 1 to 75.69 in week 8, followed by a further drop to 41.17 in week 11, indicating a concerning pattern of disengagement.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_clicks",
              "value": 75.69,
              "comparison": "down_from_previous",
              "delta": -3.83,
              "context": "Drop from week 8 to week 11"
            }
          ]
        }
      ],
      "educational_implications": [
        "The significant drop in engagement metrics suggests that timely interventions are necessary to support students showing signs of disengagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement early intervention strategies for students showing declining engagement, particularly after week 10.",
          "rationale": "This could help identify at-risk students and provide necessary support to prevent withdrawal."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is high with a strong statistical basis from 1998 students across multiple assessments.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
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
      "latency_ms": 7552,
      "token_usage": {
        "prompt_tokens": 1670,
        "completion_tokens": 585,
        "total_tokens": 2255
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000601
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G14__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "6b47688be6593fb6c838f3fe48e0c0f7380cbd7cd95fb203d462b8ae7ac5e1fb",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1670,
      "completion_tokens": 585,
      "total_tokens": 2255
    },
    "latency_ms": 7564,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G14",
    "execution_id": "exec_1781847775085_95441256",
    "explanation": {
      "summary": "The analysis of the withdrawal signal trend indicates a declining engagement metric over time, particularly notable in the later weeks. A sharp drop in average clicks suggests a potential early warning for students at risk of withdrawal.",
      "insights": [
        {
          "title": "Sharp Decline in Engagement",
          "description": "There is a significant drop in avg_clicks from week 10 to week 11, where avg_clicks fell from 112.63 to 41.17, indicating a potential early warning signal for student withdrawal.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_clicks",
              "value": 41.17,
              "comparison": "down_from_previous",
              "delta": -71.46,
              "context": "Drop from week 10 to week 11"
            }
          ]
        },
        {
          "title": "Lowest Engagement Values",
          "description": "The lowest average clicks recorded was 38.45 in week 12, which may signify a critical point for students at risk of dropping out.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_clicks",
              "value": 38.45,
              "comparison": "trough",
              "delta": null,
              "context": "Lowest value in the dataset"
            }
          ]
        },
        {
          "title": "Overall Declining Trend",
          "description": "The overall trend shows a decline in engagement from a peak of 138.61 in week 1 to 75.69 in week 8, followed by a further drop to 41.17 in week 11, indicating a concerning pattern of disengagement.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_clicks",
              "value": 75.69,
              "comparison": "down_from_previous",
              "delta": -3.83,
              "context": "Drop from week 8 to week 11"
            }
          ]
        }
      ],
      "educational_implications": [
        "The significant drop in engagement metrics suggests that timely interventions are necessary to support students showing signs of disengagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement early intervention strategies for students showing declining engagement, particularly after week 10.",
          "rationale": "This could help identify at-risk students and provide necessary support to prevent withdrawal."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is high with a strong statistical basis from 1998 students across multiple assessments.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
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
      "latency_ms": 7552,
      "token_usage": {
        "prompt_tokens": 1670,
        "completion_tokens": 585,
        "total_tokens": 2255
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000601
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
    "expected": 164,
    "observed": 164
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "64c67afde434dcdc16e3b44225b1be83ff387bfc4ca03234bd334a5e7b8e5e9a",
    "expected_values": [
      "64c67afde434dcdc16e3b44225b1be83ff387bfc4ca03234bd334a5e7b8e5e9a"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "4364e835b8582e11d11d490373138a0b17d222dfbca1533b41a9bf39123cfd2c",
    "expected": "4364e835b8582e11d11d490373138a0b17d222dfbca1533b41a9bf39123cfd2c"
  },
  {
    "check_id": "numeric_fields_withdrawal_signal_trend",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "withdrawal_signal_trend",
    "numeric_columns": [
      "student_count",
      "week_number"
    ],
    "numeric_summaries": {
      "student_count": {
        "count": 164,
        "min": 4,
        "max": 681
      },
      "week_number": {
        "count": 164,
        "min": -2,
        "max": 39
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_withdrawal_signal_trend",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "withdrawal_signal_trend",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```

