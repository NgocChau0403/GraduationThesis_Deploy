# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G05__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G05__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G05",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
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
      "dataset_label": "submission_behaviour",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G05.json",
      "artifact_sha256": "f3d0c30306a5895a2f9161612693fc4bc0d68f85a22919ba2895d161f217c1ab",
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
  "evidence_artifact_file_sha256": "f3d0c30306a5895a2f9161612693fc4bc0d68f85a22919ba2895d161f217c1ab",
  "evidence_rows_sha256": "7bc0a85ec862c0630f50f2382b4c8ea92773d81a035f2c6dbaab8a1c8d6eed2d",
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
  "embedded_datasets_sha256": "7bc0a85ec862c0630f50f2382b4c8ea92773d81a035f2c6dbaab8a1c8d6eed2d",
  "datasets": {
    "submission_behaviour": [
      {
        "final_outcome": "Fail",
        "assessment_type": "exam",
        "submission_count": 100,
        "student_count": 100,
        "submission_delay_avg": 0,
        "net_submission_delay_avg": 0,
        "late_submission_rate": 0,
        "punctuality_rate": 0,
        "avg_score": 34.45,
        "submission_risk_level": "low_lateness"
      },
      {
        "final_outcome": "Fail",
        "assessment_type": "quiz",
        "submission_count": 200,
        "student_count": 100,
        "submission_delay_avg": 0,
        "net_submission_delay_avg": 0,
        "late_submission_rate": 0,
        "punctuality_rate": 0,
        "avg_score": 38.28,
        "submission_risk_level": "low_lateness"
      },
      {
        "final_outcome": "Pass",
        "assessment_type": "exam",
        "submission_count": 549,
        "student_count": 549,
        "submission_delay_avg": 0,
        "net_submission_delay_avg": 0,
        "late_submission_rate": 0,
        "punctuality_rate": 0,
        "avg_score": 64.1,
        "submission_risk_level": "low_lateness"
      },
      {
        "final_outcome": "Pass",
        "assessment_type": "quiz",
        "submission_count": 1098,
        "student_count": 549,
        "submission_delay_avg": 0,
        "net_submission_delay_avg": 0,
        "late_submission_rate": 0,
        "punctuality_rate": 0,
        "avg_score": 60.91,
        "submission_risk_level": "low_lateness"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G05__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "fb21cef554c9c9884f2b03d5a18013b80f37a0b140c40796a8df5a493adad5e2",
  "generator_input_sha256": "95c33166c2fed61d61f49aba2c97fff7960e56037a003b6f5a25a10066dddfc4",
  "generator_input_compact": {
    "task_id": "A-G05",
    "execution_id": "exec_1781847232447_366211a6",
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
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "submission_behaviour"
    ],
    "dataset_row_counts": {
      "submission_behaviour": 4
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
  "raw_text": "Summary: The analysis of submission behavior reveals that late submissions are not a systemic problem in this class, as evidenced by a late submission rate of 0% across all assessments. However, the overall average scores for failed assessments indicate potential engagement issues.\n\nInsights: Consistent Low Late Submission Rate: All assessments show a late submission rate of 0%, indicating that students are punctual in their submissions. This suggests that late submissions are not a systemic issue within the cohort. | Low Average Scores in Failed Assessments: The average scores for failed assessments (34.45 for exams and 38.28 for quizzes) are significantly lower than the passing scores, indicating a potential lack of engagement or understanding of the material.\n\nEducational implications: The lack of late submissions suggests that students are managing their time effectively, but the low average scores indicate a need for improved engagement strategies.\n\nRecommendations: high - Implement targeted interventions for students with low average scores. - To enhance understanding and engagement, it is crucial to address the underlying issues contributing to low performance in assessments.",
  "structured_payload": {
    "task_id": "A-G05",
    "execution_id": "exec_1781847232447_366211a6",
    "explanation": {
      "summary": "The analysis of submission behavior reveals that late submissions are not a systemic problem in this class, as evidenced by a late submission rate of 0% across all assessments. However, the overall average scores for failed assessments indicate potential engagement issues.",
      "insights": [
        {
          "title": "Consistent Low Late Submission Rate",
          "description": "All assessments show a late submission rate of 0%, indicating that students are punctual in their submissions. This suggests that late submissions are not a systemic issue within the cohort.",
          "severity": "low",
          "evidence": [
            {
              "metric": "late_submission_rate",
              "value": 0,
              "comparison": "stable",
              "delta": 0,
              "context": "All assessments"
            }
          ]
        },
        {
          "title": "Low Average Scores in Failed Assessments",
          "description": "The average scores for failed assessments (34.45 for exams and 38.28 for quizzes) are significantly lower than the passing scores, indicating a potential lack of engagement or understanding of the material.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 34.45,
              "comparison": "down_from_previous",
              "delta": -29.65,
              "context": "Exam average score for failed assessments"
            },
            {
              "metric": "avg_score",
              "value": 38.28,
              "comparison": "down_from_previous",
              "delta": -22.63,
              "context": "Quiz average score for failed assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of late submissions suggests that students are managing their time effectively, but the low average scores indicate a need for improved engagement strategies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions for students with low average scores.",
          "rationale": "To enhance understanding and engagement, it is crucial to address the underlying issues contributing to low performance in assessments."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset provides clear metrics on submission behavior and performance outcomes.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
      "latency_ms": 6946,
      "token_usage": {
        "prompt_tokens": 919,
        "completion_tokens": 497,
        "total_tokens": 1416
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000436
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G05__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "fb21cef554c9c9884f2b03d5a18013b80f37a0b140c40796a8df5a493adad5e2",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 919,
      "completion_tokens": 497,
      "total_tokens": 1416
    },
    "latency_ms": 6951,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G05",
    "execution_id": "exec_1781847232447_366211a6",
    "explanation": {
      "summary": "The analysis of submission behavior reveals that late submissions are not a systemic problem in this class, as evidenced by a late submission rate of 0% across all assessments. However, the overall average scores for failed assessments indicate potential engagement issues.",
      "insights": [
        {
          "title": "Consistent Low Late Submission Rate",
          "description": "All assessments show a late submission rate of 0%, indicating that students are punctual in their submissions. This suggests that late submissions are not a systemic issue within the cohort.",
          "severity": "low",
          "evidence": [
            {
              "metric": "late_submission_rate",
              "value": 0,
              "comparison": "stable",
              "delta": 0,
              "context": "All assessments"
            }
          ]
        },
        {
          "title": "Low Average Scores in Failed Assessments",
          "description": "The average scores for failed assessments (34.45 for exams and 38.28 for quizzes) are significantly lower than the passing scores, indicating a potential lack of engagement or understanding of the material.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 34.45,
              "comparison": "down_from_previous",
              "delta": -29.65,
              "context": "Exam average score for failed assessments"
            },
            {
              "metric": "avg_score",
              "value": 38.28,
              "comparison": "down_from_previous",
              "delta": -22.63,
              "context": "Quiz average score for failed assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of late submissions suggests that students are managing their time effectively, but the low average scores indicate a need for improved engagement strategies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions for students with low average scores.",
          "rationale": "To enhance understanding and engagement, it is crucial to address the underlying issues contributing to low performance in assessments."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset provides clear metrics on submission behavior and performance outcomes.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
      "latency_ms": 6946,
      "token_usage": {
        "prompt_tokens": 919,
        "completion_tokens": 497,
        "total_tokens": 1416
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000436
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
    "observed": "f3d0c30306a5895a2f9161612693fc4bc0d68f85a22919ba2895d161f217c1ab",
    "expected_values": [
      "f3d0c30306a5895a2f9161612693fc4bc0d68f85a22919ba2895d161f217c1ab"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "7bc0a85ec862c0630f50f2382b4c8ea92773d81a035f2c6dbaab8a1c8d6eed2d",
    "expected": "7bc0a85ec862c0630f50f2382b4c8ea92773d81a035f2c6dbaab8a1c8d6eed2d"
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
        "count": 4,
        "min": 34.45,
        "max": 64.1
      },
      "late_submission_rate": {
        "count": 4,
        "min": 0,
        "max": 0
      },
      "net_submission_delay_avg": {
        "count": 4,
        "min": 0,
        "max": 0
      },
      "punctuality_rate": {
        "count": 4,
        "min": 0,
        "max": 0
      },
      "student_count": {
        "count": 4,
        "min": 100,
        "max": 549
      },
      "submission_count": {
        "count": 4,
        "min": 100,
        "max": 1098
      },
      "submission_delay_avg": {
        "count": 4,
        "min": 0,
        "max": 0
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
