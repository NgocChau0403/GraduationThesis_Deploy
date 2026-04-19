export const CANONICAL_FIELDS = [
  // =====================================================
  // STUDENT
  // =====================================================
  {
    name: "student_id",
    required: true,
    type: "string",
    group: "student",
    origin: "raw",
    description: "Canonical unique student identifier."
  },
  {
    name: "higher_education_intent_flag",
    required: false,
    type: "boolean",
    group: "student",
    origin: "raw",
    description: "Whether the student intends to pursue higher education."
  },
  {
    name: "internet_access_flag",
    required: false,
    type: "boolean",
    group: "student",
    origin: "raw",
    description: "Whether the student has internet access."
  },
  {
    name: "school_support_flag",
    required: false,
    type: "boolean",
    group: "student",
    origin: "raw",
    description: "Whether the student receives school educational support."
  },
  {
    name: "family_support_flag",
    required: false,
    type: "boolean",
    group: "student",
    origin: "raw",
    description: "Whether the student receives family educational support."
  },
  {
    name: "romantic_relationship_flag",
    required: false,
    type: "boolean",
    group: "student",
    origin: "raw",
    description: "Whether the student is in a romantic relationship."
  },
  {
    name: "extracurricular_flag",
    required: false,
    type: "boolean",
    group: "student",
    origin: "raw",
    description: "Whether the student participates in extracurricular activities."
  },
  {
    name: "paid_class_flag",
    required: false,
    type: "boolean",
    group: "student",
    origin: "raw",
    description: "Whether the student attends paid extra classes."
  },
  {
    name: "previous_attempt_count",
    required: false,
    type: "int",
    group: "student",
    origin: "normalized",
    description: "Number of previous attempts before the current enrollment."
  },
  {
    name: "at_risk_score",
    required: false,
    type: "int",
    group: "student",
    origin: "derived",
    description: "Composite at-risk score on a 0-5 scale."
  },
  {
    name: "at_risk_label",
    required: false,
    type: "string",
    group: "student",
    origin: "derived",
    description: 'Categorical at-risk label such as "low", "medium", or "high".'
  },

  // =====================================================
  // COURSE
  // =====================================================
  {
    name: "course_id",
    required: true,
    type: "string",
    group: "course",
    origin: "raw",
    description: "Canonical course identifier."
  },
  {
    name: "course_name",
    required: false,
    type: "string",
    group: "course",
    origin: "normalized",
    description: "Human-readable course name."
  },
  {
    name: "course_run",
    required: false,
    type: "string",
    group: "course",
    origin: "raw",
    description: "Course presentation, run, or offering identifier."
  },
  {
    name: "subject_area",
    required: false,
    type: "string",
    group: "course",
    origin: "normalized",
    description: "Subject area or academic domain."
  },
  {
    name: "course_duration_days",
    required: false,
    type: "int",
    group: "course",
    origin: "derived",
    description: "Total duration of the course in days."
  },
  {
    name: "study_load_credits",
    required: false,
    type: "int",
    group: "course",
    origin: "raw",
    description: "Number of credits taken or associated with the student-course enrollment."
  },

  // =====================================================
  // ASSESSMENT
  // =====================================================
  {
    name: "assessment_result_id",
    required: false,
    type: "string",
    group: "assessment",
    origin: "derived",
    description: "Unique identifier for one student assessment result row."
  },
  {
    name: "assessment_id",
    required: false,
    type: "string",
    group: "assessment",
    origin: "normalized",
    description: "Canonical assessment identifier."
  },
  {
    name: "assessment_name",
    required: false,
    type: "string",
    group: "assessment",
    origin: "normalized",
    description: "Assessment name such as G1, G2, G3, TMA, CMA, or Exam."
  },
  {
    name: "assessment_type",
    required: false,
    type: "string",
    group: "assessment",
    origin: "normalized",
    description: "Assessment type category."
  },
  {
    name: "assessment_order",
    required: false,
    type: "int",
    group: "assessment",
    origin: "normalized",
    description: "Relative order of assessment within one course."
  },
  {
    name: "assessment_weight_pct",
    required: false,
    type: "float",
    group: "assessment",
    origin: "raw",
    description: "Assessment weight as a percentage."
  },
  {
    name: "score_normalized",
    required: false,
    type: "float",
    group: "assessment",
    origin: "normalized",
    description: "Normalized assessment score on a common comparable scale."
  },
  {
    name: "pass_flag",
    required: false,
    type: "boolean",
    group: "assessment",
    origin: "derived",
    description: "Whether the student passed the assessment."
  },
  {
    name: "is_banked",
    required: false,
    type: "boolean",
    group: "assessment",
    origin: "raw",
    description: "Whether the assessment result is banked from a previous attempt."
  },
  {
    name: "is_final_assessment",
    required: false,
    type: "boolean",
    group: "assessment",
    origin: "derived",
    description: "Whether this assessment is the final assessment in the course."
  },
  {
    name: "avg_score",
    required: false,
    type: "float",
    group: "assessment",
    origin: "derived",
    description: "Average student score on a unified 0-100 scale."
  },
  {
    name: "performance_trend",
    required: false,
    type: "float",
    group: "assessment",
    origin: "derived",
    description: "Slope-like trend of student performance across ordered assessments."
  },
  {
    name: "score_consistency",
    required: false,
    type: "float",
    group: "assessment",
    origin: "derived",
    description: "Consistency score of assessment performance, scaled between 0 and 1."
  },

  // =====================================================
  // ACTIVITY
  // =====================================================
  {
    name: "resource_id",
    required: false,
    type: "string",
    group: "activity",
    origin: "raw",
    description: "Resource or activity identifier."
  },
  {
    name: "resource_type",
    required: false,
    type: "string",
    group: "activity",
    origin: "normalized",
    description: "Canonical resource type."
  },

  // =====================================================
  // ENGAGEMENT
  // =====================================================
  {
    name: "engagement_event_id",
    required: false,
    type: "string",
    group: "engagement",
    origin: "derived",
    description: "Unique identifier for one engagement event row."
  },
  {
    name: "engagement_count",
    required: false,
    type: "int",
    group: "engagement",
    origin: "raw",
    description: "Count of engagement actions for this row."
  },
  {
    name: "total_engagement_count",
    required: false,
    type: "int",
    group: "engagement",
    origin: "derived",
    description: "Total engagement count aggregated for one student-course pair."
  },
  {
    name: "active_day_count",
    required: false,
    type: "int",
    group: "engagement",
    origin: "derived",
    description: "Number of distinct active days aggregated for one student-course pair."
  },
  {
    name: "absence_count",
    required: false,
    type: "int",
    group: "engagement",
    origin: "derived",
    description: "Absence count aggregated for one student-course pair."
  },
  {
    name: "study_effort_level",
    required: false,
    type: "string",
    group: "engagement",
    origin: "derived",
    description: "Standardized study effort level such as low, medium, or high."
  },
  {
    name: "consistency_level",
    required: false,
    type: "string",
    group: "engagement",
    origin: "derived",
    description: "Standardized learning consistency level."
  },
  {
    name: "absences_rate",
    required: false,
    type: "float",
    group: "engagement",
    origin: "derived",
    description: "Absence rate scaled between 0 and 1."
  },
  {
    name: "punctuality_rate",
    required: false,
    type: "float",
    group: "engagement",
    origin: "derived",
    description: "Submission or attendance punctuality rate scaled between 0 and 1."
  },
  {
    name: "engagement_score",
    required: false,
    type: "float",
    group: "engagement",
    origin: "derived",
    description: "Unified engagement score scaled between 0 and 1."
  },
  {
    name: "vle_diversity_score",
    required: false,
    type: "float",
    group: "engagement",
    origin: "derived",
    description: "Resource diversity score based on distinct resource types used."
  },
  {
    name: "forum_engagement_rate",
    required: false,
    type: "float",
    group: "engagement",
    origin: "derived",
    description: "Share of engagement activity attributed to forum resources."
  },
  {
    name: "quiz_engagement_rate",
    required: false,
    type: "float",
    group: "engagement",
    origin: "derived",
    description: "Share of engagement activity attributed to quiz resources."
  },
  {
    name: "resource_engagement_rate",
    required: false,
    type: "float",
    group: "engagement",
    origin: "derived",
    description: "Share of engagement activity attributed to learning resource content."
  },
  {
    name: "weekly_engagement_drop",
    required: false,
    type: "float",
    group: "engagement",
    origin: "derived",
    description: "Most negative weekly engagement slope or drop ratio."
  },
  {
    name: "early_warning_week",
    required: false,
    type: "int",
    group: "engagement",
    origin: "derived",
    description: "First week where a strong engagement drop is detected."
  },

  // =====================================================
  // TIME
  // =====================================================
  {
    name: "enrollment_start_day",
    required: false,
    type: "int",
    group: "time",
    origin: "normalized",
    description: "Normalized enrollment start day for the student within the course."
  },
  {
    name: "enrollment_end_day",
    required: false,
    type: "int",
    group: "time",
    origin: "normalized",
    description: "Normalized enrollment end day for the student within the course."
  },
  {
    name: "event_day",
    required: false,
    type: "int",
    group: "time",
    origin: "raw",
    description: "Relative event day in the course timeline."
  },
  {
    name: "submission_day",
    required: false,
    type: "int",
    group: "time",
    origin: "raw",
    description: "Relative submission day in the course timeline."
  },
  {
    name: "assessment_due_day",
    required: false,
    type: "int",
    group: "time",
    origin: "raw",
    description: "Relative due day of the assessment in the course timeline."
  },
  {
    name: "submission_delay_days",
    required: false,
    type: "int",
    group: "time",
    origin: "derived",
    description: "Number of days between submission day and due day."
  },
  {
    name: "submission_delay_avg",
    required: false,
    type: "float",
    group: "time",
    origin: "derived",
    description: "Average positive submission delay across assessments."
  },
  {
    name: "registration_lead_time",
    required: false,
    type: "int",
    group: "time",
    origin: "derived",
    description: "Lead time between early registration and course start reference."
  },
  {
    name: "withdrew_early",
    required: false,
    type: "int",
    group: "time",
    origin: "derived",
    description: "Binary flag indicating whether a student withdrew early."
  },

  // =====================================================
  // DEMOGRAPHIC
  // =====================================================
  {
    name: "gender",
    required: false,
    type: "string",
    group: "demographic",
    origin: "raw",
    description: "Student gender in canonical form."
  },
  {
    name: "age_group",
    required: false,
    type: "string",
    group: "demographic",
    origin: "normalized",
    description: "Student age group in canonical band format."
  },
  {
    name: "region",
    required: false,
    type: "string",
    group: "demographic",
    origin: "raw",
    description: "Geographic region associated with the student."
  },
  {
    name: "residence_area",
    required: false,
    type: "string",
    group: "demographic",
    origin: "normalized",
    description: "Residence area type such as urban or rural."
  },
  {
    name: "highest_education",
    required: false,
    type: "string",
    group: "demographic",
    origin: "raw",
    description: "Highest education level before current course."
  },
  {
    name: "socioeconomic_band",
    required: false,
    type: "string",
    group: "demographic",
    origin: "normalized",
    description: "Socioeconomic band or IMD-like grouped indicator."
  },
  {
    name: "imd_score_numeric",
    required: false,
    type: "float",
    group: "demographic",
    origin: "normalized",
    description: "Numeric deprivation score if available."
  },
  {
    name: "disability_flag",
    required: false,
    type: "boolean",
    group: "demographic",
    origin: "raw",
    description: "Whether the student has declared a disability."
  },
  {
    name: "parent_cohabitation_status",
    required: false,
    type: "string",
    group: "demographic",
    origin: "normalized",
    description: "Parent cohabitation status."
  },
  {
    name: "mother_education_level",
    required: false,
    type: "string",
    group: "demographic",
    origin: "normalized",
    description: "Mother education level in canonical format."
  },
  {
    name: "father_education_level",
    required: false,
    type: "string",
    group: "demographic",
    origin: "normalized",
    description: "Father education level in canonical format."
  },
  {
    name: "mother_job",
    required: false,
    type: "string",
    group: "demographic",
    origin: "raw",
    description: "Mother occupation category."
  },
  {
    name: "father_job",
    required: false,
    type: "string",
    group: "demographic",
    origin: "raw",
    description: "Father occupation category."
  },
  {
    name: "guardian_type",
    required: false,
    type: "string",
    group: "demographic",
    origin: "raw",
    description: "Student guardian category."
  },
  {
    name: "travel_time",
    required: false,
    type: "int",
    group: "demographic",
    origin: "raw",
    description: "Travel time level or category."
  },
  {
    name: "free_time",
    required: false,
    type: "int",
    group: "demographic",
    origin: "raw",
    description: "Free time level."
  },
  {
    name: "go_out_freq",
    required: false,
    type: "int",
    group: "demographic",
    origin: "raw",
    description: "Frequency of going out."
  },
  {
    name: "alcohol_weekday",
    required: false,
    type: "int",
    group: "demographic",
    origin: "raw",
    description: "Weekday alcohol consumption level."
  },
  {
    name: "alcohol_weekend",
    required: false,
    type: "int",
    group: "demographic",
    origin: "raw",
    description: "Weekend alcohol consumption level."
  },
  {
    name: "health_status",
    required: false,
    type: "int",
    group: "demographic",
    origin: "raw",
    description: "Self-reported health status level."
  },
  {
    name: "family_relation",
    required: false,
    type: "int",
    group: "demographic",
    origin: "raw",
    description: "Quality of family relationship level."
  },
  {
    name: "lifestyle_risk_score",
    required: false,
    type: "float",
    group: "demographic",
    origin: "derived",
    description: "Lifestyle-related risk score scaled between 0 and 1."
  },
  {
    name: "support_score",
    required: false,
    type: "float",
    group: "demographic",
    origin: "derived",
    description: "Support availability score scaled between 0 and 1."
  },
  {
    name: "social_balance_score",
    required: false,
    type: "float",
    group: "demographic",
    origin: "derived",
    description: "Balance score between free time, social activity, and risky behavior."
  },
  {
    name: "family_stability_score",
    required: false,
    type: "float",
    group: "demographic",
    origin: "derived",
    description: "Family stability score based on relationship quality and support context."
  },
  {
    name: "disadvantage_score",
    required: false,
    type: "float",
    group: "demographic",
    origin: "derived",
    description: "Socioeconomic and educational disadvantage score scaled between 0 and 1."
  },

  // =====================================================
  // OUTCOME / SUMMARY
  // =====================================================
  {
    name: "final_outcome",
    required: false,
    type: "string",
    group: "student",
    origin: "normalized",
    description: "Final course outcome such as pass, fail, distinction, or withdrawn."
  },
  {
    name: "source_dataset",
    required: true,
    type: "string",
    group: "student",
    origin: "raw",
    description: "Source dataset name, such as UCI or OULAD."
  }
];