# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T02__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T02",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Competency gap analysis",
  "scope": "1 student",
  "actionable_question": "Which skill area should I prioritise for improvement?",
  "target_audience": "student",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Highlight which competency tags have lowest avg scores. Suggest focus areas.",
  "query_labels": [
    "competency_scores"
  ],
  "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
  "source_tables": [
    "assessment_result",
    "assessment"
  ],
  "key_db_fields": [
    "competency_tag",
    "score_normalized",
    "pass_flag",
    "assessment_type"
  ],
  "output_schema": {
    "required_columns": [
      "competency_tag",
      "avg_score"
    ],
    "optional_columns": [
      "competency_source",
      "assessment_type",
      "pass_rate",
      "assessment_count"
    ]
  },
  "query_labels": [
    "competency_scores"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T02-CORE-01",
      "description": "Identify the competency tags with the lowest average scores."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "S-T02-SUPPORT-01",
      "description": "Suggest focus areas grounded in the identified competency gaps."
    }
  ],
  "evaluation_constraints": [],
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
      "dataset_label": "competency_scores",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T02.json",
      "artifact_sha256": "34ab141b25ca16b9dd8c3f52e25e38008147db8849cc648c9c63f78473a18ff9",
      "row_count": 3,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 3,
  "prompt_embedded_row_count": 3,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "34ab141b25ca16b9dd8c3f52e25e38008147db8849cc648c9c63f78473a18ff9",
  "evidence_rows_sha256": "016f1ef73ee0b3892d1908447134b38adc14c61f3c8514df1cb77ab5b91eb41f",
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
  "full_result_row_count": 3,
  "embedded_datasets_sha256": "016f1ef73ee0b3892d1908447134b38adc14c61f3c8514df1cb77ab5b91eb41f",
  "datasets": {
    "competency_scores": [
      {
        "competency_tag": "G1",
        "competency_source": "proxy",
        "assessment_type": "quiz",
        "avg_score": 0,
        "pass_rate": 0,
        "assessment_count": 1
      },
      {
        "competency_tag": "G2",
        "competency_source": "proxy",
        "assessment_type": "quiz",
        "avg_score": 55,
        "pass_rate": 1,
        "assessment_count": 1
      },
      {
        "competency_tag": "G3",
        "competency_source": "proxy",
        "assessment_type": "exam",
        "avg_score": 55,
        "pass_rate": 1,
        "assessment_count": 1
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T02__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "d6afd8b7c4381aaadac80d224e3b7230e82c7235b2d3d0a356dd9dbfa101528f",
  "generator_input_sha256": "d5b682b90be2ea27b01f94a6ed45951c1e37544a03eb8c70feaa046297c99118",
  "generator_input_compact": {
    "task_id": "S-T02",
    "execution_id": "exec_1781847241808_0a627cbd",
    "task_name": "Competency gap analysis",
    "analysis_type": "distribution",
    "explanation_strategy": "distribution",
    "actionable_question": "Which skill area should I prioritise for improvement?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "competency_scores"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "competency_scores"
    ],
    "dataset_row_counts": {
      "competency_scores": 3
    },
    "ai_summary_config_summary": {
      "summary_type": "ranking",
      "metric_column": "avg_score",
      "entity_column": "competency_tag",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": "asc",
      "top_k": 5,
      "bottom_k": 3,
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
  "raw_text": "Summary: The distribution of scores shows a clear gap in competency area G1, where students scored significantly lower than in G2 and G3. Most students are performing well in G2 and G3, but G1 needs urgent attention.\n\nInsights: Significant Gap in G1: G1 has an average score of 0, indicating that students are struggling in this area. This is a stark contrast to G2 and G3, both of which have average scores of 55.\n\nEducational implications: Focusing on G1 will help raise overall competency levels and ensure students are not left behind.\n\nRecommendations: high - Implement targeted support and resources for G1. - Addressing the gap in G1 will provide students with the foundational skills they need to succeed in other areas.",
  "structured_payload": {
    "task_id": "S-T02",
    "execution_id": "exec_1781847241808_0a627cbd",
    "explanation": {
      "summary": "The distribution of scores shows a clear gap in competency area G1, where students scored significantly lower than in G2 and G3. Most students are performing well in G2 and G3, but G1 needs urgent attention.",
      "insights": [
        {
          "title": "Significant Gap in G1",
          "description": "G1 has an average score of 0, indicating that students are struggling in this area. This is a stark contrast to G2 and G3, both of which have average scores of 55.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 0,
              "comparison": "trough",
              "delta": null,
              "context": "Lowest score among all competency areas"
            }
          ]
        }
      ],
      "educational_implications": [
        "Focusing on G1 will help raise overall competency levels and ensure students are not left behind."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support and resources for G1.",
          "rationale": "Addressing the gap in G1 will provide students with the foundational skills they need to succeed in other areas."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly shows a significant disparity in average scores across competency areas.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "ranking",
    "ai_summary_method_warning": null,
    "full_result_row_count": 3,
    "included_row_count": 3,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "competency_scores",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 3,
    "baseline_reference_tokens": 111,
    "task_aware_prompt_tokens": 586,
    "token_ratio": 5.2793,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (5.2793 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4356,
      "token_usage": {
        "prompt_tokens": 1266,
        "completion_tokens": 318,
        "total_tokens": 1584
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000381
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T02__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "d6afd8b7c4381aaadac80d224e3b7230e82c7235b2d3d0a356dd9dbfa101528f",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1266,
      "completion_tokens": 318,
      "total_tokens": 1584
    },
    "latency_ms": 4362,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T02",
    "execution_id": "exec_1781847241808_0a627cbd",
    "explanation": {
      "summary": "The distribution of scores shows a clear gap in competency area G1, where students scored significantly lower than in G2 and G3. Most students are performing well in G2 and G3, but G1 needs urgent attention.",
      "insights": [
        {
          "title": "Significant Gap in G1",
          "description": "G1 has an average score of 0, indicating that students are struggling in this area. This is a stark contrast to G2 and G3, both of which have average scores of 55.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 0,
              "comparison": "trough",
              "delta": null,
              "context": "Lowest score among all competency areas"
            }
          ]
        }
      ],
      "educational_implications": [
        "Focusing on G1 will help raise overall competency levels and ensure students are not left behind."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support and resources for G1.",
          "rationale": "Addressing the gap in G1 will provide students with the foundational skills they need to succeed in other areas."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data clearly shows a significant disparity in average scores across competency areas.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "ranking",
    "ai_summary_method_warning": null,
    "full_result_row_count": 3,
    "included_row_count": 3,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "competency_scores",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 3,
    "baseline_reference_tokens": 111,
    "task_aware_prompt_tokens": 586,
    "token_ratio": 5.2793,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (5.2793 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4356,
      "token_usage": {
        "prompt_tokens": 1266,
        "completion_tokens": 318,
        "total_tokens": 1584
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000381
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
    "expected": 3,
    "observed": 3
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "34ab141b25ca16b9dd8c3f52e25e38008147db8849cc648c9c63f78473a18ff9",
    "expected_values": [
      "34ab141b25ca16b9dd8c3f52e25e38008147db8849cc648c9c63f78473a18ff9"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "016f1ef73ee0b3892d1908447134b38adc14c61f3c8514df1cb77ab5b91eb41f",
    "expected": "016f1ef73ee0b3892d1908447134b38adc14c61f3c8514df1cb77ab5b91eb41f"
  },
  {
    "check_id": "numeric_fields_competency_scores",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "competency_scores",
    "numeric_columns": [
      "assessment_count",
      "avg_score",
      "pass_rate"
    ],
    "numeric_summaries": {
      "assessment_count": {
        "count": 3,
        "min": 1,
        "max": 1
      },
      "avg_score": {
        "count": 3,
        "min": 0,
        "max": 55
      },
      "pass_rate": {
        "count": 3,
        "min": 0,
        "max": 1
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_competency_scores",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "competency_scores",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
