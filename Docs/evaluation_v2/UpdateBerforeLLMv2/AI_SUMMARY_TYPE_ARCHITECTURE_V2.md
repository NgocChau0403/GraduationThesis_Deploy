# AI Summary Type Architecture V2 — Design Freeze

- Trạng thái: **FROZEN FOR PHASE 2 MAPPING**
- Phiên bản kiến trúc: `ai_summary_type_architecture_v2_11_types`
- Ngày freeze: 2026-06-18
- Phạm vi: kiến trúc internal summarizer của `task_aware_data_summarization`
- Ngoài phạm vi Phase 1: sửa source code, thêm field vào schema, cập nhật `taskRegistry.json`, chạy lại AI explanation hoặc LLM Judge

## 1. Quyết định kiến trúc

Hệ thống giữ đúng hai top-level AI summary methods:

```text
baseline_first_20_rows
task_aware_data_summarization
```

`AiSummaryType` là internal strategy bên trong `task_aware_data_summarization`, không phải top-level mode độc lập.

Kiến trúc V2 được đóng băng ở đúng **11 `AiSummaryType`**:

1. `categorical_distribution`
2. `correlation_evidence`
3. `group_comparison`
4. `numeric_distribution`
5. `ranking`
6. `risk_flags`
7. `trend_comparison`
8. `trend_series`
9. `multi_metric_comparison`
10. `metric_snapshot`
11. `action_synthesis`

Không tạo thêm type trong quá trình mapping 52 task nếu chưa mở lại design review.

## 2. Mục tiêu

Kiến trúc phải:

- ánh xạ được toàn bộ 52 task trong evaluation manifest;
- dùng type theo data shape và phép tổng hợp, không theo tên task;
- tránh một summarizer riêng cho từng task;
- bảo toàn full-data evidence trước khi compact;
- giữ raw backend values và units;
- tạo structured summary có thể kiểm tra và tái lập;
- giảm hoặc loại bỏ `generic_fallback` trong scope 52 task;
- giữ ranh giới rõ giữa data summarization và LLM explanation generation.

Kiến trúc này chưa khẳng định 52 task đã được ánh xạ hợp lệ. Việc ánh xạ và kiểm tra coverage thuộc Phase 2.

## 3. Nguyên tắc tạo type

Một `AiSummaryType` chỉ hợp lệ khi có:

1. Data shape khác biệt rõ.
2. Phép tổng hợp khác biệt rõ.
3. Structured output contract riêng.
4. Khả năng tái sử dụng cho nhiều task.
5. Không thể biểu diễn sạch bằng type hiện có kết hợp capability/config.

Không tạo type mới chỉ vì:

- task có tên hoặc mục tiêu giáo dục khác;
- cần thêm một optional column;
- cần giữ selected student;
- input có nhiều dataset;
- cần dynamic group;
- cần small-sample warning;
- cần composite key;
- cần safety rule riêng.

Các trường hợp trên là **capability hoặc policy**, không phải summary type.

## 4. Danh mục 11 types

| Type | Data shape chính | Phép tổng hợp cốt lõi | Không dùng khi |
|---|---|---|---|
| `categorical_distribution` | Một category và count/ratio theo category | Tổng count, tỷ lệ, category lớn nhất, focus/missing category | Cần so sánh nhiều metric giữa nhiều entity |
| `correlation_evidence` | Cặp biến số hoặc coefficient evidence | Association direction, coefficient, sample size, outlier/selected entity evidence | Chỉ có một snapshot hoặc cần causal conclusion |
| `group_comparison` | Một group dimension và một metric chính | Group statistics, gap, reliability và extrema | Mỗi entity có nhiều metric ngang hàng |
| `numeric_distribution` | Numeric bins và count/percent | Distribution, dominant/focus bins, threshold evidence | Dữ liệu là raw entity ranking, không phải bins |
| `ranking` | Entity và metric có thứ tự | Top/bottom, median, ties, supporting labels/flags | Thứ tự không có ý nghĩa hoặc cần profile đầy đủ |
| `risk_flags` | Mỗi row là một flag có threshold/trigger state | Triggered/non-triggered flags, severity, threshold và action evidence | Mỗi row là một student risk profile gồm nhiều flags |
| `trend_comparison` | Nhiều series theo time và group | So sánh trajectory, start/end/change và target group gap | Chỉ có một series hoặc time không tồn tại |
| `trend_series` | Một ordered series theo time/order | First/last, change, peak/trough, adjacent rise/drop, flagged points | Cần so sánh nhiều entity/metric cùng lúc |
| `multi_metric_comparison` | Nhiều entity/group, nhiều metric ngang hàng | So sánh metric-by-metric, direction, gap và missing evidence | Chỉ có một metric chính hoặc một snapshot entity |
| `metric_snapshot` | Một entity hoặc aggregate card với nhiều fields | Tổ chức metrics, statuses, thresholds, benchmark và caveats | Cần ranking, trend hoặc action synthesis |
| `action_synthesis` | Evidence fields và candidate actions | Ánh xạ evidence → priority → action, kèm provenance | Dữ liệu chỉ yêu cầu mô tả thống kê |

