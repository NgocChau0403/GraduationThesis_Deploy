# 02 — Capability Validator Service Implementation

**Date:** 2026-05-16  
**Phase:** Phase 2 — Task 3.1  
**Status:** ✅ Implemented + Schema Verified

## Schema Verification (prisma/schema.prisma)

| Check | Field/Model | Line | Result |
|---|---|---|---|
| `student.batch_id` | `Student.batch_id` | 22 | ✅ Exists |
| `enrollment.batch_id` | `Enrollment.batch_id` | 154 | ✅ Exists |
| `assessment.week_of_class` | `Assessment.week_of_class` | 217 | ✅ Exists |
| `assessment_result.batch_id` | `AssessmentResult.batch_id` | 239 | ✅ Exists (direct column, no JOIN needed) |
| ImportBatch model name | `ImportBatch` → `prisma.importBatch` | 361 | ✅ camelCase |
| ImportBatch PK | `batch_id` (NOT `id`) | 362 | ✅ Confirmed |

### Bugs Fixed After Schema Verification

| Bug | Sai | Đúng |
|---|---|---|
| Prisma accessor | `prisma.import_batch` | `prisma.importBatch` |
| PK field | `where: { id: ... }` | `where: { batch_id: ... }` |
| Return field | `batch.id` | `batch.batch_id` |
| Layer D assessment_result (no classId) | `JOIN assessment WHERE a.batch_id` | `WHERE batch_id = $1` trực tiếp |

---

## Files tạo mới

| File | Mục đích |
|---|---|
| `src/services/capabilityValidator.service.js` | Logic 4 layers |
| `src/controllers/taskValidator.controller.js` | HTTP handler |
| `src/routes/task.routes.js` | Route definitions |
| `src/server.js` | Đăng ký `/api/tasks` (modified) |

---

## Tổng quan luồng

```
Frontend gửi request
        ↓
GET /api/tasks/validate/:datasetId
        ↓
taskValidator.controller.js
  → resolveBatchContext(datasetId)      ← lấy batchId + sourceDataset từ DB
        ↓
capabilityValidator.service.js
  → validateAll() hoặc validateTask()
        ↓ chạy tuần tự 4 layers
  Layer A → Layer B → Layer C → Layer D
        ↓
Return JSON result
```

---

## Chi tiết 4 Layers

### Layer A — Structural Capability
**Mục đích:** Kiểm tra bảng DB có tồn tại không

**Query dùng:**
```sql
SELECT COUNT(*)::int AS cnt
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name   = $1      -- parameterized, SAFE
```

**Input:** `task.sourceTables` (strip annotation trước: `"assessment [OULAD only]"` → `"assessment"`)

**Output:** `{ pass: boolean, missing_tables: string[] }`

**Early exit logic:** Nếu Layer A fail → skip Layer B, C, D và trả về status `"unsupported"` ngay. Không có lý do check tiếp khi bảng không tồn tại.

---

### Layer B — Semantic Capability (FE Fields + Dataset)
**Mục đích:** 2 checks:

**B1. Dataset Compatibility:**
- `OULAD_only` + sourceDataset `"UCI"` → fail
- `UCI_only` + sourceDataset `"OULAD"` → fail
- `both` → always pass

**B2. Stored FE Field Availability:**
- Chỉ check các field có `storage: "stored"` trong `task.fe_fields`
- `computed` fields bỏ qua (chúng được tính tại runtime, không lưu trong DB)
- Query:
```sql
SELECT COUNT(*)::int AS cnt
FROM "{table}"
WHERE "{field}" IS NOT NULL
  AND batch_id = $1
```
- Dùng `$queryRawUnsafe` nhưng **table name được validate qua whitelist** trước
- Field name được kiểm tra bằng regex `^\w+$` để chặn injection

**Output:** `{ pass, missing_fe_fields, compatibility_mismatch }`

---

### Layer C — Analytical Capability
**Mục đích:** Check data có đủ cấu trúc cho analysis type không

| analysisType | Check | Threshold |
|---|---|---|
| `trend` | `COUNT(DISTINCT week_of_class)` | ≥ 2 tuần |
| `comparison` | `COUNT(DISTINCT student_id)` | ≥ 2 students |
| `correlation` | (pass nếu A+B pass) | — |
| `distribution` | (always pass) | — |
| `aggregation` | (always pass) | — |
| `synthesis` | (always pass) | — |

**⚠️ Layer C chỉ WARN, không bao giờ hard-fail.**  
Task vẫn có thể chạy nhưng kết quả cần diễn giải cẩn thận.

**Output:** `{ pass: true, warnings: string[] }`

---

### Layer D — Data Sufficiency
**Mục đích:** Check có đủ dữ liệu thô không

**Thresholds (minimum viable):**
- `enrollment` count < 5 → **fail** ("insufficient_data")
- `assessment_result` total < 2 → **fail**

