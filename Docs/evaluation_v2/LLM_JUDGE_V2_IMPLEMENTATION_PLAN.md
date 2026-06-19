# LLM Judge V2 Implementation Plan

## 1. Mục tiêu

Thiết kế lại AI Explanation Evaluation theo hướng:

```text
task metadata
+ schema context
+ full-query evidence
+ AI explanation
+ rubric 1-10 được cố định
+ artifacts có thể kiểm tra và chạy lại
```

Tên phương pháp:

```text
AI Explanation Evaluation V2:
Full-Evidence LLM-as-a-Judge Evaluation
```

V1 được giữ làm baseline lịch sử, không được dùng làm kết luận cuối cùng của V2.

## 2. Phạm vi cố định

- Datasets:
  - `SAMPLE_UCI_POR`
  - `SAMPLE_OULAD`
- Task scope: 52 task cho mỗi dataset.
- Hai phương pháp tạo explanation:
  - `baseline_first_20_rows`
  - `task_aware_data_summarization`
- Tổng số record theo mode dự kiến: `52 x 2 x 2 = 208`.
- Không thêm external summary mode thứ ba.

## 3. Cấu trúc artifacts hiện tại

```text
Docs/evaluation_v1/
  ai_explanation_full_matrix/     # V1 baseline và scoring artifacts cũ

Docs/evaluation_v2/
  LLM_JUDGE_V2_IMPLEMENTATION_PLAN.md
  LLM_JUDGE_V2_PRE_PHASE5_DECISIONS.md
  LLM_JUDGE_V2_D1_DATASET_SEPARATED_EVALUATION_DECISION.md
  LLM_JUDGE_V2_D2_FULL_EVIDENCE_ACCESS_DECISION.md

  UpdateBerforeLLMv2/             # Nâng cấp task-aware summarization trước V2
  Input_AI/                       # Contract và schema cho judge input V2
  PromptEvaluateAI/               # Prompt canonical cho LLM Judge V2
  Handle20rows/                   # Phase 3-4 đã hoàn thành; không thêm/bớt từ đây
```

## 4. Trạng thái thực hiện

| Phase | Nội dung | Trạng thái | Artifact chính |
|---|---|---|---|
| 0 | Freeze kết quả V1 | Hoàn thành | `Docs/evaluation_v1/ai_explanation_full_matrix/` |
| 1 | Audit pipeline V1 | Hoàn thành | `UpdateBerforeLLMv2/current_pipeline_audit.md` |
| 2a | Freeze minimal contract | Hoàn thành | `Input_AI/phase2a_minimal_contract.md` |
| 2b | Thiết kế full judge input V2 | Hoàn thành và đã review sạch cho pilot | Input schema/example, input docs và output contracts đã tồn tại |
| 3 | Thống kê row count | Hoàn thành | `Handle20rows/outputs/row_count_distribution.*` |
| 4 | Small-result full-row rule | Hoàn thành | `Handle20rows/phase4_completion_report.md` |
| 5 | Judge prompt V2 và rubric 1-10 | Pilot contract đã hash-freeze | Prompt, rubric, anchors, schemas và task requirements đã có SHA-256 manifest |
| 6 | Runner tạo judge input/output | Phase 6.1-6.4b đã PASS | Contract preflight, evidence, explanations, judge inputs và final judge contexts đã validate |
| 7 | Pilot 8-12 cases | Case/run manifest đã tạo; pilot judge invocation được mở sau Phase 6.4b | 12 cases, 24 expected judge records |
| 8 | Full evaluation V2 | Chưa thực hiện | Chưa có scoring artifacts V2 |
| 9 | Comparison và methodology | Chưa thực hiện | Chưa có reports V2 |

## 5. Kết quả Phase 3 đã cố định

Grain phân tích chính là `dataset_id + task_id`.

Phân biệt grain:

- analysis/comparison grain:
  `dataset_id + task_id` = 104 task pairs across both datasets;
- absolute judging record grain:
  `dataset_id + task_id + explanation_mode` = 208 mode-level records;
- run grain:
  `dataset_id` = 2 independent dataset runs, mỗi run có 104 absolute records.

