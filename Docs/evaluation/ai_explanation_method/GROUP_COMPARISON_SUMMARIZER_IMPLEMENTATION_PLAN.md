# Group Comparison Slice 3 Phase 2 Implementation + Self-Test Plan

## Summary
Implement only the internal `group_comparison` summarizer and its self-test under `task_aware_data_summarization`.

Do not migrate `A-G08` in `Backend/src/config/taskRegistry.json` in this phase, even if runtime verification passes. Runtime verification may be reported, but registry migration and evidence logs remain separate phases.

The external top-level comparison remains:

```text
baseline_first_20_rows
vs
task_aware_data_summarization
```

## Previous Internal Baseline Preservation
The old/current internal behavior before the group comparison fix is:

```text
task_aware_data_summarization -> generic_fallback
```

This behavior must remain runnable after implementation. Only tasks explicitly configured with `aiSummaryType: "group_comparison"` should use the new summarizer.

## Implementation Scope
Expected changed files:

- `Docs/evaluation/ai_explanation_method/GROUP_COMPARISON_SUMMARIZER_IMPLEMENTATION_PLAN.md`
- `AIService/schemas.py`
- `AIService/strategies/base.py`
- `AIService/debug_ai_summary.py`
- `Backend/src/controllers/ai.controller.js`

Do not edit:

- `Docs/evaluation/ai_explanation_method/GROUP_COMPARISON_SUMMARIZER_SPEC.md`
- `Docs/evaluation/ai_explanation_method/TASK_AWARE_DATA_SUMMARIZATION_SPECS_AND_FIXES_PLAN.md`
- `Backend/src/config/taskRegistry.json`
- SQL/query files
- frontend/chart files
- evaluation logs
- `AI_SUMMARY_METHOD` values

Use existing `AISummaryConfig` and config-builder fields where available. Do not add duplicate fields with overlapping meaning.

## Group Comparison Contract
Add a task-aware dispatcher branch for configured `summary_type == "group_comparison"`.

The summary must include:

- `summary_type = "group_comparison"`
- `dataset_name`
- `row_count`
- `group_column`
- `metric_column`
- `count_column`
- `gap_column`
- `group_metrics`
- `gaps`
- `dominant_group`
- `weakest_group`
- `missing_groups`
- `low_count_warnings`
- `fairness_warnings`
- `causal_claim_allowed = false`
- `summarization_warnings`

Behavior:

- preserve `generic_fallback` for tasks without group comparison metadata;
- parse numeric strings for count, metric, gap, and secondary metric columns;
- preserve denominators in `group_metrics`;
- compute `dominant_group` from count only;
- compute `weakest_group` from explicit gap when configured, otherwise from lowest primary metric, with an explicit `basis`;
- use `aiGapColumn` when configured and derive cohort-relative gaps only when safe;
- emit low-count warnings using `aiMinimumReliableCount`;
- emit missing group warnings for configured target/comparison/expected groups;
- always set `causal_claim_allowed = false`;
- emit a generic fairness warning when grouping context is ambiguous.

## Runtime Gate
Before future registry migration, `A-G08` runtime output columns may be verified from the analytics path.

Verification target columns:

```text
group_value
student_count
avg_score
avg_engagement_score
score_vs_cohort
```

For this phase:

- runtime verification may be attempted and reported;
- even if `A-G08` runtime verification passes, only report the result;
- do not edit `Backend/src/config/taskRegistry.json` under any circumstance;
- if runtime cannot be verified, continue with implementation plus mock self-test only;
- registry migration and evidence logs must be separate later phases.

## Test Plan
Add:

```powershell
python AIService/debug_ai_summary.py --self-test-group-comparison
```

Run existing regression checks:

```powershell
python AIService/debug_ai_summary.py --self-test
python AIService/debug_ai_summary.py --self-test-categorical
python AIService/debug_ai_summary.py --self-test-risk-flags
python AIService/debug_ai_summary.py --self-test-trend-series
python AIService/debug_ai_summary.py --self-test-ranking
python AIService/debug_ai_summary.py --self-test-numeric-distribution
python AIService/debug_ai_summary.py --self-test-group-comparison
```

Use bundled Python if `python` is unavailable.
