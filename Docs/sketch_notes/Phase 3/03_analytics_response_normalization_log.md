# Phase 3 — Step 3a: Analytics Response Normalization Log

**Mục tiêu:** Xóa bỏ hoàn toàn legacy response shape `data: array` và thay bằng `datasets: object` keyed by `query_labels[]` — đảm bảo Frontend và Python AI Service không bao giờ phải tự parse/đoán cấu trúc dữ liệu.

> **File bị thay đổi:** `Backend/src/controllers/analytics.controller.js`  
> **Tính năng liên quan:** CONTRACT 2 trong `phase3_contracts.md`

---

## 1. Vấn đề với Response Shape cũ

Trước khi thay đổi, `POST /api/analytics/run` trả về dạng này:

```json
{
  "success": true,
  "taskId": "S-T07",
  "data": [
    { "index": 0, "data": [...absence rows...], "rowCount": 12 },
    { "index": 1, "data": [...score rows...],   "rowCount": 8  }
  ]
}
```

**3 vấn đề lớn của format này:**

| # | Vấn đề | Hậu quả |
|---|--------|---------|
| 1 | **Không có tên** — Frontend không biết `index 0` là gì | Phải hard-code: `data[0]` là absence, `data[1]` là score → "index spaghetti" |
| 2 | **Single-query và multi-query trả về cùng type** — thực ra không, single trả `data: rows[]`, multi trả `data: [{index, data}][]` | ChartRenderer cần `if/else` để phân biệt → fragile |
| 3 | **AI service không biết** dataset nào là gì khi nhận payload | Python cần đọc `index 0` và `index 1` → không semantic |

---

## 2. Giải pháp: `normalizeAnalyticsResult(task, result)`

Một hàm helper thuần túy được thêm vào controller, nhận vào `task` (từ Registry) và `result` (từ `SqlExecutionService`), trả về một object `datasets` hoàn toàn có tên theo `query_labels[]`.

### 2.1 Code đầy đủ

```js
/**
 * Normalizes the raw SQL execution result into a named `datasets` dictionary
 * keyed by `task.query_labels[]`.
 *
 * Single-query:  { datasets: { "score_over_time": [...rows] } }
 * Multi-query:   { datasets: { "absence_data": [...], "score_series": [...] } }
 *
 * Fallback:
 *   - Không có query_labels entry → "query_0", "query_1", ...
 *   - Không có query_labels gì cả → "data" (single) hoặc "query_N" (multi)
 */
function normalizeAnalyticsResult(task, result) {
  // ── Single-query path ──────────────────────────────────────
  if (!result.meta?.isMultiQuery) {
    const label = task.query_labels?.[0] ?? "data";
    return { [label]: result.data };
  }

  // ── Multi-query path ───────────────────────────────────────
  // result.data = [{ index: 0, data: [...], rowCount: N }, ...]
  const datasets = {};
  for (const rs of result.data) {
    const label = task.query_labels?.[rs.index] ?? `query_${rs.index}`;
    datasets[label] = rs.data;
  }
  return datasets;
}
```

### 2.2 Logic flow chi tiết

```
SqlExecutionService.executeSqlTask(task, params)
  ↓
result = {
  data: [...rows],           ← Single-query
  meta: { isMultiQuery: false, rowCount: N, ... }
}
  hoặc
result = {
  data: [
    { index: 0, data: [...], rowCount: N },
    { index: 1, data: [...], rowCount: M }
  ],
  meta: { isMultiQuery: true, ... }
}

  ↓ normalizeAnalyticsResult(task, result)

task.query_labels = ["absence_data", "score_series"]

  ↓

datasets = {
  "absence_data": [...],   ← index 0 → label[0]
  "score_series": [...]    ← index 1 → label[1]
}
```

---

## 3. Thay đổi tại Step 6 trong Controller

### Trước:
```js
return res.status(200).json({
  success: true,
  executionId,
  taskId,
  data: result.data,         // ← raw, không tên, mixed type
  meta: {
    ...result.meta,
    dataQuality: { ... }
  }
});
```

