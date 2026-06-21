# Đánh giá Hiệu năng Hệ thống

## 1. Mục tiêu

Phần đánh giá này đo hiệu năng runtime, độ ổn định, chi phí API và mức sử dụng tài nguyên của các luồng backend chính trong hệ thống Learning Analytics.

Phần này khác với Task Availability Evaluation:

- Task Availability Evaluation kiểm tra hệ thống phân loại task khả dụng/không khả dụng có đúng hay không.
- System Performance Evaluation đo hệ thống mất bao lâu để thực thi các request đại diện và các request đó có ổn định hay không.

Benchmark được chạy bằng:

[`systemPerformanceBenchmark.mjs`](../../../Backend/scripts/systemPerformanceBenchmark.mjs)

## 2. Môi trường thực nghiệm

| Hạng mục | Giá trị |
|---|---|
| Hệ điều hành | Windows 10, x64 |
| Bộ xử lý | 11th Gen Intel Core i5-1135G7 @ 2.40 GHz |
| Số bộ xử lý logic | 8 |
| Bộ nhớ | Khoảng 8 GB RAM |
| Node.js | v22.14.0 |
| Backend | `http://localhost:4000` |
| Chế độ thực thi | Tuần tự |
| Warm-up benchmark chính | 5 lần cho mỗi kịch bản |
| Số lần đo benchmark chính | 30 lần cho mỗi kịch bản |
| Warm-up benchmark AI | 2 lần cho mỗi kịch bản |
| Số lần đo benchmark AI | 10 lần cho mỗi kịch bản |
| Warm-up benchmark import | 2 lần |
| Số lần đo benchmark import | 10 lần |
| Request timeout | 120.000 ms |
| Phương pháp tính percentile | Nearest-rank |
| Resource sampling | Lấy mẫu CPU/RAM toàn hệ điều hành trong lúc chạy các lượt đo |

Thực nghiệm dùng PostgreSQL local và hai sample dataset UCI, OULAD giống phần đánh giá chức năng.

## 3. Các kịch bản được đánh giá

| Kịch bản | Dataset | Endpoint/task | Mục đích đo |
|---|---|---|---|
| Task Availability | UCI | `GET /api/tasks/available` | Kiểm tra toàn bộ 52 task công khai |
| Task Availability | OULAD | `GET /api/tasks/available` | Kiểm tra toàn bộ 52 task công khai |
| Simple Analytics | UCI | `A-B02` | Truy vấn tổng hợp kết quả học tập của cohort |
| Simple Analytics | OULAD | `A-B02` | Truy vấn tổng hợp kết quả học tập của cohort |
| Trend Analytics | UCI | `S-T01` | Phân tích xu hướng điểm của một sinh viên |
| Trend Analytics | OULAD | `S-T01` | Phân tích xu hướng điểm của một sinh viên |
| AI Explanation | UCI | `POST /api/ai/explain` cho `S-T01` | Độ trễ LLM explanation, token và chi phí API |
| AI Explanation | OULAD | `POST /api/ai/explain` cho `S-T01` | Độ trễ LLM explanation, token và chi phí API |
| Import Pipeline | UCI | `/api/import/profile` → `/api/import/confirm-mapping` → `/api/import/run` | Profile CSV thật, confirm mapping, import database và cleanup |
| Import Pipeline | OULAD | Sample reseed + PostgreSQL bulk load cho `studentVle.csv` | Import đầy đủ OULAD với file clickstream lớn |

Benchmark import UCI được lặp 10 lần vì dataset đủ nhỏ để đo ổn định trên API path. OULAD full import được đo 1 lần như một benchmark import dài riêng vì file OULAD `studentVle.csv` có hơn 10 triệu raw rows và chiếm phần lớn runtime.

## 4. Simple Analytics – A-B02 đo gì?

Task `A-B02` có tên:

```text
Completion / outcome summary
```

Task trả lời:

```text
Có bao nhiêu sinh viên passed, failed, withdrew hoặc achieved a distinction?
```

