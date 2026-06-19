# LLM Judge V2 Full 208 Run Execution Plan

## 1. Mục tiêu

Tạo và chạy full evaluation package cho AI Explanation Evaluation V2 theo phạm vi:

```text
52 tasks x 2 datasets x 2 explanation modes = 208 judge records
```

Hai dataset:

- `SAMPLE_UCI_POR`
- `SAMPLE_OULAD`

Hai explanation mode:

- `baseline_first_20_rows`
- `task_aware_data_summarization`

Plan này mô tả luồng chạy full theo từng lát cắt an toàn, không chạy 208 record một lần ngay từ đầu:

```text
1. Chuẩn bị full manifest + planned records.
2. Chạy SQL/analytics evidence cho 52 tasks của UCI.
3. Chạy SQL/analytics evidence cho 52 tasks của OULAD.
4. Chạy AI explanation baseline cho UCI.
5. Chạy AI explanation baseline cho OULAD.
6. Đổi AIService sang task-aware.
7. Chạy AI explanation task-aware cho UCI.
8. Chạy AI explanation task-aware cho OULAD.
9. Materialize 208 judge inputs.
10. Build 208 final judge contexts.
11. Generate 208 judge prompt queue.
12. Import raw LLM Judge responses.
13. Finalize scoring + aggregate reports.
```

Mục tiêu phương pháp luận là chứng minh đầy đủ:

```text
Task scope
-> planned records
-> full-query evidence
-> AI explanation
-> judge input
-> final judge context
-> actual judge invocation output
-> validated score
```

## 2. Kết luận review plan hiện tại

Plan tổng thể trước đó là đúng hướng và phù hợp với yêu cầu chính của thầy:

- Judge phải có full-query evidence, không chỉ preview vài rows.
- Có phân biệt `direct_embedding` cho result nhỏ và `deterministic_artifact_retrieval` cho result lớn.
- Có artifact provenance bằng path, SHA-256, row count và manifest.
- Có final judge context để chứng minh evidence thật sự đi vào prompt mà LLM Judge đọc.
- Có importer/validator để không chấp nhận raw judge output sai schema.
- Có scoring finalizer áp weighted score, severity cap và verdict.

Tuy nhiên, để sẵn sàng thực hiện full run, cần chỉnh plan theo hướng execution-sliced:

1. Không nên chạy lẫn 208 records ngay từ đầu.
2. Evidence/SQL nên được kiểm soát theo dataset trước: UCI 52 tasks, sau đó OULAD 52 tasks.
3. Explanation nên chạy theo mode và dataset: baseline UCI, baseline OULAD, rồi đổi mode sang task-aware.
4. Full output phải nằm trong thư mục riêng, không ghi đè pilot/smoke.
5. Cần thêm hoặc chỉnh script để tạo full manifest, split planned records, và aggregate kết quả theo slice.

## 3. Output root cho full run

Tất cả artifact full run đặt dưới:

```text
Docs/evaluation_v2/Runs/full_208/
```

Không ghi đè các folder hiện có:

```text
Docs/evaluation_v2/Runs/phase6_preflight/
Docs/evaluation_v2/Runs/phase6_evidence/
Docs/evaluation_v2/Runs/phase6_explanations_baseline/
Docs/evaluation_v2/Runs/phase6_explanations_task_aware/
Docs/evaluation_v2/Runs/phase6_judge_inputs/
Docs/evaluation_v2/Runs/phase6_judge_contexts/
Docs/evaluation_v2/Runs/phase6_judge_invocation/
Docs/evaluation_v2/Runs/phase6_scoring_smoke/
```

## 4. Phase F0 - Readiness check trước full run

### Mục đích

Xác nhận contract, schema, prompt, rubric và pilot/smoke pipeline đủ điều kiện làm nền cho full run.

### Input cần kiểm tra

```text
Docs/evaluation_v2/Runs/pilot_contract_manifest_v1.json
Docs/evaluation_v2/Rubric/task_evaluation_requirements.json
Docs/evaluation_v2/Input_AI/judge_input_schema.json
Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md
Docs/evaluation_v2/Handle20rows/outputs/row_count_records.jsonl
Docs/evaluation_v2/Handle20rows/outputs/row_count_distribution.json
```

### Official UCI scoring runner

```powershell
node Docs/evaluation_v2/Runs/scripts/finalizeLlmJudgeV2Scoring.mjs --dataset SAMPLE_UCI_POR --expected-count 104
```

UCI dataset-scoped outputs:

```text
Docs/evaluation_v2/Runs/full_208/phase8_scoring/final_scoring_records/SAMPLE_UCI_POR__*.json
Docs/evaluation_v2/Runs/full_208/phase8_scoring/scoring_manifest__SAMPLE_UCI_POR.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_scoring/scoring_report__SAMPLE_UCI_POR.json
Docs/evaluation_v2/Runs/full_208/phase8_scoring/scoring_report__SAMPLE_UCI_POR.md
Docs/evaluation_v2/Runs/full_208/phase8_scoring/aggregates/*__SAMPLE_UCI_POR.json
Docs/evaluation_v2/Runs/full_208/phase8_scoring/aggregates/paired_mode_comparison__SAMPLE_UCI_POR.md
```

### Result - SAMPLE_UCI_POR official scoring - 2026-06-19

Status: PASS.

- Valid source records: 104/104.
- Final scoring records: 104/104.
- Scored records: 104.
- Invalid records: 0.
- Errors: 0.
- Average raw weighted score: 7.90.
- Average final score after caps: 7.70.
- Verdict counts: excellent 60, good 30, acceptable 13, poor 1.
- Highest error severity counts: none 89, minor 1, major 13, critical 1.
- Paired mode comparison: 52/52 comparable pairs.
- Average delta task-aware minus baseline: -0.06.
- Pair winners: tie 38, task-aware 8, baseline 6.

### Acceptance criteria

- Contract manifest hash vẫn khớp.
- Task requirements có 52 tasks approved.
- Row-count distribution có `expected_records = 208` và `actual_records = 208`.
- Full scope đúng:
  - UCI: 52 tasks, 104 mode-level records.
  - OULAD: 52 tasks, 104 mode-level records.
  - Total: 208 mode-level records.
- Smoke validation hiện có được ghi rõ là smoke, không phải full calibration pilot.

### Kết quả thực thi F0 - 2026-06-19

**Status: PASS**

