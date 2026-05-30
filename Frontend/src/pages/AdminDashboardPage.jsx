import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { runAnalyticsTask, fetchClasses, getStudents, fetchAvailableTasks } from "../services/analyticsApi";
import ChartRenderer from "../components/ChartRenderer";
import AIInsightPanel from "../components/AIInsightPanel";

const ADMIN_BASIC_TASKS = ["A-B01", "A-B02", "A-B03", "A-B04"];
const ADMIN_SINGLE_STUDENT_TASKS = ["A-S01", "A-S02", "A-S03", "A-S04", "A-S05", "A-S06", "A-S07", "A-S08"];
const ADMIN_COMPARISON_TASKS = ["A-C01", "A-C02", "A-C03", "A-C04", "A-C05", "A-C06"];
const ADMIN_COHORT_TASKS = [
  "A-G01", "A-G02", "A-G03", "A-G04", "A-G05", "A-G06", "A-G07", "A-G08",
  "A-G09", "A-G10", "A-G11", "A-G12", "A-G13", "A-G14", "A-G15", "A-G16",
];
const ADMIN_ALLOWED_TASK_IDS = new Set([
  ...ADMIN_BASIC_TASKS,
  ...ADMIN_SINGLE_STUDENT_TASKS,
  ...ADMIN_COMPARISON_TASKS,
  ...ADMIN_COHORT_TASKS,
]);

