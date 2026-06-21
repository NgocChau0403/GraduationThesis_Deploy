# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T12__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T12__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T12",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Procrastination analysis",
  "scope": "1 student",
  "actionable_question": "Am I a procrastinator and is it costing me marks?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Use submission_delay_avg [FE]. Identify if late submission is systematic. Link to score.",
  "query_labels": [
    "submission_series",
    "punctuality_summary"
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
    "pass_flag; submission_delay_avg [FE cross]",
    "punctuality_rate [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "submission_series",
    "punctuality_summary"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T12-CORE-01",
      "description": "Identify whether late submission is systematic."
    },
    {
      "requirement_id": "S-T12-CORE-02",
      "description": "Describe the observed relationship between submission delay and score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T12-CONSTRAINT-01",
      "description": "Use submission_delay_avg as the primary delay metric; do not infer procrastination from score alone."
    },
    {
      "constraint_id": "S-T12-CONSTRAINT-02",
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
      "dataset_label": "submission_series",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T12.json",
      "artifact_sha256": "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
      "row_count": 5,
      "readable": true
    },
    {
      "dataset_label": "punctuality_summary",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T12.json",
      "artifact_sha256": "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
      "row_count": 1,
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
  "evidence_artifact_file_sha256": "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
  "evidence_rows_sha256": "2fbb4764f0f67c70091c032fff1ee6bb068b44c276b0fc288fa6fc5fddd3d3a5",
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
  "embedded_datasets_sha256": "2fbb4764f0f67c70091c032fff1ee6bb068b44c276b0fc288fa6fc5fddd3d3a5",
  "datasets": {
    "submission_series": [
      {
        "assessment_order": 1,
        "assessment_name": "24295",
        "assessment_type": "CMA",
        "due_day": 18,
        "submission_day": 21,
        "submission_delay_days": 3,
        "score_normalized": 100,
        "pass_flag": true
      },
      {
        "assessment_order": 3,
        "assessment_name": "24296",
        "assessment_type": "CMA",
        "due_day": 67,
        "submission_day": 69,
        "submission_delay_days": 2,
        "score_normalized": 87,
        "pass_flag": true
      },
      {
        "assessment_order": 5,
        "assessment_name": "24297",
        "assessment_type": "CMA",
        "due_day": 144,
        "submission_day": 147,
        "submission_delay_days": 3,
        "score_normalized": 90,
        "pass_flag": true
      },
      {
        "assessment_order": 8,
        "assessment_name": "24298",
        "assessment_type": "CMA",
        "due_day": 214,
        "submission_day": 219,
        "submission_delay_days": 5,
        "score_normalized": 83,
        "pass_flag": true
      },
      {
        "assessment_order": 9,
        "assessment_name": "24299",
        "assessment_type": "Exam",
        "due_day": null,
        "submission_day": 244,
        "submission_delay_days": null,
        "score_normalized": 96,
        "pass_flag": true
      }
    ],
    "punctuality_summary": [
      {
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T12__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "4b1f171ef475ee04abd2fda21f5774e31c2c5d71f05dc41bc3b1a2d78b247cce",
  "generator_input_sha256": "05b8e1083278dd82c7508314f851e341be99b90587c7a073698bca7111eb1934",
  "generator_input_compact": {
    "task_id": "S-T12",
    "execution_id": "exec_1781847915522_4f14f1c0",
    "task_name": "Procrastination analysis",
    "analysis_type": "distribution",
    "explanation_strategy": "behavioral",
    "actionable_question": "Am I a procrastinator and is it costing me marks?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "submission_series",
      "punctuality_summary"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "submission_series",
      "punctuality_summary"
    ],
    "dataset_row_counts": {
      "submission_series": 5,
      "punctuality_summary": 1
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
  "raw_text": "Summary: You've shown a pattern of submitting your assessments late, which could be impacting your scores. While you are passing, the delays have increased over time, suggesting a need to address procrastination.\n\nInsights: Increasing Submission Delays: Your average submission delay is 3.25 days, and it has increased from 3 days for the first assessment to 5 days for the last one. This trend indicates a growing tendency to procrastinate. | Score Correlation with Delays: As your submission delays have increased, your scores have decreased, with the last assessment scoring 83 compared to 100 on the first. This suggests that timely submissions may positively impact your performance.\n\nEducational implications: Timely submissions are crucial for maintaining high scores and overall engagement in your studies.\n\nRecommendations: high - Set specific deadlines for yourself before the actual due dates. - This can help you manage your time better and reduce the tendency to procrastinate. | medium - Break down assessments into smaller tasks and schedule them. - This approach can make the workload feel more manageable and help you stay on track.",
  "structured_payload": {
    "task_id": "S-T12",
    "execution_id": "exec_1781847915522_4f14f1c0",
    "explanation": {
      "summary": "You've shown a pattern of submitting your assessments late, which could be impacting your scores. While you are passing, the delays have increased over time, suggesting a need to address procrastination.",
      "insights": [
        {
          "title": "Increasing Submission Delays",
          "description": "Your average submission delay is 3.25 days, and it has increased from 3 days for the first assessment to 5 days for the last one. This trend indicates a growing tendency to procrastinate.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "submission_delay_days",
              "value": 5,
              "comparison": "up_from_previous",
              "delta": 2,
              "context": "From assessment 5 to assessment 8"
            }
          ]
        },
        {
          "title": "Score Correlation with Delays",
          "description": "As your submission delays have increased, your scores have decreased, with the last assessment scoring 83 compared to 100 on the first. This suggests that timely submissions may positively impact your performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "down_from_previous",
              "delta": -17,
              "context": "From assessment 1 to assessment 8"
            }
          ]
        }
      ],
      "educational_implications": [
        "Timely submissions are crucial for maintaining high scores and overall engagement in your studies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Set specific deadlines for yourself before the actual due dates.",
          "rationale": "This can help you manage your time better and reduce the tendency to procrastinate."
        },
        {
          "priority": "medium",
          "action": "Break down assessments into smaller tasks and schedule them.",
          "rationale": "This approach can make the workload feel more manageable and help you stay on track."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows clear trends in submission delays and scores.",
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
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_series",
        "row_count": 5,
        "included_row_count": 5
      },
      {
        "dataset_name": "punctuality_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 6,
    "baseline_reference_tokens": 323,
    "task_aware_prompt_tokens": 1070,
    "token_ratio": 3.3127,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.small_sample_caveats",
      "action_evidence.action_evidence",
      "exceptions.flagged_points",
      "exceptions.trough",
      "exceptions.peak",
      "trend_relationship.largest_adjacent_drop"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.3127 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6438,
      "token_usage": {
        "prompt_tokens": 1643,
        "completion_tokens": 478,
        "total_tokens": 2121
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000533
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T12__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "4b1f171ef475ee04abd2fda21f5774e31c2c5d71f05dc41bc3b1a2d78b247cce",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1643,
      "completion_tokens": 478,
      "total_tokens": 2121
    },
    "latency_ms": 6445,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T12",
    "execution_id": "exec_1781847915522_4f14f1c0",
    "explanation": {
      "summary": "You've shown a pattern of submitting your assessments late, which could be impacting your scores. While you are passing, the delays have increased over time, suggesting a need to address procrastination.",
      "insights": [
        {
          "title": "Increasing Submission Delays",
          "description": "Your average submission delay is 3.25 days, and it has increased from 3 days for the first assessment to 5 days for the last one. This trend indicates a growing tendency to procrastinate.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "submission_delay_days",
              "value": 5,
              "comparison": "up_from_previous",
              "delta": 2,
              "context": "From assessment 5 to assessment 8"
            }
          ]
        },
        {
          "title": "Score Correlation with Delays",
          "description": "As your submission delays have increased, your scores have decreased, with the last assessment scoring 83 compared to 100 on the first. This suggests that timely submissions may positively impact your performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "down_from_previous",
              "delta": -17,
              "context": "From assessment 1 to assessment 8"
            }
          ]
        }
      ],
      "educational_implications": [
        "Timely submissions are crucial for maintaining high scores and overall engagement in your studies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Set specific deadlines for yourself before the actual due dates.",
          "rationale": "This can help you manage your time better and reduce the tendency to procrastinate."
        },
        {
          "priority": "medium",
          "action": "Break down assessments into smaller tasks and schedule them.",
          "rationale": "This approach can make the workload feel more manageable and help you stay on track."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data shows clear trends in submission delays and scores.",
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
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_series",
        "row_count": 5,
        "included_row_count": 5
      },
      {
        "dataset_name": "punctuality_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 6,
    "baseline_reference_tokens": 323,
    "task_aware_prompt_tokens": 1070,
    "token_ratio": 3.3127,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.small_sample_caveats",
      "action_evidence.action_evidence",
      "exceptions.flagged_points",
      "exceptions.trough",
      "exceptions.peak",
      "trend_relationship.largest_adjacent_drop"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.3127 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6438,
      "token_usage": {
        "prompt_tokens": 1643,
        "completion_tokens": 478,
        "total_tokens": 2121
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000533
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
    "observed": "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
    "expected_values": [
      "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a",
      "e21e23ba05127959c465a7f974cde1f1f0279da84619deedcafbc6768953d81a"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "2fbb4764f0f67c70091c032fff1ee6bb068b44c276b0fc288fa6fc5fddd3d3a5",
    "expected": "2fbb4764f0f67c70091c032fff1ee6bb068b44c276b0fc288fa6fc5fddd3d3a5"
  },
  {
    "check_id": "numeric_fields_submission_series",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "submission_series",
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
    "check_id": "threshold_flag_fields_submission_series",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "submission_series",
    "flag_columns": [
      "pass_flag"
    ],
    "triggered_like_counts": {
      "pass_flag": 5
    }
  },
  {
    "check_id": "numeric_fields_punctuality_summary",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "punctuality_summary",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_punctuality_summary",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "punctuality_summary",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
