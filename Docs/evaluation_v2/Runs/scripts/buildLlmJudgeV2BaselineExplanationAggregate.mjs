import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs/full_208");
const BASELINE_ROOT = path.join(ROOT, "phase8_explanations/baseline_first_20_rows");
const OUTPUT_MANIFEST_PATH = path.join(BASELINE_ROOT, "explanation_manifest_baseline_104.jsonl");
const OUTPUT_REPORT_JSON_PATH = path.join(BASELINE_ROOT, "explanation_aggregate_report.json");
const OUTPUT_REPORT_MD_PATH = path.join(BASELINE_ROOT, "explanation_aggregate_report.md");
const DATASETS = ["SAMPLE_UCI_POR", "SAMPLE_OULAD"];
const EXPECTED_MODE = "baseline_first_20_rows";
const EXPECTED_PER_DATASET = 52;
const EXPECTED_TOTAL = 104;

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, "/");
}

function repoPathToAbsolute(repoPath) {
  return path.join(PROJECT_ROOT, ...String(repoPath).split("/"));
}

async function readJson(filePath) {
  return JSON.parse((await readFile(filePath, "utf8")).replace(/^\uFEFF/, ""));
}

async function readJsonl(filePath) {
  const text = await readFile(filePath, "utf8");
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function jsonl(records) {
  return `${records.map((record) => JSON.stringify(record)).join("\n")}\n`;
}

async function sha256File(filePath) {
  const bytes = await readFile(filePath);
  return createHash("sha256").update(bytes).digest("hex");
}

function issue(severity, code, message, details = {}) {
  return { severity, code, message, details };
}

async function verifyDataset(datasetId) {
  const datasetDir = path.join(BASELINE_ROOT, datasetId);
  const manifestPath = path.join(datasetDir, "explanation_manifest.jsonl");
  const reportJsonPath = path.join(datasetDir, "explanation_report.json");
  const manifestRecords = await readJsonl(manifestPath);
  const report = await readJson(reportJsonPath);
  const issues = [];

  if (report.status !== "PASS") {
    issues.push(issue("error", "dataset_report_not_pass", `${datasetId} explanation report is not PASS.`, { status: report.status }));
  }
  if (manifestRecords.length !== EXPECTED_PER_DATASET) {
    issues.push(issue("error", "dataset_record_count_mismatch", `${datasetId} manifest does not contain 52 records.`, { actual: manifestRecords.length }));
  }
  if (report.counts?.explanation_ready_records !== EXPECTED_PER_DATASET) {
    issues.push(issue("error", "dataset_ready_count_mismatch", `${datasetId} report does not show 52 ready records.`, { actual: report.counts?.explanation_ready_records }));
  }

  let artifactHashMatches = 0;
  let sourceEvidenceHashMatches = 0;
  let requestPayloadPresent = 0;
  let nonEmptyRawText = 0;

  for (const record of manifestRecords) {
    if (record.dataset_id !== datasetId) {
      issues.push(issue("error", "dataset_id_mismatch", "Manifest record is in the wrong dataset slice.", { record_id: record.record_id, dataset_id: record.dataset_id, expected: datasetId }));
    }
    if (record.status !== "explanation_ready") {
      issues.push(issue("error", "record_not_ready", "Manifest record is not explanation_ready.", { record_id: record.record_id, status: record.status }));
    }
    if (record.explanation_mode !== EXPECTED_MODE) {
      issues.push(issue("error", "explanation_mode_mismatch", "Manifest record has unexpected explanation mode.", { record_id: record.record_id, explanation_mode: record.explanation_mode }));
    }
    if (record.observed_ai_summary_method !== EXPECTED_MODE) {
      issues.push(issue("error", "observed_mode_mismatch", "Manifest record observed the wrong AI summary method.", { record_id: record.record_id, observed_ai_summary_method: record.observed_ai_summary_method }));
    }
    if (record.degraded !== false) {
      issues.push(issue("error", "record_degraded", "Manifest record is degraded.", { record_id: record.record_id, degraded: record.degraded }));
    }
    if (!record.explanation_artifact?.path || !record.explanation_artifact?.sha256) {
      issues.push(issue("error", "missing_explanation_artifact_hash", "Manifest record is missing explanation artifact path or hash.", { record_id: record.record_id }));
      continue;
    }

    const artifactPath = repoPathToAbsolute(record.explanation_artifact.path);
    const actualArtifactHash = await sha256File(artifactPath);
    if (actualArtifactHash === record.explanation_artifact.sha256) {
      artifactHashMatches += 1;
    } else {
      issues.push(issue("error", "explanation_artifact_hash_mismatch", "Explanation artifact hash does not match bytes on disk.", { record_id: record.record_id, expected: record.explanation_artifact.sha256, actual: actualArtifactHash }));
    }

    const artifact = await readJson(artifactPath);
    if (artifact.request_payload && Object.keys(artifact.request_payload).length > 0) requestPayloadPresent += 1;
    if (typeof artifact.raw_text === "string" && artifact.raw_text.trim()) nonEmptyRawText += 1;

    const sourcePath = artifact.source_evidence?.full_query_artifact_path;
    const sourceSha = artifact.source_evidence?.full_query_artifact_sha256;
    if (!sourcePath || !sourceSha) {
      issues.push(issue("error", "missing_source_evidence_linkage", "Explanation artifact is missing source evidence linkage.", { record_id: record.record_id }));
      continue;
    }
    const actualSourceHash = await sha256File(repoPathToAbsolute(sourcePath));
    if (actualSourceHash === sourceSha) {
      sourceEvidenceHashMatches += 1;
    } else {
      issues.push(issue("error", "source_evidence_hash_mismatch", "Source evidence artifact hash does not match bytes on disk.", { record_id: record.record_id, expected: sourceSha, actual: actualSourceHash }));
    }
  }

  return {
    datasetId,
    manifestPath,
    reportJsonPath,
    report,
    manifestRecords,
    counts: {
      records: manifestRecords.length,
      ready: manifestRecords.filter((record) => record.status === "explanation_ready").length,
      degraded: manifestRecords.filter((record) => record.degraded === true).length,
      observed_baseline: manifestRecords.filter((record) => record.observed_ai_summary_method === EXPECTED_MODE).length,
      artifact_hash_matches: artifactHashMatches,
      source_evidence_hash_matches: sourceEvidenceHashMatches,
      request_payload_present: requestPayloadPresent,
      non_empty_raw_text: nonEmptyRawText,
    },
    issues,
  };
}

async function main() {
  const datasetResults = [];
  for (const datasetId of DATASETS) {
    datasetResults.push(await verifyDataset(datasetId));
  }

  const records = datasetResults.flatMap((result) => result.manifestRecords);
  const recordIds = records.map((record) => record.record_id);
  const uniqueRecordIds = new Set(recordIds);
  const duplicateRecordIds = [...uniqueRecordIds].filter((recordId) => recordIds.filter((value) => value === recordId).length > 1);
  const issues = datasetResults.flatMap((result) => result.issues);

  if (records.length !== EXPECTED_TOTAL) {
    issues.push(issue("error", "aggregate_record_count_mismatch", "Aggregate baseline manifest must contain 104 records.", { actual: records.length, expected: EXPECTED_TOTAL }));
  }
  if (uniqueRecordIds.size !== EXPECTED_TOTAL) {
    issues.push(issue("error", "aggregate_record_id_uniqueness_mismatch", "Aggregate baseline manifest must contain 104 unique record IDs.", { unique: uniqueRecordIds.size, expected: EXPECTED_TOTAL, duplicate_record_ids: duplicateRecordIds }));
  }

  const byDataset = Object.fromEntries(datasetResults.map((result) => [
    result.datasetId,
    {
      records: result.counts.records,
      ready: result.counts.ready,
      degraded: result.counts.degraded,
      observed_baseline: result.counts.observed_baseline,
      artifact_hash_matches: result.counts.artifact_hash_matches,
      source_evidence_hash_matches: result.counts.source_evidence_hash_matches,
      request_payload_present: result.counts.request_payload_present,
      non_empty_raw_text: result.counts.non_empty_raw_text,
      report_json: toRepoPath(result.reportJsonPath),
      manifest_jsonl: toRepoPath(result.manifestPath),
    },
  ]));

  const status = issues.some((entry) => entry.severity === "error") ? "FAIL" : "PASS";
  const report = {
    report_version: "llm_judge_v2_phase_f3_baseline_explanation_aggregate_v1",
    generated_at: new Date().toISOString(),
    status,
    phase_scope: ["F3 baseline explanation aggregate"],
    inputs: {
      dataset_manifests: Object.fromEntries(datasetResults.map((result) => [result.datasetId, toRepoPath(result.manifestPath)])),
      dataset_reports: Object.fromEntries(datasetResults.map((result) => [result.datasetId, toRepoPath(result.reportJsonPath)])),
    },
    counts: {
      expected_records: EXPECTED_TOTAL,
      aggregate_records: records.length,
      unique_record_ids: uniqueRecordIds.size,
      explanation_ready_records: records.filter((record) => record.status === "explanation_ready").length,
      degraded_records: records.filter((record) => record.degraded === true).length,
      mode_mismatch_records: records.filter((record) => record.observed_ai_summary_method !== EXPECTED_MODE).length,
      explanation_artifact_hash_matches: datasetResults.reduce((sum, result) => sum + result.counts.artifact_hash_matches, 0),
      source_evidence_hash_matches: datasetResults.reduce((sum, result) => sum + result.counts.source_evidence_hash_matches, 0),
      request_payload_present: datasetResults.reduce((sum, result) => sum + result.counts.request_payload_present, 0),
      non_empty_raw_text: datasetResults.reduce((sum, result) => sum + result.counts.non_empty_raw_text, 0),
      errors: issues.filter((entry) => entry.severity === "error").length,
      warnings: issues.filter((entry) => entry.severity === "warning").length,
    },
    by_dataset: byDataset,
    outputs: {
      explanation_manifest_baseline_104_jsonl: toRepoPath(OUTPUT_MANIFEST_PATH),
      explanation_aggregate_report_json: toRepoPath(OUTPUT_REPORT_JSON_PATH),
      explanation_aggregate_report_md: toRepoPath(OUTPUT_REPORT_MD_PATH),
    },
    gate_decision: {
      baseline_aggregate_complete: status === "PASS",
      phase_f4_task_aware_explanations_allowed: status === "PASS",
      phase6_4_judge_input_materializer_allowed: false,
      judge_invocation_allowed: false,
      official_full_evaluation_allowed: false,
      reason: status === "PASS"
        ? "Baseline aggregate is complete. Switch AIService to task_aware_data_summarization and run Phase F4 next; judge input materialization remains disabled."
        : "Baseline aggregate found errors. Fix before Phase F4 or judge input materialization.",
    },
    issues,
  };

  await writeFile(OUTPUT_MANIFEST_PATH, jsonl(records), "utf8");
  await writeFile(OUTPUT_REPORT_JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(OUTPUT_REPORT_MD_PATH, [
    "# LLM Judge V2 Phase F3 Baseline Explanation Aggregate Report",
    "",
    `- Generated at: ${report.generated_at}`,
    `- Status: **${status}**`,
    `- Aggregate baseline records: **${records.length}/${EXPECTED_TOTAL}**`,
    `- Unique record IDs: **${uniqueRecordIds.size}/${EXPECTED_TOTAL}**`,
    `- Explanation-ready records: **${report.counts.explanation_ready_records}/${EXPECTED_TOTAL}**`,
    `- Degraded records: **${report.counts.degraded_records}**`,
    `- Mode mismatches: **${report.counts.mode_mismatch_records}**`,
    `- Explanation artifact hashes verified: **${report.counts.explanation_artifact_hash_matches}/${EXPECTED_TOTAL}**`,
    `- Source evidence hashes verified: **${report.counts.source_evidence_hash_matches}/${EXPECTED_TOTAL}**`,
    `- Request payload provenance present: **${report.counts.request_payload_present}/${EXPECTED_TOTAL}**`,
    "",
    "## By Dataset",
    "",
    "| Dataset | Records | Ready | Degraded | Observed baseline | Artifact hashes | Source evidence hashes |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: |",
    ...DATASETS.map((datasetId) => {
      const row = byDataset[datasetId];
      return `| ${datasetId} | ${row.records} | ${row.ready} | ${row.degraded} | ${row.observed_baseline} | ${row.artifact_hash_matches} | ${row.source_evidence_hash_matches} |`;
    }),
    "",
    "## Gate Decision",
    "",
    `- Baseline aggregate complete: ${report.gate_decision.baseline_aggregate_complete}`,
    `- Phase F4 task-aware explanations allowed: ${report.gate_decision.phase_f4_task_aware_explanations_allowed}`,
    `- Judge input materializer allowed: ${report.gate_decision.phase6_4_judge_input_materializer_allowed}`,
    `- Judge invocation allowed: ${report.gate_decision.judge_invocation_allowed}`,
    `- Reason: ${report.gate_decision.reason}`,
    "",
    "## Outputs",
    "",
    `- Baseline 104 manifest: \`${report.outputs.explanation_manifest_baseline_104_jsonl}\``,
    `- JSON report: \`${report.outputs.explanation_aggregate_report_json}\``,
    `- Markdown report: \`${report.outputs.explanation_aggregate_report_md}\``,
    "",
    "## Issues",
    "",
    issues.length
      ? issues.map((entry) => `- ${entry.severity.toUpperCase()} ${entry.code}: ${entry.message}`).join("\n")
      : "No issues found.",
    "",
  ].join("\n"), "utf8");

  console.log(JSON.stringify({
    ok: status === "PASS",
    status,
    aggregate_records: records.length,
    unique_record_ids: uniqueRecordIds.size,
    explanation_ready_records: report.counts.explanation_ready_records,
    degraded_records: report.counts.degraded_records,
    mode_mismatch_records: report.counts.mode_mismatch_records,
    explanation_artifact_hash_matches: report.counts.explanation_artifact_hash_matches,
    source_evidence_hash_matches: report.counts.source_evidence_hash_matches,
    baseline_aggregate_complete: report.gate_decision.baseline_aggregate_complete,
    phase_f4_task_aware_explanations_allowed: report.gate_decision.phase_f4_task_aware_explanations_allowed,
    outputs: report.outputs,
  }, null, 2));

  if (status !== "PASS") {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
