# AI Summary Type Mapping Phase 2 — Canonical Mapping And Implementation Roadmap

- Trạng thái: **MAPPING COMPLETE — ALL CONTRACT EXTENSIONS COMPLETE — READY FOR LLM JUDGE V2**
- Ngày lập mapping: 2026-06-18
- Cập nhật implementation roadmap: 2026-06-18
- Architecture source: `AI_SUMMARY_TYPE_ARCHITECTURE_V2.md`
- Task scope source: `Docs/evaluation_v1/ai_explanation_full_matrix/manifest.expected.json`
- Registry source: `Backend/src/config/taskRegistry.json`
- Runtime evidence source: full `analytics_request_response_if_called.response.datasets` trong V1 task-aware artifacts
- Phạm vi hiện tại: canonical mapping, trạng thái implementation đã xác minh và roadmap trước khi chạy `LLM judge v2`

## 1. Tóm tắt kết quả

| Trạng thái | Số task |
|---|---:|
| `already_validated` | 52 |
| `ready_to_migrate` | 0 |
| `requires_contract_extension` | 0 |
| `requires_new_type` | 0 |
| `runtime_blocked` | 0 |
| **Tổng** | **52** |

Kết luận chính:

- 52 task đã có `AiSummaryType` và đã có validation trên ít nhất một actual dataset case.
- `action_synthesis` đã implement, self-test, actual-data validation, registry migration và runtime verification cho `A-G16`, `A-S08`, `S-T13`.
- `trend_comparison` dynamic groups đã implement, self-test, actual-data validation, registry migration và API runtime verification cho `A-C01`.
- `group_comparison` composite groups đã implement, self-test, actual-data validation, registry migration và API runtime verification cho `A-G05`, `A-G12`.
- `trend_series` multi-evidence đã implement, self-test, actual-data validation, registry migration và API runtime verification cho `A-S06`, `S-T07`, `S-T08`, `S-T12`.
- `correlation_evidence` selected-entity preservation đã implement, self-test, actual-data validation, registry migration và API runtime verification cho `S-T09`, `S-T11`, `S-T14`, `S-T15`.
- Không còn task nào ở trạng thái `requires_new_type`.
- Không còn task nào cần capability/contract extension trước `LLM judge v2`.
- Ba runtime mismatch của `S-T09`, `S-T14`, `S-T15` đã được giải quyết trong Phase 3: artifacts mới có 649 cohort rows và đúng một selected-student row.
- Không cần type thứ 12.

## 2. Bảng canonical 52 task

