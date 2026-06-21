# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T09__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T09__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T09",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Lifestyle risk vs performance",
  "scope": "1 student + cohort context",
  "actionable_question": "Could my lifestyle habits be affecting my academic results?",
  "target_audience": "student",
  "ai_summary_type": "correlation_evidence",
  "ai_prompt_hint": "Compare the selected student against the class lifestyle-risk scatter. Highlight the student's position and any cohort-level association between lifestyle_risk_score and avg_score. Frame as correlation, not causation.",
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
    "family_relation",
    "free_time",
    "lifestyle_risk_score [FE single]"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "point_role",
      "lifestyle_risk_score",
      "avg_score"
    ],
    "optional_columns": [
      "is_current_student",
      "alcohol_weekday",
      "alcohol_weekend",
      "go_out_freq",
      "health_status",
      "family_relation",
      "free_time"
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
      "requirement_id": "S-T09-CORE-01",
      "description": "Compare the selected student against the class lifestyle-risk scatter."
    },
    {
      "requirement_id": "S-T09-CORE-02",
      "description": "Highlight the student's position and any cohort-level association between lifestyle_risk_score and avg_score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T09-CONSTRAINT-01",
      "description": "Frame as correlation, not causation."
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
      "dataset_label": "lifestyle_risk_scatter",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T09.json",
      "artifact_sha256": "6483eb7bf31afd8994aef09776824ecffd94c8f59af5356790d51be77a2c4956",
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
  "evidence_artifact_file_sha256": "6483eb7bf31afd8994aef09776824ecffd94c8f59af5356790d51be77a2c4956",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T09__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "9507cbd626c01375fa2cfa32e7779237bfbafd2ef8da335288f0b86d2794bfda",
  "generator_input_sha256": "a0eb86ef0edcc892d57dfa8d67df44c525d937fe2908065b02a1d8300a1fcecb",
  "generator_input_compact": {
    "task_id": "S-T09",
    "execution_id": "exec_1781847912446_0a93b76c",
    "task_name": "Lifestyle risk vs performance",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "Could my lifestyle habits be affecting my academic results?",
    "target_audience": [
      "student"
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
  "raw_text": "Summary: Currently, there is no data available to analyze the relationship between Lifestyle Risk Score and Average Score. Without this information, we cannot determine any correlation patterns or insights. However, it's important to consider how lifestyle habits might influence academic performance.\n\nEducational implications: Understanding the impact of lifestyle choices on academic performance can help you make informed decisions.\n\nRecommendations: high - Consider tracking your lifestyle habits and academic performance over time. - This will help you identify any potential patterns and make adjustments to improve your results.",
  "structured_payload": {
    "task_id": "S-T09",
    "execution_id": "exec_1781847912446_0a93b76c",
    "explanation": {
      "summary": "Currently, there is no data available to analyze the relationship between Lifestyle Risk Score and Average Score. Without this information, we cannot determine any correlation patterns or insights. However, it's important to consider how lifestyle habits might influence academic performance.",
      "insights": [],
      "educational_implications": [
        "Understanding the impact of lifestyle choices on academic performance can help you make informed decisions."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Consider tracking your lifestyle habits and academic performance over time.",
          "rationale": "This will help you identify any potential patterns and make adjustments to improve your results."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "There is no data available for analysis.",
      "based_on": [
        "sparse_data",
        "single_student"
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
      "latency_ms": 2999,
      "token_usage": {
        "prompt_tokens": 544,
        "completion_tokens": 181,
        "total_tokens": 725
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.00019
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T09__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "9507cbd626c01375fa2cfa32e7779237bfbafd2ef8da335288f0b86d2794bfda",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 544,
      "completion_tokens": 181,
      "total_tokens": 725
    },
    "latency_ms": 3002,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T09",
    "execution_id": "exec_1781847912446_0a93b76c",
    "explanation": {
      "summary": "Currently, there is no data available to analyze the relationship between Lifestyle Risk Score and Average Score. Without this information, we cannot determine any correlation patterns or insights. However, it's important to consider how lifestyle habits might influence academic performance.",
      "insights": [],
      "educational_implications": [
        "Understanding the impact of lifestyle choices on academic performance can help you make informed decisions."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Consider tracking your lifestyle habits and academic performance over time.",
          "rationale": "This will help you identify any potential patterns and make adjustments to improve your results."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "There is no data available for analysis.",
      "based_on": [
        "sparse_data",
        "single_student"
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
      "latency_ms": 2999,
      "token_usage": {
        "prompt_tokens": 544,
        "completion_tokens": 181,
        "total_tokens": 725
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.00019
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
    "observed": "6483eb7bf31afd8994aef09776824ecffd94c8f59af5356790d51be77a2c4956",
    "expected_values": [
      "6483eb7bf31afd8994aef09776824ecffd94c8f59af5356790d51be77a2c4956"
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
