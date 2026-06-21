import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { suggestMappingsFromProfiling } from "../Backend/src/services/mappingSuggest.service.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = path.join(ROOT, "Docs", "evaluation_logs", "mapping_accuracy");

const SOURCE_FILES = [
  {
    dataset: "UCI Portuguese",
    sourceDataset: "UCI",
    file: "student-por.csv",
    path: path.join(ROOT, "Backend", "uploads", "UCI", "student-por.csv"),
    delimiter: ";"
  },
  ...[
    "assessments.csv",
    "courses.csv",
    "studentAssessment.csv",
    "studentInfo.csv",
    "studentRegistration.csv",
    "studentVle.csv",
    "vle.csv"
  ].map((file) => ({
    dataset: "OULAD",
    sourceDataset: "OULAD",
    file,
    path: path.join(ROOT, "Backend", "uploads", "OULAD", file),
    delimiter: ","
  }))
];

const GT = {
  "UCI Portuguese/student-por.csv": {
    school: ["school", "direct_copy", "student"],
    sex: ["gender", "normalize_gender", "student"],
    age: ["age_years", ["direct_copy", "cast_int"], "student"],
    address: ["residence_area", "direct_copy", "student"],
    famsize: ["family_size", "direct_copy", "student"],
    Pstatus: ["parent_cohabitation_status", "direct_copy", "student"],
    Medu: ["mother_education_level", "direct_copy", "student"],
    Fedu: ["father_education_level", "direct_copy", "student"],
    Mjob: ["mother_job", "direct_copy", "student"],
    Fjob: ["father_job", "direct_copy", "student"],
    reason: [null, "ignore", null, "No equivalent canonical field."],
    guardian: ["guardian_type", "direct_copy", "student"],
    traveltime: ["travel_time", "cast_int", "student"],
    studytime: ["studytime", "cast_int", "enrollment"],
    failures: ["previous_attempt_count", "cast_int", "enrollment"],
    schoolsup: ["school_support_flag", "cast_boolean", "student"],
    famsup: ["family_support_flag", "cast_boolean", "student"],
    paid: ["has_paid_class", "cast_boolean", "student"],
    activities: ["has_extracurricular", "cast_boolean", "student"],
    nursery: [null, "ignore", null, "No equivalent canonical field."],
    higher: ["higher_education_intent_flag", "cast_boolean", "student"],
    internet: ["internet_access_flag", "cast_boolean", "student"],
    romantic: ["has_romantic", "cast_boolean", "student"],
    famrel: ["family_relation", "cast_int", "student"],
    freetime: ["free_time", "cast_int", "student"],
    goout: ["go_out_freq", "cast_int", "student"],
    Dalc: ["alcohol_weekday", "cast_int", "student"],
    Walc: ["alcohol_weekend", "cast_int", "student"],
    health: ["health_status", "cast_int", "student"],
    absences: ["absence_count", "cast_int", "enrollment"],
    G1: ["score_normalized", "normalize_score", "assessment"],
    G2: ["score_normalized", "normalize_score", "assessment"],
    G3: ["score_normalized", "normalize_score", "assessment"]
  },
  "OULAD/assessments.csv": {
    code_module: ["course_id", "direct_copy", "course", "Module code is the course identifier.", ["course_name"]],
    code_presentation: ["course_run", "direct_copy", "course"],
    id_assessment: ["assessment_id", "direct_copy", "assessment"],
    assessment_type: ["assessment_type", "direct_copy", "assessment"],
    date: ["assessment_due_day", "cast_int", "assessment"],
    weight: ["assessment_weight_pct", "cast_float", "assessment"]
  },
  "OULAD/courses.csv": {
    code_module: ["course_id", "direct_copy", "course", "Module code is the course identifier.", ["course_name"]],
    code_presentation: ["course_run", "direct_copy", "course"],
    module_presentation_length: ["course_duration_days", "cast_int", "course"]
  },
  "OULAD/studentAssessment.csv": {
    id_assessment: ["assessment_id", "direct_copy", "assessment"],
    id_student: ["student_id", "direct_copy", "student"],
    date_submitted: ["submission_day", "cast_int", "assessment"],
    is_banked: ["is_banked", "cast_boolean", "assessment"],
    score: ["score_normalized", "normalize_score", "assessment"]
  },
  "OULAD/studentInfo.csv": {
    code_module: ["course_id", "direct_copy", "course", "Module code is the course identifier.", ["course_name"]],
    code_presentation: ["course_run", "direct_copy", "course"],
    id_student: ["student_id", "direct_copy", "student"],
    gender: ["gender", "normalize_gender", "student"],
    region: ["region", "direct_copy", "student"],
    highest_education: ["highest_education", "direct_copy", "student"],
    imd_band: ["socioeconomic_band", "direct_copy", "student"],
    age_band: ["age_group", "direct_copy", "student"],
    num_of_prev_attempts: ["previous_attempt_count", "cast_int", "enrollment"],
    studied_credits: ["study_load_credits", "cast_int", "enrollment"],
    disability: ["disability_flag", "cast_boolean", "student"],
    final_result: ["final_outcome", "direct_copy", "enrollment"]
  },
  "OULAD/studentRegistration.csv": {
    code_module: ["course_id", "direct_copy", "course", "Module code is the course identifier.", ["course_name"]],
    code_presentation: ["course_run", "direct_copy", "course"],
    id_student: ["student_id", "direct_copy", "student"],
    date_registration: ["enrollment_start_day", "cast_int", "enrollment"],
    date_unregistration: ["enrollment_end_day", "cast_int", "enrollment"]
  },
  "OULAD/studentVle.csv": {
    code_module: ["course_id", "direct_copy", "course", "Module code is the course identifier.", ["course_name"]],
    code_presentation: ["course_run", "direct_copy", "course"],
    id_student: ["student_id", "direct_copy", "student"],
    id_site: ["resource_id", "direct_copy", "engagement_event"],
    date: ["event_day", "cast_int", "engagement_event"],
    sum_click: ["engagement_count", "cast_int", "engagement_event"]
  },
  "OULAD/vle.csv": {
    id_site: ["resource_id", "direct_copy", "engagement_event"],
    code_module: ["course_id", "direct_copy", "course", "Module code is the course identifier.", ["course_name"]],
    code_presentation: ["course_run", "direct_copy", "course"],
    activity_type: ["resource_type", "direct_copy", "engagement_event"],
    week_from: ["available_from_week", "cast_int", "engagement_event", "Storage field exists on Event but is absent from CANONICAL_FIELDS."],
    week_to: ["available_to_week", "cast_int", "engagement_event", "Storage field exists on Event but is absent from CANONICAL_FIELDS."]
  }
};

