# A-G03 Phase 0.5 Combination Isolation Report

## Summary

Investigation-only. Không implement production fix.

Status: FIX CANDIDATE IDENTIFIED

- Fastest combination: **All suspect** (162.42ms).
- Minimal safe set: **score_context, eng_score**.
- All suspect execution: **162.42ms**.

## Context Used

| Param | Value |
| --- | --- |
| context_source | `preferred_context` |
| batch_id | `SAMPLE_UCI_POR` |
| class_id | `SAMPLE_UCI_POR_CLASS` |
| student_id | `SAMPLE_UCI_POR_STU_000001` |
| enrollment_id | `SAMPLE_UCI_POR_ENR_000001` |

## Previous Phase 0 Baseline

Previous Phase 0 baseline found: execution=44,270.28ms, aggregate loops=423,799, hit blocks=12,749,008.

Fresh Phase 0.5 baseline: execution=51,108.65ms, aggregate loops=423,799, hit blocks=12,749,008..

## Variant Definitions

| Variant ID | Label | Materialized CTEs | Artifact |
| --- | --- | --- | --- |
| baseline | Baseline | none | `Debugs/explain/a-g03-phase-0-5-baseline.json` |
| all_suspect | All suspect | `score_context`, `score_agg`, `punctuality`, `eng_agg`, `class_max`, `eng_score`, `risk_flags` | `Debugs/explain/a-g03-phase-0-5-all-suspect.json` |
| combo_01 | combo_01 score_context + eng_score | `score_context`, `eng_score` | `Debugs/explain/a-g03-phase-0-5-combo-01-score-context-eng-score.json` |
| combo_02 | combo_02 score_context + class_max | `score_context`, `class_max` | `Debugs/explain/a-g03-phase-0-5-combo-02-score-context-class-max.json` |
| combo_03 | combo_03 score_context + eng_agg | `score_context`, `eng_agg` | `Debugs/explain/a-g03-phase-0-5-combo-03-score-context-eng-agg.json` |
| combo_04 | combo_04 score_context + risk_flags | `score_context`, `risk_flags` | `Debugs/explain/a-g03-phase-0-5-combo-04-score-context-risk-flags.json` |
| combo_05 | combo_05 score_context + class_max + eng_score | `score_context`, `class_max`, `eng_score` | `Debugs/explain/a-g03-phase-0-5-combo-05-score-context-class-max-eng-score.json` |
| combo_06 | combo_06 score_context + eng_agg + class_max + eng_score | `score_context`, `eng_agg`, `class_max`, `eng_score` | `Debugs/explain/a-g03-phase-0-5-combo-06-score-context-eng-agg-class-max-eng-score.json` |
| combo_07 | combo_07 score_context + eng_agg + eng_score | `score_context`, `eng_agg`, `eng_score` | `Debugs/explain/a-g03-phase-0-5-combo-07-score-context-eng-agg-eng-score.json` |
| combo_08 | combo_08 score_context + eng_agg + class_max | `score_context`, `eng_agg`, `class_max` | `Debugs/explain/a-g03-phase-0-5-combo-08-score-context-eng-agg-class-max.json` |
| combo_09 | combo_09 score_context + eng_score + risk_flags | `score_context`, `eng_score`, `risk_flags` | `Debugs/explain/a-g03-phase-0-5-combo-09-score-context-eng-score-risk-flags.json` |
| combo_10 | combo_10 score_context + class_max + eng_score + risk_flags | `score_context`, `class_max`, `eng_score`, `risk_flags` | `Debugs/explain/a-g03-phase-0-5-combo-10-score-context-class-max-eng-score-risk-flags.json` |
| combo_11 | combo_11 score_context + eng_agg + class_max + eng_score + risk_flags | `score_context`, `eng_agg`, `class_max`, `eng_score`, `risk_flags` | `Debugs/explain/a-g03-phase-0-5-combo-11-score-context-eng-agg-class-max-eng-score-risk-flags.json` |

## Comparison Table

