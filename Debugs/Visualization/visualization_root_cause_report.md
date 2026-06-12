# Visualization Root-Cause Investigation Report

Dataset under test: `SAMPLE_UCI_POR`  
Class under test: `SAMPLE_UCI_POR_CLASS`  
Generated during investigation: 2026-06-09 / 2026-06-10 local workspace context  
Scope: investigation only. No application source code was changed.

## 1. Executive Summary

Investigated 18 task cases: 15 manual visualization/visibility findings plus 3 automatic-evaluation cross-checks.

Summary counts:

| Category | Count | Tasks |
|---|---:|---|
| Real visualization/rendering issues | 9 | `S-T02`, `S-T07`, `S-T09`, `S-T14`, `S-T15`, `A-B01`, `A-S05`, `A-C04`, `A-G12` |
| Backend/data/schema issues | 4 | `A-G09`, `A-G13`, `S-T09`, `S-T14` |
| UI visibility expected by design | 4 | `A-S01`, `A-S08`, `A-G15`, `A-G16` |
| Missing label/unit display issue | 6 | `S-T02`, `S-T07`, `A-B01`, `A-S05`, `A-G04`, `A-G12` |
| Dataset limitation / insufficient data | 5 | `A-S01`, `A-S08`, `A-G09`, `A-G15`, `A-G16` |
| SQL timeout/performance issue currently reproduced | 0 | Historical only for `S-T04`, `A-G03`; current runtime probe completed in < 1s |
| Evaluation mismatch / stale or shallow evaluation | 3 | `A-G13`, `S-T04`, `A-G03` |

Main conclusions:

- Bar/histogram charts have registry labels (`x_label`, `y_label`) but `BarChartView` does not render axis title labels. This explains most "unclear axis/unit" findings.
- `ChartRenderer` passes `config` to chart views, and line/scatter chart views do render axis labels, so this is not a generic `ChartRenderer` issue. It is primarily a bar chart view display gap.
- Several single-student relationship tasks are configured as `viz_type: card` even though their `visualization_config` declares relationship-style `x_field` and `y_field`. Cards cannot show relationship shape; for single-row outputs they can only summarize values.
- `A-G09` is the highest-priority data/availability bug: it is marked executable for UCI, but its SQL filters `e.source_dataset = 'OULAD'`, returning 0 rows. The validator treats legacy `datasetCompatibility=OULAD_only` only as a warning unless an explicit `availability_contract.dataset_specific` exists.
- `A-G13` still returns 649 API rows but 0 scatter points because all `lifestyle_risk_score` values are null. Manual pass likely checked task availability/API row count or visual shell, not adapter valid rows.
- `S-T04` and `A-G03` previously timed out in automatic logs, but the current backend runtime probe returned successfully: `S-T04` in ~537ms and `A-G03` in ~289ms.

## 2. Task Summary Table

