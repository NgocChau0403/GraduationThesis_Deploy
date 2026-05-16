# 05 — Student & Cohort Lookup API

**Date:** 2026-05-16  
**Phase:** Phase 2 — Task 3.5  
**Status:** ✅ Implemented

---

## Files tạo mới / sửa

| File | Action |
|---|---|
| `src/controllers/students.controller.js` | ✅ Tạo mới (3 controllers) |
| `src/routes/students.routes.js` | ✅ Tạo mới |
| `src/routes/classes.routes.js` | ✅ Tạo mới |
| `src/server.js` | ✅ Sửa — đăng ký `/api/students`, `/api/classes` |

---

## Endpoints

```
GET /api/students?batchId=...&classId=...          → List students (dropdown)
GET /api/students/:studentId/summary?batchId=...   → Student detail + performance
GET /api/classes?batchId=...                       → List classes (dropdown)
```

---

## Thiết kế quan trọng: Prisma ORM vs Raw SQL

Đây là điểm khác biệt kiến trúc quan trọng so với `sqlExecution.service.js`:

| | Analytics Execution | Lookup API |
|---|---|---|
| Engine | `prisma.$queryRawUnsafe` | `prisma.enrollment.findMany()` |
| SQL | Template từ registry (53 tasks) | Prisma ORM query builder |
| Params | `:paramName → $N` injection | Prisma where clause (type-safe) |
| Use case | Analytical, complex CTEs | Simple relational lookup |

**Tại sao Prisma ORM cho Lookup?**
- Queries là relational lookups đơn giản (JOIN 2 tables, no CTEs)
- Prisma ORM type-safe: sai field name → lỗi build time, không phải runtime
- Không cần ALLOWED_PARAMS whitelist (Prisma tự escape values)
- Code sạch hơn, dễ đọc hơn raw SQL strings

---

## Controller 1 — GET /api/students

### Query logic
```js
// Prisma enrollment.findMany với include student
const enrollments = await prisma.enrollment.findMany({
  where: { batch_id: batchId, class_id: classId },
  select: {
    enrollment_id: true, class_id: true, final_outcome: true,
    student: { select: { student_id, gender, age_group, ... } }
  }
});
```

### Flattening pattern
Response trả về **flat object** thay vì nested `{ student: {...}, enrollment_id }`:
```js
// ❌ Nested (không tiện cho frontend)
{ enrollment_id: "e1", class_id: "c1", student: { student_id: "s1", gender: "M" } }

// ✅ Flat (frontend dùng trực tiếp)
{ enrollment_id: "e1", class_id: "c1", student_id: "s1", gender: "M" }
```

**Tại sao flatten:** Frontend hiển thị danh sách dropdown không cần biết internal JOIN structure. API đã abstract away complexity.

### Response
```json
{
  "success": true,
  "count": 42,
  "students": [
    {
      "enrollment_id": "enrl_abc",
      "class_id": "AAA-2013J",
      "final_outcome": "Pass",
      "absences": 3,
      "student_id": "s12345",
      "gender": "Male",
      "age_group": "35-55",
      "socioeconomic_band": "C"
    }
  ]
}
```

---

## Controller 2 — GET /api/students/:studentId/summary

### Query logic (2 steps)

**Step 1:** `enrollment.findFirst()` với `include: { student }` → demographic + enrollment fields

**Step 2:** `Promise.all()` cho 2 queries song song:
```js
const [arStats, passedCount] = await Promise.all([
  // Aggregate: avg_score + total_count
  prisma.assessmentResult.aggregate({
    where: { enrollment_id, batch_id },
    _avg:   { score_normalized: true },
    _count: { result_id: true },
  }),
  // Separate count: pass_flag = true
  // Tại sao tách: Prisma aggregate() không hỗ trợ SUM(boolean)
  prisma.assessmentResult.count({
    where: { enrollment_id, batch_id, pass_flag: true },
  }),
]);
```

**Tại sao `Promise.all()` thay vì sequential:**
- 2 queries không phụ thuộc nhau → có thể chạy song song
- Giảm latency: sequential = T1 + T2, parallel = max(T1, T2)

### Performance section
```json
"performance": {
  "avg_score":        72.45,
  "assessment_count": 8,
  "passed_count":     6,
  "pass_rate":        0.75
}
```

**pass_rate:** 4 decimal places (0.7500) — đủ cho frontend `(75.00%)`.

