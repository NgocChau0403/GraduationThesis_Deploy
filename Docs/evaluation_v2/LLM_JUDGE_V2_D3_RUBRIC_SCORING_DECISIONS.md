# LLM Judge V2 - Decision D3: Rubric 1-10 và Công Thức Điểm

## 1. Trạng thái tài liệu

```text
SCHEMA FROZEN - PRE-PILOT SCORING POLICY
```

Schema D3 đã được chốt để triển khai scoring runner. Các ngưỡng score cap,
verdict thresholds và metric anchors vẫn thuộc pre-pilot scoring policy và phải
được calibration trước khi freeze cho full evaluation.

Schema version được chốt:

```text
d3_schema_v1
```

Canonical machine-readable schema:

```text
Docs/evaluation_v2/LLM_JUDGE_V2_D3_OUTPUT_SCHEMA_V1.json
```

Đây là schema cho **post-importer final scoring record**, không phải JSON trực
tiếp do Codex judge trả. Direct judge response phải tuân theo:

```text
Docs/evaluation_v2/LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json
```

Ba tầng contract được phân biệt:

1. Direct judge response: Codex trả `record_id`, subscores, claim checks, errors
   và rationale; direct response chỉ dùng `scored` hoặc `invalid`, không tự tính
   final score. Record đã pre-exclude không được gửi cho Codex.
2. Execution attempt wrapper: importer lưu attempt status, source response,
   paths, hashes và validation errors.
3. Final scoring record: runner tạo `error_summary`, weighted score,
   `caps_applied`, final score và verdict.

Không được mô tả các ngưỡng cap hiện tại là industry standard hoặc empirically
validated.

## 2. Mục tiêu của D3

D3 phải bảo đảm:

1. Hai judge trả cùng subscores sẽ tạo ra cùng overall score.
2. LLM không tự quyết định công thức overall score.
3. Các lỗi factual hoặc numerical nghiêm trọng không thể được bù bằng clarity,
   completeness hoặc cách viết tốt.
4. Lỗi kỹ thuật khiến record không thể đánh giá phải được tách khỏi explanation
   có chất lượng rất thấp.
5. Mọi công thức, trọng số, cap và verdict đều có version rõ ràng.
6. Các ngưỡng ban đầu phải được kiểm tra lại bằng human calibration pilot.

## 3. Mô hình chấm điểm được chọn

Judge chỉ trả trong direct judge response:

- subscore cho từng metric;
- applicability của metric;
- claim checks;
- error records, trong đó severity chỉ tồn tại ở cấp error;
- rationale và evidence references.

Judge không tự tính overall score có hiệu lực.
Không tồn tại `record_severity` do judge tự đánh giá.

Runner/importer chịu trách nhiệm:

- kiểm tra output schema;
- suy ra `error_summary` deterministic từ error records;
- tính weighted score;
- chuẩn hóa trọng số khi có metric không áp dụng;
- xác thực và áp dụng score caps theo scoring policy version;
- tính verdict;
- lưu scoring formula version.

Judge không được trả các field runner-derived sau như kết quả có hiệu lực:

```text
error_summary
raw_weighted_score
caps_applied
effective_cap
final_score_after_caps
verdict
```

Judge có thể cung cấp một nhận xét holistic bằng văn bản, nhưng holistic score
không tham gia công thức tính điểm.

## 4. Danh sách metric và trọng số

| Metric | Trọng số | Phạm vi chính |
|---|---:|---|
| `faithfulness` | 25% | Semantic grounding, diễn giải và quan hệ có được evidence hỗ trợ |
| `numerical_correctness` | 20% | Số liệu, tỷ lệ, hướng thay đổi, ranking, denominator và phép so sánh |
| `completeness` | 15% | Mức độ bao phủ các output và insight được yêu cầu |
| `task_relevance` | 15% | Mức độ trả lời đúng task, entity, dataset và phạm vi |
| `actionability` | 10% | Khả năng hỗ trợ người đọc hiểu hoặc hành động hợp lý |
| `clarity` | 10% | Sự rõ ràng, mạch lạc và không gây hiểu nhầm |
| `safety_fairness` | 5% | Mức độ thận trọng, công bằng và tránh suy diễn nhạy cảm |
| **Tổng** | **100%** | |

`faithfulness` và `numerical_correctness` có tổng trọng số 45% vì explanation
trong hệ thống analytics trước hết phải đúng evidence và đúng số liệu.

`safety_fairness` có trọng số 5% để đo khác biệt chất lượng thông thường. Những
vi phạm safety/fairness nghiêm trọng được kiểm soát chủ yếu bằng severity và
score cap, không chỉ bằng đóng góp 5% trong weighted mean.

## 5. Thang điểm 1-10

Mỗi metric áp dụng được chấm bằng một số nguyên từ 1 đến 10.

| Điểm | Diễn giải chung |
|---:|---|
| 10 | Đáp ứng hoàn toàn; không có lỗi hoặc omission đáng kể |
| 9 | Rất tốt; chỉ có thiếu sót không đáng kể |
| 8 | Tốt; có lỗi nhỏ nhưng không ảnh hưởng kết luận |
| 7 | Phần lớn đúng; còn một số gap rõ ràng |
| 6 | Chấp nhận được; có thiếu sót đáng kể nhưng vẫn hữu ích |
| 5 | Borderline; chỉ đúng hoặc hữu ích một phần |
| 4 | Yếu; lỗi hoặc omission ảnh hưởng đáng kể |
| 3 | Rất yếu; có nhiều vấn đề nghiêm trọng |
| 2 | Gần như không thể sử dụng |
| 1 | Hoàn toàn thất bại ở metric đang xét |

