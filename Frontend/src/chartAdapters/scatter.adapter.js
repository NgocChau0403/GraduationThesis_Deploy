/**
 * scatter.adapter.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Adapter: SQL rows → Recharts ScatterChart format.
 *
 * Supports:
 *   - "default" → single color scatter
 *   - "colored" → scatter colored by color_field (grouped into series)
 * ─────────────────────────────────────────────────────────────────────────────
 */

export function adapt(rawData, config) {
  if (!rawData || rawData.length === 0) {
    return { series: [], xKey: config.x_field, yKey: config.y_field };
  }

  const { x_field, y_field, color_field, variant } = config;

  // Colored: group by color_field
  if (variant === "colored" && color_field) {
    const groups = {};
    for (const row of rawData) {
      const group = String(row[color_field] ?? "Other");
      if (!groups[group]) groups[group] = [];
      groups[group].push({ x: row[x_field], y: row[y_field], label: row[color_field] });
    }

    return {
      series: Object.entries(groups).map(([name, data]) => ({ name, data })),
      xKey: "x",
      yKey: "y",
    };
  }

  // Default: single series
  return {
    series: [{
      name: config.y_label || y_field,
      data: rawData.map((row) => ({ x: row[x_field], y: row[y_field] })),
    }],
    xKey: "x",
    yKey: "y",
  };
}
