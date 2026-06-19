# LLM Judge V2 Phase 6.3b Explanation Builder Report

- Generated at: 2026-06-18T22:28:23.347Z
- Status: PASS
- Evidence-ready records: 12
- Explanation-ready records: 12
- Failed records: 0
- Errors: 0
- Warnings: 0

## Mode Endpoints

- baseline_first_20_rows: http://localhost:8000
- task_aware_data_summarization: http://localhost:8000

## Gate Decision

- Phase 6.4 judge input materializer allowed: true
- Judge invocation allowed: false
- Reason: All evidence-ready records have valid AI explanations with expected summary mode. Judge input materialization may run next.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":6,"SAMPLE_OULAD":6} |
| Roles | {"student":4,"admin":8} |
| Explanation modes | {"baseline_first_20_rows":12} |
| Observed AI summary methods | {"baseline_first_20_rows":12} |
| Statuses | {"explanation_ready":12} |

## Outputs

- Explanation manifest: `Docs/evaluation_v2/Runs/phase6_explanations_baseline/explanation_manifest.jsonl`
- Explanation artifacts dir: `Docs/evaluation_v2/Runs/phase6_explanations_baseline/explanation_artifacts`
- JSON report: `Docs/evaluation_v2/Runs/phase6_explanations_baseline/phase6_explanation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/phase6_explanations_baseline/phase6_explanation_report.md`

## Issues

No issues found.

