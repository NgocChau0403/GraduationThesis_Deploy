import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const EVALUATION_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2");
const RUNS_ROOT = path.join(EVALUATION_ROOT, "Runs");
const OUTPUT_DIR = path.join(RUNS_ROOT, "full_208/phase8_readiness");

const INPUTS = {
  contractManifest: "Docs/evaluation_v2/Runs/pilot_contract_manifest_v1.json",
  taskRequirements: "Docs/evaluation_v2/Rubric/task_evaluation_requirements.json",
  judgeInputSchema: "Docs/evaluation_v2/Input_AI/judge_input_schema.json",
  judgePrompt: "Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md",
  rowCountRecords: "Docs/evaluation_v2/Handle20rows/outputs/row_count_records.jsonl",
  rowCountDistribution: "Docs/evaluation_v2/Handle20rows/outputs/row_count_distribution.json",
  pilotCaseManifest: "Docs/evaluation_v2/Runs/pilot_case_run_manifest_v1.json",
  invocationReport: "Docs/evaluation_v2/Runs/phase6_judge_invocation/phase6_pilot_judge_invocation_report.json",
  scoringSmokeReport: "Docs/evaluation_v2/Runs/phase6_scoring_smoke/phase6_scoring_smoke_report.json",
};

const EXPECTED_DATASETS = ["SAMPLE_UCI_POR", "SAMPLE_OULAD"];
const EXPECTED_MODES = ["baseline_first_20_rows", "task_aware_data_summarization"];

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
  return (await readText(repoPath))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

async function sha256(repoPath) {
  return createHash("sha256").update(await readFile(absolute(repoPath))).digest("hex");
}

function check(checks, id, passed, evidence) {
  checks.push({ check_id: id, status: passed ? "PASS" : "FAIL", evidence });
}

function groupScope(records) {
  return EXPECTED_DATASETS.map((datasetId) => {
    const datasetRecords = records.filter((record) => record.dataset_id === datasetId);
    const byMode = Object.fromEntries(EXPECTED_MODES.map((mode) => [
      mode,
      datasetRecords.filter((record) => record.mode === mode).length,
    ]));
    return {
      dataset_id: datasetId,
      unique_tasks: new Set(datasetRecords.map((record) => record.task_id)).size,
      mode_level_records: datasetRecords.length,
      by_mode: byMode,
    };
  });
}

function renderMarkdown(report) {
  const rows = report.checks
    .map((item) => `| ${item.check_id} | ${item.status} | ${item.evidence.summary} |`)
    .join("\n");
  const scopeRows = report.full_scope.by_dataset
    .map((item) => `| ${item.dataset_id} | ${item.unique_tasks} | ${item.by_mode.baseline_first_20_rows} | ${item.by_mode.task_aware_data_summarization} | ${item.mode_level_records} |`)
    .join("\n");

  return `# LLM Judge V2 Full 208 - Phase F0 Readiness Report

- Status: **${report.status}**
- Generated at: \`${report.generated_at}\`
- Full run execution authorized by this report: **no** (Phase F0 readiness only)

## Acceptance checks

| Check | Status | Evidence |
|---|---:|---|
${rows}

## Full scope reconstructed from row_count_records.jsonl

| Dataset | Unique tasks | Baseline | Task-aware | Total mode-level records |
|---|---:|---:|---:|---:|
${scopeRows}
| **Total** | **${report.full_scope.total_unique_dataset_tasks}** | **${report.full_scope.by_mode.baseline_first_20_rows}** | **${report.full_scope.by_mode.task_aware_data_summarization}** | **${report.full_scope.total_mode_level_records}** |

## Smoke versus calibration-pilot classification

The validation currently completed is a **scoring smoke validation only**: ${report.smoke_classification.valid_scoring_records}/${report.smoke_classification.expected_pilot_records} pilot records have validated scoring outputs. It proves that the invocation import/validation/finalization path can process available outputs; it does not establish full pilot coverage, judge calibration, final calibration thresholds, or readiness to claim an official full evaluation.

- Scoring smoke status: \`${report.smoke_classification.scoring_smoke_status}\`
- Full pilot scoring passed: \`${report.smoke_classification.full_pilot_scoring_passed}\`
- Actual pilot judge invocation completed: \`${report.smoke_classification.actual_pilot_judge_invocation_completed}\`
- Full calibration pilot completed: \`false\`
- Official full evaluation allowed by existing pilot artifacts: \`${report.smoke_classification.official_full_evaluation_allowed}\`

## Gate decision

\`phase_f1_allowed = ${report.gate_decision.phase_f1_allowed}\`

This PASS means the frozen contract and 208-record planning inputs are internally consistent enough to start Phase F1. It does not itself authorize judge invocation or the official full run.
`;
}

