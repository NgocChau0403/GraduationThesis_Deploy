# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-C06__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-C06__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-C06",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
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

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "resource_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C06.json",
      "artifact_sha256": "4e437a4bf0a93b5080d2cf66ff3b46aa17062f7dbcfe5ea43f8c67fcee3d6a6c",
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
  "evidence_artifact_file_sha256": "4e437a4bf0a93b5080d2cf66ff3b46aa17062f7dbcfe5ea43f8c67fcee3d6a6c",
  "evidence_rows_sha256": "2cc1c9fd65637a8e736332409cfa269b820c3194d7ff4ddfa154e0a04babae61",
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
  "embedded_datasets_sha256": "2cc1c9fd65637a8e736332409cfa269b820c3194d7ff4ddfa154e0a04babae61",
  "datasets": {
    "resource_comparison": [
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "resource_type": "quiz",
        "clicks": 623,
        "pct_of_total": 0.4940523394131642,
        "vle_diversity_score": 1,
        "has_engagement_data": true,
        "total_clicks": 1261,
        "used_resource_types": 9,
        "evidence_row_type": "resource_usage"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "resource_type": "homepage",
        "clicks": 264,
        "pct_of_total": 0.20935765265662173,
        "vle_diversity_score": 1,
        "has_engagement_data": true,
        "total_clicks": 1261,
        "used_resource_types": 9,
        "evidence_row_type": "resource_usage"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "resource_type": "forumng",
        "clicks": 140,
        "pct_of_total": 0.11102299762093576,
        "vle_diversity_score": 1,
        "has_engagement_data": true,
        "total_clicks": 1261,
        "used_resource_types": 9,
        "evidence_row_type": "resource_usage"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "resource_type": "subpage",
        "clicks": 94,
        "pct_of_total": 0.07454401268834258,
        "vle_diversity_score": 1,
        "has_engagement_data": true,
        "total_clicks": 1261,
        "used_resource_types": 9,
        "evidence_row_type": "resource_usage"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "resource_type": "resource",
        "clicks": 71,
        "pct_of_total": 0.056304520222045996,
        "vle_diversity_score": 1,
        "has_engagement_data": true,
        "total_clicks": 1261,
        "used_resource_types": 9,
        "evidence_row_type": "resource_usage"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "resource_type": "oucontent",
        "clicks": 40,
        "pct_of_total": 0.0317208564631245,
        "vle_diversity_score": 1,
        "has_engagement_data": true,
        "total_clicks": 1261,
        "used_resource_types": 9,
        "evidence_row_type": "resource_usage"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "resource_type": "url",
        "clicks": 27,
        "pct_of_total": 0.02141157811260904,
        "vle_diversity_score": 1,
        "has_engagement_data": true,
        "total_clicks": 1261,
        "used_resource_types": 9,
        "evidence_row_type": "resource_usage"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "resource_type": "oucollaborate",
        "clicks": 1,
        "pct_of_total": 0.0007930214115781126,
        "vle_diversity_score": 1,
        "has_engagement_data": true,
        "total_clicks": 1261,
        "used_resource_types": 9,
        "evidence_row_type": "resource_usage"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "resource_type": "page",
        "clicks": 1,
        "pct_of_total": 0.0007930214115781126,
        "vle_diversity_score": 1,
        "has_engagement_data": true,
        "total_clicks": 1261,
        "used_resource_types": 9,
        "evidence_row_type": "resource_usage"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_101700",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C06__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "60d283370ece53c7b52743c5858c9924c27ac86585acf3b903884d244fd52262",
  "generator_input_sha256": "e413db92aef3d5bdc115bc7d53565406258ce8a6c651f2ee7c205ad5e908d3d6",
  "generator_input_compact": {
    "task_id": "A-C06",
    "execution_id": "exec_1781847669794_e794bcab",
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
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "resource_comparison"
    ],
    "dataset_row_counts": {
      "resource_comparison": 10
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
  "raw_text": "Summary: The analysis of resource usage reveals a significant disparity between two students, with one demonstrating a more strategic and diversified approach to resource engagement. The first student utilized a variety of resources, while the second student showed no recorded resource usage.\n\nInsights: Diverse Resource Engagement: Student SAMPLE_OULAD_STU_100788 engaged with multiple resource types, indicating a strategic approach to learning, while SAMPLE_OULAD_STU_101700 did not engage with any resources. | High Clicks on Quizzes: SAMPLE_OULAD_STU_100788's engagement with quizzes (623 clicks) constitutes a significant portion of their total resource usage, suggesting a focused strategy on assessment preparation.\n\nEducational implications: Students who engage with a variety of resources may have a better understanding of the material and improved learning outcomes.\n\nRecommendations: high - Encourage SAMPLE_OULAD_STU_101700 to explore and utilize available resources. - Increased resource engagement may enhance their learning experience and performance.",
  "structured_payload": {
    "task_id": "A-C06",
    "execution_id": "exec_1781847669794_e794bcab",
    "explanation": {
      "summary": "The analysis of resource usage reveals a significant disparity between two students, with one demonstrating a more strategic and diversified approach to resource engagement. The first student utilized a variety of resources, while the second student showed no recorded resource usage.",
      "insights": [
        {
          "title": "Diverse Resource Engagement",
          "description": "Student SAMPLE_OULAD_STU_100788 engaged with multiple resource types, indicating a strategic approach to learning, while SAMPLE_OULAD_STU_101700 did not engage with any resources.",
          "severity": "high",
          "evidence": [
            {
              "metric": "used_resource_types",
              "value": 9,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_100788 utilized 9 different resource types."
            },
            {
              "metric": "used_resource_types",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_101700 did not utilize any resources."
            }
          ]
        },
        {
          "title": "High Clicks on Quizzes",
          "description": "SAMPLE_OULAD_STU_100788's engagement with quizzes (623 clicks) constitutes a significant portion of their total resource usage, suggesting a focused strategy on assessment preparation.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "clicks",
              "value": 623,
              "comparison": "baseline",
              "delta": null,
              "context": "Quizzes accounted for 49.4% of total clicks for SAMPLE_OULAD_STU_100788."
            }
          ]
        }
      ],
      "educational_implications": [
        "Students who engage with a variety of resources may have a better understanding of the material and improved learning outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Encourage SAMPLE_OULAD_STU_101700 to explore and utilize available resources.",
          "rationale": "Increased resource engagement may enhance their learning experience and performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and provides a clear comparison of resource usage between the two students.",
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
    "full_result_row_count": 10,
    "included_row_count": 10,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "resource_comparison",
        "row_count": 10,
        "included_row_count": 10
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6681,
      "token_usage": {
        "prompt_tokens": 1711,
        "completion_tokens": 517,
        "total_tokens": 2228
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000567
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C06__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "60d283370ece53c7b52743c5858c9924c27ac86585acf3b903884d244fd52262",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1711,
      "completion_tokens": 517,
      "total_tokens": 2228
    },
    "latency_ms": 6685,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C06",
    "execution_id": "exec_1781847669794_e794bcab",
    "explanation": {
      "summary": "The analysis of resource usage reveals a significant disparity between two students, with one demonstrating a more strategic and diversified approach to resource engagement. The first student utilized a variety of resources, while the second student showed no recorded resource usage.",
      "insights": [
        {
          "title": "Diverse Resource Engagement",
          "description": "Student SAMPLE_OULAD_STU_100788 engaged with multiple resource types, indicating a strategic approach to learning, while SAMPLE_OULAD_STU_101700 did not engage with any resources.",
          "severity": "high",
          "evidence": [
            {
              "metric": "used_resource_types",
              "value": 9,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_100788 utilized 9 different resource types."
            },
            {
              "metric": "used_resource_types",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_101700 did not utilize any resources."
            }
          ]
        },
        {
          "title": "High Clicks on Quizzes",
          "description": "SAMPLE_OULAD_STU_100788's engagement with quizzes (623 clicks) constitutes a significant portion of their total resource usage, suggesting a focused strategy on assessment preparation.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "clicks",
              "value": 623,
              "comparison": "baseline",
              "delta": null,
              "context": "Quizzes accounted for 49.4% of total clicks for SAMPLE_OULAD_STU_100788."
            }
          ]
        }
      ],
      "educational_implications": [
        "Students who engage with a variety of resources may have a better understanding of the material and improved learning outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Encourage SAMPLE_OULAD_STU_101700 to explore and utilize available resources.",
          "rationale": "Increased resource engagement may enhance their learning experience and performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and provides a clear comparison of resource usage between the two students.",
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
    "full_result_row_count": 10,
    "included_row_count": 10,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "resource_comparison",
        "row_count": 10,
        "included_row_count": 10
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6681,
      "token_usage": {
        "prompt_tokens": 1711,
        "completion_tokens": 517,
        "total_tokens": 2228
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000567
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
    "observed": "4e437a4bf0a93b5080d2cf66ff3b46aa17062f7dbcfe5ea43f8c67fcee3d6a6c",
    "expected_values": [
      "4e437a4bf0a93b5080d2cf66ff3b46aa17062f7dbcfe5ea43f8c67fcee3d6a6c"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "2cc1c9fd65637a8e736332409cfa269b820c3194d7ff4ddfa154e0a04babae61",
    "expected": "2cc1c9fd65637a8e736332409cfa269b820c3194d7ff4ddfa154e0a04babae61"
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
      "vle_diversity_score",
      "pct_of_total"
    ],
    "numeric_summaries": {
      "clicks": {
        "count": 10,
        "min": 0,
        "max": 623
      },
      "total_clicks": {
        "count": 10,
        "min": 0,
        "max": 1261
      },
      "used_resource_types": {
        "count": 10,
        "min": 0,
        "max": 9
      },
      "vle_diversity_score": {
        "count": 10,
        "min": 0,
        "max": 1
      },
      "pct_of_total": {
        "count": 9,
        "min": 0.0007930214115781126,
        "max": 0.4940523394131642
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
