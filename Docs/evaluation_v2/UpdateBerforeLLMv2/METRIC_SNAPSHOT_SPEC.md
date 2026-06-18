# Metric Snapshot Implementation Spec

## 1. Mục tiêu và phạm vi

Spec này chốt contract implementation cho `metric_snapshot` trước khi sửa
`AISummaryConfig`, implement summarizer hoặc migrate registry cho 5 task:

- `A-S01` — Student full profile snapshot
- `A-S07` — Student background context
- `S-B01` — Performance overview
- `S-B02` — Risk status card
- `S-B03` — Engagement summary

`metric_snapshot` là internal summarizer của
`task_aware_data_summarization`. Đây không phải top-level AI summary method
mới.

Phase spec này chỉ:

- chốt input/output contract;
- chốt validation, missing-evidence và safety rules;
- kiểm kê contract theo actual runtime shape của 5 task.

Phase này chưa:

- sửa `AIService/schemas.py`;
- sửa `AIService/strategies/base.py`;
- sửa `Backend/src/controllers/ai.controller.js`;
- thêm `aiSummaryType` hoặc metadata vào `taskRegistry.json`;
- regenerate AI explanation artifacts;
- chạy LLM Judge.

## 2. Ranh giới của type

Chọn `metric_snapshot` khi primary output là một profile/card/snapshot của:

- một entity được chọn; hoặc
- một aggregate card không có entity identifier trong analytics row.

Snapshot chứa nhiều metric và có thể kèm status, threshold, benchmark,
labels, flags hoặc actions.

Không dùng `metric_snapshot` khi:

- cần xếp hạng nhiều entity: dùng `ranking`;
- cần so sánh nhiều entity trên nhiều metric ngang hàng:
  dùng `multi_metric_comparison`;
- cần phân tích series theo time/order: dùng `trend_series` hoặc
  `trend_comparison`;
- mỗi row là một risk flag: dùng `risk_flags`;
- primary output là action được ưu tiên và có provenance:
  dùng `action_synthesis`;
- primary question là association/correlation: dùng
  `correlation_evidence`.

## 3. Input contract

### 3.1. Required config

```text
summary_type = metric_snapshot
metric_columns
```

Quy tắc:

- `metric_columns` phải là danh sách không rỗng.
- Mỗi configured metric phải tồn tại trong runtime row hoặc được ghi rõ trong
  `missing_evidence`.
- Summarizer không tự chọn mọi numeric column làm metric.
- Summarizer không tự chuyển status, threshold hoặc benchmark thành metric.

### 3.2. Optional config

```text
entity_column
status_columns
threshold_columns
benchmark_columns
label_columns
flag_columns
action_columns
metric_units
sensitive_columns
metric_availability_columns
sensitive_context_policy
require_metric_units
require_sensitive_context_policy
benchmark_sources
threshold_sources
```

Ý nghĩa:

| Config | Ý nghĩa |
|---|---|
| `entity_column` | Identifier của entity được mô tả. Có thể bỏ trống với aggregate card hoặc khi analytics row không trả entity ID. |
| `status_columns` | Nhãn/trạng thái đã được backend trả trực tiếp, ví dụ `performance_band`, `at_risk_label`, `study_effort_level`. |
| `threshold_columns` | Giá trị ngưỡng được backend trả trực tiếp, ví dụ `pass_threshold`, `target_threshold`. |
| `benchmark_columns` | Giá trị tham chiếu được backend trả trực tiếp, ví dụ class average hoặc class median. |
| `label_columns` | Context mô tả không phải metric, status, threshold hay benchmark. |
| `flag_columns` | Boolean/categorical flags được backend trả trực tiếp. Không được tự suy ra flag mới. |
| `action_columns` | Action đã có trong analytics output. Không được tự tạo recommendation từ task hint. |
| `metric_units` | Map từ mọi numeric evidence column sang unit/scale explicit. |
| `sensitive_columns` | Các cột demographic, family, socioeconomic, disability, lifestyle hoặc background cần safety handling. |
| `metric_availability_columns` | Map metric sang boolean availability column explicit; dùng khi raw value có thể tồn tại nhưng không đại diện cho observed evidence. |
| `sensitive_context_policy` | Policy explicit kiểm soát cách giữ và diễn giải sensitive context. |
| `require_metric_units` | Bắt validator fail khi unit metadata bắt buộc nhưng thiếu. |
| `require_sensitive_context_policy` | Bắt validator fail khi có sensitive columns nhưng thiếu policy. |
| `benchmark_sources` | Map benchmark column sang nguồn tham chiếu explicit, ví dụ `class_cohort`. |
| `threshold_sources` | Map threshold column sang nguồn/quy tắc tạo threshold explicit. |

