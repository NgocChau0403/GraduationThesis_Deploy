# Phase 3 — Visualization & AI Implementation Plan (v3)

## Weeks 7–9 | Revised after Architecture Review × 2

> **📄 See also:** [`phase3_contracts.md`](./phase3_contracts.md) — Finalized schemas, response shapes, Pydantic models, adapter interface. All implementation MUST conform to that document.

---

## 1. READINESS ASSESSMENT

### ✅ Backend Phase 2 — Fully Complete

| Component             | File                             | Status                            |
| --------------------- | -------------------------------- | --------------------------------- |
| Task Registry Service | `taskRegistry.service.js`        | ✅ Singleton, 53 tasks            |
| SQL Execution Engine  | `sqlExecution.service.js`        | ✅ Parameterized, timeout, BigInt |
| Capability Validator  | `capabilityValidator.service.js` | ✅ 4-layer (A→D)                  |
| Analytics Controller  | `analytics.controller.js`        | ✅ POST /api/analytics/run        |
| Students/Classes API  | `students.controller.js`         | ✅ With summary endpoint          |
| Swagger Docs          | `config/swagger.js`              | ✅ 100% coverage                  |

### 📝 Phase 3 Must Build

| Component                           | Notes                                |
| ----------------------------------- | ------------------------------------ |
| Python FastAPI AI Service           | New project from scratch             |
| `POST /api/ai/explain` (Node proxy) | New ai.routes.js + ai.controller.js  |
| Frontend: ChartRenderer.jsx         | 7 chart types, metadata-driven       |
| Frontend: AIInsightPanel.jsx        | Structured output display            |
| Frontend: StudentDashboard          | Complete (stats + tasks + workspace) |
| Frontend: analyticsApi.js           | 4 API functions                      |
| Frontend: hooks/                    | useAnalytics, useTaskRegistry        |

---

## 2. PRE-WEEK 7: taskRegistry.json Schema Extension

> **CRITICAL — Do this BEFORE writing any frontend/AI code.**
> Adding these 2 fields to all 53 tasks prevents rendering spaghetti and prompt spaghetti.

### 2.1 Add `visualization_config` + `semantic_roles` (replaces raw viz_type dispatch)

```json
{
  "taskId": "S-B01",
  "viz_type": "line_chart",
  "visualization_config": {
    "x_field": "week_due",
    "y_field": "avg_score",
    "series_field": null,
    "color_field": null,
    "orientation": "horizontal",
    "variant": "default",
    "x_label": "Assessment Week",
    "y_label": "Average Score",
    "semantic_roles": {
      "x": "time",
      "y": "performance_metric"
    }
  }
}
```

**Variant values per viz_type:**
| viz_type | variants |
|---|---|
| `bar_chart` | `categorical`, `grouped`, `stacked`, `ranked`, `histogram` |
| `line_chart` | `default`, `multi_series` |
| `scatter_plot` | `default`, `colored` |
| `pie_chart` | `default` (≤5 categories only) |
| `heatmap` | `week_activity`, `score_matrix` |
| `table` | `ranked`, `default` |

This makes ChartRenderer **purely declarative** — no internal if/else for field guessing.

### 2.2 Add `explanation_strategy` + `target_audience` + `query_labels`

```json
{
  "taskId": "S-B01",
  "explanation_type": "temporal",
  "explanation_strategy": "trend",
  "target_audience": ["student"],
  "query_labels": ["score_over_time"]
}
```

**`explanation_strategy` values:** `trend` | `comparison` | `distribution` | `correlation` | `risk` | `behavioral`

**`query_labels`** — names for multi-query result sets (replaces `{index, data}` shape):

```json
"query_labels": ["trend_data", "risk_indicator"]
```

> `prompt_template` is **derived** from `explanation_strategy` at runtime — no third field needed.

**`target_audience` enum:** `student` | `instructor` | `academic_advisor` | `admin`
AI tone adjusts per audience — student gets encouraging framing, instructor gets pedagogical/actionable framing.

> **Full schema specs for all fields:** See `phase3_contracts.md` → CONTRACT 1.

---

## 3. ARCHITECTURE OVERVIEW — Phase 3 (Revised)