| Dataset | Tổng task | `row_count <= 20` | `row_count > 20` | Not scoreable |
|---|---:|---:|---:|---:|
| `SAMPLE_UCI_POR` | 52 | 46 | 6 | 0 |
| `SAMPLE_OULAD` | 52 | 39 | 13 | 0 |
| Tổng | 104 | 85 | 19 | 0 |

Diễn giải bắt buộc:

- Với `row_count <= 20`, baseline đã có full raw-row coverage.
- Với `row_count > 20`, baseline có thể mất evidence do giới hạn 20 rows.
- Comparison V2 phải báo cáo riêng hai bucket này.

## 6. Phase 0 - Freeze V1

### Definition of Done

- V1 được giữ nguyên dưới `Docs/evaluation_v1/`.
- Không ghi đè judge inputs, judge outputs hoặc scoring records cũ.
- Báo cáo V2 giải thích rõ vì sao V1 chỉ là baseline lịch sử.

## 7. Phase 1 - Audit pipeline hiện tại

### Kết quả đã xác định

- Judge V1 không nhìn thấy full query result.
- Evidence preview thường chỉ có tối đa 5 rows cho mỗi dataset label.
- Judge input thiếu schema context đầy đủ.
- Prompt nằm trong source code thay vì một artifact độc lập.
- Rubric dùng thang 1-5.
- Comparison V1 aggregate hai absolute scores thay vì paired judging trực tiếp.

### Artifact

`Docs/evaluation_v2/UpdateBerforeLLMv2/current_pipeline_audit.md`

## 8. Phase 2 - Thiết kế Judge Input V2

### Trạng thái hiện tại

Đã tạo và review sạch cho pilot:

```text
Docs/evaluation_v2/Input_AI/judge_input_schema.md
Docs/evaluation_v2/Input_AI/judge_input_example.json
Docs/evaluation_v2/Input_AI/judge_input_schema.json
```

Judge input contract hiện đã bao phủ:

- evaluation, prompt và rubric version;
- dataset, class, student, role, task và mode;
- task metadata;
- schema context;
- full-query evidence theo D2: direct embedding hoặc deterministic artifact retrieval;
- explanation-generation metadata;
- raw và structured AI explanation;
- metadata tách riêng evidence availability, retrieval/delivery và verification;
- `full_query_artifacts[]`, artifact hashes, chunk manifest, retrieval log và
  deterministic scan scope;
- evaluation requirements.

Full schema chỉ được freeze sau khi các quyết định trong
`LLM_JUDGE_V2_PRE_PHASE5_DECISIONS.md` được chốt.

Ghi chú implementation: khi materialize task requirements vào judge input,
runner chỉ được giữ `requirement_id`, `constraint_id` và `description`; phải
strip các field provenance-only như `source_field`, `review_status` và
`review_note`.

## 9. Phase 3 - Row-count Distribution

### Trạng thái

Hoàn thành.

### Artifacts

```text
Docs/evaluation_v2/Handle20rows/outputs/row_count_records.jsonl
Docs/evaluation_v2/Handle20rows/outputs/row_count_distribution.json
Docs/evaluation_v2/Handle20rows/outputs/row_count_distribution.md
```

## 10. Phase 4 - Small-result Rule

### Rule đã implement

```text
Nếu full_result_row_count <= 20:
  task-aware phải đưa toàn bộ rows vào evidence payload.
Nếu full_result_row_count > 20:
  giữ task-aware summarizer tương ứng với aiSummaryType.
```

### Trạng thái xác minh

- Boundary verification: `6/6 PASS`.
- Real-task runtime verification: `4/4 PASS`.

### Artifact

`Docs/evaluation_v2/Handle20rows/phase4_completion_report.md`

## 11. Gates bắt buộc

### Implementation gate cho Phase 2b/5/6

- D1 = `DECIDED`.
- D2 = `DECIDED`.
- D3 = `SCHEMA_FROZEN_PRE_PILOT`.
- D4 = `APPROVED_FOR_PILOT_IMPLEMENTATION`.

Gate này cho phép implement contract và pilot package, không cho phép official
full evaluation.

