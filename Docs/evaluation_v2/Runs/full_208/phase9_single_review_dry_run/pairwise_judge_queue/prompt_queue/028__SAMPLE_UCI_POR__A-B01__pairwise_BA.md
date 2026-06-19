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
  "pairwise_record_id": "SAMPLE_UCI_POR__A-B01__pairwise_BA",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-B01",
  "order_variant": "BA",
  "dry_run_mode": "single_review",
  "task_context": {
    "task_name": "Overall performance distribution",
    "scope": "Cohort",
    "actionable_question": "How is the class performing overall?",
    "target_audience": "instructor, admin",
    "ai_summary_type": "numeric_distribution",
    "ai_prompt_hint": "Describe score spread. Flag if large proportion below pass threshold.",
    "query_labels": [
      "score_distribution"
    ],
    "explanation_strategy": "distribution"
  },
  "schema_context": {
    "source_tables": [
      "assessment_result",
      "assessment",
      "enrollment"
    ],
    "key_db_fields": [
      "score_normalized",
      "assessment_type"
    ],
    "output_schema": {
      "required_columns": [
        "score_bucket",
        "student_count"
      ],
      "optional_columns": [
        "pct_of_class",
        "dataset_source",
        "avg_score_in_bucket"
      ]
    },
    "query_labels": [
      "score_distribution"
    ]
  },
  "evaluation_requirements": {
    "required_core_outputs": [
      {
        "requirement_id": "A-B01-CORE-01",
        "description": "Describe score spread."
      },
      {
        "requirement_id": "A-B01-CORE-02",
        "description": "Flag if large proportion below pass threshold."
      }
    ],
    "required_supporting_outputs": [],
    "evaluation_constraints": [],
    "safety_fairness_applicability": "applicable",
    "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
  },
  "row_count_context": {
    "full_result_row_count": 10,
    "row_count_bucket": "<=20",
    "small_result_threshold": 20,
    "rule": "Both modes should be treated as having complete row coverage because rows[:20] covers the full result."
  },
  "evidence_access_summary": {
    "full_query_artifacts": [
      {
        "dataset_label": "score_distribution",
        "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-B01.json",
        "artifact_sha256": "c6f52e5d026054892d52e98d1e9d748ac2e6f00ffff32d6820c814970c855f80",
        "row_count": 10,
        "readable": true
      }
    ],
    "evidence_access_mode": "direct_embedding",
    "retrieval_log_path": null,
    "retrieval_coverage_status": "not_applicable",
    "full_access_available": true,
    "deterministic_scan_scope": "full_query_artifact_all_rows",
    "deterministic_scan_row_count_by_dataset": {
      "score_distribution": 10
    }
  },
  "deterministic_derived_stat_evidence": null,
  "candidate_A": {
    "candidate_label": "A",
    "explanation": {
      "raw_text": "Summary: The overall performance distribution indicates that a significant majority of students are clustered in the lower to mid-range score buckets, with a notable drop-off in the higher score ranges. The data reveals a concerning number of students scoring below the passing threshold, suggesting a need for targeted interventions.\n\nInsights: Concentration in Lower Score Buckets: A large proportion of students, specifically 108 students (16.6% of the class), fall within the 40-50 score bucket, indicating a concentration of performance in the lower mid-range. This suggests that many students are struggling to reach higher competency levels. | Significant Drop in Higher Score Buckets: There is a sharp decline in student count as scores increase, with only 7 students (1.1% of the class) achieving scores in the 90-100 range. This indicates a lack of high achievers and suggests that the majority of students are not reaching their full potential.\n\nEducational implications: The distribution suggests a need for differentiated instruction to support students struggling in lower score buckets.\n\nRecommendations: high - Implement targeted intervention programs for students in the 0-50 score range. - This action is necessary to address the significant number of students performing below the passing threshold and to improve overall class performance.",
      "structured_payload": {
        "task_id": "A-B01",
        "execution_id": "exec_1781847231655_3078f027",
        "explanation": {
          "summary": "The overall performance distribution indicates that a significant majority of students are clustered in the lower to mid-range score buckets, with a notable drop-off in the higher score ranges. The data reveals a concerning number of students scoring below the passing threshold, suggesting a need for targeted interventions.",
          "insights": [
            {
              "title": "Concentration in Lower Score Buckets",
              "description": "A large proportion of students, specifically 108 students (16.6% of the class), fall within the 40-50 score bucket, indicating a concentration of performance in the lower mid-range. This suggests that many students are struggling to reach higher competency levels.",
              "severity": "high",
              "evidence": [
                {
                  "metric": "student_count",
                  "value": 108,
                  "comparison": "baseline",
                  "delta": null,
                  "context": "40-50 score bucket"
                }
              ]
            },
            {
              "title": "Significant Drop in Higher Score Buckets",
              "description": "There is a sharp decline in student count as scores increase, with only 7 students (1.1% of the class) achieving scores in the 90-100 range. This indicates a lack of high achievers and suggests that the majority of students are not reaching their full potential.",
              "severity": "medium",
              "evidence": [
                {
                  "metric": "student_count",
                  "value": 7,
                  "comparison": "baseline",
                  "delta": null,
                  "context": "90-100 score bucket"
                }
              ]
            }
          ],
          "educational_implications": [
            "The distribution suggests a need for differentiated instruction to support students struggling in lower score buckets."
          ],
          "recommendations": [
            {
              "priority": "high",
              "action": "Implement targeted intervention programs for students in the 0-50 score range.",
              "rationale": "This action is necessary to address the significant number of students performing below the passing threshold and to improve overall class performance."
            }
          ],
          "warnings": []
        },
        "confidence": {
          "level": "HIGH",
          "reason": "The data is complete and accurately reflects the performance distribution of the cohort.",
          "based_on": [
            "sufficient_data"
          ]
        },
        "explanation_strategy": "distribution",
        "explanation_type": "distribution",
        "ai_summary_version": "v1",
        "baseline_available": true,
        "input_summary_type": "full_rows_due_to_small_result",
        "full_result_row_count": 10,
        "included_row_count": 10,
        "small_result_threshold": 20,
        "small_result_full_rows_applied": true,
        "dataset_row_breakdown": [
          {
            "dataset_name": "score_distribution",
            "row_count": 10,
            "included_row_count": 10
          }
        ],
        "safety_flags": [],
        "degraded": false,
        "meta": {
          "model": "gpt-4o-mini-2024-07-18",
          "latency_ms": 10369,
          "token_usage": {
            "prompt_tokens": 1092,
            "completion_tokens": 484,
            "total_tokens": 1576
          },
          "strategy": "distribution",
          "granularity": "per_assessment",
          "cost_usd": 0.000454
        }
      }
    },
    "generator_context_summary": {
      "full_result_row_count": 10,
      "included_row_count": 10,
      "small_result_threshold": 20,
      "small_result_full_rows_applied": true,
      "dataset_row_breakdown": [
        {
          "dataset_name": "score_distribution",
          "row_count": 10,
          "included_row_count": 10
        }
      ],
      "degraded": false
    }
  },
  "candidate_B": {
    "candidate_label": "B",
    "explanation": {
      "raw_text": "Summary: The overall performance distribution indicates that a significant majority of students are clustered in the lower to mid-range score buckets, with a notable drop-off in higher score ranges. The largest group of students, comprising 28.8% of the class, falls within the 50-60 score bucket, suggesting a need for targeted interventions to elevate overall performance.\n\nInsights: Concentration in Lower Score Buckets: A substantial 28.8% of students scored between 50-60, while 16.6% scored between 40-50, indicating a concentration of students in the lower performance tiers. | Limited High-Scoring Students: Only 1.1% of students scored in the 90-100 range, highlighting a significant gap in high achievers and suggesting that few students are reaching advanced competency levels.\n\nEducational implications: The distribution suggests a need for differentiated instruction to support students struggling in lower score buckets.\n\nRecommendations: high - Implement targeted interventions for students in the 40-60 score range. - This group represents a significant portion of the class and requires support to improve their understanding and performance.",
      "structured_payload": {
        "task_id": "A-B01",
        "execution_id": "exec_1781847231655_3078f027",
        "explanation": {
          "summary": "The overall performance distribution indicates that a significant majority of students are clustered in the lower to mid-range score buckets, with a notable drop-off in higher score ranges. The largest group of students, comprising 28.8% of the class, falls within the 50-60 score bucket, suggesting a need for targeted interventions to elevate overall performance.",
          "insights": [
            {
              "title": "Concentration in Lower Score Buckets",
              "description": "A substantial 28.8% of students scored between 50-60, while 16.6% scored between 40-50, indicating a concentration of students in the lower performance tiers.",
              "severity": "high",
              "evidence": [
                {
                  "metric": "pct_of_class",
                  "value": 28.8,
                  "comparison": "baseline",
                  "delta": null,
                  "context": "Percentage of students in the 50-60 score bucket"
                }
              ]
            },
            {
              "title": "Limited High-Scoring Students",
              "description": "Only 1.1% of students scored in the 90-100 range, highlighting a significant gap in high achievers and suggesting that few students are reaching advanced competency levels.",
              "severity": "medium",
              "evidence": [
                {
                  "metric": "pct_of_class",
                  "value": 1.1,
                  "comparison": "baseline",
                  "delta": null,
                  "context": "Percentage of students in the 90-100 score bucket"
                }
              ]
            }
          ],
          "educational_implications": [
            "The distribution suggests a need for differentiated instruction to support students struggling in lower score buckets."
          ],
          "recommendations": [
            {
              "priority": "high",
              "action": "Implement targeted interventions for students in the 40-60 score range.",
              "rationale": "This group represents a significant portion of the class and requires support to improve their understanding and performance."
            }
          ],
          "warnings": []
        },
        "confidence": {
          "level": "HIGH",
          "reason": "The dataset is complete and provides a clear overview of student performance distribution.",
          "based_on": [
            "sufficient_data"
          ]
        },
        "explanation_strategy": "distribution",
        "explanation_type": "distribution",
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
          "latency_ms": 7006,
          "token_usage": {
            "prompt_tokens": 941,
            "completion_tokens": 475,
            "total_tokens": 1416
          },
          "strategy": "distribution",
          "granularity": "per_assessment",
          "cost_usd": 0.000426
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
