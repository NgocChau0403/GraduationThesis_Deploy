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

  // field_mappings được giữ nguyên sau deepClone — không cần transform thêm.

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