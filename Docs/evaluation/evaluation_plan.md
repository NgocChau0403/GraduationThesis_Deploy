# Kế Hoạch Evaluation Chi Tiết

Tài liệu này dùng cho nhóm khi triển khai evaluation cho prototype thesis. Mục tiêu là biến yêu cầu của thầy thành các bước làm cụ thể: chạy gì, lưu log gì, tạo groundtruth ra sao, so sánh thế nào, và cuối cùng báo cáo metric nào.

## 1. Ý Tưởng Chính

Evaluation của hệ thống sẽ kiểm tra theo 3 cấp độ:

| Cấp độ | Ý nghĩa | Ví dụ |
|---|---|---|
| Chạy được | Hệ thống chạy không lỗi | Import không crash, API trả JSON, chart render được |
| Chạy đúng | Kết quả hệ thống khớp groundtruth | Query trả đúng số dòng, đúng cột, đúng value |
| Chạy tốt | Kết quả hữu ích và đủ tin cậy | Insight có ý nghĩa, AI không bịa, latency chấp nhận được |

Với mỗi phần, nhóm sẽ làm theo quy trình:

```text
1. Chạy hệ thống tự động
2. Lưu automatic log
3. Tạo groundtruth bằng kiểm tra tay / SQL độc lập / Python notebook
4. So sánh automatic log với groundtruth
5. Tính metrics
6. Viết report ngắn
```

## 2. Folder Làm Evaluation

Tạo cấu trúc này trong project:

```text
Docs/evaluation/
  evaluation_plan.md

  automatic_logs/
    import_auto.json
    profiling_mapping_auto.json
    task_availability_auto.json
    task_outputs_auto.json
    api_contract_auto.json
    visualization_auto.json
    ai_explanations_auto.json
    early_warning_auto.json
    performance_auto.json

  groundtruth_logs/
    import_groundtruth.json
    profiling_mapping_groundtruth.json
    task_availability_groundtruth.json
    task_outputs_groundtruth.json
    visualization_groundtruth.json
    ai_explanations_groundtruth.json
    early_warning_groundtruth.json

  comparison_results/
    import_comparison.json
    profiling_mapping_metrics.csv
    task_availability_metrics.csv
    sql_correctness_metrics.csv
    api_contract_metrics.csv
    visualization_metrics.csv
    ai_explanation_rubric_scores.csv
    statistical_validity_metrics.csv
    early_warning_metrics.csv
    performance_metrics.csv
    metrics_summary.json

  scripts/
    README.md
```

Report đọc cho người/thesis để ở folder riêng:

```text
Docs/evaluation_reports/
  import_evaluation.docx
  profiling_mapping_evaluation.docx
  task_availability_evaluation.docx
  sql_correctness_evaluation.docx
  api_contract_evaluation.docx
  visualization_evaluation.docx
  ai_explanation_evaluation.docx
  statistical_validity_evaluation.docx
  early_warning_evaluation.docx
  coverage_human_utility_evaluation.docx
  performance_evaluation.docx
  final_evaluation_summary.docx
```

Nếu nhóm viết bằng Google Docs, folder `Docs/evaluation_reports/` có thể chỉ chứa `README.md` ghi link tài liệu.

Quy ước:

| Folder | Chứa gì | Format nên dùng | Mục đích |
|---|---|---|---|
| `automatic_logs/` | Output thô do hệ thống tự chạy | JSON | Làm evidence ban đầu |
| `groundtruth_logs/` | Kết quả đúng đã verify | JSON/CSV | Làm đáp án so sánh |
| `comparison_results/` | Kết quả so sánh và metrics raw | JSON/CSV | Dùng cho script, audit, tính toán |
| `scripts/` | Script chạy evaluation | JS/Python/SQL | Tự động hóa |
| `Docs/evaluation_reports/` | Báo cáo diễn giải cho người đọc | DOCX/PDF/Google Docs/Markdown | Dùng viết thesis/proposal |

Nói ngắn gọn: `Docs/evaluation/` dùng cho dữ liệu và script để tính toán; `Docs/evaluation_reports/` dùng cho tài liệu đọc và đưa vào thesis.

## 3. Scope Evaluation

| Hạng mục | Scope nên làm |
|---|---|
| Dataset | UCI MAT, UCI POR, OULAD |
| Task automatic run | Chạy toàn bộ task trong registry nếu có thể |
| Task verify | Light-check toàn bộ task đã chạy; deep-check 15-20 task đại diện |
| AI explanation | Chọn khoảng 30 explanation để chấm rubric |
| Visualization | Kiểm tra đủ các chart adapter chính |
| Early warning | Làm trên OULAD với Week 4, Week 8, Week 12 |
| Performance | Đo import time, query latency, AI latency, cost |

