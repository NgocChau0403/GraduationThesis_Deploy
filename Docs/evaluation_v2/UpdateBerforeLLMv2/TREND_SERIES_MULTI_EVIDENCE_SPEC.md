# Trend Series Multi Evidence Spec

Date: 2026-06-18

Scope: Batch 3 extension for `trend_series`.

Tasks:

- `A-S06` — student submission delay trend with score/punctuality context.
- `S-T07` — score trend with absence snapshot context.
- `S-T08` — assessment lateness trend with score/punctuality context.
- `S-T12` — submission delay series plus punctuality summary context.

## Contract

Registry fields:

```text
aiSummaryType = trend_series
aiTimeColumn = <time/order column>
aiMetricColumn = <primary trend metric>
aiSecondaryMetricColumns = [...]
aiFlagColumns = [...]
aiLabelColumns = [...]
aiEvidenceDatasetRoles = { dataset_label: role }
aiMetricUnits = { ... }
aiMetricDirections = { ... }
aiMinimumSampleSize = <small-sample threshold>
```

`aiEvidenceDatasetRoles` may mark one dataset as `primary_series`. If absent,
the existing primary dataset selection logic remains unchanged.

## Output additions

- `multi_dataset_evidence`: non-primary datasets summarized with role, row count,
  columns, first row and compact numeric stats.
- `secondary_metric_associations`: aligned descriptive association between the
  primary metric and configured secondary metrics.
- `small_sample_caveats`: explicit caveats when point count is below
  `aiMinimumSampleSize`.
- `metric_units`, `metric_directions`, `causal_claim_allowed=false`.

## Guardrails

- Association is descriptive only.
- Do not claim absence/lateness causes score changes.
- For 3–5 point series, mention sample-size limitations.
- Keep dataset provenance visible for multi-query tasks.
