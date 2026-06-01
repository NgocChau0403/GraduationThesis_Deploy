import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";
const DATASET_ID = "SAMPLE_UCI_POR";
const OUTPUT_DIR = path.resolve("Docs/evaluation/automatic_logs");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "ai_explanations_auto_SAMPLE_UCI_POR.json");

const DEFAULT_TASK_IDS = [
  "S-B02",
  "S-T01",
  "S-T02",
  "S-T03",
  "S-T07",
  "S-T09",
  "S-T13",
  "S-T14",
  "S-T15",
  "S-T16",
  "A-B01",
  "A-B02",
  "A-B03",
  "A-B04",
  "A-G05",
  "A-G12",
  "A-G13",
];

const TASK_IDS = (process.env.AI_EVAL_TASKS || DEFAULT_TASK_IDS.join(","))
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

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

function pickPrimaryClass(classes = []) {
  return [...classes].sort((a, b) => (b.student_count || 0) - (a.student_count || 0))[0] || null;
}

function buildRunParams({ classInfo, students }) {
  const first = students[0] || {};
  const second = students.find((student) => student.student_id !== first.student_id) || students[1] || {};

  return {
    batch_id: DATASET_ID,
    class_id: classInfo?.class_id || null,
    student_id: first.student_id || null,
    enrollment_id: first.enrollment_id || null,
    s1: first.student_id || null,
    s2: second.student_id || null,
  };
}

function buildStudentContext(student, summary) {
  if (!student) return null;
  return {
    student_id: student.student_id ?? null,
    enrollment_id: student.enrollment_id ?? null,
    class_id: student.class_id ?? null,
    gender: student.gender ?? null,
    age_group: student.age_group ?? null,
    final_outcome: student.final_outcome ?? null,
    avg_score: summary?.performance?.avg_score ?? null,
    pass_rate: summary?.performance?.pass_rate ?? null,
    assessment_count: summary?.performance?.assessment_count ?? null,
  };
}

function summarizeDatasets(datasets) {
  if (!datasets || typeof datasets !== "object" || Array.isArray(datasets)) return {};
  const summary = {};
  for (const [label, rows] of Object.entries(datasets)) {
    if (!Array.isArray(rows)) continue;
    const columns = rows.length > 0 && rows[0] && typeof rows[0] === "object"
      ? Object.keys(rows[0])
      : [];
    const nullRows = rows.filter((row) => {
      if (!row || typeof row !== "object") return false;
      return Object.values(row).some((value) => value === null || value === undefined || value === "");
    }).length;

    summary[label] = {
      row_count: rows.length,
      columns,
      null_row_count: nullRows,
      sample_rows: rows.slice(0, 3),
    };
  }
  return summary;
}

function flattenExplanationText(aiResponse) {
  const explanation = aiResponse?.explanation || {};
  const parts = [];

  if (explanation.summary) parts.push(explanation.summary);
  for (const insight of explanation.insights || []) {
    parts.push(insight.title, insight.description);
    for (const evidence of insight.evidence || []) {
      parts.push(evidence.metric, evidence.value, evidence.comparison, evidence.delta, evidence.context);
    }
  }
  for (const item of explanation.educational_implications || []) parts.push(item);
  for (const rec of explanation.recommendations || []) {
    parts.push(rec.priority, rec.action, rec.rationale);
  }
  for (const warning of explanation.warnings || []) parts.push(warning);

  return parts
    .filter((item) => item !== null && item !== undefined)
    .map(String)
    .join("\n");
}

function collectDatasetFields(datasets) {
  const fields = new Set();
  for (const rows of Object.values(datasets || {})) {
    if (!Array.isArray(rows)) continue;
    for (const row of rows) {
      if (!row || typeof row !== "object") continue;
      for (const key of Object.keys(row)) fields.add(key);
    }
  }
  return fields;
}

function collectDatasetNumbers(datasets) {
  const values = [];
  for (const rows of Object.values(datasets || {})) {
    if (!Array.isArray(rows)) continue;
    for (const row of rows) {
      if (!row || typeof row !== "object") continue;
      for (const value of Object.values(row)) {
        const n = Number(value);
        if (Number.isFinite(n)) values.push(n);
      }
    }
  }
  return values;
}

