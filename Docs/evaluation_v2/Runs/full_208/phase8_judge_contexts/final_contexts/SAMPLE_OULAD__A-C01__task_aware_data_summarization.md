# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-C01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-C01__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-C01",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Compare performance trajectories",
  "scope": "2 students",
  "actionable_question": "Which student is improving faster and when did their paths diverge?",
  "target_audience": "instructor",
  "ai_summary_type": "trend_comparison",
  "ai_prompt_hint": "Explain divergence points. Identify when one student fell behind relative to the other.",
  "query_labels": [
    "trajectory_comparison"
  ],
  "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
  "source_tables": [
    "assessment_result",
    "assessment",
    "enrollment"
  ],
  "key_db_fields": [
    "score_normalized",
    "assessment_order",
    "week_of_class",
    "assessment_type"
  ],
  "output_schema": {},
  "query_labels": [
    "trajectory_comparison"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-C01-CORE-01",
      "description": "Explain divergence points."
    },
    {
      "requirement_id": "A-C01-CORE-02",
      "description": "Identify when one student fell behind relative to the other."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-C01-CONSTRAINT-01",
      "description": "If either student's data is absent or insufficient for trajectory comparison, state that explicitly rather than inferring from the other student's data."
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
      "dataset_label": "trajectory_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C01.json",
      "artifact_sha256": "692c12fd575f64312163abb3e9a2aa01f9aae8cdde11ff1c9576015aacb284fa",
      "row_count": 17,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 17,
  "prompt_embedded_row_count": 17,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "692c12fd575f64312163abb3e9a2aa01f9aae8cdde11ff1c9576015aacb284fa",
  "evidence_rows_sha256": "48785f01cc655aee0006da16c0f2fe2c34556221cdeadf57e740967a5256dcf2",
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
  "full_result_row_count": 17,
  "embedded_datasets_sha256": "48785f01cc655aee0006da16c0f2fe2c34556221cdeadf57e740967a5256dcf2",
  "datasets": {
    "trajectory_comparison": [
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 1,
        "week_of_class": 3,
        "assessment_type": "TMA",
        "score_normalized": 92
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 1,
        "week_of_class": 3,
        "assessment_type": "CMA",
        "score_normalized": 100
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 2,
        "week_of_class": 7,
        "assessment_type": "TMA",
        "score_normalized": 90
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 3,
        "week_of_class": 10,
        "assessment_type": "CMA",
        "score_normalized": 87
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 3,
        "week_of_class": 14,
        "assessment_type": "TMA",
        "score_normalized": 89
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 4,
        "week_of_class": 19,
        "assessment_type": "TMA",
        "score_normalized": 61
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 5,
        "week_of_class": 21,
        "assessment_type": "CMA",
        "score_normalized": 90
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 5,
        "week_of_class": 25,
        "assessment_type": "TMA",
        "score_normalized": 87
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 6,
        "week_of_class": 34,
        "assessment_type": "CMA",
        "score_normalized": 90
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 7,
        "week_of_class": 34,
        "assessment_type": "CMA",
        "score_normalized": 92
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 8,
        "week_of_class": 34,
        "assessment_type": "CMA",
        "score_normalized": 97
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 8,
        "week_of_class": 31,
        "assessment_type": "CMA",
        "score_normalized": 83
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 9,
        "week_of_class": null,
        "assessment_type": "Exam",
        "score_normalized": 96
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 9,
        "week_of_class": 34,
        "assessment_type": "CMA",
        "score_normalized": 85
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 10,
        "week_of_class": 34,
        "assessment_type": "CMA",
        "score_normalized": 88
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 11,
        "week_of_class": 34,
        "assessment_type": "CMA",
        "score_normalized": 93
      },
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "assessment_order": 12,
        "week_of_class": 34,
        "assessment_type": "CMA",
        "score_normalized": 99
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C01__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "89c577e794be3653193a10e2beb1df1921f44595be433c6c980e8b4387500134",
  "generator_input_sha256": "6b70cc360cc22e38888aa51d6636282e95f689c38dbed4296b20d68befa80b7b",
  "generator_input_compact": {
    "task_id": "A-C01",
    "execution_id": "exec_1781847642333_fd75515e",
    "task_name": "Compare performance trajectories",
    "analysis_type": "trend",
    "explanation_strategy": "comparison",
    "actionable_question": "Which student is improving faster and when did their paths diverge?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "trajectory_comparison"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "trajectory_comparison"
    ],
    "dataset_row_counts": {
      "trajectory_comparison": 17
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_comparison",
      "metric_column": "score_normalized",
      "entity_column": null,
      "group_column": "student_id",
      "time_column": "assessment_order",
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
  "raw_text": "Summary: The analysis of the performance trajectories reveals that the student demonstrated a significant decline in scores during the later assessments, particularly in the TMA assessments. This decline indicates a divergence in performance, particularly after the fourth assessment.\n\nInsights: Divergence in Performance Trajectory: The student's performance peaked at a normalized score of 100 in the CMA assessment during week 3 but showed a notable decline to 61 in the TMA assessment by week 19. This represents a significant drop in performance, indicating a divergence in the trajectory of learning.\n\nEducational implications: The significant drop in performance suggests that the student may require additional support and intervention to address learning gaps, particularly in TMA assessments.\n\nRecommendations: high - Implement targeted tutoring sessions focused on TMA content. - To help the student recover from the performance decline and reinforce understanding of the material.",
  "structured_payload": {
    "task_id": "A-C01",
    "execution_id": "exec_1781847642333_fd75515e",
    "explanation": {
      "summary": "The analysis of the performance trajectories reveals that the student demonstrated a significant decline in scores during the later assessments, particularly in the TMA assessments. This decline indicates a divergence in performance, particularly after the fourth assessment.",
      "insights": [
        {
          "title": "Divergence in Performance Trajectory",
          "description": "The student's performance peaked at a normalized score of 100 in the CMA assessment during week 3 but showed a notable decline to 61 in the TMA assessment by week 19. This represents a significant drop in performance, indicating a divergence in the trajectory of learning.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 100,
              "comparison": "peak",
              "delta": null,
              "context": "CMA assessment in week 3"
            },
            {
              "metric": "score_normalized",
              "value": 61,
              "comparison": "down_from_previous",
              "delta": -39,
              "context": "TMA assessment in week 19"
            }
          ]
        }
      ],
      "educational_implications": [
        "The significant drop in performance suggests that the student may require additional support and intervention to address learning gaps, particularly in TMA assessments."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted tutoring sessions focused on TMA content.",
          "rationale": "To help the student recover from the performance decline and reinforce understanding of the material."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear view of the student's performance trajectory.",
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
    "full_result_row_count": 17,
    "included_row_count": 17,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "trajectory_comparison",
        "row_count": 17,
        "included_row_count": 17
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6105,
      "token_usage": {
        "prompt_tokens": 1622,
        "completion_tokens": 384,
        "total_tokens": 2006
      },
      "strategy": "comparison",
      "granularity": "per_assessment",
      "cost_usd": 0.000474
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C01__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "89c577e794be3653193a10e2beb1df1921f44595be433c6c980e8b4387500134",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1622,
      "completion_tokens": 384,
      "total_tokens": 2006
    },
    "latency_ms": 6112,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C01",
    "execution_id": "exec_1781847642333_fd75515e",
    "explanation": {
      "summary": "The analysis of the performance trajectories reveals that the student demonstrated a significant decline in scores during the later assessments, particularly in the TMA assessments. This decline indicates a divergence in performance, particularly after the fourth assessment.",
      "insights": [
        {
          "title": "Divergence in Performance Trajectory",
          "description": "The student's performance peaked at a normalized score of 100 in the CMA assessment during week 3 but showed a notable decline to 61 in the TMA assessment by week 19. This represents a significant drop in performance, indicating a divergence in the trajectory of learning.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 100,
              "comparison": "peak",
              "delta": null,
              "context": "CMA assessment in week 3"
            },
            {
              "metric": "score_normalized",
              "value": 61,
              "comparison": "down_from_previous",
              "delta": -39,
              "context": "TMA assessment in week 19"
            }
          ]
        }
      ],
      "educational_implications": [
        "The significant drop in performance suggests that the student may require additional support and intervention to address learning gaps, particularly in TMA assessments."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted tutoring sessions focused on TMA content.",
          "rationale": "To help the student recover from the performance decline and reinforce understanding of the material."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear view of the student's performance trajectory.",
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
    "full_result_row_count": 17,
    "included_row_count": 17,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "trajectory_comparison",
        "row_count": 17,
        "included_row_count": 17
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6105,
      "token_usage": {
        "prompt_tokens": 1622,
        "completion_tokens": 384,
        "total_tokens": 2006
      },
      "strategy": "comparison",
      "granularity": "per_assessment",
      "cost_usd": 0.000474
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
    "expected": 17,
    "observed": 17
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "692c12fd575f64312163abb3e9a2aa01f9aae8cdde11ff1c9576015aacb284fa",
    "expected_values": [
      "692c12fd575f64312163abb3e9a2aa01f9aae8cdde11ff1c9576015aacb284fa"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "48785f01cc655aee0006da16c0f2fe2c34556221cdeadf57e740967a5256dcf2",
    "expected": "48785f01cc655aee0006da16c0f2fe2c34556221cdeadf57e740967a5256dcf2"
  },
  {
    "check_id": "numeric_fields_trajectory_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "trajectory_comparison",
    "numeric_columns": [
      "assessment_order",
      "score_normalized",
      "week_of_class"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 17,
        "min": 1,
        "max": 12
      },
      "score_normalized": {
        "count": 17,
        "min": 61,
        "max": 100
      },
      "week_of_class": {
        "count": 16,
        "min": 3,
        "max": 34
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_trajectory_comparison",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "trajectory_comparison",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
