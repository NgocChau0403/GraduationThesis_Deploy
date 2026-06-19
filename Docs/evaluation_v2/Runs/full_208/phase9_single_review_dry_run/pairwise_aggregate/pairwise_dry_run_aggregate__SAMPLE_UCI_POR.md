# Pairwise Dry-Run Aggregate Report

Dataset: SAMPLE_UCI_POR
Dry-run mode: single_review
Task pairs: 15
Pairwise records: 30
Order-consistent tasks: 15/15
Position-bias inconsistent tasks: 0
Tasks requiring absolute rerun: 12/15

## Winner Summary

| Winner | Task count |
|---|---:|
| task_aware_data_summarization | 7 |
| baseline_first_20_rows | 7 |
| tie | 1 |

## Row-Bucket Winner Summary

| Row bucket + winner | Task count |
|---|---:|
| <=20:task_aware_data_summarization | 2 |
| <=20:baseline_first_20_rows | 6 |
| >20:task_aware_data_summarization | 5 |
| >20:baseline_first_20_rows | 1 |
| <=20:tie | 1 |

## Prompt Policy Decisions

### P1_DERIVED_STAT_AVAILABLE_USE_AND_DO_NOT_CAP_SUPPORTED_COEFFICIENT

Recommendation: Adopt

When deterministic Pearson evidence exists, the judge must use it as primary provenance. A coefficient matching the recomputed value must not be penalized as unsupported. This changed A-G13 and S-T09 from unsupported-claim risk to evidence-supported task-aware wins, and exposed V2 ties on S-T14/S-T15 as insufficiently sensitive.

Affected tasks: A-G13, S-T09, S-T14, S-T15

### P2_DERIVED_STAT_UNAVAILABLE_DO_NOT_INVENT_COEFFICIENT_OR_DIRECTION

Recommendation: Adopt

When deterministic evidence says zero variance, zero rows, or no valid numeric pairs, the judge must penalize coefficient/direction/strength claims that go beyond the evidence. A-G02 tests this branch: it is not the same as A-G13. A-G02 means no derived coefficient is available; A-G13 means a coefficient is available and should be trusted.

Affected tasks: A-G02

### P3_PAIRWISE_TIE_MUST_BE_EXPLAINED_METRIC_BY_METRIC

Recommendation: Adopt

Only A-G14 remained tie in the dry run; the pairwise prompt reduced uninformative ties while remaining position-consistent.

Affected tasks: A-G14

### P4_SMALL_RESULT_NO_AUTOMATIC_TASK_AWARE_ADVANTAGE

Recommendation: Adopt

Several <=20-row cases favored baseline; for small results both modes have full row coverage, so content quality and cap-worthy defects should decide.

Affected tasks: A-B01, A-C02, A-G11, A-G14, A-S04, A-S08, S-T01, S-T12, S-T13

## Cap Policy Decisions

### C1_UNSUPPORTED_NUMERICAL_CLAIM_REQUIRES_DERIVED_STAT_CHECK

Recommendation: Change prompt/scoring guidance before rerun

Do not apply major unsupported-claim cap when deterministic derived stats support the claimed coefficient. Conversely, coefficient claims remain cap candidates when derived stats are unavailable or contradictory.

Affected tasks: A-G02, A-G13, S-T09, S-T14, S-T15

### C2_MAJOR_FACTUAL_CAP_CANDIDATE_5

Recommendation: Use calibration candidate in V3 rerun

Use major factual / unsupported numerical claim cap = 5.0 for the V3 UCI rerun candidate set. Cap 4.0 is likely too severe for proportionality or overstatement cases that are not central numerical hallucinations. Critical contradictions such as wrong correlation direction can still receive a critical cap below this candidate.

Affected tasks: A-C02, A-G02, A-G03, A-G11, A-G13, A-S04, A-S08, S-T09, S-T12, S-T13, S-T14, S-T15

### C3_CORE_OUTPUT_OMISSION_CAP_CANDIDATE_6_5

Recommendation: Use calibration candidate in V3 rerun

