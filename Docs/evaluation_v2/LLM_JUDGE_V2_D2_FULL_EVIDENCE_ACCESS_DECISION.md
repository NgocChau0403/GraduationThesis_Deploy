# LLM Judge V2 - Decision D2: Verifiable Full-Evidence Access

## 1. Mục đích tài liệu

Tài liệu này ghi lại quyết định đã chốt cho Decision D2 của AI Explanation
Evaluation V2: cách cung cấp full-query evidence cho LLM Judge, đặc biệt khi
query result có hàng trăm hoặc hàng nghìn rows.

Trạng thái:

```text
DECIDED - được phép đưa vào Phase 2b, Phase 5 và Phase 6 implementation
```

Quyết định này áp dụng cho cả:

- Primary Absolute Judge V2;
- Secondary Pairwise Judge, nếu được triển khai;
- `SAMPLE_UCI_POR` và `SAMPLE_OULAD`;
- `baseline_first_20_rows` và `task_aware_data_summarization`.

## 2. Feedback và vấn đề cần giải quyết

LLM Judge phải có nhiều thông tin hơn model tạo AI explanation để có thể đánh
giá faithfulness, numerical correctness, completeness và task relevance.

Evaluation context tối thiểu cần chứa hoặc cung cấp quyền truy xuất thực tế tới:

```text
task metadata
task description
expected analytical output
dataset metadata
schema context
full query result
evidence đã cấp cho explanation model
AI explanation cần chấm
thresholds, units và business rules liên quan
```

V1 không đáp ứng yêu cầu này vì judge chỉ nhận evidence preview giới hạn, trong
một số trường hợp còn ít hơn evidence mà explanation model đã nhận.

Tuy nhiên, việc chỉ ghi một đường dẫn artifact trong prompt không chứng minh
judge có thể hoặc đã truy xuất artifact. Một file tồn tại trên disk nhưng không
được attach, mount, cấp quyền, mở hoặc retrieval vào model context không được
tính là judge-accessible evidence.

## 3. Quyết định phương pháp luận

Wording canonical:

> Judge evaluation context must provide verifiable access to the complete query
> result, either through direct prompt embedding or through a deterministic
> artifact-retrieval mechanism. The evaluation record must distinguish evidence
> availability from evidence actually retrieved into the model context.

Giới hạn diễn giải:

> Artifact existence alone does not constitute judge access, and access alone
> does not prove that every row was retrieved, attended to, or used by the
> model.

Do đó, V2 không dùng câu khẳng định mơ hồ như:

```text
The judge saw all rows.
```

Thay vào đó, report phải mô tả chính xác một trong các trạng thái:

```text
The complete result was embedded in the judge context.
The complete result was available through a verified retrieval mechanism.
The cited row ranges were retrieved into the judge context.
The complete result was scanned by deterministic checks.
```

## 4. Ba lớp bằng chứng bắt buộc

### 4.1. Evidence availability

Chứng minh full artifact tồn tại, đầy đủ, bất biến và thuộc đúng evaluation
record.

Schema tối thiểu dùng một collection thống nhất cho cả single-dataset và
multi-dataset result:

```json
{
  "full_result_row_count": 2000,
  "full_query_artifacts": [
    {
      "dataset_label": "primary_evidence",
      "artifact_path": ".../primary_evidence.full_query_result.json",
      "sha256": "...",
      "byte_count": 123456,
      "row_count": 2000,
      "format": "json",
      "access_granted": true,
      "created_at": "2026-06-19T00:00:00Z"
    }
  ],
  "query_execution_id": "..."
}
```

Không tạo thêm các field số ít như `full_query_artifact_path` hoặc
`full_query_artifact_sha256`. Single-dataset result vẫn dùng
`full_query_artifacts` với đúng một phần tử.

`access_granted = true` chỉ hợp lệ khi evaluation environment thật sự được
attach/mount artifact hoặc runner có thể đọc artifact. Không được suy ra field
này chỉ từ việc path tồn tại trong JSON.

`full_result_row_count` phải bằng tổng `row_count` của các phần tử trong
`full_query_artifacts`.

