# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-S01__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-S01",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Student full profile snapshot",
  "scope": "1 student",
  "actionable_question": "Who is this student and what is their current overall situation?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "metric_snapshot",
  "ai_prompt_hint": "Summarise who this student is and where they stand across all dimensions (score, engagement, risk) in plain language.",
  "query_labels": [
    "student_profile"
  ],
  "explanation_strategy": "distribution"
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
    "student_id",
    "gender",
    "age_group",
    "avg_score [FE cross]",
    "engagement_score [FE cross]",
    "at_risk_label [FE cross]",
    "at_risk_score [FE cross]",
    "study_effort_level [FE cross]",
    "final_outcome",
    "previous_attempt_count"
  ],
  "output_schema": {},
  "query_labels": [
    "student_profile"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-S01-CORE-01",
      "description": "Summarise who this student is and where they stand across all dimensions (score, engagement, risk) in plain language."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-S01-CONSTRAINT-01",
      "description": "Do not extrapolate beyond returned score, engagement, and risk dimensions."
    },
    {
      "constraint_id": "A-S01-CONSTRAINT-02",
      "description": "Avoid holistic judgements about the student when supporting data is absent."
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
      "dataset_label": "student_profile",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S01.json",
      "artifact_sha256": "ec2015b1eca0857d3f4bbc0065c54377d81643b914bd603c2ab399161f2c28bc",
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
  "evidence_artifact_file_sha256": "ec2015b1eca0857d3f4bbc0065c54377d81643b914bd603c2ab399161f2c28bc",
  "evidence_rows_sha256": "0c10f4df138d1a4a879ee1ca0e9aa788f9246d0acb4a47b54e5818fcc8b508a8",
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
  "embedded_datasets_sha256": "0c10f4df138d1a4a879ee1ca0e9aa788f9246d0acb4a47b54e5818fcc8b508a8",
  "datasets": {
    "student_profile": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "gender": "F",
        "age_group": "18-20",
        "region": null,
        "previous_attempt_count": 0,
        "final_outcome": "Pass",
        "avg_score": 36.666666666666664,
        "at_risk_score": 2,
        "at_risk_label": "medium",
        "engagement_score": 0,
        "study_effort_level": "very_low"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S01__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "43dd0df292ae001564ba7d467d47a81bbf943f20ddf3532b7c5f4651db8b0a71",
  "generator_input_sha256": "3e10d9ad5d8d57b08958344478fddd230521b4a3d680ba3ac77a27786c43909a",
  "generator_input_compact": {
    "task_id": "A-S01",
    "execution_id": "exec_1781847237940_4db41799",
    "task_name": "Student full profile snapshot",
    "analysis_type": "aggregation",
    "explanation_strategy": "distribution",
    "actionable_question": "Who is this student and what is their current overall situation?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "student_profile"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "student_profile"
    ],
    "dataset_row_counts": {
      "student_profile": 1
    },
    "ai_summary_config_summary": {
      "summary_type": "metric_snapshot",
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
      "require_sensitive_context_policy": true,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: The student in focus is a female aged 18-20, who has not previously attempted any courses and has achieved a passing final outcome. However, her average score is notably low, indicating potential areas for improvement.\n\nInsights: Low Average Score: The student's average score of 36.67 is significantly below typical passing thresholds, suggesting a need for targeted academic support. | Engagement and Study Effort: The engagement score is 0 and the study effort level is categorized as 'very_low', indicating a lack of active participation and commitment to studies. | At-Risk Status: The student has an at-risk score of 2, labeled as 'medium', which highlights a moderate level of concern regarding her academic performance.\n\nEducational implications: The student may benefit from increased support and resources to enhance engagement and academic performance.\n\nRecommendations: high - Implement targeted interventions to improve engagement and study habits. - Addressing low engagement and study effort is crucial for improving academic outcomes. | medium - Provide academic tutoring or mentoring. - Personalized support can help the student improve her average score and overall understanding of course material.",
  "structured_payload": {
    "task_id": "A-S01",
    "execution_id": "exec_1781847237940_4db41799",
    "explanation": {
      "summary": "The student in focus is a female aged 18-20, who has not previously attempted any courses and has achieved a passing final outcome. However, her average score is notably low, indicating potential areas for improvement.",
      "insights": [
        {
          "title": "Low Average Score",
          "description": "The student's average score of 36.67 is significantly below typical passing thresholds, suggesting a need for targeted academic support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 36.67,
              "comparison": "baseline",
              "delta": null,
              "context": "Average score is below passing standards."
            }
          ]
        },
        {
          "title": "Engagement and Study Effort",
          "description": "The engagement score is 0 and the study effort level is categorized as 'very_low', indicating a lack of active participation and commitment to studies.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "No engagement recorded."
            }
          ]
        },
        {
          "title": "At-Risk Status",
          "description": "The student has an at-risk score of 2, labeled as 'medium', which highlights a moderate level of concern regarding her academic performance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 2,
              "comparison": "baseline",
              "delta": null,
              "context": "Medium risk label indicates potential for academic challenges."
            }
          ]
        }
      ],
      "educational_implications": [
        "The student may benefit from increased support and resources to enhance engagement and academic performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions to improve engagement and study habits.",
          "rationale": "Addressing low engagement and study effort is crucial for improving academic outcomes."
        },
        {
          "priority": "medium",
          "action": "Provide academic tutoring or mentoring.",
          "rationale": "Personalized support can help the student improve her average score and overall understanding of course material."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is complete and specific to the student's profile.",
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
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "student_profile",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7926,
      "token_usage": {
        "prompt_tokens": 778,
        "completion_tokens": 550,
        "total_tokens": 1328
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000447
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S01__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "43dd0df292ae001564ba7d467d47a81bbf943f20ddf3532b7c5f4651db8b0a71",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 778,
      "completion_tokens": 550,
      "total_tokens": 1328
    },
    "latency_ms": 7931,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S01",
    "execution_id": "exec_1781847237940_4db41799",
    "explanation": {
      "summary": "The student in focus is a female aged 18-20, who has not previously attempted any courses and has achieved a passing final outcome. However, her average score is notably low, indicating potential areas for improvement.",
      "insights": [
        {
          "title": "Low Average Score",
          "description": "The student's average score of 36.67 is significantly below typical passing thresholds, suggesting a need for targeted academic support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 36.67,
              "comparison": "baseline",
              "delta": null,
              "context": "Average score is below passing standards."
            }
          ]
        },
        {
          "title": "Engagement and Study Effort",
          "description": "The engagement score is 0 and the study effort level is categorized as 'very_low', indicating a lack of active participation and commitment to studies.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "No engagement recorded."
            }
          ]
        },
        {
          "title": "At-Risk Status",
          "description": "The student has an at-risk score of 2, labeled as 'medium', which highlights a moderate level of concern regarding her academic performance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 2,
              "comparison": "baseline",
              "delta": null,
              "context": "Medium risk label indicates potential for academic challenges."
            }
          ]
        }
      ],
      "educational_implications": [
        "The student may benefit from increased support and resources to enhance engagement and academic performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions to improve engagement and study habits.",
          "rationale": "Addressing low engagement and study effort is crucial for improving academic outcomes."
        },
        {
          "priority": "medium",
          "action": "Provide academic tutoring or mentoring.",
          "rationale": "Personalized support can help the student improve her average score and overall understanding of course material."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is complete and specific to the student's profile.",
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
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "student_profile",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7926,
      "token_usage": {
        "prompt_tokens": 778,
        "completion_tokens": 550,
        "total_tokens": 1328
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000447
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
    "observed": "ec2015b1eca0857d3f4bbc0065c54377d81643b914bd603c2ab399161f2c28bc",
    "expected_values": [
      "ec2015b1eca0857d3f4bbc0065c54377d81643b914bd603c2ab399161f2c28bc"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "0c10f4df138d1a4a879ee1ca0e9aa788f9246d0acb4a47b54e5818fcc8b508a8",
    "expected": "0c10f4df138d1a4a879ee1ca0e9aa788f9246d0acb4a47b54e5818fcc8b508a8"
  },
  {
    "check_id": "numeric_fields_student_profile",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "student_profile",
    "numeric_columns": [
      "at_risk_score",
      "avg_score",
      "engagement_score",
      "previous_attempt_count"
    ],
    "numeric_summaries": {
      "at_risk_score": {
        "count": 1,
        "min": 2,
        "max": 2
      },
      "avg_score": {
        "count": 1,
        "min": 36.666666666666664,
        "max": 36.666666666666664
      },
      "engagement_score": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "previous_attempt_count": {
        "count": 1,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_student_profile",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "student_profile",
    "flag_columns": [
      "at_risk_score",
      "at_risk_label"
    ],
    "triggered_like_counts": {
      "at_risk_score": 0,
      "at_risk_label": 0
    }
  }
]
```