```
Frontend (React + TanStack Query)
  StudentDashboard
  ├── StudentStatCard × 3        GET /api/students/:id/summary
  ├── TaskSelector               GET /api/tasks?scope=student
  └── AnalyticsWorkspace
        ├── FilterPanel
        ├── ChartRenderer        ← visualization_config drives rendering
        └── AIInsightPanel       ← structured output: summary + insights + warnings
              ↓
    POST /api/ai/explain (Node)
              ↓
    POST /explain (Python FastAPI)
    ├── ExplanationStrategyFactory   ← picks strategy by explanation_strategy field
    │     ├── TrendStrategy
    │     ├── ComparisonStrategy
    │     ├── RiskStrategy
    │     └── CorrelationStrategy
    ├── LLMClient (JSON mode output)
    ├── SafetyFilter (causality + overconfidence detection)
    └── ObservabilityLogger (DB: ai_explanation_logs)
```

---

## 4. WEEK 7 — ChartRenderer + API Layer

### 4.1 Backend: analytics.controller.js — Normalize Multi-Query Response

Add `normalizeAnalyticsResult(task, result)` to `analytics.controller.js`:

```js
function normalizeAnalyticsResult(task, result) {
  // Single-query: return as-is with label
  if (!result.meta.isMultiQuery) {
    const label = task.query_labels?.[0] ?? "data";
    return { datasets: { [label]: result.data } };
  }
  // Multi-query: map index → label from query_labels[]
  const datasets = {};
  for (const rs of result.data) {
    const label = task.query_labels?.[rs.index] ?? `query_${rs.index}`;
    datasets[label] = rs.data;
  }
  return { datasets };
}
```

**New response shape:**

```json
{
  "success": true,
  "executionId": "exec_...",
  "taskId": "S-B01",
  "datasets": {
    "score_over_time": [...]
  },
  "meta": {
    "dataQuality": { "confidence": "HIGH", "confidence_reason": "..." }
  }
}
```

Frontend never sees `[{index, data, rowCount}]` again.

### 4.2 Backend: ai.routes.js + ai.controller.js

**`Backend/src/routes/ai.routes.js`:**

```js
POST / api / ai / explain;
```

**`Backend/src/controllers/ai.controller.js`:**

```js
export async function explainController(req, res) {
  const { taskId, datasets, meta, studentContext } = req.body;
  const task = taskRegistryService.getTaskById(taskId);

  // Build rich payload — pull fields from task metadata
  const payload = {
    task_id: taskId,
    task_name: task.taskName,
    analysis_type: task.analytics?.analysisType,
    explanation_strategy: task.explanation_strategy, // NEW field
    explanation_type: task.explanation_type,
    ai_prompt_hint: task.ai_prompt_hint,
    actionable_question: task.actionableQuestion,
    target_audience: task.roles, // derive from existing field
    sql_result: datasets,
    confidence: meta?.dataQuality?.confidence,
    confidence_reason: meta?.dataQuality?.confidence_reason,
    student_context: studentContext ?? null,
    execution_id: req.body.executionId, // propagate for traceability
  };

  // Forward to Python with timeout
  const response = await axios.post(
    `${process.env.AI_SERVICE_URL}/explain`,
    payload,
    { timeout: parseInt(process.env.AI_SERVICE_TIMEOUT_MS) || 15000 },
  );
  return res.json(response.data);
}
```

**Graceful degradation:** Wrap in try/catch — if Python service down → `503` with `{ success: false, degraded: true, reason: "AI service unavailable" }`. Frontend disables AIInsightPanel, chart still works.

### 4.3 Frontend: Install Dependencies

```bash
cd Frontend
npm install recharts @tanstack/react-query axios
```

**Setup TanStack Query in `main.jsx`:**

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
});
// wrap <App /> with <QueryClientProvider client={queryClient}>
```

### 4.4 Frontend: analyticsApi.js

```js
// Frontend/src/services/analyticsApi.js
const BASE = import.meta.env.VITE_API_URL;

export const runAnalyticsTask = (taskId, params) =>
  fetch(`${BASE}/api/analytics/run`, {
    method: "POST",
    body: JSON.stringify({ taskId, params }),
  });

export const getAIExplanation = (
  taskId,
  datasets,
  meta,
  studentContext,
  executionId,
) =>
  fetch(`${BASE}/api/ai/explain`, {
    method: "POST",
    body: JSON.stringify({
      taskId,
      datasets,
      meta,
      studentContext,
      executionId,
    }),
  });

export const getTaskList = (scope, dataset) =>
  fetch(`${BASE}/api/tasks?scope=${scope}&dataset=${dataset}`);

export const getStudentSummary = (studentId, batchId, classId) =>
  fetch(
    `${BASE}/api/students/${studentId}/summary?batchId=${batchId}&classId=${classId}`,
  );
