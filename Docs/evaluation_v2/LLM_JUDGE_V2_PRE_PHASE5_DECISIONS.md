# LLM Judge V2 - Decision Log Trước Phase 5

## 1. Mục đích

File này lưu các quyết định phương pháp luận cần chốt trước khi viết:

```text
judge_input_schema.md
JUDGE_PROMPT_V2.md
JUDGE_RUBRIC_1_TO_10.md
runner V2
```

Mỗi nội dung dưới đây có trạng thái riêng. Chỉ các mục `DECIDED` mới được phép
đưa vào implementation; khuyến nghị trong mục `OPEN` hoặc `PROPOSED` không được
xem là quyết định cuối cùng.

## 2. Quy ước trạng thái

| Trạng thái | Ý nghĩa |
|---|---|
| `OPEN` | Chưa chốt |
| `PROPOSED` | Có phương án ưu tiên nhưng cần review |
| `DECIDED` | Đã chốt trong phạm vi decision và được phép đưa vào implementation |
| `SCHEMA_FROZEN_PRE_PILOT` | Schema và scoring-engine policy đã freeze để implement/pilot; official policy còn chờ calibration |
| `APPROVED_FOR_PILOT_IMPLEMENTATION` | Đủ để implement contract và chạy calibration pilot, nhưng chưa được dùng cho official evaluation |
| `DECIDED_FOR_OFFICIAL_RUN` | Đã pass calibration gate và được freeze cho official evaluation |
| `REVISIT` | Đã từng chốt nhưng cần xem lại do evidence mới |

## 3. Decision D1 - Absolute Judge hay Paired Judge

- Trạng thái: `DECIDED`
- Ảnh hưởng: judge input schema, prompt, số lần gọi judge và comparison report.
- Tài liệu quyết định canonical:
  `LLM_JUDGE_V2_D1_DATASET_SEPARATED_EVALUATION_DECISION.md`

### Vấn đề

Chấm riêng từng explanation cho biết chất lượng tuyệt đối, nhưng có thể tạo
nhiều tie và không buộc judge phân tích trực tiếp sự khác biệt giữa hai mode.

Chấm paired trực tiếp giúp xác định mode tốt hơn cho cùng task, nhưng điểm có
thể mang tính tương đối và bị ảnh hưởng bởi thứ tự trình bày.

### Các lựa chọn

#### D1-A. Chỉ absolute judging

- Chấm baseline và task-aware độc lập.
- Comparison lấy chênh lệch giữa hai score.
- Đơn giản và gần V1, nhưng có thể bỏ qua khác biệt nhỏ.

#### D1-B. Chỉ paired judging

- Đưa hai explanation vào cùng một input.
- Judge chọn winner/tie và giải thích.
- So sánh trực tiếp tốt, nhưng thiếu absolute quality score độc lập.

#### D1-C. Hai tầng

1. Chấm absolute từng explanation.
2. Chạy paired comparison riêng cho từng dataset-task.

### Quyết định đã chốt

Primary evaluation:

```text
Absolute Judge V2
```

- UCI và OULAD chạy thành hai evaluation runs độc lập.
- UCI chạy trước; OULAD chạy sau.
- Hai run dùng chính xác cùng prompt, rubric, schema và validation rules.
- Mỗi dataset được chạy trong Codex project/chat session mới.
- Absolute Judge chấm từng explanation độc lập từ evidence gốc.

Secondary confirmatory evaluation:

```text
Pairwise Judge
```

- Không sử dụng absolute scores làm input.
- Đọc lại task metadata, schema, full-query evidence và hai explanations.
- Được triển khai sau khi primary Absolute Judge V2 hoàn thành.

### Các chi tiết triển khai còn lại

- Pairwise chạy đủ 104 pairs hay stratified pilot.
- Quy tắc A/B balancing và reverse-order pilot.
- Cách cung cấp full evidence lớn theo D2.
- Rubric/score caps theo D3.
- Execution/retry/output validation theo D4.

### Quyết định cuối cùng

Đã chốt theo
`LLM_JUDGE_V2_D1_DATASET_SEPARATED_EVALUATION_DECISION.md`.

## 4. Decision D2 - Cách cung cấp Full-query Evidence Lớn

- Trạng thái: `DECIDED`
- Ảnh hưởng: token budget, claim verification, runner và reproducibility.
- Tài liệu quyết định canonical:
  `LLM_JUDGE_V2_D2_FULL_EVIDENCE_ACCESS_DECISION.md`

### Vấn đề

Một số query result có hàng trăm hoặc hàng nghìn rows. Đưa toàn bộ raw JSON vào
một prompt có thể:

- vượt context hoặc làm prompt quá nhiễu;
- tăng chi phí;
- khiến judge bỏ sót evidence;
- khó tái lập nếu thao tác thủ công.

