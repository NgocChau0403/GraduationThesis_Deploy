# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__S-T12__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T12__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T12",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Procrastination analysis",
  "scope": "1 student",
  "actionable_question": "Am I a procrastinator and is it costing me marks?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Use submission_delay_avg [FE]. Identify if late submission is systematic. Link to score.",
  "query_labels": [
    "submission_series",
    "punctuality_summary"
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
    "pass_flag; submission_delay_avg [FE cross]",
    "punctuality_rate [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "submission_series",
    "punctuality_summary"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T12-CORE-01",
      "description": "Identify whether late submission is systematic."
    },
    {
      "requirement_id": "S-T12-CORE-02",
      "description": "Describe the observed relationship between submission delay and score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T12-CONSTRAINT-01",
      "description": "Use submission_delay_avg as the primary delay metric; do not infer procrastination from score alone."
    },
    {
      "constraint_id": "S-T12-CONSTRAINT-02",
      "description": "Frame the delay-score relationship as correlational, not causal."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "submission_series",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T12.json",
      "artifact_sha256": "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
      "row_count": 5,
      "readable": true
    },
    {
      "dataset_label": "punctuality_summary",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T12.json",
      "artifact_sha256": "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
      "row_count": 1,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 6,
  "prompt_embedded_row_count": 6,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
  "evidence_rows_sha256": "2fbb4764f0f67c70091c032fff1ee6bb068b44c276b0fc288fa6fc5fddd3d3a5",
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
  "full_result_row_count": 6,
  "embedded_datasets_sha256": "2fbb4764f0f67c70091c032fff1ee6bb068b44c276b0fc288fa6fc5fddd3d3a5",
  "datasets": {
    "submission_series": [
      {
        "assessment_order": 1,
        "assessment_name": "24295",
        "assessment_type": "CMA",
        "due_day": 18,
        "submission_day": 21,
        "submission_delay_days": 3,
        "score_normalized": 100,
        "pass_flag": true
      },
      {
        "assessment_order": 3,
        "assessment_name": "24296",
        "assessment_type": "CMA",
        "due_day": 67,
        "submission_day": 69,
        "submission_delay_days": 2,
        "score_normalized": 87,
        "pass_flag": true
      },
      {
        "assessment_order": 5,
        "assessment_name": "24297",
        "assessment_type": "CMA",
        "due_day": 144,
        "submission_day": 147,
        "submission_delay_days": 3,
        "score_normalized": 90,
        "pass_flag": true
      },
      {
        "assessment_order": 8,
        "assessment_name": "24298",
        "assessment_type": "CMA",
        "due_day": 214,
        "submission_day": 219,
        "submission_delay_days": 5,
        "score_normalized": 83,
        "pass_flag": true
      },
      {
        "assessment_order": 9,
        "assessment_name": "24299",
        "assessment_type": "Exam",
        "due_day": null,
        "submission_day": 244,
        "submission_delay_days": null,
        "score_normalized": 96,
        "pass_flag": true
      }
    ],
    "punctuality_summary": [
      {
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T12__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "5bd692ebc114889b421095ab94a20ee318c86346c975a9e5530ffe0692638437",
  "generator_input_sha256": "05b8e1083278dd82c7508314f851e341be99b90587c7a073698bca7111eb1934",
  "generator_input_compact": {
    "task_id": "S-T12",
    "execution_id": "exec_1781847915522_4f14f1c0",
    "task_name": "Procrastination analysis",
    "analysis_type": "distribution",
    "explanation_strategy": "behavioral",
    "actionable_question": "Am I a procrastinator and is it costing me marks?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "submission_series",
      "punctuality_summary"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "submission_series",
      "punctuality_summary"
    ],
    "dataset_row_counts": {
      "submission_series": 5,
      "punctuality_summary": 1
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
  "raw_text": "Summary: Your submission patterns indicate a tendency to submit assignments late, which could impact your overall performance. While you are passing your assessments, the delays suggest a need for better time management.\n\nInsights: Consistent Late Submissions: You have an average submission delay of 3.25 days across your assessments, indicating a consistent pattern of submitting work after the due date. | Impact on Scores: Despite late submissions, your scores remain high, with the lowest being 83. However, the trend of submitting late could lead to stress and potential lower scores in the future.\n\nEducational implications: Late submissions may lead to increased stress and could affect your learning experience.\n\nRecommendations: high - Create a study schedule to manage your time better. - A structured schedule can help you complete assignments on time, reducing stress and improving your overall performance.",
  "structured_payload": {
    "task_id": "S-T12",
    "execution_id": "exec_1781847915522_4f14f1c0",
    "explanation": {
      "summary": "Your submission patterns indicate a tendency to submit assignments late, which could impact your overall performance. While you are passing your assessments, the delays suggest a need for better time management.",
      "insights": [
        {
          "title": "Consistent Late Submissions",
          "description": "You have an average submission delay of 3.25 days across your assessments, indicating a consistent pattern of submitting work after the due date.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "submission_delay_avg",
              "value": 3.25,
              "comparison": "stable",
              "delta": null,
              "context": "Average delay across multiple assessments"
            }
          ]
        },
        {
          "title": "Impact on Scores",
          "description": "Despite late submissions, your scores remain high, with the lowest being 83. However, the trend of submitting late could lead to stress and potential lower scores in the future.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "stable",
              "delta": null,
              "context": "Lowest score from late submission"
            }
          ]
        }
      ],
      "educational_implications": [
        "Late submissions may lead to increased stress and could affect your learning experience."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Create a study schedule to manage your time better.",
          "rationale": "A structured schedule can help you complete assignments on time, reducing stress and improving your overall performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is consistent and provides clear insights into submission behavior.",
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
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_series",
        "row_count": 5,
        "included_row_count": 5
      },
      {
        "dataset_name": "punctuality_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 14410,
      "token_usage": {
        "prompt_tokens": 1107,
        "completion_tokens": 399,
        "total_tokens": 1506
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000405
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T12__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "5bd692ebc114889b421095ab94a20ee318c86346c975a9e5530ffe0692638437",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1107,
      "completion_tokens": 399,
      "total_tokens": 1506
    },
    "latency_ms": 14414,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T12",
    "execution_id": "exec_1781847915522_4f14f1c0",
    "explanation": {
      "summary": "Your submission patterns indicate a tendency to submit assignments late, which could impact your overall performance. While you are passing your assessments, the delays suggest a need for better time management.",
      "insights": [
        {
          "title": "Consistent Late Submissions",
          "description": "You have an average submission delay of 3.25 days across your assessments, indicating a consistent pattern of submitting work after the due date.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "submission_delay_avg",
              "value": 3.25,
              "comparison": "stable",
              "delta": null,
              "context": "Average delay across multiple assessments"
            }
          ]
        },
        {
          "title": "Impact on Scores",
          "description": "Despite late submissions, your scores remain high, with the lowest being 83. However, the trend of submitting late could lead to stress and potential lower scores in the future.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "stable",
              "delta": null,
              "context": "Lowest score from late submission"
            }
          ]
        }
      ],
      "educational_implications": [
        "Late submissions may lead to increased stress and could affect your learning experience."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Create a study schedule to manage your time better.",
          "rationale": "A structured schedule can help you complete assignments on time, reducing stress and improving your overall performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is consistent and provides clear insights into submission behavior.",
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
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_series",
        "row_count": 5,
        "included_row_count": 5
      },
      {
        "dataset_name": "punctuality_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 14410,
      "token_usage": {
        "prompt_tokens": 1107,
        "completion_tokens": 399,
        "total_tokens": 1506
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000405
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
    "expected": 6,
    "observed": 6
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
    "expected_values": [
      "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
      "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "2fbb4764f0f67c70091c032fff1ee6bb068b44c276b0fc288fa6fc5fddd3d3a5",
    "expected": "2fbb4764f0f67c70091c032fff1ee6bb068b44c276b0fc288fa6fc5fddd3d3a5"
  },
  {
    "check_id": "numeric_fields_submission_series",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "submission_series",
    "numeric_columns": [
      "assessment_order",
      "score_normalized",
      "submission_day",
      "due_day",
      "submission_delay_days"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 5,
        "min": 1,
        "max": 9
      },
      "score_normalized": {
        "count": 5,
        "min": 83,
        "max": 100
      },
      "submission_day": {
        "count": 5,
        "min": 21,
        "max": 244
      },
      "due_day": {
        "count": 4,
        "min": 18,
        "max": 214
      },
      "submission_delay_days": {
        "count": 4,
        "min": 2,
        "max": 5
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_submission_series",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "submission_series",
    "flag_columns": [
      "pass_flag"
    ],
    "triggered_like_counts": {
      "pass_flag": 5
    }
  },
  {
    "check_id": "numeric_fields_punctuality_summary",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "punctuality_summary",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_punctuality_summary",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "punctuality_summary",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
