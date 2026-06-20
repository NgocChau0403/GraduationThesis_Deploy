# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S08__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-S08__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
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
  "supported_action_count": 1,
  "supported_actions": [
    {
      "action_id": "staff_check_engagement_barriers",
      "action_text": "Contact the student to check for practical engagement barriers and agree one reachable participation step.",
      "priority": "medium",
      "owner": "student_support_team",
      "time_horizon_days": 7,
      "support_category": "engagement_support",
      "claim_limits": [
        "Do not infer the cause of low engagement.",
        "Do not claim engagement caused the student's performance."
      ],
      "source_type": "versioned_registry_rule",
      "source_rule_id": "A-S08-R04",
      "trigger_evidence": {
        "all": [
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
      }
    }
  ],
  "rule_evaluations": [
    {
      "rule_id": "A-S08-R01",
      "description": "Assign a rapid staff review when the backend composite risk score is high.",
      "status": "not_triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "at_risk_score",
            "operator": "gte",
            "observed_value": 2,
            "expected_value": 3,
            "compare_to_evidence_id": null,
            "result": false
          },
          {
            "evidence_id": "at_risk_label",
            "operator": "eq",
            "observed_value": "medium",
            "expected_value": "high",
            "compare_to_evidence_id": null,
            "result": false
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
      "status": "not_triggered",
      "conditions": {
        "all": [
          {
            "evidence_id": "punctuality_rate",
            "operator": "lt",
            "observed_value": "1",
            "expected_value": 0.7,
            "compare_to_evidence_id": null,
            "result": false
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
      "status": "triggered",
      "conditions": {
        "all": [
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
      "status": "not_triggered",
      "behavior": "preserve_and_warn",
      "conditions": {
        "all": [
          {
            "evidence_id": "final_outcome",
            "operator": "eq",
            "observed_value": "Pass",
            "expected_value": "Distinction",
            "compare_to_evidence_id": null,
            "result": false
          }
        ],
        "any": [
          {
            "evidence_id": "at_risk_label",
            "operator": "eq",
            "observed_value": "medium",
            "expected_value": "high",
            "compare_to_evidence_id": null,
            "result": false
          },
          {
            "evidence_id": "performance_trend",
            "operator": "lt",
            "observed_value": 27.5,
            "expected_value": 0,
            "compare_to_evidence_id": null,
            "result": false
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S08.json",
      "artifact_sha256": "bf57942636e4f198c02b375ea0335ea4bcec9fac35716717442fcea3518f9db1",
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
  "evidence_artifact_file_sha256": "bf57942636e4f198c02b375ea0335ea4bcec9fac35716717442fcea3518f9db1",
  "evidence_rows_sha256": "e4797e38d790ce82ae80aacb9ef02d983a3ea5562c3b6f81a1e7996693aca12f",
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
  "embedded_datasets_sha256": "e4797e38d790ce82ae80aacb9ef02d983a3ea5562c3b6f81a1e7996693aca12f",
  "datasets": {
    "synthesis_data": [
      {
        "avg_score": 36.666666666666664,
        "performance_trend": 27.5,
        "engagement_score": 0,
        "punctuality_rate": "1",
        "early_warning_week": null,
        "support_score": 0.25,
        "at_risk_score": 2,
        "at_risk_label": "medium",
        "final_outcome": "Pass"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/regenerated_action_explanations/SAMPLE_UCI_POR__A-S08__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "d681e51fd01388920261cc0985d7a8e47060ddde58feb966a6c631ca37168ab8",
  "generator_input_sha256": "244c1e3afc0d63340e7817572164e532335233119cb5e82facacdf9f7d60a883",
  "generator_input_compact": {
    "task_id": "A-S08",
    "execution_id": "exec_1781847238156_2843360f",
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
  "raw_text": "Summary: The action plan focuses on addressing potential engagement barriers for the student, as indicated by their low engagement score. The student support team is tasked with contacting the student to identify these barriers and agree on a manageable participation step within a week.\nLow Engagement Score: The student's engagement score is recorded at 0.0, indicating a significant lack of participation.",
  "structured_payload": {
    "task_id": "A-S08",
    "execution_id": "exec_1781847238156_2843360f",
    "explanation": {
      "summary": "The action plan focuses on addressing potential engagement barriers for the student, as indicated by their low engagement score. The student support team is tasked with contacting the student to identify these barriers and agree on a manageable participation step within a week.",
      "insights": [
        {
          "title": "Low Engagement Score",
          "description": "The student's engagement score is recorded at 0.0, indicating a significant lack of participation.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "The engagement score is critical for assessing participation levels."
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
      "reason": "The evidence used to support the action is complete and directly linked to the identified engagement issue.",
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
      "latency_ms": 4847,
      "token_usage": {
        "prompt_tokens": 2140,
        "completion_tokens": 225,
        "total_tokens": 2365
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000456
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/regenerated_action_explanations/SAMPLE_UCI_POR__A-S08__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "d681e51fd01388920261cc0985d7a8e47060ddde58feb966a6c631ca37168ab8",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2140,
      "completion_tokens": 225,
      "total_tokens": 2365
    },
    "latency_ms": 4847,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S08",
    "execution_id": "exec_1781847238156_2843360f",
    "explanation": {
      "summary": "The action plan focuses on addressing potential engagement barriers for the student, as indicated by their low engagement score. The student support team is tasked with contacting the student to identify these barriers and agree on a manageable participation step within a week.",
      "insights": [
        {
          "title": "Low Engagement Score",
          "description": "The student's engagement score is recorded at 0.0, indicating a significant lack of participation.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "The engagement score is critical for assessing participation levels."
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
      "reason": "The evidence used to support the action is complete and directly linked to the identified engagement issue.",
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
      "latency_ms": 4847,
      "token_usage": {
        "prompt_tokens": 2140,
        "completion_tokens": 225,
        "total_tokens": 2365
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000456
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
    "observed": "bf57942636e4f198c02b375ea0335ea4bcec9fac35716717442fcea3518f9db1",
    "expected_values": [
      "bf57942636e4f198c02b375ea0335ea4bcec9fac35716717442fcea3518f9db1"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "e4797e38d790ce82ae80aacb9ef02d983a3ea5562c3b6f81a1e7996693aca12f",
    "expected": "e4797e38d790ce82ae80aacb9ef02d983a3ea5562c3b6f81a1e7996693aca12f"
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
      "performance_trend",
      "support_score"
    ],
    "numeric_summaries": {
      "at_risk_score": {
        "count": 1,
        "min": 2,
        "max": 2
      },
      "avg_score": {
        "count": 1,
        "min": 36.666666666666664,
        "max": 36.666666666666664
      },
      "engagement_score": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "performance_trend": {
        "count": 1,
        "min": 27.5,
        "max": 27.5
      },
      "support_score": {
        "count": 1,
        "min": 0.25,
        "max": 0.25
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
