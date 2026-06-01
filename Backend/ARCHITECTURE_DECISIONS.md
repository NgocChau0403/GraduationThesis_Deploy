# Architecture Decision Record (ADR)
## Learning Analytics Platform — Backend Engine
> Created: 2026-05-18 | Status: Active

---

## ADR-001 — Self-Contained SQL Tasks (No Shared CTE Runtime)

**Decision:** Every `sqlQuery` in `taskRegistry.json` must be a complete, independently-runnable SQL string. No task may reference a CTE defined in another task's query.

**Rejected Alternative:** A "Shared CTE Composition Runtime" where tasks declare dependencies (e.g., `depends_on: ["score_agg_task"]`) and the backend composes them at runtime.

**Rationale:**
- A shared CTE runtime would require building a dependency resolver, cyclic dependency detector, alias collision manager, and parameterized query propagator — effectively a mini query-planner, duplicating work the database engine already does.
- `SQL_ERROR` and `PASS/FAIL` results become non-deterministic if task validity depends on whether its dependencies succeed.
- The `runtimeSemanticValidator` relies on **1 task = 1 execution unit**. Composition would make the validator non-reproducible.
- All 10 Golden Baseline tasks that passed initial validation are self-contained. This is architectural evidence, not coincidence.

**Trade-off accepted:** SQL duplication (e.g., `score_agg` CTE appears in multiple tasks).

**Mitigation:** `src/lib/sqlFragments.js` provides build-time CTE templates. Fragments are composed into `taskRegistry.json` at script time (`fixRegistry.mjs`, `patchRemainingTasks.mjs`), NOT at runtime.

---

## ADR-002 — Capability-Based Task Gating (Not Dataset-Name Filtering)

**Decision:** Task compatibility with a dataset is determined by comparing `task.requiredCapabilities[]` against `datasetCapabilityMatrix[datasetType]`, not by checking a `datasetCompatibility: "OULAD_only"` string.

**Rejected Alternative:** Simple string `datasetCompatibility: "both" | "OULAD_only" | "UCI_only"`.

**Rationale:**
- String matching breaks when new dataset types are added (e.g., Moodle, xAPI, Canvas LMS). Every new dataset would require auditing all 53 tasks.
- Capability semantics are composable: a task requiring `engagement_tracking` will automatically work with any future dataset that provides this capability, without code changes.
- The capability taxonomy is self-documenting — `required: ["engagement_tracking", "temporal_activity"]` is far more informative than `"OULAD_only"`.
- Supports `optionalCapabilities[]` for graceful degradation (a task can still run but with reduced insight quality).

**Implementation:**
```
src/config/datasetCapabilityMatrix.json   ← authoritative capability data
    ↓ loaded once at module init
src/lib/capabilityUtils.js                ← SINGLE SOURCE OF TRUTH (shared module)
    ├─ checkCapabilityCompatibility(datasetType, requiredCapabilities[])
    └─ buildSkipReason(task, datasetType)
    ↓ imported by both runtime paths
scripts/runtimeSemanticValidator.js       ← offline validation path
src/services/capabilityValidator.service.js  ← API runtime path (layerB_semantic)
    ↓ both return identical results for the same input
Task is SKIPPED with reason: "MISSING_CAPABILITIES: [engagement_tracking] not in UCI"
```

---

## ADR-003 — Build-Time SQL Composition (Not Runtime)

**Decision:** `sqlFragments.js` provides CTE string templates that are embedded into `taskRegistry.json` at build/script time. The registry always contains complete SQL strings.

**Rejected Alternative:** Runtime CTE injection where the API server composes SQL from fragments before execution.

**Rationale:**
- Runtime composition creates non-deterministic SQL that cannot be cached, pre-validated, or debugged from a stack trace.
- `EXPLAIN ANALYZE` output from the database is uninterpretable if the query was assembled in-memory.
- The `runtimeSemanticValidator` can only test tasks that contain self-contained SQL. Runtime composition would require the validator to simulate the composition engine.
- Build-time composition is deterministic, cacheable, reproducible, and explainable.

---

## ADR-004 — Runtime Semantic Validation (Not Static Schema Checking)