| taskId | taskName | current status | manual finding | automatic finding | current `viz_type` | actual chart rendered | expected chart/behavior | root cause category | suspected root cause file(s) | severity | recommended fix direction | should fix now? |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `S-T02` | Competency gap analysis | executable | Bar renders but labels/score unit unclear | API pass; 3 rows; adapter valid rows 3 | `bar_chart` | horizontal ranked bar | labeled competency/proxy assessment bars, score scale clear | 4. ChartRenderer/display issue; 2. metadata incomplete for score scale | `Frontend/src/components/charts/BarChartView.jsx`, `Backend/src/config/taskRegistry.json` | Medium | Render bar axis labels and add score unit/scale metadata | yes |
| `S-T07` | Absence / inactivity impact | executable | Axis/category/unit unclear | API pass; selected `score_series`, ignores `absence_data` visually | `bar_chart` | vertical bar over assessment scores | absence/inactivity context plus score impact | 4. display issue; 3. dataset-block/design mapping issue | `Frontend/src/components/chartSelectionPolicy.js`, `Backend/src/config/taskRegistry.json`, `BarChartView.jsx` | Medium | Clarify that chart uses `score_series`; expose absence value as annotation/card or redesign as combined view | yes |
| `S-T09` | Lifestyle risk vs performance | executable | Cards do not show relationship | API row has `lifestyle_risk_score: null`; card valid | `card` | metric cards | relationship chart only if risk score available | 5. wrong chart type; 1. missing backend/composite field | `Backend/src/config/taskRegistry.json`, `Frontend/src/chartAdapters/card.adapter.js`, UCI feature pipeline | High | Do not switch to scatter until `lifestyle_risk_score` is populated; short-term card copy/metadata, later derived field | no, needs data decision |
| `S-T14` | Social balance vs performance | executable | Cards do not show relationship | API row has `social_balance_score: null`; card valid | `card` | metric cards | relationship summary or relationship chart with populated score | 5. wrong chart type; 1. missing derived field | registry, UCI feature pipeline, card adapter | High | Populate `social_balance_score` or keep card with explicit "not available" handling | no, needs data decision |
| `S-T15` | Family context vs performance | executable | Cards do not show relationship | API row has `family_stability_score: null`; card valid | `card` | metric cards | contextual factors vs score; probably card/table unless multi-row comparison | 5. wrong chart type for relationship intent; partial data issue | registry, card adapter | Medium | Keep card/table unless query returns cohort/comparison rows; add labels and null handling | no |
| `A-B01` | Overall performance distribution | executable | Histogram hard to verify due labels | API pass; 10 histogram buckets; adapter chart type `histogram` | `bar_chart` with `variant: histogram` | vertical bar histogram | histogram with score range and student count axes | 4. display issue | `BarChartView.jsx`, registry metadata | Medium | Render bar axis titles; optionally expose `pct_of_class` tooltip | yes |
| `A-S01` | Student full profile snapshot | not visible in normal UI | Registry/eval contains task, not UI-visible | Registry status experimental; availability insufficient on UCI due no engagement | `table` | not visible/clickable; direct API returns 0 rows | hidden/disabled for UCI unless include experimental and data exists | expected behavior; 8. dataset limitation | `tasks.controller.js`, `taskValidator.controller.js`, `StudentDashboardPage.jsx`, `AdminDashboardPage.jsx` | Low | Document expected behavior; no UI bug | no |
| `A-S05` | Student competency gap | executable | Same label/unit issue as `S-T02` | API pass; 3 rows; adapter valid rows 3 | `bar_chart` | horizontal ranked bar | labeled competency/proxy assessment bars, score scale clear | 4. display issue; shared config with `S-T02` | `BarChartView.jsx`, registry | Medium | Same generic bar label fix as `S-T02` | yes |
| `A-S08` | Student intervention recommendation | not visible in normal UI | Registry/eval contains task, not visible for UCI | Experimental + `OULAD_only`; insufficient data for UCI engagement | `table` | hidden; direct API returns 1 degraded synthesis row | hidden/disabled for UCI | expected behavior; 8. dataset limitation | `tasks.controller.js`, `taskValidator.controller.js`, `AdminDashboardPage.jsx` | Low | Keep hidden for UCI; avoid treating direct API row as UI availability | no |
| `A-C04` | Compare lifestyle context | executable | Radar expected or better multi-factor comparison; labels unclear | API pass; 10 long rows; grouped adapter makes 2 student groups | `bar_chart` | grouped bar | radar or grouped bar with clear factor legend and units | 5. chart type/design fit; 4. bar label issue | registry, `BarChartView.jsx`, `bar.adapter.js` | Medium | If no radar support, keep grouped bar and improve axis/legend/tooltip labels | yes |
| `A-G04` | Assessment difficulty analysis | executable | Axis/count/score units unclear | API pass; 3 rows; fail rate pct + avg score | `bar_chart` | horizontal ranked bar | fail rate percent by assessment with tooltip counts | 4. display issue; metadata could include tooltip fields | `BarChartView.jsx`, registry | Medium | Axis labels and richer tooltip metadata | yes |
| `A-G09` | Socioeconomic disadvantage impact | incorrectly executable | Clickable but No valid data | API returns 0 rows; adapter 0 chart rows; SQL has OULAD filter | `scatter_plot` | No valid data | should be hidden/insufficient for UCI | 6. availability validator bug; 8. dataset limitation; 1. backend/data mismatch | `Backend/src/config/taskRegistry.json`, `Backend/src/services/canonicalCapability.service.js`, SQL in registry | Critical | Add dataset-specific availability contract or make datasetCompatibility hard-fail; do not render empty chart | yes |
| `A-G12` | Background group pass/fail/withdrawal rate | executable | Stacked bar labels unclear; count vs percent ambiguous | API pass; rows include `student_count` and `pct_within_group`; chart maps count despite `y_label` "% of Students" | `bar_chart` | stacked/grouped bar using counts | 100% stacked percentage or count-labeled chart | 2. incorrect metadata; 3. mapping issue; 4. display issue | registry, `bar.adapter.js`, `BarChartView.jsx` | High | Change y mapping to `pct_within_group` for percent chart or relabel y as count | yes |
| `A-G13` | Lifestyle risk across cohort | executable but chart invalid | Manual sheet pass; automatic fail | Current API still 649 rows, adapter valid rows 0; missing `lifestyle_risk_score` in 649 rows | `scatter_plot` | No valid scatter points | hide/insufficient or compute risk score | 1. backend/data missing derived field; 6. validator too coarse; 10. manual/auto mismatch | registry, feature pipeline, `canonicalCapability.service.js`, `scatter.adapter.js` | High | Require non-null chart field in availability or compute/fallback lifestyle score from raw factors | yes |
| `S-T04` | At-risk self-check | executable | Automatic skip due timeout | Historical timeout; current API 5 rows in ~537ms | `checklist` | checklist | current behavior acceptable | 10. stale log / prior performance issue | registry SQL, `Debugs/s-t04-*`, performance logs | Low | Rerun automatic evaluation; keep SQL under regression benchmark | no |
| `A-G03` | Identify at-risk cohort | executable | Automatic skip due timeout | Historical timeout; current API 50 rows in ~289ms | `table` | ranked table | current behavior acceptable | 10. stale log / prior performance issue | registry SQL, `Debugs/a-g03-*`, performance logs | Low | Rerun automatic evaluation; retain performance regression check | no |
| `A-G15` | Intervention priority ranking | not visible in normal UI | Registry/eval contains task, not visible | Experimental + insufficient UCI engagement; direct API returns 0 rows | `table` | hidden/disabled | hidden or disabled for UCI | expected behavior; 8. dataset limitation | `tasks.controller.js`, `taskValidator.controller.js`, `AdminDashboardPage.jsx` | Low | No UI bug; document expected behavior | no |
| `A-G16` | Admin action recommendation | not visible in normal UI | Registry/eval contains task, not visible | Experimental + `OULAD_only`; direct API returns 1 synthesis row | `table` | hidden/disabled | hidden for UCI | expected behavior; 8. dataset limitation | `tasks.controller.js`, `taskValidator.controller.js`, `AdminDashboardPage.jsx` | Low | No UI bug; avoid direct-run result being considered availability | no |

