export const CANONICAL_FIELD_OPTIONS = [
  "student_id",
  "course_id",
  "source_dataset",
  "gender",
  "age_group",
  "region",
  "residence_area",
  "highest_education",
  "socioeconomic_band",
  "imd_score_numeric",
  "disability_flag",
  "higher_education_intent_flag",
  "internet_access_flag",
  "school_support_flag",
  "family_support_flag",
  "romantic_relationship_flag",
  "extracurricular_flag",
  "paid_class_flag",
  "previous_attempt_count",
  "mother_education_level",
  "father_education_level",
  "mother_job",
  "father_job",
  "guardian_type",
  "travel_time",
  "free_time",
  "go_out_freq",
  "alcohol_weekday",
  "alcohol_weekend",
  "health_status",
  "family_relation",
  "parent_cohabitation_status",
  "score_raw",
  "score_normalized",
  "assessment_name",
  "assessment_type",
  "submission_date",
  "due_date",
  "click_count",
  "engagement_count",
  "absence_count",
  "activity_type"
];

export const TRANSFORM_OPTIONS = [
  "direct_copy",
  "ignore",
  "cast_int",
  "cast_float",
  "cast_boolean",
  "normalize_gender",
  "normalize_score",
  "convert_date_to_relative_day"
];

export const ENTITY_SCOPE_OPTIONS = [
  "student",
  "course",
  "assessment",
  "engagement_event",
  "system"
];

export const STATUS_OPTIONS = [
  "confirmed",
  "needs_review",
  "ignored"
];