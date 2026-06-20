# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S08__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-S08__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-S08",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Student intervention recommendation",
  "scope": "1 student",
  "actionable_question": "What should admin do for this student in the next 7 days?",
  "target_audience": "academic_advisor, admin",
  "ai_summary_type": "action_synthesis",
  "ai_prompt_hint": "Synthesise all [FE] signals into 3–5 admin actions ranked by urgency. Specify who should act (tutor / admin / counsellor) and by when.",
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
    "student",
    "assessment_result",
    "assessment",
    "engagement"
  ],
  "key_db_fields": [
    "[AI_SYNTHESIS] avg_score [FE cross]",
    "at_risk_score [FE cross]",
    "engagement_score [FE cross]",
    "punctuality_rate [FE cross]",
    "performance_trend [FE cross]",
    "early_warning_week [FE cross]",
    "support_score [FE single]"
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
      "requirement_id": "A-S08-CORE-01",
      "description": "Synthesise all [FE] signals into 3–5 admin actions ranked by urgency."
    },
    {
      "requirement_id": "A-S08-CORE-02",
      "description": "Specify who should act (tutor / admin / counsellor) and by when."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-S08-CONSTRAINT-01",
      "description": "Every proposed action and urgency level must reference returned feature-engineered signals."
    },
    {
      "constraint_id": "A-S08-CONSTRAINT-02",
      "description": "Do not invent urgency that is not supported by returned signals."
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
  "rule_set_id": "A-S08.action_synthesis",
  "rule_version": "1.0.0",
  "evaluation_status": "complete",
  "supported_action_count": 3,
  "supported_actions": [
    {
      "action_id": "staff_review_student_risk_profile",
      "action_text": "Assign an academic advisor to review the student's current risk profile and coordinate the next follow-up.",
      "priority": "high",
      "owner": "academic_advisor",
      "time_horizon_days": 2,
      "support_category": "case_coordination",
      "claim_limits": [
        "Treat the composite risk score as a screening signal, not a diagnosis.",
        "Do not use support_score to justify the action."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "A-S08-R01",
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
    },
    {
      "action_id": "staff_create_submission_support_plan",
      "action_text": "Ask the tutor to agree a short submission plan with clear upcoming deadlines and one follow-up check.",
      "priority": "high",
      "owner": "tutor",
      "time_horizon_days": 7,
      "support_category": "submission_support",
      "claim_limits": [
        "Do not infer why submissions were late.",
        "Preserve the raw punctuality value, including numeric strings."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "A-S08-R02",
      "trigger_evidence": {
        "all": [
          {
            "evidence_id": "punctuality_rate",
            "operator": "lt",
            "observed_value": "0",
            "expected_value": 0.7,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      }
    },
    {
      "action_id": "staff_review_recent_assessment_pattern",
      "action_text": "Review the student's recent assessment sequence and identify one concrete academic follow-up.",
      "priority": "medium",
      "owner": "tutor",
      "time_horizon_days": 7,
      "support_category": "academic_support",
      "claim_limits": [
        "Do not claim the negative slope proves future decline.",
        "Do not ignore conflicting positive outcome evidence."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "A-S08-R03",
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
    }
  ],
  "rule_evaluations": [
    {
      "rule_id": "A-S08-R01",
      "description": "Assign a rapid staff review when the backend composite risk score is high.",
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
        "action_id": "staff_review_student_risk_profile",
        "action_text": "Assign an academic advisor to review the student's current risk profile and coordinate the next follow-up.",
        "priority": "high",
        "owner": "academic_advisor",
        "time_horizon_days": 2,
        "support_category": "case_coordination",
        "claim_limits": [
          "Treat the composite risk score as a screening signal, not a diagnosis.",
          "Do not use support_score to justify the action."
        ]
      }
    },
    {
      "rule_id": "A-S08-R02",
      "description": "Create a submission support plan when punctuality is below 70 percent.",
      "status": "triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "punctuality_rate",
            "operator": "lt",
            "observed_value": "0",
            "expected_value": 0.7,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "staff_create_submission_support_plan",
        "action_text": "Ask the tutor to agree a short submission plan with clear upcoming deadlines and one follow-up check.",
        "priority": "high",
        "owner": "tutor",
        "time_horizon_days": 7,
        "support_category": "submission_support",
        "claim_limits": [
          "Do not infer why submissions were late.",
          "Preserve the raw punctuality value, including numeric strings."
        ]
      }
    },
    {
      "rule_id": "A-S08-R03",
      "description": "Review recent assessment changes when the observed performance trend is negative.",
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
        "action_id": "staff_review_recent_assessment_pattern",
        "action_text": "Review the student's recent assessment sequence and identify one concrete academic follow-up.",
        "priority": "medium",
        "owner": "tutor",
        "time_horizon_days": 7,
        "support_category": "academic_support",
        "claim_limits": [
          "Do not claim the negative slope proves future decline.",
          "Do not ignore conflicting positive outcome evidence."
        ]
      }
    },
    {
      "rule_id": "A-S08-R04",
      "description": "Check engagement barriers when the normalized engagement score is below 0.15.",
      "status": "not_triggered",
      "conditions": {
        "all": [
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
        "action_id": "staff_check_engagement_barriers",
        "action_text": "Contact the student to check for practical engagement barriers and agree one reachable participation step.",
        "priority": "medium",
        "owner": "student_support_team",
        "time_horizon_days": 7,
        "support_category": "engagement_support",
        "claim_limits": [
          "Do not infer the cause of low engagement.",
          "Do not claim engagement caused the student's performance."
        ]
      }
    }
  ],
  "conflict_evaluations": [
    {
      "conflict_id": "A-S08-C01",
      "status": "triggered",
      "behavior": "preserve_and_warn",
      "conditions": {
        "all": [
          {
            "evidence_id": "final_outcome",
            "operator": "eq",
            "observed_value": "Distinction",
            "expected_value": "Distinction",
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": [
          {
            "evidence_id": "at_risk_label",
            "operator": "eq",
            "observed_value": "high",
            "expected_value": "high",
            "compare_to_evidence_id": null,
            "result": true
          },
          {
            "evidence_id": "performance_trend",
            "operator": "lt",
            "observed_value": -0.7187500000000001,
            "expected_value": 0,
            "compare_to_evidence_id": null,
            "result": true
          }
        ]
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-S08.json",
      "artifact_sha256": "da7abbfd42c0ba32917b47065606de8a89e37c839454984b9beece5f80486d94",
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
  "evidence_artifact_file_sha256": "da7abbfd42c0ba32917b47065606de8a89e37c839454984b9beece5f80486d94",
  "evidence_rows_sha256": "459b368ca8b9b4b70ca088635eb5028dfcdfc702ea6d46aefb1ef3ac7e9ebf78",
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
  "embedded_datasets_sha256": "459b368ca8b9b4b70ca088635eb5028dfcdfc702ea6d46aefb1ef3ac7e9ebf78",
  "datasets": {
    "synthesis_data": [
      {
        "avg_score": 91.2,
        "performance_trend": -0.7187500000000001,
        "engagement_score": 0.20237855036820618,
        "punctuality_rate": "0",
        "early_warning_week": 0,
        "support_score": 0,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "final_outcome": "Distinction"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/regenerated_action_explanations/SAMPLE_OULAD__A-S08__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "9d2f99c399dde1aeb6bb1d4ef8a76321519170effb414bcc4f60a8e194a04d23",
  "generator_input_sha256": "9e64e3766ade560a61ec1eb5d509c684b5500606b13caeb0e4aa9329e38308fe",
  "generator_input_compact": {
    "task_id": "A-S08",
    "execution_id": "exec_1781847835786_81e0a67f",
    "task_name": "Student intervention recommendation",
    "analysis_type": "synthesis",
    "explanation_strategy": "risk",
    "actionable_question": "What should admin do for this student in the next 7 days?",
    "target_audience": [
      "academic_advisor",
      "admin"
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
  "raw_text": "Summary: The prioritized actions aim to address the student's academic risks and submission challenges based on their current performance metrics. Each action is grounded in specific evidence to ensure a targeted approach.\nHigh Risk Profile Identified: The student has a high at-risk score of 3, indicating significant academic concerns that necessitate immediate intervention.\nSubmission Punctuality Issues: The student's punctuality rate is recorded at 0, suggesting a complete lack of timely submissions, which requires a structured submission support plan.\nNegative Performance Trend: The student's performance trend shows a negative slope of -0.71875, indicating a decline in academic performance that warrants a review of recent assessments.",
  "structured_payload": {
    "task_id": "A-S08",
    "execution_id": "exec_1781847835786_81e0a67f",
    "explanation": {
      "summary": "The prioritized actions aim to address the student's academic risks and submission challenges based on their current performance metrics. Each action is grounded in specific evidence to ensure a targeted approach.",
      "insights": [
        {
          "title": "High Risk Profile Identified",
          "description": "The student has a high at-risk score of 3, indicating significant academic concerns that necessitate immediate intervention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "The student is categorized as high risk based on the at-risk label."
            }
          ]
        },
        {
          "title": "Submission Punctuality Issues",
          "description": "The student's punctuality rate is recorded at 0, suggesting a complete lack of timely submissions, which requires a structured submission support plan.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "baseline",
              "delta": null,
              "context": "This indicates a critical need for intervention in submission practices."
            }
          ]
        },
        {
          "title": "Negative Performance Trend",
          "description": "The student's performance trend shows a negative slope of -0.71875, indicating a decline in academic performance that warrants a review of recent assessments.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "baseline",
              "delta": null,
              "context": "This trend suggests potential future challenges, although conflicting evidence exists."
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
      "reason": "The evidence used to support the actions is complete and directly linked to the identified risks.",
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
      "latency_ms": 6947,
      "token_usage": {
        "prompt_tokens": 2793,
        "completion_tokens": 474,
        "total_tokens": 3267
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000703
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/regenerated_action_explanations/SAMPLE_OULAD__A-S08__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "9d2f99c399dde1aeb6bb1d4ef8a76321519170effb414bcc4f60a8e194a04d23",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2793,
      "completion_tokens": 474,
      "total_tokens": 3267
    },
    "latency_ms": 6947,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S08",
    "execution_id": "exec_1781847835786_81e0a67f",
    "explanation": {
      "summary": "The prioritized actions aim to address the student's academic risks and submission challenges based on their current performance metrics. Each action is grounded in specific evidence to ensure a targeted approach.",
      "insights": [
        {
          "title": "High Risk Profile Identified",
          "description": "The student has a high at-risk score of 3, indicating significant academic concerns that necessitate immediate intervention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "The student is categorized as high risk based on the at-risk label."
            }
          ]
        },
        {
          "title": "Submission Punctuality Issues",
          "description": "The student's punctuality rate is recorded at 0, suggesting a complete lack of timely submissions, which requires a structured submission support plan.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "baseline",
              "delta": null,
              "context": "This indicates a critical need for intervention in submission practices."
            }
          ]
        },
        {
          "title": "Negative Performance Trend",
          "description": "The student's performance trend shows a negative slope of -0.71875, indicating a decline in academic performance that warrants a review of recent assessments.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "baseline",
              "delta": null,
              "context": "This trend suggests potential future challenges, although conflicting evidence exists."
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
      "reason": "The evidence used to support the actions is complete and directly linked to the identified risks.",
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
      "latency_ms": 6947,
      "token_usage": {
        "prompt_tokens": 2793,
        "completion_tokens": 474,
        "total_tokens": 3267
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000703
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
    "observed": "da7abbfd42c0ba32917b47065606de8a89e37c839454984b9beece5f80486d94",
    "expected_values": [
      "da7abbfd42c0ba32917b47065606de8a89e37c839454984b9beece5f80486d94"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "459b368ca8b9b4b70ca088635eb5028dfcdfc702ea6d46aefb1ef3ac7e9ebf78",
    "expected": "459b368ca8b9b4b70ca088635eb5028dfcdfc702ea6d46aefb1ef3ac7e9ebf78"
  },
  {
    "check_id": "numeric_fields_synthesis_data",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "numeric_columns": [
      "at_risk_score",
      "avg_score",
      "early_warning_week",
      "engagement_score",
      "performance_trend",
      "support_score"
    ],
    "numeric_summaries": {
      "at_risk_score": {
        "count": 1,
        "min": 3,
        "max": 3
      },
      "avg_score": {
        "count": 1,
        "min": 91.2,
        "max": 91.2
      },
      "early_warning_week": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "engagement_score": {
        "count": 1,
        "min": 0.20237855036820618,
        "max": 0.20237855036820618
      },
      "performance_trend": {
        "count": 1,
        "min": -0.7187500000000001,
        "max": -0.7187500000000001
      },
      "support_score": {
        "count": 1,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_synthesis_data",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "flag_columns": [
      "at_risk_score",
      "at_risk_label"
    ],
    "triggered_like_counts": {
      "at_risk_score": 0,
      "at_risk_label": 0
    }
  }
]
```