| Variant | Planning ms | Execution ms | Execution reduction vs baseline | Execution vs all_suspect | Shared hit blocks | Shared read blocks | Aggregate node count | Aggregate loops | WindowAgg node count | Window loops | Nested Loop count/loops | assessment_result scan loops | assessment scan loops | engagement scan loops | Output rows | Index names used |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Baseline | 15.32 | 51,108.65 | 0.0% | 314.67x | 12,749,008 | 0 | 5 | 423,799 | 0 | 0 | 12/4,552 | 1,264,901 | 3,794,703 | 649 | 50 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| All suspect | 3.32 | 162.42 | 99.7% | 1.00x | 27,997 | 0 | 5 | 5 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 50 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_01 score_context + eng_score | 3.25 | 347.58 | 99.3% | 2.14x | 27,997 | 0 | 5 | 1,301 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 50 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_02 score_context + class_max | 2.58 | 350.11 | 99.3% | 2.16x | 27,997 | 0 | 5 | 653 | 0 | 0 | 12/660 | 1,947 | 5,841 | 649 | 50 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_03 score_context + eng_agg | 4.22 | 33,018.03 | 35.4% | 203.29x | 27,997 | 0 | 5 | 421,853 | 0 | 0 | 12/660 | 1,947 | 5,841 | 649 | 50 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_04 score_context + risk_flags | 2.41 | 30,726.66 | 39.9% | 189.18x | 27,997 | 0 | 5 | 421,853 | 0 | 0 | 12/660 | 1,947 | 5,841 | 649 | 50 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_05 score_context + class_max + eng_score | 2.53 | 313.49 | 99.4% | 1.93x | 27,997 | 0 | 5 | 653 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 50 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_06 score_context + eng_agg + class_max + eng_score | 4.62 | 418.55 | 99.2% | 2.58x | 27,997 | 0 | 5 | 653 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 50 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_07 score_context + eng_agg + eng_score | 3.94 | 341.49 | 99.3% | 2.10x | 27,997 | 0 | 5 | 1,301 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 50 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_08 score_context + eng_agg + class_max | 3.07 | 353.43 | 99.3% | 2.18x | 27,997 | 0 | 5 | 653 | 0 | 0 | 12/660 | 1,947 | 5,841 | 649 | 50 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_09 score_context + eng_score + risk_flags | 2.20 | 300.91 | 99.4% | 1.85x | 27,997 | 0 | 5 | 1,301 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 50 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_10 score_context + class_max + eng_score + risk_flags | 2.24 | 245.92 | 99.5% | 1.51x | 27,997 | 0 | 5 | 653 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 50 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_11 score_context + eng_agg + class_max + eng_score + risk_flags | 2.38 | 249.65 | 99.5% | 1.54x | 27,997 | 0 | 5 | 653 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 50 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |

## Best Candidates

| Variant | CTEs | CTE count | Execution ms | Exec reduction | Vs all_suspect | Aggregate loop reduction | Hit block ratio vs all_suspect | Candidate |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| combo_01 score_context + eng_score | `score_context`, `eng_score` | 2 | 347.58 | 99.3% | 2.14x | 99.7% | 1.00x | YES |
| combo_02 score_context + class_max | `score_context`, `class_max` | 2 | 350.11 | 99.3% | 2.16x | 99.8% | 1.00x | YES |
| combo_03 score_context + eng_agg | `score_context`, `eng_agg` | 2 | 33,018.03 | 35.4% | 203.29x | 0.5% | 1.00x | NO |
| combo_04 score_context + risk_flags | `score_context`, `risk_flags` | 2 | 30,726.66 | 39.9% | 189.18x | 0.5% | 1.00x | NO |
| combo_05 score_context + class_max + eng_score | `score_context`, `class_max`, `eng_score` | 3 | 313.49 | 99.4% | 1.93x | 99.8% | 1.00x | YES |
| combo_06 score_context + eng_agg + class_max + eng_score | `score_context`, `eng_agg`, `class_max`, `eng_score` | 4 | 418.55 | 99.2% | 2.58x | 99.8% | 1.00x | YES |
| combo_07 score_context + eng_agg + eng_score | `score_context`, `eng_agg`, `eng_score` | 3 | 341.49 | 99.3% | 2.10x | 99.7% | 1.00x | YES |
| combo_08 score_context + eng_agg + class_max | `score_context`, `eng_agg`, `class_max` | 3 | 353.43 | 99.3% | 2.18x | 99.8% | 1.00x | YES |
| combo_09 score_context + eng_score + risk_flags | `score_context`, `eng_score`, `risk_flags` | 3 | 300.91 | 99.4% | 1.85x | 99.7% | 1.00x | YES |
| combo_10 score_context + class_max + eng_score + risk_flags | `score_context`, `class_max`, `eng_score`, `risk_flags` | 4 | 245.92 | 99.5% | 1.51x | 99.8% | 1.00x | YES |
| combo_11 score_context + eng_agg + class_max + eng_score + risk_flags | `score_context`, `eng_agg`, `class_max`, `eng_score`, `risk_flags` | 5 | 249.65 | 99.5% | 1.54x | 99.8% | 1.00x | YES |

