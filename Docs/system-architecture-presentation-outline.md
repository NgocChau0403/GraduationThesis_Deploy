# Dàn ý trình bày kiến trúc hệ thống

> Định dạng: outline 15 slide cho báo cáo kiến trúc luận văn. Đây chỉ là markdown outline; chưa tạo PowerPoint binary.

## Slide 1: Mục tiêu hệ thống và bức tranh tổng thể

**Thông điệp chính:** Hệ thống chuyển các dataset giáo dục không đồng nhất thành learning analytics charts đã được validate và có thể giải thích bằng AI thông qua kiến trúc chuẩn hóa, dựa trên capability.

**Nội dung bullet:**

- Prototype learning analytics dạng web cho student và admin.
- Hỗ trợ import dataset, canonical schema normalization, task validation, SQL analytics, chart rendering, AI explanation.
- Stack chính: React/Vite frontend, Express/Prisma/PostgreSQL backend, FastAPI AI service.
- Task behavior được điều khiển bởi `taskRegistry.json`, không hardcode theo từng màn hình biểu đồ.

**Gợi ý diagram/visual:** Block diagram: User -> Frontend -> Express API -> PostgreSQL/task registry -> ChartRenderer/AIService.

**Speaker notes:** Mở đầu bằng việc nhấn mạnh hệ thống không chỉ tạo biểu đồ. Nó còn kiểm tra dữ liệu và capability trước khi render, giúp kết quả đáng tin hơn baseline chart system.

## Slide 2: Vai trò người dùng và luồng sản phẩm

**Thông điệp chính:** Kiến trúc tách student self-insight khỏi admin/cohort management, nhưng vẫn dùng chung analytics engine.

**Nội dung bullet:**

- Student vào `/student/dashboard`.
- Admin vào data selection, import flow, dashboard, analytics workspace.
- Cả hai role đều dùng task metadata từ cùng registry.
- Cả hai role đều render chart bằng cùng `ChartRenderer`.
- `AppContext` quản lý active dataset, import history, first-use state.

**Gợi ý diagram/visual:** Hai lane user journey: Student lane và Admin lane hội tụ vào shared analytics API.

**Speaker notes:** Điểm quan trọng là role khác nhau ở workflow và tập task, không phải ở analytics execution engine.

## Slide 3: Pipeline end-to-end

**Thông điệp chính:** Hệ thống có pipeline đầy đủ từ CSV upload tới rendered chart, với validation checkpoint ở nhiều lớp.

**Nội dung bullet:**

- Dataset import: upload CSV và profile schema.
- Schema normalization: confirm mapping và transform rows vào canonical entities.
- Task availability: Layer A/B/C/D validator kiểm tra task readiness.
- Analytics execution: SQL chạy với safe binding và guardrails.
- API response: output normalize thành named `datasets`.
- Chart rendering: `ChartRenderer` chọn adapter và hiển thị diagnostics.

**Gợi ý diagram/visual:** Pipeline: CSV -> Profiling -> Mapping -> Normalized DB -> Validator -> SQL -> API datasets -> Chart.

**Speaker notes:** Đây là slide roadmap. Các slide sau đi sâu vào từng khối.

## Slide 4: Kiến trúc Backend API

**Thông điệp chính:** Backend được chia theo route/controller/service layers, tách rõ import, dataset management, task registry, analytics, students/classes, AI proxy.

**Nội dung bullet:**

- `server.js` mount `/api/import`, `/api/datasets`, `/api/tasks`, `/api/analytics`, `/api/ai`, `/api/students`, `/api/classes`.
- Controllers validate request và shape response.
- Services chứa domain logic: mapping, transform, capability validation, SQL execution.
- Prisma là database access layer.
- Startup seed sample datasets và cleanup expired upload sessions.

**Gợi ý diagram/visual:** Layered backend: Routes -> Controllers -> Services -> Prisma -> PostgreSQL.

**Speaker notes:** Nhấn mạnh tính module hóa: mỗi concern lớn nằm ở một cụm file rõ ràng.

## Slide 5: Import và Schema Normalization

**Thông điệp chính:** Import là pipeline có kiểm soát: profiling, auto-suggestion, human confirmation, strict validation, transform, feature engineering, normalized insertion.

**Nội dung bullet:**

- Upload dùng `multer`, chỉ nhận CSV.
- Profiling detect delimiter, raw rows, column types, null ratio, distinct counts.
- Schema detection infer dataset type và file role.
- Mapping suggestion dùng dataset rules, canonical aliases, learned aliases, profile hints.
- Mapping confirmation yêu cầu strict validation.
- Import pipeline transform rows, tính FE fields, insert deduplicated entities.

