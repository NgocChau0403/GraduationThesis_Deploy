import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUNS_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs");

const DEFAULT_ATTEMPT_MANIFEST_PATH = path.join(
  RUNS_ROOT,
  "phase6_judge_invocation/pilot_judge_attempt_manifest.jsonl",
);
const DEFAULT_STATUS_MANIFEST_PATH = path.join(
  RUNS_ROOT,
  "phase6_judge_invocation/pilot_judge_record_status_manifest.jsonl",
);
const DEFAULT_OUTPUT_DIR = path.join(RUNS_ROOT, "phase6_scoring_smoke");
const D3_SCHEMA_PATH = path.join(PROJECT_ROOT, "Docs/evaluation_v2/LLM_JUDGE_V2_D3_OUTPUT_SCHEMA_V1.json");

const EVALUATION_RUN_ID = "llm_judge_v2_pilot_phase6_6_smoke";
const SCORING_FORMULA_VERSION = "d3_pre_pilot_weighted_mean_v1_decimal_half_up";

const METRIC_WEIGHTS = {
  faithfulness: 25,
  numerical_correctness: 20,
  completeness: 15,
  task_relevance: 15,
  actionability: 10,
  clarity: 10,
  safety_fairness: 5,
};

function parseArgs(argv) {
  const args = {
    attemptManifestPath: DEFAULT_ATTEMPT_MANIFEST_PATH,
    statusManifestPath: DEFAULT_STATUS_MANIFEST_PATH,
    outputDir: DEFAULT_OUTPUT_DIR,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--attempt-manifest") args.attemptManifestPath = path.resolve(next), i += 1;
    else if (arg === "--status-manifest") args.statusManifestPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    ...args,
    finalRecordsDir: path.join(args.outputDir, "final_scoring_records"),
    scoringManifestPath: path.join(args.outputDir, "pilot_scoring_smoke_manifest.jsonl"),
    reportJsonPath: path.join(args.outputDir, "phase6_scoring_smoke_report.json"),
    reportMdPath: path.join(args.outputDir, "phase6_scoring_smoke_report.md"),
  };
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
  const text = await readText(filePath);
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}

function safeFileStem(value) {
  return String(value).replace(/[^A-Za-z0-9_.-]+/g, "_");
}

function decimalHalfUp(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.floor(value * factor + 0.5) / factor;
}

function buildErrorSummary(errors = []) {
  const countBySeverity = { minor: 0, major: 0, critical: 0 };
  for (const error of errors) {
    if (error.severity in countBySeverity) countBySeverity[error.severity] += 1;
  }
  const highest = countBySeverity.critical > 0
    ? "critical"
    : countBySeverity.major > 0
      ? "major"
      : countBySeverity.minor > 0
        ? "minor"
        : null;
  return {
    highest_error_severity: highest,
    error_count: errors.length,
    count_by_severity: countBySeverity,
  };
}

function computeRawWeightedScore(subscores) {
  let weightedSum = 0;
  let weightSum = 0;
  for (const [metric, weight] of Object.entries(METRIC_WEIGHTS)) {
    const item = subscores?.[metric];
    if (item?.applicability !== "applicable") continue;
    if (!Number.isInteger(item.score)) continue;
    weightedSum += item.score * weight;
    weightSum += weight;
  }
  if (weightSum === 0) return null;
  return decimalHalfUp(weightedSum / weightSum, 2);
}

function buildCapsApplied(errors = []) {
  return errors
    .filter((error) => typeof error.cap_candidate === "number")
    .map((error) => ({
      type: error.error_type,
      severity: error.severity,
      cap: error.cap_candidate,
      error_id: error.error_id,
      claim_ids: error.claim_ids ?? [],
      evidence_refs: error.evidence_refs ?? [],
    }));
}

function verdictFor(score) {
  if (score < 5) return "poor";
  if (score < 6.5) return "acceptable";
  if (score < 8) return "good";
  return "excellent";
}

