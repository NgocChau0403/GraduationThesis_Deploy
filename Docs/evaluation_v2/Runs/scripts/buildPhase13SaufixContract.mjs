import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const toRepoPath = (filePath) => path.relative(PROJECT_ROOT, filePath).split(path.sep).join("/");
const hashFile = async (filePath) => createHash("sha256").update(await readFile(filePath)).digest("hex");

const values = {};
for (let i = 2; i < process.argv.length; i += 2) {
  const key = process.argv[i].replace(/^--/, "");
  const value = process.argv[i + 1];
  values[key] = ["dataset", "expected-count"].includes(key) ? value : path.resolve(value);
}
for (const key of ["prompt", "rubric", "anchors", "requirements", "action-fixture", "response-schema", "availability-gate", "baseline-manifest", "task-aware-manifest", "evidence-manifest", "judge-input-manifest", "context-manifest", "queue-manifest", "token-report", "output-manifest"]) {
  if (!values[key]) throw new Error(`Missing --${key}`);
}

const contractFiles = [
  ["judge_prompt_v2_phase13_action_synthesis_correction", values.prompt],
  ["judge_rubric_1_to_10_phase13", values.rubric],
  ["metric_anchor_spec_phase13", values.anchors],
  ["task_evaluation_requirements_phase13", values.requirements],
  ["action_synthesis_policy_fixture", values["action-fixture"]],
  ["judge_response_schema_v1", values["response-schema"]],
];
const provenanceFiles = [
  ["availability_gate", values["availability-gate"]],
  ["baseline_explanation_manifest_24", values["baseline-manifest"]],
  ["task_aware_saufix_manifest_24", values["task-aware-manifest"]],
  ["evidence_manifest_48", values["evidence-manifest"]],
  ["judge_input_manifest_48", values["judge-input-manifest"]],
  ["judge_context_manifest_48", values["context-manifest"]],
  ["prompt_queue_manifest_48", values["queue-manifest"]],
  ["token_budget_report_48", values["token-report"]],
];
const pin = async ([artifactId, filePath]) => ({ artifact_id: artifactId, path: toRepoPath(filePath), sha256: await hashFile(filePath) });
const output = {
  manifest_version: "llm_judge_v2_phase13_saufix_executable_only_contract_v1",
  status: "FROZEN_FOR_PHASE13_SAUFIX_EXECUTABLE_ONLY_INVOCATION",
  dataset_scope: values.dataset || "SAMPLE_UCI_POR",
  expected_record_count: Number(values["expected-count"] || 48),
  explanation_modes: ["baseline_first_20_rows", "task_aware_data_summarization"],
  judge_execution_policy: "phase13_pointwise_manifest_order_json_only",
  contract_artifacts: await Promise.all(contractFiles.map(pin)),
  provenance_artifacts: await Promise.all(provenanceFiles.map(pin)),
  gate_decision: { judge_invocation_allowed: true, scoring_allowed_before_import: false },
};
await mkdir(path.dirname(values["output-manifest"]), { recursive: true });
await writeFile(values["output-manifest"], `${JSON.stringify(output, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({ status: "PASS", output_manifest: toRepoPath(values["output-manifest"]), output_sha256: await hashFile(values["output-manifest"]), pinned_artifacts: 14 }, null, 2)}\n`);
