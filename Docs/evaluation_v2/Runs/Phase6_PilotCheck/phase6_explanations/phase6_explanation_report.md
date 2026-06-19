# LLM Judge V2 Phase 6.3b Explanation Builder Report

- Generated at: 2026-06-18T22:22:01.815Z
- Status: FAIL
- Evidence-ready records: 24
- Explanation-ready records: 11
- Failed records: 13
- Errors: 13
- Warnings: 0

## Mode Endpoints

- baseline_first_20_rows: http://localhost:8000
- task_aware_data_summarization: http://localhost:8000

## Gate Decision

- Phase 6.4 judge input materializer allowed: false
- Judge invocation allowed: false
- Reason: Explanation builder found failed records or mode mismatches. Fix before judge input materialization.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":12,"SAMPLE_OULAD":12} |
| Roles | {"student":8,"admin":16} |
| Explanation modes | {"baseline_first_20_rows":12,"task_aware_data_summarization":12} |
| Observed AI summary methods | {"task_aware_data_summarization":24} |
| Statuses | {"failed":13,"explanation_ready":11} |

## Outputs

- Explanation manifest: `Docs/evaluation_v2/Runs/phase6_explanations/explanation_manifest.jsonl`
- Explanation artifacts dir: `Docs/evaluation_v2/Runs/phase6_explanations/explanation_artifacts`
- JSON report: `Docs/evaluation_v2/Runs/phase6_explanations/phase6_explanation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/phase6_explanations/phase6_explanation_report.md`

## Issues

| Severity | Code | Record | Message |
| --- | --- | --- | --- |
| error | ai_summary_method_mismatch | SAMPLE_UCI_POR__S-T01__baseline_first_20_rows | Observed AI summary method does not match planned explanation_mode. |
| error | ai_summary_method_mismatch | SAMPLE_UCI_POR__S-T04__baseline_first_20_rows | Observed AI summary method does not match planned explanation_mode. |
| error | ai_summary_method_mismatch | SAMPLE_UCI_POR__S-T09__baseline_first_20_rows | Observed AI summary method does not match planned explanation_mode. |
| error | ai_summary_method_mismatch | SAMPLE_UCI_POR__A-C04__baseline_first_20_rows | Observed AI summary method does not match planned explanation_mode. |
| error | ai_summary_method_mismatch | SAMPLE_UCI_POR__A-G02__baseline_first_20_rows | Observed AI summary method does not match planned explanation_mode. |
| error | ai_summary_method_mismatch | SAMPLE_UCI_POR__A-G13__baseline_first_20_rows | Observed AI summary method does not match planned explanation_mode. |
| error | ai_summary_method_mismatch | SAMPLE_OULAD__S-T05__baseline_first_20_rows | Observed AI summary method does not match planned explanation_mode. |
| error | ai_summary_method_mismatch | SAMPLE_OULAD__A-G07__baseline_first_20_rows | Observed AI summary method does not match planned explanation_mode. |
| error | ai_summary_method_mismatch | SAMPLE_OULAD__A-G11__baseline_first_20_rows | Observed AI summary method does not match planned explanation_mode. |
| error | ai_explain_degraded | SAMPLE_OULAD__A-G11__task_aware_data_summarization | AI explain returned degraded=true. |
| error | ai_summary_method_mismatch | SAMPLE_OULAD__A-G15__baseline_first_20_rows | Observed AI summary method does not match planned explanation_mode. |
| error | ai_summary_method_mismatch | SAMPLE_OULAD__A-G16__baseline_first_20_rows | Observed AI summary method does not match planned explanation_mode. |
| error | ai_summary_method_mismatch | SAMPLE_OULAD__A-S08__baseline_first_20_rows | Observed AI summary method does not match planned explanation_mode. |

