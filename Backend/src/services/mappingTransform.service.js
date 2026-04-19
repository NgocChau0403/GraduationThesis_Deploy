import { CANONICAL_FIELDS } from "../config/canonicalFields.js";
import { validateMapping } from "./mappingValidation.service.js";

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

function buildCanonicalFieldMap() {
  return Object.fromEntries(CANONICAL_FIELDS.map((field) => [field.name, field]));
}

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

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function pushUnique(targetArray, message) {
  if (!targetArray.includes(message)) {
    targetArray.push(message);
  }
}

function initializeTargetBuckets() {
  return {
    student: [],
    course: [],
    assessment: [],
    engagement_event: []
  };
}

function initializeTargetStats() {
  return {
    student: 0,
    course: 0,
    assessment: 0,
    engagement_event: 0
  };
}

function getTargetEntityFromScope(entityScope) {
  if (entityScope === "student") return "student";
  if (entityScope === "course") return "course";
  if (entityScope === "assessment") return "assessment";
  if (entityScope === "engagement_event") return "engagement_event";
  if (entityScope === "system") return "system";
  return null;
}

function createEmptyTargetRecord(targetEntity, sourceDataset) {
  return {
    _target_entity: targetEntity,
    source_dataset: sourceDataset
  };
}

function isNumericLike(value) {
  if (value === null || value === undefined || value === "") return false;
  return !Number.isNaN(Number(value));
}

function castInt(value) {
  if (value === null || value === undefined || value === "") return null;

  const parsed = Number(value);
  if (Number.isNaN(parsed)) return null;

  return Math.trunc(parsed);
}

function castFloat(value) {
  if (value === null || value === undefined || value === "") return null;

  const parsed = Number(value);
  if (Number.isNaN(parsed)) return null;

  return parsed;
}

function castBoolean(value) {
  if (value === null || value === undefined || value === "") return null;

  if (typeof value === "boolean") return value;

  const normalized = normalizeText(value);

  if (["true", "1", "yes", "y"].includes(normalized)) return true;
  if (["false", "0", "no", "n"].includes(normalized)) return false;

  return null;
}

function normalizeGender(value) {
  if (value === null || value === undefined || value === "") return null;

  const normalized = normalizeText(value);

  if (["m", "male"].includes(normalized)) return "M";
  if (["f", "female"].includes(normalized)) return "F";

  return String(value).trim();
}

function normalizeScore(value) {
  if (value === null || value === undefined || value === "") return null;

  const parsed = Number(value);
  if (Number.isNaN(parsed)) return null;

  return parsed;
}

function convertDateToRelativeDay(value) {
  if (value === null || value === undefined || value === "") return null;

  // Current prototype behavior:
  // - if numeric-like => assume already relative day
  // - if calendar date string => cannot infer anchor date yet, return null
  if (isNumericLike(value)) {
    return Math.trunc(Number(value));
  }

  return null;
}

function applyTransform(transformName, rawValue) {
  switch (transformName) {
    case "direct_copy":
      return rawValue ?? null;

    case "ignore":
      return null;

    case "cast_int":
      return castInt(rawValue);

    case "cast_float":
      return castFloat(rawValue);

    case "cast_boolean":
      return castBoolean(rawValue);

    case "normalize_gender":
      return normalizeGender(rawValue);

    case "normalize_score":
      return normalizeScore(rawValue);

    case "convert_date_to_relative_day":
      return convertDateToRelativeDay(rawValue);

    default:
      throw new Error(`Unsupported transform "${transformName}".`);
  }
}

function coerceValueToCanonicalType(value, canonicalType) {
  if (value === null || value === undefined) return null;

  switch (canonicalType) {
    case "string":
      return String(value);

    case "int": {
      const parsed = Number(value);
      return Number.isNaN(parsed) ? null : Math.trunc(parsed);
    }

    case "float": {
      const parsed = Number(value);
      return Number.isNaN(parsed) ? null : parsed;
    }

    case "boolean":
      return castBoolean(value);

    case "date":
      return String(value);

    default:
      return value;
  }
}

