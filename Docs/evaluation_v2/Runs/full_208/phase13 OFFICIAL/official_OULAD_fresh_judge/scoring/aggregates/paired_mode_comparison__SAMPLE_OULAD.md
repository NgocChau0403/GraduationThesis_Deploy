# Paired Mode Comparison

- Dataset scope: SAMPLE_OULAD
- Pair count: 44
- Comparable pair count: 44
- Non-comparable pair count: 0
- Average delta task-aware minus baseline: 1.54
- Winner counts: {"task_aware_data_summarization":42,"tie":2}
- Comparable pairs by row-count bucket: {"<=20":31,">20":13}
- >20 row pairs: 13 total; 11 non-tie; 2 tie
- Non-tie pairs: 42
- Non-tie by row-count bucket: {"<=20":31,">20":11}
- Non-tie by winner and row-count bucket: {"task_aware_data_summarization__<=20":31,"task_aware_data_summarization__>20":11}

| Task | Baseline | Task-aware | Delta | Winner |
| --- | ---: | ---: | ---: | --- |
| A-B01 | 6 | 8 | 2 | task_aware_data_summarization |
| A-B02 | 7.5 | 8.75 | 1.25 | task_aware_data_summarization |
| A-B03 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-B04 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-C01 | 4 | 8.75 | 4.75 | task_aware_data_summarization |
| A-C02 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-C03 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-C05 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-C06 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-G01 | 5 | 8 | 3 | task_aware_data_summarization |
| A-G02 | 6 | 8.75 | 2.75 | task_aware_data_summarization |
| A-G03 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-G04 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-G05 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-G06 | 6.85 | 7.75 | 0.9 | task_aware_data_summarization |
| A-G07 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-G08 | 6 | 8.75 | 2.75 | task_aware_data_summarization |
| A-G09 | 5.8 | 6 | 0.2 | task_aware_data_summarization |
| A-G10 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-G11 | 7.1 | 8.75 | 1.65 | task_aware_data_summarization |
| A-G12 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-G14 | 6 | 6 | 0 | tie |
| A-G15 | 7.1 | 8.75 | 1.65 | task_aware_data_summarization |
| A-G16 | 6 | 8.75 | 2.75 | task_aware_data_summarization |
| A-S01 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-S02 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-S03 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-S05 | 5 | 8.75 | 3.75 | task_aware_data_summarization |
| A-S06 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| A-S08 | 6 | 8.75 | 2.75 | task_aware_data_summarization |
| S-B01 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| S-B02 | 7.55 | 8.75 | 1.2 | task_aware_data_summarization |
| S-B03 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| S-T01 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| S-T02 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| S-T03 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| S-T04 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| S-T05 | 7.6 | 8.75 | 1.15 | task_aware_data_summarization |
| S-T06 | 6 | 6 | 0 | tie |
| S-T08 | 6 | 8.75 | 2.75 | task_aware_data_summarization |
| S-T10 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| S-T11 | 4 | 8.75 | 4.75 | task_aware_data_summarization |
| S-T12 | 7.7 | 8.75 | 1.05 | task_aware_data_summarization |
| S-T13 | 6 | 8.75 | 2.75 | task_aware_data_summarization |

## Non-Tie Explanation

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Evidence | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | --- | ---: | --- |
| A-B01 | 11 | <=20 | direct_embedding | task_aware_data_summarization | 2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major core_requirement_omission. |
| A-B02 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 1.25 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 8 because of minor judge error(s). baseline rows[:20] issue(s): minor partial_count_reporting. |
| A-B03 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-B04 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-C01 | 17 | <=20 | direct_embedding | task_aware_data_summarization | 4.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 4 because of critical judge error(s). baseline rows[:20] issue(s): critical wrong_evaluation_target. |
| A-C02 | 6 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-C03 | 2 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-C05 | 2 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-C06 | 10 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G01 | 1544 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 3 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_threshold_claim. |
| A-G02 | 1998 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 2.75 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major numerical_mischaracterization. |
| A-G03 | 50 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 1.05 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G04 | 112 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 1.05 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G05 | 11 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G06 | 9 | <=20 | direct_embedding | task_aware_data_summarization | 0.9 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 8 because of minor judge error(s). baseline rows[:20] issue(s): minor unsupported_association_framing. |
| A-G07 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G08 | 11 | <=20 | direct_embedding | task_aware_data_summarization | 2.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major core_requirement_omission. |
| A-G09 | 1998 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 0.2 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major core_requirement_omission. |
| A-G10 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G11 | 42 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 1.65 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 8 because of minor judge error(s). baseline rows[:20] issue(s): minor partial_coverage. |
| A-G12 | 53 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 1.05 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G15 | 50 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 1.65 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 8 because of minor judge error(s). baseline rows[:20] issue(s): minor partial_rank_reporting. |
| A-G16 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 2.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_action_provenance. |
| A-S01 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-S02 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-S03 | 32 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 1.05 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-S05 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 3.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major wrong_evaluation_target. |
| A-S06 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-S08 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 2.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_action_provenance. |
| S-B01 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-B02 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 1.2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 8 because of minor judge error(s). baseline rows[:20] issue(s): minor unsupported_outcome_claim. |
| S-B03 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T01 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T02 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T03 | 6 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T04 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T05 | 32 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 1.15 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 8 because of minor judge error(s). baseline rows[:20] issue(s): minor unsupported_causal_language. |
| S-T08 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 2.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_association_strength. |
| S-T10 | 9 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T11 | 1988 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 4.75 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 4 because of critical judge error(s). baseline rows[:20] issue(s): critical contradicted_correlation_direction. |
| S-T12 | 6 | <=20 | direct_embedding | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T13 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 2.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_action_provenance. |

