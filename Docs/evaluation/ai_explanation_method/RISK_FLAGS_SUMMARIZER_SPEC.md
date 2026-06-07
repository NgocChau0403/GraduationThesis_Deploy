# Risk Flags Summarizer Spec

## Current Status
Status: implemented.

Internal strategy: `risk_flags`.

Migrated tasks:

- `S-T04` - At-risk self-check.
- `A-S04` - Student risk flag breakdown.

Code locations:

- `AIService/strategies/base.py`
  - dispatcher: `_build_task_aware_summary`
  - implementation: `_summarize_risk_flags`
- `Backend/src/controllers/ai.controller.js`
  - forwards risk flag config fields
- `Backend/src/config/taskRegistry.json`
  - stores migrated task metadata

This spec documents current behavior only.

## Old Baseline Applied To This Type
Historical baseline: `baseline_first_20_rows`.

Baseline spec: `BASELINE_FIRST_20_ROWS_SPEC.md`.

For risk flag tasks, the historical baseline can show non-triggered or low-priority rows before triggered/high-severity rows. It also does not have a stable contract for triggered parsing, severity order, threshold evidence, or action evidence.

## Purpose
`risk_flags` summarizes checklist-style risk evidence. It prioritizes triggered flags, preserves configured severity/action fields, and avoids inventing severity or recommendations that are not present in SQL output.

## Registry Metadata Contract
Required metadata:

```json
{
  "aiSummaryType": "risk_flags",
  "aiFlagNameColumn": "...",
  "aiFlagValueColumn": "...",
  "aiThresholdColumn": "...",
  "aiTriggeredColumn": "..."
}
```

Optional metadata:

```json
{
  "aiSeverityColumn": "...",
  "aiDescriptionColumn": "...",
  "aiRecommendedActionColumn": "...",
  "aiSupportCategoryColumn": "...",
  "aiSeverityOrder": ["high", "medium", "low", "info"],
  "aiFlagOrder": ["..."],
  "aiMaxFlags": 10
}
```

Current registry examples:

- `S-T04`: includes severity, description, recommended action, and support category.
- `A-S04`: includes flag name/value/threshold/triggered and does not require invented action fields.

## DATA SUMMARY Shape
The output is a bounded JSON summary with this semantic shape:

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

## Behavior Contract
- Select the primary dataset using existing dataset selection logic.
- Validate configured flag name, value, threshold, and triggered columns.
- Parse triggered only from stable true/false values.
- Preserve unrecognized triggered values as unknown and warn instead of guessing.
- Parse numeric strings for flag values and thresholds when possible.
- Do not infer threshold direction.
- Sort triggered flags before non-triggered flags.
- Sort triggered flags by configured severity order when severity is available.
- Use configured flag order within same severity.
- Include severity/action/support evidence only from configured columns.
- Do not invent severity, descriptions, recommended actions, or support categories.
- Cap large flag lists after prioritizing triggered flags.

## Known Limitations
- The summarizer does not infer whether a high value or low value is bad unless SQL already encodes `triggered`.
- It does not create recommended actions if the SQL output does not return them.
- It is designed for row-per-flag outputs, not arbitrary risk tables.

## Debug Commands
```powershell
python AIService/debug_ai_summary.py --task S-T04 --method task_aware_data_summarization
python AIService/debug_ai_summary.py --task A-S04 --method task_aware_data_summarization
python AIService/debug_ai_summary.py --self-test-risk-flags
```

## Acceptance Criteria
- `S-T04` and `A-S04` use `summary_type = "risk_flags"`.
- Triggered count equals parsed true rows.
- Triggered flags appear before non-triggered flags.
- Unknown triggered values are warned and not guessed.
- Severity/action/support evidence is included only when configured and present.
- `A-S04` does not invent severity or recommendations.
- Threshold evidence preserves flag value, threshold, and triggered status.
- No new top-level `AI_SUMMARY_METHOD` value is introduced.
- Unmigrated risk-like tasks continue to use internal `generic_fallback`.
