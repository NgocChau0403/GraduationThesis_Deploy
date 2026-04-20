// --- SUB-COMPONENT FOR STATS ---
function SummaryCard({ label, value, isHighlight = false }) {
  return (
    <div className={`rounded-2xl border p-4 transition-all hover:shadow-md ${
      isHighlight ? "border-emerald-200 bg-emerald-50/50" : "border-slate-100 bg-white"
    }`}>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</div>
      <div className={`mt-2 text-xl font-black ${isHighlight ? "text-emerald-600" : "text-slate-900"}`}>
        {value ?? "-"}
      </div>
    </div>
  );
}

function renderCountBlock(title, data) {
  if (!data || typeof data !== "object" || Object.keys(data).length === 0) return null;

  return (
    <div className="rounded-3xl border border-slate-100 bg-slate-50/30 p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <div className="text-xs font-black uppercase tracking-[0.15em] text-slate-800">{title}</div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Object.entries(data).map(([key, value]) => (
          <SummaryCard key={key} label={key.replace(/_/g, ' ')} value={String(value)} />
        ))}
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function ResultPanel({ result }) {
  if (!result) return null;

  const payload = result?.result || result;
  const nested = payload?.result || payload;
  const isSuccess = result?.success;

  return (
    <section className="rounded-[32px] border border-emerald-100 bg-white p-8 shadow-2xl shadow-emerald-900/10 animate-in zoom-in-95 duration-500">
      {/* HEADER WITH STATUS */}
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
            isSuccess ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
          }`}>
            {isSuccess ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">7. Pipeline Execution Results</h2>
            <p className="text-sm font-medium text-slate-500">Comprehensive summary of the data integration process.</p>
          </div>
        </div>

        <div className={`rounded-full px-6 py-2 text-xs font-black uppercase tracking-[0.2em] shadow-sm border ${
          isSuccess ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-red-200 bg-red-50 text-red-600"
        }`}>
          {isSuccess ? "Pipeline Success" : "Pipeline Failed"}
        </div>
      </div>

      {/* CORE INFO GRID */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard label="Execution ID" value={result?.sessionId?.slice(0, 8) + '...'} isHighlight />
        <SummaryCard label="Mode" value={result?.bundleMode ? "BUNDLE IMPORT" : "SINGLE FILE"} />
        <SummaryCard label="Origin / Scope" value={payload?.fileName || "Multi-file Bundle"} />
      </div>

      {/* DETAILED METRICS */}
      <div className="space-y-6">
        {renderCountBlock("Data Transformation Metrics", nested?.transformed_counts)}
        {renderCountBlock("Entity Merging Statistics", nested?.merged_counts)}
        {renderCountBlock("Schema Flat-Table Records", nested?.flat_table_counts)}
        {renderCountBlock("Final Storage Persistence", nested?.saved_counts)}
      </div>

      {/* DEBUG JSON (VIP STYLE) */}
      <details className="mt-10 group">
        <summary className="flex cursor-pointer items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-emerald-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 group-open:rotate-180 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          Technical Log (JSON)
        </summary>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-slate-900 p-6 shadow-inner">
          <pre className="overflow-auto text-[10px] leading-relaxed text-emerald-400 font-mono scrollbar-hide">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      </details>
    </section>
  );
}