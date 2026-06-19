# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__S-T04__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T04__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T04",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
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

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "risk_flags",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T04.json",
      "artifact_sha256": "fd8f57c1ad223cc2413c58e4b91e84bb6fad3af901618a79dd826a24a9186638",
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
  "evidence_artifact_file_sha256": "fd8f57c1ad223cc2413c58e4b91e84bb6fad3af901618a79dd826a24a9186638",
  "evidence_rows_sha256": "e8eae8e2117c0681ac85697e517661990051974148de614ec7c5df111f926bfa",
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
  "embedded_datasets_sha256": "e8eae8e2117c0681ac85697e517661990051974148de614ec7c5df111f926bfa",
  "datasets": {
    "risk_flags": [
      {
        "flag_name": "flag_low_score",
        "flag_value": 94.34,
        "threshold": 40,
        "triggered": false,
        "severity": "info",
        "flag_description": "Average score is below the pass threshold for this dataset scale.",
        "recommended_action": "Review the weakest assessment topics and schedule tutor support before the next assessment.",
        "support_category": "academic_performance"
      },
      {
        "flag_name": "flag_repeated",
        "flag_value": 1,
        "threshold": 0,
        "triggered": true,
        "severity": "medium",
        "flag_description": "This student has previous attempts, which can indicate accumulated difficulty or re-enrolment risk.",
        "recommended_action": "Check prior attempt context and confirm whether the student needs a catch-up plan.",
        "support_category": "academic_history"
      },
      {
        "flag_name": "flag_low_engagement",
        "flag_value": 0.20237855036820618,
        "threshold": 0.15,
        "triggered": false,
        "severity": "info",
        "flag_description": "Engagement score is above the safety threshold.",
        "recommended_action": "Maintain a consistent weekly study routine and keep using course resources.",
        "support_category": "engagement"
      },
      {
        "flag_name": "flag_low_punctuality",
        "flag_value": 0,
        "threshold": 0.7,
        "triggered": true,
        "severity": "medium",
        "flag_description": "Submission punctuality is below the expected threshold.",
        "recommended_action": "Use deadline reminders and submit drafts earlier to reduce late-submission risk.",
        "support_category": "time_management"
      },
      {
        "flag_name": "flag_neg_trend",
        "flag_value": -0.7187500000000001,
        "threshold": 0,
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T04__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "66702b5d5a84c66f0351f4e069591afa1d9afaf505c7cdc17324c1a1fe2d00d1",
  "generator_input_sha256": "c7658bc020fb67122a18ce60cd065b10d2d1c27e72321016d49f3bb2e0ff62a1",
  "generator_input_compact": {
    "task_id": "S-T04",
    "execution_id": "exec_1781847888794_d10c4374",
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
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
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
  "raw_text": "Summary: You are currently facing some challenges that could impact your academic performance. There are a few key areas where you can focus your efforts to improve your situation.\n\nInsights: Repeated Attempts: You have a history of previous attempts, which may indicate that you are facing some difficulties. It's important to understand the context of these attempts to better support your learning. | Low Punctuality: Your submission punctuality is currently below the expected threshold. This can lead to added stress and impact your grades. | Negative Trend in Scores: Your scores are trending downward across assessments, which is a concerning pattern that needs to be addressed promptly.\n\nEducational implications: Addressing these issues early can help you regain control over your academic performance and reduce stress.\n\nRecommendations: high - Check prior attempt context and confirm whether you need a catch-up plan. - Understanding your previous attempts can help tailor support to your needs. | high - Use deadline reminders and submit drafts earlier to improve punctuality. - This will help you manage your time better and reduce the risk of late submissions. | high - Compare recent feedback with earlier stronger work and intervene before the next assessment. - This will help you identify areas for improvement and regain your momentum.",
  "structured_payload": {
    "task_id": "S-T04",
    "execution_id": "exec_1781847888794_d10c4374",
    "explanation": {
      "summary": "You are currently facing some challenges that could impact your academic performance. There are a few key areas where you can focus your efforts to improve your situation.",
      "insights": [
        {
          "title": "Repeated Attempts",
          "description": "You have a history of previous attempts, which may indicate that you are facing some difficulties. It's important to understand the context of these attempts to better support your learning.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_repeated",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "This indicates accumulated difficulty or potential re-enrolment risk.; original_comparison=triggered"
            }
          ]
        },
        {
          "title": "Low Punctuality",
          "description": "Your submission punctuality is currently below the expected threshold. This can lead to added stress and impact your grades.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_low_punctuality",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "This indicates a need for better time management.; original_comparison=triggered"
            }
          ]
        },
        {
          "title": "Negative Trend in Scores",
          "description": "Your scores are trending downward across assessments, which is a concerning pattern that needs to be addressed promptly.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_neg_trend",
              "value": -0.7187500000000001,
              "comparison": "baseline",
              "delta": null,
              "context": "This suggests a need for intervention before your next assessment.; original_comparison=triggered"
            }
          ]
        }
      ],
      "educational_implications": [
        "Addressing these issues early can help you regain control over your academic performance and reduce stress."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Check prior attempt context and confirm whether you need a catch-up plan.",
          "rationale": "Understanding your previous attempts can help tailor support to your needs."
        },
        {
          "priority": "high",
          "action": "Use deadline reminders and submit drafts earlier to improve punctuality.",
          "rationale": "This will help you manage your time better and reduce the risk of late submissions."
        },
        {
          "priority": "high",
          "action": "Compare recent feedback with earlier stronger work and intervene before the next assessment.",
          "rationale": "This will help you identify areas for improvement and regain your momentum."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and accurately reflects your current risk signals.",
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
      "latency_ms": 12770,
      "token_usage": {
        "prompt_tokens": 1165,
        "completion_tokens": 610,
        "total_tokens": 1775
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000541
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T04__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "66702b5d5a84c66f0351f4e069591afa1d9afaf505c7cdc17324c1a1fe2d00d1",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1165,
      "completion_tokens": 610,
      "total_tokens": 1775
    },
    "latency_ms": 12778,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T04",
    "execution_id": "exec_1781847888794_d10c4374",
    "explanation": {
      "summary": "You are currently facing some challenges that could impact your academic performance. There are a few key areas where you can focus your efforts to improve your situation.",
      "insights": [
        {
          "title": "Repeated Attempts",
          "description": "You have a history of previous attempts, which may indicate that you are facing some difficulties. It's important to understand the context of these attempts to better support your learning.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_repeated",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "This indicates accumulated difficulty or potential re-enrolment risk.; original_comparison=triggered"
            }
          ]
        },
        {
          "title": "Low Punctuality",
          "description": "Your submission punctuality is currently below the expected threshold. This can lead to added stress and impact your grades.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_low_punctuality",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "This indicates a need for better time management.; original_comparison=triggered"
            }
          ]
        },
        {
          "title": "Negative Trend in Scores",
          "description": "Your scores are trending downward across assessments, which is a concerning pattern that needs to be addressed promptly.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_neg_trend",
              "value": -0.7187500000000001,
              "comparison": "baseline",
              "delta": null,
              "context": "This suggests a need for intervention before your next assessment.; original_comparison=triggered"
            }
          ]
        }
      ],
      "educational_implications": [
        "Addressing these issues early can help you regain control over your academic performance and reduce stress."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Check prior attempt context and confirm whether you need a catch-up plan.",
          "rationale": "Understanding your previous attempts can help tailor support to your needs."
        },
        {
          "priority": "high",
          "action": "Use deadline reminders and submit drafts earlier to improve punctuality.",
          "rationale": "This will help you manage your time better and reduce the risk of late submissions."
        },
        {
          "priority": "high",
          "action": "Compare recent feedback with earlier stronger work and intervene before the next assessment.",
          "rationale": "This will help you identify areas for improvement and regain your momentum."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and accurately reflects your current risk signals.",
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
      "latency_ms": 12770,
      "token_usage": {
        "prompt_tokens": 1165,
        "completion_tokens": 610,
        "total_tokens": 1775
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000541
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
    "observed": "fd8f57c1ad223cc2413c58e4b91e84bb6fad3af901618a79dd826a24a9186638",
    "expected_values": [
      "fd8f57c1ad223cc2413c58e4b91e84bb6fad3af901618a79dd826a24a9186638"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "e8eae8e2117c0681ac85697e517661990051974148de614ec7c5df111f926bfa",
    "expected": "e8eae8e2117c0681ac85697e517661990051974148de614ec7c5df111f926bfa"
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
        "min": -0.7187500000000001,
        "max": 94.34
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
      "triggered": 3,
      "severity": 0,
      "flag_description": 0
    }
  }
]
```