| Task | Proposed type | Required config | Extension cần dùng | Runtime shape đúng? | Trạng thái |
|---|---|---|---|---|---|
| `A-B01` | `numeric_distribution` | `bin=score_bucket`; `count=student_count`; `percent=pct_of_class` | Không | Đúng: UCI 10 bins; OULAD 11 bins | `already_validated` |
| `A-B02` | `categorical_distribution` | `category=final_outcome`; `count=student_count`; `percent=pct_of_class` | Không | Đúng: UCI 2; OULAD 4 categories | `already_validated` |
| `A-B03` | `categorical_distribution` | `category=study_effort_level`; `count=student_count`; `percent=pct_of_class` | Không | Đúng trên OULAD 4 categories; UCI insufficient | `already_validated` |
| `A-B04` | `categorical_distribution` | `category=at_risk_label`; `count=student_count` | Không | Đúng trên OULAD 3 categories; UCI insufficient | `already_validated` |
| `A-C01` | `trend_comparison` | `group=student_id`; `time=assessment_order`; `metric=score_normalized` | `dynamic_comparison_groups` đã implement; pairwise divergence evidence; alignment theo `assessment_order+assessment_type` | UCI/OULAD actual-data validator pass; registry migrated; API runtime smoke pass | `already_validated` |
| `A-C02` | `multi_metric_comparison` | `entity=student_id`; metrics `engagement_score,total_clicks,active_days`; units/directions | Type đã implement; conditional metric metadata pass | Đúng trên OULAD 6 rows; UCI insufficient | `already_validated` |
| `A-C03` | `multi_metric_comparison` | `entity=student_id`; risk metrics; flag columns; units/directions/thresholds | Type đã implement; flag evidence; metric metadata pass | Đúng trên OULAD 2 student profiles; UCI insufficient | `already_validated` |
| `A-C04` | `multi_metric_comparison` | `entity=student_id`; `metric_key=lifestyle_dimension`; metric value; supporting context | Type đã implement; `sensitive_context_policy`; units/directions pass | Đúng trên UCI 10 rows; OULAD blocked by compatibility | `already_validated` |
| `A-C05` | `multi_metric_comparison` | `entity=student_id`; background metric columns; units/directions | Type đã implement; `sensitive_context_policy` pass | Đúng trên UCI/OULAD: 2 profile rows each | `already_validated` |
| `A-C06` | `multi_metric_comparison` | `entity=student_id`; `metric_key=resource_type`; `clicks,pct_of_total,vle_diversity_score`; units | Type đã implement; metric-key rows và zero-activity semantics pass | Đúng trên OULAD 10 rows runtime; UCI insufficient | `already_validated` |
| `A-G01` | `ranking` | `entity=student_id`; `metric=engagement_score`; ascending | Không | Đúng trên OULAD 2300 rows; UCI insufficient | `already_validated` |
| `A-G02` | `correlation_evidence` | `x=engagement_score`; `y=avg_score`; `entity=student_id` | Không | Đúng trên OULAD 1998 pairs; UCI insufficient | `already_validated` |
| `A-G03` | `ranking` | `entity=student_id`; `metric=at_risk_score`; flags/actions | Không | Đúng: UCI/OULAD 50 rows each | `already_validated` |
| `A-G04` | `ranking` | `entity=assessment_name`; `metric=fail_rate_pct`; descending | Không | Đúng: UCI 3; OULAD 112 rows | `already_validated` |
| `A-G05` | `group_comparison` | groups `final_outcome+assessment_type`; `metric=late_submission_rate`; `count=student_count` | `composite_group_keys` đã implement; multiple supporting metrics; metric units/directions | OULAD/UCI actual-data validator pass; registry migrated; API runtime smoke pass | `already_validated` |
| `A-G06` | `ranking` | `entity=resource_type`; `metric=avg_score_by_resource_type` | Không | Đúng trên OULAD 9 rows; UCI insufficient | `already_validated` |
| `A-G07` | `ranking` | `entity=feature_name`; `metric=abs_correlation_rank` | Không | Đúng trên OULAD 4 rows; UCI insufficient | `already_validated` |
| `A-G08` | `group_comparison` | `group=group_value`; `metric=avg_score`; `count=student_count` | Không | Đúng trên OULAD 11 groups; UCI insufficient | `already_validated` |
| `A-G09` | `correlation_evidence` | `x=disadvantage_score`; `y=avg_score`; `entity=student_id` | Không | Đúng trên OULAD 1875 pairs; UCI blocked | `already_validated` |
| `A-G10` | `categorical_distribution` | `category=consistency_level`; `count=student_count`; `percent=pct_students` | Không | Đúng trên OULAD 3 categories; UCI insufficient | `already_validated` |
| `A-G11` | `trend_series` | `time=week_number`; `metric=week_total_clicks`; drop flag | Không | Đúng trên OULAD 42 points; UCI insufficient | `already_validated` |
| `A-G12` | `group_comparison` | `group=group_value`; outcome dimension `final_outcome`; `metric=pct_within_group`; `count=student_count` | `composite_group_keys` và nested outcome series đã implement; units/directions; focus categories | OULAD/UCI actual-data validator pass; registry migrated; API runtime smoke pass | `already_validated` |
| `A-G13` | `correlation_evidence` | `x=lifestyle_risk_score`; `y=avg_score`; `entity=student_id` | Không | Đúng trên UCI 649 pairs; OULAD blocked by compatibility | `already_validated` |
| `A-G14` | `trend_comparison` | `group=final_outcome`; `time=week_number`; `metric=avg_clicks`; target Withdrawn | Không | Đúng trên OULAD 164 points; UCI insufficient | `already_validated` |
| `A-G15` | `ranking` | `entity=student_id`; `metric=at_risk_score`; flags | Không | Đúng trên OULAD 50 rows; UCI insufficient | `already_validated` |
| `A-G16` | `action_synthesis` | evidence columns; versioned action rules; priority/provenance | `evidence_provenance`; action-rule validation; claim limits | OULAD actual-data và API runtime pass; 4 prioritized actions có complete provenance | `already_validated` |
| `A-S01` | `metric_snapshot` | entity `student_id`; metric/status columns; units; sensitive columns | Type đã implement; `sensitive_context_policy` | Runtime verified trên OULAD; UCI insufficient | `already_validated` |
| `A-S02` | `trend_series` | `time=assessment_order`; `metric=score_normalized`; benchmark/flags/actions | Không | Đúng: UCI 3; OULAD 5 points | `already_validated` |
| `A-S03` | `trend_series` | `time=week_number`; `metric=weekly_clicks`; drop evidence | Không | Đúng trên OULAD 32 points; UCI insufficient | `already_validated` |
| `A-S04` | `risk_flags` | flag name/value/threshold/triggered | Không | Đúng trên UCI 4 flags; OULAD blocked | `already_validated` |
| `A-S05` | `ranking` | `entity=competency_tag`; `metric=avg_score`; ascending | Không | Đúng: UCI 3; OULAD 5 rows | `already_validated` |
| `A-S06` | `trend_series` | `time=assessment_order`; `metric=submission_delay_days`; score/punctuality secondary evidence | Secondary metric association; `small_sample_caveat`; metric units/directions đã implement | OULAD actual-data validator pass: 5 raw rows, 4 valid delay points; API runtime smoke pass | `already_validated` |
| `A-S07` | `metric_snapshot` | background metric/status columns; units; sensitive columns | Type đã implement; `sensitive_context_policy` | Runtime verified trên UCI; OULAD blocked by compatibility | `already_validated` |
| `A-S08` | `action_synthesis` | evidence columns; versioned intervention rules; owner/time horizon/provenance | `evidence_provenance`; conflict preservation; claim limits | OULAD actual-data và API runtime pass; 3 prioritized actions, conflict preserved | `already_validated` |
| `S-B01` | `metric_snapshot` | performance metrics; status; thresholds; benchmarks; units | Type đã implement | Runtime verified trên UCI/OULAD | `already_validated` |
| `S-B02` | `metric_snapshot` | risk metrics; status; thresholds; units; availability mapping | Type đã implement; threshold và unavailable evidence pass | Runtime verified trên UCI/OULAD | `already_validated` |
| `S-B03` | `metric_snapshot` | engagement metrics; class benchmarks; units; missing-data status | Type đã implement | Runtime verified trên OULAD; UCI insufficient | `already_validated` |
| `S-T01` | `trend_series` | `time=assessment_order`; `metric=score_normalized`; benchmark/flags/actions | Không | Đúng: UCI 3; OULAD 5 points | `already_validated` |
| `S-T02` | `ranking` | `entity=competency_tag`; `metric=avg_score`; ascending | Không | Đúng: UCI 3; OULAD 5 rows | `already_validated` |
| `S-T03` | `multi_metric_comparison` | `entity=comparison_group`; `metric_key=metric_name`; `metric_value`; units/directions | Type đã implement; expected-group semantics pass | Đúng: UCI/OULAD 6 long-form rows each | `already_validated` |
| `S-T04` | `risk_flags` | flag name/value/threshold/triggered; severity/action optional | Không | Đúng: UCI/OULAD 5 flags each | `already_validated` |
| `S-T05` | `trend_series` | `time=week_number`; `metric=weekly_clicks`; drop flag | Không | Đúng trên OULAD 32 points; UCI insufficient | `already_validated` |
| `S-T06` | `trend_series` | `time=week_number`; `metric=weekly_clicks`; consistency evidence | Không | Đúng trên OULAD 32 points; UCI insufficient | `already_validated` |
| `S-T07` | `trend_series` | primary `score_series`; time/score; absence snapshot as context | `multi_dataset_evidence`; metric units; no unsupported causal claim đã implement | UCI actual-data validator pass: absence 1 + score 3; API runtime smoke pass | `already_validated` |
| `S-T08` | `trend_series` | `time=assessment_order`; `metric=submission_delay_days`; score/punctuality secondary evidence | Secondary metric association; `small_sample_caveat`; units/directions đã implement | OULAD actual-data validator pass: 5 raw rows, 4 valid delay points; API runtime smoke pass | `already_validated` |
| `S-T09` | `correlation_evidence` | `x=lifestyle_risk_score`; `y=avg_score`; `entity=student_id`; selected marker | `selected_entity_preservation` đã implement | UCI actual-data validator pass: 649 cohort rows, đúng 1 selected student; API runtime smoke pass | `already_validated` |
| `S-T10` | `categorical_distribution` | `category=resource_type`; `count=clicks`; ratio metrics | Không | Đúng trên OULAD 9 categories; UCI insufficient | `already_validated` |
| `S-T11` | `correlation_evidence` | `x=registration_lead_time`; `y=avg_score`; `entity=student_id` | `selected_entity_preservation` và percentile context đã implement | OULAD actual-data validator pass: 1988 cohort rows, đúng 1 selected student; API runtime smoke pass | `already_validated` |
| `S-T12` | `trend_series` | primary `submission_series`; time/delay/score; punctuality summary context | `multi_dataset_evidence`; secondary association; `small_sample_caveat` đã implement | OULAD actual-data validator pass: series 5 raw/4 valid + summary 1; API runtime smoke pass | `already_validated` |
| `S-T13` | `action_synthesis` | evidence columns; versioned action rules; priority/provenance | `evidence_provenance`; availability guard; conflict preservation; claim limits | UCI và OULAD actual-data/API runtime pass; unavailable engagement không sinh action | `already_validated` |
| `S-T14` | `correlation_evidence` | `x=social_balance_score`; `y=avg_score`; `entity=student_id`; selected marker | `selected_entity_preservation` đã implement | UCI actual-data validator pass: 649 cohort rows, đúng 1 selected student; API runtime smoke pass | `already_validated` |
| `S-T15` | `correlation_evidence` | `x=family_stability_score`; `y=avg_score`; `entity=student_id`; selected marker | `selected_entity_preservation` và `sensitive_context_policy` đã implement | UCI actual-data validator pass: 649 cohort rows, đúng 1 selected student; API runtime smoke pass | `already_validated` |

