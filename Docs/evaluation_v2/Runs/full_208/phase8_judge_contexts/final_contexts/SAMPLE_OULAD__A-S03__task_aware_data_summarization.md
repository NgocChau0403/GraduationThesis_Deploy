# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-S03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-S03__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-S03",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Student engagement trajectory",
  "scope": "1 student",
  "actionable_question": "When exactly did this student start disengaging?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Flag the exact week engagement dropped. Compare to pre-drop average. Recommend admin outreach timing.",
  "query_labels": [
    "engagement_trajectory"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
    "engagement [OULAD only]"
  ],
  "key_db_fields": [
    "week_number",
    "engagement_count; early_warning_week [FE cross]",
    "weekly_engagement_drop [FE cross]",
    "consistency_level [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "engagement_trajectory"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-S03-CORE-01",
      "description": "Identify the specific week in which engagement dropped when the data supports one."
    },
    {
      "requirement_id": "A-S03-CORE-02",
      "description": "Compare engagement after the drop with the pre-drop average."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "A-S03-SUPPORT-01",
      "description": "When a specific drop week is identified, recommend outreach timing relative to that week."
    }
  ],
  "evaluation_constraints": [],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
}
```

## Deterministic Retrieval Evidence

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "engagement_trajectory",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-S03.json",
      "artifact_sha256": "88c292f06cfb5610c79ec1b926d0f15b1e7e3f392430633bb7897b342969ab65",
      "row_count": 32,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 32,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 32,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_OULAD__A-S03__task_aware_data_summarization.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "88c292f06cfb5610c79ec1b926d0f15b1e7e3f392430633bb7897b342969ab65",
  "evidence_rows_sha256": "ce959133775abc25513cfe5ba069e17f82b777f1dc72e27a543059c0bc0694f4",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 32,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__A-S03__task_aware_data_summarization__engagement_trajectory__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "engagement_trajectory",
        "row_start_inclusive": 0,
        "row_end_inclusive": 31,
        "row_count": 32
      }
    ],
    "issues": []
  }
}
```

