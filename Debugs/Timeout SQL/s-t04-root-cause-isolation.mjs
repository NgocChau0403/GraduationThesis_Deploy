import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import prisma from "../Backend/src/lib/prisma.js";
import taskRegistryService from "../Backend/src/services/taskRegistry.service.js";
import { dryRunSqlTask } from "../Backend/src/services/sqlExecution.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const explainDir = path.join(__dirname, "explain");
const reportPath = path.join(__dirname, "s-t04-root-cause-isolation-report.md");

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
    file: "s-t04-baseline.json",
    materializedCtes: [],
  },
  {
    id: "score_context_materialized",
    label: "score_context MATERIALIZED",
    file: "s-t04-score-context-materialized.json",
    materializedCtes: ["score_context"],
  },
  {
    id: "score_agg_materialized",
    label: "score_agg MATERIALIZED",
    file: "s-t04-score-agg-materialized.json",
    materializedCtes: ["score_agg"],
  },
  {
    id: "risk_flags_materialized",
    label: "risk_flags MATERIALIZED",
    file: "s-t04-ranked-or-risk-materialized.json",
    materializedCtes: ["risk_flags"],
  },
  {
    id: "all_suspect_materialized",
    label: "All suspect CTEs MATERIALIZED",
    file: "s-t04-all-suspect-materialized.json",
    materializedCtes: [
      "score_context",
      "score_agg",
      "punctuality",
      "eng_agg",
      "class_max",
      "eng_score",
      "risk_flags",
    ],
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

  const indexNames = [...new Set(nodes.map((node) => node["Index Name"]).filter(Boolean))].sort();

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
    indexNames,
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

function makeComparisonRows(results) {
  const baseline = results.find((result) => result.id === "baseline" && result.ok);
  return results
    .map((result) => {
      if (!result.ok) {
        return `| ${result.label} | ERROR | ${result.error} | - | - | - | - | - | - | - | - | - | - | - | - |`;
      }
      const s = result.summary;
      return [
        `| ${result.label}`,
        fmt(s.planningTimeMs),
        fmt(s.executionTimeMs),
        baseline ? pctReduction(baseline.summary.executionTimeMs, s.executionTimeMs) : "n/a",
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

function makeConclusion(results) {
  const okResults = results.filter((result) => result.ok);
  const baseline = okResults.find((result) => result.id === "baseline");
  if (!baseline) {
    return {
      status: "Status: NEEDS MORE INVESTIGATION",
      text: "Baseline không chạy thành công nên chưa thể kết luận root cause.",
    };
  }

  const candidates = okResults.filter((result) => result.id !== "baseline");
  const best = okResults.slice().sort((a, b) => a.summary.executionTimeMs - b.summary.executionTimeMs)[0];
  const bestSingle = candidates
    .filter((result) => result.id !== "all_suspect_materialized")
    .slice()
    .sort((a, b) => a.summary.executionTimeMs - b.summary.executionTimeMs)[0];

  const strong = (result) => {
    const b = baseline.summary;
    const s = result.summary;
    return (
      b.executionTimeMs > 0 &&
      ((b.executionTimeMs - s.executionTimeMs) / b.executionTimeMs) >= 0.5 &&
      b.sharedHitBlocks > 0 &&
      ((b.sharedHitBlocks - s.sharedHitBlocks) / b.sharedHitBlocks) >= 0.5 &&
      b.aggregateLoops >= s.aggregateLoops &&
      s.outputRows >= 0
    );
  };

  const recommended = bestSingle && strong(bestSingle) ? bestSingle : null;
  const status = recommended ? "Status: FIX CANDIDATE IDENTIFIED" : "Status: NEEDS MORE INVESTIGATION";

  const text = [
    `Variant nhanh nhất: **${best.label}** (${fmt(best.summary.executionTimeMs)}ms).`,
    bestSingle
      ? `Variant đơn lẻ tốt nhất: **${bestSingle.label}** (${fmt(bestSingle.summary.executionTimeMs)}ms).`
      : "Không có variant đơn lẻ chạy thành công.",
    `Repeated execution baseline: Aggregate loops=${baseline.summary.aggregateLoops.toLocaleString("en-US")}, Nested Loop loops=${baseline.summary.nestedLoopLoops.toLocaleString("en-US")}, assessment_result loops=${baseline.summary.assessmentResultScanLoops.toLocaleString("en-US")}, engagement loops=${baseline.summary.engagementScanLoops.toLocaleString("en-US")}.`,
    recommended
      ? `Root cause có bằng chứng mạnh nhất trong lần đo này: CTE materialized bởi **${recommended.label}**. Có thể đề xuất production fix tối thiểu cho CTE này trong phase sau, nhưng không implement trong Phase 0.`
      : "Chưa đủ bằng chứng để đề xuất production fix tối thiểu. Cần điều tra thêm hoặc thử rewrite/query variants khác.",
  ].join("\n\n");

  return { status, text };
}

function makeReport({ context, ctes, results }) {
  const conclusion = makeConclusion(results);
  const variantRows = variants
    .map((variant) => `| ${variant.label} | ${variant.materializedCtes.length ? variant.materializedCtes.map((name) => `\`${name}\``).join(", ") : "None"} | \`Debugs/explain/${variant.file}\` |`)
    .join("\n");

  return `# S-T04 Root Cause Isolation Report

## Summary

Phase 0 only. Không implement production fix. Kết quả \`S-B01\` chỉ được dùng làm tham chiếu phương pháp, không dùng làm bằng chứng root cause cho \`S-T04\`.

${conclusion.status}

## Context Used

| Param | Value |
| --- | --- |
| context_source | \`${context.contextSource}\` |
| batch_id | \`${context.batch_id}\` |
| class_id | \`${context.class_id}\` |
| student_id | \`${context.student_id}\` |
| enrollment_id | \`${context.enrollment_id}\` |

## SQL CTE Inventory

Task \`S-T04\` CTEs detected from registry SQL:

${ctes.map((cte) => `- \`${cte}\``).join("\n")}

## Variant Definitions

| Variant | Materialized CTEs | Artifact |
| --- | --- | --- |
${variantRows}

## Comparison Table

| Variant | Planning ms | Execution ms | Execution reduction vs baseline | Shared hit blocks | Shared read blocks | Aggregate node count | Aggregate loops | WindowAgg node count | Window loops | Nested Loop count/loops | assessment_result scan loops | assessment scan loops | engagement scan loops | Output rows | Index names used |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${makeComparisonRows(results)}

## Hot Plan Nodes

${makeHotNodeSections(results)}

## Root Cause Conclusion

${conclusion.text}

## Recommended Production Fix

Không implement trong phase này.

${conclusion.status === "Status: FIX CANDIDATE IDENTIFIED"
  ? "Có thể đề xuất fix production trong phase sau dựa trên variant đơn lẻ tốt nhất, sau khi review report này."
  : "Chưa đề xuất fix production. Cần thêm investigation trước khi sửa task registry."}

## What Not To Fix Yet

- Không sửa \`S-T04\` trong \`taskRegistry.json\`.
- Không sửa \`S-B02\`, \`A-G03\`, \`A-B04\` hoặc task khác.
- Không thêm index.
- Không tạo migration.
- Không tăng timeout.
- Không generalize runtime rewrite.
- Không dùng kết luận của \`S-B01\` làm bằng chứng cho \`S-T04\`.

## Next Step

Review report và JSON artifacts. Nếu có fix candidate rõ ràng, tạo yêu cầu riêng cho production fix tối thiểu. Sau khi tạo report này, dừng lại.
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

  const dryRun = dryRunSqlTask({ task, params, options: { limitGuardrail: true } });
  const results = [];

  for (const variant of variants) {
    const sql = materializeCtes(dryRun.sql, variant.materializedCtes);
    const explainSql = `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${sql}`;
    const artifactPath = path.join(explainDir, variant.file);

    console.log(`[S-T04 Phase 0] Running ${variant.label}...`);
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
        `[S-T04 Phase 0] ${variant.label}: execution=${summary.executionTimeMs.toFixed(2)}ms, aggregateLoops=${summary.aggregateLoops}, hitBlocks=${summary.sharedHitBlocks}`
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
      console.error(`[S-T04 Phase 0] ${variant.label} failed: ${artifact.error}`);
    }
  }

  const report = makeReport({ context, ctes, results });
  await fs.writeFile(reportPath, report, "utf8");

  await prisma.$disconnect();
  console.log(`[S-T04 Phase 0] Report written: ${reportPath}`);
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exitCode = 1;
});
