import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUNS_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs");
const DEFAULT_PLANNED_RECORDS_PATH = path.join(
  RUNS_ROOT,
  "phase6_preflight/planned_records.jsonl",
);
const DEFAULT_OUTPUT_DIR = path.join(RUNS_ROOT, "phase6_evidence");
const FULL_ARTIFACTS_DIRNAME = "full_query_artifacts";

const EVIDENCE_MANIFEST_PATH = path.join(DEFAULT_OUTPUT_DIR, "evidence_manifest.jsonl");
const REPORT_JSON_PATH = path.join(DEFAULT_OUTPUT_DIR, "phase6_evidence_report.json");
const REPORT_MD_PATH = path.join(DEFAULT_OUTPUT_DIR, "phase6_evidence_report.md");

const DEFAULT_BASE_URL = "http://localhost:4000";
const DEFAULT_REQUEST_TIMEOUT_MS = 30000;

function parseArgs(argv) {
  const args = {
    baseUrl: DEFAULT_BASE_URL,
    plannedRecordsPath: DEFAULT_PLANNED_RECORDS_PATH,
    outputDir: DEFAULT_OUTPUT_DIR,
    requestTimeoutMs: DEFAULT_REQUEST_TIMEOUT_MS,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--base-url") args.baseUrl = next.replace(/\/+$/, ""), i += 1;
    else if (arg === "--planned-records") args.plannedRecordsPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else if (arg === "--request-timeout-ms") args.requestTimeoutMs = Number(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    ...args,
    fullArtifactsDir: path.join(args.outputDir, FULL_ARTIFACTS_DIRNAME),
    evidenceManifestPath: path.join(args.outputDir, "evidence_manifest.jsonl"),
    reportJsonPath: path.join(args.outputDir, "phase6_evidence_report.json"),
    reportMdPath: path.join(args.outputDir, "phase6_evidence_report.md"),
  };
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, "/");
}

async function readJsonl(filePath) {
  const text = await readFile(filePath, "utf8");
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

async function requestJson(url, options = {}) {
  const startedAt = performance.now();
  let response = null;
  let body = null;
  const timeoutMs = options.timeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;
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
      transport_error: error.name === "AbortError"
        ? `request_timeout_after_${timeoutMs}ms`
        : error.message,
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

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonicalize(value[key])]),
    );
  }
  return value;
}

function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}

function sha256Json(value) {
  return sha256Text(JSON.stringify(canonicalize(value)));
}

