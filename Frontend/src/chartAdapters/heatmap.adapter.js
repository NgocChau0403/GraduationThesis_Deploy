/**
 * heatmap.adapter.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Adapter: SQL rows → heatmap cell grid format.
 * Recharts doesn't have native heatmap — we'll render as a colored table grid.
 *
 * Output: { rows: string[], cols: string[], cells: { row, col, value }[], min, max }
 * ─────────────────────────────────────────────────────────────────────────────
 */

export function adapt(rawData, config) {
  if (!rawData || rawData.length === 0) {
    return { rows: [], cols: [], cells: [], min: 0, max: 0 };
  }

  const { x_field, y_field } = config;
  // For heatmap, x_field = column dimension, y_field = value
  // We need a third field for row dimension — use series_field or first non-x,y field
  const allKeys = Object.keys(rawData[0]);
  const valueField = y_field;
  const colField = x_field;
  const rowField = config.series_field || allKeys.find((k) => k !== colField && k !== valueField) || colField;

  const cells = [];
  let min = Infinity;
  let max = -Infinity;

  const rowSet = new Set();
  const colSet = new Set();

  for (const row of rawData) {
    const rv = String(row[rowField] ?? "");
    const cv = String(row[colField] ?? "");
    const val = Number(row[valueField]) || 0;

    rowSet.add(rv);
    colSet.add(cv);
    cells.push({ row: rv, col: cv, value: val });

    if (val < min) min = val;
    if (val > max) max = val;
  }

  return {
    rows: [...rowSet],
    cols: [...colSet].sort((a, b) => (Number(a) || 0) - (Number(b) || 0)),
    cells,
    min: min === Infinity ? 0 : min,
    max: max === -Infinity ? 0 : max,
  };
}
