import { useMemo, useState } from "react";
import {
  CANONICAL_FIELD_OPTIONS,
  TRANSFORM_OPTIONS,
  ENTITY_SCOPE_OPTIONS,
  STATUS_OPTIONS
} from "../../config/mappingOptions";

// --- HELPERS ---
function countByStatus(rows) {
  return {
    total: rows.length,
    confirmed: rows.filter((r) => r.status === "confirmed").length,
    needsReview: rows.filter((r) => r.status === "needs_review").length,
    ignored: rows.filter((r) => r.status === "ignored").length
  };
}

function Counter({ label, value, tone = "default" }) {
  const toneMap = {
    default: "bg-slate-50 border-slate-100 text-slate-900",
    success: "bg-emerald-50 border-emerald-100 text-emerald-700",
    warning: "bg-amber-50 border-amber-100 text-amber-700",
    muted: "bg-white border-slate-100 text-slate-400"
  };

  return (
    <div className={`rounded-2xl border p-4 transition-all hover:shadow-md ${toneMap[tone]}`}>
      <div className="text-[10px] font-black uppercase tracking-[0.15em] opacity-70">{label}</div>
      <div className="mt-1 text-2xl font-black">{value}</div>
    </div>
  );
}

function ValidationPanel({ validation }) {
  if (!validation) return null;

  const isValid = validation.isValid ?? false;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-500">
      <div className={`rounded-2xl border px-5 py-3 flex items-center gap-3 ${
        isValid ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"
      }`}>
        <div className={`h-2 w-2 rounded-full ${isValid ? "bg-emerald-500" : "bg-red-500 animate-pulse"}`} />
        <div className="text-sm font-bold uppercase tracking-wide">
          Validation Status: {isValid ? "Passed" : "Failed"}
        </div>
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
// ✅ Nhận thêm prop onClearRowError từ parent
export default function MappingEditor({ file, onChangeEditableConfig, onClearRowError }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const config = file?.editableMappingConfig || {};
  const rows = config.field_mappings || [];
  const statusCounts = countByStatus(rows);

  const validation = file?.mappingConfirmationResult || null;

  const getRowError = (rowIndex) => {
    const errorList = validation?.errors || [];
    if (errorList.length === 0) return null;

    const rowError = errorList.find(err =>
      typeof err === "string" && err.includes(`field_mappings[${rowIndex}]`)
    );

    if (!rowError) return null;

    let cleanMsg = rowError.split(`field_mappings[${rowIndex}].`)[1] || rowError;

    if (cleanMsg.includes('status must not be "needs_review"')) {
      return "Must be set to CONFIRMED or IGNORED before proceeding.";
    }

    return cleanMsg.replace(/\"/g, "");
  };

  const profilingColumnMap = useMemo(() => {
    const columns = file?.profilingResult?.columns || [];
    return Object.fromEntries(columns.map((col) => [col.raw_column, col]));
  }, [file]);

  const enrichedRows = useMemo(() => {
    return rows.map((row, index) => {
      const primarySourceField =
        Array.isArray(row.source_fields) && row.source_fields.length > 0
          ? row.source_fields[0]
          : null;
      const profilingMeta = primarySourceField ? profilingColumnMap[primarySourceField] : null;
      return {
        ...row,
        _rowIndex: index,
        _displayRawColumn: primarySourceField || "-",
        _displayDetectedType: profilingMeta?.detected_type || "-"
      };
    });
  }, [rows, profilingColumnMap]);

  const filteredRows = useMemo(() => {
    return enrichedRows.filter((row) => {
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !query ||
        String(row._displayRawColumn).toLowerCase().includes(query) ||
        String(row.canonical_field).toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || row.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [enrichedRows, searchTerm, statusFilter]);

  function updateRow(index, patch) {
    const nextRows = rows.map((item, rowIndex) => {
      if (rowIndex !== index) return item;
      let updatedItem = { ...item, ...patch };
      if (updatedItem.status === "ignored") {
        updatedItem = { ...updatedItem, canonical_field: null, transform: "ignore", entity_scope: null };
      } else if (item.status === "ignored" && (patch.status === "confirmed" || patch.status === "suggested")) {
        if (!updatedItem.entity_scope) updatedItem.entity_scope = "student";
        if (updatedItem.transform === "ignore") updatedItem.transform = "direct_copy";
      }
      return updatedItem;
    });

    onChangeEditableConfig(file.fileId, { ...config, field_mappings: nextRows, mapping_status: "draft" });

    // ✅ Chỉ xóa lỗi của dòng vừa sửa, các dòng khác không bị ảnh hưởng
    onClearRowError?.(file.fileId, index);
  }

  if (!file) {
    return (
      <div className="p-10 text-center text-slate-400 font-bold uppercase tracking-widest">
        Select a file to begin review
      </div>
    );
  }

  return (
    <section className="rounded-[32px] border border-emerald-100 bg-white shadow-xl shadow-emerald-900/5 overflow-hidden animate-in fade-in duration-500">
      <div className="border-b border-slate-100 bg-slate-50/30 px-8 py-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            4. Mapping Editor
          </h2>
          <span className="rounded-full bg-emerald-600 px-4 py-1.5 text-[10px] font-black uppercase text-white tracking-widest shadow-sm">
            Source: {file.fileName}
          </span>
        </div>
      </div>

      <div className="space-y-8 p-8">
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <Counter label="Total Fields" value={statusCounts.total} />
          <Counter label="Validated" value={statusCounts.confirmed} tone="success" />
          <Counter label="Pending Review" value={statusCounts.needsReview} tone="warning" />
          <Counter label="Excluded" value={statusCounts.ignored} tone="muted" />
        </div>

        <ValidationPanel validation={validation} />

        <div className="rounded-[24px] border border-slate-100 overflow-hidden shadow-inner bg-slate-50/20">
          <div className="max-h-[600px] overflow-auto">
            <table className="w-full table-fixed border-collapse text-sm">
              <thead className="sticky top-0 z-20 bg-white shadow-md">
                <tr className="text-left text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                  <th className="w-[180px] px-6 py-4">Raw Attribute</th>
                  <th className="w-[200px] px-6 py-4">Canonical Field</th>
                  <th className="w-[140px] px-6 py-4">Scope</th>
                  <th className="w-[160px] px-6 py-4">Transformation</th>
                  <th className="w-[140px] px-6 py-4">Status</th>
                  <th className="w-[80px] px-6 py-4 text-center">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-white">
                {filteredRows.map((row) => {
                  const rowError = getRowError(row._rowIndex);
                  return (
                    <tr
                      key={row._rowIndex}
                      className={`group transition-all hover:bg-emerald-50/30 ${rowError ? "bg-red-50/60" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <div
                          className={`font-black truncate ${rowError ? "text-red-700" : "text-slate-800"}`}
                          title={row._displayRawColumn}
                        >
                          {row._displayRawColumn}
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">
                          {row._displayDetectedType}
                        </div>

                        {rowError && (
                          <div className="mt-2 p-1.5 bg-white/90 border border-red-200 rounded text-[9px] font-black text-red-600 uppercase shadow-sm">
                            <span className="mr-1">⚠️</span>
                            {rowError}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={row.canonical_field || ""}
                          onChange={(e) => updateRow(row._rowIndex, { canonical_field: e.target.value || null })}
                          disabled={row.status === "ignored"}
                          className={`w-full rounded-xl border bg-white px-3 py-2 text-xs font-bold shadow-sm transition outline-none disabled:opacity-40 ${
                            rowError ? "border-red-300 ring-2 ring-red-50" : "border-slate-100 focus:border-emerald-500"
                          }`}
                        >
                          <option value="">-- Unmapped --</option>
                          {CANONICAL_FIELD_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={row.entity_scope || ""}
                          onChange={(e) => updateRow(row._rowIndex, { entity_scope: e.target.value || null })}
                          disabled={row.status === "ignored"}
                          className="w-full rounded-xl border border-slate-100 bg-white px-3 py-2 text-[11px] font-bold outline-none disabled:opacity-40"
                        >
                          <option value="">-- Scope --</option>
                          {ENTITY_SCOPE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={row.transform || "direct_copy"}
                          onChange={(e) => updateRow(row._rowIndex, { transform: e.target.value })}
                          disabled={row.status === "ignored"}
                          className="w-full rounded-xl border border-slate-100 bg-white px-3 py-2 text-[11px] font-bold text-slate-600 outline-none disabled:opacity-40 italic"
                        >
                          {TRANSFORM_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={row.status}
                          onChange={(e) => updateRow(row._rowIndex, { status: e.target.value })}
                          className={`w-full rounded-xl border px-3 py-2 text-[10px] font-black uppercase tracking-wider outline-none shadow-sm transition ${
                            row.status === "confirmed"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : row.status === "needs_review"
                              ? "border-amber-200 bg-amber-50 text-amber-700"
                              : "bg-white"
                          } ${rowError ? "border-red-400 text-red-700 bg-red-50" : ""}`}
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>

                      <td className="px-6 py-4 text-center font-black text-slate-400">
                        {row.confidence ? `${Math.round(row.confidence * 100)}%` : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}