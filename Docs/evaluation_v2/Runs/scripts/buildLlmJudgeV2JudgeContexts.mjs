import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUNS_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs");

const DEFAULT_JUDGE_INPUT_MANIFEST_PATH = path.join(
  RUNS_ROOT,
  "phase6_judge_inputs/judge_input_manifest.jsonl",
);
const DEFAULT_OUTPUT_DIR = path.join(RUNS_ROOT, "phase6_judge_contexts");
const FINAL_CONTEXTS_DIRNAME = "final_contexts";
const DEFAULT_PROMPT_PATH = path.join(PROJECT_ROOT, "Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md");

function parseArgs(argv) {
  const args = {
    judgeInputManifestPath: DEFAULT_JUDGE_INPUT_MANIFEST_PATH,
    outputDir: DEFAULT_OUTPUT_DIR,
    reportBasename: "phase6_judge_context_validation_report",
    promptPath: DEFAULT_PROMPT_PATH,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--judge-input-manifest") args.judgeInputManifestPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else if (arg === "--report-basename") args.reportBasename = next, i += 1;
    else if (arg === "--prompt-path") args.promptPath = path.resolve(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    ...args,
    finalContextsDir: path.join(args.outputDir, FINAL_CONTEXTS_DIRNAME),
    contextManifestPath: path.join(args.outputDir, "judge_context_manifest.jsonl"),
    reportJsonPath: path.join(args.outputDir, `${args.reportBasename}.json`),
    reportMdPath: path.join(args.outputDir, `${args.reportBasename}.md`),
  };
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, "/");
}

function repoPathToAbsolute(repoPath) {
  return path.join(PROJECT_ROOT, ...String(repoPath).split("/"));
}

async function readText(filePath) {
  return (await readFile(filePath, "utf8"))
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n");
}

async function readJson(filePath) {
  return JSON.parse(await readText(filePath));
}

async function readJsonl(filePath) {
  const text = await readText(filePath);
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
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

function safeFileStem(value) {
  return String(value).replace(/[^A-Za-z0-9_.-]+/g, "_");
}

function estimateTokens(text) {
  return Math.ceil(String(text ?? "").length / 4);
}

function getDatasets(evidenceArtifact) {
  return evidenceArtifact.response_body?.datasets
    ?? evidenceArtifact.full_response_body?.datasets
    ?? {};
}

function getDatasetBreakdownFromRows(datasets) {
  return Object.entries(datasets).map(([label, rows]) => ({
    dataset_label: label,
    row_count: Array.isArray(rows) ? rows.length : 0,
    columns: Array.isArray(rows) && rows[0] && typeof rows[0] === "object"
      ? Object.keys(rows[0])
      : [],
  }));
}

function sumRows(datasets) {
  return Object.values(datasets).reduce((sum, rows) => sum + (Array.isArray(rows) ? rows.length : 0), 0);
}

function compactGeneratorInput(requestPayload = {}) {
  const datasets = requestPayload.datasets && typeof requestPayload.datasets === "object"
    ? requestPayload.datasets
    : {};
  return {
    task_id: requestPayload.task_id ?? null,
    execution_id: requestPayload.execution_id ?? null,
    task_name: requestPayload.task_name ?? null,
    analysis_type: requestPayload.analysis_type ?? null,
    explanation_strategy: requestPayload.explanation_strategy ?? null,
    actionable_question: requestPayload.actionable_question ?? null,
    target_audience: requestPayload.target_audience ?? null,
    query_labels: requestPayload.query_labels ?? [],
    confidence: requestPayload.confidence ?? null,
    dataset_labels: Object.keys(datasets),
    dataset_row_counts: Object.fromEntries(
      Object.entries(datasets).map(([label, rows]) => [label, Array.isArray(rows) ? rows.length : null]),
    ),
    ai_summary_config_summary: summarizeAiSummaryConfig(requestPayload.ai_summary_config ?? {}),
  };
}

function summarizeAiSummaryConfig(config) {
  const keys = [
    "summary_type",
    "metric_column",
    "entity_column",
    "group_column",
    "time_column",
    "sort_by",
    "sort_direction",
    "top_k",
    "bottom_k",
    "threshold_direction",
    "numeric_threshold",
    "require_sensitive_context_policy",
    "require_complete_action_provenance",
  ];
  return Object.fromEntries(keys.filter((key) => key in config).map((key) => [key, config[key]]));
}

function getRankColumns(rows) {
  const keys = new Set();
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    for (const key of Object.keys(row)) {
      const normalized = key.toLowerCase();
      if (normalized === "rank" || normalized.endsWith("_rank") || normalized.includes("rank_")) {
        keys.add(key);
      }
    }
  }
  return [...keys];
}

