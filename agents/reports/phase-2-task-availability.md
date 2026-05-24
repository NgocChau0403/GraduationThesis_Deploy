# Phase 2 Task Availability Validation Report

- Mode: TASK AVAILABILITY VALIDATION ONLY (no code change, no log change, no fix)
- Runtime evidence scope: `validateOneTaskController`, `runAnalyticsController`, `capabilityValidator.service.js`, `canonicalCapability.service.js`, Layer A/B/C/D, `deriveStatus`.
- Tasks covered: 57

## Runtime Baseline
- `validateOneTaskController` resolves `{batchId, sourceDataset}` then calls `capabilityValidator.validateTask(taskId, ctx)`.
- `runAnalyticsController` re-validates before execute; only `unsupported` is hard-blocked (422). `partial` and `insufficient_data` still run with warnings.
- `deriveStatus`: structural fail => unsupported; semantic fail => partial; data_sufficiency fail => insufficient_data; else executable.

## Priority Group: Risk / at-risk

Task:
A-B04 - At-risk overview
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, engagement_tracking.
Current registry metadata:
requiredCapabilities=assessment_scores,engagement_tracking; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=hide_task; availability_contract=absent
Problem:
hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode).
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
at_risk_label, student_count, assessment_result.score_normalized, engagement.engagement_count, enrollment.*, assessment_result.*, assessment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, engagement_tracking), Layer A/B/D pass, and required output fields present (at_risk_label, student_count).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Medium
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-C03 - Compare risk profile
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, engagement_tracking, multi_student_comparison.
Current registry metadata:
requiredCapabilities=assessment_scores,engagement_tracking,multi_student_comparison; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
Problem:
Has dataset-specific gating (generalization risk). Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode).
Dataset-specific dependency:
registry datasetCompatibility=OULAD_only; availability_contract.dataset_specific=OULAD
Schema-based required fields:
student_id, at_risk_score, at_risk_label, assessment_result.score_normalized, engagement.engagement_count, enrollment.student_id, enrollment.*, assessment_result.*, assessment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, assessment_result.score_normalized, assessment_result.result_id
Optional fields:
avg_score, performance_trend, punctuality_rate, engagement_score, previous_attempt_count, flag_low_score, flag_repeated, flag_low_engagement, flag_low_punctuality, flag_neg_trend, final_outcome
Full mode:
All required capabilities satisfied (assessment_scores, engagement_tracking, multi_student_comparison), Layer A/B/D pass, and required output fields present (student_id, at_risk_score, at_risk_label).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency.

Task:
A-G03 - Identify at-risk cohort
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores.
Current registry metadata:
requiredCapabilities=assessment_scores; optionalCapabilities=engagement_tracking,absence_tracking; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
student_id, avg_score, at_risk_score, at_risk_label, triggered_flags, assessment_result.score_normalized, enrollment.*, assessment_result.*, assessment.*, engagement.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
enrollment_id, score_strategy, score_scale, pass_threshold, target_threshold, engagement_score, engagement_score_available, punctuality_rate, previous_attempt_count, triggered_flags_summary, primary_support_category, recommended_admin_action, flag_low_score, flag_repeated, flag_low_engagement, flag_low_punctuality, flag_neg_trend, final_outcome, engagement.engagement_count, enrollment.absences
Full mode:
All required capabilities satisfied (assessment_scores), Layer A/B/D pass, and required output fields present (student_id, avg_score, at_risk_score, at_risk_label, triggered_flags).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Keep current runtime logic; improve unavailable reason text clarity and surface layer-level evidence to UI.

