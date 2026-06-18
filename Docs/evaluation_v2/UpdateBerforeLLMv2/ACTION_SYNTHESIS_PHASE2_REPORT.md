# Action Synthesis Phase 2 Report

- Ngày thực hiện: 2026-06-18
- Phạm vi: request/config schema và registry-to-request transport
- Trạng thái: **PHASE 2 IMPLEMENTED**
- Chưa thực hiện: `action_synthesis` summarizer và registry migration

## 1. Kết quả

Đã mở rộng `AISummaryConfig` để tiếp nhận action-synthesis contract từ Node:

```text
evidence_columns
evidence_dataset_roles
action_source
action_rule_set_id
action_rule_version
action_evidence_contract
action_derived_evidence
action_conflict_rules
action_rules
priority_column
owner_column
time_horizon_column
trigger_columns
max_actions
provenance_required_fields
require_complete_action_provenance
unsupported_action_behavior
sensitive_action_policy
require_sensitive_action_policy
```

Đã thêm typed nested models:

```text
ActionEvidenceConfig
ActionDerivedEvidenceConfig
ActionRuleCondition
ActionRuleTrigger
ActionDefinitionConfig
ActionRuleConfig
ActionConflictRuleConfig
```

Các trigger chỉ là structured predicates. Không nhận free-text expression hoặc
executable code.

## 2. Backend transport

`buildAISummaryConfig(task)` đã map các registry fields tương ứng:

```text
aiEvidenceColumns
aiEvidenceDatasetRoles
aiActionSource
aiActionRuleSetId
aiActionRuleVersion
aiActionEvidenceContract
aiActionDerivedEvidence
aiActionConflictRules
aiActionRules
aiPriorityColumn
aiOwnerColumn
aiTimeHorizonColumn
aiTriggerColumns
aiMaxActions
aiProvenanceRequiredFields
aiRequireCompleteActionProvenance
aiUnsupportedActionBehavior
aiSensitiveActionPolicy
aiRequireSensitiveActionPolicy
```

Phase này chưa thêm các fields trên vào `A-G16`, `A-S08`, `S-T13` trong
registry.

## 3. Parse-time validation

Pydantic chạy parse-time validation khi FastAPI nhận `ExplainRequest`.

Parse-time kiểm tra:

- primitive types, enums và semantic-version format;
- nested models không nhận unknown fields;
- trigger có ít nhất một condition;
- unary/binary operator có đúng operand;
- evidence, derived evidence, rule và conflict IDs không trùng;
- numerator/denominator của derived evidence đã được khai báo;
- rule chỉ tham chiếu raw/derived evidence đã khai báo;
- availability-aware evidence có availability guard trong nhóm `all`;
- sensitive evidence không được phép làm trigger;
- versioned-rule source có rule-set ID, version và rules;
- candidate-column source có `action_columns`;
- global provenance config bao phủ bộ trường tối thiểu bắt buộc;
- mỗi rule bao phủ global và mandatory provenance requirements;
- configured `trigger_columns` thuộc evidence contract.

Parse-time không kiểm tra runtime row.

## 4. Summarizer-time validation boundary

Summarizer tương lai phải kiểm tra:

- configured dataset labels có tồn tại;
- đúng runtime row/column và raw value;
- numeric string có parse được hay không;
- null và availability=false;
- derived evidence có tính được hay không;
- rule/conflict nào match actual evidence;
- evidence-item IDs và action-evidence links;
- provenance của từng action có complete hay không;
- deduplication, priority ordering và `max_actions`;
- `unsupported_actions`, `missing_evidence`, `conflicting_evidence` và
  warnings.

Config chỉ có:

```text
summary_type = action_synthesis
unsupported_action_behavior = emit_unsupported_actions
```

vẫn parse được. Việc thiếu action source/rules trong case này được cố ý defer
cho summarizer để trả structured `unsupported_actions`, thay vì biến runtime
evidence insufficiency thành HTTP 422.

Nếu `action_source=versioned_registry_rules` đã được khai báo nhưng thiếu
rule-set ID/version/rules thì request bị reject ở parse-time vì đây là
malformed config.

## 5. Verification artifacts

Validator:

```text
validate_action_synthesis_request_schema.py
```

Output:

```text
action_synthesis_request_schema_validation.json
```

Validator sử dụng trực tiếp canonical Phase 1 rule catalog để kiểm tra ba
request contracts và negative cases.

## 6. Phase boundary

Phase 2 không:

- thêm dispatcher `action_synthesis`;
- implement `_summarize_action_synthesis`;
- thay đổi output summary;
- migrate registry;
- chạy LLM hoặc evidence-log generation.

Phase tiếp theo là implement summarizer và self-test dựa trên contract đã
được parse thành typed models.