## 3. Review sâu 25 task chưa có type

### 3.1. Nhóm `requires_contract_extension` — 0 task

| Task | Vì sao type hiện có chưa đủ | Extension cần implement | Điều kiện để chuyển sang `ready_to_migrate` |
|---|---|---|---|
| — | — | — | Tất cả 52 task đã validated |

### 3.2. Nhóm `requires_new_type` — đã hoàn thành

| Type | Tasks | Trạng thái hoàn thành | Evidence |
|---|---|---|---|
| `action_synthesis` | `A-G16`, `A-S08`, `S-T13` | **Complete** — spec, schema, summarizer, self-test, actual-data validation, registry migration và API runtime verification đều pass | Rule catalog `v1`; complete action provenance; deterministic ordering; missing/conflict handling; sensitive trigger guard; LLM prompt boundary chỉ dùng action do summary cung cấp |
| `trend_comparison` dynamic groups | `A-C01` | **Complete** — spec, schema, summarizer, self-test, actual-data validation, registry migration và API runtime verification đều pass | Dynamic runtime groups; pairwise divergence evidence; deterministic alignment by `assessment_order+assessment_type`; no hard-coded student ID |
| `group_comparison` composite groups | `A-G05`, `A-G12` | **Complete** — spec, schema, summarizer, self-test, actual-data validation, registry migration và API runtime verification đều pass | Composite group keys; nested group series; focus summary for fail/withdrawn outcomes; metric unit/direction metadata |
| `trend_series` multi-evidence | `A-S06`, `S-T07`, `S-T08`, `S-T12` | **Complete** — spec, schema, summarizer, self-test, actual-data validation, registry migration và API runtime verification đều pass | Multi-dataset provenance; secondary metric associations; small-sample caveats; metric unit/direction metadata; causal claim guard |
| `correlation_evidence` selected entity | `S-T09`, `S-T11`, `S-T14`, `S-T15` | **Complete** — spec, schema, summarizer, self-test, actual-data validation, registry migration và API runtime verification đều pass | Selected entity preservation; raw selected x/y evidence; cohort coefficient context; percentile context; sensitive context policy |