Task:
A-G13 - Lifestyle risk across cohort
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, lifestyle_factors.
Current registry metadata:
requiredCapabilities=assessment_scores,lifestyle_factors; optionalCapabilities=[]; datasetCompatibility=UCI_only; fallbackStrategy=show_partial_data; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). Depends on dataset name in SQL, not only schema/capability. Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
SQL hard-coded source_dataset=UCI; registry datasetCompatibility=UCI_only
Schema-based required fields:
lifestyle_risk_score, avg_score, assessment_result.score_normalized, student.lifestyle_risk_score, student.free_time, student.health_status, student.*, enrollment.*, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, lifestyle_factors), Layer A/B/D pass, and required output fields present (lifestyle_risk_score, avg_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_partial_data.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-G15 - Intervention priority ranking
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, engagement_tracking.
Current registry metadata:
requiredCapabilities=assessment_scores,engagement_tracking; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). Depends on dataset name in SQL, not only schema/capability. hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract. Table task lacks explicit output contract, making availability rationale weaker.
Dataset-specific dependency:
SQL hard-coded source_dataset=OULAD; registry datasetCompatibility=OULAD_only
Schema-based required fields:
student_id, at_risk_score, assessment_result.score_normalized, engagement.engagement_count, enrollment.*, assessment_result.*, assessment.*, engagement.*, student.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, engagement_tracking), Layer A/B/D pass, and required output fields present (student_id, at_risk_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
Critical
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-G19 - Assessment completion rate
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores.
Current registry metadata:
requiredCapabilities=assessment_scores; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
assessment_order, assessment_name, completion_rate, submissions_count, pending_count, completion_rank, assessment_result.score_normalized, assessment.*, assessment_result.*, enrollment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
assessment_type, expected_students, completion_gap, completion_status
Full mode:
All required capabilities satisfied (assessment_scores), Layer A/B/D pass, and required output fields present (assessment_order, assessment_name, completion_rate, submissions_count, pending_count, completion_rank).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Keep current runtime logic; improve unavailable reason text clarity and surface layer-level evidence to UI.

Task:
A-S04 - Student risk flag breakdown
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, absence_tracking.
Current registry metadata:
requiredCapabilities=assessment_scores,absence_tracking; optionalCapabilities=[]; datasetCompatibility=UCI_only; fallbackStrategy=hide_task; availability_contract=present
Problem:
Has dataset-specific gating (generalization risk). Table task lacks explicit output contract, making availability rationale weaker.
Dataset-specific dependency:
registry datasetCompatibility=UCI_only; availability_contract.dataset_specific=UCI
Schema-based required fields:
flag_name, flag_value, assessment_result.score_normalized, enrollment.absences, enrollment.*, assessment_result.*, assessment.*, engagement.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, absence_tracking), Layer A/B/D pass, and required output fields present (flag_name, flag_value).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-S08 - Student intervention recommendation
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, engagement_tracking.
Current registry metadata:
requiredCapabilities=assessment_scores,engagement_tracking; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
Problem:
Has dataset-specific gating (generalization risk). Depends on dataset name in SQL, not only schema/capability. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Table task lacks explicit output contract, making availability rationale weaker.
Dataset-specific dependency:
SQL hard-coded source_dataset=OULAD; registry datasetCompatibility=OULAD_only; availability_contract.dataset_specific=OULAD
Schema-based required fields:
assessment_result.score_normalized, engagement.engagement_count, enrollment.*, student.*, assessment_result.*, assessment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, engagement_tracking), Layer A/B/D pass, and required output fields present (UNKNOWN).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
Critical
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-B02 - Risk status card
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores.
Current registry metadata:
requiredCapabilities=assessment_scores; optionalCapabilities=engagement_tracking; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
avg_score, at_risk_score, at_risk_label, assessment_result.score_normalized, enrollment.*, assessment_result.*, assessment.*, engagement.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
engagement_score, engagement_score_available, punctuality_rate, previous_attempt_count, score_strategy, score_scale, pass_threshold, target_threshold, engagement.engagement_count
Full mode:
All required capabilities satisfied (assessment_scores), Layer A/B/D pass, and required output fields present (avg_score, at_risk_score, at_risk_label).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Keep current runtime logic; improve unavailable reason text clarity and surface layer-level evidence to UI.

Task:
S-T04 - At-risk self-check
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores.
Current registry metadata:
requiredCapabilities=assessment_scores; optionalCapabilities=engagement_tracking,absence_tracking; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
flag_name, flag_value, threshold, triggered, assessment_result.score_normalized, enrollment.*, assessment_result.*, assessment.*, engagement.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
severity, flag_description, recommended_action, support_category, engagement.engagement_count, enrollment.absences
Full mode:
All required capabilities satisfied (assessment_scores), Layer A/B/D pass, and required output fields present (flag_name, flag_value, threshold, triggered).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Keep current runtime logic; improve unavailable reason text clarity and surface layer-level evidence to UI.