function getNumericColumns(rows) {
  const counts = new Map();
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    for (const [key, value] of Object.entries(row)) {
      if (typeof value === "number" && Number.isFinite(value)) {
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 30)
    .map(([key]) => key);
}

function getThresholdFlagColumns(rows) {
  const columns = new Set();
  const pattern = /(trigger|threshold|severity|flag|risk|status)/i;
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    for (const key of Object.keys(row)) {
      if (pattern.test(key)) columns.add(key);
    }
  }
  return [...columns];
}

function runDeterministicChecks({ judgeInput, evidenceArtifact, evidenceFileSha256, evidenceRowsSha256 }) {
  const datasets = getDatasets(evidenceArtifact);
  const checks = [];
  const expectedRowCount = judgeInput.evidence_access.full_result_row_count;
  const observedRowCount = sumRows(datasets);

  checks.push({
    check_id: "row_count_total",
    check_type: "row_count",
    status: observedRowCount === expectedRowCount ? "pass" : "fail",
    expected: expectedRowCount,
    observed: observedRowCount,
  });

  checks.push({
    check_id: "artifact_file_sha256",
    check_type: "artifact_hash",
    status: judgeInput.evidence_access.full_query_artifacts.every(
      (artifact) => artifact.artifact_sha256 === evidenceFileSha256,
    ) ? "pass" : "fail",
    observed: evidenceFileSha256,
    expected_values: judgeInput.evidence_access.full_query_artifacts.map((artifact) => artifact.artifact_sha256),
  });

  const sourceRowsHash = evidenceArtifact.evidence_summary?.full_query_datasets_sha256 ?? null;
  checks.push({
    check_id: "canonical_rows_sha256",
    check_type: "embedded_rows_hash",
    status: sourceRowsHash && sourceRowsHash === evidenceRowsSha256 ? "pass" : "not_applicable",
    observed: evidenceRowsSha256,
    expected: sourceRowsHash,
  });

  for (const [label, rows] of Object.entries(datasets)) {
    if (!Array.isArray(rows)) continue;

    const rankColumns = getRankColumns(rows);
    for (const rankColumn of rankColumns) {
      const values = rows
        .map((row) => row?.[rankColumn])
        .filter((value) => typeof value === "number" && Number.isFinite(value));
      const uniqueValues = new Set(values);
      checks.push({
        check_id: `ranking_${label}_${rankColumn}`,
        check_type: "ranking",
        status: values.length === rows.length && uniqueValues.size === values.length ? "pass" : "warning",
        dataset_label: label,
        rank_column: rankColumn,
        ranked_row_count: values.length,
        duplicate_rank_count: values.length - uniqueValues.size,
        top_rows: rows
          .filter((row) => typeof row?.[rankColumn] === "number")
          .sort((a, b) => a[rankColumn] - b[rankColumn])
          .slice(0, 5),
      });
    }

    const numericColumns = getNumericColumns(rows);
    checks.push({
      check_id: `numeric_fields_${label}`,
      check_type: "numeric_field_extraction",
      status: numericColumns.length > 0 ? "pass" : "not_applicable",
      dataset_label: label,
      numeric_columns: numericColumns,
      numeric_summaries: Object.fromEntries(
        numericColumns.slice(0, 12).map((column) => {
          const values = rows
            .map((row) => row?.[column])
            .filter((value) => typeof value === "number" && Number.isFinite(value));
          return [column, {
            count: values.length,
            min: values.length > 0 ? Math.min(...values) : null,
            max: values.length > 0 ? Math.max(...values) : null,
          }];
        }),
      ),
    });

    const flagColumns = getThresholdFlagColumns(rows);
    checks.push({
      check_id: `threshold_flag_fields_${label}`,
      check_type: "threshold_flag_detection",
      status: flagColumns.length > 0 ? "pass" : "not_applicable",
      dataset_label: label,
      flag_columns: flagColumns,
      triggered_like_counts: Object.fromEntries(
        flagColumns.slice(0, 12).map((column) => {
          const values = rows.map((row) => row?.[column]);
          return [column, values.filter((value) => value === true || value === "true" || value === "triggered").length];
        }),
      ),
    });
  }

  return checks;
}

