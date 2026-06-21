# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-C02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-C02__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-C02",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C02__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "4c438f6155803865c49c1509c4279bbb8ab031345a85bfd66da0f3d344b68891",
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
  "raw_text": "Summary: Both students, SAMPLE_UCI_POR_STU_000001 and SAMPLE_UCI_POR_STU_000002, exhibit identical engagement patterns with no recorded activity across all metrics. This indicates a uniform lack of engagement among the students.\n\nInsights: Uniform Lack of Engagement: Both students have an engagement score of 0, indicating no engagement in the course activities. | No Active Days Recorded: Neither student has recorded any active days, suggesting a complete absence of participation. | Zero Total Clicks: Both students have a total clicks count of 0, further confirming their lack of interaction with course materials.\n\nEducational implications: The lack of engagement metrics suggests a need for immediate intervention to stimulate student participation.\n\nRecommendations: high - Implement targeted outreach to both students to understand barriers to engagement. - Understanding the reasons behind the lack of engagement can help tailor interventions to improve participation. | high - Introduce interactive elements in the course to encourage student engagement. - Engaging content can motivate students to participate and improve their interaction metrics.",
  "structured_payload": {
    "task_id": "A-C02",
    "execution_id": "exec_1781847231965_643f380f",
    "explanation": {
      "summary": "Both students, SAMPLE_UCI_POR_STU_000001 and SAMPLE_UCI_POR_STU_000002, exhibit identical engagement patterns with no recorded activity across all metrics. This indicates a uniform lack of engagement among the students.",
      "insights": [
        {
          "title": "Uniform Lack of Engagement",
          "description": "Both students have an engagement score of 0, indicating no engagement in the course activities.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Both students show no engagement."
            }
          ]
        },
        {
          "title": "No Active Days Recorded",
          "description": "Neither student has recorded any active days, suggesting a complete absence of participation.",
          "severity": "high",
          "evidence": [
            {
              "metric": "active_days",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Both students have 0 active days."
            }
          ]
        },
        {
          "title": "Zero Total Clicks",
          "description": "Both students have a total clicks count of 0, further confirming their lack of interaction with course materials.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_clicks",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Both students have 0 total clicks."
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of engagement metrics suggests a need for immediate intervention to stimulate student participation."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted outreach to both students to understand barriers to engagement.",
          "rationale": "Understanding the reasons behind the lack of engagement can help tailor interventions to improve participation."
        },
        {
          "priority": "high",
          "action": "Introduce interactive elements in the course to encourage student engagement.",
          "rationale": "Engaging content can motivate students to participate and improve their interaction metrics."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is consistent across both students, providing a clear picture of engagement levels.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "multi_metric_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_comparison",
        "row_count": 6,
        "included_row_count": 6
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 6,
    "baseline_reference_tokens": 310,
    "task_aware_prompt_tokens": 979,
    "token_ratio": 3.1581,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.missing_expected_entities",
      "comparison.metric_extrema",
      "comparison.pairwise_gaps"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.1581 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7006,
      "token_usage": {
        "prompt_tokens": 1647,
        "completion_tokens": 535,
        "total_tokens": 2182
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000568
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-C02__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "4c438f6155803865c49c1509c4279bbb8ab031345a85bfd66da0f3d344b68891",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1647,
      "completion_tokens": 535,
      "total_tokens": 2182
    },
    "latency_ms": 7013,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C02",
    "execution_id": "exec_1781847231965_643f380f",
    "explanation": {
      "summary": "Both students, SAMPLE_UCI_POR_STU_000001 and SAMPLE_UCI_POR_STU_000002, exhibit identical engagement patterns with no recorded activity across all metrics. This indicates a uniform lack of engagement among the students.",
      "insights": [
        {
          "title": "Uniform Lack of Engagement",
          "description": "Both students have an engagement score of 0, indicating no engagement in the course activities.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Both students show no engagement."
            }
          ]
        },
        {
          "title": "No Active Days Recorded",
          "description": "Neither student has recorded any active days, suggesting a complete absence of participation.",
          "severity": "high",
          "evidence": [
            {
              "metric": "active_days",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Both students have 0 active days."
            }
          ]
        },
        {
          "title": "Zero Total Clicks",
          "description": "Both students have a total clicks count of 0, further confirming their lack of interaction with course materials.",
          "severity": "high",
          "evidence": [
            {
              "metric": "total_clicks",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Both students have 0 total clicks."
            }
          ]
        }
      ],
      "educational_implications": [
        "The lack of engagement metrics suggests a need for immediate intervention to stimulate student participation."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted outreach to both students to understand barriers to engagement.",
          "rationale": "Understanding the reasons behind the lack of engagement can help tailor interventions to improve participation."
        },
        {
          "priority": "high",
          "action": "Introduce interactive elements in the course to encourage student engagement.",
          "rationale": "Engaging content can motivate students to participate and improve their interaction metrics."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is consistent across both students, providing a clear picture of engagement levels.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "comparison",
    "explanation_type": "comparison",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "multi_metric_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 6,
    "included_row_count": 6,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "engagement_comparison",
        "row_count": 6,
        "included_row_count": 6
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 6,
    "baseline_reference_tokens": 310,
    "task_aware_prompt_tokens": 979,
    "token_ratio": 3.1581,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "limitations.causal_claim_allowed",
      "limitations.missing_expected_entities",
      "comparison.metric_extrema",
      "comparison.pairwise_gaps"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (3.1581 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 7006,
      "token_usage": {
        "prompt_tokens": 1647,
        "completion_tokens": 535,
        "total_tokens": 2182
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000568
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