- Runner tái lập: `Docs/evaluation_v2/Runs/scripts/runLlmJudgeV2FullReadinessCheck.mjs`.
- Báo cáo JSON: `Docs/evaluation_v2/Runs/full_208/phase8_readiness/full_208_readiness_report.json`.
- Báo cáo đọc nhanh: `Docs/evaluation_v2/Runs/full_208/phase8_readiness/full_208_readiness_report.md`.
- 17/17 contract và provenance artifact hash khớp manifest.
- 52/52 task requirements có `review_status = approved_for_pilot`.
- Row-count records được tái đếm độc lập: UCI 104, OULAD 104, tổng 208 record duy nhất ở grain `dataset_id + task_id + mode`.
- Kết quả scoring hiện có chỉ là smoke 2/24 pilot records; full calibration pilot chưa hoàn tất và chưa cho phép official full evaluation.
- Gate sau F0: được chuyển sang Phase F1 để dựng full manifest; chưa cho phép full judge invocation.

## 5. Phase F1 - Full case manifest, planned records và slice manifests

### Mục đích

Chốt danh sách chính thức sẽ chạy full và chia thành các slice dễ kiểm soát.

### Script cần thêm

```text
Docs/evaluation_v2/Runs/scripts/buildLlmJudgeV2FullCaseManifest.mjs
Docs/evaluation_v2/Runs/scripts/splitLlmJudgeV2FullPlannedRecords.mjs
```

### Output cần tạo

```text
Docs/evaluation_v2/Runs/full_208/full_case_run_manifest_v1.json
Docs/evaluation_v2/Runs/full_208/phase8_preflight_full/planned_records.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_preflight_full/phase8_preflight_full_report.json
Docs/evaluation_v2/Runs/full_208/phase8_preflight_full/phase8_preflight_full_report.md
```

Slice planned records:

```text
Docs/evaluation_v2/Runs/full_208/slices/planned_records__SAMPLE_UCI_POR__all_modes.jsonl
Docs/evaluation_v2/Runs/full_208/slices/planned_records__SAMPLE_OULAD__all_modes.jsonl

Docs/evaluation_v2/Runs/full_208/slices/planned_records__SAMPLE_UCI_POR__baseline_first_20_rows.jsonl
Docs/evaluation_v2/Runs/full_208/slices/planned_records__SAMPLE_OULAD__baseline_first_20_rows.jsonl
Docs/evaluation_v2/Runs/full_208/slices/planned_records__SAMPLE_UCI_POR__task_aware_data_summarization.jsonl
Docs/evaluation_v2/Runs/full_208/slices/planned_records__SAMPLE_OULAD__task_aware_data_summarization.jsonl
```

### Expected counts

```text
full_case_run_manifest_v1.json:
  primary_cases = 104
  expected_judge_records = 208

planned_records.jsonl:
  records = 208

planned_records__SAMPLE_UCI_POR__all_modes.jsonl:
  records = 104

planned_records__SAMPLE_OULAD__all_modes.jsonl:
  records = 104

each dataset + mode slice:
  records = 52
```

### Acceptance criteria

- Không thiếu task.
- Không duplicate `record_id`.
- Mỗi `record_id` có format:

```text
dataset_id__task_id__explanation_mode
```

- `row_count` và `row_count_bucket` khớp Phase 3.
- `expected_evidence_access_path` khớp rule:

```text
row_count <= 20 -> direct_embedding
row_count > 20  -> deterministic_artifact_retrieval
```

### Kết quả thực thi F1 - 2026-06-19

**Status: PASS**

- F1 được chạy một lần bằng `Docs/evaluation_v2/Runs/scripts/buildLlmJudgeV2FullCaseManifest.mjs`; entrypoint này tự gọi splitter để tạo toàn bộ slice.
- Full manifest có 104 primary cases và 208 expected judge records.
- Planned records có 208/208 `record_id` duy nhất, đúng format `dataset_id__task_id__explanation_mode`.
- Mỗi dataset phủ đúng 52/52 task requirements, không thiếu và không thừa task.
- 208/208 `row_count` và `row_count_bucket` khớp trực tiếp Phase 3.
- 208/208 `expected_evidence_access_path` khớp rule ngưỡng 20 rows.
- Hai all-mode slice có 104 records/slice; bốn dataset-mode slice có 52 records/slice.
- Splitter được tái chạy độc lập và không làm thay đổi SHA-256 của bất kỳ slice nào.
- Gate sau F1: được chuyển sang Phase F2 theo từng dataset slice; chưa cho phép full judge invocation.

## 6. Phase F2 - SQL/analytics evidence cho từng dataset

### Mục đích

Chạy hệ thống thật để lấy full-query evidence cho toàn bộ 52 tasks của từng dataset.

Đây là bước tương ứng với cách bạn muốn làm:

```text
Chạy SQL cho 52 tasks dataset UCI trước.
Sau đó chạy SQL cho 52 tasks dataset OULAD.
```

### Lưu ý kỹ thuật quan trọng

Script hiện tại `runLlmJudgeV2EvidenceBuilder.mjs` chạy theo `planned_records`, tức là record-level có cả `explanation_mode`.

Để tránh chạy duplicate SQL hai lần cho cùng `dataset_id + task_id`, full run nên dùng một trong hai hướng:

```text
Preferred:
  Evidence chạy ở grain dataset_id + task_id = 104 evidence artifacts.
  Sau đó expand/link evidence sang 208 mode-level records.

Fallback nhanh:
  Evidence chạy ở grain dataset_id + task_id + explanation_mode = 208 artifacts.
  Cách này dễ dùng script hiện tại hơn nhưng chạy analytics lặp lại giữa hai mode.
```

Khuyến nghị cho full run: dùng preferred path nếu có thời gian chỉnh script, vì nó sạch hơn và đúng bản chất evidence không phụ thuộc explanation mode.

### Script cần thêm/chỉnh

Nếu dùng preferred path:

```text
Docs/evaluation_v2/Runs/scripts/runLlmJudgeV2DatasetEvidenceBuilder.mjs
Docs/evaluation_v2/Runs/scripts/expandLlmJudgeV2EvidenceManifestToModes.mjs
```

Nếu dùng fallback nhanh:

```text
Reuse Docs/evaluation_v2/Runs/scripts/runLlmJudgeV2EvidenceBuilder.mjs
```

nhưng chạy theo từng dataset slice.

### Output cần tạo

UCI evidence:

```text
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/evidence_manifest.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/*.json
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/evidence_report.json
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/evidence_report.md
```

