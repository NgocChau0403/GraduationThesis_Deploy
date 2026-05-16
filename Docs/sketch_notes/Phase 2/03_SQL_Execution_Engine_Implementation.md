# 03 — SQL Execution Engine Implementation

**Date:** 2026-05-16  
**Phase:** Phase 2 — Task 3.2  
**Status:** ✅ Implemented

---

## Files tạo mới / sửa

| File | Action |
|---|---|
| `src/services/sqlExecution.service.js` | ✅ Tạo mới |
| `src/config/taskRegistry.json` | ✅ Fix 6 tasks thiếu space |
| `scripts/fixSqlSpacing.mjs` | ✅ Tạo mới (utility script) |

---

## Vấn đề phát hiện trước khi build

Trước khi viết engine, chạy audit trên toàn registry để phát hiện 3 vấn đề:

### Vấn đề 1 — `::type_cast` bị misdetect là `:param`

PostgreSQL dùng `::` làm type cast operator:
```sql
e.absences::float   -- cast sang float
score::int          -- cast sang int
```

Naive regex `:([a-zA-Z_]\w*)` sẽ misdetect `::float` → param tên `float`.

**Tác động:** 7 tasks có `::` type cast trong SQL.

**Fix:** Dùng negative lookbehind `(?<!:)` trong regex:
```js
// ❌ Sai — match ::float thành param 'float'
/:([a-zA-Z_][a-zA-Z0-9_]*)/g

// ✅ Đúng — bỏ qua :: type casts
/(?<!:):([a-zA-Z_][a-zA-Z0-9_]*)/g
```

---

### Vấn đề 2 — Thiếu space giữa `:class_id` và SQL keyword

6 tasks có SQL dạng (khi compact single-line):
```sql
-- ❌ Bị detect sai: ':class_idGROUP' thay vì ':class_id'
WHERE e.class_id = :class_idGROUP BY s.socioeconomic_band

-- ✅ Sau fix:
WHERE e.class_id = :class_id GROUP BY s.socioeconomic_band
```

**Tasks bị ảnh hưởng:** `S-T08`, `A-B01`, `A-C01`, `A-G02`, `A-G04`, `A-G08`

**Fix:** Script `scripts/fixSqlSpacing.mjs` — regex replace:
```js
/:class_id(ORDER|WHERE|GROUP|LIMIT|HAVING|JOIN|FROM|AND|OR)/g
→ ':class_id $1'
```

---

### Vấn đề 3 — `:s1`, `:s2` params cho comparison tasks

6 comparison tasks (A-C01 → A-C06) dùng 2 student params thay vì 1:
```sql
-- `:s1` = student 1, `:s2` = student 2
WHERE ar.student_id IN (:s1, :s2)
-- hoặc
JOIN ON student_id = :s1 ... UNION ... student_id = :s2
```

**Xử lý:** Thêm `s1`, `s2` vào `ALLOWED_PARAMS` whitelist.

---

## Kiến trúc SQL Execution Engine

### Core Problem: `:paramName` → `$N`

Registry dùng **named placeholders** (`:student_id`, `:class_id`):
```sql
WHERE ar.student_id = :student_id AND a.class_id = :class_id
```

PostgreSQL/Prisma dùng **positional params** (`$1`, `$2`):
```sql
WHERE ar.student_id = $1 AND a.class_id = $2  -- values = [studentId, classId]
```

Engine phải convert an toàn, không dùng string concatenation.

---

### `buildPositionalQuery(sqlTemplate, params)` — Thuật toán

```
Input:  sqlTemplate = "WHERE ar.student_id = :student_id AND e.class_id = :class_id"
        params      = { student_id: "abc123", class_id: "cls456" }

Step 1: Validate param keys against ALLOWED_PARAMS whitelist
Step 2: Scan template with regex /(?<!:):([a-zA-Z_][a-zA-Z0-9_]*)/g
Step 3: For each match:
          - Check name ∈ ALLOWED_PARAMS (allowlist)
          - Check name ∈ params (completeness)
          - First occurrence: add value to array, assign next $N
          - Duplicate: reuse same $N (deduplication)
          - Replace match with $N
Step 4: Return { sql, values }

Output: sql    = "WHERE ar.student_id = $1 AND e.class_id = $2"
        values = ["abc123", "cls456"]
```

**Deduplication example:**
```sql
-- Input: :class_id xuất hiện 2 lần
WHERE a.class_id = :class_id AND e.class_id = :class_id

-- Output: cả 2 → $1, values chỉ có 1 phần tử
WHERE a.class_id = $1 AND e.class_id = $1
values = ["cls456"]
```

---

### Execution Patterns

#### Pattern A — Single Query (52/53 tasks)
```
task.sqlQuery: string
      ↓
buildPositionalQuery(template, params)
      ↓
prisma.$queryRawUnsafe(sql, ...values)
      ↓
{ data: Object[], meta: { rowCount, executionTimeMs } }
```