### Pilot gate

- judge input schema/example tồn tại;
- direct judge response schema tồn tại;
- final scoring record schema tồn tại;
- execution attempt wrapper schema tồn tại;
- metric anchor spec tồn tại;
- task-level core/supporting requirements và safety applicability tồn tại;
- task-level evaluation constraints và safety/fairness notes được materialize
  vào frozen judge input;
- pilot prompt/rubric và pilot manifest đã freeze;
- contract artifacts đã validate, được theo dõi trong Git và có SHA-256.

### Official-run gate

- D3 đã calibrated và version chính thức đã freeze;
- D4 = `DECIDED_FOR_OFFICIAL_RUN`;
- pilot decision artifact và invalid/missing-rate guard đã freeze;
- session strategy đã freeze;
- prompt, rubric, anchors, schemas, manifests và code thực thi đã commit;
- run metadata ghi repository commit SHA nếu quan sát được.

Decision log:

`Docs/evaluation_v2/LLM_JUDGE_V2_PRE_PHASE5_DECISIONS.md`

## 12. Phase 5 - Judge Prompt V2 và Rubric

### Outputs dự kiến

```text
Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md
Docs/evaluation_v2/Rubric/JUDGE_RUBRIC_1_TO_10.md
Docs/evaluation_v2/Rubric/LLM_JUDGE_V2_METRIC_ANCHOR_SPEC.md
Docs/evaluation_v2/Rubric/task_evaluation_requirements.json
```

`Handle20rows/` is frozen. Prompt, rubric, anchors và task requirements phải nằm
ngoài folder này.

Prompt phải yêu cầu:

- xác định và kiểm tra từng claim;
- kiểm tra số liệu, ranking, trend, threshold và group comparison;
- dùng đúng evidence access mode đã khai báo;
- dẫn artifact/chunk/row-range cho evidence được dùng trong rationale;
- không suy diễn artifact availability thành bằng chứng model đã đọc mọi row;
- phát hiện hallucination và unsupported causality;
- đánh giá task relevance, completeness, clarity và actionability;
- trả output JSON theo schema cố định.

### Trạng thái hiện tại

- Rubric pilot đã tồn tại.
- Metric anchor spec đã tồn tại và chờ calibration.
- Task requirements: `52/52 approved_for_pilot`.
- Direct judge response schema đã tồn tại.
- Judge Prompt V2 đã được review sạch cho pilot:
  - `claim_scope` đã anchor vào `required_core_outputs` /
    `required_supporting_outputs`;
  - evidence mode enum đã dùng đúng `direct_embedding` và
    `deterministic_artifact_retrieval`;
  - `retrieval_log_path` đã được gọi tên explicit;
  - forbidden fields, 7 metrics và self-check vẫn nguyên vẹn.
- `judge_input_example.json` đã cập nhật đủ `S-B01-CONSTRAINT-01` và
  `S-B01-CONSTRAINT-02`, không chứa `source_field`, `review_status` hoặc
  `review_note`.
- Phase 5 hiện sẵn sàng hash-freeze. Chưa dùng prompt để chạy pilot cho đến
  khi version/hash được ghi trong pilot manifest.
- Pilot contract manifest đã được tạo:
  `Docs/evaluation_v2/Runs/pilot_contract_manifest_v1.json`.
  Manifest hiện hash-freeze 17 artifact và đã pass local hash check.
  Pilot case/run manifest vẫn cần tạo riêng trước khi chạy pilot.

## 13. Phase 6 - Runner V2

Runner phải:

1. Kiểm tra task availability.
2. Chạy analytics query.
3. Thu full-query evidence và row count.
4. Canonicalize, hash và lưu `full_query_artifacts[]` theo dataset label.
5. Chọn direct embedding hoặc tạo deterministic chunk/retrieval manifest.
6. Thu task metadata và schema context.
7. Tạo explanation cho đúng hai mode.
8. Resolve và materialize vào judge input:
   `required_core_outputs`, `required_supporting_outputs`,
   `evaluation_constraints`, `safety_fairness_applicability` và
   `safety_fairness_note`.
   Chỉ copy fields được judge-input schema cho phép; strip provenance-only
   metadata như `source_field`, `review_status` và `review_note`.
