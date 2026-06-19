# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__S-T06__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T06__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T06",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Study consistency check",
  "scope": "1 student",
  "actionable_question": "Am I studying steadily or only before exams?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Distinguish 'steady learner' from 'pre-exam crammer'. Recommend a consistent weekly routine.",
  "query_labels": [
    "consistency_data"
  ],
  "explanation_strategy": "behavioral"
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
    "engagement_count; consistency_level [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "consistency_data"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T06-CORE-01",
      "description": "Characterise the observed study pattern as steady or concentrated before assessments when evidence supports that distinction."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "S-T06-SUPPORT-01",
      "description": "Recommend a consistent weekly routine grounded in the observed study pattern."
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
      "dataset_label": "consistency_data",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T06.json",
      "artifact_sha256": "b7605ac6cc3732b619dffd19c42f2959bcf09b48013b6b57815400566c9e9914",
      "row_count": 32,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 32,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 32,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_OULAD__S-T06__baseline_first_20_rows.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "b7605ac6cc3732b619dffd19c42f2959bcf09b48013b6b57815400566c9e9914",
  "evidence_rows_sha256": "033b7c6de141348ba7b717bbaf3eba6ede32c2705ad028cbcf2ee98108d4633a",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 32,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__S-T06__baseline_first_20_rows__consistency_data__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "consistency_data",
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
    "generated_at": "2026-06-19T07:41:45.674Z",
    "record_id": "SAMPLE_OULAD__S-T06__baseline_first_20_rows",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__S-T06__baseline_first_20_rows__consistency_data__chunk_1",
        "dataset_label": "consistency_data",
        "row_start_inclusive": 0,
        "row_end_inclusive": 31,
        "row_count": 32,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T06.json",
        "source_artifact_sha256": "b7605ac6cc3732b619dffd19c42f2959bcf09b48013b6b57815400566c9e9914"
      }
    ]
  },
  "retrieved_datasets_sha256": "033b7c6de141348ba7b717bbaf3eba6ede32c2705ad028cbcf2ee98108d4633a",
  "retrieved_datasets": {
    "consistency_data": [
      {
        "week_number": -2,
        "weekly_clicks": 86,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": -1,
        "weekly_clicks": 94,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 0,
        "weekly_clicks": 27,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 1,
        "weekly_clicks": 98,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 2,
        "weekly_clicks": 4,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 3,
        "weekly_clicks": 28,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 4,
        "weekly_clicks": 7,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 5,
        "weekly_clicks": 16,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 6,
        "weekly_clicks": 80,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 8,
        "weekly_clicks": 2,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 9,
        "weekly_clicks": 48,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 10,
        "weekly_clicks": 3,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 11,
        "weekly_clicks": 3,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 12,
        "weekly_clicks": 56,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 13,
        "weekly_clicks": 53,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 14,
        "weekly_clicks": 71,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 15,
        "weekly_clicks": 29,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 16,
        "weekly_clicks": 24,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 17,
        "weekly_clicks": 24,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 18,
        "weekly_clicks": 1,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 19,
        "weekly_clicks": 45,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 20,
        "weekly_clicks": 101,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 21,
        "weekly_clicks": 106,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 22,
        "weekly_clicks": 78,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 24,
        "weekly_clicks": 10,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 25,
        "weekly_clicks": 1,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 27,
        "weekly_clicks": 15,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 28,
        "weekly_clicks": 8,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 29,
        "weekly_clicks": 41,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 30,
        "weekly_clicks": 43,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 31,
        "weekly_clicks": 54,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      },
      {
        "week_number": 35,
        "weekly_clicks": 5,
        "weekly_stddev": "34.1210930647815541",
        "weekly_avg": "39.40625",
        "total_clicks": "1261",
        "consistency_level": "medium"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T06__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "0976d0fd4881afad4dd14db5cd57ae43f47a1e2535fe1eb7aa9ba316ad7211ce",
  "generator_input_sha256": "60220c5b0e64f0ace33ef770016c62896568591367a447f1ba7ef467b24e6e98",
  "generator_input_compact": {
    "task_id": "S-T06",
    "execution_id": "exec_1781847906109_700e93ce",
    "task_name": "Study consistency check",
    "analysis_type": "distribution",
    "explanation_strategy": "behavioral",
    "actionable_question": "Am I studying steadily or only before exams?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "consistency_data"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "consistency_data"
    ],
    "dataset_row_counts": {
      "consistency_data": 32
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
  "raw_text": "Summary: Your engagement with the course shows some fluctuations, indicating that you may not be studying steadily throughout the weeks. There are notable drops in activity, especially in certain weeks, which suggest that you might be cramming before exams rather than maintaining a consistent study routine.\n\nInsights: Significant Drop in Weekly Clicks: In week 2, your weekly clicks dropped to 4, which is a significant decrease compared to the previous week (94 clicks). This suggests a lack of engagement during that period. | Inconsistent Engagement: Your weekly clicks vary greatly, with some weeks showing high activity (like week 1 with 98 clicks) and others very low (like week 18 with just 1 click). This inconsistency indicates that you may not be studying regularly.\n\nEducational implications: Regular study habits can lead to better retention and understanding of the material.\n\nRecommendations: high - Establish a consistent weekly study schedule. - This will help you maintain steady engagement and reduce the need to cram before exams.",
  "structured_payload": {
    "task_id": "S-T06",
    "execution_id": "exec_1781847906109_700e93ce",
    "explanation": {
      "summary": "Your engagement with the course shows some fluctuations, indicating that you may not be studying steadily throughout the weeks. There are notable drops in activity, especially in certain weeks, which suggest that you might be cramming before exams rather than maintaining a consistent study routine.",
      "insights": [
        {
          "title": "Significant Drop in Weekly Clicks",
          "description": "In week 2, your weekly clicks dropped to 4, which is a significant decrease compared to the previous week (94 clicks). This suggests a lack of engagement during that period.",
          "severity": "high",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 4,
              "comparison": "down_from_previous",
              "delta": -90,
              "context": "Week 1 had 98 clicks"
            }
          ]
        },
        {
          "title": "Inconsistent Engagement",
          "description": "Your weekly clicks vary greatly, with some weeks showing high activity (like week 1 with 98 clicks) and others very low (like week 18 with just 1 click). This inconsistency indicates that you may not be studying regularly.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 1,
              "comparison": "down_from_previous",
              "delta": -23,
              "context": "Week 17 had 24 clicks"
            }
          ]
        }
      ],
      "educational_implications": [
        "Regular study habits can lead to better retention and understanding of the material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Establish a consistent weekly study schedule.",
          "rationale": "This will help you maintain steady engagement and reduce the need to cram before exams."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows clear patterns of engagement and activity levels over time.",
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
      "latency_ms": 6243,
      "token_usage": {
        "prompt_tokens": 1862,
        "completion_tokens": 445,
        "total_tokens": 2307
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000546
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T06__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "0976d0fd4881afad4dd14db5cd57ae43f47a1e2535fe1eb7aa9ba316ad7211ce",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1862,
      "completion_tokens": 445,
      "total_tokens": 2307
    },
    "latency_ms": 6246,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T06",
    "execution_id": "exec_1781847906109_700e93ce",
    "explanation": {
      "summary": "Your engagement with the course shows some fluctuations, indicating that you may not be studying steadily throughout the weeks. There are notable drops in activity, especially in certain weeks, which suggest that you might be cramming before exams rather than maintaining a consistent study routine.",
      "insights": [
        {
          "title": "Significant Drop in Weekly Clicks",
          "description": "In week 2, your weekly clicks dropped to 4, which is a significant decrease compared to the previous week (94 clicks). This suggests a lack of engagement during that period.",
          "severity": "high",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 4,
              "comparison": "down_from_previous",
              "delta": -90,
              "context": "Week 1 had 98 clicks"
            }
          ]
        },
        {
          "title": "Inconsistent Engagement",
          "description": "Your weekly clicks vary greatly, with some weeks showing high activity (like week 1 with 98 clicks) and others very low (like week 18 with just 1 click). This inconsistency indicates that you may not be studying regularly.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 1,
              "comparison": "down_from_previous",
              "delta": -23,
              "context": "Week 17 had 24 clicks"
            }
          ]
        }
      ],
      "educational_implications": [
        "Regular study habits can lead to better retention and understanding of the material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Establish a consistent weekly study schedule.",
          "rationale": "This will help you maintain steady engagement and reduce the need to cram before exams."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows clear patterns of engagement and activity levels over time.",
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
      "latency_ms": 6243,
      "token_usage": {
        "prompt_tokens": 1862,
        "completion_tokens": 445,
        "total_tokens": 2307
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000546
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
    "observed": "b7605ac6cc3732b619dffd19c42f2959bcf09b48013b6b57815400566c9e9914",
    "expected_values": [
      "b7605ac6cc3732b619dffd19c42f2959bcf09b48013b6b57815400566c9e9914"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "033b7c6de141348ba7b717bbaf3eba6ede32c2705ad028cbcf2ee98108d4633a",
    "expected": "033b7c6de141348ba7b717bbaf3eba6ede32c2705ad028cbcf2ee98108d4633a"
  },
  {
    "check_id": "numeric_fields_consistency_data",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "consistency_data",
    "numeric_columns": [
      "week_number",
      "weekly_clicks"
    ],
    "numeric_summaries": {
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
    "check_id": "threshold_flag_fields_consistency_data",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "consistency_data",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
