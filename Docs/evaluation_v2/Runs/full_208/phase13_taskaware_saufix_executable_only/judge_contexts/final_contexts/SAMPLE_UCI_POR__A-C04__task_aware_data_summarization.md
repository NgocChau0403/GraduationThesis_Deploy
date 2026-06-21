# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C04__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2_PHASE13_SAUFIX_EXECUTABLE_ONLY.md`
- Prompt SHA-256: `8ae00287d6a8e9c23c769c97b4d11aa90e05e9126f8cd3e71fcef74500d6f48f`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-C04__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_phase13_saufix_executable_only__SAMPLE_UCI_POR",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-C04",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_phase13_saufix_action_correction_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Compare lifestyle context",
  "scope": "2 students",
  "actionable_question": "Which lifestyle context dimensions differ most between these two students?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "multi_metric_comparison",
  "ai_prompt_hint": "Compare lifestyle_dimension rows for the two students. Highlight the largest dimension gaps. Use composite_lifestyle_risk_score and social_balance_score only as supporting context. Frame lifestyle differences as context only, not causal judgement.",
  "query_labels": [
    "lifestyle_comparison"
  ],
  "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "enrollment [UCI only]"
  ],
  "key_db_fields": [
    "student_id [FE cross]",
    "lifestyle_dimension [FE cross]",
    "lifestyle_risk_score [FE cross]",
    "alcohol_weekday",
    "alcohol_weekend",
    "go_out_freq",
    "health_status",
    "free_time",
    "composite_lifestyle_risk_score",
    "social_balance_score"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "lifestyle_dimension",
      "lifestyle_risk_score"
    ],
    "optional_columns": [
      "alcohol_weekday",
      "alcohol_weekend",
      "go_out_freq",
      "health_status",
      "free_time",
      "composite_lifestyle_risk_score",
      "social_balance_score"
    ]
  },
  "query_labels": [
    "lifestyle_comparison"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-C04-CORE-01",
      "description": "Compare lifestyle_dimension rows for the two students."
    },
    {
      "requirement_id": "A-C04-CORE-02",
      "description": "Highlight the largest dimension gaps."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "A-C04-SUPPORT-01",
      "description": "Use composite_lifestyle_risk_score and social_balance_score only as supporting context."
    }
  ],
  "evaluation_constraints": [
    {
      "constraint_id": "A-C04-CONSTRAINT-01",
      "description": "Frame lifestyle differences as context only, not causal judgement."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Applicable because this is an individual-level comparison involving lifestyle context."
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
      "dataset_label": "lifestyle_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-C04.json",
      "artifact_sha256": "36bf7dacdf6a84e23733c451474124f442bb062556d02787902e76ebc49a2bc2",
      "row_count": 10,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 10,
  "prompt_embedded_row_count": 10,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "36bf7dacdf6a84e23733c451474124f442bb062556d02787902e76ebc49a2bc2",
  "evidence_rows_sha256": "f6bdc74e071f83e533b355dd0e6d16bda43bcf1d3738f7abc46b320ca9d721ca",
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
  "full_result_row_count": 10,
  "embedded_datasets_sha256": "f6bdc74e071f83e533b355dd0e6d16bda43bcf1d3738f7abc46b320ca9d721ca",
  "datasets": {
    "lifestyle_comparison": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "lifestyle_dimension": "weekday_alcohol",
        "lifestyle_risk_score": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.375,
        "social_balance_score": 0.025000000000000022
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "lifestyle_dimension": "weekend_alcohol",
        "lifestyle_risk_score": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.375,
        "social_balance_score": 0.025000000000000022
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "lifestyle_dimension": "go_out_frequency",
        "lifestyle_risk_score": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.375,
        "social_balance_score": 0.025000000000000022
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "lifestyle_dimension": "health_status",
        "lifestyle_risk_score": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.375,
        "social_balance_score": 0.025000000000000022
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "lifestyle_dimension": "free_time",
        "lifestyle_risk_score": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.375,
        "social_balance_score": 0.025000000000000022
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "lifestyle_dimension": "weekday_alcohol",
        "lifestyle_risk_score": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.3,
        "social_balance_score": 0.1
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "lifestyle_dimension": "weekend_alcohol",
        "lifestyle_risk_score": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.3,
        "social_balance_score": 0.1
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "lifestyle_dimension": "go_out_frequency",
        "lifestyle_risk_score": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.3,
        "social_balance_score": 0.1
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "lifestyle_dimension": "health_status",
        "lifestyle_risk_score": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.3,
        "social_balance_score": 0.1
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "lifestyle_dimension": "free_time",
        "lifestyle_risk_score": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.3,
        "social_balance_score": 0.1
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C04__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "1a62dcb42fe99951bb8db4b81e8be33a05ef740618511bd8ba12ca24a8213de0",
  "generator_input_sha256": "0639b312d3b71989f6ac9ad76e51c64f0f15a27b0792bdd101b5851435e09fe5",
  "generator_input_compact": {
    "task_id": "A-C04",
    "execution_id": "exec_1781847232040_9237c26d",
    "task_name": "Compare lifestyle context",
    "analysis_type": "comparison",
    "explanation_strategy": "comparison",
    "actionable_question": "Which lifestyle context dimensions differ most between these two students?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "lifestyle_comparison"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "lifestyle_comparison"
    ],
    "dataset_row_counts": {
      "lifestyle_comparison": 10
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
      "require_sensitive_context_policy": true,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: The comparison of lifestyle dimensions between two students reveals notable differences in their go-out frequency, while other dimensions remain consistent. Student SAMPLE_UCI_POR_STU_000001 exhibits a higher go-out frequency, which may indicate a more active social lifestyle.\n\nInsights: Go-Out Frequency Difference: Student SAMPLE_UCI_POR_STU_000001 has a higher go-out frequency compared to SAMPLE_UCI_POR_STU_000002, suggesting a more active engagement in social activities.\n\nEducational implications: Understanding the social engagement levels of students can inform targeted interventions to enhance their overall well-being.\n\nRecommendations: medium - Encourage social activities for students with lower go-out frequencies. - Promoting social engagement may improve overall lifestyle balance and student satisfaction.",
  "structured_payload": {
    "task_id": "A-C04",
    "execution_id": "exec_1781847232040_9237c26d",
    "explanation": {
      "summary": "The comparison of lifestyle dimensions between two students reveals notable differences in their go-out frequency, while other dimensions remain consistent. Student SAMPLE_UCI_POR_STU_000001 exhibits a higher go-out frequency, which may indicate a more active social lifestyle.",
      "insights": [
        {
          "title": "Go-Out Frequency Difference",
          "description": "Student SAMPLE_UCI_POR_STU_000001 has a higher go-out frequency compared to SAMPLE_UCI_POR_STU_000002, suggesting a more active engagement in social activities.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "go_out_freq",
              "value": 4,
              "comparison": "baseline",
              "delta": 1,
              "context": "SAMPLE_UCI_POR_STU_000001 has a go-out frequency of 4, while SAMPLE_UCI_POR_STU_000002 has a frequency of 3."
            }
          ]
        }
      ],
      "educational_implications": [
        "Understanding the social engagement levels of students can inform targeted interventions to enhance their overall well-being."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Encourage social activities for students with lower go-out frequencies.",
          "rationale": "Promoting social engagement may improve overall lifestyle balance and student satisfaction."
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
    "ai_summary_version": "v3.1-experimental",
    "baseline_available": true,
    "input_summary_type": "multi_metric_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 10,
    "included_row_count": 10,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "lifestyle_comparison",
        "row_count": 10,
        "included_row_count": 10
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 10,
    "baseline_reference_tokens": 846,
    "task_aware_prompt_tokens": 2390,
    "token_ratio": 2.8251,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "task_output_contract": [
      "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
      "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
      "If expected metric/entity evidence is missing, state the limitation rather than guessing."
    ],
    "must_keep_keys": [
      "comparison_matrix",
      "dataset_name",
      "entities",
      "entity_column",
      "metric_extrema",
      "metrics",
      "missing_entity_evidence",
      "missing_expected_entities",
      "missing_metric_evidence",
      "pairwise_direction_evidence",
      "pairwise_gaps",
      "row_count",
      "selected_entity_evidence",
      "summarization_warnings",
      "validation_metadata"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.8251 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4389,
      "token_usage": {
        "prompt_tokens": 3406,
        "completion_tokens": 347,
        "total_tokens": 3753
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000719
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C04__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "1a62dcb42fe99951bb8db4b81e8be33a05ef740618511bd8ba12ca24a8213de0",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 3406,
      "completion_tokens": 347,
      "total_tokens": 3753
    },
    "latency_ms": 4394,
    "attempts_used": 2
  },
  "source_response_body": {
    "task_id": "A-C04",
    "execution_id": "exec_1781847232040_9237c26d",
    "explanation": {
      "summary": "The comparison of lifestyle dimensions between two students reveals notable differences in their go-out frequency, while other dimensions remain consistent. Student SAMPLE_UCI_POR_STU_000001 exhibits a higher go-out frequency, which may indicate a more active social lifestyle.",
      "insights": [
        {
          "title": "Go-Out Frequency Difference",
          "description": "Student SAMPLE_UCI_POR_STU_000001 has a higher go-out frequency compared to SAMPLE_UCI_POR_STU_000002, suggesting a more active engagement in social activities.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "go_out_freq",
              "value": 4,
              "comparison": "baseline",
              "delta": 1,
              "context": "SAMPLE_UCI_POR_STU_000001 has a go-out frequency of 4, while SAMPLE_UCI_POR_STU_000002 has a frequency of 3."
            }
          ]
        }
      ],
      "educational_implications": [
        "Understanding the social engagement levels of students can inform targeted interventions to enhance their overall well-being."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Encourage social activities for students with lower go-out frequencies.",
          "rationale": "Promoting social engagement may improve overall lifestyle balance and student satisfaction."
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
    "ai_summary_version": "v3.1-experimental",
    "baseline_available": true,
    "input_summary_type": "multi_metric_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 10,
    "included_row_count": 10,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "lifestyle_comparison",
        "row_count": 10,
        "included_row_count": 10
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 10,
    "baseline_reference_tokens": 846,
    "task_aware_prompt_tokens": 2390,
    "token_ratio": 2.8251,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "task_output_contract": [
      "Compare the returned entities directly, naming which entity is higher/lower for each key metric.",
      "Use pairwise_gaps and selected_entity_evidence for direction; do not reverse numeric direction.",
      "If expected metric/entity evidence is missing, state the limitation rather than guessing."
    ],
    "must_keep_keys": [
      "comparison_matrix",
      "dataset_name",
      "entities",
      "entity_column",
      "metric_extrema",
      "metrics",
      "missing_entity_evidence",
      "missing_expected_entities",
      "missing_metric_evidence",
      "pairwise_direction_evidence",
      "pairwise_gaps",
      "row_count",
      "selected_entity_evidence",
      "summarization_warnings",
      "validation_metadata"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.8251 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4389,
      "token_usage": {
        "prompt_tokens": 3406,
        "completion_tokens": 347,
        "total_tokens": 3753
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000719
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
    "expected": 10,
    "observed": 10
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "36bf7dacdf6a84e23733c451474124f442bb062556d02787902e76ebc49a2bc2",
    "expected_values": [
      "36bf7dacdf6a84e23733c451474124f442bb062556d02787902e76ebc49a2bc2"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "f6bdc74e071f83e533b355dd0e6d16bda43bcf1d3738f7abc46b320ca9d721ca",
    "expected": "f6bdc74e071f83e533b355dd0e6d16bda43bcf1d3738f7abc46b320ca9d721ca"
  },
  {
    "check_id": "numeric_fields_lifestyle_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "lifestyle_comparison",
    "numeric_columns": [
      "alcohol_weekday",
      "alcohol_weekend",
      "composite_lifestyle_risk_score",
      "free_time",
      "go_out_freq",
      "health_status",
      "lifestyle_risk_score",
      "social_balance_score"
    ],
    "numeric_summaries": {
      "alcohol_weekday": {
        "count": 10,
        "min": 1,
        "max": 1
      },
      "alcohol_weekend": {
        "count": 10,
        "min": 1,
        "max": 1
      },
      "composite_lifestyle_risk_score": {
        "count": 10,
        "min": 0.3,
        "max": 0.375
      },
      "free_time": {
        "count": 10,
        "min": 3,
        "max": 3
      },
      "go_out_freq": {
        "count": 10,
        "min": 3,
        "max": 4
      },
      "health_status": {
        "count": 10,
        "min": 3,
        "max": 3
      },
      "lifestyle_risk_score": {
        "count": 10,
        "min": 1,
        "max": 4
      },
      "social_balance_score": {
        "count": 10,
        "min": 0.025000000000000022,
        "max": 0.1
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_lifestyle_comparison",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "lifestyle_comparison",
    "flag_columns": [
      "lifestyle_risk_score",
      "health_status",
      "composite_lifestyle_risk_score"
    ],
    "triggered_like_counts": {
      "lifestyle_risk_score": 0,
      "health_status": 0,
      "composite_lifestyle_risk_score": 0
    }
  }
]
```
