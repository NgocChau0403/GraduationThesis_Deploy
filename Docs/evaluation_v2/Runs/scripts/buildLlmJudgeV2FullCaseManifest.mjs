import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { splitPlannedRecords } from "./splitLlmJudgeV2FullPlannedRecords.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const FULL_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs/full_208");
const PREFLIGHT_DIR = path.join(FULL_ROOT, "phase8_preflight_full");

const PATHS = {
  contractManifest: "Docs/evaluation_v2/Runs/pilot_contract_manifest_v1.json",
  readinessReport: "Docs/evaluation_v2/Runs/full_208/phase8_readiness/full_208_readiness_report.json",
  taskRequirements: "Docs/evaluation_v2/Rubric/task_evaluation_requirements.json",
  rowCountRecords: "Docs/evaluation_v2/Handle20rows/outputs/row_count_records.jsonl",
  rowCountDistribution: "Docs/evaluation_v2/Handle20rows/outputs/row_count_distribution.json",
};
const DATASETS = ["SAMPLE_UCI_POR", "SAMPLE_OULAD"];
const MODES = ["baseline_first_20_rows", "task_aware_data_summarization"];

function absolute(repoPath) {
  return path.join(PROJECT_ROOT, ...repoPath.split("/"));
}

async function readText(repoPath) {
  return (await readFile(absolute(repoPath), "utf8")).replace(/^\uFEFF/, "");
}

async function readJson(repoPath) {
  return JSON.parse(await readText(repoPath));
}

async function readJsonl(repoPath) {
  return (await readText(repoPath)).split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => JSON.parse(line));
}

async function sha256File(repoPath) {
  return createHash("sha256").update(await readFile(absolute(repoPath))).digest("hex");
}

function jsonl(records) {
  return `${records.map((record) => JSON.stringify(record)).join("\n")}\n`;
}

function expectedAccess(rowCount) {
  return rowCount <= 20 ? "direct_embedding" : "deterministic_artifact_retrieval";
}

function expectedBucket(rowCount) {
  return rowCount <= 20 ? "<=20" : ">20";
}

function samePhase3Metadata(left, right) {
  return ["dataset_id", "class_id", "student_id", "role", "task_id", "status", "row_count", "row_count_bucket"]
    .every((field) => left[field] === right[field]);
}

function addCheck(checks, checkId, passed, summary) {
  checks.push({ check_id: checkId, status: passed ? "PASS" : "FAIL", summary });
}

