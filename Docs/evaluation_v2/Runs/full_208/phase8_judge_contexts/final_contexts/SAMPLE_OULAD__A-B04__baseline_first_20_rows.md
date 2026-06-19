# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-B04__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-B04__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-B04",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "At-risk overview",
  "scope": "Cohort",
  "actionable_question": "How many students need urgent intervention?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "categorical_distribution",
  "ai_prompt_hint": "State number of high/medium/low risk students. Recommend immediate review of high group.",
  "query_labels": [
    "risk_overview"
  ],
  "explanation_strategy": "risk"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "assessment_result",
    "assessment",
    "engagement"
  ],
  "key_db_fields": [
    "at_risk_label [FE]",
    "at_risk_score [FE]; enrollment_id and avg_score from enrollment + score_agg JOIN (not from risk_flags directly)"
  ],
  "output_schema": {},
  "query_labels": [
    "risk_overview"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-B04-CORE-01",
      "description": "State number of high/medium/low risk students."
    },
    {
      "requirement_id": "A-B04-CORE-02",
      "description": "Recommend immediate review of high group."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
}
```

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "risk_overview",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-B04.json",
      "artifact_sha256": "a3fcf2cc3bbb1ab6b63b48c93418cc4e12737bdcd2e1a60a02737a2a437aef77",
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
  "evidence_artifact_file_sha256": "a3fcf2cc3bbb1ab6b63b48c93418cc4e12737bdcd2e1a60a02737a2a437aef77",
  "evidence_rows_sha256": "eeda578432ddcc62a80582db0040639e86dc50b01e2877f02dbd670e35fec434",
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
  "embedded_datasets_sha256": "eeda578432ddcc62a80582db0040639e86dc50b01e2877f02dbd670e35fec434",
  "datasets": {
    "risk_overview": [
      {
        "at_risk_label": "high",
        "student_count": 915
      },
      {
        "at_risk_label": "medium",
        "student_count": 927
      },
      {
        "at_risk_label": "low",
        "student_count": 156
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B04__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "76a7e5af798bd554fced0687cddbc8644da0e9667f78b95c201e8a8f947422d6",
  "generator_input_sha256": "cecda83bdae1cc7c9e95825c88698a9e9bcfda381b131c9cca5bf7ba2b057c6e",
  "generator_input_compact": {
    "task_id": "A-B04",
    "execution_id": "exec_1781847633767_8b68b090",
    "task_name": "At-risk overview",
    "analysis_type": "aggregation",
    "explanation_strategy": "risk",
    "actionable_question": "How many students need urgent intervention?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "risk_overview"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "risk_overview"
    ],
    "dataset_row_counts": {
      "risk_overview": 3
    },
    "ai_summary_config_summary": {
      "summary_type": "categorical_distribution",
      "metric_column": null,
      "entity_column": null,
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
  "raw_text": "Summary: A significant number of students are identified as at risk, with 915 categorized as high risk and 927 as medium risk. This indicates a pressing need for targeted interventions, particularly for the high-risk group.\n\nInsights: High-Risk Student Count: There are 915 students classified as high risk, indicating a critical need for immediate intervention strategies to support their academic success. | Medium-Risk Student Count: Additionally, 927 students are categorized as medium risk, suggesting that while they may not require urgent intervention, they still need monitoring and support.\n\nEducational implications: High-risk students may face significant barriers to academic success and require immediate support.\n\nRecommendations: high - Conduct an immediate review of high-risk students to identify specific needs and tailor interventions. - Addressing the needs of high-risk students promptly can help mitigate potential academic failure and improve overall outcomes.",
  "structured_payload": {
    "task_id": "A-B04",
    "execution_id": "exec_1781847633767_8b68b090",
    "explanation": {
      "summary": "A significant number of students are identified as at risk, with 915 categorized as high risk and 927 as medium risk. This indicates a pressing need for targeted interventions, particularly for the high-risk group.",
      "insights": [
        {
          "title": "High-Risk Student Count",
          "description": "There are 915 students classified as high risk, indicating a critical need for immediate intervention strategies to support their academic success.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 915,
              "comparison": "baseline",
              "delta": null,
              "context": "High-risk students identified"
            }
          ]
        },
        {
          "title": "Medium-Risk Student Count",
          "description": "Additionally, 927 students are categorized as medium risk, suggesting that while they may not require urgent intervention, they still need monitoring and support.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 927,
              "comparison": "baseline",
              "delta": null,
              "context": "Medium-risk students identified"
            }
          ]
        }
      ],
      "educational_implications": [
        "High-risk students may face significant barriers to academic success and require immediate support."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Conduct an immediate review of high-risk students to identify specific needs and tailor interventions.",
          "rationale": "Addressing the needs of high-risk students promptly can help mitigate potential academic failure and improve overall outcomes."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and accurately reflects the current risk status of students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
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
      "latency_ms": 6065,
      "token_usage": {
        "prompt_tokens": 581,
        "completion_tokens": 397,
        "total_tokens": 978
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000325
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B04__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "76a7e5af798bd554fced0687cddbc8644da0e9667f78b95c201e8a8f947422d6",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 581,
      "completion_tokens": 397,
      "total_tokens": 978
    },
    "latency_ms": 6069,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-B04",
    "execution_id": "exec_1781847633767_8b68b090",
    "explanation": {
      "summary": "A significant number of students are identified as at risk, with 915 categorized as high risk and 927 as medium risk. This indicates a pressing need for targeted interventions, particularly for the high-risk group.",
      "insights": [
        {
          "title": "High-Risk Student Count",
          "description": "There are 915 students classified as high risk, indicating a critical need for immediate intervention strategies to support their academic success.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 915,
              "comparison": "baseline",
              "delta": null,
              "context": "High-risk students identified"
            }
          ]
        },
        {
          "title": "Medium-Risk Student Count",
          "description": "Additionally, 927 students are categorized as medium risk, suggesting that while they may not require urgent intervention, they still need monitoring and support.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 927,
              "comparison": "baseline",
              "delta": null,
              "context": "Medium-risk students identified"
            }
          ]
        }
      ],
      "educational_implications": [
        "High-risk students may face significant barriers to academic success and require immediate support."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Conduct an immediate review of high-risk students to identify specific needs and tailor interventions.",
          "rationale": "Addressing the needs of high-risk students promptly can help mitigate potential academic failure and improve overall outcomes."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and accurately reflects the current risk status of students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
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
      "latency_ms": 6065,
      "token_usage": {
        "prompt_tokens": 581,
        "completion_tokens": 397,
        "total_tokens": 978
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000325
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
    "observed": "a3fcf2cc3bbb1ab6b63b48c93418cc4e12737bdcd2e1a60a02737a2a437aef77",
    "expected_values": [
      "a3fcf2cc3bbb1ab6b63b48c93418cc4e12737bdcd2e1a60a02737a2a437aef77"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "eeda578432ddcc62a80582db0040639e86dc50b01e2877f02dbd670e35fec434",
    "expected": "eeda578432ddcc62a80582db0040639e86dc50b01e2877f02dbd670e35fec434"
  },
  {
    "check_id": "numeric_fields_risk_overview",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "risk_overview",
    "numeric_columns": [
      "student_count"
    ],
    "numeric_summaries": {
      "student_count": {
        "count": 3,
        "min": 156,
        "max": 927
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_risk_overview",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "risk_overview",
    "flag_columns": [
      "at_risk_label"
    ],
    "triggered_like_counts": {
      "at_risk_label": 0
    }
  }
]
```
