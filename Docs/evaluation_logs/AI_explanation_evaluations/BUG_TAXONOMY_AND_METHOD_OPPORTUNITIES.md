# Tổng hợp Bug Taxonomy và Cơ hội Phương pháp mới

## 1. Phạm vi tổng hợp
- Nguồn: `Docs/evaluation_logs/AI_explanation_evaluations/*_evaluation.md`
- Số task report: `52`
- Số logical bugs trích được: `96`
- Số loại bug chính sau khi gom nhóm: `11`
- Mục tiêu: gom bug theo thứ tự **phương pháp -> logic -> nhóm khác**, sau đó xác định bug nào nếu fix sẽ có thể tạo thành phương pháp sinh explanation mới so với baseline.

## 2. Baseline hiện tại và hướng xuất mới
Baseline được hiểu là pipeline sinh AI explanation trực tiếp từ chart/data preview và metadata hiện có, chưa có lớp kiểm chứng hệ thống cho data quality, evidence contract, causal language, fairness, deduplication và actionability.

Các bug lặp lại cho thấy hướng xuất mới không nên chỉ là “prompt tốt hơn”, mà nên là một phương pháp có các lớp kiểm soát trước/sau generation:

1. **Data Quality-Aware Explanation Gate**: quyết định khi nào được tạo insight, khi nào chỉ được tạo data diagnostic.
2. **Evidence-Claim Contract Verifier**: mỗi claim phải có metric/evidence bắt buộc.
3. **Causal & Statistical Guard**: chặn causal wording và strength claim thiếu hệ số thống kê.
4. **Fairness-Aware Explanation Layer**: kiểm soát demographic/lifestyle/background claims.
5. **Insight Diversification & Deduplication**: tránh insight trùng ý, ép mỗi insight đóng vai trò khác nhau.
6. **Operational Recommendation Schema**: biến recommendation chung thành action plan có target, owner, timeline, metric.

## 3. Nhóm Bug về mặt phương pháp
| Type ID | Bug type | Count | Severity mix | Affected tasks | Vì sao là bug phương pháp | Có thể thành phương pháp mới? |
|---|---|---:|---|---|---|---|
| M1 | Data-quality gating chưa chặt | 28 | Major: 28 | A-B03, A-B04, A-C02, A-C03, A-G02, A-G05, A-G08, A-G15, A-G16, A-S06, A-S08, S-B02, S-B03, S-T05, S-T08, S-T10, S-T12, S-T13 | AI vẫn diễn giải hoặc giữ confidence cao khi analytics báo insufficient/partial, thiếu capability, dataset rỗng hoặc engagement_score_available=false. Làm explanation có vẻ chắc chắn hơn dữ liệu thực tế; đặc biệt nguy hiểm với các task engagement/OULAD-only chạy trên UCI. | Data Quality-Aware Explanation Gate: trước khi gọi/generate explanation, map data_quality + warnings + capability flags thành chế độ giải thích: normal, limited, no-insight, hoặc data-diagnostic. Gate này ép model nói giới hạn dữ liệu, hạ confidence, và chặn insight/action không có evidence. |
| M2 | Evidence contract/claim verification thiếu | 10 | Major: 2, Minor: 8 | A-B02, A-G02, A-G13, A-S04, S-B01, S-B02, S-T07, S-T15 | AI hoặc metadata evidence đưa claim không được chart/data chứng minh: teaching effectiveness, correlation strength, previous trend, hoặc trạng thái pass mâu thuẫn threshold. Model biến mô tả chart thành kết luận phân tích mà backend chưa cung cấp evidence tương ứng. | Evidence-Claim Contract Verifier: mỗi claim phải gắn với metric bắt buộc. Ví dụ claim trend cần previous/delta, claim correlation strength cần r/p-value hoặc slope, claim pass status cần rule giải thích final_outcome vs threshold. |
| M3 | Correlation/causality guard thiếu | 10 | Minor: 4, Major: 6 | A-G02, A-G07, A-G09, A-G13, S-T07, S-T11, S-T14, S-T15 | Các task correlation dùng ngôn ngữ “impact”, “leads to”, “due to”, hoặc nói mạnh/yếu correlation khi preview không có hệ số thống kê. Dễ tạo kết luận nhân quả hoặc mức độ quan hệ không có căn cứ, nhất là với lifestyle, absence, socioeconomic, background. | Causal Language & Statistical Evidence Guard: rewrite hoặc chặn các cụm causal trong task correlation; chỉ cho phép “associated with/linked to” nếu có dữ liệu; chỉ nói strength khi có correlation coefficient/p-value. |
| M4 | Actionability planner chưa có cấu trúc | 36 | Minor: 36 | A-B02, A-B03, A-C01, A-C02, A-C04, A-C05, A-C06, A-G01, A-G02, A-G05, A-G06, A-G07, A-G08, A-G10, A-G12, A-G13, A-G14, A-G15, ... (+18) | Recommendation thường đúng hướng nhưng thiếu mốc thời gian, owner, đối tượng cụ thể, metric theo dõi hoặc bước tiếp theo. Người đọc biết “nên hỗ trợ” nhưng chưa biết hỗ trợ ai, khi nào, theo tiêu chí nào. | Action Plan Grounding Template: mọi recommendation phải có target group/student, evidence metric, next step, timeline, owner, success metric. Đây có thể là module hậu xử lý biến recommendation chung thành intervention plan. |
| M5 | Fairness/safety guard cho demographic/background chưa đủ | 6 | Minor: 6 | A-C04, A-C05, A-G09, A-G13, A-S07, S-T09 | Các task background/family/lifestyle/socioeconomic cần caveat rõ để không biến correlation hoặc group profile thành định kiến cá nhân. Có thể dẫn tới stigmatization hoặc decision-making thiếu công bằng nếu admin/advisor dùng trực tiếp. | Fairness-Aware Explanation Layer: tự động thêm caveat, cấm gán nhãn cá nhân dựa trên demographic/lifestyle, yêu cầu chỉ dùng dữ liệu này như context bổ sung và ưu tiên support không trừng phạt. |

