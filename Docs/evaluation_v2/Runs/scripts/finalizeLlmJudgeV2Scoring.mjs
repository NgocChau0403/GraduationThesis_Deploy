import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUN_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs/full_208");

const DEFAULT_INVOCATION_DIR = path.join(RUN_ROOT, "phase8_judge_invocation");
const DEFAULT_OUTPUT_DIR = path.join(RUN_ROOT, "phase8_scoring");
const D3_SCHEMA_PATH = path.join(PROJECT_ROOT, "Docs/evaluation_v2/LLM_JUDGE_V2_D3_OUTPUT_SCHEMA_V1.json");

const DEFAULT_DATASET_ID = "SAMPLE_UCI_POR";
const DEFAULT_EXPECTED_COUNT = 104;
const V2_SCORING_FORMULA_VERSION = "d3_pre_pilot_weighted_mean_v1_decimal_half_up";
const V3_SCORING_FORMULA_VERSION = "v3_uci_calibration_weighted_mean_v1_decimal_half_up";

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
    datasetId: DEFAULT_DATASET_ID,
    expectedCount: DEFAULT_EXPECTED_COUNT,
    invocationDir: DEFAULT_INVOCATION_DIR,
    outputDir: DEFAULT_OUTPUT_DIR,
    scoringPolicy: "v2",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--dataset") args.datasetId = next, i += 1;
    else if (arg === "--expected-count") args.expectedCount = Number(next), i += 1;
    else if (arg === "--invocation-dir") args.invocationDir = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else if (arg === "--scoring-policy") args.scoringPolicy = next, i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!Number.isInteger(args.expectedCount) || args.expectedCount <= 0) {
    throw new Error("--expected-count must be a positive integer");
  }
  if (!["v2", "v3-uci-calibration"].includes(args.scoringPolicy)) {
    throw new Error("--scoring-policy must be v2 or v3-uci-calibration");
  }

  const datasetStem = safeFileStem(args.datasetId);
  return {
    ...args,
    evaluationRunId: args.scoringPolicy === "v3-uci-calibration"
      ? `llm_judge_v3_uci_calibration_scoring__${datasetStem}`
      : `llm_judge_v2_full_208_scoring__${datasetStem}`,
    scoringFormulaVersion: args.scoringPolicy === "v3-uci-calibration"
      ? V3_SCORING_FORMULA_VERSION
      : V2_SCORING_FORMULA_VERSION,
    invocationManifestPath: path.join(args.invocationDir, "judge_invocation_manifest.jsonl"),
    attemptManifestPath: path.join(args.invocationDir, "judge_attempt_manifest.jsonl"),
    statusManifestPath: path.join(args.invocationDir, "record_execution_status_manifest.jsonl"),
    finalRecordsDir: path.join(args.outputDir, "final_scoring_records"),
    aggregatesDir: path.join(args.outputDir, "aggregates"),
    scoringManifestPath: path.join(args.outputDir, `scoring_manifest__${datasetStem}.jsonl`),
    reportJsonPath: path.join(args.outputDir, `scoring_report__${datasetStem}.json`),
    reportMdPath: path.join(args.outputDir, `scoring_report__${datasetStem}.md`),
    byDatasetPath: path.join(args.outputDir, "aggregates", `by_dataset__${datasetStem}.json`),
    byModePath: path.join(args.outputDir, "aggregates", `by_mode__${datasetStem}.json`),
    byDatasetAndModePath: path.join(args.outputDir, "aggregates", `by_dataset_and_mode__${datasetStem}.json`),
    byRowBucketPath: path.join(args.outputDir, "aggregates", `by_row_count_bucket__${datasetStem}.json`),
    byEvidenceAccessModePath: path.join(args.outputDir, "aggregates", `by_evidence_access_mode__${datasetStem}.json`),
    pairedComparisonJsonPath: path.join(args.outputDir, "aggregates", `paired_mode_comparison__${datasetStem}.json`),
    pairedComparisonMdPath: path.join(args.outputDir, "aggregates", `paired_mode_comparison__${datasetStem}.md`),
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
  return (await readText(filePath))
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
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  const factor = 10 ** digits;
  return Math.floor(value * factor + 0.5) / factor;
}

