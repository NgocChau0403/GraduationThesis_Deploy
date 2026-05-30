import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { runAnalyticsTask, getStudents, fetchClasses, fetchAvailableTasks } from "../services/analyticsApi";
import ChartRenderer from "../components/ChartRenderer";
import AIInsightPanel from "../components/AIInsightPanel";

const STUDENT_BASIC_TASKS = ["S-B01", "S-B02", "S-T03"];
const STUDENT_CONDITIONAL_TASKS = ["S-B03"];
const STUDENT_ADVANCED_TASKS = [
  "S-T00", "S-T01", "S-T02", "S-T04", "S-T05", "S-T06", "S-T07",
  "S-T08", "S-T09", "S-T10", "S-T11", "S-T12", "S-T13", "S-T14", "S-T15",
];

const STUDENT_ALLOWED_TASK_IDS = new Set([
  ...STUDENT_BASIC_TASKS,
  ...STUDENT_ADVANCED_TASKS,
  ...STUDENT_CONDITIONAL_TASKS,
]);

const WORKSPACE_TABS = [
  { id: "student_basic", label: "Student - Core Stat Tasks", prefixes: STUDENT_BASIC_TASKS },
  { id: "student_advanced", label: "Student - Choice Electives", prefixes: STUDENT_ADVANCED_TASKS },
];

function isTaskExecutable(task) {
  return task?.availability?.status === "executable";
}

function getDisabledReason(task) {
  const availability = task?.availability;
  const firstMissing = availability?.missing_requirements?.[0];
  return (
    availability?.disabled_reason ||
    firstMissing?.message ||
    firstMissing ||
    availability?.confidence_reason ||
    "Task is not executable for this dataset/class."
  );
}

function getAvailabilityLabel(task) {
  const status = task?.availability?.status || "unknown";
  if (status === "executable") return "Available";
  if (status === "partial") return "Partial";
  if (status === "insufficient_data") return "Insufficient";
  if (status === "unsupported") return "Unsupported";
  return status;
}

function getAvailabilityBadgeClass(task) {
  const status = task?.availability?.status;
  if (status === "executable") return "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (status === "partial") return "bg-amber-50 text-amber-700 border-amber-100";
  if (status === "insufficient_data") return "bg-orange-50 text-orange-700 border-orange-100";
  return "bg-slate-100 text-slate-500 border-slate-200";
}

