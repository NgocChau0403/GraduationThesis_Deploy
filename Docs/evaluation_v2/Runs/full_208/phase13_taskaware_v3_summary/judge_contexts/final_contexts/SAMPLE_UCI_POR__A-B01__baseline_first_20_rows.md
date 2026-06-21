# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-B01__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-B01__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-B01",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Overall performance distribution",
  "scope": "Cohort",
  "actionable_question": "How is the class performing overall?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "numeric_distribution",
  "ai_prompt_hint": "Describe score spread. Flag if large proportion below pass threshold.",
  "query_labels": [
    "score_distribution"
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
    "score_normalized",
    "assessment_type"
  ],
  "output_schema": {
    "required_columns": [
      "score_bucket",
      "student_count"
    ],
    "optional_columns": [
      "pct_of_class",
      "dataset_source",
      "avg_score_in_bucket"
    ]
  },
  "query_labels": [
    "score_distribution"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-B01-CORE-01",
      "description": "Describe score spread."
    },
    {
      "requirement_id": "A-B01-CORE-02",
      "description": "Flag if large proportion below pass threshold."
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
      "dataset_label": "score_distribution",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-B01.json",
      "artifact_sha256": "c6f52e5d026054892d52e98d1e9d748ac2e6f00ffff32d6820c814970c855f80",
      "row_count": 10,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 10,
  "prompt_embedded_row_count": 10,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "c6f52e5d026054892d52e98d1e9d748ac2e6f00ffff32d6820c814970c855f80",
  "evidence_rows_sha256": "df628c9e756173fa56c95830ad55dd6d85e32e50a5c96d7ad99985910fb17ab9",
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
  "full_result_row_count": 10,
  "embedded_datasets_sha256": "df628c9e756173fa56c95830ad55dd6d85e32e50a5c96d7ad99985910fb17ab9",
  "datasets": {
    "score_distribution": [
      {
        "score_bucket": "0-10",
        "student_count": 3,
        "pct_of_class": 0.5,
        "avg_score_in_bucket": 7.78
      },
      {
        "score_bucket": "10-20",
        "student_count": 4,
        "pct_of_class": 0.6,
        "avg_score_in_bucket": 12.92
      },
      {
        "score_bucket": "20-30",
        "student_count": 9,
        "pct_of_class": 1.4,
        "avg_score_in_bucket": 24.44
      },
      {
        "score_bucket": "30-40",
        "student_count": 33,
        "pct_of_class": 5.1,
        "avg_score_in_bucket": 36.01
      },
      {
        "score_bucket": "40-50",
        "student_count": 108,
        "pct_of_class": 16.6,
        "avg_score_in_bucket": 45.03
      },
      {
        "score_bucket": "50-60",
        "student_count": 187,
        "pct_of_class": 28.8,
        "avg_score_in_bucket": 53.66
      },
      {
        "score_bucket": "60-70",
        "student_count": 168,
        "pct_of_class": 25.9,
        "avg_score_in_bucket": 63.78
      },
      {
        "score_bucket": "70-80",
        "student_count": 90,
        "pct_of_class": 13.9,
        "avg_score_in_bucket": 73.91
      },
      {
        "score_bucket": "80-90",
        "student_count": 40,
        "pct_of_class": 6.2,
        "avg_score_in_bucket": 83.54
      },
      {
        "score_bucket": "90-100",
        "student_count": 7,
        "pct_of_class": 1.1,
        "avg_score_in_bucket": 90.48
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-B01__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "44313c325c4189fbe67f965571fac3bb0771a710c4157426689b0d5059128b42",
  "generator_input_sha256": "d01530583ddbe0ecf70dd066630e361988ffd7df9d16d139efaa03b5c25efcbc",
  "generator_input_compact": {
    "task_id": "A-B01",
    "execution_id": "exec_1781847231655_3078f027",
    "task_name": "Overall performance distribution",
    "analysis_type": "distribution",
    "explanation_strategy": "distribution",
    "actionable_question": "How is the class performing overall?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "score_distribution"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "score_distribution"
    ],
    "dataset_row_counts": {
      "score_distribution": 10
    },
    "ai_summary_config_summary": {
      "summary_type": "numeric_distribution",
      "metric_column": null,
      "entity_column": null,
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": null,
      "top_k": null,
      "bottom_k": null,
      "threshold_direction": "below",
      "numeric_threshold": 40,
      "require_sensitive_context_policy": false,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: The overall performance distribution indicates that a significant majority of students are clustered in the lower to mid-range score buckets, with a notable drop-off in higher score ranges. The largest group of students, comprising 28.8% of the class, falls within the 50-60 score bucket, suggesting a need for targeted interventions to elevate overall performance.\n\nInsights: Concentration in Lower Score Buckets: A substantial 28.8% of students scored between 50-60, while 16.6% scored between 40-50, indicating a concentration of students in the lower performance tiers. | Limited High-Scoring Students: Only 1.1% of students scored in the 90-100 range, highlighting a significant gap in high achievers and suggesting that few students are reaching advanced competency levels.\n\nEducational implications: The distribution suggests a need for differentiated instruction to support students struggling in lower score buckets.\n\nRecommendations: high - Implement targeted interventions for students in the 40-60 score range. - This group represents a significant portion of the class and requires support to improve their understanding and performance.",
  "structured_payload": {
    "task_id": "A-B01",
    "execution_id": "exec_1781847231655_3078f027",
    "explanation": {
      "summary": "The overall performance distribution indicates that a significant majority of students are clustered in the lower to mid-range score buckets, with a notable drop-off in higher score ranges. The largest group of students, comprising 28.8% of the class, falls within the 50-60 score bucket, suggesting a need for targeted interventions to elevate overall performance.",
      "insights": [
        {
          "title": "Concentration in Lower Score Buckets",
          "description": "A substantial 28.8% of students scored between 50-60, while 16.6% scored between 40-50, indicating a concentration of students in the lower performance tiers.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_of_class",
              "value": 28.8,
              "comparison": "baseline",
              "delta": null,
              "context": "Percentage of students in the 50-60 score bucket"
            }
          ]
        },
        {
          "title": "Limited High-Scoring Students",
          "description": "Only 1.1% of students scored in the 90-100 range, highlighting a significant gap in high achievers and suggesting that few students are reaching advanced competency levels.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_of_class",
              "value": 1.1,
              "comparison": "baseline",
              "delta": null,
              "context": "Percentage of students in the 90-100 score bucket"
            }
          ]
        }
      ],
      "educational_implications": [
        "The distribution suggests a need for differentiated instruction to support students struggling in lower score buckets."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions for students in the 40-60 score range.",
          "rationale": "This group represents a significant portion of the class and requires support to improve their understanding and performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear overview of student performance distribution.",
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
      "latency_ms": 7006,
      "token_usage": {
        "prompt_tokens": 941,
        "completion_tokens": 475,
        "total_tokens": 1416
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000426
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-B01__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "44313c325c4189fbe67f965571fac3bb0771a710c4157426689b0d5059128b42",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 941,
      "completion_tokens": 475,
      "total_tokens": 1416
    },
    "latency_ms": 7013,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-B01",
    "execution_id": "exec_1781847231655_3078f027",
    "explanation": {
      "summary": "The overall performance distribution indicates that a significant majority of students are clustered in the lower to mid-range score buckets, with a notable drop-off in higher score ranges. The largest group of students, comprising 28.8% of the class, falls within the 50-60 score bucket, suggesting a need for targeted interventions to elevate overall performance.",
      "insights": [
        {
          "title": "Concentration in Lower Score Buckets",
          "description": "A substantial 28.8% of students scored between 50-60, while 16.6% scored between 40-50, indicating a concentration of students in the lower performance tiers.",
          "severity": "high",
          "evidence": [
            {
              "metric": "pct_of_class",
              "value": 28.8,
              "comparison": "baseline",
              "delta": null,
              "context": "Percentage of students in the 50-60 score bucket"
            }
          ]
        },
        {
          "title": "Limited High-Scoring Students",
          "description": "Only 1.1% of students scored in the 90-100 range, highlighting a significant gap in high achievers and suggesting that few students are reaching advanced competency levels.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "pct_of_class",
              "value": 1.1,
              "comparison": "baseline",
              "delta": null,
              "context": "Percentage of students in the 90-100 score bucket"
            }
          ]
        }
      ],
      "educational_implications": [
        "The distribution suggests a need for differentiated instruction to support students struggling in lower score buckets."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted interventions for students in the 40-60 score range.",
          "rationale": "This group represents a significant portion of the class and requires support to improve their understanding and performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and provides a clear overview of student performance distribution.",
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
      "latency_ms": 7006,
      "token_usage": {
        "prompt_tokens": 941,
        "completion_tokens": 475,
        "total_tokens": 1416
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000426
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
    "expected": 10,
    "observed": 10
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "c6f52e5d026054892d52e98d1e9d748ac2e6f00ffff32d6820c814970c855f80",
    "expected_values": [
      "c6f52e5d026054892d52e98d1e9d748ac2e6f00ffff32d6820c814970c855f80"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "df628c9e756173fa56c95830ad55dd6d85e32e50a5c96d7ad99985910fb17ab9",
    "expected": "df628c9e756173fa56c95830ad55dd6d85e32e50a5c96d7ad99985910fb17ab9"
  },
  {
    "check_id": "numeric_fields_score_distribution",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "score_distribution",
    "numeric_columns": [
      "avg_score_in_bucket",
      "pct_of_class",
      "student_count"
    ],
    "numeric_summaries": {
      "avg_score_in_bucket": {
        "count": 10,
        "min": 7.78,
        "max": 90.48
      },
      "pct_of_class": {
        "count": 10,
        "min": 0.5,
        "max": 28.8
      },
      "student_count": {
        "count": 10,
        "min": 3,
        "max": 187
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_score_distribution",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "score_distribution",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
