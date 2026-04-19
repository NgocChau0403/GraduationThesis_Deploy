export default function ConfirmActions({
  selectedFile,
  validation,
  onConfirmSelected,
  confirming
}) {
  if (!selectedFile) return null;

  const errors = validation?.errors || [];
  const warnings = validation?.warnings || [];
  const confirmed = !!selectedFile.confirmedMappingConfig;

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">5. Confirm mapping</h2>
          <p className="mt-1 text-sm text-slate-500">
            Run strict validation for the selected file before import.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onConfirmSelected(selectedFile)}
          disabled={confirming}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {confirming ? "Confirming..." : "Confirm mapping for this file"}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Selected file</div>
          <div className="mt-1 text-sm font-semibold text-slate-900">{selectedFile.fileName}</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</div>
          <div className={`mt-1 text-sm font-semibold ${confirmed ? "text-emerald-700" : "text-slate-900"}`}>
            {confirmed ? "Confirmed" : "Not confirmed"}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Validation notes</div>
          <div className="mt-1 text-sm font-semibold text-slate-900">
            {errors.length} errors, {warnings.length} warnings
          </div>
        </div>
      </div>
    </section>
  );
}