# S-B01 Root Cause Isolation Report

Ngày chạy: 2026-05-31T17:56:32.927Z

## Phạm vi

Phase 0 chỉ điều tra root cause. Script sinh SQL variants trong memory và không sửa:

- `Backend/src/config/taskRegistry.json`
- `Backend/src/services/sqlExecution.service.js`
- Prisma schema/migration
- timeout config
- source logic

## Context

| Param | Value |
| --- | --- |
| batch_id | `SAMPLE_UCI_POR` |
| class_id | `SAMPLE_UCI_POR_CLASS` |
| student_id | `SAMPLE_UCI_POR_STU_000001` |
| enrollment_id | `SAMPLE_UCI_POR_ENR_000001` |

## Comparison

| Variant | Planning ms | Execution ms | Exec reduction vs baseline | Shared hit blocks | Shared read blocks | Aggregate loops | Window loops | Nested Loop count/loops | assessment_result scan loops | assessment scan loops | Output rows | Index names used |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Baseline | 46.79 | 17,462.09 | 0.0% | 12,734,097 | 0 | 1,948 | 2 | 6/3,898 | 1,264,252 | 3,792,756 | 1 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, enrollment_class_id_idx |
| score_context MATERIALIZED | 1.30 | 25.54 | 99.9% | 13,089 | 0 | 2 | 2 | 6/6 | 1,298 | 3,894 | 1 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, enrollment_class_id_idx |
| score_agg MATERIALIZED | 1.77 | 19,174.62 | -9.8% | 12,734,091 | 0 | 1,948 | 2 | 6/3,898 | 1,264,252 | 3,792,756 | 1 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, enrollment_class_id_idx |
| ranked_scores MATERIALIZED | 2.02 | 19,156.16 | -9.7% | 12,734,091 | 0 | 1,948 | 2 | 6/3,898 | 1,264,252 | 3,792,756 | 1 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, enrollment_class_id_idx |
| All three MATERIALIZED | 1.14 | 20.78 | 99.9% | 13,089 | 0 | 2 | 2 | 6/6 | 1,298 | 3,894 | 1 | assessment_pkey, assessment_result_batch_id_enrollment_id_assessment_id_key, enrollment_class_id_idx |

## Kết luận Phase 0

Variant nhanh nhất tuyệt đối là **All three MATERIALIZED**, giảm execution time **99.9%** so với baseline (`17,462.09ms` -> `20.78ms`). Tuy nhiên biến thể đơn lẻ tốt nhất là **score_context MATERIALIZED**, cũng giảm **99.9%** (`17,462.09ms` -> `25.54ms`) và giảm `Aggregate loops` từ `1,948` xuống `2`.

Kết luận root-cause isolation: **`score_context` là CTE có impact lớn nhất trong lần đo này**. `score_agg MATERIALIZED` và `ranked_scores MATERIALIZED` không cải thiện, thậm chí chậm hơn baseline khoảng `9.7-9.8%`, nên chưa có bằng chứng để materialize hai CTE này như fix tối thiểu.

Diễn giải kỹ thuật: `score_context` chỉ trả 1 row, nhưng khi không materialized nó bị planner inline vào nested-loop path, làm phần aggregate/index lookup phía dưới bị lặp lại. Khi ép `score_context AS MATERIALIZED`, repeated execution biến mất gần như hoàn toàn: `assessment_result` scan loops giảm từ `1,264,252` xuống `1,298`, `assessment` scan loops giảm từ `3,792,756` xuống `3,894`, và shared hit blocks giảm từ `12,734,097` xuống `13,089`.

Diễn giải an toàn:

- Nếu một variant đơn lẻ giảm mạnh execution time, loops và buffer hits, CTE đó là ứng viên fix nhỏ nhất cho phase sau.
- Nếu chỉ `All three MATERIALIZED` cải thiện rõ, cần cân nhắc materialize nhiều CTE hoặc rewrite query shape.
- Nếu không variant nào cải thiện, phase sau nên ưu tiên rewrite SQL shape thay vì thêm index.
- Đây chưa phải implementation fix; artifacts này chỉ dùng để ra quyết định.