Phase 6 đã xác minh task-aware runtime cho bốn actual cases:

- `A-G16 / SAMPLE_OULAD`;
- `A-S08 / SAMPLE_OULAD`;
- `S-T13 / SAMPLE_UCI_POR`;
- `S-T13 / SAMPLE_OULAD`.

Phần so sánh paired `baseline_first_20_rows` với
`task_aware_data_summarization` được tách khỏi Definition of Done của internal
type. So sánh toàn bộ phương pháp sẽ được thực hiện tập trung trong
`LLM judge v2` sau khi 11 contract extensions còn lại hoàn tất.

`metric_snapshot` không còn ở nhóm này. Type đã implement, self-test,
actual-data validation, registry migration và runtime verification đều pass:
7 applicable cases pass, 2 `insufficient_data`, 1 `blocked`, 0 fallback.

`multi_metric_comparison` không còn ở nhóm này. Type đã implement, self-test và actual-data validation đã pass; 6 task tương ứng đang ở trạng thái `ready_to_migrate`.

### 3.3. Runtime mismatch đã giải quyết trong Phase 3

| Task | Artifacts cũ | Artifacts sau Phase 3 | Kết luận |
|---|---|---|---|
| `S-T09` | `lifestyle_data`, 1 row | `lifestyle_risk_scatter`, 649 rows, 1 selected | Runtime shape verified; chuyển sang `requires_contract_extension` |
| `S-T14` | `social_data`, 1 row | `social_balance_scatter`, 649 rows, 1 selected | Runtime shape verified; chuyển sang `requires_contract_extension` |
| `S-T15` | `family_data`, 1 row | `family_context_scatter`, 649 rows, 1 selected | Runtime shape verified; chuyển sang `requires_contract_extension` |

