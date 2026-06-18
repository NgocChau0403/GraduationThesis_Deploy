# Group Comparison Composite Groups Spec

Date: 2026-06-18

Scope: Batch 2 extension for `group_comparison`.

Tasks:

- `A-G05` — submission behaviour by `final_outcome × assessment_type`.
- `A-G12` — background outcome cross-tab by `group_value × final_outcome`.

## Contract

Registry fields:

```text
aiSummaryType = group_comparison
aiGroupColumn = <primary group dimension>
aiGroupKeyColumns = [<primary group dimension>, <series/sub-dimension>]
aiSeriesColumn = <series/sub-dimension>
aiMetricColumn = <primary metric>
aiCountColumn = <support count>
aiMetricColumns = [<supporting numeric metrics>]
aiMetricUnits = { ... }
aiMetricDirections = { ... }
aiMinimumReliableCount = <count threshold>
aiFocusCategories = [...] optional, for cross-tab risk categories
```

## Output additions

The existing single-group output remains available through `group_metrics`.
When `aiGroupKeyColumns` is configured, each row additionally carries:

- `group_key_values`
- `composite_group_label`
- `series_value`

The summary also emits:

- `group_key_columns`
- `series_column`
- `composite_group_keys = true`
- `group_series`
- `focus_summary`

## Guardrails

- Composite grouping is descriptive only.
- Do not infer that final outcome, demographics, or assessment type causes the observed metric.
- Percent metrics must keep their denominator semantics. `A-G12` uses `% within each group`, not `% of whole cohort`.
- Low-count warnings remain tied to `aiMinimumReliableCount`.
