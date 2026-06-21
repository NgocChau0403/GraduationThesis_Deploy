# LLM Judge V2 Phase F7-preflight Token Budget Report

- Generated at: 2026-06-21T20:50:32.095Z
- Status: PASS
- Tokenizer method: heuristic_chars_div_4_ceiling
- Full-context token cap: 32000
- Prompt queue ready records: 88/88
- Full-context records: 76
- Compact retrieval-context records: 12
- Packet layout: embedded_prompt_full_context
- Estimated repeated static tokens avoided: 0
- Estimated token savings: 0%

## Threshold Counts

| Threshold | Records above threshold |
| --- | ---: |
| >32,000 | 12 |
| >64,000 | 9 |
| >128,000 | 5 |
| >190,000 | 2 |

## Max Context Record

```json
{
 "record_id": "SAMPLE_OULAD__S-T11__task_aware_data_summarization",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "S-T11",
 "explanation_mode": "task_aware_data_summarization",
 "evidence_access_mode": "deterministic_artifact_retrieval",
 "context_token_count": 197991,
 "prompt_packet_token_count": 10398,
 "packet_layout": "embedded_prompt_full_context",
 "queue_strategy": "compact_retrieval_context",
 "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_contexts/final_contexts/SAMPLE_OULAD__S-T11__task_aware_data_summarization.md",
 "prompt_packet_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_queue/prompt_queue/SAMPLE_OULAD__S-T11__task_aware_data_summarization.md"
}
```

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_OULAD":88} |
| Explanation modes | {"baseline_first_20_rows":44,"task_aware_data_summarization":44} |
| Evidence access modes | {"direct_embedding":62,"deterministic_artifact_retrieval":26} |
| Queue strategies | {"full_context":76,"compact_retrieval_context":12} |
| Token risk buckets | {"<=32k":76,">64k":4,">128k":3,">32k":3,">190k":2} |

## Gate Decision

- Prompt queue preflight status: PASS
- Prompt queue ready: true
- Judge invocation started: false
- Judge invocation allowed: false
- Official full evaluation allowed: pending_user_approval
- Reason: Prompt queue packets are generated with token-budget strategy. Judge invocation was not started and still requires explicit user approval.

## Outputs

- Prompt queue manifest: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_queue/judge_prompt_queue_manifest.jsonl`
- Prompt queue dir: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_queue/prompt_queue`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_queue/judge_queue_report_official_r5.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_queue/judge_queue_report_official_r5.md`

## Issues

No issues found.