Tuy nhiên, chỉ đưa summary lại có nguy cơ lặp lại hạn chế của V1: judge không
thật sự có quyền truy cập full evidence.

### Các lựa chọn

#### D2-A. Embed toàn bộ rows

Phù hợp với result nhỏ, không phù hợp làm rule chung.

#### D2-B. Chunk full result và để judge đọc nhiều phần

- Full rows vẫn được lưu.
- Judge xử lý theo chunk rồi tổng hợp.
- Cần kiểm soát aggregation và nguy cơ mất quan hệ giữa các chunk.

#### D2-C. Deterministic claim checker + LLM judge

- Chương trình trích/kiểm tra claim số học, ranking, coverage và threshold trên
  full query result.
- LLM nhận full artifact reference, deterministic check results, task context
  và explanation để đánh giá semantic quality.
- Cần định nghĩa rõ checker kiểm tra được gì và không được overclaim.

#### D2-D. Hybrid theo kích thước

```text
row_count <= threshold:
  embed toàn bộ rows
row_count > threshold:
  lưu full artifact
  chạy deterministic checks
  cung cấp structured evidence/chunks cho judge
```

### Quyết định đã chốt

Áp dụng `D2-D revised`:

```text
result nhỏ và vừa token budget:
  embed toàn bộ rows

result lớn hoặc vượt token budget:
  lưu full artifact có SHA-256
  cấp artifact qua deterministic retrieval mechanism
  log chunks/row ranges thực sự được đưa vào model context
  chạy deterministic checks trên full result cho claim types hỗ trợ
```

Mốc row-count mặc định vẫn là `20`, nhưng direct embedding còn phải qua token
preflight. Hybrid chỉ thay đổi cách truyền evidence; không giảm phạm vi full
evidence mà evaluation environment phải có quyền truy xuất.

Judge input phải phân biệt:

```text
availability
retrieval/delivery
verification
```

Không được:

- coi artifact path là bằng chứng judge có access;
- gọi structured evidence là full rows;
- dùng `judge_accessible_row_count` để nhập nhằng available và retrieved;
- tuyên bố model đã chú ý tới mọi row chỉ vì row có trong context;
- fallback âm thầm về preview-only judging.

Chi tiết implementation, multi-dataset handling, cross-row checks, provenance,
retrieval logs và fail-closed rules nằm trong tài liệu canonical của D2.

### Quyết định cuối cùng

Đã chốt theo
`LLM_JUDGE_V2_D2_FULL_EVIDENCE_ACCESS_DECISION.md`.

## 5. Decision D3 - Rubric 1-10 và Công Thức Điểm

- Trạng thái: `SCHEMA_FROZEN_PRE_PILOT`
- Canonical status: `SCHEMA FROZEN - PRE-PILOT SCORING POLICY`
- Official status: pending calibration.
- Ảnh hưởng: prompt, output schema, aggregation và kết luận thesis.
- Tài liệu quyết định canonical:
  `LLM_JUDGE_V2_D3_RUBRIC_SCORING_DECISIONS.md`
- Schema machine-readable canonical:
  `LLM_JUDGE_V2_D3_OUTPUT_SCHEMA_V1.json` (`d3_schema_v1`)

### Vấn đề

Đổi từ 1-5 sang 1-10 chỉ tăng độ phân giải hình thức. Nếu không chốt công thức,
hai judge có thể cho cùng subscores nhưng overall score khác nhau.

### Subscores dự kiến

```text
faithfulness
numerical_correctness
completeness
task_relevance
actionability
clarity
safety_fairness
```

### Các điểm phải định nghĩa

- Trọng số từng subscore.
- Overall score là weighted mean, holistic score hay kết hợp cả hai.
- Quy tắc làm tròn.
- Major factual error có cap overall score hay không.
- Hallucination có cap hoặc automatic fail hay không.
- Missing insight ảnh hưởng `completeness` hay cả overall score.
- `safety_fairness` có áp dụng cho mọi task hay được đánh dấu not-applicable.
- Cách tính khi một subscore không áp dụng.

### Khuyến nghị ban đầu

- Dùng weighted score được tính bằng runner, không để LLM tự tính.
- Judge trả subscores, claim checks và error severity.
- Runner tính overall score theo công thức đã freeze.
- Áp dụng score cap cho unsupported major factual/numerical claims.
- Lưu cả:

```text
raw_weighted_score
final_score_after_caps
caps_applied
```

### Điều cần chốt

- Danh sách subscore cuối cùng.
- Trọng số chính xác.
- Major/minor error taxonomy.
- Score caps.
- Quy tắc verdict, ví dụ `poor`, `acceptable`, `good`, `excellent`.

### Quyết định cuối cùng

Đã chốt theo
`LLM_JUDGE_V2_D3_RUBRIC_SCORING_DECISIONS.md` và
`LLM_JUDGE_V2_D3_OUTPUT_SCHEMA_V1.json`.

