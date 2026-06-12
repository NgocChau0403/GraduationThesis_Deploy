# A-G03 Root Cause Isolation Report

## Summary

Investigation-only cho `A-G03`. Không sửa production logic.

Status: NEEDS MORE INVESTIGATION

## Context Used

| Param | Value |
| --- | --- |
| context_source | `preferred_context` |
| batch_id | `SAMPLE_UCI_POR` |
| class_id | `SAMPLE_UCI_POR_CLASS` |
| student_id | `SAMPLE_UCI_POR_STU_000001` |
| enrollment_id | `SAMPLE_UCI_POR_ENR_000001` |

## SQL Inventory

| Inventory | Value |
| --- | --- |
| SQL length | 9393 |
| Join count | 12 |
| Aggregate calls | 22 |
| Window OVER count | 0 |
| ORDER BY count | 1 |

Aggregates:

- `MAX`: 5
- `SUM`: 7
- `AVG`: 3
- `COUNT`: 6
- `REGR_SLOPE`: 1

Joins:

- `JOIN assessment a`
- `JOIN enrollment e`
- `JOIN assessment a`
- `JOIN enrollment e`
- `CROSS JOIN score_context sc`
- `JOIN assessment a`
- `JOIN enrollment e`
- `LEFT JOIN engagement eng`
- `CROSS JOIN class_max cm`
- `JOIN enrollment e`
- `LEFT JOIN eng_score es`
- `LEFT JOIN punctuality p`

## CTE Inventory

- `score_context`
- `score_agg`
- `punctuality`
- `eng_agg`
- `class_max`
- `eng_score`
- `risk_flags`

CTE roles:

- Aggregate/context stage: `score_context`, `score_agg`, `punctuality`, `eng_agg`, `class_max`, `eng_score`
- Final output/risk stage: `risk_flags`
- Ranking/window stage: no explicit WindowAgg CTE detected in SQL inventory

## Variant Definitions

| Variant | Materialized CTEs | Reason | Artifact |
| --- | --- | --- | --- |
| Baseline | none | SQL hiện tại. | `Debugs/explain/a-g03-baseline.json` |
| Variant A - score_context MATERIALIZED | `score_context` | Context/threshold stage có nguy cơ planner inline. | `Debugs/explain/a-g03-variant-a.json` |
| Variant B - score_agg MATERIALIZED | `score_agg` | Aggregate stage chính trên assessment_result. | `Debugs/explain/a-g03-variant-b.json` |
| Variant C - risk_flags MATERIALIZED | `risk_flags` | Final risk/output stage dùng cho filter/order/limit. | `Debugs/explain/a-g03-variant-c.json` |
| Variant D - all suspect CTEs MATERIALIZED | `score_context`, `score_agg`, `punctuality`, `eng_agg`, `class_max`, `eng_score`, `risk_flags` | Upper-bound performance cho toàn bộ CTE nghi ngờ. | `Debugs/explain/a-g03-variant-d.json` |

## Comparison Table

| Variant | Planning ms | Execution ms | Reduction vs baseline | Shared hit blocks | Shared read blocks | Output rows | Aggregate nodes/loops | Window nodes/loops | Nested Loop count/loops | assessment_result scan loops | assessment scan loops | enrollment scan loops | engagement scan loops | Indexes used |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Baseline | 20.64 | 44,270.28 | 0.0% | 12,749,008 | 0 | 50 | 5/423,799 | 0/0 | 12/4,552 | 1,264,901 | 3,794,703 | 2,599 | 649 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| Variant A - score_context MATERIALIZED | 4.58 | 29,155.70 | 34.1% | 27,997 | 0 | 50 | 5/421,853 | 0/0 | 12/660 | 1,947 | 5,841 | 653 | 649 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| Variant B - score_agg MATERIALIZED | 3.72 | 43,311.77 | 2.2% | 12,748,999 | 0 | 50 | 5/423,799 | 0/0 | 12/4,552 | 1,264,901 | 3,794,703 | 2,599 | 649 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| Variant C - risk_flags MATERIALIZED | 3.36 | 43,672.27 | 1.4% | 12,748,999 | 0 | 50 | 5/423,799 | 0/0 | 12/4,552 | 1,264,901 | 3,794,703 | 2,599 | 649 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |
| Variant D - all suspect CTEs MATERIALIZED | 2.95 | 158.75 | 99.6% | 27,997 | 0 | 50 | 5/5 | 0/0 | 12/12 | 1,947 | 5,841 | 653 | 649 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, engagement_enrollment_id_idx, enrollment_class_id_idx |

## Hot Plan Nodes

