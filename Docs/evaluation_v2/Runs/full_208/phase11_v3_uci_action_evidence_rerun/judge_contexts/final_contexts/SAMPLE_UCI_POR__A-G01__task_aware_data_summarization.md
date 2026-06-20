# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G01__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G01",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Identify low-engagement group",
  "scope": "Many students",
  "actionable_question": "Which students are dangerously disengaged and need outreach?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Define 'low engagement' threshold. List students below it. Recommend admin action (email/contact).",
  "query_labels": [
    "low_engagement_group"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement"
  ],
  "key_db_fields": [
    "engagement_score [FE cross]",
    "study_effort_level [FE cross]",
    "total_clicks (engagement)",
    "active_days"
  ],
  "output_schema": {},
  "query_labels": [
    "low_engagement_group"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G01-CORE-01",
      "description": "Define 'low engagement' threshold."
    },
    {
      "requirement_id": "A-G01-CORE-02",
      "description": "List students below it."
    },
    {
      "requirement_id": "A-G01-CORE-03",
      "description": "Recommend admin action (email/contact)."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G01-CONSTRAINT-01",
      "description": "Do not name individual students beyond identifiers already present in returned data."
    },
    {
      "constraint_id": "A-G01-CONSTRAINT-02",
      "description": "Treat the output as internal admin use when individual identifiers are listed."
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
      "dataset_label": "low_engagement_group",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G01.json",
      "artifact_sha256": "9396310cce21d99088b49c8825e1a787d7c8abe077b3c399fb9fde71fa14e8d8",
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
  "evidence_artifact_file_sha256": "9396310cce21d99088b49c8825e1a787d7c8abe077b3c399fb9fde71fa14e8d8",
  "evidence_rows_sha256": "1fd23fe99ac3d02140ca65dfe7286566b1f9f74e2080fece147b6c69bfd9f4b6",
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
  "embedded_datasets_sha256": "1fd23fe99ac3d02140ca65dfe7286566b1f9f74e2080fece147b6c69bfd9f4b6",
  "datasets": {
    "low_engagement_group": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G01__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "516fdb5f55f90d8081a8d9d4a8edc64e3bf6fffbb1767ea3b19ad9f0e5be9813",
  "generator_input_sha256": "6fd329cb7a797559730d211e404434e57a1285f049a929582980f9f0c8711266",
  "generator_input_compact": {
    "task_id": "A-G01",
    "execution_id": "exec_1781847232095_a0ebb62f",
    "task_name": "Identify low-engagement group",
    "analysis_type": "segmentation",
    "explanation_strategy": "behavioral",
    "actionable_question": "Which students are dangerously disengaged and need outreach?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "low_engagement_group"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "low_engagement_group"
    ],
    "dataset_row_counts": {
      "low_engagement_group": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "ranking",
      "metric_column": "engagement_score",
      "entity_column": "student_id",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": "asc",
      "top_k": 10,
      "bottom_k": 5,
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
  "raw_text": "Summary: The analysis indicates that there are currently no identified students within the low engagement group, suggesting a lack of data on disengaged individuals. This absence of data may imply either consistent engagement across the cohort or insufficient tracking of student activity.\n\nEducational implications: The absence of low engagement data may hinder targeted interventions for at-risk students.\n\nRecommendations: high - Implement a tracking system for student engagement metrics. - Establishing a robust tracking system will help identify students who may be disengaged and require outreach.",
  "structured_payload": {
    "task_id": "A-G01",
    "execution_id": "exec_1781847232095_a0ebb62f",
    "explanation": {
      "summary": "The analysis indicates that there are currently no identified students within the low engagement group, suggesting a lack of data on disengaged individuals. This absence of data may imply either consistent engagement across the cohort or insufficient tracking of student activity.",
      "insights": [],
      "educational_implications": [
        "The absence of low engagement data may hinder targeted interventions for at-risk students."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a tracking system for student engagement metrics.",
          "rationale": "Establishing a robust tracking system will help identify students who may be disengaged and require outreach."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset indicates no records of low engagement, suggesting a comprehensive absence of data rather than a lack of disengaged students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
        "dataset_name": "low_engagement_group",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3201,
      "token_usage": {
        "prompt_tokens": 650,
        "completion_tokens": 197,
        "total_tokens": 847
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000216
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G01__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "516fdb5f55f90d8081a8d9d4a8edc64e3bf6fffbb1767ea3b19ad9f0e5be9813",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 650,
      "completion_tokens": 197,
      "total_tokens": 847
    },
    "latency_ms": 3205,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G01",
    "execution_id": "exec_1781847232095_a0ebb62f",
    "explanation": {
      "summary": "The analysis indicates that there are currently no identified students within the low engagement group, suggesting a lack of data on disengaged individuals. This absence of data may imply either consistent engagement across the cohort or insufficient tracking of student activity.",
      "insights": [],
      "educational_implications": [
        "The absence of low engagement data may hinder targeted interventions for at-risk students."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement a tracking system for student engagement metrics.",
          "rationale": "Establishing a robust tracking system will help identify students who may be disengaged and require outreach."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset indicates no records of low engagement, suggesting a comprehensive absence of data rather than a lack of disengaged students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
        "dataset_name": "low_engagement_group",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3201,
      "token_usage": {
        "prompt_tokens": 650,
        "completion_tokens": 197,
        "total_tokens": 847
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000216
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
    "observed": "9396310cce21d99088b49c8825e1a787d7c8abe077b3c399fb9fde71fa14e8d8",
    "expected_values": [
      "9396310cce21d99088b49c8825e1a787d7c8abe077b3c399fb9fde71fa14e8d8"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "1fd23fe99ac3d02140ca65dfe7286566b1f9f74e2080fece147b6c69bfd9f4b6",
    "expected": "1fd23fe99ac3d02140ca65dfe7286566b1f9f74e2080fece147b6c69bfd9f4b6"
  },
  {
    "check_id": "numeric_fields_low_engagement_group",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "low_engagement_group",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_low_engagement_group",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "low_engagement_group",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
