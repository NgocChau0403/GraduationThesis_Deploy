import prisma from "../lib/prisma.js";

// ==========================================
// MAIN SERVICE
// ==========================================

export async function materializeFlatTables({
  batchId,
  replaceIfExists = true
}) {
  if (!batchId) {
    throw new Error("batchId is required for SQL materialization.");
  }

  await prisma.$transaction(async (tx) => {
    // 1. Cleanup old data if replaceIfExists
    if (replaceIfExists) {
      await tx.$executeRaw`DELETE FROM flat_enrollment_master WHERE import_batch_id = ${batchId}`;
      await tx.$executeRaw`DELETE FROM flat_assessment_result WHERE import_batch_id = ${batchId}`;
    }

    // 2. Materialize flat_enrollment_master
    await tx.$executeRaw`
      INSERT INTO flat_enrollment_master (
        import_batch_id, student_id, course_id, source_dataset,
        
        -- Demographic
        gender, age_group, region, residence_area, highest_education, 
        socioeconomic_band, imd_score_numeric, disability_flag,
        
        -- Support flags
        higher_education_intent_flag, internet_access_flag, 
        school_support_flag, family_support_flag, has_romantic, 
        has_extracurricular, has_paid_class,
        
        -- Family / lifestyle
        mother_education_level, father_education_level, mother_job, 
        father_job, guardian_type, family_relation, travel_time, 
        free_time, go_out_freq, alcohol_weekday, alcohol_weekend, 
        health_status, parent_cohabitation_status,
        
        -- Course context
        course_name, subject_area, course_run, course_duration_days, 
        study_load_credits,
        
        -- Outcome / enrollment
        final_outcome, previous_attempt_count, enrollment_start_day, 
        enrollment_end_day,
        
        -- Engagement summary
        total_engagement_count, active_day_count, absence_count, 
        study_effort_level, consistency_level,
        
        -- Performance features
        avg_score, performance_trend, score_consistency,
        
        -- Engagement features
        absences_rate, punctuality_rate, engagement_score, 
        vle_diversity_score, forum_engagement_rate, quiz_engagement_rate, 
        resource_engagement_rate, weekly_engagement_drop, early_warning_week,
        
        -- Timeliness features
        submission_delay_avg, registration_lead_time, withdrew_early,
        
        -- At-risk features
        at_risk_score, at_risk_label,
        
        -- Lifestyle features
        lifestyle_risk_score, support_score, social_balance_score, 
        family_stability_score,
        
        -- Socioeconomic features
        disadvantage_score,
        
        created_at
      )
      SELECT 
        e.batch_id, e.student_id, c.course_id, e.source_dataset,
        
        -- Demographic
        s.gender, s.age_group, s.region, s.residence_area, s.highest_education, 
        s.socioeconomic_band, s.imd_score_numeric, s.disability_flag,
        
        -- Support flags
        s.higher_education_intent_flag, s.internet_access_flag, 
        s.school_support_flag, s.family_support_flag, s.has_romantic, 
        s.has_extracurricular, s.has_paid_class,
        
        -- Family / lifestyle
        s.mother_education_level, s.father_education_level, s.mother_job, 
        s.father_job, s.guardian_type, s.family_relation, s.travel_time, 
        s.free_time, s.go_out_freq, s.alcohol_weekday, s.alcohol_weekend, 
        s.health_status, s.parent_cohabitation_status,
        
        -- Course context
        co.course_name, co.subject_area, c.class_run, c.duration_days, 
        e.study_load_credits,
        
        -- Outcome / enrollment
        e.final_outcome, e.previous_attempt_count, e.enrollment_start_day, 
        e.enrollment_end_day,
        
        -- Engagement summary
        ef.total_engagement_count, ef.active_day_count, e.absences, 
        ef.study_effort_level, ef.consistency_level,
        
        -- Performance features
        ef.avg_score, ef.performance_trend, ef.score_consistency,
        
        -- Engagement features
        ef.absences_rate, ef.punctuality_rate, ef.engagement_score, 
        ef.vle_diversity_score, ef.forum_engagement_rate, ef.quiz_engagement_rate, 
        ef.resource_engagement_rate, ef.weekly_engagement_drop, ef.early_warning_week,
        
        -- Timeliness features
        ef.submission_delay_avg, ef.registration_lead_time, ef.withdrew_early,
        
        -- At-risk features
        ef.at_risk_score, ef.at_risk_label,
        
        -- Lifestyle features
        ef.lifestyle_risk_score, ef.support_score, ef.social_balance_score, 
        ef.family_stability_score,
        
        -- Socioeconomic features
        ef.disadvantage_score,
        
        NOW()
      FROM enrollment e
      JOIN student s ON e.student_id = s.student_id
      JOIN class c ON e.class_id = c.class_id
      JOIN course co ON c.course_id = co.course_id
      LEFT JOIN enrollment_features ef ON e.enrollment_id = ef.enrollment_id
      WHERE e.batch_id = ${batchId}
    `;

    // 3. Materialize flat_assessment_result
    await tx.$executeRaw`
      INSERT INTO flat_assessment_result (
        import_batch_id, assessment_result_id, student_id, course_id, 
        assessment_order, source_dataset,
        
        -- Assessment identity
        assessment_id, assessment_name, assessment_type, assessment_due_day, 
        assessment_weight_pct, is_final_assessment, is_banked,
        
        -- Assessment values
        score_normalized, submission_day, submission_delay_days, pass_flag,
        
        -- Context
        final_outcome, gender, age_group, course_name, course_run, subject_area,
        
        created_at
      )
      SELECT 
        er.batch_id, er.result_id, er.student_id, c.course_id, 
        a.assessment_order, er.source_dataset,
        
        -- Assessment identity
        a.assessment_id, a.assessment_name, a.assessment_type, a.due_day, 
        a.weight_pct, a.is_final_assessment, er.is_banked,
        
        -- Assessment values
        er.score_normalized, er.submission_day, er.submission_delay_days, er.pass_flag,
        
        -- Context
        e.final_outcome, s.gender, s.age_group, co.course_name, c.class_run, co.subject_area,
        
        NOW()
      FROM exam_result er
      JOIN assessment a ON er.assessment_id = a.assessment_id
      JOIN student s ON er.student_id = s.student_id
      JOIN enrollment e ON er.enrollment_id = e.enrollment_id
      JOIN class c ON a.class_id = c.class_id
      JOIN course co ON c.course_id = co.course_id
      WHERE er.batch_id = ${batchId}
    `;
  });

  return {
    success: true,
    batch_id: batchId,
    summary: {
      materialized: true,
      tables: ["flat_enrollment_master", "flat_assessment_result"]
    }
  };
}
