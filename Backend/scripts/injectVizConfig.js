/**
 * injectVizConfig.js
 * Injects visualization_config (with semantic_roles) into all 53 tasks
 * in taskRegistry.json.
 *
 * Run: node scripts/injectVizConfig.js
 * Output: src/config/taskRegistry.json (in-place update)
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_PATH = join(
  __dirname,
  "../src/config/taskRegistry.json"
);

// ─────────────────────────────────────────────────────────────────────────────
// VIZ CONFIG MAP
// Key: taskId → visualization_config object
// Rules used:
//   bar_chart  variants: categorical, grouped, stacked, ranked, histogram
//   line_chart variants: default, multi_series
//   scatter_plot variants: default, colored
//   pie_chart  variants: default (≤5 categories only)
//   heatmap    variants: week_activity, score_matrix
//   table      variants: ranked, default
// ─────────────────────────────────────────────────────────────────────────────
const VIZ_CONFIG_MAP = {

  // ── STUDENT BASELINE ──────────────────────────────────────────────────────

  "S-B01": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "final_outcome",
      y_field: "avg_score",
      series_field: null,
      color_field: "final_outcome",
      orientation: "vertical",
      variant: "categorical",
      x_label: "Outcome",
      y_label: "Average Score",
      semantic_roles: { x: "category", y: "performance_metric" },
    },
  },

  "S-B02": {
    viz_type: "table",
    visualization_config: {
      x_field: null,
      y_field: null,
      series_field: null,
      color_field: "at_risk_label",
      orientation: null,
      variant: "default",
      x_label: null,
      y_label: null,
      semantic_roles: { x: null, y: null, color: "risk_level" },
    },
  },

  "S-B03": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "study_effort_level",
      y_field: "engagement_score",
      series_field: null,
      color_field: "study_effort_level",
      orientation: "vertical",
      variant: "categorical",
      x_label: "Effort Level",
      y_label: "Engagement Score",
      semantic_roles: { x: "category", y: "engagement_metric" },
    },
  },

  // ── STUDENT TREND / ANALYSIS ───────────────────────────────────────────────

  "S-T00": {
    viz_type: "scatter_plot",
    visualization_config: {
      x_field: "engagement_score",
      y_field: "avg_score",
      series_field: null,
      color_field: null,
      orientation: null,
      variant: "default",
      x_label: "Engagement Score",
      y_label: "Predicted Avg Score",
      semantic_roles: { x: "engagement_metric", y: "performance_metric" },
    },
  },

  "S-T01": {
    viz_type: "line_chart",
    visualization_config: {
      x_field: "assessment_order",
      y_field: "score_normalized",
      series_field: null,
      color_field: null,
      orientation: "horizontal",
      variant: "default",
      x_label: "Assessment Order",
      y_label: "Normalized Score",
      semantic_roles: { x: "time", y: "performance_metric" },
    },
  },

  "S-T02": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "competency_tag",
      y_field: "avg_score",
      series_field: null,
      color_field: "competency_tag",
      orientation: "horizontal",
      variant: "ranked",
      x_label: "Competency Tag",
      y_label: "Average Score",
      semantic_roles: { x: "category", y: "performance_metric" },
    },
  },

  "S-T03": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "metric",
      y_field: "value",
      series_field: "dimension",
      color_field: "dimension",
      orientation: "horizontal",
      variant: "grouped",
      x_label: "Metric",
      y_label: "Value (0–100 / 0–1)",
      semantic_roles: { x: "category", y: "performance_metric", series: "dimension" },
    },
  },

  "S-T04": {
    viz_type: "table",
    visualization_config: {
      x_field: "flag_name",
      y_field: "flag_value",
      series_field: null,
      color_field: "triggered",
      orientation: null,
      variant: "default",
      x_label: "Risk Flag",
      y_label: "Current Value",
      semantic_roles: { x: "category", y: "risk_metric", color: "boolean_flag" },
    },
  },

  "S-T05": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "week_number",
      y_field: "weekly_clicks",
      series_field: null,
      color_field: "weekly_engagement_drop",
      orientation: "vertical",
      variant: "categorical",
      x_label: "Week",
      y_label: "Weekly Clicks",
      semantic_roles: { x: "time", y: "engagement_metric", color: "boolean_flag" },
    },
  },

  "S-T06": {
    viz_type: "heatmap",
    visualization_config: {
      x_field: "week_number",
      y_field: "weekly_clicks",
      series_field: null,
      color_field: "consistency_level",
      orientation: "horizontal",
      variant: "week_activity",
      x_label: "Week",
      y_label: "Engagement Intensity",
      semantic_roles: { x: "time", y: "engagement_metric", color: "category" },
    },
  },

  "S-T07": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "assessment_order",
      y_field: "score_normalized",
      series_field: null,
      color_field: null,
      orientation: "vertical",
      variant: "categorical",
      x_label: "Assessment",
      y_label: "Normalized Score",
      semantic_roles: { x: "time", y: "performance_metric" },
    },
  },

  "S-T08": {
    viz_type: "scatter_plot",
    visualization_config: {
      x_field: "submission_delay_days",
      y_field: "score_normalized",
      series_field: null,
      color_field: "pass_flag",
      orientation: null,
      variant: "colored",
      x_label: "Submission Delay (days)",
      y_label: "Normalized Score",
      semantic_roles: { x: "time_delta", y: "performance_metric", color: "boolean_flag" },
    },
  },

  "S-T09": {
    viz_type: "scatter_plot",
    visualization_config: {
      x_field: "lifestyle_risk_score",
      y_field: "avg_score",
      series_field: null,
      color_field: null,
      orientation: null,
      variant: "default",
      x_label: "Lifestyle Risk Score",
      y_label: "Average Score",
      semantic_roles: { x: "risk_metric", y: "performance_metric" },
    },
  },

  "S-T10": {
    viz_type: "pie_chart",
    visualization_config: {
      x_field: "resource_type",
      y_field: "clicks",
      series_field: null,
      color_field: "resource_type",
      orientation: null,
      variant: "default",
      x_label: "Resource Type",
      y_label: "Click Count",
      semantic_roles: { x: "category", y: "engagement_metric" },
    },
  },

  "S-T11": {
    viz_type: "scatter_plot",
    visualization_config: {
      x_field: "registration_lead_time",
      y_field: "avg_score",
      series_field: null,
      color_field: "final_outcome",
      orientation: null,
      variant: "colored",
      x_label: "Registration Lead Time (days)",
      y_label: "Average Score",
      semantic_roles: { x: "time_delta", y: "performance_metric", color: "category" },
    },
  },

  "S-T12": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "assessment_order",
      y_field: "submission_delay_days",
      series_field: null,
      color_field: "pass_flag",
      orientation: "vertical",
      variant: "categorical",
      x_label: "Assessment",
      y_label: "Submission Delay (days)",
      semantic_roles: { x: "time", y: "time_delta", color: "boolean_flag" },
    },
  },

  "S-T13": {
    viz_type: "table",
    visualization_config: {
      x_field: null,
      y_field: null,
      series_field: null,
      color_field: "at_risk_label",
      orientation: null,
      variant: "default",
      x_label: null,
      y_label: null,
      semantic_roles: { x: null, y: null, color: "risk_level" },
    },
  },

  "S-T14": {
    viz_type: "scatter_plot",
    visualization_config: {
      x_field: "social_balance_score",
      y_field: "avg_score",
      series_field: null,
      color_field: null,
      orientation: null,
      variant: "default",
      x_label: "Social Balance Score",
      y_label: "Average Score",
      semantic_roles: { x: "lifestyle_metric", y: "performance_metric" },
    },
  },

  "S-T15": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "family_stability_score",
      y_field: "avg_score",
      series_field: null,
      color_field: null,
      orientation: "vertical",
      variant: "categorical",
      x_label: "Family Stability Score",
      y_label: "Average Score",
      semantic_roles: { x: "demographic_metric", y: "performance_metric" },
    },
  },

  // ── ADMIN BASELINE ────────────────────────────────────────────────────────

  "A-B01": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "score_normalized",
      y_field: "student_count",
      series_field: null,
      color_field: "assessment_type",
      orientation: "vertical",
      variant: "histogram",
      x_label: "Score Range",
      y_label: "Number of Students",
      semantic_roles: { x: "performance_metric", y: "count", color: "category" },
    },
  },

  "A-B02": {
    viz_type: "pie_chart",
    visualization_config: {
      x_field: "final_outcome",
      y_field: "student_count",
      series_field: null,
      color_field: "final_outcome",
      orientation: null,
      variant: "default",
      x_label: "Final Outcome",
      y_label: "Student Count",
      semantic_roles: { x: "category", y: "count" },
    },
  },

  "A-B03": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "study_effort_level",
      y_field: "student_count",
      series_field: null,
      color_field: "study_effort_level",
      orientation: "vertical",
      variant: "categorical",
      x_label: "Effort Level",
      y_label: "Number of Students",
      semantic_roles: { x: "category", y: "count" },
    },
  },

  "A-B04": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "at_risk_label",
      y_field: "student_count",
      series_field: null,
      color_field: "at_risk_label",
      orientation: "vertical",
      variant: "categorical",
      x_label: "Risk Level",
      y_label: "Number of Students",
      semantic_roles: { x: "risk_level", y: "count" },
    },
  },

  // ── ADMIN STUDENT (INDIVIDUAL) ─────────────────────────────────────────────

  "A-S01": {
    viz_type: "table",
    visualization_config: {
      x_field: null,
      y_field: null,
      series_field: null,
      color_field: "at_risk_label",
      orientation: null,
      variant: "default",
      x_label: null,
      y_label: null,
      semantic_roles: { x: null, y: null, color: "risk_level" },
    },
  },

  "A-S02": {
    viz_type: "line_chart",
    visualization_config: {
      x_field: "assessment_order",
      y_field: "score_normalized",
      series_field: null,
      color_field: null,
      orientation: "horizontal",
      variant: "default",
      x_label: "Assessment Order",
      y_label: "Normalized Score",
      semantic_roles: { x: "time", y: "performance_metric" },
    },
  },

  "A-S03": {
    viz_type: "line_chart",
    visualization_config: {
      x_field: "week_number",
      y_field: "weekly_clicks",
      series_field: "rolling_3wk_avg",
      color_field: null,
      orientation: "horizontal",
      variant: "multi_series",
      x_label: "Week",
      y_label: "Engagement Clicks",
      semantic_roles: { x: "time", y: "engagement_metric", series: "rolling_average" },
    },
  },

  "A-S04": {
    viz_type: "table",
    visualization_config: {
      x_field: "flag_name",
      y_field: "flag_value",
      series_field: null,
      color_field: "triggered",
      orientation: null,
      variant: "default",
      x_label: "Risk Flag",
      y_label: "Current Value",
      semantic_roles: { x: "category", y: "risk_metric", color: "boolean_flag" },
    },
  },

  "A-S05": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "competency_tag",
      y_field: "avg_score",
      series_field: null,
      color_field: "competency_tag",
      orientation: "horizontal",
      variant: "ranked",
      x_label: "Competency Tag",
      y_label: "Average Score",
      semantic_roles: { x: "category", y: "performance_metric" },
    },
  },

  "A-S06": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "assessment_order",
      y_field: "submission_delay_days",
      series_field: null,
      color_field: "pass_flag",
      orientation: "vertical",
      variant: "categorical",
      x_label: "Assessment",
      y_label: "Submission Delay (days)",
      semantic_roles: { x: "time", y: "time_delta", color: "boolean_flag" },
    },
  },

  "A-S07": {
    viz_type: "table",
    visualization_config: {
      x_field: null,
      y_field: null,
      series_field: null,
      color_field: "disadvantage_score",
      orientation: null,
      variant: "default",
      x_label: null,
      y_label: null,
      semantic_roles: { x: null, y: null, color: "demographic_metric" },
    },
  },

  "A-S08": {
    viz_type: "table",
    visualization_config: {
      x_field: null,
      y_field: null,
      series_field: null,
      color_field: "at_risk_label",
      orientation: null,
      variant: "default",
      x_label: null,
      y_label: null,
      semantic_roles: { x: null, y: null, color: "risk_level" },
    },
  },

  // ── ADMIN COMPARISON (2 STUDENTS) ─────────────────────────────────────────

  "A-C01": {
    viz_type: "line_chart",
    visualization_config: {
      x_field: "assessment_order",
      y_field: "score_normalized",
      series_field: "student_id",
      color_field: "student_id",
      orientation: "horizontal",
      variant: "multi_series",
      x_label: "Assessment Order",
      y_label: "Normalized Score",
      semantic_roles: { x: "time", y: "performance_metric", series: "student_id" },
    },
  },

  "A-C02": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "student_id",
      y_field: "engagement_score",
      series_field: "metric",
      color_field: "student_id",
      orientation: "vertical",
      variant: "grouped",
      x_label: "Student",
      y_label: "Score (0–1)",
      semantic_roles: { x: "student_id", y: "engagement_metric", series: "metric" },
    },
  },

  "A-C03": {
    viz_type: "table",
    visualization_config: {
      x_field: "student_id",
      y_field: "at_risk_score",
      series_field: null,
      color_field: "at_risk_label",
      orientation: null,
      variant: "default",
      x_label: "Student",
      y_label: "Risk Score",
      semantic_roles: { x: "student_id", y: "risk_metric", color: "risk_level" },
    },
  },

  "A-C04": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "student_id",
      y_field: "lifestyle_risk_score",
      series_field: "lifestyle_dimension",
      color_field: "student_id",
      orientation: "vertical",
      variant: "grouped",
      x_label: "Student",
      y_label: "Lifestyle Score (1–5)",
      semantic_roles: {
        x: "student_id",
        y: "lifestyle_metric",
        series: "lifestyle_dimension",
      },
    },
  },

  "A-C05": {
    viz_type: "table",
    visualization_config: {
      x_field: "student_id",
      y_field: "disadvantage_score",
      series_field: null,
      color_field: "disadvantage_score",
      orientation: null,
      variant: "default",
      x_label: "Student",
      y_label: "Disadvantage Score",
      semantic_roles: { x: "student_id", y: "demographic_metric", color: "demographic_metric" },
    },
  },

  "A-C06": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "resource_type",
      y_field: "pct_of_total",
      series_field: "student_id",
      color_field: "student_id",
      orientation: "vertical",
      variant: "grouped",
      x_label: "Resource Type",
      y_label: "% of Total Clicks",
      semantic_roles: { x: "category", y: "engagement_metric", series: "student_id" },
    },
  },

  // ── ADMIN GROUP / COHORT ───────────────────────────────────────────────────

  "A-G01": {
    viz_type: "scatter_plot",
    visualization_config: {
      x_field: "active_days",
      y_field: "engagement_score",
      series_field: null,
      color_field: "study_effort_level",
      orientation: null,
      variant: "colored",
      x_label: "Active Days",
      y_label: "Engagement Score",
      semantic_roles: { x: "engagement_metric", y: "engagement_metric", color: "category" },
    },
  },

  "A-G02": {
    viz_type: "scatter_plot",
    visualization_config: {
      x_field: "engagement_score",
      y_field: "avg_score",
      series_field: null,
      color_field: "final_outcome",
      orientation: null,
      variant: "colored",
      x_label: "Engagement Score",
      y_label: "Average Score",
      semantic_roles: { x: "engagement_metric", y: "performance_metric", color: "category" },
    },
  },

  "A-G03": {
    viz_type: "table",
    visualization_config: {
      x_field: "student_id",
      y_field: "at_risk_score",
      series_field: null,
      color_field: "at_risk_label",
      orientation: null,
      variant: "ranked",
      x_label: "Student",
      y_label: "Risk Score",
      semantic_roles: { x: "student_id", y: "risk_metric", color: "risk_level" },
    },
  },

  "A-G04": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "assessment_name",
      y_field: "fail_rate_pct",
      series_field: null,
      color_field: "assessment_type",
      orientation: "horizontal",
      variant: "ranked",
      x_label: "Assessment",
      y_label: "Fail Rate (%)",
      semantic_roles: { x: "category", y: "performance_metric", color: "category" },
    },
  },

  "A-G05": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "student_id",
      y_field: "submission_delay_days",
      series_field: "final_outcome",
      color_field: "final_outcome",
      orientation: "vertical",
      variant: "grouped",
      x_label: "Student",
      y_label: "Submission Delay (days)",
      semantic_roles: { x: "student_id", y: "time_delta", color: "category" },
    },
  },

  "A-G06": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "resource_type",
      y_field: "avg_score_by_resource_type",
      series_field: null,
      color_field: "resource_type",
      orientation: "horizontal",
      variant: "ranked",
      x_label: "Resource Type",
      y_label: "Avg Score of Users",
      semantic_roles: { x: "category", y: "performance_metric" },
    },
  },

  "A-G07": {
    viz_type: "heatmap",
    visualization_config: {
      x_field: "feature_name",
      y_field: "correlation_with_avg_score",
      series_field: null,
      color_field: "correlation_with_avg_score",
      orientation: "horizontal",
      variant: "score_matrix",
      x_label: "Feature",
      y_label: "Correlation Coefficient",
      semantic_roles: { x: "category", y: "correlation_metric", color: "correlation_metric" },
    },
  },

  "A-G08": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "group_value",
      y_field: "avg_score",
      series_field: null,
      color_field: "score_vs_cohort",
      orientation: "horizontal",
      variant: "ranked",
      x_label: "Demographic Group",
      y_label: "Average Score",
      semantic_roles: { x: "demographic_group", y: "performance_metric", color: "deviation_metric" },
    },
  },

  "A-G09": {
    viz_type: "scatter_plot",
    visualization_config: {
      x_field: "disadvantage_score",
      y_field: "avg_score",
      series_field: null,
      color_field: "final_outcome",
      orientation: null,
      variant: "colored",
      x_label: "Disadvantage Score",
      y_label: "Average Score",
      semantic_roles: { x: "demographic_metric", y: "performance_metric", color: "category" },
    },
  },

  "A-G10": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "consistency_level",
      y_field: "student_count",
      series_field: null,
      color_field: "consistency_level",
      orientation: "vertical",
      variant: "categorical",
      x_label: "Consistency Level",
      y_label: "Number of Students",
      semantic_roles: { x: "category", y: "count" },
    },
  },

  "A-G11": {
    viz_type: "line_chart",
    visualization_config: {
      x_field: "week_number",
      y_field: "week_total_clicks",
      series_field: "rolling_3wk_avg",
      color_field: "is_drop_week",
      orientation: "horizontal",
      variant: "multi_series",
      x_label: "Week",
      y_label: "Total Clicks",
      semantic_roles: {
        x: "time",
        y: "engagement_metric",
        series: "rolling_average",
        color: "boolean_flag",
      },
    },
  },

  "A-G12": {
    viz_type: "bar_chart",
    visualization_config: {
      x_field: "group_value",
      y_field: "pct_within_group",
      series_field: "final_outcome",
      color_field: "final_outcome",
      orientation: "vertical",
      variant: "stacked",
      x_label: "Demographic Group",
      y_label: "% of Students",
      semantic_roles: { x: "demographic_group", y: "percentage", series: "outcome_category" },
    },
  },

  "A-G13": {
    viz_type: "scatter_plot",
    visualization_config: {
      x_field: "lifestyle_risk_score",
      y_field: "avg_score",
      series_field: null,
      color_field: null,
      orientation: null,
      variant: "default",
      x_label: "Lifestyle Risk Score",
      y_label: "Average Score",
      semantic_roles: { x: "lifestyle_metric", y: "performance_metric" },
    },
  },

  "A-G14": {
    viz_type: "line_chart",
    visualization_config: {
      x_field: "week_number",
      y_field: "avg_clicks",
      series_field: "final_outcome",
      color_field: "final_outcome",
      orientation: "horizontal",
      variant: "multi_series",
      x_label: "Week",
      y_label: "Avg Clicks",
      semantic_roles: { x: "time", y: "engagement_metric", series: "outcome_category" },
    },
  },

  "A-G15": {
    viz_type: "table",
    visualization_config: {
      x_field: "student_id",
      y_field: "at_risk_score",
      series_field: null,
      color_field: "at_risk_label",
      orientation: null,
      variant: "ranked",
      x_label: "Student",
      y_label: "Risk Score",
      semantic_roles: { x: "student_id", y: "risk_metric", color: "risk_level" },
    },
  },

  "A-G16": {
    viz_type: "table",
    visualization_config: {
      x_field: null,
      y_field: null,
      series_field: null,
      color_field: null,
      orientation: null,
      variant: "default",
      x_label: null,
      y_label: null,
      semantic_roles: { x: null, y: null },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// INJECT
// ─────────────────────────────────────────────────────────────────────────────

const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));

let injected = 0;
let skipped = 0;

for (const task of registry) {
  const cfg = VIZ_CONFIG_MAP[task.taskId];
  if (!cfg) {
    console.warn(`⚠️  No config for ${task.taskId} — skipped`);
    skipped++;
    continue;
  }
  task.viz_type = cfg.viz_type;
  task.visualization_config = cfg.visualization_config;
  injected++;
}

writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2), "utf8");

console.log(`\n✅ Done: ${injected} tasks injected, ${skipped} skipped`);
console.log(`📄 Written to: ${REGISTRY_PATH}`);
