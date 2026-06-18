# Phase 3 Report — Runtime Mismatch Recovery For S-T09, S-T14, S-T15

- Ngày thực hiện: 2026-06-18
- Dataset: `SAMPLE_UCI_POR`
- Class: `SAMPLE_UCI_POR_CLASS`
- Selected student: `SAMPLE_UCI_POR_STU_000001`
- Tasks: `S-T09`, `S-T14`, `S-T15`
- Phạm vi: SQL/request/runtime verification và artifact regeneration
- Không thực hiện: gắn `AiSummaryType`, implement `selected_entity_preservation`, chạy lại LLM Judge

## 1. Kết luận

Runtime mismatch đã được giải quyết cho cả ba task.

| Task | Dataset label mới | Full rows | Selected rows | Baseline artifact | Task-aware artifact |
|---|---|---:|---:|---|---|
| `S-T09` | `lifestyle_risk_scatter` | 649 | 1 | PASS | PASS |
| `S-T14` | `social_balance_scatter` | 649 | 1 | PASS | PASS |
| `S-T15` | `family_context_scatter` | 649 | 1 | PASS | PASS |

Root cause không phải SQL hoặc request parameters hiện tại. Root cause là artifacts V1 cũ đã stale và không còn đồng bộ với registry SQL hiện tại.

## 2. Artifact mismatch cũ

| Task | Label cũ | Row count cũ | Vấn đề |
|---|---|---:|---|
| `S-T09` | `lifestyle_data` | 1 | Chỉ có selected-student snapshot, không có cohort scatter |
| `S-T14` | `social_data` | 1 | Chỉ có selected-student snapshot, không có cohort scatter |
| `S-T15` | `family_data` | 1 | Chỉ có selected-student snapshot, không có cohort scatter |

Các labels và shapes này không khớp registry hiện tại:

```text
S-T09 → lifestyle_risk_scatter
S-T14 → social_balance_scatter
S-T15 → family_context_scatter
```

## 3. Kiểm tra SQL hiện tại

Ba SQL query hiện tại đều:

- aggregate `avg_score` cho toàn bộ student trong class;
- query toàn bộ `enrollment` của `:class_id`;
- không filter kết quả cuối chỉ còn `:student_id`;
- tạo marker:

```text
point_role
is_current_student
```

- sử dụng `:student_id` chỉ để đánh dấu selected student;
- trả metric correlation và `avg_score` cho cohort.

SQL hiện tại giống HEAD đối với ba task; Phase 3 không cần sửa SQL.

## 4. Kiểm tra request parameters

Direct API request sử dụng:

```json
{
  "batch_id": "SAMPLE_UCI_POR",
  "class_id": "SAMPLE_UCI_POR_CLASS",
  "student_id": "SAMPLE_UCI_POR_STU_000001",
  "enrollment_id": "SAMPLE_UCI_POR_ENR_000001"
}
```

Official full-matrix runner cũng dựng cùng nhóm params:

```text
batch_id
class_id
student_id
enrollment_id
s1
s2
```

Không phát hiện request-param mismatch.

## 5. Direct analytics API verification

Endpoint:

```text
POST /api/analytics/run
```

Kết quả:

| Task | HTTP/runtime result | Rows | Selected marker | Required columns |
|---|---|---:|---:|---|
| `S-T09` | success | 649 | 1 | `student_id`, `point_role`, `is_current_student`, `lifestyle_risk_score`, `avg_score` |
| `S-T14` | success | 649 | 1 | `student_id`, `point_role`, `is_current_student`, `social_balance_score`, `avg_score` |
| `S-T15` | success | 649 | 1 | `student_id`, `point_role`, `is_current_student`, `family_stability_score`, `avg_score` |

Selected row của cả ba task có:

```text
student_id = SAMPLE_UCI_POR_STU_000001
point_role = Selected student
is_current_student = true
```

## 6. Artifact regeneration

Official runner:

```text
Docs/evaluation_v1/scripts/runAIExplanationFullMatrixEvaluation.mjs
```

Runner đã được cập nhật path constants từ archive path cũ:

```text
Docs/evaluation/...
```

sang vị trí thực tế:

```text
Docs/evaluation_v1/...
```

Không thay đổi evaluation logic.

### Baseline

AIService được xác minh bằng response metadata:

```text
ai_summary_method = baseline_first_20_rows
input_summary_type = raw_first_20_rows
degraded = false
```

Cả ba retries:

```text
status = evaluated
observed_ai_summary_method = baseline_first_20_rows
mode_validation = pass
```

### Task-aware

AIService được xác minh bằng response metadata:

```text
ai_summary_method = task_aware_data_summarization
```

Cả ba retries:

```text
status = evaluated
observed_ai_summary_method = task_aware_data_summarization
input_summary_type = generic_fallback
mode_validation = pass
```

`generic_fallback` vẫn đúng với Phase 3 vì ba task chưa được phép gắn `AiSummaryType`.

## 7. Lưu ý baseline methodology

Registry SQL hiện sắp selected student ở row cuối:

```text
selected row index = 648
```

Do baseline chỉ gửi `rows[:20]`, baseline explanation không nhìn thấy selected-student row dù full analytics result và stored artifact có đủ 649 rows.

Đây là hạn chế của historical baseline, không phải runtime mismatch. Không đổi SQL order chỉ để cải thiện baseline, vì điều đó sẽ làm thay đổi historical baseline input semantics. Task-aware implementation sau này phải dùng `selected_entity_preservation`.

## 8. Trạng thái mapping sau Phase 3

Ba task được chuyển:

```text
runtime_blocked
→ requires_contract_extension
```

Proposed type vẫn là:

```text
correlation_evidence
```

Required extension:

```text
selected_entity_preservation
```

Riêng `S-T15` còn cần:

```text
sensitive_context_policy
```

Không task nào được cập nhật `AiSummaryType` trong registry ở Phase 3.

## 9. Definition of Done

- [x] Kiểm tra SQL hiện tại.
- [x] Kiểm tra request parameters.
- [x] Chạy analytics API trực tiếp.
- [x] Xác nhận cohort rows tồn tại.
- [x] Xác nhận đúng một selected student.
- [x] Regenerate baseline artifacts.
- [x] Regenerate task-aware artifacts.
- [x] Xác nhận mode metadata cho cả hai modes.
- [x] Giữ nguyên `AiSummaryType` của ba task.
- [x] Cập nhật canonical mapping.
