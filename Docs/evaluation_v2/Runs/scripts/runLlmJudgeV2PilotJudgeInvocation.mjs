import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUNS_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs");

const DEFAULT_CONTEXT_MANIFEST_PATH = path.join(
  RUNS_ROOT,
  "phase6_judge_contexts/judge_context_manifest.jsonl",
);
const DEFAULT_OUTPUT_DIR = path.join(RUNS_ROOT, "phase6_judge_invocation");
const PROMPT_PATH = path.join(PROJECT_ROOT, "Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md");
const JUDGE_RESPONSE_SCHEMA_PATH = path.join(
  PROJECT_ROOT,
  "Docs/evaluation_v2/LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json",
);
const ATTEMPT_WRAPPER_SCHEMA_PATH = path.join(
  PROJECT_ROOT,
  "Docs/evaluation_v2/LLM_JUDGE_V2_EXECUTION_ATTEMPT_WRAPPER_SCHEMA_V1.json",
);
const RECORD_STATUS_SCHEMA_PATH = path.join(
  PROJECT_ROOT,
  "Docs/evaluation_v2/LLM_JUDGE_V2_RECORD_EXECUTION_STATUS_SCHEMA_V1.json",
);

const EVALUATION_RUN_ID = "llm_judge_v2_pilot_phase6_5";
const SESSION_SEGMENT_ID = "pilot_phase6_5_segment_001";

function parseArgs(argv) {
  const args = {
    mode: "prepare",
    contextManifestPath: DEFAULT_CONTEXT_MANIFEST_PATH,
    outputDir: DEFAULT_OUTPUT_DIR,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--mode") args.mode = next, i += 1;
    else if (arg === "--context-manifest") args.contextManifestPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!["prepare", "import"].includes(args.mode)) {
    throw new Error("--mode must be prepare or import");
  }

  return {
    ...args,
    promptQueueDir: path.join(args.outputDir, "prompt_queue"),
    rawOutputsDir: path.join(args.outputDir, "raw_outputs"),
    extractedOutputsDir: path.join(args.outputDir, "extracted_outputs"),
    validatedOutputsDir: path.join(args.outputDir, "validated_outputs"),
    attemptWrappersDir: path.join(args.outputDir, "attempt_wrappers"),
    recordStatusesDir: path.join(args.outputDir, "record_statuses"),
    invocationManifestPath: path.join(args.outputDir, "pilot_judge_invocation_manifest.jsonl"),
    attemptManifestPath: path.join(args.outputDir, "pilot_judge_attempt_manifest.jsonl"),
    statusManifestPath: path.join(args.outputDir, "pilot_judge_record_status_manifest.jsonl"),
    reportJsonPath: path.join(args.outputDir, "phase6_pilot_judge_invocation_report.json"),
    reportMdPath: path.join(args.outputDir, "phase6_pilot_judge_invocation_report.md"),
  };
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, "/");
}

function repoPathToAbsolute(repoPath) {
  return path.join(PROJECT_ROOT, ...String(repoPath).split("/"));
}

async function readText(filePath) {
  return (await readFile(filePath, "utf8")).replace(/^\uFEFF/, "");
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

function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}

function safeFileStem(value) {
  return String(value).replace(/[^A-Za-z0-9_.-]+/g, "_");
}

async function pathExists(filePath) {
  try {
    await readFile(filePath);
    return true;
  } catch {
    return false;
  }
}

