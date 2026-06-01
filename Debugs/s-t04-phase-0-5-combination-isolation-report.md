# S-T04 Phase 0.5 Combination Isolation Report

## Summary

Phase 0.5 only. Không implement production fix. Không sửa registry, runtime rewrite, index, migration hoặc timeout.

Status: FIX CANDIDATE IDENTIFIED

- Fastest variant: **All suspect** (156.26ms).
- Minimal safe set: **score_context, eng_score**.
- All suspect execution: **156.26ms**.

## Context Used

| Param | Value |
| --- | --- |
| context_source | `preferred_context` |
| batch_id | `SAMPLE_UCI_POR` |
| class_id | `SAMPLE_UCI_POR_CLASS` |
| student_id | `SAMPLE_UCI_POR_STU_000001` |
| enrollment_id | `SAMPLE_UCI_POR_ENR_000001` |

## Previous Phase 0 Baseline

Previous Phase 0 baseline artifact found: execution=41,446.69ms, aggregate loops=423,799, hit blocks=12,749,008.

Fresh Phase 0.5 baseline: execution=41,733.54ms, aggregate loops=423,799, hit blocks=12,749,008..

## Variant Definitions

S-T04 CTE inventory:

- `score_context`
- `score_agg`
- `punctuality`
- `eng_agg`
- `class_max`
- `eng_score`
- `risk_flags`

| Variant ID | Label | Materialized CTEs | Artifact |
| --- | --- | --- | --- |
| baseline | Baseline | none | `Debugs/explain/s-t04-phase-0-5-baseline.json` |
| all_suspect | All suspect | `score_context`, `score_agg`, `punctuality`, `eng_agg`, `class_max`, `eng_score`, `risk_flags` | `Debugs/explain/s-t04-phase-0-5-all-suspect.json` |
| combo_01 | combo_01 score_context + eng_agg | `score_context`, `eng_agg` | `Debugs/explain/s-t04-phase-0-5-combo-01-score-context-eng-agg.json` |
| combo_02 | combo_02 score_context + class_max | `score_context`, `class_max` | `Debugs/explain/s-t04-phase-0-5-combo-02-score-context-class-max.json` |
| combo_03 | combo_03 score_context + eng_score | `score_context`, `eng_score` | `Debugs/explain/s-t04-phase-0-5-combo-03-score-context-eng-score.json` |
| combo_04 | combo_04 score_context + risk_flags | `score_context`, `risk_flags` | `Debugs/explain/s-t04-phase-0-5-combo-04-score-context-risk-flags.json` |
| combo_05 | combo_05 score_context + eng_agg + eng_score | `score_context`, `eng_agg`, `eng_score` | `Debugs/explain/s-t04-phase-0-5-combo-05-score-context-eng-agg-eng-score.json` |
| combo_06 | combo_06 score_context + score_agg + punctuality | `score_context`, `score_agg`, `punctuality` | `Debugs/explain/s-t04-phase-0-5-combo-06-score-context-score-agg-punctuality.json` |
| combo_07 | combo_07 score_context + eng_agg + class_max | `score_context`, `eng_agg`, `class_max` | `Debugs/explain/s-t04-phase-0-5-combo-07-score-context-eng-agg-class-max.json` |
| combo_08 | combo_08 score_context + eng_agg + risk_flags | `score_context`, `eng_agg`, `risk_flags` | `Debugs/explain/s-t04-phase-0-5-combo-08-score-context-eng-agg-risk-flags.json` |
| combo_09 | combo_09 score_context + class_max + eng_score | `score_context`, `class_max`, `eng_score` | `Debugs/explain/s-t04-phase-0-5-combo-09-score-context-class-max-eng-score.json` |
| combo_10 | combo_10 score_context + eng_score + risk_flags | `score_context`, `eng_score`, `risk_flags` | `Debugs/explain/s-t04-phase-0-5-combo-10-score-context-eng-score-risk-flags.json` |
| combo_11 | combo_11 score_context + eng_agg + class_max + eng_score | `score_context`, `eng_agg`, `class_max`, `eng_score` | `Debugs/explain/s-t04-phase-0-5-combo-11-score-context-eng-agg-class-max-eng-score.json` |
| combo_12 | combo_12 score_context + eng_agg + class_max + eng_score + risk_flags | `score_context`, `eng_agg`, `class_max`, `eng_score`, `risk_flags` | `Debugs/explain/s-t04-phase-0-5-combo-12-score-context-eng-agg-class-max-eng-score-risk-flags.json` |

## Comparison Table