## 3. Detailed Root-Cause Notes By Task

### Shared Frontend Findings

Inspected files:

- `Frontend/src/components/ChartRenderer.jsx`
- `Frontend/src/components/chartSelectionPolicy.js`
- `Frontend/src/chartAdapters/bar.adapter.js`
- `Frontend/src/chartAdapters/scatter.adapter.js`
- `Frontend/src/chartAdapters/card.adapter.js`
- `Frontend/src/chartAdapters/table.adapter.js`
- `Frontend/src/components/charts/BarChartView.jsx`
- `Frontend/src/components/charts/ScatterChartView.jsx`
- `Frontend/src/components/charts/LineChartView.jsx`
- `Frontend/src/pages/StudentDashboardPage.jsx`
- `Frontend/src/pages/AdminDashboardPage.jsx`

Evidence:

- `ChartRenderer` selects adapters via `ADAPTER_MAP`, resolves a dataset block through `resolveDatasetForVisualization`, adapts rows, and passes `config` to the chart component.
- `chartSelectionPolicy.deriveChartRequiredFields` uses `availability_contract.chart_required_fields` or `visualization_config.x_field/y_field`.
- `BarChartView` renders `XAxis`/`YAxis` ticks but does not render `label={...}` on either axis. This is different from `LineChartView` and `ScatterChartView`, which render `config.x_label` and `config.y_label`.
- `bar.adapter.js` uses `y_label` only as the bar series name, not as axis title. For single-bar charts no legend is shown, so the label is effectively invisible.
- `card.adapter.js` turns the first row into generic metric cards and humanizes raw keys. It does not use `x_label`, `y_label`, relationship metadata, or field units.
- `scatter.adapter.js` strictly requires finite numeric `x_field` and `y_field`; null chart fields are skipped with missing-field diagnostics.

