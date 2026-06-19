# LLM Judge V2 Phase F2 Dataset Evidence Report

- Dataset: `SAMPLE_OULAD`
- Status: **PASS**
- Generated at: `2026-06-19T05:45:21.639Z`
- Backend: `http://localhost:4000`
- Task-level evidence ready: **52/52**
- Runtime row-count matches: **52/52**
- Full-query artifacts with SHA-256: **52/52**
- Large-result retrieval plans: **13/13**
- Empty dataset arrays: **5**
- Empty arrays explicitly terminal invalid: **5**
- Unclassified empty arrays: **0**

## Evidence access coverage

- Direct embedding: 39
- Deterministic artifact retrieval: 13

## Issues

| Severity | Code | Task | Message |
|---|---|---|---|
| warning | explicit_terminal_invalid_empty_result | A-G13 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | A-S07 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | S-T09 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | S-T14 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | S-T15 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |

## Gate decision

- Current dataset evidence complete: `true`
- OULAD execution allowed next: `false`
- Aggregate expansion allowed: `true`
- Full judge invocation allowed: `false`
