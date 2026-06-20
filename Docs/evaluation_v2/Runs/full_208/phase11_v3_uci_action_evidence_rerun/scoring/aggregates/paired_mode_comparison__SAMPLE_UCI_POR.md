# Paired Mode Comparison

- Dataset scope: SAMPLE_UCI_POR
- Pair count: 52
- Comparable pair count: 51
- Non-comparable pair count: 1
- Average delta task-aware minus baseline: 0.09
- Winner counts: {"tie":10,"task_aware_data_summarization":25,"baseline_first_20_rows":16}
- Comparable pairs by row-count bucket: {"<=20":45,">20":6}
- >20 row pairs: 6 total; 4 non-tie; 2 tie
- Non-tie pairs: 41
- Non-tie by row-count bucket: {"<=20":37,">20":4}
- Non-tie by winner and row-count bucket: {"task_aware_data_summarization__<=20":23,"baseline_first_20_rows__<=20":14,"task_aware_data_summarization__>20":2,"baseline_first_20_rows__>20":2}

| Task | Baseline | Task-aware | Delta | Winner |
| --- | ---: | ---: | ---: | --- |
| A-B01 | 8.33 | 8.33 | 0 | tie |
| A-B02 | 9 | 9.1 | 0.1 | task_aware_data_summarization |
| A-B03 | 8.33 | 8.89 | 0.56 | task_aware_data_summarization |
| A-B04 | 9.28 | 9.28 | 0 | tie |
| A-C01 | 8.33 | 8.33 | 0 | tie |
| A-C02 | 8.83 | 9 | 0.17 | task_aware_data_summarization |
| A-C03 | 8.33 | 8.7 | 0.37 | task_aware_data_summarization |
| A-C04 | 8.3 | 8.1 | -0.2 | baseline_first_20_rows |
| A-C05 | 8.33 | 8.33 | 0 | tie |
| A-C06 | 8.3 | 8.2 | -0.1 | baseline_first_20_rows |
| A-G01 | 8.25 | 7.81 | -0.44 | baseline_first_20_rows |
| A-G02 | 5 | 6.35 | 1.35 | task_aware_data_summarization |
| A-G03 | 7.55 | 7.55 | 0 | tie |
| A-G04 | 8.1 | 8.22 | 0.12 | task_aware_data_summarization |
| A-G05 | 8.3 | 8.9 | 0.6 | task_aware_data_summarization |
| A-G06 | 9.07 | 8 | -1.07 | baseline_first_20_rows |
| A-G07 | 7.69 | 7.88 | 0.19 | task_aware_data_summarization |
| A-G08 | 8.1 | 8.1 | 0 | tie |
| A-G09 | 7.29 | 7.64 | 0.35 | task_aware_data_summarization |
| A-G10 | 7.43 | 7.45 | 0.02 | task_aware_data_summarization |
| A-G11 | 6.88 | 7 | 0.12 | task_aware_data_summarization |
| A-G12 | 8.1 | 8.94 | 0.84 | task_aware_data_summarization |
| A-G13 | 7.83 | 7.75 | -0.08 | baseline_first_20_rows |
| A-G14 | 7.38 | 7.38 | 0 | tie |
| A-G15 | 8.14 | 6.88 | -1.26 | baseline_first_20_rows |
| A-G16 | 8.1 | 7.65 | -0.45 | baseline_first_20_rows |
| A-S01 | 8.33 | 7.6 | -0.73 | baseline_first_20_rows |
| A-S02 | 8.33 | 7.65 | -0.68 | baseline_first_20_rows |
| A-S03 | 7.89 | 7.29 | -0.6 | baseline_first_20_rows |
| A-S04 | 8.3 | 8.75 | 0.45 | task_aware_data_summarization |
| A-S05 | 8.33 | 9.15 | 0.82 | task_aware_data_summarization |
| A-S06 | 8.25 | 8.3 | 0.05 | task_aware_data_summarization |
| A-S07 | 8.33 | 8.22 | -0.11 | baseline_first_20_rows |
| A-S08 | 7.75 | 8.1 | 0.35 | task_aware_data_summarization |
| S-B01 | 8.17 | 8.94 | 0.77 | task_aware_data_summarization |
| S-B02 | 8.11 | 8.33 | 0.22 | task_aware_data_summarization |
| S-B03 | 8.22 | 8.35 | 0.13 | task_aware_data_summarization |
| S-T01 | 8.33 | 8.33 | 0 | tie |
| S-T02 | 9.28 | 8.4 | -0.88 | baseline_first_20_rows |
| S-T03 | 8.44 | 8.3 | -0.14 | baseline_first_20_rows |
| S-T04 | 8.3 | 8.3 | 0 | tie |
| S-T05 | 7.25 | 6.13 | -1.12 | baseline_first_20_rows |
| S-T06 | 6.13 | 7.14 | 1.01 | task_aware_data_summarization |
| S-T07 | 7.5 | 8.1 | 0.6 | task_aware_data_summarization |
| S-T08 | 8.3 | 7.65 | -0.65 | baseline_first_20_rows |
| S-T09 | 7.85 | 7.3 | -0.55 | baseline_first_20_rows |
| S-T10 | 8.5 | 8.56 | 0.06 | task_aware_data_summarization |
| S-T11 |  | 6.25 |  | one_or_both_modes_not_scored |
| S-T12 | 7.65 | 8.33 | 0.68 | task_aware_data_summarization |
| S-T13 | 7.5 | 8.2 | 0.7 | task_aware_data_summarization |
| S-T14 | 7.3 | 7.3 | 0 | tie |
| S-T15 | 5 | 8.11 | 3.11 | task_aware_data_summarization |

