# S-T04 Root Cause Isolation Report

## Summary

Phase 0 only. Không implement production fix. Kết quả `S-B01` chỉ được dùng làm tham chiếu phương pháp, không dùng làm bằng chứng root cause cho `S-T04`.

Status: NEEDS MORE INVESTIGATION

## Context Used

| Param | Value |
| --- | --- |
| context_source | `preferred_context` |
| batch_id | `SAMPLE_UCI_POR` |
| class_id | `SAMPLE_UCI_POR_CLASS` |
| student_id | `SAMPLE_UCI_POR_STU_000001` |
| enrollment_id | `SAMPLE_UCI_POR_ENR_000001` |

## SQL CTE Inventory

Task `S-T04` CTEs detected from registry SQL:

- `score_context`
- `score_agg`
- `punctuality`
- `eng_agg`
- `class_max`
- `eng_score`
- `risk_flags`

## Variant Definitions

| Variant | Materialized CTEs | Artifact |
| --- | --- | --- |
| Baseline | None | `Debugs/explain/s-t04-baseline.json` |
| score_context MATERIALIZED | `score_context` | `Debugs/explain/s-t04-score-context-materialized.json` |
| score_agg MATERIALIZED | `score_agg` | `Debugs/explain/s-t04-score-agg-materialized.json` |
| risk_flags MATERIALIZED | `risk_flags` | `Debugs/explain/s-t04-ranked-or-risk-materialized.json` |
| All suspect CTEs MATERIALIZED | `score_context`, `score_agg`, `punctuality`, `eng_agg`, `class_max`, `eng_score`, `risk_flags` | `Debugs/explain/s-t04-all-suspect-materialized.json` |

## Comparison Table

| Variant | Planning ms | Execution ms | Execution reduction vs baseline | Shared hit blocks | Shared read blocks | Aggregate node count | Aggregate loops | WindowAgg node count | Window loops | Nested Loop count/loops | assessment_result scan loops | assessment scan loops | engagement scan loops | Output rows | Index names used |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Baseline | 66.72 | 41,446.69 | 0.0% | 12,749,008 | 0 | 5 | 423,799 | 0 | 0 | 12/4,552 | 1,264,901 | 3,794,703 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| score_context MATERIALIZED | 3.19 | 27,651.26 | 33.3% | 27,997 | 0 | 5 | 421,853 | 0 | 0 | 12/660 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| score_agg MATERIALIZED | 2.22 | 41,638.30 | -0.5% | 12,748,999 | 0 | 5 | 423,799 | 0 | 0 | 12/4,552 | 1,264,901 | 3,794,703 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| risk_flags MATERIALIZED | 3.63 | 42,777.09 | -3.2% | 12,748,999 | 0 | 5 | 423,799 | 0 | 0 | 12/4,552 | 1,264,901 | 3,794,703 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| All suspect CTEs MATERIALIZED | 2.00 | 166.07 | 99.6% | 27,997 | 0 | 5 | 5 | 0 | 0 | 12/12 | 1,947 | 5,841 | 649 | 5 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |

## Hot Plan Nodes

### Baseline

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 5 | 1 | 41,445.77 | 12,749,008 | 0 | - |
| 1 | Nested Loop | - | - | 649 | 1 | 41,443.41 | 12,749,005 | 0 | (ar_2.student_id = ar.student_id) |
| 2 | Nested Loop | - | - | 649 | 1 | 41,297.80 | 12,742,468 | 0 | (e_1.student_id = ar.student_id) |
| 3 | Nested Loop | - | - | 649 | 1 | 41,231.50 | 12,736,693 | 0 | (ea.student_id = ar.student_id) |
| 4 | Aggregate | - | - | 649 | 1 | 14,970.22 | 12,734,082 | 0 | - |
| 5 | Sort | - | - | 1,947 | 1 | 14,954.98 | 12,734,082 | 0 | - |
| 6 | Nested Loop | - | - | 1,947 | 1 | 14,951.09 | 12,734,076 | 0 | - |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 7 | Aggregate | - | - | 1 | 1,947 | 7.67 | 12,727,539 | 0 | - |
| 8 | Nested Loop | - | - | 1,947 | 1,947 | 7.53 | 12,727,539 | 0 | - |
| 9 | Nested Loop | - | - | 1,947 | 1,947 | 3.67 | 5,145,921 | 0 | - |
| 10 | Index Scan | enrollment | enrollment_class_id_idx | 649 | 1,947 | 0.13 | 29,205 | 0 | (class_id = 'SAMPLE_UCI_POR_CLASS'::text) |
| 10 | Index Scan | assessment_result | assessment_result_batch_id_enrollment_id_assessment_id_key | 3 | 1,263,603 | 0.01 | 5,116,716 | 0 | ((batch_id = 'SAMPLE_UCI_POR'::text) AND (enrollment_id = e_3.enrollment_id)) |
| 9 | Index Scan | assessment | assessment_pkey | 1 | 3,790,809 | 0.00 | 7,581,618 | 0 | (assessment_id = ar_1.assessment_id) |
| 5 | Aggregate | - | - | 1 | 421,201 | 0.06 | 0 | 0 | - |
| 6 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Sort | - | - | 5 | 1 | 41,445.75 | 12,749,008 | 0 | - |
| 2 | Append | - | - | 5 | 1 | 41,445.71 | 12,749,005 | 0 | - |
| 3 | CTE Scan | rf | - | 1 | 1 | 41,445.38 | 12,749,005 | 0 | (student_id = 'SAMPLE_UCI_POR_STU_000001'::text) |

