# Final Debug Validation Report

Source inputs:
- `agents/reports/phase-2-task-availability.md`
- `agents/reports/phase-3-chart-validation.md`
- `agents/reports/phase-4-end-to-end-debug.md`

## Critical Bugs

### Issue C1: Dataset-coupled gating + SQL hard-code on intervention ranking
- Task: `A-G15 - Intervention priority ranking`
- Evidence:
  - Phase 2 marks `Severity: Critical`, `datasetCompatibility=OULAD_only`, `fallbackStrategy=hide_task`, and dependency `SQL hard-coded source_dataset=OULAD`.
  - Phase 4 confirms task executes only in OULAD context (`SAMPLE_OULAD`) and depends on engagement+risk signals.
- Root cause:
  - Availability and SQL semantics are tied to dataset name, not only capability/schema presence.
- Impact on insight:
  - Task can be hidden/unavailable for non-OULAD datasets even if equivalent schema fields exist; reduces cross-dataset generalization and can suppress critical intervention insight.
- Severity: `Critical`
- Recommended fix:
  - Replace name-based gating with capability/field contract (`required_all/required_any`) and remove dataset-name predicate from SQL where possible.
- Manual verification needed:
  - Validate task on a non-OULAD dataset that has equivalent fields (`engagement_count`, `submission_day`, outcomes) and confirm task is shown/partially-run with warnings instead of hidden.

### Issue C2: Dataset-coupled early withdrawal analysis
- Task: `A-G14 - Early withdrawal signal analysis`
- Evidence:
  - Phase 2 marks `Severity: Critical`, notes `SQL hard-coded source_dataset=OULAD`, `datasetCompatibility=OULAD_only`, `fallbackStrategy=hide_task`.
  - Phase 4 runtime shows execution in OULAD only and large adapter row reduction (`161 -> 41`, skipped 120).
- Root cause:
  - SQL and metadata rely on dataset identity and a strict hide policy.
- Impact on insight:
  - Dropout signal monitoring can be unavailable outside OULAD even with usable clickstream schema; critical retention signal may be absent.
- Severity: `Critical`
- Recommended fix:
  - Convert to schema-driven contract and allow partial mode with explicit warning when temporal engagement quality is low.
- Manual verification needed:
  - Run same task against alternate dataset with temporal engagement fields; verify visible task state and meaningful partial output.

## High Issues

### Issue H1: Division-by-zero risk in outcome summary percentage
- Task: `A-B02 - Completion / outcome summary`
- Evidence:
  - Phase 3 flags `Potential division-by-zero risk`.
  - Phase 4 `Issue found: Potential division by zero (division without NULLIF guard in SQL)` in query preview.
- Root cause:
  - Percentage denominator in SQL is computed without explicit defensive `NULLIF` guard in at least one path.
- Impact on insight:
  - `pct_of_class` may fail or produce invalid metric under edge cases (empty/filtered cohorts), corrupting completion/outcome interpretation.
- Severity: `High`
- Recommended fix:
  - Guard denominator in percentage calculation and define behavior for zero-denominator cohorts.
- Manual verification needed:
  - Execute task on tiny/edge cohort (0 rows after filter) and verify API response + chart behavior.

### Issue H2: Null-to-zero coercion in risk overview metric path
- Task: `A-B04 - At-risk overview`
- Evidence:
  - Phase 3 and phase 4 both flag `Potential null->0 semantic coercion risk` / `Potential null converted to 0 via COALESCE(...,0)`.
- Root cause:
  - SQL-level `COALESCE(...,0)` may conflate “missing” with real zero for risk feature inputs.
- Impact on insight:
  - Risk counts/segments may understate uncertainty and overstate confidence of low-risk segments.
- Severity: `High`
- Recommended fix:
  - Preserve missingness for semantically uncertain factors and expose data-quality warning instead of coercing to 0 in all paths.
- Manual verification needed:
  - Compare outputs with/without missing engagement/punctuality fields; confirm risk buckets and counts.

### Issue H3: Null-to-zero coercion in engagement distribution scoring
- Task: `A-B03 - Engagement distribution`
- Evidence:
  - Phase 4 flags `Potential null converted to 0 via COALESCE(...,0)`.
  - SQL preview includes COALESCE around normalized engagement score terms.
- Root cause:
  - Missing engagement components are collapsed to 0 during scoring.
- Impact on insight:
  - Students with missing activity may be indistinguishable from truly low-engagement students.
- Severity: `High`
- Recommended fix:
  - Add explicit “insufficient engagement data” branch and separate distribution bucket from true low activity.
- Manual verification needed:
  - Inject rows with null engagement components and verify classification differences.

## Task Availability Issues

### Issue A1: hide_task used where runtime supports partial/insufficient_data
- Task: `A-B04`, `A-G14`, `A-G15` (and similar hide_task tasks in phase 2)
- Evidence:
  - Phase 2 repeatedly notes `hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings`.
  - Runtime policy in phase 2 baseline: only `unsupported` is hard blocked; `partial` and `insufficient_data` can still run.
- Root cause:
  - Registry fallback strategy is stricter than actual runtime execution capability.
- Impact on insight:
  - Users may lose partial-but-useful analytics visibility.
- Severity: `High`
- Recommended fix:
  - Align fallback metadata with runtime policy: prefer “show with warning” over hide for non-structural failures.
- Manual verification needed:
  - Force semantic/data-sufficiency degradations and confirm task remains visible with diagnostic message.