## 5. Tám types hiện có

### 5.1. `categorical_distribution`

Required contract:

```text
aiSummaryType
aiCategoryColumn
aiCountColumn
```

Optional contract:

```text
aiPercentColumn
aiMetricColumns
aiFocusCategories
aiCategoryOrder
aiExpectedCategories
aiSortBy
aiSortDirection
```

Output bắt buộc phải giữ:

```text
summary_type
dataset_name
row_count
total_count
category_distribution
largest_category
focus_total
missing_expected_categories
summarization_warnings
```

Raw ratio 0–1 không được khai báo là percent 0–100 nếu không có unit metadata rõ ràng.

### 5.2. `correlation_evidence`

Required contract:

```text
aiSummaryType
aiXColumn
```

Y evidence có thể đến từ:

```text
aiYColumn
aiMetricColumn
aiCoefficientColumn
```

Optional contract:

```text
aiCoefficientMethod
aiSampleSizeColumn
aiPValueColumn
aiOutlierPolicy
aiMinimumSampleSize
aiEntityColumn
aiLabelColumns
aiTopK
```

Guardrails:

- Không dùng ngôn ngữ causal.
- Không claim statistical significance khi không có p-value hoặc evidence tương đương.
- Không mô tả strength nếu thiếu coefficient hoặc sample size đáng tin cậy.

### 5.3. `group_comparison`

Required contract:

```text
aiSummaryType
aiGroupColumn
aiMetricColumn
```

Optional contract:

```text
aiGapColumn
aiReliabilityColumn
aiMinimumReliableCount
aiExpectedGroups
aiSecondaryMetricColumns
aiLabelColumns
aiSortDirection
```

Type này dành cho một metric chính theo group. Nhiều metric ngang hàng phải chuyển sang `multi_metric_comparison`.

### 5.4. `numeric_distribution`

Required contract:

```text
aiSummaryType
aiBinColumn
aiCountColumn
```

Optional contract:

```text
aiPercentColumn
aiMetricColumns
aiFocusBins
aiBinOrder
aiExpectedBins
aiNumericThreshold
aiThresholdDirection
```

Không suy luận risk chỉ từ tên bin nếu không có threshold hoặc task context hỗ trợ.

### 5.5. `ranking`

Required contract:

```text
aiSummaryType
aiEntityColumn
aiMetricColumn
```

Optional contract:

```text
aiSecondaryMetricColumns
aiLabelColumns
aiFlagColumns
aiActionColumns
aiSortDirection
aiTopK
aiBottomK
```

Không dùng demographic/background fields làm ranking rationale hoặc intervention rationale nếu task không yêu cầu rõ ràng.

### 5.6. `risk_flags`

Required contract:

```text
aiSummaryType
aiFlagNameColumn
aiFlagValueColumn
aiThresholdColumn
aiTriggeredColumn
```

Optional contract:

```text
aiSeverityColumn
aiDescriptionColumn
aiRecommendedActionColumn
aiSupportCategoryColumn
aiSeverityOrder
aiFlagOrder
aiMaxFlags
```

Type này chỉ dùng khi row semantics là một flag. Không dùng trực tiếp cho bảng trong đó mỗi row là một student và flags nằm ở nhiều columns.

### 5.7. `trend_comparison`

Required contract:

```text
aiSummaryType
aiTimeColumn
aiMetricColumn
aiGroupColumn hoặc aiColorColumn
```

Optional contract:

```text
aiTargetGroup
aiComparisonGroups
aiReliabilityColumn
aiMinimumReliableCount
aiMaxPoints
```

Dynamic groups là capability của type này, không phải type mới.

### 5.8. `trend_series`

Required contract:

```text
aiSummaryType
aiTimeColumn
aiMetricColumn
```

Optional contract:

```text
aiSecondaryMetricColumns
aiFlagColumns
aiActionColumns
aiLabelColumns
aiSortDirection
aiMaxPoints
```

Small-sample warning hoặc secondary association evidence là capability; không tạo `lateness_impact` riêng.

## 6. Ba types mới

