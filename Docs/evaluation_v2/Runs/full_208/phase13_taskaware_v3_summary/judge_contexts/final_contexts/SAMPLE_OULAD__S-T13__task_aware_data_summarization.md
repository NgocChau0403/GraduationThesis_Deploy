# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T13__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T13__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T13",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T13.json",
      "artifact_sha256": "b1772902aa8b199ec2800c8504de0f6f1c5ba1cdf36dc8e61c650b6c7eb8a145",
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
  "evidence_artifact_file_sha256": "b1772902aa8b199ec2800c8504de0f6f1c5ba1cdf36dc8e61c650b6c7eb8a145",
  "evidence_rows_sha256": "089e746712e922619a14c0564458269d0f52a662ccec3a3dccae5b393362cfac",
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
  "embedded_datasets_sha256": "089e746712e922619a14c0564458269d0f52a662ccec3a3dccae5b393362cfac",
  "datasets": {
    "synthesis_data": [
      {
        "avg_score": 94.34,
        "performance_trend": -0.7187500000000001,
        "engagement_score": 0.20237855036820618,
        "engagement_score_available": true,
        "absence_rate": null,
        "lifestyle_risk_score": null,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "at_risk_score": 3,
        "at_risk_label": "high"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T13__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "29709fa2a6ee838b766d920d4831919fb31546dce8785eb3074b50bf6a77e3b9",
  "generator_input_sha256": "f116b1ae2dbc227f92f2a3b024c7e6d082be662ad74e3014883befacf93589bc",
  "generator_input_compact": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847915613_675e4a46",
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
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
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
  "raw_text": "Summary: You have two important actions to focus on that can help you improve your academic journey. These actions are designed to provide you with support and reflection opportunities.\n\nInsights: Advisor Check-In: Requesting a short advisor check-in is a high-priority action that allows you to review your current situation and decide on the next steps for support. This is based on your high at-risk score of 3 and the high-risk label, indicating a need for immediate attention. | Review Assessment Feedback: Taking time to review feedback from your recent assessments and identifying one change to apply next week is a medium-priority action. This will help you reflect on your performance trend, which shows a decline.\n\nWarnings: Conflicting evidence was detected and must remain visible in the generated explanation.",
  "structured_payload": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847915613_675e4a46",
    "explanation": {
      "summary": "You have two important actions to focus on that can help you improve your academic journey. These actions are designed to provide you with support and reflection opportunities.",
      "insights": [
        {
          "title": "Advisor Check-In",
          "description": "Requesting a short advisor check-in is a high-priority action that allows you to review your current situation and decide on the next steps for support. This is based on your high at-risk score of 3 and the high-risk label, indicating a need for immediate attention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "high at-risk score indicates a need for support"
            },
            {
              "metric": "at_risk_label",
              "value": "high",
              "comparison": "baseline",
              "delta": null,
              "context": "high-risk label suggests urgency"
            }
          ]
        },
        {
          "title": "Review Assessment Feedback",
          "description": "Taking time to review feedback from your recent assessments and identifying one change to apply next week is a medium-priority action. This will help you reflect on your performance trend, which shows a decline.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "negative trend indicates a need for improvement"
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": [
        "Conflicting evidence was detected and must remain visible in the generated explanation."
      ]
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
    "ai_summary_version": "v3-experimental",
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
    "baseline_reference_tokens": 111,
    "task_aware_prompt_tokens": 1275,
    "token_ratio": 11.4865,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.unsupported_actions",
      "action_evidence.action_evidence_links",
      "action_evidence.prioritized_actions",
      "comparison.conflicting_evidence",
      "primary_finding.rule_evaluations"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (11.4865 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6287,
      "token_usage": {
        "prompt_tokens": 2934,
        "completion_tokens": 426,
        "total_tokens": 3360
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000696
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T13__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "29709fa2a6ee838b766d920d4831919fb31546dce8785eb3074b50bf6a77e3b9",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2934,
      "completion_tokens": 426,
      "total_tokens": 3360
    },
    "latency_ms": 6300,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847915613_675e4a46",
    "explanation": {
      "summary": "You have two important actions to focus on that can help you improve your academic journey. These actions are designed to provide you with support and reflection opportunities.",
      "insights": [
        {
          "title": "Advisor Check-In",
          "description": "Requesting a short advisor check-in is a high-priority action that allows you to review your current situation and decide on the next steps for support. This is based on your high at-risk score of 3 and the high-risk label, indicating a need for immediate attention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "high at-risk score indicates a need for support"
            },
            {
              "metric": "at_risk_label",
              "value": "high",
              "comparison": "baseline",
              "delta": null,
              "context": "high-risk label suggests urgency"
            }
          ]
        },
        {
          "title": "Review Assessment Feedback",
          "description": "Taking time to review feedback from your recent assessments and identifying one change to apply next week is a medium-priority action. This will help you reflect on your performance trend, which shows a decline.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "negative trend indicates a need for improvement"
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": [
        "Conflicting evidence was detected and must remain visible in the generated explanation."
      ]
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
    "ai_summary_version": "v3-experimental",
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
    "baseline_reference_tokens": 111,
    "task_aware_prompt_tokens": 1275,
    "token_ratio": 11.4865,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.unsupported_actions",
      "action_evidence.action_evidence_links",
      "action_evidence.prioritized_actions",
      "comparison.conflicting_evidence",
      "primary_finding.rule_evaluations"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (11.4865 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6287,
      "token_usage": {
        "prompt_tokens": 2934,
        "completion_tokens": 426,
        "total_tokens": 3360
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000696
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
    "observed": "b1772902aa8b199ec2800c8504de0f6f1c5ba1cdf36dc8e61c650b6c7eb8a145",
    "expected_values": [
      "b1772902aa8b199ec2800c8504de0f6f1c5ba1cdf36dc8e61c650b6c7eb8a145"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "089e746712e922619a14c0564458269d0f52a662ccec3a3dccae5b393362cfac",
    "expected": "089e746712e922619a14c0564458269d0f52a662ccec3a3dccae5b393362cfac"
  },
  {
    "check_id": "numeric_fields_synthesis_data",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "numeric_columns": [
      "at_risk_score",
      "avg_score",
      "engagement_score",
      "pass_threshold",
      "performance_trend",
      "score_scale",
      "target_threshold"
    ],
    "numeric_summaries": {
      "at_risk_score": {
        "count": 1,
        "min": 3,
        "max": 3
      },
      "avg_score": {
        "count": 1,
        "min": 94.34,
        "max": 94.34
      },
      "engagement_score": {
        "count": 1,
        "min": 0.20237855036820618,
        "max": 0.20237855036820618
      },
      "pass_threshold": {
        "count": 1,
        "min": 40,
        "max": 40
      },
      "performance_trend": {
        "count": 1,
        "min": -0.7187500000000001,
        "max": -0.7187500000000001
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
