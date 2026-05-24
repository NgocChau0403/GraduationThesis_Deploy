import { adapt } from "../src/chartAdapters/card.adapter.js";

const BASE_ROW = {
  avg_score: 12.5,
  engagement_score: 0.52,
  punctuality_rate: 0.91,
  previous_attempt_count: 0,
  pass_threshold: 10,
  target_threshold: 14
};

const CASES = [
  { at_risk_label: "low", at_risk_score: 1 },
  { at_risk_label: "medium", at_risk_score: 2 },
  { at_risk_label: "high", at_risk_score: 4 }
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function verifyCase(input) {
  const result = adapt([{ ...BASE_ROW, ...input }], { variant: "risk_status" });
  assert(result && typeof result === "object", "Adapter must return risk_status object.");
  assert(result.type === "risk_status", `Expected type=risk_status, got ${result.type}`);
  assert(result.riskLabel === input.at_risk_label, `Label mismatch for ${input.at_risk_label}`);
  assert(result.riskScore === input.at_risk_score, `Score mismatch for ${input.at_risk_label}`);
  assert(Array.isArray(result.metrics), "Metrics must be an array.");
  assert(result.metrics.length >= 4, `Expected >=4 metrics for ${input.at_risk_label}`);
}

function verifyLegacyMode() {
  const result = adapt([{ kpi_value: 42 }], { variant: "default" });
  assert(Array.isArray(result), "Legacy card mode must return array.");
  assert(result.length === 1, "Legacy card mode expected one metric.");
  assert(result[0].key === "kpi_value", "Legacy metric key mismatch.");
}

for (const c of CASES) {
  verifyCase(c);
}
verifyLegacyMode();

console.log(JSON.stringify({
  success: true,
  verifiedRiskStates: CASES.map((c) => c.at_risk_label),
  legacyMode: "pass"
}, null, 2));
