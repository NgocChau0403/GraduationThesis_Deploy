# Phase 3 — Step 2: visualization_config Injection Log

**File này ghi lại những gì đã làm, logic code, và luồng đi của STEP 2 trong Phase 3.**  
Mục đích: hiểu hệ thống thực sự chạy như thế nào để trình bày trong ngày báo cáo thesis.

---

## Tổng quan: STEP 2 là gì?

STEP 2 trong Phase 3 Implementation Plan là **blocking step** — không có nó thì:
- `ChartRenderer.jsx` không biết render field nào lên trục nào → spaghetti code với hàng chục `if/else`
- Python AI service không biết dùng strategy nào để build prompt → prompt spaghetti
- Frontend phải "guess" field names từ raw SQL rows → dễ sai, không maintainable

**Giải pháp:** Inject 2 fields mới vào mỗi task trong `taskRegistry.json`:
1. `viz_type` — loại chart (line_chart, bar_chart, scatter_plot, pie_chart, heatmap, table)
2. `visualization_config` — object khai báo đầy đủ cách render chart

---

## Files đã tạo / sửa

| File | Action | Mục đích |
|------|--------|----------|
| `Backend/src/config/taskRegistry.json` | **MODIFIED** | Thêm `viz_type` + `visualization_config` vào cả 53 tasks |
| `Backend/scripts/injectVizConfig.js` | **NEW** | Script inject config — chạy 1 lần |
| `Backend/scripts/validateRegistry.js` | **NEW** | Script validate — chạy để kiểm tra sau mỗi lần sửa |

---

## Kết quả chạy

```
node scripts/injectVizConfig.js
✅ Done: 53 tasks injected, 0 skipped

node scripts/validateRegistry.js
─────────────────────────────────────────
Total tasks: 53
Errors:      0
Warnings:    0
✅ All tasks pass validation — STEP 2 field injection complete.
```

---

## Schema của `visualization_config`

```jsonc
{
  "taskId": "S-T01",
  "viz_type": "line_chart",           // ← loại chart chính
  "visualization_config": {
    "x_field": "assessment_order",    // tên column SQL đặt lên trục X
    "y_field": "score_normalized",    // tên column SQL đặt lên trục Y
    "series_field": null,             // column dùng để split thành nhiều series (null = single series)
    "color_field": null,              // column dùng để tô màu điểm/bar (null = dùng màu mặc định)
    "orientation": "horizontal",      // hướng chart: "horizontal" | "vertical" | null
    "variant": "default",             // variant của viz_type (xem bảng bên dưới)
    "x_label": "Assessment Order",    // nhãn trục X hiển thị trên UI
    "y_label": "Normalized Score",    // nhãn trục Y hiển thị trên UI
    "semantic_roles": {
      "x": "time",                    // ý nghĩa ngữ nghĩa của trục X
      "y": "performance_metric"       // ý nghĩa ngữ nghĩa của trục Y
    }
  }
}
```

### Variant values theo viz_type

| `viz_type` | `variant` hợp lệ | Ý nghĩa |
|---|---|---|
| `bar_chart` | `categorical` | Bar thường, mỗi bar = 1 category |
| `bar_chart` | `grouped` | Nhiều bar cạnh nhau theo nhóm |
| `bar_chart` | `stacked` | Bar chồng nhau (100% stacked) |
| `bar_chart` | `ranked` | Bar sắp xếp từ cao đến thấp |
| `bar_chart` | `histogram` | Bar phân phối điểm |
| `line_chart` | `default` | Line đơn |
| `line_chart` | `multi_series` | Nhiều line (dùng `series_field` để split) |
| `scatter_plot` | `default` | Scatter không tô màu theo category |
| `scatter_plot` | `colored` | Scatter tô màu theo `color_field` |
| `pie_chart` | `default` | Pie/Donut (tối đa 5 categories) |
| `heatmap` | `week_activity` | Heatmap hoạt động theo tuần |
| `heatmap` | `score_matrix` | Heatmap correlation matrix |
| `table` | `ranked` | Bảng sắp xếp theo rank |
| `table` | `default` | Bảng thông thường |

