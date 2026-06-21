# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T14__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T14__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T14",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Social balance vs performance",
  "scope": "1 student + cohort context",
  "actionable_question": "Is my social life balanced with my academic commitments?",
  "target_audience": "student",
  "ai_summary_type": "correlation_evidence",
  "ai_prompt_hint": "Compare the selected student against the class social-balance scatter. Highlight the student's position and any cohort-level association between social_balance_score and avg_score. Frame as correlation, not causation.",
  "query_labels": [
    "social_balance_scatter"
  ],
  "explanation_strategy": "correlation"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "assessment_result",
    "assessment [UCI only]"
  ],
  "key_db_fields": [
    "social_balance_score [FE single]",
    "avg_score [FE cross]",
    "free_time",
    "go_out_freq",
    "alcohol_weekday"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "point_role",
      "social_balance_score",
      "avg_score"
    ],
    "optional_columns": [
      "is_current_student",
      "free_time",
      "go_out_freq",
      "alcohol_weekday",
      "alcohol_weekend"
    ]
  },
  "query_labels": [
    "social_balance_scatter"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T14-CORE-01",
      "description": "Compare the selected student against the class social-balance scatter."
    },
    {
      "requirement_id": "S-T14-CORE-02",
      "description": "Highlight the student's position and any cohort-level association between social_balance_score and avg_score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T14-CONSTRAINT-01",
      "description": "Frame as correlation, not causation."
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
      "dataset_label": "social_balance_scatter",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T14.json",
      "artifact_sha256": "a1f2afbd3fd6104612348ce439b6218971332a7e84680ad53d378af81f1f5307",
      "row_count": 0,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 0,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "a1f2afbd3fd6104612348ce439b6218971332a7e84680ad53d378af81f1f5307",
  "evidence_rows_sha256": "67368389af41237b16cecbb82aa1386b18a1cc2628aae8d1c5eab757181838ab",
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
  "full_result_row_count": 0,
  "embedded_datasets_sha256": "67368389af41237b16cecbb82aa1386b18a1cc2628aae8d1c5eab757181838ab",
  "datasets": {
    "social_balance_scatter": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T14__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "4040a7295d3ccaea70fa04454e89d5d4b6277a400245e5d92d6112a739d6eacb",
  "generator_input_sha256": "f113798e9c6dbc51132ac12213693eb68eea3e521ce15faa99691fbd03117f7f",
  "generator_input_compact": {
    "task_id": "S-T14",
    "execution_id": "exec_1781847921420_efcc796d",
    "task_name": "Social balance vs performance",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "Is my social life balanced with my academic commitments?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "social_balance_scatter"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "social_balance_scatter"
    ],
    "dataset_row_counts": {
      "social_balance_scatter": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "correlation_evidence",
      "metric_column": null,
      "entity_column": "student_id",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": null,
      "top_k": 10,
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
  "raw_text": "Summary: Currently, there is no data available to analyze the relationship between your Social Balance Score and Average Score. This means we can't determine any correlation patterns at this time. However, maintaining a balance between social activities and academic commitments is important for your overall success.\n\nEducational implications: Understanding the balance between social life and academics can help improve your performance.\n\nRecommendations: high - Engage in self-reflection on your social activities and study habits. - This can help you identify areas where you might need to adjust your time management to achieve a better balance.",
  "structured_payload": {
    "task_id": "S-T14",
    "execution_id": "exec_1781847921420_efcc796d",
    "explanation": {
      "summary": "Currently, there is no data available to analyze the relationship between your Social Balance Score and Average Score. This means we can't determine any correlation patterns at this time. However, maintaining a balance between social activities and academic commitments is important for your overall success.",
      "insights": [],
      "educational_implications": [
        "Understanding the balance between social life and academics can help improve your performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Engage in self-reflection on your social activities and study habits.",
          "rationale": "This can help you identify areas where you might need to adjust your time management to achieve a better balance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "The dataset is empty, preventing any correlation analysis.",
      "based_on": [
        "sparse_data",
        "single_student"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "correlation_evidence",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "social_balance_scatter",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 11,
    "task_aware_prompt_tokens": 363,
    "token_ratio": 33,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (33.0 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3932,
      "token_usage": {
        "prompt_tokens": 857,
        "completion_tokens": 193,
        "total_tokens": 1050
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000244
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T14__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "4040a7295d3ccaea70fa04454e89d5d4b6277a400245e5d92d6112a739d6eacb",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 857,
      "completion_tokens": 193,
      "total_tokens": 1050
    },
    "latency_ms": 3939,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T14",
    "execution_id": "exec_1781847921420_efcc796d",
    "explanation": {
      "summary": "Currently, there is no data available to analyze the relationship between your Social Balance Score and Average Score. This means we can't determine any correlation patterns at this time. However, maintaining a balance between social activities and academic commitments is important for your overall success.",
      "insights": [],
      "educational_implications": [
        "Understanding the balance between social life and academics can help improve your performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Engage in self-reflection on your social activities and study habits.",
          "rationale": "This can help you identify areas where you might need to adjust your time management to achieve a better balance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "The dataset is empty, preventing any correlation analysis.",
      "based_on": [
        "sparse_data",
        "single_student"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "correlation_evidence",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "social_balance_scatter",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 11,
    "task_aware_prompt_tokens": 363,
    "token_ratio": 33,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (33.0 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3932,
      "token_usage": {
        "prompt_tokens": 857,
        "completion_tokens": 193,
        "total_tokens": 1050
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000244
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
    "expected": 0,
    "observed": 0
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "a1f2afbd3fd6104612348ce439b6218971332a7e84680ad53d378af81f1f5307",
    "expected_values": [
      "a1f2afbd3fd6104612348ce439b6218971332a7e84680ad53d378af81f1f5307"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "67368389af41237b16cecbb82aa1386b18a1cc2628aae8d1c5eab757181838ab",
    "expected": "67368389af41237b16cecbb82aa1386b18a1cc2628aae8d1c5eab757181838ab"
  },
  {
    "check_id": "numeric_fields_social_balance_scatter",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "social_balance_scatter",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_social_balance_scatter",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "social_balance_scatter",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
