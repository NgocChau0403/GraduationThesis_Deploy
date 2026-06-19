# LLM Judge V2 Full 208 Official Scoring Report

- Generated at: 2026-06-19T12:42:35.404Z
- Status: PASS
- Dataset scope: SAMPLE_UCI_POR
- Evaluation run id: llm_judge_v3_uci_calibration_scoring__SAMPLE_UCI_POR
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

- Average raw weighted score: 7.65
- Average final score after caps: 7.61
- Verdict counts: {"good":98,"acceptable":5,"poor":1}
- Highest error severity counts: {"none":97,"major":5,"minor":1,"critical":1}

## Paired Mode Comparison

- Pair count: 52
- Comparable pair count: 52
- Average delta task-aware minus baseline: 0.17
- Winner counts: {"tie":38,"task_aware_data_summarization":8,"baseline_first_20_rows":6}
- Comparable pairs by row-count bucket: {"<=20":46,">20":6}
- >20 row pairs: 6 total; 3 non-tie; 3 tie
- Non-tie pairs: 14
- Non-tie by row-count bucket: {"<=20":11,">20":3}
- Non-tie by winner and row-count bucket: {"task_aware_data_summarization__<=20":6,"task_aware_data_summarization__>20":2,"baseline_first_20_rows__<=20":5,"baseline_first_20_rows__>20":1}

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | ---: | --- |
| A-B02 | 2 | <=20 | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| A-C04 | 10 | <=20 | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| A-G02 | 649 | >20 | task_aware_data_summarization | 2.75 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_numerical_claim. |
| A-S04 | 4 | <=20 | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -1. |
| A-S06 | 3 | <=20 | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| A-S07 | 1 | <=20 | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -1. |
| S-B01 | 1 | <=20 | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| S-B02 | 1 | <=20 | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -1. |
| S-T05 | 0 | <=20 | baseline_first_20_rows | -0.25 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: completeness -1, actionability -1. |
| S-T07 | 4 | <=20 | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| S-T08 | 3 | <=20 | task_aware_data_summarization | 2.9 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_lateness_claim. |
| S-T13 | 1 | <=20 | baseline_first_20_rows | -2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: faithfulness -3, numerical_correctness -3, completeness -3. task-aware issue(s): major missing_action_plan. |
| S-T14 | 649 | >20 | baseline_first_20_rows | -0.45 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: faithfulness -1, numerical_correctness -1. task-aware issue(s): minor overstated_association. |
| S-T15 | 649 | >20 | task_aware_data_summarization | 5.65 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 2 because of critical judge error(s). baseline rows[:20] issue(s): critical contradictory_core_numerical_claim. |

## Reasonableness Review Note

There are `>20` row-count tasks where `baseline_first_20_rows` wins. These should be reviewed before thesis-level conclusions, because task-aware is expected to have better evidence coverage on large result sets. A baseline win can still be valid if task-aware introduces unsupported claims or misses core requirements, but derived statistics such as correlation coefficients must be checked against deterministic provenance before accepting the loss as final.

For SAMPLE_UCI_POR, see `Docs/evaluation_v2/Runs/full_208/phase8_scoring/audits/non_tie_reasonableness_audit__SAMPLE_UCI_POR.md`.

## Gate Decision

- Dataset scoring passed: true
- Full 208 finalization allowed: false
- Reason: All dataset-scoped validated judge outputs were finalized into scoring records.

## Outputs

- Final records dir: `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/scoring/final_scoring_records`
- Scoring manifest: `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/scoring/scoring_manifest__SAMPLE_UCI_POR.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/scoring/scoring_report__SAMPLE_UCI_POR.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/scoring/scoring_report__SAMPLE_UCI_POR.md`

## Issues

No issues found.

