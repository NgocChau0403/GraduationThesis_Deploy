/**
 * ScatterChartView.jsx — Pure Recharts scatter chart rendering.
 * Supports single and colored (multi-series) scatter.
 */

import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ZAxis,
} from "recharts";

import { getStableColor } from "../../utils/colorUtils";

export default function ScatterChartView({ data, config }) {
  const { series, xKey, yKey } = data;

  if (!series || series.length === 0) {
    return (
      <div className="flex items-center justify-center h-[380px] text-slate-400 text-sm">
        No data to display
      </div>
    );
  }

  return (
    <div style={{ minHeight: 380, width: "100%" }}>
      <ResponsiveContainer width="100%" height={380}>
      <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey={xKey}
          type="number"
          name={config.x_label || config.x_field}
          tick={{ fontSize: 12, fill: "#64748b" }}
          label={config.x_label ? { value: config.x_label, position: "insideBottom", offset: -5, fontSize: 12, fill: "#94a3b8" } : undefined}
        />
        <YAxis
          dataKey={yKey}
          type="number"
          name={config.y_label || config.y_field}
          tick={{ fontSize: 12, fill: "#64748b" }}
          label={config.y_label ? { value: config.y_label, angle: -90, position: "insideLeft", fontSize: 12, fill: "#94a3b8" } : undefined}
        />
        <ZAxis range={[40, 400]} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
        />
        {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {series.map((s, i) => (
          <Scatter
            key={s.name}
            name={s.name}
            data={s.data}
            fill={getStableColor(s.name)}
          />
        ))}
      </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
