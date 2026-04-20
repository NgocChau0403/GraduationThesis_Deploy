import React from "react";

export default function StepPill({ index, label, active, complete }) {
  const className = complete
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : active
      ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-100 scale-105"
      : "border-slate-200 bg-white text-slate-400";

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300 ${className}`}>
      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${active ? 'bg-white text-emerald-600' : 'bg-slate-100'}`}>
        {index}
      </span>
      <span>{label}</span>
    </div>
  );
}