### Shared Backend / Availability Findings

Inspected files:

- `Backend/src/config/taskRegistry.json`
- `Backend/src/controllers/analytics.controller.js`
- `Backend/src/controllers/tasks.controller.js`
- `Backend/src/controllers/taskValidator.controller.js`
- `Backend/src/services/taskRegistry.service.js`
- `Backend/src/services/capabilityValidator.service.js`
- `Backend/src/services/canonicalCapability.service.js`
- `Backend/src/services/outputSchema.service.js`
- `Backend/src/routes/analytics.routes.js`
- `Backend/src/routes/task.routes.js`

Evidence:

- `/api/analytics/run` maps SQL outputs into `datasets` keyed by `query_labels`.
- `outputSchema.service.js` validates `output_schema.required_columns` only when the task declares that schema.
- `tasks.controller.js` hides `registry_status: experimental` unless `includeExperimental=true`.
- `/api/tasks/available` merges sanitized task metadata with compact availability. Frontend calls this without `includeExperimental`, so experimental tasks are not present in normal dashboards.
- `StudentDashboardPage` and `AdminDashboardPage` only enable Run when `availability.status === "executable"`.
- `canonicalCapability.service.js` treats legacy `datasetCompatibility` mismatch as a warning/hint, not a hard failure. An explicit `availability_contract.dataset_specific` is needed for hard dataset-specific gating.

### `S-T02` - Competency gap analysis

- Registry: `viz_type: bar_chart`; `x_field: competency_tag`; `y_field: avg_score`; labels are "Competency Tag" and "Average Score"; no `output_schema`.
- Backend SQL output fields: `competency_tag`, `competency_source`, `assessment_type`, `avg_score`, `pass_rate`, `assessment_count`.
- Runtime rows: 3 rows for first UCI POR student. Sample includes `G1`, `G2`; `competency_source: proxy`.
- Dataset block selected: `competency_scores`.
- Adapter mapping: `x=competency_tag`, `y=avg_score`; valid rows 3, skipped 0.
- Root cause: not a backend row/schema failure. Registry labels exist, but `BarChartView` does not render axis titles. The score scale is also implicit; the registry says "Average Score" but not "0-100 normalized score".
- Evidence: same adapter/config pattern reproduces in `A-S05`.

### `S-T07` - Absence / inactivity impact

- Registry: `viz_type: bar_chart`; `x_field: assessment_order`; `y_field: score_normalized`; labels are "Assessment" and "Normalized Score"; multi-query labels `absence_data`, `score_series`.
- Backend SQL output fields:
  - `absence_data`: `absences`, `absence_rate`
  - `score_series`: `assessment_order`, `week_of_class`, `score_normalized`, `pass_flag`
- Runtime rows: `absence_data` 1 row, `score_series` 3 rows.
- Dataset block selected: `score_series`, because it matches chart fields.
- Adapter mapping: `x=assessment_order`, `y=score_normalized`; valid rows 3.
- Root cause: the visible chart is really score-by-assessment, not absence impact. The absence row is returned but not represented in the chart. Axis labels are present in metadata but not rendered by `BarChartView`.
- Conclusion: not wrong dataset block selection per current config, but the task design does not visually connect absence/inactivity to performance.

### `S-T09` - Lifestyle risk vs performance

- Registry: `viz_type: card`; config still declares `x_field: lifestyle_risk_score`, `y_field: avg_score`, with relationship-like labels.
- Backend output fields: `alcohol_weekday`, `alcohol_weekend`, `go_out_freq`, `health_status`, `family_relation`, `free_time`, `lifestyle_risk_score`, `avg_score`.
- Runtime rows: 1 row; `avg_score: 36.67`; `lifestyle_risk_score: null`.
- Dataset block selected: `lifestyle_data`.
- Adapter mapping: card adapter renders generic metric cards from the first row.
- Root cause: wrong chart type for a relationship intent, plus missing derived risk score for UCI POR. A scatter plot would still fail for this single-student output because there is only one row and the key x-field is null.
- Conclusion: do not switch chart type until data contract is fixed. Short-term: card should communicate raw lifestyle factors and missing derived score more explicitly.

