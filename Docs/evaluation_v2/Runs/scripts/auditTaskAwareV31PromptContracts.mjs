import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");

const MUST_KEEP_BY_TYPE = {
  action_synthesis: [
    "evidence_items",
    "rule_evaluations",
    "prioritized_actions",
    "action_evidence_links",
    "missing_evidence",
    "unsupported_actions",
  ],
  risk_flags: [
    "triggered_flags",
    "non_triggered_flags",
    "threshold_evidence",
    "recommended_actions",
    "severity_counts",
  ],
  ranking: [
    "top_items",
    "metric_stats",
    "flag_evidence",
  ],
  multi_metric_comparison: [
    "comparison_matrix",
    "selected_entity_evidence",
    "pairwise_gaps",
    "pairwise_direction_evidence",
    "metric_extrema",
  ],
  trend_series: [
    "first_point",
    "last_point",
    "overall_change",
    "largest_adjacent_drop",
    "flagged_points",
    "action_evidence",
    "summarization_warnings",
  ],
};

const CONTRACT_TYPES = new Set([
  "action_synthesis",
  "risk_flags",
  "ranking",
  "multi_metric_comparison",
  "trend_series",
]);

function parseArgs(argv) {
  const args = {
    expectedCount: 104,
    expectedVersion: "v3.1-experimental",
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--manifest") args.manifestPath = path.resolve(next), i += 1;
    else if (arg === "--expected-count") args.expectedCount = Number(next), i += 1;
    else if (arg === "--expected-version") args.expectedVersion = next, i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!args.manifestPath) throw new Error("--manifest is required");
  if (!Number.isInteger(args.expectedCount) || args.expectedCount <= 0) {
    throw new Error("--expected-count must be a positive integer");
  }
  return args;
}

function toAbsolute(repoOrAbsolutePath) {
  if (path.isAbsolute(repoOrAbsolutePath)) return repoOrAbsolutePath;
  return path.join(PROJECT_ROOT, ...String(repoOrAbsolutePath).split("/"));
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function readJsonl(filePath) {
  return (await readFile(filePath, "utf8"))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function omittedKey(omittedPath) {
  return String(omittedPath).split(".").pop();
}

function hasNonEmpty(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.keys(value).length > 0;
  return value !== null && value !== undefined && value !== "";
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const manifest = await readJsonl(args.manifestPath);
  const issues = [];
  const coverage = {};

  if (manifest.length !== args.expectedCount) {
    issues.push({
      severity: "error",
      code: "record_count_mismatch",
      expected: args.expectedCount,
      actual: manifest.length,
    });
  }

  for (const row of manifest) {
    const artifactPath = row.explanation_artifact?.path;
    if (!artifactPath) {
      issues.push({ severity: "error", code: "missing_artifact_path", record_id: row.record_id });
      continue;
    }
    const artifact = await readJson(toAbsolute(artifactPath));
    const body = artifact.response_body || {};
    const summaryType = body.input_summary_type || body.summary_type || "unknown";
    coverage[summaryType] = (coverage[summaryType] ?? 0) + 1;

    if (body.ai_summary_version !== args.expectedVersion) {
      issues.push({
        severity: "error",
        code: "unexpected_ai_summary_version",
        record_id: row.record_id,
        expected: args.expectedVersion,
        actual: body.ai_summary_version,
      });
    }

    const omitted = Array.isArray(body.evidence_sections_omitted)
      ? body.evidence_sections_omitted
      : [];
    const mustKeep = new Set([
      ...(Array.isArray(body.must_keep_keys) ? body.must_keep_keys : []),
      ...(MUST_KEEP_BY_TYPE[summaryType] || []),
    ]);
    for (const omittedPath of omitted) {
      const key = omittedKey(omittedPath);
      if (mustKeep.has(key)) {
        issues.push({
          severity: "error",
          code: "must_keep_omitted",
          record_id: row.record_id,
          summary_type: summaryType,
          omitted_path: omittedPath,
        });
      }
    }

    if (CONTRACT_TYPES.has(summaryType) && !hasNonEmpty(body.task_output_contract)) {
      issues.push({
        severity: "error",
        code: "missing_task_output_contract",
        record_id: row.record_id,
        summary_type: summaryType,
      });
    }

    if (summaryType === "action_synthesis" && omitted.some((item) => /prioritized_actions|rule_evaluations|action_evidence_links/.test(item))) {
      issues.push({
        severity: "error",
        code: "action_synthesis_critical_evidence_omitted",
        record_id: row.record_id,
        omitted,
      });
    }

    if (summaryType === "risk_flags" && omitted.some((item) => /recommended_actions|threshold_evidence|triggered_flags/.test(item))) {
      issues.push({
        severity: "error",
        code: "risk_flags_critical_evidence_omitted",
        record_id: row.record_id,
        omitted,
      });
    }
  }

  const errors = issues.filter((issue) => issue.severity === "error");
  const report = {
    report_version: "task_aware_v3_1_prompt_contract_audit_v1",
    status: errors.length === 0 ? "PASS" : "FAIL",
    manifest_path: path.relative(PROJECT_ROOT, args.manifestPath).replaceAll(path.sep, "/"),
    expected_records: args.expectedCount,
    observed_records: manifest.length,
    expected_ai_summary_version: args.expectedVersion,
    coverage,
    issue_count: issues.length,
    errors: errors.length,
    issues,
  };
  console.log(JSON.stringify(report, null, 2));
  if (errors.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
