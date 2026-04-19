import "dotenv/config";
import { runImportPipeline } from "../services/runImportPipeline.service.js";

const mappingConfig = {
  dataset_name: "custom_dataset_01",
  source_dataset: "CUSTOM",
  mapping_status: "confirmed",
  version: 1,
  confirmed_at: "2026-04-19T10:30:00Z",
  field_mappings: [
    {
      id: "map_001",
      source_fields: ["id_student"],
      canonical_field: "student_id",
      transform: "direct_copy",
      status: "confirmed",
      confidence: 1.0,
      entity_scope: "student"
    },
    {
      id: "map_002",
      source_fields: ["course_id"],
      canonical_field: "course_id",
      transform: "direct_copy",
      status: "confirmed",
      confidence: 1.0,
      entity_scope: "student"
    },
    {
      id: "map_003",
      source_fields: ["course_id"],
      canonical_field: "course_id",
      transform: "direct_copy",
      status: "confirmed",
      confidence: 1.0,
      entity_scope: "course"
    },
    {
      id: "map_004",
      source_fields: ["course_run"],
      canonical_field: "course_run",
      transform: "direct_copy",
      status: "confirmed",
      confidence: 0.98,
      entity_scope: "course"
    },
    {
      id: "map_005",
      source_fields: ["course_name"],
      canonical_field: "course_name",
      transform: "direct_copy",
      status: "confirmed",
      confidence: 0.97,
      entity_scope: "course"
    },
    {
      id: "map_006",
      source_fields: ["subject_area"],
      canonical_field: "subject_area",
      transform: "direct_copy",
      status: "confirmed",
      confidence: 0.96,
      entity_scope: "course"
    },
    {
      id: "map_007",
      source_fields: ["gender"],
      canonical_field: "gender",
      transform: "normalize_gender",
      status: "confirmed",
      confidence: 0.99,
      entity_scope: "student"
    },
    {
      id: "map_008",
      source_fields: ["score"],
      canonical_field: "score_normalized",
      transform: "cast_float",
      status: "confirmed",
      confidence: 0.95,
      entity_scope: "assessment"
    },
    {
      id: "map_009",
      source_fields: ["date_submitted"],
      canonical_field: "submission_day",
      transform: "cast_int",
      status: "confirmed",
      confidence: 0.95,
      entity_scope: "assessment"
    },
    {
      id: "map_010",
      source_fields: ["date_deadline"],
      canonical_field: "assessment_due_day",
      transform: "cast_int",
      status: "confirmed",
      confidence: 0.95,
      entity_scope: "assessment"
    },
    {
      id: "map_011",
      source_fields: ["assessment_id"],
      canonical_field: "assessment_id",
      transform: "direct_copy",
      status: "confirmed",
      confidence: 1.0,
      entity_scope: "assessment"
    },
    {
      id: "map_012",
      source_fields: ["assessment_order"],
      canonical_field: "assessment_order",
      transform: "cast_int",
      status: "confirmed",
      confidence: 0.95,
      entity_scope: "assessment"
    },
    {
      id: "map_013",
      source_fields: ["assessment_weight_pct"],
      canonical_field: "assessment_weight_pct",
      transform: "cast_float",
      status: "confirmed",
      confidence: 0.95,
      entity_scope: "assessment"
    },
    {
      id: "map_014",
      source_fields: ["id_student"],
      canonical_field: "student_id",
      transform: "direct_copy",
      status: "confirmed",
      confidence: 1.0,
      entity_scope: "assessment"
    },
    {
      id: "map_015",
      source_fields: ["course_id"],
      canonical_field: "course_id",
      transform: "direct_copy",
      status: "confirmed",
      confidence: 1.0,
      entity_scope: "assessment"
    },
    {
      id: "map_016",
      source_fields: ["clicks"],
      canonical_field: "engagement_count",
      transform: "cast_int",
      status: "confirmed",
      confidence: 0.95,
      entity_scope: "engagement_event"
    },
    {
      id: "map_017",
      source_fields: ["event_day"],
      canonical_field: "event_day",
      transform: "cast_int",
      status: "confirmed",
      confidence: 0.95,
      entity_scope: "engagement_event"
    },
    {
      id: "map_018",
      source_fields: ["resource_id"],
      canonical_field: "resource_id",
      transform: "direct_copy",
      status: "confirmed",
      confidence: 0.95,
      entity_scope: "engagement_event"
    },
    {
      id: "map_019",
      source_fields: ["resource_type"],
      canonical_field: "resource_type",
      transform: "direct_copy",
      status: "confirmed",
      confidence: 0.95,
      entity_scope: "engagement_event"
    },
    {
      id: "map_020",
      source_fields: ["id_student"],
      canonical_field: "student_id",
      transform: "direct_copy",
      status: "confirmed",
      confidence: 1.0,
      entity_scope: "engagement_event"
    },
    {
      id: "map_021",
      source_fields: ["course_id"],
      canonical_field: "course_id",
      transform: "direct_copy",
      status: "confirmed",
      confidence: 1.0,
      entity_scope: "engagement_event"
    }
  ]
};

