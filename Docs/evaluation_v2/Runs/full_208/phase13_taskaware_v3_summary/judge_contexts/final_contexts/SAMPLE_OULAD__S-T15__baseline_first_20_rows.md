# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T15__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T15__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T15",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Family context vs performance",
  "scope": "1 student + cohort context",
  "actionable_question": "How might my family background be reflected in my academic patterns?",
  "target_audience": "student",
  "ai_summary_type": "correlation_evidence",
  "ai_prompt_hint": "Compare the selected student against the class family-context scatter. Highlight the student's position and any cohort-level association between family_stability_score and avg_score. Frame findings as associative, not causal, and avoid prescriptive suggestions.",
  "query_labels": [
    "family_context_scatter"
  ],
  "explanation_strategy": "correlation"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "assessment_result",
    "assessment [UCI only]"
  ],
  "key_db_fields": [
    "family_stability_score [FE single]",
    "avg_score [FE cross]",
    "family_relation",
    "parent_cohabitation_status",
    "mother/father_education_level"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "point_role",
      "family_stability_score",
      "avg_score"
    ],
    "optional_columns": [
      "is_current_student",
      "family_relation",
      "parent_cohabitation_status",
      "mother_education_level",
      "father_education_level"
    ]
  },
  "query_labels": [
    "family_context_scatter"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T15-CORE-01",
      "description": "Compare the selected student against the class family-context scatter."
    },
    {
      "requirement_id": "S-T15-CORE-02",
      "description": "Highlight the student's position and any cohort-level association between family_stability_score and avg_score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T15-CONSTRAINT-01",
      "description": "Frame findings as associative, not causal, and avoid prescriptive suggestions."
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
      "dataset_label": "family_context_scatter",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T15.json",
      "artifact_sha256": "50fef2d5cddfa07660943722f6741a53c2428ecc4a9d717729ddbfa97c293edb",
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
  "evidence_artifact_file_sha256": "50fef2d5cddfa07660943722f6741a53c2428ecc4a9d717729ddbfa97c293edb",
  "evidence_rows_sha256": "ec2b7a3bd4ef88557b24c208fa22fe641b5e5e14c6786785b4fe73564fc77611",
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
  "embedded_datasets_sha256": "ec2b7a3bd4ef88557b24c208fa22fe641b5e5e14c6786785b4fe73564fc77611",
  "datasets": {
    "family_context_scatter": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T15__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "af8ba210e90e9f9d5f9c62ebfb1622018665387a291da7bf42d984fa3dcbd4a4",
  "generator_input_sha256": "07ca84b945803b2c71a1423d4463825d23149bc9f34015326b797ce37bfabb3c",
  "generator_input_compact": {
    "task_id": "S-T15",
    "execution_id": "exec_1781847921531_0d9e1adf",
    "task_name": "Family context vs performance",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "How might my family background be reflected in my academic patterns?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "family_context_scatter"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "family_context_scatter"
    ],
    "dataset_row_counts": {
      "family_context_scatter": 0
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
      "require_sensitive_context_policy": true,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: Currently, there is no data available to analyze the relationship between Family Stability Score and Average Score. This means we cannot identify any patterns or correlations at this time. However, understanding how family stability might influence academic performance is important.\n\nEducational implications: Without data, it's challenging to draw conclusions about how family stability impacts academic performance.",
  "structured_payload": {
    "task_id": "S-T15",
    "execution_id": "exec_1781847921531_0d9e1adf",
    "explanation": {
      "summary": "Currently, there is no data available to analyze the relationship between Family Stability Score and Average Score. This means we cannot identify any patterns or correlations at this time. However, understanding how family stability might influence academic performance is important.",
      "insights": [],
      "educational_implications": [
        "Without data, it's challenging to draw conclusions about how family stability impacts academic performance."
      ],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is empty, which limits any analysis or conclusions.",
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
      "latency_ms": 2540,
      "token_usage": {
        "prompt_tokens": 551,
        "completion_tokens": 133,
        "total_tokens": 684
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000162
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T15__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "af8ba210e90e9f9d5f9c62ebfb1622018665387a291da7bf42d984fa3dcbd4a4",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 551,
      "completion_tokens": 133,
      "total_tokens": 684
    },
    "latency_ms": 2542,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T15",
    "execution_id": "exec_1781847921531_0d9e1adf",
    "explanation": {
      "summary": "Currently, there is no data available to analyze the relationship between Family Stability Score and Average Score. This means we cannot identify any patterns or correlations at this time. However, understanding how family stability might influence academic performance is important.",
      "insights": [],
      "educational_implications": [
        "Without data, it's challenging to draw conclusions about how family stability impacts academic performance."
      ],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is empty, which limits any analysis or conclusions.",
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
      "latency_ms": 2540,
      "token_usage": {
        "prompt_tokens": 551,
        "completion_tokens": 133,
        "total_tokens": 684
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000162
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
    "observed": "50fef2d5cddfa07660943722f6741a53c2428ecc4a9d717729ddbfa97c293edb",
    "expected_values": [
      "50fef2d5cddfa07660943722f6741a53c2428ecc4a9d717729ddbfa97c293edb"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "ec2b7a3bd4ef88557b24c208fa22fe641b5e5e14c6786785b4fe73564fc77611",
    "expected": "ec2b7a3bd4ef88557b24c208fa22fe641b5e5e14c6786785b4fe73564fc77611"
  },
  {
    "check_id": "numeric_fields_family_context_scatter",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "family_context_scatter",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_family_context_scatter",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "family_context_scatter",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
