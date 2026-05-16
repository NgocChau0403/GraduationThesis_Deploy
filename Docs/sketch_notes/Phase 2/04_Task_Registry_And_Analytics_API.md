# 04 — Task Registry API & Analytics Execution Route

**Date:** 2026-05-16  
**Phase:** Phase 2 — Task 3.3 + 3.4  
**Status:** ✅ Implemented

---

## Files tạo mới / sửa

| File | Action |
|---|---|
| `src/controllers/tasks.controller.js` | ✅ Tạo mới |
| `src/controllers/analytics.controller.js` | ✅ Tạo mới |
| `src/routes/task.routes.js` | ✅ Cập nhật (thêm GET routes) |
| `src/routes/analytics.routes.js` | ✅ Tạo mới |
| `src/server.js` | ✅ Sửa — đăng ký `/api/analytics` |

---

## Task 3.3 — Task Registry API

### Endpoints

```
GET /api/tasks                              → List tất cả tasks (filtered)
GET /api/tasks/:taskId                      → Metadata 1 task
GET /api/tasks/validate/:datasetId          → Validate all tasks (đã có)
GET /api/tasks/validate-one/:taskId         → Validate 1 task (đã có)
```

### Lý do Strip SQL fields

`sqlQuery` và `sqlQueries` bị xóa khỏi response:

```js
function sanitizeTask(task) {
  const { sqlQuery, sqlQueries, ...publicFields } = task;
  return publicFields;
}
```

**Tại sao:**
- SQL chứa schema structure (table names, column names, join logic)
- Client không bao giờ cần raw SQL — chỉ cần result data
- Follows principle of **minimal public API surface**
- Nếu SQL bị leak → attacker biết schema → injection easier

### Filter Logic (GET /api/tasks)

4 filters có thể kết hợp:

| Query param | Field check | Example |
|---|---|---|
| `scope` | `task.scope` substring | `?scope=student` |
| `dataset` | `task.datasetCompatibility` | `?dataset=OULAD` |
| `search` | `taskName` OR `actionableQuestion` | `?search=engagement` |
| `analysis` | `task.analytics.analysisType` | `?analysis=trend` |

Tất cả in-memory (no DB query) — registry 53 tasks, đủ nhỏ để filter tại app layer.

### Route Ordering — Tránh shadowing

```js
// ✅ ĐÚNG — Specific paths TRƯỚC dynamic :taskId
router.get("/",                    getTasksController);
router.get("/validate/:datasetId", validateAllTasksController);   // specific
router.get("/validate-one/:taskId",validateOneTaskController);    // specific
router.get("/:taskId",             getTaskByIdController);        // dynamic ← CUỐI CÙNG
```

Nếu `/:taskId` đặt trước, request `GET /validate/batch123` sẽ bị route nhầm thành `getTaskById("validate")`.

---

## Task 3.4 — Analytics Execution Route

### Endpoint

```
POST /api/analytics/run
```

### Request Body

```json
{
  "taskId": "S-B01",
  "params": {
    "batch_id":      "batch_abc",
    "class_id":      "class_xyz",
    "student_id":    "student_123",
    "enrollment_id": "enrl_456",
    "s1":            "student_a",
    "s2":            "student_b"
  }
}
```

**Params guide:**
- `batch_id` → **required** — dùng cho Capability Validator, KHÔNG pass vào SQL
- `class_id` → required cho hầu hết tasks
- `student_id` → required cho scope "1 student"
- `enrollment_id` → required cho S-T07
- `s1`, `s2` → required cho comparison tasks (A-C01 → A-C06)

### Luồng xử lý chi tiết

