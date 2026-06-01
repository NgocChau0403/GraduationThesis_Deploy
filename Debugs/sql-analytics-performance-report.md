# Báo cáo hiệu năng SQL Analytics

Ngày lập báo cáo: 2026-06-01  
Phạm vi: Backend SQL Analytics, Runtime SQL Rewrite, Task Execution, Task Availability, Prisma Index.  
Mục tiêu: phân tích và lập kế hoạch. Không sửa code, không thêm index, không tạo migration, không tăng timeout.

## 1. Tóm tắt điều hành

Vấn đề hiệu năng hiện tại tập trung ở nhóm SQL Analytics có nhiều CTE, aggregate và join trên các bảng fact lớn như `assessment_result` và `engagement`. Bằng chứng hiện có:

| Task ID | Role | Hiện tượng | Mức độ |
| --- | --- | --- | --- |
| `S-B01` | Student | Chạy khoảng `17.4s`; `EXPLAIN ANALYZE` cho thấy repeated execution rất lớn dù PostgreSQL đã dùng index | Critical |
| `S-T04` | Student | Timeout khoảng `30s` | Critical |
| `A-G03` | Admin/Instructor | Timeout khoảng `30s` | Critical |

Người dùng bị ảnh hưởng ở dashboard và task execution:

- Dashboard bị chậm khi auto-run task analytics hoặc khi người dùng chọn task.
- Một số chart/card không có dữ liệu vì backend trả lỗi timeout.
- Backend giữ connection lâu cho query tốn tài nguyên.
- Nếu tăng timeout, hệ thống chỉ che giấu triệu chứng và có thể làm nghẽn tài nguyên nặng hơn.

Kết luận chính: **không nên bắt đầu bằng việc thêm index**.

Lý do:

- `EXPLAIN ANALYZE` của `S-B01` cho thấy PostgreSQL đã dùng index hiện có.
- Query vẫn mất khoảng `17.4s` vì CTE/subquery/aggregate bị thực thi lặp lại quá nhiều lần.
- Index làm từng lookup nhanh hơn, nhưng không giải quyết được việc lookup bị gọi hàng triệu lần.
- ROI cao nhất là sửa query shape: materialize/rewrite các CTE nặng, sau đó mới chạy lại `EXPLAIN ANALYZE` để quyết định index.

Nhóm task rủi ro cao nhất:

1. `S-B01`, `S-T04`, `A-G03`: có bằng chứng chậm/timeout trực tiếp.
2. `S-B02`, `A-B04`, `A-G15`, `A-G16`: có pattern giống nhóm timeout.
3. Các task High khác có `score_agg`, `eng_agg`, `risk_flags`, hoặc aggregate cohort trước khi filter output.

## 2. Bằng chứng và execution path

### 2.1 Execution path của analytics run

Nguồn code:

- `Backend/src/controllers/analytics.controller.js:158`: `runAnalyticsController`.
- `Backend/src/controllers/analytics.controller.js:199`: gọi `capabilityValidatorService.validateTask(...)`.
- `Backend/src/controllers/analytics.controller.js:228`: gọi `executeSqlTask({ task, params: sqlParams })`.
- `Backend/src/services/sqlExecution.service.js:387`: `executeOne(...)`.
- `Backend/src/services/sqlExecution.service.js:390`: `applyBatchScopeGuard(...)`.
- `Backend/src/services/sqlExecution.service.js:391`: `applyTaskSpecificSqlOptimizations(...)`.

Execution path:

```text
Frontend chọn/chạy task
-> analytics.controller.runAnalyticsController
-> capabilityValidatorService.validateTask
-> executeSqlTask
-> executeOne
-> applyBatchScopeGuard
-> applyTaskSpecificSqlOptimizations
-> Prisma raw SQL execution
-> PostgreSQL query plan
```

### 2.2 Runtime SQL optimization hiện có

Nguồn: `Backend/src/services/sqlExecution.service.js:268-276`.

```js
function applyTaskSpecificSqlOptimizations(sql, taskId) {
  if (taskId !== "A-B04") return sql;

  let optimized = sql;
  optimized = optimized.replace(/\bscore_context\s+AS\s*\(/i, "score_context AS MATERIALIZED (");
  optimized = optimized.replace(/\bpunctuality\s+AS\s*\(/i, "punctuality AS MATERIALIZED (");
  optimized = optimized.replace(/\beng_agg\s+AS\s*\(/i, "eng_agg AS MATERIALIZED (");
  optimized = optimized.replace(/\bclass_max\s+AS\s*\(/i, "class_max AS MATERIALIZED (");
  optimized = optimized.replace(/\beng_score\s+AS\s*\(/i, "eng_score AS MATERIALIZED (");
```

Nhận định:

- Hệ thống đã có tiền lệ dùng `AS MATERIALIZED` để xử lý query shape.
- Hiện optimization này chỉ áp dụng cho `A-B04`.
- Các task timeout `S-B01`, `S-T04`, `A-G03` chưa được áp dụng optimization tương tự.

### 2.3 Query plan evidence của `S-B01`

Bằng chứng `EXPLAIN ANALYZE` đã đo:

| Chỉ số | Giá trị |
| --- | --- |
| Planning time | `9.669ms` |
| Execution time | `17,408.707ms` |
| Shared Hit Blocks | `12,734,097` |
| Aggregate loops | `1947` |
| AssessmentResult Index Scan loops | `1,263,603` |
| Assessment Index Scan loops | `3,790,809` |
| Index đã dùng | `assessment_result_batch_id_enrollment_id_assessment_id_key`, `assessment_pkey` |

Kết luận từ plan:

- PostgreSQL đã dùng index.
- Root cause không phải thiếu index cơ bản.
- Plan shape khiến aggregate/index scan bị nhân vòng lặp.
- Cần giảm repeated execution trước khi bàn thêm index.

## 3. Kiểm kê toàn bộ task SQL

Nguồn: `Backend/src/config/taskRegistry.json`.  
Tổng số task trong registry: `57`.

Role được suy ra từ `target_audience` và `scope`:

- `Student`: `target_audience` chứa `student`.
- `Admin/Instructor`: `target_audience` chứa `admin` hoặc `instructor`.
- `Mixed`: task có thể phục vụ nhiều audience hoặc chưa rõ trong registry.

Tiêu chí phân loại:

- Critical: đã timeout hoặc có bằng chứng SQL chạy cực chậm.
- High: có pattern giống task timeout hoặc SQL có nhiều CTE/join/aggregate trên bảng lớn.
- Medium: SQL tương đối nặng nhưng chưa có bằng chứng timeout.
- Low: SQL đơn giản hoặc không có SQL.

| Task ID | Role | Tên Task | Độ phức tạp SQL | Bảng sử dụng | Mức độ rủi ro | Ghi chú |
| --- | --- | --- | --- | --- | --- | --- |
| `S-B01` | Student | Performance overview | 4077 chars, 3 CTE, 6 join, 17 aggregate/window | assessment, assessment_result, enrollment | Critical | Có `EXPLAIN ANALYZE` 17.4s |
| `S-B02` | Student | Risk status card | 6637 chars, 7 CTE, 12 join, 21 aggregate/window | assessment, assessment_result, engagement, enrollment | High | Pattern giống risk timeout |
| `S-B03` | Student | Engagement summary | 1871 chars, 5 CTE, 4 join, 8 aggregate/window | engagement, enrollment | Medium | Engagement aggregate |
| `S-T00` | Student | Score prediction (What-If) | 1518 chars, 5 CTE, 6 join, 5 aggregate/window | assessment, assessment_result, engagement, enrollment | High | Score + engagement aggregate |
| `S-T01` | Student | Score trend analysis | 2864 chars, 3 CTE, 7 join, 4 aggregate/window | assessment, assessment_result | High | Có score context |
| `S-T02` | Student | Competency gap analysis | 766 chars, 0 CTE, 1 join, 3 aggregate/window | assessment, assessment_result | Low | Query gọn |
| `S-T03` | Student | Peer comparison | 1575 chars, 4 CTE, 3 join, 8 aggregate/window | assessment, assessment_result, engagement, enrollment | High | Cohort comparison |
| `S-T04` | Student | At-risk self-check | 9215 chars, 7 CTE, 12 join, 21 aggregate/window | assessment, assessment_result, course, engagement, enrollment, student | Critical | Timeout khoảng 30s |
| `S-T05` | Student | Weekly engagement trend | 910 chars, 2 CTE, 0 join, 4 aggregate/window | engagement | Medium | Weekly engagement |
| `S-T06` | Student | Study consistency check | 1308 chars, 5 CTE, 3 join, 4 aggregate/window | engagement, enrollment | Medium | Consistency aggregation |
| `S-T07` | Student | Absence / inactivity impact | Không có SQL | - | Low | Không tạo tải SQL |
| `S-T08` | Student | Assessment lateness impact | 951 chars, 0 CTE, 1 join, 3 aggregate/window | assessment, assessment_result | High | Punctuality aggregate |
| `S-T09` | Student | Lifestyle risk vs performance | 518 chars, 0 CTE, 1 join, 1 aggregate/window | assessment, assessment_result, student | Low | Query nhỏ |
| `S-T10` | Student | Resource engagement breakdown | 846 chars, 3 CTE, 1 join, 5 aggregate/window | engagement, event | Medium | Resource aggregate |
| `S-T11` | Student | Registration timing vs performance | 410 chars, 0 CTE, 1 join, 1 aggregate/window | assessment, assessment_result, enrollment | Low | Query nhỏ |
| `S-T12` | Student | Procrastination analysis | Không có SQL | - | Low | Không tạo tải SQL |
| `S-T13` | Student | Action plan generation | 7106 chars, 8 CTE, 14 join, 22 aggregate/window | assessment, assessment_result, engagement, enrollment, student | High | Rất giống nhóm risk/score |
| `S-T14` | Student | Social balance vs performance | 442 chars, 0 CTE, 1 join, 1 aggregate/window | assessment, assessment_result, student | Low | Query nhỏ |
| `S-T15` | Student | Family context vs performance | 498 chars, 0 CTE, 1 join, 1 aggregate/window | assessment, assessment_result, student | Low | Query nhỏ |
| `S-T16` | Student | Grade goal calculator | 5708 chars, 5 CTE, 4 join, 11 aggregate/window | assessment, assessment_result, enrollment | High | Projection/score CTE |
| `S-T17` | Student | Assessment status timeline | 573 chars, 0 CTE, 1 join, 0 aggregate/window | assessment, assessment_result | Low | Query nhỏ |
| `A-B01` | Admin/Instructor | Overall performance distribution | 1265 chars, 2 CTE, 1 join, 6 aggregate/window | assessment_result, enrollment | Medium | Distribution |
| `A-B02` | Admin/Instructor | Completion / outcome summary | 212 chars, 0 CTE, 0 join, 4 aggregate/window | enrollment | Medium | Aggregate enrollment |
| `A-B03` | Admin/Instructor | Engagement distribution | 1340 chars, 4 CTE, 2 join, 10 aggregate/window | engagement, enrollment | High | Engagement distribution |
| `A-B04` | Admin/Instructor | At-risk overview | 6439 chars, 7 CTE, 12 join, 23 aggregate/window | assessment, assessment_result, engagement, enrollment | High | Đã có materialized optimization riêng |
| `A-S01` | Admin/Instructor | Student full profile snapshot | 2591 chars, 6 CTE, 12 join, 10 aggregate/window | assessment, assessment_result, engagement, enrollment, student | High | Nhiều join profile |
| `A-S02` | Admin/Instructor | Student score trend | 280 chars, 0 CTE, 1 join, 0 aggregate/window | assessment, assessment_result | Low | Query nhỏ |
| `A-S03` | Admin/Instructor | Student engagement trajectory | 1782 chars, 8 CTE, 4 join, 4 aggregate/window | engagement, enrollment | Medium | Nhiều CTE nhưng domain hẹp |
| `A-S04` | Admin/Instructor | Student risk flag breakdown | 2003 chars, 2 CTE, 4 join, 3 aggregate/window | assessment, assessment_result, enrollment | High | Risk pattern |
| `A-S05` | Admin/Instructor | Student competency gap | 766 chars, 0 CTE, 1 join, 3 aggregate/window | assessment, assessment_result | Low | Query gọn |
| `A-S06` | Admin/Instructor | Student submission & punctuality | 833 chars, 0 CTE, 1 join, 3 aggregate/window | assessment, assessment_result | High | Punctuality aggregate |
| `A-S07` | Admin/Instructor | Student background context | 588 chars, 0 CTE, 1 join, 0 aggregate/window | enrollment, student | Low | Query nhỏ |
| `A-S08` | Admin/Instructor | Student intervention recommendation | 3296 chars, 8 CTE, 15 join, 13 aggregate/window | assessment, assessment_result, engagement, enrollment, student | High | Intervention pattern |
| `A-C01` | Admin/Instructor | Compare performance trajectories | 383 chars, 0 CTE, 2 join, 0 aggregate/window | assessment, assessment_result, enrollment | Low | Query nhỏ |
| `A-C02` | Admin/Instructor | Compare engagement patterns | 2330 chars, 5 CTE, 4 join, 6 aggregate/window | engagement, enrollment | Medium | Engagement compare |
| `A-C03` | Admin/Instructor | Compare risk profile | 3496 chars, 8 CTE, 11 join, 9 aggregate/window | assessment, assessment_result, engagement, enrollment | High | Risk compare |
| `A-C04` | Admin/Instructor | Compare lifestyle context | 1042 chars, 1 CTE, 3 join, 0 aggregate/window | enrollment, student | Low | Query nhỏ/vừa |
| `A-C05` | Admin/Instructor | Compare academic background | 417 chars, 0 CTE, 1 join, 0 aggregate/window | enrollment, student | Low | Query nhỏ |
| `A-C06` | Admin/Instructor | Compare resource usage | 1219 chars, 4 CTE, 6 join, 4 aggregate/window | engagement, enrollment, event | Medium | Resource compare |
| `A-G01` | Admin/Instructor | Identify low-engagement group | 923 chars, 2 CTE, 2 join, 5 aggregate/window | engagement, enrollment | High | Engagement scoring |
| `A-G02` | Admin/Instructor | Engagement-performance relationship | 1125 chars, 4 CTE, 6 join, 5 aggregate/window | assessment, assessment_result, engagement, enrollment | High | Score + engagement |
| `A-G03` | Admin/Instructor | Identify at-risk cohort | 9393 chars, 7 CTE, 12 join, 21 aggregate/window | assessment, assessment_result, engagement, enrollment, student | Critical | Timeout khoảng 30s |
| `A-G04` | Admin/Instructor | Assessment difficulty analysis | 1057 chars, 0 CTE, 2 join, 5 aggregate/window | assessment, assessment_result, enrollment | Medium | Assessment aggregate |
| `A-G05` | Admin/Instructor | Submission behaviour analysis | 2228 chars, 2 CTE, 2 join, 9 aggregate/window | assessment, assessment_result, enrollment | High | Submission/punctuality |
| `A-G06` | Admin/Instructor | Activity type effectiveness | 876 chars, 2 CTE, 5 join, 4 aggregate/window | assessment, assessment_result, engagement, enrollment, event | High | Event + score |
| `A-G07` | Admin/Instructor | Factor correlation analysis | 1947 chars, 4 CTE, 5 join, 7 aggregate/window | assessment, assessment_result, engagement, enrollment, student | High | Correlation |
| `A-G08` | Admin/Instructor | Background group performance & engagement profile | 1489 chars, 4 CTE, 7 join, 11 aggregate/window | assessment, assessment_result, engagement, enrollment, student | High | Group analytics |
| `A-G09` | Admin/Instructor | Socioeconomic disadvantage impact | 807 chars, 1 CTE, 4 join, 1 aggregate/window | assessment, assessment_result, enrollment, student | High | Cohort score_agg |
| `A-G10` | Admin/Instructor | Consistency analysis across cohort | 1871 chars, 5 CTE, 3 join, 11 aggregate/window | engagement, enrollment | Medium | Weekly stats |
| `A-G11` | Admin/Instructor | Weekly engagement drop detection | 989 chars, 2 CTE, 1 join, 3 aggregate/window | engagement, enrollment | Medium | Weekly aggregate |
| `A-G12` | Admin/Instructor | Background group pass/fail/withdrawal rate | 527 chars, 1 CTE, 1 join, 4 aggregate/window | enrollment, student | Medium | Group count |
| `A-G13` | Admin/Instructor | Lifestyle risk across cohort | 777 chars, 1 CTE, 4 join, 1 aggregate/window | assessment, assessment_result, enrollment, student | High | Cohort score_agg |
| `A-G14` | Admin/Instructor | Early withdrawal signal analysis | 648 chars, 1 CTE, 1 join, 5 aggregate/window | engagement, enrollment | Medium | Weekly/outcome |
| `A-G15` | Admin/Instructor | Intervention priority ranking | 2632 chars, 6 CTE, 9 join, 7 aggregate/window | assessment, assessment_result, engagement, enrollment, student | High | Risk flags |
| `A-G16` | Admin | Admin action recommendation | 3311 chars, 6 CTE, 15 join, 13 aggregate/window | assessment, assessment_result, engagement, enrollment, event | High | Subquery output |
| `A-G18` | Admin/Instructor | Class performance trend | 1430 chars, 2 CTE, 4 join, 8 aggregate/window | assessment, assessment_result, enrollment | High | Có score_context |
| `A-G19` | Admin/Instructor | Assessment completion rate | 1309 chars, 2 CTE, 2 join, 5 aggregate/window | assessment, assessment_result, enrollment | Medium | Completion aggregate |

