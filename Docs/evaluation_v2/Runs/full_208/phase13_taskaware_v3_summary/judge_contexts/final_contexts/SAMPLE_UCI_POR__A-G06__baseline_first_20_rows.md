# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G06__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G06__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G06",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Activity type effectiveness",
  "scope": "Many students",
  "actionable_question": "Which learning activities should the admin encourage students to use more?",
  "target_audience": "instructor",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Highlight which resource types are most associated with higher scores. Recommend admin to promote those.",
  "query_labels": [
    "activity_effectiveness"
  ],
  "explanation_strategy": "correlation"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement",
    "event",
    "assessment_result",
    "assessment [OULAD only]"
  ],
  "key_db_fields": [
    "resource_type",
    "engagement_count; avg_score [FE cross] by resource_type"
  ],
  "output_schema": {},
  "query_labels": [
    "activity_effectiveness"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G06-CORE-01",
      "description": "Highlight which resource types are most associated with higher scores."
    },
    {
      "requirement_id": "A-G06-CORE-02",
      "description": "Recommend admin to promote those."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G06-CONSTRAINT-01",
      "description": "Frame resource-score relationships as correlational; do not claim that a resource type causes score improvement."
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
      "dataset_label": "activity_effectiveness",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G06.json",
      "artifact_sha256": "9f3a43bc72634dba922d4eea50c7f25612d93c55c8fa774695a1c6922809332b",
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
  "evidence_artifact_file_sha256": "9f3a43bc72634dba922d4eea50c7f25612d93c55c8fa774695a1c6922809332b",
  "evidence_rows_sha256": "2dfad280e95745dd6e0f692349ec617207e1b108923f48c4440fad64cfed7bed",
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
  "embedded_datasets_sha256": "2dfad280e95745dd6e0f692349ec617207e1b108923f48c4440fad64cfed7bed",
  "datasets": {
    "activity_effectiveness": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G06__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "cbfedad649be808d4fe45d9f0cb3442f66891598349226ce3c58ba9bb20646e3",
  "generator_input_sha256": "245e2906382ddccf3a924d67ded888557faed28afc130229da318b308be12159",
  "generator_input_compact": {
    "task_id": "A-G06",
    "execution_id": "exec_1781847232487_b81f3d9d",
    "task_name": "Activity type effectiveness",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "Which learning activities should the admin encourage students to use more?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "activity_effectiveness"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "activity_effectiveness"
    ],
    "dataset_row_counts": {
      "activity_effectiveness": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "ranking",
      "metric_column": "avg_score_by_resource_type",
      "entity_column": "resource_type",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": "desc",
      "top_k": 5,
      "bottom_k": 3,
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
  "raw_text": "Summary: The analysis of the relationship between Resource Type and Avg Score of Users cannot be conducted due to the absence of data in the dataset. Without any records, no correlation patterns can be identified.\n\nWarnings: No data available for analysis, making it impossible to draw any conclusions or recommendations.",
  "structured_payload": {
    "task_id": "A-G06",
    "execution_id": "exec_1781847232487_b81f3d9d",
    "explanation": {
      "summary": "The analysis of the relationship between Resource Type and Avg Score of Users cannot be conducted due to the absence of data in the dataset. Without any records, no correlation patterns can be identified.",
      "insights": [],
      "educational_implications": [],
      "recommendations": [],
      "warnings": [
        "No data available for analysis, making it impossible to draw any conclusions or recommendations."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is empty, leading to a definitive conclusion that no analysis can be performed.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
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
      "latency_ms": 2766,
      "token_usage": {
        "prompt_tokens": 519,
        "completion_tokens": 133,
        "total_tokens": 652
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000158
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G06__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "cbfedad649be808d4fe45d9f0cb3442f66891598349226ce3c58ba9bb20646e3",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 519,
      "completion_tokens": 133,
      "total_tokens": 652
    },
    "latency_ms": 2770,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G06",
    "execution_id": "exec_1781847232487_b81f3d9d",
    "explanation": {
      "summary": "The analysis of the relationship between Resource Type and Avg Score of Users cannot be conducted due to the absence of data in the dataset. Without any records, no correlation patterns can be identified.",
      "insights": [],
      "educational_implications": [],
      "recommendations": [],
      "warnings": [
        "No data available for analysis, making it impossible to draw any conclusions or recommendations."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is empty, leading to a definitive conclusion that no analysis can be performed.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
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
      "latency_ms": 2766,
      "token_usage": {
        "prompt_tokens": 519,
        "completion_tokens": 133,
        "total_tokens": 652
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000158
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
    "observed": "9f3a43bc72634dba922d4eea50c7f25612d93c55c8fa774695a1c6922809332b",
    "expected_values": [
      "9f3a43bc72634dba922d4eea50c7f25612d93c55c8fa774695a1c6922809332b"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "2dfad280e95745dd6e0f692349ec617207e1b108923f48c4440fad64cfed7bed",
    "expected": "2dfad280e95745dd6e0f692349ec617207e1b108923f48c4440fad64cfed7bed"
  },
  {
    "check_id": "numeric_fields_activity_effectiveness",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "activity_effectiveness",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_activity_effectiveness",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "activity_effectiveness",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