function getDatasetBreakdown(datasets) {
  if (!datasets || typeof datasets !== "object" || Array.isArray(datasets)) return [];
  return Object.entries(datasets).map(([label, rows]) => ({
    label,
    row_count: Array.isArray(rows) ? rows.length : null,
    sample_fields: Array.isArray(rows) && rows[0] && typeof rows[0] === "object"
      ? Object.keys(rows[0]).slice(0, 30)
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

function bucketFor(rowCount) {
  if (!Number.isInteger(rowCount)) return "unknown";
  return rowCount <= 20 ? "<=20" : ">20";
}

function safeFileStem(value) {
  return String(value).replace(/[^A-Za-z0-9_.-]+/g, "_");
}

function findStudent(students, studentId) {
  return students.find((student) => student.student_id === studentId) ?? null;
}

function buildRunParams({ record, datasetStudents }) {
  const selected = record.student_id
    ? findStudent(datasetStudents, record.student_id)
    : null;
  const first = selected ?? datasetStudents[0] ?? {};
  const second = datasetStudents.find((student) => student.student_id !== first.student_id)
    ?? datasetStudents[1]
    ?? {};

  return {
    batch_id: record.dataset_id,
    class_id: record.class_id,
    student_id: first.student_id ?? record.student_id ?? null,
    enrollment_id: first.enrollment_id ?? null,
    s1: first.student_id ?? record.student_id ?? null,
    s2: second.student_id ?? null,
  };
}

async function loadDatasetStudents({ baseUrl, datasetId, classId, requestTimeoutMs }) {
  const url = `${baseUrl}/api/students?batchId=${encodeURIComponent(datasetId)}&classId=${encodeURIComponent(classId)}&pageSize=5000`;
  const res = await requestJson(url, { timeoutMs: requestTimeoutMs });
  if (!res.ok || !Array.isArray(res.body?.students)) {
    throw new Error(`Cannot fetch students for ${datasetId}/${classId}. HTTP ${res.http_status}. ${res.transport_error ?? ""}`);
  }
  return res.body.students;
}

async function verifyBackendHealth({ baseUrl, requestTimeoutMs }) {
  const res = await requestJson(`${baseUrl}/api/health`, { timeoutMs: requestTimeoutMs });
  if (!res.ok) {
    throw new Error(`Backend health check failed. HTTP ${res.http_status}. ${res.transport_error ?? ""}`);
  }
  return res;
}

function validateEvidenceResult({ record, analyticsRes, datasetBreakdown, rowCount }) {
  const issues = [];
  const analyticsSuccess = analyticsRes.http_status === 200 && analyticsRes.body?.success === true;

  if (!analyticsSuccess) {
    issues.push({
      severity: "error",
      code: "analytics_query_failed",
      message: "Analytics query did not return success=true.",
      details: {
        http_status: analyticsRes.http_status,
        transport_error: analyticsRes.transport_error,
        analytics_error: analyticsRes.body?.error ?? null,
      },
    });
    return issues;
  }

  if (rowCount !== record.row_count) {
    issues.push({
      severity: "error",
      code: "row_count_mismatch",
      message: "Runtime analytics row_count differs from planned Phase 3 row_count.",
      details: {
        expected: record.row_count,
        actual: rowCount,
      },
    });
  }

  const rowCountBucket = bucketFor(rowCount);
  if (rowCountBucket !== record.row_count_bucket) {
    issues.push({
      severity: "error",
      code: "row_count_bucket_mismatch",
      message: "Runtime analytics row_count_bucket differs from planned Phase 3 row_count_bucket.",
      details: {
        expected: record.row_count_bucket,
        actual: rowCountBucket,
      },
    });
  }

  if (record.expected_evidence_access_path === "direct_embedding" && rowCount > 20) {
    issues.push({
      severity: "error",
      code: "direct_embedding_row_limit_exceeded",
      message: "Record expects direct_embedding but runtime row_count exceeds 20.",
      details: { row_count: rowCount },
    });
  }

  if (record.expected_evidence_access_path === "deterministic_artifact_retrieval" && rowCount <= 20) {
    issues.push({
      severity: "error",
      code: "retrieval_path_not_needed_for_small_result",
      message: "Record expects deterministic_artifact_retrieval but runtime row_count is <=20.",
      details: { row_count: rowCount },
    });
  }

  if (datasetBreakdown.length === 0) {
    issues.push({
      severity: "error",
      code: "empty_dataset_breakdown",
      message: "Analytics response has no dataset arrays to preserve as full-query evidence.",
    });
  }

  return issues;
}

async function buildEvidenceForRecord({ record, baseUrl, studentsByDatasetClass, fullArtifactsDir, requestTimeoutMs }) {
  const startedAt = performance.now();
  const datasetClassKey = `${record.dataset_id}__${record.class_id}`;
  const datasetStudents = studentsByDatasetClass.get(datasetClassKey) ?? [];
  const params = buildRunParams({ record, datasetStudents });
  const requestBody = { taskId: record.task_id, params };

  const analyticsRes = await requestJson(`${baseUrl}/api/analytics/run`, {
    method: "POST",
    body: JSON.stringify(requestBody),
    timeoutMs: requestTimeoutMs,
  });

  const datasets = analyticsRes.body?.datasets ?? null;
  const datasetBreakdown = getDatasetBreakdown(datasets);
  const rowCount = analyticsRes.body?.success === true ? getPrimaryRowCount(datasetBreakdown) : null;
  const evidenceIssues = validateEvidenceResult({
    record,
    analyticsRes,
    datasetBreakdown,
    rowCount,
  });

  const artifact = {
    artifact_type: "llm_judge_v2_phase6_3_full_query_evidence",
    generated_at: new Date().toISOString(),
    backend_url: baseUrl,
    endpoint: "/api/analytics/run",
    record: {
      record_id: record.record_id,
      case_id: record.case_id,
      dataset_id: record.dataset_id,
      class_id: record.class_id,
      student_id: record.student_id,
      role: record.role,
      task_id: record.task_id,
      task_name: record.task_name,
      explanation_mode: record.explanation_mode,
      row_count_bucket_planned: record.row_count_bucket,
      expected_evidence_access_path: record.expected_evidence_access_path,
    },
    request: requestBody,
    response_metadata: {
      http_status: analyticsRes.http_status,
      latency_ms: analyticsRes.latency_ms,
      transport_error: analyticsRes.transport_error,
      analytics_success: analyticsRes.body?.success === true,
      analytics_error: analyticsRes.body?.error ?? null,
    },
    evidence_summary: {
      row_count_planned: record.row_count,
      row_count_observed: rowCount,
      row_count_bucket_observed: bucketFor(rowCount),
      dataset_breakdown: datasetBreakdown,
      full_query_datasets_sha256: sha256Json(datasets),
    },
    response_body: analyticsRes.body,
  };

  const artifactText = `${JSON.stringify(artifact, null, 2)}\n`;
  const artifactSha256 = sha256Text(artifactText);
  const artifactPath = path.join(fullArtifactsDir, `${safeFileStem(record.record_id)}.json`);
  await writeFile(artifactPath, artifactText, "utf8");

  return {
    manifestEntry: {
      record_id: record.record_id,
      case_id: record.case_id,
      dataset_id: record.dataset_id,
      class_id: record.class_id,
      student_id: record.student_id,
      role: record.role,
      task_id: record.task_id,
      task_name: record.task_name,
      explanation_mode: record.explanation_mode,
      status: evidenceIssues.some((issue) => issue.severity === "error") ? "failed" : "evidence_ready",
      expected_evidence_access_path: record.expected_evidence_access_path,
      full_query_artifact: {
        path: toRepoPath(artifactPath),
        sha256: artifactSha256,
        dataset_sha256: artifact.evidence_summary.full_query_datasets_sha256,
      },
      row_count_planned: record.row_count,
      row_count_observed: rowCount,
      row_count_bucket_planned: record.row_count_bucket,
      row_count_bucket_observed: bucketFor(rowCount),
      dataset_breakdown: datasetBreakdown,
      source: {
        backend_url: baseUrl,
        endpoint: "/api/analytics/run",
        http_status: analyticsRes.http_status,
        latency_ms: analyticsRes.latency_ms,
        transport_error: analyticsRes.transport_error,
        analytics_success: analyticsRes.body?.success === true,
        analytics_error: analyticsRes.body?.error ?? null,
        duration_ms: Math.round(performance.now() - startedAt),
      },
      issues: evidenceIssues,
      next_step: "phase6_4_judge_input_materialization",
    },
    issues: evidenceIssues.map((issue) => ({
      ...issue,
      record_id: record.record_id,
      case_id: record.case_id,
      task_id: record.task_id,
      dataset_id: record.dataset_id,
      explanation_mode: record.explanation_mode,
    })),
  };
}

function countBy(items, keyFn) {
  const counts = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function summarize({ generatedAt, baseUrl, plannedRecords, evidenceEntries, issues, healthRes, outputPaths }) {
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const evidenceReady = evidenceEntries.filter((entry) => entry.status === "evidence_ready");
  const failed = evidenceEntries.filter((entry) => entry.status === "failed");

  return {
    report_version: "llm_judge_v2_phase6_3_evidence_builder_report_v1",
    generated_at: generatedAt,
    status: errors.length === 0 && evidenceReady.length === plannedRecords.length ? "PASS" : "FAIL",
    phase_scope: [
      "6.3 evidence builder",
    ],
    backend: {
      base_url: baseUrl,
      health_endpoint: "/api/health",
      health_http_status: healthRes.http_status,
      health_latency_ms: healthRes.latency_ms,
    },
    inputs: {
      planned_records_jsonl: toRepoPath(outputPaths.plannedRecordsPath),
    },
    counts: {
      planned_records: plannedRecords.length,
      evidence_ready_records: evidenceReady.length,
      failed_records: failed.length,
      errors: errors.length,
      warnings: warnings.length,
    },
    coverage_summary: {
      datasets: countBy(evidenceEntries, (entry) => entry.dataset_id),
      row_count_buckets: countBy(evidenceEntries, (entry) => entry.row_count_bucket_observed),
      evidence_access_paths: countBy(evidenceEntries, (entry) => entry.expected_evidence_access_path),
      roles: countBy(evidenceEntries, (entry) => entry.role),
      explanation_modes: countBy(evidenceEntries, (entry) => entry.explanation_mode),
      statuses: countBy(evidenceEntries, (entry) => entry.status),
    },
    outputs: {
      evidence_manifest_jsonl: toRepoPath(outputPaths.evidenceManifestPath),
      full_query_artifacts_dir: toRepoPath(outputPaths.fullArtifactsDir),
      report_json: toRepoPath(outputPaths.reportJsonPath),
      report_md: toRepoPath(outputPaths.reportMdPath),
    },
    gate_decision: {
      phase6_4_judge_input_materializer_allowed: errors.length === 0 && evidenceReady.length === plannedRecords.length,
      judge_invocation_allowed: false,
      official_full_evaluation_allowed: false,
      reason: errors.length === 0 && evidenceReady.length === plannedRecords.length
        ? "All planned records have full-query evidence artifacts. Judge input materialization may run next, but judge invocation remains disabled."
        : "Evidence builder found failed records. Fix evidence issues before judge input materialization.",
    },
    issues,
  };
}

function renderMarkdown(report) {
  const lines = [
    "# LLM Judge V2 Phase 6.3 Evidence Builder Report",
    "",
    `- Generated at: ${report.generated_at}`,
    `- Status: ${report.status}`,
    `- Backend: ${report.backend.base_url}`,
    `- Planned records: ${report.counts.planned_records}`,
    `- Evidence-ready records: ${report.counts.evidence_ready_records}`,
    `- Failed records: ${report.counts.failed_records}`,
    `- Errors: ${report.counts.errors}`,
    `- Warnings: ${report.counts.warnings}`,
    "",
    "## Gate Decision",
    "",
    `- Phase 6.4 judge input materializer allowed: ${report.gate_decision.phase6_4_judge_input_materializer_allowed}`,
    `- Judge invocation allowed: ${report.gate_decision.judge_invocation_allowed}`,
    `- Official full evaluation allowed: ${report.gate_decision.official_full_evaluation_allowed}`,
    `- Reason: ${report.gate_decision.reason}`,
    "",
    "## Coverage",
    "",
    "| Dimension | Counts |",
    "| --- | --- |",
    `| Datasets | ${JSON.stringify(report.coverage_summary.datasets)} |`,
    `| Row-count buckets | ${JSON.stringify(report.coverage_summary.row_count_buckets)} |`,
    `| Evidence access paths | ${JSON.stringify(report.coverage_summary.evidence_access_paths)} |`,
    `| Roles | ${JSON.stringify(report.coverage_summary.roles)} |`,
    `| Explanation modes | ${JSON.stringify(report.coverage_summary.explanation_modes)} |`,
    `| Statuses | ${JSON.stringify(report.coverage_summary.statuses)} |`,
    "",
    "## Outputs",
    "",
    `- Evidence manifest: \`${report.outputs.evidence_manifest_jsonl}\``,
    `- Full-query artifacts dir: \`${report.outputs.full_query_artifacts_dir}\``,
    `- JSON report: \`${report.outputs.report_json}\``,
    `- Markdown report: \`${report.outputs.report_md}\``,
    "",
  ];

  if (report.issues.length > 0) {
    lines.push("## Issues", "", "| Severity | Code | Record | Message |", "| --- | --- | --- | --- |");
    for (const issue of report.issues) {
      lines.push(`| ${issue.severity} | ${issue.code} | ${issue.record_id ?? ""} | ${issue.message} |`);
    }
    lines.push("");
  } else {
    lines.push("## Issues", "", "No issues found.", "");
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const generatedAt = new Date().toISOString();
  const plannedRecords = await readJsonl(args.plannedRecordsPath);

  await mkdir(args.outputDir, { recursive: true });
  await mkdir(args.fullArtifactsDir, { recursive: true });

  const healthRes = await verifyBackendHealth({
    baseUrl: args.baseUrl,
    requestTimeoutMs: args.requestTimeoutMs,
  });

  const studentsByDatasetClass = new Map();
  for (const record of plannedRecords) {
    const key = `${record.dataset_id}__${record.class_id}`;
    if (!studentsByDatasetClass.has(key)) {
      const students = await loadDatasetStudents({
        baseUrl: args.baseUrl,
        datasetId: record.dataset_id,
        classId: record.class_id,
        requestTimeoutMs: args.requestTimeoutMs,
      });
      studentsByDatasetClass.set(key, students);
    }
  }

  const evidenceEntries = [];
  const issues = [];
  for (const record of plannedRecords) {
    console.log(`[phase6.3] ${record.record_id}`);
    const result = await buildEvidenceForRecord({
      record,
      baseUrl: args.baseUrl,
      studentsByDatasetClass,
      fullArtifactsDir: args.fullArtifactsDir,
      requestTimeoutMs: args.requestTimeoutMs,
    });
    evidenceEntries.push(result.manifestEntry);
    issues.push(...result.issues);
  }

  const outputPaths = {
    plannedRecordsPath: args.plannedRecordsPath,
    evidenceManifestPath: args.evidenceManifestPath,
    fullArtifactsDir: args.fullArtifactsDir,
    reportJsonPath: args.reportJsonPath,
    reportMdPath: args.reportMdPath,
  };
  const report = summarize({
    generatedAt,
    baseUrl: args.baseUrl,
    plannedRecords,
    evidenceEntries,
    issues,
    healthRes,
    outputPaths,
  });

  await writeFile(
    args.evidenceManifestPath,
    `${evidenceEntries.map((entry) => JSON.stringify(entry)).join("\n")}\n`,
    "utf8",
  );
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderMarkdown(report), "utf8");

  console.log(JSON.stringify({
    ok: report.status === "PASS",
    status: report.status,
    planned_records: report.counts.planned_records,
    evidence_ready_records: report.counts.evidence_ready_records,
    failed_records: report.counts.failed_records,
    errors: report.counts.errors,
    warnings: report.counts.warnings,
    evidence_manifest_jsonl: report.outputs.evidence_manifest_jsonl,
    full_query_artifacts_dir: report.outputs.full_query_artifacts_dir,
    report_json: report.outputs.report_json,
    report_md: report.outputs.report_md,
    phase6_4_judge_input_materializer_allowed: report.gate_decision.phase6_4_judge_input_materializer_allowed,
    judge_invocation_allowed: report.gate_decision.judge_invocation_allowed,
  }, null, 2));

  if (report.status !== "PASS") {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
