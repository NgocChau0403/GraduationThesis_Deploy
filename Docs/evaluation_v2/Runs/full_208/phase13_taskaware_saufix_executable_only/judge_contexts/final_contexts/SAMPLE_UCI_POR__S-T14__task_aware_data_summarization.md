# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T14__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2_PHASE13_SAUFIX_EXECUTABLE_ONLY.md`
- Prompt SHA-256: `8ae00287d6a8e9c23c769c97b4d11aa90e05e9126f8cd3e71fcef74500d6f48f`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T14__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_phase13_saufix_executable_only__SAMPLE_UCI_POR",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T14",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_phase13_saufix_action_correction_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Social balance vs performance",
  "scope": "1 student + cohort context",
  "actionable_question": "Is my social life balanced with my academic commitments?",
  "target_audience": "student",
  "ai_summary_type": "correlation_evidence",
  "ai_prompt_hint": "Compare the selected student against the class social-balance scatter. Highlight the student's position and any cohort-level association between social_balance_score and avg_score. Frame as correlation, not causation.",
  "query_labels": [
    "social_balance_scatter"
  ],
  "explanation_strategy": "correlation"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "assessment_result",
    "assessment [UCI only]"
  ],
  "key_db_fields": [
    "social_balance_score [FE single]",
    "avg_score [FE cross]",
    "free_time",
    "go_out_freq",
    "alcohol_weekday"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "point_role",
      "social_balance_score",
      "avg_score"
    ],
    "optional_columns": [
      "is_current_student",
      "free_time",
      "go_out_freq",
      "alcohol_weekday",
      "alcohol_weekend"
    ]
  },
  "query_labels": [
    "social_balance_scatter"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T14-CORE-01",
      "description": "Compare the selected student against the class social-balance scatter."
    },
    {
      "requirement_id": "S-T14-CORE-02",
      "description": "Highlight the student's position and any cohort-level association between social_balance_score and avg_score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T14-CONSTRAINT-01",
      "description": "Frame as correlation, not causation."
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
      "dataset_label": "social_balance_scatter",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T14.json",
      "artifact_sha256": "a8efc8a5a1bdaaba7b3e423a3a55186922980fc83b1f32258aef8c20d65aef28",
      "row_count": 649,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 649,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 649,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_inputs/retrieval_logs/SAMPLE_UCI_POR__S-T14__task_aware_data_summarization.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "a8efc8a5a1bdaaba7b3e423a3a55186922980fc83b1f32258aef8c20d65aef28",
  "evidence_rows_sha256": "73a9b71005a4c900d8f448dbd363e738cc480183ef3584e7d662bdf6ac7d772e",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 649,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_UCI_POR__S-T14__task_aware_data_summarization__social_balance_scatter__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "social_balance_scatter",
        "row_start_inclusive": 0,
        "row_end_inclusive": 648,
        "row_count": 649
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
    "generated_at": "2026-06-21T10:35:31.982Z",
    "record_id": "SAMPLE_UCI_POR__S-T14__task_aware_data_summarization",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_UCI_POR__S-T14__task_aware_data_summarization__social_balance_scatter__chunk_1",
        "dataset_label": "social_balance_scatter",
        "row_start_inclusive": 0,
        "row_end_inclusive": 648,
        "row_count": 649,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T14.json",
        "source_artifact_sha256": "a8efc8a5a1bdaaba7b3e423a3a55186922980fc83b1f32258aef8c20d65aef28"
      }
    ]
  },
  "retrieved_datasets_sha256": "73a9b71005a4c900d8f448dbd363e738cc480183ef3584e7d662bdf6ac7d772e",
  "retrieved_datasets": {
    "social_balance_scatter": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000079",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.5,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000590",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.5,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000010",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.5,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000036",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.5,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000023",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.5,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000246",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.425,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000114",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.425,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000214",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.425,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000252",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.425,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000033",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.425,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000428",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.425,
        "avg_score": 83.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000180",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.425,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000015",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.425,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000434",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 1,
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "social_balance_score": 0.4,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000044",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.375,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000315",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.375,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000299",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.375,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000021",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.375,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000482",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.35,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000111",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.35,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000353",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.35,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000480",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.35,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000352",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.35,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000340",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.3,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000259",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.3,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000128",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.3,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000184",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.3,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000224",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.3,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000115",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.3,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000118",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.3,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000412",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.3,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000249",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.3,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000022",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.3,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000089",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.3,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000645",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.3,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000006",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.3,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000158",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.3,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000605",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.3,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000157",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.3,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000388",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.3,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000263",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.275,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000471",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.275,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000611",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.275,
        "avg_score": 13.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000167",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.275,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000451",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.275,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000432",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.275,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000122",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.275,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000496",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.275,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000643",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.275,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000649",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 1,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0.275,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000040",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.25,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000272",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.25,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000287",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.25,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000296",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.25,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000032",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.25,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000604",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.25,
        "avg_score": 8.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000602",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.25,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000331",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.25,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000237",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.25,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000345",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.25,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000197",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.25,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000070",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.25,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000351",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.25,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000255",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.25,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000398",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.25,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000489",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.25,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000422",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.25,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000470",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.25,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000579",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.225,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000216",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.225,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000639",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000526",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.225,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000585",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000326",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.225,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000460",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000387",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000077",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000593",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000594",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.225,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000080",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.225,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000038",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000437",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.225,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000037",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000638",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.225,
        "avg_score": 23.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000102",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000403",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.225,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000487",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.225,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000035",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000314",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000629",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000479",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000014",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.225,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000477",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000120",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.225,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000431",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000572",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.225,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000117",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000436",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.225,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000063",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000563",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000341",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.225,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000066",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.225,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000636",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.225,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000336",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.225,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000377",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.2,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000247",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.2,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000630",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.2,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000613",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.2,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000031",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0.2,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000600",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.2,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000587",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.2,
        "avg_score": 26.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000584",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.2,
        "avg_score": 23.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000573",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.2,
        "avg_score": 28.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000568",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 1,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.2,
        "avg_score": 6.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000561",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.2,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000549",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.2,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000536",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.2,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000092",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.2,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000456",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "social_balance_score": 0.2,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000439",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.2,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000149",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.2,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000313",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.2,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000268",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.2,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000640",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.175,
        "avg_score": 21.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000457",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000430",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.175,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000127",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000459",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000464",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000473",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000474",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.175,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000476",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000408",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000488",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000493",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000401",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000400",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.175,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000082",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000510",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000511",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000513",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000375",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.175,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000519",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.175,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000521",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.175,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000071",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000146",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000560",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000148",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000257",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000571",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.175,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000059",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000057",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000337",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.175,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000574",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000575",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.175,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000005",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000042",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.175,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000039",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000159",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000160",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000034",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000617",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000186",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000303",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000302",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000618",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000620",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.175,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000025",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000644",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000294",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.175,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000018",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000286",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.175,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000275",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000210",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000271",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000218",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000632",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000267",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000264",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "social_balance_score": 0.175,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000222",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000223",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.175,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000260",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000195",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.175,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000239",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.175,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000442",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.175,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000454",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000455",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.175,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000163",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "social_balance_score": 0.15,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000007",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000016",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.15,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000019",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.15,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000050",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000083",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000105",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000116",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.15,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000124",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.15,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000125",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000129",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "social_balance_score": 0.15,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000135",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.15,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000147",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.15,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000169",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000176",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.15,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000187",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.15,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000191",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.15,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000217",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.15,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000230",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.15,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000276",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000288",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.15,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000321",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000329",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000354",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.15,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000357",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000362",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000364",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000381",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.15,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000384",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.15,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000391",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000409",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.15,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000417",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.15,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000425",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000481",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000555",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.15,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000558",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000565",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.15,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000566",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.15,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000583",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000606",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.15,
        "avg_score": 8.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000631",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.15,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000634",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0.125,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000258",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.125,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000356",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.125,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000151",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.125,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000229",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.125,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000162",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 1,
        "social_balance_score": 0.125,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000168",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.125,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000282",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.125,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000175",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.125,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000525",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.125,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000520",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.125,
        "avg_score": 25
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000612",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.125,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000074",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.125,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000220",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0.125,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000504",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.125,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000490",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0.125,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000085",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.125,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000483",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.125,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000463",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.125,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000435",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.125,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000136",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.125,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000625",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.125,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000569",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.125,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000137",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.125,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000003",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.125,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000553",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0.125,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000393",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.125,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000374",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.125,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000333",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000233",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.1,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000234",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000240",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000242",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000250",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000251",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 2,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": 0.1,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000253",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000254",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000266",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000178",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.1,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000177",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.1,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000273",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000277",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000281",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000284",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000024",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.1,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000291",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000305",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000306",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000317",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000318",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000325",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.1,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000332",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000334",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000152",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000344",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 83.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000349",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000145",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000355",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000633",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000367",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000013",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000382",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000140",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000139",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000390",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000394",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000397",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000399",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000134",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000011",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000424",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000427",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000126",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 3,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000433",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 31.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000447",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000108",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000452",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000106",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000103",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000461",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000466",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000469",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000097",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000472",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000094",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000091",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000642",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000088",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000086",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000084",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000497",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000499",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000508",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000522",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000072",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000538",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000544",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000068",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000557",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.1,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000559",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "social_balance_score": 0.1,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000065",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000562",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.1,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000064",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.1,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000061",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000582",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000053",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0.1,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000052",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000588",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000591",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000597",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000598",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 15
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000043",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000041",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000608",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000029",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000615",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000205",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000206",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000209",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000203",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.1,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000201",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000225",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.1,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000228",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.1,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000509",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.075,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000495",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.075,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000343",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.075,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000512",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.075,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000330",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.075,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000110",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.075,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000484",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.075,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000208",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0.075,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000603",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.075,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000518",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.075,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000505",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.075,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000570",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.075,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000641",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 3,
        "alcohol_weekday": 4,
        "alcohol_weekend": 3,
        "social_balance_score": 0.075,
        "avg_score": 23.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000506",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.075,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000392",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.075,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000156",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.075,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000270",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.075,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000564",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.075,
        "avg_score": 11.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000453",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.075,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000445",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.075,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000166",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 1,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.075,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000132",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.075,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000189",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.075,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000596",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.075,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000310",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.075,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000534",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000027",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000533",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.05,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000153",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000076",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000075",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.05,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000026",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000517",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000373",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000154",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000376",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000378",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000578",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000155",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000051",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000328",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000350",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000327",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0.05,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000589",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000049",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000012",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000576",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0.05,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000395",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000396",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000048",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000308",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0.05,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000133",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000058",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000413",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000165",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "social_balance_score": 0.05,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000415",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000009",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000298",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000198",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000172",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000123",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000046",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000279",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000567",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000150",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000628",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000173",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 4,
        "alcohol_weekend": 4,
        "social_balance_score": 0.05,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000449",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000045",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000269",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000363",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000465",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0.05,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000199",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000581",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000004",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.05,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000550",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000093",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000478",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.05,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000546",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0.05,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000541",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000539",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000622",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000221",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000366",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000580",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000338",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.05,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000494",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "social_balance_score": 0.05,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000081",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000370",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 4,
        "alcohol_weekend": 3,
        "social_balance_score": 0.05,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000348",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000443",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.025,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000444",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.025,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000141",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.025,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000446",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.025,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000646",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000418",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.025,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000537",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.025,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000420",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.025,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000293",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.025,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000614",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000289",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.025,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000227",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000389",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000468",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000429",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000283",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.025,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000231",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.025,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000365",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.025,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000278",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.025,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000556",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000095",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000523",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.025,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000485",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.025,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000241",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.025,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000619",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.025,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000185",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": 0.025,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000236",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000371",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000056",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000358",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000402",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0.025,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000243",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 2,
        "alcohol_weekday": 4,
        "alcohol_weekend": 5,
        "social_balance_score": 0.025,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000087",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.025,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000411",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": 0.025,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000192",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": 0.025,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000099",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": 0.025,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000138",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000621",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000448",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": 0,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000624",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000256",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000190",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 4,
        "alcohol_weekend": 4,
        "social_balance_score": 0,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000647",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000274",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": 0,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000524",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": 0,
        "avg_score": 28.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000319",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000207",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 4,
        "alcohol_weekday": 4,
        "alcohol_weekend": 5,
        "social_balance_score": 0,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000577",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": 0,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000458",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": 0,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000131",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": 0,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000062",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": 0,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000262",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000610",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 1,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000101",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 5,
        "go_out_freq": 5,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": 0,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000193",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": 0,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000161",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": -0.025,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000017",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000211",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000360",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "social_balance_score": -0.025,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000385",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000404",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000202",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000121",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000438",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000626",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000648",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": -0.025,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000467",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": -0.025,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000609",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000245",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000244",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000491",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.025,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000616",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000498",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": -0.025,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000507",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": -0.025,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000078",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": -0.025,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000194",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.025,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000073",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": -0.025,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000527",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000623",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": -0.025,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000196",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000200",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": -0.025,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000174",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "social_balance_score": -0.025,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000290",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.025,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000295",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.025,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000300",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000304",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.025,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000060",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.025,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000309",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000322",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.025,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000324",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.025,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000054",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": -0.025,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000182",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.025,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000342",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": -0.025,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000261",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.05,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000592",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.05,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000098",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.05,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000219",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.05,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000410",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": -0.05,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000347",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 1,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": -0.05,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000516",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": -0.05,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000047",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": -0.05,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000100",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.05,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000215",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 5,
        "social_balance_score": -0.05,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000104",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.05,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000486",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.05,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000323",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 4,
        "alcohol_weekend": 3,
        "social_balance_score": -0.05,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000170",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "social_balance_score": -0.05,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000311",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.05,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000543",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": -0.05,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000595",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.05,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000179",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 5,
        "social_balance_score": -0.05,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000188",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.05,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000130",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": -0.075,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000112",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.075,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000113",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.075,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000407",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.075,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000586",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": -0.075,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000212",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "social_balance_score": -0.075,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000292",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 4,
        "alcohol_weekend": 4,
        "social_balance_score": -0.075,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000339",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.075,
        "avg_score": 93.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000554",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.075,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000096",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.075,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000368",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": -0.075,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000423",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.075,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000301",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": -0.075,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000107",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.075,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000450",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.075,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000265",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.075,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000441",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 4,
        "alcohol_weekend": 5,
        "social_balance_score": -0.075,
        "avg_score": 11.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000164",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "social_balance_score": -0.1,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000346",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.1,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000335",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": -0.1,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000405",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": -0.1,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000627",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 4,
        "alcohol_weekend": 2,
        "social_balance_score": -0.1,
        "avg_score": 20
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000067",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": -0.1,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000462",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 2,
        "alcohol_weekday": 4,
        "alcohol_weekend": 3,
        "social_balance_score": -0.1,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000637",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": -0.1,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000372",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": -0.1,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000119",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": -0.1,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000359",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": -0.1,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000144",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 5,
        "alcohol_weekend": 1,
        "social_balance_score": -0.1,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000320",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": -0.1,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000181",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": -0.1,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000297",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.1,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000238",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": -0.1,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000414",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 3,
        "alcohol_weekday": 5,
        "alcohol_weekend": 2,
        "social_balance_score": -0.1,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000552",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": -0.125,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000055",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 4,
        "alcohol_weekend": 4,
        "social_balance_score": -0.125,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000551",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": -0.125,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000030",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": -0.125,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000143",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 4,
        "alcohol_weekend": 5,
        "social_balance_score": -0.125,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000280",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": -0.125,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000535",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "social_balance_score": -0.125,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000406",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": -0.125,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000601",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": -0.125,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000380",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 4,
        "go_out_freq": 5,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": -0.125,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000548",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 2,
        "alcohol_weekend": 1,
        "social_balance_score": -0.125,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000607",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 3,
        "alcohol_weekday": 3,
        "alcohol_weekend": 1,
        "social_balance_score": -0.125,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000142",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.15,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000540",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": -0.15,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000542",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.15,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000232",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": -0.15,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000109",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "social_balance_score": -0.15,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000440",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.15,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000248",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": -0.15,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000426",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.15,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000635",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.15,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000312",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "social_balance_score": -0.15,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000020",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": -0.15,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000204",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 5,
        "social_balance_score": -0.15,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000213",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "social_balance_score": -0.15,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000379",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "social_balance_score": -0.15,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000515",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "social_balance_score": -0.15,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000069",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": -0.15,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000514",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": -0.15,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000503",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "social_balance_score": -0.15,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000529",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.15,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000530",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.15,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000028",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 4,
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "social_balance_score": -0.15,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000502",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 5,
        "social_balance_score": -0.175,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000316",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.175,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000235",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.175,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000547",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.175,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000500",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "social_balance_score": -0.175,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000545",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 2,
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "social_balance_score": -0.175,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000171",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 5,
        "social_balance_score": -0.175,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000386",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.175,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000475",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 4,
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "social_balance_score": -0.2,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000226",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 4,
        "alcohol_weekend": 5,
        "social_balance_score": -0.2,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000528",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "social_balance_score": -0.2,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000008",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.225,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000421",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "social_balance_score": -0.225,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000383",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "social_balance_score": -0.225,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000361",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.225,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000285",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 5,
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "social_balance_score": -0.225,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000501",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 3,
        "go_out_freq": 5,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": -0.25,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000090",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "social_balance_score": -0.25,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000532",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "social_balance_score": -0.25,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000307",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 5,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": -0.275,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000369",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 5,
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "social_balance_score": -0.275,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000183",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 5,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": -0.3,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000419",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 3,
        "alcohol_weekday": 4,
        "alcohol_weekend": 5,
        "social_balance_score": -0.3,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000416",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 2,
        "go_out_freq": 5,
        "alcohol_weekday": 4,
        "alcohol_weekend": 4,
        "social_balance_score": -0.325,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000492",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 4,
        "alcohol_weekday": 4,
        "alcohol_weekend": 1,
        "social_balance_score": -0.375,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000599",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 4,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": -0.425,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000531",
        "point_role": "Classmate",
        "is_current_student": false,
        "free_time": 1,
        "go_out_freq": 4,
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "social_balance_score": -0.425,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "point_role": "Selected student",
        "is_current_student": true,
        "free_time": 3,
        "go_out_freq": 4,
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "social_balance_score": 0.025,
        "avg_score": 36.67
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T14__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "db7f530692aee75b7264e7abf50511db971eddfae7dbed7eab65ab8c607b3dff",
  "generator_input_sha256": "4bfa9f2ed154fea6c9aa9beace5b3d1e0a2bd90aeb87cfdb06dc23d6ecc5a79b",
  "generator_input_compact": {
    "task_id": "S-T14",
    "execution_id": "exec_1781847244450_82431706",
    "task_name": "Social balance vs performance",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "Is my social life balanced with my academic commitments?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "social_balance_scatter"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "social_balance_scatter"
    ],
    "dataset_row_counts": {
      "social_balance_scatter": 649
    },
    "ai_summary_config_summary": {
      "summary_type": "correlation_evidence",
      "metric_column": null,
      "entity_column": "student_id",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": null,
      "top_k": 10,
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
  "raw_text": "Summary: The relationship between your Social Balance Score and Average Score shows a weak positive correlation. This means that as your social balance score increases, your average score tends to increase slightly, but the connection isn't very strong.\n\nInsights: Weak Positive Correlation: The correlation coefficient of 0.0144 indicates a weak positive relationship between Social Balance Score and Average Score. This suggests that while there may be a slight tendency for students with higher social balance to achieve higher average scores, the effect is minimal.\n\nEducational implications: Balancing social activities with academic responsibilities may have some positive impact on performance, but it's not a strong predictor.\n\nRecommendations: medium - Consider maintaining a balanced social life while focusing on your studies. - A balanced social life can contribute to overall well-being, which may indirectly support your academic performance.",
  "structured_payload": {
    "task_id": "S-T14",
    "execution_id": "exec_1781847244450_82431706",
    "explanation": {
      "summary": "The relationship between your Social Balance Score and Average Score shows a weak positive correlation. This means that as your social balance score increases, your average score tends to increase slightly, but the connection isn't very strong.",
      "insights": [
        {
          "title": "Weak Positive Correlation",
          "description": "The correlation coefficient of 0.0144 indicates a weak positive relationship between Social Balance Score and Average Score. This suggests that while there may be a slight tendency for students with higher social balance to achieve higher average scores, the effect is minimal.",
          "severity": "low",
          "evidence": [
            {
              "metric": "social_balance_score",
              "value": "0.5",
              "comparison": "baseline",
              "delta": null,
              "context": "This score is typical among students in the dataset."
            },
            {
              "metric": "avg_score",
              "value": "55",
              "comparison": "baseline",
              "delta": null,
              "context": "This average score reflects a common performance level."
            }
          ]
        }
      ],
      "educational_implications": [
        "Balancing social activities with academic responsibilities may have some positive impact on performance, but it's not a strong predictor."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Consider maintaining a balanced social life while focusing on your studies.",
          "rationale": "A balanced social life can contribute to overall well-being, which may indirectly support your academic performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a substantial sample size, providing a reliable basis for the correlation analysis.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3.1-experimental",
    "baseline_available": true,
    "input_summary_type": "correlation_evidence",
    "ai_summary_method_warning": null,
    "full_result_row_count": 649,
    "included_row_count": 15,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "social_balance_scatter",
        "row_count": 649,
        "included_row_count": 15
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 15,
    "baseline_reference_tokens": 1370,
    "task_aware_prompt_tokens": 1662,
    "token_ratio": 1.2131,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "task_output_contract": [],
    "must_keep_keys": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (1.2131 > 1.2)."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4159,
      "token_usage": {
        "prompt_tokens": 2566,
        "completion_tokens": 378,
        "total_tokens": 2944
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000612
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T14__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "db7f530692aee75b7264e7abf50511db971eddfae7dbed7eab65ab8c607b3dff",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2566,
      "completion_tokens": 378,
      "total_tokens": 2944
    },
    "latency_ms": 4166,
    "attempts_used": 2
  },
  "source_response_body": {
    "task_id": "S-T14",
    "execution_id": "exec_1781847244450_82431706",
    "explanation": {
      "summary": "The relationship between your Social Balance Score and Average Score shows a weak positive correlation. This means that as your social balance score increases, your average score tends to increase slightly, but the connection isn't very strong.",
      "insights": [
        {
          "title": "Weak Positive Correlation",
          "description": "The correlation coefficient of 0.0144 indicates a weak positive relationship between Social Balance Score and Average Score. This suggests that while there may be a slight tendency for students with higher social balance to achieve higher average scores, the effect is minimal.",
          "severity": "low",
          "evidence": [
            {
              "metric": "social_balance_score",
              "value": "0.5",
              "comparison": "baseline",
              "delta": null,
              "context": "This score is typical among students in the dataset."
            },
            {
              "metric": "avg_score",
              "value": "55",
              "comparison": "baseline",
              "delta": null,
              "context": "This average score reflects a common performance level."
            }
          ]
        }
      ],
      "educational_implications": [
        "Balancing social activities with academic responsibilities may have some positive impact on performance, but it's not a strong predictor."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Consider maintaining a balanced social life while focusing on your studies.",
          "rationale": "A balanced social life can contribute to overall well-being, which may indirectly support your academic performance."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a substantial sample size, providing a reliable basis for the correlation analysis.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v3.1-experimental",
    "baseline_available": true,
    "input_summary_type": "correlation_evidence",
    "ai_summary_method_warning": null,
    "full_result_row_count": 649,
    "included_row_count": 15,
    "small_result_threshold": null,
    "small_result_full_rows_applied": null,
    "dataset_row_breakdown": [
      {
        "dataset_name": "social_balance_scatter",
        "row_count": 649,
        "included_row_count": 15
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 15,
    "baseline_reference_tokens": 1370,
    "task_aware_prompt_tokens": 1662,
    "token_ratio": 1.2131,
    "token_count_method": "utf8_bytes_div_4",
    "evidence_sections_included": [
      "scope",
      "primary_finding",
      "comparison",
      "trend_relationship",
      "exceptions",
      "limitations"
    ],
    "evidence_sections_omitted": [],
    "task_output_contract": [],
    "must_keep_keys": [],
    "v3_warnings": [
      "Task-aware V3 prompt exceeded the configured soft token ratio (1.2131 > 1.2)."
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4159,
      "token_usage": {
        "prompt_tokens": 2566,
        "completion_tokens": 378,
        "total_tokens": 2944
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000612
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
    "expected": 649,
    "observed": 649
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "a8efc8a5a1bdaaba7b3e423a3a55186922980fc83b1f32258aef8c20d65aef28",
    "expected_values": [
      "a8efc8a5a1bdaaba7b3e423a3a55186922980fc83b1f32258aef8c20d65aef28"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "73a9b71005a4c900d8f448dbd363e738cc480183ef3584e7d662bdf6ac7d772e",
    "expected": "73a9b71005a4c900d8f448dbd363e738cc480183ef3584e7d662bdf6ac7d772e"
  },
  {
    "check_id": "numeric_fields_social_balance_scatter",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "social_balance_scatter",
    "numeric_columns": [
      "alcohol_weekday",
      "alcohol_weekend",
      "avg_score",
      "free_time",
      "go_out_freq",
      "social_balance_score"
    ],
    "numeric_summaries": {
      "alcohol_weekday": {
        "count": 649,
        "min": 1,
        "max": 5
      },
      "alcohol_weekend": {
        "count": 649,
        "min": 1,
        "max": 5
      },
      "avg_score": {
        "count": 649,
        "min": 6.67,
        "max": 93.33
      },
      "free_time": {
        "count": 649,
        "min": 1,
        "max": 5
      },
      "go_out_freq": {
        "count": 649,
        "min": 1,
        "max": 5
      },
      "social_balance_score": {
        "count": 649,
        "min": -0.425,
        "max": 0.5
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_social_balance_scatter",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "social_balance_scatter",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
