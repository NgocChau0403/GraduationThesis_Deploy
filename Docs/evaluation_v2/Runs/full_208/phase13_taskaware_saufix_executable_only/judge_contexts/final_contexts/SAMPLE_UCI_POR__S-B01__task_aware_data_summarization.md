# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-B01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2_PHASE13_SAUFIX_EXECUTABLE_ONLY.md`
- Prompt SHA-256: `8ae00287d6a8e9c23c769c97b4d11aa90e05e9126f8cd3e71fcef74500d6f48f`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-B01__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_phase13_saufix_executable_only__SAMPLE_UCI_POR",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-B01",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_phase13_saufix_action_correction_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Performance overview",
  "scope": "1 student",
  "actionable_question": "How am I performing overall?",
  "target_audience": "student",
  "ai_summary_type": "metric_snapshot",
  "ai_prompt_hint": "Summarise overall score, pass/fail status, class benchmark, percentile, and the most useful next action based only on returned fields.",
  "query_labels": [
    "performance_summary"
  ],
  "explanation_strategy": "distribution"
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
    "avg_score [FE]",
    "pass_rate [FE]",
    "performance_trend [FE]",
    "final_outcome"
  ],
  "output_schema": {
    "required_columns": [
      "avg_score",
      "pass_rate",
      "performance_trend",
      "final_outcome"
    ],
    "optional_columns": [
      "class_avg_score",
      "class_median_score",
      "score_percentile",
      "unweighted_avg_score",
      "weighted_avg_score",
      "score_strategy",
      "assessment_count",
      "score_vs_class_avg",
      "cohort_size",
      "score_scale",
      "pass_threshold",
      "target_threshold",
      "performance_band"
    ]
  },
  "query_labels": [
    "performance_summary"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-B01-CORE-01",
      "description": "State the overall score and pass/fail status."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "S-B01-SUPPORT-01",
      "description": "Compare against the class benchmark when class benchmark fields are present."
    },
    {
      "requirement_id": "S-B01-SUPPORT-02",
      "description": "Report percentile standing when score_percentile is present."
    },
    {
      "requirement_id": "S-B01-SUPPORT-03",
      "description": "Suggest the most useful next action supported by returned fields."
    }
  ],
  "evaluation_constraints": [
    {
      "constraint_id": "S-B01-CONSTRAINT-01",
      "description": "Use only returned fields; do not fill missing benchmark or percentile values with invented estimates."
    },
    {
      "constraint_id": "S-B01-CONSTRAINT-02",
      "description": "If percentile data is absent, omit percentile comparison and state that it is unavailable when relevant."
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
      "dataset_label": "performance_summary",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-B01.json",
      "artifact_sha256": "40030f7a95a933eeade0de28b1cce0845f09b1c4c1d936069e73e709031c2617",
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
  "evidence_artifact_file_sha256": "40030f7a95a933eeade0de28b1cce0845f09b1c4c1d936069e73e709031c2617",
  "evidence_rows_sha256": "f1e6086e595c3de3d57c990b8532eef5a8a3673e2f6e037354091db4553e099a",
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
  "embedded_datasets_sha256": "f1e6086e595c3de3d57c990b8532eef5a8a3673e2f6e037354091db4553e099a",
  "datasets": {
    "performance_summary": [
      {
        "avg_score": 41.25,
        "pass_rate": 0.6667,
        "performance_trend": 27.5,
        "final_outcome": "Pass",
        "class_avg_score": 58.31,
        "class_median_score": 58.25,
        "score_vs_class_avg": -17.06,
        "score_percentile": 8.8,
        "cohort_size": 649,
        "unweighted_avg_score": 36.67,
        "weighted_avg_score": 41.25,
        "score_strategy": "weighted_by_assessment_weight",
        "assessment_count": 3,
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "performance_band": "passing_but_below_target"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-B01__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "bc0dc3973898bbd3c43beb01293310e25dfe42f9932093f6f6987ce896c0bc0f",
  "generator_input_sha256": "c723c977694c1679596a5c57458ecbb9e8c321ed6eddea85368e5d3fd4d65ec7",
  "generator_input_compact": {
    "task_id": "S-B01",
    "execution_id": "exec_1781847241501_c0ea232d",
    "task_name": "Performance overview",
    "analysis_type": "aggregation",
    "explanation_strategy": "distribution",
    "actionable_question": "How am I performing overall?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "performance_summary"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "performance_summary"
    ],
    "dataset_row_counts": {
      "performance_summary": 1
    },
    "ai_summary_config_summary": {
      "summary_type": "metric_snapshot",
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
  "raw_text": "Summary: You are currently passing with an average score of 41.25, which is below the class average of 58.31. While you have a pass rate of 66.67%, there is room for improvement to reach your target threshold of 70.\n\nInsights: Below Class Average: Your average score of 41.25 is significantly lower than the class average of 58.31, indicating that many of your peers are performing better. This suggests a need to focus on areas where you can improve your understanding and skills. | Low Percentile Ranking: With a score percentile of 8.8, you are in the lower range compared to your peers. This indicates that most students scored higher than you, highlighting the need for targeted study and practice.\n\nEducational implications: Focusing on improving your understanding of the material will help raise your scores and confidence.\n\nRecommendations: high - Identify specific areas of difficulty and seek additional resources or support. - Targeted help can significantly improve your performance and help you reach your goals.",
  "structured_payload": {
    "task_id": "S-B01",
    "execution_id": "exec_1781847241501_c0ea232d",
    "explanation": {
      "summary": "You are currently passing with an average score of 41.25, which is below the class average of 58.31. While you have a pass rate of 66.67%, there is room for improvement to reach your target threshold of 70.",
      "insights": [
        {
          "title": "Below Class Average",
          "description": "Your average score of 41.25 is significantly lower than the class average of 58.31, indicating that many of your peers are performing better. This suggests a need to focus on areas where you can improve your understanding and skills.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 41.25,
              "comparison": "down_from_previous",
              "delta": -17.06,
              "context": "class average score"
            }
          ]
        },
        {
          "title": "Low Percentile Ranking",
          "description": "With a score percentile of 8.8, you are in the lower range compared to your peers. This indicates that most students scored higher than you, highlighting the need for targeted study and practice.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_percentile",
              "value": 8.8,
              "comparison": "baseline",
              "delta": null,
              "context": "percentile ranking among peers"
            }
          ]
        }
      ],
      "educational_implications": [
        "Focusing on improving your understanding of the material will help raise your scores and confidence."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Identify specific areas of difficulty and seek additional resources or support.",
          "rationale": "Targeted help can significantly improve your performance and help you reach your goals."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is sufficient and accurately reflects your current performance.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3.1-experimental",
    "baseline_available": true,
    "input_summary_type": "metric_snapshot",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "performance_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 147,
    "task_aware_prompt_tokens": 899,
    "token_ratio": 6.1156,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "action_evidence.action_evidence",
      "exceptions.sensitive_context",
      "exceptions.sensitive_context_present",
      "exceptions.flag_evidence",
      "comparison.benchmark_evidence",
      "comparison.threshold_evidence"
    ],
    "task_output_contract": [],
    "must_keep_keys": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (6.1156 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5503,
      "token_usage": {
        "prompt_tokens": 1360,
        "completion_tokens": 446,
        "total_tokens": 1806
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000472
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-B01__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "bc0dc3973898bbd3c43beb01293310e25dfe42f9932093f6f6987ce896c0bc0f",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1360,
      "completion_tokens": 446,
      "total_tokens": 1806
    },
    "latency_ms": 5506,
    "attempts_used": 2
  },
  "source_response_body": {
    "task_id": "S-B01",
    "execution_id": "exec_1781847241501_c0ea232d",
    "explanation": {
      "summary": "You are currently passing with an average score of 41.25, which is below the class average of 58.31. While you have a pass rate of 66.67%, there is room for improvement to reach your target threshold of 70.",
      "insights": [
        {
          "title": "Below Class Average",
          "description": "Your average score of 41.25 is significantly lower than the class average of 58.31, indicating that many of your peers are performing better. This suggests a need to focus on areas where you can improve your understanding and skills.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 41.25,
              "comparison": "down_from_previous",
              "delta": -17.06,
              "context": "class average score"
            }
          ]
        },
        {
          "title": "Low Percentile Ranking",
          "description": "With a score percentile of 8.8, you are in the lower range compared to your peers. This indicates that most students scored higher than you, highlighting the need for targeted study and practice.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_percentile",
              "value": 8.8,
              "comparison": "baseline",
              "delta": null,
              "context": "percentile ranking among peers"
            }
          ]
        }
      ],
      "educational_implications": [
        "Focusing on improving your understanding of the material will help raise your scores and confidence."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Identify specific areas of difficulty and seek additional resources or support.",
          "rationale": "Targeted help can significantly improve your performance and help you reach your goals."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is sufficient and accurately reflects your current performance.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3.1-experimental",
    "baseline_available": true,
    "input_summary_type": "metric_snapshot",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "performance_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 147,
    "task_aware_prompt_tokens": 899,
    "token_ratio": 6.1156,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "action_evidence.action_evidence",
      "exceptions.sensitive_context",
      "exceptions.sensitive_context_present",
      "exceptions.flag_evidence",
      "comparison.benchmark_evidence",
      "comparison.threshold_evidence"
    ],
    "task_output_contract": [],
    "must_keep_keys": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (6.1156 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5503,
      "token_usage": {
        "prompt_tokens": 1360,
        "completion_tokens": 446,
        "total_tokens": 1806
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000472
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
    "observed": "40030f7a95a933eeade0de28b1cce0845f09b1c4c1d936069e73e709031c2617",
    "expected_values": [
      "40030f7a95a933eeade0de28b1cce0845f09b1c4c1d936069e73e709031c2617"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "f1e6086e595c3de3d57c990b8532eef5a8a3673e2f6e037354091db4553e099a",
    "expected": "f1e6086e595c3de3d57c990b8532eef5a8a3673e2f6e037354091db4553e099a"
  },
  {
    "check_id": "numeric_fields_performance_summary",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "performance_summary",
    "numeric_columns": [
      "assessment_count",
      "avg_score",
      "class_avg_score",
      "class_median_score",
      "cohort_size",
      "pass_rate",
      "pass_threshold",
      "performance_trend",
      "score_percentile",
      "score_scale",
      "score_vs_class_avg",
      "target_threshold",
      "unweighted_avg_score",
      "weighted_avg_score"
    ],
    "numeric_summaries": {
      "assessment_count": {
        "count": 1,
        "min": 3,
        "max": 3
      },
      "avg_score": {
        "count": 1,
        "min": 41.25,
        "max": 41.25
      },
      "class_avg_score": {
        "count": 1,
        "min": 58.31,
        "max": 58.31
      },
      "class_median_score": {
        "count": 1,
        "min": 58.25,
        "max": 58.25
      },
      "cohort_size": {
        "count": 1,
        "min": 649,
        "max": 649
      },
      "pass_rate": {
        "count": 1,
        "min": 0.6667,
        "max": 0.6667
      },
      "pass_threshold": {
        "count": 1,
        "min": 40,
        "max": 40
      },
      "performance_trend": {
        "count": 1,
        "min": 27.5,
        "max": 27.5
      },
      "score_percentile": {
        "count": 1,
        "min": 8.8,
        "max": 8.8
      },
      "score_scale": {
        "count": 1,
        "min": 100,
        "max": 100
      },
      "score_vs_class_avg": {
        "count": 1,
        "min": -17.06,
        "max": -17.06
      },
      "target_threshold": {
        "count": 1,
        "min": 70,
        "max": 70
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_performance_summary",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "performance_summary",
    "flag_columns": [
      "pass_threshold",
      "target_threshold"
    ],
    "triggered_like_counts": {
      "pass_threshold": 0,
      "target_threshold": 0
    }
  }
]
```