Ba type dưới đây được freeze ở mức architecture contract. Field names cuối cùng phải được xác nhận trong implementation spec trước khi sửa `AISummaryConfig`.

### 6.1. `multi_metric_comparison`

#### Mục đích

So sánh hai hoặc nhiều entity/group trên nhiều metric ngang hàng, trong đó không có một metric duy nhất đủ để đại diện cho task.

Representative task candidates:

```text
A-C02
A-C03
A-C04
A-C05
A-C06
S-T03
```

#### Required conceptual contract

```text
summary_type
entity_column hoặc group_column
metric_columns
minimum_entity_count
```

#### Optional conceptual contract

```text
entity_order
metric_key_column
metric_value_column
metric_directions
metric_units
metric_thresholds
label_columns
flag_columns
action_columns
selected_entity_column
entity_evidence_available_column
```

`metric_directions`, `metric_units` và `metric_thresholds` là conditionally required:

- `metric_units` bắt buộc khi có từ hai metric khác unit hoặc khác scale, khi có ratio/percent/score scale dễ nhầm, hoặc khi unit không thể xác định an toàn từ schema.
- `metric_directions` bắt buộc khi task cần đánh giá tốt/xấu, improvement/decline, risk, priority hoặc recommendation và hướng của metric không hiển nhiên.
- `metric_thresholds` bắt buộc khi summary dùng threshold để gắn nhãn tốt/xấu, xác định risk, severity hoặc trigger action.
- Nếu mọi metric cùng unit/scale rõ ràng và task chỉ mô tả trung lập, `metric_units` hoặc `metric_directions` có thể được bỏ qua.
- Validator phải fail config thay vì đoán unit, direction hoặc threshold khi một điều kiện bắt buộc ở trên được kích hoạt.

#### Output contract

```text
summary_type
dataset_name
row_count
entities
metrics
metric_keys
comparison_matrix
metric_extrema
pairwise_gaps
missing_metric_evidence
missing_entity_evidence
missing_expected_entities
validation_metadata
evidence_status
evidence_requirements
selected_entity_evidence
summarization_warnings
```

#### Validation rules

- Phải có tối thiểu hai entity/group quan sát được. Nếu ít hơn `minimum_entity_count`, summary phải trả `evidence_status = insufficient_evidence`, không được coi là config failed.
- Nếu `entity_order` được cấu hình, các entity/group thiếu khỏi dataset phải được báo rõ trong `missing_expected_entities`.
- `validation_metadata.status = failed` chỉ dùng cho thiếu/sai metadata hoặc thiếu required columns/config.
- Không được tự suy đoán `metric_units`, `metric_directions` hoặc `metric_thresholds` khi các cờ `require_*` tương ứng đang bật.
- Missing metric value phải giữ explicit missing, không thay bằng `0`.
- Với entity có `entity_evidence_available_column = false`, summary phải ghi rõ đây là thiếu evidence gốc ở cấp entity thay vì bung missing evidence cho từng metric.

#### Guardrails

- Không cộng các metric khác đơn vị thành một composite score nếu registry không cung cấp công thức.
- Không so sánh trực tiếp độ lớn giữa các metric khác unit hoặc scale.
- Không mặc định rằng giá trị cao hơn luôn tốt hơn.
- Không diễn giải ratio 0–1 như percent 0–100 nếu không có unit metadata explicit.
- Không kết luận causal từ background/lifestyle attributes.
- Missing values phải hiển thị là missing, không thay bằng zero.
- Sensitive attributes chỉ được dùng khi task intent yêu cầu và phải có fairness policy.

- KhÃ´ng táº¡o metric key hoáº·c resource category giáº£ chá»‰ Ä‘á»ƒ lÃ¡º¥p shape comparison.

### 6.2. `metric_snapshot`

#### Mục đích

Tổ chức một profile/card/snapshot có nhiều metric, status, threshold hoặc benchmark của một entity hay aggregate.

Representative task candidates:

```text
A-S01
A-S07
S-B01
S-B02
S-B03
```

#### Required conceptual contract

```text
summary_type
metric_columns
```

