# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T07__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T07__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T07",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
}
```

## Task Context

```json
{
  "task_name": "Absence / inactivity impact",
  "scope": "1 student",
  "actionable_question": "How much are my absences hurting my grades?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Use absence_rate [FE] to show proportion of missed sessions. Correlate with avg_score [FE].",
  "query_labels": [
    "absence_data",
    "score_series"
  ],
  "explanation_strategy": "correlation"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "assessment_result",
    "assessment"
  ],
  "key_db_fields": [
    "absences [enrollment",
    "UCI only]; score_normalized",
    "pass_flag [assessment_result]"
  ],
  "output_schema": {
    "required_columns": [
      "assessment_order",
      "score_normalized"
    ],
    "optional_columns": [
      "week_of_class",
      "pass_flag",
      "absences",
      "absence_rate"
    ]
  },
  "query_labels": [
    "absence_data",
    "score_series"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T07-CORE-01",
      "description": "State the proportion of missed sessions."
    },
    {
      "requirement_id": "S-T07-CORE-02",
      "description": "Describe the observed association between absence rate and average score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T07-CONSTRAINT-01",
      "description": "Use absence_rate as the primary absence metric."
    },
    {
      "constraint_id": "S-T07-CONSTRAINT-02",
      "description": "Frame the absence-score relationship as correlational, not causal."
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

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "absence_data",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T07.json",
      "artifact_sha256": "b65c8e0cc5e17ffc245ee241aadadd191d62ce0e4088f4a501856b9f527298ac",
      "row_count": 1,
      "readable": true
    },
    {
      "dataset_label": "score_series",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T07.json",
      "artifact_sha256": "b65c8e0cc5e17ffc245ee241aadadd191d62ce0e4088f4a501856b9f527298ac",
      "row_count": 3,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 4,
  "prompt_embedded_row_count": 4,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "b65c8e0cc5e17ffc245ee241aadadd191d62ce0e4088f4a501856b9f527298ac",
  "evidence_rows_sha256": "8c019c1f11810141fa63188bbe86b1eb24ba42b4e0e8d64b7abcede3fd38ce55",
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
  "full_result_row_count": 4,
  "embedded_datasets_sha256": "8c019c1f11810141fa63188bbe86b1eb24ba42b4e0e8d64b7abcede3fd38ce55",
  "datasets": {
    "absence_data": [
      {
        "absences": 4,
        "absence_rate": "0.125"
      }
    ],
    "score_series": [
      {
        "assessment_order": 1,
        "week_of_class": 3,
        "score_normalized": 0,
        "pass_flag": false
      },
      {
        "assessment_order": 2,
        "week_of_class": 8,
        "score_normalized": 55,
        "pass_flag": true
      },
      {
        "assessment_order": 3,
        "week_of_class": 14,
        "score_normalized": 55,
        "pass_flag": true
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T07__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "b5bad5a9c1137173e64d4efff891a09570ec13cf4ecd0ded98d77752a7d4935b",
  "generator_input_sha256": "60d40c7dfbf2253e672dbbaaa2634ac5e3253fb516c6cd9b23fae26320007d73",
  "generator_input_compact": {
    "task_id": "S-T07",
    "execution_id": "exec_1781847244182_1060d784",
    "task_name": "Absence / inactivity impact",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "How much are my absences hurting my grades?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "absence_data",
      "score_series"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "absence_data",
      "score_series"
    ],
    "dataset_row_counts": {
      "absence_data": 1,
      "score_series": 3
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "score_normalized",
      "entity_column": null,
      "group_column": null,
      "time_column": "assessment_order",
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
  "raw_text": "Summary: There is a noticeable pattern between your assessment order and normalized scores. As you progress through the assessments, your scores show improvement, but the initial absence may have impacted your early performance.\n\nInsights: Initial Struggles: Your first assessment resulted in a score of 0, which indicates a strong negative impact from absences at that stage. This suggests that missing classes early on may have hindered your understanding of the material. | Improvement in Scores: In the subsequent assessments, your scores improved to 55, indicating a positive trend. This suggests that as you attended more classes, your understanding and performance improved.\n\nEducational implications: Regular attendance is crucial for understanding course material and performing well in assessments.\n\nRecommendations: high - Focus on attending all classes moving forward. - Consistent attendance will help reinforce your learning and improve your scores in future assessments.",
  "structured_payload": {
    "task_id": "S-T07",
    "execution_id": "exec_1781847244182_1060d784",
    "explanation": {
      "summary": "There is a noticeable pattern between your assessment order and normalized scores. As you progress through the assessments, your scores show improvement, but the initial absence may have impacted your early performance.",
      "insights": [
        {
          "title": "Initial Struggles",
          "description": "Your first assessment resulted in a score of 0, which indicates a strong negative impact from absences at that stage. This suggests that missing classes early on may have hindered your understanding of the material.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "First assessment score"
            }
          ]
        },
        {
          "title": "Improvement in Scores",
          "description": "In the subsequent assessments, your scores improved to 55, indicating a positive trend. This suggests that as you attended more classes, your understanding and performance improved.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "up_from_previous",
              "delta": 55,
              "context": "Second and third assessment scores"
            }
          ]
        }
      ],
      "educational_implications": [
        "Regular attendance is crucial for understanding course material and performing well in assessments."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Focus on attending all classes moving forward.",
          "rationale": "Consistent attendance will help reinforce your learning and improve your scores in future assessments."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows clear patterns in assessment scores and attendance, providing a reliable basis for these insights.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "absence_data",
        "row_count": 1,
        "included_row_count": 1
      },
      {
        "dataset_name": "score_series",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8159,
      "token_usage": {
        "prompt_tokens": 887,
        "completion_tokens": 409,
        "total_tokens": 1296
      },
      "strategy": "correlation",
      "granularity": "per_assessment",
      "cost_usd": 0.000378
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T07__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "b5bad5a9c1137173e64d4efff891a09570ec13cf4ecd0ded98d77752a7d4935b",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 887,
      "completion_tokens": 409,
      "total_tokens": 1296
    },
    "latency_ms": 8171,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T07",
    "execution_id": "exec_1781847244182_1060d784",
    "explanation": {
      "summary": "There is a noticeable pattern between your assessment order and normalized scores. As you progress through the assessments, your scores show improvement, but the initial absence may have impacted your early performance.",
      "insights": [
        {
          "title": "Initial Struggles",
          "description": "Your first assessment resulted in a score of 0, which indicates a strong negative impact from absences at that stage. This suggests that missing classes early on may have hindered your understanding of the material.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "First assessment score"
            }
          ]
        },
        {
          "title": "Improvement in Scores",
          "description": "In the subsequent assessments, your scores improved to 55, indicating a positive trend. This suggests that as you attended more classes, your understanding and performance improved.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "up_from_previous",
              "delta": 55,
              "context": "Second and third assessment scores"
            }
          ]
        }
      ],
      "educational_implications": [
        "Regular attendance is crucial for understanding course material and performing well in assessments."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Focus on attending all classes moving forward.",
          "rationale": "Consistent attendance will help reinforce your learning and improve your scores in future assessments."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows clear patterns in assessment scores and attendance, providing a reliable basis for these insights.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "absence_data",
        "row_count": 1,
        "included_row_count": 1
      },
      {
        "dataset_name": "score_series",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8159,
      "token_usage": {
        "prompt_tokens": 887,
        "completion_tokens": 409,
        "total_tokens": 1296
      },
      "strategy": "correlation",
      "granularity": "per_assessment",
      "cost_usd": 0.000378
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
    "expected": 4,
    "observed": 4
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "b65c8e0cc5e17ffc245ee241aadadd191d62ce0e4088f4a501856b9f527298ac",
    "expected_values": [
      "b65c8e0cc5e17ffc245ee241aadadd191d62ce0e4088f4a501856b9f527298ac",
      "b65c8e0cc5e17ffc245ee241aadadd191d62ce0e4088f4a501856b9f527298ac"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "8c019c1f11810141fa63188bbe86b1eb24ba42b4e0e8d64b7abcede3fd38ce55",
    "expected": "8c019c1f11810141fa63188bbe86b1eb24ba42b4e0e8d64b7abcede3fd38ce55"
  },
  {
    "check_id": "numeric_fields_absence_data",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "absence_data",
    "numeric_columns": [
      "absences"
    ],
    "numeric_summaries": {
      "absences": {
        "count": 1,
        "min": 4,
        "max": 4
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_absence_data",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "absence_data",
    "flag_columns": [],
    "triggered_like_counts": {}
  },
  {
    "check_id": "numeric_fields_score_series",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "score_series",
    "numeric_columns": [
      "assessment_order",
      "score_normalized",
      "week_of_class"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 3,
        "min": 1,
        "max": 3
      },
      "score_normalized": {
        "count": 3,
        "min": 0,
        "max": 55
      },
      "week_of_class": {
        "count": 3,
        "min": 3,
        "max": 14
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_score_series",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "score_series",
    "flag_columns": [
      "pass_flag"
    ],
    "triggered_like_counts": {
      "pass_flag": 2
    }
  }
]
```
