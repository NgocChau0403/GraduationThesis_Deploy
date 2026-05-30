import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import * as LineAdapter from "../../../Frontend/src/chartAdapters/line.adapter.js";
import * as BarAdapter from "../../../Frontend/src/chartAdapters/bar.adapter.js";
import * as ScatterAdapter from "../../../Frontend/src/chartAdapters/scatter.adapter.js";
import * as PieAdapter from "../../../Frontend/src/chartAdapters/pie.adapter.js";
import * as HeatmapAdapter from "../../../Frontend/src/chartAdapters/heatmap.adapter.js";
import * as TableAdapter from "../../../Frontend/src/chartAdapters/table.adapter.js";
import * as CardAdapter from "../../../Frontend/src/chartAdapters/card.adapter.js";
import * as ChecklistAdapter from "../../../Frontend/src/chartAdapters/checklist.adapter.js";
import {
  deriveChartRequiredFields,
  resolveDatasetForVisualization,
} from "../../../Frontend/src/components/chartSelectionPolicy.js";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";
const DATASET_ID = "SAMPLE_UCI_POR";
const OUTPUT_DIR = path.resolve("Docs/evaluation/automatic_logs");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "visualization_auto_SAMPLE_UCI_POR.json");

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

async function requestJson(url, options = {}) {
  const startedAt = performance.now();
  let response;
  let body;

  try {
    response = await fetch(url, {
      ...options,
      headers: {
        "content-type": "application/json",
        ...(options.headers || {}),
      },
    });
    body = await response.json();
  } catch (error) {
    return {
      ok: false,
      httpStatus: response?.status ?? null,
      latencyMs: Math.round(performance.now() - startedAt),
      body: null,
      transportError: error.message,
    };
  }

  return {
    ok: response.ok,
    httpStatus: response.status,
    latencyMs: Math.round(performance.now() - startedAt),
    body,
    transportError: null,
  };
}

function pickPrimaryClass(classes = []) {
  return [...classes].sort((a, b) => (b.student_count || 0) - (a.student_count || 0))[0] || null;
}

function buildRunParams({ classInfo, students }) {
  const first = students[0] || {};
  const second = students.find((student) => student.student_id !== first.student_id) || students[1] || {};

  return {
    batch_id: DATASET_ID,
    class_id: classInfo?.class_id || null,
    student_id: first.student_id || null,
    enrollment_id: first.enrollment_id || null,
    s1: first.student_id || null,
    s2: second.student_id || null,
  };
}

function getChartRowCount(vizType, chartData) {
  if (!chartData) return 0;
  if (vizType === "scatter_plot") {
    return (chartData.series || []).reduce((sum, series) => {
      return sum + (Array.isArray(series.data) ? series.data.length : 0);
    }, 0);
  }
  if (vizType === "heatmap") return Array.isArray(chartData.cells) ? chartData.cells.length : 0;
  if (vizType === "table") return Array.isArray(chartData.rows) ? chartData.rows.length : 0;
  if (vizType === "card") {
    if (chartData.type === "risk_status") return 1;
    return Array.isArray(chartData.items) ? chartData.items.length : 0;
  }
  if (vizType === "checklist") return Array.isArray(chartData.items) ? chartData.items.length : 0;
  return Array.isArray(chartData.data) ? chartData.data.length : 0;
}

function hasRenderableData(vizType, chartData) {
  if (!chartData) return false;
  if (vizType === "scatter_plot") {
    return Array.isArray(chartData.series)
      && chartData.series.some((series) => Array.isArray(series.data) && series.data.length > 0);
  }
  if (vizType === "heatmap") {
    return Array.isArray(chartData.cells)
      && chartData.cells.some((cell) => cell.value !== null && cell.value !== undefined);
  }
  if (vizType === "card") {
    if (chartData.type === "risk_status") return true;
    return Array.isArray(chartData.items) && chartData.items.length > 0;
  }
  if (vizType === "checklist") return Array.isArray(chartData.items) && chartData.items.length > 0;
  if (vizType === "table") return Array.isArray(chartData.rows) && chartData.rows.length > 0;
  return Array.isArray(chartData.data) && chartData.data.length > 0;
}

function listDatasetLabels(datasets) {
  return datasets && typeof datasets === "object" && !Array.isArray(datasets)
    ? Object.keys(datasets)
    : [];
}

function getRawRows(datasets, label) {
  return Array.isArray(datasets?.[label]) ? datasets[label] : [];
}

function expectedNoData({ availabilityStatus, rawRows, renderable }) {
  if (renderable) return false;
  if (rawRows.length === 0) return true;
  return availabilityStatus === "insufficient_data" || availabilityStatus === "partial";
}

