# Bug Report AI Explanation

## 1. Phạm vi
- Nguồn taxonomy: `BUG_TAXONOMY_AND_METHOD_OPPORTUNITIES.md`
- Nguồn bổ sung: `SEMANTIC_PROMPT_SUMMARIZATION_BUG_AND_FIX_PLAN.md`
- Số task report: `52`
- Số logical bugs: `96`
- Số nhóm bug: `11`

Mục tiêu của file này là chuẩn hóa các bug theo hướng có thể triển khai fix, thay vì xem chúng như lỗi câu chữ riêng lẻ.

## 2. Tóm tắt điều hành
Các bug lặp lại cho thấy AI explanation đang thiếu các lớp kiểm soát:
- kiểm soát data quality trước khi generate,
- evidence contract cho từng claim,
- guard cho causal/statistical wording,
- guard cho fairness/safety,
- dedup insight,
- schema recommendation có tính vận hành,
- và đặc biệt là semantic prompt summarization để tránh lỗi `rows[:20]`.

Bug `A-G14` chứng minh một vấn đề nền tảng: AI có thể không hallucinate, nhưng vẫn sai nếu dữ liệu đưa vào prompt bị nén sai. Model nhìn thấy số thật của nhóm `Distinction`, nhưng task cần phân tích nhóm `Withdrawn`, nên explanation dùng đúng số nhưng sai ngữ nghĩa.

## 3. Bảng nhóm bug chính
| Type ID | Bug type | Count | Severity mix | Affected tasks | Priority |
|---|---|---:|---|---|---|
| M1 | Data-quality gating chưa chặt | 28 | Major: 28 | A-B03, A-B04, A-C02, A-C03, A-G02, A-G05, A-G08, A-G15, A-G16, A-S06, A-S08, S-B02, S-B03, S-T05, S-T08, S-T10, S-T12, S-T13 | P0 |
| M2 | Evidence contract/claim verification thiếu | 10 | Major: 2, Minor: 8 | A-B02, A-G02, A-G13, A-S04, S-B01, S-B02, S-T07, S-T15 | P0 |
| M3 | Correlation/causality guard thiếu | 10 | Major: 6, Minor: 4 | A-G02, A-G07, A-G09, A-G13, S-T07, S-T11, S-T14, S-T15 | P1 |
| M4 | Actionability planner chưa có cấu trúc | 36 | Minor: 36 | A-B02, A-B03, A-C01, A-C02, A-C04, A-C05, A-C06, A-G01, A-G02, A-G05, A-G06, A-G07, A-G08, A-G10, A-G12, A-G13, A-G14, A-G15, A-G16, A-S01, A-S04, A-S06, A-S07, A-S08, S-B02, S-B03, S-T02, S-T03, S-T06, S-T07, S-T08, S-T09, S-T11, S-T12, S-T13, S-T15 | P1 |
| M5 | Fairness/safety guard cho demographic/background chưa đủ | 6 | Minor: 6 | A-C04, A-C05, A-G09, A-G13, A-S07, S-T09 | P2 |
| L1 | Overclaim từ outcome sang nguyên nhân/hiệu quả | 8 | Major: 8 | A-B02, A-G07, A-G09, A-G13, S-T07, S-T10, S-T11, S-T14 | P0 |
| L2 | Mâu thuẫn nội bộ giữa metric và trạng thái | 1 | Major: 1 | S-B01 | P1 |
| L3 | Insight trùng ý hoặc thiếu phân vai | 10 | Minor: 10 | A-B01, A-C04, A-C05, A-G08, A-S02, A-S07, A-S08, S-B01, S-B02, S-T03 | P2 |
| L4 | Metadata comparison sai ngữ nghĩa | 4 | Minor: 4 | A-S04, S-B01, S-B02 | P1 |
| O1 | Thiếu diagnostic mode khi dataset rỗng | 11 | Major: 11 | A-B03, A-B04, A-C02, A-C03, A-G02, A-G16, A-S08, S-B03, S-T05, S-T10 | P0 |
| O2 | Utility thấp do action thiếu vận hành | 36 | Minor: 36 | Nhóm task actionability rộng tương tự M4 | P1 |
| P1 | Semantic prompt truncation / `rows[:20]` sai trọng tâm | Confirmed: 1, risk: nhiều task multi-group/time-series | Major | Confirmed: A-G14; risk: trend, risk, ranking, distribution, correlation, comparison tasks chưa migrate | P0 |

## 4. Bug mới cần nhấn mạnh: semantic prompt truncation
### Mô tả
Hệ thống cũ giới hạn prompt bằng cách lấy 20 dòng đầu dataset. Cách này giúp prompt ngắn, nhưng không đảm bảo đúng trọng tâm phân tích.

Với `A-G14`, task cần phân tích `Withdrawn`, nhưng SQL sort theo `final_outcome, week_number`, làm 20 dòng đầu thuộc `Distinction`. AI vì vậy tạo explanation dựa trên nhóm học tốt, không phải nhóm dropout.

