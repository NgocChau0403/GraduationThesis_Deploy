# Tổng hợp đánh giá AI Explanation

## 1. Nguồn đánh giá
- Evaluation mẫu: `C:\Users\USER\Downloads\A-B01_evaluation.md`
- Bug taxonomy tổng hợp: `C:\Users\USER\Downloads\BUG_TAXONOMY_AND_METHOD_OPPORTUNITIES.md`
- Phân tích bug prompt summarization: `Docs/evaluation/ai_explanation_method/SEMANTIC_PROMPT_SUMMARIZATION_BUG_AND_FIX_PLAN.md`
- Phạm vi: chất lượng AI explanation trong hệ thống education analytics dashboard.
- Số task report trong taxonomy: `52`
- Số logical bugs trích được: `96`
- Số nhóm bug chính: `11`

Evaluation mẫu `A-B01` cho thấy format đánh giá cần có:
- input evidence từ chart/data preview,
- phần AI explanation được trích ra theo section,
- đánh giá từng section,
- rubric score,
- logical bugs,
- final verdict.

File này mở rộng format đó lên mức toàn pipeline, đồng thời bổ sung bug quan trọng về **semantic prompt summarization**: hệ thống từng giới hạn prompt bằng `rows[:20]`, làm AI nhìn đúng số nhưng sai ngữ nghĩa phân tích.

## 2. Baseline được đánh giá
Baseline cũ là pipeline sinh AI explanation trực tiếp từ:
- chart/data preview,
- task metadata,
- prompt hint,
- data quality/confidence,
- một phần dataset đã bị cắt ngắn để tránh prompt quá dài.

Điểm yếu lớn nhất của baseline không chỉ nằm ở wording. Vấn đề là pipeline chưa có đủ lớp kiểm soát trước và sau khi gọi model:
- chưa gate theo data quality,
- chưa có evidence contract cho từng claim,
- chưa kiểm causal/statistical wording,
- chưa có fairness guard cho demographic/background,
- chưa ép recommendation thành action plan,
- và trước Phase 1, từng dùng cách nén dữ liệu thô `rows[:20]`.

## 3. Rubric đánh giá
| Tiêu chí | Ý nghĩa | Lỗi thường gặp |
|---|---|---|
| Faithfulness | Explanation phải bám vào chart/data evidence, dataset stats và data quality. | AI nói pattern không có trong evidence, bỏ qua dataset rỗng/partial, hoặc dùng lát cắt row sai. |
| Correctness | Số liệu, hướng trend, comparison, threshold và statistical wording phải đúng. | Claim trend sai, causal wording, unsupported correlation strength, diễn giải sai threshold. |
| Pedagogical relevance | Nội dung phải phù hợp task giáo dục, dashboard scope và audience. | Gợi ý quá chung hoặc không đúng vai trò student/admin/instructor. |
| Actionability | Recommendation phải giúp người đọc biết làm gì tiếp theo. | Thiếu target, owner, timeframe, metric theo dõi hoặc bước triển khai. |
| Novelty | Insight phải thêm giá trị diễn giải, không chỉ lặp lại chart. | Insight chỉ nhắc lại số đã hiển thị. |
| Diversity | Các insight nên có vai trò khác nhau. | Nhiều insight cùng nói một ý về score/performance. |
| Fairness/safety | Không dùng demographic/lifestyle/background để gán nhãn rủi ro thiếu căn cứ. | Dễ tạo stigmatization hoặc causal claim về yếu tố nhạy cảm. |
| Understandability | Explanation rõ ràng, nhất quán, dễ hiểu. | Confidence mơ hồ, status và metric mâu thuẫn, conclusion không rõ nguồn. |
| Human utility | Người đọc có thể dùng explanation để ra quyết định. | Text đúng một phần nhưng không đủ vận hành. |

## 4. Kết quả tổng hợp theo nhóm chất lượng
| Mảng đánh giá | Kết quả quan sát | Bằng chứng chính |
|---|---|---|
| Data grounding | Chưa ổn định | 28 major bugs về data-quality gating, 11 major bugs về thiếu diagnostic mode, và bug `A-G14` do `rows[:20]` làm mất target group. |
| Claim correctness | Trung bình | 10 bugs về evidence contract, 10 bugs về causal/statistical guard, nhiều task correlation dễ overclaim. |
| Prompt summarization | Đã cải thiện sau fix | Trước đây `rows[:20]` có thể gửi sai group; hiện đã có `trend_comparison`, `categorical_distribution`, `risk_flags`, `trend_series`, `generic_fallback`. |
| Recommendation utility | Yếu đến trung bình | 36 minor bugs về actionability; recommendation thường đúng hướng nhưng thiếu target/owner/timeframe/metric. |
| Insight quality | Trung bình | 10 minor bugs về insight trùng ý hoặc thiếu phân vai. |
| Fairness/safety | Trung bình | 6 minor bugs trên task demographic/background/socioeconomic/lifestyle. |