function renderInvocationPrompt({ promptText, contextText, entry, sequenceNumber }) {
  return [
    "# LLM Judge V2 Pilot Invocation Packet",
    "",
    "You are processing exactly one pilot record. Use the frozen judge prompt below and the final judge context below.",
    "",
    "Return only one JSON object conforming to `LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json`.",
    "",
    "Do not return Markdown fences, commentary, aggregate scores, final score, verdict, or runner-derived fields.",
    "",
    "## Invocation Metadata",
    "",
    "```json",
    JSON.stringify({
      evaluation_run_id: EVALUATION_RUN_ID,
      session_segment_id: SESSION_SEGMENT_ID,
      session_sequence_number: sequenceNumber,
      record_id: entry.record_id,
      dataset_id: entry.dataset_id,
      task_id: entry.task_id,
      explanation_mode: entry.explanation_mode,
      final_context_sha256: entry.final_context_sha256,
      judge_input_sha256: entry.judge_input_sha256,
    }, null, 2),
    "```",
    "",
    "## Frozen Judge Prompt V2",
    "",
    promptText,
    "",
    "## Final Judge Context For This Record",
    "",
    contextText,
    "",
    "## Required Output",
    "",
    "Return the direct judge response JSON object now.",
    "",
  ].join("\n");
}

async function prepareInvocationQueue({ args, contextEntries, promptText, generatedAt }) {
  const manifestEntries = [];
  let sequenceNumber = 0;

  for (const entry of contextEntries) {
    sequenceNumber += 1;
    const contextPath = repoPathToAbsolute(entry.final_context_path);
    const contextText = await readText(contextPath);
    const promptTextForRecord = renderInvocationPrompt({
      promptText,
      contextText,
      entry,
      sequenceNumber,
    });
    const promptPath = path.join(args.promptQueueDir, `${String(sequenceNumber).padStart(3, "0")}__${safeFileStem(entry.record_id)}.md`);
    await writeFile(promptPath, promptTextForRecord, "utf8");

    manifestEntries.push({
      record_id: entry.record_id,
      case_id: entry.case_id,
      dataset_id: entry.dataset_id,
      task_id: entry.task_id,
      task_name: entry.task_name,
      explanation_mode: entry.explanation_mode,
      session_segment_id: SESSION_SEGMENT_ID,
      session_sequence_number: sequenceNumber,
      status: "pending_judge_invocation",
      invocation_prompt_path: toRepoPath(promptPath),
      invocation_prompt_sha256: sha256Text(promptTextForRecord),
      final_context_path: entry.final_context_path,
      final_context_sha256: entry.final_context_sha256,
      judge_input_path: entry.judge_input_path,
      judge_input_sha256: entry.judge_input_sha256,
      expected_raw_output_path: toRepoPath(path.join(args.rawOutputsDir, `${safeFileStem(entry.record_id)}.json`)),
      evidence_access_mode: entry.evidence_access_mode,
      full_result_row_count: entry.full_result_row_count,
      token_accounting: entry.token_accounting,
      prepared_at: generatedAt,
    });
  }

  return manifestEntries;
}

function extractJsonFromRaw(rawText) {
  const trimmed = rawText.trim();
  if (!trimmed) return { outputText: "", errors: ["raw_output_empty"] };

  if (trimmed.startsWith("```")) {
    const match = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (match) return { outputText: match[1].trim(), errors: ["raw_output_used_markdown_fence"] };
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return {
      outputText: trimmed.slice(firstBrace, lastBrace + 1),
      errors: firstBrace === 0 && lastBrace === trimmed.length - 1 ? [] : ["raw_output_had_surrounding_text"],
    };
  }

  return { outputText: trimmed, errors: [] };
}

function validateMetricScore(metricName, value, errors) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    errors.push(`subscores.${metricName} must be object`);
    return;
  }
  if (!["applicable", "not_applicable"].includes(value.applicability)) {
    errors.push(`subscores.${metricName}.applicability invalid`);
  }
  if (value.applicability === "applicable") {
    if (!Number.isInteger(value.score) || value.score < 1 || value.score > 10) {
      errors.push(`subscores.${metricName}.score must be integer 1-10 when applicable`);
    }
  } else if (value.score !== null) {
    errors.push(`subscores.${metricName}.score must be null when not_applicable`);
  }
  if (typeof value.rationale !== "string") errors.push(`subscores.${metricName}.rationale must be string`);
}

