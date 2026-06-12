import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import prisma from "../Backend/src/lib/prisma.js";
import taskRegistryService from "../Backend/src/services/taskRegistry.service.js";
import { dryRunSqlTask } from "../Backend/src/services/sqlExecution.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const explainDir = path.join(__dirname, "explain");
const reportPath = path.join(__dirname, "s-b01-root-cause-isolation-report.md");

const params = {
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
    file: "s-b01-baseline.json",
    transform: (sql) => sql,
  },
  {
    id: "score_context_materialized",
    label: "score_context MATERIALIZED",
    file: "s-b01-score-context-materialized.json",
    transform: (sql) =>
      sql.replace(/\bscore_context\s+AS\s*\(/i, "score_context AS MATERIALIZED ("),
  },
  {
    id: "score_agg_materialized",
    label: "score_agg MATERIALIZED",
    file: "s-b01-score-agg-materialized.json",
    transform: (sql) =>
      sql.replace(/\bscore_agg\s+AS\s*\(/i, "score_agg AS MATERIALIZED ("),
  },
  {
    id: "ranked_scores_materialized",
    label: "ranked_scores MATERIALIZED",
    file: "s-b01-ranked-scores-materialized.json",
    transform: (sql) =>
      sql.replace(/\branked_scores\s+AS\s*\(/i, "ranked_scores AS MATERIALIZED ("),
  },
  {
    id: "all_materialized",
    label: "All three MATERIALIZED",
    file: "s-b01-all-materialized.json",
    transform: (sql) =>
      sql
        .replace(/\bscore_context\s+AS\s*\(/i, "score_context AS MATERIALIZED (")
        .replace(/\bscore_agg\s+AS\s*\(/i, "score_agg AS MATERIALIZED (")
        .replace(/\branked_scores\s+AS\s*\(/i, "ranked_scores AS MATERIALIZED ("),
  },
];

function sum(nodes, key) {
  return nodes.reduce((total, node) => total + Number(node[key] ?? 0), 0);
}

function max(nodes, key) {
  return nodes.reduce((best, node) => Math.max(best, Number(node[key] ?? 0)), 0);
}

function collectPlanNodes(root) {
  const nodes = [];
  const walk = (node, depth = 0) => {
    nodes.push({ ...node, __depth: depth });
    for (const child of node.Plans ?? []) {
      walk(child, depth + 1);
    }
  };
  walk(root);
  return nodes;
}

function summarizePlan(planEnvelope) {
  const root = planEnvelope.Plan;
  const nodes = collectPlanNodes(root);
  const relationNodes = (relationName) =>
    nodes.filter((node) => String(node["Relation Name"] ?? "").toLowerCase() === relationName);
  const nodeType = (type) => nodes.filter((node) => node["Node Type"] === type);
  const indexNames = [
    ...new Set(nodes.map((node) => node["Index Name"]).filter(Boolean)),
  ].sort();

  return {
    planningTimeMs: Number(planEnvelope["Planning Time"] ?? 0),
    executionTimeMs: Number(planEnvelope["Execution Time"] ?? 0),
    outputRows: Number(root["Actual Rows"] ?? 0),
    sharedHitBlocks: Number(root["Shared Hit Blocks"] ?? sum(nodes, "Shared Hit Blocks")),
    sharedReadBlocks: Number(root["Shared Read Blocks"] ?? sum(nodes, "Shared Read Blocks")),
    aggregateNodeCount: nodeType("Aggregate").length,
    aggregateLoops: sum(nodeType("Aggregate"), "Actual Loops"),
    aggregateMaxTimeMs: max(nodeType("Aggregate"), "Actual Total Time"),
    windowAggNodeCount: nodeType("WindowAgg").length,
    windowAggLoops: sum(nodeType("WindowAgg"), "Actual Loops"),
    nestedLoopNodeCount: nodeType("Nested Loop").length,
    nestedLoopLoops: sum(nodeType("Nested Loop"), "Actual Loops"),
    assessmentResultScanLoops: sum(relationNodes("assessment_result"), "Actual Loops"),
    assessmentScanLoops: sum(relationNodes("assessment"), "Actual Loops"),
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

function pctChange(before, after) {
  if (!before) return "n/a";
  const pct = ((before - after) / before) * 100;
  return `${pct.toFixed(1)}%`;
}

function formatNumber(value, digits = 2) {
  if (!Number.isFinite(value)) return "n/a";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function makeReport({ context, results }) {
  const baseline = results.find((result) => result.id === "baseline");
  const best = results
    .filter((result) => result.ok)
    .slice()
    .sort((a, b) => a.summary.executionTimeMs - b.summary.executionTimeMs)[0];
  const bestSingle = results
    .filter((result) => result.ok && result.id !== "baseline" && result.id !== "all_materialized")
    .slice()
    .sort((a, b) => a.summary.executionTimeMs - b.summary.executionTimeMs)[0];

  const comparisonRows = results
    .map((result) => {
      if (!result.ok) {
        return `| ${result.label} | ERROR | ${result.error} | - | - | - | - | - | - | - | - | - |`;
      }

      const summary = result.summary;
      return [
        `| ${result.label}`,
        formatNumber(summary.planningTimeMs),
        formatNumber(summary.executionTimeMs),
        baseline?.ok ? pctChange(baseline.summary.executionTimeMs, summary.executionTimeMs) : "n/a",
        summary.sharedHitBlocks.toLocaleString("en-US"),
        summary.sharedReadBlocks.toLocaleString("en-US"),
        summary.aggregateLoops.toLocaleString("en-US"),
        summary.windowAggLoops.toLocaleString("en-US"),
        `${summary.nestedLoopNodeCount}/${summary.nestedLoopLoops.toLocaleString("en-US")}`,
        summary.assessmentResultScanLoops.toLocaleString("en-US"),
        summary.assessmentScanLoops.toLocaleString("en-US"),
        summary.outputRows.toLocaleString("en-US"),
        `${summary.indexNames.join(", ") || "-" } |`,
      ].join(" | ");
    })
    .join("\n");

  const hotNodeSections = results
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
            formatNumber(node.actualTotalTimeMs),
            node.sharedHitBlocks.toLocaleString("en-US"),
            node.sharedReadBlocks.toLocaleString("en-US"),
            `${node.indexCond || node.filter || node.joinFilter || "-"} |`,
          ].join(" | ")
        )
        .join("\n");

      return `### Hot nodes - ${result.label}

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
${rows || "| - | - | - | - | - | - | - | - | - | Không có node vượt ngưỡng |"}`;
    })
    .join("\n\n");

  let conclusion = "Không có variant nào chạy thành công, cần kiểm tra môi trường DB.";
  if (best?.ok && baseline?.ok) {
    const bestReduction = pctChange(baseline.summary.executionTimeMs, best.summary.executionTimeMs);
    conclusion = `Variant nhanh nhất là **${best.label}**, giảm execution time **${bestReduction}** so với baseline. `;
    if (best.id === "score_agg_materialized") {
      conclusion += "`score_agg` là nghi phạm chính mạnh nhất cho repeated execution trong lần đo này.";
    } else if (best.id === "score_context_materialized") {
      conclusion += "`score_context` có impact lớn nhất trong lần đo này, dù đây là CTE 1-row.";
    } else if (best.id === "ranked_scores_materialized") {
      conclusion += "`ranked_scores`/window stage có impact lớn nhất trong lần đo này.";
    } else if (best.id === "all_materialized") {
      conclusion += "Tổ hợp nhiều CTE materialized có impact lớn nhất; cần so sánh với từng variant đơn lẻ trước khi chọn fix tối thiểu.";
    } else {
      conclusion += "Baseline là nhanh nhất; không nên dùng MATERIALIZED cho `S-B01` nếu kết quả này ổn định.";
    }

    if (bestSingle?.ok) {
      const singleReduction = pctChange(
        baseline.summary.executionTimeMs,
        bestSingle.summary.executionTimeMs
      );
      conclusion += ` Variant đơn lẻ tốt nhất là **${bestSingle.label}**, giảm execution time **${singleReduction}**. Đây là ứng viên root-cause/fix tối thiểu cần ưu tiên hơn biến thể materialize toàn bộ.`;
    }
  }

  return `# S-B01 Root Cause Isolation Report

Ngày chạy: ${new Date().toISOString()}

## Phạm vi

Phase 0 chỉ điều tra root cause. Script sinh SQL variants trong memory và không sửa:

- \`Backend/src/config/taskRegistry.json\`
- \`Backend/src/services/sqlExecution.service.js\`
- Prisma schema/migration
- timeout config
- source logic

## Context

| Param | Value |
| --- | --- |
| batch_id | \`${context.batch_id}\` |
| class_id | \`${context.class_id}\` |
| student_id | \`${context.student_id}\` |
| enrollment_id | \`${context.enrollment_id}\` |

## Comparison

| Variant | Planning ms | Execution ms | Exec reduction vs baseline | Shared hit blocks | Shared read blocks | Aggregate loops | Window loops | Nested Loop count/loops | assessment_result scan loops | assessment scan loops | Output rows | Index names used |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${comparisonRows}

## Kết luận Phase 0

${conclusion}

Diễn giải an toàn:

- Nếu một variant đơn lẻ giảm mạnh execution time, loops và buffer hits, CTE đó là ứng viên fix nhỏ nhất cho phase sau.
- Nếu chỉ \`All three MATERIALIZED\` cải thiện rõ, cần cân nhắc materialize nhiều CTE hoặc rewrite query shape.
- Nếu không variant nào cải thiện, phase sau nên ưu tiên rewrite SQL shape thay vì thêm index.
- Đây chưa phải implementation fix; artifacts này chỉ dùng để ra quyết định.

## Artifacts

${results.map((result) => `- \`Debugs/explain/${result.file}\`${result.ok ? "" : ` - ERROR: ${result.error}`}`).join("\n")}

## Hot Plan Nodes

${hotNodeSections}
`;
}

async function main() {
  await fs.mkdir(explainDir, { recursive: true });

  const task = taskRegistryService.getTaskById("S-B01");
  if (!task) {
    throw new Error("Task S-B01 not found in task registry");
  }

  const dryRun = dryRunSqlTask({
    task,
    params,
    options: { limitGuardrail: true },
  });

  const results = [];

  for (const variant of variants) {
    const sql = variant.transform(dryRun.sql);
    const explainSql = `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${sql}`;
    const artifactPath = path.join(explainDir, variant.file);

    console.log(`[S-B01 Phase 0] Running ${variant.label}...`);
    try {
      const startedAt = Date.now();
      const rows = await prisma.$queryRawUnsafe(explainSql, ...dryRun.values);
      const wallTimeMs = Date.now() - startedAt;
      const planEnvelope = rows[0]["QUERY PLAN"][0];
      const summary = summarizePlan(planEnvelope);
      const artifact = {
        variant: variant.id,
        label: variant.label,
        context: params,
        wallTimeMs,
        summary,
        plan: planEnvelope,
      };
      await fs.writeFile(artifactPath, JSON.stringify(artifact, null, 2), "utf8");
      results.push({ ...variant, ok: true, wallTimeMs, summary });
      console.log(
        `[S-B01 Phase 0] ${variant.label}: execution=${summary.executionTimeMs.toFixed(2)}ms, aggregateLoops=${summary.aggregateLoops}`
      );
    } catch (error) {
      const artifact = {
        variant: variant.id,
        label: variant.label,
        context: params,
        error: error?.message ?? String(error),
      };
      await fs.writeFile(artifactPath, JSON.stringify(artifact, null, 2), "utf8");
      results.push({ ...variant, ok: false, error: artifact.error });
      console.error(`[S-B01 Phase 0] ${variant.label} failed: ${artifact.error}`);
    }
  }

  const report = makeReport({ context: params, results });
  await fs.writeFile(reportPath, report, "utf8");

  await prisma.$disconnect();

  console.log(`[S-B01 Phase 0] Report written: ${reportPath}`);
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exitCode = 1;
});
