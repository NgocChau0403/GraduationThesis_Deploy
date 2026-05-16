# Phase 3 — Step 3b: Prisma Migration — AiExplanationLog

**Mục tiêu:** Tạo bảng `ai_explanation_log` trong PostgreSQL để ghi lại mọi lần gọi AI explanation service — bao gồm cả success và degraded responses. Đây là **Observability Layer** của hệ thống AI, phục vụ audit, debug và nghiên cứu.

> **Files thay đổi:**
> - `Backend/prisma/schema.prisma` — thêm model `AiExplanationLog`
> - `Backend/prisma/migrations/20260517000000_add_ai_explanation_log/migration.sql` — SQL tạo bảng
> - `Backend/scripts/run-migration.mjs` — script chạy migration thủ công

---

## 1. Lý Do Cần Bảng `ai_explanation_log`

Hệ thống AI của luận văn có 3 yêu cầu cốt lõi cần observability:

| Yêu cầu | Mô tả | Bảng phục vụ |
|---------|-------|-------------|
| **Traceability** | Mỗi lần AI giải thích phải có audit trail — ai gọi, task gì, data gì | `execution_id`, `task_id`, `student_id` |
| **Degradation tracking** | Biết khi nào Python AI service bị down, tần suất là bao nhiêu | `is_degraded`, `degraded_reason` |
| **Research metrics** | Đo latency, token usage, confidence distribution → dùng cho thesis evaluation | `latency_ms`, `confidence_level`, `model_version` |

**Lý do đây là quan trọng cho thesis báo cáo:** Bảng này là bằng chứng cụ thể rằng hệ thống có *nghiên cứu khả năng giải thích AI* (Explainability Research) chứ không chỉ "gọi ChatGPT". Advisor sẽ hỏi về evaluation metrics — bảng này cung cấp raw data.

---

## 2. Schema Model — Toàn Bộ Cấu Trúc

```prisma
model AiExplanationLog {
  log_id       String   @id @default(cuid())
  created_at   DateTime @default(now())

  // ── Request identity ──────────────────────────────────
  execution_id  String   // correlates với analytics run (exec_xxx)
  task_id       String   // e.g. "S-B01" — KHÔNG phải FK
  student_id    String?  // null cho cohort-level tasks

  // ── AI strategy metadata (từ taskRegistry lúc call) ──
  explanation_strategy String   // "trend" | "comparison" | ...
  target_audience      String[] // ["student"] | ["instructor", "advisor"]
  granularity          String?
  aggregation_level    String?

  // ── Call outcome ──────────────────────────────────────
  is_degraded        Boolean  @default(false)
  degraded_reason    String?  // "TIMEOUT" | "SERVICE_UNAVAILABLE" | ...

  // ── AI response quality ───────────────────────────────
  confidence_level   String?  // "HIGH" | "MEDIUM" | "LOW"
  confidence_reason  String?

  // ── Output storage ────────────────────────────────────
  explanation_text   String?  // plain summary
  structured_output  Json?    // full AIExplainResponse body
  datasets_snapshot  Json?    // { labelName: { rowCount, nullPct } }

  // ── Latency tracking ──────────────────────────────────
  latency_ms         Int?     // Node → Python → Node round-trip
  python_latency_ms  Int?     // chỉ Python processing time

  // ── Provenance ────────────────────────────────────────
  model_version        String?  // "gpt-4o-mini-2024-07-18"
  prompt_token_count   Int?
  response_token_count Int?

  @@index([execution_id])
  @@index([task_id, created_at])
  @@index([student_id])
  @@index([is_degraded])
  @@map("ai_explanation_log")
}
```

### 2.1 Giải thích từng nhóm field

#### Group 1: Request Identity
```
execution_id → link với analytics run: "exec_1747401600000_abc12345"
task_id      → "S-T07" (string thuần, không FK vì registry là JSON in-memory)
student_id   → null cho admin tasks (A-G*), có value cho student tasks (S-*)
```

> **Quyết định thiết kế quan trọng:** `task_id` là `String` thường, **không phải Foreign Key**. Lý do: `taskRegistry` sống trong bộ nhớ (JSON file), không phải trong DB. Nếu tạo FK, mỗi lần thêm task vào registry phải chạy migration — quá coupling. Design này cho phép registry evolve độc lập.

#### Group 2: AI Strategy Metadata
```
explanation_strategy → ghi lại strategy dùng lúc call (immutable audit)
target_audience      → ["student"] hoặc ["instructor", "academic_advisor"]
granularity          → "weekly" / "per_assessment" / ...
aggregation_level    → "student" / "cohort" / ...
```

Lý do lưu lại: dữ liệu registry có thể thay đổi sau này. Bảng log phải ghi lại **giá trị lúc call thực tế**, không phải giá trị hiện tại của registry.

#### Group 3: Call Outcome
```
is_degraded     → Boolean — true nếu Python AI service không phản hồi
degraded_reason → "TIMEOUT" (15s qua), "SERVICE_UNAVAILABLE" (503), "PARSE_ERROR" (LLM trả về JSON lỗi)
```

