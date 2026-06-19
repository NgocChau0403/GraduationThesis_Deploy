# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-C02__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-C02",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
}
```

## Task Context

```json
{
  "task_name": "Compare engagement patterns",
  "scope": "2 students",
  "actionable_question": "Which student is more engaged across total clicks, active days, and combined engagement score?",
  "target_audience": "instructor",
  "ai_summary_type": "multi_metric_comparison",
  "ai_prompt_hint": "Compare the two students using metric, engagement_score, total_clicks, and active_days. Explain which engagement dimension creates the largest gap. Do not infer academic risk unless risk fields are present.",
  "query_labels": [
    "engagement_comparison"
  ],
  "explanation_strategy": "comparison"
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
    "metric [FE cross]",
    "engagement_score [FE cross]",
    "study_effort_level [FE cross]",
    "total_clicks",
    "active_days"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "metric",
      "engagement_score"
    ],
    "optional_columns": [
      "total_clicks",
      "active_days",
      "study_effort_level"
    ]
  },
  "query_labels": [
    "engagement_comparison"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-C02-CORE-01",
      "description": "Compare the two students using metric, engagement_score, total_clicks, and active_days."
    },
    {
      "requirement_id": "A-C02-CORE-02",
      "description": "Explain which engagement dimension creates the largest gap."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-C02-CONSTRAINT-01",
      "description": "Do not infer academic risk unless risk fields are present."
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
      "dataset_label": "engagement_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-C02.json",
      "artifact_sha256": "50dbf2b26533fa4ebe56b58d2944964f77899add440cad68e7439c28620de178",
      "row_count": 6,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 6,
  "prompt_embedded_row_count": 6,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "50dbf2b26533fa4ebe56b58d2944964f77899add440cad68e7439c28620de178",
  "evidence_rows_sha256": "1e9644a1b7e6385caa75480aa65e5ca5a91e648dbd563b160fd5623f58076440",
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
  "full_result_row_count": 6,
  "embedded_datasets_sha256": "1e9644a1b7e6385caa75480aa65e5ca5a91e648dbd563b160fd5623f58076440",
  "datasets": {
    "engagement_comparison": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "metric": "active_days_norm",
        "engagement_score": 0,
        "total_clicks": 0,
        "active_days": 0,
        "study_effort_level": "very_low"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "metric": "engagement_score",
        "engagement_score": 0,
        "total_clicks": 0,
        "active_days": 0,
        "study_effort_level": "very_low"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "metric": "total_clicks_norm",
        "engagement_score": 0,
        "total_clicks": 0,
        "active_days": 0,
        "study_effort_level": "very_low"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "metric": "active_days_norm",
        "engagement_score": 0,
        "total_clicks": 0,
        "active_days": 0,
        "study_effort_level": "very_low"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "metric": "engagement_score",
        "engagement_score": 0,
        "total_clicks": 0,
        "active_days": 0,
        "study_effort_level": "very_low"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "metric": "total_clicks_norm",
        "engagement_score": 0,
        "total_clicks": 0,
        "active_days": 0,
        "study_effort_level": "very_low"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C02__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "fc9ba68a271a855b735ef1d2c6763e5521bc7c63cedb980d6653fa86740cb55f",
  "generator_input_sha256": "7a261bbfb75544d4da601712605675fd0a93c24150f84ed0bda03df703913ce5",
  "generator_input_compact": {
    "task_id": "A-C02",
    "execution_id": "exec_1781847231965_643f380f",
    "task_name": "Compare engagement patterns",
    "analysis_type": "comparison",
    "explanation_strategy": "comparison",
    "actionable_question": "Which student is more engaged across total clicks, active days, and combined engagement score?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "engagement_comparison"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "engagement_comparison"
    ],
    "dataset_row_counts": {
      "engagement_comparison": 6
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
  "raw_text": "Summary: The engagement analysis reveals that both students exhibit identical engagement patterns, with no active days, total clicks, or engagement scores recorded. This indicates a lack of engagement across the board.\n\nInsights: Identical Engagement Levels: Both students demonstrate a complete lack of engagement, as evidenced by their metrics showing zero active days, total clicks, and engagement scores.\n\nEducational implications: The lack of engagement suggests a need for immediate intervention to stimulate student participation.\n\nRecommendations: high - Implement targeted outreach strategies to engage students. - Given the complete lack of engagement, proactive measures are necessary to encourage participation and improve learning outcomes.",
  "structured_payload": {
    "task_id": "A-C02",
    "execution_id": "exec_1781847231965_643f380f",
    "explanation": {
      "summary": "The engagement analysis reveals that both students exhibit identical engagement patterns, with no active days, total clicks, or engagement scores recorded. This indicates a lack of engagement across the board.",
      "insights": [
        {
          "title": "Identical Engagement Levels",
          "description": "Both students demonstrate a complete lack of engagement, as evidenced by their metrics showing zero active days, total clicks, and engagement scores.",
          "severity": "high",
          "evidence": [
            {
              "metric": "active_days",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have not engaged in any active days."
            },
            {
              "metric": "total_clicks",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have not made any clicks."
            },
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have an engagement score of zero."
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of engagement suggests a need for immediate intervention to stimulate student participation."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted outreach strategies to engage students.",
          "rationale": "Given the complete lack of engagement, proactive measures are necessary to encourage participation and improve learning outcomes."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset clearly indicates zero engagement metrics for both students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_comparison",
        "row_count": 6,
        "included_row_count": 6
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6975,
      "token_usage": {
        "prompt_tokens": 1109,
        "completion_tokens": 377,
        "total_tokens": 1486
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000393
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C02__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "fc9ba68a271a855b735ef1d2c6763e5521bc7c63cedb980d6653fa86740cb55f",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1109,
      "completion_tokens": 377,
      "total_tokens": 1486
    },
    "latency_ms": 7020,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C02",
    "execution_id": "exec_1781847231965_643f380f",
    "explanation": {
      "summary": "The engagement analysis reveals that both students exhibit identical engagement patterns, with no active days, total clicks, or engagement scores recorded. This indicates a lack of engagement across the board.",
      "insights": [
        {
          "title": "Identical Engagement Levels",
          "description": "Both students demonstrate a complete lack of engagement, as evidenced by their metrics showing zero active days, total clicks, and engagement scores.",
          "severity": "high",
          "evidence": [
            {
              "metric": "active_days",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have not engaged in any active days."
            },
            {
              "metric": "total_clicks",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have not made any clicks."
            },
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": 0,
              "context": "Both students have an engagement score of zero."
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of engagement suggests a need for immediate intervention to stimulate student participation."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted outreach strategies to engage students.",
          "rationale": "Given the complete lack of engagement, proactive measures are necessary to encourage participation and improve learning outcomes."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset clearly indicates zero engagement metrics for both students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_comparison",
        "row_count": 6,
        "included_row_count": 6
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6975,
      "token_usage": {
        "prompt_tokens": 1109,
        "completion_tokens": 377,
        "total_tokens": 1486
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000393
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
    "expected": 6,
    "observed": 6
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "50dbf2b26533fa4ebe56b58d2944964f77899add440cad68e7439c28620de178",
    "expected_values": [
      "50dbf2b26533fa4ebe56b58d2944964f77899add440cad68e7439c28620de178"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "1e9644a1b7e6385caa75480aa65e5ca5a91e648dbd563b160fd5623f58076440",
    "expected": "1e9644a1b7e6385caa75480aa65e5ca5a91e648dbd563b160fd5623f58076440"
  },
  {
    "check_id": "numeric_fields_engagement_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "engagement_comparison",
    "numeric_columns": [
      "active_days",
      "engagement_score",
      "total_clicks"
    ],
    "numeric_summaries": {
      "active_days": {
        "count": 6,
        "min": 0,
        "max": 0
      },
      "engagement_score": {
        "count": 6,
        "min": 0,
        "max": 0
      },
      "total_clicks": {
        "count": 6,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_engagement_comparison",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "engagement_comparison",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
