import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");

function parseArgs(argv) {
  const args = {
    includeStatuses: ["executable"],
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--paired-comparison") args.pairedComparisonPath = path.resolve(next), i += 1;
    else if (arg === "--availability-log") args.availabilityLogPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else if (arg === "--dataset") args.datasetId = next, i += 1;
    else if (arg === "--include-statuses") args.includeStatuses = splitList(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  for (const key of ["pairedComparisonPath", "availabilityLogPath", "outputDir", "datasetId"]) {
    if (!args[key]) throw new Error(`Missing required argument --${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`);
  }
  if (!Array.isArray(args.includeStatuses) || args.includeStatuses.length === 0) {
    throw new Error("--include-statuses must contain at least one status");
  }
  return args;
}

function splitList(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function readText(filePath) {
  return (await readFile(filePath, "utf8")).replace(/^\uFEFF/, "");
}

async function readJson(filePath) {
  return JSON.parse(await readText(filePath));
}

function toRepoPath(filePath) {
  const rel = path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, "/");
  return rel.startsWith("..") ? filePath : rel;
}

function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}

function countBy(items, keyFn) {
  const result = {};
  for (const item of items) {
    const key = keyFn(item);
    result[key] = (result[key] ?? 0) + 1;
  }
  return result;
}

function average(values) {
  const nums = values.filter((value) => typeof value === "number" && Number.isFinite(value));
  if (nums.length === 0) return null;
  return Math.round((nums.reduce((sum, value) => sum + value, 0) / nums.length) * 100) / 100;
}

function normalizeValue(value) {
  if (Array.isArray(value)) return value.join(" ");
  if (value == null) return "";
  return String(value);
}

function buildAvailabilityMap(availabilityLog) {
  const rows = Array.isArray(availabilityLog.tasks) ? availabilityLog.tasks : [];
  return new Map(rows.map((task) => [task.taskId, task]));
}

function annotatePair(pair, availabilityByTask) {
  const task = availabilityByTask.get(pair.task_id);
  const availabilityStatus = task?.status ?? "missing_from_availability_log";
  return {
    ...pair,
    availability_gate: {
      task_id: pair.task_id,
      source_status: availabilityStatus,
      executable: task?.executable === true,
      included_in_main_comparison: false,
      disabled_reason: task?.disabled_reason ?? (task ? null : "Task was not returned by the availability endpoint."),
      reason_codes: Array.isArray(task?.availability_reason_codes) ? task.availability_reason_codes : [],
      missing_capabilities: {
        required_all: normalizeValue(task?.missing_capabilities?.required_all),
        required_any: normalizeValue(task?.missing_capabilities?.required_any),
        optional_enrichments: normalizeValue(task?.missing_capabilities?.optional_enrichments),
      },
      confidence: task?.confidence ?? null,
      confidence_reason: task?.confidence_reason ?? null,
      decision: task?.decision_explanation ?? null,
    },
  };
}

function summarizePairs(pairs) {
  return {
    pair_count: pairs.length,
    comparable_pair_count: pairs.filter((pair) => pair.comparable === true).length,
    average_delta_task_aware_minus_baseline: average(pairs.map((pair) => pair.delta_task_aware_minus_baseline)),
    winner_counts: countBy(pairs, (pair) => pair.winner ?? "unknown"),
    availability_status_counts: countBy(pairs, (pair) => pair.availability_gate?.source_status ?? "unknown"),
    row_count_bucket_counts: countBy(pairs, (pair) => pair.row_count_bucket ?? "unknown"),
    evidence_access_mode_counts: countBy(pairs, (pair) => pair.evidence_access_mode ?? "unknown"),
  };
}

function compactExcludedPair(pair) {
  return {
    dataset_id: pair.dataset_id,
    task_id: pair.task_id,
    availability_status: pair.availability_gate.source_status,
    executable: pair.availability_gate.executable,
    disabled_reason: pair.availability_gate.disabled_reason,
    reason_codes: pair.availability_gate.reason_codes,
    missing_capabilities: pair.availability_gate.missing_capabilities,
    winner: pair.winner,
    baseline_final_score: pair.baseline_final_score,
    task_aware_final_score: pair.task_aware_final_score,
    delta_task_aware_minus_baseline: pair.delta_task_aware_minus_baseline,
    diagnostic_note: "Excluded from main available-only comparison; retained in full forced-run diagnostic result.",
  };
}

function renderMarkdown(report) {
  const main = report.main_available_only_summary;
  const diag = report.diagnostic_forced_all_summary;
  const excluded = report.excluded_by_availability_summary;
  const lines = [
    "# Availability-Gated Paired Mode Comparison",
    "",
    `- Dataset: ${report.dataset_scope}`,
    `- Generated at: ${report.generated_at}`,
    `- Availability log: \`${report.inputs.availability_log_path}\``,
    `- Availability log SHA-256: \`${report.inputs.availability_log_sha256}\``,
    `- Source paired comparison: \`${report.inputs.paired_comparison_path}\``,
    `- Included statuses for main comparison: ${report.include_statuses.join(", ")}`,
    "",
    "## Main Available-Only Result",
    "",
    `- Pair count: ${main.pair_count}`,
    `- Comparable pair count: ${main.comparable_pair_count}`,
    `- Average delta task-aware minus baseline: ${main.average_delta_task_aware_minus_baseline}`,
    `- Winner counts: ${JSON.stringify(main.winner_counts)}`,
    "",
    "## Diagnostic Full Forced-Run Result",
    "",
    `- Pair count: ${diag.pair_count}`,
    `- Average delta task-aware minus baseline: ${diag.average_delta_task_aware_minus_baseline}`,
    `- Winner counts: ${JSON.stringify(diag.winner_counts)}`,
    `- Availability status counts: ${JSON.stringify(diag.availability_status_counts)}`,
    "",
    "## Excluded From Main Comparison",
    "",
    `- Excluded pair count: ${excluded.excluded_pair_count}`,
    `- Excluded by availability status: ${JSON.stringify(excluded.by_availability_status)}`,
    `- Excluded winner counts: ${JSON.stringify(excluded.by_winner)}`,
    "",
    "| Task | Availability | Winner in diagnostic | Delta | Reason |",
    "| --- | --- | --- | ---: | --- |",
    ...report.excluded_pairs.map((pair) => {
      const reason = String(pair.disabled_reason ?? "").replaceAll("|", "\\|");
      return `| ${pair.task_id} | ${pair.availability_status} | ${pair.winner} | ${pair.delta_task_aware_minus_baseline} | ${reason} |`;
    }),
    "",
    "## Interpretation",
    "",
    "The main result excludes tasks that the task availability endpoint marks as non-executable. The full 52-task forced run is retained as a diagnostic stress test, but it is not the fair user-facing comparison because those tasks would be disabled or unavailable in the chart flow.",
    "",
  ];
  return `${lines.join("\n")}\n`;
}

function renderMainOnlyMarkdown(report) {
  const main = report.main_available_only_summary;
  const lines = [
    "# Main Available-Only Paired Mode Comparison",
    "",
    `- Dataset: ${report.dataset_scope}`,
    `- Generated at: ${report.generated_at}`,
    `- Availability log: \`${report.inputs.availability_log_path}\``,
    `- Included statuses: ${report.include_statuses.join(", ")}`,
    "",
    "## Result",
    "",
    `- Pair count: ${main.pair_count}`,
    `- Comparable pair count: ${main.comparable_pair_count}`,
    `- Average delta task-aware minus baseline: ${main.average_delta_task_aware_minus_baseline}`,
    `- Winner counts: ${JSON.stringify(main.winner_counts)}`,
    "",
    "## Included Executable Tasks",
    "",
    "| Task | Winner | Baseline | Task-Aware | Delta | Rows | Evidence mode |",
    "| --- | --- | ---: | ---: | ---: | ---: | --- |",
    ...report.main_available_only_pairs.map((pair) => [
      `| ${pair.task_id}`,
      pair.winner,
      pair.baseline_final_score,
      pair.task_aware_final_score,
      pair.delta_task_aware_minus_baseline,
      pair.full_result_row_count,
      `${pair.evidence_access_mode} |`,
    ].join(" | ")),
    "",
    "## Interpretation",
    "",
    "This file contains only tasks marked executable by the task availability endpoint. Non-executable partial or insufficient-data tasks are intentionally excluded from this main fair comparison.",
    "",
  ];
  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await mkdir(args.outputDir, { recursive: true });

  const pairedComparisonText = await readText(args.pairedComparisonPath);
  const availabilityLogText = await readText(args.availabilityLogPath);
  const pairedComparison = JSON.parse(pairedComparisonText);
  const availabilityLog = JSON.parse(availabilityLogText);
  const availabilityByTask = buildAvailabilityMap(availabilityLog);
  const includeStatuses = new Set(args.includeStatuses);

  const annotatedPairs = (pairedComparison.pairs ?? []).map((pair) => {
    const annotated = annotatePair(pair, availabilityByTask);
    annotated.availability_gate.included_in_main_comparison = includeStatuses.has(
      annotated.availability_gate.source_status,
    );
    return annotated;
  });

  const includedPairs = annotatedPairs.filter((pair) => pair.availability_gate.included_in_main_comparison);
  const excludedPairs = annotatedPairs.filter((pair) => !pair.availability_gate.included_in_main_comparison);
  const compactExcludedPairs = excludedPairs.map(compactExcludedPair);

  const report = {
    report_version: "availability_gated_paired_mode_comparison_v1",
    generated_at: new Date().toISOString(),
    dataset_scope: args.datasetId,
    include_statuses: args.includeStatuses,
    inputs: {
      paired_comparison_path: toRepoPath(args.pairedComparisonPath),
      paired_comparison_sha256: sha256Text(pairedComparisonText),
      availability_log_path: toRepoPath(args.availabilityLogPath),
      availability_log_sha256: sha256Text(availabilityLogText),
      availability_run_id: availabilityLog.run_id ?? null,
      availability_created_at: availabilityLog.created_at ?? null,
      availability_dataset_id: availabilityLog.datasetId ?? null,
      availability_source_dataset: availabilityLog.sourceDataset ?? null,
    },
    source_availability_summary: availabilityLog.summary ?? null,
    source_ui_summary: availabilityLog.ui_summary ?? null,
    main_available_only_summary: summarizePairs(includedPairs),
    diagnostic_forced_all_summary: summarizePairs(annotatedPairs),
    excluded_by_availability_summary: {
      excluded_pair_count: excludedPairs.length,
      by_availability_status: countBy(excludedPairs, (pair) => pair.availability_gate.source_status),
      by_winner: countBy(excludedPairs, (pair) => pair.winner ?? "unknown"),
    },
    main_available_only_pairs: includedPairs,
    excluded_pairs: compactExcludedPairs,
    outputs: {},
  };

  const mainJsonPath = path.join(args.outputDir, `available_only_paired_mode_comparison__${args.datasetId}.json`);
  const mainMdPath = path.join(args.outputDir, `available_only_paired_mode_comparison__${args.datasetId}.md`);
  const pureMainMdPath = path.join(args.outputDir, `main_available_only_paired_mode_comparison__${args.datasetId}.md`);
  const pureMainJsonPath = path.join(args.outputDir, `main_available_only_paired_mode_comparison__${args.datasetId}.json`);
  const excludedJsonlPath = path.join(args.outputDir, `excluded_by_availability__${args.datasetId}.jsonl`);
  const annotatedJsonPath = path.join(args.outputDir, `diagnostic_forced_all_with_availability__${args.datasetId}.json`);

  report.outputs = {
    main_available_only_json: toRepoPath(mainJsonPath),
    main_available_only_md: toRepoPath(mainMdPath),
    pure_main_available_only_json: toRepoPath(pureMainJsonPath),
    pure_main_available_only_md: toRepoPath(pureMainMdPath),
    excluded_by_availability_jsonl: toRepoPath(excludedJsonlPath),
    diagnostic_forced_all_with_availability_json: toRepoPath(annotatedJsonPath),
  };

  await writeFile(mainJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(mainMdPath, renderMarkdown(report), "utf8");
  await writeFile(
    pureMainJsonPath,
    `${JSON.stringify({
      report_version: "main_available_only_paired_mode_comparison_v1",
      generated_at: report.generated_at,
      dataset_scope: report.dataset_scope,
      include_statuses: report.include_statuses,
      inputs: report.inputs,
      source_availability_summary: report.source_availability_summary,
      main_available_only_summary: report.main_available_only_summary,
      main_available_only_pairs: report.main_available_only_pairs,
    }, null, 2)}\n`,
    "utf8",
  );
  await writeFile(pureMainMdPath, renderMainOnlyMarkdown(report), "utf8");
  await writeFile(
    excludedJsonlPath,
    `${compactExcludedPairs.map((pair) => JSON.stringify(pair)).join("\n")}${compactExcludedPairs.length ? "\n" : ""}`,
    "utf8",
  );
  await writeFile(
    annotatedJsonPath,
    `${JSON.stringify({ ...pairedComparison, pairs: annotatedPairs }, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `[availability-gate] dataset=${args.datasetId} main_pairs=${includedPairs.length} ` +
    `excluded=${excludedPairs.length} winners=${JSON.stringify(report.main_available_only_summary.winner_counts)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