Task:
S-T09 - Lifestyle risk vs performance
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, lifestyle_factors.
Current registry metadata:
requiredCapabilities=assessment_scores,lifestyle_factors; optionalCapabilities=[]; datasetCompatibility=UCI_only; fallbackStrategy=hide_task; availability_contract=present
Problem:
Has dataset-specific gating (generalization risk).
Dataset-specific dependency:
registry datasetCompatibility=UCI_only; availability_contract.dataset_specific=UCI
Schema-based required fields:
lifestyle_risk_score, avg_score, assessment_result.score_normalized, student.lifestyle_risk_score, student.free_time, student.health_status, student.*, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, lifestyle_factors), Layer A/B/D pass, and required output fields present (lifestyle_risk_score, avg_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

## Priority Group: Score / performance

Task:
A-B01 - Overall performance distribution
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, final_outcome.
Current registry metadata:
requiredCapabilities=assessment_scores,final_outcome; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
score_bucket, student_count, assessment_result.score_normalized, enrollment.final_outcome, assessment_result.*, assessment.*, enrollment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
pct_of_class, dataset_source, avg_score_in_bucket
Full mode:
All required capabilities satisfied (assessment_scores, final_outcome), Layer A/B/D pass, and required output fields present (score_bucket, student_count).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Keep current runtime logic; improve unavailable reason text clarity and surface layer-level evidence to UI.

Task:
A-C01 - Compare performance trajectories
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, multi_student_comparison.
Current registry metadata:
requiredCapabilities=assessment_scores,multi_student_comparison; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
assessment_order, score_normalized, student_id, assessment_result.score_normalized, enrollment.student_id, assessment_result.*, assessment.*, enrollment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, multi_student_comparison), Layer A/B/D pass, and required output fields present (assessment_order, score_normalized, student_id).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-C02 - Compare engagement patterns
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps engagement_tracking, multi_student_comparison.
Current registry metadata:
requiredCapabilities=engagement_tracking,multi_student_comparison; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
Problem:
Has dataset-specific gating (generalization risk). Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode).
Dataset-specific dependency:
registry datasetCompatibility=OULAD_only; availability_contract.dataset_specific=OULAD
Schema-based required fields:
student_id, metric, engagement_score, engagement.engagement_count, enrollment.student_id, enrollment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present
Optional fields:
total_clicks, active_days, study_effort_level
Full mode:
All required capabilities satisfied (engagement_tracking, multi_student_comparison), Layer A/B/D pass, and required output fields present (student_id, metric, engagement_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency.

Task:
A-C04 - Compare lifestyle context
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, lifestyle_factors, multi_student_comparison.
Current registry metadata:
requiredCapabilities=assessment_scores,lifestyle_factors,multi_student_comparison; optionalCapabilities=[]; datasetCompatibility=UCI_only; fallbackStrategy=show_empty_state; availability_contract=present
Problem:
Has dataset-specific gating (generalization risk).
Dataset-specific dependency:
registry datasetCompatibility=UCI_only; availability_contract.dataset_specific=UCI
Schema-based required fields:
student_id, lifestyle_dimension, lifestyle_risk_score, assessment_result.score_normalized, student.lifestyle_risk_score, student.free_time, student.health_status, enrollment.student_id, student.*, enrollment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
alcohol_weekday, alcohol_weekend, go_out_freq, health_status, free_time, composite_lifestyle_risk_score, social_balance_score
Full mode:
All required capabilities satisfied (assessment_scores, lifestyle_factors, multi_student_comparison), Layer A/B/D pass, and required output fields present (student_id, lifestyle_dimension, lifestyle_risk_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability).

Task:
A-C05 - Compare academic background
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps socioeconomic_context, multi_student_comparison.
Current registry metadata:
requiredCapabilities=socioeconomic_context,multi_student_comparison; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=hide_task; availability_contract=present
Problem:
hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Table task lacks explicit output contract, making availability rationale weaker.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
student_id, disadvantage_score, student.socioeconomic_band, student.imd_score_numeric, student.disadvantage_score, enrollment.student_id, student.*, enrollment.*
Schema-based at-least-one-of fields:
NONE
Optional fields:
NONE
Full mode:
All required capabilities satisfied (socioeconomic_context, multi_student_comparison), Layer A/B/D pass, and required output fields present (student_id, disadvantage_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Medium
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-G02 - Engagement–performance relationship
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, engagement_tracking.
Current registry metadata:
requiredCapabilities=assessment_scores,engagement_tracking; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
Problem:
Has dataset-specific gating (generalization risk). Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode).
Dataset-specific dependency:
registry datasetCompatibility=OULAD_only; availability_contract.dataset_specific=OULAD
Schema-based required fields:
engagement_score, avg_score, final_outcome, assessment_result.score_normalized, engagement.engagement_count, enrollment.*, assessment_result.*, assessment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, engagement_tracking), Layer A/B/D pass, and required output fields present (engagement_score, avg_score, final_outcome).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-G07 - Factor correlation analysis
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, engagement_tracking.
Current registry metadata:
requiredCapabilities=assessment_scores,engagement_tracking; optionalCapabilities=demographics; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). Depends on dataset name in SQL, not only schema/capability. hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
SQL hard-coded source_dataset=OULAD; registry datasetCompatibility=OULAD_only
Schema-based required fields:
feature_name, correlation_with_avg_score, assessment_result.score_normalized, engagement.engagement_count, enrollment.*, assessment_result.*, assessment.*, engagement.*, student.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, assessment_result.score_normalized, assessment_result.result_id
Optional fields:
n_samples, abs_correlation_rank, student.gender, student.age_years, student.region
Full mode:
All required capabilities satisfied (assessment_scores, engagement_tracking), Layer A/B/D pass, and required output fields present (feature_name, correlation_with_avg_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
Critical
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency.

Task:
A-G08 - Background group performance & engagement profile
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, engagement_tracking, demographics.
Current registry metadata:
requiredCapabilities=assessment_scores,engagement_tracking,demographics; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
Problem:
Has dataset-specific gating (generalization risk). Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode).
Dataset-specific dependency:
registry datasetCompatibility=OULAD_only; availability_contract.dataset_specific=OULAD
Schema-based required fields:
group_value, avg_score, assessment_result.score_normalized, engagement.engagement_count, student.gender, student.age_years, student.region, student.*, enrollment.*, assessment_result.*, assessment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, engagement_tracking, demographics), Layer A/B/D pass, and required output fields present (group_value, avg_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-G09 - Socioeconomic disadvantage impact
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, demographics.
Current registry metadata:
requiredCapabilities=assessment_scores,demographics; optionalCapabilities=socioeconomic_context; datasetCompatibility=OULAD_only; fallbackStrategy=show_partial_data; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). Depends on dataset name in SQL, not only schema/capability. Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
SQL hard-coded source_dataset=OULAD; registry datasetCompatibility=OULAD_only
Schema-based required fields:
disadvantage_score, avg_score, final_outcome, assessment_result.score_normalized, student.gender, student.age_years, student.region, student.*, enrollment.*, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
student.socioeconomic_band, student.imd_score_numeric, student.disadvantage_score
Full mode:
All required capabilities satisfied (assessment_scores, demographics), Layer A/B/D pass, and required output fields present (disadvantage_score, avg_score, final_outcome).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_partial_data.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-G10 - Consistency analysis across cohort
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps engagement_tracking, temporal_activity.
Current registry metadata:
requiredCapabilities=engagement_tracking,temporal_activity; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). Depends on dataset name in SQL, not only schema/capability. hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
SQL hard-coded source_dataset=OULAD; registry datasetCompatibility=OULAD_only
Schema-based required fields:
consistency_level, student_count, engagement.engagement_count, engagement.week_number, engagement.event_day, enrollment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, engagement.week_number, engagement.event_day
Optional fields:
pct_students, avg_weekly_stddev, avg_weekly_clicks, avg_active_weeks
Full mode:
All required capabilities satisfied (engagement_tracking, temporal_activity), Layer A/B/D pass, and required output fields present (consistency_level, student_count).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
Critical
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency.

