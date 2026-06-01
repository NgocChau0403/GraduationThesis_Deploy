import {
  createAdapterDiagnostics,
  finalizeDiagnostics,
  toFiniteNumber,
} from "./adapterPolicy.js";

export function adapt(rawData, config = {}) {
  const diag = createAdapterDiagnostics({
    chartType: "table",
    selectedDatasetLabel: config.__selected_dataset_label || null,
  });

  if (!Array.isArray(rawData) || rawData.length === 0) {
    return { columns: [], rows: [], meta: finalizeDiagnostics(diag) };
  }

  diag.input_rows = rawData.length;
  const columns = Object.keys(rawData[0]).map((key) => ({
    key,
    label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

  let rows = rawData;
  if (config.variant === "ranked" && config.y_field) {
    rows = [...rawData].sort((a, b) => {
      const av = toFiniteNumber(a?.[config.y_field]);
      const bv = toFiniteNumber(b?.[config.y_field]);
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      return bv - av;
    });
  }

  diag.valid_rows = rows.length;
  return { columns, rows, meta: finalizeDiagnostics(diag) };
}
