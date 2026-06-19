import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const FULL_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs/full_208");
const DEFAULT_MANIFEST_PATH = path.join(FULL_ROOT, "full_case_run_manifest_v1.json");
const DEFAULT_BASE_URL = "http://localhost:4000";
const ALLOWED_DATASETS = new Set(["SAMPLE_UCI_POR", "SAMPLE_OULAD"]);

function parseArgs(argv) {
  const args = { datasetId: null, baseUrl: DEFAULT_BASE_URL, manifestPath: DEFAULT_MANIFEST_PATH, timeoutMs: 60000 };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--dataset") args.datasetId = next, index += 1;
    else if (arg === "--base-url") args.baseUrl = next.replace(/\/+$/, ""), index += 1;
    else if (arg === "--manifest") args.manifestPath = path.resolve(next), index += 1;
    else if (arg === "--request-timeout-ms") args.timeoutMs = Number(next), index += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!ALLOWED_DATASETS.has(args.datasetId)) throw new Error(`--dataset must be one of: ${[...ALLOWED_DATASETS].join(", ")}`);
  args.outputDir = path.join(FULL_ROOT, "phase8_evidence_sql", args.datasetId);
  args.artifactsDir = path.join(args.outputDir, "full_query_artifacts");
  return args;
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, "/");
}

async function readJson(filePath) {
  return JSON.parse((await readFile(filePath, "utf8")).replace(/^\uFEFF/, ""));
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  return value;
}

function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}

function sha256Json(value) {
  return sha256Text(JSON.stringify(canonicalize(value)));
}

async function requestJson(url, options = {}) {
  const startedAt = performance.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal, headers: { "content-type": "application/json", ...(options.headers ?? {}) } });
    let body = null;
    try { body = await response.json(); } catch { body = null; }
    return { ok: response.ok, http_status: response.status, latency_ms: Math.round(performance.now() - startedAt), body, transport_error: null };
  } catch (error) {
    return { ok: false, http_status: null, latency_ms: Math.round(performance.now() - startedAt), body: null, transport_error: error.name === "AbortError" ? `request_timeout_after_${options.timeoutMs}ms` : error.message };
  } finally {
    clearTimeout(timeout);
  }
}

function datasetBreakdown(datasets) {
  if (!datasets || typeof datasets !== "object" || Array.isArray(datasets)) return [];
  return Object.entries(datasets).map(([label, rows]) => ({
    label,
    row_count: Array.isArray(rows) ? rows.length : null,
    sample_fields: Array.isArray(rows) && rows[0] && typeof rows[0] === "object" ? Object.keys(rows[0]).slice(0, 50) : [],
  }));
}

function totalRowCount(breakdown) {
  const counts = breakdown.map((item) => item.row_count).filter(Number.isInteger);
  return counts.length > 0 ? counts.reduce((sum, count) => sum + count, 0) : null;
}

function bucket(rowCount) {
  if (!Number.isInteger(rowCount)) return "unknown";
  return rowCount <= 20 ? "<=20" : ">20";
}

function accessPath(rowCount) {
  return Number.isInteger(rowCount) && rowCount <= 20 ? "direct_embedding" : "deterministic_artifact_retrieval";
}

function buildParams(caseItem, students) {
  const selected = caseItem.student_id ? students.find((student) => student.student_id === caseItem.student_id) : null;
  const first = selected ?? students[0] ?? {};
  const second = students.find((student) => student.student_id !== first.student_id) ?? students[1] ?? {};
  return {
    batch_id: caseItem.dataset_id,
    class_id: caseItem.class_id,
    student_id: first.student_id ?? caseItem.student_id ?? null,
    enrollment_id: first.enrollment_id ?? null,
    s1: first.student_id ?? caseItem.student_id ?? null,
    s2: second.student_id ?? null,
  };
}

