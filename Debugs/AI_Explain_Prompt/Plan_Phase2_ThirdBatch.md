# Phase 2 Third Batch Plan: `trend_series`

## Summary
Implement one reusable registry-driven `trend_series` summarizer for only:
- `S-T01` Score trend analysis
- `A-G18` Class performance trend
- `A-G11` Weekly engagement drop detection

Do not migrate any other task. Preserve frontend UI, chart rendering, SQL, `trend_comparison`, `categorical_distribution`, `risk_flags`, and `generic_fallback`.

## Key Changes
- Add `trend_series` metadata only to `S-T01`, `A-G18`, and `A-G11`.
- Extend backend `ai_summary_config` and Python `AISummaryConfig` with:
  - `secondary_metric_columns`
  - `flag_columns`
  - `action_columns`
  - `label_columns`
  - `max_points`
- Reuse existing `time_column`, `metric_column`, and `sort_direction`.
- Add dispatcher branch:
  - `trend_comparison` unchanged
  - `categorical_distribution` unchanged
  - `risk_flags` unchanged
  - `trend_series` -> `_summarize_trend_series(req)`
  - otherwise `generic_fallback`

## Registry Metadata

### `S-T01`
```json
{
  "aiSummaryType": "trend_series",
  "aiTimeColumn": "assessment_order",
  "aiMetricColumn": "score_normalized",
  "aiSecondaryMetricColumns": ["class_avg_score", "score_vs_class_avg", "performance_trend", "pass_flag"],
  "aiFlagColumns": ["below_pass_threshold", "below_target_threshold"],
  "aiActionColumns": ["support_level", "recommended_action"],
  "aiLabelColumns": ["assessment_name", "assessment_type", "week_of_class"],
  "aiSortDirection": "asc",
  "aiMaxPoints": 30
}
```
Important: do not put `pass_flag` in `aiFlagColumns`; true means passing, not risk.

### `A-G18`
```json
{
  "aiSummaryType": "trend_series",
  "aiTimeColumn": "assessment_order",
  "aiMetricColumn": "class_avg_score",
  "aiSecondaryMetricColumns": ["pass_rate", "completion_rate", "submissions_count"],
  "aiFlagColumns": [],
  "aiActionColumns": [],
  "aiLabelColumns": ["assessment_name", "assessment_type", "week_of_class"],
  "aiSortDirection": "asc",
  "aiMaxPoints": 30
}
```

### `A-G11`
```json
{
  "aiSummaryType": "trend_series",
  "aiTimeColumn": "week_number",
  "aiMetricColumn": "week_total_clicks",
  "aiSecondaryMetricColumns": ["cohort_avg_clicks", "rolling_3wk_avg", "drop_pct"],
  "aiFlagColumns": ["is_drop_week"],
  "aiActionColumns": [],
  "aiLabelColumns": [],
  "aiSortDirection": "asc",
  "aiMaxPoints": 40
}
```
Important: `flagged_points` must come only from `is_drop_week`.

## Summarizer Behavior
- Select primary dataset using existing dataset selection logic.
- Validate required config and columns: `time_column`, `metric_column`.
- Missing config/columns returns stable warning plus generic diagnostic sample.
- Parse numeric time and metric values; skip invalid rows with warning.
- Sort by numeric time using `sort_direction`.
- Compute from valid sorted points:
  - `point_count`
  - `first_point`
  - `last_point`
  - `peak`
  - `trough`
  - `overall_change` with `delta` and `percent_change` when possible
  - `largest_adjacent_drop`
  - `largest_adjacent_rise`
- Preserve configured secondary metrics, labels, flags, and actions when present.
- Do not infer threshold meaning unless a configured returned flag column already encodes it.
- Do not invent action or intervention labels.
- `flagged_points` are derived only from configured `flag_columns` whose values parse as true.
- Unrecognized flag values are preserved and warned; not guessed.
- `action_evidence` includes actions from flagged points first, then latest action if present, deduplicated by action string.
- Cap emitted point/evidence lists by `max_points`; warn if capped.
- Final summary remains bounded by `_dump_summary`.

## DATA SUMMARY Shape
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

## Debug And Tests
- Extend existing `AIService/debug_ai_summary.py`; do not create another script.
- Add support for:
  - `--task S-T01`
  - `--task A-G18`
  - `--task A-G11`
  - `--self-test-trend-series`
- Keep existing self-tests for generic, categorical, risk flags, and A-G14.
- Trend-series self-tests cover:
  - numeric strings parse correctly
  - unsorted input sorts by configured time column
  - first/last/peak/trough after sorting
  - overall change
  - largest adjacent rise/drop after sorting
  - `flagged_points` only from true configured flags
  - unrecognized flag values warn and are not guessed
  - action columns included only when present
  - missing required column returns warning plus generic diagnostic sample
  - invalid time/metric rows skipped with warning
  - max point cap warning
  - empty dataset no crash

## Verification Commands
Run:
```powershell
node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/taskRegistry.json','utf8'))"
node --check Backend/src/controllers/ai.controller.js
python -m py_compile AIService/schemas.py AIService/strategies/base.py AIService/debug_ai_summary.py
python AIService/debug_ai_summary.py --self-test
python AIService/debug_ai_summary.py --self-test-categorical
python AIService/debug_ai_summary.py --self-test-risk-flags
python AIService/debug_ai_summary.py --self-test-trend-series
python AIService/debug_ai_summary.py --task S-T01
python AIService/debug_ai_summary.py --task A-G18
python AIService/debug_ai_summary.py --task A-G11
python AIService/debug_ai_summary.py --task A-G14
python AIService/debug_ai_summary.py --task A-B02
python AIService/debug_ai_summary.py --task S-T04
python AIService/debug_ai_summary.py --task A-B04 --input-json -
```

## Acceptance Criteria
- Only `S-T01`, `A-G18`, and `A-G11` receive `aiSummaryType: "trend_series"`.
- `A-G14` still uses `trend_comparison`.
- `A-B02`, `A-B03`, `A-G10` still use `categorical_distribution`.
- `S-T04`, `A-S04` still use `risk_flags`.
- All unmigrated tasks still use `generic_fallback`.
- `S-T01` sorts by `assessment_order` and does not treat `pass_flag` as a risk flag.
- `A-G18` sorts by `assessment_order` and preserves `pass_rate`/`completion_rate`.
- `A-G11` sorts by `week_number` and derives `flagged_points` only from `is_drop_week`.
- Largest adjacent rise/drop are computed after sorting.
- Prompt summaries stay bounded.

## Rollback
- Remove `trend_series` metadata from `S-T01`, `A-G18`, and `A-G11`.
- Remove trend-series config fields from backend forwarding/schema if needed.
- Remove dispatcher branch and `_summarize_trend_series`.
- Existing summarizers remain unchanged and sufficient.
