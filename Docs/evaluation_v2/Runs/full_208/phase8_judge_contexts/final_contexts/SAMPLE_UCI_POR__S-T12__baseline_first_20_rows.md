# LLM Judge V2 Final Judge Context - SAMPLE_UCI_POR__S-T12__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T12__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T12",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Procrastination analysis",
  "scope": "1 student",
  "actionable_question": "Am I a procrastinator and is it costing me marks?",
  "target_audience": "student",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Use submission_delay_avg [FE]. Identify if late submission is systematic. Link to score.",
  "query_labels": [
    "submission_series",
    "punctuality_summary"
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
    "pass_flag; submission_delay_avg [FE cross]",
    "punctuality_rate [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "submission_series",
    "punctuality_summary"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T12-CORE-01",
      "description": "Identify whether late submission is systematic."
    },
    {
      "requirement_id": "S-T12-CORE-02",
      "description": "Describe the observed relationship between submission delay and score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T12-CONSTRAINT-01",
      "description": "Use submission_delay_avg as the primary delay metric; do not infer procrastination from score alone."
    },
    {
      "constraint_id": "S-T12-CONSTRAINT-02",
      "description": "Frame the delay-score relationship as correlational, not causal."
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
      "dataset_label": "submission_series",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T12.json",
      "artifact_sha256": "d435b0c3a59ff82244bfb1e8e01bdff9e19b9f70552221f1541bb5245b8bde76",
      "row_count": 3,
      "readable": true
    },
    {
      "dataset_label": "punctuality_summary",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T12.json",
      "artifact_sha256": "d435b0c3a59ff82244bfb1e8e01bdff9e19b9f70552221f1541bb5245b8bde76",
      "row_count": 1,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 4,
  "prompt_embedded_row_count": 4,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "d435b0c3a59ff82244bfb1e8e01bdff9e19b9f70552221f1541bb5245b8bde76",
  "evidence_rows_sha256": "3150fbd46fca5ca6357c28b1f0dfe5d037aeb0c4424989e255fe8f65e09691f5",
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
  "full_result_row_count": 4,
  "embedded_datasets_sha256": "3150fbd46fca5ca6357c28b1f0dfe5d037aeb0c4424989e255fe8f65e09691f5",
  "datasets": {
    "submission_series": [
      {
        "assessment_order": 1,
        "assessment_name": "G1",
        "assessment_type": "quiz",
        "due_day": 21,
        "submission_day": null,
        "submission_delay_days": null,
        "score_normalized": 0,
        "pass_flag": false
      },
      {
        "assessment_order": 2,
        "assessment_name": "G2",
        "assessment_type": "quiz",
        "due_day": 56,
        "submission_day": null,
        "submission_delay_days": null,
        "score_normalized": 55,
        "pass_flag": true
      },
      {
        "assessment_order": 3,
        "assessment_name": "G3",
        "assessment_type": "exam",
        "due_day": 98,
        "submission_day": null,
        "submission_delay_days": null,
        "score_normalized": 55,
        "pass_flag": true
      }
    ],
    "punctuality_summary": [
      {
        "submission_delay_avg": null,
        "punctuality_rate": "0"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T12__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "1130fe5e3f4e481eb9b55ff734487b3ce1474cdc1f60253506cf41d87389708f",
  "generator_input_sha256": "53117a83cbcf7bd9691a8c4f6bcefcb203c43d6cd1e02856fa53767f8d97e498",
  "generator_input_compact": {
    "task_id": "S-T12",
    "execution_id": "exec_1781847244391_4da9979a",
    "task_name": "Procrastination analysis",
    "analysis_type": "distribution",
    "explanation_strategy": "behavioral",
    "actionable_question": "Am I a procrastinator and is it costing me marks?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "submission_series",
      "punctuality_summary"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "submission_series",
      "punctuality_summary"
    ],
    "dataset_row_counts": {
      "submission_series": 3,
      "punctuality_summary": 1
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
  "raw_text": "Summary: It appears that you have not submitted any assessments yet, which indicates a pattern of procrastination. This lack of submissions is concerning as it directly impacts your scores and overall engagement with the course.\n\nInsights: No Submissions Recorded: You have not submitted any of the assessments, which suggests a consistent pattern of procrastination. This is reflected in your punctuality rate of 0, indicating that you have not submitted on time or at all. | Impact on Scores: Your scores for the assessments you attempted are low, with a normalized score of 55 for both G2 and G3. This suggests that even when you do engage, the lack of timely submissions may hinder your performance.\n\nEducational implications: Timely submissions are crucial for maintaining good scores and understanding course material.\n\nRecommendations: high - Set specific deadlines for yourself to complete assessments before the due dates. - Creating personal deadlines can help you manage your time better and reduce procrastination. | medium - Engage with course materials regularly to build a routine. - Regular engagement can help you stay on track and improve your understanding, leading to better performance.",
  "structured_payload": {
    "task_id": "S-T12",
    "execution_id": "exec_1781847244391_4da9979a",
    "explanation": {
      "summary": "It appears that you have not submitted any assessments yet, which indicates a pattern of procrastination. This lack of submissions is concerning as it directly impacts your scores and overall engagement with the course.",
      "insights": [
        {
          "title": "No Submissions Recorded",
          "description": "You have not submitted any of the assessments, which suggests a consistent pattern of procrastination. This is reflected in your punctuality rate of 0, indicating that you have not submitted on time or at all.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "baseline",
              "delta": null,
              "context": "No submissions made"
            }
          ]
        },
        {
          "title": "Impact on Scores",
          "description": "Your scores for the assessments you attempted are low, with a normalized score of 55 for both G2 and G3. This suggests that even when you do engage, the lack of timely submissions may hinder your performance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "baseline",
              "delta": null,
              "context": "Scores for G2 and G3"
            }
          ]
        }
      ],
      "educational_implications": [
        "Timely submissions are crucial for maintaining good scores and understanding course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Set specific deadlines for yourself to complete assessments before the due dates.",
          "rationale": "Creating personal deadlines can help you manage your time better and reduce procrastination."
        },
        {
          "priority": "medium",
          "action": "Engage with course materials regularly to build a routine.",
          "rationale": "Regular engagement can help you stay on track and improve your understanding, leading to better performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly shows no submissions and low scores, indicating a strong pattern of procrastination.",
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
      "latency_ms": 16007,
      "token_usage": {
        "prompt_tokens": 743,
        "completion_tokens": 481,
        "total_tokens": 1224
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.0004
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T12__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "1130fe5e3f4e481eb9b55ff734487b3ce1474cdc1f60253506cf41d87389708f",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 743,
      "completion_tokens": 481,
      "total_tokens": 1224
    },
    "latency_ms": 16012,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T12",
    "execution_id": "exec_1781847244391_4da9979a",
    "explanation": {
      "summary": "It appears that you have not submitted any assessments yet, which indicates a pattern of procrastination. This lack of submissions is concerning as it directly impacts your scores and overall engagement with the course.",
      "insights": [
        {
          "title": "No Submissions Recorded",
          "description": "You have not submitted any of the assessments, which suggests a consistent pattern of procrastination. This is reflected in your punctuality rate of 0, indicating that you have not submitted on time or at all.",
          "severity": "high",
          "evidence": [
            {
              "metric": "punctuality_rate",
              "value": "0",
              "comparison": "baseline",
              "delta": null,
              "context": "No submissions made"
            }
          ]
        },
        {
          "title": "Impact on Scores",
          "description": "Your scores for the assessments you attempted are low, with a normalized score of 55 for both G2 and G3. This suggests that even when you do engage, the lack of timely submissions may hinder your performance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 55,
              "comparison": "baseline",
              "delta": null,
              "context": "Scores for G2 and G3"
            }
          ]
        }
      ],
      "educational_implications": [
        "Timely submissions are crucial for maintaining good scores and understanding course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Set specific deadlines for yourself to complete assessments before the due dates.",
          "rationale": "Creating personal deadlines can help you manage your time better and reduce procrastination."
        },
        {
          "priority": "medium",
          "action": "Engage with course materials regularly to build a routine.",
          "rationale": "Regular engagement can help you stay on track and improve your understanding, leading to better performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly shows no submissions and low scores, indicating a strong pattern of procrastination.",
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
      "latency_ms": 16007,
      "token_usage": {
        "prompt_tokens": 743,
        "completion_tokens": 481,
        "total_tokens": 1224
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.0004
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
    "expected": 4,
    "observed": 4
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "d435b0c3a59ff82244bfb1e8e01bdff9e19b9f70552221f1541bb5245b8bde76",
    "expected_values": [
      "d435b0c3a59ff82244bfb1e8e01bdff9e19b9f70552221f1541bb5245b8bde76",
      "d435b0c3a59ff82244bfb1e8e01bdff9e19b9f70552221f1541bb5245b8bde76"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "3150fbd46fca5ca6357c28b1f0dfe5d037aeb0c4424989e255fe8f65e09691f5",
    "expected": "3150fbd46fca5ca6357c28b1f0dfe5d037aeb0c4424989e255fe8f65e09691f5"
  },
  {
    "check_id": "numeric_fields_submission_series",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "submission_series",
    "numeric_columns": [
      "assessment_order",
      "due_day",
      "score_normalized"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 3,
        "min": 1,
        "max": 3
      },
      "due_day": {
        "count": 3,
        "min": 21,
        "max": 98
      },
      "score_normalized": {
        "count": 3,
        "min": 0,
        "max": 55
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_submission_series",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "submission_series",
    "flag_columns": [
      "pass_flag"
    ],
    "triggered_like_counts": {
      "pass_flag": 2
    }
  },
  {
    "check_id": "numeric_fields_punctuality_summary",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "punctuality_summary",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_punctuality_summary",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "punctuality_summary",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
