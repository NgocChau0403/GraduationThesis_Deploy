# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G14__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G14__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G14",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Early withdrawal signal analysis",
  "scope": "Many students",
  "actionable_question": "How early can admin detect a student about to drop out?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "trend_comparison",
  "ai_prompt_hint": "Use early_warning_week [FE] to show when engagement collapsed for withdrawn students. Compare to passing students.",
  "query_labels": [
    "withdrawal_signal_trend"
  ],
  "explanation_strategy": "trend"
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
    "engagement_count; final_outcome",
    "avg_clicks by outcome group"
  ],
  "output_schema": {},
  "query_labels": [
    "withdrawal_signal_trend"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G14-CORE-01",
      "description": "Identify when engagement collapsed for withdrawn students."
    },
    {
      "requirement_id": "A-G14-CORE-02",
      "description": "Compare the timing or trajectory with passing students."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G14-CONSTRAINT-01",
      "description": "Use early_warning_week as the primary collapse-timing field when returned."
    },
    {
      "constraint_id": "A-G14-CONSTRAINT-02",
      "description": "Frame the comparison as an observed pattern, not proof of withdrawal causation."
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
      "dataset_label": "withdrawal_signal_trend",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G14.json",
      "artifact_sha256": "b1188e446b1e049911821e083dd6043b18f9c9fb38c6a193251269529f21fe3f",
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
  "evidence_artifact_file_sha256": "b1188e446b1e049911821e083dd6043b18f9c9fb38c6a193251269529f21fe3f",
  "evidence_rows_sha256": "e07086f293f911d8e0149842e084a019b868e29b7b9fc373f16a8ae1500f910a",
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
  "embedded_datasets_sha256": "e07086f293f911d8e0149842e084a019b868e29b7b9fc373f16a8ae1500f910a",
  "datasets": {
    "withdrawal_signal_trend": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G14__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "c7bd6e2c890e4ac48ed2999dcc7a89aeb188c8d2bfd924597df6a55cd2f83441",
  "generator_input_sha256": "307a88f976b72b09fd7911af05fd5714b3f28c7dcb0b07f350d0294b9b6d778f",
  "generator_input_compact": {
    "task_id": "A-G14",
    "execution_id": "exec_1781847232818_178a9b0b",
    "task_name": "Early withdrawal signal analysis",
    "analysis_type": "trend",
    "explanation_strategy": "trend",
    "actionable_question": "How early can admin detect a student about to drop out?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "withdrawal_signal_trend"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "withdrawal_signal_trend"
    ],
    "dataset_row_counts": {
      "withdrawal_signal_trend": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_comparison",
      "metric_column": "avg_clicks",
      "entity_column": null,
      "group_column": "final_outcome",
      "time_column": "week_number",
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
  "raw_text": "Summary: The analysis of the withdrawal signal trend reveals a lack of engagement data for the target group of withdrawn students, making it impossible to determine any trends or turning points. Consequently, no comparisons can be made with the performance of passing or distinction groups.\n\nEducational implications: The absence of engagement data indicates a potential gap in monitoring student performance, which could hinder early intervention strategies.\n\nRecommendations: high - Implement a robust engagement tracking system for all students. - This will allow for the identification of at-risk students based on engagement metrics, facilitating timely interventions.\n\nWarnings: The primary dataset is empty, which limits the ability to draw any conclusions regarding withdrawal signals.",
  "structured_payload": {
    "task_id": "A-G14",
    "execution_id": "exec_1781847232818_178a9b0b",
    "explanation": {
      "summary": "The analysis of the withdrawal signal trend reveals a lack of engagement data for the target group of withdrawn students, making it impossible to determine any trends or turning points. Consequently, no comparisons can be made with the performance of passing or distinction groups.",
      "insights": [],
      "educational_implications": [
        "The absence of engagement data indicates a potential gap in monitoring student performance, which could hinder early intervention strategies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a robust engagement tracking system for all students.",
          "rationale": "This will allow for the identification of at-risk students based on engagement metrics, facilitating timely interventions."
        }
      ],
      "warnings": [
        "The primary dataset is empty, which limits the ability to draw any conclusions regarding withdrawal signals."
      ]
    },
    "confidence": {
      "level": "LOW",
      "reason": "The lack of engagement activity data prevents reliable analysis of withdrawal trends.",
      "based_on": [
        "sparse_data",
        "limited_temporal_range"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "trend_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "withdrawal_signal_trend",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 11,
    "task_aware_prompt_tokens": 188,
    "token_ratio": 17.0909,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (17.0909 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3090,
      "token_usage": {
        "prompt_tokens": 1001,
        "completion_tokens": 220,
        "total_tokens": 1221
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000282
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G14__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "c7bd6e2c890e4ac48ed2999dcc7a89aeb188c8d2bfd924597df6a55cd2f83441",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1001,
      "completion_tokens": 220,
      "total_tokens": 1221
    },
    "latency_ms": 3117,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G14",
    "execution_id": "exec_1781847232818_178a9b0b",
    "explanation": {
      "summary": "The analysis of the withdrawal signal trend reveals a lack of engagement data for the target group of withdrawn students, making it impossible to determine any trends or turning points. Consequently, no comparisons can be made with the performance of passing or distinction groups.",
      "insights": [],
      "educational_implications": [
        "The absence of engagement data indicates a potential gap in monitoring student performance, which could hinder early intervention strategies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a robust engagement tracking system for all students.",
          "rationale": "This will allow for the identification of at-risk students based on engagement metrics, facilitating timely interventions."
        }
      ],
      "warnings": [
        "The primary dataset is empty, which limits the ability to draw any conclusions regarding withdrawal signals."
      ]
    },
    "confidence": {
      "level": "LOW",
      "reason": "The lack of engagement activity data prevents reliable analysis of withdrawal trends.",
      "based_on": [
        "sparse_data",
        "limited_temporal_range"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "trend_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "withdrawal_signal_trend",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 11,
    "task_aware_prompt_tokens": 188,
    "token_ratio": 17.0909,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (17.0909 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3090,
      "token_usage": {
        "prompt_tokens": 1001,
        "completion_tokens": 220,
        "total_tokens": 1221
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000282
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
    "observed": "b1188e446b1e049911821e083dd6043b18f9c9fb38c6a193251269529f21fe3f",
    "expected_values": [
      "b1188e446b1e049911821e083dd6043b18f9c9fb38c6a193251269529f21fe3f"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "e07086f293f911d8e0149842e084a019b868e29b7b9fc373f16a8ae1500f910a",
    "expected": "e07086f293f911d8e0149842e084a019b868e29b7b9fc373f16a8ae1500f910a"
  },
  {
    "check_id": "numeric_fields_withdrawal_signal_trend",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "withdrawal_signal_trend",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_withdrawal_signal_trend",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "withdrawal_signal_trend",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
