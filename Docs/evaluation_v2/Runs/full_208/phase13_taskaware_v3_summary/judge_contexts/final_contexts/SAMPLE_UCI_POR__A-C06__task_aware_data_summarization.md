# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C06__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-C06__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-C06",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C06__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "adf25a943b4e70683bdc6e833461955cd9814a3293ecb8783bad18d5b2788c7c",
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
  "raw_text": "Summary: Both students in the dataset exhibit no recorded resource usage, indicating a lack of engagement with available learning resources. This suggests a uniform pattern of disengagement across the group.\n\nInsights: No Resource Engagement: Neither student has recorded any clicks or engagement with resources, resulting in a vle_diversity_score of 0 for both. This indicates a complete absence of resource utilization.\n\nEducational implications: The lack of resource engagement suggests a need for interventions to encourage students to utilize available learning materials.\n\nRecommendations: high - Implement targeted outreach to both students to understand barriers to resource usage. - Understanding the reasons behind the lack of engagement can help tailor interventions to improve resource utilization. | medium - Introduce mandatory resource engagement activities. - Encouraging students to interact with resources may enhance their learning experience and improve overall engagement.",
  "structured_payload": {
    "task_id": "A-C06",
    "execution_id": "exec_1781847232074_cf418da8",
    "explanation": {
      "summary": "Both students in the dataset exhibit no recorded resource usage, indicating a lack of engagement with available learning resources. This suggests a uniform pattern of disengagement across the group.",
      "insights": [
        {
          "title": "No Resource Engagement",
          "description": "Neither student has recorded any clicks or engagement with resources, resulting in a vle_diversity_score of 0 for both. This indicates a complete absence of resource utilization.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_clicks",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have not engaged with any resources."
            },
            {
              "metric": "used_resource_types",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have not utilized any resource types."
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
          "action": "Implement targeted outreach to both students to understand barriers to resource usage.",
          "rationale": "Understanding the reasons behind the lack of engagement can help tailor interventions to improve resource utilization."
        },
        {
          "priority": "medium",
          "action": "Introduce mandatory resource engagement activities.",
          "rationale": "Encouraging students to interact with resources may enhance their learning experience and improve overall engagement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset provides sufficient evidence of no recorded resource usage for both students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "multi_metric_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "resource_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 2,
    "baseline_reference_tokens": 159,
    "task_aware_prompt_tokens": 856,
    "token_ratio": 5.3836,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (5.3836 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5763,
      "token_usage": {
        "prompt_tokens": 1403,
        "completion_tokens": 394,
        "total_tokens": 1797
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000447
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C06__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "adf25a943b4e70683bdc6e833461955cd9814a3293ecb8783bad18d5b2788c7c",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1403,
      "completion_tokens": 394,
      "total_tokens": 1797
    },
    "latency_ms": 5773,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C06",
    "execution_id": "exec_1781847232074_cf418da8",
    "explanation": {
      "summary": "Both students in the dataset exhibit no recorded resource usage, indicating a lack of engagement with available learning resources. This suggests a uniform pattern of disengagement across the group.",
      "insights": [
        {
          "title": "No Resource Engagement",
          "description": "Neither student has recorded any clicks or engagement with resources, resulting in a vle_diversity_score of 0 for both. This indicates a complete absence of resource utilization.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_clicks",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have not engaged with any resources."
            },
            {
              "metric": "used_resource_types",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have not utilized any resource types."
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
          "action": "Implement targeted outreach to both students to understand barriers to resource usage.",
          "rationale": "Understanding the reasons behind the lack of engagement can help tailor interventions to improve resource utilization."
        },
        {
          "priority": "medium",
          "action": "Introduce mandatory resource engagement activities.",
          "rationale": "Encouraging students to interact with resources may enhance their learning experience and improve overall engagement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset provides sufficient evidence of no recorded resource usage for both students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "multi_metric_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "resource_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 2,
    "baseline_reference_tokens": 159,
    "task_aware_prompt_tokens": 856,
    "token_ratio": 5.3836,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (5.3836 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5763,
      "token_usage": {
        "prompt_tokens": 1403,
        "completion_tokens": 394,
        "total_tokens": 1797
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000447
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
