import { transformRawRowsToCanonical } from "./mappingTransform.service.js";

// ==========================================
// CONSTANTS
// ==========================================

const TARGET_ENTITIES = [
  "student",
  "course",
  "assessment",
  "engagement_event"
];

// ==========================================
// HELPERS
// ==========================================

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function pushUnique(targetArray, message) {
  if (!targetArray.includes(message)) {
    targetArray.push(message);
  }
}

function initializeOutputBuckets() {
  return {
    student: [],
    course: [],
    assessment: [],
    engagement_event: []
  };
}

function initializeBundleStats() {
  return {
    total_files: 0,
    selected_files: 0,
    transformed_files: 0,
    skipped_files: 0,
    total_input_rows: 0,
    output_entity_counts: {
      student: 0,
      course: 0,
      assessment: 0,
      engagement_event: 0
    }
  };
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function isOuladLike(datasetName, sourceDataset) {
  const dataset = normalizeText(datasetName);
  const source = normalizeText(sourceDataset);

  return dataset.includes("oulad") || source.includes("oulad");
}

function isUciLike(datasetName, sourceDataset) {
  const dataset = normalizeText(datasetName);
  const source = normalizeText(sourceDataset);

  return (
    dataset.includes("uci") ||
    source.includes("uci") ||
    dataset.includes("student_mat") ||
    dataset.includes("student_por")
  );
}

function buildAssessmentMetaMap(uploadedFiles) {
  const assessmentMetaMap = new Map();

  for (const file of uploadedFiles) {
    if (!Array.isArray(file?.rawRows)) continue;

    const role = normalizeText(file?.inferredRole);

    if (role !== "assessment_metadata") continue;

    for (const row of file.rawRows) {
      if (!isPlainObject(row)) continue;

      const assessmentId =
        row.id_assessment ?? row.assessment_id ?? row.assessmentid ?? null;

      if (assessmentId === null || assessmentId === undefined || assessmentId === "") {
        continue;
      }

      assessmentMetaMap.set(String(assessmentId), {
        assessment_id: String(assessmentId),
        assessment_type: row.assessment_type ?? null,
        assessment_weight_pct:
          row.weight !== undefined && row.weight !== null && row.weight !== ""
            ? Number(row.weight)
            : null,
        assessment_due_day:
          row.date !== undefined && row.date !== null && row.date !== ""
            ? Math.trunc(Number(row.date))
            : null
      });
    }
  }

  return assessmentMetaMap;
}

function buildResourceMetaMap(uploadedFiles) {
  const resourceMetaMap = new Map();

  for (const file of uploadedFiles) {
    if (!Array.isArray(file?.rawRows)) continue;

    const role = normalizeText(file?.inferredRole);

    if (role !== "activity_metadata") continue;

    for (const row of file.rawRows) {
      if (!isPlainObject(row)) continue;

      const resourceId =
        row.id_site ?? row.resource_id ?? row.idsite ?? null;

      if (resourceId === null || resourceId === undefined || resourceId === "") {
        continue;
      }

      resourceMetaMap.set(String(resourceId), {
        resource_id: String(resourceId),
        resource_type: row.activity_type ?? row.resource_type ?? null
      });
    }
  }

  return resourceMetaMap;
}

function enrichAssessmentRows(assessmentRows, assessmentMetaMap) {
  if (!Array.isArray(assessmentRows) || assessmentMetaMap.size === 0) {
    return assessmentRows || [];
  }

  return assessmentRows.map((row) => {
    const assessmentId = row?.assessment_id;
    if (!assessmentId) return row;

    const meta = assessmentMetaMap.get(String(assessmentId));
    if (!meta) return row;

    return {
      ...row,
      assessment_type: row.assessment_type ?? meta.assessment_type ?? null,
      assessment_weight_pct:
        row.assessment_weight_pct ?? meta.assessment_weight_pct ?? null,
      assessment_due_day:
        row.assessment_due_day ?? meta.assessment_due_day ?? null
    };
  });
}

function enrichEngagementRows(engagementRows, resourceMetaMap) {
  if (!Array.isArray(engagementRows) || resourceMetaMap.size === 0) {
    return engagementRows || [];
  }

  return engagementRows.map((row) => {
    const resourceId = row?.resource_id;
    if (!resourceId) return row;

    const meta = resourceMetaMap.get(String(resourceId));
    if (!meta) return row;

    return {
      ...row,
      resource_type: row.resource_type ?? meta.resource_type ?? null
    };
  });
}

function applyBundleEnrichment({
  output,
  uploadedFiles,
  datasetName,
  sourceDataset,
  warnings
}) {
  const enrichedOutput = deepClone(output);

  // Extensible plugin-like enrichment:
  // - OULAD gets metadata enrichment from assessments/vle files
  // - UCI currently does not need extra cross-file enrichment here
  if (isOuladLike(datasetName, sourceDataset)) {
    const assessmentMetaMap = buildAssessmentMetaMap(uploadedFiles);
    const resourceMetaMap = buildResourceMetaMap(uploadedFiles);

    enrichedOutput.assessment = enrichAssessmentRows(
      enrichedOutput.assessment,
      assessmentMetaMap
    );

    enrichedOutput.engagement_event = enrichEngagementRows(
      enrichedOutput.engagement_event,
      resourceMetaMap
    );

    if (assessmentMetaMap.size > 0) {
      pushUnique(
        warnings,
        `Applied assessment metadata enrichment from ${assessmentMetaMap.size} assessment metadata entries.`
      );
    }

    if (resourceMetaMap.size > 0) {
      pushUnique(
        warnings,
        `Applied activity metadata enrichment from ${resourceMetaMap.size} resource metadata entries.`
      );
    }
  }

  if (isUciLike(datasetName, sourceDataset)) {
    pushUnique(
      warnings,
      "UCI bundle mode currently concatenates per-file canonical outputs without cross-file enrichment."
    );
  }

  return enrichedOutput;
}

function validateUploadedFiles(uploadedFiles) {
  if (!Array.isArray(uploadedFiles)) {
    const error = new Error("Invalid uploadedFiles: expected an array.");
    error.code = "INVALID_UPLOADED_FILES";
    throw error;
  }
}

function selectRunnableFiles(uploadedFiles, fileIds = null) {
  const confirmedFiles = uploadedFiles.filter(
    (file) =>
      isPlainObject(file) &&
      isPlainObject(file.confirmedMappingConfig) &&
      isPlainObject(file.profilingResult) &&
      Array.isArray(file.rawRows)
  );

  if (!Array.isArray(fileIds) || fileIds.length === 0) {
    return confirmedFiles;
  }

  const selectedFileIds = new Set(fileIds);
  return confirmedFiles.filter((file) => selectedFileIds.has(file.fileId));
}

// ==========================================
// MAIN SERVICE
// ==========================================

export function bundleTransformCanonical({
  uploadedFiles,
  datasetName = "uploaded_dataset",
  sourceDataset = "CUSTOM",
  fileIds = null
}) {
  validateUploadedFiles(uploadedFiles);

  const warnings = [];
  const output = initializeOutputBuckets();
  const stats = initializeBundleStats();
  const fileSummaries = [];

  stats.total_files = uploadedFiles.length;

  const runnableFiles = selectRunnableFiles(uploadedFiles, fileIds);
  stats.selected_files = runnableFiles.length;

  if (runnableFiles.length === 0) {
    const error = new Error(
      "No runnable files found. Make sure files have confirmedMappingConfig, profilingResult, and rawRows."
    );
    error.code = "NO_RUNNABLE_FILES";
    throw error;
  }

  for (const file of runnableFiles) {
    try {
      const transformResult = transformRawRowsToCanonical({
        mappingConfig: file.confirmedMappingConfig,
        profilingResult: file.profilingResult,
        rawRows: file.rawRows
      });

      output.student.push(...(transformResult.output.student || []));
      output.course.push(...(transformResult.output.course || []));
      output.assessment.push(...(transformResult.output.assessment || []));
      output.engagement_event.push(...(transformResult.output.engagement_event || []));

      stats.transformed_files += 1;
      stats.total_input_rows += file.rawRows.length;

      fileSummaries.push({
        fileId: file.fileId,
        fileName: file.fileName,
        inferredRole: file.inferredRole || "unknown",
        input_row_count: file.rawRows.length,
        summary: transformResult.summary,
        warnings: transformResult.warnings || []
      });
    } catch (error) {
      stats.skipped_files += 1;

      pushUnique(
        warnings,
        `Bundle transform skipped file "${file.fileName}" (${file.fileId}) because transform failed: ${error.message}`
      );

      fileSummaries.push({
        fileId: file.fileId,
        fileName: file.fileName,
        inferredRole: file.inferredRole || "unknown",
        input_row_count: Array.isArray(file.rawRows) ? file.rawRows.length : 0,
        error: error.message
      });
    }
  }

  const enrichedOutput = applyBundleEnrichment({
    output,
    uploadedFiles: runnableFiles,
    datasetName,
    sourceDataset,
    warnings
  });

  stats.output_entity_counts.student = enrichedOutput.student.length;
  stats.output_entity_counts.course = enrichedOutput.course.length;
  stats.output_entity_counts.assessment = enrichedOutput.assessment.length;
  stats.output_entity_counts.engagement_event = enrichedOutput.engagement_event.length;

  return {
    dataset_name: datasetName,
    source_dataset: sourceDataset,
    transformed_at: new Date().toISOString(),
    output: enrichedOutput,
    summary: {
      ...stats,
      file_summaries: fileSummaries
    },
    warnings
  };
}