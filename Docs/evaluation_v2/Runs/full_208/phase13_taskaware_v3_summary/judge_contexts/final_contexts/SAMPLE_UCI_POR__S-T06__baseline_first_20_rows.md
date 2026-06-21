# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T06__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T06__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T06",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Study consistency check",
  "scope": "1 student",
  "actionable_question": "Am I studying steadily or only before exams?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Distinguish 'steady learner' from 'pre-exam crammer'. Recommend a consistent weekly routine.",
  "query_labels": [
    "consistency_data"
  ],
  "explanation_strategy": "behavioral"
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
    "engagement_count; consistency_level [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "consistency_data"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T06-CORE-01",
      "description": "Characterise the observed study pattern as steady or concentrated before assessments when evidence supports that distinction."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "S-T06-SUPPORT-01",
      "description": "Recommend a consistent weekly routine grounded in the observed study pattern."
    }
  ],
  "evaluation_constraints": [],
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
      "dataset_label": "consistency_data",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T06.json",
      "artifact_sha256": "494f8b5d629d7f242e70e4c3d3372b051cd5e6b7dad4d19d1e1f92d75e21ae7c",
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
  "evidence_artifact_file_sha256": "494f8b5d629d7f242e70e4c3d3372b051cd5e6b7dad4d19d1e1f92d75e21ae7c",
  "evidence_rows_sha256": "effce1473216f5180bf69ac476ba9d806943c62f6b337be448e097e4d8493bce",
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
  "embedded_datasets_sha256": "effce1473216f5180bf69ac476ba9d806943c62f6b337be448e097e4d8493bce",
  "datasets": {
    "consistency_data": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T06__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "a0134b946d6e5c4e2edda31b3a20e8de80a2da9dbd7faa696500ab006ee776ce",
  "generator_input_sha256": "425a5c7da6e2c338673da732ba4386ca4558fbc3b8ec11e5fe9b2c44d55cf133",
  "generator_input_compact": {
    "task_id": "S-T06",
    "execution_id": "exec_1781847242216_9ed9353f",
    "task_name": "Study consistency check",
    "analysis_type": "distribution",
    "explanation_strategy": "behavioral",
    "actionable_question": "Am I studying steadily or only before exams?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "consistency_data"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "consistency_data"
    ],
    "dataset_row_counts": {
      "consistency_data": 0
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
  "raw_text": "Summary: It appears that there is no data available to analyze your study patterns. Without this information, it's challenging to determine if you are studying steadily or only cramming before exams.\n\nEducational implications: Regular engagement is key to mastering course material.\n\nRecommendations: high - Establish a weekly study schedule. - Creating a consistent routine can help you stay engaged with the material and reduce last-minute cramming.",
  "structured_payload": {
    "task_id": "S-T06",
    "execution_id": "exec_1781847242216_9ed9353f",
    "explanation": {
      "summary": "It appears that there is no data available to analyze your study patterns. Without this information, it's challenging to determine if you are studying steadily or only cramming before exams.",
      "insights": [],
      "educational_implications": [
        "Regular engagement is key to mastering course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Establish a weekly study schedule.",
          "rationale": "Creating a consistent routine can help you stay engaged with the material and reduce last-minute cramming."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "No data available for analysis.",
      "based_on": [
        "sparse_data",
        "limited_temporal_range",
        "single_student"
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
      "latency_ms": 4243,
      "token_usage": {
        "prompt_tokens": 513,
        "completion_tokens": 159,
        "total_tokens": 672
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000172
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T06__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "a0134b946d6e5c4e2edda31b3a20e8de80a2da9dbd7faa696500ab006ee776ce",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 513,
      "completion_tokens": 159,
      "total_tokens": 672
    },
    "latency_ms": 4248,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T06",
    "execution_id": "exec_1781847242216_9ed9353f",
    "explanation": {
      "summary": "It appears that there is no data available to analyze your study patterns. Without this information, it's challenging to determine if you are studying steadily or only cramming before exams.",
      "insights": [],
      "educational_implications": [
        "Regular engagement is key to mastering course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Establish a weekly study schedule.",
          "rationale": "Creating a consistent routine can help you stay engaged with the material and reduce last-minute cramming."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "No data available for analysis.",
      "based_on": [
        "sparse_data",
        "limited_temporal_range",
        "single_student"
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
      "latency_ms": 4243,
      "token_usage": {
        "prompt_tokens": 513,
        "completion_tokens": 159,
        "total_tokens": 672
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000172
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
    "observed": "494f8b5d629d7f242e70e4c3d3372b051cd5e6b7dad4d19d1e1f92d75e21ae7c",
    "expected_values": [
      "494f8b5d629d7f242e70e4c3d3372b051cd5e6b7dad4d19d1e1f92d75e21ae7c"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "effce1473216f5180bf69ac476ba9d806943c62f6b337be448e097e4d8493bce",
    "expected": "effce1473216f5180bf69ac476ba9d806943c62f6b337be448e097e4d8493bce"
  },
  {
    "check_id": "numeric_fields_consistency_data",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "consistency_data",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_consistency_data",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "consistency_data",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