### score_context MATERIALIZED

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 5 | 1 | 27,650.96 | 27,997 | 0 | - |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 1 | Nested Loop | - | - | 649 | 1 | 27,648.64 | 27,997 | 0 | (ar_2.student_id = ar_1.student_id) |
| 2 | Nested Loop | - | - | 649 | 1 | 27,506.81 | 21,460 | 0 | (e_2.student_id = ar_1.student_id) |
| 3 | Nested Loop | - | - | 649 | 1 | 27,437.89 | 15,685 | 0 | (ea.student_id = ar_1.student_id) |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | CTE Scan | sc | - | 1 | 1,947 | 0.01 | 6,537 | 0 | - |
| 5 | Aggregate | - | - | 1 | 421,201 | 0.07 | 0 | 0 | - |
| 6 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Sort | - | - | 5 | 1 | 27,650.95 | 27,997 | 0 | - |
| 2 | Append | - | - | 5 | 1 | 27,650.94 | 27,997 | 0 | - |
| 3 | CTE Scan | rf | - | 1 | 1 | 27,650.80 | 27,997 | 0 | (student_id = 'SAMPLE_UCI_POR_STU_000001'::text) |

### score_agg MATERIALIZED

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 5 | 1 | 41,638.00 | 12,748,999 | 0 | - |
| 1 | Aggregate | - | - | 649 | 1 | 14,888.16 | 12,734,076 | 0 | - |
| 2 | Sort | - | - | 1,947 | 1 | 14,872.79 | 12,734,076 | 0 | - |
| 3 | Nested Loop | - | - | 1,947 | 1 | 14,868.82 | 12,734,076 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 4 | Aggregate | - | - | 1 | 1,947 | 7.63 | 12,727,539 | 0 | - |
| 5 | Nested Loop | - | - | 1,947 | 1,947 | 7.49 | 12,727,539 | 0 | - |
| 6 | Nested Loop | - | - | 1,947 | 1,947 | 3.65 | 5,145,921 | 0 | - |
| 7 | Index Scan | enrollment | enrollment_class_id_idx | 649 | 1,947 | 0.13 | 29,205 | 0 | (class_id = 'SAMPLE_UCI_POR_CLASS'::text) |
| 7 | Index Scan | assessment_result | assessment_result_batch_id_enrollment_id_assessment_id_key | 3 | 1,263,603 | 0.01 | 5,116,716 | 0 | ((batch_id = 'SAMPLE_UCI_POR'::text) AND (enrollment_id = e_1.enrollment_id)) |
| 6 | Index Scan | assessment | assessment_pkey | 1 | 3,790,809 | 0.00 | 7,581,618 | 0 | (assessment_id = ar_1.assessment_id) |
| 1 | Nested Loop | - | - | 649 | 1 | 41,636.09 | 12,748,999 | 0 | (ar_2.student_id = sa.student_id) |
| 2 | Nested Loop | - | - | 649 | 1 | 41,495.17 | 12,742,462 | 0 | (e_3.student_id = sa.student_id) |
| 3 | Nested Loop | - | - | 649 | 1 | 41,426.83 | 12,736,687 | 0 | (ea.student_id = sa.student_id) |
| 4 | CTE Scan | sa | - | 649 | 1 | 14,889.42 | 12,734,076 | 0 | - |
| 5 | Aggregate | - | - | 1 | 421,201 | 0.06 | 0 | 0 | - |
| 6 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Sort | - | - | 5 | 1 | 41,637.98 | 12,748,999 | 0 | - |
| 2 | Append | - | - | 5 | 1 | 41,637.97 | 12,748,999 | 0 | - |
| 3 | CTE Scan | rf | - | 1 | 1 | 41,637.78 | 12,748,999 | 0 | (student_id = 'SAMPLE_UCI_POR_STU_000001'::text) |