Task:
A-G16 - Admin action recommendation
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, engagement_tracking.
Current registry metadata:
requiredCapabilities=assessment_scores,engagement_tracking; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
Problem:
Has dataset-specific gating (generalization risk). Depends on dataset name in SQL, not only schema/capability. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Table task lacks explicit output contract, making availability rationale weaker.
Dataset-specific dependency:
SQL hard-coded source_dataset=OULAD; registry datasetCompatibility=OULAD_only; availability_contract.dataset_specific=OULAD
Schema-based required fields:
assessment_result.score_normalized, engagement.engagement_count, enrollment.*, assessment_result.*, assessment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, engagement_tracking), Layer A/B/D pass, and required output fields present (UNKNOWN).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
Critical
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-G18 - Class performance trend
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores.
Current registry metadata:
requiredCapabilities=assessment_scores; optionalCapabilities=final_outcome; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
assessment_order, class_avg_score, pass_rate, completion_rate, assessment_result.score_normalized, assessment.*, assessment_result.*, enrollment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
assessment_name, assessment_type, week_of_class, submissions_count, score_scale, pass_threshold, target_threshold, enrollment.final_outcome
Full mode:
All required capabilities satisfied (assessment_scores), Layer A/B/D pass, and required output fields present (assessment_order, class_avg_score, pass_rate, completion_rate).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Keep current runtime logic; improve unavailable reason text clarity and surface layer-level evidence to UI.

Task:
A-S01 - Student full profile snapshot
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, engagement_tracking.
Current registry metadata:
requiredCapabilities=assessment_scores,engagement_tracking; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). Depends on dataset name in SQL, not only schema/capability. hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract. Table task lacks explicit output contract, making availability rationale weaker.
Dataset-specific dependency:
SQL hard-coded source_dataset=OULAD; registry datasetCompatibility=OULAD_only
Schema-based required fields:
assessment_result.score_normalized, engagement.engagement_count, student.*, enrollment.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, engagement_tracking), Layer A/B/D pass, and required output fields present (UNKNOWN).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
Critical
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-S02 - Student score trend
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, submission_history.
Current registry metadata:
requiredCapabilities=assessment_scores,submission_history; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
assessment_order, score_normalized, assessment_result.score_normalized, assessment_result.assessment_id, assessment_result.student_id, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, submission_history), Layer A/B/D pass, and required output fields present (assessment_order, score_normalized).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-S06 - Student submission & punctuality
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps submission_timestamps.
Current registry metadata:
requiredCapabilities=submission_timestamps; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=hide_task; availability_contract=present
Problem:
hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
assessment_order, submission_delay_days, assessment_result.submission_day, assessment.due_day, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.submission_day, assessment.due_day
Optional fields:
NONE
Full mode:
All required capabilities satisfied (submission_timestamps), Layer A/B/D pass, and required output fields present (assessment_order, submission_delay_days).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Medium
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-S07 - Student background context
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, demographics, lifestyle_factors.
Current registry metadata:
requiredCapabilities=assessment_scores,demographics,lifestyle_factors; optionalCapabilities=family_context; datasetCompatibility=UCI_only; fallbackStrategy=show_partial_data; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). Depends on dataset name in SQL, not only schema/capability. Legacy datasetCompatibility used without explicit schema contract. Table task lacks explicit output contract, making availability rationale weaker.
Dataset-specific dependency:
SQL hard-coded source_dataset=UCI; registry datasetCompatibility=UCI_only
Schema-based required fields:
assessment_result.score_normalized, student.gender, student.age_years, student.region, student.lifestyle_risk_score, student.free_time, student.health_status, student.*, enrollment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
student.family_size, student.family_support_flag, student.family_stability_score
Full mode:
All required capabilities satisfied (assessment_scores, demographics, lifestyle_factors), Layer A/B/D pass, and required output fields present (UNKNOWN).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_partial_data.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-B01 - Performance overview
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, final_outcome.
Current registry metadata:
requiredCapabilities=assessment_scores,final_outcome; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
avg_score, pass_rate, performance_trend, final_outcome, assessment_result.score_normalized, enrollment.final_outcome, enrollment.*, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
class_avg_score, score_percentile, unweighted_avg_score, weighted_avg_score, score_strategy, assessment_count, score_vs_class_avg, cohort_size, score_scale, pass_threshold, target_threshold, performance_band
Full mode:
All required capabilities satisfied (assessment_scores, final_outcome), Layer A/B/D pass, and required output fields present (avg_score, pass_rate, performance_trend, final_outcome).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Keep current runtime logic; improve unavailable reason text clarity and surface layer-level evidence to UI.

