import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUNS_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs");

const DEFAULT_EVIDENCE_MANIFEST_PATH = path.join(RUNS_ROOT, "phase6_evidence/evidence_manifest.jsonl");
const DEFAULT_EXPLANATION_MANIFESTS = [
  path.join(RUNS_ROOT, "phase6_explanations_baseline/explanation_manifest.jsonl"),
  path.join(RUNS_ROOT, "phase6_explanations_task_aware/explanation_manifest.jsonl"),
];
const DEFAULT_OUTPUT_DIR = path.join(RUNS_ROOT, "phase6_judge_inputs");
const JUDGE_INPUTS_DIRNAME = "judge_inputs";
const RETRIEVAL_LOGS_DIRNAME = "retrieval_logs";

const TASK_REGISTRY_PATH = path.join(PROJECT_ROOT, "Backend/src/config/taskRegistry.json");
const TASK_REQUIREMENTS_PATH = path.join(
  PROJECT_ROOT,
  "Docs/evaluation_v2/Rubric/task_evaluation_requirements.json",
);
const JUDGE_INPUT_SCHEMA_PATH = path.join(
  PROJECT_ROOT,
  "Docs/evaluation_v2/Input_AI/judge_input_schema.json",
);

const DEFAULT_PROMPT_VERSION = "judge_prompt_v2_pilot_v1";
const DEFAULT_RUBRIC_VERSION = "judge_rubric_1_to_10_pilot_v1";
const DEFAULT_EVALUATION_RUN_ID = "llm_judge_v2_pilot_phase6_4";
const FORBIDDEN_PROVENANCE_ONLY_FIELDS = new Set(["source_field", "review_status", "review_note"]);

