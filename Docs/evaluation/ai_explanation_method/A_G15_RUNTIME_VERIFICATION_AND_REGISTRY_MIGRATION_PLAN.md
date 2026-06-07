# A-G15 Runtime Verification + Registry Migration Plan

## Summary
Verify `A-G15` runtime output columns before migrating the task to the internal `ranking` summarizer.

No new top-level `AI_SUMMARY_METHOD` value is introduced. The external thesis comparison remains:

```text
baseline_first_20_rows
vs
task_aware_data_summarization
```

## Runtime Verification Gate
First test the requested active dataset/class pair:

```powershell
Invoke-RestMethod -Method Post -ContentType 'application/json' `
  -Uri 'http://localhost:4000/api/analytics/run' `
  -Body '{"taskId":"A-G15","params":{"batch_id":"Import_2026-05-30","class_id":"6e7eb9ea9e1ee52102e988bd"}}'
```

Before treating empty output as verification failure, confirm whether the batch/class pair supports `A-G15` required capabilities, especially engagement/risk-related fields.

If that pair is unsupported or empty because of dataset capability, verify against a valid OULAD batch/class that has engagement rows, for example:

```powershell
Invoke-RestMethod -UseBasicParsing `
  -Uri 'http://localhost:4000/api/tasks/validate-one/A-G15?datasetId=SAMPLE_OULAD&classId=SAMPLE_OULAD_CLASS_AAA_2013J'

Invoke-RestMethod -Method Post -ContentType 'application/json' `
  -Uri 'http://localhost:4000/api/analytics/run' `
  -Body '{"taskId":"A-G15","params":{"batch_id":"SAMPLE_OULAD","class_id":"SAMPLE_OULAD_CLASS_AAA_2013J"}}'
```

Verification passes only if runtime output contains rows and these columns:

- `student_id`
- `avg_score`
- `at_risk_score`
- `at_risk_label`
- `flag_low_score`
- `flag_repeated`
- `flag_low_engagement`
- `flag_low_punctuality`
- `flag_neg_trend`

## Registry Migration
If runtime verification passes, migrate only `A-G15` in `Backend/src/config/taskRegistry.json`:

```json
{
  "aiSummaryType": "ranking",
  "aiEntityColumn": "student_id",
  "aiMetricColumn": "at_risk_score",
  "aiSortDirection": "desc",
  "aiSecondaryMetricColumns": ["avg_score"],
  "aiLabelColumns": ["at_risk_label", "final_outcome"],
  "aiFlagColumns": [
    "flag_low_score",
    "flag_repeated",
    "flag_low_engagement",
    "flag_low_punctuality",
    "flag_neg_trend"
  ],
  "aiTopK": 10,
  "aiBottomK": 5
}
```

Do not add `gender`, `age_group`, or `region` as default explanation labels.

## Post-Migration Validation
Migration is valid only if task-aware debug output uses `ranking`, not `generic_fallback`.

Required checks:

```powershell
python AIService/debug_ai_summary.py --self-test-ranking
python AIService/debug_ai_summary.py --task A-G15 --method task_aware_data_summarization
```

The task-aware debug output must include:

- `summary_type = "ranking"`
- `top_items`
- `bottom_items`
- `flag_evidence`
- no `gender`, `age_group`, or `region` in emitted labels unless explicitly configured later

Regression checks:

```powershell
python AIService/debug_ai_summary.py --self-test
python AIService/debug_ai_summary.py --self-test-categorical
python AIService/debug_ai_summary.py --self-test-risk-flags
python AIService/debug_ai_summary.py --self-test-trend-series
python AIService/debug_ai_summary.py --self-test-ranking
```
