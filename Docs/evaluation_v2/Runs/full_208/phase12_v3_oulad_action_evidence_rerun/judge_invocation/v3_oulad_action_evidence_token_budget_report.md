# LLM Judge V2 Phase F7-preflight Token Budget Report

- Generated at: 2026-06-20T03:07:23.479Z
- Status: PASS
- Tokenizer method: heuristic_chars_div_4_ceiling
- Full-context token cap: 32000
- Prompt queue ready records: 104/104
- Full-context records: 96
- Compact retrieval-context records: 8

## Threshold Counts

| Threshold | Records above threshold |
| --- | ---: |
| >32,000 | 8 |
| >64,000 | 8 |
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
  "context_token_count": 195066,
  "prompt_packet_token_count": 7164,
  "queue_strategy": "compact_retrieval_context",
  "final_context_path": "Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_contexts/final_contexts/SAMPLE_OULAD__S-T11__task_aware_data_summarization.md",
  "prompt_packet_path": "Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_invocation/prompt_queue/SAMPLE_OULAD__S-T11__task_aware_data_summarization.md"
}
```

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_OULAD":104} |
| Explanation modes | {"baseline_first_20_rows":52,"task_aware_data_summarization":52} |
| Evidence access modes | {"direct_embedding":78,"deterministic_artifact_retrieval":26} |
| Queue strategies | {"full_context":96,"compact_retrieval_context":8} |
| Token risk buckets | {"<=32k":96,">64k":4,">128k":2,">190k":2} |

## Gate Decision

- Prompt queue preflight status: PASS
- Prompt queue ready: true
- Judge invocation started: false
- Judge invocation allowed: false
- Official full evaluation allowed: pending_user_approval
- Reason: Prompt queue packets are generated with token-budget strategy. Judge invocation was not started and still requires explicit user approval.

## Outputs

- Prompt queue manifest: `Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_invocation/judge_prompt_queue_manifest.jsonl`
- Prompt queue dir: `Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_invocation/prompt_queue`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_invocation/v3_oulad_action_evidence_token_budget_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_invocation/v3_oulad_action_evidence_token_budget_report.md`

## Issues

No issues found.

