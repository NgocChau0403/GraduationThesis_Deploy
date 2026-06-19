# LLM Judge V2 Final Judge Context - SAMPLE_UCI_POR__S-T01__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T01__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T01",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Score trend analysis",
  "scope": "1 student",
  "actionable_question": "Am I getting better or worse over time?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Identify trend direction, assessments below pass/target thresholds, and the concrete recommended_action for the weakest recent assessment.",
  "query_labels": [
    "score_trend"
  ],
  "explanation_strategy": "trend"
}
```

## Schema Context

```json
{
  "source_tables": [
    "assessment_result",
    "assessment"
  ],
  "key_db_fields": [
    "score_normalized",
    "assessment_order",
    "week_of_class",
    "assessment_type; performance_trend [FE cross]"
  ],
  "output_schema": {
    "required_columns": [
      "assessment_order",
      "score_normalized",
      "pass_flag"
    ],
    "optional_columns": [
      "week_of_class",
      "assessment_type",
      "assessment_name",
      "class_avg_score",
      "score_vs_class_avg",
      "score_scale",
      "pass_threshold",
      "target_threshold",
      "below_pass_threshold",
      "below_target_threshold",
      "performance_trend",
      "support_level",
      "recommended_action"
    ]
  },
  "query_labels": [
    "score_trend"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T01-CORE-01",
      "description": "Identify the observed score trend direction."
    },
    {
      "requirement_id": "S-T01-CORE-02",
      "description": "Identify assessments below returned pass or target thresholds."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "S-T01-SUPPORT-01",
      "description": "Provide recommended_action for the weakest recent assessment only when that field is present."
    }
  ],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T01-CONSTRAINT-01",
      "description": "If fewer than 3 assessment data points are available, state that evidence is insufficient for a reliable trend rather than asserting a stable direction."
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
      "dataset_label": "score_trend",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T01.json",
      "artifact_sha256": "b37c65f01545c86add435353b640b163231a341b9bfdaba9715d46d90567cebb",
      "row_count": 3,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 3,
  "prompt_embedded_row_count": 3,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "b37c65f01545c86add435353b640b163231a341b9bfdaba9715d46d90567cebb",
  "evidence_rows_sha256": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9",
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
  "full_result_row_count": 3,
  "embedded_datasets_sha256": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9",
  "datasets": {
    "score_trend": [
      {
        "assessment_order": 1,
        "week_of_class": 3,
        "assessment_type": "quiz",
        "assessment_name": "G1",
        "score_normalized": 0,
        "pass_flag": false,
        "class_avg_score": 57,
        "score_vs_class_avg": -57,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": true,
        "below_target_threshold": true,
        "performance_trend": 27.5,
        "support_level": "urgent_support",
        "recommended_action": "Review this assessment with tutor support; focus on missed core concepts before the next assessment."
      },
      {
        "assessment_order": 2,
        "week_of_class": 8,
        "assessment_type": "quiz",
        "assessment_name": "G2",
        "score_normalized": 55,
        "pass_flag": true,
        "class_avg_score": 57.85,
        "score_vs_class_avg": -2.85,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": false,
        "below_target_threshold": true,
        "performance_trend": 27.5,
        "support_level": "targeted_practice",
        "recommended_action": "Practice similar questions and review feedback to move from pass-level to target-level performance."
      },
      {
        "assessment_order": 3,
        "week_of_class": 14,
        "assessment_type": "exam",
        "assessment_name": "G3",
        "score_normalized": 55,
        "pass_flag": true,
        "class_avg_score": 59.53,
        "score_vs_class_avg": -4.53,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "below_pass_threshold": false,
        "below_target_threshold": true,
        "performance_trend": 27.5,
        "support_level": "targeted_practice",
        "recommended_action": "Practice similar questions and review feedback to move from pass-level to target-level performance."
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T01__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "3a202d2ea796a42967ea870281131cb010d44ead7cb91192648e9cba71af43e1",
  "generator_input_sha256": "efd31a65b8635e4b75980598056337f73eb5a260788a5de87ef496f68560f030",
  "generator_input_compact": {
    "task_id": "S-T01",
    "execution_id": "exec_1781847241776_40422500",
    "task_name": "Score trend analysis",
    "analysis_type": "trend",
    "explanation_strategy": "trend",
    "actionable_question": "Am I getting better or worse over time?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "score_trend"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "score_trend"
    ],
    "dataset_row_counts": {
      "score_trend": 3
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "score_normalized",
      "entity_column": null,
      "group_column": null,
      "time_column": "assessment_order",
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
  "raw_text": "Summary: Your performance shows an initial struggle, but you've made some progress by Assessment 2. However, your scores have plateaued, indicating a need for further improvement.\n\nInsights: Initial Struggle in Assessment 1: In Assessment 1, you scored 0, which is significantly below the pass threshold of 40. This indicates a need for urgent support. | Improvement in Assessment 2: By Assessment 2, your score improved to 55, allowing you to pass. However, you are still below the target threshold of 70. | Plateau in Assessment 3: Your score remained at 55 in Assessment 3, indicating a plateau in performance despite passing. This suggests a need for targeted practice to reach higher scores.\n\nEducational implications: You have shown some improvement, but consistent practice and review are necessary to reach your target performance.\n\nRecommendations: high - Review Assessment 1 with tutor support to understand missed concepts. - This will help you build a stronger foundation and improve your scores in future assessments. | medium - Practice similar questions and review feedback from Assessments 2 and 3. - This will help you move from pass-level to target-level performance.",
  "structured_payload": {
    "task_id": "S-T01",
    "execution_id": "exec_1781847241776_40422500",
    "explanation": {
      "summary": "Your performance shows an initial struggle, but you've made some progress by Assessment 2. However, your scores have plateaued, indicating a need for further improvement.",
      "insights": [
        {
          "title": "Initial Struggle in Assessment 1",
          "description": "In Assessment 1, you scored 0, which is significantly below the pass threshold of 40. This indicates a need for urgent support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Assessment 1 score"
            }
          ]
        },
        {
          "title": "Improvement in Assessment 2",
          "description": "By Assessment 2, your score improved to 55, allowing you to pass. However, you are still below the target threshold of 70.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "up_from_previous",
              "delta": 55,
              "context": "Assessment 2 score"
            }
          ]
        },
        {
          "title": "Plateau in Assessment 3",
          "description": "Your score remained at 55 in Assessment 3, indicating a plateau in performance despite passing. This suggests a need for targeted practice to reach higher scores.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "stable",
              "delta": 0,
              "context": "Assessment 3 score"
            }
          ]
        }
      ],
      "educational_implications": [
        "You have shown some improvement, but consistent practice and review are necessary to reach your target performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Review Assessment 1 with tutor support to understand missed concepts.",
          "rationale": "This will help you build a stronger foundation and improve your scores in future assessments."
        },
        {
          "priority": "medium",
          "action": "Practice similar questions and review feedback from Assessments 2 and 3.",
          "rationale": "This will help you move from pass-level to target-level performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is strong with a large sample size and clear assessment results.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
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
      "latency_ms": 13551,
      "token_usage": {
        "prompt_tokens": 1324,
        "completion_tokens": 565,
        "total_tokens": 1889
      },
      "strategy": "trend",
      "granularity": "per_assessment",
      "cost_usd": 0.000538
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T01__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "3a202d2ea796a42967ea870281131cb010d44ead7cb91192648e9cba71af43e1",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1324,
      "completion_tokens": 565,
      "total_tokens": 1889
    },
    "latency_ms": 13555,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T01",
    "execution_id": "exec_1781847241776_40422500",
    "explanation": {
      "summary": "Your performance shows an initial struggle, but you've made some progress by Assessment 2. However, your scores have plateaued, indicating a need for further improvement.",
      "insights": [
        {
          "title": "Initial Struggle in Assessment 1",
          "description": "In Assessment 1, you scored 0, which is significantly below the pass threshold of 40. This indicates a need for urgent support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Assessment 1 score"
            }
          ]
        },
        {
          "title": "Improvement in Assessment 2",
          "description": "By Assessment 2, your score improved to 55, allowing you to pass. However, you are still below the target threshold of 70.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "up_from_previous",
              "delta": 55,
              "context": "Assessment 2 score"
            }
          ]
        },
        {
          "title": "Plateau in Assessment 3",
          "description": "Your score remained at 55 in Assessment 3, indicating a plateau in performance despite passing. This suggests a need for targeted practice to reach higher scores.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "stable",
              "delta": 0,
              "context": "Assessment 3 score"
            }
          ]
        }
      ],
      "educational_implications": [
        "You have shown some improvement, but consistent practice and review are necessary to reach your target performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Review Assessment 1 with tutor support to understand missed concepts.",
          "rationale": "This will help you build a stronger foundation and improve your scores in future assessments."
        },
        {
          "priority": "medium",
          "action": "Practice similar questions and review feedback from Assessments 2 and 3.",
          "rationale": "This will help you move from pass-level to target-level performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is strong with a large sample size and clear assessment results.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
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
      "latency_ms": 13551,
      "token_usage": {
        "prompt_tokens": 1324,
        "completion_tokens": 565,
        "total_tokens": 1889
      },
      "strategy": "trend",
      "granularity": "per_assessment",
      "cost_usd": 0.000538
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
    "expected": 3,
    "observed": 3
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "b37c65f01545c86add435353b640b163231a341b9bfdaba9715d46d90567cebb",
    "expected_values": [
      "b37c65f01545c86add435353b640b163231a341b9bfdaba9715d46d90567cebb"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9",
    "expected": "a353117ef230ab3a22ba2b6ebc48d618e2e4f0d885e0dc37e086ef68f695a8d9"
  },
  {
    "check_id": "numeric_fields_score_trend",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "score_trend",
    "numeric_columns": [
      "assessment_order",
      "class_avg_score",
      "pass_threshold",
      "performance_trend",
      "score_normalized",
      "score_scale",
      "score_vs_class_avg",
      "target_threshold",
      "week_of_class"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 3,
        "min": 1,
        "max": 3
      },
      "class_avg_score": {
        "count": 3,
        "min": 57,
        "max": 59.53
      },
      "pass_threshold": {
        "count": 3,
        "min": 40,
        "max": 40
      },
      "performance_trend": {
        "count": 3,
        "min": 27.5,
        "max": 27.5
      },
      "score_normalized": {
        "count": 3,
        "min": 0,
        "max": 55
      },
      "score_scale": {
        "count": 3,
        "min": 100,
        "max": 100
      },
      "score_vs_class_avg": {
        "count": 3,
        "min": -57,
        "max": -2.85
      },
      "target_threshold": {
        "count": 3,
        "min": 70,
        "max": 70
      },
      "week_of_class": {
        "count": 3,
        "min": 3,
        "max": 14
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_score_trend",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "score_trend",
    "flag_columns": [
      "pass_flag",
      "pass_threshold",
      "target_threshold",
      "below_pass_threshold",
      "below_target_threshold"
    ],
    "triggered_like_counts": {
      "pass_flag": 2,
      "pass_threshold": 0,
      "target_threshold": 0,
      "below_pass_threshold": 1,
      "below_target_threshold": 3
    }
  }
]
```
