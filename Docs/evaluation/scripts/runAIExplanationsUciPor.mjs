import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";
const DATASET_ID = process.env.DATASET_ID || "Import_2026-06-06";
const TARGET_CLASS_ID = process.env.CLASS_ID || "3cbbfb86ebbbcff1f0e687cd";
const TARGET_STUDENT_ID = process.env.STUDENT_ID || "UCI_POR_STUDENT_0001";
const SECOND_STUDENT_ID = process.env.SECOND_STUDENT_ID || "UCI_POR_STUDENT_0002";
const OUTPUT_DIR = path.resolve("Docs/evaluation/automatic_logs");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "ai_explanations_auto_SAMPLE_UCI_POR.json");
const EXCLUDED_TASK_IDS = new Set(["S-T00", "S-T16", "S-T17", "A-G18", "A-G19"]);

async function requestJson(url, options = {}) {
  const startedAt = performance.now();
  let response;
  let body = null;

  try {
    response = await fetch(url, {
      ...options,
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

function pickEvaluationClass(classes = []) {
  return classes.find((classInfo) => classInfo.class_id === TARGET_CLASS_ID)
    || [...classes].sort((a, b) => (b.student_count || 0) - (a.student_count || 0))[0]
    || null;
}

function buildRunParams({ classInfo, students }) {
  const first = students.find((student) => student.student_id === TARGET_STUDENT_ID) || students[0] || {};
  const second = students.find((student) => student.student_id === SECOND_STUDENT_ID)
    || students.find((student) => student.student_id !== first.student_id)
    || students[1]
    || {};

  return {
    batch_id: DATASET_ID,
    class_id: classInfo?.class_id || null,
    student_id: first.student_id || null,
    enrollment_id: first.enrollment_id || null,
    s1: first.student_id || null,
    s2: second.student_id || null,
  };
}

function listDatasetStats(datasets) {
  if (!datasets || typeof datasets !== "object" || Array.isArray(datasets)) return [];
  return Object.entries(datasets).map(([label, rows]) => ({
    label,
    row_count: Array.isArray(rows) ? rows.length : null,
    sample_fields: Array.isArray(rows) && rows[0] && typeof rows[0] === "object"
      ? Object.keys(rows[0]).slice(0, 20)
      : [],
  }));
}

function compactDatasets(datasets, maxRowsPerDataset = 5) {
  if (!datasets || typeof datasets !== "object" || Array.isArray(datasets)) return {};
  return Object.fromEntries(
    Object.entries(datasets).map(([label, rows]) => [
      label,
      Array.isArray(rows) ? rows.slice(0, maxRowsPerDataset) : rows,
    ])
  );
}

function hasExplanationShape(body) {
  const explanation = body?.explanation;
  return Boolean(
    body
    && typeof body === "object"
    && explanation
    && typeof explanation.summary === "string"
    && Array.isArray(explanation.insights)
    && Array.isArray(explanation.educational_implications)
    && Array.isArray(explanation.recommendations)
    && Array.isArray(explanation.warnings)
    && body.meta
    && typeof body.meta.latency_ms === "number"
  );
}

function pct(part, total) {
  return total > 0 ? Number(((part / total) * 100).toFixed(2)) : null;
}

function summarizeMetrics(results) {
  const analyticsAttempted = results.filter((item) => item.analytics_run_attempted);
  const analyticsSuccess = analyticsAttempted.filter((item) => item.analytics_http_status === 200 && item.analytics_success === true);
  const aiAttempted = results.filter((item) => item.ai_attempted);
  const aiResponses = aiAttempted.filter((item) => item.ai_http_status === 200);
  const degraded = aiAttempted.filter((item) => item.degraded);
  const schemaPassed = aiAttempted.filter((item) => item.schema_pass);
  const safetyFlagged = aiAttempted.filter((item) => Number(item.safety_flags_count || 0) > 0);

  const totalCost = aiAttempted
    .map((item) => Number(item.cost_usd))
    .filter(Number.isFinite)
    .reduce((sum, value) => sum + value, 0);

  const totalTokens = aiAttempted
    .map((item) => Number(item.total_tokens))
    .filter(Number.isFinite)
    .reduce((sum, value) => sum + value, 0);

  return {
    total_tasks_seen: results.length,
    analytics_attempted_count: analyticsAttempted.length,
    analytics_success_count: analyticsSuccess.length,
    analytics_success_rate: pct(analyticsSuccess.length, analyticsAttempted.length),
    ai_attempted_count: aiAttempted.length,
    ai_response_count: aiResponses.length,
    ai_response_rate: pct(aiResponses.length, aiAttempted.length),
    ai_degraded_count: degraded.length,
    ai_degraded_rate: pct(degraded.length, aiAttempted.length),
    schema_pass_count: schemaPassed.length,
    schema_pass_rate: pct(schemaPassed.length, aiAttempted.length),
    safety_flagged_count: safetyFlagged.length,
    safety_flagged_rate: pct(safetyFlagged.length, aiAttempted.length),
    total_tokens: totalTokens,
    total_cost_usd: Number(totalCost.toFixed(6)),
  };
}

async function main() {
  const startedAt = new Date();

  const tasksRes = await requestJson(`${BACKEND_URL}/api/tasks?includeExperimental=true`);
  if (!tasksRes.ok || !Array.isArray(tasksRes.body?.tasks)) {
    throw new Error(`Cannot fetch tasks from ${BACKEND_URL}/api/tasks. Status: ${tasksRes.httpStatus}`);
  }

  const tasksById = new Map(tasksRes.body.tasks.map((task) => [task.taskId || task.id, task]));
  const taskIds = tasksRes.body.tasks
    .map((task) => task.taskId || task.id)
    .filter((taskId) => taskId && !EXCLUDED_TASK_IDS.has(taskId));

  const classesRes = await requestJson(`${BACKEND_URL}/api/classes?batchId=${encodeURIComponent(DATASET_ID)}`);
  if (!classesRes.ok || !Array.isArray(classesRes.body?.classes)) {
    throw new Error(`Cannot fetch classes for ${DATASET_ID}. Status: ${classesRes.httpStatus}`);
  }

  const classInfo = pickEvaluationClass(classesRes.body.classes);
  if (!classInfo?.class_id) throw new Error(`No class found for ${DATASET_ID}.`);

  const studentsUrl = `${BACKEND_URL}/api/students?batchId=${encodeURIComponent(DATASET_ID)}&classId=${encodeURIComponent(classInfo.class_id)}&pageSize=200`;
  const studentsRes = await requestJson(studentsUrl);
  if (!studentsRes.ok || !Array.isArray(studentsRes.body?.students)) {
    throw new Error(`Cannot fetch students for ${DATASET_ID}/${classInfo.class_id}. Status: ${studentsRes.httpStatus}`);
  }

  const params = buildRunParams({ classInfo, students: studentsRes.body.students });
  const results = [];

  for (const taskId of taskIds) {
    const task = tasksById.get(taskId);
    const baseRecord = {
      datasetId: DATASET_ID,
      taskId,
      taskName: task?.taskName || null,
      dashboard: taskId.startsWith("S-") ? "Student" : "Admin",
      scope: task?.scope || null,
      viz_type: task?.viz_type || null,
      explanation_strategy: task?.explanation_strategy || null,
      target_audience: task?.target_audience || [],
      analytics_run_attempted: false,
      ai_attempted: false,
    };

    if (!task) {
      results.push({
        ...baseRecord,
        result: "skip",
        skip_reason: "task_not_found_in_registry",
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
        analytics_run_attempted: true,
        analytics_http_status: runRes.httpStatus,
        analytics_latency_ms: runRes.latencyMs,
        analytics_success: false,
        analytics_error: runRes.transportError || runRes.body?.error || runRes.body?.message || null,
        result: "skip",
        skip_reason: "analytics_api_failed_or_not_success",
      });
      continue;
    }

    const explainRes = await requestJson(`${BACKEND_URL}/api/ai/explain`, {
      method: "POST",
      body: JSON.stringify({
        taskId,
        executionId: runRes.body.executionId,
        datasets: runRes.body.datasets,
        meta: runRes.body.meta,
        studentContext: null,
      }),
    });

    const body = explainRes.body || {};
    const tokenUsage = body.meta?.token_usage || null;

    results.push({
      ...baseRecord,
      executionId: runRes.body.executionId,
      analytics_run_attempted: true,
      analytics_http_status: runRes.httpStatus,
      analytics_latency_ms: runRes.latencyMs,
      analytics_success: true,
      dataset_stats: listDatasetStats(runRes.body.datasets),
      analytics_datasets_preview: compactDatasets(runRes.body.datasets),
      data_quality: runRes.body.meta?.dataQuality || null,
      ai_attempted: true,
      ai_http_status: explainRes.httpStatus,
      ai_latency_ms: explainRes.latencyMs,
      ai_error: explainRes.transportError || body?.error?.message || body?.error || null,
      schema_pass: hasExplanationShape(body),
      degraded: Boolean(body.degraded),
      explanation_type: body.explanation_type || null,
      explanation_strategy: body.explanation_strategy || task.explanation_strategy || null,
      summary: body.explanation?.summary || null,
      insights: body.explanation?.insights || [],
      educational_implications: body.explanation?.educational_implications || [],
      recommendations: body.explanation?.recommendations || [],
      warnings: body.explanation?.warnings || [],
      confidence: body.confidence || null,
      safety_flags: body.safety_flags || [],
      safety_flags_count: Array.isArray(body.safety_flags) ? body.safety_flags.length : 0,
      model: body.meta?.model || null,
      python_latency_ms: body.meta?.latency_ms ?? null,
      token_usage: tokenUsage,
      total_tokens: tokenUsage?.total_tokens ?? null,
      cost_usd: body.meta?.cost_usd ?? null,
      ai_meta: body.meta || null,
      result: explainRes.httpStatus === 200 && hasExplanationShape(body) ? "pass" : "fail",
    });
  }

  const output = {
    evaluation_part: "ai_explanations",
    datasetId: DATASET_ID,
    backend_url: BACKEND_URL,
    generated_at: new Date().toISOString(),
    duration_ms: Date.now() - startedAt.getTime(),
    method:
      "For each task in the registry except the excluded experimental what-if/late-added tasks, the runner executes POST /api/analytics/run and forwards the returned executionId, datasets, and meta to POST /api/ai/explain. The output records the actual AI explanation content, degraded fallbacks, latency, token usage, cost, confidence, safety flags, and schema conformance.",
    context: {
      class: classInfo,
      student_count_loaded: studentsRes.body.students.length,
      params_used: params,
      task_source: "Backend task registry, includeExperimental=true, minus excluded task ids",
      excluded_task_ids: [...EXCLUDED_TASK_IDS],
      task_count_after_exclusion: taskIds.length,
    },
    metrics: summarizeMetrics(results),
    results,
  };

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  console.log(`AI explanations auto log written: ${OUTPUT_FILE}`);
  console.log(JSON.stringify(output.metrics, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