function parseArgs(argv) {
  const args = {
    evidenceManifestPath: DEFAULT_EVIDENCE_MANIFEST_PATH,
    explanationManifestPaths: [...DEFAULT_EXPLANATION_MANIFESTS],
    outputDir: DEFAULT_OUTPUT_DIR,
    promptVersion: DEFAULT_PROMPT_VERSION,
    rubricVersion: DEFAULT_RUBRIC_VERSION,
    evaluationRunId: DEFAULT_EVALUATION_RUN_ID,
    reportBasename: "phase6_judge_input_validation_report",
    sharedEvidenceManifestPath: null,
    tasks: null,
    datasets: null,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--evidence-manifest") args.evidenceManifestPath = path.resolve(next), i += 1;
    else if (arg === "--explanation-manifests") {
      args.explanationManifestPaths = splitList(next).map((item) => path.resolve(item));
      i += 1;
    } else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else if (arg === "--prompt-version") args.promptVersion = next, i += 1;
    else if (arg === "--rubric-version") args.rubricVersion = next, i += 1;
    else if (arg === "--evaluation-run-id") args.evaluationRunId = next, i += 1;
    else if (arg === "--report-basename") args.reportBasename = next, i += 1;
    else if (arg === "--shared-evidence-manifest") args.sharedEvidenceManifestPath = path.resolve(next), i += 1;
    else if (arg === "--tasks") args.tasks = splitList(next), i += 1;
    else if (arg === "--datasets") args.datasets = splitList(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    ...args,
    judgeInputsDir: path.join(args.outputDir, JUDGE_INPUTS_DIRNAME),
    retrievalLogsDir: path.join(args.outputDir, RETRIEVAL_LOGS_DIRNAME),
    judgeInputManifestPath: path.join(args.outputDir, "judge_input_manifest.jsonl"),
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

function safeFileStem(value) {
  return String(value).replace(/[^A-Za-z0-9_.-]+/g, "_");
}

function getTask(registry, taskId) {
  return registry.find((task) => task.taskId === taskId) ?? null;
}

function getRequirement(requirements, taskId) {
  return (requirements.tasks ?? []).find((task) => task.task_id === taskId) ?? null;
}

function stripRequirementRecords(records = []) {
  return records.map((item) => ({
    requirement_id: item.requirement_id,
    description: item.description,
  }));
}

function stripConstraintRecords(records = []) {
  return records.map((item) => ({
    constraint_id: item.constraint_id,
    description: item.description,
  }));
}

function getDatasetRows(evidenceArtifact) {
  return evidenceArtifact.response_body?.datasets
    ?? evidenceArtifact.full_response_body?.datasets
    ?? {};
}

function buildDatasetBreakdown(evidenceEntry, evidenceArtifact) {
  if (Array.isArray(evidenceEntry.dataset_breakdown) && evidenceEntry.dataset_breakdown.length > 0) {
    return evidenceEntry.dataset_breakdown.map((item) => ({
      label: item.label,
      row_count: item.row_count ?? 0,
    }));
  }

  const datasets = getDatasetRows(evidenceArtifact);
  const inferred = Object.entries(datasets).map(([label, rows]) => ({
    label,
    row_count: Array.isArray(rows) ? rows.length : 0,
  }));
  if (inferred.length > 0) return inferred;

  return [{
    label: evidenceEntry.dataset_id,
    row_count: evidenceEntry.row_count_observed ?? 0,
  }];
}

function buildRetrievedRowCountByDataset(evidenceEntry, evidenceArtifact) {
  return Object.fromEntries(
    buildDatasetBreakdown(evidenceEntry, evidenceArtifact)
      .map((item) => [item.label, item.row_count ?? 0]),
  );
}

function buildFullQueryArtifacts(evidenceEntry, evidenceArtifact) {
  return buildDatasetBreakdown(evidenceEntry, evidenceArtifact).map((item) => ({
    dataset_label: item.label,
    artifact_path: evidenceEntry.full_query_artifact.path,
    artifact_sha256: evidenceEntry.full_query_artifact.sha256,
    row_count: item.row_count ?? 0,
    readable: true,
  }));
}

async function buildRetrievalLog({ evidenceEntry, evidenceArtifact, retrievalLogsDir }) {
  if (evidenceEntry.expected_evidence_access_path !== "deterministic_artifact_retrieval") {
    return {
      retrievalLogPath: null,
      retrievedRowRanges: [],
      retrievedChunkIds: [],
    };
  }

  const datasets = getDatasetRows(evidenceArtifact);
  const chunks = Object.entries(datasets).map(([label, rows], index) => {
    const rowCount = Array.isArray(rows) ? rows.length : 0;
    return {
      chunk_id: `${safeFileStem(evidenceEntry.record_id)}__${safeFileStem(label)}__chunk_${index + 1}`,
      dataset_label: label,
      row_start_inclusive: rowCount > 0 ? 0 : null,
      row_end_inclusive: rowCount > 0 ? rowCount - 1 : null,
      row_count: rowCount,
      source_artifact_path: evidenceEntry.full_query_artifact.path,
      source_artifact_sha256: evidenceEntry.full_query_artifact.sha256,
    };
  });

  const retrievalLog = {
    artifact_type: "llm_judge_v2_phase6_4_deterministic_retrieval_log",
    generated_at: new Date().toISOString(),
    record_id: evidenceEntry.record_id,
    retrieval_request_complete: true,
    retrieval_coverage_status: "full",
    chunks,
  };

  const logPath = path.join(retrievalLogsDir, `${safeFileStem(evidenceEntry.record_id)}.json`);
  await writeFile(logPath, `${JSON.stringify(retrievalLog, null, 2)}\n`, "utf8");

  return {
    retrievalLogPath: toRepoPath(logPath),
    retrievedRowRanges: chunks.map((chunk) => ({
      dataset_label: chunk.dataset_label,
      start: chunk.row_start_inclusive,
      end: chunk.row_end_inclusive,
    })),
    retrievedChunkIds: chunks.map((chunk) => chunk.chunk_id),
  };
}

async function buildEvidenceAccess({ evidenceEntry, evidenceArtifact, retrievalLogsDir, sharedEvidence }) {
  const mode = evidenceEntry.expected_evidence_access_path;
  const retrieval = await buildRetrievalLog({ evidenceEntry, evidenceArtifact, retrievalLogsDir });
  const rowCountsByDataset = buildRetrievedRowCountByDataset(evidenceEntry, evidenceArtifact);
  const isDirect = mode === "direct_embedding";

  return {
    full_result_row_count: evidenceEntry.row_count_observed,
    full_query_artifacts: buildFullQueryArtifacts(evidenceEntry, evidenceArtifact),
    evidence_access_mode: mode,
    small_result_row_threshold: 20,
    direct_embedding_token_budget: 120000,
    prompt_embedded_row_count: isDirect ? evidenceEntry.row_count_observed : 0,
    retrieved_row_count: isDirect ? 0 : evidenceEntry.row_count_observed,
    retrieved_row_count_by_dataset: isDirect ? {} : rowCountsByDataset,
    retrieved_row_ranges: retrieval.retrievedRowRanges,
    retrieved_chunk_ids: retrieval.retrievedChunkIds,
    retrieval_log_path: retrieval.retrievalLogPath,
    retrieval_request_complete: true,
    retrieval_coverage_status: isDirect ? "not_applicable" : "full",
    full_access_available: true,
    deterministic_scan_scope: "full_query_artifact_all_rows",
    deterministic_scan_row_count_by_dataset: rowCountsByDataset,
    full_result_sent_to_llm: isDirect,
    deterministic_checks: sharedEvidence ? [{
      check_type: "task_aware_shared_evidence_contract",
      case_id: sharedEvidence.case_id,
      task_id: sharedEvidence.task_id,
      sidecar_sha256: sharedEvidence.sidecar_sha256,
      evidence: sharedEvidence.payload,
    }] : [],
    checked_claim_types: sharedEvidence ? ["task_specific_evidence_contract"] : [],
    unchecked_claim_types: [
      "semantic_interpretation",
      "causal_framing",
      "actionability_quality",
    ],
    judge_evidence_citations: [],
  };
}

function buildTaskContext(task) {
  return {
    task_name: task.taskName,
    scope: task.scope,
    actionable_question: task.actionableQuestion,
    target_audience: Array.isArray(task.target_audience)
      ? task.target_audience.join(", ")
      : String(task.target_audience ?? ""),
    ai_summary_type: task.aiSummaryType ?? "generic_fallback",
    ai_prompt_hint: task.aiPromptHint ?? null,
    query_labels: task.query_labels ?? [],
    explanation_strategy: task.explanation_strategy ?? null,
  };
}

function buildSchemaContext(task) {
  return {
    source_tables: task.sourceTables ?? [],
    key_db_fields: task.keyDbFields ?? [],
    output_schema: task.output_schema ?? {},
    query_labels: task.query_labels ?? [],
  };
}

function buildExplanation(explanationArtifact, explanationEntry) {
  return {
    raw_text: explanationArtifact.raw_text ?? "",
    structured_payload: explanationArtifact.response_body ?? {},
    generation_metadata: {
      explanation_artifact_path: explanationEntry.explanation_artifact.path,
      explanation_artifact_sha256: explanationEntry.explanation_artifact.sha256,
      ai_service_url: explanationEntry.ai_service_url,
      expected_ai_summary_method: explanationEntry.expected_ai_summary_method,
      observed_ai_summary_method: explanationEntry.observed_ai_summary_method,
      degraded: explanationEntry.degraded,
      model: explanationEntry.model,
      token_usage: explanationEntry.token_usage,
      latency_ms: explanationEntry.latency_ms,
      attempts_used: explanationEntry.attempts_used ?? null,
    },
  };
}

function buildEvaluationRequirements(requirementTask) {
  return {
    required_core_outputs: stripRequirementRecords(requirementTask.required_core_outputs),
    required_supporting_outputs: stripRequirementRecords(requirementTask.required_supporting_outputs),
    evaluation_constraints: stripConstraintRecords(requirementTask.evaluation_constraints),
    safety_fairness_applicability: requirementTask.safety_fairness_applicability,
    safety_fairness_note: requirementTask.safety_fairness_note,
  };
}

async function materializeJudgeInput({ evidenceEntry, explanationEntry, registry, requirements, outputPaths, sharedEvidence }) {
  const task = getTask(registry, evidenceEntry.task_id);
  const requirementTask = getRequirement(requirements, evidenceEntry.task_id);
  const evidenceArtifact = await readJson(repoPathToAbsolute(evidenceEntry.full_query_artifact.path));
  const explanationArtifact = await readJson(repoPathToAbsolute(explanationEntry.explanation_artifact.path));

  const judgeInput = {
    schema_version: "judge_input_schema_v1",
    record_id: evidenceEntry.record_id,
    evaluation_run_id: outputPaths.evaluationRunId,
    dataset_id: evidenceEntry.dataset_id,
    task_id: evidenceEntry.task_id,
    explanation_mode: evidenceEntry.explanation_mode,
    prompt_version: outputPaths.promptVersion,
    rubric_version: outputPaths.rubricVersion,
    task_context: buildTaskContext(task),
    schema_context: buildSchemaContext(task),
    explanation: buildExplanation(explanationArtifact, explanationEntry),
    evidence_access: await buildEvidenceAccess({
      evidenceEntry,
      evidenceArtifact,
      retrievalLogsDir: outputPaths.retrievalLogsDir,
      sharedEvidence,
    }),
    evaluation_requirements: buildEvaluationRequirements(requirementTask),
  };

  return judgeInput;
}

function collectForbiddenFieldPaths(value, prefix = "$") {
  const paths = [];
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      paths.push(...collectForbiddenFieldPaths(item, `${prefix}[${index}]`));
    });
    return paths;
  }
  if (!value || typeof value !== "object") return paths;
  for (const [key, child] of Object.entries(value)) {
    const nextPath = `${prefix}.${key}`;
    if (FORBIDDEN_PROVENANCE_ONLY_FIELDS.has(key)) paths.push(nextPath);
    paths.push(...collectForbiddenFieldPaths(child, nextPath));
  }
  return paths;
}

