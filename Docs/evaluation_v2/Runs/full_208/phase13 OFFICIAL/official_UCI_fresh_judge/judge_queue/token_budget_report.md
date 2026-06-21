# LLM Judge V2 Phase F7-preflight Token Budget Report

- Generated at: 2026-06-21T13:20:54.090Z
- Status: PASS
- Tokenizer method: heuristic_chars_div_4_ceiling
- Full-context token cap: 32000
- Prompt queue ready records: 48/48
- Full-context records: 39
- Compact retrieval-context records: 9
- Packet layout: session_static_record_context
- Estimated repeated static tokens avoided: 164547
- Estimated token savings: 28.26%

## Threshold Counts

| Threshold | Records above threshold |
| --- | ---: |
| >32,000 | 9 |
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
 "context_token_count": 71916,
 "prompt_packet_token_count": 7194,
 "packet_layout": "session_static_record_context",
 "queue_strategy": "compact_retrieval_context",
 "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_contexts/final_contexts/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.md",
 "prompt_packet_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_queue/prompt_queue/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.md"
}
```

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":48} |
| Explanation modes | {"baseline_first_20_rows":24,"task_aware_data_summarization":24} |
| Evidence access modes | {"direct_embedding":38,"deterministic_artifact_retrieval":10} |
| Queue strategies | {"full_context":39,"compact_retrieval_context":9} |
| Token risk buckets | {"<=32k":39,">32k":5,">64k":4} |

## Gate Decision

- Prompt queue preflight status: PASS
- Prompt queue ready: true
- Judge invocation started: false
- Judge invocation allowed: false
- Official full evaluation allowed: pending_user_approval
- Reason: Prompt queue packets are generated with token-budget strategy. Judge invocation was not started and still requires explicit user approval.

## Outputs

- Prompt queue manifest: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_queue/judge_prompt_queue_manifest.jsonl`
- Prompt queue dir: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_queue/prompt_queue`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_queue/token_budget_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/official_r4_fresh_judge/judge_queue/token_budget_report.md`

## Issues

No issues found.

