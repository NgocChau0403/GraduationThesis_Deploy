# LLM Judge V2 Phase 6.3b Explanation Builder Report

- Generated at: 2026-06-19T06:55:40.998Z
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
- Next dataset baseline allowed: false
- Aggregate baseline allowed: true
- Phase 6.4 judge input materializer allowed: false
- Judge invocation allowed: false
- Reason: Both baseline dataset slices pass. Build the 104-record baseline aggregate next; judge input materialization remains disabled.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_OULAD":52} |
| Roles | {"admin":34,"student":18} |
| Explanation modes | {"baseline_first_20_rows":52} |
| Observed AI summary methods | {"baseline_first_20_rows":52} |
| Statuses | {"explanation_ready":52} |

## Outputs

- Explanation manifest: `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_manifest.jsonl`
- Explanation artifacts dir: `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_report.md`

## Issues

No issues found.

