# Multi Metric Comparison Spec

## 1. Scope

Spec này chốt contract implementation cho `multi_metric_comparison` trước khi migrate batch 6 task:

- `A-C02`
- `A-C03`
- `A-C04`
- `A-C05`
- `A-C06`
- `S-T03`

Phase này chỉ hoàn thiện type, self-test, actual-data validation và tài liệu. Chưa migrate registry sang `aiSummaryType=multi_metric_comparison`.

## 2. Input contract

Required config:

```text
summary_type = multi_metric_comparison
entity_column hoặc group_column
minimum_entity_count
```

Metric shape được hỗ trợ theo ba mode:

1. Wide rows

```text
metric_columns
```

2. Long-form một value column

```text
metric_key_column
metric_value_column
```

3. Long-form nhiều value columns

```text
metric_key_column
metric_columns
```

Optional config:

```text
entity_order
metric_units
metric_directions
metric_thresholds
label_columns
flag_columns
action_columns
selected_entity_column
entity_evidence_available_column
sensitive_context_policy
```

## 3. Validation rules

- Tối thiểu phải có `minimum_entity_count` entity/group quan sát được. Mặc định là `2`.
- Nếu thiếu entity/group thì `evidence_status = insufficient_evidence`. Đây không phải config failure.
- Nếu `entity_order` được cấu hình, summary phải báo rõ entity/group nào thiếu trong `missing_expected_entities`.
- `validation_metadata.status = failed` chỉ dùng cho:
  - thiếu required columns/config
  - thiếu metadata khi `require_*` bật
  - metadata không phủ đủ toàn bộ metric
- `metric_units`, `metric_directions`, `metric_thresholds` không được tự suy đoán.
- Missing metric phải giữ explicit missing. Không thay bằng `0`.
- Nếu `entity_evidence_available_column = false`, summary phải ghi đây là thiếu evidence gốc ở cấp entity, không bung missing cho từng metric.

## 4. Output contract

Output tối thiểu:

```text
summary_type
dataset_name
row_count
entity_column
metric_key_column
metric_value_column
entities
metrics
metric_keys
comparison_matrix
metric_extrema
pairwise_gaps
missing_metric_evidence
missing_entity_evidence
missing_expected_entities
selected_entity_evidence
validation_metadata
evidence_status
evidence_requirements
summarization_warnings
```

`evidence_requirements` phải có:

```json
{
  "minimum_entity_count": 2,
  "expected_entities": ["..."],
  "observed_entity_count": 2,
  "missing_expected_entities": []
}
```

## 5. A-C06 zero-activity semantics

`A-C06` phải luôn giữ đủ hai sinh viên được chọn từ `selected_students`.

Với sinh viên không có raw engagement:

```text
has_engagement_data = false
clicks = 0
pct_of_total = null
vle_diversity_score = 0
evidence_row_type = no_recorded_resource_usage
```

Rules:

- Không tạo `resource_type` giả.
- `comparison_matrix` của entity này có `metrics = {}`.
- Summary phải ghi rõ đây là entity không có recorded resource usage thông qua:
  - `labels.evidence_row_type = no_recorded_resource_usage`
  - một record trong `missing_entity_evidence`

## 6. Supported task shapes

- `A-C02`: wide rows, mixed units/directions
- `A-C03`: wide rows, thresholds + flags
- `A-C04`: long-form một value column + sensitive policy
- `A-C05`: wide rows + sensitive policy
- `A-C06`: long-form nhiều value columns + zero-activity entity semantics
- `S-T03`: long-form một value column + expected comparison groups