### Issue A2: Legacy datasetCompatibility without explicit contract in multiple tasks
- Task: `A-G14`, `A-G15`, several `*_only` tasks in phase 2
- Evidence:
  - Phase 2 marks repeated pattern: datasetCompatibility-only gating, absent/partial `availability_contract`.
- Root cause:
  - Legacy metadata (`datasetCompatibility`) still drives exposure decisions more than field-level capability contract.
- Impact on insight:
  - Low portability and opaque unavailability reasons.
- Severity: `High`
- Recommended fix:
  - Standardize `availability_contract` for all restricted tasks with explicit required/optional capability rules.
- Manual verification needed:
  - Compare visibility decisions before/after contract-only evaluation across 2 datasets.

## Chart Correctness Issues

### Issue CH1: Major row loss in multi-series trend adapter pipeline
- Task: `A-G14 - Early withdrawal signal analysis`
- Evidence:
  - Phase 4: `Rows before adapter: 161`, `Rows after adapter: 41`, `skipped_rows: 120`.
- Root cause:
  - Adapter/grouping transformation collapses/filters rows heavily in current selected dataset rendering path.
- Impact on insight:
  - Trend shape may not reflect full SQL result density; user may infer weaker variability than actual data.
- Severity: `High`
- Recommended fix:
  - Add explicit diagnostics in UI about dropped/collapsed rows and whether collapse is by design (grouping) or missing-field skip.
- Manual verification needed:
  - Cross-check plotted points against raw data table for same task and class.

### Issue CH2: Table visualizations rely on weak contract for semantic correctness
- Task: `A-G15`, `A-C03`, `S-T17`, and other `viz_type=table` tasks lacking strong `output_schema.required_columns`
- Evidence:
  - Phase 3 repeatedly states: `Table adapter does not enforce semantic types; relies on backend schema/output contract`.
- Root cause:
  - Table adapter is permissive by design; missing explicit contract increases risk of silent semantic drift.
- Impact on insight:
  - Table can render structurally valid but semantically wrong columns/units without hard failure.
- Severity: `Medium`
- Recommended fix:
  - Define strict required columns + unit metadata for each table task.
- Manual verification needed:
  - Remove/rename one critical column in staging response and verify API/renderer fail-fast behavior.

### Issue CH3: 0-1 vs 0-100 scale ambiguity for rate-like metrics
- Task: Cross-task (notably risk/engagement/performance charts)
- Evidence:
  - Phase 3 repeatedly flags `verify 0-1 vs 0-100 semantics`.
  - Phase 4 shows mixed metric families and formatted percentages in different places.
- Root cause:
  - Unit/scale is not consistently encoded in task metadata + adapter contract.
- Impact on insight:
  - Users may misread magnitude and trend severity.
- Severity: `Medium`
- Recommended fix:
  - Add unit metadata per metric and enforce formatter by unit type.
- Manual verification needed:
  - Validate display of the same metric across raw/API/chart against expected unit.

## Data Handling Issues

### Issue D1: Missing category normalization may hide upstream data quality defects
- Task: `A-B02` and other pie/category charts
- Evidence:
  - Phase 3 notes: pie adapter maps missing category to `Unknown`; may merge small slices into `Other`.
- Root cause:
  - Visualization fallback prioritizes readability over strict category integrity.
- Impact on insight:
  - Data quality problems can be visually softened and not immediately actionable.
- Severity: `Medium`
- Recommended fix:
  - Keep fallback, but add explicit quality badge: count of unknown/merged categories.
- Manual verification needed:
  - Inject missing categories and verify unknown/other counters are shown.

### Issue D2: Null handling behavior differs by chart type and can alter interpretation
- Task: Cross-task (`line`, `bar`, `table`, `card`, `checklist`)
- Evidence:
  - Phase 3: line keeps null as gap; bar/scatter skip invalid rows; table renders null as dash; card may show unknown states.
- Root cause:
  - Type-specific adapter policies are consistent technically but not always surfaced clearly to users.
- Impact on insight:
  - Two charts over similar data can communicate different implied completeness.
- Severity: `Medium`
- Recommended fix:
  - Standardize and display per-chart data-quality diagnostics (skipped rows, null-gaps, unknown states).
- Manual verification needed:
  - Use same dataset slice across chart types and compare diagnostics + rendered conclusions.

### Issue D3: Potential data loss not clearly surfaced in runtime UX
- Task: `A-G14` (confirmed), others with adapter filtering risk
- Evidence:
  - Phase 4 captures row changes and skipped rows; default chart UX still renders without strong warning.
- Root cause:
  - Diagnostics exist in adapter metadata but user-facing emphasis is limited.
- Impact on insight:
  - User may trust chart at face value without noticing substantial dropped rows.
- Severity: `High`
- Recommended fix:
  - Promote row-loss diagnostics to prominent warning banner in chart panel for high drop ratios.
- Manual verification needed:
  - Confirm warning triggers when skipped/input ratio exceeds threshold (e.g., >20%).

## Highlight Summary (Requested Focus)
- Data loss:
  - Confirmed significant runtime row reduction for `A-G14` (`161 -> 41`, skipped 120).
- Null handling:
  - Null-to-zero coercion risk in `A-B04`, `A-B03`; mixed null handling semantics across adapters.
- Division by zero:
  - Explicit risk flagged for `A-B02` percentage logic.
- Dataset dependency:
  - Critical in `A-G14`, `A-G15` (and high in several `*_only` tasks) due to dataset name dependency + strict fallback.
