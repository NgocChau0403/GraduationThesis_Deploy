# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T10__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T10__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T10",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Resource engagement breakdown",
  "scope": "1 student",
  "actionable_question": "Am I using the full range of learning resources available?",
  "target_audience": "student",
  "ai_summary_type": "categorical_distribution",
  "ai_prompt_hint": "Use vle_diversity_score [FE] to show breadth. Highlight under-used types (e.g. forum rarely used).",
  "query_labels": [
    "resource_usage"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
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
    "resource_usage"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T10-CORE-01",
      "description": "State the student's resource usage breadth across available VLE types."
    },
    {
      "requirement_id": "S-T10-CORE-02",
      "description": "Identify under-used resource types when a comparison baseline is available."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T10-CONSTRAINT-01",
      "description": "Use vle_diversity_score as the primary resource-breadth metric when returned."
    },
    {
      "constraint_id": "S-T10-CONSTRAINT-02",
      "description": "Do not label low usage of a resource type as disengagement when no comparison baseline is provided."
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
      "dataset_label": "resource_usage",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T10.json",
      "artifact_sha256": "d104cedb86d92fea4d41cb5fde5c359875144a7bb6d35e70d303cd08cd0a444c",
      "row_count": 9,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 9,
  "prompt_embedded_row_count": 9,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "d104cedb86d92fea4d41cb5fde5c359875144a7bb6d35e70d303cd08cd0a444c",
  "evidence_rows_sha256": "9ed8f0948e3c8a3e7f9310b189cd3996b477d344c961fdf90d5a115d1926a7ee",
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
  "full_result_row_count": 9,
  "embedded_datasets_sha256": "9ed8f0948e3c8a3e7f9310b189cd3996b477d344c961fdf90d5a115d1926a7ee",
  "datasets": {
    "resource_usage": [
      {
        "resource_type": "quiz",
        "clicks": 623,
        "pct_of_total": "0.49405233941316415543",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "homepage",
        "clicks": 264,
        "pct_of_total": "0.20935765265662172879",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "forumng",
        "clicks": 140,
        "pct_of_total": "0.11102299762093576527",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "subpage",
        "clicks": 94,
        "pct_of_total": "0.07454401268834258525",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "resource",
        "clicks": 71,
        "pct_of_total": "0.05630452022204599524",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "oucontent",
        "clicks": 40,
        "pct_of_total": "0.03172085646312450436",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "url",
        "clicks": 27,
        "pct_of_total": "0.02141157811260904044",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "page",
        "clicks": 1,
        "pct_of_total": "0.00079302141157811261",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      },
      {
        "resource_type": "oucollaborate",
        "clicks": 1,
        "pct_of_total": "0.00079302141157811261",
        "vle_diversity_score": "1",
        "forum_engagement_rate": "0.11102299762093576527"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T10__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "62fad0204446e794d49d0a183d94d702ba9f9b38df5b99b7b467dcb948a0d008",
  "generator_input_sha256": "210157deeecc4c94705cffe334b730a9c9f268d1c1a73009921d7e8e540921f2",
  "generator_input_compact": {
    "task_id": "S-T10",
    "execution_id": "exec_1781847912597_3167c4a7",
    "task_name": "Resource engagement breakdown",
    "analysis_type": "distribution",
    "explanation_strategy": "behavioral",
    "actionable_question": "Am I using the full range of learning resources available?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "resource_usage"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "resource_usage"
    ],
    "dataset_row_counts": {
      "resource_usage": 9
    },
    "ai_summary_config_summary": {
      "summary_type": "categorical_distribution",
      "metric_column": null,
      "entity_column": null,
      "group_column": null,
      "time_column": null,
      "sort_by": "clicks",
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
  "raw_text": "Summary: Your engagement with various learning resources shows a strong preference for quizzes, which is great! However, there are several resources that you could explore more to enhance your learning experience.\n\nInsights: High Quiz Engagement: You have clicked on quizzes 623 times, making up nearly 49% of your total resource usage. This indicates a strong engagement with this resource type. | Low Forum Engagement: Your engagement with forums is quite low, with only 140 clicks, which is about 11% of your total usage. This suggests you might be missing out on valuable discussions and peer interactions. | Underutilized Resources: Other resources like 'subpage' and 'resource' have very low engagement, with only 94 and 71 clicks respectively. Exploring these could provide additional insights and support.\n\nEducational implications: Engaging with a wider variety of resources can deepen your understanding and retention of course material.\n\nRecommendations: high - Increase your participation in forums. - This will help you connect with peers and gain different perspectives on the material. | medium - Explore underutilized resources like subpages and additional materials. - These resources may provide valuable information that complements your learning.",
  "structured_payload": {
    "task_id": "S-T10",
    "execution_id": "exec_1781847912597_3167c4a7",
    "explanation": {
      "summary": "Your engagement with various learning resources shows a strong preference for quizzes, which is great! However, there are several resources that you could explore more to enhance your learning experience.",
      "insights": [
        {
          "title": "High Quiz Engagement",
          "description": "You have clicked on quizzes 623 times, making up nearly 49% of your total resource usage. This indicates a strong engagement with this resource type.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "clicks",
              "value": 623,
              "comparison": "baseline",
              "delta": null,
              "context": "Quizzes are your most engaged resource."
            }
          ]
        },
        {
          "title": "Low Forum Engagement",
          "description": "Your engagement with forums is quite low, with only 140 clicks, which is about 11% of your total usage. This suggests you might be missing out on valuable discussions and peer interactions.",
          "severity": "high",
          "evidence": [
            {
              "metric": "clicks",
              "value": 140,
              "comparison": "baseline",
              "delta": null,
              "context": "Forums can enhance your understanding through peer discussions."
            }
          ]
        },
        {
          "title": "Underutilized Resources",
          "description": "Other resources like 'subpage' and 'resource' have very low engagement, with only 94 and 71 clicks respectively. Exploring these could provide additional insights and support.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "clicks",
              "value": 94,
              "comparison": "baseline",
              "delta": null,
              "context": "These resources may contain important supplementary materials."
            },
            {
              "metric": "clicks",
              "value": 71,
              "comparison": "baseline",
              "delta": null,
              "context": "Engaging with these could enhance your learning."
            }
          ]
        }
      ],
      "educational_implications": [
        "Engaging with a wider variety of resources can deepen your understanding and retention of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Increase your participation in forums.",
          "rationale": "This will help you connect with peers and gain different perspectives on the material."
        },
        {
          "priority": "medium",
          "action": "Explore underutilized resources like subpages and additional materials.",
          "rationale": "These resources may provide valuable information that complements your learning."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and provides a clear picture of your resource engagement.",
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
    "full_result_row_count": 9,
    "included_row_count": 9,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "resource_usage",
        "row_count": 9,
        "included_row_count": 9
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 11538,
      "token_usage": {
        "prompt_tokens": 1268,
        "completion_tokens": 608,
        "total_tokens": 1876
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000555
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T10__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "62fad0204446e794d49d0a183d94d702ba9f9b38df5b99b7b467dcb948a0d008",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1268,
      "completion_tokens": 608,
      "total_tokens": 1876
    },
    "latency_ms": 11540,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T10",
    "execution_id": "exec_1781847912597_3167c4a7",
    "explanation": {
      "summary": "Your engagement with various learning resources shows a strong preference for quizzes, which is great! However, there are several resources that you could explore more to enhance your learning experience.",
      "insights": [
        {
          "title": "High Quiz Engagement",
          "description": "You have clicked on quizzes 623 times, making up nearly 49% of your total resource usage. This indicates a strong engagement with this resource type.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "clicks",
              "value": 623,
              "comparison": "baseline",
              "delta": null,
              "context": "Quizzes are your most engaged resource."
            }
          ]
        },
        {
          "title": "Low Forum Engagement",
          "description": "Your engagement with forums is quite low, with only 140 clicks, which is about 11% of your total usage. This suggests you might be missing out on valuable discussions and peer interactions.",
          "severity": "high",
          "evidence": [
            {
              "metric": "clicks",
              "value": 140,
              "comparison": "baseline",
              "delta": null,
              "context": "Forums can enhance your understanding through peer discussions."
            }
          ]
        },
        {
          "title": "Underutilized Resources",
          "description": "Other resources like 'subpage' and 'resource' have very low engagement, with only 94 and 71 clicks respectively. Exploring these could provide additional insights and support.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "clicks",
              "value": 94,
              "comparison": "baseline",
              "delta": null,
              "context": "These resources may contain important supplementary materials."
            },
            {
              "metric": "clicks",
              "value": 71,
              "comparison": "baseline",
              "delta": null,
              "context": "Engaging with these could enhance your learning."
            }
          ]
        }
      ],
      "educational_implications": [
        "Engaging with a wider variety of resources can deepen your understanding and retention of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Increase your participation in forums.",
          "rationale": "This will help you connect with peers and gain different perspectives on the material."
        },
        {
          "priority": "medium",
          "action": "Explore underutilized resources like subpages and additional materials.",
          "rationale": "These resources may provide valuable information that complements your learning."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and provides a clear picture of your resource engagement.",
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
    "full_result_row_count": 9,
    "included_row_count": 9,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "resource_usage",
        "row_count": 9,
        "included_row_count": 9
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 11538,
      "token_usage": {
        "prompt_tokens": 1268,
        "completion_tokens": 608,
        "total_tokens": 1876
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000555
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
    "expected": 9,
    "observed": 9
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "d104cedb86d92fea4d41cb5fde5c359875144a7bb6d35e70d303cd08cd0a444c",
    "expected_values": [
      "d104cedb86d92fea4d41cb5fde5c359875144a7bb6d35e70d303cd08cd0a444c"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "9ed8f0948e3c8a3e7f9310b189cd3996b477d344c961fdf90d5a115d1926a7ee",
    "expected": "9ed8f0948e3c8a3e7f9310b189cd3996b477d344c961fdf90d5a115d1926a7ee"
  },
  {
    "check_id": "numeric_fields_resource_usage",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "resource_usage",
    "numeric_columns": [
      "clicks"
    ],
    "numeric_summaries": {
      "clicks": {
        "count": 9,
        "min": 1,
        "max": 623
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_resource_usage",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "resource_usage",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
