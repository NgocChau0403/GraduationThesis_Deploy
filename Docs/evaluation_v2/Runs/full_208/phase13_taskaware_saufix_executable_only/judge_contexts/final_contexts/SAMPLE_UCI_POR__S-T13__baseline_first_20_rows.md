# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T13__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2_PHASE13_SAUFIX_EXECUTABLE_ONLY.md`
- Prompt SHA-256: `8ae00287d6a8e9c23c769c97b4d11aa90e05e9126f8cd3e71fcef74500d6f48f`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T13__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_phase13_saufix_executable_only__SAMPLE_UCI_POR",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T13",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_phase13_saufix_action_correction_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Action plan generation",
  "scope": "1 student",
  "actionable_question": "What should I do differently starting next week?",
  "target_audience": "student",
  "ai_summary_type": "action_synthesis",
  "ai_prompt_hint": "Synthesise all [FE] risk signals into 3–5 prioritised actions. Reference which FE feature triggered each item.",
  "query_labels": [
    "synthesis_data"
  ],
  "explanation_strategy": "risk"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "student"
  ],
  "key_db_fields": [
    "[AI_SYNTHESIS] avg_score [FE cross]",
    "at_risk_score [FE cross]",
    "engagement_score [FE cross]",
    "absence_rate [FE single]",
    "performance_trend [FE cross]",
    "lifestyle_risk_score [FE single]"
  ],
  "output_schema": {},
  "query_labels": [
    "synthesis_data"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T13-CORE-01",
      "description": "Explain the supported actions already generated or exposed by the action_synthesis rule contract; do not require the explanation model to invent actions outside the returned or triggered action set."
    },
    {
      "requirement_id": "S-T13-CORE-02",
      "description": "For each supported action that is present, explain the triggering FE feature, threshold or rule evidence when available."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T13-CONSTRAINT-01",
      "description": "Do not include or endorse actions that reference signals not present in returned data or the supplied action-rule contract."
    },
    {
      "constraint_id": "S-T13-CONSTRAINT-02",
      "description": "Do not invent risk context, urgency, priority, or additional actions unsupported by returned feature-engineered signals or supported action evidence."
    },
    {
      "constraint_id": "S-T13-CONSTRAINT-03",
      "description": "If no supported action is returned or triggered, saying no supported action is available is acceptable; penalize that only when deterministic action evidence shows at least one supported action exists."
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
      "dataset_label": "synthesis_data",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T13.json",
      "artifact_sha256": "2a08d11768009472115b7a9a214f6b1876c84e1de53b92b868f70b36c8338d67",
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
  "evidence_artifact_file_sha256": "2a08d11768009472115b7a9a214f6b1876c84e1de53b92b868f70b36c8338d67",
  "evidence_rows_sha256": "ad9e8b1963af4ebb73dc148ff4c5e52096f5867a0c4401f2eceaed9accbf2463",
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
  "embedded_datasets_sha256": "ad9e8b1963af4ebb73dc148ff4c5e52096f5867a0c4401f2eceaed9accbf2463",
  "datasets": {
    "synthesis_data": [
      {
        "avg_score": 41.25,
        "performance_trend": 27.5,
        "engagement_score": 0,
        "engagement_score_available": false,
        "absence_rate": 1,
        "lifestyle_risk_score": 0.375,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "at_risk_score": 1,
        "at_risk_label": "low"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T13__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "bd03a1b6a2f666c91701c2c5d92f8eac8b3846651a9b49949a3f59f02db4a82c",
  "generator_input_sha256": "4b0c3ad28912d2a2e2de803c2ba9df356b332df027469fc263bf7beaf3692283",
  "generator_input_compact": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847244412_fccd48cb",
    "task_name": "Action plan generation",
    "analysis_type": "synthesis",
    "explanation_strategy": "risk",
    "actionable_question": "What should I do differently starting next week?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "synthesis_data"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "synthesis_data"
    ],
    "dataset_row_counts": {
      "synthesis_data": 1
    },
    "ai_summary_config_summary": {
      "summary_type": "action_synthesis",
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
  "raw_text": "Summary: You are currently showing some signs that may indicate a need for additional support. Your average score is just above the passing threshold, and your engagement score is low, which suggests there are areas to focus on for improvement.\n\nInsights: Average Score Concern: Your average score is 41.25, which is only slightly above the passing threshold of 40. This indicates that you are close to falling below the passing mark, and it may be beneficial to focus on improving your understanding of the material. | Engagement Score: Your engagement score is currently at 0, which suggests that you may not be participating as much as you could be. Increasing your engagement in class activities could help boost your performance.",
  "structured_payload": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847244412_fccd48cb",
    "explanation": {
      "summary": "You are currently showing some signs that may indicate a need for additional support. Your average score is just above the passing threshold, and your engagement score is low, which suggests there are areas to focus on for improvement.",
      "insights": [
        {
          "title": "Average Score Concern",
          "description": "Your average score is 41.25, which is only slightly above the passing threshold of 40. This indicates that you are close to falling below the passing mark, and it may be beneficial to focus on improving your understanding of the material.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 41.25,
              "comparison": "baseline",
              "delta": null,
              "context": "Just above the passing threshold"
            }
          ]
        },
        {
          "title": "Engagement Score",
          "description": "Your engagement score is currently at 0, which suggests that you may not be participating as much as you could be. Increasing your engagement in class activities could help boost your performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Indicates low participation"
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is clear and indicates specific areas for improvement.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
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
      "latency_ms": 10113,
      "token_usage": {
        "prompt_tokens": 650,
        "completion_tokens": 463,
        "total_tokens": 1113
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000375
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T13__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "bd03a1b6a2f666c91701c2c5d92f8eac8b3846651a9b49949a3f59f02db4a82c",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 650,
      "completion_tokens": 463,
      "total_tokens": 1113
    },
    "latency_ms": 10134,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847244412_fccd48cb",
    "explanation": {
      "summary": "You are currently showing some signs that may indicate a need for additional support. Your average score is just above the passing threshold, and your engagement score is low, which suggests there are areas to focus on for improvement.",
      "insights": [
        {
          "title": "Average Score Concern",
          "description": "Your average score is 41.25, which is only slightly above the passing threshold of 40. This indicates that you are close to falling below the passing mark, and it may be beneficial to focus on improving your understanding of the material.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 41.25,
              "comparison": "baseline",
              "delta": null,
              "context": "Just above the passing threshold"
            }
          ]
        },
        {
          "title": "Engagement Score",
          "description": "Your engagement score is currently at 0, which suggests that you may not be participating as much as you could be. Increasing your engagement in class activities could help boost your performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Indicates low participation"
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is clear and indicates specific areas for improvement.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
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
      "latency_ms": 10113,
      "token_usage": {
        "prompt_tokens": 650,
        "completion_tokens": 463,
        "total_tokens": 1113
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000375
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
    "observed": "2a08d11768009472115b7a9a214f6b1876c84e1de53b92b868f70b36c8338d67",
    "expected_values": [
      "2a08d11768009472115b7a9a214f6b1876c84e1de53b92b868f70b36c8338d67"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "ad9e8b1963af4ebb73dc148ff4c5e52096f5867a0c4401f2eceaed9accbf2463",
    "expected": "ad9e8b1963af4ebb73dc148ff4c5e52096f5867a0c4401f2eceaed9accbf2463"
  },
  {
    "check_id": "numeric_fields_synthesis_data",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "numeric_columns": [
      "absence_rate",
      "at_risk_score",
      "avg_score",
      "engagement_score",
      "lifestyle_risk_score",
      "pass_threshold",
      "performance_trend",
      "score_scale",
      "target_threshold"
    ],
    "numeric_summaries": {
      "absence_rate": {
        "count": 1,
        "min": 1,
        "max": 1
      },
      "at_risk_score": {
        "count": 1,
        "min": 1,
        "max": 1
      },
      "avg_score": {
        "count": 1,
        "min": 41.25,
        "max": 41.25
      },
      "engagement_score": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "lifestyle_risk_score": {
        "count": 1,
        "min": 0.375,
        "max": 0.375
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
      "score_scale": {
        "count": 1,
        "min": 100,
        "max": 100
      },
      "target_threshold": {
        "count": 1,
        "min": 70,
        "max": 70
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_synthesis_data",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "flag_columns": [
      "lifestyle_risk_score",
      "pass_threshold",
      "target_threshold",
      "at_risk_score",
      "at_risk_label"
    ],
    "triggered_like_counts": {
      "lifestyle_risk_score": 0,
      "pass_threshold": 0,
      "target_threshold": 0,
      "at_risk_score": 0,
      "at_risk_label": 0
    }
  }
]
```
