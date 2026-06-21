# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G13__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G13__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G13",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Lifestyle risk across cohort",
  "scope": "Many students",
  "actionable_question": "Which lifestyle patterns are most common among low-performing students?",
  "target_audience": "academic_advisor",
  "ai_summary_type": "correlation_evidence",
  "ai_prompt_hint": "Rank students by lifestyle_risk_score. Correlate with avg_score. Frame as correlational, not prescriptive.",
  "query_labels": [
    "lifestyle_risk_scatter"
  ],
  "explanation_strategy": "correlation"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "enrollment",
    "assessment_result",
    "assessment [UCI only]"
  ],
  "key_db_fields": [
    "alcohol_weekday",
    "alcohol_weekend",
    "go_out_freq",
    "health_status",
    "lifestyle_risk_score [FE single]; avg_score [FE cross]"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "lifestyle_risk_score",
      "avg_score"
    ],
    "optional_columns": [
      "alcohol_weekday",
      "alcohol_weekend",
      "go_out_freq",
      "health_status"
    ]
  },
  "query_labels": [
    "lifestyle_risk_scatter"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G13-CORE-01",
      "description": "Rank students by lifestyle_risk_score."
    },
    {
      "requirement_id": "A-G13-CORE-02",
      "description": "Correlate with avg_score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G13-CONSTRAINT-01",
      "description": "Frame lifestyle-risk ranking as descriptive and correlational, not causal or deterministic."
    },
    {
      "constraint_id": "A-G13-CONSTRAINT-02",
      "description": "When listing students by lifestyle-risk rank, avoid language that implies individual blame."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Applicable because the task ranks identifiable students using lifestyle context."
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
      "dataset_label": "lifestyle_risk_scatter",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G13.json",
      "artifact_sha256": "e0ee8da1d6bfd365d397d9a9c42e053675469fc232419c46182f9ac001d08d66",
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
  "evidence_artifact_file_sha256": "e0ee8da1d6bfd365d397d9a9c42e053675469fc232419c46182f9ac001d08d66",
  "evidence_rows_sha256": "1c7137ac7e815e9db09acff3f91f3c264e3356d3f32d1b476348c2ed9d2fa2e9",
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
  "embedded_datasets_sha256": "1c7137ac7e815e9db09acff3f91f3c264e3356d3f32d1b476348c2ed9d2fa2e9",
  "datasets": {
    "lifestyle_risk_scatter": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G13__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "3ae55150423e26e1fa8e1753f566ca02986adfd41bc0e402f15ef0b3b2e539e1",
  "generator_input_sha256": "aee3c97168ebc25fc5bca9909d1fbad2199b8f6bc221b6d344d2bc4cffd67ee4",
  "generator_input_compact": {
    "task_id": "A-G13",
    "execution_id": "exec_1781847774924_7f1afcf2",
    "task_name": "Lifestyle risk across cohort",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "Which lifestyle patterns are most common among low-performing students?",
    "target_audience": [
      "academic_advisor"
    ],
    "query_labels": [
      "lifestyle_risk_scatter"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "lifestyle_risk_scatter"
    ],
    "dataset_row_counts": {
      "lifestyle_risk_scatter": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "correlation_evidence",
      "metric_column": null,
      "entity_column": "student_id",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": null,
      "top_k": 10,
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
  "raw_text": "Summary: The analysis of the relationship between Lifestyle Risk Score and Average Score is currently inconclusive due to the absence of data in the dataset. Without any rows to analyze, no correlation patterns can be established.\n\nEducational implications: The lack of data limits the ability to understand how lifestyle risks may impact student performance.\n\nWarnings: Primary dataset is empty, preventing any correlation analysis.",
  "structured_payload": {
    "task_id": "A-G13",
    "execution_id": "exec_1781847774924_7f1afcf2",
    "explanation": {
      "summary": "The analysis of the relationship between Lifestyle Risk Score and Average Score is currently inconclusive due to the absence of data in the dataset. Without any rows to analyze, no correlation patterns can be established.",
      "insights": [],
      "educational_implications": [
        "The lack of data limits the ability to understand how lifestyle risks may impact student performance."
      ],
      "recommendations": [],
      "warnings": [
        "Primary dataset is empty, preventing any correlation analysis."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset contains no rows, leading to a definitive conclusion that no correlation can be assessed.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "correlation_evidence",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "lifestyle_risk_scatter",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 11,
    "task_aware_prompt_tokens": 320,
    "token_ratio": 29.0909,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (29.0909 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 2373,
      "token_usage": {
        "prompt_tokens": 808,
        "completion_tokens": 148,
        "total_tokens": 956
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.00021
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G13__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "3ae55150423e26e1fa8e1753f566ca02986adfd41bc0e402f15ef0b3b2e539e1",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 808,
      "completion_tokens": 148,
      "total_tokens": 956
    },
    "latency_ms": 2376,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G13",
    "execution_id": "exec_1781847774924_7f1afcf2",
    "explanation": {
      "summary": "The analysis of the relationship between Lifestyle Risk Score and Average Score is currently inconclusive due to the absence of data in the dataset. Without any rows to analyze, no correlation patterns can be established.",
      "insights": [],
      "educational_implications": [
        "The lack of data limits the ability to understand how lifestyle risks may impact student performance."
      ],
      "recommendations": [],
      "warnings": [
        "Primary dataset is empty, preventing any correlation analysis."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset contains no rows, leading to a definitive conclusion that no correlation can be assessed.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "correlation_evidence",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "lifestyle_risk_scatter",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 11,
    "task_aware_prompt_tokens": 320,
    "token_ratio": 29.0909,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (29.0909 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 2373,
      "token_usage": {
        "prompt_tokens": 808,
        "completion_tokens": 148,
        "total_tokens": 956
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.00021
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
    "observed": "e0ee8da1d6bfd365d397d9a9c42e053675469fc232419c46182f9ac001d08d66",
    "expected_values": [
      "e0ee8da1d6bfd365d397d9a9c42e053675469fc232419c46182f9ac001d08d66"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "1c7137ac7e815e9db09acff3f91f3c264e3356d3f32d1b476348c2ed9d2fa2e9",
    "expected": "1c7137ac7e815e9db09acff3f91f3c264e3356d3f32d1b476348c2ed9d2fa2e9"
  },
  {
    "check_id": "numeric_fields_lifestyle_risk_scatter",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "lifestyle_risk_scatter",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_lifestyle_risk_scatter",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "lifestyle_risk_scatter",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
