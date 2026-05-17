/**
 * AdminDashboardPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Phase 3 — Admin Dashboard (Cách C: auto-run basic tasks)
 *
 * Flow:
 *   1. Vào dashboard → auto-run 3 basic admin tasks (cohort-level)
 *   2. Hiện sẵn charts: At-risk cohort, Engagement–performance, Assessment difficulty
 *   3. "Explore More" → chọn thêm tasks → chart append vào dashboard
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { useTaskRegistry } from "../hooks/useTaskRegistry";
import { runAnalyticsTask, fetchClasses } from "../services/analyticsApi";
import ChartRenderer from "../components/ChartRenderer";
import AIInsightPanel from "../components/AIInsightPanel";

// ── Basic tasks auto-run cho Admin ──────────────────────────────────────────
// Cohort-level analytics chạy tự động khi vào dashboard
const ADMIN_BASIC_TASKS = ["A-G03", "A-G02", "A-G04"];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { activeDataset, isLoading: appLoading } = useAppContext();

  // Fetch classes
  const { data: classesData } = useQuery({
    queryKey: ["classes", activeDataset?.id],
    queryFn: () => fetchClasses(activeDataset?.id),
    enabled: !!activeDataset?.id,
  });
  const classes = classesData?.classes ?? [];
  const [selectedClassId, setSelectedClassId] = useState("");
  const classId = selectedClassId || classes[0]?.class_id || "";

  // Fetch admin-scope tasks (Many students + Cohort)
  const { tasks: manyTasks } = useTaskRegistry({ scope: "students" });
  const { tasks: cohortTasks } = useTaskRegistry({ scope: "cohort" });
  const allAdminTasks = [...manyTasks, ...cohortTasks];

  // Remove duplicates
  const uniqueAdminTasks = allAdminTasks.filter(
    (t, i, arr) => arr.findIndex(x => x.taskId === t.taskId) === i
  );

  const [taskResults, setTaskResults] = useState({});
  const [loadingTasks, setLoadingTasks] = useState(new Set());
  const [showExplore, setShowExplore] = useState(false);

  // ── Auto-run basic tasks ────────────────────────────────────────────────
  const runTask = useCallback(async (taskId) => {
    if (!activeDataset?.id || !classId) return;
    setLoadingTasks(prev => new Set([...prev, taskId]));
    try {
      const result = await runAnalyticsTask(taskId, {
        batch_id: activeDataset.id,
        class_id: classId,
      });
      setTaskResults(prev => ({ ...prev, [taskId]: result }));
    } catch (err) {
      console.error(`[AdminDashboard] Task ${taskId} failed:`, err.message);
      setTaskResults(prev => ({
        ...prev,
        [taskId]: { error: err.message, taskId }
      }));
    } finally {
      setLoadingTasks(prev => {
        const next = new Set(prev);
        next.delete(taskId);
        return next;
      });
    }
  }, [activeDataset?.id, classId]);

  // Auto-run on mount
  useEffect(() => {
    if (!activeDataset?.id || !classId) return;
    setTaskResults({});
    ADMIN_BASIC_TASKS.forEach(taskId => runTask(taskId));
  }, [activeDataset?.id, classId, runTask]);

  // Redirect if no dataset
  useEffect(() => {
    if (!appLoading && !activeDataset) {
      navigate("/data-selection", { replace: true });
    }
  }, [appLoading, activeDataset, navigate]);

  const getTaskMeta = (taskId) => uniqueAdminTasks.find(t => t.taskId === taskId);

  const extraTasks = uniqueAdminTasks.filter(
    t => !ADMIN_BASIC_TASKS.includes(t.taskId) && !taskResults[t.taskId]
  );

  // ── Guards ──────────────────────────────────────────────────────────────
  if (appLoading || !activeDataset) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  const displayedTaskIds = [
    ...ADMIN_BASIC_TASKS,
    ...Object.keys(taskResults).filter(id => !ADMIN_BASIC_TASKS.includes(id)),
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg">
            🏫
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Admin Dashboard</h1>
            <p className="text-xs font-medium text-slate-500">
              Dataset: <span className="text-blue-600">{activeDataset.name}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Class selector */}
          <select
            value={classId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          >
            {classes.length === 0 && <option value="">No classes</option>}
            {classes.map(c => (
              <option key={c.class_id} value={c.class_id}>
                {c.course_id} – {c.class_run} ({c.student_count} students)
              </option>
            ))}
          </select>
          <button onClick={() => navigate("/data-selection")}
            className="text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg px-4 py-2 transition-colors">
            Switch Dataset
          </button>
          <button onClick={() => navigate("/choose-role")}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg px-4 py-2 hover:bg-slate-50 transition-colors">
            Switch Role
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {/* ── Auto-loaded Charts ──────────────────────────────────── */}
        {displayedTaskIds.map(taskId => {
          const result = taskResults[taskId];
          const taskMeta = getTaskMeta(taskId);
          const isLoading = loadingTasks.has(taskId);

          return (
            <section key={taskId} className="space-y-3">
              {taskMeta && (
                <ChartRenderer
                  taskMeta={taskMeta}
                  datasets={result?.datasets ?? null}
                  isLoading={isLoading}
                />
              )}

              {!taskMeta && isLoading && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-pulse">
                  <div className="h-4 w-48 bg-slate-200 rounded mb-4" />
                  <div className="h-[200px] bg-slate-100 rounded-lg flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
                      <span className="text-xs text-slate-400">Running {taskId}...</span>
                    </div>
                  </div>
                </div>
              )}

              {result?.error && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm font-medium text-red-700">{taskId} failed</p>
                  <p className="text-xs text-red-500 mt-1">{result.error}</p>
                </div>
              )}

              {result?.datasets && (
                <AIInsightPanel
                  taskId={result.taskId}
                  executionId={result.executionId}
                  datasets={result.datasets}
                  meta={result.meta}
                  studentContext={null}
                />
              )}
            </section>
          );
        })}

        {/* ── Explore More ────────────────────────────────────────── */}
        {extraTasks.length > 0 && (
          <div className="border-t border-slate-200 pt-6">
            <button
              onClick={() => setShowExplore(!showExplore)}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>{showExplore ? "▼" : "▶"}</span>
              Explore More ({extraTasks.length} more tasks available)
            </button>

            {showExplore && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {extraTasks.map(task => (
                  <button
                    key={task.taskId}
                    onClick={() => runTask(task.taskId)}
                    disabled={loadingTasks.has(task.taskId)}
                    className="text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        {task.taskId}
                      </code>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-slate-100 text-slate-500">
                        {task.viz_type?.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 group-hover:text-blue-700 transition-colors">
                      {task.taskName}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {task.actionableQuestion}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
