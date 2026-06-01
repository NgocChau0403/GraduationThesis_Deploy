#!/usr/bin/env node

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      out[key] = true;
      continue;
    }
    out[key] = value;
    i += 1;
  }
  return out;
}

function maskDatabaseUrl(raw) {
  if (!raw) return "(missing)";
  try {
    const u = new URL(raw);
    if (u.username) u.username = "***";
    if (u.password) u.password = "***";
    return u.toString();
  } catch {
    return "***";
  }
}

function loadEnvFile(envPath) {
  if (!fs.existsSync(envPath)) return { loaded: false, reason: "missing_file" };
  const content = fs.readFileSync(envPath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
  return { loaded: true };
}

function toNumberMaybe(v) {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function buildDatasetSummary(rows) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const fieldSet = new Set();
  for (const row of safeRows) {
    if (!row || typeof row !== "object") continue;
    for (const key of Object.keys(row)) fieldSet.add(key);
  }

  const fields = [...fieldSet];
  const nullCounts = {};
  const nanCounts = {};
  const infinityCounts = {};
  const emptyStringCounts = {};
  const numericMinMax = {};
  for (const f of fields) {
    nullCounts[f] = 0;
    nanCounts[f] = 0;
    infinityCounts[f] = 0;
    emptyStringCounts[f] = 0;
    numericMinMax[f] = { min: null, max: null };
  }

  for (const row of safeRows) {
    for (const f of fields) {
      const v = row?.[f];
      if (v === null || v === undefined) {
        nullCounts[f] += 1;
        continue;
      }
      if (typeof v === "string" && v === "") emptyStringCounts[f] += 1;
      if (typeof v === "number" && Number.isNaN(v)) {
        nanCounts[f] += 1;
        continue;
      }
      if (typeof v === "number" && !Number.isFinite(v)) {
        infinityCounts[f] += 1;
        continue;
      }
      const num = toNumberMaybe(v);
      if (num !== null) {
        if (numericMinMax[f].min === null || num < numericMinMax[f].min) numericMinMax[f].min = num;
        if (numericMinMax[f].max === null || num > numericMinMax[f].max) numericMinMax[f].max = num;
      }
    }
  }

  return {
    row_count: safeRows.length,
    fields_present: fields,
    null_counts: nullCounts,
    nan_counts: nanCounts,
    infinity_counts: infinityCounts,
    empty_string_counts: emptyStringCounts,
    numeric_min_max: numericMinMax,
  };
}

function hasRenderableData(vizType, chartData) {
  if (!chartData) return false;
  if (vizType === "scatter_plot") return Array.isArray(chartData.series) && chartData.series.some((s) => Array.isArray(s.data) && s.data.length > 0);
  if (vizType === "heatmap") return Array.isArray(chartData.cells) && chartData.cells.some((c) => c.value !== null && c.value !== undefined);
  if (vizType === "card") return chartData.type === "risk_status" || (Array.isArray(chartData.items) && chartData.items.length > 0);
  if (vizType === "checklist") return Array.isArray(chartData.items) && chartData.items.length > 0;
  if (vizType === "table") return Array.isArray(chartData.rows) && chartData.rows.length > 0;
  return Array.isArray(chartData.data) && chartData.data.length > 0;
}

function inferRowsAfterAdapter(vizType, chartData) {
  if (!chartData) return 0;
  if (vizType === "table") return Array.isArray(chartData.rows) ? chartData.rows.length : 0;
  if (vizType === "scatter_plot") return Array.isArray(chartData.series) ? chartData.series.reduce((s, x) => s + (Array.isArray(x.data) ? x.data.length : 0), 0) : 0;
  if (vizType === "card" || vizType === "checklist") return Array.isArray(chartData.items) ? chartData.items.length : 0;
  if (vizType === "heatmap") return Array.isArray(chartData.cells) ? chartData.cells.length : 0;
  return Array.isArray(chartData.data) ? chartData.data.length : 0;
}

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function sanitizeName(v) {
  return String(v || "").replace(/[^a-zA-Z0-9_-]+/g, "_");
}

function truncateText(v, max = 200) {
  const s = String(v ?? "");
  return s.length > max ? `${s.slice(0, max)}...` : s;
}

function mkIssue(severity, code, message, evidence) {
  return { severity, code, message, evidence: evidence ?? null };
}

function fenceSafe(text) {
  return String(text ?? "").replace(/```/g, "``\\`");
}

function countIssuesBySeverity(issues) {
  const out = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  for (const i of issues) if (out[i.severity] !== undefined) out[i.severity] += 1;
  return out;
}

function detectSqlRisks(sqlText) {
  const issues = [];
  const sql = String(sqlText || "");
  if (!sql) return issues;
  if (/source_dataset\s*=\s*'OULAD'|source_dataset\s*=\s*'UCI'/i.test(sql)) {
    issues.push(mkIssue("Medium", "SQL_DATASET_FILTER", "SQL contains explicit source_dataset filter.", "Matched source_dataset='OULAD' or source_dataset='UCI'."));
  }
  if (/COALESCE\s*\([^)]*,\s*0\s*\)/i.test(sql)) {
    issues.push(mkIssue("Low", "SQL_COALESCE_ZERO", "SQL contains COALESCE(..., 0) pattern; verify semantic intent.", "Matched COALESCE(...,0)."));
  }
  if (/\//.test(sql) && !/NULLIF\s*\(/i.test(sql)) {
    issues.push(mkIssue("Medium", "SQL_DIV_ZERO_RISK", "Potential division-by-zero risk: division found without NULLIF safeguard.", "Contains '/' but no NULLIF("));
  }
  return issues;
}

function renderMarkdown(report) {
  const issueLines = report.issues.length === 0
    ? "- None"
    : report.issues.map((i, idx) => `${idx + 1}. **${i.severity}** \`${i.code}\` - ${i.message}${i.evidence ? `\n   - Evidence: ${i.evidence}` : ""}`).join("\n");
  const sqlPreview = report?.sql?.preview;
  const sqlBlocks = Array.isArray(sqlPreview)
    ? sqlPreview
    : (sqlPreview ? [sqlPreview] : []);
  const sqlRendered = sqlBlocks.length === 0
    ? "_No SQL preview available._"
    : sqlBlocks
      .map((q, idx) => `SQL ${idx + 1}\n\`\`\`sql\n${fenceSafe(q)}\n\`\`\``)
      .join("\n\n");
  return `# One-click Debug Agent Report

## Run Context
- Task: \`${report.context.task}\`
- Batch: \`${report.context.batch}\`
- Class: \`${report.context.classId}\`
- Student: \`${report.context.studentId ?? "N/A"}\`
- Timestamp: \`${report.context.timestamp}\`
- Env file: \`${report.context.envFile}\`
- DATABASE_URL: \`${report.context.maskedDatabaseUrl}\`
- Prisma check: \`${report.prisma.ok ? "SUCCESS" : "FAILURE"}\`

## Task Metadata
\`\`\`json
${JSON.stringify(report.taskMeta, null, 2)}
\`\`\`

## Availability Result
\`\`\`json
${JSON.stringify(report.availability, null, 2)}
\`\`\`

## Analytics Execution
\`\`\`json
${JSON.stringify(report.analytics, null, 2)}
\`\`\`

## SQL / Query
${sqlRendered}

SQL params
\`\`\`json
${JSON.stringify(report?.sql?.params ?? {}, null, 2)}
\`\`\`

## Dataset Summary
\`\`\`json
${JSON.stringify(report.datasetSummary, null, 2)}
\`\`\`

## Required Fields Check
\`\`\`json
${JSON.stringify(report.requiredFieldsCheck, null, 2)}
\`\`\`

## Adapter / Chart Validation
\`\`\`json
${JSON.stringify(report.adapter, null, 2)}
\`\`\`

## Detected Issues
${issueLines}

## Final Verdict
- Verdict: **${report.verdict}**
- Issue counts:
  - Critical: ${report.issueCounts.Critical}
  - High: ${report.issueCounts.High}
  - Medium: ${report.issueCounts.Medium}
  - Low: ${report.issueCounts.Low}

## Manual Verification Checklist
1. Confirm task metadata matches \`taskRegistry.json\`.
2. Confirm availability \`status/executable/layers\` aligns with dataset reality.
3. Verify analytics API success and \`dataQuality\` warnings are actionable.
4. Inspect dataset summary for null/NaN/Infinity spikes.
5. Validate adapter output is renderable and skipped rows are expected.
6. For line multi-series, treat explicit collapse warning as intentional grouping (not row loss).`;
}

function renderAllTasksSummary(summary) {
  const rows = summary.results
    .map((r) => `| ${r.taskId} | ${r.taskName} | ${r.kind} | ${r.availabilityStatus} | ${r.apiStatus} | ${r.adapterRenderable ? "yes" : "no"} | ${r.verdict} | C:${r.issues.Critical}/H:${r.issues.High}/M:${r.issues.Medium}/L:${r.issues.Low} | ${r.reportPath} |`)
    .join("\n");

  const topIssues = summary.topIssues.length === 0
    ? "- None"
    : summary.topIssues.map((x, i) => `${i + 1}. \`${x.code}\` (${x.severity}) - ${x.count}`).join("\n");

  return `# All Tasks Debug Summary

## Run Context
- Batch: \`${summary.context.batch}\`
- Class: \`${summary.context.classId}\`
- Student fallback: \`${summary.context.studentId ?? "N/A"}\`
- Timestamp: \`${summary.context.timestamp}\`

## Totals
- Total tasks run: **${summary.counts.total}**
- PASS: **${summary.counts.PASS}**
- PASS_WITH_WARNINGS: **${summary.counts.PASS_WITH_WARNINGS}**
- FAIL: **${summary.counts.FAIL}**

## Results Table
| task id | task name | admin/student | availability status | API status | adapter renderable | verdict | critical/high/medium/low issue count | report path |
|---|---|---|---|---|---|---|---|---|
${rows}

## Groups
### PASS
${summary.groups.PASS.length > 0 ? summary.groups.PASS.map((x) => `- ${x.taskId} ${x.taskName}`).join("\n") : "- None"}

### PASS_WITH_WARNINGS
${summary.groups.PASS_WITH_WARNINGS.length > 0 ? summary.groups.PASS_WITH_WARNINGS.map((x) => `- ${x.taskId} ${x.taskName}`).join("\n") : "- None"}

### FAIL
${summary.groups.FAIL.length > 0 ? summary.groups.FAIL.map((x) => `- ${x.taskId} ${x.taskName}`).join("\n") : "- None"}

## Top Critical/High Issues
${topIssues}`;
}

function inferTaskKind(task) {
  const id = String(task?.taskId || "");
  const scope = String(task?.scope || "").toLowerCase();
  const sql = String(task?.sqlQuery || "") + "\n" + ((task?.sqlQueries || []).join("\n"));
  const needsStudent = id.startsWith("S-") || scope.includes("1 student") || /:student_id|:enrollment_id/i.test(sql);
  return needsStudent ? "student" : "admin";
}

function buildLogger({ mode, quiet }) {
  const printSection = (label) => {
    if (!quiet) console.log(`[${label}]`);
  };
  const printFull = (...x) => {
    if (!quiet && mode === "full") console.log(...x);
  };
  const printQuick = (...x) => {
    if (!quiet && mode === "quick") console.log(...x);
  };
  return { printSection, printFull, printQuick, quiet, mode };
}

async function runOneTask({
  repoRoot,
  backendEnvPath,
  maskedDbUrl,
  envLoad,
  prisma,
  task,
  params,
  limitSample,
  outPath,
  logger,
}) {
  const report = {
    context: {
      task: task?.taskId ?? null,
      batch: params.batch_id ?? null,
      classId: params.class_id ?? null,
      studentId: params.student_id ?? null,
      timestamp: new Date().toISOString(),
      envFile: backendEnvPath,
      maskedDatabaseUrl: maskedDbUrl,
    },
    prisma: { ok: false, error: null },
    taskMeta: {},
    availability: {},
    analytics: {},
    sql: {},
    datasetSummary: {},
    requiredFieldsCheck: {},
    adapter: {},
    issues: [],
    issueCounts: { Critical: 0, High: 0, Medium: 0, Low: 0 },
    verdict: "FAIL",
  };

  let selectedDatasetLabel = null;
  let requiredMissing = [];

  if (!envLoad.loaded || !process.env.DATABASE_URL) {
    report.issues.push(mkIssue("Critical", "DB_ENV_FAIL", "DATABASE_URL missing or .env not loaded.", JSON.stringify(envLoad)));
  }

  try {
    await prisma.importBatch.findMany({ take: 1 });
    report.prisma.ok = true;

    if (!task) {
      report.issues.push(mkIssue("Critical", "TASK_NOT_FOUND", `Task not found: ${report.context.task}`));
      throw new Error("Task not found");
    }

    report.taskMeta = {
      task_id: task.taskId ?? null,
      task_name: task.taskName ?? task.title ?? null,
      viz_type: task.viz_type ?? null,
      requiredCapabilities: task.requiredCapabilities ?? [],
      optionalCapabilities: task.optionalCapabilities ?? [],
      datasetCompatibility: task.datasetCompatibility ?? null,
      fallbackStrategy: task.fallbackStrategy ?? null,
      availability_contract: task.availability_contract ?? null,
      output_schema_required_columns: task.output_schema?.required_columns ?? [],
    };

    if (/_only$/i.test(String(task.datasetCompatibility || "")) && !task?.availability_contract?.dataset_specific?.reason) {
      report.issues.push(mkIssue("High", "DATASET_ONLY_NO_REASON", "datasetCompatibility is *_only but availability_contract.dataset_specific.reason is missing."));
    }

    const batch = await prisma.importBatch.findUnique({
      where: { batch_id: params.batch_id },
      select: { batch_id: true, source_dataset: true },
    });
    if (!batch) {
      report.issues.push(mkIssue("Critical", "BATCH_NOT_FOUND", `Batch not found: ${params.batch_id}`));
      throw new Error("Batch not found");
    }

    const capabilityValidatorPath = path.join(repoRoot, "Backend", "src", "services", "capabilityValidator.service.js");
    const capabilityValidatorModule = await import(pathToFileURL(capabilityValidatorPath).href);
    const capabilityValidatorService = capabilityValidatorModule.default;
    const validation = await capabilityValidatorService.validateTask(task.taskId, {
      batchId: params.batch_id,
      classId: params.class_id,
      sourceDataset: batch.source_dataset,
    });
    report.availability = {
      status: validation?.status ?? null,
      executable: validation?.executable ?? null,
      layer_results: validation?.layer_results ?? null,
      warnings: validation?.warnings ?? [],
      reasons: validation?.missing_requirements ?? [],
    };
    if (validation?.status === "unsupported") {
      report.issues.push(mkIssue("Critical", "AVAILABILITY_UNSUPPORTED", "Availability status is unsupported.", JSON.stringify(validation?.missing_requirements ?? [])));
    }

    const analyticsControllerPath = path.join(repoRoot, "Backend", "src", "controllers", "analytics.controller.js");
    const analyticsControllerModule = await import(pathToFileURL(analyticsControllerPath).href);
    const runAnalyticsController = analyticsControllerModule.runAnalyticsController;
    const runReq = { body: { taskId: task.taskId, params } };
    const runOut = { status: 200, json: null };
    const runRes = {
      status(code) {
        runOut.status = code;
        return this;
      },
      json(body) {
        runOut.json = body;
        return body;
      },
    };
    await runAnalyticsController(runReq, runRes);

    const datasets = runOut.json?.datasets ?? {};
    const datasetKeys = Object.keys(datasets);
    const meta = runOut.json?.meta ?? {};
    const sqlPreview = Array.isArray(task.sqlQueries) ? task.sqlQueries.slice(0, 2) : task.sqlQuery ?? null;
    report.analytics = {
      http_status: runOut.status,
      success: runOut.json?.success ?? false,
      taskId: runOut.json?.taskId ?? task.taskId,
      datasets_keys: datasetKeys,
      meta_keys: Object.keys(meta),
      dataQuality: meta?.dataQuality ?? null,
      row_count: meta?.rowCount ?? null,
      execution_time_ms: meta?.executionTimeMs ?? null,
    };
    report.sql = { preview: sqlPreview, params };
    if (runOut.status !== 200 || !runOut.json?.success) {
      report.issues.push(mkIssue("Critical", "ANALYTICS_RUN_FAIL", "Analytics execution failed.", JSON.stringify({ status: runOut.status, body: runOut.json })));
    }

    const sampleRows = {};
    const datasetSummaries = {};
    for (const key of datasetKeys) {
      const rowsForKey = Array.isArray(datasets[key]) ? datasets[key] : [];
      sampleRows[key] = rowsForKey.slice(0, limitSample);
      datasetSummaries[key] = buildDatasetSummary(rowsForKey);
    }
    report.datasetSummary = { summary_by_dataset: datasetSummaries, sample_rows: sampleRows };

    for (const [ds, summary] of Object.entries(datasetSummaries)) {
      const hasNaN = Object.values(summary.nan_counts || {}).some((n) => n > 0);
      const hasInf = Object.values(summary.infinity_counts || {}).some((n) => n > 0);
      if (hasNaN || hasInf) {
        report.issues.push(mkIssue("High", "NAN_INFINITY_PRESENT", `NaN/Infinity detected in dataset block "${ds}".`, JSON.stringify({ nan: summary.nan_counts, inf: summary.infinity_counts })));
      }
    }

    const policyPath = path.join(repoRoot, "Frontend", "src", "components", "chartSelectionPolicy.js");
    const policyModule = await import(pathToFileURL(policyPath).href);
    const resolveDatasetForVisualization = policyModule.resolveDatasetForVisualization;
    const deriveChartRequiredFields = policyModule.deriveChartRequiredFields;
    const adapterSpec = {
      bar_chart: "bar.adapter.js",
      line_chart: "line.adapter.js",
      scatter_plot: "scatter.adapter.js",
      pie_chart: "pie.adapter.js",
      heatmap: "heatmap.adapter.js",
      table: "table.adapter.js",
      card: "card.adapter.js",
      checklist: "checklist.adapter.js",
      histogram: "bar.adapter.js",
    };
    const vizType = task.viz_type;
    const adapterFile = adapterSpec[vizType] ?? null;
    if (!adapterFile) {
      report.adapter = { adapter_selected: null, renderable: false, empty_state_reason: `No adapter mapping for viz_type=${vizType}` };
      report.issues.push(mkIssue("Medium", "ADAPTER_NOT_FOUND", `No adapter mapping for viz_type=${vizType}.`));
    } else {
      const adapterPath = path.join(repoRoot, "Frontend", "src", "chartAdapters", adapterFile);
      const adapterModule = await import(pathToFileURL(adapterPath).href);
      const adapterFn = adapterModule.adapt;
      const config = task.visualization_config || {};
      const chartRequiredFields = deriveChartRequiredFields(task, config, vizType);
      const resolved = resolveDatasetForVisualization({
        taskMeta: task,
        datasets,
        config,
        vizType,
        chartRequiredFields,
      });
      selectedDatasetLabel = resolved.selectedDatasetLabel || null;
      const adapterInputRows = Array.isArray(resolved.rawData) ? resolved.rawData : [];
      const rowsBeforeAdapter = adapterInputRows.length;
      const adapted =
        typeof adapterFn === "function"
          ? adapterFn(adapterInputRows, { ...config, __selected_dataset_label: selectedDatasetLabel })
          : null;
      const adapterMeta = adapted?.meta || {};
      const adapterRenderable = hasRenderableData(vizType, adapted);
      const rowsAfterAdapter = inferRowsAfterAdapter(vizType, adapted);
      const collapseWarnings = (adapterMeta.warnings || []).filter((w) => typeof w === "string" && w.toLowerCase().includes("collapsed"));
      report.adapter = {
        adapter_selected: adapterFile,
        viz_type: vizType,
        selected_dataset_block: selectedDatasetLabel,
        selector_warnings: resolved.warnings || [],
        rows_before_adapter: rowsBeforeAdapter,
        accepted_valid_rows: adapterMeta.valid_rows ?? null,
        rows_after_adapter: rowsAfterAdapter,
        skipped_rows: adapterMeta.skipped_rows ?? null,
        missing_fields: adapterMeta.missing_fields ?? [],
        warnings: adapterMeta.warnings ?? [],
        null_handling_policy: adapterMeta.null_handling_policy ?? null,
        renderable: adapterRenderable,
        empty_state_reason: adapterRenderable ? null : (rowsBeforeAdapter === 0 ? "No rows selected for adapter input." : "Adapter output has no renderable series/data."),
        collapse_warnings: collapseWarnings,
      };

      const validRows = Number(adapterMeta.valid_rows ?? 0);
      const skippedRows = Number(adapterMeta.skipped_rows ?? 0);
      const denom = validRows + skippedRows;
      const skippedRatio = denom > 0 ? skippedRows / denom : 0;
      if (skippedRatio > 0.2) {
        report.issues.push(mkIssue("Medium", "HIGH_SKIPPED_ROW_RATIO", `Skipped-row ratio is ${(skippedRatio * 100).toFixed(1)}% (>20%).`, JSON.stringify({ validRows, skippedRows })));
      }
      if (vizType === "line_chart" && rowsBeforeAdapter > rowsAfterAdapter && collapseWarnings.length === 0 && skippedRows === 0) {
        report.issues.push(mkIssue("Medium", "ROW_COLLAPSE_NO_WARNING", "Major row collapse detected without explicit collapse warning.", JSON.stringify({ rowsBeforeAdapter, rowsAfterAdapter })));
      }
    }

    const requiredFields = task.output_schema?.required_columns ?? [];
    let availableFields = [];
    if (selectedDatasetLabel && Array.isArray(datasets[selectedDatasetLabel]) && datasets[selectedDatasetLabel].length > 0) {
      availableFields = Object.keys(datasets[selectedDatasetLabel][0] || {});
    } else {
      const firstDataset = Object.values(datasets).find((v) => Array.isArray(v) && v.length > 0);
      availableFields = firstDataset ? Object.keys(firstDataset[0] || {}) : [];
    }
    requiredMissing = requiredFields.filter((f) => !availableFields.includes(f));
    report.requiredFieldsCheck = { required_fields: requiredFields, available_fields: availableFields, missing_required_fields: requiredMissing };
    if (requiredMissing.length > 0) {
      report.issues.push(mkIssue("Critical", "MISSING_REQUIRED_FIELDS", "Missing required output fields.", JSON.stringify(requiredMissing)));
    }

    report.issues.push(...detectSqlRisks(Array.isArray(task.sqlQueries) ? task.sqlQueries.join("\n") : task.sqlQuery));

    if (logger.mode === "full" && !logger.quiet) {
      logger.printSection("STATUS");
      console.log(`prisma=SUCCESS`);
      console.log(`availability=${report.availability.status ?? "unknown"} executable=${report.availability.executable === true ? "yes" : "no"}`);
      console.log(`api_status=${report.analytics.http_status ?? "N/A"} analytics_success=${report.analytics.success ? "yes" : "no"}`);
      logger.printFull("[debug-runner] task metadata:", report.taskMeta);
      logger.printFull("[debug-runner] availability result:", report.availability);
      logger.printFull("[debug-runner] analytics execution:", {
        ...report.analytics,
        sql_query_preview_truncated: Array.isArray(sqlPreview) ? sqlPreview.map((q) => truncateText(q, 200)) : truncateText(sqlPreview, 200),
        sql_params: params,
      });
      logger.printSection("DATA");
      for (const key of datasetKeys) {
        console.log(`dataset=${key} rows=${datasetSummaries[key]?.row_count ?? 0}`);
      }
      logger.printFull("[debug-runner] sample rows:\n" + JSON.stringify(sampleRows, null, 2));
      logger.printFull("[debug-runner] dataset summary:\n" + JSON.stringify(datasetSummaries, null, 2));
      console.log(`adapter=${report.adapter.adapter_selected ?? "N/A"} renderable=${report.adapter.renderable ? "yes" : "no"}`);
      logger.printFull("[debug-runner] adapter validation:", report.adapter);
    }
  } catch (err) {
    if (!report.prisma.ok) {
      report.issues.push(mkIssue("Critical", "DB_ENV_FAIL", "Prisma/DB initialization failed.", err?.message ?? String(err)));
    }
    if (logger.mode === "full" && !logger.quiet) {
      console.error("[debug-runner] error:", err?.message ?? String(err));
    }
  }

  report.issueCounts = countIssuesBySeverity(report.issues);
  const hasCritical = report.issueCounts.Critical > 0;
  const hasHigh = report.issueCounts.High > 0;
  const hasMedium = report.issueCounts.Medium > 0;
  const passCore =
    report.prisma.ok &&
    report.taskMeta.task_id &&
    report.availability?.executable === true &&
    report.analytics?.success === true &&
    requiredMissing.length === 0 &&
    report.adapter?.renderable === true;
  if (hasCritical || !passCore) report.verdict = "FAIL";
  else if (hasHigh || hasMedium) report.verdict = "PASS_WITH_WARNINGS";
  else report.verdict = "PASS";

  const md = renderMarkdown(report);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, md, "utf8");
  return { report, outPath };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const backendEnvPath = path.join(repoRoot, "Backend", ".env");

const args = parseArgs(process.argv.slice(2));
const mode = String(args.mode ?? "quick").toLowerCase() === "full" ? "full" : "quick";
const quiet = Boolean(args.quiet);
const logger = buildLogger({ mode, quiet });
const limitSample = Math.max(1, Number.parseInt(String(args["limit-sample"] ?? "3"), 10) || 3);
const envLoad = loadEnvFile(backendEnvPath);
const maskedDbUrl = maskDatabaseUrl(process.env.DATABASE_URL);

const hasAllTasks = Boolean(args["all-tasks"]);
const hasTasksList = typeof args.tasks === "string" && args.tasks.trim() !== "";
const hasSingleTask = typeof args.task === "string" && args.task.trim() !== "";
const runMode = hasAllTasks ? "all" : hasTasksList ? "tasks" : hasSingleTask ? "single" : "none";

const requiredArgs =
  runMode === "single"
    ? ["task", "batch", "class"]
    : runMode === "tasks" || runMode === "all"
      ? ["batch", "class"]
      : [];
const missingArgs = requiredArgs.filter((k) => !args[k]);

if (!quiet) {
  logger.printSection("RUN");
  console.log(
    `task=${args.task ?? "N/A"} tasks=${args.tasks ?? "N/A"} batch=${args.batch ?? "N/A"} class=${args.class ?? "N/A"} student=${args.student ?? "N/A"} mode=${mode} run_mode=${runMode} all_tasks=${Boolean(args["all-tasks"])}`
  );
  logger.printFull("[debug-runner] env file:", backendEnvPath);
  logger.printFull("[debug-runner] env loaded:", envLoad);
  logger.printFull("[debug-runner] DATABASE_URL:", maskedDbUrl);
}

if (runMode === "none" || missingArgs.length > 0) {
  const usage = "Usage: node agents/run-debug-agent.mjs (--task <TASK_ID> | --tasks <ID1,ID2,...> | --all-tasks) --batch <BATCH_ID> --class <CLASS_ID> [--student <STUDENT_ID>] [--out <REPORT_PATH>] [--mode full] [--quiet]";
  const missingMsg =
    runMode === "none"
      ? "Missing run selector. Provide one of: --task, --tasks, or --all-tasks."
      : `Missing required args: ${missingArgs.join(", ")}`;
  const defaultOut = path.join(repoRoot, "agents", "reports", `run-arg-error-${nowStamp()}.md`);
  const outPath = args.out ? path.resolve(repoRoot, args.out) : defaultOut;
  const report = {
    context: {
      task: args.task ?? null,
      batch: args.batch ?? null,
      classId: args.class ?? null,
      studentId: args.student ?? null,
      timestamp: new Date().toISOString(),
      envFile: backendEnvPath,
      maskedDatabaseUrl: maskedDbUrl,
    },
    prisma: { ok: false, error: null },
    taskMeta: {},
    availability: {},
    analytics: {},
    sql: {},
    datasetSummary: {},
    requiredFieldsCheck: {},
    adapter: {},
    issues: [mkIssue("Critical", "MISSING_ARGS", `${missingMsg} ${usage}`)],
    issueCounts: { Critical: 1, High: 0, Medium: 0, Low: 0 },
    verdict: "FAIL",
  };
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, renderMarkdown(report), "utf8");
  if (quiet) {
    console.log(`verdict=FAIL`);
    console.log(`report=${outPath}`);
  } else {
    console.log(usage);
    logger.printSection("RESULT");
    console.log(`verdict=FAIL`);
    console.log(`report=${outPath}`);
  }
  process.exit(1);
}

