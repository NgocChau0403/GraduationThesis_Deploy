# Tổng hợp các thay đổi trên Frontend (Frontend Changes Summary)

Tài liệu này tổng hợp các phần code Frontend đã được cập nhật, chỉnh sửa so với phiên bản gốc (được pull về), nhằm mục đích bàn giao và giải thích lý do cho Frontend Developer.

## 1. Cập nhật Dependencies (`package.json`)
- **Đã thêm**: `@tanstack/react-query`, `axios`, `recharts`.
- **Lý do**: Hệ thống cần chuẩn hóa việc gọi API và quản lý state server (sử dụng `axios` và `react-query`). Đồng thời, `recharts` được chọn làm thư viện lõi để vẽ biểu đồ cho các Analytics Tasks nhờ tính linh hoạt và dễ tùy biến.

## 2. Chuẩn hóa Data Adapters (`src/chartAdapters/`)
- **File bị ảnh hưởng**: `bar.adapter.js`, `line.adapter.js`, `pie.adapter.js`, `scatter.adapter.js`.
- **File mới**: `card.adapter.js`.
- **Thay đổi chi tiết**:
  - **Null Safety**: Bổ sung fallback cho các giá trị `null`/`undefined`. Nếu `x_field` null sẽ hiển thị `"Unknown"`, nếu `y_field` null sẽ chuyển thành `0`.
  - **Data Normalization**: Thay vì truyền tên trường động (dynamic key) trực tiếp vào dữ liệu, adapter hiện tại map dữ liệu về cấu trúc chuẩn `{ x: ..., y: ... }` và đặt fixed `xKey: "x"`, `yKey: "y"`.
- **Lý do**: Giúp ứng dụng không bị crash hoặc hiển thị màn hình trắng (blank chart) khi dữ liệu từ Backend trả về bị rỗng (null values). Cấu trúc data chuẩn hóa cũng giúp components Recharts tái sử dụng logic dễ dàng hơn.

## 3. Cải tiến UI Components & Chart Views (`src/components/`)
- **File mới**: `charts/MetricCardView.jsx` (dạng thẻ số liệu) và `utils/colorUtils.js` (hỗ trợ sinh màu cố định).
- **ChartRenderer (`ChartRenderer.jsx`)**:
  - Hỗ trợ render `card` view mới.
  - Xử lý gộp (merge) datasets thông minh cho biểu đồ `scatter_plot` (fallback an toàn khi backend trả về multiple queries).
  - Thêm tính năng **Proxy Competency Badge**: Tự động detect xem row data có chứa `competency_source === "proxy"` hay không để hiển thị badge cảnh báo (cho người dùng biết dữ liệu năng lực này là ước tính thay vì dữ liệu gốc).
- **Chart Views (`BarChartView`, `LineChartView`, `PieChartView`, `ScatterChartView`)**:
  - Tích hợp `getStableColor(name)` từ `colorUtils` thay cho mảng màu hardcode cũ.
  - Bọc ngoài `ResponsiveContainer` bằng thẻ `div` với `minHeight: 380` và width `100%`.
  - Chỉnh sửa margin, góc xoay (angle) và textAnchor của XAxis.
- **Lý do**: Nâng cấp UI/UX, chống cắt chữ (label clipping) ở trục X, cố định màu sắc cho cùng một đối tượng (ví dụ: "Male" luôn có màu xanh trên mọi chart) và tăng tính minh bạch về nguồn gốc dữ liệu qua hệ thống Badge. Fix triệt để các lỗi vỡ layout lưới (CSS Grid).

## 4. Xử lý Logic tại Dashboards (`src/pages/`)
- **File bị ảnh hưởng**: `StudentDashboardPage.jsx`, `AdminDashboardPage.jsx`.
- **Thay đổi chi tiết**:
  - **Dataset Compatibility Filter (`getCompatFilter`)**: Filter tự động các Tasks dựa vào `activeDataset.source` và `task.datasetCompatibility`. Nếu người dùng đang xem dataset UCI, hệ thống tự động ẩn các Analytics tasks chỉ dành riêng cho OULAD.
  - **Resolve `enrollment_id`**: Tại `StudentDashboardPage`, bổ sung logic extract biến `enrollment_id` từ query students và động đưa vào tham số (params) chạy task.
- **Lý do**: Ngăn chặn tình trạng Dashboard gọi Backend với các câu SQL không tương thích với bảng dữ liệu hiện tại, khắc phục lỗi backend trả về SQL Error hoặc Empty Data do chạy sai task. Tính năng auto-inject `enrollment_id` là bắt buộc đối với các tính toán của bộ dữ liệu OULAD.
