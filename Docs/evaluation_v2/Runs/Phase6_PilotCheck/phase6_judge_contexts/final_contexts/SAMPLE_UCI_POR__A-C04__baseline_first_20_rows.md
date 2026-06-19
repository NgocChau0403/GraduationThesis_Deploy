# LLM Judge V2 Final Judge Context - SAMPLE_UCI_POR__A-C04__baseline_first_20_rows

This Phase 6.4b context is the record-level evidence package to supply with the frozen Judge Prompt V2 during pilot judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-C04__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_pilot_phase6_4",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-C04",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Compare lifestyle context",
  "scope": "2 students",
  "actionable_question": "Which lifestyle context dimensions differ most between these two students?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "multi_metric_comparison",
  "ai_prompt_hint": "Compare lifestyle_dimension rows for the two students. Highlight the largest dimension gaps. Use composite_lifestyle_risk_score and social_balance_score only as supporting context. Frame lifestyle differences as context only, not causal judgement.",
  "query_labels": [
    "lifestyle_comparison"
  ],
  "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "enrollment [UCI only]"
  ],
  "key_db_fields": [
    "student_id [FE cross]",
    "lifestyle_dimension [FE cross]",
    "lifestyle_risk_score [FE cross]",
    "alcohol_weekday",
    "alcohol_weekend",
    "go_out_freq",
    "health_status",
    "free_time",
    "composite_lifestyle_risk_score",
    "social_balance_score"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "lifestyle_dimension",
      "lifestyle_risk_score"
    ],
    "optional_columns": [
      "alcohol_weekday",
      "alcohol_weekend",
      "go_out_freq",
      "health_status",
      "free_time",
      "composite_lifestyle_risk_score",
      "social_balance_score"
    ]
  },
  "query_labels": [
    "lifestyle_comparison"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-C04-CORE-01",
      "description": "Compare lifestyle_dimension rows for the two students."
    },
    {
      "requirement_id": "A-C04-CORE-02",
      "description": "Highlight the largest dimension gaps."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "A-C04-SUPPORT-01",
      "description": "Use composite_lifestyle_risk_score and social_balance_score only as supporting context."
    }
  ],
  "evaluation_constraints": [
    {
      "constraint_id": "A-C04-CONSTRAINT-01",
      "description": "Frame lifestyle differences as context only, not causal judgement."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Applicable because this is an individual-level comparison involving lifestyle context."
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "lifestyle_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/phase6_evidence/full_query_artifacts/SAMPLE_UCI_POR__A-C04__baseline_first_20_rows.json",
      "artifact_sha256": "1ed3d8d5bd24de474ac3ad5942260f3f470bc4ab6687ed58e77cc88c5ac65942",
      "row_count": 10,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 10,
  "prompt_embedded_row_count": 10,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "1ed3d8d5bd24de474ac3ad5942260f3f470bc4ab6687ed58e77cc88c5ac65942",
  "evidence_rows_sha256": "f6bdc74e071f83e533b355dd0e6d16bda43bcf1d3738f7abc46b320ca9d721ca",
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
  "full_result_row_count": 10,
  "embedded_datasets_sha256": "f6bdc74e071f83e533b355dd0e6d16bda43bcf1d3738f7abc46b320ca9d721ca",
  "datasets": {
    "lifestyle_comparison": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "lifestyle_dimension": "weekday_alcohol",
        "lifestyle_risk_score": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.375,
        "social_balance_score": 0.025000000000000022
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "lifestyle_dimension": "weekend_alcohol",
        "lifestyle_risk_score": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.375,
        "social_balance_score": 0.025000000000000022
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "lifestyle_dimension": "go_out_frequency",
        "lifestyle_risk_score": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.375,
        "social_balance_score": 0.025000000000000022
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "lifestyle_dimension": "health_status",
        "lifestyle_risk_score": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.375,
        "social_balance_score": 0.025000000000000022
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "lifestyle_dimension": "free_time",
        "lifestyle_risk_score": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.375,
        "social_balance_score": 0.025000000000000022
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "lifestyle_dimension": "weekday_alcohol",
        "lifestyle_risk_score": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.3,
        "social_balance_score": 0.1
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "lifestyle_dimension": "weekend_alcohol",
        "lifestyle_risk_score": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.3,
        "social_balance_score": 0.1
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "lifestyle_dimension": "go_out_frequency",
        "lifestyle_risk_score": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.3,
        "social_balance_score": 0.1
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "lifestyle_dimension": "health_status",
        "lifestyle_risk_score": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.3,
        "social_balance_score": 0.1
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "lifestyle_dimension": "free_time",
        "lifestyle_risk_score": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "free_time": 3,
        "composite_lifestyle_risk_score": 0.3,
        "social_balance_score": 0.1
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_baseline/explanation_artifacts/SAMPLE_UCI_POR__A-C04__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "61aba2fb646ae738425ed8813da24900d24301ef41c0d9199cc848af0e7254fd",
  "generator_input_sha256": "ca17972d13062f59dca6b05fb033a27469efc0dff171e404e54721bb061a5622",
  "generator_input_compact": {
    "task_id": "A-C04",
    "execution_id": "exec_1781820408674_a8f78015",
    "task_name": "Compare lifestyle context",
    "analysis_type": "comparison",
    "explanation_strategy": "comparison",
    "actionable_question": "Which lifestyle context dimensions differ most between these two students?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "lifestyle_comparison"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "lifestyle_comparison"
    ],
    "dataset_row_counts": {
      "lifestyle_comparison": 10
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
      "require_sensitive_context_policy": true,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: The comparison between the two students reveals notable differences in their lifestyle dimensions, particularly in their go-out frequency and composite lifestyle risk scores. Student 1 exhibits a higher go-out frequency, which correlates with a slightly higher composite lifestyle risk score compared to Student 2.\n\nInsights: Go-Out Frequency Difference: Student 1 has a higher go-out frequency compared to Student 2, indicating a more active social lifestyle. | Composite Lifestyle Risk Score Comparison: Student 1's composite lifestyle risk score is higher than that of Student 2, suggesting a greater overall lifestyle risk.\n\nEducational implications: Understanding the differences in lifestyle dimensions can help tailor interventions to support students' health and social engagement.\n\nRecommendations: high - Encourage Student 2 to engage in more social activities to enhance their go-out frequency. - Increasing social interactions may improve their overall lifestyle balance and well-being.",
  "structured_payload": {
    "task_id": "A-C04",
    "execution_id": "exec_1781820408674_a8f78015",
    "explanation": {
      "summary": "The comparison between the two students reveals notable differences in their lifestyle dimensions, particularly in their go-out frequency and composite lifestyle risk scores. Student 1 exhibits a higher go-out frequency, which correlates with a slightly higher composite lifestyle risk score compared to Student 2.",
      "insights": [
        {
          "title": "Go-Out Frequency Difference",
          "description": "Student 1 has a higher go-out frequency compared to Student 2, indicating a more active social lifestyle.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "go_out_freq",
              "value": 4,
              "comparison": "down_from_previous",
              "delta": -1,
              "context": "Student 2 has a go-out frequency of 3."
            }
          ]
        },
        {
          "title": "Composite Lifestyle Risk Score Comparison",
          "description": "Student 1's composite lifestyle risk score is higher than that of Student 2, suggesting a greater overall lifestyle risk.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "composite_lifestyle_risk_score",
              "value": 0.375,
              "comparison": "down_from_previous",
              "delta": -0.075,
              "context": "Student 2 has a composite lifestyle risk score of 0.3."
            }
          ]
        }
      ],
      "educational_implications": [
        "Understanding the differences in lifestyle dimensions can help tailor interventions to support students' health and social engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Encourage Student 2 to engage in more social activities to enhance their go-out frequency.",
          "rationale": "Increasing social interactions may improve their overall lifestyle balance and well-being."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is consistent and provides clear metrics for comparison.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
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
      "latency_ms": 5500,
      "token_usage": {
        "prompt_tokens": 1716,
        "completion_tokens": 435,
        "total_tokens": 2151
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000518
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_baseline/explanation_artifacts/SAMPLE_UCI_POR__A-C04__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "61aba2fb646ae738425ed8813da24900d24301ef41c0d9199cc848af0e7254fd",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1716,
      "completion_tokens": 435,
      "total_tokens": 2151
    },
    "latency_ms": 5505,
    "attempts_used": null
  },
  "source_response_body": {
    "task_id": "A-C04",
    "execution_id": "exec_1781820408674_a8f78015",
    "explanation": {
      "summary": "The comparison between the two students reveals notable differences in their lifestyle dimensions, particularly in their go-out frequency and composite lifestyle risk scores. Student 1 exhibits a higher go-out frequency, which correlates with a slightly higher composite lifestyle risk score compared to Student 2.",
      "insights": [
        {
          "title": "Go-Out Frequency Difference",
          "description": "Student 1 has a higher go-out frequency compared to Student 2, indicating a more active social lifestyle.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "go_out_freq",
              "value": 4,
              "comparison": "down_from_previous",
              "delta": -1,
              "context": "Student 2 has a go-out frequency of 3."
            }
          ]
        },
        {
          "title": "Composite Lifestyle Risk Score Comparison",
          "description": "Student 1's composite lifestyle risk score is higher than that of Student 2, suggesting a greater overall lifestyle risk.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "composite_lifestyle_risk_score",
              "value": 0.375,
              "comparison": "down_from_previous",
              "delta": -0.075,
              "context": "Student 2 has a composite lifestyle risk score of 0.3."
            }
          ]
        }
      ],
      "educational_implications": [
        "Understanding the differences in lifestyle dimensions can help tailor interventions to support students' health and social engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Encourage Student 2 to engage in more social activities to enhance their go-out frequency.",
          "rationale": "Increasing social interactions may improve their overall lifestyle balance and well-being."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is consistent and provides clear metrics for comparison.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
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
      "latency_ms": 5500,
      "token_usage": {
        "prompt_tokens": 1716,
        "completion_tokens": 435,
        "total_tokens": 2151
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000518
    }
  }
}
```

## Pilot-Minimal Deterministic Checks

```json
[
  {
    "check_id": "row_count_total",
    "check_type": "row_count",
    "status": "pass",
    "expected": 10,
    "observed": 10
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "1ed3d8d5bd24de474ac3ad5942260f3f470bc4ab6687ed58e77cc88c5ac65942",
    "expected_values": [
      "1ed3d8d5bd24de474ac3ad5942260f3f470bc4ab6687ed58e77cc88c5ac65942"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "f6bdc74e071f83e533b355dd0e6d16bda43bcf1d3738f7abc46b320ca9d721ca",
    "expected": "f6bdc74e071f83e533b355dd0e6d16bda43bcf1d3738f7abc46b320ca9d721ca"
  },
  {
    "check_id": "numeric_fields_lifestyle_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "lifestyle_comparison",
    "numeric_columns": [
      "alcohol_weekday",
      "alcohol_weekend",
      "composite_lifestyle_risk_score",
      "free_time",
      "go_out_freq",
      "health_status",
      "lifestyle_risk_score",
      "social_balance_score"
    ],
    "numeric_summaries": {
      "alcohol_weekday": {
        "count": 10,
        "min": 1,
        "max": 1
      },
      "alcohol_weekend": {
        "count": 10,
        "min": 1,
        "max": 1
      },
      "composite_lifestyle_risk_score": {
        "count": 10,
        "min": 0.3,
        "max": 0.375
      },
      "free_time": {
        "count": 10,
        "min": 3,
        "max": 3
      },
      "go_out_freq": {
        "count": 10,
        "min": 3,
        "max": 4
      },
      "health_status": {
        "count": 10,
        "min": 3,
        "max": 3
      },
      "lifestyle_risk_score": {
        "count": 10,
        "min": 1,
        "max": 4
      },
      "social_balance_score": {
        "count": 10,
        "min": 0.025000000000000022,
        "max": 0.1
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_lifestyle_comparison",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "lifestyle_comparison",
    "flag_columns": [
      "lifestyle_risk_score",
      "health_status",
      "composite_lifestyle_risk_score"
    ],
    "triggered_like_counts": {
      "lifestyle_risk_score": 0,
      "health_status": 0,
      "composite_lifestyle_risk_score": 0
    }
  }
]
```
