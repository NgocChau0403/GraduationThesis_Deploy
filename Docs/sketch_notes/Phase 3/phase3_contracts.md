# Phase 3 — Finalized Contracts & Schemas
## Source of Truth Before Implementation | v3.1

> All contracts here are FINAL. Implementation must conform to these schemas.
> Do not begin coding Week 7–9 until all sections are signed off.

**Changelog v3.1 (final):**
- Added `analysis_context` to taskRegistry schema (granularity + aggregation_level)
- Structured `confidence.based_on[]` in AI response
- Structured `evidence[]` objects in Insight model (Explainability Contract)
- Full AI execution metadata in response `meta` field

---

## CONTRACT 1 — taskRegistry.json Field Extensions

### 1.1 `visualization_config` (extended with semantic_roles)

```json
{
  "visualization_config": {
    "x_field":   "week_due",
    "y_field":   "avg_score",
    "series_field": null,
    "color_field":  null,
    "orientation": "horizontal",
    "variant":     "default",
    "x_label":    "Assessment Week",
    "y_label":    "Average Score",
    "semantic_roles": {
      "x": "time",
      "y": "performance_metric"
    }
  }
}
```

**`semantic_roles.x` enum:**
| Value | Meaning | Used by |
|---|---|---|
| `time` | Temporal dimension (week, period) | AI trend framing, axis label |
| `category` | Categorical grouping (gender, region) | AI comparison framing |
| `cohort` | Student group identifier | AI cohort framing |
| `student` | Individual student identifier | AI single-student framing |
| `ranking` | Ordinal rank position | AI ranking framing |
| `assessment` | Assessment name/type | AI assessment framing |

**`semantic_roles.y` enum:**
| Value | Meaning |
|---|---|
| `performance_metric` | Score, grade, pass rate |
| `engagement_metric` | Click count, activity level |
| `behavioral_metric` | Submission delay, absence count |
| `risk_metric` | Risk score, disadvantage score |
| `count_metric` | Raw counts (students, events) |
| `ratio_metric` | Percentage, pass rate |

**`variant` values per viz_type:**
| viz_type | variants |
|---|---|
| `bar_chart` | `categorical`, `grouped`, `stacked`, `ranked`, `histogram` |
| `line_chart` | `default`, `multi_series` |
| `scatter_plot` | `default`, `colored` |
| `pie_chart` | `default` (enforced: ≤5 categories) |
| `heatmap` | `week_activity`, `score_matrix` |
| `table` | `ranked`, `default` |

### 1.2 `explanation_strategy` field

```json
{
  "explanation_strategy": "trend"
}
```

**Enum:**
| Value | Used for | Strategy class |
|---|---|---|
| `trend` | Temporal progression tasks | `TrendStrategy` |
| `comparison` | Side-by-side student/group tasks | `ComparisonStrategy` |
| `distribution` | Distribution / histogram tasks | `DistributionStrategy` |
| `correlation` | Scatter / correlation tasks | `CorrelationStrategy` |
| `risk` | At-risk indicator tasks | `RiskStrategy` |
| `behavioral` | Engagement / activity tasks | `BehavioralStrategy` |
| `ranking` | Ranked list tasks | `RankingStrategy` |

### 1.3 `target_audience` field (normalized enum)

```json
{
  "target_audience": ["student"]
}
```

**Enum values:**
| Value | Maps from `roles` | AI tone adjustment |
|---|---|---|
| `student` | `"student"` | Encouraging, first-person framing, avoid jargon |
| `instructor` | `"instructor"` | Professional, pedagogical framing, actionable |
| `academic_advisor` | `"advisor"` | Analytical, evidence-based, neutral tone |
| `admin` | `"admin"` | Aggregated, system-level, comparative |

> **Migration note:** `target_audience` replaces raw `roles` in prompt context. The field value is set in taskRegistry.json. `roles` continues to exist for access control (unchanged).

### 1.4 `query_labels` field

```json
{
  "query_labels": ["score_over_time"]
}
```
For multi-query tasks:
```json
{
  "query_labels": ["trend_data", "risk_indicator"]
}
```

### 1.5 `analysis_context` field

```json
{
  "analysis_context": {
    "granularity":       "weekly",
    "aggregation_level": "student"
  }
}
```

**`granularity` enum:**
| Value | Meaning | AI language guidance |
|---|---|---|
| `weekly` | Week-by-week data points | "sudden decline", "week-over-week" |
| `per_assessment` | Each assessment event | "in Assessment 3", "across 5 attempts" |
| `semester` | Full semester aggregate | "long-term trend", "overall semester" |
| `cohort_aggregate` | Rolled up across cohort | "class-wide", "cohort pattern" |