Lưu ý quan trọng:

```text
Automatic run: chạy toàn bộ dataset x task để có log đầy đủ.
Light manual/code check: kiểm tra toàn bộ task ở mức chạy được + output schema + status đúng/sai rõ ràng.
Deep manual verification: chọn 15-20 task đại diện để recompute chi tiết từng dòng/cột/value.
```

Cách này vẫn bám ý thầy là có log cho toàn bộ hệ thống, nhưng giữ khối lượng manual verification ở mức khả thi. Nếu thầy yêu cầu strict hơn, nhóm có thể mở rộng deep-check cho toàn bộ task sau.

## 3.1. Đối Chiếu Với Note Của Thầy

Plan này cần bám vào 4 ý chính thầy đã note:

| Yêu cầu của thầy | Cách plan này đáp ứng |
|---|---|
| Đánh giá 3 cấp độ: chạy được, chạy đúng, chạy tốt | Mỗi phần đều có mục tiêu runnable/correct/good. |
| Kiểm tra mọi bước trong pipeline | Plan đi theo đúng pipeline: profiling, mapping, import, canonicalization, task availability, SQL, API contract, visualization, AI, early warning, performance. |
| So sánh system automatic output với groundtruth | Mỗi phần đều yêu cầu lưu `automatic_log`, tạo `groundtruth_log`, sinh `comparison_results`, rồi viết report trong `Docs/evaluation_reports/`. |
| Hệ thống phải tổng quát theo canonical schema | Evaluation dùng UCI/OULAD như test cases đại diện, nhưng metrics kiểm theo canonical tables, capabilities, registry tasks, output schema, không hardcode theo một dataset cụ thể. |

## 3.2. Đối Chiếu Với Kiến Trúc Hệ Thống

| Stage trong kiến trúc | Phần evaluation tương ứng | Cần kiểm tra tối thiểu |
|---|---|---|
| CSV Dataset | Import & Data Conversion | File tồn tại, đọc được, row count đúng |
| Import & Profiling | Profiling & Mapping | Delimiter, column type, dataset type, file role |
| Mapping Confirmation | Profiling & Mapping | Mapping confirmed đúng canonical field |
| Canonical Schema Normalization | Import & Data Conversion | 8 bảng canonical có data đúng, FK đúng |
| Feature Engineering | Import & Data Conversion / SQL Correctness | Feature như `pass_flag`, `week_of_class`, `log_click_score` đúng |
| Task Availability Validation | Task Availability | Status task, warning, confidence đúng |
| SQL Analytics Execution | SQL Analysis Correctness | Output query khớp groundtruth |
| API Response with Named Datasets | API Response Contract | `datasets`, `meta`, `query_labels`, `output_schema` đúng |
| ChartRenderer + Adapter | Visualization Correctness | Adapter map đúng data sang chart data |
| Chart / Table / AI Insight | Visualization + AI Explanation | Chart đúng data, AI faithful/actionable/safe |

## 4. Bảng Plan Tổng Hợp

| STT | Phần cần evaluate | Mục tiêu | Automatic log cần lưu | Groundtruth tạo bằng gì | Metrics | Output cuối |
|---:|---|---|---|---|---|---|