function checkRetrievalLog({ judgeInput, retrievalLog, evidenceFileSha256, datasets }) {
  const issues = [];
  const chunks = retrievalLog?.chunks ?? [];
  const retrievedRowCount = chunks.reduce((sum, chunk) => sum + (chunk.row_count ?? 0), 0);

  if (!retrievalLog) issues.push("retrieval_log_missing");
  if (retrievalLog && retrievalLog.retrieval_request_complete !== true) issues.push("retrieval_request_not_complete");
  if (chunks.length === 0) issues.push("retrieval_chunks_missing");
  if (retrievedRowCount <= 0) issues.push("retrieved_row_count_zero");
  if (retrievedRowCount !== judgeInput.evidence_access.retrieved_row_count) issues.push("retrieved_row_count_mismatch");

  for (const chunk of chunks) {
    if (chunk.source_artifact_sha256 !== evidenceFileSha256) issues.push(`chunk_hash_mismatch:${chunk.chunk_id}`);
    const rows = datasets[chunk.dataset_label];
    const datasetRowCount = Array.isArray(rows) ? rows.length : 0;
    if ((chunk.row_end_inclusive ?? -1) >= datasetRowCount) issues.push(`chunk_range_out_of_bounds:${chunk.chunk_id}`);
  }

  return {
    status: issues.length === 0 ? "pass" : "fail",
    retrieved_row_count: retrievedRowCount,
    chunk_count: chunks.length,
    chunk_ids: chunks.map((chunk) => chunk.chunk_id),
    row_ranges: chunks.map((chunk) => ({
      dataset_label: chunk.dataset_label,
      row_start_inclusive: chunk.row_start_inclusive,
      row_end_inclusive: chunk.row_end_inclusive,
      row_count: chunk.row_count,
    })),
    issues,
  };
}

