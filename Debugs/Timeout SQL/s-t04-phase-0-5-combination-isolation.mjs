import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import prisma from "../Backend/src/lib/prisma.js";
import taskRegistryService from "../Backend/src/services/taskRegistry.service.js";
import { dryRunSqlTask } from "../Backend/src/services/sqlExecution.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const explainDir = path.join(__dirname, "explain");
const reportPath = path.join(__dirname, "s-t04-phase-0-5-combination-isolation-report.md");

const preferredContext = {
  batch_id: "SAMPLE_UCI_POR",
  class_id: "SAMPLE_UCI_POR_CLASS",
  student_id: "SAMPLE_UCI_POR_STU_000001",
  enrollment_id: "SAMPLE_UCI_POR_ENR_000001",
  s1: "SAMPLE_UCI_POR_STU_000001",
  s2: "SAMPLE_UCI_POR_STU_000002",
};

const variants = [
  {
    id: "baseline",
    label: "Baseline",
    file: "s-t04-phase-0-5-baseline.json",
    materializedCtes: [],
  },
  {
    id: "all_suspect",
    label: "All suspect",
    file: "s-t04-phase-0-5-all-suspect.json",
    materializedCtes: ["score_context", "score_agg", "punctuality", "eng_agg", "class_max", "eng_score", "risk_flags"],
  },
  {
    id: "combo_01",
    label: "combo_01 score_context + eng_agg",
    file: "s-t04-phase-0-5-combo-01-score-context-eng-agg.json",
    materializedCtes: ["score_context", "eng_agg"],
  },
  {
    id: "combo_02",
    label: "combo_02 score_context + class_max",
    file: "s-t04-phase-0-5-combo-02-score-context-class-max.json",
    materializedCtes: ["score_context", "class_max"],
  },
  {
    id: "combo_03",
    label: "combo_03 score_context + eng_score",
    file: "s-t04-phase-0-5-combo-03-score-context-eng-score.json",
    materializedCtes: ["score_context", "eng_score"],
  },
  {
    id: "combo_04",
    label: "combo_04 score_context + risk_flags",
    file: "s-t04-phase-0-5-combo-04-score-context-risk-flags.json",
    materializedCtes: ["score_context", "risk_flags"],
  },
  {
    id: "combo_05",
    label: "combo_05 score_context + eng_agg + eng_score",
    file: "s-t04-phase-0-5-combo-05-score-context-eng-agg-eng-score.json",
    materializedCtes: ["score_context", "eng_agg", "eng_score"],
  },
  {
    id: "combo_06",
    label: "combo_06 score_context + score_agg + punctuality",
    file: "s-t04-phase-0-5-combo-06-score-context-score-agg-punctuality.json",
    materializedCtes: ["score_context", "score_agg", "punctuality"],
  },
  {
    id: "combo_07",
    label: "combo_07 score_context + eng_agg + class_max",
    file: "s-t04-phase-0-5-combo-07-score-context-eng-agg-class-max.json",
    materializedCtes: ["score_context", "eng_agg", "class_max"],
  },
  {
    id: "combo_08",
    label: "combo_08 score_context + eng_agg + risk_flags",
    file: "s-t04-phase-0-5-combo-08-score-context-eng-agg-risk-flags.json",
    materializedCtes: ["score_context", "eng_agg", "risk_flags"],
  },
  {
    id: "combo_09",
    label: "combo_09 score_context + class_max + eng_score",
    file: "s-t04-phase-0-5-combo-09-score-context-class-max-eng-score.json",
    materializedCtes: ["score_context", "class_max", "eng_score"],
  },
  {
    id: "combo_10",
    label: "combo_10 score_context + eng_score + risk_flags",
    file: "s-t04-phase-0-5-combo-10-score-context-eng-score-risk-flags.json",
    materializedCtes: ["score_context", "eng_score", "risk_flags"],
  },
  {
    id: "combo_11",
    label: "combo_11 score_context + eng_agg + class_max + eng_score",
    file: "s-t04-phase-0-5-combo-11-score-context-eng-agg-class-max-eng-score.json",
    materializedCtes: ["score_context", "eng_agg", "class_max", "eng_score"],
  },
  {
    id: "combo_12",
    label: "combo_12 score_context + eng_agg + class_max + eng_score + risk_flags",
    file: "s-t04-phase-0-5-combo-12-score-context-eng-agg-class-max-eng-score-risk-flags.json",
    materializedCtes: ["score_context", "eng_agg", "class_max", "eng_score", "risk_flags"],
  },
];

