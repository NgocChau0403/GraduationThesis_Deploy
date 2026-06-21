# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G12__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G12__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G12",
  "explanation_mode": "baseline_first_20_rows",
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
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G12__baseline_first_20_rows.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "022ac5d6f8ee49bbb7f8b5111c9ff8448f009b6b065a6d2cbdbd6638afe1f72e",
  "evidence_rows_sha256": "a5465584ca6ef16751adfb3b01e110713b6d40278cc8ff3ef83d87c1644e19f2",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 53,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__A-G12__baseline_first_20_rows__outcome_by_group__chunk_1"
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
    "generated_at": "2026-06-20T16:29:37.160Z",
    "record_id": "SAMPLE_OULAD__A-G12__baseline_first_20_rows",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__A-G12__baseline_first_20_rows__outcome_by_group__chunk_1",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G12__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "1df872861d42f3dfd4cb710a033999db62dc9bee6f2b54a8ce5ea3c5275996c4",
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
  "raw_text": "Summary: The analysis of the pass, fail, and withdrawal rates across different demographic groups reveals significant disparities, particularly in the 0-10% and 10-20% groups, where the combined fail and withdrawal rates exceed the cohort threshold. The 0-10% group exhibits the highest withdrawal rate, indicating a critical area for intervention.\n\nInsights: High Withdrawal Rate in 0-10% Group: The 0-10% group has a withdrawal rate of 53.8%, which is the highest among all groups analyzed, indicating a significant challenge in student retention. | Combined Fail and Withdrawal Rates Exceeding Threshold: In the 0-10% group, the combined fail (13.8%) and withdrawal (53.8%) rates total 67.6%, significantly exceeding the cohort threshold, indicating a critical need for targeted support. | Consistent Withdrawal Rates Across Groups: The withdrawal rates across the 10-20% and 20-30% groups are also notably high at 48.9% and 53.1%, respectively, suggesting a trend of increasing dropout rates as the demographic group percentage increases.\n\nEducational implications: The high withdrawal rates indicate a need for enhanced support systems for students in lower demographic groups to improve retention.\n\nRecommendations: high - Implement targeted retention programs for the 0-10% and 10-20% groups. - To address the high withdrawal and failure rates, focused interventions can help improve student engagement and success.",
  "structured_payload": {
    "task_id": "A-G12",
    "execution_id": "exec_1781847774827_593443bc",
    "explanation": {
      "summary": "The analysis of the pass, fail, and withdrawal rates across different demographic groups reveals significant disparities, particularly in the 0-10% and 10-20% groups, where the combined fail and withdrawal rates exceed the cohort threshold. The 0-10% group exhibits the highest withdrawal rate, indicating a critical area for intervention.",
      "insights": [
        {
          "title": "High Withdrawal Rate in 0-10% Group",
          "description": "The 0-10% group has a withdrawal rate of 53.8%, which is the highest among all groups analyzed, indicating a significant challenge in student retention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "53.8",
              "comparison": "baseline",
              "delta": null,
              "context": "0-10% group withdrawal rate"
            }
          ]
        },
        {
          "title": "Combined Fail and Withdrawal Rates Exceeding Threshold",
          "description": "In the 0-10% group, the combined fail (13.8%) and withdrawal (53.8%) rates total 67.6%, significantly exceeding the cohort threshold, indicating a critical need for targeted support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "combined_fail_withdrawn_rate",
              "value": 67.6,
              "comparison": "baseline",
              "delta": null,
              "context": "0-10% group combined fail and withdrawal rate"
            }
          ]
        },
        {
          "title": "Consistent Withdrawal Rates Across Groups",
          "description": "The withdrawal rates across the 10-20% and 20-30% groups are also notably high at 48.9% and 53.1%, respectively, suggesting a trend of increasing dropout rates as the demographic group percentage increases.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "48.9",
              "comparison": "up_from_previous",
              "delta": 0.2,
              "context": "10-20% group withdrawal rate"
            },
            {
              "metric": "pct_within_group",
              "value": "53.1",
              "comparison": "up_from_previous",
              "delta": 0.2,
              "context": "20-30% group withdrawal rate"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high withdrawal rates indicate a need for enhanced support systems for students in lower demographic groups to improve retention."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted retention programs for the 0-10% and 10-20% groups.",
          "rationale": "To address the high withdrawal and failure rates, focused interventions can help improve student engagement and success."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is comprehensive and covers a significant number of students across various demographic groups.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
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
      "latency_ms": 13951,
      "token_usage": {
        "prompt_tokens": 1424,
        "completion_tokens": 685,
        "total_tokens": 2109
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000625
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G12__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "1df872861d42f3dfd4cb710a033999db62dc9bee6f2b54a8ce5ea3c5275996c4",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1424,
      "completion_tokens": 685,
      "total_tokens": 2109
    },
    "latency_ms": 13955,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G12",
    "execution_id": "exec_1781847774827_593443bc",
    "explanation": {
      "summary": "The analysis of the pass, fail, and withdrawal rates across different demographic groups reveals significant disparities, particularly in the 0-10% and 10-20% groups, where the combined fail and withdrawal rates exceed the cohort threshold. The 0-10% group exhibits the highest withdrawal rate, indicating a critical area for intervention.",
      "insights": [
        {
          "title": "High Withdrawal Rate in 0-10% Group",
          "description": "The 0-10% group has a withdrawal rate of 53.8%, which is the highest among all groups analyzed, indicating a significant challenge in student retention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "53.8",
              "comparison": "baseline",
              "delta": null,
              "context": "0-10% group withdrawal rate"
            }
          ]
        },
        {
          "title": "Combined Fail and Withdrawal Rates Exceeding Threshold",
          "description": "In the 0-10% group, the combined fail (13.8%) and withdrawal (53.8%) rates total 67.6%, significantly exceeding the cohort threshold, indicating a critical need for targeted support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "combined_fail_withdrawn_rate",
              "value": 67.6,
              "comparison": "baseline",
              "delta": null,
              "context": "0-10% group combined fail and withdrawal rate"
            }
          ]
        },
        {
          "title": "Consistent Withdrawal Rates Across Groups",
          "description": "The withdrawal rates across the 10-20% and 20-30% groups are also notably high at 48.9% and 53.1%, respectively, suggesting a trend of increasing dropout rates as the demographic group percentage increases.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_within_group",
              "value": "48.9",
              "comparison": "up_from_previous",
              "delta": 0.2,
              "context": "10-20% group withdrawal rate"
            },
            {
              "metric": "pct_within_group",
              "value": "53.1",
              "comparison": "up_from_previous",
              "delta": 0.2,
              "context": "20-30% group withdrawal rate"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high withdrawal rates indicate a need for enhanced support systems for students in lower demographic groups to improve retention."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted retention programs for the 0-10% and 10-20% groups.",
          "rationale": "To address the high withdrawal and failure rates, focused interventions can help improve student engagement and success."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is comprehensive and covers a significant number of students across various demographic groups.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
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
      "latency_ms": 13951,
      "token_usage": {
        "prompt_tokens": 1424,
        "completion_tokens": 685,
        "total_tokens": 2109
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000625
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
