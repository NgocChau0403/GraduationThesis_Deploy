# Metric Snapshot Implementation Report

- Ngày thực hiện: 2026-06-18
- Phạm vi: summarizer implementation và self-test
- Trạng thái: **IMPLEMENTATION-READY AND REGISTRY MIGRATED**

## 1. Kết quả

Đã thêm dispatch trong `BaseExplanationStrategy._build_task_aware_summary`:

```text
summary_type = metric_snapshot
-> _summarize_metric_snapshot(req)
```

Đã implement:

```text
BaseExplanationStrategy._summarize_metric_snapshot
```

Summarizer:

- chọn primary dataset theo `query_labels`, sau đó mới dùng dataset list đầu
  tiên;
- yêu cầu đúng một primary snapshot row;
- chấp nhận entity snapshot hoặc aggregate snapshot không có entity column;
- giữ nguyên raw backend values;
- không thay `null` bằng `0`;
- không tính ranking, correlation, trend hoặc composite score;
- không fallback sang `generic_fallback` khi config lỗi.

## 2. Structured output

Output hiện tách riêng:

```text
entity
metric_snapshot
status_evidence
threshold_evidence
benchmark_evidence
label_evidence
flag_evidence
action_evidence
missing_evidence
sensitive_context
```

Mỗi metric có:

```text
value
unit
available
availability_column
availability_value
```

Hai availability fields cuối chỉ xuất hiện khi metric có configured
availability mapping.

Threshold và benchmark giữ:

```text
value
unit
source
```

## 3. Validation behavior

Config validation fail rõ ràng khi:

- `metric_columns` rỗng;
- required metric/entity column không tồn tại;
- một column được cấu hình vào nhiều primary evidence roles;
- thiếu unit khi `require_metric_units = true`;
- thiếu threshold source;
- thiếu benchmark source;
- có sensitive columns nhưng thiếu sensitive policy;
- metric availability mapping tham chiếu metric không được cấu hình;
- availability column không tồn tại;
- primary dataset có nhiều hơn một row;
- primary row không phải object.

Khi validation fail:

```text
summary_type = metric_snapshot
validation_metadata.status = failed
evidence_status = not_evaluated
```

Không có `generic_diagnostic_sample` và không âm thầm trả
`generic_fallback`.

Khi config hợp lệ nhưng không có row:

```text
validation_metadata.status = not_evaluated
evidence_status = insufficient_evidence
```

Khi mọi configured metric đều `null` hoặc unavailable:

```text
validation_metadata.status = passed
evidence_status = insufficient_evidence
```

## 4. Raw-zero và availability semantics

Case `S-B02` được xử lý explicit:

```text
engagement_score = 0
engagement_score_available = false
```

Output:

- vẫn giữ `value = 0`;
- đặt `available = false`;
- ghi availability column/value;
- thêm record vào `missing_evidence`;
- không coi `0` là observed low engagement.

## 5. Sensitive context

`sensitive_context_present` chỉ true khi ít nhất một configured sensitive
column thực sự tồn tại trong runtime row.

Sensitive raw values được giữ trong `sensitive_context`, kể cả `null`.
Summarizer thêm warning cấm:

- causal inference;
- biến demographic/background context thành risk cause;
- tạo recommendation từ sensitive context.

## 6. Verification

Đã pass:

- Python compile:
  - `AIService/schemas.py`
  - `AIService/strategies/base.py`
  - `AIService/debug_ai_summary.py`
- `debug_ai_summary.py --self-test-metric-snapshot`
- `debug_ai_summary.py --self-test-multi-metric-comparison`
- `debug_ai_summary.py --self-test`
- baseline isolation smoke test;
- `git diff --check`.

Self-test `metric_snapshot` bao phủ:

- performance metric/status/threshold/benchmark;
- raw-zero với availability=false;
- sensitive context và sensitive null;
- nhiều hơn một snapshot row;
- config thiếu `metric_columns`;
- xác nhận config lỗi không fallback generic.

## 7. Mode boundary

Implementation này chỉ chạy trong:

```text
task_aware_data_summarization
```

`baseline_first_20_rows` vẫn sử dụng raw first-20-row formatter và đã pass
baseline isolation smoke test.

## 8. Chưa thực hiện

- Chưa chạy lại LLM Judge/scoring; việc này không thuộc acceptance gate của
  summarizer implementation và migration.
- Ba non-applicable cases vẫn giữ đúng trạng thái dữ liệu:
  2 `insufficient_data`, 1 `blocked`.

## 9. Actual-data validation

Validator:

```text
Docs/evaluation_v2/ai_explanation_judge_v2/validate_metric_snapshot.py
```

Kết quả pre-migration và post-migration:

```text
total cases = 10
applicable = 7
passed = 7
failed = 0
insufficient_data = 2
blocked = 1
generic fallback = 0
generic diagnostic fallback = 0
```

Validator kiểm tra:

- output contract;
- raw value preservation;
- units;
- threshold/benchmark source;
- missing/null evidence;
- metric availability;
- sensitive-context policy;
- registry config bằng canonical contract.

Artifacts:

```text
metric_snapshot_pre_migration_validation.json
metric_snapshot_actual_data_validation.json
```

## 10. Registry migration

Đã migrate riêng 5 task:

```text
A-S01
A-S07
S-B01
S-B02
S-B03
```

Mỗi task có config riêng theo actual runtime shape; không dùng một generic
config chung.

## 11. Runtime verification sau migration

Official runner đã retry 7 applicable task-dataset cases.

Tất cả applicable artifacts trả:

```text
status = evaluated
ai_summary_method = task_aware_data_summarization
input_summary_type = metric_snapshot
degraded = false
```

Ba case còn lại:

```text
SAMPLE_UCI_POR / A-S01 = insufficient_data
SAMPLE_UCI_POR / S-B03 = insufficient_data
SAMPLE_OULAD / A-S07 = blocked
```

Full-matrix merge sau retries:

```text
records = 208
groups = 4
validation_pass = true
```

Registry structural check:

```text
57 unique task IDs
5/5 metric_snapshot tasks present
5/5 aiSummaryType = metric_snapshot
```

Lệnh package `npm run registry:validate` hiện không chạy được vì
`Backend/package.json` tham chiếu file không tồn tại:

```text
Backend/scripts/validateRegistry.js
```

Đây là giới hạn tooling có sẵn của repo, không phải lỗi JSON hoặc batch
`metric_snapshot`. JSON parse, unique task IDs, canonical-config validator,
runtime artifacts và full-matrix merge đều pass.

## 12. Sự cố được phát hiện và xử lý

`DistributionStrategy` tạo shallow copy của request để lọc
`competency_source`. Summary metadata ban đầu được gắn vào request copy, khiến
response runtime báo `input_summary_type = task_aware_summary` dù prompt đã
dùng specialized summary.

Đã sửa bằng cách truyền summary metadata từ filtered request về request gốc.
Sau khi restart AIService:

```text
direct canary = metric_snapshot
official runner canary = metric_snapshot
```

## 13. Kết luận trạng thái

`metric_snapshot` đã đạt mức implementation-ready vì spec, implementation,
self-test và actual-data validation đều pass.

Implementation-ready không tự động đồng nghĩa registry đã migrate. Trong batch
này, migration là bước riêng được thực hiện sau khi gate validation pass, và
hiện cả 5 task đã được migrate cùng runtime evidence tương ứng.
