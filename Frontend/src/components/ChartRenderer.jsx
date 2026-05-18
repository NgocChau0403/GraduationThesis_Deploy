/**
 * ChartRenderer.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Dynamic chart renderer — viz_type-driven routing.
 *
 * 3-layer separation:
 *   1. Adapter (chartAdapters/) — raw SQL rows → chart-library format (pure functions)
 *   2. Chart component (charts/) — pure rendering, receives adapted data
 *   3. ChartRenderer (this) — orchestration, picks adapter + component. Zero business logic.
 *
 * viz_type is determined by task metadata — NOT by user choice or AI.
 * This is the Deterministic Visualization Orchestration principle.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import * as LineAdapter    from "../chartAdapters/line.adapter";
import * as BarAdapter     from "../chartAdapters/bar.adapter";
import * as ScatterAdapter from "../chartAdapters/scatter.adapter";
import * as PieAdapter     from "../chartAdapters/pie.adapter";
import * as HeatmapAdapter from "../chartAdapters/heatmap.adapter";
import * as TableAdapter   from "../chartAdapters/table.adapter";
import * as CardAdapter    from "../chartAdapters/card.adapter";

import LineChartView    from "./charts/LineChartView";
import BarChartView     from "./charts/BarChartView";
import ScatterChartView from "./charts/ScatterChartView";
import PieChartView     from "./charts/PieChartView";
import HeatmapView      from "./charts/HeatmapView";
import DataTableView    from "./charts/DataTableView";
import MetricCardView   from "./charts/MetricCardView";

// ── Adapter Map: viz_type → adapter module ──────────────────────────────────
const ADAPTER_MAP = {
  line_chart:   LineAdapter,
  bar_chart:    BarAdapter,
  histogram:    BarAdapter,      // histogram uses bar adapter with continuous x
  scatter_plot: ScatterAdapter,
  pie_chart:    PieAdapter,
  heatmap:      HeatmapAdapter,
  table:        TableAdapter,
  card:         CardAdapter,
};

// ── Chart Map: viz_type → React component ───────────────────────────────────
const CHART_MAP = {
  line_chart:   LineChartView,
  bar_chart:    BarChartView,
  histogram:    BarChartView,
  scatter_plot: ScatterChartView,
  pie_chart:    PieChartView,
  heatmap:      HeatmapView,
  table:        DataTableView,
  card:         MetricCardView,
};

/**
 * @param {Object} props
 * @param {Object} props.taskMeta  — Task metadata (includes viz_type, visualization_config, query_labels)
 * @param {Object} props.datasets  — Analytics response datasets { "label": [...rows] }
 * @param {boolean} props.isLoading — Show skeleton while loading
 */
