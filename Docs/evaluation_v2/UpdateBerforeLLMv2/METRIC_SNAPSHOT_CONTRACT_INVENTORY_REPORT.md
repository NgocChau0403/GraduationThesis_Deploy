# Metric Snapshot Contract Inventory Report

- Ngày kiểm kê: 2026-06-18
- Phạm vi: `A-S01`, `A-S07`, `S-B01`, `S-B02`, `S-B03`
- Nguồn contract: `Backend/src/config/taskRegistry.json`
- Nguồn runtime: V1 task-aware run artifacts của `SAMPLE_UCI_POR` và
  `SAMPLE_OULAD`
- Spec liên quan: `METRIC_SNAPSHOT_SPEC.md`
- Trạng thái: **CONTRACT INVENTORY COMPLETE**

## 1. Kết luận

Đã chốt được canonical registry metadata cho đủ 5 task:

- `aiMetricColumns`
- `aiStatusColumns`
- `aiThresholdColumns`
- `aiBenchmarkColumns`
- `aiSensitiveColumns`
- `aiMetricUnits`

Runtime hiện có:

| Task | Dataset áp dụng | Dataset không áp dụng |
|---|---|---|
| `A-S01` | OULAD | UCI `insufficient_data` |
| `A-S07` | UCI | OULAD `blocked` |
| `S-B01` | UCI, OULAD | Không |
| `S-B02` | UCI, OULAD | Không |
| `S-B03` | OULAD | UCI `insufficient_data` |

Tổng cộng có 7 actual applicable cases. Tất cả applicable cases đều có đúng
một runtime row, phù hợp với cardinality của `metric_snapshot`.

Không có blocker đối với việc chốt contract. Có ba vấn đề cần được xử lý đúng
trong implementation:

1. `S-B02` trả `engagement_score = 0` khi
   `engagement_score_available = false`. Giá trị `0` phải được giữ như raw
   backend value nhưng không được diễn giải thành observed low engagement.
2. `S-B03` trả cả `total_engagement_count` và alias `total_clicks` với cùng giá
   trị. Chỉ dùng `total_engagement_count` để tránh nhân đôi evidence.
3. `aiStatusColumns`, `aiThresholdColumns`, `aiBenchmarkColumns` và
   `aiSensitiveColumns` chưa được truyền qua config pipeline hiện tại. Các
   metadata dưới đây là canonical target cho implementation phase, chưa phải
   runtime registry metadata đang hoạt động.

## 2. Quy ước unit

| Unit | Ý nghĩa |
|---|---|
| `score_0_100` | Score trên scale cố định 0–100. |
| `score_on_runtime_scale` | Score dùng scale được trả trong `score_scale`; không hard-code 0–100 trong summarizer. |
| `score_point_difference` | Chênh lệch điểm trên cùng runtime score scale. |
| `score_change_per_assessment_order` | Hệ số thay đổi score trên mỗi assessment order. |
| `ratio_0_1` | Ratio giữ nguyên ở miền 0–1; không tự nhân 100. |
| `percentile_0_100` | Percentile trên miền 0–100. |
| `triggered_flag_count_0_5` | Tổng số risk conditions đã trigger, miền 0–5. |
| `count` | Số lượng rời rạc. |
| `day_count` | Số ngày. |
| `ordinal_scale_raw` | Giá trị ordinal giữ nguyên theo source scale; không diễn giải như interval metric. |
| `signed_score` | Composite score có thể âm hoặc dương; không mặc định giá trị cao luôn tốt. |
| `score_0_1` | Composite score trên scale 0–1. |

## 3. Canonical metadata theo task

### 3.1. `A-S01` — Student full profile snapshot

Runtime verified:

```text
dataset = SAMPLE_OULAD
dataset_label = student_profile
row_count = 1
```

Canonical metadata:

```json
{
  "aiSummaryType": "metric_snapshot",
  "aiEntityColumn": "student_id",
  "aiMetricColumns": [
    "avg_score",
    "at_risk_score",
    "engagement_score",
    "previous_attempt_count"
  ],
  "aiStatusColumns": [
    "final_outcome",
    "at_risk_label",
    "study_effort_level"
  ],
  "aiThresholdColumns": [],
  "aiBenchmarkColumns": [],
  "aiSensitiveColumns": [
    "gender",
    "age_group",
    "region"
  ],
  "aiMetricUnits": {
    "avg_score": "score_0_100",
    "at_risk_score": "triggered_flag_count_0_5",
    "engagement_score": "ratio_0_1",
    "previous_attempt_count": "count"
  },
  "aiRequireMetricUnits": true,
  "aiSensitiveContextPolicy": "descriptive_context_only_no_causal_or_prescriptive_inference",
  "aiRequireSensitiveContextPolicy": true
}
```

Contract notes:

- `student_id` là entity identifier, không phải metric.
- `final_outcome`, `at_risk_label` và `study_effort_level` là backend statuses.
- Không có runtime threshold hoặc benchmark columns.
- Không reverse-engineer risk threshold từ `at_risk_label`.
- `gender`, `age_group`, `region` chỉ được giữ làm descriptive context.

### 3.2. `A-S07` — Student background context

Runtime verified:

```text
dataset = SAMPLE_UCI_POR
dataset_label = background_context
row_count = 1
entity_column = none
```

Canonical metadata:

```json
{
  "aiSummaryType": "metric_snapshot",
  "aiMetricColumns": [
    "support_score",
    "lifestyle_risk_score",
    "social_balance_score",
    "family_stability_score",
    "previous_attempt_count",
    "studytime",
    "absences"
  ],
  "aiStatusColumns": [
    "school_support_flag",
    "family_support_flag",
    "has_paid_class",
    "internet_access_flag"
  ],
  "aiThresholdColumns": [],
  "aiBenchmarkColumns": [],
  "aiSensitiveColumns": [
    "highest_education",
    "school",
    "family_size",
    "gender",
    "age_years",
    "age_group",
    "school_support_flag",
    "family_support_flag",
    "has_paid_class",
    "internet_access_flag",
    "support_score",
    "lifestyle_risk_score",
    "social_balance_score",
    "family_stability_score",
    "studytime",
    "absences"
  ],
  "aiMetricUnits": {
    "support_score": "ratio_0_1",
    "lifestyle_risk_score": "score_0_1",
    "social_balance_score": "signed_score",
    "family_stability_score": "score_0_1",
    "previous_attempt_count": "count",
    "studytime": "ordinal_scale_raw",
    "absences": "count"
  },
  "aiRequireMetricUnits": true,
  "aiSensitiveContextPolicy": "descriptive_context_only_no_causal_or_prescriptive_inference",
  "aiRequireSensitiveContextPolicy": true
}
```

Contract notes:

- Runtime row không trả `student_id`; output entity phải là `null`.
- Toàn bộ task là background-context task nên safety policy áp dụng cho cả
  raw attributes và các derived context scores.
- Các boolean support/access columns là status/context, không phải risk flags.
- `highest_education = null` trong actual UCI case phải được ghi là missing,
  không thay bằng chuỗi mặc định hoặc `0`.
- Không dùng school, gender, family, support, lifestyle hoặc absence evidence
  để kết luận causal.

### 3.3. `S-B01` — Performance overview

Runtime verified:

```text
datasets = SAMPLE_UCI_POR, SAMPLE_OULAD
dataset_label = performance_summary
row_count = 1 per applicable case
entity_column = none
```

Canonical metadata:

```json
{
  "aiSummaryType": "metric_snapshot",
  "aiMetricColumns": [
    "avg_score",
    "pass_rate",
    "performance_trend",
    "score_vs_class_avg",
    "score_percentile",
    "unweighted_avg_score",
    "weighted_avg_score",
    "assessment_count",
    "cohort_size"
  ],
  "aiStatusColumns": [
    "final_outcome",
    "score_strategy",
    "performance_band"
  ],
  "aiThresholdColumns": [
    "pass_threshold",
    "target_threshold"
  ],
  "aiBenchmarkColumns": [
    "class_avg_score",
    "class_median_score"
  ],
  "aiSensitiveColumns": [],
  "aiMetricUnits": {
    "avg_score": "score_on_runtime_scale",
    "pass_rate": "ratio_0_1",
    "performance_trend": "score_change_per_assessment_order",
    "score_vs_class_avg": "score_point_difference",
    "score_percentile": "percentile_0_100",
    "unweighted_avg_score": "score_on_runtime_scale",
    "weighted_avg_score": "score_on_runtime_scale",
    "assessment_count": "count",
    "cohort_size": "count",
    "pass_threshold": "score_on_runtime_scale",
    "target_threshold": "score_on_runtime_scale",
    "class_avg_score": "score_on_runtime_scale",
    "class_median_score": "score_on_runtime_scale"
  },
  "aiLabelColumns": [
    "score_scale"
  ],
  "aiThresholdSources": {
    "pass_threshold": "runtime_score_context",
    "target_threshold": "runtime_score_context"
  },
  "aiBenchmarkSources": {
    "class_avg_score": "class_cohort",
    "class_median_score": "class_cohort"
  },
  "aiRequireMetricUnits": true
}
```

Contract notes:

- `score_scale` cung cấp scale context cho score, threshold và benchmark.
- `pass_rate` giữ ở ratio 0–1.
- `score_percentile` là relative metric, không phải benchmark column.
- `performance_band` là backend status; summarizer không tính lại.
- `performance_trend` và `final_outcome` có thể đưa ra tín hiệu khác nhau.
  Phải giữ cả hai, không ép thành một verdict tự tạo.

### 3.4. `S-B02` — Risk status card

Runtime verified:

```text
datasets = SAMPLE_UCI_POR, SAMPLE_OULAD
dataset_label = risk_summary
row_count = 1 per applicable case
entity_column = none
```

Canonical metadata:

```json
{
  "aiSummaryType": "metric_snapshot",
  "aiMetricColumns": [
    "avg_score",
    "engagement_score",
    "punctuality_rate",
    "previous_attempt_count",
    "at_risk_score"
  ],
  "aiStatusColumns": [
    "engagement_score_available",
    "score_strategy",
    "at_risk_label"
  ],
  "aiMetricAvailabilityColumns": {
    "engagement_score": "engagement_score_available"
  },
  "aiThresholdColumns": [
    "pass_threshold",
    "target_threshold"
  ],
  "aiBenchmarkColumns": [],
  "aiSensitiveColumns": [],
  "aiMetricUnits": {
    "avg_score": "score_on_runtime_scale",
    "engagement_score": "ratio_0_1",
    "punctuality_rate": "ratio_0_1",
    "previous_attempt_count": "count",
    "at_risk_score": "triggered_flag_count_0_5",
    "pass_threshold": "score_on_runtime_scale",
    "target_threshold": "score_on_runtime_scale"
  },
  "aiLabelColumns": [
    "score_scale"
  ],
  "aiThresholdSources": {
    "pass_threshold": "runtime_score_context",
    "target_threshold": "runtime_score_context"
  },
  "aiRequireMetricUnits": true
}
```

Contract notes:

- Runtime không trả các individual risk flags. Không tạo
  `aiFlagColumns` giả và không suy diễn “top triggered factors”.
- Runtime không trả threshold `0.15` của engagement hoặc `0.7` của
  punctuality. Không thêm hai giá trị này vào `aiThresholdColumns`.
- `at_risk_score` và `at_risk_label` phải giữ nguyên raw backend values.
- UCI actual case trả:

```text
engagement_score = 0
engagement_score_available = false
```

Implementation phải:

- giữ raw `0`;
- giữ availability=false;
- đưa caveat vào missing/unavailable evidence;
- không diễn giải `0` là low observed engagement.

### 3.5. `S-B03` — Engagement summary

Runtime verified:

```text
dataset = SAMPLE_OULAD
dataset_label = engagement_summary
row_count = 1
entity_column = none
```

Canonical metadata:

```json
{
  "aiSummaryType": "metric_snapshot",
  "aiMetricColumns": [
    "total_engagement_count",
    "active_days",
    "engagement_score"
  ],
  "aiStatusColumns": [
    "study_effort_level"
  ],
  "aiThresholdColumns": [],
  "aiBenchmarkColumns": [
    "class_avg_total_engagement_count",
    "class_avg_active_days",
    "class_avg_engagement_score"
  ],
  "aiSensitiveColumns": [],
  "aiMetricUnits": {
    "total_engagement_count": "count",
    "active_days": "day_count",
    "engagement_score": "ratio_0_1",
    "class_avg_total_engagement_count": "count",
    "class_avg_active_days": "day_count",
    "class_avg_engagement_score": "ratio_0_1"
  },
  "aiBenchmarkSources": {
    "class_avg_total_engagement_count": "class_cohort",
    "class_avg_active_days": "class_cohort",
    "class_avg_engagement_score": "class_cohort"
  },
  "aiRequireMetricUnits": true
}
```

Contract notes:

- Không đưa `total_clicks` vào `aiMetricColumns`; đây là alias của
  `total_engagement_count` trong SQL hiện tại.
- `study_effort_level` là backend status; không reverse-engineer threshold.
- Không có runtime threshold columns.
- Không gọi missing engagement là low effort.

## 4. Ma trận tổng hợp

| Task | Metrics | Statuses | Thresholds | Benchmarks | Sensitive |
|---|---:|---:|---:|---:|---:|
| `A-S01` | 4 | 3 | 0 | 0 | 3 |
| `A-S07` | 7 | 4 | 0 | 0 | 16 |
| `S-B01` | 9 | 3 | 2 | 2 | 0 |
| `S-B02` | 5 | 3 | 2 | 0 | 0 |
| `S-B03` | 3 | 1 | 0 | 3 | 0 |

## 5. Implementation dependencies

Trước khi registry có thể dùng contract trên, cần bổ sung support cho:

```text
AISummaryConfig.status_columns
AISummaryConfig.threshold_columns
AISummaryConfig.benchmark_columns
AISummaryConfig.sensitive_columns
AISummaryConfig.metric_availability_columns
AISummaryConfig.benchmark_sources
AISummaryConfig.threshold_sources
```

Backend config builder cần map:

```text
aiStatusColumns -> status_columns
aiThresholdColumns -> threshold_columns
aiBenchmarkColumns -> benchmark_columns
aiSensitiveColumns -> sensitive_columns
aiMetricAvailabilityColumns -> metric_availability_columns
aiBenchmarkSources -> benchmark_sources
aiThresholdSources -> threshold_sources
```

Không migrate 5 task trước khi schema, backend forwarding, summarizer self-test
và actual-data validator hỗ trợ đầy đủ các field này.

## 6. Acceptance checklist

- [x] Đủ 5 task được kiểm kê bằng actual runtime rows.
- [x] Mỗi task có canonical `aiMetricColumns`.
- [x] Mỗi task có canonical `aiStatusColumns`.
- [x] Threshold chỉ được cấu hình khi runtime trả explicit column.
- [x] Benchmark chỉ được cấu hình khi runtime trả explicit column.
- [x] Sensitive columns được khai báo cho `A-S01` và `A-S07`.
- [x] Mọi numeric metric/threshold/benchmark có explicit unit.
- [x] Không đưa `S-B02` hidden SQL thresholds vào runtime contract.
- [x] Không đưa alias `S-B03.total_clicks` vào metric list.
- [x] Không sửa implementation hoặc registry trong phase kiểm kê này.
