# Báo cáo validation 15 task được migrate sang task-aware summarizer

- Ngày validation: 2026-06-18
- Registry: `Backend/src/config/taskRegistry.json`
- Validator: `Docs/evaluation_v2/UpdateBerforeLLMv2/validate_migrated_task_summaries.py`
- Nguồn dữ liệu: full `analytics_request_response_if_called.response.datasets` trong runtime artifacts V1
- Phạm vi: kiểm tra data summarization; không gọi LLM và không chạy lại LLM-as-a-judge

## 1. Kết luận

Kết quả cuối:

| Metric | Kết quả |
|---|---:|
| Task đã migrate | 15 |
| Task pass | 15 |
| Task fail | 0 |
| Dataset cases được kiểm tra | 30 |
| Cases có analytics data và áp dụng được | 20 |
| Cases pass | 20 |
| Cases fail | 0 |
| Cases không áp dụng do `insufficient_data` hoặc `blocked` | 10 |
| Cases rơi về `generic_fallback` | 0 |
| Cases dùng `generic_diagnostic_sample` do config lỗi | 0 |
| Cases thiếu required/optional configured columns | 0 |

Tất cả 15 task đã tạo đúng `input_summary_type` theo cấu hình mới trên mọi actual dataset case có kết quả analytics thành công.

## 2. Tiêu chí validation

Một case chỉ được tính là pass khi:

1. Registry có đúng `aiSummaryType`.
2. `AISummaryConfig` được dựng thành công từ registry.
3. Summarizer chạy trực tiếp trên full datasets đã lưu trong runtime artifact.
4. `summary_type` quan sát được bằng loại mong đợi.
5. Không rơi về `generic_fallback`.
6. Không xuất hiện `generic_diagnostic_sample`.
7. Không có cảnh báo config incomplete, thiếu required column hoặc thiếu optional configured column.
8. Không có exception trong quá trình tạo summary.

Artifact có status `insufficient_data` hoặc `blocked` không chứa successful analytics dataset, vì vậy được ghi là `not_applicable`, không bị tính là validation failure.

## 3. Kết quả theo task

| Task | Summary type | Actual cases pass | Actual row counts đã kiểm tra | Kết quả |
|---|---|---:|---|---|
| `S-T02` | `ranking` | 2/2 | UCI: 3; OULAD: 5 | PASS |
| `S-T05` | `trend_series` | 1/1 | OULAD: 32 | PASS |
| `S-T06` | `trend_series` | 1/1 | OULAD: 32 | PASS |
| `S-T10` | `categorical_distribution` | 1/1 | OULAD: 9 | PASS |
| `A-B04` | `categorical_distribution` | 1/1 | OULAD: 3 | PASS |
| `A-S02` | `trend_series` | 2/2 | UCI: 3; OULAD: 5 | PASS |
| `A-S03` | `trend_series` | 1/1 | OULAD: 32 | PASS |
| `A-S05` | `ranking` | 2/2 | UCI: 3; OULAD: 5 | PASS |
| `A-G01` | `ranking` | 1/1 | OULAD: 2300 | PASS |
| `A-G03` | `ranking` | 2/2 | UCI: 50; OULAD: 50 | PASS |
| `A-G04` | `ranking` | 2/2 | UCI: 3; OULAD: 112 | PASS |
| `A-G06` | `ranking` | 1/1 | OULAD: 9 | PASS |
| `A-G07` | `ranking` | 1/1 | OULAD: 4 | PASS |
| `A-G09` | `correlation_evidence` | 1/1 | OULAD: 1875 | PASS |
| `A-G13` | `correlation_evidence` | 1/1 | UCI: 649 | PASS |

Việc `A-G01` pass với 2300 rows, `A-G09` với 1875 rows và `A-G13` với 649 rows xác nhận dispatcher không quay về generic summary khi input lớn.

## 4. Các chỉnh sửa phát sinh từ validation

### `A-G04`

Validation vòng đầu phát hiện `aiLabelColumns` có `assessment_order`, nhưng actual datasets đã lưu không chứa cột này. Vì đây chỉ là optional label và không cần cho ranking theo `fail_rate_pct`, field đã được bỏ khỏi config.

Sau chỉnh sửa:

- UCI: `ranking`, 3 rows, không còn missing-column warning.
- OULAD: `ranking`, 112 rows, không còn missing-column warning.

