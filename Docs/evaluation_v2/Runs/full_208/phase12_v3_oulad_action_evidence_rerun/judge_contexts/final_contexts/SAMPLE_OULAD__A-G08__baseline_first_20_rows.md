# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G08__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G08__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G08",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
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
      "dataset_label": "demographic_performance",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G08.json",
      "artifact_sha256": "8f4e41747ea3f615d793457834081d21309a8a5f5847129b33cf83033b87ad18",
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
  "evidence_artifact_file_sha256": "8f4e41747ea3f615d793457834081d21309a8a5f5847129b33cf83033b87ad18",
  "evidence_rows_sha256": "5f0d9bfd03e96ed997d71cc6bb04e9fda69ba2a7710330604934b332f31cd243",
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
  "embedded_datasets_sha256": "5f0d9bfd03e96ed997d71cc6bb04e9fda69ba2a7710330604934b332f31cd243",
  "datasets": {
    "demographic_performance": [
      {
        "group_value": "Unknown",
        "student_count": 131,
        "avg_score": 81.21,
        "avg_engagement_score": 0.1903,
        "score_vs_cohort": 10.77
      },
      {
        "group_value": "90-100%",
        "student_count": 181,
        "avg_score": 74.53,
        "avg_engagement_score": 0.1457,
        "score_vs_cohort": 4.09
      },
      {
        "group_value": "80-90%",
        "student_count": 201,
        "avg_score": 72.35,
        "avg_engagement_score": 0.1668,
        "score_vs_cohort": 1.92
      },
      {
        "group_value": "60-70%",
        "student_count": 193,
        "avg_score": 71.85,
        "avg_engagement_score": 0.1414,
        "score_vs_cohort": 1.42
      },
      {
        "group_value": "70-80%",
        "student_count": 194,
        "avg_score": 71.33,
        "avg_engagement_score": 0.138,
        "score_vs_cohort": 0.89
      },
      {
        "group_value": "50-60%",
        "student_count": 191,
        "avg_score": 70.27,
        "avg_engagement_score": 0.1484,
        "score_vs_cohort": -0.17
      },
      {
        "group_value": "30-40%",
        "student_count": 206,
        "avg_score": 68.5,
        "avg_engagement_score": 0.1392,
        "score_vs_cohort": -1.94
      },
      {
        "group_value": "0-10%",
        "student_count": 152,
        "avg_score": 68.05,
        "avg_engagement_score": 0.1463,
        "score_vs_cohort": -2.39
      },
      {
        "group_value": "40-50%",
        "student_count": 185,
        "avg_score": 67.76,
        "avg_engagement_score": 0.1312,
        "score_vs_cohort": -2.67
      },
      {
        "group_value": "20-30%",
        "student_count": 196,
        "avg_score": 65.99,
        "avg_engagement_score": 0.1318,
        "score_vs_cohort": -4.45
      },
      {
        "group_value": "10-20",
        "student_count": 168,
        "avg_score": 62.96,
        "avg_engagement_score": 0.1312,
        "score_vs_cohort": -7.48
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G08__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "9d6a81aa138fd03cb0f70403d4291e106ac232266f67055bc3d1f8c429ccb3f7",
  "generator_input_sha256": "4c010fabc8b8fc973ee3cb1fe68a9003b638aa96a45213d598ebb6fa4b33b060",
  "generator_input_compact": {
    "task_id": "A-G08",
    "execution_id": "exec_1781847735724_ef073aa0",
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
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "demographic_performance"
    ],
    "dataset_row_counts": {
      "demographic_performance": 11
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
  "raw_text": "Summary: The analysis of the demographic performance and engagement profile reveals significant disparities among student groups, particularly in average scores and engagement levels. The 'Unknown' group demonstrates the highest average score and engagement, while lower-performing groups exhibit notable deficiencies in both metrics.\n\nInsights: Top Performing Group: The 'Unknown' group outperforms all other demographic groups with an average score of 81.21, significantly above the cohort average. This group also has the highest engagement score, indicating a strong correlation between performance and engagement. | Lowest Performing Group: The '10-20' group has the lowest average score of 62.96, which is significantly below the cohort average, indicating a critical need for targeted interventions to improve both performance and engagement.\n\nEducational implications: The disparity in performance and engagement scores suggests that certain demographic groups may require additional support and resources to enhance their learning outcomes.\n\nRecommendations: high - Implement targeted support programs for low-performing groups, particularly the '10-20' group. - Addressing the specific needs of these students can help improve their academic performance and engagement levels. | medium - Enhance engagement strategies for all groups, focusing on those with lower engagement scores. - Improving engagement can lead to better academic outcomes across the board.",
  "structured_payload": {
    "task_id": "A-G08",
    "execution_id": "exec_1781847735724_ef073aa0",
    "explanation": {
      "summary": "The analysis of the demographic performance and engagement profile reveals significant disparities among student groups, particularly in average scores and engagement levels. The 'Unknown' group demonstrates the highest average score and engagement, while lower-performing groups exhibit notable deficiencies in both metrics.",
      "insights": [
        {
          "title": "Top Performing Group",
          "description": "The 'Unknown' group outperforms all other demographic groups with an average score of 81.21, significantly above the cohort average. This group also has the highest engagement score, indicating a strong correlation between performance and engagement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 81.21,
              "comparison": "baseline",
              "delta": 10.77,
              "context": "Highest average score compared to cohort"
            },
            {
              "metric": "avg_engagement_score",
              "value": 0.1903,
              "comparison": "baseline",
              "delta": 0.0488,
              "context": "Highest engagement score compared to cohort"
            }
          ]
        },
        {
          "title": "Lowest Performing Group",
          "description": "The '10-20' group has the lowest average score of 62.96, which is significantly below the cohort average, indicating a critical need for targeted interventions to improve both performance and engagement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 62.96,
              "comparison": "down_from_previous",
              "delta": -7.48,
              "context": "Lowest average score among all groups"
            },
            {
              "metric": "avg_engagement_score",
              "value": 0.1312,
              "comparison": "baseline",
              "delta": -0.0591,
              "context": "Low engagement score compared to cohort"
            }
          ]
        }
      ],
      "educational_implications": [
        "The disparity in performance and engagement scores suggests that certain demographic groups may require additional support and resources to enhance their learning outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for low-performing groups, particularly the '10-20' group.",
          "rationale": "Addressing the specific needs of these students can help improve their academic performance and engagement levels."
        },
        {
          "priority": "medium",
          "action": "Enhance engagement strategies for all groups, focusing on those with lower engagement scores.",
          "rationale": "Improving engagement can lead to better academic outcomes across the board."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is comprehensive and reflects a clear cohort-level analysis.",
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
      "latency_ms": 8848,
      "token_usage": {
        "prompt_tokens": 1183,
        "completion_tokens": 618,
        "total_tokens": 1801
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000548
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G08__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "9d6a81aa138fd03cb0f70403d4291e106ac232266f67055bc3d1f8c429ccb3f7",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1183,
      "completion_tokens": 618,
      "total_tokens": 1801
    },
    "latency_ms": 8850,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G08",
    "execution_id": "exec_1781847735724_ef073aa0",
    "explanation": {
      "summary": "The analysis of the demographic performance and engagement profile reveals significant disparities among student groups, particularly in average scores and engagement levels. The 'Unknown' group demonstrates the highest average score and engagement, while lower-performing groups exhibit notable deficiencies in both metrics.",
      "insights": [
        {
          "title": "Top Performing Group",
          "description": "The 'Unknown' group outperforms all other demographic groups with an average score of 81.21, significantly above the cohort average. This group also has the highest engagement score, indicating a strong correlation between performance and engagement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 81.21,
              "comparison": "baseline",
              "delta": 10.77,
              "context": "Highest average score compared to cohort"
            },
            {
              "metric": "avg_engagement_score",
              "value": 0.1903,
              "comparison": "baseline",
              "delta": 0.0488,
              "context": "Highest engagement score compared to cohort"
            }
          ]
        },
        {
          "title": "Lowest Performing Group",
          "description": "The '10-20' group has the lowest average score of 62.96, which is significantly below the cohort average, indicating a critical need for targeted interventions to improve both performance and engagement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 62.96,
              "comparison": "down_from_previous",
              "delta": -7.48,
              "context": "Lowest average score among all groups"
            },
            {
              "metric": "avg_engagement_score",
              "value": 0.1312,
              "comparison": "baseline",
              "delta": -0.0591,
              "context": "Low engagement score compared to cohort"
            }
          ]
        }
      ],
      "educational_implications": [
        "The disparity in performance and engagement scores suggests that certain demographic groups may require additional support and resources to enhance their learning outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for low-performing groups, particularly the '10-20' group.",
          "rationale": "Addressing the specific needs of these students can help improve their academic performance and engagement levels."
        },
        {
          "priority": "medium",
          "action": "Enhance engagement strategies for all groups, focusing on those with lower engagement scores.",
          "rationale": "Improving engagement can lead to better academic outcomes across the board."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is comprehensive and reflects a clear cohort-level analysis.",
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
      "latency_ms": 8848,
      "token_usage": {
        "prompt_tokens": 1183,
        "completion_tokens": 618,
        "total_tokens": 1801
      },
      "strategy": "comparison",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000548
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
    "observed": "8f4e41747ea3f615d793457834081d21309a8a5f5847129b33cf83033b87ad18",
    "expected_values": [
      "8f4e41747ea3f615d793457834081d21309a8a5f5847129b33cf83033b87ad18"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "5f0d9bfd03e96ed997d71cc6bb04e9fda69ba2a7710330604934b332f31cd243",
    "expected": "5f0d9bfd03e96ed997d71cc6bb04e9fda69ba2a7710330604934b332f31cd243"
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
        "count": 11,
        "min": 0.1312,
        "max": 0.1903
      },
      "avg_score": {
        "count": 11,
        "min": 62.96,
        "max": 81.21
      },
      "score_vs_cohort": {
        "count": 11,
        "min": -7.48,
        "max": 10.77
      },
      "student_count": {
        "count": 11,
        "min": 131,
        "max": 206
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
