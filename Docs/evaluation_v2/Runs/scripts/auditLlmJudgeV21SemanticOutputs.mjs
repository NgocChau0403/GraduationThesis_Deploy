import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const METRICS = [
  "faithfulness",
  "numerical_correctness",
  "completeness",
  "task_relevance",
  "actionability",
  "clarity",
  "safety_fairness",
];
const ACTION_TASK_IDS = new Set(["A-G16", "A-S08", "S-T13", "A-S04"]);
const GENERIC_PATTERNS = [
  /covered\s+\d+\s+of\s+\d+/i,
  /assessed against the permitted evidence/i,
  /metric pattern follows those pointwise findings/i,
  /strongest qualities reflected in relevance/i,
];

function parseArgs(argv) {
  const args = { expectedCount: 104, allowPartial: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--invocation-manifest") args.invocationManifestPath = path.resolve(next), i += 1;
    else if (arg === "--expected-count") args.expectedCount = Number(next), i += 1;
    else if (arg === "--allow-partial") args.allowPartial = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!args.invocationManifestPath) throw new Error("Missing --invocation-manifest");
  if (!Number.isInteger(args.expectedCount) || args.expectedCount <= 0) {
    throw new Error("--expected-count must be a positive integer");
  }
  return args;
}

async function readText(filePath) {
  return (await readFile(filePath, "utf8")).replace(/^\uFEFF/, "");
}

