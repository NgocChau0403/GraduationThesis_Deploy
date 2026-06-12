# S-T04 Production Fix Report

## Summary

Kết luận: **PASS**.

Production fix tối thiểu cho riêng `S-T04`: materialize `score_context` và `eng_score`.

- EXPLAIN after fix: `447.25ms`
- Debug execution `executeSqlTask`: `343ms`
- Output row count: `5`
- Baseline reference: `41,733.54ms`
- Phase 0.5 candidate reference: `279.43ms`

## Files Changed

- `Backend/src/config/taskRegistry.json`

Task changed: `S-T04` only.

## Exact Change

Materialized CTEs:

- `score_context AS MATERIALIZED (`
- `eng_score AS MATERIALIZED (`

CTEs intentionally not materialized:

- `score_agg`
- `punctuality`
- `eng_agg`
- `class_max`
- `risk_flags`

Validation:

- Expected materialization: {"score_context":true,"eng_score":true}
- Forbidden materialization: {"score_agg":false,"punctuality":false,"eng_agg":false,"class_max":false,"risk_flags":false}

No dataset hard-code, no filter movement, no output schema or chart contract change.

## Before/After Performance

| Metric | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Execution time | 41,733.54ms | 447.25ms | 98.9% |
| Aggregate loops | 423,799 | 1,301 | 99.7% |
| Shared hit blocks | 12,749,008 | 28,006 | 99.8% |
| assessment_result scan loops | 1,264,901 | 1,947 | 99.8% |
| assessment scan loops | 3,794,703 | 5,841 | 99.8% |
| engagement scan loops | 649 | 649 | 0.0% |

After-fix detail:

| Metric | Value |
| --- | ---: |
| Planning time | 97.15ms |
| Execution time | 447.25ms |
| Shared hit blocks | 28,006 |
| Shared read blocks | 0 |
| Aggregate loops | 1,301 |
| Window loops | 0 |
| Nested Loop count/loops | 12/12 |
| assessment_result scan loops | 1,947 |
| assessment scan loops | 5,841 |
| enrollment scan loops | 653 |
| engagement scan loops | 649 |
| EXPLAIN output rows | 5 |

Indexes used:

- `assessment_pkey`
- `assessment_result_batch_id_enrollment_id_assessment_id_key`
- `engagement_enrollment_id_idx`
- `enrollment_class_id_idx`

## Output Schema Validation

Required columns from registry:

- `flag_name`
- `flag_value`
- `threshold`
- `triggered`

Optional columns from registry:

- `severity`
- `flag_description`
- `recommended_action`
- `support_category`

Actual output fields:

- `flag_name`
- `flag_value`
- `threshold`
- `triggered`
- `severity`
- `flag_description`
- `recommended_action`
- `support_category`

Validation:

- Missing required fields: none
- Output schema status: **PASS**
- Output row count: `5`

## Scope Validation

| Param | Value |
| --- | --- |
| context_source | `preferred_context` |
| batch_id | `SAMPLE_UCI_POR` |
| class_id | `SAMPLE_UCI_POR_CLASS` |
| student_id | `SAMPLE_UCI_POR_STU_000001` |
| enrollment_id | `SAMPLE_UCI_POR_ENR_000001` |

Scope status:

- Uses runtime params instead of dataset hard-code: **PASS**
- Student filter location unchanged: **PASS**
- Output rows > 0 for selected student context: **PASS**

## API / Debug Execution Validation

- Debug execution mode: `executeSqlTask`
- Debug status: **PASS**
- Debug execution time: `343ms`
- Debug row count: `5`

Live API endpoint was not used as authoritative evidence because running server processes can hold an old registry in memory unless restarted. This report uses in-process registry load after the production file change.

## Chart Contract Validation

- `viz_type` remains unchanged in registry.
- Required output fields are present.
- Browser chart render was not run in this phase; schema/chart-contract validation passed if required fields are present.

## Risks

- This fix is scoped only to `S-T04`.
- Results are validated on the preferred SAMPLE_UCI_POR context.
- Future datasets should still be safe because no dataset-specific condition was added.
- Other slow tasks such as `S-B02` or `A-G03` remain untouched.

## Next Recommended Phase

Stop here. If further optimization is needed, run the same isolation workflow for `S-B02` or `A-G03` in a separate scoped request.
