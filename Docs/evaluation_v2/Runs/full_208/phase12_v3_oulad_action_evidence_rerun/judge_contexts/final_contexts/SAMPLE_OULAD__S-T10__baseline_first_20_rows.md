# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T10__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T10__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T10",
  "explanation_mode": "baseline_first_20_rows",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T10__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "7b46cea7f18450a159232d3545e5dd66f832eab6b179f4b7d9ddf70db088c0ce",
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
  "raw_text": "Summary: Your engagement with various learning resources shows a strong preference for quizzes, while other resources like forums and pages are underutilized. This suggests that you might benefit from exploring a wider range of materials to enhance your learning experience.\n\nInsights: High Quiz Engagement: You have clicked on quizzes 623 times, which accounts for nearly half of your total resource engagement. This indicates a strong preference for this type of resource. | Low Forum Engagement: Your engagement with forums is quite low, with only 140 clicks. This resource type has a diversity score of 1, indicating it could be beneficial for your learning. | Underutilized Resources: Other resources like pages and URLs have minimal engagement, with only 1 click each. This suggests you may not be fully exploring all available materials.\n\nEducational implications: Exploring a variety of resources can enhance your understanding and retention of course material.\n\nRecommendations: high - Engage more with forums and other underused resources. - This will help you gain different perspectives and deepen your understanding of the course content.",
  "structured_payload": {
    "task_id": "S-T10",
    "execution_id": "exec_1781847912597_3167c4a7",
    "explanation": {
      "summary": "Your engagement with various learning resources shows a strong preference for quizzes, while other resources like forums and pages are underutilized. This suggests that you might benefit from exploring a wider range of materials to enhance your learning experience.",
      "insights": [
        {
          "title": "High Quiz Engagement",
          "description": "You have clicked on quizzes 623 times, which accounts for nearly half of your total resource engagement. This indicates a strong preference for this type of resource.",
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
          "description": "Your engagement with forums is quite low, with only 140 clicks. This resource type has a diversity score of 1, indicating it could be beneficial for your learning.",
          "severity": "high",
          "evidence": [
            {
              "metric": "clicks",
              "value": 140,
              "comparison": "baseline",
              "delta": null,
              "context": "Forums are rarely used despite their potential."
            }
          ]
        },
        {
          "title": "Underutilized Resources",
          "description": "Other resources like pages and URLs have minimal engagement, with only 1 click each. This suggests you may not be fully exploring all available materials.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "clicks",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Pages and URLs are significantly underused."
            }
          ]
        }
      ],
      "educational_implications": [
        "Exploring a variety of resources can enhance your understanding and retention of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Engage more with forums and other underused resources.",
          "rationale": "This will help you gain different perspectives and deepen your understanding of the course content."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data on resource usage is clear and provides a solid basis for analysis.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
      "latency_ms": 6902,
      "token_usage": {
        "prompt_tokens": 1117,
        "completion_tokens": 520,
        "total_tokens": 1637
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.00048
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T10__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "7b46cea7f18450a159232d3545e5dd66f832eab6b179f4b7d9ddf70db088c0ce",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1117,
      "completion_tokens": 520,
      "total_tokens": 1637
    },
    "latency_ms": 6905,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T10",
    "execution_id": "exec_1781847912597_3167c4a7",
    "explanation": {
      "summary": "Your engagement with various learning resources shows a strong preference for quizzes, while other resources like forums and pages are underutilized. This suggests that you might benefit from exploring a wider range of materials to enhance your learning experience.",
      "insights": [
        {
          "title": "High Quiz Engagement",
          "description": "You have clicked on quizzes 623 times, which accounts for nearly half of your total resource engagement. This indicates a strong preference for this type of resource.",
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
          "description": "Your engagement with forums is quite low, with only 140 clicks. This resource type has a diversity score of 1, indicating it could be beneficial for your learning.",
          "severity": "high",
          "evidence": [
            {
              "metric": "clicks",
              "value": 140,
              "comparison": "baseline",
              "delta": null,
              "context": "Forums are rarely used despite their potential."
            }
          ]
        },
        {
          "title": "Underutilized Resources",
          "description": "Other resources like pages and URLs have minimal engagement, with only 1 click each. This suggests you may not be fully exploring all available materials.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "clicks",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Pages and URLs are significantly underused."
            }
          ]
        }
      ],
      "educational_implications": [
        "Exploring a variety of resources can enhance your understanding and retention of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Engage more with forums and other underused resources.",
          "rationale": "This will help you gain different perspectives and deepen your understanding of the course content."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data on resource usage is clear and provides a solid basis for analysis.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
      "latency_ms": 6902,
      "token_usage": {
        "prompt_tokens": 1117,
        "completion_tokens": 520,
        "total_tokens": 1637
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.00048
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
