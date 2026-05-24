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

function taskIdSet(ids) {
  return new Set(ids);
}

const SINGLE_TASK_ID_SET = taskIdSet(ADMIN_SINGLE_STUDENT_TASKS);
const COMPARE_TASK_ID_SET = taskIdSet(ADMIN_COMPARISON_TASKS);
const COHORT_TASK_ID_SET = taskIdSet(ADMIN_COHORT_TASKS);

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { activeDataset, isLoading: appLoading } = useAppContext();

  const datasetSource = activeDataset?.source ?? null;
  const isCompatible = useMemo(
    () => getCompatFilter(datasetSource),
    [datasetSource]
  );

  const {
    data: classesData,
    isLoading: isClassesLoading,
    isError: isClassesError,
    error: classesQueryError,
  } = useQuery({
    queryKey: ["classes", activeDataset?.id],
    queryFn: () => fetchClasses(activeDataset?.id),
    enabled: !!activeDataset?.id,
  });
  const classesError = classesData?.success === false ? new Error(classesData?.message || "Failed to load classes.") : null;
  const classes = classesData?.classes ?? [];

  const [selectedClassId, setSelectedClassId] = useState("");
  const classId = selectedClassId || classes[0]?.class_id || "";

  const {
    data: studentsData,
    isLoading: isStudentsLoading,
    isError: isStudentsError,
    error: studentsQueryError,
  } = useQuery({
    queryKey: ["students", activeDataset?.id, classId],
    queryFn: () => getStudents(activeDataset?.id, classId),
    enabled: !!activeDataset?.id && !!classId,
  });
  const studentsError = studentsData?.success === false ? new Error(studentsData?.message || "Failed to load students.") : null;
  const students = studentsData?.students ?? [];

  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedCompareStudentId, setSelectedCompareStudentId] = useState("");

  const primaryStudentId = selectedStudentId || students[0]?.student_id || "";
  const secondaryStudentId =
    selectedCompareStudentId ||
    students.find((s) => s.student_id !== primaryStudentId)?.student_id ||
    "";

  const { tasks: allTasksRaw } = useTaskRegistry();
  const uniqueAdminTasks = useMemo(
    () =>
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

  const basicTaskIds = useMemo(
    () => ADMIN_BASIC_TASKS.filter((taskId) => taskMetaById.has(taskId)),
    [taskMetaById]
  );

  const [taskResults, setTaskResults] = useState({});
  const [loadingTasks, setLoadingTasks] = useState(new Set());
  const [showExplore, setShowExplore] = useState(false);

  const resolveEnrollmentId = useCallback(
    (studentId) => students.find((s) => s.student_id === studentId)?.enrollment_id ?? null,
    [students]
  );

  const runTask = useCallback(
    async (taskId, extraParams = {}) => {
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
        setTaskResults((prev) => ({
          ...prev,
          [taskId]: { error: err.message, taskId },
        }));
      } finally {
        setLoadingTasks((prev) => {
          const next = new Set(prev);
          next.delete(taskId);
          return next;
        });
      }
    },
    [activeDataset?.id, classId, resolveEnrollmentId]
  );

  useEffect(() => {
    if (!activeDataset?.id || !classId) return;
    setTaskResults({});
    basicTaskIds.forEach((taskId) => runTask(taskId));
  }, [activeDataset?.id, classId, basicTaskIds, runTask]);

  useEffect(() => {
    setSelectedStudentId("");
    setSelectedCompareStudentId("");
  }, [classId]);

  useEffect(() => {
    // Chỉ redirect khi đã load xong (appLoading = false) và thực sự không có dataset.
    // Không redirect trong khi đang loading để tránh race condition gây màn hình trắng.
    if (!appLoading && !activeDataset) {
      navigate("/data-selection", { replace: true });
    }
  }, [appLoading, activeDataset, navigate]);

  const getTaskMeta = (taskId) => taskMetaById.get(taskId);

  const displayedTaskIds = [
    ...basicTaskIds,
    ...Object.keys(taskResults).filter((id) => !basicTaskIds.includes(id)),
  ];

  const singleStudentTasks = uniqueAdminTasks.filter(
    (task) => SINGLE_TASK_ID_SET.has(task.taskId) && !taskResults[task.taskId]
  );
  const comparisonTasks = uniqueAdminTasks.filter(
    (task) => COMPARE_TASK_ID_SET.has(task.taskId) && !taskResults[task.taskId]
  );
  const cohortTasks = uniqueAdminTasks.filter(
    (task) => COHORT_TASK_ID_SET.has(task.taskId) && !basicTaskIds.includes(task.taskId) && !taskResults[task.taskId]
  );

  const availableExploreCount =
    singleStudentTasks.length + comparisonTasks.length + cohortTasks.length;

  const runSingleStudentTask = (taskId) => {
    if (!primaryStudentId) return;
    runTask(taskId, { student_id: primaryStudentId });
  };

  const runComparisonTask = (taskId) => {
    if (!primaryStudentId || !secondaryStudentId || primaryStudentId === secondaryStudentId) return;
    runTask(taskId, { s1: primaryStudentId, s2: secondaryStudentId });
  };

  const runCohortTask = (taskId) => {
    runTask(taskId);
  };

  // Hiện spinner trong 2 trường hợp:
  //   1. App đang load lần đầu (appLoading = true)
  //   2. Đã load xong nhưng chưa có dataset (sẽ bị redirect bởi useEffect phía trên)
  if (appLoading || !activeDataset) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (isClassesLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (isClassesError || classesQueryError || classesError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-200 text-center max-w-md">
          <h2 className="text-xl font-bold text-red-700 mb-2">Failed to load classes</h2>
          <p className="text-slate-500">{(classesQueryError || classesError)?.message}</p>
        </div>
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md">
          <h2 className="text-xl font-bold text-slate-800 mb-2">No classes found for active dataset</h2>
          <p className="text-slate-500">Please switch dataset or import data with class records.</p>
        </div>
      </div>
    );
  }

  if (isStudentsError || studentsQueryError || studentsError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-200 text-center max-w-md">
          <h2 className="text-xl font-bold text-red-700 mb-2">Failed to load students</h2>
          <p className="text-slate-500">{(studentsQueryError || studentsError)?.message}</p>
        </div>
      </div>
    );
  }

  if (isStudentsLoading && classId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (classId && students.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md">
          <h2 className="text-xl font-bold text-slate-800 mb-2">No students found for selected class</h2>
          <p className="text-slate-500">Please choose another class or refresh imported data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg">
            A
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Admin Dashboard</h1>
            <p className="text-xs font-medium text-slate-500">
              Dataset: <span className="text-blue-600">{activeDataset.name}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={classId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          >
            {classes.length === 0 && <option value="">No classes</option>}
            {classes.map((c) => (
              <option key={c.class_id} value={c.class_id}>
                {c.course_id} - {c.class_run} ({c.student_count} students)
              </option>
            ))}
          </select>
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

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {displayedTaskIds.map((taskId) => {
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
                  error={result?.error ?? null}
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

        {availableExploreCount > 0 && (
          <div className="border-t border-slate-200 pt-6">
            <button
              onClick={() => setShowExplore(!showExplore)}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>{showExplore ? "v" : ">"}</span>
              Explore More ({availableExploreCount} tasks)
            </button>

            {showExplore && (
              <div className="space-y-6 mt-4">
                {singleStudentTasks.length > 0 && (
                  <section className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold text-slate-800">Single Student Deep Dive</h3>
                      <select
                        value={primaryStudentId}
                        onChange={(e) => setSelectedStudentId(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700"
                      >
                        {students.length === 0 && <option value="">No students</option>}
                        {students.map((s) => (
                          <option key={s.student_id} value={s.student_id}>
                            {s.student_id}
                          </option>
                        ))}
                      </select>
                    </div>
                    <TaskCardGrid
                      tasks={singleStudentTasks}
                      loadingTasks={loadingTasks}
                      onRun={runSingleStudentTask}
                    />
                  </section>
                )}

                {comparisonTasks.length > 0 && (
                  <section className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold text-slate-800">Comparison Tasks (2 students)</h3>
                      <div className="flex gap-2">
                        <select
                          value={primaryStudentId}
                          onChange={(e) => setSelectedStudentId(e.target.value)}
                          className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700"
                        >
                          {students.length === 0 && <option value="">No students</option>}
                          {students.map((s) => (
                            <option key={s.student_id} value={s.student_id}>
                              {s.student_id}
                            </option>
                          ))}
                        </select>
                        <select
                          value={secondaryStudentId}
                          onChange={(e) => setSelectedCompareStudentId(e.target.value)}
                          className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-700"
                        >
                          {students.length === 0 && <option value="">No students</option>}
                          {students.map((s) => (
                            <option key={s.student_id} value={s.student_id}>
                              {s.student_id}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <TaskCardGrid
                      tasks={comparisonTasks}
                      loadingTasks={loadingTasks}
                      onRun={runComparisonTask}
                      disabled={!primaryStudentId || !secondaryStudentId || primaryStudentId === secondaryStudentId}
                    />
                  </section>
                )}

                {cohortTasks.length > 0 && (
                  <section className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-800">Cohort / Group Analysis Tasks</h3>
                    <TaskCardGrid
                      tasks={cohortTasks}
                      loadingTasks={loadingTasks}
                      onRun={runCohortTask}
                    />
                  </section>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function TaskCardGrid({ tasks, loadingTasks, onRun, disabled = false }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {tasks.map((task) => (
        <button
          key={task.taskId}
          onClick={() => onRun(task.taskId)}
          disabled={disabled || loadingTasks.has(task.taskId)}
          className="text-left p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all group disabled:opacity-60"
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
  );
}
