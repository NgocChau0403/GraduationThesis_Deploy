import * as LineAdapter from "../chartAdapters/line.adapter";
import * as BarAdapter from "../chartAdapters/bar.adapter";
import * as ScatterAdapter from "../chartAdapters/scatter.adapter";
import * as PieAdapter from "../chartAdapters/pie.adapter";
import * as HeatmapAdapter from "../chartAdapters/heatmap.adapter";
import * as TableAdapter from "../chartAdapters/table.adapter";
import * as CardAdapter from "../chartAdapters/card.adapter";
import * as ChecklistAdapter from "../chartAdapters/checklist.adapter";

import LineChartView from "./charts/LineChartView";
import BarChartView from "./charts/BarChartView";
import ScatterChartView from "./charts/ScatterChartView";
import PieChartView from "./charts/PieChartView";
import HeatmapView from "./charts/HeatmapView";
import DataTableView from "./charts/DataTableView";
import MetricCardView from "./charts/MetricCardView";
import ChecklistView from "./charts/ChecklistView";
import {
  deriveChartRequiredFields,
  resolveDatasetForVisualization,
} from "./chartSelectionPolicy";
import { formatDisplayValue } from "../utils/formatDisplayValue";

const ADAPTER_MAP = {
  line_chart: LineAdapter,
  bar_chart: BarAdapter,
  histogram: BarAdapter,
  scatter_plot: ScatterAdapter,
  pie_chart: PieAdapter,
  heatmap: HeatmapAdapter,
  table: TableAdapter,
  card: CardAdapter,
  checklist: ChecklistAdapter,
};

const CHART_MAP = {
  line_chart: LineChartView,
  bar_chart: BarChartView,
  histogram: BarChartView,
  scatter_plot: ScatterChartView,
  pie_chart: PieChartView,
  heatmap: HeatmapView,
  table: DataTableView,
  card: MetricCardView,
  checklist: ChecklistView,
};

export default function ChartRenderer({ taskMeta, datasets, isLoading, error }) {
  if (isLoading) return <ChartSkeleton />;
  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 border border-red-200">
        <p className="text-sm font-semibold text-red-700">
          {taskMeta?.taskId || "Task"} failed
        </p>
        <p className="text-xs text-red-600 mt-1">{error}</p>
      </div>
    );
  }
  if (!taskMeta || !datasets) return null;

  const vizType = taskMeta.viz_type;
  const config = taskMeta.visualization_config || {};
  const chartRequiredFields = deriveChartRequiredFields(taskMeta, config, vizType);

  const resolved = resolveDatasetForVisualization({
    taskMeta,
    datasets,
    config,
    vizType,
    chartRequiredFields,
  });

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

  const adapterConfig = {
    ...config,
    __selected_dataset_label: resolved.selectedDatasetLabel,
  };
  const safeRows = Array.isArray(resolved.rawData) ? resolved.rawData : [];

  let chartData;
  try {
    chartData = adapter.adapt(safeRows, adapterConfig);
  } catch (error) {
    console.error("[ChartRenderer] Adapter crashed", {
      taskId: taskMeta?.taskId,
      vizType,
      selectedDatasetLabel: resolved.selectedDatasetLabel,
      message: error?.message,
    });
    return (
      <div className="p-4 rounded-lg bg-red-50 border border-red-200">
        <p className="text-sm font-semibold text-red-700">Chart render error</p>
        <p className="text-xs text-red-600 mt-1">
          Task <code>{taskMeta?.taskId || "unknown"}</code> returned incompatible chart data.
        </p>
      </div>
    );
  }
  const adapterMeta = chartData?.meta || {};
  const diagnostics = buildDiagnostics({
    vizType,
    rawData: safeRows,
    selectedDatasetLabel: resolved.selectedDatasetLabel,
    chartRequiredFields,
    resolutionWarnings: resolved.warnings,
    adapterMeta,
  });

  const hasProxyRows = safeRows.some(
    (r) => r?.competency_source === "proxy" || r?.competency_source === "unknown"
  );
  const hasNativeRows = safeRows.some((r) => r?.competency_source === "native");
  const showProxyBadge = hasProxyRows && !hasNativeRows;
  const showMixedBadge = hasProxyRows && hasNativeRows;
  const absenceContext = buildAbsenceContext(taskMeta, datasets);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-700">{taskMeta.taskName}</h4>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
          {vizType.replace("_", " ")}
        </span>
      </div>

      {showProxyBadge && <ProxyCompetencyBadge mode="proxy" tooltip={taskMeta.semanticNote} />}
      {showMixedBadge && <ProxyCompetencyBadge mode="mixed" tooltip={taskMeta.semanticNote} />}
      {absenceContext && <AbsenceContextAnnotation context={absenceContext} />}

      {hasRenderableData(vizType, chartData) ? (
        <ChartComponent data={chartData} config={config} />
      ) : (
        <NoDataState
          datasetLabel={resolved.selectedDatasetLabel}
          message="No valid data after applying missing-data policy."
        />
      )}

      <ChartDiagnosticsPanel diagnostics={diagnostics} />
    </div>
  );
}

function buildAbsenceContext(taskMeta, datasets) {
  if (taskMeta?.taskId !== "S-T07") return null;
  const absenceRows = Array.isArray(datasets?.absence_data) ? datasets.absence_data : [];
  const firstRow = absenceRows[0];
  if (!firstRow) return null;

  const absences = firstRow.absences;
  const absenceRate = firstRow.absence_rate;
  const hasAbsences = absences !== null && absences !== undefined && absences !== "";
  const hasAbsenceRate = absenceRate !== null && absenceRate !== undefined && absenceRate !== "";
  if (!hasAbsences && !hasAbsenceRate) return null;

  return {
    absences: hasAbsences ? formatDisplayValue(absences) : null,
    absenceRate: hasAbsenceRate ? formatPercentValue(absenceRate) : null,
  };
}

