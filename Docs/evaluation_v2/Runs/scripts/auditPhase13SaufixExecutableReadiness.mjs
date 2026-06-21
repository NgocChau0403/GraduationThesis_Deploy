import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const args = {};
for (let i = 2; i < process.argv.length; i += 2) args[process.argv[i].replace(/^--/, "")] = path.resolve(process.argv[i + 1]);
for (const key of ["contract", "master-prompt", "invocation-manifest"]) if (!args[key]) throw new Error(`Missing --${key}`);
const readText = async (filePath) => (await readFile(filePath, "utf8")).replace(/^\uFEFF/, "");
const hashFile = async (filePath) => createHash("sha256").update(await readFile(filePath)).digest("hex");
const issues = [];
const contract = JSON.parse(await readText(args.contract));
const records = (await readText(args["invocation-manifest"])).split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map(JSON.parse);
if (contract.status !== "FROZEN_FOR_PHASE13_SAUFIX_EXECUTABLE_ONLY_INVOCATION") issues.push("contract_status");
if (records.length !== 48) issues.push(`record_count:${records.length}`);
const tasks = new Set(records.map((record) => record.task_id));
if (tasks.size !== 24) issues.push(`task_count:${tasks.size}`);
for (const mode of ["baseline_first_20_rows", "task_aware_data_summarization"]) if (records.filter((record) => record.explanation_mode === mode).length !== 24) issues.push(`mode_count:${mode}`);
for (const artifact of [...contract.contract_artifacts, ...contract.provenance_artifacts]) {
  const filePath = path.join(PROJECT_ROOT, ...artifact.path.split("/"));
  try { await stat(filePath); } catch { issues.push(`missing:${artifact.path}`); continue; }
  if (await hashFile(filePath) !== artifact.sha256) issues.push(`hash:${artifact.path}`);
}
const officialText = [await readText(args.contract), await readText(args["master-prompt"]), await readText(args["invocation-manifest"])].join("\n");
if (/phase1[4-8]/i.test(officialText)) issues.push("later_phase_reference");
const promptText = await readText(path.join(PROJECT_ROOT, ...contract.contract_artifacts[0].path.split("/")));
for (const clause of ["recommendations=[]", "must not by itself", "existing supported actions", "invented action, priority, urgency, owner"]) if (!promptText.includes(clause)) issues.push(`action_clause:${clause}`);
const fixtureArtifact = contract.contract_artifacts.find((artifact) => artifact.artifact_id === "action_synthesis_policy_fixture");
if (!fixtureArtifact) {
  issues.push("action_fixture_missing");
} else {
  const fixture = JSON.parse(await readText(path.join(PROJECT_ROOT, ...fixtureArtifact.path.split("/"))));
  const byId = Object.fromEntries((fixture.cases ?? []).map((item) => [item.case_id, item]));
  if (byId.empty_recommendations_with_supported_action_explanation?.expected_missing_required_output !== false) issues.push("fixture_empty_recommendations");
  if (byId.supported_action_omitted?.expected_missing_required_output !== true) issues.push("fixture_omitted_action");
  if (byId.invented_action?.expected_policy_violation !== true) issues.push("fixture_invented_action");
}
const master = await readText(args["master-prompt"]);
for (const clause of ["new Codex project and a new chat session", "Process all 48 records", "Do not run import, scoring or aggregate comparison"]) if (!master.includes(clause)) issues.push(`master_clause:${clause}`);
process.stdout.write(`${JSON.stringify({ status: issues.length ? "FAIL" : "PASS", contract_sha256: await hashFile(args.contract), counts: { records: records.length, tasks: tasks.size }, issues }, null, 2)}\n`);
if (issues.length) process.exitCode = 1;
