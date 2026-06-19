import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUN_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs/full_208");

const DEFAULT_DATASET_ID = "SAMPLE_UCI_POR";
const DEFAULT_QUEUE_MANIFEST_PATH = path.join(
  RUN_ROOT,
  "phase9_single_review_dry_run/pairwise_judge_queue/pairwise_prompt_queue_manifest__SAMPLE_UCI_POR.jsonl",
);
const DEFAULT_VALIDATED_OUTPUTS_DIR = path.join(
  RUN_ROOT,
  "phase9_single_review_dry_run/pairwise_judge_invocation/validated_outputs",
);
const DEFAULT_JUDGE_INPUTS_DIR = path.join(RUN_ROOT, "phase8_judge_inputs/judge_inputs");
const DEFAULT_SCORING_RECORDS_DIR = path.join(RUN_ROOT, "phase8_scoring/final_scoring_records");
const DEFAULT_DERIVED_STAT_MANIFEST_PATH = path.join(
  RUN_ROOT,
  "phase9_single_review_dry_run/derived_stat_evidence/derived_stat_manifest__SAMPLE_UCI_POR.jsonl",
);
const DEFAULT_OUTPUT_DIR = path.join(
  RUN_ROOT,
  "phase9_single_review_dry_run/pairwise_aggregate",
);

const METRICS = [
  "faithfulness",
  "numerical_correctness",
  "completeness",
  "task_relevance",
  "actionability",
  "clarity",
  "safety_fairness",
];

function parseArgs(argv) {
  const args = {
    datasetId: DEFAULT_DATASET_ID,
    queueManifestPath: DEFAULT_QUEUE_MANIFEST_PATH,
    validatedOutputsDir: DEFAULT_VALIDATED_OUTPUTS_DIR,
    judgeInputsDir: DEFAULT_JUDGE_INPUTS_DIR,
    scoringRecordsDir: DEFAULT_SCORING_RECORDS_DIR,
    derivedStatManifestPath: DEFAULT_DERIVED_STAT_MANIFEST_PATH,
    outputDir: DEFAULT_OUTPUT_DIR,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--dataset") args.datasetId = next, i += 1;
    else if (arg === "--queue-manifest") args.queueManifestPath = path.resolve(next), i += 1;
    else if (arg === "--validated-outputs-dir") args.validatedOutputsDir = path.resolve(next), i += 1;
    else if (arg === "--judge-inputs-dir") args.judgeInputsDir = path.resolve(next), i += 1;
    else if (arg === "--scoring-records-dir") args.scoringRecordsDir = path.resolve(next), i += 1;
    else if (arg === "--derived-stat-manifest") args.derivedStatManifestPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  const datasetStem = safeFileStem(args.datasetId);
  return {
    ...args,
    reportJsonPath: path.join(args.outputDir, `pairwise_dry_run_aggregate__${datasetStem}.json`),
    reportMdPath: path.join(args.outputDir, `pairwise_dry_run_aggregate__${datasetStem}.md`),
  };
}

function safeFileStem(value) {
  return String(value).replace(/[^A-Za-z0-9_.-]+/g, "_");
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, "/");
}

async function readText(filePath) {
  return (await readFile(filePath, "utf8")).replace(/^\uFEFF/, "");
}

async function readJson(filePath) {
  return JSON.parse(await readText(filePath));
}

async function maybeReadJson(filePath) {
  try {
    return await readJson(filePath);
  } catch {
    return null;
  }
}

