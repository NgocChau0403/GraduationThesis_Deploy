import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUN_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs/full_208");

const DEFAULT_DATASET_ID = "SAMPLE_UCI_POR";
const DEFAULT_OUTPUT_DIR = path.join(RUN_ROOT, "phase9_single_review_dry_run/pairwise_judge_queue");
const DEFAULT_RAW_OUTPUT_DIR = path.join(RUN_ROOT, "phase9_single_review_dry_run/pairwise_judge_invocation/raw_outputs");
const JUDGE_INPUT_DIR = path.join(RUN_ROOT, "phase8_judge_inputs/judge_inputs");
const DERIVED_STAT_DIR = path.join(RUN_ROOT, "phase9_single_review_dry_run/derived_stat_evidence");
const PAIRWISE_PROMPT_PATH = path.join(
  PROJECT_ROOT,
  "Docs/evaluation_v2/PromptEvaluateAI/PAIRWISE_JUDGE_PROMPT_V3_DRY_RUN.md",
);
const PAIRWISE_SCHEMA_PATH = path.join(
  PROJECT_ROOT,
  "Docs/evaluation_v2/LLM_JUDGE_V3_PAIRWISE_RESPONSE_SCHEMA_DRY_RUN.json",
);

const DEFAULT_CASES = [
  "A-G02",
  "A-G13",
  "S-T09",
  "S-T14",
  "S-T15",
  "A-G03",
  "A-C02",
  "A-G11",
  "A-G14",
  "A-S04",
  "A-S08",
  "S-T12",
  "S-T13",
  "A-B01",
  "S-T01",
];