9. Chạy deterministic checks cho claim types hỗ trợ trên full result.
10. Build và lưu judge input.
11. Validate access cho từng artifact trước khi gọi judge.
12. Gọi judge qua workflow có retrieval log.
13. Validate judge output và evidence citations.
14. Lưu failures và scoring records.
15. Aggregate theo dataset, mode và row-count bucket.

Machine-readable contracts:

```text
Input_AI/judge_input_schema.json
LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json
LLM_JUDGE_V2_EXECUTION_ATTEMPT_WRAPPER_SCHEMA_V1.json
LLM_JUDGE_V2_RECORD_EXECUTION_STATUS_SCHEMA_V1.json
LLM_JUDGE_V2_D3_OUTPUT_SCHEMA_V1.json
```

Runner không được sửa score thủ công hoặc silently normalize trạng thái.
Runner phải fail closed nếu chỉ có artifact path nhưng evaluation environment
không đọc được artifact, nếu hash/count không khớp hoặc nếu retrieval log bị
thiếu.

### Trạng thái hiện tại

Phase 6.1-6.2 đã được implement và chạy thành công:

```text
Docs/evaluation_v2/Runs/scripts/runLlmJudgeV2PilotPreflight.mjs
Docs/evaluation_v2/Runs/phase6_preflight/planned_records.jsonl
Docs/evaluation_v2/Runs/phase6_preflight/phase6_preflight_report.json
Docs/evaluation_v2/Runs/phase6_preflight/phase6_preflight_report.md
```

Kết quả preflight mới nhất:

```text
status = PASS
primary_cases = 12
expanded_planned_records = 24
errors = 0
warnings = 0
phase6_3_evidence_builder_allowed = true
judge_invocation_allowed = false
```

Phạm vi đã hoàn thành:

- verify linked pilot contract manifest và SHA-256 của 17 artifact;
- verify pilot case manifest;
- verify task ids tồn tại trong `taskRegistry.json`;
- verify task ids tồn tại và đã `approved_for_pilot` trong
  `task_evaluation_requirements.json`;
- verify row count, bucket, role và student id với Phase 3 row-count artifact;
- expand 12 pilot cases thành 24 planned records.

Phase 6.3 evidence builder cũng đã được implement và chạy thành công:

```text
Docs/evaluation_v2/Runs/scripts/runLlmJudgeV2EvidenceBuilder.mjs
Docs/evaluation_v2/Runs/phase6_evidence/evidence_manifest.jsonl
Docs/evaluation_v2/Runs/phase6_evidence/full_query_artifacts/
Docs/evaluation_v2/Runs/phase6_evidence/phase6_evidence_report.json
Docs/evaluation_v2/Runs/phase6_evidence/phase6_evidence_report.md
```

Kết quả evidence builder mới nhất:

```text
status = PASS
planned_records = 24
evidence_ready_records = 24
failed_records = 0
errors = 0
warnings = 0
phase6_4_judge_input_materializer_allowed = true
judge_invocation_allowed = false
```

Phase 6.3b explanation builder đã được implement và chạy thành công cho cả hai
mode:

```text
Docs/evaluation_v2/Runs/scripts/runLlmJudgeV2ExplanationBuilder.mjs
Docs/evaluation_v2/Runs/phase6_explanations_baseline/
Docs/evaluation_v2/Runs/phase6_explanations_task_aware/
```

Kết quả:

```text
baseline_first_20_rows = 12/12 explanation_ready
task_aware_data_summarization = 12/12 explanation_ready
errors = 0
warnings = 0
```

Phase 6.4 judge input materializer/schema validator đã được implement và chạy
thành công:

```text
Docs/evaluation_v2/Runs/scripts/materializeLlmJudgeV2JudgeInputs.mjs
Docs/evaluation_v2/Runs/phase6_judge_inputs/judge_input_manifest.jsonl
Docs/evaluation_v2/Runs/phase6_judge_inputs/judge_inputs/
Docs/evaluation_v2/Runs/phase6_judge_inputs/retrieval_logs/
Docs/evaluation_v2/Runs/phase6_judge_inputs/phase6_judge_input_validation_report.json
Docs/evaluation_v2/Runs/phase6_judge_inputs/phase6_judge_input_validation_report.md
```

