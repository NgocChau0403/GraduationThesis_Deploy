import crypto from "crypto";
import prisma from "../lib/prisma.js";

// ==========================================
// CONSTANTS
// ==========================================

const DEFAULT_CHUNK_SIZE = 500;

const REQUIRED_FLAT_TABLES = [
  "flat_student_summary",
  "flat_assessment_result",
  "flat_engagement_event"
];

// ==========================================
// HELPERS
// ==========================================

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function ensureArray(value, label) {
  if (!Array.isArray(value)) {
    throw new Error(`${label} must be an array.`);
  }
}

function createImportBatchId(prefix = "import") {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

function chunkArray(array, chunkSize = DEFAULT_CHUNK_SIZE) {
  const chunks = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
}

function sanitizeRow(row) {
  if (!isPlainObject(row)) {
    return {};
  }

  const cloned = { ...row };

  // helper fields produced during transform / intermediate stages
  delete cloned._target_entity;

  // Prisma auto fields should not be inserted manually
  delete cloned.id;
  delete cloned.created_at;
  delete cloned.updated_at;

  return cloned;
}

function sanitizeRows(rows) {
  return rows.map(sanitizeRow);
}

function attachImportBatchId(rows, importBatchId) {
  return rows.map((row) => ({
    ...row,
    import_batch_id: importBatchId
  }));
}

function validateFlatOutputShape(flatOutput) {
  if (!isPlainObject(flatOutput)) {
    throw new Error("flatOutput must be a plain object.");
  }

  for (const tableName of REQUIRED_FLAT_TABLES) {
    if (!(tableName in flatOutput)) {
      throw new Error(`flatOutput is missing required table "${tableName}".`);
    }

    ensureArray(flatOutput[tableName], tableName);
  }
}

function countRows(flatOutput) {
  return {
    flat_student_summary_count: flatOutput.flat_student_summary.length,
    flat_assessment_result_count: flatOutput.flat_assessment_result.length,
    flat_engagement_event_count: flatOutput.flat_engagement_event.length
  };
}

async function insertManyInChunks(tx, prismaModelDelegate, rows, chunkSize) {
  const chunks = chunkArray(rows, chunkSize);

  for (const chunk of chunks) {
    if (chunk.length === 0) continue;

    await prismaModelDelegate.createMany({
      data: chunk
    });
  }
}

// ==========================================
// MAIN SERVICE
// ==========================================

export async function saveFlatTablesToDb({
  flatOutput,
  importBatchId = null,
  replaceIfExists = true,
  chunkSize = DEFAULT_CHUNK_SIZE
}) {
  validateFlatOutputShape(flatOutput);

  if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
    throw new Error("chunkSize must be a positive integer.");
  }

  const resolvedImportBatchId = importBatchId || createImportBatchId("import");

  const studentRows = attachImportBatchId(
    sanitizeRows(flatOutput.flat_student_summary),
    resolvedImportBatchId
  );

  const assessmentRows = attachImportBatchId(
    sanitizeRows(flatOutput.flat_assessment_result),
    resolvedImportBatchId
  );

  const engagementRows = attachImportBatchId(
    sanitizeRows(flatOutput.flat_engagement_event),
    resolvedImportBatchId
  );

  await prisma.$transaction(async (tx) => {
    if (replaceIfExists) {
      await tx.flatEngagementEvent.deleteMany({
        where: { import_batch_id: resolvedImportBatchId }
      });

      await tx.flatAssessmentResult.deleteMany({
        where: { import_batch_id: resolvedImportBatchId }
      });

      await tx.flatStudentSummary.deleteMany({
        where: { import_batch_id: resolvedImportBatchId }
      });
    }

    await insertManyInChunks(tx, tx.flatStudentSummary, studentRows, chunkSize);
    await insertManyInChunks(tx, tx.flatAssessmentResult, assessmentRows, chunkSize);
    await insertManyInChunks(tx, tx.flatEngagementEvent, engagementRows, chunkSize);
  });

  return {
    import_batch_id: resolvedImportBatchId,
    summary: {
      ...countRows(flatOutput),
      replace_if_exists: replaceIfExists,
      chunk_size: chunkSize
    }
  };
}