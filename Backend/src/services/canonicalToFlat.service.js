import { FLAT_TABLE_FIELD_MAP } from "../config/flatTableFieldMap.js";

// ==========================================
// CONSTANTS
// ==========================================

const REQUIRED_CANONICAL_ENTITIES = [
  "student",
  "course",
  "assessment",
  "engagement_event"
];

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

function pushUnique(targetArray, message) {
  if (!targetArray.includes(message)) {
    targetArray.push(message);
  }
}

function buildStudentKey(record) {
  return [
    record?.student_id ?? "__NULL__",
    record?.course_id ?? "__NULL__",
    record?.source_dataset ?? "__NULL__"
  ].join("||");
}

function buildCourseLooseKey(record) {
  return [
    record?.course_id ?? "__NULL__",
    record?.source_dataset ?? "__NULL__"
  ].join("||");
}

function createFlatRecord(fieldList, ...sourceRecords) {
  const output = {};

  for (const fieldName of fieldList) {
    let resolvedValue = null;

    for (const record of sourceRecords) {
      if (
        isPlainObject(record) &&
        Object.prototype.hasOwnProperty.call(record, fieldName) &&
        record[fieldName] !== undefined
      ) {
        resolvedValue = record[fieldName];
        break;
      }
    }

    output[fieldName] = resolvedValue ?? null;
  }

  return output;
}

function validateCanonicalOutputShape(canonicalOutput) {
  if (!isPlainObject(canonicalOutput)) {
    const error = new Error(
      "Invalid canonicalOutput: expected an object grouped by canonical entity."
    );
    error.code = "INVALID_CANONICAL_OUTPUT";
    throw error;
  }

  for (const entityName of REQUIRED_CANONICAL_ENTITIES) {
    if (!(entityName in canonicalOutput)) {
      const error = new Error(
        `Invalid canonicalOutput: missing canonical entity bucket "${entityName}".`
      );
      error.code = "INVALID_CANONICAL_OUTPUT";
      throw error;
    }

    if (!Array.isArray(canonicalOutput[entityName])) {
      const error = new Error(
        `Invalid canonicalOutput: entity bucket "${entityName}" must be an array.`
      );
      error.code = "INVALID_CANONICAL_OUTPUT";
      throw error;
    }
  }
}

function validateFlatTableMapShape() {
  for (const tableName of REQUIRED_FLAT_TABLES) {
    if (!(tableName in FLAT_TABLE_FIELD_MAP)) {
      const error = new Error(
        `Invalid FLAT_TABLE_FIELD_MAP: missing flat table "${tableName}".`
      );
      error.code = "INVALID_FLAT_TABLE_FIELD_MAP";
      throw error;
    }

    if (!Array.isArray(FLAT_TABLE_FIELD_MAP[tableName])) {
      const error = new Error(
        `Invalid FLAT_TABLE_FIELD_MAP: "${tableName}" must be an array of field names.`
      );
      error.code = "INVALID_FLAT_TABLE_FIELD_MAP";
      throw error;
    }
  }
}

function buildStudentIndex(studentRecords) {
  const index = new Map();

  for (const record of studentRecords) {
    if (!isPlainObject(record)) continue;

    const key = buildStudentKey(record);

    if (!index.has(key)) {
      index.set(key, record);
    }
  }

  return index;
}

function buildCourseLooseIndex(courseRecords) {
  const index = new Map();

  for (const record of courseRecords) {
    if (!isPlainObject(record)) continue;

    const key = buildCourseLooseKey(record);

    if (!index.has(key)) {
      index.set(key, []);
    }

    index.get(key).push(record);
  }

  return index;
}

function resolveStudentRecord(record, studentIndex) {
  const key = buildStudentKey(record);
  return studentIndex.get(key) || null;
}

function resolveCourseRecord(record, courseLooseIndex, warnings, entityName) {
  const key = buildCourseLooseKey(record);
  const matchedCourses = courseLooseIndex.get(key) || [];

  if (matchedCourses.length === 1) {
    return matchedCourses[0];
  }

  if (matchedCourses.length > 1) {
    pushUnique(
      warnings,
      `Ambiguous course join for ${entityName} record with course_id="${record?.course_id}" and source_dataset="${record?.source_dataset}". Using the first matching course row.`
    );
    return matchedCourses[0];
  }

  return null;
}

function initializeFlatOutput() {
  return {
    flat_student_summary: [],
    flat_assessment_result: [],
    flat_engagement_event: []
  };
}