Kết quả:

```text
status = PASS
judge_input_ready_records = 24
failed_records = 0
errors = 0
warnings = 0
direct_embedding = 12
deterministic_artifact_retrieval = 12
judge_input_review_allowed = true
judge_invocation_allowed = false
```

Phase 6.4b judge context validation đã được implement và chạy thành công:

```text
Docs/evaluation_v2/Runs/scripts/buildLlmJudgeV2JudgeContexts.mjs
Docs/evaluation_v2/Runs/phase6_judge_contexts/final_contexts/
Docs/evaluation_v2/Runs/phase6_judge_contexts/judge_context_manifest.jsonl
Docs/evaluation_v2/Runs/phase6_judge_contexts/phase6_judge_context_validation_report.json
Docs/evaluation_v2/Runs/phase6_judge_contexts/phase6_judge_context_validation_report.md
```

Kết quả:

```text
status = PASS
judge_context_ready_records = 24
failed_records = 0
errors = 0
warnings = 0
direct_embedding = 12
deterministic_artifact_retrieval = 12
judge_context_validation_status = PASS
pilot_judge_invocation_allowed = true
official_full_evaluation_allowed = false
```

Ý nghĩa gate:

- `judge_input.json` là intermediate contract/config, không phải bằng chứng cuối cùng
  rằng Codex đã thấy full evidence;
- `final_contexts/*.md` là artifact record-level chứng minh evidence đã được
  materialize vào final judge context trước Phase 6.5;
- với `direct_embedding`, final context embed toàn bộ rows và validate row count/hash;
- với `deterministic_artifact_retrieval`, final context ghi retrieval log, chunk ids,
  row ranges, artifact hash và retrieved evidence;
- manifest ghi token accounting ước lượng bằng phương pháp
  `heuristic_chars_div_4_ceiling` để hỗ trợ discussion về context window và
  direct embedding vs retrieval.

Phase 6.5 pilot judge invocation/output validation runner đã được implement và
chuẩn bị prompt queue:

```text
Docs/evaluation_v2/Runs/scripts/runLlmJudgeV2PilotJudgeInvocation.mjs
Docs/evaluation_v2/Runs/phase6_judge_invocation/prompt_queue/
Docs/evaluation_v2/Runs/phase6_judge_invocation/raw_outputs/
Docs/evaluation_v2/Runs/phase6_judge_invocation/pilot_judge_invocation_manifest.jsonl
Docs/evaluation_v2/Runs/phase6_judge_invocation/pilot_judge_attempt_manifest.jsonl
Docs/evaluation_v2/Runs/phase6_judge_invocation/pilot_judge_record_status_manifest.jsonl
Docs/evaluation_v2/Runs/phase6_judge_invocation/phase6_pilot_judge_invocation_report.json
Docs/evaluation_v2/Runs/phase6_judge_invocation/phase6_pilot_judge_invocation_report.md
```

Kết quả hiện tại:

```text
status = WAITING_FOR_RAW_OUTPUTS
prompt_queue_records = 24
raw_received_records = 0
valid_records = 0
missing_records = 24
errors = 0
warnings = 24
prompt_queue_ready = true
actual_judge_invocation_completed = false
pilot_output_validation_passed = false
phase6_6_scoring_allowed = false
official_full_evaluation_allowed = false
```

Ý nghĩa gate:

- Phase 6.5 runner/importer/validator đã sẵn sàng;
- 24 prompt packets đã được tạo từ final judge contexts;
- chưa có raw Codex/LLM judge responses nên chưa thể nói actual judge invocation
  đã hoàn tất;
- raw outputs phải được lưu vào `phase6_judge_invocation/raw_outputs/` theo
  `expected_raw_output_path` trong invocation manifest;
- sau khi có raw outputs, chạy lại script với `--mode import` để validate schema,
  tạo execution attempt wrappers và cập nhật record statuses;
