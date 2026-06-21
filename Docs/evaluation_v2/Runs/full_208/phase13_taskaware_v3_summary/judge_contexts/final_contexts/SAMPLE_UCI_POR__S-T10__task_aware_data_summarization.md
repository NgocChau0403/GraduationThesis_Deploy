# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T10__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T10__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T10",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Resource engagement breakdown",
  "scope": "1 student",
  "actionable_question": "Am I using the full range of learning resources available?",
  "target_audience": "student",
  "ai_summary_type": "categorical_distribution",
  "ai_prompt_hint": "Use vle_diversity_score [FE] to show breadth. Highlight under-used types (e.g. forum rarely used).",
  "query_labels": [
    "resource_usage"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
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
    "resource_usage"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T10-CORE-01",
      "description": "State the student's resource usage breadth across available VLE types."
    },
    {
      "requirement_id": "S-T10-CORE-02",
      "description": "Identify under-used resource types when a comparison baseline is available."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T10-CONSTRAINT-01",
      "description": "Use vle_diversity_score as the primary resource-breadth metric when returned."
    },
    {
      "constraint_id": "S-T10-CONSTRAINT-02",
      "description": "Do not label low usage of a resource type as disengagement when no comparison baseline is provided."
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
      "dataset_label": "resource_usage",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T10.json",
      "artifact_sha256": "8b187268d8d6f966024fd314f04e995a890cf27336196c51ae5ae1ba2e5d2bb5",
      "row_count": 0,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 0,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "8b187268d8d6f966024fd314f04e995a890cf27336196c51ae5ae1ba2e5d2bb5",
  "evidence_rows_sha256": "c4e51ed11cb33506e5c793b3d8676ffc547ef7ec723b9d5f0a62c6814eb8f44e",
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
  "full_result_row_count": 0,
  "embedded_datasets_sha256": "c4e51ed11cb33506e5c793b3d8676ffc547ef7ec723b9d5f0a62c6814eb8f44e",
  "datasets": {
    "resource_usage": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T10__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "f357e06e15b3d756e303ea2ab640b3a2ee56e5d5f6794c2b702cee1a185f2720",
  "generator_input_sha256": "3426443dca5e1d437ac1885451037d3026405bf4318e9611f05e7ac2a8e05371",
  "generator_input_compact": {
    "task_id": "S-T10",
    "execution_id": "exec_1781847244313_70d770a1",
    "task_name": "Resource engagement breakdown",
    "analysis_type": "distribution",
    "explanation_strategy": "behavioral",
    "actionable_question": "Am I using the full range of learning resources available?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "resource_usage"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "resource_usage"
    ],
    "dataset_row_counts": {
      "resource_usage": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "categorical_distribution",
      "metric_column": null,
      "entity_column": null,
      "group_column": null,
      "time_column": null,
      "sort_by": "clicks",
      "sort_direction": "desc",
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
  "raw_text": "Summary: It appears that you haven't engaged with the available learning resources this semester, as there are no recorded interactions. This suggests an opportunity for you to explore and utilize the diverse resources offered in your course.\n\nInsights: Lack of Resource Engagement: You have not clicked on any resources, indicating a complete absence of engagement with the available materials. This could limit your understanding and success in the course.\n\nEducational implications: Engaging with a variety of resources can enhance your learning experience and understanding of the course material.\n\nRecommendations: high - Start exploring different types of resources, especially forums and other interactive materials. - Using a wider range of resources can help you gain different perspectives and deepen your understanding of the subject matter.",
  "structured_payload": {
    "task_id": "S-T10",
    "execution_id": "exec_1781847244313_70d770a1",
    "explanation": {
      "summary": "It appears that you haven't engaged with the available learning resources this semester, as there are no recorded interactions. This suggests an opportunity for you to explore and utilize the diverse resources offered in your course.",
      "insights": [
        {
          "title": "Lack of Resource Engagement",
          "description": "You have not clicked on any resources, indicating a complete absence of engagement with the available materials. This could limit your understanding and success in the course.",
          "severity": "high",
          "evidence": [
            {
              "metric": "row_count",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "No resource usage recorded"
            }
          ]
        }
      ],
      "educational_implications": [
        "Engaging with a variety of resources can enhance your learning experience and understanding of the course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Start exploring different types of resources, especially forums and other interactive materials.",
          "rationale": "Using a wider range of resources can help you gain different perspectives and deepen your understanding of the subject matter."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset indicates no recorded resource usage, providing a clear picture of engagement.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "categorical_distribution",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "resource_usage",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 9,
    "task_aware_prompt_tokens": 276,
    "token_ratio": 30.6667,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (30.6667 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3697,
      "token_usage": {
        "prompt_tokens": 743,
        "completion_tokens": 305,
        "total_tokens": 1048
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000294
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T10__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "f357e06e15b3d756e303ea2ab640b3a2ee56e5d5f6794c2b702cee1a185f2720",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 743,
      "completion_tokens": 305,
      "total_tokens": 1048
    },
    "latency_ms": 3704,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T10",
    "execution_id": "exec_1781847244313_70d770a1",
    "explanation": {
      "summary": "It appears that you haven't engaged with the available learning resources this semester, as there are no recorded interactions. This suggests an opportunity for you to explore and utilize the diverse resources offered in your course.",
      "insights": [
        {
          "title": "Lack of Resource Engagement",
          "description": "You have not clicked on any resources, indicating a complete absence of engagement with the available materials. This could limit your understanding and success in the course.",
          "severity": "high",
          "evidence": [
            {
              "metric": "row_count",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "No resource usage recorded"
            }
          ]
        }
      ],
      "educational_implications": [
        "Engaging with a variety of resources can enhance your learning experience and understanding of the course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Start exploring different types of resources, especially forums and other interactive materials.",
          "rationale": "Using a wider range of resources can help you gain different perspectives and deepen your understanding of the subject matter."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset indicates no recorded resource usage, providing a clear picture of engagement.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "categorical_distribution",
    "ai_summary_method_warning": null,
    "full_result_row_count": 0,
    "included_row_count": 0,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "resource_usage",
        "row_count": 0,
        "included_row_count": 0
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 0,
    "baseline_reference_tokens": 9,
    "task_aware_prompt_tokens": 276,
    "token_ratio": 30.6667,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (30.6667 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 3697,
      "token_usage": {
        "prompt_tokens": 743,
        "completion_tokens": 305,
        "total_tokens": 1048
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
    "expected": 0,
    "observed": 0
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "8b187268d8d6f966024fd314f04e995a890cf27336196c51ae5ae1ba2e5d2bb5",
    "expected_values": [
      "8b187268d8d6f966024fd314f04e995a890cf27336196c51ae5ae1ba2e5d2bb5"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "c4e51ed11cb33506e5c793b3d8676ffc547ef7ec723b9d5f0a62c6814eb8f44e",
    "expected": "c4e51ed11cb33506e5c793b3d8676ffc547ef7ec723b9d5f0a62c6814eb8f44e"
  },
  {
    "check_id": "numeric_fields_resource_usage",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "resource_usage",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_resource_usage",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "resource_usage",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