function findNumericSuspects(text, datasets) {
  const sourceNumbers = collectDatasetNumbers(datasets);
  if (sourceNumbers.length === 0) return [];

  const matches = String(text).match(/-?\d+(?:\.\d+)?%?/g) || [];
  const suspects = [];
  for (const raw of matches) {
    const value = Number(raw.replace("%", ""));
    if (!Number.isFinite(value)) continue;
    if (Math.abs(value) <= 5) continue;

    const existsInSource = sourceNumbers.some((source) => {
      return Math.abs(source - value) <= 0.01 || Math.abs(Math.round(source) - value) <= 0.01;
    });

    if (!existsInSource && !suspects.includes(raw)) suspects.push(raw);
  }

  return suspects.slice(0, 20);
}

function findUnsupportedFieldMentions(text, datasets) {
  const sourceFields = collectDatasetFields(datasets);
  const knownTerms = {
    engagement: ["engagement", "click", "activity", "resource", "platform"],
    attendance: ["attendance", "absence", "absences"],
    demographic: ["gender", "age", "socioeconomic", "disability", "family"],
    lifestyle: ["lifestyle", "studytime", "support", "social"],
  };

  const lower = String(text).toLowerCase();
  const unsupported = [];
  for (const [group, terms] of Object.entries(knownTerms)) {
    const mentioned = terms.some((term) => lower.includes(term));
    if (!mentioned) continue;
    const backedByField = [...sourceFields].some((field) => {
      const f = field.toLowerCase();
      return terms.some((term) => f.includes(term));
    });
    if (!backedByField) unsupported.push(group);
  }
  return unsupported;
}

function findUnsupportedDemographicClaims(text) {
  const lower = String(text).toLowerCase();
  const demographicTerms = ["gender", "male", "female", "age", "socioeconomic", "disability", "family"];
  const claimTerms = ["causes", "cause", "because of", "due to", "proves", "determines", "responsible for"];
  const hasDemo = demographicTerms.some((term) => lower.includes(term));
  const hasCausalClaim = claimTerms.some((term) => lower.includes(term));
  return hasDemo && hasCausalClaim;
}

function validateAiSchema(body) {
  const explanation = body?.explanation;
  const confidence = body?.confidence;
  const meta = body?.meta;

  const checks = {
    has_task_id: typeof body?.task_id === "string" && body.task_id.length > 0,
    has_execution_id: typeof body?.execution_id === "string" && body.execution_id.length > 0,
    degraded_is_boolean: typeof body?.degraded === "boolean",
    has_explanation_object: explanation && typeof explanation === "object" && !Array.isArray(explanation),
    summary_is_string: typeof explanation?.summary === "string",
    insights_array: Array.isArray(explanation?.insights),
    educational_implications_array: Array.isArray(explanation?.educational_implications),
    recommendations_array: Array.isArray(explanation?.recommendations),
    warnings_array: Array.isArray(explanation?.warnings),
    has_confidence_object: confidence && typeof confidence === "object" && !Array.isArray(confidence),
    safety_flags_array: Array.isArray(body?.safety_flags),
    has_meta_object: meta && typeof meta === "object" && !Array.isArray(meta),
    meta_has_latency: Object.prototype.hasOwnProperty.call(meta || {}, "latency_ms"),
    degraded_shape_valid:
      body?.degraded !== true
      || (
        explanation?.summary === "AI explanation is temporarily unavailable."
        && Array.isArray(explanation?.warnings)
        && explanation.warnings.length > 0
      ),
  };

  return {
    schema_pass: Object.values(checks).every(Boolean),
    checks,
  };
}

function evaluateAutomaticFaithfulness({ aiResponse, datasets }) {
  const text = flattenExplanationText(aiResponse);
  const numericSuspects = aiResponse?.degraded ? [] : findNumericSuspects(text, datasets);
  const unsupportedFieldMentions = aiResponse?.degraded ? [] : findUnsupportedFieldMentions(text, datasets);
  const unsupportedDemographicClaim = aiResponse?.degraded
    ? false
    : findUnsupportedDemographicClaims(text);

  return {
    text_length: text.length,
    numeric_suspect_values: numericSuspects,
    unsupported_field_mentions: unsupportedFieldMentions,
    unsupported_demographic_claim: unsupportedDemographicClaim,
    auto_faithfulness_pass:
      numericSuspects.length === 0
      && unsupportedFieldMentions.length === 0
      && unsupportedDemographicClaim === false,
  };
}