### Semantic roles vocabulary

| Role | Ý nghĩa |
|---|---|
| `time` | Cột thời gian / tuần / thứ tự |
| `performance_metric` | Điểm số, pass rate, score |
| `engagement_metric` | Số click, active days, engagement score |
| `risk_metric` | at_risk_score, flag values |
| `risk_level` | at_risk_label (categorical: high/medium/low) |
| `category` | Category tổng quát |
| `demographic_group` | Nhóm nhân khẩu học (gender, age_group, v.v.) |
| `demographic_metric` | Giá trị số từ dữ liệu nhân khẩu (disadvantage_score) |
| `lifestyle_metric` | lifestyle_risk_score, social_balance_score |
| `count` | Số lượng sinh viên |
| `percentage` | Tỷ lệ phần trăm |
| `time_delta` | Số ngày trễ (submission delay) |
| `boolean_flag` | true/false flag |
| `student_id` | ID sinh viên (dimension) |
| `correlation_metric` | Hệ số tương quan |
| `deviation_metric` | Độ lệch so với trung bình cohort |
| `outcome_category` | final_outcome (pass/fail/withdrawn) |
| `rolling_average` | Đường trung bình trượt |

---

## Logic phân tích từng task để chọn config

### Nguyên tắc mapping `viz_type` → config:

**1. Line chart (trend over time)**
- `x_field` = cột thứ tự thời gian (`assessment_order`, `week_number`)
- `y_field` = metric chính cần theo dõi
- `variant: "multi_series"` khi có 2+ đối tượng (ví dụ: 2 sinh viên so sánh)
- `series_field` = cột dùng để split lines

**2. Bar chart**
- `x_field` = category (loại competency, resource type, risk level...)
- `y_field` = metric (count, score, fail rate...)
- `variant: "ranked"` khi data nên sắp xếp theo giá trị (fail rate, avg_score)
- `variant: "grouped"` khi có 2 dimension cần so sánh cạnh nhau
- `variant: "stacked"` khi cần thể hiện % trong nhóm (A-G12: outcome by group)
- `variant: "histogram"` khi `x` là bin của điểm số liên tục (A-B01)

**3. Scatter plot**
- `x_field` + `y_field` = 2 numeric metrics cần xem correlation
- `variant: "colored"` khi `color_field` phân biệt groups rõ ràng
- Không dùng cho categorical data

**4. Pie chart**
- Chỉ dùng khi ≤5 categories (A-B02: final_outcome có 4 values; S-T10: resource types)
- `x_field` = category label, `y_field` = count/percentage

**5. Heatmap**
- `week_activity`: x=week, y=metric, color=intensity (S-T06: study consistency)
- `score_matrix`: correlation matrix (A-G07: factor correlation)

**6. Table**
- Dùng cho tasks synthesis (AI-driven, vizType="none") hoặc data phức tạp nhiều cột
- `variant: "ranked"` khi có thứ tự ưu tiên (A-G03, A-G15: at-risk ranking)

---

## Mapping đầy đủ 53 tasks

