import { useState } from "react";

function Field({ label, hint, children }) {
  return (
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-semibold text-slate-800">{label}</label>
        {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}

export default function UploadPanel({ onUpload, loading }) {
  const [files, setFiles] = useState([]);
  const [datasetName, setDatasetName] = useState("");
  const [sourceDataset, setSourceDataset] = useState("");

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (files.length === 0) {
      return;
    }

    await onUpload({
      files,
      datasetName,
      sourceDataset
    });
  }

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">1. Upload dataset files</h2>
          <p className="mt-1 text-sm text-slate-500">
            Supports single-file and multi-file import bundles. CSV delimiter detection is handled automatically.
          </p>
        </div>

        <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          {files.length > 0 ? `${files.length} file${files.length > 1 ? "s" : ""} selected` : "No files selected"}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-5">
          <Field
            label="CSV files"
            hint="Choose the raw files you want to profile and map."
          >
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center transition hover:border-slate-300 hover:bg-slate-50">
              <div className="text-sm font-semibold text-slate-800">
                Click to select files
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Multiple CSV files are allowed
              </div>
              <input
                type="file"
                multiple
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </Field>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file) => (
                <div
                  key={`${file.name}-${file.size}`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <span className="truncate font-medium text-slate-800">{file.name}</span>
                  <span className="ml-3 shrink-0 text-xs text-slate-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
          <div className="space-y-4">
            <Field
              label="Dataset name"
              hint="Optional. Leave blank to let the system infer from the uploaded files."
            >
              <input
                type="text"
                value={datasetName}
                onChange={(e) => setDatasetName(e.target.value)}
                placeholder="Example: UCI, OULAD, Custom Batch 01"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </Field>

            <Field
              label="Source dataset"
              hint="Optional. Use this when you want to override the inferred source."
            >
              <input
                type="text"
                value={sourceDataset}
                onChange={(e) => setSourceDataset(e.target.value)}
                placeholder="Example: UCI, OULAD, CUSTOM"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </Field>

            <button
              type="submit"
              disabled={loading || files.length === 0}
              className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Profiling files..." : "Upload & profile"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}