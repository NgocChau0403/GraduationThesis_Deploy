# Pairwise Judge V3 Dry-Run Prompt Packet

## Pairwise Judge Prompt

# Pairwise Judge Prompt V3 - Single-Review Dry Run Candidate

Status: DRY RUN CANDIDATE, not frozen for official thesis evidence.

Use this prompt only for single-review calibration dry runs. It is designed to
test whether the judge can distinguish `baseline_first_20_rows` and
`task_aware_data_summarization` more sharply than the pointwise V2 judge.

## Role

You are an LLM-as-a-judge evaluating two AI explanations for the same learning
analytics task. The two candidates are anonymized as `A` and `B`.

You must compare both candidates against the same task metadata, schema context,
full-query evidence access, deterministic checks, and derived-stat evidence.
Do not use prior absolute scores, prior verdicts, or prior judge rationales.

## Main Question

Which explanation is more faithful, numerically correct, complete, task-relevant,
actionable, clear, and safe for the target audience?

## Required Comparison Behavior

1. Compare `A` and `B` directly. Do not evaluate them as isolated records.
2. Prefer the candidate that is better supported by the full evidence.
3. Prefer the candidate that uses task-specific evidence more completely and
   more concretely, when the evidence is correct.
4. Do not reward extra length by itself. Reward specificity only when it is
   evidence-grounded and task-relevant.
5. A tie is allowed, but it must be justified metric by metric.
6. Do not return `tie` if one candidate has materially better evidence coverage
   and materially more specific, correct task explanation, unless you explain why
   those advantages do not change the final comparison.
7. If both candidates see the entire result because `row_count <= 20`, do not
   assume task-aware has an evidence-coverage advantage. Compare actual content.
8. If `row_count > 20`, remember that `baseline_first_20_rows` may have generated
   from only the first 20 rows, while task-aware may have generated from a
   deterministic summary or full-result-aware context. Judge the explanation
   against the full evidence supplied to you, not against the generator's limits.

## Correlation / Derived-Stat Rules

When deterministic derived-stat evidence is provided:

1. Use it as the primary support check for Pearson coefficient claims.
2. If a candidate states a coefficient that matches the deterministic
   `pearson_r_rounded_4`, do not mark that coefficient unsupported.
3. If derived-stat evidence says `zero_variance`, `no_valid_numeric_pairs`, or
   coefficient unavailable, penalize claims that invent a coefficient, direction,
   or strength beyond what the evidence supports.
4. Derived Pearson evidence does not prove causality or statistical significance.
   Penalize causal or significance claims unless the supplied evidence proves
   them.

## Output

Return JSON only. Do not wrap it in Markdown.

```json
{
  "schema_version": "pairwise_judge_v3_dry_run_schema_v1",
  "pairwise_record_id": "<string>",
  "dataset_id": "<string>",
  "task_id": "<string>",
  "order_variant": "AB",
  "scoring_status": "judged",
  "winner": "A",
  "winner_confidence": "medium",
  "difference_magnitude": "small",
  "dimension_winners": {
    "faithfulness": "A",
    "numerical_correctness": "tie",
    "completeness": "A",
    "task_relevance": "A",
    "actionability": "tie",
    "clarity": "tie",
    "safety_fairness": "tie"
  },
  "metric_comparison": {
    "faithfulness": {
      "winner": "A",
      "reason": "<specific reason tied to evidence>",
      "evidence_refs": ["<evidence ref>"]
    },
    "numerical_correctness": {
      "winner": "tie",
      "reason": "<specific reason tied to numbers/derived stats>",
      "evidence_refs": ["<evidence ref>"]
    },
    "completeness": {
      "winner": "A",
      "reason": "<specific reason tied to required outputs>",
      "evidence_refs": ["<evidence ref>"]
    },
    "task_relevance": {
      "winner": "A",
      "reason": "<specific reason tied to task/audience>",
      "evidence_refs": ["<evidence ref>"]
    },
    "actionability": {
      "winner": "tie",
      "reason": "<specific reason tied to recommendations/actions>",
      "evidence_refs": ["<evidence ref>"]
    },
    "clarity": {
      "winner": "tie",
      "reason": "<specific reason tied to readability/structure>",
      "evidence_refs": []
    },
    "safety_fairness": {
      "winner": "tie",
      "reason": "<specific reason tied to safe/non-causal/non-discriminatory wording>",
      "evidence_refs": ["<evidence ref>"]
    }
  },
  "coverage_comparison": {
    "winner": "A",
    "reason": "<which candidate uses the supplied/full evidence better>"
  },
  "specificity_comparison": {
    "winner": "A",
    "reason": "<which candidate gives more concrete task-grounded explanation>"
  },
  "decisive_evidence": [
    {
      "evidence_ref": "<artifact/check/row/derived-stat ref>",
      "supports_candidate": "A",
      "reason": "<why this evidence is decisive>"
    }
  ],
  "tie_justification": null,
  "absolute_rerun_flags": [
    {
      "candidate": "B",
      "suspected_error_type": "unsupported_claim",
      "severity_hint": "major",
      "reason": "<why pointwise absolute judge should revisit this>",
      "evidence_refs": ["<evidence ref>"]
    }
  ],
  "requires_absolute_rerun": true,
  "reviewer_notes": "<short note for the single human reviewer>"
}
```