| 1 | Import & Data Conversion | Kiểm tra raw CSV vào canonical schema đúng không | Raw row count, canonical count, inserted rows, FK errors, duplicate errors, import time | SQL đếm dòng, kiểm FK, kiểm duplicate, so raw CSV | Row count preservation, FK integrity, duplicate rate, null/range validity, import time | `comparison_results/import_comparison.json` + `Docs/evaluation_reports/import_evaluation.docx` |
| 2 | Profiling & Mapping | Kiểm tra detect file và mapping đúng không | Delimiter, dataset type, file role, suggested mapping, confidence | Bảng mapping chuẩn do nhóm kiểm tra | Delimiter accuracy, file role accuracy, mapping precision/recall, manual correction rate | `comparison_results/profiling_mapping_metrics.csv` + `Docs/evaluation_reports/profiling_mapping_evaluation.docx` |
| 3 | Task Availability | Kiểm tra task bật/tắt đúng theo data không | TaskId, status, missing requirements, warnings, confidence | Expected capability matrix cho UCI/OULAD | Accuracy, precision, recall, F1, false enable/disable rate | `comparison_results/task_availability_metrics.csv` + `Docs/evaluation_reports/task_availability_evaluation.docx` |
| 4 | SQL Analysis Correctness | Kiểm tra kết quả task có recompute được không | TaskId, params, output datasets, row/column/value, execution time | SQL độc lập hoặc Python notebook | Task accuracy, row/column/value match, numerical error, schema match | `comparison_results/sql_correctness_metrics.csv` + `Docs/evaluation_reports/sql_correctness_evaluation.docx` |
| 5 | API Response Contract | Kiểm tra response backend đúng format không | success, datasets, meta, query_labels, dataQuality, errors | Đối chiếu với output_schema trong task registry | API success rate, output contract pass rate, named dataset correctness | `comparison_results/api_contract_metrics.csv` + `Docs/evaluation_reports/api_contract_evaluation.docx` |
| 7 | AI Explanation | Kiểm tra AI giải thích đúng, hữu ích, an toàn không | AI input, AI output, degraded, latency, model, token usage | Rubric chấm 1-5 bởi người kiểm tra | Faithfulness, correctness, actionability, safety, novelty, diversity, understandability | `comparison_results/ai_explanation_rubric_scores.csv` + `Docs/evaluation_reports/ai_explanation_evaluation.docx` |
| 8 | Statistical Validity | Kiểm tra pattern có ý nghĩa hay chỉ là noise | Task result cho trend/comparison/correlation/risk | Python notebook hoặc SQL thống kê | p-value, effect size, robustness | `comparison_results/statistical_validity_metrics.csv` + `Docs/evaluation_reports/statistical_validity_evaluation.docx` |
| 9 | Early-Warning Utility | Kiểm tra cảnh báo sớm có dự đoán fail/withdraw không | Risk result tại Week 4/8/12 | So với final_result OULAD | Precision, recall, F1, lead time, false positive/negative | `comparison_results/early_warning_metrics.csv` + `Docs/evaluation_reports/early_warning_evaluation.docx` |
| 10 | Coverage & Human Utility | Kiểm tra task taxonomy/insight có đủ rộng và người dùng thấy hữu ích không | Task categories, user role, generated insights, rubric scores | Checklist taxonomy + người đánh giá chấm | Coverage rate, diversity, educator usefulness rating | `comparison_results/coverage_human_utility_metrics.csv` + `Docs/evaluation_reports/coverage_human_utility_evaluation.docx` |
| 11 | System Performance | Kiểm tra hệ thống đủ nhanh/rẻ không | Timestamp, latency, timeout, token usage, cost | Tổng hợp log hệ thống | Import time, query latency, AI latency, cost, failure rate | `comparison_results/performance_metrics.csv` + `Docs/evaluation_reports/performance_evaluation.docx` |

## 5. Hướng Dẫn Làm Từng Phần

## Phần 1: Profiling & Mapping

### Mục tiêu

Kiểm tra hệ thống có hiểu đúng file CSV không: delimiter, dataset type, file role, column type, mapping.

### Việc cần làm

1. Chạy upload/profile cho UCI/OULAD hoặc dùng sample profiling nếu có script.
2. Lưu kết quả detect:
   - delimiter
   - dataset type
   - file role
   - column type
   - mapping suggestion
   - confidence
3. Tạo bảng mapping groundtruth.
4. So sánh mapping hệ thống suggest với mapping đúng.

### Mapping groundtruth ví dụ

| Raw column | Canonical field |
|---|---|
| `id_student` | `student_id` |
| `score` | `score_normalized` |
| `sum_click` | `engagement_count` |
| `date_submitted` | `submission_day` |
| `G1/G2/G3` | assessment score fields |

### Metrics

| Metric | Cách hiểu |
|---|---|
| Delimiter accuracy | Đoán đúng dấu phân cách CSV không |
| Dataset type accuracy | Đoán đúng UCI/OULAD/custom không |
| File role accuracy | Đoán đúng vai trò file không |
| Mapping precision | Mapping hệ thống suggest có bao nhiêu cái đúng |
| Mapping recall | Mapping đúng cần có thì hệ thống tìm được bao nhiêu |
| Manual correction rate | Bao nhiêu mapping phải sửa tay |

## Phần 2: Import & Data Conversion

### Mục tiêu

Kiểm tra dữ liệu CSV gốc sau khi import có được đưa đúng vào các bảng canonical không.

Phần này bao phủ nhiều bước con trong kiến trúc:

```text
CSV Dataset
-> Import
-> Canonical Schema Normalization
-> Feature Engineering
-> Insert PostgreSQL
-> ImportBatch / Active Dataset
```

### Việc cần làm