function parseDelimitedLine(line, delimiter) {
  const values = [];
  let current = "";
  let quoted = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === delimiter && !quoted) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

function readSampleRows(filePath, delimiter, maxRows = 200) {
  const fd = fs.openSync(filePath, "r");
  const chunkSize = 1024 * 1024;
  const buffer = Buffer.alloc(chunkSize);
  const bytesRead = fs.readSync(fd, buffer, 0, chunkSize, 0);
  fs.closeSync(fd);

  const lines = buffer
    .subarray(0, bytesRead)
    .toString("utf8")
    .split(/\r?\n/)
    .filter((line) => line.length > 0)
    .slice(0, maxRows + 1);

  const headers = parseDelimitedLine(lines[0], delimiter);
  const rows = lines.slice(1).map((line) => parseDelimitedLine(line, delimiter));
  return { headers, rows };
}

function detectType(values) {
  const nonEmpty = values.filter((value) => value !== "" && value != null);
  if (nonEmpty.length === 0) return "string";
  if (nonEmpty.every((value) => /^-?\d+(\.\d+)?$/.test(String(value)))) return "numeric";
  const normalized = nonEmpty.map((value) => String(value).trim().toLowerCase());
  if (normalized.every((value) => ["0", "1", "y", "n", "yes", "no", "true", "false"].includes(value))) {
    return "boolean";
  }
  return "string";
}

