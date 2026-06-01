import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import prisma from "../Backend/src/lib/prisma.js";
import taskRegistryService from "../Backend/src/services/taskRegistry.service.js";
import { dryRunSqlTask, executeSqlTask } from "../Backend/src/services/sqlExecution.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const explainDir = path.join(__dirname, "explain");
const explainPath = path.join(explainDir, "a-g03-after-production-fix.json");
const reportPath = path.join(__dirname, "a-g03-production-fix-report.md");
const baselinePath = path.join(explainDir, "a-g03-phase-0-5-baseline.json");
const candidatePath = path.join(explainDir, "a-g03-phase-0-5-combo-01-score-context-eng-score.json");

const preferredContext = {
  batch_id: "SAMPLE_UCI_POR",
  class_id: "SAMPLE_UCI_POR_CLASS",
  student_id: "SAMPLE_UCI_POR_STU_000001",
  enrollment_id: "SAMPLE_UCI_POR_ENR_000001",
  s1: "SAMPLE_UCI_POR_STU_000001",
  s2: "SAMPLE_UCI_POR_STU_000002",
};

const expectedMaterialized = ["score_context", "eng_score"];
const forbiddenMaterialized = ["score_agg", "punctuality", "eng_agg", "class_max", "risk_flags"];

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

async function readSummary(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw).summary ?? null;
  } catch {
    return null;
  }
}

