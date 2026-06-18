import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const MANIFEST_PATH = path.join(
  PROJECT_ROOT,
  "Docs/evaluation_v1/ai_explanation_full_matrix/manifest.expected.json"
);
const PHASE3_RECORDS_PATH = path.join(
  PROJECT_ROOT,
  "Docs/evaluation_v2/LLMJudgeV2/outputs/row_count_records.jsonl"
);
const TASK_REGISTRY_PATH = path.join(
  PROJECT_ROOT,
  "backend/src/config/taskRegistry.json"
);
const OUTPUT_DIR = path.join(PROJECT_ROOT, "Docs/evaluation_v2/LLMJudgeV2/outputs");
const OUTPUT_JSON_PATH = path.join(OUTPUT_DIR, "small_result_runtime_verification.json");
const OUTPUT_MD_PATH = path.join(OUTPUT_DIR, "small_result_runtime_verification.md");

const CASES = [
  { dataset_id: "SAMPLE_UCI_POR", task_id: "A-B01", expected_bucket: "<=20" },
  { dataset_id: "SAMPLE_UCI_POR", task_id: "A-G02", expected_bucket: ">20" },
  { dataset_id: "SAMPLE_OULAD", task_id: "A-B01", expected_bucket: "<=20" },
  { dataset_id: "SAMPLE_OULAD", task_id: "A-S03", expected_bucket: ">20" },
];