const registryPath = path.join(repoRoot, "Backend", "src", "config", "taskRegistry.json");
const tasks = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const onlyAdmin = Boolean(args["only-admin"]);
const onlyStudent = Boolean(args["only-student"]);
const selectedTaskSet = args.tasks
  ? new Set(String(args.tasks).split(",").map((x) => x.trim()).filter(Boolean))
  : null;
const failFast = Boolean(args["fail-fast"]);

let prisma = null;
try {
  const prismaModulePath = path.join(repoRoot, "Backend", "src", "lib", "prisma.js");
  const prismaModule = await import(pathToFileURL(prismaModulePath).href);
  prisma = prismaModule.default;
  await prisma.importBatch.findMany({ take: 1 });
} catch (err) {
  const outPath = path.join(repoRoot, "agents", "reports", `run-db-fail-${nowStamp()}.md`);
  const report = {
    context: {
      task: args.task ?? null,
      batch: args.batch ?? null,
      classId: args.class ?? null,
      studentId: args.student ?? null,
      timestamp: new Date().toISOString(),
      envFile: backendEnvPath,
      maskedDatabaseUrl: maskedDbUrl,
    },
    prisma: { ok: false, error: err?.message ?? String(err) },
    taskMeta: {},
    availability: {},
    analytics: {},
    sql: {},
    datasetSummary: {},
    requiredFieldsCheck: {},
    adapter: {},
    issues: [mkIssue("Critical", "DB_ENV_FAIL", "Prisma/DB initialization failed.", err?.message ?? String(err))],
    issueCounts: { Critical: 1, High: 0, Medium: 0, Low: 0 },
    verdict: "FAIL",
  };
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, renderMarkdown(report), "utf8");
  if (quiet) {
    console.log(`verdict=FAIL`);
    console.log(`report=${outPath}`);
  } else {
    logger.printSection("STATUS");
    console.log(`prisma=FAIL`);
    logger.printSection("RESULT");
    console.log(`verdict=FAIL`);
    console.log(`report=${outPath}`);
  }
  process.exit(1);
}

