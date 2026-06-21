import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");

function parseArgs(argv) {
  const args = { datasetId: "SAMPLE_UCI_POR" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--scoring-report") args.scoringReportPath = path.resolve(next), i += 1;
    else if (arg === "--paired-comparison") args.pairedComparisonPath = path.resolve(next), i += 1;
    else if (arg === "--availability-gate") args.availabilityGatePath = path.resolve(next), i += 1;
    else if (arg === "--excluded-manifest") args.excludedManifestPath = path.resolve(next), i += 1;
    else if (arg === "--score-profile-audit") args.scoreProfileAuditPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else if (arg === "--dataset") args.datasetId = next, i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  for (const key of ["scoringReportPath", "pairedComparisonPath", "availabilityGatePath", "excludedManifestPath", "outputDir"]) {
    if (!args[key]) throw new Error(`Missing required argument: ${key}`);
  }
  return args;
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).split(path.sep).join("/");
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

async function sha256File(filePath) {
  return createHash("sha256").update(await readFile(filePath)).digest("hex");
}

function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "";
  return Number(value).toFixed(2).replace(/\.00$/, "");
}

function reasonForExcluded(task) {
  const reason = task.disabled_reason || task.decision_explanation || "Not executable for this dataset.";
  const missing = Array.isArray(task.missing_capabilities) && task.missing_capabilities.length
    ? ` Missing capabilities: ${task.missing_capabilities.join(", ")}.`
    : "";
  return `${reason}${missing}`;
}

function summarizeExcluded(excluded) {
  return excluded.reduce((acc, task) => {
    acc[task.availability_status] = (acc[task.availability_status] ?? 0) + 1;
    return acc;
  }, {});
}

function renderMarkdown(report) {
  const lines = [
    `# Phase 18 UCI Available-Only Final Judge Report`,
    "",
    "## Scope",
    "",
    `- Dataset: \`${report.dataset_id}\``,
    "- Evaluation scope: executable tasks only, based on the latest UCI task availability log.",
    "- Judge standard: Judge V2.2 record-specific scoring, preserving Judge V2.1 action/risk correction.",
    "- AI explanations are reused: Phase 8 baseline and Phase 14 Task-Aware V3.1.",
    "- Non-executable tasks are excluded from the main paired comparison, not treated as model losses.",
    "",
    "## Overall Result",
    "",
    `- Evaluated executable tasks: ${report.summary.evaluated_task_count}`,
    `- Judge records: ${report.summary.judge_record_count}`,
    `- Comparable pairs: ${report.summary.comparable_pair_count}`,
    `- Winner counts: ${JSON.stringify(report.summary.winner_counts)}`,
    `- Average delta, Task-Aware minus baseline: ${formatNumber(report.summary.average_delta_task_aware_minus_baseline)}`,
    `- Score-profile audit: ${report.summary.score_profile_audit_status}`,
    "",
    report.interpretation,
    "",
    "## Per-Task Comparison",
    "",
    "| Task | Rows | Evidence access | Baseline | Task-Aware V3.1 | Delta | Winner | Interpretation |",
    "| --- | ---: | --- | ---: | ---: | ---: | --- | --- |",
    ...report.task_comparisons.map((pair) => [
      `| ${pair.task_id}`,
      pair.full_result_row_count ?? "",
      pair.evidence_access_mode ?? "",
      formatNumber(pair.baseline_final_score),
      formatNumber(pair.task_aware_final_score),
      formatNumber(pair.delta_task_aware_minus_baseline),
      pair.winner,
      String(pair.interpretation ?? "").replace(/\|/g, "\\|"),
    ].join(" | ") + " |"),
    "",
    "## Excluded Tasks",
    "",
    "These tasks are not part of the main Phase 18 paired comparison because the availability gate did not mark them `executable` for UCI. This keeps the AI explanation evaluation aligned with what the chart/task layer can actually support for this dataset.",
    "",
    `- Excluded task count: ${report.excluded_summary.excluded_task_count}`,
    `- Excluded by status: ${JSON.stringify(report.excluded_summary.excluded_by_status)}`,
    "",
    "| Task | Status | Reason |",
    "| --- | --- | --- |",
    ...report.excluded_tasks.map((task) => `| ${task.task_id} | ${task.availability_status} | ${String(task.reason).replace(/\|/g, "\\|")} |`),
    "",
    "## Artifact Provenance",
    "",
    ...Object.entries(report.inputs).map(([key, value]) => `- ${key}: \`${value.path}\` (${value.sha256})`),
    "",
  ];
  return lines.join("\n");
}

const args = parseArgs(process.argv.slice(2));
const scoringReport = await readJson(args.scoringReportPath);
const pairedComparison = await readJson(args.pairedComparisonPath);
const availabilityGate = await readJson(args.availabilityGatePath);
const excludedRows = await readJsonl(args.excludedManifestPath);
const scoreProfileAudit = args.scoreProfileAuditPath ? await readJson(args.scoreProfileAuditPath) : null;

