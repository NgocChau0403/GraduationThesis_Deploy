# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T07__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T07__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T07",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
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

## Deterministic Derived-Stat Evidence

```json
[]
```

## Deterministic Action Evidence

```json
{
  "applicable": false,
  "source_type": "not_applicable",
  "rule_set_id": null,
  "rule_version": null,
  "evaluation_status": "not_applicable",
  "supported_action_count": 0,
  "supported_actions": [],
  "rule_evaluations": [],
  "conflict_evaluations": []
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T07__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "9f4350ea8b0be24e0014c112228168042d8cb2d4a76e212d006c2272cb249fd4",
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
  "raw_text": "Summary: The analysis of Assessment Order and Normalized Score shows a moderate negative correlation, indicating that as assessments progress, scores tend to fluctuate. This suggests that maintaining consistent engagement throughout the course is important for achieving higher scores.\n\nInsights: Score Fluctuation with Assessment Order: As the assessment order increases, the normalized scores show some variability, with a peak at the first assessment and a drop in the later assessments. This indicates that students may struggle more as the course progresses, potentially due to increased complexity or engagement issues.\n\nEducational implications: Consistent attendance and engagement are crucial for maintaining high scores throughout the course.\n\nRecommendations: high - Focus on improving attendance and participation in class. - Improving attendance can help you stay engaged with the material, which may lead to better performance in later assessments.",
  "structured_payload": {
    "task_id": "S-T07",
    "execution_id": "exec_1781847912280_3609b4b3",
    "explanation": {
      "summary": "The analysis of Assessment Order and Normalized Score shows a moderate negative correlation, indicating that as assessments progress, scores tend to fluctuate. This suggests that maintaining consistent engagement throughout the course is important for achieving higher scores.",
      "insights": [
        {
          "title": "Score Fluctuation with Assessment Order",
          "description": "As the assessment order increases, the normalized scores show some variability, with a peak at the first assessment and a drop in the later assessments. This indicates that students may struggle more as the course progresses, potentially due to increased complexity or engagement issues.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "assessment_order",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Highest score at assessment order 1"
            },
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "down_from_previous",
              "delta": -7,
              "context": "Score drop from assessment order 5 to 8"
            }
          ]
        }
      ],
      "educational_implications": [
        "Consistent attendance and engagement are crucial for maintaining high scores throughout the course."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Focus on improving attendance and participation in class.",
          "rationale": "Improving attendance can help you stay engaged with the material, which may lead to better performance in later assessments."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "MEDIUM",
      "reason": "The absence data is not available, which limits the analysis of its impact on scores.",
      "based_on": [
        "single_student"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "baseline_first_20_rows",
    "ai_summary_version": "baseline",
    "baseline_available": true,
    "input_summary_type": "raw_first_20_rows",
    "ai_summary_method_warning": null,
    "full_result_row_count": null,
    "included_row_count": null,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5298,
      "token_usage": {
        "prompt_tokens": 748,
        "completion_tokens": 375,
        "total_tokens": 1123
      },
      "strategy": "correlation",
      "granularity": "per_assessment",
      "cost_usd": 0.000337
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T07__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "9f4350ea8b0be24e0014c112228168042d8cb2d4a76e212d006c2272cb249fd4",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 748,
      "completion_tokens": 375,
      "total_tokens": 1123
    },
    "latency_ms": 5302,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T07",
    "execution_id": "exec_1781847912280_3609b4b3",
    "explanation": {
      "summary": "The analysis of Assessment Order and Normalized Score shows a moderate negative correlation, indicating that as assessments progress, scores tend to fluctuate. This suggests that maintaining consistent engagement throughout the course is important for achieving higher scores.",
      "insights": [
        {
          "title": "Score Fluctuation with Assessment Order",
          "description": "As the assessment order increases, the normalized scores show some variability, with a peak at the first assessment and a drop in the later assessments. This indicates that students may struggle more as the course progresses, potentially due to increased complexity or engagement issues.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "assessment_order",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Highest score at assessment order 1"
            },
            {
              "metric": "score_normalized",
              "value": 83,
              "comparison": "down_from_previous",
              "delta": -7,
              "context": "Score drop from assessment order 5 to 8"
            }
          ]
        }
      ],
      "educational_implications": [
        "Consistent attendance and engagement are crucial for maintaining high scores throughout the course."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Focus on improving attendance and participation in class.",
          "rationale": "Improving attendance can help you stay engaged with the material, which may lead to better performance in later assessments."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "MEDIUM",
      "reason": "The absence data is not available, which limits the analysis of its impact on scores.",
      "based_on": [
        "single_student"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "baseline_first_20_rows",
    "ai_summary_version": "baseline",
    "baseline_available": true,
    "input_summary_type": "raw_first_20_rows",
    "ai_summary_method_warning": null,
    "full_result_row_count": null,
    "included_row_count": null,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5298,
      "token_usage": {
        "prompt_tokens": 748,
        "completion_tokens": 375,
        "total_tokens": 1123
      },
      "strategy": "correlation",
      "granularity": "per_assessment",
      "cost_usd": 0.000337
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
