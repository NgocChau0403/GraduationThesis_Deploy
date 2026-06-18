import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const MANIFEST_PATH = path.join(
  PROJECT_ROOT,
  "Docs/evaluation_v1/ai_explanation_full_matrix/manifest.expected.json"
);
const OUTPUT_DIR = path.join(PROJECT_ROOT, "Docs/evaluation_v2/LLMJudgeV2/outputs");
const RECORDS_PATH = path.join(OUTPUT_DIR, "row_count_records.jsonl");
const DISTRIBUTION_JSON_PATH = path.join(OUTPUT_DIR, "row_count_distribution.json");
const DISTRIBUTION_MD_PATH = path.join(OUTPUT_DIR, "row_count_distribution.md");

const DEFAULT_DATASETS = ["SAMPLE_UCI_POR", "SAMPLE_OULAD"];
const MODES = ["baseline_first_20_rows", "task_aware_data_summarization"];

function parseArgs(argv) {
  const args = {
    baseUrl: "http://localhost:4000",
    datasetIds: DEFAULT_DATASETS,
    taskIds: null,
    requestTimeoutMs: 30000,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === "--base-url") args.baseUrl = next.replace(/\/+$/, ""), i += 1;
    else if (arg === "--dataset-ids") args.datasetIds = splitList(next), i += 1;
    else if (arg === "--task-ids") args.taskIds = splitList(next), i += 1;
    else if (arg === "--request-timeout-ms") args.requestTimeoutMs = Number(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function readJson(filePath) {
  const text = await readFile(filePath, "utf8");
  return JSON.parse(text.replace(/^\uFEFF/, ""));
}

async function requestJson(url, options = {}) {
  const startedAt = performance.now();
  let response = null;
  let body = null;
  const timeoutMs = options.timeoutMs ?? 30000;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        ...(options.headers || {}),
      },
    });
    try {
      body = await response.json();
    } catch {
      body = null;
    }
  } catch (error) {
    return {
      ok: false,
      http_status: response?.status ?? null,
      latency_ms: Math.round(performance.now() - startedAt),
      body: null,
      transport_error: error.name === "AbortError" ? `request_timeout_after_${timeoutMs}ms` : error.message,
    };
  } finally {
    clearTimeout(timeout);
  }

  return {
    ok: response.ok,
    http_status: response.status,
    latency_ms: Math.round(performance.now() - startedAt),
    body,
    transport_error: null,
  };
}

function pickEvaluationClass(classes = [], datasetManifest) {
  const defaultClassId = datasetManifest?.default_class_id ?? null;
  return classes.find((classInfo) => classInfo.class_id === defaultClassId)
    || [...classes].sort((a, b) => (b.student_count || 0) - (a.student_count || 0))[0]
    || null;
}

function buildRunParams({ datasetId, classInfo, students }) {
  const first = students[0] || {};
  const second = students.find((student) => student.student_id !== first.student_id) || students[1] || {};
  return {
    batch_id: datasetId,
    class_id: classInfo?.class_id || null,
    student_id: first.student_id || null,
    enrollment_id: first.enrollment_id || null,
    s1: first.student_id || null,
    s2: second.student_id || null,
  };
}

function getDatasetBreakdown(datasets) {
  if (!datasets || typeof datasets !== "object" || Array.isArray(datasets)) return [];
  return Object.entries(datasets).map(([label, rows]) => ({
    label,
    row_count: Array.isArray(rows) ? rows.length : null,
    sample_fields: Array.isArray(rows) && rows[0] && typeof rows[0] === "object"
      ? Object.keys(rows[0]).slice(0, 20)
      : [],
  }));
}

function getPrimaryRowCount(datasetBreakdown) {
  const rowCounts = datasetBreakdown
    .map((item) => item.row_count)
    .filter((value) => Number.isInteger(value));
  if (rowCounts.length === 0) return null;
  if (rowCounts.length === 1) return rowCounts[0];
  return rowCounts.reduce((sum, value) => sum + value, 0);
}

function bucketFor(rowCount, status) {
  if (status === "not_scoreable") return "not_scoreable";
  if (status !== "scoreable" || !Number.isInteger(rowCount)) return "unknown";
  return rowCount <= 20 ? "<=20" : ">20";
}