function renderJsonBlock(value) {
  return `\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``;
}

function renderContext({
  judgeInput,
  evidenceArtifact,
  evidenceFileSha256,
  evidenceRowsSha256,
  explanationArtifact,
  explanationFileSha256,
  generatorInputCompact,
  generatorInputSha256,
  retrievalLog,
  retrievalValidation,
  deterministicChecks,
  promptSha256,
  promptRepoPath,
}) {
  const datasets = getDatasets(evidenceArtifact);
  const isDirect = judgeInput.evidence_access.evidence_access_mode === "direct_embedding";
  const evidenceSectionTitle = isDirect
    ? "Direct-Embedded Full Query Result"
    : "Deterministic Retrieval Evidence";

  const evidencePayload = isDirect
    ? {
      evidence_access_mode: "direct_embedding",
      full_result_row_count: judgeInput.evidence_access.full_result_row_count,
      embedded_datasets_sha256: evidenceRowsSha256,
      datasets,
    }
    : {
      evidence_access_mode: "deterministic_artifact_retrieval",
      retrieval_log: retrievalLog,
      retrieved_datasets_sha256: evidenceRowsSha256,
      retrieved_datasets: datasets,
    };

  return [
    `# LLM Judge Final Judge Context - ${judgeInput.record_id}`,
    "",
    "This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.",
    "",
    "## Frozen Prompt Reference",
    "",
    `- Prompt path: \`${promptRepoPath}\``,
    `- Prompt SHA-256: \`${promptSha256}\``,
    "",
    "## Record Identity",
    "",
    renderJsonBlock({
      record_id: judgeInput.record_id,
      evaluation_run_id: judgeInput.evaluation_run_id,
      dataset_id: judgeInput.dataset_id,
      task_id: judgeInput.task_id,
      explanation_mode: judgeInput.explanation_mode,
      prompt_version: judgeInput.prompt_version,
      rubric_version: judgeInput.rubric_version,
    }),
    "",
    "## Task Context",
    "",
    renderJsonBlock(judgeInput.task_context),
    "",
    "## Schema Context",
    "",
    renderJsonBlock(judgeInput.schema_context),
    "",
    "## Evaluation Requirements",
    "",
    renderJsonBlock(judgeInput.evaluation_requirements),
    "",
    "## Deterministic Derived-Stat Evidence",
    "",
    renderJsonBlock(judgeInput.derived_stat_evidence ?? []),
    "",
    "## Deterministic Action Evidence",
    "",
    renderJsonBlock(judgeInput.action_evidence ?? {
      applicable: false,
      evaluation_status: "not_available",
      supported_action_count: 0,
      supported_actions: [],
    }),
    "",
    `## ${evidenceSectionTitle}`,
    "",
    renderJsonBlock({
      full_query_artifacts: judgeInput.evidence_access.full_query_artifacts,
      evidence_access_mode: judgeInput.evidence_access.evidence_access_mode,
      full_result_row_count: judgeInput.evidence_access.full_result_row_count,
      prompt_embedded_row_count: judgeInput.evidence_access.prompt_embedded_row_count,
      retrieved_row_count: judgeInput.evidence_access.retrieved_row_count,
      retrieval_log_path: judgeInput.evidence_access.retrieval_log_path,
      full_access_available: judgeInput.evidence_access.full_access_available,
      full_result_sent_to_llm: judgeInput.evidence_access.full_result_sent_to_llm,
      evidence_artifact_file_sha256: evidenceFileSha256,
      evidence_rows_sha256: evidenceRowsSha256,
      retrieval_validation: retrievalValidation,
    }),
    "",
    renderJsonBlock(evidencePayload),
    "",
    "## Generator Input Provenance",
    "",
    renderJsonBlock({
      explanation_artifact_path: judgeInput.explanation.generation_metadata.explanation_artifact_path,
      explanation_artifact_sha256: explanationFileSha256,
      generator_input_sha256: generatorInputSha256,
      generator_input_compact: generatorInputCompact,
    }),
    "",
    "## AI Explanation To Judge",
    "",
    renderJsonBlock({
      raw_text: judgeInput.explanation.raw_text,
      structured_payload: judgeInput.explanation.structured_payload,
      generation_metadata: judgeInput.explanation.generation_metadata,
      source_response_body: explanationArtifact.response_body ?? null,
    }),
    "",
    "## Full-run Deterministic Checks",
    "",
    renderJsonBlock(deterministicChecks),
    "",
  ].join("\n");
}

