# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G16__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G16__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G16",
  "explanation_mode": "task_aware_data_summarization",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G16__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "878c841d3dc6da39c8658bb0b97ead7110af2c1ce1c8115f55d8c53f37f48b65",
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
  "raw_text": "Summary: The prioritized actions focus on addressing student engagement and risk through targeted outreach and support reviews. These actions are informed by derived engagement and risk rates, ensuring a data-driven approach to student support.\n\nInsights: High Engagement Outreach Needed: The derived low engagement rate is 0.6206, indicating a significant portion of students may require additional support. Coordinating a targeted engagement outreach is essential to identify and address potential barriers. | High-Risk Student Caseload Review: With a derived high-risk rate of 0.4535, reviewing the high-risk student caseload is critical to ensure that students needing direct support are identified and assigned follow-up owners.",
  "structured_payload": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847803029_391203b0",
    "explanation": {
      "summary": "The prioritized actions focus on addressing student engagement and risk through targeted outreach and support reviews. These actions are informed by derived engagement and risk rates, ensuring a data-driven approach to student support.",
      "insights": [
        {
          "title": "High Engagement Outreach Needed",
          "description": "The derived low engagement rate is 0.6206, indicating a significant portion of students may require additional support. Coordinating a targeted engagement outreach is essential to identify and address potential barriers.",
          "severity": "high",
          "evidence": [
            {
              "metric": "low_engagement_rate",
              "value": 0.6206,
              "comparison": "baseline",
              "delta": null,
              "context": "Derived from low engagement count and total students."
            }
          ]
        },
        {
          "title": "High-Risk Student Caseload Review",
          "description": "With a derived high-risk rate of 0.4535, reviewing the high-risk student caseload is critical to ensure that students needing direct support are identified and assigned follow-up owners.",
          "severity": "high",
          "evidence": [
            {
              "metric": "high_risk_rate",
              "value": 0.4535,
              "comparison": "baseline",
              "delta": null,
              "context": "Derived from high risk count and total students."
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
      "reason": "The evidence used is derived from reliable data sources and is complete.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "action_synthesis",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "synthesis_data",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 63,
    "task_aware_prompt_tokens": 939,
    "token_ratio": 14.9048,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.unsupported_actions",
      "action_evidence.action_evidence_links",
      "action_evidence.prioritized_actions",
      "comparison.conflicting_evidence",
      "primary_finding.rule_evaluations"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (14.9048 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5222,
      "token_usage": {
        "prompt_tokens": 2925,
        "completion_tokens": 359,
        "total_tokens": 3284
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000654
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G16__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "878c841d3dc6da39c8658bb0b97ead7110af2c1ce1c8115f55d8c53f37f48b65",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2925,
      "completion_tokens": 359,
      "total_tokens": 3284
    },
    "latency_ms": 5226,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847803029_391203b0",
    "explanation": {
      "summary": "The prioritized actions focus on addressing student engagement and risk through targeted outreach and support reviews. These actions are informed by derived engagement and risk rates, ensuring a data-driven approach to student support.",
      "insights": [
        {
          "title": "High Engagement Outreach Needed",
          "description": "The derived low engagement rate is 0.6206, indicating a significant portion of students may require additional support. Coordinating a targeted engagement outreach is essential to identify and address potential barriers.",
          "severity": "high",
          "evidence": [
            {
              "metric": "low_engagement_rate",
              "value": 0.6206,
              "comparison": "baseline",
              "delta": null,
              "context": "Derived from low engagement count and total students."
            }
          ]
        },
        {
          "title": "High-Risk Student Caseload Review",
          "description": "With a derived high-risk rate of 0.4535, reviewing the high-risk student caseload is critical to ensure that students needing direct support are identified and assigned follow-up owners.",
          "severity": "high",
          "evidence": [
            {
              "metric": "high_risk_rate",
              "value": 0.4535,
              "comparison": "baseline",
              "delta": null,
              "context": "Derived from high risk count and total students."
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
      "reason": "The evidence used is derived from reliable data sources and is complete.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "action_synthesis",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "synthesis_data",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 1,
    "baseline_reference_tokens": 63,
    "task_aware_prompt_tokens": 939,
    "token_ratio": 14.9048,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.unsupported_actions",
      "action_evidence.action_evidence_links",
      "action_evidence.prioritized_actions",
      "comparison.conflicting_evidence",
      "primary_finding.rule_evaluations"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (14.9048 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5222,
      "token_usage": {
        "prompt_tokens": 2925,
        "completion_tokens": 359,
        "total_tokens": 3284
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000654
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
