import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUN_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs/full_208");

const DEFAULT_DATASET_ID = "SAMPLE_UCI_POR";
const DEFAULT_EXPECTED_COUNT = 30;
const DEFAULT_QUEUE_MANIFEST_PATH = path.join(
  RUN_ROOT,
  "phase9_single_review_dry_run/pairwise_judge_queue/pairwise_prompt_queue_manifest__SAMPLE_UCI_POR.jsonl",
);
const DEFAULT_OUTPUT_DIR = path.join(
  RUN_ROOT,
  "phase9_single_review_dry_run/pairwise_judge_invocation",
);

const REQUIRED_FIELDS = [
  "schema_version",
  "pairwise_record_id",
  "dataset_id",
  "task_id",
  "order_variant",
  "scoring_status",
  "winner",
  "winner_confidence",
  "difference_magnitude",
  "dimension_winners",
  "metric_comparison",
  "coverage_comparison",
  "specificity_comparison",
  "decisive_evidence",
  "tie_justification",
  "absolute_rerun_flags",
  "requires_absolute_rerun",
  "reviewer_notes",
];

const METRICS = [
  "faithfulness",
  "numerical_correctness",
  "completeness",
  "task_relevance",
  "actionability",
  "clarity",
  "safety_fairness",
];

function parseArgs(argv) {
  const args = {
    mode: "import",
    datasetId: DEFAULT_DATASET_ID,
    expectedCount: DEFAULT_EXPECTED_COUNT,
    queueManifestPath: DEFAULT_QUEUE_MANIFEST_PATH,
    outputDir: DEFAULT_OUTPUT_DIR,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--mode") args.mode = next, i += 1;
    else if (arg === "--dataset") args.datasetId = next, i += 1;
    else if (arg === "--expected-count") args.expectedCount = Number(next), i += 1;
    else if (arg === "--queue-manifest") args.queueManifestPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
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
    rawOutputsDir: path.join(args.outputDir, "raw_outputs"),
    validatedOutputsDir: path.join(args.outputDir, "validated_outputs"),
    statusManifestPath: path.join(args.outputDir, `pairwise_record_execution_status__${datasetStem}.jsonl`),
    validatedManifestPath: path.join(args.outputDir, `pairwise_validated_outputs__${datasetStem}.jsonl`),
    reportJsonPath: path.join(args.outputDir, `pairwise_invocation_report__${datasetStem}.json`),
    reportMdPath: path.join(args.outputDir, `pairwise_invocation_report__${datasetStem}.md`),
  };
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

async function readJsonl(filePath) {
  return (await readText(filePath))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

async function maybeReadJson(filePath) {
  try {
    return JSON.parse(await readText(filePath));
  } catch (error) {
    return { __read_error: error.message };
  }
}

function validatePairwiseOutput(output, expected) {
  const errors = [];
  if (output.__read_error) {
    errors.push(`raw_output_parse_error: ${output.__read_error}`);
    return errors;
  }

  for (const field of REQUIRED_FIELDS) {
    if (!(field in output)) errors.push(`missing_required_field:${field}`);
  }

  if (output.schema_version !== "pairwise_judge_v3_dry_run_schema_v1") {
    errors.push("schema_version_mismatch");
  }
  if (output.pairwise_record_id !== expected.pairwise_record_id) {
    errors.push("pairwise_record_id_mismatch");
  }
  if (output.dataset_id !== expected.dataset_id) errors.push("dataset_id_mismatch");
  if (output.task_id !== expected.task_id) errors.push("task_id_mismatch");
  if (output.order_variant !== expected.order_variant) errors.push("order_variant_mismatch");
  if (!["judged", "invalid"].includes(output.scoring_status)) errors.push("invalid_scoring_status");
  if (!["A", "B", "tie"].includes(output.winner)) errors.push("invalid_winner");
  if (!["low", "medium", "high"].includes(output.winner_confidence)) {
    errors.push("invalid_winner_confidence");
  }
  if (!["none", "small", "moderate", "large"].includes(output.difference_magnitude)) {
    errors.push("invalid_difference_magnitude");
  }
  if (output.winner === "tie" && output.difference_magnitude !== "none") {
    errors.push("tie_must_have_none_difference_magnitude");
  }

  for (const metric of METRICS) {
    const dimensionWinner = output.dimension_winners?.[metric];
    if (!["A", "B", "tie", "not_applicable"].includes(dimensionWinner)) {
      errors.push(`invalid_dimension_winner:${metric}`);
    }
    const metricComparison = output.metric_comparison?.[metric];
    if (!metricComparison || typeof metricComparison !== "object") {
      errors.push(`missing_metric_comparison:${metric}`);
    } else {
      if (!["A", "B", "tie", "not_applicable"].includes(metricComparison.winner)) {
        errors.push(`invalid_metric_comparison_winner:${metric}`);
      }
      if (typeof metricComparison.reason !== "string" || metricComparison.reason.trim() === "") {
        errors.push(`missing_metric_reason:${metric}`);
      }
      if (!Array.isArray(metricComparison.evidence_refs)) {
        errors.push(`metric_evidence_refs_not_array:${metric}`);
      }
    }
  }

  if (!Array.isArray(output.decisive_evidence)) errors.push("decisive_evidence_not_array");
  if (!Array.isArray(output.absolute_rerun_flags)) errors.push("absolute_rerun_flags_not_array");
  if (typeof output.requires_absolute_rerun !== "boolean") errors.push("requires_absolute_rerun_not_boolean");
  if (typeof output.reviewer_notes !== "string") errors.push("reviewer_notes_not_string");

  return errors;
}

async function prepare(args) {
  await mkdir(args.outputDir, { recursive: true });
  await mkdir(args.rawOutputsDir, { recursive: true });
  await mkdir(args.validatedOutputsDir, { recursive: true });
  const queue = (await readJsonl(args.queueManifestPath)).filter((entry) => entry.dataset_id === args.datasetId);
  const report = {
    artifact_type: "llm_judge_v3_pairwise_dry_run_invocation_prepare_report_v1",
    generated_at: new Date().toISOString(),
    dataset_id: args.datasetId,
    expected_count: args.expectedCount,
    queue_count: queue.length,
    raw_outputs_dir: toRepoPath(args.rawOutputsDir),
    status: queue.length === args.expectedCount ? "PASS" : "FAIL",
  };
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderReportMd(report), "utf8");
  console.log(`[pairwise-invocation] mode=prepare dataset=${args.datasetId} status=${report.status} queue=${queue.length}`);
  console.log(`raw_outputs: ${report.raw_outputs_dir}`);
}

async function importOutputs(args) {
  await mkdir(args.validatedOutputsDir, { recursive: true });
  const queue = (await readJsonl(args.queueManifestPath)).filter((entry) => entry.dataset_id === args.datasetId);
  const statusRecords = [];
  const validatedRecords = [];
  const issues = [];

  if (queue.length !== args.expectedCount) {
    issues.push(`queue_count_mismatch expected=${args.expectedCount} observed=${queue.length}`);
  }

  for (const entry of queue) {
    const rawPath = repoPathToAbsolute(entry.expected_raw_output_path);
    const output = await maybeReadJson(rawPath);
    const errors = validatePairwiseOutput(output, entry);
    const status = errors.length === 0 ? "validated" : "invalid";
    const validatedPath = path.join(args.validatedOutputsDir, `${safeFileStem(entry.pairwise_record_id)}.json`);
    if (status === "validated") {
      await writeFile(validatedPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
      validatedRecords.push({
        pairwise_record_id: entry.pairwise_record_id,
        dataset_id: entry.dataset_id,
        task_id: entry.task_id,
        order_variant: entry.order_variant,
        winner: output.winner,
        difference_magnitude: output.difference_magnitude,
        requires_absolute_rerun: output.requires_absolute_rerun,
        validated_output_path: toRepoPath(validatedPath),
      });
    } else {
      issues.push(`${entry.pairwise_record_id}: ${errors.join(",")}`);
    }

    statusRecords.push({
      pairwise_record_id: entry.pairwise_record_id,
      dataset_id: entry.dataset_id,
      task_id: entry.task_id,
      order_variant: entry.order_variant,
      status,
      raw_output_path: entry.expected_raw_output_path,
      validation_errors: errors,
    });
  }

  const report = {
    artifact_type: "llm_judge_v3_pairwise_dry_run_invocation_import_report_v1",
    generated_at: new Date().toISOString(),
    dataset_id: args.datasetId,
    expected_count: args.expectedCount,
    queue_count: queue.length,
    validated_count: validatedRecords.length,
    invalid_count: statusRecords.filter((record) => record.status === "invalid").length,
    missing_or_invalid: statusRecords
      .filter((record) => record.status === "invalid")
      .map((record) => ({
        pairwise_record_id: record.pairwise_record_id,
        validation_errors: record.validation_errors,
      })),
    status: queue.length === args.expectedCount && validatedRecords.length === args.expectedCount
      ? "PASS"
      : "FAIL",
  };

  await writeFile(args.statusManifestPath, `${statusRecords.map((record) => JSON.stringify(record)).join("\n")}\n`, "utf8");
  await writeFile(args.validatedManifestPath, `${validatedRecords.map((record) => JSON.stringify(record)).join("\n")}\n`, "utf8");
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderReportMd(report), "utf8");

  console.log(
    `[pairwise-invocation] mode=import dataset=${args.datasetId} status=${report.status} validated=${report.validated_count}/${args.expectedCount} invalid=${report.invalid_count}`,
  );
  if (issues.length > 0) {
    console.log("issues:");
    for (const issue of issues.slice(0, 20)) console.log(`- ${issue}`);
  }
}

function renderReportMd(report) {
  const lines = [
    "# Pairwise Dry-Run Invocation Report",
    "",
    `Dataset: ${report.dataset_id}`,
    `Status: ${report.status}`,
    `Expected count: ${report.expected_count}`,
    `Queue count: ${report.queue_count}`,
  ];
  if ("validated_count" in report) {
    lines.push(`Validated count: ${report.validated_count}`);
    lines.push(`Invalid count: ${report.invalid_count}`);
  }
  if (report.raw_outputs_dir) lines.push(`Raw outputs: ${report.raw_outputs_dir}`);
  if (Array.isArray(report.missing_or_invalid) && report.missing_or_invalid.length > 0) {
    lines.push("");
    lines.push("## Missing Or Invalid");
    lines.push("");
    for (const item of report.missing_or_invalid) {
      lines.push(`- ${item.pairwise_record_id}: ${item.validation_errors.join(", ")}`);
    }
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.mode === "prepare") await prepare(args);
  else await importOutputs(args);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