### 4.2. Evidence delivery

Chứng minh evidence nào thực sự được đưa vào model context.

Các field tối thiểu:

```text
evidence_access_mode
prompt_embedded_row_count
retrieved_row_count
retrieved_row_count_by_dataset
retrieved_row_ranges
retrieved_chunk_ids
retrieval_log_path
retrieval_request_complete
retrieval_coverage_status
```

`retrieved_row_ranges` bắt buộc là structured records:

```json
[
  {
    "dataset_label": "primary_evidence",
    "row_start_inclusive": 1800,
    "row_end_inclusive": 1900
  }
]
```

Không dùng row range thiếu `dataset_label`, kể cả task hiện tại chỉ có một
dataset component.

Với `deterministic_artifact_retrieval`,
`retrieval_request_complete = true` nghĩa là retrieval request đã hoàn tất theo
protocol: request được xử lý, evidence được delivery hoặc failure được ghi log,
và log đã được đóng hợp lệ. Field này không có nghĩa mọi row trong artifact đã
được đưa vào LLM context.

Với `full_prompt_embedding`, `retrieval_request_complete = null` vì không có
artifact retrieval request. Full delivery được chứng minh bằng embedded
count/hash và `retrieval_coverage_status = full`.

Allowed `retrieval_coverage_status`:

```text
full
partial
none
```

`partial` là trạng thái hợp lệ cho large-result evaluation nếu full artifact có
thể truy cập, retrieval đủ hỗ trợ semantic claims, deterministic checker đã
scan đúng scope cho các claim type hỗ trợ, và logs/citations đầy đủ.

Allowed `evidence_access_mode`:

```text
full_prompt_embedding
deterministic_artifact_retrieval
```

Không dùng `structured_evidence_only` như một implementation hợp lệ của
full-evidence evaluation. Structured evidence vẫn có thể được cấp để hỗ trợ
judge, nhưng không thay thế quyền truy cập full result.

### 4.3. Evidence verification

Chứng minh phần nào của result đã được kiểm tra bằng code và phần nào chỉ được
LLM đánh giá ngữ nghĩa.

Các field tối thiểu:

```text
deterministic_checks_run
deterministic_scan_scope
deterministic_scan_row_count_by_dataset
checked_claim_types
unchecked_claim_types
check_results_path
judge_evidence_citations
```

Allowed `deterministic_scan_scope`:

```text
full_result_for_supported_claim_types
claim_relevant_partitions
not_run
```

`full_result_for_supported_claim_types` nghĩa là checker duyệt toàn bộ rows của
mọi dataset component cho các claim types mà checker hỗ trợ. Nó không có nghĩa
mọi semantic claim trong explanation đều có thể được xác minh bằng code.

`deterministic_scan_row_count_by_dataset` phải ghi count riêng theo
`dataset_label` để có thể đối chiếu với từng artifact.

Ba khái niệm không được nhập làm một:

```text
available = evidence thuộc phạm vi judge có quyền truy xuất
retrieved = evidence đã được đưa vào model context
used = judge viện dẫn hoặc dùng evidence trong rationale
```

## 5. Chính sách hybrid đã chốt

Hybrid chỉ quyết định cách truyền evidence, không quyết định judge được phép
thấy bao nhiêu evidence.

```text
Nếu result nhỏ và vừa direct-embedding budget:
  embed toàn bộ query result
  evidence_access_mode = full_prompt_embedding

Nếu result lớn hoặc vượt direct-embedding budget:
  lưu immutable full-query artifact
  tạo deterministic chunks và retrieval index
  cấp full artifact cho retrieval mechanism
  log mọi chunk/range được đưa vào model context
  evidence_access_mode = deterministic_artifact_retrieval
```

Mốc ban đầu là configuration, không hard-code trong retrieval/runner logic:

```text
small_result_row_threshold =
  config.default_direct_embedding_row_threshold

config.default_direct_embedding_row_threshold = 20
```

Direct embedding chỉ được chọn khi đồng thời:

```text
full_result_row_count <= small_result_row_threshold
serialized_result_tokens <= configured_direct_embedding_token_budget
```