#### Optional conceptual contract

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
```

#### Output contract

```text
summary_type
dataset_name
row_count
entity
metric_snapshot
status_evidence
threshold_evidence
benchmark_evidence
missing_evidence
sensitive_context_present
summarization_warnings
```

#### Guardrails

- Snapshot không tự tạo ranking hoặc correlation.
- Không biến demographic/background context thành risk cause.
- Không tạo recommendation chỉ từ sensitive attributes.
- Benchmark phải chỉ rõ source và unit.

### 6.3. `action_synthesis`

#### Mục đích

Tổng hợp evidence từ một hoặc nhiều nguồn thành action có priority và provenance rõ ràng.

Representative task candidates:

```text
A-G16
A-S08
S-T13
```

#### Required conceptual contract

```text
summary_type
evidence_columns hoặc evidence_dataset_roles
action_columns hoặc action_rules
```

`aiPromptHint` hoặc instruction bằng natural language không được xem là `action_rules`. Ít nhất một trong hai điều kiện sau phải đúng:

1. Analytics output trả về candidate action columns cùng evidence liên quan; hoặc
2. Registry cung cấp explicit, versioned và testable action rules ánh xạ evidence/threshold sang action.

#### Optional conceptual contract

```text
priority_column
severity_column
support_category_column
trigger_columns
entity_column
time_horizon_column
owner_column
max_actions
```

#### Output contract

```text
summary_type
source_datasets
evidence_items
prioritized_actions
action_evidence_links
unsupported_actions
conflicting_evidence
missing_evidence
summarization_warnings
```

#### Guardrails

- Mỗi action phải liên kết được về evidence cụ thể.
- Mỗi action phải có provenance tới dataset, column, threshold, trigger hoặc explicit rule đã tạo ra action đó.
- Không tạo action từ demographic/background attributes.
- Không tạo urgency nếu không có severity, threshold hoặc explicit rule.
- Không che giấu conflicting hoặc missing evidence.
- LLM chỉ được diễn đạt action; không được tự tạo rule ngoài summary.
- Nếu input chỉ có evidence signals nhưng không có candidate actions hoặc explicit action rules, config phải fail validation hoặc output phải ghi `unsupported_actions`; không được yêu cầu LLM tự nghĩ action.

#### Boundary với `risk_flags`

Chọn type theo primary output:

```text
Primary output là flag nào triggered, severity gì, threshold/value gì
→ risk_flags

