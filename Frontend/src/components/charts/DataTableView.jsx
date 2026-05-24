/**
 * DataTableView.jsx — Styled data table for table viz_type.
 * Receives adapted { columns, rows } from table.adapter.js.
 */

import { formatCellValue } from "../../utils/responseTransformer";
import { getSemanticTag } from "../../utils/tableSemantic";

export default function DataTableView({ data, config }) {
  const { columns, rows } = data;

  if (!rows || rows.length === 0) {
    return (
      <div className="flex items-center justify-center h-[380px] text-slate-400 text-sm">
        No data to display
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-200 rounded-lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="border-b border-slate-100 hover:bg-emerald-50/30 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-2 text-xs text-slate-700 font-mono"
                >
                  {renderCellValue(col.key, row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-400">
        {rows.length} rows
      </div>
    </div>
  );
}

function renderCellValue(columnKey, value) {
  const semantic = getSemanticTag(columnKey, value);
  const label = semantic?.label ?? formatCellValue(value);

  if (!semantic) {
    return label;
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border ${semantic.className}`}>
      {label}
    </span>
  );
}
