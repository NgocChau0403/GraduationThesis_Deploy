# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T08__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T08__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T08",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Assessment lateness impact",
  "scope": "1 student",
  "actionable_question": "Does submitting late actually lower my score?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Use submission_delay_avg [FE] and punctuality_rate [FE]. Explain how delay magnitude correlates with score drop.",
  "query_labels": [
    "submission_lateness"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
    "assessment_result",
    "assessment [OULAD only]"
  ],
  "key_db_fields": [
    "submission_delay_days",
    "score_normalized",
    "assessment_type; submission_delay_avg [FE cross]",
    "punctuality_rate [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "submission_lateness"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T08-CORE-01",
      "description": "State average submission delay and punctuality rate."
    },
    {
      "requirement_id": "S-T08-CORE-02",
      "description": "Describe the observed relationship between delay magnitude and score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T08-CONSTRAINT-01",
      "description": "Use submission_delay_avg and punctuality_rate when returned."
    },
    {
      "constraint_id": "S-T08-CONSTRAINT-02",
      "description": "Frame the delay-score relationship as correlational, not causal."
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
      "dataset_label": "submission_lateness",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T08.json",
      "artifact_sha256": "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018",
      "row_count": 5,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 5,
  "prompt_embedded_row_count": 5,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018",
  "evidence_rows_sha256": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac",
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
  "full_result_row_count": 5,
  "embedded_datasets_sha256": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac",
  "datasets": {
    "submission_lateness": [
      {
        "assessment_order": 1,
        "assessment_type": "CMA",
        "assessment_name": "24295",
        "submission_delay_days": 3,
        "score_normalized": 100,
        "pass_flag": true,
        "submission_day": 21,
        "due_day": 18,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 3,
        "assessment_type": "CMA",
        "assessment_name": "24296",
        "submission_delay_days": 2,
        "score_normalized": 87,
        "pass_flag": true,
        "submission_day": 69,
        "due_day": 67,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 5,
        "assessment_type": "CMA",
        "assessment_name": "24297",
        "submission_delay_days": 3,
        "score_normalized": 90,
        "pass_flag": true,
        "submission_day": 147,
        "due_day": 144,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 8,
        "assessment_type": "CMA",
        "assessment_name": "24298",
        "submission_delay_days": 5,
        "score_normalized": 83,
        "pass_flag": true,
        "submission_day": 219,
        "due_day": 214,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 9,
        "assessment_type": "Exam",
        "assessment_name": "24299",
        "submission_delay_days": null,
        "score_normalized": 96,
        "pass_flag": true,
        "submission_day": 244,
        "due_day": null,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T08__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "cf5e9817adf736fd79df00acd5a3aee4d6eb33fc58bf4c1ef8a46a64040146e1",
  "generator_input_sha256": "889ab5c65f5896e61729a6a2fc62e664f7f94a25517565faf216b740681d4e9a",
  "generator_input_compact": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847912365_48ce21c2",
    "task_name": "Assessment lateness impact",
    "analysis_type": "correlation",
    "explanation_strategy": "behavioral",
    "actionable_question": "Does submitting late actually lower my score?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "submission_lateness"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "submission_lateness"
    ],
    "dataset_row_counts": {
      "submission_lateness": 5
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "submission_delay_days",
      "entity_column": null,
      "group_column": null,
      "time_column": "assessment_order",
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
  "raw_text": "Summary: Your submission patterns show that while you have been submitting assessments late, you are still achieving passing scores. However, there is a noticeable trend where your scores tend to decrease as the submission delay increases.\n\nInsights: Impact of Submission Delay on Scores: As your submission delay increases, your scores show a slight decline. For instance, your highest score of 100 was achieved with a 3-day delay, while a 5-day delay resulted in a score of 83.\n\nEducational implications: Submitting late may not directly prevent you from passing, but it can impact your overall performance.\n\nRecommendations: high - Aim to submit assessments on or before the due date. - Improving your punctuality can help maintain or improve your scores, as evidenced by the correlation between timely submissions and higher scores.",
  "structured_payload": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847912365_48ce21c2",
    "explanation": {
      "summary": "Your submission patterns show that while you have been submitting assessments late, you are still achieving passing scores. However, there is a noticeable trend where your scores tend to decrease as the submission delay increases.",
      "insights": [
        {
          "title": "Impact of Submission Delay on Scores",
          "description": "As your submission delay increases, your scores show a slight decline. For instance, your highest score of 100 was achieved with a 3-day delay, while a 5-day delay resulted in a score of 83.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "submission_delay_days",
              "value": 5,
              "comparison": "up_from_previous",
              "delta": -7,
              "context": "Score dropped from 90 to 83 with a 5-day delay."
            }
          ]
        }
      ],
      "educational_implications": [
        "Submitting late may not directly prevent you from passing, but it can impact your overall performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Aim to submit assessments on or before the due date.",
          "rationale": "Improving your punctuality can help maintain or improve your scores, as evidenced by the correlation between timely submissions and higher scores."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly shows a pattern between submission delays and score outcomes.",
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
      "latency_ms": 5777,
      "token_usage": {
        "prompt_tokens": 970,
        "completion_tokens": 329,
        "total_tokens": 1299
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000343
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T08__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "cf5e9817adf736fd79df00acd5a3aee4d6eb33fc58bf4c1ef8a46a64040146e1",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 970,
      "completion_tokens": 329,
      "total_tokens": 1299
    },
    "latency_ms": 5779,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T08",
    "execution_id": "exec_1781847912365_48ce21c2",
    "explanation": {
      "summary": "Your submission patterns show that while you have been submitting assessments late, you are still achieving passing scores. However, there is a noticeable trend where your scores tend to decrease as the submission delay increases.",
      "insights": [
        {
          "title": "Impact of Submission Delay on Scores",
          "description": "As your submission delay increases, your scores show a slight decline. For instance, your highest score of 100 was achieved with a 3-day delay, while a 5-day delay resulted in a score of 83.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "submission_delay_days",
              "value": 5,
              "comparison": "up_from_previous",
              "delta": -7,
              "context": "Score dropped from 90 to 83 with a 5-day delay."
            }
          ]
        }
      ],
      "educational_implications": [
        "Submitting late may not directly prevent you from passing, but it can impact your overall performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Aim to submit assessments on or before the due date.",
          "rationale": "Improving your punctuality can help maintain or improve your scores, as evidenced by the correlation between timely submissions and higher scores."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly shows a pattern between submission delays and score outcomes.",
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
      "latency_ms": 5777,
      "token_usage": {
        "prompt_tokens": 970,
        "completion_tokens": 329,
        "total_tokens": 1299
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000343
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
    "expected": 5,
    "observed": 5
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018",
    "expected_values": [
      "02a77476593087a352549dbdb2c5098286e2277063652aeec9fd94cb464a5018"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac",
    "expected": "4319eb62696a4636a7842901839eab093df56e8d3e51bd34b58b9280acb231ac"
  },
  {
    "check_id": "numeric_fields_submission_lateness",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "submission_lateness",
    "numeric_columns": [
      "assessment_order",
      "score_normalized",
      "submission_day",
      "due_day",
      "submission_delay_days"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 5,
        "min": 1,
        "max": 9
      },
      "score_normalized": {
        "count": 5,
        "min": 83,
        "max": 100
      },
      "submission_day": {
        "count": 5,
        "min": 21,
        "max": 244
      },
      "due_day": {
        "count": 4,
        "min": 18,
        "max": 214
      },
      "submission_delay_days": {
        "count": 4,
        "min": 2,
        "max": 5
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_submission_lateness",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "submission_lateness",
    "flag_columns": [
      "pass_flag"
    ],
    "triggered_like_counts": {
      "pass_flag": 5
    }
  }
]
```