function summarizeMetrics(results) {
  const attempted = results.filter((item) => item.ai_attempted);
  const schemaPassed = attempted.filter((item) => item.schema_pass);
  const degraded = attempted.filter((item) => item.degraded);
  const nonDegraded = attempted.filter((item) => item.degraded === false);
  const safetyFlagged = attempted.filter((item) => item.safety_flags_count > 0);
  const autoFaithful = attempted.filter((item) => item.auto_faithfulness?.auto_faithfulness_pass);
  const skippedAnalytics = results.filter((item) => item.skip_reason === "analytics_api_failed_or_not_success");
  const latencies = attempted.map((item) => item.ai_latency_ms).filter(Number.isFinite);
  const costs = attempted.map((item) => item.cost_usd).filter(Number.isFinite);
  const tokens = attempted.map((item) => item.total_tokens).filter(Number.isFinite);

  const pct = (part, total) => total > 0 ? Number(((part / total) * 100).toFixed(2)) : null;
  const avg = (arr) => arr.length > 0
    ? Number((arr.reduce((sum, value) => sum + value, 0) / arr.length).toFixed(2))
    : null;

  return {
    selected_task_count: results.length,
    ai_attempted_count: attempted.length,
    skipped_by_analytics_count: skippedAnalytics.length,
    ai_response_rate: pct(attempted.length, results.length),
    schema_pass_count: schemaPassed.length,
    schema_pass_rate: pct(schemaPassed.length, attempted.length),
    degraded_count: degraded.length,
    degraded_rate: pct(degraded.length, attempted.length),
    non_degraded_count: nonDegraded.length,
    safety_flagged_count: safetyFlagged.length,
    safety_flag_rate: pct(safetyFlagged.length, attempted.length),
    auto_faithfulness_pass_count: autoFaithful.length,
    auto_faithfulness_pass_rate: pct(autoFaithful.length, attempted.length),
    avg_ai_latency_ms: avg(latencies),
    avg_total_tokens: avg(tokens),
    avg_cost_usd: avg(costs),
  };
}

