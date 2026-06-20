# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G10__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G10__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G10",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Consistency analysis across cohort",
  "scope": "Many students",
  "actionable_question": "How many students are cramming instead of studying consistently?",
  "target_audience": "instructor",
  "ai_summary_type": "categorical_distribution",
  "ai_prompt_hint": "Describe the distribution of students across high, medium, and low consistency using student_count and pct_students. Use avg_weekly_stddev and avg_active_weeks to explain what low consistency means, then recommend study-routine interventions for the low group.",
  "query_labels": [
    "consistency_distribution"
  ],
  "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement [OULAD only]"
  ],
  "key_db_fields": [
    "consistency_level [FE cross]",
    "student_count [FE cross]",
    "pct_students [FE cross]",
    "avg_weekly_stddev",
    "avg_weekly_clicks",
    "avg_active_weeks"
  ],
  "output_schema": {
    "required_columns": [
      "consistency_level",
      "student_count"
    ],
    "optional_columns": [
      "pct_students",
      "avg_weekly_stddev",
      "avg_weekly_clicks",
      "avg_active_weeks"
    ]
  },
  "query_labels": [
    "consistency_distribution"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G10-CORE-01",
      "description": "Describe the distribution of students across high, medium, and low consistency using returned cohort counts or percentages."
    },
    {
      "requirement_id": "A-G10-CORE-02",
      "description": "Explain what low consistency means by reference to returned spread and active-week metrics."
    },
    {
      "requirement_id": "A-G10-CORE-03",
      "description": "Recommend study-routine interventions targeted at the low-consistency group."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G10-CONSTRAINT-01",
      "description": "Do not conflate low consistency with low effort."
    },
    {
      "constraint_id": "A-G10-CONSTRAINT-02",
      "description": "Acknowledge that observed study patterns may reflect employment, health, accessibility, or family obligations when making recommendations."
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
      "dataset_label": "consistency_distribution",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G10.json",
      "artifact_sha256": "b1ae43be27511d13b998754ae5363baea6e1ec9aec7d0011932b6180dec172cf",
      "row_count": 3,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 3,
  "prompt_embedded_row_count": 3,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "b1ae43be27511d13b998754ae5363baea6e1ec9aec7d0011932b6180dec172cf",
  "evidence_rows_sha256": "0459aaaad12d374eea7e3e0c3ca17eab25c1285f9fa881d3c519dda421f1675c",
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
  "full_result_row_count": 3,
  "embedded_datasets_sha256": "0459aaaad12d374eea7e3e0c3ca17eab25c1285f9fa881d3c519dda421f1675c",
  "datasets": {
    "consistency_distribution": [
      {
        "consistency_level": "high",
        "student_count": 760,
        "pct_students": 0.3042,
        "avg_weekly_stddev": 18.59,
        "avg_weekly_clicks": 19.34,
        "avg_active_weeks": 12.43
      },
      {
        "consistency_level": "medium",
        "student_count": 759,
        "pct_students": 0.3038,
        "avg_weekly_stddev": 45.68,
        "avg_weekly_clicks": 38.26,
        "avg_active_weeks": 22.12
      },
      {
        "consistency_level": "low",
        "student_count": 979,
        "pct_students": 0.3919,
        "avg_weekly_stddev": 88.2,
        "avg_weekly_clicks": 68.81,
        "avg_active_weeks": 21.8
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G10__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "e3fd36da627a53464af02b5b6a99fea349f5311b6cec010cb9ffb5c6a3aa95a9",
  "generator_input_sha256": "79d2955a54d1336db1dc309302907bfdfb63d7cf38a625005ec186ffbe954d19",
  "generator_input_compact": {
    "task_id": "A-G10",
    "execution_id": "exec_1781847762536_110a89af",
    "task_name": "Consistency analysis across cohort",
    "analysis_type": "distribution",
    "explanation_strategy": "distribution",
    "actionable_question": "How many students are cramming instead of studying consistently?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "consistency_distribution"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "consistency_distribution"
    ],
    "dataset_row_counts": {
      "consistency_distribution": 3
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
  "raw_text": "Summary: The distribution of students across consistency levels reveals a significant majority in the low consistency category, indicating a potential issue with study habits. The high and medium consistency groups are nearly equal in size but represent a smaller portion of the overall cohort.\n\nInsights: Prevalence of Low Consistency: A substantial 39.19% of students fall into the low consistency category, with an average weekly standard deviation of 88.2, suggesting erratic study patterns. This contrasts sharply with the high consistency group, which comprises only 30.42% of students and has a much lower average weekly standard deviation of 18.59. | Active Weeks and Engagement: Students in the low consistency group average 21.8 active weeks, indicating that while they are engaged for a significant duration, their study habits are inconsistent, as evidenced by their high average weekly standard deviation.\n\nEducational implications: The high percentage of students in the low consistency category suggests a need for targeted interventions to promote consistent study habits.\n\nRecommendations: high - Implement structured study schedules and regular check-ins for students in the low consistency group. - Providing a framework for consistent study can help reduce variability in engagement and improve overall academic performance.",
  "structured_payload": {
    "task_id": "A-G10",
    "execution_id": "exec_1781847762536_110a89af",
    "explanation": {
      "summary": "The distribution of students across consistency levels reveals a significant majority in the low consistency category, indicating a potential issue with study habits. The high and medium consistency groups are nearly equal in size but represent a smaller portion of the overall cohort.",
      "insights": [
        {
          "title": "Prevalence of Low Consistency",
          "description": "A substantial 39.19% of students fall into the low consistency category, with an average weekly standard deviation of 88.2, suggesting erratic study patterns. This contrasts sharply with the high consistency group, which comprises only 30.42% of students and has a much lower average weekly standard deviation of 18.59.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_students",
              "value": 0.3919,
              "comparison": "baseline",
              "delta": null,
              "context": "Low consistency group percentage"
            }
          ]
        },
        {
          "title": "Active Weeks and Engagement",
          "description": "Students in the low consistency group average 21.8 active weeks, indicating that while they are engaged for a significant duration, their study habits are inconsistent, as evidenced by their high average weekly standard deviation.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_active_weeks",
              "value": 21.8,
              "comparison": "baseline",
              "delta": null,
              "context": "Average active weeks for low consistency group"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high percentage of students in the low consistency category suggests a need for targeted interventions to promote consistent study habits."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement structured study schedules and regular check-ins for students in the low consistency group.",
          "rationale": "Providing a framework for consistent study can help reduce variability in engagement and improve overall academic performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear breakdown of student consistency levels.",
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
    "full_result_row_count": 3,
    "included_row_count": 3,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "consistency_distribution",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8475,
      "token_usage": {
        "prompt_tokens": 897,
        "completion_tokens": 479,
        "total_tokens": 1376
      },
      "strategy": "distribution",
      "granularity": "weekly",
      "cost_usd": 0.000422
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G10__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "e3fd36da627a53464af02b5b6a99fea349f5311b6cec010cb9ffb5c6a3aa95a9",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 897,
      "completion_tokens": 479,
      "total_tokens": 1376
    },
    "latency_ms": 8516,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G10",
    "execution_id": "exec_1781847762536_110a89af",
    "explanation": {
      "summary": "The distribution of students across consistency levels reveals a significant majority in the low consistency category, indicating a potential issue with study habits. The high and medium consistency groups are nearly equal in size but represent a smaller portion of the overall cohort.",
      "insights": [
        {
          "title": "Prevalence of Low Consistency",
          "description": "A substantial 39.19% of students fall into the low consistency category, with an average weekly standard deviation of 88.2, suggesting erratic study patterns. This contrasts sharply with the high consistency group, which comprises only 30.42% of students and has a much lower average weekly standard deviation of 18.59.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_students",
              "value": 0.3919,
              "comparison": "baseline",
              "delta": null,
              "context": "Low consistency group percentage"
            }
          ]
        },
        {
          "title": "Active Weeks and Engagement",
          "description": "Students in the low consistency group average 21.8 active weeks, indicating that while they are engaged for a significant duration, their study habits are inconsistent, as evidenced by their high average weekly standard deviation.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_active_weeks",
              "value": 21.8,
              "comparison": "baseline",
              "delta": null,
              "context": "Average active weeks for low consistency group"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high percentage of students in the low consistency category suggests a need for targeted interventions to promote consistent study habits."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement structured study schedules and regular check-ins for students in the low consistency group.",
          "rationale": "Providing a framework for consistent study can help reduce variability in engagement and improve overall academic performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear breakdown of student consistency levels.",
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
    "full_result_row_count": 3,
    "included_row_count": 3,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "consistency_distribution",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8475,
      "token_usage": {
        "prompt_tokens": 897,
        "completion_tokens": 479,
        "total_tokens": 1376
      },
      "strategy": "distribution",
      "granularity": "weekly",
      "cost_usd": 0.000422
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
    "expected": 3,
    "observed": 3
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "b1ae43be27511d13b998754ae5363baea6e1ec9aec7d0011932b6180dec172cf",
    "expected_values": [
      "b1ae43be27511d13b998754ae5363baea6e1ec9aec7d0011932b6180dec172cf"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "0459aaaad12d374eea7e3e0c3ca17eab25c1285f9fa881d3c519dda421f1675c",
    "expected": "0459aaaad12d374eea7e3e0c3ca17eab25c1285f9fa881d3c519dda421f1675c"
  },
  {
    "check_id": "numeric_fields_consistency_distribution",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "consistency_distribution",
    "numeric_columns": [
      "avg_active_weeks",
      "avg_weekly_clicks",
      "avg_weekly_stddev",
      "pct_students",
      "student_count"
    ],
    "numeric_summaries": {
      "avg_active_weeks": {
        "count": 3,
        "min": 12.43,
        "max": 22.12
      },
      "avg_weekly_clicks": {
        "count": 3,
        "min": 19.34,
        "max": 68.81
      },
      "avg_weekly_stddev": {
        "count": 3,
        "min": 18.59,
        "max": 88.2
      },
      "pct_students": {
        "count": 3,
        "min": 0.3038,
        "max": 0.3919
      },
      "student_count": {
        "count": 3,
        "min": 759,
        "max": 979
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_consistency_distribution",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "consistency_distribution",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
