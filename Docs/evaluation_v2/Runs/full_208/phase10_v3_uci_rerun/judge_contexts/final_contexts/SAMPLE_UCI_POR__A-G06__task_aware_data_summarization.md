# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G06__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G06__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G06",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G06__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "5538b4c42fb6b96c54ff069e0e0aad8db93ed1c1ebfb02a932d404bc9690ed33",
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
  "raw_text": "Summary: The analysis of the relationship between Resource Type and Avg Score of Users could not be conducted due to the absence of data. Without any rows in the dataset, no correlation patterns can be identified.\n\nEducational implications: The lack of data limits the ability to determine which resource types may enhance student learning outcomes.\n\nRecommendations: high - Encourage the collection of more comprehensive data on resource usage and user scores. - Gathering sufficient data is essential to identify effective learning activities and make informed decisions for improving student engagement and performance.",
  "structured_payload": {
    "task_id": "A-G06",
    "execution_id": "exec_1781847232487_b81f3d9d",
    "explanation": {
      "summary": "The analysis of the relationship between Resource Type and Avg Score of Users could not be conducted due to the absence of data. Without any rows in the dataset, no correlation patterns can be identified.",
      "insights": [],
      "educational_implications": [
        "The lack of data limits the ability to determine which resource types may enhance student learning outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Encourage the collection of more comprehensive data on resource usage and user scores.",
          "rationale": "Gathering sufficient data is essential to identify effective learning activities and make informed decisions for improving student engagement and performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "No data is available for analysis, which prevents any reliable conclusions.",
      "based_on": [
        "sparse_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
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
        "dataset_name": "activity_effectiveness",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4170,
      "token_usage": {
        "prompt_tokens": 670,
        "completion_tokens": 190,
        "total_tokens": 860
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000215
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G06__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "5538b4c42fb6b96c54ff069e0e0aad8db93ed1c1ebfb02a932d404bc9690ed33",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 670,
      "completion_tokens": 190,
      "total_tokens": 860
    },
    "latency_ms": 4208,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G06",
    "execution_id": "exec_1781847232487_b81f3d9d",
    "explanation": {
      "summary": "The analysis of the relationship between Resource Type and Avg Score of Users could not be conducted due to the absence of data. Without any rows in the dataset, no correlation patterns can be identified.",
      "insights": [],
      "educational_implications": [
        "The lack of data limits the ability to determine which resource types may enhance student learning outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Encourage the collection of more comprehensive data on resource usage and user scores.",
          "rationale": "Gathering sufficient data is essential to identify effective learning activities and make informed decisions for improving student engagement and performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "No data is available for analysis, which prevents any reliable conclusions.",
      "based_on": [
        "sparse_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
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
        "dataset_name": "activity_effectiveness",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4170,
      "token_usage": {
        "prompt_tokens": 670,
        "completion_tokens": 190,
        "total_tokens": 860
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000215
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
