import { useMemo, useState } from "react";

export default function RunImportPanel({ sessionId, files, selectedFile, onRun, loading }) {
  const [importBatchId, setImportBatchId] = useState("batch_2026_auto");
  const [chunkSize, setChunkSize] = useState(500);
  const [replaceIfExists, setReplaceIfExists] = useState(true);

  const confirmedFiles = useMemo(() => files.filter((file) => !!file.confirmedMappingConfig), [files]);
  const selectedIsConfirmed = !!selectedFile && !!selectedFile.confirmedMappingConfig;

  return (
    <section className="rounded-[32px] border border-emerald-100 bg-white p-8 shadow-xl shadow-emerald-900/5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">6. Execute Pipeline</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Push confirmed data into the production database.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-2 border border-emerald-100">
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Progress</div>
          <div className="h-2 w-24 overflow-hidden rounded-full bg-emerald-200">
            <div 
              className="h-full bg-emerald-600 transition-all duration-500" 
              style={{ width: `${(confirmedFiles.length / files.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-black text-emerald-700">{confirmedFiles.length}/{files.length} Ready</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Batch Identifier</label>
          <input
            type="text"
            value={importBatchId}
            onChange={(e) => setImportBatchId(e.target.value)}
            className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-sm font-bold outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">Chunk Processing Size</label>
          <input
            type="number"
            value={chunkSize}
            onChange={(e) => setChunkSize(e.target.value)}
            className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-sm font-bold outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          />
        </div>

        <div className="flex items-end">
          <label className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3.5 transition hover:bg-white hover:border-emerald-200">
            <input
              type="checkbox"
              checked={replaceIfExists}
              onChange={(e) => setReplaceIfExists(e.target.checked)}
              className="h-5 w-5 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm font-bold text-slate-700">Overwrite Existing</span>
          </label>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <button
          onClick={() => onRun({ sessionId, fileIds: confirmedFiles.map(f => f.fileId), options: { importBatchId, chunkSize, replaceIfExists } })}
          disabled={loading || confirmedFiles.length === 0}
          className="group relative overflow-hidden rounded-2xl bg-slate-900 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-all hover:bg-slate-800 disabled:opacity-30"
        >
          <div className="relative z-10 flex items-center justify-center gap-3">
            {loading ? "System Processing..." : "Run All Confirmed"}
            {!loading && <span className="text-emerald-400">→</span>}
          </div>
          <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-emerald-600 to-teal-600 transition-transform group-hover:translate-y-0" />
        </button>

        <button
          onClick={() => onRun({ sessionId, fileIds: [selectedFile.fileId], options: { importBatchId, chunkSize, replaceIfExists } })}
          disabled={loading || !selectedIsConfirmed}
          className="rounded-2xl border-2 border-slate-200 bg-white py-4 text-sm font-black uppercase tracking-[0.2em] text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-30"
        >
          Run Selected Only
        </button>
      </div>
    </section>
  );
}