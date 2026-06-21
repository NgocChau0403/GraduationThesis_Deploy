# LLM Judge V2 Phase F7-preflight Token Budget Report

- Generated at: 2026-06-20T16:54:54.505Z
- Status: PASS
- Tokenizer method: heuristic_chars_div_4_ceiling
- Full-context token cap: 32000
- Prompt queue ready records: 208/208
- Full-context records: 190
- Compact retrieval-context records: 18

## Threshold Counts

| Threshold | Records above threshold |
| --- | ---: |
| >32,000 | 18 |
| >64,000 | 12 |
| >128,000 | 4 |
| >190,000 | 2 |

## Max Context Record

```json
{
  "record_id": "SAMPLE_OULAD__S-T11__task_aware_data_summarization",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "S-T11",
  "explanation_mode": "task_aware_data_summarization",
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "context_token_count": 194446,
  "prompt_packet_token_count": 6497,
  "queue_strategy": "compact_retrieval_context",
  "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_contexts/final_contexts/SAMPLE_OULAD__S-T11__task_aware_data_summarization.md",
  "prompt_packet_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_queue/prompt_queue/SAMPLE_OULAD__S-T11__task_aware_data_summarization.md"
}
```

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":104,"SAMPLE_OULAD":104} |
| Explanation modes | {"baseline_first_20_rows":104,"task_aware_data_summarization":104} |
| Evidence access modes | {"direct_embedding":170,"deterministic_artifact_retrieval":38} |
| Queue strategies | {"full_context":190,"compact_retrieval_context":18} |
| Token risk buckets | {"<=32k":190,">32k":6,">64k":8,">128k":2,">190k":2} |

## Gate Decision

- Prompt queue preflight status: PASS
- Prompt queue ready: true
- Judge invocation started: false
- Judge invocation allowed: false
- Official full evaluation allowed: pending_user_approval
- Reason: Prompt queue packets are generated with token-budget strategy. Judge invocation was not started and still requires explicit user approval.

## Outputs

- Prompt queue manifest: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_queue/judge_prompt_queue_manifest.jsonl`
- Prompt queue dir: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_queue/prompt_queue`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_queue/token_budget_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_queue/token_budget_report.md`

## Issues

No issues found.

