# AI Explanation Judge V2 - Kiểm tra pipeline hiện tại

- Ngày kiểm tra: 2026-06-18
- Giai đoạn: Phase 1 - Kiểm tra pipeline hiện tại
- Phạm vi: chỉ đọc source code và artifacts của pipeline V1, không chạy lại LLM judge
- Thư mục artifacts V1 đã kiểm tra: `Docs/evaluation_v1/ai_explanation_full_matrix/scored_reports/`
- File báo cáo hiện tại: `Docs/evaluation_v2/ai_explanation_judge_v2/current_pipeline_audit.md`

## 1. Tóm tắt kết quả

V1 đã có pipeline chấm điểm tự động và lưu khá đầy đủ score, rationale, judge input và judge output. Tuy nhiên, pipeline này chưa đủ đáng tin cậy để kết luận chính xác chất lượng AI explanation hoặc mức độ khác biệt giữa `baseline_first_20_rows` và `task_aware_data_summarization`.

Các nguyên nhân chính:

- LLM judge V1 không nhìn thấy full query result. Raw task detail có đầy đủ `analytics_request_response_if_called.response.datasets`, nhưng `judge_input` chỉ nhận `analytics_evidence.dataset_stats` và `analytics_evidence.data_evidence_preview`.
- `data_evidence_preview` chỉ chứa tối đa 5 rows cho mỗi dataset label, kể cả khi toàn bộ query result có không quá 20 rows. Vì vậy, judge V1 có thể không thấy hết dữ liệu ngay cả với những task có kết quả nhỏ.
- Judge input không có schema context từ task registry, chẳng hạn `output_schema`, `query_labels`, `sqlQuery`, `keyDbFields`, `sourceTables` và `aiPromptHint`.
- Prompt của judge V1 được hard-code trong runner. Artifacts chỉ lưu `judge_prompt_version`, không có một file prompt độc lập có thể dùng để chạy lại evaluation.
- Rubric V1 sử dụng thang điểm 1-5, không phải 1-10. Thang điểm này có độ phân giải thấp và dễ làm các khác biệt nhỏ trở thành tie.
- V1 chấm riêng từng explanation. Phần comparison chỉ aggregate và trừ điểm của hai scoring records sau khi đã chấm, thay vì để judge so sánh trực tiếp hai mode trong cùng một context có đầy đủ evidence.

Kết luận: V1 có thể được giữ làm baseline lịch sử, nhưng chưa đủ mạnh để chứng minh rằng LLM judge đã đánh giá chính xác sự khác biệt giữa hai phương pháp tạo AI explanation.

## 2. Các file và artifacts đã kiểm tra

| File / Artifact | Mục đích kiểm tra |
|---|---|
| `Docs/evaluation_v1/scripts/runAIExplanationScoringEvaluation.mjs` | Kiểm tra cách build judge input, prompt, scoring schema, validation, full scoring và comparison |
| `Docs/evaluation_v1/scripts/runAIExplanationFullMatrixEvaluation.mjs` | Kiểm tra cách task detail lưu raw analytics datasets và preview |
| `Docs/evaluation_v1/ai_explanation_full_matrix/scored_reports/full_scoring_records.jsonl` | Kiểm tra các field của scoring record |
| `Docs/evaluation_v1/ai_explanation_full_matrix/scored_reports/scoring_summary.json` | Kiểm tra số lượng records, judge model, prompt version và trạng thái scoring |
| `Docs/evaluation_v1/ai_explanation_full_matrix/scored_reports/scoring_manifest.actual.json` | Kiểm tra kết quả validation và expected/actual counts |
| `Docs/evaluation_v1/ai_explanation_full_matrix/scored_reports/*/*/judge_inputs/*.json` | Kiểm tra chính xác dữ liệu đã được cung cấp cho LLM judge V1 |
| `Docs/evaluation_v1/ai_explanation_full_matrix/scored_reports/*/*/judge_outputs/*.json` | Kiểm tra score, rationale và component scores |
| `Docs/evaluation_v1/ai_explanation_full_matrix/scored_reports/comparison/` | Kiểm tra comparison V1 là aggregate hay một lần judge mới |
| `AIService/strategies/base.py` | Kiểm tra cách hoạt động của baseline first-20 và task-aware summarization |
| `AIService/debug_ai_summary.py` | Kiểm tra công cụ debug và self-test của hai summary method |
| `Backend/src/config/taskRegistry.json` | Kiểm tra task metadata và schema đã có trong hệ thống nhưng chưa được đưa vào judge input |