### `S-T14` - Social balance vs performance

- Registry: `viz_type: card`; `x_field: social_balance_score`, `y_field: avg_score`.
- Backend output fields: `social_balance_score`, `free_time`, `go_out_freq`, `alcohol_weekday`, `avg_score`.
- Runtime rows: 1 row; `social_balance_score: null`.
- Dataset block selected: `social_data`.
- Adapter mapping: generic cards.
- Root cause: card cannot show a relationship; the derived x-field is null. This is a backend/feature field issue plus a task design issue.

### `S-T15` - Family context vs performance

- Registry: `viz_type: card`; `x_field: family_stability_score`, `y_field: avg_score`.
- Backend output fields: `family_stability_score`, `family_relation`, `parent_cohabitation_status`, `mother_education_level`, `father_education_level`, `avg_score`.
- Runtime rows: 1 row; `family_stability_score: null`, raw family fields present.
- Dataset block selected: `family_data`.
- Adapter mapping: generic cards.
- Root cause: card is acceptable for a single-student profile snapshot but not for "relationship" language. A relationship chart would require multi-row comparison/cohort output or a populated derived score.

### `A-B01` - Overall performance distribution

- Registry: `viz_type: bar_chart`; `variant: histogram`; `x_field: score_bucket`; `y_field: student_count`; labels "Score Range" and "Number of Students"; `output_schema.required_columns`: `score_bucket`, `student_count`.
- Backend output fields: `score_bucket`, `student_count`, `pct_of_class`, `avg_score_in_bucket`.
- Runtime rows: 10 bucket rows.
- Dataset block selected: `score_distribution`.
- Adapter mapping: chart type meta is `histogram`; valid rows 10.
- Root cause: histogram mapping is correct. Manual ambiguity comes from `BarChartView` not showing axis titles and not surfacing `pct_of_class`/bucket semantics in a richer tooltip.

### `A-S01` - Student full profile snapshot

- Registry: `registry_status: experimental`; `viz_type: table`; `requiredCapabilities`: `assessment_scores`, `engagement_tracking`.
- Availability with `includeExperimental=true`: `insufficient_data`, disabled reason "Required capability missing: engagement_tracking".
- Normal `/api/tasks/available` without `includeExperimental` does not include this task.
- Runtime direct API: `student_profile` 0 rows.
- Root cause: expected behavior, not UI bug. It is hidden first by experimental gating and would be disabled by validator on UCI POR because engagement rows are absent.

### `A-S05` - Student competency gap

- Registry and SQL are shared with `S-T02`: `competency_scores`, `competency_tag`, `avg_score`, proxy competency note.
- Runtime rows: 3 rows; valid chart rows 3.
- Root cause: same as `S-T02`: bar labels/score unit display gap, not backend failure.

### `A-S08` - Student intervention recommendation

- Registry: `registry_status: experimental`; `datasetCompatibility: OULAD_only`; `availability_contract.dataset_specific.source_dataset: OULAD`; `viz_type: table`.
- Availability with `includeExperimental=true`: `insufficient_data`; disabled reason says task depends on OULAD engagement/online activity signals.
- Normal UI: not present because experimental tasks are filtered out.
- Direct API can still return a `synthesis_data` row, but frontend does not expose or run it in normal UCI UI.
- Root cause: expected behavior. Treating direct API success as UI availability would be a false positive.

### `A-C04` - Compare lifestyle context

- Registry: `viz_type: bar_chart`; `variant: grouped`; `x_field: student_id`; `y_field: lifestyle_risk_score`; `series_field: lifestyle_dimension`; label "Lifestyle Score (1-5)".
- Backend output fields: `student_id`, `lifestyle_dimension`, `lifestyle_risk_score`, raw factors, `composite_lifestyle_risk_score`, `social_balance_score`.
- Runtime rows: 10 long-format rows for two students x five dimensions.
- Dataset block selected: `lifestyle_comparison`.
- Adapter mapping: grouped bar pivots rows into 2 x-axis groups, with lifestyle dimensions as bars. Adapter valid row count represents grouped categories, not raw rows.
- Root cause: chart type is not necessarily wrong. Radar is not currently supported by `ChartRenderer`/`ADAPTER_MAP`; grouped bar is the best current supported representation. The real issue is bar axis/legend clarity and factor labels.

