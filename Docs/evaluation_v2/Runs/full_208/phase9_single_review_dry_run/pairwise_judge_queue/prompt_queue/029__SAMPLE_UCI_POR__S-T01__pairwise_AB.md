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
  "pairwise_record_id": "SAMPLE_UCI_POR__S-T01__pairwise_AB",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T01",
  "order_variant": "AB",
  "dry_run_mode": "single_review",
  "task_context": {
    "task_name": "Score trend analysis",
    "scope": "1 student",
    "actionable_question": "Am I getting better or worse over time?",
    "target_audience": "student",
    "ai_summary_type": "trend_series",
    "ai_prompt_hint": "Identify trend direction, assessments below pass/target thresholds, and the concrete recommended_action for the weakest recent assessment.",
    "query_labels": [
      "score_trend"
    ],
    "explanation_strategy": "trend"
  },
  "schema_context": {
    "source_tables": [
      "assessment_result",
      "assessment"
    ],
    "key_db_fields": [
      "score_normalized",
      "assessment_order",
      "week_of_class",
      "assessment_type; performance_trend [FE cross]"
    ],
    "output_schema": {
      "required_columns": [
        "assessment_order",
        "score_normalized",
        "pass_flag"
      ],
      "optional_columns": [
        "week_of_class",
        "assessment_type",
        "assessment_name",
        "class_avg_score",
        "score_vs_class_avg",
        "score_scale",
        "pass_threshold",
        "target_threshold",
        "below_pass_threshold",
        "below_target_threshold",
        "performance_trend",
        "support_level",
        "recommended_action"
      ]
    },
    "query_labels": [
      "score_trend"
    ]
  },
  "evaluation_requirements": {
    "required_core_outputs": [
      {
        "requirement_id": "S-T01-CORE-01",
        "description": "Identify the observed score trend direction."
      },
      {
        "requirement_id": "S-T01-CORE-02",
        "description": "Identify assessments below returned pass or target thresholds."
      }
    ],
    "required_supporting_outputs": [
      {
        "requirement_id": "S-T01-SUPPORT-01",
        "description": "Provide recommended_action for the weakest recent assessment only when that field is present."
      }
    ],
    "evaluation_constraints": [
      {
        "constraint_id": "S-T01-CONSTRAINT-01",
        "description": "If fewer than 3 assessment data points are available, state that evidence is insufficient for a reliable trend rather than asserting a stable direction."
      }
    ],
    "safety_fairness_applicability": "applicable",
    "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
  },
  "row_count_context": {
    "full_result_row_count": 3,
    "row_count_bucket": "<=20",
    "small_result_threshold": 20,
    "rule": "Both modes should be treated as having complete row coverage because rows[:20] covers the full result."
  },
  "evidence_access_summary": {
    "full_query_artifacts": [
      {
        "dataset_label": "score_trend",
        "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T01.json",
        "artifact_sha256": "b37c65f01545c86add435353b640b163231a341b9bfdaba9715d46d90567cebb",
        "row_count": 3,
        "readable": true
      }
    ],
    "evidence_access_mode": "direct_embedding",
    "retrieval_log_path": null,
    "retrieval_coverage_status": "not_applicable",
    "full_access_available": true,
    "deterministic_scan_scope": "full_query_artifact_all_rows",
    "deterministic_scan_row_count_by_dataset": {
      "score_trend": 3
    }
  },
  "deterministic_derived_stat_evidence": null,
  "candidate_A": {
    "candidate_label": "A",
    "explanation": {
      "raw_text": "Summary: Your performance shows an initial struggle, but you've made some progress by Assessment 2. However, your scores have plateaued, indicating a need for further improvement.\n\nInsights: Initial Struggle in Assessment 1: In Assessment 1, you scored 0, which is significantly below the pass threshold of 40. This indicates a need for urgent support. | Improvement in Assessment 2: By Assessment 2, your score improved to 55, allowing you to pass. However, you are still below the target threshold of 70. | Plateau in Assessment 3: Your score remained at 55 in Assessment 3, indicating a plateau in performance despite passing. This suggests a need for targeted practice to reach higher scores.\n\nEducational implications: You have shown some improvement, but consistent practice and review are necessary to reach your target performance.\n\nRecommendations: high - Review Assessment 1 with tutor support to understand missed concepts. - This will help you build a stronger foundation and improve your scores in future assessments. | medium - Practice similar questions and review feedback from Assessments 2 and 3. - This will help you move from pass-level to target-level performance.",
      "structured_payload": {
        "task_id": "S-T01",
        "execution_id": "exec_1781847241776_40422500",
        "explanation": {
          "summary": "Your performance shows an initial struggle, but you've made some progress by Assessment 2. However, your scores have plateaued, indicating a need for further improvement.",
          "insights": [
            {
              "title": "Initial Struggle in Assessment 1",
              "description": "In Assessment 1, you scored 0, which is significantly below the pass threshold of 40. This indicates a need for urgent support.",
              "severity": "high",
              "evidence": [
                {
                  "metric": "score_normalized",
                  "value": 0,
                  "comparison": "baseline",
                  "delta": null,
                  "context": "Assessment 1 score"
                }
              ]
            },
            {
              "title": "Improvement in Assessment 2",
              "description": "By Assessment 2, your score improved to 55, allowing you to pass. However, you are still below the target threshold of 70.",
              "severity": "medium",
              "evidence": [
                {
                  "metric": "score_normalized",
                  "value": 55,
                  "comparison": "up_from_previous",
                  "delta": 55,
                  "context": "Assessment 2 score"
                }
              ]
            },
            {
              "title": "Plateau in Assessment 3",
              "description": "Your score remained at 55 in Assessment 3, indicating a plateau in performance despite passing. This suggests a need for targeted practice to reach higher scores.",
              "severity": "medium",
              "evidence": [
                {
                  "metric": "score_normalized",
                  "value": 55,
                  "comparison": "stable",
                  "delta": 0,
                  "context": "Assessment 3 score"
                }
              ]
            }
          ],
          "educational_implications": [
            "You have shown some improvement, but consistent practice and review are necessary to reach your target performance."
          ],
          "recommendations": [
            {
              "priority": "high",
              "action": "Review Assessment 1 with tutor support to understand missed concepts.",
              "rationale": "This will help you build a stronger foundation and improve your scores in future assessments."
            },
            {
              "priority": "medium",
              "action": "Practice similar questions and review feedback from Assessments 2 and 3.",
              "rationale": "This will help you move from pass-level to target-level performance."
            }
          ],
          "warnings": []
        },
        "confidence": {
          "level": "HIGH",
          "reason": "The data quality is strong with a large sample size and clear assessment results.",
          "based_on": [
            "sufficient_data"
          ]
        },
        "explanation_strategy": "trend",
        "explanation_type": "trend",
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
          "latency_ms": 13551,
          "token_usage": {
            "prompt_tokens": 1324,
            "completion_tokens": 565,
            "total_tokens": 1889
          },
          "strategy": "trend",
          "granularity": "per_assessment",
          "cost_usd": 0.000538
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
      "raw_text": "Summary: Your performance shows an overall improvement from Assessment 1 to Assessment 2, but it has plateaued in Assessment 3. While you passed the last two assessments, your scores remain below the target threshold, indicating room for growth.\n\nInsights: Initial Struggles and Improvement: In Assessment 1, you scored 0, which is significantly below the pass threshold. By Assessment 2, your score improved to 55, marking a positive change of +55 points. | Plateau in Performance: Your score remained at 55 in Assessment 3, indicating no further improvement despite passing. This suggests a need for targeted practice to reach the target threshold of 70. | Consistent Below Target Performance: Across all assessments, your scores have been below the target threshold of 70, highlighting a consistent area for improvement.\n\nEducational implications: You have shown the ability to improve, but consistent practice and review are necessary to reach your target performance level.\n\nRecommendations: high - Review this assessment with tutor support; focus on missed core concepts before the next assessment. - This action will help you address foundational gaps and improve your understanding, which is crucial for achieving higher scores.",
      "structured_payload": {
        "task_id": "S-T01",
        "execution_id": "exec_1781847241776_40422500",
        "explanation": {
          "summary": "Your performance shows an overall improvement from Assessment 1 to Assessment 2, but it has plateaued in Assessment 3. While you passed the last two assessments, your scores remain below the target threshold, indicating room for growth.",
          "insights": [
            {
              "title": "Initial Struggles and Improvement",
              "description": "In Assessment 1, you scored 0, which is significantly below the pass threshold. By Assessment 2, your score improved to 55, marking a positive change of +55 points.",
              "severity": "high",
              "evidence": [
                {
                  "metric": "score_normalized",
                  "value": 55,
                  "comparison": "up_from_previous",
                  "delta": 55,
                  "context": "Improvement from Assessment 1 to Assessment 2"
                }
              ]
            },
            {
              "title": "Plateau in Performance",
              "description": "Your score remained at 55 in Assessment 3, indicating no further improvement despite passing. This suggests a need for targeted practice to reach the target threshold of 70.",
              "severity": "medium",
              "evidence": [
                {
                  "metric": "score_normalized",
                  "value": 55,
                  "comparison": "stable",
                  "delta": 0,
                  "context": "No change from Assessment 2 to Assessment 3"
                }
              ]
            },
            {
              "title": "Consistent Below Target Performance",
              "description": "Across all assessments, your scores have been below the target threshold of 70, highlighting a consistent area for improvement.",
              "severity": "high",
              "evidence": [
                {
                  "metric": "below_target_threshold",
                  "value": 1,
                  "comparison": "baseline",
                  "delta": null,
                  "context": "All assessments below target threshold"
                }
              ]
            }
          ],
          "educational_implications": [
            "You have shown the ability to improve, but consistent practice and review are necessary to reach your target performance level."
          ],
          "recommendations": [
            {
              "priority": "high",
              "action": "Review this assessment with tutor support; focus on missed core concepts before the next assessment.",
              "rationale": "This action will help you address foundational gaps and improve your understanding, which is crucial for achieving higher scores."
            }
          ],
          "warnings": []
        },
        "confidence": {
          "level": "HIGH",
          "reason": "The data quality is strong with a large sample size and no reliability warnings.",
          "based_on": [
            "sufficient_data"
          ]
        },
        "explanation_strategy": "trend",
        "explanation_type": "trend",
        "ai_summary_version": "v1",
        "baseline_available": true,
        "input_summary_type": "full_rows_due_to_small_result",
        "full_result_row_count": 3,
        "included_row_count": 3,
        "small_result_threshold": 20,
        "small_result_full_rows_applied": true,
        "dataset_row_breakdown": [
          {
            "dataset_name": "score_trend",
            "row_count": 3,
            "included_row_count": 3
          }
        ],
        "safety_flags": [],
        "degraded": false,
        "meta": {
          "model": "gpt-4o-mini-2024-07-18",
          "latency_ms": 7011,
          "token_usage": {
            "prompt_tokens": 1476,
            "completion_tokens": 556,
            "total_tokens": 2032
          },
          "strategy": "trend",
          "granularity": "per_assessment",
          "cost_usd": 0.000555
        }
      }
    },
    "generator_context_summary": {
      "full_result_row_count": 3,
      "included_row_count": 3,
      "small_result_threshold": 20,
      "small_result_full_rows_applied": true,
      "dataset_row_breakdown": [
        {
          "dataset_name": "score_trend",
          "row_count": 3,
          "included_row_count": 3
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
