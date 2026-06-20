# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-S03__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-S03__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-S03",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Student engagement trajectory",
  "scope": "1 student",
  "actionable_question": "When exactly did this student start disengaging?",
  "target_audience": "instructor, academic_advisor",
  "ai_summary_type": "trend_series",
  "ai_prompt_hint": "Flag the exact week engagement dropped. Compare to pre-drop average. Recommend admin outreach timing.",
  "query_labels": [
    "engagement_trajectory"
  ],
  "explanation_strategy": "behavioral"
}
```

## Schema Context

```json
{
  "source_tables": [
    "engagement [OULAD only]"
  ],
  "key_db_fields": [
    "week_number",
    "engagement_count; early_warning_week [FE cross]",
    "weekly_engagement_drop [FE cross]",
    "consistency_level [FE cross]"
  ],
  "output_schema": {},
  "query_labels": [
    "engagement_trajectory"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-S03-CORE-01",
      "description": "Identify the specific week in which engagement dropped when the data supports one."
    },
    {
      "requirement_id": "A-S03-CORE-02",
      "description": "Compare engagement after the drop with the pre-drop average."
    }
  ],
  "required_supporting_outputs": [
    {
      "requirement_id": "A-S03-SUPPORT-01",
      "description": "When a specific drop week is identified, recommend outreach timing relative to that week."
    }
  ],
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
      "dataset_label": "engagement_trajectory",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-S03.json",
      "artifact_sha256": "15d31797020d70ac8ef35fab6d1b49e370292fb9da87f4e22b331c20ea59c5c2",
      "row_count": 0,
      "readable": true
    }
  ],
  "evidence_access_mode": "direct_embedding",
  "full_result_row_count": 0,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 0,
  "retrieval_log_path": null,
  "full_access_available": true,
  "full_result_sent_to_llm": true,
  "evidence_artifact_file_sha256": "15d31797020d70ac8ef35fab6d1b49e370292fb9da87f4e22b331c20ea59c5c2",
  "evidence_rows_sha256": "e8f2a578b3c7dc743bf3a427600b37b022d1873d9ebf30f91e6bf62eef747968",
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
  "full_result_row_count": 0,
  "embedded_datasets_sha256": "e8f2a578b3c7dc743bf3a427600b37b022d1873d9ebf30f91e6bf62eef747968",
  "datasets": {
    "engagement_trajectory": []
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S03__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "6cd9a9cfb315d3dd427a4b178456bad2062777501454eee0654e42f97d452b95",
  "generator_input_sha256": "630dc295db7196a8da35bbd53f71f4202cf8080656569cd0a966d6f31505aac0",
  "generator_input_compact": {
    "task_id": "A-S03",
    "execution_id": "exec_1781847238030_de934be8",
    "task_name": "Student engagement trajectory",
    "analysis_type": "trend",
    "explanation_strategy": "behavioral",
    "actionable_question": "When exactly did this student start disengaging?",
    "target_audience": [
      "instructor",
      "academic_advisor"
    ],
    "query_labels": [
      "engagement_trajectory"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "engagement_trajectory"
    ],
    "dataset_row_counts": {
      "engagement_trajectory": 0
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_series",
      "metric_column": "weekly_clicks",
      "entity_column": null,
      "group_column": null,
      "time_column": "week_number",
      "sort_by": null,
      "sort_direction": "asc",
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
  "raw_text": "Summary: The analysis reveals a complete absence of engagement data, indicating that no student activity has been recorded. This lack of data suggests a significant disengagement from the course.\n\nEducational implications: The absence of engagement data may indicate a need for immediate intervention to re-engage the student.\n\nRecommendations: high - Initiate outreach to the student to assess barriers to engagement. - Direct communication may uncover underlying issues affecting the student's participation and help facilitate re-engagement.",
  "structured_payload": {
    "task_id": "A-S03",
    "execution_id": "exec_1781847238030_de934be8",
    "explanation": {
      "summary": "The analysis reveals a complete absence of engagement data, indicating that no student activity has been recorded. This lack of data suggests a significant disengagement from the course.",
      "insights": [],
      "educational_implications": [
        "The absence of engagement data may indicate a need for immediate intervention to re-engage the student."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Initiate outreach to the student to assess barriers to engagement.",
          "rationale": "Direct communication may uncover underlying issues affecting the student's participation and help facilitate re-engagement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset contains no rows, confirming a lack of recorded engagement.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
      "latency_ms": 4685,
      "token_usage": {
        "prompt_tokens": 505,
        "completion_tokens": 177,
        "total_tokens": 682
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000182
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-S03__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "6cd9a9cfb315d3dd427a4b178456bad2062777501454eee0654e42f97d452b95",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 505,
      "completion_tokens": 177,
      "total_tokens": 682
    },
    "latency_ms": 4688,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-S03",
    "execution_id": "exec_1781847238030_de934be8",
    "explanation": {
      "summary": "The analysis reveals a complete absence of engagement data, indicating that no student activity has been recorded. This lack of data suggests a significant disengagement from the course.",
      "insights": [],
      "educational_implications": [
        "The absence of engagement data may indicate a need for immediate intervention to re-engage the student."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Initiate outreach to the student to assess barriers to engagement.",
          "rationale": "Direct communication may uncover underlying issues affecting the student's participation and help facilitate re-engagement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset contains no rows, confirming a lack of recorded engagement.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "behavioral",
    "explanation_type": "behavioral",
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
      "latency_ms": 4685,
      "token_usage": {
        "prompt_tokens": 505,
        "completion_tokens": 177,
        "total_tokens": 682
      },
      "strategy": "behavioral",
      "granularity": "weekly",
      "cost_usd": 0.000182
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
    "expected": 0,
    "observed": 0
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "15d31797020d70ac8ef35fab6d1b49e370292fb9da87f4e22b331c20ea59c5c2",
    "expected_values": [
      "15d31797020d70ac8ef35fab6d1b49e370292fb9da87f4e22b331c20ea59c5c2"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "e8f2a578b3c7dc743bf3a427600b37b022d1873d9ebf30f91e6bf62eef747968",
    "expected": "e8f2a578b3c7dc743bf3a427600b37b022d1873d9ebf30f91e6bf62eef747968"
  },
  {
    "check_id": "numeric_fields_engagement_trajectory",
    "check_type": "numeric_field_extraction",
    "status": "not_applicable",
    "dataset_label": "engagement_trajectory",
    "numeric_columns": [],
    "numeric_summaries": {}
  },
  {
    "check_id": "threshold_flag_fields_engagement_trajectory",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "engagement_trajectory",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