**`aggregation_level` enum:** `student` | `cohort` | `comparison` | `instructor`

> **Derive rule:** `semantic_roles.x = "time"` AND `granularity = "weekly"` → strategy uses "sudden" / "week-over-week" language. If `granularity = "semester"` → use "long-term" / "sustained" language.

---

## CONTRACT 2 — Analytics API Response Shape

### POST /api/analytics/run → Response

```json
{
  "success": true,
  "executionId": "exec_1747405614_a3f2b1c0",
  "taskId": "S-B01",
  "datasets": {
    "score_over_time": [
      { "week_due": 2, "avg_score": 74.5 },
      { "week_due": 4, "avg_score": 68.0 }
    ]
  },
  "meta": {
    "taskId":         "S-B01",
    "isMultiQuery":   false,
    "queryCount":     1,
    "executionTimeMs": 42,
    "queryHash":      "a3f2b1c0",
    "dataQuality": {
      "status":            "executable",
      "confidence":        "HIGH",
      "confidence_reason": "45 students × 5 assessments across 9 weeks.",
      "warnings":          []
    }
  }
}
```

**Normalization rule in `analytics.controller.js`:**
```js
function normalizeAnalyticsResult(task, result) {
  if (!result.meta.isMultiQuery) {
    const label = task.query_labels?.[0] ?? "data";
    return { [label]: result.data };
  }
  const datasets = {};
  for (const rs of result.data) {
    const label = task.query_labels?.[rs.index] ?? `query_${rs.index}`;
    datasets[label] = rs.data;
  }
  return datasets;
}
```

---

## CONTRACT 3 — AI Explanation API

### POST /api/ai/explain → Request (Node → Client)

```json
{
  "taskId":        "S-B01",
  "executionId":   "exec_1747405614_a3f2b1c0",
  "datasets":      { "score_over_time": [...] },
  "meta": {
    "dataQuality": {
      "confidence":        "HIGH",
      "confidence_reason": "..."
    }
  },
  "studentContext": {
    "student_id": "STU_001",
    "gender":     "M",
    "age_group":  "35-55"
  }
}
```

### POST /api/ai/explain → Response (Node → Client)

```json
{
  "task_id":      "S-B01",
  "execution_id": "exec_1747405614_a3f2b1c0",
  "explanation": {
    "summary": "The student's normalized assessment scores show a declining trend from week 2 to week 7, with a partial recovery observed at week 9.",
    "insights": [
      {
        "title":       "Score Decline Mid-Semester",
        "description": "Average scores dropped from 74.5 to 61.2 between weeks 2 and 7.",
        "severity":    "medium",
        "evidence": [
          {
            "metric":     "avg_score",
            "value":      61.2,
            "comparison": "down_from_previous",
            "delta":      -14.2,
            "context":    "week_due=7"
          },
          {
            "metric":     "avg_score",
            "value":      74.5,
            "comparison": "baseline",
            "delta":      null,
            "context":    "week_due=2"
          }
        ]
      }
    ],
    "educational_implications": [
      "The pattern suggests increased assessment difficulty or reduced preparation time during mid-semester."
    ],
    "recommendations": [
      {
        "priority":   "medium",
        "action":     "Review engagement patterns during weeks 5–7 alongside score data.",
        "rationale":  "Score decline may correlate with reduced platform activity during that period."
      }
    ],
    "warnings": []
  },
  "confidence": {
    "level":  "MEDIUM",
    "reason": "5 students × 3 assessments across 4 weeks — adequate but limited range.",
    "based_on": ["sparse_data", "limited_temporal_range"]
  },
  "explanation_type":     "temporal",
  "explanation_strategy": "trend",
  "safety_flags":         [],
  "meta": {
    "model":       "gpt-4o-mini",
    "latency_ms":  1240,
    "token_usage": {
      "prompt_tokens":     312,
      "completion_tokens": 187,
      "total_tokens":      499
    },
    "strategy":    "trend",
    "granularity": "weekly",
    "cost_usd":    0.00029
  }
}
```

### DEGRADED Response (AI service unavailable)

