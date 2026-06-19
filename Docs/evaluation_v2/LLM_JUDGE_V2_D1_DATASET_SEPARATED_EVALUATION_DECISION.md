# LLM Judge V2 - Quyết Định Thiết Kế Evaluation Tách Theo Dataset

## 1. Mục đích tài liệu

Tài liệu này ghi lại thiết kế đã được chốt cho Decision D1 của AI Explanation
Evaluation V2.

Các mục tiêu chính:

- làm rõ vai trò của Absolute Judge và Pairwise Judge;
- quy định `SAMPLE_UCI_POR` và `SAMPLE_OULAD` được evaluate trong hai run độc
  lập;
- giải thích ý nghĩa của yêu cầu dùng một prompt duy nhất;
- đưa ra protocol có thể chạy lại bằng Codex;
- tạo cơ sở cho phần methodology và discussion trong thesis.

Trạng thái hiện tại:

```text
DECIDED - đã được người thực hiện thesis chốt
```

## 2. Bối cảnh và yêu cầu

Feedback hiện tại tập trung vào các hạn chế của LLM Judge V1:

```text
Judge chưa nhìn thấy full-query evidence.
Judge chưa có schema context đầy đủ.
Prompt chưa được freeze thành một artifact độc lập.
Rubric 1-5 có độ phân giải thấp.
Quy trình Codex chưa được mô tả đủ rõ để chạy lại.
```

Các yêu cầu cần đáp ứng trong V2:

```text
Task metadata
+ schema context
+ full-query evidence
+ một AI explanation
+ rubric 1-10
+ một prompt cố định
+ structured output
+ reproducible run procedure
```

Thống kê Phase 3 đã xác định:

| Dataset | Tổng task | `row_count <= 20` | `row_count > 20` |
|---|---:|---:|---:|
| `SAMPLE_UCI_POR` | 52 | 46 | 6 |
| `SAMPLE_OULAD` | 52 | 39 | 13 |
| Tổng | 104 | 85 | 19 |

Mỗi task có hai explanation modes:

```text
baseline_first_20_rows
task_aware_data_summarization
```

Do đó mỗi dataset có:

```text
52 tasks x 2 modes = 104 absolute judge records
```

Toàn bộ hai dataset có:

```text
104 UCI records + 104 OULAD records = 208 absolute judge records
```

## 3. Quyết định tách evaluation theo dataset

Không đưa đồng thời UCI và OULAD vào cùng một Codex evaluation session.

Thứ tự chạy được đề xuất:

```text
Run 1:
SAMPLE_UCI_POR

Run 2:
SAMPLE_OULAD
```

Mỗi run phải dùng:

- cùng một prompt file;
- cùng prompt version và prompt hash;
- cùng rubric;
- cùng output contracts:
  direct judge response schema, execution attempt wrapper schema và final
  scoring record schema;
- cùng model/configuration nếu Codex cung cấp thông tin này;
- cùng validation rules;
- cùng aggregation method.

Điểm duy nhất thay đổi giữa hai run là:

```text
dataset scope
input manifest
evaluation_run_id
run timestamps
```

## 4. Vì sao nên tách UCI và OULAD?

### 4.1. Dataset có đặc điểm evidence khác nhau

UCI và OULAD không chỉ khác tên dataset. Chúng khác về:

- schema coverage;
- số lượng rows của từng task;
- loại task có đủ evidence;
- cấu trúc cohort, student và engagement data;
- tỷ lệ task thuộc bucket `<=20` và `>20`.

Tách run giúp các khác biệt này không bị trộn trong cùng một context dài.

### 4.2. Giảm context contamination

Nếu Codex đánh giá cả hai dataset trong cùng session, reasoning từ các record
UCI trước đó có thể ảnh hưởng cách diễn giải record OULAD sau đó.

Tách session giúp giảm:

- carry-over assumptions;
- accidental comparison giữa hai dataset;
- drift trong cách áp dụng rubric theo thời gian;
- nhầm dataset, class ID hoặc field meaning.