function summarizeContextTokenAccounting({
  finalContextText,
  promptText,
  evidenceText,
  explanationText,
  generatorProvenanceText,
}) {
  return {
    tokenizer_method: "heuristic_chars_div_4_ceiling",
    context_token_count: estimateTokens(finalContextText) + estimateTokens(promptText),
    final_context_file_token_count: estimateTokens(finalContextText),
    embedded_evidence_token_count: estimateTokens(evidenceText),
    explanation_token_count: estimateTokens(explanationText),
    prompt_token_count: estimateTokens(promptText),
    generator_provenance_token_count: estimateTokens(generatorProvenanceText),
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

function summarize({ generatedAt, entries, issues, args, promptSha256 }) {
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const ready = entries.filter((entry) => entry.status === "judge_context_ready");
  const failed = entries.filter((entry) => entry.status === "failed");
  const pass = errors.length === 0 && ready.length === entries.length && entries.length > 0;

  const tokenCounts = entries.map((entry) => entry.token_accounting?.context_token_count).filter(Number.isFinite);

  return {
    report_version: "llm_judge_v2_phase_f6_judge_context_validation_report_v1",
    generated_at: generatedAt,
    status: pass ? "PASS" : "FAIL",
    phase_scope: ["F6 judge context validation"],
    inputs: {
      judge_input_manifest_jsonl: toRepoPath(args.judgeInputManifestPath),
      prompt_path: toRepoPath(args.promptPath),
      prompt_sha256: promptSha256,
    },
    counts: {
      judge_context_ready_records: ready.length,
      failed_records: failed.length,
      total_records: entries.length,
      errors: errors.length,
      warnings: warnings.length,
    },
    coverage_summary: {
      datasets: countBy(entries, (entry) => entry.dataset_id),
      explanation_modes: countBy(entries, (entry) => entry.explanation_mode),
      evidence_access_modes: countBy(entries, (entry) => entry.evidence_access_mode),
      statuses: countBy(entries, (entry) => entry.status),
    },
    token_accounting_summary: {
      tokenizer_method: "heuristic_chars_div_4_ceiling",
      min_context_token_count: tokenCounts.length ? Math.min(...tokenCounts) : null,
      max_context_token_count: tokenCounts.length ? Math.max(...tokenCounts) : null,
      average_context_token_count: tokenCounts.length
        ? Math.round(tokenCounts.reduce((sum, value) => sum + value, 0) / tokenCounts.length)
        : null,
    },
    outputs: {
      final_contexts_dir: toRepoPath(args.finalContextsDir),
      judge_context_manifest_jsonl: toRepoPath(args.contextManifestPath),
      report_json: toRepoPath(args.reportJsonPath),
      report_md: toRepoPath(args.reportMdPath),
    },
    gate_decision: {
      judge_context_validation_status: pass ? "PASS" : "FAIL",
      judge_invocation_allowed: pass,
      full_judge_invocation_allowed: pass,
      official_full_evaluation_allowed: pass ? "pending_user_approval" : false,
      reason: pass
        ? "Final judge contexts prove direct-embedded or retrieved evidence is materialized before judge invocation."
        : "Judge context validation failed. Fix errors before judge invocation.",
    },
    issues,
  };
}

function renderMarkdownReport(report) {
  const lines = [
    "# LLM Judge V2 Phase F6 Judge Context Validation Report",
    "",
    `- Generated at: ${report.generated_at}`,
    `- Status: ${report.status}`,
    `- Judge context ready records: ${report.counts.judge_context_ready_records}`,
    `- Failed records: ${report.counts.failed_records}`,
    `- Total records: ${report.counts.total_records}`,
    `- Errors: ${report.counts.errors}`,
    `- Warnings: ${report.counts.warnings}`,
    "",
    "## Gate Decision",
    "",
    `- Judge context validation status: ${report.gate_decision.judge_context_validation_status}`,
    `- Judge invocation allowed: ${report.gate_decision.judge_invocation_allowed}`,
    `- Full judge invocation allowed: ${report.gate_decision.full_judge_invocation_allowed}`,
    `- Official full evaluation allowed: ${report.gate_decision.official_full_evaluation_allowed}`,
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
    "## Token Accounting",
    "",
    `- Tokenizer method: ${report.token_accounting_summary.tokenizer_method}`,
    `- Min context tokens: ${report.token_accounting_summary.min_context_token_count}`,
    `- Max context tokens: ${report.token_accounting_summary.max_context_token_count}`,
    `- Average context tokens: ${report.token_accounting_summary.average_context_token_count}`,
    "",
    "## Outputs",
    "",
    `- Final contexts dir: \`${report.outputs.final_contexts_dir}\``,
    `- Judge context manifest: \`${report.outputs.judge_context_manifest_jsonl}\``,
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

async function buildContextForEntry({ manifestEntry, args, promptText, promptSha256, promptRepoPath }) {
  const judgeInputPath = repoPathToAbsolute(manifestEntry.judge_input_path);
  const judgeInput = await readJson(judgeInputPath);
  const evidenceArtifactPath = repoPathToAbsolute(judgeInput.evidence_access.full_query_artifacts[0].artifact_path);
  const evidenceArtifactText = await readText(evidenceArtifactPath);
  const evidenceArtifact = JSON.parse(evidenceArtifactText);
  const evidenceFileSha256 = sha256Text(evidenceArtifactText);
  const datasets = getDatasets(evidenceArtifact);
  const evidenceRowsSha256 = sha256Json(datasets);

  const explanationArtifactPath = repoPathToAbsolute(judgeInput.explanation.generation_metadata.explanation_artifact_path);
  const explanationArtifactText = await readText(explanationArtifactPath);
  const explanationArtifact = JSON.parse(explanationArtifactText);
  const explanationFileSha256 = sha256Text(explanationArtifactText);

  const generatorInput = explanationArtifact.request_payload ?? {};
  const generatorInputCompact = compactGeneratorInput(generatorInput);
  const generatorInputSha256 = sha256Json(generatorInput);

  let retrievalLog = null;
  let retrievalValidation = null;
  if (judgeInput.evidence_access.evidence_access_mode === "deterministic_artifact_retrieval") {
    if (judgeInput.evidence_access.retrieval_log_path) {
      retrievalLog = await readJson(repoPathToAbsolute(judgeInput.evidence_access.retrieval_log_path));
    }
    retrievalValidation = checkRetrievalLog({
      judgeInput,
      retrievalLog,
      evidenceFileSha256,
      datasets,
    });
  } else {
    retrievalValidation = {
      status: "not_applicable",
      retrieved_row_count: 0,
      chunk_count: 0,
      chunk_ids: [],
      row_ranges: [],
      issues: [],
    };
  }

  const deterministicChecks = runDeterministicChecks({
    judgeInput,
    evidenceArtifact,
    evidenceFileSha256,
    evidenceRowsSha256,
  });

  const contextText = renderContext({
    judgeInput,
    evidenceArtifact,
    evidenceFileSha256,
    evidenceRowsSha256,
    explanationArtifact,
    explanationFileSha256,
    generatorInputCompact,
    generatorInputSha256,
    retrievalLog,
    retrievalValidation,
    deterministicChecks,
    promptSha256,
    promptRepoPath,
  });

  const contextPath = path.join(args.finalContextsDir, `${safeFileStem(judgeInput.record_id)}.md`);
  await writeFile(contextPath, contextText, "utf8");

  const evidenceText = JSON.stringify(
    judgeInput.evidence_access.evidence_access_mode === "direct_embedding"
      ? datasets
      : { retrievalLog, retrieved_datasets: datasets },
  );
  const explanationText = JSON.stringify(judgeInput.explanation);
  const generatorProvenanceText = JSON.stringify(generatorInputCompact);
  const tokenAccounting = summarizeContextTokenAccounting({
    finalContextText: contextText,
    promptText,
    evidenceText,
    explanationText,
    generatorProvenanceText,
  });

  const rowCount = sumRows(datasets);
  const expectedRowCount = judgeInput.evidence_access.full_result_row_count;
  const sourceRowsHash = evidenceArtifact.evidence_summary?.full_query_datasets_sha256 ?? null;
  const directValidation = judgeInput.evidence_access.evidence_access_mode === "direct_embedding"
    ? {
      embedded_rows_present: rowCount > 0 || expectedRowCount === 0,
      embedded_row_count: rowCount,
      embedded_row_count_matches_artifact: rowCount === expectedRowCount,
      artifact_file_sha256_matches: judgeInput.evidence_access.full_query_artifacts.every(
        (artifact) => artifact.artifact_sha256 === evidenceFileSha256,
      ),
      embedded_rows_sha256: evidenceRowsSha256,
      source_rows_sha256: sourceRowsHash,
      embedded_rows_sha256_matches_source: sourceRowsHash ? sourceRowsHash === evidenceRowsSha256 : null,
    }
    : null;

  const checkFailures = deterministicChecks.filter((check) => check.status === "fail");
  const status = [
    manifestEntry.record_id === judgeInput.record_id,
    manifestEntry.dataset_id === judgeInput.dataset_id,
    manifestEntry.task_id === judgeInput.task_id,
    manifestEntry.explanation_mode === judgeInput.explanation_mode,
    evidenceFileSha256 === judgeInput.evidence_access.full_query_artifacts[0].artifact_sha256,
    explanationFileSha256 === judgeInput.explanation.generation_metadata.explanation_artifact_sha256,
    generatorInputSha256.length === 64,
    checkFailures.length === 0,
    judgeInput.evidence_access.evidence_access_mode === "direct_embedding"
      ? directValidation.embedded_row_count_matches_artifact && directValidation.artifact_file_sha256_matches
      : retrievalValidation.status === "pass",
  ].every(Boolean)
    ? "judge_context_ready"
    : "failed";

  return {
    entry: {
      record_id: judgeInput.record_id,
      case_id: manifestEntry.case_id,
      dataset_id: judgeInput.dataset_id,
      task_id: judgeInput.task_id,
      task_name: manifestEntry.task_name,
      explanation_mode: judgeInput.explanation_mode,
      status,
      final_context_path: toRepoPath(contextPath),
      final_context_sha256: sha256Text(contextText),
      judge_input_path: manifestEntry.judge_input_path,
      judge_input_sha256: manifestEntry.judge_input_sha256,
      evidence_access_mode: judgeInput.evidence_access.evidence_access_mode,
      full_result_row_count: expectedRowCount,
      dataset_breakdown: getDatasetBreakdownFromRows(datasets),
      direct_embedding_validation: directValidation,
      retrieval_validation: retrievalValidation,
      generator_provenance: {
        explanation_artifact_path: judgeInput.explanation.generation_metadata.explanation_artifact_path,
        explanation_artifact_sha256: explanationFileSha256,
        generator_input_sha256: generatorInputSha256,
        generator_input_present: Object.keys(generatorInput).length > 0,
      },
      deterministic_check_count: deterministicChecks.length,
      deterministic_check_failures: checkFailures.length,
      deterministic_check_types: [...new Set(deterministicChecks.map((check) => check.check_type))],
      token_accounting: tokenAccounting,
      next_step: status === "judge_context_ready"
        ? "phase_f7_judge_invocation"
        : "fix_phase_f6_context_validation_errors",
    },
    issues: buildIssuesForContext({
      judgeInput,
      manifestEntry,
      evidenceFileSha256,
      explanationFileSha256,
      directValidation,
      retrievalValidation,
      checkFailures,
      status,
    }),
  };
}

function buildIssuesForContext({
  judgeInput,
  manifestEntry,
  evidenceFileSha256,
  explanationFileSha256,
  directValidation,
  retrievalValidation,
  checkFailures,
  status,
}) {
  const issues = [];
  const add = (code, message) => issues.push({
    severity: "error",
    code,
    record_id: judgeInput.record_id,
    message,
  });

  if (manifestEntry.record_id !== judgeInput.record_id) add("record_id_mismatch", "Manifest record_id differs from judge input record_id.");
  if (manifestEntry.dataset_id !== judgeInput.dataset_id) add("dataset_id_mismatch", "Manifest dataset_id differs from judge input dataset_id.");
  if (manifestEntry.task_id !== judgeInput.task_id) add("task_id_mismatch", "Manifest task_id differs from judge input task_id.");
  if (manifestEntry.explanation_mode !== judgeInput.explanation_mode) add("explanation_mode_mismatch", "Manifest explanation_mode differs from judge input explanation_mode.");
  if (evidenceFileSha256 !== judgeInput.evidence_access.full_query_artifacts[0].artifact_sha256) add("evidence_artifact_hash_mismatch", "Evidence artifact file SHA-256 does not match judge input artifact hash.");
  if (explanationFileSha256 !== judgeInput.explanation.generation_metadata.explanation_artifact_sha256) add("explanation_artifact_hash_mismatch", "Explanation artifact file SHA-256 does not match judge input generation metadata.");

  if (directValidation) {
    if (!directValidation.embedded_rows_present) add("direct_embedded_rows_missing", "Direct embedding context has no embedded rows.");
    if (!directValidation.embedded_row_count_matches_artifact) add("direct_embedded_row_count_mismatch", "Direct embedding row count does not match full_result_row_count.");
    if (!directValidation.artifact_file_sha256_matches) add("direct_artifact_hash_mismatch", "Direct embedding source artifact hash mismatch.");
  }

  if (retrievalValidation && retrievalValidation.status === "fail") {
    add("retrieval_validation_failed", `Retrieval validation failed: ${retrievalValidation.issues.join(", ")}`);
  }

  for (const failure of checkFailures) {
    add("deterministic_check_failed", `Deterministic check failed: ${failure.check_id}`);
  }

  if (status === "failed" && issues.length === 0) add("context_validation_failed", "Context validation failed for an unspecified invariant.");
  return issues;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const generatedAt = new Date().toISOString();
  await mkdir(args.outputDir, { recursive: true });
  await mkdir(args.finalContextsDir, { recursive: true });

  const promptText = await readText(args.promptPath);
  const promptSha256 = sha256Text(promptText);
  const promptRepoPath = toRepoPath(args.promptPath);
  const judgeInputEntries = (await readJsonl(args.judgeInputManifestPath))
    .filter((entry) => entry.status === "judge_input_ready");

  const contextEntries = [];
  const issues = [];

  for (const manifestEntry of judgeInputEntries) {
    console.log(`[phaseF6] ${manifestEntry.record_id}`);
    try {
      const result = await buildContextForEntry({
        manifestEntry,
        args,
        promptText,
        promptSha256,
        promptRepoPath,
      });
      contextEntries.push(result.entry);
      issues.push(...result.issues);
    } catch (error) {
      issues.push({
        severity: "error",
        code: "context_build_exception",
        record_id: manifestEntry.record_id,
        message: error.message,
      });
      contextEntries.push({
        record_id: manifestEntry.record_id,
        case_id: manifestEntry.case_id,
        dataset_id: manifestEntry.dataset_id,
        task_id: manifestEntry.task_id,
        task_name: manifestEntry.task_name,
        explanation_mode: manifestEntry.explanation_mode,
        status: "failed",
        evidence_access_mode: manifestEntry.evidence_access_mode,
        next_step: "fix_phase_f6_context_build_exception",
      });
    }
  }

  const manifestText = `${contextEntries.map((entry) => JSON.stringify(entry)).join("\n")}\n`;
  await writeFile(args.contextManifestPath, manifestText, "utf8");

  const report = summarize({
    generatedAt,
    entries: contextEntries,
    issues,
    args,
    promptSha256,
  });
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderMarkdownReport(report), "utf8");

  console.log(`[phaseF6] status=${report.status} ready=${report.counts.judge_context_ready_records}/${report.counts.total_records} errors=${report.counts.errors} warnings=${report.counts.warnings}`);
  if (report.status !== "PASS") process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
