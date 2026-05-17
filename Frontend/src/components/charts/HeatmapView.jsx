/**
 * HeatmapView.jsx — Custom heatmap rendered as colored grid.
 * Recharts doesn't have native heatmap — we use a styled HTML table with
 * color intensity based on value range (min → max).
 */

export default function HeatmapView({ data, config }) {
  const { rows, cols, cells, min, max } = data;

  if (!cells || cells.length === 0) {
    return (
      <div className="flex items-center justify-center h-[380px] text-slate-400 text-sm">
        No data to display
      </div>
    );
  }

  // Build lookup: { "row|col": value }
  const lookup = {};
  for (const cell of cells) {
    lookup[`${cell.row}|${cell.col}`] = cell.value;
  }

  // Color intensity: 0 → light, 1 → dark emerald
  const getColor = (value) => {
    if (max === min) return "rgba(16, 185, 129, 0.5)";
    const ratio = (value - min) / (max - min);
    const alpha = 0.1 + ratio * 0.8;
    return `rgba(16, 185, 129, ${alpha})`;
  };

  const getTextColor = (value) => {
    if (max === min) return "#065f46";
    const ratio = (value - min) / (max - min);
    return ratio > 0.6 ? "#ffffff" : "#065f46";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-3 py-2 text-[10px] font-semibold text-slate-500 uppercase bg-slate-50 border border-slate-200 sticky left-0 z-10">
              {config.series_field || ""}
            </th>
            {cols.map((col) => (
              <th key={col} className="px-3 py-2 text-[10px] font-semibold text-slate-500 uppercase bg-slate-50 border border-slate-200 text-center min-w-[60px]">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <td className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 sticky left-0 z-10 whitespace-nowrap">
                {row}
              </td>
              {cols.map((col) => {
                const val = lookup[`${row}|${col}`];
                const hasValue = val !== undefined && val !== null;
                return (
                  <td
                    key={col}
                    className="px-3 py-2 text-xs font-mono text-center border border-slate-200 transition-colors"
                    style={hasValue ? {
                      backgroundColor: getColor(val),
                      color: getTextColor(val),
                      fontWeight: 600,
                    } : { color: "#cbd5e1" }}
                  >
                    {hasValue ? (Number.isInteger(val) ? val : val.toFixed(1)) : "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