- chỉ khi `pilot_output_validation_passed = true` mới được mở Phase 6.6.

Phase 6.6 scoring finalizer/aggregate smoke test đã được implement và chạy thử
trên 2 valid judge responses thật, bao phủ cả nhánh direct embedding nhỏ và
deterministic retrieval lớn:

```text
Docs/evaluation_v2/Runs/scripts/finalizeLlmJudgeV2PilotScoring.mjs
Docs/evaluation_v2/Runs/phase6_scoring_smoke/final_scoring_records/
Docs/evaluation_v2/Runs/phase6_scoring_smoke/pilot_scoring_smoke_manifest.jsonl
Docs/evaluation_v2/Runs/phase6_scoring_smoke/phase6_scoring_smoke_report.json
Docs/evaluation_v2/Runs/phase6_scoring_smoke/phase6_scoring_smoke_report.md
```

Kết quả smoke:

```text
status = SMOKE_PASS
expected_records = 24
valid_source_records = 2
missing_source_records = 22
final_scoring_records = 2
scored_records = 2
errors = 0
S-T01 direct_embedding raw_weighted_score = 8.50
S-T01 direct_embedding final_score_after_caps = 8.50
S-T01 direct_embedding verdict = excellent
S-T09 deterministic_artifact_retrieval raw_weighted_score = 4.35
S-T09 deterministic_artifact_retrieval effective_cap = 4.00
S-T09 deterministic_artifact_retrieval final_score_after_caps = 4.00
S-T09 deterministic_artifact_retrieval verdict = poor
smoke_scoring_passed = true
full_pilot_scoring_passed = false
official_full_evaluation_allowed = false
```

Ý nghĩa gate:

- scoring formula, error summary, cap handling và verdict mapping đã chạy được
  trên hai direct judge responses thật;
- direct embedding nhánh nhỏ đã được xác minh bằng S-T01;
- deterministic retrieval nhánh lớn đã được xác minh bằng S-T09, bao gồm cap
  4.00 cho lỗi major factual/numerical/causal framing;
- đây chỉ là smoke test vì 22/24 pilot records còn thiếu raw judge outputs;
- full pilot scoring chỉ được coi là pass khi Phase 6.5 import có đủ valid
  outputs cho các pilot records được yêu cầu.

Ghi chú correction trong quá trình chạy:

- pilot case manifest ban đầu dùng `SAMPLE_OULAD_CLASS` cho OULAD;
- Phase 6.3 phát hiện runtime evidence không khớp;
- đã sửa OULAD pilot cases sang `SAMPLE_OULAD_CLASS_CCC_2014J`, đúng với
  Phase 3 row-count artifact;
- đã bổ sung preflight check `class_id_mismatch` để lỗi tương tự không lọt
  qua Phase 6.1-6.2 nữa.
- AIService mode được xác minh theo từng subset. Baseline và task-aware được
  chạy riêng để bảo đảm `observed_ai_summary_method` khớp `explanation_mode`.

Phần chưa làm trong Phase 6:

- Phase 6.5 actual raw Codex/LLM judge responses;
- Phase 6.6 full pilot scoring finalizer/aggregate cho đủ 24 records.

## 14. Phase 7 - Pilot

Chọn 8-12 records bao phủ:

- UCI và OULAD;
- `row_count <= 20` và `row_count > 20`;
- admin và student;
- trend, risk, comparison và degraded/unavailable case nếu có.

### Trạng thái hiện tại

Đã tạo pilot case/run manifest:

```text
Docs/evaluation_v2/Runs/pilot_case_run_manifest_v1.json
```

Manifest hiện chọn 12 primary cases và runner sẽ expand mỗi case sang 2 mode,
tương đương 24 expected judge records. Coverage hiện tại:

- `SAMPLE_UCI_POR`: 6 cases;
- `SAMPLE_OULAD`: 6 cases;
- `row_count <= 20`: 6 cases;
- `row_count > 20`: 6 cases;
- expected direct embedding path: 6 cases;
- expected deterministic artifact retrieval path: 6 cases;
- task families: trend, risk, comparison, correlation, ranking, synthesis và
  recommendation;
