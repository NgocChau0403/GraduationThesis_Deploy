# Ranking Summarizer Spec

## Implementation Status
Status: proposed / not implemented yet.

This spec is a contract for a future internal `ranking` summarizer. This phase does not modify code, registry metadata, SQL, frontend, or `AI_SUMMARY_METHOD` values.

This spec is documentation-only. The first implementation phase must be a separate change after this spec is reviewed.

## Top-Level Method Boundary
The external thesis comparison remains:

```text
baseline_first_20_rows
vs
task_aware_data_summarization
```

`ranking` will be an internal strategy inside `task_aware_data_summarization`, not a new top-level mode. Do not add modes such as `ranking_old`, `ranking_new`, or any additional `AI_SUMMARY_METHOD` value.

## Representative Task
Initial representative task:

- `A-G15` - Intervention priority ranking.

Current task registry facts from `Backend/src/config/taskRegistry.json`:

- `explanation_strategy`: `ranking`
- `query_labels`: `intervention_priority_list`
- `visualization_config.variant`: `ranked`
- actionable question: "Who are the top 10 students most in need of intervention right now?"
- current `aiSummaryType`: not configured

Current previous internal behavior:

```text
task_aware_data_summarization -> generic_fallback
```

Historical baseline remains:

```text
baseline_first_20_rows
```

## A-G15 Output Column Verification
The current SQL definition returns these columns:

- `student_id`
- `gender`
- `age_group`
- `region`
- `avg_score`
- `at_risk_score`
- `at_risk_label`
- `flag_low_score`
- `flag_repeated`
- `flag_low_engagement`
- `flag_low_punctuality`
- `flag_neg_trend`
- `final_outcome`

These names are confirmed from the task registry SQL definition, not from a live database execution in this phase.

A-G15 runtime output columns require verification before implementation.

If runtime output differs from the SQL definition, implementation metadata must use the runtime output column names and the discrepancy must be noted in the implementation task.

## Why Generic Fallback Is Insufficient
`generic_fallback` is safer than the historical first-20-row baseline, but it is not ranking-aware.

For ranking tasks, the AI needs a stable contract for:

- top items by ranking metric;
- bottom items for contrast;
- median or typical item;
- metric distribution and ties;
- flag evidence behind the ranking;
- bounded output that preserves priority order.

Without a ranking-specific summary, prompt evidence can still be too row-sample oriented. It may omit bottom contrast, miss ties, overfocus on raw row order, or fail to explain why a student appears in the priority list.

## Proposed Registry Metadata Contract
Initial metadata proposal for `A-G15`, using SQL-defined columns:

```json
{
  "aiSummaryType": "ranking",
  "aiEntityColumn": "student_id",
  "aiMetricColumn": "at_risk_score",
  "aiSortDirection": "desc",
  "aiSecondaryMetricColumns": ["avg_score"],
  "aiLabelColumns": ["at_risk_label", "final_outcome"],
  "aiFlagColumns": [
    "flag_low_score",
    "flag_repeated",
    "flag_low_engagement",
    "flag_low_punctuality",
    "flag_neg_trend"
  ],
  "aiTopK": 10,
  "aiBottomK": 5
}
```

Do not include `gender`, `age_group`, or `region` as default `aiLabelColumns` for the first ranking migration.

If demographic columns are needed later for fairness audit, they must be modeled separately as context or sensitive columns with explicit guardrails. They must not be used as causal explanations or as the basis for intervention priority.

## DATA SUMMARY Shape
The future ranking summary should emit bounded JSON with this semantic shape:

```json
{
  "summary_type": "ranking",
  "dataset_name": "...",
  "row_count": 0,
  "entity_column": "student_id",
  "metric_column": "at_risk_score",
  "sort_direction": "desc",
  "top_items": [],
  "bottom_items": [],
  "median_item": {},
  "metric_stats": {
    "min": null,
    "max": null,
    "mean": null,
    "median": null
  },
  "tie_warnings": [],
  "flag_evidence": [],
  "summarization_warnings": []
}
```

`top_items` and `bottom_items` must be computed after sorting by the configured ranking metric, not by raw input order.

`flag_evidence` should only include configured returned flag columns and their parsed true/false values. It must not invent a cause or intervention reason outside returned evidence.

## Behavior Contract For Future Implementation
- Select the primary dataset using the existing dataset selection logic.
- Validate entity column and ranking metric column.
- Parse numeric strings for the ranking metric and secondary metric columns.
- Sort by configured metric and `aiSortDirection`.
- Emit top K and bottom K after sorting.
- Emit a median item or stable median evidence when possible.
- Emit metric stats for the configured ranking metric.
- Detect and warn about ties at the boundary of top K or bottom K.
- Preserve configured label columns only.
- Preserve configured flag columns as evidence.
- Keep output bounded by shared summary dump guardrails.

## Safety Constraints
- Do not use `gender`, `age_group`, or `region` as explanatory ranking labels in the first migration.
- Do not infer that demographic/background attributes cause risk.
- Do not recommend intervention because of demographic/background attributes.
- Intervention priority must be based on returned risk score, score evidence, risk label, and configured risk flags.
- If sensitive/context columns are later added for audit, they must be marked as sensitive/context evidence and excluded from causal explanations.

## Future Self-Test Cases
Future implementation must add a dedicated self-test, for example:

```powershell
python AIService/debug_ai_summary.py --self-test-ranking
```

Test cases should cover:

- unsorted input still selects correct top and bottom items;
- descending and ascending sort direction;
- numeric strings in the metric column;
- missing entity column warning;
- missing metric column warning;
- ties at the top-K and bottom-K boundary;
- median item selection;
- top/bottom caps;
- configured flag evidence preservation;
- demographic columns are not used as explanatory labels by default;
- no new top-level summary mode is introduced;
- existing Group A self-tests remain regression checks.

## Acceptance Criteria For Future Implementation
- `A-G15` receives `aiSummaryType = "ranking"` only after this spec is accepted.
- Runtime output columns are verified before metadata is added.
- The summary reports `summary_type = "ranking"`.
- `top_items` are ordered by `at_risk_score` descending, with `avg_score` as secondary evidence only.
- `bottom_items` provide contrast without changing the task's top-priority focus.
- `at_risk_label` and `final_outcome` are allowed labels.
- The five configured risk flags are preserved as evidence.
- `gender`, `age_group`, and `region` are not emitted as explanatory labels in the first migration.
- The summarizer does not create any new top-level `AI_SUMMARY_METHOD`.
- SQL, chart rendering, and frontend behavior remain unchanged.

## Future Implementation Notes
The implementation should update only the minimum necessary surfaces:

- backend AI summary config forwarding;
- Python `AISummaryConfig`;
- `BaseExplanationStrategy` dispatcher and `_summarize_ranking`;
- `debug_ai_summary.py` sample data and `--self-test-ranking`;
- `A-G15` registry metadata after runtime output columns are verified.

Comparison evidence, if generated, should still use the existing two top-level methods:

```powershell
python AIService/debug_ai_summary.py --task A-G15 --method baseline_first_20_rows
python AIService/debug_ai_summary.py --task A-G15 --method task_aware_data_summarization
python AIService/debug_ai_summary.py --task A-G15 --compare-methods --write-log
```

If the local shell lacks `python`, use the bundled Python executable documented in the roadmap.