## 4. Nhóm Bug về mặt logic
| Type ID | Bug type | Count | Severity mix | Affected tasks | Vấn đề logic | Fix / Method opportunity |
|---|---|---:|---|---|---|---|
| L1 | Overclaim từ outcome sang nguyên nhân/hiệu quả | 8 | Major: 8 | A-B02, A-G07, A-G09, A-G13, S-T07, S-T10, S-T11, S-T14 | AI suy diễn từ outcome cao/thấp sang nguyên nhân như teaching effectiveness hoặc yếu tố gây ảnh hưởng. Sai logic giải thích: chart mô tả phân bố không đủ để kết luận nguyên nhân. | Claim Scope Classifier: phân loại claim thành descriptive, comparative, diagnostic, causal; chỉ cho phép claim cấp cao nếu evidence đủ. |
| L2 | Mâu thuẫn nội bộ giữa metric và trạng thái | 1 | Major: 1 | S-B01 | Một số explanation không xử lý rõ khi final_outcome=Pass nhưng avg_score dưới pass_threshold/performance_band below_pass_threshold. Người học/admin có thể hiểu “Pass” là an toàn, dù các chỉ báo score đang yếu. | Contradiction Resolver: phát hiện metric-status conflict và buộc summary nêu “fragile pass”, “rule mismatch”, hoặc yêu cầu verify grading rule. |
| L3 | Insight trùng ý hoặc thiếu phân vai | 10 | Minor: 10 | A-B01, A-C04, A-C05, A-G08, A-S02, A-S07, A-S08, S-B01, S-B02, S-T03 | Nhiều insight cùng nói về score/performance mà không phân biệt average, percentile, threshold, trend hoặc cohort rank. Làm explanation dài nhưng ít giá trị mới; giảm novelty/diversity. | Insight Diversification & Deduplication: chọn insight theo coverage slots, ví dụ absolute score, relative percentile, threshold status, trend, action implication. |
| L4 | Metadata comparison sai ngữ nghĩa | 4 | Minor: 4 | A-S04, S-B01, S-B02 | Evidence dùng comparison=down_from_previous nhưng không có delta hoặc previous value. Gây hiểu nhầm có trend/history trong khi task chỉ là card/distribution. | Evidence Metadata Validator: kiểm tra comparison enum với dữ liệu bắt buộc; reject down_from_previous nếu thiếu previous/delta. |