1. Chạy seed hoặc import UCI/OULAD.
2. Ghi lại số dòng raw từ từng file.
3. Ghi lại số dòng trong từng bảng canonical.
4. Kiểm tra lỗi khóa ngoại.
5. Kiểm tra duplicate.
6. Kiểm tra null/range bất thường.
7. Kiểm tra một số feature được tính trong pipeline:
   - `pass_flag`
   - `week_of_class`
   - `registration_lead_time`
   - `log_click_score`
   - UCI composite features nếu có
8. Kiểm tra `ImportBatch` và `AppState`:
   - batch được tạo đúng
   - `row_count` đúng
   - `status = completed`
   - active dataset đúng

### Automatic log cần có

```json
{
  "dataset": "OULAD",
  "raw_rows": {
    "studentInfo.csv": 32593,
    "studentAssessment.csv": 173912,
    "studentVle.csv": 10655280
  },
  "canonical_rows": {
    "student": 28785,
    "enrollment": 32593,
    "assessment_result": 173912,
    "engagement": 10655280
  },
  "fk_errors": 0,
  "duplicate_errors": 0,
  "null_range_errors": 0,
  "feature_checks": {
    "pass_flag_errors": 0,
    "week_of_class_errors": 0,
    "registration_lead_time_errors": 0,
    "log_click_score_errors": 0
  },
  "batch_status": "completed",
  "active_dataset_id": "SAMPLE_OULAD",
  "import_time_ms": 0
}
```

### Groundtruth

Groundtruth được tạo bằng:

- Đếm trực tiếp raw CSV.
- Dùng SQL đếm bảng canonical.
- Dùng SQL kiểm FK và duplicate.
- Kiểm tra logic đặc biệt như OULAD có 32,593 enrollment nhưng chỉ có 28,785 unique student vì một student có thể học nhiều module/presentation.

### Metrics

| Metric | Cách hiểu |
|---|---|
| Row count preservation | Số dòng quan trọng có giữ đúng không |
| Entity completeness | Các entity cần có được tạo đủ không |
| FK integrity | Có khóa ngoại treo không |
| Duplicate rate | Có dữ liệu trùng không |
| Null/range validity | Có dữ liệu thiếu hoặc sai khoảng không |
| Feature correctness | Các feature được tính trong pipeline có đúng không |
| Batch activation correctness | ImportBatch/AppState có đúng không |
| Import time | Import mất bao lâu |

### Report cần viết

```text
Dataset | Raw rows | Canonical rows | FK errors | Duplicate errors | Result
OULAD   | ...      | ...            | 0         | 0                | Pass
UCI MAT | ...      | ...            | 0         | 0                | Pass
UCI POR | ...      | ...            | 0         | 0                | Pass
```

## Phần 3: Task Availability

### Mục tiêu

Kiểm tra hệ thống có bật/tắt đúng task dựa trên dữ liệu hiện có không.

Phần này cần kiểm tra đúng logic validator trong hệ thống, không chỉ kiểm tra danh sách task bật/tắt.

Các nhóm logic cần log:

```text
Layer A: structural / registry contract
Layer B: dataset capability
Layer C: analytical requirement
Layer D: data sufficiency and confidence
```

### Việc cần làm

1. Lấy danh sách toàn bộ task trong `taskRegistry.json`.
2. Chạy validator cho từng task với UCI và OULAD.
3. Lưu automatic log gồm:
   - taskId
   - status
   - layer_results
   - requiredCapabilities
   - availableCapabilities
   - missing requirements
   - warnings
   - confidence
4. Tạo capability matrix groundtruth.
5. So sánh task nào đúng/sai.

### Groundtruth capability matrix ví dụ

| Capability | OULAD | UCI |
|---|---|---|
| assessment_scores | Có | Có |
| final_outcome | Có | Có |
| engagement_tracking | Có | Không |
| temporal_activity | Có | Không |
| demographic_context | Có | Có |
| lifestyle_context | Không | Có |

### Metrics

| Metric | Cách hiểu |
|---|---|
| Accuracy | Tổng thể bao nhiêu task được phân loại đúng |
| Precision | Task hệ thống bật thì thật sự chạy được không |
| Recall | Task đáng lẽ chạy được có được bật không |
| F1 | Điểm cân bằng giữa precision và recall |
| False enable rate | Bật nhầm task thiếu data |
| False disable rate | Tắt nhầm task đủ data |
| Warning correctness | Warning có phản ánh đúng vấn đề dữ liệu không |
| Confidence correctness | HIGH/MEDIUM/LOW có hợp lý với data sufficiency không |

