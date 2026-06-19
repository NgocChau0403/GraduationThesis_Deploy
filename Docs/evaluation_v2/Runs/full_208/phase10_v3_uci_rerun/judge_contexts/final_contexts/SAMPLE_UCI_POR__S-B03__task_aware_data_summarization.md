# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-B03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-B03__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-B03",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
}
```

## Task Context

```json
{
  "task_name": "Engagement summary",
  "scope": "1 student",
  "actionable_question": "How active am I compared to classmates?",
  "target_audience": "student",
  "ai_summary_type": "metric_snapshot",
  "ai_prompt_hint": "Describe effort level in plain language using study_effort_level, total_engagement_count, active_days, engagement_score, and class_avg_engagement_score. Compare to class averages only from returned fields, and avoid calling missing engagement data low effort.",
  "query_labels": [
    "engagement_summary"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement"
  ],
  "key_db_fields": [
    "total_engagement_count [FE]",
    "active_days [FE]",
    "engagement_score [FE]",
    "class_avg_engagement_score [FE]",
    "study_effort_level [FE]"
  ],
  "output_schema": {
    "required_columns": [
      "total_engagement_count",
      "active_days",
      "engagement_score",
      "class_avg_engagement_score",
      "study_effort_level"
    ]
  },
  "query_labels": [
    "engagement_summary"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-B03-CORE-01",
      "description": "Characterise the student's effort level relative to the available class benchmark in plain language."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-B03-CONSTRAINT-01",
      "description": "Ground the characterisation in study_effort_level, total_engagement_count, active_days, engagement_score, and class_avg_engagement_score when those fields are returned."
    },
    {
      "constraint_id": "S-B03-CONSTRAINT-02",
      "description": "Do not label missing engagement data as low effort."
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

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "engagement_summary",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-B03.json",
      "artifact_sha256": "4f8fa95bbb81166a8489e820ce7a090e1bb452648f25347f4e54381b074aef05",
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
  "evidence_artifact_file_sha256": "4f8fa95bbb81166a8489e820ce7a090e1bb452648f25347f4e54381b074aef05",
  "evidence_rows_sha256": "d2c18c60ce89d8295d4d89f2074b05c2b5409bb535c98fa5cb002d417c1e91c7",
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
  "embedded_datasets_sha256": "d2c18c60ce89d8295d4d89f2074b05c2b5409bb535c98fa5cb002d417c1e91c7",
  "datasets": {
    "engagement_summary": [
      {
        "total_engagement_count": 0,
        "total_clicks": 0,
        "active_days": 0,
        "engagement_score": 0,
        "class_avg_total_engagement_count": 0,
        "class_avg_active_days": 0,
        "class_avg_engagement_score": 0,
        "study_effort_level": "very_low"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-B03__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "a3e1569d0d96a1293cffa68270610455aa7eb18409224ffef958f885e18e704a",
  "generator_input_sha256": "7379086c71a9be0e020c2e0d17cd0929144632a581ad1aae5240058bdd293b19",
  "generator_input_compact": {
    "task_id": "S-B03",
    "execution_id": "exec_1781847241745_1841e4ae",
    "task_name": "Engagement summary",
    "analysis_type": "aggregation",
    "explanation_strategy": "behavioral",
    "actionable_question": "How active am I compared to classmates?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "engagement_summary"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "engagement_summary"
    ],
    "dataset_row_counts": {
      "engagement_summary": 1
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
  "raw_text": "Summary: It looks like you haven't engaged with the course at all this semester. Your total engagement count, active days, and engagement score are all at zero, which indicates that you haven't participated in any activities or interactions.\n\nInsights: Lack of Engagement: You have a total engagement count of 0, which means there have been no interactions with the course materials or activities. This is concerning as it suggests you may not be keeping up with the course.\n\nEducational implications: This lack of engagement may hinder your understanding of the course material and affect your overall performance.\n\nRecommendations: high - Start participating in course activities and materials. - Engaging with the course will help you catch up and improve your understanding of the subject matter.",
  "structured_payload": {
    "task_id": "S-B03",
    "execution_id": "exec_1781847241745_1841e4ae",
    "explanation": {
      "summary": "It looks like you haven't engaged with the course at all this semester. Your total engagement count, active days, and engagement score are all at zero, which indicates that you haven't participated in any activities or interactions.",
      "insights": [
        {
          "title": "Lack of Engagement",
          "description": "You have a total engagement count of 0, which means there have been no interactions with the course materials or activities. This is concerning as it suggests you may not be keeping up with the course.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_engagement_count",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "No engagement recorded"
            }
          ]
        }
      ],
      "educational_implications": [
        "This lack of engagement may hinder your understanding of the course material and affect your overall performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Start participating in course activities and materials.",
          "rationale": "Engaging with the course will help you catch up and improve your understanding of the subject matter."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly shows no engagement activity.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5251,
      "token_usage": {
        "prompt_tokens": 764,
        "completion_tokens": 299,
        "total_tokens": 1063
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000294
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-B03__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "a3e1569d0d96a1293cffa68270610455aa7eb18409224ffef958f885e18e704a",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 764,
      "completion_tokens": 299,
      "total_tokens": 1063
    },
    "latency_ms": 5319,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-B03",
    "execution_id": "exec_1781847241745_1841e4ae",
    "explanation": {
      "summary": "It looks like you haven't engaged with the course at all this semester. Your total engagement count, active days, and engagement score are all at zero, which indicates that you haven't participated in any activities or interactions.",
      "insights": [
        {
          "title": "Lack of Engagement",
          "description": "You have a total engagement count of 0, which means there have been no interactions with the course materials or activities. This is concerning as it suggests you may not be keeping up with the course.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_engagement_count",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "No engagement recorded"
            }
          ]
        }
      ],
      "educational_implications": [
        "This lack of engagement may hinder your understanding of the course material and affect your overall performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Start participating in course activities and materials.",
          "rationale": "Engaging with the course will help you catch up and improve your understanding of the subject matter."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly shows no engagement activity.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 1,
    "included_row_count": 1,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_summary",
        "row_count": 1,
        "included_row_count": 1
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5251,
      "token_usage": {
        "prompt_tokens": 764,
        "completion_tokens": 299,
        "total_tokens": 1063
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000294
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
    "observed": "4f8fa95bbb81166a8489e820ce7a090e1bb452648f25347f4e54381b074aef05",
    "expected_values": [
      "4f8fa95bbb81166a8489e820ce7a090e1bb452648f25347f4e54381b074aef05"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "d2c18c60ce89d8295d4d89f2074b05c2b5409bb535c98fa5cb002d417c1e91c7",
    "expected": "d2c18c60ce89d8295d4d89f2074b05c2b5409bb535c98fa5cb002d417c1e91c7"
  },
  {
    "check_id": "numeric_fields_engagement_summary",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "engagement_summary",
    "numeric_columns": [
      "active_days",
      "class_avg_active_days",
      "class_avg_engagement_score",
      "class_avg_total_engagement_count",
      "engagement_score",
      "total_clicks",
      "total_engagement_count"
    ],
    "numeric_summaries": {
      "active_days": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "class_avg_active_days": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "class_avg_engagement_score": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "class_avg_total_engagement_count": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "engagement_score": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "total_clicks": {
        "count": 1,
        "min": 0,
        "max": 0
      },
      "total_engagement_count": {
        "count": 1,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_engagement_summary",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "engagement_summary",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
