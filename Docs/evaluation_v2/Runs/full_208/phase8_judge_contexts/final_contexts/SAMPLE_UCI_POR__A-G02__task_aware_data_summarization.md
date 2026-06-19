# LLM Judge V2 Final Judge Context - SAMPLE_UCI_POR__A-G02__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_UCI_POR__A-G02__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "A-G02",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Engagement–performance relationship",
  "scope": "Many students",
  "actionable_question": "Does engaging more in this class actually lead to better grades?",
  "target_audience": "instructor",
  "ai_summary_type": "correlation_evidence",
  "ai_prompt_hint": "Describe correlation direction and strength. Flag outliers (high engagement, low score) as a special case.",
  "query_labels": [
    "engagement_performance_scatter"
  ],
  "explanation_strategy": "correlation"
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
    "engagement_score [FE cross]",
    "avg_score [FE cross]",
    "final_outcome"
  ],
  "output_schema": {},
  "query_labels": [
    "engagement_performance_scatter"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G02-CORE-01",
      "description": "Describe correlation direction and strength."
    },
    {
      "requirement_id": "A-G02-CORE-02",
      "description": "Flag outliers (high engagement, low score) as a special case."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G02-CONSTRAINT-01",
      "description": "Describe the engagement-score relationship as correlational; do not infer that engagement causes score outcomes."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
}
```

## Deterministic Retrieval Evidence

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "engagement_performance_scatter",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G02.json",
      "artifact_sha256": "ec1f523b113edf667ebc50cd23a781f0582552aee4eb0ead13dd52d986b33157",
      "row_count": 649,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 649,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 649,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_UCI_POR__A-G02__task_aware_data_summarization.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "ec1f523b113edf667ebc50cd23a781f0582552aee4eb0ead13dd52d986b33157",
  "evidence_rows_sha256": "8e063cea0577e6cef735683d26fbb6a3fa7beb23d83610c7718fc22fd8c7971a",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 649,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_UCI_POR__A-G02__task_aware_data_summarization__engagement_performance_scatter__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "engagement_performance_scatter",
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
    "generated_at": "2026-06-19T07:41:43.799Z",
    "record_id": "SAMPLE_UCI_POR__A-G02__task_aware_data_summarization",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_UCI_POR__A-G02__task_aware_data_summarization__engagement_performance_scatter__chunk_1",
        "dataset_label": "engagement_performance_scatter",
        "row_start_inclusive": 0,
        "row_end_inclusive": 648,
        "row_count": 649,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G02.json",
        "source_artifact_sha256": "ec1f523b113edf667ebc50cd23a781f0582552aee4eb0ead13dd52d986b33157"
      }
    ]
  },
  "retrieved_datasets_sha256": "8e063cea0577e6cef735683d26fbb6a3fa7beb23d83610c7718fc22fd8c7971a",
  "retrieved_datasets": {
    "engagement_performance_scatter": [
      {
        "student_id": "SAMPLE_UCI_POR_STU_000001",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000002",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000003",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000004",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000005",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000006",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000007",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000008",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000009",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000010",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000011",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000012",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000013",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000014",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000015",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000016",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000017",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000018",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000019",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000020",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000021",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000022",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000023",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000024",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000025",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000026",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000027",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000028",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000029",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000030",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000031",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000032",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000033",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000034",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000035",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000036",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000037",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000038",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000039",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000040",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000041",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000042",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000043",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000044",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000045",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000046",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000047",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000048",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000049",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000050",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000051",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000052",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000053",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000054",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000055",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000056",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000057",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000058",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000059",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000060",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000061",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000062",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000063",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000064",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000065",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000066",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000067",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000068",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000069",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000070",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000071",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000072",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000073",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000074",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000075",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000076",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000077",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000078",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000079",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000080",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000081",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000082",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000083",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000084",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000085",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000086",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000087",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000088",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000089",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000090",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000091",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000092",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000093",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000094",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000095",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000096",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000097",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000098",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000099",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000100",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000101",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000102",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000103",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000104",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000105",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000106",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000107",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000108",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000109",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000110",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000111",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000112",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000113",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000114",
        "engagement_score": 0,
        "avg_score": 88.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000115",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000116",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000117",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000118",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000119",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000120",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000121",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000122",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000123",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000124",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000125",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000126",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000127",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000128",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000129",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000130",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000131",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000132",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000133",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000134",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000135",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000136",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000137",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000138",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000139",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000140",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000141",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000142",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000143",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000144",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000145",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000146",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000147",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000148",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000149",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000150",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000151",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000152",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000153",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000154",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000155",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000156",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000157",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000158",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000159",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000160",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000161",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000162",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000163",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000164",
        "engagement_score": 0,
        "avg_score": 33.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000165",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000166",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000167",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000168",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000169",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000170",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000171",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000172",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000173",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000174",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000175",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000176",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000177",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000178",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000179",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000180",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000181",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000182",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000183",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000184",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000185",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000186",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000187",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000188",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000189",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000190",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000191",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000192",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000193",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000194",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000195",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000196",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000197",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000198",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000199",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000200",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000201",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000202",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000203",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000204",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000205",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000206",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000207",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000208",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000209",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000210",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000211",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000212",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000213",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000214",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000215",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000216",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000217",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000218",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000219",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000220",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000221",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000222",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000223",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000224",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000225",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000226",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000227",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000228",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000229",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000230",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000231",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000232",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000233",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000234",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000235",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000236",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000237",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000238",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000239",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000240",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000241",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000242",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000243",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000244",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000245",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000246",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000247",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000248",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000249",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000250",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000251",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000252",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000253",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000254",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000255",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000256",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000257",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000258",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000259",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000260",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000261",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000262",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000263",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000264",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000265",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000266",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000267",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000268",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000269",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000270",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000271",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000272",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000273",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000274",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000275",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000276",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000277",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000278",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000279",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000280",
        "engagement_score": 0,
        "avg_score": 33.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000281",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000282",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000283",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000284",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000285",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000286",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000287",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000288",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000289",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000290",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000291",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000292",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000293",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000294",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000295",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000296",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000297",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000298",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000299",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000300",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000301",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000302",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000303",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000304",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000305",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000306",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000307",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000308",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000309",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000310",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000311",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000312",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000313",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000314",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000315",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000316",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000317",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000318",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000319",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000320",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000321",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000322",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000323",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000324",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000325",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000326",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000327",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000328",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000329",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000330",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000331",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000332",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000333",
        "engagement_score": 0,
        "avg_score": 90,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000334",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000335",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000336",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000337",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000338",
        "engagement_score": 0,
        "avg_score": 88.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000339",
        "engagement_score": 0,
        "avg_score": 93.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000340",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000341",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000342",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000343",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000344",
        "engagement_score": 0,
        "avg_score": 83.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000345",
        "engagement_score": 0,
        "avg_score": 88.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000346",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000347",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000348",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000349",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000350",
        "engagement_score": 0,
        "avg_score": 90,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000351",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000352",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000353",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000354",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000355",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000356",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000357",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000358",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000359",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000360",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000361",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000362",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000363",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000364",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000365",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000366",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000367",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000368",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000369",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000370",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000371",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000372",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000373",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000374",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000375",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000376",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000377",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000378",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000379",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000380",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000381",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000382",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000383",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000384",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000385",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000386",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000387",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000388",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000389",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000390",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000391",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000392",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000393",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000394",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000395",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000396",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000397",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000398",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000399",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000400",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000401",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000402",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000403",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000404",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000405",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000406",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000407",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000408",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000409",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000410",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000411",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000412",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000413",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000414",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000415",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000416",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000417",
        "engagement_score": 0,
        "avg_score": 86.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000418",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000419",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000420",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000421",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000422",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000423",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000424",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000425",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000426",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000427",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000428",
        "engagement_score": 0,
        "avg_score": 83.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000429",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000430",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000431",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000432",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000433",
        "engagement_score": 0,
        "avg_score": 31.666666666666668,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000434",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000435",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000436",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000437",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000438",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000439",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000440",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000441",
        "engagement_score": 0,
        "avg_score": 11.666666666666666,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000442",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000443",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000444",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000445",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000446",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000447",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000448",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000449",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000450",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000451",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000452",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000453",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000454",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000455",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000456",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000457",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000458",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000459",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000460",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000461",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000462",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000463",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000464",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000465",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000466",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000467",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000468",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000469",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000470",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000471",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000472",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000473",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000474",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000475",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000476",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000477",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000478",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000479",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000480",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000481",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000482",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000483",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000484",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000485",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000486",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000487",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000488",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000489",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000490",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000491",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000492",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000493",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000494",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000495",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000496",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000497",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000498",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000499",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000500",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000501",
        "engagement_score": 0,
        "avg_score": 33.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000502",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000503",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000504",
        "engagement_score": 0,
        "avg_score": 70,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000505",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000506",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000507",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000508",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000509",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000510",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000511",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000512",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000513",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000514",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000515",
        "engagement_score": 0,
        "avg_score": 33.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000516",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000517",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000518",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000519",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000520",
        "engagement_score": 0,
        "avg_score": 25,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000521",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000522",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000523",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000524",
        "engagement_score": 0,
        "avg_score": 28.333333333333332,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000525",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000526",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000527",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000528",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000529",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000530",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000531",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000532",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000533",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000534",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000535",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000536",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000537",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000538",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000539",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000540",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000541",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000542",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000543",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000544",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000545",
        "engagement_score": 0,
        "avg_score": 58.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000546",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000547",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000548",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000549",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000550",
        "engagement_score": 0,
        "avg_score": 88.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000551",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000552",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000553",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000554",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000555",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000556",
        "engagement_score": 0,
        "avg_score": 66.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000557",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000558",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000559",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000560",
        "engagement_score": 0,
        "avg_score": 61.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000561",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000562",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000563",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000564",
        "engagement_score": 0,
        "avg_score": 11.666666666666666,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000565",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000566",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000567",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000568",
        "engagement_score": 0,
        "avg_score": 6.666666666666667,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000569",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000570",
        "engagement_score": 0,
        "avg_score": 33.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000571",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000572",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000573",
        "engagement_score": 0,
        "avg_score": 28.333333333333332,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000574",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000575",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000576",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000577",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000578",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000579",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000580",
        "engagement_score": 0,
        "avg_score": 46.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000581",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000582",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000583",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000584",
        "engagement_score": 0,
        "avg_score": 23.333333333333332,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000585",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000586",
        "engagement_score": 0,
        "avg_score": 38.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000587",
        "engagement_score": 0,
        "avg_score": 26.666666666666668,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000588",
        "engagement_score": 0,
        "avg_score": 35,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000589",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000590",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000591",
        "engagement_score": 0,
        "avg_score": 36.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000592",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000593",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000594",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000595",
        "engagement_score": 0,
        "avg_score": 90,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000596",
        "engagement_score": 0,
        "avg_score": 85,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000597",
        "engagement_score": 0,
        "avg_score": 88.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000598",
        "engagement_score": 0,
        "avg_score": 15,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000599",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000600",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000601",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000602",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000603",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000604",
        "engagement_score": 0,
        "avg_score": 8.333333333333334,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000605",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000606",
        "engagement_score": 0,
        "avg_score": 8.333333333333334,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000607",
        "engagement_score": 0,
        "avg_score": 90,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000608",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000609",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000610",
        "engagement_score": 0,
        "avg_score": 56.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000611",
        "engagement_score": 0,
        "avg_score": 13.333333333333334,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000612",
        "engagement_score": 0,
        "avg_score": 71.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000613",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000614",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000615",
        "engagement_score": 0,
        "avg_score": 60,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000616",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000617",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000618",
        "engagement_score": 0,
        "avg_score": 90,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000619",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000620",
        "engagement_score": 0,
        "avg_score": 63.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000621",
        "engagement_score": 0,
        "avg_score": 73.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000622",
        "engagement_score": 0,
        "avg_score": 65,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000623",
        "engagement_score": 0,
        "avg_score": 45,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000624",
        "engagement_score": 0,
        "avg_score": 78.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000625",
        "engagement_score": 0,
        "avg_score": 41.666666666666664,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000626",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000627",
        "engagement_score": 0,
        "avg_score": 20,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000628",
        "engagement_score": 0,
        "avg_score": 48.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000629",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000630",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000631",
        "engagement_score": 0,
        "avg_score": 81.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000632",
        "engagement_score": 0,
        "avg_score": 55,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000633",
        "engagement_score": 0,
        "avg_score": 40,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000634",
        "engagement_score": 0,
        "avg_score": 68.33333333333333,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000635",
        "engagement_score": 0,
        "avg_score": 80,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000636",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000637",
        "engagement_score": 0,
        "avg_score": 90,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000638",
        "engagement_score": 0,
        "avg_score": 23.333333333333332,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000639",
        "engagement_score": 0,
        "avg_score": 75,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000640",
        "engagement_score": 0,
        "avg_score": 21.666666666666668,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000641",
        "engagement_score": 0,
        "avg_score": 23.333333333333332,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000642",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000643",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000644",
        "engagement_score": 0,
        "avg_score": 43.333333333333336,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000645",
        "engagement_score": 0,
        "avg_score": 51.666666666666664,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000646",
        "engagement_score": 0,
        "avg_score": 76.66666666666667,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000647",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000648",
        "engagement_score": 0,
        "avg_score": 50,
        "final_outcome": "Pass"
      },
      {
        "student_id": "SAMPLE_UCI_POR_STU_000649",
        "engagement_score": 0,
        "avg_score": 53.333333333333336,
        "final_outcome": "Pass"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G02__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "9b6b32bf97a66aa02b84ea121ffd951de0bcd080ca791093df7182a9e83ed994",
  "generator_input_sha256": "535a7abee8940a4e5980f4581e62c477f43907cf5bde3fd70390c29b4c0f7548",
  "generator_input_compact": {
    "task_id": "A-G02",
    "execution_id": "exec_1781847232116_05e73795",
    "task_name": "Engagement–performance relationship",
    "analysis_type": "correlation",
    "explanation_strategy": "correlation",
    "actionable_question": "Does engaging more in this class actually lead to better grades?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "engagement_performance_scatter"
    ],
    "confidence": {
      "level": "LOW",
      "reason": "No positive engagement activity found (0 engagement rows)."
    },
    "dataset_labels": [
      "engagement_performance_scatter"
    ],
    "dataset_row_counts": {
      "engagement_performance_scatter": 649
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
  "raw_text": "Summary: The analysis of the relationship between Engagement Score and Average Score reveals a concerning pattern where several students exhibit high engagement but low average scores. This suggests that while engagement may be present, it does not necessarily translate into improved academic performance for all students.\n\nInsights: Outliers with High Engagement and Low Scores: A notable number of students (e.g., those with engagement scores of 0.0) have average scores ranging from 6.6667 to 23.3333, indicating a significant disconnect between engagement and performance. This pattern highlights potential issues in the effectiveness of engagement strategies for these students.\n\nEducational implications: The presence of students who are engaged yet underperforming suggests that engagement alone is insufficient for academic success. It may indicate a need for targeted support or intervention strategies.\n\nRecommendations: high - Implement targeted support for students with high engagement but low performance. - Providing additional resources or personalized assistance may help bridge the gap between engagement and academic achievement.",
  "structured_payload": {
    "task_id": "A-G02",
    "execution_id": "exec_1781847232116_05e73795",
    "explanation": {
      "summary": "The analysis of the relationship between Engagement Score and Average Score reveals a concerning pattern where several students exhibit high engagement but low average scores. This suggests that while engagement may be present, it does not necessarily translate into improved academic performance for all students.",
      "insights": [
        {
          "title": "Outliers with High Engagement and Low Scores",
          "description": "A notable number of students (e.g., those with engagement scores of 0.0) have average scores ranging from 6.6667 to 23.3333, indicating a significant disconnect between engagement and performance. This pattern highlights potential issues in the effectiveness of engagement strategies for these students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Students with high engagement but low average scores"
            },
            {
              "metric": "avg_score",
              "value": 15,
              "comparison": "baseline",
              "delta": null,
              "context": "Average score of outlier students"
            }
          ]
        }
      ],
      "educational_implications": [
        "The presence of students who are engaged yet underperforming suggests that engagement alone is insufficient for academic success. It may indicate a need for targeted support or intervention strategies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support for students with high engagement but low performance.",
          "rationale": "Providing additional resources or personalized assistance may help bridge the gap between engagement and academic achievement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "The inability to derive a Pearson coefficient and the presence of outliers limit the reliability of the correlation analysis.",
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
        "dataset_name": "engagement_performance_scatter",
        "row_count": 649,
        "included_row_count": 649
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6551,
      "token_usage": {
        "prompt_tokens": 1537,
        "completion_tokens": 413,
        "total_tokens": 1950
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000478
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G02__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "9b6b32bf97a66aa02b84ea121ffd951de0bcd080ca791093df7182a9e83ed994",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 1537,
      "completion_tokens": 413,
      "total_tokens": 1950
    },
    "latency_ms": 6562,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G02",
    "execution_id": "exec_1781847232116_05e73795",
    "explanation": {
      "summary": "The analysis of the relationship between Engagement Score and Average Score reveals a concerning pattern where several students exhibit high engagement but low average scores. This suggests that while engagement may be present, it does not necessarily translate into improved academic performance for all students.",
      "insights": [
        {
          "title": "Outliers with High Engagement and Low Scores",
          "description": "A notable number of students (e.g., those with engagement scores of 0.0) have average scores ranging from 6.6667 to 23.3333, indicating a significant disconnect between engagement and performance. This pattern highlights potential issues in the effectiveness of engagement strategies for these students.",
          "severity": "high",
          "evidence": [
            {
              "metric": "engagement_score",
              "value": 0,
              "comparison": "baseline",
              "delta": null,
              "context": "Students with high engagement but low average scores"
            },
            {
              "metric": "avg_score",
              "value": 15,
              "comparison": "baseline",
              "delta": null,
              "context": "Average score of outlier students"
            }
          ]
        }
      ],
      "educational_implications": [
        "The presence of students who are engaged yet underperforming suggests that engagement alone is insufficient for academic success. It may indicate a need for targeted support or intervention strategies."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement targeted support for students with high engagement but low performance.",
          "rationale": "Providing additional resources or personalized assistance may help bridge the gap between engagement and academic achievement."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "LOW",
      "reason": "The inability to derive a Pearson coefficient and the presence of outliers limit the reliability of the correlation analysis.",
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
        "dataset_name": "engagement_performance_scatter",
        "row_count": 649,
        "included_row_count": 649
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6551,
      "token_usage": {
        "prompt_tokens": 1537,
        "completion_tokens": 413,
        "total_tokens": 1950
      },
      "strategy": "correlation",
      "granularity": "semester",
      "cost_usd": 0.000478
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
    "observed": "ec1f523b113edf667ebc50cd23a781f0582552aee4eb0ead13dd52d986b33157",
    "expected_values": [
      "ec1f523b113edf667ebc50cd23a781f0582552aee4eb0ead13dd52d986b33157"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "8e063cea0577e6cef735683d26fbb6a3fa7beb23d83610c7718fc22fd8c7971a",
    "expected": "8e063cea0577e6cef735683d26fbb6a3fa7beb23d83610c7718fc22fd8c7971a"
  },
  {
    "check_id": "numeric_fields_engagement_performance_scatter",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "engagement_performance_scatter",
    "numeric_columns": [
      "avg_score",
      "engagement_score"
    ],
    "numeric_summaries": {
      "avg_score": {
        "count": 649,
        "min": 6.666666666666667,
        "max": 93.33333333333333
      },
      "engagement_score": {
        "count": 649,
        "min": 0,
        "max": 0
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_engagement_performance_scatter",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "engagement_performance_scatter",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
