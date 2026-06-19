# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__S-B03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-B03__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-B03",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Engagement summary",
  "scope": "1 student",
  "actionable_question": "How active am I compared to classmates?",
  "target_audience": "student",
  "ai_summary_type": "metric_snapshot",
  "ai_prompt_hint": "Describe effort level in plain language using study_effort_level, total_engagement_count, active_days, engagement_score, and class_avg_engagement_score. Compare to class averages only from returned fields, and avoid calling missing engagement data low effort.",
  "query_labels": [
    "engagement_summary"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement"
  ],
  "key_db_fields": [
    "total_engagement_count [FE]",
    "active_days [FE]",
    "engagement_score [FE]",
    "class_avg_engagement_score [FE]",
    "study_effort_level [FE]"
  ],
  "output_schema": {
    "required_columns": [
      "total_engagement_count",
      "active_days",
      "engagement_score",
      "class_avg_engagement_score",
      "study_effort_level"
    ]
  },
  "query_labels": [
    "engagement_summary"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-B03-CORE-01",
      "description": "Characterise the student's effort level relative to the available class benchmark in plain language."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-B03-CONSTRAINT-01",
      "description": "Ground the characterisation in study_effort_level, total_engagement_count, active_days, engagement_score, and class_avg_engagement_score when those fields are returned."
    },
    {
      "constraint_id": "S-B03-CONSTRAINT-02",
      "description": "Do not label missing engagement data as low effort."
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
      "dataset_label": "engagement_summary",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-B03.json",
      "artifact_sha256": "b5104893828f131a42c75e77f0b08719e2977a1cfa6822f707f4d5bf3355889f",
      "row_count": 1,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 1,
  "prompt_embedded_row_count": 1,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "b5104893828f131a42c75e77f0b08719e2977a1cfa6822f707f4d5bf3355889f",
  "evidence_rows_sha256": "aecb81393138dc2b7c4617387dbf4e8a700afd5d3b56b6ad5060ed0a1f77966d",
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
  "full_result_row_count": 1,
  "embedded_datasets_sha256": "aecb81393138dc2b7c4617387dbf4e8a700afd5d3b56b6ad5060ed0a1f77966d",
  "datasets": {
    "engagement_summary": [
      {
        "total_engagement_count": 1261,
        "total_clicks": 1261,
        "active_days": 98,
        "engagement_score": 0.2024,
        "class_avg_total_engagement_count": 1118.08,
        "class_avg_active_days": 52.55,
        "class_avg_engagement_score": 0.1177,
        "study_effort_level": "medium"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-B03__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "e9c8afb804695073eae77df496125fe9a6d6ee2702a40e4bae30ff6f4c03be9d",
  "generator_input_sha256": "ad88dce5bccfa551fb680b14f89b782518c59a4ec96427c7a5fa3044e550b0a3",
  "generator_input_compact": {
    "task_id": "S-B03",
    "execution_id": "exec_1781847867283_04dc8c3c",
    "task_name": "Engagement summary",
    "analysis_type": "aggregation",
    "explanation_strategy": "behavioral",
    "actionable_question": "How active am I compared to classmates?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "engagement_summary"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "engagement_summary"
    ],
    "dataset_row_counts": {
      "engagement_summary": 1
    },
    "ai_summary_config_summary": {
      "summary_type": "metric_snapshot",
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
  "raw_text": "Summary: You have shown a commendable level of engagement this semester, with a total engagement count of 1261, which is above the class average. Your active days are significantly higher than your classmates, indicating a consistent effort in your studies.\n\nInsights: High Engagement Compared to Classmates: Your total engagement count of 1261 is notably higher than the class average of 1118.08, showcasing your commitment to the course material. | Consistent Active Days: You have been active for 98 days, which is significantly more than the class average of 52.55 days. This suggests you are regularly engaging with the course content. | Strong Engagement Score: Your engagement score of 0.2024 is higher than the class average of 0.1177, indicating that your interactions with the course materials are meaningful and impactful.\n\nEducational implications: Your high engagement levels suggest you are on the right track and likely grasping the course material well.\n\nRecommendations: medium - Continue to engage regularly with course materials. - Maintaining your current level of engagement will help reinforce your understanding and retention of the material.",
  "structured_payload": {
    "task_id": "S-B03",
    "execution_id": "exec_1781847867283_04dc8c3c",
    "explanation": {
      "summary": "You have shown a commendable level of engagement this semester, with a total engagement count of 1261, which is above the class average. Your active days are significantly higher than your classmates, indicating a consistent effort in your studies.",
      "insights": [
        {
          "title": "High Engagement Compared to Classmates",
          "description": "Your total engagement count of 1261 is notably higher than the class average of 1118.08, showcasing your commitment to the course material.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "total_engagement_count",
              "value": 1261,
              "comparison": "up_from_previous",
              "delta": null,
              "context": "Above class average"
            }
          ]
        },
        {
          "title": "Consistent Active Days",
          "description": "You have been active for 98 days, which is significantly more than the class average of 52.55 days. This suggests you are regularly engaging with the course content.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "active_days",
              "value": 98,
              "comparison": "up_from_previous",
              "delta": null,
              "context": "Well above class average"
            }
          ]
        },
        {
          "title": "Strong Engagement Score",
          "description": "Your engagement score of 0.2024 is higher than the class average of 0.1177, indicating that your interactions with the course materials are meaningful and impactful.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0.2024,
              "comparison": "up_from_previous",
              "delta": null,
              "context": "Higher than class average"
            }
          ]
        }
      ],
      "educational_implications": [
        "Your high engagement levels suggest you are on the right track and likely grasping the course material well."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Continue to engage regularly with course materials.",
          "rationale": "Maintaining your current level of engagement will help reinforce your understanding and retention of the material."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and reflects your engagement accurately.",
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
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8497,
      "token_usage": {
        "prompt_tokens": 776,
        "completion_tokens": 529,
        "total_tokens": 1305
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000434
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-B03__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "e9c8afb804695073eae77df496125fe9a6d6ee2702a40e4bae30ff6f4c03be9d",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 776,
      "completion_tokens": 529,
      "total_tokens": 1305
    },
    "latency_ms": 8506,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-B03",
    "execution_id": "exec_1781847867283_04dc8c3c",
    "explanation": {
      "summary": "You have shown a commendable level of engagement this semester, with a total engagement count of 1261, which is above the class average. Your active days are significantly higher than your classmates, indicating a consistent effort in your studies.",
      "insights": [
        {
          "title": "High Engagement Compared to Classmates",
          "description": "Your total engagement count of 1261 is notably higher than the class average of 1118.08, showcasing your commitment to the course material.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "total_engagement_count",
              "value": 1261,
              "comparison": "up_from_previous",
              "delta": null,
              "context": "Above class average"
            }
          ]
        },
        {
          "title": "Consistent Active Days",
          "description": "You have been active for 98 days, which is significantly more than the class average of 52.55 days. This suggests you are regularly engaging with the course content.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "active_days",
              "value": 98,
              "comparison": "up_from_previous",
              "delta": null,
              "context": "Well above class average"
            }
          ]
        },
        {
          "title": "Strong Engagement Score",
          "description": "Your engagement score of 0.2024 is higher than the class average of 0.1177, indicating that your interactions with the course materials are meaningful and impactful.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0.2024,
              "comparison": "up_from_previous",
              "delta": null,
              "context": "Higher than class average"
            }
          ]
        }
      ],
      "educational_implications": [
        "Your high engagement levels suggest you are on the right track and likely grasping the course material well."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Continue to engage regularly with course materials.",
          "rationale": "Maintaining your current level of engagement will help reinforce your understanding and retention of the material."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and reflects your engagement accurately.",
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
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8497,
      "token_usage": {
        "prompt_tokens": 776,
        "completion_tokens": 529,
        "total_tokens": 1305
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000434
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
    "expected": 1,
    "observed": 1
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "b5104893828f131a42c75e77f0b08719e2977a1cfa6822f707f4d5bf3355889f",
    "expected_values": [
      "b5104893828f131a42c75e77f0b08719e2977a1cfa6822f707f4d5bf3355889f"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "aecb81393138dc2b7c4617387dbf4e8a700afd5d3b56b6ad5060ed0a1f77966d",
    "expected": "aecb81393138dc2b7c4617387dbf4e8a700afd5d3b56b6ad5060ed0a1f77966d"
  },
  {
    "check_id": "numeric_fields_engagement_summary",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "engagement_summary",
    "numeric_columns": [
      "active_days",
      "class_avg_active_days",
      "class_avg_engagement_score",
      "class_avg_total_engagement_count",
      "engagement_score",
      "total_clicks",
      "total_engagement_count"
    ],
    "numeric_summaries": {
      "active_days": {
        "count": 1,
        "min": 98,
        "max": 98
      },
      "class_avg_active_days": {
        "count": 1,
        "min": 52.55,
        "max": 52.55
      },
      "class_avg_engagement_score": {
        "count": 1,
        "min": 0.1177,
        "max": 0.1177
      },
      "class_avg_total_engagement_count": {
        "count": 1,
        "min": 1118.08,
        "max": 1118.08
      },
      "engagement_score": {
        "count": 1,
        "min": 0.2024,
        "max": 0.2024
      },
      "total_clicks": {
        "count": 1,
        "min": 1261,
        "max": 1261
      },
      "total_engagement_count": {
        "count": 1,
        "min": 1261,
        "max": 1261
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_engagement_summary",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "engagement_summary",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
