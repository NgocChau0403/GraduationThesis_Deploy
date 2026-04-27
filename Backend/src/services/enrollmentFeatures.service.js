import { FEATURE_RULES } from "../config/canonicalFeatureRules.js";
import { normalizeText } from "../utils/textUtils.js";
import { surrogateKeyGenerators } from "../config/surrogateKey.js";

// ==========================================
// HELPERS
// ==========================================

function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function toBoolean(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "boolean") return value;
  const normalized = normalizeText(value);
  if (["true", "1", "yes", "y"].includes(normalized)) return true;
  if (["false", "0", "no", "n"].includes(normalized)) return false;
  return null;
}

function firstNonNull(...values) {
  for (const value of values) {
    if (value !== null && value !== undefined && value !== "") {
      return value;
    }
  }
  return null;
}

function mean(values) {
  const clean = values.filter((v) => v !== null && v !== undefined && !Number.isNaN(v));
  if (clean.length === 0) return null;
  return clean.reduce((sum, value) => sum + value, 0) / clean.length;
}

function sumNumbers(values) {
  const clean = values.filter((v) => v !== null && v !== undefined && !Number.isNaN(v));
  if (clean.length === 0) return 0;
  return clean.reduce((sum, value) => sum + value, 0);
}

function standardDeviation(values) {
  const clean = values.filter((v) => v !== null && v !== undefined && !Number.isNaN(v));
  if (clean.length === 0) return null;
  if (clean.length === 1) return 0;
  const avg = mean(clean);
  const variance = clean.reduce((sum, value) => sum + (value - avg) ** 2, 0) / clean.length;
  return Math.sqrt(variance);
}

function normalize01(value, min, max) {
  const numericValue = toNumber(value);
  if (numericValue === null) return null;
  if (max === min) return 0;
  const normalized = (numericValue - min) / (max - min);
  return Math.max(0, Math.min(1, normalized));
}

function safeDivide(numerator, denominator) {
  const n = toNumber(numerator);
  const d = toNumber(denominator);
  if (n === null || d === null || d === 0) return null;
  return n / d;
}

function linearSlope(points) {
  const clean = points.filter(p => p && toNumber(p.x) !== null && toNumber(p.y) !== null).map(p => ({ x: toNumber(p.x), y: toNumber(p.y) }));
  if (clean.length < 2) return null;
  const n = clean.length;
  const sumX = clean.reduce((sum, p) => sum + p.x, 0);
  const sumY = clean.reduce((sum, p) => sum + p.y, 0);
  const sumXY = clean.reduce((sum, p) => sum + p.x * p.y, 0);
  const sumXX = clean.reduce((sum, p) => sum + p.x * p.x, 0);
  const denominator = n * sumXX - sumX * sumX;
  if (denominator === 0) return null;
  return (n * sumXY - sumX * sumY) / denominator;
}

function weightedMean(items, valueKey, weightKey) {
  let weightedSum = 0;
  let totalWeight = 0;
  for (const item of items) {
    const value = toNumber(item?.[valueKey]);
    const weight = toNumber(item?.[weightKey]);
    if (value === null) continue;
    if (weight === null) {
      weightedSum += value;
      totalWeight += 1;
      continue;
    }
    weightedSum += value * weight;
    totalWeight += weight;
  }
  if (totalWeight === 0) return null;
  return weightedSum / totalWeight;
}

function countDistinct(values) {
  const filtered = values.filter((v) => v !== null && v !== undefined && v !== "");
  return new Set(filtered).size;
}

function weekNumberFromEventDay(eventDay) {
  const day = toNumber(eventDay);
  if (day === null) return null;
  return Math.floor(day / 7) + 1;
}

function hasNoFormalEducation(value) {
  const normalized = normalizeText(value);
  return FEATURE_RULES.education_levels.no_formal_values.includes(normalized);
}

// ==========================================
// FEATURE COMPUTATION
// ==========================================

