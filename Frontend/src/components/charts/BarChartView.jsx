/**
 * BarChartView.jsx — Pure Recharts bar chart rendering.
 * Supports grouped and stacked variants via adapted data.
 */

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

import { getStableColor } from "../../utils/colorUtils";

export default function BarChartView({ data, config }) {
  const { data: chartData, xKey, bars, stacked } = data;

  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[380px] text-slate-400 text-sm">
        No data to display
      </div>
    );
  }

  // config.orientation: "horizontal" means horizontal bars (Recharts layout="vertical")
  // config.orientation: "vertical" means vertical columns (Recharts layout="horizontal")
  const isHorizontalBar = config.orientation === "horizontal";
  const rechartsLayout = isHorizontalBar ? "vertical" : "horizontal";

  return (
    <div style={{ minHeight: 380, width: "100%" }}>
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={chartData}
          layout={rechartsLayout}
          margin={{ top: 5, right: 20, bottom: isHorizontalBar ? 5 : 25, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          {isHorizontalBar ? (
            <>
              <XAxis type="number" tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis dataKey={xKey} type="category" tick={{ fontSize: 11, fill: "#64748b" }} width={120} />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} height={60} tick={{ fontSize: 11, fill: "#64748b", angle: -25, textAnchor: "end" }} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
            </>
          )}
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
        {bars.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {bars.map((bar, i) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            name={bar.name}
            fill={getStableColor(bar.dataKey)}
            stackId={stacked ? "stack" : undefined}
            radius={stacked ? 0 : [4, 4, 0, 0]}
            maxBarSize={50}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}
