# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__S-T07__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T07__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T07",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Absence / inactivity impact",
  "scope": "1 student",
  "actionable_question": "How much are my absences hurting my grades?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Use absence_rate [FE] to show proportion of missed sessions. Correlate with avg_score [FE].",
  "query_labels": [
    "absence_data",
    "score_series"
  ],
  "explanation_strategy": "correlation"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "assessment_result",
    "assessment"
  ],
  "key_db_fields": [
    "absences [enrollment",
    "UCI only]; score_normalized",
    "pass_flag [assessment_result]"
  ],
  "output_schema": {
    "required_columns": [
      "assessment_order",
      "score_normalized"
    ],
    "optional_columns": [
      "week_of_class",
      "pass_flag",
      "absences",
      "absence_rate"
    ]
  },
  "query_labels": [
    "absence_data",
    "score_series"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T07-CORE-01",
      "description": "State the proportion of missed sessions."
    },
    {
      "requirement_id": "S-T07-CORE-02",
      "description": "Describe the observed association between absence rate and average score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T07-CONSTRAINT-01",
      "description": "Use absence_rate as the primary absence metric."
    },
    {
      "constraint_id": "S-T07-CONSTRAINT-02",
      "description": "Frame the absence-score relationship as correlational, not causal."
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
      "dataset_label": "absence_data",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T07.json",
      "artifact_sha256": "8a9b790ebabcf6df78c0ad0b904e88b3dff30f500b488e34a43e484e1b0036b7",
      "row_count": 1,
      "readable": true
    },
    {
      "dataset_label": "score_series",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T07.json",
      "artifact_sha256": "8a9b790ebabcf6df78c0ad0b904e88b3dff30f500b488e34a43e484e1b0036b7",
      "row_count": 5,
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
  "evidence_artifact_file_sha256": "8a9b790ebabcf6df78c0ad0b904e88b3dff30f500b488e34a43e484e1b0036b7",
  "evidence_rows_sha256": "7146ae78e0cff6996d5501a7d1e71cc4cac5ad2a7d788de503c1964a3ccee37e",
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
  "embedded_datasets_sha256": "7146ae78e0cff6996d5501a7d1e71cc4cac5ad2a7d788de503c1964a3ccee37e",
  "datasets": {
    "absence_data": [
      {
        "absences": null,
        "absence_rate": null
      }
    ],
    "score_series": [
      {
        "assessment_order": 1,
        "week_of_class": 3,
        "score_normalized": 100,
        "pass_flag": true
      },
      {
        "assessment_order": 3,
        "week_of_class": 10,
        "score_normalized": 87,
        "pass_flag": true
      },
      {
        "assessment_order": 5,
        "week_of_class": 21,
        "score_normalized": 90,
        "pass_flag": true
      },
      {
        "assessment_order": 8,
        "week_of_class": 31,
        "score_normalized": 83,
        "pass_flag": true
      },
      {
        "assessment_order": 9,
        "week_of_class": null,
        "score_normalized": 96,
        "pass_flag": true
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T07__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "1c3ee095d0e695bf6ed465a35b5a89cf61c8279ed0480f856a53d3ac84391bd5",
  "generator_input_sha256": "8bbad8d1113bbfb622c76241faa774f0840d4655460f8d00552db6206b59c2f3",
  "generator_input_compact": {
    "task_id": "S-T07",
    "execution_id": "exec_1781847912280_3609b4b3",
    "task_name": "Absence / inactivity impact",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "How much are my absences hurting my grades?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "absence_data",
      "score_series"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "absence_data",
      "score_series"
    ],
    "dataset_row_counts": {
      "absence_data": 1,
      "score_series": 5
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "score_normalized",
      "entity_column": null,
      "group_column": null,
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
  "raw_text": "Summary: The analysis of Assessment Order and Normalized Score shows a moderate negative correlation. As the assessment order increases, the normalized scores tend to decrease, indicating that later assessments may be more challenging or that students are struggling to maintain their performance over time.\n\nInsights: Score Trends Over Assessments: The normalized scores show a downward trend as the assessment order increases, with the highest score of 100 at assessment order 1 and a lower score of 83 at assessment order 8. This suggests that students may find later assessments more difficult or may be experiencing fatigue.\n\nEducational implications: Students may need additional support or resources as they progress through assessments to maintain their performance.\n\nRecommendations: high - Implement regular check-ins or support sessions for students before major assessments. - This can help address any difficulties students may face as they progress through the course and improve their overall scores.",
  "structured_payload": {
    "task_id": "S-T07",
    "execution_id": "exec_1781847912280_3609b4b3",
    "explanation": {
      "summary": "The analysis of Assessment Order and Normalized Score shows a moderate negative correlation. As the assessment order increases, the normalized scores tend to decrease, indicating that later assessments may be more challenging or that students are struggling to maintain their performance over time.",
      "insights": [
        {
          "title": "Score Trends Over Assessments",
          "description": "The normalized scores show a downward trend as the assessment order increases, with the highest score of 100 at assessment order 1 and a lower score of 83 at assessment order 8. This suggests that students may find later assessments more difficult or may be experiencing fatigue.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 100,
              "comparison": "peak",
              "delta": -17,
              "context": "from assessment order 1 to 8"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students may need additional support or resources as they progress through assessments to maintain their performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement regular check-ins or support sessions for students before major assessments.",
          "rationale": "This can help address any difficulties students may face as they progress through the course and improve their overall scores."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "MEDIUM",
      "reason": "The dataset is limited, with only a few assessments available for analysis.",
      "based_on": [
        "single_student"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
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
        "dataset_name": "absence_data",
        "row_count": 1,
        "included_row_count": 1
      },
      {
        "dataset_name": "score_series",
        "row_count": 5,
        "included_row_count": 5
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6702,
      "token_usage": {
        "prompt_tokens": 956,
        "completion_tokens": 337,
        "total_tokens": 1293
      },
      "strategy": "correlation",
      "granularity": "per_assessment",
      "cost_usd": 0.000346
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T07__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "1c3ee095d0e695bf6ed465a35b5a89cf61c8279ed0480f856a53d3ac84391bd5",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 956,
      "completion_tokens": 337,
      "total_tokens": 1293
    },
    "latency_ms": 6709,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T07",
    "execution_id": "exec_1781847912280_3609b4b3",
    "explanation": {
      "summary": "The analysis of Assessment Order and Normalized Score shows a moderate negative correlation. As the assessment order increases, the normalized scores tend to decrease, indicating that later assessments may be more challenging or that students are struggling to maintain their performance over time.",
      "insights": [
        {
          "title": "Score Trends Over Assessments",
          "description": "The normalized scores show a downward trend as the assessment order increases, with the highest score of 100 at assessment order 1 and a lower score of 83 at assessment order 8. This suggests that students may find later assessments more difficult or may be experiencing fatigue.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 100,
              "comparison": "peak",
              "delta": -17,
              "context": "from assessment order 1 to 8"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students may need additional support or resources as they progress through assessments to maintain their performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement regular check-ins or support sessions for students before major assessments.",
          "rationale": "This can help address any difficulties students may face as they progress through the course and improve their overall scores."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "MEDIUM",
      "reason": "The dataset is limited, with only a few assessments available for analysis.",
      "based_on": [
        "single_student"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
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
        "dataset_name": "absence_data",
        "row_count": 1,
        "included_row_count": 1
      },
      {
        "dataset_name": "score_series",
        "row_count": 5,
        "included_row_count": 5
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6702,
      "token_usage": {
        "prompt_tokens": 956,
        "completion_tokens": 337,
        "total_tokens": 1293
      },
      "strategy": "correlation",
      "granularity": "per_assessment",
      "cost_usd": 0.000346
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
    "observed": "8a9b790ebabcf6df78c0ad0b904e88b3dff30f500b488e34a43e484e1b0036b7",
    "expected_values": [
      "8a9b790ebabcf6df78c0ad0b904e88b3dff30f500b488e34a43e484e1b0036b7",
      "8a9b790ebabcf6df78c0ad0b904e88b3dff30f500b488e34a43e484e1b0036b7"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "7146ae78e0cff6996d5501a7d1e71cc4cac5ad2a7d788de503c1964a3ccee37e",
    "expected": "7146ae78e0cff6996d5501a7d1e71cc4cac5ad2a7d788de503c1964a3ccee37e"
  },
  {
    "check_id": "numeric_fields_absence_data",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "absence_data",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_absence_data",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "absence_data",
    "flag_columns": [],
    "triggered_like_counts": {}
  },
  {
    "check_id": "numeric_fields_score_series",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "score_series",
    "numeric_columns": [
      "assessment_order",
      "score_normalized",
      "week_of_class"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 5,
        "min": 1,
        "max": 9
      },
      "score_normalized": {
        "count": 5,
        "min": 83,
        "max": 100
      },
      "week_of_class": {
        "count": 4,
        "min": 3,
        "max": 31
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_score_series",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "score_series",
    "flag_columns": [
      "pass_flag"
    ],
    "triggered_like_counts": {
      "pass_flag": 5
    }
  }
]
```
