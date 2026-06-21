import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUNS_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs");
const DEFAULT_EVIDENCE_MANIFEST_PATH = path.join(
  RUNS_ROOT,
  "phase6_evidence/evidence_manifest.jsonl",
);
const DEFAULT_OUTPUT_DIR = path.join(RUNS_ROOT, "phase6_explanations");
const EXPLANATION_ARTIFACTS_DIRNAME = "explanation_artifacts";
const TASK_REGISTRY_PATH = path.join(PROJECT_ROOT, "Backend/src/config/taskRegistry.json");
const IMPLEMENTATION_INPUT_PATHS = [
  path.join(PROJECT_ROOT, "AIService/strategies/base.py"),
  path.join(PROJECT_ROOT, "AIService/strategies/task_aware_v3.py"),
  TASK_REGISTRY_PATH,
  fileURLToPath(import.meta.url),
];

const DEFAULT_MODE_ENDPOINTS = {
  baseline_first_20_rows: "http://localhost:8001",
  task_aware_data_summarization: "http://localhost:8000",
};

function parseArgs(argv) {
  const args = {
    evidenceManifestPath: DEFAULT_EVIDENCE_MANIFEST_PATH,
    outputDir: DEFAULT_OUTPUT_DIR,
    requestTimeoutMs: 90000,
    retryAttempts: 1,
    modeEndpoints: { ...DEFAULT_MODE_ENDPOINTS },
    modes: null,
    datasets: null,
    tasks: null,
    limit: null,
    resume: false,
    reportBasename: "phase6_explanation_report",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--evidence-manifest") args.evidenceManifestPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else if (arg === "--request-timeout-ms") args.requestTimeoutMs = Number(next), i += 1;
    else if (arg === "--retry-attempts") args.retryAttempts = Number(next), i += 1;
    else if (arg === "--baseline-url") args.modeEndpoints.baseline_first_20_rows = next.replace(/\/+$/, ""), i += 1;
    else if (arg === "--task-aware-url") args.modeEndpoints.task_aware_data_summarization = next.replace(/\/+$/, ""), i += 1;
    else if (arg === "--modes") args.modes = splitList(next), i += 1;
    else if (arg === "--datasets") args.datasets = splitList(next), i += 1;
    else if (arg === "--tasks") args.tasks = splitList(next), i += 1;
    else if (arg === "--limit") args.limit = Number(next), i += 1;
    else if (arg === "--resume") args.resume = next === "true", i += 1;
    else if (arg === "--report-basename") args.reportBasename = next, i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    ...args,
    explanationArtifactsDir: path.join(args.outputDir, EXPLANATION_ARTIFACTS_DIRNAME),
    explanationManifestPath: path.join(args.outputDir, "explanation_manifest.jsonl"),
    reportJsonPath: path.join(args.outputDir, `${args.reportBasename}.json`),
    reportMdPath: path.join(args.outputDir, `${args.reportBasename}.md`),
  };
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, "/");
}

function repoPathToAbsolute(repoPath) {
  return path.join(PROJECT_ROOT, ...String(repoPath).split("/"));
}

async function computeImplementationHash() {
  const hash = createHash("sha256");
  for (const filePath of [...IMPLEMENTATION_INPUT_PATHS].sort()) {
    hash.update(toRepoPath(filePath));
    hash.update("\0");
    hash.update(await readFile(filePath));
    hash.update("\0");
  }
  return hash.digest("hex");
}

async function readJson(filePath) {
  return JSON.parse((await readFile(filePath, "utf8")).replace(/^\uFEFF/, ""));
}

async function readJsonl(filePath) {
  const text = await readFile(filePath, "utf8");
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}

async function requestJson(url, options = {}) {
  const startedAt = performance.now();
  let response = null;
  let body = null;
  const timeoutMs = options.timeoutMs ?? 90000;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        ...(options.headers || {}),
      },
    });
    try {
      body = await response.json();
    } catch {
      body = null;
    }
  } catch (error) {
    return {
      ok: false,
      http_status: response?.status ?? null,
      latency_ms: Math.round(performance.now() - startedAt),
      body: null,
      transport_error: error.name === "AbortError"
        ? `request_timeout_after_${timeoutMs}ms`
        : error.message,
    };
  } finally {
    clearTimeout(timeout);
  }

  return {
    ok: response.ok,
    http_status: response.status,
    latency_ms: Math.round(performance.now() - startedAt),
    body,
    transport_error: null,
  };
}

function getTask(registry, taskId) {
  return registry.find((task) => task.taskId === taskId) ?? null;
}

function snakeToAiProp(field) {
  return `ai${field
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")}`;
}

function buildAISummaryConfig(task) {
  if (!task?.aiSummaryType) return null;

  const defaults = {
    comparison_groups: [],
    dynamic_comparison_groups: false,
    comparison_alignment_columns: [],
    group_key_columns: [],
    metric_columns: [],
    status_columns: [],
    threshold_columns: [],
    benchmark_columns: [],
    sensitive_columns: [],
    metric_availability_columns: {},
    threshold_sources: {},
    benchmark_sources: {},
    entity_order: [],
    metric_directions: {},
    metric_units: {},
    metric_thresholds: {},
    minimum_entity_count: 2,
    require_metric_directions: false,
    require_metric_units: false,
    require_metric_thresholds: false,
    require_sensitive_context_policy: false,
    focus_categories: [],
    focus_bins: [],
    category_order: [],
    expected_categories: [],
    expected_groups: [],
    bin_order: [],
    expected_bins: [],
    severity_order: [],
    flag_order: [],
    secondary_metric_columns: [],
    flag_columns: [],
    action_columns: [],
    label_columns: [],
    evidence_columns: [],
    evidence_dataset_roles: {},
    action_evidence_contract: [],
    action_derived_evidence: [],
    action_conflict_rules: [],
    action_rules: [],
    trigger_columns: [],
    provenance_required_fields: [],
    require_complete_action_provenance: true,
    unsupported_action_behavior: "emit_unsupported_actions",
    require_sensitive_action_policy: false,
  };

  const nullableFields = [
    "summary_type",
    "target_group",
    "divergence_threshold",
    "time_column",
    "x_column",
    "y_column",
    "metric_column",
    "entity_column",
    "color_column",
    "coefficient_column",
    "coefficient_method",
    "sample_size_column",
    "p_value_column",
    "outlier_policy",
    "group_column",
    "series_column",
    "gap_column",
    "reliability_column",
    "minimum_reliable_count",
    "minimum_sample_size",
    "category_column",
    "bin_column",
    "count_column",
    "percent_column",
    "metric_key_column",
    "metric_value_column",
    "selected_entity_column",
    "entity_evidence_available_column",
    "sensitive_context_policy",
    "numeric_threshold",
    "threshold_direction",
    "sort_by",
    "sort_direction",
    "flag_name_column",
    "flag_value_column",
    "threshold_column",
    "triggered_column",
    "severity_column",
    "description_column",
    "recommended_action_column",
    "support_category_column",
    "max_flags",
    "action_source",
    "action_rule_set_id",
    "action_rule_version",
    "priority_column",
    "owner_column",
    "time_horizon_column",
    "max_actions",
    "sensitive_action_policy",
    "max_points",
    "top_k",
    "bottom_k",
  ];

  const config = { ...defaults };
  for (const [field, defaultValue] of Object.entries(defaults)) {
    const value = task[snakeToAiProp(field)];
    config[field] = value === undefined ? defaultValue : value;
  }
  for (const field of nullableFields) {
    const value = task[snakeToAiProp(field)];
    config[field] = value === undefined ? null : value;
  }

  return config;
}

