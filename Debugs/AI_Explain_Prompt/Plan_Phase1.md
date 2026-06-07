# Safe AI Prompt Summarization Phase 1 Implementation Plan

## Summary
Implement only Phase 1: replace `rows[:20]` prompt input with a safe summarization dispatcher, add A-G14-specific `trend_comparison` summarization, and keep a conservative generic fallback for all unmigrated tasks. No frontend, chart rendering, SQL, or broad task migration changes.

## Files To Change
- `Backend/src/config/taskRegistry.json`
  - Add `aiSummary*` metadata only to A-G14.
- `Backend/src/controllers/ai.controller.js`
  - Add `buildAISummaryConfig(task)`.
  - Forward nested `ai_summary_config` to AIService.
- `AIService/schemas.py`
  - Add `AISummaryConfig`.
  - Add optional `ai_summary_config` to `ExplainRequest`.
- `AIService/strategies/base.py`
  - Convert `summarize_datasets(req, max_rows=20)` into dispatcher.
  - Add `trend_comparison` and generic fallback summarizers.
- `AIService/strategies/trend_strategy.py`
  - Update prompt wording to trust `DATA SUMMARY`.
- Add one focused debug/test script, likely under `AIService/`, to print final A-G14 `DATA SUMMARY` without calling LLM.

## Implementation Steps
1. Add A-G14 registry metadata:
   - `aiSummaryType: "trend_comparison"`
   - `aiTargetGroup: "Withdrawn"`
   - `aiComparisonGroups: ["Pass", "Distinction"]`
   - `aiTimeColumn: "week_number"`
   - `aiMetricColumn: "avg_clicks"`
   - `aiGroupColumn: "final_outcome"`
   - `aiReliabilityColumn: "student_count"`
   - `aiMinimumReliableCount: 10`

2. Backend payload:
   - Implement `buildAISummaryConfig(task)` returning snake_case fields:
     - `summary_type`, `target_group`, `comparison_groups`, `time_column`, `metric_column`, `group_column`, `reliability_column`, `minimum_reliable_count`
   - Add `ai_summary_config: buildAISummaryConfig(task)` to the existing payload.
   - Preserve all existing payload fields.

3. Python schema:
   - Add `AISummaryConfig(BaseModel)`.
   - Add `ai_summary_config: AISummaryConfig | None = None` to `ExplainRequest`.
   - Keep all fields optional enough for old requests to validate.

4. Base summarizer dispatcher:
   - Keep method name `summarize_datasets(req, max_rows=20)`.
   - If `req.ai_summary_config.summary_type == "trend_comparison"`, call `_summarize_trend_comparison(req)`.
   - Otherwise call `_summarize_generic(req)`.
   - Stop using `rows[:20]` as the main data source.

5. `trend_comparison` summarizer:
   - Select primary dataset by `query_labels[0]` when present, otherwise first dataset.
   - Validate configured columns.
   - Group by `final_outcome`.
   - Sort each group by numeric `week_number`.
   - Convert numeric strings for `avg_clicks` and `student_count`.
   - Target `Withdrawn`: compute first, last, peak, trough, largest drop/rise, largest reliable drop, skipped invalid rows, low-count warnings.
   - Comparison groups `Pass`, `Distinction`: compact first/last/peak/trough/largest drop/rise.
   - If target group missing, return stable warning with `target_group_missing: true`, `available_groups`, and only small generic diagnostic sample.

6. Generic fallback:
   - Include `summary_type`, `dataset_name`, `row_count`, `columns`, first 5 rows, last 5 rows.
   - Add numeric stats for max 8 numeric columns.
   - Add categorical group samples for max 4 categorical columns, 5 groups each, 1 sample row each.
   - Add truncation and partial-summary warnings.
   - Cap serialized output around 8k-12k chars.

7. Stable output sections:
   - Use consistent names:
     - `summary_type`
     - `dataset_name`
     - `row_count`
     - `target_group`
     - `comparison_groups`
     - `target_trend`
     - `comparison_trends`
     - `reliability_warnings`
     - `summarization_warnings`

8. Trend prompt update:
   - Tell model `DATA SUMMARY` is authoritative.
   - Prioritize `target_group` and `comparison_groups` when present.
   - Do not infer from omitted raw rows.
   - Mention reliability caveats when present.

## Verification Plan
- Generic fallback:
  - Empty dataset returns warning and no crash.
  - More than 20 rows includes first 5 and last 5, not first 20 only.
  - Numeric stats handle numbers and numeric strings.
- A-G14:
  - Ordered input `Distinction`, `Fail`, `Pass`, `Withdrawn` still prioritizes `Withdrawn`.
  - Distinction no longer dominates prompt.
  - Largest reliable drop is computed after sorting by `week_number`.
  - Low `student_count` weeks are flagged.
  - Missing `Withdrawn` emits warning and does not crash.
- Debug command:
  - Add script that prints final A-G14 `DATA SUMMARY` without OpenAI/LLM call.
- Manual:
  - Run A-G14 dashboard explanation.
  - Confirm explanation references `Withdrawn`, compares to `Pass`/`Distinction`, and avoids using Distinction week 1→2 as withdrawal evidence.

## Rollback
- Remove A-G14 `aiSummary*` metadata.
- Remove `ai_summary_config` from backend payload.
- Revert `summarize_datasets()` to previous behavior if needed.
- Since frontend/chart/SQL remain untouched, rollback is localized to backend AI proxy and AIService summarization.
