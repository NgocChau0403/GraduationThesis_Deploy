# LLM Judge Final Judge Context - SAMPLE_OULAD__A-C05__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-C05__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-C05",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C05__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "df8f38a5d33d3f65bf249207854a9d701d426ec72d0f4c5c993a6db3c28ffcb7",
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
  "raw_text": "Summary: The comparison between the two students reveals significant differences in their academic backgrounds and associated disadvantage scores. Student SAMPLE_OULAD_STU_100788 exhibits a higher level of education and a lower disadvantage score compared to SAMPLE_OULAD_STU_101700, indicating a more favorable structural position.\n\nInsights: Disadvantage Score Comparison: SAMPLE_OULAD_STU_100788 has a significantly lower disadvantage score than SAMPLE_OULAD_STU_101700, suggesting a more advantageous background. | IMD Score Comparison: The IMD score for SAMPLE_OULAD_STU_100788 is significantly higher than that of SAMPLE_OULAD_STU_101700, indicating a better socioeconomic position.\n\nEducational implications: Students with lower disadvantage scores and higher IMD scores may have better access to resources and support, impacting their academic performance.\n\nRecommendations: high - Implement targeted support programs for students with high disadvantage scores. - To help mitigate the structural disadvantages faced by students like SAMPLE_OULAD_STU_101700.",
  "structured_payload": {
    "task_id": "A-C05",
    "execution_id": "exec_1781847669642_4a78c740",
    "explanation": {
      "summary": "The comparison between the two students reveals significant differences in their academic backgrounds and associated disadvantage scores. Student SAMPLE_OULAD_STU_100788 exhibits a higher level of education and a lower disadvantage score compared to SAMPLE_OULAD_STU_101700, indicating a more favorable structural position.",
      "insights": [
        {
          "title": "Disadvantage Score Comparison",
          "description": "SAMPLE_OULAD_STU_100788 has a significantly lower disadvantage score than SAMPLE_OULAD_STU_101700, suggesting a more advantageous background.",
          "severity": "high",
          "evidence": [
            {
              "metric": "disadvantage_score",
              "value": 0.075,
              "comparison": "baseline",
              "delta": -0.65,
              "context": "SAMPLE_OULAD_STU_101700 has a disadvantage score of 0.725"
            }
          ]
        },
        {
          "title": "IMD Score Comparison",
          "description": "The IMD score for SAMPLE_OULAD_STU_100788 is significantly higher than that of SAMPLE_OULAD_STU_101700, indicating a better socioeconomic position.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "imd_score_numeric",
              "value": 85,
              "comparison": "baseline",
              "delta": 70,
              "context": "SAMPLE_OULAD_STU_101700 has an IMD score of 15"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students with lower disadvantage scores and higher IMD scores may have better access to resources and support, impacting their academic performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students with high disadvantage scores.",
          "rationale": "To help mitigate the structural disadvantages faced by students like SAMPLE_OULAD_STU_101700."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and directly comparable between the two students.",
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
      "latency_ms": 8617,
      "token_usage": {
        "prompt_tokens": 743,
        "completion_tokens": 473,
        "total_tokens": 1216
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000395
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-C05__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "df8f38a5d33d3f65bf249207854a9d701d426ec72d0f4c5c993a6db3c28ffcb7",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 743,
      "completion_tokens": 473,
      "total_tokens": 1216
    },
    "latency_ms": 8621,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-C05",
    "execution_id": "exec_1781847669642_4a78c740",
    "explanation": {
      "summary": "The comparison between the two students reveals significant differences in their academic backgrounds and associated disadvantage scores. Student SAMPLE_OULAD_STU_100788 exhibits a higher level of education and a lower disadvantage score compared to SAMPLE_OULAD_STU_101700, indicating a more favorable structural position.",
      "insights": [
        {
          "title": "Disadvantage Score Comparison",
          "description": "SAMPLE_OULAD_STU_100788 has a significantly lower disadvantage score than SAMPLE_OULAD_STU_101700, suggesting a more advantageous background.",
          "severity": "high",
          "evidence": [
            {
              "metric": "disadvantage_score",
              "value": 0.075,
              "comparison": "baseline",
              "delta": -0.65,
              "context": "SAMPLE_OULAD_STU_101700 has a disadvantage score of 0.725"
            }
          ]
        },
        {
          "title": "IMD Score Comparison",
          "description": "The IMD score for SAMPLE_OULAD_STU_100788 is significantly higher than that of SAMPLE_OULAD_STU_101700, indicating a better socioeconomic position.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "imd_score_numeric",
              "value": 85,
              "comparison": "baseline",
              "delta": 70,
              "context": "SAMPLE_OULAD_STU_101700 has an IMD score of 15"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students with lower disadvantage scores and higher IMD scores may have better access to resources and support, impacting their academic performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support programs for students with high disadvantage scores.",
          "rationale": "To help mitigate the structural disadvantages faced by students like SAMPLE_OULAD_STU_101700."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and directly comparable between the two students.",
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
      "latency_ms": 8617,
      "token_usage": {
        "prompt_tokens": 743,
        "completion_tokens": 473,
        "total_tokens": 1216
      },
      "strategy": "comparison",
      "granularity": "semester",
      "cost_usd": 0.000395
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
