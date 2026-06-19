# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__S-T05__baseline_first_20_rows

This Phase 6.4b context is the record-level evidence package to supply with the frozen Judge Prompt V2 during pilot judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T05__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_pilot_phase6_4",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T05",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Weekly engagement trend",
  "scope": "1 student",
  "actionable_question": "Which weeks did I disengage and why might that be?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Describe engagement pattern. Flag weeks with sharp drops. Note if drop precedes assessment.",
  "query_labels": [
    "weekly_engagement"
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
    "weekly_engagement_drop [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "weekly_engagement"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T05-CORE-01",
      "description": "Describe engagement pattern."
    },
    {
      "requirement_id": "S-T05-CORE-02",
      "description": "Flag weeks with sharp drops."
    },
    {
      "requirement_id": "S-T05-CORE-03",
      "description": "Note if drop precedes assessment."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T05-CONSTRAINT-01",
      "description": "Treat temporal proximity between engagement drops and assessments as an association, not proof that the assessment caused the drop."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
}
```

## Deterministic Retrieval Evidence

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "weekly_engagement",
      "artifact_path": "Docs/evaluation_v2/Runs/phase6_evidence/full_query_artifacts/SAMPLE_OULAD__S-T05__baseline_first_20_rows.json",
      "artifact_sha256": "17ee165e0ca60f7ead844847ccac1ba6d99fc811331d66454601d20a506b5fda",
      "row_count": 32,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 32,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 32,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/phase6_judge_inputs/retrieval_logs/SAMPLE_OULAD__S-T05__baseline_first_20_rows.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "17ee165e0ca60f7ead844847ccac1ba6d99fc811331d66454601d20a506b5fda",
  "evidence_rows_sha256": "66971a60c1a5faacfcf711c53301837cdb6f40c85bd9e6bd3f8e189e2c058a80",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 32,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__S-T05__baseline_first_20_rows__weekly_engagement__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "weekly_engagement",
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
    "generated_at": "2026-06-18T22:36:58.260Z",
    "record_id": "SAMPLE_OULAD__S-T05__baseline_first_20_rows",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__S-T05__baseline_first_20_rows__weekly_engagement__chunk_1",
        "dataset_label": "weekly_engagement",
        "row_start_inclusive": 0,
        "row_end_inclusive": 31,
        "row_count": 32,
        "source_artifact_path": "Docs/evaluation_v2/Runs/phase6_evidence/full_query_artifacts/SAMPLE_OULAD__S-T05__baseline_first_20_rows.json",
        "source_artifact_sha256": "17ee165e0ca60f7ead844847ccac1ba6d99fc811331d66454601d20a506b5fda"
      }
    ]
  },
  "retrieved_datasets_sha256": "66971a60c1a5faacfcf711c53301837cdb6f40c85bd9e6bd3f8e189e2c058a80",
  "retrieved_datasets": {
    "weekly_engagement": [
      {
        "week_number": -2,
        "weekly_clicks": 86,
        "rolling_3wk_avg": null,
        "weekly_engagement_drop": null,
        "early_warning_week": 0
      },
      {
        "week_number": -1,
        "weekly_clicks": 94,
        "rolling_3wk_avg": "86",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 0,
        "weekly_clicks": 27,
        "rolling_3wk_avg": "90",
        "weekly_engagement_drop": true,
        "early_warning_week": 0
      },
      {
        "week_number": 1,
        "weekly_clicks": 98,
        "rolling_3wk_avg": "69",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 2,
        "weekly_clicks": 4,
        "rolling_3wk_avg": "73",
        "weekly_engagement_drop": true,
        "early_warning_week": 0
      },
      {
        "week_number": 3,
        "weekly_clicks": 28,
        "rolling_3wk_avg": "43",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 4,
        "weekly_clicks": 7,
        "rolling_3wk_avg": "43.3333333333333333",
        "weekly_engagement_drop": true,
        "early_warning_week": 0
      },
      {
        "week_number": 5,
        "weekly_clicks": 16,
        "rolling_3wk_avg": "13",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 6,
        "weekly_clicks": 80,
        "rolling_3wk_avg": "17",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 8,
        "weekly_clicks": 2,
        "rolling_3wk_avg": "34.3333333333333333",
        "weekly_engagement_drop": true,
        "early_warning_week": 0
      },
      {
        "week_number": 9,
        "weekly_clicks": 48,
        "rolling_3wk_avg": "32.6666666666666667",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 10,
        "weekly_clicks": 3,
        "rolling_3wk_avg": "43.3333333333333333",
        "weekly_engagement_drop": true,
        "early_warning_week": 0
      },
      {
        "week_number": 11,
        "weekly_clicks": 3,
        "rolling_3wk_avg": "17.6666666666666667",
        "weekly_engagement_drop": true,
        "early_warning_week": 0
      },
      {
        "week_number": 12,
        "weekly_clicks": 56,
        "rolling_3wk_avg": "18",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 13,
        "weekly_clicks": 53,
        "rolling_3wk_avg": "20.6666666666666667",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 14,
        "weekly_clicks": 71,
        "rolling_3wk_avg": "37.3333333333333333",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 15,
        "weekly_clicks": 29,
        "rolling_3wk_avg": "60",
        "weekly_engagement_drop": true,
        "early_warning_week": 0
      },
      {
        "week_number": 16,
        "weekly_clicks": 24,
        "rolling_3wk_avg": "51",
        "weekly_engagement_drop": true,
        "early_warning_week": 0
      },
      {
        "week_number": 17,
        "weekly_clicks": 24,
        "rolling_3wk_avg": "41.3333333333333333",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 18,
        "weekly_clicks": 1,
        "rolling_3wk_avg": "25.6666666666666667",
        "weekly_engagement_drop": true,
        "early_warning_week": 0
      },
      {
        "week_number": 19,
        "weekly_clicks": 45,
        "rolling_3wk_avg": "16.3333333333333333",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 20,
        "weekly_clicks": 101,
        "rolling_3wk_avg": "23.3333333333333333",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 21,
        "weekly_clicks": 106,
        "rolling_3wk_avg": "49",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 22,
        "weekly_clicks": 78,
        "rolling_3wk_avg": "84",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 24,
        "weekly_clicks": 10,
        "rolling_3wk_avg": "95",
        "weekly_engagement_drop": true,
        "early_warning_week": 0
      },
      {
        "week_number": 25,
        "weekly_clicks": 1,
        "rolling_3wk_avg": "64.6666666666666667",
        "weekly_engagement_drop": true,
        "early_warning_week": 0
      },
      {
        "week_number": 27,
        "weekly_clicks": 15,
        "rolling_3wk_avg": "29.6666666666666667",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 28,
        "weekly_clicks": 8,
        "rolling_3wk_avg": "8.6666666666666667",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 29,
        "weekly_clicks": 41,
        "rolling_3wk_avg": "8",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 30,
        "weekly_clicks": 43,
        "rolling_3wk_avg": "21.3333333333333333",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 31,
        "weekly_clicks": 54,
        "rolling_3wk_avg": "30.6666666666666667",
        "weekly_engagement_drop": false,
        "early_warning_week": 0
      },
      {
        "week_number": 35,
        "weekly_clicks": 5,
        "rolling_3wk_avg": "46",
        "weekly_engagement_drop": true,
        "early_warning_week": 0
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_baseline/explanation_artifacts/SAMPLE_OULAD__S-T05__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "2509daa09747a0d7d1b1233f28bd63f71948bc6814b218a4f5110472d642c1b7",
  "generator_input_sha256": "ce7c62f2417edb78aa450c884a7bd9cfd1229cb5a01895bb4cfd7981da76ef35",
  "generator_input_compact": {
    "task_id": "S-T05",
    "execution_id": "exec_1781820408963_9414857a",
    "task_name": "Weekly engagement trend",
    "analysis_type": "trend",
    "explanation_strategy": "behavioral",
    "actionable_question": "Which weeks did I disengage and why might that be?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "weekly_engagement"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "weekly_engagement"
    ],
    "dataset_row_counts": {
      "weekly_engagement": 32
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
  "raw_text": "Summary: Your engagement has shown some fluctuations over the weeks, with notable drops in activity that may indicate periods of disengagement. Specifically, weeks 0, 2, 4, 8, 10, 11, 15, 16, and 18 experienced significant declines in your weekly clicks.\n\nInsights: Significant Engagement Drops: You experienced sharp drops in engagement during several weeks, particularly in week 0 (27 clicks), week 2 (4 clicks), and week 10 (3 clicks). These drops suggest moments where you may have struggled to stay engaged with the course material. | Recovery in Engagement: After the drops, you showed some recovery in engagement, particularly in week 12 (56 clicks) and week 13 (53 clicks). This indicates that you can bounce back and re-engage with the course material.\n\nEducational implications: Identifying the reasons behind your disengagement can help you develop strategies to maintain consistent engagement.\n\nRecommendations: high - Reflect on the weeks where engagement dropped significantly and identify any external factors or challenges you faced. - Understanding the reasons for disengagement can help you create a plan to overcome similar challenges in the future. | medium - Set small, achievable goals for each week to maintain a steady engagement level. - Breaking down your tasks can make the workload feel more manageable and help you stay on track.",
  "structured_payload": {
    "task_id": "S-T05",
    "execution_id": "exec_1781820408963_9414857a",
    "explanation": {
      "summary": "Your engagement has shown some fluctuations over the weeks, with notable drops in activity that may indicate periods of disengagement. Specifically, weeks 0, 2, 4, 8, 10, 11, 15, 16, and 18 experienced significant declines in your weekly clicks.",
      "insights": [
        {
          "title": "Significant Engagement Drops",
          "description": "You experienced sharp drops in engagement during several weeks, particularly in week 0 (27 clicks), week 2 (4 clicks), and week 10 (3 clicks). These drops suggest moments where you may have struggled to stay engaged with the course material.",
          "severity": "high",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 27,
              "comparison": "down_from_previous",
              "delta": -67,
              "context": "Week 0 compared to week -1"
            },
            {
              "metric": "weekly_clicks",
              "value": 4,
              "comparison": "down_from_previous",
              "delta": -24,
              "context": "Week 2 compared to week 1"
            },
            {
              "metric": "weekly_clicks",
              "value": 3,
              "comparison": "down_from_previous",
              "delta": -45,
              "context": "Week 10 compared to week 9"
            }
          ]
        },
        {
          "title": "Recovery in Engagement",
          "description": "After the drops, you showed some recovery in engagement, particularly in week 12 (56 clicks) and week 13 (53 clicks). This indicates that you can bounce back and re-engage with the course material.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 56,
              "comparison": "up_from_previous",
              "delta": 53,
              "context": "Week 12 compared to week 11"
            },
            {
              "metric": "weekly_clicks",
              "value": 53,
              "comparison": "down_from_previous",
              "delta": -3,
              "context": "Week 13 compared to week 12"
            }
          ]
        }
      ],
      "educational_implications": [
        "Identifying the reasons behind your disengagement can help you develop strategies to maintain consistent engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Reflect on the weeks where engagement dropped significantly and identify any external factors or challenges you faced.",
          "rationale": "Understanding the reasons for disengagement can help you create a plan to overcome similar challenges in the future."
        },
        {
          "priority": "medium",
          "action": "Set small, achievable goals for each week to maintain a steady engagement level.",
          "rationale": "Breaking down your tasks can make the workload feel more manageable and help you stay on track."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided shows clear patterns of engagement and disengagement over the weeks.",
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
      "latency_ms": 8948,
      "token_usage": {
        "prompt_tokens": 1584,
        "completion_tokens": 688,
        "total_tokens": 2272
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.00065
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_baseline/explanation_artifacts/SAMPLE_OULAD__S-T05__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "2509daa09747a0d7d1b1233f28bd63f71948bc6814b218a4f5110472d642c1b7",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1584,
      "completion_tokens": 688,
      "total_tokens": 2272
    },
    "latency_ms": 8953,
    "attempts_used": null
  },
  "source_response_body": {
    "task_id": "S-T05",
    "execution_id": "exec_1781820408963_9414857a",
    "explanation": {
      "summary": "Your engagement has shown some fluctuations over the weeks, with notable drops in activity that may indicate periods of disengagement. Specifically, weeks 0, 2, 4, 8, 10, 11, 15, 16, and 18 experienced significant declines in your weekly clicks.",
      "insights": [
        {
          "title": "Significant Engagement Drops",
          "description": "You experienced sharp drops in engagement during several weeks, particularly in week 0 (27 clicks), week 2 (4 clicks), and week 10 (3 clicks). These drops suggest moments where you may have struggled to stay engaged with the course material.",
          "severity": "high",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 27,
              "comparison": "down_from_previous",
              "delta": -67,
              "context": "Week 0 compared to week -1"
            },
            {
              "metric": "weekly_clicks",
              "value": 4,
              "comparison": "down_from_previous",
              "delta": -24,
              "context": "Week 2 compared to week 1"
            },
            {
              "metric": "weekly_clicks",
              "value": 3,
              "comparison": "down_from_previous",
              "delta": -45,
              "context": "Week 10 compared to week 9"
            }
          ]
        },
        {
          "title": "Recovery in Engagement",
          "description": "After the drops, you showed some recovery in engagement, particularly in week 12 (56 clicks) and week 13 (53 clicks). This indicates that you can bounce back and re-engage with the course material.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 56,
              "comparison": "up_from_previous",
              "delta": 53,
              "context": "Week 12 compared to week 11"
            },
            {
              "metric": "weekly_clicks",
              "value": 53,
              "comparison": "down_from_previous",
              "delta": -3,
              "context": "Week 13 compared to week 12"
            }
          ]
        }
      ],
      "educational_implications": [
        "Identifying the reasons behind your disengagement can help you develop strategies to maintain consistent engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Reflect on the weeks where engagement dropped significantly and identify any external factors or challenges you faced.",
          "rationale": "Understanding the reasons for disengagement can help you create a plan to overcome similar challenges in the future."
        },
        {
          "priority": "medium",
          "action": "Set small, achievable goals for each week to maintain a steady engagement level.",
          "rationale": "Breaking down your tasks can make the workload feel more manageable and help you stay on track."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided shows clear patterns of engagement and disengagement over the weeks.",
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
      "latency_ms": 8948,
      "token_usage": {
        "prompt_tokens": 1584,
        "completion_tokens": 688,
        "total_tokens": 2272
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.00065
    }
  }
}
```

## Pilot-Minimal Deterministic Checks

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
    "observed": "17ee165e0ca60f7ead844847ccac1ba6d99fc811331d66454601d20a506b5fda",
    "expected_values": [
      "17ee165e0ca60f7ead844847ccac1ba6d99fc811331d66454601d20a506b5fda"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "66971a60c1a5faacfcf711c53301837cdb6f40c85bd9e6bd3f8e189e2c058a80",
    "expected": "66971a60c1a5faacfcf711c53301837cdb6f40c85bd9e6bd3f8e189e2c058a80"
  },
  {
    "check_id": "numeric_fields_weekly_engagement",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "weekly_engagement",
    "numeric_columns": [
      "early_warning_week",
      "week_number",
      "weekly_clicks"
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
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_weekly_engagement",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "weekly_engagement",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
