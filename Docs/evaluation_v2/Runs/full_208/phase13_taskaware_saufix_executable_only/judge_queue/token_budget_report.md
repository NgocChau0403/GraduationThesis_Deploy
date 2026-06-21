# LLM Judge V2 Phase F7-preflight Token Budget Report

- Generated at: 2026-06-21T10:35:49.299Z
- Status: PASS
- Tokenizer method: heuristic_chars_div_4_ceiling
- Full-context token cap: 32000
- Prompt queue ready records: 48/48
- Full-context records: 40
- Compact retrieval-context records: 8
- Packet layout: embedded_prompt_full_context
- Estimated repeated static tokens avoided: 0
- Estimated token savings: 0%

## Threshold Counts

| Threshold | Records above threshold |
| --- | ---: |
| >32,000 | 8 |
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
  "context_token_count": 68701,
  "prompt_packet_token_count": 6973,
  "packet_layout": "embedded_prompt_full_context",
  "queue_strategy": "compact_retrieval_context",
  "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_contexts/final_contexts/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.md",
  "prompt_packet_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_queue/prompt_queue/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.md"
}
```

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":48} |
| Explanation modes | {"baseline_first_20_rows":24,"task_aware_data_summarization":24} |
| Evidence access modes | {"direct_embedding":38,"deterministic_artifact_retrieval":10} |
| Queue strategies | {"full_context":40,"compact_retrieval_context":8} |
| Token risk buckets | {"<=32k":40,">32k":4,">64k":4} |

## Gate Decision

- Prompt queue preflight status: PASS
- Prompt queue ready: true
- Judge invocation started: false
- Judge invocation allowed: false
- Official full evaluation allowed: pending_user_approval
- Reason: Prompt queue packets are generated with token-budget strategy. Judge invocation was not started and still requires explicit user approval.

## Outputs

- Prompt queue manifest: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_queue/judge_prompt_queue_manifest.jsonl`
- Prompt queue dir: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_queue/prompt_queue`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_queue/token_budget_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/judge_queue/token_budget_report.md`

## Issues

No issues found.

