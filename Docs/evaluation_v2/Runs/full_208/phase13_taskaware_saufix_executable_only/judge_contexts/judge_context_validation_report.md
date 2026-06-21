# LLM Judge V2 Phase F6 Judge Context Validation Report

- Generated at: 2026-06-21T10:35:40.638Z
- Status: PASS
- Judge context ready records: 48
- Failed records: 0
- Total records: 48
- Errors: 0
- Warnings: 0

## Gate Decision

- Judge context validation status: PASS
- Judge invocation allowed: true
- Full judge invocation allowed: true
- Official full evaluation allowed: pending_user_approval
- Reason: Final judge contexts prove direct-embedded or retrieved evidence is materialized before judge invocation.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":48} |
| Explanation modes | {"baseline_first_20_rows":24,"task_aware_data_summarization":24} |
| Evidence access modes | {"direct_embedding":38,"deterministic_artifact_retrieval":10} |
| Statuses | {"judge_context_ready":48} |

## Token Accounting

- Tokenizer method: heuristic_chars_div_4_ceiling
- Min context tokens: 7219
- Max context tokens: 68701
- Average context tokens: 17650

## Outputs

- Final contexts dir: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_contexts/final_contexts`
- Judge context manifest: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_contexts/judge_context_manifest.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_contexts/judge_context_validation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_contexts/judge_context_validation_report.md`

## Issues

No issues found.