function getPrimarySourceField(sourceFields) {
  if (!Array.isArray(sourceFields) || sourceFields.length === 0) {
    return null;
  }

  return sourceFields[0];
}

function getRowValue(rawRow, sourceField) {
  if (!isPlainObject(rawRow) || !sourceField) return null;
  return rawRow[sourceField];
}

function buildRowContext(rawRowIndex, mappingId, sourceField) {
  return `row ${rawRowIndex}, mapping "${mappingId}", source field "${sourceField}"`;
}

function ensureEntityRecord(entityRecordMap, targetEntity, sourceDataset) {
  if (!entityRecordMap[targetEntity]) {
    entityRecordMap[targetEntity] = createEmptyTargetRecord(targetEntity, sourceDataset);
  }

  return entityRecordMap[targetEntity];
}

function mergeSystemValuesIntoRecord(record, systemValues) {
  if (!isPlainObject(record) || !isPlainObject(systemValues)) return record;

  for (const [key, value] of Object.entries(systemValues)) {
    if (record[key] === undefined || record[key] === null) {
      record[key] = value;
    }
  }

  return record;
}

function isUciDataset(mappingConfig) {
  const datasetName = normalizeText(mappingConfig?.dataset_name);
  const sourceDataset = normalizeText(mappingConfig?.source_dataset);

  return (
    datasetName.includes("uci") ||
    sourceDataset.includes("uci") ||
    datasetName.includes("student_mat") ||
    datasetName.includes("student_por")
  );
}

function isOuladDataset(mappingConfig) {
  const datasetName = normalizeText(mappingConfig?.dataset_name);
  const sourceDataset = normalizeText(mappingConfig?.source_dataset);

  return datasetName.includes("oulad") || sourceDataset.includes("oulad");
}

function deriveUciCourseId(mappingConfig) {
  const datasetName = normalizeText(mappingConfig?.dataset_name);

  if (datasetName.includes("mat")) return "UCI_MAT";
  if (datasetName.includes("por")) return "UCI_POR";
  return "UCI_COURSE";
}

function deriveOuladCourseId(rawRow) {
  const codeModule = rawRow?.code_module ? String(rawRow.code_module).trim() : null;
  const codePresentation = rawRow?.code_presentation
    ? String(rawRow.code_presentation).trim()
    : null;

  if (codeModule && codePresentation) {
    return `${codeModule}_${codePresentation}`;
  }

  if (codeModule) return codeModule;
  return null;
}

function deriveFallbackStudentId({
  mappingConfig,
  rawRow,
  rowIndex,
  courseId
}) {
  if (rawRow?.id_student !== undefined && rawRow?.id_student !== null && rawRow?.id_student !== "") {
    return String(rawRow.id_student);
  }

  if (isUciDataset(mappingConfig)) {
    const safeCourseId = courseId || deriveUciCourseId(mappingConfig);
    return `${safeCourseId}_STUDENT_${String(rowIndex + 1).padStart(4, "0")}`;
  }

  return null;
}

function buildUciAssessmentMetadata(sourceField) {
  const normalized = normalizeText(sourceField);

  if (normalized === "g1") {
    return {
      assessment_name: "G1",
      assessment_order: 1,
      assessment_id: "G1",
      is_final_assessment: false
    };
  }

  if (normalized === "g2") {
    return {
      assessment_name: "G2",
      assessment_order: 2,
      assessment_id: "G2",
      is_final_assessment: false
    };
  }

  if (normalized === "g3") {
    return {
      assessment_name: "G3",
      assessment_order: 3,
      assessment_id: "G3",
      is_final_assessment: true
    };
  }

  return null;
}

