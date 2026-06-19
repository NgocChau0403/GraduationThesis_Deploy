# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-S01__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-S01__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-S01",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
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

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "student_profile",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-S01.json",
      "artifact_sha256": "571fbfd5a5f4b6aadbd2ae06eb63417d65d32d6ecc3ca2592d316fa372796d12",
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
  "evidence_artifact_file_sha256": "571fbfd5a5f4b6aadbd2ae06eb63417d65d32d6ecc3ca2592d316fa372796d12",
  "evidence_rows_sha256": "e09adf2281d52aea6e70987c40166e5b769dd26389368609bf2e012d25764562",
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
  "embedded_datasets_sha256": "e09adf2281d52aea6e70987c40166e5b769dd26389368609bf2e012d25764562",
  "datasets": {
    "student_profile": [
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "gender": "M",
        "age_group": "0-35",
        "region": "Scotland",
        "previous_attempt_count": 1,
        "final_outcome": "Distinction",
        "avg_score": 91.2,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "engagement_score": 0.2024,
        "study_effort_level": "medium"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S01__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "3c842127f97d08d74af2cacb97adc088f2365be71835cf76ba61be1e805c5be7",
  "generator_input_sha256": "865951266c5ed7e5d23abe9693045d11290e482b661cb23fbeaf456b1279e6c4",
  "generator_input_compact": {
    "task_id": "A-S01",
    "execution_id": "exec_1781847821333_85e5e848",
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
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
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
  "raw_text": "Summary: The student, identified as SAMPLE_OULAD_STU_100788, is a male aged between 0-35 years from Scotland. He has achieved a final outcome of Distinction with an average score of 91.2, indicating strong academic performance, but also has a high at-risk score of 3, suggesting potential concerns regarding engagement.\n\nInsights: High Academic Achievement: The student has an average score of 91.2, which is significantly above typical passing thresholds, indicating strong academic performance. | High At-Risk Score: Despite the high average score, the student has an at-risk score of 3, categorized as high, which may indicate issues with engagement or study habits.\n\nEducational implications: The high at-risk score indicates a need for targeted interventions to improve engagement and study habits.\n\nRecommendations: high - Implement engagement strategies tailored to the student's needs. - Addressing the high at-risk score can help sustain the student's academic success and prevent potential decline.",
  "structured_payload": {
    "task_id": "A-S01",
    "execution_id": "exec_1781847821333_85e5e848",
    "explanation": {
      "summary": "The student, identified as SAMPLE_OULAD_STU_100788, is a male aged between 0-35 years from Scotland. He has achieved a final outcome of Distinction with an average score of 91.2, indicating strong academic performance, but also has a high at-risk score of 3, suggesting potential concerns regarding engagement.",
      "insights": [
        {
          "title": "High Academic Achievement",
          "description": "The student has an average score of 91.2, which is significantly above typical passing thresholds, indicating strong academic performance.",
          "severity": "low",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 91.2,
              "comparison": "baseline",
              "delta": null,
              "context": "This score reflects a high level of understanding of the course material."
            }
          ]
        },
        {
          "title": "High At-Risk Score",
          "description": "Despite the high average score, the student has an at-risk score of 3, categorized as high, which may indicate issues with engagement or study habits.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "This score suggests the student may need additional support to maintain performance."
            }
          ]
        }
      ],
      "educational_implications": [
        "The high at-risk score indicates a need for targeted interventions to improve engagement and study habits."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement engagement strategies tailored to the student's needs.",
          "rationale": "Addressing the high at-risk score can help sustain the student's academic success and prevent potential decline."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is complete and specific to the student profile.",
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
      "latency_ms": 9087,
      "token_usage": {
        "prompt_tokens": 778,
        "completion_tokens": 445,
        "total_tokens": 1223
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000384
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S01__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "3c842127f97d08d74af2cacb97adc088f2365be71835cf76ba61be1e805c5be7",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 778,
      "completion_tokens": 445,
      "total_tokens": 1223
    },
    "latency_ms": 9090,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S01",
    "execution_id": "exec_1781847821333_85e5e848",
    "explanation": {
      "summary": "The student, identified as SAMPLE_OULAD_STU_100788, is a male aged between 0-35 years from Scotland. He has achieved a final outcome of Distinction with an average score of 91.2, indicating strong academic performance, but also has a high at-risk score of 3, suggesting potential concerns regarding engagement.",
      "insights": [
        {
          "title": "High Academic Achievement",
          "description": "The student has an average score of 91.2, which is significantly above typical passing thresholds, indicating strong academic performance.",
          "severity": "low",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 91.2,
              "comparison": "baseline",
              "delta": null,
              "context": "This score reflects a high level of understanding of the course material."
            }
          ]
        },
        {
          "title": "High At-Risk Score",
          "description": "Despite the high average score, the student has an at-risk score of 3, categorized as high, which may indicate issues with engagement or study habits.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "This score suggests the student may need additional support to maintain performance."
            }
          ]
        }
      ],
      "educational_implications": [
        "The high at-risk score indicates a need for targeted interventions to improve engagement and study habits."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement engagement strategies tailored to the student's needs.",
          "rationale": "Addressing the high at-risk score can help sustain the student's academic success and prevent potential decline."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is complete and specific to the student profile.",
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
      "latency_ms": 9087,
      "token_usage": {
        "prompt_tokens": 778,
        "completion_tokens": 445,
        "total_tokens": 1223
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000384
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
    "observed": "571fbfd5a5f4b6aadbd2ae06eb63417d65d32d6ecc3ca2592d316fa372796d12",
    "expected_values": [
      "571fbfd5a5f4b6aadbd2ae06eb63417d65d32d6ecc3ca2592d316fa372796d12"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "e09adf2281d52aea6e70987c40166e5b769dd26389368609bf2e012d25764562",
    "expected": "e09adf2281d52aea6e70987c40166e5b769dd26389368609bf2e012d25764562"
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
        "min": 3,
        "max": 3
      },
      "avg_score": {
        "count": 1,
        "min": 91.2,
        "max": 91.2
      },
      "engagement_score": {
        "count": 1,
        "min": 0.2024,
        "max": 0.2024
      },
      "previous_attempt_count": {
        "count": 1,
        "min": 1,
        "max": 1
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