function validateAdapterConsistency({ rawRows, chartData, chartRequiredFields }) {
  const meta = chartData?.meta || {};
  const requiredFieldsTracked =
    chartRequiredFields.length === 0
    || rawRows.length === 0
    || chartRequiredFields.every((field) =>
      Object.prototype.hasOwnProperty.call(meta.missing_field_counts || {}, field)
      || rawRows.some((row) => Object.prototype.hasOwnProperty.call(row || {}, field))
    );

  const checks = {
    adapter_returned_object: chartData && typeof chartData === "object" && !Array.isArray(chartData),
    has_meta_object: meta && typeof meta === "object" && !Array.isArray(meta),
    input_rows_match: Number(meta.input_rows || 0) === rawRows.length,
    valid_rows_number: Number.isFinite(Number(meta.valid_rows || 0)),
    skipped_rows_number: Number.isFinite(Number(meta.skipped_rows || 0)),
    missing_fields_array: Array.isArray(meta.missing_fields),
    warnings_array: Array.isArray(meta.warnings),
  };

  return {
    pass: Object.values(checks).every(Boolean),
    checks: {
      ...checks,
      required_fields_tracked: requiredFieldsTracked,
    },
  };
}

function compactAdapterMeta(meta) {
  if (!meta || typeof meta !== "object") return null;
  const warnings = Array.isArray(meta.warnings) ? meta.warnings : [];
  return {
    ...meta,
    warnings: warnings.slice(0, 20),
    warning_count: warnings.length,
    warnings_truncated: warnings.length > 20,
  };
}

function summarizeMetrics(results) {
  const attempted = results.filter((item) => item.visualization_attempted);
  const adapterCrashed = attempted.filter((item) => item.adapter_crashed);
  const renderable = attempted.filter((item) => item.renderable);
  const expectedEmpty = attempted.filter((item) => item.expected_no_data);
  const passed = attempted.filter((item) => item.result === "pass");
  const datasetSelectionPassed = attempted.filter((item) => item.dataset_selection_pass);
  const adapterConsistencyPassed = attempted.filter((item) => item.adapter_consistency_pass);
  const skippedByApi = results.filter((item) => item.skip_reason === "analytics_api_failed_or_not_success");

  const pct = (part, total) => total > 0 ? Number(((part / total) * 100).toFixed(2)) : null;

  return {
    total_tasks_seen: results.length,
    visualization_attempted: attempted.length,
    skipped_by_api_count: skippedByApi.length,
    adapter_crash_count: adapterCrashed.length,
    adapter_success_rate: pct(attempted.length - adapterCrashed.length, attempted.length),
    rendering_success_count: renderable.length,
    rendering_success_rate: pct(renderable.length, attempted.length),
    expected_no_data_count: expectedEmpty.length,
    expected_no_data_rate: pct(expectedEmpty.length, attempted.length),
    dataset_selection_pass_count: datasetSelectionPassed.length,
    dataset_selection_pass_rate: pct(datasetSelectionPassed.length, attempted.length),
    adapter_consistency_pass_count: adapterConsistencyPassed.length,
    adapter_consistency_pass_rate: pct(adapterConsistencyPassed.length, attempted.length),
    overall_pass_count: passed.length,
    overall_pass_rate: pct(passed.length, attempted.length),
  };
}