function computeAssessmentFeatures(examResults, assessmentsMap) {
  // Join exam results with their assessment definitions
  const joinedRows = examResults.map(er => {
    const assessment = assessmentsMap.get(er.assessment_id) || {};
    const dueDay = toNumber(assessment.due_day);
    const submissionDay = toNumber(er.submission_day);
    let delayDays = toNumber(er.submission_delay_days);
    if (delayDays === null && submissionDay !== null && dueDay !== null) {
      delayDays = submissionDay - dueDay;
    }
    return {
      score_normalized: er.score_normalized,
      assessment_weight_pct: assessment.weight_pct,
      submission_day: submissionDay,
      submission_delay_days: delayDays
    };
  });

  const scores = joinedRows.map(r => toNumber(r.score_normalized));
  const weightedAvgScore = weightedMean(joinedRows, "score_normalized", "assessment_weight_pct");

  const timeOrderedRows = [...joinedRows].sort((a, b) => {
    const aDay = toNumber(a.submission_day);
    const bDay = toNumber(b.submission_day);
    if (aDay === null && bDay === null) return 0;
    if (aDay === null) return 1;
    if (bDay === null) return -1;
    return aDay - bDay;
  });

  const trendPoints = timeOrderedRows.map((row, index) => ({
    x: firstNonNull(row.submission_day, index + 1),
    y: toNumber(row.score_normalized)
  }));

  const scoreStd = standardDeviation(scores);
  const scoreConsistency = scoreStd === null ? null : 1 - normalize01(scoreStd, 0, FEATURE_RULES.score.max_std_for_consistency);

  const punctualityRows = joinedRows.filter(r => toNumber(r.submission_delay_days) !== null);
  const punctualityRate = punctualityRows.length > 0
    ? safeDivide(punctualityRows.filter(r => toNumber(r.submission_delay_days) <= 0).length, punctualityRows.length)
    : null;

  const positiveDelays = joinedRows.map(r => toNumber(r.submission_delay_days)).filter(v => v !== null && v > 0);
  const submissionDelayAvg = mean(positiveDelays);

  return {
    avg_score: firstNonNull(weightedAvgScore, mean(scores)),
    performance_trend: linearSlope(trendPoints),
    score_consistency: scoreConsistency,
    punctuality_rate: punctualityRate,
    submission_delay_avg: submissionDelayAvg
  };
}