```json
{
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "retrieval_log": {
    "artifact_type": "llm_judge_v2_phase6_4_deterministic_retrieval_log",
    "generated_at": "2026-06-19T07:41:45.578Z",
    "record_id": "SAMPLE_OULAD__A-S03__task_aware_data_summarization",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__A-S03__task_aware_data_summarization__engagement_trajectory__chunk_1",
        "dataset_label": "engagement_trajectory",
        "row_start_inclusive": 0,
        "row_end_inclusive": 31,
        "row_count": 32,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-S03.json",
        "source_artifact_sha256": "88c292f06cfb5610c79ec1b926d0f15b1e7e3f392430633bb7897b342969ab65"
      }
    ]
  },
  "retrieved_datasets_sha256": "ce959133775abc25513cfe5ba069e17f82b777f1dc72e27a543059c0bc0694f4",
  "retrieved_datasets": {
    "engagement_trajectory": [
      {
        "week_number": -2,
        "weekly_clicks": 86,
        "rolling_3wk_avg": null,
        "weekly_engagement_drop": null,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": -1,
        "weekly_clicks": 94,
        "rolling_3wk_avg": "86",
        "weekly_engagement_drop": 8,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 0,
        "weekly_clicks": 27,
        "rolling_3wk_avg": "90",
        "weekly_engagement_drop": -67,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 1,
        "weekly_clicks": 98,
        "rolling_3wk_avg": "69",
        "weekly_engagement_drop": 71,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 2,
        "weekly_clicks": 4,
        "rolling_3wk_avg": "73",
        "weekly_engagement_drop": -94,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 3,
        "weekly_clicks": 28,
        "rolling_3wk_avg": "43",
        "weekly_engagement_drop": 24,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 4,
        "weekly_clicks": 7,
        "rolling_3wk_avg": "43.3333333333333333",
        "weekly_engagement_drop": -21,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 5,
        "weekly_clicks": 16,
        "rolling_3wk_avg": "13",
        "weekly_engagement_drop": 9,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 6,
        "weekly_clicks": 80,
        "rolling_3wk_avg": "17",
        "weekly_engagement_drop": 64,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 8,
        "weekly_clicks": 2,
        "rolling_3wk_avg": "34.3333333333333333",
        "weekly_engagement_drop": -78,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 9,
        "weekly_clicks": 48,
        "rolling_3wk_avg": "32.6666666666666667",
        "weekly_engagement_drop": 46,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 10,
        "weekly_clicks": 3,
        "rolling_3wk_avg": "43.3333333333333333",
        "weekly_engagement_drop": -45,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 11,
        "weekly_clicks": 3,
        "rolling_3wk_avg": "17.6666666666666667",
        "weekly_engagement_drop": 0,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 12,
        "weekly_clicks": 56,
        "rolling_3wk_avg": "18",
        "weekly_engagement_drop": 53,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 13,
        "weekly_clicks": 53,
        "rolling_3wk_avg": "20.6666666666666667",
        "weekly_engagement_drop": -3,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 14,
        "weekly_clicks": 71,
        "rolling_3wk_avg": "37.3333333333333333",
        "weekly_engagement_drop": 18,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 15,
        "weekly_clicks": 29,
        "rolling_3wk_avg": "60",
        "weekly_engagement_drop": -42,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 16,
        "weekly_clicks": 24,
        "rolling_3wk_avg": "51",
        "weekly_engagement_drop": -5,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 17,
        "weekly_clicks": 24,
        "rolling_3wk_avg": "41.3333333333333333",
        "weekly_engagement_drop": 0,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 18,
        "weekly_clicks": 1,
        "rolling_3wk_avg": "25.6666666666666667",
        "weekly_engagement_drop": -23,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 19,
        "weekly_clicks": 45,
        "rolling_3wk_avg": "16.3333333333333333",
        "weekly_engagement_drop": 44,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 20,
        "weekly_clicks": 101,
        "rolling_3wk_avg": "23.3333333333333333",
        "weekly_engagement_drop": 56,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 21,
        "weekly_clicks": 106,
        "rolling_3wk_avg": "49",
        "weekly_engagement_drop": 5,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 22,
        "weekly_clicks": 78,
        "rolling_3wk_avg": "84",
        "weekly_engagement_drop": -28,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 24,
        "weekly_clicks": 10,
        "rolling_3wk_avg": "95",
        "weekly_engagement_drop": -68,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 25,
        "weekly_clicks": 1,
        "rolling_3wk_avg": "64.6666666666666667",
        "weekly_engagement_drop": -9,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 27,
        "weekly_clicks": 15,
        "rolling_3wk_avg": "29.6666666666666667",
        "weekly_engagement_drop": 14,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 28,
        "weekly_clicks": 8,
        "rolling_3wk_avg": "8.6666666666666667",
        "weekly_engagement_drop": -7,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 29,
        "weekly_clicks": 41,
        "rolling_3wk_avg": "8",
        "weekly_engagement_drop": 33,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 30,
        "weekly_clicks": 43,
        "rolling_3wk_avg": "21.3333333333333333",
        "weekly_engagement_drop": 2,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 31,
        "weekly_clicks": 54,
        "rolling_3wk_avg": "30.6666666666666667",
        "weekly_engagement_drop": 11,
        "early_warning_week": 0,
        "consistency_level": "medium"
      },
      {
        "week_number": 35,
        "weekly_clicks": 5,
        "rolling_3wk_avg": "46",
        "weekly_engagement_drop": -49,
        "early_warning_week": 0,
        "consistency_level": "medium"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S03__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "8200b04fe19999c48f38a3769f064e2d01d4cea3c92d74c872abaf77700ff093",
  "generator_input_sha256": "b975c4cbeee835cf3497908c21ceb544b183046444441155164db1e3560afd1a",
  "generator_input_compact": {
    "task_id": "A-S03",
    "execution_id": "exec_1781847829425_34c7f219",
    "task_name": "Student engagement trajectory",
    "analysis_type": "trend",
    "explanation_strategy": "behavioral",
    "actionable_question": "When exactly did this student start disengaging?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "engagement_trajectory"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "engagement_trajectory"
    ],
    "dataset_row_counts": {
      "engagement_trajectory": 32
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "weekly_clicks",
      "entity_column": null,
      "group_column": null,
      "time_column": "week_number",
      "sort_by": null,
      "sort_direction": "asc",
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
  "raw_text": "Summary: The analysis reveals a significant decline in student engagement, with weekly clicks dropping from 86 in week -2 to just 5 by week 35. This downward trend indicates a concerning disengagement pattern, particularly marked by a drastic drop in week 2.\n\nInsights: Significant Engagement Drop: The largest adjacent drop in engagement occurred between week 1 and week 2, where weekly clicks fell from 98 to 4, indicating a critical point of disengagement.\n\nEducational implications: The drastic drop in engagement suggests that students may be struggling with course content or facing external challenges that hinder their participation.\n\nRecommendations: high - Initiate outreach to students around week 2 to assess barriers to engagement. - Proactive communication can help identify issues early and provide necessary support to re-engage students.",
  "structured_payload": {
    "task_id": "A-S03",
    "execution_id": "exec_1781847829425_34c7f219",
    "explanation": {
      "summary": "The analysis reveals a significant decline in student engagement, with weekly clicks dropping from 86 in week -2 to just 5 by week 35. This downward trend indicates a concerning disengagement pattern, particularly marked by a drastic drop in week 2.",
      "insights": [
        {
          "title": "Significant Engagement Drop",
          "description": "The largest adjacent drop in engagement occurred between week 1 and week 2, where weekly clicks fell from 98 to 4, indicating a critical point of disengagement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 4,
              "comparison": "down_from_previous",
              "delta": -94,
              "context": "Drop from week 1 (98 clicks) to week 2 (4 clicks)"
            }
          ]
        }
      ],
      "educational_implications": [
        "The drastic drop in engagement suggests that students may be struggling with course content or facing external challenges that hinder their participation."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Initiate outreach to students around week 2 to assess barriers to engagement.",
          "rationale": "Proactive communication can help identify issues early and provide necessary support to re-engage students."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows a clear and significant trend in engagement metrics over the observed weeks.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 32,
    "included_row_count": null,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": false,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_trajectory",
        "row_count": 32,
        "included_row_count": 32
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5034,
      "token_usage": {
        "prompt_tokens": 1971,
        "completion_tokens": 339,
        "total_tokens": 2310
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000499
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S03__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "8200b04fe19999c48f38a3769f064e2d01d4cea3c92d74c872abaf77700ff093",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1971,
      "completion_tokens": 339,
      "total_tokens": 2310
    },
    "latency_ms": 5043,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S03",
    "execution_id": "exec_1781847829425_34c7f219",
    "explanation": {
      "summary": "The analysis reveals a significant decline in student engagement, with weekly clicks dropping from 86 in week -2 to just 5 by week 35. This downward trend indicates a concerning disengagement pattern, particularly marked by a drastic drop in week 2.",
      "insights": [
        {
          "title": "Significant Engagement Drop",
          "description": "The largest adjacent drop in engagement occurred between week 1 and week 2, where weekly clicks fell from 98 to 4, indicating a critical point of disengagement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 4,
              "comparison": "down_from_previous",
              "delta": -94,
              "context": "Drop from week 1 (98 clicks) to week 2 (4 clicks)"
            }
          ]
        }
      ],
      "educational_implications": [
        "The drastic drop in engagement suggests that students may be struggling with course content or facing external challenges that hinder their participation."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Initiate outreach to students around week 2 to assess barriers to engagement.",
          "rationale": "Proactive communication can help identify issues early and provide necessary support to re-engage students."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows a clear and significant trend in engagement metrics over the observed weeks.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 32,
    "included_row_count": null,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": false,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_trajectory",
        "row_count": 32,
        "included_row_count": 32
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5034,
      "token_usage": {
        "prompt_tokens": 1971,
        "completion_tokens": 339,
        "total_tokens": 2310
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000499
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
    "expected": 32,
    "observed": 32
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "88c292f06cfb5610c79ec1b926d0f15b1e7e3f392430633bb7897b342969ab65",
    "expected_values": [
      "88c292f06cfb5610c79ec1b926d0f15b1e7e3f392430633bb7897b342969ab65"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "ce959133775abc25513cfe5ba069e17f82b777f1dc72e27a543059c0bc0694f4",
    "expected": "ce959133775abc25513cfe5ba069e17f82b777f1dc72e27a543059c0bc0694f4"
  },
  {
    "check_id": "numeric_fields_engagement_trajectory",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "engagement_trajectory",
    "numeric_columns": [
      "early_warning_week",
      "week_number",
      "weekly_clicks",
      "weekly_engagement_drop"
    ],
    "numeric_summaries": {
      "early_warning_week": {
        "count": 32,
        "min": 0,
        "max": 0
      },
      "week_number": {
        "count": 32,
        "min": -2,
        "max": 35
      },
      "weekly_clicks": {
        "count": 32,
        "min": 1,
        "max": 106
      },
      "weekly_engagement_drop": {
        "count": 31,
        "min": -94,
        "max": 71
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_engagement_trajectory",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "engagement_trajectory",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