```

### 4.5 Frontend: ChartRenderer.jsx (visualization_config-driven)

```jsx
// Frontend/src/components/ChartRenderer.jsx
// Adapters transform raw SQL rows → chart-library format (pure functions)
import * as LineAdapter from "../chartAdapters/line.adapter";
import * as BarAdapter from "../chartAdapters/bar.adapter";
import * as ScatterAdapter from "../chartAdapters/scatter.adapter";
import * as PieAdapter from "../chartAdapters/pie.adapter";
import * as HeatmapAdapter from "../chartAdapters/heatmap.adapter";
import * as TableAdapter from "../chartAdapters/table.adapter";

import LineChartView from "./charts/LineChartView";
import BarChartView from "./charts/BarChartView";
import ScatterView from "./charts/ScatterChartView";
import PieView from "./charts/PieChartView";
import HeatmapView from "./charts/HeatmapView";
import DataTableView from "./charts/DataTableView";

const ADAPTER_MAP = {
  line_chart: LineAdapter,
  bar_chart: BarAdapter,
  histogram: BarAdapter,
  scatter_plot: ScatterAdapter,
  pie_chart: PieAdapter,
  heatmap: HeatmapAdapter,
  table: TableAdapter,
};

const CHART_MAP = {
  line_chart: LineChartView,
  bar_chart: BarChartView,
  histogram: BarChartView,
  scatter_plot: ScatterView,
  pie_chart: PieView,
  heatmap: HeatmapView,
  table: DataTableView,
};

export default function ChartRenderer({ taskMeta, datasets, isLoading }) {
  if (isLoading) return <ChartSkeleton />;
  if (!taskMeta || !datasets) return null;

  const primaryLabel = taskMeta.query_labels?.[0] ?? "data";
  const rawData = datasets[primaryLabel] ?? [];
  const adapter = ADAPTER_MAP[taskMeta.viz_type];
  const chartData = adapter.adapt(rawData, taskMeta.visualization_config);
  const ChartComponent = CHART_MAP[taskMeta.viz_type];

  return (
    <ChartComponent
      data={chartData} // already adapted — no raw SQL shape
      config={taskMeta.visualization_config} // semantic_roles, labels, variant
    />
  );
}
```

**3-layer separation:**

- **Adapter** (`chartAdapters/`) — raw rows → chart-library format. Pure functions. Testable.
- **Chart component** (`components/charts/`) — pure rendering. Receives adapted data only.
- **ChartRenderer** — orchestration. Picks adapter + component. Zero business logic.

> **Adapter interface contract:** See `phase3_contracts.md` → CONTRACT 5.

---

## 5. WEEK 8 — Python AI Service

### 5.1 Project Structure

```
AIService/
├── main.py
├── config.py
├── routers/
│   └── explain.py
├── models/
│   └── schemas.py
├── services/
│   ├── llm_client.py
│   ├── safety_filter.py
│   ├── observability.py
│   └── explanation_strategies/
│       ├── __init__.py           # ExplanationStrategyFactory
│       ├── trend_strategy.py
│       ├── comparison_strategy.py
│       ├── distribution_strategy.py
│       ├── risk_strategy.py
│       └── correlation_strategy.py
├── requirements.txt
└── .env.example
```

### 5.2 Structured Response Schema (Pydantic)

```python
class ExplainResponse(BaseModel):
    task_id:          str
    execution_id:     str           # propagated for traceability
    summary:          str           # 1-sentence TL;DR
    key_insights:     list[str]     # 2-4 bullet findings
    educational_implications: list[str]  # 1-2 pedagogical notes
    data_warnings:    list[str]     # empty if confidence=HIGH
    confidence:       str           # HIGH | MEDIUM | LOW
    explanation_type: str
    explanation_strategy: str
    safety_flags:     list[str]     # causality | overconfidence | personality
    model_used:       str
    latency_ms:       int
    token_count:      int | None
```

**LLM JSON mode prompt suffix:**

```python
"""
Respond ONLY with valid JSON matching this schema:
{
  "summary": "...",
  "key_insights": ["...", "..."],
  "educational_implications": ["..."],
  "data_warnings": []
}
"""
```

### 5.3 Explanation Strategy Factory

```python
# services/explanation_strategies/__init__.py
from .trend_strategy      import TrendStrategy
from .comparison_strategy import ComparisonStrategy
from .risk_strategy       import RiskStrategy
from .correlation_strategy import CorrelationStrategy
from .distribution_strategy import DistributionStrategy

STRATEGY_MAP = {
    "trend":        TrendStrategy,
    "comparison":   ComparisonStrategy,
    "risk":         RiskStrategy,
    "correlation":  CorrelationStrategy,
    "distribution": DistributionStrategy,
    "behavioral":   TrendStrategy,  # reuse trend for temporal behavioral
}

def get_strategy(explanation_strategy: str):
    cls = STRATEGY_MAP.get(explanation_strategy, TrendStrategy)
    return cls()
```

Each strategy implements `build_system_prompt(req)` and `build_user_prompt(req)` — strategy-specific language guidance.

**Example — TrendStrategy system prompt addition:**

> _"Focus on direction, slope, and temporal inflection points. Use words like 'increased', 'declined', 'stabilized', 'peaked at week X'."_

**Example — RiskStrategy system prompt addition:**

> _"Identify risk signals from observable data only. Use hedged language. Never label a student as 'at risk' — instead describe specific behavioral thresholds observed."_

### 5.4 Safety Filter (Revised Scope)

```python
# services/safety_filter.py
SAFETY_RULES = [
    # Personality judgments
    (r"\b(lazy|unmotivated|careless|irresponsible|disengaged)\b",
     "personality_judgment"),
    # Deterministic predictions
    (r"\b(will|definitely|certainly|always|never)\s+(fail|pass|succeed|drop)\b",
     "deterministic_prediction"),
    # Unsupported causality
    (r"\b(caused?|resulted?\s+in|led?\s+to|because)\b.{0,50}\b(score|grade|fail|performance)\b",
     "causality_claim"),
    # Overconfident quantitative claims not in data
    (r"\b(\d{1,3}%)\s+(of students|will|are)\b",
     "unsupported_statistic"),
]

def apply_safety_filter(text: str) -> tuple[str, list[str]]:
    """
    MVP: detect and flag — do NOT auto-redact (redaction can break coherence).
    Phase 4: add redaction + regeneration if flag severity is HIGH.
    """
    flags = []
    for pattern, flag_name in SAFETY_RULES:
        if re.search(pattern, text, re.IGNORECASE):
            flags.append(flag_name)
    return text, flags
```

### 5.5 Observability Logger

```python
# services/observability.py
# Option A (MVP): Log to file
# Option B (preferred): Insert to PostgreSQL ai_explanation_logs table

async def log_explanation(
    execution_id: str, task_id: str,
    prompt_text: str, response_text: str,
    model: str, latency_ms: int, token_count: int,
    safety_flags: list[str]
):
    # Truncate prompt to 2000 chars for storage efficiency
    pass
```

**DB table (add to Prisma schema):**

```prisma
model AiExplanationLog {
  id            String   @id @default(uuid())
  execution_id  String
  task_id       String
  prompt_text   String   @db.Text
  response_json Json
  model_used    String
  latency_ms    Int
  token_count   Int?
  safety_flags  String[]
  created_at    DateTime @default(now())
}
```

### 5.6 LLM Client with Retry

```python
# services/llm_client.py
async def generate_explanation(prompt: str, config: dict) -> tuple[str, int, int]:
    """Returns (response_text, token_count, latency_ms)"""
    # Retry: max 1 retry with 2s backoff
    # Temperature: 0.3 (low hallucination)
    # Max tokens: 800 (covers structured JSON with 4 fields)
    # JSON mode: enabled (OpenAI: response_format={"type": "json_object"})
```

### 5.7 Timeout Strategy

```
Node → Python:  axios timeout = 15s  (env: AI_SERVICE_TIMEOUT_MS)
Python → LLM:   httpx timeout = 12s  (leaves 3s buffer for processing)
LLM response:   max_tokens = 800     (~1-2s for gpt-4o-mini)

If Node timeout fires: return 503 { degraded: true }
If Python LLM timeout: return 504 with retry hint
```

---

## 6. WEEK 9 — Frontend Components + StudentDashboard

### 6.1 useTaskRegistry.js (TanStack Query)

```js
// Frontend/src/hooks/useTaskRegistry.js
import { useQuery } from "@tanstack/react-query";
import { getTaskList } from "../services/analyticsApi";

export function useTaskRegistry(scope, dataset) {
  return useQuery({
    queryKey: ["tasks", scope, dataset],
    queryFn: () => getTaskList(scope, dataset).then((r) => r.json()),
    staleTime: 10 * 60 * 1000, // tasks don't change — cache 10min
  });
}
```

### 6.2 useAnalytics.js (TanStack Query mutations)

```js
// Frontend/src/hooks/useAnalytics.js
import { useMutation } from "@tanstack/react-query";

export function useAnalytics() {
  const runMutation = useMutation({
    mutationFn: ({ taskId, params }) =>
      runAnalyticsTask(taskId, params).then((r) => r.json()),
  });

  const explainMutation = useMutation({
    mutationFn: ({ taskId, datasets, meta, studentContext, executionId }) =>
      getAIExplanation(
        taskId,
        datasets,
        meta,
        studentContext,
        executionId,
      ).then((r) => r.json()),
  });

  return {
    run: runMutation.mutate,
    explain: explainMutation.mutate,
    result: runMutation.data,
    aiOutput: explainMutation.data,
    isRunning: runMutation.isPending,
    isExplaining: explainMutation.isPending,
    runError: runMutation.error,
    aiError: explainMutation.error,
    aiDegraded: explainMutation.data?.degraded === true,
  };
}
```

### 6.3 AIInsightPanel.jsx (Structured Output)

```jsx
export default function AIInsightPanel({
  taskId,
  datasets,
  meta,
  studentContext,
  executionId,
}) {
  const { explain, aiOutput, isExplaining, aiError, aiDegraded } =
    useAnalytics();

  // Confidence badge colors
  const badgeColor = { HIGH: "green", MEDIUM: "yellow", LOW: "orange" };

  if (aiDegraded || aiError) return <AIDegradedBanner />;

  return (
    <div className="ai-panel">
      <button
        onClick={() =>
          explain({ taskId, datasets, meta, studentContext, executionId })
        }
      >
        Get AI Explanation
      </button>

      {isExplaining && <ExplanationSkeleton />}

      {aiOutput && (
        <>
          <ConfidenceBadge
            level={aiOutput.confidence}
            color={badgeColor[aiOutput.confidence]}
          />
          <p className="summary">{aiOutput.summary}</p>
          <InsightsList insights={aiOutput.key_insights} />
          <ImplicationsList items={aiOutput.educational_implications} />
          {aiOutput.data_warnings.length > 0 && (
            <WarningBox warnings={aiOutput.data_warnings} />
          )}
          {aiOutput.safety_flags.length > 0 && (
            <SafetyFlagNotice flags={aiOutput.safety_flags} />
          )}
        </>
      )}
    </div>
  );
}
```

### 6.4 StudentDashboard — Complete Flow

```
Mount:
  1. useQuery: GET /api/students/:id/summary → render StatCards
  2. useTaskRegistry("student", activeDataset.source) → render TaskSelector

User selects task:
  3. FilterPanel: student_id pre-filled, class_id pre-filled from activeDataset
  4. [Run Analysis] → runMutation → ChartRenderer renders (visualization_config-driven)
  5. [Get AI Explanation] → explainMutation → AIInsightPanel renders structured output
```

---

## 7. EXECUTION PLAN — 5 Steps (Correct Order)

> ⚠️ This order is NON-NEGOTIABLE. Each step gates the next.
> FE does NOT start until mock data is ready. AI service is built before FE hooks are connected.

---

### STEP 1 — Freeze Contracts ✅ DONE

> Reference: `phase3_contracts.md` v3.1 — all schemas locked.

- [x] `visualization_config` + `semantic_roles` schema
- [x] `analysis_context` (granularity + aggregation_level)
- [x] `target_audience` normalized enum (4 values)
- [x] `explanation_strategy` enum (7 values)
- [x] `query_labels[]` convention
- [x] Analytics API response shape (`datasets` dict)
- [x] AI response schema (summary + insights[] + recommendations[] + warnings[])
- [x] `confidence.based_on[]` + `EvidenceItem` struct
- [x] `AIMeta` (model, latency, token_usage, cost_usd)
- [x] DEGRADED response shape
- [x] Chart adapter interface
- [x] Safety filter 5-category rules
- [x] `AiExplanationLog` Prisma model schema

> 🔒 **CONTRACTS LOCKED. No further schema changes.**

---

### STEP 2 — Update taskRegistry.json (53 Tasks) 📝 TO DO

> 📝 **BLOCKING** — Nothing starts until every task has all 5 new fields.
> If metadata is incomplete → renderer dies, AI strategy dies, FE starts hardcoding.

**For EVERY task in `Backend/src/config/taskRegistry.json`:**

- [ ] Add `visualization_config` with `x_field`, `y_field`, `variant`, `x_label`, `y_label`, `semantic_roles`
- [ ] Add `analysis_context` with `granularity` + `aggregation_level`
- [ ] Add `explanation_strategy` (trend/comparison/distribution/correlation/risk/behavioral/ranking)
- [ ] Add `target_audience` array (student/instructor/academic_advisor/admin)
- [ ] Add `query_labels[]` — every task gets at least 1 label (multi-query: N labels = N queries)

**Reference mapping:**
| Task type | granularity | explanation_strategy | target_audience |
|---|---|---|---|
| Score over time (student) | `weekly` | `trend` | `["student"]` |
| Engagement trend (student) | `weekly` | `behavioral` | `["student"]` |
| Score comparison (2 students) | `per_assessment` | `comparison` | `["instructor"]` |
| Cohort distribution | `cohort_aggregate` | `distribution` | `["instructor"]` |
| Risk segmentation | `cohort_aggregate` | `risk` | `["instructor", "academic_advisor"]` |
| Correlation analysis | `per_assessment` | `correlation` | `["instructor"]` |

**Verification:**

- [ ] Write `Backend/scripts/validateRegistry.js` — assert all 53 tasks have the 5 fields
- [ ] Run: `node scripts/validateRegistry.js` → 0 errors
- [ ] Spot-check 5 tasks across different strategy types

---

### STEP 3 — Prisma Migration + Backend Skeleton

> After Step 2. Before AI service code. Before any FE work.

- [ ] Add `AiExplanationLog` model to `Backend/prisma/schema.prisma` (CONTRACT 7)
- [ ] Run: `npx prisma migrate dev --name add_ai_explanation_log`
- [ ] Verify: `npx prisma studio` → `ai_explanation_log` table exists
- [ ] `analytics.controller.js` → add `normalizeAnalyticsResult()`, update response to `datasets` dict
- [ ] Create `Backend/src/routes/ai.routes.js` (skeleton — proxy not live yet)
- [ ] Create `Backend/src/controllers/ai.controller.js` (skeleton + DEGRADED fallback)
- [ ] Register `ai.routes.js` in `server.js`
- [ ] Add to `Backend/.env`: `AI_SERVICE_URL` + `AI_SERVICE_TIMEOUT_MS`

---

### STEP 4 — Mock Data Generation

> FE develops against mock. NOT against live API.
> Decouples FE from the most unstable layer (AI).

**Create: `Frontend/src/mock/`**

```
Frontend/src/mock/
├── analytics/
│   ├── line_chart_trend.json        ← S-B01 datasets shape + meta
│   ├── bar_chart_comparison.json
│   ├── bar_chart_histogram.json
│   ├── scatter_correlation.json
│   ├── heatmap_behavioral.json
│   ├── pie_distribution.json
│   └── table_ranked.json
├── ai/
│   ├── explanation_trend_high.json  ← full CONTRACT 3 shape, HIGH confidence
│   ├── explanation_trend_medium.json ← hedged language, based_on populated
│   ├── explanation_trend_low.json   ← warning language, data_warnings filled
│   ├── explanation_comparison.json
│   ├── explanation_risk.json
│   └── explanation_degraded.json    ← degraded:true shape
└── validation/
    ├── capability_executable.json
    ├── capability_partial.json
    └── capability_insufficient.json
```

**Mock toggle in `Frontend/src/services/analyticsApi.js`:**

```js
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
// When true: import from ../mock/  When false: fetch real API
```

**`Frontend/.env.development`:** `VITE_USE_MOCK=true`
**`Frontend/.env.production`:** `VITE_USE_MOCK=false`

Tasks:

- [ ] `mock/analytics/line_chart_trend.json`
- [ ] `mock/analytics/bar_chart_comparison.json`
- [ ] `mock/analytics/bar_chart_histogram.json`
- [ ] `mock/analytics/scatter_correlation.json`
- [ ] `mock/analytics/heatmap_behavioral.json`
- [ ] `mock/analytics/pie_distribution.json`
- [ ] `mock/analytics/table_ranked.json`
- [ ] `mock/ai/explanation_trend_high.json`
- [ ] `mock/ai/explanation_trend_medium.json`
- [ ] `mock/ai/explanation_trend_low.json`
- [ ] `mock/ai/explanation_comparison.json`
- [ ] `mock/ai/explanation_risk.json`
- [ ] `mock/ai/explanation_degraded.json`
- [ ] `mock/validation/capability_executable.json`
- [ ] `mock/validation/capability_partial.json`
- [ ] `mock/validation/capability_insufficient.json`

---

### STEP 5A — Python AI Service (Build Before FE Connects)

> Stabilize the most unstable layer first.

**Project scaffold:**

- [ ] `AIService/requirements.txt` + `.env.example`
- [ ] `AIService/config.py`
- [ ] `AIService/models/schemas.py` — ALL Pydantic models per CONTRACT 4
  - `EvidenceItem`, `Insight`, `Recommendation`, `ConfidenceInfo`, `TokenUsage`, `AIMeta`
  - `ExplanationBody`, `ExplainRequest`, `ExplainResponse`, `AnalysisContext`, `VisualizationConfig`

**Strategy layer:**

- [ ] `AIService/services/explanation_strategies/__init__.py` — `ExplanationStrategyFactory`
- [ ] `AIService/services/explanation_strategies/trend_strategy.py`
- [ ] `AIService/services/explanation_strategies/comparison_strategy.py`
- [ ] `AIService/services/explanation_strategies/risk_strategy.py`
- [ ] `AIService/services/explanation_strategies/correlation_strategy.py`
- [ ] `AIService/services/explanation_strategies/distribution_strategy.py`
- [ ] `AIService/services/explanation_strategies/behavioral_strategy.py`
- [ ] `AIService/services/explanation_strategies/ranking_strategy.py`

**Core services:**

- [ ] `AIService/services/safety_filter.py` — 5-category rules, severity flags (CONTRACT 6)
- [ ] `AIService/services/llm_client.py` — JSON mode, retry×1, httpx timeout 12s, cost_usd compute
- [ ] `AIService/services/observability.py` — `derive_confidence_sources()`, DB log insert

**Endpoint:**

- [ ] `AIService/routers/explain.py`
- [ ] `AIService/main.py`

**AI Service integration tests (MUST PASS before connecting FE):**

- [ ] `POST /explain` with `line_chart_trend` mock dataset → valid `ExplainResponse` ✓
- [ ] `POST /explain` with LOW confidence → `based_on` populated, hedged language ✓
- [ ] `POST /explain` with safety-trigger input → `safety_flags` populated ✓
- [ ] Simulate LLM timeout → DEGRADED returned (not 500) ✓
- [ ] Simulate bad LLM JSON → `ValidationError` → DEGRADED (not crash) ✓
- [ ] Node `POST /api/ai/explain` → Python → round-trip complete ✓

---

### STEP 5B — Frontend (After AI Tests Pass)

**Install:**

- [ ] `cd Frontend && npm install recharts @tanstack/react-query axios`
- [ ] Setup `QueryClientProvider` in `main.jsx`

**Chart adapters (pure functions — test with mock first):**

- [ ] `Frontend/src/chartAdapters/line.adapter.js` + verify with `line_chart_trend.json`
- [ ] `Frontend/src/chartAdapters/bar.adapter.js` + verify with comparison + histogram mocks
- [ ] `Frontend/src/chartAdapters/scatter.adapter.js`
- [ ] `Frontend/src/chartAdapters/pie.adapter.js`
- [ ] `Frontend/src/chartAdapters/heatmap.adapter.js`
- [ ] `Frontend/src/chartAdapters/table.adapter.js`

**Chart components (receive adapted data only):**

- [ ] `Frontend/src/components/charts/LineChartView.jsx`
- [ ] `Frontend/src/components/charts/BarChartView.jsx` (variant: default + histogram)
- [ ] `Frontend/src/components/charts/ScatterChartView.jsx`
- [ ] `Frontend/src/components/charts/PieChartView.jsx`
- [ ] `Frontend/src/components/charts/HeatmapView.jsx`
- [ ] `Frontend/src/components/charts/DataTableView.jsx`

**Orchestration:**

- [ ] `Frontend/src/components/ChartRenderer.jsx` — ADAPTER_MAP + CHART_MAP
- [ ] Visual test: ChartRenderer renders all 7 mock analytics shapes

**AI Panel:**

- [ ] `Frontend/src/components/AIInsightPanel.jsx`
  - [ ] Idle / Loading / Success / DEGRADED states
  - [ ] Structured output: summary, insights[], recommendations[]
  - [ ] Confidence badge (HIGH=green, MEDIUM=yellow, LOW=orange)
  - [ ] `data_warnings` block + `safety_flags` notice
  - [ ] DEGRADED banner when `response.degraded === true`
- [ ] Visual test: AIInsightPanel renders all 6 mock AI shapes

**Hooks + API:**

- [ ] `Frontend/src/hooks/useTaskRegistry.js` (TanStack Query, staleTime 10min)
- [ ] `Frontend/src/hooks/useAnalytics.js` (TanStack mutations: run + explain)
- [ ] `Frontend/src/services/analyticsApi.js` (mock toggle logic)

**Student Dashboard:**

- [ ] `StudentDashboardPage.jsx` — Section A: StatCards (avg_score, pass_rate, engagement)
- [ ] `StudentDashboardPage.jsx` — Section B: TaskSelector (student scope, dataset-filtered)
- [ ] `StudentDashboardPage.jsx` — Section C: AnalyticsWorkspace (Filter + Chart + AI panel)

---

### STEP 5C — Integration (Switch Off Mock, Connect Real APIs)

- [ ] Set `VITE_USE_MOCK=false`
- [ ] Run: PostgreSQL + Node (4000) + Python FastAPI (8000)
- [ ] Execute E2E test script (Section 10)
- [ ] Verify `ai_explanation_log` table populated after each explanation
- [ ] Verify `executionId` propagates: analytics run → AI explain → DB log

---

## 8. KEY ARCHITECTURAL DECISIONS

| Decision                  | Choice                                                    | Rationale                                                          |
| ------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------ |
| Build order               | Contracts → Registry → Prisma → Mock → AI → FE            | Most unstable layer (AI) stabilized before FE connects             |
| FE development mode       | `VITE_USE_MOCK=true` with 16 mock files                   | Decouples FE from AI instability                                   |
| Chart config              | `visualization_config` + `semantic_roles` in registry     | AI + FE read semantics from metadata, never infer from field names |
| Data transformation       | Adapter layer (`chartAdapters/`) separate from components | Pure functions, testable, zero business logic in UI                |
| Multi-query normalization | Backend `normalizeAnalyticsResult()` via `query_labels[]` | FE never sees raw `{index, data}` shape                            |
| AI prompt construction    | Strategy classes per `explanation_strategy`               | Avoids god-function; 7 focused strategies                          |
| AI output validation      | Pydantic `model_validate()` on LLM JSON                   | ValidationError → DEGRADED, never crash or serve malformed data    |
| `confidence.based_on[]`   | Derived by Python from data signals (not LLM)             | Traceability: Capability Validator → confidence → AI narrative     |
| `EvidenceItem` structured | `{metric, value, delta, comparison, context}`             | Foundation for future chart-insight click-linking                  |
| `AIMeta.cost_usd`         | Computed at response time, stored in log                  | Thesis evaluation chapter: quantitative cost metrics               |
| Safety filter             | 5-category rules, flag+severity, no auto-redact           | Redaction breaks coherence; flagging is sufficient for thesis      |
| Graceful degradation      | DEGRADED response shape (CONTRACT 3)                      | Chart NEVER blocked by AI failure                                  |
| Observability             | `AiExplanationLog` Prisma table                           | Thesis reproducibility + academic defensibility                    |

---

## 9. ENV VARS SUMMARY

```bash
# Backend/.env (additions)
AI_SERVICE_URL=http://localhost:8000
AI_SERVICE_TIMEOUT_MS=15000

# AIService/.env
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-...
LLM_MODEL=gpt-4o-mini
LLM_TEMPERATURE=0.3
LLM_MAX_TOKENS=800
PORT=8000
LOG_DIR=./logs/prompts

# Frontend/.env.development
VITE_USE_MOCK=true

# Frontend/.env.production
VITE_USE_MOCK=false
```

---

## 10. END-TO-END TEST SCRIPT (Step 5C)

```
1.  Start: PostgreSQL + Node (4000) + Python FastAPI (8000)
2.  Login as Student → select SAMPLE_OULAD dataset
3.  Section A: StatCards show avg_score, pass_rate ✓
4.  Section B: Task list loads (student scope, dataset-filtered) ✓
5.  Select S-B01 → Run Analysis
6.  LineChart renders: x=week_due, y=avg_score ✓
7.  Click "Get AI Explanation"
8.  AIInsightPanel: summary + insights[] + recommendations[] visible ✓
9.  Confidence badge = HIGH/MEDIUM/LOW ✓
10. Kill Python service → chart still works, AI panel shows DEGRADED banner ✓
11. ai_explanation_log row inserted with executionId ✓
12. MEDIUM confidence test → based_on populated, hedged language ✓
13. Safety flag trigger → safety_flags notice shown ✓
```

---

_Plan v3.0 — Final 2026-05-16 | 5-step execution order established_
_Current status: STEP 1 ✅ DONE → STEP 2 ready to begin_
