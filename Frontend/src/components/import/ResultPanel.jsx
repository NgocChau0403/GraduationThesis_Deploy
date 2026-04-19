function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-xl font-bold text-slate-900">{value ?? "-"}</div>
    </div>
  );
}

function renderCountBlock(title, data) {
  if (!data || typeof data !== "object") return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3 text-sm font-semibold text-slate-900">{title}</div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(data).map(([key, value]) => (
          <SummaryCard key={key} label={key} value={String(value)} />
        ))}
      </div>
    </div>
  );
}

export default function ResultPanel({ result }) {
  if (!result) return null;

  const payload = result?.result || result;
  const nested = payload?.result || payload;

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">7. Import result</h2>
          <p className="mt-1 text-sm text-slate-500">
            Summary of the latest pipeline execution.
          </p>
        </div>

        <div className={`rounded-full border px-3 py-1 text-xs font-semibold ${
          result?.success ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"
        }`}>
          {result?.success ? "Success" : "Failed"}
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard label="Session ID" value={result?.sessionId || "-"} />
        <SummaryCard label="Bundle mode" value={String(!!result?.bundleMode)} />
        <SummaryCard label="File / scope" value={payload?.fileName || "Bundle"} />
      </div>

      <div className="space-y-4">
        {renderCountBlock("Transformed counts", nested?.transformed_counts)}
        {renderCountBlock("Merged counts", nested?.merged_counts)}
        {renderCountBlock("Flat table counts", nested?.flat_table_counts)}
        {renderCountBlock("Saved counts", nested?.saved_counts)}
      </div>

      <details className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-800">
          Show raw response JSON
        </summary>
        <pre className="mt-4 overflow-auto rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-700">
          {JSON.stringify(result, null, 2)}
        </pre>
      </details>
    </section>
  );
}