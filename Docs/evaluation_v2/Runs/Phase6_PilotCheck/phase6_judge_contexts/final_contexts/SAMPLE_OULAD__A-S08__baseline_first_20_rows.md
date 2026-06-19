# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-S08__baseline_first_20_rows

This Phase 6.4b context is the record-level evidence package to supply with the frozen Judge Prompt V2 during pilot judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-S08__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_pilot_phase6_4",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-S08",
  "explanation_mode": "baseline_first_20_rows",
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
      "description": "Synthesise all [FE] signals into 3–5 admin actions ranked by urgency."
    },
    {
      "requirement_id": "A-S08-CORE-02",
      "description": "Specify who should act (tutor / admin / counsellor) and by when."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-S08-CONSTRAINT-01",
      "description": "Every proposed action and urgency level must reference returned feature-engineered signals."
    },
    {
      "constraint_id": "A-S08-CONSTRAINT-02",
      "description": "Do not invent urgency that is not supported by returned signals."
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
      "artifact_path": "Docs/evaluation_v2/Runs/phase6_evidence/full_query_artifacts/SAMPLE_OULAD__A-S08__baseline_first_20_rows.json",
      "artifact_sha256": "efe821abcefa385f3ba92954d9c236e50c53213524c852f11afcfdbc30da2b0a",
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
  "evidence_artifact_file_sha256": "efe821abcefa385f3ba92954d9c236e50c53213524c852f11afcfdbc30da2b0a",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_baseline/explanation_artifacts/SAMPLE_OULAD__A-S08__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "06296047cd795a47bfff39693d64c1bdaf0e09fdc7e827e1e7ce7cbbc16b798a",
  "generator_input_sha256": "b123b22d382c95c19537f2b95ad8d8f8ce2bd90568d176b142c8f99868757ae9",
  "generator_input_compact": {
    "task_id": "A-S08",
    "execution_id": "exec_1781820469314_8bdf275d",
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
  "raw_text": "Summary: The student exhibits a high at-risk score despite achieving a distinction, indicating potential underlying issues that may affect future performance. Key risk indicators include a declining performance trend and low engagement score.\n\nInsights: Declining Performance Trend: The student's performance trend shows a significant decline of -0.71875, suggesting a downward trajectory in academic performance. | Low Engagement Score: The engagement score of 0.2024 is notably low, which may correlate with the declining performance and indicates a lack of active participation.",
  "structured_payload": {
    "task_id": "A-S08",
    "execution_id": "exec_1781820469314_8bdf275d",
    "explanation": {
      "summary": "The student exhibits a high at-risk score despite achieving a distinction, indicating potential underlying issues that may affect future performance. Key risk indicators include a declining performance trend and low engagement score.",
      "insights": [
        {
          "title": "Declining Performance Trend",
          "description": "The student's performance trend shows a significant decline of -0.71875, suggesting a downward trajectory in academic performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "down_from_previous",
              "delta": -0.71875,
              "context": "Indicates a concerning drop in performance over time."
            }
          ]
        },
        {
          "title": "Low Engagement Score",
          "description": "The engagement score of 0.2024 is notably low, which may correlate with the declining performance and indicates a lack of active participation.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0.20237855036820618,
              "comparison": "baseline",
              "delta": null,
              "context": "Low engagement may hinder academic success."
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
      "reason": "Data is complete and reflects current performance metrics.",
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
      "latency_ms": 6326,
      "token_usage": {
        "prompt_tokens": 641,
        "completion_tokens": 487,
        "total_tokens": 1128
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000388
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/phase6_explanations_baseline/explanation_artifacts/SAMPLE_OULAD__A-S08__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "06296047cd795a47bfff39693d64c1bdaf0e09fdc7e827e1e7ce7cbbc16b798a",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 641,
      "completion_tokens": 487,
      "total_tokens": 1128
    },
    "latency_ms": 6331,
    "attempts_used": null
  },
  "source_response_body": {
    "task_id": "A-S08",
    "execution_id": "exec_1781820469314_8bdf275d",
    "explanation": {
      "summary": "The student exhibits a high at-risk score despite achieving a distinction, indicating potential underlying issues that may affect future performance. Key risk indicators include a declining performance trend and low engagement score.",
      "insights": [
        {
          "title": "Declining Performance Trend",
          "description": "The student's performance trend shows a significant decline of -0.71875, suggesting a downward trajectory in academic performance.",
          "severity": "high",
          "evidence": [
            {
              "metric": "performance_trend",
              "value": -0.71875,
              "comparison": "down_from_previous",
              "delta": -0.71875,
              "context": "Indicates a concerning drop in performance over time."
            }
          ]
        },
        {
          "title": "Low Engagement Score",
          "description": "The engagement score of 0.2024 is notably low, which may correlate with the declining performance and indicates a lack of active participation.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0.20237855036820618,
              "comparison": "baseline",
              "delta": null,
              "context": "Low engagement may hinder academic success."
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
      "reason": "Data is complete and reflects current performance metrics.",
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
      "latency_ms": 6326,
      "token_usage": {
        "prompt_tokens": 641,
        "completion_tokens": 487,
        "total_tokens": 1128
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000388
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
    "observed": "efe821abcefa385f3ba92954d9c236e50c53213524c852f11afcfdbc30da2b0a",
    "expected_values": [
      "efe821abcefa385f3ba92954d9c236e50c53213524c852f11afcfdbc30da2b0a"
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
