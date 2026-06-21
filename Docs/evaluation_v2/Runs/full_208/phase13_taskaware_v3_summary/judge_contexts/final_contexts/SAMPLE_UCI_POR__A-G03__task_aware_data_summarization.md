# LLM Judge Final Judge Context - SAMPLE_UCI_POR__A-G03__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G03__task_aware_data_summarization",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G03",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Identify at-risk cohort",
  "scope": "Many students",
  "actionable_question": "Who should the admin contact first this week?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Rank at-risk students by at_risk_score. For each high-risk student, explain triggered_flags_summary and recommend the recommended_admin_action. Do not invent reasons outside triggered_flags.",
  "query_labels": [
    "at_risk_cohort"
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
    "at_risk_score [FE cross]",
    "at_risk_label [FE cross]",
    "avg_score [FE cross]",
    "final_outcome"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "avg_score",
      "at_risk_score",
      "at_risk_label",
      "triggered_flags"
    ],
    "optional_columns": [
      "enrollment_id",
      "score_strategy",
      "score_scale",
      "pass_threshold",
      "target_threshold",
      "engagement_score",
      "engagement_score_available",
      "punctuality_rate",
      "previous_attempt_count",
      "triggered_flags_summary",
      "primary_support_category",
      "recommended_admin_action",
      "flag_low_score",
      "flag_repeated",
      "flag_low_engagement",
      "flag_low_punctuality",
      "flag_neg_trend",
      "final_outcome"
    ]
  },
  "query_labels": [
    "at_risk_cohort"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G03-CORE-01",
      "description": "Rank at-risk students by at_risk_score."
    },
    {
      "requirement_id": "A-G03-CORE-02",
      "description": "For each high-risk student, explain triggered_flags_summary and recommend the recommended_admin_action."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G03-CONSTRAINT-01",
      "description": "Do not invent reasons outside triggered_flags."
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
  "evaluation_status": "not_available",
  "supported_action_count": 0,
  "supported_actions": []
}
```

## Deterministic Retrieval Evidence

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "at_risk_cohort",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G03.json",
      "artifact_sha256": "5ffbfda51d48e1b2ced0234d1b63c1abc449384091a7498a5237ed9522ad74ac",
      "row_count": 50,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 50,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 50,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_inputs/retrieval_logs/SAMPLE_UCI_POR__A-G03__task_aware_data_summarization.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "5ffbfda51d48e1b2ced0234d1b63c1abc449384091a7498a5237ed9522ad74ac",
  "evidence_rows_sha256": "c81de4bb3d27b223f80ed36a3657f34e6dcf914db90ced8b6926539f9d408b35",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 50,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_UCI_POR__A-G03__task_aware_data_summarization__at_risk_cohort__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "at_risk_cohort",
        "row_start_inclusive": 0,
        "row_end_inclusive": 49,
        "row_count": 50
      }
    ],
    "issues": []
  }
}
```