function buildProfilingResult(filePath, delimiter) {
  const { headers, rows } = readSampleRows(filePath, delimiter);
  const columns = headers.map((header, index) => {
    const values = rows.map((row) => row[index] ?? "");
    const nonEmpty = values.filter((value) => value !== "");
    return {
      raw_column: header,
      detected_type: detectType(values),
      sample_values: [...new Set(nonEmpty)].slice(0, 8),
      distinct_count: new Set(nonEmpty).size,
      null_ratio: values.length === 0 ? 0 : (values.length - nonEmpty.length) / values.length
    };
  });
  return { columns, sampled_rows: rows.length };
}

function listify(value) {
  return Array.isArray(value) ? value : [value];
}

function classify(expected, actual) {
  const [expectedTarget, expectedTransform, expectedScope, note = "", nearTargets = []] = expected;
  const actualTarget = actual?.canonical_field ?? null;

  if (expectedTarget === null) {
    if (actualTarget === null) {
      return { category: "correctly_excluded", reason: note || "No canonical target expected." };
    }
    return { category: "wrong", reason: `Field should be excluded but was mapped to ${actualTarget}.` };
  }

  if (actualTarget === null) {
    return {
      category: "unknown",
      reason: note || `Mappable field was left unmapped; expected ${expectedTarget}.`
    };
  }

  if (actualTarget !== expectedTarget) {
    if (nearTargets.includes(actualTarget)) {
      return {
        category: "near_correct",
        reason: `${actualTarget} preserves related course context, but the canonical target should be ${expectedTarget}.`
      };
    }
    return {
      category: "wrong",
      reason: `Wrong canonical target: expected ${expectedTarget}, received ${actualTarget}.`
    };
  }

  const acceptedTransforms = listify(expectedTransform);
  const acceptedScopes = listify(expectedScope);
  const transformOk = acceptedTransforms.includes(actual.transform);
  const scopeOk = acceptedScopes.includes(actual.entity_scope);

  if (!transformOk || !scopeOk) {
    const issues = [];
    if (!transformOk) issues.push(`transform ${actual.transform}, expected ${acceptedTransforms.join(" or ")}`);
    if (!scopeOk) issues.push(`scope ${actual.entity_scope}, expected ${acceptedScopes.join(" or ")}`);
    return { category: "near_correct", reason: `Correct target with ${issues.join("; ")}.` };
  }

  return { category: "exact", reason: "Canonical target, transform, and entity scope match ground truth." };
}

