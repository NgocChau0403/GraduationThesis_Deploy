import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import prisma from "../Backend/src/lib/prisma.js";
import taskRegistryService from "../Backend/src/services/taskRegistry.service.js";
import { dryRunSqlTask } from "../Backend/src/services/sqlExecution.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const explainDir = path.join(__dirname, "explain");
const reportPath = path.join(__dirname, "a-g03-phase-0-5-combination-isolation-report.md");

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
    file: "a-g03-phase-0-5-baseline.json",
    materializedCtes: [],
  },
  {
    id: "all_suspect",
    label: "All suspect",
    file: "a-g03-phase-0-5-all-suspect.json",
    materializedCtes: ["score_context", "score_agg", "punctuality", "eng_agg", "class_max", "eng_score", "risk_flags"],
  },
  {
    id: "combo_01",
    label: "combo_01 score_context + eng_score",
    file: "a-g03-phase-0-5-combo-01-score-context-eng-score.json",
    materializedCtes: ["score_context", "eng_score"],
  },
  {
    id: "combo_02",
    label: "combo_02 score_context + class_max",
    file: "a-g03-phase-0-5-combo-02-score-context-class-max.json",
    materializedCtes: ["score_context", "class_max"],
  },
  {
    id: "combo_03",
    label: "combo_03 score_context + eng_agg",
    file: "a-g03-phase-0-5-combo-03-score-context-eng-agg.json",
    materializedCtes: ["score_context", "eng_agg"],
  },
  {
    id: "combo_04",
    label: "combo_04 score_context + risk_flags",
    file: "a-g03-phase-0-5-combo-04-score-context-risk-flags.json",
    materializedCtes: ["score_context", "risk_flags"],
  },
  {
    id: "combo_05",
    label: "combo_05 score_context + class_max + eng_score",
    file: "a-g03-phase-0-5-combo-05-score-context-class-max-eng-score.json",
    materializedCtes: ["score_context", "class_max", "eng_score"],
  },
  {
    id: "combo_06",
    label: "combo_06 score_context + eng_agg + class_max + eng_score",
    file: "a-g03-phase-0-5-combo-06-score-context-eng-agg-class-max-eng-score.json",
    materializedCtes: ["score_context", "eng_agg", "class_max", "eng_score"],
  },
  {
    id: "combo_07",
    label: "combo_07 score_context + eng_agg + eng_score",
    file: "a-g03-phase-0-5-combo-07-score-context-eng-agg-eng-score.json",
    materializedCtes: ["score_context", "eng_agg", "eng_score"],
  },
  {
    id: "combo_08",
    label: "combo_08 score_context + eng_agg + class_max",
    file: "a-g03-phase-0-5-combo-08-score-context-eng-agg-class-max.json",
    materializedCtes: ["score_context", "eng_agg", "class_max"],
  },
  {
    id: "combo_09",
    label: "combo_09 score_context + eng_score + risk_flags",
    file: "a-g03-phase-0-5-combo-09-score-context-eng-score-risk-flags.json",
    materializedCtes: ["score_context", "eng_score", "risk_flags"],
  },
  {
    id: "combo_10",
    label: "combo_10 score_context + class_max + eng_score + risk_flags",
    file: "a-g03-phase-0-5-combo-10-score-context-class-max-eng-score-risk-flags.json",
    materializedCtes: ["score_context", "class_max", "eng_score", "risk_flags"],
  },
  {
    id: "combo_11",
    label: "combo_11 score_context + eng_agg + class_max + eng_score + risk_flags",
    file: "a-g03-phase-0-5-combo-11-score-context-eng-agg-class-max-eng-score-risk-flags.json",
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
    throw new Error("No valid context with assessment results found");
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

async function readPreviousBaseline() {
  try {
    const raw = await fs.readFile(path.join(explainDir, "a-g03-baseline.json"), "utf8");
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

function scoreCandidates(results) {
  const baselineResult = results.find((r) => r.id === "baseline" && r.ok);
  const allSuspectResult = results.find((r) => r.id === "all_suspect" && r.ok);
  if (!baselineResult || !allSuspectResult) {
    return { baseline: null, allSuspect: null, scored: [], candidates: [], chosen: null };
  }

  const baseline = baselineResult.summary;
  const allSuspect = allSuspectResult.summary;
  const scored = results
    .filter((r) => r.ok && !["baseline", "all_suspect"].includes(r.id))
    .map((result) => {
      const s = result.summary;
      const execReduction = baseline.executionTimeMs
        ? (baseline.executionTimeMs - s.executionTimeMs) / baseline.executionTimeMs
        : 0;
      const allRatio = allSuspect.executionTimeMs ? s.executionTimeMs / allSuspect.executionTimeMs : Infinity;
      const aggregateReduction = baseline.aggregateLoops
        ? (baseline.aggregateLoops - s.aggregateLoops) / baseline.aggregateLoops
        : 0;
      const hitRatio = allSuspect.sharedHitBlocks ? s.sharedHitBlocks / allSuspect.sharedHitBlocks : Infinity;
      const isCandidate =
        execReduction >= 0.95 &&
        allRatio <= 3 &&
        aggregateReduction >= 0.95 &&
        hitRatio <= 3 &&
        s.outputRows >= 0 &&
        result.materializedCtes.length < 7;
      return {
        ...result,
        execReduction,
        allRatio,
        aggregateReduction,
        hitRatio,
        isCandidate,
        cteCount: result.materializedCtes.length,
      };
    });
  const candidates = scored.filter((r) => r.isCandidate);
  const chosen = candidates
    .slice()
    .sort((a, b) => a.cteCount - b.cteCount || a.summary.executionTimeMs - b.summary.executionTimeMs)[0] ?? null;
  return { baseline, allSuspect, scored, candidates, chosen };
}

function makeBestCandidateSection(results) {
  const { scored, candidates, chosen } = scoreCandidates(results);
  const rows = scored
    .map((r) =>
      [
        `| ${r.label}`,
        r.materializedCtes.map((c) => `\`${c}\``).join(", "),
        r.cteCount,
        fmt(r.summary.executionTimeMs),
        `${(r.execReduction * 100).toFixed(1)}%`,
        `${r.allRatio.toFixed(2)}x`,
        `${(r.aggregateReduction * 100).toFixed(1)}%`,
        `${r.hitRatio.toFixed(2)}x`,
        `${r.isCandidate ? "YES" : "NO"} |`,
      ].join(" | ")
    )
    .join("\n");

  return {
    candidates,
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
    .filter((r) => r.ok)
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

function makeReport({ context, results, previousBaseline }) {
  const baseline = results.find((r) => r.id === "baseline" && r.ok)?.summary ?? null;
  const allSuspect = results.find((r) => r.id === "all_suspect" && r.ok)?.summary ?? null;
  const fastest = results.filter((r) => r.ok).slice().sort((a, b) => a.summary.executionTimeMs - b.summary.executionTimeMs)[0] ?? null;
  const best = makeBestCandidateSection(results);
  const chosen = best.chosen;
  const status = chosen ? "Status: FIX CANDIDATE IDENTIFIED" : "Status: NEEDS MORE INVESTIGATION";
  const allCtes = ["score_context", "score_agg", "punctuality", "eng_agg", "class_max", "eng_score", "risk_flags"];
  const required = chosen?.materializedCtes ?? [];
  const unnecessary = chosen ? allCtes.filter((cte) => !required.includes(cte)) : [];

  const variantRows = variants
    .map((v) => `| ${v.id} | ${v.label} | ${v.materializedCtes.length ? v.materializedCtes.map((c) => `\`${c}\``).join(", ") : "none"} | \`Debugs/explain/${v.file}\` |`)
    .join("\n");

  return `# A-G03 Phase 0.5 Combination Isolation Report

## Summary

Investigation-only. Không implement production fix.

${status}

- Fastest combination: **${fastest ? fastest.label : "n/a"}** (${fastest ? fmt(fastest.summary.executionTimeMs) : "n/a"}ms).
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
  ? `Previous Phase 0 baseline found: execution=${fmt(previousBaseline.executionTimeMs)}ms, aggregate loops=${previousBaseline.aggregateLoops.toLocaleString("en-US")}, hit blocks=${previousBaseline.sharedHitBlocks.toLocaleString("en-US")}.`
  : "Previous Phase 0 baseline artifact not found; this run includes fresh baseline."}

Fresh Phase 0.5 baseline: ${baseline ? `execution=${fmt(baseline.executionTimeMs)}ms, aggregate loops=${baseline.aggregateLoops.toLocaleString("en-US")}, hit blocks=${baseline.sharedHitBlocks.toLocaleString("en-US")}.` : "not available"}.

## Variant Definitions

| Variant ID | Label | Materialized CTEs | Artifact |
| --- | --- | --- | --- |
${variantRows}

## Comparison Table

| Variant | Planning ms | Execution ms | Execution reduction vs baseline | Execution vs all_suspect | Shared hit blocks | Shared read blocks | Aggregate node count | Aggregate loops | WindowAgg node count | Window loops | Nested Loop count/loops | assessment_result scan loops | assessment scan loops | engagement scan loops | Output rows | Index names used |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${makeComparisonRows(results, baseline, allSuspect)}

## Best Candidates

${best.text}

## Hot Plan Nodes

${makeHotNodeSections(results)}

## Minimal Safe Set Analysis

${chosen
  ? `The minimal safe set by configured rules is **${chosen.materializedCtes.join(", ")}**. It uses ${chosen.cteCount} CTEs, reduces execution by ${(chosen.execReduction * 100).toFixed(1)}%, is ${chosen.allRatio.toFixed(2)}x all_suspect execution time, reduces aggregate loops by ${(chosen.aggregateReduction * 100).toFixed(1)}%, and keeps hit blocks at ${chosen.hitRatio.toFixed(2)}x all_suspect.`
  : "No tested combination satisfied all candidate rules."}

Required-looking CTEs:

${required.length ? required.map((cte) => `- \`${cte}\``).join("\n") : "- none"}

CTEs not required by selected minimal set:

${unnecessary.length ? unnecessary.map((cte) => `- \`${cte}\``).join("\n") : "- not proven"}

## Root Cause Conclusion

1. Fastest combination: **${fastest ? fastest.label : "n/a"}**.
2. Best minimal safe set: **${chosen ? chosen.label : "none"}**.
3. Need all 7 CTEs? **${chosen ? "No, selected set is smaller than all_suspect." : "Not proven."}**
4. Required CTEs: **${required.length ? required.join(", ") : "not proven"}**.
5. Unnecessary CTEs: **${unnecessary.length ? unnecessary.join(", ") : "not proven"}**.
6. Repeated execution remains in baseline: **${baseline && baseline.aggregateLoops > 1000 ? "YES" : "NO"}**.
7. Enough evidence for production fix candidate: **${chosen ? "YES, candidate only." : "NO"}**.

## Recommended Production Fix Candidate

${chosen
  ? `Candidate for a future phase: materialize only **${chosen.materializedCtes.join(", ")}** for \`A-G03\`. Do not implement in this phase.`
  : "No production fix candidate selected. Status remains NEEDS MORE INVESTIGATION."}

## What Not To Fix Yet

- Không sửa \`A-G03\` trong \`taskRegistry.json\`.
- Không sửa bất kỳ production source file nào.
- Không sửa \`S-B01\`, \`S-T04\`, \`S-B02\`, \`A-B04\` hoặc task khác.
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

  const task = taskRegistryService.getTaskById("A-G03");
  if (!task) throw new Error("Task A-G03 not found");

  const context = await resolveContext();
  const params = {
    batch_id: context.batch_id,
    class_id: context.class_id,
    student_id: context.student_id,
    enrollment_id: context.enrollment_id,
    s1: context.s1,
    s2: context.s2,
  };
  const previousBaseline = await readPreviousBaseline();
  const dryRun = dryRunSqlTask({ task, params, options: { limitGuardrail: true } });
  const results = [];

  for (const variant of variants) {
    const sql = materializeCtes(dryRun.sql, variant.materializedCtes);
    const explainSql = `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${sql}`;
    const artifactPath = path.join(explainDir, variant.file);
    console.log(`[A-G03 Phase 0.5] Running ${variant.label}...`);
    try {
      const startedAt = Date.now();
      const rows = await prisma.$queryRawUnsafe(explainSql, ...dryRun.values);
      const wallTimeMs = Date.now() - startedAt;
      const plan = rows[0]["QUERY PLAN"][0];
      const summary = summarizePlan(plan);
      await fs.writeFile(
        artifactPath,
        JSON.stringify({ variant: variant.id, label: variant.label, materializedCtes: variant.materializedCtes, context, wallTimeMs, summary, plan }, null, 2),
        "utf8"
      );
      results.push({ ...variant, ok: true, wallTimeMs, summary });
      console.log(`[A-G03 Phase 0.5] ${variant.label}: execution=${summary.executionTimeMs.toFixed(2)}ms, aggregateLoops=${summary.aggregateLoops}, hitBlocks=${summary.sharedHitBlocks}`);
    } catch (error) {
      const message = error?.message ?? String(error);
      await fs.writeFile(
        artifactPath,
        JSON.stringify({ variant: variant.id, label: variant.label, materializedCtes: variant.materializedCtes, context, error: message }, null, 2),
        "utf8"
      );
      results.push({ ...variant, ok: false, error: message });
      console.error(`[A-G03 Phase 0.5] ${variant.label} failed: ${message}`);
    }
  }

  const report = makeReport({ context, results, previousBaseline });
  await fs.writeFile(reportPath, report, "utf8");

  await prisma.$disconnect();
  console.log(`[A-G03 Phase 0.5] Report written: ${reportPath}`);
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exitCode = 1;
});
