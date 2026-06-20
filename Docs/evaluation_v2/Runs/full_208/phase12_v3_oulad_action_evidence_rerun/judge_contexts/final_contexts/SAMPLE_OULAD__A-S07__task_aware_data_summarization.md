# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S07__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-S07__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-S07",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S07__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "0d915a1210dd565fd7fa38e774da1da488ae017d997271a0532518d8a1fe8710",
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
  "raw_text": "Summary: The dataset on student background context is currently empty, indicating no available data for analysis. Consequently, no distribution, central tendency, or outlier observations can be made.\n\nEducational implications: Without data on student backgrounds, it is challenging to identify specific support needs or areas for improvement.\n\nRecommendations: high - Collect comprehensive background data from students. - Gathering this information is essential to understand the diverse needs of the student population and to tailor support effectively.",
  "structured_payload": {
    "task_id": "A-S07",
    "execution_id": "exec_1781847835721_81a6bb2d",
    "explanation": {
      "summary": "The dataset on student background context is currently empty, indicating no available data for analysis. Consequently, no distribution, central tendency, or outlier observations can be made.",
      "insights": [],
      "educational_implications": [
        "Without data on student backgrounds, it is challenging to identify specific support needs or areas for improvement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Collect comprehensive background data from students.",
          "rationale": "Gathering this information is essential to understand the diverse needs of the student population and to tailor support effectively."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The absence of data prevents any analysis, leading to a high confidence in the conclusion that no insights can be derived.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
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
        "dataset_name": "background_context",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3078,
      "token_usage": {
        "prompt_tokens": 656,
        "completion_tokens": 187,
        "total_tokens": 843
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000211
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S07__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "0d915a1210dd565fd7fa38e774da1da488ae017d997271a0532518d8a1fe8710",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 656,
      "completion_tokens": 187,
      "total_tokens": 843
    },
    "latency_ms": 3095,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S07",
    "execution_id": "exec_1781847835721_81a6bb2d",
    "explanation": {
      "summary": "The dataset on student background context is currently empty, indicating no available data for analysis. Consequently, no distribution, central tendency, or outlier observations can be made.",
      "insights": [],
      "educational_implications": [
        "Without data on student backgrounds, it is challenging to identify specific support needs or areas for improvement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Collect comprehensive background data from students.",
          "rationale": "Gathering this information is essential to understand the diverse needs of the student population and to tailor support effectively."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The absence of data prevents any analysis, leading to a high confidence in the conclusion that no insights can be derived.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
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
        "dataset_name": "background_context",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3078,
      "token_usage": {
        "prompt_tokens": 656,
        "completion_tokens": 187,
        "total_tokens": 843
      },
      "strategy": "distribution",
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