```json
{
  "task_id":      "S-B01",
  "execution_id": "exec_...",
  "degraded":     true,
  "explanation": {
    "summary": "AI explanation is temporarily unavailable.",
    "insights": [],
    "educational_implications": [],
    "recommendations": [],
    "warnings": ["LLM service timeout. Please try again later."]
  },
  "confidence": { "level": null, "reason": null, "based_on": [] },
  "safety_flags": [],
  "meta": {
    "model": null,
    "latency_ms": 15001,
    "token_usage": null,
    "strategy": null,
    "granularity": null,
    "cost_usd": null
  }
}
```

> **Rule:** Frontend MUST check `response.degraded === true` and render `<AIDegradedBanner />` instead of normal panel. Chart rendering is NEVER blocked by AI failure.

---

## CONTRACT 4 — Python FastAPI Internal Schema (Pydantic)

### ExplainRequest

```python
class SemanticRoles(BaseModel):
    x: str   # "time" | "category" | "cohort" | "student" | "ranking" | "assessment"
    y: str   # "performance_metric" | "engagement_metric" | "behavioral_metric" | ...

class VisualizationConfig(BaseModel):
    x_field:        str
    y_field:        str
    series_field:   str | None = None
    variant:        str = "default"
    x_label:        str | None = None
    y_label:        str | None = None
    semantic_roles: SemanticRoles | None = None

class AnalysisContext(BaseModel):
    granularity:       str   # "weekly" | "per_assessment" | "semester" | "cohort_aggregate"
    aggregation_level: str   # "student" | "cohort" | "comparison" | "instructor"

class ConfidenceInput(BaseModel):
    level:  str          # "HIGH" | "MEDIUM" | "LOW"
    reason: str
    # based_on is computed by Python from confidence level + data quality signals
    # NOT passed in from Node — Python derives it from confidence + dataset metrics

class ExplainRequest(BaseModel):
    task_id:              str
    execution_id:         str
    task_name:            str
    analysis_type:        str
    explanation_strategy: str       # "trend" | "comparison" | "risk" | ...
    explanation_type:     str       # "descriptive" | "temporal" | "risk" | ...
    ai_prompt_hint:       str
    actionable_question:  str
    target_audience:      list[str] # ["student"] | ["instructor"] | ...
    visualization_config: VisualizationConfig | None = None
    analysis_context:     AnalysisContext | None = None
    datasets:             dict[str, list[dict]]  # { "score_over_time": [...] }
    confidence:           ConfidenceInput
    student_context:      dict | None = None
```

### ExplainResponse (internal — before Node proxy)

```python
class EvidenceItem(BaseModel):
    metric:     str              # "avg_score", "click_count", "submission_delay"
    value:      float | int | str
    comparison: Literal[        # semantic comparison tag
        "baseline",
        "up_from_previous",
        "down_from_previous",
        "peak",
        "trough",
        "stable"
    ]
    delta:      float | None = None  # signed delta from previous; null for baseline
    context:    str | None  = None   # "week_due=7", "assessment_type=TMA"

class Insight(BaseModel):
    title:       str
    description: str
    severity:    Literal["low", "medium", "high"]
    evidence:    list[EvidenceItem] = []  # structured — NOT free text strings

class Recommendation(BaseModel):
    priority:  Literal["low", "medium", "high"]
    action:    str
    rationale: str

class ConfidenceInfo(BaseModel):
    level:    str          # "HIGH" | "MEDIUM" | "LOW"
    reason:   str
    based_on: list[str]   # ["sparse_data", "limited_temporal_range", "single_student"]
    # based_on enum values:
    # "sparse_data"            — below MEDIUM threshold
    # "limited_temporal_range" — < 4 distinct weeks
    # "single_student"         — only 1 enrollment
    # "missing_fe_fields"      — FE fields not populated (Layer B partial)
    # "dataset_mismatch"       — task not fully compatible with loaded dataset
    # "sufficient_data"        — HIGH confidence, no issues

class TokenUsage(BaseModel):
    prompt_tokens:     int
    completion_tokens: int
    total_tokens:      int

class AIMeta(BaseModel):
    model:       str
    latency_ms:  int
    token_usage: TokenUsage | None
    strategy:    str        # explanation_strategy used
    granularity: str | None # from analysis_context.granularity
    cost_usd:    float | None  # estimated cost (prompt+completion tokens × rate)

class ExplanationBody(BaseModel):
    summary:                   str
    insights:                  list[Insight]
    educational_implications:  list[str]
    recommendations:           list[Recommendation]
    warnings:                  list[str]

class ExplainResponse(BaseModel):
    task_id:              str
    execution_id:         str
    explanation:          ExplanationBody
    confidence:           ConfidenceInfo
    explanation_type:     str
    explanation_strategy: str
    safety_flags:         list[str]
    degraded:             bool = False
    meta:                 AIMeta
```

