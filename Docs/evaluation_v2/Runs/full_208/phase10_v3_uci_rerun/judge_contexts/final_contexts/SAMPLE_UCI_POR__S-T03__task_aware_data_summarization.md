# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T03__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T03",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
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

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "peer_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T03.json",
      "artifact_sha256": "7d1e97dd81c83d3348bd288ec9989dde355d96c7b2271bfc1daa35b454a76fe1",
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
  "evidence_artifact_file_sha256": "7d1e97dd81c83d3348bd288ec9989dde355d96c7b2271bfc1daa35b454a76fe1",
  "evidence_rows_sha256": "d83549c8ba7dec7dcddade118ebe67097062e29bb8f2cf92fc642086de6a3831",
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
  "embedded_datasets_sha256": "d83549c8ba7dec7dcddade118ebe67097062e29bb8f2cf92fc642086de6a3831",
  "datasets": {
    "peer_comparison": [
      {
        "metric_name": "Average score",
        "comparison_group": "You",
        "metric_value": 41.25,
        "sort_order": 1
      },
      {
        "metric_name": "Average score",
        "comparison_group": "Cohort benchmark",
        "metric_value": 58.31,
        "sort_order": 1
      },
      {
        "metric_name": "Score percentile",
        "comparison_group": "You",
        "metric_value": 8.8,
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
        "metric_value": 0,
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T03__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "7edc4eb52d41c96eea3e299d3beee815f2026e527e66db14c4d46d77a7a5f41e",
  "generator_input_sha256": "b401fd855c5da63df1a56d99ed109a02e04c2a64738ef8510630141a8ef146af",
  "generator_input_compact": {
    "task_id": "S-T03",
    "execution_id": "exec_1781847241833_47e30f50",
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
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
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
  "raw_text": "Summary: You are currently performing below the cohort benchmark in both average score and engagement. This indicates areas where you can focus on improving your performance.\n\nInsights: Average Score Comparison: Your average score is significantly lower than the cohort benchmark, suggesting a need for improvement in your understanding of the material. | Score Percentile Standing: You are in the 8.8th percentile for scores, which is well below the cohort average of 50. This indicates that most of your peers are scoring higher than you. | Engagement Level: Your engagement percentile is at 0, which is significantly lower than the cohort's average engagement of 50. This could be impacting your overall performance.\n\nEducational implications: Improving your understanding of the material and increasing your engagement could lead to better performance.\n\nRecommendations: high - Seek additional help or tutoring in subjects where you are struggling. - This can help you improve your understanding and boost your average score. | high - Participate more actively in class and group discussions. - Increased engagement can enhance your learning experience and improve your scores.",
  "structured_payload": {
    "task_id": "S-T03",
    "execution_id": "exec_1781847241833_47e30f50",
    "explanation": {
      "summary": "You are currently performing below the cohort benchmark in both average score and engagement. This indicates areas where you can focus on improving your performance.",
      "insights": [
        {
          "title": "Average Score Comparison",
          "description": "Your average score is significantly lower than the cohort benchmark, suggesting a need for improvement in your understanding of the material.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Average score",
              "value": 41.25,
              "comparison": "down_from_previous",
              "delta": -17.06,
              "context": "Cohort benchmark is 58.31"
            }
          ]
        },
        {
          "title": "Score Percentile Standing",
          "description": "You are in the 8.8th percentile for scores, which is well below the cohort average of 50. This indicates that most of your peers are scoring higher than you.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Score percentile",
              "value": 8.8,
              "comparison": "down_from_previous",
              "delta": -41.2,
              "context": "Cohort benchmark is 50"
            }
          ]
        },
        {
          "title": "Engagement Level",
          "description": "Your engagement percentile is at 0, which is significantly lower than the cohort's average engagement of 50. This could be impacting your overall performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Engagement percentile",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": -50,
              "context": "Cohort benchmark is 50"
            }
          ]
        }
      ],
      "educational_implications": [
        "Improving your understanding of the material and increasing your engagement could lead to better performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Seek additional help or tutoring in subjects where you are struggling.",
          "rationale": "This can help you improve your understanding and boost your average score."
        },
        {
          "priority": "high",
          "action": "Participate more actively in class and group discussions.",
          "rationale": "Increased engagement can enhance your learning experience and improve your scores."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and provides a clear comparison between your performance and the cohort.",
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
      "latency_ms": 7829,
      "token_usage": {
        "prompt_tokens": 911,
        "completion_tokens": 564,
        "total_tokens": 1475
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000475
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T03__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "7edc4eb52d41c96eea3e299d3beee815f2026e527e66db14c4d46d77a7a5f41e",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 911,
      "completion_tokens": 564,
      "total_tokens": 1475
    },
    "latency_ms": 7861,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T03",
    "execution_id": "exec_1781847241833_47e30f50",
    "explanation": {
      "summary": "You are currently performing below the cohort benchmark in both average score and engagement. This indicates areas where you can focus on improving your performance.",
      "insights": [
        {
          "title": "Average Score Comparison",
          "description": "Your average score is significantly lower than the cohort benchmark, suggesting a need for improvement in your understanding of the material.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Average score",
              "value": 41.25,
              "comparison": "down_from_previous",
              "delta": -17.06,
              "context": "Cohort benchmark is 58.31"
            }
          ]
        },
        {
          "title": "Score Percentile Standing",
          "description": "You are in the 8.8th percentile for scores, which is well below the cohort average of 50. This indicates that most of your peers are scoring higher than you.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Score percentile",
              "value": 8.8,
              "comparison": "down_from_previous",
              "delta": -41.2,
              "context": "Cohort benchmark is 50"
            }
          ]
        },
        {
          "title": "Engagement Level",
          "description": "Your engagement percentile is at 0, which is significantly lower than the cohort's average engagement of 50. This could be impacting your overall performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "Engagement percentile",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": -50,
              "context": "Cohort benchmark is 50"
            }
          ]
        }
      ],
      "educational_implications": [
        "Improving your understanding of the material and increasing your engagement could lead to better performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Seek additional help or tutoring in subjects where you are struggling.",
          "rationale": "This can help you improve your understanding and boost your average score."
        },
        {
          "priority": "high",
          "action": "Participate more actively in class and group discussions.",
          "rationale": "Increased engagement can enhance your learning experience and improve your scores."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is complete and provides a clear comparison between your performance and the cohort.",
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
      "latency_ms": 7829,
      "token_usage": {
        "prompt_tokens": 911,
        "completion_tokens": 564,
        "total_tokens": 1475
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000475
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
    "observed": "7d1e97dd81c83d3348bd288ec9989dde355d96c7b2271bfc1daa35b454a76fe1",
    "expected_values": [
      "7d1e97dd81c83d3348bd288ec9989dde355d96c7b2271bfc1daa35b454a76fe1"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "d83549c8ba7dec7dcddade118ebe67097062e29bb8f2cf92fc642086de6a3831",
    "expected": "d83549c8ba7dec7dcddade118ebe67097062e29bb8f2cf92fc642086de6a3831"
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
        "min": 0,
        "max": 58.31
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