const WORKSPACE_TABS = [
  { id: "admin_basic", label: "Admin - Basic Tasks", prefixes: ADMIN_BASIC_TASKS },
  { id: "admin_single", label: "Admin - Single Student Tasks", prefixes: ADMIN_SINGLE_STUDENT_TASKS },
  { id: "admin_compare", label: "Admin - Comparison Tasks", prefixes: ADMIN_COMPARISON_TASKS },
  { id: "admin_cohort", label: "Admin - Cohort Tasks", prefixes: ADMIN_COHORT_TASKS },
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

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { activeDataset, isLoading: appLoading } = useAppContext();
  const [currentTab, setCurrentTab] = useState("admin_basic");
  const [activeTaskId, setActiveTaskId] = useState(ADMIN_BASIC_TASKS[0]);

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
  const students = useMemo(() => studentsData?.students ?? [], [studentsData?.students]);

  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedCompareStudentId, setSelectedCompareStudentId] = useState("");

  const primaryStudentId = selectedStudentId || students[0]?.student_id || "";
  const secondaryStudentId = selectedCompareStudentId || students.find((s) => s.student_id !== primaryStudentId)?.student_id || "";

  const {
    data: availableTasksData,
    isLoading: isAvailabilityLoading,
    isError: isAvailabilityError,
    error: availabilityError,
  } = useQuery({
    queryKey: ["available-tasks", activeDataset?.id, classId, "admin"],
    queryFn: () => fetchAvailableTasks(activeDataset.id, classId, "admin"),
    enabled: !!activeDataset?.id && !!classId,
    staleTime: 60 * 1000,
  });
  const allTasksRaw = useMemo(() => availableTasksData?.tasks ?? [], [availableTasksData?.tasks]);
  const uniqueAdminTasks = useMemo(() => 
    allTasksRaw
      .filter((task) => ADMIN_ALLOWED_TASK_IDS.has(task.taskId))
      .filter((task, idx, arr) => arr.findIndex((t) => t.taskId === task.taskId) === idx),
    [allTasksRaw]
  );

  const taskMetaById = useMemo(() => {
    const map = new Map();
    for (const task of uniqueAdminTasks) {
      map.set(task.taskId, task);
    }
    return map;
  }, [uniqueAdminTasks]);

  const [taskResults, setTaskResults] = useState({});
  const [loadingTasks, setLoadingTasks] = useState(new Set());

  const resolveEnrollmentId = useCallback((studentId) => 
    students.find((s) => s.student_id === studentId)?.enrollment_id ?? null,
    [students]
  );

  const runTask = useCallback(async (taskId, extraParams = {}) => {
    if (!activeDataset?.id || !classId) return;

    const task = taskMetaById.get(taskId);
    if (!isTaskExecutable(task)) {
      setTaskResults((prev) => ({
        ...prev,
        [taskId]: {
          error: getDisabledReason(task),
          taskId,
          availability: task?.availability,
        },
      }));
      return;
    }

    const params = {
      batch_id: activeDataset.id,
      class_id: classId,
      ...extraParams,
    };

    if (params.student_id && !params.enrollment_id) {
      const eid = resolveEnrollmentId(params.student_id);
      if (eid) params.enrollment_id = eid;
    }

    setLoadingTasks((prev) => new Set([...prev, taskId]));
    try {
      const result = await runAnalyticsTask(taskId, params);
      setTaskResults((prev) => ({ ...prev, [taskId]: result }));
    } catch (err) {
      console.error(`[AdminDashboard] Task ${taskId} failed:`, err.message);
      setTaskResults((prev) => ({ ...prev, [taskId]: { error: err.message, taskId } }));
    } finally {
      setLoadingTasks((prev) => {
        const next = new Set(prev);
        next.delete(taskId);
        return next;
      });
    }
  }, [activeDataset?.id, classId, resolveEnrollmentId, taskMetaById]);

  const activeTabObj = useMemo(() => WORKSPACE_TABS.find(t => t.id === currentTab), [currentTab]);
  
  const filteredTasks = useMemo(() => {
    if (!activeTabObj) return [];
    return uniqueAdminTasks.filter(t => activeTabObj.prefixes.includes(t.taskId));
  }, [uniqueAdminTasks, activeTabObj]);

  const currentTaskMeta = useMemo(() => taskMetaById.get(activeTaskId), [taskMetaById, activeTaskId]);
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
    if (ADMIN_BASIC_TASKS.includes(activeTaskId) || ADMIN_COHORT_TASKS.includes(activeTaskId)) {
      runTask(activeTaskId);
    } else if (ADMIN_SINGLE_STUDENT_TASKS.includes(activeTaskId)) {
      runTask(activeTaskId, { student_id: primaryStudentId });
    } else if (ADMIN_COMPARISON_TASKS.includes(activeTaskId)) {
      if (primaryStudentId && secondaryStudentId && primaryStudentId !== secondaryStudentId) {
        runTask(activeTaskId, { s1: primaryStudentId, s2: secondaryStudentId });
      }
    }
  };

  useEffect(() => {
    if (!availableTasksData || !activeDataset?.id || !classId) return;
    if (!isTaskExecutable(currentTaskMeta)) return;
    setTaskResults({});
    if (ADMIN_BASIC_TASKS.includes(activeTaskId)) {
      runTask(activeTaskId);
    }
  }, [availableTasksData, activeDataset?.id, classId, activeTaskId, runTask, currentTaskMeta]);

  useEffect(() => {
    if (!filteredTasks.length || !availableTasksData) return;
    const activeTask = filteredTasks.find(t => t.taskId === activeTaskId);
    if (isTaskExecutable(activeTask)) return;

    const firstExecutable = filteredTasks.find(isTaskExecutable);
    if (firstExecutable) setActiveTaskId(firstExecutable.taskId);
    else if (!activeTask) setActiveTaskId(filteredTasks[0].taskId);
  }, [filteredTasks, activeTaskId, availableTasksData]);

  useEffect(() => {
    setSelectedStudentId("");
    setSelectedCompareStudentId("");
  }, [classId]);

  useEffect(() => {
    if (!appLoading && !activeDataset) {
      navigate("/data-selection", { replace: true });
    }
  }, [appLoading, activeDataset, navigate]);

  if (appLoading || !activeDataset || isClassesLoading || isStudentsLoading || isAvailabilityLoading) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
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
          <button onClick={() => navigate("/data-selection")} className="mt-4 rounded border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
            Switch Dataset
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="workspace-fixed-layout h-screen max-h-screen bg-slate-100 p-3 flex flex-col overflow-hidden text-slate-700 font-sans">
      
      {/* Light Clean Header */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-white rounded-t-xl border-b border-slate-200 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-sm border border-blue-200">A</div>
          <div>
            <h1 className="text-sm font-bold text-slate-900">Admin Executive Report Canvas</h1>
            <p className="text-[10px] text-slate-500">Dataset: <span className="text-blue-600 font-semibold">{activeDataset.name}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={classId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            {classes.map((c) => (
              <option key={c.class_id} value={c.class_id}>
                {c.course_id} - {c.class_run} ({c.student_count} students)
              </option>
            ))}
          </select>
          <button onClick={() => navigate("/data-selection")} className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded px-3 py-1.5 transition-colors">Switch Dataset</button>
          <button onClick={() => navigate("/choose-role")} className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded px-3 py-1.5 hover:bg-slate-50 transition-colors">Switch Role</button>
        </div>
      </header>

      {/* Main Framework Grid */}
      <main className="flex-1 grid grid-cols-[340px_1fr] min-h-0 bg-white rounded-b-xl overflow-hidden shadow-sm border border-t-0 border-slate-200">
        
        {/* Left Control Side Panel */}
        <section className="border-r border-slate-200 flex flex-col min-h-0 bg-slate-50/50">
          
          {/* Category Tabs Menu Dropdown */}
          <div className="p-3 border-b border-slate-200 bg-white shrink-0">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Report Page / Analysis Category</label>
            <select
              value={currentTab}
              onChange={(e) => handleTabChange(e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold focus:outline-none focus:border-blue-500"
            >
              {WORKSPACE_TABS.map(tab => (
                <option key={tab.id} value={tab.id}>{tab.label}</option>
              ))}
            </select>
          </div>

          {/* Task Selection Rows Container */}
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
                      ? "border-blue-500 bg-blue-50/60 shadow-sm"
                      : executable
                        ? "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50"
                        : "border-slate-100 bg-slate-50 opacity-75"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <code className="shrink-0 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-mono font-bold text-blue-600 border border-blue-100">
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
                No admin tasks are available for this dataset/class.
              </div>
            )}
          </div>

          {/* Scope Controls Configuration Box */}
          <div className="border-t border-slate-200 bg-white p-3 shrink-0 space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Query Execution Scope</div>
            
            {ADMIN_SINGLE_STUDENT_TASKS.includes(activeTaskId) && (
              <div>
                <span className="block text-[10px] text-slate-400 font-medium mb-1">Target Student ID</span>
                <select value={primaryStudentId} onChange={(e) => setSelectedStudentId(e.target.value)} className="w-full rounded-lg bg-slate-50 border border-slate-200 px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500">
                  {students.map(s => <option key={s.student_id} value={s.student_id}>{s.student_id}</option>)}
                </select>
              </div>
            )}

            {ADMIN_COMPARISON_TASKS.includes(activeTaskId) && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="block text-[10px] text-slate-400 font-medium mb-1">Student 1 ID</span>
                  <select value={primaryStudentId} onChange={(e) => setSelectedStudentId(e.target.value)} className="w-full rounded-lg bg-slate-50 border border-slate-200 px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500">
                    {students.map(s => <option key={s.student_id} value={s.student_id}>{s.student_id}</option>)}
                  </select>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-medium mb-1">Student 2 ID</span>
                  <select value={secondaryStudentId} onChange={(e) => setSelectedCompareStudentId(e.target.value)} className="w-full rounded-lg bg-slate-50 border border-slate-200 px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500">
                    {students.map(s => <option key={s.student_id} value={s.student_id}>{s.student_id}</option>)}
                  </select>
                </div>
              </div>
            )}

            <button
              onClick={handleTriggerAnalysis}
              disabled={isCurrentTaskLoading || !isTaskExecutable(currentTaskMeta)}
              className="w-full rounded-lg py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all text-white shadow-sm"
            >
              {isCurrentTaskLoading ? "⚡ Analyzing Metrics..." : "🚀 Run Analysis View"}
            </button>
          </div>
        </section>

        {/* Right Output Visual Area Canvas */}
        <section className="flex flex-col min-h-0 bg-slate-50 p-4">
          {currentTaskMeta ? (
            <div className="h-full flex flex-col min-h-0 space-y-3">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shrink-0 shadow-sm">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 mr-2">{currentTaskMeta.taskId}</span>
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

              {/* Layout optimization: Grid with responsive columns, chart area takes up full space */}
              <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-3">
                
                {/* Chart Block Area Expanded */}
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

                {/* AI Explanation Side Cards Panel */}
                <div className="bg-white rounded-xl border border-slate-200 flex flex-col min-h-0 overflow-hidden shadow-sm">
                  <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"/>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">AI Narrative Analysis</h4>
                  </div>
                  <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3 text-slate-600">
                    {currentResult?.datasets ? (
                      <AIInsightPanel
                        taskId={currentResult.taskId}
                        executionId={currentResult.executionId}
                        datasets={currentResult.datasets}
                        meta={currentResult.meta}
                        studentContext={null}
                      />
                    ) : (
                      <div className="text-xs text-slate-400 italic text-center pt-12">Awaiting processing pipeline execution output results...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs italic">Select an administrative data node framework item from the sidebar registry.</div>
          )}
        </section>
      </main>
    </div>
  );
}