Lưu ý: trong working tree hiện tại, các artifacts cũ được lưu dưới `Docs/evaluation_v1/`. Phase này không khôi phục, thay đổi hoặc chạy lại các artifacts V1.

## 3. Kết quả kiểm tra pipeline

| Hạng mục | Hiện tại có chưa | Ghi chú | Nguồn bằng chứng | Yêu cầu cho V2 |
|---|---|---|---|---|
| Full query result | Không | Raw task detail có full `response.datasets`, nhưng `judge_input` chỉ có `data_evidence_preview` và `dataset_stats`. | `compactAnalyticsEvidence`; sample judge input và raw task detail của `A-G14` | Thêm `full_query_results` hoặc `query_results_full` vào judge input V2 |
| Task metadata | Một phần | Có `record_id`, `dataset_id`, `task_id`, `task_name`, `target_role`, `taxonomy_groups`, `ai_summary_method` và `input_summary_type`, nhưng thiếu task intent đầy đủ. | `buildJudgeInput` | Thêm `task_metadata` gồm actionable question, analytics intent, target audience, strategy, AI prompt hint và summary type |
| Schema context | Không | Judge input không có `output_schema`, `query_labels`, `sourceTables`, `keyDbFields` hoặc `sqlQuery`. | `taskRegistry.json`; sample judge input | Thêm `schema_context` từ registry và actual result columns |
| Prompt được lưu thành file | Không | Prompt được hard-code trong `buildJudgeMessages`; artifact chỉ lưu `judge_prompt_version`. | `runAIExplanationScoringEvaluation.mjs` | Lưu exact prompt thành file độc lập, ví dụ `judge_prompt.md` |
| Hướng dẫn chấm trong prompt | Một phần | Prompt có yêu cầu evidence-bound và output schema, nhưng chưa hướng dẫn so sánh trực tiếp hai mode, phát hiện evidence bị bỏ sót hoặc phân tích theo row coverage. | `buildJudgeMessages` | Viết prompt V2 cụ thể, sắc bén và có quy tắc so sánh rõ ràng |
| Thang điểm | 1-5 | V1 yêu cầu score là số nguyên 1-5 hoặc `null`. | `buildJudgeMessages`; `scoring_methodology.md` | Đổi sang rubric 1-10 |
| Field trong `full_scoring_records.jsonl` | Một phần | Có score status, score, paths, flags, judge model, version và thời gian; chưa có row coverage, schema snapshot hoặc prompt path. | `full_scoring_records.jsonl` | Thêm row-count fields và các đường dẫn tới prompt/schema/evidence |
| Rationale trong `judge_outputs` | Có | Có `rationale`, `metric_rationale` và `component_scores.*.metric_rationale`. | Sample `judge_outputs/A-G14.json` | Giữ lại và mở rộng cho rubric 1-10 cùng comparative rationale |
| Row count | Một phần | Có `judge_input.analytics_evidence.dataset_stats[].row_count`, nhưng chưa có báo cáo thống kê và chưa ghi evidence coverage vào scoring record. | Sample judge input; thống kê toàn bộ artifacts | Thêm các field row count và coverage riêng |
| Nhận diện mode | Có | Có `ai_summary_method`, `input_summary_type`, `observed_ai_summary_method`, baseline record ID và task-aware record ID. | Judge input, scoring records và comparison records | Giữ lại và đưa cả hai mode vào cùng paired judge input |
| Xử lý full result ≤ 20 rows | Chưa đầy đủ | Có thể biết row count, nhưng judge preview vẫn có thể chỉ gồm 5 rows. Chưa có rule yêu cầu task-aware lấy toàn bộ data khi result ≤ 20 rows. | `compactDatasets`; thống kê artifacts | Khi full result ≤ 20 rows, judge và task-aware phải nhận toàn bộ rows |
| Phương pháp comparison | Một phần | Comparison V1 không gọi judge lại; nó aggregate các score đã có. | `comparison/scoring_methodology.md` | V2 nên chấm theo paired input cho cùng `dataset_id + task_id` |
| Khả năng tái lập | Một phần | Có model, temperature, prompt version, judge input và output; thiếu exact prompt file và quy trình Codex session mới. | Scoring summary và judge outputs | Lưu prompt, input contract, run procedure, model/config và session metadata |

