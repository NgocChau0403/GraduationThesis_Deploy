import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATASET_ID = "SAMPLE_UCI_POR";
const LOG_DIR = path.resolve("Docs/evaluation/automatic_logs");
const OUTPUT_FILE = path.join(LOG_DIR, "performance_auto_SAMPLE_UCI_POR.json");

const INPUT_FILES = {
  api_contract: path.join(LOG_DIR, "api_contract_auto_SAMPLE_UCI_POR.json"),
  visualization: path.join(LOG_DIR, "visualization_auto_SAMPLE_UCI_POR.json"),
  ai_explanations: path.join(LOG_DIR, "ai_explanations_auto_SAMPLE_UCI_POR.json"),
  coverage_human_utility: path.join(LOG_DIR, "coverage_human_utility_auto_SAMPLE_UCI_POR.json"),
  import_performance: path.join(LOG_DIR, "import_performance_auto_SAMPLE_UCI_POR.json"),
  basic_api_benchmark: path.join(LOG_DIR, "performance_benchmark_auto_SAMPLE_UCI_POR.json"),
};

const THRESHOLDS = {
  analytics_query_ms: 5000,
  ai_explanation_ms: 15000,
  failure_rate_pct: 10,
  timeout_rate_pct: 10,
  degraded_rate_pct: 20,
};

async function readJson(file) {
  const text = await readFile(file, "utf8");
  return JSON.parse(text);
}

async function readJsonOptional(file) {
  try {
    return await readJson(file);
  } catch {
    return null;
  }
}

function isFiniteNumber(value) {
  return Number.isFinite(Number(value));
}

function toNumber(value) {
  return Number(value);
}

function round(value, digits = 2) {
  if (!Number.isFinite(value)) return null;
  return Number(value.toFixed(digits));
}

function pct(part, total) {
  return total > 0 ? round((part / total) * 100) : null;
}

function percentile(values, p) {
  const nums = values.map(toNumber).filter(Number.isFinite).sort((a, b) => a - b);
  if (nums.length === 0) return null;
  const idx = Math.ceil((p / 100) * nums.length) - 1;
  return nums[Math.min(Math.max(idx, 0), nums.length - 1)];
}

function stats(values) {
  const nums = values.map(toNumber).filter(Number.isFinite);
  if (nums.length === 0) {
    return {
      count: 0,
      avg_ms: null,
      median_ms: null,
      p95_ms: null,
      min_ms: null,
      max_ms: null,
    };
  }

  const sorted = [...nums].sort((a, b) => a - b);
  const sum = nums.reduce((acc, value) => acc + value, 0);
  return {
    count: nums.length,
    avg_ms: round(sum / nums.length),
    median_ms: round(percentile(sorted, 50)),
    p95_ms: round(percentile(sorted, 95)),
    min_ms: round(sorted[0]),
    max_ms: round(sorted[sorted.length - 1]),
  };
}

function tokenStats(values, unit = "") {
  const nums = values.map(toNumber).filter(Number.isFinite);
  if (nums.length === 0) {
    return {
      count: 0,
      avg: null,
      median: null,
      p95: null,
      min: null,
      max: null,
      unit,
    };
  }
  const sorted = [...nums].sort((a, b) => a - b);
  const sum = nums.reduce((acc, value) => acc + value, 0);
  return {
    count: nums.length,
    avg: round(sum / nums.length, unit === "usd" ? 6 : 2),
    median: round(percentile(sorted, 50), unit === "usd" ? 6 : 2),
    p95: round(percentile(sorted, 95), unit === "usd" ? 6 : 2),
    min: round(sorted[0], unit === "usd" ? 6 : 2),
    max: round(sorted[sorted.length - 1], unit === "usd" ? 6 : 2),
    unit,
  };
}

function hasTimeoutError(error) {
  return /timeout|statement timeout|57014|ECONNABORTED/i.test(String(error || ""));
}