Use core-output omission cap = 6.5 for the V3 UCI rerun candidate set. Baseline wins on several small-result cases appear driven by task-aware omission or weaker task fit rather than row coverage, but cap 6.0 may be too harsh before two-reviewer calibration.

Affected tasks: A-C02, A-G03, A-G11, A-S04, A-S08, S-T12, S-T13

## V3 Rerun Candidate Cap Set

Policy status: single_review_dry_run_candidate_not_final_human_calibrated

| Cap family | Candidate cap |
|---|---:|
| Major factual or unsupported numerical claim | 5 |
| Core-output omission | 6.5 |
| Critical factual or contradictory core numerical claim | 2 |

These are calibration candidates for the UCI V3 rerun, not final thesis-wide calibrated caps.

## V3 Acceptance Criterion

Scope: 15 dry-run task pairs

Minimum required alignment: 12/15

After the UCI V3 pointwise rerun, compare pointwise winner against pairwise dry-run winner on these 15 task pairs. V3 is acceptable for proceeding to OULAD only if pointwise winner aligns with pairwise winner on at least 12 of 15 tasks and no critical derived-stat contradiction remains unresolved.

## Per-Task Analysis

| Task | Rows | V2 scores baseline/task-aware | Pairwise winner | Magnitude | Rerun? | Main reason |
|---|---:|---:|---|---|---|---|
| A-B01 | 10 | 8.15/8.15 | task_aware_data_summarization | small | no | Candidate B's concrete bucket counts make the threshold concern more reportable. |
| A-C02 | 6 | 7.65/8.15 | baseline_first_20_rows | small | yes | The explicit named comparison gives candidate A a small specificity advantage. |
| A-G02 | 649 | 6/8.15 | task_aware_data_summarization | moderate | yes | This makes candidate A's weak negative Pearson-style interpretation unsupported and makes candidate B comparatively safer. |
| A-G03 | 50 | 8.15/8.15 | baseline_first_20_rows | small | yes | Candidate A's concrete IDs and scores make the risk ranking more evidence-grounded. |
| A-G11 | 0 | 6/7.65 | baseline_first_20_rows | moderate | yes | With no rows, candidate B's week-1 timing is unsupported. |
| A-G13 | 649 | 8.15/6 | task_aware_data_summarization | moderate | yes | Candidate B's coefficient and weak-strength interpretation directly match this evidence. |
| A-G14 | 0 | 6/7.65 | tie | none | no | The zero-row evidence makes both cautious no-trend answers similarly supported. |
| A-S04 | 4 | 8.15/6 | baseline_first_20_rows | small | yes | The required output includes prioritised immediate action, which candidate A provides more directly. |
| A-S08 | 1 | 6/7.65 | baseline_first_20_rows | small | yes | Candidate A is the only one that engages with the returned FE signals. |
| S-T01 | 3 | 8.15/8.15 | task_aware_data_summarization | small | no | These details make candidate B's trend and threshold interpretation more complete. |
| S-T09 | 649 | 8.15/6 | task_aware_data_summarization | small | yes | Candidate B directly uses the deterministic coefficient and strength. |
| S-T12 | 4 | 7.9/8.15 | baseline_first_20_rows | small | yes | This requirement exposes a shared weakness, with candidate A only slightly ahead for score detail. |
| S-T13 | 1 | 8.15/4 | baseline_first_20_rows | moderate | yes | Candidate A is the only candidate using these returned FE signals. |
| S-T14 | 649 | 8.15/8.15 | task_aware_data_summarization | moderate | yes | The near-zero coefficient supports candidate B's weak-positive interpretation over candidate A's stronger wording. |
| S-T15 | 649 | 8.15/8.15 | task_aware_data_summarization | large | yes | This directly refutes candidate A's negative-correlation claim. |

## Detailed Task Notes

### A-B01 - Overall performance distribution

Pairwise winner: task_aware_data_summarization
AB/BA consistency: consistent (task_aware_data_summarization / task_aware_data_summarization)
Rows: 10 (<=20)

Main reason: Candidate B's concrete bucket counts make the threshold concern more reportable.

