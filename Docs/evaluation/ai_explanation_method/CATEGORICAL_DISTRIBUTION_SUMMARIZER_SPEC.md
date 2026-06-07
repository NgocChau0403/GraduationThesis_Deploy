# Categorical Distribution Summarizer Spec

## Current Status
Status: implemented.

Internal strategy: `categorical_distribution`.

Migrated tasks:

- `A-B02` - Completion / outcome summary.
- `A-B03` - Engagement distribution.
- `A-G10` - Consistency analysis across cohort.

Code locations:

- `AIService/strategies/base.py`
  - dispatcher: `_build_task_aware_summary`
  - implementation: `_summarize_categorical_distribution`
- `Backend/src/controllers/ai.controller.js`
  - forwards category summary config fields
- `Backend/src/config/taskRegistry.json`
  - stores migrated task metadata

This spec documents current behavior only.

## Old Baseline Applied To This Type
Historical baseline: `baseline_first_20_rows`.

Baseline spec: `BASELINE_FIRST_20_ROWS_SPEC.md`.

For categorical distribution tasks, the historical baseline can omit important categories if they appear after the first row slice. It also gives the model row samples rather than an explicit distribution, so the model may miss focus categories, tail categories, dominant categories, or percent-total issues.

## Purpose
`categorical_distribution` summarizes categorical/bin distributions using configured category, count, percent, and metric columns. It is used when the important evidence is the distribution across categories rather than arbitrary row order.

## Registry Metadata Contract
Required metadata:

```json
{
  "aiSummaryType": "categorical_distribution",
  "aiCategoryColumn": "...",
  "aiCountColumn": "..."
}
```

Optional metadata:

```json
{
  "aiPercentColumn": "...",
  "aiMetricColumns": ["..."],
  "aiFocusCategories": ["..."],
  "aiCategoryOrder": ["..."],
  "aiExpectedCategories": ["..."],
  "aiSortBy": "...",
  "aiSortDirection": "asc|desc"
}
```

Current registry examples:

- `A-B02`: `final_outcome`, `student_count`, `pct_of_class`, focus `Fail + Withdrawn`.
- `A-B03`: `study_effort_level`, ordered `very_low -> low -> medium -> high`, focus `very_low + low`.
- `A-G10`: `consistency_level`, ordered `high -> medium -> low`, focus `low`.

## DATA SUMMARY Shape
The output is a bounded JSON summary with this semantic shape:

```json
{
  "summary_type": "categorical_distribution",
  "dataset_name": "...",
  "row_count": 0,
  "category_column": "...",
  "count_column": "...",
  "percent_column": "...",
  "total_count": 0,
  "category_distribution": [],
  "largest_category": {},
  "focus_categories": [],
  "focus_total": {},
  "missing_expected_categories": [],
  "missing_focus_categories": [],
  "metric_columns": [],
  "metric_evidence_by_category": {},
  "summarization_warnings": []
}
```

## Behavior Contract
- Select the primary dataset using existing dataset selection logic.
- Validate category and count columns.
- Parse numeric strings in count, percent, and configured metric columns.
- Preserve `aiCategoryOrder` when configured.
- Otherwise sort by configured `aiSortBy` and `aiSortDirection` when present.
- Emit all available categories within bounded output.
- Compute `largest_category`.
- Compute `focus_total` from `aiFocusCategories`.
- Report missing expected categories.
- Report missing focus categories.
- Validate percent totals with rounding tolerance.
- Emit evidence only; do not label a category as risk unless that label exists in data or task context.

## Known Limitations
- It summarizes categorical or pre-binned data, not raw numeric histograms.
- Numeric distribution should use a future `numeric_distribution` internal summarizer.
- It does not infer risk meaning from category names by itself.
- Percent validation depends on the configured percent column scale.

## Debug Commands
```powershell
python AIService/debug_ai_summary.py --task A-B02 --method task_aware_data_summarization
python AIService/debug_ai_summary.py --task A-B03 --method task_aware_data_summarization
python AIService/debug_ai_summary.py --task A-G10 --method task_aware_data_summarization
python AIService/debug_ai_summary.py --self-test-categorical
```

## Acceptance Criteria
- `A-B02`, `A-B03`, and `A-G10` use `summary_type = "categorical_distribution"`.
- Category order is preserved when configured.
- Focus totals are computed from configured focus categories.
- Missing expected or focus categories are reported.
- Percent-total warnings are emitted only when outside tolerance.
- The summarizer does not invent risk labels or recommendations.
- No new top-level `AI_SUMMARY_METHOD` value is introduced.
- Unmigrated tasks continue to use internal `generic_fallback`.