### Ví dụ lỗi cần phát hiện

| Loại lỗi | Ví dụ |
|---|---|
| False enable | UCI bị bật task cần `engagement_tracking` dù không có clickstream |
| False disable | OULAD bị tắt task engagement dù có `studentVle.csv` |
| Sai warning | Trend task chỉ có 1 time point nhưng không có warning |
| Sai confidence | Class có quá ít student nhưng vẫn báo HIGH confidence |

## Phần 4: SQL Analysis Correctness

### Mục tiêu

Kiểm tra kết quả phân tích có tính lại được từ dữ liệu nguồn không.

Đây là phần trả lời trực tiếp câu hỏi của thầy:

```text
Can every reported insight be recomputed from source data?
```

### Việc cần làm

1. Chạy `/api/analytics/run` cho task executable.
2. Lưu output JSON.
3. Chọn 15-20 task đại diện để verify sâu.
4. Viết SQL độc lập hoặc Python notebook để tính lại.
5. So sánh:
   - số dòng
   - số cột
   - tên cột
   - value
   - thứ tự ranking nếu task có ranking
   - metric tổng hợp như avg, count, rate
6. Kiểm tra query có bị scope sai dataset/class không:
   - `batch_id` phải đúng active dataset
   - `class_id` phải đúng class đang chọn
   - task student phải đúng `student_id` / `enrollment_id`
7. Kiểm tra guardrail:
   - query không trả quá nhiều dòng ngoài ý muốn
   - query timeout được log đúng
   - lỗi SQL được báo đúng format

### Task nên chọn để verify sâu

| Nhóm task | Ví dụ |
|---|---|
| Student basic | `S-B01`, `S-B02` |
| Student trend | `S-T01`, `S-T03` |
| Student risk | `S-B03` |
| Admin basic | `A-B01`, `A-B02` |
| Comparison | `A-C01`, `A-C02` |
| Cohort | `A-G01`, `A-G03`, `A-G05` |
| Engagement | OULAD-only engagement tasks |

### Metrics

| Metric | Cách hiểu |
|---|---|
| Task correctness accuracy | Bao nhiêu task đúng toàn bộ |
| Row match rate | Bao nhiêu dòng khớp groundtruth |
| Column match rate | Bao nhiêu cột khớp groundtruth |
| Value match rate | Bao nhiêu giá trị khớp groundtruth |
| Numerical error | Sai số số học |
| Output schema match rate | Output có đúng schema task yêu cầu không |
| Scope correctness | Query có đúng batch/class/student không |
| Ranking correctness | Thứ tự ranking có đúng không |
| Query latency | Query chạy mất bao lâu |

### Coverage task taxonomy

Ngoài kiểm tra từng task đúng/sai, cần kiểm tra hệ thống có bao phủ đủ taxonomy task không, tránh chỉ chọn các pattern dễ.

Tạo bảng coverage:

| Nhóm task | Tổng số task | Đã chạy automatic | Đã verify sâu | Pass rate |
|---|---:|---:|---:|---:|
| Student basic | ... | ... | ... | ... |
| Student trend | ... | ... | ... | ... |
| Student risk | ... | ... | ... | ... |
| Admin basic | ... | ... | ... | ... |
| Cohort | ... | ... | ... | ... |
| Comparison | ... | ... | ... | ... |
| Engagement | ... | ... | ... | ... |
| Demographic/contextual | ... | ... | ... | ... |

Metrics:

| Metric | Cách hiểu |
|---|---|
| Task coverage rate | Bao nhiêu % task taxonomy đã được chạy |
| Deep verification coverage | Bao nhiêu nhóm task có ít nhất một task được verify sâu |
| Pass rate by category | Từng nhóm task pass bao nhiêu % |

### Dung sai

```text
Numeric tolerance = ±0.001
```

## Phần 5: API Response Contract

### Mục tiêu

Kiểm tra API backend trả đúng format mà frontend cần.

### Việc cần làm

Với mỗi task response, kiểm tra có:

```text
success
datasets
meta
query_labels
dataQuality
required output_schema fields
warnings/errors đúng format
```

Ngoài ra cần kiểm tra:

```text
query_labels khớp với named datasets
meta.dataQuality có status/confidence/warnings
output_schema trong registry khớp columns trả về
unsupported task trả lỗi đúng
insufficient_data task vẫn trả warning đúng nếu hệ thống cho phép chạy
```

### Metrics

