const fs = require('fs');
const file = 'c:/[Graduation_Thesis]Prototype/Backend/src/services/mappingValidation.service.js';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('  // ==========================================\r\n  // 4. DUPLICATE CANONICAL FIELD CHECK');
const fallbackStartIndex = content.indexOf('  // ==========================================\n  // 4. DUPLICATE CANONICAL FIELD CHECK');

const actualStart = startIndex > -1 ? startIndex : fallbackStartIndex;

const endIndex = content.indexOf('  // ==========================================\r\n  // 7. PROFILING COVERAGE WARNINGS');
const fallbackEndIndex = content.indexOf('  // ==========================================\n  // 7. PROFILING COVERAGE WARNINGS');

const actualEnd = endIndex > -1 ? endIndex : fallbackEndIndex;

if (actualStart > -1 && actualEnd > -1) {
  const newContent = content.substring(0, actualStart) + 
`  // ==========================================
  // 4. DUPLICATE CANONICAL FIELD CHECK
  // duplication is expected in duplication-table architecture
  // ==========================================
  for (const [canonicalField, count] of canonicalFieldUsage.entries()) {
    if (count > 1) {
      reportIssue({
        mode,
        severity: "warning",
        message: \`Canonical field "\${canonicalField}" is mapped \${count} times. This can be valid in duplication-table architecture, but review whether the duplication is intentional.\`,
        errors,
        warnings
      });
    }
  }

  // ==========================================
  // 5. REQUIRED CANONICAL FIELD COVERAGE
  // ==========================================
  const isUciDataset =
    String(mappingConfig?.source_dataset || "").toUpperCase() === "UCI" ||
    String(mappingConfig?.dataset_name || "").toUpperCase().includes("UCI");

  const isCustomDataset =
    String(mappingConfig?.source_dataset || "").toUpperCase() === "CUSTOM";

  for (const requiredField of REQUIRED_CANONICAL_FIELDS) {
    if ((isUciDataset || isCustomDataset) && ["student_id", "course_id"].includes(requiredField)) {
      continue;
    }

    const isCoveredInDraft =
      canonicalFieldUsage.has(requiredField) ||
      (requiredField === "source_dataset" && isNonEmptyString(mappingConfig.source_dataset));

    const isCoveredInStrict =
      confirmedCanonicalFields.has(requiredField) ||
      (requiredField === "source_dataset" && isNonEmptyString(mappingConfig.source_dataset));

    if (mode === "draft" && !isCoveredInDraft) {
      pushUniqueMessage(
        errors,
        \`Required canonical field "\${requiredField}" is not covered by the mapping config.\`
      );
    }

    if (mode === "strict" && !isCoveredInStrict) {
      pushUniqueMessage(
        errors,
        \`Required canonical field "\${requiredField}" must be confirmed before strict validation passes.\`
      );
    }
  }

  // ==========================================
  // 6. MAPPING STATUS CONSISTENCY
  // ==========================================
  if (mappingConfig.mapping_status === "confirmed") {
    const hasNonFinalFieldStatus = mappingConfig.field_mappings.some(
      (item) => item?.status === "suggested" || item?.status === "needs_review"
    );

    if (hasNonFinalFieldStatus) {
      reportIssue({
        mode,
        severity: "strict_error",
        message:
          'mapping_status is "confirmed" but some field mappings are still "suggested" or "needs_review".',
        errors,
        warnings
      });
    }

    if (!mappingConfig.confirmed_at) {
      reportIssue({
        mode,
        severity: "strict_error",
        message:
          'mapping_status is "confirmed" but "confirmed_at" is missing or null.',
        errors,
        warnings
      });
    }
  }

  if (mode === "strict" && mappingConfig.mapping_status !== "confirmed") {
    pushUniqueMessage(
      errors,
      'mapping_status must be "confirmed" in strict mode.'
    );
  }

` + content.substring(actualEnd);
  
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Success');
} else {
  console.log('Could not find markers');
}