function inferTaskRole(taskId) {
  return taskId.startsWith("S-") ? "student" : "admin";
}

function toNotScoreableReason(analyticsRes) {
  if (analyticsRes?.transport_error) return "query_failed";
  if (analyticsRes?.http_status !== 200) return "query_failed";
  if (analyticsRes?.body?.success === false) return "query_failed";
  return "other_not_scoreable";
}

async function loadDatasetRuntime({ baseUrl, datasetId, datasetManifest }) {
  const classesRes = await requestJson(`${baseUrl}/api/classes?batchId=${encodeURIComponent(datasetId)}`);
  if (!classesRes.ok || !Array.isArray(classesRes.body?.classes)) {
    throw new Error(`Cannot fetch classes for ${datasetId}. HTTP ${classesRes.http_status}.`);
  }

  const classInfo = pickEvaluationClass(classesRes.body.classes, datasetManifest);
  if (!classInfo?.class_id) throw new Error(`No evaluation class found for ${datasetId}.`);

  const studentsRes = await requestJson(
    `${baseUrl}/api/students?batchId=${encodeURIComponent(datasetId)}&classId=${encodeURIComponent(classInfo.class_id)}&pageSize=200`
  );
  if (!studentsRes.ok || !Array.isArray(studentsRes.body?.students)) {
    throw new Error(`Cannot fetch students for ${datasetId}/${classInfo.class_id}. HTTP ${studentsRes.http_status}.`);
  }

  return {
    classInfo,
    students: studentsRes.body.students,
    params: buildRunParams({ datasetId, classInfo, students: studentsRes.body.students }),
  };
}

async function runAnalyticsOnce({ baseUrl, datasetId, taskId, params, requestTimeoutMs }) {
  const analyticsRequest = { taskId, params };
  const analyticsRes = await requestJson(`${baseUrl}/api/analytics/run`, {
    method: "POST",
    body: JSON.stringify(analyticsRequest),
    timeoutMs: requestTimeoutMs,
  });

  const scoreable = analyticsRes.http_status === 200 && analyticsRes.body?.success === true;
  const datasetBreakdown = scoreable ? getDatasetBreakdown(analyticsRes.body?.datasets) : [];
  const rowCount = scoreable ? getPrimaryRowCount(datasetBreakdown) : null;
  const status = scoreable && Number.isInteger(rowCount) ? "scoreable" : "not_scoreable";

  return { analyticsRes, datasetBreakdown, rowCount, status };
}

function buildModeRecord({ baseUrl, datasetId, taskId, mode, params, generatedAt, analyticsResult }) {
  const { analyticsRes, datasetBreakdown, rowCount, status } = analyticsResult;
  return {
    evaluation_version: "llm_judge_v2_phase3_row_count",
    dataset_id: datasetId,
    class_id: params.class_id,
    student_id: inferTaskRole(taskId) === "student" ? params.student_id : null,
    role: inferTaskRole(taskId),
    task_id: taskId,
    mode,
    status,
    row_count: status === "scoreable" ? rowCount : null,
    row_count_bucket: bucketFor(rowCount, status),
    not_scoreable_reason: status === "scoreable" ? null : toNotScoreableReason(analyticsRes),
    dataset_breakdown: datasetBreakdown,
    source: {
      query_executed: true,
      generated_at: generatedAt,
      backend_url: baseUrl,
      endpoint: "/api/analytics/run",
      http_status: analyticsRes.http_status,
      latency_ms: analyticsRes.latency_ms,
      transport_error: analyticsRes.transport_error,
      analytics_success: analyticsRes.body?.success === true,
      analytics_error: analyticsRes.body?.error ?? null,
    },
  };
}

function emptyDatasetSummary(datasetId) {
  return {
    dataset_id: datasetId,
    total_records: 0,
    scoreable_records: 0,
    not_scoreable_records: 0,
    failed_records: 0,
    row_count_lte_20: 0,
    row_count_gt_20: 0,
    unknown: 0,
    unique_tasks_total: 0,
    unique_tasks_scoreable: 0,
    unique_tasks_lte_20: 0,
    unique_tasks_gt_20: 0,
    unique_tasks_not_scoreable: 0,
  };
}

