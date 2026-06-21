# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S08__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-S08__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-S08",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Student intervention recommendation",
  "scope": "1 student",
  "actionable_question": "What should admin do for this student in the next 7 days?",
  "target_audience": "academic_advisor, admin",
  "ai_summary_type": "action_synthesis",
  "ai_prompt_hint": "Synthesise all [FE] signals into 3–5 admin actions ranked by urgency. Specify who should act (tutor / admin / counsellor) and by when.",
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
    "student",
    "assessment_result",
    "assessment",
    "engagement"
  ],
  "key_db_fields": [
    "[AI_SYNTHESIS] avg_score [FE cross]",
    "at_risk_score [FE cross]",
    "engagement_score [FE cross]",
    "punctuality_rate [FE cross]",
    "performance_trend [FE cross]",
    "early_warning_week [FE cross]",
    "support_score [FE single]"
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
      "requirement_id": "A-S08-CORE-01",
      "description": "Explain the supported admin actions already generated or exposed by the action_synthesis rule contract and rank/describe them by urgency when priority evidence is supplied."
    },
    {
      "requirement_id": "A-S08-CORE-02",
      "description": "For each supported admin action that is present, specify who should act and by when when owner/time-horizon evidence is supplied."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-S08-CONSTRAINT-01",
      "description": "Every explained or proposed action and urgency level must reference returned feature-engineered signals or the supplied action-rule contract."
    },
    {
      "constraint_id": "A-S08-CONSTRAINT-02",
      "description": "Do not invent urgency, owner, time horizon, or additional actions that are not supported by returned signals or supported action evidence."
    },
    {
      "constraint_id": "A-S08-CONSTRAINT-03",
      "description": "If no supported admin action is returned or triggered, saying no supported action is available is acceptable; penalize that only when deterministic action evidence shows at least one supported action exists."
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-S08.json",
      "artifact_sha256": "da7abbfd42c0ba32917b47065606de8a89e37c839454984b9beece5f80486d94",
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
  "evidence_artifact_file_sha256": "da7abbfd42c0ba32917b47065606de8a89e37c839454984b9beece5f80486d94",
  "evidence_rows_sha256": "459b368ca8b9b4b70ca088635eb5028dfcdfc702ea6d46aefb1ef3ac7e9ebf78",
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
  "embedded_datasets_sha256": "459b368ca8b9b4b70ca088635eb5028dfcdfc702ea6d46aefb1ef3ac7e9ebf78",
  "datasets": {
    "synthesis_data": [
      {
        "avg_score": 91.2,
        "performance_trend": -0.7187500000000001,
        "engagement_score": 0.20237855036820618,
        "punctuality_rate": "0",
        "early_warning_week": 0,
        "support_score": 0,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "final_outcome": "Distinction"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S08__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "644752c4f12ef95092d48aa89512d520821bf0585b7e1b12ea95363622d4b105",
  "generator_input_sha256": "9e64e3766ade560a61ec1eb5d509c684b5500606b13caeb0e4aa9329e38308fe",
  "generator_input_compact": {
    "task_id": "A-S08",
    "execution_id": "exec_1781847835786_81e0a67f",
    "task_name": "Student intervention recommendation",
    "analysis_type": "synthesis",
    "explanation_strategy": "risk",
    "actionable_question": "What should admin do for this student in the next 7 days?",
    "target_audience": [
      "academic_advisor",
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
  "raw_text": "Summary: The prioritized actions aim to address the student's academic risk and submission challenges through targeted interventions. Each action is supported by specific evidence to ensure a structured approach to student support.\n\nInsights: High Risk Profile Identified: The student has a high at-risk label with a composite risk score of 3, indicating significant academic concerns that necessitate immediate attention. | Submission Support Required: The student's punctuality rate is recorded at 0, indicating a lack of timely submissions, which necessitates the creation of a submission support plan. | Assessment Performance Trend: The student's performance trend shows a negative slope of -0.71875, suggesting a decline in assessment performance that requires review and follow-up.\n\nWarnings: Conflicting evidence is preserved; actions must be phrased with uncertainty and must not hide this conflict.",
  "structured_payload": {
    "task_id": "A-S08",
    "execution_id": "exec_1781847835786_81e0a67f",
    "explanation": {
      "summary": "The prioritized actions aim to address the student's academic risk and submission challenges through targeted interventions. Each action is supported by specific evidence to ensure a structured approach to student support.",
      "insights": [
        {
          "title": "High Risk Profile Identified",
          "description": "The student has a high at-risk label with a composite risk score of 3, indicating significant academic concerns that necessitate immediate attention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "The student is categorized as high risk."
            },
            {
              "metric": "at_risk_label",
              "value": "high",
              "comparison": "baseline",
              "delta": null,
              "context": "The risk label confirms the need for intervention."
            }
          ]
        },
        {
          "title": "Submission Support Required",
          "description": "The student's punctuality rate is recorded at 0, indicating a lack of timely submissions, which necessitates the creation of a submission support plan.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "baseline",
              "delta": null,
              "context": "This value indicates no timely submissions."
            }
          ]
        },
        {
          "title": "Assessment Performance Trend",
          "description": "The student's performance trend shows a negative slope of -0.71875, suggesting a decline in assessment performance that requires review and follow-up.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "baseline",
              "delta": null,
              "context": "This trend indicates a potential decline in academic performance."
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": [
        "Conflicting evidence is preserved; actions must be phrased with uncertainty and must not hide this conflict."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The evidence used to support the actions is complete and directly linked to the identified risks and needs of the student.",
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
    "baseline_reference_tokens": 82,
    "task_aware_prompt_tokens": 968,
    "token_ratio": 11.8049,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (11.8049 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 11004,
      "token_usage": {
        "prompt_tokens": 2793,
        "completion_tokens": 518,
        "total_tokens": 3311
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.00073
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S08__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "644752c4f12ef95092d48aa89512d520821bf0585b7e1b12ea95363622d4b105",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2793,
      "completion_tokens": 518,
      "total_tokens": 3311
    },
    "latency_ms": 11008,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S08",
    "execution_id": "exec_1781847835786_81e0a67f",
    "explanation": {
      "summary": "The prioritized actions aim to address the student's academic risk and submission challenges through targeted interventions. Each action is supported by specific evidence to ensure a structured approach to student support.",
      "insights": [
        {
          "title": "High Risk Profile Identified",
          "description": "The student has a high at-risk label with a composite risk score of 3, indicating significant academic concerns that necessitate immediate attention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 3,
              "comparison": "baseline",
              "delta": null,
              "context": "The student is categorized as high risk."
            },
            {
              "metric": "at_risk_label",
              "value": "high",
              "comparison": "baseline",
              "delta": null,
              "context": "The risk label confirms the need for intervention."
            }
          ]
        },
        {
          "title": "Submission Support Required",
          "description": "The student's punctuality rate is recorded at 0, indicating a lack of timely submissions, which necessitates the creation of a submission support plan.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "baseline",
              "delta": null,
              "context": "This value indicates no timely submissions."
            }
          ]
        },
        {
          "title": "Assessment Performance Trend",
          "description": "The student's performance trend shows a negative slope of -0.71875, suggesting a decline in assessment performance that requires review and follow-up.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "baseline",
              "delta": null,
              "context": "This trend indicates a potential decline in academic performance."
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": [
        "Conflicting evidence is preserved; actions must be phrased with uncertainty and must not hide this conflict."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The evidence used to support the actions is complete and directly linked to the identified risks and needs of the student.",
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
    "baseline_reference_tokens": 82,
    "task_aware_prompt_tokens": 968,
    "token_ratio": 11.8049,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (11.8049 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 11004,
      "token_usage": {
        "prompt_tokens": 2793,
        "completion_tokens": 518,
        "total_tokens": 3311
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.00073
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
    "observed": "da7abbfd42c0ba32917b47065606de8a89e37c839454984b9beece5f80486d94",
    "expected_values": [
      "da7abbfd42c0ba32917b47065606de8a89e37c839454984b9beece5f80486d94"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "459b368ca8b9b4b70ca088635eb5028dfcdfc702ea6d46aefb1ef3ac7e9ebf78",
    "expected": "459b368ca8b9b4b70ca088635eb5028dfcdfc702ea6d46aefb1ef3ac7e9ebf78"
  },
  {
    "check_id": "numeric_fields_synthesis_data",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "numeric_columns": [
      "at_risk_score",
      "avg_score",
      "early_warning_week",
      "engagement_score",
      "performance_trend",
      "support_score"
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
      "early_warning_week": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "engagement_score": {
        "count": 1,
        "min": 0.20237855036820618,
        "max": 0.20237855036820618
      },
      "performance_trend": {
        "count": 1,
        "min": -0.7187500000000001,
        "max": -0.7187500000000001
      },
      "support_score": {
        "count": 1,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_synthesis_data",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "synthesis_data",
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
