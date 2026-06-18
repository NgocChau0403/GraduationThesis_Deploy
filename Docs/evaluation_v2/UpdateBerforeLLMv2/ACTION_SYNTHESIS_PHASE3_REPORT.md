# Action Synthesis Phase 3 Report

- Ngày thực hiện: 2026-06-18
- Phạm vi: summarizer implementation và self-test
- Trạng thái: **PHASE 3 COMPLETE**
- Chưa thực hiện: registry migration và post-migration runtime verification

## 1. Readiness audit

Trước implementation:

```text
Phase 1 rule/provenance validation = pass
Phase 2 request-schema validation = pass
Phase 2 failed cases = 0
```

Không có blocker cần quay lại sửa architecture. Một boundary đã được giữ:
conflict detector được phép đọc context không được dùng làm action trigger,
nhưng context đó không thể tạo action.

## 2. Dispatcher

Đã thêm:

```text
summary_type = action_synthesis
-> BaseExplanationStrategy._summarize_action_synthesis(req)
```

Không thêm top-level summary method. `action_synthesis` chỉ chạy bên trong:

```text
task_aware_data_summarization
```

## 3. Evidence normalization

Summarizer:

- đọc dataset roles từ `evidence_dataset_roles`;
- giữ dataset label, role, row index và raw column;
- giữ đồng thời `raw_value` và `parsed_value`;
- parse numeric strings nhưng không thay raw value;
- giữ `availability_column` và raw availability value;
- đánh dấu sensitive evidence;
- không thay null hoặc unavailable evidence bằng zero;
- tính `safe_divide` derived evidence;
- gắn derived evidence tới cả numerator và denominator evidence IDs.

Evidence ID deterministic:

```text
ev-{dataset_label}-{row_index}-{column}
ev-derived-{derived_evidence_id}
```

## 4. Rule evaluation

Đã implement các operators:

```text
eq
neq
gt
gte
lt
lte
is_present
is_true
```

Mỗi rule evaluation giữ:

```text
rule_id
rule_version
matched
condition_results
evidence_item_ids
missing_evidence
blocked_by_unavailable_evidence
```

Availability-aware evidence không match khi availability=false. Case:

```text
engagement_score = 0
engagement_score_available = false
```

không kích hoạt action low-engagement của `S-T13`.

## 5. Action synthesis

Luồng đã implement:

1. normalize evidence;
2. compute derived evidence;
3. evaluate rules;
4. tạo action candidates từ matched rules;
5. reject candidate có incomplete provenance;
6. evaluate conflicting evidence;
7. deduplicate theo `action_id`;
8. union rule IDs, evidence links và claim limits;
9. lấy priority cao nhất đã được rule khai báo;
10. sort deterministic;
11. giới hạn `max_actions`.

Deterministic order:

```text
priority descending
time_horizon_days ascending
action_id ascending
```

Priority order:

```text
critical > high > medium > low
```

Summarizer cũng hỗ trợ `candidate_action_columns`, nhưng canonical v1 của ba
task sử dụng `versioned_registry_rules`.

## 6. Output contract

Output đã có:

```text
source_datasets
evidence_items
prioritized_actions
action_evidence_links
unsupported_actions
conflicting_evidence
missing_evidence
summarization_warnings
```

Ngoài ra giữ:

```text
action_rule_set_id
action_rule_version
rule_evaluations
```

Không fallback sang `generic_fallback` khi action source/rules hoặc runtime
evidence không đủ. Summarizer trả structured `unsupported_actions`.

## 7. Provenance và compact output

Mỗi prioritized action giữ:

```text
action_id
rule_ids
rule_version
evidence_item_ids
provenance_status
```

`_dump_summary()` đã được cập nhật để minimal compact output vẫn giữ toàn bộ
action contract và provenance:

```text
source_datasets
evidence_items
prioritized_actions
action_evidence_links
unsupported_actions
conflicting_evidence
missing_evidence
action_rule_set_id
action_rule_version
```

`rule_evaluations` có thể bị loại khỏi compact prompt vì đây là diagnostic
detail; evidence items và action links không bị loại.

## 8. Self-test coverage

Đã thêm:

```text
debug_ai_summary.py --self-test-action-synthesis
```

Self-test bao phủ:

- `A-G16` cohort ratios và 4 matched actions;
- `A-S08` numeric string preservation và conflicting outcome evidence;
- `S-T13` UCI availability=false;
- `S-T13` OULAD null evidence và mixed-evidence conflict;
- missing action source → `unsupported_actions`;
- deterministic priority ordering;
- `max_actions` cap;
- duplicate action ID và rule/evidence union;
- sensitive evidence không xuất hiện trong action links;
- compact output vẫn giữ linked provenance;
- baseline/task-aware top-level mode boundary.

## 9. Regression verification

Pass:

- Python compile:
  - `AIService/strategies/base.py`
  - `AIService/debug_ai_summary.py`
- action-synthesis self-test;
- generic summary self-test;
- categorical distribution;
- risk flags;
- trend series;
- ranking;
- numeric distribution;
- group comparison;
- correlation evidence;
- multi-metric comparison;
- metric snapshot;
- Phase 1 rule validation;
- Phase 2 request-schema validation;
- `git diff --check`.

Risk-flags self-test được đồng bộ với behavior hiện tại: khi registry cấu hình
optional description/action/support columns nhưng runtime dataset không có,
summarizer phải giữ ba warnings explicit thay vì kỳ vọng warning list rỗng.

## 10. Phase boundary

Phase 3 không:

- thêm `aiSummaryType=action_synthesis` vào registry;
- thêm rule catalog vào ba registry records;
- chạy backend/API runtime sau migration;
- generate paired explanation evidence logs;
- chạy LLM Judge.

Phase tiếp theo nên là pre-migration actual-data validation, sau đó mới migrate
`A-G16`, `A-S08`, `S-T13`.

