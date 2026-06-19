# LLM Judge V2 Final Judge Context - SAMPLE_UCI_POR__A-G14__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G14__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G14",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G14__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "1ff4162830680044f70d4fb02b67904e8f60462d25138d36d7c27c9cdd959759",
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
  "raw_text": "Summary: The analysis reveals a complete absence of engagement data, indicating no measurable trends or patterns regarding early withdrawal signals. This lack of data limits the ability to identify any changes in student engagement or potential dropout risks.\n\nEducational implications: The absence of engagement data suggests a need for improved tracking mechanisms to identify at-risk students early.\n\nRecommendations: high - Implement a robust engagement tracking system. - To effectively monitor student engagement and identify early withdrawal signals, a reliable data collection system is essential.\n\nWarnings: Data quality signal is LOW; no positive engagement activity found, indicating a lack of data to analyze.",
  "structured_payload": {
    "task_id": "A-G14",
    "execution_id": "exec_1781847232818_178a9b0b",
    "explanation": {
      "summary": "The analysis reveals a complete absence of engagement data, indicating no measurable trends or patterns regarding early withdrawal signals. This lack of data limits the ability to identify any changes in student engagement or potential dropout risks.",
      "insights": [],
      "educational_implications": [
        "The absence of engagement data suggests a need for improved tracking mechanisms to identify at-risk students early."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a robust engagement tracking system.",
          "rationale": "To effectively monitor student engagement and identify early withdrawal signals, a reliable data collection system is essential."
        }
      ],
      "warnings": [
        "Data quality signal is LOW; no positive engagement activity found, indicating a lack of data to analyze."
      ]
    },
    "confidence": {
      "level": "LOW",
      "reason": "The dataset contains no rows, leading to an inability to assess trends or patterns.",
      "based_on": [
        "sparse_data",
        "limited_temporal_range"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "withdrawal_signal_trend",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 2959,
      "token_usage": {
        "prompt_tokens": 990,
        "completion_tokens": 209,
        "total_tokens": 1199
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000274
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G14__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "1ff4162830680044f70d4fb02b67904e8f60462d25138d36d7c27c9cdd959759",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 990,
      "completion_tokens": 209,
      "total_tokens": 1199
    },
    "latency_ms": 2964,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G14",
    "execution_id": "exec_1781847232818_178a9b0b",
    "explanation": {
      "summary": "The analysis reveals a complete absence of engagement data, indicating no measurable trends or patterns regarding early withdrawal signals. This lack of data limits the ability to identify any changes in student engagement or potential dropout risks.",
      "insights": [],
      "educational_implications": [
        "The absence of engagement data suggests a need for improved tracking mechanisms to identify at-risk students early."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a robust engagement tracking system.",
          "rationale": "To effectively monitor student engagement and identify early withdrawal signals, a reliable data collection system is essential."
        }
      ],
      "warnings": [
        "Data quality signal is LOW; no positive engagement activity found, indicating a lack of data to analyze."
      ]
    },
    "confidence": {
      "level": "LOW",
      "reason": "The dataset contains no rows, leading to an inability to assess trends or patterns.",
      "based_on": [
        "sparse_data",
        "limited_temporal_range"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "withdrawal_signal_trend",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 2959,
      "token_usage": {
        "prompt_tokens": 990,
        "completion_tokens": 209,
        "total_tokens": 1199
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000274
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