function parseArgs(argv) {
  const args = {
    datasetId: DEFAULT_DATASET_ID,
    outputDir: DEFAULT_OUTPUT_DIR,
    rawOutputDir: DEFAULT_RAW_OUTPUT_DIR,
    cases: [...DEFAULT_CASES],
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--dataset") args.datasetId = next, i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else if (arg === "--raw-output-dir") args.rawOutputDir = path.resolve(next), i += 1;
    else if (arg === "--cases") args.cases = splitList(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  const datasetStem = safeFileStem(args.datasetId);
  return {
    ...args,
    promptQueueDir: path.join(args.outputDir, "prompt_queue"),
    manifestPath: path.join(args.outputDir, `pairwise_prompt_queue_manifest__${datasetStem}.jsonl`),
    reportJsonPath: path.join(args.outputDir, `pairwise_prompt_queue_report__${datasetStem}.json`),
    reportMdPath: path.join(args.outputDir, `pairwise_prompt_queue_report__${datasetStem}.md`),
  };
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function safeFileStem(value) {
  return String(value).replace(/[^A-Za-z0-9_.-]+/g, "_");
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

async function maybeReadJson(filePath) {
  try {
    return await readJson(filePath);
  } catch {
    return null;
  }
}

function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}

async function sha256File(filePath) {
  return sha256Text(await readText(filePath));
}

function renderJsonBlock(value) {
  return `\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``;
}

function rowCountBucket(rowCount) {
  if (!Number.isFinite(rowCount)) return "unknown";
  return rowCount <= 20 ? "<=20" : ">20";
}

function stripModeFields(value) {
  if (Array.isArray(value)) return value.map(stripModeFields);
  if (value && typeof value === "object") {
    const stripped = {};
    for (const [key, child] of Object.entries(value)) {
      if ([
        "ai_summary_method",
        "expected_ai_summary_method",
        "observed_ai_summary_method",
        "ai_summary_method_warning",
      ].includes(key)) continue;
      stripped[key] = stripModeFields(child);
    }
    return stripped;
  }
  return value;
}

function buildCandidate(label, judgeInput) {
  return {
    candidate_label: label,
    explanation: {
      raw_text: judgeInput.explanation?.raw_text ?? "",
      structured_payload: stripModeFields(judgeInput.explanation?.structured_payload ?? {}),
    },
    generator_context_summary: {
      full_result_row_count: judgeInput.explanation?.structured_payload?.full_result_row_count ?? null,
      included_row_count: judgeInput.explanation?.structured_payload?.included_row_count ?? null,
      small_result_threshold: judgeInput.explanation?.structured_payload?.small_result_threshold ?? null,
      small_result_full_rows_applied: judgeInput.explanation?.structured_payload?.small_result_full_rows_applied ?? null,
      dataset_row_breakdown: judgeInput.explanation?.structured_payload?.dataset_row_breakdown ?? [],
      degraded: judgeInput.explanation?.structured_payload?.degraded ?? null,
    },
  };
}

function getCandidateInputs({ orderVariant, baselineInput, taskAwareInput }) {
  if (orderVariant === "AB") {
    return {
      A: buildCandidate("A", baselineInput),
      B: buildCandidate("B", taskAwareInput),
      hidden_mode_mapping: {
        A: "baseline_first_20_rows",
        B: "task_aware_data_summarization",
      },
    };
  }
  return {
    A: buildCandidate("A", taskAwareInput),
    B: buildCandidate("B", baselineInput),
    hidden_mode_mapping: {
      A: "task_aware_data_summarization",
      B: "baseline_first_20_rows",
    },
  };
}

async function loadDerivedStatEvidence(datasetId, taskId) {
  const artifactPath = path.join(
    DERIVED_STAT_DIR,
    datasetId,
    `${datasetId}__${taskId}__derived_stats.json`,
  );
  const artifact = await maybeReadJson(artifactPath);
  if (!artifact) return null;
  return {
    artifact_path: toRepoPath(artifactPath),
    artifact_sha256: await sha256File(artifactPath),
    stat_family: artifact.stat_family,
    coefficient_method: artifact.coefficient_method,
    x_column: artifact.x_column,
    y_column: artifact.y_column,
    entity_column: artifact.entity_column,
    source_full_query_artifact: artifact.source_full_query_artifact,
    derived_stats: artifact.derived_stats,
    judge_usage_note: artifact.judge_usage_note,
  };
}

function buildPairwiseContext({
  pairwiseRecordId,
  datasetId,
  taskId,
  orderVariant,
  baselineInput,
  taskAwareInput,
  candidates,
  derivedStatEvidence,
}) {
  const rowCount = baselineInput.evidence_access?.full_result_row_count
    ?? taskAwareInput.evidence_access?.full_result_row_count
    ?? null;

  return {
    schema_version: "pairwise_judge_v3_dry_run_input_v1",
    pairwise_record_id: pairwiseRecordId,
    dataset_id: datasetId,
    task_id: taskId,
    order_variant: orderVariant,
    dry_run_mode: "single_review",
    task_context: baselineInput.task_context,
    schema_context: baselineInput.schema_context,
    evaluation_requirements: baselineInput.evaluation_requirements,
    row_count_context: {
      full_result_row_count: rowCount,
      row_count_bucket: rowCountBucket(rowCount),
      small_result_threshold: baselineInput.evidence_access?.small_result_row_threshold ?? 20,
      rule: rowCount <= 20
        ? "Both modes should be treated as having complete row coverage because rows[:20] covers the full result."
        : "Baseline may have generated from rows[:20], while task-aware may have used full-result-aware summarization; compare both explanations against the supplied full evidence.",
    },
    evidence_access_summary: {
      full_query_artifacts: baselineInput.evidence_access?.full_query_artifacts ?? [],
      evidence_access_mode: baselineInput.evidence_access?.evidence_access_mode ?? null,
      retrieval_log_path: baselineInput.evidence_access?.retrieval_log_path ?? null,
      retrieval_coverage_status: baselineInput.evidence_access?.retrieval_coverage_status ?? null,
      full_access_available: baselineInput.evidence_access?.full_access_available ?? null,
      deterministic_scan_scope: baselineInput.evidence_access?.deterministic_scan_scope ?? null,
      deterministic_scan_row_count_by_dataset:
        baselineInput.evidence_access?.deterministic_scan_row_count_by_dataset ?? null,
    },
    deterministic_derived_stat_evidence: derivedStatEvidence,
    candidate_A: candidates.A,
    candidate_B: candidates.B,
    judge_instruction_boundary: {
      hidden_mode_names: true,
      do_not_use_absolute_judge_scores: true,
      do_not_assume_longer_is_better: true,
      compare_metric_by_metric: true,
      explain_ties_metric_by_metric: true,
    },
  };
}

async function writePromptPacket({ args, sequenceNumber, pairwisePromptText, schemaText, context }) {
  const promptText = [
    "# Pairwise Judge V3 Dry-Run Prompt Packet",
    "",
    "## Pairwise Judge Prompt",
    "",
    pairwisePromptText,
    "",
    "## Response Schema",
    "",
    "Return JSON that conforms to this schema:",
    "",
    `\`\`\`json\n${schemaText.trim()}\n\`\`\``,
    "",
    "## Pairwise Judge Input",
    "",
    renderJsonBlock(context),
    "",
    "Return only the JSON response. Do not include Markdown fences.",
  ].join("\n");

  const fileName = `${String(sequenceNumber).padStart(3, "0")}__${safeFileStem(context.pairwise_record_id)}.md`;
  const promptPath = path.join(args.promptQueueDir, fileName);
  await writeFile(promptPath, `${promptText}\n`, "utf8");
  return {
    promptPath,
    promptSha256: sha256Text(`${promptText}\n`),
  };
}

function buildReport({ args, manifestRecords }) {
  const taskIds = [...new Set(manifestRecords.map((record) => record.task_id))];
  return {
    artifact_type: "llm_judge_v3_pairwise_dry_run_queue_report_v1",
    generated_at: new Date().toISOString(),
    dry_run_mode: "single_review",
    dataset_id: args.datasetId,
    task_count: taskIds.length,
    prompt_count: manifestRecords.length,
    order_variants: ["AB", "BA"],
    prompt_queue_dir: toRepoPath(args.promptQueueDir),
    expected_raw_outputs_dir: toRepoPath(args.rawOutputDir),
    manifest_path: toRepoPath(args.manifestPath),
    cases: taskIds,
  };
}

function renderReportMd(report) {
  return [
    "# Pairwise Dry-Run Queue Report",
    "",
    `Dataset: ${report.dataset_id}`,
    `Dry-run mode: ${report.dry_run_mode}`,
    `Tasks: ${report.task_count}`,
    `Prompt packets: ${report.prompt_count}`,
    `Prompt queue: ${report.prompt_queue_dir}`,
    `Expected raw outputs: ${report.expected_raw_outputs_dir}`,
    "",
    "## Cases",
    "",
    ...report.cases.map((taskId) => `- ${taskId}`),
    "",
  ].join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await mkdir(args.promptQueueDir, { recursive: true });
  await mkdir(args.rawOutputDir, { recursive: true });

  const pairwisePromptText = await readText(PAIRWISE_PROMPT_PATH);
  const schemaText = await readText(PAIRWISE_SCHEMA_PATH);
  JSON.parse(schemaText);

  const manifestRecords = [];
  let sequenceNumber = 0;
  for (const taskId of args.cases) {
    const baselinePath = path.join(JUDGE_INPUT_DIR, `${args.datasetId}__${taskId}__baseline_first_20_rows.json`);
    const taskAwarePath = path.join(JUDGE_INPUT_DIR, `${args.datasetId}__${taskId}__task_aware_data_summarization.json`);
    const baselineInput = await readJson(baselinePath);
    const taskAwareInput = await readJson(taskAwarePath);
    const derivedStatEvidence = await loadDerivedStatEvidence(args.datasetId, taskId);

    for (const orderVariant of ["AB", "BA"]) {
      sequenceNumber += 1;
      const pairwiseRecordId = `${args.datasetId}__${taskId}__pairwise_${orderVariant}`;
      const candidates = getCandidateInputs({ orderVariant, baselineInput, taskAwareInput });
      const context = buildPairwiseContext({
        pairwiseRecordId,
        datasetId: args.datasetId,
        taskId,
        orderVariant,
        baselineInput,
        taskAwareInput,
        candidates,
        derivedStatEvidence,
      });
      const { promptPath, promptSha256 } = await writePromptPacket({
        args,
        sequenceNumber,
        pairwisePromptText,
        schemaText,
        context,
      });
      const rawOutputPath = path.join(args.rawOutputDir, `${safeFileStem(pairwiseRecordId)}.json`);
      manifestRecords.push({
        manifest_version: "llm_judge_v3_pairwise_dry_run_queue_manifest_v1",
        dry_run_mode: "single_review",
        dataset_id: args.datasetId,
        task_id: taskId,
        pairwise_record_id: pairwiseRecordId,
        order_variant: orderVariant,
        status: "prompt_queue_ready",
        prompt_packet_path: toRepoPath(promptPath),
        prompt_packet_sha256: promptSha256,
        expected_raw_output_path: toRepoPath(rawOutputPath),
        hidden_mode_mapping: candidates.hidden_mode_mapping,
        derived_stat_evidence_available: derivedStatEvidence !== null,
      });
    }
  }

  await writeFile(
    args.manifestPath,
    `${manifestRecords.map((record) => JSON.stringify(record)).join("\n")}\n`,
    "utf8",
  );

  const report = buildReport({ args, manifestRecords });
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderReportMd(report), "utf8");

  console.log(`[pairwise-queue] dataset=${args.datasetId} tasks=${report.task_count} prompts=${report.prompt_count}`);
  console.log(`queue: ${report.prompt_queue_dir}`);
  console.log(`raw_outputs: ${report.expected_raw_outputs_dir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
