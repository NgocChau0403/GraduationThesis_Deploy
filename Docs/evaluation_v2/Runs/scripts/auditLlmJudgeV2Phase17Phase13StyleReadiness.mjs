import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");

function parseArgs(argv) {
  const args = { expectedCount: 104, expectedDataset: "SAMPLE_UCI_POR" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--contract-manifest") args.contractManifestPath = path.resolve(next), i += 1;
    else if (arg === "--contract-manifest-sha256") args.expectedContractSha256 = next, i += 1;
    else if (arg === "--master-prompt") args.masterPromptPath = path.resolve(next), i += 1;
    else if (arg === "--invocation-manifest") args.invocationManifestPath = path.resolve(next), i += 1;
    else if (arg === "--raw-output-dir") args.rawOutputDir = path.resolve(next), i += 1;
    else if (arg === "--expected-count") args.expectedCount = Number(next), i += 1;
    else if (arg === "--expected-dataset") args.expectedDataset = next, i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  for (const key of ["contractManifestPath", "expectedContractSha256", "masterPromptPath", "invocationManifestPath", "rawOutputDir"]) {
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
if (contract.status !== "FROZEN_FOR_PHASE17_UCI_PHASE13_STYLE_FINAL_INVOCATION") {
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

const masterPromptText = await readText(args.masterPromptPath);
const masterPromptSha256 = await sha256File(args.masterPromptPath);
for (const forbidden of ["session_static_record_context", "Static Judge Prompt", "static_prompt_loaded_once"]) {
  if (masterPromptText.includes(forbidden)) {
    addIssue(issues, "error", "phase16_static_prompt_language_present", `Master prompt contains forbidden Phase16/static language: ${forbidden}.`);
  }
}
for (const required of ["Do not create an active goal", "Do not use OpenAI API", "invocation_prompt_path", "first manifest row whose `expected_raw_output_path` either does not exist or is not parseable as valid JSON"]) {
  if (!masterPromptText.includes(required)) {
    addIssue(issues, "error", "master_prompt_required_clause_missing", `Missing required clause: ${required}.`);
  }
}

const records = await readJsonl(args.invocationManifestPath);
if (records.length !== args.expectedCount) {
  addIssue(issues, "error", "invocation_record_count_mismatch", `Expected ${args.expectedCount}, observed ${records.length}.`);
}

const expectedRawDirRepo = toRepoPath(args.rawOutputDir);
const forbiddenFragments = [
  "phase8_judge_invocation",
  "phase10_v3_uci_rerun",
  "phase13_taskaware_v3_summary",
  "phase14_taskaware_v3_1_judge_v2_1",
  "phase15_taskaware_v3_1_judge_v2_1_semantic_goal",
  "phase16_taskaware_v3_1_judge_v2_1_fast_codex_batch",
  "SAMPLE_OULAD",
];
const recordIds = new Set();
const modeCounts = {};
const layoutCounts = {};
let promptHashMatches = 0;
let validExistingRawCount = 0;
let invalidExistingRawCount = 0;

for (const record of records) {
  if (recordIds.has(record.record_id)) addIssue(issues, "error", "duplicate_record_id", `Duplicate ${record.record_id}.`, record.record_id);
  recordIds.add(record.record_id);

  if (record.dataset_id !== args.expectedDataset) addIssue(issues, "error", "dataset_scope_violation", `Observed ${record.dataset_id}.`, record.record_id);
  modeCounts[record.explanation_mode] = (modeCounts[record.explanation_mode] ?? 0) + 1;
  layoutCounts[record.packet_layout] = (layoutCounts[record.packet_layout] ?? 0) + 1;
  if (record.packet_layout !== "embedded_prompt_full_context") {
    addIssue(issues, "error", "packet_layout_mismatch", `Observed ${record.packet_layout}.`, record.record_id);
  }

  const invocationPromptPath = record.invocation_prompt_path;
  if (!invocationPromptPath) {
    addIssue(issues, "error", "missing_invocation_prompt_path", "invocation_prompt_path missing.", record.record_id);
  } else {
    const absPath = repoPathToAbsolute(invocationPromptPath);
    if (!(await exists(absPath))) {
      addIssue(issues, "error", "invocation_prompt_missing", `${invocationPromptPath} does not exist.`, record.record_id);
    } else {
      const observed = await sha256File(absPath);
      if (observed === record.invocation_prompt_sha256) promptHashMatches += 1;
      else addIssue(issues, "error", "invocation_prompt_hash_mismatch", `Expected ${record.invocation_prompt_sha256}, observed ${observed}.`, record.record_id);
    }
  }

  const rawPath = record.expected_raw_output_path ?? "";
  if (!rawPath.startsWith(`${expectedRawDirRepo}/`)) {
    addIssue(issues, "error", "raw_output_path_outside_phase17", `Expected under ${expectedRawDirRepo}, observed ${rawPath}.`, record.record_id);
  }
  for (const fragment of forbiddenFragments) {
    if (rawPath.includes(fragment)) addIssue(issues, "error", "forbidden_output_path_fragment", `Raw path contains ${fragment}.`, record.record_id);
  }

  const outputAbsPath = repoPathToAbsolute(rawPath);
  if (await exists(outputAbsPath)) {
    try {
      const parsed = JSON.parse(await readText(outputAbsPath));
      if (parsed.record_id === record.record_id) validExistingRawCount += 1;
      else {
        invalidExistingRawCount += 1;
        addIssue(issues, "error", "existing_raw_record_id_mismatch", `Observed ${parsed.record_id}.`, record.record_id);
      }
    } catch (error) {
      invalidExistingRawCount += 1;
      addIssue(issues, "error", "existing_raw_invalid_json", error.message, record.record_id);
    }
  }
}

if (recordIds.size !== args.expectedCount) addIssue(issues, "error", "unique_record_count_mismatch", `Expected ${args.expectedCount}, observed ${recordIds.size}.`);
if (modeCounts.baseline_first_20_rows !== 52 || modeCounts.task_aware_data_summarization !== 52) {
  addIssue(issues, "error", "mode_count_mismatch", `Observed ${JSON.stringify(modeCounts)}.`);
}

const extraRawFiles = (await listJsonFiles(args.rawOutputDir))
  .filter((filePath) => !records.some((record) => repoPathToAbsolute(record.expected_raw_output_path) === filePath));
for (const filePath of extraRawFiles) addIssue(issues, "error", "extra_raw_output_file", `Extra raw output file ${toRepoPath(filePath)}.`);

const errors = issues.filter((issue) => issue.severity === "error");
const result = {
  report_version: "llm_judge_v2_1_phase17_phase13_style_readiness_v1",
  status: errors.length === 0 ? "PASS" : "FAIL",
  contract_manifest: toRepoPath(args.contractManifestPath),
  contract_sha256: contractSha256,
  master_prompt: toRepoPath(args.masterPromptPath),
  master_prompt_sha256: masterPromptSha256,
  invocation_manifest: toRepoPath(args.invocationManifestPath),
  raw_output_dir: toRepoPath(args.rawOutputDir),
  counts: {
    expected_records: args.expectedCount,
    invocation_records: records.length,
    unique_record_ids: recordIds.size,
    mode_counts: modeCounts,
    packet_layout_counts: layoutCounts,
    invocation_prompt_hash_matches: promptHashMatches,
    valid_existing_raw_outputs: validExistingRawCount,
    invalid_existing_raw_outputs: invalidExistingRawCount,
    extra_raw_output_files: extraRawFiles.length,
    issues: issues.length,
    errors: errors.length,
  },
  next_step: errors.length === 0
    ? "Paste the Phase 17 Phase13-style master prompt into a new non-Goal Codex session."
    : "Fix readiness errors before launching the Codex judge session.",
  issues,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (result.status !== "PASS") process.exitCode = 1;