**Composite Confidence — 3 quality dimensions:**
| Dimension | Ý nghĩa | Query |
|---|---|---|
| `distinct_students` | Độ rộng population | `COUNT(DISTINCT ar.student_id)` |
| `distinct_assessments` | Diversity of data points | `COUNT(DISTINCT ar.assessment_id)` |
| `distinct_weeks` | Temporal spread | `COUNT(DISTINCT a.week_of_class)` |

**Confidence bands (composite):**
| Band | Điều kiện |
|---|---|
| HIGH | students ≥ 10 AND assessments ≥ 3 AND weeks ≥ 2 |
| MEDIUM | students ≥ 5 AND assessments ≥ 2 |
| LOW | valid nhưng limited diversity |

> **Lý do không dùng raw COUNT(*)**: 100 rows từ 1 student hoặc 1 assessment = quality thấp. Composite metric là điểm academic reviewer hay soi.

**Tại sao JOIN là bắt buộc ở Layer D:**
- `assessment_result.batch_id` → dùng trực tiếp (`ar.batch_id = $1`) ✅
- `week_of_class` và `class_id` → chỉ có trên bảng `assessment` → JOIN là architectural necessity, không phải overhead tùy tiện
- Filter batch qua `ar.batch_id` (không qua `a.batch_id`) để tránh coupling

```sql
SELECT
  COUNT(DISTINCT ar.student_id)::int    AS distinct_students,
  COUNT(DISTINCT ar.assessment_id)::int AS distinct_assessments,
  COUNT(DISTINCT a.week_of_class)::int  AS distinct_weeks
FROM assessment_result ar
JOIN assessment a ON ar.assessment_id = a.assessment_id
WHERE ar.batch_id = $1   -- ar.batch_id, NOT a.batch_id
  AND a.class_id  = $2   -- class_id từ assessment (bắt buộc JOIN)
```

**Output:** `{ pass, confidence, confidence_reason }`

---

## Output Schema đầy đủ

```json
{
  "task_id": "S-B01",
  "executable": true,
  "status": "executable",
  "confidence": "HIGH",
  "confidence_reason": "42 students × 8 assessments across 4 weeks — strong statistical basis.",
  "warnings": [],
  "missing_requirements": [],
  "layer_results": {
    "structural":       "pass",
    "semantic":         "pass",
    "analytical":       "pass",
    "data_sufficiency": "pass"
  }
}
```

**Possible `status` values:**
| Status | Condition |
|---|---|
| `executable` | Tất cả layers pass |
| `partial` | Layer B fail (dataset mismatch hoặc FE chưa chạy) |
| `insufficient_data` | Layer D fail |
| `unsupported` | Layer A fail (bảng không tồn tại) |

---

## API Endpoints

```
GET /api/tasks/validate/:datasetId?classId=...
→ Validate tất cả 53 tasks
→ Trả về { summary, results[] } sorted by status

GET /api/tasks/validate-one/:taskId?datasetId=...&classId=...
→ Validate 1 task cụ thể
→ Trả về { result }
```

---

## Security Notes

| Vấn đề | Cách xử lý |
|---|---|
| Dynamic table names | Validate qua `ALLOWED_TABLES` whitelist trước khi dùng `$queryRawUnsafe` |
| Dynamic field names | Regex `^[a-zA-Z_][a-zA-Z0-9_]*$` — strict SQL identifier syntax |
| User input (batchId, classId) | Dùng `prisma.$queryRaw` với template literal → tự parameterize |

**Tại sao regex `^[a-zA-Z_][a-zA-Z0-9_]*$` tốt hơn `^\w+$`:**
- `\w` trong JS match cả Unicode word chars (ký tự tiếng Nhật, Arabic...) tùy engine
- `^[a-zA-Z_][a-zA-Z0-9_]*$` là exact match với PostgreSQL identifier syntax
- Phải bắt đầu bằng letter hoặc `_` — không cho phép digit đầu (SQL standard)
- An toàn hơn khi deploy trên môi trường có locale khác nhau

---

## Checklist Trước Khi Test

| # | Điểm kiểm tra | Status |
|---|---|---|
| 1 | `student.batch_id` tồn tại trong schema | ✅ Verified (line 22) |
| 2 | `enrollment.batch_id` tồn tại trong schema | ✅ Verified (line 154) |
| 3 | `assessment.week_of_class` tồn tại trong schema | ✅ Verified (line 217) |
| 4 | `assessment_result.batch_id` tồn tại trực tiếp | ✅ Verified (line 239) |
| 5 | Prisma accessor: `prisma.importBatch` (camelCase) | ✅ Fixed |
| 6 | ImportBatch PK: `batch_id` không phải `id` | ✅ Fixed |
| 7 | Layer B stored FE fields: ETL pipeline đã chạy FE computation chưa? | ⚠️ Runtime check |

---

## Design Improvements & Rationale

