# Phase 3A Fix Plan: Normal UI Visibility Evaluation Correction

## Summary

Phase 3A narrows Phase 3 to normal UI visibility evaluation correction only.

The goal is to make the visualization evaluation script test the same task source used by the normal UI: `/api/tasks/available` without `includeExperimental`. Experimental tasks should not be treated as missing UI bugs when they are intentionally hidden by `registry_status: experimental`.

A-G09 is deferred. The dry investigation found that canonical `student.disadvantage_score` exists, but it is not populated in current `SAMPLE_OULAD` or `SAMPLE_UCI_POR` samples. Dataset-agnostic A-G09 SQL with `s.disadvantage_score IS NOT NULL` would return zero rows for all current samples.

## Files to Change

- `Docs/evaluation/scripts/runVisualizationUciPor.mjs`
- `Docs/evaluation/visualization_phase3_fix_plan.md`
- `Docs/evaluation/visualization_phase3_implementation_report.md`
- `Docs/evaluation/visualization_phase3_task_fix_log.csv`

## Exact Proposed Changes

### Normal UI Evaluation Source

Update `runVisualizationUciPor.mjs` to fetch tasks from:

```text
/api/tasks/available?datasetId=SAMPLE_UCI_POR&classId=SAMPLE_UCI_POR_CLASS
```

Do not pass `includeExperimental`.

Add log metadata:

```json
{
  "task_source": "/api/tasks/available",
  "includeExperimental": false,
  "normal_ui_visibility": true
}
```

### Experimental Task Documentation

Document these tasks as expected hidden in normal UI while their `registry_status` is `experimental`:

- `A-S01`
- `A-S08`
- `A-G15`
- `A-G16`

They are not fixed by code changes in Phase 3A. The correction is that normal UI evaluation should not classify their absence as a UI bug.

### A-G09 Deferred Blocker

Document A-G09 as deferred because:

- canonical `student.disadvantage_score` exists;
- `SAMPLE_OULAD` has `0` non-null `disadvantage_score` rows;
- `SAMPLE_UCI_POR` has `0` non-null `disadvantage_score` rows;
- dataset-agnostic SQL with `s.disadvantage_score IS NOT NULL` would return zero rows for current samples.

Do not change A-G09 SQL in Phase 3A.

## Risks

- Existing historical automatic logs may still show full-registry behavior until the script is rerun.
- Experimental tasks can still appear in full registry or explicit experimental evaluation modes; this is expected and separate from normal UI visibility.
- A-G09 remains unresolved until canonical `disadvantage_score` is populated or computed.

## Verification Commands / Checklist

```powershell
Set-Location -LiteralPath 'C:\[Graduation_Thesis]Prototype'
node --check Docs/evaluation/scripts/runVisualizationUciPor.mjs
git diff --stat
```

Optional runtime verification when backend is running:

```powershell
node Docs/evaluation/scripts/runVisualizationUciPor.mjs
```

Checklist:

- Script uses `/api/tasks/available`.
- Script URL includes `datasetId=SAMPLE_UCI_POR` and `classId=SAMPLE_UCI_POR_CLASS`.
- Script does not pass `includeExperimental`.
- Output JSON includes `task_source`, `includeExperimental: false`, and `normal_ui_visibility: true`.
- `A-S01`, `A-S08`, `A-G15`, and `A-G16` are documented as expected hidden in normal UI.
- A-G09 is documented as deferred/blocker.

## Out-of-Scope Items for Phase 3A

- No A-G09 SQL change.
- No `disadvantage_scoring` capability yet.
- No OULAD-only guard.
- No global validator semantic change.
- No frontend chart rendering change.
- No availability validator hard-fail for global `datasetCompatibility` mismatch.

## Proposed Phase 4 Note

Phase 4 should define and populate canonical `student.disadvantage_score` from OULAD socioeconomic fields, then add a `disadvantage_scoring` capability scoped to selected class/batch, then rewrite A-G09 SQL to be dataset-agnostic and capability-gated.