`benchmark_sources` và `threshold_sources` là metadata, không phải dữ liệu thay
thế runtime columns. Nếu configured benchmark/threshold column không có trong
row, summarizer phải báo missing; không được lấy giá trị từ metadata hoặc task
hint để điền vào.

### 3.3. Conditional requirements

`metric_units` bắt buộc khi:

- có từ hai numeric fields khác unit hoặc khác scale;
- có ratio 0–1, percent 0–100, score scale, count hoặc day dễ nhầm;
- task yêu cầu so sánh metric với threshold/benchmark;
- unit không thể xác định an toàn chỉ từ raw schema.

`benchmark_sources` bắt buộc cho mọi configured benchmark.

`threshold_sources` bắt buộc cho mọi configured threshold.

`sensitive_context_policy` bắt buộc khi:

- `sensitive_columns` không rỗng; hoặc
- task chứa demographic/background/lifestyle/family context dù cột đó chỉ
  được cấu hình làm label.

`metric_availability_columns` bắt buộc khi backend có availability field quyết
định một metric có phải observed evidence hay không. Availability=false không
được làm thay đổi raw metric value, nhưng metric phải được ghi là unavailable
và không được dùng để tạo descriptive verdict.

## 4. Quy tắc phân loại evidence

Mỗi configured column chỉ có một primary evidence role trong structured
summary: metric, status, threshold, benchmark, label, flag hoặc action.
`sensitive_columns` là safety overlay nên có thể tham chiếu lại một column đã
có primary role, nhưng không tạo thêm một evidence value độc lập.

### 4.1. Metric value

Metric là giá trị đo lường trực tiếp về entity/aggregate, ví dụ:

- score;
- rate/ratio;
- count;
- active days;
- engagement score;
- risk score;
- support/context score.

Metric giữ nguyên raw value và đi kèm unit explicit khi có numeric evidence.

### 4.2. Status

Status là nhãn/trạng thái backend đã tạo, ví dụ:

- `final_outcome`;
- `performance_band`;
- `at_risk_label`;
- `study_effort_level`;
- `score_strategy`;
- availability state.

Status không phải threshold. Summarizer không được reverse-engineer threshold
từ tên status.

### 4.3. Threshold

Threshold là giá trị ngưỡng explicit có trong runtime row và được cấu hình
trong `threshold_columns`.

Ví dụ hợp lệ:

- `pass_threshold = 40`;
- `target_threshold = 70`.

Không hợp lệ:

- đoán ngưỡng risk từ `at_risk_label`;
- lấy ngưỡng từ `aiPromptHint`;
- hard-code `engagement_score < 0.15` khi runtime row không trả threshold đó;
- tự suy ra operator hoặc severity rule chỉ từ tên cột.

### 4.4. Benchmark

Benchmark là giá trị tham chiếu explicit có trong runtime row, ví dụ:

- `class_avg_score`;
- `class_median_score`;
- `class_avg_engagement_score`.

Mỗi benchmark phải có:

- raw value;
- unit;
- source trong `benchmark_sources`.

Summarizer không được tự tính class benchmark từ một one-row snapshot và không
được coi `score_percentile` là class average.

### 4.5. Missing evidence

Missing evidence gồm:

- configured column không tồn tại;
- column tồn tại nhưng value là `null`;
- evidence được đánh dấu unavailable, ví dụ
  `engagement_score_available = false`;
- không có runtime row;
- runtime trả nhiều hơn một row khi contract chỉ cho phép snapshot đơn.