Task:
S-T00 - Score prediction (What-If)
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, engagement_tracking.
Current registry metadata:
requiredCapabilities=assessment_scores,engagement_tracking; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
Problem:
Has dataset-specific gating (generalization risk). Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode).
Dataset-specific dependency:
registry datasetCompatibility=OULAD_only; availability_contract.dataset_specific=OULAD
Schema-based required fields:
engagement_score, avg_score, assessment_result.score_normalized, engagement.engagement_count, enrollment.*, assessment_result.*, assessment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, engagement_tracking), Layer A/B/D pass, and required output fields present (engagement_score, avg_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-T01 - Score trend analysis
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, submission_history.
Current registry metadata:
requiredCapabilities=assessment_scores,submission_history; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
assessment_order, score_normalized, pass_flag, assessment_result.score_normalized, assessment_result.assessment_id, assessment_result.student_id, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
week_of_class, assessment_type, assessment_name, class_avg_score, score_vs_class_avg, score_scale, pass_threshold, target_threshold, below_pass_threshold, below_target_threshold, performance_trend, support_level, recommended_action
Full mode:
All required capabilities satisfied (assessment_scores, submission_history), Layer A/B/D pass, and required output fields present (assessment_order, score_normalized, pass_flag).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Keep current runtime logic; improve unavailable reason text clarity and surface layer-level evidence to UI.

Task:
S-T03 - Peer comparison
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, multi_student_comparison.
Current registry metadata:
requiredCapabilities=assessment_scores,multi_student_comparison; optionalCapabilities=engagement_tracking; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
score_percentile, dimension, assessment_result.score_normalized, enrollment.student_id, enrollment.*, assessment_result.*, assessment.*, engagement.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
engagement.engagement_count
Full mode:
All required capabilities satisfied (assessment_scores, multi_student_comparison), Layer A/B/D pass, and required output fields present (score_percentile, dimension).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-T06 - Study consistency check
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps engagement_tracking, temporal_activity.
Current registry metadata:
requiredCapabilities=engagement_tracking,temporal_activity; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
registry datasetCompatibility=OULAD_only
Schema-based required fields:
week_number, weekly_clicks, engagement.engagement_count, engagement.week_number, engagement.event_day, enrollment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, engagement.week_number, engagement.event_day
Optional fields:
NONE
Full mode:
All required capabilities satisfied (engagement_tracking, temporal_activity), Layer A/B/D pass, and required output fields present (week_number, weekly_clicks).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-T07 - Absence / inactivity impact
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, absence_tracking.
Current registry metadata:
requiredCapabilities=assessment_scores,absence_tracking; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=hide_task; availability_contract=present
Problem:
Depends on dataset name in SQL, not only schema/capability.
Dataset-specific dependency:
SQL hard-coded source_dataset=UCI; availability_contract.dataset_specific=UCI
Schema-based required fields:
assessment_order, score_normalized, assessment_result.score_normalized, enrollment.absences, enrollment.*, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, absence_tracking), Layer A/B/D pass, and required output fields present (assessment_order, score_normalized).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
Critical
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-T08 - Assessment lateness impact
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps submission_timestamps.
Current registry metadata:
requiredCapabilities=submission_timestamps; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=hide_task; availability_contract=present
Problem:
hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
submission_delay_days, score_normalized, pass_flag, assessment_result.submission_day, assessment.due_day, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.submission_day, assessment.due_day
Optional fields:
NONE
Full mode:
All required capabilities satisfied (submission_timestamps), Layer A/B/D pass, and required output fields present (submission_delay_days, score_normalized, pass_flag).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Medium
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-T11 - Registration timing vs performance
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, registration_timing.
Current registry metadata:
requiredCapabilities=assessment_scores,registration_timing; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=present
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
registration_lead_time, avg_score, assessment_result.score_normalized, enrollment.registration_lead_time, enrollment.*, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, registration_timing), Layer A/B/D pass, and required output fields present (registration_lead_time, avg_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-T12 - Procrastination analysis
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, submission_timestamps.
Current registry metadata:
requiredCapabilities=assessment_scores,submission_timestamps; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=hide_task; availability_contract=present
Problem:
hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
assessment_order, submission_delay_days, assessment_result.score_normalized, assessment_result.submission_day, assessment.due_day, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id, assessment_result.submission_day, assessment.due_day
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, submission_timestamps), Layer A/B/D pass, and required output fields present (assessment_order, submission_delay_days).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Medium
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-T13 - Action plan generation
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores.
Current registry metadata:
requiredCapabilities=assessment_scores; optionalCapabilities=engagement_tracking; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
Table task lacks explicit output contract, making availability rationale weaker.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
assessment_result.score_normalized, enrollment.*, student.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
engagement.engagement_count
Full mode:
All required capabilities satisfied (assessment_scores), Layer A/B/D pass, and required output fields present (UNKNOWN).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-T14 - Social balance vs performance
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, lifestyle_factors.
Current registry metadata:
requiredCapabilities=assessment_scores,lifestyle_factors; optionalCapabilities=[]; datasetCompatibility=UCI_only; fallbackStrategy=hide_task; availability_contract=present
Problem:
Has dataset-specific gating (generalization risk).
Dataset-specific dependency:
registry datasetCompatibility=UCI_only; availability_contract.dataset_specific=UCI
Schema-based required fields:
social_balance_score, avg_score, assessment_result.score_normalized, student.lifestyle_risk_score, student.free_time, student.health_status, student.*, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, lifestyle_factors), Layer A/B/D pass, and required output fields present (social_balance_score, avg_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-T15 - Family context vs performance
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, family_context.
Current registry metadata:
requiredCapabilities=assessment_scores,family_context; optionalCapabilities=[]; datasetCompatibility=UCI_only; fallbackStrategy=hide_task; availability_contract=present
Problem:
Has dataset-specific gating (generalization risk).
Dataset-specific dependency:
registry datasetCompatibility=UCI_only; availability_contract.dataset_specific=UCI
Schema-based required fields:
family_stability_score, avg_score, assessment_result.score_normalized, student.family_size, student.family_support_flag, student.family_stability_score, student.*, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, family_context), Layer A/B/D pass, and required output fields present (family_stability_score, avg_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-T16 - Grade goal calculator
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores.
Current registry metadata:
requiredCapabilities=assessment_scores; optionalCapabilities=assessment_weights; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
current_score, needed_score_for_pass, needed_score_for_target, pass_goal_status, target_goal_status, remaining_assessments, calculation_mode, assessment_result.score_normalized, assessment.*, assessment_result.*, enrollment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
score_scale, pass_threshold, target_threshold, completed_assessments, completed_weight_pct, remaining_weight_pct
Full mode:
All required capabilities satisfied (assessment_scores), Layer A/B/D pass, and required output fields present (current_score, needed_score_for_pass, needed_score_for_target, pass_goal_status, target_goal_status, remaining_assessments, calculation_mode).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Keep current runtime logic; improve unavailable reason text clarity and surface layer-level evidence to UI.

## Priority Group: Engagement

Task:
A-B03 - Engagement distribution
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps engagement_tracking.
Current registry metadata:
requiredCapabilities=engagement_tracking; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). Depends on dataset name in SQL, not only schema/capability. hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
SQL hard-coded source_dataset=OULAD; registry datasetCompatibility=OULAD_only
Schema-based required fields:
study_effort_level, student_count, engagement.engagement_count, enrollment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present
Optional fields:
pct_of_class, avg_engagement_score
Full mode:
All required capabilities satisfied (engagement_tracking), Layer A/B/D pass, and required output fields present (study_effort_level, student_count).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
Critical
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency.

