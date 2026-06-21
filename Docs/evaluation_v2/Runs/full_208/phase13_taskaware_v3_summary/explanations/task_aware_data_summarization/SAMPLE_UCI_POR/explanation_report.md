# LLM Judge V2 Phase 6.3b Explanation Builder Report

- Generated at: 2026-06-20T14:35:01.537Z
- Status: PASS
- Evidence-ready records: 52
- Explanation-ready records: 52
- Failed records: 0
- Errors: 0
- Warnings: 0

## Mode Endpoints

- baseline_first_20_rows: http://localhost:8001
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
| Explanation modes | {"task_aware_data_summarization":52} |
| Observed AI summary methods | {"task_aware_data_summarization":52} |
| Statuses | {"explanation_ready":52} |

## Outputs

- Explanation manifest: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_manifest.jsonl`
- Explanation artifacts dir: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_report.md`

## Issues

No issues found.

