# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-S03__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-S03",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Student engagement trajectory",
  "scope": "1 student",
  "actionable_question": "When exactly did this student start disengaging?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Flag the exact week engagement dropped. Compare to pre-drop average. Recommend admin outreach timing.",
  "query_labels": [
    "engagement_trajectory"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
    "engagement [OULAD only]"
  ],
  "key_db_fields": [
    "week_number",
    "engagement_count; early_warning_week [FE cross]",
    "weekly_engagement_drop [FE cross]",
    "consistency_level [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "engagement_trajectory"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-S03-CORE-01",
      "description": "Identify the specific week in which engagement dropped when the data supports one."
    },
    {
      "requirement_id": "A-S03-CORE-02",
      "description": "Compare engagement after the drop with the pre-drop average."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "A-S03-SUPPORT-01",
      "description": "When a specific drop week is identified, recommend outreach timing relative to that week."
    }
  ],
  "evaluation_constraints": [],
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
      "dataset_label": "engagement_trajectory",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S03.json",
      "artifact_sha256": "15d31797020d70ac8ef35fab6d1b49e370292fb9da87f4e22b331c20ea59c5c2",
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
  "evidence_artifact_file_sha256": "15d31797020d70ac8ef35fab6d1b49e370292fb9da87f4e22b331c20ea59c5c2",
  "evidence_rows_sha256": "e8f2a578b3c7dc743bf3a427600b37b022d1873d9ebf30f91e6bf62eef747968",
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
  "embedded_datasets_sha256": "e8f2a578b3c7dc743bf3a427600b37b022d1873d9ebf30f91e6bf62eef747968",
  "datasets": {
    "engagement_trajectory": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S03__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "cdcc99bd4e9538fd4d7f1d229d43fbb92696fc0a53c697895ea8c723aae7231e",
  "generator_input_sha256": "630dc295db7196a8da35bbd53f71f4202cf8080656569cd0a966d6f31505aac0",
  "generator_input_compact": {
    "task_id": "A-S03",
    "execution_id": "exec_1781847238030_de934be8",
    "task_name": "Student engagement trajectory",
    "analysis_type": "trend",
    "explanation_strategy": "behavioral",
    "actionable_question": "When exactly did this student start disengaging?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "engagement_trajectory"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "engagement_trajectory"
    ],
    "dataset_row_counts": {
      "engagement_trajectory": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "weekly_clicks",
      "entity_column": null,
      "group_column": null,
      "time_column": "week_number",
      "sort_by": null,
      "sort_direction": "asc",
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
  "raw_text": "Summary: The engagement trajectory dataset is currently empty, indicating a lack of recorded student engagement data. Consequently, no behavioral patterns or trends can be identified, nor can any specific week of disengagement be determined.\n\nEducational implications: Without engagement data, it is impossible to assess student participation or identify areas for intervention.\n\nRecommendations: high - Encourage data collection and monitoring of student engagement metrics. - Establishing a robust dataset is essential for analyzing student behavior and implementing timely interventions.",
  "structured_payload": {
    "task_id": "A-S03",
    "execution_id": "exec_1781847238030_de934be8",
    "explanation": {
      "summary": "The engagement trajectory dataset is currently empty, indicating a lack of recorded student engagement data. Consequently, no behavioral patterns or trends can be identified, nor can any specific week of disengagement be determined.",
      "insights": [],
      "educational_implications": [
        "Without engagement data, it is impossible to assess student participation or identify areas for intervention."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Encourage data collection and monitoring of student engagement metrics.",
          "rationale": "Establishing a robust dataset is essential for analyzing student behavior and implementing timely interventions."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is confirmed to be empty, leading to a definitive conclusion regarding the absence of engagement data.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_trajectory",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 11,
    "task_aware_prompt_tokens": 296,
    "token_ratio": 26.9091,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (26.9091 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3195,
      "token_usage": {
        "prompt_tokens": 775,
        "completion_tokens": 188,
        "total_tokens": 963
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000229
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S03__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "cdcc99bd4e9538fd4d7f1d229d43fbb92696fc0a53c697895ea8c723aae7231e",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 775,
      "completion_tokens": 188,
      "total_tokens": 963
    },
    "latency_ms": 3207,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S03",
    "execution_id": "exec_1781847238030_de934be8",
    "explanation": {
      "summary": "The engagement trajectory dataset is currently empty, indicating a lack of recorded student engagement data. Consequently, no behavioral patterns or trends can be identified, nor can any specific week of disengagement be determined.",
      "insights": [],
      "educational_implications": [
        "Without engagement data, it is impossible to assess student participation or identify areas for intervention."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Encourage data collection and monitoring of student engagement metrics.",
          "rationale": "Establishing a robust dataset is essential for analyzing student behavior and implementing timely interventions."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is confirmed to be empty, leading to a definitive conclusion regarding the absence of engagement data.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_trajectory",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 11,
    "task_aware_prompt_tokens": 296,
    "token_ratio": 26.9091,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (26.9091 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3195,
      "token_usage": {
        "prompt_tokens": 775,
        "completion_tokens": 188,
        "total_tokens": 963
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000229
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
    "observed": "15d31797020d70ac8ef35fab6d1b49e370292fb9da87f4e22b331c20ea59c5c2",
    "expected_values": [
      "15d31797020d70ac8ef35fab6d1b49e370292fb9da87f4e22b331c20ea59c5c2"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "e8f2a578b3c7dc743bf3a427600b37b022d1873d9ebf30f91e6bf62eef747968",
    "expected": "e8f2a578b3c7dc743bf3a427600b37b022d1873d9ebf30f91e6bf62eef747968"
  },
  {
    "check_id": "numeric_fields_engagement_trajectory",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "engagement_trajectory",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_engagement_trajectory",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "engagement_trajectory",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