function validateJudgeResponse(output, expectedRecordId) {
  const errors = [];
  const allowedTop = new Set([
    "schema_version",
    "record_id",
    "scoring_status",
    "subscores",
    "claim_checks",
    "errors",
    "holistic_rationale",
    "evidence_usage_notes",
    "invalid_reason",
  ]);
  const requiredTop = [
    "schema_version",
    "record_id",
    "scoring_status",
    "subscores",
    "claim_checks",
    "errors",
    "holistic_rationale",
    "evidence_usage_notes",
  ];
  for (const key of requiredTop) {
    if (!(key in output)) errors.push(`missing top-level field ${key}`);
  }
  for (const key of Object.keys(output)) {
    if (!allowedTop.has(key)) errors.push(`unexpected top-level field ${key}`);
  }

  const forbidden = [
    "error_summary",
    "raw_weighted_score",
    "caps_applied",
    "effective_cap",
    "final_score_after_caps",
    "verdict",
    "record_severity",
  ];
  for (const key of forbidden) {
    if (key in output) errors.push(`forbidden runner-derived field returned: ${key}`);
  }

  if (output.schema_version !== "judge_response_schema_v1") errors.push("schema_version must be judge_response_schema_v1");
  if (output.record_id !== expectedRecordId) errors.push("record_id mismatch");
  if (!["scored", "invalid"].includes(output.scoring_status)) errors.push("scoring_status invalid");
  if (!Array.isArray(output.claim_checks)) errors.push("claim_checks must be array");
  if (!Array.isArray(output.errors)) errors.push("errors must be array");
  if (typeof output.holistic_rationale !== "string") errors.push("holistic_rationale must be string");
  if (typeof output.evidence_usage_notes !== "string") errors.push("evidence_usage_notes must be string");

  if (output.scoring_status === "invalid") {
    if (output.subscores !== null) errors.push("subscores must be null when invalid");
    if (Array.isArray(output.claim_checks) && output.claim_checks.length !== 0) errors.push("claim_checks must be empty when invalid");
    if (Array.isArray(output.errors) && output.errors.length !== 0) errors.push("errors must be empty when invalid");
    if (typeof output.invalid_reason !== "string" || output.invalid_reason.length === 0) errors.push("invalid_reason required when invalid");
    return errors;
  }

  if (output.invalid_reason !== null && output.invalid_reason !== undefined) {
    errors.push("invalid_reason must be null or omitted when scored");
  }
  const metricNames = [
    "faithfulness",
    "numerical_correctness",
    "completeness",
    "task_relevance",
    "actionability",
    "clarity",
    "safety_fairness",
  ];
  if (!output.subscores || typeof output.subscores !== "object" || Array.isArray(output.subscores)) {
    errors.push("subscores must be object when scored");
  } else {
    for (const key of Object.keys(output.subscores)) {
      if (!metricNames.includes(key)) errors.push(`unexpected subscore metric ${key}`);
    }
    for (const metric of metricNames) validateMetricScore(metric, output.subscores[metric], errors);
  }

  const claimIds = new Set();
  for (const [index, claim] of (output.claim_checks ?? []).entries()) {
    const prefix = `claim_checks[${index}]`;
    const allowedClaim = new Set([
      "claim_id",
      "claim_text",
      "claim_type",
      "claim_scope",
      "support_status",
      "impact_type",
      "evidence_refs",
      "expected_value",
      "observed_value",
      "checker_source",
      "checker_details",
      "rationale",
    ]);
    for (const key of Object.keys(claim ?? {})) {
      if (!allowedClaim.has(key)) errors.push(`${prefix} unexpected field ${key}`);
    }
    if (!/^C[0-9]+$/.test(claim?.claim_id ?? "")) errors.push(`${prefix}.claim_id invalid`);
    else claimIds.add(claim.claim_id);
    if (typeof claim?.claim_text !== "string" || claim.claim_text.length === 0) errors.push(`${prefix}.claim_text invalid`);
    if (typeof claim?.claim_type !== "string" || claim.claim_type.length === 0) errors.push(`${prefix}.claim_type invalid`);
    if (!["core", "supporting", "incidental"].includes(claim?.claim_scope)) errors.push(`${prefix}.claim_scope invalid`);
    if (!["supported", "partially_supported", "unsupported", "contradicted", "not_verifiable"].includes(claim?.support_status)) errors.push(`${prefix}.support_status invalid`);
    if (claim?.support_status !== "supported" && !["local_detail", "weakens_support", "changes_interpretation", "reverses_main_finding", "wrong_evaluation_target"].includes(claim?.impact_type)) {
      errors.push(`${prefix}.impact_type required/invalid for non-supported claim`);
    }
    if (!Array.isArray(claim?.evidence_refs) || claim.evidence_refs.some((item) => typeof item !== "string" || item.length === 0)) errors.push(`${prefix}.evidence_refs invalid`);
    if (!["deterministic_checker", "llm_judge", "hybrid"].includes(claim?.checker_source)) errors.push(`${prefix}.checker_source invalid`);
    if (typeof claim?.rationale !== "string") errors.push(`${prefix}.rationale must be string`);
  }

  for (const [index, errorRecord] of (output.errors ?? []).entries()) {
    const prefix = `errors[${index}]`;
    const allowedError = new Set([
      "error_id",
      "error_type",
      "claim_ids",
      "requirement_id",
      "severity",
      "primary_metric",
      "secondary_metrics",
      "cap_candidate",
      "rationale",
      "evidence_refs",
    ]);
    for (const key of Object.keys(errorRecord ?? {})) {
      if (!allowedError.has(key)) errors.push(`${prefix} unexpected field ${key}`);
    }
    if (!/^E[0-9]+$/.test(errorRecord?.error_id ?? "")) errors.push(`${prefix}.error_id invalid`);
    if (typeof errorRecord?.error_type !== "string" || errorRecord.error_type.length === 0) errors.push(`${prefix}.error_type invalid`);
    if (!Array.isArray(errorRecord?.claim_ids)) errors.push(`${prefix}.claim_ids must be array`);
    else {
      for (const claimId of errorRecord.claim_ids) {
        if (!claimIds.has(claimId)) errors.push(`${prefix}.claim_ids references unknown ${claimId}`);
      }
    }
    if (!["minor", "major", "critical"].includes(errorRecord?.severity)) errors.push(`${prefix}.severity invalid`);
    if (!metricNames.includes(errorRecord?.primary_metric)) errors.push(`${prefix}.primary_metric invalid`);
    if (!Array.isArray(errorRecord?.secondary_metrics) || errorRecord.secondary_metrics.some((metric) => !metricNames.includes(metric))) errors.push(`${prefix}.secondary_metrics invalid`);
    if (!(errorRecord?.cap_candidate === null || (typeof errorRecord?.cap_candidate === "number" && errorRecord.cap_candidate >= 1 && errorRecord.cap_candidate <= 10))) errors.push(`${prefix}.cap_candidate invalid`);
    if (typeof errorRecord?.rationale !== "string" || errorRecord.rationale.length === 0) errors.push(`${prefix}.rationale invalid`);
    if (!Array.isArray(errorRecord?.evidence_refs)) errors.push(`${prefix}.evidence_refs invalid`);
  }

  return errors;
}