async function main() {
  const generatedAt = new Date().toISOString();
  const checks = [];
  const contract = await readJson(INPUTS.contractManifest);
  const requirements = await readJson(INPUTS.taskRequirements);
  const schema = await readJson(INPUTS.judgeInputSchema);
  const prompt = await readText(INPUTS.judgePrompt);
  const records = await readJsonl(INPUTS.rowCountRecords);
  const distribution = await readJson(INPUTS.rowCountDistribution);
  const pilotCaseManifest = await readJson(INPUTS.pilotCaseManifest);
  const invocation = await readJson(INPUTS.invocationReport);
  const scoringSmoke = await readJson(INPUTS.scoringSmokeReport);

  const frozenArtifacts = [
    ...(contract.contract_artifacts ?? []),
    ...(contract.provenance_artifacts ?? []),
  ];
  const hashResults = await Promise.all(frozenArtifacts.map(async (artifact) => {
    const actual = await sha256(artifact.path);
    return { artifact_id: artifact.artifact_id, path: artifact.path, expected: artifact.sha256, actual, matches: actual === artifact.sha256 };
  }));
  check(checks, "contract_manifest_hashes", hashResults.every((item) => item.matches), {
    summary: `${hashResults.filter((item) => item.matches).length}/${hashResults.length} frozen artifact hashes match`,
    artifacts: hashResults,
  });

  const approvedTasks = (requirements.tasks ?? []).filter((task) => task.review_status === "approved_for_pilot");
  const requirementIds = (requirements.tasks ?? []).map((task) => task.task_id);
  check(checks, "task_requirements_52_approved", requirements.task_count === 52
    && requirementIds.length === 52
    && new Set(requirementIds).size === 52
    && approvedTasks.length === 52, {
    summary: `${approvedTasks.length}/52 tasks have review_status=approved_for_pilot`,
    declared_task_count: requirements.task_count,
    materialized_task_count: requirementIds.length,
    unique_task_count: new Set(requirementIds).size,
  });

  check(checks, "schema_and_prompt_present", Boolean(schema.$schema)
    && Array.isArray(schema.required)
    && schema.required.length > 0
    && prompt.trim().length > 0, {
    summary: `judge input schema parses with ${schema.required?.length ?? 0} top-level required fields; prompt is non-empty and hash-pinned`,
    schema_id: schema.$id ?? null,
    prompt_sha256: await sha256(INPUTS.judgePrompt),
  });

  check(checks, "row_count_distribution_208", distribution.expected_records === 208
    && distribution.actual_records === 208
    && distribution.totals?.total_records === 208, {
    summary: `expected_records=${distribution.expected_records}, actual_records=${distribution.actual_records}, totals.total_records=${distribution.totals?.total_records}`,
  });

  const scope = groupScope(records);
  const recordKeys = records.map((record) => `${record.dataset_id}::${record.task_id}::${record.mode}`);
  const unknownDatasets = [...new Set(records.map((record) => record.dataset_id))].filter((value) => !EXPECTED_DATASETS.includes(value));
  const unknownModes = [...new Set(records.map((record) => record.mode))].filter((value) => !EXPECTED_MODES.includes(value));
  const scopePassed = records.length === 208
    && new Set(recordKeys).size === 208
    && unknownDatasets.length === 0
    && unknownModes.length === 0
    && scope.every((item) => item.unique_tasks === 52
      && item.mode_level_records === 104
      && Object.values(item.by_mode).every((count) => count === 52));
  check(checks, "full_scope_52x2x2", scopePassed, {
    summary: `UCI=52 tasks/104 records; OULAD=52 tasks/104 records; total=${records.length} unique mode-level records`,
    unique_record_keys: new Set(recordKeys).size,
    unknown_datasets: unknownDatasets,
    unknown_modes: unknownModes,
  });

  const smokePassed = scoringSmoke.status === "SMOKE_PASS"
    && scoringSmoke.gate_decision?.smoke_scoring_passed === true
    && scoringSmoke.gate_decision?.full_pilot_scoring_passed === false
    && scoringSmoke.gate_decision?.official_full_evaluation_allowed === false
    && invocation.gate_decision?.actual_judge_invocation_completed === false
    && invocation.gate_decision?.official_full_evaluation_allowed === false
    && pilotCaseManifest.gate_decision?.official_full_evaluation_allowed === false;
  check(checks, "smoke_not_full_calibration_pilot", smokePassed, {
    summary: `${scoringSmoke.counts?.valid_source_records ?? 0}/${scoringSmoke.counts?.expected_records ?? 0} records scored; smoke pass only; full pilot/calibration incomplete`,
    scoring_report_status: scoringSmoke.status,
    invocation_report_status: invocation.status,
  });

  const report = {
    report_version: "llm_judge_v2_full_208_phase_f0_readiness_v1",
    generated_at: generatedAt,
    status: checks.every((item) => item.status === "PASS") ? "PASS" : "FAIL",
    inputs: INPUTS,
    checks,
    full_scope: {
      record_grain: "dataset_id + task_id + mode",
      by_dataset: scope,
      by_mode: Object.fromEntries(EXPECTED_MODES.map((mode) => [mode, records.filter((record) => record.mode === mode).length])),
      total_unique_dataset_tasks: new Set(records.map((record) => `${record.dataset_id}::${record.task_id}`)).size,
      total_mode_level_records: records.length,
    },
    smoke_classification: {
      classification: "scoring_smoke_only_not_full_calibration_pilot",
      scoring_smoke_status: scoringSmoke.status,
      expected_pilot_records: scoringSmoke.counts?.expected_records ?? null,
      valid_scoring_records: scoringSmoke.counts?.valid_source_records ?? null,
      full_pilot_scoring_passed: scoringSmoke.gate_decision?.full_pilot_scoring_passed ?? null,
      actual_pilot_judge_invocation_completed: invocation.gate_decision?.actual_judge_invocation_completed ?? null,
      full_calibration_pilot_completed: false,
      official_full_evaluation_allowed: false,
      interpretation: "The existing two-record scoring result is pipeline smoke evidence only. It is not a completed 24-record pilot and does not determine calibration thresholds.",
    },
    gate_decision: {
      phase_f1_allowed: checks.every((item) => item.status === "PASS"),
      full_judge_invocation_allowed: false,
      official_full_evaluation_allowed: false,
      reason: checks.every((item) => item.status === "PASS")
        ? "Phase F0 readiness passed; proceed only to Phase F1 manifest construction. Later execution gates remain separate."
        : "One or more Phase F0 acceptance checks failed.",
    },
  };

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(path.join(OUTPUT_DIR, "full_208_readiness_report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(path.join(OUTPUT_DIR, "full_208_readiness_report.md"), renderMarkdown(report), "utf8");
  console.log(JSON.stringify({ status: report.status, output_dir: path.relative(PROJECT_ROOT, OUTPUT_DIR).replaceAll(path.sep, "/"), checks: checks.map(({ check_id, status }) => ({ check_id, status })) }, null, 2));
  if (report.status !== "PASS") process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
