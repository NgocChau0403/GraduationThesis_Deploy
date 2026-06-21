import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");

function parseArgs(argv) {
  const args = { datasetId: "SAMPLE_UCI_POR" };
  const mappings = {
    "--availability-log": "availabilityLogPath",
    "--evidence-manifest": "evidenceManifestPath",
    "--baseline-explanation-manifest": "baselineExplanationManifestPath",
    "--task-aware-explanation-manifest": "taskAwareExplanationManifestPath",
    "--output-dir": "outputDir",
    "--dataset": "datasetId",
  };
  for (let i = 0; i < argv.length; i += 1) {
    const key = mappings[argv[i]];
    if (!key) throw new Error(`Unknown argument: ${argv[i]}`);
    if (!argv[i + 1]) throw new Error(`Missing value for ${argv[i]}`);
    args[key] = key.endsWith("Path") || key === "outputDir" ? path.resolve(argv[i + 1]) : argv[i + 1];
    i += 1;
  }
  for (const key of ["availabilityLogPath", "evidenceManifestPath", "baselineExplanationManifestPath", "taskAwareExplanationManifestPath", "outputDir"]) {
    if (!args[key]) throw new Error(`Missing required argument: ${key}`);
  }
  return args;
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).split(path.sep).join("/");
}

async function sha256File(filePath) {
  return createHash("sha256").update(await readFile(filePath)).digest("hex");
}

async function readJson(filePath) {
  return JSON.parse((await readFile(filePath, "utf8")).replace(/^\uFEFF/, ""));
}

async function readJsonl(filePath) {
  return (await readFile(filePath, "utf8"))
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function writeJsonl(filePath, rows) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, rows.map((row) => JSON.stringify(row)).join("\n") + "\n", "utf8");
}

function assertUnique(rows, keyFn, label) {
  const seen = new Set();
  for (const row of rows) {
    const key = keyFn(row);
    if (seen.has(key)) throw new Error(`Duplicate ${label}: ${key}`);
    seen.add(key);
  }
}

const args = parseArgs(process.argv.slice(2));
const availability = await readJson(args.availabilityLogPath);
const tasks = availability.tasks ?? [];
if (availability.datasetId !== args.datasetId) {
  throw new Error(`Availability dataset mismatch: expected ${args.datasetId}, observed ${availability.datasetId}`);
}
if (tasks.length !== 52) {
  throw new Error(`Expected 52 availability tasks, observed ${tasks.length}`);
}

const executableTasks = tasks.filter((task) => task.status === "executable");
if (executableTasks.length !== 24) {
  throw new Error(`Expected 24 executable tasks, observed ${executableTasks.length}`);
}
const executableTaskIds = new Set(executableTasks.map((task) => task.taskId));
if (executableTaskIds.has("S-T10")) {
  throw new Error("S-T10 must not be executable for Phase18 available-only UCI scope.");
}

const excludedTasks = tasks
  .filter((task) => task.status !== "executable")
  .map((task) => ({
    dataset_id: args.datasetId,
    task_id: task.taskId,
    task_name: task.taskName,
    availability_status: task.status,
    disabled_reason: task.disabled_reason,
    decision_explanation: task.decision_explanation,
    missing_capabilities: task.missing_capabilities ?? [],
    availability_reason_codes: task.availability_reason_codes ?? [],
  }));

const evidenceRows = (await readJsonl(args.evidenceManifestPath))
  .filter((row) => row.dataset_id === args.datasetId && executableTaskIds.has(row.task_id));
const baselineRows = (await readJsonl(args.baselineExplanationManifestPath))
  .filter((row) => row.dataset_id === args.datasetId && executableTaskIds.has(row.task_id));
const taskAwareRows = (await readJsonl(args.taskAwareExplanationManifestPath))
  .filter((row) => row.dataset_id === args.datasetId && executableTaskIds.has(row.task_id));

if (evidenceRows.length !== 48) throw new Error(`Expected 48 filtered evidence records, observed ${evidenceRows.length}`);
if (baselineRows.length !== 24) throw new Error(`Expected 24 filtered baseline explanations, observed ${baselineRows.length}`);
if (taskAwareRows.length !== 24) throw new Error(`Expected 24 filtered task-aware explanations, observed ${taskAwareRows.length}`);

assertUnique(evidenceRows, (row) => row.record_id, "evidence record_id");
assertUnique(baselineRows, (row) => row.record_id, "baseline record_id");
assertUnique(taskAwareRows, (row) => row.record_id, "task-aware record_id");

const modeCounts = evidenceRows.reduce((acc, row) => {
  acc[row.explanation_mode] = (acc[row.explanation_mode] ?? 0) + 1;
  return acc;
}, {});
if (modeCounts.baseline_first_20_rows !== 24 || modeCounts.task_aware_data_summarization !== 24) {
  throw new Error(`Unexpected evidence mode counts: ${JSON.stringify(modeCounts)}`);
}

const outputPaths = {
  availabilitySnapshot: path.join(args.outputDir, "availability_log_snapshot__SAMPLE_UCI_POR.json"),
  availabilityGate: path.join(args.outputDir, "availability_gate__SAMPLE_UCI_POR.json"),
  excludedManifest: path.join(args.outputDir, "excluded_by_availability__SAMPLE_UCI_POR.jsonl"),
  evidenceManifest: path.join(args.outputDir, "evidence_manifest_uci_executable_48.jsonl"),
  baselineManifest: path.join(args.outputDir, "explanation_manifest_baseline_uci_executable_24.jsonl"),
  taskAwareManifest: path.join(args.outputDir, "explanation_manifest_task_aware_v3_1_uci_executable_24.jsonl"),
};

await writeJson(outputPaths.availabilitySnapshot, availability);
await writeJsonl(outputPaths.excludedManifest, excludedTasks);
await writeJsonl(outputPaths.evidenceManifest, evidenceRows);
await writeJsonl(outputPaths.baselineManifest, baselineRows);
await writeJsonl(outputPaths.taskAwareManifest, taskAwareRows);

const report = {
  status: "PASS",
  dataset_id: args.datasetId,
  source_availability_log_absolute_path: args.availabilityLogPath,
  source_availability_log_sha256: await sha256File(args.availabilityLogPath),
  availability_snapshot_path: toRepoPath(outputPaths.availabilitySnapshot),
  availability_snapshot_sha256: await sha256File(outputPaths.availabilitySnapshot),
  source_summary: availability.summary,
  counts: {
    total_tasks: tasks.length,
    executable_tasks: executableTasks.length,
    excluded_tasks: excludedTasks.length,
    filtered_evidence_records: evidenceRows.length,
    filtered_baseline_explanations: baselineRows.length,
    filtered_task_aware_explanations: taskAwareRows.length,
    mode_counts: modeCounts,
  },
  executable_task_ids: executableTasks.map((task) => task.taskId),
  excluded_status_counts: excludedTasks.reduce((acc, task) => {
    acc[task.availability_status] = (acc[task.availability_status] ?? 0) + 1;
    return acc;
  }, {}),
  outputs: Object.fromEntries(Object.entries(outputPaths).map(([key, value]) => [key, toRepoPath(value)])),
};

await writeJson(outputPaths.availabilityGate, report);

process.stdout.write(`${JSON.stringify({
  status: "PASS",
  availability_gate: toRepoPath(outputPaths.availabilityGate),
  executable_tasks: executableTasks.length,
  judge_records: evidenceRows.length,
  mode_counts: modeCounts,
  s_t10_included: executableTaskIds.has("S-T10"),
}, null, 2)}\n`);
