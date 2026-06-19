# LLM Judge V2 Phase 6.4 Judge Input Validation Report

- Generated at: 2026-06-18T22:36:57.620Z
- Status: PASS
- Judge input ready records: 24
- Failed records: 0
- Total records: 24
- Errors: 0
- Warnings: 0

## Versions

- Prompt version: judge_prompt_v2_pilot_v1
- Rubric version: judge_rubric_1_to_10_pilot_v1
- Evaluation run id: llm_judge_v2_pilot_phase6_4

## Gate Decision

- Judge input review allowed: true
- Judge invocation allowed: false
- Reason: All judge inputs materialized and passed schema validation. Review sample judge inputs before Phase 6.5 judge invocation.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":12,"SAMPLE_OULAD":12} |
| Explanation modes | {"baseline_first_20_rows":12,"task_aware_data_summarization":12} |
| Evidence access modes | {"direct_embedding":12,"deterministic_artifact_retrieval":12} |
| Statuses | {"judge_input_ready":24} |

## Outputs

- Judge input manifest: `Docs/evaluation_v2/Runs/phase6_judge_inputs/judge_input_manifest.jsonl`
- Judge inputs dir: `Docs/evaluation_v2/Runs/phase6_judge_inputs/judge_inputs`
- Retrieval logs dir: `Docs/evaluation_v2/Runs/phase6_judge_inputs/retrieval_logs`
- JSON report: `Docs/evaluation_v2/Runs/phase6_judge_inputs/phase6_judge_input_validation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/phase6_judge_inputs/phase6_judge_input_validation_report.md`

## Issues

No issues found.

