import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import RunImportPanel from "../../components/import/RunImportPanel";

/**
 * Step 3: Final System Configuration & Execution
 */
export default function ConfirmStep() {
  const navigate = useNavigate();
  const { 
    sessionId, 
    uploadedFiles, 
    handleRunPipeline, 
    loadingStates,
    datasetName
  } = useOutletContext();

  // Validate state
  if (!sessionId || uploadedFiles.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 mb-4">No active session found.</p>
        <button onClick={() => navigate("/import/upload")} className="text-emerald-600 font-bold underline">
          Return to Step 1
        </button>
      </div>
    );
  }

  // Check if all files are confirmed before allowing run
  const allConfirmed = uploadedFiles.every(f => !!f.confirmedMappingConfig);
  const confirmedCount = uploadedFiles.filter(f => !!f.confirmedMappingConfig).length;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-xl font-black text-slate-900 sm:text-3xl">3. Final Confirmation</h2>
        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Everything looks good! You are about to import <span className="font-bold text-emerald-600">{uploadedFiles.length} file(s)</span>{" "}
          into <span className="font-bold text-slate-800">"{datasetName || 'Default Dataset'}"</span>.
        </p>
      </div>

      {/* Mini Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-3xl border border-slate-100 bg-white shadow-sm text-center">
          <div className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-1">Total Files</div>
          <div className="text-2xl font-black text-slate-800">{uploadedFiles.length}</div>
        </div>
        <div className="p-4 rounded-3xl border border-emerald-100 bg-emerald-50/50 text-center">
          <div className="text-xs font-bold uppercase text-emerald-600 tracking-widest mb-1">Ready to Import</div>
          <div className="text-2xl font-black text-emerald-700">{confirmedCount}</div>
        </div>
        <div className="p-4 rounded-3xl border border-slate-100 bg-white shadow-sm text-center">
          <div className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-1">Status</div>
          <div className={`text-sm font-bold mt-2 ${allConfirmed ? 'text-emerald-500' : 'text-amber-500'}`}>
            {allConfirmed ? '✅ All Verified' : '⚠️ Review Required'}
          </div>
        </div>
      </div>

      {/* Warning Alert if not confirmed */}
      {!allConfirmed && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <div className="text-sm font-bold text-amber-900">Action Required</div>
            <p className="text-xs text-amber-700 mt-1">
              You have {uploadedFiles.length - confirmedCount} unconfirmed file(s). 
              Please go back to <button onClick={() => navigate("/import/review")} className="underline font-bold">Step 2</button> to verify the AI mappings.
            </p>
          </div>
        </div>
      )}

      {/* Run Pipeline Panel */}
      <div className="rounded-[40px] border border-emerald-100 bg-white p-2 shadow-xl shadow-emerald-900/5">
        <div className="rounded-[36px] border border-emerald-50 bg-emerald-50/20 p-6">
          <RunImportPanel
            sessionId={sessionId}
            files={uploadedFiles}
            onRun={handleRunPipeline}
            loading={loadingStates.running}
            disabled={!allConfirmed}
          />
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <button 
          onClick={() => navigate("/import/review")}
          className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back to Review Mapping
        </button>
      </div>
    </div>
  );
}