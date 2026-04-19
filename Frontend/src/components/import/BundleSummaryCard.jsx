function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-bold text-slate-900">{value ?? "-"}</div>
      {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
    </div>
  );
}

export default function BundleSummaryCard({
  sessionId,
  datasetName,
  sourceDataset,
  bundleSchema,
  uploadedFiles
}) {
  if (!sessionId) return null;

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">2. Bundle summary</h2>
          <p className="mt-1 text-sm text-slate-500">
            High-level information about the current upload session.
          </p>
        </div>

        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          Session: {sessionId}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Dataset name" value={datasetName || "-"} />
        <StatCard label="Source dataset" value={sourceDataset || "-"} />
        <StatCard label="Bundle type" value={bundleSchema?.bundle_type || "-"} />
        <StatCard
          label="Confidence"
          value={bundleSchema?.confidence ?? "-"}
          hint="Bundle schema detection confidence"
        />
        <StatCard
          label="Total files"
          value={uploadedFiles?.length || 0}
        />
      </div>
    </section>
  );
}