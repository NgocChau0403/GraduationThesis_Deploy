# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T10__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T10__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T10",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T10__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "79503a4ab74864352b1bd31cf74b27c5d1843b6e34f2c1f669933555c466e90b",
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
  "raw_text": "Summary: It appears that there is currently no recorded resource usage data for you this semester. This suggests that you may not be fully engaging with the available learning resources, which could impact your overall learning experience.\n\nInsights: Lack of Resource Engagement: You have not utilized any learning resources this semester, indicating a potential gap in your engagement with the course materials.\n\nEducational implications: Engaging with a variety of resources can enhance your understanding and retention of course material.\n\nRecommendations: high - Start exploring different learning resources available on the platform. - Using a variety of resources can provide you with different perspectives and improve your overall learning experience.",
  "structured_payload": {
    "task_id": "S-T10",
    "execution_id": "exec_1781847244313_70d770a1",
    "explanation": {
      "summary": "It appears that there is currently no recorded resource usage data for you this semester. This suggests that you may not be fully engaging with the available learning resources, which could impact your overall learning experience.",
      "insights": [
        {
          "title": "Lack of Resource Engagement",
          "description": "You have not utilized any learning resources this semester, indicating a potential gap in your engagement with the course materials.",
          "severity": "high",
          "evidence": [
            {
              "metric": "resource_usage",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "No resources have been accessed."
            }
          ]
        }
      ],
      "educational_implications": [
        "Engaging with a variety of resources can enhance your understanding and retention of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Start exploring different learning resources available on the platform.",
          "rationale": "Using a variety of resources can provide you with different perspectives and improve your overall learning experience."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The absence of data indicates a clear lack of resource engagement.",
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
      "latency_ms": 7620,
      "token_usage": {
        "prompt_tokens": 507,
        "completion_tokens": 282,
        "total_tokens": 789
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000245
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T10__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "79503a4ab74864352b1bd31cf74b27c5d1843b6e34f2c1f669933555c466e90b",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 507,
      "completion_tokens": 282,
      "total_tokens": 789
    },
    "latency_ms": 7626,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T10",
    "execution_id": "exec_1781847244313_70d770a1",
    "explanation": {
      "summary": "It appears that there is currently no recorded resource usage data for you this semester. This suggests that you may not be fully engaging with the available learning resources, which could impact your overall learning experience.",
      "insights": [
        {
          "title": "Lack of Resource Engagement",
          "description": "You have not utilized any learning resources this semester, indicating a potential gap in your engagement with the course materials.",
          "severity": "high",
          "evidence": [
            {
              "metric": "resource_usage",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "No resources have been accessed."
            }
          ]
        }
      ],
      "educational_implications": [
        "Engaging with a variety of resources can enhance your understanding and retention of course material."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Start exploring different learning resources available on the platform.",
          "rationale": "Using a variety of resources can provide you with different perspectives and improve your overall learning experience."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The absence of data indicates a clear lack of resource engagement.",
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
      "latency_ms": 7620,
      "token_usage": {
        "prompt_tokens": 507,
        "completion_tokens": 282,
        "total_tokens": 789
      },
      "strategy": "behavioral",
      "granularity": "semester",
      "cost_usd": 0.000245
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
