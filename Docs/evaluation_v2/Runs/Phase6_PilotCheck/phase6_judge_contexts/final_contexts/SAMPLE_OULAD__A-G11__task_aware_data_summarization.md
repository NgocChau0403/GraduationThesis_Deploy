# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-G11__task_aware_data_summarization

This Phase 6.4b context is the record-level evidence package to supply with the frozen Judge Prompt V2 during pilot judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G11__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_pilot_phase6_4",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G11",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Weekly engagement drop detection",
  "scope": "Many students",
  "actionable_question": "Which weeks should the admin schedule check-ins or motivational nudges?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Use early_warning_week [FE] to pinpoint critical weeks. Recommend admin action timing (e.g. week 5 intervention).",
  "query_labels": [
    "weekly_drop_detection"
  ],
  "explanation_strategy": "trend"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement [OULAD only]"
  ],
  "key_db_fields": [
    "week_number",
    "engagement_count; is_drop_week [FE cross]",
    "rolling_3wk_avg",
    "drop_pct"
  ],
  "output_schema": {},
  "query_labels": [
    "weekly_drop_detection"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G11-CORE-01",
      "description": "Identify the critical weeks in which cohort-level engagement declined."
    },
    {
      "requirement_id": "A-G11-CORE-02",
      "description": "Recommend admin action timing relative to the identified critical weeks."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G11-CONSTRAINT-01",
      "description": "Use early_warning_week as the primary timing field when returned."
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
      "dataset_label": "weekly_drop_detection",
      "artifact_path": "Docs/evaluation_v2/Runs/phase6_evidence/full_query_artifacts/SAMPLE_OULAD__A-G11__task_aware_data_summarization.json",
      "artifact_sha256": "08d87fcea1eea2534a97c7d887b5d19cdfb2cbe269d24c8d17ee32a75c4af7ec",
      "row_count": 42,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 42,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 42,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/phase6_judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G11__task_aware_data_summarization.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "08d87fcea1eea2534a97c7d887b5d19cdfb2cbe269d24c8d17ee32a75c4af7ec",
  "evidence_rows_sha256": "c51ebc327ed5c47b125169372966cc7570bc34f78ebbe353e84ce97ac8a22949",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 42,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__A-G11__task_aware_data_summarization__weekly_drop_detection__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "weekly_drop_detection",
        "row_start_inclusive": 0,
        "row_end_inclusive": 41,
        "row_count": 42
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
    "generated_at": "2026-06-18T22:36:58.863Z",
    "record_id": "SAMPLE_OULAD__A-G11__task_aware_data_summarization",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__A-G11__task_aware_data_summarization__weekly_drop_detection__chunk_1",
        "dataset_label": "weekly_drop_detection",
        "row_start_inclusive": 0,
        "row_end_inclusive": 41,
        "row_count": 42,
        "source_artifact_path": "Docs/evaluation_v2/Runs/phase6_evidence/full_query_artifacts/SAMPLE_OULAD__A-G11__task_aware_data_summarization.json",
        "source_artifact_sha256": "08d87fcea1eea2534a97c7d887b5d19cdfb2cbe269d24c8d17ee32a75c4af7ec"
      }
    ]
  },
  "retrieved_datasets_sha256": "c51ebc327ed5c47b125169372966cc7570bc34f78ebbe353e84ce97ac8a22949",
  "retrieved_datasets": {
    "weekly_drop_detection": [
      {
        "week_number": -2,
        "week_total_clicks": 38370,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": null,
        "is_drop_week": null,
        "drop_pct": null
      },
      {
        "week_number": -1,
        "week_total_clicks": 42418,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "38370",
        "is_drop_week": false,
        "drop_pct": "0.10549908782903309878"
      },
      {
        "week_number": 0,
        "week_total_clicks": 57472,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "40394",
        "is_drop_week": false,
        "drop_pct": "0.42278556221220973412"
      },
      {
        "week_number": 1,
        "week_total_clicks": 137255,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "46086.666666666667",
        "is_drop_week": false,
        "drop_pct": "1.9781932590771011"
      },
      {
        "week_number": 2,
        "week_total_clicks": 156986,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "79048.333333333333",
        "is_drop_week": false,
        "drop_pct": "0.98594952455248899191"
      },
      {
        "week_number": 3,
        "week_total_clicks": 228353,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "117237.666666666667",
        "is_drop_week": false,
        "drop_pct": "0.94777844435662030705"
      },
      {
        "week_number": 4,
        "week_total_clicks": 90777,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "174198",
        "is_drop_week": false,
        "drop_pct": "-0.47888609513312437571"
      },
      {
        "week_number": 5,
        "week_total_clicks": 101601,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "158705.333333333333",
        "is_drop_week": false,
        "drop_pct": "-0.35981357484310546035"
      },
      {
        "week_number": 6,
        "week_total_clicks": 62604,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "140243.666666666667",
        "is_drop_week": true,
        "drop_pct": "-0.5536055104092638775"
      },
      {
        "week_number": 7,
        "week_total_clicks": 60600,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "84994",
        "is_drop_week": false,
        "drop_pct": "-0.28700849471727416053"
      },
      {
        "week_number": 8,
        "week_total_clicks": 61094,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "74935",
        "is_drop_week": false,
        "drop_pct": "-0.18470674584640021352"
      },
      {
        "week_number": 9,
        "week_total_clicks": 77831,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "61432.666666666667",
        "is_drop_week": false,
        "drop_pct": "0.26693181694863752582"
      },
      {
        "week_number": 10,
        "week_total_clicks": 160176,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "66508.333333333333",
        "is_drop_week": false,
        "drop_pct": "1.4083598546548052"
      },
      {
        "week_number": 11,
        "week_total_clicks": 26756,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "99700.333333333333",
        "is_drop_week": true,
        "drop_pct": "-0.73163580195318638096"
      },
      {
        "week_number": 12,
        "week_total_clicks": 16424,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "88254.333333333333",
        "is_drop_week": true,
        "drop_pct": "-0.81390148925642933421"
      },
      {
        "week_number": 13,
        "week_total_clicks": 24376,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "67785.333333333333",
        "is_drop_week": true,
        "drop_pct": "-0.64039418556619917603"
      },
      {
        "week_number": 14,
        "week_total_clicks": 41590,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "22518.666666666667",
        "is_drop_week": false,
        "drop_pct": "0.84691219136716203081"
      },
      {
        "week_number": 15,
        "week_total_clicks": 50112,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "27463.333333333333",
        "is_drop_week": false,
        "drop_pct": "0.82468746207063966288"
      },
      {
        "week_number": 16,
        "week_total_clicks": 77776,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "38692.666666666667",
        "is_drop_week": false,
        "drop_pct": "1.01009665914299004109"
      },
      {
        "week_number": 17,
        "week_total_clicks": 54498,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "56492.666666666667",
        "is_drop_week": false,
        "drop_pct": "-0.03530841761172542138"
      },
      {
        "week_number": 18,
        "week_total_clicks": 48767,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "60795.333333333333",
        "is_drop_week": false,
        "drop_pct": "-0.19784961565032403363"
      },
      {
        "week_number": 19,
        "week_total_clicks": 45348,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "60347",
        "is_drop_week": false,
        "drop_pct": "-0.2485459094901154987"
      },
      {
        "week_number": 20,
        "week_total_clicks": 70000,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "49537.666666666667",
        "is_drop_week": false,
        "drop_pct": "0.41306615168255804396"
      },
      {
        "week_number": 21,
        "week_total_clicks": 164684,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "54705",
        "is_drop_week": false,
        "drop_pct": "2.0104012430308016"
      },
      {
        "week_number": 22,
        "week_total_clicks": 47334,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "93344",
        "is_drop_week": false,
        "drop_pct": "-0.49290795337675694206"
      },
      {
        "week_number": 23,
        "week_total_clicks": 57005,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "94006",
        "is_drop_week": false,
        "drop_pct": "-0.3936025360083398932"
      },
      {
        "week_number": 24,
        "week_total_clicks": 33900,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "89674.333333333333",
        "is_drop_week": true,
        "drop_pct": "-0.62196540816212740034"
      },
      {
        "week_number": 25,
        "week_total_clicks": 29054,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "46079.666666666667",
        "is_drop_week": false,
        "drop_pct": "-0.36948328619275313501"
      },
      {
        "week_number": 26,
        "week_total_clicks": 29355,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "39986.333333333333",
        "is_drop_week": false,
        "drop_pct": "-0.26587417367600596259"
      },
      {
        "week_number": 27,
        "week_total_clicks": 31753,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "30769.666666666667",
        "is_drop_week": false,
        "drop_pct": "0.03195788059669153569"
      },
      {
        "week_number": 28,
        "week_total_clicks": 36969,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "30054",
        "is_drop_week": false,
        "drop_pct": "0.23008584547813934917"
      },
      {
        "week_number": 29,
        "week_total_clicks": 45709,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "32692.333333333333",
        "is_drop_week": false,
        "drop_pct": "0.39815655046545062959"
      },
      {
        "week_number": 30,
        "week_total_clicks": 76456,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "38143.666666666667",
        "is_drop_week": false,
        "drop_pct": "1.00442187868671949031"
      },
      {
        "week_number": 31,
        "week_total_clicks": 137379,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "53044.666666666667",
        "is_drop_week": false,
        "drop_pct": "1.5898739427149446"
      },
      {
        "week_number": 32,
        "week_total_clicks": 53812,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "86514.666666666667",
        "is_drop_week": false,
        "drop_pct": "-0.37800141787134358961"
      },
      {
        "week_number": 33,
        "week_total_clicks": 70304,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "89215.666666666667",
        "is_drop_week": false,
        "drop_pct": "-0.21197696966526806124"
      },
      {
        "week_number": 34,
        "week_total_clicks": 98919,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "87165",
        "is_drop_week": false,
        "drop_pct": "0.13484770263293753227"
      },
      {
        "week_number": 35,
        "week_total_clicks": 126367,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "74345",
        "is_drop_week": false,
        "drop_pct": "0.69973770932813235591"
      },
      {
        "week_number": 36,
        "week_total_clicks": 11221,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "98530",
        "is_drop_week": true,
        "drop_pct": "-0.8861159037856490409"
      },
      {
        "week_number": 37,
        "week_total_clicks": 4778,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "78835.666666666667",
        "is_drop_week": true,
        "drop_pct": "-0.93939291437462738972"
      },
      {
        "week_number": 38,
        "week_total_clicks": 4672,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "47455.333333333333",
        "is_drop_week": true,
        "drop_pct": "-0.90154952727477066084"
      },
      {
        "week_number": 39,
        "week_total_clicks": 2117,
        "cohort_avg_clicks": "66499.333333333333",
        "rolling_3wk_avg": "6890.3333333333333333",
        "is_drop_week": true,
        "drop_pct": "-0.69275797010304291036"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_task_aware/explanation_artifacts/SAMPLE_OULAD__A-G11__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "750cedb53e3696c0a7371243cebcea9e67dd1fc2975e9667e0c038a68e183699",
  "generator_input_sha256": "35f0a11501465ede477ac8f8204ef2c43879ef127a40d3be7471fb6eb11f11cc",
  "generator_input_compact": {
    "task_id": "A-G11",
    "execution_id": "exec_1781820435467_a337bca1",
    "task_name": "Weekly engagement drop detection",
    "analysis_type": "trend",
    "explanation_strategy": "trend",
    "actionable_question": "Which weeks should the admin schedule check-ins or motivational nudges?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "weekly_drop_detection"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "weekly_drop_detection"
    ],
    "dataset_row_counts": {
      "weekly_drop_detection": 42
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "week_total_clicks",
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
  "raw_text": "Summary: The engagement trend exhibits a significant decline over the observed weeks, culminating in a sharp drop in week 39. This downward trajectory indicates a critical need for timely interventions to support student engagement.\n\nInsights: Overall Decline in Engagement: The total clicks decreased from 38,370 in week -2 to 2,117 in week 39, representing a drastic decline of 36,253 clicks, or approximately 94.48%. This indicates a severe drop in student engagement over the observed period. | Notable Turning Points: The largest adjacent drop occurred between week 3 (228,353 clicks) and week 4 (90,777 clicks), with a delta of -137,576 clicks. This sharp decline marks a critical turning point in engagement levels. | Lowest Engagement Recorded: Week 39 recorded the lowest engagement with only 2,117 clicks, indicating a trough in student interaction. This low point suggests a critical need for intervention to re-engage students.\n\nEducational implications: The significant decline in engagement suggests that students may be struggling with course material or losing motivation, necessitating timely support and intervention strategies.\n\nRecommendations: high - Schedule check-ins or motivational nudges during weeks 4, 11, and 39. - These weeks correspond to notable drops in engagement, indicating critical points where students may benefit from additional support.\n\nWarnings: Trend points capped at 40 of 42 rows.",
  "structured_payload": {
    "task_id": "A-G11",
    "execution_id": "exec_1781820435467_a337bca1",
    "explanation": {
      "summary": "The engagement trend exhibits a significant decline over the observed weeks, culminating in a sharp drop in week 39. This downward trajectory indicates a critical need for timely interventions to support student engagement.",
      "insights": [
        {
          "title": "Overall Decline in Engagement",
          "description": "The total clicks decreased from 38,370 in week -2 to 2,117 in week 39, representing a drastic decline of 36,253 clicks, or approximately 94.48%. This indicates a severe drop in student engagement over the observed period.",
          "severity": "high",
          "evidence": [
            {
              "metric": "week_total_clicks",
              "value": 2117,
              "comparison": "down_from_previous",
              "delta": -36253,
              "context": "from week -2 to week 39"
            }
          ]
        },
        {
          "title": "Notable Turning Points",
          "description": "The largest adjacent drop occurred between week 3 (228,353 clicks) and week 4 (90,777 clicks), with a delta of -137,576 clicks. This sharp decline marks a critical turning point in engagement levels.",
          "severity": "high",
          "evidence": [
            {
              "metric": "week_total_clicks",
              "value": 90777,
              "comparison": "down_from_previous",
              "delta": -137576,
              "context": "from week 3 to week 4"
            }
          ]
        },
        {
          "title": "Lowest Engagement Recorded",
          "description": "Week 39 recorded the lowest engagement with only 2,117 clicks, indicating a trough in student interaction. This low point suggests a critical need for intervention to re-engage students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "week_total_clicks",
              "value": 2117,
              "comparison": "trough",
              "delta": null,
              "context": "week 39"
            }
          ]
        }
      ],
      "educational_implications": [
        "The significant decline in engagement suggests that students may be struggling with course material or losing motivation, necessitating timely support and intervention strategies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Schedule check-ins or motivational nudges during weeks 4, 11, and 39.",
          "rationale": "These weeks correspond to notable drops in engagement, indicating critical points where students may benefit from additional support."
        }
      ],
      "warnings": [
        "Trend points capped at 40 of 42 rows."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset comprises a robust sample size of 1998 students across 9 assessments, providing a strong statistical basis for the analysis.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 42,
    "included_row_count": null,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": false,
    "dataset_row_breakdown": [
      {
        "dataset_name": "weekly_drop_detection",
        "row_count": 42,
        "included_row_count": 42
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 10178,
      "token_usage": {
        "prompt_tokens": 3010,
        "completion_tokens": 633,
        "total_tokens": 3643
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000831
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_task_aware/explanation_artifacts/SAMPLE_OULAD__A-G11__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "750cedb53e3696c0a7371243cebcea9e67dd1fc2975e9667e0c038a68e183699",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 3010,
      "completion_tokens": 633,
      "total_tokens": 3643
    },
    "latency_ms": 10225,
    "attempts_used": 2
  },
  "source_response_body": {
    "task_id": "A-G11",
    "execution_id": "exec_1781820435467_a337bca1",
    "explanation": {
      "summary": "The engagement trend exhibits a significant decline over the observed weeks, culminating in a sharp drop in week 39. This downward trajectory indicates a critical need for timely interventions to support student engagement.",
      "insights": [
        {
          "title": "Overall Decline in Engagement",
          "description": "The total clicks decreased from 38,370 in week -2 to 2,117 in week 39, representing a drastic decline of 36,253 clicks, or approximately 94.48%. This indicates a severe drop in student engagement over the observed period.",
          "severity": "high",
          "evidence": [
            {
              "metric": "week_total_clicks",
              "value": 2117,
              "comparison": "down_from_previous",
              "delta": -36253,
              "context": "from week -2 to week 39"
            }
          ]
        },
        {
          "title": "Notable Turning Points",
          "description": "The largest adjacent drop occurred between week 3 (228,353 clicks) and week 4 (90,777 clicks), with a delta of -137,576 clicks. This sharp decline marks a critical turning point in engagement levels.",
          "severity": "high",
          "evidence": [
            {
              "metric": "week_total_clicks",
              "value": 90777,
              "comparison": "down_from_previous",
              "delta": -137576,
              "context": "from week 3 to week 4"
            }
          ]
        },
        {
          "title": "Lowest Engagement Recorded",
          "description": "Week 39 recorded the lowest engagement with only 2,117 clicks, indicating a trough in student interaction. This low point suggests a critical need for intervention to re-engage students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "week_total_clicks",
              "value": 2117,
              "comparison": "trough",
              "delta": null,
              "context": "week 39"
            }
          ]
        }
      ],
      "educational_implications": [
        "The significant decline in engagement suggests that students may be struggling with course material or losing motivation, necessitating timely support and intervention strategies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Schedule check-ins or motivational nudges during weeks 4, 11, and 39.",
          "rationale": "These weeks correspond to notable drops in engagement, indicating critical points where students may benefit from additional support."
        }
      ],
      "warnings": [
        "Trend points capped at 40 of 42 rows."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset comprises a robust sample size of 1998 students across 9 assessments, providing a strong statistical basis for the analysis.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 42,
    "included_row_count": null,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": false,
    "dataset_row_breakdown": [
      {
        "dataset_name": "weekly_drop_detection",
        "row_count": 42,
        "included_row_count": 42
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 10178,
      "token_usage": {
        "prompt_tokens": 3010,
        "completion_tokens": 633,
        "total_tokens": 3643
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000831
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
    "expected": 42,
    "observed": 42
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "08d87fcea1eea2534a97c7d887b5d19cdfb2cbe269d24c8d17ee32a75c4af7ec",
    "expected_values": [
      "08d87fcea1eea2534a97c7d887b5d19cdfb2cbe269d24c8d17ee32a75c4af7ec"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "c51ebc327ed5c47b125169372966cc7570bc34f78ebbe353e84ce97ac8a22949",
    "expected": "c51ebc327ed5c47b125169372966cc7570bc34f78ebbe353e84ce97ac8a22949"
  },
  {
    "check_id": "numeric_fields_weekly_drop_detection",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "weekly_drop_detection",
    "numeric_columns": [
      "week_number",
      "week_total_clicks"
    ],
    "numeric_summaries": {
      "week_number": {
        "count": 42,
        "min": -2,
        "max": 39
      },
      "week_total_clicks": {
        "count": 42,
        "min": 2117,
        "max": 228353
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_weekly_drop_detection",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "weekly_drop_detection",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
