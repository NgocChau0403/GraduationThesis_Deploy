# Action Synthesis Phase 1 Report

- Ngày thực hiện: 2026-06-18
- Phạm vi: action rules và evidence provenance
- Trạng thái: **PHASE 1 COMPLETE**
- Chưa thực hiện: summarizer implementation và registry migration

## 1. Kết quả

Phase 1 đã chốt action source cho `A-G16`, `A-S08`, `S-T13`:

```text
versioned_registry_rules
```

Không dùng `aiPromptHint` làm action rule và không cho LLM tự tạo action từ
evidence signals.

Đã tạo:

```text
ACTION_SYNTHESIS_SPEC.md
action_synthesis_rules.schema.json
action_synthesis_rules.v1.json
action_synthesis_rule_validation_fixtures.json
validate_action_synthesis_rules.py
action_synthesis_rule_validation.json
```

## 2. Canonical rule catalog

| Task | Rules | Audience | Max actions |
|---|---:|---|---:|
| `A-G16` | 4 | admin/academic leadership | 5 |
| `A-S08` | 4 | advisor/admin/tutor | 5 |
| `S-T13` | 6 | student | 5 |
| **Tổng** | **14** |  |  |

Mỗi rule có:

- stable rule ID và semantic version;
- machine-readable trigger;
- action ID và action text;
- priority, owner, time horizon và support category;
- claim limits;
- required provenance fields.

## 3. Provenance contract

Mỗi action phải truy được về:

```text
dataset label
dataset role
row index
raw backend column
raw value
parsed value
unit
availability state nếu áp dụng
rule ID
rule version
```

Derived cohort ratios của `A-G16` phải giữ provenance tới cả numerator và
denominator.

Action không có provenance complete không được xuất hiện trong
`prioritized_actions`.

## 4. Guardrails đã khóa

- `support_score` và `lifestyle_risk_score` là sensitive context, không được
  làm action trigger.
- `engagement_score` của `S-T13` chỉ được dùng khi
  `engagement_score_available=true`.
- `engagement_score=0` với availability=false không được xem là low
  engagement.
- `best_resource_type` của `A-G16` được hiểu là resource type có nhiều clicks
  nhất, không phải resource hiệu quả nhất.
- `hardest_assessment` không đi kèm fail-rate value trong runtime row; action
  không được nêu hoặc đoán rate.
- Numeric strings như `punctuality_rate="0"` được parse để evaluate nhưng raw
  value phải được giữ.
- Missing/null evidence không được thay bằng zero.
- Conflicting evidence phải được giữ và cảnh báo.

## 5. Static validation

Canonical catalog:

```text
catalog_valid = true
catalog_errors = 0
```

Negative/positive fixtures:

```text
fixture_count = 8
fixture_passed = 8
fixture_failed = 0
```

Fixtures bao phủ:

- sensitive trigger;
- missing rule version;
- availability-aware evidence thiếu guard;
- unknown evidence reference;
- thiếu provenance fields;
- dùng `aiPromptHint` làm action source;
- effectiveness overclaim từ `best_resource_type`;
- canonical valid catalog.

## 6. Actual-row rule evaluation

Đã evaluate rule catalog trên 4 actual runtime rows đã lưu trong V1 artifacts:

```text
runtime_case_count = 4
runtime_case_passed = 4
runtime_case_failed = 0
```

Matched results:

| Runtime case | Matched rules | Conflict |
|---|---|---|
| `A-G16` OULAD | `R01`, `R02`, `R03`, `R04` | Không |
| `A-S08` OULAD | `R01`, `R02`, `R03` | `A-S08-C01` |
| `S-T13` UCI | `R02`, `R05` | Không |
| `S-T13` OULAD | `R03`, `R06` | `S-T13-C01` |

Case `S-T13` UCI xác nhận:

```text
engagement_score = 0
engagement_score_available = false
S-T13-R04 = not matched
```

## 7. Verification

Pass:

- Python compile của `validate_action_synthesis_rules.py`;
- canonical semantic validator;
- 8 static fixtures;
- 4 actual-row runtime cases;
- JSON parsing của schema/catalog/fixtures;
- `git diff --check`.

Bundled runtime không có package `jsonschema`, vì vậy JSON Schema file chưa
được chạy qua external `jsonschema` library. Canonical catalog vẫn được kiểm
tra bằng validator độc lập trong repo, bao gồm các constraints semantic mà
JSON Schema thuần không kiểm tra được.

## 8. Phase boundary

Phase 1 không sửa:

- `AIService/schemas.py`;
- `AIService/strategies/base.py`;
- `AIService/debug_ai_summary.py`;
- `Backend/src/controllers/ai.controller.js`;
- `Backend/src/config/taskRegistry.json`.

Phase tiếp theo có thể bắt đầu từ contract đã frozen:

1. mở rộng `AISummaryConfig`;
2. thêm transport mapping từ registry;
3. implement `_summarize_action_synthesis`;
4. thêm self-test;
5. chạy actual-data validation trước registry migration.