| Variant | Planning ms | Execution ms | Execution reduction vs baseline | Execution vs all_suspect | Shared hit blocks | Shared read blocks | Aggregate node count | Aggregate loops | WindowAgg node count | Window loops | Nested Loop count/loops | assessment_result scan loops | assessment scan loops | engagement scan loops | Output rows | Index names used |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Baseline | 15.91 | 41,733.54 | 0.0% | 267.07x | 12,749,008 | 0 | 5 | 423,799 | 0 | 0 | 12/4,552 | 1,264,901 | 3,794,703 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| All suspect | 2.27 | 156.26 | 99.6% | 1.00x | 27,997 | 0 | 5 | 5 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_01 score_context + eng_agg | 2.38 | 28,110.83 | 32.6% | 179.89x | 27,997 | 0 | 5 | 421,853 | 0 | 0 | 12/660 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_02 score_context + class_max | 2.20 | 371.06 | 99.1% | 2.37x | 27,997 | 0 | 5 | 653 | 0 | 0 | 12/660 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_03 score_context + eng_score | 2.63 | 279.43 | 99.3% | 1.79x | 27,997 | 0 | 5 | 1,301 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_04 score_context + risk_flags | 2.43 | 27,772.82 | 33.5% | 177.73x | 27,997 | 0 | 5 | 421,853 | 0 | 0 | 12/660 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_05 score_context + eng_agg + eng_score | 2.15 | 285.02 | 99.3% | 1.82x | 27,997 | 0 | 5 | 1,301 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_06 score_context + score_agg + punctuality | 2.71 | 27,893.21 | 33.2% | 178.50x | 27,997 | 0 | 5 | 421,205 | 0 | 0 | 12/660 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_07 score_context + eng_agg + class_max | 2.40 | 336.35 | 99.2% | 2.15x | 27,997 | 0 | 5 | 653 | 0 | 0 | 12/660 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_08 score_context + eng_agg + risk_flags | 2.85 | 27,536.45 | 34.0% | 176.22x | 27,997 | 0 | 5 | 421,853 | 0 | 0 | 12/660 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_09 score_context + class_max + eng_score | 2.33 | 241.97 | 99.4% | 1.55x | 27,997 | 0 | 5 | 653 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_10 score_context + eng_score + risk_flags | 2.13 | 280.80 | 99.3% | 1.80x | 27,997 | 0 | 5 | 1,301 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_11 score_context + eng_agg + class_max + eng_score | 2.36 | 238.64 | 99.4% | 1.53x | 27,997 | 0 | 5 | 653 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| combo_12 score_context + eng_agg + class_max + eng_score + risk_flags | 2.27 | 247.12 | 99.4% | 1.58x | 27,997 | 0 | 5 | 653 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |

## Best Candidates

| Variant | CTEs | CTE count | Execution ms | Exec reduction | Vs all_suspect | Aggregate loop reduction | Hit block ratio vs all_suspect | Candidate |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| combo_01 score_context + eng_agg | `score_context`, `eng_agg` | 2 | 28,110.83 | 32.6% | 179.89x | 0.5% | 1.00x | NO |
| combo_02 score_context + class_max | `score_context`, `class_max` | 2 | 371.06 | 99.1% | 2.37x | 99.8% | 1.00x | YES |
| combo_03 score_context + eng_score | `score_context`, `eng_score` | 2 | 279.43 | 99.3% | 1.79x | 99.7% | 1.00x | YES |
| combo_04 score_context + risk_flags | `score_context`, `risk_flags` | 2 | 27,772.82 | 33.5% | 177.73x | 0.5% | 1.00x | NO |
| combo_05 score_context + eng_agg + eng_score | `score_context`, `eng_agg`, `eng_score` | 3 | 285.02 | 99.3% | 1.82x | 99.7% | 1.00x | YES |
| combo_06 score_context + score_agg + punctuality | `score_context`, `score_agg`, `punctuality` | 3 | 27,893.21 | 33.2% | 178.50x | 0.6% | 1.00x | NO |
| combo_07 score_context + eng_agg + class_max | `score_context`, `eng_agg`, `class_max` | 3 | 336.35 | 99.2% | 2.15x | 99.8% | 1.00x | YES |
| combo_08 score_context + eng_agg + risk_flags | `score_context`, `eng_agg`, `risk_flags` | 3 | 27,536.45 | 34.0% | 176.22x | 0.5% | 1.00x | NO |
| combo_09 score_context + class_max + eng_score | `score_context`, `class_max`, `eng_score` | 3 | 241.97 | 99.4% | 1.55x | 99.8% | 1.00x | YES |
| combo_10 score_context + eng_score + risk_flags | `score_context`, `eng_score`, `risk_flags` | 3 | 280.80 | 99.3% | 1.80x | 99.7% | 1.00x | YES |
| combo_11 score_context + eng_agg + class_max + eng_score | `score_context`, `eng_agg`, `class_max`, `eng_score` | 4 | 238.64 | 99.4% | 1.53x | 99.8% | 1.00x | YES |
| combo_12 score_context + eng_agg + class_max + eng_score + risk_flags | `score_context`, `eng_agg`, `class_max`, `eng_score`, `risk_flags` | 5 | 247.12 | 99.4% | 1.58x | 99.8% | 1.00x | YES |

