import { useState, useEffect } from "react";

// Tách Component Field ra để dùng nội bộ hoặc export nếu cần
function Field({ label, hint, children }) {
  return (
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-bold text-slate-800">{label}</label>
        {hint ? <p className="mt-1 text-xs text-slate-500 leading-relaxed">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}

export default function UploadPanel({ onFilesChange, loading }) {
  const [files, setFiles] = useState([]);

  // Mỗi khi danh sách file thay đổi, báo cho UploadStep biết
  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Source Files</h3>
        <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
          {files.length > 0 ? `${files.length} ready` : "No files"}
        </div>
      </div>

      <div className="space-y-6">
        {/* Upload Zone */}
        <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-emerald-200 bg-white px-6 py-16 text-center transition-all hover:border-emerald-400 hover:bg-emerald-50/30 hover:shadow-xl hover:shadow-emerald-900/5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div className="mt-6 text-base font-bold text-slate-800">Drop your CSV files here</div>
          <div className="mt-1 text-sm text-slate-500">or click to browse your computer</div>
          <input
            type="file"
            multiple
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* File List */}
        {files.length > 0 && (
          <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {files.map((file) => (
              <div
                key={`${file.name}-${file.size}`}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-hover hover:border-emerald-200"
              >
                <div className="flex items-center gap-3 truncate">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="truncate text-sm font-bold text-slate-700">{file.name}</span>
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">CSV Document</span>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}