Hệ thống đọc bảng `enrollment`, lọc theo `class_id`, nhóm sinh viên theo `final_outcome`, đếm số sinh viên trong từng nhóm, tính phần trăm của lớp và trả JSON cho visualization.

Kịch bản này đại diện cho nhóm truy vấn aggregation cơ bản.

## 5. Trend Analytics – S-T01 đo gì?

Task `S-T01` có tên:

```text
Score trend analysis
```

Task trả lời:

```text
Điểm của một sinh viên đang cải thiện hay giảm theo thời gian?
```

Task này phức tạp hơn A-B02 vì dùng join assessment, benchmark theo lớp, pass/target threshold, `REGR_SLOPE`, support label và output dạng time series.

Kịch bản này đại diện cho nhóm analytics phức tạp có CTE, JOIN, benchmark và tính xu hướng.

## 6. Vì sao chọn các kịch bản này?

Các kịch bản được chọn để bao phủ các đường chạy runtime chính:

| Khu vực | Lý do quan trọng |
|---|---|
| Task Availability | Đo validator kiểm tra toàn bộ task registry và capabilities |
| Simple Analytics | Đo truy vấn SQL aggregation nhẹ |
| Trend Analytics | Đo workflow SQL analytics phức tạp hơn |
| AI Explanation | Đo lớp LLM bên ngoài, gồm token usage và cost |
| Import Pipeline | Đo luồng ingest dữ liệu thật có thay đổi database |
| CPU/RAM sampling | Ghi nhận áp lực tài nguyên trong lúc chạy các lượt đo |

Thời gian đo bao gồm xử lý backend, thực thi PostgreSQL, trả HTTP response và độ trễ AI service bên ngoài đối với kịch bản AI. Thời gian này không bao gồm frontend chart rendering hoặc browser page loading.

## 7. Quy trình đo

Đối với các kịch bản backend chính:

1. Chạy 5 request warm-up và không đưa vào thống kê.
2. Chạy tuần tự 30 request đo chính thức.
3. Ghi thời gian bắt đầu và kết thúc bằng `performance.now()`.
4. Ghi HTTP status, kích thước response, thời gian xử lý, kết quả validation response và một số server metrics.
5. Lấy mẫu CPU và RAM trong lúc chạy measured runs.
6. Tự động tính summary metrics.
7. Ghi raw results và summaries vào JSON logs.

Đối với AI Explanation:

1. Chạy 2 request warm-up.
2. Chạy 10 request đo chính thức cho mỗi dataset.
3. Ghi latency, degraded status, model name, prompt tokens, completion tokens, total tokens và estimated cost.

Đối với Import Pipeline:

1. Chạy 2 lượt import warm-up.
2. Chạy 10 lượt import đo chính thức.
3. Mỗi lượt import dùng API thật: profile CSV, confirm mapping, run import.
4. Benchmark dùng các mapping hợp lệ đã được accept và bỏ qua `absence_count` vì strict validator và transform layer hiện đang không thống nhất scope của field này.
5. Sau mỗi iteration, benchmark xóa temporary `PERF_*` import batch, xóa upload session và restore `app_state`.
6. Kiểm tra database sau khi chạy xác nhận `perfImportBatchCount = 0`.

Đối với OULAD full import:

1. Benchmark dùng optimized sample reseed path thay vì interactive upload wizard.
2. Các bảng canonical không phải engagement được import trước.
3. File clickstream lớn `studentVle.csv` được load bằng PostgreSQL bulk loading và transform thành các dòng canonical `engagement`.
4. CPU/RAM được lấy mẫu trong lúc chạy measured run.
5. Kết quả đo được ghi vào một JSON performance log riêng vì đây là kịch bản chạy lâu.

Các request benchmark có header:

```http
x-performance-benchmark: true
```

Header này ngăn các lượt benchmark sinh thêm evaluation evidence logs phụ. Logic nghiệp vụ được đo vẫn chạy bình thường.

## 8. Các chỉ số đánh giá

