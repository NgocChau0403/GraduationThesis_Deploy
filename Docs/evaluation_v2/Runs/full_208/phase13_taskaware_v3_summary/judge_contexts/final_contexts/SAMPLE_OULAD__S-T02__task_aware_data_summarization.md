# LLM Judge Final Judge Context - SAMPLE_OULAD__S-T02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__S-T02__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__S-T02.json",
      "artifact_sha256": "a1848a3f995f7d5beb2bcfa2fc5eeeb8458cd9832da3ae69a4cc584d044ae3e8",
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
  "evidence_artifact_file_sha256": "a1848a3f995f7d5beb2bcfa2fc5eeeb8458cd9832da3ae69a4cc584d044ae3e8",
  "evidence_rows_sha256": "896873377e2a48764edb518b58c424263fbc7e6f84e09ab69dc3cb9dbd670166",
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
  "embedded_datasets_sha256": "896873377e2a48764edb518b58c424263fbc7e6f84e09ab69dc3cb9dbd670166",
  "datasets": {
    "competency_scores": [
      {
        "competency_tag": "CMA 8",
        "competency_source": "proxy",
        "assessment_type": "CMA",
        "avg_score": 83,
        "pass_rate": 1,
        "assessment_count": 1
      },
      {
        "competency_tag": "CMA 3",
        "competency_source": "proxy",
        "assessment_type": "CMA",
        "avg_score": 87,
        "pass_rate": 1,
        "assessment_count": 1
      },
      {
        "competency_tag": "CMA 5",
        "competency_source": "proxy",
        "assessment_type": "CMA",
        "avg_score": 90,
        "pass_rate": 1,
        "assessment_count": 1
      },
      {
        "competency_tag": "Exam 9",
        "competency_source": "proxy",
        "assessment_type": "Exam",
        "avg_score": 96,
        "pass_rate": 1,
        "assessment_count": 1
      },
      {
        "competency_tag": "CMA 1",
        "competency_source": "proxy",
        "assessment_type": "CMA",
        "avg_score": 100,
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T02__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "48fd35abad0c459ab74e23ca538d1a3222a5d48436a31bbc1d9f5ca44ff6711e",
  "generator_input_sha256": "72fcd53449d16e73c38cc4d15901a56ddd441318c305d77ad2ee5a67c4cea61f",
  "generator_input_compact": {
    "task_id": "S-T02",
    "execution_id": "exec_1781847881158_4c69c270",
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
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "competency_scores"
    ],
    "dataset_row_counts": {
      "competency_scores": 5
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
  "raw_text": "Summary: The distribution of average scores across the competency areas shows that most students are performing well, with scores ranging from 83 to 100. However, there are notable gaps, particularly in the lower scoring areas, which indicate opportunities for improvement.\n\nInsights: Lowest Average Scores: The competency area 'CMA 8' has the lowest average score at 83, indicating it may require the most attention for improvement. | Overall Performance: The average score across all competency areas is 91.2, suggesting that while most students are performing well, there are still areas that can be enhanced.\n\nEducational implications: Focusing on the lower scoring areas can help raise overall competency levels.\n\nRecommendations: high - Prioritize targeted support and resources for 'CMA 8'. - This area has the lowest average score, indicating a significant opportunity for improvement.",
  "structured_payload": {
    "task_id": "S-T02",
    "execution_id": "exec_1781847881158_4c69c270",
    "explanation": {
      "summary": "The distribution of average scores across the competency areas shows that most students are performing well, with scores ranging from 83 to 100. However, there are notable gaps, particularly in the lower scoring areas, which indicate opportunities for improvement.",
      "insights": [
        {
          "title": "Lowest Average Scores",
          "description": "The competency area 'CMA 8' has the lowest average score at 83, indicating it may require the most attention for improvement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 83,
              "comparison": "baseline",
              "delta": null,
              "context": "Lowest score among all competency areas"
            }
          ]
        },
        {
          "title": "Overall Performance",
          "description": "The average score across all competency areas is 91.2, suggesting that while most students are performing well, there are still areas that can be enhanced.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 91.2,
              "comparison": "baseline",
              "delta": null,
              "context": "Mean score across all assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "Focusing on the lower scoring areas can help raise overall competency levels."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Prioritize targeted support and resources for 'CMA 8'.",
          "rationale": "This area has the lowest average score, indicating a significant opportunity for improvement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is consistent and provides a clear view of average scores across competency areas.",
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
    "full_result_row_count": 5,
    "included_row_count": 5,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "competency_scores",
        "row_count": 5,
        "included_row_count": 5
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 5,
    "baseline_reference_tokens": 182,
    "task_aware_prompt_tokens": 737,
    "token_ratio": 4.0495,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (4.0495 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5163,
      "token_usage": {
        "prompt_tokens": 1481,
        "completion_tokens": 408,
        "total_tokens": 1889
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000467
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__S-T02__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "48fd35abad0c459ab74e23ca538d1a3222a5d48436a31bbc1d9f5ca44ff6711e",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1481,
      "completion_tokens": 408,
      "total_tokens": 1889
    },
    "latency_ms": 5169,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T02",
    "execution_id": "exec_1781847881158_4c69c270",
    "explanation": {
      "summary": "The distribution of average scores across the competency areas shows that most students are performing well, with scores ranging from 83 to 100. However, there are notable gaps, particularly in the lower scoring areas, which indicate opportunities for improvement.",
      "insights": [
        {
          "title": "Lowest Average Scores",
          "description": "The competency area 'CMA 8' has the lowest average score at 83, indicating it may require the most attention for improvement.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 83,
              "comparison": "baseline",
              "delta": null,
              "context": "Lowest score among all competency areas"
            }
          ]
        },
        {
          "title": "Overall Performance",
          "description": "The average score across all competency areas is 91.2, suggesting that while most students are performing well, there are still areas that can be enhanced.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 91.2,
              "comparison": "baseline",
              "delta": null,
              "context": "Mean score across all assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "Focusing on the lower scoring areas can help raise overall competency levels."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Prioritize targeted support and resources for 'CMA 8'.",
          "rationale": "This area has the lowest average score, indicating a significant opportunity for improvement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is consistent and provides a clear view of average scores across competency areas.",
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
    "full_result_row_count": 5,
    "included_row_count": 5,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "competency_scores",
        "row_count": 5,
        "included_row_count": 5
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 5,
    "baseline_reference_tokens": 182,
    "task_aware_prompt_tokens": 737,
    "token_ratio": 4.0495,
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
      "Task-aware V3 prompt exceeded the configured soft token ratio (4.0495 > 1.2).",
      "Task-aware V3 prompt remained above the experimental safety ratio after optional evidence trimming; raw rows were preserved."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5163,
      "token_usage": {
        "prompt_tokens": 1481,
        "completion_tokens": 408,
        "total_tokens": 1889
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000467
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
    "observed": "a1848a3f995f7d5beb2bcfa2fc5eeeb8458cd9832da3ae69a4cc584d044ae3e8",
    "expected_values": [
      "a1848a3f995f7d5beb2bcfa2fc5eeeb8458cd9832da3ae69a4cc584d044ae3e8"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "896873377e2a48764edb518b58c424263fbc7e6f84e09ab69dc3cb9dbd670166",
    "expected": "896873377e2a48764edb518b58c424263fbc7e6f84e09ab69dc3cb9dbd670166"
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
        "count": 5,
        "min": 1,
        "max": 1
      },
      "avg_score": {
        "count": 5,
        "min": 83,
        "max": 100
      },
      "pass_rate": {
        "count": 5,
        "min": 1,
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
