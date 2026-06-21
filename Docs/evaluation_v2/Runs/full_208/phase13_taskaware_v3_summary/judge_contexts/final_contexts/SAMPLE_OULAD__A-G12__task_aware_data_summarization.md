# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G12__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G12__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G12",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
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

## Deterministic Retrieval Evidence

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "outcome_by_group",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G12.json",
      "artifact_sha256": "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e",
      "row_count": 53,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 53,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 53,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G12__task_aware_data_summarization.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e",
  "evidence_rows_sha256": "a5465584ca6ef16751adfb3b01e110713b6d40278cc8ff3ef83d87c1644e19f2",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 53,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__A-G12__task_aware_data_summarization__outcome_by_group__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "outcome_by_group",
        "row_start_inclusive": 0,
        "row_end_inclusive": 52,
        "row_count": 53
      }
    ],
    "issues": []
  }
}
```

```json
{
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "retrieval_log": {
    "artifact_type": "llm_judge_v2_phase6_4_deterministic_retrieval_log",
    "generated_at": "2026-06-20T16:29:37.163Z",
    "record_id": "SAMPLE_OULAD__A-G12__task_aware_data_summarization",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__A-G12__task_aware_data_summarization__outcome_by_group__chunk_1",
        "dataset_label": "outcome_by_group",
        "row_start_inclusive": 0,
        "row_end_inclusive": 52,
        "row_count": 53,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G12.json",
        "source_artifact_sha256": "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e"
      }
    ]
  },
  "retrieved_datasets_sha256": "a5465584ca6ef16751adfb3b01e110713b6d40278cc8ff3ef83d87c1644e19f2",
  "retrieved_datasets": {
    "outcome_by_group": [
      {
        "group_value": "0-10%",
        "final_outcome": "Distinction",
        "student_count": 16,
        "pct_within_group": "7.6"
      },
      {
        "group_value": "0-10%",
        "final_outcome": "Fail",
        "student_count": 29,
        "pct_within_group": "13.8"
      },
      {
        "group_value": "0-10%",
        "final_outcome": "Pass",
        "student_count": 52,
        "pct_within_group": "24.8"
      },
      {
        "group_value": "0-10%",
        "final_outcome": "Withdrawn",
        "student_count": 113,
        "pct_within_group": "53.8"
      },
      {
        "group_value": "10-20",
        "final_outcome": "Distinction",
        "student_count": 18,
        "pct_within_group": "8.1"
      },
      {
        "group_value": "10-20",
        "final_outcome": "Fail",
        "student_count": 44,
        "pct_within_group": "19.9"
      },
      {
        "group_value": "10-20",
        "final_outcome": "Pass",
        "student_count": 51,
        "pct_within_group": "23.1"
      },
      {
        "group_value": "10-20",
        "final_outcome": "Withdrawn",
        "student_count": 108,
        "pct_within_group": "48.9"
      },
      {
        "group_value": "20-30%",
        "final_outcome": "Distinction",
        "student_count": 26,
        "pct_within_group": "10"
      },
      {
        "group_value": "20-30%",
        "final_outcome": "Fail",
        "student_count": 43,
        "pct_within_group": "16.5"
      },
      {
        "group_value": "20-30%",
        "final_outcome": "Pass",
        "student_count": 53,
        "pct_within_group": "20.4"
      },
      {
        "group_value": "20-30%",
        "final_outcome": "Withdrawn",
        "student_count": 138,
        "pct_within_group": "53.1"
      },
      {
        "group_value": "30-40%",
        "final_outcome": "Distinction",
        "student_count": 23,
        "pct_within_group": "8.8"
      },
      {
        "group_value": "30-40%",
        "final_outcome": "Fail",
        "student_count": 45,
        "pct_within_group": "17.3"
      },
      {
        "group_value": "30-40%",
        "final_outcome": "Pass",
        "student_count": 78,
        "pct_within_group": "30"
      },
      {
        "group_value": "30-40%",
        "final_outcome": "Withdrawn",
        "student_count": 114,
        "pct_within_group": "43.8"
      },
      {
        "group_value": "40-50%",
        "final_outcome": "Distinction",
        "student_count": 23,
        "pct_within_group": "9.5"
      },
      {
        "group_value": "40-50%",
        "final_outcome": "Fail",
        "student_count": 34,
        "pct_within_group": "14.1"
      },
      {
        "group_value": "40-50%",
        "final_outcome": "Pass",
        "student_count": 70,
        "pct_within_group": "29"
      },
      {
        "group_value": "40-50%",
        "final_outcome": "Withdrawn",
        "student_count": 114,
        "pct_within_group": "47.3"
      },
      {
        "group_value": "50-60%",
        "final_outcome": "Distinction",
        "student_count": 26,
        "pct_within_group": "10.8"
      },
      {
        "group_value": "50-60%",
        "final_outcome": "Fail",
        "student_count": 38,
        "pct_within_group": "15.8"
      },
      {
        "group_value": "50-60%",
        "final_outcome": "Pass",
        "student_count": 76,
        "pct_within_group": "31.5"
      },
      {
        "group_value": "50-60%",
        "final_outcome": "Withdrawn",
        "student_count": 101,
        "pct_within_group": "41.9"
      },
      {
        "group_value": "60-70%",
        "final_outcome": "Distinction",
        "student_count": 29,
        "pct_within_group": "12.6"
      },
      {
        "group_value": "60-70%",
        "final_outcome": "Fail",
        "student_count": 37,
        "pct_within_group": "16.1"
      },
      {
        "group_value": "60-70%",
        "final_outcome": "Pass",
        "student_count": 71,
        "pct_within_group": "30.9"
      },
      {
        "group_value": "60-70%",
        "final_outcome": "Withdrawn",
        "student_count": 93,
        "pct_within_group": "40.4"
      },
      {
        "group_value": "70-80%",
        "final_outcome": "Distinction",
        "student_count": 34,
        "pct_within_group": "14.7"
      },
      {
        "group_value": "70-80%",
        "final_outcome": "Fail",
        "student_count": 43,
        "pct_within_group": "18.6"
      },
      {
        "group_value": "70-80%",
        "final_outcome": "Pass",
        "student_count": 62,
        "pct_within_group": "26.8"
      },
      {
        "group_value": "70-80%",
        "final_outcome": "Withdrawn",
        "student_count": 92,
        "pct_within_group": "39.8"
      },
      {
        "group_value": "80-90%",
        "final_outcome": "Distinction",
        "student_count": 37,
        "pct_within_group": "15"
      },
      {
        "group_value": "80-90%",
        "final_outcome": "Fail",
        "student_count": 41,
        "pct_within_group": "16.7"
      },
      {
        "group_value": "80-90%",
        "final_outcome": "Pass",
        "student_count": 80,
        "pct_within_group": "32.5"
      },
      {
        "group_value": "80-90%",
        "final_outcome": "Withdrawn",
        "student_count": 88,
        "pct_within_group": "35.8"
      },
      {
        "group_value": "90-100%",
        "final_outcome": "Distinction",
        "student_count": 36,
        "pct_within_group": "17"
      },
      {
        "group_value": "90-100%",
        "final_outcome": "Fail",
        "student_count": 36,
        "pct_within_group": "17"
      },
      {
        "group_value": "90-100%",
        "final_outcome": "Pass",
        "student_count": 65,
        "pct_within_group": "30.7"
      },
      {
        "group_value": "90-100%",
        "final_outcome": "Withdrawn",
        "student_count": 75,
        "pct_within_group": "35.4"
      },
      {
        "group_value": "Ireland",
        "final_outcome": "Distinction",
        "student_count": 9,
        "pct_within_group": "21.4"
      },
      {
        "group_value": "Ireland",
        "final_outcome": "Fail",
        "student_count": 2,
        "pct_within_group": "4.8"
      },
      {
        "group_value": "Ireland",
        "final_outcome": "Pass",
        "student_count": 22,
        "pct_within_group": "52.4"
      },
      {
        "group_value": "Ireland",
        "final_outcome": "Withdrawn",
        "student_count": 9,
        "pct_within_group": "21.4"
      },
      {
        "group_value": "North Region",
        "final_outcome": "Distinction",
        "student_count": 28,
        "pct_within_group": "28.6"
      },
      {
        "group_value": "North Region",
        "final_outcome": "Fail",
        "student_count": 13,
        "pct_within_group": "13.3"
      },
      {
        "group_value": "North Region",
        "final_outcome": "Pass",
        "student_count": 27,
        "pct_within_group": "27.6"
      },
      {
        "group_value": "North Region",
        "final_outcome": "Withdrawn",
        "student_count": 30,
        "pct_within_group": "30.6"
      },
      {
        "group_value": "Scotland",
        "final_outcome": "Fail",
        "student_count": 1,
        "pct_within_group": "100"
      },
      {
        "group_value": "South Region",
        "final_outcome": "Distinction",
        "student_count": 1,
        "pct_within_group": "25"
      },
      {
        "group_value": "South Region",
        "final_outcome": "Pass",
        "student_count": 1,
        "pct_within_group": "25"
      },
      {
        "group_value": "South Region",
        "final_outcome": "Withdrawn",
        "student_count": 2,
        "pct_within_group": "50"
      },
      {
        "group_value": "West Midlands Region",
        "final_outcome": "Pass",
        "student_count": 1,
        "pct_within_group": "100"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G12__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "1836053007a7af0e3438345c45c2b13a239cd6883e9db1c48ca1534834149b4c",
  "generator_input_sha256": "831ce9348b711c4a78cf6315d6c1ccf7d4e7da7ec123fe660c1d6d245658932e",
  "generator_input_compact": {
    "task_id": "A-G12",
    "execution_id": "exec_1781847774827_593443bc",
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
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "outcome_by_group"
    ],
    "dataset_row_counts": {
      "outcome_by_group": 53
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
  "raw_text": "Summary: The analysis of student outcomes across different demographic groups reveals significant differences in failure and withdrawal rates. The 0-10% group exhibits the highest combined rates of failure and withdrawal, indicating a critical area for intervention.\n\nInsights: High Failure and Withdrawal Rates in 0-10% Group: The 0-10% group has a combined failure and withdrawal rate of 67.6%, which is the highest among the groups analyzed. This indicates a substantial risk of students not completing their courses successfully. | Comparative Analysis of 10-20% and 20-30% Groups: The 10-20% group has a combined failure and withdrawal rate of 68.8%, slightly higher than the 20-30% group's rate of 66.5%. This suggests that as the demographic group percentage increases, the risk of failure and withdrawal decreases.\n\nEducational implications: Targeted support and intervention strategies are needed for the 0-10% and 10-20% groups to reduce failure and withdrawal rates.\n\nRecommendations: high - Implement targeted academic support programs for the 0-10% and 10-20% groups. - These groups exhibit the highest failure and withdrawal rates, indicating a need for additional resources and support to improve student outcomes.",
  "structured_payload": {
    "task_id": "A-G12",
    "execution_id": "exec_1781847774827_593443bc",
    "explanation": {
      "summary": "The analysis of student outcomes across different demographic groups reveals significant differences in failure and withdrawal rates. The 0-10% group exhibits the highest combined rates of failure and withdrawal, indicating a critical area for intervention.",
      "insights": [
        {
          "title": "High Failure and Withdrawal Rates in 0-10% Group",
          "description": "The 0-10% group has a combined failure and withdrawal rate of 67.6%, which is the highest among the groups analyzed. This indicates a substantial risk of students not completing their courses successfully.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "67.6",
              "comparison": "baseline",
              "delta": null,
              "context": "Combined Fail and Withdrawn rates for 0-10% group"
            }
          ]
        },
        {
          "title": "Comparative Analysis of 10-20% and 20-30% Groups",
          "description": "The 10-20% group has a combined failure and withdrawal rate of 68.8%, slightly higher than the 20-30% group's rate of 66.5%. This suggests that as the demographic group percentage increases, the risk of failure and withdrawal decreases.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "68.8",
              "comparison": "up_from_previous",
              "delta": 1.2,
              "context": "Combined Fail and Withdrawn rates for 10-20% group compared to 20-30% group"
            },
            {
              "metric": "pct_within_group",
              "value": "66.5",
              "comparison": "down_from_previous",
              "delta": -1.2,
              "context": "Combined Fail and Withdrawn rates for 20-30% group"
            }
          ]
        }
      ],
      "educational_implications": [
        "Targeted support and intervention strategies are needed for the 0-10% and 10-20% groups to reduce failure and withdrawal rates."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted academic support programs for the 0-10% and 10-20% groups.",
          "rationale": "These groups exhibit the highest failure and withdrawal rates, indicating a need for additional resources and support to improve student outcomes."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a comprehensive dataset with clear metrics on student outcomes.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "group_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 53,
    "included_row_count": 15,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "outcome_by_group",
        "row_count": 53,
        "included_row_count": 15
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 15,
    "baseline_reference_tokens": 644,
    "task_aware_prompt_tokens": 1406,
    "token_ratio": 2.1832,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.fairness_warnings",
      "limitations.low_count_warnings",
      "limitations.missing_groups",
      "exceptions.weakest_group",
      "exceptions.dominant_group",
      "comparison.gaps",
      "primary_finding.group_series",
      "primary_finding.group_metrics"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.1832 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8329,
      "token_usage": {
        "prompt_tokens": 2108,
        "completion_tokens": 586,
        "total_tokens": 2694
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000668
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G12__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "1836053007a7af0e3438345c45c2b13a239cd6883e9db1c48ca1534834149b4c",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2108,
      "completion_tokens": 586,
      "total_tokens": 2694
    },
    "latency_ms": 8333,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G12",
    "execution_id": "exec_1781847774827_593443bc",
    "explanation": {
      "summary": "The analysis of student outcomes across different demographic groups reveals significant differences in failure and withdrawal rates. The 0-10% group exhibits the highest combined rates of failure and withdrawal, indicating a critical area for intervention.",
      "insights": [
        {
          "title": "High Failure and Withdrawal Rates in 0-10% Group",
          "description": "The 0-10% group has a combined failure and withdrawal rate of 67.6%, which is the highest among the groups analyzed. This indicates a substantial risk of students not completing their courses successfully.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "67.6",
              "comparison": "baseline",
              "delta": null,
              "context": "Combined Fail and Withdrawn rates for 0-10% group"
            }
          ]
        },
        {
          "title": "Comparative Analysis of 10-20% and 20-30% Groups",
          "description": "The 10-20% group has a combined failure and withdrawal rate of 68.8%, slightly higher than the 20-30% group's rate of 66.5%. This suggests that as the demographic group percentage increases, the risk of failure and withdrawal decreases.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "68.8",
              "comparison": "up_from_previous",
              "delta": 1.2,
              "context": "Combined Fail and Withdrawn rates for 10-20% group compared to 20-30% group"
            },
            {
              "metric": "pct_within_group",
              "value": "66.5",
              "comparison": "down_from_previous",
              "delta": -1.2,
              "context": "Combined Fail and Withdrawn rates for 20-30% group"
            }
          ]
        }
      ],
      "educational_implications": [
        "Targeted support and intervention strategies are needed for the 0-10% and 10-20% groups to reduce failure and withdrawal rates."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted academic support programs for the 0-10% and 10-20% groups.",
          "rationale": "These groups exhibit the highest failure and withdrawal rates, indicating a need for additional resources and support to improve student outcomes."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a comprehensive dataset with clear metrics on student outcomes.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "group_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 53,
    "included_row_count": 15,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "outcome_by_group",
        "row_count": 53,
        "included_row_count": 15
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 15,
    "baseline_reference_tokens": 644,
    "task_aware_prompt_tokens": 1406,
    "token_ratio": 2.1832,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.fairness_warnings",
      "limitations.low_count_warnings",
      "limitations.missing_groups",
      "exceptions.weakest_group",
      "exceptions.dominant_group",
      "comparison.gaps",
      "primary_finding.group_series",
      "primary_finding.group_metrics"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (2.1832 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8329,
      "token_usage": {
        "prompt_tokens": 2108,
        "completion_tokens": 586,
        "total_tokens": 2694
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000668
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
    "expected": 53,
    "observed": 53
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e",
    "expected_values": [
      "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "a5465584ca6ef16751adfb3b01e110713b6d40278cc8ff3ef83d87c1644e19f2",
    "expected": "a5465584ca6ef16751adfb3b01e110713b6d40278cc8ff3ef83d87c1644e19f2"
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
        "count": 53,
        "min": 1,
        "max": 138
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
