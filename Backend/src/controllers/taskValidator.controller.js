import capabilityValidatorService from "../services/capabilityValidator.service.js";
import prisma from "../lib/prisma.js";

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Resolve batch context from datasetId
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolves { batchId, sourceDataset } from an import_batch record.
 * The frontend passes the batch UUID as "datasetId".
 *
 * @param {string} datasetId - UUID of the import_batch
 * @returns {{ batchId: string, sourceDataset: string }}
 */
async function resolveBatchContext(datasetId) {
  // Prisma model name: ImportBatch → accessor: prisma.importBatch (camelCase)
  // PK field in schema.prisma: batch_id (NOT id)
  const batch = await prisma.importBatch.findUnique({
    where:  { batch_id: datasetId },
    select: { batch_id: true, source_dataset: true },
  });

  if (!batch) {
    throw Object.assign(new Error(`Dataset "${datasetId}" not found.`), {
      statusCode: 404,
    });
  }

  return {
    batchId:       batch.batch_id,
    sourceDataset: batch.source_dataset, // "OULAD" | "UCI"
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLLER: Validate ALL tasks for a given dataset
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/tasks/validate/:datasetId?classId=...
 *
 * Validates all 53 tasks in the registry against the specified dataset/batch.
 * Returns a sorted array of validation results.
 *
 * Query params:
 *   classId (optional) — filters Layer C/D checks to a specific class
 */
export async function validateAllTasksController(req, res) {
  try {
    const { datasetId } = req.params;
    const { classId }   = req.query;

    const { batchId, sourceDataset } = await resolveBatchContext(datasetId);

    const results = await capabilityValidatorService.validateAll({
      batchId,
      classId: classId || null,
      sourceDataset,
    });

    // Summary stats for the frontend dashboard
    const summary = {
      total:            results.length,
      executable:       results.filter((r) => r.status === "executable").length,
      partial:          results.filter((r) => r.status === "partial").length,
      insufficient_data: results.filter((r) => r.status === "insufficient_data").length,
      unsupported:      results.filter((r) => r.status === "unsupported").length,
    };

    return res.status(200).json({
      success: true,
      datasetId,
      sourceDataset,
      classId:  classId || null,
      summary,
      results,
    });
  } catch (err) {
    console.error("[validateAllTasksController]", err);
    return res.status(err.statusCode ?? 500).json({
      success: false,
      error:   err.message,
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLLER: Validate ONE task
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /api/tasks/validate-one/:taskId?datasetId=...&classId=...
 *
 * Validates a single task against the specified dataset/batch.
 * Used by the frontend before executing a specific task.
 *
 * Query params:
 *   datasetId (required) — UUID of the import_batch
 *   classId   (optional) — filters Layer C/D checks to a specific class
 */
export async function validateOneTaskController(req, res) {
  try {
    const { taskId }    = req.params;
    const { datasetId, classId } = req.query;

    if (!datasetId) {
      return res.status(400).json({
        success: false,
        error:   "Missing required query param: datasetId",
      });
    }

    const { batchId, sourceDataset } = await resolveBatchContext(datasetId);

    const result = await capabilityValidatorService.validateTask(taskId, {
      batchId,
      classId: classId || null,
      sourceDataset,
    });

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    console.error("[validateOneTaskController]", err);
    return res.status(err.statusCode ?? 500).json({
      success: false,
      error:   err.message,
    });
  }
}