function validateJudgeInput(input) {
  const errors = [];
  const topAllowed = new Set([
    "schema_version",
    "record_id",
    "evaluation_run_id",
    "dataset_id",
    "task_id",
    "explanation_mode",
    "prompt_version",
    "rubric_version",
    "task_context",
    "schema_context",
    "explanation",
    "evidence_access",
    "evaluation_requirements",
  ]);
  const required = [...topAllowed];

  for (const key of required) {
    if (!(key in input)) errors.push(`missing top-level field ${key}`);
  }
  for (const key of Object.keys(input)) {
    if (!topAllowed.has(key)) errors.push(`unexpected top-level field ${key}`);
  }
  if (input.schema_version !== "judge_input_schema_v1") errors.push("schema_version must be judge_input_schema_v1");
  if (!["SAMPLE_UCI_POR", "SAMPLE_OULAD"].includes(input.dataset_id)) errors.push("invalid dataset_id");
  if (!/^[SA]-[A-Z][0-9]{2}$/.test(input.task_id ?? "")) errors.push("invalid task_id");
  if (!["baseline_first_20_rows", "task_aware_data_summarization"].includes(input.explanation_mode)) errors.push("invalid explanation_mode");

  const forbiddenFieldPaths = collectForbiddenFieldPaths(input);
  for (const fieldPath of forbiddenFieldPaths) {
    errors.push(`forbidden provenance-only field present: ${fieldPath}`);
  }

  const tc = input.task_context ?? {};
  for (const key of ["task_name", "scope", "actionable_question", "target_audience", "ai_summary_type"]) {
    if (typeof tc[key] !== "string" || tc[key].length === 0) errors.push(`task_context.${key} must be non-empty string`);
  }

  const sc = input.schema_context ?? {};
  if (!Array.isArray(sc.source_tables)) errors.push("schema_context.source_tables must be array");
  if (!Array.isArray(sc.key_db_fields)) errors.push("schema_context.key_db_fields must be array");
  if (!("output_schema" in sc)) errors.push("schema_context.output_schema missing");

  const exp = input.explanation ?? {};
  const expAllowed = new Set(["raw_text", "structured_payload", "generation_metadata"]);
  for (const key of ["raw_text", "structured_payload", "generation_metadata"]) {
    if (!(key in exp)) errors.push(`explanation.${key} missing`);
  }
  for (const key of Object.keys(exp)) {
    if (!expAllowed.has(key)) errors.push(`unexpected explanation.${key}`);
  }
  if (typeof exp.raw_text !== "string") errors.push("explanation.raw_text must be string");

  const ea = input.evidence_access ?? {};
  const eaRequired = [
    "full_result_row_count",
    "full_query_artifacts",
    "evidence_access_mode",
    "small_result_row_threshold",
    "direct_embedding_token_budget",
    "prompt_embedded_row_count",
    "retrieved_row_count",
    "retrieved_row_count_by_dataset",
    "retrieved_row_ranges",
    "retrieved_chunk_ids",
    "retrieval_log_path",
    "retrieval_request_complete",
    "retrieval_coverage_status",
    "full_access_available",
    "deterministic_scan_scope",
    "deterministic_scan_row_count_by_dataset",
    "full_result_sent_to_llm",
    "deterministic_checks",
    "checked_claim_types",
    "unchecked_claim_types",
    "judge_evidence_citations",
  ];
  for (const key of eaRequired) {
    if (!(key in ea)) errors.push(`evidence_access.${key} missing`);
  }
  if (!Number.isInteger(ea.full_result_row_count) || ea.full_result_row_count < 0) errors.push("evidence_access.full_result_row_count invalid");
  if (!Array.isArray(ea.full_query_artifacts) || ea.full_query_artifacts.length < 1) errors.push("evidence_access.full_query_artifacts invalid");
  if (!["direct_embedding", "deterministic_artifact_retrieval"].includes(ea.evidence_access_mode)) errors.push("evidence_access.evidence_access_mode invalid");
  if (ea.small_result_row_threshold !== 20) errors.push("evidence_access.small_result_row_threshold must be 20");
  if (!["full", "partial", "not_applicable", "failed"].includes(ea.retrieval_coverage_status)) errors.push("evidence_access.retrieval_coverage_status invalid");

  for (const artifact of ea.full_query_artifacts ?? []) {
    const allowed = new Set(["dataset_label", "artifact_path", "artifact_sha256", "row_count", "readable"]);
    for (const key of ["dataset_label", "artifact_path", "artifact_sha256", "row_count", "readable"]) {
      if (!(key in artifact)) errors.push(`full_query_artifacts item missing ${key}`);
    }
    for (const key of Object.keys(artifact)) {
      if (!allowed.has(key)) errors.push(`unexpected full_query_artifacts item field ${key}`);
    }
    if (!/^[a-f0-9]{64}$/.test(artifact.artifact_sha256 ?? "")) errors.push("full_query_artifacts artifact_sha256 invalid");
  }

  const req = input.evaluation_requirements ?? {};
  const reqAllowed = new Set([
    "required_core_outputs",
    "required_supporting_outputs",
    "evaluation_constraints",
    "safety_fairness_applicability",
    "safety_fairness_note",
  ]);
  for (const key of reqAllowed) {
    if (!(key in req)) errors.push(`evaluation_requirements.${key} missing`);
  }
  for (const key of Object.keys(req)) {
    if (!reqAllowed.has(key)) errors.push(`unexpected evaluation_requirements.${key}`);
  }
  if (!["applicable", "not_applicable"].includes(req.safety_fairness_applicability)) errors.push("invalid safety_fairness_applicability");
  if (typeof req.safety_fairness_note !== "string" || req.safety_fairness_note.length === 0) errors.push("safety_fairness_note invalid");

  for (const item of req.required_core_outputs ?? []) {
    const keys = Object.keys(item);
    if (!keys.includes("requirement_id") || !keys.includes("description")) errors.push("core requirement missing required field");
    if (keys.some((key) => !["requirement_id", "description"].includes(key))) errors.push("core requirement has extra field");
  }
  for (const item of req.required_supporting_outputs ?? []) {
    const keys = Object.keys(item);
    if (!keys.includes("requirement_id") || !keys.includes("description")) errors.push("supporting requirement missing required field");
    if (keys.some((key) => !["requirement_id", "description"].includes(key))) errors.push("supporting requirement has extra field");
  }
  for (const item of req.evaluation_constraints ?? []) {
    const keys = Object.keys(item);
    if (!keys.includes("constraint_id") || !keys.includes("description")) errors.push("constraint missing required field");
    if (keys.some((key) => !["constraint_id", "description"].includes(key))) errors.push("constraint has extra field");
  }

  return errors;
}