function materializeCtes(sql, cteNames) {
  let transformed = sql;
  for (const cteName of cteNames) {
    const re = new RegExp(`\\b${cteName}\\s+AS\\s*\\(`, "i");
    transformed = transformed.replace(re, `${cteName} AS MATERIALIZED (`);
  }
  return transformed;
}

function collectCteNames(sql) {
  const names = [];
  const re = /(?:WITH|,)\s*([a-zA-Z_][\w]*)\s+AS\s*(?:MATERIALIZED\s*)?\(/gi;
  for (const match of sql.matchAll(re)) names.push(match[1]);
  return names;
}

function collectPlanNodes(root) {
  const nodes = [];
  const walk = (node, depth = 0) => {
    nodes.push({ ...node, __depth: depth });
    for (const child of node.Plans ?? []) walk(child, depth + 1);
  };
  walk(root);
  return nodes;
}

function sum(nodes, key) {
  return nodes.reduce((total, node) => total + Number(node[key] ?? 0), 0);
}

function summarizePlan(planEnvelope) {
  const root = planEnvelope.Plan;
  const nodes = collectPlanNodes(root);
  const byType = (type) => nodes.filter((node) => node["Node Type"] === type);
  const byRelation = (relation) =>
    nodes.filter((node) => String(node["Relation Name"] ?? "").toLowerCase() === relation);

  return {
    planningTimeMs: Number(planEnvelope["Planning Time"] ?? 0),
    executionTimeMs: Number(planEnvelope["Execution Time"] ?? 0),
    outputRows: Number(root["Actual Rows"] ?? 0),
    sharedHitBlocks: Number(root["Shared Hit Blocks"] ?? sum(nodes, "Shared Hit Blocks")),
    sharedReadBlocks: Number(root["Shared Read Blocks"] ?? sum(nodes, "Shared Read Blocks")),
    aggregateNodeCount: byType("Aggregate").length,
    aggregateLoops: sum(byType("Aggregate"), "Actual Loops"),
    windowAggNodeCount: byType("WindowAgg").length,
    windowAggLoops: sum(byType("WindowAgg"), "Actual Loops"),
    nestedLoopNodeCount: byType("Nested Loop").length,
    nestedLoopLoops: sum(byType("Nested Loop"), "Actual Loops"),
    assessmentResultScanLoops: sum(byRelation("assessment_result"), "Actual Loops"),
    assessmentScanLoops: sum(byRelation("assessment"), "Actual Loops"),
    enrollmentScanLoops: sum(byRelation("enrollment"), "Actual Loops"),
    engagementScanLoops: sum(byRelation("engagement"), "Actual Loops"),
    indexNames: [...new Set(nodes.map((node) => node["Index Name"]).filter(Boolean))].sort(),
    hotNodes: nodes
      .filter((node) => {
        const time = Number(node["Actual Total Time"] ?? 0);
        const hits = Number(node["Shared Hit Blocks"] ?? 0);
        const loops = Number(node["Actual Loops"] ?? 0);
        return time > 1000 || hits > 1_000_000 || loops > 1000;
      })
      .map((node) => ({
        depth: node.__depth,
        nodeType: node["Node Type"],
        relation: node["Relation Name"] ?? node.Alias ?? "",
        indexName: node["Index Name"] ?? "",
        actualRows: Number(node["Actual Rows"] ?? 0),
        actualLoops: Number(node["Actual Loops"] ?? 0),
        actualTotalTimeMs: Number(node["Actual Total Time"] ?? 0),
        sharedHitBlocks: Number(node["Shared Hit Blocks"] ?? 0),
        sharedReadBlocks: Number(node["Shared Read Blocks"] ?? 0),
        indexCond: node["Index Cond"] ?? "",
        filter: node.Filter ?? "",
        joinFilter: node["Join Filter"] ?? "",
      })),
  };
}

function pctReduction(before, after) {
  if (!before || !Number.isFinite(before) || !Number.isFinite(after)) return "n/a";
  return `${(((before - after) / before) * 100).toFixed(1)}%`;
}

function ratio(value, reference) {
  if (!reference || !Number.isFinite(value) || !Number.isFinite(reference)) return "n/a";
  return `${(value / reference).toFixed(2)}x`;
}

function fmt(value, digits = 2) {
  if (!Number.isFinite(value)) return "n/a";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

async function resolveContext() {
  const preferredRows = await prisma.$queryRawUnsafe(
    `SELECT e.batch_id, e.class_id, e.student_id, e.enrollment_id
     FROM enrollment e
     WHERE e.batch_id = $1 AND e.class_id = $2 AND e.student_id = $3 AND e.enrollment_id = $4
     LIMIT 1`,
    preferredContext.batch_id,
    preferredContext.class_id,
    preferredContext.student_id,
    preferredContext.enrollment_id
  );

  if (preferredRows.length > 0) {
    return { ...preferredContext, contextSource: "preferred_context" };
  }

  const fallbackRows = await prisma.$queryRawUnsafe(
    `SELECT e.batch_id, e.class_id, e.student_id, e.enrollment_id
     FROM enrollment e
     JOIN assessment_result ar ON ar.enrollment_id = e.enrollment_id AND ar.batch_id = e.batch_id
     JOIN assessment a ON a.assessment_id = ar.assessment_id AND a.batch_id = ar.batch_id
     WHERE e.class_id IS NOT NULL
     GROUP BY e.batch_id, e.class_id, e.student_id, e.enrollment_id
     ORDER BY COUNT(ar.result_id) DESC
     LIMIT 1`
  );

  if (fallbackRows.length === 0) {
    throw new Error("No valid enrollment context with assessment results found");
  }

  const row = fallbackRows[0];
  return {
    batch_id: row.batch_id,
    class_id: row.class_id,
    student_id: row.student_id,
    enrollment_id: row.enrollment_id,
    s1: row.student_id,
    s2: row.student_id,
    contextSource: "fallback_from_database",
  };
}

async function readPreviousPhase0Baseline() {
  try {
    const raw = await fs.readFile(path.join(explainDir, "s-t04-baseline.json"), "utf8");
    return JSON.parse(raw).summary ?? null;
  } catch {
    return null;
  }
}

function makeComparisonRows(results, baseline, allSuspect) {
  return results
    .map((result) => {
      if (!result.ok) {
        return `| ${result.label} | ERROR | ${result.error} | - | - | - | - | - | - | - | - | - | - | - | - | - | - |`;
      }
      const s = result.summary;
      return [
        `| ${result.label}`,
        fmt(s.planningTimeMs),
        fmt(s.executionTimeMs),
        baseline ? pctReduction(baseline.executionTimeMs, s.executionTimeMs) : "n/a",
        allSuspect ? ratio(s.executionTimeMs, allSuspect.executionTimeMs) : "n/a",
        s.sharedHitBlocks.toLocaleString("en-US"),
        s.sharedReadBlocks.toLocaleString("en-US"),
        s.aggregateNodeCount.toLocaleString("en-US"),
        s.aggregateLoops.toLocaleString("en-US"),
        s.windowAggNodeCount.toLocaleString("en-US"),
        s.windowAggLoops.toLocaleString("en-US"),
        `${s.nestedLoopNodeCount}/${s.nestedLoopLoops.toLocaleString("en-US")}`,
        s.assessmentResultScanLoops.toLocaleString("en-US"),
        s.assessmentScanLoops.toLocaleString("en-US"),
        s.engagementScanLoops.toLocaleString("en-US"),
        s.outputRows.toLocaleString("en-US"),
        `${s.indexNames.join(", ") || "-"} |`,
      ].join(" | ");
    })
    .join("\n");
}

function candidateScore(result, baseline, allSuspect) {
  if (!result.ok || result.id === "baseline" || result.id === "all_suspect") return null;
  const s = result.summary;
  const execReduction = baseline.executionTimeMs
    ? (baseline.executionTimeMs - s.executionTimeMs) / baseline.executionTimeMs
    : 0;
  const hitRatio = allSuspect.sharedHitBlocks ? s.sharedHitBlocks / allSuspect.sharedHitBlocks : Infinity;
  const allRatio = allSuspect.executionTimeMs ? s.executionTimeMs / allSuspect.executionTimeMs : Infinity;
  const aggregateReduction = baseline.aggregateLoops
    ? (baseline.aggregateLoops - s.aggregateLoops) / baseline.aggregateLoops
    : 0;
  const candidate =
    execReduction >= 0.95 &&
    allRatio <= 3 &&
    aggregateReduction >= 0.95 &&
    hitRatio <= 3 &&
    s.outputRows >= 0;
  return {
    ...result,
    execReduction,
    allRatio,
    hitRatio,
    aggregateReduction,
    isCandidate: candidate,
    cteCount: result.materializedCtes.length,
  };
}

function chooseCandidates(results) {
  const baselineResult = results.find((result) => result.id === "baseline" && result.ok);
  const allSuspectResult = results.find((result) => result.id === "all_suspect" && result.ok);
  if (!baselineResult || !allSuspectResult) return { scored: [], candidates: [], chosen: null };

  const baseline = baselineResult.summary;
  const allSuspect = allSuspectResult.summary;
  const scored = results
    .map((result) => candidateScore(result, baseline, allSuspect))
    .filter(Boolean);
  const candidates = scored.filter((result) => result.isCandidate);
  const chosen = candidates
    .slice()
    .sort((a, b) =>
      a.cteCount - b.cteCount ||
      a.summary.executionTimeMs - b.summary.executionTimeMs
    )[0] ?? null;
  return { scored, candidates, chosen };
}

function makeBestCandidateSection(results) {
  const { scored, candidates, chosen } = chooseCandidates(results);
  const rows = scored
    .map((result) =>
      [
        `| ${result.label}`,
        result.materializedCtes.map((name) => `\`${name}\``).join(", "),
        result.cteCount,
        fmt(result.summary.executionTimeMs),
        `${(result.execReduction * 100).toFixed(1)}%`,
        `${result.allRatio.toFixed(2)}x`,
        `${(result.aggregateReduction * 100).toFixed(1)}%`,
        `${result.hitRatio.toFixed(2)}x`,
        `${result.isCandidate ? "YES" : "NO"} |`,
      ].join(" | ")
    )
    .join("\n");

  return {
    chosen,
    text: `| Variant | CTEs | CTE count | Execution ms | Exec reduction | Vs all_suspect | Aggregate loop reduction | Hit block ratio vs all_suspect | Candidate |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${rows || "| - | - | - | - | - | - | - | - | - |"}

Candidate count: **${candidates.length}**.

Minimal safe set: **${chosen ? `${chosen.label} (${chosen.materializedCtes.join(", ")})` : "none"}**.`,
  };
}

function makeHotNodeSections(results) {
  return results
    .filter((result) => result.ok)
    .map((result) => {
      const rows = result.summary.hotNodes
        .map((node) =>
          [
            `| ${node.depth}`,
            node.nodeType,
            node.relation || "-",
            node.indexName || "-",
            node.actualRows.toLocaleString("en-US"),
            node.actualLoops.toLocaleString("en-US"),
            fmt(node.actualTotalTimeMs),
            node.sharedHitBlocks.toLocaleString("en-US"),
            node.sharedReadBlocks.toLocaleString("en-US"),
            `${node.indexCond || node.filter || node.joinFilter || "-"} |`,
          ].join(" | ")
        )
        .join("\n");

      return `### ${result.label}

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
${rows || "| - | - | - | - | - | - | - | - | - | Không có hot node vượt ngưỡng |"}`;
    })
    .join("\n\n");
}

function makeReport({ context, ctes, results, previousBaseline }) {
  const baseline = results.find((result) => result.id === "baseline" && result.ok)?.summary ?? null;
  const allSuspect = results.find((result) => result.id === "all_suspect" && result.ok)?.summary ?? null;
  const fastest = results.filter((result) => result.ok).slice().sort((a, b) => a.summary.executionTimeMs - b.summary.executionTimeMs)[0] ?? null;
  const bestCandidates = makeBestCandidateSection(results);
  const chosen = bestCandidates.chosen;
  const status = chosen ? "Status: FIX CANDIDATE IDENTIFIED" : "Status: NEEDS MORE INVESTIGATION";
  const variantRows = variants
    .map((variant) => `| ${variant.id} | ${variant.label} | ${variant.materializedCtes.length ? variant.materializedCtes.map((name) => `\`${name}\``).join(", ") : "none"} | \`Debugs/explain/${variant.file}\` |`)
    .join("\n");

  const requiredCtes = chosen ? chosen.materializedCtes : [];
  const unnecessaryCtes = chosen
    ? ["score_context", "score_agg", "punctuality", "eng_agg", "class_max", "eng_score", "risk_flags"].filter((name) => !requiredCtes.includes(name))
    : [];

  return `# S-T04 Phase 0.5 Combination Isolation Report

## Summary

Phase 0.5 only. Không implement production fix. Không sửa registry, runtime rewrite, index, migration hoặc timeout.

${status}

- Fastest variant: **${fastest ? fastest.label : "n/a"}** (${fastest ? fmt(fastest.summary.executionTimeMs) : "n/a"}ms).
- Minimal safe set: **${chosen ? chosen.materializedCtes.join(", ") : "none"}**.
- All suspect execution: **${allSuspect ? fmt(allSuspect.executionTimeMs) : "n/a"}ms**.

## Context Used

| Param | Value |
| --- | --- |
| context_source | \`${context.contextSource}\` |
| batch_id | \`${context.batch_id}\` |
| class_id | \`${context.class_id}\` |
| student_id | \`${context.student_id}\` |
| enrollment_id | \`${context.enrollment_id}\` |

## Previous Phase 0 Baseline

${previousBaseline
  ? `Previous Phase 0 baseline artifact found: execution=${fmt(previousBaseline.executionTimeMs)}ms, aggregate loops=${previousBaseline.aggregateLoops.toLocaleString("en-US")}, hit blocks=${previousBaseline.sharedHitBlocks.toLocaleString("en-US")}.`
  : "Previous Phase 0 baseline artifact not found; this run includes a fresh baseline."}

Fresh Phase 0.5 baseline: ${baseline ? `execution=${fmt(baseline.executionTimeMs)}ms, aggregate loops=${baseline.aggregateLoops.toLocaleString("en-US")}, hit blocks=${baseline.sharedHitBlocks.toLocaleString("en-US")}.` : "not available"}.

## Variant Definitions

S-T04 CTE inventory:

${ctes.map((cte) => `- \`${cte}\``).join("\n")}

