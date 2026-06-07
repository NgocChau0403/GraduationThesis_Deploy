# Đặc tả phương pháp baseline: First 20 Rows

## 1. Mục đích
Tài liệu này đặc tả phương pháp baseline cũ dùng để nén dữ liệu analytics trước khi đưa vào AI explanation service.

Mục tiêu của tài liệu là:

- xác định rõ phương pháp cũ đã tồn tại trong lịch sử Git,
- mô tả cách phương pháp cũ hoạt động,
- nêu assumption nghiên cứu phía sau phương pháp,
- chỉ ra methodology bug của assumption đó,
- làm cơ sở so sánh với phương pháp mới `task_aware_data_summarization`.

Baseline này không phải là một phiên bản được "bịa lại" sau khi fix. Nó được lấy từ commit lịch sử của repo.

## 2. Phạm vi của baseline này
Baseline này chỉ mô tả tầng **AI prompt data summarization**, tức bước chuyển dữ liệu analytics result thành input cho prompt của AI explanation service.

Baseline này không đại diện cho toàn bộ hệ thống:

- không phải baseline của chart rendering,
- không phải baseline của SQL analytics logic,
- không phải baseline của frontend visualization,
- không phải baseline của model OpenAI,
- không phải baseline của toàn bộ AI explanation pipeline.

Nói ngắn gọn, baseline này trả lời câu hỏi:

```text
Trước khi fix, hệ thống đã nén dữ liệu đưa vào prompt AI như thế nào?
```

## 3. Tên phương pháp
`baseline_first_20_rows`

Tên này được dùng trong evaluation để phân biệt với phương pháp mới:

```text
baseline_first_20_rows
task_aware_data_summarization
```

## 4. Nguồn lịch sử
- Commit: `d0983c2c3d056827fc8abe8432a0a58669ab7fcf`
- File: `AIService/strategies/base.py`
- Function: `summarize_datasets(req, max_rows=20)`

Commit này là parent của commit `935313d`, trước khi hệ thống thêm các safe/task-aware prompt summarizers.

## 5. Input / Output contract
### Input
Method nhận một `ExplainRequest`, trong đó phần quan trọng là:

- `req.datasets`: dictionary/map, mỗi key là một dataset label.
- Mỗi value trong `req.datasets` là danh sách các row object.
- `max_rows`: số dòng tối đa lấy cho mỗi dataset, mặc định là `20`.

Ví dụ input khái niệm:

```json
{
  "datasets": {
    "withdrawal_signal_trend": [
      { "week_number": 1, "final_outcome": "Distinction", "avg_clicks": 197.44 },
      { "week_number": 2, "final_outcome": "Distinction", "avg_clicks": 134.42 }
    ]
  }
}
```

### Output
Method trả về một plain-text prompt section.

Với mỗi dataset block, output chứa:

- tên dataset,
- tổng số row của dataset,
- JSON của tối đa 20 row đầu tiên,
- suffix báo còn bao nhiêu row bị truncate nếu dataset có hơn 20 row.

Output này được đưa vào user prompt để AI sinh explanation.

## 6. Historical implementation
Đây là code gốc trong commit `d0983c2c3d056827fc8abe8432a0a58669ab7fcf`:

```python
@staticmethod
def summarize_datasets(req: ExplainRequest, max_rows: int = 20) -> str:
    """
    Converts datasets dict to a readable string for the user prompt.
    Truncates to max_rows to prevent token overflow.

    Example output:
      Dataset: score_over_time (12 rows)
      [{"week_due": 2, "avg_score": 74.5}, ...]
    """
    parts = []
    for label, rows in req.datasets.items():
        truncated = rows[:max_rows]
        suffix    = f"  [... {len(rows) - max_rows} more rows truncated]" \
                    if len(rows) > max_rows else ""
        parts.append(
            f"Dataset: {label} ({len(rows)} rows)\n"
            f"{json.dumps(truncated, indent=2)}{suffix}"
        )
    return "\n\n".join(parts)
```

## 7. Method behavior
Phương pháp baseline hoạt động như sau:

1. Duyệt từng dataset trong `req.datasets`.
2. Với mỗi dataset, lấy `rows[:20]`.
3. Serialize 20 row này thành JSON.
4. Nếu dataset có hơn 20 row, thêm thông báo số row đã bị truncate.
5. Ghép các dataset summary thành một text block.
6. Đưa text block đó vào prompt cho AI.

Phương pháp này không đọc metadata về task, target group, time column, metric column, comparison group, risk flag, hay reliability column.

