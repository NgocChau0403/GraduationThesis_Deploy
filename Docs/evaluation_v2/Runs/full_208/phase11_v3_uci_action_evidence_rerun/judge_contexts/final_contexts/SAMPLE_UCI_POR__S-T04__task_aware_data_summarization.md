# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T04__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T04__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T04",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "At-risk self-check",
  "scope": "1 student",
  "actionable_question": "What specific risk signals are active for me right now?",
  "target_audience": "student",
  "ai_summary_type": "risk_flags",
  "ai_prompt_hint": "Treat this as a checklist: list triggered flags first, then explain each using flag_value vs threshold, severity, flag_description, and recommended_action. Keep non-triggered flags brief.",
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
      "requirement_id": "S-T04-CORE-01",
      "description": "List triggered risk flags first."
    },
    {
      "requirement_id": "S-T04-CORE-02",
      "description": "Explain each triggered flag using its value, threshold, severity, description, and recommended action when available."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T04-CONSTRAINT-01",
      "description": "If no flags are triggered, state that explicitly."
    },
    {
      "constraint_id": "S-T04-CONSTRAINT-02",
      "description": "Keep non-triggered flags brief."
    },
    {
      "constraint_id": "S-T04-CONSTRAINT-03",
      "description": "Do not invent risk signals that are not present in returned flags."
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
  "source_type": "not_applicable",
  "rule_set_id": null,
  "rule_version": null,
  "evaluation_status": "not_applicable",
  "supported_action_count": 0,
  "supported_actions": [],
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T04.json",
      "artifact_sha256": "45925e4836248ef4ec816c2474a74ca907015105f291904db7974f97f7ba11ba",
      "row_count": 5,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 5,
  "prompt_embedded_row_count": 5,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "45925e4836248ef4ec816c2474a74ca907015105f291904db7974f97f7ba11ba",
  "evidence_rows_sha256": "8ebe49bdb3f8328da2f47bb0dc5f89a3143249464fb63ef24deb1a1137c01381",
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
  "full_result_row_count": 5,
  "embedded_datasets_sha256": "8ebe49bdb3f8328da2f47bb0dc5f89a3143249464fb63ef24deb1a1137c01381",
  "datasets": {
    "risk_flags": [
      {
        "flag_name": "flag_low_score",
        "flag_value": 41.25,
        "threshold": 40,
        "triggered": false,
        "severity": "info",
        "flag_description": "Average score is below the pass threshold for this dataset scale.",
        "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment.",
        "support_category": "academic_performance"
      },
      {
        "flag_name": "flag_repeated",
        "flag_value": 0,
        "threshold": 0,
        "triggered": false,
        "severity": "info",
        "flag_description": "This student has previous attempts, which can indicate accumulated difficulty or re-enrolment risk.",
        "recommended_action": "Check prior attempt context and confirm whether the student needs a catch-up plan.",
        "support_category": "academic_history"
      },
      {
        "flag_name": "flag_low_engagement",
        "flag_value": 0,
        "threshold": 0.15,
        "triggered": true,
        "severity": "medium",
        "flag_description": "Engagement score is below the low-engagement threshold.",
        "recommended_action": "Set a weekly study routine and interact with course resources before assessment deadlines.",
        "support_category": "engagement"
      },
      {
        "flag_name": "flag_low_punctuality",
        "flag_value": 1,
        "threshold": 0.7,
        "triggered": false,
        "severity": "info",
        "flag_description": "Submission punctuality is below the expected threshold.",
        "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
        "support_category": "time_management"
      },
      {
        "flag_name": "flag_neg_trend",
        "flag_value": 27.5,
        "threshold": 0,
        "triggered": false,
        "severity": "info",
        "flag_description": "Scores are maintaining an upward or stable trend across assessments.",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T04__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "a00491496ca5551779b5fa4f076a87810426f022e8b1481e57cd43d99c4c9d3f",
  "generator_input_sha256": "969bfd0d0752ef61db95b0fcdde201d610d92a75bea83151c6d954748ca9604d",
  "generator_input_compact": {
    "task_id": "S-T04",
    "execution_id": "exec_1781847241879_c98da0e1",
    "task_name": "At-risk self-check",
    "analysis_type": "ranking",
    "explanation_strategy": "risk",
    "actionable_question": "What specific risk signals are active for me right now?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "risk_flags"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "risk_flags"
    ],
    "dataset_row_counts": {
      "risk_flags": 5
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
  "raw_text": "Summary: You are currently showing signs of low engagement, which can impact your overall performance. It's important to address this early to help you stay on track.\n\nInsights: Low Engagement: Your engagement score is below the low-engagement threshold, indicating that you may not be interacting with course materials as much as needed.\n\nEducational implications: Improving engagement can lead to better understanding and retention of course material.\n\nRecommendations: high - Set a weekly study routine and interact with course resources before assessment deadlines. - This will help you stay engaged and prepared for upcoming assessments.",
  "structured_payload": {
    "task_id": "S-T04",
    "execution_id": "exec_1781847241879_c98da0e1",
    "explanation": {
      "summary": "You are currently showing signs of low engagement, which can impact your overall performance. It's important to address this early to help you stay on track.",
      "insights": [
        {
          "title": "Low Engagement",
          "description": "Your engagement score is below the low-engagement threshold, indicating that you may not be interacting with course materials as much as needed.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_low_engagement",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Engagement score is significantly below the threshold of 0.15."
            }
          ]
        }
      ],
      "educational_implications": [
        "Improving engagement can lead to better understanding and retention of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Set a weekly study routine and interact with course resources before assessment deadlines.",
          "rationale": "This will help you stay engaged and prepared for upcoming assessments."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and accurately reflects your current risk signals.",
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
    "full_result_row_count": 5,
    "included_row_count": 5,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_flags",
        "row_count": 5,
        "included_row_count": 5
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5240,
      "token_usage": {
        "prompt_tokens": 1161,
        "completion_tokens": 279,
        "total_tokens": 1440
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000342
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T04__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "a00491496ca5551779b5fa4f076a87810426f022e8b1481e57cd43d99c4c9d3f",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1161,
      "completion_tokens": 279,
      "total_tokens": 1440
    },
    "latency_ms": 5274,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T04",
    "execution_id": "exec_1781847241879_c98da0e1",
    "explanation": {
      "summary": "You are currently showing signs of low engagement, which can impact your overall performance. It's important to address this early to help you stay on track.",
      "insights": [
        {
          "title": "Low Engagement",
          "description": "Your engagement score is below the low-engagement threshold, indicating that you may not be interacting with course materials as much as needed.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_low_engagement",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Engagement score is significantly below the threshold of 0.15."
            }
          ]
        }
      ],
      "educational_implications": [
        "Improving engagement can lead to better understanding and retention of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Set a weekly study routine and interact with course resources before assessment deadlines.",
          "rationale": "This will help you stay engaged and prepared for upcoming assessments."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and accurately reflects your current risk signals.",
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
    "full_result_row_count": 5,
    "included_row_count": 5,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_flags",
        "row_count": 5,
        "included_row_count": 5
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5240,
      "token_usage": {
        "prompt_tokens": 1161,
        "completion_tokens": 279,
        "total_tokens": 1440
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000342
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
    "expected": 5,
    "observed": 5
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "45925e4836248ef4ec816c2474a74ca907015105f291904db7974f97f7ba11ba",
    "expected_values": [
      "45925e4836248ef4ec816c2474a74ca907015105f291904db7974f97f7ba11ba"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "8ebe49bdb3f8328da2f47bb0dc5f89a3143249464fb63ef24deb1a1137c01381",
    "expected": "8ebe49bdb3f8328da2f47bb0dc5f89a3143249464fb63ef24deb1a1137c01381"
  },
  {
    "check_id": "numeric_fields_risk_flags",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "risk_flags",
    "numeric_columns": [
      "flag_value",
      "threshold"
    ],
    "numeric_summaries": {
      "flag_value": {
        "count": 5,
        "min": 0,
        "max": 41.25
      },
      "threshold": {
        "count": 5,
        "min": 0,
        "max": 40
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
      "triggered": 1,
      "severity": 0,
      "flag_description": 0
    }
  }
]
```
