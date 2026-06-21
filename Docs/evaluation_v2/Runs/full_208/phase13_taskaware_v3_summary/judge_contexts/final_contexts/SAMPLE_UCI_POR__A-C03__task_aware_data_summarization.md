# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-C03__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-C03",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Compare risk profile",
  "scope": "2 students",
  "actionable_question": "Who is at higher risk and what are the key differences?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "multi_metric_comparison",
  "ai_prompt_hint": "Compare the two returned student rows. Use at_risk_score, at_risk_label, and explicit flag_* columns to explain who needs more urgent intervention. If avg_score is null, state that score evidence is missing rather than guessing.",
  "query_labels": [
    "risk_comparison"
  ],
  "explanation_strategy": "comparison"
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
    "student_id [FE cross]",
    "at_risk_score [FE cross]",
    "at_risk_label [FE cross]",
    "avg_score [FE cross]",
    "engagement_score [FE cross]",
    "punctuality_rate [FE cross]",
    "performance_trend [FE cross]",
    "flag_low_score",
    "flag_repeated",
    "flag_low_engagement",
    "flag_low_punctuality",
    "flag_neg_trend",
    "previous_attempt_count",
    "final_outcome"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "at_risk_score",
      "at_risk_label"
    ],
    "optional_columns": [
      "avg_score",
      "performance_trend",
      "punctuality_rate",
      "engagement_score",
      "previous_attempt_count",
      "flag_low_score",
      "flag_repeated",
      "flag_low_engagement",
      "flag_low_punctuality",
      "flag_neg_trend",
      "final_outcome"
    ]
  },
  "query_labels": [
    "risk_comparison"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-C03-CORE-01",
      "description": "Compare the two returned student rows."
    },
    {
      "requirement_id": "A-C03-CORE-02",
      "description": "Use at_risk_score, at_risk_label, and explicit flag_* columns to explain who needs more urgent intervention."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "A-C03-SUPPORT-01",
      "description": "If avg_score is null, state that score evidence is missing rather than guessing."
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
      "dataset_label": "risk_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-C03.json",
      "artifact_sha256": "c69580e2dc2021885655a077aa3a3c8b919df20604218d6eb67be7b50804ec52",
      "row_count": 2,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 2,
  "prompt_embedded_row_count": 2,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "c69580e2dc2021885655a077aa3a3c8b919df20604218d6eb67be7b50804ec52",
  "evidence_rows_sha256": "33d6ef8eca1e92b00c492524834dd46f13711d77c7502329db68916881185245",
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
  "full_result_row_count": 2,
  "embedded_datasets_sha256": "33d6ef8eca1e92b00c492524834dd46f13711d77c7502329db68916881185245",
  "datasets": {
    "risk_comparison": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "avg_score": 36.666666666666664,
        "performance_trend": 27.5,
        "punctuality_rate": 0,
        "engagement_score": 0,
        "previous_attempt_count": 0,
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "avg_score": 51.666666666666664,
        "performance_trend": 5,
        "punctuality_rate": 0,
        "engagement_score": 0,
        "previous_attempt_count": 0,
        "flag_low_score": 0,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "at_risk_score": 2,
        "at_risk_label": "medium",
        "final_outcome": "Pass"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C03__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "f7d30f868a84bf1ffcaed87a0dcd2572aa3778360d1d0179d81ccd0f56c97b63",
  "generator_input_sha256": "fce56d7bbeeb8f6f88e466f6208ac3b7ca41b8c6f359874aecfa3be37c21d9d8",
  "generator_input_compact": {
    "task_id": "A-C03",
    "execution_id": "exec_1781847231991_2a53a959",
    "task_name": "Compare risk profile",
    "analysis_type": "comparison",
    "explanation_strategy": "comparison",
    "actionable_question": "Who is at higher risk and what are the key differences?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "risk_comparison"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "risk_comparison"
    ],
    "dataset_row_counts": {
      "risk_comparison": 2
    },
    "ai_summary_config_summary": {
      "summary_type": "multi_metric_comparison",
      "metric_column": null,
      "entity_column": "student_id",
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
  "raw_text": "Summary: The comparison of two students reveals significant differences in their risk profiles, with one student categorized as high risk and the other as medium risk. The student with the higher average score demonstrates fewer flags for low performance indicators.\n\nInsights: Risk Level Comparison: Student SAMPLE_UCI_POR_STU_000001 is classified as high risk with an at risk score of 3, while SAMPLE_UCI_POR_STU_000002 is classified as medium risk with an at risk score of 2. This indicates a greater need for intervention for the first student. | Average Score Disparity: SAMPLE_UCI_POR_STU_000001 has a significantly lower average score of 36.67 compared to SAMPLE_UCI_POR_STU_000002's average score of 51.67, indicating a substantial performance gap.\n\nEducational implications: Students with higher at risk scores and lower average scores may require targeted support to improve their academic performance and engagement.\n\nRecommendations: high - Implement personalized intervention strategies for SAMPLE_UCI_POR_STU_000001. - Given the high risk score and low average performance, immediate support is essential to prevent further decline. | medium - Monitor engagement and punctuality for both students. - Both students exhibit low engagement and punctuality rates, which could impact their overall success.",
  "structured_payload": {
    "task_id": "A-C03",
    "execution_id": "exec_1781847231991_2a53a959",
    "explanation": {
      "summary": "The comparison of two students reveals significant differences in their risk profiles, with one student categorized as high risk and the other as medium risk. The student with the higher average score demonstrates fewer flags for low performance indicators.",
      "insights": [
        {
          "title": "Risk Level Comparison",
          "description": "Student SAMPLE_UCI_POR_STU_000001 is classified as high risk with an at risk score of 3, while SAMPLE_UCI_POR_STU_000002 is classified as medium risk with an at risk score of 2. This indicates a greater need for intervention for the first student.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_UCI_POR_STU_000001"
            },
            {
              "metric": "at_risk_score",
              "value": 2,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_UCI_POR_STU_000002"
            }
          ]
        },
        {
          "title": "Average Score Disparity",
          "description": "SAMPLE_UCI_POR_STU_000001 has a significantly lower average score of 36.67 compared to SAMPLE_UCI_POR_STU_000002's average score of 51.67, indicating a substantial performance gap.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 36.67,
              "comparison": "down_from_previous",
              "delta": -15,
              "context": "SAMPLE_UCI_POR_STU_000001"
            },
            {
              "metric": "avg_score",
              "value": 51.67,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_UCI_POR_STU_000002"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students with higher at risk scores and lower average scores may require targeted support to improve their academic performance and engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement personalized intervention strategies for SAMPLE_UCI_POR_STU_000001.",
          "rationale": "Given the high risk score and low average performance, immediate support is essential to prevent further decline."
        },
        {
          "priority": "medium",
          "action": "Monitor engagement and punctuality for both students.",
          "rationale": "Both students exhibit low engagement and punctuality rates, which could impact their overall success."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is sufficient with clear metrics and comparisons available.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "multi_metric_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 2,
    "baseline_reference_tokens": 223,
    "task_aware_prompt_tokens": 1136,
    "token_ratio": 5.0942,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.missing_expected_entities",
      "comparison.metric_extrema",
      "comparison.pairwise_gaps",
      "primary_finding.selected_entity_evidence"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (5.0942 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7913,
      "token_usage": {
        "prompt_tokens": 1852,
        "completion_tokens": 634,
        "total_tokens": 2486
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000658
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C03__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "f7d30f868a84bf1ffcaed87a0dcd2572aa3778360d1d0179d81ccd0f56c97b63",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1852,
      "completion_tokens": 634,
      "total_tokens": 2486
    },
    "latency_ms": 7919,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C03",
    "execution_id": "exec_1781847231991_2a53a959",
    "explanation": {
      "summary": "The comparison of two students reveals significant differences in their risk profiles, with one student categorized as high risk and the other as medium risk. The student with the higher average score demonstrates fewer flags for low performance indicators.",
      "insights": [
        {
          "title": "Risk Level Comparison",
          "description": "Student SAMPLE_UCI_POR_STU_000001 is classified as high risk with an at risk score of 3, while SAMPLE_UCI_POR_STU_000002 is classified as medium risk with an at risk score of 2. This indicates a greater need for intervention for the first student.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_UCI_POR_STU_000001"
            },
            {
              "metric": "at_risk_score",
              "value": 2,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_UCI_POR_STU_000002"
            }
          ]
        },
        {
          "title": "Average Score Disparity",
          "description": "SAMPLE_UCI_POR_STU_000001 has a significantly lower average score of 36.67 compared to SAMPLE_UCI_POR_STU_000002's average score of 51.67, indicating a substantial performance gap.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 36.67,
              "comparison": "down_from_previous",
              "delta": -15,
              "context": "SAMPLE_UCI_POR_STU_000001"
            },
            {
              "metric": "avg_score",
              "value": 51.67,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_UCI_POR_STU_000002"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students with higher at risk scores and lower average scores may require targeted support to improve their academic performance and engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement personalized intervention strategies for SAMPLE_UCI_POR_STU_000001.",
          "rationale": "Given the high risk score and low average performance, immediate support is essential to prevent further decline."
        },
        {
          "priority": "medium",
          "action": "Monitor engagement and punctuality for both students.",
          "rationale": "Both students exhibit low engagement and punctuality rates, which could impact their overall success."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is sufficient with clear metrics and comparisons available.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "multi_metric_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 2,
    "baseline_reference_tokens": 223,
    "task_aware_prompt_tokens": 1136,
    "token_ratio": 5.0942,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.missing_expected_entities",
      "comparison.metric_extrema",
      "comparison.pairwise_gaps",
      "primary_finding.selected_entity_evidence"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (5.0942 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7913,
      "token_usage": {
        "prompt_tokens": 1852,
        "completion_tokens": 634,
        "total_tokens": 2486
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000658
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
    "expected": 2,
    "observed": 2
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "c69580e2dc2021885655a077aa3a3c8b919df20604218d6eb67be7b50804ec52",
    "expected_values": [
      "c69580e2dc2021885655a077aa3a3c8b919df20604218d6eb67be7b50804ec52"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "33d6ef8eca1e92b00c492524834dd46f13711d77c7502329db68916881185245",
    "expected": "33d6ef8eca1e92b00c492524834dd46f13711d77c7502329db68916881185245"
  },
  {
    "check_id": "numeric_fields_risk_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "risk_comparison",
    "numeric_columns": [
      "at_risk_score",
      "avg_score",
      "engagement_score",
      "flag_low_engagement",
      "flag_low_punctuality",
      "flag_low_score",
      "flag_neg_trend",
      "flag_repeated",
      "performance_trend",
      "previous_attempt_count",
      "punctuality_rate"
    ],
    "numeric_summaries": {
      "at_risk_score": {
        "count": 2,
        "min": 2,
        "max": 3
      },
      "avg_score": {
        "count": 2,
        "min": 36.666666666666664,
        "max": 51.666666666666664
      },
      "engagement_score": {
        "count": 2,
        "min": 0,
        "max": 0
      },
      "flag_low_engagement": {
        "count": 2,
        "min": 1,
        "max": 1
      },
      "flag_low_punctuality": {
        "count": 2,
        "min": 1,
        "max": 1
      },
      "flag_low_score": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "flag_neg_trend": {
        "count": 2,
        "min": 0,
        "max": 0
      },
      "flag_repeated": {
        "count": 2,
        "min": 0,
        "max": 0
      },
      "performance_trend": {
        "count": 2,
        "min": 5,
        "max": 27.5
      },
      "previous_attempt_count": {
        "count": 2,
        "min": 0,
        "max": 0
      },
      "punctuality_rate": {
        "count": 2,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_risk_comparison",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "risk_comparison",
    "flag_columns": [
      "flag_low_score",
      "flag_repeated",
      "flag_low_engagement",
      "flag_low_punctuality",
      "flag_neg_trend",
      "at_risk_score",
      "at_risk_label"
    ],
    "triggered_like_counts": {
      "flag_low_score": 0,
      "flag_repeated": 0,
      "flag_low_engagement": 0,
      "flag_low_punctuality": 0,
      "flag_neg_trend": 0,
      "at_risk_score": 0,
      "at_risk_label": 0
    }
  }
]
```
