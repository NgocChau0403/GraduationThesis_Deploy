# LLM Judge V2 - Decision D4: Reproducibility và Judge Execution

## 1. Trạng thái

```text
APPROVED FOR PILOT IMPLEMENTATION - SESSION STRATEGY PENDING PILOT
```

Các policy chính của D4 đã được thống nhất trong tài liệu này. Trạng thái chỉ
được chuyển sang `DECIDED` sau khi calibration pilot xác nhận session strategy
cho official run.

## 2. Phạm vi D4

D4 chỉ quy định:

- cách tổ chức official evaluation run;
- vai trò của runner, Codex và importer/validator;
- Codex project/session boundary;
- retry, interruption và recovery;
- output validation và manual correction;
- provenance, coverage và điều kiện aggregate.

D4 không định nghĩa lại nội dung judge input, evidence-access protocol, rubric,
score cap, verdict hoặc scoring schema.

D4 giả định:

- evaluation scope tuân theo
  `LLM_JUDGE_V2_D1_DATASET_SEPARATED_EVALUATION_DECISION.md`;
- judge input và full-evidence access tuân theo
  `LLM_JUDGE_V2_D2_FULL_EVIDENCE_ACCESS_DECISION.md`;
- judge output và scoring contract tuân theo
  `LLM_JUDGE_V2_D3_RUBRIC_SCORING_DECISIONS.md` và
  `LLM_JUDGE_V2_D3_OUTPUT_SCHEMA_V1.json`.

Machine-readable output contracts:

```text
LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json
  direct Codex judge response

LLM_JUDGE_V2_EXECUTION_ATTEMPT_WRAPPER_SCHEMA_V1.json
  importer-generated attempt provenance

LLM_JUDGE_V2_RECORD_EXECUTION_STATUS_SCHEMA_V1.json
  record/run coverage lifecycle

LLM_JUDGE_V2_D3_OUTPUT_SCHEMA_V1.json
  post-importer final scoring record
```

## 3. Kiến trúc được chọn

Chọn:

```text
D4-C - HYBRID ARCHITECTURE WITH CODEX AS THE OFFICIAL JUDGE
```

Luồng thực thi:

```text
runner -> Codex -> importer/validator -> aggregator
```

Trách nhiệm:

1. Runner tạo và freeze judge inputs, manifest, hashes và run metadata.
2. Codex thực hiện judging bằng frozen prompt.
3. Importer giữ raw outputs, validate và nối output với đúng record/attempt.
4. Aggregator chỉ sử dụng validated records.

“Hybrid” là phân chia trách nhiệm giữa các thành phần, không phải trộn judge
backend. API output không được trộn vào official Codex aggregate.

## 4. Tách run theo dataset

UCI và OULAD phải được evaluate độc lập:

```text
SAMPLE_UCI_POR  -> một evaluation_run_id riêng
SAMPLE_OULAD    -> một evaluation_run_id riêng
```

Mỗi dataset có:

```text
52 tasks x 2 explanation modes = 104 absolute judge records
```

Không được:

- đưa UCI và OULAD vào cùng Codex session;
- dùng kết quả UCI để hướng dẫn judge OULAD;
- thay prompt, rubric hoặc procedure giữa hai dataset.

Hai run phải dùng cùng frozen prompt và execution policy.

## 5. Codex project và session strategy

Theo yêu cầu của giảng viên, mỗi dataset run phải bắt đầu bằng:

1. Codex project mới.
2. Chat session mới.
3. Frozen prompt duy nhất.
4. Frozen dataset manifest.
5. Không sử dụng lịch sử development, calibration hoặc run cũ.

### 5.1. Session strategy ưu tiên

Policy ưu tiên:

```text
one dataset = one evaluation_run_id = one Codex session
```

Trong session, Codex xử lý tuần tự từng record. Không đưa đồng thời toàn bộ full
query results của 104 records vào active context. Evidence được cung cấp cho
record đang xử lý theo frozen evidence-access protocol.

### 5.2. Calibration pilot bắt buộc

Trước official run, pilot phải kiểm tra:

- context và session có đủ ổn định cho 104 records không;
- Codex có duy trì đúng prompt/rubric từ đầu đến cuối không;
- output đầu, giữa và cuối session có pass schema không;
- có missing, duplicate hoặc record-ID drift không;
- thời gian chạy và chi phí restart có chấp nhận được không;
- các task có large query results có làm session mất ổn định không.

### 5.3. Không chia session ad hoc

Official run phải tuân theo session strategy đã được freeze sau pilot.

Nếu D4 chốt one-session policy:

- không được tự ý chia official run thành nhiều session;
- không được đổi strategy sau khi đã thấy output hoặc gặp lỗi.

Nếu pilot chứng minh one-session không ổn định, D4 phải được cập nhật trước
official run để dùng deterministic session chunking. Chunking phải:

- được xác định trong frozen manifest;
- có scope không overlap;
- không phụ thuộc score hoặc output đã thấy;
- dùng cùng prompt và procedure;
- không cho session sau thấy output/aggregate của session trước.

## 6. Session interruption và recovery

### 6.1. Preferred strict policy

Nếu official one-session run bị gián đoạn trước khi hoàn tất dataset:

```text
run_status = failed_interrupted
```

Không tiếp tục bằng session thứ hai trong cùng run. Muốn chạy lại phải:

1. tạo `evaluation_run_id` mới;
2. mở Codex project/session mới;
3. chạy lại toàn bộ dataset;
4. giữ nguyên artifacts của failed run để audit.

### 6.2. Pre-approved recovery

Recovery session chỉ được phép nếu policy này đã được thiết kế, pilot và freeze
trước official run. Không được quyết định recovery sau khi failure xảy ra.

Nếu sử dụng, policy phải định nghĩa trước:

- điều kiện interruption;
- checkpoint hợp lệ;
- record hoàn thành và record phải chạy lại;
- session sequence và manifest;
- kiểm tra overlap/missing;
- giới hạn số recovery session;
- provenance của từng session segment.

Nếu methodology tuyên bố `one dataset = one session`, recovery session không
được sử dụng; run phải restart theo Mục 6.1.

## 7. Frozen execution contract

Một `evaluation_run_id` phải khóa:

- dataset và expected record scope;
- execution mode và session strategy;
- model identifier quan sát được;
- prompt version/hash;
- rubric version/hash;
- input manifest/hash;
- input/output schema versions;
- evidence retrieval policy;
- retry/recovery policy;
- runner/importer/validator versions.

Nếu một thành phần trên thay đổi theo cách có thể ảnh hưởng kết quả, phải tạo
`evaluation_run_id` mới.

## 8. Model và cấu hình

Chỉ lưu thông tin Codex thực sự cung cấp hoặc có thể quan sát:

```text
judge_provider
execution_surface
selected_model
reported_model
model_snapshot_id
model_snapshot_available
temperature
temperature_available
seed
seed_available
```

Quy tắc:

- value field không quan sát được phải là `null`;
- availability flag tương ứng phải là `false`;
- không dùng chuỗi `"not_available"` thay cho `null`;
- không tự suy đoán model snapshot, temperature hoặc seed;
- toàn bộ run phải dùng cùng model selection;
- nếu model thay đổi giữa run, run phải dừng.

Ví dụ:

```json
{
  "model_snapshot_id": null,
  "model_snapshot_available": false,
  "temperature": null,
  "temperature_available": false,
  "seed": null,
  "seed_available": false
}
```

Nếu Codex không cung cấp immutable snapshot ID, kết luận chỉ được mô tả là:

```text
auditable procedural reproducibility
```

Không tuyên bố có thể tái tạo bit-for-bit cùng model output.

## 9. Immutable input và manifest

Trước judging, runner phải freeze manifest gồm tối thiểu:

```text
evaluation_run_id
dataset_id
expected_record_count
record_id
task_id
explanation_mode
judge_input_path
judge_input_sha256
```

Sau khi freeze, không được sửa input, thêm/xóa record hoặc tái sử dụng cùng
`record_id` cho input khác. Nếu input cần sửa, phải tạo run mới.

