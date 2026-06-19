import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUN_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs/full_208");

const DEFAULT_DATASET_ID = "SAMPLE_UCI_POR";
const DEFAULT_EVIDENCE_DIR = path.join(RUN_ROOT, "phase8_evidence_sql");
const DEFAULT_JUDGE_INPUT_MANIFEST_PATH = path.join(RUN_ROOT, "phase8_judge_inputs/judge_input_manifest.jsonl");
const DEFAULT_OUTPUT_DIR = path.join(RUN_ROOT, "phase9_single_review_dry_run/derived_stat_evidence");
const TASK_REGISTRY_PATH = path.join(PROJECT_ROOT, "Backend/src/config/taskRegistry.json");

function parseArgs(argv) {
  const args = {
    datasetId: DEFAULT_DATASET_ID,
    evidenceDir: DEFAULT_EVIDENCE_DIR,
    judgeInputManifestPath: DEFAULT_JUDGE_INPUT_MANIFEST_PATH,
    outputDir: DEFAULT_OUTPUT_DIR,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--dataset") args.datasetId = next, i += 1;
    else if (arg === "--evidence-dir") args.evidenceDir = path.resolve(next), i += 1;
    else if (arg === "--judge-input-manifest") args.judgeInputManifestPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  const datasetStem = safeFileStem(args.datasetId);
  return {
    ...args,
    fullQueryArtifactsDir: path.join(args.evidenceDir, args.datasetId, "full_query_artifacts"),
    datasetOutputDir: path.join(args.outputDir, args.datasetId),
    manifestPath: path.join(args.outputDir, `derived_stat_manifest__${datasetStem}.jsonl`),
    reportJsonPath: path.join(args.outputDir, `derived_stat_report__${datasetStem}.json`),
    reportMdPath: path.join(args.outputDir, `derived_stat_report__${datasetStem}.md`),
  };
}

function safeFileStem(value) {
  return String(value).replace(/[^A-Za-z0-9_.-]+/g, "_");
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, "/");
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

function sha256Json(value) {
  return sha256Text(JSON.stringify(canonicalize(value)));
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
    );
  }
  return value;
}

function parseNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function round(value, digits = 4) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function getDatasets(evidenceArtifact) {
  return evidenceArtifact.response_body?.datasets
    ?? evidenceArtifact.full_response_body?.datasets
    ?? {};
}

function variance(values) {
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + ((value - mean) ** 2), 0);
}

function classifyDirection(coefficient) {
  if (typeof coefficient !== "number") return "unknown";
  if (coefficient > 0) return "positive";
  if (coefficient < 0) return "negative";
  return "none";
}

function classifyStrength(coefficient) {
  if (typeof coefficient !== "number") return null;
  const abs = Math.abs(coefficient);
  if (abs < 0.1) return "negligible";
  if (abs < 0.3) return "weak";
  if (abs < 0.5) return "moderate";
  if (abs < 0.7) return "strong";
  return "very_strong";
}

function computePearson(rows, { xColumn, yColumn, entityColumn }) {
  const warnings = [];
  const validPairs = [];
  let invalidX = 0;
  let invalidY = 0;

  for (const [index, row] of rows.entries()) {
    if (!row || typeof row !== "object") {
      warnings.push(`row_${index}_not_object`);
      continue;
    }
    const x = parseNumber(row[xColumn]);
    const y = parseNumber(row[yColumn]);
    if (x === null) {
      invalidX += 1;
      continue;
    }
    if (y === null) {
      invalidY += 1;
      continue;
    }
    validPairs.push({
      row_index: index,
      entity_id: entityColumn ? row[entityColumn] ?? null : null,
      x,
      y,
    });
  }

  if (invalidX > 0) warnings.push(`Skipped ${invalidX} rows with invalid ${xColumn}.`);
  if (invalidY > 0) warnings.push(`Skipped ${invalidY} rows with invalid ${yColumn}.`);

  if (validPairs.length === 0) {
    return {
      status: "skipped",
      reason: "no_valid_numeric_pairs",
      row_count: rows.length,
      valid_pair_count: 0,
      invalid_x_count: invalidX,
      invalid_y_count: invalidY,
      warnings,
    };
  }

  const xValues = validPairs.map((item) => item.x);
  const yValues = validPairs.map((item) => item.y);
  const xVariance = variance(xValues);
  const yVariance = variance(yValues);

  if (xVariance === 0 || yVariance === 0) {
    warnings.push(`Cannot derive Pearson coefficient because ${xColumn} or ${yColumn} has zero variance.`);
    return {
      status: "skipped",
      reason: "zero_variance",
      row_count: rows.length,
      valid_pair_count: validPairs.length,
      invalid_x_count: invalidX,
      invalid_y_count: invalidY,
      x_variance: xVariance,
      y_variance: yVariance,
      warnings,
    };
  }

  const xMean = xValues.reduce((sum, value) => sum + value, 0) / xValues.length;
  const yMean = yValues.reduce((sum, value) => sum + value, 0) / yValues.length;
  const covariance = validPairs.reduce(
    (sum, item) => sum + ((item.x - xMean) * (item.y - yMean)),
    0,
  );
  const pearson = covariance / ((xVariance * yVariance) ** 0.5);

  return {
    status: "pass",
    reason: null,
    row_count: rows.length,
    valid_pair_count: validPairs.length,
    invalid_x_count: invalidX,
    invalid_y_count: invalidY,
    x_mean: round(xMean, 6),
    y_mean: round(yMean, 6),
    x_variance: round(xVariance, 10),
    y_variance: round(yVariance, 10),
    covariance: round(covariance, 10),
    pearson_r: pearson,
    pearson_r_rounded_4: round(pearson, 4),
    direction: classifyDirection(pearson),
    strength: classifyStrength(pearson),
    coefficient_source: "deterministic_recompute_from_full_query_rows",
    formula: "sum((x - mean_x) * (y - mean_y)) / sqrt(sum((x - mean_x)^2) * sum((y - mean_y)^2))",
    warnings,
  };
}

