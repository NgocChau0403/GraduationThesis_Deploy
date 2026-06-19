# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-C05__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-C05__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-C05",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Compare academic background",
  "scope": "2 students",
  "actionable_question": "Does one student face more structural disadvantage than the other?",
  "target_audience": "academic_advisor",
  "ai_summary_type": "multi_metric_comparison",
  "ai_prompt_hint": "Identify background-driven performance differences. Avoid causal claims.",
  "query_labels": [
    "background_comparison"
  ],
  "explanation_strategy": "comparison"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "enrollment"
  ],
  "key_db_fields": [
    "highest_education",
    "previous_attempt_count",
    "imd_score_numeric",
    "socioeconomic_band",
    "disability_flag",
    "disadvantage_score [FE single]",
    "support_score [FE single]",
    "family_stability_score [FE single]"
  ],
  "output_schema": {},
  "query_labels": [
    "background_comparison"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-C05-CORE-01",
      "description": "Identify background-driven performance differences."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-C05-CONSTRAINT-01",
      "description": "Avoid causal claims."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "background_comparison",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-C05.json",
      "artifact_sha256": "16a72c8aeb422fd6828703a33c5b3188d70812acd57a7a65c57dfdebfb8743fb",
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
  "evidence_artifact_file_sha256": "16a72c8aeb422fd6828703a33c5b3188d70812acd57a7a65c57dfdebfb8743fb",
  "evidence_rows_sha256": "3f87de9f868d8be1efe30bc019d3f72eac94a14d4e620bf248f72b9ed7a58285",
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
  "embedded_datasets_sha256": "3f87de9f868d8be1efe30bc019d3f72eac94a14d4e620bf248f72b9ed7a58285",
  "datasets": {
    "background_comparison": [
      {
        "student_id": "SAMPLE_OULAD_STU_100788",
        "highest_education": "HE Qualification",
        "previous_attempt_count": 1,
        "imd_score_numeric": 85,
        "socioeconomic_band": "80-90%",
        "disability_flag": false,
        "disadvantage_score": 0.075,
        "support_score": 0,
        "family_stability_score": null,
        "mother_education_level": null,
        "father_education_level": null
      },
      {
        "student_id": "SAMPLE_OULAD_STU_101700",
        "highest_education": "A Level or Equivalent",
        "previous_attempt_count": 0,
        "imd_score_numeric": 15,
        "socioeconomic_band": "10-20",
        "disability_flag": true,
        "disadvantage_score": 0.725,
        "support_score": 0,
        "family_stability_score": null,
        "mother_education_level": null,
        "father_education_level": null
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C05__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "2248b54aa0a65e16688d28ae2332949e0d367768bcfc88945b2cb44e3238853a",
  "generator_input_sha256": "9daeff076e8a9f63e19b891f9d4489f861a60f0be52a315f6174fb94dcf6e75a",
  "generator_input_compact": {
    "task_id": "A-C05",
    "execution_id": "exec_1781847669642_4a78c740",
    "task_name": "Compare academic background",
    "analysis_type": "comparison",
    "explanation_strategy": "comparison",
    "actionable_question": "Does one student face more structural disadvantage than the other?",
    "target_audience": [
      "academic_advisor"
    ],
    "query_labels": [
      "background_comparison"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "background_comparison"
    ],
    "dataset_row_counts": {
      "background_comparison": 2
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
      "require_sensitive_context_policy": true,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: The comparison of academic backgrounds reveals significant differences in socioeconomic status and disadvantage scores between the two students. These factors may contribute to varying levels of structural disadvantage.\n\nInsights: Socioeconomic Band Disparity: Student SAMPLE_OULAD_STU_100788 belongs to a higher socioeconomic band compared to SAMPLE_OULAD_STU_101700, which may indicate better access to resources. | Disadvantage Score Comparison: The disadvantage score for SAMPLE_OULAD_STU_101700 is significantly higher than that of SAMPLE_OULAD_STU_100788, indicating a greater structural disadvantage.\n\nEducational implications: Students from lower socioeconomic backgrounds may require additional support to succeed academically.\n\nRecommendations: high - Implement targeted support programs for students with high disadvantage scores. - To address the structural barriers faced by students like SAMPLE_OULAD_STU_101700.",
  "structured_payload": {
    "task_id": "A-C05",
    "execution_id": "exec_1781847669642_4a78c740",
    "explanation": {
      "summary": "The comparison of academic backgrounds reveals significant differences in socioeconomic status and disadvantage scores between the two students. These factors may contribute to varying levels of structural disadvantage.",
      "insights": [
        {
          "title": "Socioeconomic Band Disparity",
          "description": "Student SAMPLE_OULAD_STU_100788 belongs to a higher socioeconomic band compared to SAMPLE_OULAD_STU_101700, which may indicate better access to resources.",
          "severity": "high",
          "evidence": [
            {
              "metric": "socioeconomic_band",
              "value": "80-90%",
              "comparison": "baseline",
              "delta": null,
              "context": "Higher socioeconomic band indicates better resources."
            },
            {
              "metric": "socioeconomic_band",
              "value": "10-20",
              "comparison": "baseline",
              "delta": null,
              "context": "Lower socioeconomic band indicates limited resources."
            }
          ]
        },
        {
          "title": "Disadvantage Score Comparison",
          "description": "The disadvantage score for SAMPLE_OULAD_STU_101700 is significantly higher than that of SAMPLE_OULAD_STU_100788, indicating a greater structural disadvantage.",
          "severity": "high",
          "evidence": [
            {
              "metric": "disadvantage_score",
              "value": 0.075,
              "comparison": "baseline",
              "delta": null,
              "context": "Lower disadvantage score suggests fewer barriers."
            },
            {
              "metric": "disadvantage_score",
              "value": 0.725,
              "comparison": "baseline",
              "delta": null,
              "context": "Higher disadvantage score suggests more barriers."
            }
          ]
        }
      ],
      "educational_implications": [
        "Students from lower socioeconomic backgrounds may require additional support to succeed academically."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students with high disadvantage scores.",
          "rationale": "To address the structural barriers faced by students like SAMPLE_OULAD_STU_101700."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and directly relevant to the analysis.",
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
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "background_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8808,
      "token_usage": {
        "prompt_tokens": 895,
        "completion_tokens": 507,
        "total_tokens": 1402
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000438
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C05__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "2248b54aa0a65e16688d28ae2332949e0d367768bcfc88945b2cb44e3238853a",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 895,
      "completion_tokens": 507,
      "total_tokens": 1402
    },
    "latency_ms": 8818,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C05",
    "execution_id": "exec_1781847669642_4a78c740",
    "explanation": {
      "summary": "The comparison of academic backgrounds reveals significant differences in socioeconomic status and disadvantage scores between the two students. These factors may contribute to varying levels of structural disadvantage.",
      "insights": [
        {
          "title": "Socioeconomic Band Disparity",
          "description": "Student SAMPLE_OULAD_STU_100788 belongs to a higher socioeconomic band compared to SAMPLE_OULAD_STU_101700, which may indicate better access to resources.",
          "severity": "high",
          "evidence": [
            {
              "metric": "socioeconomic_band",
              "value": "80-90%",
              "comparison": "baseline",
              "delta": null,
              "context": "Higher socioeconomic band indicates better resources."
            },
            {
              "metric": "socioeconomic_band",
              "value": "10-20",
              "comparison": "baseline",
              "delta": null,
              "context": "Lower socioeconomic band indicates limited resources."
            }
          ]
        },
        {
          "title": "Disadvantage Score Comparison",
          "description": "The disadvantage score for SAMPLE_OULAD_STU_101700 is significantly higher than that of SAMPLE_OULAD_STU_100788, indicating a greater structural disadvantage.",
          "severity": "high",
          "evidence": [
            {
              "metric": "disadvantage_score",
              "value": 0.075,
              "comparison": "baseline",
              "delta": null,
              "context": "Lower disadvantage score suggests fewer barriers."
            },
            {
              "metric": "disadvantage_score",
              "value": 0.725,
              "comparison": "baseline",
              "delta": null,
              "context": "Higher disadvantage score suggests more barriers."
            }
          ]
        }
      ],
      "educational_implications": [
        "Students from lower socioeconomic backgrounds may require additional support to succeed academically."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students with high disadvantage scores.",
          "rationale": "To address the structural barriers faced by students like SAMPLE_OULAD_STU_101700."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and directly relevant to the analysis.",
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
    "full_result_row_count": 2,
    "included_row_count": 2,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "background_comparison",
        "row_count": 2,
        "included_row_count": 2
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 8808,
      "token_usage": {
        "prompt_tokens": 895,
        "completion_tokens": 507,
        "total_tokens": 1402
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000438
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
    "observed": "16a72c8aeb422fd6828703a33c5b3188d70812acd57a7a65c57dfdebfb8743fb",
    "expected_values": [
      "16a72c8aeb422fd6828703a33c5b3188d70812acd57a7a65c57dfdebfb8743fb"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "3f87de9f868d8be1efe30bc019d3f72eac94a14d4e620bf248f72b9ed7a58285",
    "expected": "3f87de9f868d8be1efe30bc019d3f72eac94a14d4e620bf248f72b9ed7a58285"
  },
  {
    "check_id": "numeric_fields_background_comparison",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "background_comparison",
    "numeric_columns": [
      "disadvantage_score",
      "imd_score_numeric",
      "previous_attempt_count",
      "support_score"
    ],
    "numeric_summaries": {
      "disadvantage_score": {
        "count": 2,
        "min": 0.075,
        "max": 0.725
      },
      "imd_score_numeric": {
        "count": 2,
        "min": 15,
        "max": 85
      },
      "previous_attempt_count": {
        "count": 2,
        "min": 0,
        "max": 1
      },
      "support_score": {
        "count": 2,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_background_comparison",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "background_comparison",
    "flag_columns": [
      "disability_flag"
    ],
    "triggered_like_counts": {
      "disability_flag": 1
    }
  }
]
```
