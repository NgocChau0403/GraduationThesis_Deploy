# LLM Judge V2 Phase 6.5 Pilot Judge Invocation Report

- Generated at: 2026-06-19T04:44:13.051Z
- Mode: import
- Status: WAITING_FOR_RAW_OUTPUTS
- Expected records: 24
- Prompt queue records: 24
- Raw received records: 2
- Valid records: 2
- Retryable invalid records: 0
- Missing records: 22
- Errors: 0
- Warnings: 22

## Gate Decision

- Prompt queue ready: true
- Actual judge invocation completed: false
- Pilot output validation passed: false
- Phase 6.6 scoring allowed: false
- Official full evaluation allowed: false
- Reason: Raw judge outputs are missing or invalid. Complete invocation/import before Phase 6.6.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":12,"SAMPLE_OULAD":12} |
| Explanation modes | {"baseline_first_20_rows":12,"task_aware_data_summarization":12} |
| Evidence access modes | {"direct_embedding":12,"deterministic_artifact_retrieval":12} |
| Record statuses | {"valid":2,"missing":22} |

## Outputs

- Prompt queue dir: `Docs/evaluation_v2/Runs/phase6_judge_invocation/prompt_queue`
- Raw outputs dir: `Docs/evaluation_v2/Runs/phase6_judge_invocation/raw_outputs`
- Invocation manifest: `Docs/evaluation_v2/Runs/phase6_judge_invocation/pilot_judge_invocation_manifest.jsonl`
- Attempt manifest: `Docs/evaluation_v2/Runs/phase6_judge_invocation/pilot_judge_attempt_manifest.jsonl`
- Status manifest: `Docs/evaluation_v2/Runs/phase6_judge_invocation/pilot_judge_record_status_manifest.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/phase6_judge_invocation/phase6_pilot_judge_invocation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/phase6_judge_invocation/phase6_pilot_judge_invocation_report.md`

## Issues

| Severity | Code | Record | Message |
| --- | --- | --- | --- |
| warning | raw_output_missing | SAMPLE_UCI_POR__S-T01__task_aware_data_summarization | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_UCI_POR__S-T04__baseline_first_20_rows | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_UCI_POR__S-T04__task_aware_data_summarization | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_UCI_POR__S-T09__task_aware_data_summarization | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_UCI_POR__A-C04__baseline_first_20_rows | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_UCI_POR__A-C04__task_aware_data_summarization | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_UCI_POR__A-G02__baseline_first_20_rows | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_UCI_POR__A-G02__task_aware_data_summarization | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_UCI_POR__A-G13__baseline_first_20_rows | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_UCI_POR__A-G13__task_aware_data_summarization | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_OULAD__S-T05__baseline_first_20_rows | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_OULAD__S-T05__task_aware_data_summarization | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_OULAD__A-G07__baseline_first_20_rows | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_OULAD__A-G07__task_aware_data_summarization | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_OULAD__A-G11__baseline_first_20_rows | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_OULAD__A-G11__task_aware_data_summarization | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_OULAD__A-G15__baseline_first_20_rows | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_OULAD__A-G15__task_aware_data_summarization | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_OULAD__A-G16__baseline_first_20_rows | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_OULAD__A-G16__task_aware_data_summarization | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_OULAD__A-S08__baseline_first_20_rows | No raw judge output found for this record. |
| warning | raw_output_missing | SAMPLE_OULAD__A-S08__task_aware_data_summarization | No raw judge output found for this record. |