| Variant ID | Label | Materialized CTEs | Artifact |
| --- | --- | --- | --- |
${variantRows}

## Comparison Table

| Variant | Planning ms | Execution ms | Execution reduction vs baseline | Execution vs all_suspect | Shared hit blocks | Shared read blocks | Aggregate node count | Aggregate loops | WindowAgg node count | Window loops | Nested Loop count/loops | assessment_result scan loops | assessment scan loops | engagement scan loops | Output rows | Index names used |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${makeComparisonRows(results, baseline, allSuspect)}

## Best Candidates

${bestCandidates.text}

## Hot Plan Nodes

${makeHotNodeSections(results)}

## Minimal Safe Set Analysis

${chosen
  ? `The minimal safe set by the configured rules is **${chosen.materializedCtes.join(", ")}**. It uses ${chosen.cteCount} CTEs, reduces execution by ${(chosen.execReduction * 100).toFixed(1)}%, is ${chosen.allRatio.toFixed(2)}x all_suspect execution time, reduces aggregate loops by ${(chosen.aggregateReduction * 100).toFixed(1)}%, and keeps hit blocks at ${chosen.hitRatio.toFixed(2)}x all_suspect.`
  : "No tested combination satisfied all candidate rules: >=95% execution reduction, <=3x all_suspect execution, strong aggregate loop reduction, low hit blocks, and valid output rows."}