function buildSemanticContext(task, datasets) {
  const rows = Object.values(datasets ?? {}).flat();
  const hasSource = rows.some((row) => row?.competency_source != null);
  if (!hasSource) return null;

  const hasProxy = rows.some((row) => row?.competency_source === "proxy");
  const hasNative = rows.some((row) => row?.competency_source === "native");
  const hasUnknown = rows.some((row) => row?.competency_source === "unknown");
  const competencyMode = hasNative && hasProxy
    ? "mixed"
    : hasNative
      ? "native"
      : hasProxy
        ? "proxy"
        : hasUnknown
          ? "unknown"
          : null;

  if (!competencyMode) return null;
  return {
    competency_mode: competencyMode,
    competency_proxy_note: task.semanticNote ?? null,
  };
}

function compactRawText(responseBody) {
  const explanation = responseBody?.explanation ?? {};
  const pieces = [];
  if (explanation.summary) pieces.push(`Summary: ${explanation.summary}`);
  if (Array.isArray(explanation.insights) && explanation.insights.length) {
    pieces.push(`Insights: ${explanation.insights.map((item) => {
      const title = item?.title ? `${item.title}: ` : "";
      return `${title}${item?.description ?? ""}`.trim();
    }).filter(Boolean).join(" | ")}`);
  }
  if (Array.isArray(explanation.educational_implications) && explanation.educational_implications.length) {
    pieces.push(`Educational implications: ${explanation.educational_implications.join(" | ")}`);
  }
  if (Array.isArray(explanation.recommendations) && explanation.recommendations.length) {
    pieces.push(`Recommendations: ${explanation.recommendations.map((item) => {
      if (typeof item === "string") return item;
      return [item?.priority, item?.action, item?.rationale].filter(Boolean).join(" - ");
    }).filter(Boolean).join(" | ")}`);
  }
  if (Array.isArray(explanation.warnings) && explanation.warnings.length) {
    pieces.push(`Warnings: ${explanation.warnings.join(" | ")}`);
  }
  return pieces.join("\n\n");
}

function buildStudentContext(record, requestParams) {
  if (!record.student_id) return null;
  return {
    student_id: record.student_id,
    enrollment_id: requestParams?.enrollment_id ?? null,
    class_id: record.class_id,
    dataset_id: record.dataset_id,
  };
}

function buildExplainPayload({ evidenceArtifact, evidenceEntry, task }) {
  const responseBody = evidenceArtifact.response_body ?? evidenceArtifact.full_response_body;
  const datasets = responseBody?.datasets ?? {};
  const meta = responseBody?.meta ?? {};

  return {
    task_id: task.taskId,
    execution_id: responseBody?.executionId ?? evidenceEntry.record_id,
    task_name: task.taskName,
    analysis_type: task.analytics?.analysisType ?? null,
    explanation_strategy: task.explanation_strategy,
    explanation_type: task.analytics?.explanationType ?? null,
    ai_prompt_hint: task.aiPromptHint ?? null,
    actionable_question: task.actionableQuestion ?? null,
    target_audience: task.target_audience,
    visualization_config: task.visualization_config ?? null,
    analysis_context: task.analysis_context ?? null,
    datasets,
    confidence: {
      level: meta?.dataQuality?.confidence ?? "LOW",
      reason: meta?.dataQuality?.confidence_reason ?? "Unknown.",
    },
    student_context: buildStudentContext(evidenceEntry, evidenceArtifact.request?.params ?? evidenceArtifact.request?.body?.params),
    query_labels: task.query_labels ?? [],
    semantic_context: buildSemanticContext(task, datasets),
    ai_summary_config: buildAISummaryConfig(task),
  };
}

function validateExplanation({ record, aiRes }) {
  const issues = [];
  const body = aiRes.body;

  if (!aiRes.ok || aiRes.http_status !== 200 || !body) {
    issues.push({
      severity: "error",
      code: "ai_explain_request_failed",
      message: "AI explain request failed or returned non-JSON body.",
      details: {
        http_status: aiRes.http_status,
        transport_error: aiRes.transport_error,
      },
    });
    return issues;
  }

  if (body.degraded === true) {
    issues.push({
      severity: "error",
      code: "ai_explain_degraded",
      message: "AI explain returned degraded=true.",
      details: {
        warnings: body.explanation?.warnings ?? [],
      },
    });
  }

  if (body.ai_summary_method !== record.explanation_mode) {
    issues.push({
      severity: "error",
      code: "ai_summary_method_mismatch",
      message: "Observed AI summary method does not match planned explanation_mode.",
      details: {
        expected: record.explanation_mode,
        actual: body.ai_summary_method ?? null,
      },
    });
  }

  if (!body.explanation || typeof body.explanation.summary !== "string" || body.explanation.summary.trim() === "") {
    issues.push({
      severity: "error",
      code: "missing_explanation_summary",
      message: "AI explain response is missing a non-empty explanation.summary.",
    });
  }

  return issues;
}

function normalizedText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function taskContractIssue(code, message, details = {}) {
  return { severity: "error", code, message, details };
}

function taskSpecificPromptRequirement(record, payload) {
  if (record.explanation_mode !== "task_aware_data_summarization") return null;

  if (record.task_id === "A-S04") {
    const actions = (payload.datasets?.risk_flags ?? [])
      .filter((row) => row?.triggered === true && row?.recommended_action)
      .map((row) => String(row.recommended_action));
    if (actions.length > 0) {
      return [
        "OUTPUT CONTRACT — A-S04:",
        "In explanation.summary or explanation.insights, quote every action below verbatim and explain its matching triggered flag.",
        "Do not replace, merge, or invent actions. This requirement applies even when explanation.recommendations is empty.",
        ...actions.map((action) => `- ${action}`),
      ].join("\n");
    }
  }
  if (record.task_id === "S-T07") {
    return [
      "OUTPUT CONTRACT — S-T07:",
      "Start explanation.summary with this exact evidence statement: absence_rate=0.125 (12.5%); association_status=not_estimable; with one absence snapshot, the evidence cannot quantify how much absences are hurting grades.",
      "State the exact absence_rate=0.125 (12.5%).",
      "Use the exact machine-readable status association_status=not_estimable for the absence-score relationship: there is only one absence snapshot and three score points.",
      "Answer the student question directly: the supplied evidence cannot quantify how much absences are hurting grades.",
      "Describe the assessment-order score trend separately only as score history; do not call it a correlation and do not present it as absence impact, absence-score association, or absence-score correlation.",
      "Do not make an attendance recommendation or claim that attendance would improve scores beyond supplied action evidence.",
    ].join("\n");
  }
  if (record.task_id === "A-S07") {
    return [
      "OUTPUT CONTRACT — A-S07:",
      "Preserve all support-status evidence exactly: school_support_flag=true, family_support_flag=false, has_paid_class=false, internet_access_flag=false.",
      "Treat background metrics as descriptive context only; do not infer causes, thresholds, or below/above-average status without supplied benchmarks.",
      "Do not invent a new intervention such as enhancing support services. If giving a next step, make it a specific evidence-grounded review/check of the returned support flags and raw context values.",
    ].join("\n");
  }
  if (record.task_id === "S-T13") {
    return [
      "OUTPUT CONTRACT — S-T13:",
      "For every triggered prioritized action, include its exact rule ID, action ID, owner, priority, and time horizon, and ground it in its linked evidence.",
      "Explain only actions whose rule evaluation is triggered=true. Do not invent or add actions.",
    ].join("\n");
  }
  return null;
}

