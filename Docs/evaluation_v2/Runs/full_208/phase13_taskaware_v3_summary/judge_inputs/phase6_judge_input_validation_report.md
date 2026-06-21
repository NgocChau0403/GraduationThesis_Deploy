# LLM Judge V2 Phase F5 Judge Input Validation Report

- Generated at: 2026-06-20T16:29:35.980Z
- Status: PASS
- Judge input ready records: 208
- Failed records: 0
- Total records: 208
- Errors: 0
- Warnings: 0

## Versions

- Prompt version: judge_prompt_v2_pilot_v1
- Rubric version: judge_rubric_1_to_10_pilot_v1
- Evaluation run id: full_208_taskaware_v3_summary

## Gate Decision

- Judge input review allowed: true
- Judge invocation allowed: false
- Reason: All judge inputs materialized and passed schema validation. Build and validate final judge contexts before judge invocation.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":104,"SAMPLE_OULAD":104} |
| Explanation modes | {"baseline_first_20_rows":104,"task_aware_data_summarization":104} |
| Evidence access modes | {"direct_embedding":170,"deterministic_artifact_retrieval":38} |
| Statuses | {"judge_input_ready":208} |

## Outputs

- Judge input manifest: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_inputs/judge_input_manifest.jsonl`
- Judge inputs dir: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_inputs/judge_inputs`
- Retrieval logs dir: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_inputs/retrieval_logs`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_inputs/phase6_judge_input_validation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_inputs/phase6_judge_input_validation_report.md`

## Issues

No issues found.