function summarize(records, { generatedAt, baseUrl, taskIds, datasetIds }) {
  const byDataset = new Map(datasetIds.map((datasetId) => [datasetId, emptyDatasetSummary(datasetId)]));

  for (const record of records) {
    const summary = byDataset.get(record.dataset_id) || emptyDatasetSummary(record.dataset_id);
    byDataset.set(record.dataset_id, summary);

    summary.total_records += 1;
    if (record.status === "scoreable") summary.scoreable_records += 1;
    else if (record.status === "failed") summary.failed_records += 1;
    else summary.not_scoreable_records += 1;

    if (record.row_count_bucket === "<=20") summary.row_count_lte_20 += 1;
    else if (record.row_count_bucket === ">20") summary.row_count_gt_20 += 1;
    else if (record.row_count_bucket === "unknown") summary.unknown += 1;
  }

  for (const [datasetId, summary] of byDataset) {
    const datasetRecords = records.filter((record) => record.dataset_id === datasetId);
    const byTask = new Map();
    for (const record of datasetRecords) {
      if (!byTask.has(record.task_id)) byTask.set(record.task_id, []);
      byTask.get(record.task_id).push(record);
    }
    summary.unique_tasks_total = byTask.size;
    for (const taskRecords of byTask.values()) {
      if (taskRecords.some((record) => record.status === "scoreable")) summary.unique_tasks_scoreable += 1;
      if (taskRecords.some((record) => record.row_count_bucket === "<=20")) summary.unique_tasks_lte_20 += 1;
      else if (taskRecords.some((record) => record.row_count_bucket === ">20")) summary.unique_tasks_gt_20 += 1;
      else summary.unique_tasks_not_scoreable += 1;
    }
  }

  const totals = [...byDataset.values()].reduce((acc, item) => {
    for (const key of [
      "total_records",
      "scoreable_records",
      "not_scoreable_records",
      "failed_records",
      "row_count_lte_20",
      "row_count_gt_20",
      "unknown",
      "unique_tasks_total",
      "unique_tasks_scoreable",
      "unique_tasks_lte_20",
      "unique_tasks_gt_20",
      "unique_tasks_not_scoreable",
    ]) {
      acc[key] += item[key];
    }
    return acc;
  }, {
    total_records: 0,
    scoreable_records: 0,
    not_scoreable_records: 0,
    failed_records: 0,
    row_count_lte_20: 0,
    row_count_gt_20: 0,
    unknown: 0,
    unique_tasks_total: 0,
    unique_tasks_scoreable: 0,
    unique_tasks_lte_20: 0,
    unique_tasks_gt_20: 0,
    unique_tasks_not_scoreable: 0,
  });

  return {
    artifact_type: "llm_judge_v2_phase3_row_count_distribution",
    generated_at: generatedAt,
    backend_url: baseUrl,
    record_grain: "dataset_id + task_id + mode",
    row_count_definition: "If /api/analytics/run returns one dataset array, use that array length. If it returns multiple dataset arrays, use the sum of their row counts and preserve per-dataset breakdown in dataset_breakdown.",
    datasets: datasetIds,
    modes: MODES,
    task_count: taskIds.length,
    expected_records: datasetIds.length * taskIds.length * MODES.length,
    actual_records: records.length,
    by_dataset: [...byDataset.values()],
    totals,
  };
}

