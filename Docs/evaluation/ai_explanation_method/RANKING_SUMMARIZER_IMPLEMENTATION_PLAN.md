# Ranking Slice 1 Phase 2 Implementation + Self-Test Plan

## Summary
Implement only the internal `ranking` summarizer and its self-test under `task_aware_data_summarization`.

No new top-level `AI_SUMMARY_METHOD` value is introduced. The thesis-level comparison remains:

```text
baseline_first_20_rows
vs
task_aware_data_summarization
```

## Runtime Verification Gate
Before adding `aiSummaryType: "ranking"` metadata to `A-G15`, verify runtime output columns from the actual analytics path.

Verification must confirm these columns are present:

- `student_id`
- `at_risk_score`
- `at_risk_label`
- `avg_score`
- `flag_low_score`
- `flag_repeated`
- `flag_low_engagement`
- `flag_low_punctuality`
- `flag_neg_trend`

If backend/database runtime verification is unavailable, do not edit `Backend/src/config/taskRegistry.json`.

## Previous Internal Baseline Preservation
The old/current internal behavior before the ranking fix is:

```text
task_aware_data_summarization -> generic_fallback
```

This behavior must remain runnable after implementation.

Only tasks explicitly configured with `aiSummaryType: "ranking"` should use the new internal ranking summarizer. Tasks without that metadata must continue to use `generic_fallback`.

Ranking-specific internal comparison can be documented as:

```text
task_aware_data_summarization -> generic_fallback
vs
task_aware_data_summarization -> ranking
```

This internal comparison is documentation/evidence only and must not introduce a new top-level method mode.

## Implementation Scope
Expected changed files:

- `Docs/evaluation/ai_explanation_method/RANKING_SUMMARIZER_IMPLEMENTATION_PLAN.md`
- `AIService/schemas.py`
- `AIService/strategies/base.py`
- `AIService/debug_ai_summary.py`
- `Backend/src/controllers/ai.controller.js` only if ranking config fields are not already forwarded

Do not change:

- `Backend/src/config/taskRegistry.json`
- `Frontend/*`
- SQL/query files
- evaluation logs
- `AI_SUMMARY_METHOD` values

## Ranking Contract
The dispatcher should use the existing `AISummaryConfig` field currently used for summary strategy selection. Do not introduce a duplicate config field.

Configured ranking summaries must return:

- `summary_type = "ranking"`
- `dataset_name`
- `row_count`
- `entity_column`
- `metric_column`
- `sort_direction`
- `top_items`
- `bottom_items`
- `median_item`
- `metric_stats`
- `tie_warnings`
- `flag_evidence`
- `summarization_warnings`

The summarizer must validate required columns, parse numeric metric values including numeric strings, sort by configured direction, select bounded top/bottom items, compute median/statistics, warn on ties around selection boundaries, and preserve only configured label/secondary metric/flag columns.

Sensitive demographic columns such as `gender`, `age_group`, and `region` must not be used as intervention rationale or explanatory labels unless explicitly configured in a later fairness-aware slice.

## Self-Test Plan
Add `--self-test-ranking` to `AIService/debug_ai_summary.py`.

The mock self-test must verify:

- unsorted input selects correct top and bottom students
- numeric string metrics are parsed
- descending sort works for `at_risk_score`
- top/bottom caps are respected
- median item and metric stats are produced
- ties around top/bottom boundaries are detected
- missing entity and metric columns return stable warnings
- configured flag evidence is preserved
- demographic columns in mock input are not emitted in `top_items` or `bottom_items` unless explicitly configured
- request without `aiSummaryType: "ranking"` still uses `generic_fallback`
- request with ranking config uses the internal ranking summarizer
- no new top-level summary method is introduced

## Acceptance Criteria
- `ranking` is implemented as an internal strategy only.
- `--self-test-ranking` passes.
- Existing Group A self-tests still pass.
- Existing `generic_fallback` remains runnable.
- Tasks without `aiSummaryType: "ranking"` continue to use `generic_fallback`.
- `Backend/src/config/taskRegistry.json` remains unchanged in this phase.
- No SQL, frontend, chart, evaluation-log, or `AI_SUMMARY_METHOD` changes are made.
