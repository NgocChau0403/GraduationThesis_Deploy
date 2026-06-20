# LLM Judge V2 Full 208 Official Scoring Report

- Generated at: 2026-06-20T02:58:11.049Z
- Status: PASS
- Dataset scope: SAMPLE_UCI_POR
- Evaluation run id: llm_judge_v3_uci_calibration_scoring__SAMPLE_UCI_POR
- Scoring formula version: v3_uci_calibration_weighted_mean_v1_decimal_half_up
- Expected records: 104
- Valid source records: 104
- Attempt records: 104
- Final scoring records: 104
- Scored records: 103
- Invalid records: 1
- Errors: 0
- Warnings: 0

## Aggregate Summary

- Average raw weighted score: 8.01
- Average final score after caps: 7.99
- Verdict counts: {"excellent":65,"good":32,"acceptable":6}
- Highest error severity counts: {"none":102,"major":2}

## Paired Mode Comparison

- Pair count: 52
- Comparable pair count: 51
- Average delta task-aware minus baseline: 0.09
- Winner counts: {"tie":10,"task_aware_data_summarization":25,"baseline_first_20_rows":16}
- Comparable pairs by row-count bucket: {"<=20":45,">20":6}
- >20 row pairs: 6 total; 4 non-tie; 2 tie
- Non-tie pairs: 41
- Non-tie by row-count bucket: {"<=20":37,">20":4}
- Non-tie by winner and row-count bucket: {"task_aware_data_summarization__<=20":23,"baseline_first_20_rows__<=20":14,"task_aware_data_summarization__>20":2,"baseline_first_20_rows__>20":2}

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | ---: | --- |
| A-B02 | 2 | <=20 | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +1. |
| A-B03 | 4 | <=20 | task_aware_data_summarization | 0.56 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| A-C02 | 6 | <=20 | task_aware_data_summarization | 0.17 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1, safety_fairness +1. |
| A-C03 | 2 | <=20 | task_aware_data_summarization | 0.37 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, completeness +1, task_relevance +1. |
| A-C04 | 10 | <=20 | baseline_first_20_rows | -0.2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: safety_fairness -2, clarity -1. |
| A-C06 | 2 | <=20 | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -1. |
| A-G01 | 0 | <=20 | baseline_first_20_rows | -0.44 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: completeness -1. |
| A-G02 | 649 | >20 | task_aware_data_summarization | 1.35 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_numerical_claim. |
| A-G04 | 3 | <=20 | task_aware_data_summarization | 0.12 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| A-G05 | 4 | <=20 | task_aware_data_summarization | 0.6 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| A-G06 | 0 | <=20 | baseline_first_20_rows | -1.07 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -2, faithfulness -1, completeness -1. |
| A-G07 | 0 | <=20 | task_aware_data_summarization | 0.19 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +2. |
| A-G09 | 0 | <=20 | task_aware_data_summarization | 0.35 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +2. |
| A-G10 | 0 | <=20 | task_aware_data_summarization | 0.02 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1, safety_fairness +1. |
| A-G11 | 0 | <=20 | task_aware_data_summarization | 0.12 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +1. |
| A-G12 | 4 | <=20 | task_aware_data_summarization | 0.84 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| A-G13 | 649 | >20 | baseline_first_20_rows | -0.08 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: completeness -1, task_relevance -1. |
| A-G15 | 0 | <=20 | baseline_first_20_rows | -1.26 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: faithfulness -1, completeness -1, task_relevance -1. |
| A-G16 | 1 | <=20 | baseline_first_20_rows | -0.45 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -2, completeness -1. |
| A-S01 | 1 | <=20 | baseline_first_20_rows | -0.73 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -2, completeness -1, safety_fairness -1. |
| A-S02 | 3 | <=20 | baseline_first_20_rows | -0.68 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -2, completeness -1, clarity -1. |
| A-S03 | 0 | <=20 | baseline_first_20_rows | -0.6 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins by a small weighted-score difference after judge scoring. |
| A-S04 | 4 | <=20 | task_aware_data_summarization | 0.45 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, completeness +1, safety_fairness +1. |
| A-S05 | 3 | <=20 | task_aware_data_summarization | 0.82 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| A-S06 | 3 | <=20 | task_aware_data_summarization | 0.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: safety_fairness +1. |
| A-S07 | 1 | <=20 | baseline_first_20_rows | -0.11 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: safety_fairness -2. |
| A-S08 | 1 | <=20 | task_aware_data_summarization | 0.35 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +2, task_relevance +1. |
| S-B01 | 1 | <=20 | task_aware_data_summarization | 0.77 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +2, faithfulness +1, completeness +1. |
| S-B02 | 1 | <=20 | task_aware_data_summarization | 0.22 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +1, safety_fairness +1. |
| S-B03 | 1 | <=20 | task_aware_data_summarization | 0.13 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: numerical_correctness +1, safety_fairness +1. |
| S-T02 | 3 | <=20 | baseline_first_20_rows | -0.88 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: faithfulness -1, numerical_correctness -1, completeness -1. |
| S-T03 | 6 | <=20 | baseline_first_20_rows | -0.14 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -1. |
| S-T05 | 0 | <=20 | baseline_first_20_rows | -1.12 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -2, faithfulness -1, completeness -1. |
| S-T06 | 0 | <=20 | task_aware_data_summarization | 1.01 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, completeness +1, task_relevance +1. |
| S-T07 | 4 | <=20 | task_aware_data_summarization | 0.6 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: numerical_correctness +2, completeness +1. |
| S-T08 | 3 | <=20 | baseline_first_20_rows | -0.65 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -2, completeness -1, clarity -1. |
| S-T09 | 649 | >20 | baseline_first_20_rows | -0.55 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: completeness -2, faithfulness -1, actionability -1. |
| S-T10 | 0 | <=20 | task_aware_data_summarization | 0.06 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins by a small weighted-score difference after judge scoring. |
| S-T12 | 4 | <=20 | task_aware_data_summarization | 0.68 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: numerical_correctness +2, completeness +1, clarity +1. |
| S-T13 | 1 | <=20 | task_aware_data_summarization | 0.7 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +3, task_relevance +2, completeness +1. |
| S-T15 | 649 | >20 | task_aware_data_summarization | 3.11 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_numerical_claim. |

## Reasonableness Review Note

There are `>20` row-count tasks where `baseline_first_20_rows` wins. These should be reviewed before thesis-level conclusions, because task-aware is expected to have better evidence coverage on large result sets. A baseline win can still be valid if task-aware introduces unsupported claims or misses core requirements, but derived statistics such as correlation coefficients must be checked against deterministic provenance before accepting the loss as final.

For SAMPLE_UCI_POR, see `Docs/evaluation_v2/Runs/full_208/phase8_scoring/audits/non_tie_reasonableness_audit__SAMPLE_UCI_POR.md`.

## Gate Decision

- Dataset scoring passed: true
- Full 208 finalization allowed: false
- Reason: All dataset-scoped validated judge outputs were finalized into scoring records.

## Outputs

- Final records dir: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/scoring/final_scoring_records`
- Scoring manifest: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/scoring/scoring_manifest__SAMPLE_UCI_POR.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/scoring/scoring_report__SAMPLE_UCI_POR.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/scoring/scoring_report__SAMPLE_UCI_POR.md`

## Issues

No issues found.

