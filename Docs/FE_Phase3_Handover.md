# TÀI LIỆU BÀN GIAO FRONTEND (PHASE 3: MOCK, VISUALIZATION & AI)

Tài liệu này đóng vai trò bàn giao nhiệm vụ lập trình giao diện (Frontend) dựa trên bản thiết kế hệ thống chi tiết (STEP 4, 5B, 5C). Trọng tâm của Phase 3 Frontend là **Decoupling (Tách rời)** giao diện khỏi Backend trong giai đoạn đầu thông qua hệ thống Mock Data, sau đó mới tiến hành tích hợp hệ thống thật.

Dev Frontend vui lòng thực hiện tuần tự theo các bước checklist dưới đây để hoàn thiện Phase 3.

---

### BƯỚC 1: Xây Dựng Hệ Thống Dữ Liệu Giả (Mock Data) - Tương đương STEP 4
*Mục đích: Giúp FE Dev code giao diện mà không cần chờ hay phụ thuộc vào Backend/AI.*

- [ ] Cấu hình biến môi trường:
  - `Frontend/.env.development`: Thêm `VITE_USE_MOCK=true`
  - `Frontend/.env.production`: Thêm `VITE_USE_MOCK=false`
- [ ] Tạo cơ chế Mock Toggle trong `Frontend/src/services/analyticsApi.js`:
  ```javascript
  const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
  // Nếu true: import JSON trực tiếp từ thư mục mock. Nếu false: gọi axios fetch data thật từ API.
  ```
- [ ] Tạo 16 file JSON mock chuẩn theo API Swagger (Contract 3 & 4) vào thư mục `Frontend/src/mock/`:
  - **Analytics Mocks (`mock/analytics/`):**
    - `line_chart_trend.json` (Dữ liệu mẫu S-B01)
    - `bar_chart_comparison.json`
    - `bar_chart_histogram.json`
    - `scatter_correlation.json`
    - `heatmap_behavioral.json`
    - `pie_distribution.json`
    - `table_ranked.json`
  - **AI Explanation Mocks (`mock/ai/`):**
    - `explanation_trend_high.json` (Đầy đủ cấu trúc, confidence: HIGH)
    - `explanation_trend_medium.json` (Ngôn ngữ dè dặt, mảng `based_on` có dữ liệu)
    - `explanation_trend_low.json` (Có cảnh báo `data_warnings`)
    - `explanation_comparison.json`
    - `explanation_risk.json`
    - `explanation_degraded.json` (Đúng chuẩn `degraded: true` khi AI server sập)
  - **Validation Mocks (`mock/validation/`):**
    - `capability_executable.json`
    - `capability_partial.json`
    - `capability_insufficient.json`

---

### BƯỚC 2: Cài Đặt Thư Viện & Xây Dựng Hooks - Tương đương STEP 5B (Part 1)
- [ ] Mở terminal tại `Frontend`, chạy: `npm install recharts @tanstack/react-query axios`
- [ ] Setup `<QueryClientProvider>` ở file `main.jsx`.
- [ ] Tạo các Custom Hooks để quản lý State & Cache:
  - `Frontend/src/hooks/useTaskRegistry.js` (Dùng TanStack Query lấy danh sách 53 tasks, cấu hình `staleTime: 10min` để tối ưu)
  - `Frontend/src/hooks/useAnalytics.js` (Dùng TanStack `useMutation` quản lý 2 hàm `run` để lấy data vẽ biểu đồ và `explain` để lấy giải thích AI)

---

### BƯỚC 3: Chart Adapters & Components - Tương đương STEP 5B (Part 2)
*Mục đích: Chart Adapter là các pure function làm nhiệm vụ chuẩn hóa JSON thô từ BE thành format mà thư viện Recharts hiểu được. Code Adapter trước, render Component sau.*

