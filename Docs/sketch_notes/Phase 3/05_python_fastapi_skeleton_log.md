# Phase 3 — Step 3c: Python FastAPI AI Service Skeleton

**Mục tiêu:** Dựng khung hoàn chỉnh cho Python FastAPI AI Explanation Service — bao gồm Pydantic schemas, ExplanationStrategyFactory, TrendStrategy (full), 6 strategy stubs, safety filter, và health endpoint. Service này sẵn sàng nhận request từ Node proxy và trả về cấu trúc JSON đã validate.

> **Thư mục:** `AIService/` (ngang hàng với `Backend/` và `Frontend/`)  
> **Chạy:** `uvicorn main:app --reload --port 8000`  
> **Node proxy trỏ đến:** `http://localhost:8000/explain`

---

## 1. Cấu Trúc Thư Mục

```
AIService/
├── main.py                    ← FastAPI app, POST /explain, /health
├── schemas.py                 ← Pydantic models (CONTRACT 4)
├── safety.py                  ← Safety filter (5 categories)
├── requirements.txt           ← fastapi, uvicorn, openai, pydantic
├── .env.example               ← OPENAI_API_KEY, model, max_tokens, temperature
└── strategies/
    ├── __init__.py
    ├── base.py                ← Abstract base class + shared utilities
    ├── factory.py             ← ExplanationStrategyFactory (registry)
    ├── trend_strategy.py      ← TrendStrategy (fully implemented)
    └── other_strategies.py   ← 6 strategy stubs (functional, not optimized)
```

---

## 2. Luồng Đi End-to-End

```
Frontend click "Get AI Explanation"
  ↓
POST /api/ai/explain (Node.js)
  ↓
ai.controller.js (Node)
  1. Đọc task từ registry: explanation_strategy, target_audience,
     visualization_config, analysis_context
  2. Enriches payload:
     {
       task_id, execution_id, task_name,
       explanation_strategy: "trend",
       target_audience: ["student"],
       visualization_config: { semantic_roles: { x: "time", y: "performance_metric" } },
       analysis_context: { granularity: "weekly", aggregation_level: "student" },
       datasets: { score_over_time: [...rows...] },
       confidence: { level: "HIGH", reason: "..." },
       student_context: { student_id: "...", gender: "M" }
     }
  3. POST http://localhost:8000/explain
  ↓
FastAPI main.py receives request
  4. Pydantic validates ExplainRequest automatically (400 if invalid)
  5. ExplanationStrategyFactory.get_strategy("trend") → TrendStrategy instance
  6. strategy.build_system_prompt(req) → calibrated system prompt
  7. strategy.build_user_prompt(req) → data-aware user prompt
  8. strategy.call_llm(system, user, req):
       - OpenAI API call (JSON mode, temperature=0.3, max_tokens=800)
       - Returns parsed dict + token_usage
  9. SafetyFilter.apply(raw_response.explanation)
       - Scans for PII, diagnostic labels, causal overclaims, grade predictions, attacks
       - Returns list of triggered flags (does NOT block)
  10. strategy.build_response(req, raw, safety_flags, latency_ms)
       - ExplanationBody.model_validate(raw) ← Pydantic validation
       - _derive_confidence_sources() ← Python logic, NOT LLM
       - Assembles ExplainResponse
  ↓
[if ANY exception in steps 5–10]
  11. main.py catches → _build_degraded_response()
      { degraded: true, explanation: { summary: "AI unavailable", ... } }
  ↓
Node receives ExplainResponse
  12. logExplanation() → INSERT ai_explanation_log (Phase 3b)
  13. Forward response to Frontend
  ↓
Frontend: AIInsightPanel checks response.degraded
  - degraded=false → render summary, insights[], recommendations[]
  - degraded=true  → render <AIDegradedBanner /> (chart NOT blocked)
```

---

## 3. Pydantic Schemas (schemas.py) — CONTRACT 4

### Request: ExplainRequest
```python
class ExplainRequest(BaseModel):
    task_id:              str
    execution_id:         str
    explanation_strategy: str               # "trend"|"comparison"|...
    target_audience:      list[str]         # ["student"|"instructor"|...]
    visualization_config: VisualizationConfig | None
    analysis_context:     AnalysisContext | None
    datasets:             dict[str, list[dict]]  # named datasets dict
    confidence:           ConfidenceInput | None
    student_context:      dict | None
    query_labels:         list[str]
```