### `A-G04` - Assessment difficulty analysis

- Registry: `viz_type: bar_chart`; `variant: ranked`; `x_field: assessment_name`; `y_field: fail_rate_pct`; labels "Assessment" and "Fail Rate (%)".
- Backend output fields: `assessment_id`, `assessment_name`, `assessment_type`, `week_of_class`, `competency_tag`, `competency_source`, `total_submissions`, `fail_count`, `fail_rate_pct`, `avg_score`.
- Runtime rows: 3 rows; valid chart rows 3.
- Root cause: backend output is sufficient. Missing/unclear display is bar axis-label issue plus tooltip limitation: counts and average score exist but are not deliberately surfaced.

### `A-G09` - Socioeconomic disadvantage impact

- Registry: `datasetCompatibility: OULAD_only`; `viz_type: scatter_plot`; no explicit `availability_contract.dataset_specific`.
- SQL includes `WHERE e.class_id=:class_id AND e.source_dataset = 'OULAD'`.
- Availability for UCI POR: incorrectly `executable`.
- Runtime API: `disadvantage_impact` returns 0 rows.
- Adapter: selected fallback `disadvantage_impact`; chart rows 0.
- Root cause: availability validator bug/gap. The validator only emits a legacy dataset compatibility hint unless an explicit availability contract exists. Because UCI POR has broad demographics, it marks the task executable even though SQL hard-filters OULAD and cannot return data.
- Required behavior: mark `insufficient_data`/hide for UCI, not clickable.

### `A-G12` - Background group pass/fail/withdrawal rate

- Registry: `viz_type: bar_chart`; `variant: stacked`; `x_field: group_value`; `y_field: student_count`; `series_field: final_outcome`; label says `y_label: "% of Students"`.
- Backend output fields: `group_value`, `final_outcome`, `student_count`, `pct_within_group`.
- Runtime rows: 4 rows, e.g. `GP/Fail`, `GP/Pass`.
- Adapter mapping: uses `student_count`, not `pct_within_group`. Grouped adapter pivots into 2 background groups.
- Root cause: metadata/mapping mismatch. The axis label says percentage, but the bar height is count. Outcome labels exist through series/legend but axis title is not shown.
- Fix direction: either change y_field to `pct_within_group` for true 100% stacked percent, or relabel y as "Student Count".

### `A-G13` - Lifestyle risk across cohort

- Registry: `datasetCompatibility: UCI_only`; `viz_type: scatter_plot`; `x_field: lifestyle_risk_score`; `y_field: avg_score`.
- Runtime API: 649 rows, fields include `lifestyle_risk_score`, but all probed sample values are null.
- Adapter: selected `lifestyle_risk_scatter`; valid rows 0; skipped rows 649; missing field count `lifestyle_risk_score: 649`.
- Automatic finding: "required field `lifestyle_risk_score` missing in 649 rows" is still consistent with current runtime.
- Manual pass mismatch: likely manual evaluation looked at task availability, returned row count, or chart shell rather than adapter valid rows. It does not appear to be fixed/stale as of current probe.
- Root cause: data/feature pipeline or SQL should compute/fallback `lifestyle_risk_score` from raw factors, or availability should require non-null chart field and mark task insufficient.

### `S-T04` - At-risk self-check

- Registry: `registry_status: certified`; `viz_type: checklist`; `output_schema.required_columns`: `flag_name`, `flag_value`, `threshold`, `triggered`.
- Historical automatic log: timeout around 30s in `performance_auto_SAMPLE_UCI_POR.json`.
- Current runtime API: success, 5 rows, ~537ms.
- Backend output fields: required fields plus `severity`, `flag_description`, `recommended_action`, `support_category`.
- Root cause: automatic timeout finding is stale relative to current backend, likely after performance fixes documented in `Debugs/s-t04-*`.
- Fix direction: rerun automatic visualization/performance evaluation and keep regression benchmark.

### `A-G03` - Identify at-risk cohort

