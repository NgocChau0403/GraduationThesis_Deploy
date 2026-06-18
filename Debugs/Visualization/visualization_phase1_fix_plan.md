# Visualization Phase 1 Fix Plan

## Summary

Phase 1 fixes only safe visualization metadata and label display issues. It renders existing bar-chart axis titles, clarifies units in task metadata, and corrects the `A-G12` label/semantic role to match the current `student_count` mapping.

This phase does not change SQL, chart types, adapters, availability validation, UI visibility, radar support, or data/feature issues such as `A-G13.lifestyle_risk_score`.

## Files to change

- `Frontend/src/components/charts/BarChartView.jsx`
  - Render `config.x_label` and `config.y_label` visibly for bar, ranked bar, grouped bar, stacked bar, and histogram views.
- `Backend/src/config/taskRegistry.json`
  - Update safe label/unit metadata for `S-T02`, `A-S05`, `S-T07`, `A-B01`, and `A-G12`.
- `Docs/evaluation/visualization_phase1_implementation_report.md`
  - Record implementation and verification results.
- `Docs/evaluation/visualization_phase1_task_fix_log.csv`
  - Google Sheets-importable task fix log.

## Exact proposed changes

### Bar axis labels

- Confirm `ChartRenderer` passes `taskMeta.visualization_config` into `BarChartView`.
- Confirm affected tasks have `x_label` and `y_label` metadata before treating the issue as layout-only.
- Use existing registry metadata:
  - vertical columns: left axis title is `config.y_label`, bottom axis title is `config.x_label`.
  - horizontal/ranked bars: left axis title is `config.x_label`, bottom axis title is `config.y_label`.
- Render axis titles visibly outside the Recharts axis-label placement if Recharts labels are not clear in screenshots.
- Keep the effective chart area close to the previous height.
- Do not remove tick labels, grid, tooltip, legend, grouped bars, or stacked bars.
- Do not add custom tooltip content in Phase 1.

### Registry metadata

- `S-T02`
  - `x_label`: `Competency / Assessment Proxy`
  - `y_label`: `Average Score (0-100)`
- `A-S05`
  - `x_label`: `Competency / Assessment Proxy`
  - `y_label`: `Average Score (0-100)`
- `S-T07`
  - `x_label`: `Assessment Order`
  - `y_label`: `Normalized Score (0-100)`
- `A-B01`
  - `x_label`: `Score Range (0-100)`
  - `y_label`: `Number of Students`
- `A-G04`
  - Keep current `x_label: Assessment` and `y_label: Fail Rate (%)`; no metadata edit needed.
- `A-G12`
  - Label correction only.
  - Keep `y_field: student_count`.
  - Change `y_label` from `% of Students` to `Student Count`.
  - Change `semantic_roles.y` from `ratio_metric` to `count_metric`.
- `A-C04`
  - No metadata change; verify because grouped bars use `BarChartView`.

### Tooltip metadata

- Current bar tooltip is the default Recharts tooltip.
- `bar.adapter.js` does not preserve auxiliary source-row fields for rich tooltip content.
- Do not add `tooltip_fields`, custom tooltip rendering, or adapter payload changes in Phase 1.
- Deferred tooltip candidates:
  - `A-G04`: `total_submissions`, `fail_count`, `avg_score`
  - `A-B01`: `pct_of_class`, `avg_score_in_bucket`

## Risks

- Generic `BarChartView` layout affects all bar charts, so spacing changes must remain minimal.
- External axis title rails add a small amount of horizontal and vertical space.
- Rotated left-side labels must be guarded against clipping.
- `A-G12` label correction changes wording, but it aligns the UI with the current `student_count` mapping.
- Tooltip enrichment is deferred to avoid adapter-surface changes in Phase 1.

## Verification commands/checklist

Run:

```powershell
Set-Location -LiteralPath 'C:\[Graduation_Thesis]Prototype'
npm.cmd --prefix Frontend test
npm.cmd --prefix Frontend run build
```

Manual checks:

- `S-T02`: horizontal ranked bar renders with visible competency/proxy and average score 0-100 axis titles.
- `A-S05`: same label behavior as `S-T02`.
- `S-T07`: vertical bar still selects `score_series`; visible labels show assessment order and normalized score 0-100.
- `A-B01`: histogram still renders buckets; visible labels show score range and number of students.
- `A-G04`: bar still uses `fail_rate_pct`; visible label says fail rate percent.
- `A-G12`: stacked bar still uses `student_count`; visible y-axis title says student count.
- `A-C04`: grouped bar still renders without clipping, overlap, crash, or legend regression.

## Out-of-scope items

- No SQL changes.
- No chart type changes.
- No adapter changes.
- No availability validator changes.
- No UI visibility policy changes.
- No radar chart support.
- No fix for `A-G13.lifestyle_risk_score`.
- No redesign of `S-T07`.
- No change of `A-G12.y_field` to `pct_within_group`.
- No broad custom tooltip implementation.
