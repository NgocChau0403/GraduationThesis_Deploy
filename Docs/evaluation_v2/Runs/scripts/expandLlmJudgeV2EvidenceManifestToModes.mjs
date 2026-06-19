import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs/full_208");
const EVIDENCE_ROOT = path.join(ROOT, "phase8_evidence_sql");
const PLANNED_PATH = path.join(ROOT, "phase8_preflight_full/planned_records.jsonl");
const DATASETS = ["SAMPLE_UCI_POR", "SAMPLE_OULAD"];

async function readJsonl(filePath) {
  return (await readFile(filePath, "utf8")).split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => JSON.parse(line));
}

function jsonl(records) {
  return `${records.map((record) => JSON.stringify(record)).join("\n")}\n`;
}

async function main() {
  const taskEntries = [];
  for (const datasetId of DATASETS) taskEntries.push(...await readJsonl(path.join(EVIDENCE_ROOT, datasetId, "evidence_manifest.jsonl")));
  const planned = await readJsonl(PLANNED_PATH);
  const byEvidenceId = new Map(taskEntries.map((entry) => [entry.evidence_id, entry]));
  if (taskEntries.length !== 104 || byEvidenceId.size !== 104 || taskEntries.some((entry) => entry.status !== "evidence_ready")) throw new Error("Aggregate expansion requires 104 unique task-level evidence records ready.");
  let artifactHashMatches = 0;
  for (const entry of taskEntries) {
    const artifactBytes = await readFile(path.join(PROJECT_ROOT, ...entry.full_query_artifact.path.split("/")));
    const actualHash = createHash("sha256").update(artifactBytes).digest("hex");
    if (actualHash === entry.full_query_artifact.sha256) artifactHashMatches += 1;
  }
  if (artifactHashMatches !== 104) throw new Error(`Only ${artifactHashMatches}/104 full-query artifact hashes match.`);
  const expanded = planned.map((record) => {
    const evidenceId = `${record.dataset_id}__${record.task_id}`;
    const evidence = byEvidenceId.get(evidenceId);
    if (!evidence) throw new Error(`Missing task-level evidence: ${evidenceId}`);
    return { record_id: record.record_id, dataset_id: record.dataset_id, task_id: record.task_id, explanation_mode: record.explanation_mode, status: "evidence_ready", evidence_id: evidence.evidence_id, evidence_grain: evidence.evidence_grain, expected_evidence_access_path: evidence.expected_evidence_access_path, row_count_observed: evidence.row_count_observed, row_count_bucket_observed: evidence.row_count_bucket_observed, full_query_artifact: evidence.full_query_artifact, retrieval_plan: evidence.retrieval_plan };
  });
  if (expanded.length !== 208 || new Set(expanded.map((entry) => entry.record_id)).size !== 208) throw new Error("Expanded evidence must contain 208 unique mode-level records.");
  const incorrectlyExpanded = [...byEvidenceId.keys()].filter((evidenceId) => {
    const linked = expanded.filter((entry) => entry.evidence_id === evidenceId);
    return linked.length !== 2 || new Set(linked.map((entry) => entry.explanation_mode)).size !== 2;
  });
  if (incorrectlyExpanded.length > 0) throw new Error(`${incorrectlyExpanded.length} task-level evidence records do not link to exactly two modes.`);
  const terminalInvalidTaskLevel = taskEntries.filter((entry) => entry.execution_outcome?.status === "terminal_invalid_empty_result").length;
  const terminalInvalidModeLevel = expanded.filter((entry) => byEvidenceId.get(entry.evidence_id)?.execution_outcome?.status === "terminal_invalid_empty_result").length;
  const report = {
    report_version: "llm_judge_v2_phase_f2_evidence_aggregate_v1",
    generated_at: new Date().toISOString(),
    status: "PASS",
    counts: { task_level_evidence: taskEntries.length, unique_task_level_evidence_ids: byEvidenceId.size, mode_level_evidence: expanded.length, unique_mode_level_record_ids: new Set(expanded.map((entry) => entry.record_id)).size, evidence_ready_task_level: taskEntries.filter((entry) => entry.status === "evidence_ready").length, evidence_ready_mode_level: expanded.filter((entry) => entry.status === "evidence_ready").length, artifact_hash_matches: artifactHashMatches, task_level_records_linked_to_exactly_two_modes: byEvidenceId.size - incorrectlyExpanded.length, terminal_invalid_task_level: terminalInvalidTaskLevel, terminal_invalid_mode_level: terminalInvalidModeLevel },
    by_dataset: Object.fromEntries(DATASETS.map((datasetId) => [datasetId, { task_level: taskEntries.filter((entry) => entry.dataset_id === datasetId).length, mode_level: expanded.filter((entry) => entry.dataset_id === datasetId).length }])),
    gate_decision: { phase_f3_allowed: true, full_judge_invocation_allowed: false, official_full_evaluation_allowed: false },
  };
  await writeFile(path.join(EVIDENCE_ROOT, "evidence_manifest_104_dataset_task.jsonl"), jsonl(taskEntries), "utf8");
  await writeFile(path.join(EVIDENCE_ROOT, "evidence_manifest_208_mode_records.jsonl"), jsonl(expanded), "utf8");
  await writeFile(path.join(EVIDENCE_ROOT, "evidence_aggregate_report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(path.join(EVIDENCE_ROOT, "evidence_aggregate_report.md"), `# LLM Judge V2 Phase F2 Evidence Aggregate Report\n\n- Status: **PASS**\n- Task-level evidence: **104/104**, unique IDs: **104**\n- Expanded mode-level evidence: **208/208**, unique record IDs: **208**\n- Full-query artifact hashes verified: **104/104**\n- Task-level evidence linked to exactly two modes: **104/104**\n- UCI: **52 task-level / 104 mode-level**\n- OULAD: **52 task-level / 104 mode-level**\n- Explicit terminal-invalid evidence: **${terminalInvalidTaskLevel} task-level / ${terminalInvalidModeLevel} mode-level**\n- Phase F3 allowed: \`true\`\n- Full judge invocation allowed: \`false\`\n`, "utf8");
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => { console.error(error.stack || error.message); process.exitCode = 1; });
