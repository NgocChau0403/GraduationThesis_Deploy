# Paired Mode Comparison

- Dataset scope: SAMPLE_UCI_POR
- Pair count: 24
- Comparable pair count: 24
- Non-comparable pair count: 0
- Average delta task-aware minus baseline: 0.51
- Winner counts: {"task_aware_data_summarization":12,"tie":6,"baseline_first_20_rows":6}
- Comparable pairs by row-count bucket: {"<=20":19,">20":5}
- >20 row pairs: 5 total; 4 non-tie; 1 tie
- Non-tie pairs: 18
- Non-tie by row-count bucket: {"<=20":14,">20":4}
- Non-tie by winner and row-count bucket: {"task_aware_data_summarization__<=20":8,"task_aware_data_summarization__>20":4,"baseline_first_20_rows__<=20":6}

| Task | Baseline | Task-aware | Delta | Winner |
| --- | ---: | ---: | ---: | --- |
| A-B01 | 7 | 9.35 | 2.35 | task_aware_data_summarization |
| A-B02 | 8.8 | 9.25 | 0.45 | task_aware_data_summarization |
| A-C01 | 8.35 | 9.25 | 0.9 | task_aware_data_summarization |
| A-C04 | 6 | 6 | 0 | tie |
| A-C05 | 7 | 8.75 | 1.75 | task_aware_data_summarization |
| A-G03 | 5 | 5 | 0 | tie |
| A-G04 | 9.35 | 9.35 | 0 | tie |
| A-G12 | 6 | 6 | 0 | tie |
| A-G13 | 4.4 | 6 | 1.6 | task_aware_data_summarization |
| A-S02 | 7 | 7 | 0 | tie |
| A-S04 | 8.9 | 7 | -1.9 | baseline_first_20_rows |
| A-S05 | 9.85 | 9 | -0.85 | baseline_first_20_rows |
| A-S07 | 6 | 5.5 | -0.5 | baseline_first_20_rows |
| S-B01 | 9.25 | 9.75 | 0.5 | task_aware_data_summarization |
| S-B02 | 6 | 8.65 | 2.65 | task_aware_data_summarization |
| S-T01 | 9.35 | 9.35 | 0 | tie |
| S-T02 | 8.8 | 9.5 | 0.7 | task_aware_data_summarization |
| S-T03 | 8.35 | 6.85 | -1.5 | baseline_first_20_rows |
| S-T04 | 6 | 9.85 | 3.85 | task_aware_data_summarization |
| S-T07 | 4 | 3 | -1 | baseline_first_20_rows |
| S-T09 | 4.8 | 6 | 1.2 | task_aware_data_summarization |
| S-T13 | 5.85 | 4 | -1.85 | baseline_first_20_rows |
| S-T14 | 5 | 6 | 1 | task_aware_data_summarization |
| S-T15 | 3 | 6 | 3 | task_aware_data_summarization |

## Non-Tie Explanation

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Evidence | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | --- | ---: | --- |
| A-B01 | 10 | <=20 | direct_embedding | task_aware_data_summarization | 2.35 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| A-B02 | 2 | <=20 | direct_embedding | task_aware_data_summarization | 0.45 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, task_relevance +1. baseline rows[:20] issue(s): minor missing_required_output. |
| A-C01 | 6 | <=20 | direct_embedding | task_aware_data_summarization | 0.9 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. baseline rows[:20] issue(s): minor imprecise_trajectory_interpretation. |
| A-C05 | 2 | <=20 | direct_embedding | task_aware_data_summarization | 1.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_causal_framing. |
| A-G13 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 1.6 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major misleading_correlation_interpretation. |
| A-S04 | 4 | <=20 | direct_embedding | baseline_first_20_rows | -1.9 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 7 because of major judge error(s). task-aware issue(s): major missing_required_output. |
| A-S05 | 3 | <=20 | direct_embedding | baseline_first_20_rows | -0.85 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: faithfulness -2, completeness -1, task_relevance -1. task-aware issue(s): minor scope_imprecision. |
| A-S07 | 1 | <=20 | direct_embedding | baseline_first_20_rows | -0.5 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major unsupported_numerical_claim. |
| S-B01 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.5 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, completeness +1, actionability +1. |
| S-B02 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 2.65 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major contradicted_metric_interpretation. |
| S-T02 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.7 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, completeness +1, task_relevance +1. baseline rows[:20] issue(s): minor scope_imprecision. |
| S-T03 | 6 | <=20 | direct_embedding | baseline_first_20_rows | -1.5 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 7 because of major judge error(s). task-aware issue(s): major missing_required_output. |
| S-T04 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 3.85 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| S-T07 | 4 | <=20 | direct_embedding | baseline_first_20_rows | -1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 3 because of critical judge error(s). task-aware issue(s): critical wrong_evaluation_target. |
| S-T09 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 1.2 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major misleading_correlation_interpretation. |
| S-T13 | 1 | <=20 | direct_embedding | baseline_first_20_rows | -1.85 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 4 because of critical judge error(s). task-aware issue(s): critical invented_action. |
| S-T14 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 1 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major misleading_correlation_interpretation. |
| S-T15 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 3 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 3 because of critical judge error(s). baseline rows[:20] issue(s): critical contradictory_core_numerical_claim. |