## 4. Thống kê định lượng của V1

Thống kê được tính từ `full_scoring_records.jsonl` và toàn bộ 135 scored judge inputs:

| Chỉ số | Giá trị |
|---|---:|
| Tổng số scoring records | 208 |
| Scored records | 135 |
| Not-scoreable records | 73 |
| Judge inputs | 135 |
| Judge outputs | 135 |
| Judge inputs có `dataset_stats` | 135 |
| Judge inputs có `data_evidence_preview` | 135 |
| Judge inputs có full `datasets` | 0 |
| Judge inputs có schema context | 0 |
| Judge inputs có SQL hoặc query text | 0 |
| Judge inputs có task metadata cơ bản | 135 |
| Dataset labels có `row_count <= 20` | 110 |
| Dataset labels có `row_count > 20` | 29 |
| Scored records có tổng số full-result rows ≤ 20 | 106 |
| Scored records có tổng số full-result rows > 20 | 29 |
| Dataset labels có số preview rows nhỏ hơn `row_count` | 55 |

Các ví dụ mà judge V1 nhìn thấy ít rows hơn số rows thực tế:

| Record | Dataset label | Full row count | Số preview rows trong judge input |
|---|---|---:|---:|
| `SAMPLE_UCI_POR::A-B01::baseline_first_20_rows` | `score_distribution` | 10 | 5 |
| `SAMPLE_UCI_POR::A-C01::baseline_first_20_rows` | `trajectory_comparison` | 6 | 5 |
| `SAMPLE_UCI_POR::A-C04::baseline_first_20_rows` | `lifestyle_comparison` | 10 | 5 |
| `SAMPLE_UCI_POR::A-G13::baseline_first_20_rows` | `lifestyle_risk_scatter` | 649 | 5 |
| `SAMPLE_UCI_POR::S-T03::baseline_first_20_rows` | `peer_comparison` | 6 | 5 |

Diễn giải: V1 không chỉ thiếu full result đối với task lớn. Judge còn có thể không thấy hết data của những task nhỏ chỉ có từ 6 đến 20 rows. Vì vậy, V2 cần thống kê row count và áp dụng rule:

```text
Nếu full query result <= 20 rows:
  judge phải nhận toàn bộ rows
  task-aware data summarization phải sử dụng toàn bộ rows
```

## 5. Cấu trúc judge input hiện tại

Các top-level keys của judge input V1:

```text
record_id
dataset_id
task_id
task_name
target_role
taxonomy_groups
ai_summary_method
input_summary_type
readiness_summary
data_quality
analytics_evidence
ai_explanation
warnings
run_metadata
```

`analytics_evidence` hiện chỉ gồm:

```text
dataset_stats
data_evidence_preview
analytics_meta
```

Những nội dung còn thiếu:

```text
full_query_results
schema_context
query_labels
output_schema
sourceTables
keyDbFields
sqlQuery hoặc query description
aiPromptHint
actual result columns và data types
row coverage metadata
paired baseline/task-aware explanations trong cùng judge input
```

## 6. Cấu trúc judge output hiện tại

Judge output V1 có các field:

```text
record_id
judge_model
temperature
prompt_version
component_scores
overall_scores
flags
rationale
metric_rationale
limitation
judged_at
meta
```

`component_scores` gồm đúng bốn nhóm:

```text
summary
insights
educational_implications
recommendations
```

Mỗi component có:

```text
A_chay_dung
B_chay_hop_li
C_huu_ich
metric_scores
metric_rationale
```

Đây là phần có giá trị của V1 và nên được giữ trong V2. Tuy nhiên, cần đổi thang điểm, định nghĩa rubric rõ hơn và bổ sung comparative rationale.

## 7. Các field hiện có trong `full_scoring_records.jsonl`

V1 đang lưu:

```text
record_id
dataset_id
task_id
ai_summary_method
run_record_path
score_status
not_scored_reason
judge_input_path
judge_output_path
report_path
component_count
scored_component_count
scores
flags
judge_model
judge_temperature
judge_prompt_version
judged_at
```

V2 cần bổ sung:

```text
judge_prompt_path
judge_input_schema_version
full_query_result_row_count
judge_visible_row_count
baseline_visible_row_count
task_aware_evidence_row_count
is_full_result_within_20_rows
full_query_results_path hoặc embedded full_query_results
schema_context_path hoặc embedded schema_context
paired_comparison_record_id
comparative_scores
comparative_rationale
```

## 8. Cách hai AI summary method hiện đang hoạt động

Theo `AIService/strategies/base.py`:

- `baseline_first_20_rows` gọi `summarize_baseline_first_20_rows(req, max_rows=20)`.
- Dữ liệu đưa vào prompt baseline là `rows[:20]` của mỗi dataset.
- Debug payload của baseline có `row_count`, `included_row_count` và `truncated_row_count`.
- `task_aware_data_summarization` chọn summarizer nội bộ dựa trên `ai_summary_config.summary_type`.
- Hệ thống có đúng hai top-level methods:
  - `baseline_first_20_rows`
  - `task_aware_data_summarization`

Cần phân biệt:

- Model tạo explanation ở baseline có thể nhìn thấy tối đa 20 raw rows của mỗi dataset.
- Judge V1 không nhìn thấy cùng payload đó. Judge chỉ nhận `data_evidence_preview`, được full-matrix runner giới hạn riêng ở tối đa 5 rows mỗi dataset label.

Vì vậy, trong một số trường hợp, judge V1 còn nhìn thấy ít evidence hơn model đã tạo explanation.

## 9. Vì sao V1 chưa đủ tin cậy?

### 9.1. Judge không thể kiểm tra các evidence bị bỏ sót

Nếu task có 164 rows nhưng judge chỉ thấy 5 preview rows và một con số `row_count`, judge không thể biết explanation đã bỏ sót trend, group, outlier, ranking hoặc thay đổi ở cuối chuỗi dữ liệu hay chưa.

### 9.2. Judge không thể kiểm tra đầy đủ semantic correctness

Khi thiếu `output_schema`, `query_labels`, `keyDbFields`, field meaning và task intent, judge có thể chấp nhận những nhận định nghe hợp lý nhưng không được data contract hỗ trợ.

### 9.3. Judge không so sánh hai mode trong cùng một context

V1 chấm mỗi mode độc lập. Comparison report chỉ trừ các score sau khi chấm. Cách này yếu hơn việc đưa baseline explanation và task-aware explanation vào cùng một judge input, cùng task metadata, schema và full query result.

### 9.4. Prompt chưa được lưu thành artifact độc lập

Prompt có version nhưng đang nằm trong source code. Người đánh giá khác không thể chỉ lấy một file prompt đã freeze để mở Codex project mới và chạy lại evaluation.

### 9.5. Thang điểm 1-5 có độ phân giải thấp

Hai explanation có thể đều nhận điểm 4 dù một explanation cụ thể, faithful hoặc actionable hơn. Điều này làm tăng số tie và làm giảm khả năng quan sát cải thiện nhỏ.

### 9.6. Chưa phân loại kết quả theo row count

V1 chưa tách:

```text
full_query_result_rows <= 20
full_query_result_rows > 20
```