Task:
A-C06 - Compare resource usage
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps engagement_tracking, resource_clickstream, multi_student_comparison.
Current registry metadata:
requiredCapabilities=engagement_tracking,resource_clickstream,multi_student_comparison; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
registry datasetCompatibility=OULAD_only
Schema-based required fields:
resource_type, pct_of_total, student_id, engagement.engagement_count, event.resource_type, enrollment.student_id, enrollment.*, engagement.*, event.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present
Optional fields:
NONE
Full mode:
All required capabilities satisfied (engagement_tracking, resource_clickstream, multi_student_comparison), Layer A/B/D pass, and required output fields present (resource_type, pct_of_total, student_id).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-G01 - Identify low-engagement group
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps engagement_tracking.
Current registry metadata:
requiredCapabilities=engagement_tracking; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
registry datasetCompatibility=OULAD_only
Schema-based required fields:
active_days, engagement_score, study_effort_level, engagement.engagement_count, enrollment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present
Optional fields:
NONE
Full mode:
All required capabilities satisfied (engagement_tracking), Layer A/B/D pass, and required output fields present (active_days, engagement_score, study_effort_level).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-G06 - Activity type effectiveness
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps engagement_tracking, resource_clickstream.
Current registry metadata:
requiredCapabilities=engagement_tracking,resource_clickstream; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). Depends on dataset name in SQL, not only schema/capability. hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
SQL hard-coded source_dataset=OULAD; registry datasetCompatibility=OULAD_only
Schema-based required fields:
resource_type, avg_score_by_resource_type, engagement.engagement_count, event.resource_type, enrollment.*, engagement.*, event.*, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present
Optional fields:
NONE
Full mode:
All required capabilities satisfied (engagement_tracking, resource_clickstream), Layer A/B/D pass, and required output fields present (resource_type, avg_score_by_resource_type).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
Critical
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-G11 - Weekly engagement drop detection
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps engagement_tracking, temporal_activity.
Current registry metadata:
requiredCapabilities=engagement_tracking,temporal_activity; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). Depends on dataset name in SQL, not only schema/capability. hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
SQL hard-coded source_dataset=OULAD; registry datasetCompatibility=OULAD_only
Schema-based required fields:
week_number, week_total_clicks, rolling_3wk_avg, engagement.engagement_count, engagement.week_number, engagement.event_day, enrollment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, engagement.week_number, engagement.event_day
Optional fields:
NONE
Full mode:
All required capabilities satisfied (engagement_tracking, temporal_activity), Layer A/B/D pass, and required output fields present (week_number, week_total_clicks, rolling_3wk_avg).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
Critical
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-S03 - Student engagement trajectory
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps engagement_tracking, temporal_activity.
Current registry metadata:
requiredCapabilities=engagement_tracking,temporal_activity; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
registry datasetCompatibility=OULAD_only
Schema-based required fields:
week_number, weekly_clicks, rolling_3wk_avg, engagement.engagement_count, engagement.week_number, engagement.event_day, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, engagement.week_number, engagement.event_day
Optional fields:
NONE
Full mode:
All required capabilities satisfied (engagement_tracking, temporal_activity), Layer A/B/D pass, and required output fields present (week_number, weekly_clicks, rolling_3wk_avg).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-B03 - Engagement summary
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, engagement_tracking.
Current registry metadata:
requiredCapabilities=assessment_scores,engagement_tracking; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=hide_when_unavailable; availability_contract=absent
Problem:
Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode).
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
total_engagement_count, active_days, engagement_score, class_avg_engagement_score, study_effort_level, assessment_result.score_normalized, engagement.engagement_count, enrollment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, engagement_tracking), Layer A/B/D pass, and required output fields present (total_engagement_count, active_days, engagement_score, class_avg_engagement_score, study_effort_level).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_when_unavailable.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Medium
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Keep current runtime logic; improve unavailable reason text clarity and surface layer-level evidence to UI.