SQL hiện tại, request params `batch_id`, `class_id`, `student_id` và direct analytics API đều đúng. Root cause là V1 artifacts cũ không còn đồng bộ với registry SQL hiện tại, không phải lỗi SQL/request runtime đang tồn tại.

## 4. Conditional metadata review

### 4.1. `multi_metric_comparison`

| Task | Units status | Directions status | Thresholds status | Conditional validation result |
|---|---|---|---|---|
| `A-C02` | Required: score ratio, clicks và active days khác unit | Required vì engagement dimensions có scale khác nhau | Không bắt buộc nếu chỉ comparison; bật khi task cần risk/status | Đạt — metadata đầy đủ, validator pass |
| `A-C03` | Required: score, ratio, count và risk score khác unit | Required để phân biệt higher/lower risk | Required nếu dùng flags/urgency | Đạt — metadata đầy đủ, validator pass |
| `A-C04` | Required: ordinal lifestyle scales và composite scores | Required; không mặc định higher luôn tốt | Chỉ required nếu dùng risk threshold | Đạt — metadata và sensitive policy pass |
| `A-C05` | Required: mixed categorical, score và count | Required cho disadvantage/support scores | Chỉ required nếu gắn structural-risk label | Đạt — metadata và sensitive policy pass |
| `A-C06` | Required: clicks, ratio và diversity score | Required để tránh coi clicks/diversity là cùng mục tiêu | Không bắt buộc cho descriptive comparison | Đạt — metadata pass; zero-activity semantics verified |
| `S-T03` | Required vì các metric có unit/scale khác nhau | Required để xác định above/below benchmark | Required nếu output gắn performance status | Đạt — metadata đầy đủ, validator pass |

