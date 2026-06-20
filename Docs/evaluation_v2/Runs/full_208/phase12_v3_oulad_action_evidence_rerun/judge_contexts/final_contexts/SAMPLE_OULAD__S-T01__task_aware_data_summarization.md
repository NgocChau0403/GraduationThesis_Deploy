# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T01__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T01",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
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
}
```

## Evaluation Requirements

```json
{
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T01.json",
      "artifact_sha256": "2b9890971f14879405dd2a9f346df29e6bca6e4545211d9344f756fd2d4450cc",
      "row_count": 5,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 5,
  "prompt_embedded_row_count": 5,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "2b9890971f14879405dd2a9f346df29e6bca6e4545211d9344f756fd2d4450cc",
  "evidence_rows_sha256": "d6f9c06ecea6f9dd21f6455dbb809b647dbebe91fb05405f9684ab0eb66c7420",
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
  "full_result_row_count": 5,
  "embedded_datasets_sha256": "d6f9c06ecea6f9dd21f6455dbb809b647dbebe91fb05405f9684ab0eb66c7420",
  "datasets": {
    "score_trend": [
      {
        "assessment_order": 1,
        "week_of_class": 3,
        "assessment_type": "CMA",
        "assessment_name": "24295",
        "score_normalized": 100,
        "pass_flag": true,
        "class_avg_score": 74.75,
        "score_vs_class_avg": 25.25,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": false,
        "below_target_threshold": false,
        "performance_trend": -0.7187500000000001,
        "support_level": "maintain",
        "recommended_action": "Keep the current preparation pattern and use feedback to protect this level."
      },
      {
        "assessment_order": 3,
        "week_of_class": 10,
        "assessment_type": "CMA",
        "assessment_name": "24296",
        "score_normalized": 87,
        "pass_flag": true,
        "class_avg_score": 78.94,
        "score_vs_class_avg": 8.06,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": false,
        "below_target_threshold": false,
        "performance_trend": -0.7187500000000001,
        "support_level": "maintain",
        "recommended_action": "Keep the current preparation pattern and use feedback to protect this level."
      },
      {
        "assessment_order": 5,
        "week_of_class": 21,
        "assessment_type": "CMA",
        "assessment_name": "24297",
        "score_normalized": 90,
        "pass_flag": true,
        "class_avg_score": 75.15,
        "score_vs_class_avg": 14.85,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": false,
        "below_target_threshold": false,
        "performance_trend": -0.7187500000000001,
        "support_level": "maintain",
        "recommended_action": "Keep the current preparation pattern and use feedback to protect this level."
      },
      {
        "assessment_order": 8,
        "week_of_class": 31,
        "assessment_type": "CMA",
        "assessment_name": "24298",
        "score_normalized": 83,
        "pass_flag": true,
        "class_avg_score": 73.09,
        "score_vs_class_avg": 9.91,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": false,
        "below_target_threshold": false,
        "performance_trend": -0.7187500000000001,
        "support_level": "maintain",
        "recommended_action": "Keep the current preparation pattern and use feedback to protect this level."
      },
      {
        "assessment_order": 9,
        "week_of_class": null,
        "assessment_type": "Exam",
        "assessment_name": "24299",
        "score_normalized": 96,
        "pass_flag": true,
        "class_avg_score": 68.23,
        "score_vs_class_avg": 27.77,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": false,
        "below_target_threshold": false,
        "performance_trend": -0.7187500000000001,
        "support_level": "maintain",
        "recommended_action": "Keep the current preparation pattern and use feedback to protect this level."
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T01__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "ddee8c56f1df8540f5f9769b448938a524c1181655362b272b057edcada1d9f5",
  "generator_input_sha256": "adfc68b3543fa71f27aaa94eb1d23dd105176683735855a308fe9d1aa6a2dde9",
  "generator_input_compact": {
    "task_id": "S-T01",
    "execution_id": "exec_1781847881037_601caebc",
    "task_name": "Score trend analysis",
    "analysis_type": "trend",
    "explanation_strategy": "trend",
    "actionable_question": "Am I getting better or worse over time?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "score_trend"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "score_trend"
    ],
    "dataset_row_counts": {
      "score_trend": 5
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
  "raw_text": "Summary: Your performance shows a generally stable trend with a slight decline in scores over time. While you have consistently scored above the passing and target thresholds, there are fluctuations in your scores that suggest areas for improvement.\n\nInsights: Overall Performance Trend: Your scores have remained relatively high, with the highest score being 100 in Assessment 1 and the lowest score being 83 in Assessment 8. This indicates a strong performance overall, but a slight decline is noted in the later assessments. | Notable Turning Points: The most significant drop occurred from Assessment 5 (90) to Assessment 8 (83), indicating a decline of 7 points. This suggests a need to reassess your preparation strategies leading up to Assessment 8.\n\nEducational implications: Your consistent performance above the passing threshold indicates a solid understanding of the material, but the decline in scores suggests that you may need to adjust your study habits or seek additional support.\n\nRecommendations: high - Reevaluate your study strategies and focus on areas where your scores have dipped. - This will help you maintain your strong performance and address any weaknesses before the next assessment.",
  "structured_payload": {
    "task_id": "S-T01",
    "execution_id": "exec_1781847881037_601caebc",
    "explanation": {
      "summary": "Your performance shows a generally stable trend with a slight decline in scores over time. While you have consistently scored above the passing and target thresholds, there are fluctuations in your scores that suggest areas for improvement.",
      "insights": [
        {
          "title": "Overall Performance Trend",
          "description": "Your scores have remained relatively high, with the highest score being 100 in Assessment 1 and the lowest score being 83 in Assessment 8. This indicates a strong performance overall, but a slight decline is noted in the later assessments.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 100,
              "comparison": "peak",
              "delta": null,
              "context": "Highest score in Assessment 1"
            },
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "trough",
              "delta": -17,
              "context": "Lowest score in Assessment 8"
            }
          ]
        },
        {
          "title": "Notable Turning Points",
          "description": "The most significant drop occurred from Assessment 5 (90) to Assessment 8 (83), indicating a decline of 7 points. This suggests a need to reassess your preparation strategies leading up to Assessment 8.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 90,
              "comparison": "down_from_previous",
              "delta": -7,
              "context": "Drop from Assessment 5 to Assessment 8"
            }
          ]
        }
      ],
      "educational_implications": [
        "Your consistent performance above the passing threshold indicates a solid understanding of the material, but the decline in scores suggests that you may need to adjust your study habits or seek additional support."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Reevaluate your study strategies and focus on areas where your scores have dipped.",
          "rationale": "This will help you maintain your strong performance and address any weaknesses before the next assessment."
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
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 5,
    "included_row_count": 5,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "score_trend",
        "row_count": 5,
        "included_row_count": 5
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6833,
      "token_usage": {
        "prompt_tokens": 1807,
        "completion_tokens": 513,
        "total_tokens": 2320
      },
      "strategy": "trend",
      "granularity": "per_assessment",
      "cost_usd": 0.000579
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T01__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "ddee8c56f1df8540f5f9769b448938a524c1181655362b272b057edcada1d9f5",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1807,
      "completion_tokens": 513,
      "total_tokens": 2320
    },
    "latency_ms": 6838,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T01",
    "execution_id": "exec_1781847881037_601caebc",
    "explanation": {
      "summary": "Your performance shows a generally stable trend with a slight decline in scores over time. While you have consistently scored above the passing and target thresholds, there are fluctuations in your scores that suggest areas for improvement.",
      "insights": [
        {
          "title": "Overall Performance Trend",
          "description": "Your scores have remained relatively high, with the highest score being 100 in Assessment 1 and the lowest score being 83 in Assessment 8. This indicates a strong performance overall, but a slight decline is noted in the later assessments.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 100,
              "comparison": "peak",
              "delta": null,
              "context": "Highest score in Assessment 1"
            },
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "trough",
              "delta": -17,
              "context": "Lowest score in Assessment 8"
            }
          ]
        },
        {
          "title": "Notable Turning Points",
          "description": "The most significant drop occurred from Assessment 5 (90) to Assessment 8 (83), indicating a decline of 7 points. This suggests a need to reassess your preparation strategies leading up to Assessment 8.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 90,
              "comparison": "down_from_previous",
              "delta": -7,
              "context": "Drop from Assessment 5 to Assessment 8"
            }
          ]
        }
      ],
      "educational_implications": [
        "Your consistent performance above the passing threshold indicates a solid understanding of the material, but the decline in scores suggests that you may need to adjust your study habits or seek additional support."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Reevaluate your study strategies and focus on areas where your scores have dipped.",
          "rationale": "This will help you maintain your strong performance and address any weaknesses before the next assessment."
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
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 5,
    "included_row_count": 5,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "score_trend",
        "row_count": 5,
        "included_row_count": 5
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6833,
      "token_usage": {
        "prompt_tokens": 1807,
        "completion_tokens": 513,
        "total_tokens": 2320
      },
      "strategy": "trend",
      "granularity": "per_assessment",
      "cost_usd": 0.000579
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
    "expected": 5,
    "observed": 5
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "2b9890971f14879405dd2a9f346df29e6bca6e4545211d9344f756fd2d4450cc",
    "expected_values": [
      "2b9890971f14879405dd2a9f346df29e6bca6e4545211d9344f756fd2d4450cc"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "d6f9c06ecea6f9dd21f6455dbb809b647dbebe91fb05405f9684ab0eb66c7420",
    "expected": "d6f9c06ecea6f9dd21f6455dbb809b647dbebe91fb05405f9684ab0eb66c7420"
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
        "count": 5,
        "min": 1,
        "max": 9
      },
      "class_avg_score": {
        "count": 5,
        "min": 68.23,
        "max": 78.94
      },
      "pass_threshold": {
        "count": 5,
        "min": 40,
        "max": 40
      },
      "performance_trend": {
        "count": 5,
        "min": -0.7187500000000001,
        "max": -0.7187500000000001
      },
      "score_normalized": {
        "count": 5,
        "min": 83,
        "max": 100
      },
      "score_scale": {
        "count": 5,
        "min": 100,
        "max": 100
      },
      "score_vs_class_avg": {
        "count": 5,
        "min": 8.06,
        "max": 27.77
      },
      "target_threshold": {
        "count": 5,
        "min": 70,
        "max": 70
      },
      "week_of_class": {
        "count": 4,
        "min": 3,
        "max": 31
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
      "pass_flag": 5,
      "pass_threshold": 0,
      "target_threshold": 0,
      "below_pass_threshold": 0,
      "below_target_threshold": 0
    }
  }
]
```