Task:
S-T05 - Weekly engagement trend
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps engagement_tracking, temporal_activity.
Current registry metadata:
requiredCapabilities=engagement_tracking,temporal_activity; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
registry datasetCompatibility=OULAD_only
Schema-based required fields:
week_number, weekly_clicks, engagement.engagement_count, engagement.week_number, engagement.event_day, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, engagement.week_number, engagement.event_day
Optional fields:
NONE
Full mode:
All required capabilities satisfied (engagement_tracking, temporal_activity), Layer A/B/D pass, and required output fields present (week_number, weekly_clicks).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-T10 - Resource engagement breakdown
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps engagement_tracking, resource_clickstream.
Current registry metadata:
requiredCapabilities=engagement_tracking,resource_clickstream; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
registry datasetCompatibility=OULAD_only
Schema-based required fields:
resource_type, clicks, engagement.engagement_count, event.resource_type, engagement.*, event.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present
Optional fields:
NONE
Full mode:
All required capabilities satisfied (engagement_tracking, resource_clickstream), Layer A/B/D pass, and required output fields present (resource_type, clicks).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
High
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

## Priority Group: Assessment

Task:
A-B02 - Completion / outcome summary
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps final_outcome.
Current registry metadata:
requiredCapabilities=final_outcome; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
final_outcome, student_count, enrollment.final_outcome, enrollment.*
Schema-based at-least-one-of fields:
NONE
Optional fields:
NONE
Full mode:
All required capabilities satisfied (final_outcome), Layer A/B/D pass, and required output fields present (final_outcome, student_count).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-G04 - Assessment difficulty analysis
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores.
Current registry metadata:
requiredCapabilities=assessment_scores; optionalCapabilities=competency_tagging,proxy_competency_available; datasetCompatibility=both; fallbackStrategy=show_partial_data; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
assessment_name, fail_rate_pct, assessment_result.score_normalized, assessment_result.*, assessment.*, enrollment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
assessment.competency_tag, assessment.assessment_name
Full mode:
All required capabilities satisfied (assessment_scores), Layer A/B/D pass, and required output fields present (assessment_name, fail_rate_pct).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_partial_data.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-G05 - Submission behaviour analysis
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps submission_history, submission_timestamps.
Current registry metadata:
requiredCapabilities=submission_history,submission_timestamps; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=present
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
final_outcome, assessment_type, submission_delay_avg, late_submission_rate, assessment_result.assessment_id, assessment_result.student_id, assessment_result.submission_day, assessment.due_day, assessment_result.*, assessment.*, enrollment.*
Schema-based at-least-one-of fields:
assessment_result.submission_day, assessment.due_day
Optional fields:
submission_count, student_count, net_submission_delay_avg, punctuality_rate, avg_score, submission_risk_level
Full mode:
All required capabilities satisfied (submission_history, submission_timestamps), Layer A/B/D pass, and required output fields present (final_outcome, assessment_type, submission_delay_avg, late_submission_rate).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Keep current runtime logic; improve unavailable reason text clarity and surface layer-level evidence to UI.

