/**
 * bar.adapter.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Adapter: SQL rows → Recharts BarChart format.
 *
 * Supports variants:
 *   - "categorical" / "default" → simple bars
 *   - "grouped"   → multiple bar series per x-value
 *   - "stacked"   → stacked bars
 *   - "ranked"    → sorted descending by y_field
 *   - "histogram" → continuous x bins
 * ─────────────────────────────────────────────────────────────────────────────
 */

export function adapt(rawData, config) {
  if (!rawData || rawData.length === 0) {
    return { data: [], xKey: config.x_field, bars: [], stacked: false };
  }

  const { x_field, y_field, series_field, variant } = config;

  // Ranked: sort descending by y_field
  if (variant === "ranked") {
    const sorted = [...rawData].sort((a, b) => (b[y_field] ?? 0) - (a[y_field] ?? 0));
    return {
      data: sorted,
      xKey: x_field,
      bars: [{ dataKey: y_field, name: config.y_label || y_field }],
      stacked: false,
    };
  }

  // Grouped / Stacked: pivot by series_field
  if ((variant === "grouped" || variant === "stacked") && series_field) {
    const seriesValues = [...new Set(rawData.map((r) => r[series_field]))];
    const grouped = {};

    for (const row of rawData) {
      const xVal = row[x_field];
      if (!grouped[xVal]) grouped[xVal] = { [x_field]: xVal };
      grouped[xVal][row[series_field]] = row[y_field];
    }

    return {
      data: Object.values(grouped),
      xKey: x_field,
      bars: seriesValues.map((s) => ({ dataKey: String(s), name: String(s) })),
      stacked: variant === "stacked",
    };
  }

  // Default / categorical / histogram
  return {
    data: rawData,
    xKey: x_field,
    bars: [{ dataKey: y_field, name: config.y_label || y_field }],
    stacked: false,
  };
}
