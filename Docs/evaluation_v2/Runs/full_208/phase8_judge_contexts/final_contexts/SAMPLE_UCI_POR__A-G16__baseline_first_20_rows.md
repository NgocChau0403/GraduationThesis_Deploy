# LLM Judge V2 Final Judge Context - SAMPLE_UCI_POR__A-G16__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G16__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G16",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Admin action recommendation",
  "scope": "Many students",
  "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
  "target_audience": "admin",
  "ai_summary_type": "action_synthesis",
  "ai_prompt_hint": "Synthesise all cohort [FE] signals into 3–5 admin actions. This is the most critical AI synthesis task for admin role.",
  "query_labels": [
    "synthesis_data"
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
    "[AI_SYNTHESIS] low_engagement_count",
    "high_risk_count",
    "hardest_assessment",
    "best_resource_type",
    "total_students"
  ],
  "output_schema": {},
  "query_labels": [
    "synthesis_data"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G16-CORE-01",
      "description": "Synthesise cohort feature-engineered signals into 3–5 admin actions."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G16-CONSTRAINT-01",
      "description": "Every recommended action must be grounded in returned cohort feature-engineered signals."
    },
    {
      "constraint_id": "A-G16-CONSTRAINT-02",
      "description": "Do not invent urgency or priority without supporting returned data."
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
      "dataset_label": "synthesis_data",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G16.json",
      "artifact_sha256": "8172586d2f0765fa5e2fefc4c391b23f4ab472722440f5d75689ac068c509f41",
      "row_count": 1,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 1,
  "prompt_embedded_row_count": 1,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "8172586d2f0765fa5e2fefc4c391b23f4ab472722440f5d75689ac068c509f41",
  "evidence_rows_sha256": "f6a9c3335a77b73fbff4926771f35b78031b30f1ad05f92e396c35c76f777fe0",
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
  "full_result_row_count": 1,
  "embedded_datasets_sha256": "f6a9c3335a77b73fbff4926771f35b78031b30f1ad05f92e396c35c76f777fe0",
  "datasets": {
    "synthesis_data": [
      {
        "class_id": "SAMPLE_UCI_POR_CLASS",
        "low_engagement_count": 649,
        "high_risk_count": 49,
        "hardest_assessment": "G1",
        "best_resource_type": null,
        "total_students": 649
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G16__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "ce2f79efc265b05bb13f8b3da9ca1b75e928bb54eee57b0a0bf96d55ed9dc776",
  "generator_input_sha256": "d23311d9e6b9c526383d6142238e1378975317be6aab25fb4e0dbd8dcf1b3b38",
  "generator_input_compact": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847232865_c4217522",
    "task_name": "Admin action recommendation",
    "analysis_type": "synthesis",
    "explanation_strategy": "risk",
    "actionable_question": "What concrete actions should the admin take in the next 2 weeks?",
    "target_audience": [
      "admin"
    ],
    "query_labels": [
      "synthesis_data"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "synthesis_data"
    ],
    "dataset_row_counts": {
      "synthesis_data": 1
    },
    "ai_summary_config_summary": {
      "summary_type": "action_synthesis",
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
  "raw_text": "Summary: The action plan is informed by a total student count of 649, with a significant low engagement count of 649 and a high-risk count of 49. The hardest assessment identified is G1, indicating a need for targeted support in this area.\n\nInsights: Why priority outreach is Step 1: The total student count of 649, combined with the low engagement count of 649, highlights a critical need for outreach to re-engage all students. | Why engagement is Step 2: With 49 students identified as high risk, enhancing engagement efforts is essential to address the needs of these at-risk individuals. | Why assessment support is Step 3: The identification of G1 as the hardest assessment indicates a need for focused support to help students navigate this challenging content.",
  "structured_payload": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847232865_c4217522",
    "explanation": {
      "summary": "The action plan is informed by a total student count of 649, with a significant low engagement count of 649 and a high-risk count of 49. The hardest assessment identified is G1, indicating a need for targeted support in this area.",
      "insights": [
        {
          "title": "Why priority outreach is Step 1",
          "description": "The total student count of 649, combined with the low engagement count of 649, highlights a critical need for outreach to re-engage all students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "low_engagement_count",
              "value": 649,
              "comparison": "baseline",
              "delta": 0,
              "context": "All students are categorized as low engagement."
            }
          ]
        },
        {
          "title": "Why engagement is Step 2",
          "description": "With 49 students identified as high risk, enhancing engagement efforts is essential to address the needs of these at-risk individuals.",
          "severity": "high",
          "evidence": [
            {
              "metric": "high_risk_count",
              "value": 49,
              "comparison": "baseline",
              "delta": 0,
              "context": "A notable number of students are at high risk."
            }
          ]
        },
        {
          "title": "Why assessment support is Step 3",
          "description": "The identification of G1 as the hardest assessment indicates a need for focused support to help students navigate this challenging content.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "hardest_assessment",
              "value": "G1",
              "comparison": "baseline",
              "delta": null,
              "context": "G1 is recognized as the most difficult assessment."
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and directly reflects the current cohort's engagement and risk levels.",
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
      "latency_ms": 9572,
      "token_usage": {
        "prompt_tokens": 872,
        "completion_tokens": 462,
        "total_tokens": 1334
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000408
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G16__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "ce2f79efc265b05bb13f8b3da9ca1b75e928bb54eee57b0a0bf96d55ed9dc776",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 872,
      "completion_tokens": 462,
      "total_tokens": 1334
    },
    "latency_ms": 9585,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G16",
    "execution_id": "exec_1781847232865_c4217522",
    "explanation": {
      "summary": "The action plan is informed by a total student count of 649, with a significant low engagement count of 649 and a high-risk count of 49. The hardest assessment identified is G1, indicating a need for targeted support in this area.",
      "insights": [
        {
          "title": "Why priority outreach is Step 1",
          "description": "The total student count of 649, combined with the low engagement count of 649, highlights a critical need for outreach to re-engage all students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "low_engagement_count",
              "value": 649,
              "comparison": "baseline",
              "delta": 0,
              "context": "All students are categorized as low engagement."
            }
          ]
        },
        {
          "title": "Why engagement is Step 2",
          "description": "With 49 students identified as high risk, enhancing engagement efforts is essential to address the needs of these at-risk individuals.",
          "severity": "high",
          "evidence": [
            {
              "metric": "high_risk_count",
              "value": 49,
              "comparison": "baseline",
              "delta": 0,
              "context": "A notable number of students are at high risk."
            }
          ]
        },
        {
          "title": "Why assessment support is Step 3",
          "description": "The identification of G1 as the hardest assessment indicates a need for focused support to help students navigate this challenging content.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "hardest_assessment",
              "value": "G1",
              "comparison": "baseline",
              "delta": null,
              "context": "G1 is recognized as the most difficult assessment."
            }
          ]
        }
      ],
      "educational_implications": [],
      "recommendations": [],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "Data is complete and directly reflects the current cohort's engagement and risk levels.",
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
      "latency_ms": 9572,
      "token_usage": {
        "prompt_tokens": 872,
        "completion_tokens": 462,
        "total_tokens": 1334
      },
      "strategy": "risk",
      "granularity": "cohort_aggregate",
      "cost_usd": 0.000408
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
    "expected": 1,
    "observed": 1
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "8172586d2f0765fa5e2fefc4c391b23f4ab472722440f5d75689ac068c509f41",
    "expected_values": [
      "8172586d2f0765fa5e2fefc4c391b23f4ab472722440f5d75689ac068c509f41"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "f6a9c3335a77b73fbff4926771f35b78031b30f1ad05f92e396c35c76f777fe0",
    "expected": "f6a9c3335a77b73fbff4926771f35b78031b30f1ad05f92e396c35c76f777fe0"
  },
  {
    "check_id": "numeric_fields_synthesis_data",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "numeric_columns": [
      "high_risk_count",
      "low_engagement_count",
      "total_students"
    ],
    "numeric_summaries": {
      "high_risk_count": {
        "count": 1,
        "min": 49,
        "max": 49
      },
      "low_engagement_count": {
        "count": 1,
        "min": 649,
        "max": 649
      },
      "total_students": {
        "count": 1,
        "min": 649,
        "max": 649
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_synthesis_data",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "synthesis_data",
    "flag_columns": [
      "high_risk_count"
    ],
    "triggered_like_counts": {
      "high_risk_count": 0
    }
  }
]
```
