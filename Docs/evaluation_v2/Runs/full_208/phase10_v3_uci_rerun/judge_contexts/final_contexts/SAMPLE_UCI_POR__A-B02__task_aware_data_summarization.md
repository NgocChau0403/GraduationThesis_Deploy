# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-B02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-B02__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-B02",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
}
```

## Task Context

```json
{
  "task_name": "Completion / outcome summary",
  "scope": "Cohort",
  "actionable_question": "How many students passed, failed, or withdrew?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "categorical_distribution",
  "ai_prompt_hint": "State pass/fail/withdrawal counts. Highlight proportion at-risk.",
  "query_labels": [
    "outcome_counts"
  ],
  "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment"
  ],
  "key_db_fields": [
    "final_outcome",
    "class_id"
  ],
  "output_schema": {},
  "query_labels": [
    "outcome_counts"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-B02-CORE-01",
      "description": "State pass/fail/withdrawal counts."
    },
    {
      "requirement_id": "A-B02-CORE-02",
      "description": "Highlight proportion at-risk."
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
      "dataset_label": "outcome_counts",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-B02.json",
      "artifact_sha256": "5923dd0df5a7aea2d0616762d54d5f5d6dca4afb887f23993711e741c24d2331",
      "row_count": 2,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 2,
  "prompt_embedded_row_count": 2,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "5923dd0df5a7aea2d0616762d54d5f5d6dca4afb887f23993711e741c24d2331",
  "evidence_rows_sha256": "ee852cb8526f5551d764808249be38ee34bac4314e5b2316cfd1b269de1233c7",
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
  "full_result_row_count": 2,
  "embedded_datasets_sha256": "ee852cb8526f5551d764808249be38ee34bac4314e5b2316cfd1b269de1233c7",
  "datasets": {
    "outcome_counts": [
      {
        "final_outcome": "Pass",
        "student_count": 549,
        "pct_of_class": "84.6"
      },
      {
        "final_outcome": "Fail",
        "student_count": 100,
        "pct_of_class": "15.4"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-B02__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "f46c4dfaa738dddff4c26b705d282cd5510a86f24c738490de59c27c5d8c785e",
  "generator_input_sha256": "521c38dae396b6043a0b0a7ecf6f53d41f19a12a1c3b7dff00a8453daf4a4391",
  "generator_input_compact": {
    "task_id": "A-B02",
    "execution_id": "exec_1781847231749_26fbcb91",
    "task_name": "Completion / outcome summary",
    "analysis_type": "aggregation",
    "explanation_strategy": "distribution",
    "actionable_question": "How many students passed, failed, or withdrew?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "outcome_counts"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "outcome_counts"
    ],
    "dataset_row_counts": {
      "outcome_counts": 2
    },
    "ai_summary_config_summary": {
      "summary_type": "categorical_distribution",
      "metric_column": null,
      "entity_column": null,
      "group_column": null,
      "time_column": null,
      "sort_by": "student_count",
      "sort_direction": "desc",
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
  "raw_text": "Summary: The distribution of final outcomes reveals that a significant majority of students passed, while a smaller proportion failed. This indicates a generally positive performance within the cohort, though the failure rate suggests areas for potential improvement.\n\nInsights: High Pass Rate: A total of 549 students passed, representing 84.6% of the class, indicating a strong overall performance. | Notable Failure Rate: With 100 students failing, accounting for 15.4% of the class, this group represents a significant area of concern that warrants targeted interventions.\n\nEducational implications: The failure rate indicates that a portion of the cohort may require additional support and resources to improve their outcomes.\n\nRecommendations: high - Implement targeted support programs for students at risk of failing. - Addressing the needs of the 100 students who failed can help improve overall class performance and reduce the failure rate.",
  "structured_payload": {
    "task_id": "A-B02",
    "execution_id": "exec_1781847231749_26fbcb91",
    "explanation": {
      "summary": "The distribution of final outcomes reveals that a significant majority of students passed, while a smaller proportion failed. This indicates a generally positive performance within the cohort, though the failure rate suggests areas for potential improvement.",
      "insights": [
        {
          "title": "High Pass Rate",
          "description": "A total of 549 students passed, representing 84.6% of the class, indicating a strong overall performance.",
          "severity": "low",
          "evidence": [
            {
              "metric": "student_count",
              "value": 549,
              "comparison": "baseline",
              "delta": null,
              "context": "Total number of students who passed"
            }
          ]
        },
        {
          "title": "Notable Failure Rate",
          "description": "With 100 students failing, accounting for 15.4% of the class, this group represents a significant area of concern that warrants targeted interventions.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 100,
              "comparison": "baseline",
              "delta": null,
              "context": "Total number of students who failed"
            }
          ]
        }
      ],
      "educational_implications": [
        "The failure rate indicates that a portion of the cohort may require additional support and resources to improve their outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students at risk of failing.",
          "rationale": "Addressing the needs of the 100 students who failed can help improve overall class performance and reduce the failure rate."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and accurately reflects the final outcomes of the cohort.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "outcome_counts",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8008,
      "token_usage": {
        "prompt_tokens": 714,
        "completion_tokens": 404,
        "total_tokens": 1118
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000349
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-B02__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "f46c4dfaa738dddff4c26b705d282cd5510a86f24c738490de59c27c5d8c785e",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 714,
      "completion_tokens": 404,
      "total_tokens": 1118
    },
    "latency_ms": 8013,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-B02",
    "execution_id": "exec_1781847231749_26fbcb91",
    "explanation": {
      "summary": "The distribution of final outcomes reveals that a significant majority of students passed, while a smaller proportion failed. This indicates a generally positive performance within the cohort, though the failure rate suggests areas for potential improvement.",
      "insights": [
        {
          "title": "High Pass Rate",
          "description": "A total of 549 students passed, representing 84.6% of the class, indicating a strong overall performance.",
          "severity": "low",
          "evidence": [
            {
              "metric": "student_count",
              "value": 549,
              "comparison": "baseline",
              "delta": null,
              "context": "Total number of students who passed"
            }
          ]
        },
        {
          "title": "Notable Failure Rate",
          "description": "With 100 students failing, accounting for 15.4% of the class, this group represents a significant area of concern that warrants targeted interventions.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 100,
              "comparison": "baseline",
              "delta": null,
              "context": "Total number of students who failed"
            }
          ]
        }
      ],
      "educational_implications": [
        "The failure rate indicates that a portion of the cohort may require additional support and resources to improve their outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students at risk of failing.",
          "rationale": "Addressing the needs of the 100 students who failed can help improve overall class performance and reduce the failure rate."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and accurately reflects the final outcomes of the cohort.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "outcome_counts",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8008,
      "token_usage": {
        "prompt_tokens": 714,
        "completion_tokens": 404,
        "total_tokens": 1118
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000349
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
    "expected": 2,
    "observed": 2
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "5923dd0df5a7aea2d0616762d54d5f5d6dca4afb887f23993711e741c24d2331",
    "expected_values": [
      "5923dd0df5a7aea2d0616762d54d5f5d6dca4afb887f23993711e741c24d2331"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "ee852cb8526f5551d764808249be38ee34bac4314e5b2316cfd1b269de1233c7",
    "expected": "ee852cb8526f5551d764808249be38ee34bac4314e5b2316cfd1b269de1233c7"
  },
  {
    "check_id": "numeric_fields_outcome_counts",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "outcome_counts",
    "numeric_columns": [
      "student_count"
    ],
    "numeric_summaries": {
      "student_count": {
        "count": 2,
        "min": 100,
        "max": 549
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_outcome_counts",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "outcome_counts",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
