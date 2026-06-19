# LLM Judge V2 Final Judge Context - SAMPLE_UCI_POR__A-G01__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G01__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G01",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G01__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "2349fa81cdb536c3162e8ce157552489e56456eba51810c23d91b6aa834cf565",
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
  "raw_text": "Summary: The analysis indicates that there are currently no students classified within the low engagement group, suggesting that all students are meeting the engagement threshold. However, the absence of data may imply a lack of monitoring or reporting on student engagement levels.\n\nEducational implications: Continuous monitoring of student engagement is essential to identify at-risk students early.\n\nRecommendations: high - Implement regular engagement assessments - To ensure that any potential disengagement is identified promptly, allowing for timely intervention.",
  "structured_payload": {
    "task_id": "A-G01",
    "execution_id": "exec_1781847232095_a0ebb62f",
    "explanation": {
      "summary": "The analysis indicates that there are currently no students classified within the low engagement group, suggesting that all students are meeting the engagement threshold. However, the absence of data may imply a lack of monitoring or reporting on student engagement levels.",
      "insights": [],
      "educational_implications": [
        "Continuous monitoring of student engagement is essential to identify at-risk students early."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement regular engagement assessments",
          "rationale": "To ensure that any potential disengagement is identified promptly, allowing for timely intervention."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is empty, indicating no recorded low engagement instances, but this may also reflect a lack of data collection.",
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
      "latency_ms": 2809,
      "token_usage": {
        "prompt_tokens": 498,
        "completion_tokens": 187,
        "total_tokens": 685
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000187
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G01__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "2349fa81cdb536c3162e8ce157552489e56456eba51810c23d91b6aa834cf565",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 498,
      "completion_tokens": 187,
      "total_tokens": 685
    },
    "latency_ms": 2821,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G01",
    "execution_id": "exec_1781847232095_a0ebb62f",
    "explanation": {
      "summary": "The analysis indicates that there are currently no students classified within the low engagement group, suggesting that all students are meeting the engagement threshold. However, the absence of data may imply a lack of monitoring or reporting on student engagement levels.",
      "insights": [],
      "educational_implications": [
        "Continuous monitoring of student engagement is essential to identify at-risk students early."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement regular engagement assessments",
          "rationale": "To ensure that any potential disengagement is identified promptly, allowing for timely intervention."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is empty, indicating no recorded low engagement instances, but this may also reflect a lack of data collection.",
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
      "latency_ms": 2809,
      "token_usage": {
        "prompt_tokens": 498,
        "completion_tokens": 187,
        "total_tokens": 685
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000187
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
