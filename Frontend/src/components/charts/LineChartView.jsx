/**
 * LineChartView.jsx — Pure Recharts line chart rendering.
 * Receives adapted data only — zero business logic.
 */

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from "recharts";

import { getStableColor } from "../../utils/colorUtils";

export default function LineChartView({ data, config }) {
  const { data: chartData, xKey, lines, referenceLines = [] } = data;

  if (!chartData || chartData.length === 0) {
    return <EmptyChart message="No data to display" />;
  }

  return (
    <div style={{ minHeight: 380, width: "100%" }}>
      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey={xKey}
            height={60}
            tick={{ fontSize: 11, fill: "#64748b", angle: -25, textAnchor: "end" }}
            label={config.x_label ? { value: config.x_label, position: "insideBottom", offset: -15, fontSize: 12, fill: "#94a3b8" } : undefined}
          />
        <YAxis
          tick={{ fontSize: 12, fill: "#64748b" }}
          label={config.y_label ? { value: config.y_label, angle: -90, position: "insideLeft", fontSize: 12, fill: "#94a3b8" } : undefined}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
        />
        {referenceLines.map((line) => (
          <ReferenceLine
            key={line.key}
            y={line.y}
            stroke={line.stroke}
            strokeDasharray="6 4"
            strokeWidth={1.5}
            label={{
              value: line.label,
              position: "right",
              fill: line.stroke,
              fontSize: 11
            }}
          />
        ))}
        {lines.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {lines.map((line, i) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name}
            stroke={getStableColor(line.dataKey)}
            strokeWidth={2}
            dot={{ r: 4, fill: getStableColor(line.dataKey) }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function EmptyChart({ message }) {
  return (
    <div className="flex items-center justify-center h-[380px] text-slate-400 text-sm">
      {message}
    </div>
  );
}
