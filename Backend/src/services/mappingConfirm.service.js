import { validateMapping } from "./mappingValidation.service.js";

// ==========================================
// HELPERS
// ==========================================

function getCurrentIsoTimestamp() {
  return new Date().toISOString();
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeFieldStatusForConfirmedMapping(fieldMapping) {
  if (!fieldMapping || typeof fieldMapping !== "object") {
    return fieldMapping;
  }

  // Không throw ở đây nữa.
  // Để validateMapping(mode="strict") trả về validationResult chuẩn.
  return fieldMapping;
}

// ==========================================
// MAIN SERVICE
// ==========================================

export function confirmMapping({
  mappingConfig,
  profilingResult,
  confirmedAt = null
}) {
  const confirmedMapping = deepClone(mappingConfig);

  confirmedMapping.mapping_status = "confirmed";
  confirmedMapping.confirmed_at = confirmedAt || getCurrentIsoTimestamp();

  if (Array.isArray(confirmedMapping.field_mappings)) {
    confirmedMapping.field_mappings = confirmedMapping.field_mappings.map(
      normalizeFieldStatusForConfirmedMapping
    );
  }

  const validationResult = validateMapping({
    mappingConfig: confirmedMapping,
    profilingResult,
    mode: "strict"
  });

  if (!validationResult.isValid) {
    const error = new Error("Mapping confirmation failed.");
    error.status = 400;
    error.code = "MAPPING_CONFIRMATION_FAILED";
    error.validationResult = validationResult;
    throw error;
  }

  return {
    mappingConfig: confirmedMapping,
    validationResult
  };
}