# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G12__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2_PHASE13_SAUFIX_EXECUTABLE_ONLY.md`
- Prompt SHA-256: `8ae00287d6a8e9c23c769c97b4d11aa90e05e9126f8cd3e71fcef74500d6f48f`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G12__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_phase13_saufix_executable_only__SAMPLE_UCI_POR",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G12",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_phase13_saufix_action_correction_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G12__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "bb20b2723fb66e4d39c7d11679a8aade7f3d39c16afea2c6af6108aa47496bfc",
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
  "raw_text": "Summary: The comparison of pass and fail rates between the GP and MS groups reveals significant disparities in performance. The GP group exhibits a notably lower failure rate compared to the MS group, indicating better overall outcomes.\n\nInsights: Failure Rate Comparison: The MS group has a failure rate of 30.1%, significantly higher than the GP group's failure rate of 7.6%. This indicates that students in the MS group are more likely to fail compared to those in the GP group.\n\nEducational implications: The higher failure rate in the MS group suggests a need for targeted interventions to support these students.\n\nRecommendations: high - Implement support programs for the MS group - To address the high failure rate and improve student outcomes.",
  "structured_payload": {
    "task_id": "A-G12",
    "execution_id": "exec_1781847232738_44f516ee",
    "explanation": {
      "summary": "The comparison of pass and fail rates between the GP and MS groups reveals significant disparities in performance. The GP group exhibits a notably lower failure rate compared to the MS group, indicating better overall outcomes.",
      "insights": [
        {
          "title": "Failure Rate Comparison",
          "description": "The MS group has a failure rate of 30.1%, significantly higher than the GP group's failure rate of 7.6%. This indicates that students in the MS group are more likely to fail compared to those in the GP group.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "30.1",
              "comparison": "baseline",
              "delta": 22.5,
              "context": "MS group failure rate compared to GP group"
            },
            {
              "metric": "pct_within_group",
              "value": "7.6",
              "comparison": "baseline",
              "delta": null,
              "context": "GP group failure rate"
            }
          ]
        }
      ],
      "educational_implications": [
        "The higher failure rate in the MS group suggests a need for targeted interventions to support these students."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement support programs for the MS group",
          "rationale": "To address the high failure rate and improve student outcomes."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is derived from a complete dataset with clear metrics and comparisons.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3.1-experimental",
    "baseline_available": true,
    "input_summary_type": "group_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "outcome_by_group",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 4,
    "baseline_reference_tokens": 129,
    "task_aware_prompt_tokens": 803,
    "token_ratio": 6.2248,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "exceptions.weakest_group",
      "exceptions.dominant_group",
      "comparison.gaps",
      "primary_finding.group_series"
    ],
    "task_output_contract": [],
    "must_keep_keys": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (6.2248 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5183,
      "token_usage": {
        "prompt_tokens": 1375,
        "completion_tokens": 359,
        "total_tokens": 1734
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000422
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G12__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "bb20b2723fb66e4d39c7d11679a8aade7f3d39c16afea2c6af6108aa47496bfc",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1375,
      "completion_tokens": 359,
      "total_tokens": 1734
    },
    "latency_ms": 5186,
    "attempts_used": 2
  },
  "source_response_body": {
    "task_id": "A-G12",
    "execution_id": "exec_1781847232738_44f516ee",
    "explanation": {
      "summary": "The comparison of pass and fail rates between the GP and MS groups reveals significant disparities in performance. The GP group exhibits a notably lower failure rate compared to the MS group, indicating better overall outcomes.",
      "insights": [
        {
          "title": "Failure Rate Comparison",
          "description": "The MS group has a failure rate of 30.1%, significantly higher than the GP group's failure rate of 7.6%. This indicates that students in the MS group are more likely to fail compared to those in the GP group.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "30.1",
              "comparison": "baseline",
              "delta": 22.5,
              "context": "MS group failure rate compared to GP group"
            },
            {
              "metric": "pct_within_group",
              "value": "7.6",
              "comparison": "baseline",
              "delta": null,
              "context": "GP group failure rate"
            }
          ]
        }
      ],
      "educational_implications": [
        "The higher failure rate in the MS group suggests a need for targeted interventions to support these students."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement support programs for the MS group",
          "rationale": "To address the high failure rate and improve student outcomes."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is derived from a complete dataset with clear metrics and comparisons.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3.1-experimental",
    "baseline_available": true,
    "input_summary_type": "group_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "outcome_by_group",
        "row_count": 4,
        "included_row_count": 4
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 4,
    "baseline_reference_tokens": 129,
    "task_aware_prompt_tokens": 803,
    "token_ratio": 6.2248,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "exceptions.weakest_group",
      "exceptions.dominant_group",
      "comparison.gaps",
      "primary_finding.group_series"
    ],
    "task_output_contract": [],
    "must_keep_keys": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (6.2248 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5183,
      "token_usage": {
        "prompt_tokens": 1375,
        "completion_tokens": 359,
        "total_tokens": 1734
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000422
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