## 5. Một số nhóm bug khác
| Type ID | Bug type | Count | Severity mix | Affected tasks | Ý nghĩa | Fix / Method opportunity |
|---|---|---:|---|---|---|---|
| O1 | Thiếu diagnostic mode khi dataset rỗng | 11 | Major: 11 | A-B03, A-B04, A-C02, A-C03, A-G02, A-G16, A-S08, S-B03, S-T05, S-T10 | Một số task vẫn tạo explanation/action như bình thường thay vì chuyển sang data diagnostic. Lẫn lộn giữa “không có hiện tượng” và “không có dữ liệu đo hiện tượng”. | No-Data Diagnostic Report: khi dataset rỗng, output chuyển sang kiểm tra capability, expected dataset, missing fields, và data collection recommendation. |
| O2 | Utility thấp do action thiếu vận hành | 36 | Minor: 36 | A-B02, A-B03, A-C01, A-C02, A-C04, A-C05, A-C06, A-G01, A-G02, A-G05, A-G06, A-G07, A-G08, A-G10, A-G12, A-G13, A-G14, A-G15, ... (+18) | Recommendation chưa đủ operational cho giáo viên/admin/advisor. Giảm human utility dù explanation đúng số liệu. | Operational Recommendation Schema: target, why, first action, owner, timeframe, follow-up metric. |

## 6. Ưu tiên bug nên fix để tạo phương pháp xuất mới
| Priority | Method candidate | Bug types covered | Why it is publishable/new vs baseline | Expected improvement |
|---:|---|---|---|---|
| 1 | Data Quality-Aware Explanation Gate + No-Data Diagnostic Report | M1, O1 | Baseline vẫn để AI giải thích khi data insufficient/partial hoặc capability missing. Phương pháp mới biến data quality thành policy điều khiển explanation mode. | Giảm hallucination/overclaim trên dataset rỗng, hạ confidence hợp lý, tăng faithfulness. |
| 2 | Evidence-Claim Contract Verifier | M2, L4, L2 | Baseline chưa kiểm tra claim có đủ metric bắt buộc. Contract verifier tạo cầu nối formal giữa chart schema và natural-language claim. | Chặn trend giả, comparison sai metadata, pass/status conflict, teaching-effectiveness overclaim. |
| 3 | Causal & Statistical Guard | M3, L1 | Baseline dễ dùng từ causal trong task correlation. Guard này biến correlation explanation thành mô tả association có điều kiện. | Tăng correctness, giảm causal overclaim, phù hợp chuẩn giải thích dữ liệu giáo dục. |
| 4 | Operational Recommendation Schema | M4, O2 | Baseline recommendation thường chung chung. Schema mới ép action có target-owner-timeframe-metric. | Tăng actionability và human utility cho teacher/admin/advisor. |
| 5 | Fairness-Aware Explanation Layer | M5 | Baseline chưa đủ guard cho lifestyle/background/socioeconomic. Đây là lớp safety chuyên cho education analytics. | Giảm rủi ro gán nhãn/stigmatization, tăng fairness/safety. |
| 6 | Insight Diversification & Deduplication | L3 | Baseline có insight lặp lại cùng ý score/performance. Phương pháp mới tối ưu coverage thay vì chỉ tạo nhiều insight. | Tăng novelty/diversity, giảm redundancy. |

## 7. Chi tiết loại bug và ví dụ task
### M1. Data-quality gating chưa chặt
- Nhóm: Phương pháp
- Số bug: 28
- Severity: Major: 28
- Task bị ảnh hưởng: A-B03, A-B04, A-C02, A-C03, A-G02, A-G05, A-G08, A-G15, A-G16, A-S06, A-S08, S-B02, S-B03, S-T05, S-T08, S-T10, S-T12, S-T13
- Mô tả: AI vẫn diễn giải hoặc giữ confidence cao khi analytics báo insufficient/partial, thiếu capability, dataset rỗng hoặc engagement_score_available=false.
- Rủi ro: Làm explanation có vẻ chắc chắn hơn dữ liệu thực tế; đặc biệt nguy hiểm với các task engagement/OULAD-only chạy trên UCI.
- Hướng fix/phương pháp: Data Quality-Aware Explanation Gate: trước khi gọi/generate explanation, map data_quality + warnings + capability flags thành chế độ giải thích: normal, limited, no-insight, hoặc data-diagnostic. Gate này ép model nói giới hạn dữ liệu, hạ confidence, và chặn insight/action không có evidence.
- Ví dụ:
  - `A-B03` (Major, Summary): Explanation không phản ánh rõ trạng thái insufficient_data của analytics.
  - `A-B03` (Major, Confidence): AI confidence HIGH mâu thuẫn với data_quality không executable/partial.
  - `A-B04` (Major, Summary): Explanation không phản ánh rõ trạng thái insufficient_data của analytics.