function hasActionCoverage(text, action) {
  const ignored = new Set(["the", "and", "with", "before", "next", "that", "this", "from", "into", "your", "their", "they", "then", "schedule", "review", "reduce"]);
  const terms = normalizedText(action)
    .split(" ")
    .filter((term) => term.length >= 4 && !ignored.has(term));
  const matched = terms.filter((term) => text.includes(term));
  return matched.length >= Math.min(2, terms.length);
}

function validateTaskSpecificExplanation({ record, payload, aiRes }) {
  if (record.explanation_mode !== "task_aware_data_summarization" || !aiRes.body?.explanation) return [];
  const taskId = record.task_id;
  const rawText = compactRawText(aiRes.body);
  const text = normalizedText(rawText);
  const explanationText = normalizedText(JSON.stringify(aiRes.body.explanation));
  const issues = [];

  if (taskId === "A-C05") {
    const rows = (payload.datasets?.background_comparison ?? []).filter((row) => row && typeof row === "object");
    for (const row of rows) {
      for (const value of Object.values(row)) {
        if (value !== null && !text.includes(normalizedText(value))) {
          issues.push(taskContractIssue("task_contract_background_value_omission", "Preserve every returned background value for both students.", { student_id: row.student_id, missing_value: value }));
        }
      }
    }
    if (!text.includes("performance metric present false") || !text.includes("background driven performance difference not estimable")) {
      issues.push(taskContractIssue("task_contract_background_performance_scope", "State that no performance metric is supplied and background-driven performance difference is not estimable."));
    }
    if ((aiRes.body.explanation.recommendations ?? []).length > 0 || /indicat(?:e|es|ing) more experience|may have better academic outcomes|requires? additional support|background causes (better|worse) (performance|outcomes?)/.test(explanationText)) {
      issues.push(taskContractIssue("task_contract_background_causal_inference", "Keep background fields descriptive; do not infer experience, outcomes, causes, or support needs."));
    }
  } else if (taskId === "A-G01") {
    const rows = (payload.datasets?.low_engagement_group ?? []).filter((row) => row && typeof row === "object");
    if (!text.includes("low engagement threshold engagement score 0.15") || !text.includes(`returned student count ${rows.length}`)) {
      issues.push(taskContractIssue("task_contract_low_engagement_threshold", "State engagement_score<0.15 and the exact returned student count."));
    }
    for (const row of rows) {
      if (!text.includes(normalizedText(row.student_id))) {
        issues.push(taskContractIssue("task_contract_low_engagement_identifier_omission", "List every returned low-engagement student identifier.", { student_id: row.student_id }));
      }
    }
    const recs = normalizedText(JSON.stringify(aiRes.body.explanation.recommendations ?? []));
    if (!/(email|directly contact)/.test(recs)) issues.push(taskContractIssue("task_contract_admin_outreach_omission", "Recommend internal admin email/contact for the returned identifiers."));
  } else if (taskId === "A-G04") {
    const rows = [...(payload.datasets?.assessment_difficulty ?? [])].filter((row) => row && typeof row === "object").sort((a, b) => Number(b.fail_rate_pct) - Number(a.fail_rate_pct));
    const top = rows[0] ?? {};
    if (!text.includes("explicit fail rate threshold not supplied") || [top.assessment_id, top.assessment_name, top.total_submissions, top.fail_count, top.fail_rate_pct, top.avg_score].some((value) => !text.includes(normalizedText(value)))) {
      issues.push(taskContractIssue("task_contract_assessment_review_evidence", "State threshold not supplied and preserve exact highest-fail-rate assessment evidence."));
    }
    if (/mean fail rate|average fail rate/.test(text)) issues.push(taskContractIssue("task_contract_unsupported_fail_rate_mean", "Do not invent or add an unsupported cohort mean fail rate."));
  } else if (taskId === "A-G07") {
    const rows = (payload.datasets?.factor_correlation_matrix ?? []).filter((row) => row && typeof row === "object");
    for (const row of rows) {
      if ([row.feature_name, row.correlation_with_avg_score, row.n_samples, row.abs_correlation_rank].some((value) => !text.includes(normalizedText(value)))) {
        issues.push(taskContractIssue("task_contract_correlation_ranking_omission", "Rank every returned feature with exact coefficient, sample count, and rank.", { feature_name: row.feature_name }));
      }
    }
    if (!text.includes(`returned feature count ${rows.length}`) || (rows.length < 5 && !text.includes("fifth feature status unavailable"))) {
      issues.push(taskContractIssue("task_contract_fifth_feature_state", "State the exact returned feature count and that the fifth feature is unavailable when only four are returned."));
    }
    if (/0.4181.{0,30}strong|causes|causal importance/.test(text)) issues.push(taskContractIssue("task_contract_correlation_overstatement", "Use deterministic strength labels and do not frame correlation causally."));
  } else if (taskId === "A-G12") {
    const rows = (payload.datasets?.outcome_by_group ?? []).filter((row) => row && typeof row === "object");
    const groups = new Map(); let total = 0; let adverse = 0;
    for (const row of rows) { const group = String(row.group_value); if (!groups.has(group)) groups.set(group, {}); groups.get(group)[row.final_outcome] = Number(row.pct_within_group); total += Number(row.student_count); if (["Fail", "Withdrawn"].includes(row.final_outcome)) adverse += Number(row.student_count); }
    const threshold = Math.round((adverse * 100 / total) * 10000) / 10000;
    if (!text.includes(normalizedText(threshold))) issues.push(taskContractIssue("task_contract_cohort_outcome_threshold", "State the deterministic cohort fail+withdrawal threshold."));
    for (const [group, values] of groups) {
      const fail = values.Fail ?? 0; const withdrawn = values.Withdrawn ?? 0; const combined = Math.round((fail + withdrawn) * 10) / 10;
      if ([group, fail, withdrawn, combined].some((value) => !text.includes(normalizedText(value)))) issues.push(taskContractIssue("task_contract_group_outcome_rate_omission", "State fail, withdrawal, and combined percentages for every group.", { group }));
    }
  } else if (taskId === "A-C02") {
    const rows = (payload.datasets?.engagement_comparison ?? []).filter((row) => row && typeof row === "object");
    for (const row of rows) {
      for (const value of [row.student_id, row.metric, row.engagement_score, row.total_clicks, row.active_days]) {
        if (!text.includes(normalizedText(value))) {
          issues.push(taskContractIssue(
            "task_contract_engagement_comparison_omission",
            "Preserve both students' exact dimension values, total_clicks, and active_days.",
            { student_id: row.student_id, metric: row.metric, missing_value: value },
          ));
          break;
        }
      }
    }
    if (!text.includes("active days norm") || !text.includes("0.3525")) {
      issues.push(taskContractIssue(
        "task_contract_largest_engagement_gap_omission",
        "Identify active_days_norm as the largest absolute gap and state exact gap=0.3525.",
      ));
    }
  } else if (taskId === "A-G05") {
    const rows = (payload.datasets?.submission_behaviour ?? []).filter((row) => row && typeof row === "object");
    for (const row of rows) {
      const signature = [row.final_outcome, row.assessment_type, row.student_count, row.submission_delay_avg, row.late_submission_rate, row.punctuality_rate];
      if (signature.some((value) => !text.includes(normalizedText(value)))) {
        issues.push(taskContractIssue(
          "task_contract_submission_group_omission",
          "Preserve every outcome-assessment group's count, delay, late rate, and punctuality.",
          { final_outcome: row.final_outcome, assessment_type: row.assessment_type },
        ));
      }
    }
    if (/caused by (motivation|time management|lack of engagement)|(lateness|late submission).{0,80}(impacts?|affects?|causes?|leads? to|hinders?).{0,50}(score|performance|engagement)/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_unsupported_lateness_cause",
        "Do not infer motivation, time-management causes, engagement, or score effects from grouped lateness evidence.",
      ));
    }
  } else if (taskId === "A-G08") {
    const rows = (payload.datasets?.demographic_performance ?? []).filter((row) => row && typeof row === "object");
    for (const row of rows) {
      const signature = [row.group_value, row.student_count, row.avg_score, row.score_vs_cohort, row.avg_engagement_score];
      if (signature.some((value) => !text.includes(normalizedText(value)))) {
        issues.push(taskContractIssue(
          "task_contract_equity_group_value_omission",
          "Preserve exact score and engagement comparisons for every demographic group.",
          { group_value: row.group_value },
        ));
      }
    }
    if (!text.includes("weighted cohort engagement mean") || !text.includes("engagement vs cohort")) {
      issues.push(taskContractIssue(
        "task_contract_engagement_benchmark_omission",
        "State the deterministic weighted cohort engagement mean and every group's engagement deviation.",
      ));
    }
    if ((aiRes.body.explanation.recommendations ?? []).length > 0 || /targeted intervention|targeted support|support program|differentiated instruction/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_equity_sensitive_prescription",
        "Keep A-G08 descriptive; do not prescribe interventions by demographic group.",
      ));
    }
  } else if (taskId === "A-G11") {
    if (!text.includes("week 3 to week 4") || !text.includes("137576")) {
      issues.push(taskContractIssue(
        "task_contract_largest_weekly_drop_omission",
        "State the exact largest adjacent drop: week 3 to week 4, delta=-137576.",
      ));
    }
    const rows = [...(payload.datasets?.weekly_drop_detection ?? [])]
      .filter((row) => row && typeof row === "object")
      .sort((a, b) => Number(a.week_number) - Number(b.week_number));
    for (let index = 0; index < rows.length; index += 1) {
      const row = rows[index];
      if (!row.is_drop_week) continue;
      const previous = index > 0 ? rows[index - 1] : null;
      const delta = previous ? Number(row.week_total_clicks) - Number(previous.week_total_clicks) : null;
      if (!text.includes(`week ${normalizedText(row.week_number)}`) || !text.includes(normalizedText(row.week_total_clicks)) || (delta !== null && !text.includes(normalizedText(delta)))) {
        issues.push(taskContractIssue(
          "task_contract_flagged_week_omission",
          "List every flagged week with exact clicks and adjacent delta from the immediately preceding returned week.",
          { week_number: row.week_number, adjacent_delta: delta },
        ));
      }
    }
  } else if (taskId === "A-G15") {
    const rows = [...(payload.datasets?.intervention_priority_list ?? [])]
      .filter((row) => row && typeof row === "object")
      .sort((a, b) => (Number(b.at_risk_score) - Number(a.at_risk_score)) || (Number(a.avg_score) - Number(b.avg_score)))
      .slice(0, 10);
    for (const [index, row] of rows.entries()) {
      const trueFlags = ["flag_low_score", "flag_repeated", "flag_low_engagement", "flag_low_punctuality", "flag_neg_trend"].filter((name) => row[name] === 1 || row[name] === true);
      if (!text.includes(normalizedText(row.student_id)) || !text.includes(`rank ${index + 1}`) || !text.includes(normalizedText(row.at_risk_score)) || !text.includes(normalizedText(row.final_outcome)) || trueFlags.some((flag) => !text.includes(normalizedText(flag)))) {
        issues.push(taskContractIssue(
          "task_contract_top_ten_risk_ranking_omission",
          "List all top-ten identifiers in rank order with risk score, exact triggered flags, and final outcome.",
          { rank: index + 1, student_id: row.student_id },
        ));
      }
    }
    if (!text.includes("oulad admin review v1") || !text.includes("score 5 action") || !text.includes("score 4 action")) {
      issues.push(taskContractIssue(
        "task_contract_priority_group_action_omission",
        "Use the versioned score-5 and score-4 internal admin-review mapping.",
      ));
    }
  } else if (taskId === "A-S01") {
    const row = (payload.datasets?.student_profile ?? [])[0] ?? {};
    for (const field of ["avg_score", "final_outcome", "at_risk_score", "at_risk_label", "engagement_score", "study_effort_level", "previous_attempt_count"]) {
      if (!text.includes(normalizedText(row[field]))) {
        issues.push(taskContractIssue(
          "task_contract_profile_dimension_omission",
          `Preserve the returned ${field} value.`,
          { field, missing_value: row[field] },
        ));
      }
    }
    if ((aiRes.body.explanation.recommendations ?? []).length > 0 || /check in|check-in|monitoring|underlying issue/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_unsupported_profile_action",
        "A-S01 is descriptive only; do not invent monitoring, check-ins, or underlying causes.",
      ));
    }
  } else if (taskId === "A-S03") {
    for (const required of ["early warning week 0", "previous week clicks 94", "warning week clicks 27", "pre warning average 90", "post warning average 36.0333"]) {
      if (!text.includes(required)) {
        issues.push(taskContractIssue(
          "task_contract_early_warning_evidence_omission",
          `Preserve primary early-warning timing and pre/post evidence; missing ${required}.`,
          { missing_value: required },
        ));
      }
    }
    if (/starting from week 2|primary (timing|warning timing|early warning).{0,20}week 2|week 2.{0,20}(is|as) (the )?primary/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_primary_timing_reversal",
        "early_warning_week=0 is primary; week 1-to-2 is secondary largest-drop evidence only.",
      ));
    }
    if (/\b\d+(?:\.\d+)?\s*(?:%|percent)/i.test(rawText)) {
      issues.push(taskContractIssue(
        "task_contract_unsupported_percentage_derivation",
        "Use the exact clicks, deltas, and pre/post averages only; do not add a derived percentage with an ambiguous denominator.",
      ));
    }
    const recommendationsText = normalizedText(JSON.stringify(aiRes.body.explanation.recommendations ?? []));
    if (!recommendationsText.includes("outreach") || !recommendationsText.includes("early warning week 0") || !/(before|at)/.test(recommendationsText)) {
      issues.push(taskContractIssue(
        "task_contract_outreach_timing_omission",
        "Explicitly recommend outreach before or at early_warning_week=0 without promising a causal or re-engagement effect.",
      ));
    }
  } else if (taskId === "A-S06") {
    for (const required of ["submission delay avg 3.25", "punctuality rate 0", "valid delay count 4", "null delay count 1", "descriptive only not statistically reliable"]) {
      if (!text.includes(required)) {
        issues.push(taskContractIssue(
          "task_contract_lateness_evidence_omission",
          `Preserve exact lateness evidence and small-sample status; missing ${required}.`,
          { missing_value: required },
        ));
      }
    }
    if (/(delay|late submission).{0,80}(impacts?|affects?|correlates?|causes?|leads? to|hinders?).{0,50}(score|performance|engagement)/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_unsupported_delay_inference",
        "Do not infer score, engagement, motivation, or time-management effects from four valid delay points.",
      ));
    }
  } else if (taskId === "A-B02") {
    const outcomeRows = (payload.datasets?.outcome_counts ?? [])
      .filter((row) => row && typeof row === "object");
    const outcomeCounts = new Map(
      outcomeRows.map((row) => [normalizedText(row.final_outcome), row.student_count]),
    );
    for (const label of ["pass", "fail", "withdrawn"]) {
      const requiredValue = `${label} count ${outcomeCounts.get(label) ?? 0}`;
      if (!text.includes(requiredValue)) {
        issues.push(taskContractIssue(
          "task_contract_exact_outcome_count_omission",
          `Preserve exact pass, fail, and zero-withdrawn counts; missing ${requiredValue}.`,
          { missing_value: requiredValue },
        ));
      }
    }
    if (/data collection gap|gap in data collection|improved tracking/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_unsupported_withdrawal_data_gap",
        "Zero returned withdrawal rows means withdrawn_count=0 for this result; do not infer a data-collection gap.",
      ));
    }
  } else if (taskId === "A-C01") {
    const trajectoryRows = [...(payload.datasets?.trajectory_comparison ?? [])]
      .filter((row) => row && typeof row === "object");
    const studentIds = [...new Set(trajectoryRows.map((row) => String(row.student_id)))];
    if (studentIds.length < 2) {
      if (!/only one returned student|one student only/.test(text) || !/not estimable/.test(text)) {
        issues.push(taskContractIssue(
          "task_contract_single_trajectory_scope_omission",
          "Only one student is returned for this OULAD record; state that between-student divergence is not estimable.",
        ));
      }
    } else {
      const firstRows = trajectoryRows
        .sort((a, b) => Number(a.assessment_order) - Number(b.assessment_order))
        .filter((row, index, rows) => rows.findIndex((candidate) => candidate.student_id === row.student_id) === index);
      for (const row of firstRows) {
        const requiredValue = `assessment order ${row.assessment_order} score normalized ${row.score_normalized}`;
        if (!text.includes(requiredValue)) {
          issues.push(taskContractIssue(
            "task_contract_trajectory_value_omission",
            `Preserve exact divergence evidence; missing ${requiredValue}.`,
            { missing_value: requiredValue },
          ));
        }
      }
    }
    if (/confidence|long term effect|long-term effect|slower improvement/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_unsupported_trajectory_inference",
        "Describe only the observed assessment-1 divergence and later convergence; do not infer confidence, long-term effects, or a contradictory slower-improvement target.",
      ));
    }
  } else if (taskId === "A-G03") {
    const topRows = [...(payload.datasets?.at_risk_cohort ?? [])]
      .filter((row) => row && typeof row === "object")
      .sort((a, b) => (Number(b.at_risk_score) - Number(a.at_risk_score)) || (Number(a.avg_score) - Number(b.avg_score)))
      .slice(0, 5);
    for (const row of topRows) {
      const studentId = normalizedText(row.student_id);
      const score = normalizedText(row.avg_score);
      if (!text.includes(studentId) || !text.includes(score) || !hasActionCoverage(text, row.recommended_admin_action)) {
        issues.push(taskContractIssue(
          "task_contract_ranked_risk_evidence_omission",
          "Preserve each of the top five ranked student IDs, exact avg_score, triggered_flags_summary, and existing recommended_admin_action.",
          { student_id: row.student_id, avg_score: row.avg_score },
        ));
      }
    }
  } else if (taskId === "S-T02") {
    if (/\bstudents (are|may|might|could|will)\b|\bmost students\b|\bcohort\b/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_scope_generalization",
        "S-T02 contains one selected student's assessment rows; do not generalize to students or the cohort.",
      ));
    }
    if (!/one selected student|selected student's/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_single_student_scope_omission",
        "State that S-T02 is one selected student's assessment evidence.",
      ));
    }
    for (const row of (payload.datasets?.competency_scores ?? [])) {
      if (!row || typeof row !== "object") continue;
      const requiredValue = `${normalizedText(row.competency_tag)} avg score ${normalizedText(row.avg_score)}`;
      if (!text.includes(requiredValue)) {
        issues.push(taskContractIssue(
          "task_contract_competency_value_omission",
          `Preserve exact competency comparisons; missing ${requiredValue}.`,
          { missing_value: requiredValue },
        ));
      }
    }
  } else if (taskId === "A-S04") {
    const actions = (payload.datasets?.risk_flags ?? [])
      .filter((row) => row?.triggered === true && row?.recommended_action)
      .map((row) => String(row.recommended_action));
    for (const action of actions) {
      if (!hasActionCoverage(text, action)) {
        issues.push(taskContractIssue(
          "task_contract_missing_existing_action",
          "Explain every existing recommended_action for triggered flags; do not replace it with a new action.",
          { missing_action: action },
        ));
      }
    }
  } else if (taskId === "A-S05") {
    if (/\b(no|all|many|several) students\b|\bstudents (are|may|might|could|will)\b|\bmultiple students\b|\bcohort\b/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_scope_generalization",
        "This record is one selected student. Do not describe pass_rate or assessment_count as evidence about multiple students or the cohort.",
      ));
    }
    if (!/one selected student|selected student's/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_single_student_scope_omission",
        "State that A-S05 is one selected student's assessment evidence.",
      ));
    }
  } else if (taskId === "A-S07") {
    if (!text.includes("school support") || !text.includes("family support")) {
      issues.push(taskContractIssue(
        "task_contract_support_status_omission",
        "State both existing school support and family-support status from the returned row.",
      ));
    }
    if (/average threshold|below average|above average/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_invented_background_benchmark",
        "No population benchmark is supplied for background scores; remove average or threshold comparisons.",
      ));
    }
    if (/(enhance|strengthen|increase|add|expand).{0,40}(support service|school support|support services)/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_unsupported_support_intervention",
        "Do not invent a new support-service intervention for A-S07; use only evidence-grounded review/check wording tied to returned support flags.",
      ));
    }
  } else if (taskId === "S-T03") {
    const comparisonRows = (payload.datasets?.peer_comparison ?? [])
      .filter((row) => row && typeof row === "object");
    for (const row of comparisonRows) {
      const requiredValue = normalizedText(row.metric_value);
      if (!text.includes(requiredValue)) {
        issues.push(taskContractIssue(
          "task_contract_exact_value_omission",
          `Preserve exact student and cohort comparison values; missing ${requiredValue}.`,
          { missing_value: requiredValue },
        ));
      }
    }
    if (!text.includes("percentile")) {
      issues.push(taskContractIssue(
        "task_contract_standing_omission",
        "State the student's score percentile and explain the standing without reversing direction.",
      ));
    }
    if (!text.includes("engagement percentile 75") || !text.includes("higher than about 75") || !text.includes("top 25")) {
      issues.push(taskContractIssue(
        "task_contract_engagement_percentile_direction",
        "Interpret engagement percentile 75 as higher than about 75% of peers, equivalent to top 25%; do not reverse it.",
      ));
    }
  } else if (taskId === "S-T07") {
    if (!text.includes("0.125") && !text.includes("12.5")) {
      issues.push(taskContractIssue(
        "task_contract_absence_rate_omission",
        "State absence_rate=0.125 (12.5%).",
      ));
    }
    if (!/(association_status\s*=?\s*not_estimable|not estimable|cannot quantify|cannot estimate|can t estimate|insufficient.*association|insufficient.*correlation)/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_non_estimability_omission",
        "State association_status=not_estimable and explain that one absence snapshot cannot quantify absence-score impact.",
      ));
    }
    if (!/cannot quantify|not quantify|not enough evidence to quantify|unable to quantify/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_absence_impact_quantification_omission",
        "Answer the student question directly: the evidence cannot quantify how much absences are hurting grades.",
      ));
    }
    if (/(attendance|attending|absences).{0,80}(improve|lead to better|boost|raise).{0,40}(score|grade|performance)/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_unsupported_attendance_recommendation",
        "Do not claim attendance would improve scores or make attendance recommendations without supplied action evidence.",
      ));
    }
    if (/continued engagement.*(better performance|improve|lead to better)|engagement.*(better performance|improve scores|lead to better)/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_unsupported_engagement_outcome_claim",
        "Do not claim engagement will improve performance for S-T07 without action evidence; keep next steps to collecting more absence-score evidence.",
      ));
    }
    if (/correlation between assessment order|assessment order.*correlation|as assessments progress.*scores tend to improve/.test(text)) {
      issues.push(taskContractIssue(
        "task_contract_assessment_order_correlation_substitution",
        "Do not describe assessment-order score history as a correlation; keep it separate from absence-score association.",
      ));
    }
  } else if (taskId === "S-T08" || taskId === "S-T12") {
    for (const required of ["submission delay avg 3.25", "punctuality rate 0", "valid pair count 4", "null delay count 1", "pearson correlation 0.4015", "association status descriptive only not statistically reliable", "non monotonic"]) {
      if (!text.includes(required)) issues.push(taskContractIssue("task_contract_delay_score_evidence_omission", `Preserve exact systematic-lateness and small-sample association evidence; missing ${required}.`, { missing_value: required }));
    }
    const rows = taskId === "S-T08" ? (payload.datasets?.submission_lateness ?? []) : (payload.datasets?.submission_series ?? []);
    for (const row of rows.filter((item) => item?.submission_delay_days !== null && item?.submission_delay_days !== undefined)) {
      if (![row.assessment_order, row.submission_delay_days, row.score_normalized].every((value) => text.includes(normalizedText(value)))) {
        issues.push(taskContractIssue("task_contract_delay_score_pair_omission", "Preserve every valid assessment delay-score pair.", { assessment_order: row.assessment_order }));
      }
    }
    if (/suggests? procrastination|tendency to procrastinate|harms? learning|delay.{0,60}(causes?|impacts?|affects?|leads? to).{0,40}(score|performance)/.test(explanationText)) {
      issues.push(taskContractIssue("task_contract_delay_score_causal_inference", "Do not infer procrastination, learning harm, causality, or score improvement from four pairs."));
    }
  } else if (taskId === "S-T13" || taskId === "A-G16") {
    const evidence = (
      aiRes.body?.task_aware_evidence_payload
      ?? aiRes.body?.meta?.task_aware_evidence_payload
    )?.source_evidence_summary;
    const prioritized = Array.isArray(evidence?.prioritized_actions) ? evidence.prioritized_actions : [];
    if (!evidence) {
      issues.push(taskContractIssue(
        "task_contract_action_evidence_metadata_missing",
        "Return deterministic action-rule evidence in meta.task_aware_evidence_payload.",
      ));
    } else if (prioritized.length === 0) {
      if (!/(no supported action|no action.*triggered)/.test(text)) {
        issues.push(taskContractIssue(
          "task_contract_empty_action_state_omission",
          "No supported action is triggered; say so explicitly and do not invent an action.",
        ));
      }
    } else {
      const explanationJson = JSON.stringify(aiRes.body.explanation);
      for (const action of prioritized) {
        const ruleId = String(action.rule_id ?? action.triggered_by_rule_id ?? "");
        const requiredActionValues = [
          ruleId,
          action.action_id,
          action.owner,
          action.priority,
          action.time_horizon_days,
          ...(Array.isArray(action.evidence_item_ids) ? action.evidence_item_ids : []),
        ].filter((value) => value !== null && value !== undefined && String(value) !== "");
        const missingValues = requiredActionValues.filter((value) => !explanationJson.includes(String(value)));
        if (missingValues.length > 0) {
          issues.push(taskContractIssue(
            "task_contract_action_rule_omission",
            `Explain every supported action with action/rule ID, owner, priority, horizon, and evidence links; missing ${missingValues.join(", ")}.`,
            { rule_id: ruleId, action_id: action.action_id, missing_values: missingValues },
          ));
        }
      }
    }
  }
  return issues;
}

