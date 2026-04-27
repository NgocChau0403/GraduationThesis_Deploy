import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { activeDataset, isLoading } = useAppContext();

  // Guard: Admin navigate trực tiếp vào /admin/dashboard khi chưa có dataset
  useEffect(() => {
    if (!isLoading && !activeDataset) {
      navigate("/data-selection", { replace: true });
    }
  }, [isLoading, activeDataset, navigate]);

  if (isLoading || !activeDataset) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
            A
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Admin Dashboard</h1>
            <p className="text-xs font-medium text-slate-500">
              Active Dataset: <span className="text-blue-600">{activeDataset.name}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/data-selection")}
            className="text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg px-4 py-2 transition-colors"
          >
            Switch Dataset
          </button>
          <button
            onClick={() => navigate("/choose-role")}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg px-4 py-2 hover:bg-slate-50 transition-colors"
          >
            Switch Role
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center h-[60vh] flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
              <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-700 mb-2">Admin Analytics Content</h2>
          <p className="text-slate-500 max-w-md">
            This dashboard is currently under construction. It will display class-wide analytics and performance monitoring tools based on the <b>{activeDataset.name}</b> data.
          </p>
        </div>
      </main>
    </div>
  );
}
