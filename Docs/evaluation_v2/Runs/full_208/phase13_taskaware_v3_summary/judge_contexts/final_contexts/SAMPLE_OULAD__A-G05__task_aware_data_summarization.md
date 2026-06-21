# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G05__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G05__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G05",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Submission behaviour analysis",
  "scope": "Many students",
  "actionable_question": "Are late submissions a systemic problem in this class?",
  "target_audience": "instructor",
  "ai_summary_type": "group_comparison",
  "ai_prompt_hint": "Use final_outcome, assessment_type, submission_delay_avg, late_submission_rate, and punctuality_rate to decide whether late submission is systemic. Prioritize groups with high late_submission_rate and high student_count. Do not discuss individual students.",
  "query_labels": [
    "submission_behaviour"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
    "assessment_result",
    "assessment",
    "enrollment [OULAD only]"
  ],
  "key_db_fields": [
    "final_outcome [FE cross]",
    "assessment_type [FE cross]",
    "submission_delay_avg [FE cross]",
    "late_submission_rate [FE cross]",
    "punctuality_rate [FE cross]",
    "student_count",
    "submission_count",
    "avg_score",
    "submission_risk_level"
  ],
  "output_schema": {
    "required_columns": [
      "final_outcome",
      "assessment_type",
      "submission_delay_avg",
      "late_submission_rate"
    ],
    "optional_columns": [
      "submission_count",
      "student_count",
      "net_submission_delay_avg",
      "punctuality_rate",
      "avg_score",
      "submission_risk_level"
    ]
  },
  "query_labels": [
    "submission_behaviour"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G05-CORE-01",
      "description": "Use final_outcome, assessment_type, submission_delay_avg, late_submission_rate, and punctuality_rate to decide whether late submission is systemic."
    },
    {
      "requirement_id": "A-G05-CORE-02",
      "description": "Prioritize groups with high late_submission_rate and high student_count."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G05-CONSTRAINT-01",
      "description": "Do not discuss individual students."
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
      "dataset_label": "submission_behaviour",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G05.json",
      "artifact_sha256": "0b9ba8429b564f1c03c6a06d95144cb27e022db9b390353358d6703f83abda19",
      "row_count": 11,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 11,
  "prompt_embedded_row_count": 11,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "0b9ba8429b564f1c03c6a06d95144cb27e022db9b390353358d6703f83abda19",
  "evidence_rows_sha256": "ca9b618abc86018d9f65f2bc87e4e9170e577022c2ad8a24ccbfeea104682c22",
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
  "full_result_row_count": 11,
  "embedded_datasets_sha256": "ca9b618abc86018d9f65f2bc87e4e9170e577022c2ad8a24ccbfeea104682c22",
  "datasets": {
    "submission_behaviour": [
      {
        "final_outcome": "Distinction",
        "assessment_type": "CMA",
        "submission_count": 1217,
        "student_count": 306,
        "submission_delay_avg": 3.25,
        "net_submission_delay_avg": 2.85,
        "late_submission_rate": 0.9951,
        "punctuality_rate": 0.0049,
        "avg_score": 93.85,
        "submission_risk_level": "high_lateness"
      },
      {
        "final_outcome": "Pass",
        "assessment_type": "CMA",
        "submission_count": 2684,
        "student_count": 708,
        "submission_delay_avg": 3.27,
        "net_submission_delay_avg": 2.57,
        "late_submission_rate": 0.9899,
        "punctuality_rate": 0.0101,
        "avg_score": 77.49,
        "submission_risk_level": "high_lateness"
      },
      {
        "final_outcome": "Fail",
        "assessment_type": "CMA",
        "submission_count": 985,
        "student_count": 359,
        "submission_delay_avg": 3.05,
        "net_submission_delay_avg": 1.55,
        "late_submission_rate": 0.9807,
        "punctuality_rate": 0.0193,
        "avg_score": 60.86,
        "submission_risk_level": "high_lateness"
      },
      {
        "final_outcome": "Withdrawn",
        "assessment_type": "CMA",
        "submission_count": 960,
        "student_count": 595,
        "submission_delay_avg": 2.77,
        "net_submission_delay_avg": 1.51,
        "late_submission_rate": 0.9719,
        "punctuality_rate": 0.0281,
        "avg_score": 62.46,
        "submission_risk_level": "high_lateness"
      },
      {
        "final_outcome": "Withdrawn",
        "assessment_type": "TMA",
        "submission_count": 525,
        "student_count": 365,
        "submission_delay_avg": 9.91,
        "net_submission_delay_avg": 1.3,
        "late_submission_rate": 0.3124,
        "punctuality_rate": 0.6876,
        "avg_score": 63.74,
        "submission_risk_level": "moderate_lateness"
      },
      {
        "final_outcome": "Fail",
        "assessment_type": "TMA",
        "submission_count": 759,
        "student_count": 292,
        "submission_delay_avg": 7.66,
        "net_submission_delay_avg": 0.02,
        "late_submission_rate": 0.3017,
        "punctuality_rate": 0.6983,
        "avg_score": 57.67,
        "submission_risk_level": "moderate_lateness"
      },
      {
        "final_outcome": "Pass",
        "assessment_type": "TMA",
        "submission_count": 2206,
        "student_count": 608,
        "submission_delay_avg": 7.79,
        "net_submission_delay_avg": -0.67,
        "late_submission_rate": 0.189,
        "punctuality_rate": 0.811,
        "avg_score": 76.44,
        "submission_risk_level": "low_lateness"
      },
      {
        "final_outcome": "Distinction",
        "assessment_type": "TMA",
        "submission_count": 947,
        "student_count": 251,
        "submission_delay_avg": 6.02,
        "net_submission_delay_avg": -4.74,
        "late_submission_rate": 0.0644,
        "punctuality_rate": 0.9356,
        "avg_score": 93.72,
        "submission_risk_level": "low_lateness"
      },
      {
        "final_outcome": "Distinction",
        "assessment_type": "Exam",
        "submission_count": 306,
        "student_count": 306,
        "submission_delay_avg": 0,
        "net_submission_delay_avg": 0,
        "late_submission_rate": 0,
        "punctuality_rate": 0,
        "avg_score": 94.75,
        "submission_risk_level": "low_lateness"
      },
      {
        "final_outcome": "Fail",
        "assessment_type": "Exam",
        "submission_count": 155,
        "student_count": 155,
        "submission_delay_avg": 0,
        "net_submission_delay_avg": 0,
        "late_submission_rate": 0,
        "punctuality_rate": 0,
        "avg_score": 31.29,
        "submission_risk_level": "low_lateness"
      },
      {
        "final_outcome": "Pass",
        "assessment_type": "Exam",
        "submission_count": 707,
        "student_count": 707,
        "submission_delay_avg": 0,
        "net_submission_delay_avg": 0,
        "late_submission_rate": 0,
        "punctuality_rate": 0,
        "avg_score": 64.86,
        "submission_risk_level": "low_lateness"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G05__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "5efa80f2094d5c641cdacf1afdd986d66843eda0f720cf87eb0cee1ec46cd5b8",
  "generator_input_sha256": "4bb51bb5d3888304c157aeaef5166e68cd9dd47e9395ca67478b650111d69360",
  "generator_input_compact": {
    "task_id": "A-G05",
    "execution_id": "exec_1781847724644_4d32e8e3",
    "task_name": "Submission behaviour analysis",
    "analysis_type": "comparison",
    "explanation_strategy": "behavioral",
    "actionable_question": "Are late submissions a systemic problem in this class?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "submission_behaviour"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "submission_behaviour"
    ],
    "dataset_row_counts": {
      "submission_behaviour": 11
    },
    "ai_summary_config_summary": {
      "summary_type": "group_comparison",
      "metric_column": "late_submission_rate",
      "entity_column": null,
      "group_column": "final_outcome",
      "time_column": null,
      "sort_by": "late_submission_rate",
      "sort_direction": "desc",
      "top_k": 8,
      "bottom_k": 3,
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
  "raw_text": "Summary: The analysis reveals a concerning trend of high late submission rates across various assessment types, indicating that late submissions are indeed a systemic issue within the class. The majority of students are submitting their work late, which may negatively impact their overall performance and engagement.\n\nInsights: High Late Submission Rates: The late submission rates for both CMA and TMA assessments are alarmingly high, with rates of 99.51% and 18.9% respectively for the Pass outcomes. This suggests that a significant majority of students are struggling to submit their work on time. | Consistent Submission Delays: The average submission delay across assessments is consistently above 3 days for CMA assessments, indicating a pattern of procrastination or lack of time management among students.\n\nEducational implications: High late submission rates may lead to lower overall student performance and engagement, necessitating targeted interventions.\n\nRecommendations: high - Implement time management workshops and provide resources for students to improve their submission habits. - Addressing the systemic issue of late submissions can enhance student engagement and performance. | medium - Increase communication regarding deadlines and the importance of punctuality in submissions. - Reinforcing the significance of timely submissions may help reduce late submission rates.",
  "structured_payload": {
    "task_id": "A-G05",
    "execution_id": "exec_1781847724644_4d32e8e3",
    "explanation": {
      "summary": "The analysis reveals a concerning trend of high late submission rates across various assessment types, indicating that late submissions are indeed a systemic issue within the class. The majority of students are submitting their work late, which may negatively impact their overall performance and engagement.",
      "insights": [
        {
          "title": "High Late Submission Rates",
          "description": "The late submission rates for both CMA and TMA assessments are alarmingly high, with rates of 99.51% and 18.9% respectively for the Pass outcomes. This suggests that a significant majority of students are struggling to submit their work on time.",
          "severity": "high",
          "evidence": [
            {
              "metric": "late_submission_rate",
              "value": 0.9951,
              "comparison": "baseline",
              "delta": null,
              "context": "CMA Pass outcomes"
            },
            {
              "metric": "late_submission_rate",
              "value": 0.189,
              "comparison": "baseline",
              "delta": null,
              "context": "TMA Pass outcomes"
            }
          ]
        },
        {
          "title": "Consistent Submission Delays",
          "description": "The average submission delay across assessments is consistently above 3 days for CMA assessments, indicating a pattern of procrastination or lack of time management among students.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "submission_delay_avg",
              "value": 3.25,
              "comparison": "baseline",
              "delta": null,
              "context": "CMA assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "High late submission rates may lead to lower overall student performance and engagement, necessitating targeted interventions."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement time management workshops and provide resources for students to improve their submission habits.",
          "rationale": "Addressing the systemic issue of late submissions can enhance student engagement and performance."
        },
        {
          "priority": "medium",
          "action": "Increase communication regarding deadlines and the importance of punctuality in submissions.",
          "rationale": "Reinforcing the significance of timely submissions may help reduce late submission rates."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a comprehensive dataset with clear metrics on submission behavior.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "group_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 11,
    "included_row_count": 11,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_behaviour",
        "row_count": 11,
        "included_row_count": 11
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 11,
    "baseline_reference_tokens": 922,
    "task_aware_prompt_tokens": 1167,
    "token_ratio": 1.2657,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (1.2657 > 1.2)."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8566,
      "token_usage": {
        "prompt_tokens": 1905,
        "completion_tokens": 539,
        "total_tokens": 2444
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000609
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G05__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "5efa80f2094d5c641cdacf1afdd986d66843eda0f720cf87eb0cee1ec46cd5b8",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1905,
      "completion_tokens": 539,
      "total_tokens": 2444
    },
    "latency_ms": 8574,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G05",
    "execution_id": "exec_1781847724644_4d32e8e3",
    "explanation": {
      "summary": "The analysis reveals a concerning trend of high late submission rates across various assessment types, indicating that late submissions are indeed a systemic issue within the class. The majority of students are submitting their work late, which may negatively impact their overall performance and engagement.",
      "insights": [
        {
          "title": "High Late Submission Rates",
          "description": "The late submission rates for both CMA and TMA assessments are alarmingly high, with rates of 99.51% and 18.9% respectively for the Pass outcomes. This suggests that a significant majority of students are struggling to submit their work on time.",
          "severity": "high",
          "evidence": [
            {
              "metric": "late_submission_rate",
              "value": 0.9951,
              "comparison": "baseline",
              "delta": null,
              "context": "CMA Pass outcomes"
            },
            {
              "metric": "late_submission_rate",
              "value": 0.189,
              "comparison": "baseline",
              "delta": null,
              "context": "TMA Pass outcomes"
            }
          ]
        },
        {
          "title": "Consistent Submission Delays",
          "description": "The average submission delay across assessments is consistently above 3 days for CMA assessments, indicating a pattern of procrastination or lack of time management among students.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "submission_delay_avg",
              "value": 3.25,
              "comparison": "baseline",
              "delta": null,
              "context": "CMA assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "High late submission rates may lead to lower overall student performance and engagement, necessitating targeted interventions."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement time management workshops and provide resources for students to improve their submission habits.",
          "rationale": "Addressing the systemic issue of late submissions can enhance student engagement and performance."
        },
        {
          "priority": "medium",
          "action": "Increase communication regarding deadlines and the importance of punctuality in submissions.",
          "rationale": "Reinforcing the significance of timely submissions may help reduce late submission rates."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a comprehensive dataset with clear metrics on submission behavior.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "group_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 11,
    "included_row_count": 11,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_behaviour",
        "row_count": 11,
        "included_row_count": 11
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 11,
    "baseline_reference_tokens": 922,
    "task_aware_prompt_tokens": 1167,
    "token_ratio": 1.2657,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (1.2657 > 1.2)."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8566,
      "token_usage": {
        "prompt_tokens": 1905,
        "completion_tokens": 539,
        "total_tokens": 2444
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000609
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
    "expected": 11,
    "observed": 11
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "0b9ba8429b564f1c03c6a06d95144cb27e022db9b390353358d6703f83abda19",
    "expected_values": [
      "0b9ba8429b564f1c03c6a06d95144cb27e022db9b390353358d6703f83abda19"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "ca9b618abc86018d9f65f2bc87e4e9170e577022c2ad8a24ccbfeea104682c22",
    "expected": "ca9b618abc86018d9f65f2bc87e4e9170e577022c2ad8a24ccbfeea104682c22"
  },
  {
    "check_id": "numeric_fields_submission_behaviour",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "submission_behaviour",
    "numeric_columns": [
      "avg_score",
      "late_submission_rate",
      "net_submission_delay_avg",
      "punctuality_rate",
      "student_count",
      "submission_count",
      "submission_delay_avg"
    ],
    "numeric_summaries": {
      "avg_score": {
        "count": 11,
        "min": 31.29,
        "max": 94.75
      },
      "late_submission_rate": {
        "count": 11,
        "min": 0,
        "max": 0.9951
      },
      "net_submission_delay_avg": {
        "count": 11,
        "min": -4.74,
        "max": 2.85
      },
      "punctuality_rate": {
        "count": 11,
        "min": 0,
        "max": 0.9356
      },
      "student_count": {
        "count": 11,
        "min": 155,
        "max": 708
      },
      "submission_count": {
        "count": 11,
        "min": 155,
        "max": 2684
      },
      "submission_delay_avg": {
        "count": 11,
        "min": 0,
        "max": 9.91
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_submission_behaviour",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "submission_behaviour",
    "flag_columns": [
      "submission_risk_level"
    ],
    "triggered_like_counts": {
      "submission_risk_level": 0
    }
  }
]
```