Coverage: Candidate B covers both distribution shape and the low-score threshold concern.

Specificity: Candidate B provides exact counts as well as percentages.

Policy recommendation: For small results, prompt/cap policy should not grant task-aware an automatic evidence advantage; decide on explanation quality, omissions, unsupported claims, and proportionality.

### A-C02 - Compare engagement patterns

Pairwise winner: baseline_first_20_rows
AB/BA consistency: consistent (baseline_first_20_rows / baseline_first_20_rows)
Rows: 6 (<=20)

Main reason: The explicit named comparison gives candidate A a small specificity advantage.

Coverage: Candidate A uses the named-student comparison and all three engagement metrics.

Specificity: Candidate A is more specific by naming both student IDs.

Policy recommendation: For small results, prompt/cap policy should not grant task-aware an automatic evidence advantage; decide on explanation quality, omissions, unsupported claims, and proportionality.

Rerun flags:
- both / missing_largest_gap_statement (minor): Both candidates should explicitly state that no engagement dimension creates a gap when all compared metrics are identical.

### A-G02 - Engagement–performance relationship

Pairwise winner: task_aware_data_summarization
AB/BA consistency: consistent (task_aware_data_summarization / task_aware_data_summarization)
Rows: 649 (>20)
Derived-stat evidence: skipped; engagement_score vs avg_score; r=n/a; reason=zero_variance

Main reason: This makes candidate A's weak negative Pearson-style interpretation unsupported and makes candidate B comparatively safer.

Coverage: Candidate B uses more of the full-result context and acknowledges coefficient limits, while candidate A appears driven by an unsupported first-row pattern.

Specificity: Candidate B gives concrete low-score ranges, while candidate A's most specific correlation claim is contradicted by deterministic evidence.

Policy recommendation: Prompt V3 should require the judge to treat coefficient/direction/strength claims cautiously when derived-stat evidence is unavailable because of zero variance or zero rows.

Rerun flags:
- baseline_first_20_rows / unsupported_correlation_claim (major): Candidate A states a weak negative correlation even though deterministic evidence says Pearson cannot be derived because engagement_score has zero variance.
- task_aware_data_summarization / mislabelled_outlier_context (minor): Candidate B describes engagement_score 0.0 examples as high engagement, which is internally inconsistent with the supplied field.

### A-G03 - Identify at-risk cohort

Pairwise winner: baseline_first_20_rows
AB/BA consistency: consistent (baseline_first_20_rows / baseline_first_20_rows)
Rows: 50 (>20)

Main reason: Candidate A's concrete IDs and scores make the risk ranking more evidence-grounded.

Coverage: Candidate A uses more of the visible top-risk rows and values.

Specificity: Candidate A names more students and exact scores.

Policy recommendation: Review whether task-aware summary lost because it omitted concrete task deliverables or became less faithful despite broader evidence access.

Rerun flags:
- both / incomplete_per_student_actions (minor): Neither candidate fully explains triggered_flags_summary and recommended_admin_action for each high-risk student.

### A-G11 - Weekly engagement drop detection

Pairwise winner: baseline_first_20_rows
AB/BA consistency: consistent (baseline_first_20_rows / baseline_first_20_rows)
Rows: 0 (<=20)

Main reason: With no rows, candidate B's week-1 timing is unsupported.

Coverage: Candidate A uses the zero-row evidence to avoid unsupported timing.

Specificity: Candidate A specifically states that no intervention weeks can be identified.

Policy recommendation: For small results, prompt/cap policy should not grant task-aware an automatic evidence advantage; decide on explanation quality, omissions, unsupported claims, and proportionality.

Rerun flags:
- task_aware_data_summarization / unsupported_timing_claim (major): Candidate B recommends week-1 timing despite no critical-week or early_warning_week evidence.

### A-G13 - Lifestyle risk across cohort

Pairwise winner: task_aware_data_summarization
AB/BA consistency: consistent (task_aware_data_summarization / task_aware_data_summarization)
Rows: 649 (>20)
Derived-stat evidence: pass; lifestyle_risk_score vs avg_score; r=-0.1041; reason=n/a

