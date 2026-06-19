# LLM Judge V2 Final Judge Context - SAMPLE_UCI_POR__A-C01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-C01__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_UCI_POR",
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-C01.json",
      "artifact_sha256": "e4b071b75d83d7b7d78548f8105459f537483cb5175fb593e574ca8e92e3085f",
      "row_count": 6,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 6,
  "prompt_embedded_row_count": 6,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "e4b071b75d83d7b7d78548f8105459f537483cb5175fb593e574ca8e92e3085f",
  "evidence_rows_sha256": "b4dadf00d0fb4715630ba456ad834e054a676edf8c5f76a2d9f7c05077ec8b06",
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
  "full_result_row_count": 6,
  "embedded_datasets_sha256": "b4dadf00d0fb4715630ba456ad834e054a676edf8c5f76a2d9f7c05077ec8b06",
  "datasets": {
    "trajectory_comparison": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "assessment_order": 1,
        "week_of_class": 3,
        "assessment_type": "quiz",
        "score_normalized": 0
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "assessment_order": 2,
        "week_of_class": 8,
        "assessment_type": "quiz",
        "score_normalized": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "assessment_order": 3,
        "week_of_class": 14,
        "assessment_type": "exam",
        "score_normalized": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "assessment_order": 1,
        "week_of_class": 3,
        "assessment_type": "quiz",
        "score_normalized": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "assessment_order": 2,
        "week_of_class": 8,
        "assessment_type": "quiz",
        "score_normalized": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "assessment_order": 3,
        "week_of_class": 14,
        "assessment_type": "exam",
        "score_normalized": 55
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C01__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "ba625886a09ee2e2aa8b4d07837cbac623c4a78bf2558a77aeb26bc97ed70d0d",
  "generator_input_sha256": "a36d6e9a0664e0ce9c334f993a0656596ae8df114c77beafaa1f1d8c3b266968",
  "generator_input_compact": {
    "task_id": "A-C01",
    "execution_id": "exec_1781847231947_8d61eafc",
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
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "trajectory_comparison"
    ],
    "dataset_row_counts": {
      "trajectory_comparison": 6
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
  "raw_text": "Summary: The analysis of the performance trajectories of two students reveals that both students achieved the same score on their final assessments, but their paths diverged significantly earlier. Student 1 started with a lower score but showed improvement over time, while Student 2 maintained a higher initial score.\n\nInsights: Initial Performance Comparison: At the first assessment, Student 1 scored 0, while Student 2 scored 45, indicating a significant initial performance gap. | Performance Trajectory Divergence: Both students scored 55 on their second and third assessments, but Student 1's trajectory shows a significant improvement from their initial score, while Student 2's performance remained stable after the first assessment.\n\nEducational implications: The initial performance gap suggests that targeted interventions may be necessary for students starting with lower scores to help them catch up.\n\nRecommendations: high - Implement targeted support for lower-performing students early in the course. - This can help bridge the performance gap observed in the initial assessments and promote sustained improvement.",
  "structured_payload": {
    "task_id": "A-C01",
    "execution_id": "exec_1781847231947_8d61eafc",
    "explanation": {
      "summary": "The analysis of the performance trajectories of two students reveals that both students achieved the same score on their final assessments, but their paths diverged significantly earlier. Student 1 started with a lower score but showed improvement over time, while Student 2 maintained a higher initial score.",
      "insights": [
        {
          "title": "Initial Performance Comparison",
          "description": "At the first assessment, Student 1 scored 0, while Student 2 scored 45, indicating a significant initial performance gap.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Student 1's score at assessment order 1"
            },
            {
              "metric": "score_normalized",
              "value": 45,
              "comparison": "baseline",
              "delta": null,
              "context": "Student 2's score at assessment order 1"
            }
          ]
        },
        {
          "title": "Performance Trajectory Divergence",
          "description": "Both students scored 55 on their second and third assessments, but Student 1's trajectory shows a significant improvement from their initial score, while Student 2's performance remained stable after the first assessment.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "up_from_previous",
              "delta": 55,
              "context": "Student 1's score at assessment order 2 compared to assessment order 1"
            },
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "stable",
              "delta": 0,
              "context": "Student 2's score at assessment order 2 compared to assessment order 1"
            }
          ]
        }
      ],
      "educational_implications": [
        "The initial performance gap suggests that targeted interventions may be necessary for students starting with lower scores to help them catch up."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support for lower-performing students early in the course.",
          "rationale": "This can help bridge the performance gap observed in the initial assessments and promote sustained improvement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides clear performance metrics for both students.",
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
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "trajectory_comparison",
        "row_count": 6,
        "included_row_count": 6
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7503,
      "token_usage": {
        "prompt_tokens": 1008,
        "completion_tokens": 555,
        "total_tokens": 1563
      },
      "strategy": "comparison",
      "granularity": "per_assessment",
      "cost_usd": 0.000484
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C01__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "ba625886a09ee2e2aa8b4d07837cbac623c4a78bf2558a77aeb26bc97ed70d0d",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1008,
      "completion_tokens": 555,
      "total_tokens": 1563
    },
    "latency_ms": 7509,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C01",
    "execution_id": "exec_1781847231947_8d61eafc",
    "explanation": {
      "summary": "The analysis of the performance trajectories of two students reveals that both students achieved the same score on their final assessments, but their paths diverged significantly earlier. Student 1 started with a lower score but showed improvement over time, while Student 2 maintained a higher initial score.",
      "insights": [
        {
          "title": "Initial Performance Comparison",
          "description": "At the first assessment, Student 1 scored 0, while Student 2 scored 45, indicating a significant initial performance gap.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Student 1's score at assessment order 1"
            },
            {
              "metric": "score_normalized",
              "value": 45,
              "comparison": "baseline",
              "delta": null,
              "context": "Student 2's score at assessment order 1"
            }
          ]
        },
        {
          "title": "Performance Trajectory Divergence",
          "description": "Both students scored 55 on their second and third assessments, but Student 1's trajectory shows a significant improvement from their initial score, while Student 2's performance remained stable after the first assessment.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "up_from_previous",
              "delta": 55,
              "context": "Student 1's score at assessment order 2 compared to assessment order 1"
            },
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "stable",
              "delta": 0,
              "context": "Student 2's score at assessment order 2 compared to assessment order 1"
            }
          ]
        }
      ],
      "educational_implications": [
        "The initial performance gap suggests that targeted interventions may be necessary for students starting with lower scores to help them catch up."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support for lower-performing students early in the course.",
          "rationale": "This can help bridge the performance gap observed in the initial assessments and promote sustained improvement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides clear performance metrics for both students.",
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
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "trajectory_comparison",
        "row_count": 6,
        "included_row_count": 6
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7503,
      "token_usage": {
        "prompt_tokens": 1008,
        "completion_tokens": 555,
        "total_tokens": 1563
      },
      "strategy": "comparison",
      "granularity": "per_assessment",
      "cost_usd": 0.000484
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
    "expected": 6,
    "observed": 6
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "e4b071b75d83d7b7d78548f8105459f537483cb5175fb593e574ca8e92e3085f",
    "expected_values": [
      "e4b071b75d83d7b7d78548f8105459f537483cb5175fb593e574ca8e92e3085f"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "b4dadf00d0fb4715630ba456ad834e054a676edf8c5f76a2d9f7c05077ec8b06",
    "expected": "b4dadf00d0fb4715630ba456ad834e054a676edf8c5f76a2d9f7c05077ec8b06"
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
        "count": 6,
        "min": 1,
        "max": 3
      },
      "score_normalized": {
        "count": 6,
        "min": 0,
        "max": 55
      },
      "week_of_class": {
        "count": 6,
        "min": 3,
        "max": 14
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