## 8. Pseudo-code
```text
for each dataset block:
    total_rows = count(rows)
    selected_rows = first 20 rows
    serialized_rows = JSON(selected_rows)

    if total_rows > 20:
        append truncation message

return concatenated dataset summaries
```

Pseudo-code này mô tả phương pháp ở mức methodology, còn phần code ở trên là bằng chứng kỹ thuật từ Git history.

## 9. Vì sao baseline này từng hợp lý ở giai đoạn prototype
Phương pháp `rows[:20]` không phải là vô lý ngay từ đầu. Ở giai đoạn prototype, nó có một số ưu điểm thực tế:

- Giới hạn token để prompt không quá dài.
- Dễ implement và dễ debug.
- Cho AI nhìn thấy dữ liệu thật thay vì chỉ metadata.
- Có thể đủ dùng với dataset nhỏ hoặc task chỉ có vài row.
- Giảm rủi ro vượt context window hoặc tăng chi phí gọi model.

Vì vậy, baseline này là một điểm xuất phát hợp lý cho prototype, nhưng không đủ an toàn cho evaluation/thesis khi task trở nên đa dạng hơn.

## 10. Core assumption
Assumption chính của phương pháp là:

```text
20 dòng đầu tiên của mỗi dataset đủ đại diện cho AI explanation.
```

Assumption này ngầm coi thứ tự vật lý của row trong SQL output là tương đương với mức độ liên quan về mặt phân tích.

Đây là điểm yếu cốt lõi.

## 11. Methodology bug
Assumption trên không an toàn vì SQL output order có thể không khớp với mục tiêu phân tích của task.

Nếu SQL sort theo group, label, timestamp, rank, hoặc một field vận hành nào đó, 20 dòng đầu có thể:

- thuộc group không phải target,
- thiếu giai đoạn cuối của trend,
- thiếu high-severity risk flag,
- thiếu top/bottom evidence,
- thiếu denominator hoặc comparison group,
- thiếu outlier hoặc turning point quan trọng.

Đây là methodology bug, không phải UI bug:

- Chart vẫn có thể đúng vì frontend nhận full dataset.
- AI explanation có thể sai vì prompt chỉ nhận một lát cắt đầu tiên.
- AI có thể dùng số thật nhưng gắn vào sai ngữ cảnh phân tích.

Có thể tóm tắt bug này là:

```text
numeric values can be real,
but analytical context can be wrong.
```

## 12. Loại task bị ảnh hưởng
| Loại task | Mức rủi ro | Lý do |
|---|---|---|
| Single KPI / one-row summary | Low | Dataset thường chỉ có một hoặc vài row, nên `rows[:20]` ít gây mất evidence. |
| Small categorical summary | Medium | Có thể an toàn nếu số category ít, nhưng category quan trọng vẫn có thể nằm ngoài 20 row đầu. |
| Trend series | High | Ý nghĩa nằm ở shape toàn chuỗi, peak/trough/largest drop, không chỉ 20 điểm đầu. |
| Group comparison | High | Target group hoặc comparison group có thể không nằm trong 20 row đầu. |
| Risk flag | High | High-severity hoặc triggered flags có thể bị omit nếu nằm sau non-triggered rows. |
| Ranking | High | Top/bottom evidence có thể sai nếu SQL output không sort đúng theo metric cần giải thích. |
| Distribution lớn | Medium/High | Tail group, dominant group, hoặc focus category có thể bị thiếu. |
| Correlation | High | AI cần coefficient, sample size, missingness, outlier; raw first rows không đủ để kết luận. |

Bảng này giải thích vì sao việc fix nên ưu tiên grouped/trend/risk/ranking/correlation tasks thay vì sửa toàn bộ cùng lúc.

## 13. Known failure modes
Các failure mode chính của `baseline_first_20_rows`:

- Target group xuất hiện sau các group khác trong SQL order.
- Late trend collapse nằm ngoài 20 time points đầu.
- High-severity risk flags nằm sau các row non-triggered.
- Top/bottom ranking evidence bị omit.
- Category quan trọng hoặc tail group bị thiếu.
- AI nhìn thấy raw sample nhưng không có aggregate statistics.
- AI kết luận dựa trên sample order thay vì task intent.
- Prompt có suffix báo truncate, nhưng suffix không cho AI biết phần bị truncate chứa evidence gì.

## 14. Case thất bại A-G14
Task `A-G14` tập trung vào early withdrawal signal. Mục tiêu phân tích là nhóm `Withdrawn` và so sánh với các nhóm không withdrawn như `Pass` hoặc `Distinction`.

