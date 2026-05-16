# Phase 2 Readiness Assessment & Implementation Plan

Backend Analytics Core — Weeks 4–6
Assessment Date: 2026-05-16 | Status: Phase 1 ✅ COMPLETE — Phase 2 Ready to Begin

## 1. Phase 1 Completion Audit

### ✅ Đã hoàn thành (Production-Ready)
| Component | File | Trạng thái |
|---|---|---|
| PostgreSQL Schema (8 tables) | prisma/schema.prisma | ✅ Đầy đủ — tất cả FE fields in-table |
| CSV Parse | csvParse.service.js | ✅ |
| Schema Detect & Profile | schemaDetect.service.js, profiling.service.js | ✅ |
| Mapping Suggest (Heuristic + Adaptive Memory) | mappingSuggest.service.js | ✅ |
| Mapping Validation | mappingValidation.service.js | ✅ |
| Mapping Transform (8-entity routing + row-level FE) | mappingTransform.service.js | ✅ |
| In-Table Feature Engineering — Student composite | compositeFeatures.service.js | ✅ |
| Entity Insert (topological order, chunked) | entityInsert.service.js | ✅ |
| Import Pipeline Orchestrator | runImportPipeline.service.js | ✅ |
| Data Preview (dry-run) | previewMappingController | ✅ |
| Alias Learning (Adaptive Memory) | aliasMemory.repository.js, learnedAliases.json | ✅ |
| Task Registry JSON (52 tasks seed) | config/taskRegistry.json | ✅ |
| Task Registry Service (load, filter, search) | taskRegistry.service.js | ✅ |
| Dataset Management API | dataset.routes.js, dataset.controller.js | ✅ |
| Import API Routes | import.routes.js | ✅ |
| Sample Dataset Seeder | sampleSeeder.service.js | ✅ |

### ⚠️ Có nhưng chưa được dùng (Phase 2 Utility)
| Component | File | Ghi chú |
|---|---|---|
| Cohort Stats (cross-table compute) | cohortStats.service.js | Đã viết nhưng chưa được wire vào route nào — có thể dùng trong Phase 2 |

### ❌ Chưa tồn tại — Phase 2 cần build
| Component | File cần tạo | Priority |
|---|---|---|
| Capability Validator (4-layer) | capabilityValidator.service.js | 🔴 P1 |
| SQL Execution Engine | sqlExecution.service.js | 🔴 P1 |
| Analytics Route + Controller | analytics.routes.js, analytics.controller.js | 🔴 P1 |
| Task Registry Route | tasks.routes.js, tasks.controller.js | 🟡 P2 |
| Visualization Metadata Service | visualization.service.js | 🟡 P2 |
| Student/Cohort Lookup Route | students.routes.js | 🟡 P2 |

## 2. Phase 2 Architecture — Luồng tổng thể

```
[Frontend Request]
      ↓
GET /api/tasks?datasetId=...
      ↓
TaskRegistryService.getAllTasks()           ← đọc từ taskRegistry.json (đã có)
      ↓
CapabilityValidatorService.validateAll()   ← PHASE 2 BUILD
  → Layer A: structural check (tables exist?)
  → Layer B: semantic check (FE fields populated?)
  → Layer C: analytical check (temporal dims? groups?)
  → Layer D: data sufficiency (row counts? min thresholds?)
      ↓
Return: [{ taskId, executable, status, confidence, layer_results }]
      ↓
[User chọn task + set params]
      ↓
POST /api/analytics/run { taskId, params: { enrollmentId, classId, ... } }
      ↓
1. TaskRegistryService.getTaskById(taskId)  ← lấy sql_query template
2. CapabilityValidator.validate(taskId)     ← re-check executability
3. SqlExecutionService.run(sql_query, params) ← inject params + execute
4. Return { data: [], meta: { rowCount, executionTime, confidence } }
      ↓
[Frontend] ChartRenderer renders viz_type component
      ↓
POST /api/ai/explain { taskId, data, context }   ← Phase 3
      ↓
AIInsightPanel displays NL narrative
```

## 3. Kế hoạch chi tiết Phase 2

### 3.1 Task 1: Capability Validator Service 🔴
**File:** `src/services/capabilityValidator.service.js`

**Logic chi tiết — 4 Layers:**