| Chỉ số | Ý nghĩa |
|---|---|
| Average response time | Thời gian trung bình của các request đo thành công |
| P50 latency | Trung vị thời gian request thành công |
| P95 latency | Percentile 95 theo nearest-rank |
| Maximum latency | Request thành công chậm nhất trong measured runs |
| Throughput | Số request thành công tuần tự chia cho wall-clock time |
| Error rate | Số request lỗi hoặc không hợp lệ chia cho tổng số request |
| CPU percent | Mức dùng CPU toàn hệ điều hành được lấy mẫu trong measured runs |
| RAM percent | Mức dùng bộ nhớ toàn hệ điều hành được lấy mẫu trong measured runs |
| AI tokens/cost | Token usage và estimated cost do AI service trả về |
| Import rows/sec | Số input rows import chia cho thời gian import end-to-end |

Throughput ở đây là throughput tuần tự, không phải throughput của concurrent load test.

## 9. Kết quả thực nghiệm

### 9.1. Hiệu năng backend và analytics

Raw evidence:

[`system_performance_20260619T103232Z_5b5d39.json`](system_performance_20260619T103232Z_5b5d39.json)

| Kịch bản | Dataset | Số lần | Average (ms) | P50 (ms) | P95 (ms) | Maximum (ms) | Throughput (req/s) | Error Rate |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Task Availability | UCI | 30 | 841.282 | 785.171 | 1,249.040 | 1,275.836 | 1.187 | 0% |
| Task Availability | OULAD | 30 | 28,790.822 | 26,130.289 | 31,048.256 | 91,670.026 | 0.035 | 0% |
| Simple Analytics | UCI | 30 | 16.761 | 16.021 | 26.149 | 37.832 | 59.003 | 0% |
| Simple Analytics | OULAD | 30 | 66.890 | 62.630 | 102.880 | 115.171 | 14.926 | 0% |
| Trend Analytics | UCI | 30 | 59.235 | 41.613 | 71.140 | 548.506 | 16.839 | 0% |
| Trend Analytics | OULAD | 30 | 107.205 | 106.259 | 138.737 | 139.987 | 9.317 | 0% |

### 9.2. CPU/RAM trong benchmark backend và analytics

| Kịch bản | Dataset | Avg CPU (%) | Peak CPU (%) | Avg RAM (%) | Peak RAM (%) |
|---|---|---:|---:|---:|---:|
| Task Availability | UCI | 34.764 | 78.036 | 90.053 | 92.895 |
| Task Availability | OULAD | 28.915 | 100.000 | 84.842 | 96.287 |
| Simple Analytics | UCI | 44.338 | 49.600 | 84.861 | 84.902 |
| Simple Analytics | OULAD | 36.520 | 45.518 | 86.730 | 87.201 |
| Trend Analytics | UCI | 23.665 | 43.867 | 85.814 | 86.534 |
| Trend Analytics | OULAD | 23.842 | 28.330 | 85.712 | 85.852 |

### 9.3. Hiệu năng AI Explanation

Raw evidence:

- [`system_performance_20260619T105017Z_82af79.json`](system_performance_20260619T105017Z_82af79.json)
- [`system_performance_20260619T105144Z_bd7433.json`](system_performance_20260619T105144Z_bd7433.json)

| Kịch bản | Dataset | Số lần | Average (ms) | P50 (ms) | P95 (ms) | Maximum (ms) | Total tokens | Estimated cost (USD) | Error Rate |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| AI Explanation | UCI | 10 | 5,733.360 | 5,731.914 | 6,284.419 | 6,284.419 | 18,142 | 0.004909 | 0% |
| AI Explanation | OULAD | 10 | 6,075.344 | 5,961.053 | 7,420.751 | 7,420.751 | 21,084 | 0.005332 | 0% |

AI service trả về model `gpt-4o-mini-2024-07-18` trong các lượt đo.

### 9.4. Hiệu năng Import Pipeline

Raw evidence:

- [`system_performance_20260619T105308Z_276275.json`](system_performance_20260619T105308Z_276275.json)
- [`system_performance_20260619T205853Z_ab8bde.json`](system_performance_20260619T205853Z_ab8bde.json)

| Kịch bản | Dataset | Số lần | Average (ms) | P50 (ms) | P95 (ms) | Maximum (ms) | Avg rows/sec | Error Rate |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Import Pipeline | UCI | 10 | 2,408.664 | 2,161.472 | 4,413.060 | 4,413.060 | 289.229 | 0% |
| Import Pipeline | OULAD | 1 | 1,028,042.561 | 1,028,042.561 | 1,028,042.561 | 1,028,042.561 | 10,364.629 | 0% |

Thời gian trung bình theo từng bước:

| Bước | Average time (ms) |
|---|---:|
| CSV profile | 132.779 |
| Confirm mapping | 100.316 |
| Import run | 2,156.124 |

UCI import benchmark xử lý 6.490 input rows trong 10 lượt import đo chính thức.

Chi tiết OULAD full import:

| Metric | Giá trị |
|---|---:|
| Raw `studentVle.csv` rows | 10,655,280 |
| Canonical `engagement` rows inserted | 8,459,320 |
| Total canonical rows after import | 8,701,209 |
| Engagement bulk phase | 832,697 ms, khoảng 13.88 phút |
| Full OULAD import duration | 1,028,042.561 ms, khoảng 17.13 phút |
| Average CPU during run | 55.851% |
| Peak CPU during run | 100.000% |
| Average RAM during run | 88.545% |
| Peak RAM during run | 96.842% |

## 10. Phân tích kết quả

### 10.1. Độ ổn định

Toàn bộ các kịch bản benchmark final đều không có lỗi trong measured runs:

```text
Backend/analytics: 180 measured requests, 0 failures
AI Explanation: 20 measured requests, 0 failures
Import Pipeline: 11 measured imports, 0 failures
```

### 10.2. Task Availability

Task Availability trên OULAD là bottleneck backend chính. Kịch bản này trung bình khoảng 28,79 giây, trong khi UCI trung bình khoảng 0,84 giây.

OULAD cũng có một latency spike lớn khoảng 91,67 giây. Spike này được giữ nguyên trong raw log vì đó là hành vi đo thật. Nguyên nhân có thể liên quan đến database contention, garbage collection, operating-system scheduling hoặc tiến trình nền khác.

### 10.3. Analytics execution

Simple Analytics chạy nhanh trên cả hai dataset. Trend Analytics chậm hơn Simple Analytics vì có join, benchmark lớp và tính xu hướng, nhưng lượt đo OULAD trend cuối cùng vẫn ổn định với P95 dưới 140 ms.

### 10.4. AI Explanation

AI Explanation chậm hơn SQL analytics đáng kể vì có gọi LLM bên ngoài. Latency trung bình khoảng 5,7–6,1 giây. Estimated cost cho 20 measured AI calls là khoảng USD 0.010241.

### 10.5. Import Pipeline

UCI import pipeline trung bình khoảng 2,41 giây cho mỗi lượt import. Phần lớn thời gian nằm ở bước import run, không phải profiling hoặc mapping confirmation. Cleanup thành công sau benchmark: không còn import batch `PERF_*` trong database.

OULAD full import hoàn tất thành công trong khoảng 17.13 phút. Lượt chạy này import file raw clickstream 10.65 triệu dòng và tạo ra 8.46 triệu dòng canonical engagement. Kết quả này nhanh hơn đáng kể so với hành vi import khoảng một giờ trước đó và khá sát target thực tế 15 phút trên máy local dùng trong đánh giá này.

### 10.6. Resource usage

CPU đôi lúc đạt 100%, đặc biệt trong OULAD Task Availability, AI calls và import. RAM luôn ở mức cao vì máy đang chạy backend, database, AI service và development tools. Resource metrics là số liệu toàn hệ điều hành, không phải số liệu tách riêng cho process backend.

