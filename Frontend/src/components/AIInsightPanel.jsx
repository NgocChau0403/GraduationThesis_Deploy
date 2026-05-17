/**
 * AIInsightPanel.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * AI Explanation panel — displays structured AI output.
 *
 * 4 states:
 *   1. Idle     — "Get AI Explanation" button visible
 *   2. Loading  — Skeleton with shimmer animation
 *   3. Success  — Structured output: summary + insights + recommendations + warnings
 *   4. Degraded — Fallback banner when AI service is unavailable
 *
 * Response schema (from phase3_contracts.md CONTRACT 3):
 *   explanation.summary, explanation.insights[], explanation.recommendations[],
 *   explanation.warnings[], confidence.level/reason/based_on[], safety_flags[]
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getAIExplanation } from "../services/analyticsApi";

// ── Severity badge colors ───────────────────────────────────────────────────
const SEVERITY = {
  low:    { bg: "bg-blue-100",    text: "text-blue-700",    dot: "bg-blue-400" },
  medium: { bg: "bg-yellow-100",  text: "text-yellow-700",  dot: "bg-yellow-400" },
  high:   { bg: "bg-red-100",     text: "text-red-700",     dot: "bg-red-400" },
};

const CONFIDENCE = {
  HIGH:   { bg: "bg-emerald-100", text: "text-emerald-700", icon: "🟢" },
  MEDIUM: { bg: "bg-yellow-100",  text: "text-yellow-700",  icon: "🟡" },
  LOW:    { bg: "bg-orange-100",  text: "text-orange-700",  icon: "🟠" },
};

export default function AIInsightPanel({
  taskId,
  executionId,
  datasets,
  meta,
  studentContext,
}) {
  const [aiOutput, setAiOutput] = useState(null);

  const mutation = useMutation({
    mutationFn: (payload) => getAIExplanation(payload),
    onSuccess: (data) => setAiOutput(data),
  });

  const isDegraded = aiOutput?.degraded === true;
  const explanation = aiOutput?.explanation;
  const confidence = aiOutput?.confidence;
  const confStyle = CONFIDENCE[confidence?.level] || {};

  const handleExplain = () => {
    mutation.mutate({ taskId, executionId, datasets, meta, studentContext });
  };

  // ── No data yet ─────────────────────────────────────────────────────────
  if (!taskId || !datasets) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <h4 className="text-sm font-semibold text-slate-700">AI Explanation</h4>
        </div>
        {aiOutput && confidence?.level && (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${confStyle.bg} ${confStyle.text}`}>
            {confStyle.icon} {confidence.level}
          </span>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* ── State: Idle — Show trigger button ──────────────────────────── */}
        {!aiOutput && !mutation.isPending && !mutation.isError && (
          <button
            onClick={handleExplain}
            className="w-full py-2.5 rounded-lg text-sm font-semibold bg-indigo-600 text-white
                       hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm
                       flex items-center justify-center gap-2"
          >
            <span>✨</span> Get AI Explanation
          </button>
        )}

        {/* ── State: Loading — Skeleton ──────────────────────────────────── */}
        {mutation.isPending && <ExplanationSkeleton />}

        {/* ── State: Error ───────────────────────────────────────────────── */}
        {mutation.isError && !aiOutput && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm font-medium text-red-700">AI explanation failed</p>
            <p className="text-xs text-red-500 mt-1">{mutation.error?.message}</p>
            <button
              onClick={handleExplain}
              className="mt-2 text-xs text-red-600 hover:underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* ── State: Degraded — Fallback banner ─────────────────────────── */}
        {isDegraded && (
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">⚠️</span>
              <p className="text-sm font-semibold text-amber-800">AI Service Unavailable</p>
            </div>
            <p className="text-xs text-amber-700">
              AI explanation is temporarily unavailable. Your chart data is still fully accurate — only the narrative explanation is affected.
            </p>
            {explanation?.warnings?.length > 0 && (
              <p className="text-xs text-amber-600 mt-1">{explanation.warnings[0]}</p>
            )}
            <button
              onClick={handleExplain}
              className="mt-2 text-xs text-amber-700 hover:underline font-medium"
            >
              🔄 Try again
            </button>
          </div>
        )}

        {/* ── State: Success — Structured output ────────────────────────── */}
        {explanation && !isDegraded && (
          <>
            {/* Summary */}
            <div className="p-3 rounded-lg bg-slate-50">
              <p className="text-sm text-slate-700 leading-relaxed">{explanation.summary}</p>
            </div>

            {/* Key Insights */}
            {explanation.insights?.length > 0 && (
              <div>
                <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Key Insights
                </h5>
                <div className="space-y-2">
                  {explanation.insights.map((insight, i) => {
                    const sev = SEVERITY[insight.severity] || SEVERITY.medium;
                    return (
                      <div key={i} className={`p-3 rounded-lg border ${sev.bg} border-opacity-50`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${sev.dot}`} />
                          <p className={`text-xs font-semibold ${sev.text}`}>{insight.title}</p>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{insight.description}</p>
                        {/* Evidence items */}
                        {insight.evidence?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {insight.evidence.map((ev, j) => (
                              <span key={j} className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/60 text-slate-500">
                                {ev.metric}: {ev.value} {ev.delta != null ? `(${ev.delta > 0 ? "+" : ""}${ev.delta})` : ""}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Educational Implications */}
            {explanation.educational_implications?.length > 0 && (
              <div>
                <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Educational Implications
                </h5>
                <ul className="space-y-1">
                  {explanation.educational_implications.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-indigo-400 mt-0.5">📚</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {explanation.recommendations?.length > 0 && (
              <div>
                <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Recommendations
                </h5>
                <div className="space-y-2">
                  {explanation.recommendations.map((rec, i) => {
                    const prio = SEVERITY[rec.priority] || SEVERITY.medium;
                    return (
                      <div key={i} className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${prio.bg} ${prio.text}`}>
                            {rec.priority}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium">{rec.action}</p>
                        {rec.rationale && (
                          <p className="text-[10px] text-slate-500 mt-1 italic">{rec.rationale}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Warnings */}
            {explanation.warnings?.length > 0 && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <h5 className="text-xs font-semibold text-amber-700 mb-1">⚠️ Data Warnings</h5>
                {explanation.warnings.map((w, i) => (
                  <p key={i} className="text-xs text-amber-600">{w}</p>
                ))}
              </div>
            )}

            {/* Safety Flags */}
            {aiOutput.safety_flags?.length > 0 && (
              <div className="p-2 rounded-lg bg-red-50 border border-red-200">
                <p className="text-[10px] text-red-600 font-medium">
                  ⛔ Safety flags: {aiOutput.safety_flags.join(", ")}
                </p>
              </div>
            )}

            {/* Confidence reason */}
            {confidence?.reason && (
              <div className="p-2 rounded-lg bg-slate-50 text-[10px] text-slate-500">
                <strong>Confidence:</strong> {confidence.reason}
                {confidence.based_on?.length > 0 && (
                  <span className="ml-1 text-slate-400">
                    ({confidence.based_on.join(", ")})
                  </span>
                )}
              </div>
            )}

            {/* AI Meta footer */}
            {aiOutput.meta && (
              <div className="flex items-center gap-3 text-[9px] text-slate-400 pt-2 border-t border-slate-100">
                {aiOutput.meta.model && <span>Model: {aiOutput.meta.model}</span>}
                {aiOutput.meta.latency_ms && <span>⏱ {aiOutput.meta.latency_ms}ms</span>}
                {aiOutput.meta.token_usage && (
                  <span>{aiOutput.meta.token_usage.total_tokens} tokens</span>
                )}
                {aiOutput.meta.cost_usd != null && (
                  <span>${aiOutput.meta.cost_usd.toFixed(5)}</span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Skeleton Loading ────────────────────────────────────────────────────────
function ExplanationSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 w-3/4 bg-slate-200 rounded" />
      <div className="h-3 w-full bg-slate-200 rounded" />
      <div className="h-3 w-5/6 bg-slate-200 rounded" />
      <div className="h-16 bg-slate-100 rounded-lg mt-2" />
      <div className="h-12 bg-slate-100 rounded-lg" />
      <div className="flex items-center gap-2 mt-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500" />
        <span className="text-xs text-slate-400">AI is analyzing your data...</span>
      </div>
    </div>
  );
}