*   **Layer A — Structural Capability**
    *   **Input:** `{ task, activeDataset (batch_id, source_dataset) }`
    *   **Logic:**
        *   Với mỗi table trong `task.sourceTables`:
            → `prisma.$queryRaw SELECT COUNT(*) FROM information_schema.tables WHERE table_name = ${tableName}`
            → Nếu count = 0 → `structural: "fail"`, `status: "unsupported"`
        *   Với mỗi field trong `task.keyDbFields` (raw fields only, bỏ `[FE]`):
            → `prisma.$queryRaw SELECT COUNT(*) FROM information_schema.columns WHERE table_name = ${table} AND column_name = ${field}`
    *   **Output:** `{ pass: boolean, missing_tables: [], missing_fields: [] }`

*   **Layer B — Semantic Capability (FE Fields)**
    *   **Input:** `{ task, batch_id }`
    *   **Logic:**
        *   Extract FE fields từ `keyDbFields` (có nhãn `[FE single]`)
        *   Với mỗi FE field:
            → `SELECT COUNT(*) FROM {table} WHERE {fe_field} IS NOT NULL AND batch_id = :batch_id`
            → Nếu count = 0 → `semantic: "fail"`
        *   Nếu `datasetCompatibility = "OULAD_only"` và `source_dataset ≠ "OULAD"` → fail
        *   Nếu `datasetCompatibility = "UCI_only"` và `source_dataset ≠ "UCI"` → fail
    *   **Output:** `{ pass: boolean, missing_fe_fields: [], compatibility_mismatch: boolean }`

*   **Layer C — Analytical Capability**
    *   **Input:** `{ task, batch_id }`
    *   **Logic** (dựa vào `analysisType` từ `task.analytics`):
        *   "trend": kiểm tra có temporal field không?
            → `SELECT COUNT(DISTINCT week_of_class) FROM assessment WHERE batch_id = :batch_id`
            → Nếu count < 2 → `analytical: "warn"` (không đủ temporal points)
        *   "comparison": kiểm tra có đủ entities không?
            → `SELECT COUNT(DISTINCT student_id) FROM enrollment WHERE class_id = :class_id`
            → Nếu count < 2 → `analytical: "warn"`
        *   "correlation": kiểm tra >= 2 numerical vars tồn tại
        *   "distribution": luôn pass nếu Layer A + B pass
    *   **Output:** `{ pass: boolean, warnings: [] }`

*   **Layer D — Data Sufficiency**
    *   **Input:** `{ task, batch_id, class_id? }`
    *   **Logic:**
        *   `SELECT COUNT(*) FROM enrollment WHERE batch_id = :batch_id`
            → Nếu count < 5 → `data_sufficiency: "fail"` (insufficient_data)
        *   `SELECT COUNT(*) FROM assessment_result WHERE batch_id = :batch_id`
            → Nếu count < 2 → `data_sufficiency: "fail"`
        *   Tính confidence score:
            → HIGH: count > 100 rows
            → MEDIUM: count 10–100
            → LOW: count 2–9
    *   **Output:** `{ pass: boolean, confidence: "HIGH"|"MEDIUM"|"LOW", confidence_reason: string }`

**Output Schema:**
```js
{
  task_id: "S-B01",
  executable: true,
  status: "executable", // | "partial" | "unsupported" | "insufficient_data"
  confidence: "HIGH",
  confidence_reason: "...",
  warnings: [],
  missing_requirements: [],
  layer_results: {
    structural: "pass",   // | "fail"
    semantic: "pass",     // | "fail" | "warn"
    analytical: "pass",   // | "warn"
    data_sufficiency: "pass"  // | "fail"
  }
}
```

**API endpoint:**
*   `GET /api/tasks/validate/:datasetId` → chạy validate tất cả tasks
*   `GET /api/tasks/validate-one/:taskId?datasetId=...` → validate single task

### 3.2 Task 2: SQL Execution Engine 🔴
**File:** `src/services/sqlExecution.service.js`

