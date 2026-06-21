# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G08__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G08__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G08",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Background group performance & engagement profile",
  "scope": "Many students",
  "actionable_question": "Which demographic groups are scoring or engaging below the class average?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "group_comparison",
  "ai_prompt_hint": "For each demographic group, compare mean avg_score [FE] and engagement_score [FE] to cohort average. Use colour intensity to show deviation. Avoid causal claims. Note: output is continuous score — distinct from A-G12 which uses categorical final_outcome.",
  "query_labels": [
    "demographic_performance"
  ],
  "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "enrollment",
    "assessment_result",
    "assessment",
    "engagement"
  ],
  "key_db_fields": [
    "socioeconomic_band / gender / age_group / highest_education; avg_score [FE cross]",
    "engagement_score [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "demographic_performance"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G08-CORE-01",
      "description": "For each demographic group, compare mean average score and engagement score with the cohort average."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G08-CONSTRAINT-01",
      "description": "Quantify the magnitude of group deviation rather than relying on visual colour encoding alone."
    },
    {
      "constraint_id": "A-G08-CONSTRAINT-02",
      "description": "Avoid causal claims."
    },
    {
      "constraint_id": "A-G08-CONSTRAINT-03",
      "description": "Treat this as an equity-sensitive demographic group analysis."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Applicable because the task compares demographic groups and requires equity framing."
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
      "dataset_label": "demographic_performance",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G08.json",
      "artifact_sha256": "9f222a10e044384f3df5365842c7221aa5f135385ef4124de2e88b600aeb599f",
      "row_count": 1,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 1,
  "prompt_embedded_row_count": 1,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "9f222a10e044384f3df5365842c7221aa5f135385ef4124de2e88b600aeb599f",
  "evidence_rows_sha256": "58c821196d79a7b9704571024c7538b44ea81c5a099eaa8bdfdcd8b6e4415462",
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
  "full_result_row_count": 1,
  "embedded_datasets_sha256": "58c821196d79a7b9704571024c7538b44ea81c5a099eaa8bdfdcd8b6e4415462",
  "datasets": {
    "demographic_performance": [
      {
        "group_value": "Unknown",
        "student_count": 649,
        "avg_score": 58.13,
        "avg_engagement_score": 0,
        "score_vs_cohort": 0
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G08__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "4d9b16d0ea155ff83458f1f81e659b02b28d65e5f13cbffbb6e86ee32807842a",
  "generator_input_sha256": "409041c83e0826e5b3cc277edc2f5006751f33984f1a5e674b4169280bdd56a9",
  "generator_input_compact": {
    "task_id": "A-G08",
    "execution_id": "exec_1781847232566_876282c5",
    "task_name": "Background group performance & engagement profile",
    "analysis_type": "segmentation",
    "explanation_strategy": "comparison",
    "actionable_question": "Which demographic groups are scoring or engaging below the class average?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "demographic_performance"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "demographic_performance"
    ],
    "dataset_row_counts": {
      "demographic_performance": 1
    },
    "ai_summary_config_summary": {
      "summary_type": "group_comparison",
      "metric_column": "avg_score",
      "entity_column": null,
      "group_column": "group_value",
      "time_column": null,
      "sort_by": "score_vs_cohort",
      "sort_direction": "asc",
      "top_k": 10,
      "bottom_k": 5,
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
  "raw_text": "Summary: The analysis of the demographic performance dataset reveals that the 'Unknown' group, comprising 649 students, has an average score of 58.13, which is on par with the cohort average. However, their engagement score is notably absent, indicating a potential area for improvement in student engagement.\n\nInsights: Average Score Consistency: The 'Unknown' group maintains an average score of 58.13, which aligns with the cohort average, indicating no performance gap. | Lack of Engagement: The engagement score for the 'Unknown' group is recorded as 0, suggesting a complete lack of engagement among these students.\n\nEducational implications: The absence of engagement scores indicates a critical need for interventions aimed at increasing student participation and interaction.\n\nRecommendations: high - Implement targeted engagement strategies for the 'Unknown' group. - Enhancing engagement may lead to improved academic performance and overall student satisfaction.",
  "structured_payload": {
    "task_id": "A-G08",
    "execution_id": "exec_1781847232566_876282c5",
    "explanation": {
      "summary": "The analysis of the demographic performance dataset reveals that the 'Unknown' group, comprising 649 students, has an average score of 58.13, which is on par with the cohort average. However, their engagement score is notably absent, indicating a potential area for improvement in student engagement.",
      "insights": [
        {
          "title": "Average Score Consistency",
          "description": "The 'Unknown' group maintains an average score of 58.13, which aligns with the cohort average, indicating no performance gap.",
          "severity": "low",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 58.13,
              "comparison": "baseline",
              "delta": 0,
              "context": "Average score matches cohort average"
            }
          ]
        },
        {
          "title": "Lack of Engagement",
          "description": "The engagement score for the 'Unknown' group is recorded as 0, suggesting a complete lack of engagement among these students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "No engagement recorded"
            }
          ]
        }
      ],
      "educational_implications": [
        "The absence of engagement scores indicates a critical need for interventions aimed at increasing student participation and interaction."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted engagement strategies for the 'Unknown' group.",
          "rationale": "Enhancing engagement may lead to improved academic performance and overall student satisfaction."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset provides a clear overview of the performance metrics for the demographic group.",
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
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "demographic_performance",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 48,
    "task_aware_prompt_tokens": 454,
    "token_ratio": 9.4583,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (9.4583 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4654,
      "token_usage": {
        "prompt_tokens": 995,
        "completion_tokens": 415,
        "total_tokens": 1410
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000398
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G08__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "4d9b16d0ea155ff83458f1f81e659b02b28d65e5f13cbffbb6e86ee32807842a",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 995,
      "completion_tokens": 415,
      "total_tokens": 1410
    },
    "latency_ms": 4668,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G08",
    "execution_id": "exec_1781847232566_876282c5",
    "explanation": {
      "summary": "The analysis of the demographic performance dataset reveals that the 'Unknown' group, comprising 649 students, has an average score of 58.13, which is on par with the cohort average. However, their engagement score is notably absent, indicating a potential area for improvement in student engagement.",
      "insights": [
        {
          "title": "Average Score Consistency",
          "description": "The 'Unknown' group maintains an average score of 58.13, which aligns with the cohort average, indicating no performance gap.",
          "severity": "low",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 58.13,
              "comparison": "baseline",
              "delta": 0,
              "context": "Average score matches cohort average"
            }
          ]
        },
        {
          "title": "Lack of Engagement",
          "description": "The engagement score for the 'Unknown' group is recorded as 0, suggesting a complete lack of engagement among these students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "No engagement recorded"
            }
          ]
        }
      ],
      "educational_implications": [
        "The absence of engagement scores indicates a critical need for interventions aimed at increasing student participation and interaction."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted engagement strategies for the 'Unknown' group.",
          "rationale": "Enhancing engagement may lead to improved academic performance and overall student satisfaction."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset provides a clear overview of the performance metrics for the demographic group.",
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
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "demographic_performance",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 48,
    "task_aware_prompt_tokens": 454,
    "token_ratio": 9.4583,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (9.4583 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4654,
      "token_usage": {
        "prompt_tokens": 995,
        "completion_tokens": 415,
        "total_tokens": 1410
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000398
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
    "expected": 1,
    "observed": 1
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "9f222a10e044384f3df5365842c7221aa5f135385ef4124de2e88b600aeb599f",
    "expected_values": [
      "9f222a10e044384f3df5365842c7221aa5f135385ef4124de2e88b600aeb599f"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "58c821196d79a7b9704571024c7538b44ea81c5a099eaa8bdfdcd8b6e4415462",
    "expected": "58c821196d79a7b9704571024c7538b44ea81c5a099eaa8bdfdcd8b6e4415462"
  },
  {
    "check_id": "numeric_fields_demographic_performance",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "demographic_performance",
    "numeric_columns": [
      "avg_engagement_score",
      "avg_score",
      "score_vs_cohort",
      "student_count"
    ],
    "numeric_summaries": {
      "avg_engagement_score": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "avg_score": {
        "count": 1,
        "min": 58.13,
        "max": 58.13
      },
      "score_vs_cohort": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "student_count": {
        "count": 1,
        "min": 649,
        "max": 649
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_demographic_performance",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "demographic_performance",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
