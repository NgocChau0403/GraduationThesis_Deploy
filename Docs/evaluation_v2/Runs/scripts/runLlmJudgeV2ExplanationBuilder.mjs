import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUNS_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs");
const DEFAULT_EVIDENCE_MANIFEST_PATH = path.join(
  RUNS_ROOT,
  "phase6_evidence/evidence_manifest.jsonl",
);
const DEFAULT_OUTPUT_DIR = path.join(RUNS_ROOT, "phase6_explanations");
const EXPLANATION_ARTIFACTS_DIRNAME = "explanation_artifacts";
const TASK_REGISTRY_PATH = path.join(PROJECT_ROOT, "Backend/src/config/taskRegistry.json");

const DEFAULT_MODE_ENDPOINTS = {
  baseline_first_20_rows: "http://localhost:8001",
  task_aware_data_summarization: "http://localhost:8000",
};

function parseArgs(argv) {
  const args = {
    evidenceManifestPath: DEFAULT_EVIDENCE_MANIFEST_PATH,
    outputDir: DEFAULT_OUTPUT_DIR,
    requestTimeoutMs: 90000,
    retryAttempts: 1,
    modeEndpoints: { ...DEFAULT_MODE_ENDPOINTS },
    modes: null,
    datasets: null,
    limit: null,
    resume: false,
    reportBasename: "phase6_explanation_report",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--evidence-manifest") args.evidenceManifestPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else if (arg === "--request-timeout-ms") args.requestTimeoutMs = Number(next), i += 1;
    else if (arg === "--retry-attempts") args.retryAttempts = Number(next), i += 1;
    else if (arg === "--baseline-url") args.modeEndpoints.baseline_first_20_rows = next.replace(/\/+$/, ""), i += 1;
    else if (arg === "--task-aware-url") args.modeEndpoints.task_aware_data_summarization = next.replace(/\/+$/, ""), i += 1;
    else if (arg === "--modes") args.modes = splitList(next), i += 1;
    else if (arg === "--datasets") args.datasets = splitList(next), i += 1;
    else if (arg === "--limit") args.limit = Number(next), i += 1;
    else if (arg === "--resume") args.resume = next === "true", i += 1;
    else if (arg === "--report-basename") args.reportBasename = next, i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    ...args,
    explanationArtifactsDir: path.join(args.outputDir, EXPLANATION_ARTIFACTS_DIRNAME),
    explanationManifestPath: path.join(args.outputDir, "explanation_manifest.jsonl"),
    reportJsonPath: path.join(args.outputDir, `${args.reportBasename}.json`),
    reportMdPath: path.join(args.outputDir, `${args.reportBasename}.md`),
  };
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, "/");
}

function repoPathToAbsolute(repoPath) {
  return path.join(PROJECT_ROOT, ...String(repoPath).split("/"));
}

async function readJson(filePath) {
  return JSON.parse((await readFile(filePath, "utf8")).replace(/^\uFEFF/, ""));
}

async function readJsonl(filePath) {
  const text = await readFile(filePath, "utf8");
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}

