export const FLAT_TABLE_FIELD_MAP = {
  flat_enrollment_master: [
    // =========================
    // Identity / meta
    // =========================
    "student_id",
    "course_id",
    "source_dataset",

    // =========================
    // Demographic / background
    // =========================
    "gender",
    "age_group",
    "region",
    "residence_area",
    "highest_education",
    "socioeconomic_band",
    "imd_score_numeric",
    "disability_flag",

    // =========================
    // Student support / profile
    // =========================
    "higher_education_intent_flag",
    "internet_access_flag",
    "school_support_flag",
    "family_support_flag",
    "has_romantic",
    "has_extracurricular",
    "has_paid_class",
    "previous_attempt_count",

    // =========================
    // Family / lifestyle context
    // =========================
    "mother_education_level",
    "father_education_level",
    "mother_job",
    "father_job",
    "guardian_type",
    "family_relation",
    "travel_time",
    "free_time",
    "go_out_freq",
    "alcohol_weekday",
    "alcohol_weekend",
    "health_status",
    "parent_cohabitation_status",

    // =========================
    // Course context
    // =========================
    "course_name",
    "subject_area",
    "course_run",
    "course_duration_days",
    "study_load_credits",

    // =========================
    // Outcome / enrollment
    // =========================
    "final_outcome",
    "enrollment_start_day",
    "enrollment_end_day",

    // =========================
    // Student-level engagement summary
    // =========================
    "total_engagement_count",
    "active_day_count",
    "absence_count",
    "study_effort_level",
    "consistency_level",

    // =========================
    // Performance features
    // =========================
    "avg_score",
    "performance_trend",
    "score_consistency",

    // =========================
    // Engagement features
    // =========================
    "absences_rate",
    "punctuality_rate",
    "engagement_score",
    "vle_diversity_score",
    "forum_engagement_rate",
    "quiz_engagement_rate",
    "resource_engagement_rate",
    "weekly_engagement_drop",
    "early_warning_week",

    // =========================
    // Timeliness features
    // =========================
    "submission_delay_avg",
    "registration_lead_time",
    "withdrew_early",

    // =========================
    // At-risk features
    // =========================
    "at_risk_score",
    "at_risk_label",

    // =========================
    // Lifestyle features
    // =========================
    "lifestyle_risk_score",
    "support_score",
    "social_balance_score",
    "family_stability_score",

    // =========================
    // Socioeconomic features
    // =========================
    "disadvantage_score"
  ],

  flat_assessment_result: [
    // =========================
    // Identity / meta
    // =========================
    "assessment_result_id",
    "student_id",
    "course_id",
    "assessment_order",
    "source_dataset",

    // =========================
    // Assessment identity
    // =========================
    "assessment_id",
    "assessment_name",
    "assessment_type",
    "assessment_due_day",
    "assessment_weight_pct",
    "is_final_assessment",
    "is_banked",

    // =========================
    // Assessment values / row-level features
    // =========================
    "score_normalized",
    "submission_day",
    "submission_delay_days",
    "pass_flag",

    // =========================
    // Student / outcome context
    // =========================
    "final_outcome",
    "gender",
    "age_group",

    // =========================
    // Course context
    // =========================
    "course_name",
    "course_run",
    "subject_area"
  ]
};