> Phần này ghi lại 3 cải tiến được áp dụng sau quá trình review, giải thích lý do kỹ thuật và học thuật.

---

### Cải tiến 1 — Kiến trúc JOIN Layer D

**Vấn đề phát hiện:** Note ban đầu ghi `assessment_result.batch_id exists directly (no JOIN needed)` nhưng code Layer D vẫn JOIN và filter qua `a.batch_id`. Đây là inconsistency giữa documentation và implementation.

**Phân tích kiến trúc:**

| Trường hợp | JOIN có cần không? | Lý do |
|---|---|---|
| Không có `classId` | ❌ Không cần JOIN | `ar.batch_id = $1` là đủ |
| Có `classId` | ✅ Bắt buộc JOIN | `class_id` chỉ có trên `assessment`, không có trên `assessment_result` |
| Lấy `week_of_class` | ✅ Bắt buộc JOIN | `week_of_class` chỉ có trên `assessment` |

**Quy tắc sau fix:**
- Batch filter luôn qua `ar.batch_id` (canonical, không phụ thuộc JOIN)
- JOIN `assessment` chỉ khi cần `class_id` hoặc `week_of_class`
- Tránh filter qua `a.batch_id` để không tạo coupling không cần thiết

```sql
-- ✅ Đúng — batch filter qua ar.batch_id
FROM assessment_result ar
JOIN assessment a ON ar.assessment_id = a.assessment_id
WHERE ar.batch_id = $1   -- ar, không phải a
  AND a.class_id  = $2   -- JOIN bắt buộc cho filter này

-- ❌ Sai — coupling thừa
WHERE a.batch_id = $1    -- phụ thuộc vào JOIN
```

---

### Cải tiến 2 — Composite Confidence Metric

**Vấn đề phát hiện:** `COUNT(*) > 100 → HIGH` là primitive metric. Không phản ánh statistical quality thực tế.

**Ví dụ cụ thể vấn đề:**

| Scenario | Raw COUNT | Chất lượng thực tế |
|---|---|---|
| 200 rows, 1 student, 1 assessment | 200 → HIGH (cũ) | Thực ra rất thấp |
| 30 rows, 15 students, 6 assessments, 4 weeks | 30 → MEDIUM (cũ) | Thực ra đủ tốt |

**3 quality dimensions được chọn:**

| Dimension | Đo lường | Threshold |
|---|---|---|
| `distinct_students` | Breadth of population | HIGH ≥ 10, MEDIUM ≥ 5 |
| `distinct_assessments` | Measurement point diversity | HIGH ≥ 3, MEDIUM ≥ 2 |
| `distinct_weeks` | Temporal spread | HIGH ≥ 2 |

**Composite logic:**
```
HIGH   = distinct_students ≥ 10
         AND distinct_assessments ≥ 3
         AND distinct_weeks ≥ 2
         → "42 students × 8 assessments across 4 weeks"

MEDIUM = distinct_students ≥ 5
         AND distinct_assessments ≥ 2
         → "8 students × 3 assessments (1 week)"

LOW    = valid (pass threshold) nhưng limited diversity
         → "2 student(s), 2 assessment(s), 1 week(s) — interpret cautiously"
```

**Academic defensibility:** Composite metric align với statistical sampling theory — một sample tốt phải có breadth (nhiều subject), depth (nhiều measurements), và temporal validity (spread over time).

---

### Cải tiến 3 — SQL Identifier Regex

**Vấn đề phát hiện:** `^\w+$` hơi rộng và không đủ strict cho SQL identifier.

**So sánh chi tiết:**

| Regex | Match `123abc` | Match `café` (unicode) | Match `_field` | Đúng SQL syntax |
|---|---|---|---|---|
| `^\w+$` | ✅ (digit đầu) | ✅ (unicode) | ✅ | ❌ digit đầu không hợp lệ trong SQL |
| `^[a-zA-Z_][a-zA-Z0-9_]*$` | ❌ (blocked) | ❌ (blocked) | ✅ | ✅ |

**Tại sao `\w` nguy hiểm:**
- JS `\w` = `[A-Za-z0-9_]` theo ECMAScript spec — về lý thuyết an toàn
- Nhưng với Unicode flag (`/\w/u`) → match toàn bộ Unicode word chars
- Trên các hệ thống có locale khác → behavior có thể khác nhau
- `123abc` hợp lệ với `^\w+$` nhưng không phải SQL identifier hợp lệ

**Regex sau fix:**
```js
// Phải bắt đầu bằng letter hoặc underscore
// Phần còn lại: alphanumeric + underscore, strictly ASCII
/^[a-zA-Z_][a-zA-Z0-9_]*$/

// Match: field_name, avg_score, _internal, Field2
// Block: 123abc, café, field-name, field name, field;DROP
```

Đây là chuẩn định nghĩa PostgreSQL identifier theo [PostgreSQL docs §4.1.1](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS).