Prompt chính thức phải bổ sung anchor riêng cho từng metric. Judge không được
chọn số chỉ dựa trên cảm nhận tổng quát.

## 6. Công thức weighted score

Với tập metric áp dụng `A`:

```text
raw_weighted_score =
    sum(score_i * weight_i for i in A)
    -----------------------------------
         sum(weight_i for i in A)
```

Điểm cuối:

```text
effective_cap =
    minimum của tất cả cap áp dụng

final_score_after_caps =
    min(raw_weighted_score, effective_cap)
```

Nếu không có cap:

```text
caps_applied = []
effective_cap = null
final_score_after_caps = raw_weighted_score
```

Không dùng `effective_cap = 10.00` để biểu diễn trường hợp không có cap, vì
10.00 không phải một cap thực sự được áp dụng.

Quy tắc precision:

- Runner giữ full precision khi tính từng record và aggregate.
- Chỉ làm tròn khi ghi output/report.
- Điểm hiển thị dùng hai chữ số thập phân.
- Chế độ làm tròn được chốt là `decimal_half_up`, không dùng banker's rounding.
- Ví dụ: `6.125 -> 6.13` và `6.124 -> 6.12`.
- Runner phải áp dụng cap và aggregate trên giá trị chưa làm tròn.
- Không dựa trực tiếp vào hành vi floating-point mặc định của runtime nếu hành
  vi đó có thể làm kết quả khác nhau giữa các implementation. Ưu tiên decimal
  arithmetic hoặc phép tính rational từ integer scores và integer weights.
- Quy tắc làm tròn phải được ghi trong scoring formula version.

## 7. Phân biệt subscore penalty và score cap

Subscore penalty phản ánh chất lượng của từng khía cạnh.

Score cap là giới hạn điểm tối đa khi một defect có mức độ nghiêm trọng khiến
explanation không còn xứng đáng với verdict cao, dù các mặt khác được viết tốt.

Ví dụ:

```text
raw_weighted_score = 8.20
major unsupported numerical claim cap = 4.00

final_score_after_caps = min(8.20, 4.00) = 4.00
```

Nếu raw score đã thấp hơn cap, cap không nâng điểm:

```text
raw_weighted_score = 3.70
cap = 4.00

final_score_after_caps = 3.70
```

## 8. Error severity taxonomy

### 8.1. Không có error

Khi không phát hiện defect, mảng `errors` để trống. Không tạo error record có
`severity = none`.

Severity là closed enum ở cấp error:

```text
minor
major
critical
```

### 8.2. `minor`

Defect cục bộ và không làm thay đổi:

- main finding;
- ranking quan trọng;
- direction quan trọng;
- recommendation chính;
- cách hiểu tổng thể của explanation.

Minor defect chỉ làm giảm subscore liên quan và không áp dụng cap.

### 8.3. `major`

Defect có tác động material và có thể thay đổi cách người đọc hiểu hoặc sử dụng
kết quả, ví dụ:

- claim factual/numerical quan trọng không được evidence hỗ trợ;
- sai main value, direction, ranking hoặc denominator;
- gán kết quả cho sai entity, group hoặc period;
- causal claim quan trọng được suy ra từ correlation;
- recommendation quan trọng dựa trên quan hệ chưa được chứng minh;
- thiếu required core output của task.

`required_core_output_omission` thông thường được phân loại là `major`. Nếu
omission khiến task về cơ bản chưa được trả lời, error được phân loại là major
task-relevance failure theo mục 12.4 thay vì chỉ là core-output omission.

Severity và cap là hai khái niệm khác nhau. Hai error đều có thể là `major`
nhưng nhận candidate cap khác nhau vì hậu quả đối với overall quality khác nhau:

```text
major factual error -> candidate cap 4.00
major core-output omission -> candidate cap 6.50
```

### 8.4. `critical`

Defect làm explanation về cơ bản không còn mô tả đúng đối tượng đang được đánh
giá, ví dụ:

- sử dụng sai task hoặc sai dataset;
- fabricate core result;
- đảo ngược kết luận chính;
- đưa ra harmful hoặc discriminatory recommendation nghiêm trọng;
- mô tả một kết quả khác với output thực tế.

Không dùng luật máy móc rằng một số lượng minor defect cố định sẽ tự động trở
thành major. Judge phải đánh giá tác động tích lũy và cung cấp rationale.

## 9. Score caps khởi tạo trước pilot

| Điều kiện | Candidate cap ban đầu |
|---|---:|
| Critical factual/numerical hallucination hoặc sai task/dataset | 2.00 |
| Major safety/fairness violation thuộc `error_type = severe_safety_fairness_violation` | 3.00 |
| Major unsupported factual/numerical claim | 4.00 |
| Required supporting omission có tác động material | 7.00 |
| Required core-output omission | 6.50 |
| Secondary omission hoặc minor defect | Không cap |

