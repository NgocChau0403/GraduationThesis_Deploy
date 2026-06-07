# Numeric Distribution Summarizer Spec

## Implementation Status
Status: proposed / not implemented yet.

This spec is a contract for a future internal `numeric_distribution` summarizer. This phase does not modify code, registry metadata, SQL, frontend, evaluation logs, or `AI_SUMMARY_METHOD` values.

This spec is documentation-only. Implementation, registry migration, runtime verification, and evidence generation must be separate follow-up phases.

## Top-Level Method Boundary
The external thesis comparison remains:

```text
baseline_first_20_rows
vs
task_aware_data_summarization
```

`numeric_distribution` will be an internal strategy inside `task_aware_data_summarization`, not a new top-level mode. Do not add modes such as `numeric_distribution_old`, `numeric_distribution_new`, or any additional `AI_SUMMARY_METHOD` value.

## Representative Task
Initial representative task:

- `A-B01` - Overall performance distribution.

Current task registry facts from `Backend/src/config/taskRegistry.json`:

- `taskName`: `Overall performance distribution`
- `explanation_strategy`: `distribution`
- `query_labels`: `score_distribution`
- `visualization_config.variant`: `histogram`
- actionable question: `How is the class performing overall?`
- current `aiSummaryType`: not configured

Current previous internal behavior:

```text
task_aware_data_summarization -> generic_fallback
```

Historical baseline remains:

```text
baseline_first_20_rows
```

## A-B01 Output Column Verification
The SQL-defined columns are confirmed from registry/query definition, not from live runtime execution in this phase.

SQL-defined output columns:

- `score_bucket`
- `student_count`
- `pct_of_class`
- `avg_score_in_bucket`

A-B01 runtime output columns require verification before implementation and registry migration.

If runtime output differs from the SQL definition, implementation metadata must use the runtime output column names and the discrepancy must be noted in the implementation task.

## Why Generic Fallback Is Insufficient
`generic_fallback` is safer than the historical first-20-row baseline, but it is not numeric-distribution aware.

For numeric histogram/bin tasks, the AI needs a stable contract for:

- ordered numeric bins;
- dominant bin by count;
- low-tail or threshold-focused bins;
- missing expected bins;
- percent-total consistency;
- metric evidence per bin;
- a clear difference between semantic categories and numeric ranges.

Without a numeric distribution summary, prompt evidence can still be too row-sample oriented. It may preserve raw order instead of numeric order, overfocus on first rows, miss low-score tails, or treat numeric range labels as ordinary text categories.

## Relationship To Categorical Distribution
`categorical_distribution` and `numeric_distribution` are intentionally separate internal strategies.

- `categorical_distribution`: semantic categories, outcomes, or levels, ordered by configured category semantics.
- `numeric_distribution`: ordered numeric bins/ranges representing a numeric variable.

For `A-B01`, `score_bucket` values are numeric ranges. Bin order must follow `aiBinOrder` first, then numeric range semantics if no explicit order exists. `No score` is a special nonnumeric bin and should be placed last unless metadata says otherwise.

## Proposed Registry Metadata Contract
Initial metadata proposal for `A-B01`, using SQL-defined columns:

```json
{
  "aiSummaryType": "numeric_distribution",
  "aiBinColumn": "score_bucket",
  "aiCountColumn": "student_count",
  "aiPercentColumn": "pct_of_class",
  "aiMetricColumns": ["avg_score_in_bucket"],
  "aiBinOrder": [
    "0-10",
    "10-20",
    "20-30",
    "30-40",
    "40-50",
    "50-60",
    "60-70",
    "70-80",
    "80-90",
    "90-100",
    "No score"
  ],
  "aiExpectedBins": [
    "0-10",
    "10-20",
    "20-30",
    "30-40",
    "40-50",
    "50-60",
    "60-70",
    "70-80",
    "80-90",
    "90-100",
    "No score"
  ],
  "aiFocusBins": ["0-10", "10-20", "20-30", "30-40"],
  "aiNumericThreshold": 40,
  "aiThresholdDirection": "below"
}
```

If `aiBinOrder` is not configured in future tasks, the summarizer may derive order from numeric range labels where possible. Explicit `aiBinOrder` is preferred for registry migration because it avoids implementation guessing.

## DATA SUMMARY Shape
The future numeric distribution summary should emit bounded JSON with this semantic shape:

```json
{
  "summary_type": "numeric_distribution",
  "dataset_name": "...",
  "row_count": 0,
  "bin_column": "score_bucket",
  "count_column": "student_count",
  "percent_column": "pct_of_class",
  "bin_distribution": [],
  "total_count": 0,
  "dominant_bin": {},
  "focus_bins": [],
  "focus_total": {},
  "threshold_summary": {},
  "missing_expected_bins": [],
  "metric_evidence_by_bin": {},
  "summarization_warnings": []
}
```

`focus_total` is computed from configured `aiFocusBins`.

`threshold_summary` is computed from bins whose numeric range satisfies `aiNumericThreshold` and `aiThresholdDirection` when parseable.

If configured focus bins and threshold-derived bins disagree, emit `summarization_warnings`.

## Behavior Contract For Future Implementation
- Select the primary dataset using existing dataset selection logic.
- Validate bin and count columns.
- Parse numeric strings in count, percent, and configured metric columns.
- Preserve explicit `aiBinOrder` when configured.
- Derive numeric range order only when explicit order is unavailable.
- Place `No score` last unless explicitly ordered.
- Emit all available bins within bounded output.
- Compute `total_count`.
- Compute `dominant_bin` by count, not lexical order.
- Compute `focus_total` from `aiFocusBins`.
- Compute `threshold_summary` from parseable numeric bin ranges.
- Report missing expected bins from `aiExpectedBins`.
- Validate percent totals with rounding tolerance.
- Emit metric evidence by bin from configured metric columns.
- Emit evidence only; do not infer causes from the distribution alone.

## Safety Constraints
- Do not imply that score distribution bins explain causality.
- Do not infer student-level recommendations from aggregate bin membership alone.
- Do not label a bin as risk unless the task context or configured threshold supports that framing.
- Low-score threshold language should be descriptive and tied to `aiNumericThreshold` / `aiThresholdDirection`.

## Future Self-Test Cases
Future implementation must add a dedicated self-test, for example:

```powershell
python AIService/debug_ai_summary.py --self-test-numeric-distribution
```

Test cases should cover:

- unordered bins are sorted by explicit `aiBinOrder`;
- fallback ordering derives numeric range order when `aiBinOrder` is absent;
- `No score` is placed last unless explicitly ordered;
- focus bins below 40 are summed correctly;
- threshold-derived bins below 40 are summed correctly;
- mismatch between `focus_total` bins and threshold-derived bins emits warning;
- missing expected bins are reported;
- percent total tolerance is checked;
- dominant bin is computed from count, not lexical order;
- numeric strings parse correctly;
- missing bin column warning;
- missing count column warning;
- task without `aiSummaryType: "numeric_distribution"` still uses `generic_fallback`;
- no new top-level summary mode is introduced;
- existing Group A and ranking self-tests remain regression checks.

## Acceptance Criteria For Future Implementation
- `A-B01` receives `aiSummaryType = "numeric_distribution"` only after this spec is accepted.
- Runtime output columns are verified before metadata is added.
- The summary reports `summary_type = "numeric_distribution"`.
- `bin_distribution` follows numeric bin order, not raw row order or lexical order.
- `dominant_bin` is computed from `student_count`.
- `focus_total` uses configured `aiFocusBins`.
- `threshold_summary` uses parseable numeric bin ranges and configured threshold metadata.
- Focus and threshold disagreement emits a warning.
- `metric_evidence_by_bin` includes `avg_score_in_bucket`.
- The summarizer does not create any new top-level `AI_SUMMARY_METHOD`.
- SQL, chart rendering, and frontend behavior remain unchanged.

## Future Implementation Notes
The implementation should update only the minimum necessary surfaces:

- backend AI summary config forwarding for numeric distribution metadata;
- Python `AISummaryConfig`;
- `BaseExplanationStrategy` dispatcher and `_summarize_numeric_distribution`;
- `debug_ai_summary.py` sample data and `--self-test-numeric-distribution`;
- `A-B01` registry metadata after runtime output columns are verified.

Comparison evidence, if generated, should still use the existing two top-level methods:

```powershell
python AIService/debug_ai_summary.py --task A-B01 --method baseline_first_20_rows
python AIService/debug_ai_summary.py --task A-B01 --method task_aware_data_summarization
python AIService/debug_ai_summary.py --task A-B01 --compare-methods --write-log
```

If the local shell lacks `python`, use the bundled Python executable documented in prior implementation plans.
