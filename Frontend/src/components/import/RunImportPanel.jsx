import { useMemo, useState } from "react";

export default function RunImportPanel({
  sessionId,
  files,
  selectedFile,
  onRun,
  loading
}) {
  const [importBatchId, setImportBatchId] = useState("import_batch_ui_001");
  const [chunkSize, setChunkSize] = useState(200);
  const [replaceIfExists, setReplaceIfExists] = useState(true);

  const confirmedFiles = useMemo(
    () => files.filter((file) => !!file.confirmedMappingConfig),
    [files]
  );

  const selectedIsConfirmed =
    !!selectedFile && !!selectedFile.confirmedMappingConfig;

  async function handleRunAllConfirmed() {
    if (!sessionId || confirmedFiles.length === 0) return;

    await onRun({
      sessionId,
      fileIds: confirmedFiles.map((file) => file.fileId),
      options: {
        importBatchId,
        chunkSize: Number(chunkSize),
        replaceIfExists
      }
    });
  }

  async function handleRunSelectedOnly() {
    if (!sessionId || !selectedFile || !selectedIsConfirmed) return;

    await onRun({
      sessionId,
      fileIds: [selectedFile.fileId],
      options: {
        importBatchId,
        chunkSize: Number(chunkSize),
        replaceIfExists
      }
    });
  }

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">6. Run import</h2>
          <p className="mt-1 text-sm text-slate-500">
            Run the pipeline for all confirmed files or only the currently selected file.
          </p>
        </div>

        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          Confirmed files: {confirmedFiles.length} / {files.length}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr_auto]">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">Import batch ID</label>
          <input
            type="text"
            value={importBatchId}
            onChange={(e) => setImportBatchId(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">Chunk size</label>
          <input
            type="number"
            min="1"
            value={chunkSize}
            onChange={(e) => setChunkSize(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <label className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={replaceIfExists}
            onChange={(e) => setReplaceIfExists(e.target.checked)}
          />
          Replace if exists
        </label>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <button
          type="button"
          onClick={handleRunAllConfirmed}
          disabled={loading || confirmedFiles.length === 0}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Running..." : "Run all confirmed files"}
        </button>

        <button
          type="button"
          onClick={handleRunSelectedOnly}
          disabled={loading || !selectedIsConfirmed}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Run selected file only
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <div>
          <span className="font-semibold text-slate-800">Selected file:</span>{" "}
          {selectedFile ? selectedFile.fileName : "None"}
        </div>
        <div className="mt-1">
          <span className="font-semibold text-slate-800">Selected status:</span>{" "}
          {selectedIsConfirmed ? "Confirmed" : "Not ready to run"}
        </div>
      </div>
    </section>
  );
}