### Response: ExplainResponse
```python
class ExplainResponse(BaseModel):
    task_id:              str
    execution_id:         str
    explanation:          ExplanationBody    # summary + insights[] + recommendations[]
    confidence:           ConfidenceInfo     # level + reason + based_on[]
    explanation_strategy: str
    safety_flags:         list[str]
    degraded:             bool = False
    meta:                 AIMeta             # model, latency_ms, token_usage, cost_usd
```

### Key design decision: EvidenceItem không phải free text
```python
class EvidenceItem(BaseModel):
    metric:     str           # "avg_score" (exact field name từ dataset)
    value:      float|int|str # giá trị cụ thể
    comparison: Literal["baseline","up_from_previous","down_from_previous","peak","trough","stable"]
    delta:      float | None  # signed delta từ điểm trước
    context:    str | None    # "week_due=7"
```
LLM được hướng dẫn trả về `evidence[]` theo cấu trúc này. Pydantic validate sau khi nhận được. Nếu LLM hallucinate format sai → ValidationError → DEGRADED.

---

## 4. ExplanationStrategyFactory

```python
_REGISTRY = {
    "trend":        TrendStrategy(),        # ✅ Fully implemented
    "comparison":   ComparisonStrategy(),   # 🔄 Stub — Week 8
    "distribution": DistributionStrategy(), # 🔄 Stub — Week 8
    "correlation":  CorrelationStrategy(),  # 🔄 Stub — Week 8
    "risk":         RiskStrategy(),         # 🔄 Stub — Week 8
    "behavioral":   BehavioralStrategy(),   # 🔄 Stub — Week 8
    "ranking":      RankingStrategy(),      # 🔄 Stub — Week 8
}
```

**Singleton pattern:** Mỗi strategy được instantiate **một lần** khi module load. Không tạo instance mới mỗi request → tiết kiệm memory.

**Unknown strategy:** `get_strategy("unknown")` → `ValueError` → main.py catch → DEGRADED response. Service **không bao giờ crash** với 500 error.

---

## 5. TrendStrategy — Prompt Architecture

### System Prompt
Được calibrate theo 3 chiều:

```
1. AUDIENCE TONE (từ target_audience[]):
   "student"          → "Use encouraging, supportive tone. Write in second person."
   "instructor"       → "Use professional, pedagogical tone. Write in third person."
   "academic_advisor" → "Use analytical, evidence-based tone. Be neutral and precise."
   "admin"            → "Use concise, system-level tone."

2. TEMPORAL LANGUAGE (từ analysis_context.granularity):
   "weekly"           → "Use 'sudden decline', 'week-over-week', 'sharp drop in week X'"
   "per_assessment"   → "Reference 'in Assessment 3', 'across 5 attempts'"
   "semester"         → "Use 'long-term trend', 'sustained improvement'"
   "cohort_aggregate" → "Use 'class-wide pattern', 'cohort-level trajectory'"

3. AXIS CONTEXT (từ visualization_config.semantic_roles):
   x="time", y="performance_metric"
   → "X-axis: time | Y-axis: performance metric"
   → LLM biết X là tuần/kỳ, Y là điểm
```

### User Prompt
Gửi kèm:
- Task name + context (granularity, aggregation_level)
- Data quality signal (confidence.level + reason)
- Dataset đã format readable (truncate tối đa 20 rows)
- Câu hỏi phân tích cụ thể

### JSON Mode
```python
response_format = {"type": "json_object"}
temperature = 0.3  # thấp để giảm hallucination
max_tokens = 800
```
`json_object` mode buộc OpenAI trả về JSON hợp lệ 100% — loại bỏ text thừa ngoài JSON.

---

## 6. Safety Filter (safety.py) — 5 Categories

| Category | Patterns phát hiện | Severity |
|---|---|---|
| `PII_LEAKAGE` | Student IDs, email addresses, phone numbers | warn |
| `DIAGNOSTIC_LABELING` | dyslexia, ADHD, depression, learning disability | warn |
| `CAUSAL_OVERCLAIM` | "causes performance", "directly leads to", "proves that" | warn |
| `GRADE_PREDICTION` | "will fail", "predicted grade", "final score will be" | warn |
| `PERSONAL_ATTACK` | lazy, stupid, incapable, unfit | warn |