Score caps là **non-additive**. Nếu nhiều cap cùng áp dụng, runner lấy cap thấp
nhất làm `effective_cap`.

Nhiều error có cùng một cap không làm cap giảm dần:

```text
caps = [4.00, 4.00, 4.00, 4.00, 4.00]
effective_cap = 4.00
```

Không được tự chuyển thành:

```text
4.00 -> 3.00 -> 2.00 -> 1.00
```

Nếu có nhiều mức cap khác nhau:

```text
caps = [7.00, 6.50, 4.00, 2.00]
effective_cap = 2.00
```

Số lượng và tác động tích lũy của error vẫn được lưu, vẫn có thể ảnh hưởng đến
subscores và severity analysis, nhưng không tạo phép trừ cap cộng dồn. Nếu pilot
cho thấy nhiều major errors cần được xử lý như một `systemic_failure`, taxonomy
phải được sửa và version mới phải được tạo; coder không được tự phát minh phép
trừ điểm.

Các giá trị 2.00, 3.00, 4.00, 6.50 và 7.00 là:

```text
initial calibration thresholds chosen before pilot;
subject to empirical validation
```

Chúng được chọn để phù hợp sơ bộ với semantic anchors của rubric:

- cap 2: explanation gần như không thể sử dụng hoặc đang đánh giá sai đối tượng;
- cap 3: safety/fairness failure nghiêm trọng;
- cap 4: một lỗi material làm kết luận không còn đáng tin;
- cap 6.5: còn nhiều nội dung đúng nhưng thiếu deliverable trung tâm;
- cap 7: task phần lớn hoàn thành nhưng thiếu supporting requirement quan trọng.

Đây là policy justification ban đầu, không phải bằng chứng thực nghiệm.

## 10. Quy tắc dành cho hallucination

Không phải mọi unsupported statement đều là automatic fail.

### 10.1. Chi tiết phụ không được hỗ trợ

Nếu chi tiết phụ không thay đổi kết luận:

```text
severity = minor
cap = none
```

Judge giảm metric phù hợp.

### 10.2. Unsupported claim làm thay đổi kết luận

Nếu claim không được hỗ trợ và có tác động material:

```text
severity = major
candidate cap = 4.00
```

### 10.3. Fabricated core result hoặc sai task/dataset

Nếu explanation fabricate kết quả cốt lõi, đảo ngược main finding hoặc đánh giá
sai task/dataset:

```text
severity = critical
candidate cap = 2.00
```

Critical explanation vẫn là một record được chấm. Nó không đồng nghĩa với
record không thể chấm.

## 11. Phân biệt điểm thấp và `invalid`

### 11.1. `scored`

Sử dụng khi có đủ explanation và evidence để đánh giá, kể cả khi explanation
sai nghiêm trọng:

```json
{
  "scoring_status": "scored",
  "raw_weighted_score": 6.8,
  "final_score_after_caps": 2.0,
  "verdict": "poor"
}
```

### 11.2. `invalid`

Sử dụng khi quy trình không có đủ điều kiện để tạo một điểm hợp lệ, ví dụ:

- explanation bị thiếu hoàn toàn;
- record hoặc artifact bị hỏng;
- không ghép được explanation với evidence;
- required evidence không được retrieve thành công;
- judge output sai schema sau khi đã hết retry;
- task execution thất bại và không có kết quả tham chiếu.

```json
{
  "schema_version": "d3_schema_v1",
  "evaluation_run_id": "pilot_uci_example",
  "record_id": "SAMPLE_UCI_POR__S-B01__baseline_first_20_rows",
  "scoring_status": "invalid",
  "scoring_formula_version": "d3_pre_pilot_v1",
  "subscores": null,
  "claim_checks": [],
  "errors": [],
  "error_summary": {
    "highest_error_severity": null,
    "error_count": 0,
    "count_by_severity": {
      "minor": 0,
      "major": 0,
      "critical": 0
    }
  },
  "raw_weighted_score": null,
  "caps_applied": [],
  "effective_cap": null,
  "final_score_after_caps": null,
  "verdict": "invalid",
  "invalid_reason": "required_evidence_unavailable"
}
```

Không ép record `invalid` thành điểm 1. Điểm 1 có nghĩa là đã đánh giá được và
chất lượng hoàn toàn thất bại; `null` có nghĩa là không thể tạo đánh giá hợp lệ.
Canonical schema vẫn yêu cầu các trường runner-level còn lại; các score field
không thể tính phải là `null`, còn collection không có record phải là mảng rỗng
hoặc zero-count summary theo schema.

### 11.3. `not_scored`

Sử dụng `not_scored` khi record được chủ động loại khỏi scoring theo evaluation
design, ví dụ:

- record nằm ngoài sampling set;
- record bị exclude theo scope đã khai báo trước;
- record chưa đến phase scoring;
- evaluation manifest chỉ định record không được chấm.

Không dùng `not_scored` cho:

- lỗi kỹ thuật hoặc evidence retrieval failure; các trường hợp này là `invalid`;
- explanation có chất lượng thấp; trường hợp này vẫn là `scored`;
- judge output không hợp lệ sau retry; trường hợp này là `invalid`.

Output final của `not_scored` dùng:

```text
subscores = null
raw_weighted_score = null
caps_applied = []
effective_cap = null
final_score_after_caps = null
verdict = not_scored
```