Candidate count: **8**.

Minimal safe set: **combo_03 score_context + eng_score (score_context, eng_score)**.

## Hot Plan Nodes

### Baseline

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 5 | 1 | 41,733.13 | 12,749,008 | 0 | - |
| 1 | Nested Loop | - | - | 649 | 1 | 41,730.99 | 12,749,005 | 0 | (ar_2.student_id = ar.student_id) |
| 2 | Nested Loop | - | - | 649 | 1 | 41,597.02 | 12,742,468 | 0 | (e_1.student_id = ar.student_id) |
| 3 | Nested Loop | - | - | 649 | 1 | 41,531.84 | 12,736,693 | 0 | (ea.student_id = ar.student_id) |
| 4 | Aggregate | - | - | 649 | 1 | 15,598.12 | 12,734,082 | 0 | - |
| 5 | Sort | - | - | 1,947 | 1 | 15,582.98 | 12,734,082 | 0 | - |
| 6 | Nested Loop | - | - | 1,947 | 1 | 15,578.73 | 12,734,076 | 0 | - |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 7 | Aggregate | - | - | 1 | 1,947 | 7.99 | 12,727,539 | 0 | - |
| 8 | Nested Loop | - | - | 1,947 | 1,947 | 7.85 | 12,727,539 | 0 | - |
| 9 | Nested Loop | - | - | 1,947 | 1,947 | 3.84 | 5,145,921 | 0 | - |
| 10 | Index Scan | enrollment | enrollment_class_id_idx | 649 | 1,947 | 0.15 | 29,205 | 0 | (class_id = 'SAMPLE_UCI_POR_CLASS'::text) |
| 10 | Index Scan | assessment_result | assessment_result_batch_id_enrollment_id_assessment_id_key | 3 | 1,263,603 | 0.01 | 5,116,716 | 0 | ((batch_id = 'SAMPLE_UCI_POR'::text) AND (enrollment_id = e_3.enrollment_id)) |
| 9 | Index Scan | assessment | assessment_pkey | 1 | 3,790,809 | 0.00 | 7,581,618 | 0 | (assessment_id = ar_1.assessment_id) |
| 5 | Aggregate | - | - | 1 | 421,201 | 0.06 | 0 | 0 | - |
| 6 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Sort | - | - | 5 | 1 | 41,733.12 | 12,749,008 | 0 | - |
| 2 | Append | - | - | 5 | 1 | 41,733.07 | 12,749,005 | 0 | - |
| 3 | CTE Scan | rf | - | 1 | 1 | 41,732.93 | 12,749,005 | 0 | (student_id = 'SAMPLE_UCI_POR_STU_000001'::text) |

### All suspect

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 4 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 4 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

