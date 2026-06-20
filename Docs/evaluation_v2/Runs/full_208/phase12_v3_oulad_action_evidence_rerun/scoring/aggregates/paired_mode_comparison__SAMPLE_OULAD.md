# Paired Mode Comparison

- Dataset scope: SAMPLE_OULAD
- Pair count: 52
- Comparable pair count: 52
- Non-comparable pair count: 0
- Average delta task-aware minus baseline: 0.09
- Winner counts: {"baseline_first_20_rows":14,"task_aware_data_summarization":18,"tie":20}
- Comparable pairs by row-count bucket: {"<=20":39,">20":13}
- >20 row pairs: 13 total; 7 non-tie; 6 tie
- Non-tie pairs: 32
- Non-tie by row-count bucket: {"<=20":25,">20":7}
- Non-tie by winner and row-count bucket: {"baseline_first_20_rows__<=20":10,"task_aware_data_summarization__<=20":15,"task_aware_data_summarization__>20":3,"baseline_first_20_rows__>20":4}

| Task | Baseline | Task-aware | Delta | Winner |
| --- | ---: | ---: | ---: | --- |
| A-B01 | 7.55 | 6.5 | -1.05 | baseline_first_20_rows |
| A-B02 | 8.33 | 8.1 | -0.23 | baseline_first_20_rows |
| A-B03 | 8.3 | 8.33 | 0.03 | task_aware_data_summarization |
| A-B04 | 9 | 9.15 | 0.15 | task_aware_data_summarization |
| A-C01 | 8.33 | 8.33 | 0 | tie |
| A-C02 | 8.33 | 8.33 | 0 | tie |
| A-C03 | 8.4 | 8.3 | -0.1 | baseline_first_20_rows |
| A-C04 | 6.44 | 6.25 | -0.19 | baseline_first_20_rows |
| A-C05 | 8.25 | 8.22 | -0.03 | baseline_first_20_rows |
| A-C06 | 8.1 | 8.1 | 0 | tie |
| A-G01 | 8.3 | 8.3 | 0 | tie |
| A-G02 | 5 | 8.3 | 3.3 | task_aware_data_summarization |
| A-G03 | 7.55 | 7.55 | 0 | tie |
| A-G04 | 8.1 | 8.1 | 0 | tie |
| A-G05 | 8.33 | 8.2 | -0.13 | baseline_first_20_rows |
| A-G06 | 7.4 | 8.2 | 0.8 | task_aware_data_summarization |
| A-G07 | 8 | 8 | 0 | tie |
| A-G08 | 8.1 | 8.1 | 0 | tie |
| A-G09 | 8.25 | 8.2 | -0.05 | baseline_first_20_rows |
| A-G10 | 8 | 8.1 | 0.1 | task_aware_data_summarization |
| A-G11 | 8.2 | 7.65 | -0.55 | baseline_first_20_rows |
| A-G12 | 7.55 | 7.55 | 0 | tie |
| A-G13 | 8.14 | 8.14 | 0 | tie |
| A-G14 | 8.3 | 7.5 | -0.8 | baseline_first_20_rows |
| A-G15 | 8.1 | 7.55 | -0.55 | baseline_first_20_rows |
| A-G16 | 8.1 | 8.3 | 0.2 | task_aware_data_summarization |
| A-S01 | 8.33 | 8 | -0.33 | baseline_first_20_rows |
| A-S02 | 7.65 | 8.33 | 0.68 | task_aware_data_summarization |
| A-S03 | 7.25 | 7.65 | 0.4 | task_aware_data_summarization |
| A-S04 | 8.2 | 8.1 | -0.1 | baseline_first_20_rows |
| A-S05 | 8.2 | 8.3 | 0.1 | task_aware_data_summarization |
| A-S06 | 8.1 | 8.1 | 0 | tie |
| A-S07 | 7.06 | 7.06 | 0 | tie |
| A-S08 | 7.9 | 8.1 | 0.2 | task_aware_data_summarization |
| S-B01 | 8.8 | 9 | 0.2 | task_aware_data_summarization |
| S-B02 | 8.2 | 8.2 | 0 | tie |
| S-B03 | 8.33 | 9.28 | 0.95 | task_aware_data_summarization |
| S-T01 | 8.2 | 8.33 | 0.13 | task_aware_data_summarization |
| S-T02 | 8.3 | 8.3 | 0 | tie |
| S-T03 | 8.9 | 9.28 | 0.38 | task_aware_data_summarization |
| S-T04 | 8.1 | 8.2 | 0.1 | task_aware_data_summarization |
| S-T05 | 7.65 | 7.65 | 0 | tie |
| S-T06 | 7.65 | 7.65 | 0 | tie |
| S-T07 | 6.85 | 6.5 | -0.35 | baseline_first_20_rows |
| S-T08 | 7.95 | 8.1 | 0.15 | task_aware_data_summarization |
| S-T09 | 6.13 | 6.13 | 0 | tie |
| S-T10 | 8.3 | 8.3 | 0 | tie |
| S-T11 | 7.6 | 8.4 | 0.8 | task_aware_data_summarization |
| S-T12 | 8.2 | 8.2 | 0 | tie |
| S-T13 | 8.1 | 8.1 | 0 | tie |
| S-T14 | 6.13 | 5.65 | -0.48 | baseline_first_20_rows |
| S-T15 | 7.14 | 8.14 | 1 | task_aware_data_summarization |