Đây không loại bỏ hoàn toàn judge drift, nhưng tạo boundary rõ để audit.

### 4.3. Dễ kiểm tra và chạy lại

Nếu một run gặp lỗi:

```text
invalid JSON
missing outputs
context exhaustion
wrong dataset scope
Codex session interruption
```

chỉ cần chạy lại dataset bị ảnh hưởng, không phải chạy lại toàn bộ 208 records.

### 4.4. Dễ viết báo cáo thesis

Hai báo cáo dataset-specific có thể trình bày:

```text
SAMPLE_UCI_POR:
- coverage
- absolute scores
- row-count analysis
- failure categories
- representative cases

SAMPLE_OULAD:
- coverage
- absolute scores
- row-count analysis
- failure categories
- representative cases
```

Sau đó mới tạo overall summary bằng aggregation deterministic từ hai run đã
hoàn thành.

### 4.5. Dataset run không được dùng prompt khác nhau

Tách dataset không cho phép tùy chỉnh prompt cho từng dataset.

Không được:

```text
UCI dùng prompt dễ hơn
OULAD dùng prompt chi tiết hơn
```

Nếu prompt thay đổi, hai run không còn trực tiếp comparable.

## 5. Diễn giải “một prompt duy nhất”

Trong thiết kế này, “một prompt duy nhất” được hiểu là:

> Mọi record thuộc Absolute Judge V2 đều được evaluate bằng đúng một prompt
> artifact đã freeze, không thay wording theo dataset, task hoặc mode.

Prompt dự kiến:

```text
Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md
```

Quy trình sử dụng:

```text
UCI:
Mở Codex project/session mới
→ gửi JUDGE_PROMPT_V2.md đúng một lần
→ prompt chỉ định UCI input manifest
→ Codex evaluate toàn bộ UCI records
→ validate và freeze UCI outputs

OULAD:
Mở Codex project/session mới
→ gửi lại chính xác JUDGE_PROMPT_V2.md
→ prompt chỉ định OULAD input manifest
→ Codex evaluate toàn bộ OULAD records
→ validate và freeze OULAD outputs
```

Có hai session và hai run, nhưng chỉ có một prompt artifact và một evaluation
protocol.

Để tránh phải sửa nội dung prompt theo dataset, prompt không nên hard-code
`SAMPLE_UCI_POR` hoặc `SAMPLE_OULAD`. Dataset scope nên được xác định bằng một
run manifest chuẩn tại vị trí cố định hoặc bằng file manifest được cung cấp cho
Codex cùng workspace.

Ví dụ:

```json
{
  "evaluation_run_id": "AIJUDGEV2_UCI_...",
  "dataset_id": "SAMPLE_UCI_POR",
  "judge_input_manifest": "...",
  "expected_record_count": 104,
  "prompt_version": "JUDGE_PROMPT_V2",
  "rubric_version": "JUDGE_RUBRIC_1_TO_10_V1"
}
```

Prompt yêu cầu Codex đọc run manifest hiện hành thay vì người chạy sửa câu chữ
trong prompt.

## 6. Evaluation chính: Absolute Judge V2

### 6.1. Vai trò

Absolute Judge V2 là primary evaluation.

Câu hỏi nó trả lời:

> Nếu người dùng chỉ nhìn thấy explanation này, explanation có chính xác, đầy
> đủ, liên quan và hữu ích dựa trên evidence hay không?

### 6.2. Input của mỗi record

```text
Task metadata
+ schema context
+ full-query evidence hoặc evidence-access contract đã chốt
+ explanation-generation metadata
+ một AI explanation
+ evaluation requirements
```

Judge không được nhìn thấy:

- explanation của mode còn lại;
- absolute score của mode còn lại;
- aggregate result đã có;
- mode-level winner labels;
- kết luận mong muốn.

### 6.3. Output contracts của mỗi record

Direct judge response tối thiểu:

```text
record_id
scoring_status
subscores
claim_checks
errors
holistic_rationale
evidence_usage_notes
```

Codex judge không tự tính overall score hoặc verdict.

