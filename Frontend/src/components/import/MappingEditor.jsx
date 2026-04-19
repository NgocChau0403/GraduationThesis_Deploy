import { useMemo, useState } from "react";
import {
  CANONICAL_FIELD_OPTIONS,
  TRANSFORM_OPTIONS,
  ENTITY_SCOPE_OPTIONS,
  STATUS_OPTIONS
} from "../../config/mappingOptions";

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
    default: "bg-slate-50 border-slate-200 text-slate-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-700",
    warning: "bg-amber-50 border-amber-200 text-amber-700",
    muted: "bg-white border-slate-200 text-slate-600"
  };

  return (
    <div className={`rounded-xl border px-4 py-3 ${toneMap[tone]}`}>
      <div className="text-xs font-semibold uppercase tracking-wide">{label}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
    </div>
  );
}

function ValidationPanel({ validation }) {
  if (!validation) return null;

  const errors = validation.errors || [];
  const warnings = validation.warnings || [];
  const isValid = validation.isValid ?? validation.valid ?? false;

  return (
    <div className="space-y-3">
      <div
        className={`rounded-xl border px-4 py-3 ${
          isValid
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-red-200 bg-red-50 text-red-700"
        }`}
      >
        <div className="text-sm font-semibold">Validation: {String(isValid)}</div>
      </div>

      {errors.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="mb-2 text-sm font-semibold text-red-800">Errors</div>
          <ul className="list-disc space-y-1 pl-5 text-sm text-red-700">
            {errors.map((error, index) => (
              <li key={index}>
                {typeof error === "string"
                  ? error
                  : error?.message || JSON.stringify(error)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="mb-2 text-sm font-semibold text-amber-800">Warnings</div>
          <ul className="list-disc space-y-1 pl-5 text-sm text-amber-700">
            {warnings.map((warning, index) => (
              <li key={index}>
                {typeof warning === "string"
                  ? warning
                  : warning?.message || JSON.stringify(warning)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">4. Mapping editor</h2>
      <p className="mt-2 text-sm text-slate-500">
        Select a file from the left panel to start reviewing mappings.
      </p>
    </section>
  );
}

function renderSample(sampleValues) {
  if (!Array.isArray(sampleValues) || sampleValues.length === 0) {
    return "-";
  }
  return sampleValues.join(", ");
}

function getRowTone(status) {
  if (status === "needs_review") return "bg-amber-50/40";
  if (status === "ignored") return "bg-slate-50/70";
  return "bg-white";
}

function normalizePatchByStatus(currentRow, patch) {
  const nextStatus = patch.status ?? currentRow.status;

  if (nextStatus === "ignored") {
    return {
      ...patch,
      status: "ignored",
      canonical_field: null,
      transform: "ignore",
      entity_scope: null
    };
  }

  const nextPatch = { ...patch };

  if (currentRow.status === "ignored" && nextStatus !== "ignored") {
    if (currentRow.transform === "ignore" && nextPatch.transform === undefined) {
      nextPatch.transform = "";
    }
    if (currentRow.entity_scope === null && nextPatch.entity_scope === undefined) {
      nextPatch.entity_scope = "";
    }
  }

  return nextPatch;
}

export default function MappingEditor({ file, onChangeEditableConfig }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const config = file?.editableMappingConfig || {};
  const rows = config.field_mappings || [];
  const statusCounts = countByStatus(rows);

  const validation =
    file?.mappingConfirmationResult?.validationResult ||
    file?.mappingConfirmationResult ||
    null;

  const profilingColumnMap = useMemo(() => {
    const columns = file?.profilingResult?.columns || [];
    return Object.fromEntries(
      columns.map((col) => [col.raw_column, col])
    );
  }, [file]);

  const enrichedRows = useMemo(() => {
    return rows.map((row, index) => {
      const primarySourceField = Array.isArray(row.source_fields) && row.source_fields.length > 0
        ? row.source_fields[0]
        : null;

      const profilingMeta = primarySourceField
        ? profilingColumnMap[primarySourceField]
        : null;

      return {
        ...row,
        _rowIndex: index,
        _displayRawColumn: primarySourceField || "-",
        _displayDetectedType: profilingMeta?.detected_type || "-",
        _displaySampleValues: profilingMeta?.sample_values || []
      };
    });
  }, [rows, profilingColumnMap]);

  const filteredRows = useMemo(() => {
    return enrichedRows.filter((row) => {
      const query = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !query ||
        String(row._displayRawColumn || "").toLowerCase().includes(query) ||
        String(row.canonical_field || "").toLowerCase().includes(query) ||
        String(row._displayDetectedType || "").toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || row.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enrichedRows, searchTerm, statusFilter]);

  if (!file) {
    return <EmptyState />;
  }

  function updateRow(index, patch) {
    const nextRows = rows.map((item, rowIndex) => {
      if (rowIndex !== index) return item;
      const normalizedPatch = normalizePatchByStatus(item, patch);
      return { ...item, ...normalizedPatch };
    });

    onChangeEditableConfig(file.fileId, {
      ...config,
      field_mappings: nextRows,
      mapping_status: "draft",
      confirmed_at: null
    });
  }

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">4. Mapping editor</h2>
            <p className="mt-1 text-sm text-slate-500">
              Review mapping suggestions, adjust field-level decisions, then confirm the file.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-slate-600">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-medium">
              File: {file.fileName}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-medium">
              Role: {file.inferredRole}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-medium">
              Columns: {rows.length}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <Counter label="Total rows" value={statusCounts.total} />
          <Counter label="Confirmed" value={statusCounts.confirmed} tone="success" />
          <Counter label="Needs review" value={statusCounts.needsReview} tone="warning" />
          <Counter label="Ignored" value={statusCounts.ignored} tone="muted" />
        </div>

        <ValidationPanel validation={validation} />

        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_220px]">
          <input
            type="text"
            placeholder="Search by raw column, type, or canonical field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          >
            <option value="all">All statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="needs_review">Needs review</option>
            <option value="ignored">Ignored</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="max-h-[680px] overflow-auto">
            <table className="min-w-[1480px] w-full table-fixed border-collapse text-sm">
              <thead className="sticky top-0 z-10 bg-slate-50">
                <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="w-[180px] px-4 py-3">Raw column</th>
                  <th className="w-[120px] px-4 py-3">Type</th>
                  <th className="w-[280px] px-4 py-3">Sample</th>
                  <th className="w-[240px] px-4 py-3">Canonical field</th>
                  <th className="w-[220px] px-4 py-3">Transform</th>
                  <th className="w-[160px] px-4 py-3">Scope</th>
                  <th className="w-[150px] px-4 py-3">Status</th>
                  <th className="w-[110px] px-4 py-3">Confidence</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredRows.map((row) => (
                  <tr
                    key={`${row._displayRawColumn}-${row._rowIndex}`}
                    className={getRowTone(row.status)}
                  >
                    <td className="px-4 py-3 align-top">
                      <div className="truncate font-semibold text-slate-900" title={row._displayRawColumn}>
                        {row._displayRawColumn}
                      </div>
                    </td>

                    <td className="px-4 py-3 align-top text-slate-600">
                      <div className="truncate" title={row._displayDetectedType}>
                        {row._displayDetectedType}
                      </div>
                    </td>

                    <td className="px-4 py-3 align-top text-slate-600">
                      <div
                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                        title={renderSample(row._displaySampleValues)}
                      >
                        {renderSample(row._displaySampleValues)}
                      </div>
                    </td>

                    <td className="px-4 py-3 align-top">
                      <select
                        value={row.canonical_field || ""}
                        onChange={(e) =>
                          updateRow(row._rowIndex, {
                            canonical_field: e.target.value || null
                          })
                        }
                        disabled={row.status === "ignored"}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                      >
                        <option value="">-- none --</option>
                        {CANONICAL_FIELD_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3 align-top">
                      <select
                        value={row.transform || ""}
                        onChange={(e) =>
                          updateRow(row._rowIndex, {
                            transform: e.target.value || null
                          })
                        }
                        disabled={row.status === "ignored"}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                      >
                        <option value="">-- none --</option>
                        {TRANSFORM_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3 align-top">
                      <select
                        value={row.entity_scope || ""}
                        onChange={(e) =>
                          updateRow(row._rowIndex, {
                            entity_scope: e.target.value || null
                          })
                        }
                        disabled={row.status === "ignored"}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                      >
                        <option value="">-- none --</option>
                        {ENTITY_SCOPE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3 align-top">
                      <select
                        value={row.status || ""}
                        onChange={(e) => {
                          const nextStatus = e.target.value;

                          if (nextStatus === "ignored") {
                            updateRow(row._rowIndex, {
                              status: "ignored",
                              canonical_field: null,
                              transform: "ignore",
                              entity_scope: null
                            });
                            return;
                          }

                          updateRow(row._rowIndex, {
                            status: nextStatus
                          });
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-4 py-3 align-top font-semibold text-slate-700">
                      {row.confidence ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredRows.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No rows match the current filters.
          </div>
        )}
      </div>
    </section>
  );
}