## 4. Phân tích chi tiết từng task nguy hiểm

### Task: `S-B01`

Mục đích nghiệp vụ:

- Tính performance overview cho một student: điểm trung bình, pass rate, trend, percentile, cohort size, so sánh với class average.

Cấu trúc SQL hiện tại:

- CTE: `score_context`, `score_agg`, `ranked_scores`.
- Aggregate/window: `MAX`, `SUM`, `AVG`, `COUNT`, `REGR_SLOPE`, `PERCENT_RANK`, `AVG(...) OVER`, `COUNT(...) OVER`.
- Join chính: `assessment_result` -> `assessment` -> `enrollment`; output join lại `enrollment`.
- SQL snippet nguồn tại `Backend/src/config/taskRegistry.json:27`:

```sql
WITH
score_context AS (...),
score_agg AS (... CROSS JOIN score_context sc ... GROUP BY ar.student_id ...),
ranked_scores AS (... PERCENT_RANK() OVER (ORDER BY sa.avg_score) ...)
SELECT ...
FROM ranked_scores rs
JOIN enrollment e ON e.student_id = rs.student_id
WHERE rs.student_id = :student_id
```

Luồng dữ liệu:

```text
assessment_result -> assessment -> enrollment -> score_context
-> score_agg -> ranked_scores -> output cho :student_id
```

