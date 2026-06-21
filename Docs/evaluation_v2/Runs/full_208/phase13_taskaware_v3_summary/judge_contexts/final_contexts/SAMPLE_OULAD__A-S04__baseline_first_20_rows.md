# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S04__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-S04__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-S04",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
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
      "description": "Explain the returned student risk flags and identify which flags are triggered."
    },
    {
      "requirement_id": "A-S04-CORE-02",
      "description": "For each triggered flag, explain the exact value, threshold, severity, description, and existing recommended_action when those fields are returned."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-S04-CONSTRAINT-01",
      "description": "Do not require the explanation model to create new recommendations; this task already returns recommended_action fields for flags."
    },
    {
      "constraint_id": "A-S04-CONSTRAINT-02",
      "description": "If no flags are triggered, state that explicitly and keep non-triggered flags brief."
    },
    {
      "constraint_id": "A-S04-CONSTRAINT-03",
      "description": "Do not invent risk signals, priorities, or actions that are not present in returned flags."
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S04__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "5d1deeb46a53994e50cc7c75cc393cc3e42755be93f2666f324bd1849c8b8465",
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
  "raw_text": "Summary: The analysis indicates that the student is at risk due to low punctuality and a negative trend in assessment scores. These factors suggest a need for immediate intervention to support the student's academic performance.\n\nInsights: Low Punctuality: The student's submission punctuality is at 0, which is significantly below the expected threshold of 0.7, indicating a consistent pattern of late submissions. | Negative Trend in Scores: The student's scores are trending downward with a value of -0.71875, indicating a significant decline in performance across assessments.\n\nEducational implications: The student may struggle to meet academic expectations without timely support.\n\nRecommendations: high - Implement deadline reminders and encourage early draft submissions. - This will help improve punctuality and reduce the risk of late submissions. | high - Review recent feedback with the student to identify areas for improvement. - Addressing the negative trend in scores can help the student regain confidence and improve performance.",
  "structured_payload": {
    "task_id": "A-S04",
    "execution_id": "exec_1781847835477_0935da99",
    "explanation": {
      "summary": "The analysis indicates that the student is at risk due to low punctuality and a negative trend in assessment scores. These factors suggest a need for immediate intervention to support the student's academic performance.",
      "insights": [
        {
          "title": "Low Punctuality",
          "description": "The student's submission punctuality is at 0, which is significantly below the expected threshold of 0.7, indicating a consistent pattern of late submissions.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_low_punctuality",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Submission punctuality is critically low."
            }
          ]
        },
        {
          "title": "Negative Trend in Scores",
          "description": "The student's scores are trending downward with a value of -0.71875, indicating a significant decline in performance across assessments.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_neg_trend",
              "value": -0.7187500000000001,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Scores are consistently decreasing."
            }
          ]
        }
      ],
      "educational_implications": [
        "The student may struggle to meet academic expectations without timely support."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement deadline reminders and encourage early draft submissions.",
          "rationale": "This will help improve punctuality and reduce the risk of late submissions."
        },
        {
          "priority": "high",
          "action": "Review recent feedback with the student to identify areas for improvement.",
          "rationale": "Addressing the negative trend in scores can help the student regain confidence and improve performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly indicates triggered risk flags with actionable insights.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "baseline_first_20_rows",
    "ai_summary_version": "baseline",
    "baseline_available": true,
    "input_summary_type": "raw_first_20_rows",
    "ai_summary_method_warning": null,
    "full_result_row_count": null,
    "included_row_count": null,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7954,
      "token_usage": {
        "prompt_tokens": 893,
        "completion_tokens": 448,
        "total_tokens": 1341
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000403
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S04__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "5d1deeb46a53994e50cc7c75cc393cc3e42755be93f2666f324bd1849c8b8465",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 893,
      "completion_tokens": 448,
      "total_tokens": 1341
    },
    "latency_ms": 7958,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S04",
    "execution_id": "exec_1781847835477_0935da99",
    "explanation": {
      "summary": "The analysis indicates that the student is at risk due to low punctuality and a negative trend in assessment scores. These factors suggest a need for immediate intervention to support the student's academic performance.",
      "insights": [
        {
          "title": "Low Punctuality",
          "description": "The student's submission punctuality is at 0, which is significantly below the expected threshold of 0.7, indicating a consistent pattern of late submissions.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_low_punctuality",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Submission punctuality is critically low."
            }
          ]
        },
        {
          "title": "Negative Trend in Scores",
          "description": "The student's scores are trending downward with a value of -0.71875, indicating a significant decline in performance across assessments.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_neg_trend",
              "value": -0.7187500000000001,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Scores are consistently decreasing."
            }
          ]
        }
      ],
      "educational_implications": [
        "The student may struggle to meet academic expectations without timely support."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement deadline reminders and encourage early draft submissions.",
          "rationale": "This will help improve punctuality and reduce the risk of late submissions."
        },
        {
          "priority": "high",
          "action": "Review recent feedback with the student to identify areas for improvement.",
          "rationale": "Addressing the negative trend in scores can help the student regain confidence and improve performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly indicates triggered risk flags with actionable insights.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "baseline_first_20_rows",
    "ai_summary_version": "baseline",
    "baseline_available": true,
    "input_summary_type": "raw_first_20_rows",
    "ai_summary_method_warning": null,
    "full_result_row_count": null,
    "included_row_count": null,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7954,
      "token_usage": {
        "prompt_tokens": 893,
        "completion_tokens": 448,
        "total_tokens": 1341
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000403
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
