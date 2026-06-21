# LLM Judge V2 Phase F5 Judge Input Validation Report

- Generated at: 2026-06-21T13:20:23.016Z
- Status: PASS
- Judge input ready records: 48
- Failed records: 0
- Total records: 48
- Errors: 0
- Warnings: 0

## Versions

- Prompt version: judge_prompt_v2_pilot_v1
- Rubric version: judge_rubric_1_to_10_pilot_v1
- Evaluation run id: phase13_local_taskaware_official_r4_fresh_judge

## Gate Decision

- Judge input review allowed: true
- Judge invocation allowed: false
- Reason: All judge inputs materialized and passed schema validation. Build and validate final judge contexts before judge invocation.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":48} |
| Explanation modes | {"baseline_first_20_rows":24,"task_aware_data_summarization":24} |
| Evidence access modes | {"direct_embedding":38,"deterministic_artifact_retrieval":10} |
| Statuses | {"judge_input_ready":48} |

## Outputs

- Judge input manifest: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_inputs/judge_input_manifest.jsonl`
- Judge inputs dir: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_inputs/judge_inputs`
- Retrieval logs dir: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_inputs/retrieval_logs`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_inputs/official_judge_input_validation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_inputs/official_judge_input_validation_report.md`

## Issues

No issues found.