### Response
```json
{
  "success": true,
  "student": {
    "student_id": "s12345",
    "gender": "Male",
    "age_group": "35-55",
    "disability_flag": false,
    "lifestyle_risk_score": 2.3,
    "support_score": 7.1
  },
  "enrollment": {
    "enrollment_id": "enrl_abc",
    "class_id": "AAA-2013J",
    "final_outcome": "Pass",
    "absences": 3,
    "studytime": 2,
    "previous_attempt_count": 0,
    "study_load_credits": 60,
    "registration_lead_time": 14
  },
  "performance": {
    "avg_score": 72.45,
    "assessment_count": 8,
    "passed_count": 6,
    "pass_rate": 0.75
  }
}
```

---

## Controller 3 — GET /api/classes

### Query logic
```js
prisma.class.findMany({
  where: { batch_id: batchId },
  select: {
    class_id, course_id, source_dataset, class_run,
    semester, academic_year, duration_days, delivery_mode,
    _count: { select: { enrollments: true } }  // ← Prisma count via relation
  }
});
```

**`_count.enrollments`:** Prisma tự generate `COUNT(enrollment_id)` từ relation.
Không cần viết raw `COUNT(*)` SQL.

### Flattening `_count`
```js
// Prisma trả về:
{ class_id: "AAA-2013J", _count: { enrollments: 42 } }

// Flatten thành:
{ class_id: "AAA-2013J", student_count: 42 }
```

`_count` là Prisma internal field → không expose ra API surface.

### Response
```json
{
  "success": true,
  "count": 12,
  "classes": [
    {
      "class_id": "AAA-2013J",
      "course_id": "AAA",
      "source_dataset": "OULAD",
      "class_run": "2013J",
      "semester": "J",
      "academic_year": 2013,
      "duration_days": 241,
      "delivery_mode": "blended",
      "student_count": 42
    }
  ]
}
```

---

## API Routing Design — Tách `students` vs `classes`

```
/api/students  → students.routes.js  ← controller: students.controller.js
/api/classes   → classes.routes.js   ← controller: students.controller.js (reuse)
```

**Tại sao 2 route files nhưng 1 controller file?**
- Route files tách để URL prefix rõ ràng (`/api/students` vs `/api/classes`)
- Controller chung vì logic liên quan (lookup phục vụ cùng mục đích)
- Nếu sau này classes cần nhiều endpoints hơn → split controller dễ dàng

---

## Toàn bộ API Surface — Phase 2 Hoàn thành

```
── Import ───────────────────────────────────────────────────────────────
POST /api/import/upload
POST /api/import/confirm
...

── Datasets ─────────────────────────────────────────────────────────────
GET  /api/datasets

── Tasks ────────────────────────────────────────────────────────────────
GET  /api/tasks                         List + filter 53 tasks
GET  /api/tasks/:taskId                 Single task metadata
GET  /api/tasks/validate/:datasetId     Validate all tasks
GET  /api/tasks/validate-one/:taskId    Validate one task

── Analytics ────────────────────────────────────────────────────────────
POST /api/analytics/run                 Execute task (core)

── Lookup ───────────────────────────────────────────────────────────────
GET  /api/students                      List students (dropdown)
GET  /api/students/:studentId/summary   Student detail + performance
GET  /api/classes                       List classes (dropdown)
```

---

## Điểm cần lưu ý

| # | Điểm | Ghi chú |
|---|---|---|
| 1 | `lifestyle_risk_score`, `support_score` có thể null | Nếu ETL FE step chưa chạy → fields null, không error |
| 2 | `classId` optional trong GET /api/students | Không pass classId → trả students trong batch (paginated) |
| 3 | `Promise.all` trong summary | 2 DB queries song song — sequential nếu có connection pool issue |
| 4 | Pagination mặc định: pageSize=50, max=200 | Tuned cho dropdown UX — đủ nhanh, đủ data |

---

## Design Improvements & Rationale (Post-Review)

> 7 điểm nhận xét. Ghi rõ: implemented ngay hay Technical Debt.

---

### Cải tiến 1 — Pagination ✅ Implemented

**Vấn đề:** OULAD có ~32K students. Không có pagination → 32K rows/response → timeout + memory exhaustion.

**Implementation:**
```js
// Params: page (1-based), pageSize (default 50, max 200)
const page     = Math.max(1, parseInt(req.query.page) || 1);
const pageSize = Math.min(200, Math.max(1, parseInt(req.query.pageSize) || 50));
const skip     = (page - 1) * pageSize;

// Parallel: count tổng + fetch page hiện tại
const [total, enrollments] = await Promise.all([
  prisma.enrollment.count({ where }),
  prisma.enrollment.findMany({ where, skip, take: pageSize }),
]);
```

**Response `pagination` object:**
```json
"pagination": {
  "page": 1,
  "pageSize": 50,
  "total": 3258,
  "totalPages": 66,
  "hasNext": true,
  "hasPrev": false
}
```

**Tại sao `Promise.all` cho count + data:** count và findMany không phụ thuộc nhau → parallel giảm latency.

