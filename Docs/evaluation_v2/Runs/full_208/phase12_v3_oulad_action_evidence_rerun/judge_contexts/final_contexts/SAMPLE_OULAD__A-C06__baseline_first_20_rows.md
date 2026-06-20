# LLM Judge Final Judge Context - SAMPLE_OULAD__A-C06__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-C06__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-C06",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C06__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "b25f067db276e57676a3dba735d2c13f0282e2e8a401c74eb55bc0c9ee582c6b",
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
  "raw_text": "Summary: The analysis reveals a significant disparity in resource usage between the two students, with SAMPLE_OULAD_STU_100788 demonstrating a more strategic and diversified approach to resource engagement compared to SAMPLE_OULAD_STU_101700, who shows no recorded resource usage.\n\nInsights: High Engagement in Resource Usage: SAMPLE_OULAD_STU_100788 has a total of 1261 clicks across various resource types, indicating a high level of engagement. In contrast, SAMPLE_OULAD_STU_101700 has zero clicks, suggesting a lack of engagement with available resources. | Diversity in Resource Types Used: SAMPLE_OULAD_STU_100788 utilized 9 different resource types, showcasing a diversified approach to learning. In contrast, SAMPLE_OULAD_STU_101700 has no recorded resource types, indicating a lack of engagement with diverse learning materials.\n\nEducational implications: The lack of resource engagement by SAMPLE_OULAD_STU_101700 may hinder their learning outcomes and understanding of course material.\n\nRecommendations: high - Implement targeted interventions to encourage SAMPLE_OULAD_STU_101700 to engage with available resources. - Increasing resource engagement can enhance learning outcomes and provide a more comprehensive understanding of the course content.",
  "structured_payload": {
    "task_id": "A-C06",
    "execution_id": "exec_1781847669794_e794bcab",
    "explanation": {
      "summary": "The analysis reveals a significant disparity in resource usage between the two students, with SAMPLE_OULAD_STU_100788 demonstrating a more strategic and diversified approach to resource engagement compared to SAMPLE_OULAD_STU_101700, who shows no recorded resource usage.",
      "insights": [
        {
          "title": "High Engagement in Resource Usage",
          "description": "SAMPLE_OULAD_STU_100788 has a total of 1261 clicks across various resource types, indicating a high level of engagement. In contrast, SAMPLE_OULAD_STU_101700 has zero clicks, suggesting a lack of engagement with available resources.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_clicks",
              "value": 1261,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_100788"
            },
            {
              "metric": "total_clicks",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_101700"
            }
          ]
        },
        {
          "title": "Diversity in Resource Types Used",
          "description": "SAMPLE_OULAD_STU_100788 utilized 9 different resource types, showcasing a diversified approach to learning. In contrast, SAMPLE_OULAD_STU_101700 has no recorded resource types, indicating a lack of engagement with diverse learning materials.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "used_resource_types",
              "value": 9,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_100788"
            },
            {
              "metric": "used_resource_types",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_101700"
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of resource engagement by SAMPLE_OULAD_STU_101700 may hinder their learning outcomes and understanding of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions to encourage SAMPLE_OULAD_STU_101700 to engage with available resources.",
          "rationale": "Increasing resource engagement can enhance learning outcomes and provide a more comprehensive understanding of the course content."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is clear and indicates a strong contrast in resource usage between the two students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "baseline_first_20_rows",
    "ai_summary_version": "baseline",
    "baseline_available": true,
    "input_summary_type": "raw_first_20_rows",
    "ai_summary_method_warning": null,
    "full_result_row_count": null,
    "included_row_count": null,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8650,
      "token_usage": {
        "prompt_tokens": 1559,
        "completion_tokens": 598,
        "total_tokens": 2157
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000593
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C06__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "b25f067db276e57676a3dba735d2c13f0282e2e8a401c74eb55bc0c9ee582c6b",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1559,
      "completion_tokens": 598,
      "total_tokens": 2157
    },
    "latency_ms": 8654,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C06",
    "execution_id": "exec_1781847669794_e794bcab",
    "explanation": {
      "summary": "The analysis reveals a significant disparity in resource usage between the two students, with SAMPLE_OULAD_STU_100788 demonstrating a more strategic and diversified approach to resource engagement compared to SAMPLE_OULAD_STU_101700, who shows no recorded resource usage.",
      "insights": [
        {
          "title": "High Engagement in Resource Usage",
          "description": "SAMPLE_OULAD_STU_100788 has a total of 1261 clicks across various resource types, indicating a high level of engagement. In contrast, SAMPLE_OULAD_STU_101700 has zero clicks, suggesting a lack of engagement with available resources.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_clicks",
              "value": 1261,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_100788"
            },
            {
              "metric": "total_clicks",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_101700"
            }
          ]
        },
        {
          "title": "Diversity in Resource Types Used",
          "description": "SAMPLE_OULAD_STU_100788 utilized 9 different resource types, showcasing a diversified approach to learning. In contrast, SAMPLE_OULAD_STU_101700 has no recorded resource types, indicating a lack of engagement with diverse learning materials.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "used_resource_types",
              "value": 9,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_100788"
            },
            {
              "metric": "used_resource_types",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_101700"
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of resource engagement by SAMPLE_OULAD_STU_101700 may hinder their learning outcomes and understanding of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions to encourage SAMPLE_OULAD_STU_101700 to engage with available resources.",
          "rationale": "Increasing resource engagement can enhance learning outcomes and provide a more comprehensive understanding of the course content."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is clear and indicates a strong contrast in resource usage between the two students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "baseline_first_20_rows",
    "ai_summary_version": "baseline",
    "baseline_available": true,
    "input_summary_type": "raw_first_20_rows",
    "ai_summary_method_warning": null,
    "full_result_row_count": null,
    "included_row_count": null,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8650,
      "token_usage": {
        "prompt_tokens": 1559,
        "completion_tokens": 598,
        "total_tokens": 2157
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000593
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