function formatPercentValue(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return formatDisplayValue(value);
  const pct = numeric <= 1 ? numeric * 100 : numeric;
  return `${Number(pct.toFixed(1))}%`;
}

function buildDiagnostics({
  vizType,
  rawData,
  selectedDatasetLabel,
  chartRequiredFields,
  resolutionWarnings,
  adapterMeta,
}) {
  const baseFieldCounts = {};
  for (const field of chartRequiredFields) {
    baseFieldCounts[field] = Array.isArray(rawData)
      ? rawData.filter((row) => row?.[field] === null || row?.[field] === undefined || row?.[field] === "").length
      : 0;
  }

  const adapterFieldCounts = adapterMeta.missing_field_counts || {};
  const mergedFieldCounts = { ...baseFieldCounts };
  Object.entries(adapterFieldCounts).forEach(([key, value]) => {
    mergedFieldCounts[key] = Math.max(mergedFieldCounts[key] || 0, Number(value) || 0);
  });

  const missingFields = Object.keys(mergedFieldCounts).filter((f) => (mergedFieldCounts[f] || 0) > 0);
  const warnings = [
    ...(resolutionWarnings || []),
    ...(adapterMeta.warnings || []),
  ];

  const validRows = Number.isFinite(adapterMeta.valid_rows)
    ? adapterMeta.valid_rows
    : Array.isArray(rawData)
      ? rawData.length
      : 0;
  const skippedRows = Number.isFinite(adapterMeta.skipped_rows)
    ? adapterMeta.skipped_rows
    : 0;

  return {
    chart_type: vizType,
    selected_dataset_label: selectedDatasetLabel,
    null_handling_policy:
      adapterMeta.null_handling_policy ||
      "real zero is preserved; null/missing is not coerced",
    valid_rows: validRows,
    skipped_rows: skippedRows,
    missing_fields: missingFields,
    missing_field_counts: mergedFieldCounts,
    warnings,
  };
}

function hasRenderableData(vizType, chartData) {
  if (!chartData) return false;
  if (vizType === "scatter_plot") {
    return Array.isArray(chartData.series) && chartData.series.some((s) => Array.isArray(s.data) && s.data.length > 0);
  }
  if (vizType === "heatmap") {
    return Array.isArray(chartData.cells) && chartData.cells.some((c) => c.value !== null && c.value !== undefined);
  }
  if (vizType === "card") {
    if (chartData.type === "risk_status") return true;
    return Array.isArray(chartData.items) && chartData.items.length > 0;
  }
  if (vizType === "checklist") {
    return Array.isArray(chartData.items) && chartData.items.length > 0;
  }
  if (vizType === "table") {
    return Array.isArray(chartData.rows) && chartData.rows.length > 0;
  }
  return Array.isArray(chartData.data) && chartData.data.length > 0;
}

function NoDataState({ datasetLabel, message }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
      <p className="text-sm font-medium text-slate-600">{message}</p>
      <p className="text-xs text-slate-500 mt-2">
        Dataset block: <span className="font-mono">{datasetLabel || "none"}</span>
      </p>
    </div>
  );
}

function ChartDiagnosticsPanel({ diagnostics }) {
  if (!diagnostics) return null;
  const {
    selected_dataset_label,
    valid_rows,
    skipped_rows,
    missing_fields,
    missing_field_counts,
    null_handling_policy,
    warnings,
  } = diagnostics;
  const hasMissingRows = skipped_rows > 0 || missing_fields.length > 0;
  const hasWarnings = warnings.length > 0;
  if (!hasMissingRows && !hasWarnings) return null;
  const missingSummary = missing_fields
    .map((f) => `${f}=${missing_field_counts[f] ?? 0}`)
    .join(", ");

  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="text-[11px] text-slate-600 grid grid-cols-1 sm:grid-cols-2 gap-1">
        <p>
          Dataset block: <span className="font-mono text-slate-700">{selected_dataset_label || "none"}</span>
        </p>
        <p>
          Valid rows: <span className="font-semibold text-slate-700">{valid_rows}</span>
        </p>
        {skipped_rows > 0 && (
          <p>
            Skipped rows: <span className="font-semibold text-slate-700">{skipped_rows}</span>
          </p>
        )}
      </div>

      {missing_fields.length > 0 && (
        <p className="text-[11px] text-slate-500 mt-1">
          Missing values filtered: <span className="font-mono text-slate-600">{missingSummary}</span>
        </p>
      )}

      <p className="text-[11px] text-slate-500 mt-1">
        Null policy: <span className="font-mono text-slate-600">{formatDisplayValue(null_handling_policy)}</span>
      </p>

      {hasWarnings && (
        <ul className="mt-2 space-y-1 text-[11px] text-amber-700">
          {warnings.map((warning, idx) => (
            <li key={`${formatDisplayValue(warning)}-${idx}`}>- {formatDisplayValue(warning)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
      <span>{isProxy ? "!" : "i"}</span>
      <span>
        {isProxy
          ? "Competency Mode: Derived from assessment structure"
          : "Competency Mode: Mixed (native + proxy)"}
      </span>
    </div>
  );
}

function AbsenceContextAnnotation({ context }) {
  return (
    <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {context.absences !== null && (
        <div className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-sky-700">Absences</p>
          <p className="mt-1 text-sm font-bold text-slate-800">{context.absences}</p>
        </div>
      )}
      {context.absenceRate !== null && (
        <div className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-sky-700">Absence Rate</p>
          <p className="mt-1 text-sm font-bold text-slate-800">{context.absenceRate}</p>
        </div>
      )}
    </div>
  );
}

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
