import fs from "fs/promises";
import { parseCsvFileToRawRows } from "../services/csvParse.service.js";
import { profileCSV } from "../services/profiling.service.js";
import { suggestMappingsFromProfiling } from "../services/mappingSuggest.service.js";
import { confirmMapping } from "../services/mappingConfirm.service.js";
import { runImportPipeline } from "../services/runImportPipeline.service.js";
import { runBundleImportPipeline } from "../services/runBundleImportPipeline.service.js";
import {
  createUploadSession,
  getUploadSession,
  updateUploadSession
} from "../services/uploadSession.store.js";

import { detectCsvDelimiter } from "../services/fileFormat.service.js";
import {
  inferFileRole,
  detectDatasetType,
  detectBundleSchema
} from "../services/schemaDetect.service.js";

// ==========================================
// HELPERS
// ==========================================

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function buildFileId(fileName, index) {
  return `file_${index + 1}_${normalizeText(fileName) || "uploaded"}`;
}

function buildBundleProfilingResult(uploadedFiles) {
  const totalFiles = uploadedFiles.length;
  const totalRows = uploadedFiles.reduce(
    (sum, item) => sum + (item.rawRows?.length || 0),
    0
  );

  const fileSummaries = uploadedFiles.map((item) => ({
    fileId: item.fileId,
    fileName: item.fileName,
    inferredRole: item.inferredRole,
    rowCount: item.rawRows?.length || 0,
    columnCount: item.profilingResult?.columns?.length || 0,
    columns: (item.profilingResult?.columns || []).map((col) => ({
      raw_column: col.raw_column,
      detected_type: col.detected_type
    }))
  }));

  return {
    total_files: totalFiles,
    total_rows: totalRows,
    file_summaries: fileSummaries
  };
}

function buildBundleMappingSuggestion({
  uploadedFiles,
  datasetName,
  sourceDataset
}) {
  return {
    dataset_name: datasetName,
    source_dataset: sourceDataset,
    mapping_status: "draft",
    bundle_mode: uploadedFiles.length > 1,
    file_mappings: uploadedFiles.map((item) => ({
      fileId: item.fileId,
      fileName: item.fileName,
      inferredRole: item.inferredRole,
      mappingSuggestion: item.mappingSuggestion
    })),
    summary: {
      total_files: uploadedFiles.length,
      roles_detected: uploadedFiles.map((item) => ({
        fileId: item.fileId,
        fileName: item.fileName,
        inferredRole: item.inferredRole
      }))
    }
  };
}

function buildRunTargets(session, requestedFileIds = null) {
  const uploadedFiles = Array.isArray(session.uploadedFiles) ? session.uploadedFiles : [];

  if (!requestedFileIds || requestedFileIds.length === 0) {
    return uploadedFiles;
  }

  const requestedSet = new Set(requestedFileIds);
  return uploadedFiles.filter((file) => requestedSet.has(file.fileId));
}

// ==========================================
// 5. /api/import/profile
// Supports single-file and multi-file upload
// ==========================================

