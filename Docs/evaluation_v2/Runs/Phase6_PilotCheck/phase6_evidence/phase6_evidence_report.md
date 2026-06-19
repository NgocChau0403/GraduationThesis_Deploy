# LLM Judge V2 Phase 6.3 Evidence Builder Report

- Generated at: 2026-06-18T22:06:47.670Z
- Status: PASS
- Backend: http://localhost:4000
- Planned records: 24
- Evidence-ready records: 24
- Failed records: 0
- Errors: 0
- Warnings: 0

## Gate Decision

- Phase 6.4 judge input materializer allowed: true
- Judge invocation allowed: false
- Official full evaluation allowed: false
- Reason: All planned records have full-query evidence artifacts. Judge input materialization may run next, but judge invocation remains disabled.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":12,"SAMPLE_OULAD":12} |
| Row-count buckets | {"<=20":12,">20":12} |
| Evidence access paths | {"direct_embedding":12,"deterministic_artifact_retrieval":12} |
| Roles | {"student":8,"admin":16} |
| Explanation modes | {"baseline_first_20_rows":12,"task_aware_data_summarization":12} |
| Statuses | {"evidence_ready":24} |

## Outputs

- Evidence manifest: `Docs/evaluation_v2/Runs/phase6_evidence/evidence_manifest.jsonl`
- Full-query artifacts dir: `Docs/evaluation_v2/Runs/phase6_evidence/full_query_artifacts`
- JSON report: `Docs/evaluation_v2/Runs/phase6_evidence/phase6_evidence_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/phase6_evidence/phase6_evidence_report.md`

## Issues

No issues found.

