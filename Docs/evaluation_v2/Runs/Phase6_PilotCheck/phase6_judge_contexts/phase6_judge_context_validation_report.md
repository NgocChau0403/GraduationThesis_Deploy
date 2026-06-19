# LLM Judge V2 Phase 6.4b Judge Context Validation Report

- Generated at: 2026-06-19T03:46:08.646Z
- Status: PASS
- Judge context ready records: 24
- Failed records: 0
- Total records: 24
- Errors: 0
- Warnings: 0

## Gate Decision

- Judge context validation status: PASS
- Pilot judge invocation allowed: true
- Official full evaluation allowed: false
- Reason: Final judge contexts prove direct-embedded or retrieved evidence is materialized before Phase 6.5 pilot judge invocation.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":12,"SAMPLE_OULAD":12} |
| Explanation modes | {"baseline_first_20_rows":12,"task_aware_data_summarization":12} |
| Evidence access modes | {"direct_embedding":12,"deterministic_artifact_retrieval":12} |
| Statuses | {"judge_context_ready":24} |

## Token Accounting

- Tokenizer method: heuristic_chars_div_4_ceiling
- Min context tokens: 6205
- Max context tokens: 68012
- Average context tokens: 19327

## Outputs

- Final contexts dir: `Docs/evaluation_v2/Runs/phase6_judge_contexts/final_contexts`
- Judge context manifest: `Docs/evaluation_v2/Runs/phase6_judge_contexts/judge_context_manifest.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/phase6_judge_contexts/phase6_judge_context_validation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/phase6_judge_contexts/phase6_judge_context_validation_report.md`

## Issues

No issues found.

