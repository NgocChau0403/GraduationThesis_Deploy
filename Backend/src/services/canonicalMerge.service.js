import { ENTITY_BUSINESS_KEYS } from "../config/entityBusinessKeys.js";
import { ENTITY_MERGE_POLICY } from "../config/entityMergePolicy.js";

// ==========================================
// CONSTANTS
// ==========================================

const SUPPORTED_ENTITIES = [
  "student",
  "course",
  "assessment",
  "engagement_event"
];

const SUPPORTED_MERGE_POLICIES = [
  "merge_non_null",
  "keep_first",
  "keep_last",
  "keep_distinct"
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

function initializeOutputBuckets() {
  return {
    student: [],
    course: [],
    assessment: [],
    engagement_event: []
  };
}

function initializeEntityStats() {
  return {
    student: {
      input_count: 0,
      output_count: 0,
      merged_count: 0,
      dropped_count: 0
    },
    course: {
      input_count: 0,
      output_count: 0,
      merged_count: 0,
      dropped_count: 0
    },
    assessment: {
      input_count: 0,
      output_count: 0,
      merged_count: 0,
      dropped_count: 0
    },
    engagement_event: {
      input_count: 0,
      output_count: 0,
      merged_count: 0,
      dropped_count: 0
    }
  };
}

function normalizeKeyPart(value) {
  if (value === null || value === undefined || value === "") {
    return "__NULL__";
  }

  return String(value).trim();
}

function buildBusinessKey(record, keyFields) {
  return keyFields.map((fieldName) => normalizeKeyPart(record[fieldName])).join("||");
}

function hasAllBusinessKeyFields(record, keyFields) {
  return keyFields.every((fieldName) => {
    const value = record[fieldName];
    return value !== null && value !== undefined && value !== "";
  });
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeNonNullRecords(baseRecord, incomingRecord, warnings, entityName, businessKey) {
  const merged = { ...baseRecord };

  for (const [fieldName, incomingValue] of Object.entries(incomingRecord)) {
    const existingValue = merged[fieldName];

    const incomingIsEmpty =
      incomingValue === null || incomingValue === undefined || incomingValue === "";
    const existingIsEmpty =
      existingValue === null || existingValue === undefined || existingValue === "";

    if (existingIsEmpty && !incomingIsEmpty) {
      merged[fieldName] = incomingValue;
      continue;
    }

    if (!existingIsEmpty && !incomingIsEmpty && existingValue !== incomingValue) {
      pushUnique(
        warnings,
        `Conflict on entity "${entityName}" for business key "${businessKey}" at field "${fieldName}". Kept existing value "${existingValue}" and ignored incoming value "${incomingValue}".`
      );
    }
  }

  return merged;
}

function applyMergePolicy({
  policy,
  existingRecord,
  incomingRecord,
  warnings,
  entityName,
  businessKey
}) {
  switch (policy) {
    case "merge_non_null":
      return mergeNonNullRecords(
        existingRecord,
        incomingRecord,
        warnings,
        entityName,
        businessKey
      );

    case "keep_first":
      return existingRecord;

    case "keep_last":
      return incomingRecord;

    case "keep_distinct":
      // keep_distinct should normally not reach this merge step if key is truly distinct,
      // but if the same key appears twice we keep the first and warn.
      pushUnique(
        warnings,
        `Duplicate record detected for entity "${entityName}" with business key "${businessKey}" under "keep_distinct" policy. Kept first record.`
      );
      return existingRecord;

    default:
      throw new Error(`Unsupported merge policy "${policy}".`);
  }
}

function validateEntityConfig(entityName) {
  const keyFields = ENTITY_BUSINESS_KEYS[entityName];
  const mergePolicy = ENTITY_MERGE_POLICY[entityName];

  if (!Array.isArray(keyFields) || keyFields.length === 0) {
    throw new Error(
      `Missing or invalid business key configuration for entity "${entityName}".`
    );
  }

  if (!SUPPORTED_MERGE_POLICIES.includes(mergePolicy)) {
    throw new Error(
      `Missing or invalid merge policy for entity "${entityName}".`
    );
  }

  return {
    keyFields,
    mergePolicy
  };
}

// ==========================================
// MAIN SERVICE
// ==========================================

export function mergeCanonicalEntities({ canonicalOutput }) {
  if (!isPlainObject(canonicalOutput)) {
    const error = new Error(
      'Invalid canonicalOutput: expected an object grouped by entity.'
    );
    error.code = "INVALID_CANONICAL_OUTPUT";
    throw error;
  }

  const mergedOutput = initializeOutputBuckets();
  const stats = initializeEntityStats();
  const warnings = [];

  for (const entityName of SUPPORTED_ENTITIES) {
    const records = Array.isArray(canonicalOutput[entityName])
      ? canonicalOutput[entityName]
      : [];

    stats[entityName].input_count = records.length;

    const { keyFields, mergePolicy } = validateEntityConfig(entityName);

    const keyedRecordMap = new Map();

    for (let index = 0; index < records.length; index += 1) {
      const record = records[index];

      if (!isPlainObject(record)) {
        stats[entityName].dropped_count += 1;
        pushUnique(
          warnings,
          `Dropped invalid record at entity "${entityName}" index ${index} because it is not a plain object.`
        );
        continue;
      }

      if (!hasAllBusinessKeyFields(record, keyFields)) {
        stats[entityName].dropped_count += 1;
        pushUnique(
          warnings,
          `Dropped record at entity "${entityName}" index ${index} because one or more business key fields are missing: ${keyFields.join(", ")}.`
        );
        continue;
      }

      const businessKey = buildBusinessKey(record, keyFields);

      if (!keyedRecordMap.has(businessKey)) {
        keyedRecordMap.set(businessKey, deepClone(record));
        continue;
      }

      const existingRecord = keyedRecordMap.get(businessKey);
      const mergedRecord = applyMergePolicy({
        policy: mergePolicy,
        existingRecord,
        incomingRecord: record,
        warnings,
        entityName,
        businessKey
      });

      keyedRecordMap.set(businessKey, mergedRecord);
      stats[entityName].merged_count += 1;
    }

    mergedOutput[entityName] = Array.from(keyedRecordMap.values());
    stats[entityName].output_count = mergedOutput[entityName].length;
  }

  return {
    output: mergedOutput,
    summary: {
      entity_stats: stats,
      total_input_count: SUPPORTED_ENTITIES.reduce(
        (sum, entityName) => sum + stats[entityName].input_count,
        0
      ),
      total_output_count: SUPPORTED_ENTITIES.reduce(
        (sum, entityName) => sum + stats[entityName].output_count,
        0
      ),
      total_merged_count: SUPPORTED_ENTITIES.reduce(
        (sum, entityName) => sum + stats[entityName].merged_count,
        0
      ),
      total_dropped_count: SUPPORTED_ENTITIES.reduce(
        (sum, entityName) => sum + stats[entityName].dropped_count,
        0
      )
    },
    warnings
  };
}