async function main() {
  const startedAt = new Date();

  const taskRes = await requestJson(`${BACKEND_URL}/api/tasks?includeExperimental=true`);
  if (!taskRes.ok || !Array.isArray(taskRes.body?.tasks)) {
    throw new Error(`Cannot fetch tasks from ${BACKEND_URL}/api/tasks. Status: ${taskRes.httpStatus}`);
  }

  const classesRes = await requestJson(`${BACKEND_URL}/api/classes?batchId=${encodeURIComponent(DATASET_ID)}`);
  if (!classesRes.ok || !Array.isArray(classesRes.body?.classes)) {
    throw new Error(`Cannot fetch classes for ${DATASET_ID}. Status: ${classesRes.httpStatus}`);
  }

  const classInfo = pickPrimaryClass(classesRes.body.classes);
  if (!classInfo?.class_id) throw new Error(`No class found for ${DATASET_ID}.`);

  const studentsUrl = `${BACKEND_URL}/api/students?batchId=${encodeURIComponent(DATASET_ID)}&classId=${encodeURIComponent(classInfo.class_id)}&pageSize=200`;
  const studentsRes = await requestJson(studentsUrl);
  if (!studentsRes.ok || !Array.isArray(studentsRes.body?.students)) {
    throw new Error(`Cannot fetch students for ${DATASET_ID}/${classInfo.class_id}. Status: ${studentsRes.httpStatus}`);
  }

  const params = buildRunParams({ classInfo, students: studentsRes.body.students });
  const results = [];

  for (const task of taskRes.body.tasks) {
    const taskId = task.taskId || task.id;
    if (!taskId) continue;

    const vizType = task.viz_type;
    const adapter = ADAPTER_MAP[vizType];
    const config = task.visualization_config || {};

    const validateUrl = `${BACKEND_URL}/api/tasks/validate-one/${encodeURIComponent(taskId)}?datasetId=${encodeURIComponent(DATASET_ID)}&classId=${encodeURIComponent(classInfo.class_id)}`;
    const validation = await requestJson(validateUrl);
    const availability = validation.body?.result || null;
    const availabilityStatus = availability?.status || "validation_failed";

    const baseRecord = {
      datasetId: DATASET_ID,
      taskId,
      taskName: task.taskName || null,
      scope: task.scope || null,
      viz_type: vizType || null,
      class_id: classInfo.class_id,
      availability_status: availabilityStatus,
      validation_http_status: validation.httpStatus,
      visualization_attempted: false,
    };

    if (!adapter) {
      results.push({
        ...baseRecord,
        skip_reason: "unsupported_viz_type",
        result: "skip",
      });
      continue;
    }

    if (availabilityStatus === "unsupported") {
      results.push({
        ...baseRecord,
        skip_reason: "task_unsupported_by_dataset",
        result: "skip",
      });
      continue;
    }

    const runRes = await requestJson(`${BACKEND_URL}/api/analytics/run`, {
      method: "POST",
      body: JSON.stringify({ taskId, params }),
    });

    if (runRes.httpStatus !== 200 || runRes.body?.success !== true) {
      results.push({
        ...baseRecord,
        analytics_http_status: runRes.httpStatus,
        analytics_error: runRes.transportError || runRes.body?.error || null,
        skip_reason: "analytics_api_failed_or_not_success",
        result: "skip",
      });
      continue;
    }

    const datasets = runRes.body.datasets || {};
    const chartRequiredFields = deriveChartRequiredFields(task, config, vizType);
    const resolved = resolveDatasetForVisualization({
      taskMeta: task,
      datasets,
      config,
      vizType,
      chartRequiredFields,
    });
    const rawRows = getRawRows(datasets, resolved.selectedDatasetLabel);
    const adapterConfig = {
      ...config,
      __selected_dataset_label: resolved.selectedDatasetLabel,
    };

    let chartData = null;
    let adapterError = null;
    const adapterStartedAt = performance.now();
    try {
      chartData = adapter.adapt(rawRows, adapterConfig);
    } catch (error) {
      adapterError = error.message;
    }
    const adapterLatencyMs = Number((performance.now() - adapterStartedAt).toFixed(3));

    const adapterCrashed = Boolean(adapterError);
    const renderable = !adapterCrashed && hasRenderableData(vizType, chartData);
    const noDataExpected = !adapterCrashed && expectedNoData({
      availabilityStatus,
      rawRows,
      renderable,
    });
    const consistency = adapterCrashed
      ? { pass: false, checks: {} }
      : validateAdapterConsistency({ rawRows, chartData, chartRequiredFields });
    const datasetSelectionPass = Boolean(
      resolved.selectedDatasetLabel
      && Object.prototype.hasOwnProperty.call(datasets, resolved.selectedDatasetLabel)
      && Array.isArray(datasets[resolved.selectedDatasetLabel])
    );

    const result = !adapterCrashed
      && datasetSelectionPass
      && consistency.pass
      && (renderable || noDataExpected)
      ? "pass"
      : "fail";

    results.push({
      ...baseRecord,
      analytics_http_status: runRes.httpStatus,
      visualization_attempted: true,
      available_dataset_labels: listDatasetLabels(datasets),
      selected_dataset_label: resolved.selectedDatasetLabel,
      selection_warnings: resolved.warnings || [],
      chart_required_fields: chartRequiredFields,
      api_row_count: rawRows.length,
      chart_row_count: getChartRowCount(vizType, chartData),
      adapter_latency_ms: adapterLatencyMs,
      adapter_crashed: adapterCrashed,
      adapter_error: adapterError,
      renderable,
      expected_no_data: noDataExpected,
      dataset_selection_pass: datasetSelectionPass,
      adapter_consistency_pass: consistency.pass,
      adapter_checks: consistency.checks,
      adapter_meta: compactAdapterMeta(chartData?.meta),
      result,
    });
  }

  const output = {
    evaluation_part: "visualization_correctness",
    datasetId: DATASET_ID,
    backend_url: BACKEND_URL,
    generated_at: new Date().toISOString(),
    duration_ms: Date.now() - startedAt.getTime(),
    context: {
      class: classInfo,
      student_count_loaded: studentsRes.body.students.length,
      params_used: params,
    },
    metrics: summarizeMetrics(results),
    results,
  };

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  console.log(`Visualization auto log written: ${OUTPUT_FILE}`);
  console.log(JSON.stringify(output.metrics, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
