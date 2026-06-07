# Phase 2 First Batch: `categorical_distribution`

## Summary
Implement only the first Phase 2 migration batch for AI prompt summarizers: `A-B02`, `A-B03`, and `A-G10`. Add one reusable registry-driven summarizer type, `categorical_distribution`, while preserving existing `A-G14` `trend_comparison` behavior and keeping all other tasks on `generic_fallback`.

## Key Changes

- Add registry metadata only for:
  - `A-B02` Completion / outcome summary
  - `A-B03` Engagement distribution
  - `A-G10` Consistency analysis across cohort

- Extend `ai_summary_config` end-to-end:
  - Backend forwards new categorical fields in snake_case.
  - `AISummaryConfig` accepts the new optional fields.
  - Base summarizer dispatcher routes `summary_type == "categorical_distribution"` to a new summarizer.

- Extend existing `debug_ai_summary.py`; do not create a second script.

## Registry Metadata

### `A-B02`
```json
{
  "aiSummaryType": "categorical_distribution",
  "aiCategoryColumn": "final_outcome",
  "aiCountColumn": "student_count",
  "aiPercentColumn": "pct_of_class",
  "aiFocusCategories": ["Fail", "Withdrawn"],
  "aiExpectedCategories": ["Distinction", "Pass", "Fail", "Withdrawn"],
  "aiSortBy": "student_count",
  "aiSortDirection": "desc"
}
```

### `A-B03`
```json
{
  "aiSummaryType": "categorical_distribution",
  "aiCategoryColumn": "study_effort_level",
  "aiCountColumn": "student_count",
  "aiPercentColumn": "pct_of_class",
  "aiMetricColumns": ["avg_engagement_score"],
  "aiFocusCategories": ["very_low", "low"],
  "aiCategoryOrder": ["very_low", "low", "medium", "high"],
  "aiExpectedCategories": ["very_low", "low", "medium", "high"]
}
```

### `A-G10`
```json
{
  "aiSummaryType": "categorical_distribution",
  "aiCategoryColumn": "consistency_level",
  "aiCountColumn": "student_count",
  "aiPercentColumn": "pct_students",
  "aiMetricColumns": ["avg_weekly_stddev", "avg_weekly_clicks", "avg_active_weeks"],
  "aiFocusCategories": ["low"],
  "aiCategoryOrder": ["high", "medium", "low"],
  "aiExpectedCategories": ["high", "medium", "low"]
}
```

## Implementation Details

- Update `Backend/src/controllers/ai.controller.js`:
  - Extend `buildAISummaryConfig(task)` to forward:
    - `category_column`
    - `count_column`
    - `percent_column`
    - `metric_columns`
    - `focus_categories`
    - `category_order`
    - `expected_categories`
    - `sort_by`
    - `sort_direction`
  - Preserve all existing A-G14 fields.

- Update `AIService/schemas.py`:
  - Extend `AISummaryConfig` with the same optional fields.
  - Keep old requests valid.

- Update `AIService/strategies/base.py`:
  - Dispatcher:
    - `trend_comparison` -> existing implementation
    - `categorical_distribution` -> new `_summarize_categorical_distribution(req)`
    - otherwise -> `generic_fallback`
  - New summary shape:
    - `summary_type`
    - `dataset_name`
    - `row_count`
    - `category_column`
    - `count_column`
    - `percent_column`
    - `total_count`
    - `category_distribution`
    - `largest_category`
    - `focus_categories`
    - `focus_total`
    - `missing_expected_categories`
    - `missing_focus_categories`
    - `metric_columns`
    - `metric_evidence_by_category`
    - `summarization_warnings`

- `focus_total` behavior:
  - Always emit stable format.
  - For `A-B02`, combine `Fail + Withdrawn`.
  - For `A-B03`, combine `very_low + low`.
  - For `A-G10`, include only `low`, still using the same object shape.

- Percent validation:
  - If percent total is between `99` and `101`, treat as rounding.
  - If outside that range, add a `summarization_warnings` entry.
  - Do not fail the summarizer because of percentage rounding.

- Semantic guardrail:
  - The summarizer must not write risk/concern implications itself.
  - It should emit evidence only, e.g. `focus_total`, `low_tail_count`, `low_tail_percent`, metrics.
  - The strategy prompt/model may interpret educational implications using task context.

## Debug And Tests

- Extend `AIService/debug_ai_summary.py`:
  - Support `--task A-B02`
  - Support `--task A-B03`
  - Support `--task A-G10`
  - Add `--self-test-categorical`
  - Keep existing `--self-test` and A-G14 tests passing.

- Categorical self-tests:
  - Required columns present.
  - Numeric strings parsed.
  - `category_order` preserved.
  - `expected_categories` reports missing categories.
  - `focus_total` computed correctly.
  - Missing focus category is reported.
  - Missing required columns returns warning and generic diagnostic sample.
  - Empty dataset does not crash.
  - Percent total `99..101` does not warn; far outside range warns.

- Verification commands:
  - JSON parse `taskRegistry.json`
  - `node --check Backend/src/controllers/ai.controller.js`
  - Python `py_compile` for changed AIService files
  - `debug_ai_summary.py --self-test`
  - `debug_ai_summary.py --self-test-categorical`
  - Actual SQL-output debug runs for `A-B02`, `A-B03`, `A-G10` if local DB is available
  - One unmigrated synthetic task to confirm `generic_fallback`
  - A-G14 debug run to confirm `trend_comparison` regression-free

## Acceptance Criteria

- Only `A-B02`, `A-B03`, and `A-G10` receive new Phase 2 metadata.
- `A-G14` output remains unchanged except shared helper behavior if unavoidable.
- All unmigrated tasks still use `generic_fallback`.
- `A-B02` summary includes all outcomes, `focus_total` for `Fail + Withdrawn`, and missing expected outcome warnings if applicable.
- `A-B03` summary preserves effort order and reports `very_low + low` as evidence, without labeling it as risk.
- `A-G10` summary preserves `high -> medium -> low` order and includes low consistency evidence metrics.
- Prompt summaries stay bounded and do not include arbitrary first-20-row slices.

## Risks And Rollback

- Risk: Categorical metadata typo causes misleading summary.
  - Mitigation: required-column validation and warning fallback.
- Risk: Percent columns differ in scale or rounding.
  - Mitigation: `99..101` tolerance and explicit warning outside range.
- Risk: Semantic overreach in low/focus categories.
  - Mitigation: summarizer outputs evidence only; no risk labels unless present in task fields.
- Rollback:
  - Remove new metadata from `A-B02`, `A-B03`, `A-G10`.
  - Remove dispatcher branch for `categorical_distribution` if needed.
  - Existing `generic_fallback` and `A-G14` `trend_comparison` remain sufficient.