```json
{
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "retrieval_log": {
    "artifact_type": "llm_judge_v2_phase6_4_deterministic_retrieval_log",
    "generated_at": "2026-06-20T16:29:36.241Z",
    "record_id": "SAMPLE_UCI_POR__A-G03__task_aware_data_summarization",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_UCI_POR__A-G03__task_aware_data_summarization__at_risk_cohort__chunk_1",
        "dataset_label": "at_risk_cohort",
        "row_start_inclusive": 0,
        "row_end_inclusive": 49,
        "row_count": 50,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G03.json",
        "source_artifact_sha256": "5ffbfda51d48e1b2ced0234d1b63c1abc449384091a7498a5237ed9522ad74ac"
      }
    ]
  },
  "retrieved_datasets_sha256": "c81de4bb3d27b223f80ed36a3657f34e6dcf914db90ced8b6926539f9d408b35",
  "retrieved_datasets": {
    "at_risk_cohort": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000568",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000568",
        "avg_score": 5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 5 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 5 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000606",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000606",
        "avg_score": 6.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 6.25 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 6.25 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000564",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000564",
        "avg_score": 8.75,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 8.75 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 8.75 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000611",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000611",
        "avg_score": 10,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 3,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 10 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 3",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 10 < pass_threshold 40; repeated_attempt: previous_attempt_count 3; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000598",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000598",
        "avg_score": 11.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 11.25 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 11.25 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000640",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000640",
        "avg_score": 20.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 20.25 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 20.25 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000584",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000584",
        "avg_score": 20.5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 20.5 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 20.5 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000641",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000641",
        "avg_score": 21,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 21 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 21 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000164",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000164",
        "avg_score": 29.5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 2,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 29.5 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 2",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 29.5 < pass_threshold 40; repeated_attempt: previous_attempt_count 2; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000173",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000173",
        "avg_score": 32,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 32 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 32 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000280",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000280",
        "avg_score": 32.75,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 3,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 32.75 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 3",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 32.75 < pass_threshold 40; repeated_attempt: previous_attempt_count 3; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000285",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000285",
        "avg_score": 34.75,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 2,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 34.75 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 2",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 34.75 < pass_threshold 40; repeated_attempt: previous_attempt_count 2; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000256",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000256",
        "avg_score": 36.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 36.25 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 36.25 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000019",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000019",
        "avg_score": 38,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 3,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 38 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 3",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 38 < pass_threshold 40; repeated_attempt: previous_attempt_count 3; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000604",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000604",
        "avg_score": 6.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 0,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 6.25 < pass_threshold 40",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 6.25 < pass_threshold 40; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000441",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000441",
        "avg_score": 8.75,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 0,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 8.75 < pass_threshold 40",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 8.75 < pass_threshold 40; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000627",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000627",
        "avg_score": 17.5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 0,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 17.5 < pass_threshold 40",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 17.5 < pass_threshold 40; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000638",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000638",
        "avg_score": 21,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 0,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 21 < pass_threshold 40",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 21 < pass_threshold 40; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000520",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000520",
        "avg_score": 22.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 0,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 22.25 < pass_threshold 40",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 22.25 < pass_threshold 40; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000587",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000587",
        "avg_score": 24,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 0,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 24 < pass_threshold 40",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 24 < pass_threshold 40; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000573",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000573",
        "avg_score": 29,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 2,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 29 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 2",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 29 < pass_threshold 40; repeated_attempt: previous_attempt_count 2; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000433",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000433",
        "avg_score": 32,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 32 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 32 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000501",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000501",
        "avg_score": 33.75,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 33.75 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 33.75 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000519",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000519",
        "avg_score": 34.75,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 34.75 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 34.75 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000570",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000570",
        "avg_score": 35,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 2,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 35 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 2",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 35 < pass_threshold 40; repeated_attempt: previous_attempt_count 2; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000513",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000513",
        "avg_score": 35,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 35 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 35 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000588",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000588",
        "avg_score": 35.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 35.25 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 35.25 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000176",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000176",
        "avg_score": 35.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 2,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 35.25 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 2",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 35.25 < pass_threshold 40; repeated_attempt: previous_attempt_count 2; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000156",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000156",
        "avg_score": 35.5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 0,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 35.5 < pass_threshold 40",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 35.5 < pass_threshold 40; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000437",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000437",
        "avg_score": 35.75,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 35.75 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 35.75 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000591",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000591",
        "avg_score": 36.75,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 2,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 36.75 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 2",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 36.75 < pass_threshold 40; repeated_attempt: previous_attempt_count 2; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000479",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000479",
        "avg_score": 37,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 3,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 37 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 3",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 37 < pass_threshold 40; repeated_attempt: previous_attempt_count 3; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000582",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000582",
        "avg_score": 37.5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 2,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 37.5 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 2",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 37.5 < pass_threshold 40; repeated_attempt: previous_attempt_count 2; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000180",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000180",
        "avg_score": 38.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 3,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 38.25 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 3",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 38.25 < pass_threshold 40; repeated_attempt: previous_attempt_count 3; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000257",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000257",
        "avg_score": 38.75,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 38.75 < pass_threshold 40",
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15"
        ],
        "triggered_flags_summary": "low_score: avg_score 38.75 < pass_threshold 40; repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": false,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000533",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000533",
        "avg_score": 39.5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 0,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "low_score: avg_score 39.5 < pass_threshold 40",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "low_score: avg_score 39.5 < pass_threshold 40; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "academic_performance",
        "recommended_admin_action": "Prioritise academic support for low average score.",
        "flag_low_score": true,
        "flag_repeated": false,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000466",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000466",
        "avg_score": 41.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000455",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000455",
        "avg_score": 41.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000178",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000178",
        "avg_score": 41.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000454",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000454",
        "avg_score": 42.5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000263",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000263",
        "avg_score": 43,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000544",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000544",
        "avg_score": 43,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 3,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 3",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 3; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000132",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000132",
        "avg_score": 44.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 3,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 3",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 3; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000503",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000503",
        "avg_score": 44.5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000509",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000509",
        "avg_score": 46.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000265",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000265",
        "avg_score": 49.5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000507",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000507",
        "avg_score": 49.5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000119",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000119",
        "avg_score": 56.25,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000138",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000138",
        "avg_score": 57.5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000321",
        "enrollment_id": "SAMPLE_UCI_POR_ENR_000321",
        "avg_score": 64.5,
        "score_strategy": "weighted_by_assessment_weight",
        "score_scale": 100,
        "pass_threshold": 40,
        "target_threshold": 70,
        "engagement_score": 0,
        "engagement_score_available": false,
        "punctuality_rate": 1,
        "previous_attempt_count": 1,
        "at_risk_score": 3,
        "at_risk_label": "high",
        "triggered_flags": [
          "repeated_attempt: previous_attempt_count 1",
          "low_engagement: engagement_score 0.000 < 0.15",
          "negative_trend: performance trend is declining"
        ],
        "triggered_flags_summary": "repeated_attempt: previous_attempt_count 1; low_engagement: engagement_score 0.000 < 0.15; negative_trend: performance trend is declining",
        "primary_support_category": "engagement",
        "recommended_admin_action": "Contact student and set a weekly engagement routine.",
        "flag_low_score": false,
        "flag_repeated": true,
        "flag_low_engagement": true,
        "flag_low_punctuality": false,
        "flag_neg_trend": true,
        "final_outcome": "Pass"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G03__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "c6c0025f44b0a1331ffa5c1ac400138d00557b0487924569e645ce3f2fb510d9",
  "generator_input_sha256": "7ac7905e0f359fffe36cb30f9cd7c67ec52b48b0735c6c932575c6af7cd9f428",
  "generator_input_compact": {
    "task_id": "A-G03",
    "execution_id": "exec_1781847232196_a9b57bec",
    "task_name": "Identify at-risk cohort",
    "analysis_type": "ranking",
    "explanation_strategy": "risk",
    "actionable_question": "Who should the admin contact first this week?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "at_risk_cohort"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "at_risk_cohort"
    ],
    "dataset_row_counts": {
      "at_risk_cohort": 50
    },
    "ai_summary_config_summary": {
      "summary_type": "ranking",
      "metric_column": "at_risk_score",
      "entity_column": "student_id",
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
  "raw_text": "Summary: A significant number of students are exhibiting high-risk indicators, primarily characterized by low average scores, repeated attempts, low engagement, and negative performance trends. These patterns suggest a need for immediate academic support to enhance their performance and engagement.\n\nInsights: High-Risk Students with Multiple Flags: Students such as SAMPLE_UCI_POR_STU_000568, SAMPLE_UCI_POR_STU_000606, and SAMPLE_UCI_POR_STU_000611 are flagged for low average scores, repeated attempts, low engagement, and negative performance trends. This combination of factors indicates a high level of risk.\n\nEducational implications: Students exhibiting multiple risk signals require targeted academic interventions to improve their performance and engagement.\n\nRecommendations: high - Prioritise academic support for low average score. - This action addresses the immediate needs of students struggling academically, as indicated by their low scores and engagement levels.",
  "structured_payload": {
    "task_id": "A-G03",
    "execution_id": "exec_1781847232196_a9b57bec",
    "explanation": {
      "summary": "A significant number of students are exhibiting high-risk indicators, primarily characterized by low average scores, repeated attempts, low engagement, and negative performance trends. These patterns suggest a need for immediate academic support to enhance their performance and engagement.",
      "insights": [
        {
          "title": "High-Risk Students with Multiple Flags",
          "description": "Students such as SAMPLE_UCI_POR_STU_000568, SAMPLE_UCI_POR_STU_000606, and SAMPLE_UCI_POR_STU_000611 are flagged for low average scores, repeated attempts, low engagement, and negative performance trends. This combination of factors indicates a high level of risk.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 5,
              "comparison": "down_from_previous",
              "delta": -35,
              "context": "SAMPLE_UCI_POR_STU_000568"
            },
            {
              "metric": "previous_attempt_count",
              "value": 1,
              "comparison": "baseline",
              "delta": 0,
              "context": "SAMPLE_UCI_POR_STU_000568"
            },
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": 0,
              "context": "SAMPLE_UCI_POR_STU_000568"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students exhibiting multiple risk signals require targeted academic interventions to improve their performance and engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Prioritise academic support for low average score.",
          "rationale": "This action addresses the immediate needs of students struggling academically, as indicated by their low scores and engagement levels."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is comprehensive and reflects consistent patterns across multiple students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "ranking",
    "ai_summary_method_warning": null,
    "full_result_row_count": 50,
    "included_row_count": 15,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "at_risk_cohort",
        "row_count": 50,
        "included_row_count": 15
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 15,
    "baseline_reference_tokens": 6028,
    "task_aware_prompt_tokens": 8910,
    "token_ratio": 1.4781,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "exceptions.tie_warnings",
      "exceptions.flag_evidence"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (1.4781 > 1.2)."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6375,
      "token_usage": {
        "prompt_tokens": 10359,
        "completion_tokens": 451,
        "total_tokens": 10810
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.001824
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G03__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "c6c0025f44b0a1331ffa5c1ac400138d00557b0487924569e645ce3f2fb510d9",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 10359,
      "completion_tokens": 451,
      "total_tokens": 10810
    },
    "latency_ms": 6389,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G03",
    "execution_id": "exec_1781847232196_a9b57bec",
    "explanation": {
      "summary": "A significant number of students are exhibiting high-risk indicators, primarily characterized by low average scores, repeated attempts, low engagement, and negative performance trends. These patterns suggest a need for immediate academic support to enhance their performance and engagement.",
      "insights": [
        {
          "title": "High-Risk Students with Multiple Flags",
          "description": "Students such as SAMPLE_UCI_POR_STU_000568, SAMPLE_UCI_POR_STU_000606, and SAMPLE_UCI_POR_STU_000611 are flagged for low average scores, repeated attempts, low engagement, and negative performance trends. This combination of factors indicates a high level of risk.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_score",
              "value": 5,
              "comparison": "down_from_previous",
              "delta": -35,
              "context": "SAMPLE_UCI_POR_STU_000568"
            },
            {
              "metric": "previous_attempt_count",
              "value": 1,
              "comparison": "baseline",
              "delta": 0,
              "context": "SAMPLE_UCI_POR_STU_000568"
            },
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "down_from_previous",
              "delta": 0,
              "context": "SAMPLE_UCI_POR_STU_000568"
            }
          ]
        }
      ],
      "educational_implications": [
        "Students exhibiting multiple risk signals require targeted academic interventions to improve their performance and engagement."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Prioritise academic support for low average score.",
          "rationale": "This action addresses the immediate needs of students struggling academically, as indicated by their low scores and engagement levels."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is comprehensive and reflects consistent patterns across multiple students.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "risk",
    "explanation_type": "risk",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3-experimental",
    "baseline_available": true,
    "input_summary_type": "ranking",
    "ai_summary_method_warning": null,
    "full_result_row_count": 50,
    "included_row_count": 15,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "at_risk_cohort",
        "row_count": 50,
        "included_row_count": 15
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 15,
    "baseline_reference_tokens": 6028,
    "task_aware_prompt_tokens": 8910,
    "token_ratio": 1.4781,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "limitations"
    ],
    "evidence_sections_omitted": [
      "exceptions.tie_warnings",
      "exceptions.flag_evidence"
    ],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (1.4781 > 1.2)."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6375,
      "token_usage": {
        "prompt_tokens": 10359,
        "completion_tokens": 451,
        "total_tokens": 10810
      },
      "strategy": "risk",
      "granularity": "semester",
      "cost_usd": 0.001824
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
    "expected": 50,
    "observed": 50
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "5ffbfda51d48e1b2ced0234d1b63c1abc449384091a7498a5237ed9522ad74ac",
    "expected_values": [
      "5ffbfda51d48e1b2ced0234d1b63c1abc449384091a7498a5237ed9522ad74ac"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "c81de4bb3d27b223f80ed36a3657f34e6dcf914db90ced8b6926539f9d408b35",
    "expected": "c81de4bb3d27b223f80ed36a3657f34e6dcf914db90ced8b6926539f9d408b35"
  },
  {
    "check_id": "numeric_fields_at_risk_cohort",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "at_risk_cohort",
    "numeric_columns": [
      "at_risk_score",
      "avg_score",
      "engagement_score",
      "pass_threshold",
      "previous_attempt_count",
      "punctuality_rate",
      "score_scale",
      "target_threshold"
    ],
    "numeric_summaries": {
      "at_risk_score": {
        "count": 50,
        "min": 3,
        "max": 4
      },
      "avg_score": {
        "count": 50,
        "min": 5,
        "max": 64.5
      },
      "engagement_score": {
        "count": 50,
        "min": 0,
        "max": 0
      },
      "pass_threshold": {
        "count": 50,
        "min": 40,
        "max": 40
      },
      "previous_attempt_count": {
        "count": 50,
        "min": 0,
        "max": 3
      },
      "punctuality_rate": {
        "count": 50,
        "min": 1,
        "max": 1
      },
      "score_scale": {
        "count": 50,
        "min": 100,
        "max": 100
      },
      "target_threshold": {
        "count": 50,
        "min": 70,
        "max": 70
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_at_risk_cohort",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "at_risk_cohort",
    "flag_columns": [
      "pass_threshold",
      "target_threshold",
      "at_risk_score",
      "at_risk_label",
      "triggered_flags",
      "triggered_flags_summary",
      "flag_low_score",
      "flag_repeated",
      "flag_low_engagement",
      "flag_low_punctuality",
      "flag_neg_trend"
    ],
    "triggered_like_counts": {
      "pass_threshold": 0,
      "target_threshold": 0,
      "at_risk_score": 0,
      "at_risk_label": 0,
      "triggered_flags": 0,
      "triggered_flags_summary": 0,
      "flag_low_score": 36,
      "flag_repeated": 42,
      "flag_low_engagement": 50,
      "flag_low_punctuality": 0,
      "flag_neg_trend": 36
    }
  }
]
```
