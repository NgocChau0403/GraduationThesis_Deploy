import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUN_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs/full_208");
const DEFAULT_CONTEXT_MANIFEST_PATH = path.join(
  RUN_ROOT,
  "phase8_judge_contexts/judge_context_manifest.jsonl",
);
const DEFAULT_OUTPUT_DIR = path.join(RUN_ROOT, "phase8_judge_queue");
const DEFAULT_PROMPT_PATH = path.join(PROJECT_ROOT, "Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md");
const PROMPT_QUEUE_DIRNAME = "prompt_queue";
const DEFAULT_FULL_CONTEXT_TOKEN_CAP = 32000;
const TOKEN_THRESHOLDS = [32000, 64000, 128000, 190000];
const PACKET_LAYOUTS = ["embedded_prompt_full_context", "session_static_record_context"];

function parseArgs(argv) {
  const args = {
    contextManifestPath: DEFAULT_CONTEXT_MANIFEST_PATH,
    outputDir: DEFAULT_OUTPUT_DIR,
    fullContextTokenCap: DEFAULT_FULL_CONTEXT_TOKEN_CAP,
    reportBasename: "token_budget_report",
    promptPath: DEFAULT_PROMPT_PATH,
    expectedCount: 208,
    packetLayout: "embedded_prompt_full_context",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--context-manifest") args.contextManifestPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else if (arg === "--full-context-token-cap") args.fullContextTokenCap = Number(next), i += 1;
    else if (arg === "--report-basename") args.reportBasename = next, i += 1;
    else if (arg === "--prompt-path") args.promptPath = path.resolve(next), i += 1;
    else if (arg === "--expected-count") args.expectedCount = Number(next), i += 1;
    else if (arg === "--packet-layout") args.packetLayout = next, i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!PACKET_LAYOUTS.includes(args.packetLayout)) {
    throw new Error(`--packet-layout must be one of: ${PACKET_LAYOUTS.join(", ")}`);
  }

  return {
    ...args,
    promptQueueDir: path.join(args.outputDir, PROMPT_QUEUE_DIRNAME),
    promptQueueManifestPath: path.join(args.outputDir, "judge_prompt_queue_manifest.jsonl"),
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
  return (await readText(filePath))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}

function estimateTokens(text) {
  return Math.ceil(String(text ?? "").length / 4);
}

function safeFileStem(value) {
  return String(value).replace(/[^A-Za-z0-9_.-]+/g, "_");
}

function renderJsonBlock(value) {
  return `\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``;
}

function riskBucket(tokenCount) {
  if (tokenCount > 190000) return ">190k";
  if (tokenCount > 128000) return ">128k";
  if (tokenCount > 64000) return ">64k";
  if (tokenCount > 32000) return ">32k";
  return "<=32k";
}

function countBy(items, keyFn) {
  const counts = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function pickQueueStrategy(entry, fullContextTokenCap) {
  const tokenCount = entry.token_accounting?.context_token_count ?? 0;
  if (tokenCount <= fullContextTokenCap) return "full_context";
  return "compact_retrieval_context";
}

function buildRecordIdentity(judgeInput) {
  return {
    record_id: judgeInput.record_id,
    evaluation_run_id: judgeInput.evaluation_run_id,
    dataset_id: judgeInput.dataset_id,
    task_id: judgeInput.task_id,
    explanation_mode: judgeInput.explanation_mode,
    prompt_version: judgeInput.prompt_version,
    rubric_version: judgeInput.rubric_version,
  };
}

function buildArtifactReferences(judgeInput) {
  return (judgeInput.evidence_access.full_query_artifacts ?? []).map((artifact) => ({
    dataset_label: artifact.dataset_label,
    artifact_path: artifact.artifact_path,
    artifact_sha256: artifact.artifact_sha256,
    row_count: artifact.row_count,
    readable: artifact.readable,
  }));
}

async function buildCompactPromptPacket({
  promptText,
  promptPath,
  promptSha256,
  packetLayout,
  entry,
  judgeInput,
  evidenceArtifact,
  retrievalLog,
}) {
  const evidenceSummary = evidenceArtifact.evidence_summary ?? {
    row_count_observed: judgeInput.evidence_access.full_result_row_count,
    dataset_breakdown: entry.dataset_breakdown ?? [],
  };
  const compactPayload = {
    queue_strategy: "compact_retrieval_context",
    strategy_reason: "Full final context exceeds the configured token cap; full rows are not embedded in this prompt packet.",
    audit_guarantee: {
      full_artifacts_remain_on_disk: true,
      full_artifact_references: buildArtifactReferences(judgeInput),
      final_context_path: entry.final_context_path,
      final_context_sha256: entry.final_context_sha256,
      judge_input_path: entry.judge_input_path,
      judge_input_sha256: entry.judge_input_sha256,
    },
    record_identity: buildRecordIdentity(judgeInput),
    task_context: judgeInput.task_context,
    schema_context: judgeInput.schema_context,
    evaluation_requirements: judgeInput.evaluation_requirements,
    derived_stat_evidence: judgeInput.derived_stat_evidence ?? [],
    deterministic_checks: judgeInput.evidence_access?.deterministic_checks ?? [],
    evidence_access_summary: {
      evidence_access_mode: judgeInput.evidence_access.evidence_access_mode,
      full_result_row_count: judgeInput.evidence_access.full_result_row_count,
      prompt_embedded_row_count: 0,
      retrieved_row_count: judgeInput.evidence_access.retrieved_row_count,
      retrieved_row_count_by_dataset: judgeInput.evidence_access.retrieved_row_count_by_dataset,
      retrieval_log_path: judgeInput.evidence_access.retrieval_log_path,
      retrieval_coverage_status: judgeInput.evidence_access.retrieval_coverage_status,
      full_access_available: judgeInput.evidence_access.full_access_available,
      deterministic_scan_scope: judgeInput.evidence_access.deterministic_scan_scope,
      deterministic_scan_row_count_by_dataset: judgeInput.evidence_access.deterministic_scan_row_count_by_dataset,
      full_result_sent_to_llm: false,
      evidence_summary: evidenceSummary,
      retrieval_log_summary: retrievalLog
        ? {
          retrieval_request_complete: retrievalLog.retrieval_request_complete,
          retrieval_coverage_status: retrievalLog.retrieval_coverage_status,
          chunk_count: Array.isArray(retrievalLog.chunks) ? retrievalLog.chunks.length : 0,
          chunks: (retrievalLog.chunks ?? []).map((chunk) => ({
            chunk_id: chunk.chunk_id,
            dataset_label: chunk.dataset_label,
            row_start_inclusive: chunk.row_start_inclusive,
            row_end_inclusive: chunk.row_end_inclusive,
            row_count: chunk.row_count,
            source_artifact_path: chunk.source_artifact_path,
            source_artifact_sha256: chunk.source_artifact_sha256,
          })),
        }
        : null,
      context_manifest_validation: {
        direct_embedding_validation: entry.direct_embedding_validation ?? null,
        retrieval_validation: entry.retrieval_validation ?? null,
        deterministic_check_count: entry.deterministic_check_count,
        deterministic_check_failures: entry.deterministic_check_failures,
        deterministic_check_types: entry.deterministic_check_types,
      },
    },
    explanation_to_judge: {
      raw_text: judgeInput.explanation.raw_text,
      structured_payload: judgeInput.explanation.structured_payload,
      generation_metadata: judgeInput.explanation.generation_metadata,
    },
    judge_instruction_boundary: {
      do_not_assume_missing_rows_are_absent: true,
      use_full_artifact_references_for_audit: true,
      evaluate_claims_against_the_compact_evidence_and_recorded_artifact_provenance: true,
      if_full_row_inspection_is_required_mark_the_record_for_manual_or_secondary_retrieval_review: true,
    },
  };

  const staticPromptSection = packetLayout === "session_static_record_context"
    ? [
      "## Session-Static Judge Contract Reference",
      "",
      "The Judge Prompt is intentionally not embedded in this record packet. The session must load and verify it once, then combine it with this record-specific context.",
      "",
      renderJsonBlock({
        static_prompt_path: toRepoPath(promptPath),
        static_prompt_sha256: promptSha256,
      }),
    ]
    : ["## Frozen Judge Prompt V2", "", promptText];

  return [
    "# LLM Judge V2 Prompt Queue Packet",
    "",
    ...staticPromptSection,
    "",
    "## Queue Strategy",
    "",
    "This packet uses `compact_retrieval_context`. It intentionally does not embed all full-query rows because the Phase F6 final context exceeds the configured prompt token cap.",
    "",
    "## Compact Judge Context",
    "",
    renderJsonBlock(compactPayload),
    "",
  ].join("\n");
}

function buildFullPromptPacket({ promptText, promptPath, promptSha256, packetLayout, finalContextText }) {
  const staticPromptSection = packetLayout === "session_static_record_context"
    ? [
      "## Session-Static Judge Contract Reference",
      "",
      "The Judge Prompt is intentionally not embedded in this record packet. The session must load and verify it once, then combine it with this record-specific context.",
      "",
      renderJsonBlock({
        static_prompt_path: toRepoPath(promptPath),
        static_prompt_sha256: promptSha256,
      }),
    ]
    : ["## Frozen Judge Prompt V2", "", promptText];

  return [
    "# LLM Judge V2 Prompt Queue Packet",
    "",
    ...staticPromptSection,
    "",
    "## Full Final Judge Context",
    "",
    finalContextText,
    "",
  ].join("\n");
}

async function buildQueueEntry({ entry, args, promptText, promptSha256 }) {
  const strategy = pickQueueStrategy(entry, args.fullContextTokenCap);
  const finalContextPath = repoPathToAbsolute(entry.final_context_path);
  const finalContextText = await readText(finalContextPath);
  const judgeInput = await readJson(repoPathToAbsolute(entry.judge_input_path));
  const evidenceArtifactPath = repoPathToAbsolute(judgeInput.evidence_access.full_query_artifacts[0].artifact_path);
  const evidenceArtifact = await readJson(evidenceArtifactPath);
  let retrievalLog = null;
  if (judgeInput.evidence_access.retrieval_log_path) {
    retrievalLog = await readJson(repoPathToAbsolute(judgeInput.evidence_access.retrieval_log_path));
  }

  const promptPacketText = strategy === "full_context"
    ? buildFullPromptPacket({
      promptText,
      promptPath: args.promptPath,
      promptSha256,
      packetLayout: args.packetLayout,
      finalContextText,
    })
    : await buildCompactPromptPacket({
      promptText,
      promptPath: args.promptPath,
      promptSha256,
      packetLayout: args.packetLayout,
      entry,
      judgeInput,
      evidenceArtifact,
      retrievalLog,
    });

  const promptPacketPath = path.join(args.promptQueueDir, `${safeFileStem(entry.record_id)}.md`);
  await writeFile(promptPacketPath, promptPacketText, "utf8");
  const packetTokenEstimate = estimateTokens(promptPacketText);
  const staticPromptTokenEstimate = estimateTokens(promptText);
  const contextTokenEstimate = entry.token_accounting?.context_token_count ?? estimateTokens(finalContextText);

  return {
    record_id: entry.record_id,
    case_id: entry.case_id,
    dataset_id: entry.dataset_id,
    task_id: entry.task_id,
    task_name: entry.task_name,
    explanation_mode: entry.explanation_mode,
    status: "prompt_queue_ready",
    queue_strategy: strategy,
    token_risk_bucket: riskBucket(contextTokenEstimate),
    context_token_count: contextTokenEstimate,
    prompt_packet_token_count: packetTokenEstimate,
    packet_layout: args.packetLayout,
    static_prompt_path: toRepoPath(args.promptPath),
    static_prompt_sha256: promptSha256,
    static_prompt_token_count: staticPromptTokenEstimate,
    record_context_path: toRepoPath(promptPacketPath),
    record_context_sha256: sha256Text(promptPacketText),
    record_context_token_count: packetTokenEstimate,
    first_record_combined_token_count: staticPromptTokenEstimate + packetTokenEstimate,
    full_context_token_cap: args.fullContextTokenCap,
    final_context_path: entry.final_context_path,
    final_context_sha256: entry.final_context_sha256,
    judge_input_path: entry.judge_input_path,
    judge_input_sha256: entry.judge_input_sha256,
    prompt_packet_path: toRepoPath(promptPacketPath),
    prompt_packet_sha256: sha256Text(promptPacketText),
    evidence_access_mode: entry.evidence_access_mode,
    full_result_row_count: entry.full_result_row_count,
    retrieval_log_path: judgeInput.evidence_access.retrieval_log_path ?? null,
    artifact_references: buildArtifactReferences(judgeInput),
    judge_invocation_allowed_for_record: false,
    next_step: "await_user_approval_before_judge_invocation",
  };
}

function summarize({ generatedAt, entries, args, promptSha256, maxEntry }) {
  const largeEntries = entries.filter((entry) => entry.context_token_count > args.fullContextTokenCap);
  const oversizedFullContext = entries.filter((entry) => (
    entry.context_token_count > args.fullContextTokenCap && entry.queue_strategy === "full_context"
  ));
  const thresholdCounts = Object.fromEntries(
    TOKEN_THRESHOLDS.map((threshold) => [
      `>${threshold}`,
      entries.filter((entry) => entry.context_token_count > threshold).length,
    ]),
  );
  const pass = entries.length === args.expectedCount
    && new Set(entries.map((entry) => entry.record_id)).size === args.expectedCount
    && oversizedFullContext.length === 0
    && entries.every((entry) => entry.status === "prompt_queue_ready");
  const staticPromptTokenCount = entries[0]?.static_prompt_token_count ?? 0;
  const recordContextTokenCount = entries.reduce((sum, entry) => sum + entry.record_context_token_count, 0);
  const embeddedPromptEquivalentTokenCount = recordContextTokenCount
    + (args.packetLayout === "session_static_record_context" ? staticPromptTokenCount * entries.length : 0);
  const sessionStaticTotalTokenCount = recordContextTokenCount
    + (args.packetLayout === "session_static_record_context" ? staticPromptTokenCount : 0);
  const avoidedTokenCount = embeddedPromptEquivalentTokenCount - sessionStaticTotalTokenCount;
  const savingsRatio = embeddedPromptEquivalentTokenCount > 0
    ? Number((avoidedTokenCount / embeddedPromptEquivalentTokenCount).toFixed(4))
    : 0;

  return {
    report_version: "llm_judge_v2_phase_f7_preflight_token_budget_v1",
    generated_at: generatedAt,
    status: pass ? "PASS" : "FAIL",
    phase_scope: ["F7-preflight token budget audit and prompt queue strategy"],
    inputs: {
      judge_context_manifest_jsonl: toRepoPath(args.contextManifestPath),
      prompt_path: toRepoPath(args.promptPath),
      prompt_sha256: promptSha256,
      packet_layout: args.packetLayout,
    },
    configuration: {
      full_context_token_cap: args.fullContextTokenCap,
      tokenizer_method: "heuristic_chars_div_4_ceiling",
      thresholds: TOKEN_THRESHOLDS,
      static_prompt_loaded_once_per_session: args.packetLayout === "session_static_record_context",
    },
    counts: {
      prompt_queue_ready_records: entries.filter((entry) => entry.status === "prompt_queue_ready").length,
      total_records: entries.length,
      unique_record_ids: new Set(entries.map((entry) => entry.record_id)).size,
      full_context_records: entries.filter((entry) => entry.queue_strategy === "full_context").length,
      compact_retrieval_context_records: entries.filter((entry) => entry.queue_strategy === "compact_retrieval_context").length,
      oversized_full_context_records: oversizedFullContext.length,
      threshold_counts: thresholdCounts,
    },
    token_savings: {
      static_prompt_token_count: staticPromptTokenCount,
      record_context_token_count_total: recordContextTokenCount,
      embedded_prompt_equivalent_token_count: embeddedPromptEquivalentTokenCount,
      session_static_total_token_count: sessionStaticTotalTokenCount,
      repeated_static_tokens_avoided: avoidedTokenCount,
      estimated_savings_ratio: savingsRatio,
      estimated_savings_percent: Number((savingsRatio * 100).toFixed(2)),
    },
    coverage_summary: {
      datasets: countBy(entries, (entry) => entry.dataset_id),
      explanation_modes: countBy(entries, (entry) => entry.explanation_mode),
      evidence_access_modes: countBy(entries, (entry) => entry.evidence_access_mode),
      queue_strategies: countBy(entries, (entry) => entry.queue_strategy),
      token_risk_buckets: countBy(entries, (entry) => entry.token_risk_bucket),
    },
    max_context_record: maxEntry
      ? {
        record_id: maxEntry.record_id,
        dataset_id: maxEntry.dataset_id,
        task_id: maxEntry.task_id,
        task_name: maxEntry.task_name,
        explanation_mode: maxEntry.explanation_mode,
        evidence_access_mode: maxEntry.evidence_access_mode,
        context_token_count: maxEntry.context_token_count,
        prompt_packet_token_count: maxEntry.prompt_packet_token_count,
        packet_layout: maxEntry.packet_layout,
        queue_strategy: maxEntry.queue_strategy,
        final_context_path: maxEntry.final_context_path,
        prompt_packet_path: maxEntry.prompt_packet_path,
      }
      : null,
    outputs: {
      prompt_queue_manifest_jsonl: toRepoPath(args.promptQueueManifestPath),
      prompt_queue_dir: toRepoPath(args.promptQueueDir),
      report_json: toRepoPath(args.reportJsonPath),
      report_md: toRepoPath(args.reportMdPath),
    },
    gate_decision: {
      prompt_queue_preflight_status: pass ? "PASS" : "FAIL",
      prompt_queue_ready: pass,
      judge_invocation_started: false,
      judge_invocation_allowed: false,
      official_full_evaluation_allowed: "pending_user_approval",
      reason: pass
        ? "Prompt queue packets are generated with token-budget strategy. Judge invocation was not started and still requires explicit user approval."
        : "Prompt queue preflight failed. Fix oversized or invalid queue entries before judge invocation.",
    },
    issues: oversizedFullContext.map((entry) => ({
      severity: "error",
      code: "oversized_full_context_not_compacted",
      record_id: entry.record_id,
      message: "Record exceeds token cap but was queued as full_context.",
    })),
  };
}

function renderMarkdownReport(report) {
  const max = report.max_context_record;
  const lines = [
    "# LLM Judge V2 Phase F7-preflight Token Budget Report",
    "",
    `- Generated at: ${report.generated_at}`,
    `- Status: ${report.status}`,
    `- Tokenizer method: ${report.configuration.tokenizer_method}`,
    `- Full-context token cap: ${report.configuration.full_context_token_cap}`,
    `- Prompt queue ready records: ${report.counts.prompt_queue_ready_records}/${report.counts.total_records}`,
    `- Full-context records: ${report.counts.full_context_records}`,
    `- Compact retrieval-context records: ${report.counts.compact_retrieval_context_records}`,
    `- Packet layout: ${report.inputs.packet_layout}`,
    `- Estimated repeated static tokens avoided: ${report.token_savings.repeated_static_tokens_avoided}`,
    `- Estimated token savings: ${report.token_savings.estimated_savings_percent}%`,
    "",
    "## Threshold Counts",
    "",
    "| Threshold | Records above threshold |",
    "| --- | ---: |",
    ...TOKEN_THRESHOLDS.map((threshold) => `| >${threshold.toLocaleString()} | ${report.counts.threshold_counts[`>${threshold}`]} |`),
    "",
    "## Max Context Record",
    "",
    max
      ? renderJsonBlock(max)
      : "No records found.",
    "",
    "## Coverage",
    "",
    "| Dimension | Counts |",
    "| --- | --- |",
    `| Datasets | ${JSON.stringify(report.coverage_summary.datasets)} |`,
    `| Explanation modes | ${JSON.stringify(report.coverage_summary.explanation_modes)} |`,
    `| Evidence access modes | ${JSON.stringify(report.coverage_summary.evidence_access_modes)} |`,
    `| Queue strategies | ${JSON.stringify(report.coverage_summary.queue_strategies)} |`,
    `| Token risk buckets | ${JSON.stringify(report.coverage_summary.token_risk_buckets)} |`,
    "",
    "## Gate Decision",
    "",
    `- Prompt queue preflight status: ${report.gate_decision.prompt_queue_preflight_status}`,
    `- Prompt queue ready: ${report.gate_decision.prompt_queue_ready}`,
    `- Judge invocation started: ${report.gate_decision.judge_invocation_started}`,
    `- Judge invocation allowed: ${report.gate_decision.judge_invocation_allowed}`,
    `- Official full evaluation allowed: ${report.gate_decision.official_full_evaluation_allowed}`,
    `- Reason: ${report.gate_decision.reason}`,
    "",
    "## Outputs",
    "",
    `- Prompt queue manifest: \`${report.outputs.prompt_queue_manifest_jsonl}\``,
    `- Prompt queue dir: \`${report.outputs.prompt_queue_dir}\``,
    `- JSON report: \`${report.outputs.report_json}\``,
    `- Markdown report: \`${report.outputs.report_md}\``,
    "",
    "## Issues",
    "",
    report.issues.length
      ? report.issues.map((issue) => `- ${issue.severity.toUpperCase()} ${issue.code}: ${issue.record_id} - ${issue.message}`).join("\n")
      : "No issues found.",
    "",
  ];
  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const generatedAt = new Date().toISOString();
  await mkdir(args.outputDir, { recursive: true });
  await mkdir(args.promptQueueDir, { recursive: true });

  const promptText = await readText(args.promptPath);
  const promptSha256 = sha256Text(promptText);
  const contextEntries = (await readJsonl(args.contextManifestPath))
    .filter((entry) => entry.status === "judge_context_ready");

  const queueEntries = [];
  for (const entry of contextEntries) {
    console.log(`[phaseF7-preflight] ${entry.record_id}`);
    queueEntries.push(await buildQueueEntry({ entry, args, promptText, promptSha256 }));
  }

  const maxEntry = queueEntries
    .slice()
    .sort((a, b) => b.context_token_count - a.context_token_count)[0] ?? null;
  const report = summarize({
    generatedAt,
    entries: queueEntries,
    args,
    promptSha256,
    maxEntry,
  });

  await writeFile(
    args.promptQueueManifestPath,
    `${queueEntries.map((entry) => JSON.stringify(entry)).join("\n")}\n`,
    "utf8",
  );
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderMarkdownReport(report), "utf8");

  console.log(JSON.stringify({
    ok: report.status === "PASS",
    status: report.status,
    prompt_queue_ready_records: report.counts.prompt_queue_ready_records,
    full_context_records: report.counts.full_context_records,
    compact_retrieval_context_records: report.counts.compact_retrieval_context_records,
    threshold_counts: report.counts.threshold_counts,
    max_context_record: report.max_context_record,
    judge_invocation_started: report.gate_decision.judge_invocation_started,
    judge_invocation_allowed: report.gate_decision.judge_invocation_allowed,
    outputs: report.outputs,
  }, null, 2));

  if (report.status !== "PASS") process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
