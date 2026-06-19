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
  "pairwise_record_id": "SAMPLE_UCI_POR__S-T09__pairwise_AB",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T09",
  "order_variant": "AB",
  "dry_run_mode": "single_review",
  "task_context": {
    "task_name": "Lifestyle risk vs performance",
    "scope": "1 student + cohort context",
    "actionable_question": "Could my lifestyle habits be affecting my academic results?",
    "target_audience": "student",
    "ai_summary_type": "correlation_evidence",
    "ai_prompt_hint": "Compare the selected student against the class lifestyle-risk scatter. Highlight the student's position and any cohort-level association between lifestyle_risk_score and avg_score. Frame as correlation, not causation.",
    "query_labels": [
      "lifestyle_risk_scatter"
    ],
    "explanation_strategy": "correlation"
  },
  "schema_context": {
    "source_tables": [
      "student",
      "enrollment",
      "assessment_result",
      "assessment [UCI only]"
    ],
    "key_db_fields": [
      "alcohol_weekday",
      "alcohol_weekend",
      "go_out_freq",
      "health_status",
      "family_relation",
      "free_time",
      "lifestyle_risk_score [FE single]"
    ],
    "output_schema": {
      "required_columns": [
        "student_id",
        "point_role",
        "lifestyle_risk_score",
        "avg_score"
      ],
      "optional_columns": [
        "is_current_student",
        "alcohol_weekday",
        "alcohol_weekend",
        "go_out_freq",
        "health_status",
        "family_relation",
        "free_time"
      ]
    },
    "query_labels": [
      "lifestyle_risk_scatter"
    ]
  },
  "evaluation_requirements": {
    "required_core_outputs": [
      {
        "requirement_id": "S-T09-CORE-01",
        "description": "Compare the selected student against the class lifestyle-risk scatter."
      },
      {
        "requirement_id": "S-T09-CORE-02",
        "description": "Highlight the student's position and any cohort-level association between lifestyle_risk_score and avg_score."
      }
    ],
    "required_supporting_outputs": [],
    "evaluation_constraints": [
      {
        "constraint_id": "S-T09-CONSTRAINT-01",
        "description": "Frame as correlation, not causation."
      }
    ],
    "safety_fairness_applicability": "applicable",
    "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
  },
  "row_count_context": {
    "full_result_row_count": 649,
    "row_count_bucket": ">20",
    "small_result_threshold": 20,
    "rule": "Baseline may have generated from rows[:20], while task-aware may have used full-result-aware summarization; compare both explanations against the supplied full evidence."
  },
  "evidence_access_summary": {
    "full_query_artifacts": [
      {
        "dataset_label": "lifestyle_risk_scatter",
        "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T09.json",
        "artifact_sha256": "ac1a70115e0a9941bcb6b44a7a70ee79c402ac36c1f083a8b20d42959fa648ca",
        "row_count": 649,
        "readable": true
      }
    ],
    "evidence_access_mode": "deterministic_artifact_retrieval",
    "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_UCI_POR__S-T09__baseline_first_20_rows.json",
    "retrieval_coverage_status": "full",
    "full_access_available": true,
    "deterministic_scan_scope": "full_query_artifact_all_rows",
    "deterministic_scan_row_count_by_dataset": {
      "lifestyle_risk_scatter": 649
    }
  },
  "deterministic_derived_stat_evidence": {
    "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase9_single_review_dry_run/derived_stat_evidence/SAMPLE_UCI_POR/SAMPLE_UCI_POR__S-T09__derived_stats.json",
    "artifact_sha256": "5c7f78a6617861521c9e43a92240f73de1d57d0711b1b4c859281132a5c878ce",
    "stat_family": "correlation",
    "coefficient_method": "pearson",
    "x_column": "lifestyle_risk_score",
    "y_column": "avg_score",
    "entity_column": "student_id",
    "source_full_query_artifact": {
      "path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T09.json",
      "sha256": "ac1a70115e0a9941bcb6b44a7a70ee79c402ac36c1f083a8b20d42959fa648ca",
      "evidence_id": "SAMPLE_UCI_POR__S-T09"
    },
    "derived_stats": [
      {
        "dataset_label": "lifestyle_risk_scatter",
        "status": "pass",
        "reason": null,
        "row_count": 649,
        "valid_pair_count": 649,
        "invalid_x_count": 0,
        "invalid_y_count": 0,
        "x_mean": 0.362789,
        "y_mean": 58.12527,
        "x_variance": 22.0151020801,
        "y_variance": 130053.4535778121,
        "covariance": -176.2102380586,
        "pearson_r": -0.10413814597596738,
        "pearson_r_rounded_4": -0.1041,
        "direction": "negative",
        "strength": "weak",
        "coefficient_source": "deterministic_recompute_from_full_query_rows",
        "formula": "sum((x - mean_x) * (y - mean_y)) / sqrt(sum((x - mean_x)^2) * sum((y - mean_y)^2))",
        "warnings": []
      }
    ],
    "judge_usage_note": "Use this artifact as deterministic support for correlation coefficient claims. It proves derived Pearson r from all valid x/y pairs in the full query result; it does not prove causality or statistical significance."
  },
  "candidate_A": {
    "candidate_label": "A",
    "explanation": {
      "raw_text": "Summary: There appears to be a negative correlation between Lifestyle Risk Score and Average Score among students. As the Lifestyle Risk Score increases, the Average Score tends to decrease, indicating that healthier lifestyle choices may be linked to better academic performance.\n\nInsights: Negative Correlation Observed: Students with lower Lifestyle Risk Scores generally achieve higher Average Scores. For instance, students with a Lifestyle Risk Score of 0.9 or lower have Average Scores ranging from 55 to 78.33, while those with higher scores tend to have lower averages.\n\nEducational implications: Improving lifestyle habits could potentially enhance academic performance.\n\nRecommendations: high - Encourage healthier lifestyle choices among students. - Promoting better habits may lead to improved academic outcomes.",
      "structured_payload": {
        "task_id": "S-T09",
        "execution_id": "exec_1781847244230_bdc094c9",
        "explanation": {
          "summary": "There appears to be a negative correlation between Lifestyle Risk Score and Average Score among students. As the Lifestyle Risk Score increases, the Average Score tends to decrease, indicating that healthier lifestyle choices may be linked to better academic performance.",
          "insights": [
            {
              "title": "Negative Correlation Observed",
              "description": "Students with lower Lifestyle Risk Scores generally achieve higher Average Scores. For instance, students with a Lifestyle Risk Score of 0.9 or lower have Average Scores ranging from 55 to 78.33, while those with higher scores tend to have lower averages.",
              "severity": "high",
              "evidence": [
                {
                  "metric": "lifestyle_risk_score",
                  "value": 0.9,
                  "comparison": "baseline",
                  "delta": null,
                  "context": "Average Scores of students with this risk score are significantly higher."
                }
              ]
            }
          ],
          "educational_implications": [
            "Improving lifestyle habits could potentially enhance academic performance."
          ],
          "recommendations": [
            {
              "priority": "high",
              "action": "Encourage healthier lifestyle choices among students.",
              "rationale": "Promoting better habits may lead to improved academic outcomes."
            }
          ],
          "warnings": []
        },
        "confidence": {
          "level": "HIGH",
          "reason": "The dataset is comprehensive with 649 rows, providing a solid basis for correlation analysis.",
          "based_on": [
            "sufficient_data"
          ]
        },
        "explanation_strategy": "correlation",
        "explanation_type": "correlation",
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
          "latency_ms": 9589,
          "token_usage": {
            "prompt_tokens": 2837,
            "completion_tokens": 320,
            "total_tokens": 3157
          },
          "strategy": "correlation",
          "granularity": "semester",
          "cost_usd": 0.000618
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
      "raw_text": "Summary: There is a weak negative correlation between Lifestyle Risk Score and Average Score, suggesting that as lifestyle risk increases, average scores tend to decrease slightly. This indicates that your lifestyle habits may have some impact on your academic performance.\n\nInsights: Weak Negative Correlation: The correlation coefficient of -0.1041 indicates a weak negative relationship between lifestyle risk and average scores. This means that higher lifestyle risk scores are associated with lower average scores, but the relationship is not strong.\n\nEducational implications: Improving lifestyle habits may help enhance academic performance.\n\nRecommendations: high - Evaluate and adjust your lifestyle habits. - Making positive changes in your lifestyle could potentially lead to better academic outcomes.",
      "structured_payload": {
        "task_id": "S-T09",
        "execution_id": "exec_1781847244230_bdc094c9",
        "explanation": {
          "summary": "There is a weak negative correlation between Lifestyle Risk Score and Average Score, suggesting that as lifestyle risk increases, average scores tend to decrease slightly. This indicates that your lifestyle habits may have some impact on your academic performance.",
          "insights": [
            {
              "title": "Weak Negative Correlation",
              "description": "The correlation coefficient of -0.1041 indicates a weak negative relationship between lifestyle risk and average scores. This means that higher lifestyle risk scores are associated with lower average scores, but the relationship is not strong.",
              "severity": "medium",
              "evidence": [
                {
                  "metric": "lifestyle_risk_score",
                  "value": 0.375,
                  "comparison": "baseline",
                  "delta": null,
                  "context": "Selected student lifestyle risk score"
                },
                {
                  "metric": "avg_score",
                  "value": 36.67,
                  "comparison": "baseline",
                  "delta": null,
                  "context": "Selected student average score"
                }
              ]
            }
          ],
          "educational_implications": [
            "Improving lifestyle habits may help enhance academic performance."
          ],
          "recommendations": [
            {
              "priority": "high",
              "action": "Evaluate and adjust your lifestyle habits.",
              "rationale": "Making positive changes in your lifestyle could potentially lead to better academic outcomes."
            }
          ],
          "warnings": []
        },
        "confidence": {
          "level": "MEDIUM",
          "reason": "The correlation is weak and no statistical significance is established.",
          "based_on": [
            "sparse_data"
          ]
        },
        "explanation_strategy": "correlation",
        "explanation_type": "correlation",
        "ai_summary_version": "v1",
        "baseline_available": true,
        "input_summary_type": "correlation_evidence",
        "full_result_row_count": 649,
        "included_row_count": null,
        "small_result_threshold": 20,
        "small_result_full_rows_applied": false,
        "dataset_row_breakdown": [
          {
            "dataset_name": "lifestyle_risk_scatter",
            "row_count": 649,
            "included_row_count": 649
          }
        ],
        "safety_flags": [],
        "degraded": false,
        "meta": {
          "model": "gpt-4o-mini-2024-07-18",
          "latency_ms": 8475,
          "token_usage": {
            "prompt_tokens": 1265,
            "completion_tokens": 343,
            "total_tokens": 1608
          },
          "strategy": "correlation",
          "granularity": "semester",
          "cost_usd": 0.000396
        }
      }
    },
    "generator_context_summary": {
      "full_result_row_count": 649,
      "included_row_count": null,
      "small_result_threshold": 20,
      "small_result_full_rows_applied": false,
      "dataset_row_breakdown": [
        {
          "dataset_name": "lifestyle_risk_scatter",
          "row_count": 649,
          "included_row_count": 649
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
