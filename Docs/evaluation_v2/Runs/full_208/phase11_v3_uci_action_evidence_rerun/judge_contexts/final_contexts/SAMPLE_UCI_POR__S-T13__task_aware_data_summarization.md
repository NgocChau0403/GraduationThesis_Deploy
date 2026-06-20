# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T13__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T13__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
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
  "evaluation_status": "complete",
  "supported_action_count": 2,
  "supported_actions": [
    {
      "action_id": "student_set_next_score_target",
      "action_text": "Choose one upcoming assessment goal and schedule two focused study sessions toward the stated target threshold.",
      "priority": "medium",
      "owner": "student",
      "time_horizon_days": 7,
      "support_category": "study_planning",
      "claim_limits": [
        "Do not promise that the action will achieve the target.",
        "Preserve the runtime threshold values and score scale."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "S-T13-R02",
      "trigger_evidence": {
        "all": [
          {
            "evidence_id": "avg_score",
            "operator": "gte",
            "observed_value": 41.25,
            "expected_value": 40,
            "compare_to_evidence_id": "pass_threshold",
            "result": true
          },
          {
            "evidence_id": "avg_score",
            "operator": "lt",
            "observed_value": 41.25,
            "expected_value": 70,
            "compare_to_evidence_id": "target_threshold",
            "result": true
          }
        ],
        "any": []
      }
    },
    {
      "action_id": "student_create_attendance_routine",
      "action_text": "Plan next week's attendance in advance and set a reminder for each scheduled learning session.",
      "priority": "medium",
      "owner": "student",
      "time_horizon_days": 7,
      "support_category": "attendance",
      "claim_limits": [
        "Do not infer the reason for absence.",
        "Do not trigger when absence_rate is null."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "S-T13-R05",
      "trigger_evidence": {
        "all": [
          {
            "evidence_id": "absence_rate",
            "operator": "gte",
            "observed_value": 1,
            "expected_value": 0.25,
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
            "observed_value": 41.25,
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
      "status": "triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "avg_score",
            "operator": "gte",
            "observed_value": 41.25,
            "expected_value": 40,
            "compare_to_evidence_id": "pass_threshold",
            "result": true
          },
          {
            "evidence_id": "avg_score",
            "operator": "lt",
            "observed_value": 41.25,
            "expected_value": 70,
            "compare_to_evidence_id": "target_threshold",
            "result": true
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
      "status": "not_triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "performance_trend",
            "operator": "lt",
            "observed_value": 27.5,
            "expected_value": 0,
            "compare_to_evidence_id": null,
            "result": false
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
            "observed_value": false,
            "expected_value": null,
            "compare_to_evidence_id": null,
            "result": false
          },
          {
            "evidence_id": "engagement_score",
            "operator": "lt",
            "observed_value": 0,
            "expected_value": 0.15,
            "compare_to_evidence_id": null,
            "result": true
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
      "status": "triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "absence_rate",
            "operator": "gte",
            "observed_value": 1,
            "expected_value": 0.25,
            "compare_to_evidence_id": null,
            "result": true
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
      "status": "not_triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "at_risk_score",
            "operator": "gte",
            "observed_value": 1,
            "expected_value": 3,
            "compare_to_evidence_id": null,
            "result": false
          },
          {
            "evidence_id": "at_risk_label",
            "operator": "eq",
            "observed_value": "low",
            "expected_value": "high",
            "compare_to_evidence_id": null,
            "result": false
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
      "status": "not_triggered",
      "behavior": "preserve_and_warn",
      "conditions": {
        "all": [
          {
            "evidence_id": "avg_score",
            "operator": "gte",
            "observed_value": 41.25,
            "expected_value": 70,
            "compare_to_evidence_id": "target_threshold",
            "result": false
          },
          {
            "evidence_id": "at_risk_label",
            "operator": "eq",
            "observed_value": "low",
            "expected_value": "high",
            "compare_to_evidence_id": null,
            "result": false
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/regenerated_action_explanations/SAMPLE_UCI_POR__S-T13__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "ae1ebab73e7b5baba7c635a106ad2c3d28443e5b6bb6eeb72a968412e52c69d9",
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
  "raw_text": "Summary: You have two important actions to focus on in the coming week to enhance your attendance and study planning. These actions are designed to help you stay organized and set clear goals.\nAttendance Planning: Planning next week's attendance in advance and setting reminders can help you manage your learning sessions effectively. Your current absence rate is 1.0, indicating a need for improvement in attendance.\nSetting Study Goals: Choosing an upcoming assessment goal and scheduling focused study sessions can help you aim for improvement. Your average score is currently 41.25, with a target threshold of 70, indicating a significant opportunity for growth.",
  "structured_payload": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847244412_fccd48cb",
    "explanation": {
      "summary": "You have two important actions to focus on in the coming week to enhance your attendance and study planning. These actions are designed to help you stay organized and set clear goals.",
      "insights": [
        {
          "title": "Attendance Planning",
          "description": "Planning next week's attendance in advance and setting reminders can help you manage your learning sessions effectively. Your current absence rate is 1.0, indicating a need for improvement in attendance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "absence_rate",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "This action is linked to rule S-T13-R05."
            }
          ]
        },
        {
          "title": "Setting Study Goals",
          "description": "Choosing an upcoming assessment goal and scheduling focused study sessions can help you aim for improvement. Your average score is currently 41.25, with a target threshold of 70, indicating a significant opportunity for growth.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 41.25,
              "comparison": "baseline",
              "delta": null,
              "context": "This action is linked to rule S-T13-R02."
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
      "latency_ms": 7234,
      "token_usage": {
        "prompt_tokens": 2823,
        "completion_tokens": 350,
        "total_tokens": 3173
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000633
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/regenerated_action_explanations/SAMPLE_UCI_POR__S-T13__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "ae1ebab73e7b5baba7c635a106ad2c3d28443e5b6bb6eeb72a968412e52c69d9",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2823,
      "completion_tokens": 350,
      "total_tokens": 3173
    },
    "latency_ms": 7234,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T13",
    "execution_id": "exec_1781847244412_fccd48cb",
    "explanation": {
      "summary": "You have two important actions to focus on in the coming week to enhance your attendance and study planning. These actions are designed to help you stay organized and set clear goals.",
      "insights": [
        {
          "title": "Attendance Planning",
          "description": "Planning next week's attendance in advance and setting reminders can help you manage your learning sessions effectively. Your current absence rate is 1.0, indicating a need for improvement in attendance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "absence_rate",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "This action is linked to rule S-T13-R05."
            }
          ]
        },
        {
          "title": "Setting Study Goals",
          "description": "Choosing an upcoming assessment goal and scheduling focused study sessions can help you aim for improvement. Your average score is currently 41.25, with a target threshold of 70, indicating a significant opportunity for growth.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 41.25,
              "comparison": "baseline",
              "delta": null,
              "context": "This action is linked to rule S-T13-R02."
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
      "latency_ms": 7234,
      "token_usage": {
        "prompt_tokens": 2823,
        "completion_tokens": 350,
        "total_tokens": 3173
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000633
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