async function getCorrelationTasks({ taskRegistry, args }) {
  const judgeInputManifest = await readJsonl(args.judgeInputManifestPath);
  const candidates = judgeInputManifest
    .filter((record) => record.dataset_id === args.datasetId)
    .filter((record) => record.explanation_mode === "baseline_first_20_rows")
    .map((record) => record.judge_input_path)
    .filter(Boolean);

  const tasks = [];
  for (const repoPath of candidates) {
    const judgeInput = await readJson(path.join(PROJECT_ROOT, ...repoPath.split("/")));
    if (judgeInput.task_context?.ai_summary_type !== "correlation_evidence") continue;
    const registryTask = taskRegistry.find((task) => task.taskId === judgeInput.task_id) ?? {};
    tasks.push({
      task_id: judgeInput.task_id,
      task_name: judgeInput.task_context?.task_name ?? registryTask.taskName ?? null,
      ai_summary_type: judgeInput.task_context?.ai_summary_type,
      x_column: registryTask.aiXColumn ?? registryTask.visualizationConfig?.x_field ?? inferColumn(judgeInput, "x"),
      y_column: registryTask.aiYColumn ?? registryTask.visualizationConfig?.y_field ?? inferColumn(judgeInput, "y"),
      entity_column: registryTask.aiEntityColumn ?? inferEntityColumn(judgeInput),
      source_judge_input_path: repoPath,
    });
  }

  return tasks.sort((a, b) => a.task_id.localeCompare(b.task_id));
}

function inferColumn(judgeInput, axis) {
  const configKey = axis === "x" ? "x_field" : "y_field";
  const roleKey = axis === "x" ? "x" : "y";
  const fromPayload = judgeInput.explanation?.structured_payload?.request_payload?.visualization_config?.[configKey];
  if (fromPayload) return fromPayload;
  const requiredColumns = judgeInput.schema_context?.output_schema?.required_columns ?? [];
  if (axis === "y") return requiredColumns.find((column) => /score|grade|performance/i.test(column)) ?? null;
  return requiredColumns.find((column) => !/student|enrollment|score|grade|performance/i.test(column)) ?? null;
}

function inferEntityColumn(judgeInput) {
  const requiredColumns = judgeInput.schema_context?.output_schema?.required_columns ?? [];
  return requiredColumns.find((column) => /student|entity|id/i.test(column)) ?? null;
}