- [ ] Tạo các file Adapter và test độc lập với Mock JSON:
  - `Frontend/src/chartAdapters/line.adapter.js` (Test với `line_chart_trend.json`)
  - `Frontend/src/chartAdapters/bar.adapter.js` (Phải xử lý được variant `default` và `histogram`)
  - `Frontend/src/chartAdapters/scatter.adapter.js`
  - `Frontend/src/chartAdapters/pie.adapter.js`
  - `Frontend/src/chartAdapters/heatmap.adapter.js`
  - `Frontend/src/chartAdapters/table.adapter.js`
- [ ] Tạo các View Components (Component này CẤM parse logic, chỉ nhận data sạch đã qua Adapter để vẽ):
  - `LineChartView.jsx`
  - `BarChartView.jsx`
  - `ScatterChartView.jsx`
  - `PieChartView.jsx`
  - `HeatmapView.jsx`
  - `DataTableView.jsx`
- [ ] Xây dựng bộ điều hướng trung tâm: **`Frontend/src/components/ChartRenderer.jsx`**
  - Khai báo `ADAPTER_MAP` và `CHART_MAP`. Tự động đọc tham số `viz_type` từ cấu hình Task Metadata để gọi đúng Adapter và View tương ứng.
  - *Kiểm tra:* Đảm bảo `ChartRenderer` vẽ thành công cả 7 loại mock analytics ở Bước 1 ra màn hình.

---

### BƯỚC 4: Lắp ráp AI Panel & Student Dashboard - Tương đương STEP 5B (Part 3)
- [ ] Xây dựng **`Frontend/src/components/AIInsightPanel.jsx`**:
  - Quản lý 4 states: `Idle`, `Loading`, `Success`, `DEGRADED`.
  - Render theo cấu trúc: Câu `summary`, danh sách `insights[]`, danh sách `recommendations[]`.
  - Có badge hiển thị mức độ tự tin (Confidence): HIGH = Xanh lá, MEDIUM = Vàng, LOW = Cam.
  - Có khu vực render khối cảnh báo `data_warnings` và `safety_flags` nếu AI trả về.
  - Xử lý Fallback: Có component báo lỗi thân thiện (DEGRADED banner) khi Backend trả về `degraded: true`.
  - *Kiểm tra:* Test UI hiển thị mượt mà với cả 6 file mock AI ở Bước 1.
- [ ] Lắp ráp trang **`Frontend/src/pages/StudentDashboardPage.jsx`**:
  - **Section A:** StatCards (Hiển thị các chỉ số nhanh: Điểm TB, tỷ lệ đậu, mức độ tương tác).
  - **Section B:** TaskSelector (Dropdown/Tabs chọn task phân tích dành riêng cho sinh viên).
  - **Section C:** AnalyticsWorkspace (Bao gồm Filter + `<ChartRenderer />` bên trái + `<AIInsightPanel />` bên phải).

---

### BƯỚC 5: Tích hợp Hệ Thống Thật (Integration E2E) - Tương đương STEP 5C
Sau khi giao diện đã chạy ổn định với Mock Data, tiến hành ráp với Backend thật:
- [ ] Đổi `VITE_USE_MOCK=false` trong môi trường dev.
- [ ] Khởi động cả 3 cụm Backend (Mở 3 terminal): Cơ sở dữ liệu PostgreSQL, Node Server (port 4000), Python FastAPI Server (port 8000).
- [ ] Mở trình duyệt và chạy thử các luồng thao tác trên UI Dashboard.
- [ ] Mở Prisma Studio (`npx prisma studio`) kiểm tra bảng `ai_explanation_log`. Phải đảm bảo mỗi lần ấn nút "Giải thích" trên màn hình thì dưới DB sinh ra 1 dòng log.
- [ ] Đảm bảo `executionId` truyền đồng nhất từ lúc gọi API `run` (Analytics) sang lúc gọi API `explain` (AI) để Database có thể track được toàn bộ vòng đời truy vấn.