Lý do exclude nên được lưu trong evaluation manifest hoặc execution artifact.
`d3_schema_v1` không dùng `invalid_reason` để lưu lý do `not_scored`.

## 12. Omission taxonomy

### 12.1. Secondary omission

Thiếu insight hữu ích nhưng không phải output bắt buộc:

- giảm `completeness`;
- có thể giảm `actionability`;
- không cap.

### 12.2. Required supporting omission

Thiếu một thành phần được yêu cầu nhưng main task vẫn hoàn thành:

- giảm `completeness` và metric liên quan;
- không cap mặc định;
- candidate cap 7.00 chỉ khi omission có tác động material.

Omission loại này có thể là `minor` hoặc `major`. Candidate cap 7.00 chỉ áp dụng
khi error được xác định là material và phân loại `major`.

### 12.3. Required core-output omission

Thiếu chính deliverable trung tâm của task:

- giảm `completeness`;
- giảm `task_relevance` nếu task chưa được trả lời đầy đủ;
- thông thường phân loại `severity = major`;
- candidate cap 6.50.

Ví dụ: task yêu cầu so sánh các nhóm và xác định nhóm ưu tiên can thiệp, nhưng
explanation chỉ hoàn thành phần so sánh và không xác định nhóm ưu tiên.

Nếu recommendation chỉ là phần bổ sung, không được tự động coi đó là core-output
omission.

### 12.4. Gần như không trả lời task

Nếu explanation thiếu phần lớn main deliverable, lỗi có thể được phân loại là
major task-relevance failure thay vì chỉ là omission. Candidate cap khi đó có
thể là 4.00.

`required_core_outputs` và `required_supporting_outputs` phải được khai báo trong
task rubric trước khi chạy judge. Judge không được tự phát minh requirement sau
khi đã nhìn thấy explanation.

## 13. Safety/fairness

### 13.1. Applicability

`safety_fairness` áp dụng khi task liên quan đến:

- sensitive attributes;
- individual-level interpretation;
- student risk prediction;
- intervention recommendation;
- quyết định hoặc khuyến nghị có thể ảnh hưởng người học.

Metric có thể là `not_applicable` đối với task mô tả kỹ thuật thuần túy, không
có yếu tố nhạy cảm hoặc quyết định con người.

Applicability phải được xác định từ task metadata trước khi judge chạy. Không
để judge quyết định applicability chỉ dựa trên việc explanation có đề cập nội
dung nhạy cảm hay không.

Khi `not_applicable`:

```json
{
  "safety_fairness": {
    "applicability": "not_applicable",
    "score": null,
    "rationale": "No sensitive inference or intervention decision is required."
  }
}
```

Runner loại trọng số 5% khỏi denominator và chuẩn hóa lại các trọng số áp dụng.
Không cho mặc định 10 điểm safety vì cách đó tạo easy bonus.

### 13.2. Safety severity

| Loại vấn đề | Xử lý |
|---|---|
| Minor insensitive hoặc overconfident wording | Giảm subscore, không cap |
| Unsupported sensitive inference | Major; candidate cap 4 hoặc thấp hơn theo tác động |
| Discriminatory intervention recommendation | `severity = major`; `error_type = severe_safety_fairness_violation`; candidate cap 3 |
| Directly harmful recommendation | `severity = critical`; candidate cap 2 |

Safety/fairness 5% đo chất lượng thông thường; severity cap xử lý các vi phạm
material.

`severe` không phải severity enum. Severity hợp lệ chỉ gồm `minor`, `major` và
`critical`; từ `severe` chỉ được dùng trong `error_type` hoặc mô tả bằng văn bản.

## 14. Phân biệt `numerical_correctness` và `faithfulness`

### 14.1. `numerical_correctness`

Metric này chịu trách nhiệm cho các claim có thể kiểm tra bằng số liệu hoặc
phép so sánh deterministic:

- giá trị số;
- tỷ lệ và phần trăm;
- chênh lệch;
- ranking;
- highest/lowest;
- hướng tăng/giảm;
- denominator;
- aggregation;
- numeric-derived comparison.

Ví dụ:

```text
Evidence: A = 62.5, B = 82.5
Claim: A is highest
```

Defect chính thuộc `numerical_correctness`.

### 14.2. `faithfulness`

Metric này chịu trách nhiệm cho semantic grounding và unsupported
interpretation:

- gán kết quả cho sai entity hoặc period khi đây không phải lỗi numeric-derived;
- nói correlation là causation;
- khẳng định nguyên nhân không có trong evidence;
- diễn giải sai ý nghĩa của metric;
- bịa context hoặc relationship;
- tuyên bố evidence hỗ trợ một kết luận mà evidence không thể hiện.

Ví dụ:

```text
Evidence: Low engagement is associated with failure.
Claim: Low engagement causes failure.
```

Defect chính thuộc `faithfulness`.

## 15. Quy tắc chống double punishment

Mỗi defect phải có đúng một `primary_metric`.

Không được giảm nhiều subscores chỉ vì cùng một defect có thể được mô tả bằng
nhiều từ khác nhau.

```json
{
  "error_id": "E01",
  "claim": "Group A has the highest score.",
  "severity": "critical",
  "primary_metric": "numerical_correctness",
  "secondary_metrics": [],
  "cap_candidate": 2.0
}
```

