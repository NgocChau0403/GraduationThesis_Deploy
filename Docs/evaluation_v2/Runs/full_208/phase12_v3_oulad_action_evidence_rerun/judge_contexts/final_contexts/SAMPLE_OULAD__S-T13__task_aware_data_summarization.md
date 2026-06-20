# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T13__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T13__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T13",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
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
      "description": "Synthesise all [FE] risk signals into 3–5 prioritised actions."
    },
    {
      "requirement_id": "S-T13-CORE-02",
      "description": "Reference which FE feature triggered each item."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T13-CONSTRAINT-01",
      "description": "Do not include actions that reference signals not present in returned data."
    },
    {
      "constraint_id": "S-T13-CONSTRAINT-02",
      "description": "Do not invent risk context, urgency, or priority unsupported by returned feature-engineered signals."
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
  "applicable": true,
  "source_type": "deterministic_registry_rule_evaluation",
  "rule_set_id": "S-T13.action_synthesis",
  "rule_version": "1.0.0",
  "evaluation_status": "partial",
  "supported_action_count": 2,
  "supported_actions": [
    {
      "action_id": "student_review_recent_assessment_feedback",
      "action_text": "Review feedback from your most recent assessments and write down one change to apply next week.",
      "priority": "medium",
      "owner": "student",
      "time_horizon_days": 7,
      "support_category": "reflection",
      "claim_limits": [
        "Do not claim the slope proves future decline.",
        "Do not infer a cause for the trend."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "S-T13-R03",
      "trigger_evidence": {
        "all": [
          {
            "evidence_id": "performance_trend",
            "operator": "lt",
            "observed_value": -0.7187500000000001,
            "expected_value": 0,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      }
    },
    {
      "action_id": "student_request_advisor_check_in",
      "action_text": "Request a short advisor check-in to review the combined signals and choose the first support step.",
      "priority": "high",
      "owner": "student",
      "time_horizon_days": 3,
      "support_category": "support_coordination",
      "claim_limits": [
        "Treat the composite score as a screening signal, not a diagnosis.",
        "Do not use lifestyle_risk_score as action evidence."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "S-T13-R06",
      "trigger_evidence": {
        "all": [
          {
            "evidence_id": "at_risk_score",
            "operator": "gte",
            "observed_value": 3,
            "expected_value": 3,
            "compare_to_evidence_id": null,
            "result": true
          },
          {
            "evidence_id": "at_risk_label",
            "operator": "eq",
            "observed_value": "high",
            "expected_value": "high",
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      }
    }
  ],
  "rule_evaluations": [
    {
      "rule_id": "S-T13-R01",
      "description": "Seek immediate academic help when average score is below the runtime pass threshold.",
      "status": "not_triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "avg_score",
            "operator": "lt",
            "observed_value": 94.34,
            "expected_value": 40,
            "compare_to_evidence_id": "pass_threshold",
            "result": false
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "student_request_academic_recovery_support",
        "action_text": "Contact your tutor and make a short recovery plan for the next assessed topic.",
        "priority": "high",
        "owner": "student",
        "time_horizon_days": 3,
        "support_category": "academic_support",
        "claim_limits": [
          "Use the runtime pass threshold and score scale.",
          "Do not diagnose the reason for the low score."
        ]
      }
    },
    {
      "rule_id": "S-T13-R02",
      "description": "Set a concrete study target when score is at or above pass but below the runtime target threshold.",
      "status": "not_triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "avg_score",
            "operator": "gte",
            "observed_value": 94.34,
            "expected_value": 40,
            "compare_to_evidence_id": "pass_threshold",
            "result": true
          },
          {
            "evidence_id": "avg_score",
            "operator": "lt",
            "observed_value": 94.34,
            "expected_value": 70,
            "compare_to_evidence_id": "target_threshold",
            "result": false
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "student_set_next_score_target",
        "action_text": "Choose one upcoming assessment goal and schedule two focused study sessions toward the stated target threshold.",
        "priority": "medium",
        "owner": "student",
        "time_horizon_days": 7,
        "support_category": "study_planning",
        "claim_limits": [
          "Do not promise that the action will achieve the target.",
          "Preserve the runtime threshold values and score scale."
        ]
      }
    },
    {
      "rule_id": "S-T13-R03",
      "description": "Review recent work when the observed performance trend is negative.",
      "status": "triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "performance_trend",
            "operator": "lt",
            "observed_value": -0.7187500000000001,
            "expected_value": 0,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "student_review_recent_assessment_feedback",
        "action_text": "Review feedback from your most recent assessments and write down one change to apply next week.",
        "priority": "medium",
        "owner": "student",
        "time_horizon_days": 7,
        "support_category": "reflection",
        "claim_limits": [
          "Do not claim the slope proves future decline.",
          "Do not infer a cause for the trend."
        ]
      }
    },
    {
      "rule_id": "S-T13-R04",
      "description": "Rebuild participation routine only when engagement evidence is observed and below 0.15.",
      "status": "not_triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "engagement_score_available",
            "operator": "is_true",
            "observed_value": true,
            "expected_value": null,
            "compare_to_evidence_id": null,
            "result": true
          },
          {
            "evidence_id": "engagement_score",
            "operator": "lt",
            "observed_value": 0.20237855036820618,
            "expected_value": 0.15,
            "compare_to_evidence_id": null,
            "result": false
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "student_rebuild_engagement_routine",
        "action_text": "Schedule three short course check-ins next week and complete one course activity during each check-in.",
        "priority": "medium",
        "owner": "student",
        "time_horizon_days": 7,
        "support_category": "engagement",
        "claim_limits": [
          "Do not trigger when engagement_score_available is false.",
          "Do not claim engagement caused the student's score."
        ]
      }
    },
    {
      "rule_id": "S-T13-R05",
      "description": "Build an attendance routine when the observed absence rate is at least 25 percent.",
      "status": "unknown",
      "conditions": {
        "all": [
          {
            "evidence_id": "absence_rate",
            "operator": "gte",
            "observed_value": null,
            "expected_value": 0.25,
            "compare_to_evidence_id": null,
            "result": null
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "student_create_attendance_routine",
        "action_text": "Plan next week's attendance in advance and set a reminder for each scheduled learning session.",
        "priority": "medium",
        "owner": "student",
        "time_horizon_days": 7,
        "support_category": "attendance",
        "claim_limits": [
          "Do not infer the reason for absence.",
          "Do not trigger when absence_rate is null."
        ]
      }
    },
    {
      "rule_id": "S-T13-R06",
      "description": "Ask for advisor support when the backend composite risk score and label are both high.",
      "status": "triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "at_risk_score",
            "operator": "gte",
            "observed_value": 3,
            "expected_value": 3,
            "compare_to_evidence_id": null,
            "result": true
          },
          {
            "evidence_id": "at_risk_label",
            "operator": "eq",
            "observed_value": "high",
            "expected_value": "high",
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "student_request_advisor_check_in",
        "action_text": "Request a short advisor check-in to review the combined signals and choose the first support step.",
        "priority": "high",
        "owner": "student",
        "time_horizon_days": 3,
        "support_category": "support_coordination",
        "claim_limits": [
          "Treat the composite score as a screening signal, not a diagnosis.",
          "Do not use lifestyle_risk_score as action evidence."
        ]
      }
    }
  ],
  "conflict_evaluations": [
    {
      "conflict_id": "S-T13-C01",
      "status": "triggered",
      "behavior": "preserve_and_warn",
      "conditions": {
        "all": [
          {
            "evidence_id": "avg_score",
            "operator": "gte",
            "observed_value": 94.34,
            "expected_value": 70,
            "compare_to_evidence_id": "target_threshold",
            "result": true
          },
          {
            "evidence_id": "at_risk_label",
            "operator": "eq",
            "observed_value": "high",
            "expected_value": "high",
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      }
    }
  ]
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/regenerated_action_explanations/SAMPLE_OULAD__S-T13__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "89a14d4bc8480112037b6671654fbdc0154c7170d1d6cb83b3baca4383c643dc",
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
  "raw_text": "Summary: You have two prioritized actions to help you improve your academic performance. These actions are based on your current situation and feedback from your assessments.\nAdvisor Check-In Needed: Requesting a short advisor check-in is crucial as it will help you review your current at-risk status and decide on the best support step. You have a high at-risk score of 3, indicating a need for immediate attention.\nReflect on Assessment Feedback: Reviewing feedback from your recent assessments is important for your growth. You have a performance trend showing a decline, which suggests that making a change could be beneficial.",
  "structured_payload": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847915613_675e4a46",
    "explanation": {
      "summary": "You have two prioritized actions to help you improve your academic performance. These actions are based on your current situation and feedback from your assessments.",
      "insights": [
        {
          "title": "Advisor Check-In Needed",
          "description": "Requesting a short advisor check-in is crucial as it will help you review your current at-risk status and decide on the best support step. You have a high at-risk score of 3, indicating a need for immediate attention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "high at-risk label"
            }
          ]
        },
        {
          "title": "Reflect on Assessment Feedback",
          "description": "Reviewing feedback from your recent assessments is important for your growth. You have a performance trend showing a decline, which suggests that making a change could be beneficial.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "indicates a need for improvement"
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": [
        "Conflicting evidence is preserved; actions must be phrased with uncertainty and must not hide this conflict."
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
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "action_synthesis",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "synthesis_data",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8644,
      "token_usage": {
        "prompt_tokens": 2934,
        "completion_tokens": 364,
        "total_tokens": 3298
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000658
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/regenerated_action_explanations/SAMPLE_OULAD__S-T13__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "89a14d4bc8480112037b6671654fbdc0154c7170d1d6cb83b3baca4383c643dc",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2934,
      "completion_tokens": 364,
      "total_tokens": 3298
    },
    "latency_ms": 8644,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847915613_675e4a46",
    "explanation": {
      "summary": "You have two prioritized actions to help you improve your academic performance. These actions are based on your current situation and feedback from your assessments.",
      "insights": [
        {
          "title": "Advisor Check-In Needed",
          "description": "Requesting a short advisor check-in is crucial as it will help you review your current at-risk status and decide on the best support step. You have a high at-risk score of 3, indicating a need for immediate attention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "high at-risk label"
            }
          ]
        },
        {
          "title": "Reflect on Assessment Feedback",
          "description": "Reviewing feedback from your recent assessments is important for your growth. You have a performance trend showing a decline, which suggests that making a change could be beneficial.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "indicates a need for improvement"
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": [
        "Conflicting evidence is preserved; actions must be phrased with uncertainty and must not hide this conflict."
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
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "action_synthesis",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "synthesis_data",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8644,
      "token_usage": {
        "prompt_tokens": 2934,
        "completion_tokens": 364,
        "total_tokens": 3298
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000658
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
