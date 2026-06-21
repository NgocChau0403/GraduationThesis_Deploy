# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T02__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2_PHASE13_SAUFIX_EXECUTABLE_ONLY.md`
- Prompt SHA-256: `8ae00287d6a8e9c23c769c97b4d11aa90e05e9126f8cd3e71fcef74500d6f48f`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T02__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_phase13_saufix_executable_only__SAMPLE_UCI_POR",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T02",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_phase13_saufix_action_correction_v1",
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T02__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "08661f8f0f9fdb14ac9253d3caeefc6bf91587e8dbee59d8600413c0a4afdf61",
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
  "raw_text": "Summary: The distribution of scores shows a clear gap in the G1 competency area, where the average score is significantly lower than the others. Most students are performing well in G2 and G3, but G1 needs immediate attention.\n\nInsights: Significant Gap in G1: G1 has an average score of 0 and a pass rate of 0, indicating that students are struggling in this area. This is a notable outlier compared to G2 and G3, which both have average scores of 55 and pass rates of 100%.\n\nEducational implications: Focusing on G1 will help improve overall competency and confidence in assessments.\n\nRecommendations: high - Implement targeted support for G1 - Addressing the gaps in G1 will help students achieve better outcomes and improve their overall performance.",
  "structured_payload": {
    "task_id": "S-T02",
    "execution_id": "exec_1781847241808_0a627cbd",
    "explanation": {
      "summary": "The distribution of scores shows a clear gap in the G1 competency area, where the average score is significantly lower than the others. Most students are performing well in G2 and G3, but G1 needs immediate attention.",
      "insights": [
        {
          "title": "Significant Gap in G1",
          "description": "G1 has an average score of 0 and a pass rate of 0, indicating that students are struggling in this area. This is a notable outlier compared to G2 and G3, which both have average scores of 55 and pass rates of 100%.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 0,
              "comparison": "trough",
              "delta": null,
              "context": "G1 has the lowest average score"
            }
          ]
        }
      ],
      "educational_implications": [
        "Focusing on G1 will help improve overall competency and confidence in assessments."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support for G1",
          "rationale": "Addressing the gaps in G1 will help students achieve better outcomes and improve their overall performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is clear and shows a distinct gap in performance.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
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
      "latency_ms": 7027,
      "token_usage": {
        "prompt_tokens": 745,
        "completion_tokens": 322,
        "total_tokens": 1067
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000305
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T02__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "08661f8f0f9fdb14ac9253d3caeefc6bf91587e8dbee59d8600413c0a4afdf61",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 745,
      "completion_tokens": 322,
      "total_tokens": 1067
    },
    "latency_ms": 7032,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "S-T02",
    "execution_id": "exec_1781847241808_0a627cbd",
    "explanation": {
      "summary": "The distribution of scores shows a clear gap in the G1 competency area, where the average score is significantly lower than the others. Most students are performing well in G2 and G3, but G1 needs immediate attention.",
      "insights": [
        {
          "title": "Significant Gap in G1",
          "description": "G1 has an average score of 0 and a pass rate of 0, indicating that students are struggling in this area. This is a notable outlier compared to G2 and G3, which both have average scores of 55 and pass rates of 100%.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 0,
              "comparison": "trough",
              "delta": null,
              "context": "G1 has the lowest average score"
            }
          ]
        }
      ],
      "educational_implications": [
        "Focusing on G1 will help improve overall competency and confidence in assessments."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support for G1",
          "rationale": "Addressing the gaps in G1 will help students achieve better outcomes and improve their overall performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is clear and shows a distinct gap in performance.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "distribution",
    "explanation_type": "distribution",
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
      "latency_ms": 7027,
      "token_usage": {
        "prompt_tokens": 745,
        "completion_tokens": 322,
        "total_tokens": 1067
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000305
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
