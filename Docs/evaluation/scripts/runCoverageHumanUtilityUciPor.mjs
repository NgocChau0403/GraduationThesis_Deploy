import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";
const DATASET_ID = "SAMPLE_UCI_POR";
const OUTPUT_DIR = path.resolve("Docs/evaluation/automatic_logs");
const GROUNDTRUTH_DIR = path.resolve("Docs/evaluation/groundtruth_logs");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "coverage_human_utility_auto_SAMPLE_UCI_POR.json");
const RUBRIC_FILE = path.join(GROUNDTRUTH_DIR, "human_utility_rubric_SAMPLE_UCI_POR.csv");
const AI_LOG_FILE = path.resolve("Docs/evaluation/automatic_logs/ai_explanations_auto_SAMPLE_UCI_POR.json");

const TAXONOMY = {
  ui_views: ["student", "admin"],
  analytical_scopes: ["single student", "cohort", "comparison", "many students"],
  analysis_types: [
    "trend",
    "comparison",
    "distribution",
    "correlation",
    "risk",
    "behavioral",
    "ranking",
    "recommendation",
    "progress",
  ],
  visualization_types: [
    "line_chart",
    "bar_chart",
    "histogram",
    "scatter_plot",
    "pie_chart",
    "heatmap",
    "table",
    "card",
    "checklist",
  ],
  learning_constructs: [
    "performance",
    "engagement",
    "risk",
    "completion",
    "assessment",
    "background",
    "lifestyle",
    "support",
    "submission",
    "withdrawal",
  ],
};

const HUMAN_UTILITY_TARGET_COUNT = Number(process.env.HUMAN_UTILITY_TARGET_COUNT || 17);

async function requestJson(url, options = {}) {
  const startedAt = performance.now();
  let response;
  let body;

  try {
    response = await fetch(url, {
      ...options,
      headers: {
        "content-type": "application/json",
        ...(options.headers || {}),
      },
    });
    body = await response.json();
  } catch (error) {
    return {
      ok: false,
      httpStatus: response?.status ?? null,
      latencyMs: Math.round(performance.now() - startedAt),
      body: null,
      transportError: error.message,
    };
  }

  return {
    ok: response.ok,
    httpStatus: response.status,
    latencyMs: Math.round(performance.now() - startedAt),
    body,
    transportError: null,
  };
}

async function readJsonIfExists(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    return null;
  }
}

function pickPrimaryClass(classes = []) {
  return [...classes].sort((a, b) => (b.student_count || 0) - (a.student_count || 0))[0] || null;
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function countBy(items, getKey) {
  const counts = {};
  for (const item of items) {
    const raw = getKey(item);
    const key = raw === null || raw === undefined || raw === "" ? "unknown" : String(raw);
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));
}

function pct(part, total) {
  return total > 0 ? Number(((part / total) * 100).toFixed(2)) : null;
}

