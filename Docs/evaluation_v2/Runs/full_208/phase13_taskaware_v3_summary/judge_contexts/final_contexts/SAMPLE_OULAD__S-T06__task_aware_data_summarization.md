# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T06__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T06__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T06",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
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
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_inputs/retrieval_logs/SAMPLE_OULAD__S-T06__task_aware_data_summarization.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "b7605ac6cc3732b619dffd19c42f2959bcf09b48013b6b57815400566c9e9914",
  "evidence_rows_sha256": "033b7c6de141348ba7b717bbaf3eba6ede32c2705ad028cbcf2ee98108d4633a",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 32,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__S-T06__task_aware_data_summarization__consistency_data__chunk_1"
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
    "generated_at": "2026-06-20T16:29:37.477Z",
    "record_id": "SAMPLE_OULAD__S-T06__task_aware_data_summarization",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__S-T06__task_aware_data_summarization__consistency_data__chunk_1",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T06__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "bcdc08e99289624b7706ec015c4c59c4ee0fc75a10ff0e9023d8a6191936bebb",
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
  "raw_text": "Summary: Your engagement with the course has shown significant fluctuations over the weeks, indicating that you may not be studying consistently. There have been notable drops in your weekly clicks, especially in weeks 2 and 10, which could suggest periods of lower engagement.\n\nInsights: Sudden Drop in Engagement: In week 2, your weekly clicks dropped to 4 from 98 in the previous week, marking a significant decrease in activity. This pattern suggests a potential lack of study consistency during that time. | Inconsistent Weekly Activity: Your weekly clicks have varied greatly, with some weeks showing high engagement (like week 1 with 98 clicks) and others very low (like week 10 with 3 clicks). This inconsistency may hinder your overall learning.\n\nEducational implications: Inconsistent study habits can lead to gaps in knowledge and understanding, making it harder to retain information over time.\n\nRecommendations: high - Establish a regular study schedule - Creating a consistent weekly routine can help you maintain steady engagement and improve your understanding of the material. | medium - Set specific goals for each study session - Having clear objectives can keep you focused and motivated, making your study time more effective.",
  "structured_payload": {
    "task_id": "S-T06",
    "execution_id": "exec_1781847906109_700e93ce",
    "explanation": {
      "summary": "Your engagement with the course has shown significant fluctuations over the weeks, indicating that you may not be studying consistently. There have been notable drops in your weekly clicks, especially in weeks 2 and 10, which could suggest periods of lower engagement.",
      "insights": [
        {
          "title": "Sudden Drop in Engagement",
          "description": "In week 2, your weekly clicks dropped to 4 from 98 in the previous week, marking a significant decrease in activity. This pattern suggests a potential lack of study consistency during that time.",
          "severity": "high",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 4,
              "comparison": "down_from_previous",
              "delta": -94,
              "context": "Dropped from 98 in week 1"
            }
          ]
        },
        {
          "title": "Inconsistent Weekly Activity",
          "description": "Your weekly clicks have varied greatly, with some weeks showing high engagement (like week 1 with 98 clicks) and others very low (like week 10 with 3 clicks). This inconsistency may hinder your overall learning.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 3,
              "comparison": "down_from_previous",
              "delta": -45,
              "context": "Dropped from 48 in week 9"
            }
          ]
        }
      ],
      "educational_implications": [
        "Inconsistent study habits can lead to gaps in knowledge and understanding, making it harder to retain information over time."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Establish a regular study schedule",
          "rationale": "Creating a consistent weekly routine can help you maintain steady engagement and improve your understanding of the material."
        },
        {
          "priority": "medium",
          "action": "Set specific goals for each study session",
          "rationale": "Having clear objectives can keep you focused and motivated, making your study time more effective."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows clear trends in your weekly engagement patterns.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 32,
    "included_row_count": 15,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "consistency_data",
        "row_count": 32,
        "included_row_count": 15
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 15,
    "baseline_reference_tokens": 979,
    "task_aware_prompt_tokens": 1683,
    "token_ratio": 1.7191,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (1.7191 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6186,
      "token_usage": {
        "prompt_tokens": 2608,
        "completion_tokens": 499,
        "total_tokens": 3107
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000691
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T06__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "bcdc08e99289624b7706ec015c4c59c4ee0fc75a10ff0e9023d8a6191936bebb",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2608,
      "completion_tokens": 499,
      "total_tokens": 3107
    },
    "latency_ms": 6190,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T06",
    "execution_id": "exec_1781847906109_700e93ce",
    "explanation": {
      "summary": "Your engagement with the course has shown significant fluctuations over the weeks, indicating that you may not be studying consistently. There have been notable drops in your weekly clicks, especially in weeks 2 and 10, which could suggest periods of lower engagement.",
      "insights": [
        {
          "title": "Sudden Drop in Engagement",
          "description": "In week 2, your weekly clicks dropped to 4 from 98 in the previous week, marking a significant decrease in activity. This pattern suggests a potential lack of study consistency during that time.",
          "severity": "high",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 4,
              "comparison": "down_from_previous",
              "delta": -94,
              "context": "Dropped from 98 in week 1"
            }
          ]
        },
        {
          "title": "Inconsistent Weekly Activity",
          "description": "Your weekly clicks have varied greatly, with some weeks showing high engagement (like week 1 with 98 clicks) and others very low (like week 10 with 3 clicks). This inconsistency may hinder your overall learning.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "weekly_clicks",
              "value": 3,
              "comparison": "down_from_previous",
              "delta": -45,
              "context": "Dropped from 48 in week 9"
            }
          ]
        }
      ],
      "educational_implications": [
        "Inconsistent study habits can lead to gaps in knowledge and understanding, making it harder to retain information over time."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Establish a regular study schedule",
          "rationale": "Creating a consistent weekly routine can help you maintain steady engagement and improve your understanding of the material."
        },
        {
          "priority": "medium",
          "action": "Set specific goals for each study session",
          "rationale": "Having clear objectives can keep you focused and motivated, making your study time more effective."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows clear trends in your weekly engagement patterns.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 32,
    "included_row_count": 15,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "consistency_data",
        "row_count": 32,
        "included_row_count": 15
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 15,
    "baseline_reference_tokens": 979,
    "task_aware_prompt_tokens": 1683,
    "token_ratio": 1.7191,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (1.7191 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6186,
      "token_usage": {
        "prompt_tokens": 2608,
        "completion_tokens": 499,
        "total_tokens": 3107
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000691
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
