import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUN_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs/full_208");
const DEFAULT_SOURCE_MANIFEST = path.join(RUN_ROOT, "phase8_judge_inputs/judge_input_manifest.jsonl");
const DEFAULT_DERIVED_DIR = path.join(
  RUN_ROOT,
  "phase9_single_review_dry_run/derived_stat_evidence/SAMPLE_UCI_POR",
);
const DEFAULT_OUTPUT_DIR = path.join(RUN_ROOT, "phase11_v3_uci_action_evidence_rerun/judge_inputs");
const TASK_REGISTRY_PATH = path.join(PROJECT_ROOT, "Backend/src/config/taskRegistry.json");

function parseArgs(argv) {
  const args = {
    sourceManifest: DEFAULT_SOURCE_MANIFEST,
    derivedDir: DEFAULT_DERIVED_DIR,
    outputDir: DEFAULT_OUTPUT_DIR,
    dataset: "SAMPLE_UCI_POR",
    expectedCount: 104,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--source-manifest") args.sourceManifest = path.resolve(next), index += 1;
    else if (arg === "--derived-dir") args.derivedDir = path.resolve(next), index += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), index += 1;
    else if (arg === "--dataset") args.dataset = next, index += 1;
    else if (arg === "--expected-count") args.expectedCount = Number(next), index += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, "/");
}

function repoPathToAbsolute(repoPath) {
  return path.join(PROJECT_ROOT, ...String(repoPath).split("/"));
}

async function readText(filePath) {
  return (await readFile(filePath, "utf8")).replace(/^\uFEFF/, "");
}

async function readJson(filePath) {
  return JSON.parse(await readText(filePath));
}

async function readJsonl(filePath) {
  return (await readText(filePath))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  }
  return value;
}

function sha256Json(value) {
  return createHash("sha256").update(JSON.stringify(canonicalize(value))).digest("hex");
}

function mapSkipReason(entry) {
  if (entry.reason === "no_valid_numeric_pairs") {
    return entry.row_count === 0 ? "zero_rows" : "insufficient_pairs";
  }
  return entry.reason;
}

function mapDerivedEvidence(artifact) {
  return (artifact.derived_stats ?? []).map((entry, index) => {
    const passed = entry.status === "pass";
    return {
      stat_id: `${artifact.task_id}__pearson_r__${index + 1}`,
      stat_type: "pearson_r",
      dataset_label: entry.dataset_label,
      x_column: artifact.x_column,
      y_column: artifact.y_column,
      source_artifact_path: artifact.source_full_query_artifact.path,
      source_artifact_sha256: artifact.source_full_query_artifact.sha256,
      status: entry.status,
      pearson_r: passed ? entry.pearson_r : null,
      n: Number.isInteger(entry.valid_pair_count) ? entry.valid_pair_count : null,
      strength_label: passed ? entry.strength : null,
      direction: passed ? entry.direction : null,
      skip_reason: passed ? null : mapSkipReason(entry),
    };
  });
}

async function loadDerivedByTask(args) {
  const result = new Map();
  const taskIds = ["A-G02", "A-G09", "A-G13", "S-T09", "S-T11", "S-T14", "S-T15"];
  for (const taskId of taskIds) {
    const filePath = path.join(args.derivedDir, `${args.dataset}__${taskId}__derived_stats.json`);
    const artifact = await readJson(filePath);
    result.set(taskId, mapDerivedEvidence(artifact));
  }
  return result;
}

function getArtifactDatasets(artifact) {
  return artifact?.full_response_body?.datasets
    ?? artifact?.response_body?.datasets
    ?? {};
}

function flattenArtifactRows(artifacts) {
  const rows = [];
  for (const artifact of artifacts) {
    for (const [datasetLabel, datasetRows] of Object.entries(getArtifactDatasets(artifact))) {
      for (const [rowIndex, row] of (Array.isArray(datasetRows) ? datasetRows : []).entries()) {
        rows.push({ dataset_label: datasetLabel, row_index: rowIndex, row });
      }
    }
  }
  return rows;
}