Pre-judging retrieval phải hoàn tất và pass validation trước khi record được gửi
cho Codex. Lỗi retrieval ở giai đoạn này không tính là judge attempt.

## 10. Output format và provenance

Canonical artifact:

```text
one record = one JSON object = one attempt artifact
```

Nhiều record có thể được xử lý tuần tự trong cùng session, nhưng validated
artifact phải tách theo từng record/attempt.

Nếu Codex trả nhiều record trong một response:

```text
session raw response
-> extracted record output
-> normalized record output, nếu có
-> validated record output
```

Session raw response phải được giữ nguyên. Extracted output không được mô tả là
raw response gốc.

Importer phải tạo `source_response_id` nội bộ để nối record attempt với đúng
source response. Khi transcript có chỉ số message hoặc Codex cung cấp response
ID, lưu thêm các giá trị đó; nếu không quan sát được thì lưu `null`.

Mỗi attempt tối thiểu lưu:

```text
evaluation_run_id
record_id
session_segment_id
session_sequence_number
attempt_number
attempt_reason
judge_status
judge_input_sha256
source_response_id
source_response_message_index
source_response_provider_id
raw_or_source_response_path
raw_or_source_response_sha256
extracted_output_path
validated_output_path
validated_output_sha256
validation_errors
retrieval_log_path_if_applicable
judged_at
validated_at
```

Attempt artifact phải validate theo
`LLM_JUDGE_V2_EXECUTION_ATTEMPT_WRAPPER_SCHEMA_V1.json`. Extracted direct judge
output phải validate theo `LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json` trước khi
runner tạo final scoring record.

Attempt wrapper chỉ dùng cho attempt đã tạo source response:

```text
raw_received
valid
retryable_invalid
terminal_invalid
```

Các lifecycle state `pending`, `in_progress`, `excluded` và derived state
`missing` thuộc record/run coverage manifest, không thuộc attempt wrapper.
Record lifecycle artifact phải validate theo
`LLM_JUDGE_V2_RECORD_EXECUTION_STATUS_SCHEMA_V1.json`.

## 11. Retry policy

Đề xuất:

```text
maximum_judge_attempts_per_record = 3
```

Retry chỉ được phép khi:

- output thiếu hoặc bị truncate;
- invalid JSON sau normalization được phép;
- output không pass schema/semantic validation;
- record ID sai hoặc không xác định được;
- in-session tool/retrieval failure;
- lỗi kỹ thuật khác đã được ghi nhận.

Không được retry vì:

- score thấp hoặc verdict bất lợi;
- người thực hiện không đồng ý với judgment hợp lệ;
- muốn chọn attempt có kết quả thuận lợi hơn.

Phân biệt:

- runner retrieval failure trước judging: không tính judge attempt;
- tool/retrieval failure sau khi Codex bắt đầu record: tính failed judge attempt.

Nếu hết attempt mà không có output hợp lệ:

```text
judge_status = terminal_invalid
```

## 12. Invalid JSON và manual correction

Importer chỉ được deterministic syntactic normalization:

- bỏ Markdown code fence;
- bỏ BOM;
- trim whitespace hoặc phần dẫn nhập/kết thúc ngoài một JSON object rõ ràng.

Raw/source response phải luôn được giữ nguyên và mọi transformation phải được
ghi log.

Không được semantic repair:

- tự thêm field;
- sửa score, severity, claim check hoặc rationale;
- tự chọn enum;
- ghép các output không hoàn chỉnh.

Không được manual correction trực tiếp official judge output. Nếu cần human
adjudication, phải lưu thành artifact riêng và không trình bày như Codex output.

## 13. Validation và trạng thái record

Validator kiểm tra:

- JSON/output schema;
- required fields, type, enum và cardinality;
- `record_id` khớp manifest;
- runner-derived fields nhất quán;
- không có missing hoặc duplicated valid output;
- input/output hashes và provenance hợp lệ.

Validator không đánh giá lại chất lượng explanation.

Record status:

```text
pending
in_progress
raw_received
valid
retryable_invalid
terminal_invalid
excluded
```

`pending`, `in_progress` và `excluded` được lưu ở record/run coverage layer.
`raw_received`, `valid`, `retryable_invalid` và `terminal_invalid` đồng thời có
attempt artifacts. `missing` là trạng thái được coverage validator suy ra khi
expected record không có terminal state lúc run kết thúc.

Chỉ record `valid` được đưa vào mean score chính.

`excluded` và `missing` có ý nghĩa khác nhau:

- `excluded`: record được loại theo exclusion rule đã freeze trước judging;
- `missing`: expected record không có terminal output hoặc không có trạng thái
  cuối khi run kết thúc.

Không được chuyển `missing`, `terminal_invalid` hoặc failed record thành
`excluded` sau khi quan sát lỗi để cải thiện coverage. Nếu phát hiện manifest
sai, phải đánh dấu run/manifest không hợp lệ và tạo run mới thay vì sửa
denominator âm thầm.

### 13.1. Execution-to-scoring mapping

Execution status và scoring status thuộc hai tầng khác nhau:

| Execution state | Final scoring mapping |
|---|---|
| `valid` | Final scoring record phải có `scoring_status = scored` |
| `terminal_invalid` | Final scoring record phải có `scoring_status = invalid`; `invalid_reason` ghi technical, evidence hoặc schema failure |
| `excluded` | Final scoring record có thể có `scoring_status = not_scored`; exclusion reason phải đến từ frozen manifest/rule |
| `missing` | Không có valid scoring record; tính vào `missing_count` và không được đổi thành `excluded` sau run |

`retryable_invalid` là trạng thái attempt trung gian, không phải final scoring
status. Chỉ attempt cuối hoặc attempt hợp lệ mới được nối vào final record.

## 14. Aggregate denominator và coverage

Phải tách quality aggregation khỏi execution coverage:

```text
mean_valid_score
  = tổng final score của valid records / valid_record_count

coverage denominator
  = expected_record_count
```

Report bắt buộc có:

```text
expected_record_count
valid_record_count
terminal_invalid_count
excluded_count
missing_count
valid_rate
terminal_invalid_rate
excluded_rate
missing_rate
retry_count
```

Không được chỉ report mean score mà che giấu invalid, excluded hoặc missing
records.

`coverage_adjusted_score` nếu được sử dụng chỉ là diagnostic metric, không thay
thế mean score và coverage report.

## 15. Invalid-rate guard

Run có thể hoàn tất về mặt kỹ thuật khi mọi record đã có trạng thái cuối, nhưng
không mặc nhiên đủ điều kiện làm final result.

Cần phân biệt:

```text
run_status
final_reporting_eligibility
```

Ngưỡng warning/review/rejection cho invalid hoặc missing rate phải được
calibration pilot đề xuất và freeze trước official run. Không mô tả các ngưỡng
khởi tạo là empirically validated khi chưa có pilot evidence.

`missing_count > 0` phải chặn final reporting cho đến khi được xử lý hoặc giải
thích bằng một exclusion rule đã freeze.

## 16. Run completion gate

Run chỉ được đánh dấu hoàn tất khi:

1. Manifest và hashes đã freeze.
2. Tất cả expected records có trạng thái cuối.
3. Không còn record `pending` hoặc `in_progress`.
4. Raw/source responses và attempt provenance đã được lưu.
5. Valid outputs đã pass validation.
6. Missing, duplicate, invalid và excluded records đã được thống kê.
7. Aggregate chỉ sử dụng valid records.

Trước calibration pilot, các pilot contract artifacts phải:

- được theo dõi trong Git;
- có SHA-256 được ghi trong pilot manifest;
- ghi repository commit SHA nếu quan sát được.

Trước official run, prompt, rubric, anchors, schemas, manifests và
runner/importer/validator code phải được commit. Untracked decision hoặc contract
file không được xem là immutable official-run artifact.

Run hoàn tất nhưng không pass invalid-rate guard phải được ghi là không đủ điều
kiện cho final reporting.

## 17. Metadata tối thiểu