Final scoring record do runner/importer tạo:

```text
evaluation_run_id
record_id
raw_weighted_score
error_summary
caps_applied
effective_cap
final_score_after_caps
verdict
```

Các subscores dự kiến:

```text
faithfulness
numerical correctness
completeness
task relevance
actionability
clarity
safety/fairness nếu áp dụng
```

Công thức overall score, weights và score caps thuộc Decision D3 và phải được
freeze trước full run.

### 6.4. Số record theo run

#### UCI run

```text
52 baseline records
+ 52 task-aware records
= 104 absolute evaluations
```

#### OULAD run

```text
52 baseline records
+ 52 task-aware records
= 104 absolute evaluations
```

### 6.5. Comparison sau absolute judging

Sau khi chấm độc lập, runner ghép hai records bằng:

```text
dataset_id + task_id
```

và tính:

```text
paired_absolute_delta
= task_aware_final_score
- baseline_final_score
```

Đây là paired statistical comparison của absolute scores, không phải Pairwise
LLM Judge.

Phải báo cáo:

- mean và median score theo mode;
- mean và median paired delta;
- số task tăng, giảm và không đổi;
- score distribution;
- major-error rate;
- kết quả riêng cho `row_count <= 20`;
- kết quả riêng cho `row_count > 20`;
- expected, valid, terminal-invalid, excluded, missing và retry counts.

## 7. Validation phụ: Pairwise Judge

### 7.1. Vai trò đề xuất

Pairwise không thay thế Absolute Judge V2.

Vai trò:

```text
secondary confirmatory evaluation
```

Câu hỏi nó trả lời:

> Khi hai explanation được đặt cạnh nhau trên cùng evidence, judge ưu tiên
> explanation nào và vì sao?

### 7.2. Pairwise phải độc lập với absolute outputs

Pairwise input phải được build lại từ evidence gốc:

```text
Task metadata
+ schema context
+ full-query evidence
+ Explanation A
+ Explanation B
```

Pairwise không được đọc:

```text
absolute score A
absolute score B
absolute rationale
absolute winner derived from score delta
```

Nếu Pairwise chỉ chọn mode có absolute score cao hơn thì nó không tạo ra bằng
chứng mới.

### 7.3. Output

Pairwise nên trả:

```text
winner: A | B | tie
difference magnitude
dimension winners
decisive evidence
rationale
```

Không cần tạo thêm một bộ absolute scores thứ hai.

### 7.4. Bias controls

Nếu chạy Pairwise:

- ẩn tên mode dưới nhãn A/B;
- cân bằng vị trí baseline/task-aware;
- dùng deterministic assignment;
- cho phép tie thật sự;
- chạy reverse-order pilot;
- theo dõi position consistency;
- không coi khác biệt về độ dài là bằng chứng chất lượng.

Pairwise cũng phải tách thành:

```text
UCI Pairwise run
OULAD Pairwise run
```

và dùng cùng một paired prompt artifact nếu validation này được thực hiện.

### 7.5. Trạng thái phạm vi

Pairwise được pre-register như validation phụ, nhưng chỉ chạy sau khi:

1. Absolute Judge V2 hoàn thành và pass validation.
2. Pairwise prompt/schema đã được freeze trước khi đọc aggregate absolute
   results, nhằm tránh thiết kế hậu nghiệm theo kết quả có lợi.
3. Thời gian và context budget cho phép.

Phạm vi cuối cùng cần chốt:

```text
full 104 pairs
hoặc
stratified pilot
```

## 8. Dẫn chứng từ LLM-as-a-Judge research

### 8.1. G-Eval

Liu et al. đề xuất G-Eval sử dụng LLM, reasoning steps và structured
form-filling để đánh giá NLG outputs. Kết quả của paper cho thấy rubric và
quy trình đánh giá có cấu trúc có thể cải thiện mức tương quan với human
judgment.

Áp dụng vào thesis:

- không chỉ yêu cầu “cho điểm”;
- phải cung cấp evaluation criteria rõ ràng;
- yêu cầu output theo schema;
- lưu prompt và rubric;
- buộc judge đối chiếu explanation với evidence.

G-Eval không bắt buộc mọi bài toán phải dùng Pairwise. Nó hỗ trợ lập luận rằng
Absolute Judge có thể là evaluation chính nếu criteria, evidence và structured
output được thiết kế tốt.

Nguồn:

- Liu et al. (2023), *G-Eval: NLG Evaluation using GPT-4 with Better Human
  Alignment*, EMNLP 2023.
- https://aclanthology.org/2023.emnlp-main.153/
- DOI: https://doi.org/10.18653/v1/2023.emnlp-main.153

### 8.2. MT-Bench và Chatbot Arena

Zheng et al. nghiên cứu strong LLMs như judges cho open-ended model outputs và
cho thấy chúng có thể đạt agreement cao với human preferences. Paper đồng thời
phân tích các hạn chế như:

- position bias;
- verbosity bias;
- self-enhancement bias;
- limited reasoning ability.

Áp dụng vào thesis:

- Pairwise là một phép đo preference có giá trị;
- Pairwise phù hợp làm validation trực tiếp cho câu hỏi mode nào tốt hơn;
- Pairwise không nên chạy mà không có bias controls;
- kết quả Pairwise nên bổ sung, không làm mất absolute quality analysis.

Nguồn:

- Zheng et al. (2023), *Judging LLM-as-a-Judge with MT-Bench and Chatbot
  Arena*, NeurIPS 2023 Datasets and Benchmarks Track.
- https://arxiv.org/abs/2306.05685
- DOI: https://doi.org/10.48550/arXiv.2306.05685

### 8.3. JudgeLM

Zhu et al. phân tích position, knowledge và format biases trong LLM judges.
Các kỹ thuật được nghiên cứu gồm swap augmentation và reference support.

Áp dụng vào thesis:

- nếu chạy Pairwise, phải xử lý presentation order;
- evidence phải đóng vai trò reference;
- schema và format của hai candidate cần tương đương;
- reverse-order pilot là một kiểm tra cần thiết.

JudgeLM cũng hỗ trợ nhiều hình thức judging, bao gồm single-answer và
multiple-answer judging. Điều này củng cố quan điểm rằng pointwise và pairwise
là hai protocol phù hợp với hai câu hỏi khác nhau, không phải một protocol luôn
thay thế protocol còn lại.

Nguồn:

- Zhu et al., *JudgeLM: Fine-tuned Large Language Models are Scalable Judges*.
- https://arxiv.org/abs/2310.17631

## 9. Protocol chạy bằng Codex

### 9.1. Generation phase

Generation được thực hiện trước judging:

```text
1. Khởi động AIService ở baseline mode.
2. Generate và freeze baseline explanations cho cả hai dataset.
3. Restart AIService ở task-aware mode.
4. Generate và freeze task-aware explanations cho cả hai dataset.
5. Validate observed_ai_summary_method cho mọi artifact.
6. Build judge inputs từ các artifacts đã freeze.
```

Judging không đổi `.env` và không gọi lại explanation generator.

### 9.2. UCI Absolute run

```text
1. Tạo UCI run manifest và 104 judge inputs.
2. Validate manifest, record IDs và prompt/rubric hashes.
3. Mở Codex project mới.
4. Mở chat session mới.
5. Gửi đúng một prompt artifact đã freeze.
6. Codex đọc UCI manifest và evaluate 104 records.
7. Lưu raw outputs.
8. Validate JSON/schema/counts.
9. Retry chỉ các failed records theo policy đã freeze.
10. Freeze UCI scoring artifacts.
```

### 9.3. OULAD Absolute run

Chỉ bắt đầu sau khi UCI run đã được freeze.