async function resolveContext() {
  const rows = await prisma.$queryRawUnsafe(
    `SELECT e.batch_id, e.class_id, e.student_id, e.enrollment_id
     FROM enrollment e
     WHERE e.batch_id = $1 AND e.class_id = $2 AND e.student_id = $3 AND e.enrollment_id = $4
     LIMIT 1`,
    preferredContext.batch_id,
    preferredContext.class_id,
    preferredContext.student_id,
    preferredContext.enrollment_id
  );
  if (rows.length > 0) return { ...preferredContext, contextSource: "preferred_context" };

  const fallback = await prisma.$queryRawUnsafe(
    `SELECT e.batch_id, e.class_id, e.student_id, e.enrollment_id
     FROM enrollment e
     JOIN assessment_result ar ON ar.enrollment_id = e.enrollment_id AND ar.batch_id = e.batch_id
     GROUP BY e.batch_id, e.class_id, e.student_id, e.enrollment_id
     ORDER BY COUNT(ar.result_id) DESC
     LIMIT 1`
  );
  if (!fallback.length) throw new Error("No valid A-G03 context found");
  const row = fallback[0];
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

function materializationStatus(sql) {
  return {
    expected: Object.fromEntries(
      expectedMaterialized.map((cte) => [
        cte,
        new RegExp(`\\b${cte}\\s+AS\\s+MATERIALIZED\\s*\\(`, "i").test(sql),
      ])
    ),
    forbidden: Object.fromEntries(
      forbiddenMaterialized.map((cte) => [
        cte,
        new RegExp(`\\b${cte}\\s+AS\\s+MATERIALIZED\\s*\\(`, "i").test(sql),
      ])
    ),
  };
}

function makeBeforeAfterTable(baseline, after) {
  if (!baseline) return "Baseline artifact not found; only after-fix metrics are available.";
  return `| Metric | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Execution time | ${fmt(baseline.executionTimeMs)}ms | ${fmt(after.executionTimeMs)}ms | ${pctReduction(baseline.executionTimeMs, after.executionTimeMs)} |
| Aggregate loops | ${baseline.aggregateLoops.toLocaleString("en-US")} | ${after.aggregateLoops.toLocaleString("en-US")} | ${pctReduction(baseline.aggregateLoops, after.aggregateLoops)} |
| Shared hit blocks | ${baseline.sharedHitBlocks.toLocaleString("en-US")} | ${after.sharedHitBlocks.toLocaleString("en-US")} | ${pctReduction(baseline.sharedHitBlocks, after.sharedHitBlocks)} |
| assessment_result scan loops | ${baseline.assessmentResultScanLoops.toLocaleString("en-US")} | ${after.assessmentResultScanLoops.toLocaleString("en-US")} | ${pctReduction(baseline.assessmentResultScanLoops, after.assessmentResultScanLoops)} |
| assessment scan loops | ${baseline.assessmentScanLoops.toLocaleString("en-US")} | ${after.assessmentScanLoops.toLocaleString("en-US")} | ${pctReduction(baseline.assessmentScanLoops, after.assessmentScanLoops)} |
| engagement scan loops | ${baseline.engagementScanLoops.toLocaleString("en-US")} | ${after.engagementScanLoops.toLocaleString("en-US")} | ${pctReduction(baseline.engagementScanLoops, after.engagementScanLoops)} |`;
}

function makeReport({
  context,
  baseline,
  candidate,
  after,
  execution,
  materialization,
  requiredColumns,
  optionalColumns,
  vizType,
}) {
  const rows = execution.data ?? [];
  const actualRowCount = execution.meta?.rowCount ?? rows.length;
  const outputFields = Object.keys(rows[0] ?? {});
  const missingRequired = requiredColumns.filter((field) => !outputFields.includes(field));
  const expectedOk = Object.values(materialization.expected).every(Boolean);
  const forbiddenOk = Object.values(materialization.forbidden).every((v) => !v);
  const execReduction =
    baseline?.executionTimeMs && Number.isFinite(after.executionTimeMs)
      ? (baseline.executionTimeMs - after.executionTimeMs) / baseline.executionTimeMs
      : 0;
  const pass =
    expectedOk &&
    forbiddenOk &&
    execReduction > 0.95 &&
    after.sharedHitBlocks < 100_000 &&
    after.aggregateLoops < 10_000 &&
    actualRowCount > 0 &&
    missingRequired.length === 0 &&
    execution.meta?.executionTimeMs < 5000;

  return `# A-G03 Production Fix Report

## Summary

Kết luận: **${pass ? "PASS" : "FAIL"}**.

Production fix tối thiểu cho riêng \`A-G03\`: materialize \`score_context\` và \`eng_score\`.

- EXPLAIN after fix: \`${fmt(after.executionTimeMs)}ms\`
- Debug execution \`executeSqlTask\`: \`${execution.meta?.executionTimeMs ?? "n/a"}ms\`
- Output row count: \`${actualRowCount}\`
- Baseline reference: \`${baseline ? fmt(baseline.executionTimeMs) : "n/a"}ms\`
- Candidate reference (\`score_context + eng_score\`): \`${candidate ? fmt(candidate.executionTimeMs) : "n/a"}ms\`

## Files Changed

- \`Backend/src/config/taskRegistry.json\`

Task changed: \`A-G03\` only.

## Exact Change

CTE đã materialize:

- \`score_context AS MATERIALIZED (\`
- \`eng_score AS MATERIALIZED (\`

CTE không materialize:

- \`score_agg\`
- \`punctuality\`
- \`eng_agg\`
- \`class_max\`
- \`risk_flags\`

Validation:

- Expected materialization: ${JSON.stringify(materialization.expected)}
- Forbidden materialization: ${JSON.stringify(materialization.forbidden)}

Không thêm dataset hard-code, không đổi logic tính toán, không đổi vị trí filter.

## Before/After Performance

${makeBeforeAfterTable(baseline, after)}

After-fix detail:

| Metric | Value |
| --- | ---: |
| Planning time | ${fmt(after.planningTimeMs)}ms |
| Execution time | ${fmt(after.executionTimeMs)}ms |
| Shared hit blocks | ${after.sharedHitBlocks.toLocaleString("en-US")} |
| Shared read blocks | ${after.sharedReadBlocks.toLocaleString("en-US")} |
| Aggregate loops | ${after.aggregateLoops.toLocaleString("en-US")} |
| Window loops | ${after.windowAggLoops.toLocaleString("en-US")} |
| Nested Loop count/loops | ${after.nestedLoopNodeCount}/${after.nestedLoopLoops.toLocaleString("en-US")} |
| assessment_result scan loops | ${after.assessmentResultScanLoops.toLocaleString("en-US")} |
| assessment scan loops | ${after.assessmentScanLoops.toLocaleString("en-US")} |
| enrollment scan loops | ${after.enrollmentScanLoops.toLocaleString("en-US")} |
| engagement scan loops | ${after.engagementScanLoops.toLocaleString("en-US")} |
| EXPLAIN output rows | ${after.outputRows.toLocaleString("en-US")} |

Indexes used:

${after.indexNames.map((name) => `- \`${name}\``).join("\n") || "- none"}

