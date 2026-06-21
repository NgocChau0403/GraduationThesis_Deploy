# LLM Judge V2 Phase F6 Judge Context Validation Report

- Generated at: 2026-06-21T20:50:29.884Z
- Status: PASS
- Judge context ready records: 88
- Failed records: 0
- Total records: 88
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
| Datasets | {"SAMPLE_OULAD":88} |
| Explanation modes | {"baseline_first_20_rows":44,"task_aware_data_summarization":44} |
| Evidence access modes | {"direct_embedding":62,"deterministic_artifact_retrieval":26} |
| Statuses | {"judge_context_ready":88} |

## Token Accounting

- Tokenizer method: heuristic_chars_div_4_ceiling
- Min context tokens: 7159
- Max context tokens: 197991
- Average context tokens: 27273

## Outputs

- Final contexts dir: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_contexts/final_contexts`
- Judge context manifest: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_contexts/judge_context_manifest.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_contexts/judge_context_report_official_r5.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_contexts/judge_context_report_official_r5.md`

## Issues

No issues found.

