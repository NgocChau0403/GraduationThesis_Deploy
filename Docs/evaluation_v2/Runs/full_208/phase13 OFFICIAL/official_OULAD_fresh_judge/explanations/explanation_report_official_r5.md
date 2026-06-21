# LLM Judge V2 Phase 6.3b Explanation Builder Report

- Generated at: 2026-06-21T20:43:20.831Z
- Status: PASS
- Evidence-ready records: 44
- Explanation-ready records: 44
- Failed records: 0
- Errors: 0
- Warnings: 0

## Mode Endpoints

- baseline_first_20_rows: http://localhost:8001
- task_aware_data_summarization: http://localhost:8000

## Gate Decision

- Current dataset slice complete: true
- Next dataset baseline allowed: false
- Aggregate baseline allowed: false
- Phase 6.4 judge input materializer allowed: false
- Judge invocation allowed: false
- Reason: Current dataset explanation slice is complete. Run the remaining dataset and build the 104-record baseline aggregate before judge input materialization.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_OULAD":44} |
| Roles | {"admin":30,"student":14} |
| Explanation modes | {"task_aware_data_summarization":44} |
| Observed AI summary methods | {"task_aware_data_summarization":44} |
| Statuses | {"explanation_ready":44} |

## Outputs

- Explanation manifest: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_manifest.jsonl`
- Explanation artifacts dir: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_artifacts`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_report_official_r5.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/explanations/explanation_report_official_r5.md`

## Issues

No issues found.