Nếu result không vượt `small_result_row_threshold` nhưng mỗi row quá lớn, runner
phải chuyển sang `deterministic_artifact_retrieval` và ghi rõ lý do. Không được
truncate âm thầm.

Mốc `20` là policy mặc định và là reporting bucket đã được Phase 3-4 xác minh;
token preflight là safety condition cho context thực tế.

## 6. Hai cơ chế implementation hợp lệ

### 6.1. Direct prompt embedding

Runner serialize toàn bộ rows theo thứ tự canonical và đưa chúng trực tiếp vào
judge input.

Điều kiện hoàn thành:

- embedded row count bằng full result row count;
- hash của embedded canonical payload khớp hash được lưu trong manifest;
- prompt không truncate payload;
- judge output ghi nhận `full_prompt_embedding`;
- validation fail nếu count hoặc hash không khớp.

Ví dụ:

```json
{
  "evidence_access_mode": "full_prompt_embedding",
  "full_result_row_count": 12,
  "prompt_embedded_row_count": 12,
  "retrieved_row_count": 12,
  "retrieved_row_count_by_dataset": {
    "primary_evidence": 12
  },
  "retrieval_request_complete": null,
  "retrieval_coverage_status": "full"
}
```

### 6.2. Deterministic artifact retrieval

Đây là cơ chế bắt buộc cho result lớn. Chỉ ghi `artifact_path` trong một phần tử
của `full_query_artifacts` vào prompt là không đủ.

Implementation phải có:

1. Full artifact canonical và SHA-256.
2. Chunk manifest xác định, không chunk tùy hứng trong chat.
3. Row ranges không overlap ngoài chủ đích và không tạo gap.
4. Retrieval index ánh xạ `chunk_id -> row_start, row_end, hash`.
5. Runner hoặc Codex workflow thật sự có quyền đọc artifact.
6. Prompt hướng dẫn judge cách yêu cầu/đọc evidence.
7. Retrieval log cho từng chunk được đưa vào model context.
8. Evidence citation trong output để nối rationale về chunk/row.

Khuyến nghị reproducibility:

```text
Ưu tiên runner-mediated retrieval.
```

Runner-mediated retrieval không phụ thuộc vào việc LLM tự biết mở file. Runner
đọc artifact, chọn chunk theo protocol đã freeze, đưa chunk vào model context và
ghi log. Nếu dùng Codex tool access, transcript/tool log phải được lưu như một
phần của evaluation evidence.

Workflow sau không hợp lệ:

```text
copy prompt vào chat
prompt chứa artifact_path
file không được attach hoặc mount
không có retrieval/tool log
```

Trong trường hợp đó:

```text
artifact_access_granted = false
retrieved_row_count = prompt_embedded_row_count
```

Record phải fail evidence validation và không được chấm như full-evidence V2.

## 7. Retrieval protocol cho result lớn

### 7.1. Canonical serialization

- Giữ nguyên raw values và nulls.
- Giữ thứ tự column và row ổn định.
- Không silently normalize status, identifier hoặc metric.
- Multi-dataset result phải lưu từng dataset component riêng và có manifest cấp
  record liên kết các component.
- Hash được tính sau canonical serialization.

### 7.2. Chunking

Chunking phải deterministic dựa trên token budget và row boundary.

Mỗi chunk cần:

```text
chunk_id
dataset_label
row_start_inclusive
row_end_inclusive
row_count
serialized_token_count
chunk_sha256
previous_chunk_id
next_chunk_id
```

Không cắt một row làm hai phần trừ khi row chứa nested payload quá lớn; nếu buộc
phải cắt, manifest phải ghi sub-row path.

### 7.3. Retrieval coverage

V2 phải phân biệt:

```text
full_access_available
deterministic_scan_scope
deterministic_scan_row_count_by_dataset
full_result_sent_to_llm
```

`full_access_available = true` không tự động làm
`full_result_sent_to_llm = true`.

