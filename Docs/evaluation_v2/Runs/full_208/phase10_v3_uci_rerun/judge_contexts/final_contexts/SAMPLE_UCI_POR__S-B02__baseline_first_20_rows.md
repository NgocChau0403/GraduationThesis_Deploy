# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-B02__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-B02__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-B02",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
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

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "risk_summary",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-B02.json",
      "artifact_sha256": "ec9037ce8da01b1418ceee4b69bd1beb1426f9daa6527047f4a95a5ff7f32724",
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
  "evidence_artifact_file_sha256": "ec9037ce8da01b1418ceee4b69bd1beb1426f9daa6527047f4a95a5ff7f32724",
  "evidence_rows_sha256": "1a485de427c24e8c2fb0104a457969ec012bf0939bd3e2ba3be0de413c1deb2f",
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
  "embedded_datasets_sha256": "1a485de427c24e8c2fb0104a457969ec012bf0939bd3e2ba3be0de413c1deb2f",
  "datasets": {
    "risk_summary": [
      {
        "avg_score": 41.25,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 0,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "at_risk_score": 1,
        "at_risk_label": "low"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-B02__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "8a1c6cda120a36c24def8e9a65342a6cdb7bee350e7f06c5464b02caa0bbab60",
  "generator_input_sha256": "2706717c4b6c19810c63ff19acead7d4e31cfd04c3074d76200bdd8eae47da8f",
  "generator_input_compact": {
    "task_id": "S-B02",
    "execution_id": "exec_1781847241689_5f06f657",
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
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
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
  "raw_text": "Summary: You are currently identified as having a low risk of failing, with an at-risk score of 1 out of 5. Your average score is 41.25, which is above the pass threshold of 40, indicating that you are performing adequately.\n\nInsights: Engagement Score: Your engagement score is currently at 0, which suggests a lack of participation in activities that could enhance your learning experience. | Punctuality Rate: Your punctuality rate is at 1, indicating that there may be challenges with attending classes or submitting assignments on time.\n\nEducational implications: Improving engagement and punctuality can significantly enhance your learning outcomes.\n\nRecommendations: high - Participate in class activities and discussions. - Increased engagement can help you understand the material better and improve your overall performance. | medium - Establish a routine to improve punctuality. - Being on time for classes and assignments can help you stay on track and reduce stress.",
  "structured_payload": {
    "task_id": "S-B02",
    "execution_id": "exec_1781847241689_5f06f657",
    "explanation": {
      "summary": "You are currently identified as having a low risk of failing, with an at-risk score of 1 out of 5. Your average score is 41.25, which is above the pass threshold of 40, indicating that you are performing adequately.",
      "insights": [
        {
          "title": "Engagement Score",
          "description": "Your engagement score is currently at 0, which suggests a lack of participation in activities that could enhance your learning experience.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "No engagement score available"
            }
          ]
        },
        {
          "title": "Punctuality Rate",
          "description": "Your punctuality rate is at 1, indicating that there may be challenges with attending classes or submitting assignments on time.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Low punctuality rate"
            }
          ]
        }
      ],
      "educational_implications": [
        "Improving engagement and punctuality can significantly enhance your learning outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Participate in class activities and discussions.",
          "rationale": "Increased engagement can help you understand the material better and improve your overall performance."
        },
        {
          "priority": "medium",
          "action": "Establish a routine to improve punctuality.",
          "rationale": "Being on time for classes and assignments can help you stay on track and reduce stress."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is clear and directly related to your performance metrics.",
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
      "latency_ms": 8750,
      "token_usage": {
        "prompt_tokens": 665,
        "completion_tokens": 439,
        "total_tokens": 1104
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000363
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-B02__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "8a1c6cda120a36c24def8e9a65342a6cdb7bee350e7f06c5464b02caa0bbab60",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 665,
      "completion_tokens": 439,
      "total_tokens": 1104
    },
    "latency_ms": 8754,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-B02",
    "execution_id": "exec_1781847241689_5f06f657",
    "explanation": {
      "summary": "You are currently identified as having a low risk of failing, with an at-risk score of 1 out of 5. Your average score is 41.25, which is above the pass threshold of 40, indicating that you are performing adequately.",
      "insights": [
        {
          "title": "Engagement Score",
          "description": "Your engagement score is currently at 0, which suggests a lack of participation in activities that could enhance your learning experience.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "No engagement score available"
            }
          ]
        },
        {
          "title": "Punctuality Rate",
          "description": "Your punctuality rate is at 1, indicating that there may be challenges with attending classes or submitting assignments on time.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Low punctuality rate"
            }
          ]
        }
      ],
      "educational_implications": [
        "Improving engagement and punctuality can significantly enhance your learning outcomes."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Participate in class activities and discussions.",
          "rationale": "Increased engagement can help you understand the material better and improve your overall performance."
        },
        {
          "priority": "medium",
          "action": "Establish a routine to improve punctuality.",
          "rationale": "Being on time for classes and assignments can help you stay on track and reduce stress."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data provided is clear and directly related to your performance metrics.",
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
      "latency_ms": 8750,
      "token_usage": {
        "prompt_tokens": 665,
        "completion_tokens": 439,
        "total_tokens": 1104
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000363
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
    "observed": "ec9037ce8da01b1418ceee4b69bd1beb1426f9daa6527047f4a95a5ff7f32724",
    "expected_values": [
      "ec9037ce8da01b1418ceee4b69bd1beb1426f9daa6527047f4a95a5ff7f32724"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "1a485de427c24e8c2fb0104a457969ec012bf0939bd3e2ba3be0de413c1deb2f",
    "expected": "1a485de427c24e8c2fb0104a457969ec012bf0939bd3e2ba3be0de413c1deb2f"
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
        "min": 1,
        "max": 1
      },
      "avg_score": {
        "count": 1,
        "min": 41.25,
        "max": 41.25
      },
      "engagement_score": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "pass_threshold": {
        "count": 1,
        "min": 40,
        "max": 40
      },
      "previous_attempt_count": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "punctuality_rate": {
        "count": 1,
        "min": 1,
        "max": 1
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
