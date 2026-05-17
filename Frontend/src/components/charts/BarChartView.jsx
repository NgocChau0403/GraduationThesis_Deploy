/**
 * BarChartView.jsx — Pure Recharts bar chart rendering.
 * Supports grouped and stacked variants via adapted data.
 */

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function BarChartView({ data, config }) {
  const { data: chartData, xKey, bars, stacked } = data;

  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[380px] text-slate-400 text-sm">
        No data to display
      </div>
    );
  }

  const isHorizontal = config.orientation === "horizontal";

  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart
        data={chartData}
        layout={isHorizontal ? "horizontal" : "vertical"}
        margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        {isHorizontal ? (
          <>
            <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#64748b" }} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
          </>
        ) : (
          <>
            <XAxis type="number" tick={{ fontSize: 12, fill: "#64748b" }} />
            <YAxis dataKey={xKey} type="category" tick={{ fontSize: 11, fill: "#64748b" }} width={100} />
          </>
        )}
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
        {bars.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {bars.map((bar, i) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            name={bar.name}
            fill={COLORS[i % COLORS.length]}
            stackId={stacked ? "stack" : undefined}
            radius={stacked ? 0 : [4, 4, 0, 0]}
            maxBarSize={50}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