Rủi ro hiệu năng:

- `ranked_scores` tính metric cohort trước khi filter student.
- `score_context` và aggregate có dấu hiệu bị inline vào nested loop.
- Có aggregation trước filter output.
- Có scan/index lookup lặp lại quá nhiều lần.

Bằng chứng:

- File SQL: `Backend/src/config/taskRegistry.json:3`, `Backend/src/config/taskRegistry.json:27`.
- Function execution: `Backend/src/services/sqlExecution.service.js:387`.
- Query plan thật:
  - `Execution Time = 17,408.707ms`.
  - `Aggregate loops = 1947`.
  - `AssessmentResult Index Scan loops = 1,263,603`.
  - `Assessment Index Scan loops = 3,790,809`.
  - `Shared Hit Blocks = 12,734,097`.
  - Index đã dùng: `assessment_result_batch_id_enrollment_id_assessment_id_key`, `assessment_pkey`.

Đánh giá index:

- SQL hiện tại đã dùng index.
- Vẫn chậm vì repeated execution, không phải vì mỗi lookup thiếu index.
- Chưa nên thêm index trước khi rewrite/materialize.
- Sau rewrite mới kiểm tra thêm composite index nếu plan còn scan/join kém.

Hướng sửa đề xuất:

- Thử `score_context AS MATERIALIZED`.
- Thử `score_agg AS MATERIALIZED` nếu plan còn lặp aggregate.
- Rewrite để tính cohort aggregate một lần, sau đó filter selected student.
- Giữ output schema không đổi.

Mức độ tác động: Cao.  
Rủi ro khi sửa: sai percentile, sai class scope, sai null handling trong weighted average, chart không render nếu field đổi.

### Task: `S-B02`

Mục đích nghiệp vụ:

- Tính risk status card cho student dựa trên điểm, engagement, punctuality, previous attempts và performance trend.

Cấu trúc SQL hiện tại:

- CTE: `score_context`, `score_agg`, `punctuality`, `eng_agg`, `class_max`, `eng_score`, `risk_flags`.
- Aggregate: score average, weighted average, pass rate, punctuality rate, engagement total/active days.
- Join chính: `assessment_result`, `assessment`, `enrollment`, `engagement`.
- SQL snippet nguồn tại `Backend/src/config/taskRegistry.json:115`:

```sql
WITH
score_context AS (...),
score_agg AS (... CROSS JOIN score_context sc ...),
punctuality AS (...),
eng_agg AS (...),
class_max AS (... FROM eng_agg),
eng_score AS (... CROSS JOIN class_max cm),
risk_flags AS (...)
SELECT ...
FROM risk_flags rf
WHERE rf.student_id = :student_id
```

Luồng dữ liệu:

```text
assessment_result -> assessment -> enrollment -> score_agg / punctuality
engagement -> enrollment -> eng_agg -> class_max -> eng_score
score + engagement + punctuality -> risk_flags -> output
```

Rủi ro hiệu năng:

- Pattern gần giống `A-B04` và `S-T04`.
- Nhiều CTE phụ thuộc nhau.
- Aggregate cohort có thể chạy trước khi filter selected student.
- Nếu CTE bị inline, `score_agg` và `eng_agg` có nguy cơ bị tính lại.

Bằng chứng:

- File SQL: `Backend/src/config/taskRegistry.json:92`, `Backend/src/config/taskRegistry.json:115`.
- Registry metrics: 6637 chars, 7 CTE, 12 join, 21 aggregate/window.
- Pattern giống task timeout `S-T04` và `A-G03`.
- Chưa có `EXPLAIN ANALYZE` riêng trong bằng chứng hiện tại.

Đánh giá index:

- Chưa có plan riêng để kết luận task này đang dùng index nào.
- Dựa trên bảng và join, nhiều khả năng sẽ dùng index hiện có trên `enrollment`, `assessment_result`, `engagement`.
- Chưa nên thêm index theo cảm tính.
- Sau khi chạy plan, chỉ cân nhắc index nếu còn full scan hoặc join filter không được hỗ trợ.

Hướng sửa đề xuất:

- Xử lý sau nhóm Critical.
- So sánh với `A-B04` vì `A-B04` đã materialize các CTE tương tự.
- Chạy `EXPLAIN ANALYZE` trước khi quyết định rewrite/index.

Mức độ tác động: Cao nếu task auto-run trên student dashboard.  
Rủi ro khi sửa: sai risk label, sai fallback khi thiếu engagement, sai score threshold.

### Task: `S-T04`

Mục đích nghiệp vụ:

- Cho student tự kiểm tra trạng thái at-risk bằng cách kết hợp điểm, engagement, punctuality và background/course context.

Cấu trúc SQL hiện tại:

- CTE: nhóm score context/score aggregation/risk aggregation tương tự `S-B02` và `A-G03`.
- Aggregate: score, pass rate, engagement score, punctuality, risk flags.
- Join chính: `assessment_result`, `assessment`, `enrollment`, `engagement`, `student`, `course`.
- SQL snippet pattern:

```sql
WITH
score_context AS (...),
score_agg AS (...),
eng_agg AS (...),
eng_score AS (...),
risk_flags AS (...)
SELECT ...
FROM ...
WHERE ... :student_id / :class_id
```

Luồng dữ liệu:

```text
assessment_result -> assessment -> enrollment -> score aggregation
engagement -> enrollment -> engagement scoring
student/course context -> risk/self-check output
```

Rủi ro hiệu năng:

- Timeout khoảng 30s.
- SQL dài nhất trong nhóm student risk: 9215 chars.
- Có 7 CTE, 12 join, 21 aggregate/window.
- Có khả năng aggregation toàn cohort trước khi filter output.
- Pattern giống `S-B02` và `A-G03`.

Bằng chứng:

- File SQL: `Backend/src/config/taskRegistry.json` task `S-T04`.
- Registry metrics: 9215 chars, 7 CTE, 12 join, 21 aggregate/window.
- Performance log ghi nhận timeout khoảng 30s.
- Chưa có `EXPLAIN ANALYZE` riêng trong bằng chứng hiện tại; mức Critical dựa trên timeout thật và pattern giống `S-B01`/`A-G03`.

Đánh giá index:

- Chưa có plan riêng nên chưa kết luận index cụ thể đã/không được dùng.
- Vì `S-B01` cùng nhóm score đã dùng index mà vẫn chậm, index không phải giả thuyết fix đầu tiên.
- Nếu rewrite xong vẫn còn scan lớn, kiểm tra composite index theo `batch_id`, `class_id`, `student_id`, `enrollment_id`.

Hướng sửa đề xuất:

- Chạy baseline `EXPLAIN ANALYZE`.
- Materialize CTE aggregate nặng.
- Rewrite tách cohort context và selected student output.
- Không thêm index trước khi có plan mới.

Mức độ tác động: Cao.  
Rủi ro khi sửa: sai scope student/class, sai risk explanation, sai chart fields.

### Task: `A-G03`

Mục đích nghiệp vụ:

- Xác định cohort at-risk cho admin/instructor.

Cấu trúc SQL hiện tại:

- CTE: nhóm score context/score aggregation/engagement aggregation/risk flags.
- Aggregate: score, engagement, punctuality, count/ranking/group risk.
- Join chính: `assessment_result`, `assessment`, `enrollment`, `engagement`, `student`.
- SQL snippet pattern:

```sql
WITH
score_context AS (...),
score_agg AS (...),
eng_agg AS (...),
eng_score AS (...),
risk_flags AS (...)
SELECT ...
FROM risk_flags ...
ORDER BY ...
```

Luồng dữ liệu:

```text
assessment_result + assessment + enrollment -> score/risk
engagement + enrollment -> engagement score
student -> demographic/context
combined risk flags -> cohort output
```

Rủi ro hiệu năng:

- Timeout khoảng 30s.
- Admin scope rộng hơn student scope.
- Aggregate cohort là nghiệp vụ chính, nên query có thể phải xử lý nhiều student trước khi output.
- 7 CTE, 12 join, 21 aggregate/window.

Bằng chứng:

- File SQL: `Backend/src/config/taskRegistry.json` task `A-G03`.
- Registry metrics: 9393 chars, 7 CTE, 12 join, 21 aggregate/window.
- Performance log ghi nhận timeout khoảng 30s.
- Pattern giống `S-T04` và nhóm `A-B04`.

Đánh giá index:

- Chưa có plan riêng nên chưa kết luận index cụ thể.
- Vì query chạy cohort-level, index chỉ giúp join/filter, không tự giảm chi phí aggregation toàn cohort.
- Sau rewrite, cân nhắc index nếu plan còn scan lớn trên `assessment_result` hoặc `engagement`.

Hướng sửa đề xuất:

- Materialize CTE score/engagement/risk.
- Nếu vẫn chậm, tách precompute class-level score/engagement context.
- Cân nhắc cache kết quả theo `batch_id + class_id + taskId` sau khi SQL ổn định.

Mức độ tác động: Cao.  
Rủi ro khi sửa: sai cohort size, sai ranking, sai risk bucket, sai admin chart.

### Task: `A-B04`

Mục đích nghiệp vụ:

- Tạo at-risk overview cho admin/instructor dashboard.

Cấu trúc SQL hiện tại:

- CTE: `score_context`, `score_agg`, `punctuality`, `eng_agg`, `class_max`, `eng_score`, risk overview output.
- 7 CTE, 12 join, 23 aggregate/window.
- SQL được runtime rewrite riêng trong `sqlExecution.service.js`.

Luồng dữ liệu:

```text
assessment_result -> assessment -> enrollment -> score/punctuality
engagement -> enrollment -> engagement scoring
score + engagement + punctuality -> at-risk overview
```

Rủi ro hiệu năng:

- SQL nặng nhưng đã có optimization riêng.
- Đây là bằng chứng hệ thống đã cần materialization cho pattern risk overview.

Bằng chứng:

- File SQL: `Backend/src/config/taskRegistry.json` task `A-B04`.
- Runtime optimization: `Backend/src/services/sqlExecution.service.js:268-276`.
- `A-B04` là task duy nhất được `applyTaskSpecificSqlOptimizations` materialize CTE.

Đánh giá index:

- Chưa có plan riêng trong bằng chứng hiện tại.
- Không nên thêm index riêng cho `A-B04` trước khi so sánh plan đã materialized.
- Dùng `A-B04` làm reference để kiểm chứng `S-B02`, `S-T04`, `A-G03`.

Hướng sửa đề xuất:

- Không sửa ngay nếu không còn timeout.
- Dùng làm baseline pattern.
- Nếu tổng quát hóa optimization, cần test regression vì materialize quá rộng có thể chậm ở query nhỏ.

Mức độ tác động: Trung bình đến cao.  
Rủi ro khi sửa: sai overview metric, sai null handling, mất predicate pushdown nếu materialize quá mức.

### Task: `A-G15`

Mục đích nghiệp vụ:

- Xếp hạng học viên cần can thiệp theo `at_risk_score`.

Cấu trúc SQL hiện tại:

- CTE: `score_agg`, `eng_agg`, `class_max`, `eng_score`, `punctuality`, `risk_flags`.
- Aggregate: score trend, engagement total/active days, punctuality, risk flag sum.
- Join chính: `assessment_result`, `assessment`, `enrollment`, `engagement`, `student`.
- SQL snippet nguồn tại `Backend/src/config/taskRegistry.json:4169`:

```sql
WITH score_agg AS (...),
eng_agg AS (...),
class_max AS (...),
eng_score AS (...),
punctuality AS (...),
risk_flags AS (...)
SELECT ...
FROM risk_flags rf
JOIN student s ON rf.student_id = s.student_id
ORDER BY at_risk_score DESC, rf.avg_score ASC
LIMIT 50
```

Luồng dữ liệu:

```text
assessment_result -> assessment -> enrollment -> score_agg / punctuality
engagement -> enrollment -> eng_agg -> eng_score
score + engagement + punctuality -> risk_flags -> top 50 output
```

Rủi ro hiệu năng:

- `LIMIT 50` không giảm chi phí nếu toàn bộ cohort phải aggregate trước.
- Pattern risk flags giống nhóm timeout.
- 6 CTE, 9 join, 7 aggregate/window.

Bằng chứng:

- File SQL: `Backend/src/config/taskRegistry.json:4139`, `Backend/src/config/taskRegistry.json:4169`.
- Pattern giống `A-G03`.
- Chưa có `EXPLAIN ANALYZE` riêng.

Đánh giá index:

- Chưa có plan riêng.
- Index có thể giúp join/filter, nhưng không xử lý việc aggregate cohort trước `LIMIT`.
- Chỉ cân nhắc index sau khi biết plan còn bottleneck nào.

Hướng sửa đề xuất:

- Kiểm chứng sau `S-B01`, `S-T04`, `A-G03`.
- Nếu plan cho thấy CTE lặp, materialize `score_agg`, `eng_agg`, `risk_flags`.

Mức độ tác động: Trung bình đến cao.  
Rủi ro khi sửa: sai ranking, sai flag priority, sai `LIMIT 50` semantics.

### Task: `A-G16`

Mục đích nghiệp vụ:

- Sinh recommendation tổng hợp cho admin: low engagement count, high risk count, hardest assessment, best resource type, total students.

Cấu trúc SQL hiện tại:

- CTE: `eng_agg`, `class_max`, `eng_score`, `score_agg`, `punctuality`, `risk_flags`.
- Subquery output: `hardest_assessment`, `best_resource_type`.
- Join chính: `assessment_result`, `assessment`, `enrollment`, `engagement`, `event`.
- SQL snippet nguồn tại `Backend/src/config/taskRegistry.json:4256`:

```sql
WITH eng_agg AS (...),
class_max AS (...),
eng_score AS (...),
score_agg AS (...),
punctuality AS (...),
risk_flags AS (...)
SELECT :class_id AS class_id,
       COUNT(*) FILTER (...),
       (SELECT a2.assessment_name ... ORDER BY ... LIMIT 1) AS hardest_assessment,
       (SELECT ev.resource_type ... ORDER BY ... LIMIT 1) AS best_resource_type,
       COUNT(DISTINCT e3.student_id) AS total_students
FROM eng_score es
JOIN risk_flags rf ON rf.student_id = es.student_id
```

Luồng dữ liệu:

```text
engagement -> enrollment -> eng_agg -> eng_score
assessment_result -> assessment -> enrollment -> score_agg / punctuality
score + engagement -> risk_flags
additional subqueries -> hardest assessment / best resource
```

Rủi ro hiệu năng:

- 15 join, cao nhất trong nhóm ưu tiên.
- Có subquery output tạo aggregate riêng ngoài path chính.
- Pattern risk flags giống `A-G03`.

Bằng chứng:

- File SQL: `Backend/src/config/taskRegistry.json:4230`, `Backend/src/config/taskRegistry.json:4256`.
- Registry metrics: 3311 chars, 6 CTE, 15 join, 13 aggregate/window.
- Chưa có `EXPLAIN ANALYZE` riêng.

Đánh giá index:

- Chưa có plan riêng.
- Có thể cần index liên quan `event` sau rewrite nếu subquery resource vẫn scan nhiều.
- Không nên thêm index ngay vì chưa biết bottleneck là CTE chính hay subquery output.

Hướng sửa đề xuất:

- Chạy plan sau nhóm Critical.
- Tách `hardest_assessment` và `best_resource_type` thành CTE riêng nếu plan cho thấy scan lặp.
- Chỉ cân nhắc index `event`/`engagement` sau plan mới.

Mức độ tác động: Trung bình đến cao.  
Rủi ro khi sửa: sai recommendation field, sai total student scope, sai resource ranking.

## 5. Phân tích CTE / MATERIALIZED

### 5.1 CTE ứng viên tốt để `MATERIALIZED`

| CTE | Task liên quan | Lý do |
| --- | --- | --- |
| `score_context` | `S-B01`, `S-B02`, `S-T04`, `A-B04`, `A-G03`, `A-G18` | Nhỏ nhưng nếu inline vào nested loop sẽ bị tính lại nhiều lần |
| `score_agg` | `S-B01`, `S-B02`, `S-T04`, `A-G03`, `A-G15`, `A-G16` | Aggregate cohort trên `assessment_result`, chi phí cao |
| `eng_agg` | `S-B02`, `S-T04`, `A-B04`, `A-G03`, `A-G15`, `A-G16` | Aggregate engagement theo student/enrollment |
| `class_max` | Nhóm engagement scoring | Phụ thuộc `eng_agg`, dùng để normalize |
| `eng_score` | Nhóm risk/intervention | Derived score thường join vào risk flags |
| `punctuality` | Nhóm risk/intervention | Aggregate riêng trên assessment data |
| `risk_flags` | `S-B02`, `S-T04`, `A-G03`, `A-G15`, `A-G16` | Output trung gian dùng cho filter/order/count |

