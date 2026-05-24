import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { useTaskRegistry } from "../hooks/useTaskRegistry";
import { runAnalyticsTask, fetchClasses, getStudents } from "../services/analyticsApi";
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

function getCompatFilter(datasetSource) {
  if (!datasetSource) return () => true;
  const src = datasetSource.toUpperCase();
  return (task) =>
    task.datasetCompatibility === "both" ||
    task.datasetCompatibility === `${src}_only`;
}

const WORKSPACE_TABS = [
  { id: "admin_basic", label: "Admin - Basic Tasks", prefixes: ADMIN_BASIC_TASKS },
  { id: "admin_single", label: "Admin - Single Student Tasks", prefixes: ADMIN_SINGLE_STUDENT_TASKS },
  { id: "admin_compare", label: "Admin - Comparison Tasks", prefixes: ADMIN_COMPARISON_TASKS },
  { id: "admin_cohort", label: "Admin - Cohort Tasks", prefixes: ADMIN_COHORT_TASKS },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { activeDataset, isLoading: appLoading } = useAppContext();
  const [currentTab, setCurrentTab] = useState("admin_basic");
  const [activeTaskId, setActiveTaskId] = useState(ADMIN_BASIC_TASKS[0]);

  const datasetSource = activeDataset?.source ?? null;
  const isCompatible = useMemo(() => getCompatFilter(datasetSource), [datasetSource]);

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

  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedCompareStudentId, setSelectedCompareStudentId] = useState("");

  const primaryStudentId = selectedStudentId || students[0]?.student_id || "";
  const secondaryStudentId = selectedCompareStudentId || students.find((s) => s.student_id !== primaryStudentId)?.student_id || "";

  const { tasks: allTasksRaw } = useTaskRegistry();
  const uniqueAdminTasks = useMemo(() => 
    allTasksRaw
      .filter((task) => ADMIN_ALLOWED_TASK_IDS.has(task.taskId))
      .filter(isCompatible)
      .filter((task, idx, arr) => arr.findIndex((t) => t.taskId === task.taskId) === idx),
    [allTasksRaw, isCompatible]
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
  }, [activeDataset?.id, classId, resolveEnrollmentId]);

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
    if (!activeDataset?.id || !classId) return;
    setTaskResults({});
    if (ADMIN_BASIC_TASKS.includes(activeTaskId)) {
      runTask(activeTaskId);
    }
  }, [activeDataset?.id, classId, activeTaskId, runTask]);

  useEffect(() => {
    setSelectedStudentId("");
    setSelectedCompareStudentId("");
  }, [classId]);

  useEffect(() => {
    if (!appLoading && !activeDataset) {
      navigate("/data-selection", { replace: true });
    }
  }, [appLoading, activeDataset, navigate]);

  if (appLoading || !activeDataset || isClassesLoading || isStudentsLoading) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
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
            {filteredTasks.map((task) => (
              <button
                key={task.taskId}
                onClick={() => setActiveTaskId(task.taskId)}
                className={`w-full rounded-lg border p-2.5 text-left transition-all block ${
                  activeTaskId === task.taskId
                    ? "border-blue-500 bg-blue-50/60 shadow-sm"
                    : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start gap-2">
                  <code className="shrink-0 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-mono font-bold text-blue-600 border border-blue-100">
                    {task.taskId}
                  </code>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-slate-800">{task.taskName}</p>
                    <p className="mt-0.5 text-[10px] text-slate-400 truncate font-medium">{task.actionableQuestion}</p>
                  </div>
                </div>
              </button>
            ))}
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
              disabled={isCurrentTaskLoading}
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
                <p className="text-xs text-slate-500 mt-1 font-medium">{currentTaskMeta.actionableQuestion}</p>
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
                      error={currentResult?.error ?? null}
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