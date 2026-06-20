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
        "dataset_label": "low_engagement_group",
        "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G01.json",
        "artifact_sha256": "1561e97d242b1221e6702d8486ef8b4e04e20c8666661b54a458f5e5076509fb",
        "row_count": 1544,
        "readable": true
      }
    ],
    "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_contexts/final_contexts/SAMPLE_OULAD__A-G01__task_aware_data_summarization.md",
    "final_context_sha256": "5c16ea468c43ef3d77f9280196d2803246e129bb739ac6bf6cdf99278a086f2c",
    "judge_input_path": "Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_inputs/records/SAMPLE_OULAD__A-G01__task_aware_data_summarization.json",
    "judge_input_sha256": "512ff2d73482911c19dc5b82178a9ab4307f429a2e6b5a581f35545d985b78d6"
  },
  "record_identity": {
    "record_id": "SAMPLE_OULAD__A-G01__task_aware_data_summarization",
    "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
    "dataset_id": "SAMPLE_OULAD",
    "task_id": "A-G01",
    "explanation_mode": "task_aware_data_summarization",
    "prompt_version": "judge_prompt_v3_action_evidence_rerun",
    "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
  },
  "task_context": {
    "task_name": "Identify low-engagement group",
    "scope": "Many students",
    "actionable_question": "Which students are dangerously disengaged and need outreach?",
    "target_audience": "instructor, admin",
    "ai_summary_type": "ranking",
    "ai_prompt_hint": "Define 'low engagement' threshold. List students below it. Recommend admin action (email/contact).",
    "query_labels": [
      "low_engagement_group"
    ],
    "explanation_strategy": "behavioral"
  },
  "schema_context": {
    "source_tables": [
      "enrollment",
      "engagement"
    ],
    "key_db_fields": [
      "engagement_score [FE cross]",
      "study_effort_level [FE cross]",
      "total_clicks (engagement)",
      "active_days"
    ],
    "output_schema": {},
    "query_labels": [
      "low_engagement_group"
    ]
  },
  "evaluation_requirements": {
    "required_core_outputs": [
      {
        "requirement_id": "A-G01-CORE-01",
        "description": "Define 'low engagement' threshold."
      },
      {
        "requirement_id": "A-G01-CORE-02",
        "description": "List students below it."
      },
      {
        "requirement_id": "A-G01-CORE-03",
        "description": "Recommend admin action (email/contact)."
      }
    ],
    "required_supporting_outputs": [],
    "evaluation_constraints": [
      {
        "constraint_id": "A-G01-CONSTRAINT-01",
        "description": "Do not name individual students beyond identifiers already present in returned data."
      },
      {
        "constraint_id": "A-G01-CONSTRAINT-02",
        "description": "Treat the output as internal admin use when individual identifiers are listed."
      }
    ],
    "safety_fairness_applicability": "applicable",
    "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
  },
  "derived_stat_evidence": [],
  "evidence_access_summary": {
    "evidence_access_mode": "deterministic_artifact_retrieval",
    "full_result_row_count": 1544,
    "prompt_embedded_row_count": 0,
    "retrieved_row_count": 1544,
    "retrieved_row_count_by_dataset": {
      "low_engagement_group": 1544
    },
    "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G01__task_aware_data_summarization.json",
    "retrieval_coverage_status": "full",
    "full_access_available": true,
    "deterministic_scan_scope": "full_query_artifact_all_rows",
    "deterministic_scan_row_count_by_dataset": {
      "low_engagement_group": 1544
    },
    "full_result_sent_to_llm": false,
    "evidence_summary": {
      "row_count_phase3": 1544,
      "row_count_observed": 1544,
      "row_count_bucket_phase3": ">20",
      "row_count_bucket_observed": ">20",
      "dataset_breakdown": [
        {
          "label": "low_engagement_group",
          "row_count": 1544,
          "sample_fields": [
            "student_id",
            "total_clicks",
            "active_days",
            "engagement_score",
            "study_effort_level"
          ]
        }
      ],
      "full_query_datasets_sha256": "6b611a636af5cff1cfce8b1bcd0d5d150d8d72146b56f5dd1889110f2456e203"
    },
    "retrieval_log_summary": {
      "retrieval_request_complete": true,
      "retrieval_coverage_status": "full",
      "chunk_count": 1,
      "chunks": [
        {
          "chunk_id": "SAMPLE_OULAD__A-G01__task_aware_data_summarization__low_engagement_group__chunk_1",
          "dataset_label": "low_engagement_group",
          "row_start_inclusive": 0,
          "row_end_inclusive": 1543,
          "row_count": 1544,
          "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G01.json",
          "source_artifact_sha256": "1561e97d242b1221e6702d8486ef8b4e04e20c8666661b54a458f5e5076509fb"
        }
      ]
    },
    "context_manifest_validation": {
      "direct_embedding_validation": null,
      "retrieval_validation": {
        "status": "pass",
        "retrieved_row_count": 1544,
        "chunk_count": 1,
        "chunk_ids": [
          "SAMPLE_OULAD__A-G01__task_aware_data_summarization__low_engagement_group__chunk_1"
        ],
        "row_ranges": [
          {
            "dataset_label": "low_engagement_group",
            "row_start_inclusive": 0,
            "row_end_inclusive": 1543,
            "row_count": 1544
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
    "raw_text": "Summary: A significant number of students exhibit dangerously low engagement levels, with the lowest engagement score recorded at 0.0018. This pattern indicates a concerning lack of interaction with course materials, suggesting that these students may require immediate outreach to address their disengagement.\n\nInsights: Consistent Low Engagement Scores: The top students in the low engagement group all share an engagement score of 0.0018, indicating a uniform level of disengagement. This suggests a systemic issue affecting these students' ability to engage with the course content. | Minimal Interaction Metrics: Students in the low engagement group have recorded only 1 total click and 1 active day, highlighting a severe lack of interaction with the learning platform. This behavior suggests that these students are not utilizing available resources effectively.\n\nEducational implications: Students with low engagement scores may be at risk of failing the course due to insufficient interaction with course materials.\n\nRecommendations: high - Initiate outreach to students with engagement scores below 0.05. - Direct communication can help identify barriers to engagement and provide necessary support to improve their academic performance.",
    "structured_payload": {
      "task_id": "A-G01",
      "execution_id": "exec_1781847673084_be8daf4d",
      "explanation": {
        "summary": "A significant number of students exhibit dangerously low engagement levels, with the lowest engagement score recorded at 0.0018. This pattern indicates a concerning lack of interaction with course materials, suggesting that these students may require immediate outreach to address their disengagement.",
        "insights": [
          {
            "title": "Consistent Low Engagement Scores",
            "description": "The top students in the low engagement group all share an engagement score of 0.0018, indicating a uniform level of disengagement. This suggests a systemic issue affecting these students' ability to engage with the course content.",
            "severity": "high",
            "evidence": [
              {
                "metric": "engagement_score",
                "value": 0.0018,
                "comparison": "stable",
                "delta": null,
                "context": "Top 10 students in low engagement group"
              }
            ]
          },
          {
            "title": "Minimal Interaction Metrics",
            "description": "Students in the low engagement group have recorded only 1 total click and 1 active day, highlighting a severe lack of interaction with the learning platform. This behavior suggests that these students are not utilizing available resources effectively.",
            "severity": "high",
            "evidence": [
              {
                "metric": "total_clicks",
                "value": 1,
                "comparison": "baseline",
                "delta": null,
                "context": "Total clicks for top low engagement students"
              },
              {
                "metric": "active_days",
                "value": 1,
                "comparison": "baseline",
                "delta": null,
                "context": "Active days for top low engagement students"
              }
            ]
          }
        ],
        "educational_implications": [
          "Students with low engagement scores may be at risk of failing the course due to insufficient interaction with course materials."
        ],
        "recommendations": [
          {
            "priority": "high",
            "action": "Initiate outreach to students with engagement scores below 0.05.",
            "rationale": "Direct communication can help identify barriers to engagement and provide necessary support to improve their academic performance."
          }
        ],
        "warnings": []
      },
      "confidence": {
        "level": "HIGH",
        "reason": "The dataset provides a clear ranking of engagement scores, allowing for accurate identification of low engagement students.",
        "based_on": [
          "sufficient_data"
        ]
      },
      "explanation_strategy": "behavioral",
      "explanation_type": "behavioral",
      "ai_summary_method": "task_aware_data_summarization",
      "ai_summary_version": "v1",
      "baseline_available": true,
      "input_summary_type": "ranking",
      "ai_summary_method_warning": null,
      "full_result_row_count": 1544,
      "included_row_count": null,
      "small_result_threshold": 20,
      "small_result_full_rows_applied": false,
      "dataset_row_breakdown": [
        {
          "dataset_name": "low_engagement_group",
          "row_count": 1544,
          "included_row_count": 1544
        }
      ],
      "safety_flags": [],
      "degraded": false,
      "meta": {
        "model": "gpt-4o-mini-2024-07-18",
        "latency_ms": 9362,
        "token_usage": {
          "prompt_tokens": 2140,
          "completion_tokens": 512,
          "total_tokens": 2652
        },
        "strategy": "behavioral",
        "granularity": "semester",
        "cost_usd": 0.000628
      }
    },
    "generation_metadata": {
      "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G01__task_aware_data_summarization.json",
      "explanation_artifact_sha256": "3a7c27b1c810895d694c11b4e731427ebcaabb0b3ae72fe3a15468fab9e633c4",
      "ai_service_url": "http://localhost:8000",
      "expected_ai_summary_method": "task_aware_data_summarization",
      "observed_ai_summary_method": "task_aware_data_summarization",
      "degraded": false,
      "model": "gpt-4o-mini-2024-07-18",
      "token_usage": {
        "prompt_tokens": 2140,
        "completion_tokens": 512,
        "total_tokens": 2652
      },
      "latency_ms": 9444,
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
