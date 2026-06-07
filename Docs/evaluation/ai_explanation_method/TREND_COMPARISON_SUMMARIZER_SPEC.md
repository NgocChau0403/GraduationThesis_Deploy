# Trend Comparison Summarizer Spec

## Current Status
Status: implemented.

Internal strategy: `trend_comparison`.

Migrated task:

- `A-G14` - Early withdrawal signal analysis.

Code locations:

- `AIService/strategies/base.py`
  - dispatcher: `_build_task_aware_summary`
  - implementation: `_summarize_trend_comparison`
- `Backend/src/controllers/ai.controller.js`
  - forwards `ai_summary_config`
- `Backend/src/config/taskRegistry.json`
  - stores `A-G14` `aiSummaryType` metadata

This spec documents current behavior only. It does not introduce a new top-level summary mode or migrate additional tasks.

## Old Baseline Applied To This Type
Historical baseline: `baseline_first_20_rows`.

Baseline spec: `BASELINE_FIRST_20_ROWS_SPEC.md`.

For trend comparison tasks, the old baseline serializes only the first `max_rows` rows from each dataset. If SQL output is ordered by group before time, for example `ORDER BY final_outcome, week_number`, the first rows can belong to a non-target group such as `Distinction` while the task asks about `Withdrawn`.

This can make the AI explanation numerically grounded but analytically wrong: values are real, but they describe the wrong group or omit the target trend.

## Purpose
`trend_comparison` summarizes one target group over time and compares it with configured comparison groups. It is intended for multi-group time-series tasks where the task question depends on a specific target group.

For `A-G14`, the task asks when engagement collapsed for withdrawn students and how that compares with passing students.

## Registry Metadata Contract
Required metadata:

```json
{
  "aiSummaryType": "trend_comparison",
  "aiTargetGroup": "Withdrawn",
  "aiComparisonGroups": ["Pass", "Distinction"],
  "aiTimeColumn": "week_number",
  "aiMetricColumn": "avg_clicks",
  "aiGroupColumn": "final_outcome"
}
```

Optional reliability metadata:

```json
{
  "aiReliabilityColumn": "student_count",
  "aiMinimumReliableCount": 10
}
```

Backend forwards these fields to Python as `ai_summary_config`.

## DATA SUMMARY Shape
The output is a bounded JSON summary with this semantic shape:

```json
{
  "summary_type": "trend_comparison",
  "dataset_name": "...",
  "row_count": 0,
  "target_group": "Withdrawn",
  "comparison_groups": ["Pass", "Distinction"],
  "time_column": "week_number",
  "metric_column": "avg_clicks",
  "group_column": "final_outcome",
  "target_trend": {
    "point_count": 0,
    "first_point": {},
    "last_point": {},
    "peak": {},
    "trough": {},
    "largest_adjacent_drop": {},
    "largest_adjacent_rise": {},
    "largest_reliable_adjacent_drop": {}
  },
  "comparison_trends": [],
  "reliability_warnings": [],
  "summarization_warnings": []
}
```

Exact keys may include additional diagnostics, but the summary must preserve the target/comparison contract above.

## Behavior Contract
- Select the primary dataset using the existing dataset selection helper.
- Validate configured group, time, and metric columns.
- Group rows by `aiGroupColumn`.
- Sort each group by numeric `aiTimeColumn`.
- Parse numeric strings for time, metric, and reliability values.
- Compute target group first/last/peak/trough/largest adjacent drop/largest adjacent rise after sorting.
- Compute `largest_reliable_adjacent_drop` using `aiReliabilityColumn` and `aiMinimumReliableCount` when configured.
- Emit compact first/last/peak/trough/change evidence for comparison groups.
- Warn when target group or comparison groups are missing.
- Warn when reliability counts are below threshold.
- Keep output bounded by the shared dump guardrail.

## Known Limitations
- This summarizer assumes one primary group column and one primary metric column.
- It does not perform causal analysis; it only summarizes evidence.
- It does not create comparison groups that are absent from SQL output.
- Reliability checks are only as good as the configured reliability column.

## Debug Commands
```powershell
python AIService/debug_ai_summary.py --task A-G14 --method task_aware_data_summarization
python AIService/debug_ai_summary.py --task A-G14 --method baseline_first_20_rows
python AIService/debug_ai_summary.py --task A-G14 --compare-methods --write-log
python AIService/debug_ai_summary.py --self-test
```

## Acceptance Criteria
- `A-G14` uses `summary_type = "trend_comparison"` under `task_aware_data_summarization`.
- The summary includes `target_group = "Withdrawn"`.
- The summary includes configured comparison groups when present.
- The target trend is sorted by `week_number`, not original row order.
- Largest drop/rise is computed after sorting.
- Low-count weeks are not used as strong evidence without reliability warnings.
- No new top-level `AI_SUMMARY_METHOD` value is introduced.
- Chart rendering, SQL, and frontend behavior are unchanged.
