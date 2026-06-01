import {
  createAdapterDiagnostics,
  finalizeDiagnostics,
  registerMissingField,
  toCategoryValue,
  toFiniteNumber,
} from "./adapterPolicy.js";

export function adapt(rawData, config = {}) {
  const diag = createAdapterDiagnostics({
    chartType: config.variant === "histogram" ? "histogram" : "bar_chart",
    selectedDatasetLabel: config.__selected_dataset_label || null,
  });

  if (!Array.isArray(rawData) || rawData.length === 0) {
    return {
      data: [],
      xKey: config.x_field,
      bars: [],
      stacked: false,
      meta: finalizeDiagnostics(diag),
    };
  }

  diag.input_rows = rawData.length;

  const { x_field, y_field, series_field, variant } = config;
  if (variant === "ranked") {
    return adaptRanked(rawData, { x_field, y_field, y_label: config.y_label, diag });
  }
  if ((variant === "grouped" || variant === "stacked") && series_field) {
    return adaptGrouped(rawData, {
      x_field,
      y_field,
      series_field,
      stacked: variant === "stacked",
      diag,
    });
  }

  return adaptDefault(rawData, { x_field, y_field, y_label: config.y_label, diag });
}

function adaptDefault(rawData, { x_field, y_field, y_label, diag }) {
  const data = [];
  for (const row of rawData) {
    const x = toCategoryValue(row?.[x_field]);
    const y = toFiniteNumber(row?.[y_field]);
    if (x === null) {
      registerMissingField(diag, x_field);
      diag.warnings.push(`Skipped row: missing x field "${x_field}".`);
      continue;
    }
    if (y === null && row?.[y_field] !== 0) {
      registerMissingField(diag, y_field);
      diag.warnings.push(`Skipped row: missing/invalid y field "${y_field}".`);
      continue;
    }
    data.push({ x, y });
  }

  diag.valid_rows = data.length;
  return {
    data,
    xKey: "x",
    bars: [{ dataKey: "y", name: y_label || y_field }],
    stacked: false,
    meta: finalizeDiagnostics(diag),
  };
}

function adaptRanked(rawData, { x_field, y_field, y_label, diag }) {
  const base = adaptDefault(rawData, { x_field, y_field, y_label, diag });
  base.data = [...base.data].sort((a, b) => b.y - a.y);
  return base;
}

function adaptGrouped(rawData, { x_field, y_field, series_field, stacked, diag }) {
  const grouped = {};
  const seriesValues = new Set();

  for (const row of rawData) {
    const x = toCategoryValue(row?.[x_field]);
    const series = toCategoryValue(row?.[series_field]);
    const y = toFiniteNumber(row?.[y_field]);

    if (x === null) {
      registerMissingField(diag, x_field);
      diag.warnings.push(`Skipped row: missing x field "${x_field}".`);
      continue;
    }
    if (series === null) {
      registerMissingField(diag, series_field);
      diag.warnings.push(`Skipped row: missing series field "${series_field}".`);
      continue;
    }
    if (y === null && row?.[y_field] !== 0) {
      registerMissingField(diag, y_field);
      diag.warnings.push(`Skipped row: missing/invalid y field "${y_field}".`);
      continue;
    }

    if (!grouped[x]) grouped[x] = { x };
    grouped[x][series] = y;
    seriesValues.add(series);
  }

  const data = Object.values(grouped);
  diag.valid_rows = data.length;
  return {
    data,
    xKey: "x",
    bars: [...seriesValues].map((s) => ({ dataKey: s, name: s })),
    stacked,
    meta: finalizeDiagnostics(diag),
  };
}
