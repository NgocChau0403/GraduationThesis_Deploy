# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S06__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-S06__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-S06",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Student submission & punctuality",
  "scope": "1 student",
  "actionable_question": "Is this student consistently submitting late and does it affect their score?",
  "target_audience": "instructor",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "State average delay and punctuality rate. Identify if late submission is systematic. Suggest deadline reminder or check-in.",
  "query_labels": [
    "submission_lateness"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
    "assessment_result",
    "assessment [OULAD only]"
  ],
  "key_db_fields": [
    "submission_delay_days",
    "score_normalized",
    "assessment_type; submission_delay_avg [FE cross]",
    "punctuality_rate [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "submission_lateness"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-S06-CORE-01",
      "description": "State average delay and punctuality rate."
    },
    {
      "requirement_id": "A-S06-CORE-02",
      "description": "Identify if late submission is systematic."
    },
    {
      "requirement_id": "A-S06-CORE-03",
      "description": "Suggest deadline reminder or check-in."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-S06-CONSTRAINT-01",
      "description": "Do not characterise late submission as low motivation or a personal failing."
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
      "dataset_label": "submission_lateness",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S06.json",
      "artifact_sha256": "b2f9a742e64ee4309fbf4d8bdfb28815fdabeb3179bb61ef701ef47d7678adbb",
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
  "evidence_artifact_file_sha256": "b2f9a742e64ee4309fbf4d8bdfb28815fdabeb3179bb61ef701ef47d7678adbb",
  "evidence_rows_sha256": "e40b3d0befcd610cd5ca02e7f29adbc7227359cc361bd632cc73b8dd2ee31a94",
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
  "embedded_datasets_sha256": "e40b3d0befcd610cd5ca02e7f29adbc7227359cc361bd632cc73b8dd2ee31a94",
  "datasets": {
    "submission_lateness": [
      {
        "assessment_order": 1,
        "assessment_type": "quiz",
        "assessment_name": "G1",
        "due_day": 21,
        "submission_day": null,
        "submission_delay_days": null,
        "score_normalized": 0,
        "pass_flag": false,
        "submission_delay_avg": null,
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 2,
        "assessment_type": "quiz",
        "assessment_name": "G2",
        "due_day": 56,
        "submission_day": null,
        "submission_delay_days": null,
        "score_normalized": 55,
        "pass_flag": true,
        "submission_delay_avg": null,
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 3,
        "assessment_type": "exam",
        "assessment_name": "G3",
        "due_day": 98,
        "submission_day": null,
        "submission_delay_days": null,
        "score_normalized": 55,
        "pass_flag": true,
        "submission_delay_avg": null,
        "punctuality_rate": "0"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S06__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "0d90f665e5db82bf86de040a876a99f54f1c1107b0e3640468dfd2ae7cbed0e4",
  "generator_input_sha256": "3bce3cc0292316825bc3c758793c70d670283918c4c90a29490cfef859b5f988",
  "generator_input_compact": {
    "task_id": "A-S06",
    "execution_id": "exec_1781847238116_9a09e9a9",
    "task_name": "Student submission & punctuality",
    "analysis_type": "distribution",
    "explanation_strategy": "behavioral",
    "actionable_question": "Is this student consistently submitting late and does it affect their score?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "submission_lateness"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "submission_lateness"
    ],
    "dataset_row_counts": {
      "submission_lateness": 3
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "submission_delay_days",
      "entity_column": null,
      "group_column": null,
      "time_column": "assessment_order",
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
  "raw_text": "Summary: The student has consistently failed to submit assessments on time, as indicated by a punctuality rate of 0 across all assessments. This pattern suggests a systematic issue with submission behavior, which may negatively impact their overall engagement and performance.\n\nInsights: Consistent Late Submissions: The student has not submitted any assessments by the due dates, resulting in a punctuality rate of 0 for all quizzes and the exam.\n\nEducational implications: The lack of timely submissions may hinder the student's learning progress and understanding of course material.\n\nRecommendations: high - Implement deadline reminders for upcoming assessments. - Regular reminders may help the student manage their time better and improve submission punctuality. | medium - Conduct a check-in with the student to discuss barriers to timely submissions. - Understanding the reasons behind late submissions can inform tailored support strategies.",
  "structured_payload": {
    "task_id": "A-S06",
    "execution_id": "exec_1781847238116_9a09e9a9",
    "explanation": {
      "summary": "The student has consistently failed to submit assessments on time, as indicated by a punctuality rate of 0 across all assessments. This pattern suggests a systematic issue with submission behavior, which may negatively impact their overall engagement and performance.",
      "insights": [
        {
          "title": "Consistent Late Submissions",
          "description": "The student has not submitted any assessments by the due dates, resulting in a punctuality rate of 0 for all quizzes and the exam.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "stable",
              "delta": null,
              "context": "All assessments show a punctuality rate of 0"
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of timely submissions may hinder the student's learning progress and understanding of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement deadline reminders for upcoming assessments.",
          "rationale": "Regular reminders may help the student manage their time better and improve submission punctuality."
        },
        {
          "priority": "medium",
          "action": "Conduct a check-in with the student to discuss barriers to timely submissions.",
          "rationale": "Understanding the reasons behind late submissions can inform tailored support strategies."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and clearly indicates submission patterns.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
        "dataset_name": "submission_lateness",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4775,
      "token_usage": {
        "prompt_tokens": 919,
        "completion_tokens": 345,
        "total_tokens": 1264
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000345
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S06__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "0d90f665e5db82bf86de040a876a99f54f1c1107b0e3640468dfd2ae7cbed0e4",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 919,
      "completion_tokens": 345,
      "total_tokens": 1264
    },
    "latency_ms": 4797,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S06",
    "execution_id": "exec_1781847238116_9a09e9a9",
    "explanation": {
      "summary": "The student has consistently failed to submit assessments on time, as indicated by a punctuality rate of 0 across all assessments. This pattern suggests a systematic issue with submission behavior, which may negatively impact their overall engagement and performance.",
      "insights": [
        {
          "title": "Consistent Late Submissions",
          "description": "The student has not submitted any assessments by the due dates, resulting in a punctuality rate of 0 for all quizzes and the exam.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "stable",
              "delta": null,
              "context": "All assessments show a punctuality rate of 0"
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of timely submissions may hinder the student's learning progress and understanding of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement deadline reminders for upcoming assessments.",
          "rationale": "Regular reminders may help the student manage their time better and improve submission punctuality."
        },
        {
          "priority": "medium",
          "action": "Conduct a check-in with the student to discuss barriers to timely submissions.",
          "rationale": "Understanding the reasons behind late submissions can inform tailored support strategies."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and clearly indicates submission patterns.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
        "dataset_name": "submission_lateness",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4775,
      "token_usage": {
        "prompt_tokens": 919,
        "completion_tokens": 345,
        "total_tokens": 1264
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000345
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
    "observed": "b2f9a742e64ee4309fbf4d8bdfb28815fdabeb3179bb61ef701ef47d7678adbb",
    "expected_values": [
      "b2f9a742e64ee4309fbf4d8bdfb28815fdabeb3179bb61ef701ef47d7678adbb"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "e40b3d0befcd610cd5ca02e7f29adbc7227359cc361bd632cc73b8dd2ee31a94",
    "expected": "e40b3d0befcd610cd5ca02e7f29adbc7227359cc361bd632cc73b8dd2ee31a94"
  },
  {
    "check_id": "numeric_fields_submission_lateness",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "submission_lateness",
    "numeric_columns": [
      "assessment_order",
      "due_day",
      "score_normalized"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 3,
        "min": 1,
        "max": 3
      },
      "due_day": {
        "count": 3,
        "min": 21,
        "max": 98
      },
      "score_normalized": {
        "count": 3,
        "min": 0,
        "max": 55
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_submission_lateness",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "submission_lateness",
    "flag_columns": [
      "pass_flag"
    ],
    "triggered_like_counts": {
      "pass_flag": 2
    }
  }
]
```
