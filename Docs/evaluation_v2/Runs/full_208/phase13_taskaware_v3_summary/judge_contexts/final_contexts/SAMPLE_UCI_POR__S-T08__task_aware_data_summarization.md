# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T08__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T08__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T08.json",
      "artifact_sha256": "c564a5ade00a5fd8c29217b1a546f5abcabfce9a6ed053876042811f89cbd278",
      "row_count": 3,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 3,
  "prompt_embedded_row_count": 3,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "c564a5ade00a5fd8c29217b1a546f5abcabfce9a6ed053876042811f89cbd278",
  "evidence_rows_sha256": "e40b3d0befcd610cd5ca02e7f29adbc7227359cc361bd632cc73b8dd2ee31a94",
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
  "full_result_row_count": 3,
  "embedded_datasets_sha256": "e40b3d0befcd610cd5ca02e7f29adbc7227359cc361bd632cc73b8dd2ee31a94",
  "datasets": {
    "submission_lateness": [
      {
        "assessment_order": 1,
        "assessment_type": "quiz",
        "assessment_name": "G1",
        "submission_delay_days": null,
        "score_normalized": 0,
        "pass_flag": false,
        "submission_day": null,
        "due_day": 21,
        "submission_delay_avg": null,
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 2,
        "assessment_type": "quiz",
        "assessment_name": "G2",
        "submission_delay_days": null,
        "score_normalized": 55,
        "pass_flag": true,
        "submission_day": null,
        "due_day": 56,
        "submission_delay_avg": null,
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 3,
        "assessment_type": "exam",
        "assessment_name": "G3",
        "submission_delay_days": null,
        "score_normalized": 55,
        "pass_flag": true,
        "submission_day": null,
        "due_day": 98,
        "submission_delay_avg": null,
        "punctuality_rate": "0"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T08__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "60e530709c1d00838d016617c221a6e782297eae1e4f665eff18655564e1d679",
  "generator_input_sha256": "3d06b9aca6e6e733768a238fa1bfcb9ecf96f80ddfb025a68d536b92df3c9acd",
  "generator_input_compact": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847244206_98df1cbc",
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
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "submission_lateness"
    ],
    "dataset_row_counts": {
      "submission_lateness": 3
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
  "raw_text": "Summary: Your submission patterns show that you have not submitted any assessments yet, which means there is currently no data on submission delays or punctuality. This lack of submissions can impact your overall engagement and performance in the course.\n\nInsights: No Submissions Recorded: You have not submitted any assessments, which results in a punctuality rate of '0'. This indicates that you are not engaging with the assessments on time, which can affect your learning progress.\n\nEducational implications: Engaging with assessments is crucial for your learning and understanding of the material.\n\nRecommendations: high - Start submitting your assessments on time. - Submitting your work on time will help you improve your scores and enhance your understanding of the course content.",
  "structured_payload": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847244206_98df1cbc",
    "explanation": {
      "summary": "Your submission patterns show that you have not submitted any assessments yet, which means there is currently no data on submission delays or punctuality. This lack of submissions can impact your overall engagement and performance in the course.",
      "insights": [
        {
          "title": "No Submissions Recorded",
          "description": "You have not submitted any assessments, which results in a punctuality rate of '0'. This indicates that you are not engaging with the assessments on time, which can affect your learning progress.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "baseline",
              "delta": null,
              "context": "No submissions made"
            }
          ]
        }
      ],
      "educational_implications": [
        "Engaging with assessments is crucial for your learning and understanding of the material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Start submitting your assessments on time.",
          "rationale": "Submitting your work on time will help you improve your scores and enhance your understanding of the course content."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly indicates no submissions, leading to a straightforward analysis.",
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
    "full_result_row_count": 3,
    "included_row_count": 3,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_lateness",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 3,
    "baseline_reference_tokens": 229,
    "task_aware_prompt_tokens": 626,
    "token_ratio": 2.7336,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.7336 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4362,
      "token_usage": {
        "prompt_tokens": 1132,
        "completion_tokens": 302,
        "total_tokens": 1434
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000351
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T08__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "60e530709c1d00838d016617c221a6e782297eae1e4f665eff18655564e1d679",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1132,
      "completion_tokens": 302,
      "total_tokens": 1434
    },
    "latency_ms": 4379,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847244206_98df1cbc",
    "explanation": {
      "summary": "Your submission patterns show that you have not submitted any assessments yet, which means there is currently no data on submission delays or punctuality. This lack of submissions can impact your overall engagement and performance in the course.",
      "insights": [
        {
          "title": "No Submissions Recorded",
          "description": "You have not submitted any assessments, which results in a punctuality rate of '0'. This indicates that you are not engaging with the assessments on time, which can affect your learning progress.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "baseline",
              "delta": null,
              "context": "No submissions made"
            }
          ]
        }
      ],
      "educational_implications": [
        "Engaging with assessments is crucial for your learning and understanding of the material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Start submitting your assessments on time.",
          "rationale": "Submitting your work on time will help you improve your scores and enhance your understanding of the course content."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly indicates no submissions, leading to a straightforward analysis.",
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
    "full_result_row_count": 3,
    "included_row_count": 3,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_lateness",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 3,
    "baseline_reference_tokens": 229,
    "task_aware_prompt_tokens": 626,
    "token_ratio": 2.7336,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.7336 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4362,
      "token_usage": {
        "prompt_tokens": 1132,
        "completion_tokens": 302,
        "total_tokens": 1434
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000351
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
    "expected": 3,
    "observed": 3
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "c564a5ade00a5fd8c29217b1a546f5abcabfce9a6ed053876042811f89cbd278",
    "expected_values": [
      "c564a5ade00a5fd8c29217b1a546f5abcabfce9a6ed053876042811f89cbd278"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "e40b3d0befcd610cd5ca02e7f29adbc7227359cc361bd632cc73b8dd2ee31a94",
    "expected": "e40b3d0befcd610cd5ca02e7f29adbc7227359cc361bd632cc73b8dd2ee31a94"
  },
  {
    "check_id": "numeric_fields_submission_lateness",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "submission_lateness",
    "numeric_columns": [
      "assessment_order",
      "due_day",
      "score_normalized"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 3,
        "min": 1,
        "max": 3
      },
      "due_day": {
        "count": 3,
        "min": 21,
        "max": 98
      },
      "score_normalized": {
        "count": 3,
        "min": 0,
        "max": 55
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
      "pass_flag": 2
    }
  }
]
```
