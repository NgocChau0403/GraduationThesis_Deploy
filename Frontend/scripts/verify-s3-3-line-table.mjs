import { adapt as adaptLine } from "../src/chartAdapters/line.adapter.js";
import { getSemanticTag } from "../src/utils/tableSemantic.js";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function verifyLineThresholds() {
  const raw = [
    { assessment_order: 1, score_normalized: 62, pass_threshold: 40, target_threshold: 70 },
    { assessment_order: 2, score_normalized: 74, pass_threshold: 40, target_threshold: 70 }
  ];
  const config = {
    x_field: "assessment_order",
    y_field: "score_normalized",
    variant: "default"
  };
  const result = adaptLine(raw, config);

  assert(Array.isArray(result.data) && result.data.length === 2, "Line data mapping failed.");
  assert(Array.isArray(result.referenceLines), "referenceLines must be an array.");
  assert(result.referenceLines.length >= 2, "Expected pass/target threshold reference lines.");
  assert(result.referenceLines.some((r) => r.key === "pass_threshold" && r.y === 40), "Missing pass threshold line.");
  assert(result.referenceLines.some((r) => r.key === "target_threshold" && r.y === 70), "Missing target threshold line.");
}

function verifyLineNoThreshold() {
  const raw = [
    { week: 1, avg_score: 10.5 },
    { week: 2, avg_score: 11.2 }
  ];
  const config = {
    x_field: "week",
    y_field: "avg_score",
    variant: "default"
  };
  const result = adaptLine(raw, config);
  assert(Array.isArray(result.referenceLines) && result.referenceLines.length === 0, "Non-threshold line should not create reference lines.");
}

function verifyTableSemanticTags() {
  const high = getSemanticTag("at_risk_label", "high");
  const low = getSemanticTag("at_risk_label", "low");
  const triggered = getSemanticTag("triggered", true);
  const stable = getSemanticTag("flag_low_score", false);
  const none = getSemanticTag("student_id", "S001");

  assert(high?.className?.includes("rose"), "High risk should map to red semantic class.");
  assert(low?.className?.includes("emerald"), "Low risk should map to green semantic class.");
  assert(triggered?.label === "Triggered", "Triggered boolean label mismatch.");
  assert(stable?.label === "Stable", "Stable boolean label mismatch.");
  assert(none === null, "Non-semantic column should not return semantic tag.");
}

verifyLineThresholds();
verifyLineNoThreshold();
verifyTableSemanticTags();

console.log(JSON.stringify({
  success: true,
  checks: [
    "line_threshold_reference",
    "line_without_threshold",
    "table_semantic_color_tags"
  ]
}, null, 2));