function computeEngagementFeatures(engagementRows, eventsMap, enrollmentRecord, cohortStatsItem) {
  const cStats = cohortStatsItem || {};
  const maxTotalEng = cStats.maxTotalEngagementCount || null;
  const maxActiveDay = cStats.maxActiveDayCount || null;
  const maxAbsence = cStats.maxAbsenceCount || null;
  const resourceTypeTotal = cStats.resourceTypeCount || null;

  const engagementCounts = engagementRows.map((row) => toNumber(row.engagement_count));
  const totalEngagementCount = sumNumbers(engagementCounts);
  
  const activeDayCount = engagementRows.length > 0
      ? countDistinct(engagementRows.map((row) => toNumber(row.event_day)))
      : 0;

  const absenceCount = toNumber(enrollmentRecord.absences);
  const absencesRate = absenceCount !== null && maxAbsence !== null && maxAbsence > 0
      ? safeDivide(absenceCount, maxAbsence)
      : null;

  // Join engagements with events to get resource_type
  let forumClicks = 0;
  let quizClicks = 0;
  let resourceClicks = 0;
  const resourceTypesSeen = new Set();

  for (const eng of engagementRows) {
      const event = eventsMap.get(eng.event_id) || {};
      const type = normalizeText(event.resource_type);
      const clicks = toNumber(eng.engagement_count) || 0;
      
      if (type) resourceTypesSeen.add(type);
      if (FEATURE_RULES.resource_groups.forum.includes(type)) forumClicks += clicks;
      if (FEATURE_RULES.resource_groups.quiz.includes(type)) quizClicks += clicks;
      if (FEATURE_RULES.resource_groups.resource.includes(type)) resourceClicks += clicks;
  }

  const totalClicksForRates = totalEngagementCount > 0 ? totalEngagementCount : null;
  const vleDiversityScore = resourceTypesSeen.size > 0 && resourceTypeTotal
      ? safeDivide(resourceTypesSeen.size, resourceTypeTotal)
      : null;

  // weekly engagement drop
  const weeklyTotals = new Map();
  for (const row of engagementRows) {
    const weekNo = weekNumberFromEventDay(row.event_day);
    const clicks = toNumber(row.engagement_count);
    if (weekNo === null || clicks === null) continue;
    weeklyTotals.set(weekNo, (weeklyTotals.get(weekNo) || 0) + clicks);
  }

  const sortedWeeks = [...weeklyTotals.entries()].sort((a, b) => a[0] - b[0]);
  let weeklyEngagementDrop = null;
  let earlyWarningWeek = null;

  for (let i = 1; i < sortedWeeks.length; i += 1) {
    const currentWeek = sortedWeeks[i][0];
    const currentValue = sortedWeeks[i][1];
    const previousWeeks = sortedWeeks
      .slice(Math.max(0, i - FEATURE_RULES.weekly_drop.rolling_window_weeks), i)
      .map((entry) => entry[1]);

    if (previousWeeks.length === 0) continue;
    const baseline = mean(previousWeeks);
    if (baseline === null || baseline === 0) continue;

    const dropRatio = (currentValue - baseline) / baseline;

    if (weeklyEngagementDrop === null || dropRatio < weeklyEngagementDrop) {
      weeklyEngagementDrop = dropRatio;
    }

    if (earlyWarningWeek === null && dropRatio <= -FEATURE_RULES.weekly_drop.significant_drop_ratio) {
      earlyWarningWeek = currentWeek;
    }
  }

  // engagement_score
  let engagementScore = null;
  if (totalEngagementCount > 0 || activeDayCount > 0) {
    const normalizedTotalEngagement = maxTotalEng !== null ? normalize01(totalEngagementCount, 0, maxTotalEng) : null;
    const normalizedActiveDays = maxActiveDay !== null ? normalize01(activeDayCount, 0, maxActiveDay) : null;

    if (normalizedTotalEngagement !== null && normalizedActiveDays !== null) {
      engagementScore = normalizedTotalEngagement * 0.5 + normalizedActiveDays * 0.5;
    } else {
      engagementScore = firstNonNull(normalizedTotalEngagement, normalizedActiveDays);
    }
  } else if (absencesRate !== null) {
    engagementScore = 1 - absencesRate;
  }

  return {
    total_engagement_count: totalEngagementCount > 0 ? totalEngagementCount : null,
    active_day_count: activeDayCount > 0 ? activeDayCount : null,
    absences_rate: absencesRate,
    punctuality_rate: null, // to be overridden by assessment
    engagement_score: engagementScore,
    vle_diversity_score: vleDiversityScore,
    forum_engagement_rate: safeDivide(forumClicks, totalClicksForRates),
    quiz_engagement_rate: safeDivide(quizClicks, totalClicksForRates),
    resource_engagement_rate: safeDivide(resourceClicks, totalClicksForRates),
    weekly_engagement_drop: weeklyEngagementDrop,
    early_warning_week: earlyWarningWeek
  };
}

function computeTimelinessFeatures(enrollmentRecord, classRecord) {
  const enrollmentStartDay = toNumber(enrollmentRecord?.enrollment_start_day);
  const enrollmentEndDay = toNumber(enrollmentRecord?.enrollment_end_day);
  const courseDurationDays = toNumber(classRecord?.duration_days);

  const registrationLeadTime = enrollmentStartDay !== null && enrollmentStartDay < 0 ? Math.abs(enrollmentStartDay) : null;
  const withdrewEarly = enrollmentEndDay !== null && courseDurationDays !== null && enrollmentEndDay < courseDurationDays * FEATURE_RULES.thresholds.withdrew_early_ratio ? true : false;

  return {
    registration_lead_time: registrationLeadTime,
    withdrew_early: courseDurationDays !== null && enrollmentEndDay !== null ? withdrewEarly : null
  };
}

