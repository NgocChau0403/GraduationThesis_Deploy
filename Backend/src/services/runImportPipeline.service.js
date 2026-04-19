import { confirmMapping } from "./mappingConfirm.service.js";
import { transformRawRowsToCanonical } from "./mappingTransform.service.js";
import { mergeCanonicalEntities } from "./canonicalMerge.service.js";
import { constructCanonicalFeatures } from "./canonicalFeature.service.js";
import { canonicalToFlat } from "./canonicalToFlat.service.js";
import { saveFlatTablesToDb } from "./saveFlatTables.service.js";

// ==========================================
// CONSTANTS
// ==========================================

const DEFAULT_PIPELINE_OPTIONS = {
  saveFlatOutput: false,
  replaceIfExists: true,
  importBatchId: null,
  chunkSize: 500,
  allowAutoConfirmMapping: false,
  confirmAt: null
};

// ==========================================
// HELPERS
// ==========================================

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function ensureArray(value, name) {
  if (!Array.isArray(value)) {
    const error = new Error(`${name} must be an array.`);
    error.code = "INVALID_IMPORT_PIPELINE_INPUT";
    throw error;
  }
}

function ensurePlainObject(value, name) {
  if (!isPlainObject(value)) {
    const error = new Error(`${name} must be a plain object.`);
    error.code = "INVALID_IMPORT_PIPELINE_INPUT";
    throw error;
  }
}

function normalizePipelineOptions(options = {}) {
  return {
    ...DEFAULT_PIPELINE_OPTIONS,
    ...options
  };
}

function createPipelineMetadata(options) {
  const startedAt = new Date();

  return {
    started_at: startedAt.toISOString(),
    completed_at: null,
    duration_ms: null,
    options: {
      saveFlatOutput: options.saveFlatOutput,
      replaceIfExists: options.replaceIfExists,
      chunkSize: options.chunkSize,
      importBatchId: options.importBatchId,
      allowAutoConfirmMapping: options.allowAutoConfirmMapping
    }
  };
}

function assertConfirmedMapping(mappingConfig) {
  if (!isPlainObject(mappingConfig)) {
    const error = new Error("mappingConfig must be a plain object.");
    error.code = "INVALID_IMPORT_PIPELINE_INPUT";
    throw error;
  }

  if (mappingConfig.mapping_status !== "confirmed") {
    const error = new Error(
      'mappingConfig must have mapping_status = "confirmed" to run the import pipeline.'
    );
    error.code = "UNCONFIRMED_MAPPING_CONFIG";
    throw error;
  }
}

function validatePipelineInputs({ mappingConfig, profilingResult, rawRows }) {
  ensurePlainObject(mappingConfig, "mappingConfig");
  ensurePlainObject(profilingResult, "profilingResult");
  ensureArray(rawRows, "rawRows");

  if (!Array.isArray(mappingConfig.field_mappings)) {
    const error = new Error("mappingConfig.field_mappings must be an array.");
    error.code = "INVALID_IMPORT_PIPELINE_INPUT";
    throw error;
  }

  if (!Array.isArray(profilingResult.columns)) {
    const error = new Error("profilingResult.columns must be an array.");
    error.code = "INVALID_IMPORT_PIPELINE_INPUT";
    throw error;
  }
}

function countEntityRows(entityObject = {}) {
  if (!isPlainObject(entityObject)) return {};

  return Object.fromEntries(
    Object.entries(entityObject).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.length : 0
    ])
  );
}

function buildPipelineSummary({
  rawRows,
  transformResult,
  mergeResult,
  flatResult,
  saveResult
}) {
  return {
    raw_row_count: Array.isArray(rawRows) ? rawRows.length : 0,
    transformed_counts: countEntityRows(transformResult?.output),
    merged_counts: countEntityRows(mergeResult?.output),
    flat_table_counts: countEntityRows(flatResult?.output),
    saved_counts: saveResult?.summary ?? null
  };
}

function finalizeMetadata(metadata) {
  metadata.completed_at = new Date().toISOString();
  metadata.duration_ms =
    new Date(metadata.completed_at).getTime() -
    new Date(metadata.started_at).getTime();
}

function createPipelineError(message, phase, cause) {
  const error = new Error(message);
  error.code = "IMPORT_PIPELINE_FAILED";
  error.phase = phase;
  error.cause = cause;
  return error;
}

// ==========================================
// MAIN SERVICE
// ==========================================

export async function runImportPipeline({
  mappingConfig,
  profilingResult,
  rawRows,
  options = {}
}) {
  const resolvedOptions = normalizePipelineOptions(options);
  const metadata = createPipelineMetadata(resolvedOptions);

  try {
    validatePipelineInputs({ mappingConfig, profilingResult, rawRows });

    let mappingForPipeline = mappingConfig;

    if (
      resolvedOptions.allowAutoConfirmMapping &&
      mappingConfig.mapping_status !== "confirmed"
    ) {
      mappingForPipeline = confirmMapping({
        mappingConfig,
        profilingResult,
        confirmedAt: resolvedOptions.confirmAt || new Date().toISOString()
      }).mappingConfig;
    }

    assertConfirmedMapping(mappingForPipeline);

    const transformResult = transformRawRowsToCanonical({
      mappingConfig: mappingForPipeline,
      profilingResult,
      rawRows
    });

    const mergeResult = mergeCanonicalEntities({
      canonicalOutput: transformResult.output
    });

    const featureResult = constructCanonicalFeatures({
      canonicalOutput: mergeResult.output
    });

    const flatResult = canonicalToFlat({
      canonicalOutput: featureResult.output
    });

    let saveResult = null;

    if (resolvedOptions.saveFlatOutput) {
      saveResult = await saveFlatTablesToDb({
        flatOutput: flatResult.output,
        importBatchId: resolvedOptions.importBatchId,
        replaceIfExists: resolvedOptions.replaceIfExists,
        chunkSize: resolvedOptions.chunkSize
      });
    }

    finalizeMetadata(metadata);

    return {
      success: true,
      metadata,
      profilingResult,
      mappingConfigUsed: mappingForPipeline,
      summary: buildPipelineSummary({
        rawRows,
        transformResult,
        mergeResult,
        flatResult,
        saveResult
      }),
      transformResult,
      mergeResult,
      featureResult,
      flatResult,
      saveResult
    };
  } catch (cause) {
    finalizeMetadata(metadata);

    throw createPipelineError(
      "Import pipeline execution failed.",
      "PIPELINE_EXECUTION",
      cause
    );
  }
}