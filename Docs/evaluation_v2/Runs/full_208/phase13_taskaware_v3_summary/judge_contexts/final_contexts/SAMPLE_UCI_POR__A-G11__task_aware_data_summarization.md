# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G11__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G11__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G11",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Weekly engagement drop detection",
  "scope": "Many students",
  "actionable_question": "Which weeks should the admin schedule check-ins or motivational nudges?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Use early_warning_week [FE] to pinpoint critical weeks. Recommend admin action timing (e.g. week 5 intervention).",
  "query_labels": [
    "weekly_drop_detection"
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
    "engagement_count; is_drop_week [FE cross]",
    "rolling_3wk_avg",
    "drop_pct"
  ],
  "output_schema": {},
  "query_labels": [
    "weekly_drop_detection"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G11-CORE-01",
      "description": "Identify the critical weeks in which cohort-level engagement declined."
    },
    {
      "requirement_id": "A-G11-CORE-02",
      "description": "Recommend admin action timing relative to the identified critical weeks."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G11-CONSTRAINT-01",
      "description": "Use early_warning_week as the primary timing field when returned."
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
      "dataset_label": "weekly_drop_detection",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G11.json",
      "artifact_sha256": "dda6e11844c576d91408710088b1e4432f43929b55eb37429094366f4fc957d0",
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
  "evidence_artifact_file_sha256": "dda6e11844c576d91408710088b1e4432f43929b55eb37429094366f4fc957d0",
  "evidence_rows_sha256": "6672c66720c03793b4703fa2c694d3c5e6cb93f574364f8022f7d5dfb545fe15",
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
  "embedded_datasets_sha256": "6672c66720c03793b4703fa2c694d3c5e6cb93f574364f8022f7d5dfb545fe15",
  "datasets": {
    "weekly_drop_detection": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G11__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "cc780934ac693b7658b2f3cba20966961597ecbeede19c62c32a4388a9ce82ad",
  "generator_input_sha256": "ac91b20e17c18266f3516fc05f5823676e51168711fdbfbf9e01861e76f8e0df",
  "generator_input_compact": {
    "task_id": "A-G11",
    "execution_id": "exec_1781847232720_7a6e525d",
    "task_name": "Weekly engagement drop detection",
    "analysis_type": "trend",
    "explanation_strategy": "trend",
    "actionable_question": "Which weeks should the admin schedule check-ins or motivational nudges?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "weekly_drop_detection"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "weekly_drop_detection"
    ],
    "dataset_row_counts": {
      "weekly_drop_detection": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "week_total_clicks",
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
  "raw_text": "Summary: The analysis of the weekly engagement data reveals a complete absence of engagement activity, indicating no measurable trends or changes in student engagement. Consequently, there are no specific weeks identified for intervention.\n\nEducational implications: The lack of engagement data suggests a need for improved tracking mechanisms to capture student interactions.\n\nRecommendations: high - Implement a system to monitor student engagement more effectively. - Without engagement data, it is impossible to identify trends or intervene in a timely manner.\n\nWarnings: Primary dataset is empty, leading to a lack of actionable insights.",
  "structured_payload": {
    "task_id": "A-G11",
    "execution_id": "exec_1781847232720_7a6e525d",
    "explanation": {
      "summary": "The analysis of the weekly engagement data reveals a complete absence of engagement activity, indicating no measurable trends or changes in student engagement. Consequently, there are no specific weeks identified for intervention.",
      "insights": [],
      "educational_implications": [
        "The lack of engagement data suggests a need for improved tracking mechanisms to capture student interactions."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a system to monitor student engagement more effectively.",
          "rationale": "Without engagement data, it is impossible to identify trends or intervene in a timely manner."
        }
      ],
      "warnings": [
        "Primary dataset is empty, leading to a lack of actionable insights."
      ]
    },
    "confidence": {
      "level": "LOW",
      "reason": "The dataset contains no engagement rows, limiting the ability to draw reliable conclusions.",
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
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "weekly_drop_detection",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 11,
    "task_aware_prompt_tokens": 297,
    "token_ratio": 27,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (27.0 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3134,
      "token_usage": {
        "prompt_tokens": 1110,
        "completion_tokens": 196,
        "total_tokens": 1306
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000284
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G11__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "cc780934ac693b7658b2f3cba20966961597ecbeede19c62c32a4388a9ce82ad",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1110,
      "completion_tokens": 196,
      "total_tokens": 1306
    },
    "latency_ms": 3140,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G11",
    "execution_id": "exec_1781847232720_7a6e525d",
    "explanation": {
      "summary": "The analysis of the weekly engagement data reveals a complete absence of engagement activity, indicating no measurable trends or changes in student engagement. Consequently, there are no specific weeks identified for intervention.",
      "insights": [],
      "educational_implications": [
        "The lack of engagement data suggests a need for improved tracking mechanisms to capture student interactions."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a system to monitor student engagement more effectively.",
          "rationale": "Without engagement data, it is impossible to identify trends or intervene in a timely manner."
        }
      ],
      "warnings": [
        "Primary dataset is empty, leading to a lack of actionable insights."
      ]
    },
    "confidence": {
      "level": "LOW",
      "reason": "The dataset contains no engagement rows, limiting the ability to draw reliable conclusions.",
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
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "weekly_drop_detection",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 11,
    "task_aware_prompt_tokens": 297,
    "token_ratio": 27,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (27.0 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3134,
      "token_usage": {
        "prompt_tokens": 1110,
        "completion_tokens": 196,
        "total_tokens": 1306
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000284
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
    "observed": "dda6e11844c576d91408710088b1e4432f43929b55eb37429094366f4fc957d0",
    "expected_values": [
      "dda6e11844c576d91408710088b1e4432f43929b55eb37429094366f4fc957d0"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "6672c66720c03793b4703fa2c694d3c5e6cb93f574364f8022f7d5dfb545fe15",
    "expected": "6672c66720c03793b4703fa2c694d3c5e6cb93f574364f8022f7d5dfb545fe15"
  },
  {
    "check_id": "numeric_fields_weekly_drop_detection",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "weekly_drop_detection",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_weekly_drop_detection",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "weekly_drop_detection",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
