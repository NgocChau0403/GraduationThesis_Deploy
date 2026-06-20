# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G11__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G11__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G11",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G11__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "be478c186c05a334d461eac2acc43034a84446f7f3d34ed9ad6635888a9c3bbf",
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
  "raw_text": "Summary: The analysis indicates a lack of engagement data, resulting in no discernible trends or patterns. Consequently, no specific weeks can be identified for intervention.\n\nEducational implications: The absence of engagement data suggests a need for improved data collection methods to monitor student activity effectively.\n\nRecommendations: high - Implement a system to track engagement metrics regularly. - Establishing a reliable data collection process is essential for identifying trends and scheduling timely interventions.\n\nWarnings: Data quality signal is LOW; no positive engagement activity found (0 engagement rows).",
  "structured_payload": {
    "task_id": "A-G11",
    "execution_id": "exec_1781847232720_7a6e525d",
    "explanation": {
      "summary": "The analysis indicates a lack of engagement data, resulting in no discernible trends or patterns. Consequently, no specific weeks can be identified for intervention.",
      "insights": [],
      "educational_implications": [
        "The absence of engagement data suggests a need for improved data collection methods to monitor student activity effectively."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a system to track engagement metrics regularly.",
          "rationale": "Establishing a reliable data collection process is essential for identifying trends and scheduling timely interventions."
        }
      ],
      "warnings": [
        "Data quality signal is LOW; no positive engagement activity found (0 engagement rows)."
      ]
    },
    "confidence": {
      "level": "LOW",
      "reason": "The analysis is based on an empty dataset, limiting the ability to draw meaningful conclusions.",
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
      "latency_ms": 3636,
      "token_usage": {
        "prompt_tokens": 840,
        "completion_tokens": 197,
        "total_tokens": 1037
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000244
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G11__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "be478c186c05a334d461eac2acc43034a84446f7f3d34ed9ad6635888a9c3bbf",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 840,
      "completion_tokens": 197,
      "total_tokens": 1037
    },
    "latency_ms": 3640,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G11",
    "execution_id": "exec_1781847232720_7a6e525d",
    "explanation": {
      "summary": "The analysis indicates a lack of engagement data, resulting in no discernible trends or patterns. Consequently, no specific weeks can be identified for intervention.",
      "insights": [],
      "educational_implications": [
        "The absence of engagement data suggests a need for improved data collection methods to monitor student activity effectively."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a system to track engagement metrics regularly.",
          "rationale": "Establishing a reliable data collection process is essential for identifying trends and scheduling timely interventions."
        }
      ],
      "warnings": [
        "Data quality signal is LOW; no positive engagement activity found (0 engagement rows)."
      ]
    },
    "confidence": {
      "level": "LOW",
      "reason": "The analysis is based on an empty dataset, limiting the ability to draw meaningful conclusions.",
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
      "latency_ms": 3636,
      "token_usage": {
        "prompt_tokens": 840,
        "completion_tokens": 197,
        "total_tokens": 1037
      },
      "strategy": "trend",
      "granularity": "weekly",
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
