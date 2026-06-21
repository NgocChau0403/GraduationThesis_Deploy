import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");

function parseArgs(argv) {
  const args = {};
  const mappings = {
    "--base-manifest": "baseManifestPath",
    "--prompt": "promptPath",
    "--evidence-manifest": "evidenceManifestPath",
    "--baseline-explanation-manifest": "baselineExplanationManifestPath",
    "--task-aware-explanation-manifest": "taskAwareExplanationManifestPath",
    "--judge-input-manifest": "judgeInputManifestPath",
    "--judge-context-manifest": "judgeContextManifestPath",
    "--queue-manifest": "queueManifestPath",
    "--token-report": "tokenReportPath",
    "--output-manifest": "outputManifestPath",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const key = mappings[argv[i]];
    if (!key) throw new Error(`Unknown argument: ${argv[i]}`);
    if (!argv[i + 1]) throw new Error(`Missing value for ${argv[i]}`);
    args[key] = path.resolve(argv[i + 1]);
    i += 1;
  }

  for (const key of Object.values(mappings)) {
    if (!args[key]) throw new Error(`Missing required argument: ${key}`);
  }
  return args;
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).split(path.sep).join("/");
}

async function sha256File(filePath) {
  const bytes = await readFile(filePath);
  return createHash("sha256").update(bytes).digest("hex");
}

async function pin(artifactId, filePath, reason = undefined) {
  return {
    artifact_id: artifactId,
    path: toRepoPath(filePath),
    sha256: await sha256File(filePath),
    ...(reason ? { reason } : {}),
  };
}

const args = parseArgs(process.argv.slice(2));
const base = JSON.parse(await readFile(args.baseManifestPath, "utf8"));

const contractArtifacts = [];
for (const artifact of base.contract_artifacts) {
  if (artifact.artifact_id === "judge_prompt_v2_full_208") {
    contractArtifacts.push(await pin("judge_prompt_v2_1_action_task_correction", args.promptPath));
  } else {
    contractArtifacts.push(await pin(artifact.artifact_id, path.resolve(PROJECT_ROOT, artifact.path), artifact.reason));
  }
}

const retainedProvenance = base.provenance_artifacts.filter(
  (artifact) => !["phase_f7_prompt_queue_manifest", "phase_f7_token_budget_report"].includes(artifact.artifact_id),
);
const provenanceArtifacts = [];
for (const artifact of retainedProvenance) {
  provenanceArtifacts.push(await pin(
    artifact.artifact_id,
    path.resolve(PROJECT_ROOT, artifact.path),
    artifact.reason,
  ));
}

provenanceArtifacts.push(
  await pin("phase14_uci_evidence_manifest", args.evidenceManifestPath, "UCI-only evidence slice for 104 mode-level judge records."),
  await pin("phase14_baseline_explanation_manifest", args.baselineExplanationManifestPath, "Phase 8 baseline explanations reused for the fair Judge V2.1 comparison."),
  await pin("phase14_task_aware_v3_1_explanation_manifest", args.taskAwareExplanationManifestPath, "Regenerated UCI Task-Aware V3.1 explanations."),
  await pin("phase14_judge_input_manifest", args.judgeInputManifestPath, "Materialized UCI judge inputs for both explanation modes."),
  await pin("phase14_judge_context_manifest", args.judgeContextManifestPath, "Final Judge V2.1 contexts for the UCI run."),
  await pin("phase14_prompt_queue_manifest", args.queueManifestPath, "UCI prompt queue with 104 hash-pinned prompt packets."),
  await pin("phase14_token_budget_report", args.tokenReportPath, "Token-budget preflight confirming 104/104 packets are ready."),
);

const output = {
  ...base,
  manifest_version: "llm_judge_v2_1_phase14_taskaware_v3_1_official_contract_manifest_v1",
  status: "FROZEN_FOR_PHASE14_UCI_JUDGE_V2_1_INVOCATION",
  frozen_at_local_date: "2026-06-21",
  scope: {
    ...base.scope,
    evaluation_method: "Phase 14 baseline versus Task-Aware V3.1 using Judge Prompt V2.1",
    datasets: ["SAMPLE_UCI_POR"],
    expected_dataset_task_cases: 52,
    expected_full_evaluation_record_count: 104,
    official_full_run_allowed: "approved_for_dataset_scoped_phase14_uci_invocation",
  },
  versions: {
    ...base.versions,
    prompt_version: "judge_prompt_v2_1_full_208_action_task_correction_v1",
  },
  contract_artifacts: contractArtifacts,
  provenance_artifacts: provenanceArtifacts,
  counts: {
    contract_artifact_count: contractArtifacts.length,
    provenance_artifact_count: provenanceArtifacts.length,
    total_hashed_artifact_count: contractArtifacts.length + provenanceArtifacts.length,
  },
  gate_decision: {
    prompt_rubric_manifest_frozen: true,
    prompt_queue_regenerated_after_freeze: true,
    judge_invocation_started: false,
    judge_invocation_allowed: true,
    next_required_step: "Prepare and verify the 104-record SAMPLE_UCI_POR invocation manifest, then run the judge in a separate session.",
  },
  notes: [
    "Judge Prompt V2.1 corrects action_synthesis and risk/action completeness rules without requiring duplicate recommendations.",
    "Baseline explanations are reused from Phase 8; Task-Aware V3.1 explanations and all downstream judge artifacts are isolated under Phase 14.",
    "This contract is UCI-only. SAMPLE_OULAD must use a separately regenerated and frozen invocation contract.",
  ],
};

await mkdir(path.dirname(args.outputManifestPath), { recursive: true });
await writeFile(args.outputManifestPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

process.stdout.write(`${JSON.stringify({
  status: "PASS",
  output_manifest: toRepoPath(args.outputManifestPath),
  output_sha256: await sha256File(args.outputManifestPath),
  contract_artifacts: contractArtifacts.length,
  provenance_artifacts: provenanceArtifacts.length,
}, null, 2)}\n`);
