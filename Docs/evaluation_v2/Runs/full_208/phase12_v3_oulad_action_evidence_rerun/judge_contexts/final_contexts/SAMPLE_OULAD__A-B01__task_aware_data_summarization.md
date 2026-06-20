# LLM Judge Final Judge Context - SAMPLE_OULAD__A-B01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-B01__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-B01",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
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
}
```

## Schema Context

```json
{
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
}
```

## Evaluation Requirements

```json
{
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
      "dataset_label": "score_distribution",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-B01.json",
      "artifact_sha256": "932985ef10e27856fc3774d914420b99a1f12c8899026c7d0f73ad2e4ea92158",
      "row_count": 11,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 11,
  "prompt_embedded_row_count": 11,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "932985ef10e27856fc3774d914420b99a1f12c8899026c7d0f73ad2e4ea92158",
  "evidence_rows_sha256": "6b3bcb7d3066c95f97f80a5db429f92df1694ebdc7222ccb61f8b7a8988d93f2",
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
  "full_result_row_count": 11,
  "embedded_datasets_sha256": "6b3bcb7d3066c95f97f80a5db429f92df1694ebdc7222ccb61f8b7a8988d93f2",
  "datasets": {
    "score_distribution": [
      {
        "score_bucket": "0-10",
        "student_count": 25,
        "pct_of_class": 1,
        "avg_score_in_bucket": 2.56
      },
      {
        "score_bucket": "10-20",
        "student_count": 27,
        "pct_of_class": 1.1,
        "avg_score_in_bucket": 13.53
      },
      {
        "score_bucket": "20-30",
        "student_count": 43,
        "pct_of_class": 1.7,
        "avg_score_in_bucket": 24.07
      },
      {
        "score_bucket": "30-40",
        "student_count": 78,
        "pct_of_class": 3.1,
        "avg_score_in_bucket": 34.79
      },
      {
        "score_bucket": "40-50",
        "student_count": 148,
        "pct_of_class": 5.9,
        "avg_score_in_bucket": 45.2
      },
      {
        "score_bucket": "50-60",
        "student_count": 241,
        "pct_of_class": 9.6,
        "avg_score_in_bucket": 55.34
      },
      {
        "score_bucket": "60-70",
        "student_count": 325,
        "pct_of_class": 13,
        "avg_score_in_bucket": 65.24
      },
      {
        "score_bucket": "70-80",
        "student_count": 344,
        "pct_of_class": 13.8,
        "avg_score_in_bucket": 75.48
      },
      {
        "score_bucket": "80-90",
        "student_count": 395,
        "pct_of_class": 15.8,
        "avg_score_in_bucket": 85.13
      },
      {
        "score_bucket": "90-100",
        "student_count": 372,
        "pct_of_class": 14.9,
        "avg_score_in_bucket": 94.9
      },
      {
        "score_bucket": "No score",
        "student_count": 500,
        "pct_of_class": 20,
        "avg_score_in_bucket": null
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B01__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "15ad5e95296b64b2f6ab09c3a6d59b8511f7281830a1c105d197f81d287fc419",
  "generator_input_sha256": "b0caebe16b3b9ef414b3f368637d6e53d8934fbfe0964d46faa5c0604963a6d8",
  "generator_input_compact": {
    "task_id": "A-B01",
    "execution_id": "exec_1781847616743_2582108c",
    "task_name": "Overall performance distribution",
    "analysis_type": "distribution",
    "explanation_strategy": "distribution",
    "actionable_question": "How is the class performing overall?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "score_distribution"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "score_distribution"
    ],
    "dataset_row_counts": {
      "score_distribution": 11
    },
    "ai_summary_config_summary": {
      "summary_type": "numeric_distribution",
      "metric_column": null,
      "entity_column": null,
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": null,
      "top_k": null,
      "bottom_k": null,
      "threshold_direction": "below",
      "numeric_threshold": 40,
      "require_sensitive_context_policy": false,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: The overall performance distribution indicates that a significant portion of students are clustered in the higher score buckets, with a notable number of students scoring below the passing threshold. The presence of a large group with no scores suggests potential disengagement or lack of assessment completion.\n\nInsights: High Concentration in Upper Score Buckets: A majority of students, specifically 1,067 out of 1,500, are concentrated in the score buckets from 50-100, indicating a strong performance in the class overall. | Significant Number of Students with No Scores: There are 500 students (20% of the class) who have not received any scores, which may indicate issues with engagement or assessment completion.\n\nEducational implications: The high number of students with no scores may require immediate attention to understand barriers to assessment completion.\n\nRecommendations: high - Implement targeted interventions for students with no scores. - Addressing the reasons behind the lack of scores can help improve overall class performance and engagement.",
  "structured_payload": {
    "task_id": "A-B01",
    "execution_id": "exec_1781847616743_2582108c",
    "explanation": {
      "summary": "The overall performance distribution indicates that a significant portion of students are clustered in the higher score buckets, with a notable number of students scoring below the passing threshold. The presence of a large group with no scores suggests potential disengagement or lack of assessment completion.",
      "insights": [
        {
          "title": "High Concentration in Upper Score Buckets",
          "description": "A majority of students, specifically 1,067 out of 1,500, are concentrated in the score buckets from 50-100, indicating a strong performance in the class overall.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Total students in upper score buckets (50-100) are 1,067."
            }
          ]
        },
        {
          "title": "Significant Number of Students with No Scores",
          "description": "There are 500 students (20% of the class) who have not received any scores, which may indicate issues with engagement or assessment completion.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 500,
              "comparison": "baseline",
              "delta": null,
              "context": "20% of the class has no scores."
            }
          ]
        }
      ],
      "educational_implications": [
        "The high number of students with no scores may require immediate attention to understand barriers to assessment completion."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions for students with no scores.",
          "rationale": "Addressing the reasons behind the lack of scores can help improve overall class performance and engagement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and provides a clear overview of the performance distribution.",
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
    "full_result_row_count": 11,
    "included_row_count": 11,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "score_distribution",
        "row_count": 11,
        "included_row_count": 11
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 13762,
      "token_usage": {
        "prompt_tokens": 1127,
        "completion_tokens": 442,
        "total_tokens": 1569
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000434
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B01__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "15ad5e95296b64b2f6ab09c3a6d59b8511f7281830a1c105d197f81d287fc419",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1127,
      "completion_tokens": 442,
      "total_tokens": 1569
    },
    "latency_ms": 13771,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-B01",
    "execution_id": "exec_1781847616743_2582108c",
    "explanation": {
      "summary": "The overall performance distribution indicates that a significant portion of students are clustered in the higher score buckets, with a notable number of students scoring below the passing threshold. The presence of a large group with no scores suggests potential disengagement or lack of assessment completion.",
      "insights": [
        {
          "title": "High Concentration in Upper Score Buckets",
          "description": "A majority of students, specifically 1,067 out of 1,500, are concentrated in the score buckets from 50-100, indicating a strong performance in the class overall.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Total students in upper score buckets (50-100) are 1,067."
            }
          ]
        },
        {
          "title": "Significant Number of Students with No Scores",
          "description": "There are 500 students (20% of the class) who have not received any scores, which may indicate issues with engagement or assessment completion.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 500,
              "comparison": "baseline",
              "delta": null,
              "context": "20% of the class has no scores."
            }
          ]
        }
      ],
      "educational_implications": [
        "The high number of students with no scores may require immediate attention to understand barriers to assessment completion."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions for students with no scores.",
          "rationale": "Addressing the reasons behind the lack of scores can help improve overall class performance and engagement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and provides a clear overview of the performance distribution.",
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
    "full_result_row_count": 11,
    "included_row_count": 11,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "score_distribution",
        "row_count": 11,
        "included_row_count": 11
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 13762,
      "token_usage": {
        "prompt_tokens": 1127,
        "completion_tokens": 442,
        "total_tokens": 1569
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000434
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
    "expected": 11,
    "observed": 11
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "932985ef10e27856fc3774d914420b99a1f12c8899026c7d0f73ad2e4ea92158",
    "expected_values": [
      "932985ef10e27856fc3774d914420b99a1f12c8899026c7d0f73ad2e4ea92158"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "6b3bcb7d3066c95f97f80a5db429f92df1694ebdc7222ccb61f8b7a8988d93f2",
    "expected": "6b3bcb7d3066c95f97f80a5db429f92df1694ebdc7222ccb61f8b7a8988d93f2"
  },
  {
    "check_id": "numeric_fields_score_distribution",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "score_distribution",
    "numeric_columns": [
      "pct_of_class",
      "student_count",
      "avg_score_in_bucket"
    ],
    "numeric_summaries": {
      "pct_of_class": {
        "count": 11,
        "min": 1,
        "max": 20
      },
      "student_count": {
        "count": 11,
        "min": 25,
        "max": 500
      },
      "avg_score_in_bucket": {
        "count": 10,
        "min": 2.56,
        "max": 94.9
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_score_distribution",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "score_distribution",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
