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


## Queue Strategy

This packet uses `compact_retrieval_context`. It intentionally does not embed all full-query rows because the Phase F6 final context exceeds the configured prompt token cap.

## Compact Judge Context

```json
{
  "queue_strategy": "compact_retrieval_context",
  "strategy_reason": "Full final context exceeds the configured token cap; full rows are not embedded in this prompt packet.",
  "audit_guarantee": {
    "full_artifacts_remain_on_disk": true,
    "full_artifact_references": [
      {
        "dataset_label": "registration_data",
        "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T11.json",
        "artifact_sha256": "63b52ce70e07f0bb1e81b23286d411d5839a80889145007e9d05f643b4222053",
        "row_count": 1988,
        "readable": true
      }
    ],
    "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_contexts/final_contexts/SAMPLE_OULAD__S-T11__baseline_first_20_rows.md",
    "final_context_sha256": "33b2a7df17a3a4200e1735f5446732b54eac24d1521b9a7b5c6cc86c2529afe4",
    "judge_input_path": "Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_inputs/records/SAMPLE_OULAD__S-T11__baseline_first_20_rows.json",
    "judge_input_sha256": "94f384d339218dc6e1f4e6dcef2572a4f5386c8418bd6998b0b6ed7370c80ae7"
  },
  "record_identity": {
    "record_id": "SAMPLE_OULAD__S-T11__baseline_first_20_rows",
    "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
    "dataset_id": "SAMPLE_OULAD",
    "task_id": "S-T11",
    "explanation_mode": "baseline_first_20_rows",
    "prompt_version": "judge_prompt_v3_action_evidence_rerun",
    "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
  },
  "task_context": {
    "task_name": "Registration timing vs performance",
    "scope": "1 student",
    "actionable_question": "Did enrolling late put me at a disadvantage?",
    "target_audience": "student",
    "ai_summary_type": "correlation_evidence",
    "ai_prompt_hint": "Explain whether early enrollment correlates with better outcome. Frame as associative, not causal.",
    "query_labels": [
      "registration_data"
    ],
    "explanation_strategy": "correlation"
  },
  "schema_context": {
    "source_tables": [
      "enrollment",
      "assessment_result",
      "assessment [OULAD only]"
    ],
    "key_db_fields": [
      "enrollment_start_day",
      "registration_lead_time [FE single]",
      "final_outcome"
    ],
    "output_schema": {},
    "query_labels": [
      "registration_data"
    ]
  },
  "evaluation_requirements": {
    "required_core_outputs": [
      {
        "requirement_id": "S-T11-CORE-01",
        "description": "Explain whether early enrollment correlates with better outcome."
      }
    ],
    "required_supporting_outputs": [],
    "evaluation_constraints": [
      {
        "constraint_id": "S-T11-CONSTRAINT-01",
        "description": "Frame as associative, not causal."
      }
    ],
    "safety_fairness_applicability": "applicable",
    "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
  },
  "derived_stat_evidence": [
    {
      "stat_id": "S-T11__pearson_r__1",
      "stat_type": "pearson_r",
      "dataset_label": "registration_data",
      "x_column": "registration_lead_time",
      "y_column": "avg_score",
      "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T11.json",
      "source_artifact_sha256": "f85cb88980451faee77b21e975cc36dfad03c6344f3a839e528adcb66b1e07ce",
      "status": "pass",
      "pearson_r": 0.001730289348499322,
      "n": 1988,
      "strength_label": "negligible",
      "direction": "positive",
      "skip_reason": null
    }
  ],
  "evidence_access_summary": {
    "evidence_access_mode": "deterministic_artifact_retrieval",
    "full_result_row_count": 1988,
    "prompt_embedded_row_count": 0,
    "retrieved_row_count": 1988,
    "retrieved_row_count_by_dataset": {
      "registration_data": 1988
    },
    "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_OULAD__S-T11__baseline_first_20_rows.json",
    "retrieval_coverage_status": "full",
    "full_access_available": true,
    "deterministic_scan_scope": "full_query_artifact_all_rows",
    "deterministic_scan_row_count_by_dataset": {
      "registration_data": 1988
    },
    "full_result_sent_to_llm": false,
    "evidence_summary": {
      "row_count_phase3": 1988,
      "row_count_observed": 1988,
      "row_count_bucket_phase3": ">20",
      "row_count_bucket_observed": ">20",
      "dataset_breakdown": [
        {
          "label": "registration_data",
          "row_count": 1988,
          "sample_fields": [
            "student_id",
            "registration_lead_time",
            "avg_score",
            "student_marker",
            "cohort_avg_registration_lead_time",
            "cohort_avg_score",
            "registration_timing_percentile",
            "score_percentile",
            "is_selected_student"
          ]
        }
      ],
      "full_query_datasets_sha256": "b4bb3ebdfbccae5c4cf8ac0e7f69afc792bcb0cd92502ce4b9896afc736fb3d9"
    },
    "retrieval_log_summary": {
      "retrieval_request_complete": true,
      "retrieval_coverage_status": "full",
      "chunk_count": 1,
      "chunks": [
        {
          "chunk_id": "SAMPLE_OULAD__S-T11__baseline_first_20_rows__registration_data__chunk_1",
          "dataset_label": "registration_data",
          "row_start_inclusive": 0,
          "row_end_inclusive": 1987,
          "row_count": 1988,
          "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T11.json",
          "source_artifact_sha256": "63b52ce70e07f0bb1e81b23286d411d5839a80889145007e9d05f643b4222053"
        }
      ]
    },
    "context_manifest_validation": {
      "direct_embedding_validation": null,
      "retrieval_validation": {
        "status": "pass",
        "retrieved_row_count": 1988,
        "chunk_count": 1,
        "chunk_ids": [
          "SAMPLE_OULAD__S-T11__baseline_first_20_rows__registration_data__chunk_1"
        ],
        "row_ranges": [
          {
            "dataset_label": "registration_data",
            "row_start_inclusive": 0,
            "row_end_inclusive": 1987,
            "row_count": 1988
          }
        ],
        "issues": []
      },
      "deterministic_check_count": 5,
      "deterministic_check_failures": 0,
      "deterministic_check_types": [
        "row_count",
        "artifact_hash",
        "embedded_rows_hash",
        "numeric_field_extraction",
        "threshold_flag_detection"
      ]
    }
  },
  "explanation_to_judge": {
    "raw_text": "Summary: The analysis shows a negative correlation between Registration Lead Time and Average Score. This suggests that students who register later tend to have lower average scores, indicating that early enrollment may be beneficial for academic performance.\n\nInsights: Negative Correlation Observed: As the registration lead time increases, the average score tends to decrease. This pattern indicates that students who enroll earlier generally achieve higher scores compared to those who enroll later.\n\nEducational implications: Students may benefit from enrolling earlier to improve their academic performance.\n\nRecommendations: high - Encourage early registration for courses. - Promoting early enrollment could help students achieve better academic outcomes.",
    "structured_payload": {
      "task_id": "S-T11",
      "execution_id": "exec_1781847915272_5d31d895",
      "explanation": {
        "summary": "The analysis shows a negative correlation between Registration Lead Time and Average Score. This suggests that students who register later tend to have lower average scores, indicating that early enrollment may be beneficial for academic performance.",
        "insights": [
          {
            "title": "Negative Correlation Observed",
            "description": "As the registration lead time increases, the average score tends to decrease. This pattern indicates that students who enroll earlier generally achieve higher scores compared to those who enroll later.",
            "severity": "medium",
            "evidence": [
              {
                "metric": "registration_lead_time",
                "value": 103,
                "comparison": "baseline",
                "delta": null,
                "context": "Student with the highest registration lead time has an average score of 91.2."
              },
              {
                "metric": "registration_lead_time",
                "value": 1,
                "comparison": "baseline",
                "delta": null,
                "context": "Student with the lowest registration lead time has an average score of 56.11."
              }
            ]
          }
        ],
        "educational_implications": [
          "Students may benefit from enrolling earlier to improve their academic performance."
        ],
        "recommendations": [
          {
            "priority": "high",
            "action": "Encourage early registration for courses.",
            "rationale": "Promoting early enrollment could help students achieve better academic outcomes."
          }
        ],
        "warnings": []
      },
      "confidence": {
        "level": "HIGH",
        "reason": "The dataset is comprehensive with 1988 rows, providing a solid basis for correlation analysis.",
        "based_on": [
          "sufficient_data"
        ]
      },
      "explanation_strategy": "correlation",
      "explanation_type": "correlation",
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
        "latency_ms": 4565,
        "token_usage": {
          "prompt_tokens": 2698,
          "completion_tokens": 357,
          "total_tokens": 3055
        },
        "strategy": "correlation",
        "granularity": "semester",
        "cost_usd": 0.000619
      }
    },
    "generation_metadata": {
      "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T11__baseline_first_20_rows.json",
      "explanation_artifact_sha256": "91822409ebc52cf3b363c00cc8cc08449ff17057af477fbbee853aafd3cc1eed",
      "ai_service_url": "http://localhost:8000",
      "expected_ai_summary_method": "baseline_first_20_rows",
      "observed_ai_summary_method": "baseline_first_20_rows",
      "degraded": false,
      "model": "gpt-4o-mini-2024-07-18",
      "token_usage": {
        "prompt_tokens": 2698,
        "completion_tokens": 357,
        "total_tokens": 3055
      },
      "latency_ms": 4576,
      "attempts_used": 1
    }
  },
  "judge_instruction_boundary": {
    "do_not_assume_missing_rows_are_absent": true,
    "use_full_artifact_references_for_audit": true,
    "evaluate_claims_against_the_compact_evidence_and_recorded_artifact_provenance": true,
    "if_full_row_inspection_is_required_mark_the_record_for_manual_or_secondary_retrieval_review": true
  }
}
```