async function readJsonl(filePath) {
  return (await readText(filePath))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function repoPathToAbsolute(repoPath) {
  return path.join(PROJECT_ROOT, ...String(repoPath).split("/"));
}

function addIssue(issues, severity, code, recordId, message) {
  issues.push({ severity, code, record_id: recordId ?? null, message });
}

function scoreProfile(output) {
  return METRICS.map((metric) => output.subscores?.[metric]?.score ?? "na").join("|");
}

function registerRationale(map, issues, kind, record, rationale) {
  const normalized = String(rationale ?? "").trim().replace(/\s+/g, " ");
  if (!normalized) return;
  const prior = map.get(normalized);
  if (prior && prior.taskId !== record.task_id) {
    addIssue(
      issues,
      "error",
      `duplicate_${kind}_rationale_across_tasks`,
      record.record_id,
      `Rationale duplicates ${prior.recordId} from another task.`,
    );
  } else if (!prior) {
    map.set(normalized, { recordId: record.record_id, taskId: record.task_id });
  }
}

function validateOutputShape(record, output, issues) {
  if (output.schema_version !== "judge_response_schema_v1") {
    addIssue(issues, "error", "schema_version_mismatch", record.record_id, "schema_version must be judge_response_schema_v1.");
  }
  if (output.record_id !== record.record_id) {
    addIssue(issues, "error", "record_id_mismatch", record.record_id, `Observed ${output.record_id}.`);
  }
  if (!Array.isArray(output.claim_checks) || !Array.isArray(output.errors)) {
    addIssue(issues, "error", "missing_response_arrays", record.record_id, "claim_checks and errors must be arrays.");
  }
  for (const metric of METRICS) {
    const value = output.subscores?.[metric];
    if (!value || !["applicable", "not_applicable"].includes(value.applicability)) {
      addIssue(issues, "error", "invalid_metric_shape", record.record_id, `Missing or invalid ${metric}.`);
      continue;
    }
    if (value.applicability === "applicable" && (!Number.isInteger(value.score) || value.score < 1 || value.score > 10)) {
      addIssue(issues, "error", "invalid_metric_score", record.record_id, `${metric} score must be an integer from 1 to 10.`);
    }
  }
}

function validateSemanticSignals(record, output, issues, holisticMap, metricMaps) {
  const textFields = [
    output.holistic_rationale,
    ...METRICS.map((metric) => output.subscores?.[metric]?.rationale),
    ...(output.claim_checks ?? []).map((claim) => claim.rationale),
    ...(output.errors ?? []).map((error) => error.rationale),
  ].filter(Boolean);

  for (const text of textFields) {
    for (const pattern of GENERIC_PATTERNS) {
      if (pattern.test(text)) {
        addIssue(issues, "error", "generic_template_phrase", record.record_id, `Matched forbidden generic phrase: ${pattern}`);
      }
    }
  }

  registerRationale(holisticMap, issues, "holistic", record, output.holistic_rationale);
  for (const metric of METRICS) {
    registerRationale(metricMaps.get(metric), issues, `${metric}_metric`, record, output.subscores?.[metric]?.rationale);
  }

  for (const error of output.errors ?? []) {
    if (error.error_type === "missing_required_output") {
      if (!error.requirement_id) {
        addIssue(issues, "error", "missing_requirement_id", record.record_id, "missing_required_output must identify requirement_id.");
      }
      if (String(error.rationale ?? "").trim().length < 80) {
        addIssue(issues, "error", "non_specific_missing_output_rationale", record.record_id, "missing_required_output rationale is too short to identify concrete missing content.");
      }
    }

    if (ACTION_TASK_IDS.has(record.task_id)) {
      const actionPenaltyText = `${error.error_type} ${error.rationale}`;
      if (/recommendations?/i.test(actionPenaltyText) && /(empty|\[\]|missing|absent)/i.test(actionPenaltyText)) {
        addIssue(issues, "error", "empty_recommendations_penalty_on_action_task", record.record_id, "Action/risk task appears penalized because recommendations are empty.");
      }
    }
  }
}

const args = parseArgs(process.argv.slice(2));
const allRecords = await readJsonl(args.invocationManifestPath);
if (!args.allowPartial && allRecords.length !== args.expectedCount) {
  throw new Error(`Expected ${args.expectedCount} manifest records, observed ${allRecords.length}.`);
}
if (args.allowPartial && allRecords.length < args.expectedCount) {
  throw new Error(`Manifest has fewer than the requested ${args.expectedCount} pilot records.`);
}

const records = args.allowPartial ? allRecords.slice(0, args.expectedCount) : allRecords;
const issues = [];
const outputs = [];
const holisticMap = new Map();
const metricMaps = new Map(METRICS.map((metric) => [metric, new Map()]));

for (const record of records) {
  const rawPath = repoPathToAbsolute(record.expected_raw_output_path);
  let output;
  try {
    output = JSON.parse(await readText(rawPath));
  } catch (error) {
    addIssue(issues, "error", "missing_or_invalid_json", record.record_id, error.message);
    continue;
  }
  validateOutputShape(record, output, issues);
  validateSemanticSignals(record, output, issues, holisticMap, metricMaps);
  outputs.push({ record, output, scoreProfile: scoreProfile(output) });
}

const profileCounts = new Map();
for (const item of outputs) {
  profileCounts.set(item.scoreProfile, (profileCounts.get(item.scoreProfile) ?? 0) + 1);
}
const dominantProfile = [...profileCounts.entries()].sort((a, b) => b[1] - a[1])[0] ?? [null, 0];
if (outputs.length >= 8 && dominantProfile[1] >= 8 && dominantProfile[1] / outputs.length >= 0.9) {
  addIssue(
    issues,
    "error",
    "fixed_subscore_profile_signature",
    null,
    `Score profile ${dominantProfile[0]} occurs in ${dominantProfile[1]}/${outputs.length} outputs.`,
  );
}

const errors = issues.filter((issue) => issue.severity === "error");
const result = {
  report_version: "llm_judge_v2_1_semantic_output_audit_v1",
  status: errors.length === 0 && outputs.length === args.expectedCount ? "PASS" : "FAIL",
  scope: args.allowPartial ? "ordered_pilot_prefix" : "full_invocation_manifest",
  expected_records: args.expectedCount,
  parsed_records: outputs.length,
  issue_count: issues.length,
  error_count: errors.length,
  dominant_score_profile: dominantProfile[0],
  dominant_score_profile_count: dominantProfile[1],
  issues,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (result.status !== "PASS") process.exitCode = 1;