### `S-T10`

`pct_of_total` trong raw output có scale 0–1, trong khi contract `aiPercentColumn` hiện kỳ vọng tổng phần trăm khoảng 100. Không nhân hoặc normalize ngầm raw value.

Field này được chuyển sang `aiMetricColumns`. Kết quả:

- raw ratio 0–1 vẫn được giữ nguyên trong metric evidence;
- không còn cảnh báo percent scale;
- category ranking vẫn dùng `clicks`;
- `vle_diversity_score` và `forum_engagement_rate` vẫn được giữ.

## 5. Cảnh báo còn lại nhưng hợp lệ

Hai case correlation còn cảnh báo:

| Task | Cảnh báo | Đánh giá |
|---|---|---|
| `A-G09` | Không có p-value evidence | Safety guard hợp lệ; cấm claim statistical significance |
| `A-G13` | Không có p-value evidence | Safety guard hợp lệ; cấm claim statistical significance |

Hai cảnh báo này không biểu thị config lỗi hoặc thiếu required column. Chúng giữ cho explanation chỉ mô tả association/correlation và không overclaim significance.

## 6. Self-test

Các self-test liên quan đều pass:

```text
debug_ai_summary ranking self-test passed
debug_ai_summary trend_series self-test passed
debug_ai_summary categorical self-test passed
debug_ai_summary correlation_evidence self-test passed
```

## 7. Tám task được giữ lại để review

Các task sau không được gắn `aiSummaryType` trong lần migration này.

| Task | Actual output shape | Vì sao chưa dùng summarizer hiện có | Hướng xử lý |
|---|---|---|---|
| `A-C03` | 2 student risk rows, nhiều `flag_*` và risk metrics | `group_comparison` hiện không bảo toàn tốt per-student flags; `risk_flags` kỳ vọng mỗi row là một flag | Thiết kế risk-profile comparison hoặc mở rộng multi-metric comparison |
| `A-C05` | 2 student rows, nhiều background categorical/numeric fields | Một `group_column` và một `metric_column` không biểu diễn đầy đủ profile hai sinh viên | Dùng `multi_metric_comparison`; giữ demographic fields ở mức mô tả, không causal |
| `A-S06` | 5 assessment rows gồm delay, score, punctuality | `trend_series` chỉ mô tả chuỗi; task cần quan hệ lateness-score và punctuality evidence | Dùng multi-variable trend/correlation summary hoặc task-specific composite summary |
| `S-T08` | 5 assessment rows gồm delay và score | Sample nhỏ và cần kết hợp sequence với association; `correlation_evidence` hiện không phù hợp cho n=5 | Dùng lateness-impact summary có small-sample caveat |
| `S-T09` | V1 artifact chỉ có 1 selected-student row | Không đủ cohort scatter để đánh giá vị trí sinh viên hoặc association | Rerun analytics; chỉ migrate khi output thực sự chứa selected student và cohort |
| `S-T11` | 1988 cohort rows, có `is_selected_student` | `correlation_evidence` có thể chỉ giữ outliers và làm mất selected student cần giải thích | Mở rộng contract để luôn preserve selected entity và cohort context |
| `S-T14` | V1 artifact chỉ có 1 selected-student row | Không có cohort scatter như task intent mô tả | Rerun analytics và kiểm tra source/runtime mismatch trước migration |
| `S-T15` | V1 artifact chỉ có 1 selected-student row | Không có cohort association evidence; family context còn nhạy cảm | Rerun analytics; thêm selected-entity preservation và safety constraints |

## 8. Giới hạn của kết quả

- Validation dùng full analytics datasets đã lưu trong artifacts V1, sau đó chạy lại current summarizer code và current registry config.
- Validation chứng minh routing, config completeness và khả năng tạo structured summary.
- Validation chưa chứng minh explanation do LLM sinh ra tốt hơn baseline.
- Chưa nên chạy LLM Judge V2 cho đến khi quyết định phạm vi migration của 8 task còn lại và regenerate task-aware explanation outputs bằng registry mới.

## 9. Lệnh chạy lại

```powershell
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' `
  'C:\[Graduation_Thesis]Prototype\Docs\evaluation_v2\UpdateBerforeLLMv2\validate_migrated_task_summaries.py'
```

Exit code `0` nghĩa là không có registry error và mọi applicable case đều pass.