## Non-Tie Explanation

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Evidence | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | --- | ---: | --- |
| A-B02 | 2 | <=20 | direct_embedding | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +1. |
| A-B03 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 0.56 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| A-C02 | 6 | <=20 | direct_embedding | task_aware_data_summarization | 0.17 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1, safety_fairness +1. |
| A-C03 | 2 | <=20 | direct_embedding | task_aware_data_summarization | 0.37 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, completeness +1, task_relevance +1. |
| A-C04 | 10 | <=20 | direct_embedding | baseline_first_20_rows | -0.2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: safety_fairness -2, clarity -1. |
| A-C06 | 2 | <=20 | direct_embedding | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -1. |
| A-G01 | 0 | <=20 | direct_embedding | baseline_first_20_rows | -0.44 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: completeness -1. |
| A-G02 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 1.35 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_numerical_claim. |
| A-G04 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.12 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| A-G05 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 0.6 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| A-G06 | 0 | <=20 | direct_embedding | baseline_first_20_rows | -1.07 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -2, faithfulness -1, completeness -1. |
| A-G07 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 0.19 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +2. |
| A-G09 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 0.35 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +2. |
| A-G10 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 0.02 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1, safety_fairness +1. |
| A-G11 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 0.12 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +1. |
| A-G12 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 0.84 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| A-G13 | 649 | >20 | deterministic_artifact_retrieval | baseline_first_20_rows | -0.08 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: completeness -1, task_relevance -1. |
| A-G15 | 0 | <=20 | direct_embedding | baseline_first_20_rows | -1.26 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: faithfulness -1, completeness -1, task_relevance -1. |
| A-G16 | 1 | <=20 | direct_embedding | baseline_first_20_rows | -0.45 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -2, completeness -1. |
| A-S01 | 1 | <=20 | direct_embedding | baseline_first_20_rows | -0.73 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -2, completeness -1, safety_fairness -1. |
| A-S02 | 3 | <=20 | direct_embedding | baseline_first_20_rows | -0.68 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -2, completeness -1, clarity -1. |
| A-S03 | 0 | <=20 | direct_embedding | baseline_first_20_rows | -0.6 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins by a small weighted-score difference after judge scoring. |
| A-S04 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 0.45 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, completeness +1, safety_fairness +1. |
| A-S05 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.82 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| A-S06 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: safety_fairness +1. |
| A-S07 | 1 | <=20 | direct_embedding | baseline_first_20_rows | -0.11 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: safety_fairness -2. |
| A-S08 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.35 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +2, task_relevance +1. |
| S-B01 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.77 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +2, faithfulness +1, completeness +1. |
| S-B02 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.22 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +1, safety_fairness +1. |
| S-B03 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.13 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: numerical_correctness +1, safety_fairness +1. |
| S-T02 | 3 | <=20 | direct_embedding | baseline_first_20_rows | -0.88 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: faithfulness -1, numerical_correctness -1, completeness -1. |
| S-T03 | 6 | <=20 | direct_embedding | baseline_first_20_rows | -0.14 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -1. |
| S-T05 | 0 | <=20 | direct_embedding | baseline_first_20_rows | -1.12 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -2, faithfulness -1, completeness -1. |
| S-T06 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 1.01 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, completeness +1, task_relevance +1. |
| S-T07 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 0.6 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: numerical_correctness +2, completeness +1. |
| S-T08 | 3 | <=20 | direct_embedding | baseline_first_20_rows | -0.65 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -2, completeness -1, clarity -1. |
| S-T09 | 649 | >20 | deterministic_artifact_retrieval | baseline_first_20_rows | -0.55 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: completeness -2, faithfulness -1, actionability -1. |
| S-T10 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 0.06 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins by a small weighted-score difference after judge scoring. |
| S-T12 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 0.68 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: numerical_correctness +2, completeness +1, clarity +1. |
| S-T13 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.7 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +3, task_relevance +2, completeness +1. |
| S-T15 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 3.11 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_numerical_claim. |

