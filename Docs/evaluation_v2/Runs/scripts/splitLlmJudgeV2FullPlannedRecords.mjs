import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const FULL_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs/full_208");
const PLANNED_PATH = path.join(FULL_ROOT, "phase8_preflight_full/planned_records.jsonl");
const REPORT_JSON_PATH = path.join(FULL_ROOT, "phase8_preflight_full/phase8_preflight_full_report.json");
const REPORT_MD_PATH = path.join(FULL_ROOT, "phase8_preflight_full/phase8_preflight_full_report.md");
const SLICES_DIR = path.join(FULL_ROOT, "slices");

const DATASETS = ["SAMPLE_UCI_POR", "SAMPLE_OULAD"];
const MODES = ["baseline_first_20_rows", "task_aware_data_summarization"];

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, "/");
}

async function readJson(filePath) {
  return JSON.parse((await readFile(filePath, "utf8")).replace(/^\uFEFF/, ""));
}

async function readJsonl(filePath) {
  return (await readFile(filePath, "utf8"))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function jsonl(records) {
  return `${records.map((record) => JSON.stringify(record)).join("\n")}\n`;
}

function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}

function renderMarkdown(report) {
  const checks = report.checks.map((item) => `| ${item.check_id} | ${item.status} | ${item.summary} |`).join("\n");
  const slices = report.slice_summary.files.map((item) => `| \`${item.path}\` | ${item.records} | \`${item.sha256}\` |`).join("\n");
  return `# LLM Judge V2 Full 208 - Phase F1 Preflight Report

- Status: **${report.status}**
- Generated at: \`${report.generated_at}\`
- Primary cases: **${report.counts.primary_cases}**
- Planned records: **${report.counts.planned_records}**

## Acceptance checks

| Check | Status | Evidence |
|---|---:|---|
${checks}

## Slice outputs

| Slice | Records | SHA-256 |
|---|---:|---|
${slices}

## Gate decision

- \`phase_f2_allowed = ${report.gate_decision.phase_f2_allowed}\`
- \`full_judge_invocation_allowed = ${report.gate_decision.full_judge_invocation_allowed}\`
- \`official_full_evaluation_allowed = ${report.gate_decision.official_full_evaluation_allowed}\`

F1 only freezes the full case list and deterministic slices. Runtime evidence collection remains a separate Phase F2 action.
`;
}

export async function splitPlannedRecords() {
  const records = await readJsonl(PLANNED_PATH);
  const report = await readJson(REPORT_JSON_PATH);
  const ids = records.map((record) => record.record_id);
  const structuralErrors = [];

  for (const record of records) {
    const expectedId = `${record.dataset_id}__${record.task_id}__${record.explanation_mode}`;
    if (record.record_id !== expectedId) structuralErrors.push(`record_id mismatch: ${record.record_id}`);
    const expectedBucket = record.row_count <= 20 ? "<=20" : ">20";
    const expectedAccess = record.row_count <= 20 ? "direct_embedding" : "deterministic_artifact_retrieval";
    if (record.row_count_bucket !== expectedBucket) structuralErrors.push(`row_count_bucket mismatch: ${record.record_id}`);
    if (record.expected_evidence_access_path !== expectedAccess) structuralErrors.push(`evidence access mismatch: ${record.record_id}`);
  }

  if (records.length !== 208) structuralErrors.push(`planned record count is ${records.length}, expected 208`);
  if (new Set(ids).size !== ids.length) structuralErrors.push("duplicate record_id found");
  if (structuralErrors.length > 0) throw new Error(`Cannot split invalid planned records:\n${structuralErrors.join("\n")}`);

  await mkdir(SLICES_DIR, { recursive: true });
  const sliceFiles = [];
  for (const datasetId of DATASETS) {
    const allModes = records.filter((record) => record.dataset_id === datasetId);
    const allModesPath = path.join(SLICES_DIR, `planned_records__${datasetId}__all_modes.jsonl`);
    const allModesText = jsonl(allModes);
    await writeFile(allModesPath, allModesText, "utf8");
    sliceFiles.push({ path: toRepoPath(allModesPath), records: allModes.length, sha256: sha256Text(allModesText) });

    for (const mode of MODES) {
      const modeRecords = allModes.filter((record) => record.explanation_mode === mode);
      const modePath = path.join(SLICES_DIR, `planned_records__${datasetId}__${mode}.jsonl`);
      const modeText = jsonl(modeRecords);
      await writeFile(modePath, modeText, "utf8");
      sliceFiles.push({ path: toRepoPath(modePath), records: modeRecords.length, sha256: sha256Text(modeText) });
    }
  }

  const expectedCountsPass = sliceFiles.every((item) => item.path.endsWith("__all_modes.jsonl") ? item.records === 104 : item.records === 52);
  report.generated_at = new Date().toISOString();
  report.slice_summary = { status: expectedCountsPass ? "PASS" : "FAIL", files: sliceFiles };
  report.checks = (report.checks ?? []).filter((item) => item.check_id !== "slice_counts");
  report.checks.push({
    check_id: "slice_counts",
    status: expectedCountsPass ? "PASS" : "FAIL",
    summary: "2 all-mode slices contain 104 records each; 4 dataset-mode slices contain 52 records each",
  });
  report.status = report.checks.every((item) => item.status === "PASS") ? "PASS" : "FAIL";
  report.gate_decision = {
    phase_f2_allowed: report.status === "PASS",
    full_judge_invocation_allowed: false,
    official_full_evaluation_allowed: false,
    reason: report.status === "PASS"
      ? "F1 manifest, planned records and all deterministic slices passed validation."
      : "One or more F1 acceptance checks failed.",
  };

  await writeFile(REPORT_JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(REPORT_MD_PATH, renderMarkdown(report), "utf8");
  return { status: report.status, slices: sliceFiles };
}

const isDirectRun = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isDirectRun) {
  splitPlannedRecords()
    .then((result) => {
      console.log(JSON.stringify(result, null, 2));
      if (result.status !== "PASS") process.exitCode = 1;
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