function renderMarkdown(summary) {
  const lines = [
    "# LLM Judge V2 Phase 3 Row-Count Distribution",
    "",
    `- Generated at: ${summary.generated_at}`,
    `- Backend URL: ${summary.backend_url}`,
    `- Record grain: ${summary.record_grain}`,
    `- Task count: ${summary.task_count}`,
    `- Modes: ${summary.modes.join(", ")}`,
    `- Expected records: ${summary.expected_records}`,
    `- Actual records: ${summary.actual_records}`,
    "",
    "## Row-Count Definition",
    "",
    summary.row_count_definition,
    "",
    "## Dataset Summary",
    "",
    "| Dataset | Total records | Scoreable records | row_count <= 20 | row_count > 20 | Not scoreable | Unique tasks | Unique tasks <= 20 | Unique tasks > 20 | Unique tasks not scoreable |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
  ];

  for (const item of summary.by_dataset) {
    lines.push(`| ${item.dataset_id} | ${item.total_records} | ${item.scoreable_records} | ${item.row_count_lte_20} | ${item.row_count_gt_20} | ${item.not_scoreable_records} | ${item.unique_tasks_total} | ${item.unique_tasks_lte_20} | ${item.unique_tasks_gt_20} | ${item.unique_tasks_not_scoreable} |`);
  }

  lines.push(`| Total | ${summary.totals.total_records} | ${summary.totals.scoreable_records} | ${summary.totals.row_count_lte_20} | ${summary.totals.row_count_gt_20} | ${summary.totals.not_scoreable_records} | ${summary.totals.unique_tasks_total} | ${summary.totals.unique_tasks_lte_20} | ${summary.totals.unique_tasks_gt_20} | ${summary.totals.unique_tasks_not_scoreable} |`);
  lines.push(
    "",
    "## Interpretation Note",
    "",
    "For records in the `row_count <= 20` bucket, `baseline_first_20_rows` already has full row coverage. Any later task-aware improvement in that bucket should be interpreted as better task framing, evidence organization, or wording rather than better raw row coverage.",
    "",
    "For records in the `row_count > 20` bucket, `baseline_first_20_rows` may lose evidence due to truncation. This is the group where task-aware summarization has a direct evidence-selection advantage.",
    ""
  );

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const generatedAt = new Date().toISOString();
  const manifest = await readJson(MANIFEST_PATH);
  const manifestDatasetIds = new Set((manifest.datasets ?? []).map((dataset) => dataset.dataset_id));
  const datasetIds = args.datasetIds.filter((datasetId) => manifestDatasetIds.has(datasetId));
  if (datasetIds.length !== args.datasetIds.length) {
    throw new Error(`Unknown dataset id in: ${args.datasetIds.join(", ")}`);
  }

  const taskIds = args.taskIds ?? manifest.task_ids ?? [];
  if (taskIds.length === 0) throw new Error("No task ids selected.");

  await mkdir(OUTPUT_DIR, { recursive: true });

  const healthRes = await requestJson(`${args.baseUrl}/api/health`, { timeoutMs: args.requestTimeoutMs });
  if (!healthRes.ok) {
    throw new Error(`Backend health check failed: ${healthRes.transport_error ?? healthRes.http_status}`);
  }

  const records = [];
  for (const datasetId of datasetIds) {
    const datasetManifest = (manifest.datasets ?? []).find((dataset) => dataset.dataset_id === datasetId);
    const runtime = await loadDatasetRuntime({
      baseUrl: args.baseUrl,
      datasetId,
      datasetManifest,
    });

    for (const taskId of taskIds) {
      console.log(`[phase3] ${datasetId} ${taskId}`);
      const analyticsResult = await runAnalyticsOnce({
        baseUrl: args.baseUrl,
        datasetId,
        taskId,
        params: runtime.params,
        requestTimeoutMs: args.requestTimeoutMs,
      });
      for (const mode of MODES) {
        records.push(buildModeRecord({
          baseUrl: args.baseUrl,
          datasetId,
          taskId,
          mode,
          params: runtime.params,
          generatedAt,
          analyticsResult,
        }));
      }
    }
  }

  const summary = summarize(records, {
    generatedAt,
    baseUrl: args.baseUrl,
    taskIds,
    datasetIds,
  });

  await writeFile(RECORDS_PATH, `${records.map((record) => JSON.stringify(record)).join("\n")}\n`, "utf8");
  await writeFile(DISTRIBUTION_JSON_PATH, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
  await writeFile(DISTRIBUTION_MD_PATH, renderMarkdown(summary), "utf8");

  console.log(JSON.stringify({
    ok: true,
    records: records.length,
    row_count_records: path.relative(PROJECT_ROOT, RECORDS_PATH).replaceAll(path.sep, "/"),
    row_count_distribution_json: path.relative(PROJECT_ROOT, DISTRIBUTION_JSON_PATH).replaceAll(path.sep, "/"),
    row_count_distribution_md: path.relative(PROJECT_ROOT, DISTRIBUTION_MD_PATH).replaceAll(path.sep, "/"),
    totals: summary.totals,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