const profilingResult = {
  columns: [
    { raw_column: "id_student", detected_type: "numeric", sample_values: ["1001", "1002"], null_ratio: 0 },
    { raw_column: "course_id", detected_type: "string", sample_values: ["MATH101"], null_ratio: 0 },
    { raw_column: "course_run", detected_type: "string", sample_values: ["2025A"], null_ratio: 0 },
    { raw_column: "course_name", detected_type: "string", sample_values: ["Mathematics"], null_ratio: 0 },
    { raw_column: "subject_area", detected_type: "string", sample_values: ["STEM"], null_ratio: 0.33 },
    { raw_column: "gender", detected_type: "string", sample_values: ["M", "F"], null_ratio: 0 },
    { raw_column: "score", detected_type: "numeric", sample_values: ["65", "72", "80"], null_ratio: 0 },
    { raw_column: "date_submitted", detected_type: "numeric", sample_values: ["12", "15", "18"], null_ratio: 0 },
    { raw_column: "date_deadline", detected_type: "numeric", sample_values: ["10", "14", "16"], null_ratio: 0 },
    { raw_column: "assessment_id", detected_type: "string", sample_values: ["A1", "A2", "A3"], null_ratio: 0 },
    { raw_column: "assessment_order", detected_type: "numeric", sample_values: ["1", "2", "3"], null_ratio: 0 },
    { raw_column: "assessment_weight_pct", detected_type: "numeric", sample_values: ["20", "30", "50"], null_ratio: 0 },
    { raw_column: "clicks", detected_type: "numeric", sample_values: ["8", "6", "10"], null_ratio: 0 },
    { raw_column: "event_day", detected_type: "numeric", sample_values: ["7", "14", "21"], null_ratio: 0 },
    { raw_column: "resource_id", detected_type: "string", sample_values: ["R1", "R2", "R3"], null_ratio: 0 },
    { raw_column: "resource_type", detected_type: "string", sample_values: ["forumng", "quiz", "resource"], null_ratio: 0 }
  ],
  sample_rows: []
};

const rawRows = [
  {
    id_student: "1001",
    course_id: "MATH101",
    course_run: "2025A",
    course_name: "Mathematics",
    subject_area: "",
    gender: "M",
    score: "65",
    date_submitted: "12",
    date_deadline: "10",
    assessment_id: "A1",
    assessment_order: "1",
    assessment_weight_pct: "20",
    clicks: "8",
    event_day: "7",
    resource_id: "R1",
    resource_type: "forumng"
  },
  {
    id_student: "1001",
    course_id: "MATH101",
    course_run: "2025A",
    course_name: "",
    subject_area: "STEM",
    gender: "M",
    score: "72",
    date_submitted: "15",
    date_deadline: "14",
    assessment_id: "A2",
    assessment_order: "2",
    assessment_weight_pct: "30",
    clicks: "6",
    event_day: "14",
    resource_id: "R2",
    resource_type: "quiz"
  },
  {
    id_student: "1002",
    course_id: "MATH101",
    course_run: "2025A",
    course_name: "Mathematics",
    subject_area: "STEM",
    gender: "F",
    score: "80",
    date_submitted: "18",
    date_deadline: "16",
    assessment_id: "A3",
    assessment_order: "3",
    assessment_weight_pct: "50",
    clicks: "10",
    event_day: "21",
    resource_id: "R3",
    resource_type: "resource"
  }
];

async function run() {
  try {
    console.log("DATABASE_URL loaded:", !!process.env.DATABASE_URL);

    const result = await runImportPipeline({
      mappingConfig,
      profilingResult,
      rawRows,
      options: {
        saveFlatOutput: true,
        replaceIfExists: true,
        importBatchId: "test_batch_001",
        chunkSize: 200,
        allowAutoConfirmMapping: false
      }
    });

    console.log("\n=== PIPELINE RESULT SUMMARY ===");
    console.log(JSON.stringify(result.summary, null, 2));

    console.log("\n=== SAVE RESULT ===");
    console.log(JSON.stringify(result.saveResult, null, 2));

    console.log("\n✅ Full import pipeline completed successfully.");
  } catch (error) {
    console.error("\n❌ Full import pipeline failed.");
    console.error(error);

    if (error.cause) {
      console.error("\n=== ROOT CAUSE ===");
      console.error(error.cause);
    }

    if (error.cause?.validationResult) {
      console.error("\n=== VALIDATION DETAILS ===");
      console.error(JSON.stringify(error.cause.validationResult, null, 2));
    }
  }
}

run();