Run-level:

```text
evaluation_run_id
dataset_id
run_status
final_reporting_eligibility
execution_mode
session_strategy
judge_provider
execution_surface
selected_model
reported_model
model_snapshot_id
model_snapshot_available
temperature
temperature_available
seed
seed_available
prompt_version
prompt_sha256
rubric_version
rubric_sha256
input_manifest_sha256
input_schema_version
output_schema_version
retrieval_policy_version
retry_policy_version
expected_record_count
started_at
completed_at
runner_version
importer_version
validator_version
repository_commit_sha_if_available
```

Record-level:

```text
evaluation_run_id
record_id
session_segment_id
session_sequence_number
attempt_number
attempt_reason
judge_status
judge_input_sha256
source_response_id
source_response_message_index
source_response_provider_id
raw_or_source_response_path
raw_or_source_response_sha256
extracted_output_path
validated_output_path
validated_output_sha256
validation_errors
retrieval_log_path_if_applicable
judged_at
validated_at
```

Với one-session strategy:

```text
session_segment_id = S01
session_sequence_number = 1
```

Các field source-response:

- `source_response_id`: identifier nội bộ do importer tạo, bắt buộc;
- `source_response_message_index`: message index nếu quan sát được, nếu không là
  `null`;
- `source_response_provider_id`: Codex/provider response ID nếu có, nếu không là
  `null`.

## 18. Pilot decision artifact

Calibration pilot phải tạo decision artifact riêng, không ghi đè vào official
run metadata:

```text
pilot_result_path
pilot_result_sha256
session_strategy_decision
invalid_rate_guard_decision
decision_date
```

Artifact này phải ghi:

- pilot scope và input manifest;
- session strategy đã thử;
- completion, interruption, missing, duplicate và invalid statistics;
- kiểm tra output ở đầu, giữa và cuối session;
- lý do chọn one-session hoặc deterministic session chunking;
- invalid/missing-rate guard được đề xuất.

D4 chỉ chuyển sang `DECIDED` khi pilot artifact tồn tại, pass validation và được
tham chiếu trong decision package.

## 19. Policy đã thống nhất

| Nội dung | Policy |
|---|---|
| Kiến trúc | Runner -> Codex -> validator -> aggregator |
| Official judge | Codex |
| Dataset scope | UCI và OULAD là hai run/session độc lập |
| Prompt | Một frozen prompt dùng cho cả hai dataset |
| Session ưu tiên | Một dataset, một project mới, một session mới |
| Session strategy | Pilot trước khi freeze |
| Ad hoc session split | Cấm |
| Interruption mặc định | Run failed; run lại dataset bằng run ID mới |
| Recovery session | Chỉ khi được thiết kế và freeze trước official run |
| API output | Không trộn vào official Codex aggregate |
| Record output | Một JSON object cho mỗi record/attempt |
| Judge attempts | Tối đa 3 |
| Retry | Chỉ lỗi kỹ thuật hoặc invalid output |
| Semantic/manual repair | Cấm |
| Human adjudication | Artifact riêng |
| Main mean score | Chỉ valid records |
| Coverage denominator | Tất cả expected records |
| Invalid-rate guard | Freeze sau pilot, trước official run |
| Reproducibility claim | Procedural và auditable |

## 20. Điểm còn phải xác nhận bằng pilot

Pilot phải trả lời hai điểm trước khi D4 chuyển sang `DECIDED`:

1. Một Codex session có xử lý ổn định toàn bộ 104 records của từng dataset không?
2. Invalid/missing-rate guard nào phù hợp để cho phép final reporting?

Nếu one-session pass pilot, D4 freeze:

```text
one dataset = one evaluation_run_id = one Codex session
strict restart on interruption
```

Nếu one-session không pass, D4 phải được sửa và review để freeze deterministic
session chunking trước official run.

## 21. Quyết định cuối cùng

```text
D4 được chấp thuận để implementation và calibration pilot. D4 chưa được chốt
cho official evaluation cho đến khi pilot xác nhận session strategy và
invalid/missing-rate guard.
```
