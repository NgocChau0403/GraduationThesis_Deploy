# LLM Judge V2 Phase F6 Judge Context Validation Report

- Generated at: 2026-06-19T10:54:48.653Z
- Status: PASS
- Judge context ready records: 104
- Failed records: 0
- Total records: 104
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
| Datasets | {"SAMPLE_UCI_POR":104} |
| Explanation modes | {"baseline_first_20_rows":52,"task_aware_data_summarization":52} |
| Evidence access modes | {"direct_embedding":92,"deterministic_artifact_retrieval":12} |
| Statuses | {"judge_context_ready":104} |

## Token Accounting

- Tokenizer method: heuristic_chars_div_4_ceiling
- Min context tokens: 6014
- Max context tokens: 68010
- Average context tokens: 11979

## Outputs

- Final contexts dir: `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_contexts/final_contexts`
- Judge context manifest: `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_contexts/judge_context_manifest.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_contexts/v3_uci_judge_context_validation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_contexts/v3_uci_judge_context_validation_report.md`

## Issues

No issues found.