function summarizeAnalytics(apiLog) {
  const results = Array.isArray(apiLog?.results) ? apiLog.results : [];
  const attempted = results.filter((item) => item.analytics_run_attempted);
  const successes = attempted.filter((item) => item.http_status === 200 && item.response_success === true);
  const failures = attempted.filter((item) => item.http_status !== 200 || item.response_success !== true);
  const timeouts = failures.filter((item) => hasTimeoutError(item.error));
  const latencies = attempted.map((item) => item.latency_ms).filter(isFiniteNumber);
  const successLatencies = successes.map((item) => item.latency_ms).filter(isFiniteNumber);

  return {
    attempted_count: attempted.length,
    success_count: successes.length,
    failure_count: failures.length,
    timeout_count: timeouts.length,
    success_rate: pct(successes.length, attempted.length),
    failure_rate: pct(failures.length, attempted.length),
    timeout_rate: pct(timeouts.length, attempted.length),
    latency_all: stats(latencies),
    latency_success_only: stats(successLatencies),
    failed_tasks: failures.map((item) => ({
      taskId: item.taskId,
      taskName: item.taskName,
      http_status: item.http_status,
      latency_ms: item.latency_ms,
      timeout: hasTimeoutError(item.error),
      error: item.error,
    })),
    slow_tasks_over_threshold: attempted
      .filter((item) => Number(item.latency_ms) > THRESHOLDS.analytics_query_ms)
      .map((item) => ({
        taskId: item.taskId,
        taskName: item.taskName,
        http_status: item.http_status,
        latency_ms: item.latency_ms,
        error: item.error,
      }))
      .sort((a, b) => Number(b.latency_ms) - Number(a.latency_ms)),
  };
}

function summarizeVisualization(visualizationLog) {
  const results = Array.isArray(visualizationLog?.results) ? visualizationLog.results : [];
  const attempted = results.filter((item) => item.visualization_attempted);
  const adapterCrashed = attempted.filter((item) => item.adapter_crashed);
  const failed = attempted.filter((item) => item.result === "fail");
  const skippedApi = results.filter((item) => item.skip_reason === "analytics_api_failed_or_not_success");
  const adapterLatencies = attempted.map((item) => item.adapter_latency_ms).filter(isFiniteNumber);

  return {
    attempted_count: attempted.length,
    adapter_crash_count: adapterCrashed.length,
    adapter_success_rate: pct(attempted.length - adapterCrashed.length, attempted.length),
    overall_pass_count: attempted.filter((item) => item.result === "pass").length,
    overall_pass_rate: pct(attempted.filter((item) => item.result === "pass").length, attempted.length),
    expected_no_data_count: attempted.filter((item) => item.expected_no_data).length,
    skipped_by_api_count: skippedApi.length,
    failed_visualization_count: failed.length,
    failed_visualization_tasks: failed.map((item) => ({
      taskId: item.taskId,
      taskName: item.taskName,
      viz_type: item.viz_type,
      api_row_count: item.api_row_count,
      chart_row_count: item.chart_row_count,
      renderable: item.renderable,
      expected_no_data: item.expected_no_data,
      adapter_error: item.adapter_error,
    })),
    adapter_latency: stats(adapterLatencies),
    adapter_latency_note: adapterLatencies.length > 0
      ? "Adapter latency is measured around adapter.adapt(rawRows, config), excluding React/Recharts browser rendering time."
      : "Adapter processing latency was not available in the visualization log. Rerun runVisualizationUciPor.mjs to instrument adapter_latency_ms.",
  };
}

