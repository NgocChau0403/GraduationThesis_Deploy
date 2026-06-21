# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S04__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-S04__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-S04",
  "explanation_mode": "task_aware_data_summarization",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S04__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "e228883d082afecdd19ba2635215b9d5061f15c8c7445ef752aafa208c1aca80",
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
  "raw_text": "Summary: The checklist prioritizes Low Punctuality and Negative Trend because their current values cross the respective risk thresholds; highest severity is medium because both flags indicate significant areas of concern in student performance and engagement.\n\nInsights: Why Low Punctuality is Active: The current submission punctuality is 0, which is below the expected threshold of 0.7. This triggered the flag as it indicates a consistent pattern of late submissions, warranting a medium severity level due to its potential impact on overall academic performance. This explains why that visible checklist flag is surfaced in the card. | Why Negative Trend is Active: The current score trend is -0.7188, which is below the threshold of 0. This triggered the flag as it reflects a downward trajectory in assessment performance, categorized as medium severity due to its implications for future academic success. This explains why that visible checklist flag is surfaced in the card.",
  "structured_payload": {
    "task_id": "A-S04",
    "execution_id": "exec_1781847835477_0935da99",
    "explanation": {
      "summary": "The checklist prioritizes Low Punctuality and Negative Trend because their current values cross the respective risk thresholds; highest severity is medium because both flags indicate significant areas of concern in student performance and engagement.",
      "insights": [
        {
          "title": "Why Low Punctuality is Active",
          "description": "The current submission punctuality is 0, which is below the expected threshold of 0.7. This triggered the flag as it indicates a consistent pattern of late submissions, warranting a medium severity level due to its potential impact on overall academic performance. This explains why that visible checklist flag is surfaced in the card.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_value",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Threshold is 0.7"
            }
          ]
        },
        {
          "title": "Why Negative Trend is Active",
          "description": "The current score trend is -0.7188, which is below the threshold of 0. This triggered the flag as it reflects a downward trajectory in assessment performance, categorized as medium severity due to its implications for future academic success. This explains why that visible checklist flag is surfaced in the card.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_value",
              "value": -0.7188,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Threshold is 0"
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
      "reason": "Data quality is consistent and reliable based on the provided metrics.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "risk_flags",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_flags",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 4,
    "baseline_reference_tokens": 390,
    "task_aware_prompt_tokens": 1117,
    "token_ratio": 2.8641,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.8641 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4546,
      "token_usage": {
        "prompt_tokens": 1924,
        "completion_tokens": 380,
        "total_tokens": 2304
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000517
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S04__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "e228883d082afecdd19ba2635215b9d5061f15c8c7445ef752aafa208c1aca80",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1924,
      "completion_tokens": 380,
      "total_tokens": 2304
    },
    "latency_ms": 4551,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S04",
    "execution_id": "exec_1781847835477_0935da99",
    "explanation": {
      "summary": "The checklist prioritizes Low Punctuality and Negative Trend because their current values cross the respective risk thresholds; highest severity is medium because both flags indicate significant areas of concern in student performance and engagement.",
      "insights": [
        {
          "title": "Why Low Punctuality is Active",
          "description": "The current submission punctuality is 0, which is below the expected threshold of 0.7. This triggered the flag as it indicates a consistent pattern of late submissions, warranting a medium severity level due to its potential impact on overall academic performance. This explains why that visible checklist flag is surfaced in the card.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_value",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Threshold is 0.7"
            }
          ]
        },
        {
          "title": "Why Negative Trend is Active",
          "description": "The current score trend is -0.7188, which is below the threshold of 0. This triggered the flag as it reflects a downward trajectory in assessment performance, categorized as medium severity due to its implications for future academic success. This explains why that visible checklist flag is surfaced in the card.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "flag_value",
              "value": -0.7188,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "Threshold is 0"
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
      "reason": "Data quality is consistent and reliable based on the provided metrics.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "risk_flags",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_flags",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 4,
    "baseline_reference_tokens": 390,
    "task_aware_prompt_tokens": 1117,
    "token_ratio": 2.8641,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.8641 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4546,
      "token_usage": {
        "prompt_tokens": 1924,
        "completion_tokens": 380,
        "total_tokens": 2304
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000517
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
