# LLM Judge V2 Full 208 Official Scoring Report

- Generated at: 2026-06-20T06:09:13.159Z
- Status: PASS
- Dataset scope: SAMPLE_OULAD
- Evaluation run id: llm_judge_v3_uci_calibration_scoring__SAMPLE_OULAD
- Scoring formula version: v3_uci_calibration_weighted_mean_v1_decimal_half_up
- Expected records: 104
- Valid source records: 104
- Attempt records: 104
- Final scoring records: 104
- Scored records: 104
- Invalid records: 0
- Errors: 0
- Warnings: 0

## Aggregate Summary

- Average raw weighted score: 7.97
- Average final score after caps: 7.92
- Verdict counts: {"good":25,"excellent":72,"acceptable":7}
- Highest error severity counts: {"none":101,"major":3}

## Paired Mode Comparison

- Pair count: 52
- Comparable pair count: 52
- Average delta task-aware minus baseline: 0.09
- Winner counts: {"baseline_first_20_rows":14,"task_aware_data_summarization":18,"tie":20}
- Comparable pairs by row-count bucket: {"<=20":39,">20":13}
- >20 row pairs: 13 total; 7 non-tie; 6 tie
- Non-tie pairs: 32
- Non-tie by row-count bucket: {"<=20":25,">20":7}
- Non-tie by winner and row-count bucket: {"baseline_first_20_rows__<=20":10,"task_aware_data_summarization__<=20":15,"task_aware_data_summarization__>20":3,"baseline_first_20_rows__>20":4}

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | ---: | --- |
| A-B01 | 11 | <=20 | baseline_first_20_rows | -1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6.5 because of major judge error(s). task-aware issue(s): major missing_core_output. |
| A-B02 | 4 | <=20 | baseline_first_20_rows | -0.23 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: safety_fairness -2, clarity -1. |
| A-B03 | 4 | <=20 | task_aware_data_summarization | 0.03 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins by a small weighted-score difference after judge scoring. |
| A-B04 | 3 | <=20 | task_aware_data_summarization | 0.15 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1, safety_fairness +1. |
| A-C03 | 2 | <=20 | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: task_relevance -1. |
| A-C04 | 10 | <=20 | baseline_first_20_rows | -0.19 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: actionability -2, safety_fairness -1. |
| A-C05 | 2 | <=20 | baseline_first_20_rows | -0.03 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: safety_fairness -1. |
| A-G02 | 1998 | >20 | task_aware_data_summarization | 3.3 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major unsupported numerical claim. |
| A-G05 | 11 | <=20 | baseline_first_20_rows | -0.13 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -1. |
| A-G06 | 9 | <=20 | task_aware_data_summarization | 0.8 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| A-G09 | 1998 | >20 | baseline_first_20_rows | -0.05 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: safety_fairness -1. |
| A-G10 | 3 | <=20 | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: safety_fairness +2. |
| A-G11 | 42 | >20 | baseline_first_20_rows | -0.55 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: numerical_correctness -2, completeness -1, clarity -1. |
| A-G14 | 164 | >20 | baseline_first_20_rows | -0.8 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: numerical_correctness -2, safety_fairness -2, completeness -1. |
| A-G15 | 50 | >20 | baseline_first_20_rows | -0.55 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: numerical_correctness -2, completeness -1. |
| A-G16 | 1 | <=20 | task_aware_data_summarization | 0.2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +1, safety_fairness +1. |
| A-S01 | 1 | <=20 | baseline_first_20_rows | -0.33 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: safety_fairness -2. |
| A-S02 | 5 | <=20 | task_aware_data_summarization | 0.68 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: numerical_correctness +2, completeness +1. |
| A-S03 | 32 | >20 | task_aware_data_summarization | 0.4 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: actionability +3, safety_fairness +2. |
| A-S04 | 4 | <=20 | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: actionability -2. |
| A-S05 | 5 | <=20 | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| A-S08 | 1 | <=20 | task_aware_data_summarization | 0.2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +2, task_relevance +1. |
| S-B01 | 1 | <=20 | task_aware_data_summarization | 0.2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins by a small weighted-score difference after judge scoring. |
| S-B03 | 1 | <=20 | task_aware_data_summarization | 0.95 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| S-T01 | 5 | <=20 | task_aware_data_summarization | 0.13 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| S-T03 | 6 | <=20 | task_aware_data_summarization | 0.38 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1, safety_fairness +1. |
| S-T04 | 5 | <=20 | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: safety_fairness +2. |
| S-T07 | 6 | <=20 | baseline_first_20_rows | -0.35 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6.5 because of major judge error(s). task-aware issue(s): major missing core output. |
| S-T08 | 5 | <=20 | task_aware_data_summarization | 0.15 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: numerical_correctness +2. |
| S-T11 | 1988 | >20 | task_aware_data_summarization | 0.8 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| S-T14 | 0 | <=20 | baseline_first_20_rows | -0.48 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: completeness -1, clarity -1. |
| S-T15 | 0 | <=20 | task_aware_data_summarization | 1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, completeness +1, task_relevance +1. |

## Reasonableness Review Note

There are `>20` row-count tasks where `baseline_first_20_rows` wins. These should be reviewed before thesis-level conclusions, because task-aware is expected to have better evidence coverage on large result sets. A baseline win can still be valid if task-aware introduces unsupported claims or misses core requirements, but derived statistics such as correlation coefficients must be checked against deterministic provenance before accepting the loss as final.

Create a dataset-specific non-tie reasonableness audit if any `>20` baseline wins remain.

## Gate Decision

- Dataset scoring passed: true
- Full 208 finalization allowed: false
- Reason: All dataset-scoped validated judge outputs were finalized into scoring records.

## Outputs

- Final records dir: `Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/scoring/final_scoring_records`
- Scoring manifest: `Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/scoring/scoring_manifest__SAMPLE_OULAD.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/scoring/scoring_report__SAMPLE_OULAD.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/scoring/scoring_report__SAMPLE_OULAD.md`

## Issues

No issues found.

