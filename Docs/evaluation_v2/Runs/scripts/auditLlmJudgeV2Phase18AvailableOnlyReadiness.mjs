import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");

function parseArgs(argv) {
  const args = { expectedCount: 48, expectedDataset: "SAMPLE_UCI_POR" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--contract-manifest") args.contractManifestPath = path.resolve(next), i += 1;
    else if (arg === "--contract-manifest-sha256") args.expectedContractSha256 = next, i += 1;
    else if (arg === "--master-prompt") args.masterPromptPath = path.resolve(next), i += 1;
    else if (arg === "--invocation-manifest") args.invocationManifestPath = path.resolve(next), i += 1;
    else if (arg === "--availability-gate") args.availabilityGatePath = path.resolve(next), i += 1;
    else if (arg === "--raw-output-dir") args.rawOutputDir = path.resolve(next), i += 1;
    else if (arg === "--output-report") args.outputReportPath = path.resolve(next), i += 1;
    else if (arg === "--expected-count") args.expectedCount = Number(next), i += 1;
    else if (arg === "--expected-dataset") args.expectedDataset = next, i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  for (const key of ["contractManifestPath", "expectedContractSha256", "masterPromptPath", "invocationManifestPath", "availabilityGatePath", "rawOutputDir"]) {
    if (!args[key]) throw new Error(`Missing required argument: ${key}`);
  }
  return args;
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).split(path.sep).join("/");
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

async function sha256File(filePath) {
  return createHash("sha256").update(await readFile(filePath)).digest("hex");
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listJsonFiles(dirPath) {
  try {
    return (await readdir(dirPath, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => path.join(dirPath, entry.name));
  } catch {
    return [];
  }
}

function addIssue(issues, severity, code, message, recordId = null) {
  issues.push({ severity, code, record_id: recordId, message });
}

const args = parseArgs(process.argv.slice(2));
const issues = [];

const contractSha256 = await sha256File(args.contractManifestPath);
if (contractSha256 !== args.expectedContractSha256) {
  addIssue(issues, "error", "contract_hash_mismatch", `Expected ${args.expectedContractSha256}, observed ${contractSha256}.`);
}

const contract = await readJson(args.contractManifestPath);
if (contract.status !== "FROZEN_FOR_PHASE18_UCI_AVAILABLE_ONLY_RECORD_SPECIFIC_INVOCATION") {
  addIssue(issues, "error", "contract_status_mismatch", `Observed status ${contract.status}.`);
}
if (contract.prompt_loading_policy?.packet_layout !== "embedded_prompt_full_context") {
  addIssue(issues, "error", "contract_packet_layout_mismatch", `Observed ${contract.prompt_loading_policy?.packet_layout}.`);
}

for (const artifact of [...(contract.contract_artifacts ?? []), ...(contract.provenance_artifacts ?? [])]) {
  const artifactPath = repoPathToAbsolute(artifact.path);
  if (!(await exists(artifactPath))) {
    addIssue(issues, "error", "contract_artifact_missing", `Missing artifact ${artifact.path}.`);
    continue;
  }
  const observed = await sha256File(artifactPath);
  if (observed !== artifact.sha256) {
    addIssue(issues, "error", "contract_artifact_hash_mismatch", `${artifact.path}: expected ${artifact.sha256}, observed ${observed}.`);
  }
}

const availabilityGate = await readJson(args.availabilityGatePath);
if (availabilityGate.counts?.total_tasks !== 52) addIssue(issues, "error", "availability_total_mismatch", `Observed ${availabilityGate.counts?.total_tasks}.`);
if (availabilityGate.counts?.executable_tasks !== 24) addIssue(issues, "error", "availability_executable_mismatch", `Observed ${availabilityGate.counts?.executable_tasks}.`);
if ((availabilityGate.executable_task_ids ?? []).includes("S-T10")) addIssue(issues, "error", "s_t10_in_executable_gate", "S-T10 must be excluded from Phase18.");

const masterPromptText = await readText(args.masterPromptPath);
for (const required of [
  "Do not create an active goal",
  "Do not use OpenAI API",
  "48",
  "JUDGE_PROMPT_V2_2_RECORD_SPECIFIC.md",
  "first manifest row whose `expected_raw_output_path` either does not exist or is not parseable as valid JSON",
  "record-specific",
]) {
  if (!masterPromptText.includes(required)) {
    addIssue(issues, "error", "master_prompt_required_clause_missing", `Missing required clause: ${required}.`);
  }
}
for (const forbidden of ["session_static_record_context", "Static Judge Prompt", "session-static"]) {
  if (masterPromptText.includes(forbidden)) {
    addIssue(issues, "error", "forbidden_master_prompt_language_present", `Master prompt contains forbidden or risky language: ${forbidden}.`);
  }
}

const records = await readJsonl(args.invocationManifestPath);
if (records.length !== args.expectedCount) {
  addIssue(issues, "error", "invocation_record_count_mismatch", `Expected ${args.expectedCount}, observed ${records.length}.`);
}

const recordIds = new Set();
const modeCounts = {};
const layoutCounts = {};
const taskIds = new Set();
let promptHashMatches = 0;

const forbiddenPathFragments = [
  "phase8_explanations",
  "phase13_taskaware_v3_summary/judge_invocation",
  "phase14_taskaware_v3_1_judge_v2_1/judge_invocation",
  "phase15_taskaware_v3_1_judge_v2_1_semantic_goal",
  "phase16_taskaware_v3_1_judge_v2_1_fast_codex_batch",
  "phase17_taskaware_v3_1_judge_v2_1_phase13_style_final/judge_invocation",
  "SAMPLE_OULAD",
];

for (const record of records) {
  if (recordIds.has(record.record_id)) addIssue(issues, "error", "duplicate_record_id", `Duplicate ${record.record_id}.`, record.record_id);
  recordIds.add(record.record_id);
  taskIds.add(record.task_id);
  modeCounts[record.explanation_mode] = (modeCounts[record.explanation_mode] ?? 0) + 1;
  layoutCounts[record.packet_layout] = (layoutCounts[record.packet_layout] ?? 0) + 1;

  if (record.dataset_id !== args.expectedDataset) addIssue(issues, "error", "dataset_scope_violation", `Observed ${record.dataset_id}.`, record.record_id);
  if (record.task_id === "S-T10") addIssue(issues, "error", "s_t10_in_invocation", "S-T10 must be absent.", record.record_id);
  if (!(availabilityGate.executable_task_ids ?? []).includes(record.task_id)) {
    addIssue(issues, "error", "non_executable_record_in_invocation", `${record.task_id} is not in the executable gate.`, record.record_id);
  }
  if (record.packet_layout !== "embedded_prompt_full_context") {
    addIssue(issues, "error", "packet_layout_mismatch", `Observed ${record.packet_layout}.`, record.record_id);
  }

  for (const pathField of ["expected_raw_output_path", "invocation_prompt_path", "source_prompt_packet_path"]) {
    const value = record[pathField] ?? "";
    if (!value.includes("phase18_uci_available_only_record_specific_judge")) {
      addIssue(issues, "error", "phase18_path_mismatch", `${pathField} is outside Phase18: ${value}`, record.record_id);
    }
    for (const fragment of forbiddenPathFragments) {
      if (value.includes(fragment)) {
        addIssue(issues, "error", "forbidden_output_or_prompt_path", `${pathField} contains ${fragment}: ${value}`, record.record_id);
      }
    }
  }

  const promptPath = repoPathToAbsolute(record.invocation_prompt_path);
  if (!(await exists(promptPath))) {
    addIssue(issues, "error", "invocation_prompt_missing", record.invocation_prompt_path, record.record_id);
  } else {
    const observed = await sha256File(promptPath);
    if (observed !== record.invocation_prompt_sha256) {
      addIssue(issues, "error", "invocation_prompt_hash_mismatch", `${record.invocation_prompt_path}: expected ${record.invocation_prompt_sha256}, observed ${observed}.`, record.record_id);
    } else {
      promptHashMatches += 1;
    }
  }
}

if (modeCounts.baseline_first_20_rows !== 24 || modeCounts.task_aware_data_summarization !== 24) {
  addIssue(issues, "error", "mode_count_mismatch", `Observed ${JSON.stringify(modeCounts)}.`);
}
if (taskIds.size !== 24) addIssue(issues, "error", "task_count_mismatch", `Expected 24 unique tasks, observed ${taskIds.size}.`);

let validExistingRawCount = 0;
let invalidExistingRawCount = 0;
for (const filePath of await listJsonFiles(args.rawOutputDir)) {
  try {
    const raw = await readJson(filePath);
    if (records.some((record) => record.record_id === raw.record_id && repoPathToAbsolute(record.expected_raw_output_path) === filePath)) {
      validExistingRawCount += 1;
    } else {
      invalidExistingRawCount += 1;
      addIssue(issues, "error", "unexpected_existing_raw_output", toRepoPath(filePath), raw.record_id ?? null);
    }
  } catch {
    invalidExistingRawCount += 1;
    addIssue(issues, "error", "invalid_existing_raw_output", toRepoPath(filePath));
  }
}
if (validExistingRawCount !== 0) {
  addIssue(issues, "warn", "existing_valid_raw_outputs_present", `Expected fresh Phase18 start at 0, observed ${validExistingRawCount}.`);
}

const report = {
  status: issues.some((issue) => issue.severity === "error") ? "FAIL" : "PASS",
  checked_at: new Date().toISOString(),
  contract_manifest_path: toRepoPath(args.contractManifestPath),
  contract_manifest_sha256: contractSha256,
  master_prompt_path: toRepoPath(args.masterPromptPath),
  master_prompt_sha256: await sha256File(args.masterPromptPath),
  invocation_manifest_path: toRepoPath(args.invocationManifestPath),
  availability_gate_path: toRepoPath(args.availabilityGatePath),
  raw_output_dir: toRepoPath(args.rawOutputDir),
  counts: {
    invocation_records: records.length,
    unique_record_ids: recordIds.size,
    unique_task_ids: taskIds.size,
    mode_counts: modeCounts,
    layout_counts: layoutCounts,
    prompt_hash_matches: promptHashMatches,
    valid_existing_raw_outputs: validExistingRawCount,
    invalid_existing_raw_outputs: invalidExistingRawCount,
  },
  issues,
};

if (args.outputReportPath) {
  await mkdir(path.dirname(args.outputReportPath), { recursive: true });
  await writeFile(args.outputReportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (report.status !== "PASS") process.exitCode = 1;
