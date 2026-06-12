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
  const commonMeta = buildCommonMeta(config);
  if (variant === "ranked") {
    return adaptRanked(rawData, { x_field, y_field, y_label: config.y_label, diag, commonMeta });
  }
  if ((variant === "grouped" || variant === "stacked") && series_field) {
    return adaptGrouped(rawData, {
      x_field,
      y_field,
      series_field,
      stacked: variant === "stacked",
      diag,
      commonMeta,
    });
  }

  return adaptDefault(rawData, { x_field, y_field, y_label: config.y_label, diag, commonMeta });
}

function adaptDefault(rawData, { x_field, y_field, y_label, diag, commonMeta }) {
  const data = [];
  for (const row of rawData) {
    const rawCategory = row?.[x_field];
    const x = toCategoryValue(rawCategory);
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
    data.push({
      ...row,
      x,
      y,
      __categoryRaw: rawCategory,
      __categoryLabel: formatCategoryValue(x_field, rawCategory, row),
    });
  }

  diag.valid_rows = data.length;
  return {
    data,
    xKey: "x",
    bars: [{ dataKey: "y", name: y_label || y_field }],
    stacked: false,
    ...commonMeta,
    meta: finalizeDiagnostics(diag),
  };
}

function adaptRanked(rawData, { x_field, y_field, y_label, diag, commonMeta }) {
  const base = adaptDefault(rawData, { x_field, y_field, y_label, diag, commonMeta });
  base.data = [...base.data].sort((a, b) => b.y - a.y);
  return base;
}

function adaptGrouped(rawData, { x_field, y_field, series_field, stacked, diag, commonMeta }) {
  const grouped = {};
  const seriesValues = new Set();

  for (const row of rawData) {
    const rawCategory = row?.[x_field];
    const x = toCategoryValue(rawCategory);
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

    if (!grouped[x]) {
      grouped[x] = {
        x,
        [x_field]: rawCategory,
        __categoryRaw: rawCategory,
        __categoryLabel: formatCategoryValue(x_field, rawCategory, row),
      };
    }
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
    ...commonMeta,
    meta: finalizeDiagnostics(diag),
  };
}

function buildCommonMeta(config) {
  return {
    categoryField: config.x_field || null,
    valueField: config.y_field || null,
    categoryLabel: config.x_label || config.x_field || null,
    valueLabel: config.y_label || config.y_field || null,
    valueKind: inferValueKind(config.y_field, config.y_label),
  };
}

function formatCategoryValue(field, value) {
  if (value === null || value === undefined) return "";

  if (field === "assessment_order") {
    const numberValue = Number(value);
    if (Number.isFinite(numberValue)) {
      return `Assessment ${numberValue + 1}`;
    }
    return String(value);
  }

  if (field === "week_number") {
    return `Week ${value}`;
  }

  return String(value);
}

function inferValueKind(field, label) {
  const text = `${field || ""} ${label || ""}`.toLowerCase();
  if (/(^|_)pct($|_)|percent|%/.test(text)) return "percent";
  if (/(^|_)rate($|_)| rate\b/.test(text)) return "rate";
  if (/count|total|number of/.test(text)) return "count";
  if (/score/.test(text)) return "score";
  if (/day|delay/.test(text)) return "days";
  return "number";
}