async function readJsonl(filePath) {
  return (await readText(filePath))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function countBy(items, keyFn) {
  const counts = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function rowCountBucket(rowCount) {
  if (!Number.isFinite(rowCount)) return "unknown";
  return rowCount <= 20 ? "<=20" : ">20";
}

function modeForWinner(outputWinner, mapping) {
  if (outputWinner === "tie") return "tie";
  return mapping?.[outputWinner] ?? "unknown";
}

function metricModeWinner(metricWinner, mapping) {
  if (metricWinner === "tie" || metricWinner === "not_applicable") return metricWinner;
  return mapping?.[metricWinner] ?? "unknown";
}

function flagCandidateMode(candidate, mapping) {
  if (candidate === "both") return "both";
  return mapping?.[candidate] ?? candidate ?? "unknown";
}

function normalizeCandidateReason(reason) {
  return String(reason ?? "").replace(/Candidate [AB]/g, "Candidate");
}

function chooseReason(taskOutputs, modeWinner) {
  const preferred = taskOutputs.find((item) => item.mode_winner === modeWinner) ?? taskOutputs[0];
  const decisive = preferred.output.decisive_evidence?.[0]?.reason;
  if (decisive) return decisive;
  const coverage = preferred.output.coverage_comparison?.reason;
  const specificity = preferred.output.specificity_comparison?.reason;
  return [coverage, specificity].filter(Boolean).join(" ");
}

function summarizeMetricReasons(taskOutputs, mappingByPairwiseId) {
  const first = taskOutputs[0];
  const mapping = mappingByPairwiseId[first.output.pairwise_record_id];
  const rows = {};
  for (const metric of METRICS) {
    const metricRecord = first.output.metric_comparison?.[metric];
    rows[metric] = {
      winner: metricModeWinner(metricRecord?.winner, mapping),
      reason: metricRecord?.reason ?? "",
      evidence_refs: metricRecord?.evidence_refs ?? [],
    };
  }
  return rows;
}

async function loadTaskContext(args, taskId) {
  const baselineInput = await readJson(path.join(
    args.judgeInputsDir,
    `${args.datasetId}__${taskId}__baseline_first_20_rows.json`,
  ));
  const taskAwareInput = await readJson(path.join(
    args.judgeInputsDir,
    `${args.datasetId}__${taskId}__task_aware_data_summarization.json`,
  ));
  const baselineScore = await maybeReadJson(path.join(
    args.scoringRecordsDir,
    `${args.datasetId}__${taskId}__baseline_first_20_rows.json`,
  ));
  const taskAwareScore = await maybeReadJson(path.join(
    args.scoringRecordsDir,
    `${args.datasetId}__${taskId}__task_aware_data_summarization.json`,
  ));
  return {
    task_name: baselineInput.task_context?.task_name ?? null,
    ai_summary_type: baselineInput.task_context?.ai_summary_type ?? null,
    explanation_strategy: baselineInput.task_context?.explanation_strategy ?? null,
    full_result_row_count: baselineInput.evidence_access?.full_result_row_count ?? null,
    row_count_bucket: rowCountBucket(baselineInput.evidence_access?.full_result_row_count),
    v2_pointwise: baselineScore && taskAwareScore
      ? {
        baseline_final_score: baselineScore.final_score_after_caps,
        task_aware_final_score: taskAwareScore.final_score_after_caps,
        baseline_verdict: baselineScore.verdict,
        task_aware_verdict: taskAwareScore.verdict,
        baseline_caps: baselineScore.caps_applied ?? [],
        task_aware_caps: taskAwareScore.caps_applied ?? [],
      }
      : null,
  };
}

function derivedStatForTask(derivedRows, taskId) {
  const row = derivedRows.find((item) => item.task_id === taskId);
  if (!row) return null;
  return {
    status: row.status,
    x_column: row.x_column,
    y_column: row.y_column,
    dataset_results: row.dataset_results,
    artifact_path: row.derived_stat_artifact_path,
  };
}

function policyRecommendation(taskSummary) {
  const winner = taskSummary.mode_winner;
  const derived = taskSummary.derived_stat_evidence;
  if (derived?.status === "pass") {
    return "Prompt V3 should include deterministic derived-stat evidence and forbid unsupported_claim penalties when a stated coefficient matches the recomputed Pearson value.";
  }
  if (derived?.status === "skipped") {
    return "Prompt V3 should require the judge to treat coefficient/direction/strength claims cautiously when derived-stat evidence is unavailable because of zero variance or zero rows.";
  }
  if (taskSummary.row_count_bucket === "<=20") {
    return "For small results, prompt/cap policy should not grant task-aware an automatic evidence advantage; decide on explanation quality, omissions, unsupported claims, and proportionality.";
  }
  if (winner === "baseline_first_20_rows") {
    return "Review whether task-aware summary lost because it omitted concrete task deliverables or became less faithful despite broader evidence access.";
  }
  if (winner === "task_aware_data_summarization") {
    return "Prompt V3 should reward evidence-grounded specificity and full-result coverage when it materially improves correctness/completeness.";
  }
  return "No policy change required from this pair alone; keep as tie/control case unless pointwise score disagrees strongly.";
}

async function buildAggregate(args) {
  const queueRows = (await readJsonl(args.queueManifestPath))
    .filter((row) => row.dataset_id === args.datasetId);
  const derivedRows = await readJsonl(args.derivedStatManifestPath);
  const mappingByPairwiseId = Object.fromEntries(
    queueRows.map((row) => [row.pairwise_record_id, row.hidden_mode_mapping]),
  );

  const pairwiseRows = [];
  for (const row of queueRows) {
    const outputPath = path.join(args.validatedOutputsDir, `${row.pairwise_record_id}.json`);
    const output = await readJson(outputPath);
    pairwiseRows.push({
      pairwise_record_id: row.pairwise_record_id,
      task_id: row.task_id,
      order_variant: row.order_variant,
      hidden_mode_mapping: row.hidden_mode_mapping,
      prompt_packet_path: row.prompt_packet_path,
      validated_output_path: toRepoPath(outputPath),
      output,
      mode_winner: modeForWinner(output.winner, row.hidden_mode_mapping),
    });
  }

  const byTask = new Map();
  for (const row of pairwiseRows) {
    if (!byTask.has(row.task_id)) byTask.set(row.task_id, []);
    byTask.get(row.task_id).push(row);
  }

  const taskSummaries = [];
  for (const [taskId, rows] of byTask.entries()) {
    rows.sort((a, b) => a.order_variant.localeCompare(b.order_variant));
    const context = await loadTaskContext(args, taskId);
    const modeWinners = [...new Set(rows.map((row) => row.mode_winner))];
    const modeWinner = modeWinners.length === 1 ? modeWinners[0] : "inconsistent";
    const differenceMagnitudes = [...new Set(rows.map((row) => row.output.difference_magnitude))];
    const confidenceValues = [...new Set(rows.map((row) => row.output.winner_confidence))];
    const rerunFlags = [];
    const seenRerunFlags = new Set();
    for (const row of rows) {
      for (const flag of row.output.absolute_rerun_flags ?? []) {
        const candidateMode = flagCandidateMode(flag.candidate, row.hidden_mode_mapping);
        const key = [
          candidateMode,
          flag.suspected_error_type,
          flag.severity_hint,
          normalizeCandidateReason(flag.reason),
        ].join("||");
        if (seenRerunFlags.has(key)) continue;
        seenRerunFlags.add(key);
        rerunFlags.push({
          order_variant: row.order_variant,
          candidate: flag.candidate,
          candidate_mode: candidateMode,
      suspected_error_type: flag.suspected_error_type,
      severity_hint: flag.severity_hint,
      reason: flag.reason,
      evidence_refs: flag.evidence_refs,
        });
      }
    }
    const summary = {
      task_id: taskId,
      ...context,
      order_consistent: modeWinners.length === 1,
      mode_winner: modeWinner,
      difference_magnitudes: differenceMagnitudes,
      winner_confidences: confidenceValues,
      requires_absolute_rerun: rows.some((row) => row.output.requires_absolute_rerun),
      ab_winner: rows.find((row) => row.order_variant === "AB")?.mode_winner ?? null,
      ba_winner: rows.find((row) => row.order_variant === "BA")?.mode_winner ?? null,
      derived_stat_evidence: derivedStatForTask(derivedRows, taskId),
      metric_comparison: summarizeMetricReasons(rows, mappingByPairwiseId),
      decisive_reason: chooseReason(rows, modeWinner),
      coverage_reason: rows[0].output.coverage_comparison?.reason ?? "",
      specificity_reason: rows[0].output.specificity_comparison?.reason ?? "",
      rerun_flags: rerunFlags,
    };
    summary.policy_recommendation = policyRecommendation(summary);
    taskSummaries.push(summary);
  }

  taskSummaries.sort((a, b) => a.task_id.localeCompare(b.task_id));

  const aggregate = {
    artifact_type: "llm_judge_v3_pairwise_dry_run_aggregate_v1",
    generated_at: new Date().toISOString(),
    dry_run_mode: "single_review",
    dataset_id: args.datasetId,
    task_count: taskSummaries.length,
    pairwise_record_count: pairwiseRows.length,
    order_consistency: {
      consistent_task_count: taskSummaries.filter((task) => task.order_consistent).length,
      inconsistent_task_count: taskSummaries.filter((task) => !task.order_consistent).length,
    },
    winner_counts_by_mode: countBy(taskSummaries, (task) => task.mode_winner),
    winner_counts_by_row_bucket: countBy(taskSummaries, (task) => `${task.row_count_bucket}:${task.mode_winner}`),
    requires_absolute_rerun_task_count: taskSummaries.filter((task) => task.requires_absolute_rerun).length,
    prompt_policy_decisions: buildPromptPolicyDecisions(taskSummaries),
    cap_policy_decisions: buildCapPolicyDecisions(taskSummaries),
    v3_rerun_candidate_cap_set: {
      policy_status: "single_review_dry_run_candidate_not_final_human_calibrated",
      major_factual_or_unsupported_numerical_claim_cap: 5.0,
      core_output_omission_cap: 6.5,
      critical_factual_or_contradictory_core_numerical_claim_cap: 2.0,
      note: "These are calibration candidates for the UCI V3 rerun, not final thesis-wide calibrated caps.",
    },
    v3_acceptance_criterion: {
      pairwise_alignment_scope: "15 dry-run task pairs",
      minimum_alignment_required: 12,
      rule: "After the UCI V3 pointwise rerun, compare pointwise winner against pairwise dry-run winner on these 15 task pairs. V3 is acceptable for proceeding to OULAD only if pointwise winner aligns with pairwise winner on at least 12 of 15 tasks and no critical derived-stat contradiction remains unresolved.",
    },
    task_summaries: taskSummaries,
  };

  return aggregate;
}

function buildPromptPolicyDecisions(taskSummaries) {
  return [
    {
      decision_id: "P1_DERIVED_STAT_AVAILABLE_USE_AND_DO_NOT_CAP_SUPPORTED_COEFFICIENT",
      recommendation: "Adopt",
      reason: "When deterministic Pearson evidence exists, the judge must use it as primary provenance. A coefficient matching the recomputed value must not be penalized as unsupported. This changed A-G13 and S-T09 from unsupported-claim risk to evidence-supported task-aware wins, and exposed V2 ties on S-T14/S-T15 as insufficiently sensitive.",
      affected_tasks: taskSummaries
        .filter((task) => task.derived_stat_evidence?.status === "pass")
        .map((task) => task.task_id),
    },
    {
      decision_id: "P2_DERIVED_STAT_UNAVAILABLE_DO_NOT_INVENT_COEFFICIENT_OR_DIRECTION",
      recommendation: "Adopt",
      reason: "When deterministic evidence says zero variance, zero rows, or no valid numeric pairs, the judge must penalize coefficient/direction/strength claims that go beyond the evidence. A-G02 tests this branch: it is not the same as A-G13. A-G02 means no derived coefficient is available; A-G13 means a coefficient is available and should be trusted.",
      affected_tasks: taskSummaries
        .filter((task) => task.derived_stat_evidence?.status === "skipped")
        .map((task) => task.task_id),
    },
    {
      decision_id: "P3_PAIRWISE_TIE_MUST_BE_EXPLAINED_METRIC_BY_METRIC",
      recommendation: "Adopt",
      reason: "Only A-G14 remained tie in the dry run; the pairwise prompt reduced uninformative ties while remaining position-consistent.",
      affected_tasks: taskSummaries.filter((task) => task.mode_winner === "tie").map((task) => task.task_id),
    },
    {
      decision_id: "P4_SMALL_RESULT_NO_AUTOMATIC_TASK_AWARE_ADVANTAGE",
      recommendation: "Adopt",
      reason: "Several <=20-row cases favored baseline; for small results both modes have full row coverage, so content quality and cap-worthy defects should decide.",
      affected_tasks: taskSummaries
        .filter((task) => task.row_count_bucket === "<=20")
        .map((task) => task.task_id),
    },
  ];
}

function buildCapPolicyDecisions(taskSummaries) {
  const capSensitive = taskSummaries.filter((task) => task.requires_absolute_rerun);
  return [
    {
      decision_id: "C1_UNSUPPORTED_NUMERICAL_CLAIM_REQUIRES_DERIVED_STAT_CHECK",
      recommendation: "Change prompt/scoring guidance before rerun",
      reason: "Do not apply major unsupported-claim cap when deterministic derived stats support the claimed coefficient. Conversely, coefficient claims remain cap candidates when derived stats are unavailable or contradictory.",
      affected_tasks: taskSummaries
        .filter((task) => task.derived_stat_evidence)
        .map((task) => task.task_id),
    },
    {
      decision_id: "C2_MAJOR_FACTUAL_CAP_CANDIDATE_5",
      recommendation: "Use calibration candidate in V3 rerun",
      reason: "Use major factual / unsupported numerical claim cap = 5.0 for the V3 UCI rerun candidate set. Cap 4.0 is likely too severe for proportionality or overstatement cases that are not central numerical hallucinations. Critical contradictions such as wrong correlation direction can still receive a critical cap below this candidate.",
      affected_tasks: capSensitive.map((task) => task.task_id),
    },
    {
      decision_id: "C3_CORE_OUTPUT_OMISSION_CAP_CANDIDATE_6_5",
      recommendation: "Use calibration candidate in V3 rerun",
      reason: "Use core-output omission cap = 6.5 for the V3 UCI rerun candidate set. Baseline wins on several small-result cases appear driven by task-aware omission or weaker task fit rather than row coverage, but cap 6.0 may be too harsh before two-reviewer calibration.",
      affected_tasks: taskSummaries
        .filter((task) => task.mode_winner === "baseline_first_20_rows")
        .map((task) => task.task_id),
    },
  ];
}

function renderMarkdown(report) {
  const lines = [
    "# Pairwise Dry-Run Aggregate Report",
    "",
    `Dataset: ${report.dataset_id}`,
    `Dry-run mode: ${report.dry_run_mode}`,
    `Task pairs: ${report.task_count}`,
    `Pairwise records: ${report.pairwise_record_count}`,
    `Order-consistent tasks: ${report.order_consistency.consistent_task_count}/${report.task_count}`,
    `Position-bias inconsistent tasks: ${report.order_consistency.inconsistent_task_count}`,
    `Tasks requiring absolute rerun: ${report.requires_absolute_rerun_task_count}/${report.task_count}`,
    "",
    "## Winner Summary",
    "",
    "| Winner | Task count |",
    "|---|---:|",
  ];
  for (const [winner, count] of Object.entries(report.winner_counts_by_mode)) {
    lines.push(`| ${winner} | ${count} |`);
  }

  lines.push("");
  lines.push("## Row-Bucket Winner Summary");
  lines.push("");
  lines.push("| Row bucket + winner | Task count |");
  lines.push("|---|---:|");
  for (const [bucketWinner, count] of Object.entries(report.winner_counts_by_row_bucket)) {
    lines.push(`| ${bucketWinner} | ${count} |`);
  }

  lines.push("");
  lines.push("## Prompt Policy Decisions");
  lines.push("");
  for (const decision of report.prompt_policy_decisions) {
    lines.push(`### ${decision.decision_id}`);
    lines.push("");
    lines.push(`Recommendation: ${decision.recommendation}`);
    lines.push("");
    lines.push(decision.reason);
    lines.push("");
    lines.push(`Affected tasks: ${decision.affected_tasks.length ? decision.affected_tasks.join(", ") : "none"}`);
    lines.push("");
  }

  lines.push("## Cap Policy Decisions");
  lines.push("");
  for (const decision of report.cap_policy_decisions) {
    lines.push(`### ${decision.decision_id}`);
    lines.push("");
    lines.push(`Recommendation: ${decision.recommendation}`);
    lines.push("");
    lines.push(decision.reason);
    lines.push("");
    lines.push(`Affected tasks: ${decision.affected_tasks.length ? decision.affected_tasks.join(", ") : "none"}`);
    lines.push("");
  }

  lines.push("## V3 Rerun Candidate Cap Set");
  lines.push("");
  lines.push(`Policy status: ${report.v3_rerun_candidate_cap_set.policy_status}`);
  lines.push("");
  lines.push("| Cap family | Candidate cap |");
  lines.push("|---|---:|");
  lines.push(`| Major factual or unsupported numerical claim | ${report.v3_rerun_candidate_cap_set.major_factual_or_unsupported_numerical_claim_cap} |`);
  lines.push(`| Core-output omission | ${report.v3_rerun_candidate_cap_set.core_output_omission_cap} |`);
  lines.push(`| Critical factual or contradictory core numerical claim | ${report.v3_rerun_candidate_cap_set.critical_factual_or_contradictory_core_numerical_claim_cap} |`);
  lines.push("");
  lines.push(report.v3_rerun_candidate_cap_set.note);
  lines.push("");

  lines.push("## V3 Acceptance Criterion");
  lines.push("");
  lines.push(`Scope: ${report.v3_acceptance_criterion.pairwise_alignment_scope}`);
  lines.push("");
  lines.push(`Minimum required alignment: ${report.v3_acceptance_criterion.minimum_alignment_required}/15`);
  lines.push("");
  lines.push(report.v3_acceptance_criterion.rule);
  lines.push("");

  lines.push("## Per-Task Analysis");
  lines.push("");
  lines.push("| Task | Rows | V2 scores baseline/task-aware | Pairwise winner | Magnitude | Rerun? | Main reason |");
  lines.push("|---|---:|---:|---|---|---|---|");
  for (const task of report.task_summaries) {
    const v2 = task.v2_pointwise
      ? `${task.v2_pointwise.baseline_final_score}/${task.v2_pointwise.task_aware_final_score}`
      : "";
    lines.push([
      task.task_id,
      task.full_result_row_count ?? "",
      v2,
      task.mode_winner,
      task.difference_magnitudes.join("/"),
      task.requires_absolute_rerun ? "yes" : "no",
      task.decisive_reason.replaceAll("|", "/"),
    ].join(" | ").replace(/^/, "| ").replace(/$/, " |"));
  }

  lines.push("");
  lines.push("## Detailed Task Notes");
  lines.push("");
  for (const task of report.task_summaries) {
    lines.push(`### ${task.task_id} - ${task.task_name}`);
    lines.push("");
    lines.push(`Pairwise winner: ${task.mode_winner}`);
    lines.push(`AB/BA consistency: ${task.order_consistent ? "consistent" : "inconsistent"} (${task.ab_winner} / ${task.ba_winner})`);
    lines.push(`Rows: ${task.full_result_row_count} (${task.row_count_bucket})`);
    if (task.derived_stat_evidence) {
      const stat = task.derived_stat_evidence.dataset_results?.[0];
      lines.push(`Derived-stat evidence: ${task.derived_stat_evidence.status}; ${task.derived_stat_evidence.x_column} vs ${task.derived_stat_evidence.y_column}; r=${stat?.pearson_r_rounded_4 ?? "n/a"}; reason=${stat?.reason ?? "n/a"}`);
    }
    lines.push("");
    lines.push(`Main reason: ${task.decisive_reason}`);
    lines.push("");
    lines.push(`Coverage: ${task.coverage_reason}`);
    lines.push("");
    lines.push(`Specificity: ${task.specificity_reason}`);
    lines.push("");
    lines.push(`Policy recommendation: ${task.policy_recommendation}`);
    lines.push("");
    if (task.rerun_flags.length > 0) {
      lines.push("Rerun flags:");
      for (const flag of task.rerun_flags.slice(0, 4)) {
        lines.push(`- ${flag.candidate_mode} / ${flag.suspected_error_type} (${flag.severity_hint}): ${flag.reason}`);
      }
      lines.push("");
    }
  }

  lines.push("## Rerun Recommendation");
  lines.push("");
  lines.push("Before rerunning all 104 UCI pointwise records, update the pointwise judge prompt/cap guidance to include the prompt and cap policy decisions above. Because these changes affect global judging behavior, the cleaner thesis-facing path is to rerun all 104 UCI records under a new V3/calibrated-dry-run version rather than patch only correlation records. The UCI V3 pointwise rerun should be accepted only if it aligns with the pairwise dry-run winner on at least 12 of the 15 dry-run task pairs and has no unresolved critical derived-stat contradiction.");
  lines.push("");

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await mkdir(args.outputDir, { recursive: true });
  const report = await buildAggregate(args);
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderMarkdown(report), "utf8");
  console.log(`[pairwise-aggregate] dataset=${args.datasetId} tasks=${report.task_count} records=${report.pairwise_record_count}`);
  console.log(`report: ${toRepoPath(args.reportMdPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
