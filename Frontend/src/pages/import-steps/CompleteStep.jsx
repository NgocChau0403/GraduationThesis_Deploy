import React from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import ResultPanel from "../../components/import/ResultPanel";

/**
 * Step 4: Success State & Ingestion Summary
 */
export default function CompleteStep() {
  const navigate = useNavigate();
  const { runResult } = useOutletContext();

  // Guard clause if someone tries to access this page without a result
  if (!runResult) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-slate-800">No Import Results Found</h2>
        <p className="text-slate-500 mb-6">It seems like you haven't completed any import process yet.</p>
        <button 
          onClick={() => navigate("/import/upload")}
          className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
        >
          Start New Import
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-1000 max-w-5xl mx-auto text-center">
      {/* SUCCESS CELEBRATION HEADER */}
      <div className="mb-12">
        <div className="relative inline-flex mb-6">
          <div className="absolute inset-0 bg-emerald-400 blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-5xl shadow-inner border border-emerald-100">
            🎉
          </div>
        </div>
        
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Mission Accomplished!</h2>
        <p className="text-slate-500 mt-3 text-lg max-w-2xl mx-auto">
          Your data has been successfully processed, validated, and ingested into the <span className="text-emerald-600 font-bold">Learning Data Warehouse</span>.
        </p>
      </div>

      {/* DETAILED LOGS / RESULTS */}
      <div className="text-left mb-12 rounded-[2.5rem] border border-slate-100 bg-white p-2 shadow-2xl shadow-slate-200/50">
        <div className="p-4 bg-slate-50/50 rounded-[2.2rem]">
          <ResultPanel result={runResult} />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <Link 
          to="/dashboard" 
          className="group relative w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-bold overflow-hidden transition-all hover:scale-105 active:scale-95"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            📊 View Dashboard Analytics
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Link>

        <button 
          onClick={() => navigate("/import/upload")}
          className="w-full sm:w-auto px-10 py-5 bg-white text-slate-600 border-2 border-slate-100 rounded-[2rem] font-bold hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-2"
        >
          🔄 New Data Import
        </button>
      </div>

      {/* OPTIONAL: QUICK TIP FOR TESTER */}
      <div className="mt-12 p-6 rounded-2xl bg-emerald-50/30 border border-emerald-100 max-w-2xl mx-auto">
        <p className="text-xs text-emerald-700 font-medium leading-relaxed">
          <strong>Tester Tip:</strong> You can now verify the imported records in the Postgres database 
          using the <code>sessionId</code> provided in the logs above.
        </p>
      </div>
    </div>
  );
}