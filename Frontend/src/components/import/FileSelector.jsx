function statusTone(file) {
  if (file?.confirmedMappingConfig) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  const hasNeedsReview = (file?.editableMappingConfig?.field_mappings || []).some(
    (item) => item.status === "needs_review"
  );

  if (hasNeedsReview) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-600";
}

function statusLabel(file) {
  if (file?.confirmedMappingConfig) return "Confirmed";
  const hasNeedsReview = (file?.editableMappingConfig?.field_mappings || []).some(
    (item) => item.status === "needs_review"
  );
  if (hasNeedsReview) return "Needs review";
  return "Draft";
}

function FileMetaPill({ children }) {
  return (
    <span className="inline-flex rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">
      {children}
    </span>
  );
}

export default function FileSelector({
  files,
  selectedFileId,
  onSelect
}) {
  if (!files.length) return null;

  const confirmedCount = files.filter((file) => !!file.confirmedMappingConfig).length;

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">3. Uploaded files</h2>
        <p className="mt-1 text-sm text-slate-500">
          Select a file to review and confirm its mapping.
        </p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Files</div>
          <div className="mt-1 text-xl font-bold text-slate-900">{files.length}</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Confirmed</div>
          <div className="mt-1 text-xl font-bold text-slate-900">{confirmedCount}</div>
        </div>
      </div>

      <div className="space-y-3">
        {files.map((file) => {
          const isActive = file.fileId === selectedFileId;

          return (
            <button
              key={file.fileId}
              type="button"
              onClick={() => onSelect(file.fileId)}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className={`truncate text-sm font-semibold ${isActive ? "text-white" : "text-slate-900"}`}>
                    {file.fileName}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <FileMetaPill>{file.inferredRole || "unknown role"}</FileMetaPill>
                    <FileMetaPill>{file.inferredDatasetType || "unknown dataset"}</FileMetaPill>
                    <FileMetaPill>
                      Delimiter: {file.delimiterInfo?.delimiter || file.delimiterInfo?.detectedDelimiter || "-"}
                    </FileMetaPill>
                  </div>
                </div>

                <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusTone(file)}`}>
                  {statusLabel(file)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}