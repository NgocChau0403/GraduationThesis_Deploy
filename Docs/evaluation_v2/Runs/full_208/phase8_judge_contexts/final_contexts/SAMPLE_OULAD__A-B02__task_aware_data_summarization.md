# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-B02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-B02__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-B02",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Completion / outcome summary",
  "scope": "Cohort",
  "actionable_question": "How many students passed, failed, or withdrew?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "categorical_distribution",
  "ai_prompt_hint": "State pass/fail/withdrawal counts. Highlight proportion at-risk.",
  "query_labels": [
    "outcome_counts"
  ],
  "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment"
  ],
  "key_db_fields": [
    "final_outcome",
    "class_id"
  ],
  "output_schema": {},
  "query_labels": [
    "outcome_counts"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-B02-CORE-01",
      "description": "State pass/fail/withdrawal counts."
    },
    {
      "requirement_id": "A-B02-CORE-02",
      "description": "Highlight proportion at-risk."
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
      "dataset_label": "outcome_counts",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-B02.json",
      "artifact_sha256": "16185befb0c971718a221fc280a3c728b331cee25aae70ba22548114a9f4a3e2",
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
  "evidence_artifact_file_sha256": "16185befb0c971718a221fc280a3c728b331cee25aae70ba22548114a9f4a3e2",
  "evidence_rows_sha256": "92a29598b51baea9d9132baa0c8ead82b2edfb7b55733e1a6c4bdfb3224435f7",
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
  "embedded_datasets_sha256": "92a29598b51baea9d9132baa0c8ead82b2edfb7b55733e1a6c4bdfb3224435f7",
  "datasets": {
    "outcome_counts": [
      {
        "final_outcome": "Withdrawn",
        "student_count": 1077,
        "pct_of_class": "43.1"
      },
      {
        "final_outcome": "Pass",
        "student_count": 709,
        "pct_of_class": "28.4"
      },
      {
        "final_outcome": "Fail",
        "student_count": 406,
        "pct_of_class": "16.3"
      },
      {
        "final_outcome": "Distinction",
        "student_count": 306,
        "pct_of_class": "12.2"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B02__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "e3f69efac9b09fbe64e258c7a9b20042b6b39c33222fb9b9734fca9b1e7f19e4",
  "generator_input_sha256": "66dc6a1aa8a41ac9084a3f5bfbbe8dc4e6038c0d20296883d0501d16fa823c19",
  "generator_input_compact": {
    "task_id": "A-B02",
    "execution_id": "exec_1781847624955_4df8c593",
    "task_name": "Completion / outcome summary",
    "analysis_type": "aggregation",
    "explanation_strategy": "distribution",
    "actionable_question": "How many students passed, failed, or withdrew?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "outcome_counts"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "outcome_counts"
    ],
    "dataset_row_counts": {
      "outcome_counts": 4
    },
    "ai_summary_config_summary": {
      "summary_type": "categorical_distribution",
      "metric_column": null,
      "entity_column": null,
      "group_column": null,
      "time_column": null,
      "sort_by": "student_count",
      "sort_direction": "desc",
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
  "raw_text": "Summary: The distribution of final outcomes reveals that a significant portion of students withdrew from the course, with 43.1% not completing. The pass rate stands at 28.4%, indicating a concerning number of students at risk of failing or withdrawing.\n\nInsights: High Withdrawal Rate: With 1,077 students withdrawing, this represents 43.1% of the class, indicating a critical area of concern for student retention and engagement. | Low Pass Rate: Only 28.4% of students passed, which suggests that a substantial number of students are struggling to meet course requirements.\n\nEducational implications: The high withdrawal and low pass rates indicate a need for targeted interventions to support at-risk students.\n\nRecommendations: high - Implement early intervention strategies for students showing signs of disengagement. - Addressing the high withdrawal rate can help retain students and improve overall course completion. | medium - Enhance academic support services for students at risk of failing. - Improving support can increase the pass rate and reduce the number of students failing.",
  "structured_payload": {
    "task_id": "A-B02",
    "execution_id": "exec_1781847624955_4df8c593",
    "explanation": {
      "summary": "The distribution of final outcomes reveals that a significant portion of students withdrew from the course, with 43.1% not completing. The pass rate stands at 28.4%, indicating a concerning number of students at risk of failing or withdrawing.",
      "insights": [
        {
          "title": "High Withdrawal Rate",
          "description": "With 1,077 students withdrawing, this represents 43.1% of the class, indicating a critical area of concern for student retention and engagement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 1077,
              "comparison": "baseline",
              "delta": null,
              "context": "Total students withdrawn"
            }
          ]
        },
        {
          "title": "Low Pass Rate",
          "description": "Only 28.4% of students passed, which suggests that a substantial number of students are struggling to meet course requirements.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 709,
              "comparison": "baseline",
              "delta": null,
              "context": "Total students passed"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high withdrawal and low pass rates indicate a need for targeted interventions to support at-risk students."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement early intervention strategies for students showing signs of disengagement.",
          "rationale": "Addressing the high withdrawal rate can help retain students and improve overall course completion."
        },
        {
          "priority": "medium",
          "action": "Enhance academic support services for students at risk of failing.",
          "rationale": "Improving support can increase the pass rate and reduce the number of students failing."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear overview of student outcomes.",
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
        "dataset_name": "outcome_counts",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8046,
      "token_usage": {
        "prompt_tokens": 781,
        "completion_tokens": 453,
        "total_tokens": 1234
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000389
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B02__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "e3f69efac9b09fbe64e258c7a9b20042b6b39c33222fb9b9734fca9b1e7f19e4",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 781,
      "completion_tokens": 453,
      "total_tokens": 1234
    },
    "latency_ms": 8052,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-B02",
    "execution_id": "exec_1781847624955_4df8c593",
    "explanation": {
      "summary": "The distribution of final outcomes reveals that a significant portion of students withdrew from the course, with 43.1% not completing. The pass rate stands at 28.4%, indicating a concerning number of students at risk of failing or withdrawing.",
      "insights": [
        {
          "title": "High Withdrawal Rate",
          "description": "With 1,077 students withdrawing, this represents 43.1% of the class, indicating a critical area of concern for student retention and engagement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 1077,
              "comparison": "baseline",
              "delta": null,
              "context": "Total students withdrawn"
            }
          ]
        },
        {
          "title": "Low Pass Rate",
          "description": "Only 28.4% of students passed, which suggests that a substantial number of students are struggling to meet course requirements.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 709,
              "comparison": "baseline",
              "delta": null,
              "context": "Total students passed"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high withdrawal and low pass rates indicate a need for targeted interventions to support at-risk students."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement early intervention strategies for students showing signs of disengagement.",
          "rationale": "Addressing the high withdrawal rate can help retain students and improve overall course completion."
        },
        {
          "priority": "medium",
          "action": "Enhance academic support services for students at risk of failing.",
          "rationale": "Improving support can increase the pass rate and reduce the number of students failing."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear overview of student outcomes.",
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
        "dataset_name": "outcome_counts",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8046,
      "token_usage": {
        "prompt_tokens": 781,
        "completion_tokens": 453,
        "total_tokens": 1234
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000389
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
    "observed": "16185befb0c971718a221fc280a3c728b331cee25aae70ba22548114a9f4a3e2",
    "expected_values": [
      "16185befb0c971718a221fc280a3c728b331cee25aae70ba22548114a9f4a3e2"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "92a29598b51baea9d9132baa0c8ead82b2edfb7b55733e1a6c4bdfb3224435f7",
    "expected": "92a29598b51baea9d9132baa0c8ead82b2edfb7b55733e1a6c4bdfb3224435f7"
  },
  {
    "check_id": "numeric_fields_outcome_counts",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "outcome_counts",
    "numeric_columns": [
      "student_count"
    ],
    "numeric_summaries": {
      "student_count": {
        "count": 4,
        "min": 306,
        "max": 1077
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_outcome_counts",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "outcome_counts",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
