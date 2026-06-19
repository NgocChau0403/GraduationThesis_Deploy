# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C06__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-C06__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-C06",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
}
```

## Task Context

```json
{
  "task_name": "Compare resource usage",
  "scope": "2 students",
  "actionable_question": "Is one student using resources more strategically than the other?",
  "target_audience": "instructor",
  "ai_summary_type": "multi_metric_comparison",
  "ai_prompt_hint": "Highlight who is more diversified in resource use. Note if one avoids forums/quizzes.",
  "query_labels": [
    "resource_comparison"
  ],
  "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement",
    "event [OULAD only]"
  ],
  "key_db_fields": [
    "resource_type",
    "engagement_count; vle_diversity_score [FE cross]",
    "forum_engagement_rate [FE cross]",
    "quiz_engagement_rate [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "resource_comparison"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-C06-CORE-01",
      "description": "Highlight who is more diversified in resource use."
    },
    {
      "requirement_id": "A-C06-CORE-02",
      "description": "Note if one avoids forums/quizzes."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Retained as applicable because it compares two identifiable students; risk is lower than lifestyle/background tasks but not absent."
}
```

## Deterministic Derived-Stat Evidence

```json
[]
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "resource_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-C06.json",
      "artifact_sha256": "1217e49edd14b371c1a60fd0a4284900204c346b731579f3dc942372c7df60c1",
      "row_count": 2,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 2,
  "prompt_embedded_row_count": 2,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "1217e49edd14b371c1a60fd0a4284900204c346b731579f3dc942372c7df60c1",
  "evidence_rows_sha256": "0401485960956ef69ee9c5fd7284b75e9e6c582fe4216b9da678f4df40d4fb97",
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
  "full_result_row_count": 2,
  "embedded_datasets_sha256": "0401485960956ef69ee9c5fd7284b75e9e6c582fe4216b9da678f4df40d4fb97",
  "datasets": {
    "resource_comparison": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "resource_type": null,
        "clicks": 0,
        "pct_of_total": null,
        "vle_diversity_score": 0,
        "has_engagement_data": false,
        "total_clicks": 0,
        "used_resource_types": 0,
        "evidence_row_type": "no_recorded_resource_usage"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "resource_type": null,
        "clicks": 0,
        "pct_of_total": null,
        "vle_diversity_score": 0,
        "has_engagement_data": false,
        "total_clicks": 0,
        "used_resource_types": 0,
        "evidence_row_type": "no_recorded_resource_usage"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C06__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "61316b37ea1633996cf70368bfacb6c12c81ca55ff35f5476bcb1f4d4231e23d",
  "generator_input_sha256": "5784c5587481b944ff5c4adb91c7a9aa70f7a0612df76e000f1bfe1a03954042",
  "generator_input_compact": {
    "task_id": "A-C06",
    "execution_id": "exec_1781847232074_cf418da8",
    "task_name": "Compare resource usage",
    "analysis_type": "comparison",
    "explanation_strategy": "comparison",
    "actionable_question": "Is one student using resources more strategically than the other?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "resource_comparison"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "resource_comparison"
    ],
    "dataset_row_counts": {
      "resource_comparison": 2
    },
    "ai_summary_config_summary": {
      "summary_type": "multi_metric_comparison",
      "metric_column": null,
      "entity_column": "student_id",
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
  "raw_text": "Summary: Both students in the dataset show no recorded resource usage, indicating a lack of engagement with available learning resources. Consequently, there are no discernible differences in their resource utilization strategies.\n\nInsights: No Resource Engagement: Neither student has engaged with any resources, as evidenced by zero clicks and total clicks. This indicates a complete absence of resource usage for both students.\n\nEducational implications: The lack of resource engagement suggests a need for interventions to encourage students to utilize available learning materials.\n\nRecommendations: high - Implement targeted outreach to both students to promote resource usage. - Encouraging resource engagement can enhance learning outcomes and improve overall academic performance.",
  "structured_payload": {
    "task_id": "A-C06",
    "execution_id": "exec_1781847232074_cf418da8",
    "explanation": {
      "summary": "Both students in the dataset show no recorded resource usage, indicating a lack of engagement with available learning resources. Consequently, there are no discernible differences in their resource utilization strategies.",
      "insights": [
        {
          "title": "No Resource Engagement",
          "description": "Neither student has engaged with any resources, as evidenced by zero clicks and total clicks. This indicates a complete absence of resource usage for both students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_clicks",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have not utilized any resources."
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of resource engagement suggests a need for interventions to encourage students to utilize available learning materials."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted outreach to both students to promote resource usage.",
          "rationale": "Encouraging resource engagement can enhance learning outcomes and improve overall academic performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset clearly indicates no recorded resource usage for both students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "resource_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4768,
      "token_usage": {
        "prompt_tokens": 866,
        "completion_tokens": 290,
        "total_tokens": 1156
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000304
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C06__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "61316b37ea1633996cf70368bfacb6c12c81ca55ff35f5476bcb1f4d4231e23d",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 866,
      "completion_tokens": 290,
      "total_tokens": 1156
    },
    "latency_ms": 4780,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C06",
    "execution_id": "exec_1781847232074_cf418da8",
    "explanation": {
      "summary": "Both students in the dataset show no recorded resource usage, indicating a lack of engagement with available learning resources. Consequently, there are no discernible differences in their resource utilization strategies.",
      "insights": [
        {
          "title": "No Resource Engagement",
          "description": "Neither student has engaged with any resources, as evidenced by zero clicks and total clicks. This indicates a complete absence of resource usage for both students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_clicks",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have not utilized any resources."
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of resource engagement suggests a need for interventions to encourage students to utilize available learning materials."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted outreach to both students to promote resource usage.",
          "rationale": "Encouraging resource engagement can enhance learning outcomes and improve overall academic performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset clearly indicates no recorded resource usage for both students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "resource_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4768,
      "token_usage": {
        "prompt_tokens": 866,
        "completion_tokens": 290,
        "total_tokens": 1156
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000304
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
    "expected": 2,
    "observed": 2
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "1217e49edd14b371c1a60fd0a4284900204c346b731579f3dc942372c7df60c1",
    "expected_values": [
      "1217e49edd14b371c1a60fd0a4284900204c346b731579f3dc942372c7df60c1"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "0401485960956ef69ee9c5fd7284b75e9e6c582fe4216b9da678f4df40d4fb97",
    "expected": "0401485960956ef69ee9c5fd7284b75e9e6c582fe4216b9da678f4df40d4fb97"
  },
  {
    "check_id": "numeric_fields_resource_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "resource_comparison",
    "numeric_columns": [
      "clicks",
      "total_clicks",
      "used_resource_types",
      "vle_diversity_score"
    ],
    "numeric_summaries": {
      "clicks": {
        "count": 2,
        "min": 0,
        "max": 0
      },
      "total_clicks": {
        "count": 2,
        "min": 0,
        "max": 0
      },
      "used_resource_types": {
        "count": 2,
        "min": 0,
        "max": 0
      },
      "vle_diversity_score": {
        "count": 2,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_resource_comparison",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "resource_comparison",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