### Expected target evidence
AI explanation nên nhìn thấy:

- engagement pattern của nhóm `Withdrawn` theo tuần,
- so sánh giữa `Withdrawn` và non-withdrawn groups,
- điểm bắt đầu divergence giữa các nhóm,
- tuần mà engagement của `Withdrawn` rơi mạnh,
- reliability hoặc `student_count` để tránh kết luận mạnh từ sample quá nhỏ.

### Baseline risk
Nếu SQL output được order theo:

```sql
ORDER BY final_outcome, week_number
```

thì các row đầu có thể thuộc `Distinction` trước khi đến `Withdrawn`.

Khi đó, baseline `rows[:20]` có thể đưa cho AI behavior của nhóm học tốt thay vì nhóm withdrawal.

Rủi ro chính là:

```text
AI explanation có thể numerically grounded but task-irrelevant.
```

Tức là số liệu AI dùng có thể đúng, nhưng số đó không trả lời đúng câu hỏi của task.

### Consequence
AI có thể:

- mô tả engagement pattern của `Distinction` như thể đó là withdrawal signal,
- chọn sai turning point,
- đưa recommendation lệch thời điểm can thiệp,
- tạo explanation có vẻ hợp lý nhưng sai trọng tâm nghiên cứu.

Đây là dạng lỗi nguy hiểm vì người đọc khó phát hiện nếu chỉ nhìn thấy text explanation mà không kiểm tra prompt input.

## 15. Replacement method
Phương pháp thay thế là:

```text
task_aware_data_summarization
```

Phương pháp mới không nén dữ liệu theo row order vật lý, mà nén theo ý nghĩa phân tích của task.

Tùy loại task, summary mới có thể bao gồm:

- target group,
- comparison groups,
- first/last point,
- peak/trough,
- largest drop/rise,
- triggered risk flags,
- category distribution,
- top/bottom evidence,
- sample size,
- reliability warnings,
- missing group/category warnings.

## 16. Evaluation criteria
Baseline `baseline_first_20_rows` sẽ được so sánh với `task_aware_data_summarization` bằng cùng task, cùng dataset, cùng model/settings và cùng rubric.

Các tiêu chí đánh giá đề xuất:

- `Faithfulness`: explanation có bám đúng dữ liệu được cung cấp không.
- `Correctness`: kết luận có đúng với full dataset/task intent không.
- `Evidence relevance`: evidence có liên quan đến câu hỏi phân tích không.
- `Target-group coverage`: target group có xuất hiện trong input summary không.
- `Trend coverage`: summary có bao phủ first/last/peak/trough/largest change không.
- `Risk coverage`: high-risk hoặc triggered evidence có được ưu tiên không.
- `Actionability`: recommendation có bám đúng evidence và thời điểm can thiệp không.
- `Safety/fairness`: explanation có tránh overclaim hoặc gán nhãn thiếu căn cứ không.

## 17. Baseline log fields
Khi chạy evaluation, log cho baseline nên chứa tối thiểu các field sau:

```json
{
  "method": "baseline_first_20_rows",
  "source_commit": "d0983c2c3d056827fc8abe8432a0a58669ab7fcf",
  "source_file": "AIService/strategies/base.py",
  "source_function": "summarize_datasets(req, max_rows=20)",
  "max_rows": 20,
  "dataset_label": "...",
  "total_rows": 100,
  "included_rows": 20,
  "truncated_rows": 80,
  "input_summary_type": "raw_first_20_rows",
  "task_id": "...",
  "evaluation_notes": "..."
}
```

Những field này giúp nối tài liệu baseline với debug/evaluation script sau này.

## 18. Evaluation use
Baseline này dùng để chứng minh improvement của phương pháp mới theo logic:

```text
Old method -> unsafe assumption -> observed/possible failure -> new method -> comparison evidence
```

Trong thesis, baseline này có thể dùng làm:

- phương pháp đối chứng,
- mô tả limitation của prototype cũ,
- bằng chứng cho methodology-level fix,
- nền để so sánh output AI trước/sau.

## 19. Git workflow safety
Branch/worktree baseline là archive của phương pháp lịch sử. Không merge toàn bộ baseline branch vào branch `Evaluation`.

Nếu cần tài liệu này ở branch `Evaluation`, chỉ copy hoặc cherry-pick riêng file:

```text
Docs/evaluation/ai_explanation_method/BASELINE_FIRST_20_ROWS_SPEC.md
```

Không merge toàn bộ branch baseline vì có thể kéo code cũ vào, gây conflict hoặc rollback nhầm phần task-aware summarization đã fix.
