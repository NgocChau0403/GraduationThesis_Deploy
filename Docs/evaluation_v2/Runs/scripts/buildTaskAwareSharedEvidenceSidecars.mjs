import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const toRepoPath = (filePath) => path.relative(PROJECT_ROOT, filePath).split(path.sep).join("/");
const hash = (text) => createHash("sha256").update(text).digest("hex");
const readJson = async (filePath) => JSON.parse((await readFile(filePath, "utf8")).replace(/^\uFEFF/, ""));
const readJsonl = async (filePath) => (await readFile(filePath, "utf8")).split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map(JSON.parse);
const repoPath = (value) => path.join(PROJECT_ROOT, ...String(value).split("/"));

const args = {};
for (let i = 2; i < process.argv.length; i += 2) args[process.argv[i].replace(/^--/, "")] = path.resolve(process.argv[i + 1]);
for (const key of ["task-aware-manifest", "output-dir"]) if (!args[key]) throw new Error(`Missing --${key}`);

const entries = (await readJsonl(args["task-aware-manifest"])).filter((entry) => entry.status === "explanation_ready");
await mkdir(args["output-dir"], { recursive: true });
const manifest = [];
for (const entry of entries) {
  const artifact = await readJson(repoPath(entry.explanation_artifact.path));
  const payload = artifact.response_body?.task_aware_evidence_payload
    ?? artifact.response_body?.meta?.task_aware_evidence_payload;
  if (!payload?.source_evidence_summary) throw new Error(`${entry.record_id} is missing task_aware_evidence_payload.`);
  const sidecar = {
    schema_version: "task_aware_shared_evidence_v1",
    case_id: entry.case_id,
    dataset_id: entry.dataset_id,
    task_id: entry.task_id,
    source_explanation_record_id: entry.record_id,
    source_explanation_artifact_sha256: entry.explanation_artifact.sha256,
    deterministic_summary: payload.source_evidence_summary,
    prompt_evidence_payload: payload.evidence_payload,
  };
  const text = `${JSON.stringify(sidecar, null, 2)}\n`;
  const filePath = path.join(args["output-dir"], `${entry.case_id}.json`);
  await writeFile(filePath, text, "utf8");
  manifest.push({
    case_id: entry.case_id,
    dataset_id: entry.dataset_id,
    task_id: entry.task_id,
    sidecar_path: toRepoPath(filePath),
    sidecar_sha256: hash(text),
    status: "ready",
  });
}
const manifestPath = path.join(args["output-dir"], "shared_evidence_manifest.jsonl");
await writeFile(manifestPath, `${manifest.map((entry) => JSON.stringify(entry)).join("\n")}\n`, "utf8");
process.stdout.write(`${JSON.stringify({ status: "PASS", records: manifest.length, manifest: toRepoPath(manifestPath) }, null, 2)}\n`);