**Design:** Tất cả đều là `warn` — flag vào `safety_flags[]` nhưng không block response. Researcher (bạn) review log. Đây là pragmatic cho thesis; production system cần stricter handling.

`SafetyFilter.apply(explanation_dict)` trả về `list[str]` với tên categories bị trigger.

---

## 7. Base Strategy — Shared Utilities

### `summarize_datasets(req, max_rows=20)`
Chuyển `datasets: dict` thành string cho user prompt:
```
Dataset: score_over_time (12 rows)
[{"week_due": 2, "avg_score": 74.5}, ...]
[... 2 more rows truncated]
```
Truncate 20 rows để tránh token overflow với large datasets.

### `_derive_confidence_sources(level, req) → list[str]`
**Python logic — KHÔNG phải LLM** quyết định `confidence.based_on[]`:
```python
if level == "HIGH":
    return ["sufficient_data"]

# Check temporal range
if granularity == "weekly" and distinct_weeks < 4:
    sources.append("limited_temporal_range")

# Check single student
if aggregation_level == "student" and len(primary_rows) < 3:
    sources.append("single_student")
```
Lý do: Nếu để LLM quyết định `based_on[]`, LLM sẽ hallucinate reasons không có trong data.

### `_estimate_cost(token_usage, model) → float | None`
```python
rates = {
    "gpt-4o-mini": (0.000150, 0.000600),  # input, output per 1K tokens
    "gpt-4o":      (0.005000, 0.015000),
}
cost = (prompt_tokens/1000 × input_rate) + (completion_tokens/1000 × output_rate)
```

---

## 8. Graceful Degradation — Contract Với Node

**Guarantee:** `POST /explain` **NEVER returns 500**. Mọi exception đều được catch:
```python
except Exception as exc:
    return _build_degraded_response(req, latency_ms, str(exc))
```

DEGRADED response shape:
```json
{
  "task_id": "S-B01",
  "execution_id": "exec_...",
  "degraded": true,
  "explanation": {
    "summary": "AI explanation is temporarily unavailable.",
    "insights": [], "educational_implications": [],
    "recommendations": [],
    "warnings": ["LLM service error: <reason>"]
  },
  "confidence": { "level": null, "reason": null, "based_on": [] },
  "meta": { "model": null, "latency_ms": <actual_ms>, ... }
}
```

Node proxy check `response.degraded` và quyết định log loại nào, gửi gì về Frontend.

---

## 9. Cài Đặt & Chạy

```bash
# Tạo .env từ template
cp .env.example .env
# Điền OPENAI_API_KEY=sk-...

# Cài dependencies (nên dùng venv)
pip install -r requirements.txt

# Chạy service
uvicorn main:app --reload --port 8000

# Test health
curl http://localhost:8000/health
# → { "status": "ok", "strategies_available": ["trend", "comparison", ...] }
```

---

## 10. Trạng Thái & Next Steps

### Đã xong:
- [x] `AIService/main.py` — FastAPI app, POST /explain, /health, degraded builder
- [x] `AIService/schemas.py` — Tất cả Pydantic models (CONTRACT 4)
- [x] `AIService/strategies/base.py` — Abstract base + shared utilities
- [x] `AIService/strategies/factory.py` — ExplanationStrategyFactory (7 strategies)
- [x] `AIService/strategies/trend_strategy.py` — TrendStrategy (fully implemented)
- [x] `AIService/strategies/other_strategies.py` — 6 strategy stubs (functional)
- [x] `AIService/safety.py` — SafetyFilter (5 categories)
- [x] `AIService/requirements.txt` + `.env.example`

### Cần làm tiếp (Week 8):
- [ ] Thêm `OPENAI_API_KEY` vào `.env` và test end-to-end
- [ ] Refine 6 remaining strategy prompts (ComparisonStrategy cần đặc biệt chú ý)
- [ ] `ai.controller.js` (Node): implement `logExplanation()` function dùng Prisma
- [ ] **Frontend:** `analyticsApi.js`, `useAnalytics` hook, `ChartRenderer.jsx`
- [ ] **Frontend:** `AIInsightPanel.jsx` — render `explanation.insights[]` + ConfidenceBadge

---

_Ghi lại bởi Antigravity | 2026-05-17 | Phase 3 Step 3c_