### combo_01 score_context + eng_agg

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 5 | 1 | 28,110.54 | 27,997 | 0 | - |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 1 | Nested Loop | - | - | 649 | 1 | 28,108.47 | 27,997 | 0 | (ar_2.student_id = ar_1.student_id) |
| 2 | Nested Loop | - | - | 649 | 1 | 27,968.22 | 21,460 | 0 | (e_2.student_id = ar_1.student_id) |
| 3 | Nested Loop | - | - | 649 | 1 | 27,900.80 | 15,685 | 0 | (ea.student_id = ar_1.student_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | Aggregate | - | - | 1 | 421,201 | 0.07 | 0 | 0 | - |
| 6 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Sort | - | - | 5 | 1 | 28,110.53 | 27,997 | 0 | - |
| 2 | Append | - | - | 5 | 1 | 28,110.52 | 27,997 | 0 | - |
| 3 | CTE Scan | rf | - | 1 | 1 | 28,110.39 | 27,997 | 0 | (student_id = 'SAMPLE_UCI_POR_STU_000001'::text) |

### combo_02 score_context + class_max

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | CTE Scan | cm | - | 1 | 421,201 | 0.00 | 0 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

### combo_03 score_context + eng_score

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

### combo_04 score_context + risk_flags

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 5 | 1 | 27,772.54 | 27,997 | 0 | - |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 1 | Nested Loop | - | - | 649 | 1 | 27,770.54 | 27,997 | 0 | (ar_2.student_id = ar_1.student_id) |
| 2 | Nested Loop | - | - | 649 | 1 | 27,630.91 | 21,460 | 0 | (e_2.student_id = ar_1.student_id) |
| 3 | Nested Loop | - | - | 649 | 1 | 27,563.83 | 15,685 | 0 | (ea.student_id = ar_1.student_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | Aggregate | - | - | 1 | 421,201 | 0.07 | 0 | 0 | - |
| 6 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Sort | - | - | 5 | 1 | 27,772.53 | 27,997 | 0 | - |
| 2 | Append | - | - | 5 | 1 | 27,772.52 | 27,997 | 0 | - |
| 3 | CTE Scan | rf | - | 1 | 1 | 27,772.38 | 27,997 | 0 | (student_id = 'SAMPLE_UCI_POR_STU_000001'::text) |

### combo_05 score_context + eng_agg + eng_score

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

### combo_06 score_context + score_agg + punctuality

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 5 | 1 | 27,892.87 | 27,997 | 0 | - |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 4 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 4 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Nested Loop | - | - | 649 | 1 | 27,891.05 | 27,997 | 0 | (p.student_id = sa.student_id) |
| 2 | Nested Loop | - | - | 649 | 1 | 27,836.66 | 21,460 | 0 | (e_4.student_id = sa.student_id) |
| 3 | Nested Loop | - | - | 649 | 1 | 27,768.35 | 15,685 | 0 | (ea.student_id = sa.student_id) |
| 5 | Aggregate | - | - | 1 | 421,201 | 0.07 | 0 | 0 | - |
| 6 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 1 | Sort | - | - | 5 | 1 | 27,892.86 | 27,997 | 0 | - |
| 2 | Append | - | - | 5 | 1 | 27,892.85 | 27,997 | 0 | - |
| 3 | CTE Scan | rf | - | 1 | 1 | 27,892.70 | 27,997 | 0 | (student_id = 'SAMPLE_UCI_POR_STU_000001'::text) |

### combo_07 score_context + eng_agg + class_max

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | CTE Scan | cm | - | 1 | 421,201 | 0.00 | 0 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

### combo_08 score_context + eng_agg + risk_flags

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 5 | 1 | 27,536.18 | 27,997 | 0 | - |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 1 | Nested Loop | - | - | 649 | 1 | 27,534.13 | 27,997 | 0 | (ar_2.student_id = ar_1.student_id) |
| 2 | Nested Loop | - | - | 649 | 1 | 27,394.47 | 21,460 | 0 | (e_2.student_id = ar_1.student_id) |
| 3 | Nested Loop | - | - | 649 | 1 | 27,327.41 | 15,685 | 0 | (ea.student_id = ar_1.student_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | Aggregate | - | - | 1 | 421,201 | 0.06 | 0 | 0 | - |
| 6 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Sort | - | - | 5 | 1 | 27,536.16 | 27,997 | 0 | - |
| 2 | Append | - | - | 5 | 1 | 27,536.16 | 27,997 | 0 | - |
| 3 | CTE Scan | rf | - | 1 | 1 | 27,536.01 | 27,997 | 0 | (student_id = 'SAMPLE_UCI_POR_STU_000001'::text) |

### combo_09 score_context + class_max + eng_score

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

### combo_10 score_context + eng_score + risk_flags

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

### combo_11 score_context + eng_agg + class_max + eng_score

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

### combo_12 score_context + eng_agg + class_max + eng_score + risk_flags

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

## Minimal Safe Set Analysis

The minimal safe set by the configured rules is **score_context, eng_score**. It uses 2 CTEs, reduces execution by 99.3%, is 1.79x all_suspect execution time, reduces aggregate loops by 99.7%, and keeps hit blocks at 1.00x all_suspect.

Required-looking CTEs from this run:

- `score_context`
- `eng_score`

CTEs not required by the selected minimal set:

- `score_agg`
- `punctuality`
- `eng_agg`
- `class_max`
- `risk_flags`

## Root Cause Conclusion

1. Combination nhanh nhất: **All suspect**.
2. Minimal safe set tốt nhất: **combo_03 score_context + eng_score**.
3. Có cần materialize toàn bộ 7 CTE không? **No, tested minimal set is smaller than all_suspect.**
4. CTE có vẻ bắt buộc: **score_context, eng_score**.
5. CTE có vẻ không cần materialized: **score_agg, punctuality, eng_agg, class_max, risk_flags**.
6. Repeated execution baseline: **aggregate loops 423,799, nested loop loops 4,552**.
7. Đủ bằng chứng đề xuất production fix? **Yes, as candidate only.**

## Recommended Production Fix Candidate

Candidate for a future phase: materialize only **score_context, eng_score** for `S-T04`. Do not implement in this phase.

## What Not To Fix Yet

- Không sửa `S-T04` trong `taskRegistry.json`.
- Không sửa bất kỳ production source file nào.
- Không sửa `S-B02`, `A-G03`, `A-B04`, `S-B01` hoặc task khác.
- Không thêm index.
- Không tạo migration.
- Không tăng timeout.
- Không generalize runtime rewrite.

## Next Step

Sau khi tạo report này, dừng lại. Nếu status là `FIX CANDIDATE IDENTIFIED`, cần prompt riêng để duyệt production fix tối thiểu.
