# Correlation Evidence Summarizer Implementation Plan

## Implementation Status

Status: planned for Phase 2 implementation.

This phase implements only the internal `correlation_evidence` summarizer and mock self-test under `task_aware_data_summarization`.

Do not migrate `A-G02`, edit `Backend/src/config/taskRegistry.json`, change SQL/frontend/roadmap files, create evaluation logs, or add a new top-level `AI_SUMMARY_METHOD` value.

## Scope

Expected changed files:

```text
Docs/evaluation/ai_explanation_method/CORRELATION_EVIDENCE_SUMMARIZER_IMPLEMENTATION_PLAN.md
AIService/schemas.py
AIService/strategies/base.py
AIService/debug_ai_summary.py
Backend/src/controllers/ai.controller.js
```

Previous internal baseline remains runnable:

```text
task_aware_data_summarization -> generic_fallback
```

New internal method:

```text
task_aware_data_summarization -> correlation_evidence
```

External thesis comparison remains:

```text
baseline_first_20_rows
vs
task_aware_data_summarization
```

## Config Plumbing

Add summary config fields:

```text
aiXColumn -> x_column
aiYColumn -> y_column
aiColorColumn -> color_column
aiCoefficientColumn -> coefficient_column
aiCoefficientMethod -> coefficient_method
aiSampleSizeColumn -> sample_size_column
aiPValueColumn -> p_value_column
aiOutlierPolicy -> outlier_policy
aiMinimumSampleSize -> minimum_sample_size
```

Reuse existing:

```text
aiEntityColumn -> entity_column
aiTopK -> top_k
aiBottomK -> bottom_k
```

## Summarizer Contract

Add dispatcher branch:

```text
configured summary_type == "correlation_evidence" -> _summarize_correlation_evidence(req)
```

Configured summaries must return:

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

Behavior requirements:

- validate configured x/y columns;
- emit stable warnings and `generic_diagnostic_sample` when required config/columns are missing;
- parse numeric strings for x/y/coefficient/sample size/p-value;
- skip invalid pairs and report parse warnings;
- default coefficient method to Pearson;
- use explicit coefficient when configured;
- derive Pearson only when sample size is reliable and x/y variance is non-zero;
- do not compute p-values in Phase 2;
- set `causal_claim_allowed` to `false` for every summary;
- allow strength claims only with coefficient plus reliable sample size;
- allow significance claims only with p-value evidence;
- implement `high_x_low_y` as x >= Q3 and y <= Q1 over valid pairs;
- allow descriptive outlier examples below sample-size threshold only with a reliability warning.

## Self-Test

Add:

```powershell
python AIService/debug_ai_summary.py --self-test-correlation-evidence
```

Coverage:

- unconfigured request uses `generic_fallback`;
- configured request uses `correlation_evidence`;
- x/y/entity/color columns are reflected;
- numeric strings parse correctly;
- derived Pearson works for valid paired rows;
- sample size is derived from valid pairs;
- invalid pairs are skipped and warned;
- zero variance and insufficient sample size block coefficient derivation;
- explicit coefficient overrides derivation;
- p-value is not computed when absent;
- configured p-value is preserved;
- claim flags follow coefficient/sample-size/p-value evidence;
- `causal_claim_allowed` is always `false`;
- `high_x_low_y` emits bounded outliers;
- missing x/y columns return stable warnings plus `generic_diagnostic_sample`;
- no new top-level summary method is introduced.

## Validation

Run:

```powershell
python AIService/debug_ai_summary.py --self-test
python AIService/debug_ai_summary.py --self-test-categorical
python AIService/debug_ai_summary.py --self-test-risk-flags
python AIService/debug_ai_summary.py --self-test-trend-series
python AIService/debug_ai_summary.py --self-test-ranking
python AIService/debug_ai_summary.py --self-test-numeric-distribution
python AIService/debug_ai_summary.py --self-test-group-comparison
python AIService/debug_ai_summary.py --self-test-correlation-evidence
```

Use bundled Python if `python` is unavailable.