`full_access_available = true` chỉ khi mọi phần tử trong
`full_query_artifacts` đều có `access_granted = true` và đã vượt qua kiểm tra
read/hash/count. Nếu chỉ một dataset component không truy cập được, giá trị phải
là `false`.

Judge có thể retrieval các chunk cần thiết để chấm semantic quality. Song song,
deterministic checker quét toàn bộ rows cho các claim type hỗ trợ.

Với large result, các điều kiện sau có thể đồng thời đúng:

```text
retrieval_coverage_status = partial
retrieved_row_count < full_result_row_count
deterministic_scan_scope = full_result_for_supported_claim_types
full_result_sent_to_llm = false
scoring_status = scored
```

Đây là record hợp lệ nếu:

- mọi phần tử trong `full_query_artifacts` đều có `access_granted = true`;
- `retrieval_request_complete = true`;
- retrieved chunks đủ để judge đánh giá các semantic claims trong rationale;
- deterministic checker scan full result cho các supported claim types;
- unsupported semantic claims được liệt kê trong `unchecked_claim_types`;
- retrieval logs và judge citations đầy đủ.

Vì vậy, `retrieved_row_count < full_result_row_count` không phải automatic
failure. Failure chỉ xảy ra khi retrieval không đủ cho claim đang được chấm,
artifact không thể truy cập, hoặc audit evidence bị thiếu.

### 7.4. Evidence citations

Judge output nên dẫn:

```text
artifact_id
chunk_id
row_range
columns
claim_id
```

Citation chứng minh evidence nào được dùng cho rationale; nó không được diễn
giải thành bằng chứng rằng LLM chú ý tới mọi row khác.

## 8. Deterministic checker

Deterministic checker được giữ như một lớp bổ sung bắt buộc cho claim type có
thể kiểm tra bằng code. Nó không thay thế LLM Judge và cũng không thay thế full
artifact access.

Checker nên xử lý:

- exact numeric values;
- sum, average, ratio và percentage;
- min, max và ranking;
- threshold comparison;
- row/entity/group coverage;
- missing-value assertions;
- trend direction khi đã định nghĩa ordering;
- pairwise và cross-row relationship;
- cross-dataset consistency khi task thật sự dùng nhiều dataset components.

LLM Judge xử lý:

- semantic faithfulness;
- completeness theo task;
- task relevance;
- clarity;
- actionability;
- unsupported causal interpretation;
- fairness/safety theo context.

Mỗi check result phải ghi:

```text
claim_id
claim_type
checker_status
supporting_row_ranges
computed_value
explanation_value
tolerance
result
limitations
```

Unsupported claim type phải nằm trong `unchecked_claim_types`; không được coi
`not checked` là `passed`.

## 9. Multi-dataset và cross-row relationships

Với result gồm nhiều dataset labels:

- lưu artifact riêng cho từng component;
- tạo một record-level manifest chứa role của từng component;
- giữ identifier/join key cần thiết để kiểm tra quan hệ;
- không cộng `row_count` rồi làm mất component boundary;
- retrieval log phải ghi dataset label cho từng chunk.

Với cross-row relationship:

- retrieval không được chỉ trả từng row rời nếu claim phụ thuộc ordering,
  ranking, cohort hoặc trước/sau;
- deterministic checker phải dùng full component hoặc full relevant partition;
- judge phải nhận relationship summary kèm supporting row ranges;
- nếu relationship vượt nhiều chunks, log phải ghi đầy đủ tất cả chunks tham
  gia.

## 10. Trả lời câu hỏi kiểm chứng row 1.845

Nếu hội đồng hỏi:

> Với task có 2.000 rows, hãy chứng minh judge đã thấy row thứ 1.845.

Không trả lời rằng artifact tồn tại nên judge đã thấy row đó.

Câu trả lời đúng phạm vi là:

> The complete result was stored as a hashed artifact and made available through
> the frozen retrieval mechanism. Row 1,845 is mapped to a specific chunk in the
> chunk manifest. The retrieval log shows whether that chunk was delivered into
> the model context, while deterministic check logs show whether the row was
> included in a full-result scan. We do not claim that the model internally
> attended to every available row.

Evidence cần xuất trình:

