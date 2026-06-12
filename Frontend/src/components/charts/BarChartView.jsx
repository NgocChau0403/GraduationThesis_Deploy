/**
 * BarChartView.jsx — Pure Recharts bar chart rendering.
 * Supports grouped and stacked variants via adapted data.
 */

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LabelList,
} from "recharts";

import { getStableColor } from "../../utils/colorUtils";

export default function BarChartView({ data, config }) {
  const { data: chartData, xKey, bars, stacked, categoryField, valueKind } = data;

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
  const categoryDataKey = resolveCategoryDataKey(chartData, categoryField, xKey);
  const showDataLabels = shouldShowDataLabels({
    chartData,
    bars,
    isHorizontalBar,
    stacked,
  });
  const hasCategoryLabel = Boolean(config.x_label);
  const hasValueLabel = Boolean(config.y_label);
  const leftAxisTitle = isHorizontalBar ? config.x_label : config.y_label;
  const bottomAxisTitle = isHorizontalBar ? config.y_label : config.x_label;
  const showLeftAxisTitle = Boolean(leftAxisTitle);
  const showBottomAxisTitle = Boolean(bottomAxisTitle);
  const chartHeight = hasCategoryLabel || hasValueLabel ? 400 : 380;
  const chartMargin = isHorizontalBar
    ? {
        top: 5,
        right: showDataLabels ? 52 : 20,
        bottom: 10,
        left: 20,
      }
    : {
        top: showDataLabels ? 24 : 5,
        right: 20,
        bottom: 25,
        left: 20,
      };
  const axisTitleStyle = {
    color: "#475569",
    fontSize: 12,
    fontWeight: 600,
    lineHeight: "16px",
  };

  return (
    <div style={{ minHeight: chartHeight + (showBottomAxisTitle ? 22 : 0), width: "100%" }}>
      <div style={{ display: "flex", minHeight: chartHeight, width: "100%", overflow: "visible" }}>
        {showLeftAxisTitle && (
          <div
            aria-hidden="true"
            style={{
              flex: "0 0 24px",
              minHeight: chartHeight,
              overflow: "visible",
              position: "relative",
            }}
          >
            <span
              style={{
                ...axisTitleStyle,
                left: "50%",
                maxWidth: chartHeight - 16,
                overflow: "hidden",
                position: "absolute",
                textOverflow: "ellipsis",
                top: "50%",
                transform: "translate(-50%, -50%) rotate(-90deg)",
                transformOrigin: "center",
                whiteSpace: "nowrap",
              }}
              title={leftAxisTitle}
            >
              {leftAxisTitle}
            </span>
          </div>
        )}
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={chartData}
              layout={rechartsLayout}
              margin={chartMargin}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              {isHorizontalBar ? (
                <>
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <YAxis
                    dataKey={categoryDataKey}
                    type="category"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    width={hasCategoryLabel ? 130 : 120}
                  />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey={categoryDataKey}
                    height={hasCategoryLabel ? 70 : 60}
                    tick={{ fontSize: 11, fill: "#64748b", angle: -25, textAnchor: "end" }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                </>
              )}
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
              formatter={(value, name) => [formatBarValue(value, valueKind), name]}
              labelFormatter={(label) => label}
            />
            {bars.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {bars.map((bar) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                name={bar.name}
                fill={getStableColor(bar.dataKey)}
                stackId={stacked ? "stack" : undefined}
                radius={stacked ? 0 : [4, 4, 0, 0]}
                maxBarSize={50}
              >
                {showDataLabels && (
                  <LabelList
                    dataKey={bar.dataKey}
                    content={(props) => renderBarValueLabel(props, isHorizontalBar, valueKind)}
                  />
                )}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
      {showBottomAxisTitle && (
        <div
          style={{
            ...axisTitleStyle,
            marginTop: 4,
            minHeight: 18,
            textAlign: "center",
          }}
          title={bottomAxisTitle}
        >
          {bottomAxisTitle}
        </div>
      )}
    </div>
  );
}

function shouldShowDataLabels({ chartData, bars, isHorizontalBar, stacked }) {
  if (stacked) return false;
  const seriesCount = bars.length;
  if (seriesCount > 1) return chartData.length * seriesCount <= 16;
  if (isHorizontalBar) return chartData.length <= 20;
  return chartData.length <= 12;
}

function resolveCategoryDataKey(chartData, categoryField, xKey) {
  if (chartData.some((row) => row.__categoryLabel !== undefined)) {
    return "__categoryLabel";
  }
  if (categoryField && chartData.some((row) => row[categoryField] !== undefined)) {
    return categoryField;
  }
  return xKey;
}

function renderBarValueLabel(props, isHorizontalBar, valueKind) {
  const { x, y, width, height, value } = props;
  if (value === null || value === undefined) return null;

  const numericWidth = Number(width);
  const numericHeight = Number(height);
  if (isHorizontalBar && numericWidth < 24) return null;
  if (!isHorizontalBar && numericHeight < 14) return null;

  const text = formatBarValue(value, valueKind);
  if (isHorizontalBar) {
    return (
      <text
        x={Number(x) + numericWidth + 6}
        y={Number(y) + numericHeight / 2}
        dy={4}
        fill="#334155"
        fontSize={11}
        fontWeight={600}
        textAnchor="start"
      >
        {text}
      </text>
    );
  }

  return (
    <text
      x={Number(x) + numericWidth / 2}
      y={Number(y) - 6}
      fill="#334155"
      fontSize={11}
      fontWeight={600}
      textAnchor="middle"
    >
      {text}
    </text>
  );
}

function formatBarValue(value, valueKind = "number") {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return String(value);

  if (valueKind === "count") {
    return formatCompactNumber(Math.round(numeric));
  }

  if (valueKind === "percent") {
    return `${formatDecimal(numeric)}%`;
  }

  if (valueKind === "rate") {
    const percentValue = Math.abs(numeric) <= 1 ? numeric * 100 : numeric;
    return `${formatDecimal(percentValue)}%`;
  }

  if (valueKind === "score" || valueKind === "days") {
    return formatDecimal(numeric);
  }

  return Math.abs(numeric) >= 1000 ? formatCompactNumber(numeric) : formatDecimal(numeric);
}

function formatCompactNumber(value) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${formatDecimal(value / 1_000_000)}M`;
  if (abs >= 1_000) return `${formatDecimal(value / 1_000)}K`;
  return String(value);
}

function formatDecimal(value) {
  return Number(value.toFixed(1)).toString();
}
