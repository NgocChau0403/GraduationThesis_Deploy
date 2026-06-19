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
  "pairwise_record_id": "SAMPLE_UCI_POR__A-G14__pairwise_BA",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G14",
  "order_variant": "BA",
  "dry_run_mode": "single_review",
  "task_context": {
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
  },
  "schema_context": {
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
  },
  "evaluation_requirements": {
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
  },
  "row_count_context": {
    "full_result_row_count": 0,
    "row_count_bucket": "<=20",
    "small_result_threshold": 20,
    "rule": "Both modes should be treated as having complete row coverage because rows[:20] covers the full result."
  },
  "evidence_access_summary": {
    "full_query_artifacts": [
      {
        "dataset_label": "withdrawal_signal_trend",
        "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G14.json",
        "artifact_sha256": "b1188e446b1e049911821e083dd6043b18f9c9fb38c6a193251269529f21fe3f",
        "row_count": 0,
        "readable": true
      }
    ],
    "evidence_access_mode": "direct_embedding",
    "retrieval_log_path": null,
    "retrieval_coverage_status": "not_applicable",
    "full_access_available": true,
    "deterministic_scan_scope": "full_query_artifact_all_rows",
    "deterministic_scan_row_count_by_dataset": {
      "withdrawal_signal_trend": 0
    }
  },
  "deterministic_derived_stat_evidence": null,
  "candidate_A": {
    "candidate_label": "A",
    "explanation": {
      "raw_text": "Summary: The analysis reveals a complete absence of engagement data, indicating no measurable trends or patterns regarding early withdrawal signals. This lack of data limits the ability to identify any changes in student engagement or potential dropout risks.\n\nEducational implications: The absence of engagement data suggests a need for improved tracking mechanisms to identify at-risk students early.\n\nRecommendations: high - Implement a robust engagement tracking system. - To effectively monitor student engagement and identify early withdrawal signals, a reliable data collection system is essential.\n\nWarnings: Data quality signal is LOW; no positive engagement activity found, indicating a lack of data to analyze.",
      "structured_payload": {
        "task_id": "A-G14",
        "execution_id": "exec_1781847232818_178a9b0b",
        "explanation": {
          "summary": "The analysis reveals a complete absence of engagement data, indicating no measurable trends or patterns regarding early withdrawal signals. This lack of data limits the ability to identify any changes in student engagement or potential dropout risks.",
          "insights": [],
          "educational_implications": [
            "The absence of engagement data suggests a need for improved tracking mechanisms to identify at-risk students early."
          ],
          "recommendations": [
            {
              "priority": "high",
              "action": "Implement a robust engagement tracking system.",
              "rationale": "To effectively monitor student engagement and identify early withdrawal signals, a reliable data collection system is essential."
            }
          ],
          "warnings": [
            "Data quality signal is LOW; no positive engagement activity found, indicating a lack of data to analyze."
          ]
        },
        "confidence": {
          "level": "LOW",
          "reason": "The dataset contains no rows, leading to an inability to assess trends or patterns.",
          "based_on": [
            "sparse_data",
            "limited_temporal_range"
          ]
        },
        "explanation_strategy": "trend",
        "explanation_type": "trend",
        "ai_summary_version": "v1",
        "baseline_available": true,
        "input_summary_type": "full_rows_due_to_small_result",
        "full_result_row_count": 0,
        "included_row_count": 0,
        "small_result_threshold": 20,
        "small_result_full_rows_applied": true,
        "dataset_row_breakdown": [
          {
            "dataset_name": "withdrawal_signal_trend",
            "row_count": 0,
            "included_row_count": 0
          }
        ],
        "safety_flags": [],
        "degraded": false,
        "meta": {
          "model": "gpt-4o-mini-2024-07-18",
          "latency_ms": 2959,
          "token_usage": {
            "prompt_tokens": 990,
            "completion_tokens": 209,
            "total_tokens": 1199
          },
          "strategy": "trend",
          "granularity": "weekly",
          "cost_usd": 0.000274
        }
      }
    },
    "generator_context_summary": {
      "full_result_row_count": 0,
      "included_row_count": 0,
      "small_result_threshold": 20,
      "small_result_full_rows_applied": true,
      "dataset_row_breakdown": [
        {
          "dataset_name": "withdrawal_signal_trend",
          "row_count": 0,
          "included_row_count": 0
        }
      ],
      "degraded": false
    }
  },
  "candidate_B": {
    "candidate_label": "B",
    "explanation": {
      "raw_text": "Summary: The analysis reveals a complete absence of engagement data, indicating a lack of measurable student activity. Consequently, no trends, turning points, or values can be identified, which limits the ability to detect early withdrawal signals.\n\nEducational implications: The absence of engagement data suggests that monitoring systems may need to be enhanced to capture student activity more effectively.\n\nRecommendations: high - Implement a more robust engagement tracking system. - To identify early withdrawal signals, it is crucial to have reliable engagement metrics that can indicate when students are at risk of dropping out.\n\nWarnings: Data quality signal is LOW; no positive engagement activity found (0 engagement rows).",
      "structured_payload": {
        "task_id": "A-G14",
        "execution_id": "exec_1781847232818_178a9b0b",
        "explanation": {
          "summary": "The analysis reveals a complete absence of engagement data, indicating a lack of measurable student activity. Consequently, no trends, turning points, or values can be identified, which limits the ability to detect early withdrawal signals.",
          "insights": [],
          "educational_implications": [
            "The absence of engagement data suggests that monitoring systems may need to be enhanced to capture student activity more effectively."
          ],
          "recommendations": [
            {
              "priority": "high",
              "action": "Implement a more robust engagement tracking system.",
              "rationale": "To identify early withdrawal signals, it is crucial to have reliable engagement metrics that can indicate when students are at risk of dropping out."
            }
          ],
          "warnings": [
            "Data quality signal is LOW; no positive engagement activity found (0 engagement rows)."
          ]
        },
        "confidence": {
          "level": "LOW",
          "reason": "The analysis is based on an empty dataset, which does not provide any actionable insights.",
          "based_on": [
            "sparse_data",
            "limited_temporal_range"
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
          "latency_ms": 3667,
          "token_usage": {
            "prompt_tokens": 836,
            "completion_tokens": 222,
            "total_tokens": 1058
          },
          "strategy": "trend",
          "granularity": "weekly",
          "cost_usd": 0.000259
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
