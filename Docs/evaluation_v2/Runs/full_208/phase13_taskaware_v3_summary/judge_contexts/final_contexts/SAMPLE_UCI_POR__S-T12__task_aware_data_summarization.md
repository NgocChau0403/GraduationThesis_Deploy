# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T12__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T12__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T12",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T12__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "91feeca17479ebe99dfb38c4b1d73c95d9cae518bddfafd176c5a2fd9936758d",
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
  "raw_text": "Summary: It looks like you haven't submitted any assessments yet, which suggests a pattern of procrastination. This could be impacting your scores, as timely submissions are crucial for success.\n\nInsights: Lack of Submissions: You have not submitted any assessments, which indicates a potential habit of delaying your work. This is reflected in your punctuality rate of 0, meaning you haven't submitted on time for any assessments. | Impact on Scores: Your normalized scores for the quizzes and exam are currently 0 and 55, respectively. Without timely submissions, you risk not achieving higher scores.\n\nEducational implications: Timely submissions are essential for maintaining good grades and understanding course material.\n\nRecommendations: high - Set specific deadlines for yourself to complete assessments before the due dates. - Creating personal deadlines can help you manage your time better and reduce procrastination. | medium - Reach out to your instructor for support or clarification on assessments. - Getting help can motivate you to start working on your assignments and improve your engagement.",
  "structured_payload": {
    "task_id": "S-T12",
    "execution_id": "exec_1781847244391_4da9979a",
    "explanation": {
      "summary": "It looks like you haven't submitted any assessments yet, which suggests a pattern of procrastination. This could be impacting your scores, as timely submissions are crucial for success.",
      "insights": [
        {
          "title": "Lack of Submissions",
          "description": "You have not submitted any assessments, which indicates a potential habit of delaying your work. This is reflected in your punctuality rate of 0, meaning you haven't submitted on time for any assessments.",
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
          "description": "Your normalized scores for the quizzes and exam are currently 0 and 55, respectively. Without timely submissions, you risk not achieving higher scores.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "First assessment not submitted"
            }
          ]
        }
      ],
      "educational_implications": [
        "Timely submissions are essential for maintaining good grades and understanding course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Set specific deadlines for yourself to complete assessments before the due dates.",
          "rationale": "Creating personal deadlines can help you manage your time better and reduce procrastination."
        },
        {
          "priority": "medium",
          "action": "Reach out to your instructor for support or clarification on assessments.",
          "rationale": "Getting help can motivate you to start working on your assignments and improve your engagement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly shows no submissions and a punctuality rate of 0, indicating a strong pattern of procrastination.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_series",
        "row_count": 3,
        "included_row_count": 3
      },
      {
        "dataset_name": "punctuality_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 4,
    "baseline_reference_tokens": 209,
    "task_aware_prompt_tokens": 652,
    "token_ratio": 3.1196,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.1196 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6010,
      "token_usage": {
        "prompt_tokens": 1159,
        "completion_tokens": 460,
        "total_tokens": 1619
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.00045
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T12__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "91feeca17479ebe99dfb38c4b1d73c95d9cae518bddfafd176c5a2fd9936758d",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1159,
      "completion_tokens": 460,
      "total_tokens": 1619
    },
    "latency_ms": 6017,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T12",
    "execution_id": "exec_1781847244391_4da9979a",
    "explanation": {
      "summary": "It looks like you haven't submitted any assessments yet, which suggests a pattern of procrastination. This could be impacting your scores, as timely submissions are crucial for success.",
      "insights": [
        {
          "title": "Lack of Submissions",
          "description": "You have not submitted any assessments, which indicates a potential habit of delaying your work. This is reflected in your punctuality rate of 0, meaning you haven't submitted on time for any assessments.",
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
          "description": "Your normalized scores for the quizzes and exam are currently 0 and 55, respectively. Without timely submissions, you risk not achieving higher scores.",
          "severity": "high",
          "evidence": [
            {
              "metric": "score_normalized",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "First assessment not submitted"
            }
          ]
        }
      ],
      "educational_implications": [
        "Timely submissions are essential for maintaining good grades and understanding course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Set specific deadlines for yourself to complete assessments before the due dates.",
          "rationale": "Creating personal deadlines can help you manage your time better and reduce procrastination."
        },
        {
          "priority": "medium",
          "action": "Reach out to your instructor for support or clarification on assessments.",
          "rationale": "Getting help can motivate you to start working on your assignments and improve your engagement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly shows no submissions and a punctuality rate of 0, indicating a strong pattern of procrastination.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "trend_series",
    "ai_summary_method_warning": null,
    "full_result_row_count": 4,
    "included_row_count": 4,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "submission_series",
        "row_count": 3,
        "included_row_count": 3
      },
      {
        "dataset_name": "punctuality_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 4,
    "baseline_reference_tokens": 209,
    "task_aware_prompt_tokens": 652,
    "token_ratio": 3.1196,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "action_evidence",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.1196 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6010,
      "token_usage": {
        "prompt_tokens": 1159,
        "completion_tokens": 460,
        "total_tokens": 1619
      },
      "strategy": "behavioral",
      "granularity": "per_assessment",
      "cost_usd": 0.00045
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