Required-looking CTEs from this run:

${requiredCtes.length ? requiredCtes.map((cte) => `- \`${cte}\``).join("\n") : "- none"}

CTEs not required by the selected minimal set:

${unnecessaryCtes.length ? unnecessaryCtes.map((cte) => `- \`${cte}\``).join("\n") : "- none"}

## Root Cause Conclusion

1. Combination nhanh nhất: **${fastest ? fastest.label : "n/a"}**.
2. Minimal safe set tốt nhất: **${chosen ? chosen.label : "none"}**.
3. Có cần materialize toàn bộ 7 CTE không? **${chosen ? "No, tested minimal set is smaller than all_suspect." : "Not proven; all_suspect may still be the only safe fast option among tested variants."}**
4. CTE có vẻ bắt buộc: **${requiredCtes.length ? requiredCtes.join(", ") : "not proven"}**.
5. CTE có vẻ không cần materialized: **${unnecessaryCtes.length ? unnecessaryCtes.join(", ") : "not proven"}**.
6. Repeated execution baseline: **${baseline ? `aggregate loops ${baseline.aggregateLoops.toLocaleString("en-US")}, nested loop loops ${baseline.nestedLoopLoops.toLocaleString("en-US")}` : "n/a"}**.
7. Đủ bằng chứng đề xuất production fix? **${chosen ? "Yes, as candidate only." : "No."}**

