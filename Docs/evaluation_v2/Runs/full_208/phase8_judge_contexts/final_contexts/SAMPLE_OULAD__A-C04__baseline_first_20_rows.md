# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-C04__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-C04__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-C04",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C04__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "c042c6937a3f33bafdfe132ca00f3fa48044c05c1c2227116548ccd9517373ec",
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
  "raw_text": "Summary: The comparison of lifestyle dimensions between the two students reveals a lack of measurable data across all dimensions, indicating a need for more comprehensive lifestyle assessments. Both students exhibit similar gaps in lifestyle context, with no discernible differences in their scores.\n\nEducational implications: The absence of data in lifestyle dimensions suggests that students may not be engaging in self-assessment or that the assessment tools are ineffective.\n\nRecommendations: high - Implement a structured lifestyle assessment tool for students. - This will provide valuable data to identify lifestyle patterns and risks, enabling targeted interventions.",
  "structured_payload": {
    "task_id": "A-C04",
    "execution_id": "exec_1781847662681_2fb4b6e0",
    "explanation": {
      "summary": "The comparison of lifestyle dimensions between the two students reveals a lack of measurable data across all dimensions, indicating a need for more comprehensive lifestyle assessments. Both students exhibit similar gaps in lifestyle context, with no discernible differences in their scores.",
      "insights": [],
      "educational_implications": [
        "The absence of data in lifestyle dimensions suggests that students may not be engaging in self-assessment or that the assessment tools are ineffective."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a structured lifestyle assessment tool for students.",
          "rationale": "This will provide valuable data to identify lifestyle patterns and risks, enabling targeted interventions."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete but lacks any measurable values, indicating a potential issue with data collection.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
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
      "latency_ms": 3158,
      "token_usage": {
        "prompt_tokens": 1561,
        "completion_tokens": 199,
        "total_tokens": 1760
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000354
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C04__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "c042c6937a3f33bafdfe132ca00f3fa48044c05c1c2227116548ccd9517373ec",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1561,
      "completion_tokens": 199,
      "total_tokens": 1760
    },
    "latency_ms": 3169,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C04",
    "execution_id": "exec_1781847662681_2fb4b6e0",
    "explanation": {
      "summary": "The comparison of lifestyle dimensions between the two students reveals a lack of measurable data across all dimensions, indicating a need for more comprehensive lifestyle assessments. Both students exhibit similar gaps in lifestyle context, with no discernible differences in their scores.",
      "insights": [],
      "educational_implications": [
        "The absence of data in lifestyle dimensions suggests that students may not be engaging in self-assessment or that the assessment tools are ineffective."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a structured lifestyle assessment tool for students.",
          "rationale": "This will provide valuable data to identify lifestyle patterns and risks, enabling targeted interventions."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete but lacks any measurable values, indicating a potential issue with data collection.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
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
      "latency_ms": 3158,
      "token_usage": {
        "prompt_tokens": 1561,
        "completion_tokens": 199,
        "total_tokens": 1760
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000354
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
