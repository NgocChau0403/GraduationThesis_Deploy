# Paired Mode Comparison

- Dataset scope: SAMPLE_UCI_POR
- Pair count: 52
- Comparable pair count: 52
- Non-comparable pair count: 0
- Average delta task-aware minus baseline: 0.17
- Winner counts: {"tie":38,"task_aware_data_summarization":8,"baseline_first_20_rows":6}
- Comparable pairs by row-count bucket: {"<=20":46,">20":6}
- >20 row pairs: 6 total; 3 non-tie; 3 tie
- Non-tie pairs: 14
- Non-tie by row-count bucket: {"<=20":11,">20":3}
- Non-tie by winner and row-count bucket: {"task_aware_data_summarization__<=20":6,"task_aware_data_summarization__>20":2,"baseline_first_20_rows__<=20":5,"baseline_first_20_rows__>20":1}

| Task | Baseline | Task-aware | Delta | Winner |
| --- | ---: | ---: | ---: | --- |
| A-B01 | 7.9 | 7.9 | 0 | tie |
| A-B02 | 7.8 | 7.9 | 0.1 | task_aware_data_summarization |
| A-B03 | 7.8 | 7.8 | 0 | tie |
| A-B04 | 7.8 | 7.8 | 0 | tie |
| A-C01 | 7.9 | 7.9 | 0 | tie |
| A-C02 | 7.8 | 7.8 | 0 | tie |
| A-C03 | 7.9 | 7.9 | 0 | tie |
| A-C04 | 7.8 | 7.9 | 0.1 | task_aware_data_summarization |
| A-C05 | 7.9 | 7.9 | 0 | tie |
| A-C06 | 7.8 | 7.8 | 0 | tie |
| A-G01 | 7.55 | 7.55 | 0 | tie |
| A-G02 | 5 | 7.75 | 2.75 | task_aware_data_summarization |
| A-G03 | 5.9 | 5.9 | 0 | tie |
| A-G04 | 7.8 | 7.8 | 0 | tie |
| A-G05 | 7.9 | 7.9 | 0 | tie |
| A-G06 | 7.55 | 7.55 | 0 | tie |
| A-G07 | 7.55 | 7.55 | 0 | tie |
| A-G08 | 7.9 | 7.9 | 0 | tie |
| A-G09 | 7.55 | 7.55 | 0 | tie |
| A-G10 | 7.55 | 7.55 | 0 | tie |
| A-G11 | 7.8 | 7.8 | 0 | tie |
| A-G12 | 7.9 | 7.9 | 0 | tie |
| A-G13 | 7.75 | 7.75 | 0 | tie |
| A-G14 | 7.8 | 7.8 | 0 | tie |
| A-G15 | 7.55 | 7.55 | 0 | tie |
| A-G16 | 7.8 | 7.8 | 0 | tie |
| A-S01 | 7.9 | 7.9 | 0 | tie |
| A-S02 | 7.9 | 7.9 | 0 | tie |
| A-S03 | 7.8 | 7.8 | 0 | tie |
| A-S04 | 7.9 | 7.8 | -0.1 | baseline_first_20_rows |
| A-S05 | 7.8 | 7.8 | 0 | tie |
| A-S06 | 7.8 | 7.9 | 0.1 | task_aware_data_summarization |
| A-S07 | 7.9 | 7.8 | -0.1 | baseline_first_20_rows |
| A-S08 | 7.8 | 7.8 | 0 | tie |
| S-B01 | 7.8 | 7.9 | 0.1 | task_aware_data_summarization |
| S-B02 | 7.9 | 7.8 | -0.1 | baseline_first_20_rows |
| S-B03 | 7.8 | 7.8 | 0 | tie |
| S-T01 | 7.9 | 7.9 | 0 | tie |
| S-T02 | 7.8 | 7.8 | 0 | tie |
| S-T03 | 7.9 | 7.9 | 0 | tie |
| S-T04 | 7.8 | 7.8 | 0 | tie |
| S-T05 | 7.8 | 7.55 | -0.25 | baseline_first_20_rows |
| S-T06 | 7.55 | 7.55 | 0 | tie |
| S-T07 | 7.8 | 7.9 | 0.1 | task_aware_data_summarization |
| S-T08 | 5 | 7.9 | 2.9 | task_aware_data_summarization |
| S-T09 | 7.65 | 7.65 | 0 | tie |
| S-T10 | 7.8 | 7.8 | 0 | tie |
| S-T11 | 7.55 | 7.55 | 0 | tie |
| S-T12 | 7.9 | 7.9 | 0 | tie |
| S-T13 | 7.8 | 5.8 | -2 | baseline_first_20_rows |
| S-T14 | 7.65 | 7.2 | -0.45 | baseline_first_20_rows |
| S-T15 | 2 | 7.65 | 5.65 | task_aware_data_summarization |

## Non-Tie Explanation

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Evidence | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | --- | ---: | --- |
| A-B02 | 2 | <=20 | direct_embedding | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| A-C04 | 10 | <=20 | direct_embedding | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| A-G02 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 2.75 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_numerical_claim. |
| A-S04 | 4 | <=20 | direct_embedding | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -1. |
| A-S06 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| A-S07 | 1 | <=20 | direct_embedding | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -1. |
| S-B01 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| S-B02 | 1 | <=20 | direct_embedding | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: clarity -1. |
| S-T05 | 0 | <=20 | direct_embedding | baseline_first_20_rows | -0.25 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: completeness -1, actionability -1. |
| S-T07 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: clarity +1. |
| S-T08 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 2.9 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_lateness_claim. |
| S-T13 | 1 | <=20 | direct_embedding | baseline_first_20_rows | -2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: faithfulness -3, numerical_correctness -3, completeness -3. task-aware issue(s): major missing_action_plan. |
| S-T14 | 649 | >20 | deterministic_artifact_retrieval | baseline_first_20_rows | -0.45 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins on metric differences: faithfulness -1, numerical_correctness -1. task-aware issue(s): minor overstated_association. |
| S-T15 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 5.65 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 2 because of critical judge error(s). baseline rows[:20] issue(s): critical contradictory_core_numerical_claim. |

