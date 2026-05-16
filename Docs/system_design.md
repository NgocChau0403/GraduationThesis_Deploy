# SOFTWARE REQUIREMENTS & SYSTEM DESIGN

## AI-Assisted Educational Data Analytics Platform

### Metadata-Driven Learning Analytics Framework

> **Version:** 4.0 | **Status:** Research-Grade Architecture | **Audience:** Dev Team / Thesis Committee

---

## 1. EXECUTIVE SUMMARY

Hệ thống là một **Metadata-Driven Educational Analytics Platform** full-stack, có khả năng:

- Import và chuẩn hóa educational dataset (OULAD và các LMS tương lai)
- Lưu trữ dữ liệu trong relational schema 8 bảng chuẩn hóa
- Thực thi analytical tasks được định nghĩa bằng metadata
- Render visualization deterministic theo task config
- Generate AI natural language explanations với ethical guardrails

**Tech Stack:**
| Layer | Technology |
|---|---|
| Frontend | React + Vite, Recharts/Chart.js, TailwindCSS |
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| AI Engine | Python FastAPI + OpenAI/Gemini API |
| ORM | Prisma |
| Queue | Bull (Redis) — _future optimization, not MVP_ |
| Deployment | Railway / Render |

**MVP Implementation Priority:**

1. End-to-end working platform
2. Metadata-driven execution
3. Normalized relational analytics
4. Deterministic visualization
5. AI-generated educational explanations

> Optimization and advanced analytical abstraction layers are **future work only.**

### Analytical Scope

The system focuses exclusively on **descriptive and diagnostic educational analytics** — summarizing observable patterns and identifying potential correlations. It does **not** perform predictive modeling, causal inference, or psychological profiling. Risk indicators in the system refer to observable behavioral and performance signals, not predictive ML outputs.

### System Boundary

This platform explicitly does NOT:

- Replace or replicate a Learning Management System (LMS)
- Perform automated grading or assessment
- Generate automated intervention recommendations
- Function as a recommendation engine
- Implement machine learning prediction models

It IS: a governed, metadata-driven analytics layer that operates on top of imported educational datasets to support instructor and student reflection.

---

## 2. OVERALL SYSTEM ARCHITECTURE

```
[CSV Upload] → [Import Layer] → [Schema Mapper] → [PostgreSQL - 8 Tables]
                                                         ↓
[Task Registry (JSON/DB)] → [Capability Validator] → [Task Executor]
                                                         ↓
                                              [SQL Analytics Engine]
                                                         ↓
                                         [Visualization Engine] + [AI Engine]
                                                         ↓
                                              [React Dashboard UI]
```

### Layer Descriptions

| #   | Layer                                  | Responsibility                                                                                                                    |
| --- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Dataset Import                         | Parse CSV, detect columns, batch insert                                                                                           |
| 2   | Schema Mapping                         | Map raw columns → canonical fields, supporting Adaptive Memory (Self-learning aliases), Custom Regex Transform, and Data Preview. |
| 3   | Relational Storage                     | PostgreSQL 8-table normalized schema                                                                                              |
| 4   | Task Metadata Engine                   | Load & serve task registry                                                                                                        |
| 5   | Capability Validator                   | Multi-layer task executability check                                                                                              |
| 6   | SQL Execution Engine                   | Execute metadata-defined analytical query templates against PostgreSQL                                                            |
| 7   | Metadata-Driven Chart Rendering Engine | Deterministically render chart components from metadata `viz_type`                                                                |
| 8   | AI Explanation Engine                  | Generate NL narrative via LLM with educational safety guardrails                                                                  |
| 9   | Role-Based Workspace                   | Student vs Instructor views                                                                                                       |
| 10  | Web UI                                 | React dashboard                                                                                                                   |

---

## 3. DATABASE ARCHITECTURE

### 3.1 Normalized Relational Schema (8 Tables)

```sql
-- Core entities
student (student_id, gender, region, highest_education, disability, age_band, ...)
course  (course_id, module_code, presentation_code, module_length, ...)
class   (class_id, course_id, year, semester, ...)
enrollment (enrollment_id, student_id, class_id, final_result,
            studied_credits, is_passed, ...)  -- [FE: is_passed]

-- Assessment
assessment      (assessment_id, course_id, type, week_due, weight, ...)
assessment_result (result_id, enrollment_id, assessment_id, score,
                   submission_date, score_normalized, pass_flag, ...)  -- [FE fields]

-- Activity
event      (event_id, activity_type, week_code, ...)
engagement (engagement_id, enrollment_id, event_id, click_count,
            week_number, log_click_score, engagement_level, ...)  -- [FE fields]
```

### 3.2 Feature Engineering — In-Table Only

All engineered fields are persisted directly inside their respective normalized tables during import/transformation. **No cross-table feature engineering. No flat table architecture. No centralized FE layer.**

**Architectural Rule:** An engineered field is only permitted if it can be computed entirely **within the same table** — no JOIN to another table is required.

| Table               | Engineered Field         | Computation Rule                                                            | Dataset Note     |
| ------------------- | ------------------------ | --------------------------------------------------------------------------- | ---------------- |
| `assessment_result` | `score_normalized`       | UCI: `score × 5`; OULAD: `score as-is`                                      | Dataset-specific |
| `assessment_result` | `pass_flag`              | `score_normalized >= 40`                                                    | Universal        |
| `enrollment`        | `registration_lead_time` | `ABS(enrollment_start_day)` WHERE `< 0`                                     | OULAD only       |
| `engagement`        | `log_click_score`        | `log(engagement_count + 1)`                                                 | OULAD only       |
| `student`           | `lifestyle_risk_score`   | `norm(alc_weekday+alc_weekend)×0.4 + norm(go_out)×0.3 + norm(5-health)×0.3` | UCI only         |
| `student`           | `support_score`          | `(school_sup + fam_sup + paid + internet) / 4`                              | UCI only         |
| `student`           | `social_balance_score`   | `norm(free_time)×0.5 - norm(go_out)×0.3 - norm(alc_weekday)×0.2`            | UCI only         |
| `student`           | `family_stability_score` | `norm(fam_rel)×0.5 + (cohabitation=T)×0.3 + norm(max_parent_edu)×0.2`       | UCI only         |
| `student`           | `disadvantage_score`     | `norm(100-imd)×0.5 + disability×0.3 + (no_formal_edu)×0.2`                  | OULAD only       |

> **Excluded from in-table FE:** `submission_delay_days` requires joining `assessment_result` with `assessment` (to get `due_day`) — this is a cross-table computation and is therefore **not stored**. It is a **Derived Metric** computed at query runtime via SQL.

> **Excluded from MVP:** Shared analytical primitives, reusable FE abstraction layers, centralized metric computation engines, precomputed analytical marts, flat analytics tables, and centralized feature stores are explicitly out of scope for MVP.

### 3.3 Feature Taxonomy

The system distinguishes four clearly separated categories of data representation to avoid conceptual ambiguity:

| Category                      | Definition                                                     | Where it lives        | Examples                                           |
| ----------------------------- | -------------------------------------------------------------- | --------------------- | -------------------------------------------------- |
| **Raw Field**                 | Value imported directly from source dataset, no transformation | DB column             | `score`, `click_count`, `final_result`             |
| **Engineered Feature**        | In-table computed field, persisted at ETL time                 | DB column (FE-tagged) | `score_normalized`, `log_click_score`, `pass_flag` |
| **Derived Metric**            | Aggregated or computed in SQL query at runtime, not stored     | Query result only     | `avg_score`, `pass_rate`, `total_clicks`           |
| **Analytical Interpretation** | Narrative framing generated by the AI explanation engine       | NL text response      | _"Engagement declined during weeks 5–7"_           |

> This taxonomy ensures that FE fields, SQL metrics, and AI narratives are never conflated in architecture, implementation, or academic defense.

### 3.4 Data Ingestion & Human-in-the-Loop Mapping

The system employs a **Human-in-the-Loop (HITL) ETL pipeline** designed for "commercial-grade" data onboarding.
Key architectural mechanisms include:

| Mechanism                  | Description                                                                                                                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Heuristic Auto-Suggest** | Uses multi-factor scoring (Name match, Type compatibility, Sample Pattern analysis) to automatically suggest raw-to-canonical mappings.                                                             |
| **Adaptive Memory**        | A self-learning metadata repository (`learnedAliases.json`) that records user's manual mapping overrides and automatically applies them with high confidence (0.96) in future uploads.              |
| **Extensible Transforms**  | Supports both predefined transforms (e.g., `normalize_gender`, `cast_int`) and user-defined `regex_extract` for extracting data patterns directly from the UI without code changes.                 |
| **Data Preview**           | A dry-run transformation endpoint that allows users to preview 5 fully-transformed canonical rows _before_ committing the mapping to the database, ensuring high trust and preventing ETL failures. |
| **Shift-Left Validation**  | Strict canonical schema validation running prior to database insertion, blocking invalid entity scopes or type mismatches.                                                                          |

### 3.5 Why Relational Database?

The choice of PostgreSQL as the primary data store is architecturally deliberate, not incidental:

| Justification                    | Rationale                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| **Relational integrity**         | Educational data has strong FK relationships: `student → enrollment → assessment_result` |
| **Aggregation-oriented queries** | All analytical tasks use GROUP BY, AVG, COUNT — SQL is the natural fit                   |
| **ACID compliance**              | Ensures data consistency during multi-table import transactions                          |
| **Schema enforcement**           | Canonical 8-table schema prevents data drift across dataset imports                      |
| **Mature tooling**               | Prisma ORM, pg driver, and pgAdmin provide full developer toolchain                      |

> A graph database would over-complicate traversal for aggregation tasks. A document store (NoSQL) would sacrifice relational integrity. A data warehouse is unnecessary at thesis MVP scale. Relational SQL is the optimal choice for this domain.

---

## 4. ANALYTICAL TASK METADATA ARCHITECTURE

The task registry constitutes a **declarative analytical specification** — a governed collection of metadata-defined analytical tasks that drives execution, validation, and visualization without requiring changes to application logic. The registry functions as:

- A **metadata-driven analytical execution** layer: tasks are loaded and executed dynamically at runtime
- A **declarative analytical specification**: all analytical intent is expressed in metadata, not imperative code
- A **governed analytics framework**: task additions and modifications are subject to governance rules (Section 12)

### Why Metadata-Driven?

The metadata-driven approach is the core architectural contribution of this system. The key arguments for this design:

| Alternative Approach          | Problem                                             | Metadata-Driven Advantage                                        |
| ----------------------------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| Hardcoded SQL in service code | Adding a new task requires code change + deployment | New task = add one JSON record, zero code change                 |
| Per-task API endpoints        | N tasks → N endpoints, unmaintainable               | Single `/analytics/run` endpoint handles all tasks               |
| Static chart assignments      | Changing visualization requires frontend code edit  | `viz_type` in metadata drives rendering automatically            |
| Ad-hoc AI prompts             | Inconsistent explanations, hard to govern           | `ai_prompt_hint` + `explanation_type` standardize all prompts    |
| Manual capability checks      | Each task needs custom validation code              | Capability Validator reads `dataset_compatibility` from metadata |

> A metadata-driven architecture improves **extensibility** (add tasks without touching code), **consistency** (all tasks follow the same execution contract), **governance** (centralized control of analytical behavior), and **explainability** (all analytical logic is human-readable in the registry).

### 4.1 Task Registry Schema

Each metadata-defined analytical task is stored as a JSON record in the database or a seed JSON file. The full field reference is:

| Field                   | Type     | Description                                                  |
| ----------------------- | -------- | ------------------------------------------------------------ |
| `task_id`               | string   | Unique identifier (e.g., `T001`)                             |
| `task_name`             | string   | Human-readable display name                                  |
| `scope`                 | enum     | `single_student` \| `comparison` \| `cohort` \| `instructor` |
| `description`           | string   | Purpose of the analytical task                               |
| `source_tables`         | string[] | Required normalized DB tables                                |
| `key_fields`            | string[] | Key DB columns used in the query                             |
| `uses_fe`               | boolean  | Whether task uses engineered fields                          |
| `fe_fields`             | string[] | Which engineered fields are consumed                         |
| `visualization`         | string   | Analytical visualization concept (intent)                    |
| `data_concept`          | string   | Educational framing of the analysis                          |
| `analysis_type`         | string   | Analytical method applied                                    |
| `viz_type`              | string   | Frontend chart component to render                           |
| `insight_type`          | string   | Nature of the output insight                                 |
| `explanation_type`      | string   | AI narrative style                                           |
| `dataset_compatibility` | object   | Structural/sufficiency requirements                          |
| `ai_prompt_hint`        | string   | Guidance for AI explanation framing                          |
| `actionable_question`   | string   | The educational question being answered                      |
| `sql_query`             | string   | Parameterized analytical query template                      |
| `roles`                 | string[] | Authorized roles: `student`, `instructor`                    |
| `filters`               | string[] | Allowed runtime filter parameters                            |

Example task definition:

```json
{
  "task_id": "T001",
  "task_name": "Score Progression Over Time",
  "scope": "single_student",
  "description": "Tracks normalized assessment scores across weeks",
  "source_tables": ["assessment_result", "assessment"],
  "key_fields": ["score_normalized", "week_due", "assessment_type"],
  "uses_fe": true,
  "fe_fields": ["score_normalized"],
  "analysis_type": "trend_analysis",
  "visualization": "trend",
  "viz_type": "line_chart",
  "data_concept": "Learning performance trajectory",
  "insight_type": "temporal",
  "explanation_type": "descriptive",
  "dataset_compatibility": {
    "required_tables": ["assessment_result", "assessment"],
    "required_fields": ["score", "week_due"],
    "min_records": 2,
    "min_temporal_points": 2
  },
  "ai_prompt_hint": "Focus on score trend direction and identify plateaus or drops",
  "actionable_question": "Is the student improving over time?",
  "sql_query": "SELECT a.week_due, AVG(ar.score_normalized) AS avg_score FROM assessment_result ar JOIN assessment a ON ar.assessment_id = a.assessment_id WHERE ar.enrollment_id = :enrollmentId GROUP BY a.week_due ORDER BY a.week_due",
  "roles": ["student", "instructor"],
  "filters": ["enrollment_id", "course_id", "date_range"]
}
```

### 4.2 Visualization Metadata Semantics

The task metadata uses **two distinct fields** to separate analytical intent from frontend rendering:

| Field           | Meaning                                                                           | Examples                                                           |
| --------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `visualization` | Analytical visualization **intention/concept** — what the analyst wants to convey | `trend`, `comparison`, `distribution`, `correlation`, `behavioral` |
| `viz_type`      | Actual **frontend chart component** rendered by the UI                            | `line_chart`, `bar_chart`, `scatter_plot`, `heatmap`, `histogram`  |

This separation ensures the frontend rendering logic remains deterministic:

- **AI does NOT choose the primary chart.** The frontend renders based on metadata-defined `viz_type`.
- AI may explain _why_ the chosen chart type is analytically appropriate and may suggest alternatives.
- `visualization` is used to guide AI explanation framing and capability validation logic.

### 4.3 Task Registry — Scope Categories

| Scope            | Description                            |
| ---------------- | -------------------------------------- |
| `single_student` | Analysis for a single student          |
| `comparison`     | Side-by-side analysis of 2+ students   |
| `cohort`         | Analysis across an entire class/cohort |
| `instructor`     | Instructor-level aggregated view       |

### 4.4 Analysis Type → Visualization Mapping (Deterministic)

| Analysis Type           | Visualization Concept | Default viz_type |
| ----------------------- | --------------------- | ---------------- |
| `trend_analysis`        | trend                 | `line_chart`     |
| `distribution_analysis` | distribution          | `histogram`      |
| `comparison_analysis`   | comparison            | `bar_chart`      |
| `correlation_analysis`  | correlation           | `scatter_plot`   |
| `behavioral_analysis`   | behavioral            | `heatmap`        |
| `segmentation_analysis` | distribution          | `pie_chart`      |
| `risk_analysis`         | comparison            | `table`          |

---

## 5. CAPABILITY-BASED TASK VALIDATION ENGINE

### 5.1 Multi-Layer Validation Architecture

The capability validator checks each task through **four sequential validation layers** before marking it executable:

#### Layer A — Structural Capability

Validates that the required physical infrastructure exists in the current dataset:

- Required tables exist in the PostgreSQL schema
- Required fields exist in those tables

#### Layer B — Semantic Capability

Validates that computed analytical fields are present:

- Required feature-engineered fields exist (e.g., `score_normalized`, `engagement_level`)
- Required normalized metrics exist in the appropriate tables

#### Layer C — Analytical Capability

Validates that the dataset has sufficient analytical dimensions for the task's analysis type:

- **Trend analysis** requires a time dimension (e.g., `week_due`, `activity_week`)
- **Comparison analysis** requires multiple distinct entities or groups (e.g., 2+ students, 2+ cohorts)
- **Correlation analysis** requires at least two independent measurable variables
- **Distribution analysis** requires sufficient spread of values across grouping dimensions

#### Layer D — Data Sufficiency Capability

Validates that the dataset meets minimum quantitative thresholds:

- Minimum record count per table
- Minimum number of assessments
- Minimum number of students (for cohort/comparison tasks)
- Minimum temporal points (for trend tasks)

### 5.2 Validation Output Schema

```json
{
  "task_id": "T001",
  "executable": true,
  "status": "executable",
  "warnings": [],
  "missing_requirements": [],
  "layer_results": {
    "structural": "pass",
    "semantic": "pass",
    "analytical": "pass",
    "data_sufficiency": "pass"
  }
}
```

### 5.3 Task Status States

| Status              | Meaning                                                         |
| ------------------- | --------------------------------------------------------------- |
| `executable`        | All four validation layers passed                               |
| `partial`           | Some fields missing; degraded output possible                   |
| `unsupported`       | Required tables or fields missing (Structural/Semantic failure) |
| `insufficient_data` | Below minimum thresholds (Data Sufficiency failure)             |

### 5.4 Validation Flow

```
For each task in registry:
  Layer A → Check required_tables exist in schema
  Layer A → Check required_fields exist in those tables
          ↓ (pass)
  Layer B → Check fe_fields exist in normalized tables
  Layer B → Check normalized metrics are populated
          ↓ (pass)
  Layer C → Check temporal dimensions (if trend task)
  Layer C → Check grouping dimensions (if comparison/cohort task)
  Layer C → Check variable count (if correlation task)
          ↓ (pass)
  Layer D → Run COUNT queries against min_records thresholds
  Layer D → Validate min_students, min_temporal_points
          ↓
  Return: { executable, status, warnings, missing_requirements }
```

### 5.5 Dataset Capability Profile

Following validation, the system generates a **Dataset Capability Profile** — a summary of what analytical dimensions the uploaded dataset can support. This profile is used to pre-filter the task registry before presenting tasks to the user.

```json
{
  "dataset_id": "oulad_001",
  "supported_dimensions": ["time", "assessment", "engagement"],
  "supported_scopes": ["single_student", "cohort"],
  "supported_analysis_types": [
    "trend_analysis",
    "distribution_analysis",
    "comparison_analysis"
  ]
}
```

The capability profile is computed once after dataset import and cached. Tasks incompatible with the profile are marked `unsupported` and hidden or grayed out in the dashboard UI.

### 5.6 Analytical Confidence Score

When a task is marked `executable` but data conditions are marginal (e.g., minimum thresholds barely met), the system assigns a **confidence level** to the analytical output:

| Confidence | Condition                                             | AI Behavior                                                            |
| ---------- | ----------------------------------------------------- | ---------------------------------------------------------------------- |
| `HIGH`     | All thresholds comfortably exceeded                   | AI explains findings directly                                          |
| `MEDIUM`   | Thresholds met, but limited data range                | AI uses hedged language: _"based on available data..."_                |
| `LOW`      | Thresholds barely met (e.g., 2 data points for trend) | AI explicitly warns: _"Insufficient data for reliable trend analysis"_ |

The confidence score is included in the analytics execution response and passed to the AI explanation prompt:

```json
{
  "task_id": "T001",
  "status": "executable",
  "confidence": "MEDIUM",
  "confidence_reason": "Only 3 temporal data points available; trend interpretation may be limited"
}
```

> This mechanism prevents AI overclaiming on sparse data and makes the system's epistemic boundaries explicit — a key requirement for ethical educational analytics.

---

## 6. BACKEND ARCHITECTURE

### 6.1 Module Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── canonicalFields.js            # Canonical field definitions
│   │   ├── canonicalFieldAliases.js      # Dataset-specific column alias map
│   │   ├── datasetRules/                 # Per-dataset mapping rules (UCI, OULAD)
│   │   ├── surrogateKey.js               # Surrogate key generation strategies
│   │   └── taskRegistry.json             # Task registry seed file [TODO]
│   ├── services/
│   │   ├── runImportPipeline.service.js  # Orchestrates 3-phase import
│   │   ├── mappingTransform.service.js   # Raw → canonical 8-entity transform + FE
│   │   ├── mappingSuggest.service.js     # Auto-suggest column mappings
│   │   ├── mappingValidation.service.js  # Validate mapping completeness
│   │   ├── entityInsert.service.js       # Batch insert 8 normalized entities
│   │   ├── enrollmentFeatures.service.js # Student in-table FE computation
│   │   ├── taskRegistry.service.js       # Load & query task metadata [TODO]
│   │   ├── capabilityValidator.service.js # Multi-layer executability check [TODO]
│   │   ├── sqlExecution.service.js       # Parameterized query runner [TODO]
│   │   ├── visualization.service.js      # Chart config builder [TODO]
│   │   └── aiExplanation.service.js      # LLM prompt builder & caller [TODO]
│   ├── routes/
│   │   ├── import.routes.js
│   │   ├── tasks.routes.js               [TODO]
│   │   ├── analytics.routes.js           [TODO]
│   │   └── ai.routes.js                  [TODO]
│   └── prisma/
│       └── schema.prisma
```

### 6.2 Key API Endpoints

```
POST /api/import/upload              # Upload CSV dataset
POST /api/import/mapping             # Submit column mapping
GET  /api/import/status/:jobId       # Check import progress

GET  /api/tasks                      # Get all task registry entries
GET  /api/tasks/validate/:datasetId  # Run capability validation
GET  /api/tasks/:taskId              # Get single task metadata

POST /api/analytics/run              # Execute analytical task
# Body: { taskId, params: { enrollmentId?, cohortId?, filters? } }

GET  /api/visualization/:taskId      # Get chart config
POST /api/ai/explain                 # Generate AI explanation
# Body: { taskId, sqlResult, studentContext }

GET  /api/students                   # List students
GET  /api/students/:id/summary       # Student summary stats
GET  /api/cohorts                    # List cohorts/classes
```

---

## 7. SQL ANALYTICS EXECUTION ENGINE

### 7.1 Architecture Overview

The SQL analytics engine executes **metadata-defined analytical query templates** stored in the task registry. Each task carries a parameterized SQL template that is dynamically loaded at runtime, parameters are safely injected, and the query is executed directly against PostgreSQL. This design ensures:

- Query logic is fully auditable via the task registry
- No hardcoded query logic in application service code
- Parameter injection is always safe and type-validated

### 7.2 Execution Flow

```
1. Receive: { taskId, params }
2. Load task metadata from registry
3. Fetch parameterized analytical query template from metadata (sql_query field)
4. Inject parameters (enrollmentId, cohortId, filters, date_range)
5. Execute via Prisma $queryRaw with typed parameters
6. Validate result schema matches expected output
7. Return: { data: [], meta: { rowCount, executionTime } }
```

### 7.3 Parameter Injection Strategy

```js
// Safe parameterized execution via Prisma tagged template
const result = await prisma.$queryRaw`
  SELECT a.week_due, AVG(ar.score_normalized) AS avg_score
  FROM assessment_result ar
  JOIN assessment a ON ar.assessment_id = a.assessment_id
  WHERE ar.enrollment_id = ${params.enrollmentId}
  GROUP BY a.week_due
  ORDER BY a.week_due
`;

// For dynamic task-defined analytical queries loaded from metadata:
// Parameters are bound using typed placeholders — never string concatenation
const query = buildSafeQuery(task.sql_query, sanitize(params));
```

> **Security Principle:** All task-defined analytical queries use parameterized execution only. No unsafe dynamic SQL string concatenation is permitted at any layer.

### 7.4 Supported Analysis Modes

| Mode           | Parameters                 |
| -------------- | -------------------------- |
| Single Student | `enrollmentId`             |
| Cohort         | `classId` or `courseId`    |
| Comparison     | `enrollmentIds[]` (array)  |
| Instructor     | `instructorId`, `courseId` |

### 7.5 Query Execution Strategy

The current prototype uses **on-demand SQL execution** — queries are run at request time against the live PostgreSQL database. This is an intentional MVP design choice that prioritizes implementation simplicity and data freshness over performance optimization.

| Strategy              | Current MVP                         | Future Optimization                         |
| --------------------- | ----------------------------------- | ------------------------------------------- |
| Execution model       | On-demand, per request              | Scheduled batch aggregation                 |
| Caching               | None (stateless)                    | Redis result caching with TTL               |
| Pre-aggregation       | None                                | Materialized analytical views               |
| Feature recomputation | At import time (FE fields)          | Incremental update on new data              |
| Query scope           | Real-time against normalized tables | Potential read replicas for heavy analytics |

> For the OULAD dataset at thesis scale (~30,000 students, ~10M engagement records), on-demand SQL with indexed foreign keys is sufficient. Future production deployment with multi-institution data may require the optimization strategies listed above.

---

## 8. AI EXPLANATION & NARRATIVE ENGINE

### 8.0 Deterministic Analytics Principle

> **Core Principle:** All analytical findings in this system originate from deterministic SQL execution against the normalized relational database. The LLM layer does NOT independently discover patterns, compute metrics, or run analysis.

The AI explanation engine is strictly a **narrative generation layer** operating on pre-computed SQL results. Its responsibilities are limited to:

| Responsibility                       | Description                                                 |
| ------------------------------------ | ----------------------------------------------------------- |
| Narrative generation                 | Translate structured query results into readable prose      |
| Educational interpretation           | Frame findings in a pedagogically meaningful context        |
| Explanation framing                  | Apply the task's `explanation_type` style                   |
| Chart suitability explanation        | Explain why the metadata-selected `viz_type` is appropriate |
| Alternative visualization suggestion | Optionally propose alternative chart types (advisory only)  |

The AI does NOT: run queries, select chart types, compute statistics, or make deterministic claims beyond what the data shows.

### 8.1 Architecture

```
Python FastAPI Microservice (separate service)
├── /explain endpoint
├── ExplanationStrategyFactory (trend, comparison, risk, etc.)
├── LLM Client (OpenAI API, JSON Mode)
├── Safety Filter (5-category rule evaluation)
├── Observability Logger (AiExplanationLog)
└── Pydantic Validation (ExplainResponse schema)
```

### 8.2 Prompt Construction (Strategy Pattern)

The prompt construction uses a Strategy Pattern driven by the `explanation_strategy` metadata field, avoiding a monolithic "god-function" prompt builder.

```python
class ExplanationStrategy(ABC):
    @abstractmethod
    def build_prompt(self, context: AnalysisContext, data: dict) -> str: pass

class TrendStrategy(ExplanationStrategy):
    def build_prompt(self, context, data):
        # Uses context.granularity (e.g., "weekly") to adjust tone
        return f"""
        You are an educational data analyst writing for {context.target_audience}.
        The data granularity is {context.granularity}.
        Analyze the following trend data: {data}
        ...
        """
```

### 8.3 Explanation Strategies

The explanation tone and structural approach are governed by the `explanation_strategy` field in the task metadata.

| Strategy Type  | Used for                                                 |
| -------------- | -------------------------------------------------------- |
| `trend`        | Temporal progression and changes over time               |
| `comparison`   | Side-by-side evaluation of students or groups            |
| `distribution` | Analyzing spread across categorical or continuous fields |
| `correlation`  | Identifying associations between numeric variables       |
| `risk`         | Communicating evidence-grounded warning indicators       |
| `behavioral`   | Explaining engagement and activity patterns              |
| `ranking`      | Contextualizing ordered lists and percentiles            |

### 8.4 AI Safety & Educational Interpretation Constraints

The AI explanation engine operates under strict guardrails to ensure ethical, evidence-grounded, and hallucination-resistant educational analytics.

#### The AI MUST:

- Describe only **observable patterns** present in the data
- Summarize **analytical findings** as reported by the query results
- Discuss **educational implications cautiously**, using hedged language
- Provide **evidence-grounded interpretations** tied to specific data points

#### The AI MUST NOT:

- Make **unsupported psychological assumptions** about student character or mindset
- Make **personality judgments** based on behavioral data
- Make **deterministic predictions** about future outcomes
- Claim **unsupported causality** between correlated variables

#### Examples of Disallowed Explanations:

| ❌ Disallowed                          | Reason                                     |
| -------------------------------------- | ------------------------------------------ |
| "The student is lazy"                  | Personality judgment not supported by data |
| "The student lacks motivation"         | Psychological assumption                   |
| "The student will fail"                | Deterministic prediction                   |
| "Low engagement caused the poor score" | Unsupported causality claim                |

#### Examples of Acceptable Explanations:

| ✅ Acceptable                                                            | Reason                |
| ------------------------------------------------------------------------ | --------------------- |
| "Lower engagement activity was observed during weeks 5–7"                | Observable pattern    |
| "Assessment performance declined after mid-semester"                     | Factual summary       |
| "Submission delays were recorded in 3 of 5 assessments"                  | Data-grounded finding |
| "The data suggests a potential association between engagement and score" | Cautious framing      |

> **Rationale:** These constraints are necessary to reduce hallucination risk, prevent misuse of automated insights in high-stakes educational contexts, and ensure the platform upholds ethical standards for student data analytics.

### 8.5 Explainability Pipeline & Traceability

Every AI-generated explanation in the system is fully traceable through a deterministic provenance chain, recorded in the `AiExplanationLog` table:

```
Task Registry (task_id, sql_query, explanation_strategy, analysis_context)
       ↓
Capability Validator (confirms data conditions, assigns layer confidence)
       ↓
SQL Execution Engine (executes parameterized query, normalizes datasets via query_labels)
       ↓
AI Strategy Factory (constructs strategy-specific prompt, derives confidence.based_on)
       ↓
LLM (generates structured JSON output in JSON mode)
       ↓
Pydantic Validator (enforces ExplainResponse schema: summary, insights, warnings)
       ↓
AIInsightPanel (Renders structured narrative + EvidenceItem linking)
```

This means every explanation can be audited by tracing back to:

- The **task metadata** that defined the analytical intent and strategy
- The **SQL query** that produced the underlying datasets
- The **safety filter flags** and **Pydantic schema validation**
- The **confidence score** and specific reasons (`based_on`) reflecting data quality

> AI explanations are grounded exclusively in SQL outputs, validated metrics, and metadata constraints. Execution metadata (latency, token usage, cost) is logged for thesis evaluation and reproducibility.

---

## 9. FRONTEND ARCHITECTURE

### 9.1 Module Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── ImportPage.jsx              # Dataset upload & mapping
│   │   ├── StudentDashboard.jsx        # Student workspace
│   │   ├── InstructorDashboard.jsx     # Instructor workspace
│   │   └── AnalyticsWorkspace.jsx      # Dynamic task execution UI
│   ├── components/
│   │   ├── TaskSelector.jsx            # Browse & select analytical tasks
│   │   ├── TaskCard.jsx                # Single task with status badge
│   │   ├── ChartRenderer.jsx           # Dynamic chart from metadata viz_type
│   │   ├── AIInsightPanel.jsx          # Display AI explanation
│   │   ├── FilterPanel.jsx             # Dynamic filter controls
│   │   ├── StudentPicker.jsx           # Select student(s) for analysis
│   │   ├── StudentComparePicker.jsx    # Multi-student selection for comparison
│   │   └── CapabilityBadge.jsx         # executable/partial/unsupported indicator
│   ├── hooks/
│   │   ├── useTaskRegistry.js
│   │   ├── useAnalytics.js
│   │   └── useCapability.js
│   └── services/
│       └── api.js
```

### 9.2 Dynamic Chart Rendering (Adapter Pattern)

The frontend uses an Adapter layer to decouple raw analytical data from charting libraries, driven by the `visualization_config` metadata.

```jsx
// Chart adapters normalize SQL rows into Recharts-compatible structures
const ADAPTER_MAP = {
  line_chart: lineAdapter,
  bar_chart: barAdapter,
  // ...
};

const CHART_MAP = {
  line_chart: LineChartView,
  bar_chart: BarChartView,
  // ...
};

export default function ChartRenderer({ taskMeta, datasets }) {
  // 1. Semantic mapping driven by visualization_config
  const { viz_type, semantic_roles } = taskMeta.visualization_config;

  // 2. Data transformation
  const adapter = ADAPTER_MAP[viz_type];
  const chartData = adapter(datasets, semantic_roles);

  // 3. Deterministic rendering
  const ChartComponent = CHART_MAP[viz_type];
  return (
    <ChartComponent data={chartData} config={taskMeta.visualization_config} />
  );
}
```

> **Key Principle:** The frontend rendering is fully decoupled from SQL logic via the Adapter Pattern and semantic metadata (`semantic_roles`). AI does not determine the chart type; it is fully determined by the registry metadata.

### 9.3 Role-Based Dashboard Architecture

#### Student Dashboard

**A. Basic Statistics (Always Displayed)**

- GPA / overall performance summary
- Pass rate across all assessments
- Engagement summary (total clicks, average engagement level)

**B. Advanced Analysis Tasks (On-Demand)**

- List of executable metadata-driven analytical tasks for the student's enrollment
- Student selects a task → filters → runs analysis
- Results rendered with deterministic chart + AI explanation

---

#### Instructor Dashboard

**A. Basic Cohort Statistics (Always Displayed)**

- Cohort-level pass rate, average score, engagement distribution
- Risk distribution summary (count of at-risk students)

**B. Single Student Deep Dive**

- Select one student from the cohort
- Run detailed single-student analysis tasks (T001–T006 range)
- View score progression, engagement trend, submission behavior, risk indicators

**C. Student Comparison Workspace**

- Select two or more students via `StudentComparePicker`
- Run comparison-scope tasks (T012–T014 range)
- Side-by-side score comparison, engagement comparison, submission behavior comparison

**D. Cohort / Group Analytics**

- Whole-class analysis tasks (T007–T011, T015–T016 range)
- Engagement distribution across class
- Risk segmentation (at-risk identification)
- Performance trends over time
- Cohort behavior analysis by assessment type

---

## 10. ANALYTICAL WORKSPACE EXECUTION FLOW

```
User selects Task
      ↓
System checks Capability Status (4-layer validation result)
      ↓ (if executable or partial)
User sets Filters (student, cohort, date range)
      ↓
POST /api/analytics/run { taskId, params }
      ↓
Backend: load parameterized analytical query template from task metadata
      → inject parameters safely → execute against PostgreSQL
      ↓
Return { data, meta }
      ↓
Frontend: ChartRenderer renders chart component mapped to viz_type
      ↓
POST /api/ai/explain { taskId, data, context }
      ↓
AIInsightPanel displays NL explanation (within safety guardrails)
```

---

## 11. TASK REGISTRY GOVERNANCE & METADATA INTEGRITY

The task registry is not merely a static configuration file. It functions as:

- The **analytical knowledge base** encoding all supported analytical tasks
- The **metadata-driven orchestration layer** governing task execution
- A **governed analytics framework** with enforced consistency rules

### 11.1 Metadata Validation Rules

Before a task is accepted into the registry, it must pass:

| Validation Area              | Rule                                                                                                                                                                                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Required fields completeness | `task_id`, `task_name`, `scope`, `analysis_type`, `visualization_config` (with `semantic_roles`), `analysis_context`, `explanation_strategy`, `target_audience`, `query_labels`, `sql_query`, `roles`, `dataset_compatibility` must all be present |
| Visualization consistency    | `visualization_config.viz_type` must be compatible with the analytical intent (see Section 11.2)                                                                                                                                                   |
| SQL template validity        | `sql_query` must contain named parameter placeholders (`:paramName` format), not literal values                                                                                                                                                    |
| Role compatibility           | `scope` must align with `roles` (e.g., `cohort` scope must include `admin` role)                                                                                                                                                                   |

### 11.2 Visualization Integrity Rules

Visualization assignments must satisfy both type compatibility and analytical dimension requirements:

| visualization (intent) | Required Dimension                                        | Permitted viz_type       | Not Permitted             |
| ---------------------- | --------------------------------------------------------- | ------------------------ | ------------------------- |
| `trend`                | Temporal field (e.g., `week_due`, `activity_week`)        | `line_chart`             | `pie_chart`, `histogram`  |
| `comparison`           | Grouping field (e.g., `enrollment_id`, `assessment_type`) | `bar_chart`, `table`     | `pie_chart`, `line_chart` |
| `distribution`         | Categorical or continuous field                           | `histogram`, `pie_chart` | `scatter_plot`, `heatmap` |
| `correlation`          | ≥2 numerical variables                                    | `scatter_plot`           | `pie_chart`, `bar_chart`  |
| `behavioral`           | Activity dimension                                        | `heatmap`, `bar_chart`   | `pie_chart`               |

> **pie_chart Constraint:** `pie_chart` is only permitted when the number of distinct categories is ≤ 5. For distributions with > 5 categories, `histogram` or `bar_chart` must be used instead.

### 11.3 Query Safety Validation

All task-defined analytical queries in the registry must comply with:

- **Parameterized execution only** — no literal student IDs, class IDs, or dates embedded in templates
- **No unsafe dynamic SQL concatenation** — templates use named placeholders (`:enrollmentId`, `:classId`)
- **Allowlisted parameter names** — parameter names must match declared `filters` field in the task definition

### 11.4 Task Versioning

Tasks may be versioned to support evolution without breaking existing dashboard configurations:

| Version   | Description                                    |
| --------- | ---------------------------------------------- |
| `T001 v1` | Initial single-student score progression query |
| `T001 v2` | Extended with submission delay context         |

```json
{
  "task_id": "T001",
  "version": "v2",
  "supersedes": "T001-v1",
  "change_note": "Added submission_delay_days to output"
}
```

---

## 12. DATA IMPORT & SCHEMA MAPPING PIPELINE

The import pipeline transforms source educational datasets — regardless of origin (UCI, OULAD, or future LMS exports) — into the standardized 8-table normalized schema. This cross-dataset normalization capability is a core architectural property of the system.

### Stage A — Dataset Import

```
1. User uploads one or more CSV files
2. System parses file headers and detects column structure
3. System performs schema inspection: infers data types, detects nulls
```

### Stage B — Schema Mapping

```
4. System proposes auto-mapping: source_column → canonical_field
   (e.g., "id_student" → student_id, "score" → assessment_result.score)
5. User reviews, confirms, or corrects the proposed mapping
6. System validates mapping completeness against canonical schema requirements
```

> **Cross-Dataset Support:** Different source datasets use different column naming conventions. The schema mapping layer abstracts this variation, enabling the same normalized schema to receive data from UCI, OULAD, or any future LMS export format.

### Stage C — Feature Engineering Transformation

```
7. In-table engineered fields are computed during transformation:
   - enrollment.registration_lead_time (ABS(enrollment_start_day) WHERE < 0)
   - engagement.log_click_score      (log(engagement_count + 1))
   - assessment_result.score_normalized (dataset-specific formula)
   - assessment_result.pass_flag     (score_normalized >= 40)
   - student.lifestyle_risk_score    (UCI only — demographic composite)
   - student.support_score           (UCI only — support access index)
   - student.family_stability_score  (UCI only — family context composite)
   - student.social_balance_score    (UCI only — social activity balance)
   - student.disadvantage_score      (OULAD only — deprivation composite)

Note: submission_delay_days is NOT computed at ETL time.
      It requires JOIN between assessment_result and assessment tables.
      It is a Derived Metric — computed at runtime via SQL queries.
```

### Stage D — Data Validation

```
8. Datatype validation: confirm field types match canonical schema
9. Missing value validation: flag required fields with null values
10. Referential integrity checks: verify FK relationships
    (e.g., every assessment_result references a valid enrollment_id)
```

### Stage E — Database Loading

```
11. Synchronous batch insert: insert all 8 normalized tables in topological order
    (course → class → student → enrollment → assessment → assessment_result → event → engagement)
12. Capability validation runs automatically post-import (4-layer check)   [Phase 2]
13. Dataset Capability Profile is computed and cached                       [Phase 2]
14. Dashboard unlocks all executable tasks                                  [Phase 2]
```

---

## 13. RESEARCH CONTRIBUTIONS

This system makes the following original research contributions in the domain of educational data analytics:

| #   | Contribution                                                         | Description                                                                                                                                                                                         |
| --- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Metadata-Driven Educational Analytics Framework**                  | A declarative task registry architecture where analytical tasks are fully specified as metadata, enabling schema-agnostic execution across multiple educational datasets                            |
| 2   | **Capability-Based Analytical Task Validation Architecture**         | A four-layer validation engine (Structural → Semantic → Analytical → Data Sufficiency) that determines task executability per dataset without manual configuration                                  |
| 3   | **Deterministic Visualization Orchestration for Learning Analytics** | A metadata-governed chart rendering engine where visualization type is fully determined by task metadata, eliminating ambiguity in analytical output presentation                                   |
| 4   | **AI-Assisted Educational Narrative Generation with Guardrails**     | An LLM integration layer constrained by the Deterministic Analytics Principle, which separates SQL-computed findings from AI-generated narrative while enforcing ethical interpretation constraints |
| 5   | **Cross-Dataset Normalized Schema Mapping Architecture**             | A schema mapping pipeline that transforms heterogeneous educational datasets (UCI, OULAD, and future LMS exports) into a unified 8-table normalized relational schema                               |

---

## 14. ANALYTICAL LIMITATIONS

This section explicitly acknowledges the inherent limitations of the system's analytical approach. Transparency about limitations is a hallmark of rigorous academic research.

### 14.1 Behavioral Proxy Limitations

| Behavioral Signal                  | What it measures               | What it does NOT measure                                    |
| ---------------------------------- | ------------------------------ | ----------------------------------------------------------- |
| `click_count` / `engagement_level` | Platform interaction frequency | Depth of learning, comprehension, or cognitive effort       |
| `submission_delay_days`            | Submission timing behavior     | Reason for delay (workload, difficulty, life circumstances) |
| `score_normalized`                 | Assessment performance         | True knowledge acquisition or long-term retention           |
| `final_result`                     | Course outcome                 | Learning quality or skill transferability                   |

### 14.2 Analytical Scope Limitations

- **Correlation ≠ Causation:** The system may identify associations between engagement and performance, but does not establish causal relationships.
- **Inactivity ≠ Disengagement:** Low platform activity may reflect offline studying, personal circumstances, or technical access issues — not necessarily academic disengagement.
- **Risk signals ≠ Predictions:** At-risk indicators (T004, T010) are based on observable behavioral thresholds, not predictive ML models. They signal patterns that warrant attention, not deterministic outcomes.
- **Dataset-specific generalizability:** Findings derived from OULAD data may not generalize to other institutional contexts without re-validation.

### 14.3 System Scope Statement

> _"The system provides behavioral and performance analytics to support educational reflection and decision-making. It does not constitute psychological diagnosis, academic prediction, or automated intervention. All analytical outputs should be interpreted by qualified educators in context."_

---

## 15. DEVELOPMENT ROADMAP

### Phase 1 — Foundation (Weeks 1–3)

- [x] PostgreSQL schema setup (8 tables + in-table engineered fields)
- [x] Prisma schema & migrations
- [x] CSV import pipeline (parse → map → insert → FE computation)
- [x] Task registry JSON structure + seed data
- [x] Basic Express API scaffold

### Phase 2 — Analytics Core (Weeks 4–6)

- [x] Multi-layer capability validator engine (Structural → Semantic → Analytical → Data Sufficiency)
- [x] SQL execution engine with parameterized analytical query templates
- [x] Task registry API endpoints
- [x] Analytics execution endpoint
- [x] Basic React UI: import flow + task list

### Phase 3 — Visualization & AI (Weeks 7–9)

- [ ] Dynamic ChartRenderer with viz_type-driven chart components
- [x] Python FastAPI AI explanation service with safety guardrails
- [x] Prompt engineering per task metadata (visualization intent + ai_prompt_hint)
- [ ] AIInsightPanel component
- [ ] Student Dashboard complete (basic stats + on-demand tasks)

### Phase 4 — Instructor Dashboard & Polish (Weeks 10–12)

- [ ] Instructor Dashboard: single-student deep dive, student comparison workspace, cohort analytics
- [ ] Mock Auth (UI Role Selection: Student vs Admin)
- [ ] Filter system (enrollment, cohort, date range)
- [ ] Task Registry governance validation tooling
- [ ] OULAD dataset full end-to-end test
- [ ] Documentation & thesis write-up

---

## 16. SECURITY CONSIDERATIONS

| Area               | Approach                                                           |
| ------------------ | ------------------------------------------------------------------ |
| Auth               | Mock Auth via Role Selection UI (Prototype scope: no JWT/bcrypt)   |
| SQL Injection      | Parameterized execution only via Prisma $queryRaw typed parameters |
| File Upload        | MIME type check, size limit, temp storage                          |
| AI API Key         | Server-side only, never exposed to frontend                        |
| Row-Level Security | student can only query own `enrollmentId`                          |
| AI Output Safety   | Safety guardrails enforced in prompt construction layer            |

---

## 17. FUTURE EXTENSIBILITY

| Feature        | Extension Point                                                     |
| -------------- | ------------------------------------------------------------------- |
| New dataset    | Add mapping config for new LMS                                      |
| New task       | Add JSON record to task registry (subject to governance rules)      |
| New chart type | Add entry to `CHART_MAP` and update visualization consistency rules |
| New AI model   | Swap LLM client in AI service                                       |
| New role       | Add role to JWT + guard middleware                                  |
| New FE field   | Add computed field in import insert service (in-table only)         |
| Advanced FE    | Future cross-table analytical mart — post-MVP only                  |

### Semantic Layer (Future)

The current architecture encodes semantic business concepts (`performance`, `engagement`, `risk`) directly within task metadata fields (`data_concept`, `analysis_type`). This is sufficient for MVP. A future **Semantic Metric Layer** could formalize these as reusable, versioned metric definitions:

```
performance_score = weighted(avg_score, pass_rate, completion_rate)
engagement_index  = normalized(click_count, activity_week_coverage)
risk_score        = composite(failed_assessments, low_engagement_weeks, delay_avg)
```

This would enable cross-task metric reuse, consistent metric definitions, and better support for ML pipelines — without changing the current MVP architecture.

### Task Registry Decomposition (Future)

As the task registry grows, the current flat structure may be decomposed into specialized sub-registries:

- **Metric Registry** — reusable derived metric definitions
- **Feature Registry** — engineered feature specifications
- **Visualization Registry** — chart type governance rules
- **Prompt Registry** — AI prompt templates per explanation type

### Scalability Considerations (Future)

| Dimension           | Current Scope               | Future Extension                          |
| ------------------- | --------------------------- | ----------------------------------------- |
| Dataset scale       | Single batch import (OULAD) | Streaming LMS integration                 |
| Institutional scope | Single institution          | Multi-institution, multi-tenant           |
| Execution model     | On-demand SQL               | Scheduled aggregation + caching           |
| Analytics depth     | Descriptive + diagnostic    | Predictive modeling pipeline              |
| AI engine           | Single LLM provider         | Multi-model ensemble or fine-tuned models |

---

## 18. DEPLOYMENT ARCHITECTURE

```
[Railway / Render]
├── Node.js Backend (Express)        → Port 3000
├── Python AI Service (FastAPI)      → Port 8000
├── PostgreSQL Database              → Managed DB
└── Redis (Bull Queue for imports)   → Managed Redis

[Vercel / Netlify]
└── React Frontend (Vite build)      → CDN
```

---

_Document Version 4.0 — Research-grade revision. Architecture designed for academic defensibility, research rigor, cross-dataset extensibility, and production scalability. All architectural decisions in this revision are final and approved._
