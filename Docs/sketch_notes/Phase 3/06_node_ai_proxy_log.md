# Phase 3 — Step 3d: Node.js AI Proxy (ai.controller.js)

**Mục tiêu:** Cập nhật `ai.controller.js` ở Backend Node.js để đóng vai trò làm proxy trung gian. Nhiệm vụ của file này là nhận request từ Frontend, thu thập thêm dữ liệu cấu hình từ `taskRegistry`, gửi sang Python AI Service, và quan trọng nhất là **ghi nhận (log) mọi kết quả bằng Prisma vào bảng `ai_explanation_log`**.

> **Files thay đổi:**
> - `Backend/src/controllers/ai.controller.js`

---

## 1. Kiến Trúc Node.js Proxy

Trong mô hình này, Node.js không tự mình gọi LLM, mà làm nhiệm vụ **Data Enrichment & Observability**.

### Luồng xử lý (Control Flow):

1. **Nhận Request (từ Frontend):**
   ```json
   {
     "taskId": "S-B01",
     "executionId": "exec_1747405614_a3f2b1c0",
     "datasets": { "score_over_time": [...] },
     "meta": { "dataQuality": { "confidence": "HIGH" } }
   }
   ```
2. **Metadata Enrichment (Tra cứu Registry):**
   Node.js tìm `taskId` trong bộ nhớ (`taskRegistry.json`) và tự động đắp thêm các rules vào payload:
   - `explanation_strategy` (VD: "trend")
   - `target_audience` (VD: ["student"])
   - `visualization_config`
   - `analysis_context` (VD: "weekly", "student")
   
3. **Gọi AI Service (Python):**
   Sử dụng `axios.post` gửi payload đã enrich sang `http://localhost:8000/explain` (chính là FastAPI ta vừa dựng). Có kèm theo cơ chế Timeout tự động.

4. **Observability Logging (Prisma):**
   Ngay khi có kết quả từ Python (hoặc ngay cả khi Python bị lỗi/timeout), Node.js sẽ gọi hàm `logExplanation()` để `INSERT` thông tin vào bảng `ai_explanation_log`.
   
5. **Trả kết quả:**
   Gửi response cuối cùng về cho Frontend để hiển thị. (Frontend không bao giờ biết Python Service tồn tại, chỉ giao tiếp với Node.js).

---

## 2. Các Thay Đổi Quan Trọng Đã Thực Hiện

### a. Prisma Logging (Observability Layer)
Đã thêm `PrismaClient` và hàm `logExplanation` để ghi dữ liệu. Đây là nền tảng cốt lõi cho tính "Academic Defensibility" của luận văn, giúp bạn sau này có thể truy xuất và đo lường được:
- Bao nhiêu request AI đã chạy?
- Tỉ lệ lỗi (degradation) là bao nhiêu?
- Sinh viên nhận được lời giải thích gì?
- Token usage & latency của từng strategy.

Hàm `logExplanation` được gọi theo cơ chế **bất đồng bộ (asynchronous non-blocking)**:
```javascript
// Log asynchronously (không dùng await)
logExplanation({
  payload,
  responseData: response.data,
  isDegraded: false,
  startTime
});
return res.json(response.data);
```
Điều này đảm bảo việc ghi log vào Database không làm chậm tốc độ phản hồi trả về cho Frontend (không phải cộng thêm thời gian chạy SQL).

### b. Data Snapshot Strategy
Thay vì lưu trữ toàn bộ dữ liệu (có thể lên tới hàng nghìn dòng) vào bảng log, hàm `buildDatasetsSnapshot` được thêm vào để chỉ trích xuất siêu dữ liệu:
```javascript
function buildDatasetsSnapshot(datasets) {
  // Trả về số lượng dòng (rowCount) và tỷ lệ null (nullPct)
  // VD: { "score_over_time": { rowCount: 15, nullPct: 0 } }
}
```
Lợi ích: Tránh làm phình Database quá mức, nhưng vẫn đủ context để hiểu AI đang nhận lượng dữ liệu lớn hay nhỏ.

### c. Graceful Degradation (Cơ Chế Dự Phòng Fallback)
Nếu FastAPI Python bị tắt, quá tải, hoặc OpenAI API hết tiền/Lỗi:
1. Block `catch (err)` sẽ bắt lỗi (Axios Timeout / Connection Refused).
2. Tạo ra cấu trúc `DegradedResponse` giả mạo chuẩn mực (với cờ `degraded: true`).
3. Vẫn ghi log Fallback này vào Database (`is_degraded: true`, `degraded_reason: "AI service timeout..."`).
4. **Trả về Frontend HTTP 200 OK** (thay vì 503) kèm payload Degraded.
   - *Lý do trả 200:* Tránh việc Frontend Fetch ném Exception làm sập màn hình biểu đồ. Giao diện nhận `degraded: true` sẽ chủ động hiển thị banner "AI tạm thời không khả dụng", trong khi biểu đồ (Chart) vẫn hoạt động bình thường.

---

## 3. Lời Khuyên Trình Bày Thesis

Khi báo cáo về đoạn kiến trúc Proxy này, hãy nhấn mạnh 3 điểm "Ăn Tiền":
1. **Single Source of Truth:** Frontend không cần biết task đó cần giải thích theo chiến lược nào. Frontend chỉ truyền `taskId` và Data. Node.js sẽ tự đắp metadata vào. Điều này giúp giảm thiểu rủi ro bảo mật và tạo ra sự nhất quán (Consistency).
2. **Resilience (Tính Chống Chịu):** Hệ thống không bao giờ "chết" vì AI. Nhờ cơ chế Graceful Degradation, tính năng chính (vẽ biểu đồ) luôn được bảo vệ ngay cả khi AI Server sập.
3. **Non-blocking Observability:** Tracking mọi AI Request nhưng không hi sinh tốc độ phản hồi (Latency) của hệ thống nhờ Fire-and-forget Logging.

---

**Next Steps (Hoàn thành Phase 3):**
Chuyển qua Frontend: Update `analyticsApi.js`, `ChartRenderer.jsx`, và `AIInsightPanel.jsx` để kết nối và hiển thị kết quả ra màn hình.

---
*Ghi lại bởi Antigravity | 2026-05-17 | Phase 3 Step 3d*