| Metric | Cách hiểu |
|---|---|
| API success rate | Bao nhiêu request trả success |
| Output contract pass rate | Bao nhiêu response đúng schema |
| Named dataset correctness | Tên dataset output có đúng query_labels không |
| Error handling correctness | Lỗi unsupported/insufficient có báo đúng không |
| Response size | Payload có quá lớn không |
| Data quality metadata correctness | `meta.dataQuality` có đúng status/confidence/warning không |

## Phần 6: Visualization Correctness

### Mục tiêu

Kiểm tra chart/table/card có hiển thị đúng output của query không.

### Việc cần làm

1. Lấy output từ API task.
2. Đưa qua chart adapter.
3. Lưu:
   - viz_type
   - adapter used
   - input rows
   - chart data rows
   - skipped rows
   - diagnostics
4. Verify:
   - line chart có đúng số point
   - bar chart có đúng số bar
   - table có đúng row/column
   - card có đúng value
   - label/trục đúng
   - null được xử lý đúng

### Metrics

| Metric | Cách hiểu |
|---|---|
| Rendering success rate | Chart render được bao nhiêu lần |
| Chart-data consistency | Chart data có khớp query output không |
| Adapter correctness | Adapter map field đúng không |
| Label correctness | Label/trục có đúng không |
| Chart type appropriateness | Loại chart có phù hợp task không |
| Null handling correctness | Null/missing value có xử lý đúng không |

## Phần 7: AI Explanation Quality

### Mục tiêu

Kiểm tra AI explanation có đúng, hữu ích và an toàn không.

AI chỉ là lớp giải thích, không phải lớp tính toán. Vì vậy AI không được bịa số liệu hoặc nói ngoài dữ liệu.

### Việc cần làm

1. Chọn khoảng 30 explanation:
   - 10 student-level
   - 10 admin/cohort
   - 5 comparison
   - 5 trend/risk
2. Lưu automatic log:
   - input datasets
   - task metadata
   - AI response
   - degraded status
   - latency
   - model
   - token usage nếu có
3. Chấm bằng rubric 1-5.

### Rubric chấm điểm

| Tiêu chí | Câu hỏi kiểm tra |
|---|---|
| Faithfulness | AI có bám sát data không |
| Correctness | AI có nói sai số liệu không |
| Pedagogical relevance | Insight có ý nghĩa giáo dục không |
| Actionability | Người dùng có biết nên làm gì tiếp không |
| Novelty | AI có thêm diễn giải hữu ích không hay chỉ lặp lại chart |
| Diversity | Các insight có bị trùng ý không |
| Fairness/safety | AI có tránh kết luận demographic thiếu căn cứ không |
| Understandability | Explanation có dễ hiểu không |
| Human utility | Giáo viên/advisor/admin có thấy insight hữu ích không |

### Metrics

| Metric | Cách hiểu |
|---|---|
| Average faithfulness | Điểm faithfulness trung bình |
| Average correctness | Điểm correctness trung bình |
| Average actionability | Điểm actionability trung bình |
| Unsafe claim rate | Tỷ lệ explanation có claim không an toàn |
| Hallucination rate | Tỷ lệ explanation nói ngoài data |
| Human usefulness rating | Điểm hữu ích trung bình do người đánh giá chấm |
| Relevance rating | Điểm relevance trung bình do người đánh giá chấm |
| Degraded handling rate | AI lỗi thì fallback có đúng không |
| AI latency | AI sinh explanation mất bao lâu |
| AI cost | Chi phí mỗi explanation |

### Người đánh giá

Nếu có điều kiện, nên mời ít nhất 2-3 người đóng vai educator/advisor/admin để chấm một tập nhỏ explanation. Nếu không có educator thật, nhóm vẫn có thể dùng rubric nội bộ và ghi rõ limitation.

## Phần 8: Statistical Validity

### Mục tiêu

Kiểm tra pattern như trend, comparison, correlation, risk có ý nghĩa hay chỉ là nhiễu.

Không phải task nào cũng cần p-value. Task mô tả thì ghi rõ là descriptive analytics.

### Việc cần làm

Chỉ áp dụng cho task có:

```text
trend
comparison
correlation
risk pattern
```

### Test gợi ý

| Loại pattern | Test nên dùng |
|---|---|
| Trend | Linear regression slope |
| Comparison | t-test hoặc Mann-Whitney |
| Correlation | Pearson hoặc Spearman |
| Categorical association | Chi-square |
| Risk prediction | Precision, recall, F1 |

### Metrics

| Metric | Cách hiểu |
|---|---|
| p-value | Pattern có ý nghĩa thống kê không |
| effect size | Mức độ khác biệt/tác động lớn hay nhỏ |
| robustness | Pattern có ổn định khi đổi sample/time window không |

