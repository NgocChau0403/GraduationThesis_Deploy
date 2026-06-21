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
    "--semantic-audit-script": "semanticAuditScriptPath",
    "--readiness-audit-script": "readinessAuditScriptPath",
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

const retainedProvenance = base.provenance_artifacts.filter(
  (artifact) => ![
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
  ].includes(artifact.artifact_id),
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
  await pin("phase16_uci_evidence_manifest", args.evidenceManifestPath, "UCI evidence slice reused for the fast Codex batch judge run."),
  await pin("phase16_baseline_explanation_manifest", args.baselineExplanationManifestPath, "Phase 8 baseline explanations reused for Judge V2.1 comparison."),
  await pin("phase16_task_aware_v3_1_explanation_manifest", args.taskAwareExplanationManifestPath, "Verified UCI Task-Aware V3.1 explanations from Phase 14."),
  await pin("phase16_judge_input_manifest", args.judgeInputManifestPath, "Verified UCI judge inputs for both explanation modes."),
  await pin("phase16_judge_context_manifest", args.judgeContextManifestPath, "Verified record-level contexts reused by the record-only queue."),
  await pin("phase16_session_static_prompt_queue_manifest", args.queueManifestPath, "UCI queue with static Judge Prompt loaded once and 104 record-only packets."),
  await pin("phase16_session_static_token_budget_report", args.tokenReportPath, "Token report for the session-static record-context layout."),
  await pin("phase16_semantic_output_audit", args.semanticAuditScriptPath, "Structural and anti-template quality gate used after Codex batch output generation."),
  await pin("phase16_fast_batch_readiness_audit", args.readinessAuditScriptPath, "Readiness gate for Phase 16 contract, invocation manifest, output paths and raw-output pre-state."),
);

const output = {
  ...base,
  manifest_version: "llm_judge_v2_1_phase16_fast_codex_batch_official_contract_manifest_v1",
  status: "FROZEN_FOR_PHASE16_UCI_FAST_CODEX_BATCH_INVOCATION",
  frozen_at_local_date: "2026-06-21",
  scope: {
    ...base.scope,
    evaluation_method: "Phase 16 baseline versus Task-Aware V3.1 using one-session Codex Judge V2.1 fast batch evaluation",
    datasets: ["SAMPLE_UCI_POR"],
    expected_dataset_task_cases: 52,
    expected_full_evaluation_record_count: 104,
    official_full_run_allowed: "approved_for_phase16_uci_fast_codex_batch_invocation",
  },
  versions: {
    ...base.versions,
    prompt_version: "judge_prompt_v2_1_full_208_action_task_correction_v1",
    invocation_layout_version: "session_static_record_context_v1",
    semantic_audit_version: "llm_judge_v2_1_semantic_output_audit_v1",
    readiness_audit_version: "llm_judge_v2_1_phase16_fast_batch_readiness_v1",
  },
  session_policy: {
    ...base.session_policy,
    codex_project_strategy: "one_new_codex_chat_session_for_uci_fast_batch_no_goal_mode",
    dataset_runs: [{
      dataset_id: "SAMPLE_UCI_POR",
      expected_records: 104,
      session_boundary: "one_new_codex_project_chat_session_without_goal_mode",
    }],
  },
  prompt_loading_policy: {
    packet_layout: "session_static_record_context",
    static_prompt_loaded_once_at_session_start: true,
    static_prompt_reloaded_if_session_context_is_uncertain: true,
    record_packets_are_pointwise_and_do_not_embed_other_modes: true,
  },
  batch_quality_policy: {
    codex_goal_mode_allowed: false,
    openai_api_runner_allowed: false,
    lightweight_self_check_after_first_8_records: true,
    resume_condition: "first manifest row whose expected_raw_output_path either does not exist or is not parseable as valid JSON",
    repair_strategy: "flagged-record-only Codex repair session, then rerun import, semantic audit, scoring and aggregate for all 104 UCI records",
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
    session_static_queue_frozen: true,
    lightweight_8_record_self_check_required: true,
    judge_invocation_started: false,
    judge_invocation_allowed: true,
    next_required_step: "Prepare the 104-record UCI invocation manifest and launch the Phase 16 fast Codex batch master prompt in a new non-Goal Codex session.",
  },
  notes: [
    "Phase 13, Phase 14 and Phase 15 remain historical and are not modified by this contract.",
    "The Judge Prompt is loaded once per Codex session and each record packet contains only record-specific context.",
    "The judge session writes only raw JSON outputs; import, scoring and aggregation stay in the main project session.",
    "SAMPLE_OULAD remains blocked until the UCI import, semantic audit, scoring and action-task review pass.",
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