**Decision:** Task validity is determined by executing SQL against a real database with representative data contexts, not by static JSON schema validation.

**Rejected Alternative:** Schema-only validation (checking that required JSON fields exist and have correct types).

**Rationale:**
- Static schema validation can confirm that `sqlQuery` is a non-empty string, but cannot detect:
  - SQL syntax errors
  - Missing tables/columns
  - Empty joins (no data for the selected context)
  - Contract mismatches (SQL returns `pass_flag` as boolean, but frontend expects a number)
  - OULAD-specific queries failing silently on UCI datasets
- This is the "Valid Registry ≠ Valid Execution" problem. The initial run proved it: 100% schema-valid tasks, 32 SQL_ERRORs at runtime.

**Implementation:** `runtimeSemanticValidator.js` with:
- Smart representative context sampling (classes with most assessments, students with most results)
- Isolated timeouts (15s per query via `Promise.race`)
- Visualization contract validation (`x_field`, `y_field` type checking)
- Confidence scoring (`PASS`, `PARTIAL_PASS`, `CONTRACT_MISMATCH`, `SQL_ERROR`, `SKIPPED`)

---

## ADR-005 — Registry Certification Lifecycle

**Decision:** Every task has a `registry_status` field (`experimental` → `validated` → `certified` → `deprecated`). The backend API only serves `validated` and `certified` tasks to the frontend.

**Rejected Alternative:** No lifecycle management — all tasks are always available.

**Rationale:**
- Without lifecycle gating, AI-generated or manually authored tasks that have never been executed can reach the frontend and cause chart crashes or empty states.
- `certified` tasks have been executed against real data, passed contract validation, and been manually verified.
- `experimental` tasks may have correct SQL but have not been tested or may require dataset capabilities not yet available.
- This enables progressive task rollout: new tasks can be added as `experimental` without affecting production dashboard stability.

**Frontend contract:**
```
GET /api/tasks?status=certified,validated
→ Only returns tasks the backend guarantees are executable and chart-safe
```

---

## ADR-006 — Decimal → Float8 Explicit Casting

**Decision:** All SQL `ROUND()`, `AVG()`, and `REGR_SLOPE()` aggregate results that map to a `y_field` in `visualization_config` must be explicitly cast to `::float8` in SQL.

**Rationale:**
- PostgreSQL `ROUND(expr, N)` returns `Numeric` type. Prisma maps `Numeric` to a `Decimal` object.
- While `sqlExecution.service.js` `serializeRows()` converts `Decimal → Number`, there are edge cases where the conversion chain breaks (particularly for subquery aggregates inside a main SELECT).
- `::float8` bypasses the `Decimal` object entirely, returning a native JavaScript `number` that passes the validator's `typeof yVal === 'number'` contract check.
- This is a semantic cast, not a precision loss: chart axes require float, and `float8` (64-bit double) is more than sufficient.

---

## Final Architecture State (2026-05-18)

```
Dataset Import
    ↓
AppState (active_dataset_source: "UCI" | "OULAD")
    ↓
datasetCapabilityMatrix.json
    ↓ checkCapabilityCompatibility(datasetType, task.requiredCapabilities)
Task Registry Filter → SKIPPED with MISSING_CAPABILITIES reason
    ↓
runtimeSemanticValidator (2-context execution)
    ↓ SQL execution → serializeRows → Visualization Contract Check
PASS | PARTIAL_PASS | CONTRACT_MISMATCH | SQL_ERROR
    ↓ semanticReliability.pass_rate + registry_status
Registry Certification (certified | validated | experimental)
    ↓
Backend API registry_status gating
    ↓
Frontend ChartRenderer (guaranteed chart-safe payload)
```

### Validation Results (UCI Dataset, 2026-05-18)
| Metric | Before | After |
|---|---|---|
| ✅ PASS | 10 | 21 |
| ⚠️ PARTIAL_PASS | 0 | 3 |
| 📉 CONTRACT_MISMATCH | 9 | **0** |
| ❌ SQL_ERROR | 32 | **0** |
| ⏭️ SKIPPED | 0 | 28 |