async function main() {
  const startedAt = new Date();

  const tasksRes = await requestJson(`${BACKEND_URL}/api/tasks?includeExperimental=true`);
  if (!tasksRes.ok || !Array.isArray(tasksRes.body?.tasks)) {
    throw new Error(`Cannot fetch tasks. Status: ${tasksRes.httpStatus}`);
  }
  const taskById = new Map(tasksRes.body.tasks.map((task) => [task.taskId || task.id, task]));

  const classesRes = await requestJson(`${BACKEND_URL}/api/classes?batchId=${encodeURIComponent(DATASET_ID)}`);
  if (!classesRes.ok || !Array.isArray(classesRes.body?.classes)) {
    throw new Error(`Cannot fetch classes for ${DATASET_ID}. Status: ${classesRes.httpStatus}`);
  }
  const classInfo = pickPrimaryClass(classesRes.body.classes);
  if (!classInfo?.class_id) throw new Error(`No class found for ${DATASET_ID}.`);

  const studentsUrl = `${BACKEND_URL}/api/students?batchId=${encodeURIComponent(DATASET_ID)}&classId=${encodeURIComponent(classInfo.class_id)}&pageSize=200`;
  const studentsRes = await requestJson(studentsUrl);
  if (!studentsRes.ok || !Array.isArray(studentsRes.body?.students)) {
    throw new Error(`Cannot fetch students for ${DATASET_ID}/${classInfo.class_id}. Status: ${studentsRes.httpStatus}`);
  }

  const firstStudent = studentsRes.body.students[0] || null;
  const summaryRes = firstStudent?.student_id
    ? await requestJson(`${BACKEND_URL}/api/students/${encodeURIComponent(firstStudent.student_id)}/summary?batchId=${encodeURIComponent(DATASET_ID)}&classId=${encodeURIComponent(classInfo.class_id)}`)
    : { body: null };

  const params = buildRunParams({ classInfo, students: studentsRes.body.students });
  const studentContext = buildStudentContext(firstStudent, summaryRes.body);
  const results = [];

  for (const taskId of TASK_IDS) {
    const task = taskById.get(taskId) || {};
    const validateUrl = `${BACKEND_URL}/api/tasks/validate-one/${encodeURIComponent(taskId)}?datasetId=${encodeURIComponent(DATASET_ID)}&classId=${encodeURIComponent(classInfo.class_id)}`;
    const validation = await requestJson(validateUrl);
    const availability = validation.body?.result || null;
    const availabilityStatus = availability?.status || "validation_failed";

    const baseRecord = {
      datasetId: DATASET_ID,
      taskId,
      taskName: task.taskName || null,
      scope: task.scope || null,
      viz_type: task.viz_type || null,
      explanation_strategy: task.explanation_strategy || null,
      availability_status: availabilityStatus,
      validation_http_status: validation.httpStatus,
      ai_attempted: false,
      manual_review_required: true,
    };

    if (availabilityStatus === "unsupported") {
      results.push({
        ...baseRecord,
        skip_reason: "task_unsupported_by_dataset",
      });
      continue;
    }

    const analyticsRes = await requestJson(`${BACKEND_URL}/api/analytics/run`, {
      method: "POST",
      body: JSON.stringify({ taskId, params }),
    });

    if (analyticsRes.httpStatus !== 200 || analyticsRes.body?.success !== true) {
      results.push({
        ...baseRecord,
        analytics_http_status: analyticsRes.httpStatus,
        analytics_error: analyticsRes.transportError || analyticsRes.body?.error || null,
        skip_reason: "analytics_api_failed_or_not_success",
      });
      continue;
    }

    const aiRes = await requestJson(`${BACKEND_URL}/api/ai/explain`, {
      method: "POST",
      body: JSON.stringify({
        taskId,
        executionId: analyticsRes.body.executionId,
        datasets: analyticsRes.body.datasets,
        meta: analyticsRes.body.meta,
        studentContext,
      }),
    });

    const schema = validateAiSchema(aiRes.body);
    const autoFaithfulness = evaluateAutomaticFaithfulness({
      aiResponse: aiRes.body,
      datasets: analyticsRes.body.datasets,
    });
    const tokenUsage = aiRes.body?.meta?.token_usage || null;

    results.push({
      ...baseRecord,
      ai_attempted: true,
      analytics_http_status: analyticsRes.httpStatus,
      executionId: analyticsRes.body.executionId,
      datasets_summary: summarizeDatasets(analyticsRes.body.datasets),
      ai_http_status: aiRes.httpStatus,
      ai_transport_error: aiRes.transportError,
      degraded: aiRes.body?.degraded ?? null,
      schema_pass: schema.schema_pass,
      schema_checks: schema.checks,
      auto_faithfulness: autoFaithfulness,
      safety_flags: aiRes.body?.safety_flags || [],
      safety_flags_count: Array.isArray(aiRes.body?.safety_flags) ? aiRes.body.safety_flags.length : 0,
      ai_latency_ms: aiRes.latencyMs,
      python_latency_ms: aiRes.body?.meta?.latency_ms ?? null,
      model: aiRes.body?.meta?.model ?? null,
      token_usage: tokenUsage,
      total_tokens: tokenUsage?.total_tokens ?? null,
      cost_usd: aiRes.body?.meta?.cost_usd ?? null,
      explanation_preview: {
        summary: aiRes.body?.explanation?.summary ?? null,
        insight_count: aiRes.body?.explanation?.insights?.length ?? 0,
        recommendation_count: aiRes.body?.explanation?.recommendations?.length ?? 0,
        warning_count: aiRes.body?.explanation?.warnings?.length ?? 0,
      },
      ai_response: aiRes.body,
    });
  }

  const output = {
    evaluation_part: "ai_explanation_quality_auto",
    datasetId: DATASET_ID,
    backend_url: BACKEND_URL,
    generated_at: new Date().toISOString(),
    duration_ms: Date.now() - startedAt.getTime(),
    selected_task_ids: TASK_IDS,
    context: {
      class: classInfo,
      student_count_loaded: studentsRes.body.students.length,
      params_used: params,
      student_context: studentContext,
    },
    metrics: summarizeMetrics(results),
    rubric_note:
      "Auto checks cover schema, degraded fallback, safety flags, latency/cost, and basic faithfulness signals. Human rubric scoring is still required for relevance, actionability, understandability, novelty, diversity, and final faithfulness judgment.",
    results,
  };

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  console.log(`AI explanation auto log written: ${OUTPUT_FILE}`);
  console.log(JSON.stringify(output.metrics, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
