# LLM Judge V2 Phase F6 Judge Context Validation Report

- Generated at: 2026-06-19T07:47:45.644Z
- Status: PASS
- Judge context ready records: 208
- Failed records: 0
- Total records: 208
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
| Datasets | {"SAMPLE_UCI_POR":104,"SAMPLE_OULAD":104} |
| Explanation modes | {"baseline_first_20_rows":104,"task_aware_data_summarization":104} |
| Evidence access modes | {"direct_embedding":170,"deterministic_artifact_retrieval":38} |
| Statuses | {"judge_context_ready":208} |

## Token Accounting

- Tokenizer method: heuristic_chars_div_4_ceiling
- Min context tokens: 6188
- Max context tokens: 194178
- Average context tokens: 15433

## Outputs

- Final contexts dir: `Docs/evaluation_v2/Runs/full_208/phase8_judge_contexts/final_contexts`
- Judge context manifest: `Docs/evaluation_v2/Runs/full_208/phase8_judge_contexts/judge_context_manifest.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase8_judge_contexts/judge_context_validation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase8_judge_contexts/judge_context_validation_report.md`

## Issues

No issues found.

