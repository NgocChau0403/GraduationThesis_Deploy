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
        "dataset_label": "engagement_performance_scatter",
        "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G02.json",
        "artifact_sha256": "ec1f523b113edf667ebc50cd23a781f0582552aee4eb0ead13dd52d986b33157",
        "row_count": 649,
        "readable": true
      }
    ],
    "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_contexts/final_contexts/SAMPLE_UCI_POR__A-G02__baseline_first_20_rows.md",
    "final_context_sha256": "6c5cb400accf59c8b0eca859fb59e4e47a6877e8e281eba21c4d2fb13d078c6a",
    "judge_input_path": "Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_inputs/records/SAMPLE_UCI_POR__A-G02__baseline_first_20_rows.json",
    "judge_input_sha256": "e419b4dc0cb6208763a227a3dfaa2df90a6476ef72b95153342c9da8ce371bd0"
  },
  "record_identity": {
    "record_id": "SAMPLE_UCI_POR__A-G02__baseline_first_20_rows",
    "evaluation_run_id": "llm_judge_v3_uci_rerun",
    "dataset_id": "SAMPLE_UCI_POR",
    "task_id": "A-G02",
    "explanation_mode": "baseline_first_20_rows",
    "prompt_version": "judge_prompt_v3_uci_rerun",
    "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
  },
  "task_context": {
    "task_name": "Engagement–performance relationship",
    "scope": "Many students",
    "actionable_question": "Does engaging more in this class actually lead to better grades?",
    "target_audience": "instructor",
    "ai_summary_type": "correlation_evidence",
    "ai_prompt_hint": "Describe correlation direction and strength. Flag outliers (high engagement, low score) as a special case.",
    "query_labels": [
      "engagement_performance_scatter"
    ],
    "explanation_strategy": "correlation"
  },
  "schema_context": {
    "source_tables": [
      "enrollment",
      "assessment_result",
      "assessment",
      "engagement"
    ],
    "key_db_fields": [
      "engagement_score [FE cross]",
      "avg_score [FE cross]",
      "final_outcome"
    ],
    "output_schema": {},
    "query_labels": [
      "engagement_performance_scatter"
    ]
  },
  "evaluation_requirements": {
    "required_core_outputs": [
      {
        "requirement_id": "A-G02-CORE-01",
        "description": "Describe correlation direction and strength."
      },
      {
        "requirement_id": "A-G02-CORE-02",
        "description": "Flag outliers (high engagement, low score) as a special case."
      }
    ],
    "required_supporting_outputs": [],
    "evaluation_constraints": [
      {
        "constraint_id": "A-G02-CONSTRAINT-01",
        "description": "Describe the engagement-score relationship as correlational; do not infer that engagement causes score outcomes."
      }
    ],
    "safety_fairness_applicability": "applicable",
    "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
  },
  "derived_stat_evidence": [
    {
      "stat_id": "A-G02__pearson_r__1",
      "stat_type": "pearson_r",
      "dataset_label": "engagement_performance_scatter",
      "x_column": "engagement_score",
      "y_column": "avg_score",
      "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G02.json",
      "source_artifact_sha256": "ec1f523b113edf667ebc50cd23a781f0582552aee4eb0ead13dd52d986b33157",
      "status": "skipped",
      "pearson_r": null,
      "n": 649,
      "strength_label": null,
      "direction": null,
      "skip_reason": "zero_variance"
    }
  ],
  "evidence_access_summary": {
    "evidence_access_mode": "deterministic_artifact_retrieval",
    "full_result_row_count": 649,
    "prompt_embedded_row_count": 0,
    "retrieved_row_count": 649,
    "retrieved_row_count_by_dataset": {
      "engagement_performance_scatter": 649
    },
    "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_UCI_POR__A-G02__baseline_first_20_rows.json",
    "retrieval_coverage_status": "full",
    "full_access_available": true,
    "deterministic_scan_scope": "full_query_artifact_all_rows",
    "deterministic_scan_row_count_by_dataset": {
      "engagement_performance_scatter": 649
    },
    "full_result_sent_to_llm": false,
    "evidence_summary": {
      "row_count_phase3": 649,
      "row_count_observed": 649,
      "row_count_bucket_phase3": ">20",
      "row_count_bucket_observed": ">20",
      "dataset_breakdown": [
        {
          "label": "engagement_performance_scatter",
          "row_count": 649,
          "sample_fields": [
            "student_id",
            "engagement_score",
            "avg_score",
            "final_outcome"
          ]
        }
      ],
      "full_query_datasets_sha256": "8e063cea0577e6cef735683d26fbb6a3fa7beb23d83610c7718fc22fd8c7971a"
    },
    "retrieval_log_summary": {
      "retrieval_request_complete": true,
      "retrieval_coverage_status": "full",
      "chunk_count": 1,
      "chunks": [
        {
          "chunk_id": "SAMPLE_UCI_POR__A-G02__baseline_first_20_rows__engagement_performance_scatter__chunk_1",
          "dataset_label": "engagement_performance_scatter",
          "row_start_inclusive": 0,
          "row_end_inclusive": 648,
          "row_count": 649,
          "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G02.json",
          "source_artifact_sha256": "ec1f523b113edf667ebc50cd23a781f0582552aee4eb0ead13dd52d986b33157"
        }
      ]
    },
    "context_manifest_validation": {
      "direct_embedding_validation": null,
      "retrieval_validation": {
        "status": "pass",
        "retrieved_row_count": 649,
        "chunk_count": 1,
        "chunk_ids": [
          "SAMPLE_UCI_POR__A-G02__baseline_first_20_rows__engagement_performance_scatter__chunk_1"
        ],
        "row_ranges": [
          {
            "dataset_label": "engagement_performance_scatter",
            "row_start_inclusive": 0,
            "row_end_inclusive": 648,
            "row_count": 649
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
    "raw_text": "Summary: The analysis reveals a weak negative correlation between Engagement Score and Average Score, indicating that higher engagement does not necessarily lead to better academic performance in this dataset. This suggests that other factors may be influencing student outcomes.\n\nInsights: Weak Negative Correlation: The correlation between engagement_score and avg_score is weakly negative, suggesting that as engagement increases, average scores do not show a corresponding increase. This may indicate that students with higher engagement are not necessarily achieving higher academic performance. | Outlier Identification: Several students exhibit high average scores despite having an engagement score of 0, indicating potential outliers. This pattern suggests that these students may be relying on prior knowledge or external factors to achieve their grades.\n\nEducational implications: The weak correlation suggests that increasing engagement alone may not be sufficient to improve academic performance, indicating a need for a more holistic approach to student support.\n\nRecommendations: high - Implement targeted interventions for students with high engagement but low scores. - These students may benefit from additional academic support or resources to translate their engagement into improved performance.",
    "structured_payload": {
      "task_id": "A-G02",
      "execution_id": "exec_1781847232116_05e73795",
      "explanation": {
        "summary": "The analysis reveals a weak negative correlation between Engagement Score and Average Score, indicating that higher engagement does not necessarily lead to better academic performance in this dataset. This suggests that other factors may be influencing student outcomes.",
        "insights": [
          {
            "title": "Weak Negative Correlation",
            "description": "The correlation between engagement_score and avg_score is weakly negative, suggesting that as engagement increases, average scores do not show a corresponding increase. This may indicate that students with higher engagement are not necessarily achieving higher academic performance.",
            "severity": "medium",
            "evidence": [
              {
                "metric": "engagement_score",
                "value": 0,
                "comparison": "baseline",
                "delta": null,
                "context": "The majority of students have an engagement score of 0, with average scores varying significantly."
              }
            ]
          },
          {
            "title": "Outlier Identification",
            "description": "Several students exhibit high average scores despite having an engagement score of 0, indicating potential outliers. This pattern suggests that these students may be relying on prior knowledge or external factors to achieve their grades.",
            "severity": "high",
            "evidence": [
              {
                "metric": "avg_score",
                "value": 85,
                "comparison": "peak",
                "delta": null,
                "context": "Student with high average score but low engagement."
              }
            ]
          }
        ],
        "educational_implications": [
          "The weak correlation suggests that increasing engagement alone may not be sufficient to improve academic performance, indicating a need for a more holistic approach to student support."
        ],
        "recommendations": [
          {
            "priority": "high",
            "action": "Implement targeted interventions for students with high engagement but low scores.",
            "rationale": "These students may benefit from additional academic support or resources to translate their engagement into improved performance."
          }
        ],
        "warnings": []
      },
      "confidence": {
        "level": "HIGH",
        "reason": "The dataset is sufficiently large and varied, providing a reliable basis for correlation analysis.",
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
        "latency_ms": 7167,
        "token_usage": {
          "prompt_tokens": 1575,
          "completion_tokens": 458,
          "total_tokens": 2033
        },
        "strategy": "correlation",
        "granularity": "semester",
        "cost_usd": 0.000511
      }
    },
    "generation_metadata": {
      "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G02__baseline_first_20_rows.json",
      "explanation_artifact_sha256": "d7faee7d3e636a455f6ccda28bd4ed6172eba784afe260af714f4ebac71e607d",
      "ai_service_url": "http://localhost:8000",
      "expected_ai_summary_method": "baseline_first_20_rows",
      "observed_ai_summary_method": "baseline_first_20_rows",
      "degraded": false,
      "model": "gpt-4o-mini-2024-07-18",
      "token_usage": {
        "prompt_tokens": 1575,
        "completion_tokens": 458,
        "total_tokens": 2033
      },
      "latency_ms": 7179,
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