- có synthetic validation checks cho missing retrieval log và contract hash
  mismatch.

Manifest đã pass local check với Phase 3 row-count artifact. Pilot judge
invocation vẫn chưa được bật cho đến khi Phase 6 runner/importer/validator
preflight pass.

Do giới hạn thời gian, pilot execution hiện được rút gọn thành smoke validation
2 records thay vì chạy đủ 24 prompt pilot:

- `SAMPLE_UCI_POR__S-T01__baseline_first_20_rows`: direct embedding, 3 rows,
  final score 8.50, verdict `excellent`;
- `SAMPLE_UCI_POR__S-T09__baseline_first_20_rows`: deterministic artifact
  retrieval, 649 rows, raw score 4.35, effective cap 4.00, final score 4.00,
  verdict `poor`.

Diễn giải methodology bắt buộc:

- đây là smoke pilot đại diện để xác minh pipeline và hai nhánh D2;
- đây không phải full calibration pilot;
- không dùng hai record này để claim score distribution hoặc kết luận chất
  lượng tổng thể cho toàn bộ 52 tasks;
- full evaluation vẫn phải báo cáo giới hạn này nếu bỏ qua 22 pilot prompts còn
  lại.

Chỉ qua Phase 8 khi:

- input không thiếu field;
- output JSON hợp lệ;
- rationale dẫn evidence cụ thể;
- direct-embedding count/hash khớp với full artifact;
- large-result case có chunk manifest và retrieval log;
- large-result partial retrieval vẫn scoreable khi full artifact access,
  deterministic scan scope và semantic evidence đều hợp lệ;
- case chỉ có path nhưng không có quyền đọc bị từ chối;
- numerical checks hoạt động;
- retry policy hoạt động;
- reviewer có thể giải thích score.

## 15. Phase 8 - Full Evaluation

Full run dự kiến có 208 mode-level records.

Phải báo cáo:

- `expected_record_count`, `valid_record_count`, `terminal_invalid_count`,
  `excluded_count`, `missing_count` và `retry_count`;
- average score theo dataset và mode;
- average score theo `<=20` và `>20`;
- absolute quality;
- paired win/tie/loss nếu paired evaluation được chốt;
- failure và retry counts.

## 16. Phase 9 - Reports và Methodology

Outputs dự kiến:

```text
Docs/evaluation_v2/Reports/
  ai_explanation_evaluation_methodology_v2.md
  SAMPLE_UCI_POR_mode_comparison_v2.md
  SAMPLE_OULAD_mode_comparison_v2.md
  overall_ai_explanation_scoring_summary_v2.md
  row_count_distribution_report.md
```

The final report root is `Docs/evaluation_v2/Reports/`, outside the frozen
`Handle20rows/` folder.

Methodology phải giải thích:

- hạn chế của V1;
- evidence available, retrieved và deterministically verified;
- rubric và cách tính điểm;
- cách xử lý full-query result lớn;
- cách xử lý `<=20`, `>20`, unavailable và failed records;
- reproducibility và retry procedure;
- artifact paths và provenance.

## 17. Trạng thái và thứ tự tiếp theo

D1 và D2 đã `DECIDED`.
D3 đã `SCHEMA_FROZEN_PRE_PILOT`
(`SCHEMA FROZEN - PRE-PILOT SCORING POLICY`).
D4 đã `APPROVED FOR PILOT IMPLEMENTATION`, nhưng chưa
`DECIDED_FOR_OFFICIAL_RUN`.

Việc tiếp theo:

1. commit pilot contract package và ghi repository commit SHA;
2. review Phase 6.5 prompt queue và chọn cách chạy actual Codex/LLM judge;
3. lưu raw judge outputs vào `phase6_judge_invocation/raw_outputs/`;
4. chạy lại Phase 6.5 importer với `--mode import` cho đến khi
   `pilot_output_validation_passed = true`;
5. chạy lại Phase 6.6 scoring finalizer/aggregate cho toàn bộ valid pilot outputs;
6. chạy calibration pilot review;
7. chỉ sau pilot mới freeze D3/D4 cho official full evaluation.

Không chạy Phase 8 trước khi official-run gate pass.
