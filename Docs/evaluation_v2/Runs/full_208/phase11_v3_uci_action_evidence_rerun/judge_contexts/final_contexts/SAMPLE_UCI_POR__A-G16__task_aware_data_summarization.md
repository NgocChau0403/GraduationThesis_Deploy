# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G16__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G16__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G16",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Admin action recommendation",
  "scope": "Many students",
  "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
  "target_audience": "admin",
  "ai_summary_type": "action_synthesis",
  "ai_prompt_hint": "Synthesise all cohort [FE] signals into 3–5 admin actions. This is the most critical AI synthesis task for admin role.",
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
    "assessment_result",
    "assessment",
    "engagement"
  ],
  "key_db_fields": [
    "[AI_SYNTHESIS] low_engagement_count",
    "high_risk_count",
    "hardest_assessment",
    "best_resource_type",
    "total_students"
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
      "requirement_id": "A-G16-CORE-01",
      "description": "Synthesise cohort feature-engineered signals into 3–5 admin actions."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G16-CONSTRAINT-01",
      "description": "Every recommended action must be grounded in returned cohort feature-engineered signals."
    },
    {
      "constraint_id": "A-G16-CONSTRAINT-02",
      "description": "Do not invent urgency or priority without supporting returned data."
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
  "rule_set_id": "A-G16.action_synthesis",
  "rule_version": "1.0.0",
  "evaluation_status": "complete",
  "supported_action_count": 2,
  "supported_actions": [
    {
      "action_id": "admin_launch_engagement_outreach",
      "action_text": "Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up.",
      "priority": "high",
      "owner": "student_support_team",
      "time_horizon_days": 7,
      "support_category": "engagement_support",
      "claim_limits": [
        "Do not claim low engagement caused low performance.",
        "Do not infer a specific barrier from the aggregate signal."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "A-G16-R02",
      "trigger_evidence": {
        "all": [
          {
            "evidence_id": "low_engagement_rate",
            "operator": "gte",
            "observed_value": 1,
            "expected_value": 0.25,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      }
    },
    {
      "action_id": "admin_review_assessment_support",
      "action_text": "Ask the module team to review learner support and preparation materials for the identified assessment.",
      "priority": "medium",
      "owner": "module_lead",
      "time_horizon_days": 14,
      "support_category": "assessment_support",
      "claim_limits": [
        "Do not state a fail-rate value because the runtime row does not expose it.",
        "Do not claim the assessment itself caused failure."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "A-G16-R03",
      "trigger_evidence": {
        "all": [
          {
            "evidence_id": "hardest_assessment",
            "operator": "is_present",
            "observed_value": "G1",
            "expected_value": null,
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
      "rule_id": "A-G16-R01",
      "description": "Escalate cohort risk review when at least 20 percent of students meet the backend high-risk definition.",
      "status": "not_triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "high_risk_rate",
            "operator": "gte",
            "observed_value": 0.07550077041602465,
            "expected_value": 0.2,
            "compare_to_evidence_id": null,
            "result": false
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "admin_review_high_risk_caseload",
        "action_text": "Review the high-risk student caseload, assign named follow-up owners, and confirm which students need direct support.",
        "priority": "high",
        "owner": "academic_admin",
        "time_horizon_days": 7,
        "support_category": "risk_coordination",
        "claim_limits": [
          "Do not infer causes from the aggregate count.",
          "Do not identify individual students unless a separate student-level evidence source is available."
        ]
      }
    },
    {
      "rule_id": "A-G16-R02",
      "description": "Plan cohort engagement outreach when at least 25 percent of students meet the backend low-engagement definition.",
      "status": "triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "low_engagement_rate",
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
        "action_id": "admin_launch_engagement_outreach",
        "action_text": "Coordinate a targeted engagement outreach and check whether access, scheduling, or course-navigation barriers need follow-up.",
        "priority": "high",
        "owner": "student_support_team",
        "time_horizon_days": 7,
        "support_category": "engagement_support",
        "claim_limits": [
          "Do not claim low engagement caused low performance.",
          "Do not infer a specific barrier from the aggregate signal."
        ]
      }
    },
    {
      "rule_id": "A-G16-R03",
      "description": "Request assessment support review when the highest-fail-rate assessment identifier is present.",
      "status": "triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "hardest_assessment",
            "operator": "is_present",
            "observed_value": "G1",
            "expected_value": null,
            "compare_to_evidence_id": null,
            "result": true
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "admin_review_assessment_support",
        "action_text": "Ask the module team to review learner support and preparation materials for the identified assessment.",
        "priority": "medium",
        "owner": "module_lead",
        "time_horizon_days": 14,
        "support_category": "assessment_support",
        "claim_limits": [
          "Do not state a fail-rate value because the runtime row does not expose it.",
          "Do not claim the assessment itself caused failure."
        ]
      }
    },
    {
      "rule_id": "A-G16-R04",
      "description": "Review the most-used resource format as a delivery option without treating usage as effectiveness.",
      "status": "not_triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "best_resource_type",
            "operator": "is_present",
            "observed_value": null,
            "expected_value": null,
            "compare_to_evidence_id": null,
            "result": false
          }
        ],
        "any": []
      },
      "action": {
        "action_id": "admin_review_most_used_resource_format",
        "action_text": "Review whether the most-used resource format can support the planned outreach, while separately checking its learning suitability.",
        "priority": "low",
        "owner": "learning_design_team",
        "time_horizon_days": 14,
        "support_category": "resource_planning",
        "claim_limits": [
          "Refer to this field as most-used, not best-performing.",
          "Do not claim engagement clicks demonstrate learning effectiveness."
        ]
      }
    }
  ],
  "conflict_evaluations": []
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "synthesis_data",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G16.json",
      "artifact_sha256": "8172586d2f0765fa5e2fefc4c391b23f4ab472722440f5d75689ac068c509f41",
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
  "evidence_artifact_file_sha256": "8172586d2f0765fa5e2fefc4c391b23f4ab472722440f5d75689ac068c509f41",
  "evidence_rows_sha256": "f6a9c3335a77b73fbff4926771f35b78031b30f1ad05f92e396c35c76f777fe0",
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
  "embedded_datasets_sha256": "f6a9c3335a77b73fbff4926771f35b78031b30f1ad05f92e396c35c76f777fe0",
  "datasets": {
    "synthesis_data": [
      {
        "class_id": "SAMPLE_UCI_POR_CLASS",
        "low_engagement_count": 649,
        "high_risk_count": 49,
        "hardest_assessment": "G1",
        "best_resource_type": null,
        "total_students": 649
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/regenerated_action_explanations/SAMPLE_UCI_POR__A-G16__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "6e5178c7b6e19738c62518e5077884636e91aef142f2d7e4a4723666dbe24e71",
  "generator_input_sha256": "d23311d9e6b9c526383d6142238e1378975317be6aab25fb4e0dbd8dcf1b3b38",
  "generator_input_compact": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847232865_c4217522",
    "task_name": "Admin action recommendation",
    "analysis_type": "synthesis",
    "explanation_strategy": "risk",
    "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
    "target_audience": [
      "admin"
    ],
    "query_labels": [
      "synthesis_data"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
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
  "raw_text": "Summary: The prioritized actions focus on addressing engagement and assessment support based on identified patterns in student performance data. These actions are designed to enhance student support and improve overall learning outcomes.\nHigh Engagement Outreach Needed: A targeted engagement outreach is necessary due to a derived low engagement rate of 1.0, indicating that all students are categorized as having low engagement. This action is prioritized as high and is owned by the student support team with a deadline of 7 days.\nAssessment Support Review Required: A review of learner support and preparation materials for the hardest assessment (G1) is warranted, as this action is prioritized medium and owned by the module lead with a deadline of 14 days.",
  "structured_payload": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847232865_c4217522",
    "explanation": {
      "summary": "The prioritized actions focus on addressing engagement and assessment support based on identified patterns in student performance data. These actions are designed to enhance student support and improve overall learning outcomes.",
      "insights": [
        {
          "title": "High Engagement Outreach Needed",
          "description": "A targeted engagement outreach is necessary due to a derived low engagement rate of 1.0, indicating that all students are categorized as having low engagement. This action is prioritized as high and is owned by the student support team with a deadline of 7 days.",
          "severity": "high",
          "evidence": [
            {
              "metric": "low_engagement_rate",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Derived from low engagement count and total students."
            }
          ]
        },
        {
          "title": "Assessment Support Review Required",
          "description": "A review of learner support and preparation materials for the hardest assessment (G1) is warranted, as this action is prioritized medium and owned by the module lead with a deadline of 14 days.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "hardest_assessment",
              "value": "G1",
              "comparison": "baseline",
              "delta": null,
              "context": "Identified as the hardest assessment requiring review."
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
      "reason": "The evidence used to support the actions is complete and directly linked to the identified needs.",
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
      "latency_ms": 4218,
      "token_usage": {
        "prompt_tokens": 2400,
        "completion_tokens": 369,
        "total_tokens": 2769
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000581
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/regenerated_action_explanations/SAMPLE_UCI_POR__A-G16__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "6e5178c7b6e19738c62518e5077884636e91aef142f2d7e4a4723666dbe24e71",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2400,
      "completion_tokens": 369,
      "total_tokens": 2769
    },
    "latency_ms": 4218,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847232865_c4217522",
    "explanation": {
      "summary": "The prioritized actions focus on addressing engagement and assessment support based on identified patterns in student performance data. These actions are designed to enhance student support and improve overall learning outcomes.",
      "insights": [
        {
          "title": "High Engagement Outreach Needed",
          "description": "A targeted engagement outreach is necessary due to a derived low engagement rate of 1.0, indicating that all students are categorized as having low engagement. This action is prioritized as high and is owned by the student support team with a deadline of 7 days.",
          "severity": "high",
          "evidence": [
            {
              "metric": "low_engagement_rate",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Derived from low engagement count and total students."
            }
          ]
        },
        {
          "title": "Assessment Support Review Required",
          "description": "A review of learner support and preparation materials for the hardest assessment (G1) is warranted, as this action is prioritized medium and owned by the module lead with a deadline of 14 days.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "hardest_assessment",
              "value": "G1",
              "comparison": "baseline",
              "delta": null,
              "context": "Identified as the hardest assessment requiring review."
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
      "reason": "The evidence used to support the actions is complete and directly linked to the identified needs.",
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
      "latency_ms": 4218,
      "token_usage": {
        "prompt_tokens": 2400,
        "completion_tokens": 369,
        "total_tokens": 2769
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000581
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
    "observed": "8172586d2f0765fa5e2fefc4c391b23f4ab472722440f5d75689ac068c509f41",
    "expected_values": [
      "8172586d2f0765fa5e2fefc4c391b23f4ab472722440f5d75689ac068c509f41"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "f6a9c3335a77b73fbff4926771f35b78031b30f1ad05f92e396c35c76f777fe0",
    "expected": "f6a9c3335a77b73fbff4926771f35b78031b30f1ad05f92e396c35c76f777fe0"
  },
  {
    "check_id": "numeric_fields_synthesis_data",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "numeric_columns": [
      "high_risk_count",
      "low_engagement_count",
      "total_students"
    ],
    "numeric_summaries": {
      "high_risk_count": {
        "count": 1,
        "min": 49,
        "max": 49
      },
      "low_engagement_count": {
        "count": 1,
        "min": 649,
        "max": 649
      },
      "total_students": {
        "count": 1,
        "min": 649,
        "max": 649
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_synthesis_data",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "flag_columns": [
      "high_risk_count"
    ],
    "triggered_like_counts": {
      "high_risk_count": 0
    }
  }
]
```
