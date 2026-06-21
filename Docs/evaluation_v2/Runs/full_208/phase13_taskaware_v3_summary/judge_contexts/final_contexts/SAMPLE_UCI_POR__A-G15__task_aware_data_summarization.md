# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G15__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G15__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G15",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Intervention priority ranking",
  "scope": "Many students",
  "actionable_question": "Who are the top 10 students most in need of intervention right now?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Rank by at_risk_score [FE] descending. List triggered flags per student. Provide action per priority group.",
  "query_labels": [
    "intervention_priority_list"
  ],
  "explanation_strategy": "ranking"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "assessment_result",
    "assessment",
    "engagement",
    "student"
  ],
  "key_db_fields": [
    "student_id",
    "gender",
    "age_group",
    "region; at_risk_score [FE cross]",
    "at_risk_label [FE cross]",
    "avg_score [FE cross]",
    "all 5 flags",
    "final_outcome"
  ],
  "output_schema": {},
  "query_labels": [
    "intervention_priority_list"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G15-CORE-01",
      "description": "Rank by at_risk_score [FE] descending."
    },
    {
      "requirement_id": "A-G15-CORE-02",
      "description": "List triggered flags per student."
    },
    {
      "requirement_id": "A-G15-CORE-03",
      "description": "Provide action per priority group."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G15-CONSTRAINT-01",
      "description": "Treat the output as internal admin use only."
    },
    {
      "constraint_id": "A-G15-CONSTRAINT-02",
      "description": "Do not include personally identifying information beyond identifiers already present in returned data."
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
      "dataset_label": "intervention_priority_list",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G15.json",
      "artifact_sha256": "c56af860460e9e47da7f7a28d754718d067c231a4ec88124a3e298d89f9caee7",
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
  "evidence_artifact_file_sha256": "c56af860460e9e47da7f7a28d754718d067c231a4ec88124a3e298d89f9caee7",
  "evidence_rows_sha256": "43ee924101d2ee1c1daa546126818e00f01b85592fbc548768a8766323c24b8e",
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
  "embedded_datasets_sha256": "43ee924101d2ee1c1daa546126818e00f01b85592fbc548768a8766323c24b8e",
  "datasets": {
    "intervention_priority_list": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G15__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "a401a8c41942b149396014027f28a800055b0d174c99efbed38008cae4f97067",
  "generator_input_sha256": "c86a340cebd8b6c57c931e2aad7304df39f339f5f7495b3a1f3a46db42ff134d",
  "generator_input_compact": {
    "task_id": "A-G15",
    "execution_id": "exec_1781847232839_85d4fee6",
    "task_name": "Intervention priority ranking",
    "analysis_type": "ranking",
    "explanation_strategy": "ranking",
    "actionable_question": "Who are the top 10 students most in need of intervention right now?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "intervention_priority_list"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "intervention_priority_list"
    ],
    "dataset_row_counts": {
      "intervention_priority_list": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "ranking",
      "metric_column": "at_risk_score",
      "entity_column": "student_id",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": "desc",
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
  "raw_text": "Summary: The intervention priority list is currently empty, indicating that there are no students identified as at risk based on the available data. This lack of data limits the ability to prioritize interventions effectively.\n\nEducational implications: Without a populated dataset, it is impossible to identify students in need of immediate intervention.\n\nRecommendations: high - Collect and analyze additional student performance data. - Gathering more data is essential to identify at-risk students and implement timely interventions.",
  "structured_payload": {
    "task_id": "A-G15",
    "execution_id": "exec_1781847232839_85d4fee6",
    "explanation": {
      "summary": "The intervention priority list is currently empty, indicating that there are no students identified as at risk based on the available data. This lack of data limits the ability to prioritize interventions effectively.",
      "insights": [],
      "educational_implications": [
        "Without a populated dataset, it is impossible to identify students in need of immediate intervention."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Collect and analyze additional student performance data.",
          "rationale": "Gathering more data is essential to identify at-risk students and implement timely interventions."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is confirmed to be empty, leading to a clear understanding of the current situation.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "ranking",
    "explanation_type": "ranking",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "ranking",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "intervention_priority_list",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 12,
    "task_aware_prompt_tokens": 209,
    "token_ratio": 17.4167,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (17.4167 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3032,
      "token_usage": {
        "prompt_tokens": 690,
        "completion_tokens": 179,
        "total_tokens": 869
      },
      "strategy": "ranking",
      "granularity": "semester",
      "cost_usd": 0.000211
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G15__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "a401a8c41942b149396014027f28a800055b0d174c99efbed38008cae4f97067",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 690,
      "completion_tokens": 179,
      "total_tokens": 869
    },
    "latency_ms": 3041,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G15",
    "execution_id": "exec_1781847232839_85d4fee6",
    "explanation": {
      "summary": "The intervention priority list is currently empty, indicating that there are no students identified as at risk based on the available data. This lack of data limits the ability to prioritize interventions effectively.",
      "insights": [],
      "educational_implications": [
        "Without a populated dataset, it is impossible to identify students in need of immediate intervention."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Collect and analyze additional student performance data.",
          "rationale": "Gathering more data is essential to identify at-risk students and implement timely interventions."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is confirmed to be empty, leading to a clear understanding of the current situation.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "ranking",
    "explanation_type": "ranking",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "ranking",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "intervention_priority_list",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 12,
    "task_aware_prompt_tokens": 209,
    "token_ratio": 17.4167,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (17.4167 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3032,
      "token_usage": {
        "prompt_tokens": 690,
        "completion_tokens": 179,
        "total_tokens": 869
      },
      "strategy": "ranking",
      "granularity": "semester",
      "cost_usd": 0.000211
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
    "observed": "c56af860460e9e47da7f7a28d754718d067c231a4ec88124a3e298d89f9caee7",
    "expected_values": [
      "c56af860460e9e47da7f7a28d754718d067c231a4ec88124a3e298d89f9caee7"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "43ee924101d2ee1c1daa546126818e00f01b85592fbc548768a8766323c24b8e",
    "expected": "43ee924101d2ee1c1daa546126818e00f01b85592fbc548768a8766323c24b8e"
  },
  {
    "check_id": "numeric_fields_intervention_priority_list",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "intervention_priority_list",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_intervention_priority_list",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "intervention_priority_list",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
