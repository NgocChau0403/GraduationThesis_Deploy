# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-B04__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-B04__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-B04",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_uci_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_uci_rerun_candidate"
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

## Direct-Embedded Full Query Result

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "risk_overview",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-B04.json",
      "artifact_sha256": "dbff2289fd184dfe8aa5e15da291ca6740e8f8a49e3c6a46d1026f020b4fc367",
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
  "evidence_artifact_file_sha256": "dbff2289fd184dfe8aa5e15da291ca6740e8f8a49e3c6a46d1026f020b4fc367",
  "evidence_rows_sha256": "d276f75a683943c1a2a05e1258c7f7d9b96d6b8148cf7e3a474a5a55e873b77d",
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
  "embedded_datasets_sha256": "d276f75a683943c1a2a05e1258c7f7d9b96d6b8148cf7e3a474a5a55e873b77d",
  "datasets": {
    "risk_overview": [
      {
        "at_risk_label": "high",
        "student_count": 50
      },
      {
        "at_risk_label": "medium",
        "student_count": 155
      },
      {
        "at_risk_label": "low",
        "student_count": 444
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-B04__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "aeaaf07112593ccb1ca66a220feb1ffdada14ebc1b3f4c357e6497552ab01da3",
  "generator_input_sha256": "e095ec1d08c2c9f4565e4e7683b88999f46ed112da57aa1bd92d65e772b93c4b",
  "generator_input_compact": {
    "task_id": "A-B04",
    "execution_id": "exec_1781847231795_24cc83c5",
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
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
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
  "raw_text": "Summary: The analysis indicates that there are 50 students categorized as high risk, 155 as medium risk, and 444 as low risk. The high-risk group requires urgent intervention to address their needs effectively.\n\nInsights: High-Risk Student Count: There are 50 students identified as high risk, indicating a significant need for immediate support and intervention strategies. | Medium-Risk Student Count: The medium-risk group consists of 155 students, suggesting a need for monitoring and potential intervention strategies to prevent escalation to high risk.\n\nEducational implications: Immediate review and intervention for high-risk students is essential to support their academic success.\n\nRecommendations: high - Conduct an immediate review of the high-risk group. - To identify specific needs and implement targeted support strategies.",
  "structured_payload": {
    "task_id": "A-B04",
    "execution_id": "exec_1781847231795_24cc83c5",
    "explanation": {
      "summary": "The analysis indicates that there are 50 students categorized as high risk, 155 as medium risk, and 444 as low risk. The high-risk group requires urgent intervention to address their needs effectively.",
      "insights": [
        {
          "title": "High-Risk Student Count",
          "description": "There are 50 students identified as high risk, indicating a significant need for immediate support and intervention strategies.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 50,
              "comparison": "baseline",
              "delta": null,
              "context": "High-risk students require urgent attention."
            }
          ]
        },
        {
          "title": "Medium-Risk Student Count",
          "description": "The medium-risk group consists of 155 students, suggesting a need for monitoring and potential intervention strategies to prevent escalation to high risk.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 155,
              "comparison": "baseline",
              "delta": null,
              "context": "Medium-risk students should be closely monitored."
            }
          ]
        }
      ],
      "educational_implications": [
        "Immediate review and intervention for high-risk students is essential to support their academic success."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Conduct an immediate review of the high-risk group.",
          "rationale": "To identify specific needs and implement targeted support strategies."
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
      "latency_ms": 6702,
      "token_usage": {
        "prompt_tokens": 581,
        "completion_tokens": 381,
        "total_tokens": 962
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000316
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-B04__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "aeaaf07112593ccb1ca66a220feb1ffdada14ebc1b3f4c357e6497552ab01da3",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 581,
      "completion_tokens": 381,
      "total_tokens": 962
    },
    "latency_ms": 6706,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-B04",
    "execution_id": "exec_1781847231795_24cc83c5",
    "explanation": {
      "summary": "The analysis indicates that there are 50 students categorized as high risk, 155 as medium risk, and 444 as low risk. The high-risk group requires urgent intervention to address their needs effectively.",
      "insights": [
        {
          "title": "High-Risk Student Count",
          "description": "There are 50 students identified as high risk, indicating a significant need for immediate support and intervention strategies.",
          "severity": "high",
          "evidence": [
            {
              "metric": "student_count",
              "value": 50,
              "comparison": "baseline",
              "delta": null,
              "context": "High-risk students require urgent attention."
            }
          ]
        },
        {
          "title": "Medium-Risk Student Count",
          "description": "The medium-risk group consists of 155 students, suggesting a need for monitoring and potential intervention strategies to prevent escalation to high risk.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "student_count",
              "value": 155,
              "comparison": "baseline",
              "delta": null,
              "context": "Medium-risk students should be closely monitored."
            }
          ]
        }
      ],
      "educational_implications": [
        "Immediate review and intervention for high-risk students is essential to support their academic success."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Conduct an immediate review of the high-risk group.",
          "rationale": "To identify specific needs and implement targeted support strategies."
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
      "latency_ms": 6702,
      "token_usage": {
        "prompt_tokens": 581,
        "completion_tokens": 381,
        "total_tokens": 962
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.000316
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
    "observed": "dbff2289fd184dfe8aa5e15da291ca6740e8f8a49e3c6a46d1026f020b4fc367",
    "expected_values": [
      "dbff2289fd184dfe8aa5e15da291ca6740e8f8a49e3c6a46d1026f020b4fc367"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "d276f75a683943c1a2a05e1258c7f7d9b96d6b8148cf7e3a474a5a55e873b77d",
    "expected": "d276f75a683943c1a2a05e1258c7f7d9b96d6b8148cf7e3a474a5a55e873b77d"
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
        "min": 50,
        "max": 444
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
