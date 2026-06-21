# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T05__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T05__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T05",
  "explanation_mode": "task_aware_data_summarization",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T05__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "d003a38d3a4728f34b366abcf4ade42baf9288bb332a56613deba770d1d4a5b8",
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
  "raw_text": "Summary: It appears that there is currently no engagement data available for your weekly activities. This means we can't identify specific weeks of disengagement or any patterns in your behavior. However, it's important to stay proactive in your engagement with the course material.\n\nEducational implications: Regular engagement is crucial for understanding course content and performing well.\n\nRecommendations: high - Start tracking your weekly engagement activities. - By monitoring your clicks and interactions, you can identify patterns and areas for improvement.",
  "structured_payload": {
    "task_id": "S-T05",
    "execution_id": "exec_1781847242190_05e087d3",
    "explanation": {
      "summary": "It appears that there is currently no engagement data available for your weekly activities. This means we can't identify specific weeks of disengagement or any patterns in your behavior. However, it's important to stay proactive in your engagement with the course material.",
      "insights": [],
      "educational_implications": [
        "Regular engagement is crucial for understanding course content and performing well."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Start tracking your weekly engagement activities.",
          "rationale": "By monitoring your clicks and interactions, you can identify patterns and areas for improvement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is empty, indicating no recorded engagement data.",
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
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "weekly_engagement",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 10,
    "task_aware_prompt_tokens": 294,
    "token_ratio": 29.4,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (29.4 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 2480,
      "token_usage": {
        "prompt_tokens": 782,
        "completion_tokens": 177,
        "total_tokens": 959
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000223
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T05__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "d003a38d3a4728f34b366abcf4ade42baf9288bb332a56613deba770d1d4a5b8",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 782,
      "completion_tokens": 177,
      "total_tokens": 959
    },
    "latency_ms": 2486,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T05",
    "execution_id": "exec_1781847242190_05e087d3",
    "explanation": {
      "summary": "It appears that there is currently no engagement data available for your weekly activities. This means we can't identify specific weeks of disengagement or any patterns in your behavior. However, it's important to stay proactive in your engagement with the course material.",
      "insights": [],
      "educational_implications": [
        "Regular engagement is crucial for understanding course content and performing well."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Start tracking your weekly engagement activities.",
          "rationale": "By monitoring your clicks and interactions, you can identify patterns and areas for improvement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is empty, indicating no recorded engagement data.",
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
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "weekly_engagement",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 10,
    "task_aware_prompt_tokens": 294,
    "token_ratio": 29.4,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (29.4 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 2480,
      "token_usage": {
        "prompt_tokens": 782,
        "completion_tokens": 177,
        "total_tokens": 959
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000223
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