function coerceComparable(value, operator) {
  if (["lt", "lte", "gt", "gte"].includes(operator)) {
    const parsed = typeof value === "number" ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return value;
}

function evaluateCondition(condition, evidence) {
  const observed = evidence.get(condition.evidence_id);
  const expected = condition.compare_to_evidence_id
    ? evidence.get(condition.compare_to_evidence_id)
    : condition.value;
  const operator = condition.operator;
  let result;

  if (operator === "is_present") result = observed !== undefined && observed !== null && observed !== "";
  else if (operator === "is_absent" || operator === "is_not_present") {
    result = observed === undefined || observed === null || observed === "";
  } else if (operator === "is_true") result = observed === true || observed === "true";
  else if (operator === "is_false") result = observed === false || observed === "false";
  else if (observed === undefined || observed === null || expected === undefined || expected === null) {
    result = null;
  } else {
    const left = coerceComparable(observed, operator);
    const right = coerceComparable(expected, operator);
    if (left === undefined || right === undefined) result = null;
    else if (operator === "lt") result = left < right;
    else if (operator === "lte") result = left <= right;
    else if (operator === "gt") result = left > right;
    else if (operator === "gte") result = left >= right;
    else if (operator === "eq") result = left === right;
    else if (operator === "neq" || operator === "ne") result = left !== right;
    else result = null;
  }

  return {
    evidence_id: condition.evidence_id,
    operator,
    observed_value: observed ?? null,
    expected_value: expected ?? null,
    compare_to_evidence_id: condition.compare_to_evidence_id ?? null,
    result,
  };
}

function evaluateConditionGroup(trigger, evidence) {
  const all = (trigger?.all ?? []).map((condition) => evaluateCondition(condition, evidence));
  const any = (trigger?.any ?? []).map((condition) => evaluateCondition(condition, evidence));
  const allState = all.some((item) => item.result === false)
    ? false
    : all.some((item) => item.result === null) ? null : true;
  const anyState = any.length === 0
    ? true
    : any.some((item) => item.result === true)
      ? true
      : any.some((item) => item.result === null) ? null : false;
  const triggered = allState === false || anyState === false
    ? false
    : allState === true && anyState === true ? true : null;
  return { triggered, all, any };
}

function deriveActionEvidenceValues(task, rowEntries) {
  const evidence = new Map();
  for (const { row } of rowEntries) {
    for (const [column, value] of Object.entries(row ?? {})) {
      if (!evidence.has(column)) evidence.set(column, value);
    }
  }
  for (const derived of task.aiActionDerivedEvidence ?? []) {
    if (derived.operation !== "safe_divide") continue;
    const numerator = Number(evidence.get(derived.numerator_column));
    const denominator = Number(evidence.get(derived.denominator_column));
    evidence.set(
      derived.evidence_id,
      Number.isFinite(numerator) && Number.isFinite(denominator) && denominator !== 0
        ? numerator / denominator
        : null,
    );
  }
  return evidence;
}

function buildReturnedActionEvidence(task, rowEntries) {
  if (task.taskId !== "A-S04") return null;
  const actions = rowEntries
    .filter(({ row }) => row?.triggered === true)
    .map(({ dataset_label: datasetLabel, row_index: rowIndex, row }) => ({
      action_id: `${task.taskId}__${row.flag_name}`,
      action_text: row.recommended_action,
      priority: row.severity,
      owner: null,
      time_horizon_days: null,
      support_category: row.support_category ?? null,
      source_type: "returned_query_row",
      source_rule_id: null,
      trigger_evidence: {
        dataset_label: datasetLabel,
        row_index: rowIndex,
        flag_name: row.flag_name,
        flag_value: row.flag_value,
        threshold: row.threshold,
        triggered: row.triggered,
      },
      claim_limits: [],
    }));
  return {
    applicable: true,
    source_type: "returned_recommended_action_fields",
    rule_set_id: null,
    rule_version: null,
    evaluation_status: "complete",
    supported_action_count: actions.length,
    supported_actions: actions,
    rule_evaluations: [],
    conflict_evaluations: [],
  };
}

function buildRuleActionEvidence(task, rowEntries) {
  if (task.aiSummaryType !== "action_synthesis" || !Array.isArray(task.aiActionRules)) return null;
  const evidence = deriveActionEvidenceValues(task, rowEntries);
  const ruleEvaluations = task.aiActionRules.map((rule) => {
    const evaluation = evaluateConditionGroup(rule.trigger, evidence);
    return {
      rule_id: rule.rule_id,
      description: rule.description,
      status: evaluation.triggered === true ? "triggered" : evaluation.triggered === false ? "not_triggered" : "unknown",
      conditions: { all: evaluation.all, any: evaluation.any },
      action: rule.action,
    };
  });
  const conflictEvaluations = (task.aiActionConflictRules ?? []).map((conflict) => {
    const evaluation = evaluateConditionGroup(conflict.when, evidence);
    return {
      conflict_id: conflict.conflict_id,
      status: evaluation.triggered === true ? "triggered" : evaluation.triggered === false ? "not_triggered" : "unknown",
      behavior: conflict.behavior,
      conditions: { all: evaluation.all, any: evaluation.any },
    };
  });
  const supportedActions = ruleEvaluations
    .filter((rule) => rule.status === "triggered")
    .map((rule) => ({
      ...rule.action,
      source_type: "versioned_registry_rule",
      source_rule_id: rule.rule_id,
      trigger_evidence: rule.conditions,
    }));
  return {
    applicable: true,
    source_type: "deterministic_registry_rule_evaluation",
    rule_set_id: task.aiActionRuleSetId ?? null,
    rule_version: task.aiActionRuleVersion ?? null,
    evaluation_status: ruleEvaluations.some((rule) => rule.status === "unknown") ? "partial" : "complete",
    supported_action_count: supportedActions.length,
    supported_actions: supportedActions,
    rule_evaluations: ruleEvaluations,
    conflict_evaluations: conflictEvaluations,
  };
}

async function buildActionEvidence(task, source) {
  const artifacts = [];
  for (const artifactRef of source.evidence_access?.full_query_artifacts ?? []) {
    artifacts.push(await readJson(repoPathToAbsolute(artifactRef.artifact_path)));
  }
  const rowEntries = flattenArtifactRows(artifacts);
  return buildReturnedActionEvidence(task, rowEntries)
    ?? buildRuleActionEvidence(task, rowEntries)
    ?? {
      applicable: false,
      source_type: "not_applicable",
      rule_set_id: null,
      rule_version: null,
      evaluation_status: "not_applicable",
      supported_action_count: 0,
      supported_actions: [],
      rule_evaluations: [],
      conflict_evaluations: [],
    };
}

function validateRecord(record) {
  const issues = [];
  if (record.schema_version !== "judge_input_schema_v3") issues.push("schema_version");
  if (record.evaluation_run_id !== "llm_judge_v3_uci_action_evidence_rerun") issues.push("evaluation_run_id");
  if (record.prompt_version !== "judge_prompt_v3_action_evidence_rerun") issues.push("prompt_version");
  if (!Array.isArray(record.derived_stat_evidence)) issues.push("derived_stat_evidence_not_array");
  if (!record.action_evidence || typeof record.action_evidence !== "object") issues.push("action_evidence_missing");
  for (const entry of record.derived_stat_evidence ?? []) {
    if (entry.status === "pass" && (!Number.isFinite(entry.pearson_r) || !Number.isInteger(entry.n))) {
      issues.push(`invalid_pass:${entry.stat_id}`);
    }
    if (entry.status === "skipped" && (!entry.skip_reason || entry.pearson_r !== null)) {
      issues.push(`invalid_skipped:${entry.stat_id}`);
    }
  }
  return issues;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await mkdir(args.outputDir, { recursive: true });
  const outputRecordsDir = path.join(args.outputDir, "records");
  await mkdir(outputRecordsDir, { recursive: true });

  const derivedByTask = await loadDerivedByTask(args);
  const registry = await readJson(TASK_REGISTRY_PATH);
  const taskById = new Map(registry.map((task) => [task.taskId, task]));
  const sourceEntries = (await readJsonl(args.sourceManifest))
    .filter((entry) => entry.dataset_id === args.dataset && entry.status === "judge_input_ready");
  if (sourceEntries.length !== args.expectedCount) {
    throw new Error(`Expected ${args.expectedCount} source records, found ${sourceEntries.length}.`);
  }

  const manifest = [];
  const validationIssues = [];
  for (const sourceEntry of sourceEntries) {
    const source = await readJson(repoPathToAbsolute(sourceEntry.judge_input_path));
    const task = taskById.get(source.task_id);
    if (!task) throw new Error(`Task ${source.task_id} not found in task registry.`);
    const record = {
      ...source,
      schema_version: "judge_input_schema_v3",
      evaluation_run_id: "llm_judge_v3_uci_action_evidence_rerun",
      prompt_version: "judge_prompt_v3_action_evidence_rerun",
      rubric_version: "judge_rubric_1_to_10_v3_action_evidence_calibrated",
      derived_stat_evidence: derivedByTask.get(source.task_id) ?? [],
      action_evidence: await buildActionEvidence(task, source),
    };
    const issues = validateRecord(record);
    validationIssues.push(...issues.map((issue) => ({ record_id: record.record_id, issue })));

    const outputPath = path.join(outputRecordsDir, `${record.record_id}.json`);
    await writeFile(outputPath, `${JSON.stringify(record, null, 2)}\n`, "utf8");
    manifest.push({
      ...sourceEntry,
      status: issues.length === 0 ? "judge_input_ready" : "failed",
      judge_input_path: toRepoPath(outputPath),
      judge_input_sha256: sha256Json(record),
      source_v2_judge_input_path: sourceEntry.judge_input_path,
      derived_stat_entry_count: record.derived_stat_evidence.length,
      validation_error_count: issues.length,
      next_step: issues.length === 0 ? "build_v3_judge_contexts" : "fix_v3_judge_input",
    });
  }

  const manifestPath = path.join(args.outputDir, "judge_input_manifest.jsonl");
  const reportPath = path.join(args.outputDir, "validation_report.json");
  await writeFile(manifestPath, `${manifest.map((entry) => JSON.stringify(entry)).join("\n")}\n`, "utf8");
  await writeFile(reportPath, `${JSON.stringify({
    report_version: "llm_judge_v3_uci_judge_input_validation_v1",
    status: validationIssues.length === 0 ? "PASS" : "FAIL",
    dataset_id: args.dataset,
    expected_records: args.expectedCount,
    materialized_records: manifest.length,
    ready_records: manifest.filter((entry) => entry.status === "judge_input_ready").length,
    records_with_derived_stats: manifest.filter((entry) => entry.derived_stat_entry_count > 0).length,
    unique_tasks_with_derived_stats: new Set(
      manifest.filter((entry) => entry.derived_stat_entry_count > 0).map((entry) => entry.task_id),
    ).size,
    validation_issues: validationIssues,
    outputs: {
      manifest: toRepoPath(manifestPath),
      records_dir: toRepoPath(outputRecordsDir),
    },
  }, null, 2)}\n`, "utf8");

  console.log(`status=${validationIssues.length === 0 ? "PASS" : "FAIL"}`);
  console.log(`records=${manifest.length}`);
  console.log(`records_with_derived_stats=${manifest.filter((entry) => entry.derived_stat_entry_count > 0).length}`);
  console.log(`manifest=${toRepoPath(manifestPath)}`);
  if (validationIssues.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
