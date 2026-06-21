# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G04__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2_PHASE13_SAUFIX_EXECUTABLE_ONLY.md`
- Prompt SHA-256: `8ae00287d6a8e9c23c769c97b4d11aa90e05e9126f8cd3e71fcef74500d6f48f`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G04__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_phase13_saufix_executable_only__SAMPLE_UCI_POR",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G04",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_phase13_saufix_action_correction_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Assessment difficulty analysis",
  "scope": "Many students",
  "actionable_question": "Which assessment is causing the most students to fail?",
  "target_audience": "instructor",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Flag assessments with pass_flag=False rate above threshold. Suggest curriculum review.",
  "query_labels": [
    "assessment_difficulty"
  ],
  "explanation_strategy": "distribution"
}
```

## Schema Context

```json
{
  "source_tables": [
    "assessment_result",
    "assessment",
    "enrollment"
  ],
  "key_db_fields": [
    "assessment_name",
    "assessment_type",
    "week_of_class",
    "competency_tag",
    "score_normalized",
    "pass_flag"
  ],
  "output_schema": {
    "required_columns": [
      "assessment_name",
      "fail_rate_pct"
    ],
    "optional_columns": [
      "assessment_id",
      "assessment_order",
      "assessment_type",
      "week_of_class",
      "competency_tag",
      "competency_source",
      "total_submissions",
      "fail_count",
      "avg_score"
    ]
  },
  "query_labels": [
    "assessment_difficulty"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G04-CORE-01",
      "description": "Flag assessments with pass_flag=False rate above threshold."
    },
    {
      "requirement_id": "A-G04-CORE-02",
      "description": "Suggest curriculum review."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G04-CONSTRAINT-01",
      "description": "Frame a high fail rate as a signal for assessment or curriculum review, not as evidence of student deficiency."
    },
    {
      "constraint_id": "A-G04-CONSTRAINT-02",
      "description": "Avoid causal claims about student quality."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Retained as applicable because curriculum recommendations can affect learners; candidate for human review rather than automatic exclusion."
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
      "dataset_label": "assessment_difficulty",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G04.json",
      "artifact_sha256": "31b78680122105a0667522bd84cdde13044290f025837c6e6dd6d8c4fea8da0f",
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
  "evidence_artifact_file_sha256": "31b78680122105a0667522bd84cdde13044290f025837c6e6dd6d8c4fea8da0f",
  "evidence_rows_sha256": "6e5eaf43883c0c84bb0b0b6e402b9402216dce6c94d4cd46221f0f53a303f3f3",
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
  "embedded_datasets_sha256": "6e5eaf43883c0c84bb0b0b6e402b9402216dce6c94d4cd46221f0f53a303f3f3",
  "datasets": {
    "assessment_difficulty": [
      {
        "assessment_id": "SAMPLE_UCI_POR_ASM_G1",
        "assessment_name": "G1",
        "assessment_type": "quiz",
        "assessment_order": 1,
        "week_of_class": 3,
        "competency_tag": "G1",
        "competency_source": "proxy",
        "total_submissions": 649,
        "fail_count": 50,
        "fail_rate_pct": 7.7,
        "avg_score": 57
      },
      {
        "assessment_id": "SAMPLE_UCI_POR_ASM_G2",
        "assessment_name": "G2",
        "assessment_type": "quiz",
        "assessment_order": 2,
        "week_of_class": 8,
        "competency_tag": "G2",
        "competency_source": "proxy",
        "total_submissions": 649,
        "fail_count": 33,
        "fail_rate_pct": 5.1,
        "avg_score": 57.85
      },
      {
        "assessment_id": "SAMPLE_UCI_POR_ASM_G3",
        "assessment_name": "G3",
        "assessment_type": "exam",
        "assessment_order": 3,
        "week_of_class": 14,
        "competency_tag": "G3",
        "competency_source": "proxy",
        "total_submissions": 649,
        "fail_count": 30,
        "fail_rate_pct": 4.6,
        "avg_score": 59.53
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G04__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "43d003736bee6b6ef56c00543b194e2e5320bd0eac3b84df245be7ff89173d9b",
  "generator_input_sha256": "6b6f3d79511d2ec8de8676d54a96b32a8edbba0ce3cfa64c4a5020ec7155d975",
  "generator_input_compact": {
    "task_id": "A-G04",
    "execution_id": "exec_1781847232418_20c741c0",
    "task_name": "Assessment difficulty analysis",
    "analysis_type": "distribution",
    "explanation_strategy": "distribution",
    "actionable_question": "Which assessment is causing the most students to fail?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "assessment_difficulty"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "assessment_difficulty"
    ],
    "dataset_row_counts": {
      "assessment_difficulty": 3
    },
    "ai_summary_config_summary": {
      "summary_type": "ranking",
      "metric_column": "fail_rate_pct",
      "entity_column": "assessment_name",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": "desc",
      "top_k": 10,
      "bottom_k": 5,
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
  "raw_text": "Summary: The analysis of assessment difficulty reveals that the G1 assessment has the highest fail rate among the three assessments, indicating it may be the most challenging for students. While G2 and G3 show lower fail rates, G1's performance suggests a need for targeted interventions.\n\nInsights: High Fail Rate in G1: G1 has a fail rate of 7.7%, which is significantly higher than G2 and G3, indicating that it poses the greatest challenge to students.\n\nEducational implications: The high fail rate in G1 suggests that students may struggle with the material or assessment format, necessitating a review of the curriculum and instructional strategies.\n\nRecommendations: high - Conduct a curriculum review for G1 - To identify potential gaps in instruction or assessment design that may be contributing to the high fail rate.",
  "structured_payload": {
    "task_id": "A-G04",
    "execution_id": "exec_1781847232418_20c741c0",
    "explanation": {
      "summary": "The analysis of assessment difficulty reveals that the G1 assessment has the highest fail rate among the three assessments, indicating it may be the most challenging for students. While G2 and G3 show lower fail rates, G1's performance suggests a need for targeted interventions.",
      "insights": [
        {
          "title": "High Fail Rate in G1",
          "description": "G1 has a fail rate of 7.7%, which is significantly higher than G2 and G3, indicating that it poses the greatest challenge to students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "fail_rate_pct",
              "value": 7.7,
              "comparison": "baseline",
              "delta": null,
              "context": "G1 has the highest fail rate among the assessments."
            }
          ]
        }
      ],
      "educational_implications": [
        "The high fail rate in G1 suggests that students may struggle with the material or assessment format, necessitating a review of the curriculum and instructional strategies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Conduct a curriculum review for G1",
          "rationale": "To identify potential gaps in instruction or assessment design that may be contributing to the high fail rate."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides clear metrics for analysis.",
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
      "latency_ms": 5145,
      "token_usage": {
        "prompt_tokens": 909,
        "completion_tokens": 330,
        "total_tokens": 1239
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000334
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G04__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "43d003736bee6b6ef56c00543b194e2e5320bd0eac3b84df245be7ff89173d9b",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 909,
      "completion_tokens": 330,
      "total_tokens": 1239
    },
    "latency_ms": 5151,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G04",
    "execution_id": "exec_1781847232418_20c741c0",
    "explanation": {
      "summary": "The analysis of assessment difficulty reveals that the G1 assessment has the highest fail rate among the three assessments, indicating it may be the most challenging for students. While G2 and G3 show lower fail rates, G1's performance suggests a need for targeted interventions.",
      "insights": [
        {
          "title": "High Fail Rate in G1",
          "description": "G1 has a fail rate of 7.7%, which is significantly higher than G2 and G3, indicating that it poses the greatest challenge to students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "fail_rate_pct",
              "value": 7.7,
              "comparison": "baseline",
              "delta": null,
              "context": "G1 has the highest fail rate among the assessments."
            }
          ]
        }
      ],
      "educational_implications": [
        "The high fail rate in G1 suggests that students may struggle with the material or assessment format, necessitating a review of the curriculum and instructional strategies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Conduct a curriculum review for G1",
          "rationale": "To identify potential gaps in instruction or assessment design that may be contributing to the high fail rate."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides clear metrics for analysis.",
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
      "latency_ms": 5145,
      "token_usage": {
        "prompt_tokens": 909,
        "completion_tokens": 330,
        "total_tokens": 1239
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000334
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
    "observed": "31b78680122105a0667522bd84cdde13044290f025837c6e6dd6d8c4fea8da0f",
    "expected_values": [
      "31b78680122105a0667522bd84cdde13044290f025837c6e6dd6d8c4fea8da0f"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "6e5eaf43883c0c84bb0b0b6e402b9402216dce6c94d4cd46221f0f53a303f3f3",
    "expected": "6e5eaf43883c0c84bb0b0b6e402b9402216dce6c94d4cd46221f0f53a303f3f3"
  },
  {
    "check_id": "numeric_fields_assessment_difficulty",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "assessment_difficulty",
    "numeric_columns": [
      "assessment_order",
      "avg_score",
      "fail_count",
      "fail_rate_pct",
      "total_submissions",
      "week_of_class"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 3,
        "min": 1,
        "max": 3
      },
      "avg_score": {
        "count": 3,
        "min": 57,
        "max": 59.53
      },
      "fail_count": {
        "count": 3,
        "min": 30,
        "max": 50
      },
      "fail_rate_pct": {
        "count": 3,
        "min": 4.6,
        "max": 7.7
      },
      "total_submissions": {
        "count": 3,
        "min": 649,
        "max": 649
      },
      "week_of_class": {
        "count": 3,
        "min": 3,
        "max": 14
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_assessment_difficulty",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "assessment_difficulty",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
