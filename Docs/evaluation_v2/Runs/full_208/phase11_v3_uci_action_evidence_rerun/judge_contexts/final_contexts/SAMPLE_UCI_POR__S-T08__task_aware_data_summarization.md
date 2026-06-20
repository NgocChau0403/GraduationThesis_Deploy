# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T08__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T08__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T08",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T08__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "a0ce450184931ea762bbc3923788408fcd26b63e1090dd777f17204092ffbdc6",
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
  "raw_text": "Summary: Your submission patterns show that you have not submitted any assessments on time, which may be impacting your overall engagement and scores. While you have passed your quizzes and exam, the lack of punctuality could hinder your learning experience.\n\nInsights: Consistent Late Submissions: You have a punctuality rate of 0, indicating that you have not submitted any assessments on time. This consistent lateness can lead to missed opportunities for feedback and improvement. | Scores Despite Late Submissions: You have managed to pass your assessments with scores of 55, but this is below the average passing score. Late submissions may limit your ability to achieve higher scores.\n\nEducational implications: Submitting assessments on time is crucial for maximizing your learning and performance.\n\nRecommendations: high - Set reminders for assessment due dates. - This will help you stay on track and improve your punctuality, which can lead to better scores. | medium - Review feedback on past assessments. - Understanding where you can improve will help you perform better in future assessments.",
  "structured_payload": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847244206_98df1cbc",
    "explanation": {
      "summary": "Your submission patterns show that you have not submitted any assessments on time, which may be impacting your overall engagement and scores. While you have passed your quizzes and exam, the lack of punctuality could hinder your learning experience.",
      "insights": [
        {
          "title": "Consistent Late Submissions",
          "description": "You have a punctuality rate of 0, indicating that you have not submitted any assessments on time. This consistent lateness can lead to missed opportunities for feedback and improvement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "baseline",
              "delta": null,
              "context": "No assessments submitted on time"
            }
          ]
        },
        {
          "title": "Scores Despite Late Submissions",
          "description": "You have managed to pass your assessments with scores of 55, but this is below the average passing score. Late submissions may limit your ability to achieve higher scores.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "baseline",
              "delta": null,
              "context": "Scores for G2 and G3"
            }
          ]
        }
      ],
      "educational_implications": [
        "Submitting assessments on time is crucial for maximizing your learning and performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Set reminders for assessment due dates.",
          "rationale": "This will help you stay on track and improve your punctuality, which can lead to better scores."
        },
        {
          "priority": "medium",
          "action": "Review feedback on past assessments.",
          "rationale": "Understanding where you can improve will help you perform better in future assessments."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and clearly indicates submission patterns.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 3,
    "included_row_count": 3,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_lateness",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8466,
      "token_usage": {
        "prompt_tokens": 921,
        "completion_tokens": 454,
        "total_tokens": 1375
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000411
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T08__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "a0ce450184931ea762bbc3923788408fcd26b63e1090dd777f17204092ffbdc6",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 921,
      "completion_tokens": 454,
      "total_tokens": 1375
    },
    "latency_ms": 8472,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847244206_98df1cbc",
    "explanation": {
      "summary": "Your submission patterns show that you have not submitted any assessments on time, which may be impacting your overall engagement and scores. While you have passed your quizzes and exam, the lack of punctuality could hinder your learning experience.",
      "insights": [
        {
          "title": "Consistent Late Submissions",
          "description": "You have a punctuality rate of 0, indicating that you have not submitted any assessments on time. This consistent lateness can lead to missed opportunities for feedback and improvement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "baseline",
              "delta": null,
              "context": "No assessments submitted on time"
            }
          ]
        },
        {
          "title": "Scores Despite Late Submissions",
          "description": "You have managed to pass your assessments with scores of 55, but this is below the average passing score. Late submissions may limit your ability to achieve higher scores.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "baseline",
              "delta": null,
              "context": "Scores for G2 and G3"
            }
          ]
        }
      ],
      "educational_implications": [
        "Submitting assessments on time is crucial for maximizing your learning and performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Set reminders for assessment due dates.",
          "rationale": "This will help you stay on track and improve your punctuality, which can lead to better scores."
        },
        {
          "priority": "medium",
          "action": "Review feedback on past assessments.",
          "rationale": "Understanding where you can improve will help you perform better in future assessments."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and clearly indicates submission patterns.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 3,
    "included_row_count": 3,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_lateness",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8466,
      "token_usage": {
        "prompt_tokens": 921,
        "completion_tokens": 454,
        "total_tokens": 1375
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000411
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
