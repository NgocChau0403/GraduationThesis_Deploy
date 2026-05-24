import {
  createAdapterDiagnostics,
  finalizeDiagnostics,
  registerMissingField,
  toCategoryValue,
  toFiniteNumber,
} from "./adapterPolicy.js";

export function adapt(rawData, config = {}) {
  const diag = createAdapterDiagnostics({
    chartType: "line_chart",
    selectedDatasetLabel: config.__selected_dataset_label || null,
  });

  if (!Array.isArray(rawData) || rawData.length === 0) {
    return {
      data: [],
      xKey: config.x_field,
      lines: [],
      referenceLines: [],
      meta: finalizeDiagnostics(diag),
    };
  }

  diag.input_rows = rawData.length;

  const { x_field, y_field, series_field, variant } = config;
  const thresholdFields = inferThresholdFields(rawData, config);
  const referenceLines = buildReferenceLines(rawData, thresholdFields);

  if (variant === "multi_series" && series_field) {
    return adaptMultiSeries(rawData, {
      x_field,
      y_field,
      series_field,
      thresholdFields,
      referenceLines,
      diag,
    });
  }

  return adaptSingleSeries(rawData, {
    x_field,
    y_field,
    thresholdFields,
    referenceLines,
    y_label: config.y_label,
    diag,
  });
}

function adaptSingleSeries(
  rawData,
  { x_field, y_field, thresholdFields, referenceLines, y_label, diag }
) {
  const data = [];

  for (const row of rawData) {
    const x = toCategoryValue(row?.[x_field]);
    if (x === null) {
      registerMissingField(diag, x_field);
      diag.warnings.push(`Skipped row: missing x field "${x_field}".`);
      continue;
    }

    const point = { x, y: null };
    const y = toFiniteNumber(row?.[y_field]);
    if (y === null && row?.[y_field] !== 0) {
      registerMissingField(diag, y_field);
    } else {
      point.y = y;
    }

    for (const thresholdField of thresholdFields) {
      const numeric = toFiniteNumber(row?.[thresholdField]);
      if (numeric != null) {
        point[thresholdField] = numeric;
      }
    }

    data.push(point);
  }

  diag.valid_rows = data.length;
  if (diag.missing_field_counts?.[y_field] > 0) {
    diag.warnings.push(
      `Line chart kept ${diag.missing_field_counts[y_field]} null y values as gaps (no fake zero).`
    );
  }

  return {
    data,
    xKey: "x",
    lines: [{ dataKey: "y", name: y_label || y_field }],
    referenceLines,
    meta: finalizeDiagnostics(diag),
  };
}

function adaptMultiSeries(
  rawData,
  { x_field, y_field, series_field, thresholdFields, referenceLines, diag }
) {
  const grouped = {};
  const seriesValues = new Set();

  for (const row of rawData) {
    const x = toCategoryValue(row?.[x_field]);
    const series = toCategoryValue(row?.[series_field]);

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

    if (!grouped[x]) grouped[x] = { x };
    seriesValues.add(series);

    const y = toFiniteNumber(row?.[y_field]);
    if (y === null && row?.[y_field] !== 0) {
      registerMissingField(diag, y_field);
      grouped[x][series] = null;
    } else {
      grouped[x][series] = y;
    }

    for (const thresholdField of thresholdFields) {
      const numeric = toFiniteNumber(row?.[thresholdField]);
      if (numeric != null) {
        grouped[x][thresholdField] = numeric;
      }
    }
  }

  const data = Object.values(grouped);
  diag.valid_rows = data.length;
  if (diag.missing_field_counts?.[y_field] > 0) {
    diag.warnings.push(
      `Line chart kept ${diag.missing_field_counts[y_field]} null y values as gaps (multi-series).`
    );
  }

  return {
    data,
    xKey: "x",
    lines: [...seriesValues].map((s) => ({ dataKey: s, name: s })),
    referenceLines,
    meta: finalizeDiagnostics(diag),
  };
}

function inferThresholdFields(rawData, config) {
  const keys = Object.keys(rawData[0] ?? {});
  const fields = new Set();

  if (typeof config.threshold_field === "string") fields.add(config.threshold_field);
  if (Array.isArray(config.threshold_fields)) {
    for (const f of config.threshold_fields) {
      if (typeof f === "string") fields.add(f);
    }
  }

  for (const key of keys) {
    if (key.toLowerCase().includes("threshold")) fields.add(key);
  }
  return [...fields].filter((field) => keys.includes(field));
}

function buildReferenceLines(rawData, thresholdFields) {
  return thresholdFields
    .map((field) => {
      const value = rawData
        .map((row) => toFiniteNumber(row[field]))
        .find((v) => v != null);
      if (value == null) return null;
      return {
        key: field,
        y: value,
        label: humanize(field),
        stroke: getThresholdColor(field),
      };
    })
    .filter(Boolean);
}

function humanize(text) {
  return String(text)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getThresholdColor(fieldName) {
  const key = String(fieldName).toLowerCase();
  if (key.includes("pass")) return "#ef4444";
  if (key.includes("target")) return "#f59e0b";
  return "#64748b";
}