#### Pattern B — Multi-Query (S-T07)
```
task.sqlQueries: string[]    (2 queries)
      ↓
for each query (sequential, not parallel):
  executeOne(query, params)
      ↓
{ data: [{ index, data, rowCount }, ...], meta: { queryCount, totalTimeMs } }
```

Sequential (không parallel) vì:
1. Tránh connection pool exhaustion
2. Queries thường có logical order (query 1 cung cấp context cho query 2)

---

### `serializeRows()` — BigInt fix

Prisma trả về `BigInt` cho `COUNT(*)::int` columns. `JSON.stringify` sẽ throw:
```js
JSON.stringify({ count: 42n }) // TypeError: Do not know how to serialize a BigInt
```

Fix: Convert BigInt → Number, Decimal → Number:
```js
typeof v === 'bigint'                    → Number(v)
v?.constructor?.name === 'Decimal'       → v.toNumber()
```

---

### Security Model

| Vector | Protection |
|---|---|
| User-controlled SQL injection | ❌ Không thể — SQL đến từ `taskRegistry.json` (server-controlled) |
| Malicious param value | ✅ Positional params `$1, $2...` — pg driver escapes values |
| Unauthorized param keys | ✅ ALLOWED_PARAMS whitelist — throws nếu key không hợp lệ |
| Missing required params | ✅ Completeness check — throws với param name cụ thể |
| Rogue param names in SQL | ✅ Double-checked at replace time — cả key và SQL-embedded name |

**Tại sao `$queryRawUnsafe` là an toàn ở đây:**
- SQL string đến từ registry (server, không phải user)
- Values được pass qua positional params (pg driver escapes)
- Không có user-supplied SQL fragment nào được concatenate

---

### `dryRunSqlTask()` — Testing mode

```js
const { sql, values, paramMap } = dryRunSqlTask({
  task: taskRegistry.getTaskById('S-B01'),
  params: { student_id: 'abc', class_id: 'cls' }
});
// sql    = "WITH score_agg AS (...) SELECT ... WHERE ar.student_id = $1 ..."
// values = ["abc", "cls"]
// paramMap = { "$1": "student_id = \"abc\"", "$2": "class_id = \"cls\"" }
```

Không execute DB — dùng để unit test param injection logic.

---

## ALLOWED_PARAMS Whitelist (5 params)

| Param | Dùng trong | Ví dụ tasks |
|---|---|---|
| `student_id` | Single-student tasks | S-B01, S-T01, S-T04... |
| `class_id` | Tất cả tasks | Mọi task |
| `enrollment_id` | Tasks có enrollment context | S-T07 |
| `s1` | Comparison tasks (student 1) | A-C01, A-C02, A-C03... |
| `s2` | Comparison tasks (student 2) | A-C01, A-C02, A-C03... |

---

## Output Schema

### Pattern A (single query):
```json
{
  "data": [
    { "avg_score": 72.5, "pass_rate": 0.83, "performance_trend": 1.2 }
  ],
  "meta": {
    "taskId": "S-B01",
    "isMultiQuery": false,
    "rowCount": 1,
    "executionTimeMs": 42
  }
}
```

### Pattern B (multi-query, S-T07):
```json
{
  "data": [
    {
      "index": 0,
      "rowCount": 1,
      "data": [{ "absences": 3, "absence_rate": 0.15 }]
    },
    {
      "index": 1,
      "rowCount": 8,
      "data": [
        { "assessment_order": 1, "score_normalized": 65.0, "pass_flag": true },
        { "assessment_order": 2, "score_normalized": 71.0, "pass_flag": true }
      ]
    }
  ],
  "meta": {
    "taskId": "S-T07",
    "isMultiQuery": true,
    "queryCount": 2,
    "executionTimeMs": 87
  }
}
```

---

## Điểm cần lưu ý

| # | Điểm | Ghi chú |
|---|---|---|
| 1 | `batch_id` KHÔNG có trong ALLOWED_PARAMS | Không cần — data đã batch-scoped sau import. Queries filter qua `class_id` hoặc `student_id` |
| 2 | `s1`, `s2` params cho comparison tasks | Frontend phải pass `{ s1: studentId1, s2: studentId2 }` cho A-C0x tasks |
| 3 | Prisma Decimal type | Nếu schema dùng `Decimal` type thay vì `Float`, `serializeRows()` đã handle |

---

## Design Improvements & Rationale (Post-Review)

> 4 cải tiến được áp dụng sau review. Ghi lại lý do kỹ thuật và trade-off.

---

### Cải tiến 1 — Technical Debt: Regex parser chưa SQL-aware

**Vấn đề:** Regex hiện tại `/(?<!:):([a-zA-Z_][a-zA-Z0-9_]*)/g` chưa phải full SQL tokenizer.

**Những trường hợp sẽ fail:**

