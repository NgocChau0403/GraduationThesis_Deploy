import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export default function StudentDashboardPage() {
  const navigate = useNavigate();
  const { activeDataset, isLoading } = useAppContext();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!activeDataset) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md">
          <h2 className="text-xl font-bold text-slate-800 mb-2">No Dataset Configured</h2>
          <p className="text-slate-500 mb-6">
            The system is not configured with an active dataset yet. Please ask your administrator to set up a dataset.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
            S
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Student Dashboard</h1>
            <p className="text-xs font-medium text-slate-500">
              Active Dataset: <span className="text-emerald-600">{activeDataset.name}</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/choose-role")}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg px-4 py-2 hover:bg-slate-50 transition-colors"
        >
          Switch Role
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center h-[60vh] flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Student Analytics Content</h2>
          <p className="text-slate-500 max-w-md">
            This dashboard is currently under construction. It will display personalized learning insights and progress tracking based on the <b>{activeDataset.name}</b> data.
          </p>
        </div>
      </main>
    </div>
  );
}