async function importRawOutputs({ args, invocationEntries, generatedAt }) {
  const attempts = [];
  const statuses = [];
  const issues = [];

  for (const entry of invocationEntries) {
    const rawPath = repoPathToAbsolute(entry.expected_raw_output_path);
    const recordId = entry.record_id;
    if (!(await pathExists(rawPath))) {
      statuses.push(buildRecordStatus({
        recordId,
        recordStatus: "missing",
        lastAttemptNumber: null,
        updatedAt: generatedAt,
      }));
      issues.push({
        severity: "warning",
        code: "raw_output_missing",
        record_id: recordId,
        message: "No raw judge output found for this record.",
      });
      continue;
    }

    const rawText = await readText(rawPath);
    const rawSha256 = sha256Text(rawText);
    const extraction = extractJsonFromRaw(rawText);
    const extractedPath = path.join(args.extractedOutputsDir, `${safeFileStem(recordId)}.json`);
    await writeFile(extractedPath, `${extraction.outputText}\n`, "utf8");

    let parsed = null;
    const validationErrors = [...extraction.errors];
    try {
      parsed = JSON.parse(extraction.outputText);
    } catch (error) {
      validationErrors.push(`invalid_json: ${error.message}`);
    }
    if (parsed) validationErrors.push(...validateJudgeResponse(parsed, recordId));

    const valid = validationErrors.length === 0;
    const validatedPath = valid
      ? path.join(args.validatedOutputsDir, `${safeFileStem(recordId)}.json`)
      : null;
    const validatedText = valid ? `${JSON.stringify(parsed, null, 2)}\n` : null;
    if (valid) await writeFile(validatedPath, validatedText, "utf8");

    const wrapper = {
      schema_version: "execution_attempt_wrapper_schema_v1",
      evaluation_run_id: EVALUATION_RUN_ID,
      record_id: recordId,
      session_segment_id: entry.session_segment_id,
      session_sequence_number: entry.session_sequence_number,
      attempt_number: 1,
      attempt_reason: "initial",
      judge_status: valid ? "valid" : "retryable_invalid",
      judge_input_sha256: entry.judge_input_sha256,
      source_response_id: `manual_raw_output__${recordId}`,
      source_response_message_index: null,
      source_response_provider_id: null,
      raw_or_source_response_path: entry.expected_raw_output_path,
      raw_or_source_response_sha256: rawSha256,
      extracted_output_path: toRepoPath(extractedPath),
      validated_output_path: valid ? toRepoPath(validatedPath) : null,
      validated_output_sha256: valid ? sha256Text(validatedText) : null,
      validation_errors: validationErrors,
      retrieval_log_path_if_applicable: null,
      judged_at: generatedAt,
      validated_at: valid ? generatedAt : null,
    };
    const wrapperPath = path.join(args.attemptWrappersDir, `${safeFileStem(recordId)}__attempt_1.json`);
    await writeFile(wrapperPath, `${JSON.stringify(wrapper, null, 2)}\n`, "utf8");
    attempts.push({
      ...wrapper,
      attempt_wrapper_path: toRepoPath(wrapperPath),
    });

    statuses.push(buildRecordStatus({
      recordId,
      recordStatus: valid ? "valid" : "retryable_invalid",
      lastAttemptNumber: 1,
      updatedAt: generatedAt,
    }));

    for (const message of validationErrors) {
      issues.push({
        severity: valid ? "warning" : "error",
        code: "judge_output_validation_error",
        record_id: recordId,
        message,
      });
    }
  }

  return { attempts, statuses, issues };
}

