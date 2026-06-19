# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-G16__baseline_first_20_rows

This Phase 6.4b context is the record-level evidence package to supply with the frozen Judge Prompt V2 during pilot judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G16__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_pilot_phase6_4",
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
      "description": "Synthesise cohort feature-engineered signals into 3–5 admin actions."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G16-CONSTRAINT-01",
      "description": "Every recommended action must be grounded in returned cohort feature-engineered signals."
    },
    {
      "constraint_id": "A-G16-CONSTRAINT-02",
      "description": "Do not invent urgency or priority without supporting returned data."
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
      "dataset_label": "synthesis_data",
      "artifact_path": "Docs/evaluation_v2/Runs/phase6_evidence/full_query_artifacts/SAMPLE_OULAD__A-G16__baseline_first_20_rows.json",
      "artifact_sha256": "50ecfdec4956e64d28ee4a247068720d2f402e0d69a3529946b2f73b6d9fd4f2",
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
  "evidence_artifact_file_sha256": "50ecfdec4956e64d28ee4a247068720d2f402e0d69a3529946b2f73b6d9fd4f2",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_baseline/explanation_artifacts/SAMPLE_OULAD__A-G16__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "a77b48258f442c9824a328cdf7d383a0c8164a21cdbfe7aa492e8fe881749ddc",
  "generator_input_sha256": "a42e82ee700f6be003a66185c89528fc078d8bac85ebe568b584f5564ff134a6",
  "generator_input_compact": {
    "task_id": "A-G16",
    "execution_id": "exec_1781820449522_509d1543",
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
  "raw_text": "Summary: The action plan is informed by a total student count of 1998, with a significant low engagement count of 1240 and a high-risk count of 906. These metrics indicate a pressing need for targeted outreach and engagement efforts, particularly around the hardest assessment and the most effective resource type identified.\n\nInsights: Why priority outreach is Step 1: The high low engagement count of 1240 suggests that a substantial portion of students may not be actively participating, necessitating immediate outreach to re-engage them. | Why engagement is Step 2: With 906 students identified as high risk, enhancing engagement strategies is critical to mitigate potential failures and support at-risk learners. | Why assessment support is Step 3: The hardest assessment identified (24299) indicates a need for additional support mechanisms to help students navigate challenging content effectively. | Why resource nudges are Step 4: The best resource type being quizzes suggests that leveraging this format can enhance student learning and retention, warranting nudges towards these resources.",
  "structured_payload": {
    "task_id": "A-G16",
    "execution_id": "exec_1781820449522_509d1543",
    "explanation": {
      "summary": "The action plan is informed by a total student count of 1998, with a significant low engagement count of 1240 and a high-risk count of 906. These metrics indicate a pressing need for targeted outreach and engagement efforts, particularly around the hardest assessment and the most effective resource type identified.",
      "insights": [
        {
          "title": "Why priority outreach is Step 1",
          "description": "The high low engagement count of 1240 suggests that a substantial portion of students may not be actively participating, necessitating immediate outreach to re-engage them.",
          "severity": "high",
          "evidence": [
            {
              "metric": "low_engagement_count",
              "value": 1240,
              "comparison": "baseline",
              "delta": null,
              "context": "Out of 1998 total students"
            }
          ]
        },
        {
          "title": "Why engagement is Step 2",
          "description": "With 906 students identified as high risk, enhancing engagement strategies is critical to mitigate potential failures and support at-risk learners.",
          "severity": "high",
          "evidence": [
            {
              "metric": "high_risk_count",
              "value": 906,
              "comparison": "baseline",
              "delta": null,
              "context": "High-risk students represent a significant portion of the cohort"
            }
          ]
        },
        {
          "title": "Why assessment support is Step 3",
          "description": "The hardest assessment identified (24299) indicates a need for additional support mechanisms to help students navigate challenging content effectively.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "hardest_assessment",
              "value": "24299",
              "comparison": "baseline",
              "delta": null,
              "context": "Identified as a key challenge for students"
            }
          ]
        },
        {
          "title": "Why resource nudges are Step 4",
          "description": "The best resource type being quizzes suggests that leveraging this format can enhance student learning and retention, warranting nudges towards these resources.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "best_resource_type",
              "value": "quiz",
              "comparison": "baseline",
              "delta": null,
              "context": "Quizzes are identified as effective learning tools"
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
      "reason": "Data is complete and directly relevant to the cohort's performance metrics.",
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
      "latency_ms": 8303,
      "token_usage": {
        "prompt_tokens": 880,
        "completion_tokens": 581,
        "total_tokens": 1461
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000481
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_baseline/explanation_artifacts/SAMPLE_OULAD__A-G16__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "a77b48258f442c9824a328cdf7d383a0c8164a21cdbfe7aa492e8fe881749ddc",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 880,
      "completion_tokens": 581,
      "total_tokens": 1461
    },
    "latency_ms": 8318,
    "attempts_used": null
  },
  "source_response_body": {
    "task_id": "A-G16",
    "execution_id": "exec_1781820449522_509d1543",
    "explanation": {
      "summary": "The action plan is informed by a total student count of 1998, with a significant low engagement count of 1240 and a high-risk count of 906. These metrics indicate a pressing need for targeted outreach and engagement efforts, particularly around the hardest assessment and the most effective resource type identified.",
      "insights": [
        {
          "title": "Why priority outreach is Step 1",
          "description": "The high low engagement count of 1240 suggests that a substantial portion of students may not be actively participating, necessitating immediate outreach to re-engage them.",
          "severity": "high",
          "evidence": [
            {
              "metric": "low_engagement_count",
              "value": 1240,
              "comparison": "baseline",
              "delta": null,
              "context": "Out of 1998 total students"
            }
          ]
        },
        {
          "title": "Why engagement is Step 2",
          "description": "With 906 students identified as high risk, enhancing engagement strategies is critical to mitigate potential failures and support at-risk learners.",
          "severity": "high",
          "evidence": [
            {
              "metric": "high_risk_count",
              "value": 906,
              "comparison": "baseline",
              "delta": null,
              "context": "High-risk students represent a significant portion of the cohort"
            }
          ]
        },
        {
          "title": "Why assessment support is Step 3",
          "description": "The hardest assessment identified (24299) indicates a need for additional support mechanisms to help students navigate challenging content effectively.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "hardest_assessment",
              "value": "24299",
              "comparison": "baseline",
              "delta": null,
              "context": "Identified as a key challenge for students"
            }
          ]
        },
        {
          "title": "Why resource nudges are Step 4",
          "description": "The best resource type being quizzes suggests that leveraging this format can enhance student learning and retention, warranting nudges towards these resources.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "best_resource_type",
              "value": "quiz",
              "comparison": "baseline",
              "delta": null,
              "context": "Quizzes are identified as effective learning tools"
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
      "reason": "Data is complete and directly relevant to the cohort's performance metrics.",
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
      "latency_ms": 8303,
      "token_usage": {
        "prompt_tokens": 880,
        "completion_tokens": 581,
        "total_tokens": 1461
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000481
    }
  }
}
```

## Pilot-Minimal Deterministic Checks

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
    "observed": "50ecfdec4956e64d28ee4a247068720d2f402e0d69a3529946b2f73b6d9fd4f2",
    "expected_values": [
      "50ecfdec4956e64d28ee4a247068720d2f402e0d69a3529946b2f73b6d9fd4f2"
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