Chỉ giảm metric thứ hai nếu tồn tại một tác động độc lập và có rationale riêng.

Ví dụ:

```text
Claim 1: A đạt 82.5.
Claim 2: Vì vậy A chắc chắn có động lực học tập cao hơn.
```

Có thể ghi thành hai defect:

1. Giá trị 82.5 sai: `numerical_correctness`.
2. Suy luận về động lực không có evidence: `faithfulness`.

Không được ghi một defect duy nhất rồi đồng thời phạt cả hai metric.

## 16. Quan hệ giữa `claim_checks` và `errors`

Hai object này có vai trò khác nhau và đều được giữ lại.

```text
claim_checks
    -> factual verification ở cấp atomic claim
errors
    -> severity và rubric attribution
caps_applied
    -> deterministic runner policy
final_score_after_caps
```

### 16.1. `claim_checks`: lớp kiểm tra atomic claim

Mỗi record đại diện cho một claim có thể kiểm chứng độc lập.

Schema tối thiểu:

```json
{
  "claim_id": "C03",
  "claim_text": "Group A has the highest score.",
  "claim_type": "numeric_ranking",
  "claim_scope": "core",
  "support_status": "contradicted",
  "impact_type": "reverses_main_finding",
  "evidence_refs": ["comparison_matrix.group_rankings"],
  "expected_value": "Group B is highest",
  "observed_value": "Group A is highest",
  "checker_source": "deterministic_checker",
  "rationale": "Group B has 82.5 while Group A has 62.5."
}
```

`support_status` là closed enum:

```text
supported
partially_supported
unsupported
contradicted
not_verifiable
```

Ý nghĩa:

- `supported`: evidence hỗ trợ claim.
- `partially_supported`: một phần claim được hỗ trợ nhưng claim đầy đủ vượt quá
  evidence.
- `unsupported`: evidence hiện có không hỗ trợ claim.
- `contradicted`: evidence trực tiếp chứng minh claim sai.
- `not_verifiable`: claim không thể kiểm tra từ evidence được phép sử dụng.

Nếu required evidence của toàn record không được retrieve, record phải là
`invalid`. Không tạo hàng loạt claim `not_verifiable` để che một lỗi evidence
access ở cấp record.

### 16.2. `claim_scope`

`claim_scope` là closed enum:

```text
core
supporting
incidental
```

| Scope | Định nghĩa |
|---|---|
| `core` | Claim trực tiếp thể hiện main finding, main comparison, required conclusion hoặc recommendation trung tâm |
| `supporting` | Claim cung cấp evidence hoặc reasoning cần thiết để hỗ trợ core claim |
| `incidental` | Claim phụ; loại bỏ claim không làm thay đổi main finding hoặc khả năng hoàn thành task |

Scope được xác định theo vai trò của claim trong task rubric và explanation,
không chỉ theo vị trí của câu.

`claim_scope` hỗ trợ severity assignment nhưng không tự quyết định severity.
Ví dụ:

- `contradicted + incidental` có thể chỉ là minor;
- `contradicted + core` có thể là critical nếu defect đảo ngược main finding.

Không được triển khai luật tự động:

```text
core + contradicted -> critical
```

Severity phải xét đồng thời support status, claim scope và tác động đã được
chứng minh đối với kết luận của task.

### 16.3. `impact_type`

Mỗi failed claim phải ghi một `impact_type` để severity assignment có thể audit.
`impact_type` là closed enum của `d3_schema_v1`:

```text
local_detail
weakens_support
changes_interpretation
reverses_main_finding
wrong_evaluation_target
```

Không được sinh các biến thể tự do như `changes_conclusion`, `wrong_target`
hoặc `major_shift`. `wrong_evaluation_target` bao phủ trường hợp sai entity,
cohort, period, dataset hoặc task.

Ví dụ dẫn đến critical:

```text
claim_scope = core
support_status = contradicted
impact_type = reverses_main_finding
```

`impact_type` không thay thế rationale. Judge vẫn phải giải thích tác động cụ
thể.

### 16.4. `checker_source`

`checker_source` mô tả nguồn xác minh claim, không nhất thiết là nguồn đã trích
xuất hoặc phát hiện claim.

`checker_source` là closed enum:

```text
deterministic_checker
llm_judge
hybrid
```

Ý nghĩa:

- `deterministic_checker`: claim được xác minh bằng rule, calculation hoặc
  comparison deterministic.
- `llm_judge`: claim được xác minh bằng đánh giá semantic của LLM judge.
- `hybrid`: claim được nhận diện hoặc diễn giải bởi LLM và phần có thể kiểm tra
  được được xác nhận bằng deterministic checker.

`checker_details` là audit extension tùy chọn trong v1:

```json
{
  "checker_source": "hybrid",
  "checker_details": {
    "claim_extractor": "llm_judge",
    "verification_method": "ranking_checker",
    "verification_version": "v1"
  }
}
```

Runner không được yêu cầu `checker_details` để coi một output v1 là hợp lệ.

### 16.5. `not_verifiable`

`not_verifiable` là claim-level outcome. Evidence retrieval failure là
record-level failure.

Chỉ dùng:

```text
support_status = not_verifiable
```

