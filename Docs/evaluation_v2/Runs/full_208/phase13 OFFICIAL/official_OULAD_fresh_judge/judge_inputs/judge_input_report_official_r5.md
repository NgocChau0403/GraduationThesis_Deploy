# LLM Judge V2 Phase F5 Judge Input Validation Report

- Generated at: 2026-06-21T20:50:26.069Z
- Status: PASS
- Judge input ready records: 88
- Failed records: 0
- Total records: 88
- Errors: 0
- Warnings: 0

## Versions

- Prompt version: judge_prompt_v2_pilot_v1
- Rubric version: judge_rubric_1_to_10_pilot_v1
- Evaluation run id: oulad_official_r5

## Gate Decision

- Judge input review allowed: true
- Judge invocation allowed: false
- Reason: All judge inputs materialized and passed schema validation. Build and validate final judge contexts before judge invocation.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_OULAD":88} |
| Explanation modes | {"baseline_first_20_rows":44,"task_aware_data_summarization":44} |
| Evidence access modes | {"direct_embedding":62,"deterministic_artifact_retrieval":26} |
| Statuses | {"judge_input_ready":88} |

## Outputs

- Judge input manifest: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/judge_input_manifest.jsonl`
- Judge inputs dir: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/judge_inputs`
- Retrieval logs dir: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/retrieval_logs`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/judge_input_report_official_r5.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/judge_input_report_official_r5.md`

## Issues

No issues found.

