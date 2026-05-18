/**
 * StudentDashboardPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Phase 3 — Student Dashboard (Cách C: auto-run basic tasks)
 *
 * Flow:
 *   1. Vào dashboard → auto-run 3 basic tasks cho SV đầu tiên
 *   2. Hiện sẵn 3 charts (Performance, Risk, Score Trend)
 *   3. Cuộn xuống → "Explore More" → chọn thêm tasks → chart thêm vào
 *   4. Mỗi chart có nút AI Explain bên dưới
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { useTaskRegistry } from "../hooks/useTaskRegistry";
import { runAnalyticsTask, getStudents, fetchClasses } from "../services/analyticsApi";
import ChartRenderer from "../components/ChartRenderer";
import AIInsightPanel from "../components/AIInsightPanel";

// ── Basic tasks auto-run cho Student ────────────────────────────────────────
// Đây là 3 tasks quan trọng nhất, chạy tự động khi vào dashboard.
// Tất cả 3 tasks này có datasetCompatibility: "both" nên an toàn với mọi dataset.
const STUDENT_BASIC_TASKS = ["S-B01", "S-B02", "S-T01"];

// ── Dataset source → compatibility filter map ─────────────────────────────────
// Maps activeDataset.source → which datasetCompatibility values are allowed.
// "both" tasks always show; OULAD-only tasks hide for UCI users (and vice versa).
function getCompatFilter(datasetSource) {
  if (!datasetSource) return () => true;
  const src = datasetSource.toUpperCase();
  return (task) =>
    task.datasetCompatibility === "both" ||
    task.datasetCompatibility === `${src}_only`;
}

export default function StudentDashboardPage() {
  const navigate = useNavigate();
  const { activeDataset, isLoading: appLoading } = useAppContext();

  // Derive dataset source ("UCI" | "OULAD" | null) for compatibility filtering.
  // activeDataset.source is set by the backend and stored in AppContext.
  const datasetSource = activeDataset?.source ?? null;
  const isCompatible  = getCompatFilter(datasetSource);

  // All student-scope tasks, filtered by active dataset compatibility.
  // This prevents OULAD-only tasks from showing in the UI when using UCI data.
  const { tasks: allStudentTasksRaw } = useTaskRegistry({ scope: "student" });
  const allStudentTasks = allStudentTasksRaw.filter(isCompatible);

  // Fetch classes
  const { data: classesData } = useQuery({
    queryKey: ["classes", activeDataset?.id],
    queryFn: () => fetchClasses(activeDataset?.id),
    enabled: !!activeDataset?.id,
  });
  const classes = classesData?.classes ?? [];
  const [selectedClassId, setSelectedClassId] = useState("");
  const classId = selectedClassId || classes[0]?.class_id || "";

  // Fetch students (filtered by class).
  // The students API returns enrollment_id per student — we store the full
  // student object so runTask can resolve enrollment_id on demand.
  const { data: studentsData } = useQuery({
    queryKey: ["students", activeDataset?.id, classId],
    queryFn: () => getStudents(activeDataset?.id, classId),
    enabled: !!activeDataset?.id && !!classId,
  });
  const students = studentsData?.students ?? [];

  const [selectedStudentId, setSelectedStudentId] = useState("");
  // Stores results: { "S-B01": { result, taskMeta }, "S-T01": { result, taskMeta }, ... }
  const [taskResults, setTaskResults] = useState({});
  const [loadingTasks, setLoadingTasks] = useState(new Set());
  const [showExplore, setShowExplore] = useState(false);

  const studentId = selectedStudentId || students[0]?.student_id || "";

  // ── Resolve enrollment_id for the currently selected student ─────────────
  // The backend's GET /api/students already returns enrollment_id per row.
  // We look it up from the in-memory students list to avoid an extra API call.
  // Tasks that need :enrollment_id (S-B03, S-T05, S-T06, S-T10, A-S03)
  // only work with OULAD data where enrollment records are unique per student+class.
  const enrollmentId = students.find(s => s.student_id === studentId)?.enrollment_id ?? null;

  // ── Run a single analytics task ──────────────────────────────────────────
  //
  // extraParams: optional additional params (e.g. enrollment_id for OULAD tasks).
  // Base params: batch_id, class_id, student_id — always provided.
  // enrollment_id is added automatically when the task SQL requires it AND the
  // current dataset has OULAD enrollment records (enrollmentId != null).
  //
  // Tasks that need :enrollment_id but have no enrollmentId available (UCI)
  // should have datasetCompatibility=OULAD_only and be filtered out by
  // isCompatible() before reaching this function. The guard below is a
  // safety net in case the filter is bypassed.
  const runTask = useCallback(async (taskId, sid, cid, extraParams = {}) => {
    if (!sid || !cid || !activeDataset?.id) return;
    setLoadingTasks(prev => new Set([...prev, taskId]));
    try {
      const params = {
        batch_id:   activeDataset.id,
        class_id:   cid,
        student_id: sid,
        // Include enrollment_id when available — OULAD tasks need it.
        // UCI tasks don't use :enrollment_id in their SQL so this is harmless.
        ...(enrollmentId ? { enrollment_id: enrollmentId } : {}),
        // Caller-supplied extras (e.g. comparison tasks passing s1, s2)
        ...extraParams,
      };
      const result = await runAnalyticsTask(taskId, params);
      setTaskResults(prev => ({ ...prev, [taskId]: result }));
    } catch (err) {
      console.error(`[Dashboard] Task ${taskId} failed:`, err.message);
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
  // enrollmentId included in deps: re-create callback when student changes
  }, [activeDataset?.id, enrollmentId]);

  // Auto-run basic tasks when studentId is available
  useEffect(() => {
    if (!studentId || !classId || !activeDataset?.id) return;
    // Clear old results
    setTaskResults({});
    // Run basic tasks
    STUDENT_BASIC_TASKS.forEach(taskId => runTask(taskId, studentId, classId));
  }, [studentId, classId, activeDataset?.id, runTask]);

  // ── Get task metadata by ID ─────────────────────────────────────────────
  const getTaskMeta = (taskId) => allStudentTasks.find(t => t.taskId === taskId);

  // ── Extra tasks: compatible, not basic, not yet run ──────────────────────
  // allStudentTasks is already filtered by dataset compatibility above.
  // Further exclude: basic tasks (always shown) and tasks already executed.
  const extraTasks = allStudentTasks.filter(
    t => !STUDENT_BASIC_TASKS.includes(t.taskId) && !taskResults[t.taskId]
  );

  const handleRunExtra = (taskId) => {
    runTask(taskId, studentId, classId);
  };

  const handleStudentChange = (e) => {
    setSelectedStudentId(e.target.value);
  };

  const handleClassChange = (e) => {
    setSelectedClassId(e.target.value);
    setSelectedStudentId(""); // reset student when class changes
  };

  // ── Guards ──────────────────────────────────────────────────────────────
  if (appLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!activeDataset) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md">
          <h2 className="text-xl font-bold text-slate-800 mb-2">No Dataset Configured</h2>
          <p className="text-slate-500 mb-6">Please ask your administrator to set up a dataset.</p>
          <button onClick={() => navigate("/")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // All task IDs that have results or are loading
  const displayedTaskIds = [
    ...STUDENT_BASIC_TASKS,
    ...Object.keys(taskResults).filter(id => !STUDENT_BASIC_TASKS.includes(id)),
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg">
            🎓
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Student Dashboard</h1>
            <p className="text-xs font-medium text-slate-500">
              Dataset: <span className="text-emerald-600">{activeDataset.name}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Class selector */}
          <select
            value={classId}
            onChange={handleClassChange}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700
                       focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          >
            {classes.length === 0 && <option value="">No classes</option>}
            {classes.map(c => (
              <option key={c.class_id} value={c.class_id}>
                {c.course_id} – {c.class_run} ({c.student_count} students)
              </option>
            ))}
          </select>
          {/* Student selector */}
          <select
            value={studentId}
            onChange={handleStudentChange}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700
                       focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          >
            {students.length === 0 && <option value="">No students</option>}
            {students.map(s => (
              <option key={s.student_id} value={s.student_id}>
                {s.student_id} {s.gender ? `(${s.gender})` : ""}
              </option>
            ))}
          </select>
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
              {/* Chart */}
              {taskMeta && (
                <ChartRenderer
                  taskMeta={taskMeta}
                  datasets={result?.datasets ?? null}
                  isLoading={isLoading}
                />
              )}

              {/* Loading state without taskMeta */}
              {!taskMeta && isLoading && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-pulse">
                  <div className="h-4 w-48 bg-slate-200 rounded mb-4" />
                  <div className="h-[200px] bg-slate-100 rounded-lg flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-500" />
                      <span className="text-xs text-slate-400">Running {taskId}...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error state */}
              {result?.error && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm font-medium text-red-700">{taskId} failed</p>
                  <p className="text-xs text-red-500 mt-1">{result.error}</p>
                </div>
              )}

              {/* AI Panel (only when result exists and no error) */}
              {result?.datasets && (
                <AIInsightPanel
                  taskId={result.taskId}
                  executionId={result.executionId}
                  datasets={result.datasets}
                  meta={result.meta}
                  studentContext={{ student_id: studentId }}
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
              className="flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <span>{showExplore ? "▼" : "▶"}</span>
              Explore More ({extraTasks.length} more tasks available)
            </button>

            {showExplore && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {extraTasks.map(task => (
                  <button
                    key={task.taskId}
                    onClick={() => handleRunExtra(task.taskId)}
                    disabled={loadingTasks.has(task.taskId)}
                    className="text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {task.taskId}
                      </code>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-slate-100 text-slate-500">
                        {task.viz_type?.replace("_", " ")}
                      </span>
                      {task.datasetCompatibility !== "both" && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-yellow-100 text-yellow-700">
                          {task.datasetCompatibility}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-slate-800 group-hover:text-emerald-700 transition-colors">
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
