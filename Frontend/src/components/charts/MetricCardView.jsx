/**
 * MetricCardView.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders aggregate single-row metrics as a grid of KPI cards.
 * Receives adapted array of { key, label, value } from card.adapter.js.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { formatCellValue } from "../../utils/responseTransformer";

export default function MetricCardView({ data, config }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[120px] text-slate-400 text-sm">
        No aggregate data to display
      </div>
    );
  }

  // Use a responsive grid: 1 col on mobile, up to 3 cols on larger screens
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 pb-4">
      {data.map((metric) => (
        <div 
          key={metric.key}
          className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col justify-center"
        >
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            {metric.label}
          </span>
          <span className="text-2xl font-bold text-slate-800 font-mono">
            {formatCellValue(metric.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
