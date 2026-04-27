import { CANONICAL_FIELDS } from "./canonicalFields.js";
import { FLAT_TABLE_FIELD_MAP } from "./flatTableFieldMap.js";

const REQUIRED_TABLES = [
  "flat_enrollment_master",
  "flat_assessment_result"
];

const REQUIRED_FIELDS_BY_TABLE = {
  flat_enrollment_master: ["student_id", "course_id", "source_dataset"],
  flat_assessment_result: [
    "student_id",
    "course_id",
    "source_dataset",
    "assessment_result_id",
    "assessment_order"
  ]
};

const BUSINESS_GRAIN_KEYS_BY_TABLE = {
  flat_enrollment_master: ["student_id", "course_id", "source_dataset"],
  flat_assessment_result: [
    "assessment_result_id",
    "student_id",
    "course_id",
    "source_dataset"
  ]
};

const FORBIDDEN_FIELDS_BY_TABLE = {
  flat_enrollment_master: [
    "assessment_result_id",
    "engagement_event_id",
    "submission_day",
    "assessment_due_day",
    "submission_delay_days",
    "event_day",
    "resource_id",
    "resource_type",
    "engagement_count"
  ],
  flat_assessment_result: [
    "engagement_event_id",
    "event_day",
    "resource_id",
    "resource_type",
    "engagement_count",
    "total_engagement_count",
    "active_day_count",
    "absence_count",
    "study_effort_level",
    "consistency_level"
  ]
};

const IMPORTANT_UNUSED_GROUPS = ["student", "assessment", "engagement"];

function buildCanonicalFieldMap() {
  return Object.fromEntries(CANONICAL_FIELDS.map((field) => [field.name, field]));
}

function pushUniqueMessage(targetArray, message) {
  if (!targetArray.includes(message)) {
    targetArray.push(message);
  }
}

export function validateFlatConfig() {
  const errors = [];
  const warnings = [];

  const canonicalFieldMap = buildCanonicalFieldMap();
  const canonicalFieldNames = new Set(Object.keys(canonicalFieldMap));
  const validUsedFields = new Set();

  for (const tableName of REQUIRED_TABLES) {
    if (!(tableName in FLAT_TABLE_FIELD_MAP)) {
      pushUniqueMessage(errors, `Missing required flat table: "${tableName}".`);
    }
  }

  for (const tableName of Object.keys(FLAT_TABLE_FIELD_MAP)) {
    if (!REQUIRED_TABLES.includes(tableName)) {
      pushUniqueMessage(
        warnings,
        `Unknown flat table "${tableName}" is not listed in REQUIRED_TABLES.`
      );
    }
  }

  for (const [tableName, fieldList] of Object.entries(FLAT_TABLE_FIELD_MAP)) {
    if (!Array.isArray(fieldList)) {
      pushUniqueMessage(errors, `Flat table "${tableName}" must be an array of field names.`);
      continue;
    }

    const seen = new Set();
    const duplicates = new Set();

    for (const fieldName of fieldList) {
      if (typeof fieldName !== "string" || !fieldName.trim()) {
        pushUniqueMessage(
          errors,
          `Invalid field "${String(fieldName)}" in table "${tableName}". Each field must be a non-empty string.`
        );
        continue;
      }

      if (seen.has(fieldName)) {
        duplicates.add(fieldName);
      }
      seen.add(fieldName);

      if (canonicalFieldNames.has(fieldName)) {
        validUsedFields.add(fieldName);
      }
    }

    if (duplicates.size > 0) {
      pushUniqueMessage(
        errors,
        `Table "${tableName}" contains duplicate fields: ${[...duplicates].join(", ")}.`
      );
    }

    for (const requiredField of REQUIRED_FIELDS_BY_TABLE[tableName] || []) {
      if (!fieldList.includes(requiredField)) {
        pushUniqueMessage(
          errors,
          `Table "${tableName}" is missing required field "${requiredField}".`
        );
      }
    }

    for (const grainKey of BUSINESS_GRAIN_KEYS_BY_TABLE[tableName] || []) {
      if (!fieldList.includes(grainKey)) {
        pushUniqueMessage(
          errors,
          `Table "${tableName}" is missing business grain key "${grainKey}".`
        );
      }
    }

    for (const forbiddenField of FORBIDDEN_FIELDS_BY_TABLE[tableName] || []) {
      if (fieldList.includes(forbiddenField)) {
        pushUniqueMessage(
          errors,
          `Field "${forbiddenField}" should not appear in "${tableName}" because it violates the table grain.`
        );
      }
    }

    for (const fieldName of fieldList) {
      const fieldMeta = canonicalFieldMap[fieldName];
      if (!fieldMeta) continue;

      if (
        tableName === "flat_enrollment_master" &&
        (fieldMeta.group === "assessment" || fieldMeta.group === "activity")
      ) {
        pushUniqueMessage(
          warnings,
          `Field "${fieldName}" in "${tableName}" may be too detailed for a student-course summary table.`
        );
      }

      if (tableName === "flat_assessment_result" && fieldMeta.group === "engagement") {
        pushUniqueMessage(
          warnings,
          `Field "${fieldName}" in "${tableName}" may introduce engagement-summary logic into an assessment-grain table.`
        );
      }
    }
  }

  for (const field of CANONICAL_FIELDS) {
    if (field.required && !validUsedFields.has(field.name)) {
      pushUniqueMessage(
        warnings,
        `Required canonical field "${field.name}" is not used in any flat table.`
      );
    }
  }

  for (const field of CANONICAL_FIELDS) {
    if (
      !field.required &&
      !validUsedFields.has(field.name) &&
      IMPORTANT_UNUSED_GROUPS.includes(field.group)
    ) {
      pushUniqueMessage(
        warnings,
        `Canonical field "${field.name}" (group: ${field.group}) is currently not mapped to any flat table.`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats: {
      canonicalFieldCount: CANONICAL_FIELDS.length,
      flatTableCount: Object.keys(FLAT_TABLE_FIELD_MAP).length,
      usedCanonicalFieldCount: validUsedFields.size
    }
  };
}