**Gợi ý diagram/visual:** Sequence: UploadStep -> `/profile` -> ReviewStep -> `/confirm-mapping` -> ConfirmStep -> `/run`.

**Speaker notes:** Điểm mạnh là human-in-the-loop: hệ thống không tự động tin hoàn toàn mapping gợi ý.

## Slide 6: Canonical Database Schema

**Thông điệp chính:** Database dùng normalized schema xoay quanh student, course, class, enrollment, assessment, assessment result, event, engagement.

**Nội dung bullet:**

- Core tables: `student`, `course`, `class`, `enrollment`, `assessment`, `assessment_result`, `event`, `engagement`.
- Operational tables: `import_batch`, `app_state`, `alias_memory`, `upload_session`, `ai_explanation_log`.
- Mọi learning entity đều có `batch_id` và `source_dataset`.
- `ImportBatch` quản lý dataset history và cascade deletion.
- In-table FE fields giúp giảm join lặp lại cho một số features.

**Gợi ý diagram/visual:** ERD với `ImportBatch` nối tới các canonical tables và quan hệ chính giữa academic entities.

**Speaker notes:** Giải thích batch scoping: nhiều dataset import có thể cùng tồn tại mà không trộn record.

## Slide 7: Task Registry như Analytics Control Plane

**Thông điệp chính:** `taskRegistry.json` là control plane cho analytics tasks, SQL, visualization metadata, AI strategy, output contracts, audience targeting.

**Nội dung bullet:**

- Registry hiện có 57 tasks.
- Status: 10 certified, 38 validated, 9 experimental.
- Scope: 29 one-student, 16 many-students, 6 cohort, 6 two-student.
- Visualization types: bar, table, card, line, scatter, heatmap, pie, checklist.
- SQL bị strip khỏi public task API responses.
- Experimental tasks ẩn mặc định.

**Gợi ý diagram/visual:** Task metadata card: taskId, SQL, viz_type, query_labels, output_schema, capabilities.

**Speaker notes:** Trình bày registry như analytics catalog của hệ thống.

## Slide 8: Capability Validator Layer A/B/C/D

**Thông điệp chính:** Validator ngăn blind chart rendering bằng cách kiểm tra structural, semantic, analytical, và data sufficiency conditions.

**Nội dung bullet:**

- Layer A: kiểm tra physical table existence qua `information_schema`.
- Layer B: evaluate semantic capabilities và stored FE fields.
- Layer C: cảnh báo analytical suitability, ví dụ thiếu temporal points.
- Layer D: kiểm tra enrollment count, assessment result count, diversity, engagement sufficiency.
- Final statuses: `unsupported`, `partial`, `insufficient_data`, `executable`.
- Chỉ `unsupported` bị hard-block.

**Gợi ý diagram/visual:** Bốn gate xếp tầng với pass/warn/fail và final status mapping.

**Speaker notes:** Đây là điểm khác biệt lớn so với hệ thống chart cơ bản: hệ thống giải thích được vì sao task chạy được hoặc không đáng tin.

## Slide 9: Analytics SQL Execution Pipeline

**Thông điệp chính:** Analytics execution dùng server-owned SQL templates với param whitelist, runtime guardrails, batch scoping, timeout, output schema validation.

**Nội dung bullet:**

- SQL đến từ task registry, không từ client.
- Allowed params: `batch_id`, `student_id`, `class_id`, `enrollment_id`, `s1`, `s2`.
- `:param` placeholders chuyển thành PostgreSQL positional params.
- Guardrails: 30s timeout, 10k limit injection, batch-scope rewrite, task-specific optimization.
- Multi-query tasks execute tuần tự và normalize bằng `query_labels`.
- Output schema mismatch trả HTTP 422.

**Gợi ý diagram/visual:** Task -> Params -> Guardrails -> Prisma transaction -> Rows -> Output schema -> Response.

**Speaker notes:** Nhấn mạnh SQL không expose ra browser, giúp giảm attack surface.

## Slide 10: API Response Contract

**Thông điệp chính:** Backend trả named datasets và data-quality metadata để frontend/AI không phải đoán ý nghĩa từ raw result arrays.

**Nội dung bullet:**

- Response gồm `success`, `executionId`, `taskId`, `datasets`, `meta`.
- `datasets` keys lấy từ `task.query_labels`.
- Single-query và multi-query dùng cùng concept.
- `meta.dataQuality` gồm validator status, confidence, confidence reason, warnings.
- Query hash và execution time hỗ trợ observability.

**Gợi ý diagram/visual:** JSON response mock, highlight `datasets` và `meta.dataQuality`.

