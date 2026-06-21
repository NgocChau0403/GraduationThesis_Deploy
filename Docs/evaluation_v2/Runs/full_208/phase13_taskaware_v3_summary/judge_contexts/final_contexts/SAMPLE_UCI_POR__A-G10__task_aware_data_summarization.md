# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G10__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G10__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G10",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G10__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "632c8bb367132705679d95b6aa5b4293d85ff62ce8c4623e8f70f83163d9ec85",
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
  "raw_text": "Summary: The analysis of the consistency distribution reveals that there are currently no recorded students within the dataset, indicating a lack of data to assess student consistency levels. Consequently, no actionable insights or patterns can be derived from the available information.\n\nEducational implications: The absence of data limits the ability to identify student consistency levels and tailor interventions accordingly.\n\nRecommendations: high - Collect and analyze data on student consistency levels. - Gathering this data is essential to understand student behaviors and implement targeted interventions for improving study habits.",
  "structured_payload": {
    "task_id": "A-G10",
    "execution_id": "exec_1781847232695_bb65e3f5",
    "explanation": {
      "summary": "The analysis of the consistency distribution reveals that there are currently no recorded students within the dataset, indicating a lack of data to assess student consistency levels. Consequently, no actionable insights or patterns can be derived from the available information.",
      "insights": [],
      "educational_implications": [
        "The absence of data limits the ability to identify student consistency levels and tailor interventions accordingly."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Collect and analyze data on student consistency levels.",
          "rationale": "Gathering this data is essential to understand student behaviors and implement targeted interventions for improving study habits."
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
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "categorical_distribution",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "consistency_distribution",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 12,
    "task_aware_prompt_tokens": 284,
    "token_ratio": 23.6667,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (23.6667 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3083,
      "token_usage": {
        "prompt_tokens": 771,
        "completion_tokens": 193,
        "total_tokens": 964
      },
      "strategy": "distribution",
      "granularity": "weekly",
      "cost_usd": 0.000231
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G10__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "632c8bb367132705679d95b6aa5b4293d85ff62ce8c4623e8f70f83163d9ec85",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 771,
      "completion_tokens": 193,
      "total_tokens": 964
    },
    "latency_ms": 3104,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G10",
    "execution_id": "exec_1781847232695_bb65e3f5",
    "explanation": {
      "summary": "The analysis of the consistency distribution reveals that there are currently no recorded students within the dataset, indicating a lack of data to assess student consistency levels. Consequently, no actionable insights or patterns can be derived from the available information.",
      "insights": [],
      "educational_implications": [
        "The absence of data limits the ability to identify student consistency levels and tailor interventions accordingly."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Collect and analyze data on student consistency levels.",
          "rationale": "Gathering this data is essential to understand student behaviors and implement targeted interventions for improving study habits."
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
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "categorical_distribution",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "consistency_distribution",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 12,
    "task_aware_prompt_tokens": 284,
    "token_ratio": 23.6667,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (23.6667 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3083,
      "token_usage": {
        "prompt_tokens": 771,
        "completion_tokens": 193,
        "total_tokens": 964
      },
      "strategy": "distribution",
      "granularity": "weekly",
      "cost_usd": 0.000231
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
