# LLM Judge V2 Phase F2 Dataset Evidence Report

- Dataset: `SAMPLE_UCI_POR`
- Status: **PASS**
- Generated at: `2026-06-19T05:34:04.557Z`
- Backend: `http://localhost:4000`
- Task-level evidence ready: **52/52**
- Runtime row-count matches: **52/52**
- Full-query artifacts with SHA-256: **52/52**
- Large-result retrieval plans: **6/6**
- Empty dataset arrays: **13**
- Empty arrays explicitly terminal invalid: **13**
- Unclassified empty arrays: **0**

## Evidence access coverage

- Direct embedding: 46
- Deterministic artifact retrieval: 6

## Issues

| Severity | Code | Task | Message |
|---|---|---|---|
| warning | explicit_terminal_invalid_empty_result | A-G01 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | A-G06 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | A-G07 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | A-G09 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | A-G10 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | A-G11 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | A-G14 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | A-G15 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | A-S03 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | S-T05 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | S-T06 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | S-T10 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |
| warning | explicit_terminal_invalid_empty_result | S-T11 | Empty full-query result is explicitly classified terminal invalid from backend data-quality errors. |

## Gate decision

- Current dataset evidence complete: `true`
- OULAD execution allowed next: `true`
- Aggregate expansion allowed: `false`
- Full judge invocation allowed: `false`
