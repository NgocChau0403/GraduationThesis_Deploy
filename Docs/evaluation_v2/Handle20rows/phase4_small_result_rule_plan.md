# Phase 4a Small-Result Rule Plan

## Purpose

Phase 4 changes the behavior of `task_aware_data_summarization` for small SQL/analytics results.

This Phase 4a document freezes the rule before implementation. No AIService code is changed by this file.

## Background From Phase 3

Phase 3 measured `row_count` at the dataset-task level, using the result returned by:

```text
/api/analytics/run
```

The Phase 3 conclusion was:

```text
SAMPLE_UCI_POR: 46/52 tasks are <= 20 rows; 6/52 tasks are > 20 rows.
SAMPLE_OULAD: 39/52 tasks are <= 20 rows; 13/52 tasks are > 20 rows.
Overall: 85/104 dataset-task query results are <= 20 rows; 19/104 are > 20 rows.
```

Because most dataset-task results have `row_count <= 20`, the task-aware summarizer must avoid over-summarizing these small results.

## Final Rule

For `AI_SUMMARY_METHOD=task_aware_data_summarization`:

```text
If full_result_row_count <= 20:
  include all rows from the full query result in the evidence payload.
Else:
  use the existing task-aware summarizer selected by aiSummaryType.
```

This rule applies globally to task-aware mode, before dispatching by `aiSummaryType`.

It must apply to all task-aware summary types, including:

```text
numeric_distribution
categorical_distribution
risk_flags
trend_series
trend_comparison
ranking
group_comparison
correlation_evidence
multi_metric_comparison
metric_snapshot
action_synthesis
generic_fallback
```

## Row-Count Definition

Use the same row-count definition as Phase 3.

If `/api/analytics/run` returns one dataset array:

```text
full_result_row_count = length of that dataset array
```

If `/api/analytics/run` returns multiple dataset arrays:

```text
full_result_row_count = sum of the row counts across all dataset arrays
```

The implementation should also preserve per-dataset row counts for debugging/reporting.

Example:

```json
{
  "datasets": {
    "risk_summary": [{}, {}, {}],
    "risk_details": [{}, {}, {}, {}]
  }
}
```

In this case:

```text
full_result_row_count = 3 + 4 = 7
```

Since `7 <= 20`, task-aware mode must include all rows from both arrays.

## Why The Rule Uses Total Row Count

The LLM context receives the evidence payload as a combined task input, not as one isolated SQL table. If the total returned evidence is small enough, the safest behavior is to preserve all returned rows.

Using only the largest dataset array could incorrectly classify a multi-dataset response as small or large. Using the total row count is consistent with Phase 3 and easier to explain in the methodology.

## Runtime Code Location

The shared runtime path has been verified:

```text
POST /explain
-> strategy.build_user_prompt(request)
-> self.summarize_datasets(req)
-> BaseExplanationStrategy.build_summary_result(...)
-> BaseExplanationStrategy.summarize_task_aware_data_summarization(req)
-> BaseExplanationStrategy._build_task_aware_summary(req)
-> dispatch by aiSummaryType
```

The Phase 4 implementation should be placed in:

```text
AIService/strategies/base.py
```

Recommended insertion point:

```text
BaseExplanationStrategy.summarize_task_aware_data_summarization(req)
```

The small-result check should run before:

```text
BaseExplanationStrategy._build_task_aware_summary(req)
```

That placement makes the rule global for task-aware mode and avoids editing every task or every `aiSummaryType` summarizer.

## Expected Implementation Shape

Suggested helper functions:

```text
_get_dataset_row_breakdown(req) -> list[dict]
_get_full_result_row_count(req) -> int
_should_include_full_rows_for_small_result(req, threshold=20) -> bool
_summarize_full_rows_due_to_small_result(req) -> dict
```

Expected high-level logic:

```text
def summarize_task_aware_data_summarization(req):
    if _should_include_full_rows_for_small_result(req, threshold=20):
        summary = _summarize_full_rows_due_to_small_result(req)
    else:
        summary = _build_task_aware_summary(req)
        attach small-result metadata with small_result_full_rows_applied=false

    return summary, _dump_summary(summary)
```

