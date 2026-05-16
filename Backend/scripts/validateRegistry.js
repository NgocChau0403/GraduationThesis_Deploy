/**
 * validateRegistry.js — v2 (Hardened)
 * Validates all 53 tasks in taskRegistry.json.
 *
 * LEVEL 1 — Field Presence & Enum Checks (original)
 *   STEP 2a: viz_type + visualization_config + semantic_roles
 *   STEP 2b: explanation_strategy
 *   STEP 2c: target_audience
 *   STEP 2d: query_labels
 *   STEP 2e: analysis_context
 *
 * LEVEL 2 — Cross-Field Rules (NEW)
 *   RULE 1:  line_chart + variant=multi_series → series_field must not be null
 *   RULE 2:  scatter_plot + variant=colored    → color_field must not be null
 *   RULE 3:  heatmap                           → x_field AND y_field required (not null)
 *   RULE 4:  semantic_roles.x = "time"         → x_field must not be null
 *   RULE 5:  multi-query tasks (query_labels.length > 1) → isMultiQuery intent check
 *   RULE 6:  table tasks                       → x_field OR y_field should have a value
 *            (unless it's a pure synthesis/AI-only task)
 *
 * LEVEL 3 — Architectural Integrity (NEW)
 *   ARCH 1:  explanation_strategy="ranking" → viz_type should NOT be pie_chart
 *   ARCH 2:  explanation_strategy="trend"   → viz_type should be line_chart or bar_chart
 *   ARCH 3:  explanation_strategy="correlation" → viz_type should be scatter_plot or heatmap
 *   ARCH 4:  aggregation_level="comparison" → target_audience should include "instructor"
 *   ARCH 5:  granularity="weekly"           → semantic_roles.x should be "time"
 *   ARCH 6:  target_audience includes "student" → aggregation_level should be "student"
 *
 * Run: node scripts/validateRegistry.js
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_PATH = join(__dirname, "../src/config/taskRegistry.json");

// ── Allowed values (from CONTRACT 1) ─────────────────────────────────────────

const ALLOWED_VIZ_TYPES = new Set([
  "line_chart", "bar_chart", "scatter_plot", "pie_chart", "heatmap", "table",
]);

const ALLOWED_VARIANTS = {
  bar_chart:    new Set(["categorical", "grouped", "stacked", "ranked", "histogram"]),
  line_chart:   new Set(["default", "multi_series"]),
  scatter_plot: new Set(["default", "colored"]),
  pie_chart:    new Set(["default"]),
  heatmap:      new Set(["week_activity", "score_matrix"]),
  table:        new Set(["ranked", "default"]),
};

const ALLOWED_SEMANTIC_X = new Set([
  "time", "category", "cohort", "student", "ranking", "assessment",
]);
const ALLOWED_SEMANTIC_Y = new Set([
  "performance_metric", "engagement_metric", "behavioral_metric",
  "risk_metric", "count_metric", "ratio_metric",
]);
const ALLOWED_SEMANTIC_COLOR = new Set([...ALLOWED_SEMANTIC_Y, ...ALLOWED_SEMANTIC_X]);

const ALLOWED_EXPLANATION_STRATEGY = new Set([
  "trend", "comparison", "distribution", "correlation", "risk", "behavioral", "ranking",
]);
const ALLOWED_TARGET_AUDIENCE = new Set([
  "student", "instructor", "academic_advisor", "admin",
]);
const ALLOWED_GRANULARITY = new Set([
  "weekly", "per_assessment", "semester", "cohort_aggregate",
]);
const ALLOWED_AGGREGATION_LEVEL = new Set([
  "student", "cohort", "comparison", "instructor",
]);

// ── Architectural intent maps ─────────────────────────────────────────────────

// Which viz_types are semantically aligned with each strategy
const STRATEGY_VIZ_ALIGNMENT = {
  trend:        new Set(["line_chart", "bar_chart"]),
  comparison:   new Set(["bar_chart", "line_chart", "table"]),
  distribution: new Set(["bar_chart", "pie_chart", "table"]),
  correlation:  new Set(["scatter_plot", "heatmap"]),
  risk:         new Set(["table", "bar_chart"]),
  behavioral:   new Set(["line_chart", "bar_chart", "heatmap", "scatter_plot", "pie_chart"]),
  ranking:      new Set(["table", "bar_chart"]),
};

// Pure AI synthesis tasks — these have no meaningful chart x/y fields (table with all nulls)
const SYNTHESIS_TASK_IDS = new Set(["S-T13", "A-S08", "A-G16"]);

// ─────────────────────────────────────────────────────────────────────────────

const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
let errors   = 0;
let warnings = 0;
const errorList   = [];
const warningList = [];

function err(id, msg)  { errorList.push(`❌ [${id}] ${msg}`);   errors++;   }
function warn(id, msg) { warningList.push(`⚠️  [${id}] ${msg}`); warnings++; }

// ─────────────────────────────────────────────────────────────────────────────
// MAIN LOOP
// ─────────────────────────────────────────────────────────────────────────────

for (const task of registry) {
  const id  = task.taskId;
  const vc  = task.visualization_config;
  const ac  = task.analysis_context;
  const str = task.explanation_strategy;

  // ══════════════════════════════════════════════════════════════════════════
  // LEVEL 1 — Field Presence & Enum Checks
  // ══════════════════════════════════════════════════════════════════════════

  // viz_type
  if (!task.viz_type) {
    err(id, "Missing viz_type"); continue;
  }
  if (!ALLOWED_VIZ_TYPES.has(task.viz_type)) {
    err(id, `Unknown viz_type: "${task.viz_type}"`);
  }

  // visualization_config
  if (!vc || typeof vc !== "object") {
    err(id, "Missing visualization_config"); continue;
  }
  for (const key of ["x_field","y_field","series_field","color_field","orientation","variant","x_label","y_label","semantic_roles"]) {
    if (!(key in vc)) err(id, `visualization_config missing key: "${key}"`);
  }

  // variant
  const allowedVariants = ALLOWED_VARIANTS[task.viz_type];
  if (allowedVariants && !allowedVariants.has(vc.variant)) {
    err(id, `Invalid variant "${vc.variant}" for viz_type "${task.viz_type}". Allowed: ${[...allowedVariants].join(", ")}`);
  }

  // semantic_roles
  if (!vc.semantic_roles || typeof vc.semantic_roles !== "object") {
    err(id, "visualization_config.semantic_roles missing");
  } else {
    const sr = vc.semantic_roles;
    if (!("x" in sr)) {
      err(id, `semantic_roles missing key "x"`);
    } else if (sr.x !== null && !ALLOWED_SEMANTIC_X.has(sr.x)) {
      err(id, `semantic_roles.x "${sr.x}" not in CONTRACT enum. Allowed: ${[...ALLOWED_SEMANTIC_X].join(", ")}`);
    }
    if (!("y" in sr)) {
      err(id, `semantic_roles missing key "y"`);
    } else if (sr.y !== null && !ALLOWED_SEMANTIC_Y.has(sr.y)) {
      err(id, `semantic_roles.y "${sr.y}" not in CONTRACT enum. Allowed: ${[...ALLOWED_SEMANTIC_Y].join(", ")}`);
    }
    if (sr.color !== undefined && sr.color !== null && !ALLOWED_SEMANTIC_COLOR.has(sr.color)) {
      warn(id, `semantic_roles.color "${sr.color}" not in any enum — review needed`);
    }
  }

  // explanation_strategy
  if (!str) {
    err(id, "Missing explanation_strategy");
  } else if (!ALLOWED_EXPLANATION_STRATEGY.has(str)) {
    err(id, `Invalid explanation_strategy "${str}". Allowed: ${[...ALLOWED_EXPLANATION_STRATEGY].join(", ")}`);
  }

  // target_audience
  if (!Array.isArray(task.target_audience) || task.target_audience.length === 0) {
    err(id, "Missing or empty target_audience array");
  } else {
    for (const aud of task.target_audience) {
      if (!ALLOWED_TARGET_AUDIENCE.has(aud)) {
        err(id, `Invalid target_audience value "${aud}". Allowed: ${[...ALLOWED_TARGET_AUDIENCE].join(", ")}`);
      }
    }
  }

  // query_labels
  if (!Array.isArray(task.query_labels) || task.query_labels.length === 0) {
    err(id, "Missing or empty query_labels array");
  } else {
    for (const label of task.query_labels) {
      if (typeof label !== "string" || label.trim() === "") {
        err(id, `query_labels contains invalid label: "${label}"`);
      }
    }
  }

  // analysis_context
  if (!ac || typeof ac !== "object") {
    err(id, "Missing analysis_context");
  } else {
    if (!ac.granularity) {
      err(id, "analysis_context.granularity missing");
    } else if (!ALLOWED_GRANULARITY.has(ac.granularity)) {
      err(id, `Invalid granularity "${ac.granularity}". Allowed: ${[...ALLOWED_GRANULARITY].join(", ")}`);
    }
    if (!ac.aggregation_level) {
      err(id, "analysis_context.aggregation_level missing");
    } else if (!ALLOWED_AGGREGATION_LEVEL.has(ac.aggregation_level)) {
      err(id, `Invalid aggregation_level "${ac.aggregation_level}". Allowed: ${[...ALLOWED_AGGREGATION_LEVEL].join(", ")}`);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // LEVEL 2 — Cross-Field Rules
  // ══════════════════════════════════════════════════════════════════════════

  // RULE 1: line_chart + variant=multi_series → series_field must not be null
  if (task.viz_type === "line_chart" && vc.variant === "multi_series") {
    if (!vc.series_field) {
      err(id, "RULE 1: line_chart+multi_series requires series_field (currently null/missing). " +
              "Without series_field, LineAdapter cannot split into multiple lines.");
    }
  }

  // RULE 2: scatter_plot + variant=colored → color_field must not be null
  if (task.viz_type === "scatter_plot" && vc.variant === "colored") {
    if (!vc.color_field) {
      err(id, "RULE 2: scatter_plot+colored requires color_field (currently null/missing). " +
              "ScatterAdapter needs color_field to apply categorical coloring.");
    }
  }

  // RULE 3: heatmap → x_field AND y_field required
  if (task.viz_type === "heatmap") {
    if (!vc.x_field) err(id, "RULE 3: heatmap requires x_field (currently null).");
    if (!vc.y_field) err(id, "RULE 3: heatmap requires y_field (currently null).");
  }

  // RULE 4: semantic_roles.x = "time" → x_field must not be null
  if (vc.semantic_roles?.x === "time" && !vc.x_field) {
    err(id, "RULE 4: semantic_roles.x=\"time\" but x_field is null. " +
            "Time-axis tasks must declare a concrete x_field for trend rendering.");
  }

  // RULE 5: bar_chart + variant=grouped → series_field must not be null
  if (task.viz_type === "bar_chart" && vc.variant === "grouped") {
    if (!vc.series_field) {
      err(id, "RULE 5: bar_chart+grouped requires series_field. " +
              "BarAdapter needs series_field to split grouped bars.");
    }
  }

  // RULE 6: bar_chart + variant=stacked → series_field must not be null
  if (task.viz_type === "bar_chart" && vc.variant === "stacked") {
    if (!vc.series_field) {
      err(id, "RULE 6: bar_chart+stacked requires series_field. " +
              "BarAdapter needs series_field to build stacked layers.");
    }
  }

  // RULE 7: table tasks (non-synthesis) → x_field OR y_field should have a value
  if (task.viz_type === "table" && !SYNTHESIS_TASK_IDS.has(id)) {
    if (!vc.x_field && !vc.y_field) {
      warn(id, "RULE 7: table task has both x_field and y_field null. " +
               "If this is not a pure AI synthesis task, consider declaring key columns.");
    }
  }

  // RULE 8: multi-query tasks → query_labels count should be > 1
  // (Informational — we can't know sqlQueries count without full task schema,
  //  but we can flag if someone names 1 label "absence_data, score_series" accidentally)
  if (Array.isArray(task.query_labels)) {
    for (const label of task.query_labels) {
      if (label.includes(",")) {
        err(id, `RULE 8: query_labels entry "${label}" contains a comma — this looks like ` +
                "multiple labels accidentally joined into one string. Should be separate array items.");
      }
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // LEVEL 3 — Architectural Integrity Checks
  // ══════════════════════════════════════════════════════════════════════════

  if (str) {
    // ARCH 1: ranking strategy → viz_type must not be pie_chart
    if (str === "ranking" && task.viz_type === "pie_chart") {
      err(id, "ARCH 1: explanation_strategy=\"ranking\" is incompatible with viz_type=\"pie_chart\". " +
              "Pie charts have no ranked ordering. Use table (ranked) or bar_chart (ranked).");
    }

    // ARCH 2: trend strategy → viz_type should be line_chart or bar_chart
    if (str === "trend" && !new Set(["line_chart", "bar_chart"]).has(task.viz_type)) {
      warn(id, `ARCH 2: explanation_strategy="trend" with viz_type="${task.viz_type}". ` +
               "Trend strategy is optimised for line_chart or bar_chart — AI prompt may not fit well.");
    }

    // ARCH 3: correlation strategy → viz_type should be scatter_plot or heatmap
    if (str === "correlation" && !new Set(["scatter_plot", "heatmap"]).has(task.viz_type)) {
      warn(id, `ARCH 3: explanation_strategy="correlation" with viz_type="${task.viz_type}". ` +
               "Correlation strategy expects scatter_plot or heatmap — AI prompt may not fit well.");
    }

    // ARCH 4: comparison aggregation_level → target_audience should include instructor or advisor
    if (ac?.aggregation_level === "comparison") {
      const ta = task.target_audience ?? [];
      if (!ta.includes("instructor") && !ta.includes("academic_advisor")) {
        warn(id, "ARCH 4: aggregation_level=\"comparison\" but target_audience has neither " +
                 "\"instructor\" nor \"academic_advisor\". Comparison tasks are typically admin-facing.");
      }
    }

    // ARCH 5: granularity=weekly → semantic_roles.x should be "time"
    if (ac?.granularity === "weekly" && vc.semantic_roles?.x !== "time" && new Set(["line_chart", "heatmap"]).has(task.viz_type)) {
      warn(id, `ARCH 5: granularity="weekly" but semantic_roles.x="${vc.semantic_roles?.x}". ` +
               "Weekly granularity implies a time axis — semantic_roles.x=\"time\" expected.");
    }

    // ARCH 6: target_audience includes "student" ONLY → aggregation_level should be "student"
    const ta = task.target_audience ?? [];
    if (ta.length === 1 && ta[0] === "student" && ac?.aggregation_level !== "student") {
      warn(id, `ARCH 6: target_audience=["student"] (only) but aggregation_level="${ac?.aggregation_level}". ` +
               "Student-only tasks should aggregate at student level.");
    }
  }
}

// ── Print all errors + warnings ───────────────────────────────────────────────

if (errorList.length > 0) {
  console.log("\n── ERRORS ────────────────────────────────");
  errorList.forEach(e => console.error(e));
}
if (warningList.length > 0) {
  console.log("\n── WARNINGS ──────────────────────────────");
  warningList.forEach(w => console.warn(w));
}

// ── Summary ───────────────────────────────────────────────────────────────────

console.log("\n─────────────────────────────────────────────────────────────");
console.log(`Total tasks:    ${registry.length}`);
console.log(`Errors:         ${errors}  (L1: field/enum  |  L2: cross-field  |  L3: arch)`);
console.log(`Warnings:       ${warnings}  (informational — should review but won't block)`);

if (errors === 0 && warnings === 0) {
  console.log("\n✅ All tasks pass all 3 validation levels.");
  console.log("   → Registry is contract-compliant and architecturally consistent.");
} else if (errors === 0) {
  console.log("\n✅ No errors — registry is valid. Review warnings above.");
  console.log("   → STEP 3 is unblocked.");
} else {
  console.log("\n❌ Fix errors above before proceeding.");
  process.exit(1);
}