function classifyExecutionOutcome(analytics, observedRowCount) {
  const dataQuality = analytics.body?.meta?.dataQuality ?? null;
  const errorWarnings = (dataQuality?.warnings ?? []).filter((warning) => warning.severity === "error");
  if (analytics.http_status === 200 && analytics.body?.success === true && observedRowCount === 0 && errorWarnings.length > 0) {
    return {
      status: "terminal_invalid_empty_result",
      reason: dataQuality?.confidence_reason ?? "Runtime returned zero rows with data-quality errors.",
      backend_data_quality_status: dataQuality?.status ?? null,
      backend_confidence: dataQuality?.confidence ?? null,
      error_codes: errorWarnings.map((warning) => warning.code),
    };
  }
  return { status: "query_result", reason: null, backend_data_quality_status: dataQuality?.status ?? null, backend_confidence: dataQuality?.confidence ?? null, error_codes: [] };
}

function validate(caseItem, analytics, breakdown, observedRowCount, executionOutcome) {
  const issues = [];
  if (analytics.http_status !== 200 || analytics.body?.success !== true) {
    issues.push({ severity: "error", code: "analytics_query_failed", message: "Analytics did not return HTTP 200 with success=true.", details: { http_status: analytics.http_status, transport_error: analytics.transport_error, analytics_error: analytics.body?.error ?? null } });
    return issues;
  }
  if (breakdown.length === 0) issues.push({ severity: "error", code: "missing_dataset_arrays", message: "Analytics response contains no dataset arrays." });
  const emptyArrays = breakdown.filter((item) => item.row_count === 0).map((item) => item.label);
  if (emptyArrays.length > 0 && executionOutcome.status === "terminal_invalid_empty_result") {
    issues.push({ severity: "warning", code: "explicit_terminal_invalid_empty_result", message: "Empty full-query result is explicitly classified terminal invalid from backend data-quality errors.", details: { labels: emptyArrays, execution_outcome: executionOutcome } });
  } else if (emptyArrays.length > 0) {
    issues.push({ severity: "error", code: "unclassified_empty_dataset_arrays", message: "Analytics response contains empty dataset arrays without an explicit terminal-invalid classification.", details: { labels: emptyArrays } });
  }
  if (breakdown.some((item) => !Number.isInteger(item.row_count))) issues.push({ severity: "error", code: "non_array_dataset", message: "At least one datasets property is not an array." });
  if (observedRowCount !== caseItem.row_count) issues.push({ severity: "error", code: "row_count_mismatch", message: "Runtime row count differs from Phase 3.", details: { expected: caseItem.row_count, actual: observedRowCount } });
  if (bucket(observedRowCount) !== caseItem.row_count_bucket) issues.push({ severity: "error", code: "row_count_bucket_mismatch", message: "Runtime bucket differs from Phase 3.", details: { expected: caseItem.row_count_bucket, actual: bucket(observedRowCount) } });
  if (accessPath(observedRowCount) !== caseItem.expected_evidence_access_path) issues.push({ severity: "error", code: "evidence_access_mismatch", message: "Runtime row count implies a different evidence access path.", details: { expected: caseItem.expected_evidence_access_path, actual: accessPath(observedRowCount) } });
  return issues;
}

