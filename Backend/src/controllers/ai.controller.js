/**
 * ai.controller.js
 * Node proxy: enriches payload with task metadata → forwards to Python FastAPI AI service.
 *
 * Phase 3 STEP 3 — Skeleton (DEGRADED fallback only until Python service is live)
 *
 * Flow:
 *   Frontend → POST /api/ai/explain
 *     → read task from taskRegistryService
 *     → build enriched payload (adds explanation_strategy, target_audience, analysis_context, visualization_config)
 *     → POST to AI_SERVICE_URL/explain (axios, timeout=AI_SERVICE_TIMEOUT_MS)
 *     → return structured response or DEGRADED if service down
 */

import axios from "axios";
import taskRegistryService from "../services/taskRegistry.service.js";
import prisma from "../lib/prisma.js";
const AI_SERVICE_URL     = process.env.AI_SERVICE_URL      || "http://localhost:8000";
const AI_SERVICE_TIMEOUT = parseInt(process.env.AI_SERVICE_TIMEOUT_MS) || 15000;

/**
 * Build the DEGRADED response shape (CONTRACT 3).
 * Returned whenever Python service is unavailable — chart rendering is never blocked.
 */
function buildDegradedResponse(taskId, executionId, reason) {
  return {
    task_id:              taskId      ?? null,
    execution_id:         executionId ?? null,
    degraded:             true,
    explanation: {
      summary:                  "AI explanation is temporarily unavailable.",
      insights:                 [],
      educational_implications: [],
      recommendations:          [],
      warnings:                 [reason ?? "LLM service timeout. Please try again later."],
    },
    confidence:           { level: null, reason: null, based_on: [] },
    explanation_type:     null,
    explanation_strategy: null,
    safety_flags:         [],
    meta: {
      model:       null,
      latency_ms:  AI_SERVICE_TIMEOUT + 1,
      token_usage: null,
      strategy:    null,
      granularity: null,
      cost_usd:    null,
    },
  };
}

/**
 * Helper: Create a lightweight snapshot of datasets for logging (avoid storing heavy raw rows).
 */
function buildDatasetsSnapshot(datasets) {
  if (!datasets || typeof datasets !== "object") return null;
  const snapshot = {};
  for (const [label, rows] of Object.entries(datasets)) {
    if (!Array.isArray(rows)) continue;
    const nullCount = rows.filter(r => Object.values(r).some(v => v === null)).length;
    snapshot[label] = {
      rowCount: rows.length,
      nullPct:  rows.length > 0 ? +(nullCount / rows.length).toFixed(3) : 0,
    };
  }
  return snapshot;
}

/**
 * Helper: Asynchronously log the AI execution to Prisma without blocking the request.
 */
async function logExplanation({ payload, responseData, isDegraded, degradedReason, startTime }) {
  const latencyMs = Date.now() - startTime;
  
  try {
    const studentId = payload.student_context?.student_id ?? null;
    const meta = responseData?.meta ?? {};

    await prisma.aiExplanationLog.create({
      data: {
        execution_id:         payload.execution_id,
        task_id:              payload.task_id,
        student_id:           studentId,

        // Strategy metadata (snapshot from registry)
        explanation_strategy: payload.explanation_strategy ?? "unknown",
        target_audience:      payload.target_audience ?? [],
        granularity:          payload.analysis_context?.granularity ?? null,
        aggregation_level:    payload.analysis_context?.aggregation_level ?? null,

        // Outcome
        is_degraded:          isDegraded,
        degraded_reason:      degradedReason ?? null,

        // Quality
        confidence_level:     responseData?.confidence?.level ?? null,
        confidence_reason:    responseData?.confidence?.reason ?? null,

        // Output Storage
        explanation_text:     responseData?.explanation?.summary ?? null,
        structured_output:    responseData ?? null,
        datasets_snapshot:    buildDatasetsSnapshot(payload.datasets),

        // Timing
        latency_ms:           latencyMs,
        python_latency_ms:    meta.latency_ms ?? null,

        // Provenance
        model_version:        meta.model ?? null,
        prompt_token_count:   meta.token_usage?.prompt_tokens ?? null,
        response_token_count: meta.token_usage?.completion_tokens ?? null,
      }
    });
  } catch (err) {
    console.error("[ai.controller] Failed to log AI explanation to Prisma:", err.message);
  }
}

/**
 * POST /api/ai/explain
 */
export async function explainController(req, res) {
  const { taskId, executionId, datasets, meta, studentContext } = req.body;
  const startTime = Date.now();

  // ── Validation ─────────────────────────────────────────────────────────────
  if (!taskId) {
    return res.status(400).json({
      success: false,
      error: { code: "MISSING_FIELD", message: "taskId is required." },
    });
  }
  if (!executionId) {
    return res.status(400).json({
      success: false,
      error: { code: "MISSING_FIELD", message: "executionId is required." },
    });
  }
  if (!datasets || typeof datasets !== "object") {
    return res.status(400).json({
      success: false,
      error: { code: "MISSING_FIELD", message: "datasets object is required." },
    });
  }

  // ── Resolve task metadata ───────────────────────────────────────────────────
  const task = taskRegistryService.getTaskById(taskId);
  if (!task) {
    return res.status(404).json({
      success: false,
      error: { code: "TASK_NOT_FOUND", message: `No task found with id '${taskId}'.` },
    });
  }

  // ── Build enriched payload (node enriches with task metadata) ───────────────
  const payload = {
    task_id:              taskId,
    execution_id:         executionId,
    task_name:            task.taskName,
    analysis_type:        task.analytics?.analysisType ?? null,
    explanation_strategy: task.explanation_strategy,          // from registry (STEP 2b)
    explanation_type:     task.analytics?.explanationType ?? null,
    ai_prompt_hint:       task.aiPromptHint ?? null,
    actionable_question:  task.actionableQuestion ?? null,
    target_audience:      task.target_audience,               // from registry (STEP 2b)
    visualization_config: task.visualization_config ?? null,  // from registry (STEP 2a)
    analysis_context:     task.analysis_context ?? null,      // from registry (STEP 2b)
    datasets,
    confidence: {
      level:  meta?.dataQuality?.confidence        ?? "LOW",
      reason: meta?.dataQuality?.confidence_reason ?? "Unknown.",
    },
    student_context: studentContext ?? null,
    query_labels:    task.query_labels ?? []
  };

  // ── Forward to Python AI service ────────────────────────────────────────────
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/explain`,
      payload,
      { timeout: AI_SERVICE_TIMEOUT },
    );
    
    // Log asynchronously
    logExplanation({
      payload,
      responseData: response.data,
      isDegraded: false,
      startTime
    });

    return res.json(response.data);
  } catch (err) {
    // Graceful degradation — chart is NEVER blocked by AI failure
    const reason =
      err.code === "ECONNABORTED"
        ? `AI service timeout after ${AI_SERVICE_TIMEOUT}ms.`
        : err.code === "ECONNREFUSED"
        ? "AI service unavailable (connection refused)."
        : `AI service error: ${err.message}`;

    console.error(`[ai.controller] Degraded — ${reason}`);
    const degradedResponse = buildDegradedResponse(taskId, executionId, reason);
    
    // Log fallback asynchronously
    logExplanation({
      payload,
      responseData: degradedResponse,
      isDegraded: true,
      degradedReason: reason,
      startTime
    });

    // Return 200 OK with degraded=true so frontend fetch doesn't throw
    // Wait, contract 3 says Node proxy returns the response. Usually 200 is better for degraded UI.
    // Changing from 503 to 200 because it's a handled fallback, not a complete server crash.
    return res.status(200).json(degradedResponse);
  }
}