- Registry: `registry_status: certified`; `viz_type: table`; `output_schema.required_columns`: `student_id`, `avg_score`, `at_risk_score`, `at_risk_label`, `triggered_flags`.
- Historical automatic log: timeout around 30s.
- Current runtime API: success, 50 rows, ~289ms.
- Backend output fields include all required fields plus support/action fields.
- Root cause: automatic timeout finding is stale relative to current backend, likely after performance fixes documented in `Debugs/a-g03-*`.

### `A-G15` - Intervention priority ranking

- Registry: `registry_status: experimental`; `datasetCompatibility: both`; `requiredCapabilities`: `assessment_scores`, `engagement_tracking`; explicit `availability_contract.required_all`.
- Availability with `includeExperimental=true`: `insufficient_data`, disabled reason "Required capability missing: engagement_tracking".
- Normal UI: absent because experimental tasks are filtered out.
- Direct API: `intervention_priority_list` 0 rows.
- Root cause: expected behavior for UCI POR. No UI visibility bug.

### `A-G16` - Admin action recommendation

- Registry: `registry_status: experimental`; `datasetCompatibility: OULAD_only`; explicit `availability_contract.dataset_specific.source_dataset: OULAD`.
- Availability with `includeExperimental=true`: `insufficient_data`, disabled reason "Task depends on OULAD engagement/online activity signals."
- Normal UI: absent because experimental tasks are filtered out.
- Direct API: `synthesis_data` 1 row, but this does not mean it should be visible for UCI.
- Root cause: expected behavior for normal UI. If direct API is used for evaluation, evaluation must respect availability.

## 4. Fix Plan

### Phase 1 - Safe metadata/label fixes

1. Update `BarChartView` to render `config.x_label` and `config.y_label` on the correct axes for both vertical and horizontal layouts.
2. Add or standardize unit metadata in `visualization_config`, especially normalized score scale and percent/count language.
3. For `S-T02` and `A-S05`, clarify that UCI uses `assessment_name` as proxy competency and that `avg_score` is normalized score.
4. For `A-G04`, keep `fail_rate_pct` as the bar value and expose `total_submissions`, `fail_count`, and `avg_score` in tooltip metadata if supported.
5. For `A-B01`, keep histogram mapping and add clearer bucket/number-of-students labels.

### Phase 2 - Chart type / adapter mapping fixes

1. `A-G12`: choose one contract:
   - percent chart: set `y_field` to `pct_within_group`, keep `y_label` as `% of Students`;
   - count chart: keep `student_count`, change `y_label` to `Student Count`.
2. `S-T07`: either add an absence summary annotation/card next to the score bar chart, or redesign as a combined view where absence rate is visibly connected to scores.
3. `A-C04`: radar is not currently supported. Keep grouped bar as the safe supported chart unless radar adapter/view is deliberately added and tested.
4. `S-T09`, `S-T14`, `S-T15`: do not switch to scatter until backend returns enough non-null, multi-row relationship data. For single-student views, card/table is safer.

### Phase 3 - UI visibility / availability fixes

1. Keep `A-S01`, `A-S08`, `A-G15`, `A-G16` hidden in normal UI while `registry_status: experimental` unless product policy changes.
2. Ensure evaluation scripts use `/api/tasks/available` without `includeExperimental` when testing normal UI visibility.
3. Add explicit expected-behavior notes for experimental tasks so manual evaluators do not classify them as missing UI bugs.
4. Fix `A-G09` availability by adding explicit `availability_contract.dataset_specific.source_dataset: OULAD` or by making datasetCompatibility mismatch a hard failure for validated tasks.

### Phase 4 - Backend SQL/schema fixes

1. `A-G13`: populate `student.lifestyle_risk_score` during UCI sample import/feature engineering, or compute it in SQL from raw fields as a fallback.
2. `S-T09`, `S-T14`, `S-T15`: decide whether null composite fields should be computed from available raw fields or removed from chart semantics.
3. Add `output_schema` to important chart tasks that currently lack it, including `S-T02`, `S-T07`, `A-S05`, `A-G04`, `A-G09`, `A-G12`, `A-G13`.
4. Reconfirm `S-T04` and `A-G03` SQL performance with the same automatic runner that previously timed out.

### Phase 5 - Regression tests and evaluation rerun