function renderMarkdown(report) {
  const issues = report.issues.length === 0
    ? "No issues found."
    : `| Severity | Code | Task | Message |\n|---|---|---|---|\n${report.issues.map((item) => `| ${item.severity} | ${item.code} | ${item.task_id} | ${item.message} |`).join("\n")}`;
  return `# LLM Judge V2 Phase F2 Dataset Evidence Report

- Dataset: \`${report.dataset_id}\`
- Status: **${report.status}**
- Generated at: \`${report.generated_at}\`
- Backend: \`${report.backend.base_url}\`
- Task-level evidence ready: **${report.counts.evidence_ready}/${report.counts.planned_tasks}**
- Runtime row-count matches: **${report.counts.runtime_row_count_matches}/${report.counts.planned_tasks}**
- Full-query artifacts with SHA-256: **${report.counts.artifacts_with_sha256}/${report.counts.planned_tasks}**
- Large-result retrieval plans: **${report.counts.large_result_retrieval_plans}/${report.counts.large_result_tasks}**
- Empty dataset arrays: **${report.counts.empty_dataset_arrays}**
- Empty arrays explicitly terminal invalid: **${report.counts.explicit_terminal_invalid_empty_arrays}**
- Unclassified empty arrays: **${report.counts.unclassified_empty_dataset_arrays}**

## Evidence access coverage

- Direct embedding: ${report.coverage.direct_embedding}
- Deterministic artifact retrieval: ${report.coverage.deterministic_artifact_retrieval}

## Issues

${issues}

## Gate decision

- Current dataset evidence complete: \`${report.gate_decision.current_dataset_evidence_complete}\`
- OULAD execution allowed next: \`${report.gate_decision.next_dataset_execution_allowed}\`
- Aggregate expansion allowed: \`${report.gate_decision.aggregate_expansion_allowed}\`
- Full judge invocation allowed: \`false\`
`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const fullManifest = await readJson(args.manifestPath);
  const cases = (fullManifest.primary_cases ?? []).filter((item) => item.dataset_id === args.datasetId).sort((a, b) => a.task_id.localeCompare(b.task_id));
  if (fullManifest.status !== "READY_FOR_FULL_PREFLIGHT") throw new Error(`Full manifest status is ${fullManifest.status}, expected READY_FOR_FULL_PREFLIGHT.`);
  if (cases.length !== 52 || new Set(cases.map((item) => item.task_id)).size !== 52) throw new Error(`Dataset ${args.datasetId} does not have exactly 52 unique task-level cases.`);

  await mkdir(args.artifactsDir, { recursive: true });
  const health = await requestJson(`${args.baseUrl}/api/health`, { timeoutMs: args.timeoutMs });
  if (!health.ok) throw new Error(`Backend health check failed: HTTP ${health.http_status}, ${health.transport_error ?? ""}`);

  const studentsByClass = new Map();
  for (const caseItem of cases) {
    if (studentsByClass.has(caseItem.class_id)) continue;
    const url = `${args.baseUrl}/api/students?batchId=${encodeURIComponent(args.datasetId)}&classId=${encodeURIComponent(caseItem.class_id)}&pageSize=5000`;
    const response = await requestJson(url, { timeoutMs: args.timeoutMs });
    if (!response.ok || !Array.isArray(response.body?.students) || response.body.students.length === 0) throw new Error(`Cannot load students for ${args.datasetId}/${caseItem.class_id}.`);
    studentsByClass.set(caseItem.class_id, response.body.students);
  }

  const entries = [];
  const allIssues = [];
  for (let index = 0; index < cases.length; index += 1) {
    const caseItem = cases[index];
    console.log(`[F2 ${args.datasetId}] ${index + 1}/52 ${caseItem.task_id}`);
    const params = buildParams(caseItem, studentsByClass.get(caseItem.class_id) ?? []);
    const requestBody = { taskId: caseItem.task_id, params };
    const analytics = await requestJson(`${args.baseUrl}/api/analytics/run`, { method: "POST", body: JSON.stringify(requestBody), timeoutMs: args.timeoutMs });
    const datasets = analytics.body?.datasets ?? null;
    const breakdown = datasetBreakdown(datasets);
    const observedRowCount = analytics.body?.success === true ? totalRowCount(breakdown) : null;
    const executionOutcome = classifyExecutionOutcome(analytics, observedRowCount);
    const issues = validate(caseItem, analytics, breakdown, observedRowCount, executionOutcome);
    const evidenceId = `${args.datasetId}__${caseItem.task_id}`;
    const artifactPath = path.join(args.artifactsDir, `${evidenceId}.json`);
    const artifact = {
      artifact_type: "llm_judge_v2_full_query_task_level_evidence_v1",
      generated_at: new Date().toISOString(),
      evidence_grain: "dataset_id + task_id",
      evidence_id: evidenceId,
      dataset_id: args.datasetId,
      class_id: caseItem.class_id,
      student_id: caseItem.student_id,
      role: caseItem.role,
      task_id: caseItem.task_id,
      task_name: caseItem.task_name,
      request: { backend_url: args.baseUrl, endpoint: "/api/analytics/run", body: requestBody },
      response_metadata: { http_status: analytics.http_status, latency_ms: analytics.latency_ms, transport_error: analytics.transport_error, analytics_success: analytics.body?.success === true, analytics_error: analytics.body?.error ?? null },
      evidence_summary: { row_count_phase3: caseItem.row_count, row_count_observed: observedRowCount, row_count_bucket_phase3: caseItem.row_count_bucket, row_count_bucket_observed: bucket(observedRowCount), dataset_breakdown: breakdown, full_query_datasets_sha256: sha256Json(datasets) },
      execution_outcome: executionOutcome,
      full_response_body: analytics.body,
    };
    const artifactText = `${JSON.stringify(artifact, null, 2)}\n`;
    await writeFile(artifactPath, artifactText, "utf8");
    const artifactSha256 = sha256Text(artifactText);
    const retrievalRequired = caseItem.expected_evidence_access_path === "deterministic_artifact_retrieval";
    const errorIssues = issues.filter((issue) => issue.severity === "error");
    const entry = {
      evidence_id: evidenceId,
      evidence_grain: "dataset_id + task_id",
      dataset_id: args.datasetId,
      class_id: caseItem.class_id,
      student_id: caseItem.student_id,
      role: caseItem.role,
      task_id: caseItem.task_id,
      task_name: caseItem.task_name,
      status: errorIssues.length === 0 ? "evidence_ready" : "failed",
      execution_outcome: executionOutcome,
      expected_evidence_access_path: caseItem.expected_evidence_access_path,
      row_count_phase3: caseItem.row_count,
      row_count_observed: observedRowCount,
      row_count_bucket_phase3: caseItem.row_count_bucket,
      row_count_bucket_observed: bucket(observedRowCount),
      dataset_breakdown: breakdown,
      full_query_artifact: { path: toRepoPath(artifactPath), sha256: artifactSha256, datasets_sha256: artifact.evidence_summary.full_query_datasets_sha256 },
      retrieval_plan: retrievalRequired ? { required: true, strategy: "deterministic_artifact_retrieval", artifact_path: toRepoPath(artifactPath), artifact_sha256: artifactSha256, materialization_phase: "F5" } : { required: false, strategy: "direct_embedding", artifact_path: toRepoPath(artifactPath), artifact_sha256: artifactSha256 },
      source: { backend_url: args.baseUrl, endpoint: "/api/analytics/run", http_status: analytics.http_status, latency_ms: analytics.latency_ms },
      issues,
    };
    entries.push(entry);
    allIssues.push(...issues.map((issue) => ({ ...issue, dataset_id: args.datasetId, task_id: caseItem.task_id, evidence_id: evidenceId })));
  }

  const ready = entries.filter((item) => item.status === "evidence_ready");
  const large = entries.filter((item) => item.row_count_observed > 20);
  const errors = allIssues.filter((item) => item.severity === "error");
  const warnings = allIssues.filter((item) => item.severity === "warning");
  const terminalInvalid = entries.filter((item) => item.execution_outcome.status === "terminal_invalid_empty_result");
  const emptyArrayCount = entries.reduce((sum, item) => sum + item.dataset_breakdown.filter((dataset) => dataset.row_count === 0).length, 0);
  const terminalInvalidEmptyArrayCount = terminalInvalid.reduce((sum, item) => sum + item.dataset_breakdown.filter((dataset) => dataset.row_count === 0).length, 0);
  const currentDatasetComplete = ready.length === 52 && errors.length === 0;
  const otherDatasetId = args.datasetId === "SAMPLE_UCI_POR" ? "SAMPLE_OULAD" : "SAMPLE_UCI_POR";
  let otherDatasetComplete = false;
  try {
    const otherReport = await readJson(path.join(FULL_ROOT, "phase8_evidence_sql", otherDatasetId, "evidence_report.json"));
    otherDatasetComplete = otherReport.status === "PASS" && otherReport.gate_decision?.current_dataset_evidence_complete === true;
  } catch {
    otherDatasetComplete = false;
  }
  const aggregateExpansionAllowed = currentDatasetComplete && otherDatasetComplete;
  const report = {
    report_version: "llm_judge_v2_phase_f2_dataset_evidence_v1",
    generated_at: new Date().toISOString(),
    dataset_id: args.datasetId,
    status: ready.length === 52 && errors.length === 0 ? "PASS" : "FAIL",
    evidence_grain: "dataset_id + task_id",
    backend: { base_url: args.baseUrl, health_endpoint: "/api/health", health_http_status: health.http_status, health_latency_ms: health.latency_ms },
    inputs: { full_case_manifest: toRepoPath(args.manifestPath) },
    counts: {
      planned_tasks: cases.length,
      evidence_ready: ready.length,
      failed: entries.length - ready.length,
      runtime_row_count_matches: entries.filter((item) => item.row_count_observed === item.row_count_phase3 && item.row_count_bucket_observed === item.row_count_bucket_phase3).length,
      artifacts_with_sha256: entries.filter((item) => /^[a-f0-9]{64}$/.test(item.full_query_artifact.sha256)).length,
      large_result_tasks: large.length,
      large_result_retrieval_plans: large.filter((item) => item.retrieval_plan.required && item.retrieval_plan.strategy === "deterministic_artifact_retrieval").length,
      terminal_invalid_empty_results: terminalInvalid.length,
      empty_dataset_arrays: emptyArrayCount,
      explicit_terminal_invalid_empty_arrays: terminalInvalidEmptyArrayCount,
      unclassified_empty_dataset_arrays: emptyArrayCount - terminalInvalidEmptyArrayCount,
      errors: errors.length,
      warnings: warnings.length,
    },
    coverage: {
      direct_embedding: entries.filter((item) => item.expected_evidence_access_path === "direct_embedding").length,
      deterministic_artifact_retrieval: entries.filter((item) => item.expected_evidence_access_path === "deterministic_artifact_retrieval").length,
    },
    outputs: { evidence_manifest: toRepoPath(path.join(args.outputDir, "evidence_manifest.jsonl")), full_query_artifacts_dir: toRepoPath(args.artifactsDir), evidence_report_json: toRepoPath(path.join(args.outputDir, "evidence_report.json")), evidence_report_md: toRepoPath(path.join(args.outputDir, "evidence_report.md")) },
    gate_decision: {
      current_dataset_evidence_complete: currentDatasetComplete,
      next_dataset_execution_allowed: args.datasetId === "SAMPLE_UCI_POR" && currentDatasetComplete && !otherDatasetComplete,
      aggregate_expansion_allowed: aggregateExpansionAllowed,
      full_judge_invocation_allowed: false,
      reason: aggregateExpansionAllowed
        ? "Both dataset-level evidence reports pass. Aggregate 104 task-level records and expand to 208 mode-level records next."
        : currentDatasetComplete
          ? "Current dataset task-level evidence is complete, including explicit terminal-invalid empty results. Run the remaining dataset before aggregate expansion."
          : "Fix failed evidence records before continuing.",
    },
    issues: allIssues,
  };
  await writeFile(path.join(args.outputDir, "evidence_manifest.jsonl"), `${entries.map((entry) => JSON.stringify(entry)).join("\n")}\n`, "utf8");
  await writeFile(path.join(args.outputDir, "evidence_report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(path.join(args.outputDir, "evidence_report.md"), renderMarkdown(report), "utf8");
  console.log(JSON.stringify({ status: report.status, dataset_id: report.dataset_id, counts: report.counts, coverage: report.coverage, gate_decision: report.gate_decision }, null, 2));
  if (report.status !== "PASS") process.exitCode = 1;
}

main().catch((error) => { console.error(error.stack || error.message); process.exitCode = 1; });
