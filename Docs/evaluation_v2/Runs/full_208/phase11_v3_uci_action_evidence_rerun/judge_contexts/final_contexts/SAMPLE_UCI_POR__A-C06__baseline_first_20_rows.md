# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C06__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-C06__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-C06",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Compare resource usage",
  "scope": "2 students",
  "actionable_question": "Is one student using resources more strategically than the other?",
  "target_audience": "instructor",
  "ai_summary_type": "multi_metric_comparison",
  "ai_prompt_hint": "Highlight who is more diversified in resource use. Note if one avoids forums/quizzes.",
  "query_labels": [
    "resource_comparison"
  ],
  "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement",
    "event [OULAD only]"
  ],
  "key_db_fields": [
    "resource_type",
    "engagement_count; vle_diversity_score [FE cross]",
    "forum_engagement_rate [FE cross]",
    "quiz_engagement_rate [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "resource_comparison"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-C06-CORE-01",
      "description": "Highlight who is more diversified in resource use."
    },
    {
      "requirement_id": "A-C06-CORE-02",
      "description": "Note if one avoids forums/quizzes."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Retained as applicable because it compares two identifiable students; risk is lower than lifestyle/background tasks but not absent."
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
      "dataset_label": "resource_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-C06.json",
      "artifact_sha256": "1217e49edd14b371c1a60fd0a4284900204c346b731579f3dc942372c7df60c1",
      "row_count": 2,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 2,
  "prompt_embedded_row_count": 2,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "1217e49edd14b371c1a60fd0a4284900204c346b731579f3dc942372c7df60c1",
  "evidence_rows_sha256": "0401485960956ef69ee9c5fd7284b75e9e6c582fe4216b9da678f4df40d4fb97",
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
  "full_result_row_count": 2,
  "embedded_datasets_sha256": "0401485960956ef69ee9c5fd7284b75e9e6c582fe4216b9da678f4df40d4fb97",
  "datasets": {
    "resource_comparison": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "resource_type": null,
        "clicks": 0,
        "pct_of_total": null,
        "vle_diversity_score": 0,
        "has_engagement_data": false,
        "total_clicks": 0,
        "used_resource_types": 0,
        "evidence_row_type": "no_recorded_resource_usage"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "resource_type": null,
        "clicks": 0,
        "pct_of_total": null,
        "vle_diversity_score": 0,
        "has_engagement_data": false,
        "total_clicks": 0,
        "used_resource_types": 0,
        "evidence_row_type": "no_recorded_resource_usage"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C06__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "d10fe1cdce678965632d56f9ff904bb30ef989c37b5a6489e64d2ee8c453e9c7",
  "generator_input_sha256": "5784c5587481b944ff5c4adb91c7a9aa70f7a0612df76e000f1bfe1a03954042",
  "generator_input_compact": {
    "task_id": "A-C06",
    "execution_id": "exec_1781847232074_cf418da8",
    "task_name": "Compare resource usage",
    "analysis_type": "comparison",
    "explanation_strategy": "comparison",
    "actionable_question": "Is one student using resources more strategically than the other?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "resource_comparison"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "resource_comparison"
    ],
    "dataset_row_counts": {
      "resource_comparison": 2
    },
    "ai_summary_config_summary": {
      "summary_type": "multi_metric_comparison",
      "metric_column": null,
      "entity_column": "student_id",
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
  "raw_text": "Summary: Both students exhibit identical patterns of resource usage, with no recorded engagement or clicks. This indicates a lack of interaction with available resources, suggesting a need for intervention to enhance engagement.\n\nInsights: No Resource Engagement: Neither student has recorded any resource usage, indicating a complete absence of engagement with the learning materials.\n\nEducational implications: The lack of resource engagement may hinder students' learning outcomes and overall academic performance.\n\nRecommendations: high - Implement targeted outreach to both students to encourage resource usage. - Direct engagement strategies may help motivate students to utilize available resources effectively.",
  "structured_payload": {
    "task_id": "A-C06",
    "execution_id": "exec_1781847232074_cf418da8",
    "explanation": {
      "summary": "Both students exhibit identical patterns of resource usage, with no recorded engagement or clicks. This indicates a lack of interaction with available resources, suggesting a need for intervention to enhance engagement.",
      "insights": [
        {
          "title": "No Resource Engagement",
          "description": "Neither student has recorded any resource usage, indicating a complete absence of engagement with the learning materials.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_clicks",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have not engaged with any resources."
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of resource engagement may hinder students' learning outcomes and overall academic performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted outreach to both students to encourage resource usage.",
          "rationale": "Direct engagement strategies may help motivate students to utilize available resources effectively."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data shows consistent patterns of no engagement across both students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
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
      "latency_ms": 4747,
      "token_usage": {
        "prompt_tokens": 714,
        "completion_tokens": 272,
        "total_tokens": 986
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.00027
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C06__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "d10fe1cdce678965632d56f9ff904bb30ef989c37b5a6489e64d2ee8c453e9c7",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 714,
      "completion_tokens": 272,
      "total_tokens": 986
    },
    "latency_ms": 4751,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C06",
    "execution_id": "exec_1781847232074_cf418da8",
    "explanation": {
      "summary": "Both students exhibit identical patterns of resource usage, with no recorded engagement or clicks. This indicates a lack of interaction with available resources, suggesting a need for intervention to enhance engagement.",
      "insights": [
        {
          "title": "No Resource Engagement",
          "description": "Neither student has recorded any resource usage, indicating a complete absence of engagement with the learning materials.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_clicks",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have not engaged with any resources."
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of resource engagement may hinder students' learning outcomes and overall academic performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted outreach to both students to encourage resource usage.",
          "rationale": "Direct engagement strategies may help motivate students to utilize available resources effectively."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data shows consistent patterns of no engagement across both students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
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
      "latency_ms": 4747,
      "token_usage": {
        "prompt_tokens": 714,
        "completion_tokens": 272,
        "total_tokens": 986
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.00027
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
    "expected": 2,
    "observed": 2
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "1217e49edd14b371c1a60fd0a4284900204c346b731579f3dc942372c7df60c1",
    "expected_values": [
      "1217e49edd14b371c1a60fd0a4284900204c346b731579f3dc942372c7df60c1"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "0401485960956ef69ee9c5fd7284b75e9e6c582fe4216b9da678f4df40d4fb97",
    "expected": "0401485960956ef69ee9c5fd7284b75e9e6c582fe4216b9da678f4df40d4fb97"
  },
  {
    "check_id": "numeric_fields_resource_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "resource_comparison",
    "numeric_columns": [
      "clicks",
      "total_clicks",
      "used_resource_types",
      "vle_diversity_score"
    ],
    "numeric_summaries": {
      "clicks": {
        "count": 2,
        "min": 0,
        "max": 0
      },
      "total_clicks": {
        "count": 2,
        "min": 0,
        "max": 0
      },
      "used_resource_types": {
        "count": 2,
        "min": 0,
        "max": 0
      },
      "vle_diversity_score": {
        "count": 2,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_resource_comparison",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "resource_comparison",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