OULAD evidence:

```text
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/evidence_manifest.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/*.json
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/evidence_report.json
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/evidence_report.md
```

Aggregate evidence:

```text
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/evidence_manifest_104_dataset_task.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/evidence_manifest_208_mode_records.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/evidence_aggregate_report.json
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/evidence_aggregate_report.md
```

### Acceptance criteria

- UCI evidence: 52/52 task-level evidence ready.
- OULAD evidence: 52/52 task-level evidence ready.
- Aggregate task-level evidence: 104/104 ready.
- Expanded mode-level evidence: 208/208 ready.
- Runtime row counts match Phase 3.
- Full-query artifact hash exists for every evidence artifact.
- Large-result tasks have retrieval path planned.
- No empty dataset arrays unless explicitly terminal invalid.

### Kết quả thực thi F2 - SAMPLE_UCI_POR - 2026-06-19

**Dataset status: PASS**

- Preferred path đã được triển khai ở grain `dataset_id + task_id`; UCI chỉ gọi analytics 52 lần, không chạy lặp theo explanation mode.
- UCI evidence: 52/52 task-level evidence ready, 0 failed.
- Runtime row count và bucket: 52/52 khớp Phase 3.
- Full-query artifact hash: 52/52 khớp lại bytes trên disk; `datasets_sha256`: 52/52 khớp.
- Large-result tasks: 6/6 có `deterministic_artifact_retrieval` plan.
- 13 zero-row responses được ghi rõ `terminal_invalid_empty_result` từ raw backend data-quality errors; unclassified empty arrays = 0.
- Script: `Docs/evaluation_v2/Runs/scripts/runLlmJudgeV2DatasetEvidenceBuilder.mjs`.
- Script expand/link 208 records đã sẵn sàng nhưng chưa chạy: `Docs/evaluation_v2/Runs/scripts/expandLlmJudgeV2EvidenceManifestToModes.mjs`.
- Output UCI: `Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/`.
- Gate UCI đã hoàn tất và SAMPLE_OULAD đã được chạy ở bước kế tiếp.

### Kết quả thực thi F2 - SAMPLE_OULAD - 2026-06-19

**Dataset status: PASS — F2 dataset execution hoàn tất; aggregate/expand chưa chạy**

- OULAD evidence: 52/52 task-level evidence ready, 0 failed.
- Runtime row count và bucket: 52/52 khớp Phase 3.
- Full-query artifact hash và `datasets_sha256`: 52/52 khớp lại dữ liệu trên disk.
- Large-result tasks: 13/13 có `deterministic_artifact_retrieval` plan.
- 5 zero-row responses được ghi rõ `terminal_invalid_empty_result`; unclassified empty arrays = 0.
- Tổng hai dataset hiện có 104/104 task-level manifests ready và 104 full-query artifacts.
- Output OULAD: `Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/`.
- Gate dataset execution đã hoàn tất và aggregate/expand đã được chạy ở bước kế tiếp.

### Kết quả aggregate/expand F2 - 2026-06-19

**Phase F2 status: PASS**

- Aggregate task-level evidence: 104/104 ready, 104 `evidence_id` duy nhất.
- Expanded mode-level evidence: 208/208 ready, 208 `record_id` duy nhất.
- UCI: 52 task-level / 104 mode-level; OULAD: 52 task-level / 104 mode-level.
- 104/104 full-query artifact SHA-256 được runner kiểm tra lại từ bytes trên disk.
- 104/104 task-level evidence link đúng chính xác hai explanation modes.
- Explicit terminal-invalid evidence được giữ nguyên: 18 task-level / 36 mode-level records.
- Aggregate outputs nằm tại `Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/`.
- Gate sau F2: `phase_f3_allowed = true`; full judge invocation và official full evaluation vẫn chưa được phép.

## 7. Phase F3 - Baseline explanation cho từng dataset

### Mục đích

Chạy AI explanation mode `baseline_first_20_rows` cho từng dataset.

Thứ tự chạy:

```text
1. Baseline UCI: 52 records.
2. Baseline OULAD: 52 records.
```

### Điều kiện trước khi chạy

AIService phải đang chạy với observed method:

```text
baseline_first_20_rows
```

### Input

```text
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/evidence_manifest_208_mode_records.jsonl
```

hoặc dataset/mode slice tương ứng.

### Output

Baseline UCI:

```text
Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_manifest.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_artifacts/*.json
Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_report.json
Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/explanation_report.md
```

Baseline OULAD:

```text
Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_manifest.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/*.json
Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_report.json
Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_report.md
```

Aggregate baseline:

```text
Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/explanation_manifest_baseline_104.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/explanation_aggregate_report.json
Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/explanation_aggregate_report.md
```

### Acceptance criteria

- Baseline UCI: 52/52 explanation ready.
- Baseline OULAD: 52/52 explanation ready.
- Aggregate baseline: 104/104 ready.
- Every record has:
  - explanation artifact path;
  - explanation artifact SHA-256;
  - request payload provenance;
  - `observed_ai_summary_method = baseline_first_20_rows`.

### Kết quả thực thi F3 - Baseline SAMPLE_UCI_POR - 2026-06-19

**Dataset status: PASS — F3 baseline tổng thể vẫn IN PROGRESS vì chưa chạy SAMPLE_OULAD**

- Backend `http://localhost:4000/api/health` và AIService `http://localhost:8000/health` đều PASS trước run.
- Mode preflight bằng explain call thật: expected và observed đều là `baseline_first_20_rows`, `degraded = false`.
- UCI baseline: 52/52 explanation ready, 0 failed, 0 degraded, 0 mode mismatch.
- Explanation artifact SHA-256: 52/52 khớp bytes trên disk.
- Source evidence SHA-256 linkage: 52/52 khớp full-query artifacts F2.
- Request payload provenance, non-empty summary và raw text: 52/52 hợp lệ.
- 52/52 records chạy thành công ở attempt đầu tiên; observed model `gpt-4o-mini-2024-07-18`.
- Output: `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_UCI_POR/`.
- Gate tiếp theo: giữ AIService ở `baseline_first_20_rows` và chạy baseline cho `SAMPLE_OULAD`; chưa cho phép full judge invocation.

### Kết quả thực thi F3 - Baseline SAMPLE_OULAD - 2026-06-19

**Dataset status: PASS — F3 baseline dataset slices complete; aggregate baseline 104-record build is the next gate.**

