import {
  createAdapterDiagnostics,
  finalizeDiagnostics,
  registerMissingField,
  toCategoryValue,
  toFiniteNumber,
} from "./adapterPolicy.js";

export function adapt(rawData, config = {}) {
  const diag = createAdapterDiagnostics({
    chartType: "scatter_plot",
    selectedDatasetLabel: config.__selected_dataset_label || null,
  });

  if (!Array.isArray(rawData) || rawData.length === 0) {
    return {
      series: [],
      xKey: config.x_field,
      yKey: config.y_field,
      meta: finalizeDiagnostics(diag),
    };
  }

  diag.input_rows = rawData.length;
  const { x_field, y_field, color_field, variant } = config;
  if (variant === "colored" && color_field) {
    return adaptColored(rawData, { x_field, y_field, color_field, diag });
  }
  return adaptSingle(rawData, { x_field, y_field, diag });
}

function adaptSingle(rawData, { x_field, y_field, diag }) {
  const points = [];
  for (const row of rawData) {
    const x = toFiniteNumber(row?.[x_field]);
    const y = toFiniteNumber(row?.[y_field]);
    if (x === null && row?.[x_field] !== 0) {
      registerMissingField(diag, x_field);
      continue;
    }
    if (y === null && row?.[y_field] !== 0) {
      registerMissingField(diag, y_field);
      continue;
    }
    points.push({ x, y });
  }

  diag.valid_rows = points.length;
  if (points.length === 0 && rawData.length > 0) {
    diag.warnings.push(`No valid scatter points after filtering missing "${x_field}" or "${y_field}".`);
  }
  return {
    series: [{ name: y_field, data: points }],
    xKey: "x",
    yKey: "y",
    meta: finalizeDiagnostics(diag),
  };
}

function adaptColored(rawData, { x_field, y_field, color_field, diag }) {
  const groups = {};
  let validPoints = 0;

  for (const row of rawData) {
    const x = toFiniteNumber(row?.[x_field]);
    const y = toFiniteNumber(row?.[y_field]);
    const label = toCategoryValue(row?.[color_field]) ?? "Unknown";

    if (x === null && row?.[x_field] !== 0) {
      registerMissingField(diag, x_field);
      continue;
    }
    if (y === null && row?.[y_field] !== 0) {
      registerMissingField(diag, y_field);
      continue;
    }

    if (!groups[label]) groups[label] = [];
    groups[label].push({ x, y, label });
    validPoints += 1;
  }

  diag.valid_rows = validPoints;
  if (validPoints === 0 && rawData.length > 0) {
    diag.warnings.push(`No valid scatter points after filtering missing "${x_field}" or "${y_field}".`);
  }
  const series = Object.entries(groups).map(([name, data]) => ({ name, data }));
  return {
    series,
    xKey: "x",
    yKey: "y",
    meta: finalizeDiagnostics(diag),
  };
}
