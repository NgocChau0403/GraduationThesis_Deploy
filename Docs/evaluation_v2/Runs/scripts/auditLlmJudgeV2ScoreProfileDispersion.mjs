import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");

function parseArgs(argv) {
  const args = { datasetId: "SAMPLE_UCI_POR", dominanceThreshold: 0.5 };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--paired-comparison") args.pairedComparisonPath = path.resolve(next), i += 1;
    else if (arg === "--scoring-manifest") args.scoringManifestPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else if (arg === "--dataset") args.datasetId = next, i += 1;
    else if (arg === "--dominance-threshold") args.dominanceThreshold = Number(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  for (const key of ["pairedComparisonPath", "scoringManifestPath", "outputDir"]) {
    if (!args[key]) throw new Error(`Missing required argument: ${key}`);
  }
  return args;
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).split(path.sep).join("/");
}

async function readJson(filePath) {
  return JSON.parse((await readFile(filePath, "utf8")).replace(/^\uFEFF/, ""));
}

async function readJsonl(filePath) {
  return (await readFile(filePath, "utf8"))
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function scoreProfile(record) {
  const metricScores = record.metric_scores ?? {};
  const metrics = ["faithfulness", "numerical_correctness", "completeness", "task_relevance", "actionability", "clarity", "safety_fairness"];
  return metrics.map((metric) => `${metric}:${metricScores[metric] ?? "null"}`).join("|");
}

function increment(map, key, item) {
  const bucket = map.get(key) ?? { key, count: 0, examples: [] };
  bucket.count += 1;
  if (bucket.examples.length < 8) bucket.examples.push(item);
  map.set(key, bucket);
}

function topBuckets(map) {
  return [...map.values()].sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}

function renderMarkdown(report) {
  const lines = [
    `# Score Profile Dispersion Audit - ${report.dataset_id}`,
    "",
    "Advisory audit only. This report warns about repeated score profiles but does not replace semantic review.",
    "",
    "## Summary",
    "",
    `- Scoring records: ${report.counts.scoring_records}`,
    `- Paired records: ${report.counts.pairs}`,
    `- Dominant per-record profile count: ${report.record_profile_dominance?.count ?? 0}`,
    `- Dominant pair score profile count: ${report.pair_score_profile_dominance?.count ?? 0}`,
    `- Dominance threshold: ${report.dominance_threshold}`,
    `- Advisory status: ${report.status}`,
    "",
    "## Warnings",
    "",
    ...(report.warnings.length ? report.warnings.map((warning) => `- ${warning}`) : ["- None"]),
    "",
    "## Top Per-Record Score Profiles",
    "",
    "| Count | Profile | Example records |",
    "| ---: | --- | --- |",
    ...report.top_record_profiles.map((profile) => `| ${profile.count} | \`${profile.key}\` | ${profile.examples.join(", ")} |`),
    "",
    "## Top Pair Score Profiles",
    "",
    "| Count | Profile | Example tasks |",
    "| ---: | --- | --- |",
    ...report.top_pair_score_profiles.map((profile) => `| ${profile.count} | \`${profile.key}\` | ${profile.examples.join(", ")} |`),
    "",
  ];
  return lines.join("\n");
}

const args = parseArgs(process.argv.slice(2));
const pairedComparison = await readJson(args.pairedComparisonPath);
const scoringRecords = await readJsonl(args.scoringManifestPath);

const recordProfileMap = new Map();
for (const record of scoringRecords) {
  increment(recordProfileMap, `${record.explanation_mode}__${scoreProfile(record)}__final:${record.final_score_after_caps}`, record.record_id);
}

const pairProfileMap = new Map();
for (const pair of pairedComparison.pairs ?? []) {
  const key = `baseline:${pair.baseline_final_score}__task_aware:${pair.task_aware_final_score}__delta:${pair.delta_task_aware_minus_baseline}__winner:${pair.winner}`;
  increment(pairProfileMap, key, pair.task_id);
}

const topRecordProfiles = topBuckets(recordProfileMap);
const topPairProfiles = topBuckets(pairProfileMap);
const warnings = [];
const recordDominance = topRecordProfiles[0] ?? null;
const pairDominance = topPairProfiles[0] ?? null;
if (recordDominance && recordDominance.count / scoringRecords.length > args.dominanceThreshold) {
  warnings.push(`One per-record score profile covers ${recordDominance.count}/${scoringRecords.length} records.`);
}
if (pairDominance && pairDominance.count / (pairedComparison.pairs?.length ?? 1) > args.dominanceThreshold) {
  warnings.push(`One pair score profile covers ${pairDominance.count}/${pairedComparison.pairs?.length ?? 0} task pairs.`);
}

const report = {
  report_version: "llm_judge_v2_score_profile_dispersion_advisory_v1",
  dataset_id: args.datasetId,
  status: warnings.length ? "WARN" : "PASS",
  dominance_threshold: args.dominanceThreshold,
  inputs: {
    paired_comparison_path: toRepoPath(args.pairedComparisonPath),
    scoring_manifest_path: toRepoPath(args.scoringManifestPath),
  },
  counts: {
    scoring_records: scoringRecords.length,
    pairs: pairedComparison.pairs?.length ?? 0,
  },
  record_profile_dominance: recordDominance,
  pair_score_profile_dominance: pairDominance,
  top_record_profiles: topRecordProfiles.slice(0, 10),
  top_pair_score_profiles: topPairProfiles.slice(0, 10),
  warnings,
};

await mkdir(args.outputDir, { recursive: true });
const jsonPath = path.join(args.outputDir, `score_profile_dispersion_audit__${args.datasetId}.json`);
const mdPath = path.join(args.outputDir, `score_profile_dispersion_audit__${args.datasetId}.md`);
await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(mdPath, renderMarkdown(report), "utf8");

process.stdout.write(`${JSON.stringify({
  status: report.status,
  warnings: report.warnings,
  report_json: toRepoPath(jsonPath),
  report_md: toRepoPath(mdPath),
}, null, 2)}\n`);
