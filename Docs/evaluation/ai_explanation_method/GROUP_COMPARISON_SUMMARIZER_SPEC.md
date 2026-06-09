# Group Comparison Summarizer Spec

## Implementation Status
Status: proposed / not implemented yet.

This spec is a contract for a future internal `group_comparison` summarizer. This phase is documentation-only and does not modify code, registry metadata, SQL, frontend, roadmap, evaluation logs, or `AI_SUMMARY_METHOD` values.

Implementation, runtime verification, registry migration, and evidence generation must be separate follow-up phases.

## Top-Level Method Boundary
The external thesis comparison remains:

```text
baseline_first_20_rows
vs
task_aware_data_summarization
```

`group_comparison` will be an internal strategy inside `task_aware_data_summarization`, not a new top-level mode. Do not add modes such as `group_comparison_old`, `group_comparison_new`, or any additional `AI_SUMMARY_METHOD` value.

## Representative Task: A-G08
Initial representative task:

- `A-G08` - Background group performance & engagement profile.

Current task registry facts from `Backend/src/config/taskRegistry.json`:

- `taskName`: `Background group performance & engagement profile`
- `explanation_strategy`: `comparison`
- prompt intent: compare group-level `avg_score` and `avg_engagement_score` to cohort average;
- safety hint: avoid causal claims;
- current `aiSummaryType`: not configured.

Current previous internal behavior:

```text
task_aware_data_summarization -> generic_fallback
```

Historical baseline remains:

```text
baseline_first_20_rows
```

## Why Generic Fallback Is Insufficient
`generic_fallback` is safer than the historical first-20-row baseline, but it is not group-comparison aware.

For group comparison tasks, the AI needs a stable contract for:

- group-level metrics;
- denominators for each group;
- explicit or derived gaps from cohort or comparison groups;
- low-count reliability warnings;
- missing expected, target, or comparison groups;
- fairness-sensitive framing when groups are background or demographic-like.

Without a group comparison summary, prompt evidence can still be too row-sample oriented. It may expose rows without reliably preserving denominators, overstate gaps from small groups, compare the wrong groups, or imply that group membership causes performance differences.

## Relationship To Categorical/Numeric Distribution
`categorical_distribution`, `numeric_distribution`, and `group_comparison` are intentionally separate internal strategies.

- `categorical_distribution`: category counts or proportions, often outcome, label, or level distributions.
- `numeric_distribution`: ordered numeric bins or ranges representing a numeric variable.
- `group_comparison`: group-level metric comparison with denominators and gaps.

`A-G08` belongs to `group_comparison` because each row represents a background group with metrics such as `avg_score`, `avg_engagement_score`, `student_count`, and `score_vs_cohort`.

`A-G12` remains a follow-up candidate because it is a group x outcome table. Its row shape is closer to a stacked categorical distribution and should not be migrated in the first `group_comparison` slice.

## A-G08 Output Column Verification
The SQL-defined columns are confirmed from registry/query definition, not from live runtime execution in this phase.

SQL-defined expected columns:

- `group_value`
- `student_count`
- `avg_score`
- `avg_engagement_score`
- `score_vs_cohort`

A-G08 runtime output columns require verification before registry migration.

If runtime output differs from the SQL definition, implementation metadata must use the runtime output column names and the discrepancy must be noted in the implementation or migration task.

## Proposed Metadata Contract
Initial metadata proposal for `A-G08`, using SQL-defined columns:

```json
{
  "aiSummaryType": "group_comparison",
  "aiGroupColumn": "group_value",
  "aiMetricColumn": "avg_score",
  "aiCountColumn": "student_count",
  "aiMetricColumns": ["avg_engagement_score"],
  "aiGapColumn": "score_vs_cohort",
  "aiExpectedGroups": [],
  "aiTargetGroup": null,
  "aiComparisonGroups": [],
  "aiSortBy": "score_vs_cohort",
  "aiSortDirection": "asc",
  "aiMinimumReliableCount": 10,
  "aiTopK": 10,
  "aiBottomK": 5
}
```

`aiExpectedGroups` is optional. If it is empty or omitted, `missing_groups` reports only missing configured `aiTargetGroup` and `aiComparisonGroups`.

The first `A-G08` migration may leave `aiExpectedGroups` empty if runtime group values are not stable enough to define a closed expected set.

## DATA SUMMARY Shape
The future group comparison summary should emit bounded JSON with this semantic shape:

```json
{
  "summary_type": "group_comparison",
  "dataset_name": "...",
  "row_count": 0,
  "group_column": "group_value",
  "metric_column": "avg_score",
  "count_column": "student_count",
  "gap_column": "score_vs_cohort",
  "group_metrics": [],
  "gaps": [],
  "dominant_group": {},
  "weakest_group": {
    "basis": null
  },
  "missing_groups": [],
  "low_count_warnings": [],
  "fairness_warnings": [],
  "causal_claim_allowed": false,
  "summarization_warnings": []
}
```

`group_metrics` must preserve denominators from `aiCountColumn`.

`fairness_warnings` may also be mirrored or summarized in `summarization_warnings` if the final implementation keeps a single warning channel for prompt compactness.

## Behavior Contract
- Select the primary dataset using existing dataset selection logic.
- Validate group, metric, and count columns.
- Parse numeric strings in count, metric, gap, and configured secondary metric columns.
- Emit `group_metrics` with group name, denominator, primary metric, configured secondary metrics, and gap evidence when available.
- Compute `dominant_group` by count only: the group with the largest `aiCountColumn`.
- Compute `weakest_group` from metric or gap evidence and include a `basis`, such as `lowest_metric` or `most_negative_gap`.
- Use explicit `aiGapColumn` when configured.
- If `aiGapColumn` is absent, derive gaps from `aiMetricColumn` relative to a cohort mean only when the metric is parseable and the derivation can be stated clearly.
- Sort gap evidence by configured `aiSortBy` and `aiSortDirection` when available.
- Bound emitted comparison rows using configured `aiTopK` and `aiBottomK`.
- Emit low-count warnings when a group denominator is below `aiMinimumReliableCount`.
- Report missing groups only for configured `aiTargetGroup`, `aiComparisonGroups`, and `aiExpectedGroups`.
- Preserve evidence only; do not infer causes from group membership.

## Fairness/Safety Constraints
The summarizer may describe observed differences between groups, but it must not infer that group membership causes performance differences.

For background or demographic-style grouping:

- emit `fairness_warnings` or equivalent warnings in `summarization_warnings`;
- avoid causal wording such as "because of socioeconomic band" unless a separate causal design exists;
- do not recommend individual action based only on group membership;
- frame gaps as observed descriptive differences tied to returned metrics and denominators.

`causal_claim_allowed` must always be `false` for `group_comparison`.

## Future Self-Test Cases
Future implementation must add a dedicated self-test, for example:

```powershell
python AIService/debug_ai_summary.py --self-test-group-comparison
```

Test cases should cover:

- configured request routes to `group_comparison`;
- request without `aiSummaryType: "group_comparison"` still uses `generic_fallback`;
- denominators from `aiCountColumn` are preserved;
- `dominant_group` is count-based, not metric-based;
- `weakest_group` includes an explicit `basis`;
- explicit gap column is used when configured;
- derived gaps are produced only when safe and parseable;
- numeric strings parse correctly;
- low-count warnings use `aiMinimumReliableCount`;
- missing expected, target, and comparison groups are reported when configured;
- fairness warning is emitted for background-style grouping;
- no new top-level summary mode is introduced;
- existing Group A, ranking, and numeric distribution self-tests remain regression checks.

## Future Implementation Notes
The implementation should update only the minimum necessary surfaces:

- backend AI summary config forwarding for `aiGapColumn` and optional `aiExpectedGroups` if those fields do not already exist;
- Python `AISummaryConfig`;
- `BaseExplanationStrategy` dispatcher and `_summarize_group_comparison`;
- `debug_ai_summary.py` sample data and `--self-test-group-comparison`;
- `A-G08` registry metadata after runtime output columns are verified.

Implementation belongs to Phase 2.

Registry migration belongs to Phase 3 after runtime verification.

Evidence logs belong to Phase 4 after the registry migration commit.

Keep `generic_fallback` runnable for tasks without `aiSummaryType: "group_comparison"`.

Comparison evidence, if generated, should still use the existing two top-level methods:

```powershell
python AIService/debug_ai_summary.py --task A-G08 --method baseline_first_20_rows
python AIService/debug_ai_summary.py --task A-G08 --method task_aware_data_summarization
python AIService/debug_ai_summary.py --task A-G08 --compare-methods --write-log
```

If the local shell lacks `python`, use the bundled Python executable documented in prior implementation plans.

## Acceptance Criteria
- This spec exists and is method-new.
- Old external baseline and previous internal behavior are both documented.
- The new `group_comparison` contract is decision-complete enough for Phase 2 implementation planning.
- Group metrics, denominators, explicit or derived gaps, low-count warnings, and missing group warnings are specified.
- Fairness and causality guardrails are explicit.
- `A-G08` is the first representative task.
- `A-G12` is intentionally deferred.
- No code, registry, SQL, frontend, roadmap, or evaluation log files are changed in this spec-only phase.
