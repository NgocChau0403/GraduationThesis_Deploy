import fs from "fs/promises";
import path from "path";
import { performance } from "perf_hooks";
import { fileURLToPath, pathToFileURL } from "url";

import prisma from "../lib/prisma.js";
import taskRegistryService from "../services/taskRegistry.service.js";
import capabilityValidatorService from "../services/capabilityValidator.service.js";
import { executeSqlTask, dryRunSqlTask } from "../services/sqlExecution.service.js";
import { validateOutputSchema } from "../services/outputSchema.service.js";
import { classifyTaskOutcome } from "./failure_classifier.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WORKSPACE_ROOT = path.resolve(__dirname, "../../..");
const PREFERRED_DOCS_DIR = path.join(WORKSPACE_ROOT, "Docs");
const FALLBACK_DOCS_DIR = path.join(WORKSPACE_ROOT, "Backend", "phase1_outputs");

const CANONICAL_TABLES = [
  "student",
  "course",
  "class",
  "enrollment",
  "assessment",
  "assessment_result",
  "event",
  "engagement",
];

const ADAPTER_MAP = {
  line_chart: "line.adapter.js",
  bar_chart: "bar.adapter.js",
  histogram: "bar.adapter.js",
  scatter_plot: "scatter.adapter.js",
  pie_chart: "pie.adapter.js",
  heatmap: "heatmap.adapter.js",
  table: "table.adapter.js",
  card: "card.adapter.js",
  checklist: "checklist.adapter.js",
};

let chartSelectionPolicyCache = null;

function nowIso() {
  return new Date().toISOString();
}

function timestampForFile(date = new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}${p(date.getMonth() + 1)}${p(date.getDate())}_${p(date.getHours())}${p(date.getMinutes())}${p(date.getSeconds())}`;
}

function quoteIdent(value) {
  return `"${String(value).replace(/"/g, "\"\"")}"`;
}

