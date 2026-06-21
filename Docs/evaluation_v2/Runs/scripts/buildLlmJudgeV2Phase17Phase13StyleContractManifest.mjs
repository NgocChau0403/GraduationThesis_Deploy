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
for (const artifact of base.contract_artifacts) {
  if (artifact.artifact_id === "judge_prompt_v2_full_208" || artifact.artifact_id === "judge_prompt_v2_1_action_task_correction") {
    contractArtifacts.push(await pin("judge_prompt_v2_1_action_task_correction", args.promptPath));
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
  "phase15_semantic_output_audit",
  "phase16_uci_evidence_manifest",
  "phase16_baseline_explanation_manifest",
  "phase16_task_aware_v3_1_explanation_manifest",
  "phase16_judge_input_manifest",
  "phase16_judge_context_manifest",
  "phase16_session_static_prompt_queue_manifest",
  "phase16_session_static_token_budget_report",
  "phase16_semantic_output_audit",
  "phase16_fast_batch_readiness_audit",
]);

const provenanceArtifacts = [];
for (const artifact of base.provenance_artifacts.filter((item) => !replacedProvenanceIds.has(item.artifact_id))) {
  provenanceArtifacts.push(await pin(
    artifact.artifact_id,
    path.resolve(PROJECT_ROOT, artifact.path),
    artifact.reason,
  ));
}

provenanceArtifacts.push(
  await pin("phase17_uci_evidence_manifest", args.evidenceManifestPath, "UCI evidence slice reused for the final Phase13-style Judge V2.1 run."),
  await pin("phase17_baseline_explanation_manifest", args.baselineExplanationManifestPath, "Phase 8 baseline explanations reused for Judge V2.1 comparison."),
  await pin("phase17_task_aware_v3_1_explanation_manifest", args.taskAwareExplanationManifestPath, "Verified UCI Task-Aware V3.1 explanations from Phase 14."),
  await pin("phase17_judge_input_manifest", args.judgeInputManifestPath, "Verified UCI judge inputs for both explanation modes."),
  await pin("phase17_judge_context_manifest", args.judgeContextManifestPath, "Verified record-level contexts used by embedded full prompt packets."),
  await pin("phase17_embedded_prompt_queue_manifest", args.queueManifestPath, "UCI queue using Phase13-style embedded Judge Prompt V2.1 per record."),
  await pin("phase17_token_budget_report", args.tokenReportPath, "Token report for the Phase13-style embedded prompt layout."),
);

const output = {
  ...base,
  manifest_version: "llm_judge_v2_1_phase17_phase13_style_official_contract_manifest_v1",
  status: "FROZEN_FOR_PHASE17_UCI_PHASE13_STYLE_FINAL_INVOCATION",
  frozen_at_local_date: "2026-06-21",
  scope: {
    ...base.scope,
    evaluation_method: "Phase 17 final UCI rerun using Phase13-style embedded pointwise prompts with Judge V2.1",
    datasets: ["SAMPLE_UCI_POR"],
    expected_dataset_task_cases: 52,
    expected_full_evaluation_record_count: 104,
    official_full_run_allowed: "approved_for_phase17_uci_phase13_style_final_invocation",
  },
  versions: {
    ...base.versions,
    prompt_version: "judge_prompt_v2_1_full_208_action_task_correction_v1",
    invocation_layout_version: "embedded_prompt_full_context_v1",
  },
  session_policy: {
    ...base.session_policy,
    codex_project_strategy: "one_new_codex_chat_session_for_uci_phase13_style_no_goal_mode",
    dataset_runs: [{
      dataset_id: "SAMPLE_UCI_POR",
      expected_records: 104,
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
    judge_invocation_started: false,
    judge_invocation_allowed: true,
    next_required_step: "Prepare the 104-record UCI invocation manifest and launch the Phase 17 Phase13-style master prompt in a new non-Goal Codex session.",
  },
  notes: [
    "Phase 16 is retained as a historical failed semantic-quality attempt and is not used for final scoring.",
    "Phase 17 intentionally returns to Phase13-style complete pointwise invocation prompts.",
    "The judge session writes only raw JSON outputs; import, scoring and aggregation stay in the main project session.",
    "SAMPLE_OULAD remains blocked until UCI import, action regression, scoring and aggregate review pass.",
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
