# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T11__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T11__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T11",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T11__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "0b5a0bc07db47c784dab1c401e6ea34bee8a9e08611e91afc28f09ea090528f8",
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
  "raw_text": "Summary: Currently, there is no data available to analyze the relationship between Registration Lead Time and Average Score. This means we can't determine if early enrollment is associated with better performance at this time. However, gathering more data could provide valuable insights in the future.\n\nEducational implications: Understanding the timing of registration could help in planning for better academic outcomes.\n\nRecommendations: high - Encourage students to register earlier for courses. - While we can't confirm the impact of registration timing on scores now, early registration may still provide students with more time to prepare and succeed.",
  "structured_payload": {
    "task_id": "S-T11",
    "execution_id": "exec_1781847244342_19fa7837",
    "explanation": {
      "summary": "Currently, there is no data available to analyze the relationship between Registration Lead Time and Average Score. This means we can't determine if early enrollment is associated with better performance at this time. However, gathering more data could provide valuable insights in the future.",
      "insights": [],
      "educational_implications": [
        "Understanding the timing of registration could help in planning for better academic outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Encourage students to register earlier for courses.",
          "rationale": "While we can't confirm the impact of registration timing on scores now, early registration may still provide students with more time to prepare and succeed."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "The dataset is empty, preventing any correlation analysis.",
      "based_on": [
        "sparse_data",
        "single_student"
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
        "dataset_name": "registration_data",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 10,
    "task_aware_prompt_tokens": 366,
    "token_ratio": 36.6,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (36.6 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 2869,
      "token_usage": {
        "prompt_tokens": 842,
        "completion_tokens": 193,
        "total_tokens": 1035
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000242
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T11__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "0b5a0bc07db47c784dab1c401e6ea34bee8a9e08611e91afc28f09ea090528f8",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 842,
      "completion_tokens": 193,
      "total_tokens": 1035
    },
    "latency_ms": 2877,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T11",
    "execution_id": "exec_1781847244342_19fa7837",
    "explanation": {
      "summary": "Currently, there is no data available to analyze the relationship between Registration Lead Time and Average Score. This means we can't determine if early enrollment is associated with better performance at this time. However, gathering more data could provide valuable insights in the future.",
      "insights": [],
      "educational_implications": [
        "Understanding the timing of registration could help in planning for better academic outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Encourage students to register earlier for courses.",
          "rationale": "While we can't confirm the impact of registration timing on scores now, early registration may still provide students with more time to prepare and succeed."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "The dataset is empty, preventing any correlation analysis.",
      "based_on": [
        "sparse_data",
        "single_student"
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
        "dataset_name": "registration_data",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 10,
    "task_aware_prompt_tokens": 366,
    "token_ratio": 36.6,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (36.6 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 2869,
      "token_usage": {
        "prompt_tokens": 842,
        "completion_tokens": 193,
        "total_tokens": 1035
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000242
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