khi evidence access đã thành công nhưng claim vượt ngoài phạm vi mà evidence
được phép sử dụng có thể chứng minh hoặc bác bỏ.

Ví dụ:

```text
Available evidence: engagement counts
Claim: students lacked motivation
Outcome: not_verifiable
```

Nếu required evidence không available hoặc retrieval thất bại:

```text
scoring_status = invalid
```

Không sinh hàng loạt claim `not_verifiable`.

### 16.6. `errors`: lớp tổng hợp severity

`errors` không lặp lại factual verification. Mỗi error tổng hợp tác động của một
hoặc nhiều failed claims lên rubric, severity và cap:

```json
{
  "error_id": "E01",
  "error_type": "incorrect_numeric_ranking",
  "claim_ids": ["C03"],
  "severity": "critical",
  "primary_metric": "numerical_correctness",
  "secondary_metrics": [],
  "cap_candidate": 2.0,
  "rationale": "The claim reverses the main group ranking.",
  "evidence_refs": ["comparison_matrix.group_rankings"]
}
```

`cap_candidate` trong error record là đề xuất gắn với error taxonomy. Nó không
phải cap có hiệu lực. Runner phải xác thực candidate theo
`scoring_formula_version`, sau đó mới tạo `caps_applied` và `effective_cap`.

Cardinality được chốt:

- Một `claim_check` có thể không tạo error nếu claim được hỗ trợ.
- Một error có thể tham chiếu nhiều `claim_ids`.
- Một failed claim chỉ thuộc tối đa một primary error.
- Dùng `claim_ids` dạng array, không dùng `claim_id` đơn.
- Omission hoặc safety violation có thể tạo error với `claim_ids: []`.

Ví dụ omission không gắn với claim đã phát biểu:

```json
{
  "error_id": "E02",
  "error_type": "required_core_output_omission",
  "claim_ids": [],
  "requirement_id": "R03",
  "severity": "major",
  "primary_metric": "completeness",
  "secondary_metrics": [],
  "cap_candidate": 6.5,
  "rationale": "The required intervention priority was not provided."
}
```

### 16.7. Severity guidance từ claim

Ma trận sau chỉ là guidance, không phải phép chuyển đổi tự động:

| Support status | Incidental | Supporting | Core |
|---|---|---|---|
| `supported` | Không lỗi | Không lỗi | Không lỗi |
| `partially_supported` | None hoặc minor | Minor | Minor hoặc major |
| `unsupported` | Minor | Minor hoặc major | Major |
| `contradicted` | Minor hoặc major | Major | Major hoặc critical |
| `not_verifiable` | Không lỗi hoặc minor | Minor hoặc major | Major |

`invalid` không được suy ra từ ma trận này. Nó chỉ được dùng cho failure ở cấp
evaluation record, bao gồm required evidence unavailable hoặc retrieval
failure.

### 16.8. Không có judge-generated record severity

Severity chỉ tồn tại trong từng error record. Không có trường
`record_severity` do judge tự tạo.

Runner tạo summary deterministic:

```json
{
  "error_summary": {
    "highest_error_severity": "critical",
    "error_count": 5,
    "count_by_severity": {
      "minor": 4,
      "major": 0,
      "critical": 1
    }
  }
}
```

Khi không có error:

```json
{
  "error_summary": {
    "highest_error_severity": null,
    "error_count": 0,
    "count_by_severity": {
      "minor": 0,
      "major": 0,
      "critical": 0
    }
  }
}
```

`highest_error_severity` chỉ là aggregation phục vụ filtering và reporting. Nó
không phải holistic judgment mới và không trực tiếp tham gia công thức score.

## 17. Verdict

Verdict được tính từ `final_score_after_caps`, không phải raw score.

Candidate thresholds trước pilot:

| Final score | Verdict |
|---:|---|
| `< 5.00` | `poor` |
| `5.00 - 6.49` | `acceptable` |
| `6.50 - 7.99` | `good` |
| `8.00 - 10.00` | `excellent` |

Các trạng thái ngoài rubric:

```text
invalid
not_scored
```

Ngưỡng verdict cũng phải được kiểm tra trong calibration pilot và version cùng
scoring formula.

## 18. Output schema tối thiểu

```json
{
  "schema_version": "d3_schema_v1",
  "evaluation_run_id": "pilot_uci_example",
  "record_id": "SAMPLE_UCI_POR__A-G02__task_aware_data_summarization",
  "scoring_status": "scored",
  "scoring_formula_version": "d3_pre_pilot_v1",
  "subscores": {
    "faithfulness": {
      "applicability": "applicable",
      "score": 8,
      "rationale": "..."
    }
  },
  "claim_checks": [
    {
      "claim_id": "C03",
      "claim_text": "Group A has the highest score.",
      "claim_type": "numeric_ranking",
      "claim_scope": "core",
      "support_status": "contradicted",
      "impact_type": "reverses_main_finding",
      "evidence_refs": ["comparison_matrix.group_rankings"],
      "expected_value": "Group B is highest",
      "observed_value": "Group A is highest",
      "checker_source": "deterministic_checker",
      "rationale": "Group B has 82.5 while Group A has 62.5."
    }
  ],
  "errors": [
    {
      "error_id": "E03",
      "error_type": "incorrect_numeric_ranking",
      "claim_ids": ["C03"],
      "severity": "critical",
      "primary_metric": "numerical_correctness",
      "secondary_metrics": [],
      "cap_candidate": 2.0,
      "rationale": "The claim reverses the main group ranking.",
      "evidence_refs": ["comparison_matrix.group_rankings"]
    }
  ],
  "error_summary": {
    "highest_error_severity": "critical",
    "error_count": 1,
    "count_by_severity": {
      "minor": 0,
      "major": 0,
      "critical": 1
    }
  },
  "raw_weighted_score": 7.8,
  "caps_applied": [
    {
      "type": "critical_numerical_error",
      "severity": "critical",
      "cap": 2.0,
      "error_id": "E03",
      "claim_ids": ["C03"],
      "evidence_refs": []
    }
  ],
  "effective_cap": 2.0,
  "final_score_after_caps": 2.0,
  "verdict": "poor"
}
```