Quy tắc bắt buộc:

- `null` giữ nguyên là `null`;
- missing không được thay bằng `0`, `false`, chuỗi rỗng hoặc giá trị mặc định;
- raw `0` chỉ được giữ là `0` khi backend thực sự trả `0`;
- availability flag phải được giữ cùng metric liên quan;
- thiếu optional evidence không tự động trở thành config failure;
- thiếu required configured column làm validation fail;
- không có row tạo `evidence_status = insufficient_evidence`.

### 4.6. Sensitive context

Sensitive context bao gồm tối thiểu:

- gender, age hoặc age group;
- region, school, education và family size;
- family support/relations/context;
- socioeconomic/disadvantage context;
- disability;
- internet/paid-class access;
- lifestyle, alcohol, health hoặc social context.

Quy tắc:

- giữ raw backend value khi task intent thực sự cần context đó;
- đánh dấu `sensitive_context_present = true`;
- không biến sensitive attribute thành nguyên nhân của risk/performance;
- không tạo causal, moral hoặc deficit framing;
- không dùng sensitive attribute để ranking hoặc gán priority;
- không tạo recommendation chỉ từ sensitive attributes;
- nếu policy thiếu trong task có sensitive columns, validation phải fail thay
  vì silently summarize.

Policy chuẩn cho batch 5 task:

```text
descriptive_context_only_no_causal_or_prescriptive_inference
```

## 5. Cardinality và dataset selection

- Summarizer nhận full analytics datasets.
- `metric_snapshot` chỉ chấp nhận đúng một primary snapshot row.
- Một row hợp lệ có thể có hoặc không có `entity_column`.
- Không có row: `evidence_status = insufficient_evidence`.
- Nhiều hơn một row: `validation_metadata.status = failed`, vì input không còn
  là snapshot đơn; summarizer không được tự chọn row đầu tiên.
- Nếu request có nhiều dataset labels, implementation chưa được tự ghép các
  row thành một snapshot nếu chưa có multi-dataset contract riêng.
- Dataset selection phải giữ `dataset_name` thật và không đổi tên ngầm.

## 6. Output contract

Output tối thiểu:

```text
summary_type
dataset_name
row_count
entity
metric_snapshot
status_evidence
threshold_evidence
benchmark_evidence
label_evidence
flag_evidence
action_evidence
missing_evidence
sensitive_context_present
sensitive_context
validation_metadata
evidence_status
summarization_warnings
```

### 6.1. Shape đề xuất

```json
{
  "summary_type": "metric_snapshot",
  "dataset_name": "performance_summary",
  "row_count": 1,
  "entity": null,
  "metric_snapshot": {
    "avg_score": {
      "value": 41.25,
      "unit": "score_0_100"
    }
  },
  "status_evidence": {
    "performance_band": "passing_but_below_target"
  },
  "threshold_evidence": {
    "pass_threshold": {
      "value": 40,
      "unit": "score_0_100",
      "source": "runtime_score_context"
    }
  },
  "benchmark_evidence": {
    "class_avg_score": {
      "value": 58.31,
      "unit": "score_0_100",
      "source": "class_cohort"
    }
  },
  "label_evidence": {},
  "flag_evidence": {},
  "action_evidence": {},
  "missing_evidence": [],
  "sensitive_context_present": false,
  "sensitive_context": {},
  "validation_metadata": {
    "status": "passed"
  },
  "evidence_status": "sufficient",
  "summarization_warnings": []
}
```

### 6.2. Validation metadata

`validation_metadata` tối thiểu phải ghi:

```text
status
configured_metric_columns
configured_status_columns
configured_threshold_columns
configured_benchmark_columns
configured_sensitive_columns
missing_required_columns
missing_unit_metadata
missing_threshold_sources
missing_benchmark_sources
sensitive_context_policy
```

`validation_metadata.status = failed` khi:

- thiếu `metric_columns`;
- runtime row thiếu required configured metric column;
- có nhiều hơn một snapshot row;
- thiếu unit metadata khi `require_metric_units = true`;
- thiếu source metadata cho configured threshold/benchmark;
- có sensitive columns nhưng thiếu required sensitive policy;
- cùng một column được cấu hình vào nhiều primary roles.

