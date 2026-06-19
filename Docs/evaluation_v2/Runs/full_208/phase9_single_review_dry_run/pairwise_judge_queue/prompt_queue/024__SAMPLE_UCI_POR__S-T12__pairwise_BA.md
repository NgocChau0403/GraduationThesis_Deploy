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
  "pairwise_record_id": "SAMPLE_UCI_POR__S-T12__pairwise_BA",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T12",
  "order_variant": "BA",
  "dry_run_mode": "single_review",
  "task_context": {
    "task_name": "Procrastination analysis",
    "scope": "1 student",
    "actionable_question": "Am I a procrastinator and is it costing me marks?",
    "target_audience": "student",
    "ai_summary_type": "trend_series",
    "ai_prompt_hint": "Use submission_delay_avg [FE]. Identify if late submission is systematic. Link to score.",
    "query_labels": [
      "submission_series",
      "punctuality_summary"
    ],
    "explanation_strategy": "behavioral"
  },
  "schema_context": {
    "source_tables": [
      "assessment_result",
      "assessment [OULAD only]"
    ],
    "key_db_fields": [
      "submission_delay_days",
      "score_normalized",
      "pass_flag; submission_delay_avg [FE cross]",
      "punctuality_rate [FE cross]"
    ],
    "output_schema": {},
    "query_labels": [
      "submission_series",
      "punctuality_summary"
    ]
  },
  "evaluation_requirements": {
    "required_core_outputs": [
      {
        "requirement_id": "S-T12-CORE-01",
        "description": "Identify whether late submission is systematic."
      },
      {
        "requirement_id": "S-T12-CORE-02",
        "description": "Describe the observed relationship between submission delay and score."
      }
    ],
    "required_supporting_outputs": [],
    "evaluation_constraints": [
      {
        "constraint_id": "S-T12-CONSTRAINT-01",
        "description": "Use submission_delay_avg as the primary delay metric; do not infer procrastination from score alone."
      },
      {
        "constraint_id": "S-T12-CONSTRAINT-02",
        "description": "Frame the delay-score relationship as correlational, not causal."
      }
    ],
    "safety_fairness_applicability": "applicable",
    "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
  },
  "row_count_context": {
    "full_result_row_count": 4,
    "row_count_bucket": "<=20",
    "small_result_threshold": 20,
    "rule": "Both modes should be treated as having complete row coverage because rows[:20] covers the full result."
  },
  "evidence_access_summary": {
    "full_query_artifacts": [
      {
        "dataset_label": "submission_series",
        "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T12.json",
        "artifact_sha256": "d435b0c3a59ff82244bfb1e8e01bdff9e19b9f70552221f1541bb5245b8bde76",
        "row_count": 3,
        "readable": true
      },
      {
        "dataset_label": "punctuality_summary",
        "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T12.json",
        "artifact_sha256": "d435b0c3a59ff82244bfb1e8e01bdff9e19b9f70552221f1541bb5245b8bde76",
        "row_count": 1,
        "readable": true
      }
    ],
    "evidence_access_mode": "direct_embedding",
    "retrieval_log_path": null,
    "retrieval_coverage_status": "not_applicable",
    "full_access_available": true,
    "deterministic_scan_scope": "full_query_artifact_all_rows",
    "deterministic_scan_row_count_by_dataset": {
      "submission_series": 3,
      "punctuality_summary": 1
    }
  },
  "deterministic_derived_stat_evidence": null,
  "candidate_A": {
    "candidate_label": "A",
    "explanation": {
      "raw_text": "Summary: It looks like you're facing some challenges with submitting your assessments on time, which is impacting your scores. Your punctuality rate is currently at 0%, indicating that you haven't submitted any assessments yet.\n\nInsights: Lack of Submissions: You have not submitted any of your assessments, which suggests a pattern of procrastination. This is concerning as it directly affects your ability to earn marks. | Punctuality Rate: Your punctuality rate is 0%, indicating that you have not submitted any work on time. This could lead to missed opportunities for learning and improvement.\n\nEducational implications: Improving your submission habits can significantly enhance your learning experience and overall performance.\n\nRecommendations: high - Set specific deadlines for yourself to complete assessments before the due dates. - This can help you manage your time better and reduce the tendency to procrastinate. | medium - Reach out for support if you're struggling with the material or time management. - Getting help can provide you with strategies to stay on track and improve your engagement.",
      "structured_payload": {
        "task_id": "S-T12",
        "execution_id": "exec_1781847244391_4da9979a",
        "explanation": {
          "summary": "It looks like you're facing some challenges with submitting your assessments on time, which is impacting your scores. Your punctuality rate is currently at 0%, indicating that you haven't submitted any assessments yet.",
          "insights": [
            {
              "title": "Lack of Submissions",
              "description": "You have not submitted any of your assessments, which suggests a pattern of procrastination. This is concerning as it directly affects your ability to earn marks.",
              "severity": "high",
              "evidence": [
                {
                  "metric": "submission_day",
                  "value": "null",
                  "comparison": "baseline",
                  "delta": null,
                  "context": "No submissions made for any assessments."
                }
              ]
            },
            {
              "title": "Punctuality Rate",
              "description": "Your punctuality rate is 0%, indicating that you have not submitted any work on time. This could lead to missed opportunities for learning and improvement.",
              "severity": "high",
              "evidence": [
                {
                  "metric": "punctuality_rate",
                  "value": "0",
                  "comparison": "baseline",
                  "delta": null,
                  "context": "No submissions made on time."
                }
              ]
            }
          ],
          "educational_implications": [
            "Improving your submission habits can significantly enhance your learning experience and overall performance."
          ],
          "recommendations": [
            {
              "priority": "high",
              "action": "Set specific deadlines for yourself to complete assessments before the due dates.",
              "rationale": "This can help you manage your time better and reduce the tendency to procrastinate."
            },
            {
              "priority": "medium",
              "action": "Reach out for support if you're struggling with the material or time management.",
              "rationale": "Getting help can provide you with strategies to stay on track and improve your engagement."
            }
          ],
          "warnings": []
        },
        "confidence": {
          "level": "HIGH",
          "reason": "The data clearly shows no submissions and a punctuality rate of 0%, indicating a strong pattern of procrastination.",
          "based_on": [
            "sufficient_data"
          ]
        },
        "explanation_strategy": "behavioral",
        "explanation_type": "behavioral",
        "ai_summary_version": "v1",
        "baseline_available": true,
        "input_summary_type": "full_rows_due_to_small_result",
        "full_result_row_count": 4,
        "included_row_count": 4,
        "small_result_threshold": 20,
        "small_result_full_rows_applied": true,
        "dataset_row_breakdown": [
          {
            "dataset_name": "submission_series",
            "row_count": 3,
            "included_row_count": 3
          },
          {
            "dataset_name": "punctuality_summary",
            "row_count": 1,
            "included_row_count": 1
          }
        ],
        "safety_flags": [],
        "degraded": false,
        "meta": {
          "model": "gpt-4o-mini-2024-07-18",
          "latency_ms": 10195,
          "token_usage": {
            "prompt_tokens": 956,
            "completion_tokens": 467,
            "total_tokens": 1423
          },
          "strategy": "behavioral",
          "granularity": "per_assessment",
          "cost_usd": 0.000424
        }
      }
    },
    "generator_context_summary": {
      "full_result_row_count": 4,
      "included_row_count": 4,
      "small_result_threshold": 20,
      "small_result_full_rows_applied": true,
      "dataset_row_breakdown": [
        {
          "dataset_name": "submission_series",
          "row_count": 3,
          "included_row_count": 3
        },
        {
          "dataset_name": "punctuality_summary",
          "row_count": 1,
          "included_row_count": 1
        }
      ],
      "degraded": false
    }
  },
  "candidate_B": {
    "candidate_label": "B",
    "explanation": {
      "raw_text": "Summary: It appears that you have not submitted any assessments yet, which indicates a pattern of procrastination. This lack of submissions is concerning as it directly impacts your scores and overall engagement with the course.\n\nInsights: No Submissions Recorded: You have not submitted any of the assessments, which suggests a consistent pattern of procrastination. This is reflected in your punctuality rate of 0, indicating that you have not submitted on time or at all. | Impact on Scores: Your scores for the assessments you attempted are low, with a normalized score of 55 for both G2 and G3. This suggests that even when you do engage, the lack of timely submissions may hinder your performance.\n\nEducational implications: Timely submissions are crucial for maintaining good scores and understanding course material.\n\nRecommendations: high - Set specific deadlines for yourself to complete assessments before the due dates. - Creating personal deadlines can help you manage your time better and reduce procrastination. | medium - Engage with course materials regularly to build a routine. - Regular engagement can help you stay on track and improve your understanding, leading to better performance.",
      "structured_payload": {
        "task_id": "S-T12",
        "execution_id": "exec_1781847244391_4da9979a",
        "explanation": {
          "summary": "It appears that you have not submitted any assessments yet, which indicates a pattern of procrastination. This lack of submissions is concerning as it directly impacts your scores and overall engagement with the course.",
          "insights": [
            {
              "title": "No Submissions Recorded",
              "description": "You have not submitted any of the assessments, which suggests a consistent pattern of procrastination. This is reflected in your punctuality rate of 0, indicating that you have not submitted on time or at all.",
              "severity": "high",
              "evidence": [
                {
                  "metric": "punctuality_rate",
                  "value": "0",
                  "comparison": "baseline",
                  "delta": null,
                  "context": "No submissions made"
                }
              ]
            },
            {
              "title": "Impact on Scores",
              "description": "Your scores for the assessments you attempted are low, with a normalized score of 55 for both G2 and G3. This suggests that even when you do engage, the lack of timely submissions may hinder your performance.",
              "severity": "medium",
              "evidence": [
                {
                  "metric": "score_normalized",
                  "value": 55,
                  "comparison": "baseline",
                  "delta": null,
                  "context": "Scores for G2 and G3"
                }
              ]
            }
          ],
          "educational_implications": [
            "Timely submissions are crucial for maintaining good scores and understanding course material."
          ],
          "recommendations": [
            {
              "priority": "high",
              "action": "Set specific deadlines for yourself to complete assessments before the due dates.",
              "rationale": "Creating personal deadlines can help you manage your time better and reduce procrastination."
            },
            {
              "priority": "medium",
              "action": "Engage with course materials regularly to build a routine.",
              "rationale": "Regular engagement can help you stay on track and improve your understanding, leading to better performance."
            }
          ],
          "warnings": []
        },
        "confidence": {
          "level": "HIGH",
          "reason": "The data clearly shows no submissions and low scores, indicating a strong pattern of procrastination.",
          "based_on": [
            "sufficient_data"
          ]
        },
        "explanation_strategy": "behavioral",
        "explanation_type": "behavioral",
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
          "latency_ms": 16007,
          "token_usage": {
            "prompt_tokens": 743,
            "completion_tokens": 481,
            "total_tokens": 1224
          },
          "strategy": "behavioral",
          "granularity": "per_assessment",
          "cost_usd": 0.0004
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