function initializeSummary() {
  return {
    input_counts: {
      student: 0,
      course: 0,
      assessment: 0,
      engagement_event: 0
    },
    output_counts: {
      flat_student_summary: 0,
      flat_assessment_result: 0,
      flat_engagement_event: 0
    }
  };
}

// ==========================================
// MAIN SERVICE
// ==========================================

export function canonicalToFlat({ canonicalOutput }) {
  validateCanonicalOutputShape(canonicalOutput);
  validateFlatTableMapShape();

  const warnings = [];
  const flatOutput = initializeFlatOutput();
  const summary = initializeSummary();

  const studentRecords = canonicalOutput.student;
  const courseRecords = canonicalOutput.course;
  const assessmentRecords = canonicalOutput.assessment;
  const engagementEventRecords = canonicalOutput.engagement_event;

  summary.input_counts.student = studentRecords.length;
  summary.input_counts.course = courseRecords.length;
  summary.input_counts.assessment = assessmentRecords.length;
  summary.input_counts.engagement_event = engagementEventRecords.length;

  const studentIndex = buildStudentIndex(studentRecords);
  const courseLooseIndex = buildCourseLooseIndex(courseRecords);

  // ==========================================
  // 1. BUILD flat_student_summary
  // Base grain: one student in one course
  // ==========================================
  for (const studentRecord of studentRecords) {
    if (!isPlainObject(studentRecord)) {
      pushUnique(
        warnings,
        'Skipped invalid student canonical record while building "flat_student_summary".'
      );
      continue;
    }

    const matchedCourse = resolveCourseRecord(
      studentRecord,
      courseLooseIndex,
      warnings,
      "student"
    );

    const flatRow = createFlatRecord(
      FLAT_TABLE_FIELD_MAP.flat_student_summary,
      studentRecord,
      matchedCourse
    );

    flatOutput.flat_student_summary.push(flatRow);
  }

  // ==========================================
  // 2. BUILD flat_assessment_result
  // Base grain: one assessment result of one student in one course
  // ==========================================
  for (const assessmentRecord of assessmentRecords) {
    if (!isPlainObject(assessmentRecord)) {
      pushUnique(
        warnings,
        'Skipped invalid assessment canonical record while building "flat_assessment_result".'
      );
      continue;
    }

    const matchedStudent = resolveStudentRecord(assessmentRecord, studentIndex);
    const matchedCourse = resolveCourseRecord(
      assessmentRecord,
      courseLooseIndex,
      warnings,
      "assessment"
    );

    if (!matchedStudent) {
      pushUnique(
        warnings,
        `No matching student canonical record found for assessment record with student_id="${assessmentRecord?.student_id}", course_id="${assessmentRecord?.course_id}", source_dataset="${assessmentRecord?.source_dataset}".`
      );
    }

    const flatRow = createFlatRecord(
      FLAT_TABLE_FIELD_MAP.flat_assessment_result,
      assessmentRecord,
      matchedStudent,
      matchedCourse
    );

    flatOutput.flat_assessment_result.push(flatRow);
  }

  // ==========================================
  // 3. BUILD flat_engagement_event
  // Base grain: one engagement event of one student in one course
  // ==========================================
  for (const engagementRecord of engagementEventRecords) {
    if (!isPlainObject(engagementRecord)) {
      pushUnique(
        warnings,
        'Skipped invalid engagement canonical record while building "flat_engagement_event".'
      );
      continue;
    }

    const matchedStudent = resolveStudentRecord(engagementRecord, studentIndex);
    const matchedCourse = resolveCourseRecord(
      engagementRecord,
      courseLooseIndex,
      warnings,
      "engagement_event"
    );

    if (!matchedStudent) {
      pushUnique(
        warnings,
        `No matching student canonical record found for engagement event record with student_id="${engagementRecord?.student_id}", course_id="${engagementRecord?.course_id}", source_dataset="${engagementRecord?.source_dataset}".`
      );
    }

    const flatRow = createFlatRecord(
      FLAT_TABLE_FIELD_MAP.flat_engagement_event,
      engagementRecord,
      matchedStudent,
      matchedCourse
    );

    flatOutput.flat_engagement_event.push(flatRow);
  }

  summary.output_counts.flat_student_summary = flatOutput.flat_student_summary.length;
  summary.output_counts.flat_assessment_result = flatOutput.flat_assessment_result.length;
  summary.output_counts.flat_engagement_event = flatOutput.flat_engagement_event.length;

  return {
    output: flatOutput,
    summary,
    warnings
  };
}