## Required Metadata

For `full_result_row_count <= 20`, the summary/debug payload must include:

```json
{
  "summary_type": "full_rows_due_to_small_result",
  "input_summary_type": "full_rows_due_to_small_result",
  "full_result_row_count": 12,
  "included_row_count": 12,
  "small_result_threshold": 20,
  "small_result_full_rows_applied": true
}
```

It should also preserve a per-dataset breakdown:

```json
{
  "dataset_row_breakdown": [
    {
      "dataset_name": "score_distribution",
      "row_count": 12,
      "included_row_count": 12
    }
  ]
}
```

For `full_result_row_count > 20`, the existing task-aware summary type should be preserved, but the metadata must include:

```json
{
  "full_result_row_count": 52,
  "small_result_threshold": 20,
  "small_result_full_rows_applied": false
}
```

If practical, the large-result path should also expose:

```json
{
  "included_row_count": 20
}
```

But `included_row_count` may vary by summarizer type. If a summarizer includes aggregated evidence rather than raw rows, Phase 4b should preserve the existing summarizer output and only add metadata that can be computed safely.

## Prompt/Evidence Shape For Small Results

For small results, the prompt data summary should be JSON-like and explicit enough for the LLM to see all returned rows.

The summary should include:

```text
summary_type
full_result_row_count
dataset_row_breakdown
datasets with all rows included
```

It must not silently drop rows when `full_result_row_count <= 20`.

## Boundary Test Cases

Phase 4c must verify at least these three cases:

| Case | Full result row count | Expected behavior |
| --- | ---: | --- |
| Small result below threshold | 10 | include all 10 rows; `small_result_full_rows_applied=true` |
| Small result at threshold | 20 | include all 20 rows; `small_result_full_rows_applied=true` |
| Large result above threshold | 21 | keep existing task-aware summarizer; `small_result_full_rows_applied=false` |

For multi-dataset responses, Phase 4c should verify:

| Case | Dataset row counts | Total | Expected behavior |
| --- | --- | ---: | --- |
| Multi-dataset small result | 3 + 4 | 7 | include all rows from both datasets |
| Multi-dataset threshold result | 10 + 10 | 20 | include all rows from both datasets |
| Multi-dataset large result | 10 + 11 | 21 | keep existing task-aware summarizer |

## Runtime Verification Cases

Phase 4d should use real tasks selected from Phase 3:

```text
1 UCI task with row_count <= 20
1 UCI task with row_count > 20
1 OULAD task with row_count <= 20
1 OULAD task with row_count > 20
```

For each task, run AI explanation with:

```text
AI_SUMMARY_METHOD=task_aware_data_summarization
```

Expected verification:

```text
row_count <= 20:
  small_result_full_rows_applied = true
  included_row_count = full_result_row_count

row_count > 20:
  small_result_full_rows_applied = false
  existing aiSummaryType-specific summarizer remains active
```

## Outputs For Phase 4 Verification

Phase 4c boundary verification writes:

```text
Docs/evaluation_v2/LLMJudgeV2/outputs/small_result_rule_verification.json
Docs/evaluation_v2/LLMJudgeV2/outputs/small_result_rule_verification.md
```

Phase 4d real-task runtime verification writes:

```text
Docs/evaluation_v2/LLMJudgeV2/outputs/small_result_runtime_verification.json
Docs/evaluation_v2/LLMJudgeV2/outputs/small_result_runtime_verification.md
```

The outputs are separate so rerunning Phase 4d does not overwrite the
deterministic Phase 4c boundary evidence.

## Non-Goals

Phase 4 must not:

- change `baseline_first_20_rows`
- modify the 52 task definitions just to apply this rule
- change the external comparison modes
- run the LLM judge V2
- rewrite Phase 3 row-count results

## Definition Of Done For Phase 4a

Phase 4a is complete when this document exists and clearly defines:

- the small-result rule
- the row-count definition
- the code insertion point
- required metadata
- boundary tests
- runtime verification cases
