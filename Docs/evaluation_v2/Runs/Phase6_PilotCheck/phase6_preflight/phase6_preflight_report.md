# LLM Judge V2 Phase 6.1-6.2 Preflight Report

- Generated at: 2026-06-18T22:06:38.730Z
- Status: PASS
- Primary cases: 12
- Expanded planned records: 24
- Expected judge records: 24
- Errors: 0
- Warnings: 0

## Gate Decision

- Phase 6.3 evidence builder allowed: true
- Judge invocation allowed: false
- Official full evaluation allowed: false
- Reason: Preflight passed for contract verification and pilot case expansion. Evidence builder may run next, but judge invocation remains disabled.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":6,"SAMPLE_OULAD":6} |
| Row-count buckets | {"<=20":6,">20":6} |
| Evidence access paths | {"direct_embedding":6,"deterministic_artifact_retrieval":6} |
| Roles | {"student":4,"admin":8} |
| Explanation modes | {"baseline_first_20_rows":12,"task_aware_data_summarization":12} |

## Outputs

- Planned records: `Docs/evaluation_v2/Runs/phase6_preflight/planned_records.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/phase6_preflight/phase6_preflight_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/phase6_preflight/phase6_preflight_report.md`

## Issues

No issues found.

