# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G16__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G16__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G16",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Admin action recommendation",
  "scope": "Many students",
  "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
  "target_audience": "admin",
  "ai_summary_type": "action_synthesis",
  "ai_prompt_hint": "Synthesise all cohort [FE] signals into 3–5 admin actions. This is the most critical AI synthesis task for admin role.",
  "query_labels": [
    "synthesis_data"
  ],
  "explanation_strategy": "risk"
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
    "[AI_SYNTHESIS] low_engagement_count",
    "high_risk_count",
    "hardest_assessment",
    "best_resource_type",
    "total_students"
  ],
  "output_schema": {},
  "query_labels": [
    "synthesis_data"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G16-CORE-01",
      "description": "Explain the supported cohort-level admin actions already generated or exposed by the action_synthesis rule contract; do not require invented actions outside the returned or triggered action set."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G16-CONSTRAINT-01",
      "description": "Every explained or recommended action must be grounded in returned cohort feature-engineered signals or the supplied action-rule contract."
    },
    {
      "constraint_id": "A-G16-CONSTRAINT-02",
      "description": "Do not invent urgency, priority, or additional actions without supporting returned data or supported action evidence."
    },
    {
      "constraint_id": "A-G16-CONSTRAINT-03",
      "description": "If no supported cohort-level action is returned or triggered, saying no supported action is available is acceptable; penalize that only when deterministic action evidence shows at least one supported action exists."
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
      "dataset_label": "synthesis_data",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G16.json",
      "artifact_sha256": "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224",
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
  "evidence_artifact_file_sha256": "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224",
  "evidence_rows_sha256": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
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
  "embedded_datasets_sha256": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
  "datasets": {
    "synthesis_data": [
      {
        "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
        "low_engagement_count": 1240,
        "high_risk_count": 906,
        "hardest_assessment": "24299",
        "best_resource_type": "quiz",
        "total_students": 1998
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G16__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "634920834c903ee18d71c19544477ce0dea61436eb893ff5dcb6f4e5adc91f7e",
  "generator_input_sha256": "3ebc1dd17a178f829f5bf5e74250a920ee55d97b5cbcf78343227aa12be4154f",
  "generator_input_compact": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847803029_391203b0",
    "task_name": "Admin action recommendation",
    "analysis_type": "synthesis",
    "explanation_strategy": "risk",
    "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
    "target_audience": [
      "admin"
    ],
    "query_labels": [
      "synthesis_data"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "synthesis_data"
    ],
    "dataset_row_counts": {
      "synthesis_data": 1
    },
    "ai_summary_config_summary": {
      "summary_type": "action_synthesis",
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
      "require_sensitive_context_policy": false,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: The action plan is informed by a total of 1,998 students, with 1,240 identified as having low engagement and 906 categorized as high risk. The hardest assessment is noted as '24299', indicating a specific challenge for students, while quizzes are highlighted as the best resource type, suggesting a focus for engagement efforts.\n\nInsights: Why priority outreach is Step 1: With 906 students classified as high risk, prioritizing outreach is essential to address their needs and encourage retention. | Why engagement is Step 2: The presence of 1,240 students with low engagement underscores the necessity for targeted engagement efforts to enhance participation and performance. | Why assessment support is Step 3: The identification of '24299' as the hardest assessment highlights the need for additional support to help students navigate this challenge effectively. | Why resource nudges are Step 4: Quizzes being the best resource type suggests that nudging students towards these resources could enhance their learning experience and engagement.",
  "structured_payload": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847803029_391203b0",
    "explanation": {
      "summary": "The action plan is informed by a total of 1,998 students, with 1,240 identified as having low engagement and 906 categorized as high risk. The hardest assessment is noted as '24299', indicating a specific challenge for students, while quizzes are highlighted as the best resource type, suggesting a focus for engagement efforts.",
      "insights": [
        {
          "title": "Why priority outreach is Step 1",
          "description": "With 906 students classified as high risk, prioritizing outreach is essential to address their needs and encourage retention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "high_risk_count",
              "value": 906,
              "comparison": "baseline",
              "delta": null,
              "context": "High risk students represent a significant portion of the cohort."
            }
          ]
        },
        {
          "title": "Why engagement is Step 2",
          "description": "The presence of 1,240 students with low engagement underscores the necessity for targeted engagement efforts to enhance participation and performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "low_engagement_count",
              "value": 1240,
              "comparison": "baseline",
              "delta": null,
              "context": "Low engagement levels indicate a critical area for intervention."
            }
          ]
        },
        {
          "title": "Why assessment support is Step 3",
          "description": "The identification of '24299' as the hardest assessment highlights the need for additional support to help students navigate this challenge effectively.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "hardest_assessment",
              "value": "24299",
              "comparison": "baseline",
              "delta": null,
              "context": "Difficult assessments can hinder overall student success."
            }
          ]
        },
        {
          "title": "Why resource nudges are Step 4",
          "description": "Quizzes being the best resource type suggests that nudging students towards these resources could enhance their learning experience and engagement.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "best_resource_type",
              "value": "quiz",
              "comparison": "baseline",
              "delta": null,
              "context": "Effective resources can significantly impact student performance."
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and accurately reflects the current cohort metrics.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
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
      "latency_ms": 8664,
      "token_usage": {
        "prompt_tokens": 880,
        "completion_tokens": 576,
        "total_tokens": 1456
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000478
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G16__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "634920834c903ee18d71c19544477ce0dea61436eb893ff5dcb6f4e5adc91f7e",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 880,
      "completion_tokens": 576,
      "total_tokens": 1456
    },
    "latency_ms": 8673,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847803029_391203b0",
    "explanation": {
      "summary": "The action plan is informed by a total of 1,998 students, with 1,240 identified as having low engagement and 906 categorized as high risk. The hardest assessment is noted as '24299', indicating a specific challenge for students, while quizzes are highlighted as the best resource type, suggesting a focus for engagement efforts.",
      "insights": [
        {
          "title": "Why priority outreach is Step 1",
          "description": "With 906 students classified as high risk, prioritizing outreach is essential to address their needs and encourage retention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "high_risk_count",
              "value": 906,
              "comparison": "baseline",
              "delta": null,
              "context": "High risk students represent a significant portion of the cohort."
            }
          ]
        },
        {
          "title": "Why engagement is Step 2",
          "description": "The presence of 1,240 students with low engagement underscores the necessity for targeted engagement efforts to enhance participation and performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "low_engagement_count",
              "value": 1240,
              "comparison": "baseline",
              "delta": null,
              "context": "Low engagement levels indicate a critical area for intervention."
            }
          ]
        },
        {
          "title": "Why assessment support is Step 3",
          "description": "The identification of '24299' as the hardest assessment highlights the need for additional support to help students navigate this challenge effectively.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "hardest_assessment",
              "value": "24299",
              "comparison": "baseline",
              "delta": null,
              "context": "Difficult assessments can hinder overall student success."
            }
          ]
        },
        {
          "title": "Why resource nudges are Step 4",
          "description": "Quizzes being the best resource type suggests that nudging students towards these resources could enhance their learning experience and engagement.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "best_resource_type",
              "value": "quiz",
              "comparison": "baseline",
              "delta": null,
              "context": "Effective resources can significantly impact student performance."
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and accurately reflects the current cohort metrics.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
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
      "latency_ms": 8664,
      "token_usage": {
        "prompt_tokens": 880,
        "completion_tokens": 576,
        "total_tokens": 1456
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000478
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
    "observed": "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224",
    "expected_values": [
      "62afc68fdc8de4338f29b806b54823ad658a315f755f333e4608daa2bb08a224"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013",
    "expected": "c6a9fe98d31eb3e45d605a9b1dad5f107fbefbed71e63f7a93f8211de6137013"
  },
  {
    "check_id": "numeric_fields_synthesis_data",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "numeric_columns": [
      "high_risk_count",
      "low_engagement_count",
      "total_students"
    ],
    "numeric_summaries": {
      "high_risk_count": {
        "count": 1,
        "min": 906,
        "max": 906
      },
      "low_engagement_count": {
        "count": 1,
        "min": 1240,
        "max": 1240
      },
      "total_students": {
        "count": 1,
        "min": 1998,
        "max": 1998
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_synthesis_data",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "flag_columns": [
      "high_risk_count"
    ],
    "triggered_like_counts": {
      "high_risk_count": 0
    }
  }
]
```
