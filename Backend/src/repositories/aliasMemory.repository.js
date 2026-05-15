import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALIAS_FILE_PATH = path.resolve(__dirname, "../config/learnedAliases.json");

export function normalizeKey(rawColumn) {
  if (typeof rawColumn !== "string") return "";
  // Convert to lowercase, replace non-alphanumeric (including hyphens/underscores) with space, then replace multiple spaces with single space, and trim.
  // Example: "Student_ID" -> "student id", "student-id" -> "student id"
  return rawColumn
    .toLowerCase()
    .replace(/[^a-z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function getLearnedAliases() {
  try {
    const data = await fs.readFile(ALIAS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      return {};
    }
    console.error("Error reading learned aliases:", err);
    return {};
  }
}

export async function saveLearnedAlias(rawColumn, canonicalField) {
  if (!rawColumn || !canonicalField) return;

  const normalizedKey = normalizeKey(rawColumn);
  if (!normalizedKey) return;

  try {
    const aliases = await getLearnedAliases();
    
    if (aliases[normalizedKey]) {
      // If the user mapped it to a DIFFERENT canonical field this time, update it and reset count
      if (aliases[normalizedKey].canonical_field !== canonicalField) {
         aliases[normalizedKey].canonical_field = canonicalField;
         aliases[normalizedKey].learned_count = 1;
      } else {
        aliases[normalizedKey].learned_count += 1;
      }
      aliases[normalizedKey].last_used_at = new Date().toISOString();
    } else {
      aliases[normalizedKey] = {
        canonical_field: canonicalField,
        learned_count: 1,
        last_used_at: new Date().toISOString()
      };
    }

    await fs.writeFile(ALIAS_FILE_PATH, JSON.stringify(aliases, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving learned alias:", err);
  }
}
