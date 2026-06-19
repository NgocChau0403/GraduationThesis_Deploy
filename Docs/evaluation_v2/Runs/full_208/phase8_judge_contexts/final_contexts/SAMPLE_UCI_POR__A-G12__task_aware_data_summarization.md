# LLM Judge V2 Final Judge Context - SAMPLE_UCI_POR__A-G12__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G12__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G12",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Background group pass/fail/withdrawal rate",
  "scope": "Many students",
  "actionable_question": "Which demographic groups have the highest failure or dropout rate?",
  "target_audience": "academic_advisor, admin",
  "ai_summary_type": "group_comparison",
  "ai_prompt_hint": "For each demographic group, state fail rate and withdrawal rate as percentages. Flag groups where fail+withdrawn > cohort threshold. Note: output is categorical final_outcome — distinct from A-G08 which uses continuous avg_score.",
  "query_labels": [
    "outcome_by_group"
  ],
  "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "enrollment"
  ],
  "key_db_fields": [
    "socioeconomic_band / gender / age_group / highest_education; final_outcome"
  ],
  "output_schema": {
    "required_columns": [
      "group_value",
      "final_outcome",
      "pct_within_group"
    ],
    "optional_columns": [
      "student_count"
    ]
  },
  "query_labels": [
    "outcome_by_group"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G12-CORE-01",
      "description": "For each demographic group, state fail rate and withdrawal rate as percentages."
    },
    {
      "requirement_id": "A-G12-CORE-02",
      "description": "Flag groups where fail+withdrawn > cohort threshold."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G12-CONSTRAINT-01",
      "description": "Do not conflate categorical pass, fail, or withdrawal outcomes with continuous score metrics when interpreting group results."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Applicable because the task compares failure and withdrawal rates across demographic groups."
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "outcome_by_group",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G12.json",
      "artifact_sha256": "e89d1a5fe07f67b8ce1c2004da0666644c2384146933a343edb249a7f1ca7f8c",
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
  "evidence_artifact_file_sha256": "e89d1a5fe07f67b8ce1c2004da0666644c2384146933a343edb249a7f1ca7f8c",
  "evidence_rows_sha256": "c220f643bbbb6cafb698bfdf87f07663c0e05004aaf255bc69f054f840ff760f",
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
  "embedded_datasets_sha256": "c220f643bbbb6cafb698bfdf87f07663c0e05004aaf255bc69f054f840ff760f",
  "datasets": {
    "outcome_by_group": [
      {
        "group_value": "GP",
        "final_outcome": "Fail",
        "student_count": 32,
        "pct_within_group": "7.6"
      },
      {
        "group_value": "GP",
        "final_outcome": "Pass",
        "student_count": 391,
        "pct_within_group": "92.4"
      },
      {
        "group_value": "MS",
        "final_outcome": "Fail",
        "student_count": 68,
        "pct_within_group": "30.1"
      },
      {
        "group_value": "MS",
        "final_outcome": "Pass",
        "student_count": 158,
        "pct_within_group": "69.9"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G12__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "44b3bbf0f9216ea459c78be1fbd7ae01c35cdaa61043e354c3a1e598cc465018",
  "generator_input_sha256": "cbad0f7ba39159982aa89a9aa368a30a44d2ed59dc448ac2c90a310e0a797890",
  "generator_input_compact": {
    "task_id": "A-G12",
    "execution_id": "exec_1781847232738_44f516ee",
    "task_name": "Background group pass/fail/withdrawal rate",
    "analysis_type": "segmentation",
    "explanation_strategy": "comparison",
    "actionable_question": "Which demographic groups have the highest failure or dropout rate?",
    "target_audience": [
      "academic_advisor",
      "admin"
    ],
    "query_labels": [
      "outcome_by_group"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "outcome_by_group"
    ],
    "dataset_row_counts": {
      "outcome_by_group": 4
    },
    "ai_summary_config_summary": {
      "summary_type": "group_comparison",
      "metric_column": "pct_within_group",
      "entity_column": null,
      "group_column": "group_value",
      "time_column": null,
      "sort_by": "pct_within_group",
      "sort_direction": "desc",
      "top_k": 12,
      "bottom_k": 4,
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
  "raw_text": "Summary: The analysis of pass and fail rates between the GP and MS groups reveals significant differences in performance, particularly in failure rates. The MS group exhibits a notably higher failure rate compared to the GP group.\n\nInsights: Failure Rate Comparison: The MS group has a failure rate of 30.1%, which is significantly higher than the GP group's failure rate of 7.6%. This indicates a concerning trend in the MS group regarding student outcomes. | Pass Rate Comparison: The GP group has a pass rate of 92.4%, while the MS group has a pass rate of 69.9%. This further emphasizes the disparity in academic success between the two groups.\n\nEducational implications: The high failure rate in the MS group suggests a need for targeted interventions to support these students.\n\nRecommendations: high - Implement support programs for the MS group - To address the high failure rate and improve overall student outcomes.",
  "structured_payload": {
    "task_id": "A-G12",
    "execution_id": "exec_1781847232738_44f516ee",
    "explanation": {
      "summary": "The analysis of pass and fail rates between the GP and MS groups reveals significant differences in performance, particularly in failure rates. The MS group exhibits a notably higher failure rate compared to the GP group.",
      "insights": [
        {
          "title": "Failure Rate Comparison",
          "description": "The MS group has a failure rate of 30.1%, which is significantly higher than the GP group's failure rate of 7.6%. This indicates a concerning trend in the MS group regarding student outcomes.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "30.1",
              "comparison": "baseline",
              "delta": 22.5,
              "context": "MS group failure rate compared to GP group"
            }
          ]
        },
        {
          "title": "Pass Rate Comparison",
          "description": "The GP group has a pass rate of 92.4%, while the MS group has a pass rate of 69.9%. This further emphasizes the disparity in academic success between the two groups.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "69.9",
              "comparison": "baseline",
              "delta": -22.5,
              "context": "MS group pass rate compared to GP group"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high failure rate in the MS group suggests a need for targeted interventions to support these students."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement support programs for the MS group",
          "rationale": "To address the high failure rate and improve overall student outcomes."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and directly compares the two groups based on final outcomes.",
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
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "outcome_by_group",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6734,
      "token_usage": {
        "prompt_tokens": 870,
        "completion_tokens": 435,
        "total_tokens": 1305
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000392
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G12__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "44b3bbf0f9216ea459c78be1fbd7ae01c35cdaa61043e354c3a1e598cc465018",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 870,
      "completion_tokens": 435,
      "total_tokens": 1305
    },
    "latency_ms": 6756,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G12",
    "execution_id": "exec_1781847232738_44f516ee",
    "explanation": {
      "summary": "The analysis of pass and fail rates between the GP and MS groups reveals significant differences in performance, particularly in failure rates. The MS group exhibits a notably higher failure rate compared to the GP group.",
      "insights": [
        {
          "title": "Failure Rate Comparison",
          "description": "The MS group has a failure rate of 30.1%, which is significantly higher than the GP group's failure rate of 7.6%. This indicates a concerning trend in the MS group regarding student outcomes.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "30.1",
              "comparison": "baseline",
              "delta": 22.5,
              "context": "MS group failure rate compared to GP group"
            }
          ]
        },
        {
          "title": "Pass Rate Comparison",
          "description": "The GP group has a pass rate of 92.4%, while the MS group has a pass rate of 69.9%. This further emphasizes the disparity in academic success between the two groups.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "69.9",
              "comparison": "baseline",
              "delta": -22.5,
              "context": "MS group pass rate compared to GP group"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high failure rate in the MS group suggests a need for targeted interventions to support these students."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement support programs for the MS group",
          "rationale": "To address the high failure rate and improve overall student outcomes."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and directly compares the two groups based on final outcomes.",
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
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "outcome_by_group",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6734,
      "token_usage": {
        "prompt_tokens": 870,
        "completion_tokens": 435,
        "total_tokens": 1305
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000392
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
    "observed": "e89d1a5fe07f67b8ce1c2004da0666644c2384146933a343edb249a7f1ca7f8c",
    "expected_values": [
      "e89d1a5fe07f67b8ce1c2004da0666644c2384146933a343edb249a7f1ca7f8c"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "c220f643bbbb6cafb698bfdf87f07663c0e05004aaf255bc69f054f840ff760f",
    "expected": "c220f643bbbb6cafb698bfdf87f07663c0e05004aaf255bc69f054f840ff760f"
  },
  {
    "check_id": "numeric_fields_outcome_by_group",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "outcome_by_group",
    "numeric_columns": [
      "student_count"
    ],
    "numeric_summaries": {
      "student_count": {
        "count": 4,
        "min": 32,
        "max": 391
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_outcome_by_group",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "outcome_by_group",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