function hasTaxonomyMatch(task, category) {
  const haystack = [
    task.taskId,
    task.taskName,
    task.scope,
    task.actionableQuestion,
    task.explanation_strategy,
    task.analytics?.analysisType,
    task.analytics?.explanationType,
    task.aiPromptHint,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(category.toLowerCase());
}

function computeCategoryCoverage(tasks, categories, matcher) {
  const present = [];
  const missing = [];
  const counts = {};

  for (const category of categories) {
    const count = tasks.filter((task) => matcher(task, category)).length;
    counts[category] = count;
    if (count > 0) present.push(category);
    else missing.push(category);
  }

  return {
    total_categories: categories.length,
    covered_categories: present.length,
    coverage_rate: pct(present.length, categories.length),
    present,
    missing,
    counts,
  };
}

function getAnalysisType(task) {
  return task.analytics?.analysisType || task.analysisType || task.explanation_strategy || "unknown";
}

function getView(task) {
  if (task.taskId?.startsWith("S-")) return "student";
  if (task.taskId?.startsWith("A-")) return "admin";
  return "unknown";
}

function getAnalyticalScope(task) {
  const scope = normalizeText(task.scope);
  if (scope.includes("comparison") || task.taskId?.startsWith("A-C")) return "comparison";
  if (scope.includes("many")) return "many students";
  if (scope.includes("cohort") || task.taskId?.startsWith("A-B")) return "cohort";
  if (scope.includes("student") || task.taskId?.startsWith("S-") || task.taskId?.startsWith("A-S")) {
    return "single student";
  }
  return scope || "unknown";
}

function summarizeAvailability(validationResults = []) {
  const counts = countBy(validationResults, (item) => item.status);
  const total = validationResults.length;
  const runnable = (counts.executable || 0) + (counts.partial || 0) + (counts.insufficient_data || 0);

  return {
    total,
    counts,
    runnable_count: runnable,
    runnable_rate: pct(runnable, total),
    executable_rate: pct(counts.executable || 0, total),
    unsupported_rate: pct(counts.unsupported || 0, total),
  };
}

function extractValidationResults(validateAllBody) {
  if (Array.isArray(validateAllBody?.results)) return validateAllBody.results;
  return [];
}

function buildTaskRows(tasks, validationById) {
  return tasks.map((task) => {
    const taskId = task.taskId || task.id;
    const validation = validationById.get(taskId) || {};
    return {
      taskId,
      taskName: task.taskName || null,
      view: getView(task),
      analytical_scope: getAnalyticalScope(task),
      scope: task.scope || null,
      analysis_type: getAnalysisType(task),
      viz_type: task.viz_type || null,
      explanation_strategy: task.explanation_strategy || null,
      registry_status: task.registry_status || null,
      datasetCompatibility: task.datasetCompatibility || null,
      availability_status: validation.status || "unknown",
      confidence: validation.confidence ?? null,
      missing_requirements: validation.missing_requirements || [],
      warnings: validation.warnings || [],
    };
  });
}

function getRowCountFromDatasetsSummary(summary = {}) {
  return Object.values(summary).reduce((sum, item) => sum + (Number(item?.row_count) || 0), 0);
}

function scoreHumanUtilityReadiness(item) {
  let score = 0;
  const reasons = [];

  if (item.schema_pass) score += 1;
  else reasons.push("AI schema failed");

  if (item.degraded === false) score += 1;
  else reasons.push("AI response is degraded");

  if ((item.safety_flags_count || 0) === 0) score += 1;
  else reasons.push("Safety flags present");

  if ((item.explanation_preview?.summary || "").length >= 30) score += 1;
  else reasons.push("Summary too short or missing");

  if ((item.explanation_preview?.insight_count || 0) > 0 || (item.explanation_preview?.recommendation_count || 0) > 0) {
    score += 1;
  } else {
    reasons.push("No insight or recommendation");
  }

  if (getRowCountFromDatasetsSummary(item.datasets_summary) > 0) score += 1;
  else reasons.push("No source rows in analytics output");

  if (item.auto_faithfulness?.auto_faithfulness_pass) score += 1;
  else reasons.push("Automatic faithfulness review flagged this item");

  return {
    score,
    max_score: 7,
    readiness_rate: pct(score, 7),
    ready_for_human_review: score >= 5,
    reasons,
  };
}

function pickHumanUtilitySamples(aiLog, taskRows) {
  const aiResults = Array.isArray(aiLog?.results) ? aiLog.results : [];
  const taskMetaById = new Map(taskRows.map((task) => [task.taskId, task]));

  const enriched = aiResults
    .filter((item) => item.ai_attempted)
    .map((item) => {
      const taskMeta = taskMetaById.get(item.taskId) || {};
      const readiness = scoreHumanUtilityReadiness(item);
      return {
        ...item,
        view: taskMeta.view || item.scope || "unknown",
        analytical_scope: taskMeta.analytical_scope || item.scope || "unknown",
        analysis_type: taskMeta.analysis_type || item.explanation_strategy || "unknown",
        readiness,
      };
    })
    .sort((a, b) => {
      if (b.readiness.score !== a.readiness.score) return b.readiness.score - a.readiness.score;
      return String(a.taskId).localeCompare(String(b.taskId));
    });

  const selected = [];
  const wantedViews = ["student", "admin"];
  const wantedScopes = ["single student", "cohort", "many students", "comparison"];
  const wantedAnalysis = ["trend", "comparison", "distribution", "risk", "behavioral", "ranking", "recommendation", "progress"];

  for (const view of wantedViews) {
    const candidate = enriched.find((item) => !selected.includes(item) && normalizeText(item.view) === view);
    if (candidate) selected.push(candidate);
  }

  for (const scope of wantedScopes) {
    const candidate = enriched.find((item) => !selected.includes(item) && normalizeText(item.analytical_scope) === scope);
    if (candidate) selected.push(candidate);
  }

  for (const analysis of wantedAnalysis) {
    const candidate = enriched.find((item) =>
      !selected.includes(item)
      && normalizeText(item.analysis_type).includes(analysis)
    );
    if (candidate) selected.push(candidate);
  }

  for (const item of enriched) {
    if (selected.length >= HUMAN_UTILITY_TARGET_COUNT) break;
    if (!selected.includes(item)) selected.push(item);
  }

  return selected.slice(0, HUMAN_UTILITY_TARGET_COUNT);
}

function csvEscape(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function buildRubricCsv(samples) {
  const header = [
    "reviewer",
    "datasetId",
    "taskId",
    "taskName",
    "view",
    "analytical_scope",
    "analysis_type",
    "viz_type",
    "availability_status",
    "degraded",
    "safety_flags_count",
    "auto_faithfulness_pass",
    "readiness_rate",
    "summary_preview",
    "understandability_1_5",
    "relevance_1_5",
    "actionability_1_5",
    "trustworthiness_1_5",
    "usefulness_1_5",
    "cognitive_load_1_5",
    "overall_1_5",
    "comment",
  ];

  const rows = samples.map((item) => [
    "",
    DATASET_ID,
    item.taskId,
    item.taskName,
    item.view,
    item.analytical_scope,
    item.analysis_type,
    item.viz_type,
    item.availability_status,
    item.degraded,
    item.safety_flags_count,
    item.auto_faithfulness?.auto_faithfulness_pass,
    item.readiness.readiness_rate,
    item.explanation_preview?.summary || "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  return [
    header.map(csvEscape).join(","),
    ...rows.map((row) => row.map(csvEscape).join(",")),
  ].join("\n") + "\n";
}

function summarizeHumanUtilityPreparation(samples) {
  const ready = samples.filter((item) => item.readiness.ready_for_human_review);
  const schemaPassed = samples.filter((item) => item.schema_pass);
  const nonDegraded = samples.filter((item) => item.degraded === false);
  const safetyClean = samples.filter((item) => (item.safety_flags_count || 0) === 0);
  const faithfulnessClean = samples.filter((item) => item.auto_faithfulness?.auto_faithfulness_pass);

  return {
    sample_count: samples.length,
    ready_for_human_review_count: ready.length,
    ready_for_human_review_rate: pct(ready.length, samples.length),
    schema_pass_rate: pct(schemaPassed.length, samples.length),
    non_degraded_rate: pct(nonDegraded.length, samples.length),
    safety_clean_rate: pct(safetyClean.length, samples.length),
    auto_faithfulness_clean_rate: pct(faithfulnessClean.length, samples.length),
    rubric_file: RUBRIC_FILE,
    note:
      "Human utility still requires manual scoring in the CSV rubric. Auto metrics only prepare and screen examples.",
  };
}

async function main() {
  const startedAt = new Date();

  const tasksRes = await requestJson(`${BACKEND_URL}/api/tasks?includeExperimental=true`);
  if (!tasksRes.ok || !Array.isArray(tasksRes.body?.tasks)) {
    throw new Error(`Cannot fetch task registry. Status: ${tasksRes.httpStatus}`);
  }
  const tasks = tasksRes.body.tasks;

  const classesRes = await requestJson(`${BACKEND_URL}/api/classes?batchId=${encodeURIComponent(DATASET_ID)}`);
  if (!classesRes.ok || !Array.isArray(classesRes.body?.classes)) {
    throw new Error(`Cannot fetch classes for ${DATASET_ID}. Status: ${classesRes.httpStatus}`);
  }
  const classInfo = pickPrimaryClass(classesRes.body.classes);
  if (!classInfo?.class_id) throw new Error(`No class found for ${DATASET_ID}.`);

  const validateAllUrl = `${BACKEND_URL}/api/tasks/validate/${encodeURIComponent(DATASET_ID)}?classId=${encodeURIComponent(classInfo.class_id)}`;
  const validateAllRes = await requestJson(validateAllUrl);
  if (!validateAllRes.ok) {
    throw new Error(`Cannot validate tasks for ${DATASET_ID}. Status: ${validateAllRes.httpStatus}`);
  }

  const validationResults = extractValidationResults(validateAllRes.body);
  const validationById = new Map(validationResults.map((item) => [item.taskId || item.task_id || item.id, item]));
  const taskRows = buildTaskRows(tasks, validationById);

  const coverage = {
    total_tasks: tasks.length,
    exposed_registry_count: tasksRes.body.count ?? tasks.length,
    class_context: classInfo,
    by_view: countBy(taskRows, (task) => task.view),
    by_analytical_scope: countBy(taskRows, (task) => task.analytical_scope),
    by_scope: countBy(taskRows, (task) => task.scope),
    by_analysis_type: countBy(taskRows, (task) => task.analysis_type),
    by_viz_type: countBy(taskRows, (task) => task.viz_type),
    by_explanation_strategy: countBy(taskRows, (task) => task.explanation_strategy),
    by_registry_status: countBy(taskRows, (task) => task.registry_status),
    by_dataset_compatibility: countBy(taskRows, (task) => task.datasetCompatibility),
    availability: summarizeAvailability(validationResults),
    taxonomy_coverage: {
      ui_views: computeCategoryCoverage(taskRows, TAXONOMY.ui_views, (task, category) =>
        normalizeText(task.view) === category
      ),
      analytical_scopes: computeCategoryCoverage(taskRows, TAXONOMY.analytical_scopes, (task, category) =>
        normalizeText(task.analytical_scope) === category
      ),
      analysis_types: computeCategoryCoverage(taskRows, TAXONOMY.analysis_types, (task, category) =>
        normalizeText(task.analysis_type).includes(category)
      ),
      visualization_types: computeCategoryCoverage(taskRows, TAXONOMY.visualization_types, (task, category) =>
        normalizeText(task.viz_type) === category
      ),
      learning_constructs: computeCategoryCoverage(tasks, TAXONOMY.learning_constructs, hasTaxonomyMatch),
    },
    task_rows: taskRows,
  };

  const aiLog = await readJsonIfExists(AI_LOG_FILE);
  const humanUtilitySamples = pickHumanUtilitySamples(aiLog, taskRows);
  const humanUtility = {
    ai_log_available: Boolean(aiLog),
    ai_log_file: AI_LOG_FILE,
    preparation_metrics: summarizeHumanUtilityPreparation(humanUtilitySamples),
    samples: humanUtilitySamples.map((item) => ({
      datasetId: DATASET_ID,
      taskId: item.taskId,
      taskName: item.taskName,
      view: item.view,
      analytical_scope: item.analytical_scope,
      analysis_type: item.analysis_type,
      viz_type: item.viz_type,
      availability_status: item.availability_status,
      degraded: item.degraded,
      schema_pass: item.schema_pass,
      safety_flags_count: item.safety_flags_count,
      auto_faithfulness_pass: item.auto_faithfulness?.auto_faithfulness_pass ?? null,
      readiness: item.readiness,
      explanation_preview: item.explanation_preview,
      datasets_summary: item.datasets_summary,
    })),
  };

  const output = {
    evaluation_part: "coverage_and_human_utility",
    datasetId: DATASET_ID,
    backend_url: BACKEND_URL,
    generated_at: new Date().toISOString(),
    duration_ms: Date.now() - startedAt.getTime(),
    coverage,
    human_utility: humanUtility,
  };

  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(GROUNDTRUTH_DIR, { recursive: true });
  await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  await writeFile(RUBRIC_FILE, buildRubricCsv(humanUtilitySamples), "utf8");

  console.log(`Coverage + human utility auto log written: ${OUTPUT_FILE}`);
  console.log(`Human utility rubric CSV written: ${RUBRIC_FILE}`);
  console.log(JSON.stringify({
    total_tasks: coverage.total_tasks,
    availability: coverage.availability,
    taxonomy_coverage: {
      ui_views: coverage.taxonomy_coverage.ui_views.coverage_rate,
      analytical_scopes: coverage.taxonomy_coverage.analytical_scopes.coverage_rate,
      analysis_types: coverage.taxonomy_coverage.analysis_types.coverage_rate,
      visualization_types: coverage.taxonomy_coverage.visualization_types.coverage_rate,
      learning_constructs: coverage.taxonomy_coverage.learning_constructs.coverage_rate,
    },
    human_utility_preparation: humanUtility.preparation_metrics,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
