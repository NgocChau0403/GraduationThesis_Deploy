# Phase 3 — Step 2b: AI Metadata Injection Log

**File này ghi lại những gì đã làm trong lần inject thứ 2 của STEP 2 — thêm 4 AI metadata fields vào 53 tasks trong `taskRegistry.json`.**

> Step 2a (visualization_config) đã được ghi lại tại `step2_vizconfig_injection_log.md`  
> Step 2b này hoàn thiện STEP 2 và unblock STEP 3.

---

## Những gì đã làm

### Files tạo/sửa

| File | Action | Mục đích |
|------|--------|----------|
| `Backend/src/config/taskRegistry.json` | **MODIFIED** | Thêm 4 AI fields + normalize semantic_roles vào 53 tasks |
| `Backend/scripts/injectAiMetadata.js` | **NEW** | Script inject + normalize semantic_roles |
| `Backend/scripts/validateRegistry.js` | **UPDATED** | Mở rộng validation để kiểm tra tất cả 5 nhóm field của STEP 2 |

### Kết quả chạy

```
node scripts/injectAiMetadata.js
  ✅ Done: 53 tasks injected
  🔧 Normalized semantic_roles: 38 tasks  (toàn bộ → đúng CONTRACT 1.1 enum)
  ⚠️  Skipped: 0 tasks

node scripts/validateRegistry.js
  ─────────────────────────────────────────
  Total tasks:    53
  Errors:         0
  Warnings:       0
  ✅ All tasks pass validation — STEP 2 (all 5 fields) complete.
  → STEP 3 (Prisma migration + backend skeleton) is unblocked.
```

---

## 4 Fields mới được thêm vào (CONTRACT 1.2–1.5)

### 1. `explanation_strategy` — CONTRACT 1.2

Xác định **Strategy class nào trong Python AI Service** sẽ được dùng để build prompt.

```json
"explanation_strategy": "trend"
```

| Value | Strategy Class | Dùng cho |
|---|---|---|
| `trend` | `TrendStrategy` | Line chart, time series, progression |
| `comparison` | `ComparisonStrategy` | 2 sinh viên, nhóm so sánh |
| `distribution` | `DistributionStrategy` | Histogram, pie, phân phối |
| `correlation` | `CorrelationStrategy` | Scatter plot, tương quan giữa 2 metrics |
| `risk` | `RiskStrategy` | At-risk flags, risk scoring |
| `behavioral` | `BehavioralStrategy` | Engagement, submission delay, activity |
| `ranking` | `RankingStrategy` | Bảng ranked, priority list |

**Chú ý:** `prompt_template` **không** được lưu trong registry. Nó được **derive tại runtime** từ `explanation_strategy` bởi Python Strategy class. Đây là thiết kế có chủ ý — tránh duplication và cho phép prompt evolve mà không cần sửa registry.

---

### 2. `target_audience` — CONTRACT 1.3

Array xác định **đối tượng mục tiêu** → AI điều chỉnh giọng văn.

```json
"target_audience": ["student"]
// hoặc
"target_audience": ["instructor", "academic_advisor"]
```

| Value | Giọng văn AI | Ví dụ |
|---|---|---|
| `student` | Khuyến khích, ngôi thứ nhất, tránh thuật ngữ | "You've shown improvement..." |
| `instructor` | Professional, pedagogical, actionable | "This student's trend suggests..." |
| `academic_advisor` | Analytical, evidence-based, neutral | "Data indicates a correlation between..." |
| `admin` | Aggregated, system-level, comparative | "Class-wide engagement has declined..." |

**Lưu ý quan trọng:** `target_audience` trong registry **khác** với `roles` trong access control. `roles` vẫn được giữ nguyên cho phân quyền API. `target_audience` chỉ được AI service đọc để chọn giọng văn.

---

### 3. `query_labels` — CONTRACT 1.4

Array tên cho các dataset trong response. Thay thế raw `{index, data}` shape.

```json
// Single-query task
"query_labels": ["score_trend"]

// Multi-query task (S-T07: absence data + score series)
"query_labels": ["absence_data", "score_series"]
```

**Cách hoạt động trong `normalizeAnalyticsResult()`:**

