# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T08__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T08__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T08",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Assessment lateness impact",
  "scope": "1 student",
  "actionable_question": "Does submitting late actually lower my score?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Use submission_delay_avg [FE] and punctuality_rate [FE]. Explain how delay magnitude correlates with score drop.",
  "query_labels": [
    "submission_lateness"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
    "assessment_result",
    "assessment [OULAD only]"
  ],
  "key_db_fields": [
    "submission_delay_days",
    "score_normalized",
    "assessment_type; submission_delay_avg [FE cross]",
    "punctuality_rate [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "submission_lateness"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T08-CORE-01",
      "description": "State average submission delay and punctuality rate."
    },
    {
      "requirement_id": "S-T08-CORE-02",
      "description": "Describe the observed relationship between delay magnitude and score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T08-CONSTRAINT-01",
      "description": "Use submission_delay_avg and punctuality_rate when returned."
    },
    {
      "constraint_id": "S-T08-CONSTRAINT-02",
      "description": "Frame the delay-score relationship as correlational, not causal."
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
      "dataset_label": "submission_lateness",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T08.json",
      "artifact_sha256": "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018",
      "row_count": 5,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 5,
  "prompt_embedded_row_count": 5,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018",
  "evidence_rows_sha256": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac",
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
  "full_result_row_count": 5,
  "embedded_datasets_sha256": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac",
  "datasets": {
    "submission_lateness": [
      {
        "assessment_order": 1,
        "assessment_type": "CMA",
        "assessment_name": "24295",
        "submission_delay_days": 3,
        "score_normalized": 100,
        "pass_flag": true,
        "submission_day": 21,
        "due_day": 18,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 3,
        "assessment_type": "CMA",
        "assessment_name": "24296",
        "submission_delay_days": 2,
        "score_normalized": 87,
        "pass_flag": true,
        "submission_day": 69,
        "due_day": 67,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 5,
        "assessment_type": "CMA",
        "assessment_name": "24297",
        "submission_delay_days": 3,
        "score_normalized": 90,
        "pass_flag": true,
        "submission_day": 147,
        "due_day": 144,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 8,
        "assessment_type": "CMA",
        "assessment_name": "24298",
        "submission_delay_days": 5,
        "score_normalized": 83,
        "pass_flag": true,
        "submission_day": 219,
        "due_day": 214,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 9,
        "assessment_type": "Exam",
        "assessment_name": "24299",
        "submission_delay_days": null,
        "score_normalized": 96,
        "pass_flag": true,
        "submission_day": 244,
        "due_day": null,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T08__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "89407eb9236cb79058ed5c508301123f054b4d4a7b92d504afbfb415ec97c292",
  "generator_input_sha256": "889ab5c65f5896e61729a6a2fc62e664f7f94a25517565faf216b740681d4e9a",
  "generator_input_compact": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847912365_48ce21c2",
    "task_name": "Assessment lateness impact",
    "analysis_type": "correlation",
    "explanation_strategy": "behavioral",
    "actionable_question": "Does submitting late actually lower my score?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "submission_lateness"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "submission_lateness"
    ],
    "dataset_row_counts": {
      "submission_lateness": 5
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "submission_delay_days",
      "entity_column": null,
      "group_column": null,
      "time_column": "assessment_order",
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
  "raw_text": "Summary: You've shown a pattern of submitting assessments late, which seems to correlate with a drop in your scores. While you have passed all assessments, the increase in submission delays may be impacting your overall performance.\n\nInsights: Increasing Submission Delays: Your submission delays have increased from 3 days to 5 days over the assessments, which is concerning. This trend suggests that you may be struggling to meet deadlines, which could affect your scores. | Score Drop with Delays: Your normalized scores have decreased from 100 to 83 as submission delays increased. This indicates a potential link between late submissions and lower scores.\n\nEducational implications: Timely submissions may enhance your understanding and retention of course material.\n\nRecommendations: high - Create a study schedule to manage your time better. - This will help you stay on track with your assignments and reduce submission delays. | medium - Set reminders for due dates. - Reminders can help you submit your work on time, potentially improving your scores.",
  "structured_payload": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847912365_48ce21c2",
    "explanation": {
      "summary": "You've shown a pattern of submitting assessments late, which seems to correlate with a drop in your scores. While you have passed all assessments, the increase in submission delays may be impacting your overall performance.",
      "insights": [
        {
          "title": "Increasing Submission Delays",
          "description": "Your submission delays have increased from 3 days to 5 days over the assessments, which is concerning. This trend suggests that you may be struggling to meet deadlines, which could affect your scores.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "submission_delay_days",
              "value": 5,
              "comparison": "up_from_previous",
              "delta": 2,
              "context": "Increased from 3 days to 5 days over the assessments."
            }
          ]
        },
        {
          "title": "Score Drop with Delays",
          "description": "Your normalized scores have decreased from 100 to 83 as submission delays increased. This indicates a potential link between late submissions and lower scores.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "down_from_previous",
              "delta": -17,
              "context": "Score dropped as submission delays increased."
            }
          ]
        }
      ],
      "educational_implications": [
        "Timely submissions may enhance your understanding and retention of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Create a study schedule to manage your time better.",
          "rationale": "This will help you stay on track with your assignments and reduce submission delays."
        },
        {
          "priority": "medium",
          "action": "Set reminders for due dates.",
          "rationale": "Reminders can help you submit your work on time, potentially improving your scores."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows clear trends in submission delays and corresponding score changes.",
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
    "full_result_row_count": 5,
    "included_row_count": 5,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_lateness",
        "row_count": 5,
        "included_row_count": 5
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 5,
    "baseline_reference_tokens": 376,
    "task_aware_prompt_tokens": 1157,
    "token_ratio": 3.0771,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.small_sample_caveats",
      "action_evidence.action_evidence",
      "exceptions.flagged_points",
      "exceptions.trough",
      "exceptions.peak",
      "trend_relationship.largest_adjacent_drop",
      "trend_relationship.largest_adjacent_rise"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.0771 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5541,
      "token_usage": {
        "prompt_tokens": 1764,
        "completion_tokens": 462,
        "total_tokens": 2226
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000542
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T08__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "89407eb9236cb79058ed5c508301123f054b4d4a7b92d504afbfb415ec97c292",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1764,
      "completion_tokens": 462,
      "total_tokens": 2226
    },
    "latency_ms": 5545,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847912365_48ce21c2",
    "explanation": {
      "summary": "You've shown a pattern of submitting assessments late, which seems to correlate with a drop in your scores. While you have passed all assessments, the increase in submission delays may be impacting your overall performance.",
      "insights": [
        {
          "title": "Increasing Submission Delays",
          "description": "Your submission delays have increased from 3 days to 5 days over the assessments, which is concerning. This trend suggests that you may be struggling to meet deadlines, which could affect your scores.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "submission_delay_days",
              "value": 5,
              "comparison": "up_from_previous",
              "delta": 2,
              "context": "Increased from 3 days to 5 days over the assessments."
            }
          ]
        },
        {
          "title": "Score Drop with Delays",
          "description": "Your normalized scores have decreased from 100 to 83 as submission delays increased. This indicates a potential link between late submissions and lower scores.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "down_from_previous",
              "delta": -17,
              "context": "Score dropped as submission delays increased."
            }
          ]
        }
      ],
      "educational_implications": [
        "Timely submissions may enhance your understanding and retention of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Create a study schedule to manage your time better.",
          "rationale": "This will help you stay on track with your assignments and reduce submission delays."
        },
        {
          "priority": "medium",
          "action": "Set reminders for due dates.",
          "rationale": "Reminders can help you submit your work on time, potentially improving your scores."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows clear trends in submission delays and corresponding score changes.",
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
    "full_result_row_count": 5,
    "included_row_count": 5,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_lateness",
        "row_count": 5,
        "included_row_count": 5
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 5,
    "baseline_reference_tokens": 376,
    "task_aware_prompt_tokens": 1157,
    "token_ratio": 3.0771,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.small_sample_caveats",
      "action_evidence.action_evidence",
      "exceptions.flagged_points",
      "exceptions.trough",
      "exceptions.peak",
      "trend_relationship.largest_adjacent_drop",
      "trend_relationship.largest_adjacent_rise"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.0771 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5541,
      "token_usage": {
        "prompt_tokens": 1764,
        "completion_tokens": 462,
        "total_tokens": 2226
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000542
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
    "expected": 5,
    "observed": 5
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018",
    "expected_values": [
      "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac",
    "expected": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac"
  },
  {
    "check_id": "numeric_fields_submission_lateness",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "submission_lateness",
    "numeric_columns": [
      "assessment_order",
      "score_normalized",
      "submission_day",
      "due_day",
      "submission_delay_days"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 5,
        "min": 1,
        "max": 9
      },
      "score_normalized": {
        "count": 5,
        "min": 83,
        "max": 100
      },
      "submission_day": {
        "count": 5,
        "min": 21,
        "max": 244
      },
      "due_day": {
        "count": 4,
        "min": 18,
        "max": 214
      },
      "submission_delay_days": {
        "count": 4,
        "min": 2,
        "max": 5
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_submission_lateness",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "submission_lateness",
    "flag_columns": [
      "pass_flag"
    ],
    "triggered_like_counts": {
      "pass_flag": 5
    }
  }
]
```
