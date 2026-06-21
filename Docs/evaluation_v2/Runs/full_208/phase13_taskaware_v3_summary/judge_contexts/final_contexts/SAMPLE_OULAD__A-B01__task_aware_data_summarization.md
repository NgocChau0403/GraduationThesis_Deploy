# LLM Judge Final Judge Context - SAMPLE_OULAD__A-B01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-B01__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-B01",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B01__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "fc99c90d9ca7f8d1f1ada15b0fdc77c385f364ae4ceb54bcd978240a71d10786",
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
  "raw_text": "Summary: The overall performance distribution indicates that a significant portion of students are scoring below the passing threshold of 40, with 173 students (6.9% of the class) falling within the lower score buckets. The distribution is heavily skewed towards higher scores, with notable clusters in the 80-100 range.\n\nInsights: High Proportion Below Passing Threshold: A total of 173 students are scoring below the passing threshold of 40, representing 6.9% of the class. This indicates a concerning number of students who may require additional support. | Dominance of Higher Score Buckets: The majority of students are concentrated in the higher score buckets, particularly in the 80-90 and 90-100 ranges, which together account for 29.7% of the class. This suggests a strong performance among a significant portion of students.\n\nEducational implications: Targeted interventions are necessary for students scoring below the passing threshold to improve overall class performance.\n\nRecommendations: high - Implement targeted support programs for students scoring below 40. - Addressing the needs of students in the lower score buckets can help improve their understanding and performance, ultimately raising the overall class average.",
  "structured_payload": {
    "task_id": "A-B01",
    "execution_id": "exec_1781847616743_2582108c",
    "explanation": {
      "summary": "The overall performance distribution indicates that a significant portion of students are scoring below the passing threshold of 40, with 173 students (6.9% of the class) falling within the lower score buckets. The distribution is heavily skewed towards higher scores, with notable clusters in the 80-100 range.",
      "insights": [
        {
          "title": "High Proportion Below Passing Threshold",
          "description": "A total of 173 students are scoring below the passing threshold of 40, representing 6.9% of the class. This indicates a concerning number of students who may require additional support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 173,
              "comparison": "baseline",
              "delta": null,
              "context": "Students scoring below 40"
            }
          ]
        },
        {
          "title": "Dominance of Higher Score Buckets",
          "description": "The majority of students are concentrated in the higher score buckets, particularly in the 80-90 and 90-100 ranges, which together account for 29.7% of the class. This suggests a strong performance among a significant portion of students.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 767,
              "comparison": "baseline",
              "delta": null,
              "context": "Students scoring in the 80-100 range"
            }
          ]
        }
      ],
      "educational_implications": [
        "Targeted interventions are necessary for students scoring below the passing threshold to improve overall class performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students scoring below 40.",
          "rationale": "Addressing the needs of students in the lower score buckets can help improve their understanding and performance, ultimately raising the overall class average."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a comprehensive distribution analysis with clear metrics.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "numeric_distribution",
    "ai_summary_method_warning": null,
    "full_result_row_count": 11,
    "included_row_count": 11,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "score_distribution",
        "row_count": 11,
        "included_row_count": 11
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 11,
    "baseline_reference_tokens": 344,
    "task_aware_prompt_tokens": 947,
    "token_ratio": 2.7529,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.7529 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8269,
      "token_usage": {
        "prompt_tokens": 1738,
        "completion_tokens": 472,
        "total_tokens": 2210
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000544
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B01__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "fc99c90d9ca7f8d1f1ada15b0fdc77c385f364ae4ceb54bcd978240a71d10786",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1738,
      "completion_tokens": 472,
      "total_tokens": 2210
    },
    "latency_ms": 8278,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-B01",
    "execution_id": "exec_1781847616743_2582108c",
    "explanation": {
      "summary": "The overall performance distribution indicates that a significant portion of students are scoring below the passing threshold of 40, with 173 students (6.9% of the class) falling within the lower score buckets. The distribution is heavily skewed towards higher scores, with notable clusters in the 80-100 range.",
      "insights": [
        {
          "title": "High Proportion Below Passing Threshold",
          "description": "A total of 173 students are scoring below the passing threshold of 40, representing 6.9% of the class. This indicates a concerning number of students who may require additional support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 173,
              "comparison": "baseline",
              "delta": null,
              "context": "Students scoring below 40"
            }
          ]
        },
        {
          "title": "Dominance of Higher Score Buckets",
          "description": "The majority of students are concentrated in the higher score buckets, particularly in the 80-90 and 90-100 ranges, which together account for 29.7% of the class. This suggests a strong performance among a significant portion of students.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 767,
              "comparison": "baseline",
              "delta": null,
              "context": "Students scoring in the 80-100 range"
            }
          ]
        }
      ],
      "educational_implications": [
        "Targeted interventions are necessary for students scoring below the passing threshold to improve overall class performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students scoring below 40.",
          "rationale": "Addressing the needs of students in the lower score buckets can help improve their understanding and performance, ultimately raising the overall class average."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a comprehensive distribution analysis with clear metrics.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "numeric_distribution",
    "ai_summary_method_warning": null,
    "full_result_row_count": 11,
    "included_row_count": 11,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "score_distribution",
        "row_count": 11,
        "included_row_count": 11
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 11,
    "baseline_reference_tokens": 344,
    "task_aware_prompt_tokens": 947,
    "token_ratio": 2.7529,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.7529 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8269,
      "token_usage": {
        "prompt_tokens": 1738,
        "completion_tokens": 472,
        "total_tokens": 2210
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000544
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
