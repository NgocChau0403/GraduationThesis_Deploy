# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-B01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-B01__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-B01.json",
      "artifact_sha256": "c6f52e5d026054892d52e98d1e9d748ac2e6f00ffff32d6820c814970c855f80",
      "row_count": 10,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 10,
  "prompt_embedded_row_count": 10,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "c6f52e5d026054892d52e98d1e9d748ac2e6f00ffff32d6820c814970c855f80",
  "evidence_rows_sha256": "df628c9e756173fa56c95830ad55dd6d85e32e50a5c96d7ad99985910fb17ab9",
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
  "full_result_row_count": 10,
  "embedded_datasets_sha256": "df628c9e756173fa56c95830ad55dd6d85e32e50a5c96d7ad99985910fb17ab9",
  "datasets": {
    "score_distribution": [
      {
        "score_bucket": "0-10",
        "student_count": 3,
        "pct_of_class": 0.5,
        "avg_score_in_bucket": 7.78
      },
      {
        "score_bucket": "10-20",
        "student_count": 4,
        "pct_of_class": 0.6,
        "avg_score_in_bucket": 12.92
      },
      {
        "score_bucket": "20-30",
        "student_count": 9,
        "pct_of_class": 1.4,
        "avg_score_in_bucket": 24.44
      },
      {
        "score_bucket": "30-40",
        "student_count": 33,
        "pct_of_class": 5.1,
        "avg_score_in_bucket": 36.01
      },
      {
        "score_bucket": "40-50",
        "student_count": 108,
        "pct_of_class": 16.6,
        "avg_score_in_bucket": 45.03
      },
      {
        "score_bucket": "50-60",
        "student_count": 187,
        "pct_of_class": 28.8,
        "avg_score_in_bucket": 53.66
      },
      {
        "score_bucket": "60-70",
        "student_count": 168,
        "pct_of_class": 25.9,
        "avg_score_in_bucket": 63.78
      },
      {
        "score_bucket": "70-80",
        "student_count": 90,
        "pct_of_class": 13.9,
        "avg_score_in_bucket": 73.91
      },
      {
        "score_bucket": "80-90",
        "student_count": 40,
        "pct_of_class": 6.2,
        "avg_score_in_bucket": 83.54
      },
      {
        "score_bucket": "90-100",
        "student_count": 7,
        "pct_of_class": 1.1,
        "avg_score_in_bucket": 90.48
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-B01__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "eb30d86216d8d5a5f3df9ff54c2bed6b0d9d10e9653f7a19caeb94a73a604456",
  "generator_input_sha256": "d01530583ddbe0ecf70dd066630e361988ffd7df9d16d139efaa03b5c25efcbc",
  "generator_input_compact": {
    "task_id": "A-B01",
    "execution_id": "exec_1781847231655_3078f027",
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
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "score_distribution"
    ],
    "dataset_row_counts": {
      "score_distribution": 10
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
  "raw_text": "Summary: The overall performance distribution indicates that a significant portion of students are clustered in the mid-range score buckets, particularly between 50-60 and 60-70. However, there is a concerning number of students scoring below the passing threshold of 40, which suggests a need for targeted interventions.\n\nInsights: Concentration in Mid-Range Scores: The dominant score bucket is 50-60, comprising 28.8% of the class, indicating that many students are performing at a moderate level. This suggests a potential ceiling effect where students may be struggling to progress beyond this range. | Significant Below-Pass Threshold: A total of 49 students, or 7.6% of the class, are scoring below the passing threshold of 40, which highlights a critical area for improvement and necessitates immediate instructional support.\n\nEducational implications: The concentration of students in the mid-range suggests a need for differentiated instruction to help students advance to higher performance levels.\n\nRecommendations: high - Implement targeted intervention programs for students scoring below 40. - Addressing the needs of students who are struggling will help improve overall class performance and reduce the number of students at risk of failing. | medium - Provide enrichment opportunities for students in the 50-60 range to challenge them and promote higher achievement. - Encouraging higher-level thinking and problem-solving can help students break through the performance ceiling observed in the mid-range.",
  "structured_payload": {
    "task_id": "A-B01",
    "execution_id": "exec_1781847231655_3078f027",
    "explanation": {
      "summary": "The overall performance distribution indicates that a significant portion of students are clustered in the mid-range score buckets, particularly between 50-60 and 60-70. However, there is a concerning number of students scoring below the passing threshold of 40, which suggests a need for targeted interventions.",
      "insights": [
        {
          "title": "Concentration in Mid-Range Scores",
          "description": "The dominant score bucket is 50-60, comprising 28.8% of the class, indicating that many students are performing at a moderate level. This suggests a potential ceiling effect where students may be struggling to progress beyond this range.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 187,
              "comparison": "baseline",
              "delta": null,
              "context": "Dominant score bucket"
            }
          ]
        },
        {
          "title": "Significant Below-Pass Threshold",
          "description": "A total of 49 students, or 7.6% of the class, are scoring below the passing threshold of 40, which highlights a critical area for improvement and necessitates immediate instructional support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 49,
              "comparison": "baseline",
              "delta": null,
              "context": "Students below passing threshold"
            }
          ]
        }
      ],
      "educational_implications": [
        "The concentration of students in the mid-range suggests a need for differentiated instruction to help students advance to higher performance levels."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted intervention programs for students scoring below 40.",
          "rationale": "Addressing the needs of students who are struggling will help improve overall class performance and reduce the number of students at risk of failing."
        },
        {
          "priority": "medium",
          "action": "Provide enrichment opportunities for students in the 50-60 range to challenge them and promote higher achievement.",
          "rationale": "Encouraging higher-level thinking and problem-solving can help students break through the performance ceiling observed in the mid-range."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a comprehensive distribution analysis, providing a clear picture of student performance.",
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
    "full_result_row_count": 10,
    "included_row_count": 10,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "score_distribution",
        "row_count": 10,
        "included_row_count": 10
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 10,
    "baseline_reference_tokens": 313,
    "task_aware_prompt_tokens": 914,
    "token_ratio": 2.9201,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.9201 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 11871,
      "token_usage": {
        "prompt_tokens": 1700,
        "completion_tokens": 536,
        "total_tokens": 2236
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000577
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-B01__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "eb30d86216d8d5a5f3df9ff54c2bed6b0d9d10e9653f7a19caeb94a73a604456",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1700,
      "completion_tokens": 536,
      "total_tokens": 2236
    },
    "latency_ms": 11888,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-B01",
    "execution_id": "exec_1781847231655_3078f027",
    "explanation": {
      "summary": "The overall performance distribution indicates that a significant portion of students are clustered in the mid-range score buckets, particularly between 50-60 and 60-70. However, there is a concerning number of students scoring below the passing threshold of 40, which suggests a need for targeted interventions.",
      "insights": [
        {
          "title": "Concentration in Mid-Range Scores",
          "description": "The dominant score bucket is 50-60, comprising 28.8% of the class, indicating that many students are performing at a moderate level. This suggests a potential ceiling effect where students may be struggling to progress beyond this range.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 187,
              "comparison": "baseline",
              "delta": null,
              "context": "Dominant score bucket"
            }
          ]
        },
        {
          "title": "Significant Below-Pass Threshold",
          "description": "A total of 49 students, or 7.6% of the class, are scoring below the passing threshold of 40, which highlights a critical area for improvement and necessitates immediate instructional support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 49,
              "comparison": "baseline",
              "delta": null,
              "context": "Students below passing threshold"
            }
          ]
        }
      ],
      "educational_implications": [
        "The concentration of students in the mid-range suggests a need for differentiated instruction to help students advance to higher performance levels."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted intervention programs for students scoring below 40.",
          "rationale": "Addressing the needs of students who are struggling will help improve overall class performance and reduce the number of students at risk of failing."
        },
        {
          "priority": "medium",
          "action": "Provide enrichment opportunities for students in the 50-60 range to challenge them and promote higher achievement.",
          "rationale": "Encouraging higher-level thinking and problem-solving can help students break through the performance ceiling observed in the mid-range."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a comprehensive distribution analysis, providing a clear picture of student performance.",
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
    "full_result_row_count": 10,
    "included_row_count": 10,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "score_distribution",
        "row_count": 10,
        "included_row_count": 10
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 10,
    "baseline_reference_tokens": 313,
    "task_aware_prompt_tokens": 914,
    "token_ratio": 2.9201,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.9201 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 11871,
      "token_usage": {
        "prompt_tokens": 1700,
        "completion_tokens": 536,
        "total_tokens": 2236
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000577
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
    "expected": 10,
    "observed": 10
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "c6f52e5d026054892d52e98d1e9d748ac2e6f00ffff32d6820c814970c855f80",
    "expected_values": [
      "c6f52e5d026054892d52e98d1e9d748ac2e6f00ffff32d6820c814970c855f80"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "df628c9e756173fa56c95830ad55dd6d85e32e50a5c96d7ad99985910fb17ab9",
    "expected": "df628c9e756173fa56c95830ad55dd6d85e32e50a5c96d7ad99985910fb17ab9"
  },
  {
    "check_id": "numeric_fields_score_distribution",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "score_distribution",
    "numeric_columns": [
      "avg_score_in_bucket",
      "pct_of_class",
      "student_count"
    ],
    "numeric_summaries": {
      "avg_score_in_bucket": {
        "count": 10,
        "min": 7.78,
        "max": 90.48
      },
      "pct_of_class": {
        "count": 10,
        "min": 0.5,
        "max": 28.8
      },
      "student_count": {
        "count": 10,
        "min": 3,
        "max": 187
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
