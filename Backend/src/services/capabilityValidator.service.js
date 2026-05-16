import prisma from "../lib/prisma.js";
import taskRegistryService from "./taskRegistry.service.js";
import { WarningCodes } from "../constants/warningCodes.js";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

/** Whitelist of real DB table names — prevents SQL injection in dynamic queries */
const ALLOWED_TABLES = new Set([
  "student",
  "enrollment",
  "assessment",
  "assessment_result",
  "engagement",
  "event",
  "import_batch",
]);

/**
 * Maps datasetCompatibility values to their required source_dataset values.
 * "both" means any dataset is accepted.
 */
const DATASET_COMPAT_MAP = {
  OULAD_only: "OULAD",
  UCI_only:   "UCI",
  both:       null, // no restriction
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Strips bracket annotations from a sourceTable entry.
 * "assessment [OULAD only]" → "assessment"
 */
function extractTableName(sourceTableStr) {
  return sourceTableStr.replace(/\s*\[.*?\]/g, "").trim().toLowerCase();
}

/**
 * Validates and returns a safe table name.
 * Throws if the name is not in the whitelist.
 */
function sanitizeTable(name) {
  if (!ALLOWED_TABLES.has(name)) {
    throw new Error(`[CapabilityValidator] Unauthorized table name: "${name}"`);
  }
  return name;
}

/**
 * Derives overall executable status from layer results.
 *
 * Rules:
 *  - Any "fail" in structural or data_sufficiency → "unsupported" or "insufficient_data"
 *  - "fail" in semantic → "partial" (dataset mismatch or FE not populated)
 *  - All pass → "executable"
 */
function deriveStatus(layers) {
  if (layers.structural === "fail")       return "unsupported";
  if (layers.data_sufficiency === "fail") return "insufficient_data";
  if (layers.semantic === "fail")         return "partial";
  return "executable";
}

// ─────────────────────────────────────────────────────────────────────────────
// CLASS
// ─────────────────────────────────────────────────────────────────────────────

class CapabilityValidatorService {

  // ── LAYER A: Structural Capability ─────────────────────────────────────────
  /**
   * Checks that all tables referenced by the task physically exist in the DB.
   *
   * Why information_schema? → Safe, read-only, no dynamic table access needed.
   * The table names are passed as parameterized VALUES (not interpolated),
   * so prisma.$queryRaw is safe here.
   *
   * @param {Object} task
   * @returns {{ pass: boolean, missing_tables: string[] }}
   */
  async layerA_structural(task) {
    const missingTables = [];

    for (const rawTable of task.sourceTables ?? []) {
      const tableName = extractTableName(rawTable);
      if (!tableName) continue;

      const result = await prisma.$queryRaw`
        SELECT COUNT(*)::int AS cnt
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name   = ${tableName}
      `;

      const count = result[0]?.cnt ?? 0;
      if (count === 0) missingTables.push(tableName);
    }

    return {
      pass:           missingTables.length === 0,
      missing_tables: missingTables,
    };
  }

  // ── LAYER B: Semantic Capability (FE Fields + Dataset Compat) ──────────────
  /**
   * Checks two things:
   *
   * B1. Dataset Compatibility:
   *     If task is "OULAD_only" but active dataset is "UCI" → fail.
   *
   * B2. Stored FE Field Availability:
   *     For fe_fields with storage="stored", checks that at least 1 row in
   *     the table has the field populated for this batch. This confirms the
   *     ETL pipeline ran the feature engineering step.
   *
   *     COMPUTED fields are skipped — they are derived at query time and will
   *     be available as long as source tables have data (Layer D handles this).
   *
   * @param {Object} task
   * @param {{ batchId: string, sourceDataset: string }} ctx
   * @returns {{ pass: boolean, missing_fe_fields: string[], compatibility_mismatch: boolean }}
   */
  async layerB_semantic(task, { batchId, sourceDataset }) {
    const missingFeFields = [];
    let compatibilityMismatch = false;

    // B1 — Dataset compatibility check
    const requiredDataset = DATASET_COMPAT_MAP[task.datasetCompatibility];
    if (requiredDataset && sourceDataset !== requiredDataset) {
      compatibilityMismatch = true;
    }

    // B2 — Stored FE field availability check
    const storedFeFields = (task.fe_fields ?? []).filter(
      (f) => f.storage === "stored" && f.table
    );

    for (const feField of storedFeFields) {
      // Skip check if this field belongs to a dataset the active batch doesn't have
      if (feField.dataset !== "both" && feField.dataset !== sourceDataset) continue;

      const table = sanitizeTable(feField.table);
      const field = feField.field;

      // Dynamic column check — table name from whitelist, field name validated below.
      // We use $queryRawUnsafe only AFTER sanitizing both table and field names.
      // Stricter regex: must start with letter/underscore, alphanumeric+underscore only.
      // Avoids unicode word chars that \w can match in some JS engines.
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(field)) {
        console.warn(`[LayerB] Skipping field with invalid name: ${field}`);
        continue;
      }

      const sql = `
        SELECT COUNT(*)::int AS cnt
        FROM "${table}"
        WHERE "${field}" IS NOT NULL
          AND batch_id = $1
        LIMIT 1
      `;

      const result = await prisma.$queryRawUnsafe(sql, batchId);
      const count = result[0]?.cnt ?? 0;

      if (count === 0) missingFeFields.push(`${table}.${field}`);
    }

    // Build structured missing_requirements
    const structuredMissing = [];
    if (compatibilityMismatch) {
      structuredMissing.push({
        ...WarningCodes.DATASET_MISMATCH,
        message: `Task requires "${DATASET_COMPAT_MAP[task.datasetCompatibility]}" dataset but active dataset is "${sourceDataset}".`,
        context: { required: DATASET_COMPAT_MAP[task.datasetCompatibility], actual: sourceDataset },
      });
    }
    for (const f of missingFeFields) {
      structuredMissing.push({
        ...WarningCodes.FEATURE_NOT_POPULATED,
        message: `FE field not populated: ${f}`,
        field:   f,
      });
    }

    return {
      pass:                   missingFeFields.length === 0 && !compatibilityMismatch,
      missing_fe_fields:      missingFeFields,
      compatibility_mismatch: compatibilityMismatch,
      structured_issues:      structuredMissing,
    };
  }

  // ── LAYER C: Analytical Capability ─────────────────────────────────────────
  /**
   * Checks whether the data has enough structure to support the analysis type.
   * This layer produces WARNINGS (not hard failures) — the task can still run
   * but results may be unreliable.
   *
   * Analysis types handled:
   *   trend        → need ≥ 2 distinct temporal points (week_of_class)
   *   comparison   → need ≥ 2 distinct students in the class
   *   correlation  → pass if Layer A+B pass (SQL handles the math)
   *   distribution → always pass
   *   aggregation  → always pass
   *   synthesis    → always pass
   *   ranking      → pass if Layer A+B pass
   *
   * @param {Object} task
   * @param {{ batchId: string, classId?: string }} ctx
   * @returns {{ pass: boolean, warnings: string[] }}
   */
  async layerC_analytical(task, { batchId, classId }) {
    const warnings = [];
    const analysisType = task.analytics?.analysisType?.toLowerCase() ?? "";

    if (analysisType.includes("trend")) {
      // Need ≥ 2 distinct temporal points
      const result = await prisma.$queryRaw`
        SELECT COUNT(DISTINCT week_of_class)::int AS cnt
        FROM assessment
        WHERE batch_id = ${batchId}
      `;
      const temporalPoints = result[0]?.cnt ?? 0;
      if (temporalPoints < 2) {
        warnings.push({
          ...WarningCodes.INSUFFICIENT_TEMPORAL_POINTS,
          message: `Trend analysis requires ≥ 2 time points — found ${temporalPoints}. Results may be unreliable.`,
          context: { found: temporalPoints, required: 2 },
        });
      }
    }

    if (analysisType.includes("comparison")) {
      // Need ≥ 2 students
      const baseQuery = classId
        ? prisma.$queryRaw`
            SELECT COUNT(DISTINCT student_id)::int AS cnt
            FROM enrollment
            WHERE batch_id = ${batchId} AND class_id = ${classId}
          `
        : prisma.$queryRaw`
            SELECT COUNT(DISTINCT student_id)::int AS cnt
            FROM enrollment
            WHERE batch_id = ${batchId}
          `;
      const result = await baseQuery;
      const studentCount = result[0]?.cnt ?? 0;
      if (studentCount < 2) {
        warnings.push({
          ...WarningCodes.INSUFFICIENT_STUDENT_COUNT,
          message: `Comparison analysis requires ≥ 2 students — found ${studentCount}.`,
          context: { found: studentCount, required: 2 },
        });
      }
    }

    return {
      pass:     true, // Layer C only warns, never hard-fails
      warnings,
    };
  }

  // ── LAYER D: Data Sufficiency ───────────────────────────────────────────────
  /**
   * Checks that there is enough raw data to produce meaningful analytics.
   *
   * Thresholds (per task spec):
   *   enrollment rows   < 5  → fail (too few students)
   *   assessment_result < 2  → fail (no meaningful score data)
   *
   * Confidence bands:
   *   HIGH   → > 100 assessment_result rows
   *   MEDIUM → 10 – 100
   *   LOW    → 2 – 9
   *
   * @param {Object} task
   * @param {{ batchId: string, classId?: string }} ctx
   * @returns {{ pass: boolean, confidence: string, confidence_reason: string }}
   */
  async layerD_dataSufficiency(task, { batchId, classId }) {
    // ── Step 1: Check minimum enrollment ─────────────────────────────────────
    const enrollmentResult = classId
      ? await prisma.$queryRaw`
          SELECT COUNT(*)::int AS cnt FROM enrollment
          WHERE batch_id = ${batchId} AND class_id = ${classId}
        `
      : await prisma.$queryRaw`
          SELECT COUNT(*)::int AS cnt FROM enrollment
          WHERE batch_id = ${batchId}
        `;
    const enrollmentCount = enrollmentResult[0]?.cnt ?? 0;

    if (enrollmentCount < 5) {
      return {
        pass:              false,
        confidence:        "LOW",
        confidence_reason: `Only ${enrollmentCount} enrolled students (minimum 5 required).`,
        structured_issue: {
          ...WarningCodes.ENROLLMENT_BELOW_MINIMUM,
          message: `Only ${enrollmentCount} enrolled students (minimum 5 required).`,
          context: { found: enrollmentCount, required: 5 },
        },
      };
    }

    // ── Step 2: Composite quality metrics ────────────────────────────────────
    // Raw row count alone is a poor proxy: 100 rows from 1 student = low quality.
    // We measure 3 independent quality dimensions:
    //   - distinct_students : breadth of population coverage
    //   - distinct_assessments: diversity of measurement points
    //   - distinct_weeks    : temporal spread (requires JOIN to get week_of_class)
    //
    // JOIN to assessment is architecturally necessary here:
    //   assessment_result has batch_id (used for batch filter via ar.batch_id)
    //   but week_of_class and class_id live on assessment — JOIN is required.
    const qualityResult = classId
      ? await prisma.$queryRaw`
          SELECT
            COUNT(*)::int                         AS total_results,
            COUNT(DISTINCT ar.student_id)::int    AS distinct_students,
            COUNT(DISTINCT ar.assessment_id)::int AS distinct_assessments,
            COUNT(DISTINCT a.week_of_class)::int  AS distinct_weeks
          FROM assessment_result ar
          JOIN assessment a ON ar.assessment_id = a.assessment_id
          WHERE ar.batch_id = ${batchId} AND a.class_id = ${classId}
        `
      : await prisma.$queryRaw`
          SELECT
            COUNT(*)::int                         AS total_results,
            COUNT(DISTINCT ar.student_id)::int    AS distinct_students,
            COUNT(DISTINCT ar.assessment_id)::int AS distinct_assessments,
            COUNT(DISTINCT a.week_of_class)::int  AS distinct_weeks
          FROM assessment_result ar
          JOIN assessment a ON ar.assessment_id = a.assessment_id
          WHERE ar.batch_id = ${batchId}
        `;

    const q = qualityResult[0] ?? {};
    const totalResults       = q.total_results       ?? 0;
    const distinctStudents   = q.distinct_students   ?? 0;
    const distinctAssessments = q.distinct_assessments ?? 0;
    const distinctWeeks      = q.distinct_weeks      ?? 0;

    if (totalResults < 2) {
      return {
        pass:              false,
        confidence:        "LOW",
        confidence_reason: `Only ${totalResults} assessment results found (minimum 2 required).`,
        structured_issue: {
          ...WarningCodes.ASSESSMENT_RESULTS_BELOW_MINIMUM,
          message: `Only ${totalResults} assessment results found (minimum 2 required).`,
          context: { found: totalResults, required: 2 },
        },
      };
    }

    // ── Step 3: Composite confidence band ────────────────────────────────────
    // HIGH:   broad population + multiple assessments + temporal spread
    // MEDIUM: adequate on at least 2 of 3 dimensions
    // LOW:    minimal data — analytically valid but interpret cautiously
    let confidence, confidence_reason;

    if (distinctStudents >= 10 && distinctAssessments >= 3 && distinctWeeks >= 2) {
      confidence        = "HIGH";
      confidence_reason = (
        `${distinctStudents} students × ${distinctAssessments} assessments ` +
        `across ${distinctWeeks} weeks — strong statistical basis.`
      );
    } else if (distinctStudents >= 5 && distinctAssessments >= 2) {
      confidence        = "MEDIUM";
      confidence_reason = (
        `${distinctStudents} students × ${distinctAssessments} assessments ` +
        `(${distinctWeeks} week${distinctWeeks !== 1 ? "s" : ""}) — adequate for most analyses.`
      );
    } else {
      confidence        = "LOW";
      confidence_reason = (
        `Limited diversity: ${distinctStudents} student(s), ` +
        `${distinctAssessments} assessment(s), ${distinctWeeks} week(s). ` +
        `Results should be interpreted cautiously.`
      );
    }

    // LOW confidence → emit advisory code for frontend
    const lowDiversityIssue = confidence === "LOW"
      ? {
          ...WarningCodes.LOW_DATA_DIVERSITY,
          message: confidence_reason,
          context: { distinctStudents, distinctAssessments, distinctWeeks },
        }
      : null;

    return { pass: true, confidence, confidence_reason, structured_issue: lowDiversityIssue };
  }

  // ── MAIN: Validate a single task ───────────────────────────────────────────
  /**
   * Runs all 4 layers in sequence. Stops early if Layer A fails (no point
   * running downstream checks if tables don't even exist).
   *
   * @param {string} taskId
   * @param {{ batchId: string, classId?: string, sourceDataset: string }} ctx
   * @returns {Object} Full validation result object
   */
  async validateTask(taskId, { batchId, classId, sourceDataset }) {
    const task = taskRegistryService.getTaskById(taskId);
    if (!task) {
      return {
        task_id:              taskId,
        executable:           false,
        status:               "unsupported",
        confidence:           null,
        confidence_reason:    "Task not found in registry.",
        warnings:             [],
        missing_requirements: [`Task "${taskId}" does not exist.`],
        layer_results: {
          structural:       "fail",
          semantic:         "skip",
          analytical:       "skip",
          data_sufficiency: "skip",
        },
      };
    }

    const allWarnings        = [];
    const missingRequirements = [];

    // ── Layer A ──
    const layerA = await this.layerA_structural(task);
    if (!layerA.pass) {
      missingRequirements.push(...layerA.missing_tables.map((t) => `Missing table: ${t}`));
    }

    // Early exit: if tables don't exist, lower layers will fail anyway
    if (!layerA.pass) {
      return {
        task_id:              taskId,
        executable:           false,
        status:               "unsupported",
        confidence:           null,
        confidence_reason:    "Required database tables are missing.",
        warnings:             [],
        missing_requirements: missingRequirements,
        layer_results: {
          structural:       "fail",
          semantic:         "skip",
          analytical:       "skip",
          data_sufficiency: "skip",
        },
      };
    }

    // ── Layer B ──
    const layerB = await this.layerB_semantic(task, { batchId, sourceDataset });
    if (!layerB.pass) {
      missingRequirements.push(...layerB.structured_issues);
    }

    // ── Layer C ──
    const layerC = await this.layerC_analytical(task, { batchId, classId });
    allWarnings.push(...layerC.warnings);

    // ── Layer D ──
    const layerD = await this.layerD_dataSufficiency(task, { batchId, classId });
    if (!layerD.pass) {
      missingRequirements.push(layerD.structured_issue ?? { code: "DATA_INSUFFICIENT", message: layerD.confidence_reason, severity: "error" });
    }

    // ── Assemble final result ──
    const layerResults = {
      structural:       layerA.pass ? "pass" : "fail",
      semantic:         layerB.pass ? "pass" : "fail",
      analytical:       layerC.warnings.length === 0 ? "pass" : "warn",
      data_sufficiency: layerD.pass ? "pass" : "fail",
    };

    const status     = deriveStatus(layerResults);
    const executable = status === "executable";

    return {
      task_id:              taskId,
      executable,
      status,
      confidence:           layerD.pass ? layerD.confidence : "LOW",
      confidence_reason:    layerD.confidence_reason,
      warnings:             allWarnings,
      missing_requirements: missingRequirements,
      layer_results:        layerResults,
    };
  }

  // ── MAIN: Validate all tasks ────────────────────────────────────────────────
  /**
   * Validates all 53 tasks in the registry for a given dataset context.
   * Runs tasks sequentially to avoid DB connection pool exhaustion.
   *
   * @param {{ batchId: string, classId?: string, sourceDataset: string }} ctx
   * @returns {Object[]} Array of validation results, sorted by status
   */
  async validateAll({ batchId, classId, sourceDataset }) {
    const allTasks = taskRegistryService.getAllTasks();
    const results  = [];

    for (const task of allTasks) {
      const result = await this.validateTask(task.taskId, {
        batchId,
        classId,
        sourceDataset,
      });
      results.push(result);
    }

    // Sort: executable first, then partial, then insufficient_data, then unsupported
    const ORDER = { executable: 0, partial: 1, insufficient_data: 2, unsupported: 3 };
    results.sort((a, b) => (ORDER[a.status] ?? 9) - (ORDER[b.status] ?? 9));

    return results;
  }
}

// Export singleton
const capabilityValidatorService = new CapabilityValidatorService();
export default capabilityValidatorService;