export async function profileImportController(req, res) {
  try {
    const files = Array.isArray(req.files)
      ? req.files
      : req.file
        ? [req.file]
        : [];

    if (files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one CSV file is required."
      });
    }

    const datasetNameInput = req.body.datasetName || "uploaded_dataset";
    const sourceDatasetInput = req.body.sourceDataset || "CUSTOM";

    const uploadedFiles = [];
    const detectedDatasetTypes = [];

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];

      // ------------------------------------------
      // STEP 1 — Detect delimiter
      // ------------------------------------------
      const delimiterInfo = await detectCsvDelimiter(file.path);

      // ------------------------------------------
      // STEP 2 — Parse raw rows using detected delimiter
      // ------------------------------------------
      const rawRows = await parseCsvFileToRawRows(file.path, {
        separator: delimiterInfo.delimiter
      });

      // ------------------------------------------
      // STEP 3 — Profile using same detected delimiter
      // ------------------------------------------
      const profilingResult = await profileCSV(file.path, {
        separator: delimiterInfo.delimiter
      });

      // ------------------------------------------
      // STEP 4 — Detect dataset type + role
      // ------------------------------------------
      const inferredDatasetType = detectDatasetType({
        fileName: file.originalname,
        profilingResult
      });

      const inferredRole = inferFileRole({
        fileName: file.originalname,
        profilingResult
      });

      detectedDatasetTypes.push(inferredDatasetType);

      // ------------------------------------------
      // STEP 5 — Build mapping suggestion
      // Use explicit user input if provided.
      // Otherwise fallback to inferred dataset type.
      // ------------------------------------------
      const effectiveDatasetName =
        datasetNameInput && datasetNameInput !== "uploaded_dataset"
          ? datasetNameInput
          : inferredDatasetType;

      const effectiveSourceDataset =
        sourceDatasetInput && sourceDatasetInput !== "CUSTOM"
          ? sourceDatasetInput
          : inferredDatasetType;

      const mappingSuggestion = suggestMappingsFromProfiling({
        profilingResult,
        datasetName: effectiveDatasetName,
        sourceDataset: effectiveSourceDataset
      });

      uploadedFiles.push({
        fileId: buildFileId(file.originalname, index),
        fileName: file.originalname,
        filePath: file.path,
        rawRows,
        profilingResult,
        delimiterInfo,
        inferredDatasetType,
        inferredRole,
        mappingSuggestion
      });
    }

    // ------------------------------------------
    // STEP 6 — Detect bundle schema
    // ------------------------------------------
    const bundleSchema = detectBundleSchema(uploadedFiles);

    // ------------------------------------------
    // STEP 7 — Resolve final dataset/source names
    // Priority:
    // 1. explicit user input
    // 2. unanimous inferred dataset type
    // 3. fallback CUSTOM
    // ------------------------------------------
    const uniqueDetectedDatasetTypes = [...new Set(detectedDatasetTypes)];
    const resolvedDatasetName =
      datasetNameInput && datasetNameInput !== "uploaded_dataset"
        ? datasetNameInput
        : uniqueDetectedDatasetTypes.length === 1
          ? uniqueDetectedDatasetTypes[0]
          : "CUSTOM";

    const resolvedSourceDataset =
      sourceDatasetInput && sourceDatasetInput !== "CUSTOM"
        ? sourceDatasetInput
        : uniqueDetectedDatasetTypes.length === 1
          ? uniqueDetectedDatasetTypes[0]
          : "CUSTOM";

    // ------------------------------------------
    // STEP 8 — Rebuild mapping suggestions if
    // final dataset/source resolution changed
    // ------------------------------------------
    const normalizedUploadedFiles = uploadedFiles.map((item) => ({
      ...item,
      mappingSuggestion: suggestMappingsFromProfiling({
        profilingResult: item.profilingResult,
        datasetName: resolvedDatasetName,
        sourceDataset: resolvedSourceDataset
      })
    }));

    const bundleProfilingResult = buildBundleProfilingResult(normalizedUploadedFiles);
    const bundleMappingSuggestion = buildBundleMappingSuggestion({
      uploadedFiles: normalizedUploadedFiles,
      datasetName: resolvedDatasetName,
      sourceDataset: resolvedSourceDataset
    });

    // ------------------------------------------
    // STEP 9 — Create session
    // ------------------------------------------
    const sessionId = createUploadSession({
      datasetName: resolvedDatasetName,
      sourceDataset: resolvedSourceDataset,
      uploadedFiles: normalizedUploadedFiles.map((item) => ({
        fileId: item.fileId,
        fileName: item.fileName,
        delimiterInfo: item.delimiterInfo,
        inferredDatasetType: item.inferredDatasetType,
        inferredRole: item.inferredRole,
        rawRows: item.rawRows,
        profilingResult: item.profilingResult,
        mappingSuggestion: item.mappingSuggestion,
        confirmedMappingConfig: null,
        mappingConfirmationResult: null,
        importResult: null
      })),
      bundleSchema,
      bundleProfilingResult,
      bundleMappingSuggestion
    });

    // ------------------------------------------
    // STEP 10 — Clean up temp uploaded files
    // ------------------------------------------
    await Promise.all(
      normalizedUploadedFiles.map((item) =>
        fs.unlink(item.filePath).catch(() => {})
      )
    );

    return res.json({
      success: true,
      sessionId,
      datasetName: resolvedDatasetName,
      sourceDataset: resolvedSourceDataset,
      bundleSchema,
      bundleProfilingResult,
      bundleMappingSuggestion,
      uploadedFiles: normalizedUploadedFiles.map((item) => ({
        fileId: item.fileId,
        fileName: item.fileName,
        delimiterInfo: item.delimiterInfo,
        inferredDatasetType: item.inferredDatasetType,
        inferredRole: item.inferredRole,
        profilingResult: item.profilingResult,
        mappingSuggestion: item.mappingSuggestion
      }))
    });
  } catch (error) {
    console.error("Import profiling failed:", error);

    return res.status(500).json({
      success: false,
      message: "Import profiling failed.",
      error: error.message
    });
  }
}

// ==========================================
// 6. /api/import/confirm-mapping
// Supports per-file confirm for multi-file bundle
// ==========================================