`evidence_status = insufficient_evidence` khi config hợp lệ nhưng không có
runtime row hoặc toàn bộ configured metrics đều missing/null.

## 7. Guardrails

- Không tự suy đoán unit, threshold, benchmark, operator hoặc risk rule.
- Không thay missing/null bằng `0`.
- Không tự tạo ranking, correlation hoặc trend từ snapshot.
- Không cộng các metric khác unit thành composite score.
- Không coi giá trị cao hơn luôn tốt hơn nếu registry không cung cấp direction.
- Không diễn giải ratio 0–1 thành percent 0–100.
- Không dùng `aiPromptHint` như evidence.
- Không tạo flag/action không có trong analytics output.
- Không biến demographic/background context thành nguyên nhân rủi ro.
- Không tạo recommendation chỉ từ sensitive context.
- Không coi một alias lặp lại là metric độc lập thứ hai.
- Config lỗi phải hiện rõ qua validation; không được coi
  `generic_fallback` là pass của `metric_snapshot`.

## 8. Kiểm kê actual runtime coverage

| Task | UCI | OULAD | Applicable actual cases |
|---|---|---|---:|
| `A-S01` | `insufficient_data` | 1 row `student_profile` | 1 |
| `A-S07` | 1 row `background_context` | `blocked` | 1 |
| `S-B01` | 1 row `performance_summary` | 1 row `performance_summary` | 2 |
| `S-B02` | 1 row `risk_summary` | 1 row `risk_summary` | 2 |
| `S-B03` | `insufficient_data` | 1 row `engagement_summary` | 1 |
| **Tổng** |  |  | **7 applicable / 2 insufficient / 1 blocked** |

## 9. Canonical contract cho 5 task

### 9.1. `A-S01` — Student full profile snapshot

Actual applicable shape:

```text
dataset_name = student_profile
row_count = 1
dataset = SAMPLE_OULAD
```

Canonical config:

```text
summary_type = metric_snapshot
entity_column = student_id
metric_columns =
  avg_score
  at_risk_score
  engagement_score
  previous_attempt_count
status_columns =
  final_outcome
  at_risk_label
  study_effort_level
sensitive_columns =
  gender
  age_group
  region
metric_units =
  avg_score: score_0_100
  at_risk_score: triggered_flag_count_0_5
  engagement_score: ratio_0_1
  previous_attempt_count: count
require_metric_units = true
require_sensitive_context_policy = true
sensitive_context_policy =
  descriptive_context_only_no_causal_or_prescriptive_inference
```

Review notes:

- `at_risk_label` là status backend trả trực tiếp.
- Runtime row không trả các threshold tạo `at_risk_label`; summarizer không
  được reverse-engineer risk thresholds.
- Gender, age group và region chỉ là descriptive context.
- `avg_score = null` hoặc `engagement_score = null` phải được giữ là missing.

### 9.2. `A-S07` — Student background context

Actual applicable shape:

```text
dataset_name = background_context
row_count = 1
dataset = SAMPLE_UCI_POR
entity_column = none
```

Canonical config:

```text
summary_type = metric_snapshot
metric_columns =
  support_score
  lifestyle_risk_score
  social_balance_score
  family_stability_score
  previous_attempt_count
  studytime
  absences
status_columns =
  school_support_flag
  family_support_flag
  has_paid_class
  internet_access_flag
sensitive_columns =
  highest_education
  school
  family_size
  gender
  age_years
  age_group
  school_support_flag
  family_support_flag
  has_paid_class
  internet_access_flag
  support_score
  lifestyle_risk_score
  social_balance_score
  family_stability_score
  studytime
  absences
metric_units =
  support_score: ratio_0_1
  lifestyle_risk_score: score_0_1
  social_balance_score: signed_score
  family_stability_score: score_0_1
  previous_attempt_count: count
  studytime: ordinal_scale_raw
  absences: count
require_metric_units = true
require_sensitive_context_policy = true
sensitive_context_policy =
  descriptive_context_only_no_causal_or_prescriptive_inference
```

