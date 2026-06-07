# Numeric Distribution Slice 2 Phase 2 Implementation + Self-Test Plan

## Summary
Implement only the internal `numeric_distribution` summarizer and its self-test.

Do not migrate `A-B01` in `Backend/src/config/taskRegistry.json` in this phase. Runtime verification may be reported, but registry migration and evidence logs remain separate phases.

The external top-level comparison remains:

```text
baseline_first_20_rows
vs
task_aware_data_summarization
```

## Previous Internal Baseline Preservation
The old/current internal behavior before the numeric distribution fix is:

```text
task_aware_data_summarization -> generic_fallback
```

This behavior must remain runnable after implementation. Only tasks explicitly configured with `aiSummaryType: "numeric_distribution"` should use the new summarizer.

## Implementation Scope
Expected changed files:

- `Docs/evaluation/ai_explanation_method/NUMERIC_DISTRIBUTION_SUMMARIZER_IMPLEMENTATION_PLAN.md`
- `AIService/schemas.py`
- `AIService/strategies/base.py`
- `AIService/debug_ai_summary.py`
- `Backend/src/controllers/ai.controller.js`

Do not edit:

- `Docs/evaluation/ai_explanation_method/NUMERIC_DISTRIBUTION_SUMMARIZER_SPEC.md`
- `Docs/evaluation/ai_explanation_method/TASK_AWARE_DATA_SUMMARIZATION_SPECS_AND_FIXES_PLAN.md`
- `Backend/src/config/taskRegistry.json`
- SQL/query files
- frontend/chart files
- evaluation logs
- `AI_SUMMARY_METHOD` values

Use existing `AISummaryConfig` and config-builder fields where available. Do not add duplicate fields with overlapping meaning.

## Numeric Distribution Contract
Add a task-aware dispatcher branch for configured `summary_type == "numeric_distribution"`.

The summary must include:

- `summary_type = "numeric_distribution"`
- `dataset_name`
- `row_count`
- `bin_column`
- `count_column`
- `percent_column`
- `bin_distribution`
- `total_count`
- `dominant_bin`
- `focus_bins`
- `focus_total`
- `threshold_summary`
- `missing_expected_bins`
- `metric_evidence_by_bin`
- `summarization_warnings`

Behavior:

- sort by explicit `bin_order` first;
- derive numeric range order when explicit order is absent;
- place `No score` last unless explicitly ordered;
- compute `dominant_bin` from count;
- compute `focus_total` from configured focus bins;
- compute `threshold_summary` from parseable numeric ranges;
- warn when focus bins and threshold-derived bins disagree;
- preserve `generic_fallback` for tasks without numeric distribution metadata.

## Test Plan
Add:

```powershell
python AIService/debug_ai_summary.py --self-test-numeric-distribution
```

Run existing regression checks:

```powershell
python AIService/debug_ai_summary.py --self-test
python AIService/debug_ai_summary.py --self-test-categorical
python AIService/debug_ai_summary.py --self-test-risk-flags
python AIService/debug_ai_summary.py --self-test-trend-series
python AIService/debug_ai_summary.py --self-test-ranking
python AIService/debug_ai_summary.py --self-test-numeric-distribution
```

Use bundled Python if `python` is unavailable.
