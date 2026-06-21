# LLM Judge Final Judge Context - SAMPLE_OULAD__A-S06__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-S06__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-S06",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Student submission & punctuality",
  "scope": "1 student",
  "actionable_question": "Is this student consistently submitting late and does it affect their score?",
  "target_audience": "instructor",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "State average delay and punctuality rate. Identify if late submission is systematic. Suggest deadline reminder or check-in.",
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
      "requirement_id": "A-S06-CORE-01",
      "description": "State average delay and punctuality rate."
    },
    {
      "requirement_id": "A-S06-CORE-02",
      "description": "Identify if late submission is systematic."
    },
    {
      "requirement_id": "A-S06-CORE-03",
      "description": "Suggest deadline reminder or check-in."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-S06-CONSTRAINT-01",
      "description": "Do not characterise late submission as low motivation or a personal failing."
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
      "dataset_label": "submission_lateness",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-S06.json",
      "artifact_sha256": "aef5d644155efdeec9f02e9414f63b1a5ab22ca599acc2e4ced933ec0c05c649",
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
  "evidence_artifact_file_sha256": "aef5d644155efdeec9f02e9414f63b1a5ab22ca599acc2e4ced933ec0c05c649",
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
        "due_day": 18,
        "submission_day": 21,
        "submission_delay_days": 3,
        "score_normalized": 100,
        "pass_flag": true,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 3,
        "assessment_type": "CMA",
        "assessment_name": "24296",
        "due_day": 67,
        "submission_day": 69,
        "submission_delay_days": 2,
        "score_normalized": 87,
        "pass_flag": true,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 5,
        "assessment_type": "CMA",
        "assessment_name": "24297",
        "due_day": 144,
        "submission_day": 147,
        "submission_delay_days": 3,
        "score_normalized": 90,
        "pass_flag": true,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 8,
        "assessment_type": "CMA",
        "assessment_name": "24298",
        "due_day": 214,
        "submission_day": 219,
        "submission_delay_days": 5,
        "score_normalized": 83,
        "pass_flag": true,
        "submission_delay_avg": "3.25",
        "punctuality_rate": "0"
      },
      {
        "assessment_order": 9,
        "assessment_type": "Exam",
        "assessment_name": "24299",
        "due_day": null,
        "submission_day": 244,
        "submission_delay_days": null,
        "score_normalized": 96,
        "pass_flag": true,
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S06__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "fd8368eb594434be5b5511ad1d97459587f9120ab632f8d5c21bb1a453e2b1b3",
  "generator_input_sha256": "cb2dd58edf358fa0f59a350863630c3a86cc3b12d22295c705d63f7e79f831e8",
  "generator_input_compact": {
    "task_id": "A-S06",
    "execution_id": "exec_1781847835631_7a5d6a8f",
    "task_name": "Student submission & punctuality",
    "analysis_type": "distribution",
    "explanation_strategy": "behavioral",
    "actionable_question": "Is this student consistently submitting late and does it affect their score?",
    "target_audience": [
      "instructor"
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
  "raw_text": "Summary: The student exhibits a consistent pattern of late submissions across multiple assessments, with an average submission delay of 3.25 days and a punctuality rate of 0. Despite these delays, the student has managed to pass all assessments with scores ranging from 83 to 100.\n\nInsights: Consistent Late Submissions: The student has submitted all assessments late, with delays ranging from 2 to 5 days. This pattern suggests a systematic issue with meeting deadlines. | Punctuality Rate: The student's punctuality rate is consistently at 0, indicating that they have not submitted any assessments on time.\n\nEducational implications: The student's late submissions may indicate a lack of time management skills or external factors affecting their ability to meet deadlines.\n\nRecommendations: high - Implement deadline reminders for upcoming assessments. - Regular reminders may help the student manage their time better and improve punctuality. | medium - Conduct a check-in with the student to discuss any challenges they may be facing. - Understanding the reasons behind late submissions can help tailor support to improve their engagement.",
  "structured_payload": {
    "task_id": "A-S06",
    "execution_id": "exec_1781847835631_7a5d6a8f",
    "explanation": {
      "summary": "The student exhibits a consistent pattern of late submissions across multiple assessments, with an average submission delay of 3.25 days and a punctuality rate of 0. Despite these delays, the student has managed to pass all assessments with scores ranging from 83 to 100.",
      "insights": [
        {
          "title": "Consistent Late Submissions",
          "description": "The student has submitted all assessments late, with delays ranging from 2 to 5 days. This pattern suggests a systematic issue with meeting deadlines.",
          "severity": "high",
          "evidence": [
            {
              "metric": "submission_delay_days",
              "value": 3,
              "comparison": "stable",
              "delta": null,
              "context": "Average delay across assessments"
            }
          ]
        },
        {
          "title": "Punctuality Rate",
          "description": "The student's punctuality rate is consistently at 0, indicating that they have not submitted any assessments on time.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "stable",
              "delta": null,
              "context": "No timely submissions recorded"
            }
          ]
        }
      ],
      "educational_implications": [
        "The student's late submissions may indicate a lack of time management skills or external factors affecting their ability to meet deadlines."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement deadline reminders for upcoming assessments.",
          "rationale": "Regular reminders may help the student manage their time better and improve punctuality."
        },
        {
          "priority": "medium",
          "action": "Conduct a check-in with the student to discuss any challenges they may be facing.",
          "rationale": "Understanding the reasons behind late submissions can help tailor support to improve their engagement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is consistent and clearly indicates submission patterns.",
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
      "latency_ms": 6930,
      "token_usage": {
        "prompt_tokens": 968,
        "completion_tokens": 459,
        "total_tokens": 1427
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000421
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-S06__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "fd8368eb594434be5b5511ad1d97459587f9120ab632f8d5c21bb1a453e2b1b3",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 968,
      "completion_tokens": 459,
      "total_tokens": 1427
    },
    "latency_ms": 6932,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S06",
    "execution_id": "exec_1781847835631_7a5d6a8f",
    "explanation": {
      "summary": "The student exhibits a consistent pattern of late submissions across multiple assessments, with an average submission delay of 3.25 days and a punctuality rate of 0. Despite these delays, the student has managed to pass all assessments with scores ranging from 83 to 100.",
      "insights": [
        {
          "title": "Consistent Late Submissions",
          "description": "The student has submitted all assessments late, with delays ranging from 2 to 5 days. This pattern suggests a systematic issue with meeting deadlines.",
          "severity": "high",
          "evidence": [
            {
              "metric": "submission_delay_days",
              "value": 3,
              "comparison": "stable",
              "delta": null,
              "context": "Average delay across assessments"
            }
          ]
        },
        {
          "title": "Punctuality Rate",
          "description": "The student's punctuality rate is consistently at 0, indicating that they have not submitted any assessments on time.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "stable",
              "delta": null,
              "context": "No timely submissions recorded"
            }
          ]
        }
      ],
      "educational_implications": [
        "The student's late submissions may indicate a lack of time management skills or external factors affecting their ability to meet deadlines."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement deadline reminders for upcoming assessments.",
          "rationale": "Regular reminders may help the student manage their time better and improve punctuality."
        },
        {
          "priority": "medium",
          "action": "Conduct a check-in with the student to discuss any challenges they may be facing.",
          "rationale": "Understanding the reasons behind late submissions can help tailor support to improve their engagement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is consistent and clearly indicates submission patterns.",
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
      "latency_ms": 6930,
      "token_usage": {
        "prompt_tokens": 968,
        "completion_tokens": 459,
        "total_tokens": 1427
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.000421
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
    "observed": "aef5d644155efdeec9f02e9414f63b1a5ab22ca599acc2e4ced933ec0c05c649",
    "expected_values": [
      "aef5d644155efdeec9f02e9414f63b1a5ab22ca599acc2e4ced933ec0c05c649"
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