### M2. Evidence contract/claim verification thiếu
- Nhóm: Phương pháp
- Số bug: 10
- Severity: Major: 2, Minor: 8
- Task bị ảnh hưởng: A-B02, A-G02, A-G13, A-S04, S-B01, S-B02, S-T07, S-T15
- Mô tả: AI hoặc metadata evidence đưa claim không được chart/data chứng minh: teaching effectiveness, correlation strength, previous trend, hoặc trạng thái pass mâu thuẫn threshold.
- Rủi ro: Model biến mô tả chart thành kết luận phân tích mà backend chưa cung cấp evidence tương ứng.
- Hướng fix/phương pháp: Evidence-Claim Contract Verifier: mỗi claim phải gắn với metric bắt buộc. Ví dụ claim trend cần previous/delta, claim correlation strength cần r/p-value hoặc slope, claim pass status cần rule giải thích final_outcome vs threshold.
- Ví dụ:
  - `A-B02` (Major, Insight: High Pass Rate): AI kết luận “effective teaching strategies” từ tỷ lệ pass cao. Đây là overclaim vì chart chỉ có phân bố outcome, không có dữ liệu về chiến lược giảng dạy hay quan hệ nhân quả.
  - `A-G02` (Minor, Correlation explanation): AI mô tả độ mạnh/ý nghĩa correlation nhưng evidence preview không có hệ số correlation/p-value.
  - `A-G13` (Minor, Correlation explanation): AI mô tả độ mạnh/ý nghĩa correlation nhưng evidence preview không có hệ số correlation/p-value.

### M3. Correlation/causality guard thiếu
- Nhóm: Phương pháp
- Số bug: 10
- Severity: Minor: 4, Major: 6
- Task bị ảnh hưởng: A-G02, A-G07, A-G09, A-G13, S-T07, S-T11, S-T14, S-T15
- Mô tả: Các task correlation dùng ngôn ngữ “impact”, “leads to”, “due to”, hoặc nói mạnh/yếu correlation khi preview không có hệ số thống kê.
- Rủi ro: Dễ tạo kết luận nhân quả hoặc mức độ quan hệ không có căn cứ, nhất là với lifestyle, absence, socioeconomic, background.
- Hướng fix/phương pháp: Causal Language & Statistical Evidence Guard: rewrite hoặc chặn các cụm causal trong task correlation; chỉ cho phép “associated with/linked to” nếu có dữ liệu; chỉ nói strength khi có correlation coefficient/p-value.
- Ví dụ:
  - `A-G02` (Minor, Correlation explanation): AI mô tả độ mạnh/ý nghĩa correlation nhưng evidence preview không có hệ số correlation/p-value.
  - `A-G07` (Major, Correlation explanation): Ngôn ngữ có xu hướng causal trong task correlation.
  - `A-G09` (Major, Correlation explanation): Ngôn ngữ có xu hướng causal trong task correlation.

### M4. Actionability planner chưa có cấu trúc
- Nhóm: Phương pháp
- Số bug: 36
- Severity: Minor: 36
- Task bị ảnh hưởng: A-B02, A-B03, A-C01, A-C02, A-C04, A-C05, A-C06, A-G01, A-G02, A-G05, A-G06, A-G07, A-G08, A-G10, A-G12, A-G13, A-G14, A-G15, A-G16, A-S01, A-S04, A-S06, A-S07, A-S08, S-B02, S-B03, S-T02, S-T03, S-T06, S-T07, S-T08, S-T09, S-T11, S-T12, S-T13, S-T15
- Mô tả: Recommendation thường đúng hướng nhưng thiếu mốc thời gian, owner, đối tượng cụ thể, metric theo dõi hoặc bước tiếp theo.
- Rủi ro: Người đọc biết “nên hỗ trợ” nhưng chưa biết hỗ trợ ai, khi nào, theo tiêu chí nào.
- Hướng fix/phương pháp: Action Plan Grounding Template: mọi recommendation phải có target group/student, evidence metric, next step, timeline, owner, success metric. Đây có thể là module hậu xử lý biến recommendation chung thành intervention plan.
- Ví dụ:
  - `A-B02` (Minor, Recommended Action): Recommendation còn chung, thiếu bước cụ thể/mốc thời gian/đối tượng thực hiện.
  - `A-B03` (Minor, Recommended Action): Recommendation còn chung, thiếu bước cụ thể/mốc thời gian/đối tượng thực hiện.
  - `A-C01` (Minor, Recommended Action): Recommendation còn chung, thiếu bước cụ thể/mốc thời gian/đối tượng thực hiện.