function parseArgs(argv) {
  const out = {
    dataset: "all",
    batchId: "auto",
    verbose: true,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dataset") {
      out.dataset = String(argv[i + 1] || "").trim();
      i += 1;
      continue;
    }
    if (arg === "--batch-id") {
      out.batchId = String(argv[i + 1] || "").trim();
      i += 1;
      continue;
    }
    if (arg === "--quiet") {
      out.verbose = false;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  const normalizedDataset = out.dataset.toUpperCase();
  if (!["ALL", "UCI", "OULAD"].includes(normalizedDataset)) {
    throw new Error(`Invalid --dataset "${out.dataset}". Allowed: UCI | OULAD | all`);
  }

  if (normalizedDataset === "ALL" && out.batchId !== "auto") {
    throw new Error("--dataset all only supports --batch-id auto in Phase 1 runner.");
  }

  return {
    ...out,
    dataset: normalizedDataset,
  };
}

async function getLatestBatchBySource(sourceDataset) {
  return prisma.importBatch.findFirst({
    where: { source_dataset: sourceDataset },
    orderBy: { imported_at: "desc" },
  });
}

async function resolveBatchTargets({ dataset, batchId }) {
  if (dataset === "ALL") {
    const [uci, oulad] = await Promise.all([
      getLatestBatchBySource("UCI"),
      getLatestBatchBySource("OULAD"),
    ]);
    return [uci, oulad].filter(Boolean).map((row) => ({
      dataset_source: row.source_dataset,
      batch_id: row.batch_id,
      batch_name: row.batch_name,
      imported_at: row.imported_at,
    }));
  }

  if (batchId === "auto") {
    const latest = await getLatestBatchBySource(dataset);
    if (!latest) return [];
    return [{
      dataset_source: latest.source_dataset,
      batch_id: latest.batch_id,
      batch_name: latest.batch_name,
      imported_at: latest.imported_at,
    }];
  }

  const explicit = await prisma.importBatch.findUnique({
    where: { batch_id: batchId },
  });

  if (!explicit) {
    throw new Error(`Batch "${batchId}" not found.`);
  }
  if (explicit.source_dataset !== dataset) {
    throw new Error(
      `Batch "${batchId}" belongs to ${explicit.source_dataset}, not ${dataset}.`
    );
  }

  return [{
    dataset_source: explicit.source_dataset,
    batch_id: explicit.batch_id,
    batch_name: explicit.batch_name,
    imported_at: explicit.imported_at,
  }];
}

function inferValueType(values) {
  const nonNull = values.filter((v) => v !== null && v !== undefined && v !== "");
  if (nonNull.length === 0) return "unknown";

  const lower = nonNull.map((v) => String(v).trim().toLowerCase());
  const boolLike = lower.every((v) => ["true", "false", "0", "1", "yes", "no", "y", "n"].includes(v));
  if (boolLike) return "boolean_like";

  const numericLike = nonNull.every((v) => Number.isFinite(Number(v)));
  if (numericLike) return "numeric_like";

  return "string_like";
}

async function profileColumn({ tableName, columnName, batchId }) {
  const table = quoteIdent(tableName);
  const col = quoteIdent(columnName);

  const [stats] = await prisma.$queryRawUnsafe(
    `SELECT
       COUNT(*)::int AS row_count,
       COUNT(*) FILTER (WHERE ${col} IS NULL)::int AS null_count,
       COUNT(DISTINCT ${col})::int AS distinct_count
     FROM ${table}
     WHERE batch_id = $1`,
    batchId
  );

  const samples = await prisma.$queryRawUnsafe(
    `SELECT ${col} AS sample_value
     FROM ${table}
     WHERE batch_id = $1
       AND ${col} IS NOT NULL
     LIMIT 5`,
    batchId
  );

  const sampleValues = samples.map((x) => x.sample_value);
  const rowCount = stats?.row_count ?? 0;
  const nullCount = stats?.null_count ?? 0;
  const distinctCount = stats?.distinct_count ?? 0;

  return {
    row_count: rowCount,
    null_count: nullCount,
    null_ratio: rowCount > 0 ? Number((nullCount / rowCount).toFixed(4)) : 0,
    distinct_count: distinctCount,
    sample_values: sampleValues,
    inferred_type: inferValueType(sampleValues),
  };
}

async function buildDatasetProfile(batchId, sourceDataset) {
  const profile = {
    dataset_id: batchId,
    dataset_type: sourceDataset,
    generated_at: nowIso(),
    tables: {},
    inferred_canonical_schema: {
      tables_with_rows: [],
      non_empty_columns_by_table: {},
    },
  };

  for (const tableName of CANONICAL_TABLES) {
    const rowQuery = await prisma.$queryRawUnsafe(
      `SELECT COUNT(*)::int AS cnt FROM ${quoteIdent(tableName)} WHERE batch_id = $1`,
      batchId
    );
    const rowCount = rowQuery[0]?.cnt ?? 0;

    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = ${tableName}
      ORDER BY ordinal_position
    `;

    const columnProfiles = [];
    for (const col of columns) {
      const stats = await profileColumn({
        tableName,
        columnName: col.column_name,
        batchId,
      });
      columnProfiles.push({
        column_name: col.column_name,
        db_data_type: col.data_type,
        is_nullable: col.is_nullable === "YES",
        ...stats,
      });
    }

    const nonEmptyColumns = columnProfiles
      .filter((c) => c.row_count > 0 && c.null_count < c.row_count)
      .map((c) => c.column_name);

    profile.tables[tableName] = {
      row_count: rowCount,
      columns: columnProfiles,
    };

    if (rowCount > 0) {
      profile.inferred_canonical_schema.tables_with_rows.push(tableName);
    }
    profile.inferred_canonical_schema.non_empty_columns_by_table[tableName] = nonEmptyColumns;
  }

  return profile;
}

async function resolveRuntimeContext(batchId) {
  const classRows = await prisma.$queryRaw`
    SELECT class_id, COUNT(*)::int AS enrollment_count
    FROM enrollment
    WHERE batch_id = ${batchId}
    GROUP BY class_id
    ORDER BY enrollment_count DESC, class_id ASC
    LIMIT 1
  `;

  const primaryClassId = classRows[0]?.class_id ?? null;

  const studentRows = primaryClassId
    ? await prisma.$queryRaw`
        SELECT student_id, enrollment_id
        FROM enrollment
        WHERE batch_id = ${batchId}
          AND class_id = ${primaryClassId}
        ORDER BY student_id ASC
        LIMIT 2
      `
    : [];

  return {
    batch_id: batchId,
    class_id: primaryClassId,
    student_id: studentRows[0]?.student_id ?? null,
    enrollment_id: studentRows[0]?.enrollment_id ?? null,
    s1: studentRows[0]?.student_id ?? null,
    s2: studentRows[1]?.student_id ?? studentRows[0]?.student_id ?? null,
    context_rows: {
      class_candidates: classRows,
      student_candidates: studentRows,
    },
  };
}

function extractParamTokens(task) {
  const queries = Array.isArray(task.sqlQueries) ? task.sqlQueries : [task.sqlQuery];
  const set = new Set();

  for (const query of queries) {
    const text = String(query || "");
    const re = /(?<!:):([a-zA-Z_][a-zA-Z0-9_]*)/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      set.add(m[1]);
    }
  }

  return Array.from(set).sort();
}

function resolveTaskParams(task, runtimeContext) {
  const requiredParams = extractParamTokens(task);
  const params = {};
  const unresolved = [];
  const placeholders = [];

  const defaultPlaceholderByParam = {
    batch_id: "__PHASE1_MISSING_BATCH__",
    class_id: "__PHASE1_MISSING_CLASS__",
    student_id: "__PHASE1_MISSING_STUDENT__",
    enrollment_id: "__PHASE1_MISSING_ENROLLMENT__",
    s1: "__PHASE1_MISSING_S1__",
    s2: "__PHASE1_MISSING_S2__",
  };

  for (const key of requiredParams) {
    const value = runtimeContext[key];
    if (value === null || value === undefined || value === "") {
      unresolved.push(key);
      params[key] = defaultPlaceholderByParam[key] || `__PHASE1_MISSING_${String(key).toUpperCase()}__`;
      placeholders.push(key);
    } else {
      params[key] = value;
    }
  }

  return {
    required_params: requiredParams,
    resolved_params: params,
    unresolved_params: unresolved,
    placeholder_params: placeholders,
  };
}

function normalizeAnalyticsResult(task, result) {
  if (!result?.meta?.isMultiQuery) {
    const label = task.query_labels?.[0] ?? "data";
    return { [label]: result?.data ?? [] };
  }

  const datasets = {};
  for (const rs of result.data ?? []) {
    const label = task.query_labels?.[rs.index] ?? `query_${rs.index}`;
    datasets[label] = rs.data ?? [];
  }
  return datasets;
}

function computeAvailability(task, sourceDataset, capabilityResult) {
  const availability = capabilityResult?.availability || {};
  const compat = (task.datasetCompatibility ?? "both").toLowerCase();
  const source = String(sourceDataset || "").toLowerCase();
  const datasetCompatibilityPass =
    compat === "both" || compat.includes(source);

  const matchedCapabilities = availability.matched_capabilities ?? [];
  const missingCapabilities = [
    ...(availability.missing_required_capabilities ?? []),
    ...(availability.missing_required_any_capabilities ?? []),
  ];

  const denyReasons = [];
  if (availability.dataset_specific_issue?.message) {
    denyReasons.push(availability.dataset_specific_issue.message);
  }
  if (missingCapabilities.length > 0) {
    denyReasons.push(
      `missing required capabilities: ${missingCapabilities.join(", ")}`
    );
  }
  if (!datasetCompatibilityPass && !availability.dataset_specific_issue) {
    denyReasons.push(
      `legacy datasetCompatibility hint mismatch: ${task.datasetCompatibility || "unknown"} vs ${sourceDataset}`
    );
  }
  if (capabilityResult?.status !== "executable") {
    denyReasons.push(
      `capability status is ${capabilityResult?.status || "unknown"}`
    );
  }

  return {
    task_id: task.taskId,
    datasetCompatibility: task.datasetCompatibility ?? "unknown",
    datasetCompatibility_pass: datasetCompatibilityPass,
    capability_status: capabilityResult?.status ?? "unknown",
    confidence: availability.confidence ?? capabilityResult?.confidence ?? null,
    matched_capabilities: matchedCapabilities,
    missing_capabilities: missingCapabilities,
    missing_optional_enrichments:
      availability.missing_optional_enrichments ?? [],
    reason_codes: availability.reason_codes ?? [],
    denied: denyReasons.length > 0,
    denyReasons,
    allow_result: denyReasons.length === 0 ? "allow" : "deny",
  };
}

async function loadChartSelectionPolicy() {
  if (chartSelectionPolicyCache) return chartSelectionPolicyCache;
  const absPath = path.join(
    WORKSPACE_ROOT,
    "Frontend",
    "src",
    "components",
    "chartSelectionPolicy.js"
  );
  const mod = await import(pathToFileURL(absPath).href);
  if (
    typeof mod.resolveDatasetForVisualization !== "function"
    || typeof mod.deriveChartRequiredFields !== "function"
  ) {
    throw new Error("chartSelectionPolicy.js does not export required functions.");
  }
  chartSelectionPolicyCache = {
    resolveDatasetForVisualization: mod.resolveDatasetForVisualization,
    deriveChartRequiredFields: mod.deriveChartRequiredFields,
    modulePath: absPath,
  };
  return chartSelectionPolicyCache;
}

function getLegacyChartRequiredFields(vizType, config) {
  const fieldSet = new Set();
  const add = (x) => {
    if (typeof x === "string" && x.trim()) fieldSet.add(x);
  };

  if (["line_chart", "bar_chart", "histogram", "scatter_plot", "pie_chart", "heatmap"].includes(vizType)) {
    add(config.x_field);
    add(config.y_field);
  }
  if (vizType === "scatter_plot") {
    add(config.color_field);
  }
  if (vizType === "heatmap") {
    add(config.series_field);
  }

  return Array.from(fieldSet);
}

function analyzeChartFields(rawData, requiredFields) {
  if (!Array.isArray(rawData) || rawData.length === 0 || requiredFields.length === 0) {
    return {
      required: requiredFields,
      missing: [],
      missing_counts: {},
      skipped_rows_count: 0,
    };
  }

  const missingCounts = {};
  for (const field of requiredFields) {
    missingCounts[field] = rawData.filter((row) => {
      const value = row?.[field];
      return value === null || value === undefined || value === "";
    }).length;
  }

  const missing = requiredFields.filter((field) => {
    const hasInAny = rawData.some((row) => row && Object.prototype.hasOwnProperty.call(row, field));
    return !hasInAny;
  });

  const skippedRowsCount = rawData.filter((row) =>
    requiredFields.some((field) => row?.[field] === null || row?.[field] === undefined || row?.[field] === "")
  ).length;

  return {
    required: requiredFields,
    missing,
    missing_counts: missingCounts,
    skipped_rows_count: skippedRowsCount,
  };
}

function normalizeAdapterDiagnostics({
  adapted,
  chartFieldAnalysis,
  selectedDatasetLabel,
  selectionWarnings,
}) {
  const meta = adapted?.meta || {};

  const validRows = Number.isFinite(meta.validRows)
    ? meta.validRows
    : Number.isFinite(meta.valid_rows)
      ? meta.valid_rows
      : Array.isArray(adapted?.data)
        ? adapted.data.length
        : 0;
  const skippedRows = Number.isFinite(meta.skippedRows)
    ? meta.skippedRows
    : Number.isFinite(meta.skipped_rows)
      ? meta.skipped_rows
      : Number.isFinite(chartFieldAnalysis?.skipped_rows_count)
        ? chartFieldAnalysis.skipped_rows_count
        : 0;

  const missingFieldCounts =
    (meta.missingFieldCounts && typeof meta.missingFieldCounts === "object")
      ? meta.missingFieldCounts
      : (meta.missing_field_counts && typeof meta.missing_field_counts === "object")
        ? meta.missing_field_counts
        : (chartFieldAnalysis?.missing_counts || {});
  const missingFieldsRaw = Array.isArray(meta.missingFields)
    ? meta.missingFields
    : Array.isArray(meta.missing_fields)
      ? meta.missing_fields
      : [];
  const mergedMissingFields = new Set([
    ...missingFieldsRaw,
    ...Object.keys(missingFieldCounts).filter((k) => Number(missingFieldCounts[k]) > 0),
  ]);

  const selectedDataset =
    meta.selectedDatasetLabel
    ?? meta.selected_dataset_label
    ?? selectedDatasetLabel
    ?? null;

  const warnings = [
    ...(Array.isArray(selectionWarnings) ? selectionWarnings : []),
    ...(Array.isArray(meta.warnings) ? meta.warnings : []),
  ];

  return {
    validRows,
    skippedRows,
    missingFields: Array.from(mergedMissingFields),
    missingFieldCounts,
    nullHandlingPolicy:
      meta.nullHandlingPolicy
      ?? meta.null_handling_policy
      ?? "real zero is preserved; null/missing is not coerced",
    selectedDatasetLabel: selectedDataset,
    warnings,
  };
}

function analyzeMisleadingInputFromAdapterMeta({
  adapterDiagnostics,
  chartRequiredFields,
}) {
  const warnings = Array.isArray(adapterDiagnostics?.warnings)
    ? adapterDiagnostics.warnings
    : [];
  const riskWarnings = warnings.filter((w) => isRiskWarning(w));
  const validRows = Number(adapterDiagnostics?.validRows || 0);
  const skippedRows = Number(adapterDiagnostics?.skippedRows || 0);
  const missingFields = Array.isArray(adapterDiagnostics?.missingFields)
    ? adapterDiagnostics.missingFields
    : [];
  const missingFieldCounts =
    adapterDiagnostics?.missingFieldCounts && typeof adapterDiagnostics.missingFieldCounts === "object"
      ? adapterDiagnostics.missingFieldCounts
      : {};

  const requiredMissing = (chartRequiredFields || []).filter(
    (field) => Number(missingFieldCounts[field] || 0) > 0
  );

  let hasRisk = false;
  let rootCause = null;

  if (validRows === 0 && (skippedRows > 0 || missingFields.length > 0 || riskWarnings.length > 0)) {
    hasRisk = true;
    rootCause = "No valid chart rows after adapter missing-data policy.";
  } else if (requiredMissing.length > 0) {
    hasRisk = true;
    rootCause = `Required chart fields have missing/null values: ${requiredMissing.join(", ")}`;
  } else if (missingFields.length > 0 && skippedRows > 0) {
    hasRisk = true;
    rootCause = `Adapter skipped rows due to missing fields: ${missingFields.join(", ")}`;
  } else if (riskWarnings.length > 0) {
    hasRisk = true;
    rootCause = "Adapter emitted visualization warnings.";
  }

  return {
    has_risk: hasRisk,
    root_cause: rootCause,
    warnings,
    risk_warnings: riskWarnings,
    valid_rows: validRows,
    skipped_rows: skippedRows,
    missing_fields: missingFields,
  };
}

function isRiskWarning(text) {
  const warning = String(text || "");
  if (!warning) return false;

  const infoOnlyPatterns = [
    /^Selected dataset block\b/i,
    /^Multiple dataset blocks match chart fields; selected\b/i,
  ];
  if (infoOnlyPatterns.some((re) => re.test(warning))) {
    return false;
  }

  const riskPatterns = [
    /fallback/i,
    /missing/i,
    /invalid/i,
    /skipped/i,
    /null/i,
    /no dataset block/i,
    /no valid/i,
  ];
  return riskPatterns.some((re) => re.test(warning));
}

async function loadAdapter(vizType) {
  const adapterFile = ADAPTER_MAP[vizType];
  if (!adapterFile) return null;

  const absPath = path.join(
    WORKSPACE_ROOT,
    "Frontend",
    "src",
    "chartAdapters",
    adapterFile
  );
  const mod = await import(pathToFileURL(absPath).href);
  if (typeof mod.adapt !== "function") return null;
  return {
    adapt: mod.adapt,
    modulePath: absPath,
  };
}

function buildDryRunResult(task, params) {
  if (Array.isArray(task.sqlQueries) && task.sqlQueries.length > 0) {
    const queries = [];
    for (let i = 0; i < task.sqlQueries.length; i += 1) {
      const tempTask = {
        ...task,
        sqlQuery: task.sqlQueries[i],
        sqlQueries: undefined,
      };
      queries.push({
        index: i,
        ...dryRunSqlTask({ task: tempTask, params }),
      });
    }
    return { is_multi_query: true, queries };
  }

  return {
    is_multi_query: false,
    queries: [{ index: 0, ...dryRunSqlTask({ task, params }) }],
  };
}

function sampleRows(rows, count = 3) {
  if (!Array.isArray(rows)) return [];
  return rows.slice(0, count);
}

function buildTopRootCauses(taskResults) {
  const counts = new Map();
  for (const item of taskResults) {
    if (!item?.final_result?.root_cause_summary) continue;
    const key = item.final_result.root_cause_summary;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([root_cause_summary, count]) => ({ root_cause_summary, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

function summarizeBatch(batchResult) {
  const total = batchResult.tasks.length;
  const passed = batchResult.tasks.filter((t) => t.final_result.success).length;
  const failed = total - passed;

  const byCategory = {};
  for (const task of batchResult.tasks) {
    const key = task.final_result.success
      ? "SUCCESS"
      : (task.final_result.failure_type || "UNKNOWN");
    byCategory[key] = (byCategory[key] || 0) + 1;
  }

  const blockedStrict = batchResult.tasks
    .filter((t) => t.task_selection.denied && t.final_result.success)
    .map((t) => ({
      task_id: t.task_id,
      reason: t.task_selection.denyReasons.join(" | "),
    }));

  const misleading = batchResult.tasks
    .filter((t) => (t.visualization?.misleading_input?.has_risk ?? false))
    .filter((t) => Number(t.query_execution?.row_count || 0) > 0)
    .filter((t) => t.task_selection?.allow_result === "allow")
    .map((t) => ({
      dataset: t.dataset?.dataset_type ?? null,
      taskId: t.task_id,
      taskName: t.task_name,
      chartType: t.visualization?.chart_type ?? null,
      selectedDatasetLabel:
        t.visualization?.adapter_diagnostics?.selectedDatasetLabel
        ?? t.visualization?.resolved_dataset_label
        ?? null,
      missingFields:
        t.visualization?.adapter_diagnostics?.missingFields
        ?? t.visualization?.misleading_input?.missing_fields
        ?? [],
      skippedRows:
        t.visualization?.adapter_diagnostics?.skippedRows
        ?? t.visualization?.misleading_input?.skipped_rows
        ?? 0,
      validRows:
        t.visualization?.adapter_diagnostics?.validRows
        ?? t.visualization?.misleading_input?.valid_rows
        ?? 0,
      warnings: t.visualization?.misleading_input?.warnings ?? [],
      rootCause: t.visualization?.misleading_input?.root_cause ?? "Unknown chart risk",
    }));

  return {
    total_tasks: total,
    passed_tasks: passed,
    failed_tasks: failed,
    by_failure_category: byCategory,
    top_root_causes: buildTopRootCauses(batchResult.tasks),
    blocked_by_overly_strict_availability: blockedStrict,
    misleading_visualization_inputs: misleading,
  };
}

function buildMarkdownSummary(report) {
  const lines = [];
  lines.push("# Phase 1 Debug Summary");
  lines.push("");
  lines.push(`Generated at: ${report.generated_at}`);
  lines.push("");
  lines.push("## 1. Debug architecture map");
  lines.push(`- File: \`Docs/phase1_debug_architecture_map.md\``);
  lines.push("");

  for (const batch of report.batches) {
    const summary = batch.summary;
    lines.push(`## Dataset: ${batch.dataset_source} (${batch.batch_id})`);
    lines.push(`- Total tasks: ${summary.total_tasks}`);
    lines.push(`- Passed: ${summary.passed_tasks}`);
    lines.push(`- Failed: ${summary.failed_tasks}`);
    lines.push("- Failure categories:");
    for (const [cat, count] of Object.entries(summary.by_failure_category)) {
      lines.push(`  - ${cat}: ${count}`);
    }
    lines.push("");
    lines.push("- Most common root causes:");
    if (summary.top_root_causes.length === 0) {
      lines.push("  - None");
    } else {
      for (const r of summary.top_root_causes.slice(0, 5)) {
        lines.push(`  - (${r.count}) ${r.root_cause_summary}`);
      }
    }
    lines.push("");
    lines.push(`- Blocked by strict availability: ${summary.blocked_by_overly_strict_availability.length}`);
    lines.push(`- Potentially misleading visualization inputs: ${summary.misleading_visualization_inputs.length}`);
    lines.push("");
  }

  const allTasks = report.batches.flatMap((b) => b.tasks);
  const categoryCount = {};
  for (const t of allTasks) {
    const key = t.final_result.success ? "SUCCESS" : t.final_result.failure_type;
    categoryCount[key] = (categoryCount[key] || 0) + 1;
  }

  lines.push("## 2. Failure analysis summary");
  for (const [cat, count] of Object.entries(categoryCount)) {
    lines.push(`- ${cat}: ${count}`);
  }
  lines.push("");

  lines.push("## 3. Top priority fixes for Phase 2");
  lines.push("- Fix highest-frequency failure category first (see top_root_causes in JSON report).");
  lines.push("- Add task-level contract hardening for tasks that return empty/misaligned datasets.");
  lines.push("- Add explicit runtime guardrails where availability deny/pass conflicts are observed.");
  lines.push("");

  lines.push("## 4. Recommended availability refactors");
  lines.push("- Unify frontend and backend availability checks into one canonical decision source.");
  lines.push("- Replace string-only compatibility assumptions with capability+evidence scoring.");
  lines.push("- Expose deny reason codes to frontend for transparent task-state diagnostics.");
  lines.push("");

  lines.push("## 5. Recommended chart fixes");
  lines.push("- Add adapter-level null-preservation mode for numeric fields to avoid implicit zeroing.");
  lines.push("- Add per-chart missing-field warnings in UI before rendering.");
  lines.push("- Add deterministic multi-query dataset selection metadata in task config.");
  lines.push("");

  lines.push("## 6. High-risk areas likely to cause demo failures");
  lines.push("- Multi-query tasks with ambiguous chart dataset selection.");
  lines.push("- Tasks with non-executable capability status but query still runnable (or vice versa).");
  lines.push("- Tasks with partial data causing fallback values that may visually mislead users.");
  lines.push("");

  return lines.join("\n");
}

async function ensureWritableOutputDir() {
  const candidates = [PREFERRED_DOCS_DIR, FALLBACK_DOCS_DIR];
  for (const dir of candidates) {
    try {
      await fs.mkdir(dir, { recursive: true });
      const probePath = path.join(dir, ".__phase1_write_probe.tmp");
      await fs.writeFile(probePath, "ok", "utf8");
      await fs.unlink(probePath);
      return dir;
    } catch {
      // try next candidate
    }
  }
  throw new Error("No writable output directory found for Phase 1 debug reports.");
}

async function writeArchitectureMap(outputDir) {
  const text = `# Phase 1 Debug Architecture Map

## Task availability logic
- Backend task list filters: \`/Backend/src/controllers/tasks.controller.js\` (\`datasetCompatibility\`, \`scope\`, \`analysis\`, \`registry_status\`).
- Runtime capability validation: \`/Backend/src/services/capabilityValidator.service.js\`.
- API gating routes: \`/Backend/src/routes/task.routes.js\`.
- Frontend availability assumptions:
  - \`/Frontend/src/components/analytics/TaskListPanel.jsx\`
  - \`/Frontend/src/pages/StudentDashboardPage.jsx\`
  - \`/Frontend/src/pages/AdminDashboardPage.jsx\`

## Capability validator layers
- Layer A structural: required table existence check.
- Layer B semantic: required capabilities, FE field population, dataset compatibility fallback.
- Layer C analytical: warning-only analytical quality checks.
- Layer D data sufficiency: enrollment/result/engagement thresholds + confidence.

## Canonical schema and profile generation
- Import profiling: \`/Backend/src/services/profiling.service.js\`.
- Dataset type/role detection: \`/Backend/src/services/schemaDetect.service.js\`.
- Canonical field system:
  - \`/Backend/src/config/canonicalFields.js\`
  - \`/Backend/src/config/canonicalFieldAliases.js\`
  - \`/Backend/src/services/mappingSuggest.service.js\`
  - \`/Backend/src/services/mappingValidation.service.js\`

## Output schema usage
- Contract validation point: \`/Backend/src/services/outputSchema.service.js\`.
- Runtime invocation: \`/Backend/src/controllers/analytics.controller.js\`.

## Visualization rendering flow
- API call: \`runAnalyticsTask\` in \`/Frontend/src/services/analyticsApi.js\`.
- Rendering orchestration: \`/Frontend/src/components/ChartRenderer.jsx\`.
- Adapter modules:
  - \`/Frontend/src/chartAdapters/line.adapter.js\`
  - \`/Frontend/src/chartAdapters/bar.adapter.js\`
  - \`/Frontend/src/chartAdapters/scatter.adapter.js\`
  - \`/Frontend/src/chartAdapters/pie.adapter.js\`
  - \`/Frontend/src/chartAdapters/heatmap.adapter.js\`
  - \`/Frontend/src/chartAdapters/table.adapter.js\`
  - \`/Frontend/src/chartAdapters/card.adapter.js\`
  - \`/Frontend/src/chartAdapters/checklist.adapter.js\`

## Missing/null transformations (high-observability hotspots)
- Adapter defaults and coercions (e.g. \`Number(...) || 0\`, \`"Unknown"\`) in chart adapters.
- Display formatting fallback in \`/Frontend/src/utils/responseTransformer.js\`.
- SQL-level \`COALESCE\` in task queries (\`/Backend/src/config/taskRegistry.json\`).

## Runtime debug probes added in Phase 1
- Script runner: \`/Backend/src/debug/phase1_task_debug_runner.mjs\`.
- Failure classifier: \`/Backend/src/debug/failure_classifier.mjs\`.
- Outputs:
  - \`Docs/phase1_debug_report_<timestamp>.json\`
  - \`Docs/phase1_debug_summary_<timestamp>.md\`
`;
  await fs.mkdir(outputDir, { recursive: true });
  const archMapPath = path.join(outputDir, "phase1_debug_architecture_map.md");
  await fs.writeFile(archMapPath, text, "utf8");
  return archMapPath;
}

async function runTaskDebug(task, batchTarget, datasetProfile, runtimeContext, verbose) {
  const taskStart = performance.now();

  const capability = await capabilityValidatorService.validateTask(task.taskId, {
    batchId: batchTarget.batch_id,
    classId: runtimeContext.class_id || null,
    sourceDataset: batchTarget.dataset_source,
  });

  const taskSelection = computeAvailability(task, batchTarget.dataset_source, capability);
  const paramResolution = resolveTaskParams(task, runtimeContext);

  let dryRun = null;
  let execution = {
    success: false,
    error: null,
    execution_time_ms: 0,
    params: paramResolution.resolved_params,
    query_preview: [],
    rowCount: 0,
    returned_columns: [],
    sample_rows: [],
    datasets: {},
    meta: null,
  };

  try {
    dryRun = buildDryRunResult(task, paramResolution.resolved_params);
  } catch (err) {
    execution.error = {
      message: `Dry-run failed: ${err.message}`,
      stack: err.stack,
    };
  }

  if (!execution.error && paramResolution.unresolved_params.length > 0) {
    execution.query_preview.push(
      `Placeholder params injected: ${paramResolution.placeholder_params.join(", ")}`
    );
  }

  if (!execution.error) {
    const t0 = performance.now();
    try {
      const sqlResult = await executeSqlTask({
        task,
        params: paramResolution.resolved_params,
      });
      const datasets = normalizeAnalyticsResult(task, sqlResult);
      const primaryDataset = Object.values(datasets)[0] ?? [];
      execution.success = true;
      execution.execution_time_ms = Number((performance.now() - t0).toFixed(2));
      execution.rowCount = Array.isArray(primaryDataset) ? primaryDataset.length : 0;
      execution.returned_columns = execution.rowCount > 0 ? Object.keys(primaryDataset[0] ?? {}) : [];
      execution.sample_rows = sampleRows(primaryDataset, 3);
      execution.datasets = datasets;
      execution.meta = sqlResult.meta ?? null;
    } catch (err) {
      execution.execution_time_ms = Number((performance.now() - t0).toFixed(2));
      execution.error = {
        message: err.message,
        stack: err.stack,
      };
    }
  }

  const contract = execution.success
    ? validateOutputSchema(task, execution.datasets)
    : { ok: null, reason: "skipped_due_execution_error" };

  const vizConfig = task.visualization_config || {};
  const chartPolicy = await loadChartSelectionPolicy();
  const chartRequiredForSelection = chartPolicy.deriveChartRequiredFields(
    {
      query_labels: task.query_labels,
      availability_contract: task.availability_contract,
    },
    vizConfig,
    task.viz_type
  );
  const chartRequired = getLegacyChartRequiredFields(task.viz_type, vizConfig);

  let visualization = {
    chart_type: task.viz_type,
    visualization_config: vizConfig,
    chartRequiredFields: null,
    chart_required_fields: {
      required: chartRequired,
      missing: [],
    },
    resolved_dataset_label: null,
    adapter_input_preview: [],
    adapter_output_preview: null,
    adapter_diagnostics: null,
    skipped_rows_count: 0,
    missing_field_warnings: [],
    adapterModulePath: null,
    adapterError: null,
    misleading_input: { warnings: [], has_risk: false, root_cause: null },
  };

  if (execution.success) {
    const selection = chartPolicy.resolveDatasetForVisualization({
      taskMeta: {
        query_labels: task.query_labels,
        availability_contract: task.availability_contract,
      },
      datasets: execution.datasets,
      config: vizConfig,
      vizType: task.viz_type,
      chartRequiredFields: chartRequiredForSelection,
    });
    const rawData = selection?.rawData ?? [];
    const resolvedLabel = selection?.selectedDatasetLabel ?? null;
    const selectionWarnings = selection?.warnings ?? [];
    const chartFieldAnalysis = analyzeChartFields(rawData, chartRequired);
    visualization.chartRequiredFields = chartFieldAnalysis;
    visualization.chart_required_fields = {
      required: chartFieldAnalysis.required,
      missing: chartFieldAnalysis.missing,
    };
    visualization.resolved_dataset_label = resolvedLabel;
    visualization.adapter_input_preview = sampleRows(rawData, 3);
    visualization.skipped_rows_count = chartFieldAnalysis.skipped_rows_count;
    visualization.missing_field_warnings = chartFieldAnalysis.missing.map(
      (x) => `Missing field in rows: ${x}`
    );

    try {
      const adapter = await loadAdapter(task.viz_type);
      if (adapter) {
        visualization.adapterModulePath = adapter.modulePath;
        const adapterConfig = {
          ...vizConfig,
          __selected_dataset_label: resolvedLabel,
        };
        const adapted = adapter.adapt(rawData, adapterConfig);
        visualization.adapter_output_preview = adapted;
        const adapterDiagnostics = normalizeAdapterDiagnostics({
          adapted,
          chartFieldAnalysis,
          selectedDatasetLabel: resolvedLabel,
          selectionWarnings,
        });
        visualization.adapter_diagnostics = adapterDiagnostics;
        visualization.skipped_rows_count = adapterDiagnostics.skippedRows;
        visualization.missing_field_warnings = adapterDiagnostics.missingFields.map(
          (field) => `Missing/invalid field observed: ${field}`
        );
        visualization.misleading_input = analyzeMisleadingInputFromAdapterMeta({
          adapterDiagnostics,
          chartRequiredFields: chartRequired,
        });
      } else {
        visualization.missing_field_warnings.push(
          `No adapter mapping found for viz_type=${task.viz_type}`
        );
      }
    } catch (err) {
      visualization.adapterError = {
        message: err.message,
        stack: err.stack,
      };
    }
  }

  const finalResult = classifyTaskOutcome({
    execution,
    availability: taskSelection,
    contract,
    visualization,
    contextResolver: {
      unresolvedParams: paramResolution.unresolved_params,
    },
  });

  const taskResult = {
    task_id: task.taskId,
    task_name: task.taskName,
    generated_at: nowIso(),
    duration_ms: Number((performance.now() - taskStart).toFixed(2)),
    dataset: {
      dataset_id: batchTarget.batch_id,
      dataset_type: batchTarget.dataset_source,
      profile_snapshot: {
        tables_with_rows: datasetProfile.inferred_canonical_schema.tables_with_rows,
      },
    },
    task_selection: taskSelection,
    query_execution: {
      params: paramResolution.resolved_params,
      unresolved_params: paramResolution.unresolved_params,
      placeholder_params: paramResolution.placeholder_params,
      generated_sql: dryRun?.queries ?? [],
      execution_status: execution.success ? "success" : "error",
      execution_time_ms: execution.execution_time_ms,
      returned_columns: execution.returned_columns,
      row_count: execution.rowCount,
      sample_rows: execution.sample_rows,
      error: execution.error,
    },
    contract_validation: {
      output_schema_result: contract.ok,
      required_fields: task.output_schema?.required_columns ?? [],
      missing_fields: contract.missing ?? [],
      optional_fields: task.output_schema?.optional_columns ?? [],
      validation_error: contract.ok === false
        ? `Missing required columns: ${(contract.missing ?? []).join(", ")}`
        : null,
      available_fields: contract.available ?? [],
    },
    visualization,
    final_result: {
      ...finalResult,
      status: finalResult.success
        ? "SUCCESS"
        : `FAILURE_TYPE:${finalResult.failure_type}`,
    },
  };

  if (verbose) {
    console.log(`\n=== TASK ${task.taskId} :: ${task.taskName} ===`);
    console.log("[DATASET]");
    console.log(JSON.stringify(taskResult.dataset, null, 2));
    console.log("[TASK_SELECTION]");
    console.log(JSON.stringify(taskResult.task_selection, null, 2));
    console.log("[QUERY_EXECUTION]");
    console.log(JSON.stringify(taskResult.query_execution, null, 2));
    console.log("[CONTRACT_VALIDATION]");
    console.log(JSON.stringify(taskResult.contract_validation, null, 2));
    console.log("[VISUALIZATION]");
    console.log(JSON.stringify(taskResult.visualization, null, 2));
    console.log("[FINAL_RESULT]");
    console.log(JSON.stringify(taskResult.final_result, null, 2));
  }

  return taskResult;
}

async function runBatchForTarget(batchTarget, args) {
  console.log(`\n>>> Running Phase 1 debug for ${batchTarget.dataset_source} batch=${batchTarget.batch_id}`);

  const [datasetProfile, runtimeContext] = await Promise.all([
    buildDatasetProfile(batchTarget.batch_id, batchTarget.dataset_source),
    resolveRuntimeContext(batchTarget.batch_id),
  ]);

  const tasks = taskRegistryService.getAllTasks();
  const taskResults = [];

  for (const task of tasks) {
    const result = await runTaskDebug(
      task,
      batchTarget,
      datasetProfile,
      runtimeContext,
      args.verbose
    );
    taskResults.push(result);
  }

  const batchResult = {
    dataset_source: batchTarget.dataset_source,
    batch_id: batchTarget.batch_id,
    batch_name: batchTarget.batch_name,
    imported_at: batchTarget.imported_at,
    dataset_profile: datasetProfile,
    runtime_context: runtimeContext,
    tasks: taskResults,
  };
  batchResult.summary = summarizeBatch(batchResult);
  return batchResult;
}

function buildOverallSummary(batches) {
  const allTasks = batches.flatMap((b) => b.tasks);
  const byCategory = {};
  for (const task of allTasks) {
    const key = task.final_result.success ? "SUCCESS" : (task.final_result.failure_type || "UNKNOWN");
    byCategory[key] = (byCategory[key] || 0) + 1;
  }

  return {
    datasets_processed: batches.length,
    total_tasks: allTasks.length,
    passed_tasks: allTasks.filter((t) => t.final_result.success).length,
    failed_tasks: allTasks.filter((t) => !t.final_result.success).length,
    by_failure_category: byCategory,
    top_root_causes: buildTopRootCauses(allTasks),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const outputDir = await ensureWritableOutputDir();
  const archMapPath = await writeArchitectureMap(outputDir);

  const batchTargets = await resolveBatchTargets(args);
  if (batchTargets.length === 0) {
    throw new Error(`No matching dataset batch found for dataset=${args.dataset}`);
  }

  const batches = [];
  for (const target of batchTargets) {
    const batchResult = await runBatchForTarget(target, args);
    batches.push(batchResult);
  }

  const report = {
    generated_at: nowIso(),
    runner: {
      script: "Backend/src/debug/phase1_task_debug_runner.mjs",
      args,
      output_dir: outputDir,
      architecture_map_path: archMapPath,
    },
    batches,
    overall_summary: buildOverallSummary(batches),
  };

  const ts = timestampForFile();
  const jsonPath = path.join(outputDir, `phase1_debug_report_${ts}.json`);
  const mdPath = path.join(outputDir, `phase1_debug_summary_${ts}.md`);

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(jsonPath, JSON.stringify(report, null, 2), "utf8");
  await fs.writeFile(mdPath, buildMarkdownSummary(report), "utf8");

  console.log("\n=== Phase 1 Debug Completed ===");
  console.log(`Architecture map: ${archMapPath}`);
  console.log(`JSON report:      ${jsonPath}`);
  console.log(`Markdown summary: ${mdPath}`);
  console.log("Overall summary:");
  console.log(JSON.stringify(report.overall_summary, null, 2));
}

main()
  .catch((err) => {
    console.error("Phase 1 debug runner failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
