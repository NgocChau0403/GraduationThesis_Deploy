import {
  createAdapterDiagnostics,
  finalizeDiagnostics,
  toFiniteNumber,
} from "./adapterPolicy.js";

export function adapt(rawData, config = {}) {
  const diag = createAdapterDiagnostics({
    chartType: "card",
    selectedDatasetLabel: config.__selected_dataset_label || null,
  });

  if (!Array.isArray(rawData) || rawData.length === 0) {
    return { type: "card_list", items: [], meta: finalizeDiagnostics(diag) };
  }

  diag.input_rows = rawData.length;
  const aggregateRow = rawData[0];
  diag.valid_rows = 1;

  if (config?.variant === "risk_status") {
    const riskStatus = adaptRiskStatusCard(aggregateRow, diag);
    return { ...riskStatus, meta: finalizeDiagnostics(diag) };
  }

  const items = Object.entries(aggregateRow).map(([key, value]) => ({
    key,
    label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    value,
  }));
  return {
    type: "card_list",
    items,
    meta: finalizeDiagnostics(diag),
  };
}

function adaptRiskStatusCard(row, diag) {
  const riskLabel = normalizeRiskLabel(row.at_risk_label);
  const riskScore = toFiniteNumber(row.at_risk_score);
  if (riskScore === null && row.at_risk_score !== 0) {
    diag.warnings.push('Missing/invalid "at_risk_score"; displaying as unknown.');
  }

  const metricOrder = [
    "avg_score",
    "engagement_score",
    "punctuality_rate",
    "previous_attempt_count",
    "pass_threshold",
    "target_threshold",
  ];

  const metrics = metricOrder
    .filter((key) => row[key] !== undefined && row[key] !== null)
    .map((key) => ({
      key,
      label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      value: row[key],
    }));

  return {
    type: "risk_status",
    riskLabel,
    riskScore,
    metrics,
  };
}

function normalizeRiskLabel(value) {
  const text = String(value ?? "").trim().toLowerCase();
  if (text === "low" || text === "medium" || text === "high") return text;
  return "unknown";
}