```
POST /api/analytics/run { taskId, params }
            ↓
[1] Validate request body
    - taskId present?
    - params.batch_id present?
            ↓
[2] TaskRegistryService.getTaskById(taskId)
    - Not found → 404
            ↓
[3] resolveBatchContext(batch_id)
    - prisma.importBatch.findUnique({ batch_id })
    - Not found → 404
    - Found → { batchId, sourceDataset }
            ↓
[4] CapabilityValidator.validateTask(taskId, { batchId, classId, sourceDataset })
    - Runs 4 layers (A, B, C, D)
    - Returns { status, confidence, warnings, layer_results }
            ↓
[5] Check status:
    "unsupported" → 422 STOP (bảng không tồn tại)
    "partial"     → tiếp tục (FE chưa ready, nhưng query chạy được)
    "insufficient_data" → tiếp tục (data ít, nhưng query chạy được)
    "executable"  → tiếp tục (clean)
            ↓
[6] extractSqlParams(params)
    - Xóa batch_id (không trong ALLOWED_PARAMS)
    - Giữ: student_id, class_id, enrollment_id, s1, s2
            ↓
[7] SqlExecutionService.executeSqlTask({ task, params: sqlParams })
    - Param injection: :param → $N
    - SET LOCAL statement_timeout
    - prisma.$queryRawUnsafe
            ↓
[8] Return 200 { success, taskId, data, meta: { ...queryMeta, dataQuality } }
```

### Execution Policy: Hard Block vs Soft Warning

| Status | HTTP | Chạy query? | Lý do |
|---|---|---|---|
| `unsupported` | 422 | ❌ Không | Bảng không tồn tại → query sẽ throw SQL error |
| `partial` | 200 | ✅ Có + warn | FE fields NULL nhưng query hoàn thành — frontend hiển thị warning |
| `insufficient_data` | 200 | ✅ Có + warn | Data ít nhưng kết quả vẫn valid |
| `executable` | 200 | ✅ Có | Clean — không cần warn |

**Tại sao `partial` vẫn chạy (không block):**
- Task như S-T09 (lifestyle_risk_score) vẫn chạy trên UCI data
- Nếu `lifestyle_risk_score` chưa populated → rows sẽ có NULL cho field đó
- Frontend nhận data + warning → tự quyết định cách hiển thị
- Blocking hoàn toàn sẽ làm mất đi phần data vẫn có thể hữu ích

### Response Schema

**Success (executable/partial/insufficient_data):**
```json
{
  "success": true,
  "taskId": "S-B01",
  "data": [
    { "avg_score": 72.5, "pass_rate": 0.83 }
  ],
  "meta": {
    "taskId": "S-B01",
    "isMultiQuery": false,
    "rowCount": 1,
    "executionTimeMs": 87,
    "queryHash": "a3f8b2c1",
    "cacheHit": false,
    "retryCount": 0,
    "dataQuality": {
      "status": "executable",
      "confidence": "HIGH",
      "confidence_reason": "42 students × 8 assessments across 4 weeks",
      "warnings": []
    }
  }
}
```

**Hard block (unsupported):**
```json
{
  "success": false,
  "error": "Task cannot be executed: required database tables are missing.",
  "taskId": "S-B01",
  "capability": {
    "status": "unsupported",
    "missing_requirements": ["Missing table: engagement"],
    "layer_results": {
      "structural": "fail",
      "semantic": "skip",
      "analytical": "skip",
      "data_sufficiency": "skip"
    }
  }
}
```

---

## API Summary — Phase 2 Complete

```
GET  /api/tasks                        List + filter tasks
GET  /api/tasks/:taskId                Single task metadata
GET  /api/tasks/validate/:datasetId    Validate all tasks
GET  /api/tasks/validate-one/:taskId   Validate one task

POST /api/analytics/run                Execute analytics task ← CORE
```

---

## batch_id Flow — Tại Sao Không Pass Vào SQL?

