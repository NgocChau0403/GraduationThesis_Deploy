# Phase 2a Minimal Contract - LLM Judge V2

## Purpose

This file freezes the minimal data contract needed before Phase 3 and Phase 4.
It does not define the full LLM judge input, prompt, rubric, or final scoring schema.

Phase 2a only standardizes:

- where LLM Judge V2 artifacts will be written
- the row-count record format for Phase 3
- the small-result metadata that Phase 4 must emit
- the boundary between the completed AI summary type update work and the new LLM Judge V2 work

## Artifact Roots

Phase 2 judge-input contracts must be written under:

```text
Docs/evaluation_v2/Input_AI/
```

Phase 3 row-count and Phase 4 small-result artifacts remain under:

```text
Docs/evaluation_v2/Handle20rows/
```

`Handle20rows/` is frozen after completion of Phase 3 and Phase 4. No new
prompt, rubric, judge input/output, pilot, scoring, or report artifact may be
added there.

The existing folder below is reserved for the completed AI summary type / AI summary task update work and must not receive new LLM Judge V2 artifacts:

```text
Docs/evaluation_v2/UpdateBerforeLLMv2/
```

## Planned Output Paths

Phase 3 row-count outputs:

```text
Docs/evaluation_v2/Handle20rows/outputs/row_count_records.jsonl
Docs/evaluation_v2/Handle20rows/outputs/row_count_distribution.json
Docs/evaluation_v2/Handle20rows/outputs/row_count_distribution.md
```

Phase 4 small-result rule verification outputs:

```text
Docs/evaluation_v2/Handle20rows/outputs/small_result_rule_verification.json
Docs/evaluation_v2/Handle20rows/outputs/small_result_rule_verification.md
```

Later LLM Judge V2 outputs:

```text
Docs/evaluation_v2/Input_AI/judge_input_schema.md
Docs/evaluation_v2/Input_AI/judge_input_example.json
Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md
```

The locations below were part of the earlier draft but are no longer valid
because `Handle20rows/` is frozen:

```text
Docs/evaluation_v2/Handle20rows/JUDGE_RUBRIC_1_TO_10.md
Docs/evaluation_v2/Handle20rows/outputs/judge_inputs.jsonl
Docs/evaluation_v2/Handle20rows/outputs/judge_outputs.jsonl
Docs/evaluation_v2/Handle20rows/outputs/judge_failures.jsonl
Docs/evaluation_v2/Handle20rows/outputs/scoring_records.jsonl
Docs/evaluation_v2/Handle20rows/outputs/scoring_summary.json
Docs/evaluation_v2/Handle20rows/outputs/scoring_summary.md
Docs/evaluation_v2/Handle20rows/pilot/pilot_judge_inputs.jsonl
Docs/evaluation_v2/Handle20rows/pilot/pilot_judge_outputs.jsonl
Docs/evaluation_v2/Handle20rows/pilot/pilot_review.md
Docs/evaluation_v2/Handle20rows/reports/ai_explanation_evaluation_methodology_v2.md
Docs/evaluation_v2/Handle20rows/reports/overall_ai_explanation_scoring_summary_v2.md
```

## Phase 3 Row-Count Record Schema

Each line in `row_count_records.jsonl` must represent one dataset/task/mode record.

Required fields:

```json
{
  "evaluation_version": "llm_judge_v2_phase2a",
  "dataset_id": "SAMPLE_UCI_POR",
  "class_id": null,
  "student_id": null,
  "role": "admin",
  "task_id": "A-G14",
  "mode": "task_aware_data_summarization",
  "status": "scoreable",
  "row_count": 52,
  "row_count_bucket": ">20",
  "not_scoreable_reason": null,
  "source": {
    "query_executed": true,
    "generated_at": "2026-06-18T00:00:00Z"
  }
}
```

Allowed `mode` values:

```text
baseline_first_20_rows
task_aware_data_summarization
```

Allowed `status` values:

```text
scoreable
not_scoreable
failed
```

Allowed `row_count_bucket` values:

```text
<=20
>20
not_scoreable
unknown
```

Rules:

- If `status` is `scoreable`, `row_count` must be a non-negative integer.
- If `status` is `scoreable`, `row_count_bucket` must be either `<=20` or `>20`.
- If `status` is `not_scoreable`, `row_count` must be `null`.
- If `status` is `not_scoreable`, `not_scoreable_reason` must be a non-empty string.
- If the query failed unexpectedly, use `status: "failed"` and preserve the raw error message in a later runner-specific field.

## Not-Scoreable Reason Values

Preferred reason values:

```text
task_not_available
query_failed
missing_required_context
explanation_unavailable
invalid_run_metadata
other_not_scoreable
```

These values may be expanded later, but Phase 3 should not use vague labels when a specific cause is known.

## Phase 4 Small-Result Metadata Contract

When `task_aware_data_summarization` receives a full query result with `row_count <= 20`, it must include all rows in the evidence payload and emit:

```json
{
  "input_summary_type": "full_rows_due_to_small_result",
  "full_result_row_count": 12,
  "included_row_count": 12,
  "small_result_full_rows_applied": true
}
```

When `row_count > 20`, it must keep using the task-aware summarization strategy and emit:

```json
{
  "input_summary_type": "task_aware_data_summarization",
  "full_result_row_count": 52,
  "included_row_count": 20,
  "small_result_full_rows_applied": false
}
```

Rules:

- `full_result_row_count` must equal the number of rows returned by the analytics query before summarization.
- `included_row_count` must equal the number of rows actually included in the AI explanation evidence payload.
- For `row_count <= 20`, `included_row_count` must equal `full_result_row_count`.
- For `row_count > 20`, `included_row_count` may be lower than `full_result_row_count`, but the summarizer must preserve task-relevant evidence.
- The runner or debug artifact should preserve these fields without silent renaming.

## Phase Boundary

Phase 2a is complete when this contract exists and the artifact folders are present.

Phase 2a does not require:

- full judge input schema
- judge prompt
- 1-to-10 rubric
- judge runner implementation
- LLM scoring outputs
- final methodology report

Those belong to later phases after Phase 3 row-count measurement and Phase 4 small-result rule verification.