function computeLifestyleFeatures(studentRecord) {
  const alcoholWeekday = toNumber(studentRecord?.alcohol_weekday);
  const alcoholWeekend = toNumber(studentRecord?.alcohol_weekend);
  const goOutFreq = toNumber(studentRecord?.go_out_freq);
  const healthStatus = toNumber(studentRecord?.health_status);
  const freeTime = toNumber(studentRecord?.free_time);
  const familyRelation = toNumber(studentRecord?.family_relation);

  const motherEdu = toNumber(studentRecord?.mother_education_level);
  const fatherEdu = toNumber(studentRecord?.father_education_level);
  const maxParentEducation = motherEdu !== null || fatherEdu !== null ? Math.max(firstNonNull(motherEdu, 0), firstNonNull(fatherEdu, 0)) : null;

  const supportScoreComponents = [
    toBoolean(studentRecord?.school_support_flag) ? 1 : 0,
    toBoolean(studentRecord?.family_support_flag) ? 1 : 0,
    toBoolean(studentRecord?.has_paid_class) ? 1 : 0,
    toBoolean(studentRecord?.internet_access_flag) ? 1 : 0
  ];

  const supportScore = supportScoreComponents.length > 0 ? supportScoreComponents.reduce((sum, value) => sum + value, 0) / 4 : null;

  const lifestyleRiskScore = alcoholWeekday !== null && alcoholWeekend !== null && goOutFreq !== null && healthStatus !== null
      ? normalize01(alcoholWeekday + alcoholWeekend, FEATURE_RULES.ordinal_scales.alcohol_combined_min, FEATURE_RULES.ordinal_scales.alcohol_combined_max) * 0.4 +
        normalize01(goOutFreq, FEATURE_RULES.ordinal_scales.min, FEATURE_RULES.ordinal_scales.max) * 0.3 +
        normalize01(FEATURE_RULES.ordinal_scales.max - healthStatus, 0, FEATURE_RULES.ordinal_scales.max - FEATURE_RULES.ordinal_scales.min) * 0.3
      : null;

  const socialBalanceScore = freeTime !== null && goOutFreq !== null && alcoholWeekday !== null
      ? normalize01(freeTime, FEATURE_RULES.ordinal_scales.min, FEATURE_RULES.ordinal_scales.max) * 0.5 -
        normalize01(goOutFreq, FEATURE_RULES.ordinal_scales.min, FEATURE_RULES.ordinal_scales.max) * 0.3 -
        normalize01(alcoholWeekday, FEATURE_RULES.ordinal_scales.min, FEATURE_RULES.ordinal_scales.max) * 0.2
      : null;

  const familyStabilityScore = familyRelation !== null && maxParentEducation !== null
      ? normalize01(familyRelation, FEATURE_RULES.ordinal_scales.min, FEATURE_RULES.ordinal_scales.max) * 0.5 +
        (normalizeText(studentRecord?.parent_cohabitation_status) === "t" ? 0.3 : 0) +
        normalize01(maxParentEducation, 0, 4) * 0.2
      : null;

  return {
    lifestyle_risk_score: lifestyleRiskScore,
    support_score: supportScore,
    social_balance_score: socialBalanceScore,
    family_stability_score: familyStabilityScore
  };
}

function computeSocioeconomicFeatures(studentRecord) {
  const imdScore = toNumber(studentRecord?.imd_score_numeric);
  const disabilityFlag = toBoolean(studentRecord?.disability_flag);
  const highestEducation = studentRecord?.highest_education;

  const disadvantageScore = (imdScore !== null ? normalize01(100 - imdScore, 0, 100) * 0.5 : 0) +
    (disabilityFlag === true ? 0.3 : 0) +
    (hasNoFormalEducation(highestEducation) ? 0.2 : 0);

  const hasAnySignal = imdScore !== null || disabilityFlag === true || hasNoFormalEducation(highestEducation);

  return {
    disadvantage_score: hasAnySignal ? disadvantageScore : null
  };
}