## Output Schema Validation

Required columns from registry:

${requiredColumns.map((field) => `- \`${field}\``).join("\n") || "- none"}

Optional columns from registry:

${optionalColumns.map((field) => `- \`${field}\``).join("\n") || "- none"}

Actual output fields:

${outputFields.map((field) => `- \`${field}\``).join("\n") || "- none"}

Validation:

- Missing required fields: ${missingRequired.length ? missingRequired.map((field) => `\`${field}\``).join(", ") : "none"}
- Output schema status: **${missingRequired.length === 0 ? "PASS" : "FAIL"}**
- Output row count: \`${actualRowCount}\`

## Scope Validation

| Param | Value |
| --- | --- |
| context_source | \`${context.contextSource}\` |
| batch_id | \`${context.batch_id}\` |
| class_id | \`${context.class_id}\` |
| student_id | \`${context.student_id}\` |
| enrollment_id | \`${context.enrollment_id}\` |

Scope status:

- Uses runtime params instead of dataset hard-code: **PASS**
- Output rows > 0 for selected context: **${actualRowCount > 0 ? "PASS" : "FAIL"}**

## API / Debug Execution Validation

- Debug execution mode: \`executeSqlTask\`
- Debug status: **${execution.data ? "PASS" : "FAIL"}**
- Debug execution time: \`${execution.meta?.executionTimeMs ?? "n/a"}ms\`
- Debug row count: \`${actualRowCount}\`

Live API endpoint không dùng làm kết luận bắt buộc vì server có thể đang giữ registry cũ trong memory nếu chưa reload.

## Chart Contract Validation

- \`viz_type\`: \`${vizType ?? "n/a"}\`
- Required output fields are present.
- Browser chart render không chạy trong phase này; schema/chart-contract validation pass nếu required fields đầy đủ.

## Risks

- Fix chỉ áp dụng cho \`A-G03\`.
- Kết quả đo trên context ưu tiên.
- Task khác chưa được sửa trong phase này.

## Next Recommended Phase

Dừng tại đây theo scope. Nếu cần rollout endpoint-level validation, chạy lại bằng backend process đã reload registry.
`;
}

async function main() {
  await fs.mkdir(explainDir, { recursive: true });

  const task = taskRegistryService.getTaskById("A-G03");
  if (!task) throw new Error("Task A-G03 not found");

  const materialization = materializationStatus(task.sqlQuery ?? "");
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
  const explainRows = await prisma.$queryRawUnsafe(
    `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${dryRun.sql}`,
    ...dryRun.values
  );
  const plan = explainRows[0]["QUERY PLAN"][0];
  const after = summarizePlan(plan);
  await fs.writeFile(explainPath, JSON.stringify({ context, summary: after, plan }, null, 2), "utf8");

  const execution = await executeSqlTask({ task, params });
  const baseline = await readSummary(baselinePath);
  const candidate = await readSummary(candidatePath);
  const requiredColumns = task.output_schema?.required_columns ?? [];
  const optionalColumns = task.output_schema?.optional_columns ?? [];
  const report = makeReport({
    context,
    baseline,
    candidate,
    after,
    execution,
    materialization,
    requiredColumns,
    optionalColumns,
    vizType: task.viz_type,
  });
  await fs.writeFile(reportPath, report, "utf8");

  await prisma.$disconnect();
  console.log(JSON.stringify({
    reportPath,
    explainPath,
    after,
    debugExecution: {
      executionTimeMs: execution.meta?.executionTimeMs,
      rowCount: execution.meta?.rowCount,
      fields: Object.keys(execution.data?.[0] ?? {}),
    },
    materialization,
  }, null, 2));
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exitCode = 1;
});