function summarize(rows) {
  const categories = ["exact", "near_correct", "wrong", "unknown", "correctly_excluded"];
  const grouped = new Map();
  for (const dataset of [...new Set(rows.map((row) => row.dataset)), "Combined"]) {
    const subset = dataset === "Combined" ? rows : rows.filter((row) => row.dataset === dataset);
    const counts = Object.fromEntries(categories.map((category) => [
      category,
      subset.filter((row) => row.category === category).length
    ]));
    const mappable = subset.filter((row) => row.expected_target !== null).length;
    const nonMappable = subset.length - mappable;
    grouped.set(dataset, {
      dataset,
      total_fields: subset.length,
      mappable_fields: mappable,
      non_mappable_fields: nonMappable,
      ...counts,
      exact_accuracy: mappable ? counts.exact / mappable : null,
      usable_mapping_rate: mappable ? (counts.exact + counts.near_correct) / mappable : null,
      wrong_rate: mappable ? counts.wrong / mappable : null,
      unknown_rate: mappable ? counts.unknown / mappable : null,
      correct_exclusion_rate: nonMappable ? counts.correctly_excluded / nonMappable : null,
      high_confidence_errors: subset.filter(
        (row) => ["wrong", "unknown"].includes(row.category) && Number(row.confidence) >= 0.95
      ).length
    });
  }
  return [...grouped.values()];
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const rows = [];

  for (const source of SOURCE_FILES) {
    const profilingResult = buildProfilingResult(source.path, source.delimiter);
    const suggestion = await suggestMappingsFromProfiling({
      profilingResult,
      datasetName: source.file,
      sourceDataset: source.sourceDataset
    });
    const mappings = suggestion.field_mappings ?? suggestion.fieldMappings ?? [];
    const expectedByField = GT[`${source.dataset}/${source.file}`];

    for (const [rawField, expected] of Object.entries(expectedByField)) {
      const actual = mappings.find((mapping) => mapping.source_fields?.[0] === rawField);
      const result = classify(expected, actual);
      rows.push({
        dataset: source.dataset,
        file: source.file,
        raw_field: rawField,
        expected_target: expected[0],
        expected_transform: listify(expected[1]).join(" | "),
        expected_scope: expected[2] == null ? null : listify(expected[2]).join(" | "),
        actual_target: actual?.canonical_field ?? null,
        actual_transform: actual?.transform ?? null,
        actual_scope: actual?.entity_scope ?? null,
        mapper_status: actual?.status ?? null,
        confidence: actual?.confidence ?? 0,
        category: result.category,
        reason: result.reason,
        review_comment: actual?.review_comment ?? null
      });
    }
  }

  const summary = summarize(rows);
  const output = {
    evaluation_id: "mapping_accuracy_cold_start_v1",
    generated_at: new Date().toISOString(),
    unit_of_analysis: "file-qualified raw field",
    methodology: {
      exact: "Correct canonical target, transformation, and entity scope.",
      near_correct: "Correct or operationally related target, but transformation, entity scope, or semantic precision requires correction.",
      wrong: "Mapped to an incorrect canonical concept, or mapped when the field should be excluded.",
      unknown: "A field with a valid target was left unmapped, including storage targets missing from the selectable canonical registry.",
      correctly_excluded: "No valid canonical target exists and the mapper left the field unmapped.",
      denominator: "Accuracy rates use mappable fields only. Correct exclusions are reported separately.",
      execution_mode: "Cold-start deterministic mapper. Learned alias memory was not used."
    },
    summary,
    field_results: rows
  };

  const jsonPath = path.join(OUTPUT_DIR, "mapping_accuracy_evaluation.json");
  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2), "utf8");

  const lines = [
    "# Automatic Mapping Accuracy Evaluation",
    "",
    "Unit of analysis: file-qualified raw field. This avoids treating identically named fields such as `date` as semantically identical across source files.",
    "",
    "| Dataset | Total | Mappable | Exact | Near-correct | Wrong | Unknown | Correctly excluded | Exact accuracy | Usable rate |",
    "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|",
    ...summary.map((item) =>
      `| ${item.dataset} | ${item.total_fields} | ${item.mappable_fields} | ${item.exact} | ${item.near_correct} | ${item.wrong} | ${item.unknown} | ${item.correctly_excluded} | ${(item.exact_accuracy * 100).toFixed(2)}% | ${(item.usable_mapping_rate * 100).toFixed(2)}% |`
    ),
    "",
    "## Fields requiring correction",
    "",
    "| Dataset | File | Raw field | Expected | Actual | Category | Confidence | Reason |",
    "|---|---|---|---|---|---|---:|---|",
    ...rows
      .filter((row) => !["exact", "correctly_excluded"].includes(row.category))
      .map((row) =>
        `| ${row.dataset} | ${row.file} | ${row.raw_field} | ${row.expected_target} | ${row.actual_target ?? "unmapped"} | ${row.category} | ${Number(row.confidence).toFixed(2)} | ${row.reason} |`
      ),
    "",
    "## Interpretation",
    "",
    "Mapper confidence is not an accuracy measure. Accuracy is established by comparison with the manually defined field-level ground truth above. Near-correct mappings are operationally recoverable but still require user review or a rule correction."
  ];
  fs.writeFileSync(path.join(OUTPUT_DIR, "MAPPING_ACCURACY_REPORT.md"), lines.join("\n"), "utf8");

  process.stdout.write(JSON.stringify({ jsonPath, summary }, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