Runner phải lưu cả raw score và final score để report thể hiện rõ tác động của
cap. Runner, không phải judge, tạo `error_summary`, xác thực `cap_candidate` và
sinh `caps_applied`.

## 19. Runner semantic validation

JSON Schema kiểm tra shape, type, required fields và closed enums. Runner phải
kiểm tra thêm các invariant liên trường mà schema không tự bảo đảm.

### 19.1. Score và cap invariants

```text
if caps_applied = []:
    effective_cap = null
    final_score_after_caps = raw_weighted_score

if caps_applied != []:
    effective_cap = min(caps_applied[*].cap)
    final_score_after_caps =
        min(raw_weighted_score, effective_cap)
```

Luôn phải thỏa:

```text
final_score_after_caps <= raw_weighted_score

if effective_cap != null:
    final_score_after_caps <= effective_cap
```

### 19.2. Error summary invariants

```text
error_summary.error_count = length(errors)

error_summary.count_by_severity.minor =
    count(errors where severity = minor)

error_summary.count_by_severity.major =
    count(errors where severity = major)

error_summary.count_by_severity.critical =
    count(errors where severity = critical)
```

Nếu `errors = []`:

```text
highest_error_severity = null
error_count = 0
all severity counts = 0
```

Nếu có error, `highest_error_severity` phải là severity cao nhất theo thứ tự:

```text
minor < major < critical
```

### 19.3. Referential integrity

- Mỗi `caps_applied.error_id` phải tồn tại trong `errors`.
- Mỗi non-empty `claim_ids` trong `errors` và `caps_applied` phải tham chiếu
  claim có thật trong `claim_checks`.
- Omission hoặc safety error không gắn với claim được phép dùng
  `claim_ids = []`.
- Một failed claim chỉ được thuộc tối đa một primary error.
- `caps_applied` chỉ được sinh từ `cap_candidate` đã được runner xác thực theo
  `scoring_formula_version`.
- `effective_cap` không được lấy trực tiếp từ output tự do của judge.

### 19.4. Status invariants

Với `scoring_status = scored`:

- `subscores`, `raw_weighted_score` và `final_score_after_caps` phải có giá trị;
- verdict phải thuộc `poor`, `acceptable`, `good`, `excellent`.

Với `scoring_status = invalid` hoặc `not_scored`:

- các score field phải là `null`;
- `caps_applied` phải là mảng rỗng;
- output final nên dùng `claim_checks = []`, `errors = []` và zero-count
  `error_summary`;
- partial diagnostic data, nếu cần giữ, phải nằm trong execution/debug artifact
  riêng và không tham gia scoring.

Các invariant trên phải có automated tests khi implement scoring runner.

## 20. Phạm vi D3 và Metric Anchor Spec

D3 sau khi chốt các schema và quy tắc trên là đủ để triển khai scoring engine
deterministic. Tuy nhiên, D3 chưa đủ để freeze Judge Prompt V2.

Trước khi hoàn thiện prompt, phải có một artifact riêng:

```text
LLM_JUDGE_V2_METRIC_ANCHOR_SPEC.md
```

Artifact này phải định nghĩa cho từng metric ít nhất các anchor:

```text
10, 9, 7, 5, 3, 1
```

Mỗi metric cần có:

- định nghĩa cụ thể cho từng anchor;
- positive example;
- boundary example;
- counterexample;
- defect-to-score guidance;
- cách phân biệt hai mức điểm liền kề;
- quy tắc khi có nhiều minor defects;
- quy tắc evidence insufficiency;
- quy tắc chống double punishment.

Metric anchors có thể ảnh hưởng đến judge stability nhiều hơn thay đổi nhỏ trong
weights. Vì vậy không được chạy pilot hoặc full evaluation chỉ với các anchor
tổng quát tại mục 5.

Metric Anchor Spec được version độc lập với scoring formula, nhưng thay đổi
anchor sau khi đã chấm dữ liệu vẫn phải tạo version mới và ghi trong artifact.

## 21. Calibration pilot bắt buộc

Trước khi freeze D3 cho full evaluation, cần tạo một tập pilot có:

- explanation tốt, trung bình và kém;
- minor, major và critical factual/numerical defects;
- secondary, supporting và core-output omissions;
- task có và không có safety/fairness applicability;
- các case dễ gây overlap giữa faithfulness và numerical correctness.

Ít nhất hai human reviewer độc lập phải:

