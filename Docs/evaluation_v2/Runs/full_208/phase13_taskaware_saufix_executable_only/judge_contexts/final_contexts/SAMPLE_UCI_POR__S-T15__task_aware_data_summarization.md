# LLM Judge Final Judge Context - SAMPLE_UCI_POR__S-T15__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2_PHASE13_SAUFIX_EXECUTABLE_ONLY.md`
- Prompt SHA-256: `8ae00287d6a8e9c23c769c97b4d11aa90e05e9126f8cd3e71fcef74500d6f48f`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T15__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_phase13_saufix_executable_only__SAMPLE_UCI_POR",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T15",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_phase13_saufix_action_correction_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Family context vs performance",
  "scope": "1 student + cohort context",
  "actionable_question": "How might my family background be reflected in my academic patterns?",
  "target_audience": "student",
  "ai_summary_type": "correlation_evidence",
  "ai_prompt_hint": "Compare the selected student against the class family-context scatter. Highlight the student's position and any cohort-level association between family_stability_score and avg_score. Frame findings as associative, not causal, and avoid prescriptive suggestions.",
  "query_labels": [
    "family_context_scatter"
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
    "family_stability_score [FE single]",
    "avg_score [FE cross]",
    "family_relation",
    "parent_cohabitation_status",
    "mother/father_education_level"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "point_role",
      "family_stability_score",
      "avg_score"
    ],
    "optional_columns": [
      "is_current_student",
      "family_relation",
      "parent_cohabitation_status",
      "mother_education_level",
      "father_education_level"
    ]
  },
  "query_labels": [
    "family_context_scatter"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "S-T15-CORE-01",
      "description": "Compare the selected student against the class family-context scatter."
    },
    {
      "requirement_id": "S-T15-CORE-02",
      "description": "Highlight the student's position and any cohort-level association between family_stability_score and avg_score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "S-T15-CONSTRAINT-01",
      "description": "Frame findings as associative, not causal, and avoid prescriptive suggestions."
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
      "dataset_label": "family_context_scatter",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T15.json",
      "artifact_sha256": "9a45d1b72a483a01ab7c106e9b4421e7c4343e3515027c15b9328219dcd52fc0",
      "row_count": 649,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 649,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 649,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_inputs/retrieval_logs/SAMPLE_UCI_POR__S-T15__task_aware_data_summarization.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "9a45d1b72a483a01ab7c106e9b4421e7c4343e3515027c15b9328219dcd52fc0",
  "evidence_rows_sha256": "99e4dae3b30686e0e3a61c1dbb3bac038e2a25c1477640d389992478830186eb",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 649,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_UCI_POR__S-T15__task_aware_data_summarization__family_context_scatter__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "family_context_scatter",
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
    "generated_at": "2026-06-21T10:35:32.005Z",
    "record_id": "SAMPLE_UCI_POR__S-T15__task_aware_data_summarization",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_UCI_POR__S-T15__task_aware_data_summarization__family_context_scatter__chunk_1",
        "dataset_label": "family_context_scatter",
        "row_start_inclusive": 0,
        "row_end_inclusive": 648,
        "row_count": 649,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T15.json",
        "source_artifact_sha256": "9a45d1b72a483a01ab7c106e9b4421e7c4343e3515027c15b9328219dcd52fc0"
      }
    ]
  },
  "retrieved_datasets_sha256": "99e4dae3b30686e0e3a61c1dbb3bac038e2a25c1477640d389992478830186eb",
  "retrieved_datasets": {
    "family_context_scatter": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000547",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000037",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 1,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000211",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000010",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000103",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000348",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000381",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000239",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000197",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000194",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 1,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000546",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000229",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000587",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 1,
        "avg_score": 26.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000310",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 1,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000641",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 1,
        "avg_score": 23.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000110",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000066",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 1,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000365",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000031",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000094",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 1,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000444",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "1",
        "family_stability_score": 1,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000443",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "1",
        "family_stability_score": 1,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000643",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 1,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000524",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 28.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000042",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000006",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000116",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000596",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000364",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000402",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 1,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000401",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 1,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000362",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 1,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000530",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000631",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000088",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 1,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000226",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000014",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 1,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000099",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000139",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000126",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000272",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000271",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000270",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 1,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000634",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000543",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000100",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 1,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000152",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000141",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000022",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 1,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000545",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000035",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.95,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000385",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.95,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000350",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.95,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000340",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.95,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000108",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000308",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.95,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000303",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.95,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000118",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000119",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000284",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000280",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.95,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000279",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000259",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.95,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000558",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.95,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000250",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.95,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000242",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000209",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000498",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000198",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000241",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.95,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000178",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000626",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000018",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000645",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000447",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000439",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000427",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000074",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.95,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000019",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.95,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000614",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000240",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.95,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000400",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.95,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000082",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000034",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000394",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000389",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.95,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000542",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000261",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000255",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000012",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.9,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000536",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000219",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000642",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000218",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000603",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000156",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.9,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000183",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000571",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000529",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000563",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000528",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000044",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000520",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.9,
        "avg_score": 25
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000518",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000511",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000559",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000505",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000590",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000501",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000499",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.9,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000482",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.9,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000477",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.9,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000476",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000468",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000458",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000450",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000448",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.9,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000420",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.9,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000078",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000084",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000388",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000355",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.9,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000584",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 23.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000330",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000107",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000298",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000297",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.9,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000115",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.9,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000024",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000122",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000125",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000132",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.9,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000264",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.9,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000595",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000597",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000607",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000016",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000021",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000023",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000025",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000030",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000032",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000033",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000039",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000043",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000048",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000049",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000050",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000052",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000060",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000065",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000076",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000086",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000092",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000101",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000102",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000117",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000123",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000131",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000644",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000140",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000148",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000154",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000168",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000182",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000184",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000187",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000190",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000193",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000210",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000213",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000214",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000215",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000220",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000224",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000247",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000248",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000258",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000290",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000293",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000302",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000309",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000317",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000324",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000337",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000338",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000343",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000344",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 83.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000347",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000349",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000357",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000358",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000360",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000363",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000369",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000378",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000382",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000387",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000392",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000396",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000397",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000403",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000413",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000449",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000470",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000624",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000502",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000517",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000523",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000525",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000526",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000527",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "1",
        "family_stability_score": 0.875,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000535",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000548",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "1",
        "family_stability_score": 0.875,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000550",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.875,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000013",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000615",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.875,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000613",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.875,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000329",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000446",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000578",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000625",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000062",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000606",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 8.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000567",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000422",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "0",
        "family_stability_score": 0.85,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000142",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000149",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000441",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 11.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000510",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000457",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000436",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000532",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000483",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000414",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000206",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000171",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000433",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 31.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000618",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000179",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000328",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000489",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.85,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000565",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000192",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000283",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000451",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000104",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000225",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000068",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.825,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000353",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000230",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000356",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000531",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000189",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000570",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000361",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000070",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.825,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000071",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.825,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000440",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000005",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000208",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000399",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000188",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000649",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000432",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000407",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.825,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000428",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 83.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000620",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000424",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000379",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000646",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.825,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000091",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000383",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000075",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000418",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000256",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000393",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000593",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000112",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000496",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000180",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000205",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000176",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000639",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000312",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000313",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000173",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000635",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000580",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000481",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000169",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000541",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000200",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000478",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000167",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000475",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000166",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000196",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000471",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000274",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000579",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000636",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.825,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000216",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000552",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000083",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.825,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000341",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000281",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.825,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000391",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000411",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000409",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000405",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000079",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000404",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000610",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000234",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000235",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000207",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000202",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000243",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000246",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000160",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000251",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000252",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000027",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000257",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000181",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000177",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000174",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000172",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000592",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000165",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000539",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000276",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000277",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000599",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000533",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000282",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "0",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000287",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000040",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000556",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000291",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000292",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000557",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000045",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000509",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000051",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000500",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000305",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000306",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000495",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000598",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 15
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000311",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000487",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000486",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000316",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000318",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000228",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000480",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000322",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000059",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000473",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000472",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000331",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000612",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000333",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000469",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000335",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000464",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000456",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000063",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000453",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000452",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000098",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000351",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000069",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000638",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 23.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000095",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000368",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000572",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.775,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000628",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000372",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000373",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000007",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000425",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000380",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000384",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000386",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000089",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000087",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000390",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.775,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000054",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000637",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000231",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.75,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000245",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.75,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000129",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000124",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000120",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000114",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.75,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000301",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.75,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000320",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000354",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000097",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.75,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000359",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.75,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000408",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000416",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000077",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "0",
        "family_stability_score": 0.75,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000072",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.75,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000445",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000064",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.75,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000627",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 20
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000058",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000011",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000589",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "1",
        "family_stability_score": 0.75,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000004",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.75,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000162",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000185",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000544",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000020",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.75,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000017",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.75,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000195",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.75,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000377",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000506",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000085",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000640",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 21.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000581",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000236",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000566",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000003",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000562",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000459",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000460",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000461",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000462",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000463",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000553",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000217",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000334",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000332",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000223",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000186",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "0",
        "family_stability_score": 0.725,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000147",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000561",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000157",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000260",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000134",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000266",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000560",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "0",
        "family_stability_score": 0.725,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000633",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000575",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000314",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000273",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000490",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000275",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000497",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000278",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000288",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000601",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000632",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000508",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000574",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000426",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000521",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000513",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000437",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000294",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000442",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000605",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.725,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000127",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.7,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000036",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000323",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.7,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000053",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.7,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000522",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000263",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "1",
        "father_education_level": "4",
        "family_stability_score": 0.7,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000336",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.7,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000514",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.7,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000515",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.7,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000232",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000507",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000046",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000212",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000430",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.7,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000419",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000423",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.7,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000366",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000093",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.7,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000467",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.7,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000111",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.7,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000623",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000081",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000569",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.7,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000576",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000604",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.7,
        "avg_score": 8.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000253",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "1",
        "family_stability_score": 0.7,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000130",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000029",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.7,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000304",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000159",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.7,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000233",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.7,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000143",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.7,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000105",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.7,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000339",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.7,
        "avg_score": 93.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000375",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.7,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000585",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "T",
        "mother_education_level": "0",
        "father_education_level": "0",
        "family_stability_score": 0.675,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000299",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000376",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "0",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000629",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000374",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000367",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.65,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000438",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "0",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000238",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000352",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000466",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000325",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000484",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000315",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000055",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.65,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000622",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000113",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000295",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000041",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000286",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.65,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000285",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.65,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000121",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000534",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.65,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000175",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.65,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000135",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000137",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.65,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000191",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000201",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000630",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000204",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.65,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000028",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.625,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000321",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.625,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000268",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.625,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000600",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.625,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000342",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.625,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000061",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.625,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000080",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.625,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000150",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.625,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000621",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.625,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000608",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000128",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "0",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000073",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000145",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000056",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000415",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000537",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.6,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000591",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000479",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000555",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000138",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.6,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000491",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000096",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000249",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000617",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000465",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000155",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.6,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000090",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.575,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000577",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.575,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000412",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.575,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000254",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "4",
        "family_stability_score": 0.575,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000237",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.575,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000410",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.575,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000326",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "1",
        "family_stability_score": 0.575,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000267",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "2",
        "family_stability_score": 0.575,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000057",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.575,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000307",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.575,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000008",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.575,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000346",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.575,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000568",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.575,
        "avg_score": 6.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000296",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.575,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000648",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.575,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000609",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.55,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000371",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 5,
        "parent_cohabitation_status": "A",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.55,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000327",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.525,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000009",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.525,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000170",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.525,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000319",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.525,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000262",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.525,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000146",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.525,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000417",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.525,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000161",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.525,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000474",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.525,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000106",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.525,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000153",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.525,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000144",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.525,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000586",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.525,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000588",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.525,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000395",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.525,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000222",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "3",
        "family_stability_score": 0.5,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000109",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.5,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000540",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "1",
        "family_stability_score": 0.5,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000434",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.5,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000345",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.5,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000163",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.475,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000015",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.475,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000158",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.475,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000164",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.475,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000289",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.475,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000421",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.475,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000431",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.475,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000485",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.475,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000494",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "0",
        "father_education_level": "1",
        "family_stability_score": 0.475,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000504",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.475,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000516",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.475,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000538",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.475,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000551",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.475,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000582",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.475,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000594",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.475,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000619",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.475,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000136",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "4",
        "family_stability_score": 0.45,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000199",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.45,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000269",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.45,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000549",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.425,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000554",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "1",
        "father_education_level": "0",
        "family_stability_score": 0.425,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000512",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "1",
        "father_education_level": "0",
        "family_stability_score": 0.425,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000503",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.4,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000488",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.4,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000455",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.4,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000300",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.4,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000454",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "2",
        "family_stability_score": 0.4,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000429",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.4,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000602",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.4,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000564",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.4,
        "avg_score": 11.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000203",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.4,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000026",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.4,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000398",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.35,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000493",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.35,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000492",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.35,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000370",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.35,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000265",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.35,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000244",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.35,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000227",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.35,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000133",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "1",
        "family_stability_score": 0.35,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000647",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "T",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.35,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000519",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "4",
        "family_stability_score": 0.325,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000038",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.325,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000611",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 3,
        "parent_cohabitation_status": "A",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.3,
        "avg_score": 13.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000047",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.275,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000221",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "1",
        "family_stability_score": 0.275,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000573",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.275,
        "avg_score": 28.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000406",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 2,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "3",
        "family_stability_score": 0.275,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000067",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.2,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000616",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "2",
        "family_stability_score": 0.15,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000151",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "A",
        "mother_education_level": "3",
        "father_education_level": "3",
        "family_stability_score": 0.15,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000435",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "A",
        "mother_education_level": "2",
        "father_education_level": "2",
        "family_stability_score": 0.1,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000583",
        "point_role": "Classmate",
        "is_current_student": false,
        "family_relation": 1,
        "parent_cohabitation_status": "A",
        "mother_education_level": "1",
        "father_education_level": "1",
        "family_stability_score": 0.05,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "point_role": "Selected student",
        "is_current_student": true,
        "family_relation": 4,
        "parent_cohabitation_status": "A",
        "mother_education_level": "4",
        "father_education_level": "4",
        "family_stability_score": 0.575,
        "avg_score": 36.67
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T15__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "df69ad8ed1a8ebc632716c2463f726b1c6d0dd8c05d7b8673e6e61ff523f4f2a",
  "generator_input_sha256": "728b779e1caa381e2bc53486d8d9e225b18779a374886ce944e4daff3525d59d",
  "generator_input_compact": {
    "task_id": "S-T15",
    "execution_id": "exec_1781847244502_94744bd5",
    "task_name": "Family context vs performance",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "How might my family background be reflected in my academic patterns?",
    "target_audience": [
      "student"
    ],
    "query_labels": [
      "family_context_scatter"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "family_context_scatter"
    ],
    "dataset_row_counts": {
      "family_context_scatter": 649
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
      "require_sensitive_context_policy": true,
      "require_complete_action_provenance": true
    }
  }
}
```

## AI Explanation To Judge

```json
{
  "raw_text": "Summary: The analysis shows a weak positive correlation between Family Stability Score and Average Score. This suggests that as the Family Stability Score increases, the Average Score tends to increase slightly as well, but the relationship is not very strong.\n\nInsights: Weak Positive Correlation: The correlation coefficient of 0.1442 indicates a weak positive relationship between Family Stability Score and Average Score. This means that students with higher family stability scores tend to have slightly higher average scores, but the connection is not very strong.\n\nEducational implications: Understanding the family context can provide insights into academic performance, but it should not be the sole focus for improvement.\n\nRecommendations: medium - Explore support systems for students with lower family stability scores. - Providing additional resources may help improve academic outcomes for those who may be facing challenges at home.",
  "structured_payload": {
    "task_id": "S-T15",
    "execution_id": "exec_1781847244502_94744bd5",
    "explanation": {
      "summary": "The analysis shows a weak positive correlation between Family Stability Score and Average Score. This suggests that as the Family Stability Score increases, the Average Score tends to increase slightly as well, but the relationship is not very strong.",
      "insights": [
        {
          "title": "Weak Positive Correlation",
          "description": "The correlation coefficient of 0.1442 indicates a weak positive relationship between Family Stability Score and Average Score. This means that students with higher family stability scores tend to have slightly higher average scores, but the connection is not very strong.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "family_stability_score",
              "value": 0.575,
              "comparison": "baseline",
              "delta": null,
              "context": "This score reflects a student's family stability in relation to their academic performance."
            }
          ]
        }
      ],
      "educational_implications": [
        "Understanding the family context can provide insights into academic performance, but it should not be the sole focus for improvement."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Explore support systems for students with lower family stability scores.",
          "rationale": "Providing additional resources may help improve academic outcomes for those who may be facing challenges at home."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a comprehensive dataset with a sufficient sample size.",
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
        "dataset_name": "family_context_scatter",
        "row_count": 649,
        "included_row_count": 15
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 15,
    "baseline_reference_tokens": 1573,
    "task_aware_prompt_tokens": 1825,
    "token_ratio": 1.1602,
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
    "v3_warnings": [],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4673,
      "token_usage": {
        "prompt_tokens": 2601,
        "completion_tokens": 333,
        "total_tokens": 2934
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.00059
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations_saufix/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T15__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "df69ad8ed1a8ebc632716c2463f726b1c6d0dd8c05d7b8673e6e61ff523f4f2a",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2601,
      "completion_tokens": 333,
      "total_tokens": 2934
    },
    "latency_ms": 4685,
    "attempts_used": 2
  },
  "source_response_body": {
    "task_id": "S-T15",
    "execution_id": "exec_1781847244502_94744bd5",
    "explanation": {
      "summary": "The analysis shows a weak positive correlation between Family Stability Score and Average Score. This suggests that as the Family Stability Score increases, the Average Score tends to increase slightly as well, but the relationship is not very strong.",
      "insights": [
        {
          "title": "Weak Positive Correlation",
          "description": "The correlation coefficient of 0.1442 indicates a weak positive relationship between Family Stability Score and Average Score. This means that students with higher family stability scores tend to have slightly higher average scores, but the connection is not very strong.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "family_stability_score",
              "value": 0.575,
              "comparison": "baseline",
              "delta": null,
              "context": "This score reflects a student's family stability in relation to their academic performance."
            }
          ]
        }
      ],
      "educational_implications": [
        "Understanding the family context can provide insights into academic performance, but it should not be the sole focus for improvement."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Explore support systems for students with lower family stability scores.",
          "rationale": "Providing additional resources may help improve academic outcomes for those who may be facing challenges at home."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is derived from a comprehensive dataset with a sufficient sample size.",
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
        "dataset_name": "family_context_scatter",
        "row_count": 649,
        "included_row_count": 15
      }
    ],
    "raw_row_limit": 15,
    "included_raw_row_count": 15,
    "baseline_reference_tokens": 1573,
    "task_aware_prompt_tokens": 1825,
    "token_ratio": 1.1602,
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
    "v3_warnings": [],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 4673,
      "token_usage": {
        "prompt_tokens": 2601,
        "completion_tokens": 333,
        "total_tokens": 2934
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.00059
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
    "observed": "9a45d1b72a483a01ab7c106e9b4421e7c4343e3515027c15b9328219dcd52fc0",
    "expected_values": [
      "9a45d1b72a483a01ab7c106e9b4421e7c4343e3515027c15b9328219dcd52fc0"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "99e4dae3b30686e0e3a61c1dbb3bac038e2a25c1477640d389992478830186eb",
    "expected": "99e4dae3b30686e0e3a61c1dbb3bac038e2a25c1477640d389992478830186eb"
  },
  {
    "check_id": "numeric_fields_family_context_scatter",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "family_context_scatter",
    "numeric_columns": [
      "avg_score",
      "family_relation",
      "family_stability_score"
    ],
    "numeric_summaries": {
      "avg_score": {
        "count": 649,
        "min": 6.67,
        "max": 93.33
      },
      "family_relation": {
        "count": 649,
        "min": 1,
        "max": 5
      },
      "family_stability_score": {
        "count": 649,
        "min": 0.05,
        "max": 1
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_family_context_scatter",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "family_context_scatter",
    "flag_columns": [
      "parent_cohabitation_status"
    ],
    "triggered_like_counts": {
      "parent_cohabitation_status": 0
    }
  }
]
```
