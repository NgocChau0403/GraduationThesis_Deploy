# Action Synthesis Phase 4 Report

- Ngày thực hiện: 2026-06-18
- Phạm vi: self-test và actual-data validation
- Trạng thái: **PHASE 4 COMPLETE**
- Backend target: `http://localhost:4000`
- AI Service target: `http://localhost:8000`
- Chưa thực hiện: registry migration

## 1. Service readiness

AI Service:

```text
GET /health = 200
GET /openapi.json = 200
```

OpenAPI đang chạy đã chứa:

```text
evidence_columns
evidence_dataset_roles
action_rules
action_rule_version
priority_column
owner_column
time_horizon_column
trigger_columns
max_actions
provenance_required_fields
sensitive_action_policy
```

Malformed versioned-rule config bị FastAPI/Pydantic reject:

```text
POST /explain = 422
```

Việc reject xảy ra trước LLM call.

Backend không có route `/health`, vì vậy `GET /health = 404` không được xem là
service failure. Các route thật:

```text
GET /api/classes
GET /api/students
POST /api/analytics/run
```

đều hoạt động và trả actual data.

## 2. Self-test coverage

Self-test:

```text
python debug_ai_summary.py --self-test-action-synthesis
```

Đã bao phủ đủ acceptance cases:

| Acceptance case | Evidence |
|---|---|
| Rule match và không match | Matched/unmatched rule evaluations của cả ba rule sets |
| Nhiều evidence cùng tạo một action | `A-S08-R01` dùng `at_risk_score` và `at_risk_label` |
| Nhiều rules tạo action trùng nhau | Duplicate `A-G16` rule được deduplicate; union rule IDs/evidence |
| Conflicting evidence | `A-S08-C01`, `S-T13-C01` |
| Missing/unavailable evidence | UCI engagement unavailable; OULAD absence/lifestyle null |
| Không có rules | Structured `unsupported_actions`, không fallback generic |
| Không tạo urgency khi thiếu severity/threshold | Candidate action thiếu priority trả `priority=null` |
| Không tạo action từ sensitive attributes | `support_score`, `lifestyle_risk_score` không xuất hiện trong action links |
| Mọi action có rule ID/version/evidence links | Provenance assertions cho mọi prioritized action |
| Deterministic ordering | Priority desc, time horizon asc, action ID asc; repeated result identical |

Self-test result:

```text
PASS
```

## 3. Actual-data validation

Validator:

```text
validate_action_synthesis_actual_data.py
```

Artifact:

```text
action_synthesis_actual_data_validation.json
```

Validator:

1. gọi live `POST /api/analytics/run`;
2. dùng canonical Phase 1 rule catalog;
3. tạo typed `AISummaryConfig`;
4. chạy `_summarize_action_synthesis`;
5. chạy lại lần hai để kiểm tra determinism;
6. kiểm tra output contract, matched rules, action order, conflicts và
   provenance.

Kết quả:

```text
case_count = 4
passed = 4
failed = 0
overall_pass = true
```

## 4. Case results

### 4.1. `A-G16` — OULAD

Actual class:

```text
SAMPLE_OULAD_CLASS_CCC_2014J
```

Actual evidence:

```text
low_engagement_count = 1240
high_risk_count = 906
hardest_assessment = 24299
best_resource_type = quiz
total_students = 1998
```

Matched:

```text
A-G16-R01
A-G16-R02
A-G16-R03
A-G16-R04
```

Actions:

```text
admin_launch_engagement_outreach
admin_review_high_risk_caseload
admin_review_assessment_support
admin_review_most_used_resource_format
```

Result: **PASS**

### 4.2. `A-S08` — OULAD

Actual student:

```text
SAMPLE_OULAD_STU_100788
```

Matched:

```text
A-S08-R01
A-S08-R02
A-S08-R03
```

Actions:

```text
staff_review_student_risk_profile
staff_create_submission_support_plan
staff_review_recent_assessment_pattern
```

Conflict:

```text
A-S08-C01
```

`staff_review_student_risk_profile` liên kết đồng thời:

```text
at_risk_score
at_risk_label
```

`punctuality_rate="0"` giữ raw string và parsed numeric `0.0`.

Result: **PASS**

### 4.3. `S-T13` — UCI

Actual student:

```text
SAMPLE_UCI_POR_STU_000001
```

Actual runtime hiện trả:

```text
at_risk_score = 1
```

Artifact cũ trả `0`; thay đổi này không ảnh hưởng expected actions.

Matched:

```text
S-T13-R02
S-T13-R05
```

Actions:

```text
student_create_attendance_routine
student_set_next_score_target
```

Availability guard:

```text
engagement_score = 0
engagement_score_available = false
S-T13-R04 = unmatched
```

Không sinh `student_rebuild_engagement_routine`.

Result: **PASS**

### 4.4. `S-T13` — OULAD

Actual student:

```text
SAMPLE_OULAD_STU_100788
```

Matched:

```text
S-T13-R03
S-T13-R06
```

Actions:

```text
student_request_advisor_check_in
student_review_recent_assessment_feedback
```

Conflict:

```text
S-T13-C01
```

Null evidence được giữ:

```text
absence_rate = null
lifestyle_risk_score = null
```

Result: **PASS**

## 5. Provenance verification

Mọi actual-data action đều có:

```text
rule_id
rule_version
evidence_item_ids
provenance_status = complete
```

Mọi linked evidence ID tồn tại trong `evidence_items`.

Không action nào liên kết:

```text
support_score
lifestyle_risk_score
```

Tất cả bốn case cho output giống hệt khi chạy summarizer hai lần.

## 6. Regression verification

Pass:

- Python compile;
- action-synthesis self-test;
- toàn bộ existing AI summary self-tests;
- Phase 1 validator;
- Phase 2 validator;
- live actual-data validator;
- `git diff --check`.

## 7. Migration readiness

Phase 4 đã đáp ứng acceptance gate để chuyển sang registry migration:

```text
A-G16  OULAD  ready
A-S08  OULAD  ready
S-T13  UCI    ready
S-T13  OULAD  ready
```

Registry migration vẫn phải là phase riêng. Sau migration cần chạy lại cùng
validator qua transport config thực từ registry và kiểm tra không còn
`generic_fallback`.

