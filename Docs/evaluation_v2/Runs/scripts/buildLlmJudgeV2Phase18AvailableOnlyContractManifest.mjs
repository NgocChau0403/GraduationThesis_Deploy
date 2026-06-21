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
    "--availability-snapshot": "availabilitySnapshotPath",
    "--availability-gate": "availabilityGatePath",
    "--excluded-manifest": "excludedManifestPath",
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
  return createHash("sha256").update(await readFile(filePath)).digest("hex");
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
for (const artifact of base.contract_artifacts ?? []) {
  if (artifact.artifact_id === "judge_prompt_v2_full_208" || artifact.artifact_id === "judge_prompt_v2_1_action_task_correction") {
    contractArtifacts.push(await pin("judge_prompt_v2_2_record_specific", args.promptPath, "Judge V2.2 prompt keeps V2.1 action/risk correction and adds record-specific scoring calibration."));
  } else {
    contractArtifacts.push(await pin(artifact.artifact_id, path.resolve(PROJECT_ROOT, artifact.path), artifact.reason));
  }
}

const replacedProvenanceIds = new Set([
  "phase_f7_prompt_queue_manifest",
  "phase_f7_token_budget_report",
  "phase15_uci_evidence_manifest",
  "phase15_baseline_explanation_manifest",
  "phase15_task_aware_v3_1_explanation_manifest",
  "phase15_judge_input_manifest",
  "phase15_judge_context_manifest",
  "phase15_session_static_prompt_queue_manifest",
  "phase15_session_static_token_budget_report",
  "phase16_uci_evidence_manifest",
  "phase16_baseline_explanation_manifest",
  "phase16_task_aware_v3_1_explanation_manifest",
  "phase16_judge_input_manifest",
  "phase16_judge_context_manifest",
  "phase16_session_static_prompt_queue_manifest",
  "phase16_session_static_token_budget_report",
  "phase17_uci_evidence_manifest",
  "phase17_baseline_explanation_manifest",
  "phase17_task_aware_v3_1_explanation_manifest",
  "phase17_judge_input_manifest",
  "phase17_judge_context_manifest",
  "phase17_embedded_prompt_queue_manifest",
  "phase17_token_budget_report",
]);

const provenanceArtifacts = [];
for (const artifact of (base.provenance_artifacts ?? []).filter((item) => !replacedProvenanceIds.has(item.artifact_id))) {
  provenanceArtifacts.push(await pin(
    artifact.artifact_id,
    path.resolve(PROJECT_ROOT, artifact.path),
    artifact.reason,
  ));
}

provenanceArtifacts.push(
  await pin("phase18_availability_log_snapshot", args.availabilitySnapshotPath, "Snapshot of the UCI task availability log used as the executable-task gate."),
  await pin("phase18_availability_gate_report", args.availabilityGatePath, "Availability gate report proving 24 executable UCI tasks and excluded non-executable tasks."),
  await pin("phase18_excluded_by_availability_manifest", args.excludedManifestPath, "Manifest of UCI tasks excluded from the main available-only judge rerun."),
  await pin("phase18_uci_executable_evidence_manifest", args.evidenceManifestPath, "UCI evidence records filtered to executable tasks only: 24 tasks x 2 modes."),
  await pin("phase18_baseline_executable_explanation_manifest", args.baselineExplanationManifestPath, "Phase 8 baseline explanations filtered to executable UCI tasks."),
  await pin("phase18_task_aware_v3_1_executable_explanation_manifest", args.taskAwareExplanationManifestPath, "Phase 14 Task-Aware V3.1 explanations filtered to executable UCI tasks."),
  await pin("phase18_judge_input_manifest", args.judgeInputManifestPath, "Judge inputs for 48 executable-task UCI records."),
  await pin("phase18_judge_context_manifest", args.judgeContextManifestPath, "Record-level contexts for 48 executable-task UCI records."),
  await pin("phase18_embedded_prompt_queue_manifest", args.queueManifestPath, "Phase13-style embedded prompt queue using Judge V2.2 for 48 records."),
  await pin("phase18_token_budget_report", args.tokenReportPath, "Token report for Phase18 embedded prompt layout."),
);

const output = {
  ...base,
  manifest_version: "llm_judge_v2_2_phase18_uci_available_only_record_specific_contract_manifest_v1",
  status: "FROZEN_FOR_PHASE18_UCI_AVAILABLE_ONLY_RECORD_SPECIFIC_INVOCATION",
  frozen_at_local_date: "2026-06-21",
  scope: {
    ...base.scope,
    evaluation_method: "Phase 18 UCI available-only rerun using Phase13-style embedded pointwise prompts with Judge V2.2 record-specific scoring",
    datasets: ["SAMPLE_UCI_POR"],
    availability_gate: "status == executable",
    expected_dataset_task_cases: 24,
    expected_full_evaluation_record_count: 48,
    excluded_from_main_comparison: ["partial", "insufficient_data", "unsupported"],
    official_full_run_allowed: "approved_for_phase18_uci_available_only_record_specific_invocation",
  },
  versions: {
    ...base.versions,
    prompt_version: "judge_prompt_v2_2_record_specific_v1",
    invocation_layout_version: "embedded_prompt_full_context_v1",
  },
  session_policy: {
    ...base.session_policy,
    codex_project_strategy: "one_new_codex_chat_session_for_uci_available_only_no_goal_mode",
    dataset_runs: [{
      dataset_id: "SAMPLE_UCI_POR",
      expected_records: 48,
      expected_executable_tasks: 24,
      session_boundary: "one_new_codex_project_chat_session_without_goal_mode",
    }],
  },
  prompt_loading_policy: {
    packet_layout: "embedded_prompt_full_context",
    static_prompt_loaded_once_at_session_start: false,
    each_invocation_prompt_is_complete_pointwise_prompt: true,
    record_packets_do_not_compare_modes: true,
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
    embedded_prompt_queue_frozen: true,
    availability_gate_applied: true,
    judge_invocation_started: false,
    judge_invocation_allowed: true,
    next_required_step: "Prepare the 48-record UCI invocation manifest and launch the Phase18 master prompt in a new non-Goal Codex session.",
  },
  notes: [
    "Phase18 is the main UCI evaluation for executable tasks only.",
    "Phase17 full forced-run is retained as a diagnostic historical appendix.",
    "The judge session writes only raw JSON outputs; import, scoring and aggregation stay in the main project session.",
    "SAMPLE_OULAD remains blocked until Phase18 UCI import, scoring and aggregate review pass.",
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