async function requestJson(url, options = {}) {
  const startedAt = performance.now();
  let response = null;
  let body = null;
  const timeoutMs = options.timeoutMs ?? 90000;
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

function getTask(registry, taskId) {
  return registry.find((task) => task.taskId === taskId) ?? null;
}

function snakeToAiProp(field) {
  return `ai${field
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")}`;
}

function buildAISummaryConfig(task) {
  if (!task?.aiSummaryType) return null;

  const defaults = {
    comparison_groups: [],
    dynamic_comparison_groups: false,
    comparison_alignment_columns: [],
    group_key_columns: [],
    metric_columns: [],
    status_columns: [],
    threshold_columns: [],
    benchmark_columns: [],
    sensitive_columns: [],
    metric_availability_columns: {},
    threshold_sources: {},
    benchmark_sources: {},
    entity_order: [],
    metric_directions: {},
    metric_units: {},
    metric_thresholds: {},
    minimum_entity_count: 2,
    require_metric_directions: false,
    require_metric_units: false,
    require_metric_thresholds: false,
    require_sensitive_context_policy: false,
    focus_categories: [],
    focus_bins: [],
    category_order: [],
    expected_categories: [],
    expected_groups: [],
    bin_order: [],
    expected_bins: [],
    severity_order: [],
    flag_order: [],
    secondary_metric_columns: [],
    flag_columns: [],
    action_columns: [],
    label_columns: [],
    evidence_columns: [],
    evidence_dataset_roles: {},
    action_evidence_contract: [],
    action_derived_evidence: [],
    action_conflict_rules: [],
    action_rules: [],
    trigger_columns: [],
    provenance_required_fields: [],
    require_complete_action_provenance: true,
    unsupported_action_behavior: "emit_unsupported_actions",
    require_sensitive_action_policy: false,
  };

  const nullableFields = [
    "summary_type",
    "target_group",
    "divergence_threshold",
    "time_column",
    "x_column",
    "y_column",
    "metric_column",
    "entity_column",
    "color_column",
    "coefficient_column",
    "coefficient_method",
    "sample_size_column",
    "p_value_column",
    "outlier_policy",
    "group_column",
    "series_column",
    "gap_column",
    "reliability_column",
    "minimum_reliable_count",
    "minimum_sample_size",
    "category_column",
    "bin_column",
    "count_column",
    "percent_column",
    "metric_key_column",
    "metric_value_column",
    "selected_entity_column",
    "entity_evidence_available_column",
    "sensitive_context_policy",
    "numeric_threshold",
    "threshold_direction",
    "sort_by",
    "sort_direction",
    "flag_name_column",
    "flag_value_column",
    "threshold_column",
    "triggered_column",
    "severity_column",
    "description_column",
    "recommended_action_column",
    "support_category_column",
    "max_flags",
    "action_source",
    "action_rule_set_id",
    "action_rule_version",
    "priority_column",
    "owner_column",
    "time_horizon_column",
    "max_actions",
    "sensitive_action_policy",
    "max_points",
    "top_k",
    "bottom_k",
  ];

  const config = { ...defaults };
  for (const [field, defaultValue] of Object.entries(defaults)) {
    const value = task[snakeToAiProp(field)];
    config[field] = value === undefined ? defaultValue : value;
  }
  for (const field of nullableFields) {
    const value = task[snakeToAiProp(field)];
    config[field] = value === undefined ? null : value;
  }

  return config;
}

function buildSemanticContext(task, datasets) {
  const rows = Object.values(datasets ?? {}).flat();
  const hasSource = rows.some((row) => row?.competency_source != null);
  if (!hasSource) return null;

  const hasProxy = rows.some((row) => row?.competency_source === "proxy");
  const hasNative = rows.some((row) => row?.competency_source === "native");
  const hasUnknown = rows.some((row) => row?.competency_source === "unknown");
  const competencyMode = hasNative && hasProxy
    ? "mixed"
    : hasNative
      ? "native"
      : hasProxy
        ? "proxy"
        : hasUnknown
          ? "unknown"
          : null;

  if (!competencyMode) return null;
  return {
    competency_mode: competencyMode,
    competency_proxy_note: task.semanticNote ?? null,
  };
}

function compactRawText(responseBody) {
  const explanation = responseBody?.explanation ?? {};
  const pieces = [];
  if (explanation.summary) pieces.push(`Summary: ${explanation.summary}`);
  if (Array.isArray(explanation.insights) && explanation.insights.length) {
    pieces.push(`Insights: ${explanation.insights.map((item) => {
      const title = item?.title ? `${item.title}: ` : "";
      return `${title}${item?.description ?? ""}`.trim();
    }).filter(Boolean).join(" | ")}`);
  }
  if (Array.isArray(explanation.educational_implications) && explanation.educational_implications.length) {
    pieces.push(`Educational implications: ${explanation.educational_implications.join(" | ")}`);
  }
  if (Array.isArray(explanation.recommendations) && explanation.recommendations.length) {
    pieces.push(`Recommendations: ${explanation.recommendations.map((item) => {
      if (typeof item === "string") return item;
      return [item?.priority, item?.action, item?.rationale].filter(Boolean).join(" - ");
    }).filter(Boolean).join(" | ")}`);
  }
  if (Array.isArray(explanation.warnings) && explanation.warnings.length) {
    pieces.push(`Warnings: ${explanation.warnings.join(" | ")}`);
  }
  return pieces.join("\n\n");
}

function buildStudentContext(record, requestParams) {
  if (!record.student_id) return null;
  return {
    student_id: record.student_id,
    enrollment_id: requestParams?.enrollment_id ?? null,
    class_id: record.class_id,
    dataset_id: record.dataset_id,
  };
}

function buildExplainPayload({ evidenceArtifact, evidenceEntry, task }) {
  const responseBody = evidenceArtifact.response_body ?? evidenceArtifact.full_response_body;
  const datasets = responseBody?.datasets ?? {};
  const meta = responseBody?.meta ?? {};

  return {
    task_id: task.taskId,
    execution_id: responseBody?.executionId ?? evidenceEntry.record_id,
    task_name: task.taskName,
    analysis_type: task.analytics?.analysisType ?? null,
    explanation_strategy: task.explanation_strategy,
    explanation_type: task.analytics?.explanationType ?? null,
    ai_prompt_hint: task.aiPromptHint ?? null,
    actionable_question: task.actionableQuestion ?? null,
    target_audience: task.target_audience,
    visualization_config: task.visualization_config ?? null,
    analysis_context: task.analysis_context ?? null,
    datasets,
    confidence: {
      level: meta?.dataQuality?.confidence ?? "LOW",
      reason: meta?.dataQuality?.confidence_reason ?? "Unknown.",
    },
    student_context: buildStudentContext(evidenceEntry, evidenceArtifact.request?.params ?? evidenceArtifact.request?.body?.params),
    query_labels: task.query_labels ?? [],
    semantic_context: buildSemanticContext(task, datasets),
    ai_summary_config: buildAISummaryConfig(task),
  };
}

function validateExplanation({ record, aiRes }) {
  const issues = [];
  const body = aiRes.body;

  if (!aiRes.ok || aiRes.http_status !== 200 || !body) {
    issues.push({
      severity: "error",
      code: "ai_explain_request_failed",
      message: "AI explain request failed or returned non-JSON body.",
      details: {
        http_status: aiRes.http_status,
        transport_error: aiRes.transport_error,
      },
    });
    return issues;
  }

  if (body.degraded === true) {
    issues.push({
      severity: "error",
      code: "ai_explain_degraded",
      message: "AI explain returned degraded=true.",
      details: {
        warnings: body.explanation?.warnings ?? [],
      },
    });
  }

  if (body.ai_summary_method !== record.explanation_mode) {
    issues.push({
      severity: "error",
      code: "ai_summary_method_mismatch",
      message: "Observed AI summary method does not match planned explanation_mode.",
      details: {
        expected: record.explanation_mode,
        actual: body.ai_summary_method ?? null,
      },
    });
  }

  if (!body.explanation || typeof body.explanation.summary !== "string" || body.explanation.summary.trim() === "") {
    issues.push({
      severity: "error",
      code: "missing_explanation_summary",
      message: "AI explain response is missing a non-empty explanation.summary.",
    });
  }

  return issues;
}

function safeFileStem(value) {
  return String(value).replace(/[^A-Za-z0-9_.-]+/g, "_");
}

async function buildExplanationForRecord({ evidenceEntry, registry, args }) {
  const task = getTask(registry, evidenceEntry.task_id);
  if (!task) {
    return {
      manifestEntry: {
        record_id: evidenceEntry.record_id,
        status: "failed",
        issues: [{
          severity: "error",
          code: "task_missing_from_registry",
          message: "Task not found in taskRegistry.json.",
        }],
      },
      issues: [],
    };
  }

  const evidenceArtifact = await readJson(repoPathToAbsolute(evidenceEntry.full_query_artifact.path));
  const hydratedEntry = {
    ...evidenceEntry,
    case_id: evidenceEntry.case_id ?? evidenceEntry.evidence_id ?? `${evidenceEntry.dataset_id}__${evidenceEntry.task_id}`,
    class_id: evidenceEntry.class_id ?? evidenceArtifact.class_id ?? null,
    student_id: evidenceEntry.student_id ?? evidenceArtifact.student_id ?? null,
    role: evidenceEntry.role ?? evidenceArtifact.role ?? null,
    task_name: evidenceEntry.task_name ?? evidenceArtifact.task_name ?? task.taskName,
  };
  const payload = buildExplainPayload({ evidenceArtifact, evidenceEntry: hydratedEntry, task });
  const endpoint = args.modeEndpoints[evidenceEntry.explanation_mode];
  let aiRes = null;
  let issues = [];
  let attempt = 0;
  const attempts = Math.max(1, (args.retryAttempts ?? 0) + 1);
  while (attempt < attempts) {
    attempt += 1;
    aiRes = await requestJson(`${endpoint}/explain`, {
      method: "POST",
      body: JSON.stringify(payload),
      timeoutMs: args.requestTimeoutMs,
    });
    issues = validateExplanation({ record: evidenceEntry, aiRes });
    if (!issues.some((issue) => issue.severity === "error")) break;
  }

  const artifact = {
    artifact_type: "llm_judge_v2_phase6_3b_ai_explanation",
    generated_at: new Date().toISOString(),
    ai_service_url: endpoint,
    endpoint: "/explain",
    record: {
      record_id: hydratedEntry.record_id,
      case_id: hydratedEntry.case_id,
      dataset_id: hydratedEntry.dataset_id,
      class_id: hydratedEntry.class_id,
      student_id: hydratedEntry.student_id,
      role: hydratedEntry.role,
      task_id: hydratedEntry.task_id,
      task_name: hydratedEntry.task_name,
      explanation_mode: hydratedEntry.explanation_mode,
    },
    source_evidence: {
      evidence_manifest_path: toRepoPath(args.evidenceManifestPath),
      full_query_artifact_path: evidenceEntry.full_query_artifact.path,
      full_query_artifact_sha256: evidenceEntry.full_query_artifact.sha256,
    },
    request_payload: payload,
    response_metadata: {
      http_status: aiRes.http_status,
      latency_ms: aiRes.latency_ms,
      transport_error: aiRes.transport_error,
      degraded: aiRes.body?.degraded ?? null,
      expected_ai_summary_method: evidenceEntry.explanation_mode,
      observed_ai_summary_method: aiRes.body?.ai_summary_method ?? null,
      model: aiRes.body?.meta?.model ?? null,
      token_usage: aiRes.body?.meta?.token_usage ?? null,
      attempts,
      final_attempt: attempt,
    },
    response_body: aiRes.body,
    raw_text: compactRawText(aiRes.body),
  };

  const artifactText = `${JSON.stringify(artifact, null, 2)}\n`;
  const artifactSha256 = sha256Text(artifactText);
  const artifactPath = path.join(args.explanationArtifactsDir, `${safeFileStem(evidenceEntry.record_id)}.json`);
  await writeFile(artifactPath, artifactText, "utf8");

  const status = issues.some((issue) => issue.severity === "error")
    ? "failed"
    : "explanation_ready";

  const manifestEntry = {
    record_id: hydratedEntry.record_id,
    case_id: hydratedEntry.case_id,
    dataset_id: hydratedEntry.dataset_id,
    class_id: hydratedEntry.class_id,
    student_id: hydratedEntry.student_id,
    role: hydratedEntry.role,
    task_id: hydratedEntry.task_id,
    task_name: hydratedEntry.task_name,
    explanation_mode: hydratedEntry.explanation_mode,
    status,
    ai_service_url: endpoint,
    explanation_artifact: {
      path: toRepoPath(artifactPath),
      sha256: artifactSha256,
    },
    expected_ai_summary_method: evidenceEntry.explanation_mode,
    observed_ai_summary_method: aiRes.body?.ai_summary_method ?? null,
    degraded: aiRes.body?.degraded ?? null,
    model: aiRes.body?.meta?.model ?? null,
    token_usage: aiRes.body?.meta?.token_usage ?? null,
    latency_ms: aiRes.latency_ms,
    attempts_used: attempt,
    raw_text_length: artifact.raw_text.length,
    issues,
    next_step: "phase6_4_judge_input_materialization",
  };

  return {
    manifestEntry,
    issues: issues.map((issue) => ({
      ...issue,
      record_id: evidenceEntry.record_id,
      case_id: evidenceEntry.case_id,
      task_id: evidenceEntry.task_id,
      dataset_id: evidenceEntry.dataset_id,
      explanation_mode: evidenceEntry.explanation_mode,
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

function summarize({ generatedAt, evidenceEntries, explanationEntries, issues, args }) {
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const ready = explanationEntries.filter((entry) => entry.status === "explanation_ready");
  const failed = explanationEntries.filter((entry) => entry.status === "failed");
  const sliceComplete = errors.length === 0 && ready.length === evidenceEntries.length;
  const isDatasetSlice = Array.isArray(args.datasets) && args.datasets.length === 1;
  const aggregateBaselineAllowed = isDatasetSlice && sliceComplete && args.otherDatasetComplete === true;

  return {
    report_version: "llm_judge_v2_phase6_3b_explanation_builder_report_v1",
    generated_at: generatedAt,
    status: errors.length === 0 && ready.length === evidenceEntries.length ? "PASS" : "FAIL",
    phase_scope: ["6.3b explanation builder"],
    mode_endpoints: args.modeEndpoints,
    inputs: {
      evidence_manifest_jsonl: toRepoPath(args.evidenceManifestPath),
      task_registry_path: "Backend/src/config/taskRegistry.json",
    },
    counts: {
      evidence_ready_records: evidenceEntries.length,
      explanation_ready_records: ready.length,
      failed_records: failed.length,
      errors: errors.length,
      warnings: warnings.length,
    },
    coverage_summary: {
      datasets: countBy(explanationEntries, (entry) => entry.dataset_id),
      roles: countBy(explanationEntries, (entry) => entry.role),
      explanation_modes: countBy(explanationEntries, (entry) => entry.explanation_mode),
      observed_ai_summary_methods: countBy(explanationEntries, (entry) => entry.observed_ai_summary_method ?? "null"),
      statuses: countBy(explanationEntries, (entry) => entry.status),
    },
    outputs: {
      explanation_manifest_jsonl: toRepoPath(args.explanationManifestPath),
      explanation_artifacts_dir: toRepoPath(args.explanationArtifactsDir),
      report_json: toRepoPath(args.reportJsonPath),
      report_md: toRepoPath(args.reportMdPath),
    },
    gate_decision: {
      current_dataset_slice_complete: sliceComplete,
      next_dataset_baseline_allowed: isDatasetSlice && args.datasets[0] === "SAMPLE_UCI_POR" && sliceComplete && !args.otherDatasetComplete,
      aggregate_baseline_allowed: aggregateBaselineAllowed,
      phase6_4_judge_input_materializer_allowed: sliceComplete && !isDatasetSlice,
      judge_invocation_allowed: false,
      official_full_evaluation_allowed: false,
      reason: aggregateBaselineAllowed
        ? "Both baseline dataset slices pass. Build the 104-record baseline aggregate next; judge input materialization remains disabled."
        : sliceComplete && isDatasetSlice
          ? "Current dataset explanation slice is complete. Run the remaining dataset and build the 104-record baseline aggregate before judge input materialization."
        : sliceComplete
          ? "All evidence-ready records have valid AI explanations with expected summary mode. Judge input materialization may run next."
        : "Explanation builder found failed records or mode mismatches. Fix before judge input materialization.",
    },
    issues,
  };
}

function renderMarkdown(report) {
  const lines = [
    "# LLM Judge V2 Phase 6.3b Explanation Builder Report",
    "",
    `- Generated at: ${report.generated_at}`,
    `- Status: ${report.status}`,
    `- Evidence-ready records: ${report.counts.evidence_ready_records}`,
    `- Explanation-ready records: ${report.counts.explanation_ready_records}`,
    `- Failed records: ${report.counts.failed_records}`,
    `- Errors: ${report.counts.errors}`,
    `- Warnings: ${report.counts.warnings}`,
    "",
    "## Mode Endpoints",
    "",
    `- baseline_first_20_rows: ${report.mode_endpoints.baseline_first_20_rows}`,
    `- task_aware_data_summarization: ${report.mode_endpoints.task_aware_data_summarization}`,
    "",
    "## Gate Decision",
    "",
    `- Current dataset slice complete: ${report.gate_decision.current_dataset_slice_complete}`,
    `- Next dataset baseline allowed: ${report.gate_decision.next_dataset_baseline_allowed}`,
    `- Aggregate baseline allowed: ${report.gate_decision.aggregate_baseline_allowed}`,
    `- Phase 6.4 judge input materializer allowed: ${report.gate_decision.phase6_4_judge_input_materializer_allowed}`,
    `- Judge invocation allowed: ${report.gate_decision.judge_invocation_allowed}`,
    `- Reason: ${report.gate_decision.reason}`,
    "",
    "## Coverage",
    "",
    "| Dimension | Counts |",
    "| --- | --- |",
    `| Datasets | ${JSON.stringify(report.coverage_summary.datasets)} |`,
    `| Roles | ${JSON.stringify(report.coverage_summary.roles)} |`,
    `| Explanation modes | ${JSON.stringify(report.coverage_summary.explanation_modes)} |`,
    `| Observed AI summary methods | ${JSON.stringify(report.coverage_summary.observed_ai_summary_methods)} |`,
    `| Statuses | ${JSON.stringify(report.coverage_summary.statuses)} |`,
    "",
    "## Outputs",
    "",
    `- Explanation manifest: \`${report.outputs.explanation_manifest_jsonl}\``,
    `- Explanation artifacts dir: \`${report.outputs.explanation_artifacts_dir}\``,
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

async function verifyModeEndpoints(args) {
  const failures = [];
  const selectedModes = args.modes ?? Object.keys(args.modeEndpoints);
  for (const mode of selectedModes) {
    const baseUrl = args.modeEndpoints[mode];
    if (!baseUrl) {
      failures.push(`${mode} has no configured endpoint`);
      continue;
    }
    const res = await requestJson(`${baseUrl}/health`, { timeoutMs: 5000 });
    if (!res.ok) {
      failures.push(`${mode} endpoint ${baseUrl} failed health check: ${res.transport_error ?? res.http_status}`);
    }
  }
  if (failures.length > 0) {
    throw new Error(failures.join("; "));
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const generatedAt = new Date().toISOString();

  await mkdir(args.outputDir, { recursive: true });
  await mkdir(args.explanationArtifactsDir, { recursive: true });
  await verifyModeEndpoints(args);

  const registry = await readJson(TASK_REGISTRY_PATH);
  const allEvidenceEntries = (await readJsonl(args.evidenceManifestPath))
    .filter((entry) => entry.status === "evidence_ready")
    .filter((entry) => !args.modes || args.modes.includes(entry.explanation_mode))
    .filter((entry) => !args.datasets || args.datasets.includes(entry.dataset_id))
    .slice(0, Number.isInteger(args.limit) && args.limit > 0 ? args.limit : undefined);

  args.otherDatasetComplete = false;
  if (Array.isArray(args.datasets) && args.datasets.length === 1) {
    const otherDatasetId = args.datasets[0] === "SAMPLE_UCI_POR" ? "SAMPLE_OULAD" : "SAMPLE_UCI_POR";
    try {
      const otherReport = await readJson(path.join(path.dirname(args.outputDir), otherDatasetId, `${args.reportBasename}.json`));
      args.otherDatasetComplete = otherReport.status === "PASS" && otherReport.gate_decision?.current_dataset_slice_complete === true;
    } catch {
      args.otherDatasetComplete = false;
    }
  }

  let existingEntries = [];
  if (args.resume) {
    try {
      existingEntries = await readJsonl(args.explanationManifestPath);
    } catch {
      existingEntries = [];
    }
  }
  const existingById = new Map(existingEntries.map((entry) => [entry.record_id, entry]));
  const evidenceEntries = args.resume
    ? allEvidenceEntries.filter((entry) => existingById.get(entry.record_id)?.status !== "explanation_ready")
    : allEvidenceEntries;

  const explanationEntries = [];
  const issues = [];

  for (const evidenceEntry of evidenceEntries) {
    console.log(`[phase6.3b] ${evidenceEntry.record_id}`);
    const result = await buildExplanationForRecord({ evidenceEntry, registry, args });
    explanationEntries.push(result.manifestEntry);
    issues.push(...result.issues);
  }

  const newById = new Map(explanationEntries.map((entry) => [entry.record_id, entry]));
  const mergedExplanationEntries = args.resume
    ? allEvidenceEntries.map((entry) => newById.get(entry.record_id) ?? existingById.get(entry.record_id)).filter(Boolean)
    : explanationEntries;
  const mergedIssues = mergedExplanationEntries.flatMap((entry) => (entry.issues ?? []).map((issue) => ({
    ...issue,
    record_id: entry.record_id,
    case_id: entry.case_id,
    task_id: entry.task_id,
    dataset_id: entry.dataset_id,
    explanation_mode: entry.explanation_mode,
  })));

  const report = summarize({
    generatedAt,
    evidenceEntries: allEvidenceEntries,
    explanationEntries: mergedExplanationEntries,
    issues: mergedIssues,
    args,
  });

  await writeFile(
    args.explanationManifestPath,
    `${mergedExplanationEntries.map((entry) => JSON.stringify(entry)).join("\n")}\n`,
    "utf8",
  );
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderMarkdown(report), "utf8");

  console.log(JSON.stringify({
    ok: report.status === "PASS",
    status: report.status,
    evidence_ready_records: report.counts.evidence_ready_records,
    explanation_ready_records: report.counts.explanation_ready_records,
    failed_records: report.counts.failed_records,
    errors: report.counts.errors,
    warnings: report.counts.warnings,
    explanation_manifest_jsonl: report.outputs.explanation_manifest_jsonl,
    explanation_artifacts_dir: report.outputs.explanation_artifacts_dir,
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
