# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G10__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G10__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G10",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
}
```

## Task Context

```json
{
  "task_name": "Consistency analysis across cohort",
  "scope": "Many students",
  "actionable_question": "How many students are cramming instead of studying consistently?",
  "target_audience": "instructor",
  "ai_summary_type": "categorical_distribution",
  "ai_prompt_hint": "Describe the distribution of students across high, medium, and low consistency using student_count and pct_students. Use avg_weekly_stddev and avg_active_weeks to explain what low consistency means, then recommend study-routine interventions for the low group.",
  "query_labels": [
    "consistency_distribution"
  ],
  "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement [OULAD only]"
  ],
  "key_db_fields": [
    "consistency_level [FE cross]",
    "student_count [FE cross]",
    "pct_students [FE cross]",
    "avg_weekly_stddev",
    "avg_weekly_clicks",
    "avg_active_weeks"
  ],
  "output_schema": {
    "required_columns": [
      "consistency_level",
      "student_count"
    ],
    "optional_columns": [
      "pct_students",
      "avg_weekly_stddev",
      "avg_weekly_clicks",
      "avg_active_weeks"
    ]
  },
  "query_labels": [
    "consistency_distribution"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G10-CORE-01",
      "description": "Describe the distribution of students across high, medium, and low consistency using returned cohort counts or percentages."
    },
    {
      "requirement_id": "A-G10-CORE-02",
      "description": "Explain what low consistency means by reference to returned spread and active-week metrics."
    },
    {
      "requirement_id": "A-G10-CORE-03",
      "description": "Recommend study-routine interventions targeted at the low-consistency group."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G10-CONSTRAINT-01",
      "description": "Do not conflate low consistency with low effort."
    },
    {
      "constraint_id": "A-G10-CONSTRAINT-02",
      "description": "Acknowledge that observed study patterns may reflect employment, health, accessibility, or family obligations when making recommendations."
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

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "consistency_distribution",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G10.json",
      "artifact_sha256": "55091a82a9c181100ded5a974b18be73297fc9cb0313b331df8bba0b7a4063eb",
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
  "evidence_artifact_file_sha256": "55091a82a9c181100ded5a974b18be73297fc9cb0313b331df8bba0b7a4063eb",
  "evidence_rows_sha256": "80cec0ac48a3ad7fff40e5598fcc32e8d89f18fc26442f6db52d9db2019e8f8d",
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
  "embedded_datasets_sha256": "80cec0ac48a3ad7fff40e5598fcc32e8d89f18fc26442f6db52d9db2019e8f8d",
  "datasets": {
    "consistency_distribution": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G10__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "a46776c2610d601c53f764a27e40c66d58815b2da1d6a1db31415cc4af9195bb",
  "generator_input_sha256": "40b80ab64e2afa86b44d53a5f24eedebce01e1f0ed16459b21ef2cc33ea337f4",
  "generator_input_compact": {
    "task_id": "A-G10",
    "execution_id": "exec_1781847232695_bb65e3f5",
    "task_name": "Consistency analysis across cohort",
    "analysis_type": "distribution",
    "explanation_strategy": "distribution",
    "actionable_question": "How many students are cramming instead of studying consistently?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "consistency_distribution"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "consistency_distribution"
    ],
    "dataset_row_counts": {
      "consistency_distribution": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "categorical_distribution",
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
  "raw_text": "Summary: The analysis of the consistency distribution reveals that there are no available data points to assess student performance across different consistency levels. Consequently, no patterns, clusters, or gaps can be identified.\n\nEducational implications: Without data on student consistency, it is challenging to identify areas for improvement or to implement targeted interventions.",
  "structured_payload": {
    "task_id": "A-G10",
    "execution_id": "exec_1781847232695_bb65e3f5",
    "explanation": {
      "summary": "The analysis of the consistency distribution reveals that there are no available data points to assess student performance across different consistency levels. Consequently, no patterns, clusters, or gaps can be identified.",
      "insights": [],
      "educational_implications": [
        "Without data on student consistency, it is challenging to identify areas for improvement or to implement targeted interventions."
      ],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset contains no rows, indicating a lack of data for analysis.",
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
        "dataset_name": "consistency_distribution",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 2869,
      "token_usage": {
        "prompt_tokens": 685,
        "completion_tokens": 130,
        "total_tokens": 815
      },
      "strategy": "distribution",
      "granularity": "weekly",
      "cost_usd": 0.000181
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G10__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "a46776c2610d601c53f764a27e40c66d58815b2da1d6a1db31415cc4af9195bb",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 685,
      "completion_tokens": 130,
      "total_tokens": 815
    },
    "latency_ms": 2899,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G10",
    "execution_id": "exec_1781847232695_bb65e3f5",
    "explanation": {
      "summary": "The analysis of the consistency distribution reveals that there are no available data points to assess student performance across different consistency levels. Consequently, no patterns, clusters, or gaps can be identified.",
      "insights": [],
      "educational_implications": [
        "Without data on student consistency, it is challenging to identify areas for improvement or to implement targeted interventions."
      ],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset contains no rows, indicating a lack of data for analysis.",
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
        "dataset_name": "consistency_distribution",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 2869,
      "token_usage": {
        "prompt_tokens": 685,
        "completion_tokens": 130,
        "total_tokens": 815
      },
      "strategy": "distribution",
      "granularity": "weekly",
      "cost_usd": 0.000181
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
    "observed": "55091a82a9c181100ded5a974b18be73297fc9cb0313b331df8bba0b7a4063eb",
    "expected_values": [
      "55091a82a9c181100ded5a974b18be73297fc9cb0313b331df8bba0b7a4063eb"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "80cec0ac48a3ad7fff40e5598fcc32e8d89f18fc26442f6db52d9db2019e8f8d",
    "expected": "80cec0ac48a3ad7fff40e5598fcc32e8d89f18fc26442f6db52d9db2019e8f8d"
  },
  {
    "check_id": "numeric_fields_consistency_distribution",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "consistency_distribution",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_consistency_distribution",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "consistency_distribution",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
