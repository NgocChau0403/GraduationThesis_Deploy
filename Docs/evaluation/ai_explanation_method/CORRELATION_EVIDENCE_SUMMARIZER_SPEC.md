# Correlation Evidence Summarizer Spec

## Implementation Status

Status: implemented / migrated / evidence logged.

Status note:

- The `correlation_evidence` summarizer is implemented under task-aware data summarization (`task_aware_data_summarization`).
- The external thesis baseline remains `baseline_first_20_rows`.
- Previous internal behavior was `generic_fallback`.
- Representative task `A-G02` has been migrated.
- Baseline vs task-aware evidence logs have been generated.

## Top-Level Method Boundary

The external thesis comparison remains:

```text
baseline_first_20_rows
vs
task_aware_data_summarization
```

`correlation_evidence` is an internal strategy inside `task_aware_data_summarization`. It must not introduce `correlation_evidence_old`, `correlation_evidence_new`, or any new top-level summary method.

## Representative Task: A-G02

Representative task:

```text
A-G02 - Engagement-performance relationship
```

Current internal behavior:

```text
task_aware_data_summarization -> generic_fallback
```

Historical external baseline:

```text
baseline_first_20_rows
```

Expected A-G02 runtime columns before future registry migration:

```text
student_id
engagement_score
avg_score
final_outcome
```

`A-G02` is the first representative task because it exposes paired numeric observations: `engagement_score` and `avg_score`. `student_id` can identify outlier examples, and `final_outcome` can provide optional color/category context.

## Why Generic Fallback Is Insufficient

Generic fallback can expose sample rows, but it does not reliably summarize the evidence needed for correlation-style explanation:

- the x/y variables being compared;
- parseable paired observations;
- coefficient value and coefficient method;
- sample size used for the relationship evidence;
- p-value or explicit absence of p-value evidence;
- outlier examples;
- whether strength or significance wording is allowed;
- causal/statistical guardrails.

Without a method-specific summary, the generated explanation can overclaim weak/strong correlation, statistical significance, impact, influence, or causality from raw rows alone.

## Relationship To Other Summary Types

`numeric_distribution` summarizes the distribution of one numeric variable.

`ranking` orders entities by a metric.

`group_comparison` compares group-level metrics with denominators and gaps.

`correlation_evidence` summarizes relationship evidence between two numeric variables. It must preserve coefficient/sample-size evidence when available, derive coefficient only when safe, report outlier context when configured, and prevent unsupported strength, significance, or causal claims.

`A-G02` belongs to `correlation_evidence`. More sensitive background, lifestyle, social, and family-context correlation tasks such as `A-G09`, `A-G13`, `S-T14`, and `S-T15` are follow-ups because they require additional fairness and non-prescriptive framing.

## A-G02 Output Column Verification

Before future registry migration, A-G02 runtime output must be verified.

Verification passes only if runtime output has rows and includes:

```text
student_id
engagement_score
avg_score
final_outcome
```

`engagement_score` and `avg_score` must be parseable as paired numeric values before coefficient derivation is allowed.

## Proposed Metadata Contract

Proposed registry metadata for the first A-G02 migration:

```json
{
  "aiSummaryType": "correlation_evidence",
  "aiXColumn": "engagement_score",
  "aiYColumn": "avg_score",
  "aiEntityColumn": "student_id",
  "aiColorColumn": "final_outcome",
  "aiCoefficientColumn": null,
  "aiCoefficientMethod": "pearson",
  "aiSampleSizeColumn": null,
  "aiPValueColumn": null,
  "aiOutlierPolicy": "high_x_low_y",
  "aiMinimumSampleSize": 30,
  "aiTopK": 10,
  "aiBottomK": 5
}
```

Default derived coefficient type is Pearson correlation unless future metadata specifies another method.

If `aiCoefficientColumn` is configured, the summarizer should use that explicit coefficient. If it is not configured, the summarizer may derive a coefficient only when both `aiXColumn` and `aiYColumn` are present, numeric, paired, and sufficient for the configured method.

If `aiSampleSizeColumn` is configured, the summarizer should use that explicit sample size. If it is not configured, sample size may be derived from valid paired numeric observations.

If `aiPValueColumn` is not configured, p-value must remain absent/null.

## DATA SUMMARY Shape

Configured `correlation_evidence` summaries must return:

```text
summary_type = "correlation_evidence"
dataset_name
row_count
x_column
y_column
entity_column
coefficient
coefficient_method
coefficient_source
sample_size
p_value
outliers
direction
strength
strength_claim_allowed
significance_claim_allowed
causal_claim_allowed = false
parse_warnings
statistical_warnings
summarization_warnings
generic_diagnostic_sample
```

`coefficient_source` should indicate whether the coefficient came from an explicit configured column, safe derivation, or is unavailable.

## Behavior Contract

The summarizer must validate configured x/y columns. If required configuration or columns are missing, it must emit stable warnings and include a `generic_diagnostic_sample`.

The summarizer must parse numeric strings for x, y, coefficient, sample size, and p-value when those fields are configured or derived.

The summarizer must preserve explicit coefficient, sample size, and p-value evidence when configured.

When explicit coefficient evidence is absent, the summarizer may derive a Pearson coefficient only if:

- x and y columns are present;
- x and y values are parseable as paired numeric observations;
- sample size is at least `aiMinimumSampleSize`;
- the data has enough variance to make the coefficient meaningful.

The first implementation should not compute p-values unless the statistical method is explicitly specified and tested.

`direction` may be `positive`, `negative`, `none`, or `unknown`, depending on available coefficient evidence.

`strength` may be emitted only when coefficient evidence exists and sample size is reliable. If strength cannot be supported, `strength_claim_allowed` must be `false`.

`significance_claim_allowed` must be `true` only when p-value or equivalent configured statistical evidence exists. If p-value is absent, the summary must not support "statistically significant" wording.

`high_x_low_y` means observations with high `engagement_score` but low `avg_score` relative to the observed distribution. Phase 1 defines the outlier contract only; the concrete quantile, threshold, or residual algorithm belongs to Phase 2.

Outlier examples must be bounded by configured `aiTopK` / `aiBottomK` and capped to a safe maximum in implementation.

## Causal And Statistical Guardrails

`causal_claim_allowed` must always be `false` for `correlation_evidence`.

The summarizer may describe observed association between x and y when evidence supports it.

The summarizer must not infer that engagement causes performance, that performance is caused by engagement, or that changing engagement will necessarily change performance.

Unsupported wording must be guarded:

- Do not claim strong/weak/moderate correlation without coefficient evidence and reliable sample size.
- Do not claim statistical significance without p-value or equivalent configured statistical evidence.
- Do not use causal language such as causes, impacts, drives, determines, or leads to.
- If task/config/context is ambiguous, emit statistical or summarization warnings rather than omitting warnings.

Sensitive background, lifestyle, social, family, or demographic-style correlation tasks require additional fairness warnings in future migrations.

## Future Self-Test Cases

Future implementation self-tests should cover:

- configured request routes to `correlation_evidence`;
- unconfigured request still uses `generic_fallback`;
- no new top-level `AI_SUMMARY_METHOD` value is introduced;
- explicit coefficient column is used when present;
- derived coefficient works only when x/y are parseable and sample size is sufficient;
- default derived coefficient method is Pearson;
- sample size is preserved from explicit column or derived from valid pairs;
- numeric string x/y/coefficient/sample-size values parse correctly;
- p-value remains absent when no p-value column is configured;
- significance wording is blocked when p-value is absent;
- strength wording is blocked when coefficient or reliable sample size is absent;
- causal claims are always blocked;
- `high_x_low_y` outlier policy emits bounded examples;
- missing x/y/entity columns return stable warnings and `generic_diagnostic_sample`;
- unparseable or zero-variance x/y values return stable statistical warnings.

## Future Implementation Notes

Implementation belongs to Phase 2.

A-G02 runtime verification and registry migration belong to Phase 3 after implementation self-tests pass.

Evidence logs belong to Phase 4 after the registry migration commit exists.

Keep `generic_fallback` runnable for tasks without `aiSummaryType: "correlation_evidence"`.

Do not migrate `A-G09`, `A-G13`, `S-T14`, or `S-T15` as part of the first implementation slice.

## Acceptance Criteria

- `CORRELATION_EVIDENCE_SUMMARIZER_SPEC.md` exists.
- The spec is method-new and status is `implemented / migrated / evidence logged`.
- Old external baseline and current internal fallback behavior are documented.
- The new `correlation_evidence` contract is decision-complete for future implementation.
- Pearson default, p-value non-computation, and `high_x_low_y` outlier meaning are explicit.
- Causal, strength, and significance guardrails are explicit.
- No code, registry, SQL, frontend, roadmap, evaluation logs, or top-level method values are changed.
