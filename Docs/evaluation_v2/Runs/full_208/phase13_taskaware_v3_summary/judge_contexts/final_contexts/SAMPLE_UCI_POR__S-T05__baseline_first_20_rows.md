# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T05__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T05__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T05",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Weekly engagement trend",
  "scope": "1 student",
  "actionable_question": "Which weeks did I disengage and why might that be?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Describe engagement pattern. Flag weeks with sharp drops. Note if drop precedes assessment.",
  "query_labels": [
    "weekly_engagement"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
    "engagement [OULAD only]"
  ],
  "key_db_fields": [
    "week_number",
    "engagement_count; early_warning_week [FE cross]",
    "weekly_engagement_drop [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "weekly_engagement"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T05-CORE-01",
      "description": "Describe engagement pattern."
    },
    {
      "requirement_id": "S-T05-CORE-02",
      "description": "Flag weeks with sharp drops."
    },
    {
      "requirement_id": "S-T05-CORE-03",
      "description": "Note if drop precedes assessment."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T05-CONSTRAINT-01",
      "description": "Treat temporal proximity between engagement drops and assessments as an association, not proof that the assessment caused the drop."
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
      "dataset_label": "weekly_engagement",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T05.json",
      "artifact_sha256": "0e89c2d313eab105f19afa03a99195aa5694fef582e72af05d58e0462c2fe2bb",
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
  "evidence_artifact_file_sha256": "0e89c2d313eab105f19afa03a99195aa5694fef582e72af05d58e0462c2fe2bb",
  "evidence_rows_sha256": "79e7e28f2d9412ca28740680b9ebcc28b18a6e1fb4c17e9463dc3b3fcbd24f6c",
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
  "embedded_datasets_sha256": "79e7e28f2d9412ca28740680b9ebcc28b18a6e1fb4c17e9463dc3b3fcbd24f6c",
  "datasets": {
    "weekly_engagement": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T05__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "e15b91a4c479a432678ce02d8487697f9cd29550439084761fb2de73fa3e6770",
  "generator_input_sha256": "791c662f0210333222143fb730fead5fbb262be75fdd51a2180a0dc1471b965e",
  "generator_input_compact": {
    "task_id": "S-T05",
    "execution_id": "exec_1781847242190_05e087d3",
    "task_name": "Weekly engagement trend",
    "analysis_type": "trend",
    "explanation_strategy": "behavioral",
    "actionable_question": "Which weeks did I disengage and why might that be?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "weekly_engagement"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "weekly_engagement"
    ],
    "dataset_row_counts": {
      "weekly_engagement": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "weekly_clicks",
      "entity_column": null,
      "group_column": null,
      "time_column": "week_number",
      "sort_by": null,
      "sort_direction": "asc",
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
  "raw_text": "Summary: It appears that there is no engagement data available for your weekly activities, which makes it challenging to identify specific patterns or weeks of disengagement. This lack of data suggests that you may not have participated in the course during the observed period.\n\nEducational implications: Regular engagement is crucial for understanding course material and succeeding in assessments.\n\nRecommendations: high - Start tracking your weekly engagement activities. - By monitoring your participation, you can identify patterns and make adjustments to improve your learning experience.",
  "structured_payload": {
    "task_id": "S-T05",
    "execution_id": "exec_1781847242190_05e087d3",
    "explanation": {
      "summary": "It appears that there is no engagement data available for your weekly activities, which makes it challenging to identify specific patterns or weeks of disengagement. This lack of data suggests that you may not have participated in the course during the observed period.",
      "insights": [],
      "educational_implications": [
        "Regular engagement is crucial for understanding course material and succeeding in assessments."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Start tracking your weekly engagement activities.",
          "rationale": "By monitoring your participation, you can identify patterns and make adjustments to improve your learning experience."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "No data available to analyze engagement patterns.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
      "latency_ms": 5920,
      "token_usage": {
        "prompt_tokens": 513,
        "completion_tokens": 177,
        "total_tokens": 690
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000183
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T05__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "e15b91a4c479a432678ce02d8487697f9cd29550439084761fb2de73fa3e6770",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 513,
      "completion_tokens": 177,
      "total_tokens": 690
    },
    "latency_ms": 5925,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T05",
    "execution_id": "exec_1781847242190_05e087d3",
    "explanation": {
      "summary": "It appears that there is no engagement data available for your weekly activities, which makes it challenging to identify specific patterns or weeks of disengagement. This lack of data suggests that you may not have participated in the course during the observed period.",
      "insights": [],
      "educational_implications": [
        "Regular engagement is crucial for understanding course material and succeeding in assessments."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Start tracking your weekly engagement activities.",
          "rationale": "By monitoring your participation, you can identify patterns and make adjustments to improve your learning experience."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "No data available to analyze engagement patterns.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
      "latency_ms": 5920,
      "token_usage": {
        "prompt_tokens": 513,
        "completion_tokens": 177,
        "total_tokens": 690
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000183
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
    "observed": "0e89c2d313eab105f19afa03a99195aa5694fef582e72af05d58e0462c2fe2bb",
    "expected_values": [
      "0e89c2d313eab105f19afa03a99195aa5694fef582e72af05d58e0462c2fe2bb"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "79e7e28f2d9412ca28740680b9ebcc28b18a6e1fb4c17e9463dc3b3fcbd24f6c",
    "expected": "79e7e28f2d9412ca28740680b9ebcc28b18a6e1fb4c17e9463dc3b3fcbd24f6c"
  },
  {
    "check_id": "numeric_fields_weekly_engagement",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "weekly_engagement",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_weekly_engagement",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "weekly_engagement",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
