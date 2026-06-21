# LLM Judge Final Judge Context - SAMPLE_OULAD__A-C04__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-C04__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-C04",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C04.json",
      "artifact_sha256": "d414f04d182beff780951de3bb6251338a2b7722c20a679fd3b6d387496f0e78",
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
  "evidence_artifact_file_sha256": "d414f04d182beff780951de3bb6251338a2b7722c20a679fd3b6d387496f0e78",
  "evidence_rows_sha256": "793426f3c888d59e448b16457337e64ce25d8c46791c3c863dcc0a274e236996",
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
  "embedded_datasets_sha256": "793426f3c888d59e448b16457337e64ce25d8c46791c3c863dcc0a274e236996",
  "datasets": {
    "lifestyle_comparison": [
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "lifestyle_dimension": "weekday_alcohol",
        "lifestyle_risk_score": null,
        "alcohol_weekday": null,
        "alcohol_weekend": null,
        "go_out_freq": null,
        "health_status": null,
        "free_time": null,
        "composite_lifestyle_risk_score": null,
        "social_balance_score": null
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "lifestyle_dimension": "weekend_alcohol",
        "lifestyle_risk_score": null,
        "alcohol_weekday": null,
        "alcohol_weekend": null,
        "go_out_freq": null,
        "health_status": null,
        "free_time": null,
        "composite_lifestyle_risk_score": null,
        "social_balance_score": null
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "lifestyle_dimension": "go_out_frequency",
        "lifestyle_risk_score": null,
        "alcohol_weekday": null,
        "alcohol_weekend": null,
        "go_out_freq": null,
        "health_status": null,
        "free_time": null,
        "composite_lifestyle_risk_score": null,
        "social_balance_score": null
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "lifestyle_dimension": "health_status",
        "lifestyle_risk_score": null,
        "alcohol_weekday": null,
        "alcohol_weekend": null,
        "go_out_freq": null,
        "health_status": null,
        "free_time": null,
        "composite_lifestyle_risk_score": null,
        "social_balance_score": null
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "lifestyle_dimension": "free_time",
        "lifestyle_risk_score": null,
        "alcohol_weekday": null,
        "alcohol_weekend": null,
        "go_out_freq": null,
        "health_status": null,
        "free_time": null,
        "composite_lifestyle_risk_score": null,
        "social_balance_score": null
      },
      {
        "student_id": "SAMPLE_OULAD_STU_101700",
        "lifestyle_dimension": "weekday_alcohol",
        "lifestyle_risk_score": null,
        "alcohol_weekday": null,
        "alcohol_weekend": null,
        "go_out_freq": null,
        "health_status": null,
        "free_time": null,
        "composite_lifestyle_risk_score": null,
        "social_balance_score": null
      },
      {
        "student_id": "SAMPLE_OULAD_STU_101700",
        "lifestyle_dimension": "weekend_alcohol",
        "lifestyle_risk_score": null,
        "alcohol_weekday": null,
        "alcohol_weekend": null,
        "go_out_freq": null,
        "health_status": null,
        "free_time": null,
        "composite_lifestyle_risk_score": null,
        "social_balance_score": null
      },
      {
        "student_id": "SAMPLE_OULAD_STU_101700",
        "lifestyle_dimension": "go_out_frequency",
        "lifestyle_risk_score": null,
        "alcohol_weekday": null,
        "alcohol_weekend": null,
        "go_out_freq": null,
        "health_status": null,
        "free_time": null,
        "composite_lifestyle_risk_score": null,
        "social_balance_score": null
      },
      {
        "student_id": "SAMPLE_OULAD_STU_101700",
        "lifestyle_dimension": "health_status",
        "lifestyle_risk_score": null,
        "alcohol_weekday": null,
        "alcohol_weekend": null,
        "go_out_freq": null,
        "health_status": null,
        "free_time": null,
        "composite_lifestyle_risk_score": null,
        "social_balance_score": null
      },
      {
        "student_id": "SAMPLE_OULAD_STU_101700",
        "lifestyle_dimension": "free_time",
        "lifestyle_risk_score": null,
        "alcohol_weekday": null,
        "alcohol_weekend": null,
        "go_out_freq": null,
        "health_status": null,
        "free_time": null,
        "composite_lifestyle_risk_score": null,
        "social_balance_score": null
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C04__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "48bccf6eba1cb005091ab3b3bcfb6a43acbebede205c4adea7d1073c66d4edc2",
  "generator_input_sha256": "5ee9eb6bdfb50b015009b631417ae6b15ced18f93ef204ef1b8f39f8b6782b3f",
  "generator_input_compact": {
    "task_id": "A-C04",
    "execution_id": "exec_1781847662681_2fb4b6e0",
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
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
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
  "raw_text": "Summary: The analysis of lifestyle dimensions between the two students reveals a complete absence of data for both individuals, indicating a lack of measurable lifestyle risk scores across all dimensions. This presents a challenge in identifying any meaningful differences or similarities in their lifestyle contexts.\n\nEducational implications: The absence of lifestyle data suggests a need for improved data collection methods to better understand student behaviors and health.\n\nRecommendations: high - Implement a comprehensive survey to gather lifestyle data from students. - Collecting accurate lifestyle information is essential for identifying risk factors and tailoring interventions to support student well-being.\n\nWarnings: The analysis is limited due to the absence of numeric values for lifestyle risk scores, which prevents any comparative assessment.",
  "structured_payload": {
    "task_id": "A-C04",
    "execution_id": "exec_1781847662681_2fb4b6e0",
    "explanation": {
      "summary": "The analysis of lifestyle dimensions between the two students reveals a complete absence of data for both individuals, indicating a lack of measurable lifestyle risk scores across all dimensions. This presents a challenge in identifying any meaningful differences or similarities in their lifestyle contexts.",
      "insights": [],
      "educational_implications": [
        "The absence of lifestyle data suggests a need for improved data collection methods to better understand student behaviors and health."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a comprehensive survey to gather lifestyle data from students.",
          "rationale": "Collecting accurate lifestyle information is essential for identifying risk factors and tailoring interventions to support student well-being."
        }
      ],
      "warnings": [
        "The analysis is limited due to the absence of numeric values for lifestyle risk scores, which prevents any comparative assessment."
      ]
    },
    "confidence": {
      "level": "LOW",
      "reason": "Data quality is compromised due to missing or non-numeric values across all metrics.",
      "based_on": [
        "sparse_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
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
    "baseline_reference_tokens": 867,
    "task_aware_prompt_tokens": 1838,
    "token_ratio": 2.12,
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
      "comparison.pairwise_gaps",
      "primary_finding.selected_entity_evidence"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.12 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4282,
      "token_usage": {
        "prompt_tokens": 2533,
        "completion_tokens": 228,
        "total_tokens": 2761
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000517
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C04__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "48bccf6eba1cb005091ab3b3bcfb6a43acbebede205c4adea7d1073c66d4edc2",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2533,
      "completion_tokens": 228,
      "total_tokens": 2761
    },
    "latency_ms": 4287,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C04",
    "execution_id": "exec_1781847662681_2fb4b6e0",
    "explanation": {
      "summary": "The analysis of lifestyle dimensions between the two students reveals a complete absence of data for both individuals, indicating a lack of measurable lifestyle risk scores across all dimensions. This presents a challenge in identifying any meaningful differences or similarities in their lifestyle contexts.",
      "insights": [],
      "educational_implications": [
        "The absence of lifestyle data suggests a need for improved data collection methods to better understand student behaviors and health."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a comprehensive survey to gather lifestyle data from students.",
          "rationale": "Collecting accurate lifestyle information is essential for identifying risk factors and tailoring interventions to support student well-being."
        }
      ],
      "warnings": [
        "The analysis is limited due to the absence of numeric values for lifestyle risk scores, which prevents any comparative assessment."
      ]
    },
    "confidence": {
      "level": "LOW",
      "reason": "Data quality is compromised due to missing or non-numeric values across all metrics.",
      "based_on": [
        "sparse_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
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
    "baseline_reference_tokens": 867,
    "task_aware_prompt_tokens": 1838,
    "token_ratio": 2.12,
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
      "comparison.pairwise_gaps",
      "primary_finding.selected_entity_evidence"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.12 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4282,
      "token_usage": {
        "prompt_tokens": 2533,
        "completion_tokens": 228,
        "total_tokens": 2761
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000517
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
    "observed": "d414f04d182beff780951de3bb6251338a2b7722c20a679fd3b6d387496f0e78",
    "expected_values": [
      "d414f04d182beff780951de3bb6251338a2b7722c20a679fd3b6d387496f0e78"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "793426f3c888d59e448b16457337e64ce25d8c46791c3c863dcc0a274e236996",
    "expected": "793426f3c888d59e448b16457337e64ce25d8c46791c3c863dcc0a274e236996"
  },
  {
    "check_id": "numeric_fields_lifestyle_comparison",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "lifestyle_comparison",
    "numeric_columns": [],
    "numeric_summaries": {}
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
