# Trend Series Summarizer Spec

## Current Status
Status: implemented.

Internal strategy: `trend_series`.

Migrated tasks:

- `S-T01` - Score trend analysis.
- `A-G18` - Class performance trend.
- `A-G11` - Weekly engagement drop detection.

Code locations:

- `AIService/strategies/base.py`
  - dispatcher: `_build_task_aware_summary`
  - implementation: `_summarize_trend_series`
- `Backend/src/controllers/ai.controller.js`
  - forwards trend-series config fields
- `Backend/src/config/taskRegistry.json`
  - stores migrated task metadata

This spec documents current behavior only.

## Old Baseline Applied To This Type
Historical baseline: `baseline_first_20_rows`.

Baseline spec: `BASELINE_FIRST_20_ROWS_SPEC.md`.

For trend-series tasks, the historical baseline can omit late points, peak/trough points, major drops, or configured flags. It also makes the AI reason from row order instead of a sorted time-series contract.

## Purpose
`trend_series` summarizes one primary metric over a configured time/order column. It is used for single-series trends where the key evidence is first/last/peak/trough/overall change/largest adjacent change.

## Registry Metadata Contract
Required metadata:

```json
{
  "aiSummaryType": "trend_series",
  "aiTimeColumn": "...",
  "aiMetricColumn": "..."
}
```

Optional metadata:

```json
{
  "aiSecondaryMetricColumns": ["..."],
  "aiFlagColumns": ["..."],
  "aiActionColumns": ["..."],
  "aiLabelColumns": ["..."],
  "aiSortDirection": "asc|desc",
  "aiMaxPoints": 30
}
```

Current registry examples:

- `S-T01`: time `assessment_order`, metric `score_normalized`, flags `below_pass_threshold` and `below_target_threshold`; `pass_flag` is secondary evidence, not a risk flag.
- `A-G18`: time `assessment_order`, metric `class_avg_score`, secondary `pass_rate`, `completion_rate`, `submissions_count`.
- `A-G11`: time `week_number`, metric `week_total_clicks`, flagged points only from `is_drop_week`.

## DATA SUMMARY Shape
The output is a bounded JSON summary with this semantic shape:

```json
{
  "summary_type": "trend_series",
  "dataset_name": "...",
  "row_count": 0,
  "time_column": "...",
  "metric_column": "...",
  "point_count": 0,
  "first_point": {},
  "last_point": {},
  "peak": {},
  "trough": {},
  "overall_change": {},
  "largest_adjacent_drop": {},
  "largest_adjacent_rise": {},
  "flagged_points": [],
  "secondary_metric_evidence": {},
  "action_evidence": [],
  "summarization_warnings": []
}
```

## Behavior Contract
- Select the primary dataset using existing dataset selection logic.
- Validate configured time and metric columns.
- Parse numeric time and metric values.
- Skip invalid time/metric rows with warnings.
- Sort valid points by configured time column and sort direction.
- Compute first/last/peak/trough after sorting.
- Compute overall change.
- Compute largest adjacent drop and rise after sorting.
- Preserve configured secondary metrics and labels when present.
- Derive `flagged_points` only from configured flag columns whose values parse as true.
- Preserve and warn on unrecognized flag values instead of guessing.
- Include action evidence only from configured action columns.
- Cap emitted evidence using `aiMaxPoints` and shared dump guardrails.

## Known Limitations
- This summarizer describes one primary metric per summary.
- It does not infer risk semantics from non-flag columns.
- It does not treat `pass_flag` as risk evidence unless explicitly configured as a flag, which current `S-T01` metadata avoids.
- It does not perform causal analysis.

## Debug Commands
```powershell
python AIService/debug_ai_summary.py --task S-T01 --method task_aware_data_summarization
python AIService/debug_ai_summary.py --task A-G18 --method task_aware_data_summarization
python AIService/debug_ai_summary.py --task A-G11 --method task_aware_data_summarization
python AIService/debug_ai_summary.py --self-test-trend-series
```

## Acceptance Criteria
- `S-T01`, `A-G18`, and `A-G11` use `summary_type = "trend_series"`.
- Points are sorted by configured time/order column.
- First/last/peak/trough and largest adjacent changes are computed after sorting.
- `S-T01` does not treat `pass_flag` as a risk flag.
- `A-G18` preserves class performance secondary metrics.
- `A-G11` derives flagged points only from `is_drop_week`.
- Invalid values warn without crashing.
- No new top-level `AI_SUMMARY_METHOD` value is introduced.
- Unmigrated trend-like tasks continue to use internal `generic_fallback`.
