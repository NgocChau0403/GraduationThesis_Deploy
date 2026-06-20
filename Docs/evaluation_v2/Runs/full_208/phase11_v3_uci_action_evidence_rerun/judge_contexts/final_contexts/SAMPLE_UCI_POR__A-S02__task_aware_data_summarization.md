# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-S02__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-S02",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Student score trend",
  "scope": "1 student",
  "actionable_question": "Is this student getting better or worse — and how fast?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Identify whether student is improving or declining. Reference performance_trend [FE] slope direction and magnitude.",
  "query_labels": [
    "score_trend"
  ],
  "explanation_strategy": "trend"
}
```

## Schema Context

```json
{
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
  "output_schema": {},
  "query_labels": [
    "score_trend"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-S02-CORE-01",
      "description": "Identify whether student is improving or declining."
    },
    {
      "requirement_id": "A-S02-CORE-02",
      "description": "Reference performance_trend [FE] slope direction and magnitude."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
}
```

## Deterministic Derived-Stat Evidence

```json
[]
```

## Deterministic Action Evidence

```json
{
  "applicable": false,
  "source_type": "not_applicable",
  "rule_set_id": null,
  "rule_version": null,
  "evaluation_status": "not_applicable",
  "supported_action_count": 0,
  "supported_actions": [],
  "rule_evaluations": [],
  "conflict_evaluations": []
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "score_trend",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S02.json",
      "artifact_sha256": "72108ee605062713875e9b51c1edab9174e1c8cfa4274c8b299942490cfb73ba",
      "row_count": 3,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 3,
  "prompt_embedded_row_count": 3,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "72108ee605062713875e9b51c1edab9174e1c8cfa4274c8b299942490cfb73ba",
  "evidence_rows_sha256": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9",
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
  "full_result_row_count": 3,
  "embedded_datasets_sha256": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9",
  "datasets": {
    "score_trend": [
      {
        "assessment_order": 1,
        "week_of_class": 3,
        "assessment_type": "quiz",
        "assessment_name": "G1",
        "score_normalized": 0,
        "pass_flag": false,
        "class_avg_score": 57,
        "score_vs_class_avg": -57,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": true,
        "below_target_threshold": true,
        "performance_trend": 27.5,
        "support_level": "urgent_support",
        "recommended_action": "Review this assessment with tutor support; focus on missed core concepts before the next assessment."
      },
      {
        "assessment_order": 2,
        "week_of_class": 8,
        "assessment_type": "quiz",
        "assessment_name": "G2",
        "score_normalized": 55,
        "pass_flag": true,
        "class_avg_score": 57.85,
        "score_vs_class_avg": -2.85,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": false,
        "below_target_threshold": true,
        "performance_trend": 27.5,
        "support_level": "targeted_practice",
        "recommended_action": "Practice similar questions and review feedback to move from pass-level to target-level performance."
      },
      {
        "assessment_order": 3,
        "week_of_class": 14,
        "assessment_type": "exam",
        "assessment_name": "G3",
        "score_normalized": 55,
        "pass_flag": true,
        "class_avg_score": 59.53,
        "score_vs_class_avg": -4.53,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": false,
        "below_target_threshold": true,
        "performance_trend": 27.5,
        "support_level": "targeted_practice",
        "recommended_action": "Practice similar questions and review feedback to move from pass-level to target-level performance."
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S02__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "567f65b1dafbcea25087dde770404bd4f6a0f4df567b8aee19adb232bd5f23fd",
  "generator_input_sha256": "f4b4e29d0d2efa47d0e07ee34a5e9f350702595b6abf912c9646df170969040e",
  "generator_input_compact": {
    "task_id": "A-S02",
    "execution_id": "exec_1781847237997_d66cf4ec",
    "task_name": "Student score trend",
    "analysis_type": "trend",
    "explanation_strategy": "trend",
    "actionable_question": "Is this student getting better or worse — and how fast?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "score_trend"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "score_trend"
    ],
    "dataset_row_counts": {
      "score_trend": 3
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "score_normalized",
      "entity_column": null,
      "group_column": null,
      "time_column": "assessment_order",
      "sort_by": null,
      "sort_direction": "asc",
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
  "raw_text": "Summary: The student's performance shows a stable trend with no significant improvement or decline across the three assessments. The normalized scores indicate a consistent struggle to meet target thresholds.\n\nInsights: Stable Performance Across Assessments: The student's normalized scores remained at 0 in Assessment 1, increased to 55 in Assessments 2 and 3, indicating no improvement in performance despite passing both later assessments. | Consistent Below-Target Performance: The student scored below the target threshold of 70 in all assessments, with scores of 0, 55, and 55, indicating a need for targeted practice to reach desired performance levels.\n\nEducational implications: The student requires urgent support to address foundational concepts, as evidenced by the initial score of 0, and should engage in targeted practice to improve performance.\n\nRecommendations: high - Implement a structured review plan focusing on core concepts and practice questions. - This will help the student build confidence and improve understanding, aiming to elevate scores above the target threshold.",
  "structured_payload": {
    "task_id": "A-S02",
    "execution_id": "exec_1781847237997_d66cf4ec",
    "explanation": {
      "summary": "The student's performance shows a stable trend with no significant improvement or decline across the three assessments. The normalized scores indicate a consistent struggle to meet target thresholds.",
      "insights": [
        {
          "title": "Stable Performance Across Assessments",
          "description": "The student's normalized scores remained at 0 in Assessment 1, increased to 55 in Assessments 2 and 3, indicating no improvement in performance despite passing both later assessments.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Assessment 1"
            },
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "up_from_previous",
              "delta": 55,
              "context": "Assessment 2 and 3"
            }
          ]
        },
        {
          "title": "Consistent Below-Target Performance",
          "description": "The student scored below the target threshold of 70 in all assessments, with scores of 0, 55, and 55, indicating a need for targeted practice to reach desired performance levels.",
          "severity": "high",
          "evidence": [
            {
              "metric": "below_target_threshold",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "All assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "The student requires urgent support to address foundational concepts, as evidenced by the initial score of 0, and should engage in targeted practice to improve performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a structured review plan focusing on core concepts and practice questions.",
          "rationale": "This will help the student build confidence and improve understanding, aiming to elevate scores above the target threshold."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is strong with a large sample size and no summarization warnings.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
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
      "latency_ms": 7284,
      "token_usage": {
        "prompt_tokens": 1471,
        "completion_tokens": 475,
        "total_tokens": 1946
      },
      "strategy": "trend",
      "granularity": "per_assessment",
      "cost_usd": 0.000506
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S02__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "567f65b1dafbcea25087dde770404bd4f6a0f4df567b8aee19adb232bd5f23fd",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1471,
      "completion_tokens": 475,
      "total_tokens": 1946
    },
    "latency_ms": 7318,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S02",
    "execution_id": "exec_1781847237997_d66cf4ec",
    "explanation": {
      "summary": "The student's performance shows a stable trend with no significant improvement or decline across the three assessments. The normalized scores indicate a consistent struggle to meet target thresholds.",
      "insights": [
        {
          "title": "Stable Performance Across Assessments",
          "description": "The student's normalized scores remained at 0 in Assessment 1, increased to 55 in Assessments 2 and 3, indicating no improvement in performance despite passing both later assessments.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Assessment 1"
            },
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "up_from_previous",
              "delta": 55,
              "context": "Assessment 2 and 3"
            }
          ]
        },
        {
          "title": "Consistent Below-Target Performance",
          "description": "The student scored below the target threshold of 70 in all assessments, with scores of 0, 55, and 55, indicating a need for targeted practice to reach desired performance levels.",
          "severity": "high",
          "evidence": [
            {
              "metric": "below_target_threshold",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "All assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "The student requires urgent support to address foundational concepts, as evidenced by the initial score of 0, and should engage in targeted practice to improve performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a structured review plan focusing on core concepts and practice questions.",
          "rationale": "This will help the student build confidence and improve understanding, aiming to elevate scores above the target threshold."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is strong with a large sample size and no summarization warnings.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
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
      "latency_ms": 7284,
      "token_usage": {
        "prompt_tokens": 1471,
        "completion_tokens": 475,
        "total_tokens": 1946
      },
      "strategy": "trend",
      "granularity": "per_assessment",
      "cost_usd": 0.000506
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
    "expected": 3,
    "observed": 3
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "72108ee605062713875e9b51c1edab9174e1c8cfa4274c8b299942490cfb73ba",
    "expected_values": [
      "72108ee605062713875e9b51c1edab9174e1c8cfa4274c8b299942490cfb73ba"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9",
    "expected": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9"
  },
  {
    "check_id": "numeric_fields_score_trend",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "score_trend",
    "numeric_columns": [
      "assessment_order",
      "class_avg_score",
      "pass_threshold",
      "performance_trend",
      "score_normalized",
      "score_scale",
      "score_vs_class_avg",
      "target_threshold",
      "week_of_class"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 3,
        "min": 1,
        "max": 3
      },
      "class_avg_score": {
        "count": 3,
        "min": 57,
        "max": 59.53
      },
      "pass_threshold": {
        "count": 3,
        "min": 40,
        "max": 40
      },
      "performance_trend": {
        "count": 3,
        "min": 27.5,
        "max": 27.5
      },
      "score_normalized": {
        "count": 3,
        "min": 0,
        "max": 55
      },
      "score_scale": {
        "count": 3,
        "min": 100,
        "max": 100
      },
      "score_vs_class_avg": {
        "count": 3,
        "min": -57,
        "max": -2.85
      },
      "target_threshold": {
        "count": 3,
        "min": 70,
        "max": 70
      },
      "week_of_class": {
        "count": 3,
        "min": 3,
        "max": 14
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_score_trend",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "score_trend",
    "flag_columns": [
      "pass_flag",
      "pass_threshold",
      "target_threshold",
      "below_pass_threshold",
      "below_target_threshold"
    ],
    "triggered_like_counts": {
      "pass_flag": 2,
      "pass_threshold": 0,
      "target_threshold": 0,
      "below_pass_threshold": 1,
      "below_target_threshold": 3
    }
  }
]
```
