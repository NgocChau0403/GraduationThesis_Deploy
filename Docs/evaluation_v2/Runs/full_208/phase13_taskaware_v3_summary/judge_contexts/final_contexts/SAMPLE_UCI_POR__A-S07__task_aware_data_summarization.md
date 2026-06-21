# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S07__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-S07__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-S07",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Student background context",
  "scope": "1 student",
  "actionable_question": "What background factors should admin consider when deciding how to support this student?",
  "target_audience": "academic_advisor, admin",
  "ai_summary_type": "metric_snapshot",
  "ai_prompt_hint": "Frame background factors as context, not judgement. Note which disadvantage dimensions are present and what support is already in place.",
  "query_labels": [
    "background_context"
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
    "highest_education",
    "socioeconomic_band",
    "disadvantage_score [FE single]",
    "support_score [FE single]",
    "family_stability_score [FE single]",
    "disability_flag",
    "internet_access_flag",
    "previous_attempt_count"
  ],
  "output_schema": {
    "required_columns": [
      "school",
      "family_size",
      "gender",
      "age_years",
      "school_support_flag",
      "family_support_flag",
      "has_paid_class",
      "internet_access_flag",
      "support_score",
      "lifestyle_risk_score",
      "social_balance_score",
      "family_stability_score"
    ],
    "optional_columns": [
      "highest_education",
      "mother_education_level",
      "father_education_level",
      "age_group",
      "previous_attempt_count",
      "studytime",
      "absences"
    ]
  },
  "query_labels": [
    "background_context"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-S07-CORE-01",
      "description": "Note which disadvantage dimensions are present and what support is already in place."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-S07-CONSTRAINT-01",
      "description": "Frame background factors as context, not judgement."
    },
    {
      "constraint_id": "A-S07-CONSTRAINT-02",
      "description": "Treat the output as professional advisor/admin context; do not expose raw disadvantage scores in student-facing wording."
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
      "dataset_label": "background_context",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S07.json",
      "artifact_sha256": "29f492d729f419d9bedc40a295a26cbcdc2437f460b158fda3570fa7c3b00211",
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
  "evidence_artifact_file_sha256": "29f492d729f419d9bedc40a295a26cbcdc2437f460b158fda3570fa7c3b00211",
  "evidence_rows_sha256": "cc044cb0aa663e6b21ead2bdc781df79bb9525d82e0ccfbe7b2795b382051a7c",
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
  "embedded_datasets_sha256": "cc044cb0aa663e6b21ead2bdc781df79bb9525d82e0ccfbe7b2795b382051a7c",
  "datasets": {
    "background_context": [
      {
        "highest_education": null,
        "mother_education_level": "4",
        "father_education_level": "4",
        "school": "GP",
        "family_size": "GT3",
        "gender": "F",
        "age_years": 18,
        "age_group": "18-20",
        "school_support_flag": true,
        "family_support_flag": false,
        "has_paid_class": false,
        "internet_access_flag": false,
        "support_score": 0.25,
        "lifestyle_risk_score": 0.47,
        "social_balance_score": 0.03,
        "family_stability_score": 0.58,
        "previous_attempt_count": 0,
        "studytime": 2,
        "absences": 4
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S07__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "d8a1a0d3274b399f9b7455cc87efaa96afe5bd192e9b91f8e6b94b71b993e552",
  "generator_input_sha256": "6fd155a80f4682a7bffb4611d0d310e6dda637c2a076591b3707a9e0188ec3dd",
  "generator_input_compact": {
    "task_id": "A-S07",
    "execution_id": "exec_1781847238136_ee2bf06a",
    "task_name": "Student background context",
    "analysis_type": "aggregation",
    "explanation_strategy": "distribution",
    "actionable_question": "What background factors should admin consider when deciding how to support this student?",
    "target_audience": [
      "academic_advisor",
      "admin"
    ],
    "query_labels": [
      "background_context"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "background_context"
    ],
    "dataset_row_counts": {
      "background_context": 1
    },
    "ai_summary_config_summary": {
      "summary_type": "metric_snapshot",
      "metric_column": null,
      "entity_column": null,
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
  "raw_text": "Summary: The dataset presents a single student's background context, highlighting various educational and social factors. The student exhibits a low support score and limited family support, indicating potential areas for administrative intervention.\n\nInsights: Low Support Score: The student's support score is 0.25, indicating a low level of support which may hinder academic performance. This score is significantly below the average threshold for effective support. | Family Support Absence: The absence of family support (family_support_flag: false) may contribute to the student's challenges, particularly in balancing study and personal life.\n\nEducational implications: The student may require additional institutional support to compensate for low family support and support score.\n\nRecommendations: high - Implement targeted support programs for students with low support scores. - To enhance academic performance and well-being for students lacking family support.",
  "structured_payload": {
    "task_id": "A-S07",
    "execution_id": "exec_1781847238136_ee2bf06a",
    "explanation": {
      "summary": "The dataset presents a single student's background context, highlighting various educational and social factors. The student exhibits a low support score and limited family support, indicating potential areas for administrative intervention.",
      "insights": [
        {
          "title": "Low Support Score",
          "description": "The student's support score is 0.25, indicating a low level of support which may hinder academic performance. This score is significantly below the average threshold for effective support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "support_score",
              "value": 0.25,
              "comparison": "baseline",
              "delta": null,
              "context": "Indicates low support for academic success."
            }
          ]
        },
        {
          "title": "Family Support Absence",
          "description": "The absence of family support (family_support_flag: false) may contribute to the student's challenges, particularly in balancing study and personal life.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "family_support_flag",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Lack of family support can impact student well-being."
            }
          ]
        }
      ],
      "educational_implications": [
        "The student may require additional institutional support to compensate for low family support and support score."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students with low support scores.",
          "rationale": "To enhance academic performance and well-being for students lacking family support."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a sufficient sample size for the metrics analyzed, although it is based on a single student.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "metric_snapshot",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "background_context",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 149,
    "task_aware_prompt_tokens": 882,
    "token_ratio": 5.9195,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "action_evidence.action_evidence",
      "exceptions.sensitive_context"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (5.9195 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5867,
      "token_usage": {
        "prompt_tokens": 1345,
        "completion_tokens": 411,
        "total_tokens": 1756
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000448
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S07__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "d8a1a0d3274b399f9b7455cc87efaa96afe5bd192e9b91f8e6b94b71b993e552",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1345,
      "completion_tokens": 411,
      "total_tokens": 1756
    },
    "latency_ms": 5877,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S07",
    "execution_id": "exec_1781847238136_ee2bf06a",
    "explanation": {
      "summary": "The dataset presents a single student's background context, highlighting various educational and social factors. The student exhibits a low support score and limited family support, indicating potential areas for administrative intervention.",
      "insights": [
        {
          "title": "Low Support Score",
          "description": "The student's support score is 0.25, indicating a low level of support which may hinder academic performance. This score is significantly below the average threshold for effective support.",
          "severity": "high",
          "evidence": [
            {
              "metric": "support_score",
              "value": 0.25,
              "comparison": "baseline",
              "delta": null,
              "context": "Indicates low support for academic success."
            }
          ]
        },
        {
          "title": "Family Support Absence",
          "description": "The absence of family support (family_support_flag: false) may contribute to the student's challenges, particularly in balancing study and personal life.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "family_support_flag",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Lack of family support can impact student well-being."
            }
          ]
        }
      ],
      "educational_implications": [
        "The student may require additional institutional support to compensate for low family support and support score."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students with low support scores.",
          "rationale": "To enhance academic performance and well-being for students lacking family support."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a sufficient sample size for the metrics analyzed, although it is based on a single student.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "metric_snapshot",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "background_context",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 149,
    "task_aware_prompt_tokens": 882,
    "token_ratio": 5.9195,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "action_evidence.action_evidence",
      "exceptions.sensitive_context"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (5.9195 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5867,
      "token_usage": {
        "prompt_tokens": 1345,
        "completion_tokens": 411,
        "total_tokens": 1756
      },
      "strategy": "distribution",
      "granularity": "semester",
      "cost_usd": 0.000448
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
    "observed": "29f492d729f419d9bedc40a295a26cbcdc2437f460b158fda3570fa7c3b00211",
    "expected_values": [
      "29f492d729f419d9bedc40a295a26cbcdc2437f460b158fda3570fa7c3b00211"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "cc044cb0aa663e6b21ead2bdc781df79bb9525d82e0ccfbe7b2795b382051a7c",
    "expected": "cc044cb0aa663e6b21ead2bdc781df79bb9525d82e0ccfbe7b2795b382051a7c"
  },
  {
    "check_id": "numeric_fields_background_context",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "background_context",
    "numeric_columns": [
      "absences",
      "age_years",
      "family_stability_score",
      "lifestyle_risk_score",
      "previous_attempt_count",
      "social_balance_score",
      "studytime",
      "support_score"
    ],
    "numeric_summaries": {
      "absences": {
        "count": 1,
        "min": 4,
        "max": 4
      },
      "age_years": {
        "count": 1,
        "min": 18,
        "max": 18
      },
      "family_stability_score": {
        "count": 1,
        "min": 0.58,
        "max": 0.58
      },
      "lifestyle_risk_score": {
        "count": 1,
        "min": 0.47,
        "max": 0.47
      },
      "previous_attempt_count": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "social_balance_score": {
        "count": 1,
        "min": 0.03,
        "max": 0.03
      },
      "studytime": {
        "count": 1,
        "min": 2,
        "max": 2
      },
      "support_score": {
        "count": 1,
        "min": 0.25,
        "max": 0.25
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_background_context",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "background_context",
    "flag_columns": [
      "school_support_flag",
      "family_support_flag",
      "internet_access_flag",
      "lifestyle_risk_score"
    ],
    "triggered_like_counts": {
      "school_support_flag": 1,
      "family_support_flag": 0,
      "internet_access_flag": 0,
      "lifestyle_risk_score": 0
    }
  }
]
```
