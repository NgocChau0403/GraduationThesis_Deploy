# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-G06__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G06__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G06",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Activity type effectiveness",
  "scope": "Many students",
  "actionable_question": "Which learning activities should the admin encourage students to use more?",
  "target_audience": "instructor",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Highlight which resource types are most associated with higher scores. Recommend admin to promote those.",
  "query_labels": [
    "activity_effectiveness"
  ],
  "explanation_strategy": "correlation"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement",
    "event",
    "assessment_result",
    "assessment [OULAD only]"
  ],
  "key_db_fields": [
    "resource_type",
    "engagement_count; avg_score [FE cross] by resource_type"
  ],
  "output_schema": {},
  "query_labels": [
    "activity_effectiveness"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G06-CORE-01",
      "description": "Highlight which resource types are most associated with higher scores."
    },
    {
      "requirement_id": "A-G06-CORE-02",
      "description": "Recommend admin to promote those."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G06-CONSTRAINT-01",
      "description": "Frame resource-score relationships as correlational; do not claim that a resource type causes score improvement."
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
      "dataset_label": "activity_effectiveness",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G06.json",
      "artifact_sha256": "77b3d181b059748f1bb14da1c28ba0bcecdd4ca56c19c9a9a8ce9df4eb3c2d58",
      "row_count": 9,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 9,
  "prompt_embedded_row_count": 9,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "77b3d181b059748f1bb14da1c28ba0bcecdd4ca56c19c9a9a8ce9df4eb3c2d58",
  "evidence_rows_sha256": "821e4f01592c61ca544e348bc20a9fd0129587c3407399a8be1dd965cd600096",
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
  "full_result_row_count": 9,
  "embedded_datasets_sha256": "821e4f01592c61ca544e348bc20a9fd0129587c3407399a8be1dd965cd600096",
  "datasets": {
    "activity_effectiveness": [
      {
        "resource_type": "page",
        "avg_score_by_resource_type": "78.9",
        "student_count": 832
      },
      {
        "resource_type": "oucollaborate",
        "avg_score_by_resource_type": "74.67",
        "student_count": 733
      },
      {
        "resource_type": "oucontent",
        "avg_score_by_resource_type": "71.46",
        "student_count": 1778
      },
      {
        "resource_type": "url",
        "avg_score_by_resource_type": "71.04",
        "student_count": 1875
      },
      {
        "resource_type": "forumng",
        "avg_score_by_resource_type": "70.98",
        "student_count": 1791
      },
      {
        "resource_type": "resource",
        "avg_score_by_resource_type": "70.3",
        "student_count": 1983
      },
      {
        "resource_type": "quiz",
        "avg_score_by_resource_type": "70.28",
        "student_count": 1982
      },
      {
        "resource_type": "homepage",
        "avg_score_by_resource_type": "70.22",
        "student_count": 1995
      },
      {
        "resource_type": "subpage",
        "avg_score_by_resource_type": "70.22",
        "student_count": 1989
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G06__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "9eb1dbbb9ef1509b9d19876e17bb036f5b3750ad07d2fc2f614059e50d9ff976",
  "generator_input_sha256": "e6031647032b6b03d5f323dfbfae7a57d88305d883287fe4b1fc294c015cb770",
  "generator_input_compact": {
    "task_id": "A-G06",
    "execution_id": "exec_1781847724775_88de8ddc",
    "task_name": "Activity type effectiveness",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "Which learning activities should the admin encourage students to use more?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "activity_effectiveness"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "activity_effectiveness"
    ],
    "dataset_row_counts": {
      "activity_effectiveness": 9
    },
    "ai_summary_config_summary": {
      "summary_type": "ranking",
      "metric_column": "avg_score_by_resource_type",
      "entity_column": "resource_type",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": "desc",
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
  "raw_text": "Summary: The analysis reveals a negative correlation between Resource Type and Avg Score of Users, indicating that as the resource type changes, the average scores tend to decrease. This suggests that certain resource types may be less effective in promoting student learning outcomes.\n\nInsights: Higher Scores Associated with Pages: The resource type 'page' has the highest average score of 78.9, significantly outperforming other resource types. This indicates that students may find pages more engaging or effective for their learning. | Lower Scores for Collaborative and Content Resources: Resource types such as 'oucollaborate' and 'oucontent' show lower average scores of 74.67 and 71.46 respectively, suggesting that these formats may not be as effective in enhancing student performance.\n\nEducational implications: Encouraging the use of resource types that yield higher average scores may enhance overall student performance.\n\nRecommendations: high - Promote the use of pages as a primary resource type for students. - Given that pages have the highest average score, increasing their usage could lead to improved student learning outcomes. | medium - Evaluate and enhance the effectiveness of lower-scoring resource types like 'oucollaborate' and 'oucontent'. - Understanding why these resources score lower can help in redesigning them to better support student learning.",
  "structured_payload": {
    "task_id": "A-G06",
    "execution_id": "exec_1781847724775_88de8ddc",
    "explanation": {
      "summary": "The analysis reveals a negative correlation between Resource Type and Avg Score of Users, indicating that as the resource type changes, the average scores tend to decrease. This suggests that certain resource types may be less effective in promoting student learning outcomes.",
      "insights": [
        {
          "title": "Higher Scores Associated with Pages",
          "description": "The resource type 'page' has the highest average score of 78.9, significantly outperforming other resource types. This indicates that students may find pages more engaging or effective for their learning.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score_by_resource_type",
              "value": "78.9",
              "comparison": "peak",
              "delta": null,
              "context": "Highest average score among resource types"
            }
          ]
        },
        {
          "title": "Lower Scores for Collaborative and Content Resources",
          "description": "Resource types such as 'oucollaborate' and 'oucontent' show lower average scores of 74.67 and 71.46 respectively, suggesting that these formats may not be as effective in enhancing student performance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score_by_resource_type",
              "value": "74.67",
              "comparison": "down_from_previous",
              "delta": -4.23,
              "context": "Lower than the peak score of pages"
            },
            {
              "metric": "avg_score_by_resource_type",
              "value": "71.46",
              "comparison": "down_from_previous",
              "delta": -7.44,
              "context": "Lower than the peak score of pages"
            }
          ]
        }
      ],
      "educational_implications": [
        "Encouraging the use of resource types that yield higher average scores may enhance overall student performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Promote the use of pages as a primary resource type for students.",
          "rationale": "Given that pages have the highest average score, increasing their usage could lead to improved student learning outcomes."
        },
        {
          "priority": "medium",
          "action": "Evaluate and enhance the effectiveness of lower-scoring resource types like 'oucollaborate' and 'oucontent'.",
          "rationale": "Understanding why these resources score lower can help in redesigning them to better support student learning."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and includes a sufficient number of rows for reliable analysis.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 9,
    "included_row_count": 9,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "activity_effectiveness",
        "row_count": 9,
        "included_row_count": 9
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 10083,
      "token_usage": {
        "prompt_tokens": 982,
        "completion_tokens": 582,
        "total_tokens": 1564
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000496
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G06__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "9eb1dbbb9ef1509b9d19876e17bb036f5b3750ad07d2fc2f614059e50d9ff976",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 982,
      "completion_tokens": 582,
      "total_tokens": 1564
    },
    "latency_ms": 10088,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G06",
    "execution_id": "exec_1781847724775_88de8ddc",
    "explanation": {
      "summary": "The analysis reveals a negative correlation between Resource Type and Avg Score of Users, indicating that as the resource type changes, the average scores tend to decrease. This suggests that certain resource types may be less effective in promoting student learning outcomes.",
      "insights": [
        {
          "title": "Higher Scores Associated with Pages",
          "description": "The resource type 'page' has the highest average score of 78.9, significantly outperforming other resource types. This indicates that students may find pages more engaging or effective for their learning.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score_by_resource_type",
              "value": "78.9",
              "comparison": "peak",
              "delta": null,
              "context": "Highest average score among resource types"
            }
          ]
        },
        {
          "title": "Lower Scores for Collaborative and Content Resources",
          "description": "Resource types such as 'oucollaborate' and 'oucontent' show lower average scores of 74.67 and 71.46 respectively, suggesting that these formats may not be as effective in enhancing student performance.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_score_by_resource_type",
              "value": "74.67",
              "comparison": "down_from_previous",
              "delta": -4.23,
              "context": "Lower than the peak score of pages"
            },
            {
              "metric": "avg_score_by_resource_type",
              "value": "71.46",
              "comparison": "down_from_previous",
              "delta": -7.44,
              "context": "Lower than the peak score of pages"
            }
          ]
        }
      ],
      "educational_implications": [
        "Encouraging the use of resource types that yield higher average scores may enhance overall student performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Promote the use of pages as a primary resource type for students.",
          "rationale": "Given that pages have the highest average score, increasing their usage could lead to improved student learning outcomes."
        },
        {
          "priority": "medium",
          "action": "Evaluate and enhance the effectiveness of lower-scoring resource types like 'oucollaborate' and 'oucontent'.",
          "rationale": "Understanding why these resources score lower can help in redesigning them to better support student learning."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset is complete and includes a sufficient number of rows for reliable analysis.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "full_rows_due_to_small_result",
    "ai_summary_method_warning": null,
    "full_result_row_count": 9,
    "included_row_count": 9,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": true,
    "dataset_row_breakdown": [
      {
        "dataset_name": "activity_effectiveness",
        "row_count": 9,
        "included_row_count": 9
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 10083,
      "token_usage": {
        "prompt_tokens": 982,
        "completion_tokens": 582,
        "total_tokens": 1564
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000496
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
    "expected": 9,
    "observed": 9
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "77b3d181b059748f1bb14da1c28ba0bcecdd4ca56c19c9a9a8ce9df4eb3c2d58",
    "expected_values": [
      "77b3d181b059748f1bb14da1c28ba0bcecdd4ca56c19c9a9a8ce9df4eb3c2d58"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "821e4f01592c61ca544e348bc20a9fd0129587c3407399a8be1dd965cd600096",
    "expected": "821e4f01592c61ca544e348bc20a9fd0129587c3407399a8be1dd965cd600096"
  },
  {
    "check_id": "numeric_fields_activity_effectiveness",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "activity_effectiveness",
    "numeric_columns": [
      "student_count"
    ],
    "numeric_summaries": {
      "student_count": {
        "count": 9,
        "min": 733,
        "max": 1995
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_activity_effectiveness",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "activity_effectiveness",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