| Task ID | Task Name | viz_type | variant | x_field | y_field | series_field |
|---------|-----------|----------|---------|---------|---------|--------------|
| S-B01 | Performance overview | bar_chart | categorical | final_outcome | avg_score | null |
| S-B02 | Risk status card | table | default | null | null | null |
| S-B03 | Engagement summary | bar_chart | categorical | study_effort_level | engagement_score | null |
| S-T00 | Score prediction (What-If) | scatter_plot | default | engagement_score | avg_score | null |
| S-T01 | Score trend analysis | line_chart | default | assessment_order | score_normalized | null |
| S-T02 | Competency gap analysis | bar_chart | ranked | competency_tag | avg_score | null |
| S-T03 | Peer comparison | bar_chart | grouped | metric | value | dimension |
| S-T04 | At-risk self-check | table | default | flag_name | flag_value | null |
| S-T05 | Weekly engagement trend | bar_chart | categorical | week_number | weekly_clicks | null |
| S-T06 | Study consistency check | heatmap | week_activity | week_number | weekly_clicks | null |
| S-T07 | Absence / inactivity impact | bar_chart | categorical | assessment_order | score_normalized | null |
| S-T08 | Assessment lateness impact | scatter_plot | colored | submission_delay_days | score_normalized | null |
| S-T09 | Lifestyle risk vs performance | scatter_plot | default | lifestyle_risk_score | avg_score | null |
| S-T10 | Resource engagement breakdown | pie_chart | default | resource_type | clicks | null |
| S-T11 | Registration timing vs performance | scatter_plot | colored | registration_lead_time | avg_score | null |
| S-T12 | Procrastination analysis | bar_chart | categorical | assessment_order | submission_delay_days | null |
| S-T13 | Action plan generation | table | default | null | null | null |
| S-T14 | Social balance vs performance | scatter_plot | default | social_balance_score | avg_score | null |
| S-T15 | Family context vs performance | bar_chart | categorical | family_stability_score | avg_score | null |
| A-B01 | Overall performance distribution | bar_chart | histogram | score_normalized | student_count | null |
| A-B02 | Completion / outcome summary | pie_chart | default | final_outcome | student_count | null |
| A-B03 | Engagement distribution | bar_chart | categorical | study_effort_level | student_count | null |
| A-B04 | At-risk overview | bar_chart | categorical | at_risk_label | student_count | null |
| A-S01 | Student full profile snapshot | table | default | null | null | null |
| A-S02 | Student score trend | line_chart | default | assessment_order | score_normalized | null |
| A-S03 | Student engagement trajectory | line_chart | multi_series | week_number | weekly_clicks | rolling_3wk_avg |
| A-S04 | Student risk flag breakdown | table | default | flag_name | flag_value | null |
| A-S05 | Student competency gap | bar_chart | ranked | competency_tag | avg_score | null |
| A-S06 | Student submission & punctuality | bar_chart | categorical | assessment_order | submission_delay_days | null |
| A-S07 | Student background context | table | default | null | null | null |
| A-S08 | Student intervention recommendation | table | default | null | null | null |
| A-C01 | Compare performance trajectories | line_chart | multi_series | assessment_order | score_normalized | student_id |
| A-C02 | Compare engagement patterns | bar_chart | grouped | student_id | engagement_score | metric |
| A-C03 | Compare risk profile | table | default | student_id | at_risk_score | null |
| A-C04 | Compare lifestyle context | bar_chart | grouped | student_id | lifestyle_risk_score | lifestyle_dimension |
| A-C05 | Compare academic background | table | default | student_id | disadvantage_score | null |
| A-C06 | Compare resource usage | bar_chart | grouped | resource_type | pct_of_total | student_id |
| A-G01 | Identify low-engagement group | scatter_plot | colored | active_days | engagement_score | null |
| A-G02 | Engagement–performance relationship | scatter_plot | colored | engagement_score | avg_score | null |
| A-G03 | Identify at-risk cohort | table | ranked | student_id | at_risk_score | null |
| A-G04 | Assessment difficulty analysis | bar_chart | ranked | assessment_name | fail_rate_pct | null |
| A-G05 | Submission behaviour analysis | bar_chart | grouped | student_id | submission_delay_days | final_outcome |
| A-G06 | Activity type effectiveness | bar_chart | ranked | resource_type | avg_score_by_resource_type | null |
| A-G07 | Factor correlation analysis | heatmap | score_matrix | feature_name | correlation_with_avg_score | null |
| A-G08 | Background group performance | bar_chart | ranked | group_value | avg_score | null |
| A-G09 | Socioeconomic disadvantage impact | scatter_plot | colored | disadvantage_score | avg_score | null |
| A-G10 | Consistency analysis across cohort | bar_chart | categorical | consistency_level | student_count | null |
| A-G11 | Weekly engagement drop detection | line_chart | multi_series | week_number | week_total_clicks | rolling_3wk_avg |
| A-G12 | Background group pass/fail/withdrawal rate | bar_chart | stacked | group_value | pct_within_group | final_outcome |
| A-G13 | Lifestyle risk across cohort | scatter_plot | default | lifestyle_risk_score | avg_score | null |
| A-G14 | Early withdrawal signal analysis | line_chart | multi_series | week_number | avg_clicks | final_outcome |
| A-G15 | Intervention priority ranking | table | ranked | student_id | at_risk_score | null |
| A-G16 | Admin action recommendation | table | default | null | null | null |