Review notes:

- Analytics row hiện không trả `student_id`; đây là snapshot của selected
  student theo request context nhưng output `entity` phải là `null`.
- Không được dùng `school`, `gender`, family context, lifestyle score hoặc
  absences như bằng chứng causal.
- `highest_education = null` phải xuất hiện trong `missing_evidence`; không
  được thay bằng `unknown`, `0` hoặc bỏ qua im lặng.
- Boolean support/access fields là status/context, không phải triggered risk
  flags.

### 9.3. `S-B01` — Performance overview

Actual applicable shape:

```text
dataset_name = performance_summary
row_count = 1
datasets = SAMPLE_UCI_POR, SAMPLE_OULAD
entity_column = none
```

Canonical config:

```text
summary_type = metric_snapshot
metric_columns =
  avg_score
  pass_rate
  performance_trend
  score_vs_class_avg
  score_percentile
  unweighted_avg_score
  weighted_avg_score
  assessment_count
  cohort_size
status_columns =
  final_outcome
  score_strategy
  performance_band
threshold_columns =
  pass_threshold
  target_threshold
benchmark_columns =
  class_avg_score
  class_median_score
label_columns =
  score_scale
metric_units =
  avg_score: score_on_runtime_scale
  pass_rate: ratio_0_1
  performance_trend: score_change_per_assessment_order
  score_vs_class_avg: score_point_difference
  score_percentile: percentile_0_100
  unweighted_avg_score: score_on_runtime_scale
  weighted_avg_score: score_on_runtime_scale
  assessment_count: count
  cohort_size: count
  pass_threshold: score_on_runtime_scale
  target_threshold: score_on_runtime_scale
  class_avg_score: score_on_runtime_scale
  class_median_score: score_on_runtime_scale
benchmark_sources =
  class_avg_score: class_cohort
  class_median_score: class_cohort
threshold_sources =
  pass_threshold: runtime_score_context
  target_threshold: runtime_score_context
require_metric_units = true
```

Review notes:

- `score_scale` phải được giữ làm scale context cho score, threshold và
  benchmark.
- `performance_band` là status đã được backend tính.
- Summarizer không tự tính band lại và không tự đổi ratio `pass_rate` thành
  percent.
- `score_percentile` là metric tương đối, không phải benchmark value.
- `performance_trend` có thể âm dù final outcome tốt; phải giữ cả hai raw
  evidence, không ép chúng thành một verdict duy nhất.

### 9.4. `S-B02` — Risk status card

Actual applicable shape:

```text
dataset_name = risk_summary
row_count = 1
datasets = SAMPLE_UCI_POR, SAMPLE_OULAD
entity_column = none
```

Canonical config:

```text
summary_type = metric_snapshot
metric_columns =
  avg_score
  engagement_score
  punctuality_rate
  previous_attempt_count
  at_risk_score
status_columns =
  engagement_score_available
  score_strategy
  at_risk_label
metric_availability_columns =
  engagement_score: engagement_score_available
threshold_columns =
  pass_threshold
  target_threshold
label_columns =
  score_scale
metric_units =
  avg_score: score_on_runtime_scale
  engagement_score: ratio_0_1
  punctuality_rate: ratio_0_1
  previous_attempt_count: count
  at_risk_score: triggered_flag_count_0_5
  pass_threshold: score_on_runtime_scale
  target_threshold: score_on_runtime_scale
threshold_sources =
  pass_threshold: runtime_score_context
  target_threshold: runtime_score_context
require_metric_units = true
```

Review notes:

- `at_risk_label` và `at_risk_score` được giữ đúng như backend trả.
- Runtime row không trả `flag_low_score`, `flag_low_engagement`,
  `flag_low_punctuality`, `flag_repeated` hoặc `flag_neg_trend`.
- Summarizer không được tạo “top 2 likely triggered factors”.
- Runtime row cũng không trả threshold `0.15` cho engagement hoặc `0.7` cho
  punctuality; không được hard-code hoặc suy đoán hai threshold này.
