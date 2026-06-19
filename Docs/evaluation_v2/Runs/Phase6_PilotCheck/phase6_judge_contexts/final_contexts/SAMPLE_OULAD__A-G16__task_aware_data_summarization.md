# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-G16__task_aware_data_summarization

This Phase 6.4b context is the record-level evidence package to supply with the frozen Judge Prompt V2 during pilot judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G16__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_pilot_phase6_4",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G16",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Admin action recommendation",
  "scope": "Many students",
  "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
  "target_audience": "admin",
  "ai_summary_type": "action_synthesis",
  "ai_prompt_hint": "Synthesise all cohort [FE] signals into 3–5 admin actions. This is the most critical AI synthesis task for admin role.",
  "query_labels": [
    "synthesis_data"
  ],
  "explanation_strategy": "risk"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "assessment_result",
    "assessment",
    "engagement"
  ],
  "key_db_fields": [
    "[AI_SYNTHESIS] low_engagement_count",
    "high_risk_count",
    "hardest_assessment",
    "best_resource_type",
    "total_students"
  ],
  "output_schema": {},
  "query_labels": [
    "synthesis_data"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G16-CORE-01",
      "description": "Synthesise cohort feature-engineered signals into 3–5 admin actions."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G16-CONSTRAINT-01",
      "description": "Every recommended action must be grounded in returned cohort feature-engineered signals."
    },
    {
      "constraint_id": "A-G16-CONSTRAINT-02",
      "description": "Do not invent urgency or priority without supporting returned data."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "synthesis_data",
      "artifact_path": "Docs/evaluation_v2/Runs/phase6_evidence/full_query_artifacts/SAMPLE_OULAD__A-G16__task_aware_data_summarization.json",
      "artifact_sha256": "8ae73ebd0d488b99cf04552cbfcf20e4e70e2720fcb39f0e2cfa034510bae1fc",
      "row_count": 1,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 1,
  "prompt_embedded_row_count": 1,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "8ae73ebd0d488b99cf04552cbfcf20e4e70e2720fcb39f0e2cfa034510bae1fc",
  "evidence_rows_sha256": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
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
  "full_result_row_count": 1,
  "embedded_datasets_sha256": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
  "datasets": {
    "synthesis_data": [
      {
        "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
        "low_engagement_count": 1240,
        "high_risk_count": 906,
        "hardest_assessment": "24299",
        "best_resource_type": "quiz",
        "total_students": 1998
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_task_aware/explanation_artifacts/SAMPLE_OULAD__A-G16__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "e81ee18488ff3ece5fca8409e360696d1e3c37fc67b8101da0c25aaa11938d7a",
  "generator_input_sha256": "930ecfa8481cfa634685bae2b588108014343e50fa971e2eb16f1d9392a3bb1a",
  "generator_input_compact": {
    "task_id": "A-G16",
    "execution_id": "exec_1781820461916_c3ec4523",
    "task_name": "Admin action recommendation",
    "analysis_type": "synthesis",
    "explanation_strategy": "risk",
    "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
    "target_audience": [
      "admin"
    ],
    "query_labels": [
      "synthesis_data"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "synthesis_data"
    ],
    "dataset_row_counts": {
      "synthesis_data": 1
    },
    "ai_summary_config_summary": {
      "summary_type": "action_synthesis",
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
      "require_sensitive_context_policy": false,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: No supported actions were generated due to the absence of prioritized actions in the provided data.",
  "structured_payload": {
    "task_id": "A-G16",
    "execution_id": "exec_1781820461916_c3ec4523",
    "explanation": {
      "summary": "No supported actions were generated due to the absence of prioritized actions in the provided data.",
      "insights": [],
      "educational_implications": [],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided contains no actionable insights or evidence.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "synthesis_data",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 1447,
      "token_usage": {
        "prompt_tokens": 748,
        "completion_tokens": 86,
        "total_tokens": 834
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000164
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_task_aware/explanation_artifacts/SAMPLE_OULAD__A-G16__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "e81ee18488ff3ece5fca8409e360696d1e3c37fc67b8101da0c25aaa11938d7a",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 748,
      "completion_tokens": 86,
      "total_tokens": 834
    },
    "latency_ms": 1450,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G16",
    "execution_id": "exec_1781820461916_c3ec4523",
    "explanation": {
      "summary": "No supported actions were generated due to the absence of prioritized actions in the provided data.",
      "insights": [],
      "educational_implications": [],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided contains no actionable insights or evidence.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "synthesis_data",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 1447,
      "token_usage": {
        "prompt_tokens": 748,
        "completion_tokens": 86,
        "total_tokens": 834
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000164
    }
  }
}
```

## Pilot-Minimal Deterministic Checks

```json
[
  {
    "check_id": "row_count_total",
    "check_type": "row_count",
    "status": "pass",
    "expected": 1,
    "observed": 1
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "8ae73ebd0d488b99cf04552cbfcf20e4e70e2720fcb39f0e2cfa034510bae1fc",
    "expected_values": [
      "8ae73ebd0d488b99cf04552cbfcf20e4e70e2720fcb39f0e2cfa034510bae1fc"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
    "expected": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013"
  },
  {
    "check_id": "numeric_fields_synthesis_data",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "numeric_columns": [
      "high_risk_count",
      "low_engagement_count",
      "total_students"
    ],
    "numeric_summaries": {
      "high_risk_count": {
        "count": 1,
        "min": 906,
        "max": 906
      },
      "low_engagement_count": {
        "count": 1,
        "min": 1240,
        "max": 1240
      },
      "total_students": {
        "count": 1,
        "min": 1998,
        "max": 1998
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_synthesis_data",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "flag_columns": [
      "high_risk_count"
    ],
    "triggered_like_counts": {
      "high_risk_count": 0
    }
  }
]
```
