import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--availability-log") args.availabilityLogPath = path.resolve(next), i += 1;
    else if (arg === "--task-aware-artifacts-dir") args.taskAwareArtifactsDir = path.resolve(next), i += 1;
    else if (arg === "--baseline-manifest") args.baselineManifestPath = path.resolve(next), i += 1;
    else if (arg === "--evidence-manifest") args.evidenceManifestPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  for (const key of ["availabilityLogPath", "taskAwareArtifactsDir", "baselineManifestPath", "evidenceManifestPath", "outputDir"]) {
    if (!args[key]) throw new Error(`Missing required argument: ${key}`);
  }
  return args;
}

const toRepoPath = (filePath) => path.relative(PROJECT_ROOT, filePath).split(path.sep).join("/");
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const readJson = async (filePath) => JSON.parse((await readFile(filePath, "utf8")).replace(/^\uFEFF/, ""));
const readJsonl = async (filePath) => (await readFile(filePath, "utf8")).split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map(JSON.parse);
const writeJson = async (filePath, value) => writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
const writeJsonl = async (filePath, values) => writeFile(filePath, `${values.map((value) => JSON.stringify(value)).join("\n")}\n`, "utf8");

const args = parseArgs(process.argv.slice(2));
await mkdir(args.outputDir, { recursive: true });

const availabilityBytes = await readFile(args.availabilityLogPath);
const availability = JSON.parse(availabilityBytes.toString("utf8").replace(/^\uFEFF/, ""));
const tasks = Array.isArray(availability.tasks) ? availability.tasks : [];
if (tasks.length !== 52) throw new Error(`Expected 52 availability tasks, observed ${tasks.length}.`);
const executable = tasks.filter((task) => task.status === "executable" && task.executable === true);
if (executable.length !== 24) throw new Error(`Expected 24 executable tasks, observed ${executable.length}.`);
const executableIds = new Set(executable.map((task) => task.taskId));

const snapshotPath = path.join(args.outputDir, "availability_log_snapshot__SAMPLE_UCI_POR.json");
await writeFile(snapshotPath, availabilityBytes);

const baselineAll = await readJsonl(args.baselineManifestPath);
const baseline = baselineAll.filter((entry) => entry.dataset_id === "SAMPLE_UCI_POR" && executableIds.has(entry.task_id));
if (baseline.length !== 24) throw new Error(`Expected 24 baseline records, observed ${baseline.length}.`);

const artifactNames = (await import("node:fs/promises")).readdir(args.taskAwareArtifactsDir);
const taskAware = [];
for (const name of (await artifactNames).filter((value) => value.endsWith(".json")).sort()) {
  const artifactPath = path.join(args.taskAwareArtifactsDir, name);
  const bytes = await readFile(artifactPath);
  const artifact = JSON.parse(bytes.toString("utf8").replace(/^\uFEFF/, ""));
  const record = artifact.record ?? {};
  if (record.dataset_id !== "SAMPLE_UCI_POR" || !executableIds.has(record.task_id)) continue;
  const metadata = artifact.response_metadata ?? {};
  if (metadata.degraded === true) throw new Error(`${record.record_id} is degraded.`);
  if (metadata.observed_ai_summary_method !== "task_aware_data_summarization") {
    throw new Error(`${record.record_id} has mode ${metadata.observed_ai_summary_method}.`);
  }
  const serialized = bytes.toString("utf8");
  if (/phase1[4-8]/i.test(serialized)) throw new Error(`${record.record_id} contains a later-phase reference.`);
  const evidencePath = path.resolve(PROJECT_ROOT, artifact.source_evidence?.full_query_artifact_path ?? "");
  const evidenceBytes = await readFile(evidencePath);
  const evidenceHash = sha256(evidenceBytes);
  if (evidenceHash !== artifact.source_evidence?.full_query_artifact_sha256) {
    throw new Error(`${record.record_id} source evidence hash mismatch.`);
  }
  taskAware.push({
    ...record,
    status: "explanation_ready",
    ai_service_url: artifact.ai_service_url,
    explanation_artifact: { path: toRepoPath(artifactPath), sha256: sha256(bytes) },
    expected_ai_summary_method: "task_aware_data_summarization",
    observed_ai_summary_method: metadata.observed_ai_summary_method,
    degraded: false,
    model: metadata.model ?? null,
    token_usage: metadata.token_usage ?? null,
    latency_ms: metadata.latency_ms ?? null,
    attempts_used: metadata.attempts ?? null,
    raw_text_length: String(artifact.raw_text ?? "").length,
    source_evidence: {
      path: toRepoPath(evidencePath),
      sha256: evidenceHash,
    },
    source_execution_id: artifact.request_payload?.execution_id ?? null,
    issues: [],
  });
}
if (taskAware.length !== 24) throw new Error(`Expected 24 Task-Aware records, observed ${taskAware.length}.`);

const evidenceAll = await readJsonl(args.evidenceManifestPath);
const evidence = evidenceAll.filter((entry) => entry.dataset_id === "SAMPLE_UCI_POR" && executableIds.has(entry.task_id));
if (evidence.length !== 48) throw new Error(`Expected 48 evidence records, observed ${evidence.length}.`);

const baselinePath = path.join(args.outputDir, "explanation_manifest_baseline_uci_executable_24.jsonl");
const taskAwarePath = path.join(args.outputDir, "explanation_manifest_task_aware_saufix_uci_executable_24.jsonl");
const evidencePath = path.join(args.outputDir, "evidence_manifest_uci_executable_48.jsonl");
await writeJsonl(baselinePath, baseline);
await writeJsonl(taskAwarePath, taskAware);
await writeJsonl(evidencePath, evidence);

const gate = {
  status: "PASS",
  dataset_id: "SAMPLE_UCI_POR",
  source_availability_log: toRepoPath(args.availabilityLogPath),
  source_availability_sha256: sha256(availabilityBytes),
  counts: {
    total_tasks: tasks.length,
    executable_tasks: executable.length,
    excluded_tasks: tasks.length - executable.length,
    baseline_records: baseline.length,
    task_aware_records: taskAware.length,
    evidence_records: evidence.length,
  },
  executable_task_ids: [...executableIds].sort(),
  excluded_status_counts: Object.fromEntries([...new Set(tasks.filter((task) => !executableIds.has(task.taskId)).map((task) => task.status))].sort().map((status) => [status, tasks.filter((task) => task.status === status).length])),
  outputs: {
    availability_snapshot: toRepoPath(snapshotPath),
    baseline_manifest: toRepoPath(baselinePath),
    task_aware_manifest: toRepoPath(taskAwarePath),
    evidence_manifest: toRepoPath(evidencePath),
  },
};
const gatePath = path.join(args.outputDir, "availability_gate__SAMPLE_UCI_POR.json");
await writeJson(gatePath, gate);
process.stdout.write(`${JSON.stringify({ ...gate, gate_path: toRepoPath(gatePath) }, null, 2)}\n`);
