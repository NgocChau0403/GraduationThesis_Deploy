# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S05__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-S05__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-S05",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Student competency gap",
  "scope": "1 student",
  "actionable_question": "Where should we focus academic support for this student?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Highlight competency tags with lowest avg scores. Recommend specific support type (knowledge_recall → flashcards, applied → practice problems).",
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
      "assessment_order",
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
      "requirement_id": "A-S05-CORE-01",
      "description": "Highlight competency tags with lowest avg scores."
    },
    {
      "requirement_id": "A-S05-CORE-02",
      "description": "Recommend specific support type (knowledge_recall → flashcards, applied → practice problems)."
    }
  ],
  "required_supporting_outputs": [],
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
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S05.json",
      "artifact_sha256": "f3b8cd55949300246cc6a7569e855c53e85ef1e24ea83aaee117d4efda1e410c",
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
  "evidence_artifact_file_sha256": "f3b8cd55949300246cc6a7569e855c53e85ef1e24ea83aaee117d4efda1e410c",
  "evidence_rows_sha256": "e88796ba4c40e4cf5adc854816ed25ecc8523aee6a1cf626f48f3545f2bb2ed3",
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
  "embedded_datasets_sha256": "e88796ba4c40e4cf5adc854816ed25ecc8523aee6a1cf626f48f3545f2bb2ed3",
  "datasets": {
    "competency_scores": [
      {
        "competency_tag": "quiz 1",
        "competency_source": "proxy",
        "assessment_type": "quiz",
        "assessment_order": 1,
        "avg_score": 0,
        "pass_rate": 0,
        "assessment_count": 1
      },
      {
        "competency_tag": "exam 3",
        "competency_source": "proxy",
        "assessment_type": "exam",
        "assessment_order": 3,
        "avg_score": 55,
        "pass_rate": 1,
        "assessment_count": 1
      },
      {
        "competency_tag": "quiz 2",
        "competency_source": "proxy",
        "assessment_type": "quiz",
        "assessment_order": 2,
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S05__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "dd8a946543751eabf9eb6a63aee964a75ff0d0366afded29692ff0af2cf1cc75",
  "generator_input_sha256": "f346ffc48d865ac55d0f68acee9430dfc7fee3992c42f3c7a48cc2bf7baedafe",
  "generator_input_compact": {
    "task_id": "A-S05",
    "execution_id": "exec_1781847238100_985413fe",
    "task_name": "Student competency gap",
    "analysis_type": "distribution",
    "explanation_strategy": "distribution",
    "actionable_question": "Where should we focus academic support for this student?",
    "target_audience": [
      "instructor",
      "academic_advisor"
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
  "raw_text": "Summary: The analysis of student competency scores reveals a significant gap in performance, particularly in 'quiz 1', which has an average score of 0. In contrast, 'exam 3' and 'quiz 2' show a moderate average score of 55, indicating a need for targeted academic support in the area of knowledge recall.\n\nInsights: Critical Gap in Quiz 1: The average score for 'quiz 1' is notably low at 0, indicating that students are struggling significantly in this area. This represents a clear area for intervention.\n\nEducational implications: Students are not demonstrating basic knowledge recall in 'quiz 1', which may hinder their overall academic progress.\n\nRecommendations: high - Implement knowledge recall support through flashcards for 'quiz 1'. - Flashcards can help reinforce foundational concepts and improve retention, addressing the significant gap observed.",
  "structured_payload": {
    "task_id": "A-S05",
    "execution_id": "exec_1781847238100_985413fe",
    "explanation": {
      "summary": "The analysis of student competency scores reveals a significant gap in performance, particularly in 'quiz 1', which has an average score of 0. In contrast, 'exam 3' and 'quiz 2' show a moderate average score of 55, indicating a need for targeted academic support in the area of knowledge recall.",
      "insights": [
        {
          "title": "Critical Gap in Quiz 1",
          "description": "The average score for 'quiz 1' is notably low at 0, indicating that students are struggling significantly in this area. This represents a clear area for intervention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Lowest average score among assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students are not demonstrating basic knowledge recall in 'quiz 1', which may hinder their overall academic progress."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement knowledge recall support through flashcards for 'quiz 1'.",
          "rationale": "Flashcards can help reinforce foundational concepts and improve retention, addressing the significant gap observed."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides clear average scores for each competency area.",
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
      "latency_ms": 6110,
      "token_usage": {
        "prompt_tokens": 777,
        "completion_tokens": 331,
        "total_tokens": 1108
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000315
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S05__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "dd8a946543751eabf9eb6a63aee964a75ff0d0366afded29692ff0af2cf1cc75",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 777,
      "completion_tokens": 331,
      "total_tokens": 1108
    },
    "latency_ms": 6115,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S05",
    "execution_id": "exec_1781847238100_985413fe",
    "explanation": {
      "summary": "The analysis of student competency scores reveals a significant gap in performance, particularly in 'quiz 1', which has an average score of 0. In contrast, 'exam 3' and 'quiz 2' show a moderate average score of 55, indicating a need for targeted academic support in the area of knowledge recall.",
      "insights": [
        {
          "title": "Critical Gap in Quiz 1",
          "description": "The average score for 'quiz 1' is notably low at 0, indicating that students are struggling significantly in this area. This represents a clear area for intervention.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Lowest average score among assessments"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students are not demonstrating basic knowledge recall in 'quiz 1', which may hinder their overall academic progress."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement knowledge recall support through flashcards for 'quiz 1'.",
          "rationale": "Flashcards can help reinforce foundational concepts and improve retention, addressing the significant gap observed."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides clear average scores for each competency area.",
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
      "latency_ms": 6110,
      "token_usage": {
        "prompt_tokens": 777,
        "completion_tokens": 331,
        "total_tokens": 1108
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000315
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
    "observed": "f3b8cd55949300246cc6a7569e855c53e85ef1e24ea83aaee117d4efda1e410c",
    "expected_values": [
      "f3b8cd55949300246cc6a7569e855c53e85ef1e24ea83aaee117d4efda1e410c"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "e88796ba4c40e4cf5adc854816ed25ecc8523aee6a1cf626f48f3545f2bb2ed3",
    "expected": "e88796ba4c40e4cf5adc854816ed25ecc8523aee6a1cf626f48f3545f2bb2ed3"
  },
  {
    "check_id": "numeric_fields_competency_scores",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "competency_scores",
    "numeric_columns": [
      "assessment_count",
      "assessment_order",
      "avg_score",
      "pass_rate"
    ],
    "numeric_summaries": {
      "assessment_count": {
        "count": 3,
        "min": 1,
        "max": 1
      },
      "assessment_order": {
        "count": 3,
        "min": 1,
        "max": 3
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