```
batch_id trong request params
        ↓
resolveBatchContext(batch_id)
  → prisma.importBatch.findUnique
  → lấy sourceDataset
        ↓
CapabilityValidator({ batchId, sourceDataset })
  → Layer B: check FE fields WHERE batch_id = $1
  → Layer D: count rows WHERE batch_id = $1
        ↓
extractSqlParams() → xóa batch_id
        ↓
SqlExecution({ student_id, class_id, ... })
  → SQL queries KHÔNG có :batch_id
  → Lý do: sau import, data đã được scoped vào batch
    thông qua student_id ↔ class_id ↔ enrollment relationships
    (không cần WHERE batch_id = X nữa)
```

Thiết kế này tách biệt rõ ràng:
- `batch_id` = **administrative context** (cho validation)
- `student_id`, `class_id` = **analytical context** (cho query)

---

## Design Improvements & Rationale (Post-Review)

> 6 điểm nhận xét sau review. Ghi rõ: implemented ngay, hay Technical Debt.

---

### Cải tiến 3 — `executionId` / Correlation ID ✅ Implemented

**Vấn đề:** Không có cách correlate một request cụ thể qua logs, AI evaluation, hay replay.

**Implementation:**
```js
// Generated at function entry — present in ALL response branches
const executionId = `exec_${Date.now()}_${randomUUID().split('-')[0]}`;

// Format: exec_1747394052123_a3f8b2c1
// → Timestamp prefix: human-readable chronological sort
// → UUID fragment: collision-safe uniqueness
```

**Xuất hiện trong MỌI response:**

| HTTP | Có executionId? | Tại sao |
|---|---|---|
| 200 OK | ✅ | Client correlate success logs |
| 400 Bad Request | ✅ | Debug invalid request |
| 404 Not Found | ✅ | Trace missing task |
| 422 Unprocessable | ✅ | Replay capability-blocked request |
| 500 Server Error | ✅ | Incident response |

**Future use:** replay, distributed tracing (OpenTelemetry span ID), AI evaluation pipeline, benchmark comparison.

---

### Cải tiến 5 — Machine-Readable Warning Codes ✅ Implemented

**Vấn đề:** `warnings: ["Trend analysis requires ≥ 2 time points"]` là plain string — frontend không thể programmatically react, AI không thể match deterministically.

**Giải pháp:** File `src/constants/warningCodes.js` + structured warning objects:

```js
// Trước (plain string):
warnings.push("Trend analysis requires ≥ 2 time points — found 1.")

// Sau (structured object):
warnings.push({
  code:     "INSUFFICIENT_TEMPORAL_POINTS",  // stable identifier
  severity: "warning",                        // "error"|"warning"|"info"
  message:  "Trend analysis requires ≥ 2 time points — found 1.",
  context:  { found: 1, required: 2 }         // machine-parseable context
})
```

**Tất cả codes được định nghĩa:**

| Code | Layer | Severity |
|---|---|---|
| `DATASET_MISMATCH` | B | error |
| `FEATURE_NOT_POPULATED` | B | warning |
| `INSUFFICIENT_TEMPORAL_POINTS` | C | warning |
| `INSUFFICIENT_STUDENT_COUNT` | C | warning |
| `ENROLLMENT_BELOW_MINIMUM` | D | error |
| `ASSESSMENT_RESULTS_BELOW_MINIMUM` | D | error |
| `LOW_DATA_DIVERSITY` | D | info |
| `MISSING_TABLE` | A | error |

**Lợi ích:**
- Frontend render localized messages theo `code` (không hardcode strings)
- AI repair loop: detect `FEATURE_NOT_POPULATED` → trigger ETL re-run
- Evaluation: assert `warnings[0].code === "DATASET_MISMATCH"` thay vì string matching
- Logging/monitoring: alert on `severity === "error"` programmatically

---

### Technical Debt — 4 điểm (Status sau code audit)

> **Có cần làm trước Task 3.5 không?** → **KHÔNG.** Task 3.5 là Student & Class Lookup API (GET endpoints đơn giản, không liên quan đến validation/cache/streaming/intent). Tất cả 4 TDs là optional upgrades cho Phase 2+.

