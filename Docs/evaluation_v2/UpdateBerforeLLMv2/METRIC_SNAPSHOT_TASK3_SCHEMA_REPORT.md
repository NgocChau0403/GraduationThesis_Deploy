# Metric Snapshot Task 3 Schema Report

- Ngày thực hiện: 2026-06-18
- Phạm vi: mở rộng config contract và Backend forwarding
- Trạng thái: **IMPLEMENTED**

## 1. Kết quả

Đã bổ sung vào `AISummaryConfig`:

```text
status_columns
threshold_columns
benchmark_columns
sensitive_columns
metric_availability_columns
threshold_sources
benchmark_sources
```

Các field đã tồn tại từ phase trước và được tái sử dụng:

```text
metric_units
require_metric_units
sensitive_context_policy
require_sensitive_context_policy
```

Đã bổ sung Backend forwarding:

```text
aiStatusColumns -> status_columns
aiThresholdColumns -> threshold_columns
aiBenchmarkColumns -> benchmark_columns
aiSensitiveColumns -> sensitive_columns
aiMetricAvailabilityColumns -> metric_availability_columns
aiThresholdSources -> threshold_sources
aiBenchmarkSources -> benchmark_sources
```

## 2. Quyết định bổ sung

`metric_availability_columns` được thêm để biểu diễn quan hệ explicit giữa
metric và availability field.

Canonical use case:

```json
{
  "aiMetricAvailabilityColumns": {
    "engagement_score": "engagement_score_available"
  }
}
```

Điều này bảo toàn đồng thời hai sự thật trong `S-B02`:

- raw backend value `engagement_score = 0`;
- evidence status `engagement_score_available = false`.

Summarizer phase sau phải giữ raw `0` nhưng không được diễn giải nó thành
observed low engagement.

## 3. Mode boundary

Các field mới chỉ phục vụ internal summarizers của:

```text
task_aware_data_summarization
```

Mode:

```text
baseline_first_20_rows
```

không dùng `AISummaryConfig` để compact dữ liệu và không bị thay đổi bởi Task
3 này.

## 4. Phạm vi chưa thực hiện

- Chưa implement `_summarize_metric_snapshot`.
- Chưa thêm dispatch `metric_snapshot`.
- Chưa thêm self-test cho summarizer.
- Chưa migrate 5 task trong registry.
- Chưa regenerate runtime artifacts.

## 5. Verification

Đã pass:

- Python syntax compile cho `AIService/schemas.py` bằng bundled Python runtime.
- Pydantic smoke test khởi tạo `AISummaryConfig` với đủ field mới.
- Assertion cho metric availability, threshold source và benchmark source.
- `node --check` cho `Backend/src/controllers/ai.controller.js`.
- Backend forwarding smoke test xác nhận đúng sáu mapping:
  `aiStatusColumns`, `aiThresholdColumns`, `aiBenchmarkColumns`,
  `aiSensitiveColumns`, `aiMetricUnits` và `aiSensitiveContextPolicy`.
- `git diff --check` cho source files và tài liệu thuộc Task 3.

System `python` không có trong PATH của shell hiện tại, vì vậy validation Python
được chạy bằng bundled workspace runtime. Đây không phải lỗi implementation.

## 6. Gate cho phase tiếp theo

Task 3 hoàn thành khi:

- [x] Python request schema nhận đủ metadata.
- [x] Backend config builder forward đủ metadata.
- [x] Có explicit metric availability mapping.
- [x] Baseline mode không bị thay đổi.
- [ ] Summarizer implementation và self-test — thuộc task tiếp theo.