1. Rerun automatic visualization evaluation for affected tasks on `SAMPLE_UCI_POR`.
2. Rerun full API contract evaluation for `SAMPLE_UCI_POR`.
3. Manually verify chart screenshots for `S-T02`, `S-T07`, `A-B01`, `A-S05`, `A-C04`, `A-G04`, `A-G12`, `A-G13`, `A-G09`.
4. After UCI fixes, run targeted regression on `SAMPLE_UCI_MAT` and `SAMPLE_OULAD`, especially shared bar/scatter adapters.

## 5. Risk Assessment

| Fix direction | Dataset risk | Shared adapter risk | Generic or task-specific? | Risk level |
|---|---|---|---|---|
| Render bar axis labels in `BarChartView` | Low; applies to all bar charts | Medium-low; could affect spacing on dense labels | Generic | Low |
| Add score/unit metadata in registry | Low | Low | Mostly task-specific metadata | Low |
| Change `A-G12` y mapping to percentage | Medium; changes semantics of existing chart | Low adapter risk, medium interpretation risk | Task-specific | Medium |
| Add `A-G09` dataset-specific availability contract | Low; aligns with SQL | Low | Task-specific | Low |
| Make all `datasetCompatibility` mismatches hard failures | Medium-high; could hide tasks relying on compatibility hints | Medium | Generic validator | Medium/High |
| Compute/fallback `lifestyle_risk_score` for UCI | Medium; affects multiple lifestyle tasks | Low frontend risk, medium data semantics risk | Generic data feature | Medium |
| Switch card tasks to scatter | High unless outputs become multi-row and non-null | Medium; scatter adapter strict null policy | Task-specific after schema change | High |
| Add radar chart support | Medium; new adapter/view/test surface | Medium-high | Generic new visualization | Medium/High |
| Keep experimental tasks hidden | Low | None | Generic governance behavior | Low |

Preferred risk posture:

- Fix generic bar label rendering first because it addresses many findings with limited behavioral change.
- Fix `A-G09` availability task-specifically before changing validator semantics globally.
- Treat lifestyle composite fields as backend/data contract work, not a frontend rendering workaround.

## 6. Verification Plan

Commands/checks to run after fixes:

```powershell
Set-Location -LiteralPath 'C:\[Graduation_Thesis]Prototype'
npm --prefix Frontend test
```

```powershell
Set-Location -LiteralPath 'C:\[Graduation_Thesis]Prototype'
node Docs/evaluation/scripts/runVisualizationUciPor.mjs
```

```powershell
Set-Location -LiteralPath 'C:\[Graduation_Thesis]Prototype'
node Docs/evaluation/scripts/runApiContractUciPor.mjs
```

Manual API probes:

```powershell
Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:4000/api/tasks/available?datasetId=SAMPLE_UCI_POR&classId=SAMPLE_UCI_POR_CLASS'
```

Specific checks:

- `S-T02`, `A-S05`: chart renders 3 valid rows and visible axis labels.
- `S-T07`: selected dataset block remains `score_series`; absence context is visible somewhere in the UI.
- `A-B01`: histogram still has 10 buckets; x/y labels visible.
- `A-G04`: fail-rate chart labels and tooltip make percent/count semantics clear.
- `A-G09`: UCI POR availability is no longer executable/clickable; no empty clickable chart.
- `A-G12`: y-axis label matches actual y value (`student_count` or `pct_within_group`).
- `A-G13`: either chart valid rows > 0 after deriving `lifestyle_risk_score`, or task is marked insufficient/hidden.
- `S-T04`: still returns 5 checklist rows under timeout threshold.
- `A-G03`: still returns 50 ranked rows under timeout threshold.
- `A-S01`, `A-S08`, `A-G15`, `A-G16`: remain absent from normal UI unless `includeExperimental=true` and availability permits.

Evidence commands already run during this investigation:

- `/api/tasks/available?datasetId=SAMPLE_UCI_POR&classId=SAMPLE_UCI_POR_CLASS&includeExperimental=true`
- `/api/tasks/available?datasetId=SAMPLE_UCI_POR&classId=SAMPLE_UCI_POR_CLASS`
- `/api/analytics/run` for each affected task using first two UCI POR students
- Frontend adapter imports for `bar`, `scatter`, `card`, `table`, and `checklist`
- Registry extraction from `Backend/src/config/taskRegistry.json`

