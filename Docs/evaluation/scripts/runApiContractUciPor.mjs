import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";
const DATASET_ID = "SAMPLE_UCI_POR";
const OUTPUT_DIR = path.resolve("Docs/evaluation/automatic_logs");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "api_contract_auto_SAMPLE_UCI_POR.json");

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

function summarizeDatasets(datasets) {
  if (!datasets || typeof datasets !== "object" || Array.isArray(datasets)) return {};

  return Object.fromEntries(
    Object.entries(datasets).map(([label, rows]) => {
      const safeRows = Array.isArray(rows) ? rows : [];
      const columns = safeRows.length > 0 && safeRows[0] && typeof safeRows[0] === "object"
        ? Object.keys(safeRows[0])
        : [];

      return [
        label,
        {
          row_count: safeRows.length,
          columns,
        },
      ];
    })
  );
}

function validateSuccessContract(body, taskId) {
  const datasets = body?.datasets;
  const queryLabels = body?.meta?.query_labels;
  const dataQuality = body?.meta?.dataQuality;
  const datasetValues = datasets && typeof datasets === "object" && !Array.isArray(datasets)
    ? Object.values(datasets)
    : [];

  const checks = {
    has_success_true: body?.success === true,
    has_executionId: typeof body?.executionId === "string" && body.executionId.length > 0,
    taskId_matches: body?.taskId === taskId,
    has_datasets_object: datasets && typeof datasets === "object" && !Array.isArray(datasets),
    datasets_are_arrays: datasetValues.every((value) => Array.isArray(value)),
    has_meta_object: body?.meta && typeof body.meta === "object" && !Array.isArray(body.meta),
    has_query_labels_array: Array.isArray(queryLabels),
    query_labels_match_datasets: Array.isArray(queryLabels)
      && datasets
      && queryLabels.every((label) => Object.prototype.hasOwnProperty.call(datasets, label)),
    has_dataQuality_object: dataQuality && typeof dataQuality === "object" && !Array.isArray(dataQuality),
    dataQuality_has_status: typeof dataQuality?.status === "string" && dataQuality.status.length > 0,
    dataQuality_has_confidence: Object.prototype.hasOwnProperty.call(dataQuality || {}, "confidence"),
    dataQuality_warnings_array: Array.isArray(dataQuality?.warnings),
  };

  return {
    contract_pass: Object.values(checks).every(Boolean),
    checks,
  };
}

function validateErrorContract(body, httpStatus) {
  const isSchemaMismatch = body?.error === "OUTPUT_SCHEMA_MISMATCH";
  const isUnsupported = httpStatus === 422 && body?.capability;

  const checks = {
    has_success_false: body?.success === false,
    has_executionId: typeof body?.executionId === "string" && body.executionId.length > 0,
    has_error: typeof body?.error === "string" && body.error.length > 0,
    unsupported_has_capability_when_present: !isUnsupported || typeof body.capability === "object",
    schema_mismatch_has_diagnostics: !isSchemaMismatch
      || (Object.prototype.hasOwnProperty.call(body, "output_schema")
        && Object.prototype.hasOwnProperty.call(body, "available_columns")),
  };

  return {
    contract_pass: Object.values(checks).every(Boolean),
    checks,
  };
}

function summarizeMetrics(results) {
  const attempted = results.filter((item) => item.analytics_run_attempted);
  const successful = attempted.filter((item) => item.http_status === 200 && item.response_success === true);
  const contractPassed = attempted.filter((item) => item.contract_pass);
  const errorResponses = attempted.filter((item) => item.http_status !== 200);
  const errorContractPassed = errorResponses.filter((item) => item.contract_pass);
  const namedLabelChecks = attempted.filter((item) =>
    Object.prototype.hasOwnProperty.call(item.checks || {}, "query_labels_match_datasets")
  );
  const namedLabelPassed = namedLabelChecks.filter((item) => item.checks.query_labels_match_datasets);
  const dataQualityChecks = attempted.filter((item) =>
    Object.prototype.hasOwnProperty.call(item.checks || {}, "has_dataQuality_object")
  );
  const dataQualityPassed = dataQualityChecks.filter((item) => item.checks.has_dataQuality_object);
  const emptyDatasetResponses = successful.filter((item) =>
    Object.values(item.datasets_summary || {}).every((summary) => summary.row_count === 0)
  );

  const pct = (part, total) => total > 0 ? Number(((part / total) * 100).toFixed(2)) : null;

  return {
    total_tasks_seen: results.length,
    analytics_runs_attempted: attempted.length,
    api_success_count: successful.length,
    api_success_rate: pct(successful.length, attempted.length),
    contract_pass_count: contractPassed.length,
    contract_pass_rate: pct(contractPassed.length, attempted.length),
    named_dataset_match_rate: pct(namedLabelPassed.length, namedLabelChecks.length),
    data_quality_metadata_rate: pct(dataQualityPassed.length, dataQualityChecks.length),
    error_response_count: errorResponses.length,
    error_contract_pass_rate: pct(errorContractPassed.length, errorResponses.length),
    empty_dataset_response_count: emptyDatasetResponses.length,
    empty_dataset_rate: pct(emptyDatasetResponses.length, successful.length),
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
  if (!classInfo?.class_id) {
    throw new Error(`No class found for ${DATASET_ID}.`);
  }

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

    const validateUrl = `${BACKEND_URL}/api/tasks/validate-one/${encodeURIComponent(taskId)}?datasetId=${encodeURIComponent(DATASET_ID)}&classId=${encodeURIComponent(classInfo.class_id)}`;
    const validation = await requestJson(validateUrl);
    const availability = validation.body?.result || null;
    const availabilityStatus = availability?.status || "validation_failed";

    const shouldRun = availabilityStatus !== "unsupported";
    const baseRecord = {
      datasetId: DATASET_ID,
      taskId,
      taskName: task.taskName || null,
      scope: task.scope || null,
      registry_status: task.registry_status || null,
      class_id: classInfo.class_id,
      availability_status: availabilityStatus,
      validation_http_status: validation.httpStatus,
      missing_requirements: availability?.missing_requirements || [],
      warnings: availability?.warnings || [],
      analytics_run_attempted: shouldRun,
    };

    if (!shouldRun) {
      results.push({
        ...baseRecord,
        http_status: null,
        response_success: null,
        contract_pass: true,
        checks: {
          skipped_because_unsupported: true,
        },
        datasets_summary: {},
        latency_ms: validation.latencyMs,
        error: null,
      });
      continue;
    }

    const runRes = await requestJson(`${BACKEND_URL}/api/analytics/run`, {
      method: "POST",
      body: JSON.stringify({ taskId, params }),
    });

    const contract = runRes.httpStatus === 200
      ? validateSuccessContract(runRes.body, taskId)
      : validateErrorContract(runRes.body, runRes.httpStatus);

    results.push({
      ...baseRecord,
      http_status: runRes.httpStatus,
      response_success: runRes.body?.success ?? null,
      contract_pass: contract.contract_pass,
      checks: contract.checks,
      datasets_summary: summarizeDatasets(runRes.body?.datasets),
      latency_ms: runRes.latencyMs,
      error: runRes.transportError || runRes.body?.error || null,
    });
  }

  const output = {
    evaluation_part: "api_response_contract",
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

  console.log(`API contract auto log written: ${OUTPUT_FILE}`);
  console.log(JSON.stringify(output.metrics, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
