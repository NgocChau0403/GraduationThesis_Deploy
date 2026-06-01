# API Contract & OpenAPI (Swagger) Integration

## 1. Lý do tích hợp Swagger ở cuối Phase 2
Trong kiến trúc phần mềm chuyên nghiệp (Enterprise Architecture) và đặc biệt là trong các hệ thống tách biệt Frontend - Backend (Decoupled), **API Contract** là tài liệu quan trọng nhất để hai bên giao tiếp.
- **Frontend** không cần biết Backend code bằng gì (Node.js hay Python), chỉ cần nhìn vào Swagger để biết gọi API nào, truyền params gì, và nhận về JSON cấu trúc ra sao.
- Việc tạo Swagger ngay khi kết thúc Phase 2 (Backend Core) đảm bảo sự chuyển giao mượt mà sang Phase 3 (Frontend Dashboard), loại bỏ việc đoán mò (guesswork) và lỗi tích hợp (integration bugs).
- **Thesis Value**: Chứng minh khả năng thiết kế hệ thống theo chuẩn công nghiệp (OpenAPI 3.0 Standard), biến hệ thống từ một "prototye sinh viên" thành "production-ready backend".

## 2. Kiến trúc cấu hình (Configuration Architecture)
Thay vì nhồi nhét toàn bộ mô tả API vào `server.js`, chúng tôi sử dụng mô hình cấu hình tách biệt:

### `src/config/swagger.js`
Đây là "Foundation Layer" định nghĩa các thành phần dùng chung (Reusable Components):
- **Tags**: Phân nhóm API (System, Analytics, Tasks, Students, Classes) giúp UI gọn gàng.
- **Components/Schemas**: Định nghĩa sẵn các cấu trúc dữ liệu cốt lõi để tái sử dụng ở nhiều route.
  - `ErrorResponse`: Chuẩn hóa cấu trúc lỗi (`success: false`, `error.code`, `error.message`).
  - `StudentSummary`: Mô tả dữ liệu trả về của sinh viên.
  - `TaskValidationResult`: Mô tả kết quả quét tính hợp lệ của từng task.
  - `AnalyticsRequest` / `AnalyticsResponse`: Định nghĩa chặt chẽ Input/Output của Endpoint quan trọng nhất hệ thống.

## 3. Quá trình Document các Endpoints
Sử dụng thư viện `swagger-jsdoc` để đọc các comment JSDoc trực tiếp ngay trên mã nguồn (`routes/*.js`), giúp tài liệu và code luôn đồng bộ (Sync).

Thứ tự ưu tiên khi document:
1. **Core Analytics Engine (`POST /api/analytics/run`)**: Xương sống của hệ thống, được document tỉ mỉ body và response.
2. **Capability Validation (`GET /api/tasks/validate/:datasetId`)**: Trái tim của Phase 2, hiển thị danh sách 53 tasks kèm status thực thi.
3. **Context & Lookup (`GET /api/classes`, `GET /api/students`)**: Cung cấp data cho các dropdown trên UI.
4. **Health Check (`GET /api/health`)**: Phục vụ cho infrastructure probe và kiểm tra kết nối từ Frontend.

## 4. Giá trị cốt lõi mang lại (Single Source of Truth)
Swagger trong đồ án này không chỉ để "show API" mà đóng vai trò là Nguồn Chân Lý Duy Nhất (Single Source of Truth).
Từ trang `/api-docs`, ta có thể:
1. **Try it out**: Test API trực tiếp trên trình duyệt bằng giao diện trực quan (thay thế Postman).
2. **Generate Collections**: Dễ dàng export ra Postman Collection để demo khi báo cáo đồ án.
3. **Generate Types**: Frontend có thể dùng công cụ để tự động sinh ra các TypeScript Interfaces dựa trên Swagger Schemas, đảm bảo Type Safety 100%.

## 5. Cập nhật Phase 3 (Metadata-Driven Architecture & AI Integration)
Sau khi hoàn thiện cơ chế siêu dữ liệu (metadata) ở Phase 3, Swagger đã được tái cấu trúc toàn diện để phản ánh đúng Contract mới.

### Bổ sung 13 Schemas trọng yếu
Swagger được mở rộng với hàng loạt Component mới phục vụ Frontend và AI:
- **Registry Metadata**: `TaskMetadata`, `VisualizationConfig`, `SemanticRoles`, `AnalysisContext`. Frontend dùng các schema này để render biểu đồ hoàn toàn tự động (declarative) mà không cần code cứng logic.
- **Analytics Response**: Kiến trúc trả về được phân mảnh thành `AnalyticsResponse` (chứa dữ liệu phân tích), `AnalyticsExecutionMeta` (chứa metadata thực thi như thời gian, query hash) và `DataQuality`.
- **AI Service**: Loạt schema phục vụ tính năng giải thích AI (`AIExplainRequest`, `AIExplainResponse`, `AIExplanationBody`, `Insight`, `EvidenceItem`, `Recommendation`, `ConfidenceInfo`, `AIMeta`, và `AIDegradedResponse` fallback).

### Các Endpoint mới & Sửa đổi
- **Đính chính `AnalyticsResponse`**: Sửa lại kiến trúc trả về thành `datasets: object` (map theo `query_labels`), thay vì một mảng `data` phẳng. Có cung cấp đầy đủ ví dụ cho cả single-query và multi-query.
- **Endpoint AI (`POST /api/ai/explain`)**: Document rất chi tiết quy trình proxy (NodeJS → Python FastAPI), các chuỗi timeout (Timeout chain) và cơ chế **Graceful Degradation** (khi AI bị lỗi, UI vẫn không bị treo).
- **Cập nhật Task Routes**: Các endpoint list và get task đã được gán trực tiếp vào schema `TaskMetadata`.

## 6. Hướng phát triển tiếp theo (Next Steps)
Trong tương lai (sau khi UI ổn định), Backend có thể tiến tới việc ánh xạ các Schemas này vào **Runtime Validation Layer** (ví dụ dùng thư viện Zod hoặc Joi ở Controller) để đảm bảo mọi request gửi lên API đều tuân thủ chính xác hợp đồng đã định nghĩa trong Swagger trước khi chạm vào Logic.