function summarizeAi(aiLog) {
  const results = Array.isArray(aiLog?.results) ? aiLog.results : [];
  const attempted = results.filter((item) => item.ai_attempted);
  const degraded = attempted.filter((item) => item.degraded);
  const schemaFailed = attempted.filter((item) => !item.schema_pass);
  const safetyFlagged = attempted.filter((item) => Number(item.safety_flags_count || 0) > 0);
  const latencies = attempted.map((item) => item.ai_latency_ms).filter(isFiniteNumber);
  const pythonLatencies = attempted.map((item) => item.python_latency_ms).filter(isFiniteNumber);
  const totalTokens = attempted.map((item) => item.total_tokens).filter(isFiniteNumber);
  const promptTokens = attempted.map((item) => item.token_usage?.prompt_tokens).filter(isFiniteNumber);
  const completionTokens = attempted.map((item) => item.token_usage?.completion_tokens).filter(isFiniteNumber);
  const costs = attempted.map((item) => item.cost_usd).filter(isFiniteNumber);
  const totalCost = costs.reduce((sum, value) => sum + Number(value), 0);

  return {
    attempted_count: attempted.length,
    response_count: attempted.filter((item) => item.ai_http_status === 200).length,
    response_rate: pct(attempted.filter((item) => item.ai_http_status === 200).length, attempted.length),
    degraded_count: degraded.length,
    degraded_rate: pct(degraded.length, attempted.length),
    schema_failed_count: schemaFailed.length,
    safety_flagged_count: safetyFlagged.length,
    safety_flag_rate: pct(safetyFlagged.length, attempted.length),
    latency_client_observed: stats(latencies),
    latency_python_reported: stats(pythonLatencies),
    total_tokens: tokenStats(totalTokens, "tokens"),
    prompt_tokens: tokenStats(promptTokens, "tokens"),
    completion_tokens: tokenStats(completionTokens, "tokens"),
    cost_per_explanation: tokenStats(costs, "usd"),
    total_cost_usd: round(totalCost, 6),
    slow_tasks_over_threshold: attempted
      .filter((item) => Number(item.ai_latency_ms) > THRESHOLDS.ai_explanation_ms)
      .map((item) => ({
        taskId: item.taskId,
        taskName: item.taskName,
        ai_latency_ms: item.ai_latency_ms,
        total_tokens: item.total_tokens,
        cost_usd: item.cost_usd,
      }))
      .sort((a, b) => Number(b.ai_latency_ms) - Number(a.ai_latency_ms)),
  };
}

function summarizeCoveragePerformance(coverageLog) {
  const availability = coverageLog?.coverage?.availability || {};
  return {
    runner_duration_ms: coverageLog?.duration_ms ?? null,
    task_validation_total: availability.total ?? null,
    runnable_count: availability.runnable_count ?? null,
    runnable_rate: availability.runnable_rate ?? null,
    executable_rate: availability.executable_rate ?? null,
    unsupported_rate: availability.unsupported_rate ?? null,
    note:
      "Coverage runner validates all tasks in one API call. Per-task validation latency was not separately instrumented in this aggregate log.",
  };
}

function summarizeImportPerformance(importLog) {
  if (!importLog) {
    return {
      available: false,
      note: "Import/reseed performance log not found. Run runImportPerformanceUciPor.mjs to measure SAMPLE_UCI_POR ETL performance.",
    };
  }

  const batch = importLog.preview?.batches?.[0] || {};
  return {
    available: true,
    status: importLog.status,
    preview_duration_ms: importLog.preview_duration_ms ?? null,
    apply_duration_ms: importLog.apply_duration_ms ?? null,
    total_duration_ms: importLog.total_duration_ms ?? null,
    canonical_row_count: batch.canonicalRowCount ?? null,
    canonical_counts: batch.canonicalCounts ?? null,
    raw_row_counts: batch.rawRowCounts ?? null,
    validation_errors_count: batch.validationErrorsCount ?? null,
    warnings_count: batch.warningsCount ?? null,
  };
}

function summarizeBasicApiBenchmark(benchmarkLog) {
  if (!benchmarkLog) {
    return {
      available: false,
      note: "Basic API benchmark log not found. Run runPerformanceBenchmarkUciPor.mjs to measure dashboard API latency.",
    };
  }

  return {
    available: true,
    request_count: benchmarkLog.metrics?.request_count ?? null,
    success_count: benchmarkLog.metrics?.success_count ?? null,
    failure_count: benchmarkLog.metrics?.failure_count ?? null,
    success_rate: benchmarkLog.metrics?.success_rate ?? null,
    latency: benchmarkLog.metrics?.latency ?? null,
    measurements: benchmarkLog.measurements || [],
  };
}