Main reason: Candidate B's coefficient and weak-strength interpretation directly match this evidence.

Coverage: Candidate B uses the full derived-stat evidence, including coefficient and strength.

Specificity: Candidate B is specific about r = -0.1041 and the weak magnitude.

Policy recommendation: Prompt V3 should include deterministic derived-stat evidence and forbid unsupported_claim penalties when a stated coefficient matches the recomputed Pearson value.

Rerun flags:
- baseline_first_20_rows / overstated_association (minor): Candidate A describes students with riskier lifestyle choices as tending to perform worse without conveying that the coefficient is weak.

### A-G14 - Early withdrawal signal analysis

Pairwise winner: tie
AB/BA consistency: consistent (tie / tie)
Rows: 0 (<=20)

Main reason: The zero-row evidence makes both cautious no-trend answers similarly supported.

Coverage: Both candidates use the same zero-row evidence and reach the same practical limitation.

Specificity: Both have similar specificity and neither has concrete timing evidence to report.

Policy recommendation: For small results, prompt/cap policy should not grant task-aware an automatic evidence advantage; decide on explanation quality, omissions, unsupported claims, and proportionality.

### A-S04 - Student risk flag breakdown

Pairwise winner: baseline_first_20_rows
AB/BA consistency: consistent (baseline_first_20_rows / baseline_first_20_rows)
Rows: 4 (<=20)

Main reason: The required output includes prioritised immediate action, which candidate A provides more directly.

Coverage: Candidate A covers the triggered values and adds the immediate action layer requested by the task.

Specificity: Candidate A is more specific about what to do next for the top two flags.

Policy recommendation: For small results, prompt/cap policy should not grant task-aware an automatic evidence advantage; decide on explanation quality, omissions, unsupported claims, and proportionality.

Rerun flags:
- task_aware_data_summarization / missing_action_recommendations (minor): Candidate B explains the flags but does not provide concrete immediate actions.

### A-S08 - Student intervention recommendation

Pairwise winner: baseline_first_20_rows
AB/BA consistency: consistent (baseline_first_20_rows / baseline_first_20_rows)
Rows: 1 (<=20)

Main reason: Candidate A is the only one that engages with the returned FE signals.

Coverage: Candidate A uses more of the returned FE signal evidence.

Specificity: Candidate A provides concrete signal names and values, unlike candidate B.

Policy recommendation: For small results, prompt/cap policy should not grant task-aware an automatic evidence advantage; decide on explanation quality, omissions, unsupported claims, and proportionality.

Rerun flags:
- both / missing_actor_deadline_action_plan (major): Neither candidate provides 3-5 ranked admin actions with responsible actor and timing.

### S-T01 - Score trend analysis

Pairwise winner: task_aware_data_summarization
AB/BA consistency: consistent (task_aware_data_summarization / task_aware_data_summarization)
Rows: 3 (<=20)

Main reason: These details make candidate B's trend and threshold interpretation more complete.

Coverage: Candidate B covers improvement, plateau, pass threshold, and target threshold more completely.

Specificity: Candidate B includes the explicit +55 point change and all-below-target observation.

Policy recommendation: For small results, prompt/cap policy should not grant task-aware an automatic evidence advantage; decide on explanation quality, omissions, unsupported claims, and proportionality.

### S-T09 - Lifestyle risk vs performance

Pairwise winner: task_aware_data_summarization
AB/BA consistency: consistent (task_aware_data_summarization / task_aware_data_summarization)
Rows: 649 (>20)
Derived-stat evidence: pass; lifestyle_risk_score vs avg_score; r=-0.1041; reason=n/a

Main reason: Candidate B directly uses the deterministic coefficient and strength.

Coverage: Candidate B uses the coefficient and weak-strength evidence, but both miss the selected student's concrete position.

Specificity: Candidate B is more specific because it reports r = -0.1041.

Policy recommendation: Prompt V3 should include deterministic derived-stat evidence and forbid unsupported_claim penalties when a stated coefficient matches the recomputed Pearson value.