export async function confirmMappingController(req, res) {
  try {
    const { sessionId, fileId, mappingConfig } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "sessionId is required."
      });
    }

    if (!fileId) {
      return res.status(400).json({
        success: false,
        message: "fileId is required for multi-file mapping confirmation."
      });
    }

    if (!mappingConfig || typeof mappingConfig !== "object") {
      return res.status(400).json({
        success: false,
        message: "mappingConfig is required."
      });
    }

    const session = getUploadSession(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Upload session not found."
      });
    }

    const uploadedFiles = Array.isArray(session.uploadedFiles) ? session.uploadedFiles : [];
    const fileIndex = uploadedFiles.findIndex((item) => item.fileId === fileId);

    if (fileIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Uploaded file not found in session."
      });
    }

    const targetFile = uploadedFiles[fileIndex];

    const confirmationResult = confirmMapping({
      mappingConfig,
      profilingResult: targetFile.profilingResult
    });

    const nextUploadedFiles = [...uploadedFiles];
    nextUploadedFiles[fileIndex] = {
      ...targetFile,
      confirmedMappingConfig: confirmationResult.mappingConfig,
      mappingConfirmationResult: confirmationResult
    };

    updateUploadSession(sessionId, {
      uploadedFiles: nextUploadedFiles
    });

    return res.json({
      success: true,
      sessionId,
      fileId,
      mappingConfirmationResult: confirmationResult,
      confirmedMappingConfig: confirmationResult.mappingConfig
    });
  } catch (error) {
    console.error("Mapping confirmation failed:", error);

    return res.status(400).json({
      success: false,
      message: "Mapping confirmation failed.",
      error: error.message,
      validationResult: error.validationResult || null
    });
  }
}

// ==========================================
// 7. /api/import/run
// Supports running 1 or many confirmed files in same session
// ==========================================
export async function runImportController(req, res) {
  try {
    const { sessionId, fileIds = null, options = {} } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "sessionId is required."
      });
    }

    const session = getUploadSession(sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Upload session not found."
      });
    }

    const uploadedFiles = Array.isArray(session.uploadedFiles)
      ? session.uploadedFiles
      : [];

    if (uploadedFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No uploaded files found in session."
      });
    }

    const runTargets = buildRunTargets(session, fileIds);

    if (runTargets.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No uploaded files selected for import."
      });
    }

    // Check confirmed mappings first
    const unconfirmedFile = runTargets.find((file) => !file.confirmedMappingConfig);

    if (unconfirmedFile) {
      return res.status(400).json({
        success: false,
        message: `No confirmed mapping config available for file "${unconfirmedFile.fileName}". Confirm mapping first.`,
        fileId: unconfirmedFile.fileId
      });
    }

    // ------------------------------------------
    // SINGLE-FILE MODE
    // ------------------------------------------
    if (runTargets.length === 1) {
      const file = runTargets[0];

      const importBatchId =
        options.importBatchId
          ? `${options.importBatchId}__${file.fileId}`
          : `${sessionId}__${file.fileId}`;

      const pipelineResult = await runImportPipeline({
        mappingConfig: file.confirmedMappingConfig,
        profilingResult: file.profilingResult,
        rawRows: file.rawRows,
        options: {
          saveFlatOutput: true,
          replaceIfExists: options.replaceIfExists ?? true,
          importBatchId,
          chunkSize: options.chunkSize || 500,
          allowAutoConfirmMapping: false
        }
      });

      const nextUploadedFiles = uploadedFiles.map((item) =>
        item.fileId === file.fileId
          ? { ...item, importResult: pipelineResult }
          : item
      );

      updateUploadSession(sessionId, {
        uploadedFiles: nextUploadedFiles,
        bundleImportResult: null
      });

      return res.json({
        success: pipelineResult.success,
        sessionId,
        bundleMode: false,
        result: {
          fileId: file.fileId,
          fileName: file.fileName,
          inferredRole: file.inferredRole,
          importBatchId,
          result: pipelineResult
        }
      });
    }

    // ------------------------------------------
    // MULTI-FILE BUNDLE MODE
    // ------------------------------------------
    const bundleResult = await runBundleImportPipeline({
      uploadedFiles: runTargets,
      datasetName: session.datasetName,
      sourceDataset: session.sourceDataset,
      fileIds: runTargets.map((file) => file.fileId),
      options: {
        saveFlatOutput: true,
        replaceIfExists: options.replaceIfExists ?? true,
        importBatchId: options.importBatchId || sessionId,
        chunkSize: options.chunkSize || 500
      }
    });

    const nextUploadedFiles = uploadedFiles.map((file) => {
      const included = runTargets.some((target) => target.fileId === file.fileId);

      if (!included) return file;

      return {
        ...file,
        importResult: bundleResult
      };
    });

    updateUploadSession(sessionId, {
      uploadedFiles: nextUploadedFiles,
      bundleImportResult: bundleResult
    });

    return res.json({
      success: bundleResult.success,
      sessionId,
      bundleMode: true,
      result: bundleResult
    });
  } catch (error) {
    console.error("Import pipeline failed:", error);

    return res.status(500).json({
      success: false,
      message: "Import pipeline failed.",
      error: error.message,
      cause: error.cause?.message || null
    });
  }
}