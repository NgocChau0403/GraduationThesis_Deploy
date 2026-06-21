# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S07__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-S07__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-S07",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Student background context",
  "scope": "1 student",
  "actionable_question": "What background factors should admin consider when deciding how to support this student?",
  "target_audience": "academic_advisor, admin",
  "ai_summary_type": "metric_snapshot",
  "ai_prompt_hint": "Frame background factors as context, not judgement. Note which disadvantage dimensions are present and what support is already in place.",
  "query_labels": [
    "background_context"
  ],
  "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "enrollment"
  ],
  "key_db_fields": [
    "highest_education",
    "socioeconomic_band",
    "disadvantage_score [FE single]",
    "support_score [FE single]",
    "family_stability_score [FE single]",
    "disability_flag",
    "internet_access_flag",
    "previous_attempt_count"
  ],
  "output_schema": {
    "required_columns": [
      "school",
      "family_size",
      "gender",
      "age_years",
      "school_support_flag",
      "family_support_flag",
      "has_paid_class",
      "internet_access_flag",
      "support_score",
      "lifestyle_risk_score",
      "social_balance_score",
      "family_stability_score"
    ],
    "optional_columns": [
      "highest_education",
      "mother_education_level",
      "father_education_level",
      "age_group",
      "previous_attempt_count",
      "studytime",
      "absences"
    ]
  },
  "query_labels": [
    "background_context"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-S07-CORE-01",
      "description": "Note which disadvantage dimensions are present and what support is already in place."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-S07-CONSTRAINT-01",
      "description": "Frame background factors as context, not judgement."
    },
    {
      "constraint_id": "A-S07-CONSTRAINT-02",
      "description": "Treat the output as professional advisor/admin context; do not expose raw disadvantage scores in student-facing wording."
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
      "dataset_label": "background_context",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-S07.json",
      "artifact_sha256": "da0436045f2110679bd2644ecc4d42c4ade75741c9f9e4d147b5aa909bf4e8d6",
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
  "evidence_artifact_file_sha256": "da0436045f2110679bd2644ecc4d42c4ade75741c9f9e4d147b5aa909bf4e8d6",
  "evidence_rows_sha256": "47b8f4753bbdbce17e4be10210588a5646aadd115271bae619c7f53366838d73",
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
  "embedded_datasets_sha256": "47b8f4753bbdbce17e4be10210588a5646aadd115271bae619c7f53366838d73",
  "datasets": {
    "background_context": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S07__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "ab1bc993ee13f29074d01046cfcaef82b7fda931fb8e81d25c3dcc8944da37f5",
  "generator_input_sha256": "96e2bfb04fe5c26e711869ebf64c4ba0aac77d17b4ec1ad017967b517a84f451",
  "generator_input_compact": {
    "task_id": "A-S07",
    "execution_id": "exec_1781847835721_81a6bb2d",
    "task_name": "Student background context",
    "analysis_type": "aggregation",
    "explanation_strategy": "distribution",
    "actionable_question": "What background factors should admin consider when deciding how to support this student?",
    "target_audience": [
      "academic_advisor",
      "admin"
    ],
    "query_labels": [
      "background_context"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "background_context"
    ],
    "dataset_row_counts": {
      "background_context": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "metric_snapshot",
      "metric_column": null,
      "entity_column": null,
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": null,
      "top_k": null,
      "bottom_k": null,
      "threshold_direction": null,
      "numeric_threshold": null,
      "require_sensitive_context_policy": true,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: The dataset 'background_context' contains no rows, indicating a lack of available data to analyze student background factors. Consequently, no insights can be derived regarding the distribution of student characteristics or their potential needs for support.\n\nEducational implications: The absence of data limits the ability to identify student needs and tailor support effectively.\n\nRecommendations: high - Collect comprehensive background data from students. - Gathering this information is essential to understand the diverse needs of students and to implement appropriate support measures.\n\nWarnings: Primary dataset is empty, leading to insufficient evidence for analysis.",
  "structured_payload": {
    "task_id": "A-S07",
    "execution_id": "exec_1781847835721_81a6bb2d",
    "explanation": {
      "summary": "The dataset 'background_context' contains no rows, indicating a lack of available data to analyze student background factors. Consequently, no insights can be derived regarding the distribution of student characteristics or their potential needs for support.",
      "insights": [],
      "educational_implications": [
        "The absence of data limits the ability to identify student needs and tailor support effectively."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Collect comprehensive background data from students.",
          "rationale": "Gathering this information is essential to understand the diverse needs of students and to implement appropriate support measures."
        }
      ],
      "warnings": [
        "Primary dataset is empty, leading to insufficient evidence for analysis."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is confirmed to have no entries, ensuring clarity in the analysis of data availability.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "metric_snapshot",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "background_context",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 10,
    "task_aware_prompt_tokens": 556,
    "token_ratio": 55.6,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (55.6 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 2892,
      "token_usage": {
        "prompt_tokens": 987,
        "completion_tokens": 203,
        "total_tokens": 1190
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.00027
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S07__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "ab1bc993ee13f29074d01046cfcaef82b7fda931fb8e81d25c3dcc8944da37f5",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 987,
      "completion_tokens": 203,
      "total_tokens": 1190
    },
    "latency_ms": 2897,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S07",
    "execution_id": "exec_1781847835721_81a6bb2d",
    "explanation": {
      "summary": "The dataset 'background_context' contains no rows, indicating a lack of available data to analyze student background factors. Consequently, no insights can be derived regarding the distribution of student characteristics or their potential needs for support.",
      "insights": [],
      "educational_implications": [
        "The absence of data limits the ability to identify student needs and tailor support effectively."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Collect comprehensive background data from students.",
          "rationale": "Gathering this information is essential to understand the diverse needs of students and to implement appropriate support measures."
        }
      ],
      "warnings": [
        "Primary dataset is empty, leading to insufficient evidence for analysis."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is confirmed to have no entries, ensuring clarity in the analysis of data availability.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "metric_snapshot",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "background_context",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 10,
    "task_aware_prompt_tokens": 556,
    "token_ratio": 55.6,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (55.6 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 2892,
      "token_usage": {
        "prompt_tokens": 987,
        "completion_tokens": 203,
        "total_tokens": 1190
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.00027
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
    "observed": "da0436045f2110679bd2644ecc4d42c4ade75741c9f9e4d147b5aa909bf4e8d6",
    "expected_values": [
      "da0436045f2110679bd2644ecc4d42c4ade75741c9f9e4d147b5aa909bf4e8d6"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "47b8f4753bbdbce17e4be10210588a5646aadd115271bae619c7f53366838d73",
    "expected": "47b8f4753bbdbce17e4be10210588a5646aadd115271bae619c7f53366838d73"
  },
  {
    "check_id": "numeric_fields_background_context",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "background_context",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_background_context",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "background_context",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
