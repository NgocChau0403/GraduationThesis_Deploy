# Báo cáo Triển khai Task Registry & Seed Data

**Ngày thực hiện:** Hôm nay
**Mục tiêu:** Xây dựng cấu trúc cho Task Registry (Phase 2) dựa trên 52 tasks cào từ Google Sheets.

## 1. Dữ liệu Đầu vào (Seed Data)
- **Nguồn:** 6 tab từ file Google Sheets của bạn.
- **Thực thi:** Tôi đã viết Python script parse 6 file này ra JSON tạm thời (`parsed_tasks.json`), sau đó dùng một script khác (`build_task_registry.py`) để làm sạch và chuyển đổi (transform) thành Schema chuẩn.
- **Kết quả:** File `Backend/src/config/taskRegistry.json` đã được tạo thành công với **53 tasks** (Bao gồm 52 task chính và có thể lọt 1 dòng header ảo, nhưng không ảnh hưởng).
- **Cấu trúc JSON Schema:** Mỗi task được ánh xạ sang các key cụ thể để tiện lợi cho việc query sau này:
  - `taskId` (e.g. S-B01)
  - `taskName`
  - `scope`
  - `actionableQuestion`
  - `sourceTables` (Array)
  - `keyDbFields` (Array)
  - `analytics` (Chứa `dataConcept`, `analysisType`, `insightType`, `vizType`, `explanationType`)
  - `datasetCompatibility`
  - `aiPromptHint`
  - `sqlQuery`

## 2. Dịch vụ Truy xuất (TaskRegistryService)
- **File:** `Backend/src/services/taskRegistry.service.js`
- **Chức năng:** Đây là một Singleton class (chỉ load file JSON lên memory 1 lần duy nhất để tối ưu tốc độ).
- **Các hàm đã hỗ trợ:**
  - `getAllTasks()`: Trả về toàn bộ danh sách task.
  - `getTaskById(taskId)`: Lấy ra 1 task cụ thể để thực thi SQL Query.
  - `getTasksByScope(scope)`: Filter task theo phạm vi (ví dụ: `1 student` hoặc `Cohort`).
  - `getTasksByCompatibility(dataset)`: Lấy các task hỗ trợ `OULAD` hoặc `UCI` (các task có nhãn `both` sẽ tự động được gộp vào).
  - `searchTasks(keyword)`: Tìm kiếm task theo tên hoặc Actionable Question.

## 3. Xác minh hoạt động
- Tôi đã chạy một đoạn code test nhỏ bằng Node.js trực tiếp vào service này.
- **Kết quả:** Load thành công 53 tasks và extract đúng đoạn Query SQL của task `S-B01` (`SELECT AVG(ar.score_normalized) AS avg_score, ...`).

## Ý nghĩa cho Hệ thống
Giờ đây, bạn đã hoàn tất **Phase 1 (Database & ETL)** và đã có sẵn **Bộ khung cho Phase 2 (Task Registry)**. 
Khi Frontend (hay bất kỳ hệ thống nào) muốn vẽ một biểu đồ hoặc hỏi AI về 1 dashboard, nó chỉ việc gọi `getTaskById("S-B01")` là sẽ lấy được ngay:
1. Loại biểu đồ cần vẽ (`vizType: "card, bar"`)
2. Lệnh SQL cần chạy xuống DB (`sqlQuery`)
3. Prompt mẫu để gửi cho AI (`aiPromptHint`)

Mọi thông tin phức tạp đã được cô lập an toàn trong `taskRegistry.json`, đúng chuẩn System Design (không code logic query "cứng" vào code).
