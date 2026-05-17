/**
 * table.adapter.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Adapter: SQL rows → DataTable format.
 * Simply extracts columns from first row and passes rows through.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export function adapt(rawData, config) {
  if (!rawData || rawData.length === 0) {
    return { columns: [], rows: [] };
  }

  const columns = Object.keys(rawData[0]).map((key) => ({
    key,
    label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

  // Ranked variant: sort descending by y_field
  let rows = rawData;
  if (config.variant === "ranked" && config.y_field) {
    rows = [...rawData].sort((a, b) => (b[config.y_field] ?? 0) - (a[config.y_field] ?? 0));
  }

  return { columns, rows };
}
