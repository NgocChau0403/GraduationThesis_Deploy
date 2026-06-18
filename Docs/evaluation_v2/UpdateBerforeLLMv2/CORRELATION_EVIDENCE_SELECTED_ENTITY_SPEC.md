# Correlation Evidence Selected Entity Spec

Date: 2026-06-18

Scope: Batch 4 extension for `correlation_evidence`.

Tasks:

- `S-T09` — lifestyle risk scatter, selected UCI student.
- `S-T11` — registration lead time scatter, selected OULAD student.
- `S-T14` — social balance scatter, selected UCI student.
- `S-T15` — family context scatter, selected UCI student.

## Contract

Registry fields:

```text
aiSummaryType = correlation_evidence
aiXColumn = <x metric>
aiYColumn = avg_score
aiEntityColumn = student_id
aiSelectedEntityColumn = <boolean selected marker>
aiLabelColumns = [...]
aiSensitiveColumns = [...] optional
aiSensitiveContextPolicy = descriptive_only optional
aiMinimumSampleSize = 30
```

## Output additions

`correlation_evidence` must preserve:

- `selected_entity_column`
- `selected_entity_evidence`
- `missing_selected_entity_evidence`
- selected raw x/y values
- selected entity id
- cohort coefficient context
- percentile/cohort average context when present
- sensitive context guardrails when sensitive columns are configured

## Guardrails

- Selected entity preservation is separate from outlier selection.
- Do not infer causality from lifestyle, social, registration, or family context.
- Sensitive/background context is descriptive only and must not become prescriptive.
