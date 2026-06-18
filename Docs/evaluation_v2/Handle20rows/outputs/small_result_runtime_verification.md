# Phase 4d Real-Task Runtime Verification

- Generated at: 2026-06-18T14:08:55.853Z
- Backend: http://localhost:4000
- Runtime path: `POST /api/analytics/run` then `POST /api/ai/explain`.
- Timeout fallback: when the Node proxy returns degraded at 15 seconds, the same real analytics payload is sent directly to `POST http://localhost:8000/explain` using task metadata from the runtime registry.
- Required mode: `task_aware_data_summarization`
- Result: PASS (4/4)

## Cases

| Dataset | Task | Phase 3 rows | Runtime rows | Verification transport | Input summary type | Small rule applied | Included rows | Degraded | Pass |
| --- | --- | ---: | ---: | --- | --- | --- | ---: | --- | --- |
| SAMPLE_UCI_POR | A-B01 | 10 | 10 | backend_proxy | full_rows_due_to_small_result | true | 10 | false | PASS |
| SAMPLE_UCI_POR | A-G02 | 649 | 649 | backend_proxy | correlation_evidence | false |  | false | PASS |
| SAMPLE_OULAD | A-B01 | 11 | 11 | backend_proxy | full_rows_due_to_small_result | true | 11 | false | PASS |
| SAMPLE_OULAD | A-S03 | 32 | 32 | backend_proxy | trend_series | false |  | false | PASS |

## Interpretation

For real query results with 20 rows or fewer, the runtime response must report `input_summary_type=full_rows_due_to_small_result`, apply the rule, and include every row.

For results above 20 rows, the runtime response must keep the task-specific summary type and report `small_result_full_rows_applied=false`.