function parseArgs(argv) {
  const args = {
    baseUrl: "http://localhost:4000",
    aiServiceUrl: "http://localhost:8000",
    requestTimeoutMs: 60000,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--base-url") args.baseUrl = next.replace(/\/+$/, ""), i += 1;
    else if (arg === "--ai-service-url") {
      args.aiServiceUrl = next.replace(/\/+$/, "");
      i += 1;
    }
    else if (arg === "--request-timeout-ms") args.requestTimeoutMs = Number(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

async function readJson(filePath) {
  return JSON.parse((await readFile(filePath, "utf8")).replace(/^\uFEFF/, ""));
}

async function requestJson(url, options = {}) {
  const startedAt = performance.now();
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? 60000;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        ...(options.headers || {}),
      },
    });
    let body = null;
    try {
      body = await response.json();
    } catch {
      body = null;
    }
    return {
      ok: response.ok,
      http_status: response.status,
      latency_ms: Math.round(performance.now() - startedAt),
      body,
      transport_error: null,
    };
  } catch (error) {
    return {
      ok: false,
      http_status: null,
      latency_ms: Math.round(performance.now() - startedAt),
      body: null,
      transport_error: error.name === "AbortError"
        ? `request_timeout_after_${timeoutMs}ms`
        : error.message,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function pickEvaluationClass(classes = [], datasetManifest) {
  const defaultClassId = datasetManifest?.default_class_id ?? null;
  return classes.find((item) => item.class_id === defaultClassId)
    || [...classes].sort((a, b) => (b.student_count || 0) - (a.student_count || 0))[0]
    || null;
}

function buildRunParams({ datasetId, classInfo, students }) {
  const first = students[0] || {};
  const second = students.find((student) => student.student_id !== first.student_id)
    || students[1]
    || {};
  return {
    batch_id: datasetId,
    class_id: classInfo?.class_id || null,
    student_id: first.student_id || null,
    enrollment_id: first.enrollment_id || null,
    s1: first.student_id || null,
    s2: second.student_id || null,
  };
}

function datasetBreakdown(datasets) {
  if (!datasets || typeof datasets !== "object" || Array.isArray(datasets)) return [];
  return Object.entries(datasets).map(([dataset_name, rows]) => ({
    dataset_name,
    row_count: Array.isArray(rows) ? rows.length : 0,
  }));
}

function totalRowCount(datasets) {
  return datasetBreakdown(datasets).reduce((sum, item) => sum + item.row_count, 0);
}

function toSnakeCase(value) {
  return value
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase();
}

function buildAiSummaryConfig(task) {
  if (!task?.aiSummaryType) return null;
  const config = {};
  for (const [key, value] of Object.entries(task)) {
    if (!key.startsWith("ai") || key === "aiPromptHint" || value === undefined) continue;
    config[toSnakeCase(key.slice(2))] = value;
  }
  return config;
}

function buildDirectAiPayload(task, analytics) {
  const dataQuality = analytics.meta?.dataQuality || {};
  return {
    task_id: task.taskId,
    execution_id: analytics.executionId,
    task_name: task.taskName,
    analysis_type: task.analytics?.analysisType ?? null,
    explanation_strategy: task.explanation_strategy,
    explanation_type: task.analytics?.explanationType ?? null,
    ai_prompt_hint: task.aiPromptHint ?? null,
    actionable_question: task.actionableQuestion ?? null,
    target_audience: task.target_audience,
    visualization_config: task.visualization_config ?? null,
    analysis_context: task.analysis_context ?? null,
    datasets: analytics.datasets,
    confidence: {
      level: dataQuality.confidence ?? "LOW",
      reason: dataQuality.confidence_reason ?? "Unknown.",
    },
    student_context: null,
    query_labels: task.query_labels ?? analytics.meta?.query_labels ?? [],
    semantic_context: null,
    ai_summary_config: buildAiSummaryConfig(task),
  };
}

async function loadDatasetRuntime({ baseUrl, datasetId, datasetManifest, timeoutMs }) {
  const classes = await requestJson(
    `${baseUrl}/api/classes?batchId=${encodeURIComponent(datasetId)}`,
    { timeoutMs }
  );
  if (!classes.ok || !Array.isArray(classes.body?.classes)) {
    throw new Error(`Cannot load classes for ${datasetId}: HTTP ${classes.http_status}`);
  }
  const classInfo = pickEvaluationClass(classes.body.classes, datasetManifest);
  if (!classInfo?.class_id) throw new Error(`No evaluation class found for ${datasetId}`);

  const students = await requestJson(
    `${baseUrl}/api/students?batchId=${encodeURIComponent(datasetId)}`
      + `&classId=${encodeURIComponent(classInfo.class_id)}&pageSize=200`,
    { timeoutMs }
  );
  if (!students.ok || !Array.isArray(students.body?.students)) {
    throw new Error(`Cannot load students for ${datasetId}: HTTP ${students.http_status}`);
  }
  return {
    classInfo,
    params: buildRunParams({
      datasetId,
      classInfo,
      students: students.body.students,
    }),
  };
}

function phase3ExpectedCounts(records) {
  const result = new Map();
  for (const record of records) {
    if (record.mode !== "task_aware_data_summarization") continue;
    result.set(`${record.dataset_id}:${record.task_id}`, record.row_count);
  }
  return result;
}

function evaluateCase({
  spec,
  analytics,
  ai,
  proxyAi,
  verificationTransport,
  phase3RowCount,
}) {
  const errors = [];
  const runtimeRowCount = totalRowCount(analytics.body?.datasets);
  const expectedApplied = runtimeRowCount <= 20;
  const response = ai.body || {};

  if (!analytics.ok || analytics.body?.success !== true) {
    errors.push(`analytics_failed_http_${analytics.http_status}`);
  }
  if (!ai.ok) errors.push(`ai_request_failed_http_${ai.http_status}`);
  if (response.degraded === true) errors.push("ai_response_degraded");
  if (response.ai_summary_method !== "task_aware_data_summarization") {
    errors.push(`unexpected_ai_summary_method_${response.ai_summary_method ?? "missing"}`);
  }
  if (response.full_result_row_count !== runtimeRowCount) {
    errors.push(
      `full_result_row_count_expected_${runtimeRowCount}_observed_${response.full_result_row_count ?? "missing"}`
    );
  }
  if (response.small_result_threshold !== 20) {
    errors.push(`small_result_threshold_expected_20_observed_${response.small_result_threshold ?? "missing"}`);
  }
  if (response.small_result_full_rows_applied !== expectedApplied) {
    errors.push(
      `small_result_applied_expected_${expectedApplied}_observed_`
      + `${response.small_result_full_rows_applied ?? "missing"}`
    );
  }
  if (expectedApplied) {
    if (response.input_summary_type !== "full_rows_due_to_small_result") {
      errors.push(`small_result_summary_type_observed_${response.input_summary_type ?? "missing"}`);
    }
    if (response.included_row_count !== runtimeRowCount) {
      errors.push(
        `included_row_count_expected_${runtimeRowCount}_observed_${response.included_row_count ?? "missing"}`
      );
    }
  } else if (
    !response.input_summary_type
    || response.input_summary_type === "full_rows_due_to_small_result"
  ) {
    errors.push(`large_result_did_not_preserve_task_aware_summary_type`);
  }
  if (phase3RowCount !== undefined && phase3RowCount !== runtimeRowCount) {
    errors.push(`phase3_row_count_${phase3RowCount}_runtime_row_count_${runtimeRowCount}`);
  }
  const observedBucket = runtimeRowCount <= 20 ? "<=20" : ">20";
  if (observedBucket !== spec.expected_bucket) {
    errors.push(`expected_bucket_${spec.expected_bucket}_observed_${observedBucket}`);
  }

  return {
    dataset_id: spec.dataset_id,
    task_id: spec.task_id,
    expected_bucket: spec.expected_bucket,
    phase3_row_count: phase3RowCount ?? null,
    runtime_row_count: runtimeRowCount,
    analytics_dataset_breakdown: datasetBreakdown(analytics.body?.datasets),
    analytics_http_status: analytics.http_status,
    analytics_latency_ms: analytics.latency_ms,
    execution_id: analytics.body?.executionId ?? null,
    verification_transport: verificationTransport,
    proxy_ai_http_status: proxyAi.http_status,
    proxy_ai_latency_ms: proxyAi.latency_ms,
    proxy_ai_degraded: proxyAi.body?.degraded ?? null,
    ai_http_status: ai.http_status,
    ai_latency_ms: ai.latency_ms,
    degraded: response.degraded ?? null,
    ai_summary_method: response.ai_summary_method ?? null,
    input_summary_type: response.input_summary_type ?? null,
    full_result_row_count: response.full_result_row_count ?? null,
    included_row_count: response.included_row_count ?? null,
    small_result_threshold: response.small_result_threshold ?? null,
    small_result_full_rows_applied: response.small_result_full_rows_applied ?? null,
    dataset_row_breakdown: response.dataset_row_breakdown ?? [],
    model: response.meta?.model ?? null,
    errors,
    passed: errors.length === 0,
  };
}

function markdown(report) {
  const lines = [
    "# Phase 4d Real-Task Runtime Verification",
    "",
    `- Generated at: ${report.generated_at}`,
    `- Backend: ${report.backend_url}`,
    "- Runtime path: `POST /api/analytics/run` then `POST /api/ai/explain`.",
    "- Timeout fallback: when the Node proxy returns degraded at 15 seconds, the same real analytics payload is sent directly to `POST http://localhost:8000/explain` using task metadata from the runtime registry.",
    "- Required mode: `task_aware_data_summarization`",
    `- Result: ${report.passed ? "PASS" : "FAIL"} (${report.passed_cases}/${report.total_cases})`,
    "",
    "## Cases",
    "",
    "| Dataset | Task | Phase 3 rows | Runtime rows | Verification transport | Input summary type | Small rule applied | Included rows | Degraded | Pass |",
    "| --- | --- | ---: | ---: | --- | --- | --- | ---: | --- | --- |",
  ];
  for (const item of report.cases) {
    lines.push(
      `| ${item.dataset_id} | ${item.task_id} | ${item.phase3_row_count ?? ""}`
      + ` | ${item.runtime_row_count} | ${item.verification_transport}`
      + ` | ${item.input_summary_type ?? ""}`
      + ` | ${String(item.small_result_full_rows_applied)}`
      + ` | ${item.included_row_count ?? ""} | ${String(item.degraded)}`
      + ` | ${item.passed ? "PASS" : "FAIL"} |`
    );
  }
  lines.push("", "## Interpretation", "");
  lines.push(
    "For real query results with 20 rows or fewer, the runtime response must report "
    + "`input_summary_type=full_rows_due_to_small_result`, apply the rule, and include every row."
  );
  lines.push("");
  lines.push(
    "For results above 20 rows, the runtime response must keep the task-specific summary type "
    + "and report `small_result_full_rows_applied=false`."
  );
  if (!report.passed) {
    lines.push("", "## Failures", "");
    for (const item of report.cases.filter((entry) => !entry.passed)) {
      lines.push(`- ${item.dataset_id}/${item.task_id}: ${item.errors.join("; ")}`);
    }
  }
  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const manifest = await readJson(MANIFEST_PATH);
  const taskRegistry = await readJson(TASK_REGISTRY_PATH);
  const tasksById = new Map(taskRegistry.map((task) => [task.taskId, task]));
  const phase3Records = (await readFile(PHASE3_RECORDS_PATH, "utf8"))
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  const expectedCounts = phase3ExpectedCounts(phase3Records);
  const runtimeByDataset = new Map();
  const results = [];

  for (const spec of CASES) {
    if (!runtimeByDataset.has(spec.dataset_id)) {
      const datasetManifest = manifest.datasets?.find(
        (item) => item.dataset_id === spec.dataset_id
      );
      runtimeByDataset.set(
        spec.dataset_id,
        await loadDatasetRuntime({
          baseUrl: args.baseUrl,
          datasetId: spec.dataset_id,
          datasetManifest,
          timeoutMs: args.requestTimeoutMs,
        })
      );
    }
    const runtime = runtimeByDataset.get(spec.dataset_id);
    const task = tasksById.get(spec.task_id);
    if (!task) throw new Error(`Task ${spec.task_id} not found in runtime registry`);
    process.stdout.write(`Running ${spec.dataset_id}/${spec.task_id}... `);
    const analytics = await requestJson(`${args.baseUrl}/api/analytics/run`, {
      method: "POST",
      body: JSON.stringify({ taskId: spec.task_id, params: runtime.params }),
      timeoutMs: args.requestTimeoutMs,
    });
    const proxyAi = analytics.ok && analytics.body?.success === true
      ? await requestJson(`${args.baseUrl}/api/ai/explain`, {
        method: "POST",
        body: JSON.stringify({
          taskId: spec.task_id,
          executionId: analytics.body.executionId,
          datasets: analytics.body.datasets,
          meta: analytics.body.meta,
        }),
        timeoutMs: args.requestTimeoutMs,
      })
      : {
        ok: false,
        http_status: null,
        latency_ms: 0,
        body: null,
        transport_error: "skipped_after_analytics_failure",
      };
    let ai = proxyAi;
    let verificationTransport = "backend_proxy";
    if (
      analytics.ok
      && analytics.body?.success === true
      && (proxyAi.body?.degraded === true || proxyAi.body?.ai_summary_method === "unavailable")
    ) {
      verificationTransport = "direct_ai_service_after_proxy_timeout";
      ai = await requestJson(`${args.aiServiceUrl}/explain`, {
        method: "POST",
        body: JSON.stringify(buildDirectAiPayload(task, analytics.body)),
        timeoutMs: args.requestTimeoutMs,
      });
    }
    const result = evaluateCase({
      spec,
      analytics,
      ai,
      proxyAi,
      verificationTransport,
      phase3RowCount: expectedCounts.get(`${spec.dataset_id}:${spec.task_id}`),
    });
    results.push(result);
    console.log(result.passed ? "PASS" : `FAIL (${result.errors.join(", ")})`);
  }

  const report = {
    evaluation_version: "llm_judge_v2_phase4d_runtime_verification",
    generated_at: new Date().toISOString(),
    backend_url: args.baseUrl,
    ai_summary_method_required: "task_aware_data_summarization",
    total_cases: results.length,
    passed_cases: results.filter((item) => item.passed).length,
    failed_cases: results.filter((item) => !item.passed).length,
    passed: results.every((item) => item.passed),
    cases: results,
  };
  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(OUTPUT_JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(OUTPUT_MD_PATH, markdown(report), "utf8");
  console.log(`JSON: ${OUTPUT_JSON_PATH}`);
  console.log(`Markdown: ${OUTPUT_MD_PATH}`);
  if (!report.passed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
