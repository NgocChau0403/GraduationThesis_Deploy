# LLM Judge Final Judge Context - SAMPLE_OULAD__S-B02__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-B02__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-B02",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Risk status card",
  "scope": "1 student",
  "actionable_question": "Am I at risk of failing?",
  "target_audience": "student",
  "ai_summary_type": "metric_snapshot",
  "ai_prompt_hint": "State the risk badge (low/medium/high) and at_risk_score out of 5. Use avg_score, pass_threshold, engagement_score, and punctuality_rate when available. If risk is high, name the top 2 likely triggered factors from returned metrics only.",
  "query_labels": [
    "risk_summary"
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
    "at_risk_score [FE]",
    "at_risk_label [FE]; punctuality_rate [FE cross] (OULAD: submission_day/due_day; UCI: 1−absences_rate)"
  ],
  "output_schema": {
    "required_columns": [
      "avg_score",
      "at_risk_score",
      "at_risk_label"
    ],
    "optional_columns": [
      "engagement_score",
      "engagement_score_available",
      "punctuality_rate",
      "previous_attempt_count",
      "score_strategy",
      "score_scale",
      "pass_threshold",
      "target_threshold"
    ]
  },
  "query_labels": [
    "risk_summary"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-B02-CORE-01",
      "description": "State the risk badge (low/medium/high) and at_risk_score out of 5."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "S-B02-SUPPORT-01",
      "description": "Use avg_score, pass_threshold, engagement_score, and punctuality_rate when available."
    },
    {
      "requirement_id": "S-B02-SUPPORT-02",
      "description": "If risk is high, name the top 2 likely triggered factors from returned metrics only."
    }
  ],
  "evaluation_constraints": [],
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
      "dataset_label": "risk_summary",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-B02.json",
      "artifact_sha256": "c23bd0d1b26a55e95142a9decd7fe4d429263519bdb5fb7ff689e284a0912f4f",
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
  "evidence_artifact_file_sha256": "c23bd0d1b26a55e95142a9decd7fe4d429263519bdb5fb7ff689e284a0912f4f",
  "evidence_rows_sha256": "67376816be15879f37814086f5600cb56dd41f7a30168794cf7f64308e09fb5d",
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
  "embedded_datasets_sha256": "67376816be15879f37814086f5600cb56dd41f7a30168794cf7f64308e09fb5d",
  "datasets": {
    "risk_summary": [
      {
        "avg_score": 94.34,
        "engagement_score": 0.20237855036820618,
        "engagement_score_available": true,
        "punctuality_rate": 0,
        "previous_attempt_count": 1,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "at_risk_score": 3,
        "at_risk_label": "high"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-B02__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "a9a06690bfd56c3ffdde927a0d517d5d119011debd219fb877eeb3ffccfa31aa",
  "generator_input_sha256": "0ba5edceb145743582a1807bdcc4d87cc10678350e3f6405bbac6dbb9fa178f7",
  "generator_input_compact": {
    "task_id": "S-B02",
    "execution_id": "exec_1781847857491_7eb409b0",
    "task_name": "Risk status card",
    "analysis_type": "aggregation",
    "explanation_strategy": "risk",
    "actionable_question": "Am I at risk of failing?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "risk_summary"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "risk_summary"
    ],
    "dataset_row_counts": {
      "risk_summary": 1
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
      "require_sensitive_context_policy": false,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: You are currently identified as being at high risk of failing, with an at-risk score of 3 out of 5. This is primarily due to your low engagement score and punctuality rate.\n\nInsights: Low Engagement Score: Your engagement score is quite low, indicating that you may not be participating fully in your learning activities. | Punctuality Rate: Your punctuality rate is at 0, which means you may be missing classes or deadlines, further impacting your learning.\n\nEducational implications: Improving engagement and attendance can significantly enhance your learning outcomes.\n\nRecommendations: high - Increase participation in class activities and discussions. - Engaging more with the material can help improve your understanding and scores. | high - Establish a routine to ensure timely attendance and submission of assignments. - Being punctual can help you stay on track and reduce the risk of falling behind.",
  "structured_payload": {
    "task_id": "S-B02",
    "execution_id": "exec_1781847857491_7eb409b0",
    "explanation": {
      "summary": "You are currently identified as being at high risk of failing, with an at-risk score of 3 out of 5. This is primarily due to your low engagement score and punctuality rate.",
      "insights": [
        {
          "title": "Low Engagement Score",
          "description": "Your engagement score is quite low, indicating that you may not be participating fully in your learning activities.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0.20237855036820618,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "This score suggests limited interaction with course materials."
            }
          ]
        },
        {
          "title": "Punctuality Rate",
          "description": "Your punctuality rate is at 0, which means you may be missing classes or deadlines, further impacting your learning.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Missing classes can lead to gaps in understanding and performance."
            }
          ]
        }
      ],
      "educational_implications": [
        "Improving engagement and attendance can significantly enhance your learning outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Increase participation in class activities and discussions.",
          "rationale": "Engaging more with the material can help improve your understanding and scores."
        },
        {
          "priority": "high",
          "action": "Establish a routine to ensure timely attendance and submission of assignments.",
          "rationale": "Being punctual can help you stay on track and reduce the risk of falling behind."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is clear and indicates significant risk factors.",
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
      "latency_ms": 6739,
      "token_usage": {
        "prompt_tokens": 672,
        "completion_tokens": 440,
        "total_tokens": 1112
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000365
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-B02__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "a9a06690bfd56c3ffdde927a0d517d5d119011debd219fb877eeb3ffccfa31aa",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 672,
      "completion_tokens": 440,
      "total_tokens": 1112
    },
    "latency_ms": 6741,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-B02",
    "execution_id": "exec_1781847857491_7eb409b0",
    "explanation": {
      "summary": "You are currently identified as being at high risk of failing, with an at-risk score of 3 out of 5. This is primarily due to your low engagement score and punctuality rate.",
      "insights": [
        {
          "title": "Low Engagement Score",
          "description": "Your engagement score is quite low, indicating that you may not be participating fully in your learning activities.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0.20237855036820618,
              "comparison": "down_from_previous",
              "delta": null,
              "context": "This score suggests limited interaction with course materials."
            }
          ]
        },
        {
          "title": "Punctuality Rate",
          "description": "Your punctuality rate is at 0, which means you may be missing classes or deadlines, further impacting your learning.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Missing classes can lead to gaps in understanding and performance."
            }
          ]
        }
      ],
      "educational_implications": [
        "Improving engagement and attendance can significantly enhance your learning outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Increase participation in class activities and discussions.",
          "rationale": "Engaging more with the material can help improve your understanding and scores."
        },
        {
          "priority": "high",
          "action": "Establish a routine to ensure timely attendance and submission of assignments.",
          "rationale": "Being punctual can help you stay on track and reduce the risk of falling behind."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is clear and indicates significant risk factors.",
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
      "latency_ms": 6739,
      "token_usage": {
        "prompt_tokens": 672,
        "completion_tokens": 440,
        "total_tokens": 1112
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000365
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
    "observed": "c23bd0d1b26a55e95142a9decd7fe4d429263519bdb5fb7ff689e284a0912f4f",
    "expected_values": [
      "c23bd0d1b26a55e95142a9decd7fe4d429263519bdb5fb7ff689e284a0912f4f"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "67376816be15879f37814086f5600cb56dd41f7a30168794cf7f64308e09fb5d",
    "expected": "67376816be15879f37814086f5600cb56dd41f7a30168794cf7f64308e09fb5d"
  },
  {
    "check_id": "numeric_fields_risk_summary",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "risk_summary",
    "numeric_columns": [
      "at_risk_score",
      "avg_score",
      "engagement_score",
      "pass_threshold",
      "previous_attempt_count",
      "punctuality_rate",
      "score_scale",
      "target_threshold"
    ],
    "numeric_summaries": {
      "at_risk_score": {
        "count": 1,
        "min": 3,
        "max": 3
      },
      "avg_score": {
        "count": 1,
        "min": 94.34,
        "max": 94.34
      },
      "engagement_score": {
        "count": 1,
        "min": 0.20237855036820618,
        "max": 0.20237855036820618
      },
      "pass_threshold": {
        "count": 1,
        "min": 40,
        "max": 40
      },
      "previous_attempt_count": {
        "count": 1,
        "min": 1,
        "max": 1
      },
      "punctuality_rate": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "score_scale": {
        "count": 1,
        "min": 100,
        "max": 100
      },
      "target_threshold": {
        "count": 1,
        "min": 70,
        "max": 70
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_risk_summary",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "risk_summary",
    "flag_columns": [
      "pass_threshold",
      "target_threshold",
      "at_risk_score",
      "at_risk_label"
    ],
    "triggered_like_counts": {
      "pass_threshold": 0,
      "target_threshold": 0,
      "at_risk_score": 0,
      "at_risk_label": 0
    }
  }
]
```