**Speaker notes:** Named datasets đặc biệt hữu ích cho multi-query tasks và AI explanation.

## Slide 11: Kiến trúc Frontend Analytics

**Thông điệp chính:** Frontend tách task browsing, execution state, raw response display, chart rendering, AI insight display.

**Nội dung bullet:**

- `useTaskRegistry` fetch/cache task metadata.
- `TaskListPanel` xử lý browsing và filters.
- `TaskDetailPanel` hiển thị metadata và execution params.
- `useAnalytics` chạy `POST /api/analytics/run`.
- `ResultDisplay` hiển thị table/JSON fallback.
- `AIInsightPanel` request structured explanations.

**Gợi ý diagram/visual:** Component tree của `AnalyticsWorkspace`.

**Speaker notes:** Nêu rõ dashboard và workspace reuse cùng API/renderer, không viết chart riêng rời rạc.

## Slide 12: ChartRenderer và Adapter System

**Thông điệp chính:** Visualization được adapter-driven: mỗi task khai báo `viz_type`, adapters transform raw datasets thành chart-specific structures kèm diagnostics.

**Nội dung bullet:**

- `ChartRenderer` map `viz_type` sang adapter và chart component.
- Adapters: line, bar/histogram, scatter, pie, heatmap, table, card, checklist.
- Shared adapter policy giữ real zero và tránh silent null-to-zero conversion.
- Diagnostics hiển thị selected dataset, valid rows, skipped rows, missing fields, warnings.
- Line chart giữ null y-values thành gaps; bar/scatter skip invalid rows; heatmap giữ null cells.

**Gợi ý diagram/visual:** `viz_type` -> adapter -> normalized chart data -> chart component.

**Speaker notes:** So sánh với baseline chart system thường bind API rows trực tiếp vào chart props mà không có quality layer.

## Slide 13: AI Explanation Architecture

**Thông điệp chính:** AI explanation được decouple khỏi chart rendering và degraded gracefully khi AI service unavailable.

**Nội dung bullet:**

- Frontend gọi Node `/api/ai/explain`.
- Node enrich request bằng task metadata từ registry.
- Node forward đến FastAPI `AIService`.
- Python validate request/response bằng Pydantic.
- Strategy factory chọn explanation strategy.
- Safety filter flag PII leakage, diagnostic labeling, causal overclaim, grade prediction, personal attack.
- Node log explanation metadata vào `ai_explanation_log`.

**Gợi ý diagram/visual:** Node proxy -> FastAPI strategy -> structured response -> frontend panel, kèm degraded fallback branch.

**Speaker notes:** Điểm chính: chart không bị block nếu AI fail.

## Slide 14: One-click Debug Agent

**Thông điệp chính:** Debug agent validate full runtime path ở chế độ report-only, dùng cùng backend controller và frontend adapter logic như app.

**Nội dung bullet:**

- CLI runner: `agents/run-debug-agent.mjs`.
- Load backend env và verify Prisma.
- Load task metadata từ registry.
- Chạy capability validator.
- Gọi trực tiếp `runAnalyticsController`.
- Summarize datasets cho null/NaN/Infinity/field coverage.
- Import chart selection policy và adapter.
- Ghi markdown reports trong `agents/reports/`.

**Gợi ý diagram/visual:** Debug loop: Task -> Validator -> Analytics -> Dataset summary -> Adapter -> Report.

**Speaker notes:** Agent cho thấy hệ thống có thể inspect và audit, không chỉ chạy UI.

## Slide 15: Điểm mạnh, hạn chế, hướng phát triển

**Thông điệp chính:** Kiến trúc mạnh hơn baseline chart generation vì normalized, contract-driven, capability-aware, diagnosable, nhưng vẫn có hướng cải tiến rõ ràng.

**Nội dung bullet:**

- Điểm mạnh: canonical schema, human-confirmed mapping, capability validator, server-owned SQL, named datasets, adapter diagnostics, AI graceful degradation.
- Hạn chế: còn legacy dataset compatibility metadata, frontend hardcoded UCI missing capability shortcuts, table adapter permissive, SQL placeholder regex-based.
- Cải tiến: chuẩn hóa availability contracts, thêm unit/scale metadata, promote severe chart warnings, thêm SQL tokenizer nếu SQL dynamic, persist import data-quality reports.

**Gợi ý diagram/visual:** Bảng 3 cột: Điểm mạnh / Hạn chế / Cải tiến.

**Speaker notes:** Kết thúc cân bằng: hệ thống đã có validation layers mạnh, bước tiếp theo là giảm duplicated rules và làm data-quality signals nổi bật hơn.
