# LLM Judge Final Judge Context - SAMPLE_OULAD__A-C03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-C03__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-C03",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Compare risk profile",
  "scope": "2 students",
  "actionable_question": "Who is at higher risk and what are the key differences?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "multi_metric_comparison",
  "ai_prompt_hint": "Compare the two returned student rows. Use at_risk_score, at_risk_label, and explicit flag_* columns to explain who needs more urgent intervention. If avg_score is null, state that score evidence is missing rather than guessing.",
  "query_labels": [
    "risk_comparison"
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
    "student_id [FE cross]",
    "at_risk_score [FE cross]",
    "at_risk_label [FE cross]",
    "avg_score [FE cross]",
    "engagement_score [FE cross]",
    "punctuality_rate [FE cross]",
    "performance_trend [FE cross]",
    "flag_low_score",
    "flag_repeated",
    "flag_low_engagement",
    "flag_low_punctuality",
    "flag_neg_trend",
    "previous_attempt_count",
    "final_outcome"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "at_risk_score",
      "at_risk_label"
    ],
    "optional_columns": [
      "avg_score",
      "performance_trend",
      "punctuality_rate",
      "engagement_score",
      "previous_attempt_count",
      "flag_low_score",
      "flag_repeated",
      "flag_low_engagement",
      "flag_low_punctuality",
      "flag_neg_trend",
      "final_outcome"
    ]
  },
  "query_labels": [
    "risk_comparison"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-C03-CORE-01",
      "description": "Compare the two returned student rows."
    },
    {
      "requirement_id": "A-C03-CORE-02",
      "description": "Use at_risk_score, at_risk_label, and explicit flag_* columns to explain who needs more urgent intervention."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "A-C03-SUPPORT-01",
      "description": "If avg_score is null, state that score evidence is missing rather than guessing."
    }
  ],
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
      "dataset_label": "risk_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C03.json",
      "artifact_sha256": "2886031e4c40c8c932fa9581baab3d88ed9987ec9c8c020a8012156ac728c097",
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
  "evidence_artifact_file_sha256": "2886031e4c40c8c932fa9581baab3d88ed9987ec9c8c020a8012156ac728c097",
  "evidence_rows_sha256": "ecd7a189ead0466145858cd6ea1340facb7bd13e36eb9ac70955f280c0dd89fd",
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
  "embedded_datasets_sha256": "ecd7a189ead0466145858cd6ea1340facb7bd13e36eb9ac70955f280c0dd89fd",
  "datasets": {
    "risk_comparison": [
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "avg_score": 91.2,
        "performance_trend": -0.7187500000000001,
        "punctuality_rate": 0,
        "engagement_score": 0.20237855036820618,
        "previous_attempt_count": 1,
        "flag_low_score": 0,
        "flag_repeated": 1,
        "flag_low_engagement": 0,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "final_outcome": "Distinction"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_101700",
        "avg_score": null,
        "performance_trend": null,
        "punctuality_rate": 1,
        "engagement_score": 0,
        "previous_attempt_count": 0,
        "flag_low_score": 0,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 0,
        "flag_neg_trend": 0,
        "at_risk_score": 1,
        "at_risk_label": "low",
        "final_outcome": "Withdrawn"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C03__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "2109f0dd122595c669cb50e8ed920e3a286986ead46df08e14503b9dc830c128",
  "generator_input_sha256": "46bb929e4b1647d00ece6c895a7942e2063a3e3c6feae4adcea4d7f08c5088f9",
  "generator_input_compact": {
    "task_id": "A-C03",
    "execution_id": "exec_1781847654667_8969677c",
    "task_name": "Compare risk profile",
    "analysis_type": "comparison",
    "explanation_strategy": "comparison",
    "actionable_question": "Who is at higher risk and what are the key differences?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "risk_comparison"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "risk_comparison"
    ],
    "dataset_row_counts": {
      "risk_comparison": 2
    },
    "ai_summary_config_summary": {
      "summary_type": "multi_metric_comparison",
      "metric_column": null,
      "entity_column": "student_id",
      "group_column": null,
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
  "raw_text": "Summary: The analysis reveals a significant disparity in the risk profiles of the two students. One student is classified as high risk with a low average score and negative performance trend, while the other is classified as low risk but lacks average score data.\n\nInsights: High Risk Student Profile: The first student, SAMPLE_OULAD_STU_100788, has an at risk score of 3, indicating a high risk status. This student also exhibits a negative performance trend and low punctuality, which are critical factors for intervention. | Low Risk Student Profile: The second student, SAMPLE_OULAD_STU_101700, has an at risk score of 1, classified as low risk. However, the absence of average score and performance trend data limits the ability to fully assess their situation.\n\nEducational implications: Students with high at risk scores require immediate and targeted interventions to improve their academic performance and engagement.\n\nRecommendations: high - Implement personalized support strategies for SAMPLE_OULAD_STU_100788, focusing on improving engagement and attendance. - Given the high risk score and negative performance indicators, immediate intervention is necessary to prevent further decline. | medium - Monitor SAMPLE_OULAD_STU_101700 closely for any changes in engagement or performance metrics. - While currently low risk, the lack of average score data necessitates vigilance to ensure they do not fall into a higher risk category.\n\nWarnings: The absence of average score and performance trend data for SAMPLE_OULAD_STU_101700 limits the ability to fully assess their risk profile.",
  "structured_payload": {
    "task_id": "A-C03",
    "execution_id": "exec_1781847654667_8969677c",
    "explanation": {
      "summary": "The analysis reveals a significant disparity in the risk profiles of the two students. One student is classified as high risk with a low average score and negative performance trend, while the other is classified as low risk but lacks average score data.",
      "insights": [
        {
          "title": "High Risk Student Profile",
          "description": "The first student, SAMPLE_OULAD_STU_100788, has an at risk score of 3, indicating a high risk status. This student also exhibits a negative performance trend and low punctuality, which are critical factors for intervention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "High risk label indicates urgent need for intervention."
            },
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "baseline",
              "delta": null,
              "context": "Negative trend suggests declining performance."
            },
            {
              "metric": "punctuality_rate",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Punctuality rate of 0 indicates severe attendance issues."
            }
          ]
        },
        {
          "title": "Low Risk Student Profile",
          "description": "The second student, SAMPLE_OULAD_STU_101700, has an at risk score of 1, classified as low risk. However, the absence of average score and performance trend data limits the ability to fully assess their situation.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Low risk label suggests less immediate concern."
            },
            {
              "metric": "punctuality_rate",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Punctuality rate of 1 indicates good attendance."
            }
          ]
        }
      ],
      "educational_implications": [
        "Students with high at risk scores require immediate and targeted interventions to improve their academic performance and engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement personalized support strategies for SAMPLE_OULAD_STU_100788, focusing on improving engagement and attendance.",
          "rationale": "Given the high risk score and negative performance indicators, immediate intervention is necessary to prevent further decline."
        },
        {
          "priority": "medium",
          "action": "Monitor SAMPLE_OULAD_STU_101700 closely for any changes in engagement or performance metrics.",
          "rationale": "While currently low risk, the lack of average score data necessitates vigilance to ensure they do not fall into a higher risk category."
        }
      ],
      "warnings": [
        "The absence of average score and performance trend data for SAMPLE_OULAD_STU_101700 limits the ability to fully assess their risk profile."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is sufficient for analysis, though some metrics are missing for one student.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "multi_metric_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 2,
    "baseline_reference_tokens": 226,
    "task_aware_prompt_tokens": 1226,
    "token_ratio": 5.4248,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.missing_expected_entities",
      "comparison.metric_extrema",
      "comparison.pairwise_gaps",
      "primary_finding.selected_entity_evidence"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (5.4248 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8959,
      "token_usage": {
        "prompt_tokens": 1932,
        "completion_tokens": 725,
        "total_tokens": 2657
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000725
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C03__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "2109f0dd122595c669cb50e8ed920e3a286986ead46df08e14503b9dc830c128",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1932,
      "completion_tokens": 725,
      "total_tokens": 2657
    },
    "latency_ms": 8965,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C03",
    "execution_id": "exec_1781847654667_8969677c",
    "explanation": {
      "summary": "The analysis reveals a significant disparity in the risk profiles of the two students. One student is classified as high risk with a low average score and negative performance trend, while the other is classified as low risk but lacks average score data.",
      "insights": [
        {
          "title": "High Risk Student Profile",
          "description": "The first student, SAMPLE_OULAD_STU_100788, has an at risk score of 3, indicating a high risk status. This student also exhibits a negative performance trend and low punctuality, which are critical factors for intervention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "High risk label indicates urgent need for intervention."
            },
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "baseline",
              "delta": null,
              "context": "Negative trend suggests declining performance."
            },
            {
              "metric": "punctuality_rate",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Punctuality rate of 0 indicates severe attendance issues."
            }
          ]
        },
        {
          "title": "Low Risk Student Profile",
          "description": "The second student, SAMPLE_OULAD_STU_101700, has an at risk score of 1, classified as low risk. However, the absence of average score and performance trend data limits the ability to fully assess their situation.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Low risk label suggests less immediate concern."
            },
            {
              "metric": "punctuality_rate",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Punctuality rate of 1 indicates good attendance."
            }
          ]
        }
      ],
      "educational_implications": [
        "Students with high at risk scores require immediate and targeted interventions to improve their academic performance and engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement personalized support strategies for SAMPLE_OULAD_STU_100788, focusing on improving engagement and attendance.",
          "rationale": "Given the high risk score and negative performance indicators, immediate intervention is necessary to prevent further decline."
        },
        {
          "priority": "medium",
          "action": "Monitor SAMPLE_OULAD_STU_101700 closely for any changes in engagement or performance metrics.",
          "rationale": "While currently low risk, the lack of average score data necessitates vigilance to ensure they do not fall into a higher risk category."
        }
      ],
      "warnings": [
        "The absence of average score and performance trend data for SAMPLE_OULAD_STU_101700 limits the ability to fully assess their risk profile."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data quality is sufficient for analysis, though some metrics are missing for one student.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "multi_metric_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 2,
    "baseline_reference_tokens": 226,
    "task_aware_prompt_tokens": 1226,
    "token_ratio": 5.4248,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.missing_expected_entities",
      "comparison.metric_extrema",
      "comparison.pairwise_gaps",
      "primary_finding.selected_entity_evidence"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (5.4248 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8959,
      "token_usage": {
        "prompt_tokens": 1932,
        "completion_tokens": 725,
        "total_tokens": 2657
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000725
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
    "observed": "2886031e4c40c8c932fa9581baab3d88ed9987ec9c8c020a8012156ac728c097",
    "expected_values": [
      "2886031e4c40c8c932fa9581baab3d88ed9987ec9c8c020a8012156ac728c097"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "ecd7a189ead0466145858cd6ea1340facb7bd13e36eb9ac70955f280c0dd89fd",
    "expected": "ecd7a189ead0466145858cd6ea1340facb7bd13e36eb9ac70955f280c0dd89fd"
  },
  {
    "check_id": "numeric_fields_risk_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "risk_comparison",
    "numeric_columns": [
      "at_risk_score",
      "engagement_score",
      "flag_low_engagement",
      "flag_low_punctuality",
      "flag_low_score",
      "flag_neg_trend",
      "flag_repeated",
      "previous_attempt_count",
      "punctuality_rate",
      "avg_score",
      "performance_trend"
    ],
    "numeric_summaries": {
      "at_risk_score": {
        "count": 2,
        "min": 1,
        "max": 3
      },
      "engagement_score": {
        "count": 2,
        "min": 0,
        "max": 0.20237855036820618
      },
      "flag_low_engagement": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "flag_low_punctuality": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "flag_low_score": {
        "count": 2,
        "min": 0,
        "max": 0
      },
      "flag_neg_trend": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "flag_repeated": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "previous_attempt_count": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "punctuality_rate": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "avg_score": {
        "count": 1,
        "min": 91.2,
        "max": 91.2
      },
      "performance_trend": {
        "count": 1,
        "min": -0.7187500000000001,
        "max": -0.7187500000000001
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_risk_comparison",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "risk_comparison",
    "flag_columns": [
      "flag_low_score",
      "flag_repeated",
      "flag_low_engagement",
      "flag_low_punctuality",
      "flag_neg_trend",
      "at_risk_score",
      "at_risk_label"
    ],
    "triggered_like_counts": {
      "flag_low_score": 0,
      "flag_repeated": 0,
      "flag_low_engagement": 0,
      "flag_low_punctuality": 0,
      "flag_neg_trend": 0,
      "at_risk_score": 0,
      "at_risk_label": 0
    }
  }
]
```