**Logic chi tiết:**
```js
// Vấn đề cốt lõi: taskRegistry.json dùng :paramName placeholders
// nhưng Prisma $queryRaw dùng ${param} interpolation.
// → Phải build a safe param-injection layer.
export async function executeSqlTask({ task, params }) {
  // 1. Lấy sql_query template từ task
  const template = task.sqlQuery;
  
  // 2. Validate params against task.filters (allowlist)
  //    Chỉ cho phép params được khai báo trong task metadata
  
  // 3. Detect CTE pattern vs simple query
  //    Nhiều queries trong registry dùng CTEs (WITH ... AS)
  //    Và nhiều queries có MULTIPLE SQL STATEMENTS (separated by ;)
  //    → Phải split và run sequentially hoặc wrap trong transaction
  
  // 4. Inject params safely
  //    Strategy: replace :paramName → Prisma tagged template literal
  //    Dùng pg driver's parameterized queries ($1, $2, ...) thay vì
  //    string concatenation
  
  // 5. Execute và measure time
  const startTime = Date.now();
  const result = await prisma.$queryRawUnsafe(safeQuery, ...paramValues);
  const executionTime = Date.now() - startTime;
  
  // 6. Return normalized result
  return {
    data: result,
    meta: {
      rowCount: result.length,
      executionTime,
      taskId: task.taskId
    }
  };
}
```

> **WARNING**
> Vấn đề quan trọng cần giải quyết: Nhiều SQL queries trong `taskRegistry.json` dùng CTEs (`WITH ... AS`) mà PHẦN CTE không khai báo sẵn — ví dụ S-B02 có comment: `"risk_flags CTE must compute sum_flags inline"`. Một số queries cũng viết tắt `"-- Reuse CTEs from S-B01"` — nghĩa là execution engine cần CTE Composition Layer hoặc phải normalize lại SQL trong registry để mỗi query self-contained.
>
> **CTE Composition Strategy Options:**
> 1.  **Inline approach (MVP):** Viết lại SQL query trong registry để mỗi task có full CTE stack. Đây là cách an toàn nhất và dễ debug nhất.
> 2.  **CTE Registry (Future):** Lưu named CTEs vào registry riêng và compose runtime.
> 
> **Recommendation:** Dùng **Inline approach** cho MVP Phase 2.

### 3.3 Task 3: Task Registry API Route 🟡
**File:** `src/routes/tasks.routes.js` + `src/controllers/tasks.controller.js`

**Endpoints cần implement:**
*   `GET  /api/tasks`
    → `taskRegistryService.getAllTasks()`
    → Tùy chọn filter: `?scope=student&dataset=OULAD&search=engagement`
    → Response: `[{ taskId, taskName, scope, analytics, datasetCompatibility, ... }]`
    → (KHÔNG trả `sql_query` — security best practice)
*   `GET  /api/tasks/:taskId`
    → `taskRegistryService.getTaskById(taskId)`
    → Response: full task metadata (nhưng vẫn ẩn `sql_query` nếu cần)
*   `GET  /api/tasks/validate/:datasetId`
    → `capabilityValidatorService.validateAll({ batchId, sourceDataset })`
    → Response: `[{ taskId, executable, status, confidence, layer_results }]`

### 3.4 Task 4: Analytics Execution Route 🔴
**File:** `src/routes/analytics.routes.js` + `src/controllers/analytics.controller.js`

**Core endpoint:**
`POST /api/analytics/run`
**Body:**
```json
{
  "taskId": "S-B01",
  "params": {
    "student_id": "12345",
    "enrollment_id": "enrl_xxx",
    "class_id": "class_yyy",
    "batch_id": "batch_zzz"
  }
}
```
**Flow trong controller:**
1. `TaskRegistryService.getTaskById(taskId)` → lấy task
2. If task not found → 404
3. `CapabilityValidator.validateOne(task, params)` → kiểm tra executability
4. If status = "unsupported" → 422 với `layer_results`
5. `SqlExecutionService.executeSqlTask(task, params)` → run query
6. Return `{ data, meta, capability: { status, confidence } }`

### 3.5 Task 5: Student & Cohort Lookup API 🟡
**File:** `src/routes/students.routes.js`

**Phục vụ Frontend để populate StudentPicker, StudentComparePicker:**
*   `GET /api/students?classId=...&batchId=...`
    → `SELECT student_id, gender, age_group, final_outcome FROM student JOIN enrollment ON ... WHERE class_id = :classId AND batch_id = :batchId`
*   `GET /api/students/:studentId/summary?classId=...`
    → Quick stats (avg_score, enrollment info)