```js
// analytics.controller.js
function normalizeAnalyticsResult(task, result) {
  if (!result.meta.isMultiQuery) {
    // Single-query: lấy label[0]
    const label = task.query_labels?.[0] ?? "data";
    return { [label]: result.data };
    // → { "score_trend": [...rows] }
  }
  // Multi-query: map index → label
  const datasets = {};
  for (const rs of result.data) {
    const label = task.query_labels?.[rs.index] ?? `query_${rs.index}`;
    datasets[label] = rs.data;
  }
  return datasets;
  // → { "absence_data": [...], "score_series": [...] }
}
```

**Ở frontend (ChartRenderer.jsx):**
```js
const primaryLabel = taskMeta.query_labels?.[0] ?? "data";
const rawData = datasets[primaryLabel] ?? [];
```

Frontend KHÔNG bao giờ thấy `[{index: 0, data: [...]}, {index: 1, data: [...]}]`.

---

### 4. `analysis_context` — CONTRACT 1.5

Object khai báo ngữ cảnh phân tích → AI dùng để chọn ngôn ngữ mô tả phù hợp.

```json
"analysis_context": {
  "granularity": "weekly",
  "aggregation_level": "student"
}
```

**`granularity` enum:**

| Value | AI Language Guidance |
|---|---|
| `weekly` | "sudden decline", "week-over-week", "week X saw..." |
| `per_assessment` | "in Assessment 3", "across 5 attempts" |
| `semester` | "long-term trend", "overall semester performance" |
| `cohort_aggregate` | "class-wide", "cohort pattern", "across all students" |

**`aggregation_level` enum:**

| Value | Context |
|---|---|
| `student` | Single student focus |
| `cohort` | Whole class analysis |
| `comparison` | 2-student side-by-side |
| `instructor` | Admin viewing one student |

**Derive rule quan trọng (từ CONTRACT 1.5):**
```
semantic_roles.x = "time" AND granularity = "weekly"
  → strategy dùng ngôn ngữ "sudden" / "week-over-week"

semantic_roles.x = "time" AND granularity = "semester"
  → strategy dùng ngôn ngữ "long-term" / "sustained"
```

---

## Normalization semantic_roles (bonus)

Script này đồng thời **normalize toàn bộ `semantic_roles` từ STEP 2a** sang đúng vocabulary CONTRACT 1.1.

STEP 2a đã dùng các giá trị tự đặt (như `risk_level`, `student_id`, `count`, `time_delta`...) — không có trong CONTRACT. Script này map chúng về enum chuẩn.

**Mapping X-role (axis trục X):**

| Từ (STEP 2a) | Sang (CONTRACT) | Lý do |
|---|---|---|
| `student_id` | `student` | ID là dimension sinh viên |
| `demographic_group` | `category` | Nhóm nhân khẩu = categorical axis |
| `demographic_metric` | `category` | Metric nhân khẩu trên trục X = categorical |
| `lifestyle_metric` | `category` | Risk score lifestyle = categorical bin |
| `risk_metric` | `category` | At-risk label trên X = categorical |
| `risk_level` | `category` | at_risk_label là categorical axis |
| `performance_metric` | `category` | Score range (histogram) = categorical bin |
| `engagement_metric` | `category` | Khi dùng làm trục X (nhóm) |
| `time_delta` | `assessment` | Delay per-assessment context |

**Mapping Y-role (axis trục Y):**

| Từ (STEP 2a) | Sang (CONTRACT) | Lý do |
|---|---|---|
| `count` | `count_metric` | Thêm suffix `_metric` |
| `percentage` | `ratio_metric` | Tỷ lệ % = ratio |
| `risk_level` | `risk_metric` | Level = metric |
| `deviation_metric` | `performance_metric` | Score vs cohort = performance context |
| `correlation_metric` | `performance_metric` | Correlation with score = performance |
| `demographic_metric` | `risk_metric` | Disadvantage score = risk |
| `lifestyle_metric` | `behavioral_metric` | Lifestyle = behavioral pattern |
| `time_delta` | `behavioral_metric` | Submission delay = behavioral |
| `boolean_flag` | `risk_metric` | Flag triggered = risk signal |
| `rolling_average` | `engagement_metric` | Rolling avg of clicks = engagement |
| `outcome_category` | `ratio_metric` | Pass/fail % = ratio |

---

## Mapping đầy đủ 53 tasks — AI Metadata