## Artifacts

- `Debugs/explain/s-b01-baseline.json`
- `Debugs/explain/s-b01-score-context-materialized.json`
- `Debugs/explain/s-b01-score-agg-materialized.json`
- `Debugs/explain/s-b01-ranked-scores-materialized.json`
- `Debugs/explain/s-b01-all-materialized.json`

## Hot Plan Nodes

### Hot nodes - Baseline

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 1 | 1 | 17,458.54 | 12,734,097 | 0 | - |
| 1 | Nested Loop | - | - | 1 | 1 | 17,458.53 | 12,734,097 | 0 | - |
| 2 | Subquery Scan | rs | - | 1 | 1 | 17,458.40 | 12,734,082 | 0 | (rs.student_id = 'SAMPLE_UCI_POR_STU_000001'::text) |
| 3 | WindowAgg | - | - | 649 | 1 | 17,458.31 | 12,734,082 | 0 | - |
| 4 | WindowAgg | - | - | 649 | 1 | 17,455.50 | 12,734,082 | 0 | - |
| 5 | Sort | - | - | 649 | 1 | 17,455.18 | 12,734,082 | 0 | - |
| 6 | Subquery Scan | sa | - | 649 | 1 | 17,454.63 | 12,734,079 | 0 | - |
| 7 | Aggregate | - | - | 649 | 1 | 17,454.54 | 12,734,079 | 0 | - |
| 8 | Sort | - | - | 1,947 | 1 | 17,439.53 | 12,734,079 | 0 | - |
| 9 | Nested Loop | - | - | 1,947 | 1 | 17,434.83 | 12,734,076 | 0 | - |
| 11 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 10 | Aggregate | - | - | 1 | 1,947 | 8.95 | 12,727,539 | 0 | - |
| 11 | Nested Loop | - | - | 1,947 | 1,947 | 8.79 | 12,727,539 | 0 | - |
| 12 | Nested Loop | - | - | 1,947 | 1,947 | 4.32 | 5,145,921 | 0 | - |
| 13 | Index Scan | enrollment | enrollment_class_id_idx | 649 | 1,947 | 0.17 | 29,205 | 0 | (class_id = 'SAMPLE_UCI_POR_CLASS'::text) |
| 13 | Index Scan | assessment_result | assessment_result_batch_id_enrollment_id_assessment_id_key | 3 | 1,263,603 | 0.01 | 5,116,716 | 0 | ((batch_id = 'SAMPLE_UCI_POR'::text) AND (enrollment_id = e_2.enrollment_id)) |
| 12 | Index Scan | assessment | assessment_pkey | 1 | 3,790,809 | 0.00 | 7,581,618 | 0 | (assessment_id = ar_1.assessment_id) |

### Hot nodes - score_context MATERIALIZED

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 11 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 10 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |

### Hot nodes - score_agg MATERIALIZED

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 1 | 1 | 19,174.44 | 12,734,091 | 0 | - |
| 1 | Aggregate | - | - | 649 | 1 | 19,171.85 | 12,734,076 | 0 | - |
| 2 | Sort | - | - | 1,947 | 1 | 19,169.71 | 12,734,076 | 0 | - |
| 3 | Nested Loop | - | - | 1,947 | 1 | 19,164.44 | 12,734,076 | 0 | - |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 4 | Aggregate | - | - | 1 | 1,947 | 9.83 | 12,727,539 | 0 | - |
| 5 | Nested Loop | - | - | 1,947 | 1,947 | 9.67 | 12,727,539 | 0 | - |
| 6 | Nested Loop | - | - | 1,947 | 1,947 | 4.77 | 5,145,921 | 0 | - |
| 7 | Index Scan | enrollment | enrollment_class_id_idx | 649 | 1,947 | 0.19 | 29,205 | 0 | (class_id = 'SAMPLE_UCI_POR_CLASS'::text) |
| 7 | Index Scan | assessment_result | assessment_result_batch_id_enrollment_id_assessment_id_key | 3 | 1,263,603 | 0.01 | 5,116,716 | 0 | ((batch_id = 'SAMPLE_UCI_POR'::text) AND (enrollment_id = e_2.enrollment_id)) |
| 6 | Index Scan | assessment | assessment_pkey | 1 | 3,790,809 | 0.00 | 7,581,618 | 0 | (assessment_id = ar_1.assessment_id) |
| 1 | Nested Loop | - | - | 1 | 1 | 19,174.43 | 12,734,091 | 0 | - |
| 2 | Subquery Scan | rs | - | 1 | 1 | 19,174.35 | 12,734,076 | 0 | (rs.student_id = 'SAMPLE_UCI_POR_STU_000001'::text) |
| 3 | WindowAgg | - | - | 649 | 1 | 19,174.30 | 12,734,076 | 0 | - |
| 4 | WindowAgg | - | - | 649 | 1 | 19,172.49 | 12,734,076 | 0 | - |
| 5 | Sort | - | - | 649 | 1 | 19,172.26 | 12,734,076 | 0 | - |
| 6 | CTE Scan | sa | - | 649 | 1 | 19,172.10 | 12,734,076 | 0 | - |