export default function StudentDashboardPage() {
  const navigate = useNavigate();
  const { activeDataset, isLoading: appLoading } = useAppContext();
  const [currentTab, setCurrentTab] = useState("student_basic");
  const [activeTaskId, setActiveTaskId] = useState(STUDENT_BASIC_TASKS[0]);

  const { data: classesData, isLoading: isClassesLoading, isError: isClassesError, error: classesQueryError } = useQuery({
    queryKey: ["classes", activeDataset?.id],
    queryFn: () => fetchClasses(activeDataset?.id),
    enabled: !!activeDataset?.id,
  });
  const classes = classesData?.classes ?? [];
  const [selectedClassId, setSelectedClassId] = useState("");
  const classId = selectedClassId || classes[0]?.class_id || "";

  const { data: studentsData, isLoading: isStudentsLoading, isError: isStudentsError, error: studentsQueryError } = useQuery({
    queryKey: ["students", activeDataset?.id, classId],
    queryFn: () => getStudents(activeDataset?.id, classId),
    enabled: !!activeDataset?.id && !!classId,
  });
  const students = studentsData?.students ?? [];

  const {
    data: availableTasksData,
    isLoading: isAvailabilityLoading,
    isError: isAvailabilityError,
    error: availabilityError,
  } = useQuery({
    queryKey: ["available-tasks", activeDataset?.id, classId, "student"],
    queryFn: () => fetchAvailableTasks(activeDataset.id, classId, "student"),
    enabled: !!activeDataset?.id && !!classId,
    staleTime: 60 * 1000,
  });
  const allTasksRaw = useMemo(() => availableTasksData?.tasks ?? [], [availableTasksData?.tasks]);
  const allStudentTasks = useMemo(() =>
    allTasksRaw.filter((task) => STUDENT_ALLOWED_TASK_IDS.has(task.taskId)),
    [allTasksRaw]
  );

  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [taskResults, setTaskResults] = useState({});
  const [loadingTasks, setLoadingTasks] = useState(new Set());

  const studentId = selectedStudentId || students[0]?.student_id || "";
  const enrollmentId = students.find(s => s.student_id === studentId)?.enrollment_id ?? null;

  const runTask = useCallback(async (taskId, sid, cid, extraParams = {}) => {
    if (!sid || !cid || !activeDataset?.id) return;
    setLoadingTasks(prev => new Set([...prev, taskId]));
    try {
      const params = {
        batch_id: activeDataset.id,
        class_id: cid,
        student_id: sid,
        ...(enrollmentId ? { enrollment_id: enrollmentId } : {}),
        ...extraParams,
      };
      const result = await runAnalyticsTask(taskId, params);
      setTaskResults(prev => ({ ...prev, [taskId]: result }));
    } catch (err) {
      console.error(`[Dashboard] Task ${taskId} failed:`, err.message);
      setTaskResults(prev => ({ ...prev, [taskId]: { error: err.message, taskId } }));
    } finally {
      setLoadingTasks(prev => {
        const next = new Set(prev);
        next.delete(taskId);
        return next;
      });
    }
  }, [activeDataset?.id, enrollmentId]);

  const activeTabObj = useMemo(() => WORKSPACE_TABS.find(t => t.id === currentTab), [currentTab]);

  const filteredTasks = useMemo(() => {
    if (!activeTabObj) return [];
    let combinedPrefixes = [...activeTabObj.prefixes];
    if (activeTabObj.id === "student_basic") {
      combinedPrefixes = [...combinedPrefixes, ...STUDENT_CONDITIONAL_TASKS];
    }
    return allStudentTasks.filter(t => combinedPrefixes.includes(t.taskId));
  }, [allStudentTasks, activeTabObj]);

  const currentTaskMeta = useMemo(() => allStudentTasks.find(t => t.taskId === activeTaskId), [allStudentTasks, activeTaskId]);
  const currentResult = taskResults[activeTaskId];
  const isCurrentTaskLoading = loadingTasks.has(activeTaskId);

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    const targetTab = WORKSPACE_TABS.find(t => t.id === tabId);
    if (targetTab && targetTab.prefixes.length > 0) {
      setActiveTaskId(targetTab.prefixes[0]);
    }
  };

  const handleTriggerAnalysis = () => {
    if (!isTaskExecutable(currentTaskMeta)) return;
    runTask(activeTaskId, studentId, classId);
  };

  useEffect(() => {
    if (!availableTasksData || !studentId || !classId || !activeDataset?.id) return;
    if (!isTaskExecutable(currentTaskMeta)) return;
    setTaskResults({});
    if (STUDENT_BASIC_TASKS.includes(activeTaskId) || STUDENT_CONDITIONAL_TASKS.includes(activeTaskId)) {
      runTask(activeTaskId, studentId, classId);
    }
  }, [availableTasksData, studentId, classId, activeDataset?.id, runTask, activeTaskId, currentTaskMeta]);

  useEffect(() => {
    if (!filteredTasks.length || !availableTasksData) return;
    const activeTask = filteredTasks.find(t => t.taskId === activeTaskId);
    if (isTaskExecutable(activeTask)) return;

    const firstExecutable = filteredTasks.find(isTaskExecutable);
    if (firstExecutable) setActiveTaskId(firstExecutable.taskId);
    else if (!activeTask) setActiveTaskId(filteredTasks[0].taskId);
  }, [filteredTasks, activeTaskId, availableTasksData]);

  if (appLoading || !activeDataset || isClassesLoading || isStudentsLoading || isAvailabilityLoading) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (isClassesError || isStudentsError || isAvailabilityError) {
    const message =
      classesQueryError?.message ||
      studentsQueryError?.message ||
      availabilityError?.message ||
      "Unable to load dashboard data.";

    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md rounded-lg border border-red-100 bg-white p-5 text-center shadow-sm">
          <p className="text-sm font-bold text-red-700">Dashboard data could not be loaded</p>
          <p className="mt-2 text-xs text-slate-500">{message}</p>
          <button onClick={() => navigate("/choose-role")} className="mt-4 rounded border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
            Switch Role
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="workspace-fixed-layout h-screen max-h-screen bg-slate-100 p-3 flex flex-col overflow-hidden text-slate-700 font-sans">
      
      {/* Light Clean Student Header */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-white rounded-t-xl border-b border-slate-200 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-sm border border-emerald-200">🎓</div>
          <div>
            <h1 className="text-sm font-bold text-slate-900">Student Personal Analytics Canvas</h1>
            <p className="text-[10px] text-slate-500">Dataset: <span className="text-emerald-600 font-semibold">{activeDataset.name}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select value={classId} onChange={(e) => { setSelectedClassId(e.target.value); setSelectedStudentId(""); }} className="px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold focus:outline-none focus:border-emerald-500">
            {classes.map(c => <option key={c.class_id} value={c.class_id}>{c.course_id} – {c.class_run} ({c.student_count} students)</option>)}
          </select>

          <select value={studentId} onChange={(e) => setSelectedStudentId(e.target.value)} className="px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold focus:outline-none focus:border-emerald-500">
            {students.map(s => <option key={s.student_id} value={s.student_id}>{s.student_id} {s.gender ? `(${s.gender})` : ""}</option>)}
          </select>

          <button onClick={() => navigate("/choose-role")} className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded px-3 py-1.5 hover:bg-slate-50 transition-colors">Switch Role</button>
        </div>
      </header>

      {/* Main Grid Viewport */}
      <main className="flex-1 grid grid-cols-[340px_1fr] min-h-0 bg-white rounded-b-xl overflow-hidden shadow-sm border border-t-0 border-slate-200">
        
        {/* Left Side Menu Selector */}
        <section className="border-r border-slate-200 flex flex-col min-h-0 bg-slate-50/50">
          <div className="p-3 border-b border-slate-200 bg-white shrink-0">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Report Page / Analysis Sheets</label>
            <select
              value={currentTab}
              onChange={(e) => handleTabChange(e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold focus:outline-none focus:border-emerald-500"
            >
              {WORKSPACE_TABS.map(tab => (
                <option key={tab.id} value={tab.id}>{tab.label}</option>
              ))}
            </select>
          </div>

          {/* List of row items */}
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-3 py-2 space-y-1.5">
            {filteredTasks.map((task) => {
              const executable = isTaskExecutable(task);
              return (
                <button
                  key={task.taskId}
                  onClick={() => setActiveTaskId(task.taskId)}
                  disabled={!executable}
                  title={executable ? task.taskName : getDisabledReason(task)}
                  className={`w-full rounded-lg border p-2.5 text-left transition-all block disabled:cursor-not-allowed ${
                    activeTaskId === task.taskId
                      ? "border-emerald-500 bg-emerald-50/60 shadow-sm"
                      : executable
                        ? "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50"
                        : "border-slate-100 bg-slate-50 opacity-75"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <code className="shrink-0 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-mono font-bold text-emerald-600 border border-emerald-100">
                      {task.taskId}
                    </code>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-xs font-bold text-slate-800">{task.taskName}</p>
                        <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-bold ${getAvailabilityBadgeClass(task)}`}>
                          {getAvailabilityLabel(task)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[10px] text-slate-400 truncate font-medium">{task.actionableQuestion}</p>
                      {!executable && (
                        <p className="mt-1 line-clamp-2 text-[10px] font-medium text-slate-500">{getDisabledReason(task)}</p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
            {filteredTasks.length === 0 && (
              <div className="rounded-lg border border-slate-100 bg-white p-3 text-xs text-slate-400">
                No student tasks are available for this dataset/class.
              </div>
            )}
          </div>

          {/* Dynamic runtime trigger */}
          <div className="border-t border-slate-200 bg-white p-3 shrink-0">
            <button
              onClick={handleTriggerAnalysis}
              disabled={isCurrentTaskLoading || !isTaskExecutable(currentTaskMeta)}
              className="w-full rounded-lg py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all text-white shadow-sm"
            >
              {isCurrentTaskLoading ? "⚡ Compiling Visual..." : "🚀 Run Selected Metric View"}
            </button>
          </div>
        </section>

        {/* Central Visualization Workspace Viewport */}
        <section className="flex flex-col min-h-0 bg-slate-50 p-4">
          {currentTaskMeta ? (
            <div className="h-full flex flex-col min-h-0 space-y-3">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shrink-0 shadow-sm">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100 mr-2">{currentTaskMeta.taskId}</span>
                <span className="text-sm font-bold text-slate-800">{currentTaskMeta.taskName}</span>
                <span className={`ml-2 rounded border px-1.5 py-0.5 text-[10px] font-bold ${getAvailabilityBadgeClass(currentTaskMeta)}`}>
                  {getAvailabilityLabel(currentTaskMeta)}
                </span>
                <p className="text-xs text-slate-500 mt-1 font-medium">{currentTaskMeta.actionableQuestion}</p>
                {!isTaskExecutable(currentTaskMeta) && (
                  <p className="mt-2 rounded border border-slate-100 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-500">
                    {getDisabledReason(currentTaskMeta)}
                  </p>
                )}
              </div>

              {/* Layout optimization: Chart area expanded */}
              <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-3">
                
                {/* Expanded Chart Card Panel */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col min-h-0 overflow-hidden shadow-sm">
                  <div className="flex-1 w-full h-full min-h-0 block">
                    <ChartRenderer
                      taskMeta={currentTaskMeta}
                      datasets={currentResult?.datasets ?? null}
                      isLoading={isCurrentTaskLoading}
                      error={currentResult?.error ?? (!isTaskExecutable(currentTaskMeta) ? getDisabledReason(currentTaskMeta) : null)}
                    />
                  </div>
                </div>

                {/* AI Diagnostic Panel Card */}
                <div className="bg-white rounded-xl border border-slate-200 flex flex-col min-h-0 overflow-hidden shadow-sm">
                  <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"/>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">AI Explanatory Diagnostics</h4>
                  </div>
                  <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3 text-slate-600">
                    {currentResult?.datasets ? (
                      <AIInsightPanel
                        taskId={currentResult.taskId}
                        executionId={currentResult.executionId}
                        datasets={currentResult.datasets}
                        meta={currentResult.meta}
                        studentContext={{ student_id: studentId }}
                      />
                    ) : (
                      <div className="text-xs text-slate-400 italic text-center pt-12">Awaiting model pipeline response parameters execution...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs italic">Select an active student analytics vector node inside the sidebar registry menu.</div>
          )}
        </section>
      </main>
    </div>
  );
}