```text
1. Tạo OULAD run manifest và 104 judge inputs.
2. Validate manifest, record IDs và prompt/rubric hashes.
3. Mở Codex project mới.
4. Mở chat session mới.
5. Gửi lại chính xác prompt artifact dùng cho UCI.
6. Codex đọc OULAD manifest và evaluate 104 records.
7. Lưu raw outputs.
8. Validate JSON/schema/counts.
9. Retry chỉ các failed records theo cùng policy.
10. Freeze OULAD scoring artifacts.
```

### 9.4. Aggregate run

Aggregate không gọi LLM.

Runner deterministic:

```text
UCI validated scoring records
+ OULAD validated scoring records
→ dataset reports
→ overall report
```

Không được:

- sửa score thủ công;
- đổi prompt giữa hai dataset;
- đổi rubric hoặc weights sau UCI để chạy OULAD;
- dùng UCI aggregate results để hướng dẫn judge OULAD;
- silently bỏ failed records khỏi denominator.

## 10. Artifact structure đề xuất

```text
Docs/evaluation_v2/
  Input_AI/
    phase2a_minimal_contract.md
    judge_input_schema.md
    judge_input_example.json

  PromptEvaluateAI/
    JUDGE_PROMPT_V2.md

  Handle20rows/
    # Frozen Phase 3-4 artifacts; không thêm, xóa hoặc sửa

  Rubric/
    JUDGE_RUBRIC_1_TO_10.md
    LLM_JUDGE_V2_METRIC_ANCHOR_SPEC.md
    task_evaluation_requirements.json

  Runs/
      SAMPLE_UCI_POR/
        run_manifest.json
        judge_inputs.jsonl
        judge_outputs.raw.jsonl
        scoring_records.validated.jsonl
        judge_failures.jsonl
        scoring_summary.json
        scoring_summary.md

      SAMPLE_OULAD/
        run_manifest.json
        judge_inputs.jsonl
        judge_outputs.raw.jsonl
        scoring_records.validated.jsonl
        judge_failures.jsonl
        scoring_summary.json
        scoring_summary.md

  Reports/
      SAMPLE_UCI_POR_mode_comparison_v2.md
      SAMPLE_OULAD_mode_comparison_v2.md
      overall_ai_explanation_scoring_summary_v2.md
      ai_explanation_evaluation_methodology_v2.md
```

## 11. Metrics cho từng dataset

Mỗi dataset report cần có:

### Coverage

```text
expected_record_count
valid_record_count
terminal_invalid_count
excluded_count
missing_count
retry_count
```

### Absolute quality

```text
mean/median score theo mode
subscore means theo mode
score distribution
quality-threshold pass rate
major/minor error rate
```

### Paired statistical comparison

```text
mean/median task-aware-minus-baseline delta
positive/zero/negative delta counts
per-task paired table
```

### Row-count analysis

```text
results for row_count <= 20
results for row_count > 20
```

### Pairwise validation nếu chạy

```text
task-aware wins
baseline wins
ties
difference magnitude
position-consistency rate
```

## 12. Overall report

Chỉ tạo sau khi cả UCI và OULAD absolute runs đã pass.

Overall report phải:

- trình bày UCI và OULAD riêng trước;
- không để dataset lớn hơn vô tình chi phối interpretation;
- báo cáo macro average giữa hai dataset nếu cần;
- báo cáo pooled record-level metrics riêng và ghi rõ denominator;
- giữ row-count buckets;
- không che giấu sự khác biệt giữa hai dataset bằng một average duy nhất.

Ví dụ:

```text
Dataset-specific results:
  UCI: ...
  OULAD: ...

Macro average:
  trung bình của hai dataset summaries

Pooled result:
  tổng hợp trên 208 records
```

Do mỗi dataset có cùng 52-task scope, macro và pooled averages có thể gần nhau,
nhưng cả hai vẫn phải được định nghĩa rõ.

## 13. Rủi ro và biện pháp kiểm soát

