# Fix Pass 2 - Task Availability Improvements

Scope fixed:
- A-G14
- A-G15
- A-B03

## Files changed
- `C:\[Graduation_Thesis]Prototype\Backend\src\config\taskRegistry.json`

## A-B03 (Engagement distribution)

Before behavior:
- `datasetCompatibility`: `OULAD_only`
- `fallbackStrategy`: `hide_task`
- No explicit `availability_contract`
- SQL had hard dataset filter: `AND e.source_dataset = 'OULAD'`

After behavior:
- `datasetCompatibility`: `both`
- `fallbackStrategy`: `show_partial_with_warnings`
- Added `availability_contract`:
  - `required_all`: `engagement_tracking`
  - `optional_enrichments`: `temporal_activity`
  - `chart_required_fields`: `study_effort_level`, `student_count`
- Removed hard dataset-name filter in SQL (`source_dataset='OULAD'`) to reduce unnecessary dataset coupling.

Effect:
- Availability is now capability-driven first (engagement capability), with partial-friendly fallback instead of hide.

## A-G14 (Early withdrawal signal analysis)

Before behavior:
- `datasetCompatibility`: `OULAD_only`
- `fallbackStrategy`: `hide_task`
- No explicit `availability_contract` (dataset gating depended mainly on legacy compatibility + SQL assumptions)

After behavior:
- Kept `datasetCompatibility`: `OULAD_only` (constraint still intentional)
- `fallbackStrategy`: `show_unavailable_with_reason`
- Added explicit `availability_contract`:
  - `required_all`: `engagement_tracking`, `temporal_activity`, `final_outcome`
  - `chart_required_fields`: `week_number`, `avg_clicks`, `final_outcome`
  - `dataset_specific`:
    - `source_dataset`: `OULAD`
    - reason: task depends on OULAD week-level engagement patterns and outcome labels

Effect:
- Non-structural unavailability is now explainable to UI/user (reason-forward) instead of hard hide.
- Dataset-specific dependency is explicit in runtime contract, not only implicit in legacy metadata.

## A-G15 (Intervention priority ranking)

Before behavior:
- `datasetCompatibility`: `OULAD_only`
- `fallbackStrategy`: `hide_task`
- No explicit `availability_contract`
- SQL had hard punctuality dataset filter: `AND e.source_dataset = 'OULAD'`

After behavior:
- `datasetCompatibility`: `both`
- `fallbackStrategy`: `show_partial_with_warnings`
- Added `availability_contract`:
  - `required_all`: `assessment_scores`, `engagement_tracking`
  - `optional_enrichments`: `submission_timestamps`, `demographics`, `final_outcome`
  - `chart_required_fields`: `student_id`, `at_risk_score`, `at_risk_label`
- Removed hard dataset-name filter in punctuality CTE (`source_dataset='OULAD'`) to reduce unnecessary dataset coupling.

Effect:
- Task can remain visible and run in partial mode when optional enrichments are weak/missing.
- Availability is more schema/capability-based and less name-based.

## Remaining dataset-specific constraints

- `A-G14` remains explicitly dataset-specific to OULAD by design (availability contract `dataset_specific`).
- `A-B03` and `A-G15` no longer rely on hard dataset-name filters in their SQL for availability-critical paths.
- Other tasks outside this scoped pass still contain dataset-specific logic and were not changed.

## Manual verification steps

1. Validate registry JSON:
   - `node -e "const fs=require('fs'); JSON.parse(fs.readFileSync('C:/[Graduation_Thesis]Prototype/Backend/src/config/taskRegistry.json','utf8')); console.log('JSON_OK');"`
2. Re-run debug runtime:
   - `Set-Location -LiteralPath 'C:\[Graduation_Thesis]Prototype\Backend'`
   - `node .\src\debug\phase4_e2e_debug.mjs`
3. Check report output:
   - `agents/reports/phase-4-end-to-end-debug.md`
4. Confirm for scoped tasks:
   - `A-B03`: status 200, task executable in tested OULAD context, no hide behavior metadata.
   - `A-G14`: explicit dataset-specific unavailable path now has reason-ready contract + non-hide fallback strategy.
   - `A-G15`: status 200 in tested context; SQL no longer contains punctuality dataset-name filter.
5. (Optional cross-dataset manual test)
   - run `/api/analytics/run` with a UCI `batch_id` for `A-B03` and `A-G15` to confirm capability-based availability + partial/warning behavior in UI.

## Runtime sanity check (post-change)

- Re-ran: `Backend/src/debug/phase4_e2e_debug.mjs`
- Result: script completed and rewrote `agents/reports/phase-4-end-to-end-debug.md`
- Scoped tasks remained runnable in current OULAD sample context (`status=200` where applicable in run path).
