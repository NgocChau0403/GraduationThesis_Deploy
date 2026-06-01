import {
  createAdapterDiagnostics,
  finalizeDiagnostics,
  isMissingValue,
  registerMissingField,
} from "./adapterPolicy.js";

export function adapt(rawData, config = {}) {
  const diag = createAdapterDiagnostics({
    chartType: "checklist",
    selectedDatasetLabel: config.__selected_dataset_label || null,
  });

  if (!Array.isArray(rawData) || rawData.length === 0) {
    return { items: [], summary: null, meta: finalizeDiagnostics(diag) };
  }

  diag.input_rows = rawData.length;
  const items = [];

  rawData.forEach((row, index) => {
    const flagName = row?.flag_name;
    if (isMissingValue(flagName)) {
      registerMissingField(diag, "flag_name");
      diag.warnings.push("Checklist row skipped: missing flag_name.");
      return;
    }

    items.push({
      id: `${String(flagName)}-${index}`,
      flagName: String(flagName),
      currentValue: row.flag_value,
      threshold: row.threshold,
      triggered: Boolean(row.triggered),
      severity: normalizeSeverity(row.severity),
      description: String(row.flag_description ?? ""),
      recommendedAction: String(row.recommended_action ?? ""),
      supportCategory: String(row.support_category ?? "general"),
    });
  });

  diag.valid_rows = items.length;
  const triggeredCount = items.filter((item) => item.triggered).length;
  const highestSeverity = getHighestSeverity(items);

  return {
    items,
    summary: {
      total: items.length,
      triggered: triggeredCount,
      highestSeverity,
    },
    meta: finalizeDiagnostics(diag),
  };
}

function normalizeSeverity(value) {
  const text = String(value ?? "").trim().toLowerCase();
  if (text === "high" || text === "medium" || text === "low" || text === "info") {
    return text;
  }
  return "info";
}

function getHighestSeverity(items) {
  const rank = { high: 4, medium: 3, low: 2, info: 1 };
  return items.reduce((best, item) => {
    return rank[item.severity] > rank[best] ? item.severity : best;
  }, "info");
}