### Sau:
```js
const datasets = normalizeAnalyticsResult(task, result);

return res.status(200).json({
  success: true,
  executionId,
  taskId,
  datasets,                            // ← named dict
  meta: {
    ...result.meta,
    query_labels: task.query_labels ?? [],   // ← echo để FE không cần gọi lại task API
    dataQuality: { ... }
  }
});
```

**Lý do thêm `meta.query_labels`:** Frontend biết ngay label nào đang dùng trong response mà không cần gọi thêm `GET /api/tasks/:taskId`. Giảm 1 HTTP round-trip khi render chart.

---

## 4. Response Shape Mới — Ví dụ Thực Tế

### Single-query task (S-B01 — Score distribution)
```json
{
  "success": true,
  "executionId": "exec_1747401600000_abc12345",
  "taskId": "S-B01",
  "datasets": {
    "performance_summary": [
      { "score_band": "A", "count": 34 },
      { "score_band": "B", "count": 58 },
      { "score_band": "C", "count": 21 }
    ]
  },
  "meta": {
    "isMultiQuery": false,
    "rowCount": 3,
    "executionMs": 45,
    "query_labels": ["performance_summary"],
    "dataQuality": {
      "status": "executable",
      "confidence": "HIGH",
      "confidence_reason": "All required tables present with sufficient data",
      "warnings": []
    }
  }
}
```

### Multi-query task (S-T07 — Absence + Score correlation)
```json
{
  "success": true,
  "executionId": "exec_1747401700000_def67890",
  "taskId": "S-T07",
  "datasets": {
    "absence_data": [
      { "week_due": 1, "absence_days": 0 },
      { "week_due": 2, "absence_days": 2 }
    ],
    "score_series": [
      { "assessment_name": "Quiz 1", "score": 78 },
      { "assessment_name": "Quiz 2", "score": 65 }
    ]
  },
  "meta": {
    "isMultiQuery": true,
    "rowCounts": [2, 2],
    "executionMs": 89,
    "query_labels": ["absence_data", "score_series"],
    "dataQuality": {
      "status": "partial",
      "confidence": "MEDIUM",
      "confidence_reason": "Enrollment data incomplete for this student",
      "warnings": [{ "code": "SPARSE_DATA", "message": "..." }]
    }
  }
}
```

---

## 5. Tại Sao Làm Trước Python AI Service?

| Bước | Phụ thuộc vào |
|------|--------------|
| **`normalizeAnalyticsResult`** (đã xong) | Không phụ thuộc gì — pure function |
| **Python AI Service** | Cần nhận `datasets` dict để build prompt → phải làm sau normalize |
| **Frontend `ChartRenderer`** | Cần `datasets[query_labels[0]]` để render → phải làm sau normalize |
| **Prisma Migration** | Độc lập, có thể làm song song |

Nếu làm Python AI trước, service sẽ viết input handler cho `data: [{index, data}]` format → sẽ phải refactor lại khi normalize xong. **Làm normalize trước loại bỏ rework hoàn toàn.**

---

## 6. Trạng thái Hiện Tại

### Đã xong trong session này:
- [x] `normalizeAnalyticsResult(task, result)` — thêm vào `analytics.controller.js` (dòng 52–84)
- [x] Step 6 cập nhật: trả về `datasets` thay vì `data`
- [x] `meta.query_labels` được echo trong response
- [x] Syntax check: `node --check` → exit code 0 ✅

### Scripts trong `Backend/scripts/`:
```
scripts/
├── injectVizConfig.js          ← STEP 2a: inject visualization_config
├── injectAiMetadata.js         ← STEP 2b: inject AI fields
├── validateRegistry.js         ← v2: Level 1+2+3 validation
├── registryStats.js            ← 10-section stats report
└── patch-arch5.mjs             ← one-time fix (có thể xóa)
```

### Next tasks:
1. **Prisma Migration** — Thêm model `AiExplanationLog` vào `prisma/schema.prisma`, chạy `npx prisma migrate dev`
2. **Python FastAPI skeleton** — `POST /explain`, `ExplanationStrategyFactory`, Pydantic models
3. **Frontend** — `analyticsApi.js`, `useAnalytics` hook, `ChartRenderer.jsx` (bind `datasets[query_labels[0]]`)

---

_Ghi lại bởi Antigravity | 2026-05-16 | Phase 3 Step 3a_
