# Action Synthesis Phase 1 Spec

- Ngày chốt spec: 2026-06-18
- Rule catalog version: `action_synthesis_rules_v1`
- Phạm vi task: `A-G16`, `A-S08`, `S-T13`
- Trạng thái: **PHASE 1 — RULES AND PROVENANCE DEFINED**

## 1. Mục tiêu và phạm vi

Spec này chốt action rules và evidence provenance trước khi implement
`action_synthesis`.

Phase 1 thực hiện:

- audit actual runtime evidence của ba task;
- định nghĩa versioned, testable action rules;
- định nghĩa provenance contract;
- định nghĩa unsupported, missing và conflicting-evidence behavior;
- tạo machine-readable schema, rule catalog, fixtures và validator.

Phase 1 chưa:

- sửa `AIService/schemas.py`;
- implement `_summarize_action_synthesis`;
- thêm dispatcher;
- sửa `Backend/src/controllers/ai.controller.js`;
- migrate `aiSummaryType` hoặc action-rule metadata vào registry;
- regenerate explanation/evidence logs;
- chạy LLM Judge.

`action_synthesis` vẫn là internal summarizer của
`task_aware_data_summarization`, không phải top-level method thứ ba.

## 2. Action source decision

Ba analytics output hiện chỉ trả evidence signals, không trả candidate action
columns. `aiPromptHint` chỉ là instruction bằng natural language và không được
xem là action source.

Phase 1 chọn:

```text
action_source = versioned_registry_rules
```

Rule catalog canonical:

```text
action_synthesis_rules.v1.json
```

Mỗi rule phải:

- có stable `rule_id`;
- trỏ tới `rule_set_id` và `rule_version`;
- có trigger machine-readable;
- khai báo action, priority, owner và time horizon;
- khai báo provenance requirements;
- không dùng sensitive-only evidence làm trigger.

## 3. Runtime evidence audit

### 3.1. `A-G16`

Actual OULAD row:

```json
{
  "class_id": "SAMPLE_OULAD_CLASS_CCC_2014J",
  "low_engagement_count": 1240,
  "high_risk_count": 906,
  "hardest_assessment": "24299",
  "best_resource_type": "quiz",
  "total_students": 1998
}
```

Semantic constraints:

- `low_engagement_count / total_students` là cohort ratio có thể dùng làm
  trigger.
- `high_risk_count / total_students` là cohort ratio có thể dùng làm trigger.
- `hardest_assessment` được SQL chọn theo fail rate cao nhất nhưng runtime row
  không trả fail rate; action chỉ được yêu cầu review/support, không được nêu
  mức fail rate.
- `best_resource_type` thực chất được SQL chọn theo tổng engagement clicks.
  Trong rule catalog nó được gắn semantic alias
  `most_used_resource_type`. Không được claim đây là resource hiệu quả nhất
  hoặc gây ra kết quả tốt hơn.

### 3.2. `A-S08`

Actual OULAD row:

```json
{
  "avg_score": 91.2,
  "performance_trend": -0.7187500000000001,
  "engagement_score": 0.20237855036820618,
  "punctuality_rate": "0",
  "early_warning_week": 0,
  "support_score": 0,
  "at_risk_score": 3,
  "at_risk_label": "high",
  "final_outcome": "Distinction"
}
```

Semantic constraints:

- numeric strings như `punctuality_rate = "0"` được phép parse thành number
  nhưng raw value phải được giữ trong provenance;
- `support_score` là sensitive/background context và không được làm trigger;
- `final_outcome = Distinction` có thể conflict với high-risk signals hiện tại;
  conflict phải được giữ, không được dùng để xóa các trigger cụ thể;
- `early_warning_week` chưa đủ semantic contract để tự tạo action và không
  được dùng trong rule catalog v1.

### 3.3. `S-T13`

Actual UCI row:

```json
{
  "avg_score": 41.25,
  "performance_trend": 27.5,
  "engagement_score": 0,
  "engagement_score_available": false,
  "absence_rate": 1,
  "lifestyle_risk_score": 0.375,
  "score_strategy": "weighted_by_assessment_weight",
  "score_scale": 100,
  "pass_threshold": 40,
  "target_threshold": 70,
  "at_risk_score": 0,
  "at_risk_label": "low"
}
```

Actual OULAD row:

```json
{
  "avg_score": 94.34,
  "performance_trend": -0.7187500000000001,
  "engagement_score": 0.20237855036820618,
  "engagement_score_available": true,
  "absence_rate": null,
  "lifestyle_risk_score": null,
  "score_strategy": "weighted_by_assessment_weight",
  "score_scale": 100,
  "pass_threshold": 40,
  "target_threshold": 70,
  "at_risk_score": 3,
  "at_risk_label": "high"
}
```

Semantic constraints:

- `engagement_score` chỉ được dùng khi
  `engagement_score_available = true`;
- raw `engagement_score = 0` với availability=false không phải low-engagement
  evidence;
- `lifestyle_risk_score` là sensitive context, không được làm trigger;
- score action phải dùng runtime `pass_threshold` và `target_threshold`,
  không hard-code score scale;
- `absence_rate = null` là missing evidence, không phải zero absence.

## 4. Rule catalog contract

### 4.1. Catalog-level fields

```text
catalog_id
catalog_version
summary_type
action_source
created_at
rule_sets
```

Fixed values:

```text
summary_type = action_synthesis
action_source = versioned_registry_rules
```

### 4.2. Rule-set fields

```text
rule_set_id
task_id
rule_version
audience
source_dataset_roles
evidence_contract
derived_evidence
conflict_rules
rules
max_actions
unsupported_action_behavior
```

`unsupported_action_behavior` của v1 phải là:

```text
emit_unsupported_actions
```

### 4.3. Evidence contract

Mỗi evidence field khai báo:

```text
column
role
unit
required
nullable
availability_column
sensitive
allowed_as_trigger
semantic_alias
semantic_note
```

Rules:

- `sensitive=true` bắt buộc `allowed_as_trigger=false`;
- evidence có `availability_column` chỉ được evaluate khi availability=true;
- raw value và parsed value phải tách biệt trong output provenance;
- `semantic_alias` không được thay đổi raw backend column.

### 4.4. Derived evidence

V1 chỉ hỗ trợ phép chia ratio:

```json
{
  "evidence_id": "low_engagement_rate",
  "operation": "safe_divide",
  "numerator_column": "low_engagement_count",
  "denominator_column": "total_students",
  "unit": "ratio_0_1",
  "zero_denominator_behavior": "missing"
}
```

Derived evidence phải giữ provenance tới cả numerator và denominator.

### 4.5. Trigger expression

V1 hỗ trợ:

```text
all
any
```

Mỗi condition dùng một trong các operand:

```text
evidence_id + operator + value
evidence_id + operator + compare_to_evidence_id
```

Supported operators:

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

Không cho phép free-text expression hoặc executable code.

### 4.6. Action definition

```text
action_id
action_text
priority
owner
time_horizon_days
support_category
claim_limits
```

`priority` chỉ nhận:

```text
critical
high
medium
low
```

V1 không dùng `critical`. Summarizer tương lai không được nâng priority cao
hơn giá trị rule nếu không có rule explicit khác.

## 5. Provenance contract

### 5.1. Evidence item

Mỗi evaluated evidence item phải có:

```json
{
  "evidence_item_id": "ev-...",
  "task_id": "S-T13",
  "dataset_label": "synthesis_data",
  "dataset_role": "primary_evidence",
  "row_index": 0,
  "column": "engagement_score",
  "raw_value": 0,
  "parsed_value": 0,
  "unit": "ratio_0_1",
  "available": false,
  "availability_column": "engagement_score_available",
  "availability_raw_value": false,
  "sensitive": false
}
```