```text
full artifact + SHA-256
chunk manifest chứa row 1845
access validation
retrieval log của chunk tương ứng
deterministic check log nếu claim liên quan được scan
judge citation nếu rationale sử dụng row đó
```

## 11. Judge input fields cần đưa vào Phase 2b

```text
full_result_row_count
full_query_artifacts
evidence_access_mode
small_result_row_threshold
direct_embedding_token_budget
prompt_embedded_row_count
retrieved_row_count
retrieved_row_count_by_dataset
retrieved_row_ranges
retrieved_chunk_ids
retrieval_log_path
retrieval_request_complete
retrieval_coverage_status
full_access_available
deterministic_scan_scope
deterministic_scan_row_count_by_dataset
full_result_sent_to_llm
deterministic_checks
checked_claim_types
unchecked_claim_types
judge_evidence_citations
```

Không dùng `judge_accessible_row_count` như field duy nhất vì field này nhập
nhằng giữa availability và delivery.

## 12. Validation và fail-closed rules

Record không được chấm như Full-Evidence Judge V2 nếu:

- bất kỳ `full_query_artifacts[].artifact_path` nào không đọc được;
- bất kỳ artifact hash nào không khớp;
- artifact row count hoặc tổng `full_result_row_count` không khớp;
- direct embedding bị truncate;
- retrieval manifest có gap không được giải thích;
- retrieval log bị thiếu;
- retrieval request chưa hoàn tất theo protocol;
- retrieved evidence không đủ cho semantic claim đang được chấm;
- prompt chỉ chứa path nhưng environment không có file;
- report tuyên bố full rows trong khi chỉ có structured evidence;
- checker failure bị đổi thành pass hoặc bị bỏ qua.

Không fail chỉ vì `retrieval_coverage_status = partial` hoặc
`retrieved_row_count < full_result_row_count`, nếu các điều kiện partial
retrieval hợp lệ tại mục 7.3 được đáp ứng.

Các record này phải có:

```text
scoring_status = invalid
invalid_reason = full_evidence_access_validation_failed
```

Không fallback âm thầm về preview-only judging.

## 13. Artifacts dự kiến cho Phase 6

```text
full_query_results/
  <record_id>/
    artifact_manifest.json
    <dataset_label>.full_query_result.json
    chunk_manifest.json
    chunks/

retrieval_logs/
  <record_id>.retrieval.jsonl

deterministic_checks/
  <record_id>.checks.json

judge_inputs/
  <record_id>.judge_input.json

judge_outputs/
  <record_id>.judge_output.json
```

Tên root cuối cùng sẽ được freeze trong Phase 6 runner contract. Cấu trúc trên
là contract logic, không cho phép runner bỏ provenance, retrieval log hoặc
deterministic check result.

## 14. Definition of Done cho implementation D2

- Phase 2b schema biểu diễn riêng availability, delivery và verification.
- Prompt hướng dẫn judge dùng retrieval/citations và không overclaim coverage.
- Runner tạo full artifact, hash và chunk manifest.
- Runner validate quyền đọc artifact trước khi gọi judge.
- Retrieval log chứng minh chunks/ranges nào vào model context.
- Deterministic checker scan full result cho claim types đã hỗ trợ.
- Pilot có ít nhất một case `<=20` direct embedding và hai case `>20`
  deterministic retrieval.
- Pilot chứng minh fail-closed khi chỉ có artifact path nhưng file không được
  cấp.
- Methodology report dùng wording canonical trong tài liệu này.

## 15. Quyết định cuối cùng

Decision D2 được chốt theo phương án:

```text
D2-D revised:
verifiable full-evidence access in every scoreable evaluation record
+ direct full embedding for small results when within token budget
+ deterministic artifact retrieval for large results
+ deterministic full-result checks for supported claim types
+ explicit logs and provenance
+ no claim that access proves model attention
```

Tài liệu này là source of truth cho D2. Nếu implementation không thể tạo
retrieval log hoặc không thể cấp artifact thật sự cho evaluation environment,
record đó không đủ điều kiện được gọi là Full-Evidence LLM Judge V2.
