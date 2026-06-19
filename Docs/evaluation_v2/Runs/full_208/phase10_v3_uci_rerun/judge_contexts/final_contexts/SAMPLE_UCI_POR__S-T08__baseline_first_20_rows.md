# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T08__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T08__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T08",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
}
```

## Task Context

```json
{
  "task_name": "Assessment lateness impact",
  "scope": "1 student",
  "actionable_question": "Does submitting late actually lower my score?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Use submission_delay_avg [FE] and punctuality_rate [FE]. Explain how delay magnitude correlates with score drop.",
  "query_labels": [
    "submission_lateness"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
    "assessment_result",
    "assessment [OULAD only]"
  ],
  "key_db_fields": [
    "submission_delay_days",
    "score_normalized",
    "assessment_type; submission_delay_avg [FE cross]",
    "punctuality_rate [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "submission_lateness"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T08-CORE-01",
      "description": "State average submission delay and punctuality rate."
    },
    {
      "requirement_id": "S-T08-CORE-02",
      "description": "Describe the observed relationship between delay magnitude and score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T08-CONSTRAINT-01",
      "description": "Use submission_delay_avg and punctuality_rate when returned."
    },
    {
      "constraint_id": "S-T08-CONSTRAINT-02",
      "description": "Frame the delay-score relationship as correlational, not causal."
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

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "submission_lateness",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T08.json",
      "artifact_sha256": "c564a5ade00a5fd8c29217b1a546f5abcabfce9a6ed053876042811f89cbd278",
      "row_count": 3,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 3,
  "prompt_embedded_row_count": 3,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "c564a5ade00a5fd8c29217b1a546f5abcabfce9a6ed053876042811f89cbd278",
  "evidence_rows_sha256": "e40b3d0befcd610cd5ca02e7f29adbc7227359cc361bd632cc73b8dd2ee31a94",
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
  "full_result_row_count": 3,
  "embedded_datasets_sha256": "e40b3d0befcd610cd5ca02e7f29adbc7227359cc361bd632cc73b8dd2ee31a94",
  "datasets": {
    "submission_lateness": [
      {
        "assessment_order": 1,
        "assessment_type": "quiz",
        "assessment_name": "G1",
        "submission_delay_days": null,
        "score_normalized": 0,
        "pass_flag": false,
        "submission_day": null,
        "due_day": 21,
        "submission_delay_avg": null,
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 2,
        "assessment_type": "quiz",
        "assessment_name": "G2",
        "submission_delay_days": null,
        "score_normalized": 55,
        "pass_flag": true,
        "submission_day": null,
        "due_day": 56,
        "submission_delay_avg": null,
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 3,
        "assessment_type": "exam",
        "assessment_name": "G3",
        "submission_delay_days": null,
        "score_normalized": 55,
        "pass_flag": true,
        "submission_day": null,
        "due_day": 98,
        "submission_delay_avg": null,
        "punctuality_rate": "0"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T08__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "c9bb49811d08ad747190eba8434cca9aff5638fda137dd3ef5246bb8b55e9475",
  "generator_input_sha256": "3d06b9aca6e6e733768a238fa1bfcb9ecf96f80ddfb025a68d536b92df3c9acd",
  "generator_input_compact": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847244206_98df1cbc",
    "task_name": "Assessment lateness impact",
    "analysis_type": "correlation",
    "explanation_strategy": "behavioral",
    "actionable_question": "Does submitting late actually lower my score?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "submission_lateness"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "submission_lateness"
    ],
    "dataset_row_counts": {
      "submission_lateness": 3
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "submission_delay_days",
      "entity_column": null,
      "group_column": null,
      "time_column": "assessment_order",
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
  "raw_text": "Summary: Your submission patterns show that you have not submitted any assessments late, which is a positive sign for your punctuality. However, your scores on the quizzes and exam indicate that while you are passing, there is room for improvement in your performance.\n\nInsights: Consistent Punctuality: You have maintained a punctuality rate of 0, meaning you have not submitted any assessments late. This is a great habit that can help you stay organized and reduce stress. | Score Performance: Your scores for the quizzes and exam are both 55, indicating that while you are passing, there may be opportunities to enhance your understanding of the material to achieve higher scores.\n\nEducational implications: Maintaining punctuality is beneficial, but improving your understanding of the material could lead to better scores.\n\nRecommendations: high - Engage more with course materials and seek help if needed. - Improving your grasp of the content can help raise your scores while maintaining your punctuality.",
  "structured_payload": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847244206_98df1cbc",
    "explanation": {
      "summary": "Your submission patterns show that you have not submitted any assessments late, which is a positive sign for your punctuality. However, your scores on the quizzes and exam indicate that while you are passing, there is room for improvement in your performance.",
      "insights": [
        {
          "title": "Consistent Punctuality",
          "description": "You have maintained a punctuality rate of 0, meaning you have not submitted any assessments late. This is a great habit that can help you stay organized and reduce stress.",
          "severity": "low",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "stable",
              "delta": null,
              "context": "No late submissions recorded"
            }
          ]
        },
        {
          "title": "Score Performance",
          "description": "Your scores for the quizzes and exam are both 55, indicating that while you are passing, there may be opportunities to enhance your understanding of the material to achieve higher scores.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "stable",
              "delta": null,
              "context": "Consistent score across assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "Maintaining punctuality is beneficial, but improving your understanding of the material could lead to better scores."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Engage more with course materials and seek help if needed.",
          "rationale": "Improving your grasp of the content can help raise your scores while maintaining your punctuality."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is clear and consistent with no missing values.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
      "latency_ms": 11407,
      "token_usage": {
        "prompt_tokens": 769,
        "completion_tokens": 424,
        "total_tokens": 1193
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.00037
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T08__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "c9bb49811d08ad747190eba8434cca9aff5638fda137dd3ef5246bb8b55e9475",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 769,
      "completion_tokens": 424,
      "total_tokens": 1193
    },
    "latency_ms": 11412,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847244206_98df1cbc",
    "explanation": {
      "summary": "Your submission patterns show that you have not submitted any assessments late, which is a positive sign for your punctuality. However, your scores on the quizzes and exam indicate that while you are passing, there is room for improvement in your performance.",
      "insights": [
        {
          "title": "Consistent Punctuality",
          "description": "You have maintained a punctuality rate of 0, meaning you have not submitted any assessments late. This is a great habit that can help you stay organized and reduce stress.",
          "severity": "low",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "stable",
              "delta": null,
              "context": "No late submissions recorded"
            }
          ]
        },
        {
          "title": "Score Performance",
          "description": "Your scores for the quizzes and exam are both 55, indicating that while you are passing, there may be opportunities to enhance your understanding of the material to achieve higher scores.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "stable",
              "delta": null,
              "context": "Consistent score across assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "Maintaining punctuality is beneficial, but improving your understanding of the material could lead to better scores."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Engage more with course materials and seek help if needed.",
          "rationale": "Improving your grasp of the content can help raise your scores while maintaining your punctuality."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is clear and consistent with no missing values.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
      "latency_ms": 11407,
      "token_usage": {
        "prompt_tokens": 769,
        "completion_tokens": 424,
        "total_tokens": 1193
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.00037
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
    "expected": 3,
    "observed": 3
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "c564a5ade00a5fd8c29217b1a546f5abcabfce9a6ed053876042811f89cbd278",
    "expected_values": [
      "c564a5ade00a5fd8c29217b1a546f5abcabfce9a6ed053876042811f89cbd278"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "e40b3d0befcd610cd5ca02e7f29adbc7227359cc361bd632cc73b8dd2ee31a94",
    "expected": "e40b3d0befcd610cd5ca02e7f29adbc7227359cc361bd632cc73b8dd2ee31a94"
  },
  {
    "check_id": "numeric_fields_submission_lateness",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "submission_lateness",
    "numeric_columns": [
      "assessment_order",
      "due_day",
      "score_normalized"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 3,
        "min": 1,
        "max": 3
      },
      "due_day": {
        "count": 3,
        "min": 21,
        "max": 98
      },
      "score_normalized": {
        "count": 3,
        "min": 0,
        "max": 55
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_submission_lateness",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "submission_lateness",
    "flag_columns": [
      "pass_flag"
    ],
    "triggered_like_counts": {
      "pass_flag": 2
    }
  }
]
```
