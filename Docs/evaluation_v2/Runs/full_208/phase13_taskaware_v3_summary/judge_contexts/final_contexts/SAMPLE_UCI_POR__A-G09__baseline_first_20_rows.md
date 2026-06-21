# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G09__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G09__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G09",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Socioeconomic disadvantage impact",
  "scope": "Many students",
  "actionable_question": "Are disadvantaged students receiving adequate support?",
  "target_audience": "academic_advisor, admin",
  "ai_summary_type": "correlation_evidence",
  "ai_prompt_hint": "Describe trend. Highlight which imd_band groups have most at-risk students. Recommend equity-aware support.",
  "query_labels": [
    "disadvantage_impact"
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
    "assessment [OULAD only]"
  ],
  "key_db_fields": [
    "imd_score_numeric",
    "disability_flag",
    "highest_education",
    "disadvantage_score [FE single]; avg_score [FE cross]",
    "final_outcome"
  ],
  "output_schema": {},
  "query_labels": [
    "disadvantage_impact"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G09-CORE-01",
      "description": "Describe trend."
    },
    {
      "requirement_id": "A-G09-CORE-02",
      "description": "Highlight which imd_band groups have most at-risk students."
    },
    {
      "requirement_id": "A-G09-CORE-03",
      "description": "Recommend equity-aware support."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G09-CONSTRAINT-01",
      "description": "Describe group-level patterns only; do not name individual students in equity analysis."
    },
    {
      "constraint_id": "A-G09-CONSTRAINT-02",
      "description": "Frame socioeconomic factors as context and association, not individual blame or deterministic cause."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Applicable because the task analyses socioeconomic disadvantage and recommends equity-aware support."
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
      "dataset_label": "disadvantage_impact",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G09.json",
      "artifact_sha256": "445982af9f84730af9a456522b5e80733c6d2c4e54f7d32482c593604b370843",
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
  "evidence_artifact_file_sha256": "445982af9f84730af9a456522b5e80733c6d2c4e54f7d32482c593604b370843",
  "evidence_rows_sha256": "405a60891a789172f5c4d4787aae66326f3f83a00e5df2379ddbcf50ffee08c6",
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
  "embedded_datasets_sha256": "405a60891a789172f5c4d4787aae66326f3f83a00e5df2379ddbcf50ffee08c6",
  "datasets": {
    "disadvantage_impact": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G09__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "fa75b66860f656c4632f3c1823c7ac8a47460bca6256d5c682cb2a10dc1f620f",
  "generator_input_sha256": "687589103b704772e4b1a3de7509ffb0b957387e0a9ec1dc5037d3526eb11e7d",
  "generator_input_compact": {
    "task_id": "A-G09",
    "execution_id": "exec_1781847232641_b19ca6ff",
    "task_name": "Socioeconomic disadvantage impact",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "Are disadvantaged students receiving adequate support?",
    "target_audience": [
      "academic_advisor",
      "admin"
    ],
    "query_labels": [
      "disadvantage_impact"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "disadvantage_impact"
    ],
    "dataset_row_counts": {
      "disadvantage_impact": 0
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
  "raw_text": "Summary: The analysis of the relationship between Disadvantage Score and Average Score cannot be conducted due to the absence of data in the dataset. Without any data points, no correlation patterns can be identified.\n\nEducational implications: The lack of data prevents any conclusions about the impact of socioeconomic disadvantage on student learning outcomes.\n\nWarnings: No data available for analysis; further data collection is necessary to assess the relationship between Disadvantage Score and Average Score.",
  "structured_payload": {
    "task_id": "A-G09",
    "execution_id": "exec_1781847232641_b19ca6ff",
    "explanation": {
      "summary": "The analysis of the relationship between Disadvantage Score and Average Score cannot be conducted due to the absence of data in the dataset. Without any data points, no correlation patterns can be identified.",
      "insights": [],
      "educational_implications": [
        "The lack of data prevents any conclusions about the impact of socioeconomic disadvantage on student learning outcomes."
      ],
      "recommendations": [],
      "warnings": [
        "No data available for analysis; further data collection is necessary to assess the relationship between Disadvantage Score and Average Score."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is empty, leading to a definitive conclusion that no analysis can be performed.",
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
      "latency_ms": 3900,
      "token_usage": {
        "prompt_tokens": 517,
        "completion_tokens": 157,
        "total_tokens": 674
      },
      "strategy": "correlation",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000172
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G09__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "fa75b66860f656c4632f3c1823c7ac8a47460bca6256d5c682cb2a10dc1f620f",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 517,
      "completion_tokens": 157,
      "total_tokens": 674
    },
    "latency_ms": 3903,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G09",
    "execution_id": "exec_1781847232641_b19ca6ff",
    "explanation": {
      "summary": "The analysis of the relationship between Disadvantage Score and Average Score cannot be conducted due to the absence of data in the dataset. Without any data points, no correlation patterns can be identified.",
      "insights": [],
      "educational_implications": [
        "The lack of data prevents any conclusions about the impact of socioeconomic disadvantage on student learning outcomes."
      ],
      "recommendations": [],
      "warnings": [
        "No data available for analysis; further data collection is necessary to assess the relationship between Disadvantage Score and Average Score."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is empty, leading to a definitive conclusion that no analysis can be performed.",
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
      "latency_ms": 3900,
      "token_usage": {
        "prompt_tokens": 517,
        "completion_tokens": 157,
        "total_tokens": 674
      },
      "strategy": "correlation",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000172
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
    "observed": "445982af9f84730af9a456522b5e80733c6d2c4e54f7d32482c593604b370843",
    "expected_values": [
      "445982af9f84730af9a456522b5e80733c6d2c4e54f7d32482c593604b370843"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "405a60891a789172f5c4d4787aae66326f3f83a00e5df2379ddbcf50ffee08c6",
    "expected": "405a60891a789172f5c4d4787aae66326f3f83a00e5df2379ddbcf50ffee08c6"
  },
  {
    "check_id": "numeric_fields_disadvantage_impact",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "disadvantage_impact",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_disadvantage_impact",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "disadvantage_impact",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