Allowed enum values:

- `order_variant`: `AB`, `BA`
- `scoring_status`: `judged`, `invalid`
- `winner`: `A`, `B`, `tie`
- `winner_confidence`: `low`, `medium`, `high`
- `difference_magnitude`: `none`, `small`, `moderate`, `large`
- metric winners: `A`, `B`, `tie`, `not_applicable`
- `severity_hint`: `minor`, `major`, `critical`

If `winner = tie`, set `difference_magnitude = none`, make every non-N/A metric
winner either `tie` or justify the trade-off in `tie_justification`.

If `scoring_status = invalid`, set `winner = tie`, `winner_confidence = low`,
`difference_magnitude = none`, and explain the invalid reason in
`reviewer_notes`.


## Response Schema

Return JSON that conforms to this schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "llm_judge_v3_pairwise_response_schema_dry_run",
  "title": "LLM Judge V3 Pairwise Response Schema - Dry Run",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "schema_version",
    "pairwise_record_id",
    "dataset_id",
    "task_id",
    "order_variant",
    "scoring_status",
    "winner",
    "winner_confidence",
    "difference_magnitude",
    "dimension_winners",
    "metric_comparison",
    "coverage_comparison",
    "specificity_comparison",
    "decisive_evidence",
    "tie_justification",
    "absolute_rerun_flags",
    "requires_absolute_rerun",
    "reviewer_notes"
  ],
  "properties": {
    "schema_version": {
      "const": "pairwise_judge_v3_dry_run_schema_v1"
    },
    "pairwise_record_id": {
      "type": "string",
      "minLength": 1
    },
    "dataset_id": {
      "type": "string",
      "minLength": 1
    },
    "task_id": {
      "type": "string",
      "minLength": 1
    },
    "order_variant": {
      "enum": ["AB", "BA"]
    },
    "scoring_status": {
      "enum": ["judged", "invalid"]
    },
    "winner": {
      "enum": ["A", "B", "tie"]
    },
    "winner_confidence": {
      "enum": ["low", "medium", "high"]
    },
    "difference_magnitude": {
      "enum": ["none", "small", "moderate", "large"]
    },
    "dimension_winners": {
      "$ref": "#/$defs/dimension_winners"
    },
    "metric_comparison": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "faithfulness",
        "numerical_correctness",
        "completeness",
        "task_relevance",
        "actionability",
        "clarity",
        "safety_fairness"
      ],
      "properties": {
        "faithfulness": { "$ref": "#/$defs/metric_comparison" },
        "numerical_correctness": { "$ref": "#/$defs/metric_comparison" },
        "completeness": { "$ref": "#/$defs/metric_comparison" },
        "task_relevance": { "$ref": "#/$defs/metric_comparison" },
        "actionability": { "$ref": "#/$defs/metric_comparison" },
        "clarity": { "$ref": "#/$defs/metric_comparison" },
        "safety_fairness": { "$ref": "#/$defs/metric_comparison" }
      }
    },
    "coverage_comparison": {
      "$ref": "#/$defs/comparison_note"
    },
    "specificity_comparison": {
      "$ref": "#/$defs/comparison_note"
    },
    "decisive_evidence": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["evidence_ref", "supports_candidate", "reason"],
        "properties": {
          "evidence_ref": { "type": "string" },
          "supports_candidate": { "enum": ["A", "B", "tie"] },
          "reason": { "type": "string" }
        }
      }
    },
    "tie_justification": {
      "type": ["string", "null"]
    },
    "absolute_rerun_flags": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "candidate",
          "suspected_error_type",
          "severity_hint",
          "reason",
          "evidence_refs"
        ],
        "properties": {
          "candidate": { "enum": ["A", "B", "both"] },
          "suspected_error_type": { "type": "string" },
          "severity_hint": { "enum": ["minor", "major", "critical"] },
          "reason": { "type": "string" },
          "evidence_refs": {
            "type": "array",
            "items": { "type": "string" }
          }
        }
      }
    },
    "requires_absolute_rerun": {
      "type": "boolean"
    },
    "reviewer_notes": {
      "type": "string"
    }
  },
  "$defs": {
    "winner": {
      "enum": ["A", "B", "tie", "not_applicable"]
    },
    "dimension_winners": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "faithfulness",
        "numerical_correctness",
        "completeness",
        "task_relevance",
        "actionability",
        "clarity",
        "safety_fairness"
      ],
      "properties": {
        "faithfulness": { "$ref": "#/$defs/winner" },
        "numerical_correctness": { "$ref": "#/$defs/winner" },
        "completeness": { "$ref": "#/$defs/winner" },
        "task_relevance": { "$ref": "#/$defs/winner" },
        "actionability": { "$ref": "#/$defs/winner" },
        "clarity": { "$ref": "#/$defs/winner" },
        "safety_fairness": { "$ref": "#/$defs/winner" }
      }
    },
    "metric_comparison": {
      "type": "object",
      "additionalProperties": false,
      "required": ["winner", "reason", "evidence_refs"],
      "properties": {
        "winner": { "$ref": "#/$defs/winner" },
        "reason": { "type": "string" },
        "evidence_refs": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },
    "comparison_note": {
      "type": "object",
      "additionalProperties": false,
      "required": ["winner", "reason"],
      "properties": {
        "winner": { "$ref": "#/$defs/winner" },
        "reason": { "type": "string" }
      }
    }
  }
}
```

## Pairwise Judge Input

```json
{
  "schema_version": "pairwise_judge_v3_dry_run_input_v1",
  "pairwise_record_id": "SAMPLE_UCI_POR__A-G03__pairwise_AB",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G03",
  "order_variant": "AB",
  "dry_run_mode": "single_review",
  "task_context": {
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
  },
  "schema_context": {
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
  },
  "evaluation_requirements": {
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
  },
  "row_count_context": {
    "full_result_row_count": 50,
    "row_count_bucket": ">20",
    "small_result_threshold": 20,
    "rule": "Baseline may have generated from rows[:20], while task-aware may have used full-result-aware summarization; compare both explanations against the supplied full evidence."
  },
  "evidence_access_summary": {
    "full_query_artifacts": [
      {
        "dataset_label": "at_risk_cohort",
        "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G03.json",
        "artifact_sha256": "5ffbfda51d48e1b2ced0234d1b63c1abc449384091a7498a5237ed9522ad74ac",
        "row_count": 50,
        "readable": true
      }
    ],
    "evidence_access_mode": "deterministic_artifact_retrieval",
    "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_UCI_POR__A-G03__baseline_first_20_rows.json",
    "retrieval_coverage_status": "full",
    "full_access_available": true,
    "deterministic_scan_scope": "full_query_artifact_all_rows",
    "deterministic_scan_row_count_by_dataset": {
      "at_risk_cohort": 50
    }
  },
  "deterministic_derived_stat_evidence": null,
  "candidate_A": {
    "candidate_label": "A",
    "explanation": {
      "raw_text": "Summary: A cohort of students has been identified as high-risk due to multiple simultaneous risk signals, including low average scores, repeated attempts, low engagement, and negative performance trends. These indicators suggest a need for immediate academic support to enhance their chances of success.\n\nInsights: Students with Low Average Scores and Engagement: Students such as SAMPLE_UCI_POR_STU_000568, SAMPLE_UCI_POR_STU_000606, and SAMPLE_UCI_POR_STU_000564 exhibit low average scores (5, 6.25, and 8.75 respectively) and have low engagement scores (0). They have also repeated attempts, indicating a struggle with the material. | Negative Performance Trends: Students like SAMPLE_UCI_POR_STU_000611 and SAMPLE_UCI_POR_STU_000598 show a negative trend in performance, with average scores of 10 and 11.25 respectively. Their repeated attempts and low engagement further compound their risk status.\n\nEducational implications: Students exhibiting multiple risk signals require targeted academic interventions to improve their performance and engagement.\n\nRecommendations: high - Prioritise academic support for low average score. - This action addresses the immediate need for academic assistance to help students improve their understanding and performance in the subject.",
      "structured_payload": {
        "task_id": "A-G03",
        "execution_id": "exec_1781847232196_a9b57bec",
        "explanation": {
          "summary": "A cohort of students has been identified as high-risk due to multiple simultaneous risk signals, including low average scores, repeated attempts, low engagement, and negative performance trends. These indicators suggest a need for immediate academic support to enhance their chances of success.",
          "insights": [
            {
              "title": "Students with Low Average Scores and Engagement",
              "description": "Students such as SAMPLE_UCI_POR_STU_000568, SAMPLE_UCI_POR_STU_000606, and SAMPLE_UCI_POR_STU_000564 exhibit low average scores (5, 6.25, and 8.75 respectively) and have low engagement scores (0). They have also repeated attempts, indicating a struggle with the material.",
              "severity": "high",
              "evidence": [
                {
                  "metric": "avg_score",
                  "value": 5,
                  "comparison": "down_from_previous",
                  "delta": -35,
                  "context": "Below pass threshold of 40"
                },
                {
                  "metric": "engagement_score",
                  "value": 0,
                  "comparison": "down_from_previous",
                  "delta": null,
                  "context": "No engagement"
                },
                {
                  "metric": "previous_attempt_count",
                  "value": 1,
                  "comparison": "baseline",
                  "delta": null,
                  "context": "First attempt"
                }
              ]
            },
            {
              "title": "Negative Performance Trends",
              "description": "Students like SAMPLE_UCI_POR_STU_000611 and SAMPLE_UCI_POR_STU_000598 show a negative trend in performance, with average scores of 10 and 11.25 respectively. Their repeated attempts and low engagement further compound their risk status.",
              "severity": "high",
              "evidence": [
                {
                  "metric": "avg_score",
                  "value": 10,
                  "comparison": "down_from_previous",
                  "delta": -30,
                  "context": "Below pass threshold of 40"
                },
                {
                  "metric": "engagement_score",
                  "value": 0,
                  "comparison": "down_from_previous",
                  "delta": null,
                  "context": "No engagement"
                },
                {
                  "metric": "previous_attempt_count",
                  "value": 3,
                  "comparison": "baseline",
                  "delta": null,
                  "context": "Multiple attempts"
                }
              ]
            }
          ],
          "educational_implications": [
            "Students exhibiting multiple risk signals require targeted academic interventions to improve their performance and engagement."
          ],
          "recommendations": [
            {
              "priority": "high",
              "action": "Prioritise academic support for low average score.",
              "rationale": "This action addresses the immediate need for academic assistance to help students improve their understanding and performance in the subject."
            }
          ],
          "warnings": []
        },
        "confidence": {
          "level": "HIGH",
          "reason": "Data is consistent and reflects multiple indicators of student performance and engagement.",
          "based_on": [
            "sufficient_data"
          ]
        },
        "explanation_strategy": "risk",
        "explanation_type": "risk",
        "ai_summary_version": "baseline",
        "baseline_available": true,
        "input_summary_type": "raw_first_20_rows",
        "full_result_row_count": null,
        "included_row_count": null,
        "small_result_threshold": null,
        "small_result_full_rows_applied": null,
        "dataset_row_breakdown": [],
        "safety_flags": [],
        "degraded": false,
        "meta": {
          "model": "gpt-4o-mini-2024-07-18",
          "latency_ms": 30313,
          "token_usage": {
            "prompt_tokens": 7397,
            "completion_tokens": 661,
            "total_tokens": 8058
          },
          "strategy": "risk",
          "granularity": "semester",
          "cost_usd": 0.001506
        }
      }
    },
    "generator_context_summary": {
      "full_result_row_count": null,
      "included_row_count": null,
      "small_result_threshold": null,
      "small_result_full_rows_applied": null,
      "dataset_row_breakdown": [],
      "degraded": false
    }
  },
  "candidate_B": {
    "candidate_label": "B",
    "explanation": {
      "raw_text": "Summary: A cohort of students has been identified as high-risk due to multiple simultaneous risk signals, including low average scores, repeated attempts, low engagement, and negative performance trends. These indicators suggest a pressing need for academic support to improve their outcomes.\n\nInsights: High-Risk Students with Multiple Flags: Students such as SAMPLE_UCI_POR_STU_000568, SAMPLE_UCI_POR_STU_000606, and SAMPLE_UCI_POR_STU_000611 exhibit critical risk signals, including low average scores below the passing threshold, repeated attempts, and a significant decline in engagement. These patterns indicate a severe need for immediate intervention.\n\nEducational implications: Students with low engagement and performance trends are at risk of failing, necessitating immediate academic support.\n\nRecommendations: high - Prioritise academic support for low average score. - This action addresses the immediate academic needs of students who are struggling significantly, as indicated by their low scores and engagement.",
      "structured_payload": {
        "task_id": "A-G03",
        "execution_id": "exec_1781847232196_a9b57bec",
        "explanation": {
          "summary": "A cohort of students has been identified as high-risk due to multiple simultaneous risk signals, including low average scores, repeated attempts, low engagement, and negative performance trends. These indicators suggest a pressing need for academic support to improve their outcomes.",
          "insights": [
            {
              "title": "High-Risk Students with Multiple Flags",
              "description": "Students such as SAMPLE_UCI_POR_STU_000568, SAMPLE_UCI_POR_STU_000606, and SAMPLE_UCI_POR_STU_000611 exhibit critical risk signals, including low average scores below the passing threshold, repeated attempts, and a significant decline in engagement. These patterns indicate a severe need for immediate intervention.",
              "severity": "high",
              "evidence": [
                {
                  "metric": "avg_score",
                  "value": 5,
                  "comparison": "baseline",
                  "delta": -35,
                  "context": "Pass threshold is 40"
                },
                {
                  "metric": "previous_attempt_count",
                  "value": 1,
                  "comparison": "baseline",
                  "delta": 0,
                  "context": "Indicates repeated attempts"
                },
                {
                  "metric": "engagement_score",
                  "value": 0,
                  "comparison": "baseline",
                  "delta": -0.15,
                  "context": "Engagement score is significantly low"
                },
                {
                  "metric": "performance trend",
                  "value": "declining",
                  "comparison": "baseline",
                  "delta": null,
                  "context": "Negative trend observed"
                }
              ]
            }
          ],
          "educational_implications": [
            "Students with low engagement and performance trends are at risk of failing, necessitating immediate academic support."
          ],
          "recommendations": [
            {
              "priority": "high",
              "action": "Prioritise academic support for low average score.",
              "rationale": "This action addresses the immediate academic needs of students who are struggling significantly, as indicated by their low scores and engagement."
            }
          ],
          "warnings": []
        },
        "confidence": {
          "level": "HIGH",
          "reason": "Data quality is robust, with clear indicators of risk across multiple metrics.",
          "based_on": [
            "sufficient_data"
          ]
        },
        "explanation_strategy": "risk",
        "explanation_type": "risk",
        "ai_summary_version": "v1",
        "baseline_available": true,
        "input_summary_type": "ranking",
        "full_result_row_count": 50,
        "included_row_count": null,
        "small_result_threshold": 20,
        "small_result_full_rows_applied": false,
        "dataset_row_breakdown": [
          {
            "dataset_name": "at_risk_cohort",
            "row_count": 50,
            "included_row_count": 50
          }
        ],
        "safety_flags": [],
        "degraded": false,
        "meta": {
          "model": "gpt-4o-mini-2024-07-18",
          "latency_ms": 7979,
          "token_usage": {
            "prompt_tokens": 8996,
            "completion_tokens": 493,
            "total_tokens": 9489
          },
          "strategy": "risk",
          "granularity": "semester",
          "cost_usd": 0.001645
        }
      }
    },
    "generator_context_summary": {
      "full_result_row_count": 50,
      "included_row_count": null,
      "small_result_threshold": 20,
      "small_result_full_rows_applied": false,
      "dataset_row_breakdown": [
        {
          "dataset_name": "at_risk_cohort",
          "row_count": 50,
          "included_row_count": 50
        }
      ],
      "degraded": false
    }
  },
  "judge_instruction_boundary": {
    "hidden_mode_names": true,
    "do_not_use_absolute_judge_scores": true,
    "do_not_assume_longer_is_better": true,
    "compare_metric_by_metric": true,
    "explain_ties_metric_by_metric": true
  }
}
```

Return only the JSON response. Do not include Markdown fences.
