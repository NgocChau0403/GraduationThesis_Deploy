# LLM Judge Final Judge Context - SAMPLE_OULAD__A-B03__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-B03__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-B03",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B03__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "36a66266b4d23e24654e2b990067fe19b2f1f982fcedf37cc1571e0e71838548",
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
  "raw_text": "Summary: The engagement distribution reveals that a significant majority of students, 69.7%, fall into the 'very low' study effort level, indicating a high proportion of disengaged learners. The distribution is heavily skewed towards lower engagement levels, with only a small fraction of students demonstrating medium or high engagement.\n\nInsights: High Disengagement Rate: A substantial 69.7% of students are categorized as 'very low' in study effort, which highlights a critical area of concern for engagement strategies. | Low Representation of Engaged Students: Only 5.1% of students are in the 'medium' effort category and a mere 0.5% in the 'high' category, indicating a significant gap in student engagement.\n\nEducational implications: The high percentage of students in the 'very low' engagement category suggests a need for targeted interventions to increase overall student engagement.\n\nRecommendations: high - Implement engagement-focused strategies such as interactive learning activities and personalized feedback. - These strategies can help motivate students and potentially shift them from low to higher engagement levels.",
  "structured_payload": {
    "task_id": "A-B03",
    "execution_id": "exec_1781847625023_5b8a2d71",
    "explanation": {
      "summary": "The engagement distribution reveals that a significant majority of students, 69.7%, fall into the 'very low' study effort level, indicating a high proportion of disengaged learners. The distribution is heavily skewed towards lower engagement levels, with only a small fraction of students demonstrating medium or high engagement.",
      "insights": [
        {
          "title": "High Disengagement Rate",
          "description": "A substantial 69.7% of students are categorized as 'very low' in study effort, which highlights a critical area of concern for engagement strategies.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_of_class",
              "value": 69.7,
              "comparison": "baseline",
              "delta": null,
              "context": "Percentage of students in the 'very low' engagement category"
            }
          ]
        },
        {
          "title": "Low Representation of Engaged Students",
          "description": "Only 5.1% of students are in the 'medium' effort category and a mere 0.5% in the 'high' category, indicating a significant gap in student engagement.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_of_class",
              "value": 5.1,
              "comparison": "baseline",
              "delta": null,
              "context": "Percentage of students in the 'medium' engagement category"
            },
            {
              "metric": "pct_of_class",
              "value": 0.5,
              "comparison": "baseline",
              "delta": null,
              "context": "Percentage of students in the 'high' engagement category"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high percentage of students in the 'very low' engagement category suggests a need for targeted interventions to increase overall student engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement engagement-focused strategies such as interactive learning activities and personalized feedback.",
          "rationale": "These strategies can help motivate students and potentially shift them from low to higher engagement levels."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides clear engagement metrics across defined effort levels.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
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
      "latency_ms": 12357,
      "token_usage": {
        "prompt_tokens": 680,
        "completion_tokens": 513,
        "total_tokens": 1193
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.00041
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B03__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "36a66266b4d23e24654e2b990067fe19b2f1f982fcedf37cc1571e0e71838548",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 680,
      "completion_tokens": 513,
      "total_tokens": 1193
    },
    "latency_ms": 12363,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-B03",
    "execution_id": "exec_1781847625023_5b8a2d71",
    "explanation": {
      "summary": "The engagement distribution reveals that a significant majority of students, 69.7%, fall into the 'very low' study effort level, indicating a high proportion of disengaged learners. The distribution is heavily skewed towards lower engagement levels, with only a small fraction of students demonstrating medium or high engagement.",
      "insights": [
        {
          "title": "High Disengagement Rate",
          "description": "A substantial 69.7% of students are categorized as 'very low' in study effort, which highlights a critical area of concern for engagement strategies.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_of_class",
              "value": 69.7,
              "comparison": "baseline",
              "delta": null,
              "context": "Percentage of students in the 'very low' engagement category"
            }
          ]
        },
        {
          "title": "Low Representation of Engaged Students",
          "description": "Only 5.1% of students are in the 'medium' effort category and a mere 0.5% in the 'high' category, indicating a significant gap in student engagement.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_of_class",
              "value": 5.1,
              "comparison": "baseline",
              "delta": null,
              "context": "Percentage of students in the 'medium' engagement category"
            },
            {
              "metric": "pct_of_class",
              "value": 0.5,
              "comparison": "baseline",
              "delta": null,
              "context": "Percentage of students in the 'high' engagement category"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high percentage of students in the 'very low' engagement category suggests a need for targeted interventions to increase overall student engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement engagement-focused strategies such as interactive learning activities and personalized feedback.",
          "rationale": "These strategies can help motivate students and potentially shift them from low to higher engagement levels."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides clear engagement metrics across defined effort levels.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
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
      "latency_ms": 12357,
      "token_usage": {
        "prompt_tokens": 680,
        "completion_tokens": 513,
        "total_tokens": 1193
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.00041
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