**pageSize max = 200:** Cap tránh client request 10K rows. Với dropdown, 50-100 đủ. 200 cho admin view.

---

### Cải tiến 6 — `safeRound` Utility ✅ Implemented

**Vấn đề:** `pass_rate` được tính khác nhau ở mỗi controller:
```js
// Trong students.controller:
Math.round((passedCount / totalCount) * 10_000) / 10_000

// Trong analytics.controller (future):
Math.round(value * 100) / 100   ← khác precision
```

→ **Metric drift:** cùng một metric được round khác nhau ở các endpoints khác nhau.

**Fix:** `src/utils/math.js` — centralized:
```js
safeRound(value, decimals = 2)   // null-safe, NaN-safe
computePassRate(passed, total)   // null nếu total=0, precision=4
```

**Kết quả:** students.controller không còn inline math — dùng `safeRound(avgScore, 2)` và `computePassRate(passedCount, totalCount)`.

---

### Technical Debt — 5 điểm

| TD | Nội dung | Cần ngay? |
|---|---|---|
| TD-2 | Sort/filter contracts | Khi dashboard cần sort/filter |
| TD-3 | `/summary` endpoint creep | Monitor khi thêm features |
| TD-4 | DTO/schema layer | Khi chuyển TypeScript |
| TD-5 | API caching (/classes) | Khi có performance issue |
| TD-7 | MetricDefinitionRegistry | Khi nhiều metric được dùng cross-service |

---

#### TD-2: Sorting & Filter Contracts
**Status:** ❌ Chưa implement — API hiện chỉ filter by batchId/classId  
**Approach đề xuất:**
```
GET /api/students?batchId=...&sort=avg_score_desc&outcome=Pass&search=...
```
**Trigger:** Dashboard cần sortable table, searchable list

---

#### TD-3: /summary Endpoint Creep — Pattern Warning
**Status:** ⚠️ Không phải bug, là architectural risk  
**Vấn đề:** Nếu sau này thêm vào `/summary`:
```
recent assessments → +1 DB query
engagement trend   → +1 DB query
alerts             → +1 DB query
AI recommendations → +1 external call
```
→ Endpoint biến thành "god endpoint" với 5+ queries per request.

**Pattern để avoid:**
- Giữ `/summary` chỉ cho **quick stats** (demographic + performance aggregate)
- Thêm sub-endpoints thay vì phình `/summary`:
  - `GET /students/:id/assessments` (timeline)
  - `GET /students/:id/engagement` (engagement trend)
  - `GET /students/:id/alerts` (risk alerts)
- Frontend compose từ multiple endpoints (hoặc dùng GraphQL sau này)

---

#### TD-4: Response DTO/Schema Layer
**Status:** ❌ Chưa implement — controller tự shape response  
**Approach đề xuất (TypeScript-ready):**
```ts
interface StudentSummaryDTO {
  student:     StudentProfile;
  enrollment:  EnrollmentContext;
  performance: PerformanceMetrics;
}
interface PerformanceMetrics {
  avg_score:        number | null;
  assessment_count: number;
  passed_count:     number;
  pass_rate:        number | null; // 4 decimal places
}
```
**Trigger:** Khi migrate sang TypeScript hoặc cần API contract cho Swagger/OpenAPI

---

#### TD-5: API Caching
**Status:** ❌ Chưa implement  
**Các endpoint cacheable:**

| Endpoint | TTL đề xuất | Lý do |
|---|---|---|
| `GET /classes?batchId=...` | 5 phút | Class list ít thay đổi sau import |
| `GET /students?classId=...&page=1` | 1 phút | Stable data, high frequency |
| `GET /students/:id/summary` | 30 giây | Per-student, medium frequency |

**Approach:**
```js
// In-memory Map với expiry (hoặc Redis)
const cache = new Map(); // key → { data, expiresAt }
const cacheKey = `classes_${batchId}`;
```
**Trigger:** Response time profiling > 200ms on repeated calls

---

#### TD-7: MetricDefinitionRegistry
**Status:** ❌ Chưa implement — `safeRound` + `computePassRate` là bước đầu  
**Hiện trạng:** `src/utils/math.js` đã có 2 centralized utilities — đây là hạt nhân của registry.  
**Vision:**
```js
// MetricDefinitions.js
export const Metrics = {
  avg_score:  { compute: (rows) => safeRound(mean(rows, 'score_normalized'), 2) },
  pass_rate:  { compute: (rows) => computePassRate(countWhere(rows, 'pass_flag'), rows.length) },
  risk_score: { compute: (student) => student.lifestyle_risk_score },
};
```
**Trigger:** Khi 3+ services bắt đầu compute cùng một metric độc lập nhau
