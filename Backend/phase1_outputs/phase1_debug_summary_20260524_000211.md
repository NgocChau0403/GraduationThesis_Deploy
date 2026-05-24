# Phase 1 Debug Summary

Generated at: 2026-05-23T17:02:11.857Z

## 1. Debug architecture map
- File: `Docs/phase1_debug_architecture_map.md`

## Dataset: UCI (SAMPLE_UCI_POR)
- Total tasks: 57
- Passed: 0
- Failed: 57
- Failure categories:
  - SQL_ERROR: 57

- Most common root causes:
  - (38) Dry-run failed: [SqlExecution] Required param missing: ":class_id"
  - (12) Dry-run failed: [SqlExecution] Required param missing: ":student_id"
  - (4) Dry-run failed: [SqlExecution] Required param missing: ":enrollment_id"
  - (3) Dry-run failed: [SqlExecution] Required param missing: ":s1"

- Blocked by strict availability: 0
- Potentially misleading visualization inputs: 0

## Dataset: OULAD (SAMPLE_OULAD)
- Total tasks: 57
- Passed: 0
- Failed: 57
- Failure categories:
  - SQL_ERROR: 57

- Most common root causes:
  - (38) Dry-run failed: [SqlExecution] Required param missing: ":class_id"
  - (12) Dry-run failed: [SqlExecution] Required param missing: ":student_id"
  - (4) Dry-run failed: [SqlExecution] Required param missing: ":enrollment_id"
  - (3) Dry-run failed: [SqlExecution] Required param missing: ":s1"

- Blocked by strict availability: 0
- Potentially misleading visualization inputs: 0

## 2. Failure analysis summary
- SQL_ERROR: 114

## 3. Top priority fixes for Phase 2
- Fix highest-frequency failure category first (see top_root_causes in JSON report).
- Add task-level contract hardening for tasks that return empty/misaligned datasets.
- Add explicit runtime guardrails where availability deny/pass conflicts are observed.

## 4. Recommended availability refactors
- Unify frontend and backend availability checks into one canonical decision source.
- Replace string-only compatibility assumptions with capability+evidence scoring.
- Expose deny reason codes to frontend for transparent task-state diagnostics.

## 5. Recommended chart fixes
- Add adapter-level null-preservation mode for numeric fields to avoid implicit zeroing.
- Add per-chart missing-field warnings in UI before rendering.
- Add deterministic multi-query dataset selection metadata in task config.

## 6. High-risk areas likely to cause demo failures
- Multi-query tasks with ambiguous chart dataset selection.
- Tasks with non-executable capability status but query still runnable (or vice versa).
- Tasks with partial data causing fallback values that may visually mislead users.
