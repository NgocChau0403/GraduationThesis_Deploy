# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S02__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-S02__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-S02",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
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
  "evaluation_status": "not_available",
  "supported_action_count": 0,
  "supported_actions": []
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S02__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "3086b7512fd61c02721d071665b3791cab5bcc1b0bef8f5a4e75914f11250323",
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
  "raw_text": "Summary: The student's performance shows a generally stable trend with slight fluctuations across assessments. The normalized scores indicate a high level of achievement, with the highest score recorded in Assessment 1 and a minor decline observed in subsequent assessments.\n\nInsights: Overall Performance Stability: The student's normalized scores have remained relatively high, with scores ranging from 83 to 100 across assessments. The performance trend remains stable, indicating consistent performance without significant improvement or decline. | Notable Turning Points: The highest score of 100 in Assessment 1 indicates the peak performance, while the lowest score of 83 in Assessment 8 suggests a slight decline in performance. However, the overall trend remains stable.\n\nEducational implications: The student demonstrates a strong understanding of the material, but the slight decline in scores suggests a need for continued engagement and possibly additional support to maintain performance levels.\n\nRecommendations: medium - Implement targeted feedback sessions focusing on areas of slight decline. - To ensure the student maintains high performance and addresses any emerging gaps in understanding.",
  "structured_payload": {
    "task_id": "A-S02",
    "execution_id": "exec_1781847829256_78db031d",
    "explanation": {
      "summary": "The student's performance shows a generally stable trend with slight fluctuations across assessments. The normalized scores indicate a high level of achievement, with the highest score recorded in Assessment 1 and a minor decline observed in subsequent assessments.",
      "insights": [
        {
          "title": "Overall Performance Stability",
          "description": "The student's normalized scores have remained relatively high, with scores ranging from 83 to 100 across assessments. The performance trend remains stable, indicating consistent performance without significant improvement or decline.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 100,
              "comparison": "baseline",
              "delta": null,
              "context": "Highest score in Assessment 1"
            },
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "down_from_previous",
              "delta": -7,
              "context": "Lowest score in Assessment 8"
            }
          ]
        },
        {
          "title": "Notable Turning Points",
          "description": "The highest score of 100 in Assessment 1 indicates the peak performance, while the lowest score of 83 in Assessment 8 suggests a slight decline in performance. However, the overall trend remains stable.",
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
              "delta": -7,
              "context": "Assessment 8"
            }
          ]
        }
      ],
      "educational_implications": [
        "The student demonstrates a strong understanding of the material, but the slight decline in scores suggests a need for continued engagement and possibly additional support to maintain performance levels."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Implement targeted feedback sessions focusing on areas of slight decline.",
          "rationale": "To ensure the student maintains high performance and addresses any emerging gaps in understanding."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is strong, with a large sample size and consistent assessment metrics.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "baseline_first_20_rows",
    "ai_summary_version": "baseline",
    "baseline_available": true,
    "input_summary_type": "raw_first_20_rows",
    "ai_summary_method_warning": null,
    "full_result_row_count": null,
    "included_row_count": null,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6883,
      "token_usage": {
        "prompt_tokens": 1650,
        "completion_tokens": 527,
        "total_tokens": 2177
      },
      "strategy": "trend",
      "granularity": "per_assessment",
      "cost_usd": 0.000564
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S02__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "3086b7512fd61c02721d071665b3791cab5bcc1b0bef8f5a4e75914f11250323",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1650,
      "completion_tokens": 527,
      "total_tokens": 2177
    },
    "latency_ms": 6888,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S02",
    "execution_id": "exec_1781847829256_78db031d",
    "explanation": {
      "summary": "The student's performance shows a generally stable trend with slight fluctuations across assessments. The normalized scores indicate a high level of achievement, with the highest score recorded in Assessment 1 and a minor decline observed in subsequent assessments.",
      "insights": [
        {
          "title": "Overall Performance Stability",
          "description": "The student's normalized scores have remained relatively high, with scores ranging from 83 to 100 across assessments. The performance trend remains stable, indicating consistent performance without significant improvement or decline.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 100,
              "comparison": "baseline",
              "delta": null,
              "context": "Highest score in Assessment 1"
            },
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "down_from_previous",
              "delta": -7,
              "context": "Lowest score in Assessment 8"
            }
          ]
        },
        {
          "title": "Notable Turning Points",
          "description": "The highest score of 100 in Assessment 1 indicates the peak performance, while the lowest score of 83 in Assessment 8 suggests a slight decline in performance. However, the overall trend remains stable.",
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
              "delta": -7,
              "context": "Assessment 8"
            }
          ]
        }
      ],
      "educational_implications": [
        "The student demonstrates a strong understanding of the material, but the slight decline in scores suggests a need for continued engagement and possibly additional support to maintain performance levels."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Implement targeted feedback sessions focusing on areas of slight decline.",
          "rationale": "To ensure the student maintains high performance and addresses any emerging gaps in understanding."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is strong, with a large sample size and consistent assessment metrics.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "baseline_first_20_rows",
    "ai_summary_version": "baseline",
    "baseline_available": true,
    "input_summary_type": "raw_first_20_rows",
    "ai_summary_method_warning": null,
    "full_result_row_count": null,
    "included_row_count": null,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6883,
      "token_usage": {
        "prompt_tokens": 1650,
        "completion_tokens": 527,
        "total_tokens": 2177
      },
      "strategy": "trend",
      "granularity": "per_assessment",
      "cost_usd": 0.000564
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
