# LLM Judge V2 Final Judge Context - SAMPLE_UCI_POR__A-G13__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G13__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G13",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Lifestyle risk across cohort",
  "scope": "Many students",
  "actionable_question": "Which lifestyle patterns are most common among low-performing students?",
  "target_audience": "academic_advisor",
  "ai_summary_type": "correlation_evidence",
  "ai_prompt_hint": "Rank students by lifestyle_risk_score. Correlate with avg_score. Frame as correlational, not prescriptive.",
  "query_labels": [
    "lifestyle_risk_scatter"
  ],
  "explanation_strategy": "correlation"
}
```

## Schema Context

```json
{
  "source_tables": [
    "student",
    "enrollment",
    "assessment_result",
    "assessment [UCI only]"
  ],
  "key_db_fields": [
    "alcohol_weekday",
    "alcohol_weekend",
    "go_out_freq",
    "health_status",
    "lifestyle_risk_score [FE single]; avg_score [FE cross]"
  ],
  "output_schema": {
    "required_columns": [
      "student_id",
      "lifestyle_risk_score",
      "avg_score"
    ],
    "optional_columns": [
      "alcohol_weekday",
      "alcohol_weekend",
      "go_out_freq",
      "health_status"
    ]
  },
  "query_labels": [
    "lifestyle_risk_scatter"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G13-CORE-01",
      "description": "Rank students by lifestyle_risk_score."
    },
    {
      "requirement_id": "A-G13-CORE-02",
      "description": "Correlate with avg_score."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G13-CONSTRAINT-01",
      "description": "Frame lifestyle-risk ranking as descriptive and correlational, not causal or deterministic."
    },
    {
      "constraint_id": "A-G13-CONSTRAINT-02",
      "description": "When listing students by lifestyle-risk rank, avoid language that implies individual blame."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Applicable because the task ranks identifiable students using lifestyle context."
}
```

## Deterministic Retrieval Evidence

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "lifestyle_risk_scatter",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G13.json",
      "artifact_sha256": "397dfe683a1408e0b120cba9a71cfce6162d98f0fa9fbfdf6779ba6d21741dc1",
      "row_count": 649,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 649,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 649,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_UCI_POR__A-G13__task_aware_data_summarization.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "397dfe683a1408e0b120cba9a71cfce6162d98f0fa9fbfdf6779ba6d21741dc1",
  "evidence_rows_sha256": "3c3f70751048a387d4ce08641a8fbebc6c645b9ae2606006e285da511dc3d0a0",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 649,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_UCI_POR__A-G13__task_aware_data_summarization__lifestyle_risk_scatter__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "lifestyle_risk_scatter",
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
    "generated_at": "2026-06-19T07:41:44.159Z",
    "record_id": "SAMPLE_UCI_POR__A-G13__task_aware_data_summarization",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_UCI_POR__A-G13__task_aware_data_summarization__lifestyle_risk_scatter__chunk_1",
        "dataset_label": "lifestyle_risk_scatter",
        "row_start_inclusive": 0,
        "row_end_inclusive": 648,
        "row_count": 649,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G13.json",
        "source_artifact_sha256": "397dfe683a1408e0b120cba9a71cfce6162d98f0fa9fbfdf6779ba6d21741dc1"
      }
    ]
  },
  "retrieved_datasets_sha256": "3c3f70751048a387d4ce08641a8fbebc6c645b9ae2606006e285da511dc3d0a0",
  "retrieved_datasets": {
    "lifestyle_risk_scatter": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000501",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 1,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000280",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 1,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000599",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.925,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000109",
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 0.9,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000307",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 0.85,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000458",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.85,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000448",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.85,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000055",
        "alcohol_weekday": 4,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.825,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000231",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 0.8,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000441",
        "alcohol_weekday": 4,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.8,
        "avg_score": 11.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000226",
        "alcohol_weekday": 4,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.8,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000648",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.775,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000380",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.775,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000101",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.775,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000531",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.775,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000264",
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.75,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000503",
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.75,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000215",
        "alcohol_weekday": 1,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.725,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000185",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.725,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000155",
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.725,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000248",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.725,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000028",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.725,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000161",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.725,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000577",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.7,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000092",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 0.7,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000524",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.7,
        "avg_score": 28.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000576",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.7,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000067",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.7,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000630",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 0.7,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000030",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.7,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000062",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.7,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000475",
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.675,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000492",
        "alcohol_weekday": 4,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.675,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000636",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.675,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000606",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.675,
        "avg_score": 8.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000410",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.675,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000359",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.675,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000611",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.675,
        "avg_score": 13.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000518",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.675,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000212",
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.675,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000595",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 0.65,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000316",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 0.65,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000578",
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.65,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000065",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.65,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000532",
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.65,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000484",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 0.65,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000143",
        "alcohol_weekday": 4,
        "alcohol_weekend": 5,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.65,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000404",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.625,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000129",
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.625,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000313",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.625,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000247",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.625,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000613",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.625,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000164",
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.625,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000634",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.625,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000327",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.625,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000217",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.625,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000238",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.625,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000561",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.625,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000230",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.625,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000540",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.625,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000573",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 0.6,
        "avg_score": 28.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000174",
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.6,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000173",
        "alcohol_weekday": 4,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.6,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000600",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 0.6,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000505",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 0.6,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000213",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.6,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000592",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 0.6,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000149",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 1,
        "lifestyle_risk_score": 0.6,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000342",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.6,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000292",
        "alcohol_weekday": 4,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.6,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000379",
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.6,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000637",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.6,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000047",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.6,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000190",
        "alcohol_weekday": 4,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.6,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000603",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.6,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000416",
        "alcohol_weekday": 4,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.6,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000198",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.6,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000559",
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.6,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000516",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.6,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000400",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.6,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000099",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.575,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000181",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.575,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000419",
        "alcohol_weekday": 4,
        "alcohol_weekend": 5,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.575,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000485",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.575,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000171",
        "alcohol_weekday": 1,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.575,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000243",
        "alcohol_weekday": 4,
        "alcohol_weekend": 5,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.575,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000377",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.575,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000451",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.575,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000207",
        "alcohol_weekday": 4,
        "alcohol_weekend": 5,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.575,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000446",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.575,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000343",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.575,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000623",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.575,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000507",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.575,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000405",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.575,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000053",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.55,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000257",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.55,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000285",
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.55,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000335",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.55,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000498",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.55,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000462",
        "alcohol_weekday": 4,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 2,
        "lifestyle_risk_score": 0.55,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000570",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.55,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000439",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.55,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000130",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.55,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000641",
        "alcohol_weekday": 4,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.55,
        "avg_score": 23.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000495",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.55,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000193",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.55,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000514",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.55,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000323",
        "alcohol_weekday": 4,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.55,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000088",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.55,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000541",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.55,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000383",
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.55,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000370",
        "alcohol_weekday": 4,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.55,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000251",
        "alcohol_weekday": 5,
        "alcohol_weekend": 5,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.55,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000369",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.55,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000163",
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.55,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000471",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.525,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000165",
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.525,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000151",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.525,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000643",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.525,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000320",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.525,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000646",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.525,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000362",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.525,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000364",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.525,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000376",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.525,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000621",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.525,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000386",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.525,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000093",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.525,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000395",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.525,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000517",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.525,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000104",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 2,
        "lifestyle_risk_score": 0.525,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000105",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.525,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000579",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.525,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000008",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.525,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000494",
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.525,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000631",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.525,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000178",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.525,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000176",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.525,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000169",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.525,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000429",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 1,
        "lifestyle_risk_score": 0.525,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000443",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.5,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000566",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.5,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000064",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.5,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000324",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.5,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000066",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.5,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000549",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.5,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000087",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.5,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000502",
        "alcohol_weekday": 1,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.5,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000635",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.5,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000121",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.5,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000016",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.5,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000478",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.5,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000141",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.5,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000145",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.5,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000456",
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 2,
        "lifestyle_risk_score": 0.5,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000444",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.5,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000283",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.5,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000179",
        "alcohol_weekday": 1,
        "alcohol_weekend": 5,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.5,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000418",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.5,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000311",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.5,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000312",
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.5,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000019",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.5,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000204",
        "alcohol_weekday": 1,
        "alcohol_weekend": 5,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.5,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000384",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.5,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000232",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.5,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000372",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.5,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000355",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.5,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000325",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.5,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000553",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.475,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000552",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.475,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000308",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.475,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000153",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.475,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000241",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.475,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000345",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.475,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000490",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.475,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000409",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.475,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000546",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.475,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000250",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.475,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000368",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.475,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000414",
        "alcohol_weekday": 5,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.475,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000315",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.475,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000360",
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.475,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000519",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.475,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000396",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.475,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000555",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.475,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000284",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.475,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000601",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.475,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000465",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.475,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000100",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.45,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000468",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.45,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000306",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.45,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000479",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.45,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000420",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.45,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000481",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.45,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000487",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.45,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000584",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.45,
        "avg_score": 23.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000061",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.45,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000126",
        "alcohol_weekday": 3,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.45,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000563",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.45,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000188",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.45,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000565",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.45,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000192",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.45,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000628",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.45,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000195",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.45,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000499",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.45,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000200",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.45,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000294",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.45,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000515",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.45,
        "avg_score": 33.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000402",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.45,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000394",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.45,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000393",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 2,
        "lifestyle_risk_score": 0.45,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000094",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.45,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000322",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.45,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000580",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.45,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000090",
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.45,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000273",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.45,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000268",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.45,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000317",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.45,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000056",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 2,
        "lifestyle_risk_score": 0.45,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000233",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.45,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000537",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.45,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000543",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.45,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000077",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.45,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000270",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 3,
        "lifestyle_risk_score": 0.45,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000063",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 1,
        "lifestyle_risk_score": 0.45,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000300",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.425,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000423",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.425,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000228",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.425,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000438",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.425,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000437",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.425,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000457",
        "alcohol_weekday": 2,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.425,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000575",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.425,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000024",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.425,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000199",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.425,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000363",
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.425,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000073",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.425,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000333",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.425,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000557",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.425,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000017",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.425,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000326",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.425,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000011",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.425,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000523",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.425,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000608",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.425,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000581",
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.425,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000177",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.425,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000486",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.425,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000571",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.425,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000378",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.4,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000411",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.4,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000132",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.4,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000536",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.4,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000220",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.4,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000309",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.4,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000310",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.4,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000392",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.4,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000587",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.4,
        "avg_score": 26.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000203",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.4,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000078",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.4,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000421",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.4,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000586",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.4,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000406",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.4,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000497",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.4,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000242",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.4,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000301",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 2,
        "lifestyle_risk_score": 0.4,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000528",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.4,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000381",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.4,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000430",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 2,
        "lifestyle_risk_score": 0.4,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.375,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000003",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.375,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000007",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.375,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000009",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.375,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000050",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.375,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000051",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.375,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000054",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.375,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000057",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.375,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000070",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.375,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000086",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.375,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000096",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.375,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000110",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.375,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000117",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.375,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000119",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.375,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000124",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.375,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000127",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.375,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000183",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.375,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000189",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.375,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000191",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.375,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000194",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.375,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000205",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.375,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000222",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.375,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000246",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.375,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000265",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.375,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000269",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.375,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000276",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.375,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000318",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.375,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000336",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.375,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000361",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.375,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000390",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.375,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000426",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.375,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000427",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.375,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000450",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.375,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000453",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.375,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000459",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.375,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000461",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.375,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000466",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.375,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000472",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.375,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000474",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.375,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000491",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.375,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000510",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.375,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000511",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 1,
        "lifestyle_risk_score": 0.375,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000512",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 4,
        "lifestyle_risk_score": 0.375,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000522",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 2,
        "lifestyle_risk_score": 0.375,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000556",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 3,
        "lifestyle_risk_score": 0.375,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000619",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.375,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000245",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.35,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000075",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.35,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000235",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.35,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000548",
        "alcohol_weekday": 2,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 2,
        "lifestyle_risk_score": 0.35,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000625",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 1,
        "health_status": 1,
        "lifestyle_risk_score": 0.35,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000445",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.35,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000014",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.35,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000225",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.35,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000080",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.35,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000399",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.35,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000500",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.35,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000609",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.35,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000144",
        "alcohol_weekday": 5,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.35,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000442",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.35,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000605",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 2,
        "lifestyle_risk_score": 0.35,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000297",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.35,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000196",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.35,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000261",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.35,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000506",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.35,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000509",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.35,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000201",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.35,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000041",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.35,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000042",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.35,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000330",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.35,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000244",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.35,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000156",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.35,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000642",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.325,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000403",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.325,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000069",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.325,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000433",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.325,
        "avg_score": 31.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000135",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.325,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000535",
        "alcohol_weekday": 2,
        "alcohol_weekend": 5,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.325,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000031",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.325,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000286",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.325,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000187",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.325,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000467",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.325,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000374",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.325,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000216",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.325,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000084",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.325,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000293",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.325,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000415",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.325,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000591",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.325,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000208",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.325,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000289",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.325,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000147",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.325,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000221",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.325,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000620",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.325,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000385",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.325,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000091",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.325,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000081",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.325,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000254",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000639",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000321",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.3,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000305",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000314",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000296",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 1,
        "lifestyle_risk_score": 0.3,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000329",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.3,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000629",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000334",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000021",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 1,
        "lifestyle_risk_score": 0.3,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000344",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 83.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000346",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.3,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000349",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000596",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.3,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000034",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 2,
        "lifestyle_risk_score": 0.3,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000044",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 1,
        "lifestyle_risk_score": 0.3,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000048",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 2,
        "lifestyle_risk_score": 0.3,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000567",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.3,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000562",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.3,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000072",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000550",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.3,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000371",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.3,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000375",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.3,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000547",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.3,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000076",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.3,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000227",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.3,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000219",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.3,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000389",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.3,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000633",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000391",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.3,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000085",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.3,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000209",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000279",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 2,
        "lifestyle_risk_score": 0.3,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000095",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.3,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000206",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000098",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 5,
        "health_status": 5,
        "lifestyle_risk_score": 0.3,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000508",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000112",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 2,
        "lifestyle_risk_score": 0.3,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000496",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.3,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000182",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000180",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 2,
        "lifestyle_risk_score": 0.3,
        "avg_score": 38.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000488",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 2,
        "lifestyle_risk_score": 0.3,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000482",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000167",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 4,
        "lifestyle_risk_score": 0.3,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000166",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 1,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000434",
        "alcohol_weekday": 3,
        "alcohol_weekend": 5,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0.3,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000435",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 1,
        "lifestyle_risk_score": 0.3,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000142",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 3,
        "lifestyle_risk_score": 0.3,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000278",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.275,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000116",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.275,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000432",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.275,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000622",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.275,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000332",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.275,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000417",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.275,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000287",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.275,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000120",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.275,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000172",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.275,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000170",
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.275,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000122",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.275,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000463",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 1,
        "health_status": 2,
        "lifestyle_risk_score": 0.275,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000214",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.275,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000282",
        "alcohol_weekday": 2,
        "alcohol_weekend": 4,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.275,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000134",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.275,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000338",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.275,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000218",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.275,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000382",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.275,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000545",
        "alcohol_weekday": 3,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.275,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000626",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.275,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000436",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.275,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000365",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.275,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000288",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.275,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000588",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.275,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000354",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.275,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000469",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.275,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000594",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.275,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000597",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.275,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000617",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.275,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000627",
        "alcohol_weekday": 4,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.275,
        "avg_score": 20
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000607",
        "alcohol_weekday": 3,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000266",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000341",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000397",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000424",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000013",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000152",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000638",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 23.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000464",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000644",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000539",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000544",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000049",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000572",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000045",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000649",
        "alcohol_weekday": 3,
        "alcohol_weekend": 4,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000020",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000281",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.25,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000138",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000440",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.225,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000037",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.225,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000413",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000339",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 93.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000114",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 88.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000186",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 85
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000111",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.225,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000614",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000407",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000197",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000304",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.225,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000277",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.225,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000602",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 2,
        "lifestyle_risk_score": 0.225,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000107",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000106",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.225,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000263",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000102",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.225,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000097",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.225,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000520",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 2,
        "lifestyle_risk_score": 0.225,
        "avg_score": 25
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000348",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000598",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.225,
        "avg_score": 15
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000525",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 2,
        "lifestyle_risk_score": 0.225,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000089",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000533",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000534",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000593",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.225,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000083",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000303",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000290",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.225,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000223",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000234",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.225,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000373",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000236",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000137",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 2,
        "lifestyle_risk_score": 0.225,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000583",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000040",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 2,
        "lifestyle_risk_score": 0.225,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000357",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 80
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000159",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000358",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000558",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000302",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000150",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000240",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 4,
        "lifestyle_risk_score": 0.225,
        "avg_score": 40
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000299",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 2,
        "lifestyle_risk_score": 0.225,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000425",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000328",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 86.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000274",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000125",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 4,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000259",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000015",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000493",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000184",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 3,
        "lifestyle_risk_score": 0.225,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000337",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.225,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000530",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.2,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000229",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 1,
        "health_status": 3,
        "lifestyle_risk_score": 0.2,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000616",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.2,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000538",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.2,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000632",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.2,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000615",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.2,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000202",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.2,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000260",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.2,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000529",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.2,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000454",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.2,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000455",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.2,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000353",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.2,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000401",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.2,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000211",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.2,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000253",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.2,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000526",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.2,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000412",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.2,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000068",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.2,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000527",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.2,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000521",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.175,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000483",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 1,
        "health_status": 4,
        "lifestyle_risk_score": 0.175,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000026",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.175,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000624",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.175,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000551",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.175,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000074",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.175,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000175",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.175,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000131",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.175,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000640",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.175,
        "avg_score": 21.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000029",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000140",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000470",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 3,
        "lifestyle_risk_score": 0.15,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000139",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000473",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.15,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000476",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.15,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000477",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000136",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000480",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000431",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000489",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 3,
        "lifestyle_risk_score": 0.15,
        "avg_score": 41.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000108",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000103",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000267",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.15,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000387",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000542",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000079",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 3,
        "lifestyle_risk_score": 0.15,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000224",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.15,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000237",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 3,
        "lifestyle_risk_score": 0.15,
        "avg_score": 66.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000367",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000560",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.15,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000060",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000564",
        "alcohol_weekday": 2,
        "alcohol_weekend": 3,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 11.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000052",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000569",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 3,
        "lifestyle_risk_score": 0.15,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000018",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.15,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000272",
        "alcohol_weekday": 1,
        "alcohol_weekend": 4,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000043",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000582",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000038",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000585",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000356",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 3,
        "lifestyle_risk_score": 0.15,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000590",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 3,
        "lifestyle_risk_score": 0.15,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000035",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000352",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000460",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000256",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 3,
        "lifestyle_risk_score": 0.15,
        "avg_score": 36.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000618",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.15,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000275",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.15,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000340",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.15,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000291",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000295",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000262",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 3,
        "lifestyle_risk_score": 0.15,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000298",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.15,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000449",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.15,
        "avg_score": 81.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000012",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 4,
        "lifestyle_risk_score": 0.15,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000452",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000447",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 3,
        "health_status": 5,
        "lifestyle_risk_score": 0.15,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000645",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000428",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 83.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000133",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000350",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 90
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000027",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000082",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000005",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000398",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 1,
        "health_status": 4,
        "lifestyle_risk_score": 0.125,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000157",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 60
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000006",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000271",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000366",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000388",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 73.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000162",
        "alcohol_weekday": 2,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000574",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 43.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000123",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.125,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000023",
        "alcohol_weekday": 1,
        "alcohol_weekend": 3,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0.1,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000347",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0.1,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000568",
        "alcohol_weekday": 2,
        "alcohol_weekend": 2,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0.1,
        "avg_score": 6.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000589",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000210",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000033",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000513",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 35
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000004",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000610",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 4,
        "lifestyle_risk_score": 0.075,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000025",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000612",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 4,
        "lifestyle_risk_score": 0.075,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000408",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000113",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000148",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000154",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000160",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 63.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000022",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000115",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000118",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 71.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000058",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 76.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000059",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 68.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000249",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000046",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000168",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 4,
        "lifestyle_risk_score": 0.075,
        "avg_score": 65
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000252",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 48.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000071",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000554",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 56.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000039",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 58.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000128",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000239",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 78.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000146",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000158",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 2,
        "health_status": 5,
        "lifestyle_risk_score": 0.075,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000258",
        "alcohol_weekday": 1,
        "alcohol_weekend": 2,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0.05,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000647",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0,
        "avg_score": 53.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000504",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0,
        "avg_score": 70
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000319",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0,
        "avg_score": 51.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000036",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0,
        "avg_score": 55
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000255",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0,
        "avg_score": 45
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000351",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0,
        "avg_score": 50
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000604",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0,
        "avg_score": 8.33
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000010",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0,
        "avg_score": 61.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000032",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0,
        "avg_score": 75
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000422",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0,
        "avg_score": 46.67
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000331",
        "alcohol_weekday": 1,
        "alcohol_weekend": 1,
        "go_out_freq": 1,
        "health_status": 5,
        "lifestyle_risk_score": 0,
        "avg_score": 65
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G13__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "d4505f0af1585234fb0d48649e525b31f23a8df73575f6732b2eb2c3eb93e191",
  "generator_input_sha256": "f6c2da0342b1ea7ea4e4216396d5394bd20d1f8939a6ba087ab248b02169f3be",
  "generator_input_compact": {
    "task_id": "A-G13",
    "execution_id": "exec_1781847232759_b13bae36",
    "task_name": "Lifestyle risk across cohort",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "Which lifestyle patterns are most common among low-performing students?",
    "target_audience": [
      "academic_advisor"
    ],
    "query_labels": [
      "lifestyle_risk_scatter"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "649 students × 3 assessments across 3 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "lifestyle_risk_scatter"
    ],
    "dataset_row_counts": {
      "lifestyle_risk_scatter": 649
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
  "raw_text": "Summary: The analysis reveals a weak negative correlation (coefficient = -0.1041) between Lifestyle Risk Score and Average Score among students. This suggests that as the Lifestyle Risk Score increases, the Average Score tends to decrease, albeit with limited strength in the relationship.\n\nInsights: Weak Negative Correlation: The correlation coefficient of -0.1041 indicates a weak negative relationship between Lifestyle Risk Score and Average Score, suggesting that higher lifestyle risks are associated with lower average scores, but the relationship is not strong enough to draw definitive conclusions.\n\nEducational implications: Understanding the weak negative correlation may prompt educators to explore lifestyle factors that could influence academic performance.\n\nRecommendations: medium - Conduct further qualitative research on lifestyle habits of low-performing students. - This could provide insights into specific lifestyle patterns that may be impacting academic performance.\n\nWarnings: No p-value evidence is available; statistical significance claims are not allowed.",
  "structured_payload": {
    "task_id": "A-G13",
    "execution_id": "exec_1781847232759_b13bae36",
    "explanation": {
      "summary": "The analysis reveals a weak negative correlation (coefficient = -0.1041) between Lifestyle Risk Score and Average Score among students. This suggests that as the Lifestyle Risk Score increases, the Average Score tends to decrease, albeit with limited strength in the relationship.",
      "insights": [
        {
          "title": "Weak Negative Correlation",
          "description": "The correlation coefficient of -0.1041 indicates a weak negative relationship between Lifestyle Risk Score and Average Score, suggesting that higher lifestyle risks are associated with lower average scores, but the relationship is not strong enough to draw definitive conclusions.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "coefficient",
              "value": -0.1041,
              "comparison": "baseline",
              "delta": null,
              "context": "Pearson correlation coefficient derived from 649 student pairs"
            }
          ]
        }
      ],
      "educational_implications": [
        "Understanding the weak negative correlation may prompt educators to explore lifestyle factors that could influence academic performance."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Conduct further qualitative research on lifestyle habits of low-performing students.",
          "rationale": "This could provide insights into specific lifestyle patterns that may be impacting academic performance."
        }
      ],
      "warnings": [
        "No p-value evidence is available; statistical significance claims are not allowed."
      ]
    },
    "confidence": {
      "level": "MEDIUM",
      "reason": "The correlation analysis is based on a complete dataset of 649 students, but lacks p-value evidence for statistical significance.",
      "based_on": [
        "sparse_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "correlation_evidence",
    "ai_summary_method_warning": null,
    "full_result_row_count": 649,
    "included_row_count": null,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": false,
    "dataset_row_breakdown": [
      {
        "dataset_name": "lifestyle_risk_scatter",
        "row_count": 649,
        "included_row_count": 649
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6476,
      "token_usage": {
        "prompt_tokens": 1411,
        "completion_tokens": 359,
        "total_tokens": 1770
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000427
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G13__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "d4505f0af1585234fb0d48649e525b31f23a8df73575f6732b2eb2c3eb93e191",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1411,
      "completion_tokens": 359,
      "total_tokens": 1770
    },
    "latency_ms": 6500,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G13",
    "execution_id": "exec_1781847232759_b13bae36",
    "explanation": {
      "summary": "The analysis reveals a weak negative correlation (coefficient = -0.1041) between Lifestyle Risk Score and Average Score among students. This suggests that as the Lifestyle Risk Score increases, the Average Score tends to decrease, albeit with limited strength in the relationship.",
      "insights": [
        {
          "title": "Weak Negative Correlation",
          "description": "The correlation coefficient of -0.1041 indicates a weak negative relationship between Lifestyle Risk Score and Average Score, suggesting that higher lifestyle risks are associated with lower average scores, but the relationship is not strong enough to draw definitive conclusions.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "coefficient",
              "value": -0.1041,
              "comparison": "baseline",
              "delta": null,
              "context": "Pearson correlation coefficient derived from 649 student pairs"
            }
          ]
        }
      ],
      "educational_implications": [
        "Understanding the weak negative correlation may prompt educators to explore lifestyle factors that could influence academic performance."
      ],
      "recommendations": [
        {
          "priority": "medium",
          "action": "Conduct further qualitative research on lifestyle habits of low-performing students.",
          "rationale": "This could provide insights into specific lifestyle patterns that may be impacting academic performance."
        }
      ],
      "warnings": [
        "No p-value evidence is available; statistical significance claims are not allowed."
      ]
    },
    "confidence": {
      "level": "MEDIUM",
      "reason": "The correlation analysis is based on a complete dataset of 649 students, but lacks p-value evidence for statistical significance.",
      "based_on": [
        "sparse_data"
      ]
    },
    "explanation_strategy": "correlation",
    "explanation_type": "correlation",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "correlation_evidence",
    "ai_summary_method_warning": null,
    "full_result_row_count": 649,
    "included_row_count": null,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": false,
    "dataset_row_breakdown": [
      {
        "dataset_name": "lifestyle_risk_scatter",
        "row_count": 649,
        "included_row_count": 649
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6476,
      "token_usage": {
        "prompt_tokens": 1411,
        "completion_tokens": 359,
        "total_tokens": 1770
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000427
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
    "observed": "397dfe683a1408e0b120cba9a71cfce6162d98f0fa9fbfdf6779ba6d21741dc1",
    "expected_values": [
      "397dfe683a1408e0b120cba9a71cfce6162d98f0fa9fbfdf6779ba6d21741dc1"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "3c3f70751048a387d4ce08641a8fbebc6c645b9ae2606006e285da511dc3d0a0",
    "expected": "3c3f70751048a387d4ce08641a8fbebc6c645b9ae2606006e285da511dc3d0a0"
  },
  {
    "check_id": "numeric_fields_lifestyle_risk_scatter",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "lifestyle_risk_scatter",
    "numeric_columns": [
      "alcohol_weekday",
      "alcohol_weekend",
      "avg_score",
      "go_out_freq",
      "health_status",
      "lifestyle_risk_score"
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
      "go_out_freq": {
        "count": 649,
        "min": 1,
        "max": 5
      },
      "health_status": {
        "count": 649,
        "min": 1,
        "max": 5
      },
      "lifestyle_risk_score": {
        "count": 649,
        "min": 0,
        "max": 1
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_lifestyle_risk_scatter",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "lifestyle_risk_scatter",
    "flag_columns": [
      "health_status",
      "lifestyle_risk_score"
    ],
    "triggered_like_counts": {
      "health_status": 0,
      "lifestyle_risk_score": 0
    }
  }
]
```
