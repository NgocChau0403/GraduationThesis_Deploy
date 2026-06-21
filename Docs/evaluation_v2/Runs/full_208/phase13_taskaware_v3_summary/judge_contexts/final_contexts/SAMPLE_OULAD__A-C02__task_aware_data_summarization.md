# LLM Judge Final Judge Context - SAMPLE_OULAD__A-C02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-C02__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-C02",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Compare engagement patterns",
  "scope": "2 students",
  "actionable_question": "Which student is more engaged across total clicks, active days, and combined engagement score?",
  "target_audience": "instructor",
  "ai_summary_type": "multi_metric_comparison",
  "ai_prompt_hint": "Compare the two students using metric, engagement_score, total_clicks, and active_days. Explain which engagement dimension creates the largest gap. Do not infer academic risk unless risk fields are present.",
  "query_labels": [
    "engagement_comparison"
  ],
  "explanation_strategy": "comparison"
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
    "metric [FE cross]",
    "engagement_score [FE cross]",
    "study_effort_level [FE cross]",
    "total_clicks",
    "active_days"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "metric",
      "engagement_score"
    ],
    "optional_columns": [
      "total_clicks",
      "active_days",
      "study_effort_level"
    ]
  },
  "query_labels": [
    "engagement_comparison"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-C02-CORE-01",
      "description": "Compare the two students using metric, engagement_score, total_clicks, and active_days."
    },
    {
      "requirement_id": "A-C02-CORE-02",
      "description": "Explain which engagement dimension creates the largest gap."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-C02-CONSTRAINT-01",
      "description": "Do not infer academic risk unless risk fields are present."
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

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "engagement_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C02.json",
      "artifact_sha256": "68726384d9ea133f2ddbb3ffd580c7ee18a8ad91280d9c40d955fc6222ed5857",
      "row_count": 6,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 6,
  "prompt_embedded_row_count": 6,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "68726384d9ea133f2ddbb3ffd580c7ee18a8ad91280d9c40d955fc6222ed5857",
  "evidence_rows_sha256": "5ca289b6f3abfb1befd40ca0093124bfb749c65f378bea63c13d53c15f317582",
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
  "full_result_row_count": 6,
  "embedded_datasets_sha256": "5ca289b6f3abfb1befd40ca0093124bfb749c65f378bea63c13d53c15f317582",
  "datasets": {
    "engagement_comparison": [
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "metric": "active_days_norm",
        "engagement_score": 0.35251798561151076,
        "total_clicks": 1261,
        "active_days": 98,
        "study_effort_level": "very_low"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "metric": "engagement_score",
        "engagement_score": 0.20237855036820618,
        "total_clicks": 1261,
        "active_days": 98,
        "study_effort_level": "very_low"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "metric": "total_clicks_norm",
        "engagement_score": 0.05223911512490161,
        "total_clicks": 1261,
        "active_days": 98,
        "study_effort_level": "very_low"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_101700",
        "metric": "active_days_norm",
        "engagement_score": 0,
        "total_clicks": 0,
        "active_days": 0,
        "study_effort_level": "very_low"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_101700",
        "metric": "engagement_score",
        "engagement_score": 0,
        "total_clicks": 0,
        "active_days": 0,
        "study_effort_level": "very_low"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_101700",
        "metric": "total_clicks_norm",
        "engagement_score": 0,
        "total_clicks": 0,
        "active_days": 0,
        "study_effort_level": "very_low"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C02__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "6761489847ea5d7333e53af780849ed54b5813ba464945aba79af8175b5fe7a7",
  "generator_input_sha256": "519a3d53f7171b34ef94728ec449cc02059f440425f5b034853786951558711e",
  "generator_input_compact": {
    "task_id": "A-C02",
    "execution_id": "exec_1781847642419_5be485d9",
    "task_name": "Compare engagement patterns",
    "analysis_type": "comparison",
    "explanation_strategy": "comparison",
    "actionable_question": "Which student is more engaged across total clicks, active days, and combined engagement score?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "engagement_comparison"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "engagement_comparison"
    ],
    "dataset_row_counts": {
      "engagement_comparison": 6
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
  "raw_text": "Summary: The analysis of engagement patterns reveals a significant disparity between the two students, with SAMPLE_OULAD_STU_100788 demonstrating a higher level of engagement across all metrics compared to SAMPLE_OULAD_STU_101700, who shows no engagement. This gap is most pronounced in the engagement score.\n\nInsights: Engagement Score Disparity: SAMPLE_OULAD_STU_100788 has an engagement score of 0.2024, while SAMPLE_OULAD_STU_101700 has an engagement score of 0. This indicates a complete lack of engagement for the latter student. | Active Days Engagement: SAMPLE_OULAD_STU_100788 has 98 active days compared to 0 active days for SAMPLE_OULAD_STU_101700, highlighting a stark contrast in engagement frequency. | Total Clicks Comparison: SAMPLE_OULAD_STU_100788 recorded 1261 total clicks, while SAMPLE_OULAD_STU_101700 recorded 0 total clicks, indicating a significant difference in interaction with course materials.\n\nEducational implications: The lack of engagement from SAMPLE_OULAD_STU_101700 suggests a need for targeted interventions to increase participation and interaction with course materials.\n\nRecommendations: high - Implement engagement strategies for SAMPLE_OULAD_STU_101700, such as personalized outreach or incentives for participation. - To address the complete lack of engagement and encourage the student to interact with course content.",
  "structured_payload": {
    "task_id": "A-C02",
    "execution_id": "exec_1781847642419_5be485d9",
    "explanation": {
      "summary": "The analysis of engagement patterns reveals a significant disparity between the two students, with SAMPLE_OULAD_STU_100788 demonstrating a higher level of engagement across all metrics compared to SAMPLE_OULAD_STU_101700, who shows no engagement. This gap is most pronounced in the engagement score.",
      "insights": [
        {
          "title": "Engagement Score Disparity",
          "description": "SAMPLE_OULAD_STU_100788 has an engagement score of 0.2024, while SAMPLE_OULAD_STU_101700 has an engagement score of 0. This indicates a complete lack of engagement for the latter student.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0.2024,
              "comparison": "baseline",
              "delta": 0.2024,
              "context": "SAMPLE_OULAD_STU_100788 vs SAMPLE_OULAD_STU_101700"
            }
          ]
        },
        {
          "title": "Active Days Engagement",
          "description": "SAMPLE_OULAD_STU_100788 has 98 active days compared to 0 active days for SAMPLE_OULAD_STU_101700, highlighting a stark contrast in engagement frequency.",
          "severity": "high",
          "evidence": [
            {
              "metric": "active_days",
              "value": 98,
              "comparison": "baseline",
              "delta": 98,
              "context": "SAMPLE_OULAD_STU_100788 vs SAMPLE_OULAD_STU_101700"
            }
          ]
        },
        {
          "title": "Total Clicks Comparison",
          "description": "SAMPLE_OULAD_STU_100788 recorded 1261 total clicks, while SAMPLE_OULAD_STU_101700 recorded 0 total clicks, indicating a significant difference in interaction with course materials.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_clicks",
              "value": 1261,
              "comparison": "baseline",
              "delta": 1261,
              "context": "SAMPLE_OULAD_STU_100788 vs SAMPLE_OULAD_STU_101700"
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of engagement from SAMPLE_OULAD_STU_101700 suggests a need for targeted interventions to increase participation and interaction with course materials."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement engagement strategies for SAMPLE_OULAD_STU_101700, such as personalized outreach or incentives for participation.",
          "rationale": "To address the complete lack of engagement and encourage the student to interact with course content."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is sufficient, with clear metrics and comparisons available for analysis.",
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
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_comparison",
        "row_count": 6,
        "included_row_count": 6
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 6,
    "baseline_reference_tokens": 323,
    "task_aware_prompt_tokens": 994,
    "token_ratio": 3.0774,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.missing_expected_entities",
      "comparison.metric_extrema",
      "comparison.pairwise_gaps"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.0774 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 9166,
      "token_usage": {
        "prompt_tokens": 1665,
        "completion_tokens": 657,
        "total_tokens": 2322
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000644
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C02__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "6761489847ea5d7333e53af780849ed54b5813ba464945aba79af8175b5fe7a7",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1665,
      "completion_tokens": 657,
      "total_tokens": 2322
    },
    "latency_ms": 9171,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C02",
    "execution_id": "exec_1781847642419_5be485d9",
    "explanation": {
      "summary": "The analysis of engagement patterns reveals a significant disparity between the two students, with SAMPLE_OULAD_STU_100788 demonstrating a higher level of engagement across all metrics compared to SAMPLE_OULAD_STU_101700, who shows no engagement. This gap is most pronounced in the engagement score.",
      "insights": [
        {
          "title": "Engagement Score Disparity",
          "description": "SAMPLE_OULAD_STU_100788 has an engagement score of 0.2024, while SAMPLE_OULAD_STU_101700 has an engagement score of 0. This indicates a complete lack of engagement for the latter student.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0.2024,
              "comparison": "baseline",
              "delta": 0.2024,
              "context": "SAMPLE_OULAD_STU_100788 vs SAMPLE_OULAD_STU_101700"
            }
          ]
        },
        {
          "title": "Active Days Engagement",
          "description": "SAMPLE_OULAD_STU_100788 has 98 active days compared to 0 active days for SAMPLE_OULAD_STU_101700, highlighting a stark contrast in engagement frequency.",
          "severity": "high",
          "evidence": [
            {
              "metric": "active_days",
              "value": 98,
              "comparison": "baseline",
              "delta": 98,
              "context": "SAMPLE_OULAD_STU_100788 vs SAMPLE_OULAD_STU_101700"
            }
          ]
        },
        {
          "title": "Total Clicks Comparison",
          "description": "SAMPLE_OULAD_STU_100788 recorded 1261 total clicks, while SAMPLE_OULAD_STU_101700 recorded 0 total clicks, indicating a significant difference in interaction with course materials.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_clicks",
              "value": 1261,
              "comparison": "baseline",
              "delta": 1261,
              "context": "SAMPLE_OULAD_STU_100788 vs SAMPLE_OULAD_STU_101700"
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of engagement from SAMPLE_OULAD_STU_101700 suggests a need for targeted interventions to increase participation and interaction with course materials."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement engagement strategies for SAMPLE_OULAD_STU_101700, such as personalized outreach or incentives for participation.",
          "rationale": "To address the complete lack of engagement and encourage the student to interact with course content."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is sufficient, with clear metrics and comparisons available for analysis.",
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
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_comparison",
        "row_count": 6,
        "included_row_count": 6
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 6,
    "baseline_reference_tokens": 323,
    "task_aware_prompt_tokens": 994,
    "token_ratio": 3.0774,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.missing_expected_entities",
      "comparison.metric_extrema",
      "comparison.pairwise_gaps"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.0774 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 9166,
      "token_usage": {
        "prompt_tokens": 1665,
        "completion_tokens": 657,
        "total_tokens": 2322
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000644
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
    "expected": 6,
    "observed": 6
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "68726384d9ea133f2ddbb3ffd580c7ee18a8ad91280d9c40d955fc6222ed5857",
    "expected_values": [
      "68726384d9ea133f2ddbb3ffd580c7ee18a8ad91280d9c40d955fc6222ed5857"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "5ca289b6f3abfb1befd40ca0093124bfb749c65f378bea63c13d53c15f317582",
    "expected": "5ca289b6f3abfb1befd40ca0093124bfb749c65f378bea63c13d53c15f317582"
  },
  {
    "check_id": "numeric_fields_engagement_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "engagement_comparison",
    "numeric_columns": [
      "active_days",
      "engagement_score",
      "total_clicks"
    ],
    "numeric_summaries": {
      "active_days": {
        "count": 6,
        "min": 0,
        "max": 98
      },
      "engagement_score": {
        "count": 6,
        "min": 0,
        "max": 0.35251798561151076
      },
      "total_clicks": {
        "count": 6,
        "min": 0,
        "max": 1261
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_engagement_comparison",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "engagement_comparison",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