| Task ID | explanation_strategy | target_audience | query_labels | granularity | aggregation_level |
|---------|---------------------|-----------------|-------------|-------------|-------------------|
| S-B01 | distribution | student | performance_summary | semester | student |
| S-B02 | risk | student | risk_summary | semester | student |
| S-B03 | behavioral | student | engagement_summary | semester | student |
| S-T00 | correlation | student | regression_data | semester | student |
| S-T01 | trend | student | score_trend | per_assessment | student |
| S-T02 | distribution | student | competency_scores | per_assessment | student |
| S-T03 | comparison | student | peer_comparison | semester | student |
| S-T04 | risk | student | risk_flags | semester | student |
| S-T05 | behavioral | student | weekly_engagement | weekly | student |
| S-T06 | behavioral | student | consistency_data | weekly | student |
| S-T07 | correlation | student | absence_data, score_series | per_assessment | student |
| S-T08 | behavioral | student | submission_lateness | per_assessment | student |
| S-T09 | correlation | student | lifestyle_factors, avg_score | semester | student |
| S-T10 | behavioral | student | resource_usage | semester | student |
| S-T11 | correlation | student | registration_data, avg_score | semester | student |
| S-T12 | behavioral | student | submission_series, punctuality_summary | per_assessment | student |
| S-T13 | risk | student | synthesis_data | semester | student |
| S-T14 | correlation | student | social_factors, avg_score | semester | student |
| S-T15 | correlation | student | family_factors, avg_score | semester | student |
| A-B01 | distribution | instructor, admin | score_distribution | per_assessment | cohort |
| A-B02 | distribution | instructor, admin | outcome_counts | semester | cohort |
| A-B03 | distribution | instructor, admin | engagement_distribution | semester | cohort |
| A-B04 | risk | instructor, admin | risk_overview | semester | cohort |
| A-S01 | distribution | instructor, academic_advisor | student_profile | semester | instructor |
| A-S02 | trend | instructor, academic_advisor | score_trend | per_assessment | instructor |
| A-S03 | behavioral | instructor, academic_advisor | engagement_trajectory | weekly | instructor |
| A-S04 | risk | instructor, academic_advisor | risk_flags | semester | instructor |
| A-S05 | distribution | instructor, academic_advisor | competency_scores | per_assessment | instructor |
| A-S06 | behavioral | instructor | submission_lateness | per_assessment | instructor |
| A-S07 | distribution | academic_advisor, admin | background_context | semester | instructor |
| A-S08 | risk | academic_advisor, admin | synthesis_data | semester | instructor |
| A-C01 | comparison | instructor | trajectory_comparison | per_assessment | comparison |
| A-C02 | comparison | instructor | engagement_comparison | semester | comparison |
| A-C03 | comparison | instructor, academic_advisor | risk_comparison | semester | comparison |
| A-C04 | comparison | instructor, academic_advisor | lifestyle_comparison | semester | comparison |
| A-C05 | comparison | academic_advisor | background_comparison | semester | comparison |
| A-C06 | comparison | instructor | resource_comparison | semester | comparison |
| A-G01 | behavioral | instructor, admin | low_engagement_group | semester | cohort |
| A-G02 | correlation | instructor | engagement_performance_scatter | semester | cohort |
| A-G03 | risk | instructor, admin | at_risk_cohort | semester | cohort |
| A-G04 | distribution | instructor | assessment_difficulty | per_assessment | cohort |
| A-G05 | behavioral | instructor | submission_behaviour | per_assessment | cohort |
| A-G06 | correlation | instructor | activity_effectiveness | semester | cohort |
| A-G07 | correlation | instructor, academic_advisor | factor_correlation_matrix | semester | cohort |
| A-G08 | comparison | instructor, academic_advisor | demographic_performance | cohort_aggregate | cohort |
| A-G09 | correlation | academic_advisor, admin | disadvantage_impact | cohort_aggregate | cohort |
| A-G10 | behavioral | instructor | consistency_distribution | weekly | cohort |
| A-G11 | trend | instructor, admin | weekly_drop_detection | weekly | cohort |
| A-G12 | comparison | academic_advisor, admin | outcome_by_group | cohort_aggregate | cohort |
| A-G13 | correlation | academic_advisor | lifestyle_risk_scatter | semester | cohort |
| A-G14 | trend | instructor, admin | withdrawal_signal_trend | weekly | cohort |
| A-G15 | ranking | instructor, admin | intervention_priority_list | semester | cohort |
| A-G16 | risk | admin | synthesis_data | cohort_aggregate | cohort |

---

## Luồng đi end-to-end: taskRegistry.json → Python AI Service → Frontend