function buildFinalRecord({ judgeOutput, evaluationRunId = EVALUATION_RUN_ID }) {
  if (judgeOutput.scoring_status === "invalid") {
    return {
      schema_version: "d3_schema_v1",
      evaluation_run_id: evaluationRunId,
      record_id: judgeOutput.record_id,
      scoring_status: "invalid",
      scoring_formula_version: SCORING_FORMULA_VERSION,
      subscores: null,
      claim_checks: [],
      errors: [],
      error_summary: buildErrorSummary([]),
      raw_weighted_score: null,
      caps_applied: [],
      effective_cap: null,
      final_score_after_caps: null,
      verdict: "invalid",
      invalid_reason: judgeOutput.invalid_reason,
    };
  }

  const rawWeightedScore = computeRawWeightedScore(judgeOutput.subscores);
  const capsApplied = buildCapsApplied(judgeOutput.errors);
  const effectiveCap = capsApplied.length > 0
    ? Math.min(...capsApplied.map((cap) => cap.cap))
    : null;
  const finalScore = effectiveCap === null
    ? rawWeightedScore
    : decimalHalfUp(Math.min(rawWeightedScore, effectiveCap), 2);

  return {
    schema_version: "d3_schema_v1",
    evaluation_run_id: evaluationRunId,
    record_id: judgeOutput.record_id,
    scoring_status: "scored",
    scoring_formula_version: SCORING_FORMULA_VERSION,
    subscores: judgeOutput.subscores,
    claim_checks: judgeOutput.claim_checks,
    errors: judgeOutput.errors,
    error_summary: buildErrorSummary(judgeOutput.errors),
    raw_weighted_score: rawWeightedScore,
    caps_applied: capsApplied,
    effective_cap: effectiveCap,
    final_score_after_caps: finalScore,
    verdict: verdictFor(finalScore),
    invalid_reason: null,
  };
}

function validateFinalRecord(record) {
  const errors = [];
  const allowedTop = new Set([
    "schema_version",
    "evaluation_run_id",
    "record_id",
    "scoring_status",
    "scoring_formula_version",
    "subscores",
    "claim_checks",
    "errors",
    "error_summary",
    "raw_weighted_score",
    "caps_applied",
    "effective_cap",
    "final_score_after_caps",
    "verdict",
    "invalid_reason",
  ]);
  const required = [
    "schema_version",
    "evaluation_run_id",
    "record_id",
    "scoring_status",
    "scoring_formula_version",
    "subscores",
    "claim_checks",
    "errors",
    "error_summary",
    "raw_weighted_score",
    "caps_applied",
    "effective_cap",
    "final_score_after_caps",
    "verdict",
  ];
  for (const key of required) if (!(key in record)) errors.push(`missing ${key}`);
  for (const key of Object.keys(record)) if (!allowedTop.has(key)) errors.push(`unexpected ${key}`);
  if (record.schema_version !== "d3_schema_v1") errors.push("schema_version invalid");
  if (!["scored", "invalid", "not_scored"].includes(record.scoring_status)) errors.push("scoring_status invalid");
  if (!Array.isArray(record.claim_checks)) errors.push("claim_checks must be array");
  if (!Array.isArray(record.errors)) errors.push("errors must be array");
  if (!Array.isArray(record.caps_applied)) errors.push("caps_applied must be array");

  const summary = record.error_summary ?? {};
  const counts = summary.count_by_severity ?? {};
  const expectedCounts = buildErrorSummary(record.errors);
  if (summary.error_count !== record.errors.length) errors.push("error_summary.error_count mismatch");
  for (const severity of ["minor", "major", "critical"]) {
    if (counts[severity] !== expectedCounts.count_by_severity[severity]) {
      errors.push(`error_summary.count_by_severity.${severity} mismatch`);
    }
  }
  if (summary.highest_error_severity !== expectedCounts.highest_error_severity) {
    errors.push("error_summary.highest_error_severity mismatch");
  }

  if (record.scoring_status === "scored") {
    if (typeof record.raw_weighted_score !== "number") errors.push("raw_weighted_score missing for scored");
    if (typeof record.final_score_after_caps !== "number") errors.push("final_score_after_caps missing for scored");
    if (!["poor", "acceptable", "good", "excellent"].includes(record.verdict)) errors.push("verdict invalid for scored");
    if (record.caps_applied.length === 0 && record.effective_cap !== null) errors.push("effective_cap must be null when no caps");
    if (record.caps_applied.length > 0) {
      const minCap = Math.min(...record.caps_applied.map((cap) => cap.cap));
      if (record.effective_cap !== minCap) errors.push("effective_cap must equal min caps_applied cap");
      if (record.final_score_after_caps > record.effective_cap) errors.push("final_score_after_caps exceeds effective_cap");
    }
    if (record.final_score_after_caps > record.raw_weighted_score) errors.push("final_score_after_caps exceeds raw_weighted_score");
  }

  return errors;
}

