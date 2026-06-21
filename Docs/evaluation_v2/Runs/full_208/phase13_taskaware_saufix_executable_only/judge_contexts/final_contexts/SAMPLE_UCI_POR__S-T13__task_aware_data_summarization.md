# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T13__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2_PHASE13_SAUFIX_EXECUTABLE_ONLY.md`
- Prompt SHA-256: `8ae00287d6a8e9c23c769c97b4d11aa90e05e9126f8cd3e71fcef74500d6f48f`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T13__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_phase13_saufix_executable_only__SAMPLE_UCI_POR",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T13",
  "explanation_mode": "task_aware_data_summarization",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T13__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "84744dd41cddab8c880e82fc46683dbd13849ff1c727c64e90c9b09809d622bd",
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
  "raw_text": "Summary: You have two important actions to focus on in the coming week to enhance your attendance and study planning. These actions are designed to help you stay organized and set clear goals.\n\nInsights: Attendance Planning: By planning next week's attendance in advance and setting reminders, you can improve your attendance rate, which is currently at 1.0. This action is important as it directly addresses your attendance routine. | Setting Study Goals: Choosing an upcoming assessment goal and scheduling focused study sessions can help you work towards improving your average score, which is currently 41.25. This action is crucial for your academic progress.",
  "structured_payload": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847244412_fccd48cb",
    "explanation": {
      "summary": "You have two important actions to focus on in the coming week to enhance your attendance and study planning. These actions are designed to help you stay organized and set clear goals.",
      "insights": [
        {
          "title": "Attendance Planning",
          "description": "By planning next week's attendance in advance and setting reminders, you can improve your attendance rate, which is currently at 1.0. This action is important as it directly addresses your attendance routine.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "absence_rate",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "This action is linked to rule S-T13-R05, which confirms the need for attendance planning."
            }
          ]
        },
        {
          "title": "Setting Study Goals",
          "description": "Choosing an upcoming assessment goal and scheduling focused study sessions can help you work towards improving your average score, which is currently 41.25. This action is crucial for your academic progress.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 41.25,
              "comparison": "baseline",
              "delta": null,
              "context": "This action is supported by rule S-T13-R02, indicating that you are below your target threshold of 70."
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
      "reason": "The data used to generate these actions is complete and reliable.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3.1-experimental",
    "baseline_available": true,
    "input_summary_type": "action_synthesis",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "synthesis_data",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 103,
    "task_aware_prompt_tokens": 2645,
    "token_ratio": 25.6796,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "comparison.conflicting_evidence"
    ],
    "task_output_contract": [
      "Explain only actions already present in prioritized_actions or supported action-rule evidence.",
      "Do not create duplicate recommendations; explanation.recommendations may be empty by design.",
      "For every explained action, connect it to rule_evaluations, action_evidence_links, evidence_items, owner, priority, and time horizon when supplied.",
      "If no supported action exists, say that only when missing_evidence/unsupported_actions/rule output supports it."
    ],
    "must_keep_keys": [
      "action_evidence_links",
      "action_rule_set_id",
      "action_rule_version",
      "evidence_items",
      "missing_evidence",
      "prioritized_actions",
      "rule_evaluations",
      "source_datasets",
      "summarization_warnings",
      "unsupported_actions"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (25.6796 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4546,
      "token_usage": {
        "prompt_tokens": 3928,
        "completion_tokens": 368,
        "total_tokens": 4296
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.00081
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T13__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "84744dd41cddab8c880e82fc46683dbd13849ff1c727c64e90c9b09809d622bd",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 3928,
      "completion_tokens": 368,
      "total_tokens": 4296
    },
    "latency_ms": 4550,
    "attempts_used": 2
  },
  "source_response_body": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847244412_fccd48cb",
    "explanation": {
      "summary": "You have two important actions to focus on in the coming week to enhance your attendance and study planning. These actions are designed to help you stay organized and set clear goals.",
      "insights": [
        {
          "title": "Attendance Planning",
          "description": "By planning next week's attendance in advance and setting reminders, you can improve your attendance rate, which is currently at 1.0. This action is important as it directly addresses your attendance routine.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "absence_rate",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "This action is linked to rule S-T13-R05, which confirms the need for attendance planning."
            }
          ]
        },
        {
          "title": "Setting Study Goals",
          "description": "Choosing an upcoming assessment goal and scheduling focused study sessions can help you work towards improving your average score, which is currently 41.25. This action is crucial for your academic progress.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 41.25,
              "comparison": "baseline",
              "delta": null,
              "context": "This action is supported by rule S-T13-R02, indicating that you are below your target threshold of 70."
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
      "reason": "The data used to generate these actions is complete and reliable.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3.1-experimental",
    "baseline_available": true,
    "input_summary_type": "action_synthesis",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "synthesis_data",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 103,
    "task_aware_prompt_tokens": 2645,
    "token_ratio": 25.6796,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "comparison.conflicting_evidence"
    ],
    "task_output_contract": [
      "Explain only actions already present in prioritized_actions or supported action-rule evidence.",
      "Do not create duplicate recommendations; explanation.recommendations may be empty by design.",
      "For every explained action, connect it to rule_evaluations, action_evidence_links, evidence_items, owner, priority, and time horizon when supplied.",
      "If no supported action exists, say that only when missing_evidence/unsupported_actions/rule output supports it."
    ],
    "must_keep_keys": [
      "action_evidence_links",
      "action_rule_set_id",
      "action_rule_version",
      "evidence_items",
      "missing_evidence",
      "prioritized_actions",
      "rule_evaluations",
      "source_datasets",
      "summarization_warnings",
      "unsupported_actions"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (25.6796 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4546,
      "token_usage": {
        "prompt_tokens": 3928,
        "completion_tokens": 368,
        "total_tokens": 4296
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.00081
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