if (runMode === "single") {
  const task = tasks.find((t) => t.taskId === args.task) || null;
  const defaultOut = path.join(repoRoot, "agents", "reports", `run-${sanitizeName(args.task)}-${sanitizeName(args.batch)}-${sanitizeName(args.class)}-${nowStamp()}.md`);
  const outPath = args.out ? path.resolve(repoRoot, args.out) : defaultOut;
  const { report } = await runOneTask({
    repoRoot,
    backendEnvPath,
    maskedDbUrl,
    envLoad,
    prisma,
    task,
    params: {
      batch_id: args.batch,
      class_id: args.class,
      ...(args.student ? { student_id: args.student } : {}),
    },
    limitSample,
    outPath,
    logger,
  });
  if (!quiet && mode === "quick") {
    logger.printSection("STATUS");
    console.log(`prisma=${report.prisma.ok ? "SUCCESS" : "FAIL"}`);
    console.log(`availability=${report.availability.status ?? "unknown"} executable=${report.availability.executable === true ? "yes" : "no"}`);
    console.log(`api_status=${report.analytics.http_status ?? "N/A"} analytics_success=${report.analytics.success ? "yes" : "no"}`);
    logger.printSection("DATA");
    const ds = report.analytics.datasets_keys?.[0] ?? "N/A";
    const rc = report.datasetSummary.summary_by_dataset?.[ds]?.row_count ?? 0;
    console.log(`dataset=${ds} rows=${rc}`);
    console.log(`adapter=${report.adapter.adapter_selected ?? "N/A"} renderable=${report.adapter.renderable ? "yes" : "no"}`);
    logger.printSection("ISSUES");
    console.log(`Critical=${report.issueCounts.Critical} High=${report.issueCounts.High} Medium=${report.issueCounts.Medium} Low=${report.issueCounts.Low}`);
    logger.printSection("RESULT");
    console.log(`verdict=${report.verdict}`);
    console.log(`report=${outPath}`);
  } else if (quiet) {
    console.log(`verdict=${report.verdict}`);
    console.log(`report=${outPath}`);
  } else if (mode === "full") {
    logger.printSection("ISSUES");
    console.log(`Critical=${report.issueCounts.Critical} High=${report.issueCounts.High} Medium=${report.issueCounts.Medium} Low=${report.issueCounts.Low}`);
    logger.printSection("RESULT");
    console.log(`verdict=${report.verdict}`);
    console.log(`report=${outPath}`);
  }
  await prisma.$disconnect();
  process.exit(report.verdict === "FAIL" ? 1 : 0);
}