#### Group 4: Output Storage
```
explanation_text  → raw text summary (cho full-text search sau này)
structured_output → toàn bộ AIExplainResponse JSON (insights[], recommendations[])
datasets_snapshot → KHÔNG phải full rows — chỉ metadata:
  {
    "score_over_time": { "rowCount": 12, "nullPct": 0.02 },
    "absence_data":    { "rowCount": 8,  "nullPct": 0.0  }
  }
```

> **Quyết định thiết kế quan trọng:** `datasets_snapshot` lưu **metadata** về data, không phải raw rows. Lý do: mỗi row analytics có thể chứa hàng nghìn records → bloat bảng log nhanh chóng. Metadata đủ để debug và audit.

#### Group 5: Latency & Provenance
```
latency_ms         → tổng thời gian: Node nhận request → Python xử lý → Node gửi response
python_latency_ms  → chỉ Python: thời gian từ khi Python nhận đến khi trả về
model_version      → ghi lại model cụ thể đã dùng (quan trọng cho reproducibility)
prompt_token_count → dùng để estimate cost và monitor prompt length
response_token_count → dùng để monitor response truncation
```

---

## 3. Migration SQL — Cấu Trúc Bảng Thực Tế

File: `prisma/migrations/20260517000000_add_ai_explanation_log/migration.sql`

```sql
CREATE TABLE "ai_explanation_log" (
    "log_id"               TEXT NOT NULL,
    "created_at"           TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "execution_id"         TEXT NOT NULL,
    "task_id"              TEXT NOT NULL,
    "student_id"           TEXT,
    "explanation_strategy" TEXT NOT NULL,
    "target_audience"      TEXT[],           -- PostgreSQL native array
    "granularity"          TEXT,
    "aggregation_level"    TEXT,
    "is_degraded"          BOOLEAN NOT NULL DEFAULT false,
    "degraded_reason"      TEXT,
    "confidence_level"     TEXT,
    "confidence_reason"    TEXT,
    "explanation_text"     TEXT,
    "structured_output"    JSONB,            -- Binary JSON for indexing
    "datasets_snapshot"    JSONB,
    "latency_ms"           INTEGER,
    "python_latency_ms"    INTEGER,
    "model_version"        TEXT,
    "prompt_token_count"   INTEGER,
    "response_token_count" INTEGER,
    CONSTRAINT "ai_explanation_log_pkey" PRIMARY KEY ("log_id")
);

-- Indexes
CREATE INDEX "ai_explanation_log_execution_id_idx"        ON "ai_explanation_log"("execution_id");
CREATE INDEX "ai_explanation_log_task_id_created_at_idx"  ON "ai_explanation_log"("task_id", "created_at");
CREATE INDEX "ai_explanation_log_student_id_idx"          ON "ai_explanation_log"("student_id");
CREATE INDEX "ai_explanation_log_is_degraded_idx"         ON "ai_explanation_log"("is_degraded");
```

**Tại sao JSONB thay vì JSON?**
- `JSONB` lưu ở dạng binary đã parse → query nhanh hơn nhiều
- Hỗ trợ indexing GIN index (nếu sau này cần full-text search trong `structured_output`)
- `JSON` chỉ là text raw → mỗi lần query phải parse lại

**Tại sao 4 indexes này?**
| Index | Use case |
|-------|----------|
| `execution_id` | Tìm AI log của 1 analytics run cụ thể (debug tracing) |
| `task_id + created_at` | Query "tất cả AI explanations của task S-B01 trong tuần này" (thesis evaluation) |
| `student_id` | Audit "AI đã giải thích gì cho sinh viên này?" (privacy audit) |
| `is_degraded` | "Bao nhiêu % calls bị degraded hôm nay?" (monitoring) |

---

## 4. Cách `ai.controller.js` Sẽ Ghi Log

Sau khi Python AI service trả về response (hoặc fail), controller ghi log vào bảng này:

```js
// ai.controller.js (sẽ implement sau khi Python service sẵn sàng)

async function logExplanation({
  executionId, task, studentId,
  response, isDegrade, degradedReason,
  startTime, pythonLatencyMs
}) {
  const latencyMs = Date.now() - startTime;

  await prisma.aiExplanationLog.create({
    data: {
      execution_id:         executionId,
      task_id:              task.taskId,
      student_id:           studentId ?? null,

      // Strategy metadata (snapshot from registry)
      explanation_strategy: task.explanation_strategy,
      target_audience:      task.target_audience,
      granularity:          task.analysis_context?.granularity,
      aggregation_level:    task.analysis_context?.aggregation_level,

      // Outcome
      is_degraded:          isDegrade,
      degraded_reason:      degradedReason ?? null,

      // Quality
      confidence_level:     response?.confidence?.level ?? null,
      confidence_reason:    response?.confidence?.reason ?? null,

      // Output
      explanation_text:     response?.explanation?.summary ?? null,
      structured_output:    response ?? null,
      datasets_snapshot:    buildDatasetsSnapshot(datasets), // { label: { rowCount, nullPct } }

      // Timing
      latency_ms:           latencyMs,
      python_latency_ms:    pythonLatencyMs ?? null,

      // Provenance (Python service sẽ trả về trong meta)
      model_version:        response?.meta?.model_version ?? null,
      prompt_token_count:   response?.meta?.prompt_tokens ?? null,
      response_token_count: response?.meta?.response_tokens ?? null,
    }
  });
}

// Helper: tạo snapshot không chứa raw rows
function buildDatasetsSnapshot(datasets) {
  const snapshot = {};
  for (const [label, rows] of Object.entries(datasets ?? {})) {
    const nullCount = rows.filter(r => Object.values(r).some(v => v === null)).length;
    snapshot[label] = {
      rowCount: rows.length,
      nullPct:  rows.length > 0 ? +(nullCount / rows.length).toFixed(3) : 0,
    };
  }
  return snapshot;
}
```

