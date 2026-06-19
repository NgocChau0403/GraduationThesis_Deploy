# LLM Judge V2 Phase F7-preflight Token Budget Report

- Generated at: 2026-06-19T10:54:51.373Z
- Status: PASS
- Tokenizer method: heuristic_chars_div_4_ceiling
- Full-context token cap: 32000
- Prompt queue ready records: 104/104
- Full-context records: 94
- Compact retrieval-context records: 10

## Threshold Counts

| Threshold | Records above threshold |
| --- | ---: |
| >32,000 | 10 |
| >64,000 | 4 |
| >128,000 | 0 |
| >190,000 | 0 |

## Max Context Record

```json
{
  "record_id": "SAMPLE_UCI_POR__S-T09__task_aware_data_summarization",
  "dataset_id": "SAMPLE_UCI_POR",
  "task_id": "S-T09",
  "explanation_mode": "task_aware_data_summarization",
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "context_token_count": 68010,
  "prompt_packet_token_count": 6478,
  "queue_strategy": "compact_retrieval_context",
  "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_contexts/final_contexts/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.md",
  "prompt_packet_path": "Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_invocation/prompt_queue/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.md"
}
```

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":104} |
| Explanation modes | {"baseline_first_20_rows":52,"task_aware_data_summarization":52} |
| Evidence access modes | {"direct_embedding":92,"deterministic_artifact_retrieval":12} |
| Queue strategies | {"full_context":94,"compact_retrieval_context":10} |
| Token risk buckets | {"<=32k":94,">32k":6,">64k":4} |

## Gate Decision

- Prompt queue preflight status: PASS
- Prompt queue ready: true
- Judge invocation started: false
- Judge invocation allowed: false
- Official full evaluation allowed: pending_user_approval
- Reason: Prompt queue packets are generated with token-budget strategy. Judge invocation was not started and still requires explicit user approval.

## Outputs

- Prompt queue manifest: `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_invocation/judge_prompt_queue_manifest.jsonl`
- Prompt queue dir: `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_invocation/prompt_queue`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_invocation/v3_uci_token_budget_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_invocation/v3_uci_token_budget_report.md`

## Issues

No issues found.

