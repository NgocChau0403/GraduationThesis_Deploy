# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G07__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G07__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G07",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Factor correlation analysis",
  "scope": "Many students",
  "actionable_question": "What are the strongest predictors of student success in this dataset?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Rank top 5 features by correlation with avg_score [FE]. Note dataset-specific features.",
  "query_labels": [
    "factor_correlation_matrix"
  ],
  "explanation_strategy": "correlation"
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
    "avg_score [FE cross]",
    "engagement_score [FE cross]",
    "previous_attempt_count",
    "absences",
    "studytime",
    "total_clicks",
    "active_days"
  ],
  "output_schema": {
    "required_columns": [
      "feature_name",
      "correlation_with_avg_score"
    ],
    "optional_columns": [
      "n_samples",
      "abs_correlation_rank"
    ]
  },
  "query_labels": [
    "factor_correlation_matrix"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G07-CORE-01",
      "description": "Rank top 5 features by correlation with avg_score [FE]."
    },
    {
      "requirement_id": "A-G07-CORE-02",
      "description": "Note dataset-specific features."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G07-CONSTRAINT-01",
      "description": "When ranked features include sensitive demographic, lifestyle, or socioeconomic attributes, identify their sensitivity and avoid framing correlation as prescriptive guidance."
    },
    {
      "constraint_id": "A-G07-CONSTRAINT-02",
      "description": "Do not interpret feature correlation as causal importance."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Retained as applicable pending review because ranked factors may include sensitive attributes and may influence intervention policy."
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
      "dataset_label": "factor_correlation_matrix",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G07.json",
      "artifact_sha256": "57c6fb836be8d2078b118854c6331546f26a1fc4dde232e1d192f2fd4dbd52bc",
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
  "evidence_artifact_file_sha256": "57c6fb836be8d2078b118854c6331546f26a1fc4dde232e1d192f2fd4dbd52bc",
  "evidence_rows_sha256": "e6459caf3300f45152174d39abe347e8fe0f2e161fcc38438f4c5d2fc9ff19ff",
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
  "embedded_datasets_sha256": "e6459caf3300f45152174d39abe347e8fe0f2e161fcc38438f4c5d2fc9ff19ff",
  "datasets": {
    "factor_correlation_matrix": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G07__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "699345f7b2ac37dcecd5d8f69fbf2b5479d3ce8eb45d8a67ff718a54a4213a53",
  "generator_input_sha256": "01f36137886fb94064ad270968bd4ffad8988482ae923bbc6264cdeae82cf859",
  "generator_input_compact": {
    "task_id": "A-G07",
    "execution_id": "exec_1781847232523_4ca7395e",
    "task_name": "Factor correlation analysis",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "What are the strongest predictors of student success in this dataset?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "factor_correlation_matrix"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "factor_correlation_matrix"
    ],
    "dataset_row_counts": {
      "factor_correlation_matrix": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "ranking",
      "metric_column": "abs_correlation_rank",
      "entity_column": "feature_name",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": "asc",
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
  "raw_text": "Summary: The analysis of the factor correlation matrix reveals that the dataset is currently empty, indicating that no features or correlation coefficients are available for evaluation. Consequently, no patterns or relationships can be discerned regarding predictors of student success.\n\nEducational implications: Without data, it is impossible to identify factors that may influence student success.\n\nRecommendations: high - Collect and input relevant data into the factor correlation matrix. - Gathering data is essential to identify and analyze the strongest predictors of student success.",
  "structured_payload": {
    "task_id": "A-G07",
    "execution_id": "exec_1781847232523_4ca7395e",
    "explanation": {
      "summary": "The analysis of the factor correlation matrix reveals that the dataset is currently empty, indicating that no features or correlation coefficients are available for evaluation. Consequently, no patterns or relationships can be discerned regarding predictors of student success.",
      "insights": [],
      "educational_implications": [
        "Without data, it is impossible to identify factors that may influence student success."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Collect and input relevant data into the factor correlation matrix.",
          "rationale": "Gathering data is essential to identify and analyze the strongest predictors of student success."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is confirmed to be empty, leading to a definitive conclusion regarding the lack of available data.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
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
        "dataset_name": "factor_correlation_matrix",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 12,
    "task_aware_prompt_tokens": 210,
    "token_ratio": 17.5,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (17.5 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3210,
      "token_usage": {
        "prompt_tokens": 701,
        "completion_tokens": 189,
        "total_tokens": 890
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000219
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G07__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "699345f7b2ac37dcecd5d8f69fbf2b5479d3ce8eb45d8a67ff718a54a4213a53",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 701,
      "completion_tokens": 189,
      "total_tokens": 890
    },
    "latency_ms": 3238,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G07",
    "execution_id": "exec_1781847232523_4ca7395e",
    "explanation": {
      "summary": "The analysis of the factor correlation matrix reveals that the dataset is currently empty, indicating that no features or correlation coefficients are available for evaluation. Consequently, no patterns or relationships can be discerned regarding predictors of student success.",
      "insights": [],
      "educational_implications": [
        "Without data, it is impossible to identify factors that may influence student success."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Collect and input relevant data into the factor correlation matrix.",
          "rationale": "Gathering data is essential to identify and analyze the strongest predictors of student success."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is confirmed to be empty, leading to a definitive conclusion regarding the lack of available data.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
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
        "dataset_name": "factor_correlation_matrix",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 12,
    "task_aware_prompt_tokens": 210,
    "token_ratio": 17.5,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (17.5 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3210,
      "token_usage": {
        "prompt_tokens": 701,
        "completion_tokens": 189,
        "total_tokens": 890
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000219
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
    "observed": "57c6fb836be8d2078b118854c6331546f26a1fc4dde232e1d192f2fd4dbd52bc",
    "expected_values": [
      "57c6fb836be8d2078b118854c6331546f26a1fc4dde232e1d192f2fd4dbd52bc"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "e6459caf3300f45152174d39abe347e8fe0f2e161fcc38438f4c5d2fc9ff19ff",
    "expected": "e6459caf3300f45152174d39abe347e8fe0f2e161fcc38438f4c5d2fc9ff19ff"
  },
  {
    "check_id": "numeric_fields_factor_correlation_matrix",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "factor_correlation_matrix",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_factor_correlation_matrix",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "factor_correlation_matrix",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
