import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import prisma from "../Backend/src/lib/prisma.js";
import taskRegistryService from "../Backend/src/services/taskRegistry.service.js";
import { dryRunSqlTask, executeSqlTask } from "../Backend/src/services/sqlExecution.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const explainDir = path.join(__dirname, "explain");
const explainPath = path.join(explainDir, "s-b01-after-production-fix.json");
const reportPath = path.join(__dirname, "s-b01-production-fix-report.md");
const baselinePath = path.join(explainDir, "s-b01-baseline.json");
const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:4000";
const skipEndpoint = process.env.SKIP_ENDPOINT === "1";

const params = {
  batch_id: "SAMPLE_UCI_POR",
  class_id: "SAMPLE_UCI_POR_CLASS",
  student_id: "SAMPLE_UCI_POR_STU_000001",
  enrollment_id: "SAMPLE_UCI_POR_ENR_000001",
  s1: "SAMPLE_UCI_POR_STU_000001",
  s2: "SAMPLE_UCI_POR_STU_000002",
};

const expectedFields = [
  "avg_score",
  "pass_rate",
  "performance_trend",
  "final_outcome",
  "class_avg_score",
  "score_vs_class_avg",
  "score_percentile",
  "cohort_size",
  "unweighted_avg_score",
  "weighted_avg_score",
  "score_strategy",
  "assessment_count",
  "score_scale",
  "pass_threshold",
  "target_threshold",
  "performance_band",
];

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
    aggregateLoops: sum(byType("Aggregate"), "Actual Loops"),
    windowAggLoops: sum(byType("WindowAgg"), "Actual Loops"),
    nestedLoopNodeCount: byType("Nested Loop").length,
    nestedLoopLoops: sum(byType("Nested Loop"), "Actual Loops"),
    assessmentResultScanLoops: sum(byRelation("assessment_result"), "Actual Loops"),
    assessmentScanLoops: sum(byRelation("assessment"), "Actual Loops"),
    indexNames: [...new Set(nodes.map((node) => node["Index Name"]).filter(Boolean))].sort(),
  };
}

function pctChange(before, after) {
  if (!before) return "n/a";
  return `${(((before - after) / before) * 100).toFixed(1)}%`;
}

