# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-C03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-C03__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-C03",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
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

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "risk_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C03.json",
      "artifact_sha256": "2886031e4c40c8c932fa9581baab3d88ed9987ec9c8c020a8012156ac728c097",
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
  "evidence_artifact_file_sha256": "2886031e4c40c8c932fa9581baab3d88ed9987ec9c8c020a8012156ac728c097",
  "evidence_rows_sha256": "ecd7a189ead0466145858cd6ea1340facb7bd13e36eb9ac70955f280c0dd89fd",
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
  "embedded_datasets_sha256": "ecd7a189ead0466145858cd6ea1340facb7bd13e36eb9ac70955f280c0dd89fd",
  "datasets": {
    "risk_comparison": [
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "avg_score": 91.2,
        "performance_trend": -0.7187500000000001,
        "punctuality_rate": 0,
        "engagement_score": 0.20237855036820618,
        "previous_attempt_count": 1,
        "flag_low_score": 0,
        "flag_repeated": 1,
        "flag_low_engagement": 0,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "final_outcome": "Distinction"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_101700",
        "avg_score": null,
        "performance_trend": null,
        "punctuality_rate": 1,
        "engagement_score": 0,
        "previous_attempt_count": 0,
        "flag_low_score": 0,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 0,
        "flag_neg_trend": 0,
        "at_risk_score": 1,
        "at_risk_label": "low",
        "final_outcome": "Withdrawn"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C03__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "f47759069d163c65d8bb7d36239f1c7a951e313ab87396329aed982d61bb91f0",
  "generator_input_sha256": "46bb929e4b1647d00ece6c895a7942e2063a3e3c6feae4adcea4d7f08c5088f9",
  "generator_input_compact": {
    "task_id": "A-C03",
    "execution_id": "exec_1781847654667_8969677c",
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
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
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
  "raw_text": "Summary: The analysis reveals that SAMPLE_OULAD_STU_100788 is at a higher risk compared to SAMPLE_OULAD_STU_101700, despite having a higher average score. The flags indicate significant concerns regarding engagement and punctuality for both students.\n\nInsights: High Risk Identification: SAMPLE_OULAD_STU_100788 has an at risk score of 3, categorized as high risk, while SAMPLE_OULAD_STU_101700 has an at risk score of 1, categorized as low risk. This indicates a significant difference in their risk profiles. | Engagement and Punctuality Flags: SAMPLE_OULAD_STU_100788 has flags indicating low punctuality and a negative performance trend, while SAMPLE_OULAD_STU_101700 shows low engagement but has a perfect punctuality rate. This suggests that while both students face challenges, the first student has more critical issues.\n\nEducational implications: Students with higher at risk scores require immediate intervention to address their academic and engagement challenges.\n\nRecommendations: high - Implement targeted support strategies for SAMPLE_OULAD_STU_100788 to improve engagement and punctuality. - Given the high at risk score and multiple flags, immediate action is necessary to prevent further decline in performance.",
  "structured_payload": {
    "task_id": "A-C03",
    "execution_id": "exec_1781847654667_8969677c",
    "explanation": {
      "summary": "The analysis reveals that SAMPLE_OULAD_STU_100788 is at a higher risk compared to SAMPLE_OULAD_STU_101700, despite having a higher average score. The flags indicate significant concerns regarding engagement and punctuality for both students.",
      "insights": [
        {
          "title": "High Risk Identification",
          "description": "SAMPLE_OULAD_STU_100788 has an at risk score of 3, categorized as high risk, while SAMPLE_OULAD_STU_101700 has an at risk score of 1, categorized as low risk. This indicates a significant difference in their risk profiles.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_100788"
            },
            {
              "metric": "at_risk_score",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_101700"
            }
          ]
        },
        {
          "title": "Engagement and Punctuality Flags",
          "description": "SAMPLE_OULAD_STU_100788 has flags indicating low punctuality and a negative performance trend, while SAMPLE_OULAD_STU_101700 shows low engagement but has a perfect punctuality rate. This suggests that while both students face challenges, the first student has more critical issues.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_low_punctuality",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_100788"
            },
            {
              "metric": "flag_low_engagement",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_101700"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students with higher at risk scores require immediate intervention to address their academic and engagement challenges."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support strategies for SAMPLE_OULAD_STU_100788 to improve engagement and punctuality.",
          "rationale": "Given the high at risk score and multiple flags, immediate action is necessary to prevent further decline in performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is complete and allows for a clear comparison of risk profiles.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7038,
      "token_usage": {
        "prompt_tokens": 1009,
        "completion_tokens": 605,
        "total_tokens": 1614
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000514
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C03__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "f47759069d163c65d8bb7d36239f1c7a951e313ab87396329aed982d61bb91f0",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1009,
      "completion_tokens": 605,
      "total_tokens": 1614
    },
    "latency_ms": 7047,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C03",
    "execution_id": "exec_1781847654667_8969677c",
    "explanation": {
      "summary": "The analysis reveals that SAMPLE_OULAD_STU_100788 is at a higher risk compared to SAMPLE_OULAD_STU_101700, despite having a higher average score. The flags indicate significant concerns regarding engagement and punctuality for both students.",
      "insights": [
        {
          "title": "High Risk Identification",
          "description": "SAMPLE_OULAD_STU_100788 has an at risk score of 3, categorized as high risk, while SAMPLE_OULAD_STU_101700 has an at risk score of 1, categorized as low risk. This indicates a significant difference in their risk profiles.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_100788"
            },
            {
              "metric": "at_risk_score",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_101700"
            }
          ]
        },
        {
          "title": "Engagement and Punctuality Flags",
          "description": "SAMPLE_OULAD_STU_100788 has flags indicating low punctuality and a negative performance trend, while SAMPLE_OULAD_STU_101700 shows low engagement but has a perfect punctuality rate. This suggests that while both students face challenges, the first student has more critical issues.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_low_punctuality",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_100788"
            },
            {
              "metric": "flag_low_engagement",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "SAMPLE_OULAD_STU_101700"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students with higher at risk scores require immediate intervention to address their academic and engagement challenges."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support strategies for SAMPLE_OULAD_STU_100788 to improve engagement and punctuality.",
          "rationale": "Given the high at risk score and multiple flags, immediate action is necessary to prevent further decline in performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is complete and allows for a clear comparison of risk profiles.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7038,
      "token_usage": {
        "prompt_tokens": 1009,
        "completion_tokens": 605,
        "total_tokens": 1614
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000514
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
    "observed": "2886031e4c40c8c932fa9581baab3d88ed9987ec9c8c020a8012156ac728c097",
    "expected_values": [
      "2886031e4c40c8c932fa9581baab3d88ed9987ec9c8c020a8012156ac728c097"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "ecd7a189ead0466145858cd6ea1340facb7bd13e36eb9ac70955f280c0dd89fd",
    "expected": "ecd7a189ead0466145858cd6ea1340facb7bd13e36eb9ac70955f280c0dd89fd"
  },
  {
    "check_id": "numeric_fields_risk_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "risk_comparison",
    "numeric_columns": [
      "at_risk_score",
      "engagement_score",
      "flag_low_engagement",
      "flag_low_punctuality",
      "flag_low_score",
      "flag_neg_trend",
      "flag_repeated",
      "previous_attempt_count",
      "punctuality_rate",
      "avg_score",
      "performance_trend"
    ],
    "numeric_summaries": {
      "at_risk_score": {
        "count": 2,
        "min": 1,
        "max": 3
      },
      "engagement_score": {
        "count": 2,
        "min": 0,
        "max": 0.20237855036820618
      },
      "flag_low_engagement": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "flag_low_punctuality": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "flag_low_score": {
        "count": 2,
        "min": 0,
        "max": 0
      },
      "flag_neg_trend": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "flag_repeated": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "previous_attempt_count": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "punctuality_rate": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "avg_score": {
        "count": 1,
        "min": 91.2,
        "max": 91.2
      },
      "performance_trend": {
        "count": 1,
        "min": -0.7187500000000001,
        "max": -0.7187500000000001
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