### Baseline

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 50 | 1 | 44,269.48 | 12,749,008 | 0 | - |
| 1 | Result | - | - | 50 | 1 | 44,269.47 | 12,749,008 | 0 | - |
| 2 | Sort | - | - | 50 | 1 | 44,268.78 | 12,749,008 | 0 | - |
| 3 | Nested Loop | - | - | 649 | 1 | 44,266.63 | 12,749,002 | 0 | (ar_2.student_id = ar.student_id) |
| 4 | Nested Loop | - | - | 649 | 1 | 44,113.75 | 12,742,465 | 0 | (e.student_id = ar.student_id) |
| 5 | Nested Loop | - | - | 649 | 1 | 44,039.18 | 12,736,690 | 0 | (ea.student_id = ar.student_id) |
| 6 | Aggregate | - | - | 649 | 1 | 15,730.43 | 12,734,079 | 0 | - |
| 7 | Sort | - | - | 1,947 | 1 | 15,717.44 | 12,734,079 | 0 | - |
| 8 | Nested Loop | - | - | 1,947 | 1 | 15,713.22 | 12,734,076 | 0 | - |
| 10 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 9 | Aggregate | - | - | 1 | 1,947 | 8.06 | 12,727,539 | 0 | - |
| 10 | Nested Loop | - | - | 1,947 | 1,947 | 7.92 | 12,727,539 | 0 | - |
| 11 | Nested Loop | - | - | 1,947 | 1,947 | 3.87 | 5,145,921 | 0 | - |
| 12 | Index Scan | enrollment | enrollment_class_id_idx | 649 | 1,947 | 0.15 | 29,205 | 0 | (class_id = 'SAMPLE_UCI_POR_CLASS'::text) |
| 12 | Index Scan | assessment_result | assessment_result_batch_id_enrollment_id_assessment_id_key | 3 | 1,263,603 | 0.01 | 5,116,716 | 0 | ((batch_id = 'SAMPLE_UCI_POR'::text) AND (enrollment_id = e_2.enrollment_id)) |
| 11 | Index Scan | assessment | assessment_pkey | 1 | 3,790,809 | 0.00 | 7,581,618 | 0 | (assessment_id = ar_1.assessment_id) |
| 7 | Aggregate | - | - | 1 | 421,201 | 0.07 | 0 | 0 | - |
| 8 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 7 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

### Variant A - score_context MATERIALIZED

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 50 | 1 | 29,155.37 | 27,997 | 0 | - |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Result | - | - | 50 | 1 | 29,155.36 | 27,997 | 0 | - |
| 2 | Sort | - | - | 50 | 1 | 29,155.26 | 27,997 | 0 | - |
| 3 | Nested Loop | - | - | 649 | 1 | 29,153.23 | 27,997 | 0 | (ar_1.student_id = ar.student_id) |
| 4 | Nested Loop | - | - | 649 | 1 | 29,007.50 | 21,460 | 0 | (e.student_id = ar.student_id) |
| 5 | Nested Loop | - | - | 649 | 1 | 28,936.94 | 15,685 | 0 | (ea.student_id = ar.student_id) |
| 10 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 9 | CTE Scan | sc | - | 1 | 1,947 | 0.01 | 6,537 | 0 | - |
| 7 | Aggregate | - | - | 1 | 421,201 | 0.07 | 0 | 0 | - |
| 8 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 7 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |

### Variant B - score_agg MATERIALIZED

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 50 | 1 | 43,311.16 | 12,748,999 | 0 | - |
| 1 | Aggregate | - | - | 649 | 1 | 15,251.40 | 12,734,076 | 0 | - |
| 2 | Sort | - | - | 1,947 | 1 | 15,223.96 | 12,734,076 | 0 | - |
| 3 | Nested Loop | - | - | 1,947 | 1 | 15,219.62 | 12,734,076 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 4 | Aggregate | - | - | 1 | 1,947 | 7.81 | 12,727,539 | 0 | - |
| 5 | Nested Loop | - | - | 1,947 | 1,947 | 7.66 | 12,727,539 | 0 | - |
| 6 | Nested Loop | - | - | 1,947 | 1,947 | 3.74 | 5,145,921 | 0 | - |
| 7 | Index Scan | enrollment | enrollment_class_id_idx | 649 | 1,947 | 0.14 | 29,205 | 0 | (class_id = 'SAMPLE_UCI_POR_CLASS'::text) |
| 7 | Index Scan | assessment_result | assessment_result_batch_id_enrollment_id_assessment_id_key | 3 | 1,263,603 | 0.01 | 5,116,716 | 0 | ((batch_id = 'SAMPLE_UCI_POR'::text) AND (enrollment_id = e_3.enrollment_id)) |
| 6 | Index Scan | assessment | assessment_pkey | 1 | 3,790,809 | 0.00 | 7,581,618 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Result | - | - | 50 | 1 | 43,311.15 | 12,748,999 | 0 | - |
| 2 | Sort | - | - | 50 | 1 | 43,311.08 | 12,748,999 | 0 | - |
| 3 | Nested Loop | - | - | 649 | 1 | 43,309.20 | 12,748,999 | 0 | (ar.student_id = sa.student_id) |
| 4 | Nested Loop | - | - | 649 | 1 | 43,166.79 | 12,742,462 | 0 | (e.student_id = sa.student_id) |
| 5 | Nested Loop | - | - | 649 | 1 | 43,097.35 | 12,736,687 | 0 | (ea.student_id = sa.student_id) |
| 6 | CTE Scan | sa | - | 649 | 1 | 15,253.02 | 12,734,076 | 0 | - |
| 7 | Aggregate | - | - | 1 | 421,201 | 0.07 | 0 | 0 | - |
| 8 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 7 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |

