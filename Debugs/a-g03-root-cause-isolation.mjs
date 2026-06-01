import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import prisma from "../Backend/src/lib/prisma.js";
import taskRegistryService from "../Backend/src/services/taskRegistry.service.js";
import { dryRunSqlTask } from "../Backend/src/services/sqlExecution.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const explainDir = path.join(__dirname, "explain");
const reportPath = path.join(__dirname, "a-g03-root-cause-isolation-report.md");

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
    file: "a-g03-baseline.json",
    materializedCtes: [],
    reason: "SQL hiện tại.",
  },
  {
    id: "variant_a",
    label: "Variant A - score_context MATERIALIZED",
    file: "a-g03-variant-a.json",
    materializedCtes: ["score_context"],
    reason: "Context/threshold stage có nguy cơ planner inline.",
  },
  {
    id: "variant_b",
    label: "Variant B - score_agg MATERIALIZED",
    file: "a-g03-variant-b.json",
    materializedCtes: ["score_agg"],
    reason: "Aggregate stage chính trên assessment_result.",
  },
  {
    id: "variant_c",
    label: "Variant C - risk_flags MATERIALIZED",
    file: "a-g03-variant-c.json",
    materializedCtes: ["risk_flags"],
    reason: "Final risk/output stage dùng cho filter/order/limit.",
  },
  {
    id: "variant_d",
    label: "Variant D - all suspect CTEs MATERIALIZED",
    file: "a-g03-variant-d.json",
    materializedCtes: ["score_context", "score_agg", "punctuality", "eng_agg", "class_max", "eng_score", "risk_flags"],
    reason: "Upper-bound performance cho toàn bộ CTE nghi ngờ.",
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

function collectSqlInventory(sql) {
  const ctes = [...sql.matchAll(/(?:WITH|,)\s*([a-zA-Z_][\w]*)\s+AS\s*(?:MATERIALIZED\s*)?\(/gi)].map((m) => m[1]);
  const joins = [...sql.matchAll(/\b(?:LEFT\s+JOIN|RIGHT\s+JOIN|FULL\s+JOIN|INNER\s+JOIN|JOIN|CROSS\s+JOIN)\s+[a-zA-Z_][\w]*(?:\s+[a-zA-Z_][\w]*)?/gi)].map((m) => m[0]);
  const aggregates = [...sql.matchAll(/\b(AVG|SUM|COUNT|MAX|MIN|REGR_[A-Z_]+|CORR|PERCENTILE_CONT|NTILE|RANK|DENSE_RANK|PERCENT_RANK)\b/gi)].map((m) => m[1].toUpperCase());
  const windows = [...sql.matchAll(/\bOVER\s*\(/gi)].map((m) => m[0]);
  const sorts = [...sql.matchAll(/\bORDER\s+BY\b/gi)].map((m) => m[0]);
  return {
    ctes,
    joins,
    aggregates,
    aggregateCounts: aggregates.reduce((acc, name) => {
      acc[name] = (acc[name] ?? 0) + 1;
      return acc;
    }, {}),
    windowCount: windows.length,
    sortCount: sorts.length,
  };
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

function makeComparisonRows(results) {
  const baseline = results.find((r) => r.id === "baseline" && r.ok)?.summary;
  return results
    .map((result) => {
      if (!result.ok) {
        return `| ${result.label} | ERROR | ${result.error} | - | - | - | - | - | - | - | - | - | - | - |`;
      }
      const s = result.summary;
      return [
        `| ${result.label}`,
        fmt(s.planningTimeMs),
        fmt(s.executionTimeMs),
        baseline ? pctReduction(baseline.executionTimeMs, s.executionTimeMs) : "n/a",
        s.sharedHitBlocks.toLocaleString("en-US"),
        s.sharedReadBlocks.toLocaleString("en-US"),
        s.outputRows.toLocaleString("en-US"),
        `${s.aggregateNodeCount}/${s.aggregateLoops.toLocaleString("en-US")}`,
        `${s.windowAggNodeCount}/${s.windowAggLoops.toLocaleString("en-US")}`,
        `${s.nestedLoopNodeCount}/${s.nestedLoopLoops.toLocaleString("en-US")}`,
        s.assessmentResultScanLoops.toLocaleString("en-US"),
        s.assessmentScanLoops.toLocaleString("en-US"),
        s.enrollmentScanLoops.toLocaleString("en-US"),
        s.engagementScanLoops.toLocaleString("en-US"),
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

function analyzeResults(results) {
  const ok = results.filter((r) => r.ok);
  const baseline = ok.find((r) => r.id === "baseline");
  if (!baseline) {
    return {
      status: "Status: NEEDS MORE INVESTIGATION",
      text: "Baseline không chạy thành công nên chưa thể phân tích root cause.",
      fastest: null,
      loopReducer: null,
      hitReducer: null,
    };
  }

  const fastest = ok.slice().sort((a, b) => a.summary.executionTimeMs - b.summary.executionTimeMs)[0];
  const loopReducer = ok
    .filter((r) => r.id !== "baseline")
    .slice()
    .sort((a, b) => a.summary.aggregateLoops - b.summary.aggregateLoops)[0] ?? null;
  const hitReducer = ok
    .filter((r) => r.id !== "baseline")
    .slice()
    .sort((a, b) => a.summary.sharedHitBlocks - b.summary.sharedHitBlocks)[0] ?? null;

  const singles = ok.filter((r) => ["variant_a", "variant_b", "variant_c"].includes(r.id));
  const strongSingle = singles.find((r) => {
    const execReduction = (baseline.summary.executionTimeMs - r.summary.executionTimeMs) / baseline.summary.executionTimeMs;
    const hitReduction = baseline.summary.sharedHitBlocks
      ? (baseline.summary.sharedHitBlocks - r.summary.sharedHitBlocks) / baseline.summary.sharedHitBlocks
      : 0;
    const loopReduction = baseline.summary.aggregateLoops
      ? (baseline.summary.aggregateLoops - r.summary.aggregateLoops) / baseline.summary.aggregateLoops
      : 0;
    return execReduction >= 0.9 && hitReduction >= 0.9 && loopReduction >= 0.9 && r.summary.outputRows >= 0;
  });

  const d = ok.find((r) => r.id === "variant_d");
  const dFastOnly = d && fastest?.id === "variant_d" && !strongSingle;
  const status = dFastOnly || !strongSingle ? "Status: NEEDS MORE INVESTIGATION" : "Status: ROOT CAUSE IDENTIFIED";

  const repeated =
    baseline.summary.aggregateLoops > 1000 ||
    baseline.summary.nestedLoopLoops > 1000 ||
    baseline.summary.assessmentResultScanLoops > 1000 ||
    baseline.summary.engagementScanLoops > 1000;

  const text = [
    `Variant nhanh nhất: **${fastest.label}** (${fmt(fastest.summary.executionTimeMs)}ms).`,
    `Variant giảm aggregate loops mạnh nhất: **${loopReducer?.label ?? "n/a"}**.`,
    `Variant giảm buffer hits mạnh nhất: **${hitReducer?.label ?? "n/a"}**.`,
    `Repeated execution: **${repeated ? "YES" : "NO"}**.`,
    `Planner inline/materialized evidence: **${ok.some((r) => r.id !== "baseline" && r.summary.executionTimeMs < baseline.summary.executionTimeMs) ? "YES" : "NO"}**.`,
    `Index issue evidence: **NO direct evidence**; report dựa vào repeated loops/buffer hits, không thêm index.`,
    `Join explosion evidence: **${baseline.summary.nestedLoopLoops > 1000 ? "YES" : "NO"}**.`,
    dFastOnly
      ? "Variant D nhanh nhất nhưng A/B/C đơn lẻ không đủ mạnh; không được đề xuất production fix chỉ dựa trên Variant D."
      : strongSingle
        ? `Root cause candidate từ variant đơn lẻ: **${strongSingle.label}**.`
        : "Chưa có variant đơn lẻ đủ mạnh để xác định root cause tối thiểu.",
    `Confidence: **${status.includes("ROOT") ? "medium/high" : "medium"}**.`,
  ].join("\n\n");

  return { status, text, fastest, loopReducer, hitReducer, strongSingle, dFastOnly };
}

function makeReport({ context, inventory, results }) {
  const analysis = analyzeResults(results);
  const variantRows = variants
    .map((v) => `| ${v.label} | ${v.materializedCtes.length ? v.materializedCtes.map((c) => `\`${c}\``).join(", ") : "none"} | ${v.reason} | \`Debugs/explain/${v.file}\` |`)
    .join("\n");

  const nextStep = analysis.dFastOnly
    ? "Phase 0.5 Combination Isolation cho A-G03."
    : analysis.status.includes("ROOT")
      ? "Review report và tạo prompt riêng nếu muốn production fix. Không implement trong phase này."
      : "Tiếp tục investigation trước khi sửa production.";

  return `# A-G03 Root Cause Isolation Report

## Summary

Investigation-only cho \`A-G03\`. Không sửa production logic.

${analysis.status}

## Context Used

| Param | Value |
| --- | --- |
| context_source | \`${context.contextSource}\` |
| batch_id | \`${context.batch_id}\` |
| class_id | \`${context.class_id}\` |
| student_id | \`${context.student_id}\` |
| enrollment_id | \`${context.enrollment_id}\` |

## SQL Inventory

| Inventory | Value |
| --- | --- |
| SQL length | ${inventory.sqlLength} |
| Join count | ${inventory.joins.length} |
| Aggregate calls | ${inventory.aggregates.length} |
| Window OVER count | ${inventory.windowCount} |
| ORDER BY count | ${inventory.sortCount} |

Aggregates:

${Object.entries(inventory.aggregateCounts).map(([name, count]) => `- \`${name}\`: ${count}`).join("\n") || "- none"}

Joins:

${inventory.joins.map((join) => `- \`${join}\``).join("\n") || "- none"}

## CTE Inventory

${inventory.ctes.map((cte) => `- \`${cte}\``).join("\n") || "- none"}

CTE roles:

- Aggregate/context stage: \`score_context\`, \`score_agg\`, \`punctuality\`, \`eng_agg\`, \`class_max\`, \`eng_score\`
- Final output/risk stage: \`risk_flags\`
- Ranking/window stage: no explicit WindowAgg CTE detected in SQL inventory

## Variant Definitions

| Variant | Materialized CTEs | Reason | Artifact |
| --- | --- | --- | --- |
${variantRows}

## Comparison Table

| Variant | Planning ms | Execution ms | Reduction vs baseline | Shared hit blocks | Shared read blocks | Output rows | Aggregate nodes/loops | Window nodes/loops | Nested Loop count/loops | assessment_result scan loops | assessment scan loops | enrollment scan loops | engagement scan loops | Indexes used |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${makeComparisonRows(results)}

## Hot Plan Nodes

${makeHotNodeSections(results)}

## Root Cause Analysis

${analysis.text}

## Recommended Investigation Next Step

${nextStep}

## What Not To Fix Yet

- Không sửa \`A-G03\` trong \`taskRegistry.json\`.
- Không sửa \`sqlExecution.service.js\`.
- Không thêm index.
- Không tạo migration.
- Không tăng timeout.
- Không generalize runtime rewrite.
- Không sửa task khác.
- Không implement production fix dù status là \`ROOT CAUSE IDENTIFIED\`.

## Conclusion

Deliverable phase này chỉ là script, report và EXPLAIN artifacts. Dừng lại tại đây.
`;
}

async function main() {
  await fs.mkdir(explainDir, { recursive: true });

  const task = taskRegistryService.getTaskById("A-G03");
  if (!task) throw new Error("Task A-G03 not found");

  const inventory = collectSqlInventory(task.sqlQuery ?? "");
  inventory.sqlLength = (task.sqlQuery ?? "").length;
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
    const artifactPath = path.join(explainDir, variant.file);
    const explainSql = `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${sql}`;

    console.log(`[A-G03 Phase 0] Running ${variant.label}...`);
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
        reason: variant.reason,
        context,
        wallTimeMs,
        summary,
        plan,
      };
      await fs.writeFile(artifactPath, JSON.stringify(artifact, null, 2), "utf8");
      results.push({ ...variant, ok: true, wallTimeMs, summary });
      console.log(
        `[A-G03 Phase 0] ${variant.label}: execution=${summary.executionTimeMs.toFixed(2)}ms, aggregateLoops=${summary.aggregateLoops}, hitBlocks=${summary.sharedHitBlocks}`
      );
    } catch (error) {
      const artifact = {
        variant: variant.id,
        label: variant.label,
        materializedCtes: variant.materializedCtes,
        reason: variant.reason,
        context,
        error: error?.message ?? String(error),
      };
      await fs.writeFile(artifactPath, JSON.stringify(artifact, null, 2), "utf8");
      results.push({ ...variant, ok: false, error: artifact.error });
      console.error(`[A-G03 Phase 0] ${variant.label} failed: ${artifact.error}`);
    }
  }

  const report = makeReport({ context, inventory, results });
  await fs.writeFile(reportPath, report, "utf8");

  await prisma.$disconnect();
  console.log(`[A-G03 Phase 0] Report written: ${reportPath}`);
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exitCode = 1;
});
