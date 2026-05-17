/**
 * line.adapter.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Adapter: SQL rows → Recharts LineChart format.
 *
 * Input:  [{ week_due: 2, avg_score: 74.5 }, ...]
 * Output: { data: [...], xKey, lines: [{ dataKey, name }] }
 *
 * Supports:
 *   - variant: "default"      → single line
 *   - variant: "multi_series" → multiple lines grouped by series_field
 * ─────────────────────────────────────────────────────────────────────────────
 */

export function adapt(rawData, config) {
  if (!rawData || rawData.length === 0) {
    return { data: [], xKey: config.x_field, lines: [] };
  }

  const { x_field, y_field, series_field, variant } = config;

  // Multi-series: pivot data so each series becomes its own dataKey
  if (variant === "multi_series" && series_field) {
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
      lines: seriesValues.map((s) => ({ dataKey: String(s), name: String(s) })),
    };
  }

  // Default: single line
  return {
    data: rawData,
    xKey: x_field,
    lines: [{ dataKey: y_field, name: config.y_label || y_field }],
  };
}
