import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";
const DATASET_ID = "SAMPLE_UCI_POR";
const OUTPUT_DIR = path.resolve("Docs/evaluation/automatic_logs");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "performance_benchmark_auto_SAMPLE_UCI_POR.json");

async function requestJson(label, url, options = {}) {
  const startedAt = performance.now();
  let response;
  let body = null;
  let transportError = null;

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
    transportError = error.message;
  }

  return {
    label,
    url,
    http_status: response?.status ?? null,
    ok: response?.ok ?? false,
    latency_ms: Number((performance.now() - startedAt).toFixed(3)),
    transport_error: transportError,
    response_summary: summarizeResponse(body),
  };
}

function summarizeResponse(body) {
  if (!body || typeof body !== "object") return null;
  return {
    success: body.success ?? null,
    count: body.count ?? null,
    summary: body.summary ?? null,
    pagination: body.pagination ?? null,
    keys: Object.keys(body),
  };
}

function stats(values) {
  const nums = values.map(Number).filter(Number.isFinite).sort((a, b) => a - b);
  if (nums.length === 0) return { count: 0, avg_ms: null, min_ms: null, max_ms: null };
  const sum = nums.reduce((acc, value) => acc + value, 0);
  return {
    count: nums.length,
    avg_ms: Number((sum / nums.length).toFixed(3)),
    min_ms: nums[0],
    max_ms: nums[nums.length - 1],
  };
}

function pickPrimaryClass(classes = []) {
  return [...classes].sort((a, b) => (b.student_count || 0) - (a.student_count || 0))[0] || null;
}

async function main() {
  const startedAt = Date.now();
  const measurements = [];

  measurements.push(await requestJson("tasks_list", `${BACKEND_URL}/api/tasks?includeExperimental=true`));

  const classesMeasurement = await requestJson(
    "classes_list",
    `${BACKEND_URL}/api/classes?batchId=${encodeURIComponent(DATASET_ID)}`
  );
  measurements.push(classesMeasurement);

  const classes = Array.isArray(classesMeasurement.response_summary)
    ? []
    : null;

  const classesBody = await fetch(`${BACKEND_URL}/api/classes?batchId=${encodeURIComponent(DATASET_ID)}`).then((r) => r.json());
  const classInfo = pickPrimaryClass(classesBody.classes || []);
  if (!classInfo?.class_id) throw new Error(`No class found for ${DATASET_ID}.`);

  measurements.push(await requestJson(
    "students_page_200",
    `${BACKEND_URL}/api/students?batchId=${encodeURIComponent(DATASET_ID)}&classId=${encodeURIComponent(classInfo.class_id)}&pageSize=200`
  ));

  measurements.push(await requestJson(
    "task_validate_all",
    `${BACKEND_URL}/api/tasks/validate/${encodeURIComponent(DATASET_ID)}?classId=${encodeURIComponent(classInfo.class_id)}`
  ));

  measurements.push(await requestJson(
    "dataset_active",
    `${BACKEND_URL}/api/datasets/active`
  ));

  const successCount = measurements.filter((item) => item.ok).length;
  const output = {
    evaluation_part: "basic_api_performance_benchmark",
    datasetId: DATASET_ID,
    backend_url: BACKEND_URL,
    generated_at: new Date().toISOString(),
    duration_ms: Date.now() - startedAt,
    context: {
      class: classInfo,
    },
    metrics: {
      request_count: measurements.length,
      success_count: successCount,
      failure_count: measurements.length - successCount,
      success_rate: measurements.length > 0 ? Number(((successCount / measurements.length) * 100).toFixed(2)) : null,
      latency: stats(measurements.map((item) => item.latency_ms)),
    },
    measurements,
  };

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Basic API performance benchmark written: ${OUTPUT_FILE}`);
  console.log(JSON.stringify(output.metrics, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
