# Phase 1 Debug Architecture Map

## Task availability logic
- Backend task list filters: `/Backend/src/controllers/tasks.controller.js` (`datasetCompatibility`, `scope`, `analysis`, `registry_status`).
- Runtime capability validation: `/Backend/src/services/capabilityValidator.service.js`.
- API gating routes: `/Backend/src/routes/task.routes.js`.
- Frontend availability assumptions:
  - `/Frontend/src/components/analytics/TaskListPanel.jsx`
  - `/Frontend/src/pages/StudentDashboardPage.jsx`
  - `/Frontend/src/pages/AdminDashboardPage.jsx`

## Capability validator layers
- Layer A structural: required table existence check.
- Layer B semantic: required capabilities, FE field population, dataset compatibility fallback.
- Layer C analytical: warning-only analytical quality checks.
- Layer D data sufficiency: enrollment/result/engagement thresholds + confidence.

## Canonical schema and profile generation
- Import profiling: `/Backend/src/services/profiling.service.js`.
- Dataset type/role detection: `/Backend/src/services/schemaDetect.service.js`.
- Canonical field system:
  - `/Backend/src/config/canonicalFields.js`
  - `/Backend/src/config/canonicalFieldAliases.js`
  - `/Backend/src/services/mappingSuggest.service.js`
  - `/Backend/src/services/mappingValidation.service.js`

## Output schema usage
- Contract validation point: `/Backend/src/services/outputSchema.service.js`.
- Runtime invocation: `/Backend/src/controllers/analytics.controller.js`.

## Visualization rendering flow
- API call: `runAnalyticsTask` in `/Frontend/src/services/analyticsApi.js`.
- Rendering orchestration: `/Frontend/src/components/ChartRenderer.jsx`.
- Adapter modules:
  - `/Frontend/src/chartAdapters/line.adapter.js`
  - `/Frontend/src/chartAdapters/bar.adapter.js`
  - `/Frontend/src/chartAdapters/scatter.adapter.js`
  - `/Frontend/src/chartAdapters/pie.adapter.js`
  - `/Frontend/src/chartAdapters/heatmap.adapter.js`
  - `/Frontend/src/chartAdapters/table.adapter.js`
  - `/Frontend/src/chartAdapters/card.adapter.js`
  - `/Frontend/src/chartAdapters/checklist.adapter.js`

## Missing/null transformations (high-observability hotspots)
- Adapter defaults and coercions (e.g. `Number(...) || 0`, `"Unknown"`) in chart adapters.
- Display formatting fallback in `/Frontend/src/utils/responseTransformer.js`.
- SQL-level `COALESCE` in task queries (`/Backend/src/config/taskRegistry.json`).

## Runtime debug probes added in Phase 1
- Script runner: `/Backend/src/debug/phase1_task_debug_runner.mjs`.
- Failure classifier: `/Backend/src/debug/failure_classifier.mjs`.
- Outputs:
  - `Docs/phase1_debug_report_<timestamp>.json`
  - `Docs/phase1_debug_summary_<timestamp>.md`