Candidate count: **9**.

Minimal safe set: **combo_01 score_context + eng_score (score_context, eng_score)**.

## Hot Plan Nodes

### Baseline

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 50 | 1 | 51,108.28 | 12,749,008 | 0 | - |
| 1 | Result | - | - | 50 | 1 | 51,108.28 | 12,749,008 | 0 | - |
| 2 | Sort | - | - | 50 | 1 | 51,108.19 | 12,749,008 | 0 | - |
| 3 | Nested Loop | - | - | 649 | 1 | 51,105.94 | 12,749,002 | 0 | (ar_2.student_id = ar.student_id) |
| 4 | Nested Loop | - | - | 649 | 1 | 50,945.15 | 12,742,465 | 0 | (e.student_id = ar.student_id) |
| 5 | Nested Loop | - | - | 649 | 1 | 50,865.25 | 12,736,690 | 0 | (ea.student_id = ar.student_id) |
| 6 | Aggregate | - | - | 649 | 1 | 18,496.85 | 12,734,079 | 0 | - |
| 7 | Sort | - | - | 1,947 | 1 | 18,483.06 | 12,734,079 | 0 | - |
| 8 | Nested Loop | - | - | 1,947 | 1 | 18,477.40 | 12,734,076 | 0 | - |
| 10 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 9 | Aggregate | - | - | 1 | 1,947 | 9.48 | 12,727,539 | 0 | - |
| 10 | Nested Loop | - | - | 1,947 | 1,947 | 9.31 | 12,727,539 | 0 | - |
| 11 | Nested Loop | - | - | 1,947 | 1,947 | 4.58 | 5,145,921 | 0 | - |
| 12 | Index Scan | enrollment | enrollment_class_id_idx | 649 | 1,947 | 0.18 | 29,205 | 0 | (class_id = 'SAMPLE_UCI_POR_CLASS'::text) |
| 12 | Index Scan | assessment_result | assessment_result_batch_id_enrollment_id_assessment_id_key | 3 | 1,263,603 | 0.01 | 5,116,716 | 0 | ((batch_id = 'SAMPLE_UCI_POR'::text) AND (enrollment_id = e_2.enrollment_id)) |
| 11 | Index Scan | assessment | assessment_pkey | 1 | 3,790,809 | 0.00 | 7,581,618 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | Aggregate | - | - | 1 | 421,201 | 0.08 | 0 | 0 | - |
| 8 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 7 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

### All suspect

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 4 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 4 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

### combo_01 score_context + eng_score

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 10 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 9 | CTE Scan | sc | - | 1 | 1,947 | 0.01 | 6,537 | 0 | - |
| 7 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |

### combo_02 score_context + class_max

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 10 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 9 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 7 | CTE Scan | cm | - | 1 | 421,201 | 0.00 | 0 | 0 | - |
| 7 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |

### combo_03 score_context + eng_agg

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 50 | 1 | 33,017.73 | 27,997 | 0 | - |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Result | - | - | 50 | 1 | 33,017.72 | 27,997 | 0 | - |
| 2 | Sort | - | - | 50 | 1 | 33,017.64 | 27,997 | 0 | - |
| 3 | Nested Loop | - | - | 649 | 1 | 33,015.36 | 27,997 | 0 | (ar_1.student_id = ar.student_id) |
| 4 | Nested Loop | - | - | 649 | 1 | 32,847.12 | 21,460 | 0 | (e.student_id = ar.student_id) |
| 5 | Nested Loop | - | - | 649 | 1 | 32,765.61 | 15,685 | 0 | (ea.student_id = ar.student_id) |
| 10 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 9 | CTE Scan | sc | - | 1 | 1,947 | 0.01 | 6,537 | 0 | - |
| 7 | Aggregate | - | - | 1 | 421,201 | 0.08 | 0 | 0 | - |
| 8 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 7 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |

### combo_04 score_context + risk_flags

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 50 | 1 | 30,726.37 | 27,997 | 0 | - |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 1 | Nested Loop | - | - | 649 | 1 | 30,721.70 | 27,997 | 0 | (ar_2.student_id = ar_1.student_id) |
| 2 | Nested Loop | - | - | 649 | 1 | 30,567.82 | 21,460 | 0 | (e_2.student_id = ar_1.student_id) |
| 3 | Nested Loop | - | - | 649 | 1 | 30,493.55 | 15,685 | 0 | (ea.student_id = ar_1.student_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | Aggregate | - | - | 1 | 421,201 | 0.07 | 0 | 0 | - |
| 6 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Result | - | - | 50 | 1 | 30,726.36 | 27,997 | 0 | - |
| 2 | Sort | - | - | 50 | 1 | 30,726.29 | 27,997 | 0 | - |
| 3 | CTE Scan | rf | - | 649 | 1 | 30,724.41 | 27,997 | 0 | - |

### combo_05 score_context + class_max + eng_score

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 10 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 9 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 7 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |

### combo_06 score_context + eng_agg + class_max + eng_score

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 10 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 9 | CTE Scan | sc | - | 1 | 1,947 | 0.01 | 6,537 | 0 | - |
| 7 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |

### combo_07 score_context + eng_agg + eng_score

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 10 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 9 | CTE Scan | sc | - | 1 | 1,947 | 0.01 | 6,537 | 0 | - |
| 7 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |

### combo_08 score_context + eng_agg + class_max

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 10 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 9 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 7 | CTE Scan | cm | - | 1 | 421,201 | 0.00 | 0 | 0 | - |
| 7 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |

### combo_09 score_context + eng_score + risk_flags

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

### combo_10 score_context + class_max + eng_score + risk_flags

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

### combo_11 score_context + eng_agg + class_max + eng_score + risk_flags

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

## Minimal Safe Set Analysis

The minimal safe set by configured rules is **score_context, eng_score**. It uses 2 CTEs, reduces execution by 99.3%, is 2.14x all_suspect execution time, reduces aggregate loops by 99.7%, and keeps hit blocks at 1.00x all_suspect.

Required-looking CTEs:

- `score_context`
- `eng_score`

CTEs not required by selected minimal set:

- `score_agg`
- `punctuality`
- `eng_agg`
- `class_max`
- `risk_flags`

## Root Cause Conclusion

1. Fastest combination: **All suspect**.
2. Best minimal safe set: **combo_01 score_context + eng_score**.
3. Need all 7 CTEs? **No, selected set is smaller than all_suspect.**
4. Required CTEs: **score_context, eng_score**.
5. Unnecessary CTEs: **score_agg, punctuality, eng_agg, class_max, risk_flags**.
6. Repeated execution remains in baseline: **YES**.
7. Enough evidence for production fix candidate: **YES, candidate only.**.

## Recommended Production Fix Candidate

Candidate for a future phase: materialize only **score_context, eng_score** for `A-G03`. Do not implement in this phase.

## What Not To Fix Yet

- Không sửa `A-G03` trong `taskRegistry.json`.
- Không sửa bất kỳ production source file nào.
- Không sửa `S-B01`, `S-T04`, `S-B02`, `A-B04` hoặc task khác.
- Không thêm index.
- Không tạo migration.
- Không tăng timeout.
- Không generalize runtime rewrite.

## Next Step

Sau khi tạo report này, dừng lại. Nếu status là `FIX CANDIDATE IDENTIFIED`, cần prompt riêng để duyệt production fix tối thiểu.