Không được bỏ `raw_value` khi parse numeric string.

### 5.2. Rule evaluation

```json
{
  "rule_id": "S-T13-R04",
  "rule_version": "1.0.0",
  "matched": false,
  "condition_results": [],
  "evidence_item_ids": [],
  "missing_evidence": [],
  "blocked_by_unavailable_evidence": true
}
```

### 5.3. Prioritized action

```json
{
  "action_id": "student_rebuild_engagement_routine",
  "rule_id": "S-T13-R04",
  "rule_version": "1.0.0",
  "priority": "medium",
  "owner": "student",
  "time_horizon_days": 7,
  "evidence_item_ids": ["ev-..."],
  "provenance_status": "complete"
}
```

Action chỉ được phát ra khi:

- rule matched;
- mọi required evidence cho trigger có provenance;
- không có unavailable evidence bị dùng như observed evidence;
- provenance status là `complete`.

## 6. Priority, deduplication và conflicts

Priority order:

```text
critical > high > medium > low
```

Khi nhiều rules tạo cùng `action_id`:

- giữ một action;
- lấy priority cao nhất đã được rule định nghĩa;
- union evidence links;
- giữ toàn bộ matched `rule_id`;
- không tự nâng priority.

Conflict v1:

- `A-S08`: `final_outcome=Distinction` cùng high-risk/current negative signals
  phải được ghi vào `conflicting_evidence`;
- `S-T13`: score đạt/vượt target nhưng `at_risk_label=high` phải được ghi là
  mixed evidence;
- conflict không tự hủy rule cụ thể;
- LLM phải diễn đạt uncertainty, không được xóa raw conflict.

## 7. Unsupported and missing behavior

Output phải có `unsupported_actions` khi:

- rule set không tồn tại;
- catalog/rule version không hợp lệ;
- input chỉ có evidence nhưng không có action rules/candidate actions;
- rule tham chiếu missing required evidence và không rule nào khác tạo được
  action;
- mọi potential trigger bị chặn bởi unavailable evidence.

Missing evidence:

- column không tồn tại;
- raw value là `null`;
- availability=false;
- derived denominator bằng zero;
- numeric string không parse được.

Missing evidence không được thay bằng zero.

## 8. Safety guardrails

- Không tạo action từ demographic, family, socioeconomic, disability,
  lifestyle hoặc support context.
- `support_score` và `lifestyle_risk_score` không được làm trigger trong v1.
- Không causal claim từ correlation, background hoặc engagement signal.
- `best_resource_type` không được diễn giải là “best-performing”.
- Không tạo urgency từ label văn bản nếu rule không khai báo priority.
- Không tạo action mới từ `aiPromptHint`.
- LLM chỉ được paraphrase action đã có trong `prioritized_actions`.

## 9. Rule catalog v1 summary

| Task | Rule set | Số rules | Audience | Max actions |
|---|---|---:|---|---:|
| `A-G16` | `A-G16.action_synthesis` | 4 | admin/academic leadership | 5 |
| `A-S08` | `A-S08.action_synthesis` | 4 | advisor/tutor/admin | 5 |
| `S-T13` | `S-T13.action_synthesis` | 6 | student | 5 |

Canonical details nằm trong `action_synthesis_rules.v1.json`.

## 10. Phase 1 Definition of Done

- [x] Actual runtime evidence của 3 task được audit.
- [x] Action source được chốt là versioned registry rules.
- [x] Rule schema machine-readable được định nghĩa.
- [x] Rule catalog v1 được định nghĩa cho cả 3 task.
- [x] Evidence/action provenance contract được chốt.
- [x] Missing, conflict và unsupported behavior được chốt.
- [x] Sensitive-only triggers bị cấm.
- [x] Validator và positive/negative fixtures được tạo.
- [x] Không sửa implementation hoặc registry.

