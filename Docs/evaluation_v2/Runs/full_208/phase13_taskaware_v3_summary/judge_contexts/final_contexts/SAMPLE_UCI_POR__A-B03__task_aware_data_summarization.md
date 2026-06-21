# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-B03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-B03__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-B03",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Engagement distribution",
  "scope": "Cohort",
  "actionable_question": "What proportion of the class is disengaged?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "categorical_distribution",
  "ai_prompt_hint": "Describe proportion of low/medium/high effort students. Flag the low tail.",
  "query_labels": [
    "engagement_distribution"
  ],
  "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement"
  ],
  "key_db_fields": [
    "engagement_score [FE]",
    "study_effort_level [FE]",
    "total_engagement_count"
  ],
  "output_schema": {
    "required_columns": [
      "study_effort_level",
      "student_count"
    ],
    "optional_columns": [
      "pct_of_class",
      "avg_engagement_score"
    ]
  },
  "query_labels": [
    "engagement_distribution"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-B03-CORE-01",
      "description": "Describe proportion of low/medium/high effort students."
    },
    {
      "requirement_id": "A-B03-CORE-02",
      "description": "Flag the low tail."
    }
  ],
  "required_supporting_outputs": [],
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
      "dataset_label": "engagement_distribution",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-B03.json",
      "artifact_sha256": "b1fd950f18b4a9da0128b2217f19bb3e0ad317c247d456584e4135984e299149",
      "row_count": 4,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 4,
  "prompt_embedded_row_count": 4,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "b1fd950f18b4a9da0128b2217f19bb3e0ad317c247d456584e4135984e299149",
  "evidence_rows_sha256": "90e158e13287bb8fb1fc71c6ac96e9bb5f543c963a4564700e88580df096a7db",
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
  "full_result_row_count": 4,
  "embedded_datasets_sha256": "90e158e13287bb8fb1fc71c6ac96e9bb5f543c963a4564700e88580df096a7db",
  "datasets": {
    "engagement_distribution": [
      {
        "study_effort_level": "very_low",
        "student_count": 649,
        "pct_of_class": 100,
        "avg_engagement_score": 0
      },
      {
        "study_effort_level": "low",
        "student_count": 0,
        "pct_of_class": 0,
        "avg_engagement_score": null
      },
      {
        "study_effort_level": "medium",
        "student_count": 0,
        "pct_of_class": 0,
        "avg_engagement_score": null
      },
      {
        "study_effort_level": "high",
        "student_count": 0,
        "pct_of_class": 0,
        "avg_engagement_score": null
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-B03__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "1abec3c0e878050ea79c181052caf3c687a87c62c7254bac9f652c0686613221",
  "generator_input_sha256": "ac244e8191ca43eba35bb7334949b786db6548e851a7a3babc831919454ea605",
  "generator_input_compact": {
    "task_id": "A-B03",
    "execution_id": "exec_1781847231767_3a51d33b",
    "task_name": "Engagement distribution",
    "analysis_type": "distribution",
    "explanation_strategy": "distribution",
    "actionable_question": "What proportion of the class is disengaged?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "engagement_distribution"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "engagement_distribution"
    ],
    "dataset_row_counts": {
      "engagement_distribution": 4
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
  "raw_text": "Summary: The engagement distribution reveals that 100% of students fall into the 'very_low' study effort level, indicating a complete lack of engagement across the cohort. There are no students categorized under low, medium, or high effort levels, highlighting a significant gap in student engagement.\n\nInsights: Complete Disengagement: All 649 students are classified as having 'very_low' study effort, with an average engagement score of 0. This indicates a critical lack of engagement within the cohort.\n\nEducational implications: The absence of students in higher engagement categories suggests a need for immediate intervention strategies to enhance student motivation and participation.\n\nRecommendations: high - Implement targeted engagement strategies such as interactive learning activities and personalized feedback. - These strategies can help to stimulate interest and encourage students to move beyond the 'very_low' engagement level.",
  "structured_payload": {
    "task_id": "A-B03",
    "execution_id": "exec_1781847231767_3a51d33b",
    "explanation": {
      "summary": "The engagement distribution reveals that 100% of students fall into the 'very_low' study effort level, indicating a complete lack of engagement across the cohort. There are no students categorized under low, medium, or high effort levels, highlighting a significant gap in student engagement.",
      "insights": [
        {
          "title": "Complete Disengagement",
          "description": "All 649 students are classified as having 'very_low' study effort, with an average engagement score of 0. This indicates a critical lack of engagement within the cohort.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 649,
              "comparison": "baseline",
              "delta": 0,
              "context": "All students are in the 'very_low' category."
            }
          ]
        }
      ],
      "educational_implications": [
        "The absence of students in higher engagement categories suggests a need for immediate intervention strategies to enhance student motivation and participation."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted engagement strategies such as interactive learning activities and personalized feedback.",
          "rationale": "These strategies can help to stimulate interest and encourage students to move beyond the 'very_low' engagement level."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly indicates a complete lack of engagement across all but one category.",
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
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_distribution",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 4,
    "baseline_reference_tokens": 136,
    "task_aware_prompt_tokens": 489,
    "token_ratio": 3.5956,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.5956 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5036,
      "token_usage": {
        "prompt_tokens": 1007,
        "completion_tokens": 332,
        "total_tokens": 1339
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.00035
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-B03__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "1abec3c0e878050ea79c181052caf3c687a87c62c7254bac9f652c0686613221",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1007,
      "completion_tokens": 332,
      "total_tokens": 1339
    },
    "latency_ms": 5042,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-B03",
    "execution_id": "exec_1781847231767_3a51d33b",
    "explanation": {
      "summary": "The engagement distribution reveals that 100% of students fall into the 'very_low' study effort level, indicating a complete lack of engagement across the cohort. There are no students categorized under low, medium, or high effort levels, highlighting a significant gap in student engagement.",
      "insights": [
        {
          "title": "Complete Disengagement",
          "description": "All 649 students are classified as having 'very_low' study effort, with an average engagement score of 0. This indicates a critical lack of engagement within the cohort.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 649,
              "comparison": "baseline",
              "delta": 0,
              "context": "All students are in the 'very_low' category."
            }
          ]
        }
      ],
      "educational_implications": [
        "The absence of students in higher engagement categories suggests a need for immediate intervention strategies to enhance student motivation and participation."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted engagement strategies such as interactive learning activities and personalized feedback.",
          "rationale": "These strategies can help to stimulate interest and encourage students to move beyond the 'very_low' engagement level."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly indicates a complete lack of engagement across all but one category.",
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
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_distribution",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 4,
    "baseline_reference_tokens": 136,
    "task_aware_prompt_tokens": 489,
    "token_ratio": 3.5956,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.5956 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5036,
      "token_usage": {
        "prompt_tokens": 1007,
        "completion_tokens": 332,
        "total_tokens": 1339
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.00035
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
    "expected": 4,
    "observed": 4
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "b1fd950f18b4a9da0128b2217f19bb3e0ad317c247d456584e4135984e299149",
    "expected_values": [
      "b1fd950f18b4a9da0128b2217f19bb3e0ad317c247d456584e4135984e299149"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "90e158e13287bb8fb1fc71c6ac96e9bb5f543c963a4564700e88580df096a7db",
    "expected": "90e158e13287bb8fb1fc71c6ac96e9bb5f543c963a4564700e88580df096a7db"
  },
  {
    "check_id": "numeric_fields_engagement_distribution",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "engagement_distribution",
    "numeric_columns": [
      "pct_of_class",
      "student_count",
      "avg_engagement_score"
    ],
    "numeric_summaries": {
      "pct_of_class": {
        "count": 4,
        "min": 0,
        "max": 100
      },
      "student_count": {
        "count": 4,
        "min": 0,
        "max": 649
      },
      "avg_engagement_score": {
        "count": 1,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_engagement_distribution",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "engagement_distribution",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