*   `GET /api/classes?batchId=...`
    → `SELECT class_id, course_id, class_run, semester FROM class WHERE batch_id = :batchId`

## 4. Thứ tự thực hiện (Execution Order)

**Week 4:**
*   [1] `capabilityValidator.service.js`   (Layer A + B đơn giản trước)
*   [2] `sqlExecution.service.js`          (cơ bản: simple queries trước, CTE sau)
*   [3] `tasks.routes.js` + `tasks.controller.js`
*   [4] `analytics.routes.js` + `analytics.controller.js` (wire vào `server.js`)

**Week 5:**
*   [5] Nâng cấp capabilityValidator (Layer C + D)
*   [6] Fix CTE queries trong `taskRegistry.json` (inline CTE normalization)
*   [7] `students.routes.js` (cho frontend có data để test)
*   [8] End-to-end test: upload OULAD sample → validate → run S-B01, S-T01

**Week 6:**
*   [9] Frontend React: TaskSelector, ChartRenderer (basic)
*   [10] Kết nối frontend với analytics API
*   [11] Import flow + task list UI hoàn chỉnh

## 5. Vấn đề cần giải quyết trước khi code

### 🔴 Issue 1: SQL Query Completeness trong Registry
**Tình trạng hiện tại:** Nhiều tasks trong `taskRegistry.json` có SQL dạng:
`"-- Reuse CTEs from S-B01, S-B02"` → SQL không self-contained
`"-- NOTE: punctuality CTE below..."` → CTE chỉ được comment, không có trong query
**Giải pháp:** Trước khi viết SQL Execution Engine, cần đi qua toàn bộ 52 tasks và đảm bảo mỗi task có 1 SQL statement hoàn chỉnh (full CTEs inlined). Đây là prerequisite quan trọng nhất.
**Priority:** Làm ngay đầu Phase 2.

### 🟡 Issue 2: Multi-Statement Queries
Một số task (S-T07, S-T08, S-T11) có 2 separate SQL queries separated by `;`.
Execution engine cần handle pattern: "run query 1, run query 2, merge results".
**Giải pháp:** Thêm field `sql_queries: []` (array) vào task schema nếu multi-query, thay vì dùng `sql_query: string`.

### 🟡 Issue 3: `keyDbFields` field naming
Field `keyDbFields` trong `taskRegistry.json` dùng format lẫn lộn: `"avg_score [FE]"`, `"at_risk_score [FE cross]"`, `"enrollment_id and avg_score..."`.
Cần normalize format để Capability Validator đọc được programmatically.
**Giải pháp:** Thêm `fe_fields: []` riêng (array sạch, không có annotation) vào task schema.

## 6. Capability Validator — Dataset Context

Validator cần biết dataset context hiện tại để hoạt động đúng:
```js
// Lấy từ AppState (đã có):
const appState = await prisma.appState.findUnique({ where: { id: 1 } });
const { active_dataset_id, active_dataset_source } = appState;
// Dùng để:
// 1. Filter tasks theo datasetCompatibility vs active_dataset_source
// 2. COUNT queries đều WHERE batch_id = active_dataset_id
// 3. Detect OULAD-only vs UCI-only tasks
```

## 7. Tóm tắt Readiness Score

| Hạng mục | Phase 1 Status | Phase 2 Ready? |
|---|---|---|
| Database Schema (8 tables + FE) | ✅ 100% | Có — sẵn sàng query |
| Task Registry JSON (52 tasks) | ✅ 100% | Có — nhưng cần SQL normalization |
| Task Registry Service | ✅ 100% | Có — sẵn sàng dùng |
| Import Pipeline (E2E) | ✅ 100% | Có — data đã vào DB |
| Dataset Management API | ✅ 100% | Có — biết active dataset |
| Capability Validator | ❌ 0% | BUILD NOW |
| SQL Execution Engine | ❌ 0% | BUILD NOW |
| Analytics API | ❌ 0% | BUILD NOW |
| Task API | ❌ 0% | Build week 4 |
| Student/Class Lookup API | ❌ 0% | Build week 5 |

**Verdict:** Phase 1 hoàn chỉnh ✅ — Backend sẵn sàng bắt đầu Phase 2 ngay.
Công việc chính của Phase 2 = 5 files mới + SQL normalization trong registry.
