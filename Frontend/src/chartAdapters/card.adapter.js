/**
 * card.adapter.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Adapter: SQL rows → Metric Card format.
 * 
 * Takes a single aggregate row and transforms it into an array of metric
 * objects { key, label, value } to be rendered as individual KPI cards.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export function adapt(rawData, config) {
  if (!rawData || rawData.length === 0) {
    return [];
  }

  // The card viz_type expects a single aggregate row.
  // We extract all keys from the first row.
  const aggregateRow = rawData[0];
  
  return Object.entries(aggregateRow).map(([key, value]) => ({
    key,
    label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    value
  }));
}
