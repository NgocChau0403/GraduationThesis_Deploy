# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-G07__task_aware_data_summarization

This Phase 6.4b context is the record-level evidence package to supply with the frozen Judge Prompt V2 during pilot judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G07__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_pilot_phase6_4",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G07",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Factor correlation analysis",
  "scope": "Many students",
  "actionable_question": "What are the strongest predictors of student success in this dataset?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Rank top 5 features by correlation with avg_score [FE]. Note dataset-specific features.",
  "query_labels": [
    "factor_correlation_matrix"
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
    "assessment",
    "engagement",
    "student"
  ],
  "key_db_fields": [
    "avg_score [FE cross]",
    "engagement_score [FE cross]",
    "previous_attempt_count",
    "absences",
    "studytime",
    "total_clicks",
    "active_days"
  ],
  "output_schema": {
    "required_columns": [
      "feature_name",
      "correlation_with_avg_score"
    ],
    "optional_columns": [
      "n_samples",
      "abs_correlation_rank"
    ]
  },
  "query_labels": [
    "factor_correlation_matrix"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G07-CORE-01",
      "description": "Rank top 5 features by correlation with avg_score [FE]."
    },
    {
      "requirement_id": "A-G07-CORE-02",
      "description": "Note dataset-specific features."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G07-CONSTRAINT-01",
      "description": "When ranked features include sensitive demographic, lifestyle, or socioeconomic attributes, identify their sensitivity and avoid framing correlation as prescriptive guidance."
    },
    {
      "constraint_id": "A-G07-CONSTRAINT-02",
      "description": "Do not interpret feature correlation as causal importance."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Retained as applicable pending review because ranked factors may include sensitive attributes and may influence intervention policy."
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "factor_correlation_matrix",
      "artifact_path": "Docs/evaluation_v2/Runs/phase6_evidence/full_query_artifacts/SAMPLE_OULAD__A-G07__task_aware_data_summarization.json",
      "artifact_sha256": "d1c2a94331e51b1ae1c1efc53c33503b6a548f99d12e7217494a74c47e9a6008",
      "row_count": 4,
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
  "evidence_artifact_file_sha256": "d1c2a94331e51b1ae1c1efc53c33503b6a548f99d12e7217494a74c47e9a6008",
  "evidence_rows_sha256": "2d3a648518cb9b29e8d72c217afd44da96b100f0f5576ecd6f348a7c8419fe22",
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
  "embedded_datasets_sha256": "2d3a648518cb9b29e8d72c217afd44da96b100f0f5576ecd6f348a7c8419fe22",
  "datasets": {
    "factor_correlation_matrix": [
      {
        "feature_name": "active_days",
        "correlation_with_avg_score": 0.4181,
        "n_samples": 1998,
        "abs_correlation_rank": 1
      },
      {
        "feature_name": "total_clicks",
        "correlation_with_avg_score": 0.3237,
        "n_samples": 1998,
        "abs_correlation_rank": 2
      },
      {
        "feature_name": "disadvantage_score",
        "correlation_with_avg_score": -0.1353,
        "n_samples": 1875,
        "abs_correlation_rank": 3
      },
      {
        "feature_name": "registration_lead_time",
        "correlation_with_avg_score": 0.0017,
        "n_samples": 1988,
        "abs_correlation_rank": 4
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_task_aware/explanation_artifacts/SAMPLE_OULAD__A-G07__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "08dd533671f7f43718e62e39c9f2551f79f0b951194531afd61b045cca2e99ed",
  "generator_input_sha256": "8e49dd7b653d211837ee08d49e4eeb54275790582c67bac3b298672f5e6b0811",
  "generator_input_compact": {
    "task_id": "A-G07",
    "execution_id": "exec_1781820427329_f8a24841",
    "task_name": "Factor correlation analysis",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "What are the strongest predictors of student success in this dataset?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "factor_correlation_matrix"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "factor_correlation_matrix"
    ],
    "dataset_row_counts": {
      "factor_correlation_matrix": 4
    },
    "ai_summary_config_summary": {
      "summary_type": "ranking",
      "metric_column": "abs_correlation_rank",
      "entity_column": "feature_name",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": "asc",
      "top_k": 5,
      "bottom_k": 3,
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
  "raw_text": "Summary: The analysis reveals a moderate positive correlation between active days and average score, indicating that increased engagement may enhance student performance. Conversely, a weak negative correlation exists with disadvantage score, suggesting that higher disadvantage scores are associated with lower average scores.\n\nInsights: Active Days Correlation: The feature 'active_days' shows a moderate positive correlation (0.4181) with average score, indicating that students who engage more frequently tend to achieve higher scores. | Total Clicks Correlation: The feature 'total_clicks' has a moderate positive correlation (0.3237) with average score, suggesting that increased interaction with course materials may also contribute to better academic outcomes. | Disadvantage Score Correlation: The feature 'disadvantage_score' exhibits a weak negative correlation (-0.1353) with average score, indicating that higher disadvantage scores are linked to lower performance, which may require targeted interventions.\n\nEducational implications: Encouraging active participation and interaction with course materials may enhance student performance.\n\nRecommendations: high - Implement strategies to increase student engagement, such as gamification or interactive assignments. - Enhancing engagement is likely to improve average scores based on the positive correlation observed. | medium - Provide additional support and resources for students with high disadvantage scores. - Addressing the needs of disadvantaged students may help mitigate the negative impact on their performance.",
  "structured_payload": {
    "task_id": "A-G07",
    "execution_id": "exec_1781820427329_f8a24841",
    "explanation": {
      "summary": "The analysis reveals a moderate positive correlation between active days and average score, indicating that increased engagement may enhance student performance. Conversely, a weak negative correlation exists with disadvantage score, suggesting that higher disadvantage scores are associated with lower average scores.",
      "insights": [
        {
          "title": "Active Days Correlation",
          "description": "The feature 'active_days' shows a moderate positive correlation (0.4181) with average score, indicating that students who engage more frequently tend to achieve higher scores.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "correlation_with_avg_score",
              "value": 0.4181,
              "comparison": "baseline",
              "delta": null,
              "context": "indicates a significant relationship between engagement and performance"
            }
          ]
        },
        {
          "title": "Total Clicks Correlation",
          "description": "The feature 'total_clicks' has a moderate positive correlation (0.3237) with average score, suggesting that increased interaction with course materials may also contribute to better academic outcomes.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "correlation_with_avg_score",
              "value": 0.3237,
              "comparison": "baseline",
              "delta": null,
              "context": "highlights the importance of interaction in learning"
            }
          ]
        },
        {
          "title": "Disadvantage Score Correlation",
          "description": "The feature 'disadvantage_score' exhibits a weak negative correlation (-0.1353) with average score, indicating that higher disadvantage scores are linked to lower performance, which may require targeted interventions.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "correlation_with_avg_score",
              "value": -0.1353,
              "comparison": "baseline",
              "delta": null,
              "context": "suggests a need for support for disadvantaged students"
            }
          ]
        }
      ],
      "educational_implications": [
        "Encouraging active participation and interaction with course materials may enhance student performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement strategies to increase student engagement, such as gamification or interactive assignments.",
          "rationale": "Enhancing engagement is likely to improve average scores based on the positive correlation observed."
        },
        {
          "priority": "medium",
          "action": "Provide additional support and resources for students with high disadvantage scores.",
          "rationale": "Addressing the needs of disadvantaged students may help mitigate the negative impact on their performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is robust with a sufficient sample size, ensuring reliable correlation analysis.",
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
        "dataset_name": "factor_correlation_matrix",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 10723,
      "token_usage": {
        "prompt_tokens": 862,
        "completion_tokens": 621,
        "total_tokens": 1483
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000502
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_task_aware/explanation_artifacts/SAMPLE_OULAD__A-G07__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "08dd533671f7f43718e62e39c9f2551f79f0b951194531afd61b045cca2e99ed",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 862,
      "completion_tokens": 621,
      "total_tokens": 1483
    },
    "latency_ms": 10727,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G07",
    "execution_id": "exec_1781820427329_f8a24841",
    "explanation": {
      "summary": "The analysis reveals a moderate positive correlation between active days and average score, indicating that increased engagement may enhance student performance. Conversely, a weak negative correlation exists with disadvantage score, suggesting that higher disadvantage scores are associated with lower average scores.",
      "insights": [
        {
          "title": "Active Days Correlation",
          "description": "The feature 'active_days' shows a moderate positive correlation (0.4181) with average score, indicating that students who engage more frequently tend to achieve higher scores.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "correlation_with_avg_score",
              "value": 0.4181,
              "comparison": "baseline",
              "delta": null,
              "context": "indicates a significant relationship between engagement and performance"
            }
          ]
        },
        {
          "title": "Total Clicks Correlation",
          "description": "The feature 'total_clicks' has a moderate positive correlation (0.3237) with average score, suggesting that increased interaction with course materials may also contribute to better academic outcomes.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "correlation_with_avg_score",
              "value": 0.3237,
              "comparison": "baseline",
              "delta": null,
              "context": "highlights the importance of interaction in learning"
            }
          ]
        },
        {
          "title": "Disadvantage Score Correlation",
          "description": "The feature 'disadvantage_score' exhibits a weak negative correlation (-0.1353) with average score, indicating that higher disadvantage scores are linked to lower performance, which may require targeted interventions.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "correlation_with_avg_score",
              "value": -0.1353,
              "comparison": "baseline",
              "delta": null,
              "context": "suggests a need for support for disadvantaged students"
            }
          ]
        }
      ],
      "educational_implications": [
        "Encouraging active participation and interaction with course materials may enhance student performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement strategies to increase student engagement, such as gamification or interactive assignments.",
          "rationale": "Enhancing engagement is likely to improve average scores based on the positive correlation observed."
        },
        {
          "priority": "medium",
          "action": "Provide additional support and resources for students with high disadvantage scores.",
          "rationale": "Addressing the needs of disadvantaged students may help mitigate the negative impact on their performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is robust with a sufficient sample size, ensuring reliable correlation analysis.",
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
        "dataset_name": "factor_correlation_matrix",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 10723,
      "token_usage": {
        "prompt_tokens": 862,
        "completion_tokens": 621,
        "total_tokens": 1483
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000502
    }
  }
}
```

## Pilot-Minimal Deterministic Checks

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
    "observed": "d1c2a94331e51b1ae1c1efc53c33503b6a548f99d12e7217494a74c47e9a6008",
    "expected_values": [
      "d1c2a94331e51b1ae1c1efc53c33503b6a548f99d12e7217494a74c47e9a6008"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "2d3a648518cb9b29e8d72c217afd44da96b100f0f5576ecd6f348a7c8419fe22",
    "expected": "2d3a648518cb9b29e8d72c217afd44da96b100f0f5576ecd6f348a7c8419fe22"
  },
  {
    "check_id": "ranking_factor_correlation_matrix_abs_correlation_rank",
    "check_type": "ranking",
    "status": "pass",
    "dataset_label": "factor_correlation_matrix",
    "rank_column": "abs_correlation_rank",
    "ranked_row_count": 4,
    "duplicate_rank_count": 0,
    "top_rows": [
      {
        "feature_name": "active_days",
        "correlation_with_avg_score": 0.4181,
        "n_samples": 1998,
        "abs_correlation_rank": 1
      },
      {
        "feature_name": "total_clicks",
        "correlation_with_avg_score": 0.3237,
        "n_samples": 1998,
        "abs_correlation_rank": 2
      },
      {
        "feature_name": "disadvantage_score",
        "correlation_with_avg_score": -0.1353,
        "n_samples": 1875,
        "abs_correlation_rank": 3
      },
      {
        "feature_name": "registration_lead_time",
        "correlation_with_avg_score": 0.0017,
        "n_samples": 1988,
        "abs_correlation_rank": 4
      }
    ]
  },
  {
    "check_id": "numeric_fields_factor_correlation_matrix",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "factor_correlation_matrix",
    "numeric_columns": [
      "abs_correlation_rank",
      "correlation_with_avg_score",
      "n_samples"
    ],
    "numeric_summaries": {
      "abs_correlation_rank": {
        "count": 4,
        "min": 1,
        "max": 4
      },
      "correlation_with_avg_score": {
        "count": 4,
        "min": -0.1353,
        "max": 0.4181
      },
      "n_samples": {
        "count": 4,
        "min": 1875,
        "max": 1998
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_factor_correlation_matrix",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "factor_correlation_matrix",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
