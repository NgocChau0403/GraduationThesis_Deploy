# LLM Judge V2 Final Judge Context - SAMPLE_OULAD__A-G04__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `fe8096972e6c3c78192a36e98774fa584b24d08670835171a1d818895e27125e`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G04__baseline_first_20_rows",
  "evaluation_run_id": "llm_judge_v2_full_208_phase_f5",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G04",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_full_208_v1",
  "rubric_version": "judge_rubric_1_to_10_full_208_v1"
}
```

## Task Context

```json
{
  "task_name": "Assessment difficulty analysis",
  "scope": "Many students",
  "actionable_question": "Which assessment is causing the most students to fail?",
  "target_audience": "instructor",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Flag assessments with pass_flag=False rate above threshold. Suggest curriculum review.",
  "query_labels": [
    "assessment_difficulty"
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
    "assessment_name",
    "assessment_type",
    "week_of_class",
    "competency_tag",
    "score_normalized",
    "pass_flag"
  ],
  "output_schema": {
    "required_columns": [
      "assessment_name",
      "fail_rate_pct"
    ],
    "optional_columns": [
      "assessment_id",
      "assessment_order",
      "assessment_type",
      "week_of_class",
      "competency_tag",
      "competency_source",
      "total_submissions",
      "fail_count",
      "avg_score"
    ]
  },
  "query_labels": [
    "assessment_difficulty"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G04-CORE-01",
      "description": "Flag assessments with pass_flag=False rate above threshold."
    },
    {
      "requirement_id": "A-G04-CORE-02",
      "description": "Suggest curriculum review."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G04-CONSTRAINT-01",
      "description": "Frame a high fail rate as a signal for assessment or curriculum review, not as evidence of student deficiency."
    },
    {
      "constraint_id": "A-G04-CONSTRAINT-02",
      "description": "Avoid causal claims about student quality."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Retained as applicable because curriculum recommendations can affect learners; candidate for human review rather than automatic exclusion."
}
```

## Deterministic Retrieval Evidence

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "assessment_difficulty",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G04.json",
      "artifact_sha256": "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae",
      "row_count": 112,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 112,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 112,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G04__baseline_first_20_rows.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae",
  "evidence_rows_sha256": "efaaa326237f67aa56d5231bbd426e5831437f739fc7c8852c6e86fc6e2e1717",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 112,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__A-G04__baseline_first_20_rows__assessment_difficulty__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "assessment_difficulty",
        "row_start_inclusive": 0,
        "row_end_inclusive": 111,
        "row_count": 112
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
    "generated_at": "2026-06-19T07:41:45.454Z",
    "record_id": "SAMPLE_OULAD__A-G04__baseline_first_20_rows",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__A-G04__baseline_first_20_rows__assessment_difficulty__chunk_1",
        "dataset_label": "assessment_difficulty",
        "row_start_inclusive": 0,
        "row_end_inclusive": 111,
        "row_count": 112,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G04.json",
        "source_artifact_sha256": "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae"
      }
    ]
  },
  "retrieved_datasets_sha256": "efaaa326237f67aa56d5231bbd426e5831437f739fc7c8852c6e86fc6e2e1717",
  "retrieved_datasets": {
    "assessment_difficulty": [
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24288",
        "assessment_name": "24288",
        "assessment_type": "CMA",
        "assessment_order": 5,
        "week_of_class": 20,
        "competency_tag": "24288",
        "competency_source": "proxy",
        "total_submissions": 26,
        "fail_count": 13,
        "fail_rate_pct": 50,
        "avg_score": 45.04
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24283",
        "assessment_name": "24283",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 15,
        "competency_tag": "24283",
        "competency_source": "proxy",
        "total_submissions": 24,
        "fail_count": 7,
        "fail_rate_pct": 29.2,
        "avg_score": 56.63
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24289",
        "assessment_name": "24289",
        "assessment_type": "CMA",
        "assessment_order": 8,
        "week_of_class": 30,
        "competency_tag": "24289",
        "competency_source": "proxy",
        "total_submissions": 7,
        "fail_count": 2,
        "fail_rate_pct": 28.6,
        "avg_score": 45
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24286",
        "assessment_name": "24286",
        "assessment_type": "CMA",
        "assessment_order": 1,
        "week_of_class": 3,
        "competency_tag": "24286",
        "competency_source": "proxy",
        "total_submissions": 105,
        "fail_count": 29,
        "fail_rate_pct": 27.6,
        "avg_score": 49.33
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24284",
        "assessment_name": "24284",
        "assessment_type": "TMA",
        "assessment_order": 6,
        "week_of_class": 22,
        "competency_tag": "24284",
        "competency_source": "proxy",
        "total_submissions": 12,
        "fail_count": 3,
        "fail_rate_pct": 25,
        "avg_score": 51.75
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24287",
        "assessment_name": "24287",
        "assessment_type": "CMA",
        "assessment_order": 3,
        "week_of_class": 10,
        "competency_tag": "24287",
        "competency_source": "proxy",
        "total_submissions": 63,
        "fail_count": 15,
        "fail_rate_pct": 23.8,
        "avg_score": 63.25
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25360",
        "assessment_name": "25360",
        "assessment_type": "TMA",
        "assessment_order": 6,
        "week_of_class": 29,
        "competency_tag": "25360",
        "competency_source": "proxy",
        "total_submissions": 83,
        "fail_count": 16,
        "fail_rate_pct": 19.3,
        "avg_score": 64.36
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25339",
        "assessment_name": "25339",
        "assessment_type": "TMA",
        "assessment_order": 12,
        "week_of_class": 29,
        "competency_tag": "25339",
        "competency_source": "proxy",
        "total_submissions": 23,
        "fail_count": 4,
        "fail_rate_pct": 17.4,
        "avg_score": 57.52
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25366",
        "assessment_name": "25366",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 21,
        "competency_tag": "25366",
        "competency_source": "proxy",
        "total_submissions": 70,
        "fail_count": 11,
        "fail_rate_pct": 15.7,
        "avg_score": 68.13
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25352",
        "assessment_name": "25352",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 24,
        "competency_tag": "25352",
        "competency_source": "proxy",
        "total_submissions": 157,
        "fail_count": 24,
        "fail_rate_pct": 15.3,
        "avg_score": 66.87
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25367",
        "assessment_name": "25367",
        "assessment_type": "TMA",
        "assessment_order": 6,
        "week_of_class": 28,
        "competency_tag": "25367",
        "competency_source": "proxy",
        "total_submissions": 63,
        "fail_count": 9,
        "fail_rate_pct": 14.3,
        "avg_score": 64.71
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24285",
        "assessment_name": "24285",
        "assessment_type": "TMA",
        "assessment_order": 7,
        "week_of_class": 29,
        "competency_tag": "24285",
        "competency_source": "proxy",
        "total_submissions": 7,
        "fail_count": 1,
        "fail_rate_pct": 14.3,
        "avg_score": 53.43
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24299",
        "assessment_name": "24299",
        "assessment_type": "Exam",
        "assessment_order": 9,
        "week_of_class": null,
        "competency_tag": "24299",
        "competency_source": "proxy",
        "total_submissions": 1168,
        "fail_count": 149,
        "fail_rate_pct": 12.8,
        "avg_score": 68.23
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25338",
        "assessment_name": "25338",
        "assessment_type": "TMA",
        "assessment_order": 10,
        "week_of_class": 22,
        "competency_tag": "25338",
        "competency_source": "proxy",
        "total_submissions": 24,
        "fail_count": 3,
        "fail_rate_pct": 12.5,
        "avg_score": 65.08
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25353",
        "assessment_name": "25353",
        "assessment_type": "TMA",
        "assessment_order": 6,
        "week_of_class": 30,
        "competency_tag": "25353",
        "competency_source": "proxy",
        "total_submissions": 140,
        "fail_count": 17,
        "fail_rate_pct": 12.1,
        "avg_score": 65.97
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25345",
        "assessment_name": "25345",
        "assessment_type": "CMA",
        "assessment_order": 9,
        "week_of_class": 22,
        "competency_tag": "25345",
        "competency_source": "proxy",
        "total_submissions": 26,
        "fail_count": 3,
        "fail_rate_pct": 11.5,
        "avg_score": 72.31
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25359",
        "assessment_name": "25359",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 23,
        "competency_tag": "25359",
        "competency_source": "proxy",
        "total_submissions": 87,
        "fail_count": 10,
        "fail_rate_pct": 11.5,
        "avg_score": 65.78
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25358",
        "assessment_name": "25358",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 17,
        "competency_tag": "25358",
        "competency_source": "proxy",
        "total_submissions": 99,
        "fail_count": 11,
        "fail_rate_pct": 11.1,
        "avg_score": 69.52
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24292",
        "assessment_name": "24292",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 16,
        "competency_tag": "24292",
        "competency_source": "proxy",
        "total_submissions": 1128,
        "fail_count": 118,
        "fail_rate_pct": 10.5,
        "avg_score": 73.76
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24298",
        "assessment_name": "24298",
        "assessment_type": "CMA",
        "assessment_order": 8,
        "week_of_class": 31,
        "competency_tag": "24298",
        "competency_source": "proxy",
        "total_submissions": 1094,
        "fail_count": 110,
        "fail_rate_pct": 10.1,
        "avg_score": 73.09
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24293",
        "assessment_name": "24293",
        "assessment_type": "TMA",
        "assessment_order": 6,
        "week_of_class": 23,
        "competency_tag": "24293",
        "competency_source": "proxy",
        "total_submissions": 965,
        "fail_count": 89,
        "fail_rate_pct": 9.2,
        "avg_score": 72.93
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24295",
        "assessment_name": "24295",
        "assessment_type": "CMA",
        "assessment_order": 1,
        "week_of_class": 3,
        "competency_tag": "24295",
        "competency_source": "proxy",
        "total_submissions": 1917,
        "fail_count": 164,
        "fail_rate_pct": 8.6,
        "avg_score": 74.75
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25337",
        "assessment_name": "25337",
        "assessment_type": "TMA",
        "assessment_order": 8,
        "week_of_class": 17,
        "competency_tag": "25337",
        "competency_source": "proxy",
        "total_submissions": 25,
        "fail_count": 2,
        "fail_rate_pct": 8,
        "avg_score": 67.52
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25344",
        "assessment_name": "25344",
        "assessment_type": "CMA",
        "assessment_order": 7,
        "week_of_class": 17,
        "competency_tag": "25344",
        "competency_source": "proxy",
        "total_submissions": 25,
        "fail_count": 2,
        "fail_rate_pct": 8,
        "avg_score": 72.4
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25365",
        "assessment_name": "25365",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 16,
        "competency_tag": "25365",
        "competency_source": "proxy",
        "total_submissions": 76,
        "fail_count": 6,
        "fail_rate_pct": 7.9,
        "avg_score": 77.25
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24294",
        "assessment_name": "24294",
        "assessment_type": "TMA",
        "assessment_order": 7,
        "week_of_class": 30,
        "competency_tag": "24294",
        "competency_source": "proxy",
        "total_submissions": 916,
        "fail_count": 72,
        "fail_rate_pct": 7.9,
        "avg_score": 74.88
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25340",
        "assessment_name": "25340",
        "assessment_type": "Exam",
        "assessment_order": 14,
        "week_of_class": 35,
        "competency_tag": "25340",
        "competency_source": "proxy",
        "total_submissions": 26,
        "fail_count": 2,
        "fail_rate_pct": 7.7,
        "avg_score": 55.08
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25335",
        "assessment_name": "25335",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 8,
        "competency_tag": "25335",
        "competency_source": "proxy",
        "total_submissions": 26,
        "fail_count": 2,
        "fail_rate_pct": 7.7,
        "avg_score": 71.54
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24282",
        "assessment_name": "24282",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 5,
        "competency_tag": "24282",
        "competency_source": "proxy",
        "total_submissions": 70,
        "fail_count": 5,
        "fail_rate_pct": 7.1,
        "avg_score": 67.74
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25334",
        "assessment_name": "25334",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 4,
        "competency_tag": "25334",
        "competency_source": "proxy",
        "total_submissions": 29,
        "fail_count": 2,
        "fail_rate_pct": 6.9,
        "avg_score": 71.62
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25364",
        "assessment_name": "25364",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 9,
        "competency_tag": "25364",
        "competency_source": "proxy",
        "total_submissions": 89,
        "fail_count": 6,
        "fail_rate_pct": 6.7,
        "avg_score": 71.99
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24297",
        "assessment_name": "24297",
        "assessment_type": "CMA",
        "assessment_order": 5,
        "week_of_class": 21,
        "competency_tag": "24297",
        "competency_source": "proxy",
        "total_submissions": 1301,
        "fail_count": 83,
        "fail_rate_pct": 6.4,
        "avg_score": 75.15
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25351",
        "assessment_name": "25351",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 18,
        "competency_tag": "25351",
        "competency_source": "proxy",
        "total_submissions": 164,
        "fail_count": 10,
        "fail_rate_pct": 6.1,
        "avg_score": 74.44
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30721",
        "assessment_name": "30721",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 19,
        "competency_tag": "30721",
        "competency_source": "proxy",
        "total_submissions": 164,
        "fail_count": 10,
        "fail_rate_pct": 6.1,
        "avg_score": 74.21
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34903",
        "assessment_name": "34903",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 29,
        "competency_tag": "34903",
        "competency_source": "proxy",
        "total_submissions": 51,
        "fail_count": 3,
        "fail_rate_pct": 5.9,
        "avg_score": 74.69
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24296",
        "assessment_name": "24296",
        "assessment_type": "CMA",
        "assessment_order": 3,
        "week_of_class": 10,
        "competency_tag": "24296",
        "competency_source": "proxy",
        "total_submissions": 1534,
        "fail_count": 91,
        "fail_rate_pct": 5.9,
        "avg_score": 78.94
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34890",
        "assessment_name": "34890",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 25,
        "competency_tag": "34890",
        "competency_source": "proxy",
        "total_submissions": 87,
        "fail_count": 5,
        "fail_rate_pct": 5.7,
        "avg_score": 81.03
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34889",
        "assessment_name": "34889",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 19,
        "competency_tag": "34889",
        "competency_source": "proxy",
        "total_submissions": 93,
        "fail_count": 5,
        "fail_rate_pct": 5.4,
        "avg_score": 76.59
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34888",
        "assessment_name": "34888",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 13,
        "competency_tag": "34888",
        "competency_source": "proxy",
        "total_submissions": 94,
        "fail_count": 5,
        "fail_rate_pct": 5.3,
        "avg_score": 76.66
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25361",
        "assessment_name": "25361",
        "assessment_type": "Exam",
        "assessment_order": 7,
        "week_of_class": 35,
        "competency_tag": "25361",
        "competency_source": "proxy",
        "total_submissions": 98,
        "fail_count": 5,
        "fail_rate_pct": 5.1,
        "avg_score": 73.62
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_24291",
        "assessment_name": "24291",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 5,
        "competency_tag": "24291",
        "competency_source": "proxy",
        "total_submissions": 1428,
        "fail_count": 73,
        "fail_rate_pct": 5.1,
        "avg_score": 78.79
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34901",
        "assessment_name": "34901",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 14,
        "competency_tag": "34901",
        "competency_source": "proxy",
        "total_submissions": 66,
        "fail_count": 3,
        "fail_rate_pct": 4.5,
        "avg_score": 73.94
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25362",
        "assessment_name": "25362",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 3,
        "competency_tag": "25362",
        "competency_source": "proxy",
        "total_submissions": 111,
        "fail_count": 5,
        "fail_rate_pct": 4.5,
        "avg_score": 73.31
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25368",
        "assessment_name": "25368",
        "assessment_type": "Exam",
        "assessment_order": 7,
        "week_of_class": null,
        "competency_tag": "25368",
        "competency_source": "proxy",
        "total_submissions": 68,
        "fail_count": 3,
        "fail_rate_pct": 4.4,
        "avg_score": 69.32
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25346",
        "assessment_name": "25346",
        "assessment_type": "CMA",
        "assessment_order": 11,
        "week_of_class": 25,
        "competency_tag": "25346",
        "competency_source": "proxy",
        "total_submissions": 23,
        "fail_count": 1,
        "fail_rate_pct": 4.3,
        "avg_score": 68.78
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25347",
        "assessment_name": "25347",
        "assessment_type": "CMA",
        "assessment_order": 13,
        "week_of_class": 30,
        "competency_tag": "25347",
        "competency_source": "proxy",
        "total_submissions": 24,
        "fail_count": 1,
        "fail_rate_pct": 4.2,
        "avg_score": 63.13
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34900",
        "assessment_name": "34900",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 8,
        "competency_tag": "34900",
        "competency_source": "proxy",
        "total_submissions": 75,
        "fail_count": 3,
        "fail_rate_pct": 4,
        "avg_score": 77.52
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25356",
        "assessment_name": "25356",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 8,
        "competency_tag": "25356",
        "competency_source": "proxy",
        "total_submissions": 108,
        "fail_count": 4,
        "fail_rate_pct": 3.7,
        "avg_score": 77.71
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25336",
        "assessment_name": "25336",
        "assessment_type": "TMA",
        "assessment_order": 6,
        "week_of_class": 12,
        "competency_tag": "25336",
        "competency_source": "proxy",
        "total_submissions": 27,
        "fail_count": 1,
        "fail_rate_pct": 3.7,
        "avg_score": 79.7
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30716",
        "assessment_name": "30716",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 17,
        "competency_tag": "30716",
        "competency_source": "proxy",
        "total_submissions": 111,
        "fail_count": 4,
        "fail_rate_pct": 3.6,
        "avg_score": 79.49
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34902",
        "assessment_name": "34902",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 20,
        "competency_tag": "34902",
        "competency_source": "proxy",
        "total_submissions": 58,
        "fail_count": 2,
        "fail_rate_pct": 3.4,
        "avg_score": 74.67
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25342",
        "assessment_name": "25342",
        "assessment_type": "CMA",
        "assessment_order": 3,
        "week_of_class": 8,
        "competency_tag": "25342",
        "competency_source": "proxy",
        "total_submissions": 30,
        "fail_count": 1,
        "fail_rate_pct": 3.3,
        "avg_score": 85.1
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25363",
        "assessment_name": "25363",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 6,
        "competency_tag": "25363",
        "competency_source": "proxy",
        "total_submissions": 99,
        "fail_count": 3,
        "fail_rate_pct": 3,
        "avg_score": 79.06
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34876",
        "assessment_name": "34876",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 19,
        "competency_tag": "34876",
        "competency_source": "proxy",
        "total_submissions": 104,
        "fail_count": 3,
        "fail_rate_pct": 2.9,
        "avg_score": 76.06
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25349",
        "assessment_name": "25349",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 8,
        "competency_tag": "25349",
        "competency_source": "proxy",
        "total_submissions": 172,
        "fail_count": 5,
        "fail_rate_pct": 2.9,
        "avg_score": 79.52
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30717",
        "assessment_name": "30717",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 22,
        "competency_tag": "30717",
        "competency_source": "proxy",
        "total_submissions": 108,
        "fail_count": 3,
        "fail_rate_pct": 2.8,
        "avg_score": 76.83
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30722",
        "assessment_name": "30722",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 24,
        "competency_tag": "30722",
        "competency_source": "proxy",
        "total_submissions": 143,
        "fail_count": 4,
        "fail_rate_pct": 2.8,
        "avg_score": 78.24
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25350",
        "assessment_name": "25350",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 13,
        "competency_tag": "25350",
        "competency_source": "proxy",
        "total_submissions": 170,
        "fail_count": 4,
        "fail_rate_pct": 2.4,
        "avg_score": 85.36
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30712",
        "assessment_name": "30712",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 23,
        "competency_tag": "30712",
        "competency_source": "proxy",
        "total_submissions": 136,
        "fail_count": 3,
        "fail_rate_pct": 2.2,
        "avg_score": 78.26
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34887",
        "assessment_name": "34887",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 8,
        "competency_tag": "34887",
        "competency_source": "proxy",
        "total_submissions": 97,
        "fail_count": 2,
        "fail_rate_pct": 2.1,
        "avg_score": 79.53
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34877",
        "assessment_name": "34877",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 25,
        "competency_tag": "34877",
        "competency_source": "proxy",
        "total_submissions": 98,
        "fail_count": 2,
        "fail_rate_pct": 2,
        "avg_score": 79.2
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30719",
        "assessment_name": "30719",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 5,
        "competency_tag": "30719",
        "competency_source": "proxy",
        "total_submissions": 209,
        "fail_count": 4,
        "fail_rate_pct": 1.9,
        "avg_score": 83.95
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34875",
        "assessment_name": "34875",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 14,
        "competency_tag": "34875",
        "competency_source": "proxy",
        "total_submissions": 106,
        "fail_count": 2,
        "fail_rate_pct": 1.9,
        "avg_score": 76.11
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25354",
        "assessment_name": "25354",
        "assessment_type": "Exam",
        "assessment_order": 7,
        "week_of_class": 38,
        "competency_tag": "25354",
        "competency_source": "proxy",
        "total_submissions": 169,
        "fail_count": 3,
        "fail_rate_pct": 1.8,
        "avg_score": 70
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30711",
        "assessment_name": "30711",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 18,
        "competency_tag": "30711",
        "competency_source": "proxy",
        "total_submissions": 140,
        "fail_count": 2,
        "fail_rate_pct": 1.4,
        "avg_score": 77.34
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34899",
        "assessment_name": "34899",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 4,
        "competency_tag": "34899",
        "competency_source": "proxy",
        "total_submissions": 87,
        "fail_count": 1,
        "fail_rate_pct": 1.1,
        "avg_score": 79
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34874",
        "assessment_name": "34874",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 7,
        "competency_tag": "34874",
        "competency_source": "proxy",
        "total_submissions": 110,
        "fail_count": 1,
        "fail_rate_pct": 0.9,
        "avg_score": 77.31
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25355",
        "assessment_name": "25355",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 4,
        "competency_tag": "25355",
        "competency_source": "proxy",
        "total_submissions": 111,
        "fail_count": 1,
        "fail_rate_pct": 0.9,
        "avg_score": 77.77
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25357",
        "assessment_name": "25357",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 11,
        "competency_tag": "25357",
        "competency_source": "proxy",
        "total_submissions": 106,
        "fail_count": 1,
        "fail_rate_pct": 0.9,
        "avg_score": 83.3
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30715",
        "assessment_name": "30715",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 10,
        "competency_tag": "30715",
        "competency_source": "proxy",
        "total_submissions": 114,
        "fail_count": 1,
        "fail_rate_pct": 0.9,
        "avg_score": 82.34
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25348",
        "assessment_name": "25348",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 4,
        "competency_tag": "25348",
        "competency_source": "proxy",
        "total_submissions": 176,
        "fail_count": 1,
        "fail_rate_pct": 0.6,
        "avg_score": 79.55
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30720",
        "assessment_name": "30720",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 10,
        "competency_tag": "30720",
        "competency_source": "proxy",
        "total_submissions": 176,
        "fail_count": 1,
        "fail_rate_pct": 0.6,
        "avg_score": 85.77
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34910",
        "assessment_name": "34910",
        "assessment_type": "CMA",
        "assessment_order": 12,
        "week_of_class": 35,
        "competency_tag": "34910",
        "competency_source": "proxy",
        "total_submissions": 53,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 79.38
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25341",
        "assessment_name": "25341",
        "assessment_type": "CMA",
        "assessment_order": 1,
        "week_of_class": 4,
        "competency_tag": "25341",
        "competency_source": "proxy",
        "total_submissions": 29,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 73.62
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_25343",
        "assessment_name": "25343",
        "assessment_type": "CMA",
        "assessment_order": 5,
        "week_of_class": 12,
        "competency_tag": "25343",
        "competency_source": "proxy",
        "total_submissions": 29,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 72.79
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30709",
        "assessment_name": "30709",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 5,
        "competency_tag": "30709",
        "competency_source": "proxy",
        "total_submissions": 148,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 85.42
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30710",
        "assessment_name": "30710",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 10,
        "competency_tag": "30710",
        "competency_source": "proxy",
        "total_submissions": 147,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.51
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_30714",
        "assessment_name": "30714",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 5,
        "competency_tag": "30714",
        "competency_source": "proxy",
        "total_submissions": 115,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 89.89
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34860",
        "assessment_name": "34860",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 3,
        "competency_tag": "34860",
        "competency_source": "proxy",
        "total_submissions": 15,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 84.53
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34861",
        "assessment_name": "34861",
        "assessment_type": "TMA",
        "assessment_order": 2,
        "week_of_class": 7,
        "competency_tag": "34861",
        "competency_source": "proxy",
        "total_submissions": 16,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 79
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34862",
        "assessment_name": "34862",
        "assessment_type": "TMA",
        "assessment_order": 3,
        "week_of_class": 13,
        "competency_tag": "34862",
        "competency_source": "proxy",
        "total_submissions": 15,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 76.27
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34863",
        "assessment_name": "34863",
        "assessment_type": "TMA",
        "assessment_order": 4,
        "week_of_class": 19,
        "competency_tag": "34863",
        "competency_source": "proxy",
        "total_submissions": 13,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 74.77
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34864",
        "assessment_name": "34864",
        "assessment_type": "TMA",
        "assessment_order": 5,
        "week_of_class": 24,
        "competency_tag": "34864",
        "competency_source": "proxy",
        "total_submissions": 12,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 77.17
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34865",
        "assessment_name": "34865",
        "assessment_type": "CMA",
        "assessment_order": 6,
        "week_of_class": 32,
        "competency_tag": "34865",
        "competency_source": "proxy",
        "total_submissions": 15,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 84.47
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34866",
        "assessment_name": "34866",
        "assessment_type": "CMA",
        "assessment_order": 7,
        "week_of_class": 32,
        "competency_tag": "34866",
        "competency_source": "proxy",
        "total_submissions": 14,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 89.14
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34867",
        "assessment_name": "34867",
        "assessment_type": "CMA",
        "assessment_order": 8,
        "week_of_class": 32,
        "competency_tag": "34867",
        "competency_source": "proxy",
        "total_submissions": 12,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.5
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34868",
        "assessment_name": "34868",
        "assessment_type": "CMA",
        "assessment_order": 9,
        "week_of_class": 32,
        "competency_tag": "34868",
        "competency_source": "proxy",
        "total_submissions": 12,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 80.17
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34869",
        "assessment_name": "34869",
        "assessment_type": "CMA",
        "assessment_order": 10,
        "week_of_class": 32,
        "competency_tag": "34869",
        "competency_source": "proxy",
        "total_submissions": 11,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 81.09
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34870",
        "assessment_name": "34870",
        "assessment_type": "CMA",
        "assessment_order": 11,
        "week_of_class": 32,
        "competency_tag": "34870",
        "competency_source": "proxy",
        "total_submissions": 12,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 79.17
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34871",
        "assessment_name": "34871",
        "assessment_type": "CMA",
        "assessment_order": 12,
        "week_of_class": 32,
        "competency_tag": "34871",
        "competency_source": "proxy",
        "total_submissions": 11,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 77.09
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34873",
        "assessment_name": "34873",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 3,
        "competency_tag": "34873",
        "competency_source": "proxy",
        "total_submissions": 110,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.95
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34878",
        "assessment_name": "34878",
        "assessment_type": "CMA",
        "assessment_order": 6,
        "week_of_class": 34,
        "competency_tag": "34878",
        "competency_source": "proxy",
        "total_submissions": 106,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 87.06
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34879",
        "assessment_name": "34879",
        "assessment_type": "CMA",
        "assessment_order": 7,
        "week_of_class": 34,
        "competency_tag": "34879",
        "competency_source": "proxy",
        "total_submissions": 104,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 92.63
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34880",
        "assessment_name": "34880",
        "assessment_type": "CMA",
        "assessment_order": 8,
        "week_of_class": 34,
        "competency_tag": "34880",
        "competency_source": "proxy",
        "total_submissions": 103,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.15
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34881",
        "assessment_name": "34881",
        "assessment_type": "CMA",
        "assessment_order": 9,
        "week_of_class": 34,
        "competency_tag": "34881",
        "competency_source": "proxy",
        "total_submissions": 101,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.84
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34882",
        "assessment_name": "34882",
        "assessment_type": "CMA",
        "assessment_order": 10,
        "week_of_class": 34,
        "competency_tag": "34882",
        "competency_source": "proxy",
        "total_submissions": 99,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.83
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34883",
        "assessment_name": "34883",
        "assessment_type": "CMA",
        "assessment_order": 11,
        "week_of_class": 34,
        "competency_tag": "34883",
        "competency_source": "proxy",
        "total_submissions": 101,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 81.37
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34884",
        "assessment_name": "34884",
        "assessment_type": "CMA",
        "assessment_order": 12,
        "week_of_class": 34,
        "competency_tag": "34884",
        "competency_source": "proxy",
        "total_submissions": 97,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 79.93
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34886",
        "assessment_name": "34886",
        "assessment_type": "TMA",
        "assessment_order": 1,
        "week_of_class": 4,
        "competency_tag": "34886",
        "competency_source": "proxy",
        "total_submissions": 97,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 83.69
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34891",
        "assessment_name": "34891",
        "assessment_type": "CMA",
        "assessment_order": 6,
        "week_of_class": 33,
        "competency_tag": "34891",
        "competency_source": "proxy",
        "total_submissions": 95,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 86.43
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34892",
        "assessment_name": "34892",
        "assessment_type": "CMA",
        "assessment_order": 7,
        "week_of_class": 33,
        "competency_tag": "34892",
        "competency_source": "proxy",
        "total_submissions": 93,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 90.26
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34893",
        "assessment_name": "34893",
        "assessment_type": "CMA",
        "assessment_order": 8,
        "week_of_class": 33,
        "competency_tag": "34893",
        "competency_source": "proxy",
        "total_submissions": 91,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 80.2
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34894",
        "assessment_name": "34894",
        "assessment_type": "CMA",
        "assessment_order": 9,
        "week_of_class": 33,
        "competency_tag": "34894",
        "competency_source": "proxy",
        "total_submissions": 88,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 81.77
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34895",
        "assessment_name": "34895",
        "assessment_type": "CMA",
        "assessment_order": 10,
        "week_of_class": 33,
        "competency_tag": "34895",
        "competency_source": "proxy",
        "total_submissions": 88,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 81.91
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34896",
        "assessment_name": "34896",
        "assessment_type": "CMA",
        "assessment_order": 11,
        "week_of_class": 33,
        "competency_tag": "34896",
        "competency_source": "proxy",
        "total_submissions": 88,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 81.01
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34897",
        "assessment_name": "34897",
        "assessment_type": "CMA",
        "assessment_order": 12,
        "week_of_class": 33,
        "competency_tag": "34897",
        "competency_source": "proxy",
        "total_submissions": 87,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 79.25
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34904",
        "assessment_name": "34904",
        "assessment_type": "CMA",
        "assessment_order": 6,
        "week_of_class": 35,
        "competency_tag": "34904",
        "competency_source": "proxy",
        "total_submissions": 63,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 89.29
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34905",
        "assessment_name": "34905",
        "assessment_type": "CMA",
        "assessment_order": 7,
        "week_of_class": 35,
        "competency_tag": "34905",
        "competency_source": "proxy",
        "total_submissions": 60,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 92.42
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34906",
        "assessment_name": "34906",
        "assessment_type": "CMA",
        "assessment_order": 8,
        "week_of_class": 35,
        "competency_tag": "34906",
        "competency_source": "proxy",
        "total_submissions": 55,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 82.38
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34907",
        "assessment_name": "34907",
        "assessment_type": "CMA",
        "assessment_order": 9,
        "week_of_class": 35,
        "competency_tag": "34907",
        "competency_source": "proxy",
        "total_submissions": 56,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 79.43
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34908",
        "assessment_name": "34908",
        "assessment_type": "CMA",
        "assessment_order": 10,
        "week_of_class": 35,
        "competency_tag": "34908",
        "competency_source": "proxy",
        "total_submissions": 56,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 80.82
      },
      {
        "assessment_id": "SAMPLE_OULAD_ASM_34909",
        "assessment_name": "34909",
        "assessment_type": "CMA",
        "assessment_order": 11,
        "week_of_class": 35,
        "competency_tag": "34909",
        "competency_source": "proxy",
        "total_submissions": 55,
        "fail_count": 0,
        "fail_rate_pct": 0,
        "avg_score": 81.87
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G04__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "b80d98dc0c49a020c23179aecc7ec7bf67a6b4f420ff0b27a6dc25b03a4c84d6",
  "generator_input_sha256": "c02af980739f4a2053397c471b5914a1bdf8a2832a97e4e4c277cf722ec46221",
  "generator_input_compact": {
    "task_id": "A-G04",
    "execution_id": "exec_1781847724478_910d0c3f",
    "task_name": "Assessment difficulty analysis",
    "analysis_type": "distribution",
    "explanation_strategy": "distribution",
    "actionable_question": "Which assessment is causing the most students to fail?",
    "target_audience": [
      "instructor"
    ],
    "query_labels": [
      "assessment_difficulty"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "assessment_difficulty"
    ],
    "dataset_row_counts": {
      "assessment_difficulty": 112
    },
    "ai_summary_config_summary": {
      "summary_type": "ranking",
      "metric_column": "fail_rate_pct",
      "entity_column": "assessment_name",
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
  "raw_text": "Summary: The analysis of assessment difficulty reveals that the assessment '24288' has the highest fail rate at 50%, indicating significant challenges for students. In contrast, assessments such as '25345' and '25359' show much lower fail rates, suggesting a disparity in difficulty across assessments.\n\nInsights: High Fail Rate in Assessment 24288: The assessment '24288' has a fail rate of 50%, which is the highest among the cohort, indicating that half of the students are struggling significantly with this assessment. | Comparative Success in Other Assessments: Assessments such as '25345' and '25359' have fail rates of 11.5% and 12.1% respectively, indicating that these assessments are significantly easier for students compared to '24288'.\n\nEducational implications: The high fail rate in assessment '24288' suggests a need for targeted interventions to support students in this area.\n\nRecommendations: high - Conduct a curriculum review for assessment '24288'. - Given the high fail rate, it is essential to identify potential gaps in instruction or assessment design that may be contributing to student difficulties.",
  "structured_payload": {
    "task_id": "A-G04",
    "execution_id": "exec_1781847724478_910d0c3f",
    "explanation": {
      "summary": "The analysis of assessment difficulty reveals that the assessment '24288' has the highest fail rate at 50%, indicating significant challenges for students. In contrast, assessments such as '25345' and '25359' show much lower fail rates, suggesting a disparity in difficulty across assessments.",
      "insights": [
        {
          "title": "High Fail Rate in Assessment 24288",
          "description": "The assessment '24288' has a fail rate of 50%, which is the highest among the cohort, indicating that half of the students are struggling significantly with this assessment.",
          "severity": "high",
          "evidence": [
            {
              "metric": "fail_rate_pct",
              "value": 50,
              "comparison": "baseline",
              "delta": null,
              "context": "Highest fail rate in the dataset"
            }
          ]
        },
        {
          "title": "Comparative Success in Other Assessments",
          "description": "Assessments such as '25345' and '25359' have fail rates of 11.5% and 12.1% respectively, indicating that these assessments are significantly easier for students compared to '24288'.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "fail_rate_pct",
              "value": 11.5,
              "comparison": "down_from_previous",
              "delta": -38.5,
              "context": "Much lower fail rate compared to '24288'"
            },
            {
              "metric": "fail_rate_pct",
              "value": 12.1,
              "comparison": "down_from_previous",
              "delta": -37.9,
              "context": "Much lower fail rate compared to '24288'"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high fail rate in assessment '24288' suggests a need for targeted interventions to support students in this area."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Conduct a curriculum review for assessment '24288'.",
          "rationale": "Given the high fail rate, it is essential to identify potential gaps in instruction or assessment design that may be contributing to student difficulties."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset provides a comprehensive view of assessment performance with clear metrics on fail rates and average scores.",
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
      "latency_ms": 10334,
      "token_usage": {
        "prompt_tokens": 2685,
        "completion_tokens": 536,
        "total_tokens": 3221
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000724
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G04__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "b80d98dc0c49a020c23179aecc7ec7bf67a6b4f420ff0b27a6dc25b03a4c84d6",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2685,
      "completion_tokens": 536,
      "total_tokens": 3221
    },
    "latency_ms": 10339,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G04",
    "execution_id": "exec_1781847724478_910d0c3f",
    "explanation": {
      "summary": "The analysis of assessment difficulty reveals that the assessment '24288' has the highest fail rate at 50%, indicating significant challenges for students. In contrast, assessments such as '25345' and '25359' show much lower fail rates, suggesting a disparity in difficulty across assessments.",
      "insights": [
        {
          "title": "High Fail Rate in Assessment 24288",
          "description": "The assessment '24288' has a fail rate of 50%, which is the highest among the cohort, indicating that half of the students are struggling significantly with this assessment.",
          "severity": "high",
          "evidence": [
            {
              "metric": "fail_rate_pct",
              "value": 50,
              "comparison": "baseline",
              "delta": null,
              "context": "Highest fail rate in the dataset"
            }
          ]
        },
        {
          "title": "Comparative Success in Other Assessments",
          "description": "Assessments such as '25345' and '25359' have fail rates of 11.5% and 12.1% respectively, indicating that these assessments are significantly easier for students compared to '24288'.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "fail_rate_pct",
              "value": 11.5,
              "comparison": "down_from_previous",
              "delta": -38.5,
              "context": "Much lower fail rate compared to '24288'"
            },
            {
              "metric": "fail_rate_pct",
              "value": 12.1,
              "comparison": "down_from_previous",
              "delta": -37.9,
              "context": "Much lower fail rate compared to '24288'"
            }
          ]
        }
      ],
      "educational_implications": [
        "The high fail rate in assessment '24288' suggests a need for targeted interventions to support students in this area."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Conduct a curriculum review for assessment '24288'.",
          "rationale": "Given the high fail rate, it is essential to identify potential gaps in instruction or assessment design that may be contributing to student difficulties."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset provides a comprehensive view of assessment performance with clear metrics on fail rates and average scores.",
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
      "latency_ms": 10334,
      "token_usage": {
        "prompt_tokens": 2685,
        "completion_tokens": 536,
        "total_tokens": 3221
      },
      "strategy": "distribution",
      "granularity": "per_assessment",
      "cost_usd": 0.000724
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
    "expected": 112,
    "observed": 112
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae",
    "expected_values": [
      "5e7ad0aed9bd168ad71c11d6586e0c16c11ff0bb584b6d7c9c58d50d72771fae"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "efaaa326237f67aa56d5231bbd426e5831437f739fc7c8852c6e86fc6e2e1717",
    "expected": "efaaa326237f67aa56d5231bbd426e5831437f739fc7c8852c6e86fc6e2e1717"
  },
  {
    "check_id": "numeric_fields_assessment_difficulty",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "assessment_difficulty",
    "numeric_columns": [
      "assessment_order",
      "avg_score",
      "fail_count",
      "fail_rate_pct",
      "total_submissions",
      "week_of_class"
    ],
    "numeric_summaries": {
      "assessment_order": {
        "count": 112,
        "min": 1,
        "max": 14
      },
      "avg_score": {
        "count": 112,
        "min": 45,
        "max": 92.63
      },
      "fail_count": {
        "count": 112,
        "min": 0,
        "max": 164
      },
      "fail_rate_pct": {
        "count": 112,
        "min": 0,
        "max": 50
      },
      "total_submissions": {
        "count": 112,
        "min": 7,
        "max": 1917
      },
      "week_of_class": {
        "count": 110,
        "min": 3,
        "max": 38
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_assessment_difficulty",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "assessment_difficulty",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