function countBy(items, keyFn) {
  const counts = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function average(values) {
  const nums = values.filter((value) => typeof value === "number");
  if (nums.length === 0) return null;
  return decimalHalfUp(nums.reduce((sum, value) => sum + value, 0) / nums.length, 2);
}

function rowCountBucket(rowCount) {
  if (!Number.isFinite(rowCount)) return "unknown";
  return rowCount <= 20 ? "<=20" : ">20";
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

function v3ValidatedCap(error) {
  const type = String(error.error_type ?? "").toLowerCase();
  if (error.severity === "critical" && /(contradict|wrong.*direction|direction.*reversal)/.test(type)) return 2;
  if (error.severity === "major" && /(missing_core_output|core.*omission)/.test(type)) return 6.5;
  if (error.severity === "major" && /(unsupported|contradict|overstated_association|numerical_claim)/.test(type)) return 5;
  return error.cap_candidate;
}

function buildCapsApplied(errors = [], scoringPolicy = "v2") {
  return errors
    .filter((error) => typeof error.cap_candidate === "number")
    .map((error) => ({
      type: error.error_type,
      severity: error.severity,
      cap: scoringPolicy === "v3-uci-calibration" ? v3ValidatedCap(error) : error.cap_candidate,
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

function buildFinalRecord({ judgeOutput, evaluationRunId, scoringFormulaVersion, scoringPolicy }) {
  if (judgeOutput.scoring_status === "invalid") {
    return {
      schema_version: "d3_schema_v1",
      evaluation_run_id: evaluationRunId,
      record_id: judgeOutput.record_id,
      scoring_status: "invalid",
      scoring_formula_version: scoringFormulaVersion,
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
  const capsApplied = buildCapsApplied(judgeOutput.errors, scoringPolicy);
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
    scoring_formula_version: scoringFormulaVersion,
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

function summarizeGroup(items) {
  const scored = items.filter((item) => item.scoring_status === "scored");
  return {
    records: items.length,
    scored_records: scored.length,
    invalid_records: items.filter((item) => item.scoring_status === "invalid").length,
    average_raw_weighted_score: average(scored.map((item) => item.raw_weighted_score)),
    average_final_score_after_caps: average(scored.map((item) => item.final_score_after_caps)),
    verdict_counts: countBy(scored, (item) => item.verdict),
    highest_error_severity_counts: countBy(items, (item) => item.highest_error_severity ?? "none"),
  };
}

function groupAggregate(items, keyFn) {
  const groups = {};
  for (const item of items) {
    const key = keyFn(item);
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  }
  return Object.fromEntries(
    Object.entries(groups)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, groupItems]) => [key, summarizeGroup(groupItems)]),
  );
}

function pairKey(entry) {
  return `${entry.dataset_id}__${entry.task_id}`;
}

function metricScoreMap(entry) {
  return Object.fromEntries(
    Object.entries(entry.metric_scores ?? {})
      .map(([metric, score]) => [metric, typeof score === "number" ? score : null]),
  );
}

function metricDeltaSummary(baseline, taskAware) {
  const baselineScores = metricScoreMap(baseline);
  const taskAwareScores = metricScoreMap(taskAware);
  return Object.keys(METRIC_WEIGHTS).map((metric) => ({
    metric,
    baseline: baselineScores[metric],
    task_aware: taskAwareScores[metric],
    delta: typeof baselineScores[metric] === "number" && typeof taskAwareScores[metric] === "number"
      ? taskAwareScores[metric] - baselineScores[metric]
      : null,
  }));
}

function strongestMetricChanges(metricDeltas, direction) {
  return metricDeltas
    .filter((item) => typeof item.delta === "number" && item.delta !== 0)
    .filter((item) => direction === "task_aware_data_summarization" ? item.delta > 0 : item.delta < 0)
    .sort((left, right) => Math.abs(right.delta) - Math.abs(left.delta))
    .slice(0, 3)
    .map((item) => `${item.metric} ${item.delta > 0 ? "+" : ""}${item.delta}`);
}

function capExplanation(loser) {
  if (typeof loser.effective_cap !== "number") return null;
  const highest = loser.highest_error_severity ?? "unknown";
  return `${loser.explanation_mode} was capped at ${loser.effective_cap} because of ${highest} judge error(s)`;
}

function errorBrief(entry) {
  return (entry.error_details ?? []).map((error) => ({
    severity: error.severity,
    type: error.type,
    primary_metric: error.primary_metric,
    cap_candidate: error.cap_candidate,
    rationale: error.rationale,
  }));
}

function buildPairInterpretation({ baseline, taskAware, winner, metricDeltas }) {
  if (winner === "tie") return "Both modes received the same final score.";

  const winnerEntry = winner === "task_aware_data_summarization" ? taskAware : baseline;
  const loserEntry = winner === "task_aware_data_summarization" ? baseline : taskAware;
  const winnerLabel = winner === "task_aware_data_summarization" ? "task-aware" : "baseline rows[:20]";
  const loserLabel = winner === "task_aware_data_summarization" ? "baseline rows[:20]" : "task-aware";
  const rowNote = baseline.full_result_row_count <= 20
    ? "Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows."
    : "Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter.";
  const capNote = capExplanation(loserEntry);
  const metricNotes = strongestMetricChanges(metricDeltas, winner);
  const parts = [rowNote];
  if (capNote) parts.push(`${winnerLabel} wins mainly because ${capNote}.`);
  else if (metricNotes.length > 0) parts.push(`${winnerLabel} wins on metric differences: ${metricNotes.join(", ")}.`);
  else parts.push(`${winnerLabel} wins by a small weighted-score difference after judge scoring.`);
  if ((loserEntry.error_details ?? []).length > 0) {
    parts.push(`${loserLabel} issue(s): ${loserEntry.error_details.map((error) => `${error.severity} ${error.type}`).join("; ")}.`);
  }
  return parts.join(" ");
}

function buildPairedComparison(manifestEntries) {
  const groups = new Map();
  for (const entry of manifestEntries) {
    const key = pairKey(entry);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  }

  const pairs = [];
  for (const [key, entries] of groups.entries()) {
    const baseline = entries.find((entry) => entry.explanation_mode === "baseline_first_20_rows");
    const taskAware = entries.find((entry) => entry.explanation_mode === "task_aware_data_summarization");
    if (!baseline || !taskAware) continue;
    if (baseline.scoring_status !== "scored" || taskAware.scoring_status !== "scored") {
      pairs.push({
        pair_key: key,
        dataset_id: baseline?.dataset_id ?? taskAware?.dataset_id,
        task_id: baseline?.task_id ?? taskAware?.task_id,
        comparable: false,
        reason: "one_or_both_modes_not_scored",
        baseline_final_score: baseline?.final_score_after_caps ?? null,
        task_aware_final_score: taskAware?.final_score_after_caps ?? null,
        delta_task_aware_minus_baseline: null,
      });
      continue;
    }
    const delta = decimalHalfUp(taskAware.final_score_after_caps - baseline.final_score_after_caps, 2);
    const winner = delta > 0 ? "task_aware_data_summarization" : delta < 0 ? "baseline_first_20_rows" : "tie";
    const metricDeltas = metricDeltaSummary(baseline, taskAware);
    pairs.push({
      pair_key: key,
      dataset_id: baseline.dataset_id,
      task_id: baseline.task_id,
      comparable: true,
      reason: null,
      baseline_record_id: baseline.record_id,
      task_aware_record_id: taskAware.record_id,
      baseline_final_score: baseline.final_score_after_caps,
      task_aware_final_score: taskAware.final_score_after_caps,
      baseline_raw_weighted_score: baseline.raw_weighted_score,
      task_aware_raw_weighted_score: taskAware.raw_weighted_score,
      delta_task_aware_minus_baseline: delta,
      winner,
      full_result_row_count: baseline.full_result_row_count,
      row_count_bucket: baseline.row_count_bucket,
      evidence_access_mode: baseline.evidence_access_mode,
      queue_strategy: baseline.queue_strategy,
      baseline_effective_cap: baseline.effective_cap,
      task_aware_effective_cap: taskAware.effective_cap,
      baseline_highest_error_severity: baseline.highest_error_severity,
      task_aware_highest_error_severity: taskAware.highest_error_severity,
      baseline_error_details: errorBrief(baseline),
      task_aware_error_details: errorBrief(taskAware),
      metric_deltas: metricDeltas,
      interpretation: buildPairInterpretation({ baseline, taskAware, winner, metricDeltas }),
    });
  }

  const comparable = pairs.filter((pair) => pair.comparable);
  const nonTie = comparable.filter((pair) => pair.winner !== "tie");
  const allGt20 = comparable.filter((pair) => pair.full_result_row_count > 20);
  return {
    dataset_scope: comparable[0]?.dataset_id ?? null,
    pair_count: pairs.length,
    comparable_pair_count: comparable.length,
    non_comparable_pair_count: pairs.length - comparable.length,
    average_delta_task_aware_minus_baseline: average(comparable.map((pair) => pair.delta_task_aware_minus_baseline)),
    winner_counts: countBy(comparable, (pair) => pair.winner),
    row_count_context: {
      comparable_by_row_count_bucket: countBy(comparable, (pair) => pair.row_count_bucket),
      gt20_pair_count: allGt20.length,
      gt20_tie_pair_count: allGt20.filter((pair) => pair.winner === "tie").length,
      gt20_non_tie_pair_count: allGt20.filter((pair) => pair.winner !== "tie").length,
      gt20_pairs: allGt20.map((pair) => ({
        task_id: pair.task_id,
        full_result_row_count: pair.full_result_row_count,
        winner: pair.winner,
        baseline_final_score: pair.baseline_final_score,
        task_aware_final_score: pair.task_aware_final_score,
        delta_task_aware_minus_baseline: pair.delta_task_aware_minus_baseline,
      })),
    },
    non_tie_analysis: {
      non_tie_pair_count: nonTie.length,
      non_tie_by_row_count_bucket: countBy(nonTie, (pair) => pair.row_count_bucket),
      non_tie_by_winner_and_row_count_bucket: countBy(nonTie, (pair) => `${pair.winner}__${pair.row_count_bucket}`),
      non_tie_by_evidence_access_mode: countBy(nonTie, (pair) => pair.evidence_access_mode),
      interpretation: nonTie.length === 0
        ? "No non-tie pairs."
        : "Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.",
    },
    pairs: pairs.sort((left, right) => left.task_id.localeCompare(right.task_id)),
  };
}

function renderPairedMarkdown(comparison) {
  const lines = [
    "# Paired Mode Comparison",
    "",
    `- Dataset scope: ${comparison.dataset_scope}`,
    `- Pair count: ${comparison.pair_count}`,
    `- Comparable pair count: ${comparison.comparable_pair_count}`,
    `- Non-comparable pair count: ${comparison.non_comparable_pair_count}`,
    `- Average delta task-aware minus baseline: ${comparison.average_delta_task_aware_minus_baseline}`,
    `- Winner counts: ${JSON.stringify(comparison.winner_counts)}`,
    `- Comparable pairs by row-count bucket: ${JSON.stringify(comparison.row_count_context.comparable_by_row_count_bucket)}`,
    `- >20 row pairs: ${comparison.row_count_context.gt20_pair_count} total; ${comparison.row_count_context.gt20_non_tie_pair_count} non-tie; ${comparison.row_count_context.gt20_tie_pair_count} tie`,
    `- Non-tie pairs: ${comparison.non_tie_analysis.non_tie_pair_count}`,
    `- Non-tie by row-count bucket: ${JSON.stringify(comparison.non_tie_analysis.non_tie_by_row_count_bucket)}`,
    `- Non-tie by winner and row-count bucket: ${JSON.stringify(comparison.non_tie_analysis.non_tie_by_winner_and_row_count_bucket)}`,
    "",
    "| Task | Baseline | Task-aware | Delta | Winner |",
    "| --- | ---: | ---: | ---: | --- |",
  ];
  for (const pair of comparison.pairs) {
    lines.push(`| ${pair.task_id} | ${pair.baseline_final_score ?? ""} | ${pair.task_aware_final_score ?? ""} | ${pair.delta_task_aware_minus_baseline ?? ""} | ${pair.winner ?? pair.reason} |`);
  }
  lines.push(
    "",
    "## Non-Tie Explanation",
    "",
    comparison.non_tie_analysis.interpretation,
    "",
    "| Task | Rows | Bucket | Evidence | Winner | Delta | Main explanation |",
    "| --- | ---: | --- | --- | --- | ---: | --- |",
  );
  for (const pair of comparison.pairs.filter((item) => item.comparable && item.winner !== "tie")) {
    lines.push(`| ${pair.task_id} | ${pair.full_result_row_count} | ${pair.row_count_bucket} | ${pair.evidence_access_mode} | ${pair.winner} | ${pair.delta_task_aware_minus_baseline} | ${pair.interpretation} |`);
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function summarizeReport({ args, generatedAt, statusEntries, attempts, scoringEntries, issues, aggregatePaths, pairedComparison }) {
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const validSource = statusEntries.filter((entry) => entry.record_status === "valid");
  const scored = scoringEntries.filter((entry) => entry.scoring_status === "scored");
  const invalid = scoringEntries.filter((entry) => entry.scoring_status === "invalid");
  const pass = scoringEntries.length === args.expectedCount
    && validSource.length === args.expectedCount
    && errors.length === 0;

  return {
    report_version: "llm_judge_v2_full_208_scoring_report_v1",
    generated_at: generatedAt,
    status: pass ? "PASS" : "FAIL",
    phase_scope: ["Phase 8 official scoring", "dataset-scoped full_208 scoring"],
    dataset_scope: args.datasetId,
    evaluation_run_id: args.evaluationRunId,
    scoring_formula_version: args.scoringFormulaVersion,
    weights: METRIC_WEIGHTS,
    inputs: {
      invocation_manifest_jsonl: toRepoPath(args.invocationManifestPath),
      attempt_manifest_jsonl: toRepoPath(args.attemptManifestPath),
      status_manifest_jsonl: toRepoPath(args.statusManifestPath),
      d3_schema_path: toRepoPath(D3_SCHEMA_PATH),
    },
    counts: {
      expected_records: args.expectedCount,
      valid_source_records: validSource.length,
      attempt_records: attempts.length,
      final_scoring_records: scoringEntries.length,
      scored_records: scored.length,
      invalid_records: invalid.length,
      errors: errors.length,
      warnings: warnings.length,
    },
    aggregate_summary: summarizeGroup(scoringEntries),
    paired_mode_summary: {
      pair_count: pairedComparison.pair_count,
      comparable_pair_count: pairedComparison.comparable_pair_count,
      average_delta_task_aware_minus_baseline: pairedComparison.average_delta_task_aware_minus_baseline,
      winner_counts: pairedComparison.winner_counts,
      row_count_context: pairedComparison.row_count_context,
      non_tie_analysis: pairedComparison.non_tie_analysis,
      non_tie_pairs: pairedComparison.pairs
        .filter((pair) => pair.comparable && pair.winner !== "tie")
        .map((pair) => ({
          task_id: pair.task_id,
          full_result_row_count: pair.full_result_row_count,
          row_count_bucket: pair.row_count_bucket,
          evidence_access_mode: pair.evidence_access_mode,
          winner: pair.winner,
          baseline_final_score: pair.baseline_final_score,
          task_aware_final_score: pair.task_aware_final_score,
          delta_task_aware_minus_baseline: pair.delta_task_aware_minus_baseline,
          interpretation: pair.interpretation,
        })),
    },
    outputs: {
      final_records_dir: toRepoPath(args.finalRecordsDir),
      scoring_manifest_jsonl: toRepoPath(args.scoringManifestPath),
      report_json: toRepoPath(args.reportJsonPath),
      report_md: toRepoPath(args.reportMdPath),
      aggregates: Object.fromEntries(
        Object.entries(aggregatePaths).map(([key, value]) => [key, toRepoPath(value)]),
      ),
    },
    gate_decision: {
      dataset_scoring_passed: pass,
      full_208_finalization_allowed: false,
      reason: pass
        ? "All dataset-scoped validated judge outputs were finalized into scoring records."
        : "Dataset scoring is incomplete or has validation errors.",
    },
    issues,
  };
}

function renderReportMarkdown(report) {
  const lines = [
    "# LLM Judge V2 Full 208 Official Scoring Report",
    "",
    `- Generated at: ${report.generated_at}`,
    `- Status: ${report.status}`,
    `- Dataset scope: ${report.dataset_scope}`,
    `- Evaluation run id: ${report.evaluation_run_id}`,
    `- Scoring formula version: ${report.scoring_formula_version}`,
    `- Expected records: ${report.counts.expected_records}`,
    `- Valid source records: ${report.counts.valid_source_records}`,
    `- Attempt records: ${report.counts.attempt_records}`,
    `- Final scoring records: ${report.counts.final_scoring_records}`,
    `- Scored records: ${report.counts.scored_records}`,
    `- Invalid records: ${report.counts.invalid_records}`,
    `- Errors: ${report.counts.errors}`,
    `- Warnings: ${report.counts.warnings}`,
    "",
    "## Aggregate Summary",
    "",
    `- Average raw weighted score: ${report.aggregate_summary.average_raw_weighted_score}`,
    `- Average final score after caps: ${report.aggregate_summary.average_final_score_after_caps}`,
    `- Verdict counts: ${JSON.stringify(report.aggregate_summary.verdict_counts)}`,
    `- Highest error severity counts: ${JSON.stringify(report.aggregate_summary.highest_error_severity_counts)}`,
    "",
    "## Paired Mode Comparison",
    "",
    `- Pair count: ${report.paired_mode_summary.pair_count}`,
    `- Comparable pair count: ${report.paired_mode_summary.comparable_pair_count}`,
    `- Average delta task-aware minus baseline: ${report.paired_mode_summary.average_delta_task_aware_minus_baseline}`,
    `- Winner counts: ${JSON.stringify(report.paired_mode_summary.winner_counts)}`,
    `- Comparable pairs by row-count bucket: ${JSON.stringify(report.paired_mode_summary.row_count_context.comparable_by_row_count_bucket)}`,
    `- >20 row pairs: ${report.paired_mode_summary.row_count_context.gt20_pair_count} total; ${report.paired_mode_summary.row_count_context.gt20_non_tie_pair_count} non-tie; ${report.paired_mode_summary.row_count_context.gt20_tie_pair_count} tie`,
    `- Non-tie pairs: ${report.paired_mode_summary.non_tie_analysis.non_tie_pair_count}`,
    `- Non-tie by row-count bucket: ${JSON.stringify(report.paired_mode_summary.non_tie_analysis.non_tie_by_row_count_bucket)}`,
    `- Non-tie by winner and row-count bucket: ${JSON.stringify(report.paired_mode_summary.non_tie_analysis.non_tie_by_winner_and_row_count_bucket)}`,
    "",
    report.paired_mode_summary.non_tie_analysis.interpretation,
    "",
    "| Task | Rows | Bucket | Winner | Delta | Main explanation |",
    "| --- | ---: | --- | --- | ---: | --- |",
    ...report.paired_mode_summary.non_tie_pairs.map((pair) => `| ${pair.task_id} | ${pair.full_result_row_count} | ${pair.row_count_bucket} | ${pair.winner} | ${pair.delta_task_aware_minus_baseline} | ${pair.interpretation} |`),
    "",
    ...(report.paired_mode_summary.non_tie_pairs.some((pair) => pair.row_count_bucket === ">20" && pair.winner === "baseline_first_20_rows")
      ? [
        "## Reasonableness Review Note",
        "",
        "There are `>20` row-count tasks where `baseline_first_20_rows` wins. These should be reviewed before thesis-level conclusions, because task-aware is expected to have better evidence coverage on large result sets. A baseline win can still be valid if task-aware introduces unsupported claims or misses core requirements, but derived statistics such as correlation coefficients must be checked against deterministic provenance before accepting the loss as final.",
        "",
        report.dataset_scope === "SAMPLE_UCI_POR"
          ? "For SAMPLE_UCI_POR, see `Docs/evaluation_v2/Runs/full_208/phase8_scoring/audits/non_tie_reasonableness_audit__SAMPLE_UCI_POR.md`."
          : "Create a dataset-specific non-tie reasonableness audit if any `>20` baseline wins remain.",
        "",
      ]
      : []),
    "## Gate Decision",
    "",
    `- Dataset scoring passed: ${report.gate_decision.dataset_scoring_passed}`,
    `- Full 208 finalization allowed: ${report.gate_decision.full_208_finalization_allowed}`,
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
  await mkdir(args.aggregatesDir, { recursive: true });
  await readJson(D3_SCHEMA_PATH);

  const invocationEntries = (await readJsonl(args.invocationManifestPath))
    .filter((entry) => entry.dataset_id === args.datasetId);
  const attempts = (await readJsonl(args.attemptManifestPath))
    .filter((entry) => entry.record_id.startsWith(`${args.datasetId}__`));
  const statusEntries = (await readJsonl(args.statusManifestPath))
    .filter((entry) => entry.record_id.startsWith(`${args.datasetId}__`));
  const invocationByRecord = new Map(invocationEntries.map((entry) => [entry.record_id, entry]));
  const issues = [];

  if (invocationEntries.length !== args.expectedCount) {
    issues.push({
      severity: "error",
      code: "invocation_record_count_mismatch",
      message: `Expected ${args.expectedCount} invocation records, observed ${invocationEntries.length}.`,
    });
  }
  if (statusEntries.length !== args.expectedCount) {
    issues.push({
      severity: "error",
      code: "status_record_count_mismatch",
      message: `Expected ${args.expectedCount} status records, observed ${statusEntries.length}.`,
    });
  }

  const validAttempts = attempts.filter((entry) => entry.judge_status === "valid");
  const scoringEntries = [];

  for (const attempt of validAttempts) {
    try {
      const invocation = invocationByRecord.get(attempt.record_id);
      if (!invocation) {
        issues.push({
          severity: "error",
          code: "missing_invocation_metadata",
          record_id: attempt.record_id,
          message: "No matching invocation manifest row found.",
        });
        continue;
      }

      const judgeOutput = await readJson(repoPathToAbsolute(attempt.validated_output_path));
      const finalRecord = buildFinalRecord({
        judgeOutput,
        evaluationRunId: args.evaluationRunId,
        scoringFormulaVersion: args.scoringFormulaVersion,
        scoringPolicy: args.scoringPolicy,
      });
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
        dataset_id: invocation.dataset_id,
        task_id: invocation.task_id,
        explanation_mode: invocation.explanation_mode,
        scoring_status: finalRecord.scoring_status,
        raw_weighted_score: finalRecord.raw_weighted_score,
        final_score_after_caps: finalRecord.final_score_after_caps,
        verdict: finalRecord.verdict,
        effective_cap: finalRecord.effective_cap,
        highest_error_severity: finalRecord.error_summary.highest_error_severity,
        error_count: finalRecord.error_summary.error_count,
        metric_scores: Object.fromEntries(
          Object.entries(finalRecord.subscores ?? {}).map(([metric, value]) => [metric, value?.score ?? null]),
        ),
        caps_applied: finalRecord.caps_applied,
        error_details: finalRecord.errors.map((error) => ({
          error_id: error.error_id,
          severity: error.severity,
          type: error.error_type,
          primary_metric: error.primary_metric,
          cap_candidate: error.cap_candidate,
          rationale: error.rationale,
        })),
        full_result_row_count: invocation.full_result_row_count,
        row_count_bucket: rowCountBucket(invocation.full_result_row_count),
        evidence_access_mode: invocation.evidence_access_mode,
        queue_strategy: invocation.queue_strategy,
        validated_output_path: attempt.validated_output_path,
        validated_output_sha256: attempt.validated_output_sha256,
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

  const byDataset = groupAggregate(scoringEntries, (entry) => entry.dataset_id);
  const byMode = groupAggregate(scoringEntries, (entry) => entry.explanation_mode);
  const byDatasetAndMode = groupAggregate(scoringEntries, (entry) => `${entry.dataset_id}__${entry.explanation_mode}`);
  const byRowBucket = groupAggregate(scoringEntries, (entry) => entry.row_count_bucket);
  const byEvidenceAccessMode = groupAggregate(scoringEntries, (entry) => entry.evidence_access_mode);
  const pairedComparison = buildPairedComparison(scoringEntries);

  await writeFile(args.byDatasetPath, `${JSON.stringify(byDataset, null, 2)}\n`, "utf8");
  await writeFile(args.byModePath, `${JSON.stringify(byMode, null, 2)}\n`, "utf8");
  await writeFile(args.byDatasetAndModePath, `${JSON.stringify(byDatasetAndMode, null, 2)}\n`, "utf8");
  await writeFile(args.byRowBucketPath, `${JSON.stringify(byRowBucket, null, 2)}\n`, "utf8");
  await writeFile(args.byEvidenceAccessModePath, `${JSON.stringify(byEvidenceAccessMode, null, 2)}\n`, "utf8");
  await writeFile(args.pairedComparisonJsonPath, `${JSON.stringify(pairedComparison, null, 2)}\n`, "utf8");
  await writeFile(args.pairedComparisonMdPath, renderPairedMarkdown(pairedComparison), "utf8");

  const aggregatePaths = {
    by_dataset: args.byDatasetPath,
    by_mode: args.byModePath,
    by_dataset_and_mode: args.byDatasetAndModePath,
    by_row_count_bucket: args.byRowBucketPath,
    by_evidence_access_mode: args.byEvidenceAccessModePath,
    paired_mode_comparison_json: args.pairedComparisonJsonPath,
    paired_mode_comparison_md: args.pairedComparisonMdPath,
  };

  const manifestText = `${scoringEntries.map((entry) => JSON.stringify(entry)).join("\n")}${scoringEntries.length ? "\n" : ""}`;
  await writeFile(args.scoringManifestPath, manifestText, "utf8");

  const report = summarizeReport({
    args,
    generatedAt,
    statusEntries,
    attempts,
    scoringEntries,
    issues,
    aggregatePaths,
    pairedComparison,
  });
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderReportMarkdown(report), "utf8");

  console.log(`[phase8] dataset=${args.datasetId} status=${report.status} scored=${report.counts.scored_records}/${report.counts.expected_records} final_records=${report.counts.final_scoring_records} errors=${report.counts.errors}`);
  if (report.status === "FAIL") process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