| SQL pattern | Tại sao fail |
|---|---|
| `SELECT ':student_id'` | `:student_id` nằm trong string literal → bị detect nhầm |
| `-- comment :class_id` | `:class_id` trong comment → bị detect nhầm |
| `$$ :class_id $$` | Dollar-quoted string → bị detect nhầm |

**Tại sao vẫn chấp nhận ở Phase 2 (intentional tradeoff):**
- ✅ SQL đến từ `taskRegistry.json` — server-controlled, không phải user input
- ✅ Registry đã được audit — không có `:params` nào nằm trong literals/comments
- ✅ Full SQL tokenizer (node-sql-parser) thêm complexity không cần thiết cho MVP
- 📋 **Action required if:** SQL templates trở thành user-editable hoặc AI-generated

**Note trong code:** Comment dài giải thích rõ limitation và điều kiện kích hoạt technical debt.

---

### Cải tiến 2 — BigInt Serialization: Configurable Mode

**Vấn đề:** `Number(999999999999999999999n)` mất precision với integers > `Number.MAX_SAFE_INTEGER` (2^53 - 1 = 9,007,199,254,740,991).

**Giải pháp:** `bigintMode` option:

```js
// Default: convert to Number (safe for row counts < 9 quadrillion)
executeSqlTask({ task, params, options: { bigintMode: 'number' } })

// Future: convert to String (zero precision loss, frontend handles parsing)
executeSqlTask({ task, params, options: { bigintMode: 'string' } })
```

**Khi nào dùng 'string' mode:**
- IDs lớn hơn 2^53 (hiếm với UUID, nhưng có thể xảy ra với BIGSERIAL)
- COUNT kết quả trên dataset cực lớn (> 9 quadrillion rows)
- Yêu cầu exact integer cho billing/audit purposes

**Kết luận cho Phase 2:** `'number'` là safe vì row counts tối đa vài chục nghìn. `'string'` mode sẵn sàng dùng khi cần.

---

### Cải tiến 3 — Query Timeout: `SET LOCAL statement_timeout`

**Vấn đề:** Không có timeout → một analytics query phức tạp có thể block connection pool 10+ phút.

**Giải pháp:** `SET LOCAL statement_timeout` bên trong Prisma transaction:

```js
const raw = await prisma.$transaction(async (tx) => {
  // SET LOCAL: chỉ áp dụng cho transaction này
  // Không ảnh hưởng đến các queries khác trên cùng connection
  await tx.$executeRawUnsafe(`SET LOCAL statement_timeout = ${QUERY_TIMEOUT_MS}`);
  return tx.$queryRawUnsafe(sql, ...values);
});
```

**Tại sao `SET LOCAL` thay vì `SET`:**
| Scope | Effect |
|---|---|
| `SET` | Toàn bộ session (connection) — nguy hiểm nếu dùng connection pooling |
| `SET LOCAL` | Chỉ trong transaction hiện tại → tự động reset sau commit/rollback |

**LIMIT Guardrail bổ sung:**
```js
// Nếu query không có LIMIT → tự động thêm LIMIT 10_000
// Ngăn full-table scan vô tình
const hasLimit = /\bLIMIT\s+\d+/i.test(sql);
if (!hasLimit) sql += ` LIMIT ${MAX_ROWS_GUARDRAIL}`;
```

**Quan trọng đặc biệt cho Phase 3:** Khi AI generate SQL, timeout + LIMIT guardrail là safety net bắt buộc.

---

### Cải tiến 4 — Observability Metadata

**Vấn đề:** `meta` cũ chỉ có `rowCount` + `executionTimeMs` — không đủ cho debugging, benchmarking, AI evaluation.

**Meta schema mới:**
```js
meta: {
  taskId:          "S-B01",       // task identifier
  isMultiQuery:    false,          // Pattern A hay B
  rowCount:        42,             // số rows trả về
  executionTimeMs: 87,             // wall-clock time
  queryHash:       "a3f8b2c1",    // 8-char fingerprint
  cacheHit:        false,          // reserved: future cache layer
  retryCount:      0,              // reserved: future retry logic
}
```

**`queryHash` — thiết kế:**
```js
// Input: taskId + sorted params (order-independent)
// "S-B01:class_id=cls456&student_id=abc123"
// → MD5 → take first 8 hex chars
// Collision rate: 1/4,294,967,296 — đủ cho logging
const hash = md5(`${taskId}:${sortedParams}`).substring(0, 8);
```

**Use cases của từng field:**

| Field | Use case |
|---|---|
| `queryHash` | Replay identical queries, benchmark comparison, AI evaluation correlation |
| `cacheHit` | Khi thêm Redis cache: frontend biết kết quả từ cache hay live |
| `retryCount` | Khi thêm retry logic: biết query đã retry bao nhiêu lần |

**Academic value:** Observability metadata là dấu hiệu của production-grade engineering. Reviewer thích thấy hệ thống có traceability từ đầu, không phải afterthought.
