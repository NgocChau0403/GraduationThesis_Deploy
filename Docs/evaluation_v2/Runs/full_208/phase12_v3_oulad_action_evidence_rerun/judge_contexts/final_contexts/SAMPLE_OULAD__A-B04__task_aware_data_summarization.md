# LLM Judge Final Judge Context - SAMPLE_OULAD__A-B04__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-B04__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-B04",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
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
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B04__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "cbf48ca90caa724692af1aac41b97d7bd6e56f02b2902e969062c436e2febc92",
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
  "raw_text": "Summary: A significant number of students are identified as at risk, with 915 categorized as high risk and 927 as medium risk. Immediate attention is warranted for the high-risk group to address their needs effectively.\n\nInsights: High-Risk Student Count: The high-risk category contains 915 students, indicating a substantial portion of the population may require urgent intervention. | Medium-Risk Student Count: Additionally, there are 927 students classified as medium risk, suggesting a need for monitoring and potential support.\n\nEducational implications: High-risk students may face significant barriers to academic success and require tailored support.\n\nRecommendations: high - Conduct an immediate review of the high-risk group to assess individual needs. - Early identification and intervention can help mitigate potential academic failure and improve student outcomes.",
  "structured_payload": {
    "task_id": "A-B04",
    "execution_id": "exec_1781847633767_8b68b090",
    "explanation": {
      "summary": "A significant number of students are identified as at risk, with 915 categorized as high risk and 927 as medium risk. Immediate attention is warranted for the high-risk group to address their needs effectively.",
      "insights": [
        {
          "title": "High-Risk Student Count",
          "description": "The high-risk category contains 915 students, indicating a substantial portion of the population may require urgent intervention.",
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
          "description": "Additionally, there are 927 students classified as medium risk, suggesting a need for monitoring and potential support.",
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
        "High-risk students may face significant barriers to academic success and require tailored support."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Conduct an immediate review of the high-risk group to assess individual needs.",
          "rationale": "Early identification and intervention can help mitigate potential academic failure and improve student outcomes."
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
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 3,
    "included_row_count": 3,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_overview",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5731,
      "token_usage": {
        "prompt_tokens": 733,
        "completion_tokens": 379,
        "total_tokens": 1112
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000337
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-B04__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "cbf48ca90caa724692af1aac41b97d7bd6e56f02b2902e969062c436e2febc92",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 733,
      "completion_tokens": 379,
      "total_tokens": 1112
    },
    "latency_ms": 5736,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-B04",
    "execution_id": "exec_1781847633767_8b68b090",
    "explanation": {
      "summary": "A significant number of students are identified as at risk, with 915 categorized as high risk and 927 as medium risk. Immediate attention is warranted for the high-risk group to address their needs effectively.",
      "insights": [
        {
          "title": "High-Risk Student Count",
          "description": "The high-risk category contains 915 students, indicating a substantial portion of the population may require urgent intervention.",
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
          "description": "Additionally, there are 927 students classified as medium risk, suggesting a need for monitoring and potential support.",
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
        "High-risk students may face significant barriers to academic success and require tailored support."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Conduct an immediate review of the high-risk group to assess individual needs.",
          "rationale": "Early identification and intervention can help mitigate potential academic failure and improve student outcomes."
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
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 3,
    "included_row_count": 3,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "risk_overview",
        "row_count": 3,
        "included_row_count": 3
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 5731,
      "token_usage": {
        "prompt_tokens": 733,
        "completion_tokens": 379,
        "total_tokens": 1112
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000337
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