### 5.2 CTE không nên materialize ngay

Không nên materialize theo cảm tính:

- CTE chỉ dùng một lần và có filter mạnh.
- CTE rất nhỏ không nằm trong nested loop.
- Query đơn giản như `S-T02`, `A-S02`, `A-C05`.
- CTE cần predicate pushdown để nhanh hơn.

### 5.3 Nên sửa từng task hay tạo runtime optimization chung?

Khuyến nghị:

1. Sửa/kiểm chứng từng task Critical trước: `S-B01`, `S-T04`, `A-G03`.
2. Nếu cùng một rule materialization cải thiện cả 3 task mà không đổi output, mới tổng quát hóa theo task family.
3. Không blanket materialize mọi CTE trong mọi task.

Kết luận: có thể tổng quát hóa cơ chế hiện đang dùng cho `A-B04`, nhưng chỉ sau khi có bằng chứng `EXPLAIN ANALYZE` trước/sau.

## 6. Phân tích index

Nguồn: `Backend/prisma/schema.prisma`.

### 6.1 Index hiện có

`Enrollment` tại `Backend/prisma/schema.prisma:152`:

| Index/Unique | Dòng | Ý nghĩa |
| --- | --- | --- |
| `@@index([batch_id])` | 185 | Lọc theo batch |
| `@@index([student_id])` | 186 | Join/filter theo student |
| `@@index([class_id])` | 187 | Lọc theo class |
| `@@index([student_id, class_id, source_dataset])` | 188 | Student/class/dataset lookup |
| `@@unique([batch_id, student_id, class_id])` | 189 | Enrollment duy nhất trong batch/class |

`Assessment` tại `Backend/prisma/schema.prisma:196`:

| Index/Unique | Dòng | Ý nghĩa |
| --- | --- | --- |
| `@@index([batch_id])` | 227 | Lọc theo batch |
| `@@index([class_id])` | 228 | Lọc theo class |
| `@@unique([batch_id, class_id, assessment_order])` | 229 | Unique theo batch/class/order |

`AssessmentResult` tại `Backend/prisma/schema.prisma:236`:

| Index/Unique | Dòng | Ý nghĩa |
| --- | --- | --- |
| `@@index([batch_id])` | 262 | Lọc theo batch |
| `@@index([assessment_id])` | 263 | Join với assessment |
| `@@index([student_id])` | 264 | Filter/join theo student |
| `@@index([enrollment_id])` | 265 | Join với enrollment |
| `@@index([student_id, source_dataset])` | 266 | Student/dataset lookup |
| `@@unique([batch_id, enrollment_id, assessment_id])` | 267 | Composite đã được `S-B01` plan dùng |

`Engagement` tại `Backend/prisma/schema.prisma:305`:

| Index/Unique | Dòng | Ý nghĩa |
| --- | --- | --- |
| `@@index([batch_id])` | 329 | Lọc theo batch |
| `@@index([event_id])` | 330 | Join với event |
| `@@index([student_id])` | 331 | Filter/join theo student |
| `@@index([enrollment_id])` | 332 | Join với enrollment |
| `@@index([week_number])` | 333 | Weekly analytics |
| `@@unique([batch_id, student_id, event_id, event_day])` | 334 | Unique engagement fact |

### 6.2 Đánh giá index theo task nguy hiểm

| Task | SQL hiện tại đã dùng index chưa | Nếu đã dùng thì vì sao vẫn chậm | Index còn thiếu sau rewrite | Kết luận |
| --- | --- | --- | --- | --- |
| `S-B01` | Có bằng chứng đã dùng `assessment_result_batch_id_enrollment_id_assessment_id_key` và `assessment_pkey` | Repeated execution: hàng triệu index scan và hàng nghìn aggregate loops | Có thể xem xét `assessment_result(batch_id, student_id, assessment_id)` hoặc `enrollment(batch_id, class_id, student_id, enrollment_id)` nếu plan mới cần | Không thêm ngay |
| `S-B02` | Chưa có plan riêng | Chưa kết luận; pattern có nguy cơ giống `S-B01`/`S-T04` | Chờ plan sau materialize/rewrite | Không thêm ngay |
| `S-T04` | Chưa có plan riêng | Timeout thật, nhưng chưa chứng minh thiếu index; pattern cho thấy query shape rủi ro cao | Chờ plan sau rewrite | Không thêm ngay |
| `A-G03` | Chưa có plan riêng | Timeout thật ở admin scope; index không giảm chi phí aggregate cohort nếu query shape chưa tốt | Chờ plan sau rewrite | Không thêm ngay |
| `A-B04` | Chưa có plan riêng trong báo cáo này | Đã có runtime materialization riêng; cần đo plan đã optimized trước | Chờ plan | Không thêm ngay |
| `A-G15` | Chưa có plan riêng | `LIMIT 50` không tránh aggregate cohort trước limit | Chờ plan | Không thêm ngay |
| `A-G16` | Chưa có plan riêng | Có nhiều join và subquery output; chưa biết bottleneck ở CTE hay subquery | Có thể xem xét `event`/`engagement` sau plan | Không thêm ngay |

### 6.3 Index đề xuất sau rewrite

| Index đề xuất | Task liên quan | Lợi ích dự kiến | Độ ưu tiên | Có nên thêm ngay không |
| --- | --- | --- | --- | --- |
| `enrollment(batch_id, class_id, student_id, enrollment_id)` | `S-B01`, `S-B02`, `S-T04`, `A-G03` | Hỗ trợ batch/class/student scope và join enrollment | Medium | Không |
| `assessment(batch_id, class_id, assessment_id, assessment_order)` | Score/trend tasks | Hỗ trợ assessment lookup theo batch/class/order | Medium | Không |
| `assessment_result(batch_id, student_id, assessment_id)` | Student score tasks | Hỗ trợ student-level result lookup sau rewrite | Medium | Không |
| `engagement(batch_id, enrollment_id, week_number, event_day)` | Engagement/risk tasks | Hỗ trợ engagement aggregation theo enrollment/time | Medium | Không |
| `event(batch_id, class_id, resource_type)` | `A-G16`, resource tasks | Hỗ trợ resource grouping nếu plan mới scan event nhiều | Low/Medium | Không |