**`confidence.based_on` derivation logic (Python, not LLM):**
```python
def derive_confidence_sources(confidence_level: str, req: ExplainRequest) -> list[str]:
    if confidence_level == "HIGH":
        return ["sufficient_data"]
    sources = []
    if confidence_level == "LOW":
        sources.append("sparse_data")
    # Check temporal range from datasets
    primary = list(req.datasets.values())[0] if req.datasets else []
    if req.analysis_context and req.analysis_context.granularity == "weekly":
        weeks = len({row.get(req.visualization_config.x_field) for row in primary if row})
        if weeks < 4:
            sources.append("limited_temporal_range")
    if req.analysis_context and req.analysis_context.aggregation_level == "student":
        if len(primary) < 3:
            sources.append("single_student")
    return sources or ["sparse_data"]
```

> **Contract enforcement:** After LLM call, parse with `ExplainResponse.model_validate(json_data)`. If `ValidationError` → return DEGRADED response — do NOT crash.

> **Cost estimation (AIMeta.cost_usd):** gpt-4o-mini pricing = $0.00015/1K prompt + $0.00060/1K completion tokens. Compute at response time, store in observability log for thesis cost analysis.

---

## CONTRACT 5 — Chart Data Adapter Interface

### Adapter contract (JavaScript interface pattern)

```js
// Frontend/src/chartAdapters/adapter.interface.js
/**
 * Each adapter must implement:
 * @param {Object[]} rawData     - SQL result rows from datasets[label]
 * @param {Object} config        - visualization_config from taskMeta
 * @returns {Object}             - chart-library-ready data structure
 */
export function adapt(rawData, config) { /* ... */ }
```

### Adapters per viz_type

```
Frontend/src/chartAdapters/
  ├── line.adapter.js       → { data: [{name, value}], lines: [...] }
  ├── bar.adapter.js        → { data: [{name, value}] } or grouped shape
  ├── scatter.adapter.js    → { data: [{x, y, label}] }
  ├── pie.adapter.js        → { data: [{name, value}] }
  ├── heatmap.adapter.js    → { rows: [], cols: [], cells: [] }
  └── table.adapter.js      → { columns: [], rows: [] }
```

### Usage in ChartRenderer

```jsx
import * as LineAdapter from "../chartAdapters/line.adapter";

const ADAPTER_MAP = {
  line_chart:   LineAdapter,
  bar_chart:    BarAdapter,
  histogram:    BarAdapter,
  scatter_plot: ScatterAdapter,
  pie_chart:    PieAdapter,
  heatmap:      HeatmapAdapter,
  table:        TableAdapter,
};

export default function ChartRenderer({ taskMeta, datasets, isLoading }) {
  const primaryLabel  = taskMeta.query_labels?.[0] ?? "data";
  const rawData       = datasets?.[primaryLabel] ?? [];
  const adapter       = ADAPTER_MAP[taskMeta.viz_type];
  const chartData     = adapter.adapt(rawData, taskMeta.visualization_config);
  const ChartComponent = CHART_MAP[taskMeta.viz_type];

  return <ChartComponent data={chartData} config={taskMeta.visualization_config} />;
}
```

**Separation of concerns:**
- **Adapter** — transform raw SQL rows → chart-library format (pure functions, testable)
- **Chart component** — pure rendering (receives already-adapted data)
- **ChartRenderer** — orchestration only (dispatch adapter + component)

---

## CONTRACT 6 — Safety Filter Rules (Finalized)

```python
SAFETY_RULES = [
    # Category 1: Personality judgments
    (r"\b(lazy|unmotivated|careless|irresponsible|disengaged|apathetic)\b",
     "personality_judgment", "high"),

    # Category 2: Deterministic predictions
    (r"\b(will|definitely|certainly|always|never)\s+(fail|pass|succeed|drop\s*out)\b",
     "deterministic_prediction", "high"),

    # Category 3: Unsupported causality
    (r"\b(caused?|resulted?\s+in|led?\s+to|because\s+of)\b.{0,60}\b(score|grade|fail|performance|result)\b",
     "causality_claim", "medium"),

    # Category 4: Overconfident statistics
    (r"\b\d{1,3}%\s+(of\s+students|will|are\s+likely)\b",
     "unsupported_statistic", "medium"),

    # Category 5: Psychological assumptions
    (r"\b(anxious|stressed|depressed|overwhelmed|struggling\s+emotionally)\b",
     "psychological_assumption", "high"),
]

class SafetyFlag(BaseModel):
    category: str
    severity: Literal["low", "medium", "high"]
    matched_text: str   # for observability/debugging only — NOT sent to frontend

def apply_safety_filter(text: str) -> tuple[str, list[SafetyFlag]]:
    """
    MVP: detect + flag.
    Returns: (original_text, flags)
    Frontend receives only flag category+severity (not matched_text).
    """
```