## 11. Nội dung của Performance Log

Final evidence set giữ các performance log sau:

| Log file | Vai trò evidence |
|---|---|
| `system_performance_20260619T103232Z_5b5d39.json` | Backend, task availability, simple analytics, trend analytics và CPU/RAM sampling |
| `system_performance_20260619T105017Z_82af79.json` | Hiệu năng AI Explanation cho UCI |
| `system_performance_20260619T105144Z_bd7433.json` | Hiệu năng AI Explanation cho OULAD |
| `system_performance_20260619T105308Z_276275.json` | Benchmark import pipeline UCI được lặp nhiều lần |
| `system_performance_20260619T205853Z_ab8bde.json` | Benchmark OULAD full import thành công |

Các benchmark log bị lỗi hoặc log nháp đã được xóa khỏi thư mục evidence cuối cùng để thư mục chỉ còn các log được dùng trong tài liệu đánh giá này.

Mỗi JSON performance log chứa:

| Phần | Nội dung |
|---|---|
| `schema_version`, `run_id`, timestamps | Định danh lần chạy và thời điểm bắt đầu/kết thúc |
| `methodology` | Số warm-up, số measured runs, timeout, percentile method, resource sampling, AI/import inclusion |
| `environment` | OS, CPU, memory, Node.js, backend URL |
| `scenarios` | Một object cho mỗi kịch bản được đo |
| `request` | Endpoint, method, task ID, parameters hoặc import source file |
| `warmup_results` | Kết quả warm-up, được giữ lại nhưng không dùng để tính thống kê |
| `requests` | Các request đo chính thức |
| `summary` | Average, P50, P95, max, throughput và error rate được tính tự động |
| `resource_summary` | CPU/RAM trung bình và peak trong measured runs |
| `resource_samples` | Các mẫu CPU/RAM có timestamp |
| `server_metrics` | Metric riêng theo kịch bản như query count, AI tokens/cost hoặc import rows/sec |
| `cleanup_protocol` | Có trong kịch bản import; mô tả việc xóa batch/session và restore app-state |

Các giá trị summary được tính trực tiếp từ mảng measured requests, không nhập tay.

## 12. Hạn chế

- Thực nghiệm chỉ được chạy trên một máy cá nhân.
- Request được chạy tuần tự, không phải concurrent load test.
- CPU/RAM metrics là số liệu toàn hệ điều hành, không tách riêng process backend.
- AI cost là estimated cost do pricing logic của AI service trả về.
- OULAD full import được đo 1 lần vì dataset có file clickstream rất lớn và mỗi lượt chạy mất khoảng 17 phút.
- Tiến trình nền, trạng thái PostgreSQL và OS scheduling có thể ảnh hưởng đến từng lượt đo.

Vì vậy, kết quả mô tả hiệu năng local trong môi trường kiểm soát, không đại diện trực tiếp cho production-scale capacity.

## 13. Cách chạy lại

Từ thư mục `Backend`:

```powershell
npm run performance:benchmark -- --warmup=5 --runs=30 --timeout-ms=120000 --resource-sample-ms=500
```

Chạy các kịch bản AI:

```powershell
npm run performance:benchmark -- --warmup=2 --runs=10 --include-ai --scenario=ai_explanation_uci --timeout-ms=120000 --resource-sample-ms=250
npm run performance:benchmark -- --warmup=2 --runs=10 --include-ai --scenario=ai_explanation_oulad --timeout-ms=120000 --resource-sample-ms=250
```

Chạy import benchmark:

```powershell
npm run performance:benchmark -- --warmup=2 --runs=10 --scenario=import_pipeline_uci --timeout-ms=120000 --resource-sample-ms=250
```

Chạy benchmark OULAD full import riêng:

```powershell
npm run performance:benchmark -- --scenario=import_pipeline_oulad --runs=1 --warmup=0 --timeout-ms=1800000 --resource-sample-ms=1000
```

Logs được ghi vào:

```text
Docs/evaluation_logs/system_performance/
```
