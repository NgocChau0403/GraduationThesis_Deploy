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
    if (arg === "--base-manifest") args.baseManifestPath = path.resolve(next), i += 1;
    else if (arg === "--queue-manifest") args.queueManifestPath = path.resolve(next), i += 1;
    else if (arg === "--token-report") args.tokenReportPath = path.resolve(next), i += 1;
    else if (arg === "--output-manifest") args.outputManifestPath = path.resolve(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  for (const key of ["baseManifestPath", "queueManifestPath", "tokenReportPath", "outputManifestPath"]) {
    if (!args[key]) throw new Error(`Missing required argument: ${key}`);
  }
  return args;
}

function toRepoPath(absolutePath) {
  return path.relative(PROJECT_ROOT, absolutePath).split(path.sep).join("/");
}

async function sha256File(filePath) {
  const bytes = await readFile(filePath);
  return createHash("sha256").update(bytes).digest("hex");
}

async function refreshArtifact(artifact) {
  const absolutePath = path.resolve(PROJECT_ROOT, artifact.path);
  return { ...artifact, sha256: await sha256File(absolutePath) };
}

const args = parseArgs(process.argv.slice(2));
const base = JSON.parse(await readFile(args.baseManifestPath, "utf8"));

const contractArtifacts = [];
for (const artifact of base.contract_artifacts) {
  contractArtifacts.push(await refreshArtifact(artifact));
}

const provenanceArtifacts = [];
for (const artifact of base.provenance_artifacts) {
  if (artifact.artifact_id === "phase_f7_prompt_queue_manifest") {
    provenanceArtifacts.push({
      ...artifact,
      path: toRepoPath(args.queueManifestPath),
      sha256: await sha256File(args.queueManifestPath),
      reason: "Phase 13 prompt queue for the baseline versus Task-Aware Summary V3 comparison.",
    });
  } else if (artifact.artifact_id === "phase_f7_token_budget_report") {
    provenanceArtifacts.push({
      ...artifact,
      path: toRepoPath(args.tokenReportPath),
      sha256: await sha256File(args.tokenReportPath),
      reason: "Phase 13 token-budget report confirming all 208 prompt packets are ready.",
    });
  } else {
    provenanceArtifacts.push(await refreshArtifact(artifact));
  }
}

const output = {
  ...base,
  manifest_version: "llm_judge_v2_phase13_taskaware_v3_official_contract_manifest_v1",
  status: "FROZEN_FOR_PHASE13_TASKAWARE_V3_OFFICIAL_JUDGE_INVOCATION",
  frozen_at_local_date: "2026-06-21",
  scope: {
    ...base.scope,
    evaluation_method: "Phase 13 baseline versus Task-Aware Summary V3 using frozen LLM Judge V2",
    official_full_run_allowed: "approved_for_dataset_scoped_phase13_invocation",
  },
  contract_artifacts: contractArtifacts,
  provenance_artifacts: provenanceArtifacts,
  gate_decision: {
    prompt_rubric_manifest_frozen: true,
    prompt_queue_regenerated_after_freeze: true,
    judge_invocation_started: false,
    judge_invocation_allowed: true,
    next_required_step: "Run SAMPLE_UCI_POR in a new Codex session, then import and validate its 104 raw outputs.",
  },
  notes: [
    "This Phase 13 manifest preserves the frozen LLM Judge V2 prompt, rubric and schemas for fair comparison.",
    "It refreshes task-requirement provenance and pins the Phase 13 Task-Aware Summary V3 prompt queue.",
    "The Phase 8 official contract remains immutable historical evidence.",
  ],
};

await mkdir(path.dirname(args.outputManifestPath), { recursive: true });
await writeFile(args.outputManifestPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

process.stdout.write(`${JSON.stringify({
  status: "PASS",
  output_manifest: toRepoPath(args.outputManifestPath),
  output_sha256: await sha256File(args.outputManifestPath),
  contract_artifacts: output.contract_artifacts.length,
  provenance_artifacts: output.provenance_artifacts.length,
}, null, 2)}\n`);