---

## CONTRACT 7 — Observability Schema

### `ai_explanation_logs` Prisma model

```prisma
model AiExplanationLog {
  id              String   @id @default(uuid()) @map("log_id")
  execution_id    String
  task_id         String
  explanation_strategy String
  confidence_level     String
  prompt_hash     String   @db.VarChar(16)   // MD5 of prompt for dedup
  prompt_preview  String   @db.VarChar(500)  // first 500 chars only
  response_json   Json
  model_used      String
  latency_ms      Int
  token_count     Int?
  safety_flags    String[]
  degraded        Boolean  @default(false)
  created_at      DateTime @default(now())

  @@index([execution_id])
  @@index([task_id])
  @@map("ai_explanation_log")
}
```

---

## CONTRACT 8 — Timeout & Retry Strategy

```
Node.js (ai.controller.js)
├── axios timeout:     15,000ms   (env: AI_SERVICE_TIMEOUT_MS)
├── On 503/504/timeout → return DEGRADED response (never crash dashboard)
└── No retry at Node level (user can manually retry via UI button)

Python FastAPI (llm_client.py)
├── httpx timeout:     12,000ms   (3s buffer before Node fires)
├── Retry:             1 retry, 2s backoff (only on transient LLM errors)
├── On ValidationError (bad LLM JSON) → return DEGRADED
└── On timeout after retry → raise HTTPException(504)

LLM parameters
├── temperature:       0.3    (low = less hallucination)
├── max_tokens:        800
└── response_format:   { "type": "json_object" }  (OpenAI JSON mode)
```

---

## CONTRACT 6 — Registry Validation Rules (Hardened)

To ensure the architectural integrity of `taskRegistry.json`, a multi-level validation script (`scripts/validateRegistry.js`) enforces the following rules. All 53 tasks must pass these rules without errors.

### 6.1 Cross-Field Rules (Level 2)
1. `line_chart` + `multi_series` → `series_field` must not be null.
2. `scatter_plot` + `colored` → `color_field` must not be null.
3. `heatmap` → Both `x_field` and `y_field` must not be null.
4. `semantic_roles.x = "time"` → `x_field` must not be null.
5. `bar_chart` + `grouped` → `series_field` must not be null.
6. `bar_chart` + `stacked` → `series_field` must not be null.
7. `table` (non-synthesis) → Warning if both `x_field` and `y_field` are null.
8. `query_labels` → Must not contain comma-separated strings.

### 6.2 Architectural Integrity Checks (Level 3)
1. `ranking` strategy → Cannot use `pie_chart`.
2. `trend` strategy → Should use `line_chart` or `bar_chart`.
3. `correlation` strategy → Should use `scatter_plot` or `heatmap`.
4. `aggregation_level = comparison` → Audience must include `instructor` or `academic_advisor`.
5. `granularity = weekly` + time-series viz → `semantic_roles.x` must be `"time"`.
6. Target audience `["student"]` only → Should use `aggregation_level = student`.

*(To run validation: `npm run registry:validate`. To generate statistics: `npm run registry:stats`)*

---

## SIGN-OFF CHECKLIST (Before Implementation)

- [ ] All 53 tasks in `taskRegistry.json` have `visualization_config` with `semantic_roles`
- [ ] All 53 tasks have `explanation_strategy` (one of 7 enum values)
- [ ] All 53 tasks have `target_audience` (one of 4 enum values)
- [ ] All multi-query tasks have `query_labels[]` matching their `sqlQueries[]` count
- [ ] Analytics response shape confirmed (datasets dict, not raw array)
- [ ] AI response schema confirmed (summary + insights[] + recommendations[] + warnings[])
- [ ] DEGRADED response shape confirmed and tested
- [ ] Chart adapter interface agreed (separate from chart component)
- [ ] Safety rule categories agreed (5 categories, severity levels)
- [ ] Observability schema added to Prisma and migrated

---

*Contracts v1.0 — Finalized 2026-05-16*
*Status: PENDING SIGN-OFF → implementation begins after all checkboxes above*