- AIService `http://localhost:8000/health` PASS trước khi resume.
- OULAD baseline: 52/52 explanation ready, 0 failed, 0 degraded, 0 mode mismatch.
- Observed AI summary method: 52/52 records = `baseline_first_20_rows`.
- Explanation artifact SHA-256: 52/52 present in manifest.
- Request payload provenance and source evidence linkage are present in artifacts.
- One deterministic schema mismatch was fixed for `SAMPLE_OULAD__S-T04__baseline_first_20_rows`: the LLM used `comparison = triggered` for risk-flag evidence. AIService now normalizes unsupported `evidence.comparison` literals to schema-valid values before Pydantic validation and preserves the original value in `context` as `original_comparison=...`.
- Output: `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/`.
- Gate tiếp theo: build baseline aggregate 104 records (`explanation_manifest_baseline_104.jsonl` and aggregate report). Judge input materialization remains disabled until aggregate baseline is built and checked.

### Kết quả thực thi F3 - Baseline aggregate 104 - 2026-06-19

**Aggregate status: PASS — F3 baseline complete; Phase F4 task-aware explanations are allowed.**

- Runner added: `Docs/evaluation_v2/Runs/scripts/buildLlmJudgeV2BaselineExplanationAggregate.mjs`.
- Aggregate baseline manifest: 104/104 records, 104 unique `record_id`.
- Dataset coverage: `SAMPLE_UCI_POR` 52 records, `SAMPLE_OULAD` 52 records.
- Explanation-ready records: 104/104.
- Degraded records: 0.
- Mode mismatch records: 0.
- Observed AI summary method: 104/104 records = `baseline_first_20_rows`.
- Explanation artifact SHA-256 verified: 104/104.
- Source evidence SHA-256 verified against F2 full-query artifacts: 104/104.
- Request payload provenance present: 104/104.
- Outputs:
  - `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/explanation_manifest_baseline_104.jsonl`
  - `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/explanation_aggregate_report.json`
  - `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/explanation_aggregate_report.md`
- Gate tiếp theo: đổi AIService sang `task_aware_data_summarization` và chạy Phase F4. Judge input materialization và judge invocation vẫn disabled.

## 8. Phase F4 - Task-aware explanation cho từng dataset

### Mục đích

Sau khi baseline hoàn tất, đổi AIService sang:

```text
task_aware_data_summarization
```

Sau đó chạy task-aware explanation theo thứ tự:

```text
1. Task-aware UCI: 52 records.
2. Task-aware OULAD: 52 records.
```

### Output

Task-aware UCI:

```text
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_manifest.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/*.json
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_report.json
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_report.md
```

Task-aware OULAD:

```text
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_manifest.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_artifacts/*.json
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_report.json
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/explanation_report.md
```

Aggregate task-aware:

```text
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/explanation_manifest_task_aware_104.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/explanation_aggregate_report.json
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/explanation_aggregate_report.md
```

### Acceptance criteria

- Task-aware UCI: 52/52 explanation ready.
- Task-aware OULAD: 52/52 explanation ready.
- Aggregate task-aware: 104/104 ready.
- Every record has:
  - explanation artifact path;
  - explanation artifact SHA-256;
  - request payload provenance;
  - `observed_ai_summary_method = task_aware_data_summarization`.

### Kết quả thực thi F4 - Task-aware SAMPLE_UCI_POR - 2026-06-19

**Dataset status: PASS — F4 task-aware tổng thể vẫn IN PROGRESS vì chưa chạy SAMPLE_OULAD.**

- Mode preflight bằng explain call thật: expected và observed đều là `task_aware_data_summarization`, `degraded = false`.
- UCI task-aware: 52/52 explanation ready, 0 failed, 0 degraded, 0 mode mismatch.
- Observed AI summary method: 52/52 records = `task_aware_data_summarization`.
- Explanation artifact SHA-256 verified: 52/52.
- Source evidence SHA-256 linkage verified against F2 full-query artifacts: 52/52.
- Request payload provenance and non-empty raw text: 52/52.
- Output: `Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/`.
- Gate tiếp theo: giữ AIService ở `task_aware_data_summarization` và chạy task-aware cho `SAMPLE_OULAD`; chưa cho phép judge input materialization.

### Kết quả thực thi F4 - Task-aware SAMPLE_OULAD - 2026-06-19

**Dataset status: PASS — F4 task-aware dataset slices complete; aggregate task-aware 104-record build is the next gate.**

- AIService `http://localhost:8000/health` PASS trước run.
- Mode preflight bằng explain call thật: expected và observed đều là `task_aware_data_summarization`, `degraded = false`.
- OULAD task-aware: 52/52 explanation ready, 0 failed, 0 degraded, 0 mode mismatch.
- Observed AI summary method: 52/52 records = `task_aware_data_summarization`.
- One transient malformed-JSON degraded response occurred for `SAMPLE_OULAD__A-G11__task_aware_data_summarization`; resume reran only that failed record and completed successfully.
- Explanation artifact SHA-256 verified: 52/52.
- Source evidence SHA-256 linkage verified against F2 full-query artifacts: 52/52.
- Request payload provenance and non-empty raw text: 52/52.
- Output: `Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_OULAD/`.
- Gate tiếp theo: build task-aware aggregate 104 records (`explanation_manifest_task_aware_104.jsonl` and aggregate report). Judge input materialization remains disabled until aggregate task-aware is built and checked.

### Kết quả thực thi F4 - Task-aware aggregate 104 - 2026-06-19

**Aggregate status: PASS — F4 task-aware complete; Phase F5 judge input materialization is allowed.**

- Runner added: `Docs/evaluation_v2/Runs/scripts/buildLlmJudgeV2TaskAwareExplanationAggregate.mjs`.
- Aggregate task-aware manifest: 104/104 records, 104 unique `record_id`.
- Dataset coverage: `SAMPLE_UCI_POR` 52 records, `SAMPLE_OULAD` 52 records.
- Explanation-ready records: 104/104.
- Degraded records: 0.
- Mode mismatch records: 0.
- Observed AI summary method: 104/104 records = `task_aware_data_summarization`.
- Explanation artifact SHA-256 verified: 104/104.
- Source evidence SHA-256 verified against F2 full-query artifacts: 104/104.
- Request payload provenance present: 104/104.
- Outputs:
  - `Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/explanation_manifest_task_aware_104.jsonl`
  - `Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/explanation_aggregate_report.json`
  - `Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/explanation_aggregate_report.md`
- Gate tiếp theo: Phase F5 materialize 208 judge inputs is allowed. Judge invocation remains disabled until materialization passes.

