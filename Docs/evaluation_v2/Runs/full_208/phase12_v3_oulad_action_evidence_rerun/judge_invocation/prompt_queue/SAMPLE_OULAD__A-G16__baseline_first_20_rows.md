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

# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G16__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G16__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G16",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Admin action recommendation",
  "scope": "Many students",
  "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
  "target_audience": "admin",
  "ai_summary_type": "action_synthesis",
  "ai_prompt_hint": "Synthesise all cohort [FE] signals into 3–5 admin actions. This is the most critical AI synthesis task for admin role.",
  "query_labels": [
    "synthesis_data"
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
    "[AI_SYNTHESIS] low_engagement_count",
    "high_risk_count",
    "hardest_assessment",
    "best_resource_type",
    "total_students"
  ],
  "output_schema": {},
  "query_labels": [
    "synthesis_data"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G16-CORE-01",
      "description": "Synthesise cohort feature-engineered signals into 3–5 admin actions."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G16-CONSTRAINT-01",
      "description": "Every recommended action must be grounded in returned cohort feature-engineered signals."
    },
    {
      "constraint_id": "A-G16-CONSTRAINT-02",
      "description": "Do not invent urgency or priority without supporting returned data."
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
  "applicable": true,
  "source_type": "deterministic_registry_rule_evaluation",
  "rule_set_id": "A-G16.action_synthesis",
  "rule_version": "1.0.0",
  "evaluation_status": "complete",
  "supported_action_count": 4,
  "supported_actions": [
    {
      "action_id": "admin_review_high_risk_caseload",
      "action_text": "Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support.",
      "priority": "high",
      "owner": "academic_admin",
      "time_horizon_days": 7,
      "support_category": "risk_coordination",
      "claim_limits": [
        "Do not infer causes from the aggregate count.",
        "Do not identify individual students unless a separate student-level evidence source is available."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "A-G16-R01",
      "trigger_evidence": {
        "all": [
          {
            "evidence_id": "high_risk_rate",
            "operator": "gte",
            "observed_value": 0.45345345345345345,
            "expected_value": 0.2,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      }
    },
    {
      "action_id": "admin_launch_engagement_outreach",
      "action_text": "Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up.",
      "priority": "high",
      "owner": "student_support_team",
      "time_horizon_days": 7,
      "support_category": "engagement_support",
      "claim_limits": [
        "Do not claim low engagement caused low performance.",
        "Do not infer a specific barrier from the aggregate signal."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "A-G16-R02",
      "trigger_evidence": {
        "all": [
          {
            "evidence_id": "low_engagement_rate",
            "operator": "gte",
            "observed_value": 0.6206206206206206,
            "expected_value": 0.25,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      }
    },
    {
      "action_id": "admin_review_assessment_support",
      "action_text": "Ask the module team to review learner support and preparation materials for the identified assessment.",
      "priority": "medium",
      "owner": "module_lead",
      "time_horizon_days": 14,
      "support_category": "assessment_support",
      "claim_limits": [
        "Do not state a fail-rate value because the runtime row does not expose it.",
        "Do not claim the assessment itself caused failure."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "A-G16-R03",
      "trigger_evidence": {
        "all": [
          {
            "evidence_id": "hardest_assessment",
            "operator": "is_present",
            "observed_value": "24299",
            "expected_value": null,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      }
    },
    {
      "action_id": "admin_review_most_used_resource_format",
      "action_text": "Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability.",
      "priority": "low",
      "owner": "learning_design_team",
      "time_horizon_days": 14,
      "support_category": "resource_planning",
      "claim_limits": [
        "Refer to this field as most-used, not best-performing.",
        "Do not claim engagement clicks demonstrate learning effectiveness."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "A-G16-R04",
      "trigger_evidence": {
        "all": [
          {
            "evidence_id": "best_resource_type",
            "operator": "is_present",
            "observed_value": "quiz",
            "expected_value": null,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      }
    }
  ],
  "rule_evaluations": [
    {
      "rule_id": "A-G16-R01",
      "description": "Escalate cohort risk review when at least 20 percent of students meet the backend high-risk definition.",
      "status": "triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "high_risk_rate",
            "operator": "gte",
            "observed_value": 0.45345345345345345,
            "expected_value": 0.2,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "admin_review_high_risk_caseload",
        "action_text": "Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support.",
        "priority": "high",
        "owner": "academic_admin",
        "time_horizon_days": 7,
        "support_category": "risk_coordination",
        "claim_limits": [
          "Do not infer causes from the aggregate count.",
          "Do not identify individual students unless a separate student-level evidence source is available."
        ]
      }
    },
    {
      "rule_id": "A-G16-R02",
      "description": "Plan cohort engagement outreach when at least 25 percent of students meet the backend low-engagement definition.",
      "status": "triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "low_engagement_rate",
            "operator": "gte",
            "observed_value": 0.6206206206206206,
            "expected_value": 0.25,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "admin_launch_engagement_outreach",
        "action_text": "Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up.",
        "priority": "high",
        "owner": "student_support_team",
        "time_horizon_days": 7,
        "support_category": "engagement_support",
        "claim_limits": [
          "Do not claim low engagement caused low performance.",
          "Do not infer a specific barrier from the aggregate signal."
        ]
      }
    },
    {
      "rule_id": "A-G16-R03",
      "description": "Request assessment support review when the highest-fail-rate assessment identifier is present.",
      "status": "triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "hardest_assessment",
            "operator": "is_present",
            "observed_value": "24299",
            "expected_value": null,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "admin_review_assessment_support",
        "action_text": "Ask the module team to review learner support and preparation materials for the identified assessment.",
        "priority": "medium",
        "owner": "module_lead",
        "time_horizon_days": 14,
        "support_category": "assessment_support",
        "claim_limits": [
          "Do not state a fail-rate value because the runtime row does not expose it.",
          "Do not claim the assessment itself caused failure."
        ]
      }
    },
    {
      "rule_id": "A-G16-R04",
      "description": "Review the most-used resource format as a delivery option without treating usage as effectiveness.",
      "status": "triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "best_resource_type",
            "operator": "is_present",
            "observed_value": "quiz",
            "expected_value": null,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "admin_review_most_used_resource_format",
        "action_text": "Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability.",
        "priority": "low",
        "owner": "learning_design_team",
        "time_horizon_days": 14,
        "support_category": "resource_planning",
        "claim_limits": [
          "Refer to this field as most-used, not best-performing.",
          "Do not claim engagement clicks demonstrate learning effectiveness."
        ]
      }
    }
  ],
  "conflict_evaluations": []
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "synthesis_data",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G16.json",
      "artifact_sha256": "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224",
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
  "evidence_artifact_file_sha256": "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224",
  "evidence_rows_sha256": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
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
  "embedded_datasets_sha256": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
  "datasets": {
    "synthesis_data": [
      {
        "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
        "low_engagement_count": 1240,
        "high_risk_count": 906,
        "hardest_assessment": "24299",
        "best_resource_type": "quiz",
        "total_students": 1998
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G16__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "634920834c903ee18d71c19544477ce0dea61436eb893ff5dcb6f4e5adc91f7e",
  "generator_input_sha256": "3ebc1dd17a178f829f5bf5e74250a920ee55d97b5cbcf78343227aa12be4154f",
  "generator_input_compact": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847803029_391203b0",
    "task_name": "Admin action recommendation",
    "analysis_type": "synthesis",
    "explanation_strategy": "risk",
    "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
    "target_audience": [
      "admin"
    ],
    "query_labels": [
      "synthesis_data"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "synthesis_data"
    ],
    "dataset_row_counts": {
      "synthesis_data": 1
    },
    "ai_summary_config_summary": {
      "summary_type": "action_synthesis",
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
  "raw_text": "Summary: The action plan is informed by a total of 1,998 students, with 1,240 identified as having low engagement and 906 categorized as high risk. The hardest assessment is noted as '24299', indicating a specific challenge for students, while quizzes are highlighted as the best resource type, suggesting a focus for engagement efforts.\n\nInsights: Why priority outreach is Step 1: With 906 students classified as high risk, prioritizing outreach is essential to address their needs and encourage retention. | Why engagement is Step 2: The presence of 1,240 students with low engagement underscores the necessity for targeted engagement efforts to enhance participation and performance. | Why assessment support is Step 3: The identification of '24299' as the hardest assessment highlights the need for additional support to help students navigate this challenge effectively. | Why resource nudges are Step 4: Quizzes being the best resource type suggests that nudging students towards these resources could enhance their learning experience and engagement.",
  "structured_payload": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847803029_391203b0",
    "explanation": {
      "summary": "The action plan is informed by a total of 1,998 students, with 1,240 identified as having low engagement and 906 categorized as high risk. The hardest assessment is noted as '24299', indicating a specific challenge for students, while quizzes are highlighted as the best resource type, suggesting a focus for engagement efforts.",
      "insights": [
        {
          "title": "Why priority outreach is Step 1",
          "description": "With 906 students classified as high risk, prioritizing outreach is essential to address their needs and encourage retention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "high_risk_count",
              "value": 906,
              "comparison": "baseline",
              "delta": null,
              "context": "High risk students represent a significant portion of the cohort."
            }
          ]
        },
        {
          "title": "Why engagement is Step 2",
          "description": "The presence of 1,240 students with low engagement underscores the necessity for targeted engagement efforts to enhance participation and performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "low_engagement_count",
              "value": 1240,
              "comparison": "baseline",
              "delta": null,
              "context": "Low engagement levels indicate a critical area for intervention."
            }
          ]
        },
        {
          "title": "Why assessment support is Step 3",
          "description": "The identification of '24299' as the hardest assessment highlights the need for additional support to help students navigate this challenge effectively.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "hardest_assessment",
              "value": "24299",
              "comparison": "baseline",
              "delta": null,
              "context": "Difficult assessments can hinder overall student success."
            }
          ]
        },
        {
          "title": "Why resource nudges are Step 4",
          "description": "Quizzes being the best resource type suggests that nudging students towards these resources could enhance their learning experience and engagement.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "best_resource_type",
              "value": "quiz",
              "comparison": "baseline",
              "delta": null,
              "context": "Effective resources can significantly impact student performance."
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and accurately reflects the current cohort metrics.",
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
      "latency_ms": 8664,
      "token_usage": {
        "prompt_tokens": 880,
        "completion_tokens": 576,
        "total_tokens": 1456
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000478
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G16__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "634920834c903ee18d71c19544477ce0dea61436eb893ff5dcb6f4e5adc91f7e",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 880,
      "completion_tokens": 576,
      "total_tokens": 1456
    },
    "latency_ms": 8673,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847803029_391203b0",
    "explanation": {
      "summary": "The action plan is informed by a total of 1,998 students, with 1,240 identified as having low engagement and 906 categorized as high risk. The hardest assessment is noted as '24299', indicating a specific challenge for students, while quizzes are highlighted as the best resource type, suggesting a focus for engagement efforts.",
      "insights": [
        {
          "title": "Why priority outreach is Step 1",
          "description": "With 906 students classified as high risk, prioritizing outreach is essential to address their needs and encourage retention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "high_risk_count",
              "value": 906,
              "comparison": "baseline",
              "delta": null,
              "context": "High risk students represent a significant portion of the cohort."
            }
          ]
        },
        {
          "title": "Why engagement is Step 2",
          "description": "The presence of 1,240 students with low engagement underscores the necessity for targeted engagement efforts to enhance participation and performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "low_engagement_count",
              "value": 1240,
              "comparison": "baseline",
              "delta": null,
              "context": "Low engagement levels indicate a critical area for intervention."
            }
          ]
        },
        {
          "title": "Why assessment support is Step 3",
          "description": "The identification of '24299' as the hardest assessment highlights the need for additional support to help students navigate this challenge effectively.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "hardest_assessment",
              "value": "24299",
              "comparison": "baseline",
              "delta": null,
              "context": "Difficult assessments can hinder overall student success."
            }
          ]
        },
        {
          "title": "Why resource nudges are Step 4",
          "description": "Quizzes being the best resource type suggests that nudging students towards these resources could enhance their learning experience and engagement.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "best_resource_type",
              "value": "quiz",
              "comparison": "baseline",
              "delta": null,
              "context": "Effective resources can significantly impact student performance."
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and accurately reflects the current cohort metrics.",
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
      "latency_ms": 8664,
      "token_usage": {
        "prompt_tokens": 880,
        "completion_tokens": 576,
        "total_tokens": 1456
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000478
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
    "observed": "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224",
    "expected_values": [
      "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
    "expected": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013"
  },
  {
    "check_id": "numeric_fields_synthesis_data",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "numeric_columns": [
      "high_risk_count",
      "low_engagement_count",
      "total_students"
    ],
    "numeric_summaries": {
      "high_risk_count": {
        "count": 1,
        "min": 906,
        "max": 906
      },
      "low_engagement_count": {
        "count": 1,
        "min": 1240,
        "max": 1240
      },
      "total_students": {
        "count": 1,
        "min": 1998,
        "max": 1998
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_synthesis_data",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "flag_columns": [
      "high_risk_count"
    ],
    "triggered_like_counts": {
      "high_risk_count": 0
    }
  }
]
```