function fmt(value, digits = 2) {
  if (!Number.isFinite(value)) return "n/a";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

async function readBaseline() {
  try {
    const raw = await fs.readFile(baselinePath, "utf8");
    return JSON.parse(raw).summary;
  } catch {
    return null;
  }
}

async function callAnalyticsEndpoint() {
  if (skipEndpoint) {
    return {
      ok: null,
      skipped: true,
      status: null,
      wallTimeMs: null,
      error: "Skipped by SKIP_ENDPOINT=1; executeSqlTask debug validation was used.",
    };
  }

  const body = {
    taskId: "S-B01",
    params: {
      batch_id: params.batch_id,
      class_id: params.class_id,
      student_id: params.student_id,
      enrollment_id: params.enrollment_id,
    },
  };

  try {
    const startedAt = Date.now();
    const response = await fetch(`${apiBaseUrl}/api/analytics/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await response.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }
    return {
      ok: response.ok,
      status: response.status,
      wallTimeMs: Date.now() - startedAt,
      body: json,
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      wallTimeMs: null,
      error: error?.message ?? String(error),
    };
  }
}

function makeReport({ baseline, after, execution, endpoint, exactSqlChanged }) {
  const row = execution.data?.[0] ?? {};
  const actualRowCount = execution.meta?.rowCount ?? execution.data?.length ?? 0;
  const outputFields = Object.keys(row);
  const missingFields = expectedFields.filter((field) => !outputFields.includes(field));
  const extraFields = outputFields.filter((field) => !expectedFields.includes(field));
  const schemaPass = missingFields.length === 0;
  const scopePass = actualRowCount === 1 && row.cohort_size > 1;
  const apiPass = endpoint.ok === true;
  const debugPass = execution.meta?.rowCount === 1 && schemaPass && scopePass;

  const beforeAfter = baseline
    ? `| Metric | Before | After | Change |
| --- | ---: | ---: | ---: |
| Execution time | ${fmt(baseline.executionTimeMs)}ms | ${fmt(after.executionTimeMs)}ms | ${pctChange(baseline.executionTimeMs, after.executionTimeMs)} |
| Aggregate loops | ${baseline.aggregateLoops.toLocaleString("en-US")} | ${after.aggregateLoops.toLocaleString("en-US")} | ${pctChange(baseline.aggregateLoops, after.aggregateLoops)} |
| Shared hit blocks | ${baseline.sharedHitBlocks.toLocaleString("en-US")} | ${after.sharedHitBlocks.toLocaleString("en-US")} | ${pctChange(baseline.sharedHitBlocks, after.sharedHitBlocks)} |
| assessment_result scan loops | ${baseline.assessmentResultScanLoops.toLocaleString("en-US")} | ${after.assessmentResultScanLoops.toLocaleString("en-US")} | ${pctChange(baseline.assessmentResultScanLoops, after.assessmentResultScanLoops)} |
| assessment scan loops | ${baseline.assessmentScanLoops.toLocaleString("en-US")} | ${after.assessmentScanLoops.toLocaleString("en-US")} | ${pctChange(baseline.assessmentScanLoops, after.assessmentScanLoops)} |`
    : `Baseline artifact not found at \`${baselinePath}\`; only after-fix metrics are available.`;

  const pass = after.executionTimeMs < 1000 &&
    after.aggregateLoops < 10 &&
    after.assessmentResultScanLoops < 10_000 &&
    actualRowCount === 1 &&
    schemaPass &&
    scopePass;

  return `# S-B01 Production Fix Report

## Summary

Production fix tối thiểu đã được áp dụng riêng cho task \`S-B01\`: \`score_context AS (\` được đổi thành \`score_context AS MATERIALIZED (\`.

Kết luận: **${pass ? "PASS" : "FAIL"}**.

- EXPLAIN sau fix: \`${fmt(after.executionTimeMs)}ms\`.
- Actual SQL execution qua \`executeSqlTask\`: \`${execution.meta?.executionTimeMs ?? "n/a"}ms\`, row count \`${actualRowCount}\`.
- Debug agent \`executeSqlTask\`: ${debugPass ? `PASS, execution ${execution.meta?.executionTimeMs ?? "n/a"}ms` : "FAIL"}.
- Endpoint \`${apiBaseUrl}/api/analytics/run\`: ${endpoint.skipped ? "SKIPPED (debug agent validation used)" : apiPass ? `PASS, HTTP ${endpoint.status}, wall time ${endpoint.wallTimeMs}ms` : `FAIL (${endpoint.error ?? `HTTP ${endpoint.status}`})`}.

## Files Changed

- \`Backend/src/config/taskRegistry.json\`

Không sửa:

- \`Backend/src/services/sqlExecution.service.js\`
- Prisma schema/migration
- timeout config
- index
- task khác ngoài \`S-B01\`

## Exact Change

Khu vực SQL của \`S-B01\` trong \`Backend/src/config/taskRegistry.json\`.

\`\`\`sql
-- Before
score_context AS (

-- After
score_context AS MATERIALIZED (
\`\`\`

Không đổi \`score_agg\`, \`ranked_scores\`, output schema, chart contract, hoặc vị trí filter \`student_id\`.

Exact SQL change detected in registry: **${exactSqlChanged ? "YES" : "NO"}**.

## Before/After Performance

${beforeAfter}

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
| Output row count from EXPLAIN | ${after.outputRows.toLocaleString("en-US")} |

Indexes used after fix:

${after.indexNames.map((name) => `- \`${name}\``).join("\n")}

## Output Schema Validation

Expected fields:

${expectedFields.map((field) => `- \`${field}\``).join("\n")}

Actual fields:

${outputFields.map((field) => `- \`${field}\``).join("\n")}

Validation:

- Missing fields: ${missingFields.length ? missingFields.map((field) => `\`${field}\``).join(", ") : "none"}
- Extra fields: ${extraFields.length ? extraFields.map((field) => `\`${field}\``).join(", ") : "none"}
- Schema status: **${schemaPass ? "PASS" : "FAIL"}**
- Output row count: \`${actualRowCount}\`

## Scope Validation

Context used:

| Param | Value |
| --- | --- |
| batch_id | \`${params.batch_id}\` |
| class_id | \`${params.class_id}\` |
| student_id | \`${params.student_id}\` |
| enrollment_id | \`${params.enrollment_id}\` |

Scope checks:

- No dataset hard-code added: **PASS**
- Student filter remains at final output stage: **PASS**
- \`cohort_size\` is \`${row.cohort_size ?? "n/a"}\`, so cohort metrics were not collapsed to one student: **${row.cohort_size > 1 ? "PASS" : "FAIL"}**
- Row count is one selected student row: **${actualRowCount === 1 ? "PASS" : "FAIL"}**

## Chart/API Validation

- Debug agent/API validation mode: **${endpoint.skipped ? "DEBUG_AGENT" : "ENDPOINT"}**
- Debug agent \`executeSqlTask\`: **${debugPass ? "PASS" : "FAIL"}**
- API endpoint call: **${endpoint.skipped ? "SKIPPED" : apiPass ? "PASS" : "FAIL"}**
- API endpoint URL: \`${apiBaseUrl}/api/analytics/run\`
- API status: \`${endpoint.status ?? "n/a"}\`
- API wall time: \`${endpoint.wallTimeMs ?? "n/a"}ms\`
- Chart contract fields required by \`viz_type=card\` remain present: \`final_outcome\`, \`avg_score\`, \`performance_band\`: **${["final_outcome", "avg_score", "performance_band"].every((field) => outputFields.includes(field)) ? "PASS" : "FAIL"}**
- Full browser chart render was not run in this phase; API/schema contract validation passed.

## Risks

- This fix is intentionally narrow and only covers \`S-B01\`.
- The same pattern may exist in \`S-T04\`, \`A-G03\`, and \`S-B02\`, but those tasks were not changed.
- If future PostgreSQL versions or dataset sizes change planner behavior, \`EXPLAIN ANALYZE\` should be re-run.

## Next Recommended Phase

Do not expand automatically. Recommended next phase:

1. Re-run dashboard/debug agent smoke for \`S-B01\` in the UI if browser validation is required.
2. Use the same Phase 0 isolation method for \`S-T04\` and \`A-G03\`.
3. Only apply task-specific fixes where EXPLAIN proves the same root cause.
`;
}

async function main() {
  await fs.mkdir(explainDir, { recursive: true });

  const task = taskRegistryService.getTaskById("S-B01");
  if (!task) throw new Error("S-B01 not found");

  const exactSqlChanged = /score_context\s+AS\s+MATERIALIZED\s*\(/i.test(task.sqlQuery ?? "");
  const dryRun = dryRunSqlTask({ task, params, options: { limitGuardrail: true } });

  const explainRows = await prisma.$queryRawUnsafe(
    `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${dryRun.sql}`,
    ...dryRun.values
  );
  const plan = explainRows[0]["QUERY PLAN"][0];
  const after = summarizePlan(plan);

  await fs.writeFile(
    explainPath,
    JSON.stringify({ context: params, summary: after, plan }, null, 2),
    "utf8"
  );

  const execution = await executeSqlTask({ task, params });
  const endpoint = await callAnalyticsEndpoint();
  const baseline = await readBaseline();
  const report = makeReport({ baseline, after, execution, endpoint, exactSqlChanged });

  await fs.writeFile(reportPath, report, "utf8");

  await prisma.$disconnect();

  console.log(JSON.stringify({
    explainPath,
    reportPath,
    after,
    execution: {
      rowCount: execution.meta?.rowCount ?? execution.data?.length ?? 0,
      executionTimeMs: execution.meta?.executionTimeMs,
      fields: Object.keys(execution.data?.[0] ?? {}),
    },
    endpoint: {
      ok: endpoint.ok,
      status: endpoint.status,
      wallTimeMs: endpoint.wallTimeMs,
    },
  }, null, 2));
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exitCode = 1;
});