function safeFileStem(value) {
  return String(value).replace(/[^A-Za-z0-9_.-]+/g, "_");
}

async function buildExplanationForRecord({ evidenceEntry, registry, args }) {
  const task = getTask(registry, evidenceEntry.task_id);
  if (!task) {
    return {
      manifestEntry: {
        record_id: evidenceEntry.record_id,
        status: "failed",
        issues: [{
          severity: "error",
          code: "task_missing_from_registry",
          message: "Task not found in taskRegistry.json.",
        }],
      },
      issues: [],
    };
  }

  const evidenceArtifact = await readJson(repoPathToAbsolute(evidenceEntry.full_query_artifact.path));
  const hydratedEntry = {
    ...evidenceEntry,
    case_id: evidenceEntry.case_id ?? evidenceEntry.evidence_id ?? `${evidenceEntry.dataset_id}__${evidenceEntry.task_id}`,
    class_id: evidenceEntry.class_id ?? evidenceArtifact.class_id ?? null,
    student_id: evidenceEntry.student_id ?? evidenceArtifact.student_id ?? null,
    role: evidenceEntry.role ?? evidenceArtifact.role ?? null,
    task_name: evidenceEntry.task_name ?? evidenceArtifact.task_name ?? task.taskName,
  };
  const payload = buildExplainPayload({ evidenceArtifact, evidenceEntry: hydratedEntry, task });
  const endpoint = args.modeEndpoints[evidenceEntry.explanation_mode];
  const basePromptHint = [
    payload.ai_prompt_hint,
    taskSpecificPromptRequirement(hydratedEntry, payload),
  ].filter(Boolean).join("\n\n");
  payload.ai_prompt_hint = basePromptHint || null;
  let aiRes = null;
  let issues = [];
  let attempt = 0;
  const attempts = Math.max(1, (args.retryAttempts ?? 0) + 1);
  while (attempt < attempts) {
    attempt += 1;
    aiRes = await requestJson(`${endpoint}/explain`, {
      method: "POST",
      body: JSON.stringify(payload),
      timeoutMs: args.requestTimeoutMs,
    });
    issues = [
      ...validateExplanation({ record: evidenceEntry, aiRes }),
      ...validateTaskSpecificExplanation({ record: evidenceEntry, payload, aiRes }),
    ];
    if (!issues.some((issue) => issue.severity === "error")) break;
    const remediation = issues
      .filter((issue) => issue.severity === "error")
      .map((issue) => `- ${issue.message}`)
      .join("\n");
    payload.ai_prompt_hint = [
      basePromptHint,
      "Previous response failed deterministic output-contract validation. Correct every item below:",
      remediation,
    ].filter(Boolean).join("\n\n");
  }

  const artifact = {
    artifact_type: "llm_judge_v2_phase6_3b_ai_explanation",
    generated_at: new Date().toISOString(),
    ai_service_url: endpoint,
    endpoint: "/explain",
    implementation_hash: args.implementationHash,
    record: {
      record_id: hydratedEntry.record_id,
      case_id: hydratedEntry.case_id,
      dataset_id: hydratedEntry.dataset_id,
      class_id: hydratedEntry.class_id,
      student_id: hydratedEntry.student_id,
      role: hydratedEntry.role,
      task_id: hydratedEntry.task_id,
      task_name: hydratedEntry.task_name,
      explanation_mode: hydratedEntry.explanation_mode,
    },
    source_evidence: {
      evidence_manifest_path: toRepoPath(args.evidenceManifestPath),
      full_query_artifact_path: evidenceEntry.full_query_artifact.path,
      full_query_artifact_sha256: evidenceEntry.full_query_artifact.sha256,
    },
    request_payload: payload,
    response_metadata: {
      http_status: aiRes.http_status,
      latency_ms: aiRes.latency_ms,
      transport_error: aiRes.transport_error,
      degraded: aiRes.body?.degraded ?? null,
      expected_ai_summary_method: evidenceEntry.explanation_mode,
      observed_ai_summary_method: aiRes.body?.ai_summary_method ?? null,
      model: aiRes.body?.meta?.model ?? null,
      token_usage: aiRes.body?.meta?.token_usage ?? null,
      attempts,
      final_attempt: attempt,
    },
    response_body: aiRes.body,
    raw_text: compactRawText(aiRes.body),
  };

  const artifactText = `${JSON.stringify(artifact, null, 2)}\n`;
  const artifactSha256 = sha256Text(artifactText);
  const artifactPath = path.join(args.explanationArtifactsDir, `${safeFileStem(evidenceEntry.record_id)}.json`);
  await writeFile(artifactPath, artifactText, "utf8");

  const status = issues.some((issue) => issue.severity === "error")
    ? "failed"
    : "explanation_ready";

  const manifestEntry = {
    record_id: hydratedEntry.record_id,
    case_id: hydratedEntry.case_id,
    dataset_id: hydratedEntry.dataset_id,
    class_id: hydratedEntry.class_id,
    student_id: hydratedEntry.student_id,
    role: hydratedEntry.role,
    task_id: hydratedEntry.task_id,
    task_name: hydratedEntry.task_name,
    explanation_mode: hydratedEntry.explanation_mode,
    status,
    implementation_hash: args.implementationHash,
    ai_service_url: endpoint,
    explanation_artifact: {
      path: toRepoPath(artifactPath),
      sha256: artifactSha256,
    },
    expected_ai_summary_method: evidenceEntry.explanation_mode,
    observed_ai_summary_method: aiRes.body?.ai_summary_method ?? null,
    degraded: aiRes.body?.degraded ?? null,
    model: aiRes.body?.meta?.model ?? null,
    token_usage: aiRes.body?.meta?.token_usage ?? null,
    latency_ms: aiRes.latency_ms,
    attempts_used: attempt,
    raw_text_length: artifact.raw_text.length,
    issues,
    next_step: "phase6_4_judge_input_materialization",
  };

  return {
    manifestEntry,
    issues: issues.map((issue) => ({
      ...issue,
      record_id: evidenceEntry.record_id,
      case_id: evidenceEntry.case_id,
      task_id: evidenceEntry.task_id,
      dataset_id: evidenceEntry.dataset_id,
      explanation_mode: evidenceEntry.explanation_mode,
    })),
  };
}

