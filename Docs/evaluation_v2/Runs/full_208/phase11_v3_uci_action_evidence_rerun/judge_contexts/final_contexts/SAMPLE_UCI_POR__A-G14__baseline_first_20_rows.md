# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G14__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G14__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G14",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
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
  "source_type": "not_applicable",
  "rule_set_id": null,
  "rule_version": null,
  "evaluation_status": "not_applicable",
  "supported_action_count": 0,
  "supported_actions": [],
  "rule_evaluations": [],
  "conflict_evaluations": []
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G14__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "256e7c6f1a2a8bd3750c920ae665b086f83910947dd8b96e2c61fd18bcf54497",
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
  "raw_text": "Summary: The analysis reveals a complete absence of engagement data, indicating a lack of measurable student activity. Consequently, no trends, turning points, or values can be identified, which limits the ability to detect early withdrawal signals.\n\nEducational implications: The absence of engagement data suggests that monitoring systems may need to be enhanced to capture student activity more effectively.\n\nRecommendations: high - Implement a more robust engagement tracking system. - To identify early withdrawal signals, it is crucial to have reliable engagement metrics that can indicate when students are at risk of dropping out.\n\nWarnings: Data quality signal is LOW; no positive engagement activity found (0 engagement rows).",
  "structured_payload": {
    "task_id": "A-G14",
    "execution_id": "exec_1781847232818_178a9b0b",
    "explanation": {
      "summary": "The analysis reveals a complete absence of engagement data, indicating a lack of measurable student activity. Consequently, no trends, turning points, or values can be identified, which limits the ability to detect early withdrawal signals.",
      "insights": [],
      "educational_implications": [
        "The absence of engagement data suggests that monitoring systems may need to be enhanced to capture student activity more effectively."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a more robust engagement tracking system.",
          "rationale": "To identify early withdrawal signals, it is crucial to have reliable engagement metrics that can indicate when students are at risk of dropping out."
        }
      ],
      "warnings": [
        "Data quality signal is LOW; no positive engagement activity found (0 engagement rows)."
      ]
    },
    "confidence": {
      "level": "LOW",
      "reason": "The analysis is based on an empty dataset, which does not provide any actionable insights.",
      "based_on": [
        "sparse_data",
        "limited_temporal_range"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
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
      "latency_ms": 3667,
      "token_usage": {
        "prompt_tokens": 836,
        "completion_tokens": 222,
        "total_tokens": 1058
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000259
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G14__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "256e7c6f1a2a8bd3750c920ae665b086f83910947dd8b96e2c61fd18bcf54497",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 836,
      "completion_tokens": 222,
      "total_tokens": 1058
    },
    "latency_ms": 3677,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G14",
    "execution_id": "exec_1781847232818_178a9b0b",
    "explanation": {
      "summary": "The analysis reveals a complete absence of engagement data, indicating a lack of measurable student activity. Consequently, no trends, turning points, or values can be identified, which limits the ability to detect early withdrawal signals.",
      "insights": [],
      "educational_implications": [
        "The absence of engagement data suggests that monitoring systems may need to be enhanced to capture student activity more effectively."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a more robust engagement tracking system.",
          "rationale": "To identify early withdrawal signals, it is crucial to have reliable engagement metrics that can indicate when students are at risk of dropping out."
        }
      ],
      "warnings": [
        "Data quality signal is LOW; no positive engagement activity found (0 engagement rows)."
      ]
    },
    "confidence": {
      "level": "LOW",
      "reason": "The analysis is based on an empty dataset, which does not provide any actionable insights.",
      "based_on": [
        "sparse_data",
        "limited_temporal_range"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
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
      "latency_ms": 3667,
      "token_usage": {
        "prompt_tokens": 836,
        "completion_tokens": 222,
        "total_tokens": 1058
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000259
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
