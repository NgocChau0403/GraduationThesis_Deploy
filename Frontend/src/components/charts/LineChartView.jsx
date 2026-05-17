/**
 * LineChartView.jsx — Pure Recharts line chart rendering.
 * Receives adapted data only — zero business logic.
 */

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function LineChartView({ data, config }) {
  const { data: chartData, xKey, lines } = data;

  if (!chartData || chartData.length === 0) {
    return <EmptyChart message="No data to display" />;
  }

  return (
    <ResponsiveContainer width="100%" height={380}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 12, fill: "#64748b" }}
          label={config.x_label ? { value: config.x_label, position: "insideBottom", offset: -5, fontSize: 12, fill: "#94a3b8" } : undefined}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#64748b" }}
          label={config.y_label ? { value: config.y_label, angle: -90, position: "insideLeft", fontSize: 12, fill: "#94a3b8" } : undefined}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
        />
        {lines.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {lines.map((line, i) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={2}
            dot={{ r: 4, fill: COLORS[i % COLORS.length] }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

function EmptyChart({ message }) {
  return (
    <div className="flex items-center justify-center h-[380px] text-slate-400 text-sm">
      {message}
    </div>
  );
}