### M5. Fairness/safety guard cho demographic/background chưa đủ
- Nhóm: Phương pháp
- Số bug: 6
- Severity: Minor: 6
- Task bị ảnh hưởng: A-C04, A-C05, A-G09, A-G13, A-S07, S-T09
- Mô tả: Các task background/family/lifestyle/socioeconomic cần caveat rõ để không biến correlation hoặc group profile thành định kiến cá nhân.
- Rủi ro: Có thể dẫn tới stigmatization hoặc decision-making thiếu công bằng nếu admin/advisor dùng trực tiếp.
- Hướng fix/phương pháp: Fairness-Aware Explanation Layer: tự động thêm caveat, cấm gán nhãn cá nhân dựa trên demographic/lifestyle, yêu cầu chỉ dùng dữ liệu này như context bổ sung và ưu tiên support không trừng phạt.
- Ví dụ:
  - `A-C04` (Minor, Fairness/safety): Task dùng yếu tố nền tảng/demographic/lifestyle; cần thận trọng để tránh gán nhãn rủi ro cá nhân thiếu căn cứ.
  - `A-C05` (Minor, Fairness/safety): Task dùng yếu tố nền tảng/demographic/lifestyle; cần thận trọng để tránh gán nhãn rủi ro cá nhân thiếu căn cứ.
  - `A-G09` (Minor, Fairness/safety): Task dùng yếu tố nền tảng/demographic/lifestyle; cần thận trọng để tránh gán nhãn rủi ro cá nhân thiếu căn cứ.

### L1. Overclaim từ outcome sang nguyên nhân/hiệu quả
- Nhóm: Logic
- Số bug: 8
- Severity: Major: 8
- Task bị ảnh hưởng: A-B02, A-G07, A-G09, A-G13, S-T07, S-T10, S-T11, S-T14
- Mô tả: AI suy diễn từ outcome cao/thấp sang nguyên nhân như teaching effectiveness hoặc yếu tố gây ảnh hưởng.
- Rủi ro: Sai logic giải thích: chart mô tả phân bố không đủ để kết luận nguyên nhân.
- Hướng fix/phương pháp: Claim Scope Classifier: phân loại claim thành descriptive, comparative, diagnostic, causal; chỉ cho phép claim cấp cao nếu evidence đủ.
- Ví dụ:
  - `A-B02` (Major, Insight: High Pass Rate): AI kết luận “effective teaching strategies” từ tỷ lệ pass cao. Đây là overclaim vì chart chỉ có phân bố outcome, không có dữ liệu về chiến lược giảng dạy hay quan hệ nhân quả.
  - `A-G07` (Major, Correlation explanation): Ngôn ngữ có xu hướng causal trong task correlation.
  - `A-G09` (Major, Correlation explanation): Ngôn ngữ có xu hướng causal trong task correlation.

### L2. Mâu thuẫn nội bộ giữa metric và trạng thái
- Nhóm: Logic
- Số bug: 1
- Severity: Major: 1
- Task bị ảnh hưởng: S-B01
- Mô tả: Một số explanation không xử lý rõ khi final_outcome=Pass nhưng avg_score dưới pass_threshold/performance_band below_pass_threshold.
- Rủi ro: Người học/admin có thể hiểu “Pass” là an toàn, dù các chỉ báo score đang yếu.
- Hướng fix/phương pháp: Contradiction Resolver: phát hiện metric-status conflict và buộc summary nêu “fragile pass”, “rule mismatch”, hoặc yêu cầu verify grading rule.
- Ví dụ:
  - `S-B01` (Major, Summary): AI chưa xử lý rõ mâu thuẫn giữa final_outcome=Pass và avg_score dưới pass_threshold/performance_band below_pass_threshold.

### L3. Insight trùng ý hoặc thiếu phân vai
- Nhóm: Logic
- Số bug: 10
- Severity: Minor: 10
- Task bị ảnh hưởng: A-B01, A-C04, A-C05, A-G08, A-S02, A-S07, A-S08, S-B01, S-B02, S-T03
- Mô tả: Nhiều insight cùng nói về score/performance mà không phân biệt average, percentile, threshold, trend hoặc cohort rank.
- Rủi ro: Làm explanation dài nhưng ít giá trị mới; giảm novelty/diversity.
- Hướng fix/phương pháp: Insight Diversification & Deduplication: chọn insight theo coverage slots, ví dụ absolute score, relative percentile, threshold status, trend, action implication.
- Ví dụ:
  - `A-B01` (Minor, Insights): Một số insight có thể trùng ý về performance/score nếu không phân biệt rõ average, percentile, threshold hoặc trend.
  - `A-C04` (Minor, Insights): Một số insight có thể trùng ý về performance/score nếu không phân biệt rõ average, percentile, threshold hoặc trend.
  - `A-C05` (Minor, Insights): Một số insight có thể trùng ý về performance/score nếu không phân biệt rõ average, percentile, threshold hoặc trend.