function countBy(items, keyFn) {
  const counts = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function summarize({ generatedAt, manifestEntries, issues, args }) {
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const ready = manifestEntries.filter((entry) => entry.status === "judge_input_ready");
  const failed = manifestEntries.filter((entry) => entry.status === "failed");

  return {
    report_version: "llm_judge_v2_phase_f5_judge_input_validation_report_v1",
    generated_at: generatedAt,
    status: errors.length === 0 && ready.length === manifestEntries.length ? "PASS" : "FAIL",
    phase_scope: ["F5 judge input materializer/schema validator"],
    versions: {
      prompt_version: args.promptVersion,
      rubric_version: args.rubricVersion,
      evaluation_run_id: args.evaluationRunId,
    },
    inputs: {
      evidence_manifest_jsonl: toRepoPath(args.evidenceManifestPath),
      explanation_manifest_jsonl: args.explanationManifestPaths.map(toRepoPath),
      task_registry_path: "Backend/src/config/taskRegistry.json",
      task_requirements_path: "Docs/evaluation_v2/Rubric/task_evaluation_requirements.json",
      judge_input_schema_path: "Docs/evaluation_v2/Input_AI/judge_input_schema.json",
    },
    counts: {
      judge_input_ready_records: ready.length,
      failed_records: failed.length,
      total_records: manifestEntries.length,
      errors: errors.length,
      warnings: warnings.length,
    },
    coverage_summary: {
      datasets: countBy(manifestEntries, (entry) => entry.dataset_id),
      explanation_modes: countBy(manifestEntries, (entry) => entry.explanation_mode),
      evidence_access_modes: countBy(manifestEntries, (entry) => entry.evidence_access_mode),
      statuses: countBy(manifestEntries, (entry) => entry.status),
    },
    outputs: {
      judge_input_manifest_jsonl: toRepoPath(args.judgeInputManifestPath),
      judge_inputs_dir: toRepoPath(args.judgeInputsDir),
      retrieval_logs_dir: toRepoPath(args.retrievalLogsDir),
      report_json: toRepoPath(args.reportJsonPath),
      report_md: toRepoPath(args.reportMdPath),
    },
    gate_decision: {
      judge_input_review_allowed: errors.length === 0 && ready.length === manifestEntries.length,
      judge_invocation_allowed: false,
      official_full_evaluation_allowed: false,
      reason: errors.length === 0 && ready.length === manifestEntries.length
        ? "All judge inputs materialized and passed schema validation. Build and validate final judge contexts before judge invocation."
        : "Judge input materialization or validation failed. Fix errors before review/invocation.",
    },
    issues,
  };
}

function renderMarkdown(report) {
  const lines = [
    "# LLM Judge V2 Phase F5 Judge Input Validation Report",
    "",
    `- Generated at: ${report.generated_at}`,
    `- Status: ${report.status}`,
    `- Judge input ready records: ${report.counts.judge_input_ready_records}`,
    `- Failed records: ${report.counts.failed_records}`,
    `- Total records: ${report.counts.total_records}`,
    `- Errors: ${report.counts.errors}`,
    `- Warnings: ${report.counts.warnings}`,
    "",
    "## Versions",
    "",
    `- Prompt version: ${report.versions.prompt_version}`,
    `- Rubric version: ${report.versions.rubric_version}`,
    `- Evaluation run id: ${report.versions.evaluation_run_id}`,
    "",
    "## Gate Decision",
    "",
    `- Judge input review allowed: ${report.gate_decision.judge_input_review_allowed}`,
    `- Judge invocation allowed: ${report.gate_decision.judge_invocation_allowed}`,
    `- Reason: ${report.gate_decision.reason}`,
    "",
    "## Coverage",
    "",
    "| Dimension | Counts |",
    "| --- | --- |",
    `| Datasets | ${JSON.stringify(report.coverage_summary.datasets)} |`,
    `| Explanation modes | ${JSON.stringify(report.coverage_summary.explanation_modes)} |`,
    `| Evidence access modes | ${JSON.stringify(report.coverage_summary.evidence_access_modes)} |`,
    `| Statuses | ${JSON.stringify(report.coverage_summary.statuses)} |`,
    "",
    "## Outputs",
    "",
    `- Judge input manifest: \`${report.outputs.judge_input_manifest_jsonl}\``,
    `- Judge inputs dir: \`${report.outputs.judge_inputs_dir}\``,
    `- Retrieval logs dir: \`${report.outputs.retrieval_logs_dir}\``,
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
  await mkdir(args.outputDir, { recursive: true });
  await mkdir(args.judgeInputsDir, { recursive: true });
  await mkdir(args.retrievalLogsDir, { recursive: true });

  await readJson(JUDGE_INPUT_SCHEMA_PATH);
  const registry = await readJson(TASK_REGISTRY_PATH);
  const requirements = await readJson(TASK_REQUIREMENTS_PATH);
  const evidenceEntries = (await readJsonl(args.evidenceManifestPath))
    .filter((entry) => entry.status === "evidence_ready")
    .filter((entry) => !args.datasets || args.datasets.includes(entry.dataset_id))
    .filter((entry) => !args.tasks || args.tasks.includes(entry.task_id));
  const explanationEntries = [];
  for (const manifestPath of args.explanationManifestPaths) {
    explanationEntries.push(...(await readJsonl(manifestPath)).filter((entry) => entry.status === "explanation_ready"));
  }
  const explanationByRecordId = new Map(explanationEntries.map((entry) => [entry.record_id, entry]));
  const sharedEvidenceByCaseId = new Map();
  if (args.sharedEvidenceManifestPath) {
    for (const entry of await readJsonl(args.sharedEvidenceManifestPath)) {
      const payload = await readJson(repoPathToAbsolute(entry.sidecar_path));
      sharedEvidenceByCaseId.set(entry.case_id, { ...entry, payload });
    }
  }

  const manifestEntries = [];
  const issues = [];

  for (const evidenceEntry of evidenceEntries) {
    console.log(`[phaseF5] ${evidenceEntry.record_id}`);
    const explanationEntry = explanationByRecordId.get(evidenceEntry.record_id);
    if (!explanationEntry) {
      issues.push({
        severity: "error",
        code: "missing_explanation_entry",
        record_id: evidenceEntry.record_id,
        message: "No explanation_ready entry found for evidence record.",
      });
      manifestEntries.push({
        record_id: evidenceEntry.record_id,
        status: "failed",
        dataset_id: evidenceEntry.dataset_id,
        task_id: evidenceEntry.task_id,
        explanation_mode: evidenceEntry.explanation_mode,
      });
      continue;
    }

    try {
      const judgeInput = await materializeJudgeInput({
        evidenceEntry,
        explanationEntry,
        registry,
        requirements,
        outputPaths: args,
        sharedEvidence: sharedEvidenceByCaseId.get(
          evidenceEntry.case_id ?? evidenceEntry.evidence_id ?? `${evidenceEntry.dataset_id}__${evidenceEntry.task_id}`,
        ),
      });
      const validationErrors = validateJudgeInput(judgeInput);
      const status = validationErrors.length === 0 ? "judge_input_ready" : "failed";
      const judgeInputText = `${JSON.stringify(judgeInput, null, 2)}\n`;
      const judgeInputSha256 = sha256Text(judgeInputText);
      const judgeInputPath = path.join(args.judgeInputsDir, `${safeFileStem(evidenceEntry.record_id)}.json`);
      await writeFile(judgeInputPath, judgeInputText, "utf8");

      for (const message of validationErrors) {
        issues.push({
          severity: "error",
          code: "judge_input_schema_validation_error",
          record_id: evidenceEntry.record_id,
          message,
        });
      }

      manifestEntries.push({
        record_id: evidenceEntry.record_id,
        case_id: evidenceEntry.case_id,
        dataset_id: evidenceEntry.dataset_id,
        task_id: evidenceEntry.task_id,
        task_name: evidenceEntry.task_name,
        explanation_mode: evidenceEntry.explanation_mode,
        status,
        judge_input_path: toRepoPath(judgeInputPath),
        judge_input_sha256: judgeInputSha256,
        evidence_access_mode: judgeInput.evidence_access.evidence_access_mode,
        full_result_row_count: judgeInput.evidence_access.full_result_row_count,
        required_core_output_count: judgeInput.evaluation_requirements.required_core_outputs.length,
        required_supporting_output_count: judgeInput.evaluation_requirements.required_supporting_outputs.length,
        evaluation_constraint_count: judgeInput.evaluation_requirements.evaluation_constraints.length,
        safety_fairness_applicability: judgeInput.evaluation_requirements.safety_fairness_applicability,
        validation_error_count: validationErrors.length,
        next_step: "phase_f6_build_and_validate_final_judge_contexts",
      });
    } catch (error) {
      issues.push({
        severity: "error",
        code: "judge_input_materialization_exception",
        record_id: evidenceEntry.record_id,
        message: error.message,
      });
      manifestEntries.push({
        record_id: evidenceEntry.record_id,
        status: "failed",
        dataset_id: evidenceEntry.dataset_id,
        task_id: evidenceEntry.task_id,
        explanation_mode: evidenceEntry.explanation_mode,
      });
    }
  }

  const report = summarize({
    generatedAt,
    manifestEntries,
    issues,
    args,
  });

  await writeFile(
    args.judgeInputManifestPath,
    `${manifestEntries.map((entry) => JSON.stringify(entry)).join("\n")}\n`,
    "utf8",
  );
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderMarkdown(report), "utf8");

  console.log(JSON.stringify({
    ok: report.status === "PASS",
    status: report.status,
    judge_input_ready_records: report.counts.judge_input_ready_records,
    failed_records: report.counts.failed_records,
    errors: report.counts.errors,
    warnings: report.counts.warnings,
    judge_input_manifest_jsonl: report.outputs.judge_input_manifest_jsonl,
    judge_inputs_dir: report.outputs.judge_inputs_dir,
    report_json: report.outputs.report_json,
    report_md: report.outputs.report_md,
    judge_input_review_allowed: report.gate_decision.judge_input_review_allowed,
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
