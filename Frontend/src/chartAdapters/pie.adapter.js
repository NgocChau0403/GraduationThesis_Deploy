/**
 * pie.adapter.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Adapter: SQL rows → Recharts PieChart format.
 * Enforced: ≤5 categories. Extra slices merged into "Other".
 * ─────────────────────────────────────────────────────────────────────────────
 */

const MAX_SLICES = 5;

export function adapt(rawData, config) {
  if (!rawData || rawData.length === 0) {
    return { data: [] };
  }

  const { x_field, y_field } = config;

  // Sort descending, keep top slices, merge rest into "Other"
  const sorted = [...rawData].sort((a, b) => (b[y_field] ?? 0) - (a[y_field] ?? 0));

  if (sorted.length <= MAX_SLICES) {
    return {
      data: sorted.map((row) => ({
        name: row[x_field] != null ? String(row[x_field]) : "Unknown",
        value: Number(row[y_field]) || 0,
      })),
    };
  }

  const top = sorted.slice(0, MAX_SLICES - 1);
  const rest = sorted.slice(MAX_SLICES - 1);
  const otherValue = rest.reduce((sum, r) => sum + (Number(r[y_field]) || 0), 0);

  return {
    data: [
      ...top.map((row) => ({ name: row[x_field] != null ? String(row[x_field]) : "Unknown", value: Number(row[y_field]) || 0 })),
      { name: "Other", value: otherValue },
    ],
  };
}
