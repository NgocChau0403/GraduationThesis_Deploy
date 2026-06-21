# Paired Mode Comparison

- Dataset scope: SAMPLE_UCI_POR
- Pair count: 52
- Comparable pair count: 52
- Non-comparable pair count: 0
- Average delta task-aware minus baseline: 0.23
- Winner counts: {"task_aware_data_summarization":24,"tie":21,"baseline_first_20_rows":7}
- Comparable pairs by row-count bucket: {"<=20":46,">20":6}
- >20 row pairs: 6 total; 2 non-tie; 4 tie
- Non-tie pairs: 31
- Non-tie by row-count bucket: {"<=20":29,">20":2}
- Non-tie by winner and row-count bucket: {"task_aware_data_summarization__<=20":23,"baseline_first_20_rows__<=20":6,"baseline_first_20_rows__>20":1,"task_aware_data_summarization__>20":1}

| Task | Baseline | Task-aware | Delta | Winner |
| --- | ---: | ---: | ---: | --- |
| A-B01 | 7 | 8.6 | 1.6 | task_aware_data_summarization |
| A-B02 | 7 | 8.6 | 1.6 | task_aware_data_summarization |
| A-B03 | 7 | 7 | 0 | tie |
| A-B04 | 8.3 | 8.6 | 0.3 | task_aware_data_summarization |
| A-C01 | 7 | 7 | 0 | tie |
| A-C02 | 6 | 6 | 0 | tie |
| A-C03 | 7 | 6 | -1 | baseline_first_20_rows |
| A-C04 | 5.85 | 6 | 0.15 | task_aware_data_summarization |
| A-C05 | 8.3 | 8.2 | -0.1 | baseline_first_20_rows |
| A-C06 | 6 | 6 | 0 | tie |
| A-G01 | 6 | 6 | 0 | tie |
| A-G02 | 7 | 7 | 0 | tie |
| A-G03 | 6.85 | 6.45 | -0.4 | baseline_first_20_rows |
| A-G04 | 8.3 | 8.6 | 0.3 | task_aware_data_summarization |
| A-G05 | 8.3 | 8.6 | 0.3 | task_aware_data_summarization |
| A-G06 | 6 | 7 | 1 | task_aware_data_summarization |
| A-G07 | 7 | 7 | 0 | tie |
| A-G08 | 8.3 | 8.6 | 0.3 | task_aware_data_summarization |
| A-G09 | 5.95 | 6 | 0.05 | task_aware_data_summarization |
| A-G10 | 7 | 7 | 0 | tie |
| A-G11 | 8.15 | 8.05 | -0.1 | baseline_first_20_rows |
| A-G12 | 8.3 | 8.6 | 0.3 | task_aware_data_summarization |
| A-G13 | 6 | 6 | 0 | tie |
| A-G14 | 7 | 8.2 | 1.2 | task_aware_data_summarization |
| A-G15 | 6 | 6 | 0 | tie |
| A-G16 | 7 | 7.9 | 0.9 | task_aware_data_summarization |
| A-S01 | 8.15 | 8.6 | 0.45 | task_aware_data_summarization |
| A-S02 | 6 | 6 | 0 | tie |
| A-S03 | 6.85 | 6.85 | 0 | tie |
| A-S04 | 7 | 8.3 | 1.3 | task_aware_data_summarization |
| A-S05 | 8.3 | 8.6 | 0.3 | task_aware_data_summarization |
| A-S06 | 8.3 | 8.6 | 0.3 | task_aware_data_summarization |
| A-S07 | 8.15 | 8.6 | 0.45 | task_aware_data_summarization |
| A-S08 | 6 | 6 | 0 | tie |
| S-B01 | 6 | 6 | 0 | tie |
| S-B02 | 7 | 7 | 0 | tie |
| S-B03 | 7 | 7 | 0 | tie |
| S-T01 | 6 | 8.6 | 2.6 | task_aware_data_summarization |
| S-T02 | 8.15 | 8.6 | 0.45 | task_aware_data_summarization |
| S-T03 | 8.3 | 7 | -1.3 | baseline_first_20_rows |
| S-T04 | 7.75 | 6 | -1.75 | baseline_first_20_rows |
| S-T05 | 6 | 6.85 | 0.85 | task_aware_data_summarization |
| S-T06 | 7.9 | 8.2 | 0.3 | task_aware_data_summarization |
| S-T07 | 7 | 7 | 0 | tie |
| S-T08 | 7 | 7 | 0 | tie |
| S-T09 | 7 | 7 | 0 | tie |
| S-T10 | 7.9 | 8.2 | 0.3 | task_aware_data_summarization |
| S-T11 | 6.85 | 8.2 | 1.35 | task_aware_data_summarization |
| S-T12 | 6 | 6 | 0 | tie |
| S-T13 | 7 | 6 | -1 | baseline_first_20_rows |
| S-T14 | 6.2 | 7 | 0.8 | task_aware_data_summarization |
| S-T15 | 6 | 6 | 0 | tie |

## Non-Tie Explanation

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Evidence | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | --- | ---: | --- |
| A-B01 | 10 | <=20 | direct_embedding | task_aware_data_summarization | 1.6 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |
| A-B02 | 2 | <=20 | direct_embedding | task_aware_data_summarization | 1.6 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |
| A-B04 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-C03 | 2 | <=20 | direct_embedding | baseline_first_20_rows | -1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major missing_required_output. |
| A-C04 | 10 | <=20 | direct_embedding | task_aware_data_summarization | 0.15 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| A-C05 | 2 | <=20 | direct_embedding | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -2. |
| A-G03 | 50 | >20 | deterministic_artifact_retrieval | baseline_first_20_rows | -0.4 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 7 because of minor judge error(s). task-aware issue(s): minor missing_required_output. |
| A-G04 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-G05 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-G06 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| A-G08 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-G09 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 0.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| A-G11 | 0 | <=20 | direct_embedding | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -2. |
| A-G12 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-G14 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 1.2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |
| A-G16 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.9 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |
| A-S01 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.45 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +2, completeness +1. |
| A-S04 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 1.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |
| A-S05 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-S06 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-S07 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.45 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +2, completeness +1. |
| S-T01 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 2.6 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| S-T02 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.45 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +2, completeness +1. |
| S-T03 | 6 | <=20 | direct_embedding | baseline_first_20_rows | -1.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 7 because of minor judge error(s). task-aware issue(s): minor missing_required_output. |
| S-T04 | 5 | <=20 | direct_embedding | baseline_first_20_rows | -1.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major missing_required_output. |
| S-T05 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 0.85 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| S-T06 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| S-T10 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| S-T11 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 1.35 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |
| S-T13 | 1 | <=20 | direct_embedding | baseline_first_20_rows | -1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major missing_required_output. |
| S-T14 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 0.8 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |

