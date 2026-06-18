# Phase 4D Implementation Report: OULAD Engagement Load Final Attempt

## Summary

Phase 4D is blocked. The final scoped fast-load attempt with local `psql \copy` did not complete within the command window, so A-G09 must remain unchanged.

Implemented before the final stop:

- OULAD `imd_band` is parsed into canonical `student.imd_score_numeric`.
- OULAD sample students are passed through existing `computeStudentFeatures()`.
- Offline canonical OULAD engagement materialization exists and passes manifest validation.
- OULAD reseed validates generated manifest/hash/header and rejects missing `.tmp` artifacts.
- OULAD reseed consumes generated canonical engagement CSV only; no raw `studentVle.csv` fallback.
- Final fast-load path uses local `psql \copy` through a temporary `.sql` file with `-v ON_ERROR_STOP=1`.

Still blocked:

- Scoped `SAMPLE_OULAD` reseed timed out during `psql \copy`.
- `import_batch.status` remains `processing`.
- `row_count` remains `0`.

Not changed:

- No A-G09 SQL change.
- No A-G09 availability change.
- No `disadvantage_scoring` capability.
- No capability service change.
- No frontend/chart/adapter change.
- No output schema change.

## Root Cause

OULAD engagement volume remains too large for the current local reseed path.

Materialization succeeded:

```json
{
  "raw_student_vle_lines": 10655281,
  "raw_student_vle_data_rows": 10655280,
  "canonical_engagement_rows": 8459320,
  "output_file_size_mb": 1877.64,
  "duplicate_canonical_key_groups": 0,
  "unstable_enrollment_id_groups": 0,
  "unstable_source_dataset_groups": 0,
  "unstable_week_number_groups": 0
}
```

But loading `8,459,320` canonical engagement rows still did not complete:

- JSONB batch insert timed out previously.
- Final `psql \copy` attempt also timed out.

Per the final stop rule, no more Phase 4D load optimization rounds should be attempted in this phase.

## Files Changed

- `.gitignore`
- `Backend/scripts/materializeOuladCanonicalEngagement.mjs`
- `Backend/src/services/sampleAdapters/ouladSample.adapter.js`
- `Backend/src/services/sampleCsvLoader.service.js`
- `Backend/src/services/sampleSeeder.service.js`
- `Docs/evaluation/visualization_phase4d_implementation_report.md`
- `Docs/evaluation/visualization_phase4d_task_fix_log.csv`

## Materialization Evidence

Generated artifacts:

```text
Docs/evaluation/input_csv/OULAD/generated/oulad_canonical_engagement.csv
Docs/evaluation/input_csv/OULAD/generated/oulad_canonical_engagement_manifest.json
```

Generated CSV:

```text
size = 1,968,849,409 bytes
size_mb = 1877.64
```

Manifest:

```text
size = 1116 bytes
output_hash = 4b7509ce2694376eeb8929b3cada2b9cc504e4754bc9d7806eba8024f600cfe3
```

Recommendation: do not commit the generated CSV. Keep it local/generated and regenerate with:

```powershell
node Backend/scripts/materializeOuladCanonicalEngagement.mjs --force
```

## psql Fast-Load Evidence

`psql` was not on PATH, but local PostgreSQL install was found:

```text
C:\Program Files\PostgreSQL\18\bin\psql.exe
```

Fast-load method:

- Node `child_process.spawn`
- `psql -v ON_ERROR_STOP=1 -f <temporary sql file>`
- database password passed only through `PGPASSWORD`
- no password or full connection string logged
- temporary `.sql` file contained one-line `\copy engagement (...) FROM '<generated csv>' WITH (FORMAT csv, HEADER true);`
- temporary `.sql` file was deleted after the failed/timeout attempt

Result:

- First attempt exposed a temp SQL formatting bug; fixed by making `\copy` one line.
- Final `psql \copy` attempt timed out after `1,200s`.
- No `psql` process remained running afterward.

## Before DB Evidence

Before final fast-load attempt, the DB was already partial from earlier attempts:

```json
{
  "batch": {
    "batch_id": "SAMPLE_OULAD",
    "status": "processing",
    "row_count": 0
  },
  "engagements": 1750000,
  "imd_score_numeric_non_null": 27814,
  "disadvantage_score_non_null": 27843
}
```

## Cleanup Confirmation

Before the final `psql \copy` load, scoped cleanup was confirmed:

```json
{
  "courses": 0,
  "classes": 0,
  "students": 0,
  "enrollments": 0,
  "assessments": 0,
  "assessment_results": 0,
  "events": 0,
  "engagements": 0
}
```

This confirms the final attempt did not load on top of the previous partial state.

## After DB Evidence

After final `psql \copy` timeout:

```json
{
  "batch": {
    "batch_id": "SAMPLE_OULAD",
    "status": "processing",
    "row_count": 0,
    "is_sample": true,
    "imported_at": "2026-06-12T09:52:17.526Z"
  },
  "table_counts": {
    "courses": 7,
    "classes": 22,
    "students": 28785,
    "enrollments": 32593,
    "assessments": 206,
    "assessment_results": 173912,
    "events": 6364,
    "engagements": 0
  },
  "feature_counts": {
    "students": 28785,
    "socioeconomic_band_non_null": 27814,
    "imd_score_numeric_non_null": 27814,
    "disability_flag_non_null": 28785,
    "highest_education_non_null": 28785,
    "disadvantage_score_non_null": 27843
  },
  "audit": {
    "enrollment_missing_student": 0,
    "assessment_result_missing_fk": 0,
    "engagement_missing_fk": 0,
    "duplicate_engagement_id_groups": 0,
    "duplicate_engagement_business_key_groups": 0,
    "imd_score_out_of_range": 0,
    "disadvantage_score_out_of_range": 0
  }
}
```

The DB is incomplete because engagement rows did not finish loading and `import_batch.status` was not finalized.

## Commands Run

Syntax checks:

```powershell
node --check Backend/scripts/materializeOuladCanonicalEngagement.mjs
node --check Backend/src/services/sampleSeeder.service.js
node --check Backend/src/services/sampleCsvLoader.service.js
node --check Backend/src/services/sampleAdapters/ouladSample.adapter.js
```

Materialization:

```powershell
node Backend/scripts/materializeOuladCanonicalEngagement.mjs --force
```

Scoped reseed:

```powershell
Set-Location -LiteralPath 'C:\[Graduation_Thesis]Prototype\Backend'
# reseedSampleDatasets({ apply: true, forceReseed: true, batchIds: ['SAMPLE_OULAD'] })
```

Result:

- final `psql \copy` attempt timed out after `1,200s`
- Phase 4D is blocked by OULAD engagement load volume

## Git Diff Stat

```text
 .gitignore                                         |   6 +
 .../services/sampleAdapters/ouladSample.adapter.js | 117 +--
 Backend/src/services/sampleCsvLoader.service.js    |  14 +-
 Backend/src/services/sampleSeeder.service.js       | 800 +++++++++++++++++++--
 4 files changed, 815 insertions(+), 122 deletions(-)
```

The worktree also contains unrelated pre-existing changes outside Phase 4D; do not stage with `git add .`.

## Final Phase 4D Status

Phase 4D should be considered blocked.

Do not proceed to:

- A-G09 SQL
- A-G09 availability
- `disadvantage_scoring`
- output schema
- frontend/chart changes

Any future work should be treated as a new product/data decision, such as reducing OULAD engagement granularity, importing a smaller engagement sample, or accepting a DB-side bulk-load/migration approach outside this Phase 4D scope.
