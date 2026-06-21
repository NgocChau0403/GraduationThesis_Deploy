# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G11__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G11__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
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

## Deterministic Retrieval Evidence

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "weekly_drop_detection",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G11.json",
      "artifact_sha256": "80f171509717c4af5f1cf76142d71941c9827438aba30514b434ddce5d3c5703",
      "row_count": 42,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 42,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 42,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G11__task_aware_data_summarization.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "80f171509717c4af5f1cf76142d71941c9827438aba30514b434ddce5d3c5703",
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
    "generated_at": "2026-06-20T16:29:37.146Z",
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
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G11.json",
        "source_artifact_sha256": "80f171509717c4af5f1cf76142d71941c9827438aba30514b434ddce5d3c5703"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G11__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "12af9b0294e9b621ef118ec66fbc1ecb3d18d6d6693566031711917247d1c4c3",
  "generator_input_sha256": "288116e5e851371891ad3549629d728c9cecfcfb8b35e428a422614210b35685",
  "generator_input_compact": {
    "task_id": "A-G11",
    "execution_id": "exec_1781847770008_241f6ec9",
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
  "raw_text": "Summary: The analysis reveals a significant decline in student engagement over the observed weeks, particularly marked by sharp drops in specific weeks. Notably, weeks 6, 11, and 12 exhibited critical declines, suggesting the need for timely interventions.\n\nInsights: Critical Engagement Drop in Week 6: In week 6, there was a sharp drop in total clicks to 62604, down from 101601 in week 5, indicating a decline of 39097 clicks. This represents a drop percentage of -0.5536, marking it as a critical week for potential intervention. | Significant Decline in Week 11: Week 11 saw a drastic decline in engagement, with total clicks plummeting to 26756 from 160176 in week 10, resulting in a delta of -133420 clicks. This week is critical for scheduling motivational nudges. | Lowest Engagement in Week 12: The lowest engagement was recorded in week 12 with total clicks at 16424, down from 26756 in week 11, indicating a continued decline of 10332 clicks. This trend suggests a need for immediate action to re-engage students.\n\nEducational implications: The significant drops in engagement during weeks 6, 11, and 12 suggest that students may be experiencing challenges that could be addressed through timely check-ins or motivational nudges.\n\nRecommendations: high - Schedule check-ins during weeks 6, 11, and 12. - These weeks showed the most significant declines in engagement, indicating a critical need for support to enhance student motivation and participation.",
  "structured_payload": {
    "task_id": "A-G11",
    "execution_id": "exec_1781847770008_241f6ec9",
    "explanation": {
      "summary": "The analysis reveals a significant decline in student engagement over the observed weeks, particularly marked by sharp drops in specific weeks. Notably, weeks 6, 11, and 12 exhibited critical declines, suggesting the need for timely interventions.",
      "insights": [
        {
          "title": "Critical Engagement Drop in Week 6",
          "description": "In week 6, there was a sharp drop in total clicks to 62604, down from 101601 in week 5, indicating a decline of 39097 clicks. This represents a drop percentage of -0.5536, marking it as a critical week for potential intervention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "week_total_clicks",
              "value": 62604,
              "comparison": "down_from_previous",
              "delta": -39097,
              "context": "Week 5 total clicks were 101601."
            }
          ]
        },
        {
          "title": "Significant Decline in Week 11",
          "description": "Week 11 saw a drastic decline in engagement, with total clicks plummeting to 26756 from 160176 in week 10, resulting in a delta of -133420 clicks. This week is critical for scheduling motivational nudges.",
          "severity": "high",
          "evidence": [
            {
              "metric": "week_total_clicks",
              "value": 26756,
              "comparison": "down_from_previous",
              "delta": -133420,
              "context": "Week 10 total clicks were 160176."
            }
          ]
        },
        {
          "title": "Lowest Engagement in Week 12",
          "description": "The lowest engagement was recorded in week 12 with total clicks at 16424, down from 26756 in week 11, indicating a continued decline of 10332 clicks. This trend suggests a need for immediate action to re-engage students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "week_total_clicks",
              "value": 16424,
              "comparison": "down_from_previous",
              "delta": -10332,
              "context": "Week 11 total clicks were 26756."
            }
          ]
        }
      ],
      "educational_implications": [
        "The significant drops in engagement during weeks 6, 11, and 12 suggest that students may be experiencing challenges that could be addressed through timely check-ins or motivational nudges."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Schedule check-ins during weeks 6, 11, and 12.",
          "rationale": "These weeks showed the most significant declines in engagement, indicating a critical need for support to enhance student motivation and participation."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is high, with a robust sample size of 1998 students across 9 assessments over 8 weeks.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 42,
    "included_row_count": 15,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "weekly_drop_detection",
        "row_count": 42,
        "included_row_count": 15
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 15,
    "baseline_reference_tokens": 1112,
    "task_aware_prompt_tokens": 1688,
    "token_ratio": 1.518,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.small_sample_caveats",
      "action_evidence.action_evidence",
      "exceptions.flagged_points"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (1.518 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 13268,
      "token_usage": {
        "prompt_tokens": 3058,
        "completion_tokens": 667,
        "total_tokens": 3725
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000859
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G11__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "12af9b0294e9b621ef118ec66fbc1ecb3d18d6d6693566031711917247d1c4c3",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 3058,
      "completion_tokens": 667,
      "total_tokens": 3725
    },
    "latency_ms": 13273,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G11",
    "execution_id": "exec_1781847770008_241f6ec9",
    "explanation": {
      "summary": "The analysis reveals a significant decline in student engagement over the observed weeks, particularly marked by sharp drops in specific weeks. Notably, weeks 6, 11, and 12 exhibited critical declines, suggesting the need for timely interventions.",
      "insights": [
        {
          "title": "Critical Engagement Drop in Week 6",
          "description": "In week 6, there was a sharp drop in total clicks to 62604, down from 101601 in week 5, indicating a decline of 39097 clicks. This represents a drop percentage of -0.5536, marking it as a critical week for potential intervention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "week_total_clicks",
              "value": 62604,
              "comparison": "down_from_previous",
              "delta": -39097,
              "context": "Week 5 total clicks were 101601."
            }
          ]
        },
        {
          "title": "Significant Decline in Week 11",
          "description": "Week 11 saw a drastic decline in engagement, with total clicks plummeting to 26756 from 160176 in week 10, resulting in a delta of -133420 clicks. This week is critical for scheduling motivational nudges.",
          "severity": "high",
          "evidence": [
            {
              "metric": "week_total_clicks",
              "value": 26756,
              "comparison": "down_from_previous",
              "delta": -133420,
              "context": "Week 10 total clicks were 160176."
            }
          ]
        },
        {
          "title": "Lowest Engagement in Week 12",
          "description": "The lowest engagement was recorded in week 12 with total clicks at 16424, down from 26756 in week 11, indicating a continued decline of 10332 clicks. This trend suggests a need for immediate action to re-engage students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "week_total_clicks",
              "value": 16424,
              "comparison": "down_from_previous",
              "delta": -10332,
              "context": "Week 11 total clicks were 26756."
            }
          ]
        }
      ],
      "educational_implications": [
        "The significant drops in engagement during weeks 6, 11, and 12 suggest that students may be experiencing challenges that could be addressed through timely check-ins or motivational nudges."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Schedule check-ins during weeks 6, 11, and 12.",
          "rationale": "These weeks showed the most significant declines in engagement, indicating a critical need for support to enhance student motivation and participation."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is high, with a robust sample size of 1998 students across 9 assessments over 8 weeks.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 42,
    "included_row_count": 15,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "weekly_drop_detection",
        "row_count": 42,
        "included_row_count": 15
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 15,
    "baseline_reference_tokens": 1112,
    "task_aware_prompt_tokens": 1688,
    "token_ratio": 1.518,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.small_sample_caveats",
      "action_evidence.action_evidence",
      "exceptions.flagged_points"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (1.518 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 13268,
      "token_usage": {
        "prompt_tokens": 3058,
        "completion_tokens": 667,
        "total_tokens": 3725
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000859
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
    "expected": 42,
    "observed": 42
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "80f171509717c4af5f1cf76142d71941c9827438aba30514b434ddce5d3c5703",
    "expected_values": [
      "80f171509717c4af5f1cf76142d71941c9827438aba30514b434ddce5d3c5703"
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