function countBy(items, keyFn) {
  const counts = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function summarize({ generatedAt, statusEntries, scoringEntries, issues, args }) {
  const expected = statusEntries.length;
  const validSource = statusEntries.filter((entry) => entry.record_status === "valid").length;
  const missing = statusEntries.filter((entry) => entry.record_status === "missing").length;
  const errors = issues.filter((issue) => issue.severity === "error");
  const scored = scoringEntries.filter((entry) => entry.scoring_status === "scored");
  const fullPass = expected > 0 && scored.length === expected && errors.length === 0;
  const smokePass = scored.length > 0 && errors.length === 0;

  return {
    report_version: "llm_judge_v2_phase6_6_scoring_smoke_report_v1",
    generated_at: generatedAt,
    status: fullPass ? "PASS" : smokePass ? "SMOKE_PASS" : "FAIL",
    phase_scope: ["6.6 scoring finalizer/aggregate smoke"],
    scoring_formula_version: SCORING_FORMULA_VERSION,
    weights: METRIC_WEIGHTS,
    inputs: {
      attempt_manifest_jsonl: toRepoPath(args.attemptManifestPath),
      status_manifest_jsonl: toRepoPath(args.statusManifestPath),
      d3_schema_path: toRepoPath(D3_SCHEMA_PATH),
    },
    counts: {
      expected_records: expected,
      valid_source_records: validSource,
      missing_source_records: missing,
      final_scoring_records: scoringEntries.length,
      scored_records: scored.length,
      errors: errors.length,
      warnings: issues.length - errors.length,
    },
    aggregate_smoke: scored.length > 0
      ? {
        average_raw_weighted_score: decimalHalfUp(
          scored.reduce((sum, entry) => sum + entry.raw_weighted_score, 0) / scored.length,
          2,
        ),
        average_final_score_after_caps: decimalHalfUp(
          scored.reduce((sum, entry) => sum + entry.final_score_after_caps, 0) / scored.length,
          2,
        ),
        verdict_counts: countBy(scored, (entry) => entry.verdict),
      }
      : null,
    outputs: {
      final_records_dir: toRepoPath(args.finalRecordsDir),
      scoring_manifest_jsonl: toRepoPath(args.scoringManifestPath),
      report_json: toRepoPath(args.reportJsonPath),
      report_md: toRepoPath(args.reportMdPath),
    },
    gate_decision: {
      smoke_scoring_passed: smokePass,
      full_pilot_scoring_passed: fullPass,
      official_full_evaluation_allowed: false,
      reason: fullPass
        ? "All pilot records were scored and validated."
        : smokePass
          ? "At least one valid judge output was finalized successfully; remaining pilot records are not scored yet."
          : "No valid judge outputs were finalized.",
    },
    issues,
  };
}

function renderMarkdown(report) {
  const lines = [
    "# LLM Judge V2 Phase 6.6 Scoring Smoke Report",
    "",
    `- Generated at: ${report.generated_at}`,
    `- Status: ${report.status}`,
    `- Scoring formula version: ${report.scoring_formula_version}`,
    `- Expected records: ${report.counts.expected_records}`,
    `- Valid source records: ${report.counts.valid_source_records}`,
    `- Missing source records: ${report.counts.missing_source_records}`,
    `- Final scoring records: ${report.counts.final_scoring_records}`,
    `- Scored records: ${report.counts.scored_records}`,
    `- Errors: ${report.counts.errors}`,
    `- Warnings: ${report.counts.warnings}`,
    "",
    "## Smoke Aggregate",
    "",
    report.aggregate_smoke
      ? `- Average raw weighted score: ${report.aggregate_smoke.average_raw_weighted_score}\n- Average final score after caps: ${report.aggregate_smoke.average_final_score_after_caps}\n- Verdict counts: ${JSON.stringify(report.aggregate_smoke.verdict_counts)}`
      : "No scored records.",
    "",
    "## Gate Decision",
    "",
    `- Smoke scoring passed: ${report.gate_decision.smoke_scoring_passed}`,
    `- Full pilot scoring passed: ${report.gate_decision.full_pilot_scoring_passed}`,
    `- Official full evaluation allowed: ${report.gate_decision.official_full_evaluation_allowed}`,
    `- Reason: ${report.gate_decision.reason}`,
    "",
    "## Outputs",
    "",
    `- Final records dir: \`${report.outputs.final_records_dir}\``,
    `- Scoring manifest: \`${report.outputs.scoring_manifest_jsonl}\``,
    `- JSON report: \`${report.outputs.report_json}\``,
    `- Markdown report: \`${report.outputs.report_md}\``,
    "",
  ];

  if (report.issues.length > 0) {
    lines.push("## Issues", "", "| Severity | Code | Record | Message |", "| --- | --- | --- | --- |");
    for (const issue of report.issues) {
      lines.push(`| ${issue.severity} | ${issue.code} | ${issue.record_id ?? ""} | ${issue.message} |`);
    }
    lines.push("");
  } else {
    lines.push("## Issues", "", "No issues found.", "");
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const generatedAt = new Date().toISOString();
  await mkdir(args.outputDir, { recursive: true });
  await mkdir(args.finalRecordsDir, { recursive: true });

  await readJson(D3_SCHEMA_PATH);
  const attemptEntries = await readJsonl(args.attemptManifestPath);
  const statusEntries = await readJsonl(args.statusManifestPath);
  const validAttempts = attemptEntries.filter((entry) => entry.judge_status === "valid");
  const scoringEntries = [];
  const issues = [];

  for (const attempt of validAttempts) {
    try {
      const judgeOutput = await readJson(repoPathToAbsolute(attempt.validated_output_path));
      const finalRecord = buildFinalRecord({ judgeOutput });
      const validationErrors = validateFinalRecord(finalRecord);
      for (const message of validationErrors) {
        issues.push({
          severity: "error",
          code: "final_scoring_record_validation_error",
          record_id: finalRecord.record_id,
          message,
        });
      }

      const recordText = `${JSON.stringify(finalRecord, null, 2)}\n`;
      const recordPath = path.join(args.finalRecordsDir, `${safeFileStem(finalRecord.record_id)}.json`);
      await writeFile(recordPath, recordText, "utf8");
      scoringEntries.push({
        record_id: finalRecord.record_id,
        scoring_status: finalRecord.scoring_status,
        raw_weighted_score: finalRecord.raw_weighted_score,
        final_score_after_caps: finalRecord.final_score_after_caps,
        verdict: finalRecord.verdict,
        final_scoring_record_path: toRepoPath(recordPath),
        final_scoring_record_sha256: sha256Text(recordText),
        validation_error_count: validationErrors.length,
      });
    } catch (error) {
      issues.push({
        severity: "error",
        code: "final_scoring_exception",
        record_id: attempt.record_id,
        message: error.message,
      });
    }
  }

  const manifestText = `${scoringEntries.map((entry) => JSON.stringify(entry)).join("\n")}${scoringEntries.length ? "\n" : ""}`;
  await writeFile(args.scoringManifestPath, manifestText, "utf8");
  const report = summarize({ generatedAt, statusEntries, scoringEntries, issues, args });
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderMarkdown(report), "utf8");

  console.log(`[phase6.6] status=${report.status} scored=${report.counts.scored_records}/${report.counts.expected_records} errors=${report.counts.errors}`);
  if (report.status === "FAIL") process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
