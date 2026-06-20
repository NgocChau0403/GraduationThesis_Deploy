# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T03__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T03",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Peer comparison",
  "scope": "1 student",
  "actionable_question": "Where do I stand compared to my class?",
  "target_audience": "student",
  "ai_summary_type": "multi_metric_comparison",
  "ai_prompt_hint": "Show student's standing (top X%). Explain which metrics are above/below average.",
  "query_labels": [
    "peer_comparison"
  ],
  "explanation_strategy": "comparison"
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
    "avg_score [FE cross]",
    "engagement_score [FE cross]",
    "pass_rate [FE cross]",
    "performance_trend [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "peer_comparison"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T03-CORE-01",
      "description": "Show student's standing (top X%)."
    },
    {
      "requirement_id": "S-T03-CORE-02",
      "description": "Explain which metrics are above/below average."
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
      "dataset_label": "peer_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T03.json",
      "artifact_sha256": "fe610876e89ca66eba912e2edc06e235347cbdec54f8c8c0f344e278d45741b0",
      "row_count": 6,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 6,
  "prompt_embedded_row_count": 6,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "fe610876e89ca66eba912e2edc06e235347cbdec54f8c8c0f344e278d45741b0",
  "evidence_rows_sha256": "258ba6c73463a11719ee33bb99ee61829cd66432c386f97717cdff3b64fa6b62",
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
  "full_result_row_count": 6,
  "embedded_datasets_sha256": "258ba6c73463a11719ee33bb99ee61829cd66432c386f97717cdff3b64fa6b62",
  "datasets": {
    "peer_comparison": [
      {
        "metric_name": "Average score",
        "comparison_group": "You",
        "metric_value": 94.34,
        "sort_order": 1
      },
      {
        "metric_name": "Average score",
        "comparison_group": "Cohort benchmark",
        "metric_value": 66.68,
        "sort_order": 1
      },
      {
        "metric_name": "Score percentile",
        "comparison_group": "You",
        "metric_value": 89.8,
        "sort_order": 2
      },
      {
        "metric_name": "Score percentile",
        "comparison_group": "Cohort benchmark",
        "metric_value": 50,
        "sort_order": 2
      },
      {
        "metric_name": "Engagement percentile",
        "comparison_group": "You",
        "metric_value": 75,
        "sort_order": 3
      },
      {
        "metric_name": "Engagement percentile",
        "comparison_group": "Cohort benchmark",
        "metric_value": 50,
        "sort_order": 3
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T03__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "78f70d2bdd104e87d14cce0523123eddc5a84949b28993141c85110bb4ba099d",
  "generator_input_sha256": "63419465a57f79283ceb775514e65535ed0b43fc16e0911fa5bb52df2872e224",
  "generator_input_compact": {
    "task_id": "S-T03",
    "execution_id": "exec_1781847881232_997b11bc",
    "task_name": "Peer comparison",
    "analysis_type": "comparison",
    "explanation_strategy": "comparison",
    "actionable_question": "Where do I stand compared to my class?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "peer_comparison"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "peer_comparison"
    ],
    "dataset_row_counts": {
      "peer_comparison": 6
    },
    "ai_summary_config_summary": {
      "summary_type": "multi_metric_comparison",
      "metric_column": null,
      "entity_column": null,
      "group_column": "comparison_group",
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
  "raw_text": "Summary: You are performing exceptionally well compared to your cohort. Your average score, score percentile, and engagement percentile are all significantly higher than the cohort benchmark, indicating strong academic performance and engagement.\n\nInsights: Outstanding Average Score: Your average score of 94.34 is well above the cohort benchmark of 66.68, showcasing your strong academic abilities. | High Score Percentile: With a score percentile of 89.8, you are in the top 10% of your class, compared to the cohort's average of 50. | Strong Engagement: Your engagement percentile of 75 indicates that you are more engaged than the average student in your cohort, who has a percentile of 50.\n\nEducational implications: Your high performance suggests effective study habits and a strong understanding of the material.\n\nRecommendations: medium - Continue to engage with your studies and seek challenges. - Maintaining your current level of engagement and seeking out more challenging material can help you continue to excel.",
  "structured_payload": {
    "task_id": "S-T03",
    "execution_id": "exec_1781847881232_997b11bc",
    "explanation": {
      "summary": "You are performing exceptionally well compared to your cohort. Your average score, score percentile, and engagement percentile are all significantly higher than the cohort benchmark, indicating strong academic performance and engagement.",
      "insights": [
        {
          "title": "Outstanding Average Score",
          "description": "Your average score of 94.34 is well above the cohort benchmark of 66.68, showcasing your strong academic abilities.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Average score",
              "value": 94.34,
              "comparison": "up_from_previous",
              "delta": 27.66,
              "context": "Cohort benchmark"
            }
          ]
        },
        {
          "title": "High Score Percentile",
          "description": "With a score percentile of 89.8, you are in the top 10% of your class, compared to the cohort's average of 50.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Score percentile",
              "value": 89.8,
              "comparison": "up_from_previous",
              "delta": 39.8,
              "context": "Cohort benchmark"
            }
          ]
        },
        {
          "title": "Strong Engagement",
          "description": "Your engagement percentile of 75 indicates that you are more engaged than the average student in your cohort, who has a percentile of 50.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "Engagement percentile",
              "value": 75,
              "comparison": "up_from_previous",
              "delta": 25,
              "context": "Cohort benchmark"
            }
          ]
        }
      ],
      "educational_implications": [
        "Your high performance suggests effective study habits and a strong understanding of the material."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Continue to engage with your studies and seek challenges.",
          "rationale": "Maintaining your current level of engagement and seeking out more challenging material can help you continue to excel."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is clear and shows a strong comparison between your performance and the cohort.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "peer_comparison",
        "row_count": 6,
        "included_row_count": 6
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6736,
      "token_usage": {
        "prompt_tokens": 911,
        "completion_tokens": 515,
        "total_tokens": 1426
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000446
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T03__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "78f70d2bdd104e87d14cce0523123eddc5a84949b28993141c85110bb4ba099d",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 911,
      "completion_tokens": 515,
      "total_tokens": 1426
    },
    "latency_ms": 6770,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T03",
    "execution_id": "exec_1781847881232_997b11bc",
    "explanation": {
      "summary": "You are performing exceptionally well compared to your cohort. Your average score, score percentile, and engagement percentile are all significantly higher than the cohort benchmark, indicating strong academic performance and engagement.",
      "insights": [
        {
          "title": "Outstanding Average Score",
          "description": "Your average score of 94.34 is well above the cohort benchmark of 66.68, showcasing your strong academic abilities.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Average score",
              "value": 94.34,
              "comparison": "up_from_previous",
              "delta": 27.66,
              "context": "Cohort benchmark"
            }
          ]
        },
        {
          "title": "High Score Percentile",
          "description": "With a score percentile of 89.8, you are in the top 10% of your class, compared to the cohort's average of 50.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Score percentile",
              "value": 89.8,
              "comparison": "up_from_previous",
              "delta": 39.8,
              "context": "Cohort benchmark"
            }
          ]
        },
        {
          "title": "Strong Engagement",
          "description": "Your engagement percentile of 75 indicates that you are more engaged than the average student in your cohort, who has a percentile of 50.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "Engagement percentile",
              "value": 75,
              "comparison": "up_from_previous",
              "delta": 25,
              "context": "Cohort benchmark"
            }
          ]
        }
      ],
      "educational_implications": [
        "Your high performance suggests effective study habits and a strong understanding of the material."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Continue to engage with your studies and seek challenges.",
          "rationale": "Maintaining your current level of engagement and seeking out more challenging material can help you continue to excel."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is clear and shows a strong comparison between your performance and the cohort.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "peer_comparison",
        "row_count": 6,
        "included_row_count": 6
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6736,
      "token_usage": {
        "prompt_tokens": 911,
        "completion_tokens": 515,
        "total_tokens": 1426
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000446
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
    "expected": 6,
    "observed": 6
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "fe610876e89ca66eba912e2edc06e235347cbdec54f8c8c0f344e278d45741b0",
    "expected_values": [
      "fe610876e89ca66eba912e2edc06e235347cbdec54f8c8c0f344e278d45741b0"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "258ba6c73463a11719ee33bb99ee61829cd66432c386f97717cdff3b64fa6b62",
    "expected": "258ba6c73463a11719ee33bb99ee61829cd66432c386f97717cdff3b64fa6b62"
  },
  {
    "check_id": "numeric_fields_peer_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "peer_comparison",
    "numeric_columns": [
      "metric_value",
      "sort_order"
    ],
    "numeric_summaries": {
      "metric_value": {
        "count": 6,
        "min": 50,
        "max": 94.34
      },
      "sort_order": {
        "count": 6,
        "min": 1,
        "max": 3
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_peer_comparison",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "peer_comparison",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
