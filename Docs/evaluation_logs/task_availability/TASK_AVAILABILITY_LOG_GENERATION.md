# Task Availability Log Generation

## 1. Mục đích

Hai file log JSON của Task Availability Evaluation được backend tự động sinh khi gọi API Task Availability Validator. Log không được viết tay và không do LLM tạo.

Mỗi log là một snapshot ghi lại:

- dataset và class được kiểm tra;
- capability thực tế của dữ liệu trong PostgreSQL;
- kết quả kiểm tra availability của 52 task;
- trạng thái và nguyên nhân của từng task;
- thống kê tổng hợp của lần chạy.

## 2. Log được tạo từ đâu?

Kết quả trong log được sinh bởi:

[`capabilityValidator.service.js`](../../../Backend/src/services/capabilityValidator.service.js)

Luồng xử lý:

```text
Gọi API task availability
        ↓
taskValidator.controller.js
        ↓
capabilityValidator.service.js
        ↓
Đọc taskRegistry.json
        ↓
Đọc dữ liệu thật trong PostgreSQL
        ↓
Kiểm tra 52 task
        ↓
taskAvailabilityLog.service.js
        ↓
Ghi file JSON
```

Các file liên quan:

- [`taskValidator.controller.js`](../../../Backend/src/controllers/taskValidator.controller.js)
- [`capabilityValidator.service.js`](../../../Backend/src/services/capabilityValidator.service.js)
- [`canonicalCapability.service.js`](../../../Backend/src/services/canonicalCapability.service.js)
- [`taskAvailabilityLog.service.js`](../../../Backend/src/services/taskAvailabilityLog.service.js)
- [`taskRegistry.json`](../../../Backend/src/config/taskRegistry.json)

## 3. API đã được sử dụng

### 3.1. UCI Portuguese

```http
GET http://localhost:4000/api/tasks/available?datasetId=SAMPLE_UCI_POR&classId=SAMPLE_UCI_POR_CLASS
```

Log được tạo:

```text
task_availability_20260621T171519Z_5d42a4.json
```

### 3.2. OULAD

```http
GET http://localhost:4000/api/tasks/available?datasetId=SAMPLE_OULAD&classId=SAMPLE_OULAD_CLASS_CCC_2014J
```

Log được tạo:

```text
task_availability_20260621T171533Z_33c53a.json
```

## 4. Vì sao sử dụng `/api/tasks/available`?

Endpoint này thực hiện các bước:

1. Tìm dataset theo `datasetId`.
2. Chạy Task Availability Validator cho tất cả task.
3. Loại các task không được công khai hoặc đã deprecated.
4. Trả danh sách task cùng trạng thái availability.
5. Tự động ghi kết quả thành file log JSON.

Sau khi bốn task thuộc phạm vi khóa luận được chuyển từ `experimental` sang `validated`, endpoint trả về đúng:

```text
52 task cho UCI
52 task cho OULAD
```

Tổng phạm vi evaluation là:

```text
52 task × 2 dataset = 104 task–dataset cases
```

## 5. Validator kiểm tra những gì?

Mỗi task được kiểm tra qua bốn lớp.

### 5.1. Layer A — Structural

Kiểm tra các bảng cơ sở dữ liệu cần thiết có tồn tại hay không, ví dụ:

```text
student
enrollment
assessment
assessment_result
event
engagement
```

Nếu cấu trúc bắt buộc bị thiếu:

```text
status = unsupported
```

### 5.2. Layer B — Semantic/Capability

Validator đọc yêu cầu của task từ `taskRegistry.json`.

Ví dụ:

```json
{
  "requiredCapabilities": [
    "assessment_scores",
    "engagement_tracking"
  ]
}
```

Các yêu cầu này được đối chiếu với capability snapshot của dataset.

Ví dụ với UCI:

```text
assessment_scores = true
engagement_tracking = false
```

Điều này cho biết UCI có dữ liệu điểm số nhưng không có log tương tác học tập trực tuyến.

### 5.3. Layer C — Analytical

Kiểm tra dữ liệu có phù hợp với yêu cầu phân tích hay không, chẳng hạn:

- có chuỗi thời gian hay không;
- có đủ group để so sánh hay không;
- có đủ biến `x` và `y` cho correlation hay không;
- có các output field cần thiết cho visualization hay không.

Layer này chủ yếu sinh warning hoặc advisory.

### 5.4. Layer D — Data Sufficiency

Validator chạy query trên dữ liệu thật để kiểm tra:

- số enrollment;
- số student;
- số assessment;
- số assessment result;
- số tuần dữ liệu;
- số engagement row có giá trị dương.

Ví dụ với UCI:

```text
students = 649
assessment results = 1947
positive engagement rows = 0
```

Do đó, các task dựa trên điểm số có thể chạy, trong khi nhiều task cần engagement data không đủ điều kiện.

#### Vì sao `engagement_tracking` được kiểm tra thêm ở Layer D?

`engagement_tracking` được kiểm tra ở cả Layer B và Layer D vì việc bảng
`engagement` tồn tại chưa chứng minh rằng dataset có hoạt động học tập thực tế.
Một dataset có thể đã được ánh xạ vào canonical schema nhưng toàn bộ
`engagement_count` vẫn bằng `0`.

Do đó:

- Layer B kiểm tra capability về mặt ngữ nghĩa;
- Layer D yêu cầu ít nhất một engagement row có `engagement_count > 0`;
- nếu task bắt buộc cần `engagement_tracking` nhưng không có hoạt động dương,
  task nhận `status = insufficient_data`.

Các capability như `registration_timing`, `absence_tracking` và
`socioeconomic_context` hiện được xác định theo sự hiện diện của dữ liệu và
được xử lý tại Layer B. Chúng chỉ nên được nâng thành kiểm tra Layer D khi có
ngưỡng sample-size cụ thể được định nghĩa cho từng loại phân tích.

#### Quy tắc capability chính xác

Các capability liên quan đến engagement được tính theo biểu thức runtime:

```text
engagement_tracking =
positive_engagement_rows >= 1

temporal_activity =
positive_engagement_rows >= 1
AND distinct_engagement_weeks >= 2

resource_clickstream =
positive_engagement_rows >= 1
AND resource_type_non_null_rows >= 1

disadvantage_scoring =
disadvantage_score_students >= 2
```

Ngưỡng `disadvantage_scoring >= 2` được sử dụng vì capability này phục vụ
phân tích so sánh hoặc phân nhóm; một sinh viên duy nhất không đủ để tạo bằng
chứng phân tích ở cấp cohort.

## 6. Cách xác định status

Validator xác định trạng thái theo thứ tự ưu tiên sau:

```javascript
if (structural === "fail") return "unsupported";
if (data_sufficiency === "fail") return "insufficient_data";
if (semantic === "fail") return "partial";
return "executable";
```

Ý nghĩa:

| Điều kiện | Status |
|---|---|
| Structural fail | `unsupported` |
| Data sufficiency fail | `insufficient_data` |
| Semantic fail | `partial` |
| Không có layer nào fail | `executable` |

## 7. Nội dung của file log

### 7.1. Thông tin lần chạy

```json
{
  "run_id": "task_availability_...",
  "created_at": "2026-06-18T...",
  "datasetId": "SAMPLE_UCI_POR",
  "classId": "SAMPLE_UCI_POR_CLASS"
}
```

### 7.2. Summary

Ví dụ log UCI:

```json
{
  "total": 52,
  "executable": 25,
  "partial": 5,
  "insufficient_data": 22,
  "unsupported": 0
}
```

### 7.3. Capability snapshot

```json
{
  "assessment_scores": true,
  "engagement_tracking": false,
  "lifestyle_factors": true
}
```

### 7.4. Kết quả từng task

```json
{
  "taskId": "S-B03",
  "executable": false,
  "status": "insufficient_data",
  "disabled_reason": "Required capability missing: engagement_tracking"
}
```

## 8. Vị trí lưu log

`taskAvailabilityLog.service.js` tự động ghi log vào:

```text
Docs/evaluation_logs/task_availability/
```

Tên file có cấu trúc:

```text
task_availability
+ timestamp
+ random ID
```

Ví dụ:

```text
task_availability_20260621T171519Z_5d42a4.json
```

## 9. Kết luận

Task Availability log là bằng chứng runtime được backend tự động tạo. Nó ghi lại kết quả đối chiếu giữa:

```text
Yêu cầu của task trong taskRegistry.json
                    +
Capability và dữ liệu thật trong PostgreSQL
                    ↓
Trạng thái availability của từng task
```

Vì vậy, log có thể được sử dụng để:

- chứng minh validator hoạt động tự động;
- giải thích vì sao một task chạy được hoặc bị chặn;
- đối chiếu với Ground Truth;
- tính Accuracy, Precision, Recall và F1-score;
- lưu bằng chứng cho phụ lục và chương thực nghiệm của khóa luận.
