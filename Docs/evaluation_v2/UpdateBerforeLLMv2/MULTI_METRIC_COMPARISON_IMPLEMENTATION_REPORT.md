# Multi Metric Comparison Implementation Report

## 1. Objective

Phase này hoàn thiện `multi_metric_comparison` ở mức implementation-ready nhưng chưa migrate registry batch 6 task.

## 2. Implemented behavior

- Bắt buộc tối thiểu `2` entity/group qua `minimum_entity_count`.
- Thiếu entity/group trả `evidence_status = insufficient_evidence`, không trả config failed.
- Nếu `entity_order` được cấu hình, summary báo rõ `missing_expected_entities`.
- Metadata validation được tách riêng qua `validation_metadata.status`.
- Missing metric giữ explicit missing (`null`), không đổi thành `0`.
- Hỗ trợ đủ ba shape:
  - wide rows
  - long-form một value column
  - long-form nhiều value columns
- Hỗ trợ `selected_entity_column`, flags, labels, actions và `sensitive_context_policy`.

## 3. A-C06 runtime fix

SQL `A-C06` đã được sửa để luôn giữ cả `s1` và `s2` bằng `selected_students` + `LEFT JOIN`.

Zero-activity student hiện được biểu diễn bằng:

```text
has_engagement_data = false
clicks = 0
pct_of_total = null
vle_diversity_score = 0
evidence_row_type = no_recorded_resource_usage
```

Không có `resource_type` giả. Thay vì bung 28 `missing_metric_evidence`, summary hiện tạo đúng 1 `missing_entity_evidence`.

## 4. Self-test coverage

`debug_ai_summary.py --self-test-multi-metric-comparison` hiện bao phủ:

- wide rows
- long-form một value column
- long-form nhiều value columns
- missing metric
- metadata thiếu
- sensitive policy thiếu
- chỉ có một entity
- entity có `has_engagement_data = false`
- missing không biến thành zero
- expected entity bị thiếu được báo rõ

## 5. Actual-data validation

Validator:

`Docs/evaluation_v2/ai_explanation_judge_v2/validate_multi_metric_comparison.py`

Kết quả cuối cùng:

- `12` total cases
- `8` applicable
- `8` passed
- `0` failed
- `4` not applicable
- `0` generic fallback trong các applicable cases

`A-C06 / SAMPLE_OULAD` hiện đạt:

- `entity_count = 2`
- `missing_metric_evidence_count = 0`
- `missing_entity_evidence_count = 1`
- `validation_metadata_status = passed`
- `evidence_status = sufficient`

## 6. Remaining work after this phase

Chưa làm trong phase này:

- migrate 6 task sang `aiSummaryType = multi_metric_comparison`
- regenerate task-aware artifacts
- xác minh `input_summary_type` từ runtime sau migration
- kiểm tra lại toàn batch sau migration để chắc chắn không fallback

Batch đó chỉ nên thực hiện sau phase hiện tại vì spec, self-test và actual-data validation đều đã pass.
