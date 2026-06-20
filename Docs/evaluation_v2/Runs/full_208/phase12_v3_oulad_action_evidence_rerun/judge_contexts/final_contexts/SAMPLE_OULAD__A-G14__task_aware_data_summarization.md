# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G14__task_aware_data_summarization

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- Prompt SHA-256: `8c7655b0389d4228328d00fa9573d5ac9d38ef0fd7846cf49b4628cff6a8d670`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G14__task_aware_data_summarization",
  "evaluation_run_id": "llm_judge_v3_uci_action_evidence_rerun",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G14",
  "explanation_mode": "task_aware_data_summarization",
  "prompt_version": "judge_prompt_v3_action_evidence_rerun",
  "rubric_version": "judge_rubric_1_to_10_v3_action_evidence_calibrated"
}
```

## Task Context

```json
{
  "task_name": "Early withdrawal signal analysis",
  "scope": "Many students",
  "actionable_question": "How early can admin detect a student about to drop out?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "trend_comparison",
  "ai_prompt_hint": "Use early_warning_week [FE] to show when engagement collapsed for withdrawn students. Compare to passing students.",
  "query_labels": [
    "withdrawal_signal_trend"
  ],
  "explanation_strategy": "trend"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "engagement [OULAD only]"
  ],
  "key_db_fields": [
    "week_number",
    "engagement_count; final_outcome",
    "avg_clicks by outcome group"
  ],
  "output_schema": {},
  "query_labels": [
    "withdrawal_signal_trend"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G14-CORE-01",
      "description": "Identify when engagement collapsed for withdrawn students."
    },
    {
      "requirement_id": "A-G14-CORE-02",
      "description": "Compare the timing or trajectory with passing students."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G14-CONSTRAINT-01",
      "description": "Use early_warning_week as the primary collapse-timing field when returned."
    },
    {
      "constraint_id": "A-G14-CONSTRAINT-02",
      "description": "Frame the comparison as an observed pattern, not proof of withdrawal causation."
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

## Deterministic Retrieval Evidence

```json
{
  "full_query_artifacts": [
    {
      "dataset_label": "withdrawal_signal_trend",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G14.json",
      "artifact_sha256": "64c67afde434dcdc16e3b44225b1be83ff387bfc4ca03234bd334a5e7b8e5e9a",
      "row_count": 164,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 164,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 164,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G14__task_aware_data_summarization.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "64c67afde434dcdc16e3b44225b1be83ff387bfc4ca03234bd334a5e7b8e5e9a",
  "evidence_rows_sha256": "4364e835b8582e11d11d490373138a0b17d222dfbca1533b41a9bf39123cfd2c",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 164,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__A-G14__task_aware_data_summarization__withdrawal_signal_trend__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "withdrawal_signal_trend",
        "row_start_inclusive": 0,
        "row_end_inclusive": 163,
        "row_count": 164
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
    "generated_at": "2026-06-19T07:41:45.549Z",
    "record_id": "SAMPLE_OULAD__A-G14__task_aware_data_summarization",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__A-G14__task_aware_data_summarization__withdrawal_signal_trend__chunk_1",
        "dataset_label": "withdrawal_signal_trend",
        "row_start_inclusive": 0,
        "row_end_inclusive": 163,
        "row_count": 164,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G14.json",
        "source_artifact_sha256": "64c67afde434dcdc16e3b44225b1be83ff387bfc4ca03234bd334a5e7b8e5e9a"
      }
    ]
  },
  "retrieved_datasets_sha256": "4364e835b8582e11d11d490373138a0b17d222dfbca1533b41a9bf39123cfd2c",
  "retrieved_datasets": {
    "withdrawal_signal_trend": [
      {
        "week_number": -2,
        "final_outcome": "Distinction",
        "avg_clicks": "48.4",
        "student_count": 214
      },
      {
        "week_number": -1,
        "final_outcome": "Distinction",
        "avg_clicks": "51.02",
        "student_count": 227
      },
      {
        "week_number": 0,
        "final_outcome": "Distinction",
        "avg_clicks": "69.38",
        "student_count": 262
      },
      {
        "week_number": 1,
        "final_outcome": "Distinction",
        "avg_clicks": "138.61",
        "student_count": 282
      },
      {
        "week_number": 2,
        "final_outcome": "Distinction",
        "avg_clicks": "125.77",
        "student_count": 290
      },
      {
        "week_number": 3,
        "final_outcome": "Distinction",
        "avg_clicks": "120.21",
        "student_count": 290
      },
      {
        "week_number": 4,
        "final_outcome": "Distinction",
        "avg_clicks": "92.58",
        "student_count": 287
      },
      {
        "week_number": 5,
        "final_outcome": "Distinction",
        "avg_clicks": "86.04",
        "student_count": 298
      },
      {
        "week_number": 6,
        "final_outcome": "Distinction",
        "avg_clicks": "73.13",
        "student_count": 272
      },
      {
        "week_number": 7,
        "final_outcome": "Distinction",
        "avg_clicks": "78.52",
        "student_count": 260
      },
      {
        "week_number": 8,
        "final_outcome": "Distinction",
        "avg_clicks": "75.69",
        "student_count": 266
      },
      {
        "week_number": 9,
        "final_outcome": "Distinction",
        "avg_clicks": "81",
        "student_count": 274
      },
      {
        "week_number": 10,
        "final_outcome": "Distinction",
        "avg_clicks": "112.63",
        "student_count": 292
      },
      {
        "week_number": 11,
        "final_outcome": "Distinction",
        "avg_clicks": "41.17",
        "student_count": 239
      },
      {
        "week_number": 12,
        "final_outcome": "Distinction",
        "avg_clicks": "38.45",
        "student_count": 185
      },
      {
        "week_number": 13,
        "final_outcome": "Distinction",
        "avg_clicks": "40.36",
        "student_count": 219
      },
      {
        "week_number": 14,
        "final_outcome": "Distinction",
        "avg_clicks": "58.68",
        "student_count": 266
      },
      {
        "week_number": 15,
        "final_outcome": "Distinction",
        "avg_clicks": "57.35",
        "student_count": 266
      },
      {
        "week_number": 16,
        "final_outcome": "Distinction",
        "avg_clicks": "77.58",
        "student_count": 288
      },
      {
        "week_number": 17,
        "final_outcome": "Distinction",
        "avg_clicks": "70.65",
        "student_count": 264
      },
      {
        "week_number": 18,
        "final_outcome": "Distinction",
        "avg_clicks": "63.26",
        "student_count": 266
      },
      {
        "week_number": 19,
        "final_outcome": "Distinction",
        "avg_clicks": "50.31",
        "student_count": 250
      },
      {
        "week_number": 20,
        "final_outcome": "Distinction",
        "avg_clicks": "72.17",
        "student_count": 266
      },
      {
        "week_number": 21,
        "final_outcome": "Distinction",
        "avg_clicks": "124.55",
        "student_count": 292
      },
      {
        "week_number": 22,
        "final_outcome": "Distinction",
        "avg_clicks": "56.53",
        "student_count": 280
      },
      {
        "week_number": 23,
        "final_outcome": "Distinction",
        "avg_clicks": "51.33",
        "student_count": 284
      },
      {
        "week_number": 24,
        "final_outcome": "Distinction",
        "avg_clicks": "38.11",
        "student_count": 267
      },
      {
        "week_number": 25,
        "final_outcome": "Distinction",
        "avg_clicks": "38.96",
        "student_count": 253
      },
      {
        "week_number": 26,
        "final_outcome": "Distinction",
        "avg_clicks": "46.6",
        "student_count": 239
      },
      {
        "week_number": 27,
        "final_outcome": "Distinction",
        "avg_clicks": "44.2",
        "student_count": 220
      },
      {
        "week_number": 28,
        "final_outcome": "Distinction",
        "avg_clicks": "49.65",
        "student_count": 237
      },
      {
        "week_number": 29,
        "final_outcome": "Distinction",
        "avg_clicks": "58.83",
        "student_count": 267
      },
      {
        "week_number": 30,
        "final_outcome": "Distinction",
        "avg_clicks": "77.34",
        "student_count": 291
      },
      {
        "week_number": 31,
        "final_outcome": "Distinction",
        "avg_clicks": "113.04",
        "student_count": 286
      },
      {
        "week_number": 32,
        "final_outcome": "Distinction",
        "avg_clicks": "74.52",
        "student_count": 256
      },
      {
        "week_number": 33,
        "final_outcome": "Distinction",
        "avg_clicks": "100.8",
        "student_count": 245
      },
      {
        "week_number": 34,
        "final_outcome": "Distinction",
        "avg_clicks": "137.18",
        "student_count": 261
      },
      {
        "week_number": 35,
        "final_outcome": "Distinction",
        "avg_clicks": "142.03",
        "student_count": 292
      },
      {
        "week_number": 36,
        "final_outcome": "Distinction",
        "avg_clicks": "21.39",
        "student_count": 188
      },
      {
        "week_number": 37,
        "final_outcome": "Distinction",
        "avg_clicks": "11.59",
        "student_count": 162
      },
      {
        "week_number": 38,
        "final_outcome": "Distinction",
        "avg_clicks": "11.8",
        "student_count": 142
      },
      {
        "week_number": 39,
        "final_outcome": "Distinction",
        "avg_clicks": "7.12",
        "student_count": 104
      },
      {
        "week_number": -2,
        "final_outcome": "Fail",
        "avg_clicks": "26.65",
        "student_count": 180
      },
      {
        "week_number": -1,
        "final_outcome": "Fail",
        "avg_clicks": "23.17",
        "student_count": 198
      },
      {
        "week_number": 0,
        "final_outcome": "Fail",
        "avg_clicks": "27.08",
        "student_count": 226
      },
      {
        "week_number": 1,
        "final_outcome": "Fail",
        "avg_clicks": "46.53",
        "student_count": 298
      },
      {
        "week_number": 2,
        "final_outcome": "Fail",
        "avg_clicks": "70.59",
        "student_count": 298
      },
      {
        "week_number": 3,
        "final_outcome": "Fail",
        "avg_clicks": "112.02",
        "student_count": 356
      },
      {
        "week_number": 4,
        "final_outcome": "Fail",
        "avg_clicks": "36.97",
        "student_count": 279
      },
      {
        "week_number": 5,
        "final_outcome": "Fail",
        "avg_clicks": "43.74",
        "student_count": 350
      },
      {
        "week_number": 6,
        "final_outcome": "Fail",
        "avg_clicks": "29.64",
        "student_count": 253
      },
      {
        "week_number": 7,
        "final_outcome": "Fail",
        "avg_clicks": "33.23",
        "student_count": 215
      },
      {
        "week_number": 8,
        "final_outcome": "Fail",
        "avg_clicks": "28.09",
        "student_count": 197
      },
      {
        "week_number": 9,
        "final_outcome": "Fail",
        "avg_clicks": "48.45",
        "student_count": 216
      },
      {
        "week_number": 10,
        "final_outcome": "Fail",
        "avg_clicks": "96.89",
        "student_count": 292
      },
      {
        "week_number": 11,
        "final_outcome": "Fail",
        "avg_clicks": "17.89",
        "student_count": 141
      },
      {
        "week_number": 12,
        "final_outcome": "Fail",
        "avg_clicks": "15.2",
        "student_count": 84
      },
      {
        "week_number": 13,
        "final_outcome": "Fail",
        "avg_clicks": "21.18",
        "student_count": 131
      },
      {
        "week_number": 14,
        "final_outcome": "Fail",
        "avg_clicks": "19.28",
        "student_count": 207
      },
      {
        "week_number": 15,
        "final_outcome": "Fail",
        "avg_clicks": "29.04",
        "student_count": 206
      },
      {
        "week_number": 16,
        "final_outcome": "Fail",
        "avg_clicks": "42.5",
        "student_count": 248
      },
      {
        "week_number": 17,
        "final_outcome": "Fail",
        "avg_clicks": "30.92",
        "student_count": 185
      },
      {
        "week_number": 18,
        "final_outcome": "Fail",
        "avg_clicks": "34.29",
        "student_count": 161
      },
      {
        "week_number": 19,
        "final_outcome": "Fail",
        "avg_clicks": "31.57",
        "student_count": 157
      },
      {
        "week_number": 20,
        "final_outcome": "Fail",
        "avg_clicks": "55.36",
        "student_count": 169
      },
      {
        "week_number": 21,
        "final_outcome": "Fail",
        "avg_clicks": "123.24",
        "student_count": 233
      },
      {
        "week_number": 22,
        "final_outcome": "Fail",
        "avg_clicks": "33.99",
        "student_count": 181
      },
      {
        "week_number": 23,
        "final_outcome": "Fail",
        "avg_clicks": "42.89",
        "student_count": 196
      },
      {
        "week_number": 24,
        "final_outcome": "Fail",
        "avg_clicks": "26.42",
        "student_count": 159
      },
      {
        "week_number": 25,
        "final_outcome": "Fail",
        "avg_clicks": "23.74",
        "student_count": 130
      },
      {
        "week_number": 26,
        "final_outcome": "Fail",
        "avg_clicks": "25.93",
        "student_count": 114
      },
      {
        "week_number": 27,
        "final_outcome": "Fail",
        "avg_clicks": "27.41",
        "student_count": 104
      },
      {
        "week_number": 28,
        "final_outcome": "Fail",
        "avg_clicks": "25.06",
        "student_count": 110
      },
      {
        "week_number": 29,
        "final_outcome": "Fail",
        "avg_clicks": "29.76",
        "student_count": 140
      },
      {
        "week_number": 30,
        "final_outcome": "Fail",
        "avg_clicks": "49.22",
        "student_count": 169
      },
      {
        "week_number": 31,
        "final_outcome": "Fail",
        "avg_clicks": "123.24",
        "student_count": 169
      },
      {
        "week_number": 32,
        "final_outcome": "Fail",
        "avg_clicks": "20.74",
        "student_count": 114
      },
      {
        "week_number": 33,
        "final_outcome": "Fail",
        "avg_clicks": "24.1",
        "student_count": 89
      },
      {
        "week_number": 34,
        "final_outcome": "Fail",
        "avg_clicks": "46.08",
        "student_count": 96
      },
      {
        "week_number": 35,
        "final_outcome": "Fail",
        "avg_clicks": "61.47",
        "student_count": 154
      },
      {
        "week_number": 36,
        "final_outcome": "Fail",
        "avg_clicks": "11.93",
        "student_count": 59
      },
      {
        "week_number": 37,
        "final_outcome": "Fail",
        "avg_clicks": "5.56",
        "student_count": 54
      },
      {
        "week_number": 38,
        "final_outcome": "Fail",
        "avg_clicks": "9.24",
        "student_count": 51
      },
      {
        "week_number": 39,
        "final_outcome": "Fail",
        "avg_clicks": "5.21",
        "student_count": 34
      },
      {
        "week_number": -2,
        "final_outcome": "Pass",
        "avg_clicks": "32.05",
        "student_count": 413
      },
      {
        "week_number": -1,
        "final_outcome": "Pass",
        "avg_clicks": "32.84",
        "student_count": 446
      },
      {
        "week_number": 0,
        "final_outcome": "Pass",
        "avg_clicks": "37.5",
        "student_count": 512
      },
      {
        "week_number": 1,
        "final_outcome": "Pass",
        "avg_clicks": "85.19",
        "student_count": 607
      },
      {
        "week_number": 2,
        "final_outcome": "Pass",
        "avg_clicks": "96.91",
        "student_count": 615
      },
      {
        "week_number": 3,
        "final_outcome": "Pass",
        "avg_clicks": "122.59",
        "student_count": 681
      },
      {
        "week_number": 4,
        "final_outcome": "Pass",
        "avg_clicks": "59.03",
        "student_count": 616
      },
      {
        "week_number": 5,
        "final_outcome": "Pass",
        "avg_clicks": "58.93",
        "student_count": 672
      },
      {
        "week_number": 6,
        "final_outcome": "Pass",
        "avg_clicks": "44.7",
        "student_count": 582
      },
      {
        "week_number": 7,
        "final_outcome": "Pass",
        "avg_clicks": "48.96",
        "student_count": 556
      },
      {
        "week_number": 8,
        "final_outcome": "Pass",
        "avg_clicks": "50.9",
        "student_count": 539
      },
      {
        "week_number": 9,
        "final_outcome": "Pass",
        "avg_clicks": "61.35",
        "student_count": 592
      },
      {
        "week_number": 10,
        "final_outcome": "Pass",
        "avg_clicks": "107.33",
        "student_count": 679
      },
      {
        "week_number": 11,
        "final_outcome": "Pass",
        "avg_clicks": "27.85",
        "student_count": 433
      },
      {
        "week_number": 12,
        "final_outcome": "Pass",
        "avg_clicks": "24.53",
        "student_count": 285
      },
      {
        "week_number": 13,
        "final_outcome": "Pass",
        "avg_clicks": "28.93",
        "student_count": 384
      },
      {
        "week_number": 14,
        "final_outcome": "Pass",
        "avg_clicks": "35.32",
        "student_count": 547
      },
      {
        "week_number": 15,
        "final_outcome": "Pass",
        "avg_clicks": "43.56",
        "student_count": 577
      },
      {
        "week_number": 16,
        "final_outcome": "Pass",
        "avg_clicks": "59.72",
        "student_count": 658
      },
      {
        "week_number": 17,
        "final_outcome": "Pass",
        "avg_clicks": "48.89",
        "student_count": 550
      },
      {
        "week_number": 18,
        "final_outcome": "Pass",
        "avg_clicks": "45.63",
        "student_count": 527
      },
      {
        "week_number": 19,
        "final_outcome": "Pass",
        "avg_clicks": "47.98",
        "student_count": 520
      },
      {
        "week_number": 20,
        "final_outcome": "Pass",
        "avg_clicks": "67.31",
        "student_count": 572
      },
      {
        "week_number": 21,
        "final_outcome": "Pass",
        "avg_clicks": "127.97",
        "student_count": 676
      },
      {
        "week_number": 22,
        "final_outcome": "Pass",
        "avg_clicks": "38.66",
        "student_count": 603
      },
      {
        "week_number": 23,
        "final_outcome": "Pass",
        "avg_clicks": "48.41",
        "student_count": 645
      },
      {
        "week_number": 24,
        "final_outcome": "Pass",
        "avg_clicks": "33.22",
        "student_count": 561
      },
      {
        "week_number": 25,
        "final_outcome": "Pass",
        "avg_clicks": "30.42",
        "student_count": 516
      },
      {
        "week_number": 26,
        "final_outcome": "Pass",
        "avg_clicks": "30.82",
        "student_count": 479
      },
      {
        "week_number": 27,
        "final_outcome": "Pass",
        "avg_clicks": "42.66",
        "student_count": 437
      },
      {
        "week_number": 28,
        "final_outcome": "Pass",
        "avg_clicks": "46.78",
        "student_count": 469
      },
      {
        "week_number": 29,
        "final_outcome": "Pass",
        "avg_clicks": "44.88",
        "student_count": 566
      },
      {
        "week_number": 30,
        "final_outcome": "Pass",
        "avg_clicks": "69.17",
        "student_count": 643
      },
      {
        "week_number": 31,
        "final_outcome": "Pass",
        "avg_clicks": "127.69",
        "student_count": 645
      },
      {
        "week_number": 32,
        "final_outcome": "Pass",
        "avg_clicks": "61.25",
        "student_count": 528
      },
      {
        "week_number": 33,
        "final_outcome": "Pass",
        "avg_clicks": "91.51",
        "student_count": 474
      },
      {
        "week_number": 34,
        "final_outcome": "Pass",
        "avg_clicks": "117.82",
        "student_count": 497
      },
      {
        "week_number": 35,
        "final_outcome": "Pass",
        "avg_clicks": "114.58",
        "student_count": 647
      },
      {
        "week_number": 36,
        "final_outcome": "Pass",
        "avg_clicks": "19.87",
        "student_count": 327
      },
      {
        "week_number": 37,
        "final_outcome": "Pass",
        "avg_clicks": "8.67",
        "student_count": 300
      },
      {
        "week_number": 38,
        "final_outcome": "Pass",
        "avg_clicks": "9.94",
        "student_count": 254
      },
      {
        "week_number": 39,
        "final_outcome": "Pass",
        "avg_clicks": "6.9",
        "student_count": 174
      },
      {
        "week_number": -2,
        "final_outcome": "Withdrawn",
        "avg_clicks": "22.63",
        "student_count": 441
      },
      {
        "week_number": -1,
        "final_outcome": "Withdrawn",
        "avg_clicks": "24.84",
        "student_count": 467
      },
      {
        "week_number": 0,
        "final_outcome": "Withdrawn",
        "avg_clicks": "26.92",
        "student_count": 519
      },
      {
        "week_number": 1,
        "final_outcome": "Withdrawn",
        "avg_clicks": "53.08",
        "student_count": 614
      },
      {
        "week_number": 2,
        "final_outcome": "Withdrawn",
        "avg_clicks": "66.13",
        "student_count": 603
      },
      {
        "week_number": 3,
        "final_outcome": "Withdrawn",
        "avg_clicks": "106.91",
        "student_count": 656
      },
      {
        "week_number": 4,
        "final_outcome": "Withdrawn",
        "avg_clicks": "35.7",
        "student_count": 491
      },
      {
        "week_number": 5,
        "final_outcome": "Withdrawn",
        "avg_clicks": "41.37",
        "student_count": 509
      },
      {
        "week_number": 6,
        "final_outcome": "Withdrawn",
        "avg_clicks": "24.41",
        "student_count": 377
      },
      {
        "week_number": 7,
        "final_outcome": "Withdrawn",
        "avg_clicks": "22.29",
        "student_count": 261
      },
      {
        "week_number": 8,
        "final_outcome": "Withdrawn",
        "avg_clicks": "30.15",
        "student_count": 265
      },
      {
        "week_number": 9,
        "final_outcome": "Withdrawn",
        "avg_clicks": "35.42",
        "student_count": 250
      },
      {
        "week_number": 10,
        "final_outcome": "Withdrawn",
        "avg_clicks": "83.72",
        "student_count": 312
      },
      {
        "week_number": 11,
        "final_outcome": "Withdrawn",
        "avg_clicks": "15.38",
        "student_count": 152
      },
      {
        "week_number": 12,
        "final_outcome": "Withdrawn",
        "avg_clicks": "11.58",
        "student_count": 90
      },
      {
        "week_number": 13,
        "final_outcome": "Withdrawn",
        "avg_clicks": "14.52",
        "student_count": 114
      },
      {
        "week_number": 14,
        "final_outcome": "Withdrawn",
        "avg_clicks": "15.64",
        "student_count": 171
      },
      {
        "week_number": 15,
        "final_outcome": "Withdrawn",
        "avg_clicks": "21.14",
        "student_count": 177
      },
      {
        "week_number": 16,
        "final_outcome": "Withdrawn",
        "avg_clicks": "30.92",
        "student_count": 181
      },
      {
        "week_number": 17,
        "final_outcome": "Withdrawn",
        "avg_clicks": "27.64",
        "student_count": 117
      },
      {
        "week_number": 18,
        "final_outcome": "Withdrawn",
        "avg_clicks": "22.41",
        "student_count": 106
      },
      {
        "week_number": 19,
        "final_outcome": "Withdrawn",
        "avg_clicks": "34.12",
        "student_count": 84
      },
      {
        "week_number": 20,
        "final_outcome": "Withdrawn",
        "avg_clicks": "28.59",
        "student_count": 103
      },
      {
        "week_number": 21,
        "final_outcome": "Withdrawn",
        "avg_clicks": "100.69",
        "student_count": 130
      },
      {
        "week_number": 22,
        "final_outcome": "Withdrawn",
        "avg_clicks": "26.55",
        "student_count": 77
      },
      {
        "week_number": 23,
        "final_outcome": "Withdrawn",
        "avg_clicks": "33.71",
        "student_count": 83
      },
      {
        "week_number": 24,
        "final_outcome": "Withdrawn",
        "avg_clicks": "16.72",
        "student_count": 53
      },
      {
        "week_number": 25,
        "final_outcome": "Withdrawn",
        "avg_clicks": "10.92",
        "student_count": 38
      },
      {
        "week_number": 26,
        "final_outcome": "Withdrawn",
        "avg_clicks": "19.27",
        "student_count": 26
      },
      {
        "week_number": 27,
        "final_outcome": "Withdrawn",
        "avg_clicks": "33.38",
        "student_count": 16
      },
      {
        "week_number": 28,
        "final_outcome": "Withdrawn",
        "avg_clicks": "26.68",
        "student_count": 19
      },
      {
        "week_number": 29,
        "final_outcome": "Withdrawn",
        "avg_clicks": "24.17",
        "student_count": 18
      },
      {
        "week_number": 30,
        "final_outcome": "Withdrawn",
        "avg_clicks": "67.76",
        "student_count": 17
      },
      {
        "week_number": 31,
        "final_outcome": "Withdrawn",
        "avg_clicks": "116.63",
        "student_count": 16
      },
      {
        "week_number": 32,
        "final_outcome": "Withdrawn",
        "avg_clicks": "4.57",
        "student_count": 7
      },
      {
        "week_number": 33,
        "final_outcome": "Withdrawn",
        "avg_clicks": "17.2",
        "student_count": 5
      },
      {
        "week_number": 34,
        "final_outcome": "Withdrawn",
        "avg_clicks": "9.43",
        "student_count": 14
      },
      {
        "week_number": 35,
        "final_outcome": "Withdrawn",
        "avg_clicks": "323.75",
        "student_count": 4
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G14__task_aware_data_summarization.json",
  "explanation_artifact_sha256": "1a1603b5b84579a5ab8211e6c75eff1db3f41e16bd928af851f8b80f599c08fe",
  "generator_input_sha256": "1d73dc5f52d3d2e7ce9e220deefa693c03cec7ba7cb6bd36f9a782d063b475bc",
  "generator_input_compact": {
    "task_id": "A-G14",
    "execution_id": "exec_1781847775085_95441256",
    "task_name": "Early withdrawal signal analysis",
    "analysis_type": "trend",
    "explanation_strategy": "trend",
    "actionable_question": "How early can admin detect a student about to drop out?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "withdrawal_signal_trend"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "withdrawal_signal_trend"
    ],
    "dataset_row_counts": {
      "withdrawal_signal_trend": 164
    },
    "ai_summary_config_summary": {
      "summary_type": "trend_comparison",
      "metric_column": "avg_clicks",
      "entity_column": null,
      "group_column": "final_outcome",
      "time_column": "week_number",
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
  "raw_text": "Summary: The trend for the Withdrawn group shows a significant decline in engagement, particularly marked by a sharp drop in average clicks. This decline suggests that early detection of students at risk of withdrawal can be identified around week 32, where engagement metrics plummeted.\n\nInsights: Sudden Decline in Engagement: There was a sharp drop in average clicks from 116.63 in week 31 to 4.57 in week 32, indicating a significant disengagement among students who later withdrew. | Peak Engagement Before Withdrawal: The highest engagement for the Withdrawn group occurred in week 35 with an average of 323.75 clicks, but this was after a significant drop, indicating a potential last-minute effort before final withdrawal. | Engagement Trough Significance: The lowest engagement was recorded in week 32 with an average of 4.57 clicks, suggesting a critical point for intervention as students were likely disengaging.\n\nEducational implications: The drastic drop in engagement metrics indicates that students may be at risk of withdrawal as early as week 32, suggesting the need for timely interventions.\n\nRecommendations: high - Implement early warning systems to monitor engagement metrics weekly. - By identifying students with declining engagement early, educators can provide targeted support to prevent withdrawal.\n\nWarnings: 3 Withdrawn points have student_count below 10; avoid over-weighting these weeks.",
  "structured_payload": {
    "task_id": "A-G14",
    "execution_id": "exec_1781847775085_95441256",
    "explanation": {
      "summary": "The trend for the Withdrawn group shows a significant decline in engagement, particularly marked by a sharp drop in average clicks. This decline suggests that early detection of students at risk of withdrawal can be identified around week 32, where engagement metrics plummeted.",
      "insights": [
        {
          "title": "Sudden Decline in Engagement",
          "description": "There was a sharp drop in average clicks from 116.63 in week 31 to 4.57 in week 32, indicating a significant disengagement among students who later withdrew.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_clicks",
              "value": 4.57,
              "comparison": "down_from_previous",
              "delta": -112.06,
              "context": "Week 32 engagement dropped drastically from week 31."
            }
          ]
        },
        {
          "title": "Peak Engagement Before Withdrawal",
          "description": "The highest engagement for the Withdrawn group occurred in week 35 with an average of 323.75 clicks, but this was after a significant drop, indicating a potential last-minute effort before final withdrawal.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_clicks",
              "value": 323.75,
              "comparison": "peak",
              "delta": null,
              "context": "Week 35 shows a peak engagement despite the overall declining trend."
            }
          ]
        },
        {
          "title": "Engagement Trough Significance",
          "description": "The lowest engagement was recorded in week 32 with an average of 4.57 clicks, suggesting a critical point for intervention as students were likely disengaging.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_clicks",
              "value": 4.57,
              "comparison": "trough",
              "delta": null,
              "context": "Week 32 marks the lowest engagement before withdrawal."
            }
          ]
        }
      ],
      "educational_implications": [
        "The drastic drop in engagement metrics indicates that students may be at risk of withdrawal as early as week 32, suggesting the need for timely interventions."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement early warning systems to monitor engagement metrics weekly.",
          "rationale": "By identifying students with declining engagement early, educators can provide targeted support to prevent withdrawal."
        }
      ],
      "warnings": [
        "3 Withdrawn points have student_count below 10; avoid over-weighting these weeks."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset has a strong statistical basis with 1998 students and 9 assessments across 8 weeks.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "trend_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 164,
    "included_row_count": null,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": false,
    "dataset_row_breakdown": [
      {
        "dataset_name": "withdrawal_signal_trend",
        "row_count": 164,
        "included_row_count": 164
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6959,
      "token_usage": {
        "prompt_tokens": 2711,
        "completion_tokens": 616,
        "total_tokens": 3327
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000776
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G14__task_aware_data_summarization.json",
    "explanation_artifact_sha256": "1a1603b5b84579a5ab8211e6c75eff1db3f41e16bd928af851f8b80f599c08fe",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "task_aware_data_summarization",
    "observed_ai_summary_method": "task_aware_data_summarization",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 2711,
      "completion_tokens": 616,
      "total_tokens": 3327
    },
    "latency_ms": 6964,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G14",
    "execution_id": "exec_1781847775085_95441256",
    "explanation": {
      "summary": "The trend for the Withdrawn group shows a significant decline in engagement, particularly marked by a sharp drop in average clicks. This decline suggests that early detection of students at risk of withdrawal can be identified around week 32, where engagement metrics plummeted.",
      "insights": [
        {
          "title": "Sudden Decline in Engagement",
          "description": "There was a sharp drop in average clicks from 116.63 in week 31 to 4.57 in week 32, indicating a significant disengagement among students who later withdrew.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_clicks",
              "value": 4.57,
              "comparison": "down_from_previous",
              "delta": -112.06,
              "context": "Week 32 engagement dropped drastically from week 31."
            }
          ]
        },
        {
          "title": "Peak Engagement Before Withdrawal",
          "description": "The highest engagement for the Withdrawn group occurred in week 35 with an average of 323.75 clicks, but this was after a significant drop, indicating a potential last-minute effort before final withdrawal.",
          "severity": "medium",
          "evidence": [
            {
              "metric": "avg_clicks",
              "value": 323.75,
              "comparison": "peak",
              "delta": null,
              "context": "Week 35 shows a peak engagement despite the overall declining trend."
            }
          ]
        },
        {
          "title": "Engagement Trough Significance",
          "description": "The lowest engagement was recorded in week 32 with an average of 4.57 clicks, suggesting a critical point for intervention as students were likely disengaging.",
          "severity": "high",
          "evidence": [
            {
              "metric": "avg_clicks",
              "value": 4.57,
              "comparison": "trough",
              "delta": null,
              "context": "Week 32 marks the lowest engagement before withdrawal."
            }
          ]
        }
      ],
      "educational_implications": [
        "The drastic drop in engagement metrics indicates that students may be at risk of withdrawal as early as week 32, suggesting the need for timely interventions."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement early warning systems to monitor engagement metrics weekly.",
          "rationale": "By identifying students with declining engagement early, educators can provide targeted support to prevent withdrawal."
        }
      ],
      "warnings": [
        "3 Withdrawn points have student_count below 10; avoid over-weighting these weeks."
      ]
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The dataset has a strong statistical basis with 1998 students and 9 assessments across 8 weeks.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "trend",
    "explanation_type": "trend",
    "ai_summary_method": "task_aware_data_summarization",
    "ai_summary_version": "v1",
    "baseline_available": true,
    "input_summary_type": "trend_comparison",
    "ai_summary_method_warning": null,
    "full_result_row_count": 164,
    "included_row_count": null,
    "small_result_threshold": 20,
    "small_result_full_rows_applied": false,
    "dataset_row_breakdown": [
      {
        "dataset_name": "withdrawal_signal_trend",
        "row_count": 164,
        "included_row_count": 164
      }
    ],
    "safety_flags": [],
    "degraded": false,
    "meta": {
      "model": "gpt-4o-mini-2024-07-18",
      "latency_ms": 6959,
      "token_usage": {
        "prompt_tokens": 2711,
        "completion_tokens": 616,
        "total_tokens": 3327
      },
      "strategy": "trend",
      "granularity": "weekly",
      "cost_usd": 0.000776
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
    "expected": 164,
    "observed": 164
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "64c67afde434dcdc16e3b44225b1be83ff387bfc4ca03234bd334a5e7b8e5e9a",
    "expected_values": [
      "64c67afde434dcdc16e3b44225b1be83ff387bfc4ca03234bd334a5e7b8e5e9a"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "4364e835b8582e11d11d490373138a0b17d222dfbca1533b41a9bf39123cfd2c",
    "expected": "4364e835b8582e11d11d490373138a0b17d222dfbca1533b41a9bf39123cfd2c"
  },
  {
    "check_id": "numeric_fields_withdrawal_signal_trend",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "withdrawal_signal_trend",
    "numeric_columns": [
      "student_count",
      "week_number"
    ],
    "numeric_summaries": {
      "student_count": {
        "count": 164,
        "min": 4,
        "max": 681
      },
      "week_number": {
        "count": 164,
        "min": -2,
        "max": 39
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_withdrawal_signal_trend",
    "check_type": "threshold_flag_detection",
    "status": "not_applicable",
    "dataset_label": "withdrawal_signal_trend",
    "flag_columns": [],
    "triggered_like_counts": {}
  }
]
```
