import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUN_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs/full_208");

const DEFAULT_QUEUE_MANIFEST_PATH = path.join(
  RUN_ROOT,
  "phase8_judge_queue/judge_prompt_queue_manifest.jsonl",
);
const DEFAULT_OUTPUT_DIR = path.join(RUN_ROOT, "phase8_judge_invocation");
const DEFAULT_PROMPT_PATH = path.join(PROJECT_ROOT, "Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md");
const OFFICIAL_CONTRACT_MANIFEST_PATH = path.join(
  RUN_ROOT,
  "official_contract_manifest_v1.json",
);
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

const OFFICIAL_PROMPT_SHA256 = "e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517";
const OFFICIAL_CONTRACT_MANIFEST_SHA256 = "eb78be59016700cd9b5ec7f2e4886ecc67d8de06094439738af99f40e385e296";
const DEFAULT_DATASET_ID = "SAMPLE_UCI_POR";
const DEFAULT_EXPECTED_COUNT = 104;

function parseArgs(argv) {
  const args = {
    mode: "prepare",
    datasetId: DEFAULT_DATASET_ID,
    expectedCount: DEFAULT_EXPECTED_COUNT,
    queueManifestPath: DEFAULT_QUEUE_MANIFEST_PATH,
    outputDir: DEFAULT_OUTPUT_DIR,
    promptPath: DEFAULT_PROMPT_PATH,
    expectedPromptSha256: OFFICIAL_PROMPT_SHA256,
    contractManifestPath: OFFICIAL_CONTRACT_MANIFEST_PATH,
    expectedContractSha256: OFFICIAL_CONTRACT_MANIFEST_SHA256,
    evaluationRunId: null,
    sessionSegmentId: null,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--mode") args.mode = next, i += 1;
    else if (arg === "--dataset") args.datasetId = next, i += 1;
    else if (arg === "--expected-count") args.expectedCount = Number(next), i += 1;
    else if (arg === "--queue-manifest") args.queueManifestPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else if (arg === "--prompt") args.promptPath = path.resolve(next), i += 1;
    else if (arg === "--prompt-sha256") args.expectedPromptSha256 = next, i += 1;
    else if (arg === "--contract-manifest") args.contractManifestPath = path.resolve(next), i += 1;
    else if (arg === "--contract-manifest-sha256") args.expectedContractSha256 = next, i += 1;
    else if (arg === "--evaluation-run-id") args.evaluationRunId = next, i += 1;
    else if (arg === "--session-segment-id") args.sessionSegmentId = next, i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!["prepare", "import"].includes(args.mode)) {
    throw new Error("--mode must be prepare or import");
  }
  if (!Number.isInteger(args.expectedCount) || args.expectedCount <= 0) {
    throw new Error("--expected-count must be a positive integer");
  }

  const datasetStem = safeFileStem(args.datasetId);
  return {
    ...args,
    evaluationRunId: args.evaluationRunId ?? `llm_judge_v2_full_208__${datasetStem}`,
    sessionSegmentId: args.sessionSegmentId ?? `full_208__${datasetStem}__segment_001`,
    promptQueueDir: path.join(args.outputDir, "prompt_queue"),
    rawOutputsDir: path.join(args.outputDir, "raw_outputs"),
    extractedOutputsDir: path.join(args.outputDir, "extracted_outputs"),
    validatedOutputsDir: path.join(args.outputDir, "validated_outputs"),
    attemptWrappersDir: path.join(args.outputDir, "attempt_wrappers"),
    recordStatusDir: path.join(args.outputDir, "record_status"),
    invocationManifestPath: path.join(args.outputDir, "judge_invocation_manifest.jsonl"),
    attemptManifestPath: path.join(args.outputDir, "judge_attempt_manifest.jsonl"),
    statusManifestPath: path.join(args.outputDir, "record_execution_status_manifest.jsonl"),
    reportJsonPath: path.join(args.outputDir, "judge_invocation_report.json"),
    reportMdPath: path.join(args.outputDir, "judge_invocation_report.md"),
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
  return (await readText(filePath))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}

async function sha256File(filePath) {
  return sha256Text(await readText(filePath));
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

async function ensureOutputDirs(args) {
  await mkdir(args.outputDir, { recursive: true });
  await mkdir(args.promptQueueDir, { recursive: true });
  await mkdir(args.rawOutputsDir, { recursive: true });
  await mkdir(args.extractedOutputsDir, { recursive: true });
  await mkdir(args.validatedOutputsDir, { recursive: true });
  await mkdir(args.attemptWrappersDir, { recursive: true });
  await mkdir(args.recordStatusDir, { recursive: true });
}

function countBy(items, keyFn) {
  const counts = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function judgeInputRepoPathFor(entry) {
  return entry.judge_input_path
    ?? `Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/judge_inputs/${safeFileStem(entry.record_id)}.json`;
}

async function verifyOfficialFreeze(args) {
  await readJson(JUDGE_RESPONSE_SCHEMA_PATH);
  await readJson(ATTEMPT_WRAPPER_SCHEMA_PATH);
  await readJson(RECORD_STATUS_SCHEMA_PATH);

  const promptSha256 = await sha256File(args.promptPath);
  if (promptSha256 !== args.expectedPromptSha256) {
    throw new Error(`Frozen prompt hash mismatch: expected ${args.expectedPromptSha256}, observed ${promptSha256}`);
  }

  const contractSha256 = await sha256File(args.contractManifestPath);
  if (contractSha256 !== args.expectedContractSha256) {
    throw new Error(`Official contract manifest hash mismatch: expected ${args.expectedContractSha256}, observed ${contractSha256}`);
  }

  return { promptSha256, contractSha256 };
}

function buildRecordStatus({ args, recordId, recordStatus, lastAttemptNumber, updatedAt }) {
  return {
    schema_version: "record_execution_status_schema_v1",
    evaluation_run_id: args.evaluationRunId,
    record_id: recordId,
    record_status: recordStatus,
    last_attempt_number: lastAttemptNumber,
    exclusion_reason: null,
    updated_at: updatedAt,
  };
}

async function prepareInvocation({ args, freeze, generatedAt }) {
  const queueEntries = (await readJsonl(args.queueManifestPath))
    .filter((entry) => entry.dataset_id === args.datasetId);

  const issues = [];
  if (queueEntries.length !== args.expectedCount) {
    issues.push({
      severity: "error",
      code: "dataset_record_count_mismatch",
      message: `Expected ${args.expectedCount} ${args.datasetId} records, observed ${queueEntries.length}.`,
    });
  }

  const invalidQueueEntries = queueEntries.filter((entry) => entry.status !== "prompt_queue_ready");
  for (const entry of invalidQueueEntries) {
    issues.push({
      severity: "error",
      code: "queue_entry_not_ready",
      record_id: entry.record_id,
      message: `Queue status is ${entry.status}, expected prompt_queue_ready.`,
    });
  }

  const invocationEntries = [];
  let sequenceNumber = 0;
  for (const entry of queueEntries) {
    sequenceNumber += 1;
    const sourcePromptPath = repoPathToAbsolute(entry.prompt_packet_path);
    const sourcePromptSha256 = await sha256File(sourcePromptPath);
    if (sourcePromptSha256 !== entry.prompt_packet_sha256) {
      issues.push({
        severity: "error",
        code: "source_prompt_hash_mismatch",
        record_id: entry.record_id,
        message: "Prompt packet hash does not match queue manifest.",
      });
    }

    const invocationPromptPath = path.join(
      args.promptQueueDir,
      `${String(sequenceNumber).padStart(3, "0")}__${safeFileStem(entry.record_id)}.md`,
    );
    await copyFile(sourcePromptPath, invocationPromptPath);
    const invocationPromptSha256 = await sha256File(invocationPromptPath);

    const judgeInputRepoPath = judgeInputRepoPathFor(entry);
    const judgeInputAbsPath = repoPathToAbsolute(judgeInputRepoPath);
    const judgeInputSha256 = await sha256File(judgeInputAbsPath);

    invocationEntries.push({
      manifest_version: "llm_judge_v2_full_208_judge_invocation_manifest_v1",
      evaluation_run_id: args.evaluationRunId,
      dataset_run_scope: args.datasetId,
      official_contract_manifest_path: toRepoPath(args.contractManifestPath),
      official_contract_manifest_sha256: freeze.contractSha256,
      prompt_path: toRepoPath(args.promptPath),
      prompt_sha256: freeze.promptSha256,
      record_id: entry.record_id,
      dataset_id: entry.dataset_id,
      task_id: entry.task_id,
      explanation_mode: entry.explanation_mode,
      session_segment_id: args.sessionSegmentId,
      session_sequence_number: sequenceNumber,
      status: "pending_judge_invocation",
      invocation_prompt_path: toRepoPath(invocationPromptPath),
      invocation_prompt_sha256: invocationPromptSha256,
      source_prompt_packet_path: entry.prompt_packet_path,
      source_prompt_packet_sha256: entry.prompt_packet_sha256,
      final_context_path: entry.final_context_path,
      final_context_sha256: entry.final_context_sha256,
      judge_input_path: judgeInputRepoPath,
      judge_input_sha256: judgeInputSha256,
      expected_raw_output_path: toRepoPath(path.join(args.rawOutputsDir, `${safeFileStem(entry.record_id)}.json`)),
      evidence_access_mode: entry.evidence_access_mode,
      full_result_row_count: entry.full_result_row_count,
      retrieval_log_path: entry.retrieval_log_path ?? null,
      artifact_references: entry.artifact_references ?? [],
      queue_strategy: entry.queue_strategy,
      token_risk_bucket: entry.token_risk_bucket,
      context_token_count: entry.context_token_count,
      prompt_packet_token_count: entry.prompt_packet_token_count,
      packet_layout: entry.packet_layout ?? "embedded_prompt_full_context",
      static_prompt_path: entry.static_prompt_path ?? toRepoPath(args.promptPath),
      static_prompt_sha256: entry.static_prompt_sha256 ?? freeze.promptSha256,
      static_prompt_token_count: entry.static_prompt_token_count ?? null,
      record_context_path: toRepoPath(invocationPromptPath),
      record_context_sha256: invocationPromptSha256,
      record_context_token_count: entry.record_context_token_count ?? entry.prompt_packet_token_count,
      first_record_combined_token_count: entry.first_record_combined_token_count ?? entry.prompt_packet_token_count,
      full_context_token_cap: entry.full_context_token_cap,
      official_session_boundary: {
        codex_project_and_chat_session_must_be_new: true,
        dataset_must_not_be_mixed_with_other_dataset: true,
        official_dataset_scope: args.datasetId,
      },
      next_step: "run_codex_judge_for_this_dataset_session_then_save_raw_json_to_expected_raw_output_path",
      prepared_at: generatedAt,
    });
  }

  return { invocationEntries, issues };
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
        args,
        recordId,
        recordStatus: "missing",
        lastAttemptNumber: null,
        updatedAt: generatedAt,
      }));
      issues.push({
        severity: "warning",
        code: "raw_output_missing",
        record_id: recordId,
        message: `No raw judge output found at ${entry.expected_raw_output_path}.`,
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
      evaluation_run_id: entry.evaluation_run_id,
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
      retrieval_log_path_if_applicable: entry.retrieval_log_path ?? null,
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
      args,
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

function summarize({ args, mode, generatedAt, invocationEntries, attempts, statuses, issues, freeze }) {
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const valid = statuses.filter((status) => status.record_status === "valid");
  const missing = statuses.filter((status) => status.record_status === "missing");
  const retryableInvalid = statuses.filter((status) => status.record_status === "retryable_invalid");
  const preparedOnly = mode === "prepare";
  const importComplete = mode === "import" && valid.length === invocationEntries.length;
  const status = preparedOnly
    ? errors.length > 0 ? "PREPARE_FAILED" : "READY_FOR_JUDGE_INVOCATION"
    : importComplete
      ? "PASS"
      : errors.length > 0
        ? "FAIL"
        : "WAITING_FOR_RAW_OUTPUTS";

  return {
    report_version: "llm_judge_v2_full_208_judge_invocation_report_v1",
    generated_at: generatedAt,
    mode,
    status,
    phase_scope: ["Phase 7 official judge invocation/import", "full_208 dataset-scoped run"],
    dataset_scope: args.datasetId,
    evaluation_run_id: args.evaluationRunId,
    session_segment_id: args.sessionSegmentId,
    inputs: {
      prompt_queue_manifest_jsonl: toRepoPath(args.queueManifestPath),
      prompt_path: toRepoPath(args.promptPath),
      prompt_sha256: freeze.promptSha256,
      official_contract_manifest_path: toRepoPath(args.contractManifestPath),
      official_contract_manifest_sha256: freeze.contractSha256,
      judge_response_schema_path: toRepoPath(JUDGE_RESPONSE_SCHEMA_PATH),
      attempt_wrapper_schema_path: toRepoPath(ATTEMPT_WRAPPER_SCHEMA_PATH),
      record_status_schema_path: toRepoPath(RECORD_STATUS_SCHEMA_PATH),
    },
    counts: {
      expected_records: args.expectedCount,
      invocation_manifest_records: invocationEntries.length,
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
      queue_strategies: countBy(invocationEntries, (entry) => entry.queue_strategy),
      record_statuses: countBy(statuses, (entry) => entry.record_status),
    },
    outputs: {
      prompt_queue_dir: toRepoPath(args.promptQueueDir),
      raw_outputs_dir: toRepoPath(args.rawOutputsDir),
      extracted_outputs_dir: toRepoPath(args.extractedOutputsDir),
      validated_outputs_dir: toRepoPath(args.validatedOutputsDir),
      attempt_wrappers_dir: toRepoPath(args.attemptWrappersDir),
      record_status_dir: toRepoPath(args.recordStatusDir),
      invocation_manifest_jsonl: toRepoPath(args.invocationManifestPath),
      attempt_manifest_jsonl: toRepoPath(args.attemptManifestPath),
      status_manifest_jsonl: toRepoPath(args.statusManifestPath),
      report_json: toRepoPath(args.reportJsonPath),
      report_md: toRepoPath(args.reportMdPath),
    },
    gate_decision: {
      prompt_queue_ready: status === "READY_FOR_JUDGE_INVOCATION" || status === "PASS" || status === "WAITING_FOR_RAW_OUTPUTS",
      actual_judge_invocation_completed: importComplete,
      judge_output_validation_passed: importComplete,
      phase8_scoring_allowed_for_dataset: importComplete,
      full_208_finalization_allowed: false,
      reason: preparedOnly
        ? "Dataset-scoped official invocation manifest is prepared. Run the Codex judge session and save each raw response to expected_raw_output_path before import."
        : importComplete
          ? "All dataset-scoped raw judge outputs imported and schema-validated."
          : "Raw judge outputs are missing or invalid. Complete the dataset-scoped judge session and rerun import.",
    },
    issues,
  };
}

function renderMarkdownReport(report) {
  const lines = [
    "# LLM Judge V2 Full 208 Official Judge Invocation Report",
    "",
    `- Generated at: ${report.generated_at}`,
    `- Mode: ${report.mode}`,
    `- Status: ${report.status}`,
    `- Dataset scope: ${report.dataset_scope}`,
    `- Evaluation run id: ${report.evaluation_run_id}`,
    `- Session segment id: ${report.session_segment_id}`,
    `- Expected records: ${report.counts.expected_records}`,
    `- Invocation manifest records: ${report.counts.invocation_manifest_records}`,
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
    `- Judge output validation passed: ${report.gate_decision.judge_output_validation_passed}`,
    `- Phase 8 scoring allowed for dataset: ${report.gate_decision.phase8_scoring_allowed_for_dataset}`,
    `- Full 208 finalization allowed: ${report.gate_decision.full_208_finalization_allowed}`,
    `- Reason: ${report.gate_decision.reason}`,
    "",
    "## Coverage",
    "",
    "| Dimension | Counts |",
    "| --- | --- |",
    `| Datasets | ${JSON.stringify(report.coverage_summary.datasets)} |`,
    `| Explanation modes | ${JSON.stringify(report.coverage_summary.explanation_modes)} |`,
    `| Evidence access modes | ${JSON.stringify(report.coverage_summary.evidence_access_modes)} |`,
    `| Queue strategies | ${JSON.stringify(report.coverage_summary.queue_strategies)} |`,
    `| Record statuses | ${JSON.stringify(report.coverage_summary.record_statuses)} |`,
    "",
    "## Outputs",
    "",
    `- Prompt queue dir: \`${report.outputs.prompt_queue_dir}\``,
    `- Raw outputs dir: \`${report.outputs.raw_outputs_dir}\``,
    `- Extracted outputs dir: \`${report.outputs.extracted_outputs_dir}\``,
    `- Validated outputs dir: \`${report.outputs.validated_outputs_dir}\``,
    `- Attempt wrappers dir: \`${report.outputs.attempt_wrappers_dir}\``,
    `- Record status dir: \`${report.outputs.record_status_dir}\``,
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

async function writeOutputs({ args, report, invocationEntries, attempts, statuses }) {
  await writeFile(
    args.invocationManifestPath,
    `${invocationEntries.map((entry) => JSON.stringify(entry)).join("\n")}\n`,
    "utf8",
  );
  await writeFile(
    args.attemptManifestPath,
    `${attempts.map((entry) => JSON.stringify(entry)).join("\n")}${attempts.length ? "\n" : ""}`,
    "utf8",
  );
  await writeFile(
    args.statusManifestPath,
    `${statuses.map((entry) => JSON.stringify(entry)).join("\n")}\n`,
    "utf8",
  );
  for (const status of statuses) {
    await writeFile(
      path.join(args.recordStatusDir, `${safeFileStem(status.record_id)}.json`),
      `${JSON.stringify(status, null, 2)}\n`,
      "utf8",
    );
  }
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderMarkdownReport(report), "utf8");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const generatedAt = new Date().toISOString();
  await ensureOutputDirs(args);
const freeze = await verifyOfficialFreeze(args);

  let invocationEntries = [];
  let attempts = [];
  let statuses = [];
  let issues = [];

  if (args.mode === "prepare") {
    const prepared = await prepareInvocation({ args, freeze, generatedAt });
    invocationEntries = prepared.invocationEntries;
    issues = prepared.issues;
    statuses = invocationEntries.map((entry) => buildRecordStatus({
      args,
      recordId: entry.record_id,
      recordStatus: "pending",
      lastAttemptNumber: null,
      updatedAt: generatedAt,
    }));
  } else {
    if (!(await pathExists(args.invocationManifestPath))) {
      throw new Error(`Invocation manifest not found. Run --mode prepare first: ${toRepoPath(args.invocationManifestPath)}`);
    }
    invocationEntries = (await readJsonl(args.invocationManifestPath))
      .filter((entry) => entry.dataset_id === args.datasetId);
    if (invocationEntries.length !== args.expectedCount) {
      issues.push({
        severity: "error",
        code: "invocation_manifest_record_count_mismatch",
        message: `Expected ${args.expectedCount} ${args.datasetId} invocation records, observed ${invocationEntries.length}.`,
      });
    }
    const imported = await importRawOutputs({ args, invocationEntries, generatedAt });
    attempts = imported.attempts;
    statuses = imported.statuses;
    issues.push(...imported.issues);
  }

  const report = summarize({
    args,
    mode: args.mode,
    generatedAt,
    invocationEntries,
    attempts,
    statuses,
    issues,
    freeze,
  });

  await writeOutputs({ args, report, invocationEntries, attempts, statuses });

  console.log(`[phase7] mode=${args.mode} dataset=${args.datasetId} status=${report.status} records=${report.counts.invocation_manifest_records} raw=${report.counts.raw_received_records} valid=${report.counts.valid_records} missing=${report.counts.missing_records} errors=${report.counts.errors}`);
  if (report.status === "PREPARE_FAILED" || report.status === "FAIL") process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
