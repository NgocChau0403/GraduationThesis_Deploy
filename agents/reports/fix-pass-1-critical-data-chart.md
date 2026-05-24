# Fix Pass 1 - Critical Data/Chart Issues

Scope:
- Fix only Priority 1 issues from final debug validation report.
- No task availability change.
- No unrelated refactor.
- Temporary debug logging retained.

## 1) A-G14 row loss / adapter diagnostics

Files changed:
- `C:\[Graduation_Thesis]Prototype\Frontend\src\chartAdapters\line.adapter.js`

Issue fixed:
- Diagnostics in multi-series line adapter could imply row loss when data is intentionally collapsed by x/series grouping.

Before behavior:
- `diag.valid_rows` reflected grouped x-bucket count, not accepted input row count.
- In grouped scenarios, diagnostics could be interpreted as rows dropped unexpectedly.
- No explicit warning that collapse is expected from aggregation/grouping.

After behavior:
- Added `acceptedRows` tracking for valid source rows before grouping.
- `diag.valid_rows` now reports accepted input rows.
- Added warning when collapse occurs: multi-series line collapsed N rows into M x-buckets.
- Diagnostics now distinguish intentional collapse vs real skipped rows.

Manual verification steps:
1. Run backend debug script:
   - `Set-Location -LiteralPath 'C:\[Graduation_Thesis]Prototype\Backend'`
   - `node .\src\debug\phase4_e2e_debug.mjs`
2. Open `agents/reports/phase-4-end-to-end-debug.md` and find task `A-G14`.
3. Confirm adapter section includes valid row accounting aligned with accepted rows and explicit collapse warning when applicable.
4. Confirm chart remains renderable and no unexpected skipped-row spike appears.

## 2) A-B02 division-by-zero guard

Files changed:
- `C:\[Graduation_Thesis]Prototype\Backend\src\config\taskRegistry.json`

Issue fixed:
- Percentage calculation could divide by zero when class total is zero.

Before behavior:
- SQL used: `COUNT(*)*100.0/SUM(COUNT(*)) OVER()`
- Denominator could be zero in edge cases.

After behavior:
- SQL now uses guard: `COUNT(*)*100.0/NULLIF(SUM(COUNT(*)) OVER(), 0)`
- Prevents divide-by-zero failure and avoids invalid numeric results.

Manual verification steps:
1. Run:
   - `Set-Location -LiteralPath 'C:\[Graduation_Thesis]Prototype\Backend'`
   - `node .\src\debug\phase4_e2e_debug.mjs`
2. In `agents/reports/phase-4-end-to-end-debug.md`, find task `A-B02`.
3. Confirm `sqlPreview` includes `NULLIF(SUM(COUNT(*)) OVER(), 0)`.
4. Confirm API response is successful and chart is renderable.

## 3) A-B04 and A-B03 null-to-zero semantic handling

Files changed:
- `C:\[Graduation_Thesis]Prototype\Backend\src\config\taskRegistry.json`

Issue fixed:
- Null engagement-related values were coerced to zero in places where missingness should remain explicit.

Before behavior:
- `A-B03`: engagement score expression used `COALESCE(...,0)` pattern that could produce hard zero even when both source signals were missing.
- `A-B04`: selected `COALESCE(es.engagement_score, 0) AS engagement_score`, forcing null to zero.

After behavior:
- `A-B03`: `engagement_score` now uses `CASE`:
  - if both source maxima are null => `engagement_score = NULL`
  - else compute normalized weighted score.
- `A-B04`: now selects `es.engagement_score` directly (no forced zero).
- Missingness semantics are preserved for downstream adapter/chart handling.

Manual verification steps:
1. Run:
   - `Set-Location -LiteralPath 'C:\[Graduation_Thesis]Prototype\Backend'`
   - `node .\src\debug\phase4_e2e_debug.mjs`
2. In `agents/reports/phase-4-end-to-end-debug.md`, inspect tasks `A-B03` and `A-B04`.
3. Confirm both tasks still execute successfully with status 200.
4. Confirm no runtime NaN/Infinity issues are introduced.
5. Validate that null engagement values are preserved (not silently coerced to zero) in SQL output and downstream data contract.

## Summary of changed files
- `C:\[Graduation_Thesis]Prototype\Frontend\src\chartAdapters\line.adapter.js`
- `C:\[Graduation_Thesis]Prototype\Backend\src\config\taskRegistry.json`

## Notes
- Business logic scope respected: only requested Priority 1 fixes applied.
- Task availability logic intentionally unchanged.
- Debug logs retained as requested.
