# AI Summary Method Switch Implementation Plan

## Summary
Phase này triển khai method switch trên branch `Evaluation` mà không revert code task-aware hiện tại. Hệ thống chạy mặc định `task_aware_data_summarization`, và có thể bật baseline `baseline_first_20_rows` qua env để so sánh thesis.

Phase này tập trung so sánh AI prompt input summaries, chưa đánh giá chất lượng AI response/rubric.

## Key Changes
### AIService
- Giữ dispatcher task-aware hiện có trong `AIService/strategies/base.py`.
- Thêm selector tối thiểu đọc `AI_SUMMARY_METHOD`.
- Accepted values:
  - `task_aware_data_summarization`
  - `baseline_first_20_rows`
- Env rỗng hoặc invalid fallback về `task_aware_data_summarization` và ghi warning.
- Thêm baseline method giữ prompt text gần format lịch sử:

```text
Dataset: label (N rows)
[
  {...}
]  [... X more rows truncated]
```

- Structured metadata tách riêng khỏi prompt body:
  - `ai_summary_method`
  - `ai_summary_version`
  - `input_summary_type`
  - `baseline_available`
  - optional `ai_summary_method_warning`
- `summary_debug_payload` chỉ dùng cho debug/evaluation hoặc explicit debug output, không render frontend và không bắt buộc trả về production response.
- Với task-aware, nếu summary không có `summary_type`, đặt `input_summary_type = "task_aware_summary"`.

### API Schema And Degraded Response
- Thêm top-level fields vào `ExplainResponse`:
  - `ai_summary_method`
  - `ai_summary_version`
  - `baseline_available`
  - `input_summary_type`
  - optional `ai_summary_method_warning`
- Success response:
  - baseline: `baseline_first_20_rows`, version `baseline`, input type `raw_first_20_rows`
  - task-aware: `task_aware_data_summarization`, version `v1`, input type từ summary thật hoặc fallback `task_aware_summary`
- Degraded response từ Python vẫn trả metadata dựa trên selector nếu request vào được Python.

### Config
- Cập nhật `AIService/.env.example`:

```env
AI_SUMMARY_METHOD=task_aware_data_summarization
```

- Không chỉnh `AIService/.env` vì file này bị gitignore và có thể chứa secret.
- Khi đổi `.env`, cần restart AIService.

### Backend, Swagger, Frontend
- Không đổi Prisma schema vì `structured_output` đã lưu full response.
- Backend fallback khi Python unavailable dùng metadata trung thực:
  - `ai_summary_method: "unavailable"`
  - `ai_summary_version: "unavailable"`
  - `input_summary_type: "unavailable"`
  - `baseline_available: true`
- Swagger examples thêm metadata mới ở success/degraded examples.
- Frontend footer hiển thị:
  - `AI Summary Method: task_aware_data_summarization v1`
  - `AI Summary Method: baseline_first_20_rows baseline`
  - hoặc `AI Summary Method: unavailable`
- Frontend không render `summary_debug_payload`.

### Evaluation/Debug
- Mở rộng `AIService/debug_ai_summary.py`:
  - `--method baseline_first_20_rows`
  - `--method task_aware_data_summarization`
  - `--compare-methods --task A-G14`
  - optional `--write-log`
- `--method` override `AI_SUMMARY_METHOD` trong phạm vi script run, không cần sửa `.env` hoặc restart service.
- Phase này chỉ so sánh input summary, chưa gọi model.
- Khi `--write-log`, ghi JSON vào:
  - `Docs/evaluation/ai_explanation/baseline_first_20/`
  - `Docs/evaluation/ai_explanation/task_aware_summary/`

## Test Plan
- Chạy các self-test hiện có:
  - `python AIService/debug_ai_summary.py --self-test`
  - `python AIService/debug_ai_summary.py --self-test-categorical`
  - `python AIService/debug_ai_summary.py --self-test-risk-flags`
  - `python AIService/debug_ai_summary.py --self-test-trend-series`
- Thêm baseline self-test: dataset 25 rows phải giữ prompt text theo format cũ, include đúng 20 rows, truncate 5 rows.
- Method comparison:
  - `A-G14 --method baseline_first_20_rows`: prompt text format lịch sử, chỉ chứa first 20 rows.
  - `A-G14 --method task_aware_data_summarization`: summary có `target_group = Withdrawn`.
  - `S-T01` hoặc `A-G11`: task-aware vẫn sort/tính trend đúng.
- API verification:
  - `/health`
  - `/explain` với baseline env
  - `/explain` với task-aware env
  - invalid env fallback warning
- Frontend verification:
  - Click `Get AI Explanation`
  - Footer hiển thị `AI Summary Method`
  - Python unavailable hiển thị unavailable trung thực.

## Constraints
1. `summary_debug_payload` không render frontend và chỉ dùng cho debug/evaluation hoặc explicit debug output.
2. Task-aware summary thiếu `summary_type` thì dùng `input_summary_type = "task_aware_summary"`.
3. `debug_ai_summary.py --method` override env trong phạm vi script run.
4. Giữ changes tối thiểu, không rewrite prompt logic không liên quan.
5. Không merge baseline branch/worktree vào `Evaluation`.