## Non-Tie Explanation

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Evidence | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | --- | ---: | --- |
| A-B01 | 11 | <=20 | direct_embedding | baseline_first_20_rows | -1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6.5 because of major judge error(s). task-aware issue(s): major missing_core_output. |
| A-B02 | 4 | <=20 | direct_embedding | baseline_first_20_rows | -0.23 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: safety_fairness -2, clarity -1. |
| A-B03 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 0.03 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins by a small weighted-score difference after judge scoring. |
| A-B04 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.15 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1, safety_fairness +1. |
| A-C03 | 2 | <=20 | direct_embedding | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: task_relevance -1. |
| A-C04 | 10 | <=20 | direct_embedding | baseline_first_20_rows | -0.19 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: actionability -2, safety_fairness -1. |
| A-C05 | 2 | <=20 | direct_embedding | baseline_first_20_rows | -0.03 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: safety_fairness -1. |
| A-G02 | 1998 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 3.3 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major unsupported numerical claim. |
| A-G05 | 11 | <=20 | direct_embedding | baseline_first_20_rows | -0.13 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -1. |
| A-G06 | 9 | <=20 | direct_embedding | task_aware_data_summarization | 0.8 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| A-G09 | 1998 | >20 | deterministic_artifact_retrieval | baseline_first_20_rows | -0.05 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: safety_fairness -1. |
| A-G10 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: safety_fairness +2. |
| A-G11 | 42 | >20 | deterministic_artifact_retrieval | baseline_first_20_rows | -0.55 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: numerical_correctness -2, completeness -1, clarity -1. |
| A-G14 | 164 | >20 | deterministic_artifact_retrieval | baseline_first_20_rows | -0.8 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: numerical_correctness -2, safety_fairness -2, completeness -1. |
| A-G15 | 50 | >20 | deterministic_artifact_retrieval | baseline_first_20_rows | -0.55 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: numerical_correctness -2, completeness -1. |
| A-G16 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +1, safety_fairness +1. |
| A-S01 | 1 | <=20 | direct_embedding | baseline_first_20_rows | -0.33 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: safety_fairness -2. |
| A-S02 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 0.68 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: numerical_correctness +2, completeness +1. |
| A-S03 | 32 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 0.4 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: actionability +3, safety_fairness +2. |
| A-S04 | 4 | <=20 | direct_embedding | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: actionability -2. |
| A-S05 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| A-S08 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +2, task_relevance +1. |
| S-B01 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins by a small weighted-score difference after judge scoring. |
| S-B03 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.95 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| S-T01 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 0.13 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| S-T03 | 6 | <=20 | direct_embedding | task_aware_data_summarization | 0.38 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1, safety_fairness +1. |
| S-T04 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: safety_fairness +2. |
| S-T07 | 6 | <=20 | direct_embedding | baseline_first_20_rows | -0.35 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6.5 because of major judge error(s). task-aware issue(s): major missing core output. |
| S-T08 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 0.15 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: numerical_correctness +2. |
| S-T11 | 1988 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 0.8 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. |
| S-T14 | 0 | <=20 | direct_embedding | baseline_first_20_rows | -0.48 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: completeness -1, clarity -1. |
| S-T15 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, completeness +1, task_relevance +1. |

