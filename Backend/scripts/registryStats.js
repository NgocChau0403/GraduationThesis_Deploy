/**
 * registryStats.js
 * Generates a comprehensive statistical breakdown of taskRegistry.json.
 *
 * Useful for:
 *   - Thesis methodology chapter (task distribution, coverage analysis)
 *   - Architecture overview (viz type mix, strategy distribution)
 *   - Evaluation section (scope coverage, dataset compatibility)
 *
 * Run: node scripts/registryStats.js
 *   or: npm run registry:stats
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_PATH = join(__dirname, "../src/config/taskRegistry.json");

const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));

// ── Utility ───────────────────────────────────────────────────────────────────

function count(arr, keyFn) {
  const map = {};
  for (const item of arr) {
    const key = keyFn(item);
    if (key === undefined || key === null) continue;
    const keys = Array.isArray(key) ? key : [key];
    for (const k of keys) {
      map[k] = (map[k] ?? 0) + 1;
    }
  }
  return map;
}

function printSection(title, map, total, { sortByValue = true, showPct = true } = {}) {
  console.log(`\n  ${title}`);
  console.log("  " + "─".repeat(50));
  const sorted = sortByValue
    ? Object.entries(map).sort(([, a], [, b]) => b - a)
    : Object.entries(map);
  for (const [key, val] of sorted) {
    const pct    = showPct ? ` (${((val / total) * 100).toFixed(0)}%)` : "";
    const bar    = "█".repeat(Math.round((val / total) * 20));
    const padKey = key.padEnd(22);
    console.log(`  ${padKey} ${String(val).padStart(3)}${pct.padEnd(7)}  ${bar}`);
  }
}

function printKv(pairs) {
  for (const [k, v] of pairs) {
    console.log(`  ${k.padEnd(32)} ${v}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPUTE STATS
// ─────────────────────────────────────────────────────────────────────────────

const total = registry.length;

// 1. Task ID groups (prefix)
const byGroup = count(registry, t => t.taskId.split("-")[0]); // S | A

// 2. Scope (from taskId second segment)
const byScope = count(registry, t => {
  const [group, sub] = t.taskId.split("-");
  if (sub === "B01" || sub === "B02" || sub === "B03" || sub === "B04") return `${group}-Baseline`;
  if (group === "S") return "S-Analysis (student)";
  if (sub?.startsWith("S")) return "A-Student (admin view)";
  if (sub?.startsWith("C")) return "A-Comparison (2 students)";
  if (sub?.startsWith("G")) return "A-Group/Cohort";
  return "Other";
});

// 3. Viz type
const byVizType = count(registry, t => t.viz_type);

// 4. Variant (per viz_type breakdown)
const byVariant = count(registry, t => `${t.viz_type}:${t.visualization_config?.variant}`);

// 5. Explanation strategy
const byStrategy = count(registry, t => t.explanation_strategy);

// 6. Target audience (multi-value — count each audience separately)
const byAudience = count(registry, t => t.target_audience);

// 7. Granularity
const byGranularity = count(registry, t => t.analysis_context?.granularity);

// 8. Aggregation level
const byAggLevel = count(registry, t => t.analysis_context?.aggregation_level);

// 9. Semantic roles X
const bySemX = count(registry, t => t.visualization_config?.semantic_roles?.x);

// 10. Semantic roles Y
const bySemY = count(registry, t => t.visualization_config?.semantic_roles?.y);

// 11. Multi-query tasks (query_labels.length > 1)
const multiQueryTasks = registry.filter(t => t.query_labels?.length > 1);
const singleQueryTasks = registry.filter(t => t.query_labels?.length === 1);

// 12. Dataset compatibility
const byDataset = count(registry, t => t.datasetCompatibility ?? "both");

// 13. Tasks with series_field defined
const withSeriesField = registry.filter(t => t.visualization_config?.series_field !== null);
const withColorField  = registry.filter(t => t.visualization_config?.color_field  !== null);

// 14. Unique query_labels count
const allLabels = registry.flatMap(t => t.query_labels ?? []);
const uniqueLabels = new Set(allLabels);

// 15. Strategy × Viz cross-tab (top combos)
const byStrategyViz = count(registry, t => `${t.explanation_strategy} × ${t.viz_type}`);

// ─────────────────────────────────────────────────────────────────────────────
// PRINT REPORT
// ─────────────────────────────────────────────────────────────────────────────

console.log("\n");
console.log("╔════════════════════════════════════════════════════════════╗");
console.log("║     LEARNING ANALYTICS — TASK REGISTRY STATISTICS         ║");
console.log("╚════════════════════════════════════════════════════════════╝");

console.log(`\n  Total tasks: ${total}`);
console.log("\n  Task ID Group:");
printKv([
  ["  Student tasks (S-*)", `${byGroup.S ?? 0} tasks`],
  ["  Admin tasks (A-*)",   `${byGroup.A ?? 0} tasks`],
]);

// ── Section 1: Task Scope Distribution ───────────────────────────────────────
console.log("\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  1. TASK SCOPE DISTRIBUTION");
printSection("By task group + scope:", byScope, total);

// ── Section 2: Visualization Type ────────────────────────────────────────────
console.log("\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  2. VISUALIZATION TYPE");
printSection("By viz_type:", byVizType, total);

console.log("\n  By variant (viz_type:variant):");
console.log("  " + "─".repeat(50));
const sortedVariants = Object.entries(byVariant).sort(([, a], [, b]) => b - a);
for (const [key, val] of sortedVariants) {
  const pct = ((val / total) * 100).toFixed(0);
  console.log(`  ${key.padEnd(30)} ${String(val).padStart(3)} (${pct}%)`);
}

console.log(`\n  Tasks with series_field defined: ${withSeriesField.length} (${((withSeriesField.length/total)*100).toFixed(0)}%)`);
console.log(`  Tasks with color_field defined:  ${withColorField.length} (${((withColorField.length/total)*100).toFixed(0)}%)`);

// ── Section 3: Explanation Strategy ──────────────────────────────────────────
console.log("\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  3. EXPLANATION STRATEGY (AI Prompt Strategy Class)");
printSection("By explanation_strategy:", byStrategy, total);

// ── Section 4: Target Audience ────────────────────────────────────────────────
console.log("\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  4. TARGET AUDIENCE (multi-value — one task may count for multiple)");
printSection("By audience (total audience assignments):", byAudience, total);
const studentOnly = registry.filter(t => t.target_audience?.length === 1 && t.target_audience[0] === "student");
const adminMulti  = registry.filter(t => (t.target_audience?.length ?? 0) > 1);
console.log(`\n  Student-only tasks:           ${studentOnly.length}`);
console.log(`  Multi-audience tasks:         ${adminMulti.length}`);

// ── Section 5: Analysis Context ──────────────────────────────────────────────
console.log("\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  5. ANALYSIS CONTEXT");
printSection("By granularity:", byGranularity, total);
printSection("By aggregation_level:", byAggLevel, total);

// ── Section 6: Semantic Roles ─────────────────────────────────────────────────
console.log("\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  6. SEMANTIC ROLES (Chart Axis Semantics)");
printSection("semantic_roles.x (X axis meaning):", bySemX, total);
printSection("semantic_roles.y (Y axis meaning):", bySemY, total);

// ── Section 7: Query Labels ───────────────────────────────────────────────────
console.log("\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  7. QUERY LABELS (Dataset Normalization)");
printKv([
  ["Single-query tasks (1 label):",   `${singleQueryTasks.length} tasks`],
  ["Multi-query tasks (2+ labels):",  `${multiQueryTasks.length} tasks`],
  ["Total query_labels across all tasks:", `${allLabels.length}`],
  ["Unique label names:",             `${uniqueLabels.size}`],
]);

if (multiQueryTasks.length > 0) {
  console.log("\n  Multi-query task breakdown:");
  for (const t of multiQueryTasks) {
    console.log(`    [${t.taskId}]  ${t.query_labels.join(" + ")}`);
  }
}

// ── Section 8: Cross-Tab: Strategy × Viz ─────────────────────────────────────
console.log("\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  8. STRATEGY × VIZ_TYPE (Cross-tabulation, top combinations)");
console.log("  " + "─".repeat(50));
const topCombos = Object.entries(byStrategyViz).sort(([, a], [, b]) => b - a).slice(0, 12);
for (const [combo, val] of topCombos) {
  console.log(`  ${combo.padEnd(36)} ${String(val).padStart(3)} tasks`);
}

// ── Section 9: Dataset Compatibility ─────────────────────────────────────────
console.log("\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  9. DATASET COMPATIBILITY");
printSection("By datasetCompatibility:", byDataset, total);

// ── Section 10: Thesis Summary Block ─────────────────────────────────────────
console.log("\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  10. THESIS METHODOLOGY SUMMARY (copy-paste ready)");
console.log("  " + "─".repeat(50));

const topViz  = Object.entries(byVizType).sort(([, a], [, b]) => b - a);
const topStr  = Object.entries(byStrategy).sort(([, a], [, b]) => b - a);

console.log(`
  The system implements ${total} analytical tasks distributed across two primary user
  roles: ${byGroup.S} student-facing tasks (S-*) and ${byGroup.A} administrator-facing tasks
  (A-*). The task registry employs ${Object.keys(byVizType).length} distinct visualization types, with
  ${topViz[0][0].replace("_", " ")} (n=${topViz[0][1]}) and ${topViz[1][0].replace("_", " ")} (n=${topViz[1][1]}) being the most
  prevalent. AI explanation strategies span ${Object.keys(byStrategy).length} categories, with
  ${topStr[0][0]} (n=${topStr[0][1]}) and ${topStr[1][0]} (n=${topStr[1][1]}) accounting for
  the majority. Of the ${total} tasks, ${multiQueryTasks.length} employ multi-query execution
  (requiring dataset normalization via query_labels[]) and ${singleQueryTasks.length} use
  single-query execution.
`);

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
