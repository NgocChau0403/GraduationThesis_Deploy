import { adapt } from "../src/chartAdapters/checklist.adapter.js";

const RAW_ROWS = [
  {
    flag_name: "flag_low_score",
    flag_value: 8.2,
    threshold: 10,
    triggered: true,
    severity: "high",
    flag_description: "Average score is below pass threshold.",
    recommended_action: "Review core concepts with tutor support.",
    support_category: "academic_performance"
  },
  {
    flag_name: "flag_low_engagement",
    flag_value: 0.12,
    threshold: 0.15,
    triggered: true,
    severity: "medium",
    flag_description: "Engagement score is below threshold.",
    recommended_action: "Set a weekly study routine.",
    support_category: "engagement"
  },
  {
    flag_name: "flag_neg_trend",
    flag_value: -1.4,
    threshold: 0,
    triggered: false,
    severity: "info",
    flag_description: "Trend currently stable.",
    recommended_action: "Continue monitoring trend.",
    support_category: "trend_monitoring"
  }
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const result = adapt(RAW_ROWS, { variant: "risk_flags" });

assert(result && typeof result === "object", "Expected checklist model object.");
assert(Array.isArray(result.items), "Expected items array.");
assert(result.items.length === RAW_ROWS.length, "Item length mismatch.");
assert(result.summary?.triggered === 2, "Triggered count mismatch.");
assert(result.summary?.total === 3, "Summary total mismatch.");
assert(result.summary?.highestSeverity === "high", "Highest severity mismatch.");

const first = result.items[0];
assert(first.flagName === "flag_low_score", "First flag mapping mismatch.");
assert(first.triggered === true, "Triggered mapping mismatch.");
assert(first.recommendedAction.includes("tutor"), "Recommended action mapping mismatch.");

const unknownSeverity = adapt([
  {
    ...RAW_ROWS[0],
    severity: "critical"
  }
]);
assert(unknownSeverity.items[0].severity === "info", "Unknown severity should fallback to info.");

console.log(JSON.stringify({
  success: true,
  summary: result.summary
}, null, 2));
