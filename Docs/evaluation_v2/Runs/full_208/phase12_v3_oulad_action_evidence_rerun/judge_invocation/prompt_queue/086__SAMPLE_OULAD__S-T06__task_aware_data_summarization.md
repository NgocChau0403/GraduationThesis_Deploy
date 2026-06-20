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

# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T06__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T06__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T06",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Study consistency check",
  "scope": "1 student",
  "actionable_question": "Am I studying steadily or only before exams?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Distinguish 'steady learner' from 'pre-exam crammer'. Recommend a consistent weekly routine.",
  "query_labels": [
    "consistency_data"
  ],
  "explanation_strategy": "behavioral"
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
    "engagement_count; consistency_level [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "consistency_data"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T06-CORE-01",
      "description": "Characterise the observed study pattern as steady or concentrated before assessments when evidence supports that distinction."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "S-T06-SUPPORT-01",
      "description": "Recommend a consistent weekly routine grounded in the observed study pattern."
    }
  ],
  "evaluation_constraints": [],
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
      "dataset_label": "consistency_data",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T06.json",
      "artifact_sha256": "b7605ac6cc3732b619dffd19c42f2959bcf09b48013b6b57815400566c9e9914",
      "row_count": 32,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 32,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 32,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_OULAD__S-T06__task_aware_data_summarization.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "b7605ac6cc3732b619dffd19c42f2959bcf09b48013b6b57815400566c9e9914",
  "evidence_rows_sha256": "033b7c6de141348ba7b717bbaf3eba6ede32c2705ad028cbcf2ee98108d4633a",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 32,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__S-T06__task_aware_data_summarization__consistency_data__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "consistency_data",
        "row_start_inclusive": 0,
        "row_end_inclusive": 31,
        "row_count": 32
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
    "generated_at": "2026-06-19T07:41:45.678Z",
    "record_id": "SAMPLE_OULAD__S-T06__task_aware_data_summarization",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__S-T06__task_aware_data_summarization__consistency_data__chunk_1",
        "dataset_label": "consistency_data",
        "row_start_inclusive": 0,
        "row_end_inclusive": 31,
        "row_count": 32,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T06.json",
        "source_artifact_sha256": "b7605ac6cc3732b619dffd19c42f2959bcf09b48013b6b57815400566c9e9914"
      }
    ]
  },
  "retrieved_datasets_sha256": "033b7c6de141348ba7b717bbaf3eba6ede32c2705ad028cbcf2ee98108d4633a",
  "retrieved_datasets": {
    "consistency_data": [
      {
        "week_number": -2,
        "weekly_clicks": 86,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": -1,
        "weekly_clicks": 94,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 0,
        "weekly_clicks": 27,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 1,
        "weekly_clicks": 98,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 2,
        "weekly_clicks": 4,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 3,
        "weekly_clicks": 28,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 4,
        "weekly_clicks": 7,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 5,
        "weekly_clicks": 16,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 6,
        "weekly_clicks": 80,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 8,
        "weekly_clicks": 2,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 9,
        "weekly_clicks": 48,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 10,
        "weekly_clicks": 3,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 11,
        "weekly_clicks": 3,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 12,
        "weekly_clicks": 56,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 13,
        "weekly_clicks": 53,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 14,
        "weekly_clicks": 71,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 15,
        "weekly_clicks": 29,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 16,
        "weekly_clicks": 24,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 17,
        "weekly_clicks": 24,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 18,
        "weekly_clicks": 1,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 19,
        "weekly_clicks": 45,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 20,
        "weekly_clicks": 101,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 21,
        "weekly_clicks": 106,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 22,
        "weekly_clicks": 78,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 24,
        "weekly_clicks": 10,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 25,
        "weekly_clicks": 1,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 27,
        "weekly_clicks": 15,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 28,
        "weekly_clicks": 8,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 29,
        "weekly_clicks": 41,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 30,
        "weekly_clicks": 43,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 31,
        "weekly_clicks": 54,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 35,
        "weekly_clicks": 5,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T06__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "d707d4b1a22d5566ad02dca86826d0283ef8e96a904d2300872afba5c680e25b",
  "generator_input_sha256": "60220c5b0e64f0ace33ef770016c62896568591367a447f1ba7ef467b24e6e98",
  "generator_input_compact": {
    "task_id": "S-T06",
    "execution_id": "exec_1781847906109_700e93ce",
    "task_name": "Study consistency check",
    "analysis_type": "distribution",
    "explanation_strategy": "behavioral",
    "actionable_question": "Am I studying steadily or only before exams?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "consistency_data"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "consistency_data"
    ],
    "dataset_row_counts": {
      "consistency_data": 32
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "weekly_clicks",
      "entity_column": null,
      "group_column": null,
      "time_column": "week_number",
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
  "raw_text": "Summary: Your engagement has seen a significant decline over the weeks, dropping from 86 clicks to just 5. This suggests that your study habits may not be consistent, and you might be relying on last-minute efforts rather than steady learning.\n\nInsights: Dramatic Decrease in Weekly Clicks: Your weekly clicks have decreased from 86 to 5, indicating a drop in engagement and study activity. This is a concerning trend as it shows a lack of consistent study habits. | Inconsistent Study Patterns: The largest drop in activity occurred between weeks 1 and 2, where clicks fell from 98 to 4. This suggests that you may not be studying regularly throughout the term.\n\nEducational implications: Consistent study habits are crucial for long-term retention and understanding of course material.\n\nRecommendations: high - Establish a weekly study schedule - Creating a routine will help you engage with the material regularly, reducing the need for cramming before exams.",
  "structured_payload": {
    "task_id": "S-T06",
    "execution_id": "exec_1781847906109_700e93ce",
    "explanation": {
      "summary": "Your engagement has seen a significant decline over the weeks, dropping from 86 clicks to just 5. This suggests that your study habits may not be consistent, and you might be relying on last-minute efforts rather than steady learning.",
      "insights": [
        {
          "title": "Dramatic Decrease in Weekly Clicks",
          "description": "Your weekly clicks have decreased from 86 to 5, indicating a drop in engagement and study activity. This is a concerning trend as it shows a lack of consistent study habits.",
          "severity": "high",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 5,
              "comparison": "down_from_previous",
              "delta": -81,
              "context": "from 86 clicks at week -2"
            }
          ]
        },
        {
          "title": "Inconsistent Study Patterns",
          "description": "The largest drop in activity occurred between weeks 1 and 2, where clicks fell from 98 to 4. This suggests that you may not be studying regularly throughout the term.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 4,
              "comparison": "down_from_previous",
              "delta": -94,
              "context": "from 98 clicks at week 1"
            }
          ]
        }
      ],
      "educational_implications": [
        "Consistent study habits are crucial for long-term retention and understanding of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Establish a weekly study schedule",
          "rationale": "Creating a routine will help you engage with the material regularly, reducing the need for cramming before exams."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows clear trends in engagement over time.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 32,
    "included_row_count": null,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": false,
    "dataset_row_breakdown": [
      {
        "dataset_name": "consistency_data",
        "row_count": 32,
        "included_row_count": 32
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6824,
      "token_usage": {
        "prompt_tokens": 2025,
        "completion_tokens": 435,
        "total_tokens": 2460
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000565
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T06__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "d707d4b1a22d5566ad02dca86826d0283ef8e96a904d2300872afba5c680e25b",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2025,
      "completion_tokens": 435,
      "total_tokens": 2460
    },
    "latency_ms": 6828,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T06",
    "execution_id": "exec_1781847906109_700e93ce",
    "explanation": {
      "summary": "Your engagement has seen a significant decline over the weeks, dropping from 86 clicks to just 5. This suggests that your study habits may not be consistent, and you might be relying on last-minute efforts rather than steady learning.",
      "insights": [
        {
          "title": "Dramatic Decrease in Weekly Clicks",
          "description": "Your weekly clicks have decreased from 86 to 5, indicating a drop in engagement and study activity. This is a concerning trend as it shows a lack of consistent study habits.",
          "severity": "high",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 5,
              "comparison": "down_from_previous",
              "delta": -81,
              "context": "from 86 clicks at week -2"
            }
          ]
        },
        {
          "title": "Inconsistent Study Patterns",
          "description": "The largest drop in activity occurred between weeks 1 and 2, where clicks fell from 98 to 4. This suggests that you may not be studying regularly throughout the term.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 4,
              "comparison": "down_from_previous",
              "delta": -94,
              "context": "from 98 clicks at week 1"
            }
          ]
        }
      ],
      "educational_implications": [
        "Consistent study habits are crucial for long-term retention and understanding of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Establish a weekly study schedule",
          "rationale": "Creating a routine will help you engage with the material regularly, reducing the need for cramming before exams."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows clear trends in engagement over time.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 32,
    "included_row_count": null,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": false,
    "dataset_row_breakdown": [
      {
        "dataset_name": "consistency_data",
        "row_count": 32,
        "included_row_count": 32
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6824,
      "token_usage": {
        "prompt_tokens": 2025,
        "completion_tokens": 435,
        "total_tokens": 2460
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000565
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
    "expected": 32,
    "observed": 32
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "b7605ac6cc3732b619dffd19c42f2959bcf09b48013b6b57815400566c9e9914",
    "expected_values": [
      "b7605ac6cc3732b619dffd19c42f2959bcf09b48013b6b57815400566c9e9914"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "033b7c6de141348ba7b717bbaf3eba6ede32c2705ad028cbcf2ee98108d4633a",
    "expected": "033b7c6de141348ba7b717bbaf3eba6ede32c2705ad028cbcf2ee98108d4633a"
  },
  {
    "check_id": "numeric_fields_consistency_data",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "consistency_data",
    "numeric_columns": [
      "week_number",
      "weekly_clicks"
    ],
    "numeric_summaries": {
      "week_number": {
        "count": 32,
        "min": -2,
        "max": 35
      },
      "weekly_clicks": {
        "count": 32,
        "min": 1,
        "max": 106
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_consistency_data",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "consistency_data",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```