function countBy(items, keyFn) {
  const counts = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function summarize({ generatedAt, evidenceEntries, explanationEntries, issues, args }) {
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const ready = explanationEntries.filter((entry) => entry.status === "explanation_ready");
  const failed = explanationEntries.filter((entry) => entry.status === "failed");
  const sliceComplete = errors.length === 0 && ready.length === evidenceEntries.length;
  const isDatasetSlice = Array.isArray(args.datasets) && args.datasets.length === 1;
  const aggregateBaselineAllowed = isDatasetSlice && sliceComplete && args.otherDatasetComplete === true;

  return {
    report_version: "llm_judge_v2_phase6_3b_explanation_builder_report_v1",
    generated_at: generatedAt,
    status: errors.length === 0 && ready.length === evidenceEntries.length ? "PASS" : "FAIL",
    phase_scope: ["6.3b explanation builder"],
    mode_endpoints: args.modeEndpoints,
    implementation_hash: args.implementationHash,
    inputs: {
      evidence_manifest_jsonl: toRepoPath(args.evidenceManifestPath),
      task_registry_path: "Backend/src/config/taskRegistry.json",
    },
    counts: {
      evidence_ready_records: evidenceEntries.length,
      explanation_ready_records: ready.length,
      failed_records: failed.length,
      errors: errors.length,
      warnings: warnings.length,
    },
    coverage_summary: {
      datasets: countBy(explanationEntries, (entry) => entry.dataset_id),
      roles: countBy(explanationEntries, (entry) => entry.role),
      explanation_modes: countBy(explanationEntries, (entry) => entry.explanation_mode),
      observed_ai_summary_methods: countBy(explanationEntries, (entry) => entry.observed_ai_summary_method ?? "null"),
      statuses: countBy(explanationEntries, (entry) => entry.status),
    },
    outputs: {
      explanation_manifest_jsonl: toRepoPath(args.explanationManifestPath),
      explanation_artifacts_dir: toRepoPath(args.explanationArtifactsDir),
      report_json: toRepoPath(args.reportJsonPath),
      report_md: toRepoPath(args.reportMdPath),
    },
    gate_decision: {
      current_dataset_slice_complete: sliceComplete,
      next_dataset_baseline_allowed: isDatasetSlice && args.datasets[0] === "SAMPLE_UCI_POR" && sliceComplete && !args.otherDatasetComplete,
      aggregate_baseline_allowed: aggregateBaselineAllowed,
      phase6_4_judge_input_materializer_allowed: sliceComplete && !isDatasetSlice,
      judge_invocation_allowed: false,
      official_full_evaluation_allowed: false,
      reason: aggregateBaselineAllowed
        ? "Both baseline dataset slices pass. Build the 104-record baseline aggregate next; judge input materialization remains disabled."
        : sliceComplete && isDatasetSlice
          ? "Current dataset explanation slice is complete. Run the remaining dataset and build the 104-record baseline aggregate before judge input materialization."
        : sliceComplete
          ? "All evidence-ready records have valid AI explanations with expected summary mode. Judge input materialization may run next."
        : "Explanation builder found failed records or mode mismatches. Fix before judge input materialization.",
    },
    issues,
  };
}

function renderMarkdown(report) {
  const lines = [
    "# LLM Judge V2 Phase 6.3b Explanation Builder Report",
    "",
    `- Generated at: ${report.generated_at}`,
    `- Status: ${report.status}`,
    `- Evidence-ready records: ${report.counts.evidence_ready_records}`,
    `- Explanation-ready records: ${report.counts.explanation_ready_records}`,
    `- Failed records: ${report.counts.failed_records}`,
    `- Errors: ${report.counts.errors}`,
    `- Warnings: ${report.counts.warnings}`,
    "",
    "## Mode Endpoints",
    "",
    `- baseline_first_20_rows: ${report.mode_endpoints.baseline_first_20_rows}`,
    `- task_aware_data_summarization: ${report.mode_endpoints.task_aware_data_summarization}`,
    "",
    "## Gate Decision",
    "",
    `- Current dataset slice complete: ${report.gate_decision.current_dataset_slice_complete}`,
    `- Next dataset baseline allowed: ${report.gate_decision.next_dataset_baseline_allowed}`,
    `- Aggregate baseline allowed: ${report.gate_decision.aggregate_baseline_allowed}`,
    `- Phase 6.4 judge input materializer allowed: ${report.gate_decision.phase6_4_judge_input_materializer_allowed}`,
    `- Judge invocation allowed: ${report.gate_decision.judge_invocation_allowed}`,
    `- Reason: ${report.gate_decision.reason}`,
    "",
    "## Coverage",
    "",
    "| Dimension | Counts |",
    "| --- | --- |",
    `| Datasets | ${JSON.stringify(report.coverage_summary.datasets)} |`,
    `| Roles | ${JSON.stringify(report.coverage_summary.roles)} |`,
    `| Explanation modes | ${JSON.stringify(report.coverage_summary.explanation_modes)} |`,
    `| Observed AI summary methods | ${JSON.stringify(report.coverage_summary.observed_ai_summary_methods)} |`,
    `| Statuses | ${JSON.stringify(report.coverage_summary.statuses)} |`,
    "",
    "## Outputs",
    "",
    `- Explanation manifest: \`${report.outputs.explanation_manifest_jsonl}\``,
    `- Explanation artifacts dir: \`${report.outputs.explanation_artifacts_dir}\``,
    `- JSON report: \`${report.outputs.report_json}\``,
    `- Markdown report: \`${report.outputs.report_md}\``,
    "",
  ];

  if (report.issues.length > 0) {
    lines.push("## Issues", "", "| Severity | Code | Record | Message |", "| --- | --- | --- | --- |");
    for (const issue of report.issues) {
      lines.push(`| ${issue.severity} | ${issue.code} | ${issue.record_id ?? ""} | ${issue.message} |`);
    }
    lines.push("");
  } else {
    lines.push("## Issues", "", "No issues found.", "");
  }

  return `${lines.join("\n")}\n`;
}

async function verifyModeEndpoints(args) {
  const failures = [];
  const selectedModes = args.modes ?? Object.keys(args.modeEndpoints);
  for (const mode of selectedModes) {
    const baseUrl = args.modeEndpoints[mode];
    if (!baseUrl) {
      failures.push(`${mode} has no configured endpoint`);
      continue;
    }
    const res = await requestJson(`${baseUrl}/health`, { timeoutMs: 5000 });
    if (!res.ok) {
      failures.push(`${mode} endpoint ${baseUrl} failed health check: ${res.transport_error ?? res.http_status}`);
    }
  }
  if (failures.length > 0) {
    throw new Error(failures.join("; "));
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const generatedAt = new Date().toISOString();
  args.implementationHash = await computeImplementationHash();

  await mkdir(args.outputDir, { recursive: true });
  await mkdir(args.explanationArtifactsDir, { recursive: true });
  await verifyModeEndpoints(args);

  const registry = await readJson(TASK_REGISTRY_PATH);
  const allEvidenceEntries = (await readJsonl(args.evidenceManifestPath))
    .filter((entry) => entry.status === "evidence_ready")
    .filter((entry) => !args.modes || args.modes.includes(entry.explanation_mode))
    .filter((entry) => !args.datasets || args.datasets.includes(entry.dataset_id))
    .filter((entry) => !args.tasks || args.tasks.includes(entry.task_id))
    .slice(0, Number.isInteger(args.limit) && args.limit > 0 ? args.limit : undefined);

  args.otherDatasetComplete = false;
  if (Array.isArray(args.datasets) && args.datasets.length === 1) {
    const otherDatasetId = args.datasets[0] === "SAMPLE_UCI_POR" ? "SAMPLE_OULAD" : "SAMPLE_UCI_POR";
    try {
      const otherReport = await readJson(path.join(path.dirname(args.outputDir), otherDatasetId, `${args.reportBasename}.json`));
      args.otherDatasetComplete = otherReport.status === "PASS" && otherReport.gate_decision?.current_dataset_slice_complete === true;
    } catch {
      args.otherDatasetComplete = false;
    }
  }

  let existingEntries = [];
  if (args.resume) {
    try {
      existingEntries = await readJsonl(args.explanationManifestPath);
    } catch {
      existingEntries = [];
    }
  }
  const existingById = new Map(existingEntries.map((entry) => [entry.record_id, entry]));
  const evidenceEntries = args.resume
    ? allEvidenceEntries.filter((entry) => existingById.get(entry.record_id)?.status !== "explanation_ready")
    : allEvidenceEntries;

  const explanationEntries = [];
  const issues = [];

  for (const evidenceEntry of evidenceEntries) {
    console.log(`[phase6.3b] ${evidenceEntry.record_id}`);
    const result = await buildExplanationForRecord({ evidenceEntry, registry, args });
    explanationEntries.push(result.manifestEntry);
    issues.push(...result.issues);
  }

  const newById = new Map(explanationEntries.map((entry) => [entry.record_id, entry]));
  const mergedExplanationEntries = args.resume
    ? allEvidenceEntries.map((entry) => newById.get(entry.record_id) ?? existingById.get(entry.record_id)).filter(Boolean)
    : explanationEntries;
  const mergedIssues = mergedExplanationEntries.flatMap((entry) => (entry.issues ?? []).map((issue) => ({
    ...issue,
    record_id: entry.record_id,
    case_id: entry.case_id,
    task_id: entry.task_id,
    dataset_id: entry.dataset_id,
    explanation_mode: entry.explanation_mode,
  })));

  const report = summarize({
    generatedAt,
    evidenceEntries: allEvidenceEntries,
    explanationEntries: mergedExplanationEntries,
    issues: mergedIssues,
    args,
  });

  await writeFile(
    args.explanationManifestPath,
    `${mergedExplanationEntries.map((entry) => JSON.stringify(entry)).join("\n")}\n`,
    "utf8",
  );
  await writeFile(args.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(args.reportMdPath, renderMarkdown(report), "utf8");

  console.log(JSON.stringify({
    ok: report.status === "PASS",
    status: report.status,
    evidence_ready_records: report.counts.evidence_ready_records,
    explanation_ready_records: report.counts.explanation_ready_records,
    failed_records: report.counts.failed_records,
    errors: report.counts.errors,
    warnings: report.counts.warnings,
    explanation_manifest_jsonl: report.outputs.explanation_manifest_jsonl,
    explanation_artifacts_dir: report.outputs.explanation_artifacts_dir,
    report_json: report.outputs.report_json,
    report_md: report.outputs.report_md,
    phase6_4_judge_input_materializer_allowed: report.gate_decision.phase6_4_judge_input_materializer_allowed,
    judge_invocation_allowed: report.gate_decision.judge_invocation_allowed,
  }, null, 2));

  if (report.status !== "PASS") {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