### Quy tắc viết report

Với mỗi task, ghi rõ:

```text
Task này là descriptive hay inferential.
Nếu inferential thì dùng test gì.
Nếu descriptive thì không claim causality/significance.
```

## Phần 9: Early-Warning Utility

### Mục tiêu

Kiểm tra hệ thống có cảnh báo sớm được học sinh risk trước final outcome không.

Phần này nên làm với OULAD vì có dữ liệu theo thời gian và `final_result`.

### Việc cần làm

1. Chọn cutoff:

```text
Week 4
Week 8
Week 12
```

2. Chỉ dùng dữ liệu trước cutoff:

```text
engagement.event_day <= cutoff_day
assessment.due_day <= cutoff_day
```

3. Chạy risk heuristic hoặc risk task.

4. So với groundtruth:

```text
Fail / Withdrawn = at-risk
Pass / Distinction = not-at-risk
```

### Metrics

| Metric | Cách hiểu |
|---|---|
| Precision | Trong số học sinh bị cảnh báo, bao nhiêu người thật sự risk |
| Recall | Trong số học sinh thật sự risk, hệ thống bắt được bao nhiêu |
| F1-score | Cân bằng precision và recall |
| Lead time | Cảnh báo sớm trước bao lâu |
| False positive rate | Cảnh báo nhầm bao nhiêu |
| False negative rate | Bỏ sót bao nhiêu |

## Phần 10: System Performance

### Mục tiêu

Kiểm tra hệ thống có đủ nhanh và đủ khả thi để dùng như dashboard thật không.

### Việc cần làm

Ghi timestamp cho:

```text
import start/end
task validation start/end
SQL query start/end
chart adapter start/end
AI request start/end
```

### Metrics

| Metric | Cách hiểu |
|---|---|
| Import time | Import dataset mất bao lâu |
| Task validation latency | Check task availability mất bao lâu |
| Query execution latency | Task SQL chạy mất bao lâu |
| Visualization preparation time | Adapter chuẩn bị chart data mất bao lâu |
| AI latency | AI sinh explanation mất bao lâu |
| Token usage | Số token dùng |
| Cost per explanation | Chi phí mỗi explanation |
| Failure rate | Tỷ lệ lỗi |
| Timeout rate | Tỷ lệ timeout |

## Phần 11: Coverage & Human Utility

### Mục tiêu

Kiểm tra hệ thống không chỉ chạy vài task dễ, mà có bao phủ đủ task taxonomy và insight có ích với người dùng thật.

Phần này gom 2 ý thầy note:

```text
Coverage: hệ thống có cover task taxonomy không?
Human utility: educator/advisor/admin có thấy insight relevant, understandable, useful không?
```

### Việc cần làm

1. Phân loại toàn bộ task theo taxonomy:
   - student basic
   - student trend
   - student risk
   - admin basic
   - cohort
   - comparison
   - engagement
   - demographic/contextual
2. Đếm task ở mỗi nhóm.
3. Ghi task nào đã chạy automatic.
4. Ghi task nào đã verify sâu.
5. Lấy một tập insight/AI explanation đưa cho người đánh giá chấm.

### Metrics

| Metric | Cách hiểu |
|---|---|
| Task taxonomy coverage | Bao nhiêu nhóm task được cover |
| Task execution coverage | Bao nhiêu task đã được chạy automatic |
| Deep verification coverage | Bao nhiêu nhóm task có task được verify sâu |
| Insight diversity | Insight có đa dạng theo student/cohort/course/time không |
| Human relevance rating | Người đánh giá thấy insight liên quan không |
| Human understandability rating | Người đánh giá thấy dễ hiểu không |
| Human usefulness rating | Người đánh giá thấy hữu ích không |

### Report cần có

```text
Task group | Total tasks | Auto-run tasks | Deep-verified tasks | Pass rate
Student basic | ... | ... | ... | ...
Cohort | ... | ... | ... | ...
Comparison | ... | ... | ... | ...
```

```text
Explanation ID | Role | Relevance | Understandability | Usefulness | Notes
E01 | instructor | 4 | 5 | 4 | ...
```

## 6. Thứ Tự Làm Khuyến Nghị

Nên làm theo thứ tự này:

| Thứ tự | Việc làm | Lý do |
|---:|---|---|
| 1 | Profiling & mapping evaluation | Kiểm tra hệ thống hiểu file và mapping trước khi import |
| 2 | Import evaluation | Sau khi mapping đúng, kiểm tra dữ liệu vào canonical DB có đúng không |
| 3 | Task availability evaluation | Biết task nào đáng được chạy |
| 4 | SQL correctness evaluation | Kiểm tra lõi analytics |
| 5 | API contract evaluation | Đảm bảo backend-frontend khớp |
| 6 | Visualization evaluation | Chart phụ thuộc vào API output |
| 7 | AI explanation evaluation | AI phụ thuộc vào chart/query output |
| 8 | Statistical validity | Đánh giá pattern có đáng tin không |
| 9 | Early-warning utility | Đánh giá giá trị cảnh báo sớm |
| 10 | Coverage & human utility | Đánh giá độ phủ taxonomy và giá trị với người dùng |
| 11 | Performance summary | Tổng hợp tính khả thi thực tế |

## 7. Minimum Viable Evaluation

Nếu thời gian ít, làm bản tối thiểu trước:

| Ưu tiên | Việc phải làm |
|---:|---|
| 1 | Profiling & mapping correctness cho UCI + OULAD |
| 2 | Import correctness cho UCI + OULAD |
| 3 | Task availability precision/recall cho toàn bộ task |
| 4 | SQL correctness cho 15-20 task đại diện |
| 5 | API output contract check cho các task đã chọn |
| 6 | Visualization correctness cho các chart adapter chính |
| 7 | AI explanation rubric cho 30 examples |
| 8 | Coverage table cho task taxonomy |
| 9 | Performance latency cho import/query/AI |

Nếu còn thời gian, làm thêm:

| Mở rộng | Việc làm |
|---:|---|
| 1 | Statistical significance sâu hơn |
| 2 | Early-warning Week 4/8/12 |
| 3 | LLM-as-a-Judge để hỗ trợ chấm AI diện rộng |
| 4 | Human educator survey nếu có người đánh giá |

## 8. Checklist Khi Làm Report

Mỗi report nên có cùng format:

```text
1. Mục tiêu
2. Dataset dùng
3. Cách tạo automatic log
4. Cách tạo groundtruth
5. Metrics
6. Bảng kết quả
7. Các case sai hoặc mismatch
8. Nhận xét
9. Limitation
```

## 9. Đánh Giá Mức Độ Đúng Với Note Và Kiến Trúc

Checklist này dùng để tự kiểm trước khi đem plan đi triển khai:

| Câu hỏi kiểm tra | Trạng thái mong muốn |
|---|---|
| Có đủ 3 cấp độ chạy được / chạy đúng / chạy tốt không? | Có, áp dụng cho từng stage |
| Có automatic log cho từng stage không? | Có |
| Có groundtruth log cho từng stage quan trọng không? | Có |
| Có comparison result để máy đọc/tính metric không? | Có |
| Có report riêng để người đọc hiểu kết quả không? | Có, đặt trong `Docs/evaluation_reports/` |
| Có bao phủ UCI và OULAD không? | Có |
| Có bao phủ student view và admin view không? | Có qua task sampling |
| Có kiểm tra import, profiling, mapping, canonical schema không? | Có |
| Có kiểm tra task availability theo capability không? | Có |
| Có kiểm tra SQL output có recompute được không? | Có |
| Có kiểm tra API response contract không? | Có |
| Có kiểm tra chart adapter/rendering không? | Có |
| Có kiểm tra AI explanation không bịa, hữu ích, an toàn không? | Có |
| Có kiểm tra early-warning không? | Có, làm trên OULAD |
| Có kiểm tra coverage task taxonomy không? | Có |
| Có kiểm tra human utility không? | Có, bằng rubric/người đánh giá nếu có |
| Có kiểm tra performance/latency/cost không? | Có |
| Có thể chứng minh hệ thống tổng quát theo canonical schema không? | Có, vì metrics dựa trên canonical schema/capability/task registry thay vì hardcode dataset |

Nếu một dòng trong checklist này chưa có artifact tương ứng trong `automatic_logs`, `groundtruth_logs`, `comparison_results`, hoặc `Docs/evaluation_reports/`, nghĩa là phần đó chưa hoàn tất.

## 10. Câu Tóm Tắt Cho Nhóm

```text
Mình sẽ không chỉ test app chạy được.
Mình sẽ chạy hệ thống tự động, lưu log, tạo groundtruth độc lập, rồi so sánh hai bên.
Mỗi bước được đánh giá theo 3 mức: chạy được, chạy đúng, chạy tốt.
Trọng tâm là chứng minh kết quả analytics có thể tính lại từ dữ liệu nguồn, chart không bóp méo data, AI không bịa, và hệ thống đủ nhanh để dùng thực tế.
```