## Recommended Production Fix Candidate

${chosen
  ? `Candidate for a future phase: materialize only **${chosen.materializedCtes.join(", ")}** for \`S-T04\`. Do not implement in this phase.`
  : "No production fix candidate selected. Status remains NEEDS MORE INVESTIGATION."}

## What Not To Fix Yet

- Không sửa \`S-T04\` trong \`taskRegistry.json\`.
- Không sửa bất kỳ production source file nào.
- Không sửa \`S-B02\`, \`A-G03\`, \`A-B04\`, \`S-B01\` hoặc task khác.
- Không thêm index.
- Không tạo migration.
- Không tăng timeout.
- Không generalize runtime rewrite.

## Next Step

Sau khi tạo report này, dừng lại. Nếu status là \`FIX CANDIDATE IDENTIFIED\`, cần prompt riêng để duyệt production fix tối thiểu.
`;
}

async function main() {
  await fs.mkdir(explainDir, { recursive: true });

  const task = taskRegistryService.getTaskById("S-T04");
  if (!task) throw new Error("Task S-T04 not found");

  const ctes = collectCteNames(task.sqlQuery ?? "");
  const context = await resolveContext();
  const params = {
    batch_id: context.batch_id,
    class_id: context.class_id,
    student_id: context.student_id,
    enrollment_id: context.enrollment_id,
    s1: context.s1,
    s2: context.s2,
  };

  const previousBaseline = await readPreviousPhase0Baseline();
  const dryRun = dryRunSqlTask({ task, params, options: { limitGuardrail: true } });
  const results = [];

  for (const variant of variants) {
    const sql = materializeCtes(dryRun.sql, variant.materializedCtes);
    const explainSql = `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${sql}`;
    const artifactPath = path.join(explainDir, variant.file);

    console.log(`[S-T04 Phase 0.5] Running ${variant.label}...`);
    try {
      const startedAt = Date.now();
      const rows = await prisma.$queryRawUnsafe(explainSql, ...dryRun.values);
      const wallTimeMs = Date.now() - startedAt;
      const plan = rows[0]["QUERY PLAN"][0];
      const summary = summarizePlan(plan);
      const artifact = {
        variant: variant.id,
        label: variant.label,
        materializedCtes: variant.materializedCtes,
        context,
        wallTimeMs,
        summary,
        plan,
      };
      await fs.writeFile(artifactPath, JSON.stringify(artifact, null, 2), "utf8");
      results.push({ ...variant, ok: true, wallTimeMs, summary });
      console.log(
        `[S-T04 Phase 0.5] ${variant.label}: execution=${summary.executionTimeMs.toFixed(2)}ms, aggregateLoops=${summary.aggregateLoops}, hitBlocks=${summary.sharedHitBlocks}`
      );
    } catch (error) {
      const artifact = {
        variant: variant.id,
        label: variant.label,
        materializedCtes: variant.materializedCtes,
        context,
        error: error?.message ?? String(error),
      };
      await fs.writeFile(artifactPath, JSON.stringify(artifact, null, 2), "utf8");
      results.push({ ...variant, ok: false, error: artifact.error });
      console.error(`[S-T04 Phase 0.5] ${variant.label} failed: ${artifact.error}`);
    }
  }

  const report = makeReport({ context, ctes, results, previousBaseline });
  await fs.writeFile(reportPath, report, "utf8");

  await prisma.$disconnect();
  console.log(`[S-T04 Phase 0.5] Report written: ${reportPath}`);
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exitCode = 1;
});