Khi toàn bộ query result có không quá 20 rows, baseline `rows[:20]` đã nhận toàn bộ data và có thể là input tối ưu. Kết quả của nhóm này không nên được diễn giải giống nhóm có hơn 20 rows.

## 10. Các field bắt buộc cho judge input V2

Judge input V2 tối thiểu nên có cấu trúc:

```json
{
  "judge_input_schema_version": "ai_explanation_judge_v2",
  "comparison_record_id": "...",
  "dataset_id": "...",
  "task_id": "...",
  "task_metadata": {
    "task_name": "...",
    "actionable_question": "...",
    "target_audience": [],
    "explanation_strategy": "...",
    "analytics": {},
    "ai_prompt_hint": "...",
    "ai_summary_type": "...",
    "taxonomy_groups": []
  },
  "schema_context": {
    "source_tables": [],
    "key_db_fields": [],
    "query_labels": [],
    "output_schema": {},
    "sql_query": "...",
    "actual_result_columns": []
  },
  "query_result_context": {
    "full_query_results": {},
    "full_query_result_row_count": 0,
    "dataset_row_counts": {},
    "is_full_result_within_20_rows": true,
    "result_truncated_for_judge": false
  },
  "mode_outputs": {
    "baseline_first_20_rows": {
      "ai_explanation": {},
      "input_summary_type": "raw_first_20_rows",
      "visible_row_count": 0,
      "generation_metadata": {}
    },
    "task_aware_data_summarization": {
      "ai_explanation": {},
      "input_summary_type": "...",
      "evidence_row_count": 0,
      "generation_metadata": {}
    }
  },
  "evaluation_instruction": {
    "score_scale": "1-10",
    "compare_modes_directly": true
  }
}
```

Judge output V2 nên có:

```text
điểm 1-10 riêng cho từng mode
comparative verdict cho từng metric
overall better mode
evidence coverage assessment
omitted evidence findings
unsupported claim findings
metric rationale
component rationale
row-count interpretation
limitations
```

## 11. Yêu cầu về reproducibility

Do Codex được sử dụng làm LLM-as-a-judge, mỗi lần evaluation chính thức cần:

1. Mở một Codex project mới.
2. Tạo một chat session mới.
3. Sử dụng đúng một prompt V2 đã được freeze và lưu thành file.
4. Cung cấp đầy đủ paired judge input cho từng task.
5. Không bổ sung instruction mới trong quá trình chấm.
6. Lưu prompt, judge input, judge output và metadata của lần chạy.
7. Ghi rõ ngày chạy, model, cấu hình và phiên bản prompt.

Mục tiêu là để một người khác có thể lấy cùng prompt và artifacts rồi thực hiện lại evaluation.

## 12. Definition of Done của Phase 1

Phase 1 đã trả lời được các câu hỏi đặt ra:

| Câu hỏi | Kết luận |
|---|---|
| Judge hiện tại có thấy full query result không? | Không |
| Judge hiện tại có thấy task metadata không? | Có một phần |
| Judge hiện tại có thấy schema không? | Không |
| Judge hiện tại dùng prompt nào? | Prompt hard-code trong `buildJudgeMessages`, version `phase3_1c_component_schema_hardened_v1` |
| Prompt có được lưu thành file độc lập không? | Không |
| Score hiện tại là 1-5 hay dạng khác? | 1-5 hoặc `null` |
| `full_scoring_records.jsonl` lưu field nào? | Đã liệt kê tại Mục 7 |
| `judge_outputs` có lưu rationale không? | Có, gồm overall, per-metric và per-component rationale |
| Có lưu row count không? | Có một phần trong `dataset_stats`, chưa có coverage fields và thống kê chính thức |
| Có biết mode baseline và task-aware không? | Có |

V2 cần bổ sung chính xác:

- Full query results.
- Task metadata đầy đủ.
- Schema context.
- Row-count và evidence-coverage metadata.
- Exact prompt được lưu thành file.
- Rubric 1-10.
- Paired baseline/task-aware judge input.
- Comparative scores, rationale và verdict.
- Quy trình chạy lại bằng Codex project/chat session mới.