Rerun flags:
- both / missing_selected_student_position (minor): Neither candidate compares the selected student's position against the class scatter concretely.

### S-T12 - Procrastination analysis

Pairwise winner: baseline_first_20_rows
AB/BA consistency: consistent (baseline_first_20_rows / baseline_first_20_rows)
Rows: 4 (<=20)

Main reason: This requirement exposes a shared weakness, with candidate A only slightly ahead for score detail.

Coverage: Candidate A covers more returned fields, but still misses the primary delay metric.

Specificity: Candidate A is more specific about assessment scores.

Policy recommendation: For small results, prompt/cap policy should not grant task-aware an automatic evidence advantage; decide on explanation quality, omissions, unsupported claims, and proportionality.

Rerun flags:
- both / missing_primary_delay_metric (major): Neither candidate uses submission_delay_avg as the primary delay metric.

### S-T13 - Action plan generation

Pairwise winner: baseline_first_20_rows
AB/BA consistency: consistent (baseline_first_20_rows / baseline_first_20_rows)
Rows: 1 (<=20)

Main reason: Candidate A is the only candidate using these returned FE signals.

Coverage: Candidate A uses the FE signals present in the record.

Specificity: Candidate A gives exact score and engagement values.

Policy recommendation: For small results, prompt/cap policy should not grant task-aware an automatic evidence advantage; decide on explanation quality, omissions, unsupported claims, and proportionality.

Rerun flags:
- baseline_first_20_rows / incomplete_action_plan (minor): Candidate A still does not produce 3-5 prioritized actions tied to FE triggers.
- task_aware_data_summarization / unsupported_no_recommendation_claim (major): Candidate B says no specific recommendations are available despite returned FE risk signals.

### S-T14 - Social balance vs performance

Pairwise winner: task_aware_data_summarization
AB/BA consistency: consistent (task_aware_data_summarization / task_aware_data_summarization)
Rows: 649 (>20)
Derived-stat evidence: pass; social_balance_score vs avg_score; r=0.0144; reason=n/a

Main reason: The near-zero coefficient supports candidate B's weak-positive interpretation over candidate A's stronger wording.

Coverage: Candidate B uses the derived Pearson coefficient and weak-strength context.

Specificity: Candidate B provides the exact coefficient and a correctly cautious interpretation.

Policy recommendation: Prompt V3 should include deterministic derived-stat evidence and forbid unsupported_claim penalties when a stated coefficient matches the recomputed Pearson value.

Rerun flags:
- baseline_first_20_rows / overstated_association (major): Candidate A describes social balance as supporting academic success even though r = 0.0144 is nearly zero.

### S-T15 - Family context vs performance

Pairwise winner: task_aware_data_summarization
AB/BA consistency: consistent (task_aware_data_summarization / task_aware_data_summarization)
Rows: 649 (>20)
Derived-stat evidence: pass; family_stability_score vs avg_score; r=0.1442; reason=n/a

Main reason: This directly refutes candidate A's negative-correlation claim.

Coverage: Candidate B uses the deterministic full-result coefficient; candidate A contradicts it.

Specificity: Candidate B gives the exact r value and correct weak-positive direction.

Policy recommendation: Prompt V3 should include deterministic derived-stat evidence and forbid unsupported_claim penalties when a stated coefficient matches the recomputed Pearson value.

Rerun flags:
- baseline_first_20_rows / wrong_correlation_direction (critical): Candidate A says the relationship is negative, but deterministic Pearson evidence is positive at 0.1442.

## Rerun Recommendation

Before rerunning all 104 UCI pointwise records, update the pointwise judge prompt/cap guidance to include the prompt and cap policy decisions above. Because these changes affect global judging behavior, the cleaner thesis-facing path is to rerun all 104 UCI records under a new V3/calibrated-dry-run version rather than patch only correlation records. The UCI V3 pointwise rerun should be accepted only if it aligns with the pairwise dry-run winner on at least 12 of the 15 dry-run task pairs and has no unresolved critical derived-stat contradiction.

