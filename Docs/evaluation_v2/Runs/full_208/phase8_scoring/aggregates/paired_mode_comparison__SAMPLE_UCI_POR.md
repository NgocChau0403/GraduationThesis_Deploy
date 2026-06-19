# Paired Mode Comparison

- Dataset scope: SAMPLE_UCI_POR
- Pair count: 52
- Comparable pair count: 52
- Non-comparable pair count: 0
- Average delta task-aware minus baseline: -0.06
- Winner counts: {"tie":38,"task_aware_data_summarization":8,"baseline_first_20_rows":6}
- Comparable pairs by row-count bucket: {"<=20":46,">20":6}
- >20 row pairs: 6 total; 3 non-tie; 3 tie
- Non-tie pairs: 14
- Non-tie by row-count bucket: {"<=20":11,">20":3}
- Non-tie by winner and row-count bucket: {"task_aware_data_summarization__<=20":7,"task_aware_data_summarization__>20":1,"baseline_first_20_rows__>20":2,"baseline_first_20_rows__<=20":4}

| Task | Baseline | Task-aware | Delta | Winner |
| --- | ---: | ---: | ---: | --- |
| A-B01 | 8.15 | 8.15 | 0 | tie |
| A-B02 | 8.15 | 8.15 | 0 | tie |
| A-B03 | 8.15 | 8.15 | 0 | tie |
| A-B04 | 8.15 | 8.15 | 0 | tie |
| A-C01 | 6 | 6 | 0 | tie |
| A-C02 | 7.65 | 8.15 | 0.5 | task_aware_data_summarization |
| A-C03 | 8.15 | 8.15 | 0 | tie |
| A-C04 | 8.15 | 8.15 | 0 | tie |
| A-C05 | 8.15 | 8.15 | 0 | tie |
| A-C06 | 7.65 | 7.65 | 0 | tie |
| A-G01 | 7.65 | 7.65 | 0 | tie |
| A-G02 | 6 | 8.15 | 2.15 | task_aware_data_summarization |
| A-G03 | 8.15 | 8.15 | 0 | tie |
| A-G04 | 6 | 6 | 0 | tie |
| A-G05 | 8.15 | 8.15 | 0 | tie |
| A-G06 | 7.65 | 7.65 | 0 | tie |
| A-G07 | 7.65 | 7.65 | 0 | tie |
| A-G08 | 8.15 | 8.15 | 0 | tie |
| A-G09 | 7.55 | 7.65 | 0.1 | task_aware_data_summarization |
| A-G10 | 7.65 | 7.65 | 0 | tie |
| A-G11 | 6 | 7.65 | 1.65 | task_aware_data_summarization |
| A-G12 | 8.15 | 8.15 | 0 | tie |
| A-G13 | 8.15 | 6 | -2.15 | baseline_first_20_rows |
| A-G14 | 6 | 7.65 | 1.65 | task_aware_data_summarization |
| A-G15 | 7.65 | 7.65 | 0 | tie |
| A-G16 | 8.15 | 7.65 | -0.5 | baseline_first_20_rows |
| A-S01 | 8.15 | 8.15 | 0 | tie |
| A-S02 | 8.15 | 8.15 | 0 | tie |
| A-S03 | 7.65 | 7.65 | 0 | tie |
| A-S04 | 8.15 | 6 | -2.15 | baseline_first_20_rows |
| A-S05 | 8.15 | 8.15 | 0 | tie |
| A-S06 | 8.15 | 8.15 | 0 | tie |
| A-S07 | 8.15 | 8.15 | 0 | tie |
| A-S08 | 6 | 7.65 | 1.65 | task_aware_data_summarization |
| S-B01 | 8.15 | 8.15 | 0 | tie |
| S-B02 | 8.1 | 8.1 | 0 | tie |
| S-B03 | 8.15 | 8.15 | 0 | tie |
| S-T01 | 8.15 | 8.15 | 0 | tie |
| S-T02 | 8.15 | 8.15 | 0 | tie |
| S-T03 | 8.15 | 8.15 | 0 | tie |
| S-T04 | 6 | 6 | 0 | tie |
| S-T05 | 7.6 | 7.65 | 0.05 | task_aware_data_summarization |
| S-T06 | 7.65 | 7.65 | 0 | tie |
| S-T07 | 8.15 | 8.15 | 0 | tie |
| S-T08 | 8.15 | 8.15 | 0 | tie |
| S-T09 | 8.15 | 6 | -2.15 | baseline_first_20_rows |
| S-T10 | 7.65 | 7.6 | -0.05 | baseline_first_20_rows |
| S-T11 | 7.65 | 7.65 | 0 | tie |
| S-T12 | 7.9 | 8.15 | 0.25 | task_aware_data_summarization |
| S-T13 | 8.15 | 4 | -4.15 | baseline_first_20_rows |
| S-T14 | 8.15 | 8.15 | 0 | tie |
| S-T15 | 8.15 | 8.15 | 0 | tie |

## Non-Tie Explanation

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Evidence | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | --- | ---: | --- |
| A-C02 | 6 | <=20 | direct_embedding | task_aware_data_summarization | 0.5 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, actionability +2. |
| A-G02 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 2.15 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_or_contradicted_claim. |
| A-G09 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +1. |
| A-G11 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 1.65 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_core_output; major missing_core_output. |
| A-G13 | 649 | >20 | deterministic_artifact_retrieval | baseline_first_20_rows | -2.15 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major unsupported_or_contradicted_claim; major unsupported_or_contradicted_claim. |
| A-G14 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 1.65 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_core_output; major missing_core_output. |
| A-G16 | 1 | <=20 | direct_embedding | baseline_first_20_rows | -0.5 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: completeness -2, actionability -2. |
| A-S04 | 4 | <=20 | direct_embedding | baseline_first_20_rows | -2.15 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major missing_core_output; minor overstrong_causal_framing. |
| A-S08 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 1.65 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_core_output. |
| S-T05 | 0 | <=20 | direct_embedding | task_aware_data_summarization | 0.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: safety_fairness +1. |
| S-T09 | 649 | >20 | deterministic_artifact_retrieval | baseline_first_20_rows | -2.15 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major unsupported_or_contradicted_claim. |
| S-T10 | 0 | <=20 | direct_embedding | baseline_first_20_rows | -0.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: safety_fairness -1. |
| S-T12 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 0.25 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1. baseline rows[:20] issue(s): minor overstrong_causal_framing. |
| S-T13 | 1 | <=20 | direct_embedding | baseline_first_20_rows | -4.15 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 4 because of critical judge error(s). task-aware issue(s): critical unsupported_or_contradicted_claim. |

