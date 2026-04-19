import { CANONICAL_FIELDS } from "./canonicalFields.js";
import { FLAT_TABLE_FIELD_MAP } from "./flatTableFieldMap.js";

// ==========================================
// CONFIG
// ==========================================

const REQUIRED_TABLES = [
  "flat_student_summary",
  "flat_assessment_result",
  "flat_engagement_event"
];

// Minimum required fields for each flat table
const REQUIRED_FIELDS_BY_TABLE = {
  flat_student_summary: ["student_id", "course_id", "source_dataset"],

  flat_assessment_result: [
    "student_id",
    "course_id",
    "source_dataset",
    "assessment_result_id",
    "assessment_order"
  ],

  flat_engagement_event: [
    "student_id",
    "course_id",
    "source_dataset",
    "engagement_event_id",
    "event_day"
  ]
};

// Business grain keys per table
const BUSINESS_GRAIN_KEYS_BY_TABLE = {
  flat_student_summary: ["student_id", "course_id", "source_dataset"],
  flat_assessment_result: [
    "assessment_result_id",
    "student_id",
    "course_id",
    "source_dataset"
  ],
  flat_engagement_event: [
    "engagement_event_id",
    "student_id",
    "course_id",
    "source_dataset"
  ]
};

// Fields that should not appear in a table because they violate grain
const FORBIDDEN_FIELDS_BY_TABLE = {
  flat_student_summary: [
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
  ],

  flat_engagement_event: [
    "assessment_result_id",
    "assessment_id",
    "assessment_name",
    "assessment_type",
    "assessment_order",
    "assessment_due_day",
    "assessment_weight_pct",
    "submission_day",
    "submission_delay_days",
    "score_normalized",
    "pass_flag",
    "is_banked",
    "is_final_assessment"
  ]
};

// Only warn for important unused groups to reduce noise
const IMPORTANT_UNUSED_GROUPS = ["student", "assessment", "engagement"];

// ==========================================
// HELPERS
// ==========================================

function buildCanonicalFieldMap() {
  return Object.fromEntries(CANONICAL_FIELDS.map((field) => [field.name, field]));
}

function pushUniqueMessage(targetArray, message) {
  if (!targetArray.includes(message)) {
    targetArray.push(message);
  }
}

// ==========================================
// VALIDATOR
// ==========================================

export function validateFlatConfig() {
  const errors = [];
  const warnings = [];

  const canonicalFieldMap = buildCanonicalFieldMap();
  const canonicalFieldNames = new Set(Object.keys(canonicalFieldMap));
  const validUsedFields = new Set();

  // ==========================================
  // 1. CHECK REQUIRED TABLES EXIST
  // ==========================================
  for (const tableName of REQUIRED_TABLES) {
    if (!(tableName in FLAT_TABLE_FIELD_MAP)) {
      pushUniqueMessage(
        errors,
        `Missing required flat table: "${tableName}".`
      );
    }
  }

  // ==========================================
  // 2. CHECK UNKNOWN TABLES
  // ==========================================
  for (const tableName of Object.keys(FLAT_TABLE_FIELD_MAP)) {
    if (!REQUIRED_TABLES.includes(tableName)) {
      pushUniqueMessage(
        warnings,
        `Unknown flat table "${tableName}" is not listed in REQUIRED_TABLES.`
      );
    }
  }

  // ==========================================
  // 3. VALIDATE EACH TABLE
  // ==========================================
  for (const [tableName, fieldList] of Object.entries(FLAT_TABLE_FIELD_MAP)) {
    if (!Array.isArray(fieldList)) {
      pushUniqueMessage(
        errors,
        `Flat table "${tableName}" must be an array of field names.`
      );
      continue;
    }

    if (fieldList.length === 0) {
      pushUniqueMessage(
        warnings,
        `Flat table "${tableName}" has no mapped fields.`
      );
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

      if (!canonicalFieldNames.has(fieldName)) {
        pushUniqueMessage(
          errors,
          `Field "${fieldName}" in table "${tableName}" is not defined in CANONICAL_FIELDS.`
        );
        continue;
      }

      validUsedFields.add(fieldName);
    }

    if (duplicates.size > 0) {
      pushUniqueMessage(
        errors,
        `Table "${tableName}" contains duplicate fields: ${[...duplicates].join(", ")}.`
      );
    }

    // ==========================================
    // 4. REQUIRED FIELD CHECK
    // ==========================================
    const requiredFields = REQUIRED_FIELDS_BY_TABLE[tableName] || [];

    for (const requiredField of requiredFields) {
      if (!canonicalFieldNames.has(requiredField)) {
        pushUniqueMessage(
          errors,
          `Required field "${requiredField}" for table "${tableName}" is not defined in CANONICAL_FIELDS.`
        );
      }

      if (!fieldList.includes(requiredField)) {
        pushUniqueMessage(
          errors,
          `Table "${tableName}" is missing required field "${requiredField}".`
        );
      }
    }

    // ==========================================
    // 5. BUSINESS GRAIN KEY CHECK
    // ==========================================
    const grainKeys = BUSINESS_GRAIN_KEYS_BY_TABLE[tableName] || [];

    for (const grainKey of grainKeys) {
      if (!fieldList.includes(grainKey)) {
        pushUniqueMessage(
          errors,
          `Table "${tableName}" is missing business grain key "${grainKey}".`
        );
      }
    }

    // ==========================================
    // 6. FORBIDDEN FIELD CHECK
    // ==========================================
    const forbiddenFields = FORBIDDEN_FIELDS_BY_TABLE[tableName] || [];

    for (const forbiddenField of forbiddenFields) {
      if (fieldList.includes(forbiddenField)) {
        pushUniqueMessage(
          errors,
          `Field "${forbiddenField}" should not appear in "${tableName}" because it violates the table grain.`
        );
      }
    }

    // ==========================================
    // 7. OPTIONAL SEMANTIC WARNINGS
    // ==========================================
    for (const fieldName of fieldList) {
      const fieldMeta = canonicalFieldMap[fieldName];
      if (!fieldMeta) continue;

      if (
        tableName === "flat_student_summary" &&
        (fieldMeta.group === "assessment" || fieldMeta.group === "activity")
      ) {
        pushUniqueMessage(
          warnings,
          `Field "${fieldName}" in "${tableName}" may be too detailed for a student-course summary table.`
        );
      }

      if (
        tableName === "flat_assessment_result" &&
        fieldMeta.group === "engagement"
      ) {
        pushUniqueMessage(
          warnings,
          `Field "${fieldName}" in "${tableName}" may introduce engagement-summary logic into an assessment-grain table.`
        );
      }

      if (
        tableName === "flat_engagement_event" &&
        fieldMeta.group === "assessment"
      ) {
        pushUniqueMessage(
          warnings,
          `Field "${fieldName}" in "${tableName}" may introduce assessment-level logic into an engagement-event table.`
        );
      }
    }
  }

  // ==========================================
  // 8. WARN IF REQUIRED CANONICAL FIELDS ARE UNUSED
  // ==========================================
  for (const field of CANONICAL_FIELDS) {
    if (field.required && !validUsedFields.has(field.name)) {
      pushUniqueMessage(
        warnings,
        `Required canonical field "${field.name}" is not used in any flat table.`
      );
    }
  }

  // ==========================================
  // 9. WARN IF IMPORTANT OPTIONAL FIELDS ARE UNUSED
  // ==========================================
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

  // ==========================================
  // RESULT
  // ==========================================
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