- Khi `engagement_score_available = false`, `engagement_score = 0` là raw
  backend value nhưng phải được gắn caveat unavailable; không được diễn giải
  thành low engagement evidence.

### 9.5. `S-B03` — Engagement summary

Actual applicable shape:

```text
dataset_name = engagement_summary
row_count = 1
dataset = SAMPLE_OULAD
entity_column = none
```

Canonical config:

```text
summary_type = metric_snapshot
metric_columns =
  total_engagement_count
  active_days
  engagement_score
status_columns =
  study_effort_level
benchmark_columns =
  class_avg_total_engagement_count
  class_avg_active_days
  class_avg_engagement_score
metric_units =
  total_engagement_count: count
  active_days: day_count
  engagement_score: ratio_0_1
  class_avg_total_engagement_count: count
  class_avg_active_days: day_count
  class_avg_engagement_score: ratio_0_1
benchmark_sources =
  class_avg_total_engagement_count: class_cohort
  class_avg_active_days: class_cohort
  class_avg_engagement_score: class_cohort
require_metric_units = true
```

Review notes:

- `total_clicks` hiện là alias có cùng raw value với
  `total_engagement_count`; không cấu hình nó như metric độc lập để tránh đếm
  cùng evidence hai lần.
- Không tự tạo effort threshold từ `study_effort_level`.
- Không gọi missing engagement là low effort.
- Benchmark chỉ được lấy từ ba class-average columns đã trả trong row.

## 10. Self-test acceptance matrix cho implementation phase

Implementation sau spec phải có self-test tối thiểu cho:

1. Snapshot đầy đủ có entity.
2. Aggregate snapshot không có entity column.
3. Metric `null` được giữ là `null` và ghi vào `missing_evidence`.
4. Raw metric `0` vẫn là `0`.
5. Availability false ngăn diễn giải metric `0` thành observed low evidence.
6. Status, threshold và benchmark được phân loại đúng.
7. Thiếu unit metadata khi required làm validation fail.
8. Thiếu threshold/benchmark source làm validation fail.
9. Sensitive columns thiếu policy làm validation fail.
10. Sensitive context được giữ nhưng không tạo causal/prescriptive output.
11. Không có row tạo `insufficient_evidence`.
12. Nhiều hơn một row làm validation fail; không lấy row đầu tiên.
13. Configured required metric column không tồn tại làm validation fail.
14. Missing/null không bị biến thành zero.
15. S-B02 không tạo triggered factors không có trong runtime row.
16. S-B03 không đếm alias `total_clicks` như metric độc lập.
17. Config lỗi không được coi `generic_fallback` là specialized pass.

## 11. Actual-data validation acceptance

Validator riêng của `metric_snapshot` phải chạy đủ 10 task-dataset cases:

- 7 applicable cases phải pass;
- 2 `insufficient_data` cases phải được phân loại đúng;
- 1 `blocked` case phải được phân loại đúng;
- không case applicable nào trả `generic_fallback`;
- mọi case applicable phải trả
  `summary_type = metric_snapshot`;
- raw values trong structured summary phải bằng analytics runtime row;
- unit, threshold source, benchmark source và sensitive policy phải đúng
  canonical contract;
- không có missing/null nào bị đổi thành zero;
- `input_summary_type` chỉ được xác minh sau registry migration.

## 12. Definition of Done của spec phase

- [x] Chốt required input: `summary_type`, `metric_columns`.
- [x] Chốt optional entity/status/threshold/benchmark/label/flag/action/unit và
  sensitive columns.
- [x] Chốt quy tắc phân biệt metric, status, threshold, benchmark, missing
  evidence và sensitive context.
- [x] Cấm suy đoán unit, threshold hoặc benchmark.
- [x] Cấm causal/prescriptive inference từ demographic/background context.
- [x] Chốt missing/null preservation; không thay bằng zero.
- [x] Kiểm kê actual runtime contract của đủ 5 task.
- [x] Ghi rõ 7 applicable, 2 insufficient-data và 1 blocked case.
- [x] Chốt self-test và actual-data acceptance criteria.
- [x] Chưa sửa implementation hoặc registry.