## 9. Phase F5 - Materialize 208 judge inputs

### Mục đích

Ghép evidence + explanation + task requirements + schema context thành judge input cho 208 records.

### Input

```text
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/evidence_manifest_208_mode_records.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/explanation_manifest_baseline_104.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/explanation_manifest_task_aware_104.jsonl
```

### Output

```text
Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/judge_input_manifest.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/judge_inputs/*.json
Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/*.json
Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/judge_input_validation_report.json
Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/judge_input_validation_report.md
```

### Acceptance criteria

- 208/208 judge inputs generated.
- 208/208 pass schema validation.
- No forbidden provenance-only fields in judge input:
  - `source_field`
  - `review_status`
  - `review_note`
- Every record has materialized:
  - required core outputs;
  - required supporting outputs;
  - evaluation constraints;
  - safety/fairness applicability;
  - evidence access metadata;
  - explanation generation metadata.

### Kết quả thực thi F5 - Materialize 208 judge inputs - 2026-06-19

**Status: PASS — 208/208 judge inputs materialized and schema-validated; Phase F6 final context build is allowed.**

- Runner updated: `Docs/evaluation_v2/Runs/scripts/materializeLlmJudgeV2JudgeInputs.mjs`.
- Inputs used:
  - `Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/evidence_manifest_208_mode_records.jsonl`
  - `Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/explanation_manifest_baseline_104.jsonl`
  - `Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/explanation_manifest_task_aware_104.jsonl`
- Judge input ready records: 208/208.
- Unique `record_id`: 208/208.
- Dataset coverage: `SAMPLE_UCI_POR` 104 records, `SAMPLE_OULAD` 104 records.
- Mode coverage: `baseline_first_20_rows` 104 records, `task_aware_data_summarization` 104 records.
- Evidence access coverage: `direct_embedding` 170 records, `deterministic_artifact_retrieval` 38 records.
- Retrieval logs generated: 38/38 large-result records.
- Judge input artifact SHA-256 verified: 208/208.
- Forbidden provenance-only fields absent from generated judge inputs: `source_field`, `review_status`, `review_note`.
- Required core outputs, required supporting outputs, evaluation constraints, safety/fairness applicability, evidence access metadata, and explanation generation metadata are materialized for 208/208 records.
- Outputs:
  - `Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/judge_input_manifest.jsonl`
  - `Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/judge_inputs/*.json`
  - `Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/retrieval_logs/*.json`
  - `Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/judge_input_validation_report.json`
  - `Docs/evaluation_v2/Runs/full_208/phase8_judge_inputs/judge_input_validation_report.md`
- Gate tiếp theo: build and validate final judge contexts in Phase F6. Judge invocation remains disabled until F6 passes.

## 10. Phase F6 - Build and validate 208 final judge contexts

### Mục đích

Chứng minh full evidence thật sự đi vào context cuối cùng mà LLM Judge đọc.

### Output

```text
Docs/evaluation_v2/Runs/full_208/phase8_judge_contexts/final_contexts/*.md
Docs/evaluation_v2/Runs/full_208/phase8_judge_contexts/judge_context_manifest.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_judge_contexts/judge_context_validation_report.json
Docs/evaluation_v2/Runs/full_208/phase8_judge_contexts/judge_context_validation_report.md
```

### Acceptance criteria

- 208/208 final contexts generated.
- For `direct_embedding`:
  - embedded rows present;
  - embedded row count equals full artifact row count;
  - embedded evidence hash matches artifact hash.
- For `deterministic_artifact_retrieval`:
  - full artifact readable;
  - retrieval log exists;
  - chunk ids, row ranges, row counts recorded;
  - retrieval validation pass.
- Every context has token accounting:
  - `context_token_count`
  - `embedded_evidence_token_count`
  - `explanation_token_count`
  - `prompt_token_count`
  - `generator_provenance_token_count`
- Report must explicitly state:

```text
judge_context_validation_status = PASS
full_judge_invocation_allowed = true
official_full_evaluation_allowed = pending_user_approval
```

### Kết quả thực thi F6 - Build and validate 208 final judge contexts - 2026-06-19

**Status: PASS — 208/208 final judge contexts generated and validated; full judge invocation is allowed pending user approval.**

- Runner updated: `Docs/evaluation_v2/Runs/scripts/buildLlmJudgeV2JudgeContexts.mjs`.
- Final contexts generated: 208/208.
- Unique `record_id`: 208/208.
- Dataset coverage: `SAMPLE_UCI_POR` 104 records, `SAMPLE_OULAD` 104 records.
- Mode coverage: `baseline_first_20_rows` 104 records, `task_aware_data_summarization` 104 records.
- Evidence access coverage: `direct_embedding` 170 records, `deterministic_artifact_retrieval` 38 records.
- Direct embedding validation: 170/170 embedded row counts match full artifacts and artifact hashes match.
- Retrieval validation: 38/38 retrieval logs/chunks/ranges/row counts pass.
- Final context SHA-256 verified: 208/208.
- Generator provenance present: 208/208.
- Deterministic check failures: 0.
- Token accounting present for every context. Heuristic token summary:
  - min context tokens: 6,188;
  - max context tokens: 194,178;
  - average context tokens: 15,433.
- Report gate:
  - `judge_context_validation_status = PASS`
  - `full_judge_invocation_allowed = true`
  - `official_full_evaluation_allowed = pending_user_approval`
- Outputs:
  - `Docs/evaluation_v2/Runs/full_208/phase8_judge_contexts/final_contexts/*.md`
  - `Docs/evaluation_v2/Runs/full_208/phase8_judge_contexts/judge_context_manifest.jsonl`
  - `Docs/evaluation_v2/Runs/full_208/phase8_judge_contexts/judge_context_validation_report.json`
  - `Docs/evaluation_v2/Runs/full_208/phase8_judge_contexts/judge_context_validation_report.md`
- Gate tiếp theo: Phase F7 judge prompt queue / judge invocation can proceed only after explicit user approval.

## 11. Phase F7 - Generate full judge prompt queue

### Mục đích

Tạo 208 prompt packets để chạy LLM Judge.

### Phase F7-preflight - Token budget audit + prompt queue strategy

Trước khi invoke judge thật, chạy token-budget audit để tránh gửi context quá lớn trực tiếp vào model.

Output preflight:

```text
Docs/evaluation_v2/Runs/full_208/phase8_judge_queue/token_budget_report.json
Docs/evaluation_v2/Runs/full_208/phase8_judge_queue/token_budget_report.md
Docs/evaluation_v2/Runs/full_208/phase8_judge_queue/judge_prompt_queue_manifest.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_judge_queue/prompt_queue/*.md
```

Strategy:

- Context `<= 32k` heuristic tokens: `full_context`.
- Context `> 32k` heuristic tokens: `compact_retrieval_context`.
- Compact packet không nhúng toàn bộ rows; chỉ nhúng prompt, identity/task/rubric requirements, explanation, evidence summary, retrieval log/chunks/ranges, artifact references và validation metadata.
- Full artifact vẫn giữ trên disk để audit.
- Khi report, không viết rằng LLM Judge "nhìn thấy toàn bộ rows trong prompt" cho `compact_retrieval_context`; chỉ được viết rằng full result có hashed artifact, verified retrieval/provenance và deterministic scan metadata theo D2.
- Judge invocation chỉ chạy sau approval riêng.

### Official freeze bắt buộc trước judge invocation

Trước khi mở Codex judge session thật, prompt/rubric/manifest phải dùng bản official freeze, không dùng lại wording pilot:

```text
Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md
  prompt_version = judge_prompt_v2_full_208_v1
  sha256 = e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517

Docs/evaluation_v2/Rubric/JUDGE_RUBRIC_1_TO_10.md
  rubric_version = judge_rubric_1_to_10_full_208_v1
  sha256 = ac141e7148141de0244bf4443ba32aa8e47a08313fdaa1a7bc697a6b9faafcc1

Docs/evaluation_v2/Rubric/LLM_JUDGE_V2_METRIC_ANCHOR_SPEC.md
  sha256 = a45a3d6b7e0a95f6f804a1739ea3685ec532c132b455ac802fe823cbe400d8fe

Docs/evaluation_v2/Runs/full_208/official_contract_manifest_v1.json
  manifest_version = llm_judge_v2_full_208_official_contract_manifest_v1
  sha256 = eb78be59016700cd9b5ec7f2e4886ecc67d8de06094439738af99f40e385e296

Docs/evaluation_v2/PromptEvaluateAI/PHASE7_UCI_CODEX_SESSION_MASTER_PROMPT_OFFICIAL.md
  purpose = dataset-scoped Codex session master prompt for SAMPLE_UCI_POR Phase 7 invocation
  sha256 = 4fe0c4e3f697a25c6cf808b7043c6f0249e36dd27e041c8b3725cb001ad53be6
```

Manifest pilot cũ chỉ là historical evidence, không dùng làm manifest chính thức cho full judge invocation.

### Output

```text
Docs/evaluation_v2/Runs/full_208/phase8_judge_invocation/prompt_queue/*.md
Docs/evaluation_v2/Runs/full_208/phase8_judge_invocation/raw_outputs/
Docs/evaluation_v2/Runs/full_208/phase8_judge_invocation/extracted_outputs/
Docs/evaluation_v2/Runs/full_208/phase8_judge_invocation/validated_outputs/
Docs/evaluation_v2/Runs/full_208/phase8_judge_invocation/attempt_wrappers/
Docs/evaluation_v2/Runs/full_208/phase8_judge_invocation/record_status/
Docs/evaluation_v2/Runs/full_208/phase8_judge_invocation/judge_invocation_manifest.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_judge_invocation/judge_attempt_manifest.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_judge_invocation/record_execution_status_manifest.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_judge_invocation/judge_invocation_report.json
Docs/evaluation_v2/Runs/full_208/phase8_judge_invocation/judge_invocation_report.md
```

Official runner:

```powershell
node Docs/evaluation_v2/Runs/scripts/runLlmJudgeV2FullJudgeInvocation.mjs --mode prepare --dataset SAMPLE_UCI_POR --expected-count 104
node Docs/evaluation_v2/Runs/scripts/runLlmJudgeV2FullJudgeInvocation.mjs --mode import --dataset SAMPLE_UCI_POR --expected-count 104
```

Use this saved master prompt in the new UCI Codex project/chat session:

```text
Docs/evaluation_v2/PromptEvaluateAI/PHASE7_UCI_CODEX_SESSION_MASTER_PROMPT_OFFICIAL.md
```

`prepare` reads the frozen Phase 8 prompt queue manifest and writes 104 UCI manifest rows with `expected_raw_output_path` under `phase8_judge_invocation/raw_outputs/`.
`import` reads those exact expected raw output paths, extracts direct judge JSON into `extracted_outputs/`, writes schema-valid records into `validated_outputs/`, and writes retry status into `record_status/` plus `record_execution_status_manifest.jsonl`.

### Cách chạy thực tế

Official invocation phải theo D4 session boundary, không chạy lẫn dataset và không chia official run theo mode:

```text
Run 1:
  Mở Codex project mới + chat session mới.
  Dùng đúng official frozen prompt artifact.
  Evaluate SAMPLE_UCI_POR đủ 104 records.
  Không đưa OULAD records, OULAD outputs hoặc aggregate vào session này.

Run 2:
  Mở Codex project mới + chat session mới.
  Dùng lại đúng official frozen prompt artifact.
  Evaluate SAMPLE_OULAD đủ 104 records.
  Không đưa UCI outputs hoặc aggregate vào session này.
```

Queue có thể được lọc theo dataset để thao tác dễ hơn, nhưng filter theo mode
như `UCI baseline`, `UCI task-aware` chỉ được xem là cách sắp xếp file trong
cùng dataset session. Không được biến các mode batches thành official sessions
riêng nếu chưa freeze deterministic chunking policy trước invocation.

Nếu một dataset session không xử lý ổn định 104 records, phải dừng và cập nhật
D4/chunking policy trước khi official run, không tự ý chia sau khi đã thấy
output.

```text
Allowed official session units:
  SAMPLE_UCI_POR all modes = 104 records
  SAMPLE_OULAD all modes = 104 records
```

Mỗi raw LLM Judge response phải lưu đúng path trong invocation manifest:

```text
expected_raw_output_path
```

### Acceptance criteria

- Prompt queue có 208 prompts.
- Raw output importer có thể chạy nhiều lần.
- Missing records được ghi là `missing`, không silently pass.
- Valid records phải pass judge response schema.
- Invalid records phải có status và reason rõ ràng.
- Official UCI và OULAD runs phải dùng hai Codex project/chat session mới riêng biệt.
- Cùng prompt/rubric/schema/manifest official freeze được dùng cho cả hai dataset.
- Prompt queue packet không được chứa wording pilot như `PILOT PROMPT CANDIDATE`.

