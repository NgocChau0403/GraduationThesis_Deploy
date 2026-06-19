# LLM Judge V2 Phase 6.3b Explanation Builder Report

- Generated at: 2026-06-19T05:56:29.983Z
- Status: PASS
- Evidence-ready records: 52
- Explanation-ready records: 52
- Failed records: 0
- Errors: 0
- Warnings: 0

## Mode Endpoints

- baseline_first_20_rows: http://localhost:8000
- task_aware_data_summarization: http://localhost:8000

## Gate Decision

- Current dataset slice complete: true
- Next dataset baseline allowed: true
- Aggregate baseline allowed: false
- Phase 6.4 judge input materializer allowed: false
- Judge invocation allowed: false
- Reason: Current dataset explanation slice is complete. Run the remaining dataset and build the 104-record baseline aggregate before judge input materialization.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":52} |
| Roles | {"admin":34,"student":18} |
| Explanation modes | {"baseline_first_20_rows":52} |
| Observed AI summary methods | {"baseline_first_20_rows":52} |
| Statuses | {"explanation_ready":52} |

## Outputs

- Explanation manifest: `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_manifest.jsonl`
- Explanation artifacts dir: `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_report.md`

## Issues

No issues found.