| Rủi ro | Biện pháp |
|---|---|
| Prompt drift giữa UCI và OULAD | Freeze prompt file và SHA-256 |
| Rubric drift sau khi thấy UCI | Freeze rubric/weights trước UCI |
| Context contamination | Project/session mới cho mỗi dataset |
| Missing records | Manifest expected count và schema validation |
| Judge output invalid | Retry policy cố định, không sửa score thủ công |
| Full evidence quá lớn | Áp dụng Decision D2: direct embedding hoặc deterministic artifact retrieval có log |
| Score compression | Rubric anchor rõ và phân tích score distribution |
| Pairwise position bias | A/B balancing và reverse-order pilot |
| Dataset conclusions bị trộn | Dataset report trước, overall aggregation sau |

## 14. Hướng quyết định được đề xuất

### Primary mandatory evaluation

```text
Absolute Judge V2

Run 1: SAMPLE_UCI_POR
Run 2: SAMPLE_OULAD

Cùng một prompt
Cùng một rubric
Cùng một schema
Hai Codex project/session mới độc lập
```

### Secondary confirmatory evaluation

```text
Pairwise Judge

Độc lập với absolute outputs
Dùng lại evidence gốc
Tách UCI và OULAD
Chỉ chạy sau khi primary evaluation hoàn thành
```

### Lý do lựa chọn

- đáp ứng trực tiếp feedback của thầy;
- giữ điểm chất lượng độc lập;
- hỗ trợ so sánh baseline và task-aware bằng paired delta;
- tránh biến pairwise preference thành evaluation chính khi chưa được yêu cầu;
- vẫn giữ Pairwise như validation có giá trị cao;
- dễ audit, retry và viết report theo dataset;
- phù hợp với thực tế dùng Codex project/session mới.

## 15. Trạng thái các quyết định liên quan

D1 đã được chốt theo thiết kế trong tài liệu này. D2 cũng đã được chốt trong
`LLM_JUDGE_V2_D2_FULL_EVIDENCE_ACCESS_DECISION.md`.

Các câu hỏi dưới đây thuộc phạm vi triển khai hoặc D3-D4 và không làm thay đổi
quyết định primary/secondary của D1:

1. Pairwise validation chạy đủ 104 pairs hay stratified pilot?
2. Pairwise prompt/schema được freeze trước UCI Absolute run hay chỉ trước khi
   đọc aggregate Absolute results?
3. Một Codex session có xử lý ổn định 104 records không, hay cần deterministic
   chunking trong cùng dataset run?
4. Triển khai retrieval protocol của D2 trong runner và Codex workflow.
5. Rubric weights, score caps và overall calculation theo Decision D3.
6. Retry và output repair policy theo Decision D4.

## 16. Câu mô tả có thể tái sử dụng trong thesis

> AI Explanation Evaluation V2 sử dụng pointwise LLM-as-a-Judge làm phương
> pháp đánh giá chính. Mỗi explanation được đánh giá độc lập dựa trên task
> metadata, schema context và query evidence bằng cùng một rubric 1-10 đã được
> cố định. Hai sample datasets được thực hiện trong hai evaluation runs độc
> lập: SAMPLE_UCI_POR trước và SAMPLE_OULAD sau. Mỗi run sử dụng một Codex
> project và chat session mới nhưng áp dụng chính xác cùng prompt, rubric,
> output schema và validation procedure. Cách tách này hạn chế carry-over
> context giữa datasets, hỗ trợ traceability và cho phép chạy lại từng dataset
> độc lập. Pairwise judging, nếu được thực hiện, được xem là secondary
> confirmatory evaluation và sử dụng lại evidence gốc thay vì các absolute
> scores.

## 17. References

1. Liu, Y., Iter, D., Xu, Y., Wang, S., Xu, R., & Zhu, C. (2023).
   *G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment*.
   Proceedings of EMNLP 2023, 2511-2522.
   https://aclanthology.org/2023.emnlp-main.153/

2. Zheng, L., et al. (2023).
   *Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena*.
   NeurIPS 2023 Datasets and Benchmarks Track.
   https://arxiv.org/abs/2306.05685

3. Zhu, L., Wang, X., & Wang, X.
   *JudgeLM: Fine-tuned Large Language Models are Scalable Judges*.
   https://arxiv.org/abs/2310.17631