### Variant C - risk_flags MATERIALIZED

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 50 | 1 | 43,671.88 | 12,748,999 | 0 | - |
| 1 | Nested Loop | - | - | 649 | 1 | 43,665.52 | 12,748,999 | 0 | (ar_2.student_id = ar.student_id) |
| 2 | Nested Loop | - | - | 649 | 1 | 43,519.89 | 12,742,462 | 0 | (e_1.student_id = ar.student_id) |
| 3 | Nested Loop | - | - | 649 | 1 | 43,450.57 | 12,736,687 | 0 | (ea.student_id = ar.student_id) |
| 4 | Aggregate | - | - | 649 | 1 | 15,651.14 | 12,734,076 | 0 | - |
| 5 | Sort | - | - | 1,947 | 1 | 15,634.79 | 12,734,076 | 0 | - |
| 6 | Nested Loop | - | - | 1,947 | 1 | 15,630.28 | 12,734,076 | 0 | - |
| 8 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 7 | Aggregate | - | - | 1 | 1,947 | 8.02 | 12,727,539 | 0 | - |
| 8 | Nested Loop | - | - | 1,947 | 1,947 | 7.88 | 12,727,539 | 0 | - |
| 9 | Nested Loop | - | - | 1,947 | 1,947 | 3.84 | 5,145,921 | 0 | - |
| 10 | Index Scan | enrollment | enrollment_class_id_idx | 649 | 1,947 | 0.15 | 29,205 | 0 | (class_id = 'SAMPLE_UCI_POR_CLASS'::text) |
| 10 | Index Scan | assessment_result | assessment_result_batch_id_enrollment_id_assessment_id_key | 3 | 1,263,603 | 0.01 | 5,116,716 | 0 | ((batch_id = 'SAMPLE_UCI_POR'::text) AND (enrollment_id = e_3.enrollment_id)) |
| 9 | Index Scan | assessment | assessment_pkey | 1 | 3,790,809 | 0.00 | 7,581,618 | 0 | (assessment_id = ar_1.assessment_id) |
| 5 | Aggregate | - | - | 1 | 421,201 | 0.07 | 0 | 0 | - |
| 6 | CTE Scan | eng_agg | - | 649 | 421,201 | 0.03 | 0 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |
| 1 | Result | - | - | 50 | 1 | 43,671.87 | 12,748,999 | 0 | - |
| 2 | Sort | - | - | 50 | 1 | 43,671.79 | 12,748,999 | 0 | - |
| 3 | CTE Scan | rf | - | 649 | 1 | 43,670.09 | 12,748,999 | 0 | - |

### Variant D - all suspect CTEs MATERIALIZED

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 4 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
| 4 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_2.assessment_id) |

## Root Cause Analysis

Variant nhanh nhất: **Variant D - all suspect CTEs MATERIALIZED** (158.75ms).

Variant giảm aggregate loops mạnh nhất: **Variant D - all suspect CTEs MATERIALIZED**.

Variant giảm buffer hits mạnh nhất: **Variant A - score_context MATERIALIZED**.

Repeated execution: **YES**.

Planner inline/materialized evidence: **YES**.

Index issue evidence: **NO direct evidence**; report dựa vào repeated loops/buffer hits, không thêm index.

Join explosion evidence: **YES**.

Variant D nhanh nhất nhưng A/B/C đơn lẻ không đủ mạnh; không được đề xuất production fix chỉ dựa trên Variant D.

Confidence: **medium**.

## Recommended Investigation Next Step

Phase 0.5 Combination Isolation cho A-G03.

## What Not To Fix Yet

- Không sửa `A-G03` trong `taskRegistry.json`.
- Không sửa `sqlExecution.service.js`.
- Không thêm index.
- Không tạo migration.
- Không tăng timeout.
- Không generalize runtime rewrite.
- Không sửa task khác.
- Không implement production fix dù status là `ROOT CAUSE IDENTIFIED`.

## Conclusion

Deliverable phase này chỉ là script, report và EXPLAIN artifacts. Dừng lại tại đây.