if (pairedComparison.dataset_scope && pairedComparison.dataset_scope !== args.datasetId) {
  throw new Error(`Paired comparison dataset mismatch: ${pairedComparison.dataset_scope}`);
}
if (availabilityGate.dataset_id !== args.datasetId) {
  throw new Error(`Availability gate dataset mismatch: ${availabilityGate.dataset_id}`);
}
if (availabilityGate.counts?.executable_tasks !== 24) {
  throw new Error(`Expected 24 executable tasks, observed ${availabilityGate.counts?.executable_tasks}`);
}
if ((pairedComparison.pairs ?? []).length !== 24) {
  throw new Error(`Expected 24 paired comparisons, observed ${(pairedComparison.pairs ?? []).length}`);
}

const excludedTasks = excludedRows.map((task) => ({
  task_id: task.task_id,
  task_name: task.task_name,
  availability_status: task.availability_status,
  reason: reasonForExcluded(task),
}));

const winnerCounts = pairedComparison.winner_counts ?? {};
const taskAwareWins = winnerCounts.task_aware_data_summarization ?? 0;
const baselineWins = winnerCounts.baseline_first_20_rows ?? 0;
const ties = winnerCounts.tie ?? 0;
const avgDelta = pairedComparison.average_delta_task_aware_minus_baseline;

const interpretation = [
  `Across the ${pairedComparison.comparable_pair_count} executable UCI tasks, Phase 18 evaluates only tasks that the system can actually execute for the dataset.`,
  `The aggregate direction is ${avgDelta > 0 ? "in favor of Task-Aware V3.1" : avgDelta < 0 ? "in favor of the baseline" : "balanced overall"}, with ${taskAwareWins} Task-Aware wins, ${baselineWins} baseline wins and ${ties} ties.`,
  "Because non-executable tasks are excluded, the result should be interpreted as explanation quality for available chart/task outputs, not as a penalty for missing dataset capabilities.",
  scoreProfileAudit?.status === "WARN"
    ? "The score-profile audit raised an advisory warning, so repeated score patterns should be reviewed alongside the per-task rationales before thesis reporting."
    : "The score-profile audit did not identify a dominant repeated score pattern above the configured advisory threshold.",
].join(" ");

const report = {
  report_version: "phase18_uci_available_only_final_report_v1",
  dataset_id: args.datasetId,
  generated_at: new Date().toISOString(),
  summary: {
    evaluated_task_count: availabilityGate.counts.executable_tasks,
    judge_record_count: scoringReport.counts?.scored_records ?? scoringReport.counts?.validated_outputs ?? 48,
    comparable_pair_count: pairedComparison.comparable_pair_count,
    winner_counts: winnerCounts,
    average_delta_task_aware_minus_baseline: avgDelta,
    score_profile_audit_status: scoreProfileAudit?.status ?? "not_run",
  },
  interpretation,
  task_comparisons: pairedComparison.pairs ?? [],
  excluded_summary: {
    excluded_task_count: excludedTasks.length,
    excluded_by_status: summarizeExcluded(excludedRows),
  },
  excluded_tasks: excludedTasks,
  inputs: {
    scoring_report: {
      path: toRepoPath(args.scoringReportPath),
      sha256: await sha256File(args.scoringReportPath),
    },
    paired_comparison: {
      path: toRepoPath(args.pairedComparisonPath),
      sha256: await sha256File(args.pairedComparisonPath),
    },
    availability_gate: {
      path: toRepoPath(args.availabilityGatePath),
      sha256: await sha256File(args.availabilityGatePath),
    },
    excluded_manifest: {
      path: toRepoPath(args.excludedManifestPath),
      sha256: await sha256File(args.excludedManifestPath),
    },
    ...(args.scoreProfileAuditPath ? {
      score_profile_audit: {
        path: toRepoPath(args.scoreProfileAuditPath),
        sha256: await sha256File(args.scoreProfileAuditPath),
      },
    } : {}),
  },
};

await mkdir(args.outputDir, { recursive: true });
const jsonPath = path.join(args.outputDir, `phase18_final_report__${args.datasetId}.json`);
const mdPath = path.join(args.outputDir, `phase18_final_report__${args.datasetId}.md`);
await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(mdPath, renderMarkdown(report), "utf8");

process.stdout.write(`${JSON.stringify({
  status: "PASS",
  report_json: toRepoPath(jsonPath),
  report_md: toRepoPath(mdPath),
  comparable_pairs: pairedComparison.comparable_pair_count,
  excluded_tasks: excludedTasks.length,
}, null, 2)}\n`);
