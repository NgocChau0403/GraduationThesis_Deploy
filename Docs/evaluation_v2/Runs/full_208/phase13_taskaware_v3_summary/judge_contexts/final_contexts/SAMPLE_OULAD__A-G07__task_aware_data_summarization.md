# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G07__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G07__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
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
      "dataset_label": "factor_correlation_matrix",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G07.json",
      "artifact_sha256": "0074d5e842d5ceb416ec450c5504ef543b2676813a8a94ea760fcab390bca75f",
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
  "evidence_artifact_file_sha256": "0074d5e842d5ceb416ec450c5504ef543b2676813a8a94ea760fcab390bca75f",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G07__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "d065f93f2a6cb3b1e2b6ac04085e8f544b81a4dc4dfcf91915852ec122d7a5ee",
  "generator_input_sha256": "185f44f8be46ccef7d645ccb3c50487c89dced45560b340d20850976cee7f754",
  "generator_input_compact": {
    "task_id": "A-G07",
    "execution_id": "exec_1781847728520_8c1dbd8b",
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
  "raw_text": "Summary: The analysis of the correlation between various features and average scores reveals distinct patterns. Active days and total clicks show a positive correlation with average scores, while disadvantage score presents a negative correlation, indicating varying impacts on student success.\n\nInsights: Active Days as a Strong Predictor: The feature 'active_days' has a strong positive correlation coefficient of 0.4181 with average scores, suggesting that increased engagement in terms of active days is associated with higher student performance. | Total Clicks Correlation: The feature 'total_clicks' shows a moderate positive correlation of 0.3237 with average scores, indicating that higher interaction levels may contribute positively to student success. | Negative Impact of Disadvantage Score: The 'disadvantage_score' has a weak negative correlation of -0.1353 with average scores, indicating that higher disadvantage scores may be linked to lower student performance.\n\nEducational implications: Encouraging active participation and engagement can significantly enhance student performance.\n\nRecommendations: high - Implement strategies to increase active days among students. - Given the strong correlation, fostering more active engagement could lead to improved academic outcomes. | medium - Enhance interactive elements in the learning platform to boost total clicks. - Moderate correlation suggests that increased interaction may positively influence student success. | medium - Identify and support students with high disadvantage scores. - Addressing barriers indicated by the negative correlation could help improve overall student performance.",
  "structured_payload": {
    "task_id": "A-G07",
    "execution_id": "exec_1781847728520_8c1dbd8b",
    "explanation": {
      "summary": "The analysis of the correlation between various features and average scores reveals distinct patterns. Active days and total clicks show a positive correlation with average scores, while disadvantage score presents a negative correlation, indicating varying impacts on student success.",
      "insights": [
        {
          "title": "Active Days as a Strong Predictor",
          "description": "The feature 'active_days' has a strong positive correlation coefficient of 0.4181 with average scores, suggesting that increased engagement in terms of active days is associated with higher student performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "correlation_with_avg_score",
              "value": 0.4181,
              "comparison": "baseline",
              "delta": null,
              "context": "Top-ranked feature indicating strong engagement impact."
            }
          ]
        },
        {
          "title": "Total Clicks Correlation",
          "description": "The feature 'total_clicks' shows a moderate positive correlation of 0.3237 with average scores, indicating that higher interaction levels may contribute positively to student success.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "correlation_with_avg_score",
              "value": 0.3237,
              "comparison": "baseline",
              "delta": null,
              "context": "Second-ranked feature suggesting interaction importance."
            }
          ]
        },
        {
          "title": "Negative Impact of Disadvantage Score",
          "description": "The 'disadvantage_score' has a weak negative correlation of -0.1353 with average scores, indicating that higher disadvantage scores may be linked to lower student performance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "correlation_with_avg_score",
              "value": -0.1353,
              "comparison": "baseline",
              "delta": null,
              "context": "Third-ranked feature highlighting potential barriers to success."
            }
          ]
        }
      ],
      "educational_implications": [
        "Encouraging active participation and engagement can significantly enhance student performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement strategies to increase active days among students.",
          "rationale": "Given the strong correlation, fostering more active engagement could lead to improved academic outcomes."
        },
        {
          "priority": "medium",
          "action": "Enhance interactive elements in the learning platform to boost total clicks.",
          "rationale": "Moderate correlation suggests that increased interaction may positively influence student success."
        },
        {
          "priority": "medium",
          "action": "Identify and support students with high disadvantage scores.",
          "rationale": "Addressing barriers indicated by the negative correlation could help improve overall student performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is sufficiently large and the correlations are statistically significant.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "ranking",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "factor_correlation_matrix",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 4,
    "baseline_reference_tokens": 156,
    "task_aware_prompt_tokens": 659,
    "token_ratio": 4.2244,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (4.2244 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 9502,
      "token_usage": {
        "prompt_tokens": 1260,
        "completion_tokens": 644,
        "total_tokens": 1904
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000575
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G07__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "d065f93f2a6cb3b1e2b6ac04085e8f544b81a4dc4dfcf91915852ec122d7a5ee",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1260,
      "completion_tokens": 644,
      "total_tokens": 1904
    },
    "latency_ms": 9505,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G07",
    "execution_id": "exec_1781847728520_8c1dbd8b",
    "explanation": {
      "summary": "The analysis of the correlation between various features and average scores reveals distinct patterns. Active days and total clicks show a positive correlation with average scores, while disadvantage score presents a negative correlation, indicating varying impacts on student success.",
      "insights": [
        {
          "title": "Active Days as a Strong Predictor",
          "description": "The feature 'active_days' has a strong positive correlation coefficient of 0.4181 with average scores, suggesting that increased engagement in terms of active days is associated with higher student performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "correlation_with_avg_score",
              "value": 0.4181,
              "comparison": "baseline",
              "delta": null,
              "context": "Top-ranked feature indicating strong engagement impact."
            }
          ]
        },
        {
          "title": "Total Clicks Correlation",
          "description": "The feature 'total_clicks' shows a moderate positive correlation of 0.3237 with average scores, indicating that higher interaction levels may contribute positively to student success.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "correlation_with_avg_score",
              "value": 0.3237,
              "comparison": "baseline",
              "delta": null,
              "context": "Second-ranked feature suggesting interaction importance."
            }
          ]
        },
        {
          "title": "Negative Impact of Disadvantage Score",
          "description": "The 'disadvantage_score' has a weak negative correlation of -0.1353 with average scores, indicating that higher disadvantage scores may be linked to lower student performance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "correlation_with_avg_score",
              "value": -0.1353,
              "comparison": "baseline",
              "delta": null,
              "context": "Third-ranked feature highlighting potential barriers to success."
            }
          ]
        }
      ],
      "educational_implications": [
        "Encouraging active participation and engagement can significantly enhance student performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement strategies to increase active days among students.",
          "rationale": "Given the strong correlation, fostering more active engagement could lead to improved academic outcomes."
        },
        {
          "priority": "medium",
          "action": "Enhance interactive elements in the learning platform to boost total clicks.",
          "rationale": "Moderate correlation suggests that increased interaction may positively influence student success."
        },
        {
          "priority": "medium",
          "action": "Identify and support students with high disadvantage scores.",
          "rationale": "Addressing barriers indicated by the negative correlation could help improve overall student performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is sufficiently large and the correlations are statistically significant.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "ranking",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "factor_correlation_matrix",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 4,
    "baseline_reference_tokens": 156,
    "task_aware_prompt_tokens": 659,
    "token_ratio": 4.2244,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (4.2244 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 9502,
      "token_usage": {
        "prompt_tokens": 1260,
        "completion_tokens": 644,
        "total_tokens": 1904
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000575
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
    "observed": "0074d5e842d5ceb416ec450c5504ef543b2676813a8a94ea760fcab390bca75f",
    "expected_values": [
      "0074d5e842d5ceb416ec450c5504ef543b2676813a8a94ea760fcab390bca75f"
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