```
1. User click "Get AI Explanation" trên task S-T01
   ↓
2. Frontend gọi POST /api/ai/explain với:
   { taskId: "S-T01", datasets: { score_trend: [...] }, meta: {...} }
   ↓
3. ai.controller.js (Node) đọc task từ registry:
   task.explanation_strategy  = "trend"
   task.target_audience       = ["student"]
   task.analysis_context      = { granularity: "per_assessment", ... }
   task.visualization_config  = { semantic_roles: { x: "time", y: "performance_metric" } }
   ↓
4. Node forward payload sang Python FastAPI:
   POST http://localhost:8000/explain
   payload = {
     task_id:              "S-T01",
     explanation_strategy: "trend",        ← từ registry
     target_audience:      ["student"],    ← từ registry
     analysis_context:     { granularity: "per_assessment" },  ← từ registry
     visualization_config: { semantic_roles: {...} },          ← từ registry
     datasets:             { score_trend: [...] },             ← từ analytics run
     confidence:           { level: "HIGH", reason: "..." }
   }
   ↓
5. Python ExplanationStrategyFactory.get_strategy("trend")
   → TrendStrategy instance
   ↓
6. TrendStrategy.build_system_prompt(req):
   - Đọc req.target_audience → "student" → "Focus on encouraging framing"
   - Đọc req.analysis_context.granularity → "per_assessment"
     → "Reference specific assessment numbers, not weekly patterns"
   - Đọc req.visualization_config.semantic_roles.x → "time"
     + semantic_roles.y → "performance_metric"
     → "Identify progression direction of [performance metric] over [assessment sequence]"
   ↓
7. LLM call → JSON response
   ↓
8. Python validate với ExplainResponse.model_validate(json_data)
   → nếu fail → DEGRADED response
   ↓
9. SafetyFilter.apply_safety_filter(text) → check 5 categories
   ↓
10. ObservabilityLogger.log_explanation(...) → insert ai_explanation_log
    ↓
11. Node nhận response → forward về Frontend
    ↓
12. AIInsightPanel render:
    - summary
    - insights[] với evidence[]
    - recommendations[]
    - ConfidenceBadge (HIGH/MEDIUM/LOW)
    - Nếu degraded=true → AIDegradedBanner
```

**Không có `if/else` nào trong luồng này để đoán strategy hay audience.** Tất cả đều đến từ `taskRegistry.json`.

---

## Multi-query tasks — cách query_labels hoạt động

Một số tasks có SQL được chia thành 2 phần riêng biệt (ví dụ S-T07: absence data + score series).

```json
// S-T07: Absence / inactivity impact
{
  "query_labels": ["absence_data", "score_series"]
}
```

**Backend flow:**
```
sqlExecution.service.js
  → Detect: task có 2 SQL statements?
  → Execute cả 2 → [{ index: 0, data: [...] }, { index: 1, data: [...] }]
  → normalizeAnalyticsResult() maps:
       index 0 → "absence_data": [...]
       index 1 → "score_series":  [...]
  → Response: { datasets: { absence_data: [...], score_series: [...] } }
```

**Frontend flow:**
```js
// ChartRenderer đọc primary label
const primaryLabel = taskMeta.query_labels[0]; // "absence_data"
const rawData = datasets[primaryLabel];         // absence rows

// AIInsightPanel gửi toàn bộ datasets
{ datasets: { absence_data: [...], score_series: [...] } }
// → Python AI dùng cả 2 để build insight
```

---

## Trạng thái STEP 2 — hoàn thành

### Checklist từ phase3_contracts.md

- [x] `visualization_config` với `semantic_roles` — 53/53 tasks ✅
- [x] `explanation_strategy` (7-value enum) — 53/53 tasks ✅
- [x] `target_audience` (4-value enum array) — 53/53 tasks ✅
- [x] `query_labels[]` — 53/53 tasks (multi-query tasks có N labels) ✅
- [x] `analysis_context` (granularity + aggregation_level) — 53/53 tasks ✅
- [x] `validateRegistry.js` chạy: 0 errors, 0 warnings ✅

### Scripts hiện có tại `Backend/scripts/`

```
scripts/
├── injectVizConfig.js      ← STEP 2a: viz_type + visualization_config
├── injectAiMetadata.js     ← STEP 2b: AI fields + semantic_roles normalization
└── validateRegistry.js     ← Validation toàn bộ 5 nhóm field
```

**→ STEP 2 HOÀN TOÀN DONE. STEP 3 (Prisma Migration + Backend Skeleton) có thể bắt đầu.**

---

_Ghi lại bởi Antigravity | 2026-05-16 | Phase 3 Step 2b_