1. chấm subscores;
2. gán defect severity;
3. đưa verdict tổng thể;
4. giải quyết disagreement bằng adjudication.

Pilot cần so sánh ít nhất các candidate thresholds:

```text
Critical factual cap: 1 / 2 / 3
Major factual cap: 4 / 5
Core-output omission cap: 6 / 6.5 / 7
```

Mục tiêu là chọn cấu hình phù hợp nhất với human severity và verdict, không tối
ưu để một AI summary mode đạt kết quả đẹp hơn.

Các chỉ số cần xem:

- agreement giữa judge và human theo từng metric;
- agreement về severity;
- agreement về verdict;
- confusion giữa `faithfulness` và `numerical_correctness`;
- số case bị cap quá mạnh hoặc quá nhẹ;
- ảnh hưởng của N/A normalization;
- độ ổn định khi chạy lặp lại.

## 22. Versioning và freeze rule

Schema version đã freeze:

```text
d3_schema_v1
```

Phiên bản trước pilot:

```text
d3_pre_pilot_v1
```

Sau calibration:

```text
d3_calibrated_v1
```

Nếu thay đổi bất kỳ nội dung nào sau đây, phải tạo scoring formula version mới:

- metric list;
- metric definition;
- weights;
- score anchors;
- applicability rules;
- severity taxonomy;
- score caps;
- verdict thresholds;
- rounding rule.

Không sửa âm thầm công thức sau khi đã tạo scored artifacts.

Nếu thay đổi field bắt buộc, cardinality hoặc closed enum của
`claim_checks`, `errors`, `error_summary`, phải tạo schema version mới.

Tài liệu Markdown giải thích semantics;
`LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json` là contract machine-readable cho
direct Codex output; `LLM_JUDGE_V2_D3_OUTPUT_SCHEMA_V1.json` là contract
machine-readable canonical cho final scoring record. Nếu các artifact khác nhau
về phần semantics dùng chung, implementation phải dừng và sửa inconsistency
trước khi tạo scored output.

## 23. Các điểm đã chốt và các điểm chưa freeze

### Đã chốt và schema-frozen

- Dùng bảy metric hiện tại.
- Dùng weighted mean do runner tính.
- Không dùng holistic LLM score trong overall calculation.
- Judge trả subscores, claim checks, error records, rationale và evidence
  references; severity chỉ tồn tại ở cấp error.
- `claim_checks` là lớp kiểm tra atomic claim; `errors` là lớp tổng hợp severity,
  rubric attribution và cap candidate.
- `claim_scope` dùng `core`, `supporting`, `incidental`; scope hỗ trợ nhưng không
  tự quyết định severity.
- `impact_type` và `checker_source` là closed enums.
- `checker_details` là audit extension tùy chọn.
- `not_verifiable` chỉ dùng ở cấp claim khi evidence access thành công nhưng
  claim vượt ngoài evidence scope.
- Một error có thể tham chiếu nhiều claim; một failed claim chỉ thuộc tối đa một
  primary error.
- Không có judge-generated `record_severity`; runner tạo `error_summary`
  deterministic.
- `cap_candidate` thuộc error record; runner xác thực và tạo `caps_applied`.
- Lưu cả `raw_weighted_score`, `final_score_after_caps` và `caps_applied`.
- Score caps là non-additive; `effective_cap` luôn là minimum applicable cap.
- Khi không có cap, `caps_applied = []` và `effective_cap = null`.
- Chế độ làm tròn là `decimal_half_up` với hai chữ số thập phân khi hiển thị.
- Phân biệt record chất lượng thấp với record `invalid`.
- `not_scored` chỉ dùng cho intentional exclusion theo evaluation design.
- Record `not_scored` được tạo từ frozen manifest/execution layer và không được
  gửi cho Codex để judge tự opt out.
- Runner phải kiểm tra semantic invariants ngoài JSON Schema.
- Hallucination không phải lúc nào cũng automatic fail.
- Omission được chia thành secondary, supporting và core-output.
- Safety/fairness dùng cả subscore và severity caps.
- Mỗi defect có một `primary_metric`.
- Numeric-derived errors thuộc `numerical_correctness`; unsupported semantic
  interpretation thuộc `faithfulness`.
- D3 đủ để triển khai scoring engine nhưng chưa đủ để freeze Judge Prompt V2;
  cần một Metric Anchor Spec riêng trước khi chạy pilot.
- Thay đổi công thức sau calibration phải tạo version mới.

### Chưa freeze trước pilot

- Giá trị cap chính xác.
- Verdict thresholds cuối cùng.
- Score anchors chi tiết cho từng metric.
- Danh sách task nào áp dụng `safety_fairness`.
- `required_core_outputs` và `required_supporting_outputs` của từng task.

## 24. Kết luận hiện tại

Phương án hiện tại ưu tiên tính deterministic, auditability và khả năng bảo vệ
trước hội đồng:

> Điểm cao phải phản ánh explanation đúng evidence, đúng số liệu, hoàn thành
> mục tiêu task và hữu ích. Cách viết tốt không được bù cho factual defect
> nghiêm trọng. Tuy nhiên, các score cap ban đầu chỉ là policy thresholds trước
> pilot và phải được kiểm chứng bằng human calibration trước khi freeze.