async function main() {
  const generatedAt = new Date().toISOString();
  const [contract, readiness, requirements, records, distribution] = await Promise.all([
    readJson(PATHS.contractManifest),
    readJson(PATHS.readinessReport),
    readJson(PATHS.taskRequirements),
    readJsonl(PATHS.rowCountRecords),
    readJson(PATHS.rowCountDistribution),
  ]);
  const checks = [];
  addCheck(checks, "phase_f0_gate", readiness.status === "PASS" && readiness.gate_decision?.phase_f1_allowed === true, "F0 report is PASS and allows Phase F1");

  const requirementByTask = new Map((requirements.tasks ?? []).map((task) => [task.task_id, task]));
  const recordsByCase = new Map();
  for (const record of records) {
    const key = `${record.dataset_id}::${record.task_id}`;
    if (!recordsByCase.has(key)) recordsByCase.set(key, []);
    recordsByCase.get(key).push(record);
  }

  const primaryCases = [];
  const plannedRecords = [];
  const sourceConsistencyErrors = [];
  for (const datasetId of DATASETS) {
    const datasetEntries = [...recordsByCase.entries()]
      .filter(([, caseRecords]) => caseRecords[0].dataset_id === datasetId)
      .sort((a, b) => a[1][0].task_id.localeCompare(b[1][0].task_id));

    for (const [, caseRecords] of datasetEntries) {
      const byMode = new Map(caseRecords.map((record) => [record.mode, record]));
      const baseline = byMode.get(MODES[0]);
      const taskAware = byMode.get(MODES[1]);
      if (!baseline || !taskAware || caseRecords.length !== 2 || !samePhase3Metadata(baseline, taskAware)) {
        sourceConsistencyErrors.push(`${datasetId}::${caseRecords[0]?.task_id ?? "unknown"}`);
        continue;
      }
      const requirement = requirementByTask.get(baseline.task_id);
      if (!requirement) {
        sourceConsistencyErrors.push(`${datasetId}::${baseline.task_id} missing requirements`);
        continue;
      }

      const caseId = `${datasetId}__${baseline.task_id}`;
      const common = {
        case_id: caseId,
        dataset_id: datasetId,
        class_id: baseline.class_id,
        student_id: baseline.student_id,
        role: baseline.role,
        task_id: baseline.task_id,
        task_name: requirement.task_name,
        target_audience: requirement.target_audience,
        scope: requirement.scope,
        row_count: baseline.row_count,
        row_count_bucket: baseline.row_count_bucket,
        expected_evidence_access_path: expectedAccess(baseline.row_count),
      };
      primaryCases.push({ ...common, expected_modes: MODES, expected_judge_records: 2 });

      for (const mode of MODES) {
        const sourceRecord = byMode.get(mode);
        plannedRecords.push({
          record_id: `${datasetId}__${baseline.task_id}__${mode}`,
          ...common,
          explanation_mode: mode,
          phase3_status: sourceRecord.status,
          dataset_breakdown: sourceRecord.dataset_breakdown,
          row_count_source: {
            path: PATHS.rowCountRecords,
            sha256: await sha256File(PATHS.rowCountRecords),
            source_generated_at: sourceRecord.source?.generated_at ?? distribution.generated_at ?? null,
            matched_mode: mode,
          },
          materialized_requirement_summary: {
            review_status: requirement.review_status,
            required_core_output_count: requirement.required_core_outputs?.length ?? 0,
            required_supporting_output_count: requirement.required_supporting_outputs?.length ?? 0,
            evaluation_constraint_count: requirement.evaluation_constraints?.length ?? 0,
            safety_fairness_applicability: requirement.safety_fairness_applicability,
          },
          next_phase: "phase_f2_evidence_collection",
        });
      }
    }
  }

  const ids = plannedRecords.map((record) => record.record_id);
  const taskCoverage = DATASETS.map((datasetId) => ({
    dataset_id: datasetId,
    unique_tasks: new Set(plannedRecords.filter((record) => record.dataset_id === datasetId).map((record) => record.task_id)).size,
    planned_records: plannedRecords.filter((record) => record.dataset_id === datasetId).length,
  }));
  addCheck(checks, "primary_case_count", primaryCases.length === 104, `${primaryCases.length}/104 dataset-task primary cases`);
  addCheck(checks, "planned_record_count", plannedRecords.length === 208, `${plannedRecords.length}/208 mode-level planned records`);
  addCheck(checks, "task_coverage", taskCoverage.every((item) => item.unique_tasks === 52 && item.planned_records === 104), "Each dataset has 52 tasks and 104 mode-level records");
  addCheck(checks, "no_duplicate_record_id", new Set(ids).size === ids.length, `${new Set(ids).size}/${ids.length} record_id values are unique`);
  addCheck(checks, "record_id_format", plannedRecords.every((record) => record.record_id === `${record.dataset_id}__${record.task_id}__${record.explanation_mode}`), "Every record_id equals dataset_id__task_id__explanation_mode");
  addCheck(checks, "phase3_metadata_consistency", sourceConsistencyErrors.length === 0
    && plannedRecords.every((record) => record.row_count_bucket === expectedBucket(record.row_count)), sourceConsistencyErrors.length === 0 ? "Both modes agree on Phase 3 metadata; row_count_bucket matches row_count" : sourceConsistencyErrors.join(", "));
  addCheck(checks, "evidence_access_rule", plannedRecords.every((record) => record.expected_evidence_access_path === expectedAccess(record.row_count)), "row_count <= 20 uses direct_embedding; row_count > 20 uses deterministic_artifact_retrieval");

  const corePassed = checks.every((item) => item.status === "PASS");
  const manifest = {
    manifest_version: "llm_judge_v2_full_case_run_manifest_v1",
    status: corePassed ? "READY_FOR_FULL_PREFLIGHT" : "INVALID",
    generated_at: generatedAt,
    timezone: "Asia/Saigon",
    purpose: "Freeze the complete 104 dataset-task case scope that expands to 208 mode-level LLM Judge V2 records.",
    linked_contract_manifest: { path: PATHS.contractManifest, sha256: await sha256File(PATHS.contractManifest), status: contract.status },
    linked_f0_readiness_report: { path: PATHS.readinessReport, sha256: await sha256File(PATHS.readinessReport), status: readiness.status },
    sources: {
      task_requirements: { path: PATHS.taskRequirements, sha256: await sha256File(PATHS.taskRequirements) },
      row_count_records: { path: PATHS.rowCountRecords, sha256: await sha256File(PATHS.rowCountRecords) },
      row_count_distribution: { path: PATHS.rowCountDistribution, sha256: await sha256File(PATHS.rowCountDistribution) },
    },
    scope: {
      datasets: DATASETS,
      explanation_modes: MODES,
      primary_cases: primaryCases.length,
      expected_judge_records: plannedRecords.length,
      record_id_format: "dataset_id__task_id__explanation_mode",
    },
    primary_cases: primaryCases,
    gate_decision: {
      planned_record_materialization_allowed: corePassed,
      slice_generation_allowed: corePassed,
      full_judge_invocation_allowed: false,
      official_full_evaluation_allowed: false,
    },
  };
  const report = {
    report_version: "llm_judge_v2_full_208_phase_f1_preflight_v1",
    generated_at: generatedAt,
    status: corePassed ? "PENDING_SLICE_GENERATION" : "FAIL",
    inputs: PATHS,
    outputs: {
      full_case_manifest: "Docs/evaluation_v2/Runs/full_208/full_case_run_manifest_v1.json",
      planned_records: "Docs/evaluation_v2/Runs/full_208/phase8_preflight_full/planned_records.jsonl",
    },
    counts: { primary_cases: primaryCases.length, planned_records: plannedRecords.length, unique_record_ids: new Set(ids).size },
    coverage: { by_dataset: taskCoverage, by_mode: Object.fromEntries(MODES.map((mode) => [mode, plannedRecords.filter((record) => record.explanation_mode === mode).length])) },
    checks,
    gate_decision: { phase_f2_allowed: false, full_judge_invocation_allowed: false, official_full_evaluation_allowed: false, reason: "Slice generation has not completed." },
  };

  await mkdir(PREFLIGHT_DIR, { recursive: true });
  await writeFile(path.join(FULL_ROOT, "full_case_run_manifest_v1.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  await writeFile(path.join(PREFLIGHT_DIR, "planned_records.jsonl"), jsonl(plannedRecords), "utf8");
  await writeFile(path.join(PREFLIGHT_DIR, "phase8_preflight_full_report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");

  if (!corePassed) throw new Error("F1 core manifest validation failed; slice generation was not attempted.");
  const splitResult = await splitPlannedRecords();
  console.log(JSON.stringify({ status: splitResult.status, primary_cases: primaryCases.length, planned_records: plannedRecords.length, slices: splitResult.slices.map(({ path: slicePath, records: count }) => ({ path: slicePath, records: count })) }, null, 2));
  if (splitResult.status !== "PASS") process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
