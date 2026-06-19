# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T11__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T11__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T11",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
}
```

## Task Context

```json
{
  "task_name": "Registration timing vs performance",
  "scope": "1 student",
  "actionable_question": "Did enrolling late put me at a disadvantage?",
  "target_audience": "student",
  "ai_summary_type": "correlation_evidence",
  "ai_prompt_hint": "Explain whether early enrollment correlates with better outcome. Frame as associative, not causal.",
  "query_labels": [
    "registration_data"
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
    "assessment [OULAD only]"
  ],
  "key_db_fields": [
    "enrollment_start_day",
    "registration_lead_time [FE single]",
    "final_outcome"
  ],
  "output_schema": {},
  "query_labels": [
    "registration_data"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T11-CORE-01",
      "description": "Explain whether early enrollment correlates with better outcome."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T11-CONSTRAINT-01",
      "description": "Frame as associative, not causal."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
}
```

## Deterministic Derived-Stat Evidence

```json
[
  {
    "stat_id": "S-T11__pearson_r__1",
    "stat_type": "pearson_r",
    "dataset_label": "registration_data",
    "x_column": "registration_lead_time",
    "y_column": "avg_score",
    "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T11.json",
    "source_artifact_sha256": "c2987ad38e1c1028ef05384a462822c1c29753790ed30b82ed13784f65cdd962",
    "status": "skipped",
    "pearson_r": null,
    "n": 0,
    "strength_label": null,
    "direction": null,
    "skip_reason": "zero_rows"
  }
]
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "registration_data",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T11.json",
      "artifact_sha256": "c2987ad38e1c1028ef05384a462822c1c29753790ed30b82ed13784f65cdd962",
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
  "evidence_artifact_file_sha256": "c2987ad38e1c1028ef05384a462822c1c29753790ed30b82ed13784f65cdd962",
  "evidence_rows_sha256": "cf206855e7b3d1ad90eda659c7eed1ed65a0b3e6eed7fb1fc7cdc7a069e54b9e",
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
  "embedded_datasets_sha256": "cf206855e7b3d1ad90eda659c7eed1ed65a0b3e6eed7fb1fc7cdc7a069e54b9e",
  "datasets": {
    "registration_data": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T11__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "15f787173c58f421eba14050bc745083632a523aba4e23234540f868acc8e35b",
  "generator_input_sha256": "dbc3945d23e192861a853b5a7a04205495af84237f4c5b5cd2d5e6c804f67de5",
  "generator_input_compact": {
    "task_id": "S-T11",
    "execution_id": "exec_1781847244342_19fa7837",
    "task_name": "Registration timing vs performance",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "Did enrolling late put me at a disadvantage?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "registration_data"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "registration_data"
    ],
    "dataset_row_counts": {
      "registration_data": 0
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
  "raw_text": "Summary: Currently, there is no data available to analyze the relationship between Registration Lead Time and Average Score. Without this information, we cannot determine any correlation patterns or their implications for student learning.\n\nEducational implications: Without data, we cannot assess the impact of registration timing on performance.\n\nRecommendations: high - Gather more data on registration lead times and average scores. - Having sufficient data will allow for a meaningful analysis of how registration timing may affect student performance.",
  "structured_payload": {
    "task_id": "S-T11",
    "execution_id": "exec_1781847244342_19fa7837",
    "explanation": {
      "summary": "Currently, there is no data available to analyze the relationship between Registration Lead Time and Average Score. Without this information, we cannot determine any correlation patterns or their implications for student learning.",
      "insights": [],
      "educational_implications": [
        "Without data, we cannot assess the impact of registration timing on performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Gather more data on registration lead times and average scores.",
          "rationale": "Having sufficient data will allow for a meaningful analysis of how registration timing may affect student performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "No data is available for analysis.",
      "based_on": [
        "sparse_data",
        "single_student"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
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
        "dataset_name": "registration_data",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3710,
      "token_usage": {
        "prompt_tokens": 676,
        "completion_tokens": 170,
        "total_tokens": 846
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000203
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T11__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "15f787173c58f421eba14050bc745083632a523aba4e23234540f868acc8e35b",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 676,
      "completion_tokens": 170,
      "total_tokens": 846
    },
    "latency_ms": 3714,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T11",
    "execution_id": "exec_1781847244342_19fa7837",
    "explanation": {
      "summary": "Currently, there is no data available to analyze the relationship between Registration Lead Time and Average Score. Without this information, we cannot determine any correlation patterns or their implications for student learning.",
      "insights": [],
      "educational_implications": [
        "Without data, we cannot assess the impact of registration timing on performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Gather more data on registration lead times and average scores.",
          "rationale": "Having sufficient data will allow for a meaningful analysis of how registration timing may affect student performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "No data is available for analysis.",
      "based_on": [
        "sparse_data",
        "single_student"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
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
        "dataset_name": "registration_data",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3710,
      "token_usage": {
        "prompt_tokens": 676,
        "completion_tokens": 170,
        "total_tokens": 846
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000203
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
    "observed": "c2987ad38e1c1028ef05384a462822c1c29753790ed30b82ed13784f65cdd962",
    "expected_values": [
      "c2987ad38e1c1028ef05384a462822c1c29753790ed30b82ed13784f65cdd962"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "cf206855e7b3d1ad90eda659c7eed1ed65a0b3e6eed7fb1fc7cdc7a069e54b9e",
    "expected": "cf206855e7b3d1ad90eda659c7eed1ed65a0b3e6eed7fb1fc7cdc7a069e54b9e"
  },
  {
    "check_id": "numeric_fields_registration_data",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "registration_data",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_registration_data",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "registration_data",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