| TD | Nội dung | Code audit | Cần trước 3.5? |
|---|---|---|---|
| TD-1 | Zod/Joi schema validation | ❌ Chưa (Zod chưa install) | Không |
| TD-2 | Capability validation cache | ❌ Chưa (không có cache logic) | Không |
| TD-4 | Streaming & pagination | ⚠️ Partial (LIMIT guardrail ✅, streaming ❌) | Không |
| TD-6 | Analytical intent abstraction | ❌ Chưa (Phase 3 concept) | Không |

---

#### TD-1: Request Schema Validation (Zod/Joi)
**Status:** ❌ Chưa implement — manual validation hiện tại trong controller  
**Code audit:** `zod`, `joi` không có trong `package.json`  
**Approach đề xuất:**
```js
import { z } from 'zod';
const RunAnalyticsSchema = z.object({
  taskId: z.string().min(1),
  params: z.object({
    batch_id:      z.string().uuid(),
    class_id:      z.string().optional(),
    student_id:    z.string().optional(),
    enrollment_id: z.string().optional(),
    s1:            z.string().optional(),
    s2:            z.string().optional(),
  }),
});
// Controller: const validated = RunAnalyticsSchema.parse(req.body);
```
**Lợi ích:** typed contracts, auto-doc (OpenAPI), cleaner controllers  
**Trigger:** Khi API surface mở rộng hoặc cần OpenAPI spec generation

---

#### TD-2: Capability Validation Cache
**Status:** ❌ Chưa implement — 4-layer DB validation chạy full mỗi request  
**Code audit:** `capabilityValidator.service.js` không có cache/TTL/Map logic  
**Approach đề xuất:**
```js
// In-memory TTL cache (hoặc Redis)
const capabilityCache = new Map(); // key → { result, expiresAt }
const cache_key = `cap_${batchId}_${taskId}`;
const TTL = 60_000; // 1 minute

// Before validation:
const cached = capabilityCache.get(cache_key);
if (cached && cached.expiresAt > Date.now()) return cached.result;
```
**Trigger:** Performance profiling cho thấy validation overhead > 100ms

---

#### TD-4: Result Streaming & Pagination
**Status:** ⚠️ Partially implemented
- ✅ `MAX_ROWS_GUARDRAIL = 10_000` đã có trong `sqlExecution.service.js`
- ❌ Streaming response chưa có
- ❌ Cursor-based pagination chưa có

**Còn thiếu:**
```
GET /api/analytics/run?cursor=...&limit=100
```
**Trigger:** Dataset > 50K rows, hoặc AI-generated SQL được enable

---

#### TD-6: Analytical Intent Abstraction
**Status:** ❌ Chưa implement — Pure Phase 3 concept  
**Code audit:** Không có `intent` field trong bất kỳ route nào  
**Vision:**
```json
{
  "intent": "performance_trend",
  "scope": "student",
  "constraints": { "class_id": "...", "dateRange": "..." }
}
→ system auto-resolves taskId, validates, executes
```
**Trigger:** Phase 3 khi AI-driven analytics được enable — current architecture đã đủ flexible để support.

---

### Nhận xét tổng thể về kiến trúc

> *"Phase này thực chất là Execution Governance Layer, không chỉ Express routes"*

Đây là nhận định đúng. Hệ thống hiện tại đang implement:

| Pattern | Biểu hiện |
|---|---|
| **Policy thinking** | Hard block vs soft warn dựa trên policy, không phải code flow |
| **Separation of concerns** | Capability ≠ Execution ≠ Registry — 3 services độc lập |
| **Graceful degradation** | `partial`/`insufficient_data` vẫn chạy với warning |
| **Observability by design** | executionId + queryHash + structured warnings từ đầu |
| **Trust boundaries** | SQL never from user, params through allowlist, table names through whitelist |

Đây là nền tảng đúng để build Phase 3 (AI Integration) — AI layer sẽ consume `executionId`, `queryHash`, structured warning codes để đưa ra recommendations và trigger automated repairs.
