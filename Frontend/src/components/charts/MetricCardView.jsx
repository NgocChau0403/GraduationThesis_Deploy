/**
 * MetricCardView.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders aggregate single-row metrics as a grid of KPI cards.
 * Receives adapted array of { key, label, value } from card.adapter.js.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { formatCellValue } from "../../utils/responseTransformer";

export default function MetricCardView({ data, config }) {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-[120px] text-slate-400 text-sm">
        No aggregate data to display
      </div>
    );
  }

  if (!Array.isArray(data) && data.type === "risk_status") {
    return <RiskStatusCard card={data} />;
  }

  const items = Array.isArray(data)
    ? data
    : Array.isArray(data?.items)
      ? data.items
      : [];

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-[120px] text-slate-400 text-sm">
        No aggregate data to display
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 pb-4">
      {items.map((metric) => (
        <div 
          key={metric.key}
          className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col justify-center min-w-0"
        >
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 truncate">
            {metric.label}
          </span>
          <MetricValue value={metric.value} />
        </div>
      ))}
    </div>
  );
}

function MetricValue({ value, size = "default" }) {
  if (isNumericMetricValue(value)) {
    const sizeClass = size === "compact" ? "text-xl" : "text-2xl";
    return (
      <span className={`${sizeClass} font-bold text-slate-800 font-mono`}>
        {formatCellValue(value)}
      </span>
    );
  }

  const displayValue = formatCategoricalMetricValue(value);
  return (
    <span
      className="mt-2 block max-w-full min-w-0 rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold leading-snug text-slate-700 whitespace-normal break-words [overflow-wrap:anywhere]"
      title={String(value ?? "")}
    >
      {displayValue}
    </span>
  );
}

function isNumericMetricValue(value) {
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value !== "string") return false;

  const trimmed = value.trim();
  if (!trimmed) return false;

  return /^-?(\d+|\d{1,3}(,\d{3})+)(\.\d+)?%?$/.test(trimmed);
}

function formatCategoricalMetricValue(value) {
  if (value === null || value === undefined) return formatCellValue(value);
  if (typeof value !== "string") return formatCellValue(value);

  const trimmed = value.trim();
  if (!trimmed) return formatCellValue(value);

  const displayLabels = {
    weighted_by_assessment_weight: "Weighted by assessment weight",
    unweighted_average_fallback: "Unweighted average fallback",
    passing_but_below_target: "Passing but below target",
    below_pass_threshold: "Below pass threshold",
    strong_relative_performance: "Strong relative performance",
    on_track: "On track",
  };

  if (displayLabels[trimmed]) return displayLabels[trimmed];

  return trimmed
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function RiskStatusCard({ card }) {
  const badge = getRiskBadge(card.riskLabel);

  return (
    <div className="pt-2 pb-4 space-y-4">
      <div className={`rounded-xl border p-4 sm:p-5 ${badge.panelClass}`}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Current Risk Level
            </p>
            <p className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
              {badge.displayLabel}
            </p>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge.badgeClass}`}>
            {badge.badgeText}
          </span>
        </div>

        <div className="mt-3 text-sm text-slate-700">
          Risk score: <span className="font-semibold">{formatCellValue(card.riskScore)}</span> / 5
        </div>
      </div>

      {Array.isArray(card.metrics) && card.metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {card.metrics.map((metric) => (
            <div
              key={metric.key}
              className="bg-slate-50 rounded-lg p-3 border border-slate-200 flex flex-col gap-1 min-w-0"
            >
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">
                {metric.label}
              </span>
              <MetricValue value={formatRiskMetric(metric)} size="compact" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getRiskBadge(label) {
  const normalized = String(label ?? "").toLowerCase();
  const map = {
    low: {
      displayLabel: "Low",
      badgeText: "LOW RISK",
      panelClass: "bg-emerald-50 border-emerald-200",
      badgeClass: "text-emerald-700 border-emerald-300 bg-emerald-100"
    },
    medium: {
      displayLabel: "Medium",
      badgeText: "MEDIUM RISK",
      panelClass: "bg-amber-50 border-amber-200",
      badgeClass: "text-amber-700 border-amber-300 bg-amber-100"
    },
    high: {
      displayLabel: "High",
      badgeText: "HIGH RISK",
      panelClass: "bg-rose-50 border-rose-200",
      badgeClass: "text-rose-700 border-rose-300 bg-rose-100"
    }
  };

  return map[normalized] ?? {
    displayLabel: "Unknown",
    badgeText: "RISK UNKNOWN",
    panelClass: "bg-slate-50 border-slate-200",
    badgeClass: "text-slate-700 border-slate-300 bg-slate-100"
  };
}

function formatRiskMetric(metric) {
  const value = metric?.value;
  if (typeof value === "number" && Number.isFinite(value)) {
    if (metric.key.endsWith("_rate") && value >= 0 && value <= 1) {
      return `${(value * 100).toFixed(1)}%`;
    }
    return Number.isInteger(value) ? String(value) : value.toFixed(2);
  }
  return formatCellValue(value);
}
