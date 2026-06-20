# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S04__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-S04__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-S04",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Student risk flag breakdown",
  "scope": "1 student",
  "actionable_question": "Which specific risk factors should admin address for this student?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "risk_flags",
  "ai_prompt_hint": "For each triggered flag, state the exact value and why it crosses the threshold. Prioritise the top 2 for immediate action.",
  "query_labels": [
    "risk_flags"
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
    "at_risk_score [FE cross]",
    "at_risk_label [FE cross]",
    "avg_score [FE cross]",
    "engagement_score [FE cross]",
    "punctuality_rate [FE cross]",
    "performance_trend [FE cross]",
    "previous_attempt_count"
  ],
  "output_schema": {
    "required_columns": [
      "flag_name",
      "flag_value",
      "threshold",
      "triggered"
    ],
    "optional_columns": [
      "severity",
      "flag_description",
      "recommended_action",
      "support_category"
    ]
  },
  "query_labels": [
    "risk_flags"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-S04-CORE-01",
      "description": "For each triggered flag, state the exact value and why it crosses the threshold."
    },
    {
      "requirement_id": "A-S04-CORE-02",
      "description": "Prioritise the top 2 for immediate action."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [],
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
  "source_type": "returned_recommended_action_fields",
  "rule_set_id": null,
  "rule_version": null,
  "evaluation_status": "complete",
  "supported_action_count": 2,
  "supported_actions": [
    {
      "action_id": "A-S04__flag_low_punctuality",
      "action_text": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
      "priority": "medium",
      "owner": null,
      "time_horizon_days": null,
      "support_category": "time_management",
      "source_type": "returned_query_row",
      "source_rule_id": null,
      "trigger_evidence": {
        "dataset_label": "risk_flags",
        "row_index": 2,
        "flag_name": "flag_low_punctuality",
        "flag_value": 0,
        "threshold": "0.7",
        "triggered": true
      },
      "claim_limits": []
    },
    {
      "action_id": "A-S04__flag_neg_trend",
      "action_text": "Compare recent feedback with earlier stronger work and intervene before the next assessment.",
      "priority": "medium",
      "owner": null,
      "time_horizon_days": null,
      "support_category": "trend_monitoring",
      "source_type": "returned_query_row",
      "source_rule_id": null,
      "trigger_evidence": {
        "dataset_label": "risk_flags",
        "row_index": 3,
        "flag_name": "flag_neg_trend",
        "flag_value": -0.7187500000000001,
        "threshold": "0",
        "triggered": true
      },
      "claim_limits": []
    }
  ],
  "rule_evaluations": [],
  "conflict_evaluations": []
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "risk_flags",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-S04.json",
      "artifact_sha256": "56234f92505f3fe716ac63c7a562bcc89cd336c17f088068ec2071db7d685538",
      "row_count": 4,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 4,
  "prompt_embedded_row_count": 4,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "56234f92505f3fe716ac63c7a562bcc89cd336c17f088068ec2071db7d685538",
  "evidence_rows_sha256": "b7a8bc41b7dc4c1a013bfe496d4a33c629941aed5b288e87b85a621468c690fc",
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
  "full_result_row_count": 4,
  "embedded_datasets_sha256": "b7a8bc41b7dc4c1a013bfe496d4a33c629941aed5b288e87b85a621468c690fc",
  "datasets": {
    "risk_flags": [
      {
        "flag_name": "flag_low_score",
        "flag_value": 91.2,
        "threshold": "40",
        "triggered": false,
        "severity": "info",
        "flag_description": "Average score is below the pass threshold for this dataset scale.",
        "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment.",
        "support_category": "academic_performance"
      },
      {
        "flag_name": "flag_high_absence",
        "flag_value": null,
        "threshold": "10",
        "triggered": null,
        "severity": "info",
        "flag_description": "Absences are within the high-absence risk limit.",
        "recommended_action": "Keep monitoring attendance and confirm there are no new absence spikes.",
        "support_category": "attendance"
      },
      {
        "flag_name": "flag_low_punctuality",
        "flag_value": 0,
        "threshold": "0.7",
        "triggered": true,
        "severity": "medium",
        "flag_description": "Submission punctuality is below the expected threshold.",
        "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
        "support_category": "time_management"
      },
      {
        "flag_name": "flag_neg_trend",
        "flag_value": -0.7187500000000001,
        "threshold": "0",
        "triggered": true,
        "severity": "medium",
        "flag_description": "Scores are trending downward across assessments.",
        "recommended_action": "Compare recent feedback with earlier stronger work and intervene before the next assessment.",
        "support_category": "trend_monitoring"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S04__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "394eccdf6d509fa0c92b1d76d11f9cb4896a6bb9cd54c505bcdbbff5aa9a960d",
  "generator_input_sha256": "218fe4419aa0c1d1d350546874ebd9547e1bd8941a4af2e360c1eddd5e44dc3f",
  "generator_input_compact": {
    "task_id": "A-S04",
    "execution_id": "exec_1781847835477_0935da99",
    "task_name": "Student risk flag breakdown",
    "analysis_type": "ranking",
    "explanation_strategy": "risk",
    "actionable_question": "Which specific risk factors should admin address for this student?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "risk_flags"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "risk_flags"
    ],
    "dataset_row_counts": {
      "risk_flags": 4
    },
    "ai_summary_config_summary": {
      "summary_type": "risk_flags",
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
  "raw_text": "Summary: The checklist prioritizes Low Punctuality and Negative Trend because their current values cross the risk thresholds; highest severity is medium because both flags indicate significant areas of concern in student performance and engagement.\n\nInsights: Why Low Punctuality is Active: The current submission punctuality value is 0, which is below the expected threshold of 0.7. This triggered the flag as it indicates a consistent pattern of late submissions, mapping to a medium severity level due to its potential impact on overall academic performance. This explains why that visible checklist flag is surfaced in the card. | Why Negative Trend is Active: The current score trend value is -0.71875, which indicates a downward trend across assessments, triggering the flag. This medium severity reflects the urgency of addressing declining performance before it further impacts the student's academic standing. This explains why that visible checklist flag is surfaced in the card.",
  "structured_payload": {
    "task_id": "A-S04",
    "execution_id": "exec_1781847835477_0935da99",
    "explanation": {
      "summary": "The checklist prioritizes Low Punctuality and Negative Trend because their current values cross the risk thresholds; highest severity is medium because both flags indicate significant areas of concern in student performance and engagement.",
      "insights": [
        {
          "title": "Why Low Punctuality is Active",
          "description": "The current submission punctuality value is 0, which is below the expected threshold of 0.7. This triggered the flag as it indicates a consistent pattern of late submissions, mapping to a medium severity level due to its potential impact on overall academic performance. This explains why that visible checklist flag is surfaced in the card.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_low_punctuality",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Submission punctuality is significantly below the threshold."
            }
          ]
        },
        {
          "title": "Why Negative Trend is Active",
          "description": "The current score trend value is -0.71875, which indicates a downward trend across assessments, triggering the flag. This medium severity reflects the urgency of addressing declining performance before it further impacts the student's academic standing. This explains why that visible checklist flag is surfaced in the card.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_neg_trend",
              "value": -0.7187500000000001,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Scores are trending downward, indicating a need for monitoring."
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
      "reason": "Data quality is consistent and reliable based on the current dataset.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_flags",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5740,
      "token_usage": {
        "prompt_tokens": 1420,
        "completion_tokens": 394,
        "total_tokens": 1814
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000449
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S04__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "394eccdf6d509fa0c92b1d76d11f9cb4896a6bb9cd54c505bcdbbff5aa9a960d",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1420,
      "completion_tokens": 394,
      "total_tokens": 1814
    },
    "latency_ms": 5746,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S04",
    "execution_id": "exec_1781847835477_0935da99",
    "explanation": {
      "summary": "The checklist prioritizes Low Punctuality and Negative Trend because their current values cross the risk thresholds; highest severity is medium because both flags indicate significant areas of concern in student performance and engagement.",
      "insights": [
        {
          "title": "Why Low Punctuality is Active",
          "description": "The current submission punctuality value is 0, which is below the expected threshold of 0.7. This triggered the flag as it indicates a consistent pattern of late submissions, mapping to a medium severity level due to its potential impact on overall academic performance. This explains why that visible checklist flag is surfaced in the card.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_low_punctuality",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Submission punctuality is significantly below the threshold."
            }
          ]
        },
        {
          "title": "Why Negative Trend is Active",
          "description": "The current score trend value is -0.71875, which indicates a downward trend across assessments, triggering the flag. This medium severity reflects the urgency of addressing declining performance before it further impacts the student's academic standing. This explains why that visible checklist flag is surfaced in the card.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_neg_trend",
              "value": -0.7187500000000001,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Scores are trending downward, indicating a need for monitoring."
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
      "reason": "Data quality is consistent and reliable based on the current dataset.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_flags",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5740,
      "token_usage": {
        "prompt_tokens": 1420,
        "completion_tokens": 394,
        "total_tokens": 1814
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000449
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
    "expected": 4,
    "observed": 4
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "56234f92505f3fe716ac63c7a562bcc89cd336c17f088068ec2071db7d685538",
    "expected_values": [
      "56234f92505f3fe716ac63c7a562bcc89cd336c17f088068ec2071db7d685538"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "b7a8bc41b7dc4c1a013bfe496d4a33c629941aed5b288e87b85a621468c690fc",
    "expected": "b7a8bc41b7dc4c1a013bfe496d4a33c629941aed5b288e87b85a621468c690fc"
  },
  {
    "check_id": "numeric_fields_risk_flags",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "risk_flags",
    "numeric_columns": [
      "flag_value"
    ],
    "numeric_summaries": {
      "flag_value": {
        "count": 3,
        "min": -0.7187500000000001,
        "max": 91.2
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_risk_flags",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "risk_flags",
    "flag_columns": [
      "flag_name",
      "flag_value",
      "threshold",
      "triggered",
      "severity",
      "flag_description"
    ],
    "triggered_like_counts": {
      "flag_name": 0,
      "flag_value": 0,
      "threshold": 0,
      "triggered": 2,
      "severity": 0,
      "flag_description": 0
    }
  }
]
```
