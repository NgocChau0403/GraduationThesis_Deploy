// --- SUB-COMPONENT FOR STATS ---
function SummaryCard({ label, value, isHighlight = false }) {
  return (
    <div className={`rounded-2xl border p-4 transition-all hover:shadow-md ${
      isHighlight ? "border-emerald-200 bg-emerald-50/50" : "border-slate-100 bg-white"
    }`}>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</div>
      <div 
        className={`mt-2 text-xl font-black truncate ${isHighlight ? "text-emerald-600" : "text-slate-900"}`}
        title={value ?? "-"}
      >
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
export default function ResultPanel({ result, datasetName, sourceDataset, fileCount, uploadedFiles = [] }) {
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
        <SummaryCard label="Dataset Name" value={datasetName || "Untitled Dataset"} isHighlight />
        <SummaryCard label="Target Schema" value={sourceDataset || "CUSTOM"} />
        <SummaryCard label="Files Imported" value={`${fileCount} File(s)`} />
      </div>

      {/* IMPORTED FILES LIST */}
      {uploadedFiles && uploadedFiles.length > 0 && (
        <div className="mb-8 rounded-3xl border border-slate-100 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-500">
              <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
              <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
            </svg>
            <div className="text-xs font-black uppercase tracking-[0.15em] text-slate-800">Files Processed</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {uploadedFiles.map((file) => (
              <div key={file.fileId || file.fileName || file.name} className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5 border border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-emerald-500">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-bold text-slate-600">{file.fileName || file.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAILED METRICS */}
      <div className="space-y-6">
        {renderCountBlock("Data Transformation Metrics", nested?.transformed_counts)}
        {renderCountBlock("Entity Merging Statistics", nested?.merged_counts)}
        {renderCountBlock("Schema Flat-Table Records", nested?.flat_table_counts)}
        {renderCountBlock("Final Storage Persistence", nested?.saved_counts)}
      </div>


    </section>
  );
}