## 5. Case study: bug A-G14
Task `A-G14 - Early withdrawal signal analysis` yêu cầu AI tìm tín hiệu sớm cho nhóm `Withdrawn` và so sánh với nhóm passing students.

SQL output lại sort theo:

```sql
ORDER BY final_outcome, week_number
```

Do thứ tự alphabet thường là:

```text
Distinction -> Fail -> Pass -> Withdrawn
```

khi AIService cũ chỉ gửi 20 dòng đầu, prompt gần như chỉ chứa nhóm `Distinction`. Chart vẫn đúng vì chart nhận full dataset, nhưng AI explanation bị lệch:
- dùng số của `Distinction`,
- tưởng đó là tín hiệu withdrawal,
- chọn sai turning point,
- recommendation lệch thời điểm can thiệp.

Đây là lỗi đặc biệt nguy hiểm vì:

```text
số liệu có thể đúng,
nhưng group/evidence context sai,
nên conclusion sai.
```

## 6. Đánh giá theo từng section của AI explanation
| Section | Chất lượng thường thấy | Bug thường gặp | Yêu cầu cải thiện |
|---|---|---|---|
| Summary | Dễ đọc nếu data bình thường. | Overstate certainty khi data partial/empty; có thể sai target group nếu summary input bị truncate. | Summary phải biết mode: normal, limited, no-insight, data-diagnostic. |
| Insight | Thường có metric cụ thể. | Duplicate insight, unsupported comparison, causal overclaim, dùng group sai. | Mỗi insight cần claim type, evidence contract và diversity slot. |
| Educational implication | Thường hợp domain. | Có thể suy luận nguyên nhân hoặc weakness vượt quá evidence. | Implication phải nằm trong claim scope được phép. |
| Recommended action | Có thiện chí, đúng hướng chung. | Quá chung, thiếu target/owner/timeframe/follow-up metric. | Dùng operational recommendation schema. |
| Confidence/data quality | Chưa luôn khớp evidence. | Confidence cao dù data insufficient/partial hoặc capability missing. | Data Quality Gate phải cap confidence và đổi explanation mode. |

## 7. Những task đã được fix ở lớp prompt summarization
| Task | Summarizer | Mục tiêu fix |
|---|---|---|
| `A-G14` | `trend_comparison` | Tập trung `Withdrawn`, so sánh `Pass`/`Distinction`, tính first/last/peak/trough/largest drop/rise/reliable drop. |
| `A-B02` | `categorical_distribution` | Gửi outcome distribution đầy đủ, focus `Fail + Withdrawn`. |
| `A-B03` | `categorical_distribution` | Giữ thứ tự effort `very_low -> low -> medium -> high`, focus low tail. |
| `A-G10` | `categorical_distribution` | Giữ thứ tự consistency `high -> medium -> low`, focus low consistency. |
| `S-T04` | `risk_flags` | Gửi triggered flags, severity, thresholds, recommended actions từ data. |
| `A-S04` | `risk_flags` | Không invent severity/action nếu SQL không trả về. |
| `S-T01` | `trend_series` | Sort theo `assessment_order`, không coi `pass_flag` là risk flag. |
| `A-G18` | `trend_series` | Giữ class performance trend, pass rate, completion rate. |
| `A-G11` | `trend_series` | Sort theo `week_number`, flagged points chỉ từ `is_drop_week`. |

## 8. Kết luận đánh giá
**Verdict: PASS_WITH_METHOD_RISK**

Pipeline hiện tại có thể tạo explanation tốt cho task đơn giản như `A-B01`, nhưng bug taxonomy và case `A-G14` cho thấy rủi ro nằm ở cấp phương pháp. Cách fix đúng không phải chỉ sửa prompt từng task, mà là xây một pipeline explanation có:
- semantic summarization theo loại dữ liệu,
- data quality gate,
- evidence contract,
- claim verifier,
- causal/statistical guard,
- fairness guard,
- operational recommendation schema.