function evaluateThresholds({ analytics, ai, visualization }) {
  const checks = {
    analytics_failure_rate_acceptable:
      analytics.failure_rate !== null && analytics.failure_rate <= THRESHOLDS.failure_rate_pct,
    analytics_timeout_rate_acceptable:
      analytics.timeout_rate !== null && analytics.timeout_rate <= THRESHOLDS.timeout_rate_pct,
    analytics_success_p95_latency_acceptable:
      analytics.latency_success_only.p95_ms !== null
      && analytics.latency_success_only.p95_ms <= THRESHOLDS.analytics_query_ms,
    ai_degraded_rate_acceptable:
      ai.degraded_rate !== null && ai.degraded_rate <= THRESHOLDS.degraded_rate_pct,
    ai_p95_latency_acceptable:
      ai.latency_client_observed.p95_ms !== null
      && ai.latency_client_observed.p95_ms <= THRESHOLDS.ai_explanation_ms,
    visualization_adapter_crash_free:
      visualization.adapter_crash_count === 0,
  };

  return {
    thresholds: THRESHOLDS,
    checks,
    overall_performance_pass: Object.values(checks).every(Boolean),
  };
}

async function main() {
  const startedAt = new Date();
  const [apiLog, visualizationLog, aiLog, coverageLog, importLog, benchmarkLog] = await Promise.all([
    readJson(INPUT_FILES.api_contract),
    readJson(INPUT_FILES.visualization),
    readJson(INPUT_FILES.ai_explanations),
    readJson(INPUT_FILES.coverage_human_utility),
    readJsonOptional(INPUT_FILES.import_performance),
    readJsonOptional(INPUT_FILES.basic_api_benchmark),
  ]);

  const analytics = summarizeAnalytics(apiLog);
  const visualization = summarizeVisualization(visualizationLog);
  const ai = summarizeAi(aiLog);
  const taskValidationAndCoverage = summarizeCoveragePerformance(coverageLog);
  const importPerformance = summarizeImportPerformance(importLog);
  const basicApiBenchmark = summarizeBasicApiBenchmark(benchmarkLog);
  const thresholdEvaluation = evaluateThresholds({ analytics, ai, visualization });

  const output = {
    evaluation_part: "system_performance",
    datasetId: DATASET_ID,
    generated_at: new Date().toISOString(),
    duration_ms: Date.now() - startedAt.getTime(),
    source_logs: INPUT_FILES,
    method:
      "Aggregated from existing automatic evaluation logs to avoid rerunning analytics and AI calls. This captures observed latency, reliability, timeout, token usage, and cost from prior SAMPLE_UCI_POR evaluation runs.",
    analytics_queries: analytics,
    import_performance: importPerformance,
    basic_api_benchmark: basicApiBenchmark,
    visualization,
    ai_explanations: ai,
    task_validation_and_coverage: taskValidationAndCoverage,
    threshold_evaluation: thresholdEvaluation,
    concise_summary: {
      analytics_success_rate: analytics.success_rate,
      analytics_failure_rate: analytics.failure_rate,
      analytics_timeout_rate: analytics.timeout_rate,
      analytics_success_p95_latency_ms: analytics.latency_success_only.p95_ms,
      visualization_adapter_success_rate: visualization.adapter_success_rate,
      visualization_adapter_avg_latency_ms: visualization.adapter_latency.avg_ms,
      import_apply_duration_ms: importPerformance.apply_duration_ms ?? null,
      basic_api_avg_latency_ms: basicApiBenchmark.latency?.avg_ms ?? null,
      ai_response_rate: ai.response_rate,
      ai_degraded_rate: ai.degraded_rate,
      ai_avg_latency_ms: ai.latency_client_observed.avg_ms,
      ai_p95_latency_ms: ai.latency_client_observed.p95_ms,
      ai_avg_tokens: ai.total_tokens.avg,
      ai_total_cost_usd: ai.total_cost_usd,
      overall_performance_pass: thresholdEvaluation.overall_performance_pass,
    },
  };

  await mkdir(LOG_DIR, { recursive: true });
  await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  console.log(`Performance auto log written: ${OUTPUT_FILE}`);
  console.log(JSON.stringify(output.concise_summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