Không đề xuất thêm index ngay vì thiếu bằng chứng plan sau rewrite. Index hiện tại đã đủ để chứng minh ít nhất `S-B01` không chậm vì thiếu index cơ bản.

## 7. Task availability và capability validation

Nguồn code:

- `Backend/src/services/capabilityValidator.service.js:495`: `validateTask(...)`.
- `Backend/src/services/capabilityValidator.service.js:593`: `validateAll(...)`.
- `Backend/src/services/capabilityValidator.service.js:599`: validate từng task.
- `Backend/src/services/canonicalCapability.service.js:88`: `buildCanonicalCapabilitySnapshot(...)`.

Nhận định:

- Capability validation không phải root cause của timeout 30s trong SQL execution.
- Nhưng `/tasks/available` có thể là hotspot riêng vì validate nhiều task và build capability snapshot.
- Lần đo thủ công trước đó: `/api/tasks/available?datasetId=SAMPLE_UCI_POR&classId=SAMPLE_UCI_POR_CLASS&role=admin` mất khoảng `742ms`, payload khoảng `123KB`.

Khuyến nghị:

- Cache task availability theo `batchId + classId + role + sourceDataset`.
- Không trộn vấn đề availability với timeout SQL Critical.

## 8. Kế hoạch thực thi

### Phase 1 - Fix các task đã có bằng chứng timeout

Ưu tiên:

1. `S-B01`
2. `S-T04`
3. `A-G03`

Cách làm:

- Chạy baseline `EXPLAIN ANALYZE`.
- Thử materialize CTE nặng.
- Rewrite nếu materialize chưa đủ.
- Không đổi output schema.
- Không thêm index.
- Không tăng timeout.

### Phase 2 - Kiểm chứng

Với từng task:

- `EXPLAIN ANALYZE`.
- Thời gian thực thi.
- Planning time.
- Shared hit/read blocks.
- Loop count.
- Output schema.
- Row count.
- Batch/class/student scope.

Mục tiêu:

- `S-B01` giảm mạnh từ khoảng `17.4s`.
- `S-T04` và `A-G03` hết timeout 30s.
- Chart/render không regression.

### Phase 3 - Mở rộng sang task cùng pattern

Sau khi Phase 1 ổn:

- `S-B02`
- `A-B04`
- `A-G15`
- `A-G16`
- Các task High có `score_agg`, `eng_agg`, `risk_flags`.

### Phase 4 - Đánh giá lại query plan

Chỉ sau khi query shape đã ổn:

- Xem còn full table scan không.
- Xem join nào còn nested loop bất thường.
- Xem filter `batch_id`, `class_id`, `student_id`, `enrollment_id` có dùng index tốt không.

### Phase 5 - Cache, pre-compute, index nếu vẫn cần

Nếu vẫn chậm:

- Cache kết quả analytics theo `taskId + batchId + classId + studentId`.
- Pre-compute class-level score/engagement context sau import hoặc dataset activation.
- Thêm index chỉ khi plan mới chứng minh thiếu.

## 9. Checklist xác thực

Cho từng task sau này khi sửa:

- Không timeout.
- Output schema không đổi.
- Row count hợp lệ.
- Batch scope đúng.
- Class scope đúng.
- Student scope đúng.
- Chart render bình thường.
- Debug agent vẫn PASS.
- Không xuất hiện regression.
- Không tăng timeout để che giấu vấn đề.
- Không thêm index nếu chưa có `EXPLAIN ANALYZE` chứng minh cần.

## 10. Khuyến nghị cuối cùng

### Task cần sửa trước

1. `S-B01`: có `EXPLAIN ANALYZE` thật chứng minh chậm 17.4s và repeated loops cực lớn.
2. `S-T04`: timeout khoảng 30s, SQL dài và pattern giống nhóm risk aggregation.
3. `A-G03`: timeout khoảng 30s, admin cohort scope có tác động cao.

### Task chưa nên đụng trước

- Query nhỏ: `S-T02`, `S-T09`, `S-T11`, `S-T14`, `S-T15`, `S-T17`, `A-S02`, `A-S05`, `A-C05`.
- Task chưa có SQL: `S-T07`, `S-T12`.
- Nhóm Medium chỉ xử lý sau Critical/High.

### Có nên tổng quát hóa optimization hiện tại của `A-B04` không?

Có, nhưng chỉ sau khi kiểm chứng trên `S-B01`, `S-T04`, `A-G03`. Không nên blanket materialize mọi CTE.

### Có nên thêm index ở thời điểm hiện tại không?

Không. Bằng chứng `S-B01` cho thấy PostgreSQL đã dùng index nhưng query vẫn chậm. Thêm index ngay có nguy cơ:

- Không giải quyết root cause.
- Tăng chi phí import/write.
- Tạo migration không cần thiết.
- Làm nhiễu quá trình xác định bottleneck thật.

### Có nên bắt đầu implementation ngay không?

Không nên bắt đầu bằng implementation index. Có thể bắt đầu investigation/fix query shape có kiểm chứng:

1. Baseline `EXPLAIN ANALYZE`.
2. Materialized/rewrite thử nghiệm.
3. So sánh plan trước/sau.
4. Chỉ sau đó mới quyết định index/cache/precompute.

## 11. Kết luận

Timeout hiện tại là vấn đề **query shape / repeated execution** trong SQL Analytics nhiều hơn là vấn đề **thiếu index**.

`S-B01` là bằng chứng mạnh nhất: PostgreSQL đã dùng index, nhưng vẫn chạy khoảng `17.4s` vì plan tạo ra hàng triệu lượt index scan và hàng nghìn lượt aggregate. Vì vậy, hướng xử lý đúng là giảm repeated execution bằng `MATERIALIZED` CTE hoặc rewrite SQL, rồi mới dùng `EXPLAIN ANALYZE` để quyết định index nào thật sự cần.