function isSpecialExpandedUciAssessmentMapping(mappingConfig, mappingItem, primarySourceField) {
  if (!isUciDataset(mappingConfig)) return false;

  return (
    mappingItem.entity_scope === "assessment" &&
    mappingItem.canonical_field === "score_normalized" &&
    ["g1", "g2", "g3"].includes(normalizeText(primarySourceField))
  );
}

function buildAssessmentResultId({ studentId, courseId, assessmentId }) {
  if (!studentId && !courseId && !assessmentId) return null;
  return [studentId, courseId, assessmentId].filter(Boolean).join("__");
}

function removeInternalFields(record) {
  if (!isPlainObject(record)) return record;

  const cloned = { ...record };
  delete cloned._target_entity;
  return cloned;
}

// ==========================================
// MAIN SERVICE
// ==========================================

export function transformRawRowsToCanonical({
  mappingConfig,
  profilingResult,
  rawRows
}) {
  const validationResult = validateMapping({
    mappingConfig,
    profilingResult,
    mode: "strict"
  });

  if (!validationResult.isValid) {
    const error = new Error(
      "Mapping transform failed: mappingConfig did not pass strict validation."
    );
    error.code = "MAPPING_TRANSFORM_VALIDATION_FAILED";
    error.validationResult = validationResult;
    throw error;
  }

  if (!Array.isArray(rawRows)) {
    const error = new Error('Invalid rawRows: expected an array of parsed row objects.');
    error.code = "INVALID_RAW_ROWS";
    throw error;
  }

  const canonicalFieldMap = buildCanonicalFieldMap();
  const output = initializeTargetBuckets();
  const targetEntityRowCounts = initializeTargetStats();
  const warnings = [];

  const activeMappings = Array.isArray(mappingConfig.field_mappings)
    ? mappingConfig.field_mappings.filter(
        (item) =>
          isPlainObject(item) &&
          item.status === "confirmed" &&
          item.transform !== "ignore" &&
          typeof item.canonical_field === "string" &&
          item.canonical_field.trim().length > 0
      )
    : [];

  let transformedValueCount = 0;
  let skippedMappingCount = 0;
  let skippedRowCount = 0;

  for (let rowIndex = 0; rowIndex < rawRows.length; rowIndex += 1) {
    const rawRow = rawRows[rowIndex];

    if (!isPlainObject(rawRow)) {
      skippedRowCount += 1;
      pushUnique(
        warnings,
        `Row at index ${rowIndex} is not a valid object and was skipped.`
      );
      continue;
    }

    const entityRecordMap = {};
    const systemValues = {};
    const assessmentRows = [];

    for (const mappingItem of activeMappings) {
      const targetEntity = getTargetEntityFromScope(mappingItem.entity_scope);

      if (!targetEntity) {
        skippedMappingCount += 1;
        pushUnique(
          warnings,
          `Mapping "${mappingItem.id}" has unsupported entity_scope "${mappingItem.entity_scope}" and was skipped during transform.`
        );
        continue;
      }

      const canonicalFieldName = mappingItem.canonical_field;
      const canonicalMeta = canonicalFieldMap[canonicalFieldName];

      if (!canonicalMeta) {
        skippedMappingCount += 1;
        pushUnique(
          warnings,
          `Mapping "${mappingItem.id}" references unknown canonical field "${canonicalFieldName}" and was skipped during transform.`
        );
        continue;
      }

      const primarySourceField = getPrimarySourceField(mappingItem.source_fields);

      if (!primarySourceField) {
        skippedMappingCount += 1;
        pushUnique(
          warnings,
          `Mapping "${mappingItem.id}" has no usable source_fields and was skipped during transform.`
        );
        continue;
      }

      if (Array.isArray(mappingItem.source_fields) && mappingItem.source_fields.length > 1) {
        pushUnique(
          warnings,
          `Mapping "${mappingItem.id}" has multiple source_fields. Current transform uses only the first source field "${primarySourceField}".`
        );
      }

      const rawValue = getRowValue(rawRow, primarySourceField);
      let transformedValue;

      try {
        transformedValue = applyTransform(mappingItem.transform, rawValue);
      } catch (error) {
        skippedMappingCount += 1;
        pushUnique(
          warnings,
          `Transform failed for ${buildRowContext(rowIndex, mappingItem.id, primarySourceField)} with transform "${mappingItem.transform}".`
        );
        continue;
      }

      const finalValue = coerceValueToCanonicalType(
        transformedValue,
        canonicalMeta.type
      );

      if (targetEntity === "system") {
        systemValues[canonicalFieldName] = finalValue;
        transformedValueCount += 1;
        continue;
      }

      // ------------------------------------------
      // Special handling for UCI G1/G2/G3 expansion
      // ------------------------------------------
      if (
        isSpecialExpandedUciAssessmentMapping(
          mappingConfig,
          mappingItem,
          primarySourceField
        )
      ) {
        const uciAssessmentMeta = buildUciAssessmentMetadata(primarySourceField);

        if (!uciAssessmentMeta) {
          skippedMappingCount += 1;
          pushUnique(
            warnings,
            `UCI assessment expansion failed for ${buildRowContext(rowIndex, mappingItem.id, primarySourceField)}.`
          );
          continue;
        }

        const assessmentRow = createEmptyTargetRecord("assessment", mappingConfig.source_dataset);
        assessmentRow.score_normalized = finalValue;
        assessmentRow.assessment_name = uciAssessmentMeta.assessment_name;
        assessmentRow.assessment_order = uciAssessmentMeta.assessment_order;
        assessmentRow.assessment_id = uciAssessmentMeta.assessment_id;
        assessmentRow.is_final_assessment = uciAssessmentMeta.is_final_assessment;

        assessmentRows.push(assessmentRow);
        transformedValueCount += 1;
        continue;
      }

      const record = ensureEntityRecord(
        entityRecordMap,
        targetEntity,
        mappingConfig.source_dataset
      );

      record[canonicalFieldName] = finalValue;
      transformedValueCount += 1;
    }

    // ------------------------------------------
    // Derive contextual IDs and metadata
    // ------------------------------------------
    const studentRecord = entityRecordMap.student || null;
    const courseRecord = entityRecordMap.course || null;
    const assessmentBaseRecord = entityRecordMap.assessment || null;
    const engagementEventRecord = entityRecordMap.engagement_event || null;

    let derivedCourseId = null;

    if (courseRecord?.course_id) {
      derivedCourseId = courseRecord.course_id;
    } else if (isOuladDataset(mappingConfig)) {
      derivedCourseId = deriveOuladCourseId(rawRow);
    } else if (isUciDataset(mappingConfig)) {
      derivedCourseId = deriveUciCourseId(mappingConfig);
    }

    let derivedStudentId = null;

    if (studentRecord?.student_id) {
      derivedStudentId = studentRecord.student_id;
    } else {
      derivedStudentId = deriveFallbackStudentId({
        mappingConfig,
        rawRow,
        rowIndex,
        courseId: derivedCourseId
      });
    }

    // ------------------------------------------
    // Enrich base records with derived values
    // ------------------------------------------
    if (studentRecord) {
      if (!studentRecord.student_id && derivedStudentId) {
        studentRecord.student_id = derivedStudentId;
      }
      if (!studentRecord.course_id && derivedCourseId) {
        studentRecord.course_id = derivedCourseId;
      }
    }

    if (courseRecord) {
      if (!courseRecord.course_id && derivedCourseId) {
        courseRecord.course_id = derivedCourseId;
      }
    }

    if (assessmentBaseRecord) {
      if (!assessmentBaseRecord.student_id && derivedStudentId) {
        assessmentBaseRecord.student_id = derivedStudentId;
      }
      if (!assessmentBaseRecord.course_id && derivedCourseId) {
        assessmentBaseRecord.course_id = derivedCourseId;
      }
    }

    if (engagementEventRecord) {
      if (!engagementEventRecord.student_id && derivedStudentId) {
        engagementEventRecord.student_id = derivedStudentId;
      }
      if (!engagementEventRecord.course_id && derivedCourseId) {
        engagementEventRecord.course_id = derivedCourseId;
      }
    }

    // ------------------------------------------
    // Materialize assessment rows
    // ------------------------------------------
    if (assessmentRows.length > 0) {
      for (const assessmentRow of assessmentRows) {
        if (assessmentBaseRecord) {
          for (const [key, value] of Object.entries(assessmentBaseRecord)) {
            if (
              assessmentRow[key] === undefined ||
              assessmentRow[key] === null
            ) {
              assessmentRow[key] = value;
            }
          }
        }

        if (!assessmentRow.student_id && derivedStudentId) {
          assessmentRow.student_id = derivedStudentId;
        }

        if (!assessmentRow.course_id && derivedCourseId) {
          assessmentRow.course_id = derivedCourseId;
        }

        if (!assessmentRow.assessment_result_id) {
          assessmentRow.assessment_result_id = buildAssessmentResultId({
            studentId: assessmentRow.student_id,
            courseId: assessmentRow.course_id,
            assessmentId: assessmentRow.assessment_id
          });
        }

        mergeSystemValuesIntoRecord(assessmentRow, systemValues);
        assessmentRow.source_dataset = mappingConfig.source_dataset;

        output.assessment.push(removeInternalFields(assessmentRow));
        targetEntityRowCounts.assessment += 1;
      }
    } else if (assessmentBaseRecord) {
      if (!assessmentBaseRecord.assessment_result_id) {
        assessmentBaseRecord.assessment_result_id = buildAssessmentResultId({
          studentId: assessmentBaseRecord.student_id,
          courseId: assessmentBaseRecord.course_id,
          assessmentId: assessmentBaseRecord.assessment_id
        });
      }

      mergeSystemValuesIntoRecord(assessmentBaseRecord, systemValues);
      assessmentBaseRecord.source_dataset = mappingConfig.source_dataset;

      output.assessment.push(removeInternalFields(assessmentBaseRecord));
      targetEntityRowCounts.assessment += 1;
    }

    // ------------------------------------------
    // Materialize student / course / engagement_event
    // ------------------------------------------
    if (studentRecord) {
      mergeSystemValuesIntoRecord(studentRecord, systemValues);
      studentRecord.source_dataset = mappingConfig.source_dataset;

      output.student.push(removeInternalFields(studentRecord));
      targetEntityRowCounts.student += 1;
    }

    if (courseRecord) {
      mergeSystemValuesIntoRecord(courseRecord, systemValues);
      courseRecord.source_dataset = mappingConfig.source_dataset;

      output.course.push(removeInternalFields(courseRecord));
      targetEntityRowCounts.course += 1;
    }

    if (engagementEventRecord) {
      mergeSystemValuesIntoRecord(engagementEventRecord, systemValues);
      engagementEventRecord.source_dataset = mappingConfig.source_dataset;

      output.engagement_event.push(removeInternalFields(engagementEventRecord));
      targetEntityRowCounts.engagement_event += 1;
    }
  }

  return {
    dataset_name: mappingConfig.dataset_name,
    source_dataset: mappingConfig.source_dataset,
    mapping_version: mappingConfig.version,
    transformed_at: new Date().toISOString(),
    output,
    summary: {
      input_row_count: rawRows.length,
      active_mapping_count: activeMappings.length,
      transformed_value_count: transformedValueCount,
      skipped_mapping_count: skippedMappingCount,
      skipped_row_count: skippedRowCount,
      target_entity_row_counts: targetEntityRowCounts
    },
    warnings,
    validationResult: deepClone(validationResult)
  };
}