### Hot nodes - ranked_scores MATERIALIZED

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 0 | Limit | - | - | 1 | 1 | 19,155.92 | 12,734,091 | 0 | - |
| 1 | WindowAgg | - | - | 649 | 1 | 19,155.63 | 12,734,076 | 0 | - |
| 2 | WindowAgg | - | - | 649 | 1 | 19,154.00 | 12,734,076 | 0 | - |
| 3 | Sort | - | - | 649 | 1 | 19,153.80 | 12,734,076 | 0 | - |
| 4 | Subquery Scan | sa | - | 649 | 1 | 19,153.63 | 12,734,076 | 0 | - |
| 5 | Aggregate | - | - | 649 | 1 | 19,153.57 | 12,734,076 | 0 | - |
| 6 | Sort | - | - | 1,947 | 1 | 19,151.46 | 12,734,076 | 0 | - |
| 7 | Nested Loop | - | - | 1,947 | 1 | 19,146.66 | 12,734,076 | 0 | - |
| 9 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 8 | Aggregate | - | - | 1 | 1,947 | 9.82 | 12,727,539 | 0 | - |
| 9 | Nested Loop | - | - | 1,947 | 1,947 | 9.66 | 12,727,539 | 0 | - |
| 10 | Nested Loop | - | - | 1,947 | 1,947 | 4.74 | 5,145,921 | 0 | - |
| 11 | Index Scan | enrollment | enrollment_class_id_idx | 649 | 1,947 | 0.19 | 29,205 | 0 | (class_id = 'SAMPLE_UCI_POR_CLASS'::text) |
| 11 | Index Scan | assessment_result | assessment_result_batch_id_enrollment_id_assessment_id_key | 3 | 1,263,603 | 0.01 | 5,116,716 | 0 | ((batch_id = 'SAMPLE_UCI_POR'::text) AND (enrollment_id = e_2.enrollment_id)) |
| 10 | Index Scan | assessment | assessment_pkey | 1 | 3,790,809 | 0.00 | 7,581,618 | 0 | (assessment_id = ar_1.assessment_id) |
| 1 | Nested Loop | - | - | 1 | 1 | 19,155.92 | 12,734,091 | 0 | - |
| 2 | CTE Scan | rs | - | 1 | 1 | 19,155.84 | 12,734,076 | 0 | (student_id = 'SAMPLE_UCI_POR_STU_000001'::text) |

### Hot nodes - All three MATERIALIZED

| Depth | Node | Relation | Index | Rows | Loops | Time ms | Hit Blocks | Read Blocks | Cond/Filter |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 3 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar.assessment_id) |
| 5 | Index Scan | assessment | assessment_pkey | 1 | 1,947 | 0.00 | 3,894 | 0 | (assessment_id = ar_1.assessment_id) |
| 4 | CTE Scan | sc | - | 1 | 1,947 | 0.00 | 6,537 | 0 | - |
