# A-G03 Production Fix Report

## Summary

Kết luận: **PASS**.

Production fix tối thiểu cho riêng `A-G03`: materialize `score_context` và `eng_score`.

- EXPLAIN after fix: `457.24ms`
- Debug execution `executeSqlTask`: `343ms`
- Output row count: `50`
- Baseline reference: `51,108.65ms`
- Candidate reference (`score_context + eng_score`): `347.58ms`

## Files Changed

- `Backend/src/config/taskRegistry.json`

Task changed: `A-G03` only.

## Exact Change

CTE đã materialize:

- `score_context AS MATERIALIZED (`
- `eng_score AS MATERIALIZED (`

CTE không materialize:

- `score_agg`
- `punctuality`
- `eng_agg`
- `class_max`
- `risk_flags`

Validation:

- Expected materialization: {"score_context":true,"eng_score":true}
- Forbidden materialization: {"score_agg":false,"punctuality":false,"eng_agg":false,"class_max":false,"risk_flags":false}

Không thêm dataset hard-code, không đổi logic tính toán, không đổi vị trí filter.

## Before/After Performance

| Metric | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Execution time | 51,108.65ms | 457.24ms | 99.1% |
| Aggregate loops | 423,799 | 1,301 | 99.7% |
| Shared hit blocks | 12,749,008 | 28,006 | 99.8% |
| assessment_result scan loops | 1,264,901 | 1,947 | 99.8% |
| assessment scan loops | 3,794,703 | 5,841 | 99.8% |
| engagement scan loops | 649 | 649 | 0.0% |

After-fix detail:

| Metric | Value |
| --- | ---: |
| Planning time | 81.57ms |
| Execution time | 457.24ms |
| Shared hit blocks | 28,006 |
| Shared read blocks | 0 |
| Aggregate loops | 1,301 |
| Window loops | 0 |
| Nested Loop count/loops | 12/12 |
| assessment_result scan loops | 1,947 |
| assessment scan loops | 5,841 |
| enrollment scan loops | 653 |
| engagement scan loops | 649 |
| EXPLAIN output rows | 50 |

Indexes used:

- `assessment_pkey`
- `assessment_result_batch_id_enrollment_id_assessment_id_key`
- `engagement_enrollment_id_idx`
- `enrollment_class_id_idx`

## Output Schema Validation

Required columns from registry:

- `student_id`
- `avg_score`
- `at_risk_score`
- `at_risk_label`
- `triggered_flags`

Optional columns from registry:

- `enrollment_id`
- `score_strategy`
- `score_scale`
- `pass_threshold`
- `target_threshold`
- `engagement_score`
- `engagement_score_available`
- `punctuality_rate`
- `previous_attempt_count`
- `triggered_flags_summary`
- `primary_support_category`
- `recommended_admin_action`
- `flag_low_score`
- `flag_repeated`
- `flag_low_engagement`
- `flag_low_punctuality`
- `flag_neg_trend`
- `final_outcome`

Actual output fields:

- `student_id`
- `enrollment_id`
- `avg_score`
- `score_strategy`
- `score_scale`
- `pass_threshold`
- `target_threshold`
- `engagement_score`
- `engagement_score_available`
- `punctuality_rate`
- `previous_attempt_count`
- `at_risk_score`
- `at_risk_label`
- `triggered_flags`
- `triggered_flags_summary`
- `primary_support_category`
- `recommended_admin_action`
- `flag_low_score`
- `flag_repeated`
- `flag_low_engagement`
- `flag_low_punctuality`
- `flag_neg_trend`
- `final_outcome`

Validation:

- Missing required fields: none
- Output schema status: **PASS**
- Output row count: `50`

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
- Output rows > 0 for selected context: **PASS**

## API / Debug Execution Validation

- Debug execution mode: `executeSqlTask`
- Debug status: **PASS**
- Debug execution time: `343ms`
- Debug row count: `50`

Live API endpoint không dùng làm kết luận bắt buộc vì server có thể đang giữ registry cũ trong memory nếu chưa reload.

## Chart Contract Validation

- `viz_type`: `table`
- Required output fields are present.
- Browser chart render không chạy trong phase này; schema/chart-contract validation pass nếu required fields đầy đủ.

## Risks

- Fix chỉ áp dụng cho `A-G03`.
- Kết quả đo trên context ưu tiên.
- Task khác chưa được sửa trong phase này.

## Next Recommended Phase

Dừng tại đây theo scope. Nếu cần rollout endpoint-level validation, chạy lại bằng backend process đã reload registry.