### risk_flags MATERIALIZED

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 5 | 1 | 42,776.75 | 12,748,999 | 0 | - |
| 1 | Nested Loop | - | - | 649 | 1 | 42,774.73 | 12,748,999 | 0 | (ar_2.student_id = ar.student_id) |
| 2 | Nested Loop | - | - | 649 | 1 | 42,637.80 | 12,742,462 | 0 | (e_1.student_id = ar.student_id) |
| 3 | Nested Loop | - | - | 649 | 1 | 42,569.66 | 12,736,687 | 0 | (ea.student_id = ar.student_id) |
| 4 | Aggregate | - | - | 649 | 1 | 15,515.74 | 12,734,076 | 0 | - |
| 5 | Sort | - | - | 1,947 | 1 | 15,499.86 | 12,734,076 | 0 | - |
| 6 | Nested Loop | - | - | 1,947 | 1 | 15,495.87 | 12,734,076 | 0 | - |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 7 | Aggregate | - | - | 1 | 1,947 | 7.95 | 12,727,539 | 0 | - |
| 8 | Nested Loop | - | - | 1,947 | 1,947 | 7.81 | 12,727,539 | 0 | - |
| 9 | Nested Loop | - | - | 1,947 | 1,947 | 3.81 | 5,145,921 | 0 | - |
| 10 | Index Scan | enrollment | enrollment_class_id_idx | 649 | 1,947 | 0.14 | 29,205 | 0 | (class_id = 'SAMPLE_UCI_POR_CLASS'::text) |
| 10 | Index Scan | assessment_result | assessment_result_batch_id_enrollment_id_assessment_id_key | 3 | 1,263,603 | 0.01 | 5,116,716 | 0 | ((batch_id = 'SAMPLE_UCI_POR'::text) AND (enrollment_id = e_3.enrollment_id)) |
| 9 | Index Scan | assessment | assessment_pkey | 1 | 3,790,809 | 0.00 | 7,581,618 | 0 | (assessment_id = ar_1.assessment_id) |
| 5 | Aggregate | - | - | 1 | 421,201 | 0.06 | 0 | 0 | - |
| 6 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Sort | - | - | 5 | 1 | 42,776.73 | 12,748,999 | 0 | - |
| 2 | Append | - | - | 5 | 1 | 42,776.73 | 12,748,999 | 0 | - |
| 3 | CTE Scan | rf | - | 1 | 1 | 42,776.58 | 12,748,999 | 0 | (student_id = 'SAMPLE_UCI_POR_STU_000001'::text) |

### All suspect CTEs MATERIALIZED

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 4 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 4 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

## Root Cause Conclusion

Variant nhanh nhất: **All suspect CTEs MATERIALIZED** (166.07ms).

Variant đơn lẻ tốt nhất: **score_context MATERIALIZED** (27,651.26ms).

Repeated execution baseline: Aggregate loops=423,799, Nested Loop loops=4,552, assessment_result loops=1,264,901, engagement loops=649.

Chưa đủ bằng chứng để đề xuất production fix tối thiểu. Cần điều tra thêm hoặc thử rewrite/query variants khác.

## Recommended Production Fix

Không implement trong phase này.

Chưa đề xuất fix production. Cần thêm investigation trước khi sửa task registry.

## What Not To Fix Yet

- Không sửa `S-T04` trong `taskRegistry.json`.
- Không sửa `S-B02`, `A-G03`, `A-B04` hoặc task khác.
- Không thêm index.
- Không tạo migration.
- Không tăng timeout.
- Không generalize runtime rewrite.
- Không dùng kết luận của `S-B01` làm bằng chứng cho `S-T04`.

## Next Step

Review report và JSON artifacts. Nếu có fix candidate rõ ràng, tạo yêu cầu riêng cho production fix tối thiểu. Sau khi tạo report này, dừng lại.
