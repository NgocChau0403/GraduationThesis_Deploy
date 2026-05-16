/**
 * injectAiMetadata.js
 * Injects AI-related metadata fields into all 53 tasks in taskRegistry.json:
 *   - explanation_strategy  (7-value enum per CONTRACT 1.2)
 *   - target_audience       (array, 4-value enum per CONTRACT 1.3)
 *   - query_labels          (array, ≥1 label per task per CONTRACT 1.4)
 *   - analysis_context      (granularity + aggregation_level per CONTRACT 1.5)
 *
 * Also normalizes semantic_roles.x/.y to CONTRACT 1.1 vocabulary:
 *   semantic_roles.x: time | category | cohort | student | ranking | assessment
 *   semantic_roles.y: performance_metric | engagement_metric | behavioral_metric
 *                     | risk_metric | count_metric | ratio_metric
 *
 * Run: node scripts/injectAiMetadata.js
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_PATH = join(__dirname, "../src/config/taskRegistry.json");

// ─────────────────────────────────────────────────────────────────────────────
// AI METADATA MAP
// Key: taskId → { explanation_strategy, target_audience, query_labels, analysis_context }
//
// DECISION RULES applied per task:
//
// explanation_strategy:
//   trend        → task has line_chart + time dimension, analysisType=trend
//   comparison   → scope="2 students", analysisType=comparison
//   distribution → analysisType=distribution, histogram/pie
//   correlation  → analysisType=correlation, scatter_plot
//   risk         → at_risk / risk flags in keyDbFields
//   behavioral   → engagement / submission delay / activity pattern
//   ranking      → analysisType=ranking, table ranked
//
// target_audience:
//   student           → scope="1 student", role=student
//   instructor        → scope="1 student/Many" with admin/instructor role
//   academic_advisor  → risk/background tasks for admin
//   admin             → scope="Cohort/Many" with broad admin role
//
// query_labels:
//   Single-query → 1 label (lowercase_snake matching primary output)
//   Multi-query  → N labels (one per UNION/separate SELECT)
//   AI synthesis → ["synthesis_data"]
//
// analysis_context.granularity:
//   weekly           → week_number / week_of_class is x_field
//   per_assessment   → assessment_order is x_field
//   semester         → aggregate over full course, no time series
//   cohort_aggregate → cohort-level rollup
//
// analysis_context.aggregation_level:
//   student     → single student focused
//   cohort      → whole class
//   comparison  → 2-student comparison
//   instructor  → instructor viewing student
// ─────────────────────────────────────────────────────────────────────────────

const AI_META_MAP = {

  // ── STUDENT BASELINE ──────────────────────────────────────────────────────

  "S-B01": {
    explanation_strategy: "distribution",
    target_audience: ["student"],
    query_labels: ["performance_summary"],
    analysis_context: { granularity: "semester", aggregation_level: "student" },
  },

  "S-B02": {
    explanation_strategy: "risk",
    target_audience: ["student"],
    query_labels: ["risk_summary"],
    analysis_context: { granularity: "semester", aggregation_level: "student" },
  },

  "S-B03": {
    explanation_strategy: "behavioral",
    target_audience: ["student"],
    query_labels: ["engagement_summary"],
    analysis_context: { granularity: "semester", aggregation_level: "student" },
  },

  // ── STUDENT TREND / ANALYSIS ───────────────────────────────────────────────

  "S-T00": {
    explanation_strategy: "correlation",
    target_audience: ["student"],
    query_labels: ["regression_data"],
    analysis_context: { granularity: "semester", aggregation_level: "student" },
  },

  "S-T01": {
    explanation_strategy: "trend",
    target_audience: ["student"],
    query_labels: ["score_trend"],
    analysis_context: { granularity: "per_assessment", aggregation_level: "student" },
  },

  "S-T02": {
    explanation_strategy: "distribution",
    target_audience: ["student"],
    query_labels: ["competency_scores"],
    analysis_context: { granularity: "per_assessment", aggregation_level: "student" },
  },

  "S-T03": {
    explanation_strategy: "comparison",
    target_audience: ["student"],
    query_labels: ["peer_comparison"],
    analysis_context: { granularity: "semester", aggregation_level: "student" },
  },

  "S-T04": {
    explanation_strategy: "risk",
    target_audience: ["student"],
    query_labels: ["risk_flags"],
    analysis_context: { granularity: "semester", aggregation_level: "student" },
  },

  "S-T05": {
    explanation_strategy: "behavioral",
    target_audience: ["student"],
    query_labels: ["weekly_engagement"],
    analysis_context: { granularity: "weekly", aggregation_level: "student" },
  },

  "S-T06": {
    explanation_strategy: "behavioral",
    target_audience: ["student"],
    query_labels: ["consistency_data"],
    analysis_context: { granularity: "weekly", aggregation_level: "student" },
  },

  "S-T07": {
    explanation_strategy: "correlation",
    target_audience: ["student"],
    // Multi-query: Part 1 = absence data, Part 2 = score series
    query_labels: ["absence_data", "score_series"],
    analysis_context: { granularity: "per_assessment", aggregation_level: "student" },
  },

  "S-T08": {
    explanation_strategy: "behavioral",
    target_audience: ["student"],
    query_labels: ["submission_lateness"],
    analysis_context: { granularity: "per_assessment", aggregation_level: "student" },
  },

  "S-T09": {
    explanation_strategy: "correlation",
    target_audience: ["student"],
    // Multi-query: lifestyle factors + avg_score
    query_labels: ["lifestyle_factors", "avg_score"],
    analysis_context: { granularity: "semester", aggregation_level: "student" },
  },

  "S-T10": {
    explanation_strategy: "behavioral",
    target_audience: ["student"],
    query_labels: ["resource_usage"],
    analysis_context: { granularity: "semester", aggregation_level: "student" },
  },

  "S-T11": {
    explanation_strategy: "correlation",
    target_audience: ["student"],
    // Multi-query: registration timing + avg_score
    query_labels: ["registration_data", "avg_score"],
    analysis_context: { granularity: "semester", aggregation_level: "student" },
  },

  "S-T12": {
    explanation_strategy: "behavioral",
    target_audience: ["student"],
    // Multi-query: per-submission series + summary stats
    query_labels: ["submission_series", "punctuality_summary"],
    analysis_context: { granularity: "per_assessment", aggregation_level: "student" },
  },

  "S-T13": {
    explanation_strategy: "risk",
    target_audience: ["student"],
    query_labels: ["synthesis_data"],
    analysis_context: { granularity: "semester", aggregation_level: "student" },
  },

  "S-T14": {
    explanation_strategy: "correlation",
    target_audience: ["student"],
    // Multi-query: social scores + avg_score
    query_labels: ["social_factors", "avg_score"],
    analysis_context: { granularity: "semester", aggregation_level: "student" },
  },

  "S-T15": {
    explanation_strategy: "correlation",
    target_audience: ["student"],
    // Multi-query: family scores + avg_score
    query_labels: ["family_factors", "avg_score"],
    analysis_context: { granularity: "semester", aggregation_level: "student" },
  },

  // ── ADMIN BASELINE ────────────────────────────────────────────────────────

  "A-B01": {
    explanation_strategy: "distribution",
    target_audience: ["instructor", "admin"],
    query_labels: ["score_distribution"],
    analysis_context: { granularity: "per_assessment", aggregation_level: "cohort" },
  },

  "A-B02": {
    explanation_strategy: "distribution",
    target_audience: ["instructor", "admin"],
    query_labels: ["outcome_counts"],
    analysis_context: { granularity: "semester", aggregation_level: "cohort" },
  },

  "A-B03": {
    explanation_strategy: "distribution",
    target_audience: ["instructor", "admin"],
    query_labels: ["engagement_distribution"],
    analysis_context: { granularity: "semester", aggregation_level: "cohort" },
  },

  "A-B04": {
    explanation_strategy: "risk",
    target_audience: ["instructor", "admin"],
    query_labels: ["risk_overview"],
    analysis_context: { granularity: "semester", aggregation_level: "cohort" },
  },

  // ── ADMIN STUDENT (INDIVIDUAL) ─────────────────────────────────────────────

  "A-S01": {
    explanation_strategy: "distribution",
    target_audience: ["instructor", "academic_advisor"],
    query_labels: ["student_profile"],
    analysis_context: { granularity: "semester", aggregation_level: "instructor" },
  },

  "A-S02": {
    explanation_strategy: "trend",
    target_audience: ["instructor", "academic_advisor"],
    query_labels: ["score_trend"],
    analysis_context: { granularity: "per_assessment", aggregation_level: "instructor" },
  },

  "A-S03": {
    explanation_strategy: "behavioral",
    target_audience: ["instructor", "academic_advisor"],
    query_labels: ["engagement_trajectory"],
    analysis_context: { granularity: "weekly", aggregation_level: "instructor" },
  },

  "A-S04": {
    explanation_strategy: "risk",
    target_audience: ["instructor", "academic_advisor"],
    query_labels: ["risk_flags"],
    analysis_context: { granularity: "semester", aggregation_level: "instructor" },
  },

  "A-S05": {
    explanation_strategy: "distribution",
    target_audience: ["instructor", "academic_advisor"],
    query_labels: ["competency_scores"],
    analysis_context: { granularity: "per_assessment", aggregation_level: "instructor" },
  },

  "A-S06": {
    explanation_strategy: "behavioral",
    target_audience: ["instructor"],
    query_labels: ["submission_lateness"],
    analysis_context: { granularity: "per_assessment", aggregation_level: "instructor" },
  },

  "A-S07": {
    explanation_strategy: "distribution",
    target_audience: ["academic_advisor", "admin"],
    query_labels: ["background_context"],
    analysis_context: { granularity: "semester", aggregation_level: "instructor" },
  },

  "A-S08": {
    explanation_strategy: "risk",
    target_audience: ["academic_advisor", "admin"],
    query_labels: ["synthesis_data"],
    analysis_context: { granularity: "semester", aggregation_level: "instructor" },
  },

  // ── ADMIN COMPARISON (2 STUDENTS) ─────────────────────────────────────────

  "A-C01": {
    explanation_strategy: "comparison",
    target_audience: ["instructor"],
    query_labels: ["trajectory_comparison"],
    analysis_context: { granularity: "per_assessment", aggregation_level: "comparison" },
  },

  "A-C02": {
    explanation_strategy: "comparison",
    target_audience: ["instructor"],
    query_labels: ["engagement_comparison"],
    analysis_context: { granularity: "semester", aggregation_level: "comparison" },
  },

  "A-C03": {
    explanation_strategy: "comparison",
    target_audience: ["instructor", "academic_advisor"],
    query_labels: ["risk_comparison"],
    analysis_context: { granularity: "semester", aggregation_level: "comparison" },
  },

  "A-C04": {
    explanation_strategy: "comparison",
    target_audience: ["instructor", "academic_advisor"],
    query_labels: ["lifestyle_comparison"],
    analysis_context: { granularity: "semester", aggregation_level: "comparison" },
  },

  "A-C05": {
    explanation_strategy: "comparison",
    target_audience: ["academic_advisor"],
    query_labels: ["background_comparison"],
    analysis_context: { granularity: "semester", aggregation_level: "comparison" },
  },

  "A-C06": {
    explanation_strategy: "comparison",
    target_audience: ["instructor"],
    query_labels: ["resource_comparison"],
    analysis_context: { granularity: "semester", aggregation_level: "comparison" },
  },

  // ── ADMIN GROUP / COHORT ───────────────────────────────────────────────────

  "A-G01": {
    explanation_strategy: "behavioral",
    target_audience: ["instructor", "admin"],
    query_labels: ["low_engagement_group"],
    analysis_context: { granularity: "semester", aggregation_level: "cohort" },
  },

  "A-G02": {
    explanation_strategy: "correlation",
    target_audience: ["instructor"],
    query_labels: ["engagement_performance_scatter"],
    analysis_context: { granularity: "semester", aggregation_level: "cohort" },
  },

  "A-G03": {
    explanation_strategy: "risk",
    target_audience: ["instructor", "admin"],
    query_labels: ["at_risk_cohort"],
    analysis_context: { granularity: "semester", aggregation_level: "cohort" },
  },

  "A-G04": {
    explanation_strategy: "distribution",
    target_audience: ["instructor"],
    query_labels: ["assessment_difficulty"],
    analysis_context: { granularity: "per_assessment", aggregation_level: "cohort" },
  },

  "A-G05": {
    explanation_strategy: "behavioral",
    target_audience: ["instructor"],
    query_labels: ["submission_behaviour"],
    analysis_context: { granularity: "per_assessment", aggregation_level: "cohort" },
  },

  "A-G06": {
    explanation_strategy: "correlation",
    target_audience: ["instructor"],
    query_labels: ["activity_effectiveness"],
    analysis_context: { granularity: "semester", aggregation_level: "cohort" },
  },

  "A-G07": {
    explanation_strategy: "correlation",
    target_audience: ["instructor", "academic_advisor"],
    query_labels: ["factor_correlation_matrix"],
    analysis_context: { granularity: "semester", aggregation_level: "cohort" },
  },

  "A-G08": {
    explanation_strategy: "comparison",
    target_audience: ["instructor", "academic_advisor"],
    query_labels: ["demographic_performance"],
    analysis_context: { granularity: "cohort_aggregate", aggregation_level: "cohort" },
  },

  "A-G09": {
    explanation_strategy: "correlation",
    target_audience: ["academic_advisor", "admin"],
    query_labels: ["disadvantage_impact"],
    analysis_context: { granularity: "cohort_aggregate", aggregation_level: "cohort" },
  },

  "A-G10": {
    explanation_strategy: "behavioral",
    target_audience: ["instructor"],
    query_labels: ["consistency_distribution"],
    analysis_context: { granularity: "weekly", aggregation_level: "cohort" },
  },

  "A-G11": {
    explanation_strategy: "trend",
    target_audience: ["instructor", "admin"],
    query_labels: ["weekly_drop_detection"],
    analysis_context: { granularity: "weekly", aggregation_level: "cohort" },
  },

  "A-G12": {
    explanation_strategy: "comparison",
    target_audience: ["academic_advisor", "admin"],
    query_labels: ["outcome_by_group"],
    analysis_context: { granularity: "cohort_aggregate", aggregation_level: "cohort" },
  },

  "A-G13": {
    explanation_strategy: "correlation",
    target_audience: ["academic_advisor"],
    query_labels: ["lifestyle_risk_scatter"],
    analysis_context: { granularity: "semester", aggregation_level: "cohort" },
  },

  "A-G14": {
    explanation_strategy: "trend",
    target_audience: ["instructor", "admin"],
    query_labels: ["withdrawal_signal_trend"],
    analysis_context: { granularity: "weekly", aggregation_level: "cohort" },
  },

  "A-G15": {
    explanation_strategy: "ranking",
    target_audience: ["instructor", "admin"],
    query_labels: ["intervention_priority_list"],
    analysis_context: { granularity: "semester", aggregation_level: "cohort" },
  },

  "A-G16": {
    explanation_strategy: "risk",
    target_audience: ["admin"],
    query_labels: ["synthesis_data"],
    analysis_context: { granularity: "cohort_aggregate", aggregation_level: "cohort" },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SEMANTIC ROLES NORMALIZATION MAP
// Re-maps non-contract values from STEP 2 to CONTRACT 1.1 vocabulary
//
// semantic_roles.x allowed: time | category | cohort | student | ranking | assessment
// semantic_roles.y allowed: performance_metric | engagement_metric | behavioral_metric
//                           | risk_metric | count_metric | ratio_metric
// ─────────────────────────────────────────────────────────────────────────────

const SEMANTIC_ROLE_X_MAP = {
  // Already valid — pass through
  time: "time",
  category: "category",
  cohort: "cohort",
  student: "student",
  ranking: "ranking",
  assessment: "assessment",
  // Non-contract values → remap
  student_id: "student",
  demographic_group: "category",
  demographic_metric: "category",
  lifestyle_metric: "category",
  risk_metric: "category",
  risk_level: "category",        // categorical risk label used as grouping axis
  engagement_metric: "category",
  performance_metric: "category", // used as histogram bin axis → categorical context
  time_delta: "assessment",      // delay is per-assessment context
};

const SEMANTIC_ROLE_Y_MAP = {
  // Already valid — pass through
  performance_metric: "performance_metric",
  engagement_metric: "engagement_metric",
  behavioral_metric: "behavioral_metric",
  risk_metric: "risk_metric",
  count_metric: "count_metric",
  ratio_metric: "ratio_metric",
  // Non-contract values → remap
  count: "count_metric",
  percentage: "ratio_metric",
  risk_level: "risk_metric",
  deviation_metric: "performance_metric",   // score vs cohort → performance context
  correlation_metric: "performance_metric", // correlation with avg_score → performance
  demographic_metric: "risk_metric",
  lifestyle_metric: "behavioral_metric",
  time_delta: "behavioral_metric",          // submission delay = behavioral
  boolean_flag: "risk_metric",
  rolling_average: "engagement_metric",
  outcome_category: "ratio_metric",
  // color field may use x-enum values (category groupings) — keep as-is
  category: "category",                     // passthrough for color=category
};

// ─────────────────────────────────────────────────────────────────────────────
// INJECT
// ─────────────────────────────────────────────────────────────────────────────

const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));

let injected = 0;
let normalized = 0;
let skipped = 0;

for (const task of registry) {
  const meta = AI_META_MAP[task.taskId];
  if (!meta) {
    console.warn(`⚠️  No AI meta for ${task.taskId} — skipped`);
    skipped++;
    continue;
  }

  // Inject AI metadata fields
  task.explanation_strategy = meta.explanation_strategy;
  task.target_audience = meta.target_audience;
  task.query_labels = meta.query_labels;
  task.analysis_context = meta.analysis_context;

  // Normalize semantic_roles (may have been set by STEP 2 with non-contract values)
  if (task.visualization_config?.semantic_roles) {
    const sr = task.visualization_config.semantic_roles;

    const origX = sr.x;
    const origY = sr.y;
    const origColor = sr.color;

    sr.x = SEMANTIC_ROLE_X_MAP[sr.x] ?? sr.x;
    sr.y = SEMANTIC_ROLE_Y_MAP[sr.y] ?? sr.y;

    // color role: normalize to y-enum or remove (not part of CONTRACT)
    if (sr.color !== undefined) {
      sr.color = SEMANTIC_ROLE_Y_MAP[sr.color] ?? SEMANTIC_ROLE_X_MAP[sr.color] ?? sr.color;
    }

    if (sr.x !== origX || sr.y !== origY || sr.color !== origColor) {
      normalized++;
      // Verbose log for traceability
      if (sr.x !== origX)
        console.log(
          `  [${task.taskId}] semantic_roles.x: "${origX}" → "${sr.x}"`
        );
      if (sr.y !== origY)
        console.log(
          `  [${task.taskId}] semantic_roles.y: "${origY}" → "${sr.y}"`
        );
      if (sr.color !== origColor && origColor !== undefined)
        console.log(
          `  [${task.taskId}] semantic_roles.color: "${origColor}" → "${sr.color}"`
        );
    }
  }

  injected++;
}

writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2), "utf8");

console.log(`\n✅ Done: ${injected} tasks injected`);
console.log(`🔧 Normalized semantic_roles: ${normalized} tasks`);
console.log(`⚠️  Skipped: ${skipped} tasks`);
console.log(`📄 Written to: ${REGISTRY_PATH}`);
