# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-B03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-B03__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-B03",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Engagement distribution",
  "scope": "Cohort",
  "actionable_question": "What proportion of the class is disengaged?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "categorical_distribution",
  "ai_prompt_hint": "Describe proportion of low/medium/high effort students. Flag the low tail.",
  "query_labels": [
    "engagement_distribution"
  ],
  "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement"
  ],
  "key_db_fields": [
    "engagement_score [FE]",
    "study_effort_level [FE]",
    "total_engagement_count"
  ],
  "output_schema": {
    "required_columns": [
      "study_effort_level",
      "student_count"
    ],
    "optional_columns": [
      "pct_of_class",
      "avg_engagement_score"
    ]
  },
  "query_labels": [
    "engagement_distribution"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-B03-CORE-01",
      "description": "Describe proportion of low/medium/high effort students."
    },
    {
      "requirement_id": "A-B03-CORE-02",
      "description": "Flag the low tail."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "engagement_distribution",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-B03.json",
      "artifact_sha256": "c20cfd3d2f05f90d06deb04b341e58678453779d5d3f7533154cedcb111762cb",
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
  "evidence_artifact_file_sha256": "c20cfd3d2f05f90d06deb04b341e58678453779d5d3f7533154cedcb111762cb",
  "evidence_rows_sha256": "8f074815926ed0e862b7929e410b5108ce4e8bb856d1d3c089a413f563e6d23b",
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
  "embedded_datasets_sha256": "8f074815926ed0e862b7929e410b5108ce4e8bb856d1d3c089a413f563e6d23b",
  "datasets": {
    "engagement_distribution": [
      {
        "study_effort_level": "very_low",
        "student_count": 1740,
        "pct_of_class": 69.7,
        "avg_engagement_score": 0.0516
      },
      {
        "study_effort_level": "low",
        "student_count": 618,
        "pct_of_class": 24.7,
        "avg_engagement_score": 0.2272
      },
      {
        "study_effort_level": "medium",
        "student_count": 127,
        "pct_of_class": 5.1,
        "avg_engagement_score": 0.4293
      },
      {
        "study_effort_level": "high",
        "student_count": 13,
        "pct_of_class": 0.5,
        "avg_engagement_score": 0.707
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B03__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "84d859c83b657464b6c9532e9cf81fb298f9bf69c503cb70564a0c24bb298864",
  "generator_input_sha256": "9faf0cbb6ab0bd2a8608c91d136804e0fe0f8b89c3d022155cb1e16ff4769904",
  "generator_input_compact": {
    "task_id": "A-B03",
    "execution_id": "exec_1781847625023_5b8a2d71",
    "task_name": "Engagement distribution",
    "analysis_type": "distribution",
    "explanation_strategy": "distribution",
    "actionable_question": "What proportion of the class is disengaged?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "engagement_distribution"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "engagement_distribution"
    ],
    "dataset_row_counts": {
      "engagement_distribution": 4
    },
    "ai_summary_config_summary": {
      "summary_type": "categorical_distribution",
      "metric_column": null,
      "entity_column": null,
      "group_column": null,
      "time_column": null,
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
  "raw_text": "Summary: The engagement distribution reveals a significant concentration of students in the very low effort category, indicating a large proportion of disengaged learners. The data shows a steep decline in student count as engagement levels increase, highlighting a critical gap in student engagement.\n\nInsights: High Disengagement Levels: A substantial 69.7% of students fall into the very low study effort category, with an average engagement score of only 0.0516. This indicates a major portion of the class is disengaged. | Low Engagement Among Remaining Students: The remaining students show a sharp drop in numbers, with only 24.7% in the low effort category and a mere 5.1% in the medium effort category. This suggests a lack of engagement across the board.\n\nEducational implications: The high percentage of disengaged students necessitates targeted interventions to increase engagement levels.\n\nRecommendations: high - Implement engagement strategies tailored for very low effort students. - Addressing the needs of the majority of disengaged students is crucial for improving overall class engagement.",
  "structured_payload": {
    "task_id": "A-B03",
    "execution_id": "exec_1781847625023_5b8a2d71",
    "explanation": {
      "summary": "The engagement distribution reveals a significant concentration of students in the very low effort category, indicating a large proportion of disengaged learners. The data shows a steep decline in student count as engagement levels increase, highlighting a critical gap in student engagement.",
      "insights": [
        {
          "title": "High Disengagement Levels",
          "description": "A substantial 69.7% of students fall into the very low study effort category, with an average engagement score of only 0.0516. This indicates a major portion of the class is disengaged.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_of_class",
              "value": 69.7,
              "comparison": "baseline",
              "delta": null,
              "context": "very low study effort level"
            }
          ]
        },
        {
          "title": "Low Engagement Among Remaining Students",
          "description": "The remaining students show a sharp drop in numbers, with only 24.7% in the low effort category and a mere 5.1% in the medium effort category. This suggests a lack of engagement across the board.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_of_class",
              "value": 24.7,
              "comparison": "down_from_previous",
              "delta": -45,
              "context": "low study effort level"
            },
            {
              "metric": "pct_of_class",
              "value": 5.1,
              "comparison": "down_from_previous",
              "delta": -19.6,
              "context": "medium study effort level"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high percentage of disengaged students necessitates targeted interventions to increase engagement levels."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement engagement strategies tailored for very low effort students.",
          "rationale": "Addressing the needs of the majority of disengaged students is crucial for improving overall class engagement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear view of student engagement levels.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
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
        "dataset_name": "engagement_distribution",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7617,
      "token_usage": {
        "prompt_tokens": 833,
        "completion_tokens": 498,
        "total_tokens": 1331
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000424
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B03__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "84d859c83b657464b6c9532e9cf81fb298f9bf69c503cb70564a0c24bb298864",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 833,
      "completion_tokens": 498,
      "total_tokens": 1331
    },
    "latency_ms": 7626,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-B03",
    "execution_id": "exec_1781847625023_5b8a2d71",
    "explanation": {
      "summary": "The engagement distribution reveals a significant concentration of students in the very low effort category, indicating a large proportion of disengaged learners. The data shows a steep decline in student count as engagement levels increase, highlighting a critical gap in student engagement.",
      "insights": [
        {
          "title": "High Disengagement Levels",
          "description": "A substantial 69.7% of students fall into the very low study effort category, with an average engagement score of only 0.0516. This indicates a major portion of the class is disengaged.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_of_class",
              "value": 69.7,
              "comparison": "baseline",
              "delta": null,
              "context": "very low study effort level"
            }
          ]
        },
        {
          "title": "Low Engagement Among Remaining Students",
          "description": "The remaining students show a sharp drop in numbers, with only 24.7% in the low effort category and a mere 5.1% in the medium effort category. This suggests a lack of engagement across the board.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_of_class",
              "value": 24.7,
              "comparison": "down_from_previous",
              "delta": -45,
              "context": "low study effort level"
            },
            {
              "metric": "pct_of_class",
              "value": 5.1,
              "comparison": "down_from_previous",
              "delta": -19.6,
              "context": "medium study effort level"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high percentage of disengaged students necessitates targeted interventions to increase engagement levels."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement engagement strategies tailored for very low effort students.",
          "rationale": "Addressing the needs of the majority of disengaged students is crucial for improving overall class engagement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear view of student engagement levels.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
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
        "dataset_name": "engagement_distribution",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7617,
      "token_usage": {
        "prompt_tokens": 833,
        "completion_tokens": 498,
        "total_tokens": 1331
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000424
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
    "observed": "c20cfd3d2f05f90d06deb04b341e58678453779d5d3f7533154cedcb111762cb",
    "expected_values": [
      "c20cfd3d2f05f90d06deb04b341e58678453779d5d3f7533154cedcb111762cb"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "8f074815926ed0e862b7929e410b5108ce4e8bb856d1d3c089a413f563e6d23b",
    "expected": "8f074815926ed0e862b7929e410b5108ce4e8bb856d1d3c089a413f563e6d23b"
  },
  {
    "check_id": "numeric_fields_engagement_distribution",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "engagement_distribution",
    "numeric_columns": [
      "avg_engagement_score",
      "pct_of_class",
      "student_count"
    ],
    "numeric_summaries": {
      "avg_engagement_score": {
        "count": 4,
        "min": 0.0516,
        "max": 0.707
      },
      "pct_of_class": {
        "count": 4,
        "min": 0.5,
        "max": 69.7
      },
      "student_count": {
        "count": 4,
        "min": 13,
        "max": 1740
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_engagement_distribution",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "engagement_distribution",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
