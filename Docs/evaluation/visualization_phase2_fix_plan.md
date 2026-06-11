# Visualization Phase 2A Fix Plan

## Summary

Phase 2A applies only safe chart contract and context fixes:

- `A-G12` moves from count display to percent contract using existing `pct_within_group`.
- `S-T07` keeps the score bar chart and adds visible absence context from `absence_data`.
- `A-C04` is regression verification only.
- `S-T09`, `S-T14`, and `S-T15` are documented as deferred/no-code-change because current outputs are single-row and/or composite relationship fields may be null.

No SQL, availability validator, radar chart, scatter conversion, card adapter, or backend feature-generation changes are included.

## Files to change

- `Backend/src/config/taskRegistry.json`
  - Update only `A-G12` visualization contract from count to percent.
- `Frontend/src/components/ChartRenderer.jsx`
  - Add task-specific `S-T07` absence annotation from the full `datasets` object.
- `Docs/evaluation/visualization_phase2_implementation_report.md`
  - Record implementation and verification.
- `Docs/evaluation/visualization_phase2_task_fix_log.csv`
  - Google Sheets-importable task log.

## Exact proposed changes

### A-G12

Before changing metadata, inspect runtime/API sample and confirm:

- rows include `group_value`, `final_outcome`, `student_count`, and `pct_within_group`.
- `pct_within_group` is a percentage-point value, such as `7.6` meaning `7.6%`.
- percentages within each `group_value` sum to approximately `100`.

If confirmed, change:

- `visualization_config.y_field`: `pct_within_group`
- `visualization_config.y_label`: `% of Students`
- `visualization_config.semantic_roles.y`: `ratio_metric`

Keep SQL, chart type, stacked variant, x field, and series field unchanged.

### S-T07

Before implementing, confirm:

- analytics response contains both `absence_data` and `score_series`.
- `ChartRenderer` receives the full `datasets` object.
- the bar adapter still receives only the selected `score_series` rows.

Implementation:

- Keep the main score bar chart unchanged.
- Add a compact annotation for `S-T07` only, sourced from `datasets.absence_data[0]`.
- Show `absences` and `absence_rate` when present.
- Do not modify SQL or `bar.adapter.js`.
- Do not create a dual-axis or combined chart.

### A-C04

- Regression verification only.
- Do not edit registry, adapters, or chart type.
- Do not add radar support.

### S-T09, S-T14, S-T15

- Documentation/log only in Phase 2A.
- Do not switch to scatter.
- Do not change card adapter or backend output.
- Defer wording review to Phase 2B if needed.

## Risks

- `A-G12` changes chart semantics from counts to percentages; this is intended but should be checked visually.
- `S-T07` annotation uses a task-specific renderer branch; it must not affect other charts.
- `pct_within_group` values are numeric strings in the current API response, so chart adapters must continue numeric coercion.
- Browser verification is still required before marking UI status as pass.

## Verification commands/checklist

```powershell
Set-Location -LiteralPath 'C:\[Graduation_Thesis]Prototype'
npm.cmd --prefix Frontend test
npm.cmd --prefix Frontend run build
```

Manual/API checks:

- `A-G12`: sample percentages sum to about `100` per group.
- `A-G12`: UI y-axis title says `% of Students` and chart uses `pct_within_group`.
- `S-T07`: API returns both `absence_data` and `score_series`.
- `S-T07`: UI still renders score bar chart and shows absence context.
- `A-C04`: grouped bar still renders normally; no radar chart appears.
- `S-T09`, `S-T14`, `S-T15`: remain card-safe and unchanged.

## Out-of-scope items

- No SQL changes.
- No availability validator changes.
- No radar chart support.
- No scatter conversion for single-student relationship cards.
- No card adapter changes.
- No backend composite field generation.
- No Phase 3/4 fixes.