Primary output là nên làm gì, action nào ưu tiên và action dựa trên evidence nào
→ action_synthesis
```

Nếu `risk_flags` có `recommended_action` gắn với từng flag:

- task vẫn là `risk_flags`;
- action được giữ như optional supporting evidence;
- không chuyển thành `action_synthesis` chỉ vì dataset có action column.

`action_synthesis` chỉ phù hợp khi task cần tổng hợp hoặc xếp ưu tiên nhiều action từ một hay nhiều evidence sources. Theo boundary này, `S-T04` và `A-S04` vẫn là `risk_flags`; `A-G16`, `A-S08` và `S-T13` là candidate của `action_synthesis` sau khi action provenance/rules đã được định nghĩa.

## 7. Capability model

Các capability sau được dùng xuyên type và không làm tăng số lượng `AiSummaryType`:

| Capability | Mục đích | Types dự kiến |
|---|---|---|
| `dynamic_comparison_groups` | Nhận group values từ runtime thay vì danh sách cố định | `trend_comparison`, `group_comparison` |
| `composite_group_keys` | Nhóm theo nhiều columns | `group_comparison`, `categorical_distribution` |
| `multi_dataset_evidence` | Tổng hợp nhiều dataset labels có vai trò khác nhau | `trend_series`, `multi_metric_comparison`, `action_synthesis` |
| `selected_entity_preservation` | Luôn giữ selected student/entity trong compact evidence | `correlation_evidence`, `multi_metric_comparison`, `ranking` |
| `small_sample_caveat` | Ghi rõ giới hạn khi sample nhỏ | `correlation_evidence`, `trend_series`, `group_comparison` |
| `metric_units` | Phân biệt percent 0–100, ratio 0–1, score scale và count | Tất cả types có numeric evidence |
| `sensitive_context_policy` | Kiểm soát demographic/background evidence | `group_comparison`, `multi_metric_comparison`, `metric_snapshot` |
| `evidence_provenance` | Gắn output item với dataset/column/row source | `action_synthesis`, `metric_snapshot`, `multi_metric_comparison` |

Capability có thể cần thêm config fields trong tương lai, nhưng không thay đổi danh sách 11 types.

## 8. Quy tắc chọn type

Áp dụng theo thứ tự:

1. Nếu primary output là prioritized actions và mỗi action có evidence provenance hoặc explicit action rule: `action_synthesis`.
2. Nếu primary output là triggered state, severity và threshold/value của các flags: `risk_flags`, kể cả khi mỗi flag có optional `recommended_action`.
3. Nếu output là một profile/card của một entity: `metric_snapshot`.
4. Nếu có time/order:
   - một series: `trend_series`;
   - nhiều group series: `trend_comparison`.
5. Nếu nhiều entity và nhiều metric ngang hàng: `multi_metric_comparison`.
6. Nếu một metric theo group: `group_comparison`.
7. Nếu entity được sắp hạng theo metric: `ranking`.
8. Nếu raw/binned numeric distribution: `numeric_distribution`.
9. Nếu category counts/ratios: `categorical_distribution`.
10. Nếu mục tiêu là association/correlation: `correlation_evidence`.

Nếu một task dường như phù hợp nhiều type:

- chọn type phản ánh **primary analytical question**;
- dùng secondary columns và capability để giữ evidence phụ;
- không chạy nhiều summarizer rồi ghép tùy ý nếu chưa có contract;
- ghi task vào design review nếu primary analytical question chưa rõ.

## 9. Full-data và compacting rules

1. Summarizer phải nhận full analytics datasets.
2. Nếu tổng evidence không quá 20 rows, structured summary phải bảo toàn toàn bộ rows hoặc toàn bộ evidence fields cần thiết.
3. Không được cắt `rows[:20]` trước khi tính statistics.
4. Khi compact input lớn:
   - giữ extrema, target/focus entities, selected entity, triggered flags và reliability evidence;
   - ghi row count gốc và số evidence items được emit;
   - ghi warning khi cap hoặc sampling xảy ra.
5. Không normalize raw value ngầm.
6. Mọi unit conversion phải explicit, versioned và testable.
7. Missing/null không được thay bằng zero trừ khi domain contract quy định rõ.

## 10. Fallback policy

`generic_fallback` vẫn tồn tại để backward compatibility và chẩn đoán, nhưng:

- không nằm trong 11 frozen types;
- không được tính là task-aware specialized coverage;
- mục tiêu cuối của scope evaluation là `52/52` task không dùng fallback;
- task có config không hoàn chỉnh phải fail validation rõ ràng, không được im lặng coi generic output là pass;
- `generic_diagnostic_sample` chỉ là debug evidence khi config lỗi.

## 11. Versioning và change control

Danh sách 11 types chỉ được thay đổi khi:

1. Phase 2 chứng minh có task không thể ánh xạ mà không phá contract.
2. Ít nhất hai phương án mở rộng capability/type hiện có đã được đánh giá.
3. Type mới có data shape, algorithm và output contract thực sự khác.
4. Có representative tasks và acceptance criteria.
5. Tài liệu này được chuyển sang phiên bản kiến trúc mới.

Không thêm type trực tiếp trong implementation hoặc registry migration.

## 12. Acceptance criteria của Phase 1

Phase 1 hoàn thành khi:

- [x] Chốt đúng 11 `AiSummaryType`.
- [x] Giữ đúng hai top-level methods.
- [x] Mô tả boundary của 8 type hiện có.
- [x] Freeze conceptual contract cho 3 type mới.
- [x] Tách capability khỏi summary type.
- [x] Định nghĩa full-data, fallback, safety và change-control rules.
- [x] Không sửa summarizer implementation.
- [x] Không cập nhật mapping trong `taskRegistry.json`.
- [x] Không chạy lại AI explanation hoặc LLM Judge.

## 13. Đầu vào cho Phase 2

Phase 2 phải tạo mapping canonical cho đúng 52 task:

| Field | Yêu cầu |
|---|---|
| `task_id` | ID trong frozen evaluation manifest |
| `current_ai_summary_type` | Type hiện tại hoặc `null` |
| `proposed_ai_summary_type` | Một trong đúng 11 frozen types |
| `primary_analytical_question` | Câu hỏi phân tích chính |
| `actual_dataset_shapes` | Dataset labels, row counts và columns |
| `required_config` | Config bắt buộc theo type |
| `required_capabilities` | Capability dùng chung nếu có |
| `runtime_shape_status` | `verified`, `mismatch`, `blocked` |
| `migration_status` | `already_validated`, `ready_to_migrate`, `requires_contract_extension`, `requires_new_type_implementation`, `runtime_blocked` |
| `review_notes` | Rủi ro, safety hoặc ambiguity |

Đối với task đề xuất dùng `multi_metric_comparison`, mapping phải ghi thêm:

```text
metric_units_status
metric_directions_status
metric_thresholds_status
conditional_validation_result
```

Đối với task đề xuất dùng `action_synthesis`, mapping phải ghi thêm:

```text
action_source
action_rule_version
action_provenance_status
unsupported_action_behavior
```

Phase 2 không được tự tạo type thứ 12. Nếu không ánh xạ được, task phải được ghi `design_review_required`.
