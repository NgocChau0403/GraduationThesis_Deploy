import { bundleTransformCanonical } from "./bundleTransform.service.js";
import { mergeCanonicalEntities } from "./canonicalMerge.service.js";
import { constructCanonicalFeatures } from "./canonicalFeature.service.js";
import { canonicalToFlat } from "./canonicalToFlat.service.js";
import { saveFlatTablesToDb } from "./saveFlatTables.service.js";

// ==========================================
// CONSTANTS
// ==========================================

const DEFAULT_OPTIONS = {
  saveFlatOutput: true,
  replaceIfExists: true,
  chunkSize: 500,
  importBatchId: null
};

// ==========================================
// HELPERS
// ==========================================

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeOptions(options = {}) {
  return {
    ...DEFAULT_OPTIONS,
    ...(isPlainObject(options) ? options : {})
  };
}

function buildMetadata(options) {
  return {
    started_at: new Date().toISOString(),
    completed_at: null,
    duration_ms: null,
    options: deepClone(options)
  };
}

function finalizeMetadata(metadata, startedAtMs) {
  metadata.completed_at = new Date().toISOString();
  metadata.duration_ms = Date.now() - startedAtMs;
  return metadata;
}

function createPipelineError(message, phase, cause = null) {
  const error = new Error(message);
  error.code = "BUNDLE_IMPORT_PIPELINE_FAILED";
  error.phase = phase;
  error.cause = cause;
  return error;
}

function buildSummary({
  bundleTransformResult,
  mergeResult,
  featureResult,
  flatResult,
  saveResult
}) {
  return {
    total_files:
      bundleTransformResult?.summary?.total_files ?? 0,
    selected_files:
      bundleTransformResult?.summary?.selected_files ?? 0,
    transformed_files:
      bundleTransformResult?.summary?.transformed_files ?? 0,
    total_input_rows:
      bundleTransformResult?.summary?.total_input_rows ?? 0,

    canonical_counts_after_bundle_transform:
      bundleTransformResult?.summary?.output_entity_counts ?? {
        student: 0,
        course: 0,
        assessment: 0,
        engagement_event: 0
      },

    merged_counts:
      mergeResult?.summary?.entity_stats
        ? {
            student: mergeResult.summary.entity_stats.student.output_count,
            course: mergeResult.summary.entity_stats.course.output_count,
            assessment: mergeResult.summary.entity_stats.assessment.output_count,
            engagement_event:
              mergeResult.summary.entity_stats.engagement_event.output_count
          }
        : {
            student: 0,
            course: 0,
            assessment: 0,
            engagement_event: 0
          },

    flat_table_counts:
      flatResult?.summary?.flat_table_counts ?? null,

    saved_counts:
      saveResult?.summary ?? null
  };
}

// ==========================================
// MAIN SERVICE
// ==========================================

export async function runBundleImportPipeline({
  uploadedFiles,
  datasetName = "uploaded_dataset",
  sourceDataset = "CUSTOM",
  fileIds = null,
  options = {}
}) {
  const startedAtMs = Date.now();
  const resolvedOptions = normalizeOptions(options);
  const metadata = buildMetadata(resolvedOptions);

  try {
    if (!Array.isArray(uploadedFiles)) {
      const error = new Error("Invalid uploadedFiles: expected an array.");
      error.code = "INVALID_UPLOADED_FILES";
      throw error;
    }

    // ------------------------------------------
    // STEP 1 — Bundle Transform
    // ------------------------------------------
    let bundleTransformResult;
    try {
      bundleTransformResult = bundleTransformCanonical({
        uploadedFiles,
        datasetName,
        sourceDataset,
        fileIds
      });
    } catch (cause) {
      throw createPipelineError(
        "Bundle transform failed.",
        "BUNDLE_TRANSFORM",
        cause
      );
    }

    // ------------------------------------------
    // STEP 2 — Canonical Merge
    // ------------------------------------------
    let mergeResult;
    try {
      mergeResult = mergeCanonicalEntities({
        canonicalOutput: bundleTransformResult.output
      });
    } catch (cause) {
      throw createPipelineError(
        "Canonical merge failed.",
        "CANONICAL_MERGE",
        cause
      );
    }

    // ------------------------------------------
    // STEP 3 — Canonical Feature Construction
    // ------------------------------------------
    let featureResult;
    try {
      featureResult = constructCanonicalFeatures({
        canonicalOutput: mergeResult.output
      });
    } catch (cause) {
      throw createPipelineError(
        "Canonical feature construction failed.",
        "CANONICAL_FEATURE",
        cause
      );
    }

    // ------------------------------------------
    // STEP 4 — Canonical to Flat
    // ------------------------------------------
    let flatResult;
    try {
      flatResult = canonicalToFlat({
        canonicalOutput: featureResult.output
      });
    } catch (cause) {
      throw createPipelineError(
        "Canonical to flat transform failed.",
        "CANONICAL_TO_FLAT",
        cause
      );
    }

    // ------------------------------------------
    // STEP 5 — Save flat tables
    // ------------------------------------------
    let saveResult = null;

    if (resolvedOptions.saveFlatOutput) {
      try {
        saveResult = await saveFlatTablesToDb({
          flatOutput: flatResult.output,
          importBatchId: resolvedOptions.importBatchId,
          replaceIfExists: resolvedOptions.replaceIfExists,
          chunkSize: resolvedOptions.chunkSize
        });
      } catch (cause) {
        throw createPipelineError(
          "Saving flat tables failed.",
          "SAVE_FLAT_TABLES",
          cause
        );
      }
    }

    finalizeMetadata(metadata, startedAtMs);

    return {
      success: true,
      metadata,
      bundleTransformResult,
      mergeResult,
      featureResult,
      flatResult,
      saveResult,
      summary: buildSummary({
        bundleTransformResult,
        mergeResult,
        featureResult,
        flatResult,
        saveResult
      })
    };
  } catch (error) {
    finalizeMetadata(metadata, startedAtMs);

    return {
      success: false,
      metadata,
      error: {
        code: error.code || "BUNDLE_IMPORT_PIPELINE_FAILED",
        phase: error.phase || "UNKNOWN",
        message: error.message,
        cause: error.cause?.message || null
      }
    };
  }
}