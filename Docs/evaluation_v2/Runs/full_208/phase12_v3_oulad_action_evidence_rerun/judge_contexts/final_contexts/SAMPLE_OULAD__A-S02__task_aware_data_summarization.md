# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-S02__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-S02.json",
      "artifact_sha256": "dbf7108bb59f12a9a5326678e4dc96554310ebe85eb5a5afca61892942966973",
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
  "evidence_artifact_file_sha256": "dbf7108bb59f12a9a5326678e4dc96554310ebe85eb5a5afca61892942966973",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S02__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "64cd50b4e174a0f5eb92a8dff4b1f17eabd30cd2ef2aac61149a1d380e40663d",
  "generator_input_sha256": "03cb09db7106693a50a1796f5d9e728a14d4d9df4171d97e68b22cb369e48d7f",
  "generator_input_compact": {
    "task_id": "A-S02",
    "execution_id": "exec_1781847829256_78db031d",
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
  "raw_text": "Summary: The student's performance shows a generally stable trend with slight fluctuations across assessments, indicating a consistent level of achievement. The normalized scores range from a high of 100 in Assessment 1 to a low of 83 in Assessment 8, suggesting a minor decline in performance over time.\n\nInsights: Overall Performance Stability: The student's normalized scores have remained relatively stable, with scores ranging from 100 in Assessment 1 to 83 in Assessment 8, indicating a slight decline in performance over time. | Consistent Performance Trend: The performance trend across assessments is stable, with a consistent performance_trend value of -0.71875, indicating no significant improvement or decline in the overall performance trajectory.\n\nEducational implications: The student is maintaining a high level of performance, but the slight decline in scores suggests a need for continued engagement and support to prevent further drops.\n\nRecommendations: medium - Implement targeted feedback sessions focusing on areas of slight decline. - To maintain the student's high performance and address any emerging weaknesses.",
  "structured_payload": {
    "task_id": "A-S02",
    "execution_id": "exec_1781847829256_78db031d",
    "explanation": {
      "summary": "The student's performance shows a generally stable trend with slight fluctuations across assessments, indicating a consistent level of achievement. The normalized scores range from a high of 100 in Assessment 1 to a low of 83 in Assessment 8, suggesting a minor decline in performance over time.",
      "insights": [
        {
          "title": "Overall Performance Stability",
          "description": "The student's normalized scores have remained relatively stable, with scores ranging from 100 in Assessment 1 to 83 in Assessment 8, indicating a slight decline in performance over time.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 100,
              "comparison": "peak",
              "delta": null,
              "context": "Assessment 1"
            },
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "trough",
              "delta": -17,
              "context": "Assessment 8"
            }
          ]
        },
        {
          "title": "Consistent Performance Trend",
          "description": "The performance trend across assessments is stable, with a consistent performance_trend value of -0.71875, indicating no significant improvement or decline in the overall performance trajectory.",
          "severity": "low",
          "evidence": [
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "stable",
              "delta": null,
              "context": "Across all assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "The student is maintaining a high level of performance, but the slight decline in scores suggests a need for continued engagement and support to prevent further drops."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Implement targeted feedback sessions focusing on areas of slight decline.",
          "rationale": "To maintain the student's high performance and address any emerging weaknesses."
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
      "latency_ms": 6546,
      "token_usage": {
        "prompt_tokens": 1802,
        "completion_tokens": 480,
        "total_tokens": 2282
      },
      "strategy": "trend",
      "granularity": "per_assessment",
      "cost_usd": 0.000558
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S02__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "64cd50b4e174a0f5eb92a8dff4b1f17eabd30cd2ef2aac61149a1d380e40663d",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1802,
      "completion_tokens": 480,
      "total_tokens": 2282
    },
    "latency_ms": 6557,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S02",
    "execution_id": "exec_1781847829256_78db031d",
    "explanation": {
      "summary": "The student's performance shows a generally stable trend with slight fluctuations across assessments, indicating a consistent level of achievement. The normalized scores range from a high of 100 in Assessment 1 to a low of 83 in Assessment 8, suggesting a minor decline in performance over time.",
      "insights": [
        {
          "title": "Overall Performance Stability",
          "description": "The student's normalized scores have remained relatively stable, with scores ranging from 100 in Assessment 1 to 83 in Assessment 8, indicating a slight decline in performance over time.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 100,
              "comparison": "peak",
              "delta": null,
              "context": "Assessment 1"
            },
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "trough",
              "delta": -17,
              "context": "Assessment 8"
            }
          ]
        },
        {
          "title": "Consistent Performance Trend",
          "description": "The performance trend across assessments is stable, with a consistent performance_trend value of -0.71875, indicating no significant improvement or decline in the overall performance trajectory.",
          "severity": "low",
          "evidence": [
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "stable",
              "delta": null,
              "context": "Across all assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "The student is maintaining a high level of performance, but the slight decline in scores suggests a need for continued engagement and support to prevent further drops."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Implement targeted feedback sessions focusing on areas of slight decline.",
          "rationale": "To maintain the student's high performance and address any emerging weaknesses."
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
      "latency_ms": 6546,
      "token_usage": {
        "prompt_tokens": 1802,
        "completion_tokens": 480,
        "total_tokens": 2282
      },
      "strategy": "trend",
      "granularity": "per_assessment",
      "cost_usd": 0.000558
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
    "observed": "dbf7108bb59f12a9a5326678e4dc96554310ebe85eb5a5afca61892942966973",
    "expected_values": [
      "dbf7108bb59f12a9a5326678e4dc96554310ebe85eb5a5afca61892942966973"
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