function buildRecordStatus({ recordId, recordStatus, lastAttemptNumber, updatedAt }) {
  return {
    schema_version: "record_execution_status_schema_v1",
    evaluation_run_id: EVALUATION_RUN_ID,
    record_id: recordId,
    record_status: recordStatus,
    last_attempt_number: lastAttemptNumber,
    exclusion_reason: null,
    updated_at: updatedAt,
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

function summarize({ mode, generatedAt, invocationEntries, attempts, statuses, issues, args, promptSha256 }) {
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const valid = statuses.filter((status) => status.record_status === "valid");
  const missing = statuses.filter((status) => status.record_status === "missing");
  const retryableInvalid = statuses.filter((status) => status.record_status === "retryable_invalid");

  const preparedOnly = mode === "prepare";
  const importComplete = mode === "import" && valid.length === invocationEntries.length;
  const status = preparedOnly
    ? "READY_FOR_JUDGE_INVOCATION"
    : importComplete
      ? "PASS"
      : errors.length > 0
        ? "FAIL"
        : "WAITING_FOR_RAW_OUTPUTS";

  return {
    report_version: "llm_judge_v2_phase6_5_pilot_judge_invocation_report_v1",
    generated_at: generatedAt,
    mode,
    status,
    phase_scope: ["6.5 pilot judge invocation/output validation"],
    inputs: {
      judge_context_manifest_jsonl: toRepoPath(args.contextManifestPath),
      prompt_path: toRepoPath(PROMPT_PATH),
      prompt_sha256: promptSha256,
      judge_response_schema_path: toRepoPath(JUDGE_RESPONSE_SCHEMA_PATH),
      attempt_wrapper_schema_path: toRepoPath(ATTEMPT_WRAPPER_SCHEMA_PATH),
      record_status_schema_path: toRepoPath(RECORD_STATUS_SCHEMA_PATH),
    },
    counts: {
      expected_records: invocationEntries.length,
      prompt_queue_records: invocationEntries.length,
      raw_received_records: attempts.length,
      valid_records: valid.length,
      retryable_invalid_records: retryableInvalid.length,
      missing_records: missing.length,
      errors: errors.length,
      warnings: warnings.length,
    },
    coverage_summary: {
      datasets: countBy(invocationEntries, (entry) => entry.dataset_id),
      explanation_modes: countBy(invocationEntries, (entry) => entry.explanation_mode),
      evidence_access_modes: countBy(invocationEntries, (entry) => entry.evidence_access_mode),
      record_statuses: countBy(statuses, (entry) => entry.record_status),
    },
    outputs: {
      prompt_queue_dir: toRepoPath(args.promptQueueDir),
      raw_outputs_dir: toRepoPath(args.rawOutputsDir),
      extracted_outputs_dir: toRepoPath(args.extractedOutputsDir),
      validated_outputs_dir: toRepoPath(args.validatedOutputsDir),
      attempt_wrappers_dir: toRepoPath(args.attemptWrappersDir),
      record_statuses_dir: toRepoPath(args.recordStatusesDir),
      invocation_manifest_jsonl: toRepoPath(args.invocationManifestPath),
      attempt_manifest_jsonl: toRepoPath(args.attemptManifestPath),
      status_manifest_jsonl: toRepoPath(args.statusManifestPath),
      report_json: toRepoPath(args.reportJsonPath),
      report_md: toRepoPath(args.reportMdPath),
    },
    gate_decision: {
      prompt_queue_ready: invocationEntries.length > 0,
      actual_judge_invocation_completed: importComplete,
      pilot_output_validation_passed: importComplete,
      phase6_6_scoring_allowed: importComplete,
      official_full_evaluation_allowed: false,
      reason: preparedOnly
        ? "Pilot invocation prompts are prepared. Actual Codex/LLM judge raw outputs must be produced and imported before Phase 6.6."
        : importComplete
          ? "All pilot raw judge outputs imported and schema-validated."
          : "Raw judge outputs are missing or invalid. Complete invocation/import before Phase 6.6.",
    },
    issues,
  };
}

function renderMarkdownReport(report) {
  const lines = [
    "# LLM Judge V2 Phase 6.5 Pilot Judge Invocation Report",
    "",
    `- Generated at: ${report.generated_at}`,
    `- Mode: ${report.mode}`,
    `- Status: ${report.status}`,
    `- Expected records: ${report.counts.expected_records}`,
    `- Prompt queue records: ${report.counts.prompt_queue_records}`,
    `- Raw received records: ${report.counts.raw_received_records}`,
    `- Valid records: ${report.counts.valid_records}`,
    `- Retryable invalid records: ${report.counts.retryable_invalid_records}`,
    `- Missing records: ${report.counts.missing_records}`,
    `- Errors: ${report.counts.errors}`,
    `- Warnings: ${report.counts.warnings}`,
    "",
    "## Gate Decision",
    "",
    `- Prompt queue ready: ${report.gate_decision.prompt_queue_ready}`,
    `- Actual judge invocation completed: ${report.gate_decision.actual_judge_invocation_completed}`,
    `- Pilot output validation passed: ${report.gate_decision.pilot_output_validation_passed}`,
    `- Phase 6.6 scoring allowed: ${report.gate_decision.phase6_6_scoring_allowed}`,
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
    `| Record statuses | ${JSON.stringify(report.coverage_summary.record_statuses)} |`,
    "",
    "## Outputs",
    "",
    `- Prompt queue dir: \`${report.outputs.prompt_queue_dir}\``,
    `- Raw outputs dir: \`${report.outputs.raw_outputs_dir}\``,
    `- Invocation manifest: \`${report.outputs.invocation_manifest_jsonl}\``,
    `- Attempt manifest: \`${report.outputs.attempt_manifest_jsonl}\``,
    `- Status manifest: \`${report.outputs.status_manifest_jsonl}\``,
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
  await mkdir(args.promptQueueDir, { recursive: true });
  await mkdir(args.rawOutputsDir, { recursive: true });
  await mkdir(args.extractedOutputsDir, { recursive: true });
  await mkdir(args.validatedOutputsDir, { recursive: true });
  await mkdir(args.attemptWrappersDir, { recursive: true });
  await mkdir(args.recordStatusesDir, { recursive: true });

  await readJson(JUDGE_RESPONSE_SCHEMA_PATH);
  await readJson(ATTEMPT_WRAPPER_SCHEMA_PATH);
  await readJson(RECORD_STATUS_SCHEMA_PATH);

  const promptText = await readText(PROMPT_PATH);
  const promptSha256 = sha256Text(promptText);
  const contextEntries = (await readJsonl(args.contextManifestPath))
    .filter((entry) => entry.status === "judge_context_ready");

  const invocationEntries = await prepareInvocationQueue({
    args,
    contextEntries,
    promptText,
    generatedAt,
  });
  await writeFile(args.invocationManifestPath, `${invocationEntries.map((entry) => JSON.stringify(entry)).join("\n")}\n`, "utf8");

  let attempts = [];
  let statuses = invocationEntries.map((entry) => buildRecordStatus({
    recordId: entry.record_id,
    recordStatus: "pending",
    lastAttemptNumber: null,
    updatedAt: generatedAt,
  }));
  let issues = [];

  if (args.mode === "import") {
    const imported = await importRawOutputs({ args, invocationEntries, generatedAt });
    attempts = imported.attempts;
    statuses = imported.statuses;
    issues = imported.issues;
  }

  await writeFile(args.attemptManifestPath, `${attempts.map((entry) => JSON.stringify(entry)).join("\n")}${attempts.length ? "\n" : ""}`, "utf8");
  await writeFile(args.statusManifestPath, `${statuses.map((entry) => JSON.stringify(entry)).join("\n")}\n`, "utf8");
  for (const status of statuses) {
    await writeFile(
      path.join(args.recordStatusesDir, `${safeFileStem(status.record_id)}.json`),
      `${JSON.stringify(status, null, 2)}\n`,
      "utf8",
    );
  }

  const report = summarize({
    mode: args.mode,
    generatedAt,
    invocationEntries,
    attempts,
    statuses,
    issues,
    args,
    promptSha256,
  });
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderMarkdownReport(report), "utf8");

  console.log(`[phase6.5] mode=${args.mode} status=${report.status} prompts=${report.counts.prompt_queue_records} valid=${report.counts.valid_records} missing=${report.counts.missing_records} errors=${report.counts.errors}`);
  if (args.mode === "import" && report.status === "FAIL") process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