### Impact
- Chart/UI vẫn đúng, nên bug khó phát hiện bằng mắt nếu chỉ nhìn chart.
- AI explanation render đúng format nhưng sai meaning.
- Người dùng có thể tin recommendation lệch thời điểm can thiệp.
- Đây là dạng lỗi “đúng số nhưng sai context”.

### Expected behavior
AI prompt không nên dùng first N rows làm nguồn chính. Prompt nên chứa summary theo ý nghĩa task:
- trend: first/last/peak/trough/largest drop/rise,
- risk: triggered flags/severity/thresholds,
- distribution: group proportion/focus total,
- comparison: group gap/denominator/reliability,
- correlation: coefficient/sample size/outliers,
- ranking: top K/bottom K/median/outliers.

### Fix đã thực hiện
Hệ thống đã chuyển sang registry-driven summarizers:
- `trend_comparison` cho `A-G14`,
- `categorical_distribution` cho `A-B02`, `A-B03`, `A-G10`,
- `risk_flags` cho `S-T04`, `A-S04`,
- `trend_series` cho `S-T01`, `A-G18`, `A-G11`,
- `generic_fallback` cho task chưa migrate.

## 5. Chi tiết các nhóm bug
### M1 / O1. Data-quality gating và no-data diagnostic
**Problem:** AI vẫn tạo insight bình thường hoặc giữ confidence cao khi data insufficient, partial, empty hoặc unsupported.

**Impact:** Người dùng có thể hiểu nhầm “không có dữ liệu” thành “không có vấn đề”.

**Fix:** Data Quality-Aware Explanation Gate và No-Data Diagnostic Report.

### M2 / L4 / L2. Evidence contract và metadata validation
**Problem:** Claim có thể xuất hiện mà thiếu metric bắt buộc. Một số evidence metadata dùng `down_from_previous` nhưng không có previous value/delta.

**Impact:** Explanation có vẻ định lượng nhưng không kiểm chứng được.

**Fix:** Evidence-Claim Contract Verifier và Evidence Metadata Validator.

### M3 / L1. Causal/statistical overclaim
**Problem:** Correlation/distribution task dùng từ như “impact”, “leads to”, “due to”, hoặc nói strength khi thiếu coefficient/p-value.

**Impact:** Biến association thành causation.

**Fix:** Causal & Statistical Guard.

### M4 / O2. Recommendation thiếu vận hành
**Problem:** Recommendation thường đúng hướng nhưng thiếu target, owner, timeframe, follow-up metric.

**Impact:** Người đọc chưa biết phải làm gì, ai làm, khi nào, đo bằng gì.

**Fix:** Operational Recommendation Schema.

### M5. Fairness/safety
**Problem:** Task dùng demographic/background/lifestyle có thể dẫn tới gán nhãn rủi ro thiếu căn cứ.

**Impact:** Có nguy cơ stigmatization hoặc quyết định thiếu công bằng.

**Fix:** Fairness-Aware Explanation Layer.

### L3. Insight redundancy
**Problem:** Nhiều insight lặp lại cùng ý score/performance.

**Impact:** Explanation dài nhưng ít giá trị mới.

**Fix:** Insight Diversification & Deduplication.

## 6. Ưu tiên fix
| Priority | Module fix | Bug types covered | Lý do |
|---:|---|---|---|
| 1 | Semantic Prompt Summarization Framework | P1, M2, một phần L3 | Chặn lỗi AI nhìn sai evidence do prompt slice. |
| 2 | Data Quality-Aware Explanation Gate | M1, O1 | Chặn major bug khi data thiếu/rỗng/partial. |
| 3 | Evidence-Claim Contract Verifier | M2, L4, L2 | Mỗi claim phải có evidence bắt buộc. |
| 4 | Causal & Statistical Guard | M3, L1 | Chặn causal/correlation overclaim. |
| 5 | Operational Recommendation Schema | M4, O2 | Tăng human utility. |
| 6 | Fairness-Aware Explanation Layer | M5 | Giảm rủi ro nhạy cảm. |
| 7 | Insight Diversification & Deduplication | L3 | Giảm trùng ý và tăng novelty. |

## 7. Acceptance criteria
- Không dùng `rows[:20]` làm nguồn evidence chính.
- Task có `aiSummaryType` phải route đúng summarizer.
- Task chưa migrate phải dùng `generic_fallback` và không crash.
- Empty/unsupported data không được sinh normal insight.
- Confidence phải bị cap khi data insufficient/partial.
- Mỗi insight phải có claim type và required evidence.
- Correlation task không được dùng causal wording nếu thiếu causal evidence.
- Recommendation phải có target, owner, timeframe, first action, follow-up metric nếu đủ evidence.
- Sensitive/background tasks phải có fairness caveat.
- Prompt summary phải bounded và không bị truncate vô nghĩa.

## 8. Final verdict
**METHOD_LEVEL_FIX_REQUIRED**

Bug pattern là hệ thống, không phải lỗi prompt đơn lẻ. Cần duy trì hướng fix bằng semantic summarization + evidence contract + data quality gate.