async function buildArtifact({ args, task }) {
  const fullQueryPath = path.join(args.fullQueryArtifactsDir, `${args.datasetId}__${task.task_id}.json`);
  const text = await readText(fullQueryPath);
  const evidenceArtifact = JSON.parse(text);
  const datasets = getDatasets(evidenceArtifact);
  const datasetResults = Object.entries(datasets).map(([datasetLabel, rows]) => {
    if (!Array.isArray(rows)) {
      return {
        dataset_label: datasetLabel,
        status: "skipped",
        reason: "dataset_rows_not_array",
        row_count: null,
      };
    }
    return {
      dataset_label: datasetLabel,
      ...computePearson(rows, {
        xColumn: task.x_column,
        yColumn: task.y_column,
        entityColumn: task.entity_column,
      }),
    };
  });

  const artifact = {
    artifact_type: "llm_judge_v3_deterministic_derived_stat_evidence_v1",
    generated_at: new Date().toISOString(),
    dry_run_mode: "single_review",
    dataset_id: args.datasetId,
    task_id: task.task_id,
    task_name: task.task_name,
    ai_summary_type: task.ai_summary_type,
    stat_family: "correlation",
    coefficient_method: "pearson",
    x_column: task.x_column,
    y_column: task.y_column,
    entity_column: task.entity_column,
    source_full_query_artifact: {
      path: toRepoPath(fullQueryPath),
      sha256: sha256Text(text),
      evidence_id: evidenceArtifact.evidence_id ?? null,
    },
    source_judge_input_path: task.source_judge_input_path ?? null,
    derived_stats: datasetResults,
    judge_usage_note:
      "Use this artifact as deterministic support for correlation coefficient claims. It proves derived Pearson r from all valid x/y pairs in the full query result; it does not prove causality or statistical significance.",
  };

  artifact.artifact_sha256 = sha256Json(artifact);
  const outputPath = path.join(args.datasetOutputDir, `${args.datasetId}__${task.task_id}__derived_stats.json`);
  await writeFile(outputPath, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");

  return {
    dataset_id: args.datasetId,
    task_id: task.task_id,
    status: datasetResults.some((item) => item.status === "pass") ? "pass" : "skipped",
    derived_stat_artifact_path: toRepoPath(outputPath),
    derived_stat_artifact_sha256: artifact.artifact_sha256,
    source_full_query_artifact_path: artifact.source_full_query_artifact.path,
    x_column: task.x_column,
    y_column: task.y_column,
    entity_column: task.entity_column,
    dataset_results: datasetResults.map((item) => ({
      dataset_label: item.dataset_label,
      status: item.status,
      row_count: item.row_count,
      valid_pair_count: item.valid_pair_count ?? 0,
      pearson_r_rounded_4: item.pearson_r_rounded_4 ?? null,
      direction: item.direction ?? null,
      strength: item.strength ?? null,
      reason: item.reason ?? null,
    })),
  };
}

function buildReport({ args, manifestRecords }) {
  const passCount = manifestRecords.filter((item) => item.status === "pass").length;
  const skippedCount = manifestRecords.filter((item) => item.status !== "pass").length;
  const report = {
    artifact_type: "llm_judge_v3_derived_stat_evidence_report_v1",
    generated_at: new Date().toISOString(),
    dry_run_mode: "single_review",
    dataset_id: args.datasetId,
    task_count: manifestRecords.length,
    pass_count: passCount,
    skipped_count: skippedCount,
    manifest_path: toRepoPath(args.manifestPath),
    source_judge_input_manifest_path: toRepoPath(args.judgeInputManifestPath),
    derived_stat_artifacts_dir: toRepoPath(args.datasetOutputDir),
    records: manifestRecords,
  };
  report.report_sha256 = sha256Json(report);
  return report;
}

function renderReportMd(report) {
  const lines = [
    "# Derived-Stat Evidence Report",
    "",
    `Dataset: ${report.dataset_id}`,
    `Dry-run mode: ${report.dry_run_mode}`,
    `Tasks processed: ${report.task_count}`,
    `Pass: ${report.pass_count}`,
    `Skipped: ${report.skipped_count}`,
    "",
    "| Task | Status | x | y | Dataset | Rows | Valid pairs | Pearson r | Direction | Strength |",
    "|---|---:|---|---|---|---:|---:|---:|---|---|",
  ];

  for (const record of report.records) {
    for (const dataset of record.dataset_results) {
      lines.push([
        record.task_id,
        record.status,
        record.x_column,
        record.y_column,
        dataset.dataset_label,
        dataset.row_count ?? "",
        dataset.valid_pair_count ?? "",
        dataset.pearson_r_rounded_4 ?? "",
        dataset.direction ?? "",
        dataset.strength ?? "",
      ].join(" | ").replace(/^/, "| ").replace(/$/, " |"));
    }
  }

  lines.push("");
  lines.push("Use these artifacts as deterministic support only. They do not provide p-values and must not be read as causal evidence.");
  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await mkdir(args.datasetOutputDir, { recursive: true });
  await mkdir(args.outputDir, { recursive: true });

  const registry = await readJson(TASK_REGISTRY_PATH);
  const tasks = await getCorrelationTasks({ taskRegistry: registry, args });
  const manifestRecords = [];

  for (const task of tasks) {
    if (!task.x_column || !task.y_column) {
      manifestRecords.push({
        dataset_id: args.datasetId,
        task_id: task.task_id,
        status: "skipped",
        reason: "missing_x_or_y_column_config",
        x_column: task.x_column,
        y_column: task.y_column,
      });
      continue;
    }
    manifestRecords.push(await buildArtifact({ args, task }));
  }

  const manifestText = manifestRecords.map((record) => JSON.stringify(record)).join("\n") + "\n";
  await writeFile(args.manifestPath, manifestText, "utf8");

  const report = buildReport({ args, manifestRecords });
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderReportMd(report), "utf8");

  console.log(
    `[derived-stat] dataset=${args.datasetId} tasks=${report.task_count} pass=${report.pass_count} skipped=${report.skipped_count}`,
  );
  console.log(`report: ${toRepoPath(args.reportMdPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