### Kết quả thực thi F7-preflight - Token budget audit + prompt queue strategy - 2026-06-19

**Status: PASS — 208/208 prompt queue packets generated with token-budget strategy; judge invocation was not started.**

- Runner added: `Docs/evaluation_v2/Runs/scripts/buildLlmJudgeV2PromptQueuePreflight.mjs`.
- Official freeze completed before judge invocation:
  - official manifest: `Docs/evaluation_v2/Runs/full_208/official_contract_manifest_v1.json`;
  - official manifest SHA-256: `eb78be59016700cd9b5ec7f2e4886ecc67d8de06094439738af99f40e385e296`;
  - prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`;
  - rubric SHA-256: `ac141e7148141de0244bf4443ba32aa8e47a08313fdaa1a7bc697a6b9faafcc1`.
- Tokenizer method: `heuristic_chars_div_4_ceiling`.
- Full-context token cap: 32,000.
- Prompt queue ready records: 208/208.
- Full-context queue packets: 190.
- Compact retrieval-context queue packets: 18.
- Threshold audit:
  - `> 32k`: 18 records.
  - `> 64k`: 12 records.
  - `> 128k`: 4 records.
  - `> 190k`: 2 records.
- Max context record:
  - `record_id`: `SAMPLE_OULAD__S-T11__task_aware_data_summarization`
  - dataset/task/mode: `SAMPLE_OULAD` / `S-T11` / `task_aware_data_summarization`
  - evidence access: `deterministic_artifact_retrieval`
  - final context heuristic tokens: 194,178
  - prompt packet heuristic tokens after compaction: 6,336
  - queue strategy: `compact_retrieval_context`
- Independent validation:
  - prompt packet SHA-256 verified: 208/208;
  - all over-cap records compacted: 18/18;
  - compact packets do not embed full final context: 18/18;
  - queue regenerated after official prompt freeze; token report prompt SHA-256 = `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`;
  - no `PILOT PROMPT CANDIDATE`, `judge_prompt_v2_pilot_v1`, `PILOT CONTRACT - NOT APPROVED` or `PILOT VERSION` wording remains in prompt/rubric/queue artifacts.
- Outputs:
  - `Docs/evaluation_v2/Runs/full_208/phase8_judge_queue/token_budget_report.json`
  - `Docs/evaluation_v2/Runs/full_208/phase8_judge_queue/token_budget_report.md`
  - `Docs/evaluation_v2/Runs/full_208/phase8_judge_queue/judge_prompt_queue_manifest.jsonl`
  - `Docs/evaluation_v2/Runs/full_208/phase8_judge_queue/prompt_queue/*.md`
- Gate: prompt queue is ready, but judge invocation remains disabled until explicit user approval.

## 12. Phase F8 - Final scoring full 208

### Mục đích

Tính final scoring record cho toàn bộ valid judge outputs.

### Script cần chỉnh nhẹ

Script hiện tại:

```text
Docs/evaluation_v2/Runs/scripts/finalizeLlmJudgeV2PilotScoring.mjs
```

có thể tái sử dụng, nhưng nên generalize output naming cho full run:

```text
Docs/evaluation_v2/Runs/scripts/finalizeLlmJudgeV2Scoring.mjs
```

hoặc thêm options:

```text
--evaluation-run-id full_208
--expected-record-count 208
--run-label full
```

### Output

```text
Docs/evaluation_v2/Runs/full_208/phase8_scoring/final_scoring_records/*.json
Docs/evaluation_v2/Runs/full_208/phase8_scoring/full_scoring_manifest.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_scoring/full_scoring_report.json
Docs/evaluation_v2/Runs/full_208/phase8_scoring/full_scoring_report.md
```

Aggregate outputs:

```text
Docs/evaluation_v2/Runs/full_208/phase8_scoring/aggregates/by_dataset.json
Docs/evaluation_v2/Runs/full_208/phase8_scoring/aggregates/by_mode.json
Docs/evaluation_v2/Runs/full_208/phase8_scoring/aggregates/by_dataset_and_mode.json
Docs/evaluation_v2/Runs/full_208/phase8_scoring/aggregates/by_row_count_bucket.json
Docs/evaluation_v2/Runs/full_208/phase8_scoring/aggregates/by_evidence_access_mode.json
Docs/evaluation_v2/Runs/full_208/phase8_scoring/aggregates/paired_mode_comparison.json
Docs/evaluation_v2/Runs/full_208/phase8_scoring/aggregates/paired_mode_comparison.md
```

### Acceptance criteria

- 208/208 records scored, hoặc nếu thiếu thì missing count phải được report rõ.
- Every scored record has:
  - raw weighted score;
  - caps applied;
  - effective cap;
  - final score after caps;
  - verdict;
  - error summary.
- Paired comparison chỉ chạy cho pairs có đủ baseline và task-aware.
- Report phải tách:
  - by dataset;
  - by mode;
  - by row-count bucket `<=20` vs `>20`;
  - by evidence access mode.

### Required non-tie explanation for every dataset scoring run

After each dataset scoring run, the scoring report and paired-mode comparison report must include:

- count of non-tie pairs by row-count bucket `<=20` vs `>20`;
- count of non-tie winners by mode and row-count bucket;
- per-task explanation for every non-tie result;
- explicit note that when full SQL result row count is `<=20`, `rows[:20]` already covers the complete result set, so the win/loss is driven by explanation quality, missing core outputs, unsupported claims, metric differences, or severity caps rather than row truncation;
- the same analysis for SAMPLE_OULAD after OULAD scoring.

### Calibration gate before thesis-level conclusions

The SAMPLE_UCI_POR scoring run is mechanically valid, but current results show score clustering and insufficient pairwise sensitivity.

Calibration/review artifact:

```text
Docs/evaluation_v2/Runs/full_208/phase8_scoring/audits/uci_scoring_reliability_calibration_review.md
```

Do not treat the current UCI result as final thesis evidence until:

- deterministic derived-stat evidence is added for correlation tasks;
- a pairwise baseline-vs-task-aware judge stage is designed and frozen;
- human calibration pilot is completed on representative paired cases;
- cap policy and judge anchors are reviewed after calibration;
- affected UCI records are rerun or explicitly marked review-needed.

Important correction: the metric anchor spec exists and is frozen for this run, but it is still a project-specific policy that needs human calibration before final conclusions.

### Single-review dry run path selected

Because only one reviewer is available at this point, the next calibration path is a single-review dry run, not an official human calibration pilot.

Dry-run design artifact:

```text
Docs/evaluation_v2/Runs/full_208/phase9_single_review_dry_run/SINGLE_REVIEW_DRY_RUN_DESIGN.md
```

New deterministic derived-stat evidence builder:

```text
Docs/evaluation_v2/Runs/scripts/buildLlmJudgeV3DerivedStatEvidence.mjs
```

UCI derived-stat output:

```text
Docs/evaluation_v2/Runs/full_208/phase9_single_review_dry_run/derived_stat_evidence/derived_stat_report__SAMPLE_UCI_POR.md
```

Current UCI derived-stat result:

- 7 `correlation_evidence` tasks were selected from official UCI judge inputs.
- 4 tasks have deterministic Pearson evidence: `A-G13`, `S-T09`, `S-T14`, `S-T15`.
- 3 tasks are correctly skipped: `A-G02` has zero variance on `engagement_score`; `A-G09` and `S-T11` have zero rows.

Pairwise prompt/schema dry-run candidates:

```text
Docs/evaluation_v2/PromptEvaluateAI/PAIRWISE_JUDGE_PROMPT_V3_DRY_RUN.md
Docs/evaluation_v2/LLM_JUDGE_V3_PAIRWISE_RESPONSE_SCHEMA_DRY_RUN.json
```

Pairwise dry-run aggregate report:

```text
Docs/evaluation_v2/Runs/full_208/phase9_single_review_dry_run/pairwise_aggregate/pairwise_dry_run_aggregate__SAMPLE_UCI_POR.md
```

Dry-run decisions before UCI V3 pointwise rerun:

- split derived-stat guidance into two separate pointwise V3 instructions:
  - deterministic derived stat available -> use it and do not cap a matching coefficient as unsupported;
  - deterministic derived stat unavailable because of zero variance, zero rows, or no valid pairs -> do not invent coefficient, direction, or strength;
- use calibration candidate caps for the UCI V3 rerun:
  - major factual or unsupported numerical claim cap = 5.0;
  - core-output omission cap = 6.5;
  - critical factual or contradictory core numerical claim cap = 2.0;
- acceptance criterion before moving to OULAD:
  - after rerunning 104 UCI pointwise records, compare V3 pointwise winners against the 15 pairwise dry-run winners;
  - proceed only if alignment is at least 12/15 and no critical derived-stat contradiction remains unresolved.

These artifacts are still single-review dry-run artifacts, not official two-reviewer human calibration evidence.

## 13. Phase F9 - Thesis/report package

### Mục đích

Tạo báo cáo dễ đọc cho luận văn và review với thầy.

### Output

```text
Docs/evaluation_v2/Reports/ai_explanation_evaluation_methodology_v2.md
Docs/evaluation_v2/Reports/SAMPLE_UCI_POR_mode_comparison_v2.md
Docs/evaluation_v2/Reports/SAMPLE_OULAD_mode_comparison_v2.md
Docs/evaluation_v2/Reports/overall_ai_explanation_scoring_summary_v2.md
Docs/evaluation_v2/Reports/row_count_bucket_analysis_v2.md
Docs/evaluation_v2/Reports/full_evidence_access_validation_v2.md
```

### Nội dung bắt buộc

- Vì sao V1 không đủ.
- Vì sao V2 dùng full-query evidence.
- Cách chọn `direct_embedding` vs `deterministic_artifact_retrieval`.
- Cách Judge Prompt V2 nhìn thấy evidence trong final context.
- Cách report diễn giải `compact_retrieval_context`: full result không được embed toàn bộ vào prompt, nhưng có full artifact hash/path, retrieval log/chunks/ranges, provenance và deterministic scan metadata.
- Cách validate raw judge output.
- Cách tính score và cap.
- Kết quả baseline vs task-aware.
- Tách riêng result nhỏ `<=20` và result lớn `>20`.
- Nêu rõ pilot trước đó là smoke validation 2 records, không phải full calibration pilot.

## 14. Các điểm cần implement trước khi chạy full

### Bắt buộc

1. Tạo full case manifest generator.
2. Tạo planned-record splitter theo dataset/mode.
3. Chọn evidence strategy:
   - preferred: evidence 104 dataset-task artifacts rồi expand sang 208;
   - fallback: evidence 208 record-level artifacts.
4. Tạo aggregate script cho evidence/explanation manifests.
5. Generalize scoring finalizer/report naming cho full run.

### Nên làm

1. Cho invocation/scoring report dùng chữ `full` thay vì `pilot`.
2. Thêm batch checklist để user chạy LLM Judge theo từng nhóm prompt.
3. Thêm report token outlier để phát hiện context quá lớn trước khi chạy LLM Judge hàng loạt.

## 15. Gate quyết định

Không chuyển sang prompt queue full nếu:

- evidence chưa đủ;
- explanation chưa đủ;
- judge input chưa pass schema;
- final context chưa pass validation;
- token accounting có context bất thường nhưng chưa review.

Không finalize full scoring nếu:

- raw judge outputs còn thiếu mà không được report rõ;
- importer có invalid schema outputs;
- scoring finalizer phát hiện cap/score inconsistency.

Không claim full evaluation hoàn tất nếu:

- scored records < 208 mà report không ghi missing/invalid count;
- paired comparison dùng record thiếu cặp baseline/task-aware;
- không tách kết quả theo dataset, mode và row-count bucket.

## 16. Thứ tự thực hiện nhanh nhất được khuyến nghị

```text
F1. Generate full manifest + planned record slices.
F2a. Run SQL/evidence UCI 52 tasks.
F2b. Run SQL/evidence OULAD 52 tasks.
F3a. Run baseline explanation UCI 52 tasks.
F3b. Run baseline explanation OULAD 52 tasks.
F4a. Switch AIService to task-aware.
F4b. Run task-aware explanation UCI 52 tasks.
F4c. Run task-aware explanation OULAD 52 tasks.
F5. Materialize 208 judge inputs.
F6. Build + validate 208 final judge contexts.
F7. Generate 208 prompt queue.
F7b. Run/import LLM Judge responses by batch.
F8. Finalize scoring + aggregate.
F9. Write thesis reports.
```

Đây là luồng an toàn nhất vì mỗi bước đều có artifact và report riêng để dừng lại review trước khi chạy bước tiếp theo.