let runList = tasks;
if (selectedTaskSet) runList = runList.filter((t) => selectedTaskSet.has(t.taskId));
if (onlyAdmin && !onlyStudent) runList = runList.filter((t) => inferTaskKind(t) === "admin");
if (onlyStudent && !onlyAdmin) runList = runList.filter((t) => inferTaskKind(t) === "student");

const runResults = [];
const issueCounter = new Map();

for (const task of runList) {
  const kind = inferTaskKind(task);
  const params = {
    batch_id: args.batch,
    class_id: args.class,
    ...(kind === "student" && args.student ? { student_id: args.student } : {}),
  };

  const outPath = path.join(
    repoRoot,
    "agents",
    "reports",
    "runs",
    `run-${sanitizeName(task.taskId)}-${sanitizeName(args.batch)}-${sanitizeName(args.class)}-${nowStamp()}.md`
  );

  if (kind === "student" && !args.student) {
    const report = {
      context: {
        task: task.taskId,
        batch: args.batch,
        classId: args.class,
        studentId: null,
        timestamp: new Date().toISOString(),
        envFile: backendEnvPath,
        maskedDatabaseUrl: maskedDbUrl,
      },
      prisma: { ok: true, error: null },
      taskMeta: {
        task_id: task.taskId,
        task_name: task.taskName ?? null,
        viz_type: task.viz_type ?? null,
      },
      availability: {},
      analytics: {},
      sql: {},
      datasetSummary: {},
      requiredFieldsCheck: {},
      adapter: {},
      issues: [mkIssue("Critical", "MISSING_STUDENT", "Student-level task requires --student but it was not provided.")],
      issueCounts: { Critical: 1, High: 0, Medium: 0, Low: 0 },
      verdict: "FAIL",
    };
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, renderMarkdown(report), "utf8");
    runResults.push({
      taskId: task.taskId,
      taskName: task.taskName ?? "",
      kind,
      availabilityStatus: "unknown",
      apiStatus: "N/A",
      adapterRenderable: false,
      verdict: "FAIL",
      issues: report.issueCounts,
      reportPath: outPath,
      report,
    });
    if (!quiet) console.log(`[FAIL] ${task.taskId} ${task.taskName} -> ${outPath}`);
    if (quiet) console.log(`[FAIL] ${task.taskId} ${task.taskName} -> ${outPath}`);
    if (failFast) break;
    continue;
  }

  try {
    const { report } = await runOneTask({
      repoRoot,
      backendEnvPath,
      maskedDbUrl,
      envLoad,
      prisma,
      task,
      params,
      limitSample,
      outPath,
      logger: buildLogger({ mode: "quick", quiet: true }),
    });
    runResults.push({
      taskId: task.taskId,
      taskName: task.taskName ?? "",
      kind,
      availabilityStatus: report.availability?.status ?? "unknown",
      apiStatus: report.analytics?.http_status ?? "N/A",
      adapterRenderable: report.adapter?.renderable === true,
      verdict: report.verdict,
      issues: report.issueCounts,
      reportPath: outPath,
      report,
    });
    if (!quiet) console.log(`[${report.verdict}] ${task.taskId} ${task.taskName} -> ${outPath}`);
    if (quiet) console.log(`[${report.verdict}] ${task.taskId} ${task.taskName} -> ${outPath}`);
    if (failFast && report.verdict === "FAIL") break;
  } catch (err) {
    const report = {
      context: {
        task: task.taskId,
        batch: args.batch,
        classId: args.class,
        studentId: params.student_id ?? null,
        timestamp: new Date().toISOString(),
        envFile: backendEnvPath,
        maskedDatabaseUrl: maskedDbUrl,
      },
      prisma: { ok: true, error: null },
      taskMeta: { task_id: task.taskId, task_name: task.taskName ?? null },
      availability: {},
      analytics: {},
      sql: {},
      datasetSummary: {},
      requiredFieldsCheck: {},
      adapter: {},
      issues: [mkIssue("Critical", "TASK_RUN_EXCEPTION", "Unhandled exception during task run.", err?.message ?? String(err))],
      issueCounts: { Critical: 1, High: 0, Medium: 0, Low: 0 },
      verdict: "FAIL",
    };
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, renderMarkdown(report), "utf8");
    runResults.push({
      taskId: task.taskId,
      taskName: task.taskName ?? "",
      kind,
      availabilityStatus: "error",
      apiStatus: "error",
      adapterRenderable: false,
      verdict: "FAIL",
      issues: report.issueCounts,
      reportPath: outPath,
      report,
    });
    if (!quiet) console.log(`[FAIL] ${task.taskId} ${task.taskName} -> ${outPath}`);
    if (quiet) console.log(`[FAIL] ${task.taskId} ${task.taskName} -> ${outPath}`);
    if (failFast) break;
  }
}