function computeAtRiskFeatures(baseFeatures, enrollmentRecord) {
  const previousAttemptCount = toNumber(enrollmentRecord?.previous_attempt_count);
  let score = 0;

  if (baseFeatures.avg_score !== null && baseFeatures.avg_score < FEATURE_RULES.thresholds.at_risk_avg_score) score += 1;
  if (previousAttemptCount !== null && previousAttemptCount > 0) score += 1;
  if (baseFeatures.engagement_score !== null && baseFeatures.engagement_score < FEATURE_RULES.thresholds.at_risk_low_engagement) score += 1;
  if (baseFeatures.punctuality_rate !== null && baseFeatures.punctuality_rate < FEATURE_RULES.thresholds.at_risk_low_punctuality) score += 1;
  if (baseFeatures.performance_trend !== null && baseFeatures.performance_trend < 0) score += 1;

  let label = null;
  if (score >= 3) label = "high";
  else if (score === 2) label = "medium";
  else label = "low";

  return {
    at_risk_score: score,
    at_risk_label: label
  };
}

// ==========================================
// MAIN PASS 2 SERVICE
// ==========================================

export function computeEnrollmentFeatures(normalizedEntities, cohortStats) {
  const { student = [], class: classArr = [], enrollment = [], assessment = [], exam_result = [], event = [], engagement = [] } = normalizedEntities;

  // Build lookups
  const studentMap = new Map(student.map(s => [s.student_id, s]));
  const classMap = new Map(classArr.map(c => [c.class_id, c]));
  const assessmentMap = new Map(assessment.map(a => [a.assessment_id, a]));
  const eventMap = new Map(event.map(e => [e.event_id, e]));

  // Group facts by enrollment
  const examResultByEnrollment = new Map();
  for (const er of exam_result) {
    if (!er.enrollment_id) continue;
    if (!examResultByEnrollment.has(er.enrollment_id)) examResultByEnrollment.set(er.enrollment_id, []);
    examResultByEnrollment.get(er.enrollment_id).push(er);
  }

  const engagementByEnrollment = new Map();
  for (const eng of engagement) {
    if (!eng.enrollment_id) continue;
    if (!engagementByEnrollment.has(eng.enrollment_id)) engagementByEnrollment.set(eng.enrollment_id, []);
    engagementByEnrollment.get(eng.enrollment_id).push(eng);
  }

  const enrollmentFeatures = [];

  for (const enrol of enrollment) {
    const studentRecord = studentMap.get(enrol.student_id) || {};
    const classRecord = classMap.get(enrol.class_id) || {};
    const cStatsItem = cohortStats.classStats.get(enrol.class_id) || {};
    
    const examResults = examResultByEnrollment.get(enrol.enrollment_id) || [];
    const engRows = engagementByEnrollment.get(enrol.enrollment_id) || [];

    const assessFeats = computeAssessmentFeatures(examResults, assessmentMap);
    const engFeats = computeEngagementFeatures(engRows, eventMap, enrol, cStatsItem);
    const timeFeats = computeTimelinessFeatures(enrol, classRecord);
    const lifeFeats = computeLifestyleFeatures(studentRecord);
    const socioFeats = computeSocioeconomicFeatures(studentRecord);

    const punctualityRate = firstNonNull(
      assessFeats.punctuality_rate,
      engFeats.punctuality_rate,
      engFeats.absences_rate !== null ? 1 - engFeats.absences_rate : null
    );

    const baseFeatures = {
      ...assessFeats,
      ...engFeats,
      ...timeFeats,
      ...lifeFeats,
      ...socioFeats,
      punctuality_rate: punctualityRate
    };

    const riskFeats = computeAtRiskFeatures(baseFeatures, enrol);

    const computedAt = new Date().toISOString();
    
    // We only create an enrollment feature if there is meaningful data
    enrollmentFeatures.push({
      ef_id: surrogateKeyGenerators.ef_id(enrol.enrollment_id),
      batch_id: enrol.batch_id,
      enrollment_id: enrol.enrollment_id,
      computed_at: computedAt,
      source_dataset: enrol.source_dataset,
      ...baseFeatures,
      ...riskFeats
    });
  }

  return enrollmentFeatures;
}