Task:
A-S05 - Student competency gap
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores.
Current registry metadata:
requiredCapabilities=assessment_scores; optionalCapabilities=competency_tagging,proxy_competency_available; datasetCompatibility=both; fallbackStrategy=show_partial_data; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
competency_tag, avg_score, assessment_result.score_normalized, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
assessment.competency_tag, assessment.assessment_name
Full mode:
All required capabilities satisfied (assessment_scores), Layer A/B/D pass, and required output fields present (competency_tag, avg_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_partial_data.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-T02 - Competency gap analysis
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores.
Current registry metadata:
requiredCapabilities=assessment_scores; optionalCapabilities=competency_tagging,proxy_competency_available; datasetCompatibility=both; fallbackStrategy=show_partial_data; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
competency_tag, avg_score, assessment_result.score_normalized, assessment_result.*, assessment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
assessment.competency_tag, assessment.assessment_name
Full mode:
All required capabilities satisfied (assessment_scores), Layer A/B/D pass, and required output fields present (competency_tag, avg_score).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_partial_data.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
S-T17 - Assessment status timeline
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores.
Current registry metadata:
requiredCapabilities=assessment_scores; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
assessment_order, assessment_name, submission_status, submitted_flag, assessment_result.score_normalized, assessment.*, assessment_result.*, enrollment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
assessment_type, week_of_class, due_day, submission_day, score_normalized
Full mode:
All required capabilities satisfied (assessment_scores), Layer A/B/D pass, and required output fields present (assessment_order, assessment_name, submission_status, submitted_flag).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Keep current runtime logic; improve unavailable reason text clarity and surface layer-level evidence to UI.

## Priority Group: Dropout/outcome

Task:
A-G12 - Background group pass/fail/withdrawal rate
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps assessment_scores, final_outcome, demographics.
Current registry metadata:
requiredCapabilities=assessment_scores,final_outcome,demographics; optionalCapabilities=[]; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=absent
Problem:
No critical design smell detected; runtime gating is mostly capability-driven and degradable.
Dataset-specific dependency:
No explicit dataset-name hard-code found; capability/schema-driven mostly
Schema-based required fields:
group_value, student_count, final_outcome, assessment_result.score_normalized, enrollment.final_outcome, student.gender, student.age_years, student.region, student.*, enrollment.*
Schema-based at-least-one-of fields:
assessment_result.score_normalized, assessment_result.result_id
Optional fields:
NONE
Full mode:
All required capabilities satisfied (assessment_scores, final_outcome, demographics), Layer A/B/D pass, and required output fields present (group_value, student_count, final_outcome).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=show_empty_state.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. Import richer data or switch class scope to continue.
Severity:
Low
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Add explicit output_schema.required_columns to stabilize availability + renderer contract.

Task:
A-G14 - Early withdrawal signal analysis
Current runtime availability:
Validation path: validateOneTaskController -> capabilityValidator.validateTask. Layer decisions: A: sourceTables structural existence | B: required_all/required_any + dataset_specific + stored FE checks | C: analytical warnings only | D: enrollment>=5 + assessment_result>=2 (+ engagement positive if engagement_tracking required). deriveStatus maps structural fail=>unsupported, semantic fail=>partial, data_sufficiency fail=>insufficient_data, else executable. Main blockers for this task likely: required caps engagement_tracking, temporal_activity, final_outcome.
Current registry metadata:
requiredCapabilities=engagement_tracking,temporal_activity,final_outcome; optionalCapabilities=[]; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=absent
Problem:
Has dataset-specific gating (generalization risk). Depends on dataset name in SQL, not only schema/capability. hide_task may be too strict; runtime validator can still return partial/insufficient_data with warnings. Engagement hard-required; D-layer can fail to insufficient_data when positive rows absent (could support partial mode). Legacy datasetCompatibility used without explicit schema contract.
Dataset-specific dependency:
SQL hard-coded source_dataset=OULAD; registry datasetCompatibility=OULAD_only
Schema-based required fields:
week_number, avg_clicks, final_outcome, engagement.engagement_count, engagement.week_number, engagement.event_day, enrollment.final_outcome, enrollment.*, engagement.*
Schema-based at-least-one-of fields:
engagement.engagement_count > 0, engagement.event_day present, engagement.week_number, engagement.event_day
Optional fields:
NONE
Full mode:
All required capabilities satisfied (engagement_tracking, temporal_activity, final_outcome), Layer A/B/D pass, and required output fields present (week_number, avg_clicks, final_outcome).
Partial mode:
Allowed when Layer B returns semantic issues or optional capabilities missing; runtime status=partial/insufficient_data can still execute via runAnalyticsController (except structural unsupported). Registry fallbackStrategy=hide_task.
Unavailable condition:
Layer A fail: any source table missing; Layer B semantic unavailable: required capabilities missing OR required_any not satisfied OR dataset_specific mismatch; Layer D hard fail: enrollment<5 OR assessment_result<2; Layer D fail: no positive engagement rows
Unavailable reason message:
Task temporarily unavailable because required data capabilities are missing for current dataset/class. This task has dataset-specific constraints and needs matching schema signals.
Severity:
Critical
Evidence:
validateOneTaskController -> capabilityValidator.validateTask; runAnalyticsController status policy; layerA_structural/layerB_semantic/layerC_analytical/layerD_dataSufficiency; evaluateAvailabilityContract + normalizeAvailabilityContract; deriveStatus mapping.
Recommended change:
Replace/augment datasetCompatibility with explicit availability_contract (required_all/required_any by schema capability). Remove SQL dataset-name predicates where possible; gate by capability snapshot fields instead. Prefer show_unavailable_with_reason or show_partial_with_warnings over hide_task for transparency. Add explicit output_schema.required_columns to stabilize availability + renderer contract.

