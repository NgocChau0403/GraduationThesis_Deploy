import { mapUciColumn } from "./uci.rules.js";
import { mapOuladColumn } from "./oulad.rules.js";

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function getDatasetRuleMapper(datasetName, sourceDataset) {
  const dataset = normalizeText(datasetName);
  const source = normalizeText(sourceDataset);

  if (
    dataset.includes("uci") ||
    source.includes("uci") ||
    dataset.includes("student_mat") ||
    dataset.includes("student_por") ||
    dataset.includes("student_mat_csv") ||
    dataset.includes("student_por_csv") ||
    source.includes("student_mat") ||
    source.includes("student_por")
  ) {
    return mapUciColumn;
  }

  if (
    dataset.includes("oulad") ||
    source.includes("oulad")
  ) {
    return mapOuladColumn;
  }

  return null;
}