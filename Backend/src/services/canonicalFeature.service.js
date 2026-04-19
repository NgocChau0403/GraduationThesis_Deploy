import { FEATURE_RULES } from "../config/canonicalFeatureRules.js";

// ==========================================
// HELPERS
// ==========================================

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function pushUnique(targetArray, message) {
  if (!targetArray.includes(message)) {
    targetArray.push(message);
  }
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

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

function mean(values) {
  const clean = values.filter((v) => v !== null && v !== undefined && !Number.isNaN(v));
  if (clean.length === 0) return null;
  return clean.reduce((sum, value) => sum + value, 0) / clean.length;
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

function standardDeviation(values) {
  const clean = values.filter((v) => v !== null && v !== undefined && !Number.isNaN(v));
  if (clean.length === 0) return null;
  if (clean.length === 1) return 0;

  const avg = mean(clean);
  const variance =
    clean.reduce((sum, value) => sum + (value - avg) ** 2, 0) / clean.length;

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
  const clean = points
    .filter(
      (point) =>
        point &&
        toNumber(point.x) !== null &&
        toNumber(point.y) !== null
    )
    .map((point) => ({
      x: toNumber(point.x),
      y: toNumber(point.y)
    }));

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

function countDistinct(values) {
  const filtered = values.filter((v) => v !== null && v !== undefined && v !== "");
  return new Set(filtered).size;
}

function weekNumberFromEventDay(eventDay) {
  const day = toNumber(eventDay);
  if (day === null) return null;
  return Math.floor(day / 7) + 1;
}

function buildStudentKey(record) {
  return [
    record?.student_id ?? "__NULL__",
    record?.course_id ?? "__NULL__",
    record?.source_dataset ?? "__NULL__"
  ].join("||");
}

function groupByStudentKey(records) {
  const output = new Map();

  for (const record of records) {
    if (!isPlainObject(record)) continue;

    const key = buildStudentKey(record);
    if (!output.has(key)) {
      output.set(key, []);
    }

    output.get(key).push(record);
  }

  return output;
}

function maxNumber(values) {
  const clean = values.filter((v) => v !== null && v !== undefined && !Number.isNaN(v));
  if (clean.length === 0) return null;
  return Math.max(...clean);
}

function sumNumbers(values) {
  const clean = values.filter((v) => v !== null && v !== undefined && !Number.isNaN(v));
  if (clean.length === 0) return 0;
  return clean.reduce((sum, value) => sum + value, 0);
}

function firstNonNull(...values) {
  for (const value of values) {
    if (value !== null && value !== undefined && value !== "") {
      return value;
    }
  }
  return null;
}

function hasNoFormalEducation(value) {
  const normalized = normalizeText(value);
  return FEATURE_RULES.education_levels.no_formal_values.includes(normalized);
}

// ==========================================
// ROW-LEVEL FEATURE CONSTRUCTION
// ==========================================

function enrichAssessmentRows(assessmentRecords) {
  const warnings = [];
  const enriched = assessmentRecords.map((record) => {
    if (!isPlainObject(record)) return record;

    const scoreNormalized = toNumber(record.score_normalized);
    const submissionDay = toNumber(record.submission_day);
    const dueDay = toNumber(record.assessment_due_day);

    const submissionDelayDays =
      submissionDay !== null && dueDay !== null ? submissionDay - dueDay : null;

    const passFlag =
      scoreNormalized !== null
        ? scoreNormalized >= FEATURE_RULES.thresholds.pass_score
        : null;

    return {
      ...record,
      submission_delay_days: firstNonNull(record.submission_delay_days, submissionDelayDays),
      pass_flag: firstNonNull(record.pass_flag, passFlag)
    };
  });

  return { records: enriched, warnings };
}

// ==========================================
// AGGREGATE FEATURE CONSTRUCTION
// ==========================================

function computeAssessmentAggregates(assessmentRecords) {
  const scores = assessmentRecords.map((row) => toNumber(row.score_normalized));
  const weightedAvgScore = weightedMean(
    assessmentRecords,
    "score_normalized",
    "assessment_weight_pct"
  );

  const timeOrderedRows = [...assessmentRecords].sort((a, b) => {
    const aDay = toNumber(a.submission_day);
    const bDay = toNumber(b.submission_day);

    if (aDay === null && bDay === null) return 0;
    if (aDay === null) return 1;
    if (bDay === null) return -1;
    return aDay - bDay;
  });

  const trendPoints = timeOrderedRows.map((row, index) => ({
    x: firstNonNull(toNumber(row.submission_day), index + 1),
    y: toNumber(row.score_normalized)
  }));

  const scoreStd = standardDeviation(scores);
  const scoreConsistency =
    scoreStd === null
      ? null
      : 1 -
        normalize01(
          scoreStd,
          0,
          FEATURE_RULES.score.max_std_for_consistency
        );

  const punctualityRows = assessmentRecords.filter(
    (row) => toNumber(row.submission_delay_days) !== null
  );

  const punctualityRate =
    punctualityRows.length > 0
      ? safeDivide(
          punctualityRows.filter(
            (row) => toNumber(row.submission_delay_days) <= 0
          ).length,
          punctualityRows.length
        )
      : null;

  const positiveDelays = assessmentRecords
    .map((row) => toNumber(row.submission_delay_days))
    .filter((value) => value !== null && value > 0);

  const submissionDelayAvg = mean(positiveDelays);

  return {
    avg_score: firstNonNull(weightedAvgScore, mean(scores)),
    performance_trend: linearSlope(trendPoints),
    score_consistency: scoreConsistency,
    punctuality_rate: punctualityRate,
    submission_delay_avg: submissionDelayAvg
  };
}

function computeEngagementAggregates(engagementRecords, studentRecord, cohortStats) {
  const engagementCounts = engagementRecords.map((row) => toNumber(row.engagement_count));
  const totalEngagementCount = sumNumbers(engagementCounts);

  const activeDayCount =
    engagementRecords.length > 0
      ? countDistinct(engagementRecords.map((row) => toNumber(row.event_day)))
      : firstNonNull(toNumber(studentRecord?.active_day_count), null);

  const absenceCount = firstNonNull(toNumber(studentRecord?.absence_count), null);

  const absencesRate =
    absenceCount !== null && cohortStats.maxAbsenceCount !== null
      ? safeDivide(absenceCount, cohortStats.maxAbsenceCount)
      : null;

  const forumClicks = sumNumbers(
    engagementRecords
      .filter((row) =>
        FEATURE_RULES.resource_groups.forum.includes(normalizeText(row.resource_type))
      )
      .map((row) => toNumber(row.engagement_count))
  );

  const quizClicks = sumNumbers(
    engagementRecords
      .filter((row) =>
        FEATURE_RULES.resource_groups.quiz.includes(normalizeText(row.resource_type))
      )
      .map((row) => toNumber(row.engagement_count))
  );

  const resourceClicks = sumNumbers(
    engagementRecords
      .filter((row) =>
        FEATURE_RULES.resource_groups.resource.includes(normalizeText(row.resource_type))
      )
      .map((row) => toNumber(row.engagement_count))
  );

  const totalClicksForRates = totalEngagementCount > 0 ? totalEngagementCount : null;

  const resourceTypeCount = countDistinct(
    engagementRecords.map((row) => normalizeText(row.resource_type))
  );

  const courseResourceTypeTotal =
    cohortStats.resourceTypesByCourse.get(
      [studentRecord?.course_id ?? "__NULL__", studentRecord?.source_dataset ?? "__NULL__"].join(
        "||"
      )
    ) ?? null;

  const vleDiversityScore =
    resourceTypeCount > 0 && courseResourceTypeTotal
      ? safeDivide(resourceTypeCount, courseResourceTypeTotal)
      : null;

  // weekly engagement drop + early warning week
  const weeklyTotals = new Map();
  for (const row of engagementRecords) {
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

    if (
      earlyWarningWeek === null &&
      dropRatio <= -FEATURE_RULES.weekly_drop.significant_drop_ratio
    ) {
      earlyWarningWeek = currentWeek;
    }
  }

  // engagement_score
  let engagementScore = null;

  if (totalEngagementCount > 0 || activeDayCount !== null) {
    const normalizedTotalEngagement =
      cohortStats.maxTotalEngagementCount !== null
        ? normalize01(totalEngagementCount, 0, cohortStats.maxTotalEngagementCount)
        : null;

    const normalizedActiveDays =
      cohortStats.maxActiveDayCount !== null
        ? normalize01(activeDayCount, 0, cohortStats.maxActiveDayCount)
        : null;

    if (normalizedTotalEngagement !== null && normalizedActiveDays !== null) {
      engagementScore = normalizedTotalEngagement * 0.5 + normalizedActiveDays * 0.5;
    } else {
      engagementScore = firstNonNull(normalizedTotalEngagement, normalizedActiveDays);
    }
  } else if (absencesRate !== null) {
    const punctualityProxy = 1 - absencesRate;
    engagementScore = punctualityProxy;
  }

  return {
    total_engagement_count: totalEngagementCount > 0 ? totalEngagementCount : firstNonNull(toNumber(studentRecord?.total_engagement_count), null),
    active_day_count: activeDayCount,
    absences_rate: absencesRate,
    punctuality_rate: null, // assessment-based punctuality will override if available
    engagement_score: engagementScore,
    vle_diversity_score: vleDiversityScore,
    forum_engagement_rate: safeDivide(forumClicks, totalClicksForRates),
    quiz_engagement_rate: safeDivide(quizClicks, totalClicksForRates),
    resource_engagement_rate: safeDivide(resourceClicks, totalClicksForRates),
    weekly_engagement_drop: weeklyEngagementDrop,
    early_warning_week: earlyWarningWeek
  };
}

function computeTimelinessFeatures(studentRecord, courseRecord) {
  const enrollmentStartDay = toNumber(studentRecord?.enrollment_start_day);
  const enrollmentEndDay = toNumber(studentRecord?.enrollment_end_day);
  const courseDurationDays = toNumber(courseRecord?.course_duration_days);

  const registrationLeadTime =
    enrollmentStartDay !== null && enrollmentStartDay < 0
      ? Math.abs(enrollmentStartDay)
      : null;

  const withdrewEarly =
    enrollmentEndDay !== null &&
    courseDurationDays !== null &&
    enrollmentEndDay < courseDurationDays * FEATURE_RULES.thresholds.withdrew_early_ratio
      ? 1
      : 0;

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
  const maxParentEducation =
    motherEdu !== null || fatherEdu !== null
      ? Math.max(firstNonNull(motherEdu, 0), firstNonNull(fatherEdu, 0))
      : null;

  const supportScoreComponents = [
    toBoolean(studentRecord?.school_support_flag) ? 1 : 0,
    toBoolean(studentRecord?.family_support_flag) ? 1 : 0,
    toBoolean(studentRecord?.paid_class_flag) ? 1 : 0,
    toBoolean(studentRecord?.internet_access_flag) ? 1 : 0
  ];

  const supportScore =
    supportScoreComponents.length > 0
      ? supportScoreComponents.reduce((sum, value) => sum + value, 0) / 4
      : null;

  const lifestyleRiskScore =
    alcoholWeekday !== null &&
    alcoholWeekend !== null &&
    goOutFreq !== null &&
    healthStatus !== null
      ? normalize01(
          alcoholWeekday + alcoholWeekend,
          FEATURE_RULES.ordinal_scales.alcohol_combined_min,
          FEATURE_RULES.ordinal_scales.alcohol_combined_max
        ) * 0.4 +
        normalize01(
          goOutFreq,
          FEATURE_RULES.ordinal_scales.min,
          FEATURE_RULES.ordinal_scales.max
        ) * 0.3 +
        normalize01(
          FEATURE_RULES.ordinal_scales.max - healthStatus,
          0,
          FEATURE_RULES.ordinal_scales.max - FEATURE_RULES.ordinal_scales.min
        ) * 0.3
      : null;

  const socialBalanceScore =
    freeTime !== null && goOutFreq !== null && alcoholWeekday !== null
      ? normalize01(
          freeTime,
          FEATURE_RULES.ordinal_scales.min,
          FEATURE_RULES.ordinal_scales.max
        ) * 0.5 -
        normalize01(
          goOutFreq,
          FEATURE_RULES.ordinal_scales.min,
          FEATURE_RULES.ordinal_scales.max
        ) * 0.3 -
        normalize01(
          alcoholWeekday,
          FEATURE_RULES.ordinal_scales.min,
          FEATURE_RULES.ordinal_scales.max
        ) * 0.2
      : null;

  const familyStabilityScore =
    familyRelation !== null && maxParentEducation !== null
      ? normalize01(
          familyRelation,
          FEATURE_RULES.ordinal_scales.min,
          FEATURE_RULES.ordinal_scales.max
        ) * 0.5 +
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

  const disadvantageScore =
    (imdScore !== null
      ? normalize01(100 - imdScore, 0, 100) * 0.5
      : 0) +
    (disabilityFlag === true ? 0.3 : 0) +
    (hasNoFormalEducation(highestEducation) ? 0.2 : 0);

  const hasAnySignal =
    imdScore !== null || disabilityFlag === true || hasNoFormalEducation(highestEducation);

  return {
    disadvantage_score: hasAnySignal ? disadvantageScore : null
  };
}

function computeAtRiskFeatures(baseFeatures, studentRecord) {
  const previousAttemptCount = toNumber(studentRecord?.previous_attempt_count);

  let score = 0;

  if (
    baseFeatures.avg_score !== null &&
    baseFeatures.avg_score < FEATURE_RULES.thresholds.at_risk_avg_score
  ) {
    score += 1;
  }

  if (previousAttemptCount !== null && previousAttemptCount > 0) {
    score += 1;
  }

  if (
    baseFeatures.engagement_score !== null &&
    baseFeatures.engagement_score < FEATURE_RULES.thresholds.at_risk_low_engagement
  ) {
    score += 1;
  }

  if (
    baseFeatures.punctuality_rate !== null &&
    baseFeatures.punctuality_rate < FEATURE_RULES.thresholds.at_risk_low_punctuality
  ) {
    score += 1;
  }

  if (
    baseFeatures.performance_trend !== null &&
    baseFeatures.performance_trend < 0
  ) {
    score += 1;
  }

  let label = null;
  if (score >= 3) label = "high";
  else if (score === 2) label = "medium";
  else label = "low";

  return {
    at_risk_score: score,
    at_risk_label: label
  };
}

function buildCourseIndex(courseRecords) {
  const index = new Map();

  for (const row of courseRecords) {
    if (!isPlainObject(row)) continue;

    const key = [
      row?.course_id ?? "__NULL__",
      row?.source_dataset ?? "__NULL__"
    ].join("||");

    if (!index.has(key)) {
      index.set(key, row);
    }
  }

  return index;
}

// ==========================================
// MAIN SERVICE
// ==========================================

export function constructCanonicalFeatures({ canonicalOutput }) {
  if (!isPlainObject(canonicalOutput)) {
    const error = new Error(
      "Invalid canonicalOutput: expected an object grouped by canonical entity."
    );
    error.code = "INVALID_CANONICAL_OUTPUT";
    throw error;
  }

  const warnings = [];
  const output = deepClone(canonicalOutput);

  output.student = Array.isArray(output.student) ? output.student : [];
  output.course = Array.isArray(output.course) ? output.course : [];
  output.assessment = Array.isArray(output.assessment) ? output.assessment : [];
  output.engagement_event = Array.isArray(output.engagement_event)
    ? output.engagement_event
    : [];

  // ------------------------------------------
  // STEP 1 — row-level feature construction
  // assessment rows
  // ------------------------------------------
  const assessmentRowResult = enrichAssessmentRows(output.assessment);
  output.assessment = assessmentRowResult.records;
  assessmentRowResult.warnings.forEach((warning) => pushUnique(warnings, warning));

  // ------------------------------------------
  // STEP 2 — build indices
  // ------------------------------------------
  const studentGroups = groupByStudentKey(output.student);
  const assessmentGroups = groupByStudentKey(output.assessment);
  const engagementGroups = groupByStudentKey(output.engagement_event);
  const courseIndex = buildCourseIndex(output.course);

  const cohortAbsenceCounts = output.student.map((row) => toNumber(row.absence_count));
  const maxAbsenceCount = maxNumber(cohortAbsenceCounts);

  const cohortTotalEngagementCounts = [];
  const cohortActiveDayCounts = [];
  const resourceTypesByCourse = new Map();

  for (const studentRecord of output.student) {
    const key = buildStudentKey(studentRecord);
    const engagementRows = engagementGroups.get(key) || [];

    const totalEngagement = sumNumbers(
      engagementRows.map((row) => toNumber(row.engagement_count))
    );

    const activeDays = countDistinct(
      engagementRows.map((row) => toNumber(row.event_day))
    );

    if (totalEngagement > 0) cohortTotalEngagementCounts.push(totalEngagement);
    if (activeDays > 0) cohortActiveDayCounts.push(activeDays);
  }

  for (const row of output.engagement_event) {
    if (!isPlainObject(row)) continue;

    const courseKey = [
      row?.course_id ?? "__NULL__",
      row?.source_dataset ?? "__NULL__"
    ].join("||");

    if (!resourceTypesByCourse.has(courseKey)) {
      resourceTypesByCourse.set(courseKey, new Set());
    }

    if (row.resource_type !== null && row.resource_type !== undefined && row.resource_type !== "") {
      resourceTypesByCourse.get(courseKey).add(normalizeText(row.resource_type));
    }
  }

  const resourceTypesByCourseCount = new Map(
    [...resourceTypesByCourse.entries()].map(([key, set]) => [key, set.size])
  );

  const cohortStats = {
    maxAbsenceCount,
    maxTotalEngagementCount: maxNumber(cohortTotalEngagementCounts),
    maxActiveDayCount: maxNumber(cohortActiveDayCounts),
    resourceTypesByCourse: resourceTypesByCourseCount
  };

  // ------------------------------------------
  // STEP 3 — student-level aggregate features
  // ------------------------------------------
  output.student = output.student.map((studentRecord) => {
    if (!isPlainObject(studentRecord)) return studentRecord;

    const studentKey = buildStudentKey(studentRecord);
    const assessmentRows = assessmentGroups.get(studentKey) || [];
    const engagementRows = engagementGroups.get(studentKey) || [];

    const courseKey = [
      studentRecord?.course_id ?? "__NULL__",
      studentRecord?.source_dataset ?? "__NULL__"
    ].join("||");

    const courseRecord = courseIndex.get(courseKey) || null;

    const assessmentFeatures = computeAssessmentAggregates(assessmentRows);
    const engagementFeatures = computeEngagementAggregates(
      engagementRows,
      studentRecord,
      cohortStats
    );

    const timelinessFeatures = computeTimelinessFeatures(studentRecord, courseRecord);
    const lifestyleFeatures = computeLifestyleFeatures(studentRecord);
    const socioeconomicFeatures = computeSocioeconomicFeatures(studentRecord);

    const combinedBaseFeatures = {
      ...assessmentFeatures,
      ...engagementFeatures,
      ...timelinessFeatures,
      ...lifestyleFeatures,
      ...socioeconomicFeatures
    };

    // If assessment-based punctuality exists, keep it.
    // Otherwise fallback to 1 - absences_rate for UCI-like proxy.
    const punctualityRate =
      firstNonNull(
        assessmentFeatures.punctuality_rate,
        engagementFeatures.punctuality_rate,
        combinedBaseFeatures.absences_rate !== null
          ? 1 - combinedBaseFeatures.absences_rate
          : null
      );

    const finalBaseFeatures = {
      ...combinedBaseFeatures,
      punctuality_rate: punctualityRate
    };

    const atRiskFeatures = computeAtRiskFeatures(finalBaseFeatures, studentRecord);

    return {
      ...studentRecord,
      ...finalBaseFeatures,
      ...atRiskFeatures
    };
  });

  return {
    output,
    summary: {
      student_count: output.student.length,
      course_count: output.course.length,
      assessment_count: output.assessment.length,
      engagement_event_count: output.engagement_event.length
    },
    warnings
  };
}