## 6. Decision D4 - Reproducibility và Judge Execution

- Trạng thái: `APPROVED_FOR_PILOT_IMPLEMENTATION`
- Canonical status:
  `APPROVED FOR PILOT IMPLEMENTATION - SESSION STRATEGY PENDING PILOT`
- Ảnh hưởng: runner, metadata, retry policy và khả năng bảo vệ kết quả.
- Tài liệu quyết định canonical:
  `LLM_JUDGE_V2_D4_REPRODUCIBILITY_EXECUTION_DECISIONS.md`

### Vấn đề

Quy trình thủ công:

```text
mở Codex session mới
dán prompt
đưa judge inputs
copy outputs
```

không tự động bảo đảm:

- model/version snapshot;
- run ID;
- exact prompt hash;
- retry policy;
- output validation;
- record-level provenance;
- detection of missing hoặc duplicated outputs.

### Các lựa chọn

#### D4-A. Manual Codex-only procedure

Đơn giản nhưng cần thao tác và audit rất chặt.

#### D4-B. API/runner execution

Metadata và validation mạnh hơn, nhưng cần môi trường/model endpoint phù hợp.

#### D4-C. Hybrid

- Runner build immutable judge inputs và manifest.
- Codex hoặc API thực hiện judging.
- Importer validate outputs, lưu provenance và aggregate.

### Khuyến nghị ban đầu

`D4-C`.

Mỗi run nên lưu:

```text
evaluation_run_id
judge_provider
judge_model
judge_model_version_if_available
prompt_version
prompt_sha256
rubric_version
rubric_sha256
input_manifest_sha256
temperature
started_at
completed_at
retry_policy
runner_version
```

Mỗi record nên có:

```text
record_id
attempt_number
judge_status
raw_output_path
validated_output_path
validation_errors
judged_at
```

### Điều cần chốt

- Judge được gọi bằng API hay Codex session.
- Model và temperature.
- Số lần retry tối đa.
- Khi nào được retry.
- Invalid JSON được repair hay phải judge lại.
- Có cho phép manual correction hay không.
- Cách ghi nhận model version khi provider không cung cấp snapshot ID.

### Quyết định cuối cùng

Được chấp thuận để implement contract và calibration pilot; chưa được chốt cho
official evaluation. D4 chỉ chuyển sang `DECIDED_FOR_OFFICIAL_RUN` sau khi pilot
artifact tồn tại, pass validation và freeze session strategy cùng
invalid/missing-rate guard.

## 7. Thứ tự thảo luận đề xuất

Nên chốt theo thứ tự:

1. `D1` - cấu trúc absolute/paired evaluation.
2. `D2` - evidence access.
3. `D3` - rubric và scoring formula.
4. `D4` - execution và reproducibility.

Lý do: D1 và D2 quyết định judge input; D3 quyết định output; D4 quyết định cách
runner vận hành hai contract đó.

## 8. Phase Gates

### 8.1. Phase 2b/5/6 implementation gate

Được phép implement judge-input contract, prompt/rubric pilot package và runner
V2 khi:

- D1 = `DECIDED`;
- D2 = `DECIDED`;
- D3 = `SCHEMA_FROZEN_PRE_PILOT`;
- D4 = `APPROVED_FOR_PILOT_IMPLEMENTATION`.

Gate này không cho phép chạy official full evaluation.

### 8.2. Calibration pilot gate

Chỉ bắt đầu pilot khi:

- judge input schema và example tồn tại;
- direct judge response schema tồn tại;
- final scoring record schema tồn tại;
- execution attempt wrapper schema tồn tại;
- metric anchor spec tồn tại;
- task-level core/supporting requirements và safety applicability tồn tại;
- prompt/rubric version dành cho pilot đã freeze;
- pilot manifest đã freeze;
- các contract artifacts đã được validate, hash và theo dõi trong Git.

### 8.3. Official evaluation gate

Chỉ bắt đầu official evaluation khi:

- D3 đã được calibration và tạo scoring formula version chính thức;
- D4 = `DECIDED_FOR_OFFICIAL_RUN`;
- pilot decision artifact tồn tại, pass validation và được tham chiếu;
- invalid/missing-rate guard đã freeze;
- session strategy đã freeze;
- prompt, rubric, anchors, schemas, manifests và
  runner/importer/validator code đã commit;
- run metadata có artifact hashes và repository commit SHA nếu quan sát được.

Sau khi cập nhật một decision:

1. Cập nhật trạng thái và phạm vi hiệu lực.
2. Ghi phương án được chọn.
3. Ghi lý do và trade-off được chấp nhận.
4. Ghi artifact/code bị ảnh hưởng.
5. Ghi ngày chốt.

Không xóa các lựa chọn không được chọn; giữ chúng để giải thích quá trình thiết
kế evaluation.
