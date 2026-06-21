# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-S01__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-S01",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Student full profile snapshot",
  "scope": "1 student",
  "actionable_question": "Who is this student and what is their current overall situation?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "metric_snapshot",
  "ai_prompt_hint": "Summarise who this student is and where they stand across all dimensions (score, engagement, risk) in plain language.",
  "query_labels": [
    "student_profile"
  ],
  "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "enrollment"
  ],
  "key_db_fields": [
    "student_id",
    "gender",
    "age_group",
    "avg_score [FE cross]",
    "engagement_score [FE cross]",
    "at_risk_label [FE cross]",
    "at_risk_score [FE cross]",
    "study_effort_level [FE cross]",
    "final_outcome",
    "previous_attempt_count"
  ],
  "output_schema": {},
  "query_labels": [
    "student_profile"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-S01-CORE-01",
      "description": "Summarise who this student is and where they stand across all dimensions (score, engagement, risk) in plain language."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-S01-CONSTRAINT-01",
      "description": "Do not extrapolate beyond returned score, engagement, and risk dimensions."
    },
    {
      "constraint_id": "A-S01-CONSTRAINT-02",
      "description": "Avoid holistic judgements about the student when supporting data is absent."
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
      "dataset_label": "student_profile",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S01.json",
      "artifact_sha256": "ec2015b1eca0857d3f4bbc0065c54377d81643b914bd603c2ab399161f2c28bc",
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
  "evidence_artifact_file_sha256": "ec2015b1eca0857d3f4bbc0065c54377d81643b914bd603c2ab399161f2c28bc",
  "evidence_rows_sha256": "0c10f4df138d1a4a879ee1ca0e9aa788f9246d0acb4a47b54e5818fcc8b508a8",
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
  "embedded_datasets_sha256": "0c10f4df138d1a4a879ee1ca0e9aa788f9246d0acb4a47b54e5818fcc8b508a8",
  "datasets": {
    "student_profile": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "gender": "F",
        "age_group": "18-20",
        "region": null,
        "previous_attempt_count": 0,
        "final_outcome": "Pass",
        "avg_score": 36.666666666666664,
        "at_risk_score": 2,
        "at_risk_label": "medium",
        "engagement_score": 0,
        "study_effort_level": "very_low"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S01__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "410d0b6d3c4f7c644225701aff5eaf779780fa8590a8d12b1356c298682c38e7",
  "generator_input_sha256": "3e10d9ad5d8d57b08958344478fddd230521b4a3d680ba3ac77a27786c43909a",
  "generator_input_compact": {
    "task_id": "A-S01",
    "execution_id": "exec_1781847237940_4db41799",
    "task_name": "Student full profile snapshot",
    "analysis_type": "aggregation",
    "explanation_strategy": "distribution",
    "actionable_question": "Who is this student and what is their current overall situation?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "student_profile"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "student_profile"
    ],
    "dataset_row_counts": {
      "student_profile": 1
    },
    "ai_summary_config_summary": {
      "summary_type": "metric_snapshot",
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
      "require_sensitive_context_policy": true,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: The student profile indicates a female student aged 18-20 who has not previously attempted any courses. She has a low average score of approximately 36.67, an engagement score of 0, and is categorized as medium risk with a study effort level of very low. Despite passing, her performance suggests significant areas for improvement.\n\nInsights: Low Average Score: The student's average score of 36.67 is considerably below the expected threshold for satisfactory performance, indicating a need for targeted academic support. | Zero Engagement Score: An engagement score of 0 indicates a lack of participation or interaction with course materials, which is critical for academic success. | Medium At-Risk Label: The student is labeled as medium risk, which highlights the potential for academic challenges if current trends continue.\n\nEducational implications: The student requires immediate academic support to improve her understanding of course material and increase engagement.\n\nRecommendations: high - Implement targeted tutoring sessions focused on core subjects. - To address the low average score and enhance understanding of the material. | high - Encourage participation in study groups or peer learning opportunities. - To improve engagement and foster a collaborative learning environment.",
  "structured_payload": {
    "task_id": "A-S01",
    "execution_id": "exec_1781847237940_4db41799",
    "explanation": {
      "summary": "The student profile indicates a female student aged 18-20 who has not previously attempted any courses. She has a low average score of approximately 36.67, an engagement score of 0, and is categorized as medium risk with a study effort level of very low. Despite passing, her performance suggests significant areas for improvement.",
      "insights": [
        {
          "title": "Low Average Score",
          "description": "The student's average score of 36.67 is considerably below the expected threshold for satisfactory performance, indicating a need for targeted academic support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 36.666666666666664,
              "comparison": "baseline",
              "delta": null,
              "context": "The average score is significantly low, suggesting a need for intervention."
            }
          ]
        },
        {
          "title": "Zero Engagement Score",
          "description": "An engagement score of 0 indicates a lack of participation or interaction with course materials, which is critical for academic success.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "The absence of engagement may correlate with the low average score."
            }
          ]
        },
        {
          "title": "Medium At-Risk Label",
          "description": "The student is labeled as medium risk, which highlights the potential for academic challenges if current trends continue.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "at_risk_label",
              "value": "medium",
              "comparison": "baseline",
              "delta": null,
              "context": "This label suggests the need for monitoring and support."
            }
          ]
        }
      ],
      "educational_implications": [
        "The student requires immediate academic support to improve her understanding of course material and increase engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted tutoring sessions focused on core subjects.",
          "rationale": "To address the low average score and enhance understanding of the material."
        },
        {
          "priority": "high",
          "action": "Encourage participation in study groups or peer learning opportunities.",
          "rationale": "To improve engagement and foster a collaborative learning environment."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a complete student profile with sufficient evidence for analysis.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "metric_snapshot",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "student_profile",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 94,
    "task_aware_prompt_tokens": 708,
    "token_ratio": 7.5319,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (7.5319 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7801,
      "token_usage": {
        "prompt_tokens": 1202,
        "completion_tokens": 579,
        "total_tokens": 1781
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000528
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S01__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "410d0b6d3c4f7c644225701aff5eaf779780fa8590a8d12b1356c298682c38e7",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1202,
      "completion_tokens": 579,
      "total_tokens": 1781
    },
    "latency_ms": 7806,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S01",
    "execution_id": "exec_1781847237940_4db41799",
    "explanation": {
      "summary": "The student profile indicates a female student aged 18-20 who has not previously attempted any courses. She has a low average score of approximately 36.67, an engagement score of 0, and is categorized as medium risk with a study effort level of very low. Despite passing, her performance suggests significant areas for improvement.",
      "insights": [
        {
          "title": "Low Average Score",
          "description": "The student's average score of 36.67 is considerably below the expected threshold for satisfactory performance, indicating a need for targeted academic support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 36.666666666666664,
              "comparison": "baseline",
              "delta": null,
              "context": "The average score is significantly low, suggesting a need for intervention."
            }
          ]
        },
        {
          "title": "Zero Engagement Score",
          "description": "An engagement score of 0 indicates a lack of participation or interaction with course materials, which is critical for academic success.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "The absence of engagement may correlate with the low average score."
            }
          ]
        },
        {
          "title": "Medium At-Risk Label",
          "description": "The student is labeled as medium risk, which highlights the potential for academic challenges if current trends continue.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "at_risk_label",
              "value": "medium",
              "comparison": "baseline",
              "delta": null,
              "context": "This label suggests the need for monitoring and support."
            }
          ]
        }
      ],
      "educational_implications": [
        "The student requires immediate academic support to improve her understanding of course material and increase engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted tutoring sessions focused on core subjects.",
          "rationale": "To address the low average score and enhance understanding of the material."
        },
        {
          "priority": "high",
          "action": "Encourage participation in study groups or peer learning opportunities.",
          "rationale": "To improve engagement and foster a collaborative learning environment."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a complete student profile with sufficient evidence for analysis.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "metric_snapshot",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "student_profile",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 94,
    "task_aware_prompt_tokens": 708,
    "token_ratio": 7.5319,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (7.5319 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7801,
      "token_usage": {
        "prompt_tokens": 1202,
        "completion_tokens": 579,
        "total_tokens": 1781
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000528
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
    "expected": 1,
    "observed": 1
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "ec2015b1eca0857d3f4bbc0065c54377d81643b914bd603c2ab399161f2c28bc",
    "expected_values": [
      "ec2015b1eca0857d3f4bbc0065c54377d81643b914bd603c2ab399161f2c28bc"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "0c10f4df138d1a4a879ee1ca0e9aa788f9246d0acb4a47b54e5818fcc8b508a8",
    "expected": "0c10f4df138d1a4a879ee1ca0e9aa788f9246d0acb4a47b54e5818fcc8b508a8"
  },
  {
    "check_id": "numeric_fields_student_profile",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "student_profile",
    "numeric_columns": [
      "at_risk_score",
      "avg_score",
      "engagement_score",
      "previous_attempt_count"
    ],
    "numeric_summaries": {
      "at_risk_score": {
        "count": 1,
        "min": 2,
        "max": 2
      },
      "avg_score": {
        "count": 1,
        "min": 36.666666666666664,
        "max": 36.666666666666664
      },
      "engagement_score": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "previous_attempt_count": {
        "count": 1,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_student_profile",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "student_profile",
    "flag_columns": [
      "at_risk_score",
      "at_risk_label"
    ],
    "triggered_like_counts": {
      "at_risk_score": 0,
      "at_risk_label": 0
    }
  }
]
```