### L4. Metadata comparison sai ngữ nghĩa
- Nhóm: Logic
- Số bug: 4
- Severity: Minor: 4
- Task bị ảnh hưởng: A-S04, S-B01, S-B02
- Mô tả: Evidence dùng comparison=down_from_previous nhưng không có delta hoặc previous value.
- Rủi ro: Gây hiểu nhầm có trend/history trong khi task chỉ là card/distribution.
- Hướng fix/phương pháp: Evidence Metadata Validator: kiểm tra comparison enum với dữ liệu bắt buộc; reject down_from_previous nếu thiếu previous/delta.
- Ví dụ:
  - `A-S04` (Minor, Insight: Low Academic Score): Evidence metadata dùng down_from_previous nhưng không có delta/previous value.
  - `A-S04` (Minor, Insight: Low Punctuality): Evidence metadata dùng down_from_previous nhưng không có delta/previous value.
  - `S-B01` (Minor, Insight: Score Comparison to Class Average): Evidence metadata dùng down_from_previous nhưng không có delta/previous value.

### O1. Thiếu diagnostic mode khi dataset rỗng
- Nhóm: Khác
- Số bug: 11
- Severity: Major: 11
- Task bị ảnh hưởng: A-B03, A-B04, A-C02, A-C03, A-G02, A-G16, A-S08, S-B03, S-T05, S-T10
- Mô tả: Một số task vẫn tạo explanation/action như bình thường thay vì chuyển sang data diagnostic.
- Rủi ro: Lẫn lộn giữa “không có hiện tượng” và “không có dữ liệu đo hiện tượng”.
- Hướng fix/phương pháp: No-Data Diagnostic Report: khi dataset rỗng, output chuyển sang kiểm tra capability, expected dataset, missing fields, và data collection recommendation.
- Ví dụ:
  - `A-B03` (Major, Summary): Explanation không phản ánh rõ trạng thái insufficient_data của analytics.
  - `A-B04` (Major, Summary): Explanation không phản ánh rõ trạng thái insufficient_data của analytics.
  - `A-C02` (Major, Summary): Explanation không phản ánh rõ trạng thái insufficient_data của analytics.

### O2. Utility thấp do action thiếu vận hành
- Nhóm: Khác
- Số bug: 36
- Severity: Minor: 36
- Task bị ảnh hưởng: A-B02, A-B03, A-C01, A-C02, A-C04, A-C05, A-C06, A-G01, A-G02, A-G05, A-G06, A-G07, A-G08, A-G10, A-G12, A-G13, A-G14, A-G15, A-G16, A-S01, A-S04, A-S06, A-S07, A-S08, S-B02, S-B03, S-T02, S-T03, S-T06, S-T07, S-T08, S-T09, S-T11, S-T12, S-T13, S-T15
- Mô tả: Recommendation chưa đủ operational cho giáo viên/admin/advisor.
- Rủi ro: Giảm human utility dù explanation đúng số liệu.
- Hướng fix/phương pháp: Operational Recommendation Schema: target, why, first action, owner, timeframe, follow-up metric.
- Ví dụ:
  - `A-B02` (Minor, Recommended Action): Recommendation còn chung, thiếu bước cụ thể/mốc thời gian/đối tượng thực hiện.
  - `A-B03` (Minor, Recommended Action): Recommendation còn chung, thiếu bước cụ thể/mốc thời gian/đối tượng thực hiện.
  - `A-C01` (Minor, Recommended Action): Recommendation còn chung, thiếu bước cụ thể/mốc thời gian/đối tượng thực hiện.

## 9. Kết luận ngắn
Các bug có giá trị nghiên cứu cao nhất là bug phương pháp, không phải lỗi câu chữ đơn lẻ. Nếu cần chọn một đóng góp chính để so với baseline, hướng mạnh nhất là **Data Quality-Aware + Evidence-Contracted AI Explanation**: explanation chỉ được sinh khi dữ liệu đủ điều kiện, mỗi claim phải có evidence contract, và recommendation phải được chuyển thành action plan có thể thực hiện. Các module causal guard, fairness guard và insight dedup có thể là ablation hoặc extension để chứng minh cải thiện faithfulness, correctness, safety và human utility.
