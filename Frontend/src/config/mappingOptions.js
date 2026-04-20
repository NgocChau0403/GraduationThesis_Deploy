/**
 * CANONICAL_FIELD_OPTIONS: 
 * Các trường dữ liệu chuẩn trong hệ thống Smart Learning.
 * Giữ nguyên snake_case để lưu DB, nhưng khi hiển thị ở UI dùng CSS (capitalize) hoặc .replace(/_/g, ' ')
 */
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
].sort(); // Sắp xếp A-Z để người dùng dễ tìm trong dropdown

/**
 * TRANSFORM_OPTIONS: 
 * Các hàm biến đổi dữ liệu (Data Transformation)
 */
export const TRANSFORM_OPTIONS = [
  "direct_copy",
  "ignore",
  "cast_int",
  "cast_float",
  "cast_boolean",
  "normalize_gender",
  "normalize_score",
  "convert_date_to_relative_day",
  "trim_whitespace",  // dữ liệu thô hay có khoảng trắng thừa
  "lowercase",        // Chuẩn hóa chữ thường
  "uppercase"         // Chuột hóa chữ hoa
];

/**
 * ENTITY_SCOPE_OPTIONS: 
 * Định nghĩa thực thể mà dữ liệu này thuộc về
 */
export const ENTITY_SCOPE_OPTIONS = [
  "student",
  "course",
  "assessment",
  "engagement_event",
  "demographic",     // Thêm để phân loại các trường như region, age...
  "system"
];

/**
 * STATUS_OPTIONS: 
 * Trạng thái của một dòng mapping
 */
export const STATUS_OPTIONS = [
  "confirmed",
  "needs_review",
  "ignored",
  "suggested"
];