for (const r of runResults) {
  for (const i of r.report.issues || []) {
    if (i.severity !== "Critical" && i.severity !== "High") continue;
    const key = `${i.severity}::${i.code}`;
    issueCounter.set(key, (issueCounter.get(key) || 0) + 1);
  }
}

const counts = {
  total: runResults.length,
  PASS: runResults.filter((r) => r.verdict === "PASS").length,
  PASS_WITH_WARNINGS: runResults.filter((r) => r.verdict === "PASS_WITH_WARNINGS").length,
  FAIL: runResults.filter((r) => r.verdict === "FAIL").length,
};

const topIssues = [...issueCounter.entries()]
  .map(([k, count]) => {
    const [severity, code] = k.split("::");
    return { severity, code, count };
  })
  .sort((a, b) => b.count - a.count)
  .slice(0, 10);

const summary = {
  context: {
    batch: args.batch,
    classId: args.class,
    studentId: args.student ?? null,
    timestamp: new Date().toISOString(),
  },
  counts,
  results: runResults,
  groups: {
    PASS: runResults.filter((r) => r.verdict === "PASS"),
    PASS_WITH_WARNINGS: runResults.filter((r) => r.verdict === "PASS_WITH_WARNINGS"),
    FAIL: runResults.filter((r) => r.verdict === "FAIL"),
  },
  topIssues,
};

const summaryPath = path.join(repoRoot, "agents", "reports", `all-tasks-summary-${nowStamp()}.md`);
fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
fs.writeFileSync(summaryPath, renderAllTasksSummary(summary), "utf8");

if (!quiet) {
  logger.printSection("RESULT");
  console.log(`summary_report=${summaryPath}`);
  console.log(`total=${counts.total} PASS=${counts.PASS} PASS_WITH_WARNINGS=${counts.PASS_WITH_WARNINGS} FAIL=${counts.FAIL}`);
} else {
  console.log(`summary_report=${summaryPath}`);
  console.log(`total=${counts.total} PASS=${counts.PASS} PASS_WITH_WARNINGS=${counts.PASS_WITH_WARNINGS} FAIL=${counts.FAIL}`);
}

await prisma.$disconnect();
process.exit(counts.FAIL > 0 ? 1 : 0);
