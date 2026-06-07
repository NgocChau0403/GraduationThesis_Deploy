# Phase 2 Second Batch Plan: `risk_flags`

## Summary
Implement one reusable registry-driven `risk_flags` summarizer for only:
- `S-T04` At-risk self-check
- `A-S04` Student risk flag breakdown

Do not migrate `A-B04`, `A-G03`, or any other task. Do not change frontend UI, chart rendering, SQL, `A-G14` `trend_comparison`, existing `categorical_distribution`, or `generic_fallback`.

## Key Changes
- Add `risk_flags` metadata only to `S-T04` and `A-S04`.
- Extend backend `buildAISummaryConfig(task)` and Python `AISummaryConfig` with:
  - `flag_name_column`
  - `flag_value_column`
  - `threshold_column`
  - `triggered_column`
  - `severity_column`
  - `description_column`
  - `recommended_action_column`
  - `support_category_column`
  - `severity_order`
  - `flag_order`
  - `max_flags`
- Extend summarizer dispatcher:
  - `trend_comparison` unchanged
  - `categorical_distribution` unchanged
  - `risk_flags` -> `_summarize_risk_flags(req)`
  - otherwise `generic_fallback`

## Registry Metadata
Add to `S-T04`:
```json
{
  "aiSummaryType": "risk_flags",
  "aiFlagNameColumn": "flag_name",
  "aiFlagValueColumn": "flag_value",
  "aiThresholdColumn": "threshold",
  "aiTriggeredColumn": "triggered",
  "aiSeverityColumn": "severity",
  "aiDescriptionColumn": "flag_description",
  "aiRecommendedActionColumn": "recommended_action",
  "aiSupportCategoryColumn": "support_category",
  "aiSeverityOrder": ["high", "medium", "low", "info"],
  "aiFlagOrder": ["flag_low_score", "flag_repeated", "flag_low_engagement", "flag_low_punctuality", "flag_neg_trend"],
  "aiMaxFlags": 10
}
```

Add to `A-S04`:
```json
{
  "aiSummaryType": "risk_flags",
  "aiFlagNameColumn": "flag_name",
  "aiFlagValueColumn": "flag_value",
  "aiThresholdColumn": "threshold",
  "aiTriggeredColumn": "triggered",
  "aiSeverityOrder": ["high", "medium", "low", "info"],
  "aiFlagOrder": ["flag_low_score", "flag_high_absence", "flag_low_punctuality", "flag_neg_trend"],
  "aiMaxFlags": 10
}
```

## Summarizer Behavior
- Select primary dataset using existing dataset selection logic.
- Required columns: configured flag name, flag value, threshold, triggered.
- If required columns are missing, return stable warning plus small generic diagnostic sample.
- Parse `triggered` only from stable values:
  - true: `true`, `"true"`, `1`, `"1"`
  - false: `false`, `"false"`, `0`, `"0"`
- For unrecognized `triggered`, preserve raw value, mark unknown, increment `unknown_triggered_count`, warn, and do not guess.
- Normalize numeric strings for `flag_value` and `threshold` when possible while preserving raw values.
- Do not infer threshold direction.
- Do not invent risk labels, causes, severity, descriptions, support categories, or recommendations.
- If severity is not configured, output `severity_available: false` and `severity_counts: {}` with no warning.
- Warn only when an optional column is configured but missing.

## DATA SUMMARY Shape
```json
{
  "summary_type": "risk_flags",
  "dataset_name": "...",
  "row_count": 0,
  "total_flags": 0,
  "triggered_count": 0,
  "non_triggered_count": 0,
  "unknown_triggered_count": 0,
  "severity_available": false,
  "severity_counts": {},
  "triggered_flags": [],
  "non_triggered_flags": [],
  "highest_severity_triggered": null,
  "threshold_evidence": [],
  "recommended_actions": [],
  "summarization_warnings": []
}
```

## Sorting And Caps
- Triggered flags first.
- Triggered flags sorted by configured `severity_order` when severity exists.
- Unknown severities sort after known severities and preserve raw severity.
- Within same severity, sort by configured `flag_order`.
- Non-triggered flags appear compactly after triggered flags.
- Apply `max_flags` after prioritizing triggered flags, not by original row order.
- Add truncation warning if rows exceed `max_flags`.
- Keep output bounded by existing `_dump_summary` guardrails.

## Debug And Tests
- Extend existing `AIService/debug_ai_summary.py`; do not create another script.
- Add support for:
  - `--task S-T04`
  - `--task A-S04`
  - `--self-test-risk-flags`
- Self-tests must cover:
  - bool/string/int triggered parsing
  - triggered/non-triggered/unknown counts
  - severity order `high -> medium -> low -> info`
  - configured `flag_order` within same severity
  - missing required column warning plus generic diagnostic sample
  - missing optional configured column warning without crash
  - unconfigured severity/action creates no invented values and no unnecessary warning
  - large flag list capped with truncation warning
  - unrecognized triggered values warned and not guessed
  - empty dataset does not crash

## Verification Commands
Run:
```powershell
node -e "JSON.parse(require('fs').readFileSync('Backend/src/config/taskRegistry.json','utf8'))"
node --check Backend/src/controllers/ai.controller.js
python -m py_compile AIService/schemas.py AIService/strategies/base.py AIService/debug_ai_summary.py
python AIService/debug_ai_summary.py --self-test
python AIService/debug_ai_summary.py --self-test-categorical
python AIService/debug_ai_summary.py --self-test-risk-flags
python AIService/debug_ai_summary.py --task S-T04
python AIService/debug_ai_summary.py --task A-S04
python AIService/debug_ai_summary.py --task A-G14
python AIService/debug_ai_summary.py --task A-B02
python AIService/debug_ai_summary.py --task A-B04 --input-json -
```

## Acceptance Criteria
- Only `S-T04` and `A-S04` receive `aiSummaryType: "risk_flags"`.
- `A-G14` still uses `trend_comparison`.
- `A-B02`, `A-B03`, and `A-G10` still use `categorical_distribution`.
- All unmigrated tasks still use `generic_fallback`.
- `S-T04` triggered flags appear before non-triggered flags.
- `S-T04` includes severity/action/support evidence only from configured columns.
- `A-S04` does not invent severity or recommendations.
- `triggered_count` equals parsed true rows.
- `threshold_evidence` preserves `flag_value`, `threshold`, and `triggered`.
- No risk reason appears unless it comes from configured flag fields.
- Prompt summaries stay bounded.

## Rollback
- Remove `risk_flags` metadata from `S-T04` and `A-S04`.
- Remove risk flag fields from backend forwarding and schema if needed.
- Remove the `risk_flags` dispatcher branch and `_summarize_risk_flags`.
- Leave existing `trend_comparison`, `categorical_distribution`, and `generic_fallback` untouched.