---

## Luồng đi từ taskRegistry.json → ChartRenderer

```
taskRegistry.json
  └── task.viz_type           → ADAPTER_MAP[viz_type]  → chọn adapter đúng
  └── task.visualization_config
        ├── x_field, y_field  → adapter.adapt(rawData, config)
        │                        → biến SQL rows thành chart format
        ├── variant           → ChartView biết render dạng gì (histogram vs categorical)
        ├── x_label, y_label  → hiển thị nhãn trục
        └── semantic_roles    → AI service đọc để build context-aware prompt
              ↓
ChartRenderer.jsx
  1. Đọc task.viz_type → lấy Adapter từ ADAPTER_MAP
  2. Đọc task.visualization_config → truyền vào adapter.adapt()
  3. Adapter transform rawData → chartData (format recharts)
  4. Render <ChartComponent data={chartData} config={visualization_config} />
  5. ChartComponent đọc config.x_label, y_label, variant để style

KHÔNG CÓ if/else nào trong ChartRenderer
KHÔNG CÓ field guessing ("is it score? is it week?")
Mọi thứ đều declarative từ metadata.
```

---

## Tại sao làm vậy? (Academic defensibility)

Đây là điểm quan trọng cần giải thích trong buổi báo cáo:

### Vấn đề cũ (rendering spaghetti)
```js
// BAD — field guessing, không maintainable
if (data[0].week_number) {
  xField = "week_number"
} else if (data[0].assessment_order) {
  xField = "assessment_order"
} else if (data[0].competency_tag) {
  xField = "competency_tag"
}
// ... 50 tasks × N fields = spaghetti không kết thúc
```

### Giải pháp (metadata-driven)
```js
// GOOD — declarative, zero guessing
const xField = taskMeta.visualization_config.x_field; // luôn đúng
const adapter = ADAPTER_MAP[taskMeta.viz_type];        // luôn đúng
const chartData = adapter.adapt(rawData, config);      // transform đúng format
```

### Liên hệ với kiến trúc tổng thể
Nguyên tắc này nhất quán với toàn bộ hệ thống:
- Backend: **No Flat Table** → SQL computed on-the-fly
- Task Registry: **Metadata-driven** → viz config, AI strategy trong JSON
- ChartRenderer: **Adapter Pattern** → pure function, zero business logic
- AI Service: **Strategy Pattern** → explanation_strategy field quyết định prompt

Tất cả đều tránh hardcode, tất cả đều declarative → dễ extend, dễ test, dễ defend.

---

## Kiểm tra nhanh một task cụ thể

```bash
# Xem config của S-T01 sau khi inject
node -e "
const t = JSON.parse(require('fs').readFileSync('src/config/taskRegistry.json'));
const task = t.find(x => x.taskId === 'S-T01');
console.log(JSON.stringify({
  taskId: task.taskId,
  viz_type: task.viz_type,
  visualization_config: task.visualization_config
}, null, 2));
"
```

Output:
```json
{
  "taskId": "S-T01",
  "viz_type": "line_chart",
  "visualization_config": {
    "x_field": "assessment_order",
    "y_field": "score_normalized",
    "series_field": null,
    "color_field": null,
    "orientation": "horizontal",
    "variant": "default",
    "x_label": "Assessment Order",
    "y_label": "Normalized Score",
    "semantic_roles": {
      "x": "time",
      "y": "performance_metric"
    }
  }
}
```

---

## Trạng thái STEP 2

- [x] `visualization_config` injected vào 53/53 tasks
- [x] `validateRegistry.js` chạy: 0 errors, 0 warnings
- [x] Scripts committed: `injectVizConfig.js`, `validateRegistry.js`

**→ STEP 2 COMPLETE. STEP 3 (Prisma Migration + Backend Skeleton) có thể bắt đầu.**

---

_Ghi lại bởi Antigravity | 2026-05-16 | Phase 3 Step 2_