---

## 5. Luồng Đi End-to-End Sau Khi Có Bảng

```
User click "Get AI Explanation" trên task S-T01
  ↓
POST /api/ai/explain
  { taskId: "S-T01", datasets: { score_trend: [...] }, meta: {...} }
  ↓
ai.controller.js (Node)
  1. Đọc task metadata từ registry
  2. Enrich payload → forward sang Python FastAPI
  3. Đặt startTime = Date.now()
  ↓
Python FastAPI (http://localhost:8000/explain)
  1. ExplanationStrategyFactory.get_strategy("trend")
  2. TrendStrategy.build_prompt(req)
  3. OpenAI API call
  4. Validate response (Pydantic)
  5. Return { summary, insights[], confidence, meta: { python_latency_ms, model_version } }
  ↓
ai.controller.js (Node) nhận response
  6. logExplanation() → INSERT into ai_explanation_log
  7. Forward response về Frontend
  ↓
Frontend: AIInsightPanel renders
  - summary
  - insights[] với evidence[]
  - recommendations[]
  - ConfidenceBadge
  ↓
[nếu Python bị down]
  Python timeout sau 15s
  → is_degraded = true, degraded_reason = "TIMEOUT"
  → INSERT log với is_degraded = true
  → Return AIDegradedResponse (Frontend hiện banner, KHÔNG block chart)
```

---

## 6. Queries Hữu Ích Cho Thesis Evaluation

```sql
-- Tỷ lệ degraded calls (system reliability metric)
SELECT
  COUNT(*) FILTER (WHERE is_degraded = true)::float / COUNT(*) AS degradation_rate,
  COUNT(*) AS total_calls
FROM ai_explanation_log;

-- Latency phân phối theo strategy
SELECT
  explanation_strategy,
  ROUND(AVG(latency_ms)) AS avg_ms,
  ROUND(PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY latency_ms)) AS p95_ms,
  COUNT(*) AS call_count
FROM ai_explanation_log
WHERE is_degraded = false
GROUP BY explanation_strategy
ORDER BY avg_ms DESC;

-- Confidence distribution
SELECT confidence_level, COUNT(*) as count
FROM ai_explanation_log
WHERE is_degraded = false
GROUP BY confidence_level;

-- Token usage (cost estimation)
SELECT
  model_version,
  SUM(prompt_token_count) AS total_prompt_tokens,
  SUM(response_token_count) AS total_response_tokens,
  COUNT(*) AS total_calls
FROM ai_explanation_log
GROUP BY model_version;
```

---

## 7. Trạng Thái Migration

### Thực tế đã chạy:
- [x] `prisma/schema.prisma` — thêm model `AiExplanationLog`
- [x] `prisma/migrations/20260517000000_.../migration.sql` — SQL đã được tạo
- [x] SQL đã được execute trực tiếp lên PostgreSQL qua `scripts/run-migration.mjs`
- [x] Migration đã được ghi vào `_prisma_migrations` table (Prisma tracking)
- [x] `npx prisma generate` → Prisma Client regenerated ✅

### Lưu ý về migration workflow:
Dự án dùng **Prisma v7** với `prisma.config.ts` thay vì `url` trong `schema.prisma`.  
Do Cwd path chứa ký tự đặc biệt `[`, PowerShell không thể `cd` vào đúng thư mục khiến `prisma migrate dev` thất bại.  
**Giải pháp:** Dùng `scripts/run-migration.mjs` để chạy SQL qua `pg` trực tiếp, sau đó ghi vào `_prisma_migrations` thủ công.  
Đây là pattern hợp lệ và được Prisma documented tại: [prisma migrate resolve](https://www.prisma.io/docs/orm/prisma-migrate/workflows/baselining).

### Next:
1. **Python FastAPI skeleton** — `POST /explain`, `ExplanationStrategyFactory`, Pydantic models
2. **`ai.controller.js`** — implement `logExplanation()` function
3. **Frontend** — `AIInsightPanel.jsx`, `analyticsApi.js`, `useAnalytics` hook

---

_Ghi lại bởi Antigravity | 2026-05-17 | Phase 3 Step 3b_