### 4.2. `action_synthesis`

| Task | Action source hiện tại | Action rule version | Provenance status | Unsupported-action behavior |
|---|---|---|---|---|
| `A-G16` | `versioned_registry_rules`; không dùng `aiPromptHint` làm action source | `1.0.0` | Complete; 4 rules/actions runtime-verified | Emit structured `unsupported_actions` khi rules/evidence không đủ |
| `A-S08` | `versioned_registry_rules`; không dùng `aiPromptHint` làm action source | `1.0.0` | Complete; 3 matched actions và conflict evidence runtime-verified | Emit structured `unsupported_actions` khi rules/evidence không đủ |
| `S-T13` | `versioned_registry_rules`; không dùng `aiPromptHint` làm action source | `1.0.0` | Complete trên UCI/OULAD; availability guard verified | Emit structured `unsupported_actions`; unavailable evidence không được kích hoạt action |

## 5. Mapping coverage theo 11 types

| Proposed type | Tổng task sau mapping | Hiện đã validated | Chờ extension/new type/runtime |
|---|---:|---:|---:|
| `categorical_distribution` | 5 | 5 | 0 |
| `correlation_evidence` | 7 | 7 | 0 |
| `group_comparison` | 3 | 3 | 0 |
| `numeric_distribution` | 1 | 1 | 0 |
| `ranking` | 8 | 8 | 0 |
| `risk_flags` | 2 | 2 | 0 |
| `trend_comparison` | 2 | 2 | 0 |
| `trend_series` | 10 | 10 | 0 |
| `multi_metric_comparison` | 6 | 6 | 0 |
| `metric_snapshot` | 5 | 5 | 0 |
| `action_synthesis` | 3 | 3 | 0 |
| **Tổng** | **52** | **52** | **0** |

Bảng này chỉ dùng frozen 52-task evaluation manifest. `A-G18` có `trend_series` trong registry nhưng nằm ngoài scope và không được tính vào denominator.

## 6. Roadmap implementation tiếp theo

### Batch 0 — `action_synthesis`

Trạng thái: **COMPLETE**.

- `A-G16`, `A-S08`, `S-T13` đã migrate sang `action_synthesis`.
- Rule catalog, schema, validators, self-test và actual-data validation pass.
- API runtime trả `input_summary_type=action_synthesis`.
- LLM prompt/response boundary không dùng `aiPromptHint` hoặc legacy
  step-normalizer để tạo action ngoài `prioritized_actions`.

### Batch 1 — Mở rộng `trend_comparison`

Task: `A-C01`.

Kết quả implementation:

- `dynamic_comparison_groups` đã implement;
- tự nhận hai selected students từ runtime rows;
- giữ đầy đủ hai trajectory series;
- pairwise divergence evidence theo cùng assessment/time point;
- không hard-code student ID;
- actual-data validator pass trên `SAMPLE_UCI_POR` và `SAMPLE_OULAD`;
- registry migration đã hoàn tất;
- API runtime smoke qua `/api/ai/explain` pass với `input_summary_type=trend_comparison`, `degraded=false`.

Gate hoàn thành:

1. contract/spec;
2. typed config và parse-time validation;
3. summarizer self-test;
4. actual-data validation trên UCI và OULAD;
5. registry migration;
6. API runtime verification và evidence log.

### Batch 2 — Mở rộng `group_comparison`

Tasks: `A-G05`, `A-G12`.

Trạng thái: **COMPLETE**.

Capability đã thêm:

- `composite_group_keys`;
- nested/cross-tab outcome series;
- nhiều supporting metrics trên cùng composite group;
- metric units và denominator semantics;
- không cộng hoặc so sánh sai phần trăm giữa các group khác denominator.

Evidence:

- `A-G05`: `final_outcome × assessment_type`, actual-data validator pass trên OULAD `CCC_2014J` và UCI;
- `A-G12`: `group_value × final_outcome`, actual-data validator pass trên OULAD `CCC_2014J` và UCI;
- API runtime smoke pass qua `/api/ai/explain` với `input_summary_type=group_comparison`, `degraded=false`.

### Batch 3 — Mở rộng `trend_series`

Tasks: `A-S06`, `S-T07`, `S-T08`, `S-T12`.

Trạng thái: **COMPLETE**.

Capability đã thêm:

- `multi_dataset_evidence`;
- dataset role và source provenance;
- secondary metric association;
- metric units/directions;
- `small_sample_caveat`;
- cấm causal/significance claim khi evidence chỉ mang tính mô tả.

Evidence:

- `A-S06`, `S-T08`: delay–score/punctuality với sample nhỏ, OULAD actual-data validator pass;
- `S-T07`: absence snapshot + score series, UCI actual-data validator pass;
- `S-T12`: submission series + punctuality summary, OULAD actual-data validator pass;
- API runtime smoke pass qua `/api/ai/explain` với `input_summary_type=trend_series`, `degraded=false`.

### Batch 4 — Mở rộng `correlation_evidence`

Tasks: `S-T09`, `S-T11`, `S-T14`, `S-T15`.

Trạng thái: **COMPLETE**.

Capability đã thêm:

- `selected_entity_preservation`;
- selected entity luôn còn trong compact evidence;
- raw selected x/y values, cohort coefficient và cohort context;
- percentile/context evidence cho `S-T11`;
- `sensitive_context_policy` cho `S-T15`;
- không causal hoặc prescriptive claim từ lifestyle/social/family attributes.

Evidence:

- `S-T09`: UCI actual-data validator pass, 649 cohort rows, đúng 1 selected student;
- `S-T11`: OULAD actual-data validator pass, 1988 cohort rows, đúng 1 selected student và percentile/cohort context;
- `S-T14`: UCI actual-data validator pass, 649 cohort rows, đúng 1 selected student;
- `S-T15`: UCI actual-data validator pass, 649 cohort rows, đúng 1 selected student và sensitive context policy;
- API runtime smoke pass qua `/api/ai/explain` với `input_summary_type=correlation_evidence`, `degraded=false`.

### Gate chung cho mỗi batch

Không migrate registry trước khi batch đạt đủ:

1. spec và output contract;
2. schema/config validation;
3. deterministic self-test và regression các task cũ;
4. actual-data validation cho mọi applicable dataset;
5. registry migration;
6. post-migration API runtime verification;
7. implementation report và evidence logs.

### Batch 5 — `LLM judge v2`

Chỉ bắt đầu sau khi Batch 1–4 hoàn tất.

Phạm vi judge giữ đúng hai external modes:

- `baseline_first_20_rows`;
- `task_aware_data_summarization`.

Judge v2 sẽ dùng matrix đã refresh sau migration, paired records cùng
`dataset_id + task_id`, provenance đầy đủ và taxonomy `not_comparable` rõ ràng.
Không dùng kết quả judge cũ để đánh giá các task trước khi contract extension
và runtime artifacts được cập nhật.

## 7. Definition of Done của Phase 2

- [x] Đúng 52 task từ frozen manifest được liệt kê.
- [x] Mỗi task có đúng một proposed type trong 11 frozen types.
- [x] Mỗi task có required config, extension, runtime-shape verdict và status.
- [x] 25 task chưa có type được kiểm tra bằng actual rows/columns, không chỉ tên task.
- [x] Conditional metadata của `multi_metric_comparison` được đánh giá.
- [x] Action provenance của `action_synthesis` được đánh giá.
- [x] Không sửa implementation hoặc registry.
- [x] Không tạo type thứ 12.