export default function ChartRenderer({ taskMeta, datasets, isLoading }) {
  // ── Loading skeleton ──────────────────────────────────────────────────
  if (isLoading) {
    return <ChartSkeleton />;
  }

  // ── Guard: no data ────────────────────────────────────────────────────
  if (!taskMeta || !datasets) return null;

  const vizType = taskMeta.viz_type;
  const config = taskMeta.visualization_config || {};

  // ── Dataset resolution ─────────────────────────────────────────────────
  //
  // After Bug #5 fix, all scatter_plot tasks use a single JOIN query and
  // return ONE dataset containing all needed columns.
  //
  // Defensive merge for scatter_plot with multiple datasets (fallback):
  //   If query_labels has > 1 entry and viz_type is scatter_plot, we merge
  //   all datasets by row index so the adapter sees all fields in one array.
  //   This prevents blank charts if any task regresses to the multi-query
  //   pattern (e.g., Q0={x_field}, Q1={y_field}).
  const primaryLabel = taskMeta.query_labels?.[0] ?? "data";
  let rawData = datasets[primaryLabel] ?? [];

  if (
    vizType === "scatter_plot" &&
    Array.isArray(taskMeta.query_labels) &&
    taskMeta.query_labels.length > 1
  ) {
    const maxLen = taskMeta.query_labels.reduce(
      (max, lbl) => Math.max(max, (datasets[lbl] ?? []).length), 0
    );
    const merged = [];
    for (let i = 0; i < maxLen; i++) {
      const row = {};
      taskMeta.query_labels.forEach(lbl => {
        Object.assign(row, (datasets[lbl] ?? [])[i] ?? {});
      });
      merged.push(row);
    }
    rawData = merged;
  }

  // Resolve adapter and component
  const adapter = ADAPTER_MAP[vizType];
  const ChartComponent = CHART_MAP[vizType];

  if (!adapter || !ChartComponent) {
    return (
      <div className="p-6 rounded-lg bg-amber-50 border border-amber-200 text-center">
        <p className="text-sm text-amber-700 font-medium">
          Unsupported visualization type: <code className="font-mono">{vizType}</code>
        </p>
        <p className="text-xs text-amber-500 mt-1">
          Supported types: {Object.keys(CHART_MAP).join(", ")}
        </p>
      </div>
    );
  }

  // Detect proxy competency from data rows (data-driven — no taskId hardcoding)
  // competency_source is injected by SQL CASE expression in S-T02, A-S05, A-G04
  const hasProxyRows  = rawData.some(r => r?.competency_source === "proxy" || r?.competency_source === "unknown");
  const hasNativeRows = rawData.some(r => r?.competency_source === "native");
  const showProxyBadge = hasProxyRows && !hasNativeRows;
  const showMixedBadge = hasProxyRows && hasNativeRows;

  // Transform: raw SQL rows → chart-library format
  const chartData = adapter.adapt(rawData, config);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      {/* Chart title + type badge */}
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-700">
          {taskMeta.taskName}
        </h4>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
          {vizType.replace("_", " ")}
        </span>
      </div>

      {/* Proxy competency badge */}
      {showProxyBadge && (
        <ProxyCompetencyBadge
          mode="proxy"
          tooltip={taskMeta.semanticNote}
        />
      )}
      {showMixedBadge && (
        <ProxyCompetencyBadge
          mode="mixed"
          tooltip={taskMeta.semanticNote}
        />
      )}

      {/* Chart body */}
      <ChartComponent data={chartData} config={config} />

      {/* Data source info */}
      <div className="mt-2 text-[10px] text-slate-400 text-right">
        {rawData.length} data points • {primaryLabel}
      </div>
    </div>
  );
}

// ── Proxy Competency Badge ──────────────────────────────────────────────────
/**
 * Renders a badge when competency data is derived from assessment names (proxy)
 * rather than a native competency ontology.
 *
 * Disappears automatically when dataset provides real competency_tag values.
 *
 * @param {'proxy'|'mixed'} mode
 * @param {string|null}     tooltip  — from taskMeta.semanticNote
 */
function ProxyCompetencyBadge({ mode, tooltip }) {
  const isProxy = mode === "proxy";
  return (
    <div
      title={tooltip || undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        marginBottom: "10px",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 500,
        cursor: tooltip ? "help" : "default",
        backgroundColor: isProxy ? "#fffbeb" : "#eff6ff",
        border: isProxy ? "1px solid #f59e0b" : "1px solid #93c5fd",
        color: isProxy ? "#92400e" : "#1e40af",
      }}
    >
      <span>{isProxy ? "⚠" : "ℹ"}</span>
      <span>
        {isProxy
          ? "Competency Mode: Derived from assessment structure"
          : "Competency Mode: Mixed (native + proxy)"}
      </span>
    </div>
  );
}

// ── Loading Skeleton ────────────────────────────────────────────────────────
function ChartSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-pulse">
      <div className="h-4 w-48 bg-slate-200 rounded mb-4" />
      <div className="h-[340px] bg-slate-100 rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500" />
          <span className="text-xs text-slate-400">Loading chart...</span>
        </div>
      </div